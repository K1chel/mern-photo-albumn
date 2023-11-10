import { BarLoader } from "react-spinners";

const Loader = () => {
  return (
    <section className="fixed top-0 w-full h-3">
      <BarLoader width="100%" color="gray" />
    </section>
  );
};

export default Loader;
