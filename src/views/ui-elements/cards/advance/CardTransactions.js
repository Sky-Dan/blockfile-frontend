// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import * as Icon from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap'

const CardTransactions = () => {
  const transactionsArr = [
    {
      title: 'Today\'s SLP',
      color: 'light-primary',
      subtitle: 'Starbucks',
      amount: '- $74',
      Icon: Icon['Pocket'],
      down: true
    },
    {
      title: 'Yesterday\'s SLP',
      color: 'light-success',
      subtitle: 'Add Money',
      amount: '+ $480',
      Icon: Icon['Check']
    },
    {
      title: 'Total Axies',
      color: 'light-danger',
      subtitle: 'Add Money',
      amount: '+ $590',
      Icon: Icon['DollarSign']
    },
    {
      title: 'Lifetime SLP',
      color: 'light-warning',
      subtitle: 'Ordered Food',
      amount: '- $12',
      Icon: Icon['CreditCard'],
      down: true
    },
    {
      title: 'Total Accounts',
      color: 'light-info',
      subtitle: 'Refund',
      amount: '+ $98',
      Icon: Icon['TrendingUp']
    }
  ]

  const renderTransactions = () => {
    return transactionsArr.map(item => {
      return (
        <div key={item.title} className='transaction-item'>
          <div className='d-flex align-center'>
            <Avatar className='rounded' color={item.color} icon={<item.Icon size={18} />} />
            <div>
              <h6 className='transaction-title'>{item.title}</h6>
              {/* <small>{item.subtitle}</small> */}
            </div>
          </div>
          <div className={`fw-bolder ${item.down ? 'text-danger' : 'text-success'}`}>{item.amount}</div>
        </div>
      )
    })
  }

  return (
    <Card className='card-transaction'>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions
