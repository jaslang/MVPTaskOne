import React, { Component, Fragment } from 'react';
import { Label, Table, Button, Icon } from 'semantic-ui-react';
import EditStore from './EditStore'; 
import DeleteStore from './DeleteStore';

export class TableStore extends Component {
   constructor(props) {
     super(props);
        this.state = { 
          editStoreModal: false,
          editId: "",
          editName: "",
          editAddress: "",
          deleteStoreModal: false,
          delId: "",
          delName: "",
          perPage: 0
          }
    }

  editStore = (editSelId, editSelName, editSelAddress) => {
    this.setState({
      editStoreModal: true,
      editId: editSelId,
      editName: editSelName,
      editAddress: editSelAddress
    })
  }

  toggleEditStoreModal = (value) => {
    this.setState({
      editStoreModal: value
    })
  }

  deleteStore = (delSelId, delSelName) => {
    this.setState({
      deleteStoreModal: true,
      delId: delSelId,
      delName: delSelName
    })
  }

  toggleDeleteStoreModal = (value) => {
    this.setState({
      deleteStoreModal: value
    })
  }

  displayPrevPageIcon() {
    if (this.props.pageNo > 1)
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchStoreNew(this.props.storesPerPage, false, false, false, true)}>
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
    if (this.props.totalStores > (this.props.storesPerPage * this.props.pageNo))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchStoreNew(this.props.storesPerPage, false, false, true, false)}>
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
    const { editStoreModal, editId, editName, editAddress, deleteStoreModal, delId, delName } = this.state;
  return (
    <Fragment>
      <EditStore open={editStoreModal} 
      editItem={editId} 
      editName={editName} 
      editAddress={editAddress} 
      storesPerPage={this.props.storesPerPage} 
      fetchStoreNew={this.props.fetchStoreNew} 
      toggleEditStoreModal={this.toggleEditStoreModal} />
      <DeleteStore open={deleteStoreModal} 
      toggleDeleteStoreModal={this.toggleDeleteStoreModal} 
      storesPerPage={this.props.storesPerPage} 
      fetchStoreNew={this.props.fetchStoreNew} 
      delId={delId} 
      delName={delName} />
      <Table celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={() => this.props.fetchStoreNew(this.props.storesPerPage, true, false, false, false)}><div className="cursor">Name {this.displayNameSortIcon()}</div></Table.HeaderCell>
            <Table.HeaderCell onClick={() => this.props.fetchStoreNew(this.props.storesPerPage, false, true, false, false)}><div className="cursor">Address {this.displayAddressSortIcon()}</div></Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.stores.map((s) => (
            <Table.Row key={s.id}>
              <Table.Cell>{s.name}</Table.Cell>
              <Table.Cell>{s.address}</Table.Cell>
              <Table.Cell>
                <Button color='yellow' onClick={() => this.editStore(s.id, s.name, s.address)}><Icon fitted name='edit outline' /> EDIT</Button>
              </Table.Cell>
              <Table.Cell>
                <Button color='red' onClick={() => this.deleteStore(s.id, s.name)}><Icon fitted name='trash' /> DELETE</Button>
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
              <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchStoreNew(e.target.value, false, false, false, false)}>
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
export default TableStore