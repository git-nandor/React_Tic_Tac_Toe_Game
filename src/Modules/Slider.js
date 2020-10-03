import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles({
  root: {
    width: '5em',
    '& .mark': {
      color: 'red',
    },
  },

  sliderTitle:{
    'font-size': "0.8rem",
    'padding-top': "0.4rem",
  },

  ownSlider: {
    color: "#3b8ba09c",

    '& .MuiSlider-thumb': {
      '&:hover': { 
        "box-shadow": "0px 0px 0px 8px rgb(98 218 251 / 0.1)", 
      },
    },

    '& .MuiSlider-markActive': {
      'background-color': "#62dafb",
    }
  }

});


export default function DiscreteSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(5);
  const e= 'bakker';

  props.changeBoardSize(e,value);

  const handleSliderChange = (event, newValue) => {
    
    setValue(newValue);  
    props.changeBoardSize(event,newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" className={classes.sliderTitle} gutterBottom>
        Board Size:
      </Typography>
      <Slider className={classes.ownSlider}
        defaultValue={5}
        aria-labelledby="discrete-slider" 
        step={1}
        marks
        min={3}
        max={6}
        value={typeof value === 'number' ? value : 0}
        onChange={handleSliderChange}
      />
       
    </div>
  );
}
