import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import Tree from "../../features/tree/sortableTree";


const App = () => {
  return (
       <Container>
        <Tree />
       </Container>
  );
};

export default App;
