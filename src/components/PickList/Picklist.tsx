import {BING, selectSearcher} from "../../actions/actionsSearch";
import {IState} from "../../interfaces";
import {connect} from "react-redux";
import React from "react";
import './Picklist.scss'

interface IProps {
    searcher:string
    selectSearcher:typeof selectSearcher
}


const Picklist =({searcher,selectSearcher}:IProps)=>{

    const onClickGoogle = (event: React.ChangeEvent<HTMLSelectElement> ) => {
        event.preventDefault();
        selectSearcher(event.target.value)
    }

    return <div id="mainselection">
        <select onChange={onClickGoogle}>
            <option defaultValue={BING}>BING</option>
            <option >GOOGLE</option>
        </select>
    </div>
}

const mapStateToProps = (state: IState): { searcher: string } => ({
    searcher: state.searcher
})

export default connect(mapStateToProps, { selectSearcher })(Picklist)