import {makeAutoObservable} from "mobx"

export default class UserTask {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }
    SetIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user){
        this._user = user
    }
}