import styled from 'styled-components';

export const LectionWrapper = styled.div `
    .slick-arrow{
        background-color: #80808070;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        z-index: 1;
    }
    .slick-slide{
        width: 242px;
        height: 280px;
    }
    .slick-track{
        height: 295px;
    }
    .slick-list{
        width: 102%;
    }
    @media screen and (max-width:1200px){
            .slick-list{
                margin: auto;
                width: 89%;
            }
            .slick-prev {
                left: 40px;
            }
            .slick-next {
                right: 16px;
            }
        }

    @media screen and (max-width:768px){
        .slick-prev {
            left: 17px;
        }
    }
`;

export const LectionWrapperNav = styled.div `
    .slick-arrow{
        background-color: #80808070;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        z-index: 1;
    }
    .slick-slide{
        height: 283px;
        outline: none;
    }
    .slick-list{
        height: 283px;
        width: 813px;
        outline: none;
    }
   
    .slick-prev{
        margin-left:12px;
    }
    .slick-next{
        margin-right: 3px;
    }
    @media screen and (max-width:768px){
        .slick-list {
            width: 601px;
        }
        .slick-next {
            right: -8px;
        }
        .slick-prev {
            left: -31px;
        }
    }
`;