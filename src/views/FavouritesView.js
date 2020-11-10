import React, {
    useEffect,
    useState
} from 'react'
import {connect} from 'react-redux'
import {fetchOffers} from '../redux/actions/offers/favouritesOffersActions'
import {fetchJobOffers} from '../redux/actions/jobs/favouritesJobOffersActions'
import Offers from '../components/Offers'
import JobOffers from '../components/JobOffers'
import {
    Button, 
    Icon, 
    Loader, 
    Menu,
    Message
  } from 'semantic-ui-react'

const FavouritesView = props => {

    const [activeTab, setActiveTab] = useState('Ogłoszenia')

    const handleItemClick = (e, { name }) => setActiveTab(name)


    useEffect(() => {
        props.fetchOffers()
        props.fetchJobOffers()
    },[])

    return (
        <div>
              <Message
                header='Ulubione'
                content='Tu znajdują się ogłoszenia i oferty pracy dodane do ulubionych.'
            />
            <Menu tabular>
                <Menu.Item
                    name='Ogłoszenia'
                    active={activeTab === 'Ogłoszenia'}
                    onClick={handleItemClick}
                > 

                </ Menu.Item>
                <Menu.Item
                    name='Oferty pracy'
                    active={activeTab === 'Oferty pracy'}
                    onClick={handleItemClick}
                >

                </ Menu.Item>
            </Menu>

            {activeTab === 'Ogłoszenia' ? (
                props.offers.fetched ? <Offers favourites items={props.offers.offers} /> : 
                <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}>
                    <Loader active inline />
                </div>
            ) :
                props.jobOffers.fetched ? <JobOffers items={props.jobOffers.offers} /> : 
                <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}>
                    <Loader active inline />
                </div>
            }
        </div>
    );

}

const mapStateToProps = state => {
    return {
      offers: state.favouritesOffersReducer,
      jobOffers: state.favouritesJobOffersReducer
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return {
      fetchOffers: () => dispatch(fetchOffers()),
      fetchJobOffers: () => dispatch(fetchJobOffers())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesView)