import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as game from './gameActions'
import {List} from 'immutable'

const mockStore = configureStore([thunk])

describe('handleBowlFinished', () => {

  it('dispatches bowl finished with results', () => {

    const results = {
      down: 10
    }

    const store = mockStore({
      game: {
        frames: List()
      }
    })

    store.dispatch(game.handleBowlFinished(results))
    expect(store.getActions()).toEqual([
      {type: game.BOWL_FINISHED, results: results}
    ])
  })

  it('dispatches frame finished action if the frame is finished', () => {

    const results = {
      down: 1
    }

    const store = mockStore({
      game: {
        frames: List.of(
          {
            finished: true
          }
        )
      }
    })

    store.dispatch(game.handleBowlFinished(results))
    expect(store.getActions()).toEqual([
      {type: game.BOWL_FINISHED, results: results},
      {type: game.FRAME_FINISHED}
    ])
  })

  it('dispatches game finished action if the game is finished', () => {

    const results = {
      down: 1
    }

    const store = mockStore({
      game: {
        frames: List.of(
          {
            finished: true
          }
        ),
        gameOver: true
      }
    })

    store.dispatch(game.handleBowlFinished(results))
    expect(store.getActions()).toEqual([
      {type: game.BOWL_FINISHED, results: results},
      {type: game.FRAME_FINISHED},
      {type: game.GAME_FINISHED}
    ])
  })
})