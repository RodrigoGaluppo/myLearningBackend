import {Request} from "express"

export default interface IAuthenticatedInterface extends Request{
    employee?:{
        id:string | (() => string);
        role: number | (() => number)
    }
}