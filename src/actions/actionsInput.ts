import { Action } from 'redux'
import { ItemModel } from '../interfaces'

export const ACTION_INPUT_CHANGED= 'INPUT_CHANGED'
export const ACTION_INPUT_BROWSE= 'INPUT_BROWSE'
export const ACTION_DATA_LOADED = 'DATA_LOADED'
export const ACTION_API_ERRORED = 'API_ERRORED'


export interface IActionInputChanged extends Action {
  type: 'INPUT_CHANGED'
  inputValue: string
}
export interface IActionInputBrowse extends Action {
  type: 'INPUT_BROWSE'
  inputValue: string
}
export interface IActionDataLoaded extends Action {
  type: 'DATA_LOADED'
  data: ItemModel[]
}

export interface IActionApiErrored extends Action{
  type: 'API_ERRORED'
  errorData: Readonly<{}>
}

export type AppActions = IActionInputChanged
    | IActionDataLoaded
    | IActionApiErrored
    | IActionInputBrowse

export function changeInput(inputValue: string): IActionInputChanged {
  return { type: ACTION_INPUT_CHANGED, inputValue }
}

export function browseInput(inputValue: string): IActionInputBrowse {
  return { type: ACTION_INPUT_BROWSE, inputValue }
}
