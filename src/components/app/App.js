// The import statement is used to import functions, objects or primitives that have been exported from an external module, another script, etc.
// This feature is only beginning to be implemented in browsers natively at this time. Babel is used as compiler.
import React, { Component } from 'react';
import Logo from './logo.svg';
import './App.css';
import TodoList from '../todoList/TodoList';
import Config from '../../config';

class App extends Component {
    constructor(props) {
        super(props);
        this.config = new Config();
        this.state = {items: [], text: ''};
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        fetch(this.config.serverEndpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({items: responseJson});
        });
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    handleSubmit(event) {
        if(event.keyCode === 13) {
            var newItem = {
                text: this.state.text,
                id: Date.now()
            };
            this.setState((prevState) => ({
                items: prevState.items.concat(newItem),
                text: ''
            }));

            fetch(this.config.serverEndpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            })
            .then(function(res) {
                return res.json();
            }).then(function(json) {
                console.log(json);
            });
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={Logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div className="App-list">
                    <TodoList items={this.state.items} />
                </div>
                <input type="text" className="App-new-item" onKeyUp={this.handleSubmit} onChange={this.handleChange} value={this.state.text} />
            </div>
        );
    }
}

export default App;
