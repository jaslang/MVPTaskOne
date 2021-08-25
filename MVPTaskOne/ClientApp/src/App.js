import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Product } from './components/Product/Product';
import { Customer } from './components/Customer/Customer';
import { Store } from './components/Store/Store';
import { Sales } from './components/Sales/Sales';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/Product' component={Product} />
        <Route path='/Customer' component={Customer} />
        <Route path='/Store' component={Store} />
        <Route path='/Sales' component={Sales} />
      </Layout>
    );
  }
}
