import { List } from 'immutable';
import { BOWL_FINISHED, FRAME_FINISHED } from './gameActions';
import { START_BOWLING, NEW_GAME } from './controls/controlsActions';

const startOfGame = {
  frames: List(),
  scores: List(),
  bowling: false,
  gameOver: false,
};

const firstRollInTheFrame = previousFrames =>
  previousFrames.isEmpty() || previousFrames.last().finished;

const addRoll = (frames, down) => {
  if (firstRollInTheFrame(frames)) {
    const isStrike = down === 10;
    return frames.push({
      rolls: List.of(down),
      strike: isStrike,
      spare: false,
      finished: isStrike,
    });
  }
  return frames.pop().push({
    rolls: frames.last().rolls.push(down),
    strike: false,
    spare: frames.last().rolls.first() + down === 10,
    finished: true,
  });
};

const isGameFinished = (frames) => {
  if (frames.size >= 12) {
    return true;
  }

  if (frames.size >= 10) {
    const frameScore = frames.last().rolls.reduce((a, b) => a + b, 0);
    return frameScore !== 10;
  }

  return false;
};

const calculateScores = frames => frames.map((frame, i) => {
  if (frame.spare) {
    const nextFrame = frames.get(i + 1);
    if (undefined !== nextFrame) {
      return 10 + nextFrame.rolls.first();
    }
    return undefined;
  }

  if (frame.strike) {
    const nextFrame = frames.get(i + 1);

    if (undefined !== nextFrame) {
      const nextRoll = nextFrame.rolls.first();
      if (nextFrame.rolls.size >= 2) {
        return 10 + nextRoll + nextFrame.rolls.shift().first();
      }
      const secondNextFrame = frames.get(i + 2);
      if (undefined !== secondNextFrame) {
        return 10 + nextRoll + secondNextFrame.rolls.first();
      }
      return undefined;
    }
  }

  return frame.rolls.size === 2 ? frame.rolls.reduce((a, b) => a + b) : undefined;
})
      .filter(frameScore => undefined !== frameScore)
      .reduce((r, frameScore) => r.push(r.isEmpty() ? frameScore : r.last() + frameScore), List());

const gameReducer = (state = startOfGame, action) => {
  switch (action.type) {
    case START_BOWLING:
      return {
        ...state,
        bowling: true,
      };
    case BOWL_FINISHED: {
      const nextFrames = addRoll(state.frames, action.results.down);
      return {
        ...state,
        frames: nextFrames,
        scores: calculateScores(nextFrames),
        bowling: false,
      };
    }
    case FRAME_FINISHED:
      return {
        ...state,
        gameOver: isGameFinished(state.frames),
      };
    case NEW_GAME:
      return {
        ...state,
        frames: List(),
        scores: List(),
        bowling: false,
        gameOver: false,
      };
    default:
      return state;
  }
};

export default gameReducer;

