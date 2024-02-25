import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import { useDeleteUserMutation } from "../../../redux/api/userBuilder";
import { toast } from "react-toastify";

export interface DataUser {
  users: {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    isWriter: boolean;
    createdAt?: string;
  };
}

export const UsersCard = ({users}: DataUser) => {

  const [ deleteUser ] = useDeleteUserMutation();

  const handleDelete = async (id: string) => {
    if(window.confirm(`are you sure that you want to delete ${users.username}?`)) {
      try {
        await deleteUser(id);
        toast.success("user deleted successfully")
      } catch (error: any) {
        toast.error("can't delete the user, try again")
      }
      
    }
  }
  return (
    <div className="mt-6">
      <li className="list-none flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start sm:text-center mb-5">
        <div className="sm:w-[15%] _admin_small_screen">
        <h4 className="_admin_title">username<span className="sm:hidden pl-1 text-3xl">:</span></h4>
        <p className="_admin_paragraph">{users.username}</p>
        </div>
        <div className="sm:w-[25%] _admin_small_screen">
        <h4 className="_admin_title">email<span className="sm:hidden pl-1 text-3xl">:</span></h4>
        <p className="_admin_paragraph">{users.email}</p>
        </div>
        <div className="sm:w-[8%] _admin_small_screen ">
        <h4 className="_admin_title">isAdmin<span className="sm:hidden pl-1 text-3xl">:</span></h4>
        <p className="_admin_paragraph sm:ml-10">{users.isAdmin ? <FaCheck /> : <MdClose /> }</p>
        </div>
        <div className="sm:w-[8%] _admin_small_screen ">
        <h4 className="_admin_title">isWriter<span className="sm:hidden pl-1 text-3xl">:</span></h4>
        <p className="_admin_paragraph sm:ml-10">{users.isWriter ? <FaCheck /> : <MdClose /> }</p>
        </div>
        <div className="sm:w-[18%] _admin_small_screen ml-3">
          <Link className="bg-blue-400 text-white py-1 px-2 mr-2 hover:bg-white hover:text-blue-700"
           to={`/users/update/${users.id}`}>update</Link>
           {!users.isAdmin && <span className="bg-red-700 text-white py-1 px-2 mr-2 hover:bg-white hover:text-red-700" onClick={() => handleDelete(users.id)}>delete</span>
           }
        </div>
      </li>
      
    </div>
  );
};
