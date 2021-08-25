import React, { Component, Fragment } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <Fragment>
        <div className='margin'>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
        </div>
      </Fragment>
    );
  }
}
