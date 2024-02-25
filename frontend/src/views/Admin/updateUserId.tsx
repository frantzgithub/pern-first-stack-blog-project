
import image from "../../assets/update.jpg";
import { useGetUserIdQuery } from "../../redux/api/userBuilder";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { UserIdCard } from "../../components/UserIdCard/userIdCard";


export const UpdateUserId = () => {

  const params = useParams();

  const { data: User, refetch } = useGetUserIdQuery(params.id);
  console.log(User);

  useEffect(() => {
    refetch;
  }, [refetch]);

  

  return (
    <section className="flex justify-center sm:justify-start items-center sm:gap-[100px] mt-6 sm:mt-12">
      <img className="hidden sm:flex w-[60%]" src={image} alt="update" />
      {User && <UserIdCard users={User} />}
      
    </section>
  );
};
