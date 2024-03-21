import './button-icon.scss';

const buttonWithIconTemplate = `
<button class='button-icon__button-color' type="{{type}}" onclick="{{onclick}}">
  <img class='button-icon__img' src='{{icon}}' alt='Button icon image' />
</button>
`;

export default buttonWithIconTemplate;
