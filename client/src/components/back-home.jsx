import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { BiArrowBack } from "react-icons/bi";

const BackHome = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/">
            <Button variant="ghost" size="icon">
              <BiArrowBack size={24} />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="my-1 ml-2">
          <span>Back to home</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BackHome;
