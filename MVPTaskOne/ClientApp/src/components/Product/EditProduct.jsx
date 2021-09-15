import axios from 'axios';
import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'semantic-ui-react'

export class EditProduct extends Component {
  constructor(props) {
    super(props);
      this.state = { 
        editChangeName: this.props.editName,
        editChangePrice: this.props.editPrice
      }
  }

  myEditProduct = () => {
    axios.put(`/Products/PutProduct/${this.props.editItem}`, 
      {
      id: this.props.editItem,
      name: this.editChangeName,
      price: this.editChangePrice }
    )
    .then(({ data }) => {
    this.props.toggleEditProductModal(false);
    this.props.fetchProductNew(this.props.productsPerPage, false, false, false, false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleNameChange = (value) => {
    this.editChangeName = value;
  }

  handlePriceChange = (value) => {
    this.editChangePrice = value;
  }

  render() {
    this.editChangeName = this.props.editName;
    this.editChangePrice = this.props.editPrice;
  return (
    <Modal open={this.props.open}>
      <Modal.Header>Edit Product</Modal.Header>
      <Modal.Content>
      <Form>
        <Form.Field>
            <label>Product Name</label>
            <input defaultValue={this.props.editName} onBlur={(e) => this.handleNameChange(e.target.value)}/>
        </Form.Field>
        {/* <Form.Field>
            <label>Product Price</label>
            <input defaultValue={this.props.editPrice} onBlur={(e) => this.handlePriceChange(e.target.value)} />
        </Form.Field> */}
        <Input label={{ basic: true, content: '$' }} 
        labelPosition='left' 
        placeholder='Price' 
        defaultValue={this.props.editPrice} 
        onBlur={(e) => this.handlePriceChange(e.target.value)} />
  </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => this.props.toggleEditProductModal(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition='right'
          icon='checkmark'
          onClick={this.myEditProduct}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}
}

export default EditProduct