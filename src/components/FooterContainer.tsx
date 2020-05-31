import React from 'react';
import LogoImg from "../assets/images/logoblack.png";
import {Segment, Menu} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import Logo from "./Logo";

const FooterContainer = () => {
    return (
        <Segment inverted
                 attached={"bottom"}
                 style={{
                     borderRadius: '0',
                     padding: '10px 30px',
                     backgroundColor: 'white',
                     borderBottom: '6px solid teal',
                     color: 'black',
                     marginTop: '20px'
                 }}>
            <Menu attached='top'
                  inverted
                  secondary
                  style={{height: "50px"}}>
                <Menu.Item as={Link}
                           to="/"
                >
                    <Logo image={LogoImg}/>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item as="a" id="footer__link">
                        Terms of use
                    </Menu.Item>
                    <Menu.Item as="a" id="footer__link">
                        Privacy policy
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </Segment>
    )
};

export default FooterContainer;