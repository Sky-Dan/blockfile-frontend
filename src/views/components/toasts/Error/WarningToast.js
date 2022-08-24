import { Fragment } from 'react';

import Avatar from '@components/avatar';
import { AlertTriangle } from 'react-feather';

export default function WarningToast({ description }) {
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar
            size="sm"
            color="warning"
            icon={<AlertTriangle size={12} />}
          />

          <h6 className="toast-title">Warning!</h6>
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
