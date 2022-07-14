import React, { useContext } from "react";
import styled from "styled-components";
import { QueryContext } from "../../context/QueryContext";

const Inner = styled.div`
  height: 40px;
  margin-bottom: 15px;
`;

const Text = styled.p`
  font-size: 2rem;
  margin-bottom: 40px;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  padding: 1rem;
  outline: none;
  border: none;
  border: 1px solid #93e1d8;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border: 2px solid #93e1d8;
  }
`;

const Search = () => {
  const { query, setQuery } = useContext(QueryContext);

  const renderSearch = () => {
    return (
      <Input
        placeholder="Search by name"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
    );
  };
  return (
    <>
      <Text>Simple Todo</Text>
      <Inner>{renderSearch()}</Inner>
    </>
  );
};

export default Search;
