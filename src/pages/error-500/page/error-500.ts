import { Error500Page } from '@/pages/error-500';
import { Link } from '@/components/link';
import { render } from '@/shared/utils/render';

const error500Page = new Error500Page('div', {
  link: new Link('div', { url: '/', text: 'Назад' })
});

render('#app', error500Page);
