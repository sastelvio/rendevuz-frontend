import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

interface DialogConfirmProps {
    open: boolean;
    title: string;
    message: string;
    severity: 'warning' | 'error' | 'info';
    onClose: () => void;
    onConfirm: () => void;
}

const DialogConfirm: React.FC<DialogConfirmProps> = ({ open, title, message, severity, onClose, onConfirm }) => {
    const renderIcon = () => {
        switch (severity) {
            case 'warning':
                return <WarningIcon style={{ color: 'orange', marginRight: 8 }} />;
            case 'error':
                return <ErrorIcon style={{ color: 'red', marginRight: 8 }} />;
            case 'info':
                return <InfoIcon style={{ color: 'blue', marginRight: 8 }} />;
            default:
                return null;
        }
    };
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    height: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                }}
            >
                {renderIcon()}
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color="primary"
                    variant="outlined"
                    sx={{
                        marginLeft: 2,
                        marginBottom: 2,
                        marginRight:2,
                        width: '150px'
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        marginLeft: 2,
                        marginBottom: 2,
                        marginRight:2,
                        width: '150px',
                        color: '#fff',
                        backgroundColor: '#d84545',
                        borderColor: '#fff',
                        '&:hover': {
                            backgroundColor: '#fff',
                            color: '#d84545',
                            borderColor: '#d84545',
                        }
                    }}
                    onClick={onConfirm}
                    autoFocus
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogConfirm;