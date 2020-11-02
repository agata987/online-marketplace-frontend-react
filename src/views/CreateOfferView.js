import React from 'react'
import CreateOfferForm from '../components/forms/CreateOfferForm'
import {connect} from 'react-redux'
import {Loader} from 'semantic-ui-react'

const CreateOfferView = props => {
    return (
        <div>
            {props.user ? <CreateOfferForm user_id={props.user.id}/> :  <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}><Loader active inline /></div>}
        </div>
    );

}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps)(CreateOfferView)