import { createSlice, createAsyncThunk, PayloadAction, isAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { RootState } from "../store";
import { User } from "./types";

type UserLogin = {
    username: string;
    password: string;
};

type NewUser = UserLogin & {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
};

type UserBasicInfo = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    token: string;
};


type UserProfileData = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    about: string;
    location: string;
    link_linkedin: string;
    link_facebook: string;
    link_twitter: string;
    link_instagram: string;
    password: string;
    role: string;
};

type AuthApiState = {
    basicUserInfo?: UserBasicInfo | null;
    userProfileData?: UserProfileData | null;
    status: "idle" | "loading" | "failed";
    error: string | null;
};

const initialState: AuthApiState = {
    basicUserInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo") as string)
        : null,
    userProfileData: undefined,
    status: "idle",
    error: null,
};

export const login = createAsyncThunk("login", async (data: UserLogin) => {
    const response = await axiosInstance.post("/auth/login", data);
    //const resData = response.data;
    const resData: UserBasicInfo = response.data; 
    localStorage.setItem("userInfo", JSON.stringify(resData));
    return resData;
});


export const register = createAsyncThunk("register", async (data: NewUser) => {
    const response = await axiosInstance.post("/auth/register", data);
    const resData = response.data;

    localStorage.setItem("userInfo", JSON.stringify(resData));

    return resData;
});

export const update = createAsyncThunk("update", async (updated: User) => {
    const response = await axiosInstance.put(`/auth/${updated.id}`, updated);
    return response.data;
});

export const logout = createAsyncThunk("logout", async (_, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.basicUserInfo?.token;

    const response = await axiosInstance.post(
        "/auth/logout",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    localStorage.removeItem("userInfo");

    return response.data;
});

export const getUser = createAsyncThunk(
    "user/profile",
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const token = state.auth.basicUserInfo?.token;
        try {
            const response = await axiosInstance.get("/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                login.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
                }
            )
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<UserBasicInfo>) => {
                    state.status = "idle";
                    state.basicUserInfo = action.payload;
                }
            )
            .addCase(
                login.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message || "Login failed";
                }
            )
            .addCase(
                register.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
                }
            )
            .addCase(
                register.fulfilled,
                (state, action: PayloadAction<UserBasicInfo>) => {
                    state.status = "idle";
                    state.basicUserInfo = action.payload;
                }
            )
            .addCase(
                register.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message || "Registration failed";
                }
            )
            .addCase(
                logout.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
                }
            )
            .addCase(
                logout.fulfilled, (state, action) => {
                    state.status = "idle";
                    state.basicUserInfo = null;
                }
            )
            .addCase(
                logout.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message || "Logout failed";
                }
            )
            .addCase(
                getUser.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
                }
            )
            .addCase(
                getUser.fulfilled, (state, action) => {
                    state.status = "idle";
                    state.userProfileData = action.payload;
                }
            )
            .addCase(
                getUser.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message || "Get user profile data failed";
                }
            )
            .addCase(
                update.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
                }
            )
            .addCase(
                update.fulfilled,
                (state, action: PayloadAction<UserProfileData>) => {
                    state.status = "idle";
                    state.userProfileData = action.payload;
                }
            )
            .addCase(
                update.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message || "Update failed";
                }
            );
    }
});

export default authSlice.reducer;