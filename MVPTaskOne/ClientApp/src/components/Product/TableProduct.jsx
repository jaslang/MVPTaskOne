import React, { Component, Fragment } from 'react';
import { Label, Table, Button } from 'semantic-ui-react';
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
          delName: ""
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
    if ((this.props.pageNo > 1) && (this.props.noSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchProductPagePrev(this.props.productsPerPage)}>
          &#60;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }
  
  displayNextPageIcon() {
    if ((this.props.totalProducts > (this.props.productsPerPage * this.props.pageNo)) && (this.props.noSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchProductPageNext(this.props.productsPerPage)}>
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
        <Label className="cursor" color='blue' onClick={() => this.props.fetchProductSortPagePrev(this.props.productsPerPage)}>
          &#60;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayNextSortPageIcon() { // Name sort
    if ((this.props.totalProducts > (this.props.productsPerPage * this.props.pageNo)) && (this.props.nameSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchProductSortPageNext(this.props.productsPerPage)}>
          &#62;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayPrevPriceSortPageIcon() {
    if ((this.props.pageNo > 1) && (this.props.priceSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchProductPriceSortPagePrev(this.props.productsPerPage)}>
          &#60;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayNextPriceSortPageIcon() {
    if ((this.props.totalProducts > (this.props.productsPerPage * this.props.pageNo)) && (this.props.priceSort === true))
    {
      return (
      <Fragment>
        <Label className="cursor" color='blue' onClick={() => this.props.fetchProductPriceSortPageNext(this.props.productsPerPage)}>
          &#62;
        </Label>
      </Fragment>);
    } 
    else return " ";
  }

  displayNoRecordsSelect() {
    if (this.props.nameSort === true) {
      return (
        <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchProductSort(e.target.value)}>
            <option value="5">&nbsp;5&nbsp;</option>
            <option value="10" name="10">&nbsp;10&nbsp;</option>
            <option value="20">&nbsp;20&nbsp;</option>
          </select>
      )
    }
    else if (this.props.priceSort === true) {
      return (
      <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchProductPriceSort(e.target.value)}>
            <option value="5">&nbsp;5&nbsp;</option>
            <option value="10" name="10">&nbsp;10&nbsp;</option>
            <option value="20">&nbsp;20&nbsp;</option>
          </select>
      );
    }
    else {
      return (
      <select name="RecordSel" id="RecordSel" defaultValue="10" onChange={(e) => this.props.fetchProductPage(e.target.value)}>
            <option value="5">&nbsp;5&nbsp;</option>
            <option value="10" name="10">&nbsp;10&nbsp;</option>
            <option value="20">&nbsp;20&nbsp;</option>
          </select>
      );
    }
  }

  render() {
    const { editProductModal, editId, editName, editPrice, deleteProductModal, delId, delName } = this.state;
  return (
    <Fragment>
      <EditProduct open={editProductModal} 
      editItem={editId} 
      editName={editName}
      editPrice={editPrice}
      fetchProduct={this.props.fetchProduct}
      toggleEditProductModal={this.toggleEditProductModal} />
      <DeleteProduct open={deleteProductModal} 
      toggleDeleteProductModal={this.toggleDeleteProductModal} 
      fetchProduct={this.props.fetchProduct}
      delId={delId} 
      delName={delName} />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={() => this.props.fetchProductSort(this.props.productsPerPage)}><div className="cursor">Name ▼</div></Table.HeaderCell>
            <Table.HeaderCell onClick={() => this.props.fetchProductPriceSort(this.props.productsPerPage)}><div className="cursor">Price ▼</div></Table.HeaderCell>
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
                <Button color='yellow' onClick={() => this.editProduct(s.id, s.name, s.price)}>Edit</Button>
              </Table.Cell>
              <Table.Cell>
                <Button color='red' onClick={() => this.deleteProduct(s.id, s.name)}>Delete</Button>
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
          {this.displayPrevPriceSortPageIcon()}
          {this.displayPrevSortPageIcon()}
          {this.displayPrevPageIcon()}
          {this.displayPageIcon()}
          {this.displayNextPageIcon()}  
          {this.displayNextSortPageIcon()}
          {this.displayNextPriceSortPageIcon()}
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
export default TableProduct
