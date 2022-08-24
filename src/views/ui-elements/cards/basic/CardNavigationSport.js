// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Nav,
  Card,
  Button,
  NavItem,
  NavLink,
  TabPane,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  TabContent
} from 'reactstrap'

const CardNavigationSport = () => {
  // ** States
  const [activeTab, setTabActive] = useState('1')

  const toggleTabs = tab => {
    if (activeTab !== tab) {
      setTabActive(tab)
    }
  }
  return (
    <Fragment>
      <h3 className='mb-2'>Test 1</h3>
      <Row>
        <Col md='12'>
          <Card className='text-center'>
            <CardHeader>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={activeTab === '1'}
                    onClick={() => {
                      toggleTabs('1')
                    }}
                  >
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === '2'}
                    onClick={() => {
                      toggleTabs('2')
                    }}
                  >
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink 
                    active={activeTab === '3'}
                    onClick={() => {
                        toggleTabs('3')
                    }}
                  >
                      OK
                    </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>
            <CardBody>
              <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                  <CardTitle tag='h4'>Special title treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button color='primary' outline>
                    Go somewhere
                  </Button>
                </TabPane>
                <TabPane tabId='2'>
                  <CardTitle tag='h4'>Special title </CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button color='primary' outline>
                    Go somewhere
                  </Button>
                </TabPane>
                <TabPane tabId='3'>
                  <CardTitle tag='h4'>Special title </CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button color='primary' outline>
                    Go somewhere
                  </Button>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default CardNavigationSport
