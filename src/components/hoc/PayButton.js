import React from 'react';
import {Button, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  nextStep: {
    background: '#EC5269',
    color: 'white',
    textTransform: 'none',
    borderRadius: 10,
    width: 160,
    margin: '1%'
  }
}));

export default function PayButton({
  amount,
  handlePayAmount,
  paymentLoader,
  disabled = false,
  customName
}) {
  const classes = useStyles();
  return (
    <Button
      disabled={paymentLoader}
      variant="contained"
      color="primary"
      className={classes.nextStep}
      style={{margin: '10px'}}
      onClick={() => handlePayAmount()}>
      {customName && customName}
      {!customName && 'Pay - $' + amount}
      {paymentLoader && (
        <CircularProgress
          style={{marginLeft: 10, color: 'white'}}
          size="1rem"
        />
      )}
    </Button>
  );
}
