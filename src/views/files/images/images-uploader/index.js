// ** React Imports
import { Fragment } from 'react';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Custom Components
import ExtensionsHeader from '@components/extensions-header';

// ** Demo Components
import FileUploaderSingle from './FileUploaderSingle';

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss';

const Uploader = () => {
  return (
    <Fragment>
      <ExtensionsHeader title="Update Image" />

      <Row>
        <Col sm="12">
          <FileUploaderSingle />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Uploader;
