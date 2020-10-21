import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'

class NavBar extends Component {
    state = { 
      activeItem: 'Ogłoszenia',
    }  
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
      const { activeItem } = this.state

      return (
          <Menu pointing secondary size='massive' color='blue'>
            <Menu.Item 
              as={Link} 
              to='/'
              name='Ogłoszenia'
              active={activeItem === 'Ogłoszenia'}
              onClick={this.handleItemClick}
            />
            <Menu.Item 
              as={Link} 
              to='/jobs'
              name='Oferty pracy'
              active={activeItem === 'Oferty pracy'}
              onClick={this.handleItemClick}
              link='/jobs'
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    as={Link} 
                    to='/messages'
                    name=''
                    icon='envelope'
                    active={activeItem === ''}
                    onClick={this.handleItemClick}
                    link='messages/'
                />
                {
                  this.props.loggedIn ?
                  <Dropdown text='Moje konto' pointing className='link item' onClick={this.handleItemClick}>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to='/favourites'>
                          <Icon name='star'/>
                          Ulubione
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to='/settings'>
                          <Icon name='setting'/>
                          Ustawienia
                      </Dropdown.Item>
                      <Dropdown.Item>
                          <Icon name='sign out'/>
                          Wyloguj się
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> :
                  <Menu.Item 
                    as={Link}
                    to='/login'
                    name='Moje konto'
                    active={activeItem === 'Moje konto'}
                    onClick={this.handleItemClick}
                  />
                }
 
            </Menu.Menu>
          </Menu>
      )
    }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.userReducer.loggedIn
  }
}

export default connect(mapStateToProps)(NavBar)