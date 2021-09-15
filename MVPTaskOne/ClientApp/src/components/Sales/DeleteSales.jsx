import axios from 'axios';
import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'

export class DeleteSales extends Component {
    constructor(props) {
      super(props);
      this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete = () => {
        axios.delete(`/Sales/DeleteSales/${this.props.delId}`)
        .then(({ data }) => {
            this.props.toggleDeleteSalesModal(false);
            this.props.fetchSalesNew(this.props.salesPerPage, false, false, false, false, false, false);
            // this.props.fetchSales();
        })
        .catch((err) => {
          console.log(err);
        });
      };

    render() {
        
        return (
          <Modal open={this.props.open}>
            <Modal.Header>Delete {this.props.delid} </Modal.Header>
            <Modal.Content>
            Are you sure?
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={() => this.props.toggleDeleteSalesModal(false)}>
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
      
      export default DeleteSales