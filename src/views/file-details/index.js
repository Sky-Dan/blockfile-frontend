import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Row, Card, CardText, Col } from 'reactstrap';
import { formatDateHourMinute } from '../../utility/Utils';

const FileDetails = () => {
  const { hash } = useParams();
  const [file, setFile] = useState();
  console.log(file);

  const handleFile = async () => {
    try {
      const response = await api.get(`/files/${hash}/hash`);
      console.log(response);
      setFile(response.data.file);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFile();
  }, []);

  return (
    <>
      {!file ? null : (
        <Row className="my-2">
          <h1 className="mb-4">File Details</h1>
          <Col
            className="d-flex align-items-center justify-content-center mb-2 mb-md-0"
            md="5"
            xs="12"
          >
            <div className="d-flex align-items-center justify-content-center">
              <img
                className="img-fluid product-img"
                src={file?.file_url}
                alt={file?.file}
              />
            </div>
          </Col>
          <Col md="7" xs="12">
            <CardText>
              <CardText>
                <h5>TX: </h5>
                <a
                  href={`https://polygonscan.com/tx/${file?.tx}`}
                  target="_blank"
                >
                  {file?.tx}
                </a>
              </CardText>
              <CardText>
                <h5>Hash: </h5>
                {file?.hash}
              </CardText>
              <h5>Name File: </h5>
              {file?.file}
            </CardText>
            <CardText>
              <h5>File URL: </h5>
              <a href={file?.file_url} target="_blank">
                {file?.file_url}
              </a>
            </CardText>
            <CardText>
              <h5>IPFS URL: </h5>
              <a
                href={`https://ipfs.io/ipfs/${file?.ipfs_url}`}
                target="_blank"
              >
                {file?.ipfs_url}
              </a>
            </CardText>
            <CardText>
              <h5>Description: </h5>
              {file?.description}
            </CardText>
            <CardText>
              <h5>Created At: </h5>
              {formatDateHourMinute(file?.created_at)}
            </CardText>
          </Col>
        </Row>
      )}
    </>
  );
};

export default FileDetails;
