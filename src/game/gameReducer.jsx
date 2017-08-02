import { List } from 'immutable';
import { BOWL_FINISHED, FRAME_FINISHED } from './gameActions';
import { START_BOWLING, NEW_GAME } from './controls/controlsActions';

const startOfGame = {
  frames: List(),
  scores: List(),
  bowling: false,
  gameOver: false,
};

const gameReducer = (state = startOfGame, action) => {
  switch (action.type) {
    case START_BOWLING:
      return {
        ...state,
        bowling: true,
      };
    case BOWL_FINISHED:
      return {
        ...state,
        // TODO: Hint use action.results.down in here to affect the scores and other state
      };
    case FRAME_FINISHED:
      return {
        ...state,
        // TODO: Implement anything that needs to happen when the frame is finished
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
}

export default gameReducer;

