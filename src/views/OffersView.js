import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import CategoriesMenu from '../components/CategoriesMenu'
import Offers from '../components/Offers'
import { fetchOffers } from '../redux/actions/offers/offersActions'
import { fetchCategories } from '../redux/actions/offers/offerCategoriesActions'
import { fetchCities } from '../redux/actions/citiesActions'
import { Button, Icon } from 'semantic-ui-react'
import CityMenu from '../components/CityMenu'
import SearchInput from '../components/SearchInput'

class OffersView extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            cityName: 'Wybierz miasto',
            prevCityId: 0,
        }
    }

    componentDidUpdate(){
        if(this.state.cityId === this.state.prevCityId)
        return

        this.setState({...this.state, prevCityId: this.state.cityId})
        this.search()
    }

    search = () => {
        this.props.fetchOffers(this.state.searchValue, this.state.cityId)
    }

    // categories menu
    handleCategoriesMenuItemClick = (e, { name }) => {
        this.setState({ ...this.state, category: name })
    }

    componentDidMount(){
        this.props.fetchCategories()
        this.props.fetchOffers()
        this.props.fetchCities()
    }

    onSearchSubmit = e => {
        e.preventDefault()
        this.search()
    }

    onSearchValueChange = e => {
        this.setState({...this.state, searchValue: e.target.value})
    }

    onClickCity = (e,cityId, cityName) => {
        e.preventDefault()
        this.setState({...this.state, cityId: cityId, cityName: cityName})
    }

    render() {
        
        return (
            <div>
                <div>{ this.props.categories.categories_fetched ? <CategoriesMenu categories={this.props.categories.categories} handleItemClick={this.handleCategoriesMenuItemClick} activeItem={this.state.category} /> : null}</div>

                <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px', width:'100%'}}>
                    <Button
                    color='grey'
                    >Dodaj ofertę</Button>
                    <SearchInput onSubmit={this.onSearchSubmit} onChange={this.onSearchValueChange}/>
                </div>
                <h3>Filtry</h3>
                {this.props.cities.fetched ? <CityMenu city={this.state.cityName}  voivodeships={this.props.cities.voivodeships} onClick={this.onClickCity}/> : null}
                
                <div>{ this.props.offers.offers_fetched ? <Offers items={this.props.offers.offers}/> : null}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      offers: state.offersReducer,
      categories: state.offerCategoriesReducer,
      cities: state.citiesReducer,
    }
  }
  

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
        fetchOffers: (...args) => dispatch(fetchOffers(...args)),
        fetchCities: () => dispatch(fetchCities()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(OffersView)