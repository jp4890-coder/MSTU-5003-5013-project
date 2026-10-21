// Run the README's local server, then node little-moments/tests/simple-first-day.cjs.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { chromium } = require('playwright');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../simple-first-day.js'), 'utf8'), context);
const create = context.simpleFirstDay;
const fixtures = [
 {name:'Robin', temperament:'Slow to warm up', communication:'Gestures and pointing', preferences:'Books and quiet play', comfort:'A familiar toy or blanket'},
 {name:'Alex', temperament:'Highly active', communication:'Short phrases', preferences:'Building and puzzles', comfort:'Being held when welcomed'},
 {name:'Sam', temperament:'Varies with the situation', communication:'Sounds and facial expressions', preferences:'Books and quiet play; Music and movement', comfort:'A quiet space and time; A familiar toy or blanket'},
 {name:'Taylor', temperament:'Still getting to know', communication:'Other — see additional notes', preferences:'Other — see additional notes', comfort:'Other — see additional notes'}
];
assert.match(create(fixtures[0]).description, /points/);
assert.match(create(fixtures[1]).description, /says “there”/);
assert.match(create(fixtures[0]).options[0], /picture book/);
assert.match(create(fixtures[1]).options[0], /building blocks/);
assert.match(create(fixtures[1]).options[2], /invitation before touching/);
assert.match(create(fixtures[2]).entries[2][1], /several comforts/);
assert.doesNotMatch(create(fixtures[2]).options[0], /book|song/);
assert.match(create(fixtures[3]).entries[2][1], /not clear/);
for (const fixture of fixtures) {
 const content = create(fixture);
 assert.equal(content.options.length,3);
 for (const [,feedback] of content.entries) {
  assert.ok(feedback.split(/[.!?](?:\s|$)/).filter(Boolean).length <= 3);
  assert.ok(feedback.split(' ').length < 75);
  assert.doesNotMatch(feedback,/undefined|prediction|score/);
 }
}
// Check each input changes relevant content even with all other fields held constant.
const baseline=create(fixtures[0]);
assert.notEqual(create({...fixtures[0],communication:'Short phrases'}).options[1],baseline.options[1]);
assert.notEqual(create({...fixtures[0],temperament:'Highly active'}).description,baseline.description);
assert.notEqual(create({...fixtures[0],preferences:'Building and puzzles'}).entries[0][1],baseline.entries[0][1]);
assert.notEqual(create({...fixtures[0],comfort:'Being held when welcomed'}).options[2],baseline.options[2]);
console.log('PASS independent communication, temperament, activity and comfort effects; multiple/unknown fallbacks; concise feedback');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 const page=await browser.newPage({viewport:{width:390,height:844}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(5000);
 const base=process.env.LITTLE_MOMENTS_URL||'http://127.0.0.1:8000/little-moments/';
 await page.goto(base+'#profile');await page.locator('#load-sample').click();await page.locator('#create-invitation').click();
 const sample=JSON.parse(Buffer.from((await page.locator('#invitation-code').inputValue()).slice(4),'base64')).profile;
 for(const fixture of fixtures){
 await page.goto(base+'#home');
 const profile={...sample,...fixture,notes:'Fictional testing profile.'};
 await page.locator('#invitation-input').fill('LM1.'+Buffer.from(JSON.stringify({version:1,profile})).toString('base64'));
 await page.locator('#invitation-form button').click();
 assert.equal(await page.locator('input[name="response"]').count(),3);
 assert.equal(await page.locator('input[name="adjustment"]').count(),0);
 await page.locator('#see-feedback').click();assert.match(await page.locator('#selection-message').innerText(),/choose a response/);
 for(let i=0;i<3;i++){
 await page.locator('input[name="response"]').nth(i).check();
 assert.equal(await page.locator('#feedback-panel').isVisible(),false);
 await page.locator('#see-feedback').click();
 assert.equal(await page.locator('#feedback-explanation').innerText(),create(profile).entries[i][1]);
 assert.equal(await page.locator('#scenario-navigation').isVisible(),true);
 assert.equal(await page.evaluate(()=>document.activeElement.id),'feedback-panel');
 }
 for(const width of [320,390,768,1280]){await page.setViewportSize({width,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);}
 await page.locator('#next-scenario').click();assert.match(await page.locator('#scenario-title').innerText(),/Lunch/);
 await page.reload();assert.equal(await page.locator('#caregiver-screen').isVisible(),false);assert.match(await page.locator('#invitation-status').innerText(),/not active/);
 }
 assert.deepEqual(errors,[]);
 console.log('PASS 12 single-decision paths across four fictional profiles; optional comparison, focus, mobile, Mealtime handoff and refresh protection');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
