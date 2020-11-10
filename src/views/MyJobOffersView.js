import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchUserOffers} from '../redux/actions/jobs/userJobOffersActions'
import MyJobOffers from '../components/MyJobOffers'
import {Button} from 'semantic-ui-react'

const MyOffersView = props => {

    useEffect(() => {
        if (props.user && !props.offers.offers_fetched)
            props.fetchUserOffers(props.user.id)

    },[props.user])

 
    return (
        <div style={{marginTop: '20px'}}>
            <a href='/create-joboffer'><Button color='linkedin'>Dodaj ofertę</Button></a> 
            <h2>Oferty pracy utworzone przez Ciebie: </h2>
            {props.offers.offers_fetched ? <MyJobOffers items={props.offers.offers}/> : null}
        </div>
    );
    
}

const mapStateToProps = state => {
    return {
      offers: state.userJobOffersReducer,
      user: state.authReducer.user,
    }
}
  

const mapDispatchToProps = dispatch => {
    return {
        fetchUserOffers: user_id => dispatch(fetchUserOffers(user_id)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MyOffersView)