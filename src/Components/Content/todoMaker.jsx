import { observer } from "mobx-react-lite"
import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { statusType, priorityType } from "./shards"
import { createHandler, getResponsibleHandler } from "../../http/taskAPI"
import './content.scss'


const TodoMaker = observer(() => {
    const navigate = useNavigate()
    const [responsibles, setResponsibles] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [end_date, setEndDate] = useState(null)
    const [responsible, setResponsible] = useState(null)
    const [status, setStatus] = useState(null)
    const [priority, setPriority] = useState(null)
    const createTodo = async () => {
        try{
            await createHandler(
                title, 
                description, 
                end_date, 
                responsible, 
                status.id, 
                priority.id
            )
            navigate('/tasks')
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getResponsibleHandler().then(data => {
            setResponsibles(data)
        })
    }, 
    [])
    return (
        <div className="task__maker">
            <div>Название задания</div>
            <input type="text" onChange={e => setTitle(e.target.value)}/>
            <div>Описание</div>
            <textarea type="text" onChange={e => setDescription(e.target.value)}/>
            <div>Дата окончания</div>
            <input type="date" onChange={e => setEndDate(e.target.value)}/>
            <div className="user-select">
            {responsible === null ? 'Выбрать исполнителя...' : responsible.login}
                <hr></hr>
                <ul>
                    {responsibles.length ? responsibles.map(res => (<li onClick={() => setResponsible(res.id)}>Пользователь: {res.login}</li>)) : null}
                </ul>
            </div>
            <div className="user-select">
                {status === null ? 'Выбрать статус...' : status.status}
                <hr></hr>
                <ul>
                    {statusType.map(item => (<li onClick={() => setStatus(item)}>{item.status}</li>))}
                </ul>
            </div> 
            <div className="user-select">
                {priority === null ? 'Выбрать приоритет...' : priority.priority}
                <hr></hr>
                <ul>
                    {priorityType.map(item => (<li onClick={() => setPriority(item)}>{item.priority}</li>))}
                </ul>
            </div>
            <button onClick={() => createTodo()}>Создать</button>
        </div>
    )
})

export default TodoMaker