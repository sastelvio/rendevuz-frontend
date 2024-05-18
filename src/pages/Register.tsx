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
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { register } from "../slices/authSlice";


const Register = () => {
    const dispatch = useAppDispatch();

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
        <>
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
                    <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h5">Register</Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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

                            <Grid item xs={12}>
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

                            <Grid item xs={12}>
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

                            <Grid item xs={12}>
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

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
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
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login">Already have an account? Login</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Register;