import { UserResource } from '../resources/user.resource';

export const userXmlMockData = {
  withoutGroup: `<user id="1100939"><![CDATA[Icefeldt]]></user>`,
  withGroup: `<user id="1341645" group-id="3"><![CDATA[Real_Futti]]></user>`,
};

export interface UserProfileMockDatEntry {
  id: string;
  html: string;
  expected: UserResource;
}

export const userProfileMockData: UserProfileMockDatEntry[] = [
  {
    id: `1268185`,
    html: `'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <!-- UID 1268185 -->
    <!-- P 30 -->
    <!-- L 1 -->
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-15" />
      <title>mods.de Profil: Ameisenfutter</title>
      <link href="/p/lib/css/infobar.css?20200406" rel="stylesheet" type="text/css" />
      <link href="/p/lib/css/profile.css?20210401" rel="stylesheet" type="text/css" />
      <script src="/p/lib/js/profile.js?20200406" type="text/javascript"></script>
      <script src="/p/lib/js/async.js?20200406" type="text/javascript"></script>
      <style type='text/css'>  #gbnav0 { visibility: hidden; }  </style>
    <!-- </head>
    <body> -->
    <div id="content">
    <script type="text/javascript"><!--
      var uid = 1268185;
      var myuid = 0;
    // --></script>
    <table>
    
    <tr class="color2 bar"><td></td><td></td><td></td></tr>
    
    <tr class="color1">
      <td rowspan="5" class="c vam avatar">
        <img src="//forum.mods.de/bb/./avatare/upload/U1268185--small.png" class="avatar" alt="Avatar" /><br/>
        <img alt="*" src="//forum.mods.de/bb/img/rank/links.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/schwarz.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/rechts.gif"/><br/>
        <span class="rang">Spamkaiser</span><br/>
      </td>
      <td class="attrn">Benutzername:</td>
      <td class="attrv">
                  <div class="backlink"><a href="//my.mods.de/Ameisenfutter">my.mods.de/Ameisenfutter</a></div>
        Ameisenfutter	</td>
    </tr><tr class="color2">
      <td class="attrn">Dabei seit:</td>
      <td class="attrv">15.10.2007 19:44 (5691 Tage)</td>
    </tr><tr class="color1">
      <td class="attrn">Zuletzt im Board:</td>
      <td class="attrv">16.05.2023 11:57</td>
    </tr><tr class="color2">
      <td class="attrn">Status:</td>
      <td class="attrv"><span class="online">online</span></td>
    </tr><tr class="color1">
      <td class="attrn">Accountstatus:</td>
      <td class="attrv">aktiv</td>
    </tr>
    
    <tr><td colspan="3" style="padding: 0 0 0 0">
    
    <div class="color2 p">
            
      &raquo; <a href="//forum.mods.de/bb/pm/?a=5&amp;rcpt=1268185">PM schreiben</a><br/>
      &raquo; <a href="javascript:buddyadd(1268185, '8b983382a0a17e6cae0b583ee77c7645');" onclick='return buddyadd_("Ameisenfutter");'>In Freundesliste aufnehmen</a><br/>
      &raquo; <a href="//forum.mods.de/bb/search.php?search_UID=1268185">Beitr�ge im Forum suchen</a><br/>
    </div>
    
    <div class="color3 p linklist">   <a href="#kontakt" onclick="tog('kontakt', this)" onmousedown="tog('kontakt', this)" id="link_kontakt">Kontakt</a>   &middot;  <a href="#gb" onclick="tog('gb', this)" onmousedown="tog('gb', this)" id="link_gb">G�stebuch</a>  </div> <div class='pp color3' id='block_kontakt' style='display:none'>
    <table class="bordered"><tr class="color1"> <td class='attrn'>Wohnort:</td> <td class='attrv'>W&uuml;rzburg </td> </tr>
    </table></div>
    
    <div class='pp color3' id='block_gb' style='display:none'>
          <script type="text/javascript"><!--
          var gboffset = 0;
          var gboffsetmax = 1;
          var gbcnt = 8;
          var gbepp = 5;
          // --></script>
          <table>
            <thead>
                        <tr class="color1 small"><td colspan="2">
                Du musst dich erst einloggen, bevor du selbst G�stebucheintr�ge schreiben kannst.
              </td></tr>
                        <tr class="color1 small" id="gbnavtr">
                <td style="border-right: 0">
                  <span id="gbnav0">&laquo;
                  <a id="gbnav0link" href="#gb_-1" onclick="gbnav(0)">neuere</a>
                  </span>
                </td><td style="border-left: 0; text-align: right">
                  <span id="gbnav1">
                  <a id="gbnav1link" href="#gb_1" onclick="gbnav(1)">�ltere</a> &raquo;
                  </span>
                  <span id="gboffset">(1/2)</span>
                </td>
              </tr>
            </thead>
            <tbody id="gbdata">	<tr class="color2">
        <td class="attrn"><a href='/1223967' class='b'>StrizZ</a>,<br/>20.03.2020 17:57</td>
        <td class="attrv">The 13th Warrior</td>
      </tr>
        <tr class="color1">
        <td class="attrn"><a href='/1265777' class='b'>Dom&amp;#945;kk</a>,<br/>19.11.2011 19:39</td>
        <td class="attrv">/)(\ Brohoof!</td>
      </tr>
        <tr class="color2">
        <td class="attrn"><a href='/63365' class='b'>]Maestro[</a>,<br/>08.10.2011 22:58</td>
        <td class="attrv">ich glaub dein g&auml;stebuch braucht mehr ponys, es hat entschieden zu viel penis, bisher! :D</td>
      </tr>
        <tr class="color1">
        <td class="attrn"><a href='/1241415' class='b'>loliger_rofler</a>,<br/>06.10.2008 17:48</td>
        <td class="attrv">PENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENIS PENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENIS PENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENIS PENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENIS PENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENIS</td>
      </tr>
        <tr class="color2">
        <td class="attrn"><a href='/1241415' class='b'>loliger_rofler</a>,<br/>06.10.2008 17:47</td>
        <td class="attrv">PENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENIS PENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENIS PENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENIS PENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENIS PENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENISPENIS</td>
      </tr>
      </tbody>
          </table></div>
    
    
    <div class="color2 bar"></div>
    
    
    </td></tr>
    </table>
    <script type="text/javascript">/*<![CDATA[*/
    init(); /*]]>*/</script>
    
    </div>
    <div id="authornote">
      &lt; <script type='text/javascript'><!--
    l6056208='mo';l1530841='ds';l9687522='os';l3795225='en';l2536413='de';document.write('<'+'a hr'+'ef=\'ma'+'ilt'+'o:'+l3795225+l9687522+'@'+l6056208+l1530841+'.'+l2536413+'?subject=Erweitertes%20Profil%20'+'\'>'+l3795225+l9687522+'@'+l6056208+l1530841+'.'+l2536413+'</a>');
    // --></script> 2007-2020 &gt;
    </div>
    </body>
    </html>'`,
    expected: {
      id: '1268185',
      name: 'Ameisenfutter',
      rank: 'Spamkaiser',
      avatarUrl: 'https://forum.mods.de/bb/avatare/upload/U1268185--small.png',
      lastLogin: '16.05.2023 11:57',
      activity: 'online',
      status: 'aktiv',
      age: '15.10.2007 19:44 (5691 Tage)',
      locked: false,
    },
  },
  {
    id: '53015',
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <!-- UID 53015 -->
    <!-- P 30 -->
    <!-- L 0 -->
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-15" />
      <title>mods.de Profil: Swot</title>
      <link href="/p/lib/css/infobar.css?20200406" rel="stylesheet" type="text/css" />
      <link href="/p/lib/css/profile.css?20210401" rel="stylesheet" type="text/css" />
      <script src="/p/lib/js/profile.js?20200406" type="text/javascript"></script>
      <script src="/p/lib/js/async.js?20200406" type="text/javascript"></script>
      <!-- </head>
    <body> -->
    <div id="content">
    <script type="text/javascript"><!--
      var uid = 53015;
      var myuid = 1268185;
    // --></script>
    <table>
    
    <tr class="color2 bar"><td></td><td></td><td></td></tr>
    
    <tr class="color1">
      <td rowspan="5" class="c vam avatar">
        <img src="//forum.mods.de/bb/./avatare/swot.gif" class="avatar" alt="Avatar" /><br/>
        <img alt="*" src="//forum.mods.de/bb/img/rank/links.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/rechts.gif"/><br/>
        <span class="rang">Spamk&ouml;nig</span><br/>
      </td>
      <td class="attrn">Benutzername:</td>
      <td class="attrv">
                  <div class="backlink"><a href="//my.mods.de/Swot">my.mods.de/Swot</a></div>
        Swot	</td>
    </tr><tr class="color2">
      <td class="attrn">Dabei seit:</td>
      <td class="attrv">17.02.2002 00:00 (7822 Tage)</td>
    </tr><tr class="color1">
      <td class="attrn">Zuletzt im Board:</td>
      <td class="attrv"><em>privat</em></td>
    </tr><tr class="color2">
      <td class="attrn">Status:</td>
      <td class="attrv">war heute online</td>
    </tr><tr class="color1">
      <td class="attrn">Accountstatus:</td>
      <td class="attrv">aktiv</td>
    </tr>
    
    <tr><td colspan="3" style="padding: 0 0 0 0">
    
    <div class="color2 p">
            
      &raquo; <a href="//forum.mods.de/bb/pm/?a=5&amp;rcpt=53015">PM schreiben</a><br/>
      &raquo; <a href="javascript:buddyadd(53015, '28be9d12863049dd197982896ce7fd0c');" onclick='return buddyadd_("Swot");'>In Freundesliste aufnehmen</a><br/>
      &raquo; <a href="//forum.mods.de/bb/search.php?search_UID=53015">Beiträge im Forum suchen</a><br/>
    </div>
    
    <div class="color3 p linklist">   <a href="#kontakt" onclick="tog('kontakt', this)" onmousedown="tog('kontakt', this)" id="link_kontakt">Kontakt</a>   &middot;  <a href="#ueber" onclick="tog('ueber', this)" onmousedown="tog('ueber', this)" id="link_ueber">über mich</a>   &middot;  <a href="#hw" onclick="tog('hw', this)" onmousedown="tog('hw', this)" id="link_hw">Ausstattung</a>  </div> <div class='pp color3' id='block_kontakt' style='display:none'>
    Keine &ouml;ffentlich sichtbaren Kontaktdaten eingetragen.</div>
    
    <div class='pp color3' id='block_ueber' style='display:none'>
    <table class="bordered"><tr class="color1"> <td class='attrn'>Geburtstag:</td> <td class='attrv'>19. Februar 1987&nbsp; (36) </td> </tr>
    </table></div>
    
    <div class='pp color3' id='block_hw' style='display:none'>
    <table class="bordered"><tr class="color1"> <td class='attrn'>Monitor:</td> <td class='attrv'>TX-55EZW954 </td> </tr>
    <tr class="color2"> <td class='attrn'>Audio:</td> <td class='attrv'>Yamaha RX-V585 </td> </tr>
    <tr class="color1"> <td class='attrn'>Lautsprecher:</td> <td class='attrv'>NuBox 481 / CS-411 / DS301 </td> </tr>
    <tr class="color2"> <td class='attrn'>Notebook:</td> <td class='attrv'>TP X200s mit X25-M </td> </tr>
    <tr class="color1"> <td class='attrn'>Weiterhin:</td> <td class='attrv'>Jede Menge nutzloser Kram </td> </tr>
    </table></div>
    
    
    <div class="color2 bar"></div>
    
    
    </td></tr>
    </table>
    <script type="text/javascript">/*<![CDATA[*/
    init(); /*]]>*/</script>
    
    </div>
    <div id="authornote">
      &lt; <script type='text/javascript'><!--
    l5090147='ds';l4371122='e';l4821732='mo';l9376166='nos';l2569411='de';document.write('<'+'a hr'+'ef=\'ma'+'ilt'+'o:'+l4371122+l9376166+'@'+l4821732+l5090147+'.'+l2569411+'?subject=Erweitertes%20Profil%20%28Ameisenfutter%29'+'\'>'+l4371122+l9376166+'@'+l4821732+l5090147+'.'+l2569411+'</a>');
    // --></script> 2007-2020 &gt;
    </div>
    </body>
    </html>`,
    expected: {
      id: '53015',
      name: 'Swot',
      rank: 'Spamkönig',
      avatarUrl: 'https://forum.mods.de/bb/avatare/swot.gif',
      lastLogin: undefined,
      activity: 'war heute online',
      status: 'aktiv',
      age: '17.02.2002 00:00 (7822 Tage)',
      locked: false,
    },
  },
  {
    id: '1083723',
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <!-- UID 1083723 -->
    <!-- P 30 -->
    <!-- L 0 -->
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-15" />
      <title>mods.de Profil: FooBar</title>
      <link href="/p/lib/css/infobar.css?20200406" rel="stylesheet" type="text/css" />
      <link href="/p/lib/css/profile.css?20210401" rel="stylesheet" type="text/css" />
      <script src="/p/lib/js/profile.js?20200406" type="text/javascript"></script>
      <script src="/p/lib/js/async.js?20200406" type="text/javascript"></script>
      <!-- </head>
    <body> -->
    
    <div id="content">
    <script type="text/javascript"><!--
      var uid = 1083723;
      var myuid = 1268185;
    // --></script>
    <table>
    
    <tr class="color2 bar"><td></td><td></td><td></td></tr>
    
    <tr class="color1">
      <td rowspan="5" class="c vam avatar">
        <img src="//forum.mods.de/bb/./avatare/arctic.gif" class="avatar" alt="Avatar" /><br/>
        <img alt="*" src="//forum.mods.de/bb/img/rank/links.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/hellblau.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/gruen.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/hellblau.gif"/><img alt="*" src="//forum.mods.de/bb/img/rank/rechts.gif"/><br/>
        <span class="rang">Stammhelper</span><br/>
      </td>
      <td class="attrn">Benutzername:</td>
      <td class="attrv">
                  <div class="backlink"><a href="//my.mods.de/FooBar">my.mods.de/FooBar</a></div>
        FooBar	</td>
    </tr><tr class="color2">
      <td class="attrn">Dabei seit:</td>
      <td class="attrv">30.08.2004 19:58 (6896 Tage)</td>
    </tr><tr class="color1">
      <td class="attrn">Zuletzt im Board:</td>
      <td class="attrv"><em>privat</em></td>
    </tr><tr class="color2">
      <td class="attrn">Status:</td>
      <td class="attrv">offline seit über sieben Monaten</td>
    </tr><tr class="color1">
      <td class="attrn">Accountstatus:</td>
      <td class="attrv">aktiv</td>
    </tr>
    
    <tr><td colspan="3" style="padding: 0 0 0 0">
    
    <div class="color2 p">
            
      &raquo; <a href="//forum.mods.de/bb/pm/?a=5&amp;rcpt=1083723">PM schreiben</a><br/>
      &raquo; <a href="javascript:buddyadd(1083723, '01d5b4c0d91ef816c2635b01fa7a865d');" onclick='return buddyadd_("November&amp;nbsp;Rain");'>In Freundesliste aufnehmen</a><br/>
      &raquo; <a href="//forum.mods.de/bb/search.php?search_UID=1083723">Beiträge im Forum suchen</a><br/>
    </div>
    
    <div class="color3 p linklist">   <a href="#kontakt" onclick="tog('kontakt', this)" onmousedown="tog('kontakt', this)" id="link_kontakt">Kontakt</a>   &middot;  <a href="#ueber" onclick="tog('ueber', this)" onmousedown="tog('ueber', this)" id="link_ueber">über mich</a>   &middot;  <a href="#hw" onclick="tog('hw', this)" onmousedown="tog('hw', this)" id="link_hw">Ausstattung</a>  </div> <div class='pp color3' id='block_kontakt' style='display:none'>
    <table class="bordered"><tr class="color1"> <td class='attrn'>ICQ:</td> <td class='attrv'><span class="padr">5818</span><span class="padr">0839</span> <a href='//www.icq.com/people/58180839'><img src='//wwp.icq.com/scripts/online.dll?icq=58180839&amp;img=5' border='0' alt='ICQ'/></a> </td> </tr>
    </table></div>
    
    <div class='pp color3' id='block_ueber' style='display:none'>
    <table class="bordered"><tr class="color1"> <td class='attrn'>Geburtstag:</td> <td class='attrv'>20. Februar 1984&nbsp; (39) </td> </tr>
    </table></div>
    
    <div class='pp color3' id='block_hw' style='display:none'>
    <table class="bordered"><tr class="color1"> <td class='attrn'>Prozessor:</td> <td class='attrv'>Intel Core i7 860 @ 3,8 GHz </td> </tr>
    <tr class="color2"> <td class='attrn'>Arbeitsspeicher:</td> <td class='attrv'>16 GB DDR 3 </td> </tr>
    <tr class="color1"> <td class='attrn'>Mainboard:</td> <td class='attrv'>ASUS P7P55D Evo </td> </tr>
    <tr class="color2"> <td class='attrn'>Festplatte:</td> <td class='attrv'>Samsung SSD 830 - 256 GB </td> </tr>
    <tr class="color1"> <td class='attrn'>Betriebssystem:</td> <td class='attrv'>Windows 8 Pro - 64 Bit </td> </tr>
    <tr class="color2"> <td class='attrn'>Maus:</td> <td class='attrv'>Logitech Performance MX </td> </tr>
    <tr class="color1"> <td class='attrn'>Grafikkarte:</td> <td class='attrv'>Geforce GTX 770 </td> </tr>
    <tr class="color2"> <td class='attrn'>Monitor:</td> <td class='attrv'>Dell U2711 </td> </tr>
    <tr class="color1"> <td class='attrn'>Backup Raid:</td> <td class='attrv'>3x Seagate ST2000DL003 Dauerbetriebsplatten als Raid5 (Onboard Raid) | 2 x  Seagate Barracuda XT 2 TB im Raid1(Onboard) </td> </tr>
    <tr class="color2"> <td class='attrn'>externes Backupmedium:</td> <td class='attrv'>500 GB Samsung F1 per eSATA (Raidsonic iTank Geh&auml;use) </td> </tr>
    <tr class="color1"> <td class='attrn'>Geh&auml;use:</td> <td class='attrv'>Coolermaster ATCS 840 </td> </tr>
    <tr class="color2"> <td class='attrn'>Monitor 2:</td> <td class='attrv'>HP W2408 </td> </tr>
    <tr class="color1"> <td class='attrn'>Netzteil:</td> <td class='attrv'>Seasonic M12II-620Bronze 620W ATX 2.2 </td> </tr>
    <tr class="color2"> <td class='attrn'>Notebook:</td> <td class='attrv'>Dell Latitude E7240 (Work) </td> </tr>
    <tr class="color1"> <td class='attrn'>Soundkarte:</td> <td class='attrv'>Asus Xonar HDAV 1,3 Deluxe </td> </tr>
    </table></div>
    
    
    <div class="color2 bar"></div>
    
    
    </td></tr>
    </table>
    <script type="text/javascript">/*<![CDATA[*/
    init(); /*]]>*/</script>
    
    </div>
    <div id="authornote">
      &lt; <script type='text/javascript'><!--
    l3506204='m';l1968608='ods';l535847='eno';l8282074='s';l2205800='de';document.write('<'+'a hr'+'ef=\'ma'+'ilt'+'o:'+l535847+l8282074+'@'+l3506204+l1968608+'.'+l2205800+'?subject=Erweitertes%20Profil%20%28Ameisenfutter%29'+'\'>'+l535847+l8282074+'@'+l3506204+l1968608+'.'+l2205800+'</a>');
    // --></script> 2007-2020 &gt;
    </div>
    </body>
    </html>`,
    expected: {
      id: '1083723',
      name: 'FooBar',
      rank: 'Stammhelper',
      avatarUrl: 'https://forum.mods.de/bb/avatare/arctic.gif',
      lastLogin: undefined,
      activity: 'offline seit über sieben Monaten',
      status: 'aktiv',
      age: '30.08.2004 19:58 (6896 Tage)',
      locked: false,
    },
  },
];
