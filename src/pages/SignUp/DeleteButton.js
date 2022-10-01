import React, { useState } from 'react';
import { Delete } from '@material-ui/icons';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { deleteUser } from '../../service/OnboardingService';
import { toast } from 'react-toastify';
const DeleteButton = props => {
  const [deleteModal, setDeleteModal] = useState(false);

  const Transition = React.forwardRef(function Transition(
    props,
    ref
  )
   {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleDelete = async () => {
    setDeleteModal(false)
    try {
      const deleteID = await deleteUser(props.data.userId);
      addUserToast(deleteID);
      console.log('deleteId', deleteID);
    } catch (error) {
      toast.error('Failed to Delete');
      throw error;
    }
  };
  const addUserToast = async data => {
    console.log('Toastdata', data);
    if (data) {
      toast.success('successfully  deleted');
      setDeleteModal(false)
    } else {
      toast.error('Failed to send');
    }
    window.location.reload();

  };

  return (
    <div>
      {localStorage.getItem('role_Id') === '1' ? (
        <Delete style=
          {{ color: 'black',opacity:'0.5' }} onClick={() => setDeleteModal(true)} />) : (
        <Delete style=
          {{ color: 'black',opacity:'0.4' }}  />
      )
      }

      <Dialog
        open={deleteModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setDeleteModal(false)}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal(false)}>cancel</Button>
          <Button onClick={handleDelete}>ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteButton;
