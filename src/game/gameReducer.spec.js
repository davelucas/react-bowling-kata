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

  it('scores 20 for a game of all ones', () => {
    let allOneFrame = {
      rolls: List([1, 1]),
      strike: false,
      spare: false,
      finished: true,
    }

    expect(
      gameReducer(
        {
          frames: List.of(
            allOneFrame,
            allOneFrame,
            allOneFrame,
            allOneFrame,
            allOneFrame,
            allOneFrame,
            allOneFrame,
            allOneFrame,
            allOneFrame,
            {
              rolls: List([1]),
              strike: false,
              spare: false,
              finished: false
            }
          ),
          scores: List.of(2,4,6,8,10,12,14,16,18),
          bowling: false,
          gameOver: false
        }, {
          type: actions.BOWL_FINISHED,
          results: {
            down: 1
          }
        })
    ).toEqual(
      {
        frames: List.of(
          allOneFrame,
          allOneFrame,
          allOneFrame,
          allOneFrame,
          allOneFrame,
          allOneFrame,
          allOneFrame,
          allOneFrame,
          allOneFrame,
          allOneFrame
        ),
        scores: List.of(2,4,6,8,10,12,14,16,18,20),
        bowling: false,
        gameOver: false
      }
    )
  })


  it('adds the first roll', () => {
    expect(
      gameReducer(
        {
          frames: List(),
          scores: List(),
          bowling: false,
          gameOver: false
        }, {
          type: actions.BOWL_FINISHED,
          results: {
            down: 3
          }
        })
    ).toEqual(
      {
        frames: List.of(
          {
            rolls: List([3]),
            strike: false,
            spare: false,
            finished: false
          },
        ),
        scores: List(),
        bowling: false,
        gameOver: false
      }
    )
  })

  it('registers a spare if all the pins are knocked down in two rolls of a frame', () => {
    expect(
      gameReducer(
        {
          frames: List.of(
            {
              rolls: List([4]),
              strike: false,
              spare: false,
              finished: false
            }
          ),
          scores: List(),
          bowling: false,
          gameOver: false
        }, {
          type: actions.BOWL_FINISHED,
          results: {
            down: 6
          }
        })
    ).toEqual(
      {
        frames: List.of(
          {
            rolls: List([4, 6]),
            strike: false,
            spare: true,
            finished: true
          }
        ),
        scores:  List.of(),
        bowling: false,
        gameOver: false
      }
    )
  })

  it('uses the value of the next roll after a spare as the spare bonus', () => {
    expect(
      gameReducer(
        {
          frames: List.of(
            {
              rolls: List([4, 6]),
              strike: false,
              spare: true,
              finished: true
            }
          ),
          scores: List.of(0),
          bowling: false,
          gameOver: false
        }, {
          type: actions.BOWL_FINISHED,
          results: {
            down: 3
          }
        })
    ).toEqual(
      {
        frames: List.of(
          {
            rolls: List([4, 6]),
            strike: false,
            spare: true,
            finished: true
          },
          {
            rolls: List([3]),
            strike: false,
            spare: false,
            finished: false
          }
        ),
        scores: List.of(13),
        bowling: false,
        gameOver: false
      }
    )
  })

  it('only treats rolls in the same frame as a spare', () => {
    expect(
      gameReducer(
        {
          frames: List.of(
            {
              rolls: List([6, 4]),
              strike: false,
              spare: true,
              finished: true
            },
            {
              rolls: List([6]),
              strike: false,
              spare: false,
              finished: false
            }
          ),
          scores: List.of(16),
          bowling: false,
          gameOver: false
        }, {
          type: actions.BOWL_FINISHED,
          results: {
            down: 3
          }
        })
    ).toEqual(
      {
        frames: List.of(
          {
            rolls: List([6, 4]),
            strike: false,
            spare: true,
            finished: true
          },
          {
            rolls: List([6, 3]),
            strike: false,
            spare: false,
            finished: true
          }
        ),
        scores: List.of(16, 25),
        bowling: false,
        gameOver: false
      }
    )
  })

  it('adds the score of the next two rolls onto the strike frame as a bonus score', () => {
    expect(
      gameReducer(
        {
          frames: List.of(
            {
              rolls: List([10]),
              strike: true,
              spare: false,
              finished: true
            },
            {
              rolls: List([4]),
              strike: false,
              spare: false,
              finished: false
            }
          ),
          scores: List(),
          bowling: false,
          gameOver: false
        }, {
          type: actions.BOWL_FINISHED,
          results: {
            down: 3
          }
        })
    ).toEqual(
      {
        frames: List.of(
          {
            rolls: List([10]),
            strike: true,
            spare: false,
            finished: true
          },
          {
            rolls: List([4, 3]),
            strike: false,
            spare: false,
            finished: true
          }
        ),
        scores: List.of(17, 24),
        bowling: false,
        gameOver: false
      }
    )
  })

   it('does not add the strike score immediately', () => {
    expect(
      gameReducer(
        {
          frames: List.of(
            {
              rolls: List([4, 4]),
              strike: false,
              spare: false,
              finished: true
            }
          ),
          scores: List.of(8),
          bowling: false,
          gameOver: false
        }, {
          type: actions.BOWL_FINISHED,
          results: {
            down: 10
          }
        })
    ).toEqual(
      {
        frames: List.of(
          {
            rolls: List([4, 4]),
            strike: false,
            spare: false,
            finished: true
          },
          {
            rolls: List([10]),
            strike: true,
            spare: false,
            finished: true
          }
        ),
        scores: List.of(8),
        bowling: false,
        gameOver: false
      }
    )
  })

  it('has a score of 300 for a perfect game', () => {
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
            strikeFrame
          ),
          scores: List.of(30, 60, 90, 120, 150, 180, 210, 240, 270),
          bowling: false,
          gameOver: false
        }, {
          type: actions.BOWL_FINISHED,
          results: {
            down: 10
          }
        })
    ).toEqual(
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
        gameOver: false
      }
    )
  })

  it('allows an extra roll if a spare is scored in the last frame', () => {
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
            {
              rolls: List([6, 4]),
              strike: false,
              spare: true,
              finished: true
            }
          ),
          scores: List.of(30, 60, 90, 120, 150, 180, 210, 240),
          bowling: false,
          gameOver: false
        }, {
          type: actions.FRAME_FINISHED
        })
    ).toEqual(
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
          {
            rolls: List([6, 4]),
            strike: false,
            spare: true,
            finished: true
          }
        ),
        scores: List.of(30, 60, 90, 120, 150, 180, 210, 240),
        bowling: false,
        gameOver: false
      }
    )
  })

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