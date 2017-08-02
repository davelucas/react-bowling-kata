import thunk from 'redux-thunk';
import { List } from 'immutable';
import configureStore from 'redux-mock-store';
import * as actions from './controlsActions';
import * as simulator from './bowlingSimulator';
import { BOWL_FINISHED } from '../gameActions';

const mockStore = configureStore([thunk]);

describe('bowlABall', () => {
  const state = {
    lane: {
      pins: [
        {
          position: 1,
          up: true,
        },
        {
          position: 2,
          up: true,
        },
        {
          position: 3,
          up: true,
        },
        {
          position: 4,
          up: true,
        },
        {
          position: 5,
          up: true,
        },
        {
          position: 6,
          up: true,
        },
        {
          position: 7,
          up: true,
        },
        {
          position: 8,
          up: true,
        },
        {
          position: 9,
          up: true,
        },
        {
          position: 10,
          up: true,
        },
      ],
    },
    game: {
      frames: List([List()]),
    },
  };

  const mockedBowl = {
    pins: [
      {
        position: 1,
        up: false,
      },
      {
        position: 2,
        up: true,
      },
      {
        position: 3,
        up: false,
      },
      {
        position: 4,
        up: true,
      },
      {
        position: 5,
        up: false,
      },
      {
        position: 6,
        up: true,
      },
      {
        position: 7,
        up: false,
      },
      {
        position: 8,
        up: true,
      },
      {
        position: 9,
        up: false,
      },
      {
        position: 10,
        up: true,
      },
    ],
    down: 6,
  };

  it('starts bowling, simulates a bowl and then finishes', () => {
    const expectedActions = [
      { type: actions.START_BOWLING },
      { type: BOWL_FINISHED, results: mockedBowl },
    ];

    const store = mockStore(state);

    simulator.default = jest.fn(() => Promise.resolve(mockedBowl));

    return store.dispatch(actions.bowlABall()).then(() => {
      expect(simulator.default).toBeCalledWith(state.lane.pins);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
