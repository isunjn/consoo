import { Config } from "./type";

const defaultColors = [
  { name: 'blue', bg: '#5151db', fg: '#fff' },
  { name: 'green', bg: '#5cc290', fg: '#fff' },
  { name: 'red', bg: '#860418', fg: '#fff' },
  { name: 'white', bg: '#dddddd', fg: '#000' },
  { name: 'black', bg: '#000000', fg: '#fff' },
  { name: 'gray', bg: '#555555', fg: '#fff' },
  { name: 'orange', bg: '#ff664d', fg: '#fff' },
  { name: 'yellow', bg: '#d4b475', fg: '#fff' },
  { name: 'magenta', bg: '#8f5465', fg: '#fff' },
  { name: 'cyan', bg: '#3fffff', fg: '#000' },
  { name: 'purple', bg: '#7f4ac3', fg: '#fff' },
  { name: 'pink', bg: '#fc9cff', fg: '#fff' },
];

export const defaultCfg: Config = {
  defaultLogLevel: 'info',
  style: {
    padding: '2px 6px',
  },
  mark: '',
  prefix: '',
  colors: defaultColors,
};
