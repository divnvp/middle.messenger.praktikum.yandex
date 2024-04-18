import { JSDOM } from 'jsdom';
import Sinon from 'sinon';

const jsDOM = new JSDOM('<main></main>', {
  url: 'http://localhost:3000'
});

global.XMLHttpRequest = Sinon.useFakeXMLHttpRequest();

global.window = jsDOM.window;
global.DocumentFragment = jsDOM.window.DocumentFragment;
global.document = jsDOM.window.document;
