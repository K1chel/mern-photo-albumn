import Post from "@/components/posts/post";
import useGetPosts from "@/hooks/use-get-posts";

const HomePage = () => {
  const { isLoading, posts } = useGetPosts();

  console.log(posts);

  return (
    <section className="mt-[120px] max-w-5xl mx-auto px-6 md:px-2">
      {isLoading && posts.length >= 1 && <p>Loading...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-10 gap-x-5 mb-10">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default HomePage;
