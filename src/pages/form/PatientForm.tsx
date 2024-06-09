import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    Box
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { useAppDispatch } from '../../hooks/redux-hooks';
import { addPatient, updatePatient } from '../../slices/patientSlice';

type PatientFormProps = {
    editMode: boolean;
    formData: FormData | null;
    onSubmit: () => void;
};

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, editMode, formData }) => {
    const dispatch = useAppDispatch();
    const [formState, setFormState] = useState({
        id: '',
        firstName: '',
        surname: '',
        email: '',
        socialSecurity: ''
    });

    useEffect(() => {
        if (formData) {
            setFormState({
                id: formData.get('id') as string,
                firstName: formData.get('firstName') as string,
                surname: formData.get('surname') as string,
                email: formData.get('email') as string,
                socialSecurity: formData.get('socialSecurity') as string,
            });
        }
    }, [formData]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (formState.id) {
            dispatch(updatePatient(formState));
        } else {
            dispatch(addPatient(formState));
        }
        onSubmit();
    };

    return (
        <Box
            sx={{
                marginTop: -10,
                width: '100%',
                backgroundColor: 'none'
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="ID"
                        name="id"
                        disabled
                        value={formState.id}
                        onChange={handleChange}
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {},
                                '&:hover fieldset': {},
                                '&.Mui-focused fieldset': {},
                            },
                            '& .MuiInputLabel-root': {},
                            '& .MuiInputLabel-root.Mui-focused': {},
                        }}
                    />
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleChange}
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {},
                                '&:hover fieldset': {},
                                '&.Mui-focused fieldset': {},
                            },
                            '& .MuiInputLabel-root': {},
                            '& .MuiInputLabel-root.Mui-focused': {},
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Surname"
                        name="surname"
                        value={formState.surname}
                        onChange={handleChange}
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {},
                                '&:hover fieldset': {},
                                '&.Mui-focused fieldset': {},
                            },
                            '& .MuiInputLabel-root': {},
                            '& .MuiInputLabel-root.Mui-focused': {},
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Social Security"
                        name="socialSecurity"
                        value={formState.socialSecurity}
                        onChange={handleChange}
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {},
                                '&:hover fieldset': {},
                                '&.Mui-focused fieldset': {},
                            },
                            '& .MuiInputLabel-root': {},
                            '& .MuiInputLabel-root.Mui-focused': {},
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {},
                                '&:hover fieldset': {},
                                '&.Mui-focused fieldset': {},
                            },
                            '& .MuiInputLabel-root': {},
                            '& .MuiInputLabel-root.Mui-focused': {},
                        }}
                    />
                </Grid>
                <Grid
                    item xs={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'right',
                        marginTop: 5,
                    }}
                >
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
                        {editMode ? 'Update' : 'Create'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PatientForm;
