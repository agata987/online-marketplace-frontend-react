import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';

class SimpleDropdownFilter extends React.Component {
  render() {
    return (
      <Menu vertical>
        <Dropdown item text={this.props.title}>
          <Dropdown.Menu>
            {this.props.choices.map((choice) => (
              <Dropdown.Item
                key={choice}
                onClick={(e) => this.props.onClick(e, choice)}
              >
                {choice}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}

export default SimpleDropdownFilter;
