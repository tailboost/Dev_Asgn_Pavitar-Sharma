import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import CreateBlog from "./pages/CreateBlog";
import BlogDetail from "./pages/BlogDetail";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
