import { BOWL_FINISHED, FRAME_FINISHED } from '../gameActions';

const allUp = [
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
];


export default function controlsReducer(state = { pins: allUp }, action) {
  switch (action.type) {
    case BOWL_FINISHED:
      return {
        ...state,
        pins: action.results.pins,
      };
    case FRAME_FINISHED:
      return {
        ...state,
        pins: allUp,
      };
    default:
      return state;
  }
}
