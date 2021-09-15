import React, { Component, Fragment } from 'react';
import { Label, Table, Button, Icon } from 'semantic-ui-react';
import EditProduct from './EditProduct'; 
import DeleteProduct from './DeleteProduct';

export class TableProduct extends Component {
   constructor(props) {
     super(props);
        this.state = { 
          editProductModal: false,
          editId: "",
          editName: "",
          editPrice: "",
          deleteProductModal: false,
          delId: "",
          delName: "",
          perPage: 0
          }
    }

  editProduct = (editSelId, editSelName, editSelPrice) => {
    this.setState({
      editProductModal: true,
      editId: editSelId,
      editName: editSelName,
      editPrice: editSelPrice
    })
  }

  toggleEditProductModal = (value) => {
    this.setState({
      editProductModal: value
    })
  }

  deleteProduct = (delSelId, delSelName) => {
    this.setState({
      deleteProductModal: true,
      delId: delSelId,
      delName: delSelName
    })
  }

  toggleDeleteProductModal = (value) => {
    this.setState({
      deleteProductModal: value
    })
  }

  formatter = (value) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);

  displayPrevPageIcon() {
    if (this.props.pageNo > 1)
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchProductNew(this.props.productsPerPage, false, false, false, true)}>
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
    if (this.props.totalProducts > (this.props.productsPerPage * this.props.pageNo))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchProductNew(this.props.productsPerPage, false, false, true, false)}>
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

  displayPriceSortIcon() {
    if (this.props.priceSortAsc === true) {
      return ( <Fragment>↑</Fragment> );
    } else if (this.props.priceSortDesc === true) {
      return ( <Fragment>↓</Fragment> )
    }
    else return "↑ ↓";
  }

  render() {
    const { editProductModal, editId, editName, editPrice, deleteProductModal, delId, delName } = this.state;
  return (
    <Fragment>
      <EditProduct open={editProductModal} 
      editItem={editId} 
      editName={editName} 
      editPrice={editPrice} 
      productsPerPage={this.props.productsPerPage} 
      fetchProductNew={this.props.fetchProductNew} 
      toggleEditProductModal={this.toggleEditProductModal} />
      <DeleteProduct open={deleteProductModal} 
      toggleDeleteProductModal={this.toggleDeleteProductModal} 
      productsPerPage={this.props.productsPerPage} 
      fetchProductNew={this.props.fetchProductNew} 
      delId={delId} 
      delName={delName} />
      <Table celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={() => this.props.fetchProductNew(this.props.productsPerPage, true, false, false, false)}><div className="cursor">Name {this.displayNameSortIcon()}</div></Table.HeaderCell>
            <Table.HeaderCell onClick={() => this.props.fetchProductNew(this.props.productsPerPage, false, true, false, false)}><div className="cursor">Price {this.displayPriceSortIcon()}</div></Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.products.map((s) => (
            <Table.Row key={s.id}>
              <Table.Cell>{s.name}</Table.Cell>
              <Table.Cell>{this.formatter(s.price)}</Table.Cell>
              <Table.Cell>
                <Button color='yellow' onClick={() => this.editProduct(s.id, s.name, s.price)}><Icon fitted name='edit outline' /> EDIT</Button>
              </Table.Cell>
              <Table.Cell>
                <Button color='red' onClick={() => this.deleteProduct(s.id, s.name)}><Icon fitted name='trash' /> DELETE</Button>
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
              <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchProductNew(e.target.value, false, false, false, false)}>
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
export default TableProduct