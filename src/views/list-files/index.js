import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { api } from '../../services/api';
import { formatDateHourMinute } from '../../utility/Utils';

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
              <th>File Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((data) => (
              <tr key={data.file}>
                <td>
                  <p className="card-text text-wrap">{data?.file}</p>
                </td>
                <td>
                  <p className="card-text text-wrap">{data?.description}</p>
                </td>
                <td>
                  <p className="card-text text-wrap">
                    {formatDateHourMinute(data?.created_at)}
                  </p>
                </td>
                <td>
                  <Link to={`/file-details/${data?.hash}`} className="">
                    More Details
                  </Link>
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
