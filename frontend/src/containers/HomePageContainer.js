import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchInitialData } from "../actions";
import HomePage from "../components/HomePage";

class HomePageContainer extends Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }
  render() {
    const { isLoading, errorFetchingData, categories } = this.props;
    return (
      <HomePage
        isLoading={isLoading}
        errorFetchingData={errorFetchingData}
        categories={categories}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.postData.isLoading,
  errorFetchingData: state.postData.errorFetchingData,
  categories: state.postData.categories
});

const mapDispatchToProps = dispatch => ({
  fetchInitialData: () => dispatch(fetchInitialData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageContainer);
