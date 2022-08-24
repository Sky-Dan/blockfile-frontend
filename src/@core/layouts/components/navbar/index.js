// ** React Imports
import { Fragment } from 'react';

// ** Custom Components
import NavbarUser from './NavbarUser';
import NavbarBookmarks from './NavbarBookmarks';
import AuthAlert from '../alerts/AuthAlert';
import { useSelector } from 'react-redux';

const ThemeNavbar = (props) => {
  const store = useSelector((state) => state.auth);

  // ** Props
  // eslint-disable-next-line no-unused-vars
  const { skin, setSkin, setMenuVisibility } = props;

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div>

      {!store.isConnected && <div>{/* <AuthAlert /> */}</div>}

      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  );
};

export default ThemeNavbar;
