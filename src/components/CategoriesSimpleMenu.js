import React from 'react'
import {Menu, Dropdown} from 'semantic-ui-react'

const CategoriesSimpleMenu = props =>{

    return(
        <Menu vertical stackable>
            <Dropdown item text={props.categoryName} direction='right' fluid>
                <Dropdown.Menu>
                {props.categories.map(categorie => 
                    <Dropdown.Item
                        key={categorie.id}
                        onClick={(e) => props.onClick(e, categorie.id, categorie.name) }
                    >
                        {categorie.name}
                    </Dropdown.Item >)}
                </Dropdown.Menu>
            </Dropdown>
        </Menu>

    )

}

export default CategoriesSimpleMenu
