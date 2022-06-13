import Login from "../Components/Auth/login"
import Registration from "../Components/Auth/registration"
import Content from "../Components/Content/content"
import { 
    REGISTRATION_ROUTE, 
    LOGIN_ROUTE,
    TASKS_ROUTE,
} from "../utils/consts"

export const authRoutes = [
    {
        path: TASKS_ROUTE,
        Component: Content
    },
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]