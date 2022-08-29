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

// ** Third Party Imports
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { FileText, X, DownloadCloud } from 'react-feather';
import { ErrorToast, SuccessToast } from '../../../components/toasts/Error';
import Web3 from 'web3';

import StorageContract from '../../../../build/artifacts/contracts/Storage.sol/Storage.json';

import Spinner from '@components/spinner/Loading-spinner';

const contractAddress = process.env.REACT_APP_API_CONTRACT_ADDRESS;
const accountAddress = process.env.REACT_APP_API_ACCOUNT_ADDRESS;
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY;

const FileUploaderSingle = () => {
  // ** State
  const [files, setFiles] = useState([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

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

  const web3 = new Web3(
    'https://polygon-mainnet.g.alchemy.com/v2/gwEXFe136JujTW6BSlbw0aFDkEiL7IH6'
  );

  const contract = new web3.eth.Contract(StorageContract.abi, contractAddress);

  const handleStoreFile = async (hash) => {
    // console.log(await contract.methods.validate(hash).call());

    // const block = await web3.eth.getBlock('latest');

    const nonce =
      (await web3.eth.getTransactionCount(accountAddress, 'pending')) + 1;

    console.log(nonce);

    const tx = {
      from: accountAddress,
      to: contractAddress,
      value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
      gas: web3.utils.toHex(210000),
      // gasPrice: web3.utils.toHex(210000),
      // gasLimit: block.gasLimit,
      data: await contract.methods.store(hash).encodeABI(),
      // nonce,
      chainId: await web3.eth.getChainId(),
    };

    console.log(tx);

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    const transaction = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    return transaction;

    // const transaction = web3.eth.sendSignedTransaction(
    //   signedTx.rawTransaction,
    //   function (error, hash) {
    //     if (!error) {
    //       console.log(
    //         '🎉 The hash of your transaction is: ',
    //         hash,
    //         "\n Check Alchemy's, to view the status of your transaction!"
    //       );
    //     } else {
    //       console.log(
    //         '❗Something went wrong while submitting your transaction:',
    //         error
    //       );
    //     }
    //   }
    // );
  };

  const handleFile = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append('file', files[0]);
      formData.append('comment', comment);

      const file = await api.post(`/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const transaction = await handleStoreFile(file.data.file.hash);

      console.log(transaction);

      await api.put(`/files/${file.data.file.hash}`, {
        tx: transaction.transactionHash,
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
                Comment
              </Label>
              <Input
                type="text"
                value={comment}
                placeholder="Set anotation"
                onChange={(e) => setComment(e.target.value)}
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
