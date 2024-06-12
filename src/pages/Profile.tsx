import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { Avatar, Box, Button, Card, CardContent, CssBaseline, Fab, Grid, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getUser, logout } from '../slices/authSlice';
import { AppDispatch, RootState } from '../store';
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
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { User, UserProfileData } from '../slices/types';

import '../layouts/style/General.css'

import { update } from '../slices/authSlice';
import { useSelector } from 'react-redux';

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

const defaultUserProfileInfo: UserProfileData = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    about: '',
    location: '',
    link_linkedin: '',
    link_facebook: '',
    link_twitter: '',
    link_instagram: '',
    role: ''
};




const Profile = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const userProfile = useSelector((state: RootState) => state.auth.userProfileData);
    const userId = useSelector((state: RootState) => state.auth.basicUserInfo?.id);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const navigate = useNavigate();
    const userProfileInfo = useAppSelector((state) => state.auth.userProfileData) || defaultUserProfileInfo;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(true);

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

    const [isEditMode, setIsEditMode] = useState(false);
    const [editedUserInfo, setEditedUserInfo] = useState<UserProfileData>(defaultUserProfileInfo);


    const enterEditMode = () => {
        setIsEditMode(true);
    };

    useEffect(() => {
        setEditedUserInfo(userProfileInfo);
    }, [userProfileInfo]);

    const exitEditMode = () => {
        setIsEditMode(false);
        //setEditedUserInfo(userProfileInfo);
        setEditedUserInfo(userProfile || defaultUserProfileInfo);
    };

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }, []);


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        ; if (editedUserInfo && userId) {
            const updatedUser: User = {
                id: userId,
                ...editedUserInfo
            };
            await dispatch(update(updatedUser));
            exitEditMode();
            dispatch(getUser());
        }
    };

    const handleLinkedInClick = (user: string) => {
        window.open(`https://www.linkedin.com/in/${user}`, '_blank', 'noopener,noreferrer');
    };

    const handleFacebookClick = (user: string) => {
        window.open(`https://www.facebook.com/${user}`, '_blank', 'noopener,noreferrer');
    };

    const handleTwitterClick = (user: string) => {
        window.open(`https://www.x.com/${user}`, '_blank', 'noopener,noreferrer');
    };

    const handleInstagramClick = (user: string) => {
        window.open(`https://www.instagram.com/${user}`, '_blank', 'noopener,noreferrer');
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
                    isAddDisabled={() => true}
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
                            <Grid item xs={12} sm={12} container justifyContent="center">
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
                            <Grid item xs={12} sm={12} container justifyContent="center">
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
                                            <Grid item xs={12} sm={12} container justifyContent="center">
                                                <Card sx={{ width: '100%', backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                    <CardContent sx={{ marginTop: 0 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar sx={{ marginRight: 2, width: 90, height: 90, fontSize: 20 }}>
                                                                {userProfileInfo ? `${userProfileInfo.firstName.charAt(0)} ${userProfileInfo.lastName.charAt(0)}` : 'Loading...'}
                                                            </Avatar>
                                                            <Box>
                                                                {isEditMode ? (
                                                                    <>
                                                                        <Grid container spacing={2} >
                                                                            <Grid item xs={6} sm={6} container justifyContent="center">
                                                                                <TextField
                                                                                    name="firstName"
                                                                                    label="First Name"
                                                                                    size="small"
                                                                                    required
                                                                                    value={editedUserInfo?.firstName}
                                                                                    onChange={handleChange}
                                                                                />
                                                                            </Grid>
                                                                            <Grid item xs={6} sm={6} container justifyContent="center">
                                                                                <TextField
                                                                                    name="lastName"
                                                                                    label="Last Name"
                                                                                    size="small"
                                                                                    required
                                                                                    value={editedUserInfo?.lastName}
                                                                                    onChange={handleChange}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </>
                                                                ) : (
                                                                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                                                        <>
                                                                            <span style={{ fontWeight: 'bold', fontSize: 25 }}>
                                                                                {userProfileInfo ? `${userProfileInfo.firstName} ${userProfileInfo.lastName}` : 'Loading...'}
                                                                            </span>
                                                                            <IconButton color="inherit" size="small" sx={{ marginLeft: 1 }} onClick={enterEditMode}>
                                                                                <EditIcon fontSize="small" />
                                                                            </IconButton>
                                                                        </>
                                                                    </Typography>
                                                                )}

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
                                            <Grid item xs={12} sm={4} container justifyContent="center">
                                                <Card sx={{ width: '100%', backgroundColor: 'transparent', boxShadow: 'none', }}>
                                                    <CardContent sx={{ marginTop: 0 }}>
                                                        <Box sx={{ width: '100%', }}>
                                                            <Grid container spacing={2} >
                                                                <Grid item xs={12} sm={12} container justifyContent="left">
                                                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                                        Profile Information
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} container justifyContent="left">
                                                                    {isEditMode ? (
                                                                        <TextField
                                                                            key="about"
                                                                            fullWidth
                                                                            multiline
                                                                            size="small"
                                                                            rows={3}
                                                                            name="about"
                                                                            label="About"
                                                                            value={editedUserInfo?.about}
                                                                            onChange={handleChange}
                                                                        />
                                                                    ) : (
                                                                        <TextField
                                                                            fullWidth
                                                                            multiline
                                                                            size="small"
                                                                            rows={3}
                                                                            name="about"
                                                                            value={editedUserInfo?.about}
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                                sx: {
                                                                                    border: 'none',
                                                                                },
                                                                            }}
                                                                            InputLabelProps={{
                                                                                sx: {
                                                                                    border: 'none',
                                                                                },
                                                                            }}
                                                                            variant="outlined"
                                                                            sx={{
                                                                                '& .MuiOutlinedInput-notchedOutline': {
                                                                                    border: 'none',
                                                                                },
                                                                                '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: 'transparent',
                                                                                },
                                                                                marginBottom: 2,
                                                                            }}
                                                                        />


                                                                    )}
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} container justifyContent="left">
                                                                    {isEditMode ? (
                                                                        <TextField
                                                                            key="phone"
                                                                            fullWidth
                                                                            name="phone"
                                                                            label="Phone"
                                                                            size="small"
                                                                            value={editedUserInfo?.phone}
                                                                            onChange={handleChange}
                                                                        />
                                                                    ) : (
                                                                        <Typography variant="subtitle2" sx={{ marginBottom: 2, }}>
                                                                            <>
                                                                                <span style={{ fontWeight: 'bold' }}>Phone:</span> (xx) {userProfileInfo?.phone}
                                                                            </>
                                                                        </Typography>
                                                                    )}
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} container justifyContent="left">
                                                                    {isEditMode ? (
                                                                        <TextField
                                                                            key={'email'}
                                                                            fullWidth
                                                                            name="email"
                                                                            label="Email"
                                                                            size="small"
                                                                            required
                                                                            value={editedUserInfo?.email}
                                                                            onChange={handleChange}
                                                                        />
                                                                    ) : (
                                                                        <Typography variant="subtitle2" sx={{ marginBottom: 2, }}>
                                                                            <span style={{ fontWeight: 'bold' }}>Email:</span> {userProfileInfo?.email}
                                                                        </Typography>
                                                                    )}
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} container justifyContent="left">
                                                                    {isEditMode ? (
                                                                        <TextField
                                                                            fullWidth
                                                                            name="location"
                                                                            label="Location"
                                                                            size="small"
                                                                            value={editedUserInfo?.location}
                                                                            onChange={handleChange}
                                                                        />
                                                                    ) : (
                                                                        <Typography variant="subtitle2" sx={{ marginBottom: 2, }}>
                                                                            <span style={{ fontWeight: 'bold' }}>Location:</span> {userProfileInfo?.location}
                                                                        </Typography>
                                                                    )}
                                                                </Grid>
                                                                {isEditMode ? (
                                                                    <>
                                                                        <Grid item xs={12} sm={1} container justifyContent="center"
                                                                            sx={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'left'
                                                                            }}
                                                                        >
                                                                            <LinkedInIcon fontSize="large" />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={11} container justifyContent="center">
                                                                            <TextField
                                                                                fullWidth
                                                                                name="link_linkedin"
                                                                                label="Linkedin"
                                                                                placeholder='paulsmith'
                                                                                size="small"
                                                                                value={editedUserInfo?.link_linkedin}
                                                                                onChange={handleChange}
                                                                            />
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={12}
                                                                            sm={1}
                                                                            container
                                                                            justifyContent="center"
                                                                            sx={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'left'
                                                                            }}
                                                                        >
                                                                            <FacebookIcon fontSize="large" />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={11} container justifyContent="center">
                                                                            <TextField
                                                                                fullWidth
                                                                                name="link_facebook"
                                                                                label="Facebook"
                                                                                placeholder='paulsmith'
                                                                                size="small"
                                                                                value={editedUserInfo?.link_facebook}
                                                                                onChange={handleChange}
                                                                            />
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={12}
                                                                            sm={1}
                                                                            container
                                                                            justifyContent="center"
                                                                            sx={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'left'
                                                                            }}
                                                                        >
                                                                            <XIcon fontSize="large" />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={11} container justifyContent="center">
                                                                            <TextField
                                                                                fullWidth
                                                                                name="link_twitter"
                                                                                label="Twitter (X)"
                                                                                placeholder='@paulsmith'
                                                                                size="small"
                                                                                value={editedUserInfo?.link_twitter}
                                                                                onChange={handleChange}
                                                                            />
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={12}
                                                                            sm={1}
                                                                            container
                                                                            justifyContent="center"
                                                                            sx={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'left'
                                                                            }}
                                                                        >
                                                                            <InstagramIcon fontSize="large" />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={11} container justifyContent="center">
                                                                            <TextField
                                                                                fullWidth
                                                                                name="link_instagram"
                                                                                label="Instagram"
                                                                                placeholder='paulsmith'
                                                                                size="small"
                                                                                value={editedUserInfo?.link_instagram}
                                                                                onChange={handleChange}
                                                                            />
                                                                        </Grid>
                                                                    </>
                                                                ) : (
                                                                    <Grid item xs={12} sm={11} container justifyContent="left">
                                                                        <Typography
                                                                            variant="subtitle2"
                                                                            sx={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'left'
                                                                            }}
                                                                        >
                                                                            <span style={{ fontWeight: 'bold' }}>Social Media:</span>
                                                                            {userProfileInfo?.link_linkedin && (
                                                                                <IconButton
                                                                                    color="inherit"
                                                                                    sx={{ fontSize: 15 }}
                                                                                    onClick={() => handleLinkedInClick(userProfileInfo?.link_linkedin)}
                                                                                >
                                                                                    <LinkedInIcon fontSize="medium" />
                                                                                </IconButton>
                                                                            )}
                                                                            {userProfileInfo?.link_facebook && (
                                                                                <IconButton
                                                                                    color="inherit"
                                                                                    sx={{ fontSize: 15 }}
                                                                                    onClick={() => handleFacebookClick(userProfileInfo?.link_facebook)}
                                                                                >
                                                                                    <FacebookIcon fontSize="medium" />
                                                                                </IconButton>
                                                                            )}
                                                                            {userProfileInfo?.link_twitter && (
                                                                                <IconButton
                                                                                    color="inherit"
                                                                                    sx={{ fontSize: 15 }}
                                                                                    onClick={() => handleTwitterClick(userProfileInfo?.link_twitter)}
                                                                                >
                                                                                    <XIcon fontSize="small" />
                                                                                </IconButton>
                                                                            )}
                                                                            {userProfileInfo?.link_instagram && (
                                                                                <IconButton
                                                                                    color="inherit"
                                                                                    sx={{ fontSize: 15 }}
                                                                                    onClick={() => handleInstagramClick(userProfileInfo?.link_instagram)}
                                                                                >
                                                                                    <InstagramIcon fontSize="medium" />
                                                                                </IconButton>
                                                                            )}
                                                                        </Typography>
                                                                    </Grid>
                                                                )}
                                                            </Grid>
                                                            <Stack spacing={2} >


                                                                <Item
                                                                    sx={{
                                                                        backgroundColor: 'transparent',
                                                                        boxShadow: 'none',
                                                                    }}
                                                                >

                                                                </Item>
                                                                <Item
                                                                    sx={{
                                                                        backgroundColor: 'transparent',
                                                                        boxShadow: 'none',
                                                                        textAlign: 'right',
                                                                    }}>
                                                                    {isEditMode && (
                                                                        <>
                                                                            <Button
                                                                                variant="outlined"
                                                                                color="primary"
                                                                                sx={{
                                                                                    marginLeft: 2,
                                                                                    width: '150px'
                                                                                }}
                                                                                onClick={exitEditMode}
                                                                                startIcon={<ClearAllIcon />}
                                                                            >
                                                                                Cancel
                                                                            </Button>
                                                                            <Button
                                                                                variant="contained"
                                                                                color="success"
                                                                                sx={{
                                                                                    marginLeft: 2,
                                                                                    width: '150px'
                                                                                }}
                                                                                onClick={handleSubmit}
                                                                                endIcon={<SendIcon />}
                                                                            >
                                                                                Update
                                                                            </Button>
                                                                        </>
                                                                    )}
                                                                </Item>
                                                            </Stack>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} sm={4} container justifyContent="center">
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
                                            <Grid item xs={12} sm={4} container justifyContent="center">
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
        </Box >
    );
};

export default Profile;