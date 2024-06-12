import React, { useState, useEffect } from 'react';
import {
    Grid,
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Patient } from '../../slices/types';

interface AppointmentViewProps {
    formData: FormData;
}

type FormState = {
    id?: string;
    description: string;
    schedule: string;
    patientResponse: Patient;
    patientId: string;
};

const AppointmentView: React.FC<AppointmentViewProps> = ({ formData }) => {
    const [formState, setFormState] = useState<FormState>({
        id: '',
        description: '',
        schedule: '',
        patientResponse: {
            id: '',
            firstName: '',
            surname: '',
            email: '',
            socialSecurity: '',
        },
        patientId: '',
    });

    useEffect(() => {
        if (formData) {
            const patientData = formData.get('patientResponse');

            let parsedPatientData = {
                id: '',
                firstName: '',
                surname: '',
                email: '',
                socialSecurity: '',
            };

            if (patientData) {
                try {
                    parsedPatientData = JSON.parse(patientData as string);
                } catch (e) {
                    console.error('Failed to parse patient data', e);
                }
            }

            setFormState({
                id: formData.get('id') as string,
                description: formData.get('description') as string,
                schedule: formData.get('schedule') as string,
                patientResponse: parsedPatientData,
                patientId: parsedPatientData.id
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
                <Grid
                    item xs={2}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="body2">
                        Patient:
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Accordion
                        sx={{ boxShadow: 'none', }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{ backgroundColor: '#dee2e6',  }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {formState.patientResponse.firstName} {formState.patientResponse.surname}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{ backgroundColor: '#dee2e6', }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography variant="body2">
                                        Social Security:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        {formState.patientResponse.socialSecurity}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body2">
                                        Email:
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        {formState.patientResponse.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body2">
                        Schedule:
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {formState.schedule}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body2">
                        Description:
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {formState.description}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AppointmentView;