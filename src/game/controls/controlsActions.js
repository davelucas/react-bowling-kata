import {simulatedBowl} from './bowlingSimulator'
import {handleBowlFinished} from '../gameActions'

export const START_BOWLING = 'START_BOWLING'
export const NEW_GAME = 'NEW_GAME'

function startBowling() {
  return {
    type: START_BOWLING
  }
}

export function newGame() {
  return {
    type: NEW_GAME
  }
}

export function bowlABall() {
  return (dispatch, getState) => {
    dispatch(startBowling())
    return simulatedBowl(getState().lane.pins)
      .then(result => dispatch(handleBowlFinished(result)))
  }
}