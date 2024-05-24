import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Avatar,
    InputBase,
    styled,
    alpha,
    Divider,
    Button
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from 'react-router-dom';

// Search bar
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.65),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
            '&:focus': {
                width: '80ch',
            },
        },
    },
}));

interface HeaderProps {
    open: boolean;
    drawerWidth: number;
    collapsedWidth: number;
    searchQuery: string;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
    handleClose: () => void;
    anchorEl: HTMLElement | null;
    handleLogout: () => void;
    userProfileInfo: any;
    handleAddClick: () => void; // To handle buttom actions based on route
}

const Header: React.FC<HeaderProps> = ({
    open,
    drawerWidth,
    collapsedWidth,
    searchQuery,
    handleSearchChange,
    handleMenu,
    handleClose,
    anchorEl,
    handleLogout,
    userProfileInfo,
    handleAddClick,

}) => {
    const location = useLocation();
    const getTitle = (pathname: string) => {
        switch (pathname) {
            case '/':
                return 'DASHBOARD';
            case '/patient':
                return 'PATIENT';
            default:
                return '';
        }
    };
    const title = getTitle(location.pathname);

    // Estado para controlar a exibição do botão "Add Patient"
    const [showAddButton, setShowAddButton] = useState(false);

    // Efeito colateral para atualizar o estado do botão com base na localização da rota
    useEffect(() => {
        if (location.pathname === "/patient") {
            setShowAddButton(true);
        } else {
            setShowAddButton(false);
        }
    }, [location.pathname]); // Execute o efeito sempre que a localização da rota mudar

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                marginLeft: open ? drawerWidth : collapsedWidth,
                width: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`,
                backgroundColor: 'rgba(229, 229, 229, 0.7)',
                color: '#001219',
                boxShadow: 'none',
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    {title}
                </Typography>
                {showAddButton && (
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={handleAddClick}
                        sx={{
                            marginLeft: 4,
                            background: 'white',
                            color: '#000', //black
                            '&:hover': {
                                backgroundColor: '#1976d2',
                                color: '#fff',
                            },
                        }}
                        style={{ textTransform: 'none' }}
                        size="small"
                        startIcon={<AddIcon />}
                    >
                        New
                    </Button>
                )}

                <Box sx={{ display: "flex", alignItems: "center", marginLeft: 'auto' }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </Search>
                    <IconButton color="inherit" sx={{ ml: 2, fontSize: 35 }}>
                        <NotificationsIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton edge="end" color="inherit" onClick={handleMenu} sx={{ ml: 2, fontSize: 35 }}>
                        <AccountCircle fontSize="inherit" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{ sx: { mt: 1, width: 350 } }}
                    >
                        <Box sx={{ padding: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ marginRight: 2, width: 56, height: 56, fontSize: 24 }}>
                                    {userProfileInfo ? userProfileInfo.firstName.charAt(0) : ''}
                                </Avatar>
                                <Box>
                                    <Typography variant="body1">
                                        {userProfileInfo ? `${userProfileInfo.firstName} ${userProfileInfo.lastName}` : 'Loading...'}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        @{userProfileInfo ? userProfileInfo.username : ''}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {userProfileInfo ? userProfileInfo.role : ''}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Divider />
                        <MenuItem onClick={handleClose} sx={{ py: 2, px: 2 }}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose} sx={{ py: 2, px: 2 }}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogout} sx={{ py: 2, px: 2 }}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Header;
