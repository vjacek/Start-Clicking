export const COLORS = {
  LIGHTGREY: 'lightgrey',
  ORANGE: '#E2992C',
  YELLOW: '#E2DF2C',
  GREEN: '#6BE22C',
  TEAL: '#2CE296',
  LIGHTBLUE: '#2CE2D9',
  BLUE: '#2C6BE2',
  PURPLE: '#A22CE2',
  PINK: '#E22CA5',
  BLACK: '#000000'
};


const LEVEL_STEP = 10;
export const getLevel = (score) => {
  const level = Math.floor(score / LEVEL_STEP);
  return {
    color: Object.keys(COLORS)[level],
    min: level * LEVEL_STEP,
    max: (level + 1) * LEVEL_STEP
  };
};


// Return a number of ms driven by the current click count and high score
// Game gets harder based on your previous highscore
export const getTime = (score, highscore) => {

  // Tuning... how fast the game gets harder
  // Starting with 1 second as the most time possible between clicks
  // Tuning=2 allows doubling of current high score
  // Tuning=10 would allow 10x high score before timeout becomes too fast
  // Starting with 1.2 so that games are almost always killed before reaching 120% of current highscore
  var progressSpeed = 1.6;

  var progress = score / (highscore === 0 ? 10 : highscore);
  var time = (1 - progress / progressSpeed) * 1000;

  // Save from being totally impossible
  return time < 10 ? 10 : time;
};