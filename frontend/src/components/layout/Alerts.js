import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            if (error.msg.user_id) alert.error(`Email: ${error.msg.user_id.join()}`);
            if (error.msg.user_name) alert.error(`Username: ${error.msg.user_name.join()}`);
            if (error.msg.content) alert.error(`Content: ${error.msg.content.join()}`);
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());

        }

        if (message !== prevProps.message) {
            if (message.deleteTodo) alert.success(message.deleteTodo);
            if (message.addTodo) alert.success(message.addTodo);
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
