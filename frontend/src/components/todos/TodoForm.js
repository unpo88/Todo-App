import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTodos, getTodo, deleteTodo, addTodo, updateTodo } from '../../actions/todos';

import { Checkbox, Layout, Input, Button, List, Form, Tag } from 'antd';
import { DeleteOutlined, PlusCircleOutlined, TagsOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';

import '../../../static/frontend/TodoForm.css';
import { createMessage } from '../../actions/messages';

import Modal from './TodoModal';

const { Content } = Layout;

export class TodoForm extends Component {
    state = {
        todo: {
            content: '',
            completed: '',
            completed_at: ''
        },
        showModal: false
    };

    static propTypes = {
        todos: PropTypes.array.isRequired,
        getTodos: PropTypes.func.isRequired,
        getTodo: PropTypes.func.isRequired,
        addTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        updateTodo: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getTodos();
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onChangeCheck = e => this.setState({ [e.target.name]: e.target.checked });

    addTodo = values => {
        const { content } = this.state;
        const todo = { content };
        this.props.addTodo(todo);
        this.setState({
            'content': ''
        });
    };

    completedTodo = (id, completed, content) => {
        this.props.updateTodo(id, !completed, content).then(() => {
            this.props.getTodos();
        })
    }

    toggle = () => {
        this.setState({ showModal: !this.state.showModal });
    };

    editItem = todo => {
        this.setState({ todo: todo, showModal: !this.state.showModal });
    }

    handleSubmit = (todo) => {
        this.toggle();
        this.props.updateTodo(todo.id, todo.completed, todo.content).then(() => {
            this.props.getTodos();
        });
    };

    render() {
        const { content } = this.state;

        return (
            <Layout className="App">
                <Content className="App-content">
                    <Form
                        className="todo-form"
                        layout="horizontal"
                        onFinish={this.addTodo}
                    >
                        <Form.Item
                            rules={[{ required: true, message: 'Please, type in the todo name.' }]}
                        >
                            <Input
                                prefix={<TagsOutlined />}
                                ref="add-todo-input"
                                className="App-add-todo-input"
                                size="large"
                                placeholder="What needs to be done?"
                                name="content"
                                onChange={this.onChange}
                                value={content}
                                onPressEnter={evt => this.addTodo}
                            />
                            <Button
                                className="App-add-todo-button"
                                size="large"
                                type="primary"
                                onClick={this.addTodo}
                            >
                                <PlusCircleOutlined />
                                Add Todo
                                </Button>
                        </Form.Item>
                        <List
                            className="App-todos"
                            size="large"
                            bordered
                            dataSource={this.props.todos}
                            renderItem={todo => (
                                <List.Item>
                                    <Checkbox
                                        defaultChecked={todo.completed}
                                        onChange={() => this.completedTodo(todo.id, todo.completed, todo.content)}
                                        className="App-todo-checkbox"
                                    />
                                    <Tag color={todo.completed ? "green" : "volcano"} className="todo-tag">
                                        {todo.completed ? <CheckCircleOutlined /> : "-"}
                                    </Tag>
                                    {todo.completed ? <div><s>{todo.content}</s></div> : <div>{todo.content}</div>}
                                    <EditOutlined
                                        onClick={() => this.editItem(todo)}
                                        className="App-todo-edit"
                                    />
                                    <DeleteOutlined
                                        onClick={this.props.deleteTodo.bind(this, todo.id)}
                                        className="App-todo-delete"
                                    />
                                </List.Item>
                            )}
                        />
                        {this.state.showModal ? (
                            <Modal
                                todo={this.state.todo}
                                toggle={this.toggle}
                                onSave={this.handleSubmit}
                            />
                        ) : null}
                    </Form>
                </Content>
            </Layout>
            // <div className="card card-body mt-4 mb-4">
            //     <h2>Add Todo</h2>
            //     <form onSubmit={this.onSubmit}>
            //         <div className="form-group">
            //             <label>Content</label>
            //             <input
            //                 className="form-control"
            //                 type="text"
            //                 name="content"
            //                 onChange={this.onChange}
            //                 value={content}
            //                 checked={content.value}
            //             />
            //         </div>
            //         <div className="form-group">
            //             <label>Completed</label>
            //             <input
            //                 className="form-control"
            //                 type="checkbox"
            //                 name="completed"
            //                 onChange={this.onChangeCheck}
            //                 value={completed}
            //             />
            //         </div>
            //         <div className="form-group">
            //             <button type="submit" className="btn btn-primary">
            //                 Submit
            //             </button>
            //         </div>
            //     </form>
            // </div>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.todos.todos
});

export default connect(mapStateToProps, { getTodos, getTodo, deleteTodo, addTodo, updateTodo })(TodoForm);