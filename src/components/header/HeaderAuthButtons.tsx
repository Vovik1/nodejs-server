import React, {Fragment} from "react";
import {Button, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

interface Props {
    activeItem: string,
    handleActiveItem: (_: any, data: any) => any
}
const HeaderAuthButtons = ({activeItem, handleActiveItem}: Props) => {
    return (
        <Fragment>
            <Menu.Item>
                <Button as={NavLink}
                        active={activeItem === 'signin'}
                        onClick={handleActiveItem}
                        inverted
                        to="/signin"
                        style={{padding: '13px 40px'}}>
                    Sign in
                </Button>
            </Menu.Item>
            <Menu.Item style={{paddingRight: '0'}}>
                <Button as={NavLink}
                        active={activeItem === 'signup'}
                        onClick={handleActiveItem}
                        inverted
                        to="/signup"
                        style={{marginLeft: '0.5em', padding: '13px 40px'}}>
                    Sign Up
                </Button>
            </Menu.Item>
        </Fragment>
    )
};
export default HeaderAuthButtons;