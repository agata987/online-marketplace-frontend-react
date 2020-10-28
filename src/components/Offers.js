import React, { Component } from 'react'
import { Item, Button, Icon } from 'semantic-ui-react'

export default class Offers extends Component {

  render() {
    return (
      <Item.Group relaxed>
      {this.props.items.map(item => 
        <Item>
          <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
    
          <Item.Content verticalAlign='middle'>
          <Item.Header>{item.name}</Item.Header>
            <Item.Description>{`${item.price} zł`}</Item.Description>
            <Item.Description>{`${item.creation_date}`}</Item.Description>
            <Item.Extra>
              <a href='#' style={{float: "right"}}><Icon size='large' name='heart outline'/></a>
            </Item.Extra>
          </Item.Content>
        </Item>)}
      </Item.Group>
    )
  }
}
