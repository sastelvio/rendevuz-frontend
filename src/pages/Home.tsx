import React, { useEffect } from "react";
import { Button } from "@mui/material"; 
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUser, logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); // Correção: Invocando useNavigate

    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);

    useEffect(() => {
        if (basicUserInfo) {
            dispatch(getUser(basicUserInfo.id));
        }
    }, [basicUserInfo, dispatch]); // Adicionando dispatch como dependência

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            navigate("/login");
        } catch (e) {
            // TODO: Adicionar um handler de erro amigável
            console.error(e);
        }
    };

    return (
        <>
            <h1>Home</h1>
            <h4>name: {userProfileInfo?.firstName} {userProfileInfo?.lastName}</h4>
            <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogout}>
                Logout
            </Button>
        </>
    );
};

export default Home;
