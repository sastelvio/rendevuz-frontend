import React, { useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    Box
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClearAllIcon from '@mui/icons-material/ClearAll';

interface PatientFormProps {
    onSubmit: (formData: FormData) => void;
}

interface FormData {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        id: 0,
        firstName: '',
        lastName: '',
        age: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    const handleClear = () => {
        setFormData({
            id: 0,
            firstName: '',
            lastName: '',
            age: 0
        });
    };

    return (
        <Box
            sx={{
                marginTop: 0,
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
                            marginBottom: 3,
                            '& .MuiInputBase-root': {
                                backgroundColor: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'black',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white',
                                transform: 'translate(14px, -20px) scale(0.75)',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={6}>                    
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        sx={{
                            marginBottom: 3,
                            '& .MuiInputBase-root': {
                                backgroundColor: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'black',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white',
                                transform: 'translate(14px, -20px) scale(0.75)',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        sx={{
                            marginBottom: 3,
                            '& .MuiInputBase-root': {
                                backgroundColor: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'black',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white',
                                transform: 'translate(14px, -20px) scale(0.75)',
                            },
                        }}
                    />
                </Grid>                
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        sx={{
                            marginBottom: 3,
                            '& .MuiInputBase-root': {
                                backgroundColor: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'black',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white',
                                transform: 'translate(14px, -20px) scale(0.75)',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={6}>                    
                </Grid>
                <Grid
                    item xs={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'right',
                    }}
                >
                    <Button variant="outlined" sx={{ marginLeft: 2, width: '150px', color: '#fff', borderColor: '#fff' }} onClick={handleClear} startIcon={<ClearAllIcon />}>Clear</Button>
                    <Button variant="contained" color="success" sx={{ marginLeft: 2, width: '150px' }} onClick={handleSubmit} endIcon={<SendIcon />}>Submit</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PatientForm;