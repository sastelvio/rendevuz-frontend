import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { RootState } from "../store";

type Patient = {
    id?: string;
    firstName: string;
    surname: string;
    socialSecurity: string;
    email: string;
};

type PatientState = {
    patients: Patient[];
    status: "idle" | "loading" | "failed";
    error: string | null;
};

const initialState: PatientState = {
    patients: [],
    status: "idle",
    error: null,
};

// Thunks
export const fetchPatients = createAsyncThunk("patient/fetchPatients", async () => {
    const response = await axiosInstance.get("/api/v1/patient");
    return response.data;
});

export const addPatient = createAsyncThunk("patient/addPatient", async (newPatient: Patient) => {
    const response = await axiosInstance.post("/api/v1/patient", newPatient);
    return response.data;
});

export const updatePatient = createAsyncThunk("patient/updatePatient", async (updatedPatient: Patient) => {
    const response = await axiosInstance.put(`/api/v1/patient/${updatedPatient.id}`, updatedPatient);
    return response.data;
});

export const deletePatient = createAsyncThunk("patient/deletePatient", async (id: string) => {
    await axiosInstance.delete(`/api/v1/patient/${id}`);
    return id;
});

// Slice
const patientSlice = createSlice({
    name: "patients",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatients.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
                state.status = "idle";
                state.patients = action.payload;
            })
            .addCase(fetchPatients.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch patients";
            })
            .addCase(addPatient.fulfilled, (state, action: PayloadAction<Patient>) => {
                state.patients.push(action.payload);
            })
            .addCase(updatePatient.fulfilled, (state, action: PayloadAction<Patient>) => {
                const index = state.patients.findIndex(patient => patient.id === action.payload.id);
                if (index >= 0) {
                    state.patients[index] = action.payload;
                }
            })
            .addCase(deletePatient.fulfilled, (state, action: PayloadAction<string>) => {
                state.patients = state.patients.filter(patient => patient.id !== action.payload);
            });
    }
});

export default patientSlice.reducer;
