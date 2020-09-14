import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';

class Edit extends Component{

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        this.props.editBookmarks(this.props.node.id, this.name.value, this.url.value);
        event.preventDefault();
    }
    
    render() {
        return(
            <div>
                <Modal isOpen={this.props.open}>
                    <ModalHeader toggle={this.props.onHide()}>
                        {this.props.label}
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit} className="ml-5" >
                            <FormGroup row>
                                <Label htmlFor="name" sm={3}>Name : </Label>
                                <Col sm={6}>
                                    <Input type="text" id="name" name="name" innerRef={(input) =>this.name = input}/>
                                </Col>
                            </FormGroup>
                            {
                                (this.props.node.url) ?
                                <FormGroup row>
                                    <Label htmlFor="url" sm={3}>Url : </Label>
                                    <Col sm={6}>
                                        <Input type="url" id="url" name="url" innerRef={(input) =>this.url = input}/>
                                    </Col>
                                </FormGroup> : null
                            }
                            <Button type="submit" value="submit" color="warning" size="lg" className="ml-5">Update</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Edit;