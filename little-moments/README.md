# Little Moments

A classroom prototype for helping parents share a child's preferences and helping caregivers think through everyday situations. This folder contains the current submission only: the original homepage, three illustrated scenarios, the simple one-decision interaction, and brief feedback. Bedtime offers three plausible approaches with benefits and limitations.

## Try it

Open `index.html` in a browser. Choose **Create a child profile → Use Taeha sample → Caregiver view**. Select a response, choose **See Feedback**, and optionally compare another response or continue. The sample is explicitly fictional. No installation is required.

Keep `index.html` and `images/` together when downloading. To serve locally instead, run `python3 -m http.server --bind 127.0.0.1 8000` from this folder.

## Files for this submission

| File | Purpose |
| --- | --- |
| `index.html` | The complete app: semantic HTML, internal CSS, and JavaScript. |
| `images/` | Three matching AI-generated fictional scenario illustrations. |
| `tests/regression.cjs` | Checks for current profile, invitation, scenario, and image behavior. |
| `README.md` | Opening instructions and notes for the current version. |

There are no alternative app versions or experimental stylesheets in this folder. Earlier experiments remain on separate Git branches; they are not needed to open this version.

## HTML and CSS design

Semantic landmarks, labeled form controls, and a native radio-button fieldset organize the experience. Cream and sage colors, borders, padding, and gaps group related information. CSS Grid places the scenario and its illustration side by side on larger screens and in one column at 650px and below. Profile form columns also stack on small screens. Focus styles help keyboard users see their position. No external fonts, framework, or third-party image service is needed.

## Scope and privacy

Use fictional information. The provisional practice range is 18–36 months; the content is not a developmental assessment or validated parenting advice. Parent profiles are stored in this browser. Imported profiles remain in memory only, and refresh requires explicit re-entry. Missing answers never inherit sample data. Invalid or incomplete profiles cannot start personalized practice.

Invitations are readable snapshots, excluding photos. They are not encrypted, authenticated, revocable, or automatically updated. The illustrations are fictional, not portraits or predictions; the mealtime picture is not advice about suitable foods.

## Checks

From the repository root, start `python3 -m http.server --bind 127.0.0.1 8000`. With Playwright and Chromium available, run `node little-moments/tests/regression.cjs` in another terminal. Set `LITTLE_MOMENTS_URL` or `CHROMIUM_PATH` for a different address or browser path. Tests use isolated browser storage and fictional data.

## AI assistance

ChatGPT/Codex helped with layout, code, debugging, and fictional illustrations. The student provided the idea and paper sketch, tested alternatives, rejected unnecessary complexity, restored the preferred homepage, and directed revisions to scenario choices.
