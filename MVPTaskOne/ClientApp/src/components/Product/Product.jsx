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
      nameSortAsc: false,
      nameSortDesc: false,
      priceSort: false,
      priceSortAsc: false,
      priceSortDesc: false,
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
        // products: data
        pageNo: 1,
        noSort: true,
        nameSort: false,
        priceSort: false,
        productsPerPage: 10,
        products: productsTemp.slice(0, 10),
        totalProducts: data.length,
        priceSortAsc: false,
        priceSortDesc: false,
        nameSortAsc: false,
        nameSortDesc: false
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  // ***************** Sort, Pagination, Records per page *********************
  fetchProductNew = (cntPerPage, SortSel, AddrSortSel, nextPageSel, prvPageSel) => { // Product name sort
    var productsTemp;
    var arrayTemp;
    var nextPageCnt;
    var productsPageIndex;

    if (SortSel === true) {
      this.setState({
        nameSort: true,
        noSort: false,
        priceSort: false,
        priceSortAsc: false,
        priceSortDesc: false,
      })
    }

    if (AddrSortSel === true) {
      this.setState({
        nameSort: false,
        noSort: false,
        priceSort: true,
        nameSortAsc: false,
        nameSortDesc: false,
      })
    }

    if (nextPageSel === true) {
      productsPageIndex = parseInt(this.state.productsPerPage) * parseInt(this.state.pageNo);
      nextPageCnt = productsPageIndex + parseInt(this.state.productsPerPage);
      this.setState({ pageNo: parseInt(this.state.pageNo) + 1 });
    }

    if (prvPageSel === true) {
      productsPageIndex = (parseInt(this.state.productsPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.productsPerPage) * 2);
      nextPageCnt = productsPageIndex + parseInt(this.state.productsPerPage);
      this.setState({ pageNo: parseInt(this.state.pageNo) - 1 });
    }

    if (SortSel === true && this.state.nameSortAsc === false && this.state.nameSortDesc === true) {
      this.setState({ nameSortAsc: true, nameSortDesc: false });
    } else if (SortSel === true && this.state.nameSortAsc === true && this.state.nameSortDesc === false) {
      this.setState({ nameSortDesc: true, nameSortAsc: false });
    } else if (SortSel === true && this.state.nameSortAsc === false && this.state.nameSortDesc === false) {
      this.setState({ nameSortAsc: true, nameSortDesc: false });
    }

    if (AddrSortSel === true && this.state.priceSortAsc === false && this.state.priceSortDesc === true) {
      this.setState({ priceSortAsc: true, priceSortDesc: false });
    } else if (AddrSortSel === true && this.state.priceSortAsc === true && this.state.priceSortDesc === false) {
      this.setState({ priceSortDesc: true, priceSortAsc: false });
    } else if (AddrSortSel === true && this.state.priceSortAsc === false && this.state.priceSortDesc === false) {
      this.setState({ priceSortAsc: true, priceSortDesc: false });
    }

    axios.get("/Products/GetProduct")
      .then(({data}) => {
        arrayTemp = data;
        if (this.state.nameSort === true && SortSel === true && this.state.nameSortAsc === true) {
          productsTemp = arrayTemp.sort((a, b) => (a.name > b.name) ? 1 : -1);
        } 
        if (this.state.nameSort === true && SortSel === true && this.state.nameSortDesc === true) {
          productsTemp = arrayTemp.sort((a, b) => (a.name < b.name) ? 1 : -1);
        }
        if (SortSel === false && this.state.nameSortAsc === true) {
          productsTemp = arrayTemp.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }
        if (SortSel === false && this.state.nameSortDesc === true) {
          productsTemp = arrayTemp.sort((a, b) => (a.name < b.name) ? 1 : -1);
        }

        if (this.state.priceSort === true && AddrSortSel === true && this.state.priceSortAsc === true) {
          productsTemp = arrayTemp.sort((a, b) => (a.price > b.price) ? 1 : -1);
        } 
        if (this.state.priceSort === true && AddrSortSel === true && this.state.priceSortDesc === true) {
          productsTemp = arrayTemp.sort((a, b) => (a.price < b.price) ? 1 : -1);
        }
        if (AddrSortSel === false && this.state.priceSortAsc === true) {
          productsTemp = arrayTemp.sort((a, b) => (a.price > b.price) ? 1 : -1);
        }
        if (AddrSortSel === false && this.state.priceSortDesc === true) {
          productsTemp = arrayTemp.sort((a, b) => (a.price < b.price) ? 1 : -1);
        }

        if (this.state.noSort === true && nextPageSel === false && prvPageSel === false) {
          productsTemp = arrayTemp;
          productsPageIndex = (parseInt(cntPerPage) * parseInt(this.state.pageNo)) - parseInt(cntPerPage);
          nextPageCnt = productsPageIndex + parseInt(cntPerPage);
          this.setState({ 
            productsPerPage: cntPerPage,
            products: productsTemp.slice(productsPageIndex, nextPageCnt),
            totalProducts: arrayTemp.length
          });
        }

        if (nextPageSel === false && prvPageSel === false && this.state.noSort === false) {
          productsPageIndex = (parseInt(cntPerPage) * parseInt(this.state.pageNo)) - parseInt(cntPerPage);
          nextPageCnt = productsPageIndex + parseInt(cntPerPage);
          this.setState({ 
            productsPerPage: cntPerPage,
            products: productsTemp.slice(productsPageIndex, nextPageCnt),
            totalProducts: arrayTemp.length 
          });
        }
        if (nextPageSel === true) {
          productsTemp = arrayTemp;
          this.setState({ products: productsTemp.slice(productsPageIndex, nextPageCnt)});
        }
        if (prvPageSel === true) {
          productsTemp = arrayTemp;
          this.setState({ products: productsTemp.slice(productsPageIndex, nextPageCnt)});
        }
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
    const { products, createProductModal, productsPerPage, pageNo, totalProducts, noSort, nameSort, priceSort, nameSortAsc, nameSortDesc, priceSortAsc, priceSortDesc } = this.state;
    return (
      <div className='margin'>
          <CreateProduct open={createProductModal} 
            toggleCreateProductModal={this.toggleCreateProductModal} 
            productsPerPage={productsPerPage} 
            fetchProductNew={this.fetchProductNew} />
          <h1>Product</h1>
          <br />
          <Button primary onClick={() => this.toggleCreateProductModal(true)}>Create Product</Button>
          <p></p>
          <TableProduct products={products} fetchProduct={this.fetchProduct} 
          pageNo={pageNo} 
          totalProducts={totalProducts} 
          noSort={noSort} 
          productsPerPage={productsPerPage} 
          nameSort={nameSort} 
          priceSort={priceSort} 
          nameSortAsc={nameSortAsc} 
          nameSortDesc={nameSortDesc} 
          priceSortAsc={priceSortAsc} 
          priceSortDesc={priceSortDesc} 
          fetchProductNew={this.fetchProductNew} />
      </div>
    );
  }
}