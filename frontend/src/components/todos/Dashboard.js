import React, { Component } from 'react';

import Form from './Form';
import Todos from './Todos';

export class Dashboard extends Component {
    render() {
        return (
            <div>
                <Form />
                <Todos />
            </div>
        )
    }
}

export default Dashboard;
