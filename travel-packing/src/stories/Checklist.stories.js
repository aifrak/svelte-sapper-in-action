import { action } from '@storybook/addon-actions';
import '../../public/global.css';
import Checklist from '../Checklist.svelte';
import StyleWrapper from './StyleWrapper.svelte';

export default { title: 'Checklist' };

export const basic = () => ({
  // This wraps the component being demonstrated in the StyleWrapper component.
  Component: StyleWrapper,
  props: {
    component: Checklist,
    style: `
      background-color: #3f6fde;
      color: white;
      height: 100vh;
      padding: 1rem
    `,
  },
  on: { logout: action('logout dispatched') },
});
