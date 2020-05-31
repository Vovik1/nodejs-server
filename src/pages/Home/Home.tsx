import React from "react";
import Banner from "./Banner/Banner"
import AfterBanner from "./AfterBanner/AfterBanner";
import RecomendedLections from "./RecomendedLections/RecomendedLections";
import StudentsViewing from "./StudentsViewing/StudentsViewing";
import Recommendations from "./Recommendations/Recommendations";
import Categories from "./Categories/Categories";
import Reviews from "./Reviews/Reviews";
import {LectionWrapper} from './style'

export default function Home() {

    return(
        <div>
            <Banner />
            <AfterBanner />
            
            <RecomendedLections />
            
            <LectionWrapper>
            <StudentsViewing />
            </LectionWrapper>

            <Recommendations />
            <Categories />
            <Reviews /> 

        </div>
    )
}
