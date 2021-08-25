import React, { Component, Fragment } from 'react';
import { Label, Table, Button } from 'semantic-ui-react';
import EditSales from './EditSales'; 
import DeleteSales from './DeleteSales';

export class TableSales extends Component {
   constructor(props) {
     super(props);
        this.state = { 
          editSalesModal: false,
          editId: "",
          editProductId: "",
          editCustomerId: "",
          editStoreId: "",
          editDateSold: "",
          deleteSalesModal: false,
          delId: ""
          }
    }

  editSales = (editSelId, editSelProductId, editSelCustomerId, editSelStoreId, editSelDateSold) => {
    this.setState({
      editSalesModal: true,
      editId: editSelId,
      editProductId: editSelProductId,
      editCustomerId: editSelCustomerId,
      editStoreId: editSelStoreId,
      editDateSold: editSelDateSold
    })
  }

  toggleEditSalesModal = (value) => {
    this.setState({
      editSalesModal: value
    })
  }

  deleteSales = (delSelId) => {
    this.setState({
      deleteSalesModal: true,
      delId: delSelId
    })
  }

  toggleDeleteSalesModal = (value) => {
    this.setState({
      deleteSalesModal: value
    })
  }

  displayPrevPageIcon() {
    if ((this.props.pageNo > 1) && (this.props.noSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchSalesPagePrev(this.props.salesPerPage)}>
          &#60;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }
  
  displayNextPageIcon() {
    if ((this.props.totalSales > (this.props.salesPerPage * this.props.pageNo)) && (this.props.noSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchSalesPageNext(this.props.salesPerPage)}>
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
    if ((this.props.pageNo > 1) && (this.props.productIdSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchSalesSortPagePrev(this.props.salesPerPage)}>
          &#60;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayNextSortPageIcon() { // ProductId sort
    if ((this.props.totalSales > (this.props.salesPerPage * this.props.pageNo)) && (this.props.productIdSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchSalesSortPageNext(this.props.salesPerPage)}>
          &#62;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayPrevCustomerIdSortPageIcon() {
    if ((this.props.pageNo > 1) && (this.props.customerIdSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchSalesCustomerIdSortPagePrev(this.props.salesPerPage)}>
          &#60;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayNextCustomerIdSortPageIcon() {
    if ((this.props.totalSales > (this.props.salesPerPage * this.props.pageNo)) && (this.props.customerIdSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchSalesCustomerIdSortPageNext(this.props.salesPerPage)}>
          &#62;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayNoRecordsSelect() {
    if (this.props.productIdSort === true) {
      return (
        <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchSalesSort(e.target.value)}>
            <option value="5">&nbsp;5&nbsp;</option>
            <option value="10" name="10">&nbsp;10&nbsp;</option>
            <option value="20">&nbsp;20&nbsp;</option>
          </select>
      )
    }
    else if (this.props.customerIdSort === true) {
      return (
      <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchSalesCustomerIdSort(e.target.value)}>
            <option value="5">&nbsp;5&nbsp;</option>
            <option value="10" name="10">&nbsp;10&nbsp;</option>
            <option value="20">&nbsp;20&nbsp;</option>
          </select>
      );
    }
    else {
      return (
      <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchSalesPage(e.target.value)}>
            <option value="5">&nbsp;5&nbsp;</option>
            <option value="10" name="10">&nbsp;10&nbsp;</option>
            <option value="20">&nbsp;20&nbsp;</option>
          </select>
      );
    }
  }

  render() {
    const { editSalesModal, editId, editProductId, editCustomerId, editStoreId, editDateSold, deleteSalesModal, delId } = this.state;
  return (
    <Fragment>
      <EditSales open={editSalesModal} 
      editItem={editId} 
      editProductId={editProductId}
      editCustomerId={editCustomerId}
      editStoreId={editStoreId}
      editDateSold={editDateSold}
      fetchSales={this.props.fetchSales}
      toggleEditSalesModal={this.toggleEditSalesModal}
      saleFetchProduct={this.props.saleFetchProduct} 
      customers={this.props.customers} 
      stores={this.props.stores} />
      <DeleteSales open={deleteSalesModal} 
      toggleDeleteSalesModal={this.toggleDeleteSalesModal} 
      fetchSales={this.props.fetchSales}
      delId={delId} />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={() => this.props.fetchSalesSort(this.props.salesPerPage)}><div className="cursor">Product ▼</div></Table.HeaderCell>
            <Table.HeaderCell onClick={() => this.props.fetchSalesCustomerIdSort(this.props.salesPerPage)}><div className="cursor">Customer ▼</div></Table.HeaderCell>
            <Table.HeaderCell>Store</Table.HeaderCell>
            <Table.HeaderCell>Date Sold</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
           {this.props.sales.map((s) => (
            <Table.Row key={s.id}>
              <Table.Cell>{s.product.name}</Table.Cell>
              <Table.Cell>{s.customer.name}</Table.Cell>
              <Table.Cell>{s.store.name}</Table.Cell>
              <Table.Cell>{s.dateSold.substring(0, 10)}</Table.Cell>
              <Table.Cell>
                <Button color='yellow' onClick={() => this.editSales(s.id, s.productId, s.customerId, s.storeId, s.dateSold)}>Edit</Button>
              </Table.Cell>
              <Table.Cell>
                <Button color='red' onClick={() => this.deleteSales(s.id)}>Delete</Button>
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
          &nbsp;
        </Table.HeaderCell>
        <Table.HeaderCell>
          {this.displayPrevCustomerIdSortPageIcon()}
          {this.displayPrevSortPageIcon()}
          {this.displayPrevPageIcon()}
          {this.displayPageIcon()}
          {this.displayNextPageIcon()}  
          {this.displayNextSortPageIcon()}
          {this.displayNextCustomerIdSortPageIcon()}
        </Table.HeaderCell>
        <Table.HeaderCell>
          &nbsp;
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
  </Fragment>
)
  }
}
export default TableSales