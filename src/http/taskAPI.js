import { $authHost } from "./index";

export const createHandler = async (title, description, end_date, responsible, status, priority) => {
    const data = await $authHost.post(
        'api/tasks/create', 
        {
            title, 
            description, 
            end_date, 
            responsible, 
            status, 
            priority
        }
        )
    return data     
}

export const getResponsibleHandler = async () => {
    const {data} = await $authHost.get('api/tasks/getresponsible')
    return data
}

export const updateStatusHandler = async (task_id, status) => {
    const {data} = await $authHost.post(
        'api/tasks/change',
        {task_id, status}
    )
    return data
}

export const getHandler = async () => {
    const {data} = await $authHost.get('api/tasks/get')

    return data
}