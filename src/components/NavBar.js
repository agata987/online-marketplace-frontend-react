import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuExampleSecondaryPointing extends Component {
    state = { activeItem: 'Ogloszenia' }
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
        <div>
          <Menu pointing secondary>
            <Menu.Item
              name='Ogloszenia'
              active={activeItem === 'Ogloszenia'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Oferty pracy'
              active={activeItem === 'Oferty pracy'}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name=''
                    icon='envelope'
                    active={activeItem === ''}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Moje konto'
                    active={activeItem === 'Moje konto'}
                    onClick={this.handleItemClick}
                />
            </Menu.Menu>
          </Menu>
        </div>
      )
    }
  }