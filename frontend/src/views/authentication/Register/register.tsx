import { Input } from "../../../components/Input/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../hook/hook";
import { useRegisterMutation } from "../../../redux/api/userBuilder";
import { toast } from "react-toastify";
import { set_credential } from "../../../redux/features/auth/authSlice";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

export const Register = () => {
    const {register, handleSubmit} = useForm<Inputs>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [registerUser] = useRegisterMutation();

    const addUser: SubmitHandler<Inputs> = async (data) => {
      if(data.username && data.email && data.password && data.confirm) {
        if(data.password == data.confirm) {
          try{
            const res = await registerUser({username: data.username, email: data.email, password: data.password}).unwrap();
           console.log(res)
            dispatch(set_credential({...res}));
            toast.success(`welcome ${data.username}, please log-in with you account`)
            navigate('/login')
          } catch (error: any) {
            toast.error(error.data.msg)
          }
        } else {
          toast.error("password is not match")
        }
      } else {
        toast.error("all fill required")
      }
      
    }
    return (
      <section className="h-[80vh] flex flex-col justify-center items-center">
          <h1 className="_title">sign-up</h1>
          <form onSubmit={handleSubmit(addUser)}>
            <Input
              label="Username"
              type="text"
              id="name"
              placeholder="enter your username"
              {...register("username")}
             />
            <Input
              label="Email"
              type="email"
              id="email"
              placeholder="enter your email"
              {...register("email")}
             />
            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="enter your password"
              {...register("password")}
             />
            <Input
              label="Confirm password"
              type="password"
              id="confirm_password"
              placeholder="confirm your password"
              {...register("confirm")}
             />
             <button className="_button my-5" type="submit">sign-up</button>
          </form>
          <div>
            <p>already have an account <Link className="text-red-700 uppercase font-semibold" to='/login'>sign-in</Link> here</p>
          </div>
      </section>
    )
  }