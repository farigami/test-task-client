import { observer } from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import { Context } from "../../index";
import TodoMaker from "./todoMaker";
import TodoView from "./todoView";
import { getHandler } from "../../http/taskAPI";
import './content.scss'

const Content = observer(() => {
    const {user} = useContext(Context)
    const [tasks, setTasks] = useState([])
    const [content, setContent] = useState(null)
    useEffect(() => {
        getHandler().then(data => {
            setTasks(data)
        })
    }, 
    [])
    return (
        <div className="content">
            <div className="tasks__list">
                <div className="tasks__list-title">
                    {`Пользователь: ${user._user.login}`}
                    <span>Ваш руководитель: {user._user.supervisor ? user._user.supervisor.login : '-'}</span>
                </div>
                <button onClick={() => {setContent(<TodoMaker ></TodoMaker>)}}>Новое задание</button>
                <hr />
                <div className="task__list-tasks">Ваши задания:</div>
                    {tasks.length ? tasks.map(task => 
                        <div className="task"
                        style={task.statusId === 3 ? {color: "green"} : null || new Date(task.end_date) < new Date(Date.now()) ? {color: 'red'} : null} 
            
                        key={task.id} onClick={() => setContent(<TodoView task={task}></TodoView>)}>
                            {task.title}
                        </div> 
                    ) : null}
            </div>
            <div className="tasks__view">
                {content !== null ? content : null}
            </div>
        </div>
    )
})

export default Content