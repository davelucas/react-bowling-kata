import React from 'react'
import Pin from './Pin'

export default class Pins extends React.Component {

  render() {
    function renderRow(pins, firstPin, lastPin) {
      return <span className='pins-row'>
            {pins.slice(firstPin - 1, lastPin).map(pin =>
              <Pin key={pin.position} position={pin.position} up={pin.up}/>
            )}
          </span>
    }

    return (
      <div className='pins'>
        {renderRow(this.props.pins, 1, 4)}
        {renderRow(this.props.pins, 5, 7)}
        {renderRow(this.props.pins, 8, 9)}
        {renderRow(this.props.pins, 10)}
      </div>
    )
  }
}

Pins.propTypes = {}
