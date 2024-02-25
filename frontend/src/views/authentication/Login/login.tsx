import { Input } from "../../../components/Input/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hook/hook";
import { set_credential } from "../../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../../redux/api/userBuilder";

import { toast } from "react-toastify";

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  // const [logerror, setlogError] = useState(false)
  const user = useAppSelector((state) => state.auth.userInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const addData: SubmitHandler<Inputs> = async (data) => {
     if (data.email && data.password) {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      console.log(res);
      dispatch(set_credential({ ...res }));
      toast.success(`user ${data.email} is login successfully`);
      navigate("/home");
     } catch (error: any) {
       toast.error(error.data.msg || error.message);
     }

    } else {
     toast.error("all fill required")
     }
  };

  return (
    <section className="h-[80vh] flex flex-col justify-center items-center">
      <h1 className="_title">sign-in</h1>
      <form onSubmit={handleSubmit(addData)}>
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="enter your email"
          {...register("email", { required: "email is required" })}
        />
        {errors.email && (
          <p className="p-1 mt-2 bg-red-700 text-white">
            {errors.email.message}
          </p>
        )}
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="enter your password"
          {...register("password", { required: "password is required" })}
        />
        {errors.password && (
          <p className="p-1 mt-2 bg-red-700 text-white">
            {errors.password.message}
          </p>
        )}

        <button disabled={isLoading} className="_button my-5" type="submit">
          sign-in
        </button>
      </form>
      <div>
        <p>
          Not already have an account{" "}
          <Link className="text-red-700 uppercase font-semibold" to="/register">
            sign-up
          </Link>{" "}
          here
        </p>
      </div>
      {/* isError && <div>{.msg}</div> */}
    </section>
  );
};
