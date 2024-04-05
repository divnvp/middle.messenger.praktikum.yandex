import './chat-items-panel.scss';
// import store, { StoreEvents } from '@/shared/storage/store';
import { Block } from '@/shared/utils/block';
import { ChatController } from '@/shared/controllers/chat.controller';
import { ChatItem } from '@/components/chat-item';
import { IChat } from '@/shared/models/chat.interface';

const chatController = new ChatController();
await chatController.init();

export class ChatItemsPanel extends Block {
  constructor() {
    super('div', {
      chats: chatController.getChatsFromStore()?.map(
        chat =>
          new ChatItem('div', {
            name: (chat as IChat).title,
            unread: (chat as IChat).unread_count,
            message: (chat as IChat).last_message ?? ''
          })
      )
    });
    //
    // store.on(StoreEvents.Updated, () => {
    //   this.setProps(
    //     (store.getState().chats = chatController.getChatsFromStore()?.map(
    //       chat =>
    //         new ChatItem('div', {
    //           name: (chat as IChat).title,
    //           unread: (chat as IChat).unread_count,
    //           message: (chat as IChat).last_message ?? ''
    //         })
    //     ))
    //   );
    // });
  }

  override render() {
    return this.compile(chatItemTemplate);
  }
}

const chatItemTemplate = `
  {{{ chats }}}
`;
