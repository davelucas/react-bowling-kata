import { connect } from 'react-redux';
import Scoreboard from './Scoreboard';

const mapStateToProps = state => ({
  frames: state.game.frames,
  scores: state.game.scores,
});

export default connect(mapStateToProps)(Scoreboard);
