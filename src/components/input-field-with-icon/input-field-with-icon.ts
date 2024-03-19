import './input-field-with-icon.scss';

const inputWithIconFieldTemplate = `
<div class="container">
<div class="did-floating-label-content">
  <input class="did-floating-input" type="{{ type }}" name="{{ name }}" id="{{ id }}" placeholder=" ">
  <label class="did-floating-label">{{ title }}</label>
  <img class='floating-label__icon' src='{{ icon }}' alt='icon' />
</div>
`;

export default inputWithIconFieldTemplate;
