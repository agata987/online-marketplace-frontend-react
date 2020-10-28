import React from 'react'
import { connect } from 'react-redux'
import CategoriesMenu from '../components/CategoriesMenu'
import { fetchCategories } from '../redux/actions/offersActions'

class OffersView extends React.Component {

    componentDidMount(){
        this.props.fetchCategories()
    }

    render() {
        return (
            <div>
                { this.props.offers.categories_fetched ? <CategoriesMenu categories={this.props.offers.categories} /> : null}
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