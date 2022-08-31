// ** React Imports
import { useState, Fragment } from 'react';
import { api } from '../../../../services/api';
import { ipfsApi } from '../../../../services/api/ipfsApi';

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

// ** Third Party Imports
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { FileText, X, DownloadCloud } from 'react-feather';
import { ErrorToast, SuccessToast } from '../../../components/toasts/Error';

import Spinner from '@components/spinner/Loading-spinner';
import useContract from '../../../../hooks/useContract';

const FileUploaderSingle = () => {
  // ** State
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const { handleStoreFile } = useContract();

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles([...acceptedFiles.map((file) => Object.assign(file))]);
    },
    accept: 'image/jpeg,image/jpg,image/png,application/pdf',
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
      formData.append('description', description);

      const file = await api.post(`/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Promise.allSettled([
        handleStoreFile(file.data.file.hash),
        ipfsApi.post(`/file`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      ]).then(async (values) => {
        console.log(values);
        await api.put(`/files/${file.data.file.hash}`, {
          tx: (values[0].value && values[0].value.transactionHash) || '',
          ipfs_url: (values[1].value && values[1].value.data.cid) || '',
        });
      });

      toast.success(
        <SuccessToast description="File upload was successfully" />,
        {
          icon: false,
          hideProgressBar: true,
        }
      );

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
        <CardTitle tag="h4">Upload your file to the blockchain</CardTitle>
      </CardHeader>
      <CardBody>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {' '}
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
            <div>
              <Label className="form-label" for="basicInput">
                Description
              </Label>
              <Input
                type="text"
                value={description}
                placeholder="Set description..."
                onChange={(e) => setDescription(e.target.value)}
              />
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
                    Upload Files
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

export default FileUploaderSingle;
