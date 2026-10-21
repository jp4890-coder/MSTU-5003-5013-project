// Run with a local server on port 8000: node little-moments/tests/stage1.cjs
// Requires Playwright and Chromium; no real child information is used.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.LITTLE_MOMENTS_URL || 'http://127.0.0.1:8000/little-moments/';
const invitation = profile => 'LM1.' + Buffer.from(JSON.stringify({ version: 1, profile })).toString('base64');
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  const errors = [];
  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(5000);
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '#profile');
    assert.equal(await page.locator('#child-name').inputValue(), '');
    await page.locator('#load-sample').click();
    await page.locator('#create-invitation').click();
    const code = await page.locator('#invitation-code').inputValue();
    const sample = JSON.parse(Buffer.from(code.slice(4), 'base64')).profile;
    assert.equal(sample.name, 'Taeha');
    console.log('PASS empty defaults and explicit fictional sample');

    page.once('dialog', dialog => dialog.dismiss());
    await page.locator('#clear-profile').click();
    assert.equal(await page.locator('#child-name').inputValue(), 'Taeha');
    await page.locator('#child-name').fill('Unsaved fictional edit');
    page.once('dialog', dialog => dialog.dismiss());
    await page.locator('#load-sample').click();
    assert.equal(await page.locator('#child-name').inputValue(), 'Unsaved fictional edit');
    console.log('PASS cancellation preserves saved profile and unsaved edits');

    await page.goto(base + '#home');
    const imported = { ...sample, name: 'Fictional Guest', photo: '' };
    await page.locator('#invitation-input').fill(invitation(imported));
    await page.locator('#invitation-form button').click();
    assert.match(await page.locator('#profile-title').innerText(), /Fictional Guest/);
    await page.getByRole('link', { name: 'Home', exact: true }).click();
    await page.evaluate(() => { location.hash = 'caregiver'; });
    await page.locator('#caregiver-screen').waitFor({ state: 'visible' });
    assert.match(await page.locator('#profile-title').innerText(), /Fictional Guest/);
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('little-moments-profile')).name), 'Taeha');
    await page.reload();
    await page.locator('#welcome-screen').waitFor({ state: 'visible' });
    assert.match(await page.locator('#invitation-status').innerText(), /not active/);
    assert.equal(await page.locator('#caregiver-screen').isVisible(), false);
    console.log('PASS invitation navigation, no imported-profile persistence, explicit refresh re-entry');

    for (const patch of [{ age: '17' }, { age: '37' }, { communication: '' }, { naps: '' }, { temperament: 'invented' }, { allergies: 'None known; Milk' }, { foods: 'invented' }, { name: ' '.repeat(2) }]) {
      await page.locator('#invitation-input').fill(invitation({ ...sample, ...patch }));
      await page.locator('#invitation-form button').click();
      assert.match(await page.locator('#invitation-status').innerText(), /invalid, incomplete/);
      assert.equal(await page.locator('#caregiver-screen').isVisible(), false);
    }
    await page.locator('#invitation-input').fill('LM1.invalid');
    await page.locator('#invitation-form button').click();
    assert.equal(await page.locator('#caregiver-screen').isVisible(), false);
    console.log('PASS malformed, missing, unsupported, contradictory and out-of-range invitations rejected');

    for (const age of ['18', '36']) {
      const profile = { ...sample, age, bedtimeRoutine: 'Song', routines: 'A book before bedtime' };
      await page.locator('#invitation-input').fill(invitation(profile));
      await page.locator('#invitation-form button').click();
      for (let scenario = 0; scenario < 3; scenario++) {
        for (let option = 0; option < 3; option++) {
          await page.locator('input[name="response"]').nth(option).check();
          await page.locator('#see-feedback').click();
          assert.ok((await page.locator('#feedback-explanation').innerText()).length > 30);
          if (scenario === 2 && option === 0) assert.match(await page.locator('#feedback-explanation').innerText(), /immediately may feel abrupt/);
          if (scenario === 2 && option === 1) {
            assert.match(await page.locator('.response-option').nth(1).innerText(), /bedtime book/);
            assert.match(await page.locator('#feedback-explanation').innerText(), /routine the parent reported/);
          }
        }
        // First Day now requires a second decision; retain all original safety checks.
        if (scenario === 0) {
          await page.locator('input[name="adjustment"]').first().check();
          await page.locator('#choose-adjustment').click();
        }
        await page.locator('#next-scenario').click();
      }
      await page.locator('#completion-card').waitFor({ state: 'visible' });
      await page.reload();
    }
    console.log('PASS age boundaries, all nine response paths, bedtime precedence and reassurance feedback');

    // Exercise general feedback and non-book bedtime fallbacks, not just the sample path.
    for (const bedtimeRoutine of ['Song', 'Quiet time', 'Other — see additional notes']) {
      const variant = { ...sample, temperament: 'Highly active', preferences: 'Building and puzzles', unfamiliar: 'Watches before joining', routines: 'A warning before transitions', bedtimeRoutine, settling: 'Resists stopping play' };
      await page.locator('#invitation-input').fill(invitation(variant));
      await page.locator('#invitation-form button').click();
      for (let scenario = 0; scenario < 3; scenario++) {
        for (let option = 0; option < 3; option++) {
          await page.locator('input[name="response"]').nth(option).check();
          await page.locator('#see-feedback').click();
          if (scenario === 0 && option === 0) assert.doesNotMatch(await page.locator('#feedback-explanation').innerText(), /slow-to-warm|enjoys books/);
          if (scenario === 2 && option === 1) {
            const explanation = await page.locator('#feedback-explanation').innerText();
            assert.doesNotMatch(explanation, /bedtime book/);
            assert.match(explanation, bedtimeRoutine === 'Song' ? /bedtime song/ : bedtimeRoutine === 'Quiet time' ? /quiet time/ : /Check with the parent/);
          }
        }
        // First Day now requires a second decision; retain all original safety checks.
        if (scenario === 0) {
          await page.locator('input[name="adjustment"]').first().check();
          await page.locator('#choose-adjustment').click();
        }
        await page.locator('#next-scenario').click();
      }
      await page.reload();
    }
    console.log('PASS general feedback, song/quiet-time/unknown bedtime variants');

    await page.evaluate(() => localStorage.setItem('little-moments-profile', JSON.stringify({ name: 'Partial fictional profile', age: '24' })));
    await page.goto(base + '#profile');
    await page.reload();
    assert.equal(await page.locator('#child-temperament').inputValue(), '');
    assert.equal(await page.locator('input[name="allergies"]:checked').count(), 0);
    await page.getByRole('link', { name: 'Caregiver view', exact: true }).click();
    assert.equal(await page.locator('#caregiver-screen').isVisible(), false);
    console.log('PASS incomplete local profile remains unknown and cannot start personalized practice');
    await page.evaluate(() => localStorage.setItem('little-moments-profile', '{broken'));
    await page.reload();
    assert.match(await page.locator('#save-status').innerText(), /could not be safely loaded/);
    assert.equal(await page.locator('#child-name').inputValue(), '');
    assert.deepEqual(errors, []);
    console.log('PASS corrupt storage handling and no JavaScript runtime errors');
    page.once('dialog', dialog => dialog.accept());
    await page.locator('#load-sample').click();
    await page.locator('#child-name').fill('Fictional parent profile');
    await page.locator('#child-profile-form button[type="submit"]').click();
    await page.reload();
    assert.equal(await page.locator('#child-name').inputValue(), 'Fictional parent profile');
    await page.getByRole('link', { name: 'Caregiver view', exact: true }).click();
    await page.locator('#caregiver-screen').waitFor({ state: 'visible' });
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    }
    await page.getByRole('link', { name: 'Child profile', exact: true }).click();
    page.once('dialog', dialog => dialog.accept());
    await page.locator('#clear-profile').click();
    await page.reload();
    assert.equal(await page.locator('#child-name').inputValue(), '');
    assert.deepEqual(errors, []);
    console.log('PASS parent save/reload/preview, four viewport widths, confirmed clear persistence');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
