import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import PetPostsPage from "./pages/pets/PetPostsPage";
import SinglePostPage from "./pages/pets/SinglePostPage";
import ContactPage from "./pages/ContactPage";
import PetResourcePage from "./pages/PetResourcePage";
import PersonalDetailPage from "./pages/PersonalDetailPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <div className="App max-w-7xl mx-auto">
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pets" element={<Outlet />}>
            <Route index element={<PetPostsPage />} />
            <Route path=":id" element={<SinglePostPage />} />
          </Route>
          <Route path="/petResource" element={<PetResourcePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/personalDetail" element={<PersonalDetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
