import gameReducer from './gameReducer'
import * as actions from './gameActions'
import * as controls from './controls/controlsActions'
import {List} from 'immutable'

describe('gameReducer', () => {

  it('should return the initial state', () => {
    expect(gameReducer(undefined, {})).toEqual(
      {
        frames: List(),
        scores: List(),
        bowling: false,
        gameOver: false
      }
    )
  })

  it('keeps the score at zero for a gutter game', () => {
    let gutterFrame = {
      rolls: List([0, 0]),
      strike: false,
      spare: false,
      finished: true,
    }

    expect(
      gameReducer(
        {
          frames: List.of(
            gutterFrame,
            gutterFrame,
            gutterFrame,
            gutterFrame,
            gutterFrame,
            gutterFrame,
            gutterFrame,
            gutterFrame,
            gutterFrame,
            {
              rolls: List([0]),
              strike: false,
              spare: false,
              finished: false
            }
          ),
          scores: List.of(0,0,0,0,0,0,0,0,0),
          bowling: false,
          gameOver: false

        }, {
          type: actions.BOWL_FINISHED,
          results: {
            down: 0
          }
        })
    ).toEqual(
      {
        frames: List.of(
          gutterFrame,
          gutterFrame,
          gutterFrame,
          gutterFrame,
          gutterFrame,
          gutterFrame,
          gutterFrame,
          gutterFrame,
          gutterFrame,
          gutterFrame
        ),
        scores: List.of(0,0,0,0,0,0,0,0,0,0),
        bowling: false,
        gameOver: false
      }
    )
  })

  // TODO: Add more tests here
  // TODO: For example, handle the perfect game (all strikes), handle spares, handle game over etc

  it('resets the state on a new game', () => {
    let strikeFrame = {
      rolls: List([10]),
      strike: true,
      spare: false,
      finished: true
    }

    expect(
      gameReducer(
        {
          frames: List.of(
            strikeFrame,
            strikeFrame,
            strikeFrame,
            strikeFrame,
            strikeFrame,
            strikeFrame,
            strikeFrame,
            strikeFrame,
            strikeFrame,
            strikeFrame,
            strikeFrame,
            strikeFrame
          ),
          scores: List.of(30, 60, 90, 120, 150, 180, 210, 240, 270, 300),
          bowling: false,
          gameOver: true
        }, {
          type: controls.NEW_GAME
        })
    ).toEqual(
      {
        frames: List(),
        scores: List(),
        bowling: false,
        gameOver: false
      }
    )
  })
})