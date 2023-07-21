import { useParams } from "react-router-dom";
import Post from "../../components/Post";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Comment from "../../components/Comment";

export default function SinglePetPage() {
  const { id } = useParams();
  return (
    <div className="single__post mb-16">
      <div className="back flex pl-3 py-2">
        <KeyboardBackspaceIcon style={{ fontSize: "22px" }} />
      </div>
      <Post postId={id} isSingle={true} />
      <div className="single__post_funcation flex justify-end px-3 gap-4 mb-8 xs:justify-between">
        <button className="single__post_funcation_btn bg-orange-900 text-white border px-16 xs:flex-1 xs:px-0 py-2 font-light rounded-xl">
          Edit
        </button>
        <button className="single__post_funcation_btn  bg-orange-900 text-white border px-16 xs:flex-1 xs:px-0 py-2 font-light rounded-xl">
          Delete
        </button>
      </div>
      <div className="comments flex px-3 mb-32">
        {console.log(id)}
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
    </div>
  );
}
