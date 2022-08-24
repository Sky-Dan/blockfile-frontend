import { Crop, File, Upload } from 'react-feather';

const defaultRoutes = [
  {
    id: 'upload',
    title: 'Upload',
    icon: <Upload size={20} />,
    navLink: '/',
  },
  {
    id: 'listFile',
    title: 'List Files',
    icon: <File size={20} />,
    navLink: '/list-files',
  },
  // {
  //   header: 'Menu'
  // },
];

export default defaultRoutes;
