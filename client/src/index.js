
import React from 'react'
import ReactDom from 'react-dom'
import Hello from './components/Hello.js'

class Index extends React.Component {
    render() {
        return(
            <Hello/>
        )
    }
}

ReactDom.render(<Index/>, document.getElementById('app'))