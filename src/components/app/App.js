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
        this.state = {items: [], text: ''};
        this.config = new Config();
        // One way to avoid binding in render function is to bind in the constructor
        this.handleInputSubmit= this.handleInputSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);

        this.getAllItems();
    }

    getAllItems() {
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

    postItem(newItem) {
        fetch(this.config.serverEndpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
        .then((response) => {
            this.setState((prevState) => ({
                items: prevState.items.concat(newItem),
                text: ''
            }));
        });
    }

    handleInputChange(event) {
        this.setState({text: event.target.value});
    }

    handleInputSubmit(event) {
        if(event.keyCode === 13) {
            var newItem = {
                text: this.state.text,
                id: Date.now().toString() // Not guaranteed to be unique though
            };
            this.postItem(newItem);
        }
    }

    // This function will be passed down to TodoList
    handleDeleteClick(event) {
        const id = event.target.id;
        fetch(this.config.serverEndpoint + '/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then((response) => {
            this.setState(prevState => ({
                items: prevState.items.filter(item => item.id !== id)
            }));
        });
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
                    <TodoList items={this.state.items} config={this.state.config} onClick={this.handleDeleteClick} />
                </div>
                <input type="text" className="App-new-item" onKeyUp={this.handleInputSubmit} onChange={this.handleInputChange} value={this.state.text} />
            </div>
        );
    }
}

export default App;
