import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LostPetsPage from "./pages/pets/LostPetsPage";
import FoundPetsPage from "./pages//pets/FoundPetsPage";
import SinglePostPage from "./pages/pets/SinglePostPage";
import ContactPage from "./pages/ContactPage";
import PetResourcePage from "./pages/PetResourcePage";
import PersonalDetailPage from "./pages/personalDetail/PersonalDetailPage";
import EditProfilePage from "./pages/personalDetail/EditProfilePage";
import CreatePostPage from "./pages/personalDetail/CreatePostPage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* admin page? */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/pets" element={<Outlet />}>
          <Route path="lostPets" element={<LostPetsPage />} />
          <Route path="foundPets" element={<FoundPetsPage />} />
          <Route path=":id" element={<SinglePostPage />} />
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
