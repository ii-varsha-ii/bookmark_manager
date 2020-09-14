import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Create from './CreateComponent';
import Delete from './DeleteComponent';
import Update from './UpdateComponent';

class Manager extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'createTab'
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle = (tab) => {
        if(this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
    }

    render() {
        return (
            <div>
            <Row>
                <Col sm={3}>
                    <Nav pills className="flex-column">
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === 'createTab' })}
                                onClick={() => { this.toggle('createTab'); }} >
                                Create
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === 'deleteTab' })}
                                onClick={() => { this.toggle('deleteTab'); }}>
                                Delete
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === 'updateTab' })}
                                onClick={() => { this.toggle('updateTab'); }}>
                                Update
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="createTab">
                            <Row>
                                <Col sm="12">
                                    <Create createBookmark={this.props.createBookmark} userId={this.props.userId} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="deleteTab">
                            <Row>
                                <Col sm="12">
                                    <Delete />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="updateTab">
                            <Row>
                                <Col sm="12">
                                    <Update />
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
            </div>
        );
  }
}

export default Manager;
