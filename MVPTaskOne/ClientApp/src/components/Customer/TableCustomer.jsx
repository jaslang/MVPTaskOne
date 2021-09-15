import React, { Component, Fragment } from 'react';
import { Label, Table, Button, Icon } from 'semantic-ui-react';
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
          delName: "",
          perPage: 0
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
    if (this.props.pageNo > 1)
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchCustomerNew(this.props.customersPerPage, false, false, false, true)}>
          &#60;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayPageIcon() {
    return (<Label color='blue'>{this.props.pageNo}</Label>);
  }

  displayNextPageIcon() {
    if (this.props.totalCustomers > (this.props.customersPerPage * this.props.pageNo))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchCustomerNew(this.props.customersPerPage, false, false, true, false)}>
          &#62;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayNameSortIcon() {
    if (this.props.nameSortAsc === true) {
      return ( <Fragment>↑</Fragment> );
    } else if (this.props.nameSortDesc === true) {
      return ( <Fragment>↓</Fragment> )
    }
    else return "↑ ↓";
  }

  displayAddressSortIcon() {
    if (this.props.addressSortAsc === true) {
      return ( <Fragment>↑</Fragment> );
    } else if (this.props.addressSortDesc === true) {
      return ( <Fragment>↓</Fragment> )
    }
    else return "↑ ↓";
  }

  render() {
    const { editCustomerModal, editId, editName, editAddress, deleteCustomerModal, delId, delName } = this.state;
  return (
    <Fragment>
      <EditCustomer open={editCustomerModal} 
      editItem={editId} 
      editName={editName} 
      editAddress={editAddress} 
      customersPerPage={this.props.customersPerPage} 
      fetchCustomerNew={this.props.fetchCustomerNew} 
      toggleEditCustomerModal={this.toggleEditCustomerModal} />
      <DeleteCustomer open={deleteCustomerModal} 
      toggleDeleteCustomerModal={this.toggleDeleteCustomerModal} 
      customersPerPage={this.props.customersPerPage} 
      fetchCustomerNew={this.props.fetchCustomerNew} 
      delId={delId} 
      delName={delName} />
      <Table celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={() => this.props.fetchCustomerNew(this.props.customersPerPage, true, false, false, false)}><div className="cursor">Name {this.displayNameSortIcon()}</div></Table.HeaderCell>
            <Table.HeaderCell onClick={() => this.props.fetchCustomerNew(this.props.customersPerPage, false, true, false, false)}><div className="cursor">Address {this.displayAddressSortIcon()}</div></Table.HeaderCell>
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
                <Button color='yellow' onClick={() => this.editCustomer(s.id, s.name, s.address)}><Icon fitted name='edit outline' /> EDIT</Button>
              </Table.Cell>
              <Table.Cell>
                <Button color='red' onClick={() => this.deleteCustomer(s.id, s.name)}><Icon fitted name='trash' /> DELETE</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body> 
      </Table>

      <table border="0" width="100%">
        <thead>
          <tr>
            <th align="left">
              &nbsp;
              <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchCustomerNew(e.target.value, false, false, false, false)}>
                <option value="5" name="5">&nbsp;5&nbsp;</option>
                <option value="10" name="10">&nbsp;10&nbsp;</option>
                <option value="20" name="20">&nbsp;20&nbsp;</option>
              </select>
            </th>
            <th align="right">
              {this.displayPrevPageIcon()}
              {this.displayPageIcon()}
              {this.displayNextPageIcon()} 
              &nbsp;
            </th>
          </tr>
        </thead>
      </table>
      <br />
    </Fragment>
    )
  }
}
export default TableCustomer