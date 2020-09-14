import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';

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
        if(this.state.addChildFolder.length !== 1)
            this.newFolderName.value = null;
        //alert("Name: " + this.name.value + " Url: " + this.url.value + " Folder: " + folder);
        this.props.createBookmark(this.props.userId, this.foldername.value, this.newFolderName.value, this.name.value, this.url.value);
        event.preventDefault();
    };
    render() {
        return(
            <div>
                <Form onSubmit={this.handleSubmit} className="ml-5" >
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
                        <Label htmlFor="folderName" sm={3}> Available Folders :</Label>
                        <Col sm={6}>
                            <Input type="select" name="folderName" id="folderName" innerRef = {(input)=> this.foldername = input} >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Input>
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
            </div>
        );
    }
}

export default Create;