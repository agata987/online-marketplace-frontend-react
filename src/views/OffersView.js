import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import CategoriesMenu from '../components/CategoriesMenu'
import Offers from '../components/Offers'
import { fetchOffers } from '../redux/actions/offers/offersActions'
import { fetchCategories } from '../redux/actions/offers/offerCategoriesActions'
import { fetchCities } from '../redux/actions/citiesActions'
import { Button } from 'semantic-ui-react'
import CityMenu from '../components/CityMenu'
import SearchInput from '../components/SearchInput'

const Observer = props => {
    useEffect(() => {
        props.function()
    }, [...props.args])
    return null
}

class OffersView extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            cityName: 'Wybierz miasto',
        }
    }

    search = () => {
        this.props.fetchOffers(this.state.searchValue, this.state.cityId, this.state.categoryId)
    }

    // categories menu
    handleCategoriesMenuItemClick = (e, {name}) => {
        this.setState({ ...this.state, categoryId: name })
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
                <Observer function={this.search} args={[this.state.cityName, this.state.categoryId]}/>
                <div>{ this.props.categories.categories_fetched ? <CategoriesMenu categories={this.props.categories.categories} handleItemClick={this.handleCategoriesMenuItemClick} activeItem={this.state.categoryId} /> : null}</div>

                <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px', width:'100%'}}>
                    <Button
                    color='linkedin'
                    >Dodaj ofertę</Button>
                    <SearchInput onSubmit={this.onSearchSubmit} onChange={this.onSearchValueChange}/>
                </div>
                <h3>Filtry</h3>
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
                    {this.props.cities.fetched ? <CityMenu city={this.state.cityName}  voivodeships={this.props.cities.voivodeships} onClick={this.onClickCity}/> : null}
                </div>
                <Button onClick={(e) => {e.preventDefault(); this.setState({cityName: 'Wybierz miasto', cityId: '', categoryId: ''});this.props.fetchOffers()}}>Wszystkie oferty</Button>
            
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