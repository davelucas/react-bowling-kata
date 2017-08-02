export const BOWL_FINISHED = 'BOWL_FINISHED';
export const FRAME_FINISHED = 'FRAME_FINISHED';
export const GAME_FINISHED = 'GAME_FINISHED';

export function bowlFinished(results) {
  return {
    type: BOWL_FINISHED,
    results,
  };
}

export function frameFinished() {
  return {
    type: FRAME_FINISHED,
  };
}

export function gameFinished() {
  return {
    type: GAME_FINISHED,
  };
}

export function handleBowlFinished(results) {
  return (dispatch, getState) => {
    dispatch(bowlFinished(results));
    if (!getState().game.frames.isEmpty() && getState().game.frames.last().finished) {
      dispatch(frameFinished());

      if (getState().game.gameOver) {
        dispatch(gameFinished());
      }
    }
  };
}
