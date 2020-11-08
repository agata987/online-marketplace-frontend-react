import React, {useState} from 'react'
import {connect} from 'react-redux'
import {getCity} from '../redux/actions/checkCityActions'
import {
    Item, 
    Button, 
    Icon
} from 'semantic-ui-react'
// import JobOfferView from './JobOfferView'


const JobOffers = props => {
    // const [showOffer, setShowOffer] = useState(false)
    // const [currentOffer, setCurrentOffer] = useState(null)

    const showOfferHandle = item => {
        // setCurrentOffer({...item})
        // props.getCity(item.city_id)
        // setShowOffer(true)
    }

    return (
    <div>
        {/* <JobOfferView offer={currentOffer} city={props.city} onRequestClose={() => setShowOffer(false)} isOpen={showOffer}/> */}
        <Item.Group relaxed>
        {props.items.map(item=> (
        <Item style={{border: '5px solid #cdd9e5', padding: '20px', maxWidth: '800px', backgroundColor: 'white', borderRadius: '15px'}}>
            <Item.Content>
                <Item.Header style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div>
                        {item.name}
                    </div>
                    <div>
                        <div>{item.min_salary}{item.max_salary ? <span> - {item.max_salary}</span> : null} zł</div>
                    </div>
                </Item.Header>
                <Item.Meta>
                    <div className='stay'>{item.creation_date}</div>
                </Item.Meta>
                <Item.Description style={{display: 'flex', flexDirection: 'row', justifyContent: 'right'}}>
                    <Button onClick={() => showOfferHandle(item)} color='orange' animated='vertical' size='medium'>
                    <Button.Content visible>Sprawdź</Button.Content>
                    <Button.Content hidden>
                        <Icon name='angle double right'/>
                    </Button.Content>
                    </Button>
                </Item.Description>
            </Item.Content>
        </Item>
        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(JobOffers)
