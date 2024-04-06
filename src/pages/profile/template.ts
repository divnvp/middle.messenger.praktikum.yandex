const profileTemplate = `
{{{ menu }}}

<div class='profile-page__content'>
  <label class="page-data__avatar">
    <img src="{{ src }}" alt="avatar" class="profile-data__avatar">
  </label>
  <div class='profile-page__fields'>
    {{{ fields }}}
  </div>
  
  {{{ links }}}
</div>
`;

export default profileTemplate;
