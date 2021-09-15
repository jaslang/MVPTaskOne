import React, { Component, Fragment } from 'react';
import { Label, Table, Button, Icon } from 'semantic-ui-react';
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
          delId: "",
          delProductId: ""
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
    if (this.props.pageNo > 1)
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchSalesNew(this.props.salesPerPage, false, false, false, false, false, true)}>
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
    if (this.props.totalSales > (this.props.salesPerPage * this.props.pageNo))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchSalesNew(this.props.salesPerPage, false, false, false, false, true, false)}>
          &#62;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayProductIdSortIcon() {
    if (this.props.productIdSortAsc === true) {
      return ( <Fragment>↑</Fragment> );
    } else if (this.props.productIdSortDesc === true) {
      return ( <Fragment>↓</Fragment> )
    }
    else return "↑ ↓";
  }

  displayCustomerIdSortIcon() {
    if (this.props.customerIdSortAsc === true) {
      return ( <Fragment>↑</Fragment> );
    } else if (this.props.customerIdSortDesc === true) {
      return ( <Fragment>↓</Fragment> )
    }
    else return "↑ ↓";
  }

  displayStoreIdSortIcon() {
    if (this.props.storeIdSortAsc === true) {
      return ( <Fragment>↑</Fragment> );
    } else if (this.props.storeIdSortDesc === true) {
      return ( <Fragment>↓</Fragment> )
    }
    else return "↑ ↓";
  }

  displayDateSoldSortIcon() {
    if (this.props.dateSoldSortAsc === true) {
      return ( <Fragment>↑</Fragment> );
    } else if (this.props.dateSoldSortDesc === true) {
      return ( <Fragment>↓</Fragment> )
    }
    else return "↑ ↓";
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
      salesPerPage={this.props.salesPerPage} 
      fetchSalesNew={this.props.fetchSalesNew} 
      toggleEditSalesModal={this.toggleEditSalesModal} 
      products={this.props.products} 
      customers={this.props.customers} 
      stores={this.props.stores} />
      <DeleteSales open={deleteSalesModal} 
      toggleDeleteSalesModal={this.toggleDeleteSalesModal} 
      salesPerPage={this.props.salesPerPage} 
      fetchSalesNew={this.props.fetchSalesNew} 
      delId={delId} />
      <Table celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={() => this.props.fetchSalesNew(this.props.salesPerPage, true, false, false, false, false, false)}><div className="cursor">Product{this.displayProductIdSortIcon()}</div></Table.HeaderCell>
            <Table.HeaderCell onClick={() => this.props.fetchSalesNew(this.props.salesPerPage, false, true, false, false, false, false)}><div className="cursor">Customer{this.displayCustomerIdSortIcon()}</div></Table.HeaderCell>
            <Table.HeaderCell onClick={() => this.props.fetchSalesNew(this.props.salesPerPage, false, false, true, false, false, false)}><div className="cursor">Store{this.displayStoreIdSortIcon()}</div></Table.HeaderCell>
            <Table.HeaderCell onClick={() => this.props.fetchSalesNew(this.props.salesPerPage, false, false, false, true, false, false)}><div className="cursor">Date Sold{this.displayDateSoldSortIcon()}</div></Table.HeaderCell>
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
                <Button color='yellow' onClick={() => this.editSales(s.id, s.productId, s.customerId, s.storeId, s.dateSold)}><Icon fitted name='edit outline' /> EDIT</Button>
              </Table.Cell>
              <Table.Cell>
                <Button color='red' onClick={() => this.deleteSales(s.id)}><Icon fitted name='trash' /> DELETE</Button>
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
              <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchSalesNew(e.target.value, false, false, false, false, false, false)}>
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
export default TableSales