import React from "react";
import classes from './AfterBanner.module.css';
import { Icon } from 'semantic-ui-react';

const AfterBanner = () => {

  return (
    <div>
      <div className={classes.background}>

        <div className={classes.container}>
          <Icon className='huge check circle outline' id={classes.mainBlock}></Icon>
          <Icon className='big check circle outline' id={classes.block768}></Icon>
          <div>
            <h2 className={classes.title}> 100 online courses</h2>
            <p className={classes.text}>Explore a variety of fresh topics</p>
          </div>
        </div>

        <div className={classes.container}>
          <Icon className='huge tasks' id={classes.mainBlock}></Icon>
          <Icon className='big tasks' id={classes.block768}></Icon>
          <div>
            <h2 className={classes.title}>Expert instruction</h2>
            <p className={classes.text}>Find the right instructor for you</p>
          </div>
        </div>

        <div className={classes.container}>
          <Icon className='huge history' id={classes.mainBlock}></Icon>
          <Icon className='big history' id={classes.block768}></Icon>
          <div>
            <h2 className={classes.title}>Lifetime access</h2>
            <p className={classes.text}>Learn on your schedule</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AfterBanner;