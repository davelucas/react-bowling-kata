import React from 'react'
import './controls.css'

export default class Controls extends React.Component {
  render() {
    return (
      <div className='controls'>
        <button className='control-button' id='bowl' onClick={this.props.bowl} disabled={!this.props.canBowl}>Bowl
        </button>
        <button className={'control-button' + (this.props.gameOver ? '' : ' hidden')} id='new-game'
                onClick={this.props.newGame}>New Game
        </button>
      </div>
    )
  }
}

Controls.propTypes = {}
