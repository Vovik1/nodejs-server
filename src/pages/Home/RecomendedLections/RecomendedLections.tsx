import React from "react";
import classes from './RecomendedLections.module.css';
import NavBar from "./NavBar/NavBar";
import Lections from "./Lections/Lections";
import { LectionWrapperNav } from "../style";

const RecomendedLections = () => {
  return (
    <div className={classes.wrapper}>

      <div className={classes.info}>
        <h1 className={classes.title}>The world’s largest selection of courses</h1>
        <p className={classes.text}>Choose from over 100 online video courses with new additions published every month</p>
      </div>

      <div className={classes.wrapForCenter}>
        <NavBar />
        <LectionWrapperNav>
          <Lections />
        </LectionWrapperNav>
      </div>

    </div>
  )
}

export default RecomendedLections;