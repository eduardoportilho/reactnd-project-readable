import { connect } from "react-redux";
import { votePostUp, votePostDown } from "../actions";
import PostList from "../components/PostList";

const mapDispatchToProps = dispatch => ({
  votePostUp: postId => dispatch(votePostUp(postId)),
  votePostDown: postId => dispatch(votePostDown(postId))
});

export default connect(
  null,
  mapDispatchToProps
)(PostList);
