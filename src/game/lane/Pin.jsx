import React from 'react';
import PropTypes from 'prop-types';
import './lane.css';

export default class Pin extends React.Component {
  render() {
    function getPin(up, position) {
      const className = up ? 'pin-up' : 'pin-down';

      return (<div className={className}>
        {position}
      </div>);
    }

    return (
      getPin(this.props.up, this.props.position)
    );
  }
}

Pin.propTypes = {
  up: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
};
