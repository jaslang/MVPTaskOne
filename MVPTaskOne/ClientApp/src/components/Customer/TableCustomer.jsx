import React, { Component, Fragment } from 'react';
import { Label, Table, Button } from 'semantic-ui-react';
import EditCustomer from './EditCustomer'; 
import DeleteCustomer from './DeleteCustomer';

export class TableCustomer extends Component {
   constructor(props) {
     super(props);
        this.state = { 
          editCustomerModal: false,
          editId: "",
          editName: "",
          editAddress: "",
          deleteCustomerModal: false,
          delId: "",
          delName: ""
          }
    }

  editCustomer = (editSelId, editSelName, editSelAddress) => {
    this.setState({
      editCustomerModal: true,
      editId: editSelId,
      editName: editSelName,
      editAddress: editSelAddress
    })
  }

  toggleEditCustomerModal = (value) => {
    this.setState({
      editCustomerModal: value
    })
  }

  deleteCustomer = (delSelId, delSelName) => {
    this.setState({
      deleteCustomerModal: true,
      delId: delSelId,
      delName: delSelName
    })
  }

  toggleDeleteCustomerModal = (value) => {
    this.setState({
      deleteCustomerModal: value
    })
  }

  displayPrevPageIcon() {
    if ((this.props.pageNo > 1) && (this.props.noSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchCustomerPagePrev(this.props.customersPerPage)}>
          &#60;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }
  
  displayNextPageIcon() {
    if ((this.props.totalCustomers > (this.props.customersPerPage * this.props.pageNo)) && (this.props.noSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchCustomerPageNext(this.props.customersPerPage)}>
          &#62;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayPageIcon() {
    return (<Label color='blue'>{this.props.pageNo}</Label>);
  }

  displayPrevSortPageIcon() {
    if ((this.props.pageNo > 1) && (this.props.nameSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchCustomerSortPagePrev(this.props.customersPerPage)}>
          &#60;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayNextSortPageIcon() { // Name sort
    if ((this.props.totalCustomers > (this.props.customersPerPage * this.props.pageNo)) && (this.props.nameSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchCustomerSortPageNext(this.props.customersPerPage)}>
          &#62;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayPrevAddressSortPageIcon() {
    if ((this.props.pageNo > 1) && (this.props.addressSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchCustomerAddressSortPagePrev(this.props.customersPerPage)}>
          &#60;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayNextAddressSortPageIcon() {
    if ((this.props.totalCustomers > (this.props.customersPerPage * this.props.pageNo)) && (this.props.addressSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchCustomerAddressSortPageNext(this.props.customersPerPage)}>
          &#62;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayNoRecordsSelect() {
    if (this.props.nameSort === true) {
      return (
        <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchCustomerSort(e.target.value)}>
            <option value="5">&nbsp;5&nbsp;</option>
            <option value="10" name="10">&nbsp;10&nbsp;</option>
            <option value="20">&nbsp;20&nbsp;</option>
          </select>
      )
    }
    else if (this.props.addressSort === true) {
      return (
      <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchCustomerAddressSort(e.target.value)}>
            <option value="5">&nbsp;5&nbsp;</option>
            <option value="10" name="10">&nbsp;10&nbsp;</option>
            <option value="20">&nbsp;20&nbsp;</option>
          </select>
      );
    }
    else {
      return (
      <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchCustomerPage(e.target.value)}>
            <option value="5">&nbsp;5&nbsp;</option>
            <option value="10" name="10">&nbsp;10&nbsp;</option>
            <option value="20">&nbsp;20&nbsp;</option>
          </select>
      );
    }
  }

  render() {
    const { editCustomerModal, editId, editName, editAddress, deleteCustomerModal, delId, delName } = this.state;
  return (
    <Fragment>
      <EditCustomer open={editCustomerModal} 
      editItem={editId} 
      editName={editName}
      editAddress={editAddress}
      fetchCustomer={this.props.fetchCustomer}
      toggleEditCustomerModal={this.toggleEditCustomerModal} />
      <DeleteCustomer open={deleteCustomerModal} 
      toggleDeleteCustomerModal={this.toggleDeleteCustomerModal} 
      fetchCustomer={this.props.fetchCustomer}
      delId={delId} 
      delName={delName} />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={() => this.props.fetchCustomerSort(this.props.customersPerPage)}><div className="cursor">Name ▼</div></Table.HeaderCell>
            <Table.HeaderCell onClick={() => this.props.fetchCustomerAddressSort(this.props.customersPerPage)}><div className="cursor">Address ▼</div></Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.customers.map((s) => (
            <Table.Row key={s.id}>
              <Table.Cell>{s.name}</Table.Cell>
              <Table.Cell>{s.address}</Table.Cell>
              <Table.Cell>
                <Button color='yellow' onClick={() => this.editCustomer(s.id, s.name, s.address)}>Edit</Button>
              </Table.Cell>
              <Table.Cell>
                <Button color='red' onClick={() => this.deleteCustomer(s.id, s.name)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body> 

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell>
          {this.displayNoRecordsSelect()}
        </Table.HeaderCell>
        <Table.HeaderCell>
          {this.displayPrevAddressSortPageIcon()}
          {this.displayPrevSortPageIcon()}
          {this.displayPrevPageIcon()}
          {this.displayPageIcon()}
          {this.displayNextPageIcon()}  
          {this.displayNextSortPageIcon()}
          {this.displayNextAddressSortPageIcon()}
        </Table.HeaderCell>
        <Table.HeaderCell>
          &nbsp;
        </Table.HeaderCell>
        <Table.HeaderCell>
          &nbsp;
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
  <br />
  </Fragment>
)
  }
}
export default TableCustomer