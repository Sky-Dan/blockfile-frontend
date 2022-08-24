import { Row, Col } from 'reactstrap'
import CardNavigationSport from '@src/views/ui-elements/cards/basic/CardNavigationSport'
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

const Test11 = () => {
//   const { colors } = useContext(ThemeColors),
//     trackBgColor = '#e9ecef'

//     console.log(trackBgColor)

  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col xl='12' md='12' xs='12'>
          <CardNavigationSport />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col xl='12' md='12' xs='12'>
          <CardNavigationSport />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col xl='12' md='12' xs='12'>
          <CardNavigationSport />
        </Col>
      </Row>
    </div>
  )
}

export default Test11
