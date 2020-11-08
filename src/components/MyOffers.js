import React, {useState} from 'react'
import {connect} from 'react-redux'
import {getCity} from '../redux/actions/checkCityActions'
import {deleteOffer} from '../redux/actions/offers/userOffersActions'
import {Item, Button} from 'semantic-ui-react'
import MyOfferView from './MyOfferView'

const Offers = props => {
  const [showOffer, setShowOffer] = useState(false)
  const [currentOffer, setCurrentOffer] = useState(null)

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

  return (
    <div>
      <MyOfferView offer={currentOffer} city={props.city} onRequestClose={() => setShowOffer(false)} isOpen={showOffer}/>

      <Item.Group relaxed>
      {props.items.map(item => 
        <Item style={{border: '1px solid', borderColor: '#d0d3d8', padding: '20px', borderRadius: '5px', maxWidth: '800px', backgroundColor: 'white', borderRadius: '15px'}}>
          <Item.Image size='small' style={{borderRadius: '15px'}} src={item.image ? item.image : 'https://react.semantic-ui.com/images/wireframe/image.png'} />

          <Item.Content verticalAlign='bottom'>
            <Item.Header style={{marginTop: '5px'}}>{item.name}</Item.Header>
            <Item.Meta>
              <div className='price' style={{marginTop: '2px'}}>{item.price ? <span>{item.price} zł</span> :  <span>brak ceny</span>}</div>
              <div className='stay' style={{mamarginTop: '2px'}}>{item.creation_date}</div>
            </Item.Meta>
            <Item.Description style={{display: 'flex', flexDirection: 'row', justifyContent: 'right'}}>
              <Button onClick={() => showOfferHandle(item)} color='gray'>
              <Button.Content>Zobacz</Button.Content>
            </Button>
            <Button onClick={() => showOfferHandle(item)} color='gray'>
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