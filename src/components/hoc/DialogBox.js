import React, {useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
  Stepper,
  Step,
  StepLabel
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withTheme } from 'styled-components';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  dialogStyle: {
    color: '#777777'
    // height: 'calc(100vh - 50px)'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#558de8'
  },
  active: {
    borderRadius: 60,
    padding:'5%',
    color:'white',
  },
  inactive: {

  }
}));

export default function DialogBox(props) {
  const classes = useStyles();
  const [openDialog] = useState(props.open);

  const DialogTitle = withStyles(useStyles)(props => {
    const {children, classes, onClose, closeButton, ...other} = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Grid container>
          <Grid item xs={11}>
            <Typography variant="h4" style={{margin: '1%'}}>
              {children}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            {onClose && closeButton ? (
              <IconButton
                aria-label="close"
                style={{float: 'right'}}
                className={classes.closeButton}
                onClick={onClose}>
                <CloseIcon />
              </IconButton>
            ) : null}
          </Grid>
        </Grid>
      </MuiDialogTitle>
    );
  });

  const {
    stepperLable,
    title,
    children,
    activeStep,
    handleCloseDialog,
    srceenWidth
  } = props;

  const closeButton =
    props.closeButton === undefined ? true : props.closeButton;

  return (
    <div>
      <Dialog
        classes={{paper: classes.dialogStyle}}
        open={openDialog}
        onClose={() => handleCloseDialog()}
        maxWidth={srceenWidth ? srceenWidth : 'md'}
        fullWidth={true}>
        <DialogTitle
          onClose={() => handleCloseDialog()}
          closeButton={closeButton}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container>
            {stepperLable && stepperLable.length > 0 && (
              <Grid item xs={12}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {stepperLable.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
            )}
            {children}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
