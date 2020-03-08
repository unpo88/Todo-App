import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: this.props.todo
        };
    }

    handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        const todo = { ...this.state.todo, [name]: value };
        this.setState({ todo });
    };

    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input
                                type="text"
                                name="content"
                                value={this.state.todo.content}
                                onChange={this.handleChange}
                                placeholder="Enter Todo Content"
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label for="completed">
                                <Input
                                    type="checkbox"
                                    name="completed"
                                    checked={this.state.todo.completed}
                                    onChange={this.handleChange}
                                />
                                Completed
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={() => onSave(this.state.todo)}
                    >
                        Save
                </Button>
                </ModalFooter>
            </Modal>
        );
    }
}