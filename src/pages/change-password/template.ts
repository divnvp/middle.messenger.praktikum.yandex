const changePasswordTemplate = `
<div class='profile-page'>
  {{{ menu }}}

  <div class='profile-page__content'>
    <input class='profile-page__avatar' type="file" id="avatar" accept="image/*">
    <div class='profile-page__fields' id="change-password">
      {{{ fields }}}
      {{{ button }}}
      {{{ link }}}
    </div>
  </div>
</div>
`;

export default changePasswordTemplate;
