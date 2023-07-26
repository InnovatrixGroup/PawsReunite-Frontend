import { useParams, Navigate } from "react-router-dom";
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

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`${api}/posts?postId=${id}`);
      const result = await response.json();
      setPost(result.data);
      setIsLoading(false);
    };
    fetchPost();
  }, [id]);

  const deletePost = async () => {
    try {
      const response = await fetch(`${api}/posts/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${userAuth.jwt}`
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
  const isUserPost = post && post.userId === userAuth.userId;

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
            <KeyboardBackspaceIcon style={{ fontSize: "22px" }} />
          </div>
          <Post postData={post} isSingle={true} />
          {isUserPost && (
            <div className="single__post_funcation flex justify-end px-3 gap-4 mb-8 xs:justify-between">
              <button
                className="single__post_funcation_btn bg-orange-900 text-white border px-16 xs:flex-1 xs:px-0 py-2 font-light rounded-xl"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
              <button
                className="single__post_funcation_btn  bg-orange-900 text-white border px-16 xs:flex-1 xs:px-0 py-2 font-light rounded-xl"
                onClick={() => setShowDeleteConfirmation(true)}
              >
                Delete
              </button>
            </div>
          )}

          <div className="comments flex px-3 mb-32">
            <Comment postId={id} />
          </div>
          <div className="single__post_comment w-full fixed bottom-12 flex gap-4 p-3 max-w-7xl bg-white">
            <input
              className="single__post_comment_input flex-1 border rounded-full shadow-inner pl-3"
              type="text"
              placeholder="Leave a comment..."
            />
            <button className="single__post_comment_btn bg-orange-900 text-white border px-4 py-2 font-light rounded-xl">
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
