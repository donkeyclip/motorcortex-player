import { HTMLClip, CSSEffect } from "@donkeyclip/motorcortex";
import Player from "../src/";

const css = `
div[data-motorocortex-container]{
  background:white;
}
.test{
  color:black !important;
  width:100%;
  position:absolute;
  width:200px;
  height:100px;
  left:0px;
  top:0px;
  color:red;
  margin:auto;
  font-size:20px;
}
`;

const html = `
<div>
<div class="test">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam leo dui, posuere blandit luctus in, posuere sollicitudin urna. Pellentesque vulputate quis velit ut tempor. Cras sollicitudin aliquam turpis non feugiat. Mauris enim felis, dictum vestibulum purus in, dignissim lobortis felis. Morbi tincidunt sagittis vehicula. Curabitur id scelerisque tellus. Pellentesque purus leo, porta egestas maximus in, volutpat nec neque. Praesent pellentesque enim sit amet facilisis pretium. Nulla dapibus orci dapibus ipsum commodo, ut pretium ex aliquet.

Nam enim arcu, pretium vehicula mauris at, accumsan condimentum sem. Quisque eu leo in velit porta malesuada. Etiam aliquet euismod nisi vel accumsan. Nulla posuere turpis quis risus sodales, eget facilisis dolor gravida. Mauris at tincidunt urna, vel tempor tortor. Mauris et odio vitae quam fringilla elementum vel sed ligula. Nam eget magna maximus, malesuada nisi et, iaculis magna. Maecenas fermentum ipsum eget purus hendrerit cursus. Sed eu ligula luctus, sollicitudin nunc non, faucibus felis. Nunc ullamcorper convallis neque, sit amet lacinia ligula laoreet ut. Sed vestibulum nisi ac neque rhoncus efficitur. Integer efficitur ultrices sagittis.

Nulla quis libero nec nisl finibus convallis ac a diam. Suspendisse dignissim massa sed quam feugiat pretium. Morbi nec ultrices urna. Aenean eget dolor mi. Nulla pulvinar nulla nec dolor accumsan, nec accumsan elit consectetur. Praesent lorem erat, dignissim at mauris sed, condimentum sagittis orci. Vivamus a venenatis nibh. Maecenas porttitor orci varius turpis tristique, in semper ipsum egestas.

Nam pulvinar lacinia ante sed dapibus. Donec eleifend iaculis dictum. Etiam ultrices leo turpis. Cras vitae orci sed libero finibus dictum. Vestibulum faucibus ultricies tortor, vel molestie nulla posuere non. In mattis ullamcorper augue, eu dignissim sem accumsan ac. Aenean posuere sem id commodo placerat. Nunc ut augue ultricies, scelerisque libero ut, fermentum enim. Integer nunc velit, cursus et sodales vel, pulvinar id enim. Aliquam aliquam, ex quis pulvinar auctor, libero libero venenatis eros, ac sollicitudin odio lacus sed nibh. Suspendisse potenti. Nunc luctus odio nec pellentesque lobortis. In scelerisque erat in diam pulvinar pellentesque. Proin justo dui, semper eget magna eu, convallis porttitor tortor. Duis ac nisi et enim consectetur consectetur.

Proin congue mi vitae elit posuere, sit amet tincidunt felis semper. Integer ut augue at erat varius dignissim eu id libero. Cras ligula leo, ornare et nibh ac, vehicula ultricies tortor. Suspendisse ultricies volutpat diam quis consequat. Integer magna dui, efficitur vel aliquam ut, posuere ut ex. Nulla et vehicula dolor. Praesent sed pellentesque ligula. Mauris tincidunt nibh fringilla, tincidunt sapien at, porta velit. Donec id diam vel sem vulputate ultricies.

Curabitur eleifend sagittis neque, sed scelerisque est commodo et. Sed vitae nunc dapibus orci elementum porttitor. Fusce at nibh et nulla laoreet vulputate. Etiam mattis pulvinar massa, ullamcorper imperdiet magna gravida a. Nullam congue ultricies massa, non tristique nisi fermentum feugiat. In eleifend ante ac diam feugiat ultricies. Donec egestas, felis id tristique suscipit, ligula nisl tempor ex, in varius risus leo a ante. Vivamus porta nisi in dolor dictum pretium. Proin arcu urna, gravida quis nibh lobortis, luctus convallis lorem. Ut in risus molestie, faucibus enim a, auctor erat. Ut turpis est, congue non cursus eu, volutpat et leo. Phasellus ut libero sit amet eros facilisis volutpat non sed justo.

Curabitur tincidunt mollis massa, vitae tempus magna finibus sit amet. Aliquam ut nisi quis dui pretium dignissim. Cras tincidunt, nisi ut consectetur dapibus, mauris purus porta mi, id faucibus dui lectus et lectus. Cras vulputate felis at lacus suscipit fermentum. Aenean sed luctus erat. Fusce hendrerit posuere odio, ut efficitur risus lacinia sit amet. Morbi eget ultrices lorem. Sed finibus commodo leo, vel mattis dui ultrices sit amet. Cras sed dignissim nulla, ut consequat lacus. Morbi scelerisque justo tempus felis sollicitudin tempor nec quis orci. Donec lacinia diam sit amet ex sollicitudin congue. Nunc urna massa, sodales a consequat eget, maximus at felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce et leo urna.

Vivamus imperdiet interdum maximus. Nam nec nunc ac leo euismod ultrices nec eget ante. Quisque ligula est, luctus et urna eu, tincidunt blandit dui. Mauris maximus vehicula orci. Ut sem urna, pulvinar et aliquam vel, rhoncus vitae turpis. Sed sit amet volutpat tortor. Maecenas faucibus, quam sed placerat fermentum, odio libero suscipit eros, nec euismod felis ex sit amet lectus.

Aenean vel justo vel arcu dapibus rhoncus at a urna. Vestibulum a mattis tellus. Nam ut cursus elit, in mollis mauris. Donec consequat mi dui, ac egestas diam dapibus vitae. Quisque justo metus, semper eu sem et, aliquam efficitur dui. Nam blandit venenatis magna, rhoncus fringilla enim varius quis. Proin non bibendum orci. Fusce libero sapien, pretium a aliquet eget, sagittis et justo.

Phasellus commodo ligula elit, vitae elementum erat pulvinar iaculis. Sed suscipit arcu vitae justo pretium eleifend. Integer metus sem, venenatis eu dui ut, venenatis ultricies quam. Quisque gravida volutpat leo vel viverra. Aenean sollicitudin nunc in lorem lacinia, vel dignissim diam maximus. Vivamus malesuada ac ante ac pulvinar. Mauris tincidunt dictum feugiat. Sed egestas quam dui, vel rhoncus ipsum tempus at. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque est eros, rhoncus vitae nisi sed, gravida ultricies neque. Integer nec convallis purus. Nullam feugiat mi et elit convallis, at tincidunt turpis iaculis. Mauris sagittis nibh quis quam porta, non blandit elit iaculis. Phasellus vehicula semper mattis. Aenean interdum malesuada iaculis.

Proin id euismod turpis. Fusce id augue feugiat, scelerisque metus a, varius diam. Nulla auctor quam nec venenatis imperdiet. Curabitur blandit fringilla erat tincidunt aliquam. Aliquam dictum dapibus velit, in rutrum erat hendrerit ac. Sed tellus felis, porttitor eget eleifend quis, consequat ac libero. Pellentesque nunc leo, ornare eget tortor quis, gravida malesuada ante. Vivamus gravida, libero nec viverra eleifend, turpis enim consequat ipsum, vitae sodales erat libero at metus. Curabitur condimentum neque dui, eu rutrum nisi placerat sed. Nunc id condimentum urna, at egestas diam. Vivamus elementum tincidunt tristique. Curabitur tincidunt vitae sapien at dictum. Donec volutpat nisi vitae tristique blandit. Pellentesque sodales, purus vel commodo varius, est mauris sodales sem, vitae luctus quam nisi ac erat. Maecenas quis metus urna.

Vestibulum luctus nisi et viverra varius. Duis non lacinia mi, id aliquam ex. Praesent lobortis dignissim sem. Mauris interdum, lectus in consectetur pretium, tellus enim consectetur orci, quis gravida nibh diam ut lacus. Curabitur mollis neque a auctor sodales. Morbi ac sollicitudin neque. Suspendisse porta laoreet pharetra. Sed mauris eros, tincidunt eget rhoncus vitae, sollicitudin nec metus. Praesent et odio placerat, congue sem ut, ultricies magna. Sed sit amet eros dui. Cras lacinia id nunc a hendrerit.

Praesent sed nisl id justo pharetra luctus a at ante. Vestibulum nec sem dictum, tempus libero nec, scelerisque leo. Sed nec ipsum cursus, laoreet mi in, sollicitudin erat. Phasellus mattis tortor vitae ornare pharetra. Donec purus ex, lacinia at eros et, euismod tincidunt nulla. Integer imperdiet eu nisl vitae cursus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce in tincidunt elit.

Etiam diam mi, malesuada nec nisl a, tincidunt feugiat neque. Cras gravida porta risus rhoncus rhoncus. In vulputate interdum nunc eu fermentum. Maecenas commodo in metus non vehicula. Fusce a dui vel nisl finibus rhoncus vel vitae justo. Curabitur lorem neque, viverra at ornare eget, pharetra ac nulla. Suspendisse a varius ligula. Nunc sapien lectus, dapibus venenatis euismod sed, tempus at sapien. Vestibulum pretium eleifend nulla hendrerit malesuada. Donec sollicitudin tempor vestibulum.

Donec nunc nulla, iaculis eu tortor at, pretium sagittis augue. Sed lacinia venenatis elit, eu condimentum quam tempor eu. Vestibulum quis feugiat nibh, non lobortis velit. Integer convallis, metus vel suscipit tempus, ipsum ligula pulvinar risus, sed imperdiet nunc nulla id mi. Integer egestas odio sagittis molestie maximus. Nulla semper est vehicula enim convallis consequat. Vestibulum quis tincidunt neque. Nam gravida ac odio ac ullamcorper.

Praesent purus urna, accumsan ac tempus vel, luctus a neque. Quisque pharetra placerat turpis, non eleifend nibh egestas sed. Curabitur massa arcu, faucibus sit amet orci lacinia, suscipit fermentum diam. Aliquam erat volutpat. Nam viverra venenatis velit condimentum interdum. Donec ac placerat lorem. Duis sed massa dapibus, porttitor lacus nec, aliquam dui.

Aenean sed finibus tellus, tristique pretium nunc. In turpis dolor, consequat et elit eu, dictum scelerisque risus. Aliquam eget erat odio. Nulla facilisi. Pellentesque porttitor quam in elit lobortis sollicitudin. Donec venenatis, tortor ac ornare eleifend, risus velit ornare velit, nec aliquet massa ante quis odio. Praesent id convallis augue. Phasellus pretium est ligula, sit amet finibus arcu lobortis ac. Sed id vestibulum nulla. Integer in dui velit. Aenean iaculis porttitor porttitor. Curabitur sed eleifend mauris.

Cras et convallis est. Quisque id erat viverra, tempus urna non, pharetra nunc. Phasellus lacus elit, ultrices et diam sit amet, sollicitudin elementum libero. Aenean at venenatis lacus, eu placerat metus. Vivamus quis dapibus lorem. Fusce vel gravida magna. Donec ullamcorper diam ac dui tempus, ut pellentesque sapien tempor. Integer pharetra sapien sit amet pellentesque tincidunt. Donec semper eros vel metus imperdiet pulvinar.

Donec sed mauris a ipsum lobortis eleifend. Duis ultricies dolor pharetra dolor varius accumsan. Maecenas commodo porta dapibus. In accumsan ultrices lorem maximus finibus. Aenean eu urna eros. Morbi viverra blandit eros vel porttitor. Praesent mattis nunc risus. Nulla euismod luctus purus quis egestas. Aliquam erat volutpat.

Mauris vel fringilla quam, vitae vehicula est. Pellentesque scelerisque, massa vel accumsan dictum, metus nisi hendrerit nisl, sed pretium diam mauris in mauris. Aliquam non gravida risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam luctus tincidunt libero vitae mollis. Suspendisse pretium sapien semper, lobortis nibh sed, hendrerit justo. Maecenas vitae dui sit amet nibh venenatis laoreet in ut metus. Donec eu ultricies erat, vel interdum purus. Pellentesque ac eros in nunc tincidunt sagittis. Nam malesuada lectus ut erat pulvinar, interdum posuere ipsum mattis. Morbi varius odio ac convallis egestas. Fusce congue a eros non luctus.

Curabitur accumsan urna a vehicula tempor. Pellentesque non ligula id augue pellentesque venenatis nec eu ligula. Ut eget mattis dolor. Proin nisi mi, pharetra quis finibus in, sagittis vitae orci. Suspendisse potenti. Mauris non vulputate mi. Fusce vulputate sollicitudin nisi, non viverra sapien cursus laoreet. Aenean in ante nibh. Curabitur tincidunt sed risus quis porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

Duis dictum condimentum ante. Integer ac nunc et ante laoreet mollis. Duis elementum ipsum est, eget ultricies nulla pulvinar in. Sed condimentum hendrerit pretium. Donec lorem lorem, congue a enim imperdiet, lacinia feugiat quam. Cras viverra ornare lectus vitae viverra. Proin venenatis nibh a nisl tempor fermentum. Duis volutpat lacus ut eros dapibus ultrices. Vestibulum a dignissim turpis. Praesent suscipit convallis pharetra. Duis nisi mauris, aliquet ac sollicitudin sit amet, molestie id velit. Curabitur posuere a est eu vestibulum. Curabitur vestibulum feugiat finibus. Duis fermentum fringilla vestibulum.

Suspendisse finibus, tellus id malesuada commodo, dolor augue venenatis neque, ullamcorper consectetur tellus libero at metus. Nulla id interdum ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris varius vulputate lacinia. Maecenas eget nisl maximus, maximus nunc ac, feugiat est. Nam sed tincidunt ex, ut condimentum ex. Morbi laoreet pretium arcu, eu lacinia velit pulvinar sed.

In aliquet nibh nec pharetra eleifend. Donec ac fermentum est. Curabitur vitae urna magna. Donec non fringilla orci. Nam a massa porttitor, posuere nisl nec, vehicula leo. Duis condimentum ac nunc a mollis. Vestibulum ut facilisis ex. Nullam ut leo sed justo malesuada lobortis. Nunc elementum purus nec iaculis porta. Nullam rhoncus lectus ac bibendum suscipit. Proin non mauris eu ante luctus lobortis. Donec eget erat arcu. Mauris eu nisi dapibus, varius magna non, egestas enim. Vivamus auctor odio sit amet purus convallis maximus. Duis ut aliquam ex, ut ornare tellus. Mauris vestibulum accumsan nunc, vitae commodo mi consectetur dapibus.

Ut fermentum auctor eros at aliquam. Donec euismod iaculis nunc, in tristique enim molestie vitae. Nunc vitae augue iaculis, imperdiet risus a, scelerisque sem. Vivamus porttitor, elit non ultrices dignissim, orci dolor ornare justo, sed elementum arcu enim eget magna. Aenean accumsan urna vestibulum, posuere nisl eget, rutrum nisl. Quisque vitae mollis leo, in commodo purus. Donec eget dui porta, maximus felis eu, maximus risus. Sed scelerisque lectus turpis, nec tempor purus elementum ut. Sed interdum euismod orci, nec dapibus leo egestas eu. Mauris eu venenatis nisi. Praesent fringilla blandit nunc nec finibus. In fermentum eget urna nec egestas. Ut eu magna sollicitudin, lobortis turpis posuere, iaculis est. Quisque vitae lectus eu leo iaculis sollicitudin quis eget nunc. Proin sit amet est dictum, hendrerit erat vel, egestas lectus. Aenean varius mauris eget mollis aliquam.

Morbi eget ante fermentum, venenatis ligula sed, dapibus quam. In nisi leo, accumsan at varius vitae, egestas sit amet enim. Mauris vitae bibendum orci. Donec eget ornare elit. Nunc imperdiet nisi et consectetur vestibulum. Donec eu dui non quam suscipit interdum. Phasellus id neque quis velit auctor molestie ac quis lacus. Sed vel lacinia urna.

Quisque porttitor ultricies lectus vitae tempor. Sed quis auctor dolor. Nunc nec arcu dictum, viverra metus sit amet, ullamcorper diam. Sed condimentum, dui sed egestas lacinia, lacus sapien accumsan urna, in aliquet orci ante eu neque. Morbi at eleifend ex. Integer mollis nulla vitae lectus iaculis volutpat. Nulla eros justo, feugiat ac egestas ut, lobortis et nibh. Fusce at nibh porta, laoreet nibh sit amet, rhoncus felis. Nulla sed nisl id nulla condimentum tempor. Sed fringilla nunc nec dolor condimentum ultricies.

Donec ultrices, sem vitae luctus pharetra, lacus sem sollicitudin odio, a rutrum velit lorem a mauris. Aliquam et enim tincidunt, varius turpis in, blandit ligula. Proin fringilla id eros ut pulvinar. Nulla laoreet venenatis metus. Nam interdum sit amet elit sit amet condimentum. Donec vel nisl sit amet lacus tempor consectetur vel sed sem. Maecenas interdum mi quis nulla ultrices, id tempus purus tempor. Duis suscipit odio mi, at viverra enim imperdiet a. Pellentesque malesuada libero lacinia luctus vulputate. Aliquam at pretium tortor. Donec molestie ante et consequat imperdiet. In ultricies fringilla enim eu tristique. Cras nulla orci, consequat vel tincidunt in, venenatis nec magna. Vestibulum fringilla consectetur pellentesque.

Praesent ante massa, laoreet quis odio sed, tristique malesuada dui. Aenean tellus sapien, hendrerit sit amet dolor in, maximus sagittis mi. Donec varius augue non magna lobortis consequat. Quisque suscipit, erat ac pretium aliquet, arcu nunc auctor odio, et tristique mauris tortor nec felis. Sed semper erat aliquam scelerisque volutpat. Fusce vel purus cursus, cursus lectus in, tempus felis. Proin luctus consectetur est, nec placerat tellus congue nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur lacinia augue odio. Nam rutrum eros dignissim, scelerisque eros quis, tempor sem. Aliquam cursus mi eu erat pellentesque, vel feugiat tellus dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Praesent sed lobortis libero. Sed at convallis lacus, ut mattis purus. Mauris sit amet dolor neque. Duis a erat quis ex condimentum rutrum. Vivamus laoreet malesuada leo ullamcorper egestas. Maecenas rhoncus, sapien in venenatis tempor, mi sapien porttitor urna, non eleifend odio diam ac ante. Duis commodo leo sit amet eros bibendum, a faucibus enim iaculis. Duis tincidunt venenatis felis sit amet rhoncus. Fusce sollicitudin tortor eu diam maximus pulvinar. Phasellus sit amet eros efficitur, laoreet ante vitae, placerat nibh. Etiam laoreet libero sed massa semper ultrices. Praesent vestibulum, mi ut rutrum eleifend, nunc justo rhoncus enim, id posuere velit diam vel lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec rutrum ante sit amet sem hendrerit convallis. Maecenas porttitor dignissim nisl, eu convallis ex iaculis id. Proin tempus suscipit dolor vel hendrerit.

Etiam vehicula leo vel tortor luctus pharetra. Donec orci libero, suscipit et placerat ut, malesuada ut neque. Fusce et elit in arcu finibus bibendum. Aenean quis nunc a nisi dignissim blandit. Nunc non mauris mauris. Fusce eleifend mi non dui placerat, sit amet lobortis nibh facilisis. Quisque ultricies ante non varius scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam laoreet nunc diam, vel congue ante sodales nec.

Vivamus est felis, pulvinar sed nunc id, tempor convallis tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi ultricies eros vitae tortor blandit aliquam. Nulla est orci, congue id ante non, convallis consequat diam. Etiam porttitor pharetra sapien non sagittis. In non eros at augue mollis molestie. Maecenas vestibulum gravida velit eget molestie. Maecenas vestibulum commodo dui non fermentum. Duis odio ipsum, accumsan nec nibh eu, vehicula dictum turpis. Cras fermentum tempor urna. Duis vehicula volutpat iaculis. Curabitur mollis sollicitudin nulla. Phasellus bibendum mollis risus vitae porttitor. Phasellus non tortor a mauris laoreet tincidunt. Nunc vel magna sed libero malesuada dignissim vitae nec turpis. Cras in magna suscipit, volutpat sapien sed, mollis mi.

Pellentesque eget neque vitae elit tincidunt vestibulum. Curabitur imperdiet rutrum metus, et suscipit mi finibus vel. Vivamus lacinia pretium metus. Donec eget velit eget tellus viverra consequat. Donec vel ex posuere, pellentesque justo non, porta ligula. Nulla dictum felis ut lectus aliquet viverra. Quisque pretium diam ut fringilla mollis. Maecenas gravida, magna pharetra consectetur porttitor, felis ante imperdiet diam, ut luctus quam lacus vitae lacus. Donec nec porta urna, vel tempus neque. Mauris id sem hendrerit, malesuada magna ac, accumsan mi. Proin tortor elit, auctor et nisl vitae, porttitor convallis eros. Duis auctor ultrices laoreet. Nulla facilisi. Proin ullamcorper egestas urna, in malesuada nisl sodales ut. Aliquam auctor leo sit amet faucibus molestie. In venenatis nibh a nisl pellentesque, sit amet blandit elit fermentum.

Maecenas sollicitudin facilisis sem sit amet varius. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur est diam, consectetur sed massa nec, hendrerit lacinia purus. Proin mollis felis enim, at commodo ex dictum eu. Fusce at nisi vel erat euismod commodo quis at tortor. Aenean mauris orci, viverra non lobortis nec, tincidunt quis velit. Duis id tempus diam. Morbi nec risus congue, pulvinar velit in, iaculis lorem. Sed placerat scelerisque neque sit amet eleifend. In felis leo, mollis non varius in, placerat eu leo. Duis quis mattis diam. Sed in tristique sem.

Phasellus placerat, est vitae hendrerit egestas, nibh libero ultricies leo, a blandit diam libero nec nibh. Vestibulum arcu tortor, placerat non ultricies a, faucibus sed mauris. Integer vestibulum leo felis, vitae feugiat lacus aliquet et. Proin dapibus risus ut nibh bibendum, eu volutpat tortor cursus. Nunc congue, mi in ornare efficitur, orci urna placerat arcu, eu luctus libero dui et turpis. Proin non metus vel turpis pulvinar elementum. Suspendisse potenti.

Sed dignissim ullamcorper nisl. Ut vitae augue nisi. Aliquam vulputate sagittis elit, et tincidunt diam hendrerit nec. Ut sapien justo, ultricies non lorem eget, convallis facilisis tellus. Fusce ultricies ornare leo sit amet sollicitudin. Duis pretium commodo purus, sit amet ullamcorper massa suscipit vel. Integer eget eros eros. Curabitur varius, mauris eget lacinia sollicitudin, nibh est facilisis leo, eget luctus leo orci quis urna. Sed malesuada faucibus augue at auctor. Nunc vestibulum rhoncus neque, nec eleifend est cursus ac. Quisque placerat posuere tempor. Nullam non turpis porta, ornare dui id, luctus ante. Quisque in congue massa. Duis vulputate ex ut eros tristique, et convallis quam scelerisque. Nunc mollis orci posuere nisi dictum, at laoreet ligula porta.

Etiam dignissim in ante at suscipit. Vivamus malesuada laoreet erat vitae tincidunt. Donec eget est ac massa fringilla posuere et in urna. Sed blandit erat elementum urna placerat, at mattis turpis vestibulum. Morbi euismod ullamcorper ipsum, et ornare dolor convallis quis. Donec vel nisi enim. Etiam sit amet nunc risus. Nulla vitae metus tincidunt dui lacinia ultricies. Sed at purus et sem malesuada tempus eget at erat. Morbi at tellus semper, efficitur tellus a, facilisis elit.

Aenean metus nibh, hendrerit ac felis sed, porttitor imperdiet diam. Donec pretium malesuada purus, nec lacinia tortor feugiat id. Donec placerat, libero eu pharetra blandit, neque elit pretium turpis, sed mattis nunc neque id mi. Mauris viverra commodo placerat. Maecenas semper, magna et commodo accumsan, nunc odio gravida ipsum, nec fringilla libero arcu in mauris. Cras tristique, ipsum non eleifend ultrices, felis ante interdum ligula, ac fringilla velit nulla in purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris vel malesuada dolor. Sed vitae velit velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris feugiat, odio ac aliquet porta, lectus massa condimentum est, dictum sodales dui risus sit amet diam.

Proin aliquet non quam eu ultricies. Sed at enim ut orci consequat maximus in et purus. Maecenas a pellentesque velit, nec feugiat nisl. Pellentesque suscipit sem vel efficitur molestie. Donec non felis mattis, faucibus mi quis, porttitor augue. Aenean pulvinar elit in laoreet volutpat. Sed vel eros turpis. Nunc convallis, magna sed porttitor maximus, lorem arcu dapibus metus, eu ullamcorper metus mi quis tortor. Suspendisse quis pellentesque quam. Sed mi lacus, euismod sit amet purus sit amet, cursus consectetur ex. Phasellus venenatis blandit enim, id tincidunt magna tempus ac.

Sed sit amet pellentesque velit, ut consequat nisl. Maecenas nec pellentesque lectus. Phasellus fringilla augue vitae nisl vehicula pretium. Proin sit amet risus vitae quam accumsan dignissim. Praesent sagittis in turpis ac fringilla. Sed pretium, dolor in suscipit rhoncus, mi velit vestibulum orci, sed fringilla quam sem fringilla sapien. Ut vitae nisi metus. Pellentesque urna ipsum, pretium ut quam nec, rutrum tristique lorem. Etiam sed rhoncus diam. Donec vel commodo arcu.

Praesent placerat tortor auctor mi posuere, sed posuere ligula sodales. Proin eu tristique sem. Pellentesque sit amet viverra neque. Donec lobortis elit nec cursus sodales. Morbi tincidunt, ligula a luctus eleifend, dolor enim hendrerit ex, eu scelerisque dui ligula at ipsum. Vivamus venenatis enim quam, accumsan auctor ipsum finibus id. Aliquam nisl felis, lobortis sed sem a, euismod accumsan ante. Fusce laoreet lacus convallis urna pretium, et fringilla erat maximus. Mauris eu felis eleifend leo lacinia consequat.

Quisque ac ipsum eget est consequat molestie nec eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In egestas orci eu mi tristique, vitae tincidunt turpis varius. Suspendisse bibendum magna lorem. Cras luctus varius tempus. Proin ut velit eu neque mattis suscipit. Nam sollicitudin, mi mattis congue fringilla, enim felis rutrum odio, quis ullamcorper diam justo eu magna. Morbi nisl justo, elementum vitae hendrerit sed, lobortis vel nunc. Nunc tellus ipsum, elementum quis odio ac, pharetra commodo lectus. Quisque vel sem tristique, euismod enim a, luctus ante. Nulla luctus vel magna ac consectetur. Praesent eleifend turpis eu pellentesque ornare. Nulla convallis malesuada nulla, ac mattis sapien malesuada in. Etiam sagittis enim ut interdum hendrerit. In velit tellus, vehicula at tempus quis, posuere in dolor.

Aenean iaculis cursus tempus. Etiam lorem tortor, blandit varius metus quis, pulvinar faucibus nunc. Etiam laoreet venenatis eros in aliquet. Suspendisse sodales ante eget efficitur faucibus. Nunc molestie viverra velit, at imperdiet quam tristique vel. Curabitur nisi tellus, aliquet in euismod in, viverra nec lorem. Mauris mollis non massa vitae gravida. Cras nec dictum orci, sed cursus elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed quis lorem ipsum. Aliquam lectus tortor, posuere in eros sit amet, volutpat facilisis arcu. Aliquam eu ante id est venenatis ullamcorper. Nulla facilisi.

Aliquam condimentum id nunc eget tristique. Vivamus sagittis consectetur magna vel convallis. Fusce purus erat, elementum eget risus vitae, feugiat faucibus leo. Vestibulum rutrum odio at tincidunt sollicitudin. Maecenas a dictum nisi. Etiam condimentum justo neque, in accumsan diam pharetra nec. Suspendisse sollicitudin, arcu eu blandit gravida, ex odio malesuada nisi, vel feugiat magna neque id velit. Duis cursus enim congue convallis tincidunt. Ut vulputate sit amet dolor vel volutpat. Donec et aliquam turpis, eu malesuada lacus. Quisque id congue eros.

Nam sagittis enim elit, vitae viverra est posuere a. Duis fermentum, elit nec malesuada suscipit, urna nulla tincidunt leo, vitae tempus orci est sed justo. Pellentesque a eros hendrerit, bibendum mauris ac, imperdiet ligula. Sed semper luctus vehicula. Curabitur rutrum tortor nec nisl vulputate ultrices. Etiam turpis neque, efficitur id suscipit eu, efficitur ac nisi. Aenean sit amet augue semper, accumsan dui ut, pharetra nulla. Donec varius blandit venenatis. Donec non nunc nisi. Pellentesque sagittis sapien tellus, a tristique est ullamcorper faucibus. Sed ut sollicitudin massa, sed dignissim diam. Aenean tincidunt tincidunt ipsum, suscipit laoreet tortor dignissim eu. Proin pulvinar augue eu tellus mollis varius.

Duis sem ligula, posuere eu malesuada sit amet, scelerisque vitae turpis. Aenean et sodales purus. Phasellus tempor vitae tellus fringilla maximus. Mauris augue augue, placerat sit amet libero vitae, finibus lobortis tortor. Mauris finibus eleifend finibus. In vitae rhoncus lorem, quis pellentesque urna. Nunc sed cursus erat. Fusce lobortis leo non est suscipit vehicula. Quisque dapibus lacus massa, ac dapibus tortor porttitor eget. Aenean consequat mollis massa, at commodo nisi imperdiet ultricies. Sed quis orci nibh. Mauris hendrerit consequat leo. Integer nec viverra sapien, vel aliquet sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

Fusce malesuada ligula non dui sollicitudin molestie. Donec nulla ligula, auctor ut maximus ac, ultrices a tortor. Proin tempor ipsum vitae risus tempor, eu lobortis elit viverra. Ut feugiat nibh sed ornare laoreet. Donec lobortis mollis nunc sit amet porttitor. Morbi eleifend tortor metus. Pellentesque volutpat efficitur nisl quis suscipit.

Sed dapibus purus ut eleifend vulputate. Suspendisse potenti. Sed ultrices mi quis ante aliquam condimentum. Fusce laoreet vestibulum elit, et porttitor eros laoreet sit amet. Nullam non efficitur ex. Praesent feugiat tempus turpis, in euismod nulla. Vestibulum aliquet nulla eget ante commodo, laoreet fringilla sem facilisis. Aliquam nec finibus dui. Vivamus quis purus erat. Suspendisse imperdiet lectus sit amet metus facilisis, eu auctor dui pulvinar. Sed nec sem vitae augue laoreet tempus eget sed mauris. Praesent vel ipsum augue.

Phasellus iaculis nunc ac tellus consequat suscipit. Vivamus ac vehicula diam. Suspendisse sem lacus, vehicula in risus sit amet, faucibus sodales velit. Morbi molestie viverra elit ut luctus. Cras at faucibus orci, quis viverra nibh. Aenean luctus varius tortor eget vehicula. Pellentesque luctus interdum ligula, ut pharetra purus tempor eu. Nulla ut quam quam. Duis eget odio pretium, accumsan ex in, tristique massa. Morbi sed ipsum aliquet, eleifend nisl non, ullamcorper lacus. Quisque malesuada tincidunt blandit. Phasellus non turpis sit amet purus dapibus venenatis. Mauris convallis, augue a elementum iaculis, eros odio condimentum eros, quis ultricies dui massa eu velit. Nullam ac diam velit.

Mauris ut sollicitudin leo. Etiam bibendum, orci sit amet cursus pellentesque, risus nisi tempus leo, commodo suscipit diam sapien non justo. Sed pulvinar est ac bibendum placerat. Duis non turpis purus. In at neque ac lorem venenatis tincidunt in in ex. Proin nec cursus neque. Aliquam lorem orci, viverra vitae mattis eget, congue a ligula. Sed imperdiet sapien ut urna tempor, quis lacinia metus mattis. Aliquam placerat, libero eu malesuada volutpat, ipsum purus suscipit sapien, at condimentum urna lectus at augue. In ut leo malesuada, imperdiet lectus id, vulputate purus. Donec consectetur accumsan lacinia.

Vivamus egestas nunc sit amet odio molestie, ut sodales sem consequat. Ut euismod mauris in orci ultricies tempor. Pellentesque at nunc vitae sapien pellentesque tempor sed et quam. In quis sollicitudin sem. Curabitur posuere egestas risus, quis porta sapien elementum a. Sed ipsum nunc, condimentum ac magna non, tempor imperdiet sapien. Suspendisse sagittis tortor ac ante imperdiet, ac vestibulum quam rutrum. Sed eget elementum lacus, sit amet accumsan nulla. Donec rhoncus posuere mauris eget varius. Curabitur ultricies, sem a aliquam ultricies, arcu ipsum mattis nunc, non rhoncus nunc risus non lorem. Duis in est diam. Integer nec ornare velit.

Sed fermentum condimentum tempus. In sodales velit ligula. Sed faucibus urna sit amet iaculis mollis. Aliquam eu diam ac dui fermentum tristique vitae vitae enim. Integer ultrices consectetur tellus vel ultricies. Cras varius eros et nisl fermentum semper sit amet id ante. Maecenas tempus est vel purus aliquet, ac varius felis placerat. Suspendisse eget sodales sapien. Vivamus vitae est eu ligula ultricies ullamcorper. In tincidunt, massa sed viverra sollicitudin, diam elit dignissim mauris, nec tempor nisl diam sed eros. Pellentesque vel pellentesque sem. Curabitur tristique libero quis dapibus cursus. Sed interdum vulputate porta.

Aenean vel tortor at nibh cursus porttitor. Aliquam ullamcorper viverra erat maximus vestibulum. Proin aliquet, nunc et faucibus viverra, ante eros lacinia ligula, nec tincidunt elit erat non arcu. Integer fermentum eros ac orci bibendum euismod sit amet varius risus. Curabitur ullamcorper interdum finibus. Pellentesque vel magna sit amet mauris posuere aliquam et quis mauris. Quisque rutrum eros cursus dictum consectetur. Nulla auctor quam a orci pretium scelerisque. Suspendisse tortor nisi, scelerisque quis magna nec, fringilla congue arcu. Aenean vitae tellus vitae mi laoreet scelerisque. Suspendisse tempor dui ac consectetur gravida. Curabitur in rutrum dolor, ut sodales risus. Morbi pharetra, tortor id sollicitudin sodales, massa sem iaculis erat, ullamcorper posuere ex sem quis mauris. Pellentesque et luctus magna. Cras tellus justo, semper a vulputate euismod, molestie et erat.

Nam sit amet convallis justo. Ut dapibus dolor a ultrices pretium. Nam lobortis volutpat mollis. Phasellus laoreet placerat porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras in lacinia velit. Donec congue tortor nec purus tempor consequat. Pellentesque et pharetra sapien. Nam orci sem, facilisis non interdum sit amet, bibendum id risus. Pellentesque vitae finibus quam, vitae mollis lectus. Phasellus mollis rutrum ipsum, ut ultrices elit. Integer ligula purus, interdum ut urna eget, consectetur sagittis arcu. Ut maximus blandit commodo.

Ut libero nisl, lacinia et ligula ut, auctor faucibus nulla. Integer non elementum elit, vel rutrum mauris. Nulla facilisi. Etiam scelerisque nisl a urna fringilla, vel placerat risus molestie. Pellentesque bibendum elit nunc, sed lobortis erat facilisis nec. Quisque vitae lectus vel tortor dignissim vulputate ut sed eros. Donec quis lacinia dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum tincidunt neque quis urna suscipit vestibulum. In vitae elementum mi.

Praesent congue leo ac purus viverra, ac convallis nisi iaculis. Proin ullamcorper semper lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam egestas ligula at eleifend ultricies. Cras in neque eget dui elementum viverra sed a leo. Nulla fermentum sagittis dolor vitae sagittis. Proin ultricies mi enim, non tincidunt justo rutrum non. Phasellus at ornare metus. Nunc dignissim consectetur arcu quis rutrum. Sed accumsan ligula id ipsum ullamcorper, quis.
</div>
</div>
`;

const host = document.getElementById("app");

const containerParams = {
  width: "612px",
  height: "800px",
};

const clip = new HTMLClip({
  css,
  html,
  host,
  containerParams,
});

const AnimateWidth = new CSSEffect(
  {
    animatedAttrs: {
      top: "-7000px",
    },
  },
  {
    selector: ".test",
    duration: 7000,
  }
);

clip.addIncident(AnimateWidth, 0);

window.player = new Player({
  clip,
  volume: 0,
  speed: 1,
  controls: false,
  // thumbnailColor: "black",
  wheelSeek: true,
  // thumbnail:
  //   "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  // autoPlay: true,
});
// window.player.changeSettings({
//   pointerEvents: true,
//   outline: "1px dashed gray",
//   // visible: "normal",
// });

// window.player.changeInitParams({test: "hello world1",});
// window.player.changeInitParams({test: "hello world2",});
