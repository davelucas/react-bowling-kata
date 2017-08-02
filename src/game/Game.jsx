import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import './Game.css';
import PinsContainer from './lane/PinsContainer';
import ControlsContainer from './controls/ControlsContainer';
import ScoreContainer from './scoreboard/ScoreContainer';

const store = configureStore();

const Game = () =>
  (<Provider store={store}>
    <div className="game">
      <div className="frame-display">
        <PinsContainer />
      </div>
      <div className="score-display">
        <ScoreContainer />
      </div>
      <div className="controls">
        <ControlsContainer />
      </div>
    </div>
  </Provider>);

export default Game;

