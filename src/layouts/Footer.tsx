import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Link as MuiLink } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <AppBar
            position="static"
            sx={{
                top: 'auto',
                bottom: 0,
                marginTop: 4,
                marginLeft: 0,
                width: '100%',
                backgroundColor: 'inherit',
                color: '#001219',
                boxShadow: 'none',
            }}
        >
            <Toolbar>
                <Grid container spacing={2} justifyContent={"flex-center"}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" align="left" sx={{ flexGrow: 1, marginLeft: 0 }}>
                            © 2024 | made by{' '}
                            <MuiLink href="https://sastelvio.com" target="_blank" rel="noopener noreferrer">
                                Sastelvio MANUEL
                            </MuiLink>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" align="right" sx={{ flexGrow: 1, marginRight: 3 }}>
                            About Us | Blog | License
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
