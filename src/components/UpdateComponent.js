import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';

class Update extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bookmarks : []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert("Name: " + this.updateItem.value + " url: " + this.url.value);
        event.preventDefault();
    };

    fetchBookmarks() {
        const data = [
            {
                id: "2",
                name: "Google",
                url: "http://google.com"
            },
            {
                id: "3",
                name: "Google",
                url: "http://google.com"
            }
        ];

        this.setState({
            bookmarks: data
        });
    }

    render() {
        return(
            <div>
                <Form onSubmit={this.handleSubmit} className="ml-5" >
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
                        <Button type="button" value="submit" color="primary" size="sm" className="ml-5" onClick={()=> this.fetchBookmarks()}>fetch</Button>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="bookmarks" sm={3}>Available bookmarks : </Label>
                        <Col sm={6}>
                            <Input type="select" name="bookmarks" id="bookmarks" innerRef = {(input)=> this.updateItem = input}>
                            {
                                this.state.bookmarks.map((value, index) => {
                                    return(
                                        <option key={index} value={value.id}>{value.name}</option>
                                    );
                                })
                            }
                            </Input>
                        </Col>
                    </FormGroup>
                    <h2> TO </h2>
                    <FormGroup row>
                        <Label htmlFor="url" sm={3}>Change url :</Label>
                        <Col sm={6}>
                            <Input type="url" id="url" name="url" innerRef={(input) =>this.url = input}/>
                        </Col>
                    </FormGroup>
                    <Button type="submit" value="submit" color="warning" size="lg" className="ml-5">Update</Button>
                </Form>
            </div>
        );
    }
}

export default Update;