import { useSelector } from 'react-redux';

import ColorGenerator from 'random-color-array-generator/ColorGenerator.min.js';

// ** Third Party Components
import Chart from 'react-apexcharts';

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardSubtitle,
} from 'reactstrap';

const ApexRadiarChartIncomes = () => {
  const store = useSelector((state) => state.dashboard);

  const labels = store.transactions
    .filter((t) => t.kind === 'income')
    .map((transaction) => {
      return transaction.category;
    });

  const uniqueLabels = [...new Set(labels)];

  const colorGenerator = new ColorGenerator(uniqueLabels.length);

  const percentages = uniqueLabels
    .map((category) => {
      const transactions = store.transactions.filter(
        (t) => t.category === category && t.kind === 'income'
      );
      return transactions;
    })
    .map((t) => {
      const totalCategory = t.reduce((carry, item) => {
        return item.amount + carry;
      }, 0);

      return Number(((totalCategory * 100) / store.totalIncome).toFixed(2));
    });

  // ** Chart Options
  const options = {
    legend: {
      show: true,
      position: 'bottom',
    },
    labels: uniqueLabels,
    colors: colorGenerator.generateHEX(),
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${parseInt(val)}%`;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '2rem',
              fontFamily: 'Montserrat',
            },
            value: {
              fontSize: '1rem',
              fontFamily: 'Montserrat',
              formatter(val) {
                return `${parseInt(val)}%`;
              },
            },
            total: {
              show: true,
              fontSize: '1.5rem',
              label: 'Total',
              formatter() {
                return '%';
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1.5rem',
                  },
                  value: {
                    fontSize: '1rem',
                  },
                  total: {
                    fontSize: '1.5rem',
                  },
                },
              },
            },
          },
        },
      },
    ],
  };

  // ** Chart Series
  const series = percentages;

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="mb-75" tag="h4">
            Incomes by Category
          </CardTitle>
          {/*<CardSubtitle className='text-muted'>Spending on various categories</CardSubtitle>*/}
        </div>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type="donut" height={350} />
      </CardBody>
    </Card>
  );
};

export default ApexRadiarChartIncomes;
