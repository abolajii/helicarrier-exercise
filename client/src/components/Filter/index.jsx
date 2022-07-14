import { gql, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { QueryContext } from "../../context/QueryContext";
import { mobileResponsiveness } from "../../responsive/responsive";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 1rem 0;
  flex-wrap: wrap;
  align-items: center;

  ${mobileResponsiveness({
    justifyContent: "center",
    gap: "10px",
  })}
`;

const Button = styled.button`
  padding: 10px 17px;
  font-size: 15px;
  border: 1px solid #3aafb9;
  color: #3aafb9;
  background: transparent;
  font-weight: bold;

  &.active {
    background: #3aafb9;
    color: #fff;
  }

  ${mobileResponsiveness({
    padding: "10px 17px",
  })}
`;

const Filter = () => {
  const { setGroupData, setReload, query } = useContext(QueryContext);
  const [active, setActive] = useState(5);

  const GET_FILTER_RESULTS = gql`
    query getFilterResults($status: String, $gender: String) {
      getFilterResults(status: $status, gender: $gender) {
        id
        first_name
        last_name
        img
        email
        status
        gender
        created_at
      }
    }
  `;

  const filterButton = [
    { id: 1, value: "All" },
    { id: 5, value: "Single" },
    { id: 2, value: "Married" },
    { id: 3, value: "Male" },
    { id: 4, value: "Female" },
  ];

  const [filterValue, setFilterValue] = useState("");
  const filterData = useQuery(GET_FILTER_RESULTS, {
    variables: { status: filterValue, gender: filterValue },
  });

  useEffect(() => {
    if (filterData.data?.getFilterResults) {
      const groupData = filterData.data?.getFilterResults.reduce(
        (group, product) => {
          const { created_at } = product;
          group[created_at] = group[created_at] ?? [];
          group[created_at].push(product);
          return group;
        },
        {}
      );
      setGroupData(groupData);
    }
  }, [filterData.data?.getFilterResults, setGroupData]);

  useEffect(() => {
    if (query) {
      setActive(0);
    } else {
      setActive(1);
    }
  }, [query]);

  return (
    <>
      <Container>
        {filterButton.map((each) => {
          if (each.value === "All") {
            return (
              <Button
                className={each.id === active && "active"}
                onClick={() => {
                  setActive(each.id);
                  setReload(true);
                }}
              >
                All
              </Button>
            );
          } else {
            return (
              <Button
                className={each.id === active && "active"}
                onClick={() => {
                  setActive(each.id);
                  setFilterValue(each.value);
                  setReload(false);
                }}
                key={each.id}
              >
                {each.value}
              </Button>
            );
          }
        })}
      </Container>
    </>
  );
};

export default Filter;
