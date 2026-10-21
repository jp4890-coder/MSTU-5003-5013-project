/* First Day Together: authored practice, not a model of a real child's behavior.
   Only validated profiles reach this function. No data is stored or transmitted. */
function createFirstDay(profile) {
  const has = (key, answer) => (profile[key] || '').split('; ').includes(answer);
  const n = profile.name;
  // One coherent setting. Conflicting or variable reports use the uncertain setting.
  const watches = has('unfamiliar', 'Watches before joining');
  const joins = has('unfamiliar', 'Joins in quickly');
  const uncertain = has('unfamiliar', 'Varies with the situation') || (watches && joins);
  const mode = uncertain ? 'uncertain' : watches ? 'observe' : joins ? 'join' : 'uncertain';
  const activities = [
    ['Books and quiet play', 'a picture book', 'the book'],
    ['Building and puzzles', 'a few large building blocks', 'the blocks'],
    ['Music and movement', 'a quiet familiar song', 'the song'],
    ['Pretend play', 'a pretend-play toy', 'the toy'],
    ['Outdoor play', 'a view of the outdoor play area', 'the play area']
  ];
  const activity = activities.find(([answer]) => has('preferences', answer));
  const invitation = activity ? activity[1] : 'a simple activity already available';
  const focus = activity ? activity[2] : 'the activity';
  // Communication affects the cue AND how an invitation is offered. No speech is required.
  let signal = 'turns toward ' + focus + ', then turns away';
  let check = 'show one possibility, pause, and watch for a response';
  if (has('communication', 'Gestures and pointing') || has('communication', 'A mix of words and gestures')) {
    signal = 'points toward ' + focus + ', then lowers a hand';
    check = 'acknowledge the point, show one possibility, and pause';
  } else if (has('communication', 'Short phrases') || has('communication', 'Single words')) {
    signal = 'says “that,” then pauses near ' + focus;
    check = 'acknowledge “that,” show what you mean, and leave time for words or gestures';
  } else if (has('communication', 'Sounds and facial expressions')) {
    signal = 'makes a soft sound and changes expression while turning toward ' + focus;
    check = 'acknowledge the sound, show one possibility, and pause';
  }
  let comfort = 'stay nearby and offer a little space';
  let comfortFact = '';
  if (has('comfort', 'A familiar toy or blanket')) {
    comfort = 'offer a parent-approved familiar comfort item within reach';
    comfortFact = 'a familiar toy or blanket can help';
  } else if (has('comfort', 'Being held when welcomed')) {
    comfort = 'offer open arms and wait for an invitation before any touch';
    comfortFact = 'being held can help when welcomed';
  } else if (has('comfort', 'A song or story')) {
    comfort = 'offer a quiet song or story and pause for a response';
    comfortFact = 'a song or story can help';
  } else if (has('comfort', 'A familiar adult nearby')) {
    comfort = 'stay nearby without asking for participation';
    comfortFact = 'a familiar adult nearby can help';
  } else if (has('comfort', 'A quiet space and time')) {
    comfortFact = 'quiet space and time can help';
  }
  const setting = {
    observe: `${n} stays near the doorway and ${signal}.`,
    join: `${n} moves into the play area, ${signal}, then steps back toward the doorway.`,
    uncertain: `${n} pauses between the doorway and the play area and ${signal}.`
  }[mode];
  const facts = [
    `New situations: ${profile.unfamiliar || 'not known'}.`,
    `Communication: ${profile.communication || 'not known'}.`,
    `Comfort: ${profile.comfort || 'not known'}.`,
    `Favorite activities: ${profile.preferences || 'not known'}.`
  ].join(' ');
  const context = mode === 'observe'
    ? 'The parent reports watching before joining. That makes time to observe relevant, but does not establish what this cue means today.'
    : mode === 'join'
    ? 'The parent reports joining quickly. Moving into play does not establish that reassurance is unnecessary.'
    : 'The profile does not establish one consistent handoff pattern. Begin with observation and ask the parent what has helped recently.';

  const choices = mode === 'join' ? [
    `Join alongside ${focus} and ${check}.`,
    `Name the pause and wait nearby before joining the activity.`,
    `Pause the invitation to ${comfort}.`
  ] : mode === 'observe' ? [
    `Sit at a comfortable distance with ${invitation} and ${check}.`,
    `Acknowledge the cue, stay available, and give ${n} a little time before offering an activity.`,
    `First ${comfort}, leaving the activity available.`
  ] : [
    `Offer ${invitation} as a possibility and ${check}.`,
    `Stay available, describe the pause without guessing its meaning, and wait briefly.`,
    `Check whether support is welcome: ${comfort}.`
  ];
  const reactions = [
    {
      cue: mode === 'join' ? `${n} moves one item toward you, then turns back toward the doorway.` : `${n} moves a little nearer to ${focus}, but stops before joining.`,
      meaning: 'There is movement toward the activity as well as a pause. Neither tells you whether company, help, or more space is wanted.',
      adjustments: [
        { text: `Reduce your invitation: ${check}, without moving closer.`, feedback: 'You made the invitation easier to respond to. Watch whether the child reaches, turns away, or continues to pause before adding more.' },
        { text: `Shift toward comfort: ${comfort}.`, feedback: 'You shifted from activity toward support. A familiar strategy is an offer, not a requirement; watch whether it is welcomed.' },
        { text: `Stay alongside the activity, narrate one small action, and pause.`, feedback: 'You kept a route into shared activity without requiring participation. Watch whether your presence supports interest or adds a demand.' }
      ]
    },
    {
      cue: `${n} repeats the signal toward ${focus} and makes a sound while remaining in place.`,
      meaning: 'The signal was repeated. Waiting may have left room, but practical acknowledgment or help may now be useful. The exact request is still uncertain.',
      adjustments: [
        { text: `Respond to the repeated signal: ${check}.`, feedback: 'You responded to new communication rather than assuming that waiting was enough. Check whether the offered possibility fits; accept a different response.' },
        { text: `Offer help with ${focus}, then pause before doing more.`, feedback: 'You tested a limited interpretation through an offer of help. Watch whether the child accepts, redirects, or declines it.' },
        { text: `Offer a quieter moment nearby and acknowledge that you may not yet understand.`, feedback: 'You reduced demands while recognizing uncertainty. Keep responding to further signals; ask the parent how similar requests are usually expressed.' }
      ]
    },
    {
      cue: `${n} remains near the doorway, turns slightly away from your offer, and holds one hand out.`,
      meaning: 'Turning away and holding out a hand are observable. Whether this means “stop,” a request, or something else is not established. Do not initiate touch from this cue alone.',
      adjustments: [
        { text: `Pause the comfort offer, give space, and acknowledge the hand gesture.`, feedback: 'You changed your approach in response to the new cue. Observe whether the child uses the space, communicates again, or seeks support.' },
        { text: `Offer ${invitation} at a distance without repeating the comfort offer.`, feedback: 'You offered another way to connect while reducing the earlier demand. Watch for interest or further turning away; either can guide the next step.' },
        { text: `Remain available, briefly name your uncertainty, and plan to check this signal with the parent.`, feedback: 'You left room for an unfamiliar meaning instead of assigning one. In real care, stay responsive and consult the parent about this signal when needed.' }
      ]
    }
  ];
  return {
    mode, facts, choices, reactions,
    cue: `The parent has just left. ${setting}`,
    observation: `Notice the action: ${signal}. “Wants to play” or “wants to be left alone” would be interpretations to check, not facts.`,
    context,
    parentLink: comfortFact ? `The parent reports that ${comfortFact}.` : 'The parent has not specified a usable comfort strategy here; ask rather than invent one.',
    nextQuestion: `In real life, watch for another reach, turn, sound, or pause. Ask the parent: “What does a similar signal usually mean, and what has helped during recent handoffs?”`
  };
}
