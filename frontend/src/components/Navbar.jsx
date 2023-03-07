import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
    const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);

  const logOut = useCallback(() => {
    dispatch(logout())
    alert("Logged out successfully")
  }, [dispatch])

  return (
    <header className="flex justify-between items-center px-8 py-4 shadow-md sticky top-0 z-50 bg-white">
      {/* logo */}
      <div>
        <Link to="/home" className="text-xl font-bold cursor-pointer text-orange-600">Yellow Class</Link>
      </div>

      {/* right */}

      <div className="flex items-center gap-8">
        <p>{user?.username}</p>
        <button onClick={logOut} type="button" className="border border-gray-500 px-4 py-2 rounded-lg cursor-pointer">Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
