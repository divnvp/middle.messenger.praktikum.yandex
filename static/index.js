'use strict';

import * as Components from '../src/components/index.js';
import { onClick, onContentLoaded } from '../src/shared/utils/router.js';
import Handlebars from 'handlebars';

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

onContentLoaded();
onClick();
