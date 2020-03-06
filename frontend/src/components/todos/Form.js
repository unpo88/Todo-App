import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTodo } from '../../actions/todos';

export class Form extends Component {
    state = {
        content: '',
        completed: ''
    };

    static propTypes = {
        addTodo: PropTypes.func.isRequired
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onChangeCheck = e => this.setState({ [e.target.name]: e.target.checked });

    onSubmit = e => {
        e.preventDefault();
        const { content, completed } = this.state;
        const todo = { content, completed };
        this.props.addTodo(todo);
    };

    render() {
        const { content, completed } = this.state;

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add Todo</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Content</label>
                        <input
                            className="form-control"
                            type="text"
                            name="content"
                            onChange={this.onChange}
                            value={content}
                            checked={content.value}
                        />
                    </div>
                    <div className="form-group">
                        <label>Completed</label>
                        <input
                            className="form-control"
                            type="checkbox"
                            name="completed"
                            onChange={this.onChangeCheck}
                            value={completed}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, { addTodo })(Form);