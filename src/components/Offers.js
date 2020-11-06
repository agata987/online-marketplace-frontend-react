import React, {useState} from 'react'
import {connect} from 'react-redux'
import {getCity} from '../redux/actions/checkCityActions'
import {Item, Button, Icon} from 'semantic-ui-react'
import OfferView from './OfferView'

const Offers = props => {
  const [showOffer, setShowOffer] = useState(false)
  const [currentOffer, setCurrentOffer] = useState(null)

  const showOfferHandle = item => {
    setCurrentOffer({...item})
    props.getCity(item.city_id)
    setShowOffer(true)
  }

  return (
    <div>
      <OfferView offer={currentOffer} city={props.city} onRequestClose={() => setShowOffer(false)} isOpen={showOffer}/>

      <Item.Group relaxed>
      {props.items.map(item => 
        <Item>
          <Item.Image size='small' src={item.image ? item.image : 'https://react.semantic-ui.com/images/wireframe/image.png'} />

          <Item.Content verticalAlign='middle'>
          <Item.Header>{item.name}</Item.Header>
            {item.price ? <Item.Description>{`cena: ${item.price} zł`}</Item.Description> : null}
            <Item.Description>{`${item.creation_date}`}</Item.Description>
            <Item.Description>
              <Button onClick={() => showOfferHandle(item)} animated='vertical'>
              <Button.Content visible>Sprawdź ofertę</Button.Content>
              <Button.Content hidden>
                <Icon name='shop' />
              </Button.Content>
            </Button>
            </Item.Description>
            <Item.Extra>
              <a href='#' style={{float: "right"}}><Icon size='large' name='heart outline'/></a>
            </Item.Extra>
          </Item.Content>
        </Item>)}
      </Item.Group>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    city: state.checkCityReducer.city,
  }
}


const mapDispatchToProps = dispatch => {
  return {
      getCity: id => dispatch(getCity(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers)