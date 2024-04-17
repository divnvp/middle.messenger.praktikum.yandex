import { JSDOM } from 'jsdom';

const jsDOM = new JSDOM('<div id="root"></div>', {
  url: 'http://localhost:3000'
});

global.window = jsDOM.window;
global.document = jsDOM.window.document;
global.DocumentFragment = jsDOM.window.DocumentFragment;
