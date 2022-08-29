import { useState } from 'react';
import { Link } from 'react-router-dom';
import '@styles/base/pages/page-auth.scss';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import InputPasswordToggle from '@components/input-password-toggle';
import {
  CardTitle,
  CardBody,
  CardText,
  Card,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
} from 'reactstrap';

import './index.css';
import { handleConnect } from '../../redux/auth';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    dispatch(
      handleConnect({
        userData: {
          email,
          password,
          kind: 'defaultUser',
        },
      })
    );
  };

  return (
    <div className="auth-wrapper auth-v1 px-2">
      <div className="auth-inner py-2">
        <Card className="mb-0">
          <CardBody>
            <Link
              className="brand-logo"
              to="/"
              onClick={(e) => e.preventDefault()}
            >
              <h2 className="brand-text text-primary ml-1"> BlockFile</h2>
            </Link>
            <CardTitle tag="h4" className="mb-1">
              Welcome to Blockfile! 👋
            </CardTitle>
            <CardText className="mb-2">
              Entre em sua conta para começar a criar atividades!
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup>
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Input
                  autoFocus
                  type="email"
                  value={email}
                  id="login-email"
                  name="login-email"
                  placeholder="tt@tt.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Senha
                  </Label>
                </div>
                <InputPasswordToggle
                  value={password}
                  id="login-password"
                  name="login-password"
                  className="input-group-merge"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button.Ripple type="submit" color="primary" block>
                Login
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;
