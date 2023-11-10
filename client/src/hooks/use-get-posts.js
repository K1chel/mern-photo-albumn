import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/photos/photos");
        const data = await res.json();
        if (data.error) return toast.error(data.error);

        setPosts(data);
      } catch (error) {
        console.log(error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return { posts, isLoading };
};

export default useGetPosts;
