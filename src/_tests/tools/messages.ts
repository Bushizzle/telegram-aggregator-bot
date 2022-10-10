export const mapMinMsgData = (msg: any[]) =>
  msg.map(msg => ({
    className: msg.className,
    message: {
      message: msg.message.message,
      id: msg.message.id,
      peerId: {
        channelId: msg.message.peerId.channelId,
      },
    },
  }));
