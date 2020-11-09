import React, {
    useState, 
    useEffect
} from 'react'
import { connect } from 'react-redux'
import { 
    fetchOffers, 
    fetchPageOffers 
} from '../redux/actions/offers/offersActions'
import { fetchCategories } from '../redux/actions/offers/offerCategoriesActions'
import { fetchCities } from '../redux/actions/citiesActions'

import CategoriesMenu from '../components/CategoriesMenu'
import CityMenu from '../components/CityMenu'
import Offers from '../components/Offers'
import SearchInput from '../components/SearchInput'
import SimpleDropdownFilter from '../components/SimpleDropdownFilter'
import LoginInfoModal from '../components/LoginInfoModal'

import {
  Button, 
  Icon, 
  Loader, 
} from 'semantic-ui-react'

const OffersView = props => {

    // fetch OffersView data
    useEffect(() => {
        props.fetchCategories()
        props.fetchCities()
    }, [])

    // offers filters
    const [searchValues, setSearchValues] = useState({
        searchValue: '',
        categoryId: '',
        cityId: '',
    })

    // show this values to user
    const [filtersValues, setFiltersValues] = useState({
        order: 'Sortuj według',
        cityName: 'Wybierz miasto'
    })

    // show 'must login' modal
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        search()
    }, [searchValues.categoryId, filtersValues])

    const search = () => {
        let ordering = '-creation_date'

        if (filtersValues.order === 'Najdroższe')
            ordering = 'price'
        else if (filtersValues.order === 'Najtańsze')
            ordering = '-price'

        props.fetchOffers(
            searchValues.searchValue, 
            searchValues.cityId, 
            searchValues.categoryId, 
            ordering
        )
    }

    const showMustLoginInfo = () => {
        if (!props.loggedIn)
            setModalOpen(true)
    }

    // categories menu
    const handleCategoriesMenuItemClick = (e, {name}) => {
        setSearchValues({...searchValues, categoryId: name})
    }

    // search bar
    const onSearchValueChange = e => {
        e.persist();
        setSearchValues({...searchValues, searchValue: e.target.value})
    }

    // city filter
    const onClickCity = (e, cityId, cityName) => {
        setSearchValues({...searchValues, cityId: cityId})
        setFiltersValues({...filtersValues, cityName: cityName})
    }

    // ordering
    const simpleFilterClick = (e, choice) => {
        setFiltersValues({...filtersValues, order: choice})
    }

    return (
        <div>
            <LoginInfoModal 
                onRequestClose={() => {setModalOpen(false)}} 
                isOpen={modalOpen} 
                text={<h2>Aby utworzyć nową ofertę <a href='/login'>zaloguj się</a>.</h2>}
            />
            
            <div>
                {props.categories.categories_fetched ? 
                    <CategoriesMenu 
                        categories={props.categories.categories} 
                        handleItemClick={handleCategoriesMenuItemClick} 
                        activeItem={searchValues.categoryId} /> 
                : null}
            </div>
            
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px', width:'100%'}}>
                {props.loggedIn ? 
                    <a href='/create-offer'><Button color='linkedin'>Dodaj ofertę</Button></a> 
                 : <Button color='linkedin' onClick={showMustLoginInfo}>Dodaj ofertę</Button>}
                <SearchInput onSubmit={search} onChange={onSearchValueChange}/>
            </div>

            <h3>Filtry</h3>
            <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
                <div>
                    {props.cities.fetched ? 
                        <CityMenu 
                            city={filtersValues.cityName}  
                            voivodeships={props.cities.voivodeships} 
                            onClick={onClickCity}
                        /> 
                        : null}
                </div>
                <div style={{ marginLeft: '10px'}}>
                    <SimpleDropdownFilter 
                        title={filtersValues.order} 
                        choices={['Najtańsze', 'Najdroższe', 'Najnowsze']} 
                        onClick={simpleFilterClick}
                    />
                </div>
            </div>

            <Button onClick={() => {
                setSearchValues({...searchValues, categoryId: '', cityId: ''})
                setFiltersValues({order: 'Sortuj według', cityName: 'Wybierz miasto'})
                props.fetchOffers()
                }}>Wszystkie oferty</Button>
        
            <div>
                {props.offers.offers_fetched && props.categories.categories_fetched && props.cities.fetched ? 
                <Offers items={props.offers.offers}/> 
                : <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}>
                    <Loader active inline />
                </div>}
            </div>

            <div style={{width: '100%', display: 'flex',justifyContent: 'center', padding: '20px', maxWidth: '800px'}}>
                <Button 
                    color='linkedin' 
                    disabled={props.offers.previousPage ? false : true} 
                    onClick={() => {props.fetchPageOffers(props.offers.previousPage)}}
                >
                        <Icon name='angle left' />
                </Button>
                <Button 
                    color='linkedin' 
                    disabled={props.offers.nextPage ? false : true} 
                    onClick={() => {props.fetchPageOffers(props.offers.nextPage)}}
                >
                    <Icon name='angle right' />
                </Button>
            </div>
        </div>
    );

}

const mapStateToProps = state => {
    return {
      offers: state.offersReducer,
      categories: state.offerCategoriesReducer,
      cities: state.citiesReducer,
      loggedIn: state.authReducer.user,
    }
}
  

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
        fetchOffers: (...args) => dispatch(fetchOffers(...args)),
        fetchPageOffers: (link) => dispatch(fetchPageOffers(link)),
        fetchCities: () => dispatch(fetchCities()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(OffersView)