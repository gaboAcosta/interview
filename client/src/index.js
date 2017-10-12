
import React from 'react'
import ReactDom from 'react-dom'

class Index extends React.Component {
    render() {
        return(
            <div>Hello world!</div>
        )
    }
}

ReactDom.render(<Index/>, document.getElementById('app'))