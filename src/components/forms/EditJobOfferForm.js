import React, {
    useEffect, 
    useState
} from 'react'
import {connect} from 'react-redux'
import {fetchUserOffers} from '../../redux/actions/jobs/userJobOffersActions'
import {editOffer} from '../../redux/actions/jobs/createJobOfferActions'
import {FormField} from './FormField'
import {
    Button, 
    Form, 
    Input, 
    TextArea,
    Radio
} from 'semantic-ui-react'

const EditJobOfferForm = props => {

    useEffect(() => {
        if (props.offer_red.done) {
            if (props.user) {
                props.fetchUserJobOffers(props.user.id)
            }
            props.redirect()
        }
            
    
    }, [props.offer_red])

    const [offerData, setOfferData] = useState({
        min_salary: props.oldData.min_salary,
        max_salary: props.oldData.max_salary,
        description: props.oldData.description,
        remote: props.oldData.remote,
    }, [props.oldData])

    const onSubmit = () => {        

        props.editOffer(props.offerId, offerData) 
        
    }

    const remoteHandle = () => {
        setOfferData({...offerData, remote: !offerData.remote})
    }

    const onChangeOfferMinSalary = e => {
        e.persist();
        setOfferData({...offerData, min_salary: e.target.value})
    }

    const onChangeOfferMaxSalary = e => {
        e.persist();
        setOfferData({...offerData, max_salary: e.target.value})
    }

    const onChangeOfferDescription = e => {
        e.persist();
        setOfferData({...offerData, description: e.target.value})
    }

    return(
        <Form onSubmit={onSubmit}>


        <label>Wynagrodzenie minimalne:</label>
        <FormField
            fieldError={props.offer_red.errors ? (props.offer_red.errors.min_salary ? true : false) : false}
            content={props.offer_red.errors ? (props.offer_red.errors.min_salary ? props.offer_red.errors.min_salary : '') : ''}
            control={Input}
        >
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <input 
                    name='min_salary'
                    value={offerData.min_salary}
                    onChange={onChangeOfferMinSalary}
                    placeholder='np. 27,50'
                />
                <h5 style={{marginLeft: '10px'}}>zł</h5>
            </div>
        </FormField>

        <label>Wynagrodzenie maksymalne:</label>
        <FormField
            fieldError={props.offer_red.errors ? (props.offer_red.errors.max_salary ? true : false) : false}
            content={props.offer_red.errors ? (props.offer_red.errors.max_salary ? props.offer_red.errors.max_salary : '') : ''}
            control={Input}
        >
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <input 
                    name='max_salary'
                    value={offerData.max_salary}
                    onChange={onChangeOfferMaxSalary}
                    placeholder='np. 27,50'
                />
                <h5 style={{marginLeft: '10px'}}>zł</h5>
            </div>
        </FormField>


        <label>Opis:</label>
        <FormField 
            fieldError={props.offer_red.errors ? (props.offer_red.errors.description ? true : false) : false}
            content={props.offer_red.errors ? (props.offer_red.errors.description ? props.offer_red.errors.description : '') : ''}
            control={Input}
        >
            <TextArea 
                name='description'
                value={offerData.description}
                onChange={onChangeOfferDescription}
                placeholder='Opis oferty pracy...'
            />
        </FormField>

        <div style={{marginBottom: '10px'}}>
            <Radio onClick={remoteHandle} checked={offerData.remote} label='Praca zdalna' onChange={remoteHandle} /> 
        </div>
           

        <Button style={{marginTop: '10px'}} type='submit' size='large'>Zapisz</Button>
    </Form>

        
    )
    
}

const mapStateToProps = state => {
    return {
        offer_red: state.createJobOfferReducer,
        user: state.authReducer.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editOffer: (offerId, offerData) => dispatch(editOffer(offerId, offerData)),
        fetchUserJobOffers: user_id => dispatch(fetchUserOffers(user_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditJobOfferForm)