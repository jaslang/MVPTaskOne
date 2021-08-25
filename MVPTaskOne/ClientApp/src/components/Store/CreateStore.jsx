import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

const CreateStore = (props) => {
  const { open, toggleCreateStoreModal, fetchStore } = props;

  const [store, setStore] = useState({
    name: "",
    address: ""
  });

  const handleStoreChange = (field, value) => {
    setStore({
      ...store,
      [field]: value
    })
  }

  const myCreateStore = () => {
    axios.post("/Stores/PostStore", {
      name: store.name,
      address: store.address
    })
    .then(({ data }) => {
      fetchStore();
      toggleCreateStoreModal(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }


  return (
    <Modal open={open}>
      <Modal.Header>Create a New Store</Modal.Header>
      <Modal.Content>
      <Form>
        <Form.Field>
            <label>Store Name</label>
            <input placeholder='Store Name' onBlur={(e) => handleStoreChange("name", e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label>Store Address</label>
            <input placeholder='Address' onBlur={(e) => handleStoreChange("address", e.target.value)}/>
        </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleCreateStoreModal(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition='right'
          icon='checkmark'
          onClick={myCreateStore}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default CreateStore