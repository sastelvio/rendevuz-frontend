import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Button,
    Typography,
    Divider,
    Paper,
    Drawer,
    AppBar,
    Toolbar,
    IconButton,
    CssBaseline,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
    Menu,
    MenuItem,
    Avatar,
    Tooltip,
    Card,
    Grid,
    CardContent,
    InputBase,
    styled,
    alpha,
    Fab
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { Link as MuiLink } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import BarChartComponent from "../components/chart/BarChartComponent";
import LineChartComponent from "../components/chart/LineChartComponent";
import StackedAreaChartComponent from "../components/chart/StackedAreaChartComponent";
import SearchIcon from '@mui/icons-material/Search';
import { css, keyframes } from '@emotion/react';
import { CSSTransition } from 'react-transition-group';
import { green, red, blue, orange, pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import KeyIcon from '@mui/icons-material/VpnKey';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const drawerWidth = 240;
const collapsedWidth = 64;

//Search bar
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
        // vertical padding + font size from searchIcon
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

// to the timeline card
const items = [
    { icon: <NotificationsIcon sx={{ color: 'white' }} />, text: "$2400, Design changes", date: "22 DEC 7:20 PM", backgroundColor: green[500] },
    { icon: <ShoppingCartIcon sx={{ color: 'white' }} />, text: "New order #1832412", date: "21 DEC 11 PM", backgroundColor: red[500] },
    { icon: <PaymentIcon sx={{ color: 'white' }} />, text: "Server payments for April", date: "21 DEC 9:34 PM", backgroundColor: blue[500] },
    { icon: <CreditCardIcon sx={{ color: 'white' }} />, text: "New card added for order #4395133", date: "20 DEC 2:20 AM", backgroundColor: orange[500] },
    { icon: <KeyIcon sx={{ color: 'white' }} />, text: "New card added for order #4395133", date: "18 DEC 4:54 AM", backgroundColor: pink[500] }
];

// to fadein animation
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const animationStyles = css`
  &.slide-enter {
    opacity: 0;
    transform: translateY(40px);
  }
  &.slide-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 500ms, transform 500ms;
  }
  &.slide-exit {
    opacity: 1;
    transform: translateY(0);
  }
  &.slide-exit-active {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 500ms, transform 500ms;
  }
`;



//to stacked chart
const legendData = ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'];

const data: echarts.LineSeriesOption[] = [ // Definindo o tipo de dados corretamente
    {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
            focus: 'series',
        },
        data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
            focus: 'series',
        },
        data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
            focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
            focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        label: {
            show: true,
            position: 'top'
        },
        areaStyle: {},
        emphasis: {
            focus: 'series'
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
    },
    // Adicionar outras séries conforme necessário
];


const Home = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const userProfileInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(true);
    const [fabVisible, setFabVisible] = useState(false);

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            navigate("/login");
        } catch (e) {
            console.error(e);
        }
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const [show, setShow] = useState(false);

    const [showFab, setShowFab] = useState(false);

    const scrollableBoxRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollableBoxRef.current) {
            setShowFab(scrollableBoxRef.current.scrollTop > 0);
        }
    };

    const scrollToTop = () => {
        if (scrollableBoxRef.current) {
            scrollableBoxRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        setShow(true);
        const box = scrollableBoxRef.current;
        if (box) {
            box.addEventListener('scroll', handleScroll);
            return () => {
                box.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);


    return (
        <Box sx={{ display: "flex", width: '100%', height: '100vh', overflow: 'hidden' }}>
            <CssBaseline />
            {/** MENU LATERAL ESQUERDO */}
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
                        sx={{ marginLeft: -0.75, }}
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
                        <Tooltip title="Home" placement="right">
                            <ListItem button
                                sx={{
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
                                        color: 'white'
                                    }}
                                >
                                    <HomeIcon fontSize="medium" />
                                </ListItemIcon>
                                {open && <ListItemText primary="Home" sx={{ paddingLeft: 2, paddingTop: 0, paddingBottom: 0, margin: 0 }} />}
                            </ListItem>
                        </Tooltip>
                        <Tooltip title="Patient" placement="right">
                            <ListItem button
                                onClick={handleLogout}
                                sx={{
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
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#e5e5e5',
                                        },
                                    }}
                                >
                                    <LogoutIcon fontSize="medium" />
                                </ListItemIcon>
                                {open && <ListItemText primary="Logout" sx={{ paddingLeft: 2, paddingTop: 0, paddingBottom: 0, margin: 0 }} />}
                            </ListItem>
                        </Tooltip>
                    </List>
                </Box>
            </Drawer>

            {/** ESPAÇO PARA O CONTEUDO */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowX: 'hidden', backgroundColor: '#e5e5e5', width: '100%', height: '100%', }}>
                {/*Cabecalho */}
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
                            Dashboard
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: 'auto'
                            }}
                        >
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
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleMenu}
                                sx={{ ml: 2, fontSize: 35 }}
                            >
                                <AccountCircle fontSize="inherit" />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                PaperProps={{
                                    sx: {
                                        mt: 1,
                                        width: 350,
                                    }
                                }}
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

                {/* Container principal */}
                <Box
                    sx={{ flexGrow: 1, overflowY: 'auto', width: '98%', marginLeft: 3, marginRight: 3, marginTop: 0, marginBottom: 0, }}
                    ref={scrollableBoxRef}
                >
                    <Toolbar />
                    {/* Primeira linha contendo 4 cards alinhados horizontalmente */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                        <Grid container spacing={0}>
                            {/*CARD 1*/}
                            <Grid item xs={3}>
                                <CSSTransition in={show} timeout={500} classNames="slide" unmountOnExit>
                                    <Box
                                        sx={{
                                            animation: `${slideUp} 1s ease-out`
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                paddingTop: 4,
                                                paddingRight: 3,
                                                paddingBottom: 5,
                                                paddingLeft: 1,
                                                backgroundColor: 'transparent',
                                                boxShadow: 'none'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    paddingTop: 1,
                                                    backgroundColor: 'white',
                                                    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.6)',
                                                    borderRadius: 2,
                                                }}
                                            >
                                                <CardContent>
                                                    <Box
                                                        sx={{
                                                            backgroundColor: '#fb8500',
                                                            padding: 2,
                                                            boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
                                                            borderRadius: 1,
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            position: 'absolute',
                                                            top: -30,
                                                            left: 20
                                                        }}
                                                    >
                                                        <VisibilityIcon fontSize="large" sx={{ color: 'white', }} />
                                                    </Box>
                                                    <Typography variant="body2" gutterBottom sx={{ width: '100%', textAlign: 'right', }}>
                                                        Website Views
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ width: '100%', fontWeight: 'bold', textAlign: 'right', paddingBottom: 2, }}>
                                                        281
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ width: '100%', textAlign: 'left', }}>
                                                        +55% than last period
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </Box>
                                </CSSTransition>
                            </Grid>

                            {/*CARD 2*/}
                            <Grid item xs={3}>
                                <CSSTransition in={show} timeout={500} classNames="slide" unmountOnExit>
                                    <Box
                                        sx={{
                                            animation: `${slideUp} 1s ease-out`
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                paddingTop: 4,
                                                paddingRight: 3,
                                                paddingBottom: 5,
                                                paddingLeft: 1,
                                                backgroundColor: 'transparent',
                                                boxShadow: 'none'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    paddingTop: 1,
                                                    backgroundColor: 'white',
                                                    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.6)',
                                                    borderRadius: 2,
                                                }}
                                            >
                                                <CardContent>
                                                    <Box
                                                        sx={{
                                                            backgroundColor: '#1976d2',
                                                            padding: 2,
                                                            boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
                                                            borderRadius: 1,
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            position: 'absolute',
                                                            top: -30,
                                                            left: 20
                                                        }}
                                                    >
                                                        <MonetizationOnIcon fontSize="large" sx={{ color: 'white', }} />
                                                    </Box>
                                                    <Typography variant="body2" gutterBottom sx={{ width: '100%', textAlign: 'right' }}>
                                                        Daily Sales
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ width: '100%', fontWeight: 'bold', textAlign: 'right', paddingBottom: 2, }}>
                                                        $2.300
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ width: '100%', textAlign: 'left' }}>
                                                        +5% than last period
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </Box>
                                </CSSTransition>
                            </Grid>

                            {/*CARD 3*/}
                            <Grid item xs={3}>
                                <CSSTransition in={show} timeout={500} classNames="slide" unmountOnExit>
                                    <Box
                                        sx={{
                                            animation: `${slideUp} 1s ease-out`
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                paddingTop: 4,
                                                paddingRight: 3,
                                                paddingBottom: 5,
                                                paddingLeft: 1,
                                                backgroundColor: 'transparent',
                                                boxShadow: 'none'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    paddingTop: 1,
                                                    backgroundColor: 'white',
                                                    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.6)',
                                                    borderRadius: 2,
                                                }}
                                            >
                                                <CardContent>
                                                    <Box
                                                        sx={{
                                                            backgroundColor: '#5eb562',
                                                            padding: 2,
                                                            boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
                                                            borderRadius: 1,
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            position: 'absolute',
                                                            top: -30,
                                                            left: 20
                                                        }}
                                                    >
                                                        <AssignmentTurnedInIcon fontSize="large" sx={{ color: 'white', }} />
                                                    </Box>
                                                    <Typography variant="body2" gutterBottom sx={{ width: '100%', textAlign: 'right' }}>
                                                        Completed Tasks
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ width: '100%', fontWeight: 'bold', textAlign: 'right', paddingBottom: 2, }}>
                                                        34k
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ width: '100%', textAlign: 'left' }}>
                                                        +4% than last period
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </Box>
                                </CSSTransition>
                            </Grid>


                            {/*CARD 4*/}
                            <Grid item xs={3}>
                                <CSSTransition in={show} timeout={500} classNames="slide" unmountOnExit>
                                    <Box
                                        sx={{
                                            animation: `${slideUp} 1s ease-out`
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                paddingTop: 4,
                                                paddingRight: 3,
                                                paddingBottom: 5,
                                                paddingLeft: 1,
                                                backgroundColor: 'transparent',
                                                boxShadow: 'none'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    paddingTop: 1,
                                                    backgroundColor: 'white',
                                                    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.6)',
                                                    borderRadius: 2,
                                                }}
                                            >
                                                <CardContent>
                                                    <Box
                                                        sx={{
                                                            backgroundColor: '#e73774',
                                                            padding: 2,
                                                            boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
                                                            borderRadius: 1,
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            position: 'absolute',
                                                            top: -30,
                                                            left: 20
                                                        }}
                                                    >
                                                        <AssignmentIcon fontSize="large" sx={{ color: 'white', }} />
                                                    </Box>
                                                    <Typography variant="body2" gutterBottom sx={{ width: '100%', textAlign: 'right' }}>
                                                        Orders Overview
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ width: '100%', fontWeight: 'bold', textAlign: 'right', paddingBottom: 2, }}>
                                                        #1033417
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ width: '100%', textAlign: 'left' }}>
                                                        +9% than last period
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </Box>
                                </CSSTransition>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Segunda linha contendo 3 cards alinhados horizontalmente */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                        <Grid container spacing={0}>
                            {/*CARD 1*/}
                            <Grid item xs={4}>
                                <CSSTransition in={show} timeout={500} classNames="slide" unmountOnExit>
                                    <Box
                                        sx={{
                                            animation: `${slideUp} 2s ease-out`
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                paddingTop: 4,
                                                paddingRight: 3,
                                                paddingBottom: 5,
                                                paddingLeft: 1,
                                                backgroundColor: 'transparent',
                                                boxShadow: 'none',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    paddingTop: 3,
                                                    backgroundColor: 'white',
                                                    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.6)',
                                                    borderRadius: 2,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundColor: '#1976d2',
                                                        padding: 0,
                                                        paddingLeft: 2,
                                                        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
                                                        borderRadius: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        position: 'absolute',
                                                        top: -30, // Mover para cima para criar efeito de flutuação
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        width: '94%',
                                                        height: '220px', // Ajuste a altura conforme necessário
                                                    }}
                                                >
                                                    <BarChartComponent />
                                                </Box>
                                                <CardContent sx={{ marginTop: 20 }}> {/* Espaço para acomodar o efeito de flutuação */}
                                                    <Typography variant="body1" gutterBottom sx={{ width: '100%', textAlign: 'left', paddingTop: 2, fontWeight: 'bold' }}>
                                                        Website Views
                                                    </Typography>
                                                    <Typography variant="subtitle2" sx={{ width: '100%', textAlign: 'left', paddingBottom: 2 }}>
                                                        Last Campaign Performance
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            width: '100%', textAlign: 'left',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            lineHeight: '20px',
                                                        }}
                                                    >
                                                        <AccessTimeOutlinedIcon fontSize="inherit" sx={{ marginRight: 0.5 }} />
                                                        Campaign sent 2 days ago
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </Box>
                                </CSSTransition>
                            </Grid>

                            {/*CARD 2*/}
                            <Grid item xs={4}>
                                <CSSTransition in={show} timeout={500} classNames="slide" unmountOnExit>
                                    <Box
                                        sx={{
                                            animation: `${slideUp} 2s ease-out`
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                paddingTop: 4,
                                                paddingRight: 3,
                                                paddingBottom: 5,
                                                paddingLeft: 1,
                                                backgroundColor: 'transparent',
                                                boxShadow: 'none',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    paddingTop: 3,
                                                    backgroundColor: 'white',
                                                    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.6)',
                                                    borderRadius: 2,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundColor: '#5eb562',
                                                        padding: 0,
                                                        paddingLeft: 2,
                                                        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
                                                        borderRadius: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        position: 'absolute',
                                                        top: -30, // Mover para cima para criar efeito de flutuação
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        width: '94%',
                                                        height: '220px', // Ajuste a altura conforme necessário
                                                    }}
                                                >
                                                    <LineChartComponent />
                                                </Box>
                                                <CardContent sx={{ marginTop: 20 }}> {/* Espaço para acomodar o efeito de flutuação */}
                                                    <Typography variant="body1" gutterBottom sx={{ width: '100%', textAlign: 'left', paddingTop: 3, fontWeight: 'bold' }}>
                                                        Daily Sales
                                                    </Typography>
                                                    <Typography variant="subtitle2" sx={{ width: '100%', textAlign: 'left', paddingBottom: 2 }}>
                                                        (+15%) increase in today sales.
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            width: '100%', textAlign: 'left',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            lineHeight: '20px',
                                                        }}
                                                    >
                                                        <AccessTimeOutlinedIcon fontSize="inherit" sx={{ marginRight: 0.5 }} />
                                                        Updated 4 min ago
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </Box>
                                </CSSTransition>
                            </Grid>

                            {/*CARD 3*/}
                            <Grid item xs={4}>
                                <CSSTransition in={show} timeout={500} classNames="slide" unmountOnExit>
                                    <Box
                                        sx={{
                                            animation: `${slideUp} 2s ease-out`
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                paddingTop: 4,
                                                paddingRight: 3,
                                                paddingBottom: 5,
                                                paddingLeft: 1,
                                                backgroundColor: 'transparent',
                                                boxShadow: 'none',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    paddingTop: 3,
                                                    backgroundColor: 'white',
                                                    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.6)',
                                                    borderRadius: 2,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundColor: '#001219',
                                                        paddingTop: 2,
                                                        paddingLeft: 2,
                                                        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
                                                        borderRadius: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        position: 'absolute',
                                                        top: -30, // Mover para cima para criar efeito de flutuação
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        width: '94%',
                                                        height: '220px', // Ajuste a altura conforme necessário
                                                    }}
                                                >
                                                    <StackedAreaChartComponent legendData={legendData} data={data} />
                                                </Box>
                                                <CardContent sx={{ marginTop: 20 }}> {/* Espaço para acomodar o efeito de flutuação */}
                                                    <Typography variant="body1" gutterBottom sx={{ width: '100%', textAlign: 'left', paddingTop: 3, fontWeight: 'bold' }}>
                                                        Campaigns
                                                    </Typography>
                                                    <Typography variant="subtitle2" sx={{ width: '100%', textAlign: 'left', paddingBottom: 2 }}>
                                                        Last Campaign Performance
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            width: '100%', textAlign: 'left',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            lineHeight: '20px',
                                                        }}
                                                    >
                                                        <AccessTimeOutlinedIcon fontSize="inherit" sx={{ marginRight: 0.5 }} />
                                                        Just updated
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </Box>
                                </CSSTransition>
                            </Grid>
                        </Grid >
                    </Box >

                    {/* Terceira linha contendo 2 cards alinhados horizontalmente */}
                    < Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                        <Grid container spacing={0}>
                            {/*CARD 1*/}
                            <Grid item xs={8}>
                                <CSSTransition in={show} timeout={500} classNames="slide" unmountOnExit>
                                    <Box
                                        sx={{
                                            animation: `${slideUp} 3s ease-out`
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                paddingTop: 0,
                                                paddingRight: 3,
                                                paddingBottom: 5,
                                                paddingLeft: 1,
                                                backgroundColor: 'transparent',
                                                boxShadow: 'none',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    paddingTop: 3,
                                                    backgroundColor: 'white',
                                                    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.6)',
                                                    borderRadius: 2,
                                                }}
                                            >
                                                <CardContent sx={{ marginTop: 0 }}>
                                                    <Typography variant="body1" gutterBottom sx={{ width: '100%', textAlign: 'left', paddingTop: 3, fontWeight: 'bold' }}>
                                                        World Usage Density
                                                    </Typography>
                                                    <Typography variant="subtitle2" sx={{ width: '100%', textAlign: 'left', paddingBottom: 2 }}>
                                                        By Continent
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            width: '100%', textAlign: 'left',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            lineHeight: '20px',
                                                        }}
                                                    >
                                                        <AccessTimeOutlinedIcon fontSize="inherit" sx={{ marginRight: 0.5 }} />
                                                        Data updated recently
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </Box>
                                </CSSTransition>
                            </Grid>

                            {/*CARD 2*/}
                            <Grid item xs={4}>
                                <CSSTransition in={show} timeout={500} classNames="slide" unmountOnExit>
                                    <Box
                                        sx={{
                                            animation: `${slideUp} 3s ease-out`
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                paddingTop: 0,
                                                paddingRight: 3,
                                                paddingBottom: 5,
                                                paddingLeft: 1,
                                                backgroundColor: 'transparent',
                                                boxShadow: 'none',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    paddingTop: 0,
                                                    backgroundColor: 'white',
                                                    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.6)',
                                                    borderRadius: 2,
                                                }}
                                            >
                                                <CardContent sx={{ marginTop: 0 }}> {/* Espaço para acomodar o efeito de flutuação */}
                                                    <Typography variant="body1" gutterBottom sx={{ width: '100%', textAlign: 'left', paddingTop: 3, fontWeight: 'bold' }}>
                                                        Orders overview
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: green[500], display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ marginRight: 8 }}>▲</span> 24% this month
                                                    </Typography>
                                                    <Box sx={{ marginTop: 2, textAlign: 'left' }}>
                                                        <Timeline
                                                            sx={{
                                                                [`& .${timelineItemClasses.root}:before`]: {
                                                                    flex: 0,
                                                                    padding: 0,
                                                                },
                                                            }}
                                                        >
                                                            {items.map((item, index) => (
                                                                <TimelineItem key={index}>
                                                                    <TimelineSeparator>
                                                                        <TimelineDot sx={{ backgroundColor: item.backgroundColor }}>
                                                                            {item.icon}
                                                                        </TimelineDot>
                                                                        {index < items.length - 1 && <TimelineConnector />}
                                                                    </TimelineSeparator>
                                                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                                        <Typography
                                                                            variant="body1"
                                                                            gutterBottom
                                                                            sx={{
                                                                                width: '100%',
                                                                                textAlign: 'left',
                                                                                fontWeight: 'bold'
                                                                            }}
                                                                        >
                                                                            {item.text}
                                                                        </Typography>
                                                                        <Typography
                                                                            sx={{ m: 'auto 0' }}
                                                                            align="left"
                                                                            variant="caption"
                                                                            color="text.secondary"
                                                                        >
                                                                            {item.date}
                                                                        </Typography>
                                                                    </TimelineContent>
                                                                </TimelineItem>
                                                            ))}
                                                        </Timeline>
                                                    </Box>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </Box>
                                </CSSTransition>
                            </Grid>
                        </Grid >
                    </Box >

                    {/* Rodapé */}
                    < AppBar
                        position="static"
                        sx={{
                            top: 'auto',
                            bottom: 0,
                            marginTop: 4,
                            marginLeft: 0,
                            width: '100%',
                            backgroundColor: '#e5e5e5',
                            color: '#001219',
                            boxShadow: 'none',
                        }}
                    >
                        <Toolbar>
                            <Typography variant="body2" align="left" sx={{ flexGrow: 1, marginLeft: 0, }}>
                                © 2024 | made by {' '}
                                <MuiLink href="https://sastelvio.com" target="_blank" rel="noopener noreferrer">
                                    Sastelvio MANUEL
                                </MuiLink>
                            </Typography>
                            <Typography variant="body2" align="right" sx={{ flexGrow: 1, marginRight: 3 }}>
                                About Us | Blog | License
                            </Typography>
                        </Toolbar>
                    </AppBar >
                </Box >

                <Fab
                    color="primary"
                    aria-label="up"
                    sx={{
                        position: 'fixed',
                        bottom: 50,
                        right: 50,
                        transition: 'opacity 0.3s',
                        opacity: showFab ? 1 : 0,
                        pointerEvents: showFab ? 'auto' : 'none'
                    }}
                    onClick={scrollToTop}
                >
                    <KeyboardArrowUpIcon />
                </Fab>

            </Box >
        </Box >
    );
};

export default Home;
