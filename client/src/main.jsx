import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContextProvider from "./context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";
import BlogContextProvider from "./context/BlogContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <BlogContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BlogContextProvider>
  </UserContextProvider>
);
