import React, { Component } from 'react';
import TableProduct from './TableProduct';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import CreateProduct from './CreateProduct';

export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productsPerPage: "", // For pagination
      totalProducts: "",
      pageNo: "",
      noSort: false,
      nameSort: false,
      priceSort: false,
      createProductModal: false
    }
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = () => {
    var productsTemp;
    axios.get("/Products/GetProduct")
    .then(({data}) => {
      // console.log(data);
      productsTemp = data;
      this.setState({
        pageNo: 1,
        noSort: true,
        nameSort: false,
        priceSort: false,
        productsPerPage: 10,
        products: productsTemp.slice(0, 10),
        totalProducts: data.length 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchProductPage = (value) => {  
    this.setState({ productsPerPage: value });
    const prodUrl = (`/Products/GetProductPage/${value}`);
    axios.get(prodUrl)
    .then(({data}) => {
      this.setState({
        products: data 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchProductPageNext = (value) => {  // For pagination
    var productsTemp;
    var productsPageIndex = parseInt(this.state.productsPerPage) * parseInt(this.state.pageNo);
    var nextPageCnt = productsPageIndex + parseInt(this.state.productsPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) + 1;
    axios.get("/Products/GetProduct")
    .then(({data}) => {
      productsTemp = data;
      this.setState({ products: productsTemp.slice(productsPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchProductPagePrev = (value) => {  // For pagination
    var productsTemp;
    var productsPageIndex = (parseInt(this.state.productsPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.productsPerPage) * 2);
    var nextPageCnt = productsPageIndex + parseInt(this.state.productsPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) - 1;
    axios.get("/Products/GetProduct")
    .then(({data}) => {
      productsTemp = data;
      this.setState({ products: productsTemp.slice(productsPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchProductSort = (value) => { // Product name sort
    var productsTemp;
    this.setState({
      nameSort: true,
      noSort: false,
      priceSort: false,
      pageNo: 1
    })
    axios.get("/Products/GetProductNameSort")
    .then(({data}) => {
      productsTemp = data;
      this.setState({
        productsPerPage: value, 
        products: productsTemp.slice(0, value),
        totalProducts: data.length 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchProductSortPageNext = (value) => {  // Product name sort
    var productsTemp;
    var productsPageIndex = parseInt(this.state.productsPerPage) * parseInt(this.state.pageNo);
    var nextPageCnt = productsPageIndex + parseInt(this.state.productsPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) + 1;
    axios.get("/Products/GetProductNameSort")
    .then(({data}) => {
      productsTemp = data;
      this.setState({ products: productsTemp.slice(productsPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchProductSortPagePrev = (value) => {  // Product name sort
    var productsTemp;
    var productsPageIndex = (parseInt(this.state.productsPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.productsPerPage) * 2);
    var nextPageCnt = productsPageIndex + parseInt(this.state.productsPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) - 1;
    axios.get("/Products/GetProductNameSort")
    .then(({data}) => {
      productsTemp = data;
      this.setState({ products: productsTemp.slice(productsPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchProductPriceSort = (value) => {
    var productsTemp;
    this.setState({
      priceSort: true,
      noSort: false,
      nameSort: false,
      pageNo: 1
    })
    axios.get("/Products/GetProductPriceSort")
    .then(({data}) => {
      productsTemp = data;
      this.setState({
        productsPerPage: value, 
        products: productsTemp.slice(0, value),
        totalProducts: data.length 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchProductPriceSortPageNext = (value) => {  
    var productsTemp;
    var productsPageIndex = parseInt(this.state.productsPerPage) * parseInt(this.state.pageNo);
    var nextPageCnt = productsPageIndex + parseInt(this.state.productsPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) + 1;
    axios.get("/Products/GetProductPriceSort")
    .then(({data}) => {
      productsTemp = data;
      this.setState({ products: productsTemp.slice(productsPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchProductPriceSortPagePrev = (value) => {  
    var productsTemp;
    var productsPageIndex = (parseInt(this.state.productsPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.productsPerPage) * 2);
    var nextPageCnt = productsPageIndex + parseInt(this.state.productsPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) - 1;
    axios.get("/Products/GetProductPriceSort")
    .then(({data}) => {
      productsTemp = data;
      this.setState({ products: productsTemp.slice(productsPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  toggleCreateProductModal = (value) => {
    this.setState({
      createProductModal: value
    })
  }

  render () {
    const { products, createProductModal } = this.state;
    return (
      <div className='margin'>
          <CreateProduct open={createProductModal} 
            toggleCreateProductModal={this.toggleCreateProductModal}
            fetchProduct={this.fetchProduct} />
          <h1>Product</h1>
          <br />
          <Button primary onClick={() => this.toggleCreateProductModal(true)}>Create Product</Button>
          <p></p>
          <TableProduct products={products} 
          fetchProduct={this.fetchProduct} 
          pageNo={this.state.pageNo} 
          totalProducts={this.state.totalProducts} 
          noSort={this.state.noSort}
          productsPerPage={this.state.productsPerPage} 
          fetchProductPage={this.fetchProductPage} 
          fetchProductPageNext={this.fetchProductPageNext} 
          fetchProductPagePrev={this.fetchProductPagePrev} 
          fetchProductSort={this.fetchProductSort} 
          nameSort={this.state.nameSort} 
          fetchProductSortPageNext={this.fetchProductSortPageNext}
          fetchProductSortPagePrev={this.fetchProductSortPagePrev} 
          priceSort={this.state.priceSort}
          fetchProductPriceSort={this.fetchProductPriceSort}
          fetchProductPriceSortPageNext={this.fetchProductPriceSortPageNext} 
          fetchProductPriceSortPagePrev={this.fetchProductPriceSortPagePrev} />
      </div>
    );
  }
}