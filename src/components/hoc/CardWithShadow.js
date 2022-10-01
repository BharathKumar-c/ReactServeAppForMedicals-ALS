import React, {useState} from 'react';
import {Card, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    transition: 'transform 0.15s ease-in-out',
    boxShadow:
      '0 0 1px 0 rgba(221, 237, 253), 0 3px 7px -2px rgb(0 70 139 / 20%)'
  },
  cardHovered: {
    transform: 'scale3d(1.05, 1.05, 1)',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.31), 0 6px 15px -2px rgb(0 70 139 / 40%)'
  }
}));

function CardWithShadow(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    raised: false,
    shadow: 1
  });
  return (
    <Card
      {...props}
      style={{
        transition: 'transform 0.15s ease-in-out'
      }}
      classes={{root: state.raised ? classes.cardHovered : classes.root}}
      onMouseOver={() => setState({raised: true, shadow: 3})}
      onMouseOut={() => setState({raised: false, shadow: 1})}
      raised={state.raised}
      zdepth={state.shadow}
    />
  );
}

export default CardWithShadow;
