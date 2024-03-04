import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import { TextArea } from "../../components/Input/Textarea/textarea";
import { Input } from "../../components/Input/input";
import { useGetCategoriesQuery } from "../../redux/api/categoryBuilder";
import { useNewPostMutation } from "../../redux/api/blogBuilder";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Inputs = {
  title: string;
  description: string;
  category: string;
};

export interface Categories  {
  id: string;
  category_name: string;
}

export const Form = () => {
   const [file, setFile] = useState<File | undefined>()
   const [displayImage, setDisplayImage] = useState<string | ArrayBuffer | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { data: categoriesData, refetch } = useGetCategoriesQuery({});
  const [newPost] = useNewPostMutation();

  const navigate = useNavigate()

   useEffect(() => {
     refetch();
   }, [refetch]);

   
  const submitForm: SubmitHandler<Inputs> = async (data) => {
     const formData = new FormData();
    
    if(typeof file == "undefined") return console.log("no file choosen");
     formData.append("image", file);
     formData.append("category", data.category || "8268b6f9-614a-4eeb-8f73-0e8eef9b03e3");
     formData.append("title", data.title);
     formData.append("desc", data.description);
    try{
    const response = await newPost(formData).unwrap();
    console.log(response)
    toast.success(response.msg)
    navigate("/home")
    } catch (error) {
      console.log("there is an error in the form")
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }
    console.log(target.files[0])

    setFile(target.files[0])

    const file = new FileReader

    file.onload = () => {
      setDisplayImage(file.result)
    }

    file.readAsDataURL(target.files[0])
   }

  return (
    <section>
      <h1 className="_title text-center my-3">create a blog</h1>
      <div className="px-4 flex flex-col sm:flex-row sm:justify-between">
        <form className="w-full" onSubmit={handleSubmit(submitForm)}>
          <Input
            label="title"
            type="text"
            id="title"
            placeholder="enter a title"
            {...register("title", { required: "this field is required" })}
          />
          {errors.title && (
            <p className="p-1 mt-2 bg-red-700 text-white">
              {errors.title.message}
            </p>
          )}
          <TextArea
            label="description"
            id="desc"
            placeholder="enter a description"
            {...register("description", { required: "this field is required" })}
          />
          {errors.description && (
            <p className="p-1 mt-2 bg-red-700 text-white">
              {errors.description.message}
            </p>
          )}
          <label className="block text-xl my-2" htmlFor="image">
            image
          </label>
          <input
            className=""
            type="file"
            accept="image/"
            onChange={handleChange}
           />
          <div>
                <label className="block text-xl my-2">Category</label>
                <select
                 className="py-2 px-3 border border-solid border-black"
                 {...register("category")}>
           {categoriesData && categoriesData.map((category: Categories) => {
              return (
                    <option key={category.id} value={category.id}>{category.category_name}</option>
              );
            })} 
            </select>
            </div>
          <button className="_button mt-5" type="submit">
            create blog
          </button>
        </form>
        { displayImage && <div className="w-full h-[70vh] flex justify-center items-center ">
          <img className="max-w-[300px]" src={displayImage} /> 
          </div>
        }
      </div>
    </section>
  );
};
