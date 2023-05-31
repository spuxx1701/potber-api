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
  message: {
    senderId: /(?=Absender.*?my.mods.de\/(.*?)\')/,
    senderName: /(?=Absender.*?target='_blank'>(.*?)<\/a>)/,
    date: /(?=Gesendet.*?<b>(.*?)<\/td>)/,
    title: /(?=Betreff.*?<b>(.*?)<\/td>)/,
    folder: /(?=Ordner.*?class='bold'>(.*?)<\/a>)/,
    content:
      /(?:<td\s(?:colspan='3'|class='b')\s(?:colspan='3'|class='b')>(.*?)<\/td>)/s,
  },
};
