import { useUserPost, useUserPostDispatch } from "../contexts/UserPostContext";

export default function ContactPage() {
  const userPostData = useUserPost();

  return (
    <div>
      <h1>Contact Page</h1>
      {userPostData && console.log(userPostData)}
    </div>
  );
}
