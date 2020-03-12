import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';

import { Form, Input, InputNumber, Button } from 'antd';
import '../../../static/frontend/Login.css';

export class Register extends Component {
    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };

        const tailLayout = {
            wrapperCol: { offset: 8, span: 12 },
        };

        const onFinish = values => {
            if (values.password !== values.password2) {
                this.props.createMessage({
                    passwordNotMatch: 'Password do not match'
                });
            } else {
                this.props.register(values.user_id, values.user_name, values.password);
            }
        };

        return (
            <div className="col-md-6 m-auto" >
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name='user_id'
                            label="Email"
                            rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}>
                            <Input placeholder="Please input your email" />
                        </Form.Item>
                        <Form.Item
                            name='user_name'
                            label="Name"
                            rules={[{ required: true, message: 'Please input your Name!' }]}>
                            <Input placeholder="Please input your Name" />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label="Password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name='password2'
                            label="Confirm Password"
                            rules={[{ required: true, message: 'Please Confirm your Password!' }]}
                        >
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Submit
                            </Button>
                            Already have an account? <Link to="/login">Login now!</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, createMessage })(Register);