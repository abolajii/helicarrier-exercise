import { gql, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { QueryContext } from "../../context/QueryContext";
import useDebounce from "../../hook/useDebounce";

const Container = styled.div``;

const Date = styled.div``;

const DateText = styled.p`
  font-size: 17px;
  font-weight: bold;
  color: #3aafb9;
`;

const DataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 30px 0;
`;

const ListItem = styled.div`
  margin: 10px 0;
`;

const ItemOne = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  overflow: hidden;
`;

const ItemTwo = styled.div`
  width: 100%;
  height: 100px;
  padding-left: 12px;
  padding-top: 12px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Name = styled.p`
  &.font-weight {
    font-weight: bold;
  }
`;

const ListContainer = () => {
  const { query, setGroupData, groupData, reload } = useContext(QueryContext);

  const [noResult, setNoResult] = useState(false);
  const debounce = useDebounce(query);

  const GET_USERS = gql`
    query {
      getAllUsers {
        id
        first_name
        last_name
        email
        img
        status
        gender
        created_at
      }
    }
  `;

  const GET_SEARCH_QUERY = gql`
    query getAllUser($name: String!) {
      getAllUser(name: $name) {
        id
        first_name
        last_name
        email
        img
        status
        gender
        created_at
      }
    }
  `;

  const { loading, data } = useQuery(GET_USERS);

  useEffect(() => {
    if (loading) {
      setGroupData([]);
    } else if (!debounce || reload) {
      const groupData = data.getAllUsers.reduce((group, product) => {
        const { created_at } = product;
        group[created_at] = group[created_at] ?? [];
        group[created_at].push(product);
        return group;
      }, {});
      setGroupData(groupData);
    }
  }, [loading, debounce, setGroupData, data?.getAllUsers, reload]);

  const searchData = useQuery(GET_SEARCH_QUERY, {
    variables: { name: debounce },
  });

  useEffect(() => {
    if (searchData.data?.getAllUser) {
      const groupData = searchData.data?.getAllUser.reduce((group, product) => {
        const { created_at } = product;
        group[created_at] = group[created_at] ?? [];
        group[created_at].push(product);
        return group;
      }, {});
      setGroupData(groupData);

      searchData.data?.getAllUser.length === 0 && setNoResult(true);
    }
  }, [searchData.data?.getAllUser, setGroupData]);

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <Container>
        <>
          {Object.keys(groupData).map((each, key) => {
            const array = groupData[each];
            return (
              <ListItem key={key}>
                <Date>
                  <DateText>{each}</DateText>
                </Date>
                {array.map((each, key) => {
                  return (
                    <DataContainer key={key}>
                      <ItemOne>
                        <Image src={each.img} />
                      </ItemOne>
                      <ItemTwo>
                        <Name className="font-weight">
                          {each.first_name} {each.last_name}
                        </Name>
                        <Name>{each.status}</Name>
                        <Name>{each.gender}</Name>
                        <Name>{each.email}</Name>
                      </ItemTwo>
                    </DataContainer>
                  );
                })}
              </ListItem>
            );
          })}
        </>

        {noResult && debounce && <p>No result found. Try another search</p>}
      </Container>
    );
  }
};

export default ListContainer;