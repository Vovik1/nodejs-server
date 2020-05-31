import React, { useState } from "react";
import { Accordion, Form, Menu } from 'semantic-ui-react'
import Users from "./Users/Users";
import LecturesTable from "./Lectures/LecturesTable"
import CreatePage from "../Lectures/Create/CreatePage.jsx";



const Admin = () => {
    const [activeIndex, setActiveIndex] = useState('0');
    const [activeItem, setActiveItem] = useState('users');
    const handleClick = (e, { index, name }) => {
        if (name){
            setActiveItem(name);
        }
        const newIndex = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
    };

    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    };


    return (
        <div className="adminMenu" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '20px' }}>
            <Accordion as={Menu} pointing vertical>
                <Accordion.Title as={Menu.Item}
                    active={activeItem === 'users'}
                    name='users'
                    content='Users'
                    index={0}
                    onClick={handleClick}
                    icon={{ display: 'none' }}
                    style={{ padding: '14px 20px' }} />
                <Accordion.Title as={Menu.Item}
                    active={ activeIndex === 1}
                    name='All lectures'
                    content='Lectures'
                    index={1}
                    onClick={handleClick}
                    style={{ padding: '14px 20px' }} />
                <Accordion.Content 
                active={activeIndex === 1} 
                content={
                    <div>
                        <Menu.Item
                            name='All lectures'
                            active={activeItem === 'All lectures'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            name='Add new'
                            active={activeItem === 'Add new'}
                            onClick={handleItemClick}
                        />
                    </div>
                } />
            </Accordion>
            <div className="adminContent" style={{ width: '70%', border: '1px solid lightgray', borderRadius: '4px', minHeight: 'calc(100vh - 240px)', position: 'relative' }}>
                {activeItem === 'users' && <Users />}
                {activeItem === 'All lectures' && <LecturesTable />}
                {activeItem === 'Add new' && <CreatePage />}
            </div>
        </div>
    )
};

export default Admin;