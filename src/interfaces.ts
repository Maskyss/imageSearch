export interface ItemModel {
  id: number
  name: string
  url: string

}

export interface IState {
  items: ItemModel[]
  inputValue: string
  loading: boolean
  error: boolean
  errorMessage: any
  emptyDataRecieved: boolean
  searcher:string
}