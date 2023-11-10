import userAtom from "@/atoms/userAtom";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

/* eslint-disable react/prop-types */
const Post = ({ post }) => {
  const user = useRecoilValue(userAtom);

  const navigate = useNavigate();

  const handleLike = () => {
    if (!user) {
      return navigate("/auth");
    } else {
      console.log("like");
    }
  };

  return (
    <section className="">
      <div className="group">
        <div className="relative">
          <img
            className="min-h-[240px] w-full object-cover rounded-lg"
            src={post.image}
            alt="photo"
          />
          <div
            onClick={handleLike}
            className="absolute h-full flex-col rounded-lg w-full bg-black/40 flex items-center justify-center bottom-0 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <AiOutlineHeart size={30} className="cursor-pointer text-red-500" />
            <div className="px-2 py-[1px] rounded-full my-1 dark:bg-white/40 bg-black/40 dark:text-black text-white">
              <p>{post.likes.length}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
