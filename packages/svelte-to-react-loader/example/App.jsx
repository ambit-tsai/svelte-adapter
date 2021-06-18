import React, { Component } from 'react'
import Child from './Child.svelte'


export default class App extends Component {
    state = {
        value: 0,
    }

    render() {
        return <div>
            <p>
                <button onClick={this.increase}>Increase</button>
            </p>
            <Child
                value={this.state.value}
                onClick={() => {}}
                $slot01={() => <i>Hello {this.state.value}</i>}
            >
                <b>Default Slot</b>
            </Child>
        </div>
    }

    increase = () => {
        this.setState({ value: ++this.state.value })
    }
}