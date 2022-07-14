import Search from "./components/Search/index";
import Filter from "./components/Filter";
import ListContainer from "./components/ListContainer";
import styled from "styled-components";
import { mobileResponsiveness } from "./responsive/responsive";

const Container = styled.div`
  padding: 1rem;
  margin: auto;

  width: 900px;

  ${mobileResponsiveness({ width: "100%" })}
`;
function App() {
  return (
    <Container>
      <Search />
      <Filter />
      <ListContainer />
    </Container>
  );
}

export default App;
