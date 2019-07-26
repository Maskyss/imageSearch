import { IState } from '../interfaces'
import  * as AInput from '../actions/actionsInput'
import  * as ASearch from '../actions/actionsSearch'
import  * as APagination from '../actions/actionPagination'



const initState: IState = {
  items: [],
  loading: false,
  error: false,
  errorMessage: '',
  inputValue: '',
  emptyDataRecieved: false,
  searcher:ASearch.BING,
  page:1
}

const reducer = (state: IState = initState, action: AInput.AppActions | ASearch.SearchActions| APagination.PaginationActions ): IState => {
  switch (action.type) {

    case AInput.ACTION_DATA_LOADED:
      return (!action.data.length) ? {
        ...initState,
        inputValue: state.inputValue,
        emptyDataRecieved: true,
        page:state.page,
        searcher:state.searcher

      } : {
          ...initState,
          items: action.data,
          inputValue: state.inputValue,
        page:state.page,
        searcher:state.searcher
      }

    case AInput.ACTION_API_ERRORED:
      return {
        ...initState,
        error: true,
        errorMessage: action.errorData,
        inputValue: state.inputValue,
        page:state.page,
        searcher:state.searcher
      }

    case AInput.ACTION_INPUT_CHANGED:
      return {
        ...initState,
        inputValue: action.inputValue,
        page:state.page,
        searcher:state.searcher
      }

    case AInput.ACTION_INPUT_BROWSE:
      return {
        ...state,
            inputValue: action.inputValue,
            error: false,
            loading: true,
            page:state.page,
            searcher:state.searcher

      }
    case ASearch.GOOGLE:
      return {
        ...state,
        page:1,
        searcher:ASearch.GOOGLE
      }
    case ASearch.BING:
      return {
        ...state,
        page:1,
        searcher:ASearch.BING
      }
    case APagination.NEW_PAGE:
      return {
        ...state,
        loading: true,
        page:state.page+1,
        searcher:state.searcher
      }
    case APagination.OLD_PAGE:
      return {
        ...state,
        loading: true,
        page:state.page-1,
        searcher:state.searcher
      }
    default:
      return state
  }
}

export default reducer