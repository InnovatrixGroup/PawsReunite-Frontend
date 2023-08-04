import { useParams, Navigate, Link } from "react-router-dom";
import Post from "../../components/Post";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Comment from "../../components/Comment";
import { useLocalStorage } from "react-use";
import { useEffect, useState } from "react";
import { useUserPostDispatch, useUserPost } from "../../contexts/UserPostContext";
import DeleteConfirmDialog from "../../components/DeleteConfirmDialog";
import EditPostPopup from "../../components/EditPostPopup";
import PostSkeleton from "../../components/PostSkeleton";

const api = process.env.REACT_APP_DATABASE_URL;

export default function SinglePetPage() {
  const { id } = useParams();

  const [isredirect, setIsRedirect] = useState(false);
  const [userAuth, setUserAuth] = useLocalStorage("pawsReuniteUserAuth");
  const userPostDispatch = useUserPostDispatch();
  const [post, setPost] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const userPostData = useUserPost();
  const [isloading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`${api}/posts?postId=${id}`);
      const result = await response.json();
      setPost(result.data);
      setIsLoading(false);
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`${api}/comments?postId=${id}`);
      const result = await response.json();
      setComments(result.data);
    };
    fetchComments();
  }, [id]);

  const deletePost = async () => {
    try {
      const response = await fetch(`${api}/posts/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${userAuth?.jwt}`
        }
      });
      if (response.ok) {
        userPostDispatch({ type: "delete", blogIdToDelete: id });
        // Show a message that the post has been deleted
        alert("Post has been deleted.");

        setIsRedirect(true);
      }
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.log(error);
    }
  };
  const isUserPost = post && post.userId === userAuth?.userId;

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`${api}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${userAuth?.jwt}`
        }
      });
      if (response.ok) {
        alert("Comment has been deleted.");
        setComments((prev) => prev.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateComment = async () => {
    try {
      const response = await fetch(`${api}/comments/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userAuth?.jwt}`
        },
        body: JSON.stringify({
          content: newComment
        })
      });
      if (response.ok) {
        const result = await response.json();
        alert("Comment has been created.");
        setComments((prev) => [...prev, result.data]);
        setNewComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isloading && (
        <div>
          <PostSkeleton />
        </div>
      )}
      {post && (
        <div className="single__post mb-16">
          <div className="back flex pl-3 py-2">
            <Link to={-1}>
              <KeyboardBackspaceIcon style={{ fontSize: "22px" }} />
            </Link>
          </div>
          <Post postData={post} isSingle={true} />
          {isUserPost && (
            <div className="single__post_funcation flex justify-end px-3 gap-4 mb-8 xs:justify-between">
              <button
                className="single__post_funcation_btn bg-orange-900 text-white border px-16 xs:flex-1 xs:px-0 py-2 font-light rounded-xl hover:bg-red-800"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
              <button
                className="single__post_funcation_btn  bg-orange-900 text-white border px-16 xs:flex-1 xs:px-0 py-2 font-light rounded-xl hover:bg-red-800"
                onClick={() => setShowDeleteConfirmation(true)}
              >
                Delete
              </button>
            </div>
          )}

          <div className="comments flex px-3 mb-32">
            <Comment comments={comments} onDelete={handleDeleteComment} />
          </div>
          <div className="single__post_comment w-full fixed bottom-12 flex gap-4 p-3 max-w-7xl bg-white">
            <input
              className="single__post_comment_input flex-1 border rounded-full shadow-inner pl-3"
              type="text"
              placeholder="Leave a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="single__post_comment_btn bg-orange-900 text-white border px-4 py-2 font-light rounded-xl hover:bg-red-800"
              onClick={handleCreateComment}
            >
              Send
            </button>
          </div>
          <DeleteConfirmDialog
            open={showDeleteConfirmation}
            onClose={() => setShowDeleteConfirmation(false)}
            onConfirm={deletePost}
          />

          {post && (
            <EditPostPopup
              trigger={isEdit}
              close={() => setIsEdit(false)}
              post={post}
              mode="update"
            />
          )}
          {isredirect && <Navigate to="/personalDetail" />}
        </div>
      )}
    </div>
  );
}
