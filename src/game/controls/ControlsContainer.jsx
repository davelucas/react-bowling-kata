import { connect } from 'react-redux';
import Controls from './Controls';
import { bowlABall, newGame } from './controlsActions';

const mapDispatchToProps = dispatch => ({
  bowl: () => {
    dispatch(bowlABall());
  },
  newGame: () => {
    dispatch(newGame());
  },
});

const mapStateToProps = state => ({
  canBowl: !(state.game.bowling || state.game.gameOver),
  gameOver: state.game.gameOver,
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
