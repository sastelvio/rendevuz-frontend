import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { Box, CardContent, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArticleIcon from "@mui/icons-material/Article";
import DialogConfirm from "../../components/notification/DialogConfirm";

import { fetchPatients, addPatient, updatePatient, deletePatient } from "../../slices/patientSlice";
import { AppDispatch } from "../../store";

type PatientFetchProps = {
    expandBox: () => void;
    isExpanded: boolean;
    marginTop: number;
};

const columns: GridColDef[] = [
    { field: 'socialSecurity', headerName: 'Social Security', flex: 1 },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 2,
        valueGetter: (params: GridValueGetterParams<any, any>) => `${params.row.firstName || ''} ${params.row.surname || ''}`,
    },
    { field: 'email', headerName: 'Email', flex: 1 },
];

const PatientFetch: React.FC<PatientFetchProps> = ({ expandBox, isExpanded, marginTop, }) => {

    const dispatch: AppDispatch = useAppDispatch();

    // Fetch patients when the component mounts
    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    const patientsData = useAppSelector((state) => state.patient.patients);

    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

    // Função para lidar com o clique no botão "Add Patient"
    const handleAddClick = () => {
        expandBox();
    };

    //funcao para apagar linha selecionada
    const handleDelete = (selectedRows: any[]) => {
        console.log('Deleting row with ID/s:', selectedRows);
        setConfirmDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        setConfirmDialogOpen(false);
        if (selectedRows.length > 0) {
            //dispatch(deletePatient(selectedRows));
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


    return (
        <Box>
            {/* Cabeçalho Personalizado */}
            <Box
                sx={{
                    backgroundColor: 'none',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'left',
                    color: '#000',
                    marginLeft: 2,
                    marginRight: 2,
                    marginTop: marginTop + 5,
                    transition: 'margin-top 0.5s ease',
                }}
                className={isExpanded ? 'disabled' : ''}
            >
                <Tooltip title="View" placement="top">
                    <span>
                        <IconButton onClick={() => handleDetails(selectedRows)} disabled={oneButtonsDisabled} color="inherit" size="small" sx={{ marginRight: 2 }}>
                            <ArticleIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Edit" placement="top">
                    <span>
                        <IconButton onClick={() => handleEdit(selectedRows)} disabled={oneButtonsDisabled} color="inherit" size="small" sx={{ marginRight: 2 }}>
                            <EditIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Delete" placement="top">
                    <span>
                        <IconButton onClick={() => handleDelete(selectedRows)} disabled={multiButtonsDisabled} color="error" size="small" sx={{ marginRight: 2 }}>
                            <DeleteIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
            {/* Fim do Cabeçalho Personalizado */}
            <CardContent
                sx={{ marginTop: 0 }}
                className={isExpanded ? 'disabled' : ''}
            >
                <DataGrid
                    rows={patientsData}
                    columns={columns}
                    getRowId={(row) => row.socialSecurity}
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
            <DialogConfirm
                open={confirmDialogOpen}
                title="Confirm Delete"
                message="Are you sure you want to delete the selected patients?"
                severity="error"
                onClose={() => setConfirmDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </Box>
    );
};

export default PatientFetch;