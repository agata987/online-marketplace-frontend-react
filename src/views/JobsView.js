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
import SearchInput from '../components/SearchInput'
import LoginInfoModal from '../components/LoginInfoModal'
import JobOffers from '../components/JobOffers'

import {
    Button, 
    Icon, 
    Loader, 
    Checkbox,
    Input,
    Message
  } from 'semantic-ui-react'

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
        minSalary: '',
        remote: false,
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

    // search bar
    const onSearchValueChange = e => {
        e.persist();
        setSearchValues({...searchValues, searchValue: e.target.value})
    }

    const [onlyNumbersWarning, setOnlyNumbersWarning] = useState(false)

    // minimum salary input
    const minSalayHandle = e => {
        e.persist();
        const re = /^[0-9\b]+$/

        if (e.target.value === '' || re.test(e.target.value)){
            setSearchValues({...searchValues, minSalary: e.target.value})
            setOnlyNumbersWarning(false)
        } else setOnlyNumbersWarning(true)
    }

    // remote intpu
    const remoteHandle = () => {
        setSearchValues({...searchValues, remote: !searchValues.remote})
    }

    return (
        <div>
            <LoginInfoModal 
                onRequestClose={() => {setModalOpen(false)}} 
                isOpen={modalOpen} 
                text={<h2>Aby utworzyć nową ofertę <a href='/login'>zaloguj się</a>.</h2>}
            />

            <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px', width:'100%'}}>
                {props.loggedIn ? 
                    <a href='/create-offer'><Button color='linkedin'>Dodaj ofertę</Button></a> 
                 : <Button color='linkedin' onClick={showMustLoginInfo}>Dodaj ofertę</Button>}
                <SearchInput onSubmit={search} onChange={onSearchValueChange}/>
            </div>

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
                <div style={{marginRight: '10px', marginBottom: '10px'}}>
                    {props.cities.fetched ? 
                    <CityMenu 
                        city={filterValues.cityName}  
                        voivodeships={props.cities.voivodeships} 
                        onClick={onClickCity}
                    /> 
                    : null}
                </div>
                <div style={{marginRight: '10px'}}>
                    <SimpleDropdownFilter 
                        title={filterValues.order} 
                        choices={['Najwyższe wynagrodzenie', 'Najnowsze oferty']} 
                        onClick={simpleFilterClick}
                    />
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap'}}>
                <Input label='min. wynagrodzenie' onChange={minSalayHandle} placeholder='6 000' style={{marginRight: '10px'}} />
                <Checkbox label='Tylko praca zdalna.' onChange={remoteHandle} /> 
            </div>

            {onlyNumbersWarning ? <Message style={{display: 'inline-block', marginTop: 0, marginBottom: '5px'}} negative>Minimalne wynagrodzenie musi być liczbą całkowitą.</Message> : null}

            <div>
            {props.offers.fetched && props.categories.categories_fetched && props.cities.fetched ? 
                <JobOffers items={props.offers.offers}/> 
                : <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}>
                    <Loader active inline />
                </div>
            }
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