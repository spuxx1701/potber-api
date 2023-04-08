export const privateMessagesRegex = {
  list: {
    unread: /(?:<tr class="hh">(.*)<\/tr>)/g,
    read: /(?:<tr class="h">(.*)<\/tr>)/g,
    id: /(?:<a href='\?a=2&mid=(\d*)'>)/,
    title: /(?:<a href='\?a=2&mid=\d*'>(.*?)<\/a>)/,
    recipientOrSenderId: /(?:<a href='http:\/\/my.mods.de\/(\d*)')/,
    recipientOrSenderName:
      /(?:<a href='http:\/\/my.mods.de\/\d*' target='_blank'>(.*?)<\/a>)/,
    date: /(?:<td.*?style='width: 15%'>(.*)<\/td>)/,
  },
};
