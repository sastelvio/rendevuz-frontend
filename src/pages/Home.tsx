import React from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";


const Home = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const navigate = useNavigate();

    const userProfileInfo = useAppSelector((state) => state.auth.basicUserInfo);

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            navigate("/login");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <h1>Home</h1>
            {userProfileInfo ? (
                <h4>Name: {userProfileInfo.firstName} {userProfileInfo.lastName}</h4>
            ) : (
                <h4>Loading...</h4>
            )}
            <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogout}>
                Logout
            </Button>
        </>
    );
};

export default Home;
