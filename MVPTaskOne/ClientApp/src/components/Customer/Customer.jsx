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
      nameSortAsc: false,
      nameSortDesc: false,
      addressSort: false,
      addressSortAsc: false,
      addressSortDesc: false,
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
        totalCustomers: data.length,
        addressSortAsc: false,
        addressSortDesc: false,
        nameSortAsc: false,
        nameSortDesc: false
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  // ***************** Sort, Pagination, Records per page *********************
  fetchCustomerNew = (cntPerPage, SortSel, AddrSortSel, nextPageSel, prvPageSel) => { // Customer name sort
    var customersTemp;
    var arrayTemp;
    var nextPageCnt;
    var customersPageIndex;

    if (SortSel === true) {
      this.setState({
        nameSort: true,
        noSort: false,
        addressSort: false,
        addressSortAsc: false,
        addressSortDesc: false,
      })
    }

    if (AddrSortSel === true) {
      this.setState({
        nameSort: false,
        noSort: false,
        addressSort: true,
        nameSortAsc: false,
        nameSortDesc: false,
      })
    }

    if (nextPageSel === true) {
      customersPageIndex = parseInt(this.state.customersPerPage) * parseInt(this.state.pageNo);
      nextPageCnt = customersPageIndex + parseInt(this.state.customersPerPage);
      this.setState({ pageNo: parseInt(this.state.pageNo) + 1 });
    }

    if (prvPageSel === true) {
      customersPageIndex = (parseInt(this.state.customersPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.customersPerPage) * 2);
      nextPageCnt = customersPageIndex + parseInt(this.state.customersPerPage);
      this.setState({ pageNo: parseInt(this.state.pageNo) - 1 });
    }

    if (SortSel === true && this.state.nameSortAsc === false && this.state.nameSortDesc === true) {
      this.setState({ nameSortAsc: true, nameSortDesc: false });
    } else if (SortSel === true && this.state.nameSortAsc === true && this.state.nameSortDesc === false) {
      this.setState({ nameSortDesc: true, nameSortAsc: false });
    } else if (SortSel === true && this.state.nameSortAsc === false && this.state.nameSortDesc === false) {
      this.setState({ nameSortAsc: true, nameSortDesc: false });
    }

    if (AddrSortSel === true && this.state.addressSortAsc === false && this.state.addressSortDesc === true) {
      this.setState({ addressSortAsc: true, addressSortDesc: false });
    } else if (AddrSortSel === true && this.state.addressSortAsc === true && this.state.addressSortDesc === false) {
      this.setState({ addressSortDesc: true, addressSortAsc: false });
    } else if (AddrSortSel === true && this.state.addressSortAsc === false && this.state.addressSortDesc === false) {
      this.setState({ addressSortAsc: true, addressSortDesc: false });
    }

    axios.get("/Customers/GetCustomer")
      .then(({data}) => {
        arrayTemp = data;
        if (this.state.nameSort === true && SortSel === true && this.state.nameSortAsc === true) {
          customersTemp = arrayTemp.sort((a, b) => (a.name > b.name) ? 1 : -1);
        } 
        if (this.state.nameSort === true && SortSel === true && this.state.nameSortDesc === true) {
          customersTemp = arrayTemp.sort((a, b) => (a.name < b.name) ? 1 : -1);
        }
        if (SortSel === false && this.state.nameSortAsc === true) {
          customersTemp = arrayTemp.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }
        if (SortSel === false && this.state.nameSortDesc === true) {
          customersTemp = arrayTemp.sort((a, b) => (a.name < b.name) ? 1 : -1);
        }

        if (this.state.addressSort === true && AddrSortSel === true && this.state.addressSortAsc === true) {
          customersTemp = arrayTemp.sort((a, b) => (a.address > b.address) ? 1 : -1);
        } 
        if (this.state.addressSort === true && AddrSortSel === true && this.state.addressSortDesc === true) {
          customersTemp = arrayTemp.sort((a, b) => (a.address < b.address) ? 1 : -1);
        }
        if (AddrSortSel === false && this.state.addressSortAsc === true) {
          customersTemp = arrayTemp.sort((a, b) => (a.address > b.address) ? 1 : -1);
        }
        if (AddrSortSel === false && this.state.addressSortDesc === true) {
          customersTemp = arrayTemp.sort((a, b) => (a.address < b.address) ? 1 : -1);
        }

        if (this.state.noSort === true && nextPageSel === false && prvPageSel === false) {
          customersTemp = arrayTemp;
          customersPageIndex = (parseInt(cntPerPage) * parseInt(this.state.pageNo)) - parseInt(cntPerPage);
          nextPageCnt = customersPageIndex + parseInt(cntPerPage);
          this.setState({ 
            customersPerPage: cntPerPage,
            customers: customersTemp.slice(customersPageIndex, nextPageCnt),
            totalCustomers: arrayTemp.length
          });
          // console.log(this.state.customers);
        }

        if (nextPageSel === false && prvPageSel === false && this.state.noSort === false) {
          customersPageIndex = (parseInt(cntPerPage) * parseInt(this.state.pageNo)) - parseInt(cntPerPage);
          nextPageCnt = customersPageIndex + parseInt(cntPerPage);
          this.setState({ 
            customersPerPage: cntPerPage,
            customers: customersTemp.slice(customersPageIndex, nextPageCnt),
            totalCustomers: arrayTemp.length 
          });
        }
        if (nextPageSel === true) {
          customersTemp = arrayTemp;
          this.setState({ customers: customersTemp.slice(customersPageIndex, nextPageCnt)});
        }
        if (prvPageSel === true) {
          customersTemp = arrayTemp;
          this.setState({ customers: customersTemp.slice(customersPageIndex, nextPageCnt)});
        }
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
            customersPerPage={this.state.customersPerPage} 
            fetchCustomerNew={this.fetchCustomerNew} />
          <h1>Customer</h1>
          <br />
          <Button primary onClick={() => this.toggleCreateCustomerModal(true)}>Create Customer</Button>
          <p></p>
          <TableCustomer customers={customers} fetchCustomer={this.fetchCustomer} 
          pageNo={this.state.pageNo} 
          totalCustomers={this.state.totalCustomers} 
          noSort={this.state.noSort} 
          customersPerPage={this.state.customersPerPage} 
          nameSort={this.state.nameSort} 
          addressSort={this.state.addressSort} 
          nameSortAsc={this.state.nameSortAsc} 
          nameSortDesc={this.state.nameSortDesc} 
          addressSortAsc={this.state.addressSortAsc} 
          addressSortDesc={this.state.addressSortDesc} 
          fetchCustomerNew={this.fetchCustomerNew} />
      </div>
    );
  }
}