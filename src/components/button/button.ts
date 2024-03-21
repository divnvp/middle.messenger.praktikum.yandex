import './button.scss';

const buttonTemplate = `
<button class='button' type="{{type}}" onclick="{{onclick}}">
  {{ text }}
</button>
`;

export default buttonTemplate;
