import { action } from '@storybook/addon-actions';
import '../../public/global.css';
import Login from '..//Login.svelte';
import StyleWrapper from './StyleWrapper.svelte';

export default { title: 'Login' };

export const basic = () => ({
  Component: StyleWrapper,
  props: {
    component: Login,
    style: `
      background-color: #3f6fde;
      height: 100vh;
      padding: 1rem
    `,
  },
  on: { login: action('login dispatched') },
});
