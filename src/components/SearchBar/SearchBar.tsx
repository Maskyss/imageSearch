import React from 'react'
import { connect } from 'react-redux'
import './SearchBar.scss'
import {browseInput, changeInput} from '../../actions/actionsInput'
import { IState } from '../../interfaces'

interface IProps {
  changeInput: typeof changeInput
  inputValue: string
  searcher:string
  browseInput:typeof browseInput
}

const SearchBar = ({ inputValue, searcher, changeInput,browseInput }: IProps) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    changeInput(value)
  }
  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if(event.key==='Enter'){
      browseInput(inputValue)
    }
  }
  const onClick = (event:React.MouseEvent<HTMLButtonElement,MouseEvent> ) => {
    event.preventDefault();

    browseInput(inputValue)
  }
  return (
    <div className="input">
      <input type="text" id="text-input"
             placeholder={searcher}
        onChange={handleChange}
        onKeyUp= {handleSubmit}
        value={inputValue} 
      />
      <button className="brk-btn" onClick={onClick}>Browse</button>
    </div>
  );
}

const mapStateToProps = (state: IState): { inputValue: string,searcher:string } => ({
  inputValue: state.inputValue,
  searcher: state.searcher
})

export default connect(mapStateToProps, { changeInput,browseInput })(SearchBar)