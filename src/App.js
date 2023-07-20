import "./App.css";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import PetPostsPage from "./pages/pets/PetPostsPage";
import SinglePostPage from "./pages/pets/SinglePostPage";
import ContactPage from "./pages/ContactPage";
import PetResourcePage from "./pages/PetResourcePage";
import PersonalDetailPage from "./pages/personalDetail/PersonalDetailPage";
import EditProfilePage from "./pages/personalDetail/EditProfilePage";
import CreatePostPage from "./pages/personalDetail/CreatePostPage";

function App() {
  // const location = useLocation();
  // console.log(location.pathname);
  // const isSigninOrSignupPage = location.pathname === "/signin" || location.pathname === "/signup";
  return (
    <div className="App max-w-7xl mx-auto">
      {/* {!isSigninOrSignupPage && <NavbarNew />} */}
      {/* <NavbarNew /> */}

      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
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
        </Route>
      </Routes>
      {/* {!isSigninOrSignupPage && <Footer />} */}
    </div>
  );
}
export default App;
