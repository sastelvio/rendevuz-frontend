import React, { useState, useEffect } from 'react';
import {
    Grid,
    Box,
    Typography
} from '@mui/material';

interface AppointmentViewProps {
    formData: FormData;
}

const AppointmentView: React.FC<AppointmentViewProps> = ({ formData }) => {
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

    return (
        <Box
            sx={{
                marginTop: -10,
                width: '100%',
                backgroundColor: 'none'
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Typography variant="body2">
                        ID:
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {formState.id}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body2">
                        Full Name:
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {formState.firstName} {formState.surname}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body2">
                        Social Security:
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {formState.socialSecurity}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body2">
                        Email:
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {formState.email}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AppointmentView;
