/*:
 * @plugindesc (v.0.6)[BASIC] Multiplayer for RPG Maker
 * @author Pheonix KageDesu
 * @target MV
 * @url https://kdworkshop.net/plugins/alpha-net-z/
 *
 * @help
 *
 * Alpha NET Z plugin is still in development
 *
 * WebPage: https://kdworkshop.net/plugins/alpha-net-z/
 * Documentation: https://github.com/KageDesu/Alpha-NET-Z/wiki
 *
 * Required content:
 *  - plugin Alpha_Core.js
 *  - plugin SocketIO.js
 *  - file css\anet.css
 *  - folder img\Alpha\*all files*
 *
 *

 * @param ANETZ @text @desc
 * 
 * 
 * @param connection:s
 * @text Connection
 * @type struct<LConnectionSettings>
 * @default {"serverIp":"195.161.41.20","serverPort":"3034"}
 * @desc [PRO] If you don't have own server, don't change this settings
 * 
 * 
 * @param spacer|gamesettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param gameModeSettingsGroup
 * @text Multiplayer Settings
 * 
 * @param onlySameMap:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Wait Map Transfer?
 * @default false
 * @desc When player transferred to the new map he will wait until all players not transfered on same map.
 * 
 * @param singlePlayerAllowed:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text New Game Allowed?
 * @default true
 * @desc If false, the menu item "New Game" will not be displayed in title menu
 * 
 * @param roomFilter:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Rooms Filter?
 * @on ON
 * @off OFF
 * @default false
 * @desc [PRO] If filter is ON, you can see only this (same) game rooms in lobby
 * 
 * @param saveLoadGame:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Save and Load Allowed?
 * @on YES
 * @off NO
 * @default true
 * @desc Can player save and load network game?
 * 
 * @param inGameChat:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text In-Game Chat?
 * @on YES
 * @off NO
 * @default false
 * @desc [PRO] In-Game chat on Map Scene? (More chat settings will be in next update...)
 * 
 * @param chatStartMessage
 * @parent inGameChat:b
 * @text Start Message
 * @default \}Welcome to Alpha NET Z, \C[1]'T'\C[6] to chat
 * @desc Message when New Game started. Leave empty if not need any start message.
 * 
 * @param chatOpenCloseKey
 * @parent inGameChat:b
 * @text Chat Key
 * @default t
 * @desc Key to open (close) chat window in game.
 * 
 * @param chatSayKey
 * @parent inGameChat:b
 * @text Say Key
 * @default t
 * @desc Key to open input message scene. Only when chat visible. Can be same with Chat Key.
 * 
 * @param playersSettingsGroup
 * @text Players Settings
 * 
 * 
 * @param actorsForNetwork:intA
 * @parent playersSettingsGroup
 * @type actor[]
 * @text Actors
 * @default ["1","2","3","4"]
 * @desc Available actors for network game players. More than 2 - PRO only.
 * 
 * @param isActorSelectionAllowed:b
 * @parent playersSettingsGroup
 * @text Actor selection?
 * @type boolean
 * @default true
 * @desc Can player select actor in lobby?
 * 
 * @param isSinglePlayerStartAllowed:b
 * @parent playersSettingsGroup
 * @text One player start?
 * @type boolean
 * @default true
 * @desc If in room only 1 player (host), he can start game alone?
 * 
 * @param playerActorNameType
 * @parent playersSettingsGroup
 * @text Player Name for Actor
 * @type select
 * @option Not Show
 * @option Instead Name
 * @option Instead Nickname
 * @default Instead Nickname
 * @desc Show network player name instead of his Actor name (or nickname)
 * 
 * @param playerLeaveGameCommonEvent:int
 * @parent playersSettingsGroup
 * @text On Player Disconnect CE
 * @type common_event
 * @default 0
 * @desc That common event will be called when somebody leave (disconnect) game. 0 - nothing
 * 
 * @param globalData:s
 * @text Global Data
 * @type struct<LGlobalData>
 * @default {"globalVariablesIds:intA":"[]","globalSwitchesIds:intA":"[]"}
 * @desc All this data will be automatically synchronized between all players
 * 


 */
/*~struct~LConnectionSettings:

@param serverIp
@text IP
@type combo
@option localhost
@option 195.161.41.20
@desc Server IP address (ip4)
@default 195.161.41.20

@param serverPort
@text Port
@default 3034

*/

/*~struct~LGlobalData:

@param globalVariablesIds:intA
@type variable[]
@text Variables
@default []
@desc Variables for auto synchronizaton

@param globalSwitchesIds:intA
@type switch[]
@text Switches
@default []
@desc Switches for auto synchronizaton

*/
// * INITIAL S FILE

var Imported = Imported || {};
Imported.Alpha_NETZ = true;

var ANET = {};
ANET.Version = 60; // 0.6.0

ANET.ServerRev = 112; // * Необходимая ревизия сервера

// * Данный символ переопределяется в 1_DevSymbol_TEST как dev
ANET._define = 'build'; // * По умолчанию -> сборка

ANET.link = function (library) {
    this[library.name] = library;
};

ANET.isDEV = function () {
    return ANET._define == 'dev';
};


ANET.w = (e) => AA.w(e);

if(!Imported.Alpha_Core) {

    if(ANET.isDEV()) {
        console.warn("Alpha NETZ require Alpha_@Core plugin!");
    } else
        alert("Alpha NETZ require Alpha_@Core plugin!");
}

ANET.isPro = function() {
    return false;
};
//Compressed by MV Plugin Builder
(function(){var a0_0x532a=['onRoomClosed','room','get','Trace','XpZoP','myId','_isWaitServer','You\x20are\x20Master\x20(host)\x20of\x20room:\x20','TFIlt','disconnect','onLeaveRoom','Network','23SgOIst','Network\x20inited','FCvzH','You\x20are\x20joined\x20to\x20room:\x20','36412TKQjLo','http://','isWaitServer','Lobby','stop','requestRoomRefresh','XXJCc','getLightestColor','995sWrovM','dFhgv','setRoomJoin','You\x20try\x20send\x20message,\x20but\x20NOT\x20connection!','svnBv','YpDia','uzNdJ','Connect\x20to\x20','763499jnggJD','client','GREEN','xcyXj','socket','getNetworkGameInfoData','isOnlySameMapMode','getRoomData','getGameVersion','setRoomMaster','send','148daAxgZ','setConnectionToMasterCallback','lZkhJ','xGWJo','length','leaveRoom','setFrom','initSystem','799icViTU','TyRpl','pXOTK','aUcFR','reset','apply','RRUNb','29dZWPmD','hideLoader','isConnected','startConnection','_isHost','343287AwbmBP','BLACK','Send:\x20','137MYNVuX','Send,\x20get!:\x20','VAWmh','fullName','shjyx','serverPort','name','6782VOFsez','2979088MSzlmW','UEnwn','isMasterClient','Vvdms','mlxiN','callback','log','closeRoom','DevLog','serverIp','ANNetwork'];function a0_0x2aaa(_0x13ad6a,_0x297083){_0x13ad6a=_0x13ad6a-0x83;var _0x532a17=a0_0x532a[_0x13ad6a];return _0x532a17;}var a0_0x506d7f=a0_0x2aaa;(function(_0x5b4595,_0x1d5919){var _0x1de48d=a0_0x2aaa;while(!![]){try{var _0x21e425=-parseInt(_0x1de48d(0x9e))*parseInt(_0x1de48d(0x83))+parseInt(_0x1de48d(0x96))*-parseInt(_0x1de48d(0xb4))+-parseInt(_0x1de48d(0xaa))+parseInt(_0x1de48d(0x8b))+parseInt(_0x1de48d(0xa5))*-parseInt(_0x1de48d(0xd0))+-parseInt(_0x1de48d(0xcc))*-parseInt(_0x1de48d(0xad))+parseInt(_0x1de48d(0xb5));if(_0x21e425===_0x1d5919)break;else _0x5b4595['push'](_0x5b4595['shift']());}catch(_0x164f6f){_0x5b4595['push'](_0x5b4595['shift']());}}}(a0_0x532a,0x85bb2),window[a0_0x506d7f(0xbf)]=function(){},window['NET']=window[a0_0x506d7f(0xbf)],function(){var _0x2f4a4a=a0_0x506d7f,_0x17b973,_0x5762ea;_0x17b973=new KDCore[(_0x2f4a4a(0xbd))](_0x2f4a4a(0xcb)),_0x17b973['setColors'](KDCore['Color'][_0x2f4a4a(0x8d)],KDCore['Color'][_0x2f4a4a(0xab)][_0x2f4a4a(0xd7)](0x23)),_0x17b973['on'](),_0x5762ea=window[_0x2f4a4a(0xbf)],_0x5762ea[_0x2f4a4a(0xa7)]=function(){var _0xe4843d=_0x2f4a4a;return this[_0xe4843d(0x8f)]!=null;},_0x5762ea[_0x2f4a4a(0xc5)]=function(){var _0x3eb37b=_0x2f4a4a,_0x3f5ffd;return(_0x3f5ffd=this[_0x3eb37b(0x8f)])!=null?_0x3f5ffd['id']:void 0x0;},_0x5762ea[_0x2f4a4a(0xb7)]=function(){var _0xc2ee68=_0x2f4a4a;if(_0xc2ee68(0xc8)!==_0xc2ee68(0x89))return this[_0xc2ee68(0xa9)]===!![];else{function _0x461aea(){return _0x32e3fb['p']('Callback\x20for:\x20'+_0x91702b),_0x460e52['apply'](this,_0x3db881);}}},_0x5762ea['isSameMapMode']=function(){var _0x441cea=_0x2f4a4a;if(_0x441cea(0xb6)!==_0x441cea(0xb6)){function _0x5c0eb8(){var _0x925cd2=_0x441cea;if(!this[_0x925cd2(0xa7)]())return;if(this[_0x925cd2(0xc1)]==null)return;this['leaveRoom'](),this[_0x925cd2(0xa9)]=![],this['room']=null;}}else return ANET['PP'][_0x441cea(0x91)]();},_0x5762ea['isBusy']=function(){var _0x341137=_0x2f4a4a;return this[_0x341137(0xa7)]()&&(this[_0x341137(0xd2)]()||ANGameManager['isShouldWaitServer']());},_0x5762ea['isWaitServer']=function(){var _0x2b2180=_0x2f4a4a;if(_0x2b2180(0xa0)===_0x2b2180(0xaf)){function _0x13511e(){var _0x30be69=_0x2b2180;if(!this[_0x30be69(0xa7)]())return;this[_0x30be69(0x95)](_0x1e0dcc[_0x30be69(0xd3)](_0x30be69(0x92)));}}else return this[_0x2b2180(0xa7)]()&&this[_0x2b2180(0xc6)]===!![];},function(){var _0x5691d3=_0x2f4a4a;return _0x5762ea[_0x5691d3(0x9d)]=function(){var _0x47687f=_0x5691d3;if(_0x47687f(0x84)!==_0x47687f(0xa1))return this[_0x47687f(0x8f)]=null,this[_0x47687f(0x8c)]=null,this[_0x47687f(0xc6)]=![],this[_0x47687f(0xa9)]=![],_0x47687f(0xcd)['p']();else{function _0x3ac8b0(){var _0x2913a5=_0x47687f;_0x54794a[_0x2913a5(0xa3)](this,_0xc36ca1);}}},_0x5762ea[_0x5691d3(0xd4)]=function(){var _0x232b19=_0x5691d3,_0x5bea5a;NetClientMethodsManager['setConnectionToMasterCallback'](null),(_0x5bea5a=this[_0x232b19(0x8c)])!=null&&_0x5bea5a[_0x232b19(0xc9)](),this[_0x232b19(0xc6)]=![],this['socket']=null,ANGameManager[_0x232b19(0xa2)]();},_0x5762ea[_0x5691d3(0xa8)]=function(){var _0x169612=_0x5691d3,_0x510263,_0x8eae8,_0xbb240e;_0x8eae8=ANET['PP'][_0x169612(0xbe)](),_0xbb240e=ANET['PP']['serverPort'](),_0x510263=_0x169612(0xd1)+_0x8eae8+':'+_0xbb240e,console['log'](_0x169612(0x8a)+_0x510263),this[_0x169612(0x8f)]=io(_0x510263),this[_0x169612(0x8c)]=new NetworkClientHandler(this[_0x169612(0x8f)]);},_0x5762ea['setConnection']=function(_0x3e8e3f){var _0x580a7c=_0x5691d3;if(_0x580a7c(0x98)!==_0x580a7c(0x98)){function _0x205cc1(){this['room']=_0x55dac0;}}else NetClientMethodsManager[_0x580a7c(0x97)](_0x3e8e3f),this[_0x580a7c(0xa8)]();},_0x5762ea[_0x5691d3(0x95)]=function(_0x2d379f,_0x31234d=![]){var _0x3d0870=_0x5691d3;if(!this['isConnected']()){if(_0x3d0870(0xb9)!=='mlxiN'){function _0x115ea5(){var _0x2987db=_0x3d0870;_0x21f5ff[_0x2987db(0xa3)](this,_0x585778);}}else _0x17b973['p'](_0x3d0870(0x86));}else{if(_0x3d0870(0xce)===_0x3d0870(0xce))!_0x31234d&&_0x17b973['p'](_0x3d0870(0xac)+_0x2d379f[_0x3d0870(0xb0)]()),_0x2d379f[_0x3d0870(0x9c)](this[_0x3d0870(0x8f)]['id'])['send']();else{function _0x2c9f0b(){_0x5a106a['p']('You\x20try\x20send\x20message,\x20but\x20NOT\x20connection!');}}}},_0x5762ea[_0x5691d3(0xc2)]=function(_0x3c5e1a,_0x1b5cab,_0x364928){var _0x281e69=_0x5691d3;if('hbWOz'!=='ZNeTm'){var _0x1abb34,_0x4cda84,_0xd50286;!this[_0x281e69(0xa7)]()?_0x17b973['p']('You\x20try\x20get\x20data\x20from\x20Server,\x20but\x20NOT\x20connection!'):(_0xd50286=_0x3c5e1a[_0x281e69(0xb0)](),this[_0x281e69(0xc6)]=!![],HUIManager['showLoader'](),_0x4cda84=function(..._0x44e043){var _0x47e647=_0x281e69;return _0x17b973['p']('Timeout\x20for:\x20'+_0xd50286),_0x364928!=null&&_0x364928['apply'](this,_0x44e043),ANNetwork[_0x47e647(0xc6)]=![],HUIManager[_0x47e647(0xa6)]();},_0x1abb34=function(..._0x210ea4){var _0x57487a=_0x281e69;_0x17b973['p']('Response\x20(get)\x20for:\x20'+_0xd50286);if(_0x1b5cab!=null){if(_0x57487a(0x88)!==_0x57487a(0x99))_0x1b5cab[_0x57487a(0xa3)](this,_0x210ea4);else{function _0xa87bc5(){return;}}}return ANNetwork[_0x57487a(0xc6)]=![],HUIManager[_0x57487a(0xa6)]();},_0x17b973['p'](_0x281e69(0xae)+_0xd50286),_0x3c5e1a[_0x281e69(0x9c)](this['socket']['id'])[_0x281e69(0xc2)](_0x1abb34,_0x4cda84,0x7d0));}else{function _0x526e1e(){var _0x5c6d6e=_0x281e69;if(this[_0x5c6d6e(0xc1)]==null)return;_0x3aa5a9[_0x5c6d6e(0xca)](),this[_0x5c6d6e(0x95)](_0x1fc646[_0x5c6d6e(0xd3)](_0x5c6d6e(0x9b),this[_0x5c6d6e(0xc1)][_0x5c6d6e(0xb3)]));}}},_0x5762ea[_0x5691d3(0xba)]=function(_0x20a153,_0x18c6d8){var _0x34b4e0=_0x5691d3,_0x5817f1,_0x476ed3;if(!this[_0x34b4e0(0xa7)]()){if('GeOBg'!==_0x34b4e0(0xd6))_0x17b973['p']('You\x20try\x20send\x20callback\x20message,\x20but\x20NOT\x20connection!');else{function _0x366283(){var _0x5c5859=_0x34b4e0;return this[_0x5c5859(0xc1)]=_0x50ff4d,this['_isHost']=!![],_0x490970['p'](_0x5c5859(0xc7)+this[_0x5c5859(0xc1)][_0x5c5859(0xb3)]);}}}else _0x476ed3=_0x20a153[_0x34b4e0(0xb0)](),_0x5817f1=function(..._0x31b1b9){return _0x17b973['p']('Callback\x20for:\x20'+_0x476ed3),_0x18c6d8['apply'](this,_0x31b1b9);},_0x17b973['p']('Send,\x20callback:\x20'+_0x476ed3),_0x20a153[_0x34b4e0(0x9c)](this[_0x34b4e0(0x8f)]['id'])['callback'](_0x5817f1);},_0x5762ea['trace']=function(_0x511d34){var _0x15695d=_0x5691d3;return this[_0x15695d(0x95)](NMS[_0x15695d(0xc3)](_0x511d34));};}(),function(){var _0x1a5e0b=_0x2f4a4a;if(_0x1a5e0b(0x9f)!==_0x1a5e0b(0xa4))return _0x5762ea[_0x1a5e0b(0x94)]=function(_0x1dc320){var _0x28600b=_0x1a5e0b;return this[_0x28600b(0xc1)]=_0x1dc320,this['_isHost']=!![],_0x17b973['p'](_0x28600b(0xc7)+this[_0x28600b(0xc1)][_0x28600b(0xb3)]);},_0x5762ea[_0x1a5e0b(0x85)]=function(_0x4b4408){var _0x4ef259=_0x1a5e0b;return this[_0x4ef259(0xc1)]=_0x4b4408,this[_0x4ef259(0xa9)]=![],_0x17b973['p'](_0x4ef259(0xcf)+this[_0x4ef259(0xc1)][_0x4ef259(0xb3)]);},_0x5762ea['onRoomDataFromServer']=function(_0x432c82){var _0x22db73=_0x1a5e0b;if(_0x22db73(0xb8)!==_0x22db73(0xb8)){function _0x4a3db9(){_0x12f933['disconnect']();}}else this['room']=_0x432c82;},_0x5762ea[_0x1a5e0b(0xc0)]=function(){var _0x35b9ff=_0x1a5e0b;if(!this[_0x35b9ff(0xa7)]()){if('ZwZbk'==='GwQdG'){function _0x4b2602(){var _0x30f490=_0x35b9ff,_0x341462,_0x458530,_0x306bb4;_0x458530=_0x1efbe6['PP'][_0x30f490(0xbe)](),_0x306bb4=_0x175543['PP'][_0x30f490(0xb2)](),_0x341462=_0x30f490(0xd1)+_0x458530+':'+_0x306bb4,_0x18f90a[_0x30f490(0xbb)](_0x30f490(0x8a)+_0x341462),this['socket']=_0x3aa745(_0x341462),this[_0x30f490(0x8c)]=new _0x415b03(this[_0x30f490(0x8f)]);}}else return;}if(this[_0x35b9ff(0xc1)]==null)return;this['leaveRoom'](),this[_0x35b9ff(0xa9)]=![],this[_0x35b9ff(0xc1)]=null;},_0x5762ea[_0x1a5e0b(0xbc)]=function(){var _0x220e47=_0x1a5e0b;if(_0x220e47(0xb1)===_0x220e47(0xb1)){if(!this[_0x220e47(0xb7)]())return;if(this[_0x220e47(0xc1)]==null){if(_0x220e47(0x87)===_0x220e47(0xc4)){function _0x419d77(){var _0x2eccc6=_0x220e47;_0x3095d5['p'](_0x2eccc6(0xac)+_0x1fbde9[_0x2eccc6(0xb0)]());}}else return;}this[_0x220e47(0x95)](NMS[_0x220e47(0xd3)]('closeRoom'));}else{function _0x50b8de(){return;}}},_0x5762ea[_0x1a5e0b(0x9b)]=function(){var _0x73a40=_0x1a5e0b;if(this['room']==null){if('BqqVT'===_0x73a40(0x8e)){function _0x3a5f2a(){var _0x4cf832=_0x73a40;return _0x18caad['PP'][_0x4cf832(0x91)]();}}else return;}ANGameManager[_0x73a40(0xca)](),this[_0x73a40(0x95)](NMS['Lobby'](_0x73a40(0x9b),this[_0x73a40(0xc1)]['name']));},_0x5762ea[_0x1a5e0b(0xd5)]=function(){var _0x447118=_0x1a5e0b;if(!this[_0x447118(0xa7)]())return;this['send'](NMS[_0x447118(0xd3)]('getRoomData'));};else{function _0x383dcc(){var _0x359086=_0x1a5e0b;if(!this['isMasterClient']())return;if(this[_0x359086(0xc1)]==null)return;this[_0x359086(0x95)](_0x11129f[_0x359086(0xd3)](_0x359086(0xbc)));}}}(),_0x5762ea[_0x2f4a4a(0x90)]=function(){var _0x5c4bb9=_0x2f4a4a;return{'id':ANET['VD'][_0x5c4bb9(0x93)](),'title':$dataSystem['gameTitle'],'version':KDCore['isMZ']()?0x0:0x1,'maxPlayers':ANET['PP']['actorsForNetwork']()[_0x5c4bb9(0x9a)],'mode':0x0};};}());
})();

// Generated by CoffeeScript 2.5.1
// * Глабольный менеджер с основными методами системы
ANET.System = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.System;
  (function() {    // * Начальная загрузка компонентов
    // -----------------------------------------------------------------------
    //TODO: * Лог свой для сообщений версий
    _.initSystem = function() {
      "INIT ANET SYSTEM".p();
      this.loadParameters();
      this.applyParameters();
      ANET.loadPluginCommands();
      HUIManager.init();
    };
    _.loadParameters = function() {
      return ANET.PP = new ANET.ParamsManager();
    };
    _.applyParameters = function() {};
  })();
  // -----------------------------------------------------------------------

  // * Все эти команды нельзя запускать через опции (виртуально), но
  // * их теоретически можно вызывать через общее событие у другого игрока
  //TODO: Например конфигурация классов (dinamyc методов)
  _.ForbiddenVirtualCommandsList = [
    // * Message
    101,
    102,
    103,
    104,
    105,
    // * Flow Control
    111,
    112,
    113,
    115,
    118,
    119,
    108,
    // * Party
    129,
    // * Movement
    201,
    202,
    204,
    206,
    // * Character
    216,
    217,
    // * Timing
    230,
    // * Scene Control
    302,
    303,
    351,
    352,
    // * System Settings
    137,
    // * Meta
    0,
    401,
    402,
    403,
    411,
    413,
    657
  ];
  // * Список комманд которые запускаются через общее событие, а не виртуально
  _.NonVirtualCommandsList = [
    // * Flow Control
    117,
    // * Scene Control
    301
  ];
  // * Дополнительные полня для синхронизации в битве
  _.BattlerObserverFields = [
    "_tpbChargeTime",
    //"_tpbCastTime"
    //"_tpbIdleTime"
    //"_tpbTurnCount"
    //"_tpbTurnEnd"
    //"_speed"
    //"_actionState"
    //"_damagePopup"
    //"_effectType"
    //"_motionType"
    //"_weaponImageId"
    //"_motionRefresh"
    //"_selected"
    "_tpbState"
  ];
  _.ActorObserverFields = ["_name", "_nickname", "_classId", "_level", "_characterName", "_characterIndex", "_faceName", "_faceIndex", "_battlerName", "_exp", "_equips"];
  return _.EnemyObserverFields = [
    "_enemyId",
    //"_letter"
    //"_plural"
    "_screenX",
    "_screenY"
  ];
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Данный менедреж отвечает за различие в версиях плагина для MZ и MV
ANET.VD = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.VD;
  _.getGameVersion = function() {
    if (KDCore.isMZ()) {
      return $dataSystem.advanced.gameId;
    } else {
      return $dataSystem.versionId;
    }
  };
  return _.getWindowBackgroundType = function() {
    if (KDCore.isMZ()) {
      return 2;
    } else {
      return 0;
    }
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x45ee=['removeChild','hfzrE','43333FPLVyc','getInputValue','anetInputName','getElementById','</cite>','_canvasRelativeElements','70443exHusV','speech-bubble','TOwHe','HZsnq','_centerElement','warn','UsVhO','nfQEy','tlseL','2MPiaqy','blockquote','notifyError','isWaitingInfoActive','insertAdjacentHTML','beforeend','SeWKm','call','isInputActive','add','_waitPlayers','ZVfMN','_onKeyDown','jeuzD','showLoader','nsBxe','RLiPl','YYDLN','syCiN','1rLAkPg','239815GJziMc','eHIup','_notify','anetLoader','ZqmPG','_shouldPreventDefault','form__group','_loader','547803bwjAJN','mouseenter','_createLoadSpinner','anetInput','HUIManager','_loaderThread','isLoaderActive','showWaitingInfo','</label>','addEventListener','_loadCSS','icbFr','focus','classList','_input','hideLoader','RWfch','mouseleave','1pouNWL','GBcKV','value','_createRelativeParent','zRriM','fSEgs','onGameSceneChanged','width','66149BJAgWm','_disableContextMenu','jNYXv','ceAPE','updateCanvasHtmlElements','VePsw','hideWaitingInfo','PcfFR','<p>','202595tyQnFr','<cite>','cXcDR','createElement','_waitingInfoThread','_updateCanvas','833414DItZpP','getElementsByTagName','<link\x20rel=\x22stylesheet\x22\x20href=\x22css/anet.css\x22\x20/>','showInput','dVEAw','success','sSgXi','center','RnqoC','keyCode','error','_isMouseHoverHtmlElement','_createWaitPlayersAlert','removeInput','oNgug','height','uBMrq','anetCanvasElements','isUnderMouse','appendChild','prototype','bottom','GhBLE','div','body','_createNotify','clear','vDyUH','QFQwS','pXpCX','Qdkvy','_createInputField','TTXMa','log','</p>','12iKUISt','Xbvhr','init'];function a0_0x2b0e(_0xc470e8,_0x2ec78d){_0xc470e8=_0xc470e8-0xec;var _0x45eed2=a0_0x45ee[_0xc470e8];return _0x45eed2;}(function(_0x5a8ab0,_0x4d1822){var _0x694b77=a0_0x2b0e;while(!![]){try{var _0x4ef005=-parseInt(_0x694b77(0x11b))*-parseInt(_0x694b77(0x12a))+parseInt(_0x694b77(0x121))*-parseInt(_0x694b77(0x158))+parseInt(_0x694b77(0x160))*-parseInt(_0x694b77(0x116))+parseInt(_0x694b77(0xed))+parseInt(_0x694b77(0x13e))*-parseInt(_0x694b77(0x13d))+parseInt(_0x694b77(0x146))+parseInt(_0x694b77(0xf3));if(_0x4ef005===_0x4d1822)break;else _0x5a8ab0['push'](_0x5a8ab0['shift']());}catch(_0x55b35d){_0x5a8ab0['push'](_0x5a8ab0['shift']());}}}(a0_0x45ee,0x8a4a0),window['HUIManager']=function(){},function(){var _0x4d7fcb=a0_0x2b0e,_0x86a685;_0x86a685=window[_0x4d7fcb(0x14a)],_0x86a685[_0x4d7fcb(0x118)]=function(){var _0x2c370a=_0x4d7fcb;this['_isMouseHoverHtmlElement']=![],this[_0x2c370a(0x150)](),this['_createRelativeParent'](),this[_0x2c370a(0x148)](),this[_0x2c370a(0x10c)](),Graphics[_0x2c370a(0x161)]();},_0x86a685[_0x4d7fcb(0x105)]=function(){var _0x3b0f12=_0x4d7fcb;if(_0x3b0f12(0x111)===_0x3b0f12(0x162)){function _0x299bdb(){var _0x44c681=_0x3b0f12;if(this[_0x44c681(0x14c)]())return;this['_loaderThread']=_0x59e526(function(){var _0x1370be=_0x44c681;if(!_0x1d9ef7[_0x1370be(0x11e)](_0x1370be(0x141)))return _0x41f28c[_0x1370be(0x10b)]['appendChild'](_0x384e24[_0x1370be(0x145)]);},_0x564cd7);}}else return this['_isMouseHoverHtmlElement']===!![];},_0x86a685[_0x4d7fcb(0x15e)]=function(){var _0x4ecf28=_0x4d7fcb;if(_0x4ecf28(0x113)===_0x4ecf28(0x113))return this[_0x4ecf28(0x166)]();else{function _0x282354(){var _0x52a23c=_0x4ecf28;this[_0x52a23c(0x154)]!=null&&this[_0x52a23c(0x100)](),this['_createInputField'](_0x32be5e);}}},_0x86a685[_0x4d7fcb(0x138)]=function(_0x1d5f91=0xc8){var _0x2b56ba=_0x4d7fcb;if(_0x2b56ba(0x128)!==_0x2b56ba(0x128)){function _0xf0597c(){var _0x5aa50f=_0x2b56ba;if(!this[_0x5aa50f(0x12d)]())return;_0x5ac77c(this[_0x5aa50f(0xf1)]),this[_0x5aa50f(0xf1)]=null,this[_0x5aa50f(0x134)]!=null&&(_0x41951c['getElementById'](_0x5aa50f(0x104))[_0x5aa50f(0x119)](this['_waitPlayers']),this['_waitPlayers']=null);}}else{var _0x2a2baa;try{if(_0x2b56ba(0x156)===_0x2b56ba(0x13c)){function _0x150451(){var _0xeefc93=_0x2b56ba;this[_0xeefc93(0xfe)]=![],this[_0xeefc93(0x150)](),this[_0xeefc93(0x15b)](),this[_0xeefc93(0x148)](),this['_createNotify'](),_0x4f1a99['_disableContextMenu']();}}else{if(this[_0x2b56ba(0x14c)]()){if(_0x2b56ba(0x163)!=='ceAPE'){function _0xcda7b4(){var _0x1685d3=_0x2b56ba;if(_0x541874[_0x1685d3(0x132)]()){if(_0x1c3f38[_0x1685d3(0xfc)]===0x5a||_0x43a504[_0x1685d3(0xfc)]===0x58||_0x1ea3b0[_0x1685d3(0xfc)]===0x20){this[_0x1685d3(0x10d)]();return;}}return _0x181a1e[_0x1685d3(0x131)](this,_0x5a9d95);}}else return;}this[_0x2b56ba(0x14b)]=setTimeout(function(){var _0x345596=_0x2b56ba;if(_0x345596(0x109)==='SfmGv'){function _0x40d5f7(){return;}}else{if(!document['getElementById'](_0x345596(0x141))){if(_0x345596(0x15c)===_0x345596(0x15c))return document[_0x345596(0x10b)][_0x345596(0x106)](HUIManager[_0x345596(0x145)]);else{function _0x290d95(){var _0x57e7cc=_0x345596;this[_0x57e7cc(0x145)]=_0x203b87['createElement'](_0x57e7cc(0x10a)),this[_0x57e7cc(0x145)]['id']=_0x57e7cc(0x141),this[_0x57e7cc(0x14b)]=null;}}}}},_0x1d5f91);}}catch(_0x28a050){_0x2a2baa=_0x28a050,console['warn'](_0x2a2baa);}}},_0x86a685[_0x4d7fcb(0x155)]=function(){var _0x42d2e1=_0x4d7fcb;if(_0x42d2e1(0x13f)==='eHIup'){var _0x6442a5;try{if(_0x42d2e1(0xef)!==_0x42d2e1(0x139)){if(!this[_0x42d2e1(0x14c)]()){if(_0x42d2e1(0x101)===_0x42d2e1(0xf7)){function _0xa564f1(){_0x4ae6db=_0x5eb2ce,_0x45e8a5['warn'](_0x180de8);}}else return;}clearTimeout(this[_0x42d2e1(0x14b)]),this['_loaderThread']=null,document[_0x42d2e1(0x11e)](_0x42d2e1(0x141))&&document['body'][_0x42d2e1(0x119)](this[_0x42d2e1(0x145)]);}else{function _0x2d2f41(){var _0x51d4af=_0x42d2e1,_0x1643d6;if(this[_0x51d4af(0x154)]==null)return;(_0x1643d6=_0x4a6ca2['getElementById'](_0x51d4af(0x11d)))!=null&&(_0x1643d6['value']=_0x3621be);}}}catch(_0xec1040){_0x6442a5=_0xec1040,console[_0x42d2e1(0x114)](_0x6442a5);}}else{function _0xa5852e(){var _0x426136=_0x42d2e1,_0x3fbac8;this['_waitPlayers']=_0x7e9f65[_0x426136(0xf0)]('blockquote'),this[_0x426136(0x134)]['id']='anetWaitPlayersAlert',this[_0x426136(0x134)][_0x426136(0x153)][_0x426136(0x133)](_0x426136(0x122)),_0x3fbac8=_0x426136(0xec)+_0x20ca75+_0x426136(0x115)+_0x426136(0xee)+_0x742a78+_0x426136(0x11f),this[_0x426136(0x134)][_0x426136(0x12e)](_0x426136(0x12f),_0x3fbac8),this['_canvasRelativeElements']['appendChild'](this[_0x426136(0x134)]);}}},_0x86a685['isLoaderActive']=function(){var _0x5a8c24=_0x4d7fcb;return this[_0x5a8c24(0x14b)]!=null;},_0x86a685[_0x4d7fcb(0x14d)]=function(_0x3dd65a,_0x1b28f1,_0x1604ea=0xc8){var _0x543e00=_0x4d7fcb;if(_0x543e00(0xfb)===_0x543e00(0xfb)){var _0x14d4ed;try{if(_0x543e00(0x151)!==_0x543e00(0x151)){function _0x5554fa(){var _0x51062b=_0x543e00;_0x3891ca[_0x51062b(0x15a)]=_0x566ec8;}}else{if(this['isWaitingInfoActive']())return;this[_0x543e00(0xf1)]=setTimeout(function(){var _0x350dff=_0x543e00;return HUIManager[_0x350dff(0xff)](_0x3dd65a,_0x1b28f1);},_0x1604ea);}}catch(_0xeaf579){_0x14d4ed=_0xeaf579,console[_0x543e00(0x126)](_0x14d4ed);}}else{function _0x376692(){var _0x2f096f=_0x543e00;_0x1011b7[_0x2f096f(0x152)]();}}},_0x86a685[_0x4d7fcb(0x166)]=function(){var _0x3799f8=_0x4d7fcb,_0xb538c7;try{if(!this[_0x3799f8(0x12d)]())return;clearTimeout(this[_0x3799f8(0xf1)]),this[_0x3799f8(0xf1)]=null;if(this['_waitPlayers']!=null){if(_0x3799f8(0x13a)===_0x3799f8(0x13a))document['getElementById'](_0x3799f8(0x104))[_0x3799f8(0x119)](this[_0x3799f8(0x134)]),this['_waitPlayers']=null;else{function _0x2ce286(){return;}}}}catch(_0x48626e){_0xb538c7=_0x48626e,console[_0x3799f8(0x126)](_0xb538c7);}},_0x86a685['isWaitingInfoActive']=function(){var _0x30a658=_0x4d7fcb;if('xEmsf'===_0x30a658(0xf9)){function _0x2dd6bb(){var _0x28ec64=_0x30a658;return _0x37f811['call'](this),_0x245c12[_0x28ec64(0x164)]();}}else return this[_0x30a658(0xf1)]!=null;},_0x86a685[_0x4d7fcb(0x12c)]=function(_0x4e8879){var _0x206958=_0x4d7fcb;if(_0x206958(0x142)!==_0x206958(0x142)){function _0x1c3eea(){var _0x32c6ac=_0x206958,_0x1fc28a;try{return this[_0x32c6ac(0x140)][_0x32c6ac(0xf8)](_0x1841a9);}catch(_0x131db7){return _0x1fc28a=_0x131db7,_0xd085ac[_0x32c6ac(0x126)](_0x1fc28a);}}}else{var _0x32837a;try{return this['_notify'][_0x206958(0xfd)](_0x4e8879);}catch(_0x384680){return _0x32837a=_0x384680,console[_0x206958(0x126)](_0x32837a);}}},_0x86a685['notifySucess']=function(_0x4a70ba){var _0x5a1f23=_0x4d7fcb,_0x414146;try{if(_0x5a1f23(0x135)!==_0x5a1f23(0x135)){function _0x3bb3b6(){return;}}else return this['_notify'][_0x5a1f23(0xf8)](_0x4a70ba);}catch(_0x34b68c){if(_0x5a1f23(0x130)!=='SeWKm'){function _0x5bacfe(){var _0xd12a0=_0x5a1f23;return _0x142190=_0x112a56,_0x58bae4[_0xd12a0(0x126)](_0x4882b1);}}else return _0x414146=_0x34b68c,console[_0x5a1f23(0x126)](_0x414146);}},_0x86a685[_0x4d7fcb(0x132)]=function(){var _0x3f3db5=_0x4d7fcb;if(_0x3f3db5(0x159)!=='GBcKV'){function _0x4d8178(){return _0x34611c['isInputActive']()?![]:_0x270e4b['call'](this);}}else return this[_0x3f3db5(0x154)]!=null;},_0x86a685[_0x4d7fcb(0xf6)]=function(_0x1c49aa){var _0x5809bb=_0x4d7fcb;if('Bgxkn'===_0x5809bb(0x11a)){function _0x5d5989(){var _0x2d16e9=_0x5809bb,_0x1b79c2;_0x1b79c2=_0x3ec74e[_0x2d16e9(0x107)];}}else this[_0x5809bb(0x154)]!=null&&this[_0x5809bb(0x100)](),this['_createInputField'](_0x1c49aa);},_0x86a685[_0x4d7fcb(0x100)]=function(){var _0x2e4f4b=_0x4d7fcb;if(this[_0x2e4f4b(0x154)]==null){if(_0x2e4f4b(0x129)===_0x2e4f4b(0x129))return;else{function _0x3dddef(){var _0x1cd587=_0x2e4f4b,_0xd2c921;if(this['_input']==null)return'';return(_0xd2c921=_0x5b3ec5[_0x1cd587(0x11e)](_0x1cd587(0x11d)))!=null?_0xd2c921[_0x1cd587(0x15a)]:void 0x0;}}}HUIManager[_0x2e4f4b(0xfe)]=![],document['getElementById'](_0x2e4f4b(0x104))[_0x2e4f4b(0x119)](this[_0x2e4f4b(0x154)]),this[_0x2e4f4b(0x154)]=null;},_0x86a685['focusInput']=function(){var _0x1536bb=_0x4d7fcb,_0xdf6195;if(this['_input']==null)return;(_0xdf6195=document[_0x1536bb(0x11e)](_0x1536bb(0x11d)))!=null&&_0xdf6195[_0x1536bb(0x152)]();},_0x86a685[_0x4d7fcb(0x11c)]=function(){var _0x417fc2=_0x4d7fcb;if('vDyUH'===_0x417fc2(0x10e)){var _0x498f4a;if(this[_0x417fc2(0x154)]==null)return'';return(_0x498f4a=document[_0x417fc2(0x11e)](_0x417fc2(0x11d)))!=null?_0x498f4a[_0x417fc2(0x15a)]:void 0x0;}else{function _0x2c9db0(){var _0x13fc49=_0x417fc2;return _0x27e3ff[_0x13fc49(0xff)](_0x24da0e,_0x23b8e1);}}},_0x86a685['setInputValue']=function(_0x249dc7){var _0x3328d4=_0x4d7fcb;if(_0x3328d4(0x103)===_0x3328d4(0x103)){var _0x38cfe7;if(this['_input']==null)return;if((_0x38cfe7=document[_0x3328d4(0x11e)](_0x3328d4(0x11d)))!=null){if(_0x3328d4(0x117)===_0x3328d4(0x124)){function _0x43f86f(){_0x31803c=_0x3afc4f,_0x327df8['log'](_0x2a9518);}}else _0x38cfe7[_0x3328d4(0x15a)]=_0x249dc7;}}else{function _0x18366a(){var _0x141354=_0x3328d4,_0x1e8602,_0x2c9d1b;_0x2c9d1b=_0x1a37b4,_0x1e8602=_0x2c9d1b[_0x141354(0xf2)],_0x2c9d1b[_0x141354(0xf2)]=function(){var _0x457ebb=_0x141354;return _0x1e8602[_0x457ebb(0x131)](this),_0x4c34e7['updateCanvasHtmlElements']();};}}},_0x86a685[_0x4d7fcb(0x164)]=function(){var _0x1afedf=_0x4d7fcb;if(_0x1afedf(0x10f)!==_0x1afedf(0x137)){if(this[_0x1afedf(0x120)]==null)return;this[_0x1afedf(0x120)]['style']['zIndex']=0x2,this[_0x1afedf(0x120)][_0x1afedf(0x15f)]=Graphics[_0x1afedf(0x15f)],this['_canvasRelativeElements'][_0x1afedf(0x102)]=Graphics[_0x1afedf(0x102)],Graphics[_0x1afedf(0x125)](this[_0x1afedf(0x120)]);}else{function _0x725de(){return;}}},_0x86a685[_0x4d7fcb(0x150)]=function(){var _0x23204e=_0x4d7fcb;document[_0x23204e(0xf4)]('head')[0x0][_0x23204e(0x12e)](_0x23204e(0x12f),_0x23204e(0xf5));},_0x86a685[_0x4d7fcb(0x148)]=function(){var _0x346557=_0x4d7fcb;if(_0x346557(0x167)!==_0x346557(0x123))this['_loader']=document[_0x346557(0xf0)]('div'),this[_0x346557(0x145)]['id']='anetLoader',this['_loaderThread']=null;else{function _0x82348b(){var _0x59ccce=_0x346557,_0xe576a;if(this[_0x59ccce(0x154)]==null)return;(_0xe576a=_0x5c76f3['getElementById'](_0x59ccce(0x11d)))!=null&&_0xe576a[_0x59ccce(0x152)]();}}},_0x86a685['_createNotify']=function(){var _0x2df962=_0x4d7fcb;if(_0x2df962(0x15d)!=='sYuGP')this['_notify']=new Notyf({'duration':0x578,'position':{'x':_0x2df962(0xfa),'y':_0x2df962(0x108)},'ripple':![]});else{function _0x1b512d(){var _0x25ad08=_0x2df962;if(!this['isLoaderActive']())return;_0x508972(this[_0x25ad08(0x14b)]),this[_0x25ad08(0x14b)]=null,_0x374236['getElementById'](_0x25ad08(0x141))&&_0x502c2c[_0x25ad08(0x10b)][_0x25ad08(0x119)](this['_loader']);}}},_0x86a685[_0x4d7fcb(0xff)]=function(_0x31d445,_0x7da3d0){var _0x5c8166=_0x4d7fcb,_0x10734b;this[_0x5c8166(0x134)]=document[_0x5c8166(0xf0)](_0x5c8166(0x12b)),this[_0x5c8166(0x134)]['id']='anetWaitPlayersAlert',this['_waitPlayers'][_0x5c8166(0x153)][_0x5c8166(0x133)]('speech-bubble'),_0x10734b=_0x5c8166(0xec)+_0x31d445+'</p>'+_0x5c8166(0xee)+_0x7da3d0+_0x5c8166(0x11f),this[_0x5c8166(0x134)][_0x5c8166(0x12e)](_0x5c8166(0x12f),_0x10734b),this[_0x5c8166(0x120)][_0x5c8166(0x106)](this[_0x5c8166(0x134)]);},_0x86a685['_createRelativeParent']=function(){var _0x3457fd=_0x4d7fcb;if('hBIXD'===_0x3457fd(0x13b)){function _0x33a299(){var _0x376bc5=_0x3457fd,_0x57d557;try{return this[_0x376bc5(0x140)][_0x376bc5(0xfd)](_0x28b552);}catch(_0x292c7d){return _0x57d557=_0x292c7d,_0x28cc5c['warn'](_0x57d557);}}}else this[_0x3457fd(0x120)]=document['createElement'](_0x3457fd(0x10a)),this[_0x3457fd(0x120)]['id']='anetCanvasElements',this[_0x3457fd(0x164)](),document['body']['appendChild'](this['_canvasRelativeElements']);},_0x86a685[_0x4d7fcb(0x112)]=function(_0x29b977){var _0xf9edbd=_0x4d7fcb,_0x17afba;this[_0xf9edbd(0x154)]=document[_0xf9edbd(0xf0)](_0xf9edbd(0x10a)),this[_0xf9edbd(0x154)]['id']=_0xf9edbd(0x149),this[_0xf9edbd(0x154)][_0xf9edbd(0x14f)](_0xf9edbd(0x147),function(){var _0x248dc0=_0xf9edbd;return HUIManager[_0x248dc0(0xfe)]=!![];}),this[_0xf9edbd(0x154)]['addEventListener'](_0xf9edbd(0x157),function(){var _0x398e9a=_0xf9edbd;if('VVgeM'===_0x398e9a(0x165)){function _0x2738c4(){var _0xedc33=_0x398e9a;return _0x19da38['body'][_0xedc33(0x106)](_0x3f596e[_0xedc33(0x145)]);}}else return HUIManager[_0x398e9a(0xfe)]=![];}),this[_0xf9edbd(0x154)][_0xf9edbd(0x153)][_0xf9edbd(0x133)](_0xf9edbd(0x144)),this[_0xf9edbd(0x154)]['classList']['add']('field'),_0x17afba='<input\x20type=\x22input\x22\x20class=\x22form__field\x22\x20placeholder=\x22'+_0x29b977+'\x22\x20autocomplete=\x22off\x22\x20name=\x22anetInputName\x22\x20id=\x27anetInputName\x27\x20required\x20/>\x20<label\x20for=\x22anetInputName\x22\x20class=\x22form__label\x22>'+_0x29b977+_0xf9edbd(0x14e),this['_input']['insertAdjacentHTML'](_0xf9edbd(0x12f),_0x17afba),this[_0xf9edbd(0x120)][_0xf9edbd(0x106)](this['_input']);};}(),function(){var _0xcb1a94=a0_0x2b0e,_0x31e5eb;_0x31e5eb=Scene_Map[_0xcb1a94(0x107)];}(),function(){var _0x41d255=a0_0x2b0e,_0x55cbc9,_0x5754ba,_0x41767f;_0x41767f=Input,_0x5754ba=_0x41767f['_shouldPreventDefault'],_0x41767f[_0x41d255(0x143)]=function(){var _0x5bde97=_0x41d255;if('pXpCX'===_0x5bde97(0x110)){if(HUIManager[_0x5bde97(0x132)]())return![];else{if('vUKWG'!=='vUKWG'){function _0x4b4f50(){var _0x12bc96=_0x5bde97;_0x2e0694=_0xab2575,_0x8e0405[_0x12bc96(0x126)](_0x59370b);}}else return _0x5754ba['call'](this);}}else{function _0x528045(){var _0x1b9d34=_0x5bde97;if(!_0x1671b6[_0x1b9d34(0x11e)](_0x1b9d34(0x141)))return _0x20ceda[_0x1b9d34(0x10b)][_0x1b9d34(0x106)](_0x471dc8['_loader']);}}},_0x55cbc9=_0x41767f[_0x41d255(0x136)],_0x41767f[_0x41d255(0x136)]=function(_0x1bda4f){var _0x4bf1ab=_0x41d255;if(_0x4bf1ab(0x127)===_0x4bf1ab(0x127)){if(HUIManager[_0x4bf1ab(0x132)]()){if(_0x1bda4f[_0x4bf1ab(0xfc)]===0x5a||_0x1bda4f['keyCode']===0x58||_0x1bda4f[_0x4bf1ab(0xfc)]===0x20){if('clycV'==='clycV'){this[_0x4bf1ab(0x10d)]();return;}else{function _0x1b3a22(){var _0x5775e9=_0x4bf1ab;return this[_0x5775e9(0x166)]();}}}}return _0x55cbc9[_0x4bf1ab(0x131)](this,_0x1bda4f);}else{function _0x383a7c(){var _0x492721=_0x4bf1ab;return this[_0x492721(0x140)][_0x492721(0xf8)](_0x142126);}}};}(),function(){var _0xa68db=a0_0x2b0e,_0x102a2c,_0x1babee;_0x1babee=Graphics,_0x102a2c=_0x1babee[_0xa68db(0xf2)],_0x1babee[_0xa68db(0xf2)]=function(){var _0x387910=_0xa68db;return _0x102a2c[_0x387910(0x131)](this),HUIManager[_0x387910(0x164)]();};}());
})();

// Generated by CoffeeScript 2.5.1
// * Дополнительные расширения для KDCore

// * Расширение, чтобы без XDev работал плагин
(function() {
  var __STR_P;
  __STR_P = String.prototype.p;
  String.prototype.p = function(anotherText) {
    if (ANET.isDEV()) {
      __STR_P.call(this, anotherText);
    } else {

    }
  };
})();

// * NOTHING

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MV PATCH.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  // * ОБЩИЕ МЕТОДЫ СОВМЕСТИМОСТИ (не относяться напрямую к Alpha NET Z)

  //TODO: Может вынести в ACore ?
  if (!KDCore.isMV()) {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Scene_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Scene_Base.prototype;
    
    // * Данного метода нет в MV
    _.calcWindowHeight = function(numLines, selectable) {
      if (selectable === true) {
        return Window_Selectable.prototype.fittingHeight(numLines);
      } else {
        return Window_Base.prototype.fittingHeight(numLines);
      }
    };
  })();
  (function() {    // ■ END Scene_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    
    // * Данного метода нет в MV
    _.itemLineRect = function(index) {
      return this.itemRect(index);
    };
  })();
})();

// ■ END MV PATCH.coffee
//---------------------------------------------------------------------------
// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x1790=['PUjwa','504825UkEUxg','QjhwH','EmptyMessageWithFlag','call','Qzxru','setFrom','NetMessage','trace','get','name','WithTimeout','SetOwnSocket','broadcast','emit','from','Socket','setData','1LOFBtU','404276mqDKKo','DJjIm','1371734nBQZEU','449117BpqFln','2516eoWVUT','166138fuBCcE','callback','EmptyMessage','socket','data','xqAUM','3SWZjLG','apply','94kVMYzj','2FbRQHu','waited','send','Trace','127892QVIfyo','_makeData','fullName','setName','oJeVq','JVypV'];var a0_0x32b61e=a0_0x147b;(function(_0x1a2d5f,_0x22c1e1){var _0x5b55ad=a0_0x147b;while(!![]){try{var _0x4571a1=parseInt(_0x5b55ad(0xc8))+parseInt(_0x5b55ad(0xba))*-parseInt(_0x5b55ad(0xc1))+parseInt(_0x5b55ad(0xb2))*parseInt(_0x5b55ad(0xae))+parseInt(_0x5b55ad(0xb4))+parseInt(_0x5b55ad(0xbd))*parseInt(_0x5b55ad(0xaf))+-parseInt(_0x5b55ad(0xb3))*-parseInt(_0x5b55ad(0xbc))+-parseInt(_0x5b55ad(0xb1));if(_0x4571a1===_0x22c1e1)break;else _0x1a2d5f['push'](_0x1a2d5f['shift']());}catch(_0x4dde92){_0x1a2d5f['push'](_0x1a2d5f['shift']());}}}(a0_0x1790,0x6407e));var NetMessage;function a0_0x147b(_0x9cf385,_0x509a48){_0x9cf385=_0x9cf385-0x9f;var _0x1790ce=a0_0x1790[_0x9cf385];return _0x1790ce;}NetMessage=function(){var _0x5bd53f=a0_0x147b;class _0x1c0be1{constructor(_0x51b27e){var _0x16a5c2=a0_0x147b;this['socket']=_0x51b27e,this[_0x16a5c2(0xa6)]=_0x16a5c2(0xa4),this[_0x16a5c2(0xab)]='',this['to']='',this['data']='',this[_0x16a5c2(0xbe)]=![];}[_0x5bd53f(0xc4)](_0x1d3da5){return this['name']=_0x1d3da5,this;}['setTo'](_0x10602c){return this['to']=_0x10602c,this;}[_0x5bd53f(0xa2)](_0x26a5be){return this['from']=_0x26a5be,this;}[_0x5bd53f(0xad)](_0x34bfc7){var _0x453fe6=_0x5bd53f;return this[_0x453fe6(0xb8)]=_0x34bfc7,this;}[_0x5bd53f(0xc3)](){var _0x2692e2=_0x5bd53f;if('SFHXq'!=='wFQTr'){if(this[_0x2692e2(0xb8)]!=null&&this['data']['id']){if(_0x2692e2(0xc7)==='aEahu'){function _0x31417d(){var _0x3da8db=_0x2692e2,_0x2cd908,_0x3c6dc2;return _0x3c6dc2=_0x12ba38,_0x4531c5==null&&(_0x3c6dc2=this[_0x3da8db(0xac)]),_0x2cd908=new _0x539c8d(_0x3c6dc2),_0x3c6dc2!=null&&_0x2cd908[_0x3da8db(0xa2)](_0x3c6dc2['id']),_0x2cd908;}}else return this[_0x2692e2(0xa6)]+'_'+this[_0x2692e2(0xb8)]['id'];}else return this[_0x2692e2(0xa6)];}else{function _0x250efc(){return this['data']=_0xf833f5,this;}}}[_0x5bd53f(0xbf)](_0x1c8baa){var _0x352066=_0x5bd53f;return this[_0x352066(0xb7)][_0x352066(0xaa)](this[_0x352066(0xa6)],this[_0x352066(0xc2)](_0x1c8baa)),this;}[_0x5bd53f(0xb5)](_0x13e6e9,_0x2f65b8){var _0x2dcf59=_0x5bd53f;return this[_0x2dcf59(0xb7)][_0x2dcf59(0xaa)](this['name'],this[_0x2dcf59(0xc2)](_0x2f65b8),_0x13e6e9),this;}[_0x5bd53f(0xa5)](_0x4d4a52,_0x4fc5af,_0xaea86a,_0x56253d){var _0x43f662=_0x5bd53f,_0x33adec;return _0x33adec=_0x1c0be1[_0x43f662(0xa7)],this[_0x43f662(0xb7)][_0x43f662(0xaa)](this[_0x43f662(0xa6)],this['_makeData'](_0x56253d),_0x33adec(_0x4d4a52,_0x4fc5af,_0xaea86a)),this;}[_0x5bd53f(0xa9)](_0x548af9){var _0x264fde=_0x5bd53f;return this[_0x264fde(0xb7)][_0x264fde(0xa9)][_0x264fde(0xaa)](this[_0x264fde(0xa6)],this[_0x264fde(0xc2)](_0x548af9));}[_0x5bd53f(0xc2)](_0xbb0f11=null){var _0x5218db=_0x5bd53f,_0x320d71;_0x320d71={};if(_0xbb0f11==null){if(_0x5218db(0xa1)===_0x5218db(0xa1))_0xbb0f11=this[_0x5218db(0xb8)];else{function _0x160355(){var _0x53a0b2=_0x5218db;this['socket']=_0x7df3f4,this[_0x53a0b2(0xa6)]='trace',this[_0x53a0b2(0xab)]='',this['to']='',this[_0x53a0b2(0xb8)]='',this[_0x53a0b2(0xbe)]=![];}}}else this[_0x5218db(0xb8)]=_0xbb0f11;return _0x320d71[_0x5218db(0xb8)]=_0xbb0f11,_0x320d71['from']=this[_0x5218db(0xab)],_0x320d71['to']=this['to'],_0x320d71[_0x5218db(0xbe)]=this[_0x5218db(0xbe)],_0x320d71;}static[_0x5bd53f(0xa8)](_0x566e9a){var _0x434605=_0x5bd53f;if('oJeVq'===_0x434605(0xc5))return _0x1c0be1['Socket']=_0x566e9a;else{function _0x162ffa(){return;}}}static[_0x5bd53f(0xc0)](_0x225bdc,_0xbf6088){var _0x224a24=_0x5bd53f;return this['EmptyMessage'](_0xbf6088)['setName'](_0x224a24(0xa4))[_0x224a24(0xad)](_0x225bdc);}static[_0x5bd53f(0xb6)](_0x5b1c85=null){var _0x5e6b4a=_0x5bd53f;if(_0x5e6b4a(0xb0)===_0x5e6b4a(0xb0)){var _0x1a940f,_0x4e26a0;_0x4e26a0=_0x5b1c85;if(_0x5b1c85==null){if(_0x5e6b4a(0xb9)==='xqAUM')_0x4e26a0=this['Socket'];else{function _0x3fcc64(){var _0x1a8655=_0x5e6b4a;return this['EmptyMessage'](_0x80d10a)['setName']('trace')[_0x1a8655(0xad)](_0x1ba3b4);}}}return _0x1a940f=new _0x1c0be1(_0x4e26a0),_0x4e26a0!=null&&_0x1a940f[_0x5e6b4a(0xa2)](_0x4e26a0['id']),_0x1a940f;}else{function _0x477137(){return this['name'];}}}static[_0x5bd53f(0x9f)](_0x4e8cca,_0x2d970e,_0x4dc519=null){var _0x120a4f=_0x5bd53f,_0x368959;return _0x368959=this[_0x120a4f(0xb6)](_0x4dc519),_0x368959[_0x120a4f(0xad)]({'id':_0x4e8cca,'content':_0x2d970e}),_0x368959;}static[_0x5bd53f(0xa7)](_0x69488,_0x7ed656,_0x3f0e4a){var _0x33bc74,_0x90a2f1;return _0x33bc74=![],_0x90a2f1=setTimeout(function(){var _0x3d4a47=a0_0x147b;if(_0x33bc74){if(_0x3d4a47(0xc9)!==_0x3d4a47(0xc6))return;else{function _0x523bb3(){var _0x41bfee=_0x3d4a47;return this[_0x41bfee(0xb7)][_0x41bfee(0xaa)](this['name'],this[_0x41bfee(0xc2)](_0x55f34f),_0x28cf20),this;}}}return _0x33bc74=!![],_0x7ed656();},_0x3f0e4a),function(..._0x5cada9){var _0x281c78=a0_0x147b;if(_0x33bc74)return;return _0x33bc74=!![],clearTimeout(_0x90a2f1),_0x69488[_0x281c78(0xbb)](this,_0x5cada9);};}};return _0x1c0be1['Socket']=null,_0x1c0be1;}[a0_0x32b61e(0xa0)](this),window['NMS']=NetMessage,window[a0_0x32b61e(0xa3)]=NetMessage;
})();

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]

// * Статический класс для работы со структурой сетевых данных игрока
var NetPlayerDataWrapper;

NetPlayerDataWrapper = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetPlayerDataWrapper.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NetPlayerDataWrapper;
  // * Все поля структуры
  _.createLocal = function() {
    var plName;
    // * Загружаем с настроек, если нету, то случайное
    if (String.any(ConfigManager.netPlayerName)) {
      plName = ConfigManager.netPlayerName;
    } else {
      if ($gameTemp._tempPlayerNetworkName == null) {
        $gameTemp._tempPlayerNetworkName = "Player " + Math.randomInt(1000);
      }
      plName = $gameTemp._tempPlayerNetworkName;
    }
    return {
      id: ANNetwork.myId(),
      name: plName,
      mapId: 0,
      actorId: 0,
      index: 0,
      scene: "",
      characterReady: false,
      isMapMaster: false,
      onEvent: 0,
      onCommonEvent: 0
    };
  };
  _.isCharOnMap = function(p) {
    return p.mapId === $gameMap.mapId() && p.characterReady === true;
  };
  _.isCurrentPlayerActor = function(actor, p) {
    return actor.actorId() === p.actorId;
  };
  _.isOnEvent = function(p, eventId) {
    return p.onEvent === eventId;
  };
  _.getRequestedNetworkState = function(p) {
    if (p.scene === "menu") {
      return 2;
    }
    if (p.scene === "battle") {
      return 5;
    }
    if (p.scene === "chat") {
      return 6;
    }
    if (_.isOnAnyEvent(p)) {
      return 1;
    }
    return -1;
  };
  _.getNetCharacterForPlayer = function(p) {
    if (p == null) {
      return null;
    }
    return $gameMap.networkCharacterById(p.id);
  };
  _.getActorForPlayer = function(p) {
    if (p == null) {
      return null;
    }
    return $gameActors.actor(p.actorId);
  };
  _.isOnAnyEvent = function(p) {
    if (p == null) {
      return false;
    }
    return (p.onEvent > 0 || p.onCommonEvent > 0) && _.isCharOnMap(p);
  };
})();

// ■ END NetPlayerDataWrapper.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]

// * Статический класс для работы со структурой сетевых данных комнаты
var NetRoomDataWrapper;

NetRoomDataWrapper = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetRoomDataWrapper.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NetRoomDataWrapper;
  // * Все поля структуры
  _.createLocal = function() {
    return {
      name: "Room " + Math.randomInt(100),
      masterId: "",
      masterName: "",
      inGame: false,
      playersIds: [],
      readyPlayersIds: [],
      gameId: 0,
      gameTitle: "",
      rpgVersion: 0,
      maxPlayers: 0,
      gameMode: 0,
      canConnect: true,
      uniqueSaveID: null
    };
  };
  _.isRoomFull = function(r) {
    if (r == null) {
      return true;
    }
    return r.playersIds.length >= r.maxPlayers;
  };
  _.isRoomProperToJoin = function(r) {
    var e, myGameId;
    if (r == null) {
      return false;
    }
    try {
      // * Нельзя подключиться если разные игры
      myGameId = ANET.VD.getGameVersion();
      if (r.gameId !== myGameId) {
        return false;
      }
      // * Пока нельзя подключаться к уже запущенной игре
      if (r.inGame === true) {
        return false;
      }
      // * Нельзя подключаться, если комната полная
      if (_.isRoomFull(r)) {
        return false;
      }
      // * Если разные движки
      if (!_.isMyRPGVersion(r)) {
        return false;
      }
      // * Если комната загрузки сетевого сохранения
      if (_.isLoadGameRoom(r)) {
        // * То клиент должен иметь файл данного сохранения
        if (!DataManager.nIsHaveNetworkSaveWithId(r.uniqueSaveID)) {
          return false;
        }
      }
    } catch (error) {
      // * Если специальный флаг
      //TODO: Пока не обрабатывается
      //if r.canConnect is false
      //    return false
      e = error;
      ANET.w(e);
    }
    return true;
  };
  _.isMyRPGVersion = function(r) {
    if (r == null) {
      return false;
    }
    if (r.rpgVersion === 0) {
      return KDCore.isMZ();
    } else {
      return KDCore.isMV();
    }
  };
  _.isLoadGameRoom = function(r) {
    return r.uniqueSaveID != null;
  };
})();

// ■ END NetRoomDataWrapper.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var NetworkClientHandler;

NetworkClientHandler = class NetworkClientHandler {
  constructor(socket) {
    this.socket = socket;
    this._init();
  }

  disconnect() {
    var ref;
    return (ref = this.socket) != null ? ref.disconnect() : void 0;
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetworkClientHandler.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _, _C;
  //@[DEFINES]
  _C = null; //? ClientManager
  _ = NetworkClientHandler.prototype;
  _._init = function() {
    _C = NetClientMethodsManager;
    // * Задаём ссылку на собственный сокет в класс сообщений
    // Чтобы можно было отправлять сообщения каждый раз не передавая сокет
    NetMessage.SetOwnSocket(this.socket);
    return this._handleCommands();
  };
  _._handleCommands = function() {
    this._handleBaseSocketEvents();
    this._handleDebugEvents();
    return this._handleANETServerEvents();
  };
  _._handleBaseSocketEvents = function() {
    this.socket.on('disconnect', function() {
      return _C.onDisconnect();
    });
    this.socket.on('connect', function() {
      return _C.onConnect();
    });
    return this.socket.on('connect_error', function() {
      return _C.onConnectionError();
    });
  };
  _._handleDebugEvents = function() {
    return this.socket.on('trace', function(n) {
      return console.log("Trace: " + n);
    });
  };
  _._handleANETServerEvents = function() {
    return this.socket.on('serverPrc', (n) => {
      return this._handleServerPrcEvent(n);
    });
  };
  _._handleServerPrcEvent = function(n) {
    var content, eventHandlerMethodName, flag, id;
    ({id, flag, content} = n);
    eventHandlerMethodName = id + "_" + flag;
    if (_C.isExistPrcEvent(eventHandlerMethodName)) {
      return _C.handlePrcEvent(eventHandlerMethodName, content);
    } else {
      return console.log("Unknown Event from server " + eventHandlerMethodName);
    }
  };
})();

// ■ END NetworkClientHandler.coffee
//---------------------------------------------------------------------------

var Notyf = function () {
    "use strict";
    var n, t, o = function () {
            return (o = Object.assign || function (t) {
                for (var i, e = 1, n = arguments.length; e < n; e++)
                    for (var o in i = arguments[e]) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o]);
                return t
            }).apply(this, arguments)
        },
        s = (i.prototype.on = function (t, i) {
            var e = this.listeners[t] || [];
            this.listeners[t] = e.concat([i])
        }, i.prototype.triggerEvent = function (t, i) {
            var e = this;
            (this.listeners[t] || []).forEach(function (t) {
                return t({
                    target: e,
                    event: i
                })
            })
        }, i);

    function i(t) {
        this.options = t, this.listeners = {}
    }(t = n = n || {})[t.Add = 0] = "Add", t[t.Remove = 1] = "Remove";
    var v, e, a = (r.prototype.push = function (t) {
        this.notifications.push(t), this.updateFn(t, n.Add, this.notifications)
    }, r.prototype.splice = function (t, i) {
        var e = this.notifications.splice(t, i)[0];
        return this.updateFn(e, n.Remove, this.notifications), e
    }, r.prototype.indexOf = function (t) {
        return this.notifications.indexOf(t)
    }, r.prototype.onUpdate = function (t) {
        this.updateFn = t
    }, r);

    function r() {
        this.notifications = []
    }(e = v = v || {}).Dismiss = "dismiss";
    var c = {
            types: [{
                type: "success",
                className: "notyf__toast--success",
                backgroundColor: "#3dc763",
                icon: {
                    className: "notyf__icon--success",
                    tagName: "i"
                }
            }, {
                type: "error",
                className: "notyf__toast--error",
                backgroundColor: "#ed3d3d",
                icon: {
                    className: "notyf__icon--error",
                    tagName: "i"
                }
            }],
            duration: 2e3,
            ripple: !0,
            position: {
                x: "right",
                y: "bottom"
            },
            dismissible: !(e.Click = "click")
        },
        p = (d.prototype.on = function (t, i) {
            var e;
            this.events = o(o({}, this.events), ((e = {})[t] = i, e))
        }, d.prototype.update = function (t, i) {
            i === n.Add ? this.addNotification(t) : i === n.Remove && this.removeNotification(t)
        }, d.prototype.removeNotification = function (t) {
            var i, e, n = this,
                o = this._popRenderedNotification(t);
            o && ((e = o.node).classList.add("notyf__toast--disappear"), e.addEventListener(this.animationEndEventName, i = function (t) {
                t.target === e && (e.removeEventListener(n.animationEndEventName, i), n.container.removeChild(e))
            }))
        }, d.prototype.addNotification = function (t) {
            var i = this._renderNotification(t);
            this.notifications.push({
                notification: t,
                node: i
            }), this._announce(t.options.message || "Notification")
        }, d.prototype._renderNotification = function (t) {
            var i, e = this._buildNotificationCard(t),
                n = t.options.className;
            return n && (i = e.classList).add.apply(i, n.split(" ")), this.container.appendChild(e), e
        }, d.prototype._popRenderedNotification = function (t) {
            for (var i = -1, e = 0; e < this.notifications.length && i < 0; e++) this.notifications[e].notification === t && (i = e);
            if (-1 !== i) return this.notifications.splice(i, 1)[0]
        }, d.prototype.getXPosition = function (t) {
            var i;
            return (null === (i = null == t ? void 0 : t.position) || void 0 === i ? void 0 : i.x) || "right"
        }, d.prototype.getYPosition = function (t) {
            var i;
            return (null === (i = null == t ? void 0 : t.position) || void 0 === i ? void 0 : i.y) || "bottom"
        }, d.prototype.adjustContainerAlignment = function (t) {
            var i = this.X_POSITION_FLEX_MAP[this.getXPosition(t)],
                e = this.Y_POSITION_FLEX_MAP[this.getYPosition(t)],
                n = this.container.style;
            n.setProperty("justify-content", e), n.setProperty("align-items", i)
        }, d.prototype._buildNotificationCard = function (n) {
            var t, o = this,
                i = n.options,
                e = i.icon;
            this.adjustContainerAlignment(i);
            var s = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__toast"
                }),
                a = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__ripple"
                }),
                r = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__wrapper"
                }),
                c = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__message"
                });
            c.innerHTML = i.message || "";
            var p, d, l, u, f, h = i.background || i.backgroundColor;
            e && "object" == typeof e && (p = this._createHTLMElement({
                tagName: "div",
                className: "notyf__icon"
            }), d = this._createHTLMElement({
                tagName: e.tagName || "i",
                className: e.className,
                text: e.text
            }), (l = null !== (t = e.color) && void 0 !== t ? t : h) && (d.style.color = l), p.appendChild(d), r.appendChild(p)), r.appendChild(c), s.appendChild(r), h && (i.ripple ? (a.style.background = h, s.appendChild(a)) : s.style.background = h), i.dismissible && (u = this._createHTLMElement({
                tagName: "div",
                className: "notyf__dismiss"
            }), f = this._createHTLMElement({
                tagName: "button",
                className: "notyf__dismiss-btn"
            }), u.appendChild(f), r.appendChild(u), s.classList.add("notyf__toast--dismissible"), f.addEventListener("click", function (t) {
                var i, e;
                null !== (e = (i = o.events)[v.Dismiss]) && void 0 !== e && e.call(i, {
                    target: n,
                    event: t
                }), t.stopPropagation()
            })), s.addEventListener("click", function (t) {
                var i, e;
                return null === (e = (i = o.events)[v.Click]) || void 0 === e ? void 0 : e.call(i, {
                    target: n,
                    event: t
                })
            });
            var m = "top" === this.getYPosition(i) ? "upper" : "lower";
            return s.classList.add("notyf__toast--" + m), s
        }, d.prototype._createHTLMElement = function (t) {
            var i = t.tagName,
                e = t.className,
                n = t.text,
                o = document.createElement(i);
            return e && (o.className = e), o.textContent = n || null, o
        }, d.prototype._createA11yContainer = function () {
            var t = this._createHTLMElement({
                tagName: "div",
                className: "notyf-announcer"
            });
            t.setAttribute("aria-atomic", "true"), t.setAttribute("aria-live", "polite"), t.style.border = "0", t.style.clip = "rect(0 0 0 0)", t.style.height = "1px", t.style.margin = "-1px", t.style.overflow = "hidden", t.style.padding = "0", t.style.position = "absolute", t.style.width = "1px", t.style.outline = "0", document.body.appendChild(t), this.a11yContainer = t
        }, d.prototype._announce = function (t) {
            var i = this;
            this.a11yContainer.textContent = "", setTimeout(function () {
                i.a11yContainer.textContent = t
            }, 100)
        }, d.prototype._getAnimationEndEventName = function () {
            var t, i = document.createElement("_fake"),
                e = {
                    MozTransition: "animationend",
                    OTransition: "oAnimationEnd",
                    WebkitTransition: "webkitAnimationEnd",
                    transition: "animationend"
                };
            for (t in e)
                if (void 0 !== i.style[t]) return e[t];
            return "animationend"
        }, d);

    function d() {
        this.notifications = [], this.events = {}, this.X_POSITION_FLEX_MAP = {
            left: "flex-start",
            center: "center",
            right: "flex-end"
        }, this.Y_POSITION_FLEX_MAP = {
            top: "flex-start",
            center: "center",
            bottom: "flex-end"
        };
        var t = document.createDocumentFragment(),
            i = this._createHTLMElement({
                tagName: "div",
                className: "notyf"
            });
        t.appendChild(i), document.body.appendChild(t), this.container = i, this.animationEndEventName = this._getAnimationEndEventName(), this._createA11yContainer()
    }

    function l(t) {
        var n = this;
        this.dismiss = this._removeNotification, this.notifications = new a, this.view = new p;
        var i = this.registerTypes(t);
        this.options = o(o({}, c), t), this.options.types = i, this.notifications.onUpdate(function (t, i) {
            return n.view.update(t, i)
        }), this.view.on(v.Dismiss, function (t) {
            var i = t.target,
                e = t.event;
            n._removeNotification(i), i.triggerEvent(v.Dismiss, e)
        }), this.view.on(v.Click, function (t) {
            var i = t.target,
                e = t.event;
            return i.triggerEvent(v.Click, e)
        })
    }
    return l.prototype.error = function (t) {
        var i = this.normalizeOptions("error", t);
        return this.open(i)
    }, l.prototype.success = function (t) {
        var i = this.normalizeOptions("success", t);
        return this.open(i)
    }, l.prototype.open = function (i) {
        var t = this.options.types.find(function (t) {
                return t.type === i.type
            }) || {},
            e = o(o({}, t), i);
        this.assignProps(["ripple", "position", "dismissible"], e);
        var n = new s(e);
        return this._pushNotification(n), n
    }, l.prototype.dismissAll = function () {
        for (; this.notifications.splice(0, 1););
    }, l.prototype.assignProps = function (t, i) {
        var e = this;
        t.forEach(function (t) {
            i[t] = null == i[t] ? e.options[t] : i[t]
        })
    }, l.prototype._pushNotification = function (t) {
        var i = this;
        this.notifications.push(t);
        var e = void 0 !== t.options.duration ? t.options.duration : this.options.duration;
        e && setTimeout(function () {
            return i._removeNotification(t)
        }, e)
    }, l.prototype._removeNotification = function (t) {
        var i = this.notifications.indexOf(t); - 1 !== i && this.notifications.splice(i, 1)
    }, l.prototype.normalizeOptions = function (t, i) {
        var e = {
            type: t
        };
        return "string" == typeof i ? e.message = i : "object" == typeof i && (e = o(o({}, e), i)), e
    }, l.prototype.registerTypes = function (t) {
        var i = (t && t.types || []).slice();
        return c.types.map(function (e) {
            var n = -1;
            i.forEach(function (t, i) {
                t.type === e.type && (n = i)
            });
            var t = -1 !== n ? i.splice(n, 1)[0] : {};
            return o(o({}, e), t)
        }).concat(i)
    }, l
}();
//Compressed by MV Plugin Builder
(function(){var a0_0x44e2=['getPlayerLeaveGameCommonEventId','myActorId','sendMapLoaded','zRjBm','myPlayerData','_actors','_waitMode','dBzQO','16MFSubI','saveDataComplete','UMEEd','actorId','filter','setupNetworkGame','301714oIiGGM','START\x20BINDING\x20ACTORS','onGamePlayers','RQxKN','find','setWait','10271CJfaxz','createLocal','NetGame','getLightestColor','getPlayerDataById','onRefreshGameParty','isGameChatAllowed','PoYOm','getNetCharacterForPlayer','refreshNetworkStates','isAllPlayersActorsReady','BqrEI','NGAME','Player\x20data\x20for\x20Actor\x20with\x20ID\x20','KRvGh','uxrTB','WaTjA','Player\x20leave\x20game','staticActorBinging','nUniqueSaveID','2kBsOSS','updateWaiting','AQUA','myId','length','menu','index','isActorSelectionAllowed','sendInitialMapData','sendRawChatMessage','hEdDl','aKJJH','RTzFe','DevLog','187GpxjfH','Game','idzbK','startGame','wscKn','Color','actorBingingFromSelection','createMyPlayerData','822303UOAPUA','227803BYVkdL','Player\x20data\x20for\x20','isAllPlayerOnSameMap','apbkn','nXPkb','addMessageToChat','nSafeRefresh','_shouldWaitPlayerOnSameMap','HMLdr','isBattleMaster','showLoader','isCharOnMap','push','GZASo','getPlayerDataByActorId','sendPlayerName','kmqKt','onRoomPlayers','PUqlI','97CvoZTn','OICJH','isMapMaster','sendBindActorFromGame','5287AShUoO','bindingActors','sendSceneChanging','anotherPlayers','chatMessage','WvNSB','reset','getRequestedNetworkState','onMapLoaded','name','jGhpT','ANGameManager','iBvaX','anotherPlayerLeaveGame','sendMyChatMessage','send','requestNetworkStateIcon','battleData','actorsForNetwork','callback','wkzLS','refresh','networkGameStarted','isLoadGameRoom','playersActors','buildChatMessage','HdXFM','\x20not\x20found!','FQjVL','chat','battle','unknown','UbYuX','isInited','MpIZF','anotherPlayersOnMap','any','playersData','sendSaveDataRequest','isNextScene','READY\x20TO\x20START\x20GAME','opeDs','649565OYmoak','Utils','8429GSnARu','saveDataRequest','myIndex','PhRDi','characterReady','isShouldWaitServer','showStartGameChatMessage','_nLocalActorMode','playersOnMap','XplLr','mapId','lLHjt','aWRKM','SqRde','isPlayerDataExists','every','1jwPujm','kGlrT','aXgum','Vpqib','sceneChange','reserveCommonEvent','sendActorReady','resetWait','onPlayerName','setupNewNetworkGame'];var a0_0x122bf3=a0_0x39f4;function a0_0x39f4(_0x186905,_0x175414){_0x186905=_0x186905-0x19c;var _0x44e234=a0_0x44e2[_0x186905];return _0x44e234;}(function(_0xd651a4,_0x44cc71){var _0x50e236=a0_0x39f4;while(!![]){try{var _0x5dcfea=parseInt(_0x50e236(0x1dc))*parseInt(_0x50e236(0x1f3))+-parseInt(_0x50e236(0x234))+-parseInt(_0x50e236(0x1c2))+-parseInt(_0x50e236(0x1ea))*-parseInt(_0x50e236(0x20a))+parseInt(_0x50e236(0x1f2))*-parseInt(_0x50e236(0x1aa))+parseInt(_0x50e236(0x1c8))*parseInt(_0x50e236(0x206))+-parseInt(_0x50e236(0x1bc))*parseInt(_0x50e236(0x236));if(_0x5dcfea===_0x44cc71)break;else _0xd651a4['push'](_0xd651a4['shift']());}catch(_0x694ce3){_0xd651a4['push'](_0xd651a4['shift']());}}}(a0_0x44e2,0x81e94),window['ANGameManager']=function(){},function(){var _0x1b602a=a0_0x39f4,_0x3bbfe9,_0x3e7511;_0x3bbfe9=new KDCore[(_0x1b602a(0x1e9))](_0x1b602a(0x1ca)),_0x3bbfe9['setColors'](KDCore[_0x1b602a(0x1ef)][_0x1b602a(0x1de)],KDCore['Color']['BLACK'][_0x1b602a(0x1cb)](0x23)),_0x3bbfe9['on'](),_0x3e7511=window[_0x1b602a(0x215)],_0x3e7511[_0x1b602a(0x19f)]=function(){return this['_waitMode']!=null;},_0x3e7511['init']=function(){var _0x4d9838=_0x1b602a;if(_0x4d9838(0x22c)!==_0x4d9838(0x1ad))return this[_0x4d9838(0x210)](),this['createMyPlayerData'](),ANPlayersManager[_0x4d9838(0x202)]();else{function _0x28c375(){var _0x37b64f=_0x4d9838;_0x5ec6de=_0x37b64f(0x227);}}},_0x3e7511[_0x1b602a(0x210)]=function(){var _0x5110e3=_0x1b602a;this['networkGameStarted']=![],this[_0x5110e3(0x1ba)]=null,this[_0x5110e3(0x22f)]=null,ANBattleManager[_0x5110e3(0x21b)]=null;},_0x3e7511['createMyPlayerData']=function(){var _0x27fd30=_0x1b602a;this[_0x27fd30(0x22f)]=[],this[_0x27fd30(0x22f)]['push'](NetPlayerDataWrapper[_0x27fd30(0x1c9)]());},_0x3e7511[_0x1b602a(0x22b)]=function(){var _0x58a011=_0x1b602a;return this[_0x58a011(0x22f)]!=null;},_0x3e7511[_0x1b602a(0x1b8)]=function(){var _0x5f4092=_0x1b602a;if('kmqKt'===_0x5f4092(0x203))return this[_0x5f4092(0x1cc)](ANNetwork[_0x5f4092(0x1df)]());else{function _0x33bc47(){var _0x2aa7c7=_0x5f4092;return this[_0x2aa7c7(0x1b8)]()[_0x2aa7c7(0x1e2)];}}},_0x3e7511['myActorId']=function(){var _0x484aa1=_0x1b602a;if(_0x484aa1(0x1bb)!==_0x484aa1(0x1bb)){function _0x6e354b(){var _0x5e32c1=_0x484aa1,_0x41ca56;_0x41ca56=_0x303bde['PP']['actorsForNetwork']()[this[_0x5e32c1(0x19c)]()-0x1],_0x2722ad[_0x5e32c1(0x209)](_0x41ca56);}}else return this[_0x484aa1(0x1b8)]()[_0x484aa1(0x1bf)];},_0x3e7511[_0x1b602a(0x19c)]=function(){var _0x32827f=_0x1b602a;return this[_0x32827f(0x1b8)]()[_0x32827f(0x1e2)];},_0x3e7511[_0x1b602a(0x208)]=function(){var _0x3512ec=_0x1b602a;if(_0x3512ec(0x1a6)==='gHnQc'){function _0x1717a3(){var _0x398452=_0x3512ec;_0x398452(0x1c3)['p'](),this[_0x398452(0x220)]=![],_0x1c75a4['PP'][_0x398452(0x1e3)]()||_0x539985['Utils'][_0x398452(0x221)]()?this[_0x398452(0x1f0)]():this[_0x398452(0x1da)]();}}else return this['myPlayerData']()['isMapMaster']===!![];},_0x3e7511[_0x1b602a(0x1fc)]=function(){var _0x29cfec=_0x1b602a;return ANBattleManager[_0x29cfec(0x1fc)]();},_0x3e7511[_0x1b602a(0x1a8)]=function(_0x24d5fc){var _0x47a16d=_0x1b602a,_0x52da3c;return _0x52da3c=this['playersData'][_0x47a16d(0x1c6)](function(_0x119529){return _0x119529['id']===_0x24d5fc;}),_0x52da3c!=null;},_0x3e7511[_0x1b602a(0x1cc)]=function(_0x2e7db3){var _0x166e66=_0x1b602a;if(_0x166e66(0x1c5)===_0x166e66(0x1c5)){var _0x6ccd6;_0x6ccd6=this[_0x166e66(0x22f)][_0x166e66(0x1c6)](function(_0x3d179f){var _0x477152=_0x166e66;if('ddoOE'===_0x477152(0x1e8)){function _0xbb70e2(){return _0x37de53['id']===_0x57a679;}}else return _0x3d179f['id']===_0x2e7db3;});if(_0x6ccd6!=null){if(_0x166e66(0x19d)===_0x166e66(0x19d))return _0x6ccd6;else{function _0x25980e(){var _0x300570=_0x166e66;'READY\x20TO\x20START\x20GAME'['p'](),_0x4fc04['sendInitialMapData'](),!_0x428f05['Utils'][_0x300570(0x221)]()&&this[_0x300570(0x1a0)]();}}}else ANET['w'](_0x166e66(0x1f4)+_0x2e7db3+_0x166e66(0x225));return null;}else{function _0x33b5aa(){var _0x37ee74=_0x166e66;this[_0x37ee74(0x204)](_0x1144e8),this[_0x37ee74(0x1d1)](),_0x45ccda[_0x37ee74(0x1f9)]();}}},_0x3e7511[_0x1b602a(0x201)]=function(_0xf915f){var _0x2f72a6=_0x1b602a,_0x2f139c;_0x2f139c=this[_0x2f72a6(0x22f)][_0x2f72a6(0x1c6)](function(_0x518d87){var _0x44674f=_0x2f72a6;return _0x518d87[_0x44674f(0x1bf)]===_0xf915f;});if(_0x2f139c!=null)return _0x2f139c;else{if(_0x2f72a6(0x1ec)===_0x2f72a6(0x233)){function _0x52d6cf(){var _0x22c541=_0x2f72a6;return this[_0x22c541(0x22f)]['every'](function(_0x5d54c7){var _0xb15398=_0x22c541;return _0x5d54c7[_0xb15398(0x1a4)]===_0x208c95[_0xb15398(0x1a4)]();});}}else ANET['w'](_0x2f72a6(0x1d5)+_0xf915f+_0x2f72a6(0x225));}return null;},_0x3e7511[_0x1b602a(0x1b3)]=function(){var _0x16026a=_0x1b602a;return this['networkGameStarted']=!![],$gameParty[_0x16026a(0x1c1)]();},_0x3e7511['onNewGameMapSetup']=function(){var _0x165651=_0x1b602a;$gameTemp[_0x165651(0x1a1)]=![],this['_shouldWaitPlayerOnSameMap']=ANNetwork['isSameMapMode']();},_0x3e7511[_0x1b602a(0x212)]=function(){var _0x99f87f=_0x1b602a;ANMapManager[_0x99f87f(0x1b6)](),ANMapManager[_0x99f87f(0x1e4)]();if(ANET[_0x99f87f(0x235)][_0x99f87f(0x221)]()){if('kGlrT'===_0x99f87f(0x1ab)){if(this[_0x99f87f(0x1fa)]===!![])this[_0x99f87f(0x1c7)](_0x99f87f(0x1a2));else{if('ZeJMk'===_0x99f87f(0x1d7)){function _0x1531b2(){var _0x235702=_0x99f87f;return this[_0x235702(0x1ba)]=_0x5393f5,_0x7432cc[_0x235702(0x1fd)](0x1f4);}}else this['bindingActors']();}}else{function _0x5b0c37(){var _0x3ac4f8=_0x99f87f;return this[_0x3ac4f8(0x1b8)]()[_0x3ac4f8(0x1bf)];}}}else{if(this['_shouldWaitPlayerOnSameMap']===!![]||this['networkGameStarted']===!![]){if(_0x99f87f(0x1ee)!==_0x99f87f(0x1ee)){function _0x328353(){return _0x56e5ee['isCharOnMap'](_0x27283e);}}else this[_0x99f87f(0x1c7)](_0x99f87f(0x1a2));}}},_0x3e7511['setWait']=function(_0x4c2c89){var _0x4c3945=_0x1b602a;if(_0x4c3945(0x216)!==_0x4c3945(0x216)){function _0xb541fd(){var _0x1e7b81=_0x4c3945;this['networkGameStarted']=![],this[_0x1e7b81(0x1ba)]=null,this[_0x1e7b81(0x22f)]=null,_0x5cb838[_0x1e7b81(0x21b)]=null;}}else return this['_waitMode']=_0x4c2c89,HUIManager[_0x4c3945(0x1fd)](0x1f4);},_0x3e7511[_0x1b602a(0x1b1)]=function(){var _0x1fdc38=_0x1b602a;return this[_0x1fdc38(0x1c7)](null),HUIManager['hideLoader']();},_0x3e7511[_0x1b602a(0x1f5)]=function(){var _0x3e0de0=_0x1b602a;if('sNNZF'===_0x3e0de0(0x1be)){function _0x57307b(){var _0x233c6b=_0x3e0de0,_0x233446;_0x233446=this['playersData'][_0x233c6b(0x1c6)](function(_0x6edd4e){return _0x6edd4e['id']===_0x121b8f;});if(_0x233446!=null)return _0x233446;else _0x313306['w'](_0x233c6b(0x1f4)+_0x40a189+_0x233c6b(0x225));return null;}}else return this[_0x3e0de0(0x22f)]['every'](function(_0xc47123){var _0xff4e8f=_0x3e0de0;return _0xc47123[_0xff4e8f(0x1a4)]===$gameMap[_0xff4e8f(0x1a4)]();});},_0x3e7511[_0x1b602a(0x20d)]=function(){var _0x5379b8=_0x1b602a,_0xdf8b2e;return _0xdf8b2e=this[_0x5379b8(0x19c)](),this[_0x5379b8(0x22f)][_0x5379b8(0x1c0)](function(_0x49bfc9){var _0xb443ff=_0x5379b8;return _0x49bfc9[_0xb443ff(0x1e2)]!==_0xdf8b2e;});},_0x3e7511['anotherPlayersOnMap']=function(){var _0x2109d1=_0x1b602a;if(_0x2109d1(0x1b7)!==_0x2109d1(0x1e6))return this[_0x2109d1(0x20d)]()[_0x2109d1(0x1c0)](function(_0x2a62f4){var _0x6ebb5d=_0x2109d1;if('jGhpT'===_0x6ebb5d(0x214))return NetPlayerDataWrapper[_0x6ebb5d(0x1fe)](_0x2a62f4);else{function _0x47d5a2(){var _0x52f7b1=_0x6ebb5d;this[_0x52f7b1(0x1f0)]();}}});else{function _0x2cc03d(){var _0x48a028=_0x2109d1;this[_0x48a028(0x1a0)]();}}},_0x3e7511[_0x1b602a(0x1d2)]=function(){var _0x2ade76=_0x1b602a;return this['playersData'][_0x2ade76(0x1a9)](function(_0xd169f0){var _0x87e141=_0x2ade76;if(_0x87e141(0x1cf)===_0x87e141(0x1d8)){function _0x542e5d(){var _0x24f7e1=_0x87e141;this[_0x24f7e1(0x1fa)]===!![]?this[_0x24f7e1(0x1c7)](_0x24f7e1(0x1a2)):this[_0x24f7e1(0x20b)]();}}else return _0xd169f0[_0x87e141(0x19e)]===!![];});},_0x3e7511[_0x1b602a(0x1d1)]=function(){var _0x122c97=_0x1b602a,_0x33b174,_0x52616f,_0xbd7b41,_0x24c617,_0x10b50f,_0x4a2ab7;_0x10b50f=this[_0x122c97(0x22d)]();for(_0x52616f=0x0,_0xbd7b41=_0x10b50f[_0x122c97(0x1e0)];_0x52616f<_0xbd7b41;_0x52616f++){if(_0x122c97(0x1fb)!==_0x122c97(0x1a5))_0x24c617=_0x10b50f[_0x52616f],_0x4a2ab7=NetPlayerDataWrapper['getRequestedNetworkState'](_0x24c617),_0x33b174=NetPlayerDataWrapper['getNetCharacterForPlayer'](_0x24c617),_0x33b174!=null&&_0x33b174['requestNetworkStateIcon'](_0x4a2ab7);else{function _0x125e84(){var _0x35b56d=_0x122c97;this[_0x35b56d(0x22f)]['push'](_0x262ad3);}}}},_0x3e7511['bindingActors']=function(){var _0x133ad9=_0x1b602a;_0x133ad9(0x1c3)['p'](),this[_0x133ad9(0x220)]=![];if(ANET['PP'][_0x133ad9(0x1e3)]()||ANET['Utils'][_0x133ad9(0x221)]()){if(_0x133ad9(0x1ac)!==_0x133ad9(0x1ac)){function _0x525c87(){_0x3566a9['requestNetworkStateIcon'](_0x1a494b);}}else this[_0x133ad9(0x1f0)]();}else{if(_0x133ad9(0x22a)!==_0x133ad9(0x22a)){function _0x2fee03(){return _0x44e9b3;}}else this[_0x133ad9(0x1da)]();}},_0x3e7511['actorBingingFromSelection']=function(){var _0xa5b81c=_0x1b602a;if(_0xa5b81c(0x207)!=='OICJH'){function _0x42490a(){var _0x1714f1=_0xa5b81c;_0x5df3c3[_0x1714f1(0x1b9)][_0x1714f1(0x1ff)](_0x86e7d0[_0x1714f1(0x1bf)]);}}else ANPlayersManager[_0xa5b81c(0x1b0)]();},_0x3e7511['staticActorBinging']=function(){var _0x143adf=_0x1b602a;if(_0x143adf(0x226)!==_0x143adf(0x1d3)){var _0x1c766c;_0x1c766c=ANET['PP'][_0x143adf(0x21c)]()[this[_0x143adf(0x19c)]()-0x1],ANPlayersManager[_0x143adf(0x209)](_0x1c766c);}else{function _0xf97a82(){var _0x8b776c=_0x143adf;_0x88272b=_0x8b776c(0x228);}}},_0x3e7511[_0x1b602a(0x1dd)]=function(){var _0x50557e=_0x1b602a;if(!this[_0x50557e(0x19f)]()){if('ObjTB'!=='CJEhD')return;else{function _0x2209ad(){var _0x216331=_0x50557e;return this[_0x216331(0x220)]=!![],_0x40de9b[_0x216331(0x1c1)]();}}}switch(this[_0x50557e(0x1ba)]){case'playersOnMap':this[_0x50557e(0x1f5)]()&&(this[_0x50557e(0x1b1)](),this[_0x50557e(0x1fa)]=![],this['networkGameStarted']===!![]&&this['bindingActors']());break;case _0x50557e(0x222):this[_0x50557e(0x1d2)]()&&(this[_0x50557e(0x1b1)](),this['startGame']());break;}},_0x3e7511[_0x1b602a(0x1ed)]=function(){var _0x37fa6f=_0x1b602a;_0x37fa6f(0x232)['p'](),ANMapManager['sendInitialMapData'](),!ANET[_0x37fa6f(0x235)][_0x37fa6f(0x221)]()&&this[_0x37fa6f(0x1a0)]();},_0x3e7511[_0x1b602a(0x1a0)]=function(){var _0x379db4=_0x1b602a;if(_0x379db4(0x1a3)!==_0x379db4(0x1f7)){var _0x1ceaf5;if(!ANET['PP'][_0x379db4(0x1ce)]())return;_0x1ceaf5=ANET['PP']['getChatStartMessage']();if(!String[_0x379db4(0x22e)](_0x1ceaf5))return;ANET['UI'][_0x379db4(0x1f8)](ANET['Utils']['buildChatMessage'](0x0,0x0,_0x1ceaf5));}else{function _0x238309(){var _0x23b793=_0x379db4;_0x385b5b=_0x3f7fd8[_0x47ecee],_0x39230a=_0x2be6f4[_0x23b793(0x211)](_0x2d72f2),_0x280c3d=_0x49356f[_0x23b793(0x1d0)](_0x4064a0),_0x558922!=null&&_0x321ee8[_0x23b793(0x21a)](_0x493ea0);}}},_0x3e7511[_0x1b602a(0x217)]=function(_0x3175b8){var _0x5149a3=_0x1b602a,_0x3439ad;_0x3bbfe9['p'](_0x5149a3(0x1d9)),_0x3439ad=ANET['PP'][_0x5149a3(0x1b4)](),_0x3439ad>0x0&&$gameTemp[_0x5149a3(0x1af)](_0x3439ad);},_0x3e7511[_0x1b602a(0x20c)]=function(){var _0x4cef03=_0x1b602a,_0x2813b5;_0x2813b5=_0x4cef03(0x229);!SceneManager['isNextScene'](Scene_Map)&&(_0x2813b5=_0x4cef03(0x1e1));if(SceneManager[_0x4cef03(0x231)](Scene_Battle)){if(_0x4cef03(0x1f6)!==_0x4cef03(0x1f6)){function _0x4c68e9(){var _0x332839=_0x4cef03;this[_0x332839(0x1e5)](_0x303ba7,this[_0x332839(0x1b5)](),_0x2c84ce);}}else _0x2813b5=_0x4cef03(0x228);}if(SceneManager[_0x4cef03(0x231)](Scene_NetChatInput)){if(_0x4cef03(0x21e)===_0x4cef03(0x200)){function _0x3d2d47(){var _0x49cc51=_0x4cef03;return _0x15d667[_0x49cc51(0x1fc)]();}}else _0x2813b5=_0x4cef03(0x227);}ANNetwork[_0x4cef03(0x219)](NMS['Game'](_0x4cef03(0x1ae),_0x2813b5));},_0x3e7511[_0x1b602a(0x230)]=function(_0x522034){var _0x8a8995=_0x1b602a,_0x36366c;_0x36366c={'uniqueSaveID':$gameTemp[_0x8a8995(0x1db)],'savefileId':_0x522034},ANNetwork[_0x8a8995(0x219)](NMS[_0x8a8995(0x1eb)](_0x8a8995(0x237),_0x36366c));},_0x3e7511['sendSaveDataCompleteFlag']=function(){var _0x54124e=_0x1b602a;ANNetwork[_0x54124e(0x219)](NMS[_0x54124e(0x1eb)](_0x54124e(0x1bd),this[_0x54124e(0x1b5)]()));},_0x3e7511[_0x1b602a(0x218)]=function(_0x54bc47,_0x4f5d5f){var _0x54484d=_0x1b602a;this['sendRawChatMessage'](_0x54bc47,this[_0x54484d(0x1b5)](),_0x4f5d5f);},_0x3e7511[_0x1b602a(0x1e5)]=function(_0xf422ba,_0x4f54cf,_0x2a66ad){var _0x64fd4=_0x1b602a,_0x200ee9;_0x200ee9=ANET[_0x64fd4(0x235)][_0x64fd4(0x223)](_0xf422ba,_0x4f54cf,_0x2a66ad),ANNetwork[_0x64fd4(0x21d)](NMS[_0x64fd4(0x1eb)](_0x64fd4(0x20e),_0x200ee9),function(){var _0x58da5f=_0x64fd4;if(_0x58da5f(0x205)!==_0x58da5f(0x205)){function _0x525964(){var _0x455d17=_0x58da5f;_0x27935e['w'](_0x455d17(0x1f4)+_0x4035a6+_0x455d17(0x225));}}else return ANET['UI'][_0x58da5f(0x1f8)](_0x200ee9);});},_0x3e7511[_0x1b602a(0x1b2)]=function(_0x5af3f9,_0x3c6d96){var _0x453a74=_0x1b602a,_0x2d37c7;if(this[_0x453a74(0x1a8)]()){if('buExz'===_0x453a74(0x20f)){function _0x4edd83(){var _0x160aeb=_0x453a74,_0x58b3f6;return _0x58b3f6=this[_0x160aeb(0x22f)][_0x160aeb(0x1c6)](function(_0x5aabf1){return _0x5aabf1['id']===_0x47424f;}),_0x58b3f6!=null;}}else _0x2d37c7=this[_0x453a74(0x1cc)](_0x5af3f9),_0x2d37c7!=null&&(_0x2d37c7[_0x453a74(0x213)]=_0x3c6d96);}else{}},_0x3e7511[_0x1b602a(0x204)]=function(_0x31469f){var _0x45e4cf=_0x1b602a;if(_0x45e4cf(0x1d6)!==_0x45e4cf(0x1d6)){function _0xd5e7ff(){var _0x3f1d0d=_0x45e4cf;_0x213e6e=_0x3b49f0[_0x20dcd3],_0xb8d1c6[_0x3f1d0d(0x1bf)]>0x0&&_0x120aba[_0x3f1d0d(0x19e)]===!![]&&_0x490f8c['_actors'][_0x3f1d0d(0x1ff)](_0x3c47af[_0x3f1d0d(0x1bf)]);}}else{var _0x5025d1;_0x5025d1=this[_0x45e4cf(0x1b8)](),this[_0x45e4cf(0x22f)]=_0x31469f,!this[_0x45e4cf(0x1cc)](ANNetwork['myId']())&&this['playersData'][_0x45e4cf(0x1ff)](_0x5025d1);}},_0x3e7511[_0x1b602a(0x1c4)]=function(_0x5a644f){var _0x3e70b6=_0x1b602a;if(_0x3e70b6(0x1a7)===_0x3e70b6(0x224)){function _0x414fea(){var _0x211b03=_0x3e70b6;return this[_0x211b03(0x210)](),this[_0x211b03(0x1f1)](),_0x2c929c[_0x211b03(0x202)]();}}else this[_0x3e70b6(0x204)](_0x5a644f),this[_0x3e70b6(0x1d1)](),$gameMap[_0x3e70b6(0x1f9)]();},_0x3e7511[_0x1b602a(0x1cd)]=function(){var _0x1d5f2b=_0x1b602a,_0x32fb67,_0x2c4159,_0x464fbe,_0x24ca45;$gameParty[_0x1d5f2b(0x1b9)]=[],_0x24ca45=this[_0x1d5f2b(0x22f)];for(_0x32fb67=0x0,_0x2c4159=_0x24ca45['length'];_0x32fb67<_0x2c4159;_0x32fb67++){if('aKJJH'===_0x1d5f2b(0x1e7))_0x464fbe=_0x24ca45[_0x32fb67],_0x464fbe['actorId']>0x0&&_0x464fbe[_0x1d5f2b(0x19e)]===!![]&&$gameParty[_0x1d5f2b(0x1b9)]['push'](_0x464fbe[_0x1d5f2b(0x1bf)]);else{function _0x16cd56(){var _0x55ab0d=_0x1d5f2b;this[_0x55ab0d(0x1b1)](),this[_0x55ab0d(0x1ed)]();}}}$gamePlayer[_0x1d5f2b(0x21f)](),$gameMap['nSafeRefresh']();},_0x3e7511['onLeaveRoom']=function(){var _0x1f1456=_0x1b602a;return this[_0x1f1456(0x1f1)]();};}(),window[a0_0x122bf3(0x1d4)]=ANGameManager);
})();

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]
//?[STORABLE]
var DataObserver;

DataObserver = class DataObserver {
  constructor(_checkTime = 0, _instante = false) {
    this._checkTime = _checkTime;
    this._instante = _instante;
    this._fields = {};
    this._isDataChanged = false;
    this._isShouldSkipCheck = false;
    this._timer = 0;
    return;
  }

  // * отправка без проверки изменений (по таймеру, если задан)
  setInstanteMode() {
    return this._instante = true;
  }

  // * проверка изменений (по таймеру, если задан)
  setCheckMode() {
    return this._instante = false;
  }

  // * не проверять изменения, устанавливать флаг _isDataChanged сразу (по истечению таймера)
  setCheckInterval(_checkTime) {
    this._checkTime = _checkTime;
  }

  // * Пропустить проверку данных, например когда данные пришли от сервера
  skip() {
    return this._isShouldSkipCheck = true;
  }

  addFields(obj, fieldsList) {
    var f, i, len;
    for (i = 0, len = fieldsList.length; i < len; i++) {
      f = fieldsList[i];
      this.readField(obj, f);
    }
  }

  removeFields(fieldsList) {
    var f, i, len, results;
    results = [];
    for (i = 0, len = fieldsList.length; i < len; i++) {
      f = fieldsList[i];
      results.push(delete this._fields[f]);
    }
    return results;
  }

  // * Прочитать все значения с объекта
  refreshAll(obj) {
    var f;
    for (f in this._fields) {
      this.readField(obj, f);
    }
    return this._isDataChanged = false;
  }

  readField(obj, field) {
    return this._fields[field] = obj[field];
  }

  check(obj) {
    var f;
    // * Если данные изменены, но зачем снова проверять?
    // * Всё равно не отслеживается какое именно поле было изменнено
    if (this.isDataChanged()) {
      return;
    }
    this._timer--;
    // * Если таймер, то ждём, не проверяем
    if (this._timer > 0) {
      return;
    }
    this._timer = this._checkTime;
    // * Если надо пропустить проверку, то пропускаем
    if (this._isShouldSkipCheck === true) {
      this._isShouldSkipCheck = false;
      return;
    }
    // * Если постоянное обновление, то сразу флаг и пропускаем проверку
    if (this._instante === true) {
      this._isDataChanged = true;
      return;
    }
    for (f in this._fields) {
      if (obj[f] !== this._fields[f]) {
        this._isDataChanged = true;
        break;
      }
    }
  }

  isDataChanged() {
    return this._isDataChanged === true;
  }

  // * Получить данные всех полей для отправки на сервер
  getDataForNetwork(obj) {
    this.refreshAll(obj);
    return this._fields;
  }

  // * Установить данные всех полей, когда пришли с сервера
  setDataFromNetwork(obj, observerData) {
    var f;
    for (f in this._fields) {
      obj[f] = observerData[f];
    }
    this.refreshAll(obj);
  }

};

//Compressed by MV Plugin Builder
(function(){var a0_0xec31=['onAnswer','rvBOD','onVariableValue','event_lobby_changePlayerName','noZNx','onBattleInputAction','onPlayerMove','Handle\x20Event:\x20','playersData','onRoomDataFromServer','gnAgI','onConnectCallback','nSaveData','contains','inputActorId','event_game_saveDataRequest','callback','onBeforeSave','onObserverData','warn','onSharedEventForceCancelFromServer','event_game_switch','event_event_registerOnShared','2vFvvgd','onRegisterOnSharedEventRequest','EDMif','SHARED\x20EVENT\x20CHOICE\x20ACTION','zvDVP','isBusyForNetworkData','REFRESH\x20PARTY','IniaD','480156XMHEIv','DevLog','event_game_saveDataComplete','event_game_playersData','mapId','StJZr','Jmvvw','onGamePlayers','onVirtualCommand','XdjKh','EyDqU','CUSTOM\x20LINK\x20IN','saveGame','event_map_playerMove','onSwitchValue','41KpqjvJ','event_battle_battleMethodReceived','NetClientMethodsManager','getLightestColor','ieXEH','event_battleMethodReceived','event_battle_serverBattleData','Please\x20update\x20Alpha\x20NET\x20Z\x20plugin','syeaZ','KJyLT','MQIHD','Client\x20not\x20match\x20server\x20version','event_lobby_startGame','event_','gaNzf','Disconnected\x20from\x20server','setConnectionToMasterCallback','uOxQO','MCkjQ','onRegisterOnSharedEventResponse','OYjeq','cfjMg','event_map_playerLocation','method','165163ugRATq','uniqueSaveID','event_game_customCommandLink','data','undefined','onRoomClosed','stop','NET\x20Client','onCustomCommand','BLACK','who','Connected','nUniqueSaveID','event_map_eventMove','event_battle_battleMethod','onInitialMapSync','elaKu','SHARED\x20EVENT\x20ANSWER','onConnect','event_battle_animation','EXNRi','battle_battleMethodReceived','lfpon','XLArK','boXyr','LrWqs','onBattleDataFromServer','event_battle_input','inputState','serverVerCheck','2jBWdkh','SHARED\x20EVENT\x20IN','UruDR','onContinueSharedEvent','event_lobby_refreshRoomData','onLogWindowMessage','STARTING\x20GAME','map_playerMove','isExistPrcEvent','275698GQhvrV','_scene','onBattleMethodReceived','event_battle_inputAction','CUSTOM\x20COMMAND\x20IN','ttvfi','addMessageToChat','event_battle_logMessage','Lobby','oJCQV','onBattleAnimation','event_game_variable','alert','onRefreshGameParty','2167pqmYgO','onEventMove','action','163538MwYONR','SHARED\x20EVENT\x20FORCE\x20CANCELLED','83054WwdyZt','7456uaDlFu','event_game_chatMessage','type','TYwwd','event_event_sharedCanContinue','callSceneCallback','onRoomPlayers','event_game_userCommand','event_game_observerData','event_game_refreshParty','onLostConnection','eVNgL','cmd','PjIgs','onPlayerLocation','savefileId','event_event_registerDone','ServerRev','name','GAME\x20PLAYERS\x20DATA\x20REFRESHED','onDisconnect','onConnectionError','event_event_sharedForceCancel','ZCcCh','WIfgy','event_lobby_roomClosed','Event\x20End:\x20','lfEhI','rchdN','sendSaveDataCompleteFlag','cezKk','569BwNXFf','JlmgO','tcOzN','event_event_virtualEventCommand','Can\x27t\x20connect\x20to\x20server!','battle_battleMethod','oCGrf','nRegisterCustomCommandCE','onSharedEventChoiceActionFromServer','game_observerData','bLFbU','EZHYr','setColors','EZaMS','IEySF'];function a0_0x30b2(_0x221bb2,_0x4c2708){_0x221bb2=_0x221bb2-0x149;var _0xec312e=a0_0xec31[_0x221bb2];return _0xec312e;}(function(_0xfa18a1,_0x41a8fd){var _0x1c468f=a0_0x30b2;while(!![]){try{var _0x18ee45=-parseInt(_0x1c468f(0x165))+-parseInt(_0x1c468f(0x183))*parseInt(_0x1c468f(0x18c))+parseInt(_0x1c468f(0x19d))+-parseInt(_0x1c468f(0x14d))*-parseInt(_0x1c468f(0x1a0))+-parseInt(_0x1c468f(0x1ed))+-parseInt(_0x1c468f(0x19f))*parseInt(_0x1c468f(0x1e5))+-parseInt(_0x1c468f(0x19a))*-parseInt(_0x1c468f(0x1bf));if(_0x18ee45===_0x41a8fd)break;else _0xfa18a1['push'](_0xfa18a1['shift']());}catch(_0x227e27){_0xfa18a1['push'](_0xfa18a1['shift']());}}}(a0_0xec31,0x52dea),window['NetClientMethodsManager']=function(){},function(){var _0x3b697d=a0_0x30b2,_0x350580,_0x447b5f;_0x350580=new KDCore[(_0x3b697d(0x1ee))](_0x3b697d(0x16c)),_0x350580[_0x3b697d(0x1cb)](KDCore['Color']['MAGENTA']['reAlpha'](0xc8),KDCore['Color'][_0x3b697d(0x16e)][_0x3b697d(0x150)](0xc8)),_0x350580['on'](),_0x447b5f=window[_0x3b697d(0x14f)],_0x447b5f[_0x3b697d(0x15d)]=function(_0x3aeecc){var _0x32f471=_0x3b697d;this[_0x32f471(0x1d9)]=_0x3aeecc;},_0x447b5f[_0x3b697d(0x177)]=function(){var _0x3414ac=_0x3b697d;_0x350580['p'](_0x3414ac(0x170)),ANNetwork[_0x3414ac(0x1de)](NMS[_0x3414ac(0x194)](_0x3414ac(0x182),ANET[_0x3414ac(0x1b1)]),function(_0x37d0be){var _0x493621=_0x3414ac;if(!_0x37d0be)return _0x350580['p'](_0x493621(0x158)),window[_0x493621(0x198)](_0x493621(0x154)),ANNetwork[_0x493621(0x16b)]();});if(this[_0x3414ac(0x1d9)]!=null)return this[_0x3414ac(0x1d9)](0x1);},_0x447b5f[_0x3b697d(0x1b4)]=function(){var _0x411226=_0x3b697d;if(_0x411226(0x1f3)==='Jmvvw'){var _0x367f64;return _0x350580['p']('Disconnected'),(_0x367f64=SceneManager[_0x411226(0x18d)])!=null&&_0x367f64[_0x411226(0x1aa)](),HUIManager['notifyError'](_0x411226(0x15c)),ANNetwork[_0x411226(0x16b)]();}else{function _0xdf6138(){var _0x4a9993=_0x411226,_0x586b6;try{return _0x35eabf[_0x4a9993(0x1f5)](_0x5adcd5);}catch(_0x8e21b1){return _0x586b6=_0x8e21b1,_0x27104a[_0x4a9993(0x1e1)]('event_event_virtualEventCommand',_0x586b6);}}}},_0x447b5f[_0x3b697d(0x1b5)]=function(){var _0x51ebca=_0x3b697d;if(_0x51ebca(0x17d)===_0x51ebca(0x1c9)){function _0xa61a(){var _0x496d5b=_0x51ebca;if(_0x8c7393[_0x496d5b(0x1da)]==null)return;return _0x4c4b68=_0x528e5d,_0x3b0668['nSaveData'][_0x496d5b(0x1ce)](_0x219ed9,!![]);}}else return _0x350580['p']('Can\x27t\x20connect\x20to\x20server!'),this[_0x51ebca(0x1d9)]!=null&&this[_0x51ebca(0x1d9)](0x0),ANNetwork[_0x51ebca(0x16b)]();},_0x447b5f[_0x3b697d(0x18b)]=function(_0x29ddb8){return NetClientMethodsManager['event_'+_0x29ddb8]!=null;},_0x447b5f['handlePrcEvent']=function(_0x144899,_0x29076c){var _0x4080c4=_0x3b697d,_0x375d5f;_0x375d5f=['game_observerData','map_eventMove','map_playerMove',_0x4080c4(0x1c4),_0x4080c4(0x17a)][_0x4080c4(0x1db)](_0x144899);!_0x375d5f&&_0x350580['p'](_0x4080c4(0x1d5)+_0x144899);NetClientMethodsManager[_0x4080c4(0x15a)+_0x144899](_0x29076c),this[_0x4080c4(0x1a5)](_0x144899);if(!_0x375d5f){if('uOxQO'===_0x4080c4(0x15e))_0x350580['p'](_0x4080c4(0x1ba)+_0x144899);else{function _0x147b2a(){var _0x3c6c1f=_0x4080c4;return _0x2f32f9[_0x3c6c1f(0x1ae)](_0x3f11b6['id'],_0x3c5265[_0x3c6c1f(0x168)]);}}}},_0x447b5f[_0x3b697d(0x1a5)]=function(_0x135126){var _0x3122cf=_0x3b697d;if(_0x3122cf(0x1a3)!==_0x3122cf(0x161)){var _0x332dee;return(_0x332dee=SceneManager[_0x3122cf(0x18d)])!=null?_0x332dee['onServerEvent'](_0x135126):void 0x0;}else{function _0x479c23(){var _0x414eda=_0x3122cf,_0x244c32,_0x260624,_0x1cd2b4;try{return _0x414eda(0x149)['p'](),{name:_0x1cd2b4,commonEventId:_0x244c32}=_0x1b24d0,typeof _0x567de4!=='undefined'&&_0x30687f!==null?_0x2a48f8['nRegisterCustomCommandCE'](_0x1cd2b4,_0x244c32):void 0x0;}catch(_0x310ee6){return _0x260624=_0x310ee6,_0x31e744['warn'](_0x414eda(0x1a7),_0x260624);}}}},_0x447b5f[_0x3b697d(0x1d1)]=function(_0x2f1373){var _0x2b203b=_0x3b697d;return ANGameManager['onPlayerName'](_0x2f1373[_0x2b203b(0x16f)],_0x2f1373[_0x2b203b(0x1b2)]);},_0x447b5f[_0x3b697d(0x187)]=function(_0x33ba31){var _0x441ce8=_0x3b697d;if('noZNx'!==_0x441ce8(0x1d2)){function _0x5502fa(){var _0x2fdaa6=_0x441ce8;return _0xc79cf6['onBattleInputState'](_0x2fe52d[_0x2fdaa6(0x181)],_0x4ef6f6[_0x2fdaa6(0x1dc)]);}}else{if(SceneManager[_0x441ce8(0x1ea)]()){if(_0x441ce8(0x1f7)===_0x441ce8(0x195)){function _0x589199(){var _0x4eff05=_0x441ce8,_0x97577c;try{return _0x57dd63['onVariableValue'](_0x2f3b7d['id'],_0x52276a[_0x4eff05(0x168)]);}catch(_0x3e4aa5){return _0x97577c=_0x3e4aa5,_0x15b0fc['warn']('event_game_variable',_0x97577c);}}}else return;}return ANGameManager[_0x441ce8(0x1a6)](_0x33ba31[_0x441ce8(0x1d6)]),ANNetwork[_0x441ce8(0x1d7)](_0x33ba31['room']);}},_0x447b5f[_0x3b697d(0x1b9)]=function(_0x3f7a27){var _0x1fb376=_0x3b697d;return ANNetwork[_0x1fb376(0x16a)]();},_0x447b5f[_0x3b697d(0x159)]=function(){var _0xc6c55a=_0x3b697d;return ANGameManager['setupNewNetworkGame'](),_0xc6c55a(0x189)['p']();},_0x447b5f[_0x3b697d(0x1f0)]=function(_0x5ad446){var _0x4c4a70=_0x3b697d;if(_0x4c4a70(0x1cc)!=='EZaMS'){function _0x58c37e(){var _0x4e81dd=_0x4c4a70,_0x5d0e85;try{return _0x25dbb9[_0x4e81dd(0x1ae)](_0x4c9b84['id'],_0x2d01fa['data']);}catch(_0x3663f1){return _0x5d0e85=_0x3663f1,_0x5e4bfb['warn']('event_map_playerLocation',_0x5d0e85);}}}else return ANGameManager[_0x4c4a70(0x1f4)](_0x5ad446),_0x4c4a70(0x1b3)['p']();},_0x447b5f[_0x3b697d(0x1a9)]=function(){var _0x53bdd2=_0x3b697d;return ANGameManager[_0x53bdd2(0x199)](),_0x53bdd2(0x1eb)['p']();},_0x447b5f[_0x3b697d(0x1a8)]=function(_0x2f5c72){var _0x3048ec=_0x3b697d;if(_0x3048ec(0x1cf)!==_0x3048ec(0x1cf)){function _0x9d9540(){var _0xfd9ab0=_0x3048ec;return _0x1cabd6=_0x1390ee,_0x162955[_0xfd9ab0(0x1e1)]('event_game_chatMessage',_0x30ff3b);}}else{var _0x1a1c90;try{if('StJZr'!==_0x3048ec(0x1f2)){function _0x15e6f9(){var _0x17aa4e=_0x3048ec;return _0x28ab5c['p'](_0x17aa4e(0x1c3)),this[_0x17aa4e(0x1d9)]!=null&&this[_0x17aa4e(0x1d9)](0x0),_0x3d5669[_0x17aa4e(0x16b)]();}}else return ANSyncDataManager[_0x3048ec(0x1e0)](_0x2f5c72['id'],_0x2f5c72[_0x3048ec(0x1a2)],_0x2f5c72[_0x3048ec(0x168)]);}catch(_0x4c64dc){if('eHbxM'==='zxCty'){function _0x1ea08d(){var _0x3d2aa9=_0x3048ec;return _0x2c84a1=_0x575bc4,_0xf90231[_0x3d2aa9(0x1e1)](_0x3d2aa9(0x1a4),_0x14a28a);}}else return _0x1a1c90=_0x4c64dc,console[_0x3048ec(0x1e1)]('event_game_observerData',_0x1a1c90);}}},_0x447b5f[_0x3b697d(0x197)]=function(_0x340169){var _0x1a1f56=_0x3b697d,_0x4a400e;try{if(_0x1a1f56(0x15b)!==_0x1a1f56(0x15b)){function _0x27a270(){return _0x2f2f83['setupNewNetworkGame'](),'STARTING\x20GAME'['p']();}}else return ANSyncDataManager[_0x1a1f56(0x1d0)](_0x340169['id'],_0x340169['data']);}catch(_0x287667){return _0x4a400e=_0x287667,console[_0x1a1f56(0x1e1)](_0x1a1f56(0x197),_0x4a400e);}},_0x447b5f[_0x3b697d(0x1e3)]=function(_0x452ce2){var _0x272d3f=_0x3b697d,_0x1211dc;try{if(_0x272d3f(0x155)==='syeaZ')return ANSyncDataManager[_0x272d3f(0x14c)](_0x452ce2['id'],_0x452ce2['data']);else{function _0x13e646(){return _0x14e8ae['UI']['addMessageToChat'](_0x17c2d4);}}}catch(_0x1c2404){if(_0x272d3f(0x15f)==='RdvoT'){function _0x27b535(){var _0x2e4643=_0x272d3f;return _0x72291a=_0x39e6a8,_0x133ec2['warn'](_0x2e4643(0x180),_0x26e443);}}else return _0x1211dc=_0x1c2404,console[_0x272d3f(0x1e1)](_0x272d3f(0x1e3),_0x1211dc);}},_0x447b5f[_0x3b697d(0x1dd)]=function(_0x2d2182){var _0x123f5c=_0x3b697d,_0x4c6baa;try{if(_0x123f5c(0x157)===_0x123f5c(0x157))return $gameTemp[_0x123f5c(0x171)]=_0x2d2182[_0x123f5c(0x166)],$gameSystem[_0x123f5c(0x1df)](),DataManager[_0x123f5c(0x14a)](_0x2d2182[_0x123f5c(0x1af)]),ANGameManager[_0x123f5c(0x1bd)]();else{function _0x40d493(){var _0x2412b1=_0x123f5c;return _0x1870e8=_0x1cf090,_0x1b4482[_0x2412b1(0x1e1)](_0x2412b1(0x1b6),_0x15caac);}}}catch(_0x1bf03f){return _0x4c6baa=_0x1bf03f,console[_0x123f5c(0x1e1)](_0x123f5c(0x1dd),_0x4c6baa);}},_0x447b5f['event_game_saveDataComplete']=function(_0x3fb095){var _0x1976f2=_0x3b697d,_0xcc1366,_0x2ae181;try{if($gameTemp['nSaveData']==null)return;return _0x2ae181=_0x3fb095,$gameTemp[_0x1976f2(0x1da)][_0x1976f2(0x1ce)](_0x2ae181,!![]);}catch(_0x43ea29){return _0xcc1366=_0x43ea29,console['warn'](_0x1976f2(0x1ef),_0xcc1366);}},_0x447b5f[_0x3b697d(0x1a1)]=function(_0x559ed5){var _0xdada=_0x3b697d;if('BNdqv'!==_0xdada(0x175)){var _0xb7728a,_0x5bdeb5,_0x3f259c;try{_0x3f259c=_0x559ed5['mapId'],_0xb7728a=_0x559ed5['channelId'];if(_0xb7728a>0x0){if(_0xdada(0x156)!==_0xdada(0x1c1)){if(_0x3f259c!=null&&_0x3f259c===$gameMap[_0xdada(0x1f1)]())return ANET['UI'][_0xdada(0x192)](_0x559ed5);}else{function _0x102070(){var _0x3d7fa6=_0xdada,_0x20c6ca;try{return'SHARED\x20EVENT\x20CAN\x20CONTINUE'['p'](),_0x286a34[_0x3d7fa6(0x186)](_0xe70786);}catch(_0x44947e){return _0x20c6ca=_0x44947e,_0x188c59[_0x3d7fa6(0x1e1)](_0x3d7fa6(0x1a4),_0x20c6ca);}}}}else return ANET['UI'][_0xdada(0x192)](_0x559ed5);}catch(_0x54b3b6){if(_0xdada(0x1be)!=='cgPGU')return _0x5bdeb5=_0x54b3b6,console['warn'](_0xdada(0x1a1),_0x5bdeb5);else{function _0x1c4bd1(){var _0x1c8ed9=_0xdada;return _0x460829[_0x1c8ed9(0x14c)](_0x3e662d['id'],_0x29c8e4['data']);}}}}else{function _0x2d8771(){var _0x6dc47=_0xdada;if(!_0x4a6bb7)return _0x11ef5f['p'](_0x6dc47(0x158)),_0x4a2834[_0x6dc47(0x198)](_0x6dc47(0x154)),_0x38e422[_0x6dc47(0x16b)]();}}},_0x447b5f['event_map_playerMove']=function(_0x24c102){var _0x46ae5d=_0x3b697d;if(_0x46ae5d(0x1d8)==='JdjWh'){function _0x2d48e4(){var _0x10b387=_0x46ae5d,_0x5829ad;try{return _0x5534e7[_0x10b387(0x1d4)](_0x19ea6f['id'],_0x325a30[_0x10b387(0x168)]);}catch(_0x43e258){return _0x5829ad=_0x43e258,_0x226176[_0x10b387(0x1e1)](_0x10b387(0x14b),_0x5829ad);}}}else{var _0x5595de;try{return ANPlayersManager[_0x46ae5d(0x1d4)](_0x24c102['id'],_0x24c102[_0x46ae5d(0x168)]);}catch(_0x51836d){return _0x5595de=_0x51836d,console[_0x46ae5d(0x1e1)](_0x46ae5d(0x14b),_0x5595de);}}},_0x447b5f[_0x3b697d(0x163)]=function(_0x566ca8){var _0x53a619=_0x3b697d,_0x5abd6e;try{return ANPlayersManager['onPlayerLocation'](_0x566ca8['id'],_0x566ca8[_0x53a619(0x168)]);}catch(_0x3e61a4){return _0x5abd6e=_0x3e61a4,console[_0x53a619(0x1e1)](_0x53a619(0x163),_0x5abd6e);}},_0x447b5f['event_map_eventMove']=function(_0x2067c5){var _0x132f82=_0x3b697d,_0x3e154a;try{if(_0x132f82(0x162)!==_0x132f82(0x17e))return ANMapManager[_0x132f82(0x19b)](_0x2067c5[_0x132f82(0x1f1)],_0x2067c5['id'],_0x2067c5['data']);else{function _0x24b8bf(){var _0x4afe35=_0x132f82;return _0x266c24=_0x4bcf5e,_0x223e5a[_0x4afe35(0x1e1)](_0x4afe35(0x1b6),_0x490e40);}}}catch(_0x56aabb){return _0x3e154a=_0x56aabb,console[_0x132f82(0x1e1)](_0x132f82(0x172),_0x3e154a);}},_0x447b5f['event_map_initialMapSynchronization']=function(_0x21bbcb){var _0xa4dd19=_0x3b697d,_0x25e8b2;try{if('flgTK'==='flgTK'){if($gameMap[_0xa4dd19(0x1f1)]()===_0x21bbcb)return ANMapManager[_0xa4dd19(0x174)]();}else{function _0x48c68e(){var _0x1200d7=_0xa4dd19,_0x14d59c;try{return _0x12f0ee[_0x1200d7(0x14c)](_0x5823f9['id'],_0x43e3a8[_0x1200d7(0x168)]);}catch(_0x4fceb3){return _0x14d59c=_0x4fceb3,_0x548142['warn'](_0x1200d7(0x1e3),_0x14d59c);}}}}catch(_0x17d61c){return _0x25e8b2=_0x17d61c,console['warn'](_0xa4dd19(0x172),_0x25e8b2);}},_0x447b5f[_0x3b697d(0x1c2)]=function(_0x3aff4c){var _0x531f79=_0x3b697d;if(_0x531f79(0x1ab)==='eVNgL'){var _0x5c22be;try{if(_0x531f79(0x1e7)===_0x531f79(0x1e7))return ANInterpreterManager[_0x531f79(0x1f5)](_0x3aff4c);else{function _0x306cee(){return _0xcf6924=_0xc97988,_0xdbf766['warn']('event_battle_animation',_0x38c7d1);}}}catch(_0x303688){if(_0x531f79(0x1ec)!==_0x531f79(0x1ec)){function _0x2baa63(){var _0x378319=_0x531f79;return _0xa04386[_0x378319(0x174)]();}}else return _0x5c22be=_0x303688,console[_0x531f79(0x1e1)](_0x531f79(0x1c2),_0x5c22be);}}else{function _0x6dd4d2(){var _0x5ba8b7=_0x531f79;return _0x55cf41=_0x14aec1,_0x211bde[_0x5ba8b7(0x1e1)](_0x5ba8b7(0x172),_0x385bce);}}},_0x447b5f[_0x3b697d(0x173)]=function(_0x552715){var _0x41ac33=_0x3b697d;if(_0x41ac33(0x185)==='ETiIb'){function _0x4b39ec(){var _0x3fafa3=_0x41ac33,_0xd2de67;try{return _0x3fafa3(0x19e)['p'](),_0x4a2bb3[_0x3fafa3(0x1e2)](_0x41eb52);}catch(_0x352596){return _0xd2de67=_0x352596,_0x5aaea6[_0x3fafa3(0x1e1)]('event_event_sharedForceCancel',_0xd2de67);}}}else{var _0x5524d2;try{return ANBattleManager['onBattleMethod'](_0x552715['id'],_0x552715[_0x41ac33(0x164)],_0x552715[_0x41ac33(0x168)]);}catch(_0x16edd4){return _0x5524d2=_0x16edd4,console['warn']('event_battle_battleMethod',_0x5524d2);}}},_0x447b5f[_0x3b697d(0x178)]=function(_0x48c980){var _0xcdbdcc=_0x3b697d;if(_0xcdbdcc(0x1e9)===_0xcdbdcc(0x1e9)){var _0x59792b;try{return ANBattleManager[_0xcdbdcc(0x196)](_0x48c980);}catch(_0x577430){return _0x59792b=_0x577430,console['warn'](_0xcdbdcc(0x178),_0x59792b);}}else{function _0x292e18(){var _0x1a5195=_0xcdbdcc;return _0xba1d5[_0x1a5195(0x18e)]();}}},_0x447b5f[_0x3b697d(0x14e)]=function(_0x352aa3){var _0x373bee=_0x3b697d,_0x13657e;try{return ANBattleManager[_0x373bee(0x18e)]();}catch(_0x4d615d){if(_0x373bee(0x1bb)!==_0x373bee(0x1bb)){function _0x44cfef(){var _0x2b96c6=_0x373bee;return _0x2e05e7['onBattleInputAction'](_0x1e69af['inputActorId'],_0x5e6f65[_0x2b96c6(0x19c)]);}}else return _0x13657e=_0x4d615d,console[_0x373bee(0x1e1)](_0x373bee(0x152),_0x13657e);}},_0x447b5f['event_battle_logMessage']=function(_0x26fd27){var _0x4fdb6c=_0x3b697d,_0x134223;try{return ANBattleManager[_0x4fdb6c(0x188)](_0x26fd27[_0x4fdb6c(0x1ac)],_0x26fd27['text']);}catch(_0x424376){return _0x134223=_0x424376,console[_0x4fdb6c(0x1e1)](_0x4fdb6c(0x193),_0x134223);}},_0x447b5f[_0x3b697d(0x180)]=function(_0x2b0ad8){var _0x3fc2c4=_0x3b697d,_0x2fe421;try{return ANBattleManager['onBattleInputState'](_0x2b0ad8[_0x3fc2c4(0x181)],_0x2b0ad8[_0x3fc2c4(0x1dc)]);}catch(_0x1b0f83){return _0x2fe421=_0x1b0f83,console['warn'](_0x3fc2c4(0x180),_0x2fe421);}},_0x447b5f[_0x3b697d(0x18f)]=function(_0x48561f){var _0x368549=_0x3b697d,_0x247946;try{if(_0x368549(0x1c5)!==_0x368549(0x1c5)){function _0x42b884(){var _0x27c8f3=_0x368549;return _0x30aa6b=_0x1319d7,_0x3a2855[_0x27c8f3(0x1e1)](_0x27c8f3(0x1e4),_0x30c1de);}}else return ANBattleManager[_0x368549(0x1d3)](_0x48561f[_0x368549(0x1dc)],_0x48561f['action']);}catch(_0xc6e13b){return _0x247946=_0xc6e13b,console[_0x368549(0x1e1)](_0x368549(0x18f),_0x247946);}},_0x447b5f[_0x3b697d(0x153)]=function(_0x4eb590){var _0x4fae9a=_0x3b697d;if(_0x4fae9a(0x191)!==_0x4fae9a(0x1b8)){var _0x174f3c;try{return ANBattleManager[_0x4fae9a(0x17f)](_0x4eb590);}catch(_0x53ed88){return _0x174f3c=_0x53ed88,console['warn']('event_battle_serverBattleData',_0x174f3c);}}else{function _0x350d84(){var _0x2002c7=_0x4fae9a,_0x202e3f;try{return _0x434338[_0x2002c7(0x196)](_0x314147);}catch(_0x3f1f6a){return _0x202e3f=_0x3f1f6a,_0x4a32e3[_0x2002c7(0x1e1)](_0x2002c7(0x178),_0x202e3f);}}}},_0x447b5f['event_event_registerOnShared']=function(_0x28e5b3){var _0x55da2e=_0x3b697d,_0x16dcf6;try{if(_0x55da2e(0x1ad)!=='Zbjrs')return _0x55da2e(0x184)['p'](),ANInterpreterManager[_0x55da2e(0x1e6)](_0x28e5b3);else{function _0x507cdb(){var _0x240db4=_0x55da2e;return _0x56164d[_0x240db4(0x15a)+_0x84e89a]!=null;}}}catch(_0x550c67){return _0x16dcf6=_0x550c67,console[_0x55da2e(0x1e1)](_0x55da2e(0x1e4),_0x16dcf6);}},_0x447b5f[_0x3b697d(0x1b0)]=function(_0x557e74){var _0x41c507=_0x3b697d,_0x3c5f68;try{return _0x41c507(0x176)['p'](),ANInterpreterManager[_0x41c507(0x160)](_0x557e74);}catch(_0xce221f){return _0x3c5f68=_0xce221f,console[_0x41c507(0x1e1)](_0x41c507(0x1b0),_0x3c5f68);}},_0x447b5f[_0x3b697d(0x1a4)]=function(_0x3aa5ce){var _0x1f2414=_0x3b697d,_0x435434;try{if(_0x1f2414(0x1b7)!==_0x1f2414(0x1b7)){function _0x508d71(){var _0x579b77=_0x1f2414,_0xcc2606;try{return _0x111ef2[_0x579b77(0x171)]=_0xb8d563['uniqueSaveID'],_0x4addc0['onBeforeSave'](),_0x477691['saveGame'](_0x1a8d17[_0x579b77(0x1af)]),_0x24ab6f[_0x579b77(0x1bd)]();}catch(_0x340c82){return _0xcc2606=_0x340c82,_0x120e4a[_0x579b77(0x1e1)]('event_game_saveDataRequest',_0xcc2606);}}}else return'SHARED\x20EVENT\x20CAN\x20CONTINUE'['p'](),ANInterpreterManager[_0x1f2414(0x186)](_0x3aa5ce);}catch(_0x551cab){return _0x435434=_0x551cab,console[_0x1f2414(0x1e1)](_0x1f2414(0x1a4),_0x435434);}},_0x447b5f[_0x3b697d(0x1b6)]=function(_0x2ac360){var _0x16d7ba=_0x3b697d,_0x41d027;try{return _0x16d7ba(0x19e)['p'](),ANInterpreterManager['onSharedEventForceCancelFromServer'](_0x2ac360);}catch(_0x403d27){if(_0x16d7ba(0x1bc)===_0x16d7ba(0x1ca)){function _0x57dde9(){var _0x59e021=_0x16d7ba;return _0x3de115=_0xd1115d,_0x7d61eb[_0x59e021(0x1e1)](_0x59e021(0x1e3),_0x1dcbbc);}}else return _0x41d027=_0x403d27,console['warn'](_0x16d7ba(0x1b6),_0x41d027);}},_0x447b5f['event_event_sharedChoice']=function(_0x3b38fe){var _0x5ad234=_0x3b697d,_0xdbdf5f;try{if('XLArK'===_0x5ad234(0x17c))return _0x5ad234(0x1e8)['p'](),ANInterpreterManager[_0x5ad234(0x1c7)](_0x3b38fe);else{function _0x41f976(){var _0x1de811=_0x5ad234,_0x4a989b;try{return _0x1de811(0x176)['p'](),_0x4d13f0[_0x1de811(0x160)](_0x5968cf);}catch(_0x7e26d8){return _0x4a989b=_0x7e26d8,_0xe9ee5f[_0x1de811(0x1e1)](_0x1de811(0x1b0),_0x4a989b);}}}}catch(_0x1b4771){if(_0x5ad234(0x1cd)===_0x5ad234(0x1cd))return _0xdbdf5f=_0x1b4771,console[_0x5ad234(0x1e1)]('event_event_sharedForceCancel',_0xdbdf5f);else{function _0x109bf2(){var _0x246526=_0x5ad234;return _0x423d90=_0x510072,_0x29a5f5[_0x246526(0x1e1)](_0x246526(0x1b0),_0x43f191);}}}},_0x447b5f[_0x3b697d(0x1a7)]=function(_0x4b0791){var _0x21f5e8=_0x3b697d;if(_0x21f5e8(0x179)!==_0x21f5e8(0x179)){function _0x295f3c(){var _0x42d0dc=_0x21f5e8,_0x11b6bb;_0x11b6bb=[_0x42d0dc(0x1c8),'map_eventMove',_0x42d0dc(0x18a),'battle_battleMethod',_0x42d0dc(0x17a)][_0x42d0dc(0x1db)](_0x20e59b),!_0x11b6bb&&_0x43b004['p'](_0x42d0dc(0x1d5)+_0x3d225d),_0x434488['event_'+_0x1947b0](_0x4a52cc),this[_0x42d0dc(0x1a5)](_0x15c86b),!_0x11b6bb&&_0x527bcd['p']('Event\x20End:\x20'+_0x178207);}}else{var _0x3cd7ec,_0x272e04,_0x1bd750;try{if(_0x21f5e8(0x1f6)===_0x21f5e8(0x151)){function _0x3d3671(){var _0x4c0827=_0x21f5e8;return _0x3d50a2[_0x4c0827(0x196)](_0x40ea66);}}else return _0x21f5e8(0x190)['p'](),{name:_0x1bd750,data:_0x3cd7ec}=_0x4b0791,nAPI[_0x21f5e8(0x16d)](_0x1bd750,_0x3cd7ec);}catch(_0x427583){if(_0x21f5e8(0x1c0)===_0x21f5e8(0x17b)){function _0x46b66b(){_0x42ed3c['p']('Handle\x20Event:\x20'+_0x52eb4f);}}else return _0x272e04=_0x427583,console[_0x21f5e8(0x1e1)](_0x21f5e8(0x1a7),_0x272e04);}}},_0x447b5f[_0x3b697d(0x167)]=function(_0x3e7f83){var _0x5cf7af=_0x3b697d,_0x1f473e,_0x538fd9,_0x36b958;try{return _0x5cf7af(0x149)['p'](),{name:_0x36b958,commonEventId:_0x1f473e}=_0x3e7f83,typeof $gameSystem!==_0x5cf7af(0x169)&&$gameSystem!==null?$gameSystem[_0x5cf7af(0x1c6)](_0x36b958,_0x1f473e):void 0x0;}catch(_0x5792ff){if('DMLGu'!=='DMLGu'){function _0x1f7662(){var _0x1dc9d9=_0x5cf7af;this[_0x1dc9d9(0x1d9)]=_0x3fdf5a;}}else return _0x538fd9=_0x5792ff,console[_0x5cf7af(0x1e1)]('event_game_userCommand',_0x538fd9);}};}());
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x3861=['_callBattleMethodOnServer','registerOnLocalBattle','isForceBattleSyncMode','setWait','push','isLocal','_inputting','3319dHWjLl','Ojltd','_eventCallback','oqMry','onBattleRegisterResult','YlaUP','wNBKS','onBattleAnimation','mXAZa','pgHae','fFgsr','muZWp','KKvlE','sAHPS','_previousNetBattleActors','add','nWyVB','zcROl','info','jRHGr','packForNetwork','221nszcSh','sendBattleInputAction','map','409tmnUzL','isShouldWaitServer','callBattleMethod','PupLj','Color','sOFNX','started','clear','iZBkc','battleMethod','hideLoader','IKfZA','yEuQL','sendBattleMethod','input','netDataObserver','wMslU','EaFEl','_battleMethodsPool','requestAnimation','onBattleDataFromServer','sendBattleMethodReceived','sendBattleEnded','_registerToExistsSharedBattle','onBattleMethodReceived','sendInputState','nSetNetworkBattle','resetWait','leader','YiDCN','setFromNetwork','_waitPool','RED','nClearClientInput','Wdujc','_lastBattleManagerInputActor','updateWaiting','registerOnBattle','length','send','SETUP','TIME\x20OUT','olvPY','get','unpackBattlerFromNetwork','_isDataChanged','_currentActor','WezxB','316iYgHyl','AAzNC','BNDlg','CALL\x20BATTLE\x20METHOD','battleMembers','hKHos','_waitTimeout','onBattleInputAction','748TcNfdu','MsDFc','battleId','addText','isBattleRegistred','onLogWindowMessage','local','battleData','options','CRFkQ','tRWbb','isLoaderActive','Try\x20register\x20battle:\x20','FWYll','onBattleMethod','JWtby','3221bGwZvJ','_waitMode','inBattle','_logWindow','Battle','aYapa','isBattleMaster','Join\x20Shared\x20battle','krWNS','JWIMf','UQwSj','_lastBattleManagerInputValue','showLoader','60212iKpdgn','animation','setup','zKkto','getLightestColor','myActorId','setEventCallback','NetBattle','KLgzX','MHQOI','EZPGA','DevLog','isOneBattler','ended','GVhXy','zvJEq','Utils','wMyJB','register','FElWb','prfIM','GCbkA','actorId','743310GjJZqo','BLACK','443332Wgcidz','selectNextCommand','inputtingAction','yqjcW','sendRegisterOnBattle','onBattleInputState','updateInputChange','YIERB','nSetCurrentClientInput','2471SNzjCH','WAIT','isBattleLocal','GBbhP','tvqCx','pDNfe','sendBattleAnimation','67jDwnKF','onBattleStarted','KppYD','shift','actors','battleMethodReceived','STARTED\x20LOCAL\x20BATTLE','REGISTER\x20SUCCESS','sendBattleStarted','ANBattleManager','AiEgG','pIVCT','animationId'];var a0_0x340775=a0_0x3244;function a0_0x3244(_0x2a1f30,_0x58fd67){_0x2a1f30=_0x2a1f30-0xdb;var _0x3861df=a0_0x3861[_0x2a1f30];return _0x3861df;}(function(_0x19453b,_0x10da87){var _0x3d10b1=a0_0x3244;while(!![]){try{var _0x22677b=-parseInt(_0x3d10b1(0x183))*parseInt(_0x3d10b1(0xe1))+parseInt(_0x3d10b1(0xf1))*parseInt(_0x3d10b1(0x127))+-parseInt(_0x3d10b1(0x150))*parseInt(_0x3d10b1(0x120))+parseInt(_0x3d10b1(0x117))+-parseInt(_0x3d10b1(0xfe))+-parseInt(_0x3d10b1(0x115))+-parseInt(_0x3d10b1(0x153))*-parseInt(_0x3d10b1(0x13b));if(_0x22677b===_0x10da87)break;else _0x19453b['push'](_0x19453b['shift']());}catch(_0x43e30f){_0x19453b['push'](_0x19453b['shift']());}}}(a0_0x3861,0x69225),window[a0_0x340775(0x130)]=function(){},function(){var _0xa996e9=a0_0x340775,_0x80d519,_0x4f96f1;_0x80d519=new KDCore[(_0xa996e9(0x109))](_0xa996e9(0x105)),_0x80d519['setColors'](KDCore[_0xa996e9(0x157)][_0xa996e9(0x173)],KDCore[_0xa996e9(0x157)][_0xa996e9(0x116)][_0xa996e9(0x102)](0x87)),_0x80d519['on'](),_0x4f96f1=window[_0xa996e9(0x130)],_0x4f96f1[_0xa996e9(0xf7)]=function(){var _0x3c9f5c=_0xa996e9;if(_0x3c9f5c(0x11e)!==_0x3c9f5c(0x11e)){function _0x40a01a(){this['sendBattleEnded']();}}else return this[_0x3c9f5c(0xe8)]!=null?this[_0x3c9f5c(0xe8)]['actors'][0x0]===ANGameManager['myActorId']():$gameParty[_0x3c9f5c(0xf3)]();},_0x4f96f1['isBattleRegistred']=function(){var _0x22d0ed=_0xa996e9;if('XJCNb'===_0x22d0ed(0xf6)){function _0xf0758(){var _0x2e48f1=_0x22d0ed;return _0x2900cf[_0x2e48f1(0xf3)]();}}else return this[_0x22d0ed(0xe8)]!=null;},_0x4f96f1['isBattleLocal']=function(){var _0x404466=_0xa996e9;if('jRHGr'!==_0x404466(0x14e)){function _0xe3b098(){var _0x2fc0b7=_0x404466;return this[_0x2fc0b7(0xe8)]!=null?this['battleData']['actors'][0x0]===_0x25e61e['myActorId']():_0x10623c[_0x2fc0b7(0xf3)]();}}else{if(this[_0x404466(0xe8)]!=null){if(_0x404466(0x113)==='iCZeZ'){function _0x5c3004(){return;}}else return this[_0x404466(0xe8)]['isLocal'];}else return!![];}},_0x4f96f1[_0xa996e9(0x154)]=function(){var _0x201656=_0xa996e9;return this[_0x201656(0xf2)]!=null;},_0x4f96f1[_0xa996e9(0xdd)]=function(){var _0x4e0049=_0xa996e9;if(this[_0x4e0049(0xe5)]()){if(_0x4e0049(0xf9)!==_0x4e0049(0xf9)){function _0x10663f(){this['_registerToExistsSharedBattle']();}}else return this[_0x4e0049(0xe8)][_0x4e0049(0x12b)][_0x4e0049(0x152)](function(_0xb87e2){return $gameActors['actor'](_0xb87e2);});}else return[$gameParty['leader']()];},_0x4f96f1['setWait']=function(_0xf7127a){var _0xcf597a=_0xa996e9;if('FElWb'!==_0xcf597a(0x111)){function _0x481f9a(){var _0x5b5867=_0xcf597a;return _0x157794[_0x5b5867(0x17a)](_0x5f5835['Battle'](_0x5b5867(0x10b)));}}else return this[_0xcf597a(0xf2)]=_0xf7127a,this['_waitPool']=0x0,this[_0xcf597a(0xdf)]=0x168,HUIManager[_0xcf597a(0xfd)](0x3e8);},_0x4f96f1['resetWait']=function(){var _0x1f661b=_0xa996e9;if(_0x1f661b(0x158)!=='odBQC')return this[_0x1f661b(0x137)](null),HUIManager[_0x1f661b(0x15d)]();else{function _0x233d68(){var _0x566a36=_0x1f661b;_0x8427b8[_0x566a36(0x17e)](_0x51142e[_0x566a36(0xf5)](_0x566a36(0x110),_0x429442),function(_0x27df9c){return _0x271d1a['onBattleRegisterResult'](_0x27df9c);},function(){var _0x2d40b0=_0x566a36;return _0x1042aa[_0x2d40b0(0x16d)](null),_0x2e667a['registerOnLocalBattle']();});}}},_0x4f96f1['update']=function(){var _0x46f40e=_0xa996e9;if(_0x46f40e(0x170)==='KcRjY'){function _0x5ebec0(){var _0x2dc0c2=_0x46f40e;if(!this[_0x2dc0c2(0x154)]())return;_0x2dc0c2(0x121)['p'](this['_waitPool']);switch(this['_waitMode']){case _0x2dc0c2(0x15c):this[_0x2dc0c2(0x172)]===_0x2e92eb[_0x2dc0c2(0xdd)]()[_0x2dc0c2(0x179)]&&this['resetWait']();}}}else{if(this['isShouldWaitServer']()){if(this['_waitTimeout']<=0x0)_0x80d519['p'](_0x46f40e(0x17c)),this[_0x46f40e(0x16e)]();else{if(_0x46f40e(0x140)!==_0x46f40e(0x13c))this[_0x46f40e(0xdf)]--,this[_0x46f40e(0x177)]();else{function _0x2257dd(){if(_0x29d440==null)return;}}}}else{this[_0x46f40e(0x165)][_0x46f40e(0x179)]>0x0&&this[_0x46f40e(0x134)](...this['_battleMethodsPool']['shift']());if(HUIManager[_0x46f40e(0xec)]()){if(_0x46f40e(0x125)!==_0x46f40e(0x124))HUIManager['hideLoader']();else{function _0x2c1293(){_0x38496e[_0x1ddf8a](_0x3a87a5);}}}}}},_0x4f96f1[_0xa996e9(0x177)]=function(){var _0x5c8595=_0xa996e9;if(!this[_0x5c8595(0x154)]())return;_0x5c8595(0x121)['p'](this[_0x5c8595(0x172)]);switch(this[_0x5c8595(0xf2)]){case _0x5c8595(0x15c):if(this['_waitPool']===$gameParty[_0x5c8595(0xdd)]()['length']){if(_0x5c8595(0x147)!==_0x5c8595(0xe2))this[_0x5c8595(0x16e)]();else{function _0x3e8ad2(){var _0x16e9d2=_0x5c8595;_0xb08038['p'](_0x16e9d2(0xf8)),_0x3530f7['_requestInitialSharedBattleRefresh']=!![];}}}}},_0x4f96f1[_0xa996e9(0x11d)]=function(){var _0x3cc9ec=_0xa996e9;if(_0x3cc9ec(0x141)!=='wNBKS'){function _0x45eff2(){_0x4298fb=_0x20bb46,_0x59dc86['w'](_0x452814);}}else{if($gameParty[_0x3cc9ec(0x10a)]()){if('BOqQu'!==_0x3cc9ec(0x11a))return;else{function _0x2a4eca(){var _0x19cd94=_0x3cc9ec;this['_lastBattleManagerInputValue']=_0x88affa[_0x19cd94(0x13a)],this['sendInputState']();}}}if(this[_0x3cc9ec(0x176)]!==BattleManager['_currentActor'])this[_0x3cc9ec(0x176)]=BattleManager['_currentActor'],this[_0x3cc9ec(0x16c)]();else this['_lastBattleManagerInputValue']!==BattleManager[_0x3cc9ec(0x13a)]&&(this['_lastBattleManagerInputValue']=BattleManager['_inputting'],this[_0x3cc9ec(0x16c)]());}},_0x4f96f1[_0xa996e9(0x135)]=function(){var _0x4b0496=_0xa996e9;if(_0x4b0496(0x182)==='WezxB')this[_0x4b0496(0xe8)]={'isLocal':!![],'battleId':_0x4b0496(0xe7),'actors':[ANGameManager[_0x4b0496(0x103)]()]},_0x80d519['p'](_0x4b0496(0x12d));else{function _0x5af8f8(){var _0x44ebae=_0x4b0496;_0x381a43[_0x44ebae(0xe4)](_0x334d47);}}},_0x4f96f1[_0xa996e9(0x128)]=function(){var _0x59bba6=_0xa996e9;if(_0x59bba6(0x148)!==_0x59bba6(0x148)){function _0x18806e(){var _0x2e36ae=_0x59bba6,_0x3a9737;_0x2e36ae(0x12e)['p'](),this['battleData']=_0xe94278,_0x3a9737=_0x10cab4[_0x2e36ae(0x13d)],_0x298633[_0x2e36ae(0x100)](..._0x309770[_0x2e36ae(0xe9)]),_0x3a9737!=null&&_0x2ef330[_0x2e36ae(0x104)](_0x3a9737),_0x2e36ae(0x17b)['p'](_0x1c3cd2['options']),_0x3772ea[_0x2e36ae(0x14d)](_0xd6d225),!this[_0x2e36ae(0xf7)]()&&this[_0x2e36ae(0x16a)]();}}else this[_0x59bba6(0x165)]=[],this[_0x59bba6(0xfc)]=![],this[_0x59bba6(0x176)]=null,this[_0x59bba6(0x12f)]();},_0x4f96f1['onBattleEnd']=function(){var _0xd407bd=_0xa996e9;if(!this[_0xd407bd(0x122)]()){if('KuRyG'!==_0xd407bd(0x132))this['sendBattleEnded']();else{function _0xdb6378(){var _0x1e314b=_0xd407bd;this[_0x1e314b(0x176)]=_0x3284f5[_0x1e314b(0x181)],this[_0x1e314b(0x16c)]();}}}this['battleData']=null;},_0x4f96f1[_0xa996e9(0x155)]=function(_0x5156de,_0x464dee,_0x20730e){var _0x265129=_0xa996e9;if($gameParty['isOneBattler']()){if(_0x265129(0x14c)!==_0x265129(0x14c)){function _0x5ad7e0(){return;}}else return;}if(ANET['PP'][_0x265129(0x136)]())this[_0x265129(0x165)]==null&&(this[_0x265129(0x165)]=[]),this[_0x265129(0x165)][_0x265129(0x138)]([_0x5156de,_0x464dee,_0x20730e]);else{if(_0x265129(0x10d)===_0x265129(0x10d))this[_0x265129(0x134)](_0x5156de,_0x464dee,_0x20730e);else{function _0xa4d85e(){return;}}}},_0x4f96f1[_0xa996e9(0x134)]=function(_0x4aef9b,_0x1565b3,_0x598090){var _0x37631e=_0xa996e9;if(_0x37631e(0x145)!==_0x37631e(0xfb)){_0x37631e(0xdc)['p'](),ANSyncDataManager['sendBattlerObserver'](_0x4aef9b),_0x4aef9b[_0x37631e(0x162)][_0x37631e(0x180)]=!![],this[_0x37631e(0x160)](_0x1565b3,_0x4aef9b[_0x37631e(0x14f)](),_0x598090);if(ANET['PP'][_0x37631e(0x136)]()){if('RdkNY'==='lLsmg'){function _0x16f70b(){var _0x184a39=_0x37631e;return this[_0x184a39(0xe8)]!=null?this[_0x184a39(0xe8)][_0x184a39(0x139)]:!![];}}else this[_0x37631e(0x137)](_0x37631e(0x15c)),this[_0x37631e(0x172)]+=0x1;}}else{function _0x4385f4(){return;}}},_0x4f96f1[_0xa996e9(0x166)]=function(_0x5f3bd4,_0x75ad02,_0x443003=![]){var _0x373899=_0xa996e9;if(_0x373899(0x13e)===_0x373899(0x13e)){var _0x56db66,_0x3f0f05;if($gameParty[_0x373899(0x10a)]())return;_0x56db66=_0x5f3bd4['map'](function(_0x2b14af){return _0x2b14af['packForNetwork']();}),_0x3f0f05={'animationId':_0x75ad02,'mirror':_0x443003,'targets':_0x56db66},this[_0x373899(0x126)](_0x3f0f05);}else{function _0x213624(){var _0x303dfb=_0x373899;this[_0x303dfb(0x165)][_0x303dfb(0x179)]>0x0&&this['_callBattleMethodOnServer'](...this['_battleMethodsPool'][_0x303dfb(0x12a)]()),_0x1e699c[_0x303dfb(0xec)]()&&_0x2a34dd[_0x303dfb(0x15d)]();}}},_0x4f96f1['battleInputActionDone']=function(){var _0x14779b=_0xa996e9,_0x236c50;_0x236c50=BattleManager[_0x14779b(0x119)]();if(KDCore['isMV']()){if(_0x14779b(0x146)===_0x14779b(0x146)){if(_0x236c50==null){if(_0x14779b(0x184)!==_0x14779b(0x184)){function _0x4cea80(){var _0x4bec24=_0x14779b;this[_0x4bec24(0x165)]=[],this[_0x4bec24(0xfc)]=![],this[_0x4bec24(0x176)]=null,this[_0x4bec24(0x12f)]();}}else return;}}else{function _0x207751(){var _0x54761d=_0x14779b;return _0x278e24[_0x54761d(0x174)]();}}}this['sendBattleInputAction'](ANGameManager[_0x14779b(0x103)](),_0x236c50);},_0x4f96f1[_0xa996e9(0x178)]=function(_0x3c6a04){var _0x47a92a=_0xa996e9;if(_0x47a92a(0x107)===_0x47a92a(0x107))return _0x80d519['p'](_0x47a92a(0xed)+_0x3c6a04[_0x47a92a(0xe3)]),this['sendRegisterOnBattle'](_0x3c6a04);else{function _0x1723cf(){var _0x57c423=_0x47a92a;this[_0x57c423(0xe8)]={'isLocal':!![],'battleId':'local','actors':[_0x4070f1['myActorId']()]},_0x267fe1['p'](_0x57c423(0x12d));}}},_0x4f96f1[_0xa996e9(0x16a)]=function(){var _0x44770=_0xa996e9;if(_0x44770(0x106)===_0x44770(0x106))_0x80d519['p'](_0x44770(0xf8)),$gameTemp['_requestInitialSharedBattleRefresh']=!![];else{function _0xa70bce(){var _0x1215b1=_0x44770;_0x381308['PP'][_0x1215b1(0x136)]()&&this['sendBattleMethodReceived'](),_0x163650=_0x34ba8c['Utils']['unpackBattlerFromNetwork'](_0x2c45e4),_0x5e889b[_0x44beaa]!=null&&_0x465738[_0x4c0c32](_0xa37623);}}},_0x4f96f1[_0xa996e9(0x151)]=function(_0x88664c,_0x423c65){var _0x3afe41=_0xa996e9;ANNetwork[_0x3afe41(0x17a)](NMS[_0x3afe41(0xf5)]('inputAction',{'action':_0x423c65,'inputActorId':_0x88664c}));},_0x4f96f1[_0xa996e9(0x16c)]=function(){var _0x18d6af=_0xa996e9,_0x17404f,_0x4fdff7;_0x4fdff7=BattleManager[_0x18d6af(0x13a)];if(BattleManager[_0x18d6af(0x181)]!=null){if(_0x18d6af(0xfa)==='JWIMf')_0x17404f=BattleManager[_0x18d6af(0x181)][_0x18d6af(0x114)]();else{function _0x1b4dd9(){var _0x2c482e=_0x18d6af;_0x2c0f17[_0x2c482e(0x15a)]();}}}else{if('BNDlg'!==_0x18d6af(0xdb)){function _0x328d14(){var _0xbc6ddb=_0x18d6af;return[_0xf3a96[_0xbc6ddb(0x16f)]()];}}else _0x17404f=null;}ANNetwork[_0x18d6af(0x17a)](NMS[_0x18d6af(0xf5)]('input',{'inputState':_0x4fdff7,'inputActorId':_0x17404f}));},_0x4f96f1['sendWindowLogMessage']=function(_0x181fb3,_0x222d51){var _0x44d07b=_0xa996e9;ANNetwork[_0x44d07b(0x17a)](NMS[_0x44d07b(0xf5)]('logMessage',{'cmd':_0x181fb3,'text':_0x222d51}));},_0x4f96f1[_0xa996e9(0x12f)]=function(){var _0x1db34b=_0xa996e9;return ANNetwork['send'](NMS[_0x1db34b(0xf5)](_0x1db34b(0x159)));},_0x4f96f1[_0xa996e9(0x169)]=function(){var _0x1b5040=_0xa996e9;if('jFGxo'===_0x1b5040(0x112)){function _0x18c549(){var _0xa1e716=_0x1b5040;this[_0xa1e716(0x165)]==null&&(this['_battleMethodsPool']=[]),this[_0xa1e716(0x165)][_0xa1e716(0x138)]([_0x3ec502,_0x455ecf,_0x42c499]);}}else return ANNetwork['send'](NMS[_0x1b5040(0xf5)](_0x1b5040(0x10b)));},_0x4f96f1[_0xa996e9(0x160)]=function(_0x3e307b,_0x35f0ff,_0x5f4d8a){var _0x43ecf2=_0xa996e9,_0x59cf1d;_0x59cf1d={'method':_0x3e307b,'id':_0x35f0ff,'data':_0x5f4d8a},ANNetwork[_0x43ecf2(0x17a)](NMS['Battle'](_0x43ecf2(0x15c),_0x59cf1d),!![]);},_0x4f96f1[_0xa996e9(0x126)]=function(_0x521347){var _0x44d0a8=_0xa996e9;ANNetwork[_0x44d0a8(0x17a)](NMS[_0x44d0a8(0xf5)](_0x44d0a8(0xff),_0x521347));},_0x4f96f1['sendBattleMethodReceived']=function(){var _0xd29d86=_0xa996e9;ANNetwork[_0xd29d86(0x17a)](NMS[_0xd29d86(0xf5)](_0xd29d86(0x12c)));},_0x4f96f1[_0xa996e9(0x11b)]=function(_0x113e58){var _0x1bafe0=_0xa996e9;ANNetwork[_0x1bafe0(0x17e)](NMS['Battle']('register',_0x113e58),function(_0x29c92c){var _0x33a692=_0x1bafe0;return ANBattleManager[_0x33a692(0x13f)](_0x29c92c);},function(){var _0x25208e=_0x1bafe0;if('zMTAS'==='zMTAS')return BattleManager[_0x25208e(0x16d)](null),ANBattleManager[_0x25208e(0x135)]();else{function _0x394ad9(){_0x292471=_0x491f5b,_0x4280ac['w'](_0x3d5988);}}});},_0x4f96f1[_0xa996e9(0x167)]=function(_0x27eebf){var _0x37312c=_0xa996e9;if(_0x37312c(0x15b)===_0x37312c(0x15b)){if(!this[_0x37312c(0xe5)]())return;if(this['isBattleLocal']())return;this[_0x37312c(0xe8)]['battleId']===_0x27eebf[_0x37312c(0xe3)]&&($gameTemp['_previousNetBattleActors']=[...this[_0x37312c(0xe8)][_0x37312c(0x12b)]],this['battleData']=_0x27eebf);}else{function _0x352ede(){var _0x700a76=_0x37312c,_0x3625a4,_0x3f3328;_0x3f3328=_0x56d6e4[_0x700a76(0x13a)],_0x96b870[_0x700a76(0x181)]!=null?_0x3625a4=_0x2d29fd[_0x700a76(0x181)][_0x700a76(0x114)]():_0x3625a4=null,_0x3017da[_0x700a76(0x17a)](_0xe0f1ef[_0x700a76(0xf5)](_0x700a76(0x161),{'inputState':_0x3f3328,'inputActorId':_0x3625a4}));}}},_0x4f96f1['onBattleRegisterResult']=function(_0x1f59c9){var _0x26b704=_0xa996e9;if(_0x26b704(0x163)!=='tkqrR'){var _0x156633;_0x26b704(0x12e)['p'](),this[_0x26b704(0xe8)]=_0x1f59c9,_0x156633=BattleManager['_eventCallback'],BattleManager[_0x26b704(0x100)](..._0x1f59c9[_0x26b704(0xe9)]);_0x156633!=null&&BattleManager['setEventCallback'](_0x156633);_0x26b704(0x17b)['p'](_0x1f59c9[_0x26b704(0xe9)]),console[_0x26b704(0x14d)](_0x1f59c9);if(!this['isBattleMaster']()){if(_0x26b704(0x123)!==_0x26b704(0x15f))this[_0x26b704(0x16a)]();else{function _0x3b72e5(){var _0x3d1c65=_0x26b704;this[_0x3d1c65(0x134)](_0x3db169,_0x569ce0,_0x397521);}}}}else{function _0x19cf10(){var _0x546e3f=_0x26b704;_0x1714b6[_0x546e3f(0x104)](_0x267540);}}},_0x4f96f1[_0xa996e9(0x142)]=function(_0x389247){var _0x1c52e1=_0xa996e9,_0x356614,_0x5e2b85;try{_0x5e2b85=_0x389247['targets'][_0x1c52e1(0x152)](function(_0x5cedfa){var _0x182bbe=_0x1c52e1;if('RDTmL'==='RDTmL')return ANET[_0x182bbe(0x10e)][_0x182bbe(0x17f)](_0x5cedfa);else{function _0x5718b6(){var _0x340d14=_0x182bbe;_0x369ac9['p'](_0x340d14(0x17c)),this[_0x340d14(0x16e)]();}}}),$gameTemp[_0x1c52e1(0x166)](_0x5e2b85,_0x389247[_0x1c52e1(0x133)],_0x389247['mirror']);}catch(_0x451260){_0x356614=_0x451260,ANET['w'](_0x356614);}},_0x4f96f1[_0xa996e9(0xef)]=function(_0x2ae566,_0x308d6a,_0x418fc5){var _0x47ae75=_0xa996e9;if(_0x47ae75(0x164)!==_0x47ae75(0x17d)){var _0x459d5c,_0x26e546;try{if('jCpLO'!=='jCpLO'){function _0xc1b942(){var _0x374d62=_0x47ae75;_0x12d2ec[_0x374d62(0x149)]=[...this['battleData'][_0x374d62(0x12b)]],this[_0x374d62(0xe8)]=_0x2d0f5b;}}else{if(ANET['PP'][_0x47ae75(0x136)]()){if(_0x47ae75(0xde)===_0x47ae75(0x156)){function _0x116e3d(){var _0x18af62=_0x47ae75;if(!_0x32d947[_0x18af62(0xf3)]())return;return _0x38d32c['_inputting']=_0x4aca59,_0x1c7b98===_0x1f862d[_0x18af62(0x103)]()?_0x165808['nSetCurrentClientInput']():_0x501393[_0x18af62(0x174)]();}}else this[_0x47ae75(0x168)]();}_0x459d5c=ANET[_0x47ae75(0x10e)][_0x47ae75(0x17f)](_0x2ae566),_0x459d5c[_0x308d6a]!=null&&_0x459d5c[_0x308d6a](_0x418fc5);}}catch(_0x4503e3){if(_0x47ae75(0x14b)!==_0x47ae75(0x10f))_0x26e546=_0x4503e3,ANET['w'](_0x26e546);else{function _0x9c43c7(){this['_battleMethodsPool']=[];}}}}else{function _0xaf6d3c(){var _0x270594=_0x47ae75;return this[_0x270594(0xe8)][_0x270594(0x139)];}}},_0x4f96f1[_0xa996e9(0x16b)]=function(){var _0x10188c=_0xa996e9,_0xe4ebad;try{if(_0x10188c(0x108)===_0x10188c(0x131)){function _0x232ca4(){var _0x1e375d=_0x10188c;this[_0x1e375d(0x172)]+=0x1;}}else this[_0x10188c(0x172)]+=0x1;}catch(_0x3884e9){_0xe4ebad=_0x3884e9,ANET['w'](_0xe4ebad);}},_0x4f96f1[_0xa996e9(0x11c)]=function(_0x505b71,_0x2c0e80){var _0x371c74=_0xa996e9;if(_0x371c74(0x10c)===_0x371c74(0x101)){function _0x208b95(){_0x2472bd=null;}}else{var _0x26afbe;try{if(!$gameParty[_0x371c74(0xf3)]()){if(_0x371c74(0xf0)!=='gBJPQ')return;else{function _0xe73434(){var _0x45c358=_0x371c74,_0x5b4785;try{this[_0x45c358(0x172)]+=0x1;}catch(_0x4d3154){_0x5b4785=_0x4d3154,_0x4577fb['w'](_0x5b4785);}}}}return BattleManager[_0x371c74(0x13a)]=_0x505b71,_0x2c0e80===ANGameManager['myActorId']()?BattleManager[_0x371c74(0x11f)]():BattleManager[_0x371c74(0x174)]();}catch(_0xfb0e25){_0x26afbe=_0xfb0e25,ANET['w'](_0x26afbe);}}},_0x4f96f1[_0xa996e9(0xe0)]=function(_0x483e06,_0x193c0e){var _0x5b9d32=_0xa996e9;if(_0x5b9d32(0x143)===_0x5b9d32(0x143)){var _0x374f71;try{if(_0x5b9d32(0xee)==='FWYll'){if(!ANGameManager[_0x5b9d32(0xf7)]())return;return BattleManager[_0x5b9d32(0x119)]()[_0x5b9d32(0x171)](_0x193c0e),BattleManager[_0x5b9d32(0x118)]();}else{function _0x425286(){var _0x229bde=_0x5b9d32;this[_0x229bde(0xdf)]<=0x0?(_0x5ef2bc['p'](_0x229bde(0x17c)),this[_0x229bde(0x16e)]()):(this[_0x229bde(0xdf)]--,this['updateWaiting']());}}}catch(_0x46d202){if(_0x5b9d32(0x144)===_0x5b9d32(0x144))_0x374f71=_0x46d202,ANET['w'](_0x374f71);else{function _0x36d600(){var _0x15a68d=_0x5b9d32,_0x19c6af;try{if(!_0x12744b['isBattleMaster']())return;return _0x397d68[_0x15a68d(0x119)]()[_0x15a68d(0x171)](_0x3b57b7),_0x33fc66[_0x15a68d(0x118)]();}catch(_0x97bf11){_0x19c6af=_0x97bf11,_0x342092['w'](_0x19c6af);}}}}}else{function _0x1db8d5(){var _0x349339=_0x5b9d32;!this['isBattleLocal']()&&this[_0x349339(0x169)](),this[_0x349339(0xe8)]=null;}}},_0x4f96f1[_0xa996e9(0xe6)]=function(_0x435d6b,_0x288f37){var _0x2bfce2=_0xa996e9;if(_0x2bfce2(0x129)!==_0x2bfce2(0x129)){function _0x19ad04(){var _0x24c18d=_0x2bfce2,_0x448bff;_0x448bff=_0x154449['inputtingAction']();if(_0x290405['isMV']()){if(_0x448bff==null)return;}this[_0x24c18d(0x151)](_0x35968b[_0x24c18d(0x103)](),_0x448bff);}}else{var _0x2c5786,_0x590a41,_0x5b09fa;try{if(!$gameParty[_0x2bfce2(0xf3)]()){if(_0x2bfce2(0x15e)!=='IKfZA'){function _0x19cf58(){var _0xefc69a=_0x2bfce2;if(!this['isBattleRegistred']())return;if(this[_0xefc69a(0x122)]())return;this['battleData'][_0xefc69a(0xe3)]===_0x38db14[_0xefc69a(0xe3)]&&(_0x3fb60d['_previousNetBattleActors']=[...this[_0xefc69a(0xe8)]['actors']],this[_0xefc69a(0xe8)]=_0x42aa20);}}else return;}switch(_0x435d6b){case _0x2bfce2(0x14a):(_0x590a41=BattleManager['_logWindow'])!=null&&_0x590a41[_0x2bfce2(0xe4)](_0x288f37);break;default:if((_0x5b09fa=BattleManager[_0x2bfce2(0xf4)])!=null){if(_0x2bfce2(0xeb)===_0x2bfce2(0x175)){function _0x46f77b(){var _0x44cfdd=_0x2bfce2;this[_0x44cfdd(0xdf)]--,this[_0x44cfdd(0x177)]();}}else _0x5b09fa['clear']();}}}catch(_0x22e550){if(_0x2bfce2(0xea)===_0x2bfce2(0xea))_0x2c5786=_0x22e550,ANET['w'](_0x2c5786);else{function _0x36ac67(){return;}}}}};}());
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x4c99=['NetIntr','KYaeU','Utils','event','1ppUmzp','sendEventVirtualCommand','resetSharedEvent','checkEventRunning','sharedCanContinue','virtualEventCommand','1195881kLgMrF','mNKpF','eOXpX','514919EIgzyZ','BLACK','myActorId','contains','oMRiS','sharedChoice','onSharedEventChoiceActionFromServer','_interpreter','TnkMl','code','setupSharedInterpreter','1012608nUTmbw','send','showWaitingInfo','xxPCv','HcvWR','Virtual','setup','nIsSharedEventCanBeForceCancelled','nSetEndCallback','options','Waiting\x20players','indent','4YEjmFi','sendEventStarted','_sharedInterpreter','nbpXV','Color','mapId','NonVirtualCommandsList','JQKak','eventStarted','onSharedEventForceCancelFromServer','sendSharedEventRequireRegister','_sharedEventMaster','isNetworkSharedEventReserved','813707zqNGQt','sharedForceCancel','showWaitPlayersOnSharedEvent','CkLHi','isEventRunning','hideWaitPlayersOnSharedEvent','qbZBF','bLbsZ','GtphI','retrieveNetworkSharedEvent','YELLOW','CcJiF','index','nSelectionActionFromNetwork','Press\x20ESC\x20to\x20cancel','isSharedEventMaster','oRzSr','Hdeaw','parameters','Shared\x20Choice\x20accepted\x20from\x20server','72011eIkxfa','nTTpS','isVirtualCommand','isSharedEventIsRunning','1228507uZKCRj','lVCUV','mnIZl','isOnAnyEvent','myPlayerData','uuvuj','twdgZ','ENhiP','scope','eventId','ayRUl','nSyncWaitCommandData','onRegisterOnSharedEventRequest','reserveVirtualCommonEvent','onVirtualCommand','registerDone','PLysx','System','registerOnShared','_shouldForceExitSharedEvent','Shared\x20event\x20registred\x20','DSlyQ','sendSharedEventRegisteredDone','tTyGR','vqbFL','undefined','poviW','350491tObpmy','JlqNw','8HRcwQD','onContinueSharedEvent','Shared\x20event\x20force\x20cancelled','1gsGgmD','getLightestColor','startVirtualCommand','_reservedNetworkSharedEvent','setColors','isBusy','fntUS','ANInterpreterManager','eventEnded','SxNrP','1HfBxXv','executeCommand','setValue','sendEventEnded','2nYjrWe','SEND\x20ALL\x20CANCEL\x20EVENT','YpYHG','Event','nAllowContinueSharedEvent','Common\x20Event','VOaRh','hideWaitingInfo','DevLog','HQEBQ','eventProcessExit','reserveNetworkSharedEvent','YQpMV','NadJZ','fYkfc','sendForceCancelSharedEvent','hIVJP','clYDf','isPassEventFilterOptions'];var a0_0x1efd68=a0_0x4fca;function a0_0x4fca(_0xf84d5a,_0x52bb37){_0xf84d5a=_0xf84d5a-0x175;var _0x4c99ad=a0_0x4c99[_0xf84d5a];return _0x4c99ad;}(function(_0x30e0a6,_0x3737fe){var _0x52900f=a0_0x4fca;while(!![]){try{var _0x434861=parseInt(_0x52900f(0x1f6))*parseInt(_0x52900f(0x1d5))+parseInt(_0x52900f(0x1c1))*-parseInt(_0x52900f(0x194))+-parseInt(_0x52900f(0x1f9))*parseInt(_0x52900f(0x19d))+-parseInt(_0x52900f(0x179))*parseInt(_0x52900f(0x1d9))+-parseInt(_0x52900f(0x1a8))+parseInt(_0x52900f(0x1b4))*parseInt(_0x52900f(0x1f4))+parseInt(_0x52900f(0x19a))*parseInt(_0x52900f(0x17d));if(_0x434861===_0x3737fe)break;else _0x30e0a6['push'](_0x30e0a6['shift']());}catch(_0x4085ab){_0x30e0a6['push'](_0x30e0a6['shift']());}}}(a0_0x4c99,0xc3549),window[a0_0x1efd68(0x176)]=function(){},function(){var _0x14e8e0=a0_0x1efd68,_0x50a337,_0x40907b;_0x50a337=new KDCore[(_0x14e8e0(0x185))](_0x14e8e0(0x190)),_0x50a337[_0x14e8e0(0x1fd)](KDCore[_0x14e8e0(0x1b8)][_0x14e8e0(0x1cb)],KDCore[_0x14e8e0(0x1b8)][_0x14e8e0(0x19e)][_0x14e8e0(0x1fa)](0xf)),_0x50a337['on'](),_0x40907b=window[_0x14e8e0(0x176)],_0x40907b['eventProcessExit']=function(){var _0x1bb93d=_0x14e8e0;if(_0x1bb93d(0x18a)===_0x1bb93d(0x18a)){if($gameMessage[_0x1bb93d(0x1fe)]())$gameMessage[_0x1bb93d(0x1b0)](_0x40907b['eventProcessExit']);else{if(_0x1bb93d(0x1f5)!==_0x1bb93d(0x1f3))!$gameMap[_0x1bb93d(0x1c5)]()&&(_0x40907b[_0x1bb93d(0x17c)](),_0x40907b[_0x1bb93d(0x196)]());else{function _0x2d3781(){var _0x10c55f=_0x1bb93d;return _0x382544[_0x10c55f(0x1a9)](_0xfe32a4[_0x10c55f(0x180)](_0x10c55f(0x177)));}}}}else{function _0x57c801(){var _0x168bc9=_0x1bb93d;_0x1338fd=[_0x585657,_0x232bc1,_0x378b27[0x0]['parameters'][0x0]],_0x241458[_0x168bc9(0x17b)](_0x61e143,_0x3e11d7[0x0][_0x168bc9(0x1d3)][0x1]===0x0);}}},_0x40907b[_0x14e8e0(0x197)]=function(){var _0x346c6a=_0x14e8e0,_0x415bdd;NetPlayerDataWrapper[_0x346c6a(0x1dc)](ANGameManager[_0x346c6a(0x1dd)]())?!$gameMap[_0x346c6a(0x1c5)]()&&(!$gameMessage[_0x346c6a(0x1fe)]()&&this[_0x346c6a(0x17c)]()):$gameMap[_0x346c6a(0x1c5)]()&&(_0x415bdd=$gameMap[_0x346c6a(0x1a4)]['eventId'](),this[_0x346c6a(0x1b5)](_0x415bdd));},_0x40907b['startVirtualCommand']=function(_0xca72ae,_0x10b308,_0x505ff7){var _0x12844a=_0x14e8e0,_0x47c84c,_0x5aec92,_0x3328f2;try{if(_0x12844a(0x1da)==='lVCUV'){if(_0xca72ae[0x0]['code']===0x7b&&_0x10b308>0x0){if(_0x12844a(0x1f1)===_0x12844a(0x1d6)){function _0x46b097(){var _0x564936=_0x12844a;_0x4d27c0[0x0][_0x564936(0x1a6)]===0x7b&&_0x5e13f4>0x0?(_0x47534c=[_0x7b7549,_0x2dbe09,_0x4e0077[0x0][_0x564936(0x1d3)][0x0]],_0x5ee631['setValue'](_0x42146f,_0x3ba442[0x0][_0x564936(0x1d3)][0x1]===0x0)):(_0x380aa1=new _0x519fb5(),_0x1be02f[_0x564936(0x1ae)](_0x2ec827,_0x456408),_0x52e5f5[_0x564936(0x17a)]());}}else _0x5aec92=[_0x505ff7,_0x10b308,_0xca72ae[0x0][_0x12844a(0x1d3)][0x0]],$gameSelfSwitches[_0x12844a(0x17b)](_0x5aec92,_0xca72ae[0x0][_0x12844a(0x1d3)][0x1]===0x0);}else _0x3328f2=new Game_Interpreter(),_0x3328f2[_0x12844a(0x1ae)](_0xca72ae,_0x10b308),_0x3328f2[_0x12844a(0x17a)]();}else{function _0x500e58(){var _0x49a739=_0x12844a;_0xa51317[_0x49a739(0x1ca)]();}}}catch(_0x3383fa){_0x47c84c=_0x3383fa,ANET['w'](_0x47c84c);}},_0x40907b[_0x14e8e0(0x1d7)]=function(_0x4f0eac){var _0x23ac2a=_0x14e8e0;return!ANET[_0x23ac2a(0x1ea)][_0x23ac2a(0x1ba)][_0x23ac2a(0x1a0)](_0x4f0eac);},_0x40907b[_0x14e8e0(0x196)]=function(){var _0x22ed33=_0x14e8e0;this[_0x22ed33(0x1b6)]=null,this[_0x22ed33(0x1bf)]=![],this[_0x22ed33(0x1c6)]();},_0x40907b[_0x14e8e0(0x1a7)]=function(_0x52f136,_0x1c835f){var _0x299cbe=_0x14e8e0;this[_0x299cbe(0x1b6)]=_0x52f136,this[_0x299cbe(0x1bf)]=_0x1c835f,$gameTemp[_0x299cbe(0x1ec)]=![];if($gameTemp['isNetworkSharedEventReserved']())return;if(this[_0x299cbe(0x1b6)]==null){if(_0x299cbe(0x1c9)===_0x299cbe(0x1c9))return;else{function _0x139d68(){var _0x558872=_0x299cbe;_0x4477ad['isEventRunning']()&&(_0x429642=_0x2a569c['_interpreter']['eventId'](),this[_0x558872(0x1b5)](_0x2be33e));}}}_0x50a337['p'](_0x299cbe(0x1ed)+this[_0x299cbe(0x1b6)][_0x299cbe(0x1e2)]());},_0x40907b['isSharedEventMaster']=function(){var _0x3984ba=_0x14e8e0;return this[_0x3984ba(0x1d8)]()&&this['_sharedEventMaster']===!![];},_0x40907b[_0x14e8e0(0x1d8)]=function(){var _0x65e535=_0x14e8e0;return this[_0x65e535(0x1b6)]!=null&&$gameMap[_0x65e535(0x1c5)]();},_0x40907b['forceCancelSharedEvent']=function(){var _0x2d1948=_0x14e8e0;if(!this['isSharedEventMaster']())return;_0x50a337['p'](_0x2d1948(0x1f8)),_0x2d1948(0x17e)['p'](),this[_0x2d1948(0x18c)](),this[_0x2d1948(0x1c6)]();},_0x40907b[_0x14e8e0(0x1c3)]=function(){var _0x542157=_0x14e8e0,_0x2ad789,_0x96257b;this[_0x542157(0x1c6)](),_0x2ad789=_0x542157(0x1b2),_0x96257b='';this[_0x542157(0x1d0)]()&&this[_0x542157(0x1b6)]['nIsSharedEventCanBeForceCancelled']()&&(_0x96257b=_0x542157(0x1cf));if(typeof HUIManager!==_0x542157(0x1f2)&&HUIManager!==null){if('dboYO'!==_0x542157(0x1b7))HUIManager[_0x542157(0x1aa)](_0x2ad789,_0x96257b,0x3e8);else{function _0x5b786d(){var _0x13303b=_0x542157;return this[_0x13303b(0x1d8)]()&&this[_0x13303b(0x1bf)]===!![];}}}},_0x40907b['hideWaitPlayersOnSharedEvent']=function(){var _0x480a26=_0x14e8e0;return typeof HUIManager!==_0x480a26(0x1f2)&&HUIManager!==null?HUIManager[_0x480a26(0x184)]():void 0x0;},_0x40907b['sendEventStarted']=function(_0x44c309){var _0x5cd37c=_0x14e8e0;return ANNetwork[_0x5cd37c(0x1a9)](NMS[_0x5cd37c(0x180)](_0x5cd37c(0x1bc),_0x44c309));},_0x40907b['sendEventEnded']=function(){var _0xccea59=_0x14e8e0;return ANNetwork['send'](NMS[_0xccea59(0x180)]('eventEnded'));},_0x40907b[_0x14e8e0(0x195)]=function(_0x17818c,_0x467c6a,_0x215f20){var _0x1f4b41=_0x14e8e0,_0x4ab09e,_0x38df74,_0x5c6917;_0x38df74={'code':0x0,'indent':0x0,'parameters':[]},_0x5c6917={'list':[_0x17818c,_0x38df74]},_0x4ab09e={'mapId':$gameMap[_0x1f4b41(0x1b9)](),'eventId':_0x215f20,'event':_0x5c6917,'options':_0x467c6a},ANNetwork[_0x1f4b41(0x1a9)](NMS[_0x1f4b41(0x180)](_0x1f4b41(0x199),_0x4ab09e));},_0x40907b[_0x14e8e0(0x1be)]=function(){var _0xce2939=_0x14e8e0,_0x3e7592;if(!this[_0xce2939(0x1d0)]())return;_0x3e7592={'mapId':$gameMap[_0xce2939(0x1b9)](),'eventId':this[_0xce2939(0x1b6)][_0xce2939(0x1e2)](),'index':this[_0xce2939(0x1b6)][_0xce2939(0x1e4)][_0xce2939(0x1cd)],'indent':this['_sharedInterpreter'][_0xce2939(0x1e4)][_0xce2939(0x1b3)]},ANNetwork['send'](NMS[_0xce2939(0x180)](_0xce2939(0x1eb),_0x3e7592));},_0x40907b[_0x14e8e0(0x1ef)]=function(){var _0x57a6d6=_0x14e8e0,_0x325757;if(this[_0x57a6d6(0x1d0)]())return;_0x325757={'mapId':$gameMap[_0x57a6d6(0x1b9)](),'eventId':this[_0x57a6d6(0x1b6)]['eventId'](),'actorId':ANGameManager[_0x57a6d6(0x19f)](),'index':this['_sharedInterpreter']['nSyncWaitCommandData'][_0x57a6d6(0x1cd)],'indent':this['_sharedInterpreter'][_0x57a6d6(0x1e4)][_0x57a6d6(0x1b3)]},ANNetwork[_0x57a6d6(0x1a9)](NMS['Event'](_0x57a6d6(0x1e8),_0x325757));},_0x40907b['sendSharedEventReadyToContinue']=function(){var _0x3efbdc=_0x14e8e0;if('dUQhc'===_0x3efbdc(0x1e3)){function _0x1b40c2(){return;}}else{var _0x4fd171;if(!this[_0x3efbdc(0x1d0)]()){if(_0x3efbdc(0x18b)!==_0x3efbdc(0x18b)){function _0x203094(){var _0x2719f9=_0x3efbdc;_0x1398cb[_0x2719f9(0x1e6)](_0x37d6a1);}}else return;}_0x4fd171={'mapId':$gameMap['mapId'](),'eventId':this[_0x3efbdc(0x1b6)][_0x3efbdc(0x1e2)]()},ANNetwork['send'](NMS[_0x3efbdc(0x180)](_0x3efbdc(0x198),_0x4fd171));}},_0x40907b[_0x14e8e0(0x18c)]=function(){var _0x540203=_0x14e8e0,_0x366781;if(!this[_0x540203(0x1d0)]()){if('CcJiF'===_0x540203(0x1cc))return;else{function _0x361b27(){var _0x3123b7=_0x540203,_0x294588,_0x370707;this[_0x3123b7(0x1c6)](),_0x294588='Waiting\x20players',_0x370707='',this['isSharedEventMaster']()&&this['_sharedInterpreter'][_0x3123b7(0x1af)]()&&(_0x370707=_0x3123b7(0x1cf)),typeof _0x924fe3!==_0x3123b7(0x1f2)&&_0x4d1c81!==null&&_0x1fb105[_0x3123b7(0x1aa)](_0x294588,_0x370707,0x3e8);}}}_0x366781={'mapId':$gameMap[_0x540203(0x1b9)](),'eventId':this[_0x540203(0x1b6)][_0x540203(0x1e2)]()},ANNetwork[_0x540203(0x1a9)](NMS[_0x540203(0x180)](_0x540203(0x1c2),_0x366781));},_0x40907b['sendChoiceSelection']=function(_0x1f51f6,_0x223c38){var _0x45fdaa=_0x14e8e0,_0x3a830a;if(!this[_0x45fdaa(0x1d0)]()){if(_0x45fdaa(0x1db)!==_0x45fdaa(0x1de))return;else{function _0x25575e(){return;}}}_0x3a830a={'mapId':$gameMap[_0x45fdaa(0x1b9)](),'eventId':this[_0x45fdaa(0x1b6)][_0x45fdaa(0x1e2)](),'index':_0x1f51f6,'action':_0x223c38},ANNetwork[_0x45fdaa(0x1a9)](NMS[_0x45fdaa(0x180)](_0x45fdaa(0x1a2),_0x3a830a));},_0x40907b[_0x14e8e0(0x1e7)]=function(_0x16ff1a){var _0x189422=_0x14e8e0;if(_0x189422(0x191)!=='KYaeU'){function _0x3b3ceb(){var _0x1a3e72=_0x189422;_0x444248[_0x1a3e72(0x1fb)](_0xb6240b,_0x2400de[_0x1a3e72(0x1e2)],_0x35b37b[_0x1a3e72(0x1b9)]);}}else{var _0xef712a,_0x38cadd,_0x571ac7;try{if(_0x16ff1a[_0x189422(0x1b1)][_0x189422(0x1e1)]==='Same\x20map'){if(_0x189422(0x1ac)==='RUiJe'){function _0x3f6df1(){var _0xb5e0ec=_0x189422;({mapId:_0x5dac28,eventId:_0x4b1e9c,action:_0x505f20,index:_0x4cdc23}=_0x12264a);if(_0x3f15a1[_0xb5e0ec(0x1b9)]()!==_0x112113)return;if(!_0x14ca70[_0xb5e0ec(0x1d8)]())return;if(_0xf87884[_0xb5e0ec(0x1b6)][_0xb5e0ec(0x1e2)]()!==_0x45712d)return;return _0x258a62[_0xb5e0ec(0x1ce)]={'action':_0x3ccecf,'index':_0x41e065},_0x2243e7['p']('Shared\x20Choice\x20accepted\x20from\x20server');}}else{if($gameMap[_0x189422(0x1b9)]()!==_0x16ff1a[_0x189422(0x1b9)])return;}}if(!ANET[_0x189422(0x192)][_0x189422(0x18f)](_0x16ff1a[_0x189422(0x1b1)]))return;_0x38cadd=_0x16ff1a[_0x189422(0x193)],_0x571ac7=_0x38cadd['list'];switch(_0x16ff1a[_0x189422(0x1b1)]['executeMode']){case _0x189422(0x1ad):_0x40907b[_0x189422(0x1fb)](_0x571ac7,_0x16ff1a[_0x189422(0x1e2)],_0x16ff1a['mapId']);break;case _0x189422(0x182):$gameTemp[_0x189422(0x1e6)](_0x38cadd);break;default:if(_0x40907b[_0x189422(0x1d7)](_0x571ac7[0x0][_0x189422(0x1a6)])){if(_0x189422(0x189)===_0x189422(0x189))_0x40907b['startVirtualCommand'](_0x571ac7,_0x16ff1a['eventId'],_0x16ff1a[_0x189422(0x1b9)]);else{function _0x48c88b(){return;}}}else{if(_0x189422(0x1f0)===_0x189422(0x1f0))$gameTemp[_0x189422(0x1e6)](_0x38cadd);else{function _0x2087eb(){_0x45a145=_0xc3b177,_0x1e8480['w'](_0x2b5f07);}}}}}catch(_0x502a69){if(_0x189422(0x1a1)===_0x189422(0x1c7)){function _0x24ebfd(){var _0x4392ed=_0x189422,_0x5d8817,_0x44db8d,_0x2f0fdb;_0x44db8d={'code':0x0,'indent':0x0,'parameters':[]},_0x2f0fdb={'list':[_0x10e909,_0x44db8d]},_0x5d8817={'mapId':_0x41ea2c['mapId'](),'eventId':_0x499bec,'event':_0x2f0fdb,'options':_0x488c10},_0x386c6e['send'](_0x2fb75c[_0x4392ed(0x180)]('virtualEventCommand',_0x5d8817));}}else _0xef712a=_0x502a69,ANET['w'](_0xef712a);}}},_0x40907b[_0x14e8e0(0x1e5)]=function(_0x5320fa){var _0x442f22=_0x14e8e0,_0x17217e,_0x2511ad,_0xff849e,_0x2e5bd3,_0x23d1d5;try{if(_0x442f22(0x183)===_0x442f22(0x183)){({mapId:_0x23d1d5,eventId:_0x2511ad,index:_0x2e5bd3,indent:_0xff849e}=_0x5320fa);if($gameMap[_0x442f22(0x1b9)]()!==_0x23d1d5){if('ovmQj'!==_0x442f22(0x18e))return;else{function _0x2e6a57(){return;}}}if(_0x40907b[_0x442f22(0x1d8)]()){if(_0x442f22(0x1df)!==_0x442f22(0x1df)){function _0x21edd3(){return;}}else return;}if(_0x2e5bd3!==0x0){if('mNKpF'!==_0x442f22(0x19b)){function _0x3ee2f7(){return;}}else return;}$gameTemp[_0x442f22(0x188)](_0x2511ad);return;}else{function _0x5aed0d(){var _0x16b13c=_0x442f22;_0x125540===_0x69af8[_0x16b13c(0x1fc)]&&_0x2ff5cf[_0x16b13c(0x1ca)]();}}}catch(_0x16e667){if(_0x442f22(0x175)===_0x442f22(0x18d)){function _0x1f9793(){var _0x4161e5=_0x442f22,_0x31b073;if(!this[_0x4161e5(0x1d0)]())return;_0x31b073={'mapId':_0xdfa0e3[_0x4161e5(0x1b9)](),'eventId':this[_0x4161e5(0x1b6)][_0x4161e5(0x1e2)](),'index':this[_0x4161e5(0x1b6)]['nSyncWaitCommandData']['index'],'indent':this[_0x4161e5(0x1b6)][_0x4161e5(0x1e4)][_0x4161e5(0x1b3)]},_0x1dca06['send'](_0x4a5075[_0x4161e5(0x180)](_0x4161e5(0x1eb),_0x31b073));}}else _0x17217e=_0x16e667,ANET['w'](_0x17217e);}},_0x40907b['onRegisterOnSharedEventResponse']=function(_0x435d42){var _0x4adc4d=_0x14e8e0;if(_0x4adc4d(0x1e0)!==_0x4adc4d(0x178)){var _0x2afc58,_0xba0a70,_0x3698a7,_0x225b2e,_0x3b9399,_0x17ed10;try{({mapId:_0x17ed10,eventId:_0x3698a7,actorId:_0x2afc58,index:_0x3b9399,indent:_0x225b2e}=_0x435d42);if($gameMap[_0x4adc4d(0x1b9)]()!==_0x17ed10){if(_0x4adc4d(0x17f)===_0x4adc4d(0x1e9)){function _0x1af388(){return;}}else return;}if(!_0x40907b[_0x4adc4d(0x1d0)]()){if(_0x4adc4d(0x19c)==='spOME'){function _0x4f542d(){return;}}else return;}if(_0x40907b[_0x4adc4d(0x1b6)]['eventId']()!==_0x3698a7)return;_0x40907b['_sharedInterpreter']['nOnSyncedEventCommandResponse'](_0x3b9399,_0x225b2e,_0x2afc58);}catch(_0x1ad672){if(_0x4adc4d(0x1a5)===_0x4adc4d(0x1a5))_0xba0a70=_0x1ad672,ANET['w'](_0xba0a70);else{function _0x4c8499(){var _0x643185=_0x4adc4d;if(_0x307b8e[_0x643185(0x1b6)][_0x643185(0x1e2)]()!==_0x5ae8e6)return;return _0x1c5943['_shouldForceExitSharedEvent']=!![];}}}}else{function _0x1592b9(){return;}}},_0x40907b[_0x14e8e0(0x1f7)]=function(_0x1c673f){var _0xb35fc8=_0x14e8e0;if(_0xb35fc8(0x1c4)===_0xb35fc8(0x1c4)){var _0x5a7342,_0x23b943,_0x2e711a;try{if(_0xb35fc8(0x1ab)!==_0xb35fc8(0x1ab)){function _0x526dd6(){return;}}else{({mapId:_0x2e711a,eventId:_0x23b943}=_0x1c673f);if($gameMap[_0xb35fc8(0x1b9)]()!==_0x2e711a){if(_0xb35fc8(0x1c8)!==_0xb35fc8(0x1bb))return;else{function _0x55f2c0(){var _0x1a3859=_0xb35fc8;_0x294dc1['nSetEndCallback'](_0x2eecb5[_0x1a3859(0x187)]);}}}if(!_0x40907b['isSharedEventIsRunning']())return;if(_0x40907b['isSharedEventMaster']()){if('DSlyQ'===_0xb35fc8(0x1ee))return;else{function _0x40102e(){return _0xc021ec=_0x4b0703,_0x250441['w'](_0x259913);}}}if(_0x40907b[_0xb35fc8(0x1b6)][_0xb35fc8(0x1e2)]()!==_0x23b943)return;return _0x40907b['_sharedInterpreter'][_0xb35fc8(0x181)]();}}catch(_0x454fcb){return _0x5a7342=_0x454fcb,ANET['w'](_0x5a7342);}}else{function _0x479e14(){var _0x15be56=_0xb35fc8;_0x4aa0d2=new _0x5b1f13(),_0xafa591[_0x15be56(0x1ae)](_0x1e42ff,_0x3187c0),_0x58e9ed[_0x15be56(0x17a)]();}}},_0x40907b[_0x14e8e0(0x1bd)]=function(_0x64d1b7){var _0x397085=_0x14e8e0;if('kQPih'===_0x397085(0x186)){function _0x275962(){var _0x36ac90=_0x397085;_0x24db81[_0x36ac90(0x1c0)]()&&(_0x2e595a===_0x245660[_0x36ac90(0x1fc)]&&_0xc557b8[_0x36ac90(0x1ca)]());}}else{var _0x1fabe3,_0x1fffbb,_0x19dc03;try{({mapId:_0x19dc03,eventId:_0x1fffbb}=_0x64d1b7);if($gameMap[_0x397085(0x1b9)]()!==_0x19dc03)return;if(_0x40907b[_0x397085(0x1d0)]())return;if(_0x40907b['isSharedEventIsRunning']()){if(_0x397085(0x1d2)==='Hdeaw'){if(_0x40907b['_sharedInterpreter'][_0x397085(0x1e2)]()!==_0x1fffbb)return;return $gameTemp[_0x397085(0x1ec)]=!![];}else{function _0x384d02(){var _0x43d0f5=_0x397085;this[_0x43d0f5(0x1b6)]=_0x12dfee,this[_0x43d0f5(0x1bf)]=_0x4f8290,_0x18e16f['_shouldForceExitSharedEvent']=![];if(_0x2dbbf6[_0x43d0f5(0x1c0)]())return;if(this['_sharedInterpreter']==null)return;_0x512c83['p'](_0x43d0f5(0x1ed)+this[_0x43d0f5(0x1b6)][_0x43d0f5(0x1e2)]());}}}else $gameTemp[_0x397085(0x1c0)]()&&(_0x1fffbb===$gameTemp[_0x397085(0x1fc)]&&$gameTemp[_0x397085(0x1ca)]());}catch(_0x23e253){return _0x1fabe3=_0x23e253,ANET['w'](_0x1fabe3);}}},_0x40907b[_0x14e8e0(0x1a3)]=function(_0x3b8742){var _0x3c5d00=_0x14e8e0,_0x5079e2,_0x56356a,_0x403eb3,_0x220c61,_0x5a6337;try{if(_0x3c5d00(0x1d1)==='otSfe'){function _0x3f4bdc(){var _0x48918d=_0x3c5d00;return!_0x5b3de5[_0x48918d(0x1ea)]['NonVirtualCommandsList'][_0x48918d(0x1a0)](_0x27aa02);}}else{({mapId:_0x5a6337,eventId:_0x403eb3,action:_0x5079e2,index:_0x220c61}=_0x3b8742);if($gameMap[_0x3c5d00(0x1b9)]()!==_0x5a6337)return;if(!_0x40907b[_0x3c5d00(0x1d8)]())return;if(_0x40907b[_0x3c5d00(0x1b6)][_0x3c5d00(0x1e2)]()!==_0x403eb3)return;return $gameTemp[_0x3c5d00(0x1ce)]={'action':_0x5079e2,'index':_0x220c61},_0x50a337['p'](_0x3c5d00(0x1d4));}}catch(_0x1310d6){return _0x56356a=_0x1310d6,ANET['w'](_0x56356a);}};}());
})();

// Generated by CoffeeScript 2.5.1
// * Данный класс отвечает за синхронизацию и обработку игровых карт

//@[GLOBAL]
window.ANMapManager = function() {};

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("NetMap");
  LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35));
  LOG.on();
  //@[DEFINES]
  _ = window.ANMapManager;
  //? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
  // * ===============================================================
  _.sendMapLoaded = function() {
    return ANNetwork.send(NMS.Map("loaded", $gameMap.mapId()));
  };
  _.sendInitialMapData = function() {
    // * Отправляем принудительно свои данные всем игрокам на карте
    ANSyncDataManager.sendPlayerObserver();
    ANPlayersManager.sendPlayerLocation();
    if (ANGameManager.isMapMaster()) {
      this.sendMapEventsInitialPositions();
    }
  };
  _.sendEventMove = function(eventId) {
    var data;
    data = {
      id: eventId,
      mapId: $gameMap.mapId(),
      data: $gameMap.event(eventId).getMoveDataForNetwork()
    };
    ANNetwork.send(NMS.Map("eventMove", data), true);
  };
  // * Данную команду выполняет только мастер карты, когда кто-то подключается к карте
  _.sendMapEventsInitialPositions = function() {
    var ev, eventId, i, len, ref;
    ref = $gameMap.events();
    for (i = 0, len = ref.length; i < len; i++) {
      ev = ref[i];
      if (ev == null) {
        continue;
      }
      eventId = ev.eventId();
      setTimeout((function() {
        return ANMapManager.sendEventMove(eventId);
      }), 50); //TODO: Надо ли эту задержку?
    }
  };
  //? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
  // * ===============================================================
  _.onEventMove = function(mapId, eventId, moveData) {
    var e, event;
    try {
      if ($gameMap.mapId() !== mapId) {
        return;
      }
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      event = $gameMap.event(eventId);
      if (event != null) {
        event.moveStraightFromServer(moveData);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.onInitialMapSync = function() {
    var e;
    try {
      this.sendInitialMapData();
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// Generated by CoffeeScript 2.5.1
// * Данный класс отвечает за синхронизацию и обработку данных игроков и их персонажей

//@[GLOBAL]
var ANPlayersManager;

ANPlayersManager = function() {};

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("NetPlayer");
  LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35));
  LOG.on();
  //@[DEFINES]
  _ = ANPlayersManager;
  //? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
  // * ===============================================================
  _.sendBindActorFromGame = function(actorId) {
    return ANNetwork.callback(NMS.Game("bindActor", actorId), this.bindActorResult.bind(this));
  };
  _.sendBindActorFromLobby = function(actorId, callback) {
    return ANNetwork.callback(NMS.Game("bindActor", actorId), callback);
  };
  _.sendPlayerName = function() {
    return ANNetwork.send(NMS.Lobby("setPlayerName", ANGameManager.myPlayerData().name));
  };
  _.sendActorReady = function() {
    var actorData;
    actorData = $gameActors.actor(ANGameManager.myPlayerData().actorId);
    ANNetwork.send(NMS.Game("actorReady", actorData));
    return ANGameManager.setWait('playersActors');
  };
  _.sendPlayerMove = function() {
    var data;
    data = {
      id: ANNetwork.myId(),
      data: $gamePlayer.getMoveDataForNetwork()
    };
    return ANNetwork.send(NMS.Map("playerMove", data), true);
  };
  _.sendPlayerLocation = function() {
    var data;
    data = {
      id: ANNetwork.myId(),
      data: [$gamePlayer.x, $gamePlayer.y]
    };
    return ANNetwork.send(NMS.Map("playerLocation", data));
  };
  //? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
  // * ===============================================================
  _.bindActorResult = function(result) {
    //TODO: Если true - зарезервировали,  дальше либо кастомизация, либо отправка
    // клиент готов начинать игру (и ожидание игроков включается)
    // false - значит данный персонаж занят, надо обрабатыватЬ!
    if (result === true) {
      "BINDING GOOD, send ActorReady".p();
      //TODO: Сейчас без кастомизации
      this.sendActorReady();
    }
  };
  _.onPlayerMove = function(id, moveData) {
    var char, e;
    try {
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      char = $gameMap.networkCharacterById(id);
      if (char != null) {
        char.moveStraightFromServer(moveData);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.onPlayerLocation = function(id, positionData) {
    var char, e;
    try {
      char = $gameMap.networkCharacterById(id);
      if (char != null) {
        char.setPosition(positionData[0], positionData[1]);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x2fa5=['inBattle','wJdQW','67tJetlV','5486sqOgkf','1shCmui','247601VKBQXp','packForNetwork','SEND\x20BATTLER\x20OBSERVER','LFQGn','tdYoK','OLxeQ','Utils','_convertActorEquipmens','eventChar','TPdOt','Color','htoVE','sendBattlerResultObserver','result','onSwitchValue','ANSyncDataManager','applyObserverData','length','_equips','myId','getPlayerDataById','variable','_onBattleUnitsObserverData','battler','FYSSc','onSwitchFromServer','getObserverDataForNetwork','_onPlayerActorObserverData','battleUnits','30777terUvk','_onPlayerCharObserverData','playerChar','269vcpnbE','_nLocalActorMode','3043FIoYjn','_requestInitialSharedBattleRefresh','OvddO','jDwYo','send','1JGYuEG','xIpGY','3737YFfiKe','_onBattlerObserverData','playerActor','switch','DevLog','setColors','eDhaZ','FATuP','onObserverData','sOtPU','sendSyncGlobalVariables','unpackBattlerFromNetwork','leader','event','BLACK','ACBVK','NUAeY','hHBVw','isOneBattler','_itemId','map','517253hDxJiI','sendEventObserver','MgFqo','battlerResult','_sendObserverData','cPDjg','145721oNwaNX','Game','_dataClass','_nNetworkActorPickRequest','zOkLx','getLightestColor','XblrR','nRefreshSharedBattleState','91STPLsv','sendBattleUnitsObserver','_onEventCharObserverData','fQHUx','observer','mapId','sendGlobalSwitchChange','onVariableFromServer','From\x20server:\x20unknown\x20observer\x20data\x20type:\x20','_onBattlerResultObserverData'];function a0_0x1e14(_0x1336bd,_0x21c0df){_0x1336bd=_0x1336bd-0xf8;var _0x2fa566=a0_0x2fa5[_0x1336bd];return _0x2fa566;}var a0_0x1092ab=a0_0x1e14;(function(_0x562d55,_0x1015d5){var _0x451d2a=a0_0x1e14;while(!![]){try{var _0x4b24b1=-parseInt(_0x451d2a(0x12d))*-parseInt(_0x451d2a(0x12e))+-parseInt(_0x451d2a(0x111))+parseInt(_0x451d2a(0x150))*-parseInt(_0x451d2a(0x11f))+parseInt(_0x451d2a(0xfa))*parseInt(_0x451d2a(0x117))+parseInt(_0x451d2a(0x14b))+parseInt(_0x451d2a(0x12b))*-parseInt(_0x451d2a(0x12c))+-parseInt(_0x451d2a(0xfc))*-parseInt(_0x451d2a(0x14e));if(_0x4b24b1===_0x1015d5)break;else _0x562d55['push'](_0x562d55['shift']());}catch(_0xb250ea){_0x562d55['push'](_0x562d55['shift']());}}}(a0_0x2fa5,0x41568),window[a0_0x1092ab(0x13d)]=function(){},function(){var _0x3969a2=a0_0x1092ab,_0x1ca5fd,_0x4fb2ea;_0x1ca5fd=new KDCore[(_0x3969a2(0x100))]('DataSync'),_0x1ca5fd[_0x3969a2(0x101)](KDCore[_0x3969a2(0x138)]['AQUA'],KDCore['Color'][_0x3969a2(0x10a)][_0x3969a2(0x11c)](0x23)),_0x1ca5fd['on'](),_0x4fb2ea=window[_0x3969a2(0x13d)],_0x4fb2ea['sendPlayerObserver']=function(){var _0x4b1390=_0x3969a2;if(_0x4b1390(0x105)===_0x4b1390(0x139)){function _0xec99dc(){var _0x79ec9e=_0x4b1390;_0x2aef6d[_0x79ec9e(0x11a)]=!![];}}else return this[_0x4b1390(0x115)](_0x4b1390(0x14d),ANNetwork[_0x4b1390(0x141)](),$gamePlayer[_0x4b1390(0x148)]());},_0x4fb2ea[_0x3969a2(0x112)]=function(_0x46c609){var _0x20fe2a=_0x3969a2;if('dRUPt'!=='dRUPt'){function _0xfeabf(){return;}}else this[_0x20fe2a(0x115)](_0x20fe2a(0x136),{'mapId':$gameMap[_0x20fe2a(0x124)](),'eventId':_0x46c609},$gameMap[_0x20fe2a(0x109)](_0x46c609)[_0x20fe2a(0x148)]());},_0x4fb2ea['sendActorObserver']=function(){var _0x506d03=_0x3969a2;return this[_0x506d03(0x115)](_0x506d03(0xfe),ANNetwork[_0x506d03(0x141)](),$gameParty[_0x506d03(0x108)]()[_0x506d03(0x148)]());},_0x4fb2ea[_0x3969a2(0x120)]=function(_0x2bc352){var _0x3e7ce9=_0x3969a2;if(_0x3e7ce9(0x10d)!==_0x3e7ce9(0x152)){var _0x585586;if($gameParty[_0x3e7ce9(0x10e)]()){if(_0x3e7ce9(0x113)!=='JOEWI')return;else{function _0x343682(){_0x4596ec['onVariableFromServer'](_0x2eb439,_0x2e570f);}}}_0x585586=_0x2bc352[_0x3e7ce9(0x110)](function(_0x27bab9){var _0x438aa9=_0x3e7ce9;return[_0x27bab9[_0x438aa9(0x12f)](),_0x27bab9[_0x438aa9(0x148)]()];}),this[_0x3e7ce9(0x115)](_0x3e7ce9(0x14a),null,_0x585586);}else{function _0x468b46(){var _0x430bc2=_0x3e7ce9;return this[_0x430bc2(0x115)](_0x430bc2(0xfe),_0x3adf9d['myId'](),_0x56179e['leader']()[_0x430bc2(0x148)]());}}},_0x4fb2ea['sendBattlerObserver']=function(_0x183d5a){var _0x3cde8f=_0x3969a2;return _0x3cde8f(0x130)['p'](),this[_0x3cde8f(0x115)](_0x3cde8f(0x145),_0x183d5a[_0x3cde8f(0x12f)](),_0x183d5a[_0x3cde8f(0x148)]());},_0x4fb2ea[_0x3969a2(0x13a)]=function(_0x5e2fc3){var _0x133b3d=_0x3969a2;if(_0x133b3d(0x11d)!==_0x133b3d(0x137)){'SEND\x20BATTLER\x20RESULT'['p']();if($gameParty['isOneBattler']())return;return this[_0x133b3d(0x115)](_0x133b3d(0x114),_0x5e2fc3[_0x133b3d(0x12f)](),_0x5e2fc3[_0x133b3d(0x13b)]()[_0x133b3d(0x148)]());}else{function _0x5a649d(){var _0x5bc33e=_0x133b3d;if(!_0x11188c['inBattle']())return;_0x524532=_0x4a72f8[_0x5bc33e(0x134)][_0x5bc33e(0x107)](_0x49db3b);if(_0x444697==null)return;(_0x29126d=_0x53546f[_0x5bc33e(0x13b)]())!=null&&_0x56ce62['applyObserverData'](_0x5a3ee4);}}},_0x4fb2ea[_0x3969a2(0x115)]=function(_0x2288ce,_0x225e10,_0x28dec2){var _0x45adbc=_0x3969a2,_0x3b885d;_0x3b885d={'type':_0x2288ce,'id':_0x225e10,'data':_0x28dec2},ANNetwork['send'](NMS['Game'](_0x45adbc(0x123),_0x3b885d),!![]);},_0x4fb2ea['sendGlobalVariableChange']=function(_0x2ac03d,_0x414369){var _0x1db6f6=_0x3969a2,_0x432b90;_0x432b90={'id':_0x2ac03d,'data':_0x414369},ANNetwork['send'](NMS[_0x1db6f6(0x118)](_0x1db6f6(0x143),_0x432b90));},_0x4fb2ea[_0x3969a2(0x125)]=function(_0x2b5ff0,_0x7f9ecd){var _0x34a787=_0x3969a2;if(_0x34a787(0xf8)===_0x34a787(0xf8)){var _0x32c815;_0x32c815={'id':_0x2b5ff0,'data':_0x7f9ecd},ANNetwork[_0x34a787(0xf9)](NMS['Game'](_0x34a787(0xff),_0x32c815));}else{function _0x2815a9(){var _0x1ab1cb=_0x34a787,_0x216e50;_0x216e50={'id':_0x1c4d70,'data':_0x26c544},_0x541487[_0x1ab1cb(0xf9)](_0x55c9e8[_0x1ab1cb(0x118)](_0x1ab1cb(0x143),_0x216e50));}}},_0x4fb2ea[_0x3969a2(0x106)]=function(){},_0x4fb2ea[_0x3969a2(0x104)]=function(_0x29f6b9,_0x1be0fc,_0x3643ff){var _0x2efa4f=_0x3969a2;switch(_0x1be0fc){case _0x2efa4f(0x14d):return this[_0x2efa4f(0x14c)](_0x29f6b9,_0x3643ff);case _0x2efa4f(0x136):return this[_0x2efa4f(0x121)](_0x29f6b9,_0x3643ff);case _0x2efa4f(0xfe):return this['_onPlayerActorObserverData'](_0x29f6b9,_0x3643ff);case _0x2efa4f(0x145):return this[_0x2efa4f(0xfd)](_0x29f6b9,_0x3643ff);case _0x2efa4f(0x114):return this['_onBattlerResultObserverData'](_0x29f6b9,_0x3643ff);case _0x2efa4f(0x14a):return this['_onBattleUnitsObserverData'](_0x3643ff);default:_0x1ca5fd['p'](_0x2efa4f(0x127)+_0x1be0fc);}},_0x4fb2ea['_onPlayerCharObserverData']=function(_0x66c447,_0x21b4d3){var _0x1b9fb4=_0x3969a2;if('bLWWd'!==_0x1b9fb4(0x12a)){var _0x59cd3c,_0xe8c00e;try{_0x59cd3c=$gameMap['networkCharacterById'](_0x66c447),_0x59cd3c!=null&&_0x59cd3c[_0x1b9fb4(0x13e)](_0x21b4d3);}catch(_0x571ce2){_0xe8c00e=_0x571ce2,ANET['w'](_0xe8c00e);}}else{function _0x29c051(){var _0x1b2f0a=_0x1b9fb4;if(!_0x40d2a5[_0x1b2f0a(0x129)]())return;_0x47edd8=_0x3ce3cd[_0x1b2f0a(0x134)]['unpackBattlerFromNetwork'](_0x15a376);if(_0xd4e28==null)return;this['_convertActorEquipmens'](_0x1c2424),_0xaac979[_0x1b2f0a(0x13e)](_0x29eeaa);}}},_0x4fb2ea[_0x3969a2(0x121)]=function(_0x2b82c0,_0x285954){var _0x1ed473=_0x3969a2;if('xIpGY'===_0x1ed473(0xfb)){var _0x4b8621,_0x3f6748,_0x3c28c4,_0x246f05;try{({mapId:_0x246f05,eventId:_0x3c28c4}=_0x2b82c0);if($gameMap['mapId']()!==_0x246f05)return;_0x3f6748=$gameMap[_0x1ed473(0x109)](_0x3c28c4),_0x3f6748!=null&&_0x3f6748[_0x1ed473(0x13e)](_0x285954);}catch(_0x1fad6a){_0x4b8621=_0x1fad6a,ANET['w'](_0x4b8621);}}else{function _0x5cd6ee(){_0x375cf1=_0x533313,_0x2d1379['w'](_0x2aeb38);}}},_0x4fb2ea[_0x3969a2(0x149)]=function(_0x52228a,_0x2c78c1){var _0x2ac7fb=_0x3969a2,_0x5c71b0,_0x557e28,_0x101816;try{if('JVebP'===_0x2ac7fb(0x131)){function _0x2810b3(){_0x131edf=_0x4a179f,_0x457f64['w'](_0x4b9ff6);}}else{$gameTemp[_0x2ac7fb(0x14f)]===!![]&&($gameTemp[_0x2ac7fb(0x11a)]=!![]);_0x101816=ANGameManager[_0x2ac7fb(0x142)](_0x52228a),_0x5c71b0=NetPlayerDataWrapper['getActorForPlayer'](_0x101816),$gameTemp['_nNetworkActorPickRequest']=![];if(_0x5c71b0==null)return;this['_convertActorEquipmens'](_0x2c78c1),_0x5c71b0['applyObserverData'](_0x2c78c1);}}catch(_0x120ccd){_0x557e28=_0x120ccd,ANET['w'](_0x557e28);}},_0x4fb2ea[_0x3969a2(0xfd)]=function(_0x2e2c47,_0x157dae){var _0x3aaf88=_0x3969a2,_0x55f64b,_0x39e095;try{if(_0x3aaf88(0x146)===_0x3aaf88(0x132)){function _0x5c8a16(){var _0x565eeb=_0x3aaf88,_0x49dce6;_0x49dce6={'id':_0xecaff,'data':_0xbe1c19},_0x3289da['send'](_0x36a4e[_0x565eeb(0x118)](_0x565eeb(0xff),_0x49dce6));}}else{if(!$gameParty[_0x3aaf88(0x129)]())return;_0x55f64b=ANET[_0x3aaf88(0x134)][_0x3aaf88(0x107)](_0x2e2c47);if(_0x55f64b==null)return;this[_0x3aaf88(0x135)](_0x157dae),_0x55f64b[_0x3aaf88(0x13e)](_0x157dae);}}catch(_0x560725){_0x39e095=_0x560725,ANET['w'](_0x39e095);}},_0x4fb2ea['_convertActorEquipmens']=function(_0x4d81b7){var _0x42b85e=_0x3969a2,_0x512069,_0x44e1cc,_0x48eb30,_0x48ca15;if(_0x4d81b7[_0x42b85e(0x140)]==null)return;for(_0x512069=_0x48eb30=0x0,_0x48ca15=_0x4d81b7[_0x42b85e(0x140)][_0x42b85e(0x13f)];0x0<=_0x48ca15?_0x48eb30<_0x48ca15:_0x48eb30>_0x48ca15;_0x512069=0x0<=_0x48ca15?++_0x48eb30:--_0x48eb30){_0x44e1cc=_0x4d81b7[_0x42b85e(0x140)][_0x512069],_0x4d81b7[_0x42b85e(0x140)][_0x512069]=new Game_Item(),_0x4d81b7['_equips'][_0x512069][_0x42b85e(0x119)]=_0x44e1cc[_0x42b85e(0x119)],_0x4d81b7[_0x42b85e(0x140)][_0x512069]['_itemId']=_0x44e1cc[_0x42b85e(0x10f)];}},_0x4fb2ea[_0x3969a2(0x128)]=function(_0x14e5f7,_0x52858c){var _0x31bebe=_0x3969a2,_0x1a4b5c,_0x4db637,_0x1347ce;try{if(!$gameParty[_0x31bebe(0x129)]()){if(_0x31bebe(0x122)==='zJgYO'){function _0x13b461(){return;}}else return;}_0x1a4b5c=ANET[_0x31bebe(0x134)][_0x31bebe(0x107)](_0x14e5f7);if(_0x1a4b5c==null){if('iKFKd'!=='MoSzJ')return;else{function _0xd13f00(){return;}}}(_0x1347ce=_0x1a4b5c[_0x31bebe(0x13b)]())!=null&&_0x1347ce[_0x31bebe(0x13e)](_0x52858c);}catch(_0x112fd5){_0x4db637=_0x112fd5,ANET['w'](_0x4db637);}},_0x4fb2ea[_0x3969a2(0x144)]=function(_0x2f61fb){var _0x3d1718=_0x3969a2,_0x145f92,_0x59816c,_0x5b23cb,_0xe888a,_0x572b41;try{if(!$gameParty['inBattle']())return;for(_0x5b23cb=0x0,_0xe888a=_0x2f61fb[_0x3d1718(0x13f)];_0x5b23cb<_0xe888a;_0x5b23cb++){if('RWPdJ'!==_0x3d1718(0x102))_0x572b41=_0x2f61fb[_0x5b23cb],_0x145f92=ANET['Utils'][_0x3d1718(0x107)](_0x572b41[0x0]),_0x145f92!=null&&(this['_convertActorEquipmens'](_0x572b41[0x1]),_0x145f92[_0x3d1718(0x13e)](_0x572b41[0x1]));else{function _0x4376bc(){_0x1b2373=_0x344c33,_0x37b863['w'](_0x56ca17);}}}if($gameTemp[_0x3d1718(0x151)]===!![]){if(_0x3d1718(0x10b)===_0x3d1718(0x10b))BattleManager[_0x3d1718(0x11e)](),$gameTemp[_0x3d1718(0x151)]=![];else{function _0x4dd997(){return;}}}}catch(_0x950fc2){_0x59816c=_0x950fc2,ANET['w'](_0x59816c);}},_0x4fb2ea['onVariableValue']=function(_0x1f1fcb,_0x531cee){var _0x2df2d9=_0x3969a2,_0x549bff;try{if(_0x2df2d9(0x133)===_0x2df2d9(0x11b)){function _0x1f6c93(){_0x44d032=_0x564150,_0x4769ba['w'](_0x495ff9);}}else $gameVariables[_0x2df2d9(0x126)](_0x1f1fcb,_0x531cee);}catch(_0x5c1809){_0x549bff=_0x5c1809,ANET['w'](_0x549bff);}},_0x4fb2ea[_0x3969a2(0x13c)]=function(_0x1bc7bf,_0x793a58){var _0x2ef669=_0x3969a2;if(_0x2ef669(0x116)!==_0x2ef669(0x116)){function _0x2a5959(){var _0x2a070f=_0x2ef669,_0x56eec4;try{_0x43f53f[_0x2a070f(0x126)](_0x516ec2,_0x2af805);}catch(_0x4497ce){_0x56eec4=_0x4497ce,_0x21bf37['w'](_0x56eec4);}}}else{var _0x43798b;try{if(_0x2ef669(0x103)===_0x2ef669(0x10c)){function _0x2f8c83(){return;}}else $gameSwitches[_0x2ef669(0x147)](_0x1bc7bf,_0x793a58);}catch(_0x1877dc){_0x43798b=_0x1877dc,ANET['w'](_0x43798b);}}};}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ANBattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onLogWindowMessage, _;
  
  //@[DEFINES]
  _ = ANBattleManager;
  // * В MV нету _currentActor и _inputting
  //$[OVER]
  _.updateInputChange = function() {
    if ($gameParty.isOneBattler()) {
      return;
    }
    if (this._lastBattleManagerInputActor !== BattleManager._actorIndex) {
      this._lastBattleManagerInputActor = BattleManager._actorIndex;
      this.sendInputState();
    } else if (this._lastBattleManagerInputValue !== BattleManager.isInputting()) {
      this._lastBattleManagerInputValue = BattleManager.isInputting();
      this.sendInputState();
    }
  };
  
  //$[OVER]
  // * Отправить изменение состояния ввода
  _.sendInputState = function() {
    var actor, inputActorId, inputState;
    inputState = BattleManager.isInputting();
    actor = BattleManager.actor();
    if (actor != null) {
      inputActorId = actor.actorId();
    } else {
      inputActorId = null;
    }
    ANNetwork.send(NMS.Battle("input", {inputState, inputActorId}));
  };
  //$[OVER]
  // * Пришло изменение состояние ввода
  _.onBattleInputState = function(inputState, inputActorId) {
    var e;
    try {
      if (!$gameParty.inBattle()) {
        return;
      }
      if (inputState === true) {
        BattleManager._phase = 'input';
      } else {
        // * Чтобы скрыть выбор действий
        BattleManager.startTurn();
      }
      if (inputActorId === ANGameManager.myActorId()) {
        BattleManager.nSetCurrentClientInput();
      } else {
        // * Если не мой персонаж, то никакого ввода
        BattleManager.nClearClientInput();
      }
      return $gameTemp._isBattleSceneShouldBeRefreshed = true;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * В MV анимация отдельно реализована
  // * Отправить боевую анимацию (из WindowLog) на сервер
  _.sendWindowLogAnimation = function(targets, animationId, mirror) {
    var converted, data;
    converted = targets.map(function(t) {
      return t.packForNetwork();
    });
    data = {
      animationId: animationId,
      mirror: mirror,
      targets: converted
    };
    // * Используем метод из MZ версии
    this.sendBattleAnimation(data);
  };
  //@[ALIAS]
  ALIAS__onLogWindowMessage = _.onLogWindowMessage;
  _.onLogWindowMessage = function() {
    ALIAS__onLogWindowMessage.call(this, ...arguments);
    $gameTemp.requestBattleRefresh();
  };
  // * С сервера пришла команда проиграть анимацию (замена метода из MZ)
  //$[OVER]
  _.onBattleAnimation = function(data) {
    var e, ref, targets;
    try {
      targets = data.targets.map(function(t) {
        return ANET.Utils.unpackBattlerFromNetwork(t);
      });
      if ((ref = BattleManager._logWindow) != null) {
        ref.showNormalAnimation(targets, data.animationId, data.mirror);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END ANBattleManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ANET Common Utils Methods.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Набор вспомогательных функций для ANET
AA.Utils.ANET = {};

//?shortcut
ANET.Utils = AA.Utils.ANET;

(function() {
  var _;
  //@[DEFINES]
  _ = AA.Utils.ANET;
  // * Проверка, что комментарий является NET командой
  _.isNetCommentCommand = function(commentLine) {
    if (!String.any(commentLine)) {
      return false;
    }
    // * Все команды начинаются с буквы заглавной N, затем пробел и команда
    return /N\s.+/.exec(commentLine);
  };
  _.getNetCommentCommand = function(commentLine) {
    var command;
    if (!this.isNetCommentCommand(commentLine)) {
      return "";
    }
    // * Возвращает первое слово после N
    command = /N\s(!*\w+)/.exec(commentLine)[1];
    if (!String.any(command)) {
      return "";
    }
    return command;
  };
  //TODO: Можно все все данные для сети через метод аналогичный передавать для безопасности
  // * Сохраняет Battler в определённый формат для отправки по сети
  _.packBattlerForNetwork = function(battler) {
    if (battler instanceof Game_Actor) {
      return {
        type: "actor",
        id: battler.actorId()
      };
    } else {
      return {
        type: "enemy",
        id: battler.index()
      };
    }
  };
  // * Возвращяет конкретный Battler из данных сети
  _.unpackBattlerFromNetwork = function(data) {
    if (data.type === "actor") {
      return $gameActors.actor(data.id);
    } else {
      return $gameTroop.members()[data.id];
    }
  };
  _.isMyActorInValidListToStart = function(list, isInclude) {
    var e;
    try {
      list = JsonEx.parse(list).map(function(i) {
        return parseInt(i);
      });
      return list.contains(ANGameManager.myActorId()) === isInclude;
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  };
  _.isPassEventFilterOptions = function(options) {
    var e;
    try {
      switch (options.whoSelector) {
        case "All":
          return true;
        case "Master":
          return ANNetwork.isMasterClient();
        case "Master Except":
          return !ANNetwork.isMasterClient();
        case "Actor List":
          return ANET.Utils.isMyActorInValidListToStart(options.actorList, true);
        case "Actor List Except":
          return ANET.Utils.isMyActorInValidListToStart(options.actorList, false);
        case "Me Except":
          // * Если команда пришла с сервера, то явно эта проверка не касается этого клиента
          // * В опциях запуска события - не используется
          return true;
        default:
          return false;
      }
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  };
  // * Событие запущенно каким-либо игроком?
  _.isEventStartedByAny = function(eventId) {
    var e;
    try {
      return ANGameManager.anotherPlayersOnMap().some(function(p) {
        return NetPlayerDataWrapper.isOnEvent(p, eventId);
      });
    } catch (error) {
      e = error;
      ANET.w(e);
      // * В случае ошибки безопаснее вернуть true
      return true;
    }
  };
  // * Собрать опции для команды события по параметрам из комменатрия (аналог опций из команды плагина)
  // * Список должен быть строкой! [1, 2, 3]
  _.buildEventCommandOptions = function(selector, list, scope, mode) {
    return {
      "actorList": list,
      "executeMode": mode,
      "scope": scope,
      "whoSelector": selector
    };
  };
  // * Конвертировать из команды комменатрия в параметр команды плагина
  _.convertEventCommandScopeAndMode = function(commentLine) {
    var mode, scope;
    // * SCOPE
    if (commentLine.contains("world")) {
      scope = "All world";
    } else {
      scope = "Same map";
    }
    // * MODE
    if (commentLine.contains("virtual")) {
      mode = "Virtual";
    } else if (commentLine.contains("common")) {
      mode = "Common Event";
    } else {
      mode = "Auto";
    }
    return {scope, mode};
  };
  // * Изъять список персонажей из комментария
  // * Формат выходной [1, 2, 3....]
  _.extractActorsListFromComment = function(commentLine) {
    var list, regex, resultList;
    regex = /forActors\s+([\d,\s*]*)/gm;
    resultList = regex.exec(commentLine);
    if (resultList == null) {
      return "[]";
    }
    if (resultList[1] == null) {
      return "[]";
    }
    list = "[" + resultList[1] + "]";
    return list;
  };
  _.parseEventStartOptionsFromCommentLine = function(commentLine) {
    var e, nStartOptions;
    try {
      // * Стандартный набор
      nStartOptions = {
        lockMode: "false",
        sharedMode: "No",
        whoSelector: "All",
        actorList: "[]"
      };
      if (commentLine.contains("lock")) {
        nStartOptions.lockMode = "true";
      }
      if (commentLine.contains("shared")) {
        nStartOptions.sharedMode = "Strict";
        // * Только если есть флаг sharedMode
        if (commentLine.contains("optional")) {
          nStartOptions.sharedMode = "Optional";
        }
      }
      if (commentLine.contains("master")) {
        if (commentLine.contains("!")) {
          nStartOptions.whoSelector = "Master Except";
        } else {
          nStartOptions.whoSelector = "Master";
        }
      } else if (commentLine.contains("forActors")) {
        if (commentLine.contains("!")) {
          nStartOptions.whoSelector = "Actor List Except";
        } else {
          nStartOptions.whoSelector = "Actor List";
        }
        nStartOptions.actorList = ANET.Utils.extractActorsListFromComment(commentLine);
      }
      return nStartOptions;
    } catch (error) {
      e = error;
      ANET.w(e);
      return null;
    }
  };
  _.generateSaveUniqueId = function() {
    var savefileId, versionId;
    versionId = ANET.VD.getGameVersion();
    savefileId = versionId + "" + Math.randomInt(versionId);
    // * Вероятность крайне крайне мала, но нельзя чтобы были повторы
    if (DataManager.nIsHaveNetworkSaveWithId(savefileId)) {
      return this.generateSaveUniqueId();
    } else {
      return savefileId;
    }
  };
  // * Текущая комната - загрузка сохранённой игры?
  _.isLoadGameRoom = function() {
    if (!ANNetwork.isConnected()) {
      return false;
    }
    if (ANNetwork.room == null) {
      return false;
    }
    return NetRoomDataWrapper.isLoadGameRoom(ANNetwork.room);
  };
  // * Построить Chat Message
  _.buildChatMessage = function(channelId, actorId, message) {
    return {
      channelId: channelId,
      actorId: actorId,
      text: message,
      mapId: $gameMap.mapId()
    };
  };
})();

// ■ END ANET Common Utils Methods.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__displayStartMessages, ALIAS__endBattle, ALIAS__processEscape, ALIAS__selectNextActor, ALIAS__selectPreviousActor, ALIAS__setup, ALIAS__update, _;
  //@[DEFINES]
  _ = BattleManager;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function() {
    ALIAS__setup.call(this, ...arguments);
    if (ANNetwork.isConnected()) {
      if (!ANBattleManager.isBattleRegistred()) {
        // * Только если данные боя не установлены, но проверка сетевой битвы
        this.nSetupNetworkBattle();
      }
    }
  };
  //@[ALIAS]
  ALIAS__endBattle = _.endBattle;
  _.endBattle = function(result) {
    ALIAS__endBattle.call(this, result);
    if (ANNetwork.isConnected()) {
      // * Убрать флаг сетевой битвы
      this.nSetNetworkBattle(null);
    }
  };
  //@[ALIAS]
  ALIAS__selectNextActor = _.selectNextActor;
  _.selectNextActor = function() {
    if (ANNetwork.isConnected() && !ANGameManager.isBattleMaster()) {
      this.nSelectNextActorOnClient();
    } else {
      ALIAS__selectNextActor.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__selectPreviousActor = _.selectPreviousActor;
  _.selectPreviousActor = function() {
    if (ANNetwork.isConnected() && !ANGameManager.isBattleMaster()) {
      this.nSelectPreviousActorOnClient();
    } else {
      ALIAS__selectPreviousActor.call(this);
    }
  };
  //@[ALIAS]
  // * В сетевом режиме Update вызывается только на мастере боя!
  ALIAS__update = _.update;
  _.update = function(activeTime) {
    ALIAS__update.call(this, activeTime);
    if (!ANNetwork.isConnected()) {
      return;
    }
    this.nUpdateNetwork();
  };
  //TEMP
  //TODO: Временно отключено начальное сообщение в бою
  //@[ALIAS]
  ALIAS__displayStartMessages = _.displayStartMessages;
  _.displayStartMessages = function() {
    if (ANNetwork.isConnected()) {

    } else {
      // * EMPTY
      return ALIAS__displayStartMessages.call(this);
    }
  };
  
  //TEMP
  //TODO: Если шанс побега не сработал, будет баг
  // * Временно шанс побега 100%
  //@[ALIAS]
  ALIAS__processEscape = _.processEscape;
  _.processEscape = function() {
    if (ANNetwork.isConnected()) {
      this._escapeRatio = 101;
    }
    return ALIAS__processEscape.call(this);
  };
})();

// ■ END BattleManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__changeActor, ALIAS__update, _;
  //@[DEFINES]
  _ = BattleManager;
  // * Заместо selectNextActor (нету в MV такой команды)
  //@[ALIAS]
  ALIAS__changeActor = _.changeActor;
  _.changeActor = function() {
    if (ANNetwork.isConnected() && !ANGameManager.isBattleMaster()) {
      this.nSelectNextActorOnClient();
      $gameTemp._isBattleSceneShouldBeRefreshed = true;
    } else {
      ALIAS__changeActor.call(this, ...arguments);
    }
  };
  _.myNetworkActorIndex = function() {
    return $gameParty.members().indexOf($gameParty.leader());
  };
  
  // * В MV логика боя отличается от MZ, не происходит многих автоматических обновлений
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    if (this.__oldPhase !== this._phase) {
      this.__oldPhase = this._phase;
      $gameTemp._isBattleSceneShouldBeRefreshed = true;
      $gameTemp.requestBattleRefresh();
    }
    ALIAS__update.call(this);
  };
})();

// ■ END BattleManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = BattleManager;
  _.nSetNetworkBattle = function(netBattleId) {
    this.netBattleId = netBattleId;
  };
  _.nIsNetworkBattle = function() {
    return this.netBattleId != null;
  };
  _.nSetupNetworkBattle = function() {
    var battleData;
    if (this.nIsNetworkBattle()) {
      battleData = {
        battleId: this.netBattleId,
        options: [$gameTroop._troopId, this._canEscape, this._canLose]
      };
      ANBattleManager.registerOnBattle(battleData);
    } else {
      ANBattleManager.registerOnLocalBattle();
    }
  };
  _.nSelectNextActorOnClient = function() {
    // * Если данный флаг == true, то игрок переключает меню ввод с группы на персонажа своего
    // * (Это если нажать Escape и появилось Party Commands, а затем снова на Fight)
    if (this._isShouldWaitMyNetworkAction === true) {
      // * Выбираем только своего персонажа снова (а не первого)
      this._currentActor = $gameParty.leader();
      if (KDCore.isMV()) {
        this._actorIndex = this.myNetworkActorIndex();
        $gameTemp._isBattleSceneShouldBeRefreshed = true;
      }
      return this._isShouldWaitMyNetworkAction = false;
    } else {
      ANBattleManager.battleInputActionDone();
      return this._inputting = false;
    }
  };
  
  // * В стандартном тактическом режиме боя если нажать "отмена" (назад)
  // * То мы можем поменять выбор предыдущего персонажа, но в сети,
  // * мы не можем это сделать, поэтому просто "выходим" на меню группы
  _.nSelectPreviousActorOnClient = function() {
    return this._currentActor = null;
  };
  _.nUpdateNetwork = function() {
    ANBattleManager.updateInputChange();
    $gameTroop.nUpdateBattleDataSync();
    $gameParty.nUpdateBattleDataSync();
  };
  _.nClearClientInput = function() {
    this._inputting = false;
    this._currentActor = null;
    this._isShouldWaitMyNetworkAction = true;
    if (KDCore.isMV()) {
      this.startTurn();
    }
  };
  _.nSetCurrentClientInput = function() {
    $gameParty.makeActions(); // * Чтобы был inputting action
    this._currentActor = $gameParty.leader();
    if (KDCore.isMV()) {
      this._actorIndex = this.myNetworkActorIndex();
    }
    // * Готов к отправке действия сразу (по умолчанию)
    // * Команда 'Fight' делает false (см nSelectNextActorOnClient)
    return this._isShouldWaitMyNetworkAction = false;
  };
  _.nRefreshSharedBattleState = function() {
    var e;
    try {
      if (SceneManager._scene.nRefreshSharedBattle != null) {
        SceneManager._scene.nRefreshSharedBattle();
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Если во время боя был удалён (вышел) сетевой игрок
  // * Без этого метода, игра переключает (или зависат) ввод другого игрока (который вышел)
  _.nSafeRemoveActor = function() {
    var e;
    if (this._phase !== "input") {
      return;
    }
    try {
      if (this._currentActor !== $gameParty.leader()) {
        return this.selectNextActor();
      }
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
  // * Можно ли клиенту (не BattleMaster) самостоятельно обновлять BattleManager
  _.nIsLocalForceUpdatePhase = function() {
    return this.isAborting() || this.isBattleEnd();
  };
})();

// ■ END BattleManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ConfigManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__applyData, ALIAS__makeData, _;
  //@[DEFINES]
  _ = ConfigManager;
  // * Сохранение и загрузка сетевого имени игрока

  //@[ALIAS]
  ALIAS__makeData = _.makeData;
  _.makeData = function() {
    var config;
    config = ALIAS__makeData.call(this);
    config.netPlayerName = this.netPlayerName;
    return config;
  };
  
  //@[ALIAS]
  ALIAS__applyData = _.applyData;
  _.applyData = function(config) {
    ALIAS__applyData.call(this, config);
    this.netPlayerName = config.netPlayerName;
  };
})();

// ■ END ConfigManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__makeSavefileInfo, _;
  //@[DEFINES]
  _ = DataManager;
  //@[ALIAS]
  ALIAS__makeSavefileInfo = _.makeSavefileInfo;
  _.makeSavefileInfo = function() {
    var info;
    info = ALIAS__makeSavefileInfo.call(this);
    if (ANNetwork.isConnected() && ($gameTemp.nUniqueSaveID != null)) {
      this.nWriteNetworkSaveFileInfo(info);
      // * Сбросим флаг
      $gameTemp.nUniqueSaveID = null;
    }
    return info;
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = DataManager;
  // * Записать информацию о сетевом сохранении (что в этом файле сетевое сохранение)
  _.nWriteNetworkSaveFileInfo = function(info) {
    // * Для определения подходящих файлов у других клиентов
    info.nUniqueSaveID = $gameTemp.nUniqueSaveID;
    // * Для определения своего персонажа
    info.nMyActorId = ANGameManager.myActorId();
  };
  
  // * Является ли файл сохранения сетевым (созданным по сети)
  _.nIsNetworkSaveFile = function(savefileId) {
    var info;
    info = this.nGetInfoForSavefileId(savefileId);
    if ((info != null) && (info.nUniqueSaveID != null) && (info.nMyActorId != null)) {
      return true;
    }
    return false;
  };
  // * Есть ли файл сетевого сохранения с уникальным ID
  _.nIsHaveNetworkSaveWithId = function(uniqueSaveID) {
    return this.nGetNetworkSaveInfoWithId(uniqueSaveID) != null;
  };
  // * Получить данные сетвого сохранения по уникальному ID
  _.nGetNetworkSaveInfoWithId = function(uniqueSaveID) {
    var file, i, index, len, ref;
    ref = this.nGetGlobalInfo();
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      file = ref[index];
      if (file == null) {
        continue;
      }
      if (this.nIsNetworkSaveFile(index)) {
        if (file.nUniqueSaveID === uniqueSaveID) {
          return file;
        }
      }
    }
    return null;
  };
  // * Получить индекс файла сохранения по уникальнмоу ID
  // * Это нужно для загрузки правильного файла
  _.nGetNetworkSaveFileIdByUniqueId = function(uniqueSaveID) {
    var file, i, index, len, ref;
    ref = this.nGetGlobalInfo();
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      file = ref[index];
      if (file == null) {
        continue;
      }
      if (this.nIsNetworkSaveFile(index) && file.nUniqueSaveID === uniqueSaveID) {
        return index;
      }
    }
    return -1;
  };
  // * Методы различаются в MV и MZ
  _.nGetGlobalInfo = function() {
    if (KDCore.isMZ()) {
      return this._globalInfo;
    } else {
      return this.loadGlobalInfo();
    }
  };
  // * Методы различаются в MV и MZ
  _.nGetInfoForSavefileId = function(savefileId) {
    var info;
    if (KDCore.isMZ()) {
      info = DataManager.savefileInfo(savefileId);
    } else {
      info = DataManager.loadSavefileInfo(savefileId);
    }
    return info;
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Action.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Action.prototype;
  // * Задать действие из сети (т.е. из действия другого игрока)
  _.setFromNetwork = function(action) {
    var f;
    this.clear();
    this._nParseActionItem(action._item);
    for (f in action) {
      if (f === "_item") {
        // * пропускаем Game_Item, он уже сконвертирован
        continue;
      }
      this[f] = action[f];
    }
  };
  // * Класс Game_Item отдельно
  _._nParseActionItem = function(item) {
    var f;
    if (item == null) {
      return;
    }
    for (f in item) {
      this._item[f] = item[f];
    }
  };
})();

// ■ END Game_Action.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Game_ActionResult.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected()) {
      return this.nCreateObserver();
    }
  };
})();

// ■ END Game_ActionResult.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_ActionResult.prototype;
  _.nCreateObserver = function() {
    this.netDataObserver = new DataObserver();
    this.nFillObserver();
    // * Создаём после nFillObserver, чтобы не было в списке полей Observer
    this.isDataObserverHaveChanges = false;
    this.netDataObserver.refreshAll(this);
  };
  // * Тут применён автоматический сбор всех полей
  _.nFillObserver = function() {
    var entries, fields, i, len, value;
    fields = [];
    entries = Object.entries(this);
    for (i = 0, len = entries.length; i < len; i++) {
      value = entries[i];
      if (value[0] === 'netDataObserver') {
        // * Так как сбор полей идёт после создания netDataObserver, то его надо исключить
        continue;
      }
      fields.push(value[0]);
    }
    this.netDataObserver.addFields(this, fields);
  };
  _.nUpdateObserver = function() {
    if (this.netDataObserver == null) {
      return;
    }
    this.netDataObserver.check(this);
    if (this.netDataObserver.isDataChanged()) {
      this.nDataObserverHaveChanges();
      this.netDataObserver.refreshAll(this);
    }
  };
  // * Тут мы напрямую не отправляем данные, так как мы не знаем кому (Battler) мы принадлежим
  // * Ставится флаг в TRUE, и Battler сам отправить данные
  _.nDataObserverHaveChanges = function() {
    return this.isDataObserverHaveChanges = true;
  };
  _.getObserverDataForNetwork = function() {
    this.isDataObserverHaveChanges = false;
    return this.netDataObserver.getDataForNetwork(this);
  };
  _.applyObserverData = function(data) {
    if (this.netDataObserver == null) {
      return;
    }
    this.netDataObserver.setDataFromNetwork(this, data);
  };
})();

// ■ END Game_ActionResult.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__refresh, ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(actorId) {
    ALIAS__setup.call(this, actorId);
    // * Чтобы refreshNetwork не вызывался когда ещё Actor не создан
    if (ANNetwork.isConnected()) {
      this.refreshNetworkDummy = this.refreshNetwork;
      if (ANET.PP.playerActorNameType() > 0) {
        this.nSetupPlayerActorName();
      }
    }
  };
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshNetworkDummy();
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  // * Данный персонаж - мой сетевой персонаж (текущего игрока)
  _.isMyNetworkActor = function() {
    if ($gameTemp._nLocalActorMode === true) {
      // * Тут сделано разделение специально, чтобы уменьшить проблемы с LocalActor
      // * Суть в том, что при LocalActor могут отправляться данные всех персонажей,
      // * так как проверка через leader() обращается в Game_Actors, а ID всегда на
      // * своего персонажа (стоит Instance Mode, в этом ещё дело)
      // * Пока отключил передачу СВОИХ данных в режиме Local
      return false;
    }
    if ($gameParty.inBattle()) {
      return this.isMyNetworkBattler();
    } else {
      return this.actorId() === ANGameManager.myActorId();
    }
  };
  _.updateDataObserver = function() {
    // * Если в бою, то вся синхронизация идёт от мастера битвы
    if ($gameParty.inBattle()) {
      if (ANGameManager.isBattleMaster()) {
        this._updateDataObserver();
      } else {

      }
    } else {
      if (this.isMyNetworkActor()) {
        // * Если НЕ в бою, то проверка observer только свого персонажа
        // * Только приём данных
        this._updateDataObserver();
      }
    }
  };
  // * Отправка Observer только своего персонажа
  _.dataObserverHaveChanges = function() {
    // * Если в бою, то вся синхронизация идёт от мастера битвы
    if ($gameParty.inBattle()) {
      if (ANGameManager.isBattleMaster()) {
        this.requestNetBattleDataPush();
        // * Если только я в бою, то отправляю обычные данные
        // * Чтобы другие игроки видели HP и MP
        // TODO: Опция?
        if ($gameParty.isOneBattler()) {
          ANSyncDataManager.sendActorObserver();
        }
      }
    } else {
      // * Если не в бою, то только свои данные
      if (this.isMyNetworkActor()) {
        ANSyncDataManager.sendActorObserver();
      }
    }
  };
  
  //TODO: Может просто все все свойства передавать?
  // собрать их автоматически
  _._fillNetworkObserver = function() {
    Game_Battler.prototype._fillNetworkObserver.call(this);
    this.netDataObserver.addFields(this, ANET.System.ActorObserverFields);
  };
  //?{DYNAMIC}
  _.refreshNetworkDummy = function() {}; // * EMPTY
  _.refreshNetwork = function() {
    // * Тут нельзя делать проверку на текущих Actor или нет, так как вызывает Stack Overflow
    // * Метод refresh вызывается ещё до того как Actor создан (класс)
    // * Принудительная отправка
    if (!$gameParty.inBattle()) {
      this.dataObserverHaveChanges();
    }
  };
  // * Установить заместо имени (никнейма) персонажа имя сетевого игрока
  _.nSetupPlayerActorName = function() {
    var playerData;
    // * Устанавливаем только своему персонажу, так как myPlayerData есть в начале игры
    // * Данные других персонажей прийдут сами с Observer сразу
    if (this.actorId() !== ANGameManager.myActorId()) {
      return;
    }
    playerData = ANGameManager.myPlayerData();
    if (playerData == null) {
      return;
    }
    if (ANET.PP.playerActorNameType() === 1) {
      this._name = playerData.name;
    } else if (ANET.PP.playerActorNameType() === 2) {
      this._nickname = playerData.name;
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actors.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__actor, _;
  //@[DEFINES]
  _ = Game_Actors.prototype;
  //TODO: Есть проблемы у этого способа! Надо больше тестов
  //TODO: Добавить дополнительные проверки, так как слишком опасно
  //@[ALIAS]
  ALIAS__actor = _.actor;
  _.actor = function(actorId) {
    // * Возвращять текущего персонажа для выборки в событии
    // * Выборка LOCAL ACTOR работает только если указан Actor с ID = 1 (ОТМЕНА!)
    //TODO: Может это и не надо, но сделал для меньших проблем, так как метод опасно переопределять
    //TODO: Временно убрал выборку только 1 актора
    if (ANNetwork.isConnected() && $gameTemp._nLocalActorMode === true) { //&& actorId == 1
      if ($gameTemp._nNetworkActorPickRequest === true) {
        $gameTemp._nNetworkActorPickRequest = false;
        return ALIAS__actor.call(this, actorId);
      } else {
        return this._data[ANGameManager.myActorId()];
      }
    } else {
      return ALIAS__actor.call(this, actorId);
    }
  };
})();

// ■ END Game_Actors.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__onBattleEnd, ALIAS__onBattleStart, ALIAS__startDamagePopup, _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected()) {
      return this.nInitializeNetwork();
    }
  };
  //@[ALIAS]
  ALIAS__onBattleStart = _.onBattleStart;
  _.onBattleStart = function() {
    if (ANNetwork.isConnected()) {
      this._nStartBattleObserver();
    }
    return ALIAS__onBattleStart.call(this, ...arguments);
  };
  
  //@[ALIAS]
  ALIAS__onBattleEnd = _.onBattleEnd;
  _.onBattleEnd = function() {
    ALIAS__onBattleEnd.call(this);
    if (ANNetwork.isConnected()) {
      this._nEndBattleObserver();
    }
  };
  // * Отдельная реализация, чтобы передавать battleResult
  //@[ALIAS]
  ALIAS__startDamagePopup = _.startDamagePopup;
  _.startDamagePopup = function() {
    if (ANNetwork.isConnected() && ANGameManager.isBattleMaster() && !$gameParty.isOneBattler()) {
      ANSyncDataManager.sendBattlerResultObserver(this);
      ANBattleManager.callBattleMethod(this, "startDamagePopup", null);
    }
    return ALIAS__startDamagePopup.call(this);
  };
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  _.nInitializeNetwork = function() {
    this._nRegisterSyncBattleMethod("requestEffect");
    this._nRegisterSyncBattleMethod("requestMotion");
    this._nRegisterSyncBattleMethod("startWeaponAnimation");
    this._nRegisterSyncBattleMethod("setActionState");
    // * Sound effects
    this._nRegisterSyncBattleMethod("performDamage");
    this._nRegisterSyncBattleMethod("performCollapse");
    this._nRegisterSyncBattleMethod("performMiss");
    this._nRegisterSyncBattleMethod("performRecovery");
    this._nRegisterSyncBattleMethod("performEvasion");
    this._nRegisterSyncBattleMethod("performMagicEvasion");
    this._nRegisterSyncBattleMethod("performCounter");
    this._nRegisterSyncBattleMethod("performReflection");
  };
  // * Данный баттлер является моим (этого сетевого игрока)
  _.isMyNetworkBattler = function() {
    if (ANNetwork.isConnected()) {
      return this === $gameParty.leader();
    } else {
      return true;
    }
  };
  // * Подписать метод на синхронизацию через сервер
  _._nRegisterSyncBattleMethod = function(methodName) {
    var alias;
    alias = this[methodName];
    this[methodName] = function() {
      if (ANNetwork.isConnected() && ANGameManager.isBattleMaster()) {
        // * В данной реализации передаётся только один аргумент, так как ... перед arguments
        ANBattleManager.callBattleMethod(this, methodName, ...arguments);
      }
      return alias.call(this, ...arguments);
    };
  };
  _.isNeedNetPushBattleData = function() {
    return this._netBattleObserverNeedToPush === true;
  };
  _.onNetBattleDataPushed = function() {
    return this._netBattleObserverNeedToPush = null;
  };
  _.requestNetBattleDataPush = function() {
    return this._netBattleObserverNeedToPush = true;
  };
  (function() {    // * Специальный Data Observer для боя
    // -----------------------------------------------------------------------
    // * Данные только для боя (эти данные передаёт только Battle Master)
    _._nStartBattleObserver = function() {
      // * Включаем Instance режим
      //@netDataObserver.setInstanteMode()
      this.netDataObserver.setCheckInterval(ANET.PP.battleDataRefreshRate());
      this._addBattleFieldsToNetowrkDataObserver();
    };
    // * Добавляем дополнительные поля в Observer
    _._addBattleFieldsToNetowrkDataObserver = function() {
      this.netDataObserver.addFields(this, ANET.System.BattlerObserverFields);
    };
    // * После битвы нет необходимости хранить observer
    return _._nEndBattleObserver = function() {
      // * Возвращаем режим проверки
      this._applyDataObserverInitialParameters();
      // * Убираем добавленные для боя поля
      this.netDataObserver.removeFields(this, ANET.System.BattlerObserverFields);
    };
  })();
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__meetsItemConditions, ALIAS__onBattleEnd, ALIAS__onBattleStart, _;
  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    return this._createNetworkObserver();
  };
  
  //@[ALIAS]
  ALIAS__onBattleStart = _.onBattleStart;
  _.onBattleStart = function() {
    ALIAS__onBattleStart.call(this);
    if (ANNetwork.isConnected()) {
      this.netDataObserver.setCheckMode();
    }
  };
  //@[ALIAS]
  ALIAS__onBattleEnd = _.onBattleEnd;
  _.onBattleEnd = function() {
    ALIAS__onBattleEnd.call(this);
    if (ANNetwork.isConnected()) {
      this.netDataObserver.setInstanteMode();
    }
  };
  //TEMP
  //TODO: Временное решение, так как нет проверки кто именно
  // * Так как вещи другого игрока нет в инвентаре мастера боя, то
  // * мы пропускаем проверку на наличие вещи в инвентаре $gameParty.hasItem(item)
  //@[ALIAS]
  ALIAS__meetsItemConditions = _.meetsItemConditions;
  _.meetsItemConditions = function(item) {
    if (ANNetwork.isConnected()) {
      return this.meetsUsableItemConditions(item);
    } else {
      return ALIAS__meetsItemConditions.call(this, item);
    }
  };
})();

// ■ END Game_BattlerBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  // * Специальное представление данных для сети
  _.packForNetwork = function() {
    return ANET.Utils.packBattlerForNetwork(this);
  };
  (function() {    // * OBSERVER
    _._createNetworkObserver = function() {
      this.netDataObserver = new DataObserver();
      this._applyDataObserverInitialParameters();
      this._fillNetworkObserver();
      return this.netDataObserver.refreshAll(this);
    };
    _._applyDataObserverInitialParameters = function() {
      // * Тут нужен Instante, чтобы данные на карте всегда были актуальны
      // * Если CheckMode, то при помощи событий можно менять параметры ХП
      // * всей группы и ХП других игроков будут отображаться не правильно
      this.netDataObserver.setInstanteMode();
      this.netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate());
    };
    //TODO: Можно автоматически и удалять лишнее (см. Game_ActionResult)
    _._fillNetworkObserver = function() {
      this.netDataObserver.addFields(this, ["_hp", "_mp", "_tp", "_paramPlus", "_states", "_stateTurns", "_buffs", "_buffTurns"]);
    };
    //TODO: updateStateTurns и баффы не должны выполняться на фантоме (???)

    // * Этот метод должны вызывать потомки верхнего уровня, так как нету Update в этом классе
    _._updateDataObserver = function() {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.check(this);
      if (this.netDataObserver.isDataChanged()) {
        this.dataObserverHaveChanges();
        this.netDataObserver.refreshAll(this);
      }
    };
    // * Этот метод вызывается, когда изменились сихнронизируеммые данные
    _.dataObserverHaveChanges = function() {}; // * EMPTY (for childrens)
    _.getObserverDataForNetwork = function() {
      return this.netDataObserver.getDataForNetwork(this);
    };
    _.applyObserverData = function(data) {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.setDataFromNetwork(this, data);
    };
  })();
})();

// ■ END Game_BattlerBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    return this._createNetworkObserver();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (ANNetwork.isConnected()) {
      return this._updateDataObserver();
    }
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  (function() {    // * OBSERVER
    _._createNetworkObserver = function() {
      this.netDataObserver = new DataObserver();
      this.netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate());
      this._fillNetworkObserver();
      return this.netDataObserver.refreshAll(this);
    };
    //TODO: Добавить API для разработчиков плагинов вносить свои поля (и так со всем Observers)
    // * Движение передаётся отдельным методом для достижения плавности
    _._fillNetworkObserver = function() {
      return this.netDataObserver.addFields(this, ["_opacity", "_blendMode", "_walkAnime", "_stepAnime", "_directionFix", "_transparent", "_direction"]);
    };
    _._updateDataObserver = function() {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.check(this);
      if (this.netDataObserver.isDataChanged()) {
        this.dataObserverHaveChanges();
        this.netDataObserver.refreshAll(this);
      }
    };
    // * Этот метод вызывается, когда изменились сихнронизируеммые данные
    _.dataObserverHaveChanges = function() {}; // * EMPTY (for childrens)
    _.getObserverDataForNetwork = function() {
      return this.netDataObserver.getDataForNetwork(this);
    };
    _.applyObserverData = function(data) {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.setDataFromNetwork(this, data);
    };
  })();
  _.moveStraightFromServer = function(moveData) {
    // * Всегда успех, так как если нет, то данные и не прийдут от другого игрока
    this.setMovementSuccess(true);
    this.setDirection(moveData.direction);
    this._x = moveData.x;
    this._y = moveData.y;
    this._realX = moveData.realX;
    this._realY = moveData.realY;
    // * Чтобы синхронизировать правильно бег
    this._moveSpeed = moveData.moveSpeed;
    this.increaseSteps();
  };
  _.getMoveDataForNetwork = function() {
    return {
      direction: this._direction,
      moveSpeed: this.realMoveSpeed(),
      x: this.x,
      y: this.y,
      realX: this._realX,
      realY: this._realY
    };
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Enemy.prototype;
})();

// ■ END Game_Enemy.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Enemy.prototype;
  //TODO: Есть проблема, dead enemies не исчезают у второго игрока

  // * Дополнительные найстройки Observer для врагов
  _._addBattleFieldsToNetowrkDataObserver = function() {
    Game_Battler.prototype._addBattleFieldsToNetowrkDataObserver.call(this);
    // * Данные поля не нужны (наверное) врагам, так как не видно их полосу
    this.netDataObserver.removeFields(this, ["_tpbChargeTime"]);
  };
  // * Только мастер битвы может отправлять данные (вызывается из Scene_Battle)
  _.updateDataObserver = function() {
    if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
      this._updateDataObserver();
    }
  };
  _.dataObserverHaveChanges = function() {
    if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
      this.requestNetBattleDataPush();
    }
  };
  // * Добавляем свои поля
  _._fillNetworkObserver = function() {
    Game_Battler.prototype._fillNetworkObserver.call(this);
    this.netDataObserver.addFields(this, ANET.System.EnemyObserverFields);
  };
})();

// ■ END Game_Enemy.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  (function() {    // * Синхронизация движения
    // -----------------------------------------------------------------------
    var ALIAS__moveStraight, ALIAS__updateSelfMovement;
    //@[ALIAS]
    ALIAS__moveStraight = _.moveStraight;
    _.moveStraight = function(d) {
      if (ANNetwork.isConnected()) {
        if (ANGameManager.isMapMaster()) {
          // * Запоминаем предыдующие координаты (перед движением)
          this.___x = this.x;
          this.___y = this.y;
          // * Движение
          ALIAS__moveStraight.call(this, d);
          // * Если координаты сменились, значит персонаж
          // совершил движение, можно отправить на сервер
          if (this.___x !== this.x || this.___y !== this.y) {
            return ANMapManager.sendEventMove(this.eventId());
          }
        } else {

        }
      } else {
        // * SKIP MOVEMENT
        // * Движение событий выполняется только на мастере карты
        return ALIAS__moveStraight.call(this, d);
      }
    };
    
    //@[ALIAS]
    ALIAS__updateSelfMovement = _.updateSelfMovement;
    return _.updateSelfMovement = function() {
      if (ANNetwork.isConnected()) {
        if (ANGameManager.isMapMaster()) {
          return ALIAS__updateSelfMovement.call(this);
        } else {

        }
      } else {
        // * NOTHING
        // * Обновление движения события только на мастере карты
        return ALIAS__updateSelfMovement.call(this);
      }
    };
  })();
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  _.dataObserverHaveChanges = function() {
    if (ANGameManager.isMapMaster()) {
      ANSyncDataManager.sendEventObserver(this.eventId());
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------
// * Если мы не отправляем данные Observer,
// * то check не будет работать, пока не сбросить флаг

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Followers.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isSomeoneCollided, ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Followers.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function() {
    if (ANNetwork.isConnected()) {
      return this._data = [];
    } else {
      // * Нет последователей! Используется другой класс
      return ALIAS__setup.call(this);
    }
  };
  
  // * Учёт коллизий с сетевыми игроками при движении событий
  // * В этом методе, а не в NETCharactersGroup, чтобы было больше совместимости
  //@[ALIAS]
  ALIAS__isSomeoneCollided = _.isSomeoneCollided;
  _.isSomeoneCollided = function(x, y) {
    if (ANNetwork.isConnected()) {
      return $gameMap.netCharsIsSomeoneCollided(x, y);
    } else {
      return ALIAS__isSomeoneCollided.call(this, x, y);
    }
  };
})();

// ■ END Game_Followers.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  (function() {    // * Статус запуска события
    // -----------------------------------------------------------------------
    var ALIAS__clear, ALIAS__initialize, ALIAS__setup, ALIAS__update, ALIAS__updateWaitMode;
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(depth) {
      ALIAS__initialize.call(this, depth);
      this._nRunningCheckTimer = 0;
      // * Отключаем некоторые команды
      if (ANNetwork.isConnected()) {
        this.nDisableNotNetCommands();
      }
    };
    //@[ALIAS]
    ALIAS__setup = _.setup;
    _.setup = function(list, eventId) {
      ALIAS__setup.call(this, list, eventId);
      if (ANNetwork.isConnected()) {
        // * Сброс сетевой битвы, если началось другое событие
        BattleManager.nSetNetworkBattle(null);
        this.nCheckEventStartOptions();
        if (!this.isPassStartOptions()) { // * Проверка опций запуска события
          this._list = []; // * Не будет выполняться
        } else {
          ANInterpreterManager.sendEventStarted(eventId);
          if (this.nIsEventIsShared()) {
            this.nPrepareSharedEvent();
          }
          this.nClearFlags();
        }
      }
    };
    
    //@[ALIAS]
    ALIAS__clear = _.clear;
    _.clear = function() {
      ALIAS__clear.call(this);
      if (ANNetwork.isConnected()) {
        ANInterpreterManager.eventProcessExit();
        this.nClearFlags();
      }
    };
    //@[ALIAS]
    ALIAS__update = _.update;
    _.update = function() {
      ALIAS__update.call(this);
      if (ANNetwork.isConnected()) {
        this._nRunningCheckTimer++;
        if (this._nRunningCheckTimer >= 60) {
          ANInterpreterManager.checkEventRunning();
          this._nRunningCheckTimer = 0;
        }
      }
    };
    //@[ALIAS]
    ALIAS__updateWaitMode = _.updateWaitMode;
    return _.updateWaitMode = function() {
      if (this._waitMode === 'netPlayersPool') {
        return this.nUpdateWaitPlayersPool();
      } else if (this._waitMode === 'netNextCommand') {
        return this.nUpdateWaitServerNextCommandPermission();
      } else {
        return ALIAS__updateWaitMode.call(this);
      }
    };
  })();
  (function() {    // * Выполнение команд в сети
    // -----------------------------------------------------------------------
    var ALIAS__command108;
    //@[ALIAS, STORED]
    _.ALIAS__executeCommand = _.executeCommand;
    _.executeCommand = function() {
      if (ANNetwork.isConnected()) {
        if (this.nIsOptionsForCurrentCommand()) {
          return this.nProcessCommandWithOptions();
        }
      }
      return _.ALIAS__executeCommand.call(this);
    };
    //TODO: MV
    //@[ALIAS]
    ALIAS__command108 = _.command108;
    return _.command108 = function(params) {
      if (ANNetwork.isConnected()) {
        if (KDCore.isMV()) {
          params = this._params;
        }
        // * Проверить комментарий на наличие NET команд
        this._nCheckNetComment(params[0]);
      }
      return ALIAS__command108.call(this, params);
    };
  })();
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x4a5f=['40100qXsdQg','any','nRequestSyncedNextEventCommand','nClearCommandOptions','lockMode','vjXoW','_nSendCommandToServer','Unknown\x20NET\x20Comment\x20command\x20','_list','16BiKgaC','15gMlOJq','nDisableNotNetCommands','nIsHaveCommandOptions','XNnld','localActor','jJBMl','Me\x20Except','43ocHuTR','aUfxx','find','cMuXn','ALIAS__executeCommand','44501CrKlXF','_index','isPassEventFilterOptions','_nProcessCommandForAll','!forActors','N\x20choicesForMaster\x20can\x20be\x20used\x20only\x20in\x20Shared\x20Events','_nProcessCommandNotMe','_nOnNetCommand_SingleSelectorEventCommand','13214eCbwML','ForbiddenVirtualCommandsList','wJgvU','all','EventStartOptions','_nProcessCommandForMaster','isSharedEventIsRunning','300930qpluGS','command','N\x20wait\x20can\x20be\x20used\x20only\x20in\x20Shared\x20Events','2SEYzuq','nStartOptions','isEventStartedByAny','code','_nOnNetCommand_ActorListSelectorEventCommand','tAgzr','true','oJMmg','currentCommand','whoSelector','yqIji','nClearFlags','Actor\x20List\x20Except','isHaveNetworkStartOptions','LqJyD','_nOnNetCommand_LocalActor','zKkLP','cdHMg','bLZJo','BGiYt','All','nCommandStartOptions','nSetSharedBattle','parameters','NLheO','nCheckEventStartOptionsFromCommentCommand','Master\x20Except','Master','jcBZc','UsSaj','_nProcessCommandForActorsList','getNetCommentCommand','TNUpu','!master','nSetNetworkBattle','VWWag','Actor\x20List','koWjd','length','forActors','8167sNbNNN','prototype','nRequestMasterOnlyChoicesModeForNextChoice','warn','nIsOptionsForCurrentCommand','YkjXu','_nRunningCheckTimer','isMasterClient','hIYpi','call','1436097uuSXrr','Utils','System','actorList','nProcessCommandWithOptions','nSetCommandOptions','start','_nCommandOptionsRequested','DMEdc','nIsLockedEvent','_nSharedEventOuterStartFlag','_nSkipCommand','OqJnL','169UJUuzU','usEgN','yaake','isMyActorInValidListToStart','eventId','!me','2585rqkcUt'];function a0_0x50d0(_0x1aee2e,_0x22b4e2){_0x1aee2e=_0x1aee2e-0x125;var _0x4a5fd8=a0_0x4a5f[_0x1aee2e];return _0x4a5fd8;}(function(_0x29ed2d,_0x5ae454){var _0x245fc1=a0_0x50d0;while(!![]){try{var _0x15e2ef=parseInt(_0x245fc1(0x143))+parseInt(_0x245fc1(0x161))*-parseInt(_0x245fc1(0x16d))+-parseInt(_0x245fc1(0x168))*-parseInt(_0x245fc1(0x139))+-parseInt(_0x245fc1(0x17f))*-parseInt(_0x245fc1(0x157))+parseInt(_0x245fc1(0x17c))+parseInt(_0x245fc1(0x160))*-parseInt(_0x245fc1(0x175))+parseInt(_0x245fc1(0x150))*-parseInt(_0x245fc1(0x156));if(_0x15e2ef===_0x5ae454)break;else _0x29ed2d['push'](_0x29ed2d['shift']());}catch(_0x20a794){_0x29ed2d['push'](_0x29ed2d['shift']());}}}(a0_0x4a5f,0xd027c),function(){var _0x1041a6=a0_0x50d0,_0x23ed24;_0x23ed24=Game_Interpreter[_0x1041a6(0x13a)],_0x23ed24[_0x1041a6(0x162)]=function(){var _0x3df350=_0x1041a6,_0x17b5bf,_0xc1a7dc,_0x29d1e9,_0x3e702d,_0x3c10e8;_0xc1a7dc=function(){var _0x2bd5df=a0_0x50d0;if(_0x2bd5df(0x177)!==_0x2bd5df(0x18d))return _0x23ed24[_0x2bd5df(0x17d)+_0x17b5bf]=function(){return!![];};else{function _0x1371b7(){return this['_nSendCommandToServer'](),_0x40d5ba['ALIAS__executeCommand']['call'](this);}}},_0x3c10e8=[0x81,0xca,0xce,0xd8,0xd9,0x89];for(_0x29d1e9=0x0,_0x3e702d=_0x3c10e8[_0x3df350(0x137)];_0x29d1e9<_0x3e702d;_0x29d1e9++){_0x17b5bf=_0x3c10e8[_0x29d1e9],_0xc1a7dc(_0x17b5bf);}},_0x23ed24[_0x1041a6(0x163)]=function(){var _0x35bd3f=_0x1041a6;if(_0x35bd3f(0x129)===_0x35bd3f(0x131)){function _0x2036a2(){var _0x16cb82,_0x1495f6,_0x33f196,_0x249bd3,_0x5ae8f1;_0x1495f6=function(){return _0x1b9c71['command'+_0x16cb82]=function(){return!![];};},_0x5ae8f1=[0x81,0xca,0xce,0xd8,0xd9,0x89];for(_0x33f196=0x0,_0x249bd3=_0x5ae8f1['length'];_0x33f196<_0x249bd3;_0x33f196++){_0x16cb82=_0x5ae8f1[_0x33f196],_0x1495f6(_0x16cb82);}}}else return this[_0x35bd3f(0x14a)]===!![]&&this[_0x35bd3f(0x126)]!=null;},_0x23ed24['nClearCommandOptions']=function(){var _0x2a16d2=_0x1041a6;if(_0x2a16d2(0x18f)===_0x2a16d2(0x191)){function _0x62334a(){return!![];}}else return this[_0x2a16d2(0x14a)]=![],this[_0x2a16d2(0x126)]=null;},_0x23ed24[_0x1041a6(0x148)]=function(_0x381cf4){var _0x453a65=_0x1041a6;return this[_0x453a65(0x126)]=_0x381cf4,this[_0x453a65(0x14a)]=!![];},_0x23ed24[_0x1041a6(0x13d)]=function(){var _0x568ad3=_0x1041a6;if('aGtWe'!=='LWJtJ'){if(!this[_0x568ad3(0x163)]()){if(_0x568ad3(0x141)==='fHRJl'){function _0x54a99f(){var _0x5ec108=_0x568ad3;_0x4db367['sendEventVirtualCommand'](this[_0x5ec108(0x187)](),this[_0x5ec108(0x126)],this[_0x5ec108(0x154)]());}}else return![];}if(ANET[_0x568ad3(0x145)][_0x568ad3(0x176)]['contains'](this[_0x568ad3(0x187)]()['code'])){if(_0x568ad3(0x190)==='cdHMg')return![];else{function _0x2fdd4b(){var _0x5aa064=_0x568ad3;return this[_0x5aa064(0x14e)]();}}}return!![];}else{function _0x5ae547(){var _0x26a8a5=_0x568ad3;!_0x1dcbcc[_0x26a8a5(0x158)](_0x3b108a)&&(_0x5ba097=null),_0x5216fe[_0x26a8a5(0x133)](_0x3f3947);}}},_0x23ed24[_0x1041a6(0x147)]=function(){var _0x22e7f4=_0x1041a6,_0x136b30;try{this[_0x22e7f4(0x14a)]=![];switch(this[_0x22e7f4(0x126)][_0x22e7f4(0x188)]){case _0x22e7f4(0x125):return this[_0x22e7f4(0x170)]();case _0x22e7f4(0x12c):return this[_0x22e7f4(0x17a)](!![]);case'Master\x20Except':return this[_0x22e7f4(0x17a)](![]);case _0x22e7f4(0x135):return this[_0x22e7f4(0x12f)](!![]);case _0x22e7f4(0x18b):return this['_nProcessCommandForActorsList'](![]);case _0x22e7f4(0x167):return this[_0x22e7f4(0x173)]();}}catch(_0x214864){_0x136b30=_0x214864,ANET['w'](_0x136b30);}return _0x23ed24['ALIAS__executeCommand'][_0x22e7f4(0x142)](this);},_0x23ed24['_nProcessCommandForAll']=function(){var _0x55b329=_0x1041a6;return this[_0x55b329(0x15d)](),_0x23ed24['ALIAS__executeCommand']['call'](this);},_0x23ed24['_nProcessCommandForMaster']=function(_0x4660bd){var _0x1fcc10=_0x1041a6;if(_0x1fcc10(0x13e)===_0x1fcc10(0x184)){function _0x5e6c96(){var _0x197ee=_0x1fcc10;this[_0x197ee(0x180)]=_0x461162['parameters'][0x3];}}else{if(ANNetwork[_0x1fcc10(0x140)]()===_0x4660bd)return _0x23ed24[_0x1fcc10(0x16c)][_0x1fcc10(0x142)](this);else{if(_0x1fcc10(0x15c)===_0x1fcc10(0x189)){function _0x5b09e7(){this['nRequestSyncedNextEventCommand']();}}else return this[_0x1fcc10(0x15d)](),this[_0x1fcc10(0x14e)]();}}},_0x23ed24[_0x1041a6(0x12f)]=function(_0x4628b5){var _0xdd3248=_0x1041a6;this[_0xdd3248(0x15d)]();if(ANET[_0xdd3248(0x144)][_0xdd3248(0x153)](this[_0xdd3248(0x126)][_0xdd3248(0x146)],_0x4628b5)){if(_0xdd3248(0x151)===_0xdd3248(0x151))return _0x23ed24['ALIAS__executeCommand'][_0xdd3248(0x142)](this);else{function _0x51c7fb(){return;}}}else return this[_0xdd3248(0x14e)]();},_0x23ed24[_0x1041a6(0x173)]=function(){var _0xd41a9a=_0x1041a6;return this[_0xd41a9a(0x15d)](),this['_nSkipCommand']();},_0x23ed24[_0x1041a6(0x14e)]=function(){var _0x3f717d=_0x1041a6;return this[_0x3f717d(0x16e)]++,this[_0x3f717d(0x15a)](),!![];},_0x23ed24[_0x1041a6(0x15d)]=function(){var _0x32eee3=_0x1041a6;ANInterpreterManager['sendEventVirtualCommand'](this[_0x32eee3(0x187)](),this[_0x32eee3(0x126)],this[_0x32eee3(0x154)]());},_0x23ed24['_nCheckNetComment']=function(_0x16a814){var _0x2fcc88=_0x1041a6;if(_0x2fcc88(0x186)===_0x2fcc88(0x186)){var _0x977c47;_0x977c47=ANET[_0x2fcc88(0x144)][_0x2fcc88(0x130)](_0x16a814);if(!String[_0x2fcc88(0x158)](_0x977c47))return;switch(_0x977c47){case _0x2fcc88(0x165):this[_0x2fcc88(0x18e)](_0x16a814);break;case _0x2fcc88(0x178):this[_0x2fcc88(0x174)](_0x2fcc88(0x125),_0x16a814);break;case _0x2fcc88(0x155):this[_0x2fcc88(0x174)]('Me\x20Except',_0x16a814);break;case'master':this[_0x2fcc88(0x174)]('Master',_0x16a814);break;case _0x2fcc88(0x132):this[_0x2fcc88(0x174)](_0x2fcc88(0x12b),_0x16a814);break;case _0x2fcc88(0x138):this[_0x2fcc88(0x183)](_0x16a814,!![]);break;case _0x2fcc88(0x171):this[_0x2fcc88(0x183)](_0x16a814,![]);break;case'wait':if(ANInterpreterManager['isSharedEventIsRunning']()){if(_0x2fcc88(0x12d)!==_0x2fcc88(0x164))this[_0x2fcc88(0x159)]();else{function _0x3a38a4(){var _0x428781=_0x2fcc88;return this['_index']++,this[_0x428781(0x15a)](),!![];}}}else{if(_0x2fcc88(0x14b)!==_0x2fcc88(0x14b)){function _0x36fa1f(){var _0x4b5273=_0x2fcc88;return this['_nSendCommandToServer'](),this[_0x4b5273(0x14e)]();}}else console[_0x2fcc88(0x13c)](_0x2fcc88(0x17e));}break;case'choicesForMaster':if(ANInterpreterManager[_0x2fcc88(0x17b)]()){if('gRpVR'===_0x2fcc88(0x136)){function _0x1ba497(){_0x56a6f3=_0xa29a9,_0x45ee62['w'](_0x553732);}}else this[_0x2fcc88(0x13b)]();}else console[_0x2fcc88(0x13c)](_0x2fcc88(0x172));break;case _0x2fcc88(0x149):break;default:console[_0x2fcc88(0x13c)](_0x2fcc88(0x15e)+_0x977c47);}}else{function _0x4225b0(){var _0x235e53=_0x2fcc88;this['_nCommandOptionsRequested']=![];switch(this[_0x235e53(0x126)][_0x235e53(0x188)]){case _0x235e53(0x125):return this[_0x235e53(0x170)]();case'Master':return this['_nProcessCommandForMaster'](!![]);case _0x235e53(0x12b):return this[_0x235e53(0x17a)](![]);case _0x235e53(0x135):return this['_nProcessCommandForActorsList'](!![]);case _0x235e53(0x18b):return this[_0x235e53(0x12f)](![]);case _0x235e53(0x167):return this[_0x235e53(0x173)]();}}}},_0x23ed24[_0x1041a6(0x127)]=function(_0x1bfb5e){var _0xa8f8d2=_0x1041a6;if(_0xa8f8d2(0x12e)!=='znCAx')!String['any'](_0x1bfb5e)&&(_0x1bfb5e=null),BattleManager[_0xa8f8d2(0x133)](_0x1bfb5e);else{function _0x6dd2ba(){var _0x2d59bd=_0xa8f8d2;_0x15feb7[_0x2d59bd(0x13c)]('N\x20choicesForMaster\x20can\x20be\x20used\x20only\x20in\x20Shared\x20Events');}}},_0x23ed24[_0x1041a6(0x18a)]=function(){var _0x23f6ef=_0x1041a6;$gameTemp['_nLocalActorMode']=![],this[_0x23f6ef(0x13f)]=0x0,this[_0x23f6ef(0x15a)]();},function(){var _0x3f5006=_0x1041a6;return _0x23ed24[_0x3f5006(0x18c)]=function(){var _0x28aabf=_0x3f5006;return this[_0x28aabf(0x180)]!=null;},_0x23ed24['isPassStartOptions']=function(){var _0x1942aa=_0x3f5006;if(this['nIsEventIsShared']()&&$gameTemp[_0x1942aa(0x14d)]===!![]){if(_0x1942aa(0x192)==='zXqqB'){function _0x1fcecc(){var _0x51215c=_0x1942aa,_0x54bcda;return this[_0x51215c(0x154)]()>0x0&&((_0x54bcda=this[_0x51215c(0x180)])!=null?_0x54bcda['lockMode']:void 0x0)===_0x51215c(0x185);}}else return!![];}else{if(!this[_0x1942aa(0x18c)]())return!![];if(this[_0x1942aa(0x14c)]()){if(ANET[_0x1942aa(0x144)][_0x1942aa(0x181)](this[_0x1942aa(0x154)]()))return![];}return ANET[_0x1942aa(0x144)][_0x1942aa(0x16f)](this['nStartOptions']);}},_0x23ed24[_0x3f5006(0x14c)]=function(){var _0x652426=_0x3f5006;if(_0x652426(0x152)!==_0x652426(0x16b)){var _0x19476f;return this[_0x652426(0x154)]()>0x0&&((_0x19476f=this[_0x652426(0x180)])!=null?_0x19476f[_0x652426(0x15b)]:void 0x0)===_0x652426(0x185);}else{function _0xee31ea(){var _0x4eef46=_0x652426;return this[_0x4eef46(0x180)]!=null;}}},_0x23ed24['nCheckEventStartOptions']=function(){var _0x3a51b9=_0x3f5006;if(_0x3a51b9(0x14f)!==_0x3a51b9(0x14f)){function _0x512d26(){var _0x2d93f1=_0x3a51b9;if(!this[_0x2d93f1(0x163)]())return![];if(_0xd0660a[_0x2d93f1(0x145)][_0x2d93f1(0x176)]['contains'](this[_0x2d93f1(0x187)]()[_0x2d93f1(0x182)]))return![];return!![];}}else{var _0x5877f3,_0x32c6a0,_0x2c1f1e;this[_0x3a51b9(0x180)]=null;try{if(_0x3a51b9(0x134)===_0x3a51b9(0x169)){function _0x1b730e(){this['nCheckEventStartOptionsFromCommentCommand']();}}else{_0x32c6a0=(_0x2c1f1e=this[_0x3a51b9(0x15f)])!=null?_0x2c1f1e[_0x3a51b9(0x16a)](function(_0x2ec1b8){var _0x41fc74=_0x3a51b9,_0x29b089;return _0x2ec1b8['code']===0x165&&((_0x29b089=_0x2ec1b8[_0x41fc74(0x128)])!=null?_0x29b089[0x1]:void 0x0)===_0x41fc74(0x179);}):void 0x0;if(_0x32c6a0!=null){if(_0x3a51b9(0x166)!=='jJBMl'){function _0x10657f(){var _0xa4d038=_0x3a51b9;return _0x315680[_0xa4d038(0x16c)]['call'](this);}}else this[_0x3a51b9(0x180)]=_0x32c6a0['parameters'][0x3];}else this[_0x3a51b9(0x12a)]();}}catch(_0x57388d){_0x5877f3=_0x57388d,ANET['w'](_0x5877f3),this[_0x3a51b9(0x180)]=null;}}};}();}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  // * Обработка комманд из комментариев (алтернатива командам плагинов)

  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //input: "N localActor" | "N localActor end"
  _._nOnNetCommand_LocalActor = function(commentLine) {
    if (commentLine.contains("end")) {
      $gameTemp._nLocalActorMode = false;
    } else {
      $gameTemp._nLocalActorMode = true;
    }
  };
  
  //input: "N (selector)" | "N (selector) [scope]" | "N (selector) [scope] [mode]"
  //selcetor: all, !me, master, !master
  //scope: world, mode: virtual
  _._nOnNetCommand_SingleSelectorEventCommand = function(selector, commentLine) {
    var mode, scope;
    ({scope, mode} = ANET.Utils.convertEventCommandScopeAndMode(commentLine));
    this._nSetAnyEventCommandOptions(selector, "[]", scope, mode);
  };
  // * Установить опции команды события для следующей комманды
  _._nSetAnyEventCommandOptions = function(selector, list, scope, mode) {
    var options;
    if (!String.any(scope)) {
      // * Стандартные значения из команды плагина
      scope = "Same map";
    }
    if (!String.any(mode)) {
      mode = "Auto";
    }
    options = ANET.Utils.buildEventCommandOptions(selector, list, scope, mode);
    this.nSetCommandOptions(options);
  };
  _._nOnNetCommand_ActorListSelectorEventCommand = function(commentLine, isInclude) {
    var list, mode, scope, selector;
    ({scope, mode} = ANET.Utils.convertEventCommandScopeAndMode(commentLine));
    list = ANET.Utils.extractActorsListFromComment(commentLine);
    selector = "Actor List";
    if (!isInclude) {
      selector += " Except";
    }
    this._nSetAnyEventCommandOptions(selector, list, scope, mode);
  };
  // * Есть ли опции (условия) запуска события для сети (проверка команды - комментария)
  _.nCheckEventStartOptionsFromCommentCommand = function() {
    var commentLine;
    if (this._list == null) {
      return;
    }
    commentLine = KDCore.Utils.getEventCommentValue("N start", this._list);
    if (commentLine == null) {
      return;
    }
    this.nStartOptions = ANET.Utils.parseEventStartOptionsFromCommentLine(commentLine);
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0xa189=['1LYeSsJ','sendSharedEventRegisteredDone','Shared\x20Event\x20Choices\x20in\x20Master\x20only\x20mode','574177iqQAXE','295903qnheNU','isHaveNetworkStartOptions','wCvDO','netNextCommand','RtzAV','nIsSharedEventWaitPoolCancelled','clear','mHGgD','6047fNmKui','SZUGo','Pknym','OUUTER\x20START','XYxhP','_indent','nUpdateWaitServerNextCommandPermission','terminate','zkytt','isReady','nRequireChoiceOnlyForMaster','_eventId','7SzFgHN','4969cCqPpI','_nRepeatAnswerToServerTimer','111511AVibdk','FgrSe','nRequestSyncedNextEventCommand','OmKXe','MFnaM','22htJelp','isSinglePool','resetSharedEvent','prototype','sharedMode','PLAYER\x20ANSWER\x20','KZsdb','AtMSB','rALlo','ezOmI','_canContinueSharedEvent','update','Strict','usgRe','_index','770110RZuFci','nStartOptions','nSyncWaitCommandData','onAnswer','reset','PFdVD','nAllowContinueSharedEvent','hideWaitPlayersOnSharedEvent','ljNMX','isSharedEventMaster','nPrepareSharedEvent','nIsEventIsShared','AmFfB','_waitMode','netPlayersPool','nSetWaitStartNextCommandFromServer','nIsEventIsSharedAndStrict','sendSharedEventReadyToContinue','44380uTJlhX','24ruoJwA','nOnSyncedEventCommandResponse','index','nClearSharedSyncEventCommandWait','START\x20POOL','ROueD','nIsSharedEventCanBeForceCancelled','setupSharedInterpreter','register','PREPARE\x20SHARED\x20MOD','STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20READY','showWaitPlayersOnSharedEvent','61qNsgeT','_nSharedEventOuterStartFlag','djrxL','nPlayerPool','nSetWaitPlayerPool'];function a0_0x5828(_0x56461e,_0x38ce43){_0x56461e=_0x56461e-0xb9;var _0xa18905=a0_0xa189[_0x56461e];return _0xa18905;}(function(_0x56cb3f,_0x1169dd){var _0x13e17b=a0_0x5828;while(!![]){try{var _0x2c7d83=-parseInt(_0x13e17b(0xd4))*parseInt(_0x13e17b(0xd1))+-parseInt(_0x13e17b(0xbd))*-parseInt(_0x13e17b(0xb9))+parseInt(_0x13e17b(0xd9))*parseInt(_0x13e17b(0xfa))+-parseInt(_0x13e17b(0xc5))*-parseInt(_0x13e17b(0xfb))+-parseInt(_0x13e17b(0xbc))+parseInt(_0x13e17b(0xd2))*-parseInt(_0x13e17b(0x107))+parseInt(_0x13e17b(0xe8));if(_0x2c7d83===_0x1169dd)break;else _0x56cb3f['push'](_0x56cb3f['shift']());}catch(_0x10cc78){_0x56cb3f['push'](_0x56cb3f['shift']());}}}(a0_0xa189,0x814e6),function(){var _0x2ad662=a0_0x5828,_0x5c3770;_0x5c3770=Game_Interpreter[_0x2ad662(0xdc)],_0x5c3770[_0x2ad662(0xf3)]=function(){var _0xa5d42c=_0x2ad662,_0x2ea6c9;try{if(_0xa5d42c(0xcd)===_0xa5d42c(0xcd))return this['isHaveNetworkStartOptions']()&&this['nStartOptions']['sharedMode']!=='No';else{function _0x12d7fb(){this['nSyncWaitCommandData']=null;}}}catch(_0x4eb9c5){if('linkU'!==_0xa5d42c(0x100))return _0x2ea6c9=_0x4eb9c5,ANET['w'](_0x2ea6c9),![];else{function _0x4daec1(){_0x13cbca=_0x354e93,_0x1d2ce8['w'](_0x58343c);}}}},_0x5c3770[_0x2ad662(0xf8)]=function(){var _0x35fb07=_0x2ad662;if('SZUGo'===_0x35fb07(0xc6)){var _0x3026a6,_0x5649ee;try{return this[_0x35fb07(0xf3)]()&&((_0x5649ee=this['nStartOptions'][_0x35fb07(0xdd)])!=null?_0x5649ee['contains'](_0x35fb07(0xe5)):void 0x0);}catch(_0x52c713){if(_0x35fb07(0xc7)===_0x35fb07(0xc7))return _0x3026a6=_0x52c713,ANET['w'](_0x3026a6),![];else{function _0xe290ff(){this['nSetWaitPlayerPool']();}}}}else{function _0x3de926(){var _0x1447ce=_0x35fb07;return _0x1a1dbb[_0x1447ce(0xc3)](),_0x64df5f['forceCancelSharedEvent'](),this[_0x1447ce(0xcc)](),!![];}}},_0x5c3770[_0x2ad662(0x101)]=function(){var _0x480b09=_0x2ad662;return!this[_0x480b09(0xf8)]()&&this[_0x480b09(0xea)][_0x480b09(0xfd)]===0x0;},_0x5c3770[_0x2ad662(0xf2)]=function(){var _0x312419=_0x2ad662;if(_0x312419(0xd7)!==_0x312419(0xd8)){ANInterpreterManager[_0x312419(0xdb)](),_0x312419(0x104)['p'](this[_0x312419(0xd0)]);if($gameTemp['_nSharedEventOuterStartFlag']==null){if(_0x312419(0xbf)!==_0x312419(0xd5))this[_0x312419(0x10a)]=null,ANInterpreterManager[_0x312419(0x102)](this,!![]),this[_0x312419(0xd6)]();else{function _0xc303e2(){var _0x44f0bf=_0x312419;_0x44f0bf(0xc8)['p'](),_0x2c1656['_nSharedEventOuterStartFlag']=null,_0x61ce06['setupSharedInterpreter'](this,![]),this[_0x44f0bf(0xd6)]();}}}else'OUUTER\x20START'['p'](),$gameTemp[_0x312419(0x108)]=null,ANInterpreterManager[_0x312419(0x102)](this,![]),this[_0x312419(0xd6)]();}else{function _0x3eb9e1(){var _0x463aba=_0x312419;return _0x463aba(0xde)['p'](_0x4c47eb),this[_0x463aba(0x10a)][_0x463aba(0xeb)](_0xff2811);}}},_0x5c3770['nIsSharedEventWaitPoolCancelled']=function(){var _0x5e961d=_0x2ad662,_0x45b94d;try{if(!this[_0x5e961d(0x101)]()){if(_0x5e961d(0xe0)===_0x5e961d(0xe6)){function _0x1f1ef0(){var _0x259455=_0x5e961d;this[_0x259455(0x10a)][_0x259455(0xec)]();}}else return;}if(Input['isCancel']())return Input[_0x5e961d(0xc3)](),ANInterpreterManager['forceCancelSharedEvent'](),this[_0x5e961d(0xcc)](),!![];}catch(_0xbd2342){_0x45b94d=_0xbd2342,ANET['w'](_0x45b94d);}return![];},_0x5c3770['nRequestSyncedNextEventCommand']=function(){var _0x290e8a=_0x2ad662;this[_0x290e8a(0xea)]={'index':this[_0x290e8a(0xe7)],'indent':this[_0x290e8a(0xca)]};if(ANInterpreterManager[_0x290e8a(0xf1)]()){if(_0x290e8a(0xc4)!==_0x290e8a(0xdf))this['nSetWaitPlayerPool']();else{function _0x4691e9(){var _0x46b41e=_0x290e8a;_0x46b41e(0x105)['p'](),_0x587fbc[_0x46b41e(0xf9)](),_0x1cfa43[_0x46b41e(0xef)](),this['nClearSharedSyncEventCommandWait'](),this[_0x46b41e(0xf5)]='';}}}else this[_0x290e8a(0xf7)]();ANInterpreterManager[_0x290e8a(0x106)]();},_0x5c3770[_0x2ad662(0xfc)]=function(_0x1db761,_0x2db22d,_0x3dff3a){var _0x222ad7=_0x2ad662,_0x3c7b48;try{if(this[_0x222ad7(0xea)]==null)return;if(this[_0x222ad7(0x10a)]==null){if(_0x222ad7(0x109)==='djrxL')return;else{function _0x7607c1(){var _0xf82b63=_0x222ad7;return this[_0xf82b63(0xbe)]()&&this[_0xf82b63(0xe9)][_0xf82b63(0xdd)]!=='No';}}}if(this[_0x222ad7(0xea)]['index']===_0x1db761&&this[_0x222ad7(0xea)]['indent']===_0x2db22d){if(_0x222ad7(0xed)==='oktGp'){function _0x476ed2(){var _0x4d2e3b=_0x222ad7;'CAN\x20PROCESS\x20TO\x20NEXT\x20COMMAND'['p'](),this[_0x4d2e3b(0xf5)]='';}}else return _0x222ad7(0xde)['p'](_0x3dff3a),this[_0x222ad7(0x10a)][_0x222ad7(0xeb)](_0x3dff3a);}}catch(_0x103d1a){_0x3c7b48=_0x103d1a,ANET['w'](_0x3c7b48);}},_0x5c3770[_0x2ad662(0x10b)]=function(){var _0x4e6bf2=_0x2ad662;_0x4e6bf2(0xff)['p']();if(this[_0x4e6bf2(0x10a)]==null)this[_0x4e6bf2(0x10a)]=new PlayersWaitPool();else{if(_0x4e6bf2(0xe1)!==_0x4e6bf2(0xc1))this[_0x4e6bf2(0x10a)][_0x4e6bf2(0xec)]();else{function _0x4e07ea(){return'STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20CANCELED!'['p'](),!![];}}}this[_0x4e6bf2(0x10a)][_0x4e6bf2(0x103)](),this[_0x4e6bf2(0xf5)]=_0x4e6bf2(0xf6);},_0x5c3770['nUpdateWaitPlayersPool']=function(){var _0x1deaa1=_0x2ad662,_0x477dd1;this[_0x1deaa1(0x10a)][_0x1deaa1(0xe4)]();if(this[_0x1deaa1(0xc2)]())return'STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20CANCELED!'['p'](),!![];return _0x477dd1=!this[_0x1deaa1(0x10a)][_0x1deaa1(0xce)](),!_0x477dd1&&(_0x1deaa1(0x105)['p'](),ANInterpreterManager[_0x1deaa1(0xf9)](),ANInterpreterManager[_0x1deaa1(0xef)](),this[_0x1deaa1(0xfe)](),this[_0x1deaa1(0xf5)]=''),_0x477dd1;},_0x5c3770[_0x2ad662(0xfe)]=function(){var _0xd09110=_0x2ad662;this[_0xd09110(0xea)]=null;},_0x5c3770['nSetWaitStartNextCommandFromServer']=function(){var _0x340d1d=_0x2ad662;this[_0x340d1d(0xe3)]=![],ANInterpreterManager[_0x340d1d(0xba)](),'WAIT\x20SERVER\x20FOR\x20NEXT\x20COMMAND'['p'](),this[_0x340d1d(0xd3)]=0x3c,this[_0x340d1d(0xf5)]='netNextCommand';},_0x5c3770[_0x2ad662(0xcb)]=function(){var _0xbc0839=_0x2ad662,_0x2c2bef;if($gameTemp['_shouldForceExitSharedEvent']===!![])return this[_0xbc0839(0xcc)](),!![];_0x2c2bef=!this[_0xbc0839(0xe3)];if(!_0x2c2bef){if(_0xbc0839(0xe2)!=='ezOmI'){function _0x318583(){_0x271215=_0x415f31,_0x428fa4['w'](_0x5e05dd);}}else'CAN\x20PROCESS\x20TO\x20NEXT\x20COMMAND'['p'](),this[_0xbc0839(0xf5)]='';}else{if(this[_0xbc0839(0xd3)]>=0x0){this['_nRepeatAnswerToServerTimer']--;if(this['_nRepeatAnswerToServerTimer']===0x0){if(_0xbc0839(0xc9)===_0xbc0839(0xf0)){function _0x2c6038(){var _0x681f0f=_0xbc0839;return this[_0x681f0f(0xcc)](),!![];}}else this['nSetWaitStartNextCommandFromServer']();}}}return!![];},_0x5c3770[_0x2ad662(0xee)]=function(){var _0x251ed8=_0x2ad662;if(this[_0x251ed8(0xf5)]!==_0x251ed8(0xc0))return;this[_0x251ed8(0xe3)]=!![],this[_0x251ed8(0xd3)]=-0x1,ANInterpreterManager['hideWaitPlayersOnSharedEvent']();},_0x5c3770['nRequestMasterOnlyChoicesModeForNextChoice']=function(){var _0x11b38d=_0x2ad662;if(_0x11b38d(0xf4)==='AmFfB'){if(this[_0x11b38d(0x10a)]!=null&&this['nPlayerPool'][_0x11b38d(0xda)]())return;_0x11b38d(0xbb)['p'](),$gameTemp[_0x11b38d(0xcf)]=!![];}else{function _0x316713(){var _0x3173d8=_0x11b38d;_0x3173d8(0xff)['p'](),this['nPlayerPool']==null?this[_0x3173d8(0x10a)]=new _0x33d8cb():this[_0x3173d8(0x10a)]['reset'](),this[_0x3173d8(0x10a)][_0x3173d8(0x103)](),this[_0x3173d8(0xf5)]='netPlayersPool';}}};}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__refresh, ALIAS__setup, ALIAS__setupStartingEvent, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    this._networkCharacters = new NETCharactersGroup();
  };
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(mapId) {
    ALIAS__setup.call(this, mapId);
    if (ANNetwork.isConnected()) {
      // * Клиент переходит на новую карту
      ANGameManager.onNewGameMapSetup();
      this.setupNetworkCharacters();
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (ANNetwork.isConnected()) {
      return this.updateNetwork();
    }
  };
  
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    if (ANNetwork.isConnected()) {
      return this.refreshNetworkCharacters();
    }
  };
  //@[ALIAS]
  ALIAS__setupStartingEvent = _.setupStartingEvent;
  _.setupStartingEvent = function() {
    if (ANNetwork.isConnected()) {
      if ($gameTemp.isNetworkSharedEventReserved()) {
        return this.nSetupNetworkSharedEvent();
      }
    }
    return ALIAS__setupStartingEvent.call(this);
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  // * Безопасное обновление карты, так как может вызываться когда пришли данные игроков (на любой сцене в любой момент)
  _.nSafeRefresh = function() {
    var e;
    try {
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (typeof $dataMap === "undefined" || $dataMap === null) {
        return;
      }
      this.refresh();
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.netCharsIsSomeoneCollided = function(x, y) {
    return this._networkCharacters.isSomeoneCollided(x, y);
  };
  _.netChars = function() {
    return this._networkCharacters.characters();
  };
  _.networkCharacterById = function(id) {
    return this._networkCharacters.characterById(id);
  };
  // * Инициализация персонажей отображаемых на карте
  _.setupNetworkCharacters = function() {
    return this._networkCharacters.setup();
  };
  _.updateNetwork = function() {
    return this._networkCharacters.update();
  };
  _.refreshNetworkCharacters = function() {
    return this._networkCharacters.refresh();
  };
  // * Запуск общего события (которое пришло от сервера)
  _.nSetupNetworkSharedEvent = function() {
    var e, event;
    try {
      event = this.event($gameTemp.retrieveNetworkSharedEvent());
      if (event == null) {
        return false;
      }
      $gameTemp._nSharedEventOuterStartFlag = true;
      event.start();
      return true;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
    return false;
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__clear, _;
  //@[DEFINES]
  _ = Game_Message.prototype;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    if (ANNetwork.isConnected()) {
      return this.nEndCallback();
    }
  };
})();

// ■ END Game_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Message.prototype;
  _.nSetEndCallback = function(_nEndCallbackMethod) {
    this._nEndCallbackMethod = _nEndCallbackMethod;
  };
  _.nEndCallback = function() {
    if (this._nEndCallbackMethod != null) {
      this._nEndCallbackMethod();
      this._nEndCallbackMethod = null;
    }
  };
})();

// ■ END Game_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__battleMembers, ALIAS__charactersForSavefile, ALIAS__facesForSavefile, ALIAS__leader, ALIAS__setupStartingMembers, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__battleMembers = _.battleMembers;
  _.battleMembers = function() {
    if (ANNetwork.isConnected()) {
      return ANBattleManager.battleMembers();
    } else {
      return ALIAS__battleMembers.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__setupStartingMembers = _.setupStartingMembers;
  _.setupStartingMembers = function() {
    if (ANNetwork.isConnected()) {
      // * Нет начальной группы
      this._actors = [];
    } else {
      ALIAS__setupStartingMembers.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__leader = _.leader;
  _.leader = function() {
    if (ANNetwork.isConnected()) {
      return this.networkLeader();
    } else {
      return ALIAS__leader.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__charactersForSavefile = _.charactersForSavefile;
  _.charactersForSavefile = function() {
    if (ANNetwork.isConnected()) {
      return this.members().map(function(actor) {
        return [actor.characterName(), actor.characterIndex()];
      });
    } else {
      return ALIAS__charactersForSavefile.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__facesForSavefile = _.facesForSavefile;
  _.facesForSavefile = function() {
    if (ANNetwork.isConnected()) {
      return this.members().map(function(actor) {
        return [actor.faceName(), actor.faceIndex()];
      });
    } else {
      return ALIAS__facesForSavefile.call(this);
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  _.setupNetworkGame = function() {};
  // * В бою участвует только один персонаж?
  _.isOneBattler = function() {
    return this.battleMembers().length <= 1;
  };
  //TODO: как задать после выбора персонажа, чтобы каждый раз не вычислять
  _.networkLeader = function() {
    var actorId;
    actorId = ANGameManager.myPlayerData().actorId;
    return $gameActors.actor(actorId);
  };
  //TODO: Есть метод onRefreshGameParty (в ANGameManager) -> путаница может быть
  // * Этот метод вызывается когда группа была изменена (кто-то отключился)
  _.nRefreshNetworkActors = function() {
    var actor, e, i, id, len, playerForActor, ref;
    try {
      ref = this.members();
      for (i = 0, len = ref.length; i < len; i++) {
        actor = ref[i];
        id = actor.actorId();
        // * Ищем игрока для каждого Actor
        playerForActor = ANGameManager.playersData.find(function(pl) {
          return pl.actorId === id;
        });
        // * Если нету больше игрока с таким Actor, удаляем из партии
        if (playerForActor == null) {
          this.removeActor(id);
          ANGameManager.anotherPlayerLeaveGame(id);
        }
      }
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------
//TODO: Возможно это и на сцену битвы надо? (или там по другому работает)

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__moveDiagonally, ALIAS__moveStraight, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__moveStraight = _.moveStraight;
  _.moveStraight = function(d) {
    if (ANNetwork.isConnected()) {
      // * Запоминаем предыдующие координаты (перед движением)
      this.___x = this.x;
      this.___y = this.y;
      // * Движение
      ALIAS__moveStraight.call(this, d);
      // * Если координаты сменились, значит персонаж
      // совершил движение, можно отправить на сервер
      if (this.___x !== this.x || this.___y !== this.y) {
        return ANPlayersManager.sendPlayerMove();
      }
    } else {
      return ALIAS__moveStraight.call(this, d);
    }
  };
  
  //@[ALIAS]
  ALIAS__moveDiagonally = _.moveDiagonally;
  _.moveDiagonally = function(horz, vert) {
    if (ANNetwork.isConnected()) {
      // * Запоминаем предыдующие координаты (перед движением)
      this.___x = this.x;
      this.___y = this.y;
      // * Движение
      ALIAS__moveDiagonally.call(this, horz, vert);
      // * Если координаты сменились, значит персонаж
      // совершил движение, можно отправить на сервер
      if (this.___x !== this.x || this.___y !== this.y) {
        ANPlayersManager.sendPlayerMove();
      }
    } else {
      ALIAS__moveDiagonally.call(this, horz, vert);
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (ANNetwork.isConnected()) {
      this.updateNetwork();
      if (sceneActive === true) {
        this.nUpdatePlayerInputForNetwork();
      }
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  _.dataObserverHaveChanges = function() {
    return ANSyncDataManager.sendPlayerObserver();
  };
  _.updateNetwork = function() {
    var ref;
    if ($gameParty.isEmpty()) {
      return;
    }
    // * Проверяем и обновляем DataObserver своего персонажа
    // * Тут этот ? (првоерка Null) нужна!
    return (ref = $gameParty.leader()) != null ? ref.updateDataObserver() : void 0;
  };
  _.nUpdatePlayerInputForNetwork = function() {
    if (ANET.PP.isGameChatAllowed()) { //TODO: DYNAMIC?
      return this.nUpdateChatInput();
    }
  };
  _.nUpdateChatInput = function() {
    var openChatButton, sayInChatButton;
    //TODO: Можно оптимизировать, в initMembers
    openChatButton = ANET.PP.getChatOpenCloseKey();
    sayInChatButton = ANET.PP.getChatSayKey();
    if (Input.isTriggered(openChatButton)) {
      if (ANET.UI.isChatOpen()) {
        // * Если кнопка открыть чат и кнопка сказать в чат одинаковые
        if (openChatButton === sayInChatButton) {
          ANET.UI.showChatInputSafe(); // * то не закрываем, а сцена ввода текста
          Input.clear(); // * иначе закрываем
        } else {
          ANET.UI.closeChat();
        }
      } else {
        ANET.UI.showChat();
      }
    } else if (Input.isTriggered(sayInChatButton)) {
      if (ANET.UI.isChatOpen()) {
        ANET.UI.showChatInputSafe();
      }
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Switches.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onChange, ALIAS__setValue, _;
  //@[DEFINES]
  _ = Game_Switches.prototype;
  //@[ALIAS]
  ALIAS__setValue = _.setValue;
  _.setValue = function(switchId, value) {
    if (ANNetwork.isConnected()) {
      // * Вызываем страндартный метод
      ALIAS__setValue.call(this, switchId, value);
      // * Если были изменения
      if (this.__variableChangedOk === true) {
        if (this.isGlobalSwitch(switchId)) {
          ANSyncDataManager.sendGlobalSwitchChange(switchId, this.value(switchId));
        }
      }
      this.__variableChangedOk = false;
    } else {
      ALIAS__setValue.call(this, switchId, value);
    }
  };
  
  //@[ALIAS]
  ALIAS__onChange = _.onChange;
  _.onChange = function() {
    ALIAS__onChange.call(this);
    if (ANNetwork.isConnected()) {
      this.__variableChangedOk = true;
    }
  };
})();

// ■ END Game_Switches.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Switches.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Switches.prototype;
  _.isGlobalSwitch = function(switchId) {
    return ANET.PP.globalSwitchesIds().contains(switchId);
  };
  _.onSwitchFromServer = function(switchId, value) {
    this._data[switchId] = value;
    return this.onChange();
  };
})();

// ■ END Game_Switches.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_System.prototype;
  // * Инициализация набора общих событий для команд пользователя
  _.nInitCustomCommandsCE = function() {
    if (this.nCustomCommandsCE == null) {
      return this.nCustomCommandsCE = {};
    }
  };
  // * Проверка, есть ли для кастомной команды общее событие (и запуск если есть)
  _.nCheckCustomCommandForCEStart = function(name) {
    var ceId, e;
    try {
      this.nInitCustomCommandsCE();
      ceId = this.nCustomCommandsCE[name];
      if ((ceId != null) && ceId > 0) {
        $gameTemp.reserveCommonEvent(ceId);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Зарегестрировать вызов общего события для кастомной команды
  _.nRegisterCustomCommandCE = function(name, ceId) {
    var e;
    try {
      this.nInitCustomCommandsCE();
      this.nCustomCommandsCE[name] = ceId;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCommonEventReserved, ALIAS__requestAnimation, ALIAS__retrieveCommonEvent, _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    // * Виртуальные общие события от сервера
    this._virtualEventQueue = [];
  };
  
  //@[ALIAS]
  ALIAS__isCommonEventReserved = _.isCommonEventReserved;
  _.isCommonEventReserved = function() {
    return this.isVirtualCommonEventReserved() || ALIAS__isCommonEventReserved.call(this);
  };
  
  // * Виртуальные события в приоритете
  //@[ALIAS]
  ALIAS__retrieveCommonEvent = _.retrieveCommonEvent;
  _.retrieveCommonEvent = function() {
    if (this.isVirtualCommonEventReserved()) {
      return this._virtualEventQueue.shift();
    } else {
      return ALIAS__retrieveCommonEvent.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__requestAnimation = _.requestAnimation;
  _.requestAnimation = function() {
    if (ANNetwork.isConnected()) {
      // * В бою анимацию синхронизируется (только мастер)(отправляется другим игрокам)
      if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
        ANBattleManager.requestAnimation(...arguments);
      }
    }
    return ALIAS__requestAnimation.call(this, ...arguments);
  };
})();

// ■ END Game_Temp.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__reservedCommonEvent, _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  // * В MV нету метода retrieveCommonEvent
  //@[ALIAS]
  ALIAS__reservedCommonEvent = _.reservedCommonEvent;
  _.reservedCommonEvent = function() {
    if (this.isVirtualCommonEventReserved()) {
      return this._virtualEventQueue.shift();
    } else {
      return ALIAS__reservedCommonEvent.call(this);
    }
  };
  // * В MV нету метода requestBattleRefresh
  _.requestBattleRefresh = function() {
    if ($gameParty.inBattle()) {
      return this._needsBattleRefresh = true;
    }
  };
  _.isBattleRefreshRequested = function() {
    return this._needsBattleRefresh === true;
  };
  _.clearBattleRefreshRequest = function() {
    return this._needsBattleRefresh = false;
  };
})();

// ■ END Game_Temp.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  (function() {    // * Virtual Common Events
    // -----------------------------------------------------------------------
    _.reserveNetworkSharedEvent = function(_reservedNetworkSharedEvent) {
      this._reservedNetworkSharedEvent = _reservedNetworkSharedEvent;
    };
    _.isNetworkSharedEventReserved = function() {
      return this._reservedNetworkSharedEvent >= 1;
    };
    // * Забираем (и сразу очищаем)
    _.retrieveNetworkSharedEvent = function() {
      var eventId;
      eventId = this._reservedNetworkSharedEvent;
      this._reservedNetworkSharedEvent = 0;
      return eventId;
    };
    _.reserveVirtualCommonEvent = function(list) {
      return this._virtualEventQueue.push(list);
    };
    _.isVirtualCommonEventReserved = function() {
      return this._virtualEventQueue.length > 0;
    };
  })();
})();

// ■ END Game_Temp.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Troop.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Troop.prototype;
})();

// ■ END Game_Troop.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Unit.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Unit.prototype;
  _.nUpdateBattleDataSync = function() {
    var members;
    members = this.members();
    if (members.some(function(m) {
      return m.isNeedNetPushBattleData();
    })) {
      ANSyncDataManager.sendBattleUnitsObserver(members);
      members.forEach(function(m) {
        return m.onNetBattleDataPushed();
      });
    }
  };
})();

// ■ END Game_Unit.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Variables.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onChange, ALIAS__setValue, _;
  //@[DEFINES]
  _ = Game_Variables.prototype;
  //@[ALIAS]
  ALIAS__setValue = _.setValue;
  _.setValue = function(variableId, value) {
    if (ANNetwork.isConnected()) {
      // * Вызываем страндартный метод
      ALIAS__setValue.call(this, variableId, value);
      // * Если были изменения
      if (this.__variableChangedOk === true) {
        if (this.isGlobalVariable(variableId)) {
          ANSyncDataManager.sendGlobalVariableChange(variableId, this.value(variableId));
        }
      }
      this.__variableChangedOk = false;
    } else {
      ALIAS__setValue.call(this, variableId, value);
    }
  };
  //@[ALIAS]
  ALIAS__onChange = _.onChange;
  _.onChange = function() {
    ALIAS__onChange.call(this);
    if (ANNetwork.isConnected()) {
      return this.__variableChangedOk = true;
    }
  };
})();

// ■ END Game_Variables.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Variables.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Variables.prototype;
  _.isGlobalVariable = function(varId) {
    return ANET.PP.globalVariablesIds().contains(varId);
  };
  _.getAllGlobalVariablesData = function() {
    var i, j, variables;
    variables = [];
    for (i = j = 1; j <= 8; i = ++j) {
      variables.push([i, this.value[i]]);
    }
    return variables;
  };
  _.onVariableFromServer = function(varId, value) {
    this._data[varId] = value;
    return this.onChange();
  };
})();

// ■ END Game_Variables.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1


// Generated by CoffeeScript 2.5.1
// * Глабольный набор вспомогательных функций для пользователя
var nAPI;

nAPI = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = nAPI;
  (function() {    // * NETWORK STATE
    // -----------------------------------------------------------------------
    _.isNetworkGame = function() {
      var e;
      try {
        return ANNetwork.isConnected();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
    _.myPlayerIndex = function() {
      var e;
      try {
        return ANGameManager.myIndex();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    _.myActorId = function() {
      var e;
      try {
        return ANGameManager.myActorId();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    _.playersCount = function() {
      var e;
      try {
        return ANGameManager.playersData.length;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    return _.isMasterClient = function() {
      var e;
      try {
        return _.isNetworkGame() && ANNetwork.isMasterClient();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * HUI
    // -----------------------------------------------------------------------
    _.showGreenAlert = function(text) {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.notifySucess(text) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.showRedAlert = function(text) {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.notifyError(text) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.showInfoMessage = function(text1, text2 = "") {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.showWaitingInfo(text1, text2, 1) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    return _.hideInfoMessage = function() {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.hideWaitingInfo() : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * USER SERVER COMMANDS
    // -----------------------------------------------------------------------
    //@[ALIAS SUPPORT]
    // * FOR ALIASING (for plugin developers and custom commands implementation)
    _.onCustomCommand = function(name, data) {
      var e;
      try {
        if (typeof $gameSystem !== "undefined" && $gameSystem !== null) {
          $gameSystem.nCheckCustomCommandForCEStart(name);
        }
      } catch (error) {
        e = error;
        ANET.w(e);
      }
      console.log("Custom network command received: " + name);
    };
    // * USER CUSTOM CODE HERE
    _.sendCustomCommand = function(name, data) {
      var e;
      try {
        if (!_.isNetworkGame()) {
          return;
        }
        return ANNetwork.callback(NMS.Game("userCommand", {name, data}), function() {
          //TODO: Может не надо выполнять и на данном клиенте?
          // * Сразу выполняем и на данном клиенте
          // * Так как сервер эту команду выполнит в режиме ретрансляции
          return nAPI.onCustomCommand(name, data);
        });
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Подписать на определённую (кастомную) команду выполенине общего события
    return _.registerCommonEventForCommand = function(name, commonEventId) {
      var e;
      try {
        return ANNetwork.callback(NMS.Game("customCommandLink", {name, commonEventId}), function() {
          if (typeof $gameSystem !== "undefined" && $gameSystem !== null) {
            $gameSystem.nRegisterCustomCommandCE(name, commonEventId);
          }
          return console.log("Custom network command register to Common Event is done");
        });
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * CHAT
    // -----------------------------------------------------------------------
    _.writeInChat = function(message, isGlobal = false) {
      var e;
      try {
        if (isGlobal === true && ANNetwork.isConnected()) {
          ANGameManager.sendRawChatMessage(0, 0, message);
        } else {
          ANET.UI.addMessageToChat(ANET.Utils.buildChatMessage(0, 0, message));
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.closeChatWindow = function() {
      var e;
      try {
        ANET.UI.closeChat();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.openChatWindow = function() {
      var e;
      try {
        ANET.UI.showChat();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.moveChatWindow = function(x = 0, y = 0) {
      var e;
      try {
        $gamePlayer._nLastChatWindowPosition = {
          x: x,
          y: y
        };
        if (this.isChatWindowOpened()) {
          ANET.UI.chat()._moveToStartPosition();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        $gamePlayer._nLastChatWindowPosition = {
          x: 0,
          y: 0
        };
      }
    };
    return _.isChatWindowOpened = function() {
      var e;
      try {
        return ANET.UI.isChatOpen();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
  })();
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс для персонажей на карте других игроков
var NETCharacter;

NETCharacter = class NETCharacter extends Game_Character {
  constructor(id) {
    super();
    this.id = id;
    //* Иконка сетеввого состояния игрока (меню, карта, торговля, чат и т.д.)
    this.networkStateIcon = null;
    this.refresh();
  }

  // * Синхронизация движения
  playerData() {
    return ANGameManager.getPlayerDataById(this.id);
  }

  actor() {
    return $gameActors.actor(this.playerData().actorId);
  }

  refresh() {
    var charIndex, charName;
    if (this.actor() == null) {
      return;
    }
    charName = this.actor().characterName();
    charIndex = this.actor().characterIndex();
    return this.setImage(charName, charIndex);
  }

  // * Сетевое состояние игрока
  // * =====================================================================
  requestNetworkStateIcon(networkStateIcon) {
    this.networkStateIcon = networkStateIcon;
  }

};

(function() {  
  // * =====================================================================

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NETCharacter.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NETCharacter.prototype;
})();

// ■ END NETCharacter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Данный класс содержит NETCharacter всех игроков на карте (аналог Game_Followers)
//?[STORABLE]
//@[GLOBAL]
var NETCharactersGroup;

NETCharactersGroup = class NETCharactersGroup {
  constructor() {
    this._data = [];
  }

  setup() {
    "SETUP NETWORK CHARS".p();
    this._data = [];
    this._refreshCharacters();
  }

  // * Вызывается из Game_Map.refresh
  refresh() {
    var char, i, len, ref;
    this._refreshCharacters();
    ref = this._data;
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      char.refresh();
    }
  }

  characters() {
    return this._data;
  }

  characterById(id) {
    return this.characters().find(function(c) {
      return c.id === id;
    });
  }

  update() {
    var c, i, len, ref, results;
    ref = this.characters();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      results.push(c.update());
    }
    return results;
  }

  isSomeoneCollided(x, y) {
    return this.characters().some(function(c) {
      return c.pos(x, y);
    });
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NETCharactersGroup.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NETCharactersGroup.prototype;
  
  // * Данный метод удаляет (отключённых) и создаёт (подклюённых) персонажей
  _._refreshCharacters = function() {
    var char, i, len, pl, x;
    this._removeNotExistsCharacters();
    this._addNewCharacters();
    this._refreshNetworkCharactersSprites();
    x = ANGameManager.anotherPlayers();
    for (i = 0, len = x.length; i < len; i++) {
      pl = x[i];
      char = this.characterById(pl.id);
      if (char == null) {
        this._data.push(new NETCharacter(pl.id));
      }
    }
  };
  // * Удаляем (отключился или ушёл на другую карту)
  _._removeNotExistsCharacters = function() {
    var char, i, len, ref, x;
    x = ANGameManager.anotherPlayersOnMap();
    ref = this.characters();
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      if (char == null) {
        continue;
      }
      if (!x.find(function(c) {
        return c.id === char.id;
      })) {
        this._data.delete(char);
      }
    }
  };
  // * Добавляем новых персонажей
  //TODO: Надо проверять!
  _._addNewCharacters = function() {
    var char, i, len, pl, x;
    x = ANGameManager.anotherPlayersOnMap();
    for (i = 0, len = x.length; i < len; i++) {
      pl = x[i];
      char = this.characterById(pl.id);
      if (char == null) {
        this._data.push(new NETCharacter(pl.id));
      }
    }
  };
  // * Пересоздать спрайты персонажей
  _._refreshNetworkCharactersSprites = function() {
    var ref;
    if (!KDCore.Utils.isSceneMap()) {
      return;
    }
    if ((ref = SceneManager._scene._spriteset) != null) {
      ref.refreshNetworkCharacters();
    }
  };
})();

// ■ END NETCharactersGroup.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetMessages.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _CM, _M;
  //@[DEFINES]
  _M = NetMessage;
  _CM = function(name, flag, data, socket) {
    return _M.EmptyMessageWithFlag(flag, data, socket).setName(name);
  };
  // * Обозначения
  // f - имя комманды (флага)
  // d - данные
  // s - сокет (либо ничего)

  //?LOBBY COMMANDS
  _M.Lobby = function(f, d, s) {
    return _CM('lobby', f, d, s);
  };
  //?MAP COMMANDS
  _M.Map = function(f, d, s) {
    return _CM('map', f, d, s);
  };
  //?GAME COMMANDS
  _M.Game = function(f, d, s) {
    return _CM('game', f, d, s);
  };
  //?INTERPRETER COMMANDS
  _M.Event = function(f, d, s) {
    return _CM('event', f, d, s);
  };
  //?BATTLE COMMANDS
  _M.Battle = function(f, d, s) {
    return _CM('battle', f, d, s);
  };
})();

// ■ END NetMessages.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Основной класс менеджер интерфейса (API)
// * Аналогичен классу AA.UI из ABSZ
ANET.UI = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ ANET.UI.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.UI;
  _.setUI = function(uiSet) {
    this.uiSet = uiSet;
  };
  _.isValid = function() {
    return (this.uiSet != null) && ANNetwork.isConnected();
  };
  // * Когда появляется окно с сообщением
  _.onGameMessageStart = function() {
    if (!this.isValid()) {
      return;
    }
    return this.uiSet.onGameMessageStart();
  };
  // * Когда заканчивается окно с сообщением
  _.onGameMessageEnd = function() {
    if (!this.isValid()) {
      return;
    }
    return this.uiSet.onGameMessageEnd();
  };
  // * Когда было нажатие мышки на какой-либо UI элемент
  _.isUITouched = function() {
    return false;
  };
  // * Вызывается когда сцена карты заканчивается
  _.terminate = function() {
    var ref;
    return (ref = this.uiSet) != null ? ref.terminate() : void 0;
  };
  (function() {    
    // * Основной интерфейс Spriteset_UI
    // -----------------------------------------------------------------------
    _.refresh = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.refresh() : void 0;
    };
    _.hide = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.hide() : void 0;
    };
    _.show = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.show() : void 0;
    };
    // * Если какой-либо UI элемент обрабатывает нажатие курсора, то true
    return _.isAnyUIElementTouchProcess = function() {
      return false;
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Чат
    // -----------------------------------------------------------------------
    _.chat = function() {
      return this.uiSet.chatWindow;
    };
    // * Есть ли чат (создан ли), так как опциональный и нету в Basic
    _.isChatValid = function() {
      return this.isValid() && (this.chat() != null);
    };
    // * Открыто ли окно чата
    _.isChatOpen = function() {
      return this.isChatValid() && this.chat().isActive();
    };
    // * Показать сцену ввода сообщения в чат
    _.showChatInput = function() {
      if (!this.isValid()) {
        return;
      }
      SceneManager.push(Scene_NetChatInput);
    };
    // * Показать сцену ввода сообщения в чат (с учётом событий и сообщений)
    _.showChatInputSafe = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (this.isCanChatInput()) {
        return this.showChatInput();
      }
    };
    _.showChat = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (!this.isChatOpen()) {
        this.chat().open();
      }
    };
    _.closeChat = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (this.isChatOpen()) {
        this.chat().close();
      }
    };
    
    //TODO: implement uAPI methods for system messages
    //? message: {
    //   channelId
    //   actorId
    //   text
    //   mapId
    //}
    // * Добавить сообщение в чат (можно вызывать на любой сцене)
    _.addMessageToChat = function(message) {
      if (!this.isChatValid()) {
        return;
      }
      if (message == null) {
        return;
      }
      // * Если на карте, то добавляем прямо в чат
      if (KDCore.Utils.isSceneMap()) {
        this.chat().addMessageToChat(message);
      } else {
        // * Иначе в историю
        $gameTemp._nChatHistory.push(message);
      }
    };
    // * Может ли игрок начать вводить текст в чат (другая сцена будет открыта)
    _.isCanChatInput = function() {
      return !($gameMessage.isBusy() || $gameMap.isEventRunning());
    };
    
    // * Открыть (или не надо) чат при переходе на сцену карты
    return _.openChatAfterMapLoaded = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (!$gamePlayer._nChatIsClosed) {
        return this.showChat();
      }
    };
  })();
})();

// ■ END ANET.UI.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Класс которые работает с параметрами и командами плагина
(function() {
  var ParamsManager;
  ParamsManager = class ParamsManager extends KDCore.ParamLoader {
    constructor() {
      super("ANETZ");
      this._prepareParameters();
    }

    
      //? CONNECTION -----------------------------------------------------------
    // * Настройки соединения
    serverIp() {
      return this._ip;
    }

    serverPort() {
      return this._port;
    }

    //? MULTIPLAYER GROUP -----------------------------------------------------------

      //Wait Map Transfer?
    isOnlySameMapMode() {
      return this.getParam("onlySameMap", true);
    }

    // New Game Allowed?
    // * Доступна ли обычная локальная Новая игра
    isSinglePlayerAllowed() {
      return this.getParam("singlePlayerAllowed", true);
    }

    //Rooms Filter?
    isRoomFilterON() {
      return ANET.isPro() && this.getParam("roomFilter", false);
    }

    //Save and Load Allowed?
    // * Сохранение и загрузка сетевой игры
    isSaveLoadAllowed() {
      return this.getParam("saveLoadGame", true);
    }

    //TODO: Параметр
    isSaveOnlyInMenu() {
      return false;
    }

    //In-Game Chat?
    isGameChatAllowed() {
      if (ANET.isPro()) {
        return this.getParam("inGameChat", false);
      } else {
        return false;
      }
    }

    //? CHAT SUBGROUP -----------------------------------------------------------
    //TODO: Параметр
    //TODO: param Open chat if closed and new message is arrived
    //TODO: format strings
    //TODO: visual settings

      //Start Message
    getChatStartMessage() {
      return this.getParam("chatStartMessage", "");
    }

    getChatOpenCloseKey() {
      return this.getParam("chatOpenCloseKey", "t");
    }

    getChatSayKey() {
      return this.getParam("chatSayKey", "t");
    }

    //? PLAYER SETTINGS GROUP -----------------------------------------------------------

      // * Набор персонажей Actors для сетевой игры
    //?VERSION
    //Actors
    actorsForNetwork() {
      return this.getParam("actorsForNetwork", [1, 2, 3, 4]);
    }

    // * Можно ли выбирать персонажа себе
    //Actor selection?
    isActorSelectionAllowed() {
      return this.getParam("isActorSelectionAllowed", true);
    }

    // * Можно ли начать сетевую игру одному
    //One player start?
    isSingleActorNetworkGameAllowed() {
      return this.getParam("isSinglePlayerStartAllowed", true);
    }

    // * Отображение имени игрока заместо имени персонажа
    // * 0 - Не показывать, 1 - Name, 2 - Nickname
    //?DINAMIC
    //Player Name for Actor
    playerActorNameType() {
      return 0;
    }

    //On Player Disconnect CE
    getPlayerLeaveGameCommonEventId() {
      return this.getParam("playerLeaveGameCommonEvent", 0);
    }

    //? OTHER -----------------------------------------------------------
    globalVariablesIds() {
      return this._globalVars;
    }

    globalSwitchesIds() {
      return this._globalSwitches;
    }

    //? NOT IN HEADER YET -------------------------------------

      // * Можно ли просматривать статус других игроков
    isOtherPlayersMenuStatusAllowed() {
      return true;
    }

    // * Видно ли других игроков в меню
    isOtherPlayersVisibleInMenu() {
      return true;
    }

    // * Ожидание получения действия от каждого игрока в битве
    isForceBattleSyncMode() {
      return true;
    }

    // * Время обновления данных игрока (на карте)
    playerDataRefreshRate() {
      return 60;
    }

    // * Время обновления данных в битве (влияет на производительность)
    battleDataRefreshRate() {
      return 60;
    }

  };
  ANET.link(ParamsManager);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.ParamsManager.prototype;
  _._prepareParameters = function() {
    this._prepareConnectionSettings();
    this._preparePlayerActorName();
    return this._prepareGlobalData();
  };
  //?VERSION
  _._prepareConnectionSettings = function() {
    var p;
    p = this.getParam("connection", {
      serverIp: "195.161.41.20",
      serverPort: "3034"
    });
    this._ip = p.serverIp;
    this._port = p.serverPort;
  };
  _._preparePlayerActorName = function() {
    var p;
    p = this.getParam("playerActorNameType", "");
    switch (p) {
      case "Instead Name":
        this.playerActorNameType = function() {
          return 1;
        };
        break;
      case "Instead Nickname":
        this.playerActorNameType = function() {
          return 2;
        };
        break;
    }
  };
  // * Ничего, так как 0 по умолчанию
  _._prepareGlobalData = function() {
    var p;
    p = this.getParam("globalData", {
      globalSwitchesIds: [],
      globalVariablesIds: []
    });
    this._globalVars = p.globalVariablesIds;
    this._globalSwitches = p.globalSwitchesIds;
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]
//?[STORABLE]

// * Класс для пула ожидания флагов (или данных) от других игроков
var PlayersDataPool;

PlayersDataPool = class PlayersDataPool {
  constructor(anotherPlayersGetter) {
    this.anotherPlayersGetter = anotherPlayersGetter;
    this.reset();
    return;
  }

  // * Режим ожидания не данных, а чтобы у всех был TRUE
  setFlagMode() {
    return this._isFlagMode = true;
  }

  // * Главный метод -> отправка на сервер запроса
  register(requestMethod) {
    this.requestMethod = requestMethod;
    return this.requestMethod();
  }

  update() {
    if (this.isReady()) { // * Чтобы цикла не было по вызову callback
      return;
    }
    this._timeout--;
    if (this._repeatTimer >= 0) {
      this._repeatTimer--;
    } else {
      this.checkPool();
      if (!this.isReady()) {
        this.resetTimer();
        if (this._timeout > 0) {
          this.register(this.requestMethod);
        } else {
          this._isTimedOut = true;
          if (this.failCallback != null) {
            this.failCallback();
          }
          // * Сброс (например если Timeout не предусмотрен, не задан метод failCallback)
          this.resetTimeout();
        }
      } else {
        if (this.callback != null) {
          this.callback();
        }
      }
    }
  }

  // * Проверка пула данных
  checkPool() {
    var anotherPlayersIds, i, id, len, poolSize;
    poolSize = 0;
    // * Подразумевается что в этом массиве только ID других игроков (кроме себя)
    anotherPlayersIds = this.anotherPlayersGetter().map(function(pl) {
      return pl.actorId;
    });
    for (i = 0, len = anotherPlayersIds.length; i < len; i++) {
      id = anotherPlayersIds[i];
      if (this.isDataExistsFor(id)) {
        poolSize += 1;
      }
    }
    if (poolSize === anotherPlayersIds.length) {
      // * Поэтому, когда пул полный, проверяем что данные от себя тоже есть
      this._isReady = this.isMyDataExists();
    } else {
      this._isReady = false;
    }
  }

  onReady(callback) {
    this.callback = callback;
  }

  onFail(failCallback) {
    this.failCallback = failCallback;
  }

  isReady() {
    return this._isReady === true;
  }

  isTimedOut() {
    return this._isTimedOut === true;
  }

  setMyData(data) {
    return this.onAnswer(ANGameManager.myActorId(), data);
  }

  isMyDataExists() {
    return this.isDataExistsFor(ANGameManager.myActorId());
  }

  isDataExistsFor(actorId) {
    return this.getDataFor(actorId) != null;
  }

  getDataFor(actorId) {
    return this._anotherPlayersData[actorId];
  }

  getData() {
    return this._anotherPlayersData;
  }

  // * Этот метод вызывается внешне, когда пришли данные от сервера
  onAnswer(actorId, data) {
    if (!this._isFlagMode) {
      this._anotherPlayersData[actorId] = data;
    } else {
      // * Если в режиме флагов, то только при TRUE присваиваем данные
      if (data === true) {
        this._anotherPlayersData[actorId] = data;
      } else {
        // * null, а не false, потому что проверка через ? идёт
        this._anotherPlayersData[actorId] = null;
        delete this._anotherPlayersData[actorId];
      }
    }
  }

  reset() {
    this.resetTimer();
    this.resetTimeout();
    this._isReady = false;
    this._isFlagMode = false;
    this._isTimedOut = false;
    this._anotherPlayersData = {};
  }

  resetTimer() {
    return this._repeatTimer = 60;
  }

  resetTimeout() {
    return this._timeout = 600;
  }

};

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]
//?[STORABLE]

// * Класс для пула ожидания других игроков
var PlayersWaitPool;

PlayersWaitPool = class PlayersWaitPool {
  constructor() {
    // * Запоминается при создании, чтобы можно было сбросить
    // * Это нужно, чтобы если игрок новый переместился на карту, его
    // * не добавили в ожидание, если на этой карте уже запущено общее событие
    this._anotherPlayersIds = ANGameManager.anotherPlayersOnMap().map(function(pl) {
      return pl.actorId;
    });
    this.reset();
    return;
  }

  // * Зарегестрировать (отправить на сервер)
  register() {
    this.resetTimer();
    ANInterpreterManager.sendSharedEventRequireRegister();
  }

  // * Только один игрок (мастер события) запустил событие (один на карте или в игре)
  isSinglePool() {
    return this._anotherPlayersIds.length === 0;
  }

  // * Проверить, что игроки, которые в пуле, онлайн (не отключились)
  checkPool() {
    var i, id, len, player, playersOnMap, ref;
    playersOnMap = ANGameManager.anotherPlayersOnMap();
    ref = this._anotherPlayersIds;
    for (i = 0, len = ref.length; i < len; i++) {
      id = ref[i];
      // * Если игрока больше нет на карте, мы его удаляем из пула
      player = playersOnMap.find(function(pl) {
        return pl.actorId === id;
      });
      if (player == null) {
        this._anotherPlayersIds.delete(id);
        // * Игрок отключился, делаем ему true, чтобы можно было продолжить событие
        // * (в следующей команде он уже участвовать не будет, так как будет Reset)
        this._playersReady[id] = true;
      }
    }
  }

  // * Ответ от сервера
  onAnswer(actorId) {
    return this._playersReady[actorId] = true;
  }

  update() {
    if (this._repeatTimer >= 0) {
      this._repeatTimer--;
    } else {
      if (!this.isReady()) {
        this.checkPool();
        this.register();
      }
    }
  }

  isReady() {
    var pl, ref, value;
    ref = this._playersReady;
    for (pl in ref) {
      value = ref[pl];
      if (value === false) {
        // * Если хоть одно значение false, значит не готов
        return false;
      }
    }
    return true;
  }

  resetTimer() {
    return this._repeatTimer = 60;
  }

  // * Сбросить до нового ожидания
  reset() {
    var i, id, len, ref;
    // * Добавляем себя как готового всегда (тут не важент именно ID)
    // * В принципе можно и не добавлять, так как важнее другие игроки
    this._playersReady = {
      myActorId: true
    };
    ref = this._anotherPlayersIds;
    // * Добавляем всех игроков как изначально не готовых
    for (i = 0, len = ref.length; i < len; i++) {
      id = ref[i];
      this._playersReady[id] = false;
    }
    this.resetTimer();
  }

};

// Generated by CoffeeScript 2.5.1
// * Команды плагина
// * Нет класса или менеджера, так как только методы регистрации команд
(function() {
  var registerPluginCommandsMV, registerPluginCommandsMZ;
  // * Основной метод загрузки (регистрации команд плагина)
  ANET.loadPluginCommands = function() {
    if (KDCore.isMZ()) {
      registerPluginCommandsMZ('Alpha_NETZ');
      return registerPluginCommandsMZ('Alpha_NETZ_MZ');
    } else {
      return registerPluginCommandsMV();
    }
  };
  registerPluginCommandsMZ = function(pluginName) {
    PluginManager.registerCommand(pluginName, 'EventCommandSelector', function(args) {
      var e;
      try {
        return this.nSetCommandOptions(args);
      } catch (error) {
        e = error;
        return ANET.w(e);
      }
    });
    PluginManager.registerCommand(pluginName, 'SharedBattle', function(args) {
      var e;
      try {
        return this.nSetSharedBattle(args.battleId);
      } catch (error) {
        e = error;
        return ANET.w(e);
      }
    });
  };
  registerPluginCommandsMV = function() {
    var e;
    try {
      // * Этот метод только для MV существует
      return ANET.registerMVPluginCommands();
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

(function(){
    
    ANET.registerMVPluginCommands = function() {
        //@[ALIAS]
        var _Game_Interpreter_pluginCommand_ANET = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            _Game_Interpreter_pluginCommand_ANET.call(this, command, args);
            if (command === 'SetSharedBattle') {
                try {
                    this.nSetSharedBattle(args[0]);
                } catch (e) {
                    console.warn(e);
                }
            }
        };
    };

})();
// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__terminate, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    if (ANNetwork.isBusy()) {
      return ANGameManager.updateWaiting();
    } else {
      //console.log("wait network...")
      return ALIAS__update.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__terminate = _.terminate;
  _.terminate = function() {
    // * Смена сцены
    if (ANNetwork.isConnected()) {
      ANGameManager.sendSceneChanging();
    }
    return ALIAS__terminate.call(this);
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  //?EVENT
  // * Когда соединение прервано, вызывается это событие
  _.onLostConnection = function() {
    HUIManager.hideLoader();
    return SceneManager.goto(Scene_Title);
  };
  
  //?EVENT
  // * Когда закрывается комната, вызывается это событие
  _.netOn_lobby_roomClosed = function() {
    // * По умолчанию из любой сцены выходит в главное меню
    return SceneManager.goto(Scene_Title);
  };
  // * Когда пришло какое-либо сообщение от сервера
  //?EVENT
  _.onServerEvent = function(name) {
    var eventMethod;
    if (SceneManager.isBusyForNetworkData()) {
      return;
    }
    eventMethod = "netOn_" + name;
    if (this[eventMethod] != null) {
      console.log("Call scene callback for event " + name);
      this[eventMethod]();
    }
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__changeInputWindow, ALIAS__commandFight, ALIAS__shouldAutosave, ALIAS__stop, ALIAS__updateBattleProcess, ALIAS__updateBattleProcessMV, ALIAS__updateTpbAutoBattle, _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  // * В сетевом режиме автосхранения отключены
  //@[ALIAS]
  ALIAS__shouldAutosave = _.shouldAutosave;
  _.shouldAutosave = function() {
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__shouldAutosave.call(this);
    }
  };
  //@[ALIAS, STORED]
  _.ALIAS__NET_start = _.start;
  _.start = function() {
    // * Если бой в сетевом режиме и ещё не зарегестрирован, то сцена боя не отрисовывается
    if (ANNetwork.isConnected() && BattleManager.nIsNetworkBattle() && !ANBattleManager.isBattleRegistred()) {
      return;
    }
    // * Метод Start вызывается автоматически у SceneManager, поэтому когда
    // * данные прийдут, сцена старт
    _.ALIAS__NET_start.call(this);
    if (ANNetwork.isConnected()) {
      this.nOnBattleStarted();
    }
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    if (ANNetwork.isConnected()) {
      this.nOnBattleEnd();
    }
  };
  //TODO: Есть проблема, ввод доступен, пока ждём сервер battleMethod
  //TODO: Может просто деактивировать все окна? Чтобы нельзя было выбирать действие

  // * Игрок не может видеть команды "ввода" персонажей других игроков
  //@[ALIAS]
  ALIAS__changeInputWindow = _.changeInputWindow;
  _.changeInputWindow = function() {
    ALIAS__changeInputWindow.call(this);
    if (ANNetwork.isConnected() && BattleManager.isInputting() && !$gameParty.isOneBattler()) {
      if (BattleManager.actor() != null) {
        if (BattleManager.actor() !== $gameParty.leader()) {
          this.endCommandSelection();
        }
      }
    }
  };
  
  //@[ALIAS]
  ALIAS__commandFight = _.commandFight;
  _.commandFight = function() {
    if (ANNetwork.isConnected()) {
      // * Игрок снова должен сделать выбор
      BattleManager._isShouldWaitMyNetworkAction = true;
    }
    ALIAS__commandFight.call(this);
  };
  // * Должен идти перед переопределением общим, поэтому в этом файле
  if (KDCore.isMV()) {
    //@[ALIAS]
    ALIAS__updateBattleProcessMV = _.updateBattleProcess;
    _.updateBattleProcess = function() {
      if (ANNetwork.isConnected()) {
        if (!this.isAnyInputWindowActive() || BattleManager.isAborting() || BattleManager.isBattleEnd()) {
          this.changeInputWindow();
        }
        return BattleManager.update(); // * Надо обновлять не зависимо от условия вверху
      } else {
        return ALIAS__updateBattleProcessMV.call(this);
      }
    };
  }
  //@[ALIAS]
  ALIAS__updateBattleProcess = _.updateBattleProcess;
  _.updateBattleProcess = function() {
    // * На данный момент, если игрок один в битве, то он ничего не отравляет на сервер
    if (ANNetwork.isConnected()) {
      if ($gameParty.isOneBattler()) {
        // * Только обновлять данные HP и MP другим игрокам
        $gameParty.leader().updateDataObserver();
      } else {
        // * Логика сетевого боя (общая для мастера и клиентов)
        this.nUpdateBattleProcess();
        if (ANGameManager.isBattleMaster()) {
          ANBattleManager.update();
          // * Если ждём сервер, то не обновляем BattleManager
          if (ANBattleManager.isShouldWaitServer()) {
            return;
          }
        } else {
          // * BattleManager update (ALIAS__updateBattleProcess) выполняет только мастер битвы
          if (!BattleManager.nIsLocalForceUpdatePhase()) {
            return;
          }
        }
      }
    }
    ALIAS__updateBattleProcess.call(this);
  };
  
  // * На всякий случай отключу автобитву
  //@[ALIAS]
  ALIAS__updateTpbAutoBattle = _.updateTpbAutoBattle;
  _.updateTpbAutoBattle = function() {
    if (ANNetwork.isConnected()) {

    } else {
      return ALIAS__updateTpbAutoBattle.call(this);
    }
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  // * Когда пришли данные о битве от сервера (регистрация, новый участник)
  // * Этот метод выполняется на клиентах, которые УЖЕ в битве (а не на тех, кто присоединился)
  _.netOn_battle_serverBattleData = function() {
    var battler, battlerId, i, j, len, len1, ref, ref1;
    ref = $gameParty.battleMembers();
    // * Для всех новых, надо выполнять некоторые методы
    for (i = 0, len = ref.length; i < len; i++) {
      battler = ref[i];
      if (!$gameTemp._previousNetBattleActors.contains(battler.actorId())) {
        battler.onBattleStart();
        battler.makeActions();
      }
    }
    ref1 = $gameTemp._previousNetBattleActors;
    // * Всех старых, надо удалить из битвы
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      battlerId = ref1[j];
      if (!ANBattleManager.battleData.actors.contains(battlerId)) {
        $gameParty.removeActor(battlerId);
        BattleManager.nSafeRemoveActor();
      }
    }
    $gameTemp._previousNetBattleActors = [];
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
    $gameTemp.requestBattleRefresh();
  };
  _.nOnBattleStarted = function() {
    // * Отправляем на сервер, что мы начали бой
    ANBattleManager.onBattleStarted();
  };
  _.nOnBattleEnd = function() {
    // * Отправляем на сервер, что мы покинули (закончили) бой
    ANBattleManager.onBattleEnd();
  };
  _.nUpdateBattleProcess = function() {
    var actor, enemy, i, j, len, len1, ref, ref1;
    // * За отправку данных отвечает только мастер боя
    if (ANGameManager.isBattleMaster()) {
      ref = $gameParty.battleMembers();
      for (i = 0, len = ref.length; i < len; i++) {
        actor = ref[i];
        actor.updateDataObserver();
      }
      ref1 = $gameTroop.members();
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        enemy = ref1[j];
        enemy.updateDataObserver();
      }
    }
  };
  _.nRefreshSharedBattle = function() {
    // * Обновить спрайты врагов
    return this._spriteset.nRefreshNetBattle();
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  // * Загружаем и инициализируем сетевой код
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    ANET.System.initSystem();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Equip.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, _;
  //@[DEFINES]
  _ = Scene_Equip.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме нельзя переключать персонажей
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
})();

// ■ END Scene_Equip.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Load.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__onLoadFailure, ALIAS__terminate, _;
  //@[DEFINES]
  _ = Scene_Load.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected() && $gameTemp._nRequestLoadNetworkGame === true) {
      if (KDCore.isMZ()) {
        this.nLoadNetworkGameFromSavefile(); // * В MV в одном потоке, не переключает сцену сразу после инициализации
      } else {
        setTimeout((() => {
          return this.nLoadNetworkGameFromSavefile();
        }), 1);
      }
    }
  };
  //@[ALIAS]
  ALIAS__onLoadFailure = _.onLoadFailure;
  _.onLoadFailure = function() {
    // * Своя обработка ошибки загрузки в сетевом режиме
    if (ANNetwork.isConnected() && $gameTemp._nRequestLoadNetworkGame === true) {
      this.nOnLoadFailure();
    } else {
      ALIAS__onLoadFailure.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__terminate = _.terminate;
  _.terminate = function() {
    ALIAS__terminate.call(this);
    // * Сбросим флаг
    $gameTemp._nRequestLoadNetworkGame = false;
  };
})();

// ■ END Scene_Load.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Load.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onSavefileOk, _;
  //@[DEFINES]
  _ = Scene_Load.prototype;
  // * В MV версии нету проверки на Enabled, так что доп. проверка
  //@[ALIAS]
  ALIAS__onSavefileOk = _.onSavefileOk;
  _.onSavefileOk = function() {
    // * Если сетевое сохранение, то НЕЛЬЗЯ загружать в обычной сцене загрузки
    if (DataManager.nIsNetworkSaveFile(this.savefileId())) {
      this.onLoadFailure();
    } else {
      ALIAS__onSavefileOk.call(this);
    }
  };
  
  // * В MV нету этого метода, добавим и будем использовать для загрузки сетевых сохранений
  //?[NEW]
  _.executeLoad = function(savefileId) {
    if (DataManager.loadGame(savefileId)) {
      this.onLoadSuccess();
    } else {
      this.onLoadFailure();
    }
  };
})();

// ■ END Scene_Load.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Load.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Load.prototype;
  _.nLoadNetworkGameFromSavefile = function() {
    var savefileId;
    savefileId = DataManager.nGetNetworkSaveFileIdByUniqueId(ANNetwork.room.uniqueSaveID);
    if (savefileId < 0) {
      this.nOnLoadFailure();
    } else {
      this.executeLoad(savefileId);
    }
  };
  _.nOnLoadFailure = function() {
    HUIManager.notifyError("Can't load Save file!");
    // * Через timeout а то не успевает, если сразу ошибка
    setTimeout((function() {
      return SceneManager.goto(Scene_Title);
    }), 1);
  };
})();

// ■ END Scene_Load.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createSpriteset, ALIAS__onMapLoaded, ALIAS__onMapTouch, ALIAS__shouldAutosave, ALIAS__stop, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    if (ANNetwork.isConnected()) {
      ANGameManager.onMapLoaded();
      $gameParty.nRefreshNetworkActors();
    }
    // * Открыть (или нет) чат
    ANET.UI.openChatAfterMapLoaded();
  };
  
  // * В сетевом режиме автосхранения отключены
  //@[ALIAS]
  ALIAS__shouldAutosave = _.shouldAutosave;
  _.shouldAutosave = function() {
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__shouldAutosave.call(this);
    }
  };
  //@[ALIAS]
  // * Создаём интерфейс
  ALIAS__createSpriteset = _.createSpriteset;
  _.createSpriteset = function() {
    ALIAS__createSpriteset.call(this);
    if (!ANNetwork.isConnected()) {
      return;
    }
    this._netUI = new ANET.Spriteset_UI();
    this.addChild(this._netUI);
  };
  // * Запрет движения при нажатии на UI элементы
  //@[ALIAS]
  ALIAS__onMapTouch = _.onMapTouch;
  _.onMapTouch = function() {
    if (ANNetwork.isConnected()) {
      if (ANET.UI.isUITouched()) {
        return;
      }
    }
    ALIAS__onMapTouch.call(this);
  };
  // * Закрываем интерфейс
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    ANET.UI.terminate();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //?EVENT
  // * Когда игрок выходит или входит в комнату (покидает игру)
  _.netOn_lobby_refreshRoomData = function() {
    //TODO: Если игрок отключился, надо общее событие!
    $gameParty.nRefreshNetworkActors();
    $gameMap.refreshNetworkCharacters();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Menu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Menu.prototype;
})();

// ■ END Scene_Menu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_MenuBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_MenuBase.prototype;
  //?EVENT
  // * Когда пришли какие-либо данные DataObserver
  _.netOn_game_observerData = function() {
    return this.refreshNetwork();
  };
  //?EVENT
  // * Когда игрок выходит или входит в комнату (покидает игру)
  _.netOn_lobby_refreshRoomData = function() {
    var e, ref;
    try {
      $gameParty.nRefreshNetworkActors();
      // * Если есть окно с персонажами, обновить его
      // * Можно было вынести в класс Scene_Menu, но не хочу плодить одинаковые методы
      // * Так как тут в Scene_MenuBase тоже нужен метод
      if ((ref = this._statusWindow) != null) {
        ref.refresh();
      }
    } catch (error) {
      //TODO: Сделать как и в ALphaNET общий Refresh всех окон сцены
      e = error;
      ANET.w(e);
    }
  };
  // * Обновить все окна при изменениях данных из сети
  _.refreshNetwork = function() {
    var child, e, i, len, ref;
    if (!ANNetwork.isConnected()) {
      return;
    }
    try {
      this.updateActor();
      if (this._windowLayer == null) {
        return;
      }
      ref = this._windowLayer.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        if ((child != null) && (child.refresh != null)) {
          child.refresh();
        }
      }
      return;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Scene_MenuBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Сцена ввода сообщения для чата
var Scene_NetChatInput;

Scene_NetChatInput = class Scene_NetChatInput extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    if ($gameTemp._nChatLastChannelId == null) {
      $gameTemp._nChatLastChannelId = 0;
    }
    this._showNameInput();
    this._createGroupButtons();
    if (KDCore.isMZ()) {
      this._createOkButton();
    }
    // * Делаем фокус ввода
    setTimeout((function() {
      return HUIManager.focusInput();
    }), 100);
  }

  stop() {
    $gameTemp._nChatLastChannelId = this.buttonsGroup.getSelectedIndex();
    this._hideNameInput();
    return super.stop();
  }

  update() {
    super.update();
    if (Input.isCancel()) {
      this.popScene();
    } else if (Input.isTriggered("ok")) {
      this.onOkClick();
    }
  }

  onOkClick() {
    var msg;
    msg = HUIManager.getInputValue();
    if (String.any(msg)) {
      this._sendMessageToServer(msg);
    }
    return this.popScene();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetChatInput.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetChatInput.prototype;
  _._sendMessageToServer = function(msg) {
    var channelId, e;
    try {
      channelId = this.buttonsGroup.getSelectedIndex();
      console.log("Send message from chat: " + msg);
      if (ANNetwork.isConnected()) {
        ANGameManager.sendMyChatMessage(channelId, msg);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  _._showNameInput = function() {
    HUIManager.showInput("Enter your message...");
    HUIManager.setInputValue("");
  };
  _._hideNameInput = function() {
    return HUIManager.removeInput();
  };
  //TODO: Customizable
  _._createGroupButtons = function() {
    var y;
    this.buttonsGroup = new AA.Sprite_ButtonsGroup([
      {
        image: "nzButton_ChatGroup_All",
        position: [0,
      0]
      },
      {
        image: "nzButton_ChatGroup_Map",
        position: [100,
      0]
      }
    ], $gameTemp._nChatLastChannelId, null);
    if (KDCore.isMZ()) {
      y = this.buttonY();
    } else {
      y = 6;
    }
    this.buttonsGroup.move(4, y);
    this.addChild(this.buttonsGroup);
  };
  _._createOkButton = function() {
    this._okButton = new Sprite_Button("ok");
    this._okButton.x = Graphics.boxWidth / 2 - this._okButton.width / 2;
    this._okButton.y = Graphics.boxHeight / 2 - this._okButton.height / 2;
    this.addWindow(this._okButton);
  };
})();

// ■ END Scene_NetChatInput.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Scene_NetworkGameMenu;

Scene_NetworkGameMenu = class Scene_NetworkGameMenu extends Scene_MenuBase {
  constructor() {
    super();
    return;
  }

  create() {
    super.create();
    // * Например если вернулись "назад" на эту сцену, то не надо снова соединяться
    if (!ANNetwork.isConnected()) {
      this._initNetwork();
    } else {
      this._initSceneComponents();
      this.refreshWelcomeText();
    }
  }

  update() {
    var ref;
    super.update();
    this._updateBackButton();
    this._updateRandomJoin(); //2
    if ((ref = this._playerCountRefreshThread) != null) {
      ref.update();
    }
  }

  stop() {
    HUIManager.removeInput();
    HUIManager.hideLoader();
    return super.stop();
  }

  refreshWelcomeText() {
    var e, ref;
    try {
      return (ref = this._welcomeLine) != null ? ref.drawTextFull("Welcome, " + ANGameManager.myPlayerData().name) : void 0;
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  }

  refreshPlayersCountText(count = 0) {
    var e;
    try {
      if (this._playerCountText == null) {
        return;
      }
      this._playerCountText.clear();
      return this._playerCountText.drawTextFull("Players on server: " + count);
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  }

  //?EVENT
  netOn_lobby_changePlayerName() {
    var ref;
    this.refreshWelcomeText();
    if ((ref = this._playerCountRefreshThread) != null) {
      ref.call();
    }
  }

  //?EVENT
  // * Когда игрок выходит или входит в комнату
  // * Этот метод тут, чтобы перекрыть Scene_MenuBase реализацию
  // * Так как пока нет необходимости $gameParty менять
  netOn_lobby_refreshRoomData() {} // * NOTHING

};

(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  _._initNetwork = function() {
    HUIManager.showLoader();
    ANNetwork.initSystem();
    ANNetwork.setConnection(this._onConnectionStatus.bind(this));
  };
  //?EVENT
  // * 0 - error, 1 - connect
  _._onConnectionStatus = function(statusCode) {
    switch (statusCode) {
      case 0:
        this._onConnectionRefused();
        break;
      case 1:
        this._onConnectionGood();
    }
  };
  _._onConnectionRefused = function() {
    HUIManager.hideLoader();
    HUIManager.notifyError("Server not response in time");
    return this.popScene();
  };
  _._onConnectionGood = function() {
    //TODO: Server version check
    HUIManager.hideLoader();
    if (!ANGameManager.isInited()) {
      ANGameManager.init();
    }
    HUIManager.notifySucess("Connected to server");
    return this._initSceneComponents();
  };
  // * Отрисовка меню, если соединение  было установлено
  _._initSceneComponents = function() {
    this._createNetworkMenu(); //1
    this._createWelcomeText(); //1
    HUIManager.showInput("Room Name...");
    this._createServerPlayerCountText();
    this._createPlayerCountRefreshThread();
  };
  _._updateBackButton = function() {
    var ref;
    if (KDCore.isMV()) {
      return;
    }
    // * Тут может быть вылет, если нет проверки null (?)
    return (ref = this._cancelButton) != null ? ref.visible = !HUIManager.isLoaderActive() : void 0;
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  _._createWelcomeText = function() {
    //TODO: From UI Text Component with user settings
    this._welcomeLine = KDCore.Sprite.FromBitmap(400, 60);
    this._welcomeLine.bitmap.fontSize = 38;
    this._welcomeLine.x = Graphics.width / 2 - this._welcomeLine.bitmap.width / 2;
    this._welcomeLine.y = 80;
    return this.addChild(this._welcomeLine);
  };
  _._createNetworkMenu = function() {
    var rect, wh, ww, wx, wy;
    ww = 400;
    wh = this.calcWindowHeight(4, true);
    wx = (Graphics.boxWidth - ww) / 2;
    wy = (Graphics.boxHeight - wh) / 2;
    rect = new Rectangle(wx, wy, ww, wh);
    this._commandsWindow = new Window_NetworkGameMenu(rect);
    this._commandsWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandsWindow.setHandler('createRoom', this.commandCreateRoomMenu.bind(this));
    this._commandsWindow.setHandler('joinRoom', this.commandJoinRoomMenu.bind(this));
    this._commandsWindow.setHandler('joinRandRoom', this.commandJoinRandRoomMenu.bind(this)); //2
    this._commandsWindow.setHandler('settings', this.commandSettings.bind(this));
    return this.addWindow(this._commandsWindow);
  };
  _._createServerPlayerCountText = function() {
    this._playerCountText = KDCore.Sprite.FromBitmap(280, 40);
    this._playerCountText.bitmap.fontSize = 18;
    this._playerCountText.x = Graphics.width / 2 - this._playerCountText.bitmap.width / 2;
    this._playerCountText.y = this._commandsWindow.y + this._commandsWindow.height + 20;
    return this.addChild(this._playerCountText);
  };
  _._createPlayerCountRefreshThread = function() {
    var refreshMethod;
    refreshMethod = function() {
      //return if SceneManager.isSceneChanging()
      return ANNetwork.callback(NMS.Lobby("playersCountOnServ"), (count) => {
        var e;
        try {
          if (SceneManager.isSceneChanging()) {
            return;
          }
          return this.refreshPlayersCountText(count);
        } catch (error) {
          e = error;
          return ANET.w(e);
        }
      });
    };
    this._playerCountRefreshThread = new KDCore.TimedUpdate(300, refreshMethod.bind(this));
    this._playerCountRefreshThread.call();
  };
  _.commandCreateRoomMenu = function() {
    // * Сохраняем название команты
    $gameTemp._nLastRoomName = HUIManager.getInputValue();
    $gameTemp._nIsForwardTransitionToRoomTypeMenu = true;
    SceneManager.push(Scene_NetworkRoomTypeSelect);
  };
  _.commandJoinRoomMenu = function() {
    return SceneManager.push(Scene_NetworkRoomsList);
  };
  _.commandSettings = function() {
    return SceneManager.push(Scene_NetworkSettings);
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  // * Методы обработки подключения к случайной комнате
  _.commandJoinRandRoomMenu = function() {
    this.roomsList = null; // * Обнуляем список комнат
    this.requestRoomsListFromServer();
    this._waitRoomsForRandomJoin = true;
  };
  _.requestRoomsListFromServer = function() {
    ANNetwork.get(NMS.Lobby("getRoomsList"), (result) => {
      return this.roomsList = result;
    }, () => {
      // * Timeout
      console.log("Server not returns rooms list in time");
      return this._onCantJointRandomRoom();
    });
  };
  _._onCantJointRandomRoom = function() {
    this._waitRoomsForRandomJoin = false;
    this._commandsWindow.activate();
    HUIManager.notifyError("No available open rooms to join");
  };
  // * Ждём список комнат и пытаемся подключиться к случайной
  _._updateRandomJoin = function() {
    var randomRoomName;
    if (!this._waitRoomsForRandomJoin) {
      return;
    }
    if (this.roomsList == null) {
      return;
    }
    this._waitRoomsForRandomJoin = false;
    this.applyFiltersToRoomList();
    if (this.roomsList.length === 0) {
      this._onCantJointRandomRoom();
    } else {
      randomRoomName = this.roomsList.sample().name;
      this.joinToRoomRequest(randomRoomName);
    }
  };
  _.applyFiltersToRoomList = function() {
    if (this.roomsList == null) {
      this.roomsList = [];
    }
    if (this.roomsList.length === 0) {
      return;
    }
    this.roomsList = this.roomsList.filter((r) => {
      return this.isProperRoomToJoin(r);
    });
  };
  _.isProperRoomToJoin = function(roomData) {
    return NetRoomDataWrapper.isRoomProperToJoin(roomData);
  };
  _.joinToRoomRequest = function(roomName) {
    ANNetwork.get(NMS.Lobby("joinToRoom", roomName), (result) => {
      return this._onJoinedToRoom(result);
    }, () => {
      console.log("Can't join to Room, server not response in time");
      return this._commandsWindow.activate();
    });
  };
  //?EVENT
  _._onJoinedToRoom = function(roomData) {
    if (roomData == null) {
      console.log("Can't join to Room, Room not exists anymore");
      this._commandsWindow.activate();
    } else {
      ANNetwork.setRoomJoin(roomData);
      SceneManager.push(Scene_NetworkRoom);
    }
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Scene_NetworkRoom;

Scene_NetworkRoom = class Scene_NetworkRoom extends Scene_MenuBase {
  constructor() {
    super();
    this._startingGameTransition = false;
  }

  create() {
    super.create();
    this.room = ANNetwork.room;
    this.createRoomTitle();
    this.createCommands();
    this.createPlayersList();
    if (ANET.PP.isActorSelectionAllowed() && !this.isLoadGame()) {
      this.createActorSelectWindow();
    }
    if (this.isLoadGame()) {
      this.prepareSaveFile();
    }
    this.refreshRoom();
  }

  start() {
    super.start();
    ANNetwork.requestRoomRefresh();
    // * Так как есть искуственная задержка загрузки сцены на MV
    if (KDCore.isMV()) {
      setTimeout((function() {
        try {
          return ANNetwork.requestRoomRefresh();
        } catch (error) {

        }
      }), 300);
    }
  }

  isBottomHelpMode() {
    return false;
  }

  isLoadGame() {
    return ANET.Utils.isLoadGameRoom();
  }

  refreshRoom() {
    this.room = ANNetwork.room;
    this._refreshRoomTitle();
    this._refreshPlayerList();
    this._refreshActorsList();
    return this._windowCommands.refresh();
  }

  //?EVENT
  // * Когда игрок выходит или входит в комнату
  netOn_lobby_refreshRoomData() {
    // * Пришли данные о комнате (и игроках), надо обновить
    return this.refreshRoom();
  }

  //?EVENT
  // * Когда игрок выбирает персонажа
  netOn_game_playersData() {
    // * Пришли данные о комнате (и игроках), надо обновить
    return this.refreshRoom();
  }

  //?EVENT
  netOn_lobby_startGame() {
    this._startingGameTransition = true;
    if (this.isLoadGame()) {
      this.loadAndStartGame();
    } else {
      this.startNewGame();
    }
  }

  //?EVENT
  // * Когда закрывается комната, вызывается это событие
  netOn_lobby_roomClosed() {
    if (!this._shouldNotPopScene) {
      // * Из этой сцены мы возвращаемся в сетевое меню (если мы не мастер)
      // * Для мастера не надо, так как сцена и так закрывается сама и получается
      // * что возврат происходит на Scene_Title
      return this.popScene();
    }
  }

  update() {
    return super.update();
  }

  //TODO: Готов клиент или нет
  //if ANNetwork.isMasterClient() and Input.isTriggered('ok')
  //    ANNetwork.send(NMS.Lobby("startGame"))
  stop() {
    super.stop();
    // * Если TRUE - значит мы переходим на сцену с игрой и не надо закрывать коммнату
    if (this._startingGameTransition === true) {
      return;
    }
    if (ANNetwork.isMasterClient()) {
      this._shouldNotPopScene = true;
      return ANNetwork.closeRoom();
    } else {
      return ANNetwork.leaveRoom();
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetworkRoom.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoom.prototype;
  _.startNewGame = function() {
    // * Сейчас нету _commandWindow, так что временно создадим его чтобы не было ошибки
    this._commandWindow = {
      close: function() {}
    };
    Scene_Title.prototype.commandNewGame.call(this);
  };
  _.loadAndStartGame = function() {
    // * Задаём флаг, что будем загружать сетевую игру
    $gameTemp._nRequestLoadNetworkGame = true;
    SceneManager.push(Scene_Load);
  };
  _.createRoomTitle = function() {
    this.createHelpWindow();
    return this._refreshRoomTitle();
  };
  _._refreshRoomTitle = function() {
    var ref, roomHostName;
    if (ANNetwork.isMasterClient()) {
      roomHostName = "\\C[1]" + ANGameManager.myPlayerData().name + " (you)";
    } else {
      if (this.room == null) {
        roomHostName = "Fetching...";
      } else {
        roomHostName = (ref = ANGameManager.getPlayerDataById(this.room.masterId)) != null ? ref.name : void 0;
      }
    }
    return this._helpWindow.setText("Room: %1, Host: %2".format(ANNetwork.room.name, roomHostName));
  };
  _._refreshPlayerList = function() {
    this._playersListWindow.refresh();
  };
  _.createCommands = function() {
    this._windowCommands = new Window_NetworkRoomCommands(new Rectangle(0, this._helpWindow.y + this._helpWindow.height, 600, 100));
    this._windowCommands.setHandler('cancel', this.popScene.bind(this));
    this._windowCommands.setHandler('leave', this.popScene.bind(this));
    this._windowCommands.setHandler('start', this._onStartRoomCommand.bind(this));
    this._windowCommands.setHandler('ready', this._onReadyInRoomCommand.bind(this));
    this._windowCommands.setHandler('character', this._onCharacterSelectCommand.bind(this));
    this.addWindow(this._windowCommands);
    this._windowCommands.activate();
  };
  _._onStartRoomCommand = function() {
    if (this._isAllInRoomReady()) { // TODO: В Wrapper, так как окно тоже проверяет
      if (ANNetwork.isMasterClient()) {
        ANNetwork.send(NMS.Lobby("startGame"));
      }
    } else {
      this._windowCommands.activate();
    }
  };
  _._onReadyInRoomCommand = function() {};
  //TODO: Ничего пока нет
  _._onCharacterSelectCommand = function() {
    this._windowActorsList.show();
    this._windowActorsList.open();
    this._windowActorsList.activate();
    return this._playersListWindow.close();
  };
  //TODO: Флаги готовности, сбрасывать при нажатии Character
  // * См. readyPlayersIds у данных комнаты
  _._isAllInRoomReady = function() {
    return true;
  };
  _.createActorSelectWindow = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 260;
    wx = 50;
    wy = 240;
    this._windowActorsList = new Window_NetworkActorsList(new Rectangle(wx, wy, ww, wh));
    this._windowActorsList.setHandler('cancel', this._onActorSelectCancel.bind(this));
    this._windowActorsList.setHandler('ok', this._onActorSelectOk.bind(this));
    this._windowActorsList.hide();
    return this.addWindow(this._windowActorsList);
  };
  _._onActorSelectCancel = function() {
    return this._cancelActorSelection();
  };
  _._cancelActorSelection = function() {
    this._windowActorsList.close();
    this._windowCommands.activate();
    return this._playersListWindow.open();
  };
  _._onActorSelectOk = function() {
    var selectedActorId;
    selectedActorId = this._windowActorsList.selectedActorId();
    if (selectedActorId <= 0) {
      SoundManager.playBuzzer();
      this._windowActorsList.activate();
    } else {
      ANPlayersManager.sendBindActorFromLobby(selectedActorId, this._onBindActorResult.bind(this));
    }
  };
  _._onBindActorResult = function(resultFlag) {
    if (resultFlag === true) {
      this._cancelActorSelection();
    } else {
      SoundManager.playBuzzer();
      this._windowActorsList.activate();
    }
    this.refreshRoom();
  };
  _._refreshActorsList = function() {
    var ref;
    return (ref = this._windowActorsList) != null ? ref.refresh() : void 0;
  };
  _.createPlayersList = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 260;
    wx = 50;
    wy = 240;
    this._playersListWindow = new Window_NetworkRoomPlayersList(new Rectangle(wx, wy, ww, wh));
    this.addWindow(this._playersListWindow);
    this._refreshPlayerList();
  };
  _.prepareSaveFile = function() {
    var info;
    info = DataManager.nGetNetworkSaveInfoWithId(this.room.uniqueSaveID);
    if (info == null) {
      HUIManager.notifyError("Save file data not found!");
      console.warn("Save file with ID " + this.room.uniqueSaveID + " not found!");
      this.popScene.bind(this);
    } else {
      //TODO: На сервере нет проверки на занятость персонажа??? НЕТУ в 112
      ANPlayersManager.sendBindActorFromLobby(info.nMyActorId, this.onBindLoadedActorResult.bind(this));
    }
  };
  _.onBindLoadedActorResult = function(resultFlag) {
    if (resultFlag === false) {
      SoundManager.playBuzzer();
      HUIManager.notifyError("Can't load Actor data or Actor already used by another player");
      this.popScene.bind(this);
    } else {
      this.refreshRoom();
    }
  };
})();

// ■ END Scene_NetworkRoom.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Сцена со списком комнат на сервере
var Scene_NetworkRoomsList;

Scene_NetworkRoomsList = class Scene_NetworkRoomsList extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    //TODO: Потом сделать чтобы сервер сам отправлял когда меняется список комнат
    // * Сейчас опасно, так как может быть уже 4 из 4, а информация не обновилась
    this._refreshRoomsListThread = new KDCore.TimedUpdate(60, this._requestRoomsListFromServer.bind(this));
    this._createRoomsList();
    this._requestRoomsListFromServer();
  }

  refreshRooms() {
    if (ANET.PP.isRoomFilterON()) {
      this.applyFilterToRooms();
    }
    return this._roomsListWindow.refreshRooms(this.roomsList);
  }

  //?VERSION
  applyFilterToRooms() {}

  update() {
    super.update();
    return this._refreshRoomsListThread.update();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoomsList.prototype;
  _._requestRoomsListFromServer = function() {
    // * В первый раз показываем Loader
    if (this.roomsList == null) {
      HUIManager.showLoader();
    }
    ANNetwork.callback(NMS.Lobby("getRoomsList"), (result) => {
      // * Если сцена была закрыта, а комнаты пришли
      if (!(SceneManager._scene instanceof Scene_NetworkRoomsList)) {
        return;
      }
      this.roomsList = result;
      if (this.roomsList == null) {
        return;
      }
      this.refreshRooms();
      return HUIManager.hideLoader();
    });
    this.refreshRooms();
  };
  _._createRoomsList = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 140;
    wx = 50;
    wy = 70;
    this._roomsListWindow = new Window_NetworkRoomsList(new Rectangle(wx, wy, ww, wh));
    this._roomsListWindow.setHandler('cancel', this.popScene.bind(this));
    this._roomsListWindow.setHandler('ok', this._onJoinRoomCommand.bind(this));
    this._roomsListWindow.activate();
    return this.addWindow(this._roomsListWindow);
  };
  _._onJoinRoomCommand = function() {
    var roomData;
    roomData = this._roomsListWindow.getSelectedRoom();
    if (NetRoomDataWrapper.isRoomProperToJoin(roomData)) {
      ANNetwork.get(NMS.Lobby("joinToRoom", roomData.name), (result) => {
        return this._onJoinedToRoom(result);
      }, () => {
        console.log("Can't join to Room, server not response in time");
        return this._roomsListWindow.activate();
      });
    } else {
      SoundManager.playBuzzer();
      this._roomsListWindow.activate();
    }
  };
  
  //?EVENT
  _._onJoinedToRoom = function(roomData) {
    if (roomData == null) {
      console.log("Can't join to Room, Room not exists anymore");
      this._roomsListWindow.activate();
    } else {
      ANNetwork.setRoomJoin(roomData);
      SceneManager.push(Scene_NetworkRoom);
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

//TODO: События на обработку: список комнат обновлися, успешное подключение, плохое подключение

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkRoomTypeSelect.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Сцена выбора "Новая игра" или "Загрузить" после выбора "Создать комнату"

//TODO: Если опция по возможности сохранения отключена, надо сразу перепрыгивать эту сцену
var Scene_NetworkRoomTypeSelect;

Scene_NetworkRoomTypeSelect = class Scene_NetworkRoomTypeSelect extends Scene_MenuBase {
  constructor() {
    super();
  }

  //TODO: Заголовок какой-нибудь ???
  create() {
    super.create();
    // * Если параметр выключен (сохранять и загружать нельзя), то пропуск данной сцены
    if (!ANET.PP.isSaveLoadAllowed()) {
      // * Если мы входим в сцену, то пропуск сразу в комнату
      if ($gameTemp._nIsForwardTransitionToRoomTypeMenu === true) {
        $gameTemp._nIsForwardTransitionToRoomTypeMenu = null;
        this.commandNewGame();
      } else {
        this.popScene(); // * Выход, не нужны компоненты сцены
      }
      return;
    }
    this._initSceneComponents();
  }

};

(function() {  // ■ END Scene_NetworkRoomTypeSelect.coffee
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoomTypeSelect.prototype;
  _._initSceneComponents = function() {
    this._createRoomTypeSelectMenu();
    return this._createGamesToLoadList();
  };
  _._createRoomTypeSelectMenu = function() {
    var rect, wh, ww, wx, wy;
    ww = 400;
    if (KDCore.isMV()) {
      wh = this.calcWindowHeight(2, true);
    } else {
      // * Хоть команды 2, используется 4, чтобы сразу под курсором была команда
      wh = this.calcWindowHeight(4, true);
    }
    wx = (Graphics.boxWidth - ww) / 2;
    wy = (Graphics.boxHeight - wh) / 2;
    rect = new Rectangle(wx, wy, ww, wh);
    this._commandsWindow = new Window_NetworkRoomTypeMenu(rect);
    this._commandsWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandsWindow.setHandler('newGame', this.commandNewGame.bind(this));
    this._commandsWindow.setHandler('continue', this.commandContinue.bind(this));
    return this.addWindow(this._commandsWindow);
  };
  _.commandNewGame = function() {
    this._createNewRoom(null); // * новая игра
  };
  _.commandContinue = function() {
    this._commandsWindow.hide();
    this._listWindow.show();
    this._listWindow.activate();
  };
  _._createNewRoom = function(uniqueSaveId) {
    var newRoomData, roomName;
    // * Используем название команаты с предыдущей сцены
    roomName = $gameTemp._nLastRoomName;
    if (!String.any(roomName)) {
      roomName = "Room_" + Math.randomInt(1000);
    }
    $gameTemp._nLastRoomName = null; // * очищаем
    
    // * Собираем данные об новой комнате
    newRoomData = {
      name: roomName,
      gameInfo: ANNetwork.getNetworkGameInfoData(),
      uniqueSaveID: uniqueSaveId
    };
    // * Отправляем данные об текущей игре (клиенте)
    ANNetwork.get(NMS.Lobby("createRoom", newRoomData), (result) => {
      return this._onRoomCreated(result);
    }, () => {
      console.log("Can't create Room, server not response in time");
      return this._commandsWindow.activate();
    });
  };
  //?EVENT
  _._onRoomCreated = function(roomData) {
    if (roomData != null) {
      ANNetwork.setRoomMaster(roomData);
      SceneManager.push(Scene_NetworkRoom);
    } else {
      HUIManager.notifyError("Can't create room with name: " + this._lastRoomName);
      this._commandsWindow.activate();
    }
  };
  _._createGamesToLoadList = function() {
    var rect, wh, ww, wx, wy;
    ww = Graphics.boxWidth - 100;
    if (KDCore.isMZ()) {
      wh = this.mainAreaHeight();
    } else {
      wh = Graphics.height - 20;
    }
    wx = (Graphics.boxWidth - ww) / 2;
    wy = (Graphics.boxHeight - wh) / 2;
    rect = new Rectangle(wx, wy, ww, wh);
    this._listWindow = new Window_SavefileList(rect);
    this._listWindow.setHandler("ok", this.onLoadFileSelected.bind(this));
    this._listWindow.setHandler("cancel", this.onLoadFileSelectCancel.bind(this));
    this._listWindow.setMode("loadNet", false);
    if (KDCore.isMZ()) {
      this._listWindow.selectSavefile(0);
    } else {
      this._listWindow.select(0);
    }
    this._listWindow.refresh();
    this._listWindow.hide();
    this.addWindow(this._listWindow);
  };
  _.onLoadFileSelected = function() {
    var info, savefileId;
    if (KDCore.isMZ()) {
      savefileId = this._listWindow.savefileId();
    } else {
      savefileId = this._listWindow.index() + 1;
    }
    if (DataManager.nIsNetworkSaveFile(savefileId)) {
      info = DataManager.nGetInfoForSavefileId(savefileId);
      this._createNewRoom(info.nUniqueSaveID);
    } else {
      SoundManager.playBuzzer();
      this._listWindow.activate();
    }
  };
  _.onLoadFileSelectCancel = function() {
    this._listWindow.hide();
    this._commandsWindow.show();
    this._commandsWindow.activate();
  };
})();

// Generated by CoffeeScript 2.5.1
// * Сцена настроек для сетевой игры

//TODO: Пока что просто ввод имени игрока
var Scene_NetworkSettings;

Scene_NetworkSettings = class Scene_NetworkSettings extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    return this._showNameInput();
  }

  stop() {
    this._savePlayerName();
    this._hideNameInput();
    return super.stop();
  }

  update() {
    super.update();
    if (Input.isCancel() || Input.isTriggered('ok')) {
      return this.popScene();
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetworkSettings.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkSettings.prototype;
  _._showNameInput = function() {
    HUIManager.showInput("Enter your name for network...");
    HUIManager.setInputValue(ANGameManager.myPlayerData().name);
  };
  _._savePlayerName = function() {
    var newName;
    newName = HUIManager.getInputValue();
    if (String.any(newName)) {
      ANGameManager.myPlayerData().name = newName;
      // * Отправим на сервер
      ANPlayersManager.sendPlayerName();
      ConfigManager.netPlayerName = newName;
      ConfigManager.save();
    }
  };
  _._hideNameInput = function() {
    return HUIManager.removeInput();
  };
})();

// ■ END Scene_NetworkSettings.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Save.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onSavefileOk, ALIAS__stop, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Save.prototype;
  //TODO: В MV по другому скорее всего, не помню этот метод

  // * В MV нету метода executeSave, создадим его для совместимости
  if (KDCore.isMV()) {
    //?[NEW, from MZ]
    _.executeSave = function(savefileId) {
      $gameSystem.onBeforeSave();
      if (DataManager.saveGame(savefileId)) {
        this.onSaveSuccess();
      } else {
        this.onSaveFailure();
      }
    };
    // * Переопределим стандартный метод (только в МВ)
    // * Теперь в сетевом режиме он будет использовать новый метод executeSave
    //@[ALIAS]
    ALIAS__onSavefileOk = _.onSavefileOk;
    _.onSavefileOk = function() {
      if (ANNetwork.isConnected()) {
        Scene_File.prototype.onSavefileOk.call(this);
        this.executeSave(this.savefileId());
      } else {
        ALIAS__onSavefileOk.call(this);
      }
    };
  }
  //@[ALIAS, STORED]
  _.nALIAS__executeSave_43243 = _.executeSave;
  _.executeSave = function(savefileId) {
    if (ANNetwork.isConnected()) {
      if (ANET.PP.isSaveOnlyInMenu()) {
        //TODO:
        //@nRequestClientsStatesForSave(savefileId)
        this.nExecuteNetworkSave(savefileId);
      } else {
        this.nExecuteNetworkSave(savefileId);
      }
    } else {
      _.nALIAS__executeSave_43243.call(this, savefileId);
    }
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (!ANNetwork.isConnected()) {
      return;
    }
    if (this.nSaveDataPool == null) {
      return;
    }
    this.nUpdateSavePool();
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    this.nClearTempSaveData();
  };
})();

// ■ END Scene_Save.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Save.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Save.prototype;
  _.nUpdateSavePool = function() {
    var ref;
    return (ref = this.nSaveDataPool) != null ? ref.update() : void 0;
  };
  _.nCreateTempSaveData = function() {
    // * Делаем глобальную переменную чтобы DataManager мог перехватить данные
    $gameTemp.nSaveData = this.nSaveDataPool;
    // * Чтобы у всех был одинаковый, нужно при опредлении какой файл загружать
    $gameTemp.nUniqueSaveID = ANET.Utils.generateSaveUniqueId();
  };
  _.nClearTempSaveData = function() {
    $gameTemp.nSaveData = null;
    return $gameTemp.nUniqueSaveID = null;
  };
  // * Запросить проверку статуса других игроков
  // * чтобы они не были "заняты" (например битва или событие)
  // * сейчас используется проверка, что все должны быть в меню
  _.nRequestClientsStatesForSave = function(savefileId) {};
  //TODO: пропустим пока что

  // * Отправить всем команду что нужны данные для сохранения
  _.nExecuteNetworkSave = function(savefileId) {
    // * Создаём пул данных сохранений для каждого игрока
    this.nSaveDataPool = new PlayersDataPool(function() {
      return ANGameManager.anotherPlayers();
    });
    // * Задаём сразу свои данные
    this.nSaveDataPool.setMyData(DataManager.makeSaveContents());
    // * Задаём методы callbacks
    this.nSaveDataPool.onFail(() => {
      return this.nOnWaitSaveDataDone(-1); // * fail
    });
    this.nSaveDataPool.onReady(() => {
      return this.nOnWaitSaveDataDone(savefileId);
    });
    this.nCreateTempSaveData();
    // * Посылаем запрос на сервер ($gameTemp.nUniqueSaveID должен быть уже создан)
    this.nSaveDataPool.register(function() {
      return ANGameManager.sendSaveDataRequest(savefileId);
    });
    this.nOnWaitSaveDataStart();
  };
  _.nOnWaitSaveDataStart = function() {
    return HUIManager.showLoader(600);
  };
  _.nOnWaitSaveDataDone = function(savefileId) {
    HUIManager.hideLoader();
    "SAVE DATA RECEIVED".p(savefileId);
    if (savefileId >= 0) {
      // * Вызываем стандартный метод
      _.nALIAS__executeSave_43243.call(this, savefileId);
    } else {
      this.onSaveFailure();
    }
  };
})();

// ■ END Scene_Save.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Skill.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, _;
  //@[DEFINES]
  _ = Scene_Skill.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме нельзя переключать персонажей
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
})();

// ■ END Scene_Skill.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Status.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, _;
  //@[DEFINES]
  _ = Scene_Status.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме зависит от параметра
    if (ANNetwork.isConnected()) {
      return ANET.PP.isOtherPlayersMenuStatusAllowed();
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
})();

// ■ END Scene_Status.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Title.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Title.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    ALIAS__start.call(this);
    if (ANNetwork.isConnected()) {
      ANNetwork.stop();
    }
    if (ANET.isDEV()) {
      return "Precc C for fast connect".p();
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (ANET.isDEV()) {
      //TODO: Добавить потом параметр плагина, чтобы люди могли тестить быстро
      return this.nUpdateDebugStart();
    }
  };
  (function() {    // * Добавляем команду сетевой игры в главное меню
    var ALIAS__calcWindowHeight, ALIAS__commandWindowRect, ALIAS__createCommandWindow;
    
    //@[ALIAS]
    ALIAS__createCommandWindow = _.createCommandWindow;
    _.createCommandWindow = function() {
      ALIAS__createCommandWindow.call(this);
      return this._commandWindow.setHandler("network", this.commandNetwork.bind(this));
    };
    //@[ALIAS]
    ALIAS__commandWindowRect = _.commandWindowRect;
    _.commandWindowRect = function() {
      // * little trick to not overwrite method
      this.___isOneMoreCommand = !Imported.VisuMZ_0_CoreEngine;
      return ALIAS__commandWindowRect.call(this);
    };
    //@[ALIAS]
    ALIAS__calcWindowHeight = _.calcWindowHeight;
    _.calcWindowHeight = function(numLines, selectable) {
      if (this.___isOneMoreCommand === true) {
        numLines += 1;
        if (!ANET.PP.isSinglePlayerAllowed()) {
          // * Если одиночная игра не доступна, то нет одной позиции в меню (Новая ира)
          numLines -= 1;
        }
      }
      return ALIAS__calcWindowHeight.call(this, numLines, selectable);
    };
  })();
})();

// ■ END Scene_Title.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Title.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Title.prototype;
  (function() {    // DEV FAST GAME START
    // --------------------------------------------------------
    // * Метод только для отладки (быстрый старт на кнопку C)
    _.nUpdateDebugStart = function() {
      if (Input.isTriggered('c')) {
        this.nFastConnectToDevRoom();
      }
      if ($gameTemp._isDevNetGameWaitPlayers === true) {
        if (ANGameManager.playersData.length > 1) {
          return this.nFastGameStart();
        }
      }
    };
    //?EVENT
    _.netOn_lobby_startGame = function() {
      if ($gameTemp._isDevNetGameStart !== true) {
        return;
      }
      Scene_Title.prototype.commandNewGame.call(this);
    };
    _.nFastConnectToDevRoom = function() {
      if (ANET.PP.isActorSelectionAllowed()) {
        console.warn("Can't connect in Dev room in Actor Select mode");
        return;
      }
      ANNetwork.initSystem();
      return ANNetwork.setConnection(function(status) {
        if (status === 1) {
          HUIManager.notifySucess("Connected to server");
          ANGameManager.init();
          return ANNetwork.get(NMS.Lobby("createRoom", {
            name: "dev",
            gameInfo: ANNetwork.getNetworkGameInfoData()
          }), function(roomData) {
            if (roomData != null) {
              ANNetwork.setRoomMaster(roomData);
              return $gameTemp._isDevNetGameWaitPlayers = true;
            } else {
              return ANNetwork.get(NMS.Lobby("joinToRoom", "dev"), function(roomData) {
                $gameTemp._isDevNetGameStart = true;
                return ANNetwork.setRoomJoin(roomData);
              }, function() {
                return console.log("Can't join to Room, server not response in time");
              });
            }
          }, function() {
            return console.log("Can't create Room, server not response in time");
          });
        } else {
          return HUIManager.notifyError("Server not response in time");
        }
      });
    };
    _.nFastGameStart = function() {
      if (ANNetwork.isMasterClient()) {
        $gameTemp._isDevNetGameStart = true;
        return ANNetwork.send(NMS.Lobby("startGame"));
      }
    };
  })();
  //?EVENT
  // * Когда соединение прервано, вызывается это событие
  _.onLostConnection = function() {}; // * NOTHING
  _.commandNetwork = function() {
    this._commandWindow.close();
    return SceneManager.push(Scene_NetworkGameMenu);
  };
})();

// ■ END Scene_Title.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SceneManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__changeScene, _;
  //@[DEFINES]
  _ = SceneManager;
  //@[ALIAS]
  ALIAS__changeScene = _.changeScene;
  _.changeScene = function() {
    if (ANNetwork.isConnected() && this.isSceneChanging()) {
      if (typeof HUIManager !== "undefined" && HUIManager !== null) {
        HUIManager.onGameSceneChanged();
      }
    }
    ALIAS__changeScene.call(this);
  };
})();

// ■ END SceneManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SceneManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = SceneManager;
  //? ONLY FOR MV
  _.isSceneReadyForNetwork = function() {
    return true;
  };
  // * Сцена занята для событий из сети (scene events) (общий метод для MV и MZ)
  _.isBusyForNetworkData = function() {
    return SceneManager.isSceneChanging() || !SceneManager.isSceneReadyForNetwork();
  };
})();

// ■ END SceneManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Элементы интерфейса ANET Z на карте

// * Интерфейс AABS на карте
(function() {
  var Spriteset_UI;
  Spriteset_UI = class Spriteset_UI extends Sprite {
    constructor() {
      super();
      this._init();
      return;
    }

    isActive() {
      return this.visible === true;
    }

    show() {
      return this.visible = true;
    }

    hide() {
      return this.visible = false;
    }

    terminate() {
      this.visible = false;
    }

    // * Обновить все контроллеры и элементы
    refresh() {}

    onGameMessageStart() {}

    onGameMessageEnd() {}

  };
  ANET.link(Spriteset_UI);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.Spriteset_UI.prototype;
  _._init = function() {
    // * Регестрирует себя в менеджере
    ANET.UI.setUI(this);
    // * Набор всех элементов
    this.elements = [];
    // * Набор всех контроллеров
    this.controllers = [];
    return this._create();
  };
  _._create = function() {
    this._createNormalUILayer();
    return this._createElements();
  };
  _._createNormalUILayer = function() {
    this.layer = new Sprite();
    return this.addChild(this.layer);
  };
  _._createElements = function() {
    if (ANET.PP.isGameChatAllowed()) {
      return this._createInGameChat();
    }
  };
  // * Создаём окно чата
  _._createInGameChat = function() {
    //TODO: from parameters
    this.chatWindow = new FWindow_InGameChat(this, 312, 192);
    this._addElementToUI(this.chatWindow);
  };
  // * Добавить элемент на обычный слой
  _._addElementToUI = function(sprite) {
    return this.layer.addChild(sprite);
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__retreat, _;
  //@[DEFINES]
  _ = Sprite_Actor.prototype;
  //TEMP
  //TODO: Временное врешение, работает только на мастере
  //@[ALIAS]
  ALIAS__retreat = _.retreat;
  _.retreat = function() {
    if (ANNetwork.isConnected()) {
      if ($gameParty.leader() === this._battler) {
        return this.startMove(300, 0, 30);
      } else {

      }
    } else {
      // * Другой персонаж не убегает
      return ALIAS__retreat.call(this);
    }
  };
})();

// ■ END Sprite_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setCharacter, ALIAS__updateOther, _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //@[ALIAS]
  ALIAS__updateOther = _.updateOther;
  _.updateOther = function() {
    ALIAS__updateOther.call(this);
    return this._updateNetworkCharacter();
  };
  
  //@[ALIAS]
  ALIAS__setCharacter = _.setCharacter;
  _.setCharacter = function(character) {
    ALIAS__setCharacter.call(this, character);
    this._isNetworkCharacter = ANNetwork.isConnected() && character instanceof NETCharacter;
    // * Смена методов
    if (this._isNetworkCharacter === true) {
      this._updateNetworkCharacter = this._updateNetworkCharacterMain;
    }
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //?DYNAMIC
  _._updateNetworkCharacter = function() {}; // * DUMMY
  _._updateNetworkCharacterMain = function() {
    return this._updateNetworkStateIcon();
  };
  _._updateNetworkStateIcon = function() {
    if (this.netStateIcon == null) {
      this._createNetworkStateIcon();
    } else {
      this.netStateIcon.x = this.x;
      this.netStateIcon.y = this.y - this.height;
    }
  };
  _._createNetworkStateIcon = function() {
    var e, ref;
    this.netStateIcon = new ANET.Sprite_PlayerNetworkStatus(this);
    this.netStateIcon.setupNETCharacter(this._character);
    try {
      // * Не лучший способ
      if ((ref = SceneManager._scene._spriteset) != null) {
        ref.addNetworkStatusIconForCharacter(this.netStateIcon);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Сообщение в чате
(function() {
  var Sprite_NetChatTextLine;
  Sprite_NetChatTextLine = class Sprite_NetChatTextLine extends KDCore.Sprite {
    constructor() {
      super();
      this.params = this.getSettings();
      this._needAnimation = false;
      this._create();
      return;
    }

    //TODO: From plugin parameters!!!
    getSettings() {
      return this.defaultSettings();
    }

    defaultSettings() {
      return {
        size: {
          w: 306,
          h: 18
        },
        backgroundA: {
          color: "#59a3d9".toCss(),
          opacity: 40
        },
        backgroundB: {
          color: "#59a3d9".toCss(),
          opacity: 70
        },
        textLine: {
          visible: true,
          size: {
            w: 520,
            h: 20
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 4,
            y: -3
          }
        },
        // 1 - Channel
        // 2 - Actor Name
        // 4 - Player Name
        // 3 - Message
        textFormat: "\\}\\}\\C[3][%1] \\{\\{\\C[2]%2 \\C[0]%3",
        textFormatForPlayer: "\\}\\}\\C[3][%1]\\C[1][ME]\\{\\{ \\C[0]%3",
        textFormatForSystem: "\\}\\}\\C[3][%1]\\{\\{ \\C[6]%3",
        animationSpeedInPx: 18
      };
    }

    // * Применить стиль задника А (по умолчанию)
    applyBackgroundStyleA() {
      return this._applyBackgroundStyle(this.params.backgroundA);
    }

    // * Применить стиль задника Б (чтобы легче было видно, каждый чётный)
    applyBackgroundStyleB() {
      return this._applyBackgroundStyle(this.params.backgroundB);
    }

    // * Написать сообщение
    drawChatMessage(channelId, actorId, text) {
      var actorName, channelIdText, playerName, textFormat;
      if (this._textSpr == null) {
        return;
      }
      if (this.isMyActorMessage(actorId)) {
        textFormat = this.params.textFormatForPlayer;
      } else {
        if (actorId <= 0) {
          textFormat = this.params.textFormatForSystem;
        } else {
          textFormat = this.params.textFormat;
        }
      }
      channelIdText = this._convertChannelIdToText(channelId); //1
      actorName = this._getActorName(actorId); //2
      playerName = this._getPlayerName(actorId); //4
      this._textSpr.drawTextWithFormat(textFormat, channelIdText, actorName, text, playerName);
    }

    // * Сообщение от меня (текущего клиента), имеет отдельный формат
    isMyActorMessage(actorId) {
      if (ANNetwork.isConnected()) {
        return ANGameManager.myActorId() === actorId;
      } else {
        return false;
      }
    }

    // * Сдвинуть эту строчку выше
    moveUp() {
      this.y -= this.params.size.h;
    }

    // * Анимированное появление сообщения (справа "едет")
    animate() {
      this._textSpr.x = -this.params.textLine.size.w;
      this._needAnimation = true;
    }

    update() {
      super.update();
      this._updateAnimation();
    }

  };
  ANET.link(Sprite_NetChatTextLine);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.Sprite_NetChatTextLine.prototype;
  _._applyBackgroundStyle = function(params) {
    if (this._background == null) {
      return;
    }
    this._background.fillAll(params.color);
    this._background.opacity = params.opacity;
  };
  _._create = function() {
    this._createBackground();
    this._createTextLine();
  };
  _._createBackground = function() {
    this._background = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
    this.applyBackgroundStyleA();
    return this.add(this._background);
  };
  _._createTextLine = function() {
    this._textSpr = new AA.Sprite_UITextExt(this.params.textLine);
    return this.add(this._textSpr);
  };
  _._updateAnimation = function() {
    if (this._needAnimation === false) {
      return;
    }
    if (this.params.animationSpeedInPx === 0) {
      this._textSpr.x = 0; // * Сразу, без анимации
    } else {
      this._textSpr.x += this.params.animationSpeedInPx;
    }
    if (this._textSpr.x > 0) { // * Граница
      this._textSpr.x = 0;
    }
    this._needAnimation = this._textSpr.x !== 0;
  };
  _._convertChannelIdToText = function(channelId) {
    if (channelId <= 0) {
      return "ALL";
    }
    return "MAP";
  };
  _._getActorName = function(actorId) {
    var ref;
    if (actorId <= 0) {
      return "";
    }
    return (ref = $dataActors[actorId]) != null ? ref.name : void 0;
  };
  _._getPlayerName = function(actorId) {
    var ref;
    if (actorId <= 0) {
      return "";
    }
    if (ANNetwork.isConnected()) {
      return (ref = ANGameManager.getPlayerDataByActorId(actorId)) != null ? ref.name : void 0;
    } else {
      return this._getActorName(actorId);
    }
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_PlayerNetworkStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_PlayerNetworkStatus;
  Sprite_PlayerNetworkStatus = class Sprite_PlayerNetworkStatus extends Sprite_Balloon {
    constructor() {
      super();
      this.visible = false;
      return;
    }

    setupNETCharacter(_character) {
      this._character = _character;
      return this._checkStateThread = new KDCore.TimedUpdate(10, this._updateStateCheck.bind(this));
    }

    loadBitmap() {
      this.bitmap = ImageManager.loadAA("PlayerStateIcons");
      return this.setFrame(0, 0, 0, 0);
    }

    setup(iconId) {
      if (iconId == null) {
        if (this.visible === true) {
          this.reset();
        }
      } else {
        if (this._balloonId === iconId) {
          return;
        }
        this._balloonId = iconId;
        this.visible = true;
        this.restart();
      }
    }

    restart() {
      return this._duration = 5 * this.speed() + this.waitTime();
    }

    reset() {
      this._duration = 0;
      this._balloonId = -1;
      return this.visible = false;
    }

    // * Не используется, так как прикрепляется к персонажу
    updatePosition() {} // * EMPTY

    update() {
      super.update();
      this._checkStateThread.update();
      // * Начинается снова
      if (this._balloonId >= 0 && this._duration <= 0) {
        this._firstStep = true;
        return this.restart();
      }
    }

    frameIndex() {
      var frameIndex, index;
      index = (this._duration - this.waitTime()) / this.speed();
      frameIndex = 4 - Math.max(Math.floor(index), 0);
      if (this._firstStep == null) {
        return frameIndex;
      } else {
        if (frameIndex === 0) {
          return 1;
        } else {
          return frameIndex;
        }
      }
    }

    // * PRIVATE =====================================================
    _updateStateCheck() {
      if (this._character == null) {
        return;
      }
      this.setup(this._character.networkStateIcon);
    }

  };
  ANET.link(Sprite_PlayerNetworkStatus);
})();

// ■ END Sprite_PlayerNetworkStatus.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Battle.prototype;
  // * Началась битва
  // * Проверим и спрячем "dead" врагов (если мы присоединились)
  _.nRefreshNetBattle = function() {
    var e, i, len, ref, ref1, s;
    try {
      // * Если мы мастер, то не надо, значит мы НЕ присоединились
      if (ANBattleManager.isBattleMaster()) {
        return;
      }
      ref = this._enemySprites;
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s == null) {
          continue;
        }
        if (!((ref1 = s._enemy) != null ? ref1.isAlive() : void 0)) {
          s.hide();
        }
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Spriteset_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createCharacters, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createCharacters = _.createCharacters;
  _.createCharacters = function() {
    ALIAS__createCharacters.call(this);
    if (ANNetwork.isConnected()) {
      this._createNetworkCharacters();
      this._createNetworkCharactersInfo();
    }
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  _._createNetworkCharacters = function() {
    // * Отдельный массив для удобства
    this._networkCharacterSprites = [];
    this.refreshNetworkCharacters();
  };
  _.refreshNetworkCharacters = function() {
    var char, i, j, len, len1, ref, ref1, spr;
    ref = this._networkCharacterSprites;
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      this._removeNetCharInfo(char);
      this._characterSprites.delete(char);
      this._tilemap.removeChild(char);
    }
    this._networkCharacterSprites = [];
    ref1 = $gameMap.netChars();
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      char = ref1[j];
      spr = new Sprite_Character(char);
      this._characterSprites.push(spr);
      this._networkCharacterSprites.push(spr);
      this._tilemap.addChild(spr);
    }
  };
  
  // * Специальный слой для иконок статусов и имён сетевых персонажей
  _._createNetworkCharactersInfo = function() {
    this._networkCharactersInfoSprites = [];
    this._networkCharactersInfoLayer = new Sprite();
    this._networkCharactersInfoLayer.z = 9;
    this._tilemap.addChild(this._networkCharactersInfoLayer);
  };
  // * Добавить иконку статуса для персонажа
  _.addNetworkStatusIconForCharacter = function(iconSpr) {
    this._destroyNetStatusIconDuplicate(iconSpr);
    this._networkCharactersInfoSprites.push(iconSpr);
    this._networkCharactersInfoLayer.addChild(iconSpr);
  };
  
  // * Надо найти и удалить, если икона уже существует для персонажа
  // * при refreshNetworkCharacters, их иконки не удаляются с ними
  // * так как находятся на другом слое
  _._destroyNetStatusIconDuplicate = function(iconSpr) {
    var i, len, ref, spr;
    if (iconSpr == null) {
      return;
    }
    ref = this._networkCharactersInfoSprites;
    //TODO: Возможно после создания таблиц имён надо разлелить метод
    // так как сейчас удаляется любой спрайт из массива с соответсвием персонажа
    for (i = 0, len = ref.length; i < len; i++) {
      spr = ref[i];
      if (spr == null) {
        continue;
      }
      if (spr._character === iconSpr._character) {
        this._networkCharactersInfoLayer.removeChild(spr);
        this._networkCharactersInfoSprites.delete(spr);
      }
    }
  };
  // * Удаляет все связанные с персонажем спрайты информации (статус, имя)
  _._removeNetCharInfo = function(char) {
    if (char == null) {
      return;
    }
    return this._destroyNetStatusIconDuplicate(char.netStateIcon);
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  // * Совместимость с MZ

  //@[DEFINES]
  _ = Window_Base.prototype;
  if (!KDCore.isMV()) {
    return;
  }
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function(x, y, width, height) {
    if (x instanceof Rectangle) {
      ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
    } else {
      ALIAS__initialize.call(this, x, y, width, height);
    }
  };
})();

// ■ END Window_Base.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleLog.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addText, ALIAS__clear, _;
  //@[DEFINES]
  _ = Window_BattleLog.prototype;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    if (this.isNeedSendLogToServer()) {
      return ANBattleManager.sendWindowLogMessage("clear", null);
    }
  };
  //@[ALIAS]
  ALIAS__addText = _.addText;
  _.addText = function(text) {
    ALIAS__addText.call(this, text);
    if (this.isNeedSendLogToServer()) {
      ANBattleManager.sendWindowLogMessage("add", text);
    }
  };
})();

// ■ END Window_BattleLog.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleLog.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__showNormalAnimation, _;
  //@[DEFINES]
  _ = Window_BattleLog.prototype;
  //@[ALIAS]
  ALIAS__showNormalAnimation = _.showNormalAnimation;
  _.showNormalAnimation = function(targets, animationId, mirror) {
    ALIAS__showNormalAnimation.call(this, targets, animationId, mirror);
    if (this.isNeedSendLogToServer() && KDCore.isMV()) {
      ANBattleManager.sendWindowLogAnimation(targets, animationId, mirror);
    }
  };
})();

// ■ END Window_BattleLog.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleLog.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_BattleLog.prototype;
  _.isNeedSendLogToServer = function() {
    return ANNetwork.isConnected() && ANGameManager.isBattleMaster() && !$gameParty.isOneBattler();
  };
})();

// ■ END Window_BattleLog.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__update, _;
  //@[DEFINES]
  _ = Window_BattleStatus.prototype;
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if ($gameTemp.isBattleRefreshRequested()) {
      this.refresh();
      $gameTemp.clearBattleRefreshRequest();
    }
  };
})();

// ■ END Window_BattleStatus.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCancelEnabled, ALIAS__isCursorMovable, ALIAS__isOkEnabled, ALIAS__processCancel, ALIAS__processOk, ALIAS__select, ALIAS__start, ALIAS__update, _;
  //TODO: ПРОВЕРИТЬ НА MV

  //@[DEFINES]
  _ = Window_ChoiceList.prototype;
  //@[ALIAS]
  ALIAS__isCursorMovable = _.isCursorMovable;
  _.isCursorMovable = function() {
    if (this.nIsNetworkSelection()) {
      return ANInterpreterManager.isSharedEventMaster();
    } else {
      return ALIAS__isCursorMovable.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__isOkEnabled = _.isOkEnabled;
  _.isOkEnabled = function() {
    if (this.nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()) {
      return false;
    }
    return ALIAS__isOkEnabled.call(this);
  };
  //@[ALIAS]
  ALIAS__isCancelEnabled = _.isCancelEnabled;
  _.isCancelEnabled = function() {
    if (this.nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()) {
      return false;
    }
    return ALIAS__isCancelEnabled.call(this);
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.nIsNetworkSelection()) {
      this.nUpdateNetworkSelection();
    }
  };
  // * Можно это тоже, но не обязательно, и так выбор не может сделать второй игрок
  //@[ALIAS]
  //ALIAS__processHandling = _.processHandling
  //_.processHandling = ->
  //    return if @nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()
  //    return ALIAS__processHandling.call(@)

  //@[ALIAS]
  //ALIAS__processTouch = _.processTouch
  //_.processTouch = ->
  //    return if @nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()
  //    return ALIAS__processTouch.call(@)

  //@[ALIAS]
  ALIAS__select = _.select;
  _.select = function(index) {
    if (this.nIsNetworkSelection()) {
      // * Если мастер, то выбор проходит и отправляем всем выбор
      if (ANInterpreterManager.isSharedEventMaster()) {
        ALIAS__select.call(this, index);
        return this.nSendNetworkSelection(index);
      } else {
        // * Если не мастер, но выбор пришёл с сервера (т.е. есть флаг), то ставим выбор
        if (this.nIsSelectFromNetworkMaster === true) {
          this.nIsSelectFromNetworkMaster = false;
          return ALIAS__select.call(this, index);
        } else {

        }
      }
    } else {
      // * NOTHING
      // * Клиент сам не может менять выбор
      return ALIAS__select.call(this, index);
    }
  };
  
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this, ...arguments);
    if (ANNetwork.isConnected()) {
      this.nSetNetworkSelectMode(false);
    }
  };
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    if (ANNetwork.isConnected()) {
      this.nPrepareNetworkSelection();
    }
    ALIAS__start.call(this);
  };
  
  //@[ALIAS]
  ALIAS__processOk = _.processOk;
  _.processOk = function() {
    ALIAS__processOk.call(this);
    if (this.nIsNetworkSelection() && this.isCurrentItemEnabled()) {
      this.nSendNetworkSelectionAciton('ok');
    }
  };
  //@[ALIAS]
  ALIAS__processCancel = _.processCancel;
  _.processCancel = function() {
    ALIAS__processCancel.call(this);
    if (this.nIsNetworkSelection() && this.isCurrentItemEnabled()) {
      this.nSendNetworkSelectionAciton('cancel');
    }
  };
})();

// ■ END Window_ChoiceList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_ChoiceList.prototype;
  (function() {    // * Выбор (только одного игрока) в общем событии
    // -----------------------------------------------------------------------
    // * Подготовка окна к выбору по сети
    _.nPrepareNetworkSelection = function() {
      // * Обнуляем действие из сети
      $gameTemp.nSelectionActionFromNetwork = null;
      this.nSetNetworkSelectMode($gameTemp.nRequireChoiceOnlyForMaster);
      // * Сбрасываем флаг (чтобы не повторился на следующем выборе)
      $gameTemp.nRequireChoiceOnlyForMaster = false;
      // * При открытии окна, первый выбор Default всегда проходит (не запрещён) на клиенте
      // * Поэтому ставим разрешающий флаг (якобы от сервера первый выбор)
      this.nIsSelectFromNetworkMaster = true;
      // * Очищаем последний отправленный индекс
      this.__nLastSentIndex = null;
    };
    _.nSetNetworkSelectMode = function(_networkSelectMode) {
      this._networkSelectMode = _networkSelectMode;
    };
    _.nIsNetworkSelection = function() {
      return this._networkSelectMode === true && ANNetwork.isConnected();
    };
    // * Отправить на сервер индекс выбора
    _.nSendNetworkSelection = function(index) {
      // * Чтобы не спамить
      if (this.__nLastSentIndex === index) {
        return;
      }
      this.__nLastSentIndex = index;
      ANInterpreterManager.sendChoiceSelection(index, null);
    };
    // * Отправить на сервер действие (ОК, отмена)
    _.nSendNetworkSelectionAciton = function(action) {
      ANInterpreterManager.sendChoiceSelection(this.index(), action);
    };
    // * Ожидание действие от сервера (не мастер)
    return _.nUpdateNetworkSelection = function() {
      var action, index;
      if ($gameTemp.nSelectionActionFromNetwork == null) {
        return;
      }
      if (ANInterpreterManager.isSharedEventMaster()) {
        return;
      }
      ({action, index} = $gameTemp.nSelectionActionFromNetwork);
      this.nIsSelectFromNetworkMaster = true;
      if (index != null) {
        // * Всегда ставим выбор аналогичный масетеру (пришёл от сервера который), затем уже действия
        this.select(index);
      }
      switch (action) {
        case 'ok':
          this.processOk();
          break;
        case 'cancel':
          this.processCancel(); // select
          break;
      }
      // * Ничего, выбор всегда идёт
      // * Флаг обработан, очищаем
      $gameTemp.nSelectionActionFromNetwork = null;
    };
  })();
})();

// ■ END Window_ChoiceList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isFormationEnabled, ALIAS__isSaveEnabled, _;
  //@[DEFINES]
  _ = Window_MenuCommand.prototype;
  // * Команда Formation запрещена в сетевой игре всегда
  //@[ALIAS]
  ALIAS__isFormationEnabled = _.isFormationEnabled;
  _.isFormationEnabled = function() {
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__isFormationEnabled.call(this, ...arguments);
    }
  };
  
  //@[ALIAS]
  ALIAS__isSaveEnabled = _.isSaveEnabled;
  _.isSaveEnabled = function() {
    if (ANNetwork.isConnected()) {
      // * Если параметр включён
      return ANET.PP.isSaveLoadAllowed();
    } else {
      return ALIAS__isSaveEnabled.call(this, ...arguments);
    }
  };
})();

// ■ END Window_MenuCommand.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCurrentItemEnabled, _;
  //@[DEFINES]
  _ = Window_MenuStatus.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function(rect) {
    ALIAS__initialize.call(this, rect);
    if (ANNetwork.isConnected()) {
      if (ANET.PP.isOtherPlayersVisibleInMenu() === false) {
        this.setOnlyMyPlayerInMenuMode();
      }
    }
  };
  //@[ALIAS]
  ALIAS__isCurrentItemEnabled = _.isCurrentItemEnabled;
  _.isCurrentItemEnabled = function() {
    if (ANNetwork.isConnected()) {
      return this.isCurrentItemEnabledInNetworkGame();
    } else {
      return ALIAS__isCurrentItemEnabled.call(this, ...arguments);
    }
  };
})();

// ■ END Window_MenuStatus.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_MenuStatus.prototype;
  (function() {    // * Команды Skill, Statis, Equip
    // -----------------------------------------------------------------------
    _.isCurrentItemEnabledInNetworkGame = function() {
      if (this.isSymbolOnlyForMyNetActor()) {
        return this.isCurrentActorIsMyNetActor();
      } else {
        return true;
      }
    };
    // * Набор команд, которые доступны только для текущего игрока (персонажа)
    _.isSymbolOnlyForMyNetActor = function() {
      var e, isOnlyForMyActor, symbol;
      try {
        // * Плохой вариант получения команды, но работает
        symbol = SceneManager._scene._commandWindow.currentSymbol();
        // * Навыки и экипировка - только для моего персонажа
        isOnlyForMyActor = symbol === 'skill' || symbol === 'equip';
        if (ANET.PP.isOtherPlayersMenuStatusAllowed() === false) {
          isOnlyForMyActor = isOnlyForMyActor || (symbol === 'status');
        }
        return isOnlyForMyActor;
      } catch (error) {
        e = error;
        AA.w(e);
        return false;
      }
    };
    
    // * Выбранный (Index) персонаж принадлежит мне? (мой персонаж)
    return _.isCurrentActorIsMyNetActor = function() {
      var actor, e;
      try {
        actor = $gameParty.members()[this.index()];
        return actor.isMyNetworkActor();
      } catch (error) {
        e = error;
        AA.w(e);
        return false;
      }
    };
  })();
  (function() {    // * Cписок игроков
    // -----------------------------------------------------------------------
    
    // * Будет видно только моего персонажа
    return _.setOnlyMyPlayerInMenuMode = function() {
      this.maxItems = function() {
        return 1;
      };
      this.actor = function(index) {
        return $gameParty.leader();
      };
      return this.selectLast = function() {
        return this.smoothSelect(0);
      };
    };
  })();
})();

// ■ END Window_MenuStatus.coffee
//---------------------------------------------------------------------------

// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__startMessage, ALIAS__terminateMessage, _;
  //@[DEFINES]
  _ = Window_Message.prototype;
  //@[ALIAS]
  ALIAS__startMessage = _.startMessage;
  _.startMessage = function() {
    ALIAS__startMessage.call(this);
    return ANET.UI.onGameMessageStart();
  };
  
  //TODO: Тут мерцание происходит. Как быть? Timeout?
  //@[ALIAS]
  ALIAS__terminateMessage = _.terminateMessage;
  _.terminateMessage = function() {
    ALIAS__terminateMessage.call(this);
    return ANET.UI.onGameMessageEnd();
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Window_NetworkActorsList;

Window_NetworkActorsList = class Window_NetworkActorsList extends Window_Selectable {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
    this.select(0);
  }

  maxItems() {
    return this.actorsForNetwork().length;
  }

  maxCols() {
    return 2;
  }

  actorsForNetwork() {
    return ANET.PP.actorsForNetwork();
  }

  isCurrentItemEnabled() {
    var e;
    try {
      return this.isEnable(this.index());
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  }

  selectedActorId() {
    if (!this.isCurrentItemEnabled()) {
      return 0;
    }
    return this.getActorData(this.index()).id;
  }

  isEnable(index) {
    var actorId;
    actorId = this.getActorData(index).id;
    return !ANGameManager.playersData.some(function(pl) {
      return pl.actorId === actorId;
    });
  }

  drawItem(index) {
    var actorData, faceBitmap, rect;
    actorData = this.getActorData(index);
    if (actorData == null) {
      return;
    }
    rect = this.itemRect(index);
    faceBitmap = ImageManager.loadFace(actorData.faceName);
    faceBitmap.addLoadListener(() => {
      return this._drawActor(rect, actorData, index);
    });
  }

  itemHeight() {
    return 110;
  }

  getActorData(index) {
    return $dataActors[this.actorsForNetwork()[index]];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkActorsList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkActorsList.prototype;
  _._drawActor = function(rect, a, index) {
    this.changePaintOpacity(this.isEnable(index));
    this._drawActorInfo(rect, a);
    this._drawActorClass(rect, a);
    if (!this.isEnable(index)) {
      this._drawNetworkStatus(rect);
    }
    this.changePaintOpacity(1);
  };
  _._drawActorInfo = function(rect, a) {
    this.drawFaceWithCustomSize(a.faceName, a.faceIndex, rect.x + 4, rect.y + 2, this.itemHeight() - 8);
    return this.drawText(a.name, rect.x + 120, rect.y + 4, 168);
  };
  _._drawActorClass = function(rect, a) {
    var aClass, className, e;
    try {
      aClass = $dataClasses[a.classId];
      if (aClass != null) {
        className = aClass.name;
      } else {
        className = "";
      }
      if (KDCore.isMV()) {
        this.changeTextColor(this.crisisColor());
      } else {
        this.changeTextColor(ColorManager.crisisColor());
      }
      this.contents.fontSize -= 8;
      this.drawText(className, rect.x + 132, rect.y + 44, 168);
      this.contents.fontSize += 8;
      this.resetTextColor();
    } catch (error) {
      e = error;
      AA.warning(e);
    }
  };
  _._drawNetworkStatus = function(rect) {
    if (KDCore.isMV()) {
      this.changeTextColor(this.deathColor());
    } else {
      this.changeTextColor(ColorManager.deathColor());
    }
    this.contents.fontSize -= 8;
    this.drawText('Picked', rect.x + 270, rect.y + 4);
    this.contents.fontSize += 8;
    this.resetTextColor();
  };
})();

// ■ END Window_NetworkActorsList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Window_NetworkGameMenu;

Window_NetworkGameMenu = class Window_NetworkGameMenu extends Window_Command {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
  }

  makeCommandList() {
    this.addCommand("Create Room", "createRoom");
    this.addCommand("Join Room", "joinRoom");
    this.addCommand("Join Random Room", "joinRandRoom");
    this.addCommand("Settings", "settings");
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Window_NetworkGameMenu.prototype;
})();

// ■ END Window_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Window_NetworkRoomCommands;

Window_NetworkRoomCommands = class Window_NetworkRoomCommands extends Window_HorzCommand {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
  }

  maxCols() {
    return 3;
  }

  isLoadGame() {
    return ANET.Utils.isLoadGameRoom();
  }

  isCanSelectActors() {
    return ANET.PP.isActorSelectionAllowed() && !this.isLoadGame();
  }

  makeCommandList() {
    var leaveCommandName;
    if (ANNetwork.isMasterClient()) {
      this.addCommand('Start', 'start', this._isStartEnabled()); //TODO: Третий аргумент : enabled
    } else {
      //TODO: Надо проверять все ли готовы, только тогда кнопка активна
      //TODO: Ещё можно проверять больше 1 игрока или нет
      this.addCommand('Ready', 'ready', false);
    }
    //TODO: Пока отключим, нет функционала
    if (this.isCanSelectActors()) {
      this.addCommand("Character", 'character', this._isCharSelectEnabled());
    }
    leaveCommandName = ANNetwork.isMasterClient() ? "Close" : "Leave";
    this.addCommand(leaveCommandName, 'leave');
  }

};

(function() {  
  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomCommands.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomCommands.prototype;
  _._myActorId = function() {
    return ANGameManager.myPlayerData().actorId;
  };
  _._isAllPlayersSelectActors = function() {
    return ANGameManager.playersData.every(function(pl) {
      return pl.actorId !== 0;
    });
  };
  _._isStartEnabled = function() {
    if (!ANET.PP.isSingleActorNetworkGameAllowed()) {
      if (ANGameManager.playersData.length === 1) {
        return false;
      }
    }
    // * Надо выбрать персонажа, потом можно начинать игру
    if (this.isCanSelectActors() || this.isLoadGame()) {
      //TODO: Разрешить загружаться меньшему количеству игроков??? Опция или НЕТ?
      // * Сейчас может загрузить игру два игрока, если играло 3 или более например
      return this._isAllPlayersSelectActors();
    } else {
      return true;
    }
  };
  _._isCharSelectEnabled = function() {
    return this._myActorId() <= 0;
  };
})();

// ■ END Window_NetworkRoomCommands.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Список игроков в комнате
//TODO: Пока нельзя выделять игрока и что-то с ним делать
//TODO: Возможно добавить возможность кикнуть игрока
var Window_NetworkRoomPlayersList;

Window_NetworkRoomPlayersList = class Window_NetworkRoomPlayersList extends Window_Selectable {
  constructor(rect) {
    super(rect);
  }

  //@setBackgroundType ANET.VD.getWindowBackgroundType()
  maxItems() {
    return ANGameManager.playersData.length;
  }

  drawItem(index) {
    var playerData, rect;
    playerData = this.playerData(index);
    if (playerData == null) {
      return;
    }
    rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isEnabled(index));
    this._drawPlayerInfo(rect, playerData);
    this.changePaintOpacity(1);
  }

  isEnabled(index) {
    return true;
  }

  isLoadGame() {
    return ANET.Utils.isLoadGameRoom();
  }

  playerData(index) {
    return ANGameManager.playersData[index];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomPlayersList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomPlayersList.prototype;
  _._drawPlayerInfo = function(rect, playerData) {
    var text;
    text = playerData.name;
    if (playerData.id === ANNetwork.room.masterId) {
      text = "\\C[1]" + text;
    } else if (playerData.id === ANNetwork.myId()) {
      text = "\\C[3]" + text;
    }
    if (ANET.PP.isActorSelectionAllowed() || this.isLoadGame()) {
      text += this._getActorName(playerData);
    }
    this.drawTextEx(text, rect.x, rect.y, rect.width, 'left');
  };
  _._getActorName = function(playerData) {
    var actorName;
    actorName = "...";
    if (playerData.actorId > 0) {
      actorName = $dataActors[playerData.actorId].name;
    }
    return "\\C[0] [%1]".format(actorName);
  };
})();

// ■ END Window_NetworkRoomPlayersList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//TODO: Отключить комнаты других игр (параметр или от сервера зависит)
var Window_NetworkRoomsList;

Window_NetworkRoomsList = class Window_NetworkRoomsList extends Window_Selectable {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
    this._createNoRoomsMessage();
    this.refreshRooms([]);
    return;
  }

  maxItems() {
    if (this.isHaveAnyRoom()) {
      return this.roomsList.length;
    } else {
      return 0;
    }
  }

  drawItem(index) {
    var rect, roomData;
    roomData = this.roomData(index);
    if (roomData == null) {
      return;
    }
    rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isEnabled(index));
    this._drawRoomInfo(rect, roomData);
    this.changePaintOpacity(1);
  }

  isEnabled(index) {
    return NetRoomDataWrapper.isRoomProperToJoin(this.roomData(index));
  }

  isCurrentRoomEnabled() {
    return this.isEnabled(this.index());
  }

  getSelectedRoom() {
    return this.roomData(this.index());
  }

  refreshRooms(roomsList) {
    this.roomsList = roomsList;
    //TODO: @_noRoomsTextSpr мелькает
    this._noRoomsTextSpr.visible = !this.isHaveAnyRoom();
    if (this._noRoomsTextSpr.visible === true) {
      this.select(-1);
    }
    this.refresh();
  }

  isHaveAnyRoom() {
    if (this.roomsList != null) {
      return this.roomsList.length > 0;
    } else {
      return false;
    }
  }

  roomData(index) {
    return this.roomsList[index];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomsList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomsList.prototype;
  _._createNoRoomsMessage = function() {
    var params;
    params = AA.Sprite_UIText.prototype.defaultParams();
    params.size.w = this.width;
    params.size.h = this.height;
    params.font.size = 32;
    params.outline.width = 3;
    this._noRoomsTextSpr = new AA.Sprite_UIText(params);
    this._noRoomsTextSpr.visible = false;
    this._noRoomsTextSpr.drawText("There are no rooms on server");
    return this.addChild(this._noRoomsTextSpr);
  };
  _._drawRoomInfo = function(rect, roomData) {
    var loadGame, roomText, rpgVersion, state;
    rpgVersion = roomData.rpgVersion === 0 ? 'MZ' : 'MV';
    state = roomData.inGame === true ? 'In Game' : 'In Lobby';
    loadGame = NetRoomDataWrapper.isLoadGameRoom(roomData) ? '[from Savefile]' : '';
    // * [VER](GAME NAME) RoomName 0\X (inGame|inLobby)
    roomText = "\\}\\C[1][%1]\\C[3](%2)\\{\\C[0]   %3   \\C[4]%4/%5 \\}\\C[5](%6) \\C[6]%7".format(rpgVersion, roomData.gameTitle, roomData.name, roomData.playersIds.length, roomData.maxPlayers, state, loadGame);
    this.drawTextEx(roomText, rect.x, rect.y, rect.width, 'left');
  };
})();

// ■ END Window_NetworkRoomsList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_NetworkRoomTypeMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Window_NetworkRoomTypeMenu;

Window_NetworkRoomTypeMenu = class Window_NetworkRoomTypeMenu extends Window_Command {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
  }

  makeCommandList() {
    this.addCommand("New Game", "newGame");
    this.addCommand("Load Game", "continue", this.isHaveSavedGames());
  }

  isHaveSavedGames() {
    return true; //TODO: првоерка наличия сетевых сохранений
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomTypeMenu.prototype;
})();

// ■ END Window_NetworkRoomTypeMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_SavefileList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__drawTitle, ALIAS__isEnabled, _;
  //@[DEFINES]
  _ = Window_SavefileList.prototype;
  //@[ALIAS]
  ALIAS__isEnabled = _.isEnabled;
  _.isEnabled = function(savefileId) {
    // * Нельзя загружать сетевые сохранения из обычного меню загрузки
    if (this._mode === 'load' && DataManager.nIsNetworkSaveFile(savefileId)) {
      return false;
    } else if (this._mode === 'loadNet') {
      return DataManager.nIsNetworkSaveFile(savefileId);
    } else {
      return ALIAS__isEnabled.call(this, savefileId);
    }
  };
  
  //TODO: Добавить кастомизацию или опцию на отключение
  //@[ALIAS]
  ALIAS__drawTitle = _.drawTitle;
  _.drawTitle = function(savefileId, x, y) {
    if (DataManager.nIsNetworkSaveFile(savefileId)) {
      return this.drawText(TextManager.file + " " + savefileId + " [Network game]", x, y, 240);
    } else {
      return ALIAS__drawTitle.call(this, savefileId, x, y);
    }
  };
})();

// ■ END Window_SavefileList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_SavefileList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__drawGameTitle, _;
  //@[DEFINES]
  _ = Window_SavefileList.prototype;
  //@[ALIAS]
  ALIAS__drawGameTitle = _.drawGameTitle;
  _.drawGameTitle = function(info, x, y, width) {
    var text;
    if ((info.nUniqueSaveID != null) && (info.nMyActorId != null)) {
      text = "";
      if (info.title != null) {
        text = info.title;
      }
      text += " [Network game]";
      return this.drawText(text, x, y, width + 100);
    } else {
      return ALIAS__drawGameTitle.call(this, info, x, y, width);
    }
  };
})();

// ■ END Window_SavefileList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_TitleCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__makeCommandList, _;
  //@[DEFINES]
  _ = Window_TitleCommand.prototype;
  //@[ALIAS]
  ALIAS__makeCommandList = _.makeCommandList;
  _.makeCommandList = function() {
    ALIAS__makeCommandList.call(this);
    this.addCommand('Network', "network");
    this._nRearangeNetworkCommand();
    if (!ANET.PP.isSinglePlayerAllowed()) {
      this._nRemoveNewGameCommand();
    }
  };
})();

// ■ END Window_TitleCommand.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_TitleCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_TitleCommand.prototype;
  // * Чтобы не была последнией, меняю местами с командой options
  _._nRearangeNetworkCommand = function() {
    var e, netCmd, netCommandIndex, optionsCmd, optionsCommandIndex;
    try {
      optionsCommandIndex = this._list.indexOf(this._list.find(function(item) {
        return item.symbol === "options";
      }));
      if (optionsCommandIndex < 0) {
        return;
      }
      netCommandIndex = this._list.length - 1;
      optionsCmd = this._list[optionsCommandIndex];
      netCmd = this._list[netCommandIndex];
      this._list[optionsCommandIndex] = netCmd;
      return this._list[netCommandIndex] = optionsCmd;
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
  _._nRemoveNewGameCommand = function() {
    var e, newGameIndex;
    try {
      newGameIndex = this._list.indexOf(this._list.find(function(item) {
        return item.symbol === "newGame";
      }));
      return this._list.splice(newGameIndex, 1);
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

// ■ END Window_TitleCommand.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x38e7=['length','864879BBSwjE','slice','116244jZbdkE','894765sWvdzj','_prepareConnectionSettings','10TQhcSi','ParamsManager','1210411tgfWhd','3034','_port','683174ODEhnR','getParam','205630TNQJeU','_ip','actorsForNetwork','1843116jeQGnQ','1IajToG','prototype','195.161.41.20'];function a0_0x5883(_0x36cf40,_0x27d70b){_0x36cf40=_0x36cf40-0x155;var _0x38e77b=a0_0x38e7[_0x36cf40];return _0x38e77b;}(function(_0x426d85,_0x3e2de1){var _0xde6e60=a0_0x5883;while(!![]){try{var _0x2e66ce=-parseInt(_0xde6e60(0x157))+-parseInt(_0xde6e60(0x164))*-parseInt(_0xde6e60(0x15e))+-parseInt(_0xde6e60(0x160))+-parseInt(_0xde6e60(0x168))+parseInt(_0xde6e60(0x15b))+-parseInt(_0xde6e60(0x159))*parseInt(_0xde6e60(0x156))+parseInt(_0xde6e60(0x163));if(_0x2e66ce===_0x3e2de1)break;else _0x426d85['push'](_0x426d85['shift']());}catch(_0x465546){_0x426d85['push'](_0x426d85['shift']());}}}(a0_0x38e7,0x94adb),function(){var _0x102dda=a0_0x5883,_0x49f929;_0x49f929=ANET[_0x102dda(0x15a)][_0x102dda(0x165)],_0x49f929[_0x102dda(0x162)]=function(){var _0x350524=_0x102dda,_0x2acef0;return _0x2acef0=this[_0x350524(0x15f)]('actorsForNetwork',[0x1,0x2]),_0x2acef0[_0x350524(0x167)]>0x2?_0x2acef0[_0x350524(0x155)](0x0,0x2):_0x2acef0;},_0x49f929[_0x102dda(0x158)]=function(){var _0x42b05d=_0x102dda;this[_0x42b05d(0x161)]=_0x42b05d(0x166),this[_0x42b05d(0x15d)]=_0x42b05d(0x15c);};}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addActor, ALIAS__initialize, ALIAS__removeActor, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  // * В MZ этот метод разделён на setup
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected()) {
      return this._data = []; // * Нет follower'ов
    }
  };
  
  //@[ALIAS]
  ALIAS__addActor = _.addActor;
  _.addActor = function(actorId) {
    var actor;
    ALIAS__addActor.call(this, actorId);
    // * Обновить окно статуса битвы
    $gameTemp.requestBattleRefresh();
    // * Код из MZ, инициализация битвы для новенького
    if (this.inBattle()) {
      actor = $gameActors.actor(actorId);
      if (this.battleMembers().includes(actor)) {
        actor.onBattleStart();
      }
    }
  };
  // * Если игрок выйдет, чтобы обновился экран битвы тоже
  //@[ALIAS]
  ALIAS__removeActor = _.removeActor;
  _.removeActor = function() {
    ALIAS__removeActor.call(this, ...arguments);
    $gameTemp.requestBattleRefresh();
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__updateBattleProcess, _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  // * Чтобы окно открывалось при передаче управления игроку
  //@[ALIAS]
  ALIAS__updateBattleProcess = _.updateBattleProcess;
  _.updateBattleProcess = function() {
    if (ANNetwork.isConnected()) {
      if ($gameTemp._isBattleSceneShouldBeRefreshed === true) {
        this.changeInputWindow();
        $gameTemp._isBattleSceneShouldBeRefreshed = false;
      }
      if (!this.isAnyInputWindowActive() || BattleManager.isAborting() || BattleManager.isBattleEnd()) {
        this.changeInputWindow();
      }
    }
    return ALIAS__updateBattleProcess.call(this);
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SceneManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__goto, _;
  //@[DEFINES]
  _ = SceneManager;
  //@[ALIAS]
  ALIAS__goto = _.goto;
  _.goto = function(sceneClass) {
    if ((typeof $gameTemp !== "undefined" && $gameTemp !== null) && (sceneClass != null)) {
      $gameTemp.__sceneChanging = true;
      setTimeout((function() {
        return typeof $gameTemp !== "undefined" && $gameTemp !== null ? $gameTemp.__sceneChanging = false : void 0;
      }), 100);
    }
    return ALIAS__goto.call(this, sceneClass);
  };
  
  // * В MV плохо работает проверка isSceneChanging, поэтому сделал дополнительную проверку
  _.isSceneReadyForNetwork = function() {
    if (!ANNetwork.isConnected()) {
      return true;
    }
    if ($gameTemp.__sceneChanging == null) {
      return true;
    }
    return !$gameTemp.__sceneChanging;
  };
})();

// ■ END SceneManager.coffee
//---------------------------------------------------------------------------

//Plugin Alpha_NETZ automatic build by PKD PluginBuilder 1.9.2 09.10.2021
