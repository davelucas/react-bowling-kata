import {connect} from 'react-redux'
import Pins from './Pins'

const mapStateToProps = (state) => {
  return {
    pins: state.lane.pins
  }
}

export default connect(mapStateToProps)(Pins)