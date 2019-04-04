import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import TableResults from '../common/TableResults';
import Pagination from '../common/Pagination';

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {q: props.q || '', results:[], total_count: 0, searchOptions: {page: 1, per_page: 30, sort: 'score', order: 'asc'}, props: props };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.inputRef = React.createRef();
  }

  handleChange(event) {
    this.validateSearch(event.target.value);
  }

  handleBlur(event) {
    this.validateSearch(event.target.value);
  }

  handlePageChange(page=1){
    this.setState({searchOptions: {page: page, per_page: this.state.searchOptions.per_page, sort: this.state.searchOptions.sort, order: this.state.searchOptions.order}, loading: true}, () => {
      this.GetResults();
    });
  }

  delayTimer;
  validateSearch(searchText, delayAmount=1000){

    this.setState({ q: searchText });

    if( searchText.length >= 3 && this.state.q !== searchText ) {
      clearTimeout(this.delayTimer);

      let self = this;
      this.delayTimer = setTimeout( () => {
        self.setState({ q: searchText, loading: true, searchOptions: { page: 1, per_page: self.state.searchOptions.per_page, sort: self.state.searchOptions.sort } }, () => {
          self.GetResults();
        });
      }, delayAmount);
    }

  }

  // called only once, after page load / after init render()
  componentDidMount() {
    if( this.state.q ) {
      this.GetResults();
    }
    if( this.inputRef.current )
      this.inputRef.current.focus();
  }

  // called after every render()
  componentDidUpdate(){
    if( this.inputRef.current )
      this.inputRef.current.focus();
  }

  render() {
    if( this.state.loading )
      return this.renderLoading();
    else
      return (
        <div className="container">
          <TextInput name="searchText" label='User Search'
            handleChange={this.handleChange} handleBlur={this.handleBlur}
            value={this.state.q} domReference={this.inputRef}
            {...this.state} {...this.props} />
          <div>
            {this.state.results ? this.renderResults() : 'No Results Found' }
          </div>
          <div>
            {this.state.error ? this.state.error : '' }
          </div>
        </div>
      );
  }

  renderLoading() {
    return (
      <div className="container">
        <p>Fetching Results for {this.state.q}</p>
      </div>
    );
  }

  renderResults(){
    // for TableResults
    let headers = { col1: { col: "login", display: "Username"}, col2: { col: "html_url", display: "Home URL"}, col3: { col: "score", display: "Match Score"}  };
    let uniqueIdField = "login";
    let data = this.state.results;
    let actions = { label: "", viewlink: {dataCol: "html_url", display: "view"} };

    // for Pagination
    let currentPage = this.state.searchOptions.page;
    let totalNumberOfResults = this.state.total_count;
    let onClickHandler = this.handlePageChange;

    let maxPages = 5, startPage=1, endPage=maxPages;
    let totalPages = Math.ceil( this.state.total_count / this.state.searchOptions.per_page );
    if( totalPages <= maxPages ) {
      startPage=1;
      endPage=totalPages;
    } else {
      startPage = currentPage <= 3 ? 1 : Math.max(currentPage - 2, 1);
      endPage = Math.min(currentPage + 2, totalPages);
      while( (endPage - startPage) <= 5 && endPage < totalPages){
        endPage++;
      }
    }

    let pageList = [];
    for( let i=startPage; i <= endPage && pageList.length < 5; i++ )
      pageList.push( i );

    return (
      <div>
        <Pagination currentPage={currentPage} pageList={pageList} totalPages={totalPages} totalNumberOfResults={totalNumberOfResults} onClickHandler={onClickHandler}/>
        <TableResults headers={headers} uniqueIdField={uniqueIdField} data={data} actions={actions} />
      </div>
    )
  }

  GetResults(searchText=this.state.q,
      headers={'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json', 'Content-Type': 'application/json'},
      options=this.state.searchOptions
    ){
    var self = this;
    let url = "http://localhost:3100/github/search/users";
    let payload = {q: searchText, page: options.page, per_page: options.per_page, sort: options.sort, order: options.order};
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    })
    .then(res => {
      return res.json();
    })
    .then(
      (result) => {
        self.setState(
          {
            results: result.data.items, total_count: result.data.total_count, loading: false, error: null,
          }
        );
        Promise.resolve();
      },
      (error) => {
        self.setState(
          {
            results:[], total_count: 0, error: error, loading: false
          }
        );
        Promise.resolve();
      }
    )
    .catch(error=>{
      self.setState(
        {
          results:[], total_count: 0, error: error, loading: false
        }
      );
    })
  }

}

export default UserSearch;
