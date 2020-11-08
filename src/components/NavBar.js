import React, {useState} from 'react'
import {connect} from 'react-redux'
import {clearTokens} from '../redux/actions/authActions'
import {Link} from 'react-router-dom'
import {Dropdown, Icon, Menu} from 'semantic-ui-react'

const NavBar = props => {
    const [activeItem, setActiveItem] = useState('Ogłoszenia')
    const handleItemClick = (e, {name}) => setActiveItem(name)

    const logout = () => {
      props.logout()
      alert('Zostałeś wylogowany.')
    }

    return (
        <Menu pointing secondary size='massive' color='blue'>
          <Menu.Item 
            as={Link} 
            to='/'
            name='Ogłoszenia'
            active={activeItem === 'Ogłoszenia'}
            onClick={handleItemClick}
          />
          <Menu.Item 
            as={Link} 
            to='/jobs'
            name='Oferty pracy'
            active={activeItem === 'Oferty pracy'}
            onClick={handleItemClick}
          />
          <Menu.Menu position='right'>
              {
                props.loggedIn ?
                <Menu.Item
                  as={Link} 
                  to='/messages'
                  name=''
                  icon='envelope'
                  active={activeItem === ''}
                  onClick={handleItemClick}
               />
               : null
              }

              {
                props.loggedIn ?
                <Dropdown text='Moje konto' pointing className='link item' onClick={handleItemClick}>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/favourites'>
                        <Icon name='heart'/>
                        Ulubione
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to='/my-offers'>
                        <Icon name='newspaper outline'/>
                        Moje ogłoszenia
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to='/my-job-offers'>
                        <Icon name='suitcase'/>
                        Moje oferty pracy
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to='/settings'>
                        <Icon name='setting'/>
                        Ustawienia
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logout}>
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
                  onClick={handleItemClick}
                />
              }
          </Menu.Menu>
        </Menu>
    )
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(clearTokens()),
  }
}

export default connect(null, mapDispatchToProps)(NavBar)