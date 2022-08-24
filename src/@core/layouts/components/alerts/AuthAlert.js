// ** Reactstrap Imports
import { AlertCircle } from 'react-feather';
import { Alert } from 'reactstrap';

const AuthAlert = () => {
  return (
    <div className="demo-spacing-0">
      <Alert color="warning">
        <div className="alert-body">
          <AlertCircle size={15} />{' '}
          <span className="ms-1">
            Your data <strong>will not be persisted</strong> if you are not
            logged in.
          </span>
        </div>
      </Alert>
    </div>
  );
};
export default AuthAlert;
