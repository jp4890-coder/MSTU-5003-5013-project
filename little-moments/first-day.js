/* Small authored variants, not predictions. Caller supplies a validated profile.
   Multiple activities use a neutral setting; multiple comforts remain alternatives.
   No preference ranking, generated content, or persistent learning records. */
function createFirstDay(profile) {
  const answers = key => (profile[key] || '').split('; ').filter(Boolean);
  const has = (key, value) => answers(key).includes(value);
  const watches = has('unfamiliar', 'Watches before joining');
  const joins = has('unfamiliar', 'Joins in quickly');
  const mode = has('unfamiliar', 'Varies with the situation') || watches === joins ? 'uncertain' : watches ? 'observe' : 'join';
  const activityNames = {
    'Books and quiet play': ['a picture book', 'the book'],
    'Building and puzzles': ['large building blocks', 'the blocks'],
    'Music and movement': ['a quiet song', 'the music area'],
    'Pretend play': ['pretend-play toys', 'the toys'],
    'Outdoor play': ['a view of the outdoor play area', 'the window']
  };
  const activity = answers('preferences').length === 1 ? activityNames[profile.preferences] : null;
  const object = activity ? activity[1] : 'the play area';
  const offer = activity ? activity[0] : 'the nearby play materials';
  const gestures = has('communication', 'Gestures and pointing') || has('communication', 'A mix of words and gestures');
  const words = has('communication', 'Short phrases') || has('communication', 'Single words');
  // Mixed communication uses a gesture in this fictional moment, not a claim of preference.
  const signal = gestures ? `points toward ${object}` : words ? `says “that” while turning toward ${object}` : `turns toward ${object} and makes a sound`;
  const acknowledge = gestures ? 'Point in the same direction and ask “Over there?” Then wait.' : words ? 'Say “You said ‘that.’ Do you mean over here?” and gesture toward the area. Then wait.' : 'Say “I hear you,” gesture toward the area, and wait for another signal.';
  const singleComfort = {
    'A familiar toy or blanket': 'Place a parent-approved familiar comfort item within reach.',
    'Being held when welcomed': 'Offer open arms; wait for a clear invitation before touching.',
    'A song or story': 'Offer a quiet song or story, stopping if it is not welcome.',
    'A familiar adult nearby': 'Sit nearby and offer company without asking the child to join.',
    'A quiet space and time': 'Reduce noise nearby and stay available.'
  };
  const comforts = answers('comfort');
  const comfortNames = {
    'A familiar toy or blanket': 'a familiar item',
    'Being held when welcomed': 'being held if welcomed',
    'A song or story': 'a song or story',
    'A familiar adult nearby': 'company nearby',
    'A quiet space and time': 'quiet time nearby'
  };
  const comfortOptions = comforts.map(value => comfortNames[value]);
  const comfortList = comfortOptions.slice(0, -1).join(', ') + ' or ' + comfortOptions.at(-1);
  const support = comforts.length === 1 && singleComfort[comforts[0]] ? singleComfort[comforts[0]]
    : comforts.length > 1 && comfortOptions.every(Boolean) ? `Offer ${comfortList}; wait for a response before starting any support.`
    : 'Stay nearby and ask the parent which kind of support has helped at handoffs.';
  const n = profile.name;
  const cue = mode === 'join' ? `${n} enters the play area and ${signal}, then steps back toward the doorway.` : mode === 'observe' ? `${n} stays near the doorway and ${signal}.` : `${n} pauses between the doorway and play area, then ${signal}.`;
  const choices = [
    { text: `Offer ${offer} from where you are, then pause.`, short: 'offering an activity' },
    { text: `Say “I’m here,” and wait nearby without starting an activity.`, short: 'waiting nearby' },
    { text: support, short: 'offering support' }
  ];
  const communicationFact = `The parent reports: ${profile.communication || 'communication not yet known'}.`;
  const comfortFact = comforts.length ? `The parent lists: ${profile.comfort}. These are options, not a ranked preference.` : 'A handoff comfort strategy is not yet known.';
  const unfamiliarFact = `The parent reports: ${profile.unfamiliar || 'handoff pattern not yet known'}.`;
  const questions = {
    communication: gestures ? 'Ask the parent: “When a point is repeated, what usually helps you check what it means?”' : words ? 'Ask the parent: “What does ‘that’ usually refer to, and how do you check?”' : 'Ask the parent: “How do you check what this sound or turn is asking for?”',
    support: comforts.length > 1 ? 'Ask the parent which of the listed comforts has helped during recent handoffs; watch which offer is accepted today.' : comforts.length === 1 && singleComfort[comforts[0]] ? 'Watch whether the child accepts or turns away from this comfort offer. Ask the parent what acceptance usually looks like.' : 'Ask the parent what has helped at recent handoffs before assuming a comfort preference.',
    space: mode === 'join' ? 'Watch whether the child returns to the activity or signals again; joining quickly can still include pauses.' : mode === 'observe' ? 'Watch for a new reach or signal while waiting; time to observe does not mean the child needs no response.' : 'Ask the parent what recent handoffs have looked like; keep responding to new signals rather than assuming one pattern.'
  };
  // Each initial response has a different new cue. All adjustments are different actions.
  const reactions = [
    {
      cue: `${n} moves nearer, holds one hand out, and stops before joining.`,
      prompt: 'What changed when the child moved nearer and held out a hand?',
      meaning: 'Moving nearer and stopping leave the request uncertain. A held-out hand alone is not permission for touch.',
      adjustments: [
        { kind: 'communication', text: 'Hold your hand still and ask “Would you like help?” Wait before acting.', insight: 'You checked a possible request for help instead of treating movement closer as agreement to join.' },
        { kind: 'support', text: `Pause the activity offer. ${support}`, insight: 'You treated the pause as a reason to offer support rather than push for participation.' },
        { kind: 'space', text: 'Move the materials within reach, step back, and stay available.', insight: 'You responded to the pause by making the activity easier to reach and stepping back. Keep watching for new requests.' }
      ]
    },
    {
      cue: `${n} repeats the signal toward ${object}, then reaches in that direction.`,
      prompt: 'What would you do with the repeated signal and new reach?',
      meaning: 'The repeated signal adds information. Waiting may still help, but it is worth checking whether practical help is being requested.',
      adjustments: [
        { kind: 'communication', text: acknowledge, insight: 'You checked the repeated signal instead of assuming waiting was still enough. Leave room for the child to correct your guess.' },
        { kind: 'support', text: 'Ask “Would you like help?” and wait before helping with the activity.', insight: 'You offered practical help rather than assuming the child wanted company. A reach does not tell you exactly what help is wanted.', fact: communicationFact, question: 'Watch whether the child accepts help or redirects you. Ask the parent how requests for help are usually expressed.' },
        { kind: 'space', text: 'Clear a path toward the area, step aside, and say “I’m nearby.”', insight: 'You removed an obstacle without taking over. Keep watching for further requests so giving space stays responsive.' }
      ]
    },
    {
      cue: `${n} turns away from the support offer and holds one hand out.`,
      prompt: 'What would you change after the turn away and held-out hand?',
      meaning: 'The turn away is new evidence about this offer. It does not establish whether the child wants another activity or simply a pause.',
      adjustments: [
        { kind: 'communication', text: 'Stop the offer and say “Not this?” Wait for another signal.', insight: 'You checked whether the offer was unwelcome instead of repeating it or assigning a fixed meaning to the hand gesture.' },
        { kind: 'activity', text: `Put ${offer} nearby without asking the child to use it.`, insight: 'You changed from support to an available activity without requiring participation.' },
        { kind: 'space', text: 'Stop the offer, give a little space, and remain close enough to respond.', insight: 'You responded to the turn away by reducing the demand, while leaving support available.' }
      ]
    }
  ];
  return {
    mode, choices: choices.map(c => c.text), reactions,
    cue: `The parent has just left. ${cue}`,
    facts: `New situations: ${profile.unfamiliar || 'not known'}. Communication: ${profile.communication || 'not known'}.`,
    decisionFacts(initial) {
      return initial === 0 ? `Comfort options: ${profile.comfort || 'not known'}.` : initial === 1 ? `Communication: ${profile.communication || 'not known'}.` : `Activity options reported by the parent: ${profile.preferences || 'not known'}.`;
    },
    observation: 'Notice actions first. What they mean is something to check.',
    details: `Favorite activities: ${profile.preferences || 'not known'}. Comfort options: ${profile.comfort || 'not known'}.` + (answers('preferences').length > 1 ? ' Several activities were reported; this practice uses a general play area, not a preferred activity.' : '') + (comforts.length > 1 ? ' No comfort option is ranked above another.' : ''),
    takeaway(initial, adjusted) {
      const choice = reactions[initial].adjustments[adjusted];
      const activityFact = activity ? `The parent lists ${profile.preferences} as an interest.` : `The parent lists ${profile.preferences || 'no specific activity'}; no single activity preference was assumed.`;
      return {
        fact: choice.fact || (choice.kind === 'support' ? comfortFact : choice.kind === 'activity' ? activityFact : choice.kind === 'communication' ? communicationFact : unfamiliarFact),
        insight: `After ${choices[initial].short}, ${choice.insight[0].toLowerCase() + choice.insight.slice(1)}`,
        next: choice.question || questions[choice.kind] || `Watch whether the child approaches ${object} or turns away; ask the parent which invitations have helped recently.`
      };
    }
  };
}
