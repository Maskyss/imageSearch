import { IState } from '../interfaces'
import  * as AInput from '../actions/actionsInput'
import  * as ASearch from '../actions/actionsSearch'



const initState: IState = {
  items: [],
  loading: false,
  error: false,
  errorMessage: '',
  inputValue: '',
  emptyDataRecieved: false,
  searcher:ASearch.BING
}

const reducer = (state: IState = initState, action: AInput.AppActions | ASearch.SearchActions): IState => {
  switch (action.type) {

    case AInput.ACTION_DATA_LOADED:
      return (!action.data.length) ? {
        ...initState,
        inputValue: state.inputValue,
        emptyDataRecieved: true,
        searcher:state.searcher

      } : {
          ...initState,
          items: action.data,
          inputValue: state.inputValue,
        searcher:state.searcher
      }

    case AInput.ACTION_API_ERRORED:
      return {
        ...initState,
        error: true,
        errorMessage: action.errorData,
        inputValue: state.inputValue,
        searcher:state.searcher
      }

    case AInput.ACTION_INPUT_CHANGED:
      return {
        ...initState,
        inputValue: action.inputValue,
        searcher:state.searcher
      }

    case AInput.ACTION_INPUT_BROWSE:
      return {
        ...state,
            inputValue: action.inputValue,
            error: false,
            loading: true,
            searcher:state.searcher

      }
    case ASearch.GOOGLE:
      return {
        ...state,
        searcher:ASearch.GOOGLE
      }
    case ASearch.BING:
      return {
        ...state,
        searcher:ASearch.BING
      }

    default:
      return state
  }
}

export default reducer