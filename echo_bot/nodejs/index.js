import * as Lark from '@larksuiteoapi/node-sdk';
import { getMovieDialogue, getTianGouContent, getZhaNanContent } from './API/utils.js';

/**
 * 配置应用基础信息和请求域名。
 * App base information and request domain name.
 */
const baseConfig = {
  // 应用的 AppID, 你可以在开发者后台获取。 AppID of the application, you can get it in the developer console.
  appId: process.env.APP_ID, // 'cli_a8d8341d4cba101c', // 
  // 应用的 AppSecret，你可以在开发者后台获取。 AppSecret of the application, you can get it in the developer console.
  appSecret: process.env.APP_SECRET, // 'khtvgD2KONtzyrN8l12DceelcfkXE3Bf', // 
  // 请求域名，如：https://open.feishu.cn。 Request domain name, such as https://open.feishu.cn.
  domain: process.env.BASE_DOMAIN,
};

/**
 * 创建 LarkClient 对象，用于请求OpenAPI, 并创建 LarkWSClient 对象，用于使用长连接接收事件。
 * Create LarkClient object for requesting OpenAPI, and create LarkWSClient object for receiving events using long connection.
 */
const client = new Lark.Client(baseConfig);
const wsClient = new Lark.WSClient(baseConfig);

/**
 * 注册事件处理器。
 * Register event handler.
 */
const eventDispatcher = new Lark.EventDispatcher({}).register({
  /**
   * 注册接收消息事件，处理接收到的消息。
   * Register event handler to handle received messages.
   * https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/events/receive
   */
  'im.message.receive_v1': async (data) => {
    const {
      message: { chat_id, content, mentions, message_type, chat_type },
      sender: { sender_id },
    } = data;

    /**
     * 解析用户发送的消息。
     * Parse the message sent by the user.
     */

    // console.log('data =', JSON.stringify(data));

    let user_open_id = '';
    let user_name = '';
    let atUser = '';

    if (chat_type === 'p2p') {
      // 单聊获取 user
      if (sender_id) {
        user_open_id = sender_id.open_id || '';

        atUser = `<at user_id="${user_open_id}">${user_name}</at>`;
      } 
    } else if (chat_type === 'group') {
      console.log('group data =', JSON.stringify(data));
      console.log('mentions =', mentions);
      // 群聊获取用户open_id
      if(mentions?.length > 0) {
        let user_info_list = mentions?.filter(item => item.name !== "我是工具人");
        console.log('user_info_list =', user_info_list);
        user_open_id = user_info_list.map(item => item?.id?.open_id || '');
        // user_open_id = user_info?.id?.open_id || '';
        // console.log('user_open_id =', user_open_id);
        // user_name = user_info?.name || '';

        atUser = user_info_list?.map(item => `<at user_id="${item?.id?.open_id}">${item?.name}</at>`)?.join(' ');
        console.log('atUser =', atUser);
      }
    }

    // const atUser = `<at user_id="${user_open_id}">${user_name}</at>`;

    // 获取消息主题文本
    let responseText = '';

    try {
      if (message_type === 'text') {
        responseText = JSON.parse(content).text;
      } else {
        responseText = '解析消息失败，请发送文本消息 \nparse message failed, please send text message';
      }
    } catch (error) {
      // 解析消息失败，返回错误信息。 Parse message failed, return error message.
      responseText = '解析消息失败，请发送文本消息 \nparse message failed, please send text message';
    }

    // 调用经典台词API
    const getTaici = () => getMovieDialogue().catch(error => {
      console.error("台词API错误:", error);
      return `获取台词失败`;
    });

    // 调用舔狗日记API
    const getTiangou = () => getTianGouContent().catch(error => {
      console.error("舔狗日记错误:", error);
      return `获取舔狗日记失败`;
    });

    // 调用渣男语录API
    const getZhanan = () => getZhaNanContent().catch(error => {
      console.error("渣男语录错误:", error);
      return `获取渣男语录失败`;
    });

    if (chat_type === 'p2p') {
      /**
       * 使用SDK调用发送消息接口。 Use SDK to call send message interface.
       * https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create
       */
      console.log('responseText =', responseText);

      let contentText = '';
  
      if (responseText.includes('台词')) {
        contentText = await getTaici();
      } else if (responseText.includes('舔一下')) {
        contentText = await getTiangou();
      } else if (responseText.includes('渣一下')) {
        contentText = await getZhanan();
      } else {
        console.log('没输入');
        return;
      }
      
      // 构建消息对象
      const data_message = {
        receive_id: chat_id,
        msg_type: "text",
        content: JSON.stringify({
          text: user_open_id ? `${atUser} ${contentText}` : contentText
          // text: user_open_id ? `<at user_id="${user_open_id}">${user_name}</at> ${contentText}` : contentText
        }),
      };

      await client.im.v1.message.create({
        params: {
          receive_id_type: 'chat_id', // 消息接收者的 ID 类型，设置为会话ID。 ID type of the message receiver, set to chat ID.
        },
        data: data_message,
      });

    } else {
      /**
       * 使用SDK调用回复消息接口。 Use SDK to call send message interface.
       * https://open.feishu.cn/document/server-docs/im-v1/message/reply
       */

      console.log('responseText =', responseText);

      let contentText = '';
  
      if (responseText.includes('台词')) {
        contentText = await getTaici();
      } else if (responseText.includes('舔一下')) {
        contentText = await getTiangou();
      } else if (responseText.includes('渣一下')) {
        contentText = await getZhanan();
        console.log('contentText =', contentText);
      } else {
        console.log('没输入');
        return;
      }

      console.log('group atUser =', `${atUser} ${contentText}`);

      // 构建消息对象
      const data_message = {
        receive_id: user_open_id,
        msg_type: "text",
        content: JSON.stringify({
          text: user_open_id ? `${atUser} ${contentText}` : contentText
          // text: user_open_id ? `<at user_id="${user_open_id}">${user_name}</at> ${contentText}` : contentText
        }),
        // uuid: "a0d69e20-1dd1-458b-k525-dfeca4015204" // 实际使用时需更换
      };
      
      await client.im.v1.message.reply({
        path: {
          message_id: data.message.message_id, // 要回复的消息 ID。 Message ID to reply.
        },
        data: data_message,
      });
      
    }
  },
});

/**
 * 启动长连接，并注册事件处理器。
 * Start long connection and register event handler.
 */
wsClient.start({ eventDispatcher });
