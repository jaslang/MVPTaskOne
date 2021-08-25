import React, { Component, Fragment } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";

export class NavMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Fragment>
      <Menu inverted>
        <Menu.Item as={ Link }
          to="/" 
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Menu.Item as={ Link }
          to="/Customer"
          name='Customer'
          active={activeItem === 'Customer'}
          onClick={this.handleItemClick}
        />
        <Menu.Item as={ Link }
          to="/Product"
          name='Product'
          active={activeItem === 'Product'}
          onClick={this.handleItemClick}
        />
        <Menu.Item as={ Link }
          to="/Store"
          name='Store'
          active={activeItem === 'Store'}
          onClick={this.handleItemClick}
        />
        <Menu.Item as={ Link }
          to="/Sales"
          name='Sales'
          active={activeItem === 'Sales'}
          onClick={this.handleItemClick}
        />
      </Menu>
      </Fragment>
    )
  }
}