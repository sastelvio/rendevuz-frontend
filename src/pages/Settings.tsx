import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { Avatar, Box, Card, CardContent, CssBaseline, Fab, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { logout } from '../slices/authSlice';
import { AppDispatch } from '../store';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { green, red, blue, orange, pink } from '@mui/material/colors';
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import KeyIcon from '@mui/icons-material/VpnKey';


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


const Settings = () => {
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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));

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
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center', // Alinha os itens horizontalmente ao centro
                            width: '100%',
                        }}
                    >
                        <Grid container spacing={2} justifyContent="center" sx={{ paddingRight: 2, }}>
                            {/*CARD 1*/}
                            <Grid item xs={12} container justifyContent="center">
                                <Card
                                    sx={{
                                        paddingTop: 4,
                                        paddingBottom: 5,
                                        paddingLeft: 1,
                                        backgroundColor: '#1976d2',
                                        height: 300,
                                        width: '100%',
                                    }}
                                >
                                </Card>
                            </Grid>
                            {/*CARD 2: CONTENT*/}
                            <Grid item xs={12} container justifyContent="center">
                                <Card
                                    sx={{
                                        backgroundColor: 'white',
                                        width: '96%', // Define a largura do Card 2
                                        position: 'relative',
                                        top: '-90px', // Move o Card 2 para cima
                                        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.6)',
                                        borderRadius: 3
                                    }}
                                >
                                    <CardContent sx={{ marginTop: 0 }}>
                                        <Grid container spacing={2} >
                                            {/**LINHA 1 */}
                                            <Grid item xs={12} container justifyContent="center">
                                                <Card sx={{ width: '100%', backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                    <CardContent sx={{ marginTop: 0 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar sx={{ marginRight: 2, width: 70, height: 70, fontSize: 20 }}>
                                                                {userProfileInfo ? `${userProfileInfo.firstName.charAt(0)} ${userProfileInfo.lastName.charAt(0)}` : 'Loading...'}
                                                            </Avatar>
                                                            <Box>
                                                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                                    {userProfileInfo ? `${userProfileInfo.firstName} ${userProfileInfo.lastName}` : 'Loading...'}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary">
                                                                    @{userProfileInfo ? userProfileInfo.username : 'Loading...'}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary">
                                                                    {userProfileInfo ? userProfileInfo.role : 'Loading...'}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            {/**LINHA 2 */}
                                            <Grid item xs={4} container justifyContent="center">
                                                <Card sx={{ width: '100%', backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                    <CardContent sx={{ marginTop: 0 }}>
                                                        <Box sx={{ width: '100%', }}>
                                                            <Stack spacing={2} >
                                                                <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                                        Profile Information
                                                                    </Typography>
                                                                </Item>
                                                                <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                                    <Typography variant="subtitle2">
                                                                        Hi, Decisions: If you can’t decide, the answer is no. If two equally difficult paths,
                                                                        choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
                                                                    </Typography>
                                                                </Item>
                                                                <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                                    <Typography variant="subtitle2">
                                                                        <span style={{ fontWeight: 'bold' }}>Full Name:</span> Full Name of the User
                                                                    </Typography>
                                                                </Item>
                                                                <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                                    <Typography variant="subtitle2">
                                                                        <span style={{ fontWeight: 'bold' }}>Mobile:</span> (xx) xxx xxxx xxx
                                                                    </Typography>
                                                                </Item>
                                                                <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                                    <Typography variant="subtitle2">
                                                                        <span style={{ fontWeight: 'bold' }}>Email:</span> user@mail.com
                                                                    </Typography>
                                                                </Item>
                                                                <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                                    <Typography variant="subtitle2">
                                                                        <span style={{ fontWeight: 'bold' }}>Location:</span> City, Country
                                                                    </Typography>
                                                                </Item>
                                                                <Item
                                                                    sx={{
                                                                        backgroundColor: 'transparent',
                                                                        boxShadow: 'none',
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="subtitle2"
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'left',
                                                                        }}
                                                                    >
                                                                        <span style={{ fontWeight: 'bold' }}>Social Media:</span>
                                                                        <IconButton color="inherit" sx={{ fontSize: 15 }}>
                                                                            <LinkedInIcon fontSize="medium" />
                                                                        </IconButton>
                                                                        <IconButton color="inherit" sx={{ fontSize: 15 }}>
                                                                            <FacebookIcon fontSize="medium" />
                                                                        </IconButton>
                                                                        <IconButton color="inherit" sx={{ fontSize: 15 }}>
                                                                            <XIcon fontSize="small" />
                                                                        </IconButton>
                                                                        <IconButton color="inherit" sx={{ fontSize: 15 }}>
                                                                            <InstagramIcon fontSize="medium" />
                                                                        </IconButton>
                                                                    </Typography>
                                                                </Item>
                                                            </Stack>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={4} container justifyContent="center">
                                                <Card sx={{ width: '100%', backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                    <CardContent sx={{ marginTop: 0 }}>
                                                        <Box sx={{ width: '100%', }}>
                                                            <Stack spacing={2} >
                                                                <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                                        Platform Settings
                                                                    </Typography>
                                                                </Item>
                                                                <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                                    <Typography variant="subtitle1">
                                                                        ACCOUNT
                                                                    </Typography>
                                                                </Item>
                                                                <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                                    <FormGroup>
                                                                        <FormControlLabel control={<Switch />} label="Email me when someone follows me" />
                                                                        <FormControlLabel control={<Switch />} label="Email me when someone answers on my post" />
                                                                        <FormControlLabel control={<Switch />} label="Email me when someone mentions me" />
                                                                    </FormGroup>
                                                                </Item>
                                                                <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                                    <Typography variant="subtitle1">
                                                                        APPLICATION
                                                                    </Typography>
                                                                </Item>
                                                                <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                                    <FormGroup>
                                                                        <FormControlLabel control={<Switch />} label="New launches and projects" />
                                                                        <FormControlLabel control={<Switch />} label="Monthly product updates" />
                                                                        <FormControlLabel control={<Switch />} label="Subscribe to newsletter" />
                                                                    </FormGroup>
                                                                </Item>

                                                            </Stack>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={4} container justifyContent="center">
                                                <Card sx={{ width: '100%', backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                    <CardContent sx={{ marginTop: 0 }}>
                                                        <Box sx={{ width: '100%', }}>
                                                            <Stack spacing={2} >
                                                                <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                                        Timeline
                                                                    </Typography>
                                                                </Item>
                                                                <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', }}>
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
                                                                                <TimelineContent sx={{ py: '10px', px: 2 }}>
                                                                                    <Typography
                                                                                        variant="body2"
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
                                                                </Item>
                                                            </Stack>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
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
        </Box>
    );
};

export default Settings;
