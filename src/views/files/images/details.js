// ** React Imports
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

// ** Third Party Components
import { Check } from 'react-feather';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Label,
  Input,
  Form,
} from 'reactstrap';

import { api } from '../../../services/api';

const BasicHookForm = () => {
  const { state } = useLocation();

  console.log(state);

  // ** Hooks
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      await api.post(`/files/${state.id}`, data);

      toast.success(
        <Fragment>
          <div className="toastify-header">
            <div className="title-wrapper">
              <Avatar size="sm" color="success" icon={<Check size={12} />} />
              <h6 className="toast-title">Form Submitted!</h6>
            </div>
          </div>
          <div className="toastify-body">
            <ul className="list-unstyled mb-0">
              <li>
                <strong>URL</strong>: {data.link_url}
              </li>
            </ul>
          </div>
        </Fragment>,
        { icon: false, hideProgressBar: true }
      );

      reset({
        link_url: '',
      });
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
          });
        }
      }
    }
  };

  const handleReset = () => {
    reset({
      link_url: '',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Basic</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1">
            <Label className="form-label" for="link_url">
              URL
            </Label>
            <Controller
              defaultValue={state.link_url}
              control={control}
              id="link_url"
              name="link_url"
              render={({ field }) => (
                <Input
                  placeholder="http://"
                  invalid={errors.link_url && true}
                  {...field}
                />
              )}
            />
          </div>

          <div className="d-flex">
            <Button className="me-1" color="primary" type="submit">
              Submit
            </Button>
            <Button
              outline
              color="secondary"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default BasicHookForm;
