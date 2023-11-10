import { AiOutlineClose } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import usePreviewImage from "@/hooks/user-preview-image";
import { useRef, useState } from "react";
import { BiPhotoAlbum } from "react-icons/bi";
import { Button } from "../ui/button";
import { useRecoilValue } from "recoil";
import userAtom from "@/atoms/userAtom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePostModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fileRef = useRef(null);
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const { imgUrl, handleImageChange, setImgUrl } = usePreviewImage();

  const handleCheckUser = () => {
    if (!user) return navigate("/auth");
  };

  const handleCreatePost = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/photos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postedBy: user._id, image: imgUrl }),
      });
      const data = await res.json();
      if (data.error) return toast.error(data.error);

      toast("Post created successfully");
      setImgUrl(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" onClick={handleCheckUser}>
          <BiPhotoAlbum size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
          <DialogDescription>
            Upload your image to share with other people.
          </DialogDescription>
        </DialogHeader>
        <div className="p-1">
          {imgUrl ? (
            <div className="relative">
              <img
                src={imgUrl}
                alt="selected image"
                className="w-full hh-full object-cover border"
              />
              <button
                onClick={() => setImgUrl(null)}
                className="absolute top-2 right-2 bg-background rounded-full p-2 hover:opacity-60 transition"
              >
                <AiOutlineClose
                  className="dark:text-white text-black"
                  size={18}
                />
              </button>
              <Button onClick={handleCreatePost} className="w-full mt-3">
                Submit
              </Button>
            </div>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => fileRef.current.click()}
              >
                <BiPhotoAlbum size={20} />
              </Button>
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                ref={fileRef}
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
