import React, { FC } from "react";
import { IActivity } from "../../../app/models/activity";
import { Card, Icon, Image, Button } from "semantic-ui-react";

interface IProps {
  activity: IActivity;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity : (act: IActivity | null) => void;
}
export const ActivityDetails: FC<IProps> = ({activity, setEditMode, setSelectedActivity}) => {
  
  return (
    <Card>
      <Image
        src="../../../assets/placeholder.png"
        wrapped
        ui={false}
      />
      <Card.Content>
        
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button onClick={() => setEditMode(true)} color='blue'>Edit</Button>
          <Button onClick={() => setSelectedActivity(null)} color='grey'>Cancel</Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
