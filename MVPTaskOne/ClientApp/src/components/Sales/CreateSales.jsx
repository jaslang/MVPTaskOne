import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, Form, Select } from 'semantic-ui-react';

const CreateSales = (props) => {
  const { open, toggleCreateSalesModal, salesPerPage, fetchSalesNew } = props;

  const selSalesProduct = props.products.map((s) => ({
    key: s.id,
    text: s.name,
    value: s.id,
  }))

  const selSalesCustomer = props.customers.map((s) => ({
    key: s.id,
    text: s.name,
    value: s.id,
  }))

  const selSalesStore = props.stores.map((s) => ({
    key: s.id,
    text: s.name,
    value: s.id,
  }))

  const [sales, setSales] = useState({
    productId: "",
    customerId: "",
    storeId: "",
    dateSold: ""
  });

  const handleProductSelect = (event, data) => {
    sales.productId = data.value;
   };

  const handleCustomerSelect = (event, data) => {
    sales.customerId = data.value;
   };

  const handleStoreSelect = (event, data) => {
    sales.storeId = data.value;
   };

  const handleSalesChange = (field, value) => {
    setSales({
      ...sales,
      [field]: value
    })
  }

  const myCreateSales = () => {
    axios.post("/Sales/PostSales", {
      productId: sales.productId,
      customerId: sales.customerId,
      storeId: sales.storeId,
      dateSold: sales.dateSold
    })
    .then(({ data }) => {
      // fetchSales();
      toggleCreateSalesModal(false);
      fetchSalesNew(salesPerPage, false, false, false, false, false, false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <Modal open={open}>
      <Modal.Header>Create a New Sale</Modal.Header>
      <Modal.Content>
      <Form>
      <Form.Field
            control={Select}
            label='Product'
            options={selSalesProduct}
            placeholder='Product'
            onChange={handleProductSelect}
            />
      <Form.Field
            control={Select}
            label='Customer'
            options={selSalesCustomer}
            placeholder='Customer'
            onChange={handleCustomerSelect}
            />
        <Form.Field
            control={Select}
            label='Store'
            options={selSalesStore}
            placeholder='Store'
            onChange={handleStoreSelect}
            />
        <Form.Field>
            <label>Sales Date Sold</label>
            <input type="date" onBlur={(e) => handleSalesChange("dateSold", e.target.value)}></input>
        </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleCreateSalesModal(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition='right'
          icon='checkmark'
          onClick={myCreateSales}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default CreateSales