import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

//Запрос регистрации
export const registration = async (email, password) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    // Устанавливается роль пользователя, ADMIN или USER
    role: "USER",
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

//Запрос логина
export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

//Запрос проверки авторизации
export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};
