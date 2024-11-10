import { IRegisterUserDTO } from "@/shared/model/user";

import type { IRegisterFormData } from "./types";

export const adapter_registerFormDataToRegisterUserDTO = ({
  firstName,
  lastName,
  email,
  password,
}: IRegisterFormData): IRegisterUserDTO => ({ name: firstName, surname: lastName, email, password });
