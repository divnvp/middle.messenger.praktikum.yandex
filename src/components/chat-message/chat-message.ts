import './chat-message.scss';

const chatMessageTemplate = `
  <div class='chat-message__header'>
    <div class='chat-message-header'>
    <div class='chat-message-header__user-info'>
      <div class='chat-message-header__avatar'></div>
      <h1 class='chat-message-header__name'>Вадим</h1>
    </div>
  
    <img
      class='chat-message-header__menu-icon'
      src='../../icons/pencil-dots-y-icon.png'
      alt='pencil-dots-y-icon'
    />
  </div>
  </div>

  <div class='chat-message__main'>
    <div class="chat-message__main_bottom">
      {{{ messageItem }}}
    </div>
  </div>

  <div class='chat-message__footer'>
    <div class='chat-message-footer'>
    <img
      class='chat-message-footer__icon'
      src='../../icons/paper-clip-icon.png'
      alt='paper-clip-icon.png'
    />
  
  <div class="chat-message-footer__message-form" id="chat">
    <label class="chat-message-footer__message-label">
      <input
        class='chat-message-footer__message'
        type='text'
        autocomplete='on'
        name='message'
        placeholder="Сообщение"
      />
    </label>
  
    <div class='chat-message-footer__button'>
      {{{ button }}}
    </div>
  </div>
    
  </div>
  </div>
`;

export default chatMessageTemplate;
