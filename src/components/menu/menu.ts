export const menuTemplate = `
<img class="avatar menu__avatar" alt='avatar' src=''>
<div class="menu_el">
  <img class='button-icon__img' src='../../icons/menu-icon.png' alt='Button icon image' />
  <button class='button-icon__button'> Меню </button>
</div>
<div class="menu_el">
  <img class='button-icon__img' src='../../icons/chat-icon.png' alt='Button icon image' page="/messenger" />
  <button class='button-icon__button' page="/messenger"> Все </button>
</div>
<div class="menu_el">
  <img class='button-icon__img' src='../../icons/profile-icon.png' alt='Button icon image' page="/settings" />
  <button class='button-icon__button' page="/settings"> Профиль </button>
</div>
`;

export default menuTemplate;
