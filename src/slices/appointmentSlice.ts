import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { RootState } from "../store";
import { Patient } from "./types";

type Appointment = {
    id?: string;
    description: string;
    schedule: string;
    patientResponse: Patient;
};

type AppointmentState = {
    appointments: Appointment[];
    status: "idle" | "loading" | "failed";
    error: string | null;
};

const initialState: AppointmentState = {
    appointments: [],
    status: "idle",
    error: null,
};

// Thunks
export const fetchAppointments = createAsyncThunk("appointment/fetchAppointments", async () => {
    const response = await axiosInstance.get("/api/v1/appointment");
    return response.data;
});

export const addAppointment = createAsyncThunk("appointment/addAppointment", async (newAppointment: Appointment) => {
    const response = await axiosInstance.post("/api/v1/appointment", newAppointment);
    return response.data;
});

export const updateAppointment = createAsyncThunk("appointment/updateAppointment", async (updatedAppointment: Appointment) => {
    const response = await axiosInstance.put(`/api/v1/appointment/${updatedAppointment.id}`, updatedAppointment);
    return response.data;
});

export const deleteAppointment = createAsyncThunk("appointment/deleteAppointment", async (id: string) => {
    await axiosInstance.delete(`/api/v1/appointment/${id}`);
    return id;
});

// Slice
const appointmentSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppointments.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
                state.status = "idle";
                state.appointments = action.payload;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch appointments";
            })
            .addCase(addAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
                state.appointments.push(action.payload);
            })
            .addCase(updateAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
                const index = state.appointments.findIndex(appointment => appointment.id === action.payload.id);
                if (index >= 0) {
                    state.appointments[index] = action.payload;
                }
            })
            .addCase(deleteAppointment.fulfilled, (state, action: PayloadAction<string>) => {
                state.appointments = state.appointments.filter(appointment => appointment.id !== action.payload);
            });
    }
});

export default appointmentSlice.reducer;
