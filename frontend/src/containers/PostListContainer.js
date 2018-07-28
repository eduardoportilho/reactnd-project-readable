import { connect } from "react-redux";
import { votePostUp, votePostDown, deletePost } from "../actions";
import PostList from "../components/PostList";

const mapDispatchToProps = dispatch => ({
  deletePost: postId => dispatch(deletePost(postId)),
  votePostUp: postId => dispatch(votePostUp(postId)),
  votePostDown: postId => dispatch(votePostDown(postId))
});

export default connect(
  null,
  mapDispatchToProps
)(PostList);
