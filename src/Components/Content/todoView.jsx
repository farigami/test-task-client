import { observer } from "mobx-react-lite";
import React, {useState} from "react";
import { statusType, priorityType } from "./shards"
import './content.scss'
import { useContext } from "react";
import { Context } from "../../index";
import { updateStatusHandler } from "../../http/taskAPI";

const TodoView = observer(({task}) => {
    const {user} = useContext(Context)
    const [newStatus, setNewStatus] = useState(null)
    const updateStatus = (item) => {
        updateStatusHandler(task.id, item.id).then(data => {
            setNewStatus(item.status)
        })
    }
    return (<div className="task__maker">
            <div>Название задания</div>
            <input type="text" value={task.title} readOnly/>
            <div>Описание</div>
            <textarea type="text" value={task.description} readOnly/>
            <div>Дата окончания</div>
            {task.end_date}
            <div className="user-select">Исполнитель: {task.responsible === user._user.id ? user._user.login : task.responsiblea}</div>
            <div className="user-select">
                Cтатус: {newStatus === null ? statusType.filter((item) => {return item.id === task.statusId})[0].status : newStatus}
                <hr />
                <ul>
                    {statusType.map((item) =>  (<li onClick={() => updateStatus(item)}>{item.status}</li>))}
                </ul>
            </div> 
            <div className="user-select">
                Приоритет: {priorityType.filter((item) => {return item.id === task.priorityId})[0].priority}
            </div>
            <button>Сохранить</button>
        </div>
    )
}
)
export default TodoView