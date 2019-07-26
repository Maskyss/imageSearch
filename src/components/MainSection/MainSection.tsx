import React from 'react'
import { connect } from 'react-redux'
import Results from './Results'
import './Main.scss'
import { IState } from '../../interfaces'

interface IProps {
  loading: boolean
}

const MainSection = ({ loading }: IProps) => {
  return (
    <div className="main-section">
      <div >
        {loading ? <div id="loader" /> : <Results />}
      </div>
    </div>
  )
}

const mapStateToProps = (state: IState): IProps => ({
  loading: state.loading,
})

export default connect(mapStateToProps)(MainSection)