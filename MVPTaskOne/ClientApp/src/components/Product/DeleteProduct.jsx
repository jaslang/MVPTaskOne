import axios from 'axios';
import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'

export class DeleteProduct extends Component {
    constructor(props) {
      super(props);
    }

    handleDelete = () => {
        axios.delete(`/Products/DeleteProduct/${this.props.delId}`)
        .then(({ data }) => {
            this.props.toggleDeleteProductModal(false);
            this.props.fetchProduct();
        })
        .catch((err) => {
          console.log(err);
        });
      };

    render() {
        
        return (
          <Modal open={this.props.open}>
            <Modal.Header>Delete {this.props.delName} </Modal.Header>
            <Modal.Content>
            Are you sure?
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={() => this.props.toggleDeleteProductModal(false)}>
                Cancel
              </Button>
              <Button
                content="Submit"
                labelPosition='right'
                icon='checkmark'
                onClick={this.handleDelete}
                positive
              />
            </Modal.Actions>
          </Modal>
        )
      }
      }
      
      export default DeleteProduct