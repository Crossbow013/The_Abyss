//=============================================================================
// VisuStella MZ - Visual Battle Environment
// VisuMZ_2_VisualBattleEnv.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_VisualBattleEnv = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualBattleEnv = VisuMZ.VisualBattleEnv || {};
VisuMZ.VisualBattleEnv.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.07] [VisualBattleEnv]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Battle_Environment_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Add extra layers of images to your battle system for background purposes or
 * foreground purposes. These images can be battlebacks, pictures, parallaxes,
 * whatever you need them to be. Add extra settings to them, such as scrolling,
 * blend modes, different opacity levels, hues, and more.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create battle environment images located behind battlers to function as a
 *   part of the background.
 * * Create battle environment images located in front of battlers to function
 *   as a part of the foreground.
 * * Apply custom settings to them, such as changing their blend modes, their
 *   scrolling speeds, and opacity levels.
 * * Customize their hue and if they have a hue shift at all.
 * * Apply color tones if needed to give more color control.
 * * Alter their opacity levels midway during battle.
 * * An unlimited amounts of back environments and front environments to add to
 *   the battle scene.
 * * Environment images are layered based on their ID's. Lower ID's appear
 *   below while higher ID's appear above.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Back Environment-Type Plugin Commands ===
 * 
 * ---
 *
 * Back Environment: Add/Change
 * - Adds/changes the target back environment.
 * 
 *   Settings:
 *
 *     ID:
 *     - Select the target environment ID to add/change.
 *     - Lower ID's appear below. Higher ID's appear above.
 *
 *     Folder and Filename:
 *     - What is the folder and filename?
 * 
 *   Extra Settings:
 *   - Extra settings that can be altered for the environment object.
 *   - For details, refer to section below.
 *
 *     Duration:
 *     - How many frames would it take to alter settings?
 *
 * ---
 *
 * Back Environment: Fade Opacity
 * - Fades the target back environment(s) opacity to a different value.
 *
 *   ID(s):
 *   - Target which back environment(s)?
 *   - Cannot target the default battlebacks.
 *
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 *
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 *
 * ---
 *
 * Back Environment: Remove
 * - Removes target back environment(s).
 *
 *   ID(s):
 *   - Remove which back environment(s)?
 *   - Cannot remove the default battlebacks.
 *
 * ---
 * 
 * === Front Environment-Type Plugin Commands ===
 * 
 * ---
 *
 * Front Environment: Add/Change
 * - Adds/changes the target front environment.
 * 
 *   Settings:
 *
 *     ID:
 *     - Select the target environment ID to add/change.
 *     - Lower ID's appear below. Higher ID's appear above.
 *
 *     Folder and Filename:
 *     - What is the folder and filename?
 * 
 *   Extra Settings:
 *   - Extra settings that can be altered for the environment object.
 *   - For details, refer to section below.
 *
 *     Duration:
 *     - How many frames would it take to alter settings?
 *
 * ---
 *
 * Front Environment: Fade Opacity
 * - Fades the target front environment(s) opacity to a different value.
 *
 *   ID(s):
 *   - Target which front environment(s)?
 *   - Cannot target the default battlebacks.
 *
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 *
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 *
 * ---
 *
 * Front Environment: Remove
 * - Removes target front environment(s).
 *
 *   ID(s):
 *   - Remove which front environment(s)?
 *   - Cannot remove the default battlebacks.
 *
 * ---
 * 
 * === Extra-Settings ===
 * 
 * ---
 *
 * Extra Settings
 * - These settings are used for both the "Back Environment: Add/Change" and
 *   "Front Environment: Add/Change" Plugin Commands.
 * 
 *   Appearance:
 *
 *     Scale Style:
 *     - The scaling style used for this environment image.
 *       - Battle Core Setting
 *       - MZ (MZ's default style)
 *       - 1:1 (No Scaling)
 *       - Scale To Fit (Scale to screen size)
 *       - Scale Down (Scale Downward if Larger than Screen)
 *       - Scale Up (Scale Upward if Smaller than Screen)
 *
 *     Opacity:
 *     - What is the opacity level for this image?
 *     - You may use JavaScript code.
 *
 *     Blend Mode:
 *     - What kind of blend mode do you wish to apply to the image?
 *     - You may use JavaScript code.
 *       - Normal
 *       - Additive
 *       - Multiply
 *       - Screen
 * 
 *     Hue: 
 *     - Do you wish to adjust this image's hue?
 *     - You may use JavaScript code.
 * 
 *     Hue Shift:
 *     - How much do you want the hue to shift each frame?
 *     - You may use JavaScript code.
 * 
 *     Color Tone:
 *     - What tone do you want for the background?
 *     - Format: [Red, Green, Blue, Gray]
 * 
 *   Scrolling:
 *
 *     Horizontal Scroll:
 *     - What is the horizontal scroll speed?
 *     - Use a negative value to invert the direction.
 *
 *     Vertical Scroll:
 *     - What is the vertical scroll speed?
 *     - Use a negative value to invert the direction.
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
 * Version 1.07: January 27, 2022
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.06: December 16, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ's new subfolders. Update by Irina.
 * 
 * Version 1.05: August 6, 2021
 * * Bug Fixes!
 * ** Environments no longer visibly vanish when changing to the Options or
 *    Party management scenes. Fix made by Irina.
 * 
 * Version 1.04: July 16, 2021
 * * Bug Fixes!
 * ** Games with UI dimensions that are different from screen dimensions should
 *    no longer be affected by the distance difference. Fix made by Irina.
 * 
 * Version 1.03: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 30, 2021
 * * Bug Fixes!
 * ** Added a fail safe for changing color tones in case the value fails to be
 *    an array (it will default to zero tone). Fix made by Arisu.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Crashes should no longer occur when performing a troop transition from
 *    the map. Fix made by Olivia.
 *
 * Version 1.00 Official Release Date: May 10, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BackEnvironmentAddChange
 * @text Back Environment: Add/Change
 * @desc Adds/changes the target back environment.
 *
 * @arg Settings
 *
 * @arg ID:num
 * @text ID
 * @parent Settings
 * @type number
 * @min 1
 * @desc Select the target environment ID to add/change.
 * Lower ID's appear below. Higher ID's appear above.
 * @default 1
 *
 * @arg FolderFilename:str
 * @text Folder and Filename
 * @parent Settings
 * @type file
 * @dir img/
 * @desc What is the folder and filename?
 * @default 
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<Optional>
 * @desc Extra settings that can be altered for the environment object.
 * @default {"Appearance":"","ScaleStyle:str":"BattleCore","blendMode:eval":"0","opacity:eval":"255","Scrolling":"","ScrollHorz:eval":"+0","ScrollVert:eval":"+0"}
 *
 * @arg duration:num
 * @text Duration
 * @parent Extra:struct
 * @type number
 * @min 1
 * @desc How many frames would it take to alter settings?
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BackEnvironmentFade
 * @text Back Environment: Fade Opacity
 * @desc Fades the target back environment(s) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which back environment(s)?
 * Cannot target the default battlebacks.
 * @default ["1"]
 *
 * @arg opacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg duration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BackEnvironmentRemove
 * @text Back Environment: Remove
 * @desc Removes target back environment(s).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which back environment(s)?
 * Cannot remove the default battlebacks.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FrontEnvironmentAddChange
 * @text Front Environment: Add/Change
 * @desc Adds/changes the target front environment.
 *
 * @arg Settings
 *
 * @arg ID:num
 * @text ID
 * @parent Settings
 * @type number
 * @min 1
 * @desc Select the target environment ID to add/change.
 * Lower ID's appear below. Higher ID's appear above.
 * @default 1
 *
 * @arg FolderFilename:str
 * @text Folder and Filename
 * @parent Settings
 * @type file
 * @dir img/
 * @desc What is the folder and filename?
 * @default 
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<Optional>
 * @desc Extra settings that can be altered for the environment object.
 * @default {"Appearance":"","ScaleStyle:str":"BattleCore","blendMode:eval":"0","opacity:eval":"255","Scrolling":"","ScrollHorz:eval":"+0","ScrollVert:eval":"+0"}
 *
 * @arg duration:num
 * @text Duration
 * @parent Extra:struct
 * @type number
 * @min 1
 * @desc How many frames would it take to alter settings?
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FrontEnvironmentFade
 * @text Front Environment: Fade Opacity
 * @desc Fades the target front environment(s) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which front environment(s)?
 * Cannot target the default battlebacks.
 * @default ["1"]
 *
 * @arg opacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg duration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FrontEnvironmentRemove
 * @text Front Environment: Remove
 * @desc Removes target front environment(s).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which front environment(s)?
 * Cannot remove the default battlebacks.
 * @default ["1"]
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
 * @param VisualBattleEnv
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
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
/* ----------------------------------------------------------------------------
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 * 
 * @param Appearance
 *
 * @param ScaleStyle:str
 * @text Scale Style
 * @parent Appearance
 * @type select
 * @option Battle Core Setting
 * @value BattleCore
 * @option MZ (MZ's default style)
 * @value MZ
 * @option 1:1 (No Scaling)
 * @value 1:1
 * @option Scale To Fit (Scale to screen size)
 * @value ScaleToFit
 * @option Scale Down (Scale Downward if Larger than Screen)
 * @value ScaleDown
 * @option Scale Up (Scale Upward if Smaller than Screen)
 * @value ScaleUp
 * @desc The scaling style used for this environment image.
 * @default BattleCore
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this image?
 * You may use JavaScript code.
 * @default 255
 *
 * @param blendMode:eval
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the image?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this image's hue?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hueShift:eval
 * @text Hue Shift
 * @parent hue:eval
 * @desc How much do you want the hue to shift each frame?
 * You may use JavaScript code.
 * @default +0
 *
 * @param colorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the background?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 * 
 * @param Scrolling
 *
 * @param ScrollHorz:eval
 * @text Horizontal Scroll
 * @parent Scrolling
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 *
 * @param ScrollVert:eval
 * @text Vertical Scroll
 * @parent Scrolling
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 *
 */
//=============================================================================

function _0x4596(_0x1978a5,_0x4a7c1e){const _0x3f97d0=_0x3f97();return _0x4596=function(_0x4596d4,_0x3bf1ca){_0x4596d4=_0x4596d4-0x101;let _0x5eb579=_0x3f97d0[_0x4596d4];return _0x5eb579;},_0x4596(_0x1978a5,_0x4a7c1e);}const _0x386057=_0x4596;(function(_0x44b3a2,_0x157bb9){const _0xb50179=_0x4596,_0x49f1ca=_0x44b3a2();while(!![]){try{const _0x4428f2=-parseInt(_0xb50179(0x15d))/0x1+parseInt(_0xb50179(0x183))/0x2+parseInt(_0xb50179(0x135))/0x3*(parseInt(_0xb50179(0x17c))/0x4)+parseInt(_0xb50179(0x15b))/0x5+parseInt(_0xb50179(0x16c))/0x6+parseInt(_0xb50179(0x16b))/0x7*(parseInt(_0xb50179(0x147))/0x8)+-parseInt(_0xb50179(0x156))/0x9*(parseInt(_0xb50179(0x108))/0xa);if(_0x4428f2===_0x157bb9)break;else _0x49f1ca['push'](_0x49f1ca['shift']());}catch(_0x3fbb34){_0x49f1ca['push'](_0x49f1ca['shift']());}}}(_0x3f97,0xafd73));var label=_0x386057(0x121),tier=tier||0x0,dependencies=[_0x386057(0x168)],pluginData=$plugins[_0x386057(0x181)](function(_0x2cf0f1){const _0x394314=_0x386057;return _0x2cf0f1[_0x394314(0x170)]&&_0x2cf0f1['description']['includes']('['+label+']');})[0x0];function _0x3f97(){const _0x321084=['hue','match','_frontEnvironmentSettings','_createColorFilter','_spriteset','Settings','_id','split','FrontEnvironmentFade','createBattleback','find','VisuMZ_2_WeatherEffects','map','getBattleEnvironmentContainer','16504uDWNjS','max','FrontEnvironmentAddChange','isPreviousSceneBattleTransitionable','ConvertParams','createWeather','Extra','prototype','ARRAYFUNC','Folder','list','getBackEnvironmentSettings','Battleback','createSpriteset','version','9396rcGbme','removeChild','BackEnvironmentAddChange','FolderFilename','ScaleUp','4975520svigDW','addLoadListener','844266LttIRu','_backEnvironmentSettings','BackEnvironmentFade','Scene_Battle_createSpriteset','description','filters','_frontEnvironmentContainer','battleback1Bitmap','ARRAYJSON','_backEnvironmentContainer','_updateColorFilter','VisuMZ_1_BattleCore','children','return\x200','231yfkvmz','5798118bHyVFI','ARRAYSTRUCT','adjustPosition_ScaleDown','colorTone','status','format','Spriteset_Battle_update','JSON','trim','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','loadBitmap','restoreVisualBattleEnv','adjustPosition','sort','updateBattleEnvironmentSprite','blendMode','1684azTSJo','getBattleEnvironmentSprite','ScrollVert','setColorTone','setupVisualBattleEnvironment','filter','1:1','1588744kXJxRv','_filename','createBattleEnvironmentSprite','ScaleStyle','_scene','Sprite_Battleback_adjustPosition','Spriteset_Battle_createWeather','NUM','name','14390jaGLpl','setBackEnvironmentSettings','push','getFrontEnvironmentSettings','_front','createFrontEnvironmentContainer','initialize','_colorFilter','updateBlendMode','updateOpacity','updateScrolling','call','create','exit','adjustPosition_1for1','createBackEnvironmentContainer','updateBitmap','BattleCore','parse','opacity','ARRAYNUM','setFrontEnvironmentSettings','makeDeepCopy','processBitmap','Game_Troop_setup','VisualBattleEnv','_battleField','isSceneBattle','pop','ScrollHorz','toUpperCase','addChild','setup','settings','registerCommand','ScaleDown','FUNC','_baseSprite','adjustPosition_ScaleUp','update','Spriteset_Battle_createBattleback','join','origin','Filename','ScaleToFit','1731dAaniX','duration','hueShift','AdjustSettings'];_0x3f97=function(){return _0x321084;};return _0x3f97();}VisuMZ[label][_0x386057(0x13e)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x386057(0x14b)]=function(_0x55c643,_0x1b3dda){const _0x3555ae=_0x386057;for(const _0x2b1c76 in _0x1b3dda){if(_0x2b1c76[_0x3555ae(0x13a)](/(.*):(.*)/i)){const _0x3ff1cc=String(RegExp['$1']),_0x2f75cd=String(RegExp['$2'])[_0x3555ae(0x126)]()[_0x3555ae(0x174)]();let _0x57f112,_0x3e2e6d,_0x5e4daf;switch(_0x2f75cd){case _0x3555ae(0x106):_0x57f112=_0x1b3dda[_0x2b1c76]!==''?Number(_0x1b3dda[_0x2b1c76]):0x0;break;case _0x3555ae(0x11c):_0x3e2e6d=_0x1b3dda[_0x2b1c76]!==''?JSON['parse'](_0x1b3dda[_0x2b1c76]):[],_0x57f112=_0x3e2e6d['map'](_0x148510=>Number(_0x148510));break;case'EVAL':_0x57f112=_0x1b3dda[_0x2b1c76]!==''?eval(_0x1b3dda[_0x2b1c76]):null;break;case'ARRAYEVAL':_0x3e2e6d=_0x1b3dda[_0x2b1c76]!==''?JSON[_0x3555ae(0x11a)](_0x1b3dda[_0x2b1c76]):[],_0x57f112=_0x3e2e6d[_0x3555ae(0x145)](_0x351657=>eval(_0x351657));break;case _0x3555ae(0x173):_0x57f112=_0x1b3dda[_0x2b1c76]!==''?JSON['parse'](_0x1b3dda[_0x2b1c76]):'';break;case _0x3555ae(0x165):_0x3e2e6d=_0x1b3dda[_0x2b1c76]!==''?JSON[_0x3555ae(0x11a)](_0x1b3dda[_0x2b1c76]):[],_0x57f112=_0x3e2e6d[_0x3555ae(0x145)](_0x3a181f=>JSON[_0x3555ae(0x11a)](_0x3a181f));break;case _0x3555ae(0x12c):_0x57f112=_0x1b3dda[_0x2b1c76]!==''?new Function(JSON[_0x3555ae(0x11a)](_0x1b3dda[_0x2b1c76])):new Function(_0x3555ae(0x16a));break;case _0x3555ae(0x14f):_0x3e2e6d=_0x1b3dda[_0x2b1c76]!==''?JSON[_0x3555ae(0x11a)](_0x1b3dda[_0x2b1c76]):[],_0x57f112=_0x3e2e6d[_0x3555ae(0x145)](_0x304ffa=>new Function(JSON['parse'](_0x304ffa)));break;case'STR':_0x57f112=_0x1b3dda[_0x2b1c76]!==''?String(_0x1b3dda[_0x2b1c76]):'';break;case'ARRAYSTR':_0x3e2e6d=_0x1b3dda[_0x2b1c76]!==''?JSON[_0x3555ae(0x11a)](_0x1b3dda[_0x2b1c76]):[],_0x57f112=_0x3e2e6d[_0x3555ae(0x145)](_0x17b2dc=>String(_0x17b2dc));break;case'STRUCT':_0x5e4daf=_0x1b3dda[_0x2b1c76]!==''?JSON['parse'](_0x1b3dda[_0x2b1c76]):{},_0x57f112=VisuMZ[_0x3555ae(0x14b)]({},_0x5e4daf);break;case _0x3555ae(0x16d):_0x3e2e6d=_0x1b3dda[_0x2b1c76]!==''?JSON[_0x3555ae(0x11a)](_0x1b3dda[_0x2b1c76]):[],_0x57f112=_0x3e2e6d[_0x3555ae(0x145)](_0x3c6c04=>VisuMZ[_0x3555ae(0x14b)]({},JSON[_0x3555ae(0x11a)](_0x3c6c04)));break;default:continue;}_0x55c643[_0x3ff1cc]=_0x57f112;}}return _0x55c643;},(_0x284fc5=>{const _0x735a31=_0x386057,_0x14b985=_0x284fc5[_0x735a31(0x107)];for(const _0x154f8e of dependencies){if(!Imported[_0x154f8e]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x735a31(0x171)](_0x14b985,_0x154f8e)),SceneManager['exit']();break;}}const _0x3aeef1=_0x284fc5[_0x735a31(0x161)];if(_0x3aeef1[_0x735a31(0x13a)](/\[Version[ ](.*?)\]/i)){const _0x5bb7e1=Number(RegExp['$1']);_0x5bb7e1!==VisuMZ[label][_0x735a31(0x155)]&&(alert(_0x735a31(0x175)[_0x735a31(0x171)](_0x14b985,_0x5bb7e1)),SceneManager[_0x735a31(0x115)]());}if(_0x3aeef1[_0x735a31(0x13a)](/\[Tier[ ](\d+)\]/i)){const _0x24faee=Number(RegExp['$1']);_0x24faee<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x735a31(0x171)](_0x14b985,_0x24faee,tier)),SceneManager['exit']()):tier=Math[_0x735a31(0x148)](_0x24faee,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x735a31(0x13e)],_0x284fc5['parameters']);})(pluginData),VisuMZ[_0x386057(0x121)]['AdjustSettings']=function(_0x156a58){const _0x3a6f40=_0x386057;_0x156a58=JsonEx['makeDeepCopy'](_0x156a58);if(_0x156a58['FolderFilename']){const _0x999a19=_0x156a58[_0x3a6f40(0x159)][_0x3a6f40(0x140)]('/');_0x156a58['Filename']=_0x999a19[_0x3a6f40(0x124)](),_0x156a58[_0x3a6f40(0x150)]=_0x999a19[_0x3a6f40(0x131)]('/');}else _0x156a58[_0x3a6f40(0x150)]='',_0x156a58[_0x3a6f40(0x133)]='';return _0x156a58[_0x3a6f40(0x14d)]=_0x156a58[_0x3a6f40(0x14d)]||{},_0x156a58[_0x3a6f40(0x14d)]['ScaleStyle']=_0x156a58[_0x3a6f40(0x14d)][_0x3a6f40(0x102)]??_0x3a6f40(0x119),_0x156a58[_0x3a6f40(0x14d)][_0x3a6f40(0x17b)]=_0x156a58[_0x3a6f40(0x14d)]['blendMode']??0x0,_0x156a58['Extra'][_0x3a6f40(0x11b)]=_0x156a58[_0x3a6f40(0x14d)][_0x3a6f40(0x11b)]??0xff,_0x156a58['Extra'][_0x3a6f40(0x125)]=_0x156a58[_0x3a6f40(0x14d)][_0x3a6f40(0x125)]??0x0,_0x156a58[_0x3a6f40(0x14d)]['ScrollVert']=_0x156a58[_0x3a6f40(0x14d)][_0x3a6f40(0x17e)]??0x0,_0x156a58;},PluginManager[_0x386057(0x12a)](pluginData[_0x386057(0x107)],_0x386057(0x158),_0x119fb2=>{const _0x17960a=_0x386057;if(!SceneManager[_0x17960a(0x123)]())return;VisuMZ[_0x17960a(0x14b)](_0x119fb2,_0x119fb2);const _0x8c8f30=VisuMZ[_0x17960a(0x121)][_0x17960a(0x138)](_0x119fb2);if(_0x8c8f30[_0x17960a(0x150)][_0x17960a(0x174)]()===''||_0x8c8f30['Filename']==='')return;const _0x137807=_0x8c8f30['ID']||0x0;$gameTroop[_0x17960a(0x109)](_0x137807,_0x8c8f30);}),PluginManager['registerCommand'](pluginData['name'],_0x386057(0x15f),_0x45144e=>{const _0x49b0cf=_0x386057;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x49b0cf(0x14b)](_0x45144e,_0x45144e);const _0x1bb736=_0x45144e[_0x49b0cf(0x11b)],_0x409b3a=_0x45144e['duration'];for(const _0x55e359 of _0x45144e['list']){const _0x1b8899=$gameTroop[_0x49b0cf(0x152)](_0x55e359);_0x1b8899[_0x49b0cf(0x14d)]['opacity']=_0x1bb736,_0x1b8899[_0x49b0cf(0x136)]=_0x409b3a;}}),PluginManager[_0x386057(0x12a)](pluginData[_0x386057(0x107)],'BackEnvironmentRemove',_0x10ccf7=>{const _0x1bbe33=_0x386057;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x1bbe33(0x14b)](_0x10ccf7,_0x10ccf7);const _0x251356=SceneManager[_0x1bbe33(0x103)]['_spriteset'],_0x43f125=![];for(const _0x2b4531 of _0x10ccf7[_0x1bbe33(0x151)]){_0x251356['removeBattleEnvironmentSprite'](_0x2b4531,_0x43f125);}}),PluginManager[_0x386057(0x12a)](pluginData['name'],_0x386057(0x149),_0x228d1e=>{const _0x400398=_0x386057;if(!SceneManager[_0x400398(0x123)]())return;VisuMZ[_0x400398(0x14b)](_0x228d1e,_0x228d1e);const _0x37d8c3=VisuMZ[_0x400398(0x121)][_0x400398(0x138)](_0x228d1e);if(_0x37d8c3['Folder']['trim']()===''||_0x37d8c3[_0x400398(0x133)]==='')return;const _0x16fb0a=_0x37d8c3['ID']||0x0;$gameTroop[_0x400398(0x11d)](_0x16fb0a,_0x37d8c3);}),PluginManager[_0x386057(0x12a)](pluginData[_0x386057(0x107)],_0x386057(0x141),_0x5bf4f8=>{const _0x57ab63=_0x386057;if(!SceneManager[_0x57ab63(0x123)]())return;VisuMZ['ConvertParams'](_0x5bf4f8,_0x5bf4f8);const _0x349cbd=_0x5bf4f8[_0x57ab63(0x11b)],_0x52e32d=_0x5bf4f8[_0x57ab63(0x136)];for(const _0x43b7bd of _0x5bf4f8[_0x57ab63(0x151)]){const _0x4b1e7c=$gameTroop[_0x57ab63(0x10b)](_0x43b7bd);_0x4b1e7c['Extra']['opacity']=_0x349cbd,_0x4b1e7c['duration']=_0x52e32d;}}),PluginManager[_0x386057(0x12a)](pluginData[_0x386057(0x107)],'FrontEnvironmentRemove',_0x3a1764=>{const _0x2c238b=_0x386057;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x3a1764,_0x3a1764);const _0x4379b1=SceneManager[_0x2c238b(0x103)][_0x2c238b(0x13d)],_0x180017=!![];for(const _0x4fa2b3 of _0x3a1764['list']){_0x4379b1['removeBattleEnvironmentSprite'](_0x4fa2b3,_0x180017);}}),VisuMZ[_0x386057(0x121)]['RegExp']={'Type1':/<(?:NOTETAG):[ ](\d+)([%％])>/i,'Type2':/<(?:NOTETAG):[ ]([\+\-]\d+)>/i,'Type3':/<(?:NOTETAG):[ ](.*)>/i,'Type3nonGreedy':/<(?:NOTETAG):[ ](.*?)>/i,'Type4':/<(?:NOTETAG):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'Type5':/<(?:NOTETAG):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i,'Type6':/<(?:NOTETAG)>/i,'Type7':/<\/(?:NOTETAG)>/i,'Type8':/<(?:NOTETAG)>\s*([\s\S]*)\s*<\/(?:NOTETAG)>/i},VisuMZ['VisualBattleEnv'][_0x386057(0x120)]=Game_Troop[_0x386057(0x14e)][_0x386057(0x128)],Game_Troop[_0x386057(0x14e)][_0x386057(0x128)]=function(_0x4cd692){const _0xce2f0=_0x386057;VisuMZ['VisualBattleEnv']['Game_Troop_setup']['call'](this,_0x4cd692),this[_0xce2f0(0x180)]();},Game_Troop[_0x386057(0x14e)][_0x386057(0x180)]=function(){const _0xdedadc=_0x386057;this[_0xdedadc(0x15e)]=[],this['_frontEnvironmentSettings']=[];},Game_Troop[_0x386057(0x14e)]['getBackEnvironmentSettings']=function(_0x179302){const _0x1c2b4d=_0x386057;return this['_backEnvironmentSettings']===undefined&&this[_0x1c2b4d(0x180)](),this[_0x1c2b4d(0x15e)][_0x179302]=this[_0x1c2b4d(0x15e)][_0x179302]||{},this[_0x1c2b4d(0x15e)][_0x179302];},Game_Troop[_0x386057(0x14e)][_0x386057(0x109)]=function(_0x2cec64,_0x3e587d){const _0x3a77d5=_0x386057;this[_0x3a77d5(0x15e)]===undefined&&this[_0x3a77d5(0x180)]();this[_0x3a77d5(0x15e)][_0x2cec64]=JsonEx[_0x3a77d5(0x11e)](_0x3e587d);if(SceneManager[_0x3a77d5(0x123)]()){const _0x39d44d=SceneManager[_0x3a77d5(0x103)][_0x3a77d5(0x13d)];_0x39d44d[_0x3a77d5(0x17a)](_0x2cec64,![]);}},Game_Troop[_0x386057(0x14e)]['getFrontEnvironmentSettings']=function(_0x5ef828){const _0x48764e=_0x386057;return this[_0x48764e(0x13b)]===undefined&&this[_0x48764e(0x180)](),this[_0x48764e(0x13b)][_0x5ef828]=this[_0x48764e(0x13b)][_0x5ef828]||{},this[_0x48764e(0x13b)][_0x5ef828];},Game_Troop['prototype'][_0x386057(0x11d)]=function(_0x1e56c4,_0x512231){const _0x37e544=_0x386057;this[_0x37e544(0x13b)]===undefined&&this[_0x37e544(0x180)]();this[_0x37e544(0x13b)][_0x1e56c4]=JsonEx[_0x37e544(0x11e)](_0x512231);if(SceneManager[_0x37e544(0x123)]()){const _0x57c9bb=SceneManager[_0x37e544(0x103)]['_spriteset'];_0x57c9bb[_0x37e544(0x17a)](_0x1e56c4,!![]);}},VisuMZ[_0x386057(0x121)][_0x386057(0x160)]=Scene_Battle[_0x386057(0x14e)][_0x386057(0x154)],Scene_Battle[_0x386057(0x14e)][_0x386057(0x154)]=function(){const _0x9ad93e=_0x386057;VisuMZ[_0x9ad93e(0x121)][_0x9ad93e(0x160)]['call'](this),this[_0x9ad93e(0x177)]();},Scene_Battle[_0x386057(0x14e)][_0x386057(0x177)]=function(){const _0x2a08b3=_0x386057;if(!SceneManager[_0x2a08b3(0x14a)]())return;const _0x5a6a98=$gameTroop['_backEnvironmentSettings']||[];for(const _0x3c5ae9 of _0x5a6a98){if(!_0x3c5ae9)continue;const _0x52f93d=_0x3c5ae9['ID'];_0x3c5ae9[_0x2a08b3(0x136)]=0x1,$gameTroop['setBackEnvironmentSettings'](_0x52f93d,_0x3c5ae9);}const _0x53a0ba=$gameTroop[_0x2a08b3(0x13b)]||[];for(const _0x414ee6 of _0x53a0ba){if(!_0x414ee6)continue;const _0x2d2d6a=_0x414ee6['ID'];_0x414ee6[_0x2a08b3(0x136)]=0x1,$gameTroop[_0x2a08b3(0x11d)](_0x2d2d6a,_0x414ee6);}};function Sprite_BattleEnvironment(){const _0x4f6bf6=_0x386057;this[_0x4f6bf6(0x10e)](...arguments);}Sprite_BattleEnvironment['prototype']=Object[_0x386057(0x114)](Sprite_Battleback[_0x386057(0x14e)]),Sprite_BattleEnvironment[_0x386057(0x14e)]['constructor']=Sprite_BattleEnvironment,Sprite_BattleEnvironment[_0x386057(0x14e)][_0x386057(0x10e)]=function(_0x1cdb1a,_0x541f8b){const _0x622271=_0x386057;this[_0x622271(0x13f)]=_0x1cdb1a,this[_0x622271(0x10c)]=_0x541f8b,Sprite_Battleback[_0x622271(0x14e)][_0x622271(0x10e)][_0x622271(0x113)](this,0x0),this[_0x622271(0x13c)](),this[_0x622271(0x11b)]=0x0;},Sprite_BattleEnvironment[_0x386057(0x14e)][_0x386057(0x164)]=function(){},Sprite_BattleEnvironment[_0x386057(0x14e)][_0x386057(0x13c)]=function(){const _0x3fa005=_0x386057;!this[_0x3fa005(0x10f)]&&(this[_0x3fa005(0x10f)]=new ColorFilter()),!this[_0x3fa005(0x162)]&&(this[_0x3fa005(0x162)]=[]),this[_0x3fa005(0x162)][_0x3fa005(0x10a)](this['_colorFilter']);},Sprite_BattleEnvironment[_0x386057(0x14e)][_0x386057(0x129)]=function(){const _0x3c2dae=_0x386057;return this[_0x3c2dae(0x10c)]?$gameTroop[_0x3c2dae(0x10b)](this[_0x3c2dae(0x13f)]):$gameTroop[_0x3c2dae(0x152)](this[_0x3c2dae(0x13f)]);},Sprite_BattleEnvironment[_0x386057(0x14e)]['update']=function(){const _0x5dc6dd=_0x386057;Sprite_Battleback[_0x5dc6dd(0x14e)][_0x5dc6dd(0x12f)][_0x5dc6dd(0x113)](this),this[_0x5dc6dd(0x118)](),this[_0x5dc6dd(0x110)](),this[_0x5dc6dd(0x111)](),this[_0x5dc6dd(0x112)](),this[_0x5dc6dd(0x167)]();},Sprite_BattleEnvironment[_0x386057(0x14e)]['updateBitmap']=function(){const _0x1ceda2=_0x386057,_0x5f50ef=this[_0x1ceda2(0x129)]();if(!_0x5f50ef)return;if(this['_folder']===_0x5f50ef['Folder']&&this[_0x1ceda2(0x184)]===_0x5f50ef[_0x1ceda2(0x133)])return;this['_folder']=_0x5f50ef['Folder'],this[_0x1ceda2(0x184)]=_0x5f50ef[_0x1ceda2(0x133)];const _0x1b2e39='img/%1/'[_0x1ceda2(0x171)](this['_folder'][_0x1ceda2(0x174)]()),_0x27790f=ImageManager[_0x1ceda2(0x176)](_0x1b2e39,this['_filename'][_0x1ceda2(0x174)]());_0x27790f[_0x1ceda2(0x15c)](this[_0x1ceda2(0x11f)]['bind'](this,_0x27790f));},Sprite_BattleEnvironment[_0x386057(0x14e)]['processBitmap']=function(_0x125ee4){const _0x142378=_0x386057;this['bitmap']=_0x125ee4,this['adjustPosition'](),this[_0x142378(0x132)]['x']=0x0,this[_0x142378(0x132)]['y']=0x0;},Sprite_BattleEnvironment['prototype'][_0x386057(0x178)]=function(){const _0x44492f=_0x386057,_0x3629ba=this[_0x44492f(0x129)]();if(!_0x3629ba)return;let _0x58eec1=_0x3629ba[_0x44492f(0x14d)][_0x44492f(0x102)]||_0x44492f(0x119);_0x58eec1==='BattleCore'&&(_0x58eec1=VisuMZ[_0x44492f(0x119)][_0x44492f(0x13e)][_0x44492f(0x153)]['DefaultStyle']||'MZ');switch(_0x58eec1){case'MZ':VisuMZ[_0x44492f(0x119)][_0x44492f(0x104)]['call'](this);break;case _0x44492f(0x182):this[_0x44492f(0x116)]();break;case _0x44492f(0x134):this['adjustPosition_ScaleToFit']();break;case _0x44492f(0x12b):this[_0x44492f(0x16e)]();break;case _0x44492f(0x15a):this[_0x44492f(0x12e)]();break;}},Sprite_BattleEnvironment[_0x386057(0x14e)][_0x386057(0x110)]=function(){const _0xe3834d=_0x386057,_0x406cbd=this[_0xe3834d(0x129)]();if(!_0x406cbd)return;this[_0xe3834d(0x17b)]!==_0x406cbd[_0xe3834d(0x14d)][_0xe3834d(0x17b)]&&(this[_0xe3834d(0x17b)]=_0x406cbd['Extra'][_0xe3834d(0x17b)]);},Sprite_BattleEnvironment[_0x386057(0x14e)][_0x386057(0x111)]=function(){const _0x1d79b1=_0x386057,_0x2bef8b=this[_0x1d79b1(0x129)]();if(!_0x2bef8b)return;if(_0x2bef8b[_0x1d79b1(0x136)]>0x0){const _0x3a6994=_0x2bef8b['duration'],_0x580ae8=_0x2bef8b['Extra'][_0x1d79b1(0x11b)];this[_0x1d79b1(0x11b)]=(this['opacity']*(_0x3a6994-0x1)+_0x580ae8)/_0x3a6994,_0x2bef8b[_0x1d79b1(0x136)]--;}},Sprite_BattleEnvironment[_0x386057(0x14e)][_0x386057(0x112)]=function(){const _0x1dc19b=_0x386057,_0x4ddab9=this['settings']();if(!_0x4ddab9)return;this[_0x1dc19b(0x132)]['x']+=_0x4ddab9[_0x1dc19b(0x14d)][_0x1dc19b(0x125)],this[_0x1dc19b(0x132)]['y']+=_0x4ddab9[_0x1dc19b(0x14d)]['ScrollVert'];},Sprite_BattleEnvironment['prototype'][_0x386057(0x167)]=function(){const _0x3e987a=_0x386057,_0x3cded3=this[_0x3e987a(0x129)]();if(!_0x3cded3)return;!this['_colorFilter']&&this['_createColorFilter']();this[_0x3e987a(0x10f)]['setHue'](_0x3cded3[_0x3e987a(0x14d)][_0x3e987a(0x139)]);try{this[_0x3e987a(0x10f)][_0x3e987a(0x17f)](_0x3cded3[_0x3e987a(0x14d)][_0x3e987a(0x16f)]||[0x0,0x0,0x0,0x0]);}catch(_0x48dab3){this[_0x3e987a(0x10f)][_0x3e987a(0x17f)]([0x0,0x0,0x0,0x0]);}_0x3cded3[_0x3e987a(0x14d)]['hue']+=_0x3cded3[_0x3e987a(0x14d)][_0x3e987a(0x137)];},VisuMZ['VisualBattleEnv'][_0x386057(0x130)]=Spriteset_Battle['prototype'][_0x386057(0x142)],Spriteset_Battle[_0x386057(0x14e)][_0x386057(0x142)]=function(){const _0x3479d3=_0x386057;VisuMZ[_0x3479d3(0x121)][_0x3479d3(0x130)][_0x3479d3(0x113)](this),this[_0x3479d3(0x117)]();},Spriteset_Battle[_0x386057(0x14e)][_0x386057(0x117)]=function(){const _0x16464c=_0x386057;this[_0x16464c(0x166)]=new Sprite(),this[_0x16464c(0x12d)]['addChild'](this[_0x16464c(0x166)]);},VisuMZ[_0x386057(0x121)][_0x386057(0x105)]=Spriteset_Battle['prototype'][_0x386057(0x14c)],Spriteset_Battle[_0x386057(0x14e)]['createWeather']=function(){const _0x24a684=_0x386057;if(!Imported[_0x24a684(0x144)])this[_0x24a684(0x10d)]();VisuMZ[_0x24a684(0x121)][_0x24a684(0x105)][_0x24a684(0x113)](this);},Spriteset_Battle[_0x386057(0x14e)][_0x386057(0x10d)]=function(){const _0x58e2ac=_0x386057;this[_0x58e2ac(0x163)]=new Sprite(),this['_battleField'][_0x58e2ac(0x127)](this[_0x58e2ac(0x163)]),this[_0x58e2ac(0x163)]['x']=-this[_0x58e2ac(0x122)]['x'],this['_frontEnvironmentContainer']['y']=-this[_0x58e2ac(0x122)]['y'];},VisuMZ[_0x386057(0x121)][_0x386057(0x172)]=Spriteset_Battle[_0x386057(0x14e)][_0x386057(0x12f)],Spriteset_Battle['prototype'][_0x386057(0x12f)]=function(){const _0x1a5784=_0x386057;VisuMZ['VisualBattleEnv'][_0x1a5784(0x172)]['call'](this);},Spriteset_Battle[_0x386057(0x14e)]['updateBattleEnvironmentContainers']=function(){const _0x54d10c=_0x386057;if(this[_0x54d10c(0x163)]){}},Spriteset_Battle[_0x386057(0x14e)]['getBattleEnvironmentContainer']=function(_0x41e324){const _0x9b1b22=_0x386057;return _0x41e324?this[_0x9b1b22(0x163)]:this[_0x9b1b22(0x166)];},Spriteset_Battle[_0x386057(0x14e)][_0x386057(0x17d)]=function(_0x16c224,_0x4a47c5){const _0x19d6af=_0x386057,_0x28ac34=this[_0x19d6af(0x146)](_0x4a47c5);return _0x28ac34[_0x19d6af(0x169)][_0x19d6af(0x143)](_0x484640=>_0x484640['_id']===_0x16c224);},Spriteset_Battle['prototype'][_0x386057(0x17a)]=function(_0x361966,_0xc97a66){const _0x30ee1b=_0x386057,_0x33107a=this['getBattleEnvironmentContainer'](_0xc97a66);if(!_0x33107a)return;!this[_0x30ee1b(0x17d)](_0x361966,_0xc97a66)&&this[_0x30ee1b(0x101)](_0x361966,_0xc97a66);},Spriteset_Battle[_0x386057(0x14e)]['createBattleEnvironmentSprite']=function(_0x11649d,_0x1ab7dc){const _0x2a4d75=_0x386057,_0x30fe84=this[_0x2a4d75(0x146)](_0x1ab7dc);if(!_0x30fe84)return;if(!this['getBattleEnvironmentSprite'](_0x11649d,_0x1ab7dc)){const _0x5cc50d=new Sprite_BattleEnvironment(_0x11649d,_0x1ab7dc);_0x30fe84['addChild'](_0x5cc50d),_0x30fe84[_0x2a4d75(0x169)][_0x2a4d75(0x179)]((_0x30626e,_0x1fde55)=>_0x30626e[_0x2a4d75(0x13f)]-_0x1fde55[_0x2a4d75(0x13f)]);}},Spriteset_Battle['prototype']['removeBattleEnvironmentSprite']=function(_0x363a34,_0x4b174a){const _0x3dddbf=_0x386057,_0x2a964f=this[_0x3dddbf(0x146)](_0x4b174a);if(!_0x2a964f)return;const _0x23976b=this[_0x3dddbf(0x17d)](_0x363a34,_0x4b174a);_0x23976b&&(_0x2a964f[_0x3dddbf(0x157)](_0x23976b),_0x2a964f[_0x3dddbf(0x169)][_0x3dddbf(0x179)]((_0x38a59e,_0x4c8aab)=>_0x38a59e[_0x3dddbf(0x13f)]-_0x4c8aab['_id']));};