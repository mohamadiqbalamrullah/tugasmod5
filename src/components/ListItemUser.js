import { Delete } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import React from "react";

function ListItemUser({ image, primaryText, secondaryText, onDelete }) {
  return (
    <ListItem>
      <ListItemText
        primary={<Typography variant="h6">{primaryText}</Typography>}
        secondary={<Typography variant="p">{secondaryText}</Typography>}
      />
      <IconButton onClick={onDelete}>
        <Delete />
      </IconButton>
    </ListItem>
  );
}

export default ListItemUser;
