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
      customerIdSort: false,
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
        salesPerPage: 10,
        sales: salesTemp.slice(0, 10),
        totalSales: data.length
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

  fetchSalesPage = (value) => {  // For pagination
    this.setState({ salesPerPage: value });
    const prodUrl = (`/Sales/GetSalesPage/${value}`);
    axios.get(prodUrl)
    .then(({data}) => {
      this.setState({
        sales: data 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchSalesPageNext = (value) => {  // For pagination
    var salesTemp;
    var salesPageIndex = parseInt(this.state.salesPerPage) * parseInt(this.state.pageNo);
    var nextPageCnt = salesPageIndex + parseInt(this.state.salesPerPage);
    this.setState({ pageNo: parseInt(this.state.pageNo) + 1 });
    axios.get("/Sales/GetSales")
    .then(({data}) => {
      salesTemp = data;
      this.setState({ sales: salesTemp.slice(salesPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchSalesPagePrev = (value) => {  // For pagination
    var salesTemp;
    var salesPageIndex = (parseInt(this.state.salesPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.salesPerPage) * 2);
    var nextPageCnt = salesPageIndex + parseInt(this.state.salesPerPage);
    this.setState({ pageNo: parseInt(this.state.pageNo) - 1 });
    axios.get("/Sales/GetSales")
    .then(({data}) => {
      salesTemp = data;
      this.setState({ sales: salesTemp.slice(salesPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchSalesSort = (value) => { // Sales ProductId sort
    var salesTemp;
    this.setState({
      productIdSort: true,
      noSort: false,
      customerIdSort: false,
      pageNo: 1
    })
    axios.get("/Sales/GetSalesProductIdSort")
    .then(({data}) => {
      salesTemp = data;
      this.setState({
        salesPerPage: value,
        sales: salesTemp.slice(0, value),
        totalSales: data.length 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchSalesSortPageNext = (value) => {
    var salesTemp;
    var salesPageIndex = parseInt(this.state.salesPerPage) * parseInt(this.state.pageNo);
    var nextPageCnt = salesPageIndex + parseInt(this.state.salesPerPage);
    this.setState({ pageNo: parseInt(this.state.pageNo) + 1 });
    axios.get("/Sales/GetSalesProductIdSort")
    .then(({data}) => {
      salesTemp = data;
      this.setState({ sales: salesTemp.slice(salesPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchSalesSortPagePrev = (value) => { 
    var salesTemp;
    var salesPageIndex = (parseInt(this.state.salesPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.salesPerPage) * 2);
    var nextPageCnt = salesPageIndex + parseInt(this.state.salesPerPage);
    this.setState({ pageNo: parseInt(this.state.pageNo) - 1 });
    axios.get("/Sales/GetSalesProductIdSort")
    .then(({data}) => {
      salesTemp = data;
      this.setState({ sales: salesTemp.slice(salesPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchSalesCustomerIdSort = (value) => {
    var salesTemp;
    this.setState({
      customerIdSort: true,
      noSort: false,
      productIdSort: false,
      pageNo: 1
    })
    axios.get("/Sales/GetSalesCustomerIdSort")
    .then(({data}) => {
      salesTemp = data;
      this.setState({
        salesPerPage: value,
        sales: salesTemp.slice(0, value),
        totalSales: data.length 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchSalesCustomerIdSortPageNext = (value) => {  
    var salesTemp;
    var salesPageIndex = parseInt(this.state.salesPerPage) * parseInt(this.state.pageNo);
    var nextPageCnt = salesPageIndex + parseInt(this.state.salesPerPage);
    this.setState({ pageNo: parseInt(this.state.pageNo) + 1 });
    axios.get("/Sales/GetSalesCustomerIdSort")
    .then(({data}) => {
      salesTemp = data;
      this.setState({ sales: salesTemp.slice(salesPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchSalesCustomerIdSortPagePrev = (value) => {  
    var salesTemp;
    var salesPageIndex = (parseInt(this.state.salesPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.salesPerPage) * 2);
    var nextPageCnt = salesPageIndex + parseInt(this.state.salesPerPage);
    this.setState({ pageNo: parseInt(this.state.pageNo) - 1 });
    axios.get("/Sales/GetSalesCustomerIdSort")
    .then(({data}) => {
      salesTemp = data;
      this.setState({ sales: salesTemp.slice(salesPageIndex, nextPageCnt)});
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
    const { sales, createSalesModal, products, customers, stores } = this.state;
    return (
      <div className='margin'>
          <CreateSales open={createSalesModal} 
            toggleCreateSalesModal={this.toggleCreateSalesModal}
            fetchSales={this.fetchSales} 
            saleFetchProduct={products}
            customers={customers}
            stores={stores} />
          <h1>Sales</h1>
          <br />
          <Button primary onClick={() => this.toggleCreateSalesModal(true)}>Create Sales</Button>
          <br />
          <TableSales sales={sales} 
          fetchSales={this.fetchSales} 
          saleFetchProduct={products} 
          customers={customers} 
          stores={stores} 
          pageNo={this.state.pageNo} 
          totalSales={this.state.totalSales} 
          noSort={this.state.noSort}
          salesPerPage={this.state.salesPerPage} 
          fetchSalesPage={this.fetchSalesPage} 
          fetchSalesPageNext={this.fetchSalesPageNext} 
          fetchSalesPagePrev={this.fetchSalesPagePrev} 
          fetchSalesSort={this.fetchSalesSort} 
          productIdSort={this.state.productIdSort} 
          fetchSalesSortPageNext={this.fetchSalesSortPageNext}
          fetchSalesSortPagePrev={this.fetchSalesSortPagePrev} 
          customerIdSort={this.state.customerIdSort}
          fetchSalesCustomerIdSort={this.fetchSalesCustomerIdSort}
          fetchSalesCustomerIdSortPageNext={this.fetchSalesCustomerIdSortPageNext} 
          fetchSalesCustomerIdSortPagePrev={this.fetchSalesCustomerIdSortPagePrev} />
      </div>
    );
  }
}