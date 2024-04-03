import './registration.scss';

const registrationTemplate = `
<div class='row' id="registration">
  <div class='registration-page'>
    <div class='registration-page__content'>
      {{{ title }}}
      {{{ fields }}}
    </div>
    <div class='registration-page__title'>
      {{{ button }}}
    </div>
    {{{ link }}}
  </div>
  
  <img src='../../background.png' alt='background'>
</div>
`;

export default registrationTemplate;
