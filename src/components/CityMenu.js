import React from 'react'
import { Dropdown, Menu, MenuHeader } from 'semantic-ui-react'

class CityMenu extends React.Component {

    render(){
        const voivodeships_cities = this.props.voivodeships

        const menuItems = [<Menu.Header>Województwa</Menu.Header>,]
        for (const key in voivodeships_cities){
            let cities = voivodeships_cities[key].cities
            let cities_names = [<Menu.Header>Miasta</Menu.Header>,]
            for(const key2 in cities){
                cities_names.push(<Dropdown.Item onClick={(e) => this.props.onClick(e,cities[key2].id, cities[key2].name) }>{cities[key2].name}</Dropdown.Item>)
            }
            menuItems.push(
                <Dropdown item text={voivodeships_cities[key].name}>
                    <Dropdown.Menu direction='right' style={{overflow: 'auto', maxHeight: 400 }}>
                    {cities_names}
                    </Dropdown.Menu>
                </Dropdown>
            )
        }

        return(
            <Menu vertical stackable>
                <Dropdown item text={this.props.city} direction='right' fluid>
                    <Dropdown.Menu direction='right'>
                    {menuItems}
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        )
    }
}

export default CityMenu
