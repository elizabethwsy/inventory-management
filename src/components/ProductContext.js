import React from "react";
import productList from "../data/product.json";

const ProductContext = React.createContext({
  productList: productList,
  setProductList: () => {},
});

const ProductContextConsumer = ProductContext.Consumer;

class ProductContextProvider extends React.Component {
  static setFilter(listings, filter) {
    const { name, modelNumber, locationName } = filter;
    let result = listings;
    if (name) {
      result = result.filter((item) => item.name.toLowerCase().includes(name));
    }
    if (modelNumber) {
      result = result.filter((item) =>
        item.modelNumber.toLowerCase().includes(modelNumber)
      );
    }
    if (locationName) {
      result = result.filter((item) =>
        item.locationName.toLowerCase().includes(locationName)
      );
    }
    return result;
  }

  updateFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  render() {
    const { children } = this.props;
    const { productList, filter } = this.state;

    const filteredList = ProductContextProvider.applyFilter(
      productList,
      filter
    );

    return (
      <ProductContextProvider.Provider
        value={{
          productList: filteredList,
          updateFilter: this.updateFilter,
        }}
      >
        {children}
      </ProductContextProvider.Provider>
    );
  }
}

export default ProductContextConsumer;

export { ProductContextProvider };
