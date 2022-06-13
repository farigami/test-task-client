import { observer } from "mobx-react-lite";
import React, { useState, useContext } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { registrationHandler } from "../../http/userAPI";
import {Context} from "../../index";
import { TASKS_ROUTE } from "../../utils/consts";
import './auth.scss'

const Registration = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [Login, setLogin] = useState('')
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Patronymic, setPatronymic] = useState('')
    const [Password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const signUp = async () => {
        try{
            const data = await registrationHandler(
                Login, 
                FirstName, 
                LastName, 
                Patronymic, 
                Password
                )
            user.setUser(data)
            user.SetIsAuth(true)
            navigate(TASKS_ROUTE)
        }catch(e) {
            setMessage(e.response.data.message)
        }
    }

    return (
        <div className="auth">
            <div className="auth__title">Регистрация</div>
            <input 
                type="text" 
                placeholder="Логин" 
                onChange={(e) => setLogin(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Имя"
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Фамилия"
                onChange={(e) => setLastName(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Отчество"
                onChange={(e) => setPatronymic(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Пароль"
                onChange={(e) => setPassword(e.target.value)}
            />
            <div>{message.length ? message : null}</div>
            <div className="auth__tools">
                <button onClick={() => signUp()}>Зарегестрироваться</button>
                <Link to='/login'>Уже зарегестрированы?</Link>
            </div>
        </div>
    )
})

export default Registration