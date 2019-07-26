import React from 'react'
import './index.scss'
import SearchBar from '../../components/SearchBar/SearchBar'
import MainSection from '../../components/MainSection/MainSection'
import Picklist from "../../components/PickList/Picklist";


class App extends React.Component<any,any> {
  render() {
    return(
        <div>
            <Picklist/>
            <SearchBar/>
            <MainSection/>
        </div>
        );
  }
}

export default App;