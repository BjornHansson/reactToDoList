import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fetch from 'node-fetch';

class App extends Component {
    render() {
        function handleClick(e) {
            e.preventDefault();
            console.log('The link was clicked.');
            fetch('https://api.github.com/users/github')
            .then(res => res.json())
            .then(json => console.log(json));
        }

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <button className="App-check-backend" onClick={handleClick}>Check backend</button>
            </div>
        );
    }
}

export default App;
