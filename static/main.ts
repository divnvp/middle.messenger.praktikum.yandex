'use strict';

import * as Components from '../src/components';
import { onClick, onContentLoaded } from '../src/shared/utils/router';
import Handlebars from 'handlebars';

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

onContentLoaded();
onClick();
