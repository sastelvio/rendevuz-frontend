import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Select,
    MenuItem,
    TextField,
    InputLabel,
    FormControl,
    Typography,
    Card,
    CardContent,
    Alert,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { register } from "../slices/authSlice";
import GroupAddIcon from '@mui/icons-material/GroupAdd';


const Register = () => {
    const dispatch = useAppDispatch();

    const [error, setError] = useState("");

    const [username, setUserName] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleRegister = async () => {
        // This is only a basic validation of inputs. Improve this as needed.
        if (username && firstname && lastname && email && password && role) {
            try {
                await dispatch(
                    register({
                        username,
                        firstname,
                        lastname,
                        email,
                        password,
                        role,
                    })
                ).unwrap();
            } catch (e) {
                console.error(e);
            }
        } else {
            // Show an error message.
        }
    };

    return (
        <Box sx={{ display: "flex", width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#e5e5e5' }}>
            <CssBaseline />

            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        mt: 8,
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
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Sign Up</Typography>
                                </Box>
                                <CardContent sx={{ marginTop: 5 }}> {/* Espaço para acomodar o efeito de flutuação */}
                                    <Box
                                        component="form"
                                        onSubmit={handleRegister}
                                        sx={{ mt: 1 }}
                                    >
                                        <Grid container spacing={2} justifyContent={"flex-center"}>
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <TextField
                                                    name="username"
                                                    required
                                                    fullWidth
                                                    id="username"
                                                    label="Username"
                                                    autoFocus
                                                    value={username}
                                                    onChange={(e) => setUserName(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <TextField
                                                    name="firstname"
                                                    required
                                                    fullWidth
                                                    id="firstname"
                                                    label="First Name"
                                                    autoFocus
                                                    value={firstname}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <TextField
                                                    name="lastname"
                                                    required
                                                    fullWidth
                                                    id="lastname"
                                                    label="Last Name"
                                                    autoFocus
                                                    value={lastname}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    id="password"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="Repeat Password"
                                                    type="password"
                                                    id="repeatpassword"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <FormControl required fullWidth>
                                                    <InputLabel id="role-label">Role</InputLabel>
                                                    <Select
                                                        labelId="role-label"
                                                        id="role"
                                                        value={role}
                                                        label="Role"
                                                        onChange={(e) => setRole(e.target.value)}
                                                    >
                                                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                                                        <MenuItem value="USER">USER</MenuItem>
                                                        <MenuItem value="PATIENT">PATIENT</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        {error && (
                                            <Alert severity="error" sx={{ mt: 2 }}>
                                                {error}
                                            </Alert>
                                        )}
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="success"
                                            fullWidth
                                            sx={{
                                                marginTop: 2,
                                            }}
                                            endIcon={<GroupAddIcon />}
                                        >
                                            Register
                                        </Button>
                                        <Grid container justifyContent={"flex-center"}>
                                            <Grid
                                                item
                                                xs={12}
                                                sx={{
                                                    marginTop: 2,
                                                }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}>
                                                    Already have an account?
                                                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                        <Button
                                                            color="primary"
                                                            variant="text"
                                                            sx={{
                                                                fontWeight: 'bold',
                                                                marginLeft: 1
                                                            }}
                                                        >
                                                            Sign In
                                                        </Button>
                                                    </Link>
                                                </Box>
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

export default Register;