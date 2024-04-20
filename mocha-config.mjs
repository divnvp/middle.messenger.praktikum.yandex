import { JSDOM } from 'jsdom';
import sinon from 'sinon';

const jsDOM = new JSDOM('<main></main>', {
  url: 'http://localhost:3000'
});

global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

global.window = jsDOM.window;
global.DocumentFragment = jsDOM.window.DocumentFragment;
global.document = jsDOM.window.document;
