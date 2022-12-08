//=============================================================================
// VisuStella MZ - Skill Containers
// VisuMZ_4_SkillContainers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_SkillContainers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillContainers = VisuMZ.SkillContainers || {};
VisuMZ.SkillContainers.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.03] [SkillContainers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Containers_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Skill Containers let you transform skills in-game to contain an inner list
 * of skills, accessible to players. These container skills will draw from a
 * list of skills that either require the player to already have them or allow
 * them to even use skills they don't normally have access to.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Skill Containers let you condense skills to become containers for lists of
 *   other skills accessible to the player.
 * * Reduce the size of a skill library by grouping them together.
 * * Skill Containers can contain skills that require the actor to already know
 *   them (either through learning or traits) or forcefully allow them to be
 *   accessible regardless.
 * * These container skills don't appear unless the container itself has access
 *   to at least one skill.
 * * These container skills are usable from the skill menu or in-battle!
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Skill Container-Related Notetags ===
 * 
 * ---
 *
 * <Known Skill List: id>
 * <Known Skills List: id, id, id>
 *
 * <Known Skill List: name>
 * <Known Skills List: name, name, name>
 * 
 * <Known Skills List: id To id>
 *
 * - Used for: Skill Notetags
 * - Turns the skill into a skill container, accessible to actors and players.
 * - Replace 'id' with a number representing the ID of the skill you wish to
 *   add to the skill container.
 * - Replace 'name' with the name of the skill you wish to add to the
 *   skill container.
 * - Use the 'id To id' version to get a range of skills to add to the list.
 *   - This will ignore any skills with no names or have ----- in their name.
 * - These skills require the actor to have learned the skill or to have access
 *   to the skill 
 * - Insert multiple copies of the notetag to add more.
 * - Skill Containers cannot be used as Single Skill Commands for the VisuMZ
 *   Battle Core's Actor Command Window (just use a Skill Type instead).
 * - Skill Containers can be stacked inside one another.
 * 
 *   Examples:
 * 
 *   <Known Skills List: 51, 52, 53>
 *   <Known Skills List: Heal I, Heal II, Heal III>
 *   <Known Skills List: 51 To 53>
 *
 * ---
 *
 * <Force Skill List: id>
 * <Force Skills List: id, id, id>
 *
 * <Force Skill List: name>
 * <Force Skills List: name, name, name>
 * 
 * <Force Skills List: id To id>
 *
 * - Used for: Skill Notetags
 * - Turns the skill into a skill container, accessible to actors and players.
 * - Replace 'id' with a number representing the ID of the skill you wish to
 *   add to the skill container.
 * - Replace 'name' with the name of the skill you wish to add to the
 *   skill container.
 * - Use the 'id To id' version to get a range of skills to add to the list.
 *   - This will ignore any skills with no names or have ----- in their name.
 * - These skills do NOT require the actor to have learned the skill. These
 *   listed skills will always be accessible.
 * - Insert multiple copies of the notetag to add more.
 * - Skill Containers cannot be used as Single Skill Commands for the VisuMZ
 *   Battle Core's Actor Command Window (just use a Skill Type instead).
 * - Skill Containers can be stacked inside one another.
 * 
 *   Examples:
 * 
 *   <Force Skills List: 51, 52, 53>
 *   <Force Skills List: Heal I, Heal II, Heal III>
 *   <Force Skills List: 51 To 53>
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The Plugin Parameters allow you to adjust how the text for Skill Containers
 * appear in-game. This way, you can help your players differentiate them from
 * regular skills.
 *
 * ---
 *
 * General
 * 
 *   Skill Container Text:
 *   - Determines the text that appears where the skill costs normally would
 *     appear instead.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.03: December 9, 2021
 * * Bug Fixes!
 * ** Plugin Parameter for Skill Container Text should now work properly.
 * 
 * Version 1.02: June 4, 2021
 * * Compatibility Update!
 * ** Skill containers should now work with Auto Battle. This does not apply
 *    to enemies, however. Enemies will still require the actual skills to be
 *    used properly. Update made by Olivia.
 * 
 * Version 1.01: April 30, 2021
 * * Compatibility Update!
 * ** Skills displayed inside the containers are now affected by the visibility
 *    notetags such as <Show Switch: x> and <Hide Switch :x> as well as the
 *    <JS Skill Visible> notetags. Update made by Arisu.
 * * Feature Update!
 * ** When using the VisuMZ_3_SideviewBattleUI plugin, resize the window
 *    according to the title items inside of the container window instead of
 *    basing it off the skill window's size. Update made by Olivia.
 *
 * Version 1.00 Official Release Date: May 7, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PluginCommandFunctionName
 * @text Category: Function Name
 * @desc Plugin Command Description Text
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg option:num
 * @text Option Text
 * @type number
 * @max 1
 * @desc Change the value to this number
 * @default 42069
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableSkillContainersMenu
 * @text System: Enable SkillContainers in Menu?
 * @desc Enables/disables SkillContainers menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables SkillContainers menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowSkillContainersMenu
 * @text System: Show SkillContainers in Menu?
 * @desc Shows/hides SkillContainers menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides SkillContainers menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillContainers
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ContainerText:str
 * @text Skill Container Text
 * @desc Determines the text that appears where the skill costs
 * normally would appear instead.
 * @default \FS[22]...
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

function _0x3ecf(_0x223d1c,_0x235900){const _0x2888aa=_0x2888();return _0x3ecf=function(_0x3ecfdd,_0x39e16a){_0x3ecfdd=_0x3ecfdd-0xc6;let _0x5d3500=_0x2888aa[_0x3ecfdd];return _0x5d3500;},_0x3ecf(_0x223d1c,_0x235900);}const _0x173d04=_0x3ecf;(function(_0x3bacd9,_0x4fd051){const _0x233ac0=_0x3ecf,_0x2429b9=_0x3bacd9();while(!![]){try{const _0x201b87=parseInt(_0x233ac0(0x109))/0x1*(-parseInt(_0x233ac0(0xe4))/0x2)+-parseInt(_0x233ac0(0x138))/0x3*(-parseInt(_0x233ac0(0x136))/0x4)+-parseInt(_0x233ac0(0x115))/0x5+parseInt(_0x233ac0(0x132))/0x6*(parseInt(_0x233ac0(0x118))/0x7)+-parseInt(_0x233ac0(0xf9))/0x8+parseInt(_0x233ac0(0x10e))/0x9+parseInt(_0x233ac0(0xd0))/0xa;if(_0x201b87===_0x4fd051)break;else _0x2429b9['push'](_0x2429b9['shift']());}catch(_0x2a8f0f){_0x2429b9['push'](_0x2429b9['shift']());}}}(_0x2888,0x1a48e));var label=_0x173d04(0x108),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x173d04(0xc9)](function(_0x1ddff2){const _0x546f9f=_0x173d04;return _0x1ddff2[_0x546f9f(0xdc)]&&_0x1ddff2[_0x546f9f(0xd8)][_0x546f9f(0x11f)]('['+label+']');})[0x0];VisuMZ[label][_0x173d04(0x13d)]=VisuMZ[label][_0x173d04(0x13d)]||{},VisuMZ['ConvertParams']=function(_0x5f1b37,_0x3ee08b){const _0x21145e=_0x173d04;for(const _0x4ea6f7 in _0x3ee08b){if(_0x4ea6f7['match'](/(.*):(.*)/i)){const _0x511a94=String(RegExp['$1']),_0x42e6c8=String(RegExp['$2'])['toUpperCase']()[_0x21145e(0x12e)]();let _0x8851c3,_0xb7031,_0x5afd84;switch(_0x42e6c8){case _0x21145e(0x14a):_0x8851c3=_0x3ee08b[_0x4ea6f7]!==''?Number(_0x3ee08b[_0x4ea6f7]):0x0;break;case _0x21145e(0xf2):_0xb7031=_0x3ee08b[_0x4ea6f7]!==''?JSON[_0x21145e(0x130)](_0x3ee08b[_0x4ea6f7]):[],_0x8851c3=_0xb7031[_0x21145e(0x131)](_0x4aea44=>Number(_0x4aea44));break;case _0x21145e(0x113):_0x8851c3=_0x3ee08b[_0x4ea6f7]!==''?eval(_0x3ee08b[_0x4ea6f7]):null;break;case _0x21145e(0xf0):_0xb7031=_0x3ee08b[_0x4ea6f7]!==''?JSON[_0x21145e(0x130)](_0x3ee08b[_0x4ea6f7]):[],_0x8851c3=_0xb7031[_0x21145e(0x131)](_0x39c220=>eval(_0x39c220));break;case _0x21145e(0x126):_0x8851c3=_0x3ee08b[_0x4ea6f7]!==''?JSON[_0x21145e(0x130)](_0x3ee08b[_0x4ea6f7]):'';break;case _0x21145e(0xce):_0xb7031=_0x3ee08b[_0x4ea6f7]!==''?JSON[_0x21145e(0x130)](_0x3ee08b[_0x4ea6f7]):[],_0x8851c3=_0xb7031['map'](_0x21f91d=>JSON[_0x21145e(0x130)](_0x21f91d));break;case'FUNC':_0x8851c3=_0x3ee08b[_0x4ea6f7]!==''?new Function(JSON[_0x21145e(0x130)](_0x3ee08b[_0x4ea6f7])):new Function(_0x21145e(0xff));break;case _0x21145e(0xde):_0xb7031=_0x3ee08b[_0x4ea6f7]!==''?JSON[_0x21145e(0x130)](_0x3ee08b[_0x4ea6f7]):[],_0x8851c3=_0xb7031['map'](_0x16a7d2=>new Function(JSON[_0x21145e(0x130)](_0x16a7d2)));break;case'STR':_0x8851c3=_0x3ee08b[_0x4ea6f7]!==''?String(_0x3ee08b[_0x4ea6f7]):'';break;case _0x21145e(0xea):_0xb7031=_0x3ee08b[_0x4ea6f7]!==''?JSON[_0x21145e(0x130)](_0x3ee08b[_0x4ea6f7]):[],_0x8851c3=_0xb7031['map'](_0x22486c=>String(_0x22486c));break;case _0x21145e(0x14f):_0x5afd84=_0x3ee08b[_0x4ea6f7]!==''?JSON[_0x21145e(0x130)](_0x3ee08b[_0x4ea6f7]):{},_0x8851c3=VisuMZ[_0x21145e(0x117)]({},_0x5afd84);break;case _0x21145e(0x116):_0xb7031=_0x3ee08b[_0x4ea6f7]!==''?JSON[_0x21145e(0x130)](_0x3ee08b[_0x4ea6f7]):[],_0x8851c3=_0xb7031[_0x21145e(0x131)](_0x511d13=>VisuMZ[_0x21145e(0x117)]({},JSON[_0x21145e(0x130)](_0x511d13)));break;default:continue;}_0x5f1b37[_0x511a94]=_0x8851c3;}}return _0x5f1b37;},(_0x2abae9=>{const _0x347c24=_0x173d04,_0x764baa=_0x2abae9[_0x347c24(0xeb)];for(const _0x27393d of dependencies){if(!Imported[_0x27393d]){if(_0x347c24(0x135)===_0x347c24(0x135)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x347c24(0xfe)](_0x764baa,_0x27393d)),SceneManager[_0x347c24(0xc8)]();break;}else _0x227442['push'](_0x37f655);}}const _0x465d9b=_0x2abae9[_0x347c24(0xd8)];if(_0x465d9b[_0x347c24(0x11c)](/\[Version[ ](.*?)\]/i)){const _0x9f13c8=Number(RegExp['$1']);_0x9f13c8!==VisuMZ[label][_0x347c24(0x12f)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x347c24(0xfe)](_0x764baa,_0x9f13c8)),SceneManager[_0x347c24(0xc8)]());}if(_0x465d9b[_0x347c24(0x11c)](/\[Tier[ ](\d+)\]/i)){if(_0x347c24(0x10b)===_0x347c24(0x12c)){if(!this[_0x347c24(0x122)](_0xe2be2a))return![];if(!this[_0x347c24(0xe6)](_0xb18e47))return![];return!![];}else{const _0x1b9818=Number(RegExp['$1']);if(_0x1b9818<tier)_0x347c24(0xf6)!==_0x347c24(0xe9)?(alert(_0x347c24(0xd1)[_0x347c24(0xfe)](_0x764baa,_0x1b9818,tier)),SceneManager[_0x347c24(0xc8)]()):_0xdfe67b['SkillContainers']['Scene_Skill_onItemOk'][_0x347c24(0xfc)](this);else{if(_0x347c24(0x12d)!==_0x347c24(0x12d)){if(_0x3aebe4&&_0x4d0d95[_0x347c24(0x128)](_0x5a87df)){const _0x10ffd5=_0x39b6d6[_0x347c24(0xc6)](this[_0x347c24(0xdb)],_0x15e77f);if(_0x10ffd5['length']<=0x0)return![];}return _0x4b7705[_0x347c24(0x108)][_0x347c24(0x101)][_0x347c24(0xfc)](this,_0x558fbd);}else tier=Math[_0x347c24(0xf3)](_0x1b9818,tier);}}}VisuMZ[_0x347c24(0x117)](VisuMZ[label][_0x347c24(0x13d)],_0x2abae9[_0x347c24(0x144)]);})(pluginData),VisuMZ[_0x173d04(0x108)]['RegExp']={'KnownList':/<(?:KNOWN|EXTRA) (?:SKILL|SKILLS) LIST:[ ](.*)>/gi,'KnownListRange':/<(?:KNOWN|EXTRA) (?:SKILL|SKILLS) LIST:[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/gi,'ForceList':/<(?:FORCE|FORCED) (?:SKILL|SKILLS) LIST:[ ](.*)>/gi,'ForceListRange':/<(?:FORCE|FORCED) (?:SKILL|SKILLS) LIST:[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/gi,'Type1':/<(?:NOTETAG):[ ](\d+)([%％])>/i,'Type2':/<(?:NOTETAG):[ ]([\+\-]\d+)>/i,'Type3':/<(?:NOTETAG):[ ](.*)>/i,'Type3nonGreedy':/<(?:NOTETAG):[ ](.*?)>/i,'Type4':/<(?:NOTETAG):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'Type5':/<(?:NOTETAG):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i,'Type6':/<(?:NOTETAG)>/i,'Type7':/<\/(?:NOTETAG)>/i,'Type8':/<(?:NOTETAG)>\s*([\s\S]*)\s*<\/(?:NOTETAG)>/i},DataManager[_0x173d04(0x128)]=function(_0x4b54d4){const _0x4475fb=_0x173d04;if(!_0x4b54d4)return![];typeof _0x4b54d4===Number&&(console[_0x4475fb(0x133)]('test'),_0x4b54d4=$dataSkills[_0x4b54d4]);const _0x1f617c=VisuMZ['SkillContainers'][_0x4475fb(0xfd)],_0x2ee548=_0x4b54d4[_0x4475fb(0x139)];return _0x2ee548[_0x4475fb(0x11c)](_0x1f617c[_0x4475fb(0x13f)])||_0x2ee548['match'](_0x1f617c['ForceList']);},DataManager['getSkillContainerList']=function(_0x1dbe5f,_0x1cb2c9){const _0x50dac3=_0x173d04;if(!_0x1cb2c9)return[];const _0x548ff6=VisuMZ[_0x50dac3(0x108)]['RegExp'],_0x3700d6=_0x1cb2c9[_0x50dac3(0x139)];let _0x1f36b6=[];if(_0x1dbe5f){if(!![]){if(_0x50dac3(0x145)!==_0x50dac3(0x12a)){const _0x31241d=_0x3700d6[_0x50dac3(0x11c)](_0x548ff6[_0x50dac3(0x13f)]);if(_0x31241d){if(_0x50dac3(0x11b)===_0x50dac3(0xf4)){if(!_0xbbf5f6)return;this[_0x50dac3(0xdf)]();const _0x38af4c=_0x5562d8[_0x50dac3(0x125)],_0x4bbadf=this[_0x50dac3(0xcd)](_0x38af4c)['width'];_0x49e79c+=_0x21f44a-_0x4bbadf,this[_0x50dac3(0xe3)](_0x38af4c,_0x55991f,_0x19aa84,_0x4bbadf),this[_0x50dac3(0xdf)]();}else for(const _0x16a0c6 of _0x31241d){_0x16a0c6['match'](_0x548ff6['KnownList']);let _0x59bee5=DataManager[_0x50dac3(0x10f)](RegExp['$1']);_0x59bee5=_0x59bee5[_0x50dac3(0xc9)](_0x50009f=>_0x1dbe5f[_0x50dac3(0xec)](_0x50009f)),_0x1f36b6=_0x1f36b6[_0x50dac3(0x143)](_0x59bee5);}}}else{const _0xa82299=_0x2e8634(_0x2423b8['$1']);_0xa82299<_0x50d06e?(_0x34f68a(_0x50dac3(0xd1)[_0x50dac3(0xfe)](_0x44e117,_0xa82299,_0x52dc23)),_0x5e3352[_0x50dac3(0xc8)]()):_0x15e063=_0xe07c61[_0x50dac3(0xf3)](_0xa82299,_0x4b66f8);}}if(!![]){if('gbRwn'!==_0x50dac3(0x137)){const _0x187832=_0x3700d6[_0x50dac3(0x11c)](_0x548ff6[_0x50dac3(0xf1)]);if(_0x187832)for(const _0x52573a of _0x187832){if(_0x50dac3(0x14e)!==_0x50dac3(0x14e)){const _0x4fea55=this['item']();_0x4a05b8['isSkillContainer'](_0x4fea55)?this[_0x50dac3(0x13e)]():_0x5bf1b5[_0x50dac3(0x108)][_0x50dac3(0x127)]['call'](this);}else{_0x52573a[_0x50dac3(0x11c)](_0x548ff6[_0x50dac3(0xf1)]);const _0x3b5bc9=Number(RegExp['$1']),_0x231f1b=Number(RegExp['$2']);let _0x436bf5=[];for(let _0x3905b9=_0x3b5bc9;_0x3905b9<=_0x231f1b;_0x3905b9++){if(_0x50dac3(0x12b)==='bCkQU'){if(this[_0x50dac3(0x13c)][_0x50dac3(0x14d)]<=0x0)return;const _0x4d379a=this[_0x50dac3(0x13c)][this[_0x50dac3(0x13c)][_0x50dac3(0x14d)]-0x1],_0x311f09=_0x4d379a[_0x50dac3(0x112)]||0x0;this['_skillContainerStack'][_0x50dac3(0x121)](),this[_0x50dac3(0x105)](),this['forceSelect'](_0x311f09);}else _0x436bf5[_0x50dac3(0xe1)](_0x3905b9);}_0x436bf5=_0x436bf5['filter'](_0x45ac6f=>_0x1dbe5f['hasSkill'](_0x45ac6f)),_0x1f36b6=_0x1f36b6[_0x50dac3(0x143)](_0x436bf5);}}}else return this['_skillContainerStack']['length']>0x0;}}if(!![]){if(_0x50dac3(0x13b)!=='AmxQV'){if(!![]){if('DmBbU'!==_0x50dac3(0x100)){const _0x31d4a4=_0x3700d6[_0x50dac3(0x11c)](_0x548ff6[_0x50dac3(0x134)]);if(_0x31d4a4)for(const _0x257426 of _0x31d4a4){_0x257426[_0x50dac3(0x11c)](_0x548ff6['ForceList']);let _0x2cd03d=DataManager[_0x50dac3(0x10f)](RegExp['$1']);_0x1f36b6=_0x1f36b6['concat'](_0x2cd03d);}}else for(const _0x6591a1 of _0x25e0d0){_0x6591a1['match'](_0x215349[_0x50dac3(0xf1)]);const _0x2a8011=_0x1b9b18(_0x56f43f['$1']),_0x1fa003=_0x39e58e(_0x488fad['$2']);let _0x59dd20=[];for(let _0xdb0d5e=_0x2a8011;_0xdb0d5e<=_0x1fa003;_0xdb0d5e++){_0x59dd20[_0x50dac3(0xe1)](_0xdb0d5e);}_0x59dd20=_0x59dd20[_0x50dac3(0xc9)](_0x4791c9=>_0x5abe11[_0x50dac3(0xec)](_0x4791c9)),_0x35cb7c=_0x36922b[_0x50dac3(0x143)](_0x59dd20);}}if(!![]){const _0x727ae5=_0x3700d6[_0x50dac3(0x11c)](_0x548ff6['ForceListRange']);if(_0x727ae5){if('KeqLn'===_0x50dac3(0x11e))for(const _0x3f89ad of _0x727ae5){_0x3f89ad[_0x50dac3(0x11c)](_0x548ff6[_0x50dac3(0xfa)]);const _0x694a79=Number(RegExp['$1']),_0x47674d=Number(RegExp['$2']);let _0x7d5c0f=[];for(let _0x262b94=_0x694a79;_0x262b94<=_0x47674d;_0x262b94++){_0x7d5c0f[_0x50dac3(0xe1)](_0x262b94);}_0x1f36b6=_0x1f36b6['concat'](_0x7d5c0f);}else this[_0x50dac3(0x10c)](_0x52336f,_0x59183d,_0x160ad4,_0x26f679);}}}else this[_0x50dac3(0x105)](),this[_0x50dac3(0xc7)](_0x27e93d);}return _0x1f36b6=_0x1f36b6[_0x50dac3(0xc9)](_0x5c5a21=>!!$dataSkills[_0x5c5a21]),_0x1f36b6=_0x1f36b6[_0x50dac3(0xc9)](_0x1734fb=>_0x1734fb!==_0x1cb2c9['id']),_0x1f36b6=_0x1f36b6['filter'](_0x5b25ba=>$dataSkills[_0x5b25ba][_0x50dac3(0xeb)][_0x50dac3(0x12e)]()!==''),_0x1f36b6=_0x1f36b6[_0x50dac3(0xc9)](_0x1c3cce=>!$dataSkills[_0x1c3cce]['name'][_0x50dac3(0x11c)](/-----/i)),_0x1f36b6=_0x1f36b6[_0x50dac3(0xc9)]((_0x4d9910,_0x457ec5,_0x45b2a0)=>_0x45b2a0['indexOf'](_0x4d9910)===_0x457ec5),_0x1f36b6['sort']((_0x5afa8f,_0x2ab788)=>_0x5afa8f-_0x2ab788),_0x1f36b6;},DataManager[_0x173d04(0x10f)]=function(_0x167cb9){const _0x4b617f=_0x173d04;_0x167cb9=_0x167cb9[_0x4b617f(0x120)](',')[_0x4b617f(0x131)](_0x2c84f5=>_0x2c84f5['trim']());let _0x260b9b=[];for(let _0x15b49c of _0x167cb9){_0x15b49c=(String(_0x15b49c)||'')['trim']();const _0x31324e=/^\d+$/[_0x4b617f(0x10a)](_0x15b49c);_0x31324e?_0x260b9b[_0x4b617f(0xe1)](Number(_0x15b49c)):_0x260b9b[_0x4b617f(0xe1)](DataManager[_0x4b617f(0xd9)](_0x15b49c));}return _0x260b9b;},DataManager['getSkillIdWithName']=function(_0x444216){const _0x45240d=_0x173d04;_0x444216=_0x444216[_0x45240d(0xd2)]()[_0x45240d(0x12e)](),this['_skillIDs']=this[_0x45240d(0xcf)]||{};if(this[_0x45240d(0xcf)][_0x444216])return this[_0x45240d(0xcf)][_0x444216];for(const _0xaa3be8 of $dataSkills){if(!_0xaa3be8)continue;this['_skillIDs'][_0xaa3be8[_0x45240d(0xeb)][_0x45240d(0xd2)]()[_0x45240d(0x12e)]()]=_0xaa3be8['id'];}return this[_0x45240d(0xcf)][_0x444216]||0x0;},TextManager[_0x173d04(0x125)]=VisuMZ['SkillContainers'][_0x173d04(0x13d)][_0x173d04(0xcc)],VisuMZ[_0x173d04(0x108)][_0x173d04(0x127)]=Scene_Skill['prototype'][_0x173d04(0x141)],Scene_Skill['prototype'][_0x173d04(0x141)]=function(){const _0x208437=_0x173d04,_0x5a08c1=this[_0x208437(0x147)]();if(DataManager[_0x208437(0x128)](_0x5a08c1))this['processSkillContainerOk']();else{if(_0x208437(0xe0)===_0x208437(0xca)){const _0x325e29=_0x1ae267[_0x208437(0x11c)](_0x2b3082[_0x208437(0x13f)]);if(_0x325e29)for(const _0x234b35 of _0x325e29){_0x234b35[_0x208437(0x11c)](_0x5bca50['KnownList']);let _0x21a950=_0x5565e2[_0x208437(0x10f)](_0x5b17cb['$1']);_0x21a950=_0x21a950[_0x208437(0xc9)](_0x2dc670=>_0x19cf68[_0x208437(0xec)](_0x2dc670)),_0x230ad7=_0x2e0072[_0x208437(0x143)](_0x21a950);}}else VisuMZ[_0x208437(0x108)]['Scene_Skill_onItemOk'][_0x208437(0xfc)](this);}},Scene_Skill[_0x173d04(0x142)]['processSkillContainerOk']=function(){const _0x23cad2=_0x173d04,_0x343cc4={'skill':this[_0x23cad2(0x146)]['item'](),'index':this['_itemWindow'][_0x23cad2(0x112)]()};this['_itemWindow'][_0x23cad2(0xda)](_0x343cc4),this[_0x23cad2(0x146)][_0x23cad2(0xef)]();},VisuMZ[_0x173d04(0x108)][_0x173d04(0xe5)]=Scene_Skill[_0x173d04(0x142)][_0x173d04(0xcb)],Scene_Skill['prototype'][_0x173d04(0xcb)]=function(){const _0x2fab0e=_0x173d04;this[_0x2fab0e(0x146)][_0x2fab0e(0x129)]()?this[_0x2fab0e(0xf8)]():VisuMZ['SkillContainers'][_0x2fab0e(0xe5)][_0x2fab0e(0xfc)](this);},Scene_Skill[_0x173d04(0x142)][_0x173d04(0xf8)]=function(){const _0x31660a=_0x173d04;this['_itemWindow'][_0x31660a(0xed)](),this['_itemWindow'][_0x31660a(0xef)]();},VisuMZ[_0x173d04(0x108)]['Scene_Battle_onSkillOk']=Scene_Battle[_0x173d04(0x142)][_0x173d04(0x10d)],Scene_Battle[_0x173d04(0x142)][_0x173d04(0x10d)]=function(){const _0x1506bf=_0x173d04,_0x56a054=this[_0x1506bf(0x111)][_0x1506bf(0x147)]();DataManager[_0x1506bf(0x128)](_0x56a054)?this['processSkillContainerOk']():VisuMZ[_0x1506bf(0x108)][_0x1506bf(0x103)]['call'](this);},Scene_Battle[_0x173d04(0x142)][_0x173d04(0x13e)]=function(){const _0xb1d45b=_0x173d04,_0x5e043d={'skill':this[_0xb1d45b(0x111)][_0xb1d45b(0x147)](),'index':this[_0xb1d45b(0x111)]['index']()};this[_0xb1d45b(0x111)][_0xb1d45b(0xda)](_0x5e043d),this[_0xb1d45b(0x111)][_0xb1d45b(0xef)]();},VisuMZ[_0x173d04(0x108)]['Scene_Battle_onSkillCancel']=Scene_Battle[_0x173d04(0x142)][_0x173d04(0x107)],Scene_Battle[_0x173d04(0x142)][_0x173d04(0x107)]=function(){const _0xe7ac41=_0x173d04;if(this[_0xe7ac41(0x111)][_0xe7ac41(0x129)]()){if(_0xe7ac41(0x140)!==_0xe7ac41(0x140))for(const _0x118016 of _0x50a29c){_0x118016[_0xe7ac41(0x11c)](_0x412b1a['ForceList']);let _0x5ca887=_0x23a893[_0xe7ac41(0x10f)](_0x38ab06['$1']);_0x2cecce=_0x48bd42[_0xe7ac41(0x143)](_0x5ca887);}else this[_0xe7ac41(0xf8)]();}else VisuMZ[_0xe7ac41(0x108)][_0xe7ac41(0x14c)][_0xe7ac41(0xfc)](this);},Scene_Battle[_0x173d04(0x142)][_0x173d04(0xf8)]=function(){const _0xb369a7=_0x173d04;this[_0xb369a7(0x111)]['removeSkillContainerStack'](),this[_0xb369a7(0x111)][_0xb369a7(0xef)]();},VisuMZ[_0x173d04(0x108)][_0x173d04(0xdd)]=Scene_Battle[_0x173d04(0x142)]['selectNextCommand'],Scene_Battle[_0x173d04(0x142)][_0x173d04(0xee)]=function(){const _0xb82eb8=_0x173d04;this['_skillWindow']&&this[_0xb82eb8(0x111)][_0xb82eb8(0xd7)](![]),VisuMZ['SkillContainers'][_0xb82eb8(0xdd)][_0xb82eb8(0xfc)](this);},VisuMZ[_0x173d04(0x108)]['Game_Actor_usableSkills']=Game_Actor[_0x173d04(0x142)][_0x173d04(0x114)],Game_Actor[_0x173d04(0x142)][_0x173d04(0x114)]=function(){const _0x33058d=_0x173d04;let _0x49be79=VisuMZ[_0x33058d(0x108)][_0x33058d(0x102)][_0x33058d(0xfc)](this);return this[_0x33058d(0x13a)]=0x0,_0x49be79=this[_0x33058d(0xfb)](_0x49be79),_0x49be79;},Game_Actor['prototype'][_0x173d04(0xfb)]=function(_0x3181b3){const _0x5672f1=_0x173d04;if(this[_0x5672f1(0x13a)]>=0x64)return _0x3181b3;for(const _0x2d9605 of _0x3181b3){if(!_0x2d9605)continue;if(DataManager[_0x5672f1(0x128)](_0x2d9605)){if('Tfxzw'!==_0x5672f1(0xd3))return _0x3a2396[_0x5672f1(0xdc)]&&_0x228b53['description'][_0x5672f1(0x11f)]('['+_0x37fa04+']');else{let _0x35c757=DataManager[_0x5672f1(0xc6)](this,_0x2d9605);_0x35c757=_0x35c757[_0x5672f1(0x131)](_0x1aea24=>$dataSkills[_0x1aea24]),_0x35c757=_0x35c757[_0x5672f1(0xc9)](_0x26a3e6=>!!_0x26a3e6),_0x35c757=this[_0x5672f1(0xfb)](_0x35c757),_0x3181b3=_0x3181b3[_0x5672f1(0x143)](_0x35c757);}}}return _0x3181b3;},VisuMZ[_0x173d04(0x108)]['Window_SkillList_initialize']=Window_SkillList[_0x173d04(0x142)][_0x173d04(0x110)],Window_SkillList[_0x173d04(0x142)][_0x173d04(0x110)]=function(_0x44b88b){const _0x504a71=_0x173d04;VisuMZ[_0x504a71(0x108)][_0x504a71(0x150)][_0x504a71(0xfc)](this,_0x44b88b),this[_0x504a71(0x13c)]=[];},Window_SkillList['prototype']['addSkillContainerStack']=function(_0x31605c){const _0x46b38f=_0x173d04;this[_0x46b38f(0x13c)][_0x46b38f(0xe1)](_0x31605c),this[_0x46b38f(0x105)](),this[_0x46b38f(0xc7)](0x0);},Window_SkillList[_0x173d04(0x142)][_0x173d04(0xed)]=function(){const _0x18c81c=_0x173d04;if(this[_0x18c81c(0x13c)]['length']<=0x0)return;const _0x4c6cee=this[_0x18c81c(0x13c)][this[_0x18c81c(0x13c)][_0x18c81c(0x14d)]-0x1],_0x3d4cda=_0x4c6cee[_0x18c81c(0x112)]||0x0;this[_0x18c81c(0x13c)][_0x18c81c(0x121)](),this['refresh'](),this['forceSelect'](_0x3d4cda);},Window_SkillList['prototype']['clearSkillContainerStacks']=function(_0xf0a8e3){const _0x34bd64=_0x173d04;if(this[_0x34bd64(0x13c)][_0x34bd64(0x14d)]<=0x0)return;const _0x322dba=this[_0x34bd64(0x13c)][0x0],_0x5e11c2=_0x322dba[_0x34bd64(0x112)]||0x0;this[_0x34bd64(0x13c)]=[],_0xf0a8e3&&(_0x34bd64(0xe2)!=='SNFCR'?(this[_0x34bd64(0x105)](),this[_0x34bd64(0xc7)](_0x5e11c2)):_0x3081e7[_0x34bd64(0x108)][_0x34bd64(0xd4)]['call'](this,_0x526c3d,_0x12a523,_0x3e6b7e,_0x27ed22));},Window_SkillList['prototype'][_0x173d04(0x129)]=function(){const _0x45c0c0=_0x173d04;return this[_0x45c0c0(0x13c)][_0x45c0c0(0x14d)]>0x0;},VisuMZ[_0x173d04(0x108)]['Window_SkillList_makeItemList']=Window_SkillList[_0x173d04(0x142)]['makeItemList'],Window_SkillList['prototype'][_0x173d04(0xd6)]=function(){const _0x2101aa=_0x173d04;this[_0x2101aa(0x129)]()?this[_0x2101aa(0x149)]():VisuMZ[_0x2101aa(0x108)][_0x2101aa(0x151)]['call'](this);},VisuMZ[_0x173d04(0x108)][_0x173d04(0x101)]=Window_SkillList[_0x173d04(0x142)][_0x173d04(0x11f)],Window_SkillList[_0x173d04(0x142)][_0x173d04(0x11f)]=function(_0xe26510){const _0xabcdc2=_0x173d04;if(_0xe26510&&DataManager[_0xabcdc2(0x128)](_0xe26510)){const _0x1e057c=DataManager[_0xabcdc2(0xc6)](this[_0xabcdc2(0xdb)],_0xe26510);if(_0x1e057c[_0xabcdc2(0x14d)]<=0x0)return![];}return VisuMZ[_0xabcdc2(0x108)][_0xabcdc2(0x101)]['call'](this,_0xe26510);},Window_SkillList['prototype']['makeSkillContainerList']=function(){const _0x20e7c3=_0x173d04,_0x367a13=this[_0x20e7c3(0x13c)][this[_0x20e7c3(0x13c)][_0x20e7c3(0x14d)]-0x1],_0x57db8b=_0x367a13[_0x20e7c3(0x11d)],_0x43a579=DataManager[_0x20e7c3(0xc6)](this['_actor'],_0x57db8b);this[_0x20e7c3(0x14b)]=_0x43a579[_0x20e7c3(0x131)](_0x5777ca=>$dataSkills[_0x5777ca])[_0x20e7c3(0xc9)](_0x5b6231=>!!_0x5b6231&&this[_0x20e7c3(0xe8)](_0x5b6231)),Imported[_0x20e7c3(0x123)]&&(_0x20e7c3(0x11a)!==_0x20e7c3(0x11a)?_0x12e74d[_0x20e7c3(0xe1)](_0x3aba07[_0x20e7c3(0xd9)](_0xdedda5)):(this['adjustSideviewUiWidth'](),this[_0x20e7c3(0xe7)](),this['updateSideviewUiPosition']()));},Window_SkillList[_0x173d04(0x142)][_0x173d04(0xe8)]=function(_0x25117c){const _0x1f0d9f=_0x173d04;if(!this[_0x1f0d9f(0x122)](_0x25117c))return![];if(!this[_0x1f0d9f(0xe6)](_0x25117c))return![];return!![];},VisuMZ[_0x173d04(0x108)][_0x173d04(0xd4)]=Window_SkillList[_0x173d04(0x142)]['drawSkillCost'],Window_SkillList['prototype'][_0x173d04(0xf5)]=function(_0x1074e5,_0x342ccc,_0x5c9d96,_0x2fb3b7){const _0x1aea87=_0x173d04;DataManager[_0x1aea87(0x128)](_0x1074e5)?this['drawSkillContainerText'](_0x1074e5,_0x342ccc,_0x5c9d96,_0x2fb3b7):_0x1aea87(0x106)===_0x1aea87(0x124)?this[_0x1aea87(0x13e)]():VisuMZ[_0x1aea87(0x108)][_0x1aea87(0xd4)][_0x1aea87(0xfc)](this,_0x1074e5,_0x342ccc,_0x5c9d96,_0x2fb3b7);},Window_SkillList['prototype']['drawSkillContainerText']=function(_0x515f7f,_0x244588,_0x3949f3,_0x1c708b){const _0x1a465f=_0x173d04;if(!_0x515f7f)return;this[_0x1a465f(0xdf)]();const _0x352aea=TextManager['skillContainerText'],_0x39f712=this['textSizeEx'](_0x352aea)['width'];_0x244588+=_0x1c708b-_0x39f712,this[_0x1a465f(0xe3)](_0x352aea,_0x244588,_0x3949f3,_0x39f712),this[_0x1a465f(0xdf)]();};function _0x2888(){const _0x566bb7=['initialize','_skillWindow','index','EVAL','usableSkills','607420RWEUyS','ARRAYSTRUCT','ConvertParams','462KtusZZ','QMoKx','VCXej','GtZCM','match','skill','KeqLn','includes','split','pop','checkShowHideNotetags','VisuMZ_3_SideviewBattleUI','DUhKh','skillContainerText','JSON','Scene_Skill_onItemOk','isSkillContainer','isShowingSkillContainerList','bMwrj','nYOAf','dnlhQ','XZnVj','trim','version','parse','map','2076Eevetc','log','ForceList','URgNa','8JZGsUV','jchCj','27369dbRnuD','note','_skillContainerLoops','HIDXD','_skillContainerStack','Settings','processSkillContainerOk','KnownList','KywwC','onItemOk','prototype','concat','parameters','UmYHc','_itemWindow','item','Window_ActorCommand_canAddSkillCommand','makeSkillContainerList','NUM','_data','Scene_Battle_onSkillCancel','length','oawIW','STRUCT','Window_SkillList_initialize','Window_SkillList_makeItemList','getSkillContainerList','forceSelect','exit','filter','KvVNU','onItemCancel','ContainerText','textSizeEx','ARRAYJSON','_skillIDs','1509470Puwipf','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','toUpperCase','Tfxzw','Window_SkillList_drawSkillCost','canAddSkillCommand','makeItemList','clearSkillContainerStacks','description','getSkillIdWithName','addSkillContainerStack','_actor','status','Scene_Battle_selectNextCommand','ARRAYFUNC','resetFontSettings','FVkho','push','pWpTQ','drawTextEx','184iPtVyQ','Scene_Skill_onItemCancel','checkShowHideJS','adjustSideviewUiHeight','containerIncludes','dZeMn','ARRAYSTR','name','hasSkill','removeSkillContainerStack','selectNextCommand','activate','ARRAYEVAL','KnownListRange','ARRAYNUM','max','nHwdM','drawSkillCost','ulOhk','jGhZe','processSkillContainerCancel','483072GiTwXq','ForceListRange','addSkillContainerSkills','call','RegExp','format','return\x200','uVOMx','Window_SkillList_includes','Game_Actor_usableSkills','Scene_Battle_onSkillOk','NxKkF','refresh','uXllW','onSkillCancel','SkillContainers','625BfMXrp','test','GnrgI','drawSkillContainerText','onSkillOk','1395009dbkFif','parseSkillContainerList'];_0x2888=function(){return _0x566bb7;};return _0x2888();}Imported['VisuMZ_1_BattleCore']&&(VisuMZ[_0x173d04(0x108)][_0x173d04(0x148)]=Window_ActorCommand['prototype'][_0x173d04(0xd5)],Window_ActorCommand['prototype'][_0x173d04(0xd5)]=function(_0x4e204e){const _0x5d495d=_0x173d04;if(DataManager[_0x5d495d(0x128)](_0x4e204e)){if(_0x5d495d(0x104)!=='EDcWF')return![];else{const _0x6499bd=this['_skillWindow'][_0x5d495d(0x147)]();_0xf569d8[_0x5d495d(0x128)](_0x6499bd)?this[_0x5d495d(0x13e)]():_0xb40ee7['SkillContainers'][_0x5d495d(0x103)][_0x5d495d(0xfc)](this);}}else{if(_0x5d495d(0xf7)===_0x5d495d(0x119)){_0x3d02c1=_0x304248['split'](',')[_0x5d495d(0x131)](_0x3ef885=>_0x3ef885[_0x5d495d(0x12e)]());let _0x429a7b=[];for(let _0xb4a568 of _0x1e789b){_0xb4a568=(_0x58bc05(_0xb4a568)||'')[_0x5d495d(0x12e)]();const _0x2d6d31=/^\d+$/[_0x5d495d(0x10a)](_0xb4a568);_0x2d6d31?_0x429a7b[_0x5d495d(0xe1)](_0x493527(_0xb4a568)):_0x429a7b[_0x5d495d(0xe1)](_0x2a3436[_0x5d495d(0xd9)](_0xb4a568));}return _0x429a7b;}else return VisuMZ[_0x5d495d(0x108)][_0x5d495d(0x148)][_0x5d495d(0xfc)](this,_0x4e204e);}});;