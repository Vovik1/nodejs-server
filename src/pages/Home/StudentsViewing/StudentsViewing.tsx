import React from "react";
import classes from './StudentsViewing.module.css';
import CardItem from '../RecomendedLections/Lections/CardItem'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { connect, ConnectedProps } from "react-redux";
import { getLectures } from "../../../store/actions/getLectures";
import { RootState } from "../../../store";


const mapStateToProps = (state: RootState) => ({
  lecturesList: state.lectures.lectures,
  lecturesLoading: state.lectures.loading
});

const mapDispatchToProps = (dispatch: Function) => ({
  getLectures: () => dispatch(getLectures())
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const StudentsViewing = ({lecturesList, lecturesLoading}: PropsFromRedux) => {

  const renderLectures = (arr: any) => {
    console.log(arr)
    if(!lecturesLoading && lecturesList){
      return arr.map((item: any, index: any) => {
        return (
          <CardItem item={item} key={index} />
        )
      })
    }
  }

  const lectionCard = renderLectures(lecturesList);

  const settings = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  const settings_2 = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  const settings_3 = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 2,
    slidesToScroll: 2
  };

  return (
    <div className={classes.wrapper}>
      <p className={classes.textStudent}>Students are viewing</p>
      
      <Slider {...settings} className={classes.slider_1}>
        {lectionCard}
      </Slider>

      <Slider {...settings_2} className={classes.slider_2}>
        {lectionCard}
      </Slider>

      <Slider {...settings_3} className={classes.slider_3}>
        {lectionCard}
      </Slider>

    </div>
  )
}

export default connector(StudentsViewing);
