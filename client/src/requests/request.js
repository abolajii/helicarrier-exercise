import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5040/",
  cache: new InMemoryCache(),
});

export const getAllUsers = () => {
  client
    .query({
      query: gql`
        query {
          getAllUsers {
            id
            first_name
            last_name
            gender
            status
            email
            img
            created_at
          }
        }
      `,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
