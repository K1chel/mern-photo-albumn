import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      containerStyle={{}}
      toastOptions={{
        duration: 4000,
        className: "p-0 m-0 text-sm font-medium",
      }}
    />
  );
};

export default ToastProvider;
