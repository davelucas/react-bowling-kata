import {connect} from 'react-redux'
import Controls from './Controls'
import {bowlABall, newGame} from './controlsActions'

const mapDispatchToProps = (dispatch) => {
  return {
    bowl: () => {
      dispatch(bowlABall())
    },
    newGame: () => {
      dispatch(newGame())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    canBowl: !(state.game.bowling || state.game.gameOver),
    gameOver: state.game.gameOver
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
