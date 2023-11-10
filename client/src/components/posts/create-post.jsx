import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import CreatePostModal from "./create-post-modal";

const CreatePost = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <CreatePostModal />
        </TooltipTrigger>
        <TooltipContent>Create a post</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CreatePost;
