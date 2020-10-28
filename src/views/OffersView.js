import React from 'react'
import { connect } from 'react-redux'
import CategoriesMenu from '../components/CategoriesMenu'
import { fetchCategories } from '../redux/actions/offersActions'

class OffersView extends React.Component {

    state = {}

    // categories menu
    handleCategoriesMenuItemClick = (e, { name }) => {this.setState({ ...this.state, category: name })
    }

    componentDidMount(){
        this.props.fetchCategories()
    }

    render() {
        
        return (
            <div>
                { this.props.offers.categories_fetched ? <CategoriesMenu categories={this.props.offers.categories} handleItemClick={this.handleCategoriesMenuItemClick} activeItem={this.state.category} /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      offers: state.offersReducer
    }
  }
  

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(OffersView)