import './chat-item.scss';

const chatItemTemplate = `
<div class='chat-item' onclick="{{this.events.click}}">
  <div class='chat-item__line'></div>
  <div class='chat-item__block'>
    <div class='chat-item__avatar'>
        <div class='avatar'></div>
      </div>
    <div class='col chat-item__message'>
      <div class='chat-item__message'><span class='chat-item__message-name'>{{ name }}</span></div>
      <div class='chat-item__message'><span class='chat-item__message-text'>{{ message }}</span></div>
    </div>

    <div class='col'>
      <div class='chat-item__time'><span class=''>10:00</span></div>
        <div class='full-width flex-end'>
          <div class='chat-item__unread'><span class=''>{{ unread }}</span></div>
        </div>
    </div>
  </div>
</div>
`;

export default chatItemTemplate;
