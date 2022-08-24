import { useEffect } from 'react';
import { Table } from 'reactstrap';
import { api } from '../../services/api';

const ListFiles = () => {
  const getFile = async () => {
    try {
      const response = await api.get(`/files`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFile();
  });

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>File</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span className="align-middle fw-bold">Angular Project</span>
          </td>
          <td>Peter Charles</td>
        </tr>
        <tr>
          <td>
            <span className="align-middle fw-bold">React Project</span>
          </td>
          <td>Ronald Frest</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ListFiles;
