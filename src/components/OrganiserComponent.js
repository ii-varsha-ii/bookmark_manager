import React from 'react';  
import TreeView from '@material-ui/lab/TreeView';  
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';  
import ChevronRightIcon from '@material-ui/icons/ChevronRight';  
import TreeItem from '@material-ui/lab/TreeItem';  
import { ListGroupItem, Row, Col } from 'reactstrap';
import LongMenu from './MenuComponent';

function Treeview(props) {  

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} onLabelClick={(event) => {event.preventDefault()}}
         label={
            <div className="list-group-item">
                <Row>
                    <Col>
                        <a href={nodes.url} target="_blank">{nodes.name}</a>
                    </Col>
                    <Col md={{ offset: 4 }}>
                        <LongMenu user={props.user.id} node={nodes} isFolder={nodes.url ? false : true}
                            deleteBookmarks={props.deleteBookmarks} 
                            createBookmarks={props.createBookmarks} 
                            editBookmarks={props.editBookmarks}/>
                    </Col>
                </Row>
            </div>}>
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

function Organiser(props) {
    const data = {
        id: 'root',
        name: 'Bookmarks',
        children: [
            {
                id: "1",
                name: "Banks",
                children: [
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
                ]
            },
            {
                id: "5",
                name: "Entertainment",
                children: [
                    {
                        id: "6",
                        name: "Netflix",
                        url: "http://netflix.com"
                    },
                    {
                        id: "7",
                        name: "Hotstar",
                        url: "http://hotstar.com"
                    }
                ]
            },
            {
                id: "8",
                name: "Google",
                url: "http://hotstar.com"
            }
        ]
    }
    return (
    <>
        <h1>Hi {props.user.name}</h1>
        <Treeview data={data} user={props.user} deleteBookmarks={props.deleteBookmarks} 
                            createBookmarks={props.createBookmarks} 
                            editBookmarks={props.editBookmarks}/>
    </>
    );
}

  
  export default Organiser;