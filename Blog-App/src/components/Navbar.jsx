import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../providers/userProvider";
const Navbar = () => {
  const { userData, logOut } = useContext(UserContext);
  const { user, accessToken } = userData || {};
  const { firstName, lastName } = user || {};
  return (
    <div className="navbar bg-base-100 shadow-sm px-0">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to={"/"}>
          Home
        </Link>
      </div>
      <div className="flex-none">
        {accessToken && firstName && lastName ? (
          <div className="flex items-center justify-center gap-2 px-4">
            <p className="text-base">
              Hi {firstName} {lastName}
            </p>
            <button onClick={() => logOut()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </button>
          </div>
        ) : (
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/login" className="text-lg">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-lg">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
