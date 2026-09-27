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
- “There is a review for each recipe: Does this information apply to the next recipe recommendation?”
- “Is there anyway we can add an option to exclude, rather than include some ingredients?”

## Reflection

The main interaction matches my intention: parents and caregivers choose foods, receive a recipe that uses some as starting points, and see why it was suggested. I expanded the original 12 choices into searchable categories, including beef and pork, added step-by-step recipes, and made it possible to log and review meals. Walkthrough feedback led me to move history nearer to food selection and remove the child-name field and age selector, which took space without affecting recommendations. Codex helped brainstorm and draft the HTML, CSS, JavaScript, food list, and recipes, while I made the product decisions. For example, we considered a “Surprise me” button for an unexpected recipe, but I chose the more specific “food bridge” to help caregivers who want their child to try new foods but are unsure what to offer or how. It suggests an extra ingredient to serve separately alongside a recipe based on selected foods. I named it “Try something new” and made it optional, so caregivers can explore a flavor in a low-pressure way without changing the meal or requiring the child to eat it, though it cannot predict whether the child will like it. I did not run a formal user study; these changes reflect walkthrough feedback, not tested outcomes.

The current version also has limitations and room to improve. The offer log saves the recipe, date, and caregiver’s overall review, but reviews do not affect recommendations yet: “Not today” cannot tell whether a child disliked cucumber, chicken, or pasta in a combined recipe. A future version could avoid suggesting that same meal for a while and let caregivers flag an ingredient when they know what prompted the response. Caregivers also cannot exclude ingredients, and simply requesting another suggestion does not guarantee that a food the child cannot eat will be omitted. An optional “avoid these ingredients” filter should check each recipe’s full ingredient list and explain when nothing matches. The app does not track which ingredients a child has tried, its recipes and matching rules are hand-authored, and I have not tested them with families or had every recipe reviewed by a pediatric dietitian. I still need to learn whether caregivers find the ideas useful and how well the app works across devices.
