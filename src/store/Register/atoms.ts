import { atom, selector } from "recoil";
import {
  RegisterSteps,
  widthArray,
} from "@/components/user/RegisterForm/RegisterSteps";
import { UserData } from "@/types/common";

export const registerUserInput = atom<UserData>({
  key: "registerUserInput",
  default: {
    email: "",
    notificationAgreement: "",
    confirmCode: "",
    password: "",
    nickName: "",
    empNumber: "",
  },
});

export const registerStepIndex = atom({
  key: "regsiterStepIndex",
  default: 0,
});

export const selectStepbarProps = selector({
  key: "selectStepbarProps",
  get: ({ get }) => {
    const index = get(registerStepIndex);
    return { width: widthArray[index], description: RegisterSteps[index].key };
  },
});

export const stepBarLoadStatus = atom({
  key: "stepBarLoadStatus",
  default: false,
});
