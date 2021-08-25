import axios from 'axios';
import React, { Component } from 'react';
import { Button, Modal, Form, Select } from 'semantic-ui-react';

export class EditSales extends Component {
  constructor(props) {
    super(props);
      this.state = { 
        editChangeProductId: this.props.editProductId,
        editChangeCustomerId: this.props.editCustomerId,
        editChangeStoreId: this.props.editStoreId,
        editChangeDateSold: this.props.editDateSold,
        dateDef: ""
      }
  }

  myEditSales = () => {
    axios.put(`/Sales/PutSales/${this.props.editItem}`, 
      {
      id: this.props.editItem,
      productid: this.editChangeProductId,
      customerid: this.editChangeCustomerId,
      storeid: this.editChangeStoreId,
      datesold: this.editChangeDateSold
     }
    )
    .then(({ data }) => {
    this.props.toggleEditSalesModal(false);
    this.props.fetchSales();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleProductIdChange = (event, data) => {
    this.editChangeProductId = data.value;
   }

  handleCustomerIdChange = (event, data) => {
    this.editChangeCustomerId = data.value;
   }

  handleStoreIdChange = (event, data) => {
    this.editChangeStoreId = data.value;
  }

  handleDateSoldChange = (value) => {
    this.editChangeDateSold = value;
  }

  render() {
    this.editChangeProductId = this.props.editProductId;
    this.editChangeCustomerId = this.props.editCustomerId;
    this.editChangeStoreId = this.props.editStoreId;
    this.editChangeDateSold = this.props.editDateSold;
    this.dateDef = this.props.editDateSold.substring(0, 10);
  return (
    <Modal open={this.props.open}>
      <Modal.Header>Edit Sales No</Modal.Header>
      <Modal.Content>
      <Form>
      <Form.Field
            control={Select}
            label='Product'
            options={this.props.saleFetchProduct.map((s) => ({
              key: s.id,
              text: s.name,
              value: s.id,
            }))}
            defaultValue={this.props.editProductId}
            onChange={this.handleProductIdChange}
            />
        <Form.Field
            control={Select}
            label='Customer'
            options={this.props.customers.map((s) => ({
              key: s.id,
              text: s.name,
              value: s.id,
            }))}
            defaultValue={this.props.editCustomerId}
            onChange={this.handleCustomerIdChange}
            />
        <Form.Field
            control={Select}
            label='Store'
            options={this.props.stores.map((s) => ({
              key: s.id,
              text: s.name,
              value: s.id,
            }))}
            defaultValue={this.props.editStoreId}
            onChange={this.handleStoreIdChange}
            />
        <Form.Field>
            <label>Sale Date Sold</label>
            <input type="date" defaultValue={this.dateDef} onBlur={(e) => this.handleDateSoldChange(e.target.value)}></input>
        </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => this.props.toggleEditSalesModal(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition='right'
          icon='checkmark'
          onClick={this.myEditSales}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}
}

export default EditSales