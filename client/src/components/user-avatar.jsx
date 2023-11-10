import userAtom from "@/atoms/userAtom";
import { useRecoilValue } from "recoil";
import { Avatar, AvatarImage } from "./ui/avatar";

const UserAvatar = () => {
  const user = useRecoilValue(userAtom);

  return (
    <Avatar>
      <AvatarImage src={user?.avatar} />
    </Avatar>
  );
};

export default UserAvatar;
