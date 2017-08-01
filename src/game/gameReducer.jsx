import {BOWL_FINISHED, FRAME_FINISHED} from './gameActions'
import {START_BOWLING, NEW_GAME} from './controls/controlsActions'
import {List} from 'immutable'

let startOfGame = {
  frames: List(),
  scores: List(),
  bowling: false,
  gameOver: false
}

export default function gameReducer(state = startOfGame, action) {

  function firstRollInTheFrame(previousFrames) {
    return previousFrames.isEmpty() || previousFrames.last().finished
  }

  function addRoll(frames, down) {
    if (firstRollInTheFrame(frames)) {
      let isStrike = down === 10;
      return frames.push({
        rolls: List.of(down),
        strike: isStrike,
        spare: false,
        finished: isStrike
      })
    } else {
      return frames.pop().push({
        rolls: frames.last().rolls.push(down),
        strike: false,
        spare: frames.last().rolls.first() + down === 10,
        finished: true
      })
    }
  }

  function isGameFinished() {
    if (state.frames.size >= 12) {
      return true
    }

    if (state.frames.size >= 10) {
      let frameScore = state.frames.last().rolls.reduce((a, b) => a + b, 0);
      return frameScore !== 10
    }

    return false
  }

  function calculateScores(frames) {
    return frames.map((frame, i) => {

      if (frame.spare) {
        let nextFrame = frames.get(i + 1)
        if (undefined !== nextFrame) {
          return 10 + nextFrame.rolls.first()
        } else {
          return undefined
        }
      }

      if (frame.strike) {
        let nextFrame = frames.get(i + 1)

        if (undefined !== nextFrame) {
          let nextRoll = nextFrame.rolls.first()
          if (nextFrame.rolls.size >= 2) {
            return 10 + nextRoll + nextFrame.rolls.shift().first()
          } else {
            let secondNextFrame = frames.get(i + 2)
            if (undefined !== secondNextFrame) {
              return 10 + nextRoll + secondNextFrame.rolls.first()
            } else {
              return undefined
            }
          }
        }
      }

      return frame.rolls.size === 2 ? frame.rolls.reduce((a, b) => a + b) : undefined
    })
      .filter(frameScore => undefined !== frameScore)
      .reduce((r, frameScore) => r.push(r.isEmpty() ? frameScore : r.last() + frameScore), List())
  }

  switch (action.type) {
    case START_BOWLING:
      return {
        ...state,
        bowling: true
      }
    case BOWL_FINISHED:
      let nextFrames = addRoll(state.frames, action.results.down)
      return {
        ...state,
        frames: nextFrames,
        scores: calculateScores(nextFrames),
        bowling: false
      }
    case FRAME_FINISHED:
      return {
        ...state,
        gameOver: isGameFinished()
      }
    case NEW_GAME:
      return {
        ...state,
        frames: List(),
        scores: List(),
        bowling: false,
        gameOver: false
      }
    default:
      return state
  }
}
