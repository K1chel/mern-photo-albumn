/* eslint-disable react/prop-types */
const Post = ({ post }) => {
  return (
    <section className="relative ">
      <img
        src={post.image}
        alt={post._id}
        className="w-full h-full object-cover border rounded-lg cursor-pointer"
      />
    </section>
  );
};

export default Post;
