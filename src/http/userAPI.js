import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode'

export const registrationHandler = async (login, first_name, last_name, patronymic, password) => {
    const {data} = await $host.post('api/user/registration', {login, first_name,last_name, patronymic, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const loginHandler = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const checkHandler = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}