import React from "react";
import { Button, Modal, Box, TextField } from "@mui/material";
import { UpdateContext } from "../App";

export default function UpdatePost({
    onUpdate,
    post: { postTitle, postBody }
}) {
    const { post, setPost } = React.useContext(UpdateContext);
    const handleClose = () => setPost(null);

    const titleRef = React.useRef(null);
    const bodyRef = React.useRef(null);

    const handleUpdate = e => {
        e.preventDefault();
        const title = titleRef.current.value;
        const body = bodyRef.current.value;
        onUpdate(title, body);
    };

    return (
        <div>
            <Modal
                open={post !== null}
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
                            <TextField 
                                label="Title" 
                                inputRef={titleRef} 
                                defaultValue={postTitle}
                            />
                            <TextField 
                                label="Body" 
                                rows={4} 
                                multiline 
                                inputRef={bodyRef} 
                                defaultValue={postBody}
                            />
                            <Button 
                                variant="contained"
                                type="submit"
                                onClick={handleUpdate}
                            >
                                Update
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}