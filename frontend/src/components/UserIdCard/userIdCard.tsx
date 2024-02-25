import { useForm, SubmitHandler } from "react-hook-form";
import { DataUser } from "../GetUsers/UsersCard/usersCard";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useState } from "react";
import { Input } from "../Input/input";
import { useUpdateUserByIdMutation } from "../../redux/api/userBuilder";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Loading } from "../Loading/loading";

type Inputs = {
  username: string;
  email: string;
  isAdmin: boolean;
  isWriter: boolean;
};

export const UserIdCard = ({ users }: DataUser) => {
  const [isEditable, setIsEditable] = useState(false);


  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      username: users.username,
      email: users.email,
      isAdmin: users.isAdmin,
      isWriter: users.isWriter,
    },
  });

  const [updateById, { isLoading }] = useUpdateUserByIdMutation();
 

  const navigate = useNavigate();

  const updateUserAndSumbitForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await updateById({
        id: users.id,
        username: data.username,
        email: data.email,
        isAdmin: data.isAdmin,
        isWriter: data.isWriter,
      }).unwrap();

      console.log(res);
      //     dispatch(set_credential({ ...res }));
      toast.success(`user ${users.username} is updated successfully`);
      navigate("/users");
    } catch (error) {
      toast.error("there is an error");
    }
  };

  return (
    <>
      {isEditable ? (
       
        <form onSubmit={handleSubmit(updateUserAndSumbitForm)}>
          <Input
            label="Update Username"
            id="name"
            type="text"
            placeholder="update name"
            {...register("username")}
          />
          <Input
            label="Update Email"
            id="email"
            type="email"
            placeholder="update email"
            {...register("email")}
          />
          <div className="mt-5">
            <span className="text-lg mr-1">isAdmin</span>
            <input type="checkbox" {...register("isAdmin")} />
            <span className="text-lg ml-7 mr-1">isWriter</span>
            <input type="checkbox" {...register("isWriter")} />
          </div>

          <div className="flex items-center mt-5 ">
            <button disabled={isLoading} className="_button">
              {isLoading ? <Loading /> : "Update"}
            </button>
            <button
              className="bg-blue-400 text-lg uppercase text-white py-3 px-5 hover:bg-white hover:text-blue-700"
              onClick={() => setIsEditable((prev) => !prev)}
            >
              <FaLongArrowAltLeft color="white" />
            </button>
          </div>
        </form>
      ) : (
        <ul className="flex flex-col gap-3">
          <li className="flex gap-3">
            <h4 className="_admin_title">username:</h4>
            <p className="_admin_paragraph_in_user_id_card">{users.username}</p>
          </li>
          <li className="flex gap-3">
            <h4 className="_admin_title">email:</h4>
            <p className="_admin_paragraph_in_user_id_card">{users.email}</p>
          </li>
          <li className="flex gap-3">
            <h4 className="_admin_title">isAdmin:</h4>
            <p className="_admin_paragraph_in_user_id_card">
              {users.isAdmin ? <FaCheck /> : <MdClose />}
            </p>
          </li>
          <li className="flex gap-3">
            <h4 className="_admin_title">isWriter:</h4>
            <p className="_admin_paragraph_in_user_id_card">
              {users.isWriter ? <FaCheck /> : <MdClose />}
            </p>
          </li>
          <li className="flex gap-3">
            <h4 className="_admin_title">created:</h4>
            <p className="_admin_paragraph_in_user_id_card">
              {formatDistanceToNow(new Date(`${users.createdAt}`), { addSuffix: true })}
            </p>
          </li>
          <button
            className="bg-blue-400 text-white py-1 px-2 mt-4 hover:bg-white hover:text-blue-700"
            onClick={() => setIsEditable((prev) => !prev)}
          >
            update
          </button>
        </ul>
      )}
    </>
  );
};
