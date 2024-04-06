const profileDataTemplate = `
<div class='profile-page'>
  {{{ menu }}}

  <div class='profile-page__content'>
  <label class="page-data__avatar">
    <input class='profile-page__avatar' type="file" id="avatar" accept="image/*">
    
   {{#if src}}
    <img src="{{ src }}" alt="" class="profile-data__avatar">
    {{else}}
      <img class='profile-page__avatar' src='' alt="No avatar">
    {{/if}}
  </label>
    <div class='profile-page__fields' id="profile-data">
      {{{ fields }}}
      {{{ button }}}
      {{{ link }}}
    </div>
  </div>
</div>
`;

export default profileDataTemplate;
