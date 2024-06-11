import React, { useState, useEffect } from "react";
import { Box, Grid, TextField, Autocomplete, IconButton, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker, LocalizationProvider, renderTimeViewClock } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addAppointment, updateAppointment } from '../../slices/appointmentSlice';
import { fetchPatients } from '../../slices/patientSlice';
import { Patient } from "../../slices/types";

type AppointmentFormProps = {
    editMode: boolean;
    formData: FormData | null;
    onSubmit: () => void;
};

type FormState = {
    id?: string;
    description: string;
    schedule: string;
    patientResponse: Patient;
    patientId: string;
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, editMode, formData }) => {
    const dispatch = useAppDispatch();
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

    const [schedule, setSchedule] = useState<Dayjs | null>(null);
    const { patients } = useAppSelector((state) => state.patient);
    const [patientValue, setPatientValue] = useState<Patient | null>(null);

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
            setSchedule(formData.get('schedule') ? dayjs(formData.get('schedule') as string) : null);
            setPatientValue(parsedPatientData); // Atualiza o estado de patientValue
        }
    }, [formData]);

    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    useEffect(() => {
        if (editMode && formData && patients.length > 0) {
            const patientId = formData.get('patientResponse.id') as string;
            const selectedPatient = patients.find(patient => patient.id === patientId);
            if (selectedPatient) {
                setFormState(prevState => ({
                    ...prevState,
                    patientResponse: selectedPatient,
                }));
                setPatientValue(selectedPatient);
            }
        }
    }, [editMode, formData, patients]);

    const handlePatientChange = (event: React.SyntheticEvent<Element, Event>, newValue: Patient | null) => {
        setFormState({
            ...formState,
            patientResponse: newValue ? newValue : {
                id: '',
                firstName: '',
                surname: '',
                email: '',
                socialSecurity: '',
            },
        });
        setPatientValue(newValue);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const handleDateChange = (newValue: Dayjs | null) => {
        if (newValue) {
            const localTime = newValue.format('YYYY-MM-DDTHH:mm:ss');
            setSchedule(newValue);
            setFormState({
                ...formState,
                schedule: localTime,
            });
        }
    };

    const [cleared, setCleared] = React.useState<boolean>(false);

    useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => { };
    }, [cleared]);


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { id, description, schedule, patientResponse } = formState;
        const dataToSend = {
            id,
            description,
            schedule,
            patientResponse,
            patientId: patientResponse.id, // Envie apenas o ID do paciente
        };

        if (formState.id) {
            dispatch(updateAppointment(dataToSend));
        } else {
            dispatch(addAppointment(dataToSend));
        }
        onSubmit();
    };


    return (
        <Box sx={{ marginTop: -10, width: '100%', backgroundColor: 'none' }}>
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
                <Grid item xs={12}>
                    <Autocomplete
                        id="patient-select"
                        sx={{
                            width: '100%',
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
                        options={patients}
                        autoHighlight
                        getOptionLabel={(option) => `${option.socialSecurity} | ${option.firstName} ${option.surname}`}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Patient"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                        onChange={handlePatientChange}
                        value={patientValue}
                    />
                </Grid>
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            value={schedule}
                            sx={{
                                width: '100%',
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
                            onChange={handleDateChange}
                            disablePast
                            label="Schedule"
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                            slotProps={{
                                field: { clearable: true, onClear: () => setCleared(true) },
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Description"
                        name="description"
                        value={formState.description}
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

export default AppointmentForm;