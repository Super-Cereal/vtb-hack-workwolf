import type { IRegisterUserDTO } from "@/shared/model/user";

export interface IRegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
}

export const adapter_registerFormData = ({
  firstName,
  lastName,
  email,
  password,
}: IRegisterFormData): IRegisterUserDTO => ({ name: firstName, surname: lastName, email, password });
