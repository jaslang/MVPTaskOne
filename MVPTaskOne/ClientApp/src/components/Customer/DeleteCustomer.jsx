import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import DeleteCustErrorMsg from './DeleteCustErrorMsg';

export class DeleteCustomer extends Component {
    constructor(props) {
      super(props);
      this.handleDelete = this.handleDelete.bind(this);
      this.toggleDeleteErrorMsgModal = this.toggleDeleteErrorMsgModal.bind(this);
      this.deleteErrorMsg = this.deleteErrorMsg.bind(this);
      this.state = {
        deleteErrorMsgModal: false,
        errorMsg: ""
      }
    }

    handleDelete = () => {
        axios.delete(`/Customers/DeleteCustomer/${this.props.delId}`)
        .then(({ data }) => {
            this.props.toggleDeleteCustomerModal(false);
            this.props.fetchCustomerNew(this.props.customersPerPage, false, false, false, false);
        })
        .catch((err) => {
          console.log(err);
          this.deleteErrorMsg(err.message);
        });
      };

    // For Delete error-------------
    deleteErrorMsg = (errorMsg) => {
      this.setState({
        deleteErrorMsgModal: true,
        errorMsg: errorMsg
      })
    }
  
    toggleDeleteErrorMsgModal = (value) => {
      this.setState({
        deleteErrorMsgModal: value
      })
    }
    // --------------------------

    render() {
      const { deleteErrorMsgModal, errorMsg } = this.state;
        return (
          <Fragment>
            <DeleteCustErrorMsg open={deleteErrorMsgModal} 
            toggleDeleteErrorMsgModal={this.toggleDeleteErrorMsgModal} 
            errorMsg={errorMsg}
            delName={this.props.delName} />
          <Modal open={this.props.open}>
            <Modal.Header>Delete {this.props.delName} </Modal.Header>
            <Modal.Content>
            Are you sure?
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={() => this.props.toggleDeleteCustomerModal(false)}>
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
          </Fragment>
        )
      }
    }
      
    export default DeleteCustomer