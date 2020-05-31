import React from "react";
import classes from './Categories.module.css';

const Categories = () => {

  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>Top categories</p>
      <div className={classes.flexCategories}>

        <div className={classes.row}>
          <div className={classes.text}>Development</div>
          <div className={classes.text}>Business</div>
          <div className={classes.text}>IT and Software</div>
          <div className={classes.text}>Design</div>
        </div>

        <div className={classes.row}> 
          <div className={classes.text}>Marketing</div>
          <div className={classes.text}>Personal Development</div>
          <div className={classes.text}>Photography</div>
          <div className={classes.text}>Music</div>
        </div>

      </div>
    </div>
  )
}

export default Categories;