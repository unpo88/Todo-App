import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTodos, deleteTodo, addTodo } from '../../actions/todos';

export class Todos extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        getTodos: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getTodos();
    }

    render() {
        return (
            <Fragment>
                <h1>Todos</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Content</th>
                            <th>Completed</th>
                            <th>Completed_at</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.todos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.content}</td>
                                <td>{todo.completed}</td>
                                <td>{todo.completed_at}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={this.props.deleteTodo.bind(this, todo.id)}>
                                        Delete </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    todos: state.todos.todos
});

export default connect(mapStateToProps, { getTodos, deleteTodo, addTodo })(Todos);