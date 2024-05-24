import React from 'react';
import { AppBar, Toolbar, Typography, Link as MuiLink } from '@mui/material';

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
                backgroundColor: '#e5e5e5',
                color: '#001219',
                boxShadow: 'none',
            }}
        >
            <Toolbar>
                <Typography variant="body2" align="left" sx={{ flexGrow: 1, marginLeft: 0 }}>
                    © 2024 | made by{' '}
                    <MuiLink href="https://sastelvio.com" target="_blank" rel="noopener noreferrer">
                        Sastelvio MANUEL
                    </MuiLink>
                </Typography>
                <Typography variant="body2" align="right" sx={{ flexGrow: 1, marginRight: 3 }}>
                    About Us | Blog | License
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
