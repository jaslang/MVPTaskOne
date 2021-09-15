import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

const CreateCustomer = (props) => {
  const { open, toggleCreateCustomerModal, fetchCustomerNew, customersPerPage } = props;

  const [customer, setCustomer] = useState({
    name: "",
    address: ""
  });

  const handleCustomerChange = (field, value) => {
    setCustomer({
      ...customer,
      [field]: value
    })
  }

  const myCreateCustomer = () => {
    axios.post("/Customers/PostCustomer", {
      name: customer.name,
      address: customer.address
    })
    .then(({ data }) => {
      // fetchCustomer();
      toggleCreateCustomerModal(false);
      fetchCustomerNew(customersPerPage, false, false, false, false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <Modal open={open}>
      <Modal.Header>Create a New Customer</Modal.Header>
      <Modal.Content>
      <Form>
        <Form.Field>
            <label>Customer Name</label>
            <input placeholder='Customer Name' onBlur={(e) => handleCustomerChange("name", e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label>Customer Address</label>
            <input placeholder='Address' onBlur={(e) => handleCustomerChange("address", e.target.value)}/>
        </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleCreateCustomerModal(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition='right'
          icon='checkmark'
          onClick={myCreateCustomer}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default CreateCustomer