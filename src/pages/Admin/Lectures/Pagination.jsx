import React, { useState } from 'react';
import { Menu, Table } from 'semantic-ui-react';

const Pagination = ({ lecturesPerPage, totalLectures, paginate }) => {
    const [activeItem, setActiveItem] = useState(1);

    const handleItemClick = (number) => setActiveItem(number);
    
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalLectures / lecturesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan='4'>
                    <Menu floated='right' pagination>
                        {pageNumbers.map(number => (
                            <Menu.Item
                                key = {number}
                                name={`${number}`}
                                active={activeItem === number}
                                onClick={() => {
                                    handleItemClick(number)
                                    paginate(number)
                                }}>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    )
}

export default Pagination