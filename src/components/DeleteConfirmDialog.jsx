import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

// DeleteConfirmDialog is a reusable component that displays a dialog box to confirm a deletion action.
// It is based on the Material-UI Dialog component and contains a title, message, and two action buttons: Cancel and Delete.
// The component takes three props:
//   - `open`: A boolean prop that controls whether the dialog is visible or hidden.
//   - `onClose`: A callback function that is called when the user clicks the "Cancel" button or outside the dialog area to close the dialog.
//   - `onConfirm`: A callback function that is called when the user clicks the "Delete" button to confirm the deletion action.
// The dialog's content can be customized by changing the message inside the <DialogContentText> component.
// The "Delete" button is styled with the "error" color and a "contained" variant to indicate a destructive action.
// The dialog's appearance is further customized by providing a custom PaperProps object, adding padding and rounded corners.
// This component can be easily used to prompt the user for a deletion confirmation in various parts of the application.
function DeleteConfirmDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { padding: "12px", borderRadius: "20px" } }}
      classes={{ root: "delete-confirm-dialog" }}
    >
      <DialogTitle>Delete?</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmDialog;
