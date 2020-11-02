import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {createOffer} from '../../redux/actions/offers/createOfferActions'
import {fetchCategories} from '../../redux/actions/offers/offerCategoriesActions'
import {fetchCities} from '../../redux/actions/citiesActions'
import CityMenu from '../CityMenu'
import CategoriesSimpleMenu from '../CategoriesSimpleMenu'
import {FormField} from './FormField'
import {Button, Form, Input, TextArea} from 'semantic-ui-react'

const CreateOfferForm = props => {
    useEffect(() => {
        if (!props.categories.categories_fetched)
            props.fetchCategories()

        if (!props.cities.fetched)
            props.fetchCities()
    },[])

    const [offerData, setOfferData] = useState({
        user_id: props.user_id,
        city_id: null,
        category_id: null,
        name: null,
        price: null,
        description: null,
    })

    const [filterValues, setFilterValues] = useState({
        cityName: 'Wybierz miasto',
        categoryName: 'Wybierz kategorię'
    })

    const [emptyFields, setEmptyFields] = useState(false)

    const onSubmit = () => {
        // jakies sprawdzanie czy pola te co trzeba są uzupełnione ?
        // ...

        props.createOffer(offerData)
    }

    // city menu
    const onClickCity = (e, city_id, cityName) => {
        setOfferData({...offerData, city_id: city_id})
        setFilterValues({...filterValues, cityName: cityName})
    }

    // categories menu
    const onClickCategory = (e, category_id, categoryName) => {
        setOfferData({...offerData, category_id: category_id})
        setFilterValues({...filterValues, categoryName: categoryName})
    }

    const onChangeOfferName = e => {
        e.persist();
        setOfferData({...offerData, name: e.target.value})
    }

    const onChangeOfferPrice = e => {
        e.persist();
        setOfferData({...offerData, price: e.target.value})
    }

    const onChangeOfferDescription = e => {
        e.persist();
        setOfferData({...offerData, description: e.target.value})
    }

    return(
        <Form onSubmit={onSubmit}>
            <h2>Tworzenie nowego ogłoszenia</h2>
            <div style={{marginTop: '10px'}}>{props.cities.fetched ? <CityMenu city={filterValues.cityName}  voivodeships={props.cities.voivodeships} onClick={onClickCity}/> : <h3>Ładownaie miast...</h3>}</div>
            <div style={{margin: '10px 0 10px 0'}}>{props.categories.categories_fetched ? <CategoriesSimpleMenu categoryName={filterValues.categoryName}  categories={props.categories.categories} onClick={onClickCategory}/> : <h3>Ładownaie kategorii...</h3>}</div>

            <label>Tytuł oferty</label>
            <FormField 
                fieldError={props.offer.errors ? (props.offer.errors.name ? true : false) : emptyFields && offerData.name.trim() === '' ? true : false}
                content={props.offer.errors ? (props.offer.errors.name ? props.offer.errors.name : '') : emptyFields && offerData.name.trim() === '' ? 'To pole nie może być puste.' : ''}
                control={Input}
            >
                <input 
                    name='name'
                    value={offerData.name}
                    onChange={onChangeOfferName}
                    placeholder='Tytuł oferty'
                />
            </FormField>

            { filterValues.categoryName !== 'Oddam za darmo' && filterValues.categoryName !== 'Zamienię' ?
                <div>
                <label>Cena</label>
                <FormField
                    fieldError={props.offer.errors ? (props.offer.errors.price ? true : false) : emptyFields && offerData.price.trim() === '' ? true : false}
                    content={props.offer.errors ? (props.offer.errors.price ? props.offer.errors.price : '') : emptyFields && offerData.price.trim() === '' ? 'To pole nie może być puste.' : ''}
                    control={Input}
                >
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <input 
                            name='price'
                            value={offerData.price}
                            onChange={onChangeOfferPrice}
                            placeholder='np. 27,50'
                        />
                        <h5 style={{marginLeft: '10px'}}>zł</h5>
                    </div>
                </FormField>
                </div>
            : null}

            <label>Opis</label>
            <FormField 
                fieldError={props.offer.errors ? (props.offer.errors.description ? true : false) : emptyFields && offerData.description.trim() === '' ? true : false}
                content={props.offer.errors ? (props.offer.errors.description ? props.offer.errors.description : '') : emptyFields && offerData.description.trim() === '' ? 'To pole nie może być puste.' : ''}
                control={Input}
            >
                <TextArea 
                    name='description'
                    value={offerData.description}
                    onChange={onChangeOfferDescription}
                    placeholder='Opis oferty...'
                />
            </FormField>


            <Button style={{marginTop: '10px'}} type='submit' size='large'>Utwórz ogłoszenie</Button>
        </Form>
    )
    
}

const mapStateToProps = state => {
    return {
        offer: state.createOfferReducer,
        categories: state.offerCategoriesReducer,
        cities: state.citiesReducer,
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