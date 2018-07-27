import { connect } from "react-redux";
import { voteCommentUp, voteCommentDown, deleteComment } from "../actions";
import Comment from "../components/Comment";

const mapDispatchToProps = dispatch => ({
  deleteComment: commentId => dispatch(deleteComment(commentId)),
  voteCommentUp: (commentId, postId) =>
    dispatch(voteCommentUp(commentId, postId)),
  voteCommentDown: (commentId, postId) =>
    dispatch(voteCommentDown(commentId, postId))
});

export default connect(
  null,
  mapDispatchToProps
)(Comment);
