import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {editOffer} from '../../redux/actions/offers/createOfferActions'
import {FormField} from './FormField'
import {Button, Form, Input, TextArea} from 'semantic-ui-react'

const EditOfferForm = props => {

    useEffect(() => {
        if (props.offer_red.done)
            props.redirect()
    
    }, [props.offer_red])

    const [offerData, setOfferData] = useState({
        price: props.oldData.price,
        description: props.oldData.description,
        image: null,
    }, [props.oldData])

    const onSubmit = () => {
        const uploadData = new FormData()

        if (offerData.price !== null) {
            offerData.price = offerData.price.replace(',', '.')
            uploadData.append('price', offerData.price)
        }
            
        if (offerData.description.trim() !== '')
            uploadData.append('description', offerData.description)

        if (offerData.image !== null)
            uploadData.append('image', offerData.image)

        props.editOffer(props.offerId, uploadData) 
        
    }

    const onChangeOfferPrice = e => {
        e.persist();
        setOfferData({...offerData, price: e.target.value})
    }

    const onChangeOfferDescription = e => {
        e.persist();
        setOfferData({...offerData, description: e.target.value})
    }

    const uploadImageHandle = e => {
        e.persist()
        setOfferData({...offerData, image: e.target.files[0]})
    }

    return(
        <Form onSubmit={onSubmit}>


        <label>Nowe zjęcie:</label>
        <input onChange={uploadImageHandle} type='file' accept="image/*"/>

        {props.oldData.category_id !== 10 && props.oldData.category_id !== 11 ?
            <div>
            <label>Cena:</label>
            <FormField
                fieldError={props.offer_red.errors ? (props.offer_red.errors.price ? true : false) : false}
                content={props.offer_red.errors ? (props.offer_red.errors.price ? props.offer_red.errors.price : '') : ''}
                control={Input}
            >
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <input 
                        name='price'
                        value={offerData.price}
                        onChange={onChangeOfferPrice}
                        placeholder='np. 27,50'
                    />
                    <h5 style={{marginLeft: '10px'}}>zł</h5>
                </div>
            </FormField>
            </div>
        : null}

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
                placeholder='Opis oferty...'
            />
        </FormField>


        <Button style={{marginTop: '10px'}} type='submit' size='large'>Zapisz</Button>
    </Form>

        
    )
    
}

const mapStateToProps = state => {
    return {
        offer_red: state.createOfferReducer,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editOffer: (offerId, offerData) => dispatch(editOffer(offerId, offerData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOfferForm)