export const privateMessagesRegex = {
  list: {
    rowUnread: /(?:<tr class="hh">(.*)<\/tr>)/g,
    rowRead: /(?:<tr class="h">(.*)<\/tr>)/g,
    id: /(?:<a href='\?a=2&mid=(\d*)'>)/,
    title: /(?:<a href='\?a=2&mid=\d*'>(.*?)<\/a>)/,
    recipientOrSenderId: /(?:<a href='http:\/\/my.mods.de\/(\d*)')/,
    recipientOrSenderName:
      /(?:<a href='http:\/\/my.mods.de\/\d*' target='_blank'>(.*?)<\/a>)/,
    date: /(?:<td.*?style='width: 15%'>(.*)<\/td>)/,
    important: /alt='(Wichtige\sNachricht|Neue\swichtige\sNachricht)'/,
    unread: /alt='(Neue\sNachricht|Neue\swichtige\sNachricht)'/,
  },
  message: {
    error: /<span\sclass="err">/,
    wrongId: /Falsche\sID/,
    senderId: /(?=Absender.*?my.mods.de\/(.*?)\')/,
    senderName: /(?=Absender.*?target='_blank'>(.*?)<\/a>)/,
    senderAvatarUrl: /<img\ssrc='(.*)'\salt='Avatar'/,
    date: /(?=Gesendet.*?<b>(.*?)<\/td>)/,
    title: /(?=Betreff.*?<b>(.*?)<\/td>)/,
    folder: /(?=Ordner.*?class='bold'>(.*?)<\/a>)/,
    content: /(?:(?:colspan='\d'\sclass='b')>([\s|\S]*?)<\/td>)/s,
    important: /class='important'/,
    unread: /class='unread'/,
  },
};
