import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNavBar({ searchedText, setSearchedText, filterBySearch, setTab }) {


  const handleSearchText = (event) => {
    setSearchedText(event.target.value)
    
    if(event.target.value == '') {
      filterBySearch('')
    }
  }

  return (
    
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Shopping</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <InputGroup className="mx-5">
          <Form.Control
            placeholder="Search what you like"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={searchedText}
            onChange={handleSearchText}
          />
          <Button variant="outline-danger" id="button-addon2" onClick={() => filterBySearch(searchedText)}>
            Search
          </Button>
        </InputGroup>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#shop" onClick={()=>setTab(0)}>Shop</Nav.Link>
            <Nav.Link href="#notifications" onClick={()=>setTab(1)}>Notifications</Nav.Link>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1" onClick={()=>setTab(2)}>Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" onClick={()=>setTab(3)}>
                Cart
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" onClick={()=>setTab(4)}>
                Preference
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4" onClick={()=>setTab(5)}>Help</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.5" onClick={()=>setTab(6)}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;