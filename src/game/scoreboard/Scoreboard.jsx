import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import './scores.css';

export default class Scoreboard extends React.Component {
  render() {
    function renderFrame(frame) {
      return frame.rolls.map(r => <span className="roll">{r}</span>);
    }

    function renderScoreboard(frames, scores) {
      return frames.map((frame, i) => (<div className="frame">
        <div className="rolls">{renderFrame(frame)}</div>
        <div className="score">{scores.get(i)}</div>
      </div>));
    }

    return (
      <span className="scoreboard">
        {renderScoreboard(this.props.frames, this.props.scores)}
      </span>
    );
  }
}

Scoreboard.propTypes = {
  frames: PropTypes.instanceOf(List).isRequired,
  scores: PropTypes.instanceOf(List).isRequired,
};
