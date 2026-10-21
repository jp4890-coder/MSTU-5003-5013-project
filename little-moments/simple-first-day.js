/* One short moment and one decision. Profile answers inform the invitation,
   not a prediction of how a child will respond. No storage or generated content. */
function simpleFirstDay(child) {
  const values = key => (child[key] || '').split('; ').filter(Boolean);
  const has = (key, answer) => values(key).includes(answer);
  const name = child.name;
  const activityMap = {
    'Books and quiet play': 'a picture book',
    'Building and puzzles': 'large building blocks',
    'Music and movement': 'a quiet song',
    'Pretend play': 'pretend-play toys',
    'Outdoor play': 'a look at the outdoor play area'
  };
  // Several reported interests do not establish a single favorite.
  const activity = values('preferences').length === 1 ? activityMap[child.preferences] : null;
  const activityOption = activity || 'a familiar activity';
  const activityFact = activity ? `The parent lists ${child.preferences.toLowerCase()} as an interest.`
    : values('preferences').length > 1 ? 'The parent lists several interests, so there is no need to find one perfect invitation.'
    : 'A favorite activity is not clear yet; ask the parent what feels familiar.';
  const gesture = has('communication', 'Gestures and pointing') || has('communication', 'A mix of words and gestures');
  const words = has('communication', 'Short phrases') || has('communication', 'Single words');
  const sound = has('communication', 'Sounds and facial expressions');
  const cue = gesture ? 'points toward the play area' : words ? 'says “there” while turning toward the play area' : sound ? 'makes a soft sound and turns toward the play area' : 'turns toward the play area, then pauses';
  const opening = child.temperament === 'Slow to warm up' ? 'stays near the doorway'
    : child.temperament === 'Highly active' ? 'moves toward the play area, then pauses'
    : child.temperament === 'Comfortable with new situations' ? 'starts exploring the room'
    : 'pauses between the doorway and play area';
  const acknowledge = gesture ? 'Point in the same direction, ask “Over there?”, and wait nearby.'
    : words ? 'Acknowledge “there,” ask “Do you mean over here?”, and wait nearby.'
    : sound ? 'Say “I hear you,” gesture toward the play area, and wait nearby.'
    : 'Say “I’m here,” and wait nearby for another signal.';
  const communicationFact = gesture ? 'The parent reports gestures or pointing as a way of communicating.'
    : words ? 'The parent reports spoken words as one way of communicating.'
    : sound ? 'The parent reports sounds and facial expressions as ways of communicating.'
    : 'The profile does not yet explain how this child usually asks for help.';
  const pace = child.temperament === 'Slow to warm up' ? `The parent describes ${name} as slow to warm up, so time to observe may help.`
    : child.temperament === 'Highly active' ? `The parent describes ${name} as highly active, but this pause still deserves attention.`
    : child.temperament === 'Comfortable with new situations' ? `The parent reports comfort with new situations, but support may still be welcome today.`
    : 'How much time or support feels right may vary today.';
  const comforts = {
    'A quiet space and time': ['Offer quiet space while staying nearby.', 'The parent lists quiet space and time as comforting.'],
    'A familiar toy or blanket': ['Place a parent-approved familiar comfort item within reach.', 'The parent lists a familiar toy or blanket as comforting.'],
    'Being held when welcomed': ['Offer open arms and wait for an invitation before touching.', 'The parent says being held can help when welcomed.'],
    'A song or story': ['Offer a quiet song or story and pause for a response.', 'The parent lists a song or story as comforting.'],
    'A familiar adult nearby': ['Offer company nearby without asking the child to join in.', 'The parent lists having a familiar adult nearby as comforting.']
  };
  const comfort = values('comfort').length === 1 ? comforts[child.comfort] : null;
  const comfortOption = comfort ? comfort[0] : values('comfort').length > 1 ? 'Offer a choice of the parent’s familiar comforts, then wait.' : 'Stay nearby and check with the parent about familiar comforts.';
  const comfortFact = comfort ? comfort[1] : values('comfort').length > 1 ? 'The parent lists several comforts; none is automatically the best fit today.' : 'A familiar comfort strategy is not clear from this profile yet.';
  return {
    description: `The parent has just left. ${name} ${opening} and ${cue}.`,
    options: [`Offer ${activityOption} from where you are, without asking ${name} to join.`, acknowledge, comfortOption],
    entries: [
      ['Start with something familiar', `${activityFact} ${pace} Leave the invitation open and notice whether ${name} approaches, signals, or turns away.`],
      ['Listen to the small signals', `${communicationFact} Acknowledging this signal can help you check what ${name} means without requiring speech or eye contact. Stay responsive if the signal changes or is repeated.`],
      ['Offer comfort gently', `${comfortFact} Offer support without assuming it is wanted; notice whether ${name} welcomes it or needs something different.`]
    ]
  };
}
