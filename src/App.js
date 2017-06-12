import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fetch from 'node-fetch';

class App extends Component {
    render() {
        const url = 'http://localhost:3001/items';

        function handleClick(e) {
            e.preventDefault();
            fetch(url)
            .then(res => res.json())
            .then(json => console.log(json));
        }

        function handleKey(e) {
            if(e.keyCode === 13) {
                fetch(url, { method: 'POST', body: 'a=1' })
                .then(function(res) {
                    return res.json();
                }).then(function(json) {
                    console.log(json);
                });
            }
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
                <input className="App-new-item" onKeyUp={handleKey} />
            </div>
        );
    }
}

export default App;
