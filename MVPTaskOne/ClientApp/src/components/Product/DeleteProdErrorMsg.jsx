import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'

export class DeleteProdErrorMsg extends Component {

    render() {
        
        return (
          <Modal open={this.props.open}>
            <Modal.Header>Error: {this.props.errorMsg} </Modal.Header>
            <Modal.Content>
            Please delete any Sales with {this.props.delName} before deleting the product.
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={() => this.props.toggleDeleteErrorMsgModal(false)}>
                Ok
              </Button>
            </Modal.Actions>
          </Modal>
        )
      }
    }
      
    export default DeleteProdErrorMsg