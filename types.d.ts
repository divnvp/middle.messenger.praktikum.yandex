declare module '*.hbs' {
  import { TemplateDelegate } from 'handlebars';
  const template: TemplateDelegate;
  export default template;
}

declare module '*.hbs?raw' {
  import { TemplateDelegate } from 'handlebars';
  const template: TemplateDelegate;
  export default template;
}
