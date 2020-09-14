import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Create from './CreateComponent';
import Edit from './EditComponent';

const ITEM_HEIGHT = 48;

function LongMenu(props) {

  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const toggleAddModal = () => {
    setAddModal(!addModal);
  }

  const toggleEditModal = () => {
    setEditModal(!editModal);
  }

  const handleCreate = () => {
    setAddModal(true);
  }

  const handleDelete = () => {
    console.log("To be deleted: " + props.node.id);
    props.deleteBookmarks(props.user, props.node.id);
  }

  const handleUpdate = () => {
    setEditModal(true);
  }

  return (
    <div>
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick} size="small">
        <MoreVertIcon />
      </IconButton>
      <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} 
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '10ch',
          },
        }}>
        {
          (props.isFolder) ?
            <MenuItem key="add" onClick={handleCreate} >
              Add
            </MenuItem> : null
        }
        <MenuItem key="update" onClick={handleUpdate}>
          Edit
        </MenuItem>
        <MenuItem key="delete" onClick={handleDelete}>
          Delete
        </MenuItem>
        <Create open={addModal} label="Add Bookmark" node={props.node} onHide={() => toggleAddModal} createBookmarks={props.createBookmarks} />
        <Edit open={editModal} label="Edit Bookmark" node={props.node} onHide={() => toggleEditModal} editBookmarks={props.editBookmarks}/>
      </Menu>
    </div>
  );
}

export default LongMenu;