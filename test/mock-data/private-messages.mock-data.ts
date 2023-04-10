export const privateMessagesMockData = {
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
              <option value="del">L�schen
              <option value="mrd">Als gelesen markieren
              <option value="mur">Als ungelesen markieren
              <option value='2'>Verschieben nach Ausgang
              <option value='3'>Verschieben nach System
            </select>&nbsp; <input type='submit' value='Go &raquo;'><br>
          </form>
          <br>
          <div class='note'>
            Probleme/Bugs/Fragen/Vorschl�ge/Ideen zum PM-System?
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
};
