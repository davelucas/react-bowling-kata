import React from 'react';
import PropTypes from 'prop-types';
import Pin from './Pin';

const Pins = (props) => {
  const renderRow = (pins, firstPin, lastPin) =>
    (<span className="pins-row">
      {pins.slice(firstPin - 1, lastPin).map(pin =>
        <Pin key={pin.position} position={pin.position} up={pin.up} />,
            )}
    </span>);

  return (
    <div className="pins">
      {renderRow(props.pins, 1, 4)}
      {renderRow(props.pins, 5, 7)}
      {renderRow(props.pins, 8, 9)}
      {renderRow(props.pins, 10)}
    </div>
  );
};

Pins.propTypes = {
  pins: PropTypes.array.isRequired,
};

export default Pins;

