const profileDataTemplate = `
<div class='profile-page'>
  {{{ menu }}}

  <div class='profile-page__content'>
    <img class='profile-page__avatar' src='' alt="avatar">
    <div class='profile-page__fields' id="profile-data">
      {{{ fields }}}
      {{{ button }}}
      {{{ link }}}
    </div>
  </div>
</div>
`;

export default profileDataTemplate;
