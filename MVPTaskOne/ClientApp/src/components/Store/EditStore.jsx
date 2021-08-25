import axios from 'axios';
import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

export class EditStore extends Component {
  constructor(props) {
    super(props);
      this.state = { 
        editChangeName: this.props.editName,
        editChangeAddress: this.props.editAddress
      }
  }

  myEditStore = () => {
    axios.put(`/Stores/PutStore/${this.props.editItem}`, 
      {
      id: this.props.editItem,
      name: this.editChangeName,
      address: this.editChangeAddress }
    )
    .then(({ data }) => {
    this.props.toggleEditStoreModal(false);
    this.props.fetchStore();
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
      <Modal.Header>Edit Store No {this.props.editItem} </Modal.Header>
      <Modal.Content>
      <Form>
        <Form.Field>
            <label>Store Name</label>
            <input defaultValue={this.props.editName} onBlur={(e) => this.handleNameChange(e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label>Store Address</label>
            <input defaultValue={this.props.editAddress} onBlur={(e) => this.handleAddressChange(e.target.value)} />
        </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => this.props.toggleEditStoreModal(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition='right'
          icon='checkmark'
          onClick={this.myEditStore}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}
}

export default EditStore