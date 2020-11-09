import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {createJobOffer} from '../../redux/actions/jobs/createJobOfferActions'
import {fetchJobCategories} from '../../redux/actions/jobs/jobOffersCategoriesActions'
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
        min_salary: '',
        max_salary: '',
        description: '',
        company: '',
        remote: false,
    })

    const [filterValues, setFilterValues] = useState({
        cityName: 'Wybierz miasto',
        categoryName: 'Wybierz kategorię'
    })

    const [emptyDropdownFields, setEmptyDropdownFields] = useState(false)

    const onSubmit = () => {
        offerData.min_salary = offerData.min_salary.replace(',', '.')
        offerData.max_salary = offerData.max_salary.replace(',', '.')

        if (!offerData.category_id || !offerData.city_id)
            setEmptyDropdownFields(true)
        else props.createOffer(offerData)
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

    const onChangeOfferDescription = e => {
        e.persist();
        setOfferData({...offerData, description: e.target.value})
    }

    const onChangeMinSalary = e => {
        e.persist();
        setOfferData({...offerData, min_salary: e.target.value})
    }

    return(
        <Form onSubmit={onSubmit}>
            {emptyDropdownFields ?(
                !offerData.city_id && !offerData.category_id ? <NegativeMessage message='Wybierz kategorię i miasto.'/> :
                !offerData.city_id ? <NegativeMessage message='Wybierz miasto.'/> :
                !offerData.category_id ? <NegativeMessage message='Wybierz kategorię.'/> : null
            ): null}
            <div style={{marginTop: '10px'}}>
                {props.cities.fetched ? 
                    <CityMenu city={filterValues.cityName}  
                        voivodeships={props.cities.voivodeships} 
                        onClick={onClickCity}/> 
                    : <h3>Ładownaie miast...</h3>}</div>
            <div style={{margin: '10px 0 10px 0'}}>
                {props.categories.categories_fetched ? 
                    <CategoriesSimpleMenu 
                        categoryName={filterValues.categoryName}  
                        categories={props.categories.categories} 
                        onClick={onClickCategory}/> 
                    : <h3>Ładownaie kategorii...</h3>}</div>

            <label>Tytuł oferty:</label>
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

            <label>Wynagrodzenie minimalne:</label>
            <FormField 
                fieldError={props.offer.errors ? (props.offer.errors.min_salary ? true : false) : false}
                content={props.offer.errors ? (props.offer.errors.min_salary ? props.offer.errors.min_salary : '') : ''}
                control={Input}
            >
                <input 
                    name='min_salary'
                    value={offerData.min_salary}
                    onChange={onChangeMinSalary}
                    placeholder='Wynagrodzenie minimalne'
                />
            </FormField>

           

            <label>Opis (opcjonalne):</label>
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
        offer: state.createJobOfferReducer,
        categories: state.jobOfferCategoriesReducer,
        cities: state.citiesReducer,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createOffer: offerData => dispatch(createJobOffer(offerData)),
        fetchCategories: () => dispatch(fetchJobCategories()),
        fetchCities: () => dispatch(fetchCities()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOfferForm)