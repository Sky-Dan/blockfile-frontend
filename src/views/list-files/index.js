import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Label } from 'reactstrap';
import { api } from '../../services/api';
import { formatDateHourMinute } from '../../utility/Utils';

const ListFiles = () => {
  const [dados, setDados] = useState();
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState();

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

  const searchFile = async () => {
    try {
      const response = await api.get(`/files/filters?description=${search}`);
      console.log(response.data);
      setFilter(response.data.files);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchFile();
  }, [search]);

  return (
    <>
      {!dados ? null : (
        <>
          <Label>Search file</Label>
          <Input
            type="text"
            placeholder="input description of file..."
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />
          <Table responsive>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            {!search ? (
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
            ) : (
              <tbody>
                {filter.map((data) => (
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
            )}
          </Table>
        </>
      )}
    </>
  );
};

export default ListFiles;
