import React from "react";
import classes from './Lections.module.css';
import CardItem from "./CardItem";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { connect, ConnectedProps } from "react-redux";
import { getLectures } from "../../../../store/actions/getLectures";
import { RootState } from "../../../../store";

const mapStateToProps = (state: RootState) => ({
  lecturesList: state.lectures.lectures
});

const mapDispatchToProps = (dispatch: Function) => ({
  getLectures: () => dispatch(getLectures())
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Lections = ({ lecturesList }: PropsFromRedux) => {

  const renderLectures = (arr: any) => {
    if(arr!== undefined){
      return arr.map((item: any, index: any) => {
        return (
          <CardItem item={item} key={index} />
        )
      })
    }
  }

  const lectionCard = renderLectures(lecturesList);

  const settings_1 = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  const settings_2 = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 2,
    slidesToScroll: 2
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.cardsFlex}>
        <Slider {...settings_1} className={classes.slider_1}>
          {lectionCard}
        </Slider>
        <Slider {...settings_2} className={classes.slider_2}>
          {lectionCard}
        </Slider>
      </div>
    </div>
  )
}


export default connector(Lections);

