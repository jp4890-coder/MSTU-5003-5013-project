// Start the README's local server, then: node little-moments/tests/first-day.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { chromium } = require('playwright');
const base = process.env.LITTLE_MOMENTS_URL || 'http://127.0.0.1:8000/little-moments/';
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, '../first-day.js'), 'utf8'), context);
const create = context.createFirstDay;
const fixtures = [
  { name: 'Fictional Reader', unfamiliar: 'Watches before joining', preferences: 'Books and quiet play', communication: 'Gestures and pointing', comfort: 'A familiar toy or blanket', mode: 'observe' },
  { name: 'Fictional Builder', unfamiliar: 'Joins in quickly', preferences: 'Building and puzzles', communication: 'Short phrases', comfort: 'Being held when welcomed', mode: 'join' },
  { name: 'Fictional Explorer', unfamiliar: 'Varies with the situation', preferences: 'Other — see additional notes', communication: 'Other — see additional notes', comfort: 'Other — see additional notes', mode: 'uncertain' }
];
for (const profile of fixtures) {
  const content = create(profile);
  assert.equal(content.mode, profile.mode);
  assert.equal(content.choices.length, 3);
  assert.equal(content.reactions.length, 3);
  assert.ok(content.observation.includes('interpretations'));
  for (const reaction of content.reactions) {
    assert.equal(reaction.adjustments.length, 3);
    assert.ok(reaction.meaning.length > 40);
    for (const adjustment of reaction.adjustments) assert.ok(adjustment.feedback.length > 40);
  }
}
assert.equal(create({}).mode, 'uncertain');
assert.match(create({}).parentLink, /ask rather than invent/);
assert.equal(create({ unfamiliar: 'Watches before joining; Joins in quickly' }).mode, 'uncertain');
for (const comfort of ['A quiet space and time', 'A familiar adult nearby', 'A song or story', 'Being held when welcomed', 'A familiar toy or blanket']) {
  assert.doesNotMatch(create({ comfort }).parentLink, /not specified/);
}
assert.match(create(fixtures[0]).choices[0], /acknowledge the point/);
assert.match(create(fixtures[1]).choices[0], /acknowledge “that/);
assert.match(create({ communication: 'Sounds and facial expressions' }).choices[0], /acknowledge the sound/);
for (const activity of ['Music and movement', 'Outdoor play', 'Pretend play']) {
  assert.doesNotMatch(create({ preferences: activity }).choices[0], /simple activity already available/);
}
console.log('PASS authored variant, activity, communication, comfort, conflict and unknown fallbacks');

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(5000);
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400) errors.push('HTTP ' + r.status() + ' ' + r.url()); });
    await page.goto(base + '#profile');
    await page.locator('#load-sample').click();
    await page.locator('#create-invitation').click();
    const code = await page.locator('#invitation-code').inputValue();
    const sample = JSON.parse(Buffer.from(code.slice(4), 'base64')).profile;
    const initialTexts = [];
    for (const fixture of fixtures) {
      const profile = { ...sample, ...fixture };
      delete profile.mode;
      const invitation = 'LM1.' + Buffer.from(JSON.stringify({ version: 1, profile })).toString('base64');
      await page.goto(base + '#home');
      await page.locator('#invitation-input').fill(invitation);
      await page.locator('#invitation-form button').click();
      initialTexts.push(await page.locator('.scenario-description').innerText());
      assert.match(await page.locator('#first-day-facts').innerText(), new RegExp(fixture.communication));
      await page.locator('#see-feedback').click();
      assert.match(await page.locator('#selection-message').innerText(), /choose a response/);
      assert.equal(await page.locator('#first-day-adjust').isVisible(), false);
      for (let initial = 0; initial < 3; initial++) {
        await page.locator('input[name="response"]').nth(initial).check();
        await page.locator('#see-feedback').click();
        assert.match(await page.locator('#feedback-title').innerText(), /One possible reaction/);
        assert.match(await page.locator('#feedback-panel .eyebrow').innerText(), /not a prediction/i);
        assert.equal(await page.locator('#scenario-navigation').isVisible(), false);
        await page.locator('#choose-adjustment').click();
        assert.match(await page.locator('#adjust-message').innerText(), /Choose what/);
        for (let adjusted = 0; adjusted < 3; adjusted++) {
          await page.locator('input[name="adjustment"]').nth(adjusted).check();
          assert.equal(await page.locator('#scenario-navigation').isVisible(), false);
          await page.locator('#choose-adjustment').click();
          assert.equal(await page.locator('#first-day-takeaway').isVisible(), true);
          assert.equal(await page.locator('#scenario-navigation').isVisible(), true);
          const details = await page.locator('#takeaway-details dd').allTextContents();
          assert.equal(details.length, 5);
          assert.equal(details[2], await page.locator('.response-options > label span').nth(initial).innerText().then(t => t.replace(/^[ABC]\. /, '')));
          assert.equal(details[3], await page.locator('#adjust-options label span').nth(adjusted).innerText());
          assert.match(details[4], /Ask the parent/);
          assert.ok((await page.locator('#adjustment-feedback').innerText()).length > 40);
        }
        await page.locator('#first-day-reflection').fill('Fictional reflection; do not retain.');
        // A revised initial response invalidates the old adjustment and takeaway.
        await page.locator('input[name="response"]').nth((initial + 1) % 3).check();
        assert.equal(await page.locator('#first-day-takeaway').isVisible(), false);
        assert.equal(await page.locator('#first-day-reflection').inputValue(), '');
        assert.equal(await page.locator('#scenario-navigation').isVisible(), false);
      }
      await page.locator('#see-feedback').click();
      await page.locator('input[name="adjustment"]').first().check();
      await page.locator('#choose-adjustment').click();
      for (const width of [320, 390, 768, 1280]) {
        await page.setViewportSize({ width, height: 844 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      }
      await page.locator('#next-scenario').click();
      assert.equal(await page.locator('#first-day-notice').isVisible(), false);
      assert.equal(await page.locator('#first-day-adjust').isVisible(), false);
      assert.equal(await page.locator('#first-day-takeaway').isVisible(), false);
      assert.equal(await page.locator('#see-feedback').innerText(), 'See Feedback');
      assert.match(await page.locator('#scenario-title').innerText(), /Lunch/);
      assert.match(await page.locator('#meal-note').innerText(), /allergies/);
      await page.reload();
      assert.equal(await page.locator('#caregiver-screen').isVisible(), false);
      assert.match(await page.locator('#invitation-status').innerText(), /not active/);
      assert.doesNotMatch(await page.evaluate(() => localStorage.getItem('little-moments-profile')), /Fictional reflection/);
    }
    assert.equal(new Set(initialTexts).size, 3);
    assert.deepEqual(errors, []);
    console.log('PASS 27 initial/adjustment combinations across three profiles; decision gating and personalized takeaways');
    console.log('PASS stale-state reset, mobile overflow, Mealtime handoff, refresh re-entry and no runtime/request errors');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
