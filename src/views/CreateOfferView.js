import React, {useState} from 'react'
import {Redirect} from 'react-router-dom';
import CreateOfferForm from '../components/forms/CreateOfferForm'
import {connect} from 'react-redux'
import {Loader} from 'semantic-ui-react'

const CreateOfferView = props => {
    const [redirect, setRedirect] = useState(false)

    const goToMyOffers = () => {
        setRedirect(true)
    }

    return (
        <div>
            {redirect ?  <Redirect to={'/my-offers'} /> : null}
            {props.user ? <CreateOfferForm redirect={goToMyOffers} user_id={props.user.id}/> :  <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}><Loader active inline /></div>}
        </div>
    );

}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps)(CreateOfferView)