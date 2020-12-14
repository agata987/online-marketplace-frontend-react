import React, { useState } from "react";
import { connect } from "react-redux";
import { getCity } from "../redux/actions/checkCityActions";
import { Item, Button, Icon } from "semantic-ui-react";
import OfferView from "./OfferView";
import BoxImage from "../resources/box.svg";

const Offers = (props) => {
  const [showOffer, setShowOffer] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);

  const showOfferHandle = (item) => {
    setCurrentOffer({ ...item });
    props.getCity(item.city_id);
    setShowOffer(true);
  };

  const deleteFromFavourites = (id) => {
    alert(`usuwanie oferty o id: ${id}`);
  };

  return (
    <div>
      <OfferView
        favourites={props.favourites}
        offer={currentOffer}
        city={props.city}
        onRequestClose={() => setShowOffer(false)}
        isOpen={showOffer}
      />

      <Item.Group relaxed>
        {props.items.map((item) => (
          <Item
            style={{
              border: "5px solid #cdd9e5",
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "15px",
            }}
            className="offer_item"
          >
            <Item.Image size="small" src={item.image ? item.image : BoxImage} />

            <Item.Content verticalAlign="bottom">
              <Item.Header style={{ marginTop: "5px" }}>
                {item.name}
              </Item.Header>
              <Item.Meta>
                <div className="price" style={{ marginTop: "2px" }}>
                  {item.price ? (
                    <span>{item.price} zł</span>
                  ) : (
                    <span>brak ceny</span>
                  )}
                </div>
                <div className="stay" style={{ mamarginTop: "2px" }}>
                  {item.creation_date}
                </div>
              </Item.Meta>
              <Item.Description
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "right",
                }}
              >
                {props.favourites ? (
                  <Button
                    onClick={() => {
                      deleteFromFavourites(item.id);
                    }}
                    color="gray"
                    animated="vertical"
                    size="big"
                  >
                    <Button.Content visible>Usuń</Button.Content>
                    <Button.Content hidden>
                      <Icon name="delete" />
                    </Button.Content>
                  </Button>
                ) : null}

                <Button
                  onClick={() => showOfferHandle(item)}
                  color="orange"
                  animated="vertical"
                  size="big"
                >
                  <Button.Content visible>Sprawdź ofertę</Button.Content>
                  <Button.Content hidden>
                    <Icon name="shop" />
                  </Button.Content>
                </Button>
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    city: state.checkCityReducer.city,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCity: (id) => dispatch(getCity(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
