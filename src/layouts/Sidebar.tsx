import React from 'react';
import { Drawer, Box, IconButton, Typography, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;
const collapsedWidth = 60;

interface SidebarProps {
    open: boolean;
    toggleDrawer: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleDrawer }) => {
    const location = useLocation();

    const menuItems = [
        { text: "Home", icon: <HomeIcon fontSize="medium" />, path: "/" },
        { text: "Patient", icon: <PermContactCalendarIcon fontSize="medium" />, path: "/patient" }
    ];

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                width: open ? drawerWidth : collapsedWidth,
                flexShrink: 0,
                whiteSpace: 'nowrap',
                transition: (theme) =>
                    theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                '& .MuiDrawer-paper': {
                    width: open ? drawerWidth : collapsedWidth,
                    boxSizing: "border-box",
                    overflowX: 'hidden',
                    backgroundColor: '#001219',
                    color: 'white',
                    borderRight: '0px solid #001219',
                    transition: (theme) =>
                        theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: (theme) => theme.spacing(2),
                    height: 63,
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer}
                    sx={{ marginLeft: -0.75 }}
                >
                    <MenuIcon sx={{ fontSize: 25 }} />
                </IconButton>
                {open && (
                    <Typography variant="h6" noWrap component="div" sx={{ marginLeft: 1, width: '90%' }}>
                        Rendez-vous
                    </Typography>
                )}
            </Box>

            <Box sx={{ overflow: "auto" }}>
            <List>
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Tooltip title={item.text} placement="right" key={index}>
                                <ListItem
                                    button
                                    component={Link}
                                    to={item.path}
                                    sx={{
                                        backgroundColor: isActive ? '#e5e5e5' : 'inherit',
                                        color: isActive ? "#001219" : 'white',
                                        height: '60px',
                                        '&:hover': {
                                            backgroundColor: '#e5e5e5',
                                            color: "#001219",
                                            '& .MuiListItemIcon-root': {
                                                color: '#001219',
                                            },
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            justifyContent: 'center',
                                            color: isActive ? "#001219" : 'white',
                                            '&:hover': {
                                                backgroundColor: isActive ? '#e5e5e5' : 'inherit',
                                            },
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    {open && <ListItemText primary={item.text} sx={{ paddingLeft: 2, paddingTop: 0, paddingBottom: 0, margin: 0 }} />}
                                </ListItem>
                            </Tooltip>
                        );
                    })}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;