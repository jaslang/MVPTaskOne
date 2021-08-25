import React, { Component, Fragment } from 'react';
import { Label, Table, Button } from 'semantic-ui-react';
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
          delName: ""
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
    if ((this.props.pageNo > 1) && (this.props.noSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchStorePagePrev(this.props.storesPerPage)}>
          &#60;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }
  
  displayNextPageIcon() {
    if ((this.props.totalStores > (this.props.storesPerPage * this.props.pageNo)) && (this.props.noSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchStorePageNext(this.props.storesPerPage)}>
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
        <Label className="cursor" color='blue' onClick={() => this.props.fetchStoreSortPagePrev(this.props.storesPerPage)}>
          &#60;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayNextSortPageIcon() { // Name sort
    if ((this.props.totalStores > (this.props.storesPerPage * this.props.pageNo)) && (this.props.nameSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchStoreSortPageNext(this.props.storesPerPage)}>
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
        <Label className="cursor" color='blue' onClick={() => this.props.fetchStoreAddressSortPagePrev(this.props.storesPerPage)}>
          &#60;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayNextAddressSortPageIcon() {
    if ((this.props.totalStores > (this.props.storesPerPage * this.props.pageNo)) && (this.props.addressSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchStoreAddressSortPageNext(this.props.storesPerPage)}>
          &#62;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayNoRecordsSelect() {
    if (this.props.nameSort === true) {
      return (
        <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchStoreSort(e.target.value)}>
            <option value="5">&nbsp;5&nbsp;</option>
            <option value="10" name="10">&nbsp;10&nbsp;</option>
            <option value="20">&nbsp;20&nbsp;</option>
          </select>
      )
    }
    else if (this.props.addressSort === true) {
      return (
      <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchStoreAddressSort(e.target.value)}>
            <option value="5">&nbsp;5&nbsp;</option>
            <option value="10" name="10">&nbsp;10&nbsp;</option>
            <option value="20">&nbsp;20&nbsp;</option>
          </select>
      );
    }
    else {
      return (
      <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchStorePage(e.target.value)}>
            <option value="5">&nbsp;5&nbsp;</option>
            <option value="10" name="10">&nbsp;10&nbsp;</option>
            <option value="20">&nbsp;20&nbsp;</option>
          </select>
      );
    }
  }

  render() {
    const { editStoreModal, editId, editName, editAddress, deleteStoreModal, delId, delName } = this.state;
  return (
    <Fragment>
      <EditStore open={editStoreModal} 
      editItem={editId} 
      editName={editName}
      editAddress={editAddress}
      fetchStore={this.props.fetchStore}
      toggleEditStoreModal={this.toggleEditStoreModal} />
      <DeleteStore open={deleteStoreModal} 
      toggleDeleteStoreModal={this.toggleDeleteStoreModal} 
      fetchStore={this.props.fetchStore}
      delId={delId} 
      delName={delName} />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={() => this.props.fetchStoreSort(this.props.storesPerPage)}><div className="cursor">Name ▼</div></Table.HeaderCell>
            <Table.HeaderCell onClick={() => this.props.fetchStoreAddressSort(this.props.storesPerPage)}><div className="cursor">Address ▼</div></Table.HeaderCell>
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
                <Button color='yellow' onClick={() => this.editStore(s.id, s.name, s.address)}>Edit</Button>
              </Table.Cell>
              <Table.Cell>
                <Button color='red' onClick={() => this.deleteStore(s.id, s.name)}>Delete</Button>
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
export default TableStore