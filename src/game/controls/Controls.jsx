import React from 'react';
import PropTypes from 'prop-types';
import './controls.css';

const Controls = props =>
  (<div className="controls">
    <button
      className="control-button"
      id="bowl"
      onClick={props.bowl}
      disabled={!props.canBowl}
    >
      Bowl
    </button>
    <button
      className={`control-button${props.gameOver ? '' : ' hidden'}`}
      id="new-game"
      onClick={props.newGame}
    >
      New Game
    </button>
  </div>);


Controls.propTypes = {
  canBowl: PropTypes.bool.isRequired,
  gameOver: PropTypes.bool.isRequired,
  bowl: PropTypes.func.isRequired,
  newGame: PropTypes.func.isRequired,
};

export default Controls;

