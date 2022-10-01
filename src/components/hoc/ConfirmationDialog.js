import React from 'react';
import Button from '@material-ui/core/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';

export default function ConfirmationDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description">
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={e => props.handleCloseConfirm()}
            className="cancel-button">
            {'Cancel'}
          </Button>
          <Button
            onClick={e => props.handleProceedConfirm()}
            className="confirm-button">
            {props.buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
