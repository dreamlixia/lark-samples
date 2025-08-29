# 回声机器人

开发文档：https://open.feishu.cn/document/uAjLw4CM/uMzNwEjLzcDMx4yM3ATM/develop-an-echo-bot/introduction

## 效果

![](./assets/image.png)

- 用户输入纯文本消息，机器人回复：收到你发送的消息：XXXX。
- 用户在群组内 @机器人并发送纯文本消息，机器人引用这条消息并回复：收到你发送的消息：XXXX。

## 启动项目

macOS/Linux： `APP_ID=<app_id> APP_SECRET=<app_secret> ./bootstrap.sh`

Windows： `set APP_ID=<app_id>&set APP_SECRET=<app_secret>&bootstrap.bat`



# 我是工具人启动命令

```
@dreamlixia ➜ /workspaces/lark-samples (main) $

(cd echo_bot/nodejs && BASE_DOMAIN=https://open.larkoffice.com APP_ID=cli_a8d8341d4cba101c APP_SECRET=khtvgD2KONtzyrN8l12DceelcfkXE3Bf  ./bootstrap.sh)
```

# 我是工具人代码位置

```
echo_bot/nodejs/index.js
```

# 工具地址：
https://open.larkoffice.com/app/cli_a8d8341d4cba101c/baseinfo