// ** Third Party Components
import PropTypes from 'prop-types';

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap';

const StatsVertical = ({
  icon,
  color,
  stats,
  subStats,
  statTitle,
  className,
  avatarClassName,
}) => {
  return (
    <Card className="text-center">
      <CardBody className={className}>
        <div
          className={`avatar p-50 m-0 mb-1 ${
            color ? `bg-light-${color}` : 'bg-light-primary'
          }`}
        >
          <div className={`avatar-content ${avatarClassName}`}>{icon}</div>
        </div>
        <p className="card-text line-ellipsis">{statTitle}</p>
        <h2 className="fw-bolder">{stats}</h2>
        {subStats &&  <p className="card-text line-ellipsis">{subStats}</p>}
      </CardBody>
    </Card>
  );
};

export default StatsVertical;

// ** PropTypes
StatsVertical.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  statTitle: PropTypes.string.isRequired,
};
