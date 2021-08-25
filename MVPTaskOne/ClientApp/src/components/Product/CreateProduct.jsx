import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

const CreateProduct = (props) => {
  const { open, toggleCreateProductModal, fetchProduct } = props;

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
      fetchProduct();
      toggleCreateProductModal(false);
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
        <Form.Field>
            <label>Product Price</label>
            <input placeholder='Price' onBlur={(e) => handleProductChange("price", e.target.value)}/>
        </Form.Field>
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