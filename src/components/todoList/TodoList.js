import React from 'react';

class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text} <button id={item.id} onClick={this.props.onClick} href="#">x</button></li>
                ))}
            </ul>
        );
    }
}

export default TodoList;
