import { GetPosts } from "../../components/GetPosts/getPosts"



export const Home = () => {
    return (
      <section>
          <h1 className="_title text-center">blogs</h1>
          <div className="mt-6">
            <GetPosts />
          </div>
      </section>
    )
  }