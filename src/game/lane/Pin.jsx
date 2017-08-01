import React from 'react'
import './lane.css'

export default class Pin extends React.Component {
  render() {
    function getPin(up, position) {
      let className = up ? 'pin-up' : 'pin-down'

      return <div className={className}>
        {position}
      </div>

    }

    return (
      getPin(this.props.up, this.props.position)
    )
  }
}

Pin.propTypes = {
}
