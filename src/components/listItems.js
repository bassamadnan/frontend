import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

function MainListItems() {
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <Tooltip 
        title="Return to Dashboard" 
        placement="right"
        arrow
      >
        <ListItemButton onClick={() => handleItemClick('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </Tooltip>

      <Tooltip 
        title="View all domains and their details" 
        placement="right"
        arrow
      >
        <ListItemButton onClick={() => handleItemClick('/verticals')}>
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Domains" />
        </ListItemButton>
      </Tooltip>

      <Tooltip 
        title="View detailed node information and statistics" 
        placement="right"
        arrow
      >
        <ListItemButton onClick={() => handleItemClick('/details?filter=Water Quality')}>
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>
          <ListItemText primary="Nodes" />
        </ListItemButton>
      </Tooltip>

      <Tooltip 
        title="Add a new domain or Bulk Import Nodes" 
        placement="right"
        arrow
      >
        <ListItemButton onClick={() => handleItemClick('/add')}>
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Add Domain" />
        </ListItemButton>
      </Tooltip>
    </>
  );
}

export default MainListItems;