import './registration.scss';

const registrationTemplate = `
<div class='row' id="registration">
  <form class='registration-page'>
    <div class='registration-page__content'>
      {{{ title }}}
      {{{ fields }}}
    </div>
    <div class='registration-page__title'>
      {{{ button }}}
    </div>
    {{{ link }}}
  </form>
  
  <img src='../../background.png' alt='background'>
</div>
`;

export default registrationTemplate;
