import { Error4xxPage } from '@/pages/error-4xx';
import { Link } from '@/components/link';
import { render } from '@/shared/utils/render';

const error4xxPage = new Error4xxPage('div', {
  link: new Link('div', { url: '/', text: 'Назад' })
});

render('#app', error4xxPage);
