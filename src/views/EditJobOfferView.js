import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {reset} from '../redux/actions/jobs/createJobOfferActions'
import EditJobOfferForm from '../components/forms/EditJobOfferForm'
import API_Handler from '../API_Handler'
import {Loader} from 'semantic-ui-react'

const EditOfferView = props => {
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        props.reset()
    },[])

    const [oldData, setOldData] = useState({
        min_salary: '',
        max_salary: null,
        description: '',
        remote: false,
    })

    const [fetched, setFetched] = useState(false)
    const [offerId, setOfferId] = useState(null)

    const goToMyOffers = () => {
        setRedirect(true)
    }

    const getOfferData = offerId => {
        API_Handler(false, {method: 'get', url: `joboffers/${offerId}/`})
        .then(res => {
            setOldData({
                min_salary: res.data.min_salary,
                max_salary: res.data.max_salary,
                description: res.data.description,
                remote: res.data.remote
            })

            setFetched(true)
        })
        .catch(() => {
            alert('Błąd ładowania oferty')
            setRedirect(true)
        })
    }

    useEffect(() => {
        setOfferId(props.match.params.offerId)
        getOfferData(props.match.params.offerId)
    },[])

    return (
        <div>
            <h2>Edytowanie oferty pracy</h2>
            {redirect ?  <Redirect to={'/my-job-offers'} /> : null}
            {fetched ? <EditJobOfferForm redirect={goToMyOffers} oldData={oldData} offerId={offerId}/> : <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}><Loader active inline /></div>}
        </div>
    );

} 

const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch(reset())
    }
  }

export default connect(null, mapDispatchToProps)(EditOfferView)