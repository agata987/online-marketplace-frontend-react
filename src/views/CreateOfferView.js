import React from 'react'
import CreateOfferForm from '../components/forms/CreateOfferForm'
import {connect} from 'react-redux'

const CreateOfferView = props => {
    return (
        <div>
            {props.user ? <CreateOfferForm user_id={props.user.id}/> :  null}
        </div>
    );

}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps)(CreateOfferView)