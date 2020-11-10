import React, {useState} from 'react'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {getCity} from '../redux/actions/checkCityActions'
import {deleteOffer} from '../redux/actions/jobs/userJobOffersActions'
import {
  Item, 
  Button,
  Icon
} from 'semantic-ui-react'
import MyJobOfferView from './MyJobOfferView'

const Offers = props => {
  const [showOffer, setShowOffer] = useState(false)
  const [currentOffer, setCurrentOffer] = useState(null)
  const [goToEditOffer, setGoToEditOffer] = useState(false)
  const [editOfferId, setEditOfferId] = useState(null)

  const showOfferHandle = item => {
    setCurrentOffer({...item})
    props.getCity(item.city_id)
    setShowOffer(true)
  }

  const deleteOffer = item => {
    if(props.user) {
        props.deleteOffer(item.id, props.user.id)
    }
  }

  const editOfferHandle = item => {
    setEditOfferId(item.id)
    setGoToEditOffer(true)
  }

  return (
    <div>
    {goToEditOffer ? <Redirect to={`/edit-joboffer/${editOfferId}`} /> : null}
      <MyJobOfferView offer={currentOffer} city={props.city} onRequestClose={() => setShowOffer(false)} isOpen={showOffer}/>

      <Item.Group relaxed>
      {props.items.map(item => 
        <Item style={{border: '5px solid', borderColor: '#cdd9e5', padding: '20px', borderRadius: '5px', maxWidth: '800px', backgroundColor: 'white', borderRadius: '15px'}}>
          <Item.Content verticalAlign='bottom'>
                <Item.Header style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div>
                        <span><Icon name='file alternate outline'/>{`   ${item.name}`}</span>
                    </div>
                    <div>
                        <div>{item.min_salary}{item.max_salary ? <span> - {item.max_salary}</span> : null} zł</div>
                    </div>
                </Item.Header>
                <Item.Meta>
                    <div className='stay'>{item.creation_date}</div>
                </Item.Meta>
            <Item.Description style={{display: 'flex', flexDirection: 'row', justifyContent: 'right'}}>
              <Button onClick={() => showOfferHandle(item)} color='gray'>
              <Button.Content>Zobacz</Button.Content>
            </Button>
            <Button onClick={() => editOfferHandle(item)} color='gray'>
              <Button.Content>Edytuj</Button.Content>
            </Button>
            <Button onClick={() => deleteOffer(item)} color='red'>
              <Button.Content>Usuń</Button.Content>
            </Button>
            </Item.Description>
          </Item.Content>
        </Item>)}
      </Item.Group>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    city: state.checkCityReducer.city,
    user: state.authReducer.user,
  }
}


const mapDispatchToProps = dispatch => {
  return {
      getCity: id => dispatch(getCity(id)),
      deleteOffer: (offer_id, user_id) => dispatch(deleteOffer(offer_id, user_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers)