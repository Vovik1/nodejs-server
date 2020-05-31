import React, {useState} from 'react';
import {Dropdown, Input} from "semantic-ui-react";
import Category from "../../models/category";

interface Props {
    categoriesList: Category[]
}

const HeaderCategories = ({categoriesList}: Props) => {
    const [isActiveDropdownCategories, setActiveDropdown] = useState(false);
    const [searchCategField, setSearchCategField] = useState('');
    const handleDropdownCategories = (status = false) => {
        setActiveDropdown(status);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCategField(event.target.value);
    };
    const searchChange = (list: Category[] = []) => {
        return list.filter(category => {
            return category.title.toLowerCase().includes(searchCategField.toLowerCase())
        })
    };
    const searchedCategories = searchChange(categoriesList);


    return (
        <Dropdown item text="Categories"
                  onMouseEnter={() => handleDropdownCategories(true)}
                  onMouseLeave={() => handleDropdownCategories()}
                  open={isActiveDropdownCategories}
        >
            <Dropdown.Menu style={{marginTop: 0}}>
                <Input
                    icon='search'
                    iconPosition='left'
                    value={searchCategField}
                    onChange={handleChange}/>
                <Dropdown.Menu scrolling>
                    {searchedCategories.map((category) => (
                        <Dropdown.Item key={category.id} text={category.title}
                                       onClick={() => handleDropdownCategories()}
                        />
                    ))}
                </Dropdown.Menu>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default HeaderCategories;