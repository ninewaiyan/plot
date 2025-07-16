import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const DeleteConfirmModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        backgroundColor: "white",
        borderRadius: 2,
        p: 3,
        width: 300,
        mx: "auto",
        mt: "20vh",
        textAlign: "center"
      }}>
        <Typography variant="h6">Confirm Delete</Typography>
        <Typography sx={{ mt: 2 }}>Are you sure you want to delete this plot?</Typography>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button onClick={onConfirm} variant="contained" color="error">Delete</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmModal;
