import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import CategoriesMenu from '../components/CategoriesMenu'
import Offers from '../components/Offers'
import { fetchOffers, fetchPageOffers } from '../redux/actions/offers/offersActions'
import { fetchCategories } from '../redux/actions/offers/offerCategoriesActions'
import { fetchCities } from '../redux/actions/citiesActions'
import SimpleDropdownFilter from '../components/SimpleDropdownFilter'
import { Button } from 'semantic-ui-react'
import CityMenu from '../components/CityMenu'
import SearchInput from '../components/SearchInput'
import { Icon } from 'semantic-ui-react'
import { Loader } from 'semantic-ui-react'
import LoginInfoModal from '../components/LoginInfoModal'
import { getTokens } from '../redux/actions/authActions'

const Observer = props => {
    useEffect(() => {
        props.function()
    }, [...props.args])
    return null
}

class OffersView extends React.Component {

    // constructor(props){
    //     super(props)

    //     this.state = {
    //         filter: 'Sortuj według',
    //         cityName: 'Wybierz miasto',
    //         modalIsOpen: false,
    //     }
    // }

    // search = () => {
    //     let order = 'price'
    //     if (this.state.filter === 'Najdroższe')
    //     order = '-price'
    //     else if (this.state.filter === 'Najnowsze')
    //     order = 'creation_date'

    //     this.props.fetchOffers(this.state.searchValue, this.state.cityId, this.state.categoryId, order)
    // }

    // showMustLoginInfo = () => {
    //     if (!this.props.loggedIn)
    //     this.setState({...this.state, modalIsOpen: true})
    // }

    // // categories menu
    // handleCategoriesMenuItemClick = (e, {name}) => {
    //     this.setState({ ...this.state, categoryId: name })
    // }

    componentDidMount(){
        // this.props.fetchCategories()
        // this.props.fetchOffers()
        // this.props.fetchCities()
        this.props.getTokens({email: 'agata.szczypinska@gmail.com', password: 'Kielekk123'})
        console.log('offers view sent a request')
    }

    // // search bar
    // onSearchSubmit = e => {
    //     e.preventDefault()
    //     this.search()
    // }

    // // search bar
    // onSearchValueChange = e => {
    //     this.setState({...this.state, searchValue: e.target.value})
    // }

    // // dropdown menu
    // onClickCity = (e,cityId, cityName) => {
    //     e.preventDefault()
    //     this.setState({...this.state, cityId: cityId, cityName: cityName})
    // }

    // simpleFilterClick = (e, choice) => {
    //     e.preventDefault()
    //     this.setState({...this.state, filter: choice})
    // }

    // // login info modal
    // closeModal() {
    //     this.setState({...this.state, modalIsOpen: false})
    // }

    // onRequestClose = () =>{
    //     this.closeModal()
    // }

    render() {
        
        return (
            <div>
                {/* <Observer function={this.search} args={[this.state.cityName, this.state.categoryId, this.state.filter]}/>
                <LoginInfoModal onClick={this.onRequestClose} isOpen={this.state.modalIsOpen} onRequestClose={this.onRequestClose} />
                <div>{ this.props.categories.categories_fetched ? <CategoriesMenu categories={this.props.categories.categories} handleItemClick={this.handleCategoriesMenuItemClick} activeItem={this.state.categoryId} /> : null}</div>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px', width:'100%'}}>
                    {
                        this.props.loggedIn ?
                        <a href='/create-offer'>
                            <Button color='linkedin'>Dodaj ofertę</Button> 
                        </a> :
                        <Button color='linkedin' onClick={this.showMustLoginInfo}>Dodaj ofertę</Button>
                    }
                    <SearchInput onSubmit={this.onSearchSubmit} onChange={this.onSearchValueChange}/>
                </div>
                <h3>Filtry</h3>
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
                    <div>
                        {this.props.cities.fetched ? <CityMenu city={this.state.cityName}  voivodeships={this.props.cities.voivodeships} onClick={this.onClickCity}/> : null}
                    </div>
                    <div style={{ marginLeft: '10px'}}>
                        <SimpleDropdownFilter title={this.state.filter} choices={['Najtańsze', 'Najdroższe', 'Najnowsze']} onClick={this.simpleFilterClick}/>
                    </div>
                </div>
                <Button onClick={(e) => {e.preventDefault(); this.setState({cityName: 'Wybierz miasto', cityId: '', categoryId: '', filter: 'Sortuj według'});this.props.fetchOffers()}}>Wszystkie oferty</Button>
            
                <div>{ this.props.offers.offers_fetched && this.props.categories.categories_fetched && this.props.cities.fetched ? <Offers items={this.props.offers.offers}/> : <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}><Loader active inline /></div>}</div>
                <div style={{width: '100%', display: 'flex',justifyContent: 'center', padding: '20px'}}>
                    <Button disabled={this.props.offers.previousPage ? false : true} onClick={() => {this.props.fetchPageOffers(this.props.offers.previousPage)}}><Icon name='angle left' /></Button>
                    <Button disabled={this.props.offers.nextPage ? false : true} onClick={() => {this.props.fetchPageOffers(this.props.offers.nextPage)}}><Icon name='angle right' /></Button>
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    //   offers: state.offersReducer,
    //   categories: state.offerCategoriesReducer,
    //   cities: state.citiesReducer,
    //   loggedIn: state.userReducer.loggedIn,
      loggedIn: state.authReducer.tokensFetched,
    }
  }
  

const mapDispatchToProps = dispatch => {
    return {
        // fetchCategories: () => dispatch(fetchCategories()),
        // fetchOffers: (...args) => dispatch(fetchOffers(...args)),
        // fetchPageOffers: (link) => dispatch(fetchPageOffers(link)),
        // fetchCities: () => dispatch(fetchCities()),
        getTokens: (...args) => dispatch(getTokens(...args))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(OffersView)