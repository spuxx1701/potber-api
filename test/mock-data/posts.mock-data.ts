import { PostQuoteResource } from 'src/posts/resources/post.quote.resource';
import { HtmlMockDataEntry } from 'test/types';

export const postsMockData = {
  quote: {
    html: `'<html>
    <div align='center'>
    
      <table class='std'><tr><td>
    
        <a href='index.php'><img src='img/head//banner-mde.jpeg' border='0' alt='Zur Übersichtsseite' /></a>
    
      </td><td align='right' width='1%' nowrap='nowrap'>
        <div align='center'>
            <br /><div align='center'>Willkommen <b><a href='//my.mods.de/1268185' target='_blank' onclick='openProfile3("//my.mods.de/1268185");return false'>Ameisenfutter</a>!</b></div>
    <br /><a href='pm/' target='_blank'><b>PM-System</b></a><br />    </div>
      </td></tr></table>
    
      
    
      <div class='std color1 navbar'>
        <table class='w'><tr>
          <td>&nbsp;<a href='index.php'>mods.de - Forum</a>&nbsp;<b><font color='#898989'>&raquo;</font></b>&nbsp;<a href='board.php?BID=14'>Public Offtopic</a>&nbsp;<b><font color='#898989'>&raquo;</font></b>&nbsp;<a href='thread.php?TID=219289' class='invisible wht'>potber</a></td>
          <td align='right' ><a href='search.php'>Suche</a> <span class='separator'>|</span> <a href='/benderarchiv'>Benderarchiv</a> <span class='separator'>|</span> <a href='//login.mods.de/logout/?&UID=1268185&a=5ECR&redirect=https%3A%2F%2Fforum.mods.de%2Fbb%2Fnewreply.php%3FPID%3D1249813756'>Logout</a> <span class='separator'>|</span> <a href='./profile.php?UID=1268185&edit=1'>Profil&nbsp;bearbeiten</a>&nbsp;&nbsp;</td>
        </tr></table>
      </div>
    
    </div>
    <!-- header parsing ended --><div align='center'>
        <table border='0' cellpadding='0' cellspacing='0' width='95%'>
    
        <tr>
          <td colspan='2' class='color1'>&nbsp;Moderiert von: <a href='//my.mods.de/1157313' target='_blank' onclick='openProfile3("//my.mods.de/1157313");return false'>Irdorath</a>, <a href='//my.mods.de/27923' target='_blank' onclick='openProfile3("//my.mods.de/27923");return false'>statixx</a>, <a href='//my.mods.de/1279561' target='_blank' onclick='openProfile3("//my.mods.de/1279561");return false'>Teh Wizard of Aiz</a></td>
        </tr>
    
        <tr><td colspan='2'><br/></td></tr>
    
    <form name='newreply' action='newreply.php' method='post'
          id='f1'
          onsubmit='document.getElementById("post_submit").onclick = function(){return false};' >
    <input type='hidden' name='SID' value='' />
    <input type='hidden' name='TID' value='219289' />
    <input type='hidden' name='PID' value='1249813756' />
    <input type='hidden' name='token' value='a4d193bbc651b777d46232881a19bdd8' />
    
        <tr>
            <td bgColor='#000000'>
    <table border='0' cellpadding='2' cellspacing='1' width='100%'>
    <!-- <tr bgcolor='#07141C'>
      <td width='25%' align='right'><b>Eingeloggt als:</b></td>
      <td width='75%'><a href='//my.mods.de/1268185' target='_blank' onclick='openProfile3("//my.mods.de/1268185");return false'>Ameisenfutter</a> [<a href='misc.php?action=logout'>logout</a>]</td>
    </tr> -->
      <tr class='color3b'>
        <td width='25%' align='right'><b>Post Titel:</b></td>
        <td width='75%'><input type='text' class='bordered' name='post_title' id='pstt' value='' style='width: 250px' maxlength='50' /></td>
      </tr>
      <tr class='color3'>
        <td width='25%' align='right'><b>Post Icon:</b></td>
        <td width='75%'><table border=0 cellpadding=1 cellspacing=1>
    <tr>
      <td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='32' id='newreply_icon_32' /></td>
      <td><label for='newreply_icon_32'><img src='./img/icons/icon2.gif' alt='zunge' border=0 /></label></td>
      </tr></table>
    </td><td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='40' id='newreply_icon_40' /></td>
      <td><label for='newreply_icon_40'><img src='./img/icons/icon11.gif' alt='würg' border=0 /></label></td>
      </tr></table>
    </td><td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='34' id='newreply_icon_34' /></td>
      <td><label for='newreply_icon_34'><img src='./img/icons/icon4.gif' alt='verschmitzt' border=0 /></label></td>
      </tr></table>
    </td><td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='33' id='newreply_icon_33' /></td>
      <td><label for='newreply_icon_33'><img src='./img/icons/icon3.gif' alt='unglaeubig' border=0 /></label></td>
      </tr></table>
    </td><td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='41' id='newreply_icon_41' /></td>
      <td><label for='newreply_icon_41'><img src='./img/icons/icon12.gif' alt='traurig' border=0 /></label></td>
      </tr></table>
    </td><td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='2' id='newreply_icon_2' /></td>
      <td><label for='newreply_icon_2'><img src='./img/icons/thumbsup.gif' alt='Thumbs Up' border=0 /></label></td>
      </tr></table>
    </td><td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='1' id='newreply_icon_1' /></td>
      <td><label for='newreply_icon_1'><img src='./img/icons/thumbsdown.gif' alt='Thumbs down' border=0 /></label></td>
      </tr></table>
    </td><td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='54' id='newreply_icon_54' /></td>
      <td><label for='newreply_icon_54'><img src='./img/icons/pfeil.gif' alt='Pfeil' border=0 /></label></td>
      </tr></table>
    </td>
    </tr><tr>
      <td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='38' id='newreply_icon_38' /></td>
      <td><label for='newreply_icon_38'><img src='./img/icons/icon8.gif' alt='missmutig' border=0 /></label></td>
      </tr></table>
    </td><td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='35' id='newreply_icon_35' /></td>
      <td><label for='newreply_icon_35'><img src='./img/icons/icon5.gif' alt='froehlich' border=0 /></label></td>
      </tr></table>
    </td><td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='28' id='newreply_icon_28' /></td>
      <td><label for='newreply_icon_28'><img src='./img/icons/icon9.gif' alt='Fragezeichen' border=0 /></label></td>
      </tr></table>
    </td><td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='42' id='newreply_icon_42' /></td>
      <td><label for='newreply_icon_42'><img src='./img/icons/icon13.gif' alt='böse' border=0 /></label></td>
      </tr></table>
    </td><td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='36' id='newreply_icon_36' /></td>
      <td><label for='newreply_icon_36'><img src='./img/icons/icon6.gif' alt='betruebt' border=0 /></label></td>
      </tr></table>
    </td><td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='39' id='newreply_icon_39' /></td>
      <td><label for='newreply_icon_39'><img src='./img/icons/icon10.gif' alt='Ausrufezeichen' border=0 /></label></td>
      </tr></table>
    </td><td>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'><tr>
      <td><input type='radio' name='post_icon' value='37' id='newreply_icon_37' /></td>
      <td><label for='newreply_icon_37'><img src='./img/icons/icon7.gif' alt='amuesiert' border=0 /></label></td>
      </tr></table>
    </td>
    </tr>
    <tr><td colspan=8>
      <table border=0 cellpadding=2 cellspacing=0 width='100%'>
    <tr><td><label><input type='radio' name='post_icon' value='0' CHECKED /> Kein Icon</label></td></tr>
      </table>
    </td></tr>
    </table></td>
      </tr>
      <tr class='color3b'>
        <td width='25%' align='right'>&nbsp;</td>
        <td width='75%'>
    <img src='./img/buttons/fett.gif' title='Fett' onClick="addCode('[b]', '[/b]', document.newreply)"/>
    <img src='./img/buttons/u.gif' title='Unterstreichen' onClick="addCode('[u]', '[/u]', document.newreply)"/>
    <img src='./img/buttons/code.gif' title='Code einfügen' onClick="addCode('[code]', '[/code]', document.newreply)" />
    <img src='./img/buttons/kursiv.gif' title='Kursiv' onClick="addCode('[i]', '[/i]', document.newreply)"/>
    <img src='./img/buttons/s.gif' title='Durchstreichen' onClick="addCode('[s]', '[/s]', document.newreply)"/>
    <img src='./img/buttons/img.gif' title='Bild einfügen' onClick="makeImage(document.newreply)" />
    <img src='./img/buttons/video.gif' title='Video einfügen' onClick="makeVideo(document.newreply)" />
    <img src='./img/buttons/url.gif' title='Link mit Text' onClick="makeNamedLink(document.newreply)" />
    <img src='./img/buttons/url2.gif' title='Link einfügen' onClick="makeLink(document.newreply)" />
    <img src='./img/buttons/list.gif' title='Liste einfügen' onClick="addToList(document.newreply)" />
    <img src='./img/buttons/smilies.gif' title='Smilie einfügen' onClick="window.open('misc.php?view=smilies&window=1', 'smilieWindow', 'width=300, height=400, status=no, toolbar=no, menubar=no, location=no, directories=no, resizeable=no, scrollbars=yes')" />
    <!-- <img src='./img/buttons/quote.gif' title='Quote' onClick="window.open('newreply.php?view=quotes&TID=219289&fieldname=message&formname=newreply&SID=', 'quoteWindow', 'width=200, height=350, status=no, toolbar=no, menubar=no, location=no, directories=no, resizeable=no, scrollbars=no')" /> -->
    <img src='./img/buttons/quote.gif' title='Quote' onClick="addCode('[quote]', '[/quote]', document.newreply)" />
    <img src='./img/buttons/spoiler.gif' title='Spoiler-Warnung für diesen Text einfügen' onClick="addCode('[spoiler]', '[/spoiler]', document.newreply)"/>
    </td>
      </tr>
      <tr class='color3'>
        <td width='25%' align='right' vAlign='top'>
    <table border=0 cellpadding=0 cellspacing=0 width='100%'>
    <tr><td vAlign='top'>
    HTML ist deaktiviert<br />
    BBCode ist aktiviert<br />
    IMG Code ist aktiviert<br />
    Smilies sind aktiviert<br />
    </td><td vAlign='top' align='right'>
    <b>Text:</b></td></tr></table></td>
        <td width='75%'><textarea name='message' id='pstmsg' style='width:500px; height:250px'
         onKeyPress='if(this.value.length >= 15000)return false;'>[quote=219289,1249813756,&quot;Ameisenfutter&quot;][b]
    Ein Beispiel:
    
    [url]https://i.imgur.com/JCugWvem.png[/url]
    [/b][/quote]
    </textarea></td>
      </tr>
      <script type='text/javascript'><!--
        document.getElementById('pstmsg').focus();
      // --></script>
    
      <tr class='color3b'>
        <td width='25%'><b></b></td>
        <td width='75%'>
         <label><input type='checkbox' name='post_converturls' value='1' CHECKED /> [URL] Tags Automatisch einfügen?</label><br />
         <label><input type='checkbox' name='post_disablebbcode' value='1'  /> BBCode deaktivieren?</label><br />
         <label><input type='checkbox' name='post_disablesmilies' value='1'  /> Smilies deaktivieren?</label><br />
         
    </td>
      </tr>
      <tr class='color3'>
        <td width='25%' align='right'><b>&nbsp;</b></td>
        <td width='75%'>
          <input type='submit' name='submit' value='Eintragen' style='width: 150px' accesskey='s' id='post_submit' />
          <input type='submit' name='preview' value='Preview' style='width: 150px' />
        </td>
      </tr>
    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr></form>
        </table>
    <table width='95%' cellpadding=0 cellspacing=0 border=0>
    <tr><td bgcolor='#000000'>
    <table border=0 cellpadding=1 cellspacing=1 width='100%'>
    <tr bgColor='#091827'>
      <td width='15%'><b>Benutzer</b></td>
      <td width='85%'><b>Beitrag</b></td>
    </tr>
    <tr bgcolor=#222E3A>
      <td vAlign='top'><a href='//my.mods.de/1268185' target='_blank' onclick='openProfile3("//my.mods.de/1268185");return false'>Ameisenfutter</a> 24.07.2023 14:02</td>
      <td vAlign='top'><table bordercolor='#000000' border='0' cellpadding='0' cellspacing='0' width='100%'> <tr><td width='10%'>&nbsp;</td><td bgcolor='#666666'><table bordercolor='#000000' border='0' cellpadding='4' cellspacing='1' width='100%'> <tr bgColor='#21354C' style='color: #FFFFFF'><td class='quote'><a href='thread.php?TID=219289&PID=1249967542#reply_1249967542'>Zitat</a> von cardex<br/><b><br />
    Burger Menü nach unten links und Titel kleiner oder sogar ganz entfallen lassen?<br />
    </b></td></tr></table></td></tr></table><br /><br />
    Und der Titel + Seitenzahl? Und wie soll man ohne Burgermenu die Sidebar öffnen? <img src='img/smilies/biggrin.gif' alt='Breites Grinsen' align='abscenter' /></td>
    </tr><tr bgcolor=#394E63>
      <td vAlign='top'><a href='//my.mods.de/74373' target='_blank' onclick='openProfile3("//my.mods.de/74373");return false'>Oli</a> 24.07.2023 13:52</td>
      <td vAlign='top'>Custom css erlauben, so wie potdroid.</td>
    </tr><tr bgcolor=#222E3A>
      <td vAlign='top'><a href='//my.mods.de/30246' target='_blank' onclick='openProfile3("//my.mods.de/30246");return false'>cardex</a> 24.07.2023 13:07</td>
      <td vAlign='top'>Burger Menü nach unten links und Titel kleiner oder sogar ganz entfallen lassen?</td>
    </tr><tr bgcolor=#394E63>
      <td vAlign='top'><a href='//my.mods.de/1268185' target='_blank' onclick='openProfile3("//my.mods.de/1268185");return false'>Ameisenfutter</a> 24.07.2023 13:04</td>
      <td vAlign='top'>Ich wüsste nicht, wie (ohne, dass eine der beiden Leisten völlig explodiert). :/<br />
    <br />
    <img src="https://i.imgur.com/wOzK4pQl.png" class="p"/><br />
    <br />
    Wenn ein UI-Designer sich motiviert fühlt, ein UI-Konzept für potber zu entwerfen, nur zu. <img src='img/smilies/biggrin.gif' alt='Breites Grinsen' align='abscenter' /></td>
    </tr><tr bgcolor=#222E3A>
      <td vAlign='top'><a href='//my.mods.de/30246' target='_blank' onclick='openProfile3("//my.mods.de/30246");return false'>cardex</a> 24.07.2023 12:49</td>
      <td vAlign='top'>Bekommst du evtl. die obere Leiste noch nach unten integriert? Ich finde es geht etwas zuviel Fläche für die Menüleisten oben und unten drauf.</td>
    </tr><tr bgcolor=#394E63>
      <td vAlign='top'><a href='//my.mods.de/5652' target='_blank' onclick='openProfile3("//my.mods.de/5652");return false'>Atomsk</a> 22.07.2023 17:00</td>
      <td vAlign='top'>jup, tut <img src="https://forum.mods.de/bb/img/icons/thumbsup.gif" class="p"/></td>
    </tr><tr bgcolor=#222E3A>
      <td vAlign='top'><a href='//my.mods.de/1268185' target='_blank' onclick='openProfile3("//my.mods.de/1268185");return false'>Ameisenfutter</a> 22.07.2023 16:46</td>
      <td vAlign='top'>Mich würde ja jetzt schon brennend interessieren ob der Login bei Atomsk nun klappt. <img src='img/smilies/biggrin.gif' alt='Breites Grinsen' align='abscenter' /></td>
    </tr><tr bgcolor=#394E63>
      <td vAlign='top'><a href='//my.mods.de/485' target='_blank' onclick='openProfile3("//my.mods.de/485");return false'>[KDO2412]Mr.Jones</a> 22.07.2023 13:17</td>
      <td vAlign='top'>Mein Master Password ist natürlich im Bitwarden gespeichert, für alle Fälle!<br />
    <br />
    ...<br />
    <br />
    Also im Bitwarden meiner Frau.</td>
    </tr><tr bgcolor=#222E3A>
      <td vAlign='top'><a href='//my.mods.de/27923' target='_blank' onclick='openProfile3("//my.mods.de/27923");return false'>statixx</a> 22.07.2023 11:58</td>
      <td vAlign='top'>Naja, gegen den Angriffsvektor hilft wenig. Ich hab meine Keepass-dbs auf github, da kanns ruhig ein wenig länger sein. <img src='img/smilies/biggrin.gif' alt='Breites Grinsen' align='abscenter' /></td>
    </tr><tr bgcolor=#394E63>
      <td vAlign='top'><a href='//my.mods.de/1157313' target='_blank' onclick='openProfile3("//my.mods.de/1157313");return false'>Irdorath</a> 22.07.2023 11:57</td>
      <td vAlign='top'>Hauptsache ihr kriegt den Key noch zusammen wenn die Rohrzange fällt</td>
    </tr><tr bgcolor=#222E3A>
      <td vAlign='top'><a href='//my.mods.de/27923' target='_blank' onclick='openProfile3("//my.mods.de/27923");return false'>statixx</a> 22.07.2023 11:54</td>
      <td vAlign='top'>Hab nen Satz mit null Sinn aber guter Merkbarkeit und nem Teil random-crap mit drin, insgesamt um die 40 Stellen oder so. Und Argon2 mit gut 1GB Speicherbedarf als KDF. Trage gern Aluhut, sollte trotzdem reichen. Auf dem Handy nutz ich allerdings quickunlock per pin, sonst wirste ja bekloppt.</td>
    </tr><tr bgcolor=#394E63>
      <td vAlign='top'><a href='//my.mods.de/5652' target='_blank' onclick='openProfile3("//my.mods.de/5652");return false'>Atomsk</a> 22.07.2023 11:52</td>
      <td vAlign='top'><table bordercolor='#000000' border='0' cellpadding='0' cellspacing='0' width='100%'> <tr><td width='10%'>&nbsp;</td><td bgcolor='#666666'><table bordercolor='#000000' border='0' cellpadding='4' cellspacing='1' width='100%'> <tr bgColor='#21354C' style='color: #FFFFFF'><td class='quote'><a href='thread.php?TID=219289&PID=1249966293#reply_1249966293'>Zitat</a> von Kane*<br/><b><br />
    wie lang ist euer MasterPW?</b></td></tr></table></td></tr></table><br /><br />
    <br />
    14 stellen - und ein hardware token (yubiukey) ist erforderlich.</td>
    </tr><tr bgcolor=#222E3A>
      <td vAlign='top'><a href='//my.mods.de/32066' target='_blank' onclick='openProfile3("//my.mods.de/32066");return false'>Kane*</a> 22.07.2023 11:49</td>
      <td vAlign='top'>Das Thema driftet etwas ab&#8230; <img src='img/smilies/biggrin.gif' alt='Breites Grinsen' align='abscenter' /> trotzdem noch eine Frage: wie lang ist euer MasterPW? Um das kommt man ja nich rum&#8230; passphrase? Klar am Telefon gibt&#8217;s FaceID aber das BitWarden PW muss man ja doch präsent haben.<br />
    <br />
    In any case: ich mach da schon lange mit rum und nehm das jetzt mal ernsthaft in Angriff inkl. premium.</td>
    </tr><tr bgcolor=#394E63>
      <td vAlign='top'><a href='//my.mods.de/3182' target='_blank' onclick='openProfile3("//my.mods.de/3182");return false'>[DtS]theSameButcher</a> 22.07.2023 11:47</td>
      <td vAlign='top'>Masterpasswort im versiegelten Brief sicher hinterlegen.</td>
    </tr><tr bgcolor=#222E3A>
      <td vAlign='top'><a href='//my.mods.de/1268185' target='_blank' onclick='openProfile3("//my.mods.de/1268185");return false'>Ameisenfutter</a> 22.07.2023 11:41</td>
      <td vAlign='top'>Gibt's, ist auch sicher sinnvoll. Nennt sich <a href='https://bitwarden.com/help/emergency-access/' target='_blank' rel='noreferrer noopener'>Notfallzugriff</a>.<br />
    <br />
    <s>/ Braucht zum Einrichten Premium, kann man dann aber wieder canceln wenn es einem das Geld nicht wert ist und die Zugriffe bleiben wohl dennoch erhalten.</s> Gilt wohl nur, wenn die Zahlung scheitert. Braucht also Premium.</td>
    </tr>
    </table>
    </td></tr>
    </table></div><!-- FOOTER -->
    <div class='w' align='center'>
    <table class='w1'><tr>
    
    <td style='width: 33%'></td>
    <td style='width: 33%; text-align: center'>
      <b>
                    <script type='text/javascript'><!--
    l11140='de';l41231='bb';l34896='mdeforum';document.write('<'+'a href="ma'+'ilt'+'o:'+l41231+'@'+l34896+'.'+l11140+''+'">'+'contact'+"</"+"a>");// --></script>                | <a href='tech.php'>tech</a>
                    | <a href='thread.php?TID=217799'>impressum</a>
      </b><br/>
      <br/>
    
      <div class='copyright' align='center'>
    
        Powered by bB
        <font color='#BCCACF'><a href='http://www.klined.de?ref=forum.mods.de%2Fbb%2Fnewreply.php'>[blueBoard]</a></font>
    <!--		1.0 'peach'<br/> -->
        1.0e5 'grapefruit'<br/>
    
        &copy; <a href='mailto:&#98;&#108;&#117;&#101;&#98;&#111;&#97;&#114;&#100;&#64;&#107;&#108;&#105;&#110;&#101;&#100;&#46;&#100;&#101;'>Tim Ebbinghaus</a>
        2001-2023<br/>
    
        modified/enhanced by <script type='text/javascript'><!--
    l31807='mdeforum';l398='enos';l34207='de';document.write('<'+'a href="ma'+'ilt'+'o:'+l398+'@'+l31807+'.'+l34207+''+'">'+'enos'+"</"+"a>");// --></script>,
        2004-2020
        <br/>
    
        <br/>
        Rendertime: 0.0383 <br/>
    <!--
    Whole CPU time: 0.012014
    Queries Used: 
    Swaps: 0
    Page Faults: 8
    User Time (sec): 79
    User Time (usec): 571406
    Memory: 1194.7578125 KB
    Profiler statistics for "default":
      Started at:     1690200327.9447 Seconds
      Stopped at:     1690200327.9831 Seconds
      Execution Time: 0.038324117660522 Seconds
    -->
      </div><br/>
    </td>
    <td style='width: 33%; text-align: right'>
    </td>
    
    </tr></table>
    </div>
    
    </body>
    </html>
    '`,
    expected: {
      message: `[quote=219289,1249813756,\"Ameisenfutter\"][b]
    Ein Beispiel:
    
    [url]https://i.imgur.com/JCugWvem.png[/url]
    [/b][/quote]
    `,
    },
  } as HtmlMockDataEntry<PostQuoteResource>,
};
