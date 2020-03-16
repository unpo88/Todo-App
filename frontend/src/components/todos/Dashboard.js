import React, { Component } from 'react';

import TodoForm from './TodoForm';

export class Dashboard extends Component {
    render() {
        return (
            <div>
                <TodoForm />
            </div>
        )
    }
}

export default Dashboard;
