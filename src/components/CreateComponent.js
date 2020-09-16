import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Modal, ModalBody, ModalHeader  } from 'reactstrap';

class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            addChildFolder : []
        }
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRemoveClick() {
        this.setState({
            addChildFolder: []
        });
    };

    handleAddClick() {
        this.setState({
            addChildFolder: [...this.state.addChildFolder, ['newFolder'] ]
        });
    };

    handleSubmit(event) {
        console.log("Creating bookmark : Name: " + this.name.value + " Url: " + this.url.value );
        this.props.createBookmarks(this.props.node.id, (this.state.addChildFolder.length == 1) ? this.newFolderName.value : null, this.name.value, this.url.value);
        event.preventDefault();
    };
    render() {
        return(
            <div>
                <Modal isOpen={this.props.open}>
                    <ModalHeader toggle={this.props.onHide()}>
                        {this.props.label}
                    </ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.handleSubmit} >
                        <FormGroup row>
                            <Label htmlFor="name" sm={3}>Name :</Label>
                            <Col sm={6}>
                                <Input type="text" id="name" name="name" innerRef={(input) =>this.name = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="url" sm={3}>URL :</Label>
                            <Col sm={6}>
                                <Input type="url" id="url" name="url" innerRef={(input) =>this.url = input}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="folderName" sm={3}> Folder : </Label>
                            <Col sm={6}>
                                <Input type="text" name="folderName" defaultValue={this.props.node.name} id="folderName" readOnly></Input>
                            </Col>
                        </FormGroup>
                        {
                            this.state.addChildFolder.map((value, index) => {
                                return(
                                <div key={index}>
                                    <FormGroup row>
                                        <Label htmlFor="newFolderName" sm={3}>New Folder Name :</Label>
                                        <Col sm={6}>
                                            <Input type="text" id="newFolderName" name="newFolderName" innerRef={(input) =>this.newFolderName = input}/>
                                        </Col>
                                    </FormGroup>
                                </div>);
                            })
                        }
                        {
                            (this.state.addChildFolder.length !== 1) && <Button type="button" value="createFolder" color="warning" size="lg"  onClick={() => this.handleAddClick()}>Create Folder</Button>
                        }
                        {
                            (this.state.addChildFolder.length === 1) && <Button type="button" value="removeFolder" color="danger" size="lg" onClick={() => this.handleRemoveClick()}>Remove Folder</Button>
                        }
                        <Button type="submit" value="submit" color="success" size="lg" className="ml-5">Create</Button>
                    </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Create;