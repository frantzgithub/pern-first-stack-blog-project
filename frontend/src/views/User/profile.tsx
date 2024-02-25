import { useForm, SubmitHandler } from "react-hook-form"
import image from "../../assets/update.jpg"
import { Input } from "../../components/Input/input"
import { useAppSelector, useAppDispatch } from "../../hook/hook"
import { useUpdateUserMutation } from "../../redux/api/userBuilder"
import { toast } from "react-toastify"
import { set_credential } from "../../redux/features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { Loading } from "../../components/Loading/loading"



type Inputs = {
  username: string;
  email: string;
}



export const Profile = () => {
  const user = useAppSelector(state => state.auth.userInfo);

  const {register, handleSubmit} = useForm<Inputs>({defaultValues: {username: user.username, email: user.email}});

  const [updateUser, {isLoading}] = useUpdateUserMutation();
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const updateCurrentUser: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
    console.log(user)
    try {
    const res = await updateUser({id: user.id, username: data.username, email: data.email}).unwrap();
    console.log(res)
    dispatch(set_credential({...res}))
    toast.success(`user ${user.username} was updated successfully`)
    navigate("/home")
    } catch (error: any) {
      toast.error(error.data.msg)
    }

  }
  

  return (
    <section className="flex justify-center sm:justify-start items-center sm:gap-[100px] mt-6 sm:mt-12">
      <img className="hidden sm:flex w-[60%]" src={image} alt="update" />
      <form onSubmit={handleSubmit(updateCurrentUser)}>
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
         <button disabled={isLoading} type="submit" className="_button mt-5">{isLoading ? <Loading /> : "Update"}</button>
      </form>
    </section>
  )
}
