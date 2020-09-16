import React, { Component } from 'react';  
import TreeView from '@material-ui/lab/TreeView';  
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';  
import ChevronRightIcon from '@material-ui/icons/ChevronRight';  
import TreeItem from '@material-ui/lab/TreeItem';  
import { Row, Col, ListGroupItem } from 'reactstrap';
import LongMenu from './MenuComponent';
import { getName } from '../Authorisation';

function Treeview(props) {  

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} onLabelClick={(event) =>event.preventDefault()}
         label={
            <ListGroupItem>
                <Row>
                    <Col>
                        <a target="_blank" href={nodes.url} onClick={(event) => event.stopPropagation()}>{nodes.name}</a>
                    </Col>
                    <Col md={{ offset: 4 }}>
                        <LongMenu user={props.user.id} node={nodes} isFolder={nodes.url ? false : true}
                            deleteBookmarks={props.deleteBookmarks} 
                            createBookmarks={props.createBookmarks} 
                            editBookmarks={props.editBookmarks}/>
                    </Col>
                </Row>
            </ListGroupItem>}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );
    
    return (
        <div>
            <Col sm={6}>
                <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpanded={['root']} defaultExpandIcon={<ChevronRightIcon />}>
                    {renderTree(props.data)}
                </TreeView>
            </Col>
        </div>
    );
}

class Organiser extends Component {
    constructor(props) {
        super(props);
    }
    render()
    {
        const data = {
            id: 'root',
            name: 'Bookmarks',
            children: []
        }
        return (
            <>
                <h1>Hi {getName()}</h1>
                <Treeview data={this.props.bookmarks.bookmarks} 
                    user={this.props.user} 
                    deleteBookmarks={this.props.deleteBookmarks} 
                    createBookmarks={this.props.createBookmarks} 
                    editBookmarks={this.props.editBookmarks} />
            </>
        );
    }
}
  
export default Organiser;
