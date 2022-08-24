import { Fragment } from 'react';

import Avatar from '@components/avatar';
import { Check } from 'react-feather';

export default function SuccessToast({ description }) {
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar size="sm" color="success" icon={<Check size={12} />} />
          <h6 className="toast-title">Success!</h6>
        </div>
      </div>
      <div className="toastify-body">
        <span role="img" aria-label="toast-text">
          {description}
        </span>
      </div>
    </Fragment>
  );
}
