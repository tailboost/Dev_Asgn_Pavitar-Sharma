import { Link } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
import { removeFromSession } from "../utils/session";

const Navbar = () => {
  const { userAuth, setUserAuth } = useUserContext();

  const signOut = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
    // window.location.reload();
  };

  return (
    <header className="navbar">
      <Link to="/">My Blogs</Link>

      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <Link to="/create-blog" className="flex gap-2  link">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>

        {userAuth?.access_token ? (
          <>
            <div className="flex items-center gap-4">
              <p className="text-xl font-semibold opacity-70">
                {userAuth?.fullname}
              </p>
              <button onClick={signOut} className="btn-dark py-2">
                Log out
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/signin" className="btn-dark py-2">
              Sign In
            </Link>
            <Link to="/signup" className="btn-light py-2 hidden md:block">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
