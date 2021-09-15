import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, Form, Label, Input } from 'semantic-ui-react'

const CreateProduct = (props) => {
  const { open, toggleCreateProductModal, fetchProductNew, productsPerPage } = props;

  const [product, setProduct] = useState({
    name: "",
    price: ""
  });

  const handleProductChange = (field, value) => {
    setProduct({
      ...product,
      [field]: value
    })
  }

  const myCreateProduct = () => {
    axios.post("/Products/PostProduct", {
      name: product.name,
      price: product.price
    })
    .then(({ data }) => {
      // fetchProduct();
      toggleCreateProductModal(false);
      fetchProductNew(productsPerPage, false, false, false, false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <Modal open={open}>
      <Modal.Header>Create a New Product</Modal.Header>
      <Modal.Content>
      <Form>
        <Form.Field>
            <label>Product Name</label>
            <input placeholder='Product Name' onBlur={(e) => handleProductChange("name", e.target.value)}/>
        </Form.Field>
        <Input label={{ basic: true, content: '$' }}
        labelPosition='left'
        placeholder='Price' 
        onBlur={(e) => handleProductChange("price", e.target.value)} />
  </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleCreateProductModal(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition='right'
          icon='checkmark'
          onClick={myCreateProduct}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default CreateProduct