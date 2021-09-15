import React, { Component } from 'react';
import TableStore from './TableStore';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import CreateStore from './CreateStore';

export class Store extends Component {
  constructor(props) {
    super(props);
    this.fetchStoreNew = this.fetchStoreNew.bind(this);
    this.state = {
      stores: [],
      storesPerPage: "", // For pagination
      totalStores: "",
      pageNo: "",
      noSort: false,
      nameSort: false,
      nameSortAsc: false,
      nameSortDesc: false,
      addressSort: false,
      addressSortAsc: false,
      addressSortDesc: false,
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
        totalStores: data.length,
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
  fetchStoreNew = (cntPerPage, SortSel, AddrSortSel, nextPageSel, prvPageSel) => { // Store name sort
    var storesTemp;
    var arrayTemp;
    var nextPageCnt;
    var storesPageIndex;

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
      storesPageIndex = parseInt(this.state.storesPerPage) * parseInt(this.state.pageNo);
      nextPageCnt = storesPageIndex + parseInt(this.state.storesPerPage);
      this.setState({ pageNo: parseInt(this.state.pageNo) + 1 });
    }

    if (prvPageSel === true) {
      storesPageIndex = (parseInt(this.state.storesPerPage) * parseInt(this.state.pageNo)) - (parseInt(this.state.storesPerPage) * 2);
      nextPageCnt = storesPageIndex + parseInt(this.state.storesPerPage);
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

    axios.get("/Stores/GetStore")
      .then(({data}) => {
        arrayTemp = data;
        if (this.state.nameSort === true && SortSel === true && this.state.nameSortAsc === true) {
          storesTemp = arrayTemp.sort((a, b) => (a.name > b.name) ? 1 : -1);
        } 
        if (this.state.nameSort === true && SortSel === true && this.state.nameSortDesc === true) {
          storesTemp = arrayTemp.sort((a, b) => (a.name < b.name) ? 1 : -1);
        }
        if (SortSel === false && this.state.nameSortAsc === true) {
          storesTemp = arrayTemp.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }
        if (SortSel === false && this.state.nameSortDesc === true) {
          storesTemp = arrayTemp.sort((a, b) => (a.name < b.name) ? 1 : -1);
        }

        if (this.state.addressSort === true && AddrSortSel === true && this.state.addressSortAsc === true) {
          storesTemp = arrayTemp.sort((a, b) => (a.address > b.address) ? 1 : -1);
        } 
        if (this.state.addressSort === true && AddrSortSel === true && this.state.addressSortDesc === true) {
          storesTemp = arrayTemp.sort((a, b) => (a.address < b.address) ? 1 : -1);
        }
        if (AddrSortSel === false && this.state.addressSortAsc === true) {
          storesTemp = arrayTemp.sort((a, b) => (a.address > b.address) ? 1 : -1);
        }
        if (AddrSortSel === false && this.state.addressSortDesc === true) {
          storesTemp = arrayTemp.sort((a, b) => (a.address < b.address) ? 1 : -1);
        }

        if (this.state.noSort === true && nextPageSel === false && prvPageSel === false) {
          storesTemp = arrayTemp;
          storesPageIndex = (parseInt(cntPerPage) * parseInt(this.state.pageNo)) - parseInt(cntPerPage);
          nextPageCnt = storesPageIndex + parseInt(cntPerPage);
          this.setState({ 
            storesPerPage: cntPerPage,
            stores: storesTemp.slice(storesPageIndex, nextPageCnt),
            totalStores: arrayTemp.length
          });
        }

        if (nextPageSel === false && prvPageSel === false && this.state.noSort === false) {
          storesPageIndex = (parseInt(cntPerPage) * parseInt(this.state.pageNo)) - parseInt(cntPerPage);
          nextPageCnt = storesPageIndex + parseInt(cntPerPage);
          this.setState({ 
            storesPerPage: cntPerPage,
            stores: storesTemp.slice(storesPageIndex, nextPageCnt),
            totalStores: arrayTemp.length 
          });
        }
        if (nextPageSel === true) {
          storesTemp = arrayTemp;
          this.setState({ stores: storesTemp.slice(storesPageIndex, nextPageCnt)});
        }
        if (prvPageSel === true) {
          storesTemp = arrayTemp;
          this.setState({ stores: storesTemp.slice(storesPageIndex, nextPageCnt)});
        }
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
    const { stores, createStoreModal, storesPerPage, pageNo, totalStores, noSort, nameSort, addressSort, nameSortAsc, nameSortDesc, addressSortAsc, addressSortDesc } = this.state;
    return (
      <div className='margin'>
          <CreateStore open={createStoreModal} 
            toggleCreateStoreModal={this.toggleCreateStoreModal} 
            storesPerPage={storesPerPage} 
            fetchStoreNew={this.fetchStoreNew} />
          <h1>Store</h1>
          <br />
          <Button primary onClick={() => this.toggleCreateStoreModal(true)}>Create Store</Button>
          <p></p>
          <TableStore stores={stores} fetchStore={this.fetchStore} 
          pageNo={pageNo} 
          totalStores={totalStores} 
          noSort={noSort} 
          storesPerPage={storesPerPage} 
          nameSort={nameSort} 
          addressSort={addressSort} 
          nameSortAsc={nameSortAsc} 
          nameSortDesc={nameSortDesc} 
          addressSortAsc={addressSortAsc} 
          addressSortDesc={addressSortDesc} 
          fetchStoreNew={this.fetchStoreNew} />
      </div>
    );
  }
}