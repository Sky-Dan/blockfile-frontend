import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { api } from '../../services/api';

const ListFiles = () => {
  const [dados, setDados] = useState();
  const getFile = async () => {
    try {
      const response = await api.get(`/files`);
      console.log(response.data.files);
      setDados(response.data.files);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFile();
  }, []);

  return (
    <>
      {!dados ? null : (
        <Table responsive>
          <thead>
            <tr>
              <th>Hash</th>
              <th>File Name</th>
              <th>Created At</th>
              <th>File Url</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((data) => (
              <tr>
                <td>
                  <p className="card-text text-wrap">{data.hash}</p>
                </td>
                <td>
                  <p className="card-text text-wrap">{data.file}</p>
                </td>
                <td>
                  <p className="card-text text-wrap">{data.created_at}</p>
                </td>
                <td>
                  <p className="card-text text-wrap">{data.file_url}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ListFiles;
