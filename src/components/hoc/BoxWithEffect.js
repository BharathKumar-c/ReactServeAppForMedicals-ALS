import React, {useState} from 'react';
import {Box, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    transition: 'transform 0.15s ease-in-out'
  },
  cardHovered: {
    transform: 'scale3d(1.05, 1.05, 1)'
  }
}));

function BoxWithEffect(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    raised: false,
    shadow: 1
  });
  return (
    <Box
      {...props}
      style={{
        transition: 'transform 0.15s ease-in-out'
      }}
      classes={{root: state.raised ? classes.cardHovered : ''}}
      onMouseOver={() => setState({raised: true, shadow: 3})}
      onMouseOut={() => setState({raised: false, shadow: 1})}
      raised={state.raised}
      zdepth={state.shadow}
    />
  );
}

export default BoxWithEffect;
