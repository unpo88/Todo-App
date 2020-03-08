import React, { Component } from 'react';

import TodoForm from './TodoForm';
import Todos from './Todos';
import TodoModal from './TodoModal';

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
