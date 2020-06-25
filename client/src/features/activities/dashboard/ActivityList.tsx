import React, { FC } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}

export const ActivityList: FC<IProps> = (props) => {
  return (
    <Item.Group>
      {props.activities.map((activity: IActivity) => (
        <Segment key={activity.id}>
          <Item>
            <Item.Image
              size="tiny"
              src="https://react.semantic-ui.com/images/wireframe/image.png"
            />

            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.vanue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => {
                    props.deleteActivity(activity.id);
                  }}
                  content="Delete"
                  floated="right"
                  color="red"
                />
                <Button
                  onClick={() => {
                    props.selectActivity(activity.id);
                  }}
                  content="View"
                  floated="right"
                  color="blue"
                />

                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Segment>
      ))}
    </Item.Group>
  );
};
