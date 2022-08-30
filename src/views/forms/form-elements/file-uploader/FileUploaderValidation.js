// ** React Imports
import { useState, Fragment } from 'react';
import { api } from '../../../../services/api';

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  ListGroup,
  ListGroupItem,
  Label,
  Input,
} from 'reactstrap';

import Spinner from '@components/spinner/Loading-spinner';

// ** Third Party Imports
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { FileText, X, DownloadCloud } from 'react-feather';
import { ErrorToast, SuccessToast } from '../../../components/toasts/Error';
import useContract from '../../../../hooks/useContract';

const FileUploaderValidation = () => {
  // ** State
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { handleValidateFile } = useContract();

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles([...acceptedFiles.map((file) => Object.assign(file))]);
    },

    accept: 'image/jpeg,image/jpg,image/png',
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith('image')) {
      return (
        <img
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="28"
          width="28"
        />
      );
    } else {
      return <FileText size="28" />;
    }
  };

  const handleFile = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append('file', files[0]);

      const file = await api.post(`/files/validate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const transaction = await handleValidateFile(file.data.hash);

      if (transaction) {
        toast.success(<SuccessToast description="File is valid" />, {
          icon: false,
          hideProgressBar: true,
        });
      } else {
        toast.error(<ErrorToast description="File is invalid" />, {
          icon: false,
          hideProgressBar: true,
        });
      }

      setFiles([]);
    } catch (error) {
      console.log(error);
      toast.error(<ErrorToast description="There was an error" />, {
        icon: false,
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  const fileList = files.map((file, index) => (
    <ListGroupItem
      key={`${file.name}-${index}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0">{file.name}</p>
          <p className="file-size mb-0">{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => handleRemoveFile(file)}
      >
        <X size={14} />
      </Button>
    </ListGroupItem>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Validate your file</CardTitle>
      </CardHeader>
      <CardBody>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <div className="d-flex align-items-center justify-content-center flex-column">
                <DownloadCloud size={64} />
                <h5>Drop Files here or click to upload</h5>
                <p className="text-secondary">
                  Drop files here or click{' '}
                  <a href="/" onClick={(e) => e.preventDefault()}>
                    browse
                  </a>{' '}
                  thorough your machine
                </p>
              </div>
            </div>
            {files.length ? (
              <Fragment>
                <ListGroup className="my-2">{fileList}</ListGroup>
                <div className="d-flex justify-content-end">
                  <Button
                    disabled={loading}
                    className="me-1"
                    color="danger"
                    outline
                    onClick={handleRemoveAllFiles}
                  >
                    Remove All
                  </Button>
                  <Button
                    disabled={loading}
                    color="success"
                    onClick={() => handleFile()}
                  >
                    Validate File
                  </Button>
                </div>
              </Fragment>
            ) : null}
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default FileUploaderValidation;
