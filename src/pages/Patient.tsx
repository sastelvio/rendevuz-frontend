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
import { DataGrid, GridColDef, GridTreeNodeWithRender, GridValueGetterParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';

import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import PatientForm from "./forms/PatientForm";
import DialogConfirm from "../components/notification/DialogConfirm";

const drawerWidth = 240;
const collapsedWidth = 73;

//table
function createData(
    id: number,
    firstName: string,
    lastName: string,
    age: number,
) {
    return { id, firstName, lastName, age };
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'firstName', headerName: 'First name', flex: 1 },
    { field: 'lastName', headerName: 'Last name', flex: 1 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        flex: 0.5,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 2,
        valueGetter: (params: GridValueGetterParams<any, any>) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    createData(1, 'Jon', 'Snow', 35),
    createData(2, 'Cersei', 'Lannister', 42),
    createData(3, 'Jaime', 'Lannister', 45),
    createData(4, 'Arya', 'Stark', 16),
    createData(5, 'Daenerys', 'Targaryen', 23),
    createData(6, 'Melisandre', 'Asshai', 150),
    createData(7, 'Ferrara', 'Clifford', 44),
    createData(8, 'Rossini', 'Frances', 36),
    createData(9, 'Harvey', 'Roxie', 65),
    createData(10, 'Eddard', 'Stark', 48),
    createData(11, 'Robert', 'Baratheon', 50),
    createData(12, 'Sansa', 'Stark', 20),
    createData(13, 'Brandon', 'Stark', 18),
    createData(14, 'Sandor', 'Clegane', 40),
    createData(15, 'Petyr', 'Baelish', 35),
    createData(16, 'Varys', 'Unknown', 47),
    createData(17, 'Bronn', 'Blackwater', 38),
    createData(18, 'Tyrion', 'Lannister', 39),
    createData(19, 'Jorah', 'Mormont', 50),
    createData(20, 'Samwell', 'Tarly', 30),
    createData(21, 'Gilly', 'Tarly', 25),
    createData(22, 'Tormund', 'Giantsbane', 42),
    createData(23, 'Brienne', 'Tarth', 32),
    createData(24, 'Podrick', 'Payne', 28),
    createData(25, 'Daario', 'Naharis', 35),
    createData(26, 'Shae', 'Unknown', 29),
    createData(27, 'Missandei', 'Nath', 25),
    createData(28, 'Grey', 'Worm', 27),
    createData(29, 'Yara', 'Greyjoy', 34),
    createData(30, 'Theon', 'Greyjoy', 32),
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
        expandBox();
    };

    //funcao para apagar linha selecionada
    const handleDelete = (selectedRows: any[]) => {
        // Adicione aqui a lógica para excluir a linha com o ID especificado
        console.log('Deleting row with ID/s:', selectedRows);
        setConfirmDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        setConfirmDialogOpen(false);
        if (selectedRows.length > 0) {
            console.log("Delete Patients IDs:", selectedRows);
        }
    };

    //funcao para editar linha selecionada
    const handleEdit = (selectedRows: any[]) => {
        // Adicione aqui a lógica para editar as linhas selecionadas
        console.log('Editing selected rows:', selectedRows);
        expandBox();
    };

    //funcao para editar linha selecionada
    const handleDetails = (selectedRows: any[]) => {
        // Adicione aqui a lógica para editar as linhas selecionadas
        console.log('View details of selected rows:', selectedRows);
        expandBox();
    };


    // Adicione este estado ao componente Patient
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    // Estado para controlar a habilitação dos botões quando so 1 esta selecionado
    const [oneButtonsDisabled, setOneButtonsDisabled] = useState<boolean>(true);

    // Estado para controlar a habilitação dos botões quando mais de um esta selecionado
    const [multiButtonsDisabled, setMultiButtonsDisabled] = useState<boolean>(true);

    // Função para lidar com a seleção de linhas
    const handleRowSelection = (newSelection: any[]) => {
        setSelectedRows(newSelection);

        // Habilitar/desabilitar botões com base no número de linhas selecionadas
        setOneButtonsDisabled(newSelection.length !== 1);

        // Habilitar/desabilitar botões com base no número de linhas selecionadas
        setMultiButtonsDisabled(newSelection.length < 1);
    };

    //FORMULARIO
    const [boxHeight, setBoxHeight] = useState<number>(65); // Altura inicial da Box
    const [isExpanded, setIsExpanded] = useState<boolean>(false); // Estado para controlar se a Box está expandida

    // Função para aumentar a altura e mover os elementos abaixo
    const expandBox = () => {
        setBoxHeight(600); // Aumenta a altura para 600px
        setIsExpanded(true); // Define o estado como expandido
    };

    // Calcula a margem superior dos elementos abaixo da Box
    const marginTop = isExpanded ? 67 : 0;

    // Função para retrair a Box ao tamanho original
    const retractBox = () => {
        setBoxHeight(65); // Retorna a altura para o valor original
        setIsExpanded(false); // Define o estado como não expandido
    };

    const [showChildren, setShowChildren] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState<string>("#1976d2"); // Estado para controlar a cor de fundo

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let colorTimer: NodeJS.Timeout;
        if (isExpanded) {
            // Atrasar a troca de cor até que a animação de expansão esteja completa
            timer = setTimeout(() => {
                setBackgroundColor("#6c757d"); // Nova cor de fundo
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

    //DIALOG
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false); // Estado para controlar a exibição do diálogo de confirmação



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
                                                    //ref={scrollableBoxRef}
                                                    sx={{
                                                        //backgroundColor: '#1976d2',
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
                                                        width: '98%',
                                                        height: boxHeight, // Altura controlada pelo estado
                                                        transition: 'height 0.5s ease', // Adiciona uma transição suave
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
                                                                <IconButton onClick={() => retractBox()} size="small" sx={{ marginRight: 0, color: '#fff' }}>
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </Box>

                                                            {/* Adicione o componente PatientForm */}
                                                            <PatientForm onSubmit={(formData) => console.log(formData)} />
                                                        </Box>
                                                    )}
                                                </Box>
                                                {/* Cabeçalho Personalizado */}
                                                <Box
                                                    sx={{
                                                        backgroundColor: 'none',
                                                        borderRadius: '4px',
                                                        display: 'flex',
                                                        alignItems: 'left',
                                                        color: '#000',
                                                        //marginTop: 5,
                                                        marginLeft: 2,
                                                        marginRight: 2,
                                                        marginTop: marginTop + 5, // Aplica a margem superior calculada     
                                                        transition: 'margin-top 0.5s ease', // Adiciona uma transição suave                                                 
                                                    }}
                                                >
                                                    <Tooltip title="View" placement="top">
                                                        <IconButton onClick={() => handleDetails(selectedRows)} disabled={oneButtonsDisabled} color="inherit" size="small" sx={{ marginRight: 2 }}>
                                                            <ArticleIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Edit" placement="top">
                                                        <IconButton onClick={() => handleEdit(selectedRows)} disabled={oneButtonsDisabled} color="inherit" size="small" sx={{ marginRight: 2 }}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete" placement="top">
                                                        <IconButton onClick={() => handleDelete(selectedRows)} disabled={multiButtonsDisabled} color="error" size="small" sx={{ marginRight: 2 }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                                {/* Fim do Cabeçalho Personalizado */}
                                                <CardContent sx={{ marginTop: 0 }}> {/* Espaço para acomodar o efeito de flutuação */}
                                                    <DataGrid
                                                        rows={rows}
                                                        columns={columns}
                                                        // Adicione a propriedade `onSelectionModelChange` para capturar as seleções de linha
                                                        onRowSelectionModelChange={handleRowSelection}
                                                        initialState={{
                                                            pagination: {
                                                                paginationModel: { page: 0, pageSize: 25 },
                                                            },
                                                        }}
                                                        pageSizeOptions={[25, 50]}
                                                        checkboxSelection
                                                        sx={{
                                                            '& .MuiDataGrid-cell': {
                                                                cursor: 'pointer',
                                                            },
                                                            '& .MuiDataGrid-row': {
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                                                },
                                                                '&.Mui-selected': {
                                                                    backgroundColor: 'rgba(25, 118, 210, 0.12) !important',
                                                                },
                                                            },
                                                            '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                                                                outline: 'none',
                                                            },
                                                        }}
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
                <DialogConfirm
                    open={confirmDialogOpen}
                    title="Confirm Delete"
                    message="Are you sure you want to delete the selected patients?"
                    severity="error" // Severidade
                    onClose={() => setConfirmDialogOpen(false)}
                    onConfirm={handleDeleteConfirm}
                />
            </Box >
        </Box >
    );
};

export default Patient;