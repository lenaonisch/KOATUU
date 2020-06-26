import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agents from "../api/agents";
import { ILocality } from "../models/locality";
import Tree from "../../features/tree/sortableTree";


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [treeData, setTreeData] = useState<ILocality[]>([]);

  const handleSelectActivity = (id: String) => {
    setEditMode(false);
    setSelectedActivity(
      activities.filter((act) => {
        return act.id === id;
      })[0]
    );
  };

  const handelCreateEditForm = () => {
    setEditMode(true);
    setSelectedActivity(null);
  };


  // const handleEditActivity = (activity: IActivity) => {
  //   agents.Activities.edit(activity).then(() => {
  //     setActivities([
  //       ...activities.filter((t) => t.id !== activity.id),
  //       activity,
  //     ]);
  //     setSelectedActivity(activity);
  //     setEditMode(false);
  //   });
  // };

  // const handleDeleteActivity = (id: string) => {
  //   agents.Activities.delete(id).then(() => {
  //     setActivities([...activities.filter((t) => t.id !== id)]);
  //     setSelectedActivity(null);
  //     setEditMode(false);
  //   });
  // };

  // useEffect(() => {
  //     agents.Activities.list()
  //     .then((response) => {
  //       let newActivities: IActivity[] = [];
  //       response.forEach(activity => {
  //         let dateParts = activity.date.split(':')
  //         activity.date = dateParts[0] +":"+ dateParts[1];
  //         newActivities.push(activity);
  //       })
  //       setActivities(newActivities);
  //     });
  // }, []);

  useEffect(() => {
    agents.Localities.list().then((response) => {
      let newLoc: ILocality[] = [];
      response.forEach((loc) => {
        loc.expanded = false;
        newLoc.push(loc);
      });
      setTreeData(newLoc);
    });
  }, []);

  return (
    <Fragment>
      <Container>
        {/* <NavBar openCreateForm={handelCreateEditForm}/> */}
        <Tree />
        {/* <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        /> */}
      </Container>
    </Fragment>
  );
};

export default App;
