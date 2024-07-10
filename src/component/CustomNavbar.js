import { Navbar, Nav, Button } from "rsuite";
import { useAuth } from "../context/AuthContext";

const CustomNavbar = () => {
  const { handelLogout } = useAuth();
  return (
    <Navbar style={{ padding: "10px 30px " }}>
      <Navbar.Brand>
        <span style={{ fontWeight: "600px", fontSize: "25px" }}>
          Task Management System
        </span>
      </Navbar.Brand>

      <Nav pullRight onClick={handelLogout}>
        <Button
          color="red"
          appearance="primary"
          onClick={handelLogout}
          style={{ marginTop: "10px" }}
        >
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};
export default CustomNavbar;
