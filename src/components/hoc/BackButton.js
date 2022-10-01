import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  goBackStyle: {
    background: '#EC5269',
    color: 'white',
    textTransform: 'none',
    borderRadius: 10
    // width: 160
  }
}));

export default function BackButton(props) {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.goBackStyle}
      onClick={() => {
        history.goBack();
      }}>
      {props.children ? props.children : 'Back'}
    </Button>
  );
}
