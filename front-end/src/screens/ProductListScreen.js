import React, { Fragment, useEffect } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  listProducts,
  resetCreateProduct,
} from "../actions/productAction";
import Message from "../componenets/Message";
import Loader from "../componenets/Loader";
import Paginate from "../componenets/Paginate";

const ProductListScreen = ({ history, match }) => {
  const { pageNumber } = match.params;
  const { userInfo } = useSelector((state) => state.userLogin);
  const { products, loading, error, pages, currentPage } = useSelector(
    (state) => state.productList
  );

  const { success, loading: loadingDelete, error: errorDelete } = useSelector(
    (state) => state.productDelete
  );

  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product,
  } = useSelector((state) => state.productCreate);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      if (successCreate) {
        history.push(`/admin/product/${product._id}/edit`);
        dispatch(resetCreateProduct());
      } else {
        dispatch(listProducts("", pageNumber || 1));
      }
    }
    // eslint-disable-next-line
  }, [history, dispatch, userInfo, success, successCreate, pageNumber]);

  const deleteHandler = (productId) => {
    if (window.confirm("Are you sure you wanna delete this product ?")) {
      dispatch(deleteProduct(productId));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <Fragment>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} currentPage={currentPage} isAdmin={true} />
        </>
      )}
    </Fragment>
  );
};

export default ProductListScreen;
