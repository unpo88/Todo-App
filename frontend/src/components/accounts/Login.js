import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, loader } from '../../actions/auth';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import '../../../static/frontend/Login.css';

export class Login extends Component {
    // state = {
    //     user_id: "",
    //     password: "",
    // }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    // onSubmit = e => {
    //     e.preventDefault();
    //     this.props.login(this.state.user_id, this.state.password);
    // };

    // onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }

        // const { user_id, password } = this.state;

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };

        const tailLayout = {
            wrapperCol: { offset: 8, span: 12 },
        };

        const onFinish = values => {
            // e.preventDefault();
            // this.props.login(this.state.user_id, this.state.password);
            this.props.login(values.user_id, values.password);
        };

        return (
            <div className="col-md-4 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="user_id"
                            rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                        </Button>
                            Don't have an account? <Link to="/register">Register now!</Link>
                        </Form.Item>
                    </Form>
                    {/* <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="user_id"
                                onChange={this.onChange}
                                value={user_id}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Login
                        </button>
                        </div>
                        <p>
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </form> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login, loader })(Login);