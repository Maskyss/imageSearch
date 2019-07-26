import {Action} from "redux";

export const NEW_PAGE = 'NEW_PAGE'
export const OLD_PAGE = 'OLD_PAGE'



export type NewPageType = typeof NEW_PAGE
export type OldPageType= typeof OLD_PAGE

export interface IActionNew extends Action {
    type: NewPageType
    page:number
}
export interface IActionOld extends Action {
    type: OldPageType
    page:number
}

export type PaginationActions =  IActionNew | IActionOld