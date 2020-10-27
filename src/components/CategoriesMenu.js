import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'

export default class OffersCategoriesMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu compact icon='labeled'>
        {this.props.categories.map(categorie => 
          <Menu.Item 
            key={categorie.name}
            name={categorie.name}
            active={activeItem === categorie.name}
            onClick={this.handleItemClick}
          >
            <Icon name={categorie.icon}/>
            {categorie.name}
          </Menu.Item>
        )}
      </Menu>
    )
  }
}
