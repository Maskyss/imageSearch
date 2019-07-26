import React  from 'react'
import { connect } from 'react-redux'
import Card from '../Card/Card'
import { ItemModel, IState } from '../../interfaces'

interface IProps {
  items: ItemModel[]
  emptyDataRecieved: boolean
  error: boolean
}
const Message = (str: string) => <div id="message">{str}</div>

const errMes: string =
    `Error.  
Check for incorrect symbols or try later`

const noRes: string =
    `There is no result on this request.
Try it to change.`



const Results = ({ error, items, emptyDataRecieved }: IProps) => {

  const cards =
    <div id="cards-container">
      {items.map((item: ItemModel) =>
          <Card key={item.id} card={item} />)}
    </div>

  return (
    <>
      {!emptyDataRecieved ? cards : Message(noRes)}
      {error && Message(errMes)}
    </>
  )
}

const mapStateToProps = (state: IState): IProps => ({
  items: state.items,
  emptyDataRecieved: state.emptyDataRecieved,
  error: state.error
})

export default connect(mapStateToProps)(Results)