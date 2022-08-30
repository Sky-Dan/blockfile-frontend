import { Check, File, Upload } from 'react-feather';

const defaultRoutes = [
  {
    id: 'upload',
    title: 'Upload',
    icon: <Upload size={20} />,
    navLink: '/dash',
  },
  {
    id: 'listFile',
    title: 'List Files',
    icon: <File size={20} />,
    navLink: '/list-files',
  },
  {
    id: 'validationFile',
    title: 'File Validation',
    icon: <Check size={20} />,
    navLink: '/validation-file',
  },
  // {
  //   header: 'Menu'
  // },
];

export default defaultRoutes;
