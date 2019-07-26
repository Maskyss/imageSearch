import {IActionOld, IActionNew, NEW_PAGE, OLD_PAGE} from "../../actions/actionPagination";
import React from "react";
import {connect} from "react-redux";
import {IState} from "../../interfaces";
import './Pagination.scss'
function nextPage(page:number):IActionNew{
    return {
        type:NEW_PAGE,page
    }
}
function lastPage(page:number):IActionOld{
    return {
        type:OLD_PAGE,page
    }
}
interface IProps {
    page:number
    error:boolean
    nextPage:typeof nextPage
    lastPage:typeof lastPage
}

const Pagination = ({page,error,nextPage,lastPage}:IProps) =>{

    const onClickLast = (event:React.MouseEvent<HTMLButtonElement,MouseEvent> ) => {
        event.preventDefault();
        lastPage(page)
    }
    const onClickNext = (event:React.MouseEvent<HTMLButtonElement,MouseEvent> ) => {
        event.preventDefault();
        nextPage(page)
    }

    const buttonOld = <button onClick={onClickLast}>{page-1}</button>
    const buttonNew = <button onClick={onClickNext}>{page+1}</button>

    return <div className="btn-pag">

            {page===1 ? <></> : buttonOld}
            {error ? <></> : buttonNew}
          </div>
}

const mapStateToProps = (state: IState): { page: number, error:boolean } => ({
    page: state.page,
    error:state.error
})
export default connect(mapStateToProps,{nextPage,lastPage})(Pagination)