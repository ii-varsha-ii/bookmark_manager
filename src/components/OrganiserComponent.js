import React from 'react';  
import TreeView from '@material-ui/lab/TreeView';  
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';  
import ChevronRightIcon from '@material-ui/icons/ChevronRight';  
import TreeItem from '@material-ui/lab/TreeItem';  
import { ListGroupItem } from 'reactstrap';

function Treeview(props) {  

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={<ListGroupItem><a href={nodes.url} target="_blank">{nodes.name}</a></ListGroupItem>}>
          {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );
    
    return (
    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpanded={['root']} defaultExpandIcon={<ChevronRightIcon />}>
        {renderTree(props.data)}
    </TreeView>
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
        <h1>Hi {props.username}</h1>
        <Treeview data={data}/>
    </>
    );
}

  
  export default Organiser;