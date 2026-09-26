# Little Sprout

[Open the live project](https://jp4890-coder.github.io/MSTU-5003-5013-project/)

## Original idea

I wanted to make a simple meal-planning tool for parents and caregivers. They choose foods their child may be open to, get a recipe idea with an explanation, and can optionally explore one new food. They can also save meals they serve and review them later.

## Instructions for opening the project

The app uses plain HTML, CSS, and JavaScript; it has no package installation step.

1. Open a terminal in this folder.
2. Start a local web server with `python3 -m http.server --bind 127.0.0.1 8000`.
3. Open [http://localhost:8000](http://localhost:8000) in a browser.

The app's files are `index.html`, `styles.css`, `recipe-card.css`, and `app.js`. Offer history and recent suggestions are stored in the browser used to open the app, so they do not automatically transfer to another browser or device.

## AI tool and selected prompts

AI tool: OpenAI Codex. These are selected prompt excerpts from the design and implementation process:

- “I would like to create a small browser-based version of this idea…”
- “There should be more food than the 12 food displayed…including beef and pork.”
- “The recipe itself fits for toddler and older, right? I would like to see more detailed instruction on how to make it.”
- “It would be great if the users could check what they have offered in the calendar…”
- “Also, I don't think the name part is necessary. It seems to interfere with other parts of the webpage which is more important.”

## Reflection

The main interaction matches my intention: parents and caregivers choose foods, receive a recipe that uses some as starting points, and see why it was suggested. I expanded the original 12 choices into searchable categories, added step-by-step recipes, and made it possible to log a meal when it is served and review it later. After reviewing the page, I moved the history near food selection and removed the child-name field and age selector; the name took space from the main task, and age did not change the recommendations. I did not run a formal test session, so these were design revisions based on walkthrough feedback, not results from a user study.

Codex helped brainstorm features and draft the HTML, CSS, JavaScript, food list, and recipes. As I refined the idea, I wanted the selected foods to guide a thoughtful recipe and give caregivers an optional way to explore an additional ingredient. We considered a “Surprise me” button for another unexpected recipe, but I wanted to answer a more specific caregiver question: “What could I serve alongside this recipe if I want to offer an additional ingredient?” That led to the “food bridge” idea: keep the recipe grounded in the caregiver’s selections, then suggest one ingredient to serve separately alongside it. I chose the optional label “Try something new” so caregivers can decide whether it fits or ignore it. This may reduce some guesswork and offer a small, low-pressure way to explore an ingredient without changing the recipe or requiring the child to eat it, though it cannot predict whether the child will like it. The history saves the recipe name, date served, and caregiver’s overall review. It does not track which ingredients the child has tried individually, so the suggested ingredient might not be new to them. The recipes and matching rules are limited and hand-authored, and I have not tested with families or had every recipe reviewed by a pediatric dietitian. I still need to learn whether these pairings feel useful and how well the app works across devices.
