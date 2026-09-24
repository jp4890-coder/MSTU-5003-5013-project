# Little Sprout

Little Sprout is a small browser-based meal idea tool for toddlers and older children. The original idea was to let a caregiver select foods a child may be willing to eat, then suggest a meal that uses those foods as a starting point and explain why it fits. The prototype includes searchable food categories, recipe instructions, an offer calendar with later reviews, and local browser storage. It is a design prototype, not a nutrition or medical tool.

## Open the project

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

The core interaction matched my intention: a caregiver can select foods, get a recipe that uses some of those foods as anchors, and see why it was suggested. I expanded the original 12 choices into searchable categories, added step-by-step recipes, and moved offer history into a calendar. I also changed the offer flow so the caregiver records a meal when it is served and adds a response later from the calendar. I did not run formal tests; I revised the interface in response to walkthrough feedback, including removing the age selector because recipe suggestions were not actually changing by age and moving history so it is visible before food selection without taking over the page.

Codex helped generate and revise the HTML, CSS, JavaScript, food list, recipe data, and calendar interaction. I had to decide what the app should promise: it targets children ages 1 and up, uses selected foods as starting points rather than simply combining them, and stores history locally. I also chose to remove child-name personalization and defer age-based recipe adaptation rather than imply functionality the app did not provide. The recipe catalog and matching rules are still hand-authored and limited; I have not checked every recipe with a pediatric dietitian or tested all combinations and devices. It remains uncertain whether the recipe variety and “not offered recently” rule will feel useful to families in real use.
