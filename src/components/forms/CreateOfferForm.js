import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {createOffer} from '../../redux/actions/offers/createOfferActions'
import { fetchCategories } from '../../redux/actions/offers/offerCategoriesActions'
import { fetchCities } from '../../redux/actions/citiesActions'
import { Button, Form} from 'semantic-ui-react'

const CreateOfferForm = props => {
    useEffect(() => {
        if (!props.categories.categories_fetched)
            props.fetchCategories()

        if (!props.cities.fetched)
            props.fetchCities()
    },[])

    const [offerData, setOfferData] = useState({
        user_id: props.user.id,
        city_id: null,
        category_id: null,
        name: null,
        price: null,
        description: null,
    })

    const onSubmit = () => {
        // jakies sprawdzanie czy pola te co trzeba są uzupełnione ?
        // ...

        props.createOffer(offerData)
    }

    return(
        <Form onSubmit={onSubmit}>
            <h2>Tworzenie nowego ogłoszenia</h2>

            <Button type='submit' size='large'>Utwórz ofertę</Button>
        </Form>
    )
    
}

const mapStateToProps = state => {
    return {
        offer: state.createOfferReducer,
        categories: state.offerCategoriesReducer,
        cities: state.citiesReducer,
        user: state.authReducer.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createOffer: offerData => dispatch(createOffer(offerData)),
        fetchCategories: () => dispatch(fetchCategories()),
        fetchCities: () => dispatch(fetchCities()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOfferForm)