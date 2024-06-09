import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Toolbar,
    CssBaseline,
    Card,
    Grid,
    CardContent,
    Fab,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { CSSTransition } from 'react-transition-group';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { slideUp } from '../animations'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import '../layouts/style/General.css'

import PatientForm from "./form/PatientForm";
import PatientFetch from "./fetch/PatientFetch";

const drawerWidth = 240;
const collapsedWidth = 73;

const Patient = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const navigate = useNavigate();
    const userProfileInfo = useAppSelector((state) => state.auth.basicUserInfo);


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

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };
    const toggleDrawer = () => { setOpen(!open); };
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(event.target.value); };
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

    // para lidar com scroll, activa o botao para voltar ao top
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


    //FORMULARIO   

    // Estado para manter os dados do paciente selecionado
    const [selectedPatient, setSelectedPatient] = useState<FormData | null>(null);
     
    const [boxHeight, setBoxHeight] = useState<number>(65); // Altura inicial do Container do formulario
    const [boxWidth, setBoxWidth] = useState<string>('98%'); // Cumprimento inicial do Container do formulario
    const [isExpanded, setIsExpanded] = useState<boolean>(false); // Estado para controlar se o Container do formularioestá expandida
    const [isEditing, setIsEditing] = useState<boolean>(false); // Estado para controlar se a Box está expandida

    const handleFormSubmit = () => {
        retractBox();
        setSelectedPatient(null); 
    };

    // Função para lidar com o clique no botão "Add (no Header)"
    const handleAddClick = () => {
        setIsEditing(false);
        expandBox();
    };

    // Função para editar paciente
    const handleEditPatient = (patientData: FormData) => {
        setIsEditing(true);
        setSelectedPatient(patientData);
        expandBox();
    };

    // Função para aumentar a altura e mover os elementos abaixo
    const expandBox = () => {
        setBoxHeight(500); // Aumenta a altura para 600px
        setBoxWidth('80%'); // Aumenta a cumprimento para 600px
        setIsExpanded(true); // Define o estado como expandido
    };

    // Calcula a margem superior dos elementos abaixo da Box
    const marginTop = isExpanded ? 57 : 0;

    // Função para retrair a Box ao tamanho original
    const retractBox = () => {
        setBoxHeight(65); // Retorna a altura para o valor original
        setBoxWidth('98%'); // Retorna ao cumprimento para o valor original
        setIsExpanded(false); // Define o estado como não expandido
        setSelectedPatient(null); 
    };

    const [showChildren, setShowChildren] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState<string>("#1976d2"); // Estado para controlar a cor de fundo

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let colorTimer: NodeJS.Timeout;
        if (isExpanded) {
            // Atrasar a troca de cor até que a animação de expansão esteja completa
            timer = setTimeout(() => {
                setBackgroundColor("#dee2e6"); // Nova cor de fundo
                // Atrasar a exibição dos filhos até que a troca de cor esteja completa
                colorTimer = setTimeout(() => {
                    setShowChildren(true);
                }, 500); // Tempo da transição de cor em milissegundos
            }, 500); // Tempo da animação de expansão em milissegundos
        } else {
            // Ocultar os filhos imediatamente quando a box é retraída
            setShowChildren(false);
            setBackgroundColor("#1976d2"); // Reverter cor de fundo
        }
        return () => {
            clearTimeout(timer);
            clearTimeout(colorTimer);
        };
    }, [isExpanded]);    

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
                    isAddDisabled={() => isExpanded}
                />

                {/* Container principal */}
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        width: '98%',
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 0,
                        marginBottom: 0,
                    }}
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
                                                    //ref={scrollableBoxRef}
                                                    sx={{
                                                        border: '2px solid #1976d2',
                                                        padding: 0,
                                                        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
                                                        borderRadius: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        position: 'absolute',
                                                        top: -30, // Mover para cima para criar efeito de flutuação
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        width: boxWidth,
                                                        height: boxHeight, // Altura controlada pelo estado
                                                        transition: 'width 0.5s ease, height 0.5s ease', // Adiciona uma transição suave
                                                        backgroundColor: backgroundColor, // Cor de fundo controlada pelo estado
                                                    }}
                                                >
                                                    {/* Adicione o componente PatientForm apenas se a Box estiver expandida */}
                                                    {isExpanded && showChildren && (
                                                        <Box
                                                            sx={{
                                                                backgroundColor: 'none',
                                                                paddingLeft: 5,
                                                                paddingRight: 5,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                position: 'absolute',
                                                                width: '100%',
                                                                height: '100%',
                                                                flexWrap: 'wrap', // exibir os elementos em linhas

                                                            }}
                                                        >
                                                            {/* Barra com botão de retrair */}
                                                            <Box
                                                                sx={{
                                                                    width: '100%',
                                                                    display: 'flex',
                                                                    justifyContent: 'flex-end',
                                                                    marginBottom: 0,
                                                                    marginTop: -7,
                                                                    backgroundColor: 'none',
                                                                }}
                                                            >
                                                                <IconButton onClick={() => retractBox()} size="small" sx={{ marginRight: 0, color: '#000' }}>
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </Box>

                                                            {/* Adicione o componente PatientForm */}
                                                            <PatientForm onSubmit={handleFormSubmit} editMode={isEditing} formData={selectedPatient} />

                                                        </Box>
                                                    )}
                                                </Box>
                                                {/* LISTA DE DADOS */}
                                                <CardContent
                                                    sx={{ marginTop: 0 }}
                                                    className={isExpanded ? 'disabled' : ''} // Adicione a classe CSS quando a Box estiver expandida
                                                > 
                                                    <PatientFetch
                                                          expandBox={expandBox}
                                                          isExpanded={isExpanded}
                                                          marginTop={marginTop}
                                                          onEdit={handleEditPatient}
                                                    />
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