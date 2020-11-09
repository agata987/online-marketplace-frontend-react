import React, {useState} from 'react'
import {Redirect} from 'react-router-dom';
import JobOfferForm from '../components/forms/JobOfferForm'
import {connect} from 'react-redux'
import {Loader} from 'semantic-ui-react'

const CreateJobOfferView = props => {
    const [redirect, setRedirect] = useState(false)

    const goToMyJobOffers = () => {
        setRedirect(true)
    }

    return (
        <div>
            <h2>Tworzenie nowej oferty pracy</h2>
            {redirect ?  <Redirect to={'/my-job-offers'} /> : null}
            {props.user ? <JobOfferForm redirect={goToMyJobOffers} user_id={props.user.id}/> :  <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}><Loader active inline /></div>}
        </div>
    );

}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps)(CreateJobOfferView)