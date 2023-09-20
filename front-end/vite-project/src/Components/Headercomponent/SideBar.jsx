import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import AndroidIcon from '@mui/icons-material/Android';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = ({ open, onClose }) => {
  const drawerWidth = 200;
  const reducedSidebarHeight = '70vh';
  const location = useLocation();

  const pathToOptionInfo = {
    '/': { text: 'Home', icon: <HomeIcon /> },
    '/courses': { text: 'Courses', icon: <BookIcon /> },
    '/jobs': { text: 'Jobs', icon: <WorkIcon /> },
    '/scholarship': { text: 'Scholarship', icon: <SchoolIcon /> },
    '/community': { text: 'Community', icon: <PeopleIcon /> },
    '/chatbot': { text: 'Chat Bot', icon: <AndroidIcon /> },
    '/account': { text: 'Account', icon: <AccountCircleIcon /> },
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        height: reducedSidebarHeight,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          marginTop: '65px',
        },
      }}
    >
      <div role="presentation" onClick={onClose} onKeyDown={onClose}>
        <List>
          {Object.entries(pathToOptionInfo).map(([path, { text, icon }]) => (
            <ListItem
              key={path}
              button
              component={Link}
              to={path}
              style={{ textDecoration: 'none', color: 'inherit' }}
              selected={location.pathname === path}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
