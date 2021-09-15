import axios from 'axios';
import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export class EditCustomer extends Component {
  constructor(props) {
    super(props);
      this.state = { 
        editChangeName: this.props.editName,
        editChangeAddress: this.props.editAddress
      }
  }

  myEditCustomer = () => {
    axios.put(`/Customers/PutCustomer/${this.props.editItem}`, 
      {
      id: this.props.editItem,
      name: this.editChangeName,
      address: this.editChangeAddress }
    )
    .then(({ data }) => {
    this.props.toggleEditCustomerModal(false);
    this.props.fetchCustomerNew(this.props.customersPerPage, false, false, false, false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleNameChange = (value) => {
    this.editChangeName = value;
  }

  handleAddressChange = (value) => {
    this.editChangeAddress = value;
  }

  render() {
    this.editChangeName = this.props.editName;
    this.editChangeAddress = this.props.editAddress;
  return (
    <Modal open={this.props.open}>
      <Modal.Header>Edit Customer No</Modal.Header>
      <Modal.Content>
      <Form>
        <Form.Field>
            <label>Customer Name</label>
            <input defaultValue={this.props.editName} onBlur={(e) => this.handleNameChange(e.target.value)} />
        </Form.Field>
        <Form.Field>
            <label>Customer Address</label>
            <input defaultValue={this.props.editAddress} onBlur={(e) => this.handleAddressChange(e.target.value)} />
        </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => this.props.toggleEditCustomerModal(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition='right'
          icon='checkmark'
          onClick={this.myEditCustomer}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}
}

export default EditCustomer