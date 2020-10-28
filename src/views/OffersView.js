import React from 'react'
import { connect } from 'react-redux'
import CategoriesMenu from '../components/CategoriesMenu'
import Offers from '../components/Offers'
import { fetchOffers } from '../redux/actions/offers/offersActions'
import { fetchCategories } from '../redux/actions/offers/offerCategoriesActions'

class OffersView extends React.Component {

    state = {}

    // categories menu
    handleCategoriesMenuItemClick = (e, { name }) => {this.setState({ ...this.state, category: name })
    }

    componentDidMount(){
        this.props.fetchCategories()
        this.props.fetchOffers()
    }

    render() {
        
        return (
            <div>
                <div>{ this.props.categories.categories_fetched ? <CategoriesMenu categories={this.props.categories.categories} handleItemClick={this.handleCategoriesMenuItemClick} activeItem={this.state.category} /> : null}</div>
                <div>{ this.props.offers.offers_fetched ? <Offers items={this.props.offers.offers}/> : null}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      offers: state.offersReducer,
      categories: state.offerCategoriesReducer,
    }
  }
  

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
        fetchOffers: () => dispatch(fetchOffers()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(OffersView)