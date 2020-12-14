import React from "react";
import { Input, Form } from "semantic-ui-react";

class SearchInput extends React.Component {
  render() {
    return (
      <Form
        onSubmit={this.props.onSubmit}
        className='offers_search_form'
      >
        <Input
          onChange={this.props.onChange}
          placeholder="Szukaj ofert..."
          size="large"
          action={{
            color: "teal",
            labelPosition: "right",
            icon: "search",
            content: "Szukaj",
          }}
          className='offers_search_form-input'
        />
      </Form>
    );
  }
}

export default SearchInput;
