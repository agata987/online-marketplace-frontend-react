import React, {
    useEffect,
    useState
} from 'react'
import {connect} from 'react-redux'
import {
    fetchOffers, 
    fetchPageOffers
} from '../redux/actions/jobs/jobOffersActions'
import {fetchJobCategories} from '../redux/actions/jobs/jobOffersCategoriesActions'
import {fetchCities} from '../redux/actions/citiesActions'

import CategoriesSimpleMenu from '../components/CategoriesSimpleMenu'
import CityMenu from '../components/CityMenu'
import SimpleDropdownFilter from '../components/SimpleDropdownFilter'
import LoginInfoModal from '../components/LoginInfoModal'

const JobsView = props => {

    // fetch JobsView data
    useEffect(() => {
        props.fetchJobCategories()
        props.fetchCities()
    }, [])

    // job filters
    const [searchValues, setSearchValues] = useState({
        searchValue: '',
        categoryId: '',
        cityId: '',
    })

    // show this values to user
    const [filterValues, setFilterValues] = useState({
        cityName: 'Wybierz miasto',
        categoryName: 'Wybierz kategorię',
        order: 'Sortuj według',
    })

    // show 'must login' modal
    const [modalOpen, setModalOpen] = useState(false)

    const showMustLoginInfo = () => {
        if (!props.loggedIn)
            setModalOpen(true)
    }

    const search = () => {
        // sprawdzanie wartosci
        props.fetchOffers()
    }

    useEffect(() => {
        search()
    }, [filterValues])


    // categories menu
    const onClickCategory = (e, category_id, categoryName) => {
        setSearchValues({...searchValues, categoryId: category_id})
        setFilterValues({...filterValues, categoryName: categoryName})
    }

    // city filter
    const onClickCity = (e, cityId, cityName) => {
        setSearchValues({...searchValues, cityId: cityId})
        setFilterValues({...filterValues, cityName: cityName})
    }

    // ordering
    const simpleFilterClick = (e, choice) => {
        setFilterValues({...filterValues, order: choice})
    }

    return (
        <div>
            <h3>Filtry</h3>
            <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px', flexWrap: 'wrap'}}>
                <div style={{marginRight: '10px', marginBottom: '10px'}}>{props.categories.categories_fetched ? 
                    <CategoriesSimpleMenu  
                        categories={props.categories.categories} 
                        onClick={onClickCategory} 
                        categoryName={filterValues.categoryName}
                    /> 
                    : null}
                </div>
                <div style={{marginRight: '10px'}}>
                    {props.cities.fetched ? 
                    <CityMenu 
                        city={filterValues.cityName}  
                        voivodeships={props.cities.voivodeships} 
                        onClick={onClickCity}
                    /> 
                    : null}
                </div>
                <div>
                    <SimpleDropdownFilter 
                        title={filterValues.order} 
                        choices={['Najwyższe wynagrodzenie', 'Najnowsze']} 
                        onClick={simpleFilterClick}
                    />
                </div>
            </div>
        </div>
    );
    
}

const mapStateToProps = state => {
    return {
        offers: state.jobOffersReducer,
        categories: state.jobOfferCategoriesReducer,
        cities: state.citiesReducer,
        loggedIn: state.authReducer.user,
    }
}
  

const mapDispatchToProps = dispatch => {
    return {
        fetchJobCategories: () => dispatch(fetchJobCategories()),
        fetchOffers: (...args) => dispatch(fetchOffers(...args)),
        fetchPageOffers: (...args) => dispatch(fetchPageOffers(...args)),
        fetchCities: () => dispatch(fetchCities()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(JobsView)