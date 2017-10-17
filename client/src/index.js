
import React from 'react'
import ReactDom from 'react-dom'
import Routes from './components/main/Routes'
import { Provider } from 'mobx-react'
import GetStores from './stores'

const stores = GetStores()

class Index extends React.Component {
    render() {
        return(
            <Provider {...stores}>
                <Routes />
            </Provider>
        )
    }
}

ReactDom.render(<Index/>, document.getElementById('app'))