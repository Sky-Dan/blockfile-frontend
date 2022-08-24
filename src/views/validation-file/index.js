import FileUploaderValidation from '../forms/form-elements/file-uploader/FileUploaderValidation';
import { Row, Col } from 'reactstrap';

const ValidationFile = () => {
  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="12" md="12" xs="12">
          <FileUploaderValidation />
        </Col>
      </Row>
    </div>
  );
};

export default ValidationFile;
