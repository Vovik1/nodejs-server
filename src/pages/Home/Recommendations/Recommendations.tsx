import React from "react";
import classes from './Recommendations.module.css';
import { Button } from 'semantic-ui-react';

const Recommendations = () => {
  return (
    <div>
      <div className={classes.backgroundThinLine}></div>
      <div className={classes.backgroundThickLine}>
        <p className={classes.title}>Get personalized recommendations</p>
        <p className={classes.text}>Answer a few questions for your top picks</p>
        <Button inverted color='red'>
          Get started
        </Button>
      </div>
    </div>
  )
}

export default Recommendations;