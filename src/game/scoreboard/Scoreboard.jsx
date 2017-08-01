import React from 'react'
import './scores.css'

export default class Scoreboard extends React.Component {
  render() {
    function renderScoreboard(frames, scores) {
      return frames.map((frame, i) => {
        return (<div className='frame'>
          <div className='rolls'>{renderFrame(frame)}</div>
          <div className='score'>{scores.get(i)}</div>
        </div>)
      })
    }

    function renderFrame(frame) {
      return frame.rolls.map((r) => <span className="roll">{r}</span>)
    }

    return (
      <span className="scoreboard">
        {renderScoreboard(this.props.frames, this.props.scores)}
      </span>
    )
  }
}

Scoreboard.propTypes = {}