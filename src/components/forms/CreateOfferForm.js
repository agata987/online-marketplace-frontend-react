import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {createOffer} from '../../redux/actions/offers/createOfferActions'
import {fetchCategories} from '../../redux/actions/offers/offerCategoriesActions'
import {fetchCities} from '../../redux/actions/citiesActions'
import CityMenu from '../CityMenu'
import CategoriesSimpleMenu from '../CategoriesSimpleMenu'
import {FormField} from './FormField'
import {Button, Form, Input, TextArea} from 'semantic-ui-react'
import {NegativeMessage} from './NegativeMessage'

const CreateOfferForm = props => {
    useEffect(() => {
        if (!props.categories.categories_fetched)
            props.fetchCategories()

        if (!props.cities.fetched)
            props.fetchCities()
    },[])

    useEffect(() => {
        if (props.offer.done)
            props.redirect()

    }, [props.offer])

    const [offerData, setOfferData] = useState({
        user_id: props.user_id,
        city_id: null,
        category_id: null,
        name: '',
        price: null,
        description: '',
        image: null,
    })

    const [filterValues, setFilterValues] = useState({
        cityName: 'Wybierz miasto',
        categoryName: 'Wybierz kategorię'
    })

    const [emptyDropdownFields, setEmptyDropdownFields] = useState(false)

    const onSubmit = () => {
        if (!offerData.user_id || !offerData.city_id)
            setEmptyDropdownFields(true)
        else {
            const uploadData = new FormData()
            uploadData.append('user_id', offerData.user_id)
            uploadData.append('city_id', offerData.city_id)
            uploadData.append('category_id', offerData.category_id)
            uploadData.append('name', offerData.name)

            if (offerData.price !== null)
                uploadData.append('price', offerData.price)
            
            if (offerData.description.trim() !== '')
                uploadData.append('description', offerData.description)

            if (offerData.image !== null)
                uploadData.append('image', offerData.image)

            props.createOffer(uploadData) 
        }
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

    const uploadImageHandle = e => {
        e.persist()
        setOfferData({...offerData, image: e.target.files[0]})
    }

    return(
        <Form onSubmit={onSubmit}>
            <h2>Tworzenie nowego ogłoszenia</h2>
            {emptyDropdownFields ?(
                !offerData.city_id && !offerData.category_id ? <NegativeMessage message='Wybierz kategorię i miasto.'/> :
                !offerData.city_id ? <NegativeMessage message='Wybierz miasto.'/> :
                !offerData.category_id ? <NegativeMessage message='Wybierz kategorię.'/> : null
            ): null}
            <div style={{marginTop: '10px'}}>{props.cities.fetched ? <CityMenu city={filterValues.cityName}  voivodeships={props.cities.voivodeships} onClick={onClickCity}/> : <h3>Ładownaie miast...</h3>}</div>
            <div style={{margin: '10px 0 10px 0'}}>{props.categories.categories_fetched ? <CategoriesSimpleMenu categoryName={filterValues.categoryName}  categories={props.categories.categories} onClick={onClickCategory}/> : <h3>Ładownaie kategorii...</h3>}</div>

            <label>Tytuł oferty</label>
            <FormField 
                fieldError={props.offer.errors ? (props.offer.errors.name ? true : false) : false}
                content={props.offer.errors ? (props.offer.errors.name ? props.offer.errors.name : '') : ''}
                control={Input}
            >
                <input 
                    name='name'
                    value={offerData.name}
                    onChange={onChangeOfferName}
                    placeholder='Tytuł oferty'
                />
            </FormField>

            <label>Zdjęcie (opcjonalne):</label>
            <input onChange={uploadImageHandle} type='file' accept="image/*"/>

            { filterValues.categoryName !== 'Oddam za darmo' && filterValues.categoryName !== 'Zamienię' ?
                <div>
                <label>Cena (opcjonalne)</label>
                <FormField
                    fieldError={props.offer.errors ? (props.offer.errors.price ? true : false) : false}
                    content={props.offer.errors ? (props.offer.errors.price ? props.offer.errors.price : '') : ''}
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

            <label>Opis (opcjonalne)</label>
            <FormField 
                fieldError={props.offer.errors ? (props.offer.errors.description ? true : false) : false}
                content={props.offer.errors ? (props.offer.errors.description ? props.offer.errors.description : '') : ''}
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