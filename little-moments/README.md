# Little Moments

A portfolio demo for personalized, scenario-based caregiver learning. The provisional practice audience is children ages 18–36 months; content is not a developmental assessment. Use fictional information.

## Open the app

Open `index.html` in a browser. Start with **For parents**, choose **Use Taeha sample**, and open **Caregiver view** to try three scenarios. You can also create a profile and copy an invitation for the caregiver entry screen.

## Implementation

One HTML file contains semantic HTML, CSS, and JavaScript. Parent profiles are saved in this browser’s local storage. Missing fields stay unknown, and incomplete profiles cannot start practice or create invitations. The fictional Taeha profile loads only when explicitly selected. Clearing or replacing an existing profile requires confirmation. Scenarios use predefined rules; they are not AI-generated.

Invitations contain a snapshot of the saved profile, excluding photos. They are not encrypted or password protected. Share only fictional information for demonstrations. Invitations are readable copies, including notes, with no authentication, expiry, revocation, or automatic updates. This is not a secure production service. No real profile or photo is included in this repository.

## Session behavior

Imported caregiver profiles remain in memory only and never replace the locally saved parent profile. Home navigation preserves the active session; returning through the parent entry restores the parent profile. Refreshing a caregiver screen requires invitation re-entry (or an explicit parent preview); it never silently selects a saved or sample child. No child data is added to session storage. Photo data is omitted from invitations.

Saved data outside the current schema or age range is not used for guidance and is left untouched until the user explicitly saves, clears, or replaces it. Incomplete supported data can be reviewed without inheriting sample answers. Previously shared copies cannot be recalled by clearing the local profile.

Bedtime uses one deterministic choice: a book reported in either routine field, then a song, then quiet time; otherwise the feedback asks the caregiver to confirm a familiar activity. This priority is a presentation rule, not a clinical judgment.

## Stage 1 regression checks

From the repository root, start `python3 -m http.server --bind 127.0.0.1 8000`. With Playwright and Chromium installed, run `node little-moments/tests/stage1.cjs` in another terminal. The checks use fictional data and isolated browser storage. Set `CHROMIUM_PATH` or `LITTLE_MOMENTS_URL` if needed. No framework or application package dependencies were added.

Before real use, instructional review must confirm that the three situations, response wording, and small-choice expectations fit the 18–36 month range and differing communication abilities. Age validation alone does not make the content developmentally validated.

## First Day Together: two-decision practice

First Day Together now follows Notice → Choose → Observe → Adjust → Reflect. The caregiver chooses an initial response, reads one explicitly fictional possible reaction, and makes a second decision before continuing. A takeaway connects the parent report, both choices, observed practice cues, and a real-life observation or parent question. Reflection is optional; choices and reflection remain in memory only and are cleared when the scenario resets. There are no cooperation scores or predicted outcomes.

`first-day.js` contains the authored content in plain JavaScript. Three settings cover watching before joining, joining quickly, and uncertain/variable reports. Contradictory watch/join reports use the uncertain setting. Each setting has three initial choices, each with one authored reaction and three adjustments. Communication changes the cue and invitation format; favorite activities and comfort preferences supply supported offers. Selection uses a documented order in the source to choose one demonstration, not a judgment that one strategy is better. Unknown or “other” answers trigger neutral invitations and parent clarification; notes are not interpreted automatically. No new profile fields, storage, or external services were added.

Mealtime and Bedtime retain their Stage 1 content and single-decision interactions.

Run the additional checks with `node little-moments/tests/first-day.cjs`. They exercise all 27 initial/adjustment combinations across three fictional profiles, authored fallbacks, choice gating, takeaways, reset behavior, viewport widths, and refresh re-entry. The Stage 1 suite retains its existing assertions and now completes the required First Day adjustment before moving on.

## AI assistance

ChatGPT/Codex assisted with layout planning, HTML/CSS, JavaScript interactions, and debugging. The student supplied the concept and paper sketch and directed iterative design revisions.
