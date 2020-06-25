import React, { FC } from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  openCreateForm : ()=> void;
  
}

export const NavBar: FC<IProps> = (props) => {
  //   const [activeItem, setMenuItem] = useState<string>("home");

  //   handleItemClick = (e, { name }) => setMenuItem({ activeItem: name });

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item
          header
          name="home"
          // active={activeItem === "home"}
          // onClick={handleItemClick}
        >
          <img src="../../../logo.png" style={{ marginRight: 10 }} />
          Home
        </Menu.Item>
        <Menu.Item
          name="messages"
          // active={activeItem === "messages"}
          // onClick={handleItemClick}
        />
        <Menu.Item
          name="friends"
          // active={activeItem === "friends"}
          // onClick={handleItemClick}
        >
          <Button
            positive
            content="Create activity"
            onClick={props.openCreateForm
            }
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
