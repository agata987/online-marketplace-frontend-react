import React from 'react'
import {connect} from 'react-redux'
import {createOffer} from '../../redux/actions/offers/createOfferActions'
import { Button, Form} from 'semantic-ui-react'

const CreateOfferForm = props => {

    return(
        <Form>
            <h2>Tworzenie nowego ogłoszenia</h2>
            
        </Form>
    )
    
}

const mapStateToProps = state => {
    return {
        offer: state.createOfferReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createOffer: offerData => dispatch(createOffer(offerData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOfferForm)