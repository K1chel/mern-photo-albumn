import { atom } from "recoil";

const authScreenAtom = atom({
  key: "authScreenAtom",
  default: "LOGIN",
});

export default authScreenAtom;
