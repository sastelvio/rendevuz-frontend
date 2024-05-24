import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Typography,
    Toolbar,
    CssBaseline,
    Card,
    Grid,
    CardContent,
    Fab,
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
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

const drawerWidth = 240;
const collapsedWidth = 73;


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

//table
function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const Patient = () => {
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
        // Adicione aqui a lógica para a ação de adicionar um paciente
        console.log("Add Patient clicked!");
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
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                        <Grid container spacing={0}>
                            {/*TABLE CONTAINER*/}
                            <Grid item xs={12}>
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
                                                        width: '98%',
                                                        height: '65px', // Ajuste a altura conforme necessário
                                                    }}
                                                >
                                                </Box>
                                                <CardContent sx={{ marginTop: 10 }}> {/* Espaço para acomodar o efeito de flutuação */}
                                                    <TableContainer component={Paper}>
                                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Dessert (100g serving)</TableCell>
                                                                    <TableCell align="right">Calories</TableCell>
                                                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {rows.map((row) => (
                                                                    <TableRow
                                                                        key={row.name}
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell component="th" scope="row">
                                                                            {row.name}
                                                                        </TableCell>
                                                                        <TableCell align="right">{row.calories}</TableCell>
                                                                        <TableCell align="right">{row.fat}</TableCell>
                                                                        <TableCell align="right">{row.carbs}</TableCell>
                                                                        <TableCell align="right">{row.protein}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </Box>
                                </CSSTransition>
                            </Grid>
                        </Grid>
                    </Box>

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

export default Patient;