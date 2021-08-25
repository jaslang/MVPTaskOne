import React, { Component } from 'react';
import TableStore from './TableStore';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import CreateStore from './CreateStore';

export class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      storesPerPage: "", // For pagination
      totalStores: "",
      pageNo: "",
      noSort: false,
      nameSort: false,
      addressSort: false,
      createStoreModal: false
    }
  }

  componentDidMount() {
    this.fetchStore();
  }

  fetchStore = () => {
    var storesTemp;
    axios.get("/Stores/GetStore")
    .then(({data}) => {
      // console.log(data);
      storesTemp = data;
      this.setState({
        // stores: data
        pageNo: 1,
        noSort: true,
        nameSort: false,
        addressSort: false,
        storesPerPage: 10,
        stores: storesTemp.slice(0, 10),
        totalStores: data.length 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchStorePage = (value) => {  // For pagination
    this.setState({ storesPerPage: value });
    const prodUrl = (`/Stores/GetStorePage/${value}`);
    axios.get(prodUrl)
    .then(({data}) => {
      this.setState({
        stores: data 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchStorePageNext = (value) => {  // For pagination
    var storesTemp;
    var storesPageIndex = parseInt(this.state.storesPerPage) * parseInt(this.state.pageNo);
    var nextPageCnt = storesPageIndex + parseInt(this.state.storesPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) + 1;
    axios.get("/Stores/GetStore")
    .then(({data}) => {
      storesTemp = data;
      this.setState({ stores: storesTemp.slice(storesPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchStorePagePrev = (value) => {  // For pagination
    var storesTemp;
    var storesPageIndex = (parseInt(this.state.storesPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.storesPerPage) * 2);
    var nextPageCnt = storesPageIndex + parseInt(this.state.storesPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) - 1;
    axios.get("/Stores/GetStore")
    .then(({data}) => {
      storesTemp = data;
      this.setState({ stores: storesTemp.slice(storesPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchStoreSort = (value) => { // Store name sort
    var storesTemp;
    this.setState({
      nameSort: true,
      noSort: false,
      addressSort: false,
      pageNo: 1
    })
    axios.get("/Stores/GetStoreNameSort")
    .then(({data}) => {
      storesTemp = data;
      this.setState({
        storesPerPage: value,
        stores: storesTemp.slice(0, value),
        totalStores: data.length 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchStoreSortPageNext = (value) => {  // Store name sort next page
    var storesTemp;
    var storesPageIndex = parseInt(this.state.storesPerPage) * parseInt(this.state.pageNo);
    var nextPageCnt = storesPageIndex + parseInt(this.state.storesPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) + 1;
    axios.get("/Stores/GetStoreNameSort")
    .then(({data}) => {
      storesTemp = data;
      this.setState({ stores: storesTemp.slice(storesPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchStoreSortPagePrev = (value) => {  // Store name sort prev page
    var storesTemp;
    var storesPageIndex = (parseInt(this.state.storesPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.storesPerPage) * 2);
    var nextPageCnt = storesPageIndex + parseInt(this.state.storesPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) - 1;
    axios.get("/Stores/GetStoreNameSort")
    .then(({data}) => {
      storesTemp = data;
      this.setState({ stores: storesTemp.slice(storesPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchStoreAddressSort = (value) => {
    var storesTemp;
    this.setState({
      addressSort: true,
      noSort: false,
      nameSort: false,
      pageNo: 1
    })
    axios.get("/Stores/GetStoreAddressSort")
    .then(({data}) => {
      storesTemp = data;
      this.setState({
        storesPerPage: value,
        stores: storesTemp.slice(0, value),
        totalStores: data.length 
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchStoreAddressSortPageNext = (value) => { 
    var storesTemp;
    var storesPageIndex = parseInt(this.state.storesPerPage) * parseInt(this.state.pageNo);
    var nextPageCnt = storesPageIndex + parseInt(this.state.storesPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) + 1;
    axios.get("/Stores/GetStoreAddressSort")
    .then(({data}) => {
      storesTemp = data;
      this.setState({ stores: storesTemp.slice(storesPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchStoreAddressSortPagePrev = (value) => {  
    var storesTemp;
    var storesPageIndex = (parseInt(this.state.storesPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.storesPerPage) * 2);
    var nextPageCnt = storesPageIndex + parseInt(this.state.storesPerPage);
    this.state.pageNo = parseInt(this.state.pageNo) - 1;
    axios.get("/Stores/GetStoreAddressSort")
    .then(({data}) => {
      storesTemp = data;
      this.setState({ stores: storesTemp.slice(storesPageIndex, nextPageCnt)});
    })
    .catch(err => {
      console.log(err);
    })
  }

  toggleCreateStoreModal = (value) => {
    this.setState({
      createStoreModal: value
    })
  }

  render () {
    const { stores, createStoreModal } = this.state;
    return (
      <div className='margin'>
          <CreateStore open={createStoreModal} 
            toggleCreateStoreModal={this.toggleCreateStoreModal}
            fetchStore={this.fetchStore} />
          <h1>Store</h1>
          <br />
          <Button primary onClick={() => this.toggleCreateStoreModal(true)}>Create Store</Button>
          <p></p>
          <TableStore stores={stores} fetchStore={this.fetchStore} 
          pageNo={this.state.pageNo} 
          totalStores={this.state.totalStores} 
          noSort={this.state.noSort}
          storesPerPage={this.state.storesPerPage} 
          fetchStorePage={this.fetchStorePage} 
          fetchStorePageNext={this.fetchStorePageNext} 
          fetchStorePagePrev={this.fetchStorePagePrev} 
          fetchStoreSort={this.fetchStoreSort} 
          nameSort={this.state.nameSort} 
          fetchStoreSortPageNext={this.fetchStoreSortPageNext}
          fetchStoreSortPagePrev={this.fetchStoreSortPagePrev} 
          addressSort={this.state.addressSort}
          fetchStoreAddressSort={this.fetchStoreAddressSort}
          fetchStoreAddressSortPageNext={this.fetchStoreAddressSortPageNext} 
          fetchStoreAddressSortPagePrev={this.fetchStoreAddressSortPagePrev} />
      </div>
    );
  }
}