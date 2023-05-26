import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete ?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;