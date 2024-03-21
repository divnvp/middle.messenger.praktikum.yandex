const authTemplate = `
<div class='row'>
  <div class='auth-page' id="auth">
    <div class='auth-page__content'>
      {{{ title }}}
      {{{ text }}}
      {{{ fields }}}
    </div>
    <div class='auth-page__input'>
      {{{ button }}}
    </div>
    <div class='auth-page__registration'>
      {{{ link }}}
    </div>
  </div>

<img src='../../background.png' alt='background'>
`;

export default authTemplate;
