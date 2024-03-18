import './auth.scss';

const authTemplate = `
<main id="auth">
  <div class='row'>
    <form class='auth-page'>
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
</main>
`;

export default authTemplate;
