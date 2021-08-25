import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className='margin'>
        <br />
        <h1>MVP On Boarding Task</h1>
        
        <br />
        <table cellPadding='10' cellSpacing='5'>
        <tbody>
          <tr>
            <td width='10'><Link to="/Customer"><Button color='blue' fluid>Customer</Button></Link></td>
            <td><h3>Customer Data</h3></td>
          </tr>
          <tr>
            <td> </td>
            <td> </td>
          </tr>
         <tr>
          <td width='10'><Link to="/Product"><Button color='blue' fluid>Product</Button></Link></td>
          <td><h3>Product Data</h3></td>
         </tr>
         <tr>
            <td> </td>
            <td> </td>
          </tr>
         <tr>
           <td width='10'><Link to="/Store"><Button color='blue' fluid>Store</Button></Link></td>
           <td><h3>Store Data</h3></td>
         </tr>
         <tr>
            <td> </td>
            <td> </td>
          </tr>
         <tr>
          <td width='10'><Link to="/Sales"><Button color='blue' fluid>Sales</Button></Link></td>
          <td><h3>Sales Data</h3></td>
          </tr>
          </tbody>
        </table>
        
      </div>
    );
  }
}
