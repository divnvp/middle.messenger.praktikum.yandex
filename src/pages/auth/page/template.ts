const authTemplate = `
<div>
  <div class='row'>
    <form class='auth-page' id="auth">
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
    </form>

  <img src='../../background.png' alt='background'>
</div>
`;

export default authTemplate;
