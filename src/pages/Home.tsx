import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Typography,
    Toolbar,
    CssBaseline,
    Card,
    Grid,
    CardContent,
    Fab
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import BarChartComponent from "../components/chart/BarChartComponent";
import LineChartComponent from "../components/chart/LineChartComponent";
import StackedAreaChartComponent from "../components/chart/StackedAreaChartComponent";
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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { slideUp } from '../animations'
import { Link as MuiLink } from '@mui/material';

import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';


import MapComponent from "../components/map/MapComponent";

const drawerWidth = 240;
const collapsedWidth = 73;

// to the timeline card
const items = [
    { icon: <NotificationsIcon sx={{ color: 'white' }} />, text: "$2400, Design changes", date: "22 DEC 7:20 PM", backgroundColor: green[500] },
    { icon: <ShoppingCartIcon sx={{ color: 'white' }} />, text: "New order #1832412", date: "21 DEC 11 PM", backgroundColor: red[500] },
    { icon: <PaymentIcon sx={{ color: 'white' }} />, text: "Server payments for April", date: "21 DEC 9:34 PM", backgroundColor: blue[500] },
    { icon: <CreditCardIcon sx={{ color: 'white' }} />, text: "New card added for order #4395133", date: "20 DEC 2:20 AM", backgroundColor: orange[500] },
    { icon: <KeyIcon sx={{ color: 'white' }} />, text: "New card added for order #4395133", date: "18 DEC 4:54 AM", backgroundColor: pink[500] }
];


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

    // Função para lidar com o clique no botão "Add Patient"
    const handleAddClick = () => {
    };


    return (
        <Box sx={{ display: "flex", width: '100%', height: '100vh', overflow: 'hidden' }}>
            <CssBaseline />
            {/** MENU LATERAL ESQUERDO */}
            <Sidebar open={open} toggleDrawer={toggleDrawer} />

            {/** ESPAÇO PARA O CONTEUDO */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowX: 'hidden', backgroundColor: '#e5e5e5', width: '100%', height: '100%', }}>
                {/*Cabecalho */}
                <Header
                    open={open}
                    drawerWidth={drawerWidth}
                    collapsedWidth={collapsedWidth}
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    handleMenu={handleMenu}
                    handleClose={handleClose}
                    anchorEl={anchorEl}
                    handleLogout={handleLogout}
                    userProfileInfo={userProfileInfo}
                    handleAddClick={handleAddClick}
                />

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
                            <Grid item xs={12} sm={3}>
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
                            <Grid item xs={12} sm={3}>
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
                            <Grid item xs={12} sm={3}>
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
                            <Grid item xs={12} sm={3}>
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
                            <Grid item xs={12} sm={4}>
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
                            <Grid item xs={12} sm={4}>
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
                            <Grid item xs={12} sm={4}>
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
                            <Grid item xs={12} sm={8}>
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
                                                    height: '700px',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                <CardContent sx={{ position: 'relative', height: '100%', padding: 0 }}>
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            height: '100%',
                                                            zIndex: 10,
                                                            padding: 2,
                                                            background: 'none'
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body1"
                                                            gutterBottom
                                                            sx={{
                                                                width: '100%',
                                                                textAlign: 'left',
                                                                paddingTop: 3,
                                                                fontWeight: 'bold',
                                                                textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
                                                            }}
                                                        >
                                                            World Usage Density
                                                        </Typography>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{
                                                                width: '100%',
                                                                textAlign: 'left',
                                                                paddingBottom: 2,
                                                                textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
                                                            }}
                                                        >
                                                            By Continent
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            gutterBottom
                                                            sx={{
                                                                position: 'absolute',
                                                                bottom: 0,
                                                                textAlign: 'left',
                                                                paddingBottom: 3,
                                                                fontWeight: 'bold',
                                                                textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
                                                            }}
                                                        >
                                                            <AccessTimeOutlinedIcon fontSize="inherit" sx={{ marginRight: 0.5 }} />
                                                            Just updated
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            gutterBottom
                                                            sx={{
                                                                position: 'absolute',
                                                                bottom: 0,
                                                                right: 15,
                                                                textAlign: 'left',
                                                                paddingBottom: 3,
                                                                fontWeight: 'bold',
                                                                textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
                                                            }}
                                                        >
                                                            &copy;
                                                            {' '}
                                                            <MuiLink href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">
                                                                OpenStreetMap
                                                            </MuiLink>
                                                            {' '}
                                                            contributors
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            height: '100%',
                                                            width: '100%',
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            zIndex: 5,
                                                        }}
                                                    >
                                                        <MapComponent />
                                                    </Box>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </Box>
                                </CSSTransition>
                            </Grid>

                            {/*CARD 2*/}
                            <Grid item xs={12} sm={4}>
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
                                                    height: '700px'
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
                    <Footer />
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