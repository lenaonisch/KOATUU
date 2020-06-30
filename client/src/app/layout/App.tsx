import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agents from "../api/agents";
import { ILocality } from "../models/locality";
import Tree from "../../features/tree/sortableTree";


const App = () => {
  return (
       <Container>
        <Tree />
       </Container>
  );
};

export default App;
