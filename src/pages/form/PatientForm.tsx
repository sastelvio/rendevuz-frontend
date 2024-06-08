import React, { useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    Box
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import { useAppDispatch } from '../../hooks/redux-hooks';
import { addPatient, updatePatient } from '../../slices/patientSlice';

interface PatientFormProps {
    onSubmit: (formData: FormData) => void;
}

interface FormData {
    id: string;
    firstName: string;
    surname: string;
    socialSecurity: string;
    email: string;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        id: '',
        firstName: '',
        surname: '',
        socialSecurity: '',
        email: '',
    });

    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (formData.id) {
            dispatch(updatePatient(formData));
        } else {
            dispatch(addPatient(formData));
        }
        onSubmit(formData);
    };

    const handleClear = () => {
        setFormData({
            id: '',
            firstName: '',
            surname: '',
            socialSecurity: '',
            email: '',
        });
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
                        value={formData.id}
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
                        value={formData.firstName}
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
                        value={formData.surname}
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
                        value={formData.socialSecurity}
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
                        value={formData.email}
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
                    <Button variant="outlined" sx={{ marginLeft: 2, width: '150px', color: '#000', borderColor: '#000' }} onClick={handleClear} startIcon={<ClearAllIcon />}>Clear</Button>
                    <Button variant="contained" color="success" sx={{ marginLeft: 2, width: '150px' }} onClick={handleSubmit} endIcon={<SendIcon />}>Submit</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PatientForm;