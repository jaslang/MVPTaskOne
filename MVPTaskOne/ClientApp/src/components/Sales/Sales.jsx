import React, { Component } from 'react';
import TableSales from './TableSales';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import CreateSales from './CreateSales';

export class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      products: [],
      customers: [],
      stores:[],
      salesPerPage: "", // For pagination
      totalSales: "",
      pageNo: "",
      noSort: false,
      productIdSort: false,
      productIdSortAsc: false,
      productIdSortDesc: false,
      customerIdSort: false,
      customerIdSortAsc: false,
      customerIdSortDesc: false,
      storeIdSort: false,
      storeIdSortAsc: false,
      storeIdSortDesc: false,
      dateSoldSort: false,
      dateSoldSortAsc: false,
      dateSoldSortDesc: false,
      createSalesModal: false
    }
  }

  componentDidMount() {
    this.fetchSales();
    this.saleFetchProduct();
    this.fetchCustomer();
    this.saleFetchStore();
  }

  fetchSales = () => {
    var salesTemp;
    axios.get("/Sales/GetSales")
    .then(({data}) => {
      // console.log(data);
      salesTemp = data;
      this.setState({
        // sales: data
        pageNo: 1,
        noSort: true,
        productIdSort: false,
        customerIdSort: false,
        storeIdSort: false,
        dateSoldSort: false,
        salesPerPage: 10,
        sales: salesTemp.slice(0, 10),
        totalSales: data.length,
        customerIdSortAsc: false,
        customerIdSortDesc: false,
        productIdSortAsc: false,
        productIdSortDesc: false,
        storeIdSortAsc: false,
        storeIdSortDesc: false,
        dateSoldSortAsc: false,
        dateSoldSortDesc: false,
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  saleFetchProduct = () => {
    axios.get("/Products/GetProduct")
    .then(({data}) => {
      this.setState({
        products: data 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchCustomer = () => {
    axios.get("/Customers/GetCustomer")
    .then(({data}) => {
      this.setState({
        customers: data 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  saleFetchStore = () => {
    axios.get("/Stores/GetStore")
    .then(({data}) => {
      this.setState({
        stores: data 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  // ***************** Sort, Pagination, Records per page *********************
  fetchSalesNew = (cntPerPage, prodIdSortSel, custIdSortSel, storeIdSortSel, dateSoldSortSel, nextPageSel, prvPageSel) => { // Sales productId sort
    var salesTemp;
    var arrayTemp;
    var nextPageCnt;
    var salesPageIndex;

    if (prodIdSortSel === true) {
      this.setState({
        productIdSort: true,
        noSort: false,
        customerIdSort: false,
        storeIdSort: false,
        dateSoldSort: false,
        customerIdSortAsc: false,
        customerIdSortDesc: false,
        productIdSortAsc: false,
        productIdSortDesc: false,
        storeIdSortAsc: false,
        storeIdSortDesc: false,
        dateSoldSortAsc: false,
        dateSoldSortDesc: false,
      })
    }

    if (custIdSortSel === true) {
      this.setState({
        productIdSort: false,
        noSort: false,
        customerIdSort: true,
        storeIdSort: false,
        dateSoldSort: false,
        productIdSortAsc: false,
        productIdSortDesc: false,
        customerIdSortAsc: false,
        customerIdSortDesc: false,
        storeIdSortAsc: false,
        storeIdSortDesc: false,
        dateSoldSortAsc: false,
        dateSoldSortDesc: false,
      })
    }

    if (storeIdSortSel === true) {
        this.setState({
          productIdSort: false,
          noSort: false,
          customerIdSort: false,
          storeIdSort: true,
          dateSoldSort: false,
          customerIdSortAsc: false,
          customerIdSortDesc: false,
          productIdSortAsc: false,
          productIdSortDesc: false,
          storeIdSortAsc: false,
          storeIdSortDesc: false,
          dateSoldSortAsc: false,
          dateSoldSortDesc: false,
        })
      }

      if (dateSoldSortSel === true) {
        this.setState({
          productIdSort: false,
          noSort: false,
          customerIdSort: false,
          storeIdSort: false,
          dateSoldSort: true,
          customerIdSortAsc: false,
          customerIdSortDesc: false,
          productIdSortAsc: false,
          productIdSortDesc: false,
          storeIdSortAsc: false,
          storeIdSortDesc: false,
          dateSoldSortAsc: false,
          dateSoldSortDesc: false,
        })
      }

    if (nextPageSel === true) {
      salesPageIndex = parseInt(this.state.salesPerPage) * parseInt(this.state.pageNo);
      nextPageCnt = salesPageIndex + parseInt(this.state.salesPerPage);
      this.setState({ pageNo: parseInt(this.state.pageNo) + 1 });
    }

    if (prvPageSel === true) {
      salesPageIndex = (parseInt(this.state.salesPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.salesPerPage) * 2);
      nextPageCnt = salesPageIndex + parseInt(this.state.salesPerPage);
      this.setState({ pageNo: parseInt(this.state.pageNo) - 1 });
    }

    if (prodIdSortSel === true && this.state.productIdSortAsc === false && this.state.productIdSortDesc === true) {
      this.setState({ productIdSortAsc: true, productIdSortDesc: false });
    } else if (prodIdSortSel === true && this.state.productIdSortAsc === true && this.state.productIdSortDesc === false) {
      this.setState({ productIdSortDesc: true, productIdSortAsc: false });
    } else if (prodIdSortSel === true && this.state.productIdSortAsc === false && this.state.productIdSortDesc === false) {
      this.setState({ productIdSortAsc: true, productIdSortDesc: false });
    }

    if (custIdSortSel === true && this.state.customerIdSortAsc === false && this.state.customerIdSortDesc === true) {
      this.setState({ customerIdSortAsc: true, customerIdSortDesc: false });
    } else if (custIdSortSel === true && this.state.customerIdSortAsc === true && this.state.customerIdSortDesc === false) {
      this.setState({ customerIdSortDesc: true, customerIdSortAsc: false });
    } else if (custIdSortSel === true && this.state.customerIdSortAsc === false && this.state.customerIdSortDesc === false) {
      this.setState({ customerIdSortAsc: true, customerIdSortDesc: false });
    }

    if (storeIdSortSel === true && this.state.storeIdSortAsc === false && this.state.storeIdSortDesc === true) {
      this.setState({ storeIdSortAsc: true, storeIdSortDesc: false });
      } else if (storeIdSortSel === true && this.state.storeIdSortAsc === true && this.state.storeIdSortDesc === false) {
        this.setState({ storeIdSortDesc: true, storeIdSortAsc: false });
      } else if (storeIdSortSel === true && this.state.storeIdSortAsc === false && this.state.storeIdSortDesc === false) {
        this.setState({ storeIdSortAsc: true, storeIdSortDesc: false });
      }

    if (dateSoldSortSel === true && this.state.dateSoldSortAsc === false && this.state.dateSoldSortDesc === true) {
      this.setState({ dateSoldSortAsc: true, dateSoldSortDesc: false });
      } else if (dateSoldSortSel === true && this.state.dateSoldSortAsc === true && this.state.dateSoldSortDesc === false) {
        this.setState({ dateSoldSortDesc: true, dateSoldSortAsc: false });
      } else if (dateSoldSortSel === true && this.state.dateSoldSortAsc === false && this.state.dateSoldSortDesc === false) {
        this.setState({ dateSoldSortAsc: true, dateSoldSortDesc: false });
      }

    axios.get("/Sales/GetSales")
      .then(({data}) => {
        // console.log(data);
        arrayTemp = data;
        if (this.state.productIdSort === true && prodIdSortSel === true && this.state.productIdSortAsc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.product.name > b.product.name) ? 1 : -1);
        } 
        if (this.state.productIdSort === true && prodIdSortSel === true && this.state.productIdSortDesc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.product.name < b.product.name) ? 1 : -1);
        }
        if (prodIdSortSel === false && this.state.productIdSortAsc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.product.name > b.product.name) ? 1 : -1);
        }
        if (prodIdSortSel === false && this.state.productIdSortDesc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.product.name < b.product.name) ? 1 : -1);
        }

        if (this.state.customerIdSort === true && custIdSortSel === true && this.state.customerIdSortAsc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.customer.name > b.customer.name) ? 1 : -1);
        } 
        if (this.state.customerIdSort === true && custIdSortSel === true && this.state.customerIdSortDesc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.customer.name < b.customer.name) ? 1 : -1);
        }
        if (custIdSortSel === false && this.state.customerIdSortAsc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.customer.name > b.customer.name) ? 1 : -1);
        }
        if (custIdSortSel === false && this.state.customerIdSortDesc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.customer.name < b.customer.name) ? 1 : -1);
        }

        if (this.state.storeIdSort === true && storeIdSortSel === true && this.state.storeIdSortAsc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.store.name > b.store.name) ? 1 : -1);
        } 
        if (this.state.storeIdSort === true && storeIdSortSel === true && this.state.storeIdSortDesc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.store.name < b.store.name) ? 1 : -1);
        }
        if (storeIdSortSel === false && this.state.storeIdSortAsc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.store.name > b.store.name) ? 1 : -1);
        }
        if (storeIdSortSel === false && this.state.storeIdSortDesc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.store.name < b.store.name) ? 1 : -1);
        }

        if (this.state.dateSoldSort === true && dateSoldSortSel === true && this.state.dateSoldSortAsc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.dateSold > b.dateSold) ? 1 : -1);
        } 
        if (this.state.dateSoldSort === true && dateSoldSortSel === true && this.state.dateSoldSortDesc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.dateSold < b.dateSold) ? 1 : -1);
        }
        if (dateSoldSortSel === false && this.state.dateSoldSortAsc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.dateSold > b.dateSold) ? 1 : -1);
        }
        if (dateSoldSortSel === false && this.state.dateSoldSortDesc === true) {
          salesTemp = arrayTemp.sort((a, b) => (a.dateSold < b.dateSold) ? 1 : -1);
        }

        if (this.state.noSort === true && nextPageSel === false && prvPageSel === false) {
          salesTemp = arrayTemp;
          salesPageIndex = (parseInt(cntPerPage) * parseInt(this.state.pageNo)) - parseInt(cntPerPage);
          nextPageCnt = salesPageIndex + parseInt(cntPerPage);
          this.setState({ 
            salesPerPage: cntPerPage,
            sales: salesTemp.slice(salesPageIndex, nextPageCnt),
            totalSales: arrayTemp.length
          });
        }

        if (nextPageSel === false && prvPageSel === false && this.state.noSort === false) {
          salesPageIndex = (parseInt(cntPerPage) * parseInt(this.state.pageNo)) - parseInt(cntPerPage);
          nextPageCnt = salesPageIndex + parseInt(cntPerPage);
          this.setState({ 
            salesPerPage: cntPerPage,
            sales: salesTemp.slice(salesPageIndex, nextPageCnt),
            totalSales: arrayTemp.length 
          });
        }
        if (nextPageSel === true) {
          salesTemp = arrayTemp;
          this.setState({ sales: salesTemp.slice(salesPageIndex, nextPageCnt)});
        }
        if (prvPageSel === true) {
          salesTemp = arrayTemp;
          this.setState({ sales: salesTemp.slice(salesPageIndex, nextPageCnt)});
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  toggleCreateSalesModal = (value) => {
    this.setState({
      createSalesModal: value
    })
  }

  render () {
    const { sales, createSalesModal, products, customers, stores, salesPerPage } = this.state;
    return (
      <div className='margin'>
          <CreateSales open={createSalesModal} 
            toggleCreateSalesModal={this.toggleCreateSalesModal} 
            salesPerPage={salesPerPage} 
            fetchSalesNew={this.fetchSalesNew}
            products={products}
            customers={customers}
            stores={stores} />
          <h1>Sales</h1>
          <br />
          <Button primary onClick={() => this.toggleCreateSalesModal(true)}>Create Sale</Button>
          <p></p>
          <TableSales sales={sales} fetchSales={this.fetchSales} 
          products={products} 
          customers={customers} 
          stores={stores} 
          pageNo={this.state.pageNo} 
          totalSales={this.state.totalSales} 
          noSort={this.state.noSort} 
          salesPerPage={salesPerPage} 
          productIdSort={this.state.productIdSort} 
          customerIdSort={this.state.customerIdSort} 
          storeIdSort={this.state.storeIdSort} 
          dateSoldSort={this.state.dateSoldSort} 
          productIdSortAsc={this.state.productIdSortAsc} 
          productIdSortDesc={this.state.productIdSortDesc} 
          customerIdSortAsc={this.state.customerIdSortAsc} 
          customerIdSortDesc={this.state.customerIdSortDesc} 
          storeIdSortAsc={this.state.storeIdSortAsc} 
          storeIdSortDesc={this.state.storeIdSortDesc} 
          dateSoldSortAsc={this.state.dateSoldSortAsc} 
          dateSoldSortDesc={this.state.dateSoldSortDesc} 
          fetchSalesNew={this.fetchSalesNew} />
      </div>
    );
  }
}