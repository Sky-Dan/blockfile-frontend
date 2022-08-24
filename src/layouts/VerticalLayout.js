// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout';

// ** Menu Items Array
import defaultRoutes from '@src/navigation/vertical';
import { useState } from 'react';

const VerticalLayout = (props) => {
  const [menuData] = useState(defaultRoutes);

  return (
    <Layout menuData={menuData} {...props}>
      {props.children}
    </Layout>
  );
};

export default VerticalLayout;
