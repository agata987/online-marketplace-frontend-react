import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'

export default class OffersCategoriesMenu extends Component {
  
  render() {
    return (
      <Menu compact icon='labeled' style={{overflow: 'auto', maxWidth: '100%' }}>
        {this.props.categories.map(categorie => 
          <Menu.Item 
            key={categorie.name}
            name={categorie.name}
            active={this.props.activeItem === categorie.name}
            onClick={this.props.handleItemClick}
          >
            <Icon name={categorie.icon}/>
            {categorie.name}
          </Menu.Item>
        )}
      </Menu>
    )
  }
}
