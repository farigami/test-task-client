import { observer } from "mobx-react-lite";
import React, { useState, useContext } from "react"
import { loginHandler } from "../../http/userAPI";
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../../index";
import { TASKS_ROUTE } from "../../utils/consts";
const Login = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [Login, setLogin] = useState('')
    const [Password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    

    const signIn = async () => {
        try{
            const data = await loginHandler(Login, Password)
            user.setUser(data)
            user.SetIsAuth(true)
            navigate(TASKS_ROUTE)
        }catch(e) {
            setMessage(e.response.data.message)
        }
    }

    return (
        <div className="auth">
            <div className="auth__title">Авторизация</div>
            <input 
                type="text" 
                placeholder="Логин" 
                onChange={(e) => setLogin(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Пароль"
                onChange={(e) => setPassword(e.target.value)}
            />
            <div>{message.length ? message : null}</div>
            <div className="auth__tools">
                <button onClick={() => signIn()}>Авторизироваться</button>
                <Link to='/registration'>Не зарегестрированны?</Link>
            </div>
        </div>
    )
})

export default Login