import React, {useContext, useEffect} from 'react';
import  {checkHandler} from './http/userAPI'
import Header from './Components/Header/header';
import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "./routes/routes"
import './style.scss'
import { Context } from './index';
import { observer } from 'mobx-react-lite';



const App = observer(() => {
  const {user} = useContext(Context)
  useEffect(() => {
    checkHandler().then(data => {
      user.setUser(data)
      user.SetIsAuth(true)
    })
  }, [user])
  return (
    <React.Fragment>
      <Header />
      <div className='container'>
        <Routes>
          {user._isAuth ? authRoutes.map(({path, Component}) => <Route key={path} path={path} element={ <Component />} exact/> ) : null}
          {!user._isAuth ? publicRoutes.map(({path, Component}) => <Route key={path} path={path} element={ <Component />} exact />) : null}
        </Routes>
      </div>
    </React.Fragment>
  );
})

export default App;
