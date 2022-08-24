import { Row, Col } from 'reactstrap';
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/base/pages/dashboard-ecommerce.scss';
import FileUploaderSingle from '../forms/form-elements/file-uploader/FileUploaderSingle';

const AnalyticsDashboard = () => {
  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="12" md="12" xs="12">
          <FileUploaderSingle />
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsDashboard;
