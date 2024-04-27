import axios from "axios";

// создание хоста
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: "json",
})

// создание хоста авторизации
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: "json",
})

// добавление токена авторизации
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

// использование токена
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
