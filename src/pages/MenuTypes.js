import React, { useCallback, useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
import { Badge, Col, Row, Table } from "react-bootstrap";
import axios from "axios";
import AddMenuTypeDrawer from "../components/AddMenuTypeDrawer";
import EditFoodType from "../components/EditFoodType";
import DeleteFoodType from "../components/DeleteFoodType";
import DiscountFoodType from "../components/DiscountFoodType";
import { Bars } from "react-loader-spinner";
import ChangeFoodtTypeStatus from "../components/ChangeFoodtTypeStatus";

export default function MenuTypes() {
  const STORY_HEADERS = [
    {
      prop: "name",
      title: "Name",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "count",
      title: "Item Count",
      isSortable: true,
      cell: (row) => row.menus.length,
    },
    {
      prop: "status",
      title: "Availability",
      isSortable: true,
      cell: (row) =>
        row.status ? (
          <Badge bg="success">Available</Badge>
        ) : (
          <Badge bg="danger">Not Available</Badge>
        ),
    },
    {
      prop: "discount",
      title: "Discount",
      cell: (row) =>
        row.type_discount > 0 ? (
          <Badge pill bg="success">
            Active
          </Badge>
        ) : (
          <Badge pill bg="danger">
            Not active
          </Badge>
        ),
    },
    {
      prop: "type_discount",
      title: "Discount %",
      cell: (row) => row.type_discount * 100,
    },
    {
      prop: "id",
      title: "Actions",
      cell: (row) => (
        <>
          <EditFoodType type={row} loadTypes={loadTypes} drinkTypes={drinkTypes} />
          <ChangeFoodtTypeStatus type={row} loadTypes={loadTypes} />
          <DiscountFoodType type={row} loadTypes={loadTypes} />
          <DeleteFoodType type={row} loadTypes={loadTypes} />
        </>
      ),
    },
  ];

  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drinkTypes, setDrinkTypes] = useState([]);

  const loadDrinkTypes = useCallback(async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    try {
      let t = await axios
        .get(
          `${
            process.env.REACT_APP_API_URL
          }/place/drinkstock/${localStorage.getItem("place")}`
        )
        .then((r) => {
          setDrinkTypes(r.data);
          console.log(r.data);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  });

  const loadTypes = useCallback(async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    try {
      let t = await axios.get(
        `${process.env.REACT_APP_API_URL}/type/place/${localStorage.getItem(
          "place"
        )}`
      );
      setTypes(t.data.types);
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#f7f7f7";
    loadTypes();
    loadDrinkTypes();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="container-fluid" style={{ padding: "2rem 0 0 0" }}>
        <div className="d-flex flex-row justify-content-start">
          <div
            className="bg-danger me-3 mt-2"
            style={{ width: "1rem", height: "1rem" }}
          >
            {" "}
          </div>
          <h4 style={{ fontWeight: "700" }}>Food Types</h4>

          <AddMenuTypeDrawer loadTypes={loadTypes} drinkTypes={drinkTypes} />
        </div>
        <div className="container">
          <div className="mt-3">
            {loading ? (
              <Bars
                heigth="100"
                width="1400"
                color="red"
                ariaLabel="loading-indicator"
              />
            ) : (
              <DatatableWrapper
                body={types}
                headers={STORY_HEADERS}
                paginationOptionsProps={{
                  initialState: {
                    rowsPerPage: 10,
                    options: [5, 10, 15, 20],
                  },
                }}
              >
                <Row className="mb-4 p-2">
                  <Col
                    xs={12}
                    lg={4}
                    className="d-flex flex-col justify-content-end align-items-end"
                  >
                    <Filter classes={{ clearButton: "btn-danger" }} />
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    lg={4}
                    className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                  >
                    <PaginationOptions alwaysShowPagination="true" />
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    lg={4}
                    className="d-flex flex-col justify-content-end align-items-end"
                  >
                    <Pagination classes={{ button: "btn-danger" }} />
                  </Col>
                </Row>
                <Table>
                  <TableHeader />
                  <TableBody />
                </Table>
              </DatatableWrapper>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
