import React, { Component } from 'react';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {currentPage: props.currentPage || 1,
      totalNumberOfResults: props.totalNumberOfResults || 0,
      totalPages: props.totalPages || 1,
      pageList: props.pageList || [1],
      maxPages: props.maxPages || 5,
      props: props }
    ;
  }

  handleClick(page, evt) {
    evt.preventDefault();
    if( page >= 1 && page <= this.state.totalPages && this.state.currentPage !== page )
      this.setState({ currentPage: page }, () => {
        if( this.props.onClickHandler )
          this.props.onClickHandler(page);
      });
  };

  render() {
    return (
      <div id="paging" className="row form-group">
        <div className="col-md-6">
          Found {this.state.totalNumberOfResults} results
        </div>
        {this.state.totalNumberOfResults > 0 &&
          <div className="col-md-6">
            <ul className="pagination justify-content-end">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous" onClick={e => this.handleClick(this.state.currentPage-1, e)}>
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              {this.state.pageList.map(
                page => (
                  <li className={this.state.currentPage === page ? 'page-item active' : 'page-item'}>
                    <a className="page-link" href="#" onClick={e => this.handleClick(page, e)}>{page}</a>
                  </li>
                )
              )}

              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next" onClick={e => this.handleClick(this.state.currentPage+1, e)}>
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </div>
        }
      </div>
    )
  }

}

export default Pagination;
