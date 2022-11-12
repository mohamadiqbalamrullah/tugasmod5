import React from "react";
import { Button, Modal, Box, TextField } from "@mui/material";

export default function CreatePost({ onSubmit }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const titleRef = React.useRef(null);
    const bodyRef = React.useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        const title = titleRef.current.value;
        const body = bodyRef.current.value;
        onSubmit(title, body);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Create Post</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '44ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField label="Title" inputRef={titleRef} />
                            <TextField label="Body" rows={4} multiline inputRef={bodyRef} />
                            <Button 
                                variant="contained"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Create
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}