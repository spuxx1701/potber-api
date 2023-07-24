import { PrivateMessageReadResource } from 'src/private-messages/resources/private-message.read.resource';
import { PrivateMessageFolder } from 'src/private-messages/types';
import { HtmlMockDataEntry } from 'test/types';

export const privateMessagesMockData = {
  list: {
    inbound: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  <html>
  
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <link rel='stylesheet' href='/bb/pm/pm.css?20200407' type='text/css'>
    <title>PMs> Eingang</title>
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="expires" content="0" />
  
  <body>
    <table border="0" cellpadding="0" cellspacing="10" class="vat">
  
      <tr>
        <td rowspan="2">&nbsp;</td>
        <td colspan="3" class="w">
          <h1>PMs</h1>
          <h2>Eingang</h2>
          <div class="nav">
            <b>[Aktionen: </b> <a href='?a=5'><img src='/bb/pm/img/write.gif' alt='Verfassen'>&nbsp;Verfassen</a> <b>|</b>
            <a href='?a=7'><img src='/bb/pm/img/settings.gif' alt='Einstellungen/Ordner'>&nbsp;Einstellungen/Ordner</a>
            <b>|</b> <a href='?a=1'><img src='/bb/pm/img/logout.gif' alt='Logout'>&nbsp;Logout</a> <b>|</b> <a
              href='/bb/'><img src='/bb/pm/img/forum.gif' alt='Forum' />&nbsp;Zum Forum</a>
            <b>]</b><br /><b>[Ordner:</b></b> <a href='?a=0&cid=1' class="marked"><img src='/bb/pm/img/folders/folder.gif'
                alt='Eigener Ordner'>&nbsp;Eingang</a><span class="small"> (<b class='imp'>274</b>)</span> <b>|</b> <a
              href='?a=0&cid=2'><img src='/bb/pm/img/folders/folder.gif' alt='Eigener Ordner'>&nbsp;Ausgang</a><span
              class="small"> (<b class=''>9</b>)</span> <b>|</b> <a href='?a=0&cid=3'><img
                src='/bb/pm/img/folders/folder.gif' alt='Eigener Ordner'>&nbsp;System</a><span class="small"> (<b
                class=''>0</b>)</span> <b>]</b><br /><br />
          </div>
        </td>
      </tr>
  
      <tr>
        <td class="w">
          <form action='?a=22&cid=1' method='post' name='f'>
            <small>In diesem Ordner: <b>3</b> (insgesamt <b>3</b>) von insgesamt maximal <b>20000</b>
              Nachrichten.</small><br>
            <table border='0' cellpadding='4' cellspacing='1' class='w'>
              <tr class='b'>
                <td>?</t>
                <td class='icon'>Status</td>
                <td>Betreff</td>
                <td>Absender</td>
                <td>Gesendet</td>
              </tr>
              <tr class="hh"><td align='center'><input type='checkbox' value='1' name='chk_msg_123'></td><td class='icon'><div><img src='/bb/pm/img/msg/message-new.gif' alt='Neue Nachricht' title='Neue Nachricht'></div></td><td class="bold" style='width: 40%'><a href='?a=2&mid=123'>Ungelesene Nachricht</a></td><td class="bold" style='width: 40%'><a href='https://my.mods.de/1268185' target='_blank'>Ameisenfutter</a></td><td class="bold" style='width: 15%'>22:23 8.4.2023</td></tr>
              <tr class="h"><td align='center'><input type='checkbox' value='1' name='chk_msg_456'></td><td class='icon'><div><img src='/bb/pm/img/msg/message.png' alt='Nachricht' title='Nachricht'></div></td><td style='width: 40%'><a href='?a=2&mid=456'>Gelesene Nachricht 1</a></td><td style='width: 40%'><a href='https://my.mods.de/1268185' target='_blank'>Ameisenfutter</a></td><td style='width: 15%'>16:01 31.3.2023</td></tr>
              <tr class="h"><td align='center'><input type='checkbox' value='1' name='chk_msg_789'></td><td class='icon'><div><img src='/bb/pm/img/msg/message.png' alt='Nachricht' title='Nachricht'></div></td><td style='width: 40%'><a href='?a=2&mid=789'>Gelesene Nachricht 2</a></td><td style='width: 40%'><a href='https://my.mods.de/1268185' target='_blank'>Ameisenfutter</a></td><td style='width: 15%'>15:59 31.3.2023</td></tr>
              <tr>
                <td colspan='5' class='b'><a href='#'
                    onClick='for (var i = 0; i < document.f.elements.length; i++) document.f.elements[i].checked ^= 1;'>Alle
                    markieren</a></td>
              </tr>
            </table><br>
            <select name="sel">
              <option value="0">Alle markierten Nachrichten...
              <option value="0">
              <option value="del">Löschen
              <option value="mrd">Als gelesen markieren
              <option value="mur">Als ungelesen markieren
              <option value='2'>Verschieben nach Ausgang
              <option value='3'>Verschieben nach System
            </select>&nbsp; <input type='submit' value='Go &raquo;'><br>
          </form>
          <br>
          <div class='note'>
            Probleme/Bugs/Fragen/Vorschläge/Ideen zum PM-System?
            &lt;
            <script> afa = 'enos'; bbz = 'de'; r6c = 'mods'; document.write('<a href="mailto:' + afa + '@' + r6c + '.' + bbz + '">'); </script>
            <img src='/bb/pm/img/enosmail.gif' valign="top"></a>&gt; [<a href='?a=5&rcpt=28377'>pm</a>]
          </div>
        </td>
        <td style="background-image: url(/bb/pm/img/px-blue.png); background-repeat: repeat-y">
          &nbsp;
        </td>
      </tr>
  
    </table>
  </body>
  
  </html><!--  q -->`,

    outbound: `<body>
    <table border="0" cellpadding="0" cellspacing="10" class="vat">
  
      <tr>
        <td rowspan="2">&nbsp;</td>
        <td colspan="3" class="w">
          <h1>PMs</h1>
          <h2>Ausgang</h2>
        </td>
      </tr>
  
      <tr>
        <td class="w">
          <form action='?a=22&cid=1' method='post' name='f'>
            <small>In diesem Ordner: <b>3</b> (insgesamt <b>3</b>) von insgesamt maximal <b>20000</b>
              Nachrichten.</small><br>
            <table border='0' cellpadding='4' cellspacing='1' class='w'>
              <tr class='b'>
                <td>?</t>
                <td class='icon'>Status</td>
                <td>Betreff</td>
                <td>Absender</td>
                <td>Gesendet</td>
              </tr>
              <tr class="hh"><td align='center'><input type='checkbox' value='1' name='chk_msg_123'></td><td class='icon'><div><img src='/bb/pm/img/msg/message-new.gif' alt='Neue Nachricht' title='Neue Nachricht'></div></td><td class="bold" style='width: 40%'><a href='?a=2&mid=123'>Ungelesene Nachricht</a></td><td class="bold" style='width: 40%'><a href='https://my.mods.de/1268185' target='_blank'>Ameisenfutter</a></td><td class="bold" style='width: 15%'>22:23 8.4.2023</td></tr>
              <tr class="h"><td align='center'><input type='checkbox' value='1' name='chk_msg_456'></td><td class='icon'><div><img src='/bb/pm/img/msg/message.png' alt='Nachricht' title='Nachricht'></div></td><td style='width: 40%'><a href='?a=2&mid=456'>Gelesene Nachricht 1</a></td><td style='width: 40%'><a href='https://my.mods.de/1268185' target='_blank'>Ameisenfutter</a></td><td style='width: 15%'>16:01 31.3.2023</td></tr>
              <tr class="h"><td align='center'><input type='checkbox' value='1' name='chk_msg_789'></td><td class='icon'><div><img src='/bb/pm/img/msg/message.png' alt='Nachricht' title='Nachricht'></div></td><td style='width: 40%'><a href='?a=2&mid=789'>Gelesene Nachricht 2</a></td><td style='width: 40%'><a href='https://my.mods.de/1268185' target='_blank'>Ameisenfutter</a></td><td style='width: 15%'>15:59 31.3.2023</td></tr>
              <tr>
                <td colspan='5' class='b'><a href='#'
                    onClick='for (var i = 0; i < document.f.elements.length; i++) document.f.elements[i].checked ^= 1;'>Alle
                    markieren</a></td>
              </tr>
            </table><br>
          </form>
          <br>
        </td>
      </tr>
  
    </table>
  </body>
  
  </html><!--  q -->`,

    system: `<body>
    <table border="0" cellpadding="0" cellspacing="10" class="vat">
  
      <tr>
        <td rowspan="2">&nbsp;</td>
        <td colspan="3" class="w">
          <h1>PMs</h1>
          <h2>System</h2>
        </td>
      </tr>
  
      <tr>
        <td class="w">
          <form action='?a=22&cid=1' method='post' name='f'>
            <small>In diesem Ordner: <b>3</b> (insgesamt <b>3</b>) von insgesamt maximal <b>20000</b>
              Nachrichten.</small><br>
            <table border='0' cellpadding='4' cellspacing='1' class='w'>
              <tr class='b'>
                <td>?</t>
                <td class='icon'>Status</td>
                <td>Betreff</td>
                <td>Absender</td>
                <td>Gesendet</td>
              </tr>
              <tr class="hh"><td align='center'><input type='checkbox' value='1' name='chk_msg_123'></td><td class='icon'><div><img src='/bb/pm/img/msg/message-new.gif' alt='Neue Nachricht' title='Neue Nachricht'></div></td><td class="bold" style='width: 40%'><a href='?a=2&mid=123'>Ungelesene Nachricht</a></td><td class="bold" style='width: 40%'><a href='https://my.mods.de/1268185' target='_blank'>Ameisenfutter</a></td><td class="bold" style='width: 15%'>22:23 8.4.2023</td></tr>
              <tr class="h"><td align='center'><input type='checkbox' value='1' name='chk_msg_456'></td><td class='icon'><div><img src='/bb/pm/img/msg/message.png' alt='Nachricht' title='Nachricht'></div></td><td style='width: 40%'><a href='?a=2&mid=456'>Gelesene Nachricht 1</a></td><td style='width: 40%'><a href='https://my.mods.de/1268185' target='_blank'>Ameisenfutter</a></td><td style='width: 15%'>16:01 31.3.2023</td></tr>
              <tr class="h"><td align='center'><input type='checkbox' value='1' name='chk_msg_789'></td><td class='icon'><div><img src='/bb/pm/img/msg/message.png' alt='Nachricht' title='Nachricht'></div></td><td style='width: 40%'><a href='?a=2&mid=789'>Gelesene Nachricht 2</a></td><td style='width: 40%'><a href='https://my.mods.de/1268185' target='_blank'>Ameisenfutter</a></td><td style='width: 15%'>15:59 31.3.2023</td></tr>
              <tr>
                <td colspan='5' class='b'><a href='#'
                    onClick='for (var i = 0; i < document.f.elements.length; i++) document.f.elements[i].checked ^= 1;'>Alle
                    markieren</a></td>
              </tr>
            </table><br>
          </form>
          <br>
        </td>
      </tr>
  
    </table>
  </body>
  
  </html><!--  q -->`,

    inboundWithCorruptedMessageListItem: `<body>
  <table border="0" cellpadding="0" cellspacing="10" class="vat">

    <tr>
      <td rowspan="2">&nbsp;</td>
      <td colspan="3" class="w">
        <h1>PMs</h1>
        <h2>System</h2>
      </td>
    </tr>

    <tr>
      <td class="w">
        <form action='?a=22&cid=1' method='post' name='f'>
          <small>In diesem Ordner: <b>3</b> (insgesamt <b>3</b>) von insgesamt maximal <b>20000</b>
            Nachrichten.</small><br>
          <table border='0' cellpadding='4' cellspacing='1' class='w'>
            <tr class='b'>
              <td>?</t>
              <td class='icon'>Status</td>
              <td>Betreff</td>
              <td>Absender</td>
              <td>Gesendet</td>
            </tr>
            <tr class="hh"><td align='center'><input type='checkbox' value='1' name='chk_msg_123'></td><td class='icon'><div><img src='/bb/pm/img/msg/message-new.gif' alt='Neue Nachricht' title='Neue Nachricht'></div></td><td class="bold" style='width: 40%'><a href='CANTPARSETHIS'>Ungelesene Nachricht</a></td><td class="bold" style='width: 40%'><a href='https://my.mods.de/1268185' target='_blank'>Ameisenfutter</a></td><td class="bold" style='width: 15%'>22:23 8.4.2023</td></tr>
            <tr class="h"><td align='center'><input type='checkbox' value='1' name='chk_msg_456'></td><td class='icon'><div><img src='/bb/pm/img/msg/message.png' alt='Nachricht' title='Nachricht'></div></td><td style='width: 40%'><a href='?a=2&mid=456'>Gelesene Nachricht 1</a></td><td style='width: 40%'><a href='https://my.mods.de/1268185' target='_blank'>Ameisenfutter</a></td><td style='width: 15%'>16:01 31.3.2023</td></tr>
            <tr class="h"><td align='center'><input type='checkbox' value='1' name='chk_msg_789'></td><td class='icon'><div><img src='/bb/pm/img/msg/message.png' alt='Nachricht' title='Nachricht'></div></td><td style='width: 40%'><a href='?a=2&mid=789'>Gelesene Nachricht 2</a></td><td style='width: 40%'><a href='https://my.mods.de/1268185' target='_blank'>Ameisenfutter</a></td><td style='width: 15%'>15:59 31.3.2023</td></tr>
            <tr>
              <td colspan='5' class='b'><a href='#'
                  onClick='for (var i = 0; i < document.f.elements.length; i++) document.f.elements[i].checked ^= 1;'>Alle
                  markieren</a></td>
            </tr>
          </table><br>
        </form>
        <br>
      </td>
    </tr>

  </table>
</body>

</html><!--  q -->`,
  },
  single: {
    messages: [
      {
        html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>
      
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
        <link rel='stylesheet' href='/bb/pm/pm.css?20200407' type='text/css'>
        <title>PMs> Nachricht lesen> hello world</title>
          <meta http-equiv="cache-control" content="no-cache" />
        <meta http-equiv="pragma" content="no-cache" />
        <meta http-equiv="expires" content="0" />
      
            <body>
        <table border="0" cellpadding="0" cellspacing="10" class="vat">
      
        <tr>
        <td rowspan="2">&nbsp;</td>
        <td colspan="3" class="w">
          <h1>PMs</h1>
        <h2>Nachricht lesen</h2>
        <div class="nav">
        <b>[Aktionen: </b> <a href='?a=5'><img src='/bb/pm/img/write.gif' alt='Verfassen'>&nbsp;Verfassen</a> <b>|</b> <a href='?a=7'><img src='/bb/pm/img/settings.gif' alt='Einstellungen/Ordner'>&nbsp;Einstellungen/Ordner</a> <b>|</b> <a href='?a=1'><img src='/bb/pm/img/logout.gif' alt='Logout'>&nbsp;Logout</a> <b>|</b> <a href='/bb/'><img src='/bb/pm/img/forum.gif' alt='Forum' />&nbsp;Zum Forum</a> <b>]</b><br/><b>[Ordner:</b></b> <a href='?a=0&cid=1'><img src='/bb/pm/img/folders/folder.gif' alt='Eigener Ordner'>&nbsp;Eingang</a><span class="small"> (<b class=''>284</b>)</span> <b>|</b> <a href='?a=0&cid=2'><img src='/bb/pm/img/folders/folder.gif' alt='Eigener Ordner'>&nbsp;Ausgang</a><span class="small"> (<b class=''>8</b>)</span> <b>|</b> <a href='?a=0&cid=3' class="marked"><img src='/bb/pm/img/folders/folder.gif' alt='Eigener Ordner'>&nbsp;System</a><span class="small"> (<b class=''>2</b>)</span> <b>]</b><br/><br/>	</div>
        </td>
        </tr>
      
        <tr>
        <td class="w">
        <table border='0' cellpadding='4' cellspacing='1' class='w'>
        <tr> <td rowspan='5' align='center' width='120' class='hx vam' style='padding: 4px 4px 4px 4px'><img src='/bb/./avatare/arctic.gif' alt='Avatar' /></td> <td class='h'>Betreff</td> <td class='hh'><b>hello world</td> </tr>
        <tr> <td class='h'>Absender</td> <td class='hh'><b><a href='http://my.mods.de/1342460' target='_blank'>[potber]äöü²</a></b>&nbsp;<span class='small'> (In Kontaktliste <a href='?a=16&uu=1342460'>aufnehmen</a>) (Diesen User <a href='?a=25&ignore=1342460'>ignorieren</a>)</span></td> </tr>
        <tr> <td class='h'>Gesendet</td> <td class='hh'><b>22:23 8.4.2023</td> </tr>
        <tr> <td class='h'>Ordner</td> <td class='hh'><a href='?a=0&cid=3' class='bold'>System</a>&nbsp; <span class='small'>(Verschieben nach...  &raquo;<a href='?a=20&mid=1001566&cid=1'>Eingang</a> &raquo;<a href='?a=20&mid=1001566&cid=2'>Ausgang</a>)</span></td> </tr>
        <tr> <td class='h'>Optionen</td> <td class='hh'><b> <a href='?a=3&mid=1001566'>L&ouml;schen</a>  &middot; <a href='?a=5&reply=1001566'>Antworten</a> &middot; <a href='?a=5&forward=1001566'>Weiterleiten</a> &middot; <a href='?a=22&mid1=1001566&cid=3&sel=mur'>Als ungelesen markieren</a> </b></td> </tr>
        <tr> <td class='b' colspan='2'></td> <td class='b'></td> </tr>
      <tr> <td colspan='3' class='b'>hello ameisenfutter!</td> </tr>  <tr> <td colspan='3' class='h'></td> </tr>
      </table>
        <br>
        <div class='note'>
        Probleme/Bugs/Fragen/Vorschläge/Ideen zum PM-System?
        &lt;<script> afa = 'enos'; bbz='de'; r6c='mods'; document.write('<a href="mailto:'+afa+'@'+r6c+'.'+bbz+'">'); </script><img src='/bb/pm/img/enosmail.gif' valign="top"></a>&gt; [<a href='?a=5&rcpt=28377'>pm</a>]
        </div>
        </td>
          <td style="background-image: url(/bb/pm/img/px-blue.png); background-repeat: repeat-y">
        &nbsp;
        </td>`,
        expected: {
          id: '123',
          title: 'hello world',
          content: 'hello ameisenfutter!',
          unread: false,
          date: '22:23 8.4.2023',
          important: false,
          folder: PrivateMessageFolder.system,
          recipient: undefined,
          sender: {
            id: '1342460',
            name: '[potber]äöü²',
            avatarUrl: 'https://forum.mods.de/bb/avatare/arctic.gif',
          },
        },
      },
      {
        html: `'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>
      
        <tr>
        <td class="w">
        <table border='0' cellpadding='4' cellspacing='1' class='w'>
        <tr>  <td class='h'>Betreff</td> <td class='hh'><b>Hochgeladener CB wurde freigeschaltet</td> </tr>
        <tr> <td class='h'>Absender</td> <td class='hh'><b>System</b>&nbsp;<span class='small'></span></td> </tr>
        <tr> <td class='h'>Gesendet</td> <td class='hh'><b>20:44 23.12.2022</td> </tr>
        <tr> <td class='h'>Ordner</td> <td class='hh'><a href='?a=0&cid=1' class='bold'>Eingang</a>&nbsp; <span class='small'>(Verschieben nach...  &raquo;<a href='?a=20&mid=999065&cid=2'>Ausgang</a> &raquo;<a href='?a=20&mid=999065&cid=3'>System</a>)</span></td> </tr>
        <tr> <td class='h'>Optionen</td> <td class='hh'><b> <a href='?a=3&mid=999065'>L&ouml;schen</a>  &middot; <a href='?a=5&forward=999065'>Weiterleiten</a> &middot; <a href='?a=22&mid1=999065&cid=1&sel=mur'>Als ungelesen markieren</a> </b></td> </tr>
        <tr> <td class='b' ></td> <td class='b'></td> </tr>
        <tr> <td colspan='2' class='important'>Diese Nachricht hat hohe Priorit&auml;t.</td> </tr>
      <tr> <td colspan='2' class='b'>Der CB den du hochgeladen hattest, wurde soeben von einem Admin freigeschaltet.<br />
      <br />
      Du kannst den neuen CB nun in deinem Profil auswählen.<br />
      </td> </tr>  <tr> <td colspan='2' class='h'></td> </tr>
      </table>
        <br>
        <div class='note'>
        Probleme/Bugs/Fragen/Vorschläge/Ideen zum PM-System?
        &lt;<script> afa = 'enos'; bbz='de'; r6c='mods'; document.write('<a href="mailto:'+afa+'@'+r6c+'.'+bbz+'">'); </script><img src='/bb/pm/img/enosmail.gif' valign="top"></a>&gt; [<a href='?a=5&rcpt=28377'>pm</a>]
        </div>
        </td>
          <td style="background-image: url(/bb/pm/img/px-blue.png); background-repeat: repeat-y">
        &nbsp;
        </td>`,
        expected: {
          id: '999065',
          date: '20:44 23.12.2022',
          folder: PrivateMessageFolder.inbound,
          important: true,
          unread: false,
          title: 'Hochgeladener CB wurde freigeschaltet',
          content: `Der CB den du hochgeladen hattest, wurde soeben von einem Admin freigeschaltet.<br />
      <br />
      Du kannst den neuen CB nun in deinem Profil auswählen.<br />
      `,
          recipient: undefined,
          sender: undefined,
        },
      },
      {
        html: `<tr>
        <td class="w">
        <table border='0' cellpadding='4' cellspacing='1' class='w'>
        <tr> <td rowspan='5' align='center' width='120' class='hx vam' style='padding: 4px 4px 4px 4px'><img src='/bb/./avatare/upload/U1268185--small.png' alt='Avatar' /></td> <td class='h'>Betreff</td> <td class='hh'><b>Foo</td> </tr>
        <tr> <td class='h'>Empf&auml;nger</td> <td class='hh'><a href='http://my.mods.de/33690' target='_blank' class='bold'>dantoX</a>&nbsp;</td> </tr>
        <tr> <td class='h'>Gesendet</td> <td class='hh'><b>16:01 7.1.2023</td> </tr>
        <tr> <td class='h'>Ordner</td> <td class='hh'><a href='?a=0&cid=2' class='bold'>Ausgang</a>&nbsp; <span class='small'>(Verschieben nach...  &raquo;<a href='?a=20&mid=999430&cid=1'>Eingang</a> &raquo;<a href='?a=20&mid=999430&cid=3'>System</a>)</span></td> </tr>
        <tr> <td class='h'>Optionen</td> <td class='hh'><b> <a href='?a=3&mid=999430'>L&ouml;schen</a>  &middot; <a href='?a=5&reuse=999430'>Wieder verwenden</a> </b></td> </tr>
        <tr> <td class='b' colspan='2'></td> <td class='b'></td> </tr>
      <tr> <td colspan='3' class='sentcopy'>Dies ist die Kopie einer von dir gesendeten Nachricht.</td> </tr>
      <tr> <td colspan='3' class='b'>Foo bar</td> </tr>  <tr> <td colspan='3' class='h'></td> </tr>
      </table>`,
        expected: {
          id: '999430',
          date: '16:01 7.1.2023',
          title: 'Foo',
          folder: PrivateMessageFolder.outbound,
          recipient: {
            id: '33690',
            name: 'dantoX',
          },
          important: false,
          unread: false,
          content: 'Foo bar',
          sender: undefined,
        },
      },
    ] as HtmlMockDataEntry<PrivateMessageReadResource>[],

    invalidId: `<body>
	<table border="0" cellpadding="0" cellspacing="10" class="vat">

	<tr>
	<td rowspan="2">&nbsp;</td>
	<td colspan="3" class="w">
	  <h1>PMs</h1>
  <h2>Nachricht lesen</h2>
	<div class="nav">
		</div>
	</td>
	</tr>

	<tr>
	<td class="w">
	  <span class="err"><b>Fehler:</b> Falsche ID</span><br>
	<br>
	<div class='note'>
	Probleme/Bugs/Fragen/Vorschläge/Ideen zum PM-System?
	&lt;<script> afa = 'enos'; bbz='de'; r6c='mods'; document.write('<a href="mailto:'+afa+'@'+r6c+'.'+bbz+'">'); </script><img src='/bb/pm/img/enosmail.gif' valign="top"></a>&gt; [<a href='?a=5&rcpt=28377'>pm</a>]
	</div>
	</td>
		<td style="background-image: url(/bb/pm/img/px-blue.png); background-repeat: repeat-y">
	&nbsp;
	</td>`,

    unknownError: `<span class="err"></span>`,
  },
};
