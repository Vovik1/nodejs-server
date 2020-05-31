import React from "react";
import classes from './NavBar.module.css';

const NavBar = () => {

  return (
    <nav className={classes.nav}>

      <div className={classes.item}>
        <button><a>Business</a> </button>
      </div>

      <div className={classes.item} >
        <button><a>Design</a></button>
      </div>

      <div className={classes.item}>
        <button><a>Photography</a></button>
      </div>

      <div className={classes.item}>
        <button><a>Development</a></button>
      </div>

      <div className={classes.item}>
        <button><a>Marketing</a></button>
      </div>

      <div className={classes.item}>
        <button><a>It & software</a></button>
      </div>

      <div className={classes.item}>
        <button><a>Personal Development</a></button>
      </div>

    </nav>
  )
}

export default NavBar;