import React, { Component } from 'react'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'

export default class MenuExampleSecondaryPointing extends Component {
    state = { activeItem: 'Ogłoszenia' }
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
          <Menu pointing secondary size='massive' color='blue'>
            <Menu.Item
              name='Ogłoszenia'
              active={activeItem === 'Ogłoszenia'}
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
                    link='messages/'
                />
                <Dropdown text='Moje konto' pointing className='link item' onClick={this.handleItemClick}>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Icon name='star'/>
                            Ulubione
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Icon name='setting'/>
                            Ustawienia
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Icon name='sign out'/>
                            Wyloguj się
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
          </Menu>
      )
    }
  }