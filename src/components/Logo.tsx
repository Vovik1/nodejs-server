import React from 'react';
import {Image} from "semantic-ui-react";

interface Props {
    image: string
}

const Logo = ({image}: Props) => {
    return (
        <Image
            src={image}
            size="tiny"
            alt="Logo"
            style={{width: '100px'}}
        />
    )
};
export default Logo;
