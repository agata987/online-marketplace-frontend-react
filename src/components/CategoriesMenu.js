import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'

export default class OffersCategoriesMenu extends Component {
  
  render() {
    return (
      <Menu size='large' compact icon='labeled' style={{overflow: 'auto', maxWidth: '100%', backgroundColor: '#cdd9e5'}}>
        {this.props.categories.map(categorie => 
          <Menu.Item 
            key={categorie.id}
            name={categorie.id}
            active={this.props.activeItem === categorie.id}
            onClick={this.props.handleItemClick}
          >
            <Icon name={categorie.icon} style={{color: '#344a53'}}/>
            {categorie.name}
          </Menu.Item>
        )}
      </Menu>
    )
  }
}
