// ** Custom Hooks
// import { useSkin } from '@hooks/useSkin';

// ** Styles
import '@styles/base/pages/page-misc.scss';

const WrongNetwork = () => {
  // ** Hooks
  // const { skin } = useSkin();

  // const illustration =
  //     skin === 'dark' ? 'not-authorized-dark.svg' : 'not-authorized.svg',
  //   source = require(`@src/assets/images/pages/${illustration}`).default;

  return (
    <div className="misc-wrapper">
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">You are connected in a Wrong Network! 🔐</h2>
          <p className="mb-2">Please, switch to the Ethereum Mainnet</p>
          {/* <img className="img-fluid" src={source} alt="Not authorized page" /> */}
        </div>
      </div>
    </div>
  );
};
export default WrongNetwork;
