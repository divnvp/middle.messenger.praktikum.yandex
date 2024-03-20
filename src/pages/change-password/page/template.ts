const changePasswordTemplate = `
<div class='profile-page'>
  {{{ menu }}}

  <div class='profile-page__content'>
    <img class='profile-page__avatar' src='' alt="avatar">
    <form class='profile-page__fields' id="change-password">
      {{{ fields }}}
      {{{ button }}}
      {{{ link }}}
    </form>
  </div>
</div>
`;

export default changePasswordTemplate;
