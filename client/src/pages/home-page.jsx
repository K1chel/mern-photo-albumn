import { MoonLoader } from "react-spinners";
import CreatePost from "@/components/posts/create-post";
import Post from "@/components/posts/post";
import useGetPosts from "@/hooks/use-get-posts";

const HomePage = () => {
  const { isLoading, posts } = useGetPosts();

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center max-w-3xl mx-auto h-screen">
          <MoonLoader color="gray" size={50} />
        </div>
      )}
      <section className="mt-[120px] max-w-5xl mx-auto px-10 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 w-fit h-fit">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </section>
      <div className="bottom-5 right-5 fixed z-[40]">
        <CreatePost />
      </div>
    </>
  );
};

export default HomePage;
