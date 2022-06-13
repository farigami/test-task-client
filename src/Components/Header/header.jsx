import React, { useContext }  from 'react';
import { Context } from '../../index';
import { Link } from 'react-router-dom';
import {observer} from "mobx-react-lite"
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from '../../utils/consts';

import logo from '../../logo.svg'
import './header.scss'


const Header = observer(() => {
    const {user} = useContext(Context)
    const logOut = () => {
        user.setUser({})
        user.SetIsAuth(false)
        localStorage.setItem('token', null)
    }
    return (
        <div className='header'>
            <img  src={logo} alt="" />
            <div className='header__links'>
            {!user._isAuth ? 
                <React.Fragment>
                    <Link to={REGISTRATION_ROUTE}>Регистрация</Link>
                    <Link to={LOGIN_ROUTE}>Вход</Link>
                </React.Fragment>
                : 
                <React.Fragment>
                    <div>{user._isAuth ? `Пользователь: ${user._user.login}` : null}</div>
                    <Link to={LOGIN_ROUTE} onClick={() => logOut()}>Выход</Link>
                </React.Fragment>
            }
            </div>
        </div>
    )
})

export default Header