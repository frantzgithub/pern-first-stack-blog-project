import { Link, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { MdArrowDropDownCircle } from "react-icons/md";
import { useState } from "react";
//import { RootState } from "../../redux/store";
import { useAppSelector, useAppDispatch } from "../../hook/hook";
import { useLogoutMutation } from "../../redux/api/userBuilder";
import { logout } from "../../redux/features/auth/authSlice";

export const Navigation = () => {
  const user = useAppSelector(state => state.auth.userInfo)
  //const user = "berlin"
  const [toggle, setToggle] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  const handledropdown = () => {
    setDropdown((prev) => !prev);
  };

  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    await logoutUser().unwrap();
    dispatch(logout());
    navigate('/login');
  }


  return (
    <header className="relative mt-1 mb-2 sm:mt-3 sm:flex justify-between items-center">
      <h1 className="text-4xl uppercase pl-2">
        Berlin<span className=" text-red-700 font-bold">blog</span>
      </h1>
      <span className="sm:hidden absolute top-0 right-0 ">
            <HiMenu size={40} onClick={handleToggle} />
      </span>
        <>
          {/* nav for small devices */}
          <nav className="sm:hidden mt-3 flex flex-col items-center gap-2">
            {toggle && (
              <>
                <div className="flex justify-center items-center gap-6">
                  <Link className="_link" to="/home">
                    home
                  </Link>
                  <Link className="_link" to="/home">
                    Form
                  </Link>
                </div>
                <div className="flex justify-center items-center gap-6">
                  {user && (<>
                    <p className="_link flex items-center gap-1">
                      <span>{user.username}</span>
                      <MdArrowDropDownCircle onClick={handledropdown} />
                    </p>
                    </>
                  )}
                </div>
              </>
            )}
          </nav>
          {/* nav for large devices */}
          <nav className="sm:flex hidden gap-4">
            <Link className="_link" to="/home">
              home
            </Link>
            <Link className="_link" to="/home">
              form
            </Link>
            {user && (
              <p className="_link flex items-center gap-1">
                <span>{user.username}</span>
                <MdArrowDropDownCircle onClick={handledropdown} />
              </p>
            )}
          </nav>
        </>
      {dropdown && (
        <div className="absolute top-0 right-0 w-[30%] h-screen bg-slate-600 flex flex-col
         justify-center items-center gap-3 text-white mt-10">
          <span className="cursor-pointer" onClick={handleLogout}>
            Logout
          </span>
          <Link to="/profile" className="">
            Profile
          </Link>
          {user && user.isAdmin && (
            <>
              <Link to="/users" className="">
                users
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
