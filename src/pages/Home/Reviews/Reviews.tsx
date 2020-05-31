import React from "react";
import classes from './Reviews.module.css';
import TrustedCompanies from "./TrustedCompanies/TrustedCompanies";
import Offer from "./Offer/Offer";

const Reviews = () => {

  return (
    <div className={classes.wrapperBG}>
      <div className={classes.wrapper}>
        <p className={classes.title}>What our students have to say</p>
        <div className={classes.flexCategories}>

          <div className={classes.container}>
            <div className={classes.imgAndName}>
              <img src='https://i.udemycdn.com/user/100x100/8872940_27b4_3.jpg' alt = 'Author' className={classes.image}></img >
              <div className={classes.author}>Borivoje</div>
            </div>
            <p className={classes.text}>StudyHard is a life saver. I don't have the time or money for a college education. My goal is to become a freelance web developer, and thanks to Udemy, I'm really close.</p>
          </div>

          <div className={classes.container}>
            <div className={classes.imgAndName}>
              <img src='https://i.udemycdn.com/user/100x100/22869844_edad.jpg' alt = 'Author' className={classes.image}></img >
              <div className={classes.author}>Dipesh</div>
            </div>
            <p className={classes.text}>I believe in lifelong learning and StudyHard is a great place to learn from experts. I've learned a lot and recommend it to all my friends.</p>
          </div>

          <div className={classes.container}>
            <div className={classes.imgAndName}>
              <img src='https://i.udemycdn.com/user/100x100/26154780_76c8.jpg' alt = 'Author' className={classes.image}></img >
              <div className={classes.author}>Kathy</div>
            </div>
            <p className={classes.text}>My children and I LOVE StudyHard! The courses are fantastic and the instructors are so fun and knowledgeable. I only wish we found it sooner.</p>
          </div>

        </div>
        <TrustedCompanies />
        <Offer />
      </div>
    </div>
  )
}

export default Reviews;