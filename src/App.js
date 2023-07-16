import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PetPostsPage from "./pages/pets/PetPostsPage";
import SinglePostPage from "./pages/pets/SinglePostPage";
import ContactPage from "./pages/ContactPage";
import PetResourcePage from "./pages/PetResourcePage";
import PersonalDetailPage from "./pages/personalDetail/PersonalDetailPage";
import EditProfilePage from "./pages/personalDetail/EditProfilePage";
import CreatePostPage from "./pages/personalDetail/CreatePostPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/pets" element={<Outlet />}>
          <Route index element={<PetPostsPage />} />
          <Route path=":id" element={<SinglePostPage />} />
          <Route path=":id/edit" element={<EditProfilePage />} />
        </Route>
        <Route path="/petResource" element={<PetResourcePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/personalDetail" element={<Outlet />}>
          <Route index element={<PersonalDetailPage />} />
          <Route path="edit" element={<EditProfilePage />} />
          <Route path="createPost" element={<CreatePostPage />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
