import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Col, ListGroup, ListGroupItem } from 'reactstrap';

class Delete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bookmarks: [],
            selectedBookmark: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection(value, event) {
        this.setState({
            selectedBookmark: value
        });
    }

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

    handleSubmit(event) {
        alert("Selected : " + this.state.selectedBookmark.name);
        this.deleteBookmark(this.foldername.value, )
        this.setState({
            bookmarks: this.state.bookmarks.filter((val) => val.id !== this.state.selectedBookmark.id),
            selectedBookmark: ''
        });
        
        event.preventDefault();
    };
    render() {
        return(
            <div>
                <Form onSubmit={this.handleSubmit} className="ml-5" >
                    <FormGroup row>
                        <Label htmlFor="folderName" sm={2}> Available Folders :</Label>
                        <Col sm={6}>
                            <Input type="select" name="folderName" id="folderName" innerRef = {(input)=> this.foldername = input} >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Input>
                        </Col>
                        <Button type="button" value="submit" color="primary" size="sm" className="ml-5" onClick={()=> this.fetchBookmarks()}>fetch bookmarks</Button>
                    </FormGroup>
                    {
                        this.state.bookmarks.map((value, index) => {
                            return (
                                <ListGroup sm={6}>
                                    <ListGroupItem action active={this.state.selectedBookmark.id === value.id} onClick={()=> this.handleSelection(value)}>{value.name}</ListGroupItem>
                                </ListGroup>
                            );
                        })
                    }
                    {
                        this.state.bookmarks.length !== 0 && <Button type="submit" value="submit" color="danger" size="lg" className="m-5">Delete</Button>
                    }
                </Form>
            </div>
        );
    }
}

export default Delete;