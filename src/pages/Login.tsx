import { LockOutlined } from "@mui/icons-material";
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
    Alert,
    Card,
    CardContent,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { login } from "../slices/authSlice";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Login = () => {
    const dispatch = useAppDispatch();

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError(""); // Reset error message
        // Basic validation of inputs
        if (username && password) {
            try {
                await dispatch(
                    login({
                        username,
                        password,
                    })
                ).unwrap();
                // Optionally, redirect the user after successful login
                // navigate("/some-protected-route");
            } catch (e) {
                console.error(e);
                setError("Failed to login. Please check your credentials and try again.");
            }
        } else {
            setError("Both username and password are required.");
        }
    };

    return (
        <Box sx={{ display: "flex", width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#e5e5e5' }}>
            <CssBaseline />

            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        mt: 20,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Card
                            sx={{
                                paddingTop: 4,
                                paddingRight: 3,
                                paddingBottom: 5,
                                paddingLeft: 1,
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    paddingTop: 3,
                                    backgroundColor: 'white',
                                    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.6)',
                                    borderRadius: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: '#1976d2',
                                        color: '#fff',
                                        padding: 0,
                                        paddingLeft: 2,
                                        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
                                        borderRadius: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                        top: -30, // Mover para cima para criar efeito de flutuação
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '90%',
                                        height: '100px', // Ajuste a altura conforme necessário
                                    }}
                                >
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Sign In</Typography>
                                </Box>
                                <CardContent sx={{ marginTop: 5 }}> {/* Espaço para acomodar o efeito de flutuação */}
                                    <Box sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            autoFocus
                                            value={username}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {error && (
                                            <Alert severity="error" sx={{ mt: 2 }}>
                                                {error}
                                            </Alert>
                                        )}
                                        <FormGroup>
                                            <FormControlLabel control={<Switch />} label="Remember me" />
                                        </FormGroup>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            fullWidth
                                            sx={{
                                                marginTop: 2,
                                            }}
                                            onClick={handleLogin}
                                            autoFocus
                                            endIcon={<LockPersonIcon />}
                                        >
                                            Authenticate
                                        </Button>
                                        <Grid container justifyContent={"flex-center"}>
                                            <Grid item xs={12}>
                                                <Button
                                                    fullWidth
                                                    color="primary"
                                                    variant="text"
                                                    sx={{
                                                        marginTop: 2,
                                                        width: '100%'
                                                    }}
                                                >
                                                    I forgot my credentials
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </CardContent>
                            </Box>
                        </Card>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;