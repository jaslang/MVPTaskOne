import React, { Component } from 'react';
import TableCustomer from './TableCustomer';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import CreateCustomer from './CreateCustomer';

export class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      customersPerPage: "", // For pagination
      totalCustomers: "",
      pageNo: "",
      noSort: false,
      nameSort: false,
      addressSort: false,
      createCustomerModal: false
    }
  }

  componentDidMount() {
    this.fetchCustomer();
  }

  fetchCustomer = () => {
    var customersTemp;
    axios.get("/Customers/GetCustomer")
    .then(({data}) => {
      // console.log(data);
      customersTemp = data;
      this.setState({
        // customers: data
        pageNo: 1,
        noSort: true,
        nameSort: false,
        addressSort: false,
        customersPerPage: 10,
        customers: customersTemp.slice(0, 10),
        totalCustomers: data.length 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchCustomerPage = (value) => {  // For pagination
    this.setState({ customersPerPage: value });
    const prodUrl = (`/Customers/GetCustomerPage/${value}`);
    axios.get(prodUrl)
    .then(({data}) => {
      // console.log(data);
      this.setState({
        customers: data 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchCustomerPageNext = (value) => {  // For pagination
    var customersTemp;
    var customersPageIndex = parseInt(this.state.customersPerPage) * parseInt(this.state.pageNo);
    var nextPageCnt = customersPageIndex + parseInt(this.state.customersPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) + 1;
    axios.get("/Customers/GetCustomer")
    .then(({data}) => {
      customersTemp = data;
      this.setState({ customers: customersTemp.slice(customersPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchCustomerPagePrev = (value) => {  // For pagination
    var customersTemp;
    var customersPageIndex = (parseInt(this.state.customersPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.customersPerPage) * 2);
    var nextPageCnt = customersPageIndex + parseInt(this.state.customersPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) - 1;
    axios.get("/Customers/GetCustomer")
    .then(({data}) => {
      customersTemp = data;
      this.setState({ customers: customersTemp.slice(customersPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchCustomerSort = (value) => { // Customer name sort
    var customersTemp;
    this.setState({
      nameSort: true,
      noSort: false,
      addressSort: false,
      pageNo: 1
    })
    axios.get("/Customers/GetCustomerNameSort")
    .then(({data}) => {
      customersTemp = data;
      this.setState({
        customersPerPage: value,
        customers: customersTemp.slice(0, value),
        totalCustomers: data.length 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchCustomerSortPageNext = (value) => {  // Customer name sort
    var customersTemp;
    var customersPageIndex = parseInt(this.state.customersPerPage) * parseInt(this.state.pageNo);
    var nextPageCnt = customersPageIndex + parseInt(this.state.customersPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) + 1;
    axios.get("/Customers/GetCustomerNameSort")
    .then(({data}) => {
      customersTemp = data;
      this.setState({ customers: customersTemp.slice(customersPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchCustomerSortPagePrev = (value) => {  // Customer name sort
    var customersTemp;
    var customersPageIndex = (parseInt(this.state.customersPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.customersPerPage) * 2);
    var nextPageCnt = customersPageIndex + parseInt(this.state.customersPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) - 1;
    axios.get("/Customers/GetCustomerNameSort")
    .then(({data}) => {
      customersTemp = data;
      this.setState({ customers: customersTemp.slice(customersPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchCustomerAddressSort = (value) => {
    var customersTemp;
    this.setState({
      addressSort: true,
      noSort: false,
      nameSort: false,
      pageNo: 1
    })
    axios.get("/Customers/GetCustomerAddressSort")
    .then(({data}) => {
      customersTemp = data;
      this.setState({
        customersPerPage: value, 
        customers: customersTemp.slice(0, value),
        totalCustomers: data.length 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchCustomerAddressSortPageNext = (value) => {  
    var customersTemp;
    var customersPageIndex = parseInt(this.state.customersPerPage) * parseInt(this.state.pageNo);
    var nextPageCnt = customersPageIndex + parseInt(this.state.customersPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) + 1;
    axios.get("/Customers/GetCustomerAddressSort")
    .then(({data}) => {
      customersTemp = data;
      this.setState({ customers: customersTemp.slice(customersPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchCustomerAddressSortPagePrev = (value) => { 
    var customersTemp;
    var customersPageIndex = (parseInt(this.state.customersPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.customersPerPage) * 2);
    var nextPageCnt = customersPageIndex + parseInt(this.state.customersPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) - 1;
    axios.get("/Customers/GetCustomerAddressSort")
    .then(({data}) => {
      customersTemp = data;
      this.setState({ customers: customersTemp.slice(customersPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  toggleCreateCustomerModal = (value) => {
    this.setState({
      createCustomerModal: value
    })
  }

  render () {
    const { customers, createCustomerModal } = this.state;
    return (
      <div className='margin'>
          <CreateCustomer open={createCustomerModal} 
            toggleCreateCustomerModal={this.toggleCreateCustomerModal}
            fetchCustomer={this.fetchCustomer} />
          <h1>Customer</h1>
          <br />
          <Button primary onClick={() => this.toggleCreateCustomerModal(true)}>Create Customer</Button>
          <p></p>
          <TableCustomer customers={customers} fetchCustomer={this.fetchCustomer} 
          pageNo={this.state.pageNo} 
          totalCustomers={this.state.totalCustomers} 
          noSort={this.state.noSort}
          customersPerPage={this.state.customersPerPage} 
          fetchCustomerPage={this.fetchCustomerPage} 
          fetchCustomerPageNext={this.fetchCustomerPageNext} 
          fetchCustomerPagePrev={this.fetchCustomerPagePrev} 
          fetchCustomerSort={this.fetchCustomerSort} 
          nameSort={this.state.nameSort} 
          fetchCustomerSortPageNext={this.fetchCustomerSortPageNext}
          fetchCustomerSortPagePrev={this.fetchCustomerSortPagePrev} 
          addressSort={this.state.addressSort}
          fetchCustomerAddressSort={this.fetchCustomerAddressSort}
          fetchCustomerAddressSortPageNext={this.fetchCustomerAddressSortPageNext} 
          fetchCustomerAddressSortPagePrev={this.fetchCustomerAddressSortPagePrev} />
      </div>
    );
  }
}