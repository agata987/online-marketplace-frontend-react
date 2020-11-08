import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {reset} from '../redux/actions/offers/createOfferActions'
import EditOfferForm from '../components/forms/EditOfferForm'
import API_Handler from '../API_Handler'
import {Loader} from 'semantic-ui-react'

const EditOfferView = props => {
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        props.reset()
    },[])

    const [oldData, setOldData] = useState({
        price: null,
        description: '',
    })

    const [fetched, setFetched] = useState(false)
    const [offerId, setOfferId] = useState(null)

    const goToMyOffers = () => {
        setRedirect(true)
    }

    const getOfferData = offerId => {
        API_Handler(false, {method: 'get', url: `offers/${offerId}/`})
        .then(res => {
            setOldData({
                price: res.data.price,
                description: res.data.description
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
            <h2>Edytowanie ogłoszenia</h2>
            {redirect ?  <Redirect to={'/my-offers'} /> : null}
            {fetched ? <EditOfferForm redirect={goToMyOffers} oldData={oldData} offerId={offerId}/> : <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}><Loader active inline /></div>}
        </div>
    );

} 

const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch(reset())
    }
  }

export default connect(null, mapDispatchToProps)(EditOfferView)