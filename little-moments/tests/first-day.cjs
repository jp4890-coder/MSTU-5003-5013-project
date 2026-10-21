// Local server required. Optional LM_REVIEW_DIR saves fictional-profile mobile screenshots.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { chromium } = require('playwright');
const base = process.env.LITTLE_MOMENTS_URL || 'http://127.0.0.1:8000/little-moments/';
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../first-day.js'), 'utf8'), context);
const create = context.createFirstDay;
const fixtures = [
  { name: 'Robin', unfamiliar: 'Watches before joining', preferences: 'Books and quiet play', communication: 'Gestures and pointing', comfort: 'A familiar toy or blanket', mode: 'observe' },
  { name: 'Alex', unfamiliar: 'Joins in quickly', preferences: 'Building and puzzles', communication: 'Short phrases', comfort: 'Being held when welcomed', mode: 'join' },
  { name: 'Sam', unfamiliar: 'Varies with the situation', preferences: 'Books and quiet play; Music and movement', communication: 'Sounds and facial expressions', comfort: 'A quiet space and time; A familiar toy or blanket', mode: 'uncertain' }
];
for (const profile of fixtures) {
  const content = create(profile);
  assert.equal(content.mode, profile.mode);
  assert.equal(content.choices.length, 3);
  for (let initial = 0; initial < 3; initial++) {
    const reaction = content.reactions[initial];
    assert.equal(new Set(reaction.adjustments.map(a => a.kind)).size, 3);
    assert.ok(reaction.prompt.endsWith('?'));
    for (let adjusted = 0; adjusted < 3; adjusted++) {
      const takeaway = content.takeaway(initial, adjusted);
      assert.ok(takeaway.fact && takeaway.insight && takeaway.next);
      assert.doesNotMatch(JSON.stringify(takeaway), /undefined|show one possibility|name the pause/);
      if (reaction.adjustments[adjusted].kind === 'communication') assert.doesNotMatch(takeaway.fact, /held|blanket/);
      assert.ok(takeaway.insight.split(' ').length < 65);
    }
  }
}
assert.equal(create({}).mode, 'uncertain');
assert.equal(create({ unfamiliar: 'Watches before joining; Joins in quickly' }).mode, 'uncertain');
assert.match(create(fixtures[2]).details, /No comfort option is ranked/);
assert.doesNotMatch(create(fixtures[2]).cue, /book|song/);
assert.match(create({ comfort: 'Other — see additional notes' }).choices[2], /ask the parent/);
// Audit every supported single preference/comfort/communication plus multi-selection fallbacks.
for (const preferences of ['Books and quiet play', 'Building and puzzles', 'Music and movement', 'Outdoor play', 'Pretend play', 'Other — see additional notes']) {
  for (const communication of ['Gestures and pointing', 'Short phrases', 'Single words', 'Sounds and facial expressions', 'A mix of words and gestures', 'Other — see additional notes']) {
    const content = create({ ...fixtures[0], preferences, communication });
    assert.doesNotMatch(JSON.stringify(content), /undefined|show one possibility|name the pause|nearer to the song/);
  }
}
for (const comfort of ['A familiar toy or blanket', 'Being held when welcomed', 'A song or story', 'A familiar adult nearby', 'A quiet space and time']) {
  assert.doesNotMatch(create({ comfort }).choices[2], /ask the parent/);
}
console.log('PASS three authored settings, all supported language variants, distinct adjustment actions and path-specific takeaways');
(async () => {
 const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
 try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.setDefaultTimeout(5000);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('favicon.ico')) errors.push('HTTP ' + r.status()); });
  await page.goto(base + '#profile');
  await page.locator('#load-sample').click();
  await page.locator('#create-invitation').click();
  const code = await page.locator('#invitation-code').inputValue();
  const sample = JSON.parse(Buffer.from(code.slice(4), 'base64')).profile;
  const heights = [];
  async function review() {
    // Native disclosure and buttons work with keyboard as well as pointer input.
    await page.locator('#first-day-review summary').focus();
    await page.keyboard.press('Enter');
  }
  async function screenshot(name, step) {
    if (!process.env.LM_REVIEW_DIR) return;
    fs.mkdirSync(process.env.LM_REVIEW_DIR, { recursive: true });
    await page.screenshot({ fullPage: true, path: path.join(process.env.LM_REVIEW_DIR, `${name.toLowerCase()}-${step}.png`) });
  }
  for (const fixture of fixtures) {
    await page.setViewportSize({ width: 390, height: 844 });
    const profile = { ...sample, ...fixture, notes: 'Fictional test profile.' }; delete profile.mode;
    const content = create(profile);
    await page.goto(base + '#home');
    await page.locator('#invitation-input').fill('LM1.' + Buffer.from(JSON.stringify({ version: 1, profile })).toString('base64'));
    await page.locator('#invitation-form button').click();
    assert.match(await page.locator('#learning-progress').innerText(), /Moment 1 of 3/i);
    assert.equal(await page.locator('#feedback-panel').isVisible(), false);
    await screenshot(fixture.name, '01-notice-choose');
    await page.locator('#see-feedback').click();
    assert.match(await page.locator('#selection-message').innerText(), /choose a response/);
    assert.equal(await page.evaluate(() => document.activeElement.name), 'response');
    const sizes = { name: fixture.name, choose: await page.evaluate(() => document.documentElement.scrollHeight) };
    for (let initial = 0; initial < 3; initial++) {
      await page.locator('input[name="response"]').nth(initial).check();
      await page.locator('#see-feedback').click();
      assert.equal(await page.locator('#see-feedback').isVisible(), false);
      assert.equal(await page.locator('#first-day-notice').isVisible(), false);
      assert.equal(await page.locator('#first-day-review').getAttribute('open'), null);
      assert.equal(await page.evaluate(() => document.activeElement.id), 'learning-progress');
      assert.match(await page.locator('#feedback-panel .eyebrow').innerText(), /not a prediction/i);
      assert.equal(await page.locator('#reaction-meaning').innerText(), content.reactions[initial].prompt);
      assert.equal(await page.locator('#first-day-takeaway').isVisible(), false);
      if (initial === 1) {
        await screenshot(fixture.name, '02-observe-adjust');
        sizes.adjust = await page.evaluate(() => document.documentElement.scrollHeight);
      }
      await page.locator('#choose-adjustment').click();
      assert.equal(await page.evaluate(() => document.activeElement.name), 'adjustment');
      for (let adjusted = 0; adjusted < 3; adjusted++) {
        await page.locator('input[name="adjustment"]').nth(adjusted).check();
        await page.locator('#choose-adjustment').click();
        assert.equal(await page.locator('#feedback-panel').isVisible(), false);
        assert.equal(await page.locator('#first-day-adjust').isVisible(), false);
        assert.equal(await page.locator('#first-day-review').getAttribute('open'), null);
        assert.equal(await page.evaluate(() => document.activeElement.id), 'learning-progress');
        const expected = content.takeaway(initial, adjusted);
        assert.deepEqual(await page.locator('#takeaway-details dd').allTextContents(), [expected.fact, expected.insight, expected.next]);
        assert.deepEqual(await page.locator('#takeaway-details dt').allTextContents(), ['What mattered', 'What you practiced', 'What to notice next']);
        assert.match(await page.locator('#next-scenario').innerText(), /Continue to Mealtime/);
        if (initial === 1 && adjusted === 0) {
          await screenshot(fixture.name, '03-reflect');
          sizes.reflect = await page.evaluate(() => document.documentElement.scrollHeight);
        }
        await page.locator('#first-day-reflection').fill('Temporary fictional reflection');
        if (adjusted < 2) {
          await review();
          assert.match(await page.locator('#first-day-review').innerText(), /clears.*reflection/);
          await page.locator('#revise-adjustment').press('Enter');
          assert.equal(await page.locator('#first-day-reflection').inputValue(), '');
          assert.match(await page.locator('#revision-status').innerText(), /first response.*unchanged/);
          assert.equal(await page.locator('input[name="adjustment"]:checked').count(), 0);
        }
      }
      if (initial < 2) {
        await review(); await page.locator('#revise-initial').press('Enter');
        assert.equal(await page.locator('#first-day-reflection').inputValue(), '');
        assert.equal(await page.locator('input[name="adjustment"]').count(), 0);
        assert.equal(await page.locator('#scenario-navigation').isVisible(), false);
        assert.match(await page.locator('#revision-status').innerText(), /Later decisions.*cleared/);
      }
    }
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    }
    heights.push(sizes);
    await page.locator('#next-scenario').click();
    assert.equal(await page.locator('#first-day-review').isVisible(), false);
    assert.equal(await page.locator('#learning-progress').isVisible(), false);
    assert.equal(await page.locator('.profile-card').isVisible(), true);
    assert.equal(await page.locator('#see-feedback').innerText(), 'See Feedback');
    assert.match(await page.locator('#scenario-title').innerText(), /Lunch/);
    await page.reload();
    assert.equal(await page.locator('#caregiver-screen').isVisible(), false);
    assert.match(await page.locator('#invitation-status').innerText(), /not active/);
    assert.doesNotMatch(await page.evaluate(() => localStorage.getItem('little-moments-profile')), /Temporary fictional/);
  }
  assert.deepEqual(errors, []);
  console.log('PASS all 27 profile/initial/adjustment paths, concise takeaways, disclosure, keyboard revision, focus and resets');
  console.log('PASS mobile overflow, unchanged Mealtime handoff, refresh re-entry and no runtime/request errors');
  console.log('390px document heights:', JSON.stringify(heights));
 } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
