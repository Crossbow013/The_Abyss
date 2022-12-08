//=============================================================================
// VisuStella MZ - Break Shields
// VisuMZ_4_BreakShields.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_BreakShields = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BreakShields = VisuMZ.BreakShields || {};
VisuMZ.BreakShields.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.01] [BreakShields]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Break_Shields_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin introduces a new mechanic called Break Shields. Actors and/or
 * enemies can have them. Whenever a battler is struck with an elemental
 * weakness, their Break Shield is reduced by 1 (unless modified by a notetag).
 * Once the battler's Break Shield reaches a score of 0, a state is then
 * applied to the battler (usually a stun state). Once the Break state wears
 * off, the battler will regain their Break Shields again. This can be used to
 * create complex battle depth for your game.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Control how Break Shields are calculated alongside how many hits are
 *   required for each actor and/or enemy to enter the Break Stun state.
 * * Display the Break Shields on the screen and relay the information to your
 *   players through icons.
 * * Play animations when hitting a weakness and reducing Break Shields.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * Two of the animation Plugin Parameters require the Core Engine to play them.
 * This is due to how the Core Engine allows playing animations without halting
 * the battle system to allow for a seamless flow despite relaying the Break
 * Shield reduction visual feedback.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins. Here is a list
 * of the ones this plugin is not compatible with.
 *
 * ---
 *
 * VisuMZ_2_BattleSystemSTB
 * 
 * The Break Shields plugin can be used together with Battle System - STB.
 * However, it cannot be used together with the STB Exploit system. This is
 * because both Break Shields and the Exploit system function under similar
 * mechanics and will conflict. However, if STB's Exploit system is turned off,
 * then you can use all of the Break Shield plugin's features fully.
 *
 * ---
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
 * === Break Shield Calculation-Related Notetags ===
 * 
 * ---
 *
 * <Break Shields: x>
 *
 * - Used for: Actor, Class, Enemy Notetags
 * - Declares the base amount of Break Shields this battler will have.
 * - This will ignore the default setting from the Plugin Parameters.
 * - Replace 'x' with a number representing the base amount of Break Shields to
 *   give this battler.
 * - If both the Actor and Class database object has this notetag, priority
 *   will be given to the Class before the Actor.
 *
 * ---
 *
 * <Break Shields: +x>
 * <Break Shields: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Allows trait objects to alter the amount of Break Shields battlers have
 *   whenever their Break Shields are reset.
 * - Replace 'x' with a number representing the Break Shields to increase or
 *   decrease the amount by.
 * - Total Break Shields cannot go under 1 and cannot go whatever the maximum
 *   is declared inside the Plugin Parameters.
 *
 * ---
 * 
 * === Break Shield Alteration-Related Notetags ===
 * 
 * ---
 *
 * <Break Reduce: x>
 *
 * - Used for: Skill, Item Notetags
 * - Reduces the target's Break Shield by x if this action hits a weakness.
 * - This will ignore the default setting from the Plugin Parameters.
 * - Replace 'x' with a number to determine how many Break Shields to reduce.
 * - If Break Shields reach 0, the target will enter a Stun state.
 *
 * ---
 *
 * <Change Break Shield: x>
 *
 * - Used for: Skill, Item Notetags
 * - This will change the target battler's Break Shield value to x if the
 *   battler isn't currently stunned.
 * - No effect if you don't use this notetag.
 * - Replace 'x' with a number value to change the target battler's Break
 *   Shield value to.
 *
 * ---
 *
 * <Increase Break Shield: +x>
 * <Decrease Break Shield: -x>
 *
 * - Used for: Skill, Item Notetags
 * - This will either increase the target battler's break shield by x or
 *   decrease the target battler's break shield by x.
 * - Happens after the Change Break Shield notetag.
 * - No effect if you don't use this notetag.
 * - Replace 'x' with a number value representing the amount to alter the
 *   target's Break Shields by.
 *
 * ---
 * 
 * === Element-Related Notetags ===
 * 
 * ---
 *
 * <Protect Element: id>
 * <Protect Elements: id, id, id>
 * 
 * <Protect Element: name>
 * <Protect Elements: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Specified element(s) will be guarded and Break Shields cannot be reduced
 *   when struck with that element (as long as the requirement is above 100%).
 * - The element rate for those will cap at 100%, preventing extra damage from
 *   being dealt despite having weaknesses, although custom JS effects will
 *   bypass this.
 * - Replace 'id' with a number value representing the ID(s) of the element(s).
 * - Replace 'name' with the name(s) of the element(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Customize the mechanical settings for Break Shields.
 *
 * ---
 *
 * Break Shields
 * 
 *   Affect: Actors?:
 *   - Do Break Shields affect actors?
 * 
 *   Affect: Enemies?:
 *   - Do Break Shields affect actors?
 * 
 *   Base Shield Value:
 *   - The starting amount of shields a battler has.
 *   - Can be altered through notetags.
 * 
 *   Maximum Shields:
 *   - The maximum amount of shields a battler can have.
 *   - This is a hard cap.
 * 
 *   Stun State ID:
 *   - This is the state to be applied when all Break Shields are reduced to 0.
 *
 * ---
 *
 * Animation
 * 
 *   Reduce Animation ID:
 *   - Play this animation when Break Shields are reduced.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Stun Animation ID:
 *   - Play this animation when Break Stun is achieved.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Weaknesses
 * 
 *   Minimum Rate:
 *   - What is the minimum element rate for an attack to be considered striking
 *     a weakness?
 * 
 *   Default Reduction:
 *   - Default reduction amount for Break Shields when striking an elemental
 *     weakness.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * Customize the UI settings for Break Shields.
 *
 * ---
 *
 * Icons
 * 
 *   Break Shield Icon:
 *   - Icon used to represent Break Shields.
 * 
 *   Stun State Icon:
 *   - Icon used to represent Break Stun if the Break Stun state does NOT have
 *     an icon assigned to it.
 * 
 *     Show Turns?:
 *     - Show how many turns are remaining with the Break Stun?
 * 
 *   Protect Icon:
 *   - Icon used to represent Protected Elements.
 *   - Used for other plugins.
 * 
 *   Font Size:
 *   - What is the font size used to display the turns and Break Shields
 *     remaining?
 *
 * ---
 *
 * Battlers > Actors/Enemies
 * 
 *   Show Battler Icon?:
 *   - Show Break Shield icons on the SV_Actor/enemy battlers?
 * 
 *   Position:
 *   - Where on the battler would you like to place the icon?
 * 
 *   Offset X:
 *   - How much to offset the icon X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the icon Y position by?
 *   - Negative goes up. Positive goes down.
 * 
 *   Name: Attach Shields (Enemies Only)
 *   - Attach the Break Shield icon to the enemy name?
 *   - Overrides direct attachment.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *     Attach: Offset X:
 *     - How much to offset the attached icon's X position by?
 *     - Negative goes left. Positive goes right.
 * 
 *     Attach: Offset Y:
 *     - How much to offset the attached icon's Y position by?
 *     - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Battle Status
 * 
 *   Show Break Shields?:
 *   - Show Break Shield icons in the Battle Status?
 * 
 *   Auto-Position?:
 *   - Automatically position the Break Shield icon?
 *   - If not, it'll position it to the upper left.
 * 
 *   Offset X:
 *   - How much to offset the icon X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the icon Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Menu Status
 * 
 *   Show Break Shields?:
 *   - Show Break Shield icons in the menu scenes?
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
 * Version 1.01: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.00 Official Release Date: April 30, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BreakShields
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Customize the mechanical settings for Break Shields.
 * @default {"BreakShields":"","AffectActors:eval":"true","AffectEnemies:eval":"true","Base:num":"1","Max:num":"99","StunState:num":"13","Animation":"","ReduceAniID:num":"2","StunAniID:num":"15","Weaknesses":"","MinRate:num":"1.05","Reduction:num":"1"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Customize the UI settings for Break Shields.
 * @default {"Icons":"","ShieldIcon:num":"81","StunIcon:num":"6","ShowStunTurns:eval":"false","ProtectIcon:num":"128","FontSize:num":"22","Battlers":"","Actors":"","ActorDisplayIcon:eval":"false","ActorDisplayPosition:str":"bottom center","ActorOffsetX:num":"+0","ActorOffsetY:num":"+8","Enemies":"","EnemyDisplayIcon:eval":"true","EnemyDisplayPosition:str":"bottom center","EnemyOffsetX:num":"+0","EnemyOffsetY:num":"+8","NameAttachShieldIcon:eval":"true","AttachShieldOffsetX:num":"+0","AttachShieldOffsetY:num":"+0","BattleStatus":"","BattleStatusDisplayIcons:eval":"true","BattleStatusAutoPosition:eval":"true","BattleStatusOffsetX:num":"+0","BattleStatusOffsetY:num":"+0","MenuStatus":"","MenuStatusBreakShieldIcons:eval":"true"}
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
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param BreakShields
 * @text Break Shields
 *
 * @param AffectActors:eval
 * @text Affect: Actors?
 * @parent BreakShields
 * @type boolean
 * @on Yes
 * @off No
 * @desc Do Break Shields affect actors?
 * @default true
 *
 * @param AffectEnemies:eval
 * @text Affect: Enemies?
 * @parent BreakShields
 * @type boolean
 * @on Yes
 * @off No
 * @desc Do Break Shields affect actors?
 * @default true
 *
 * @param Base:num
 * @text Base Shield Value
 * @parent BreakShields
 * @type number
 * @min 1
 * @desc The starting amount of shields a battler has.
 * Can be altered through notetags.
 * @default 1
 *
 * @param Max:num
 * @text Maximum Shields
 * @parent BreakShields
 * @type number
 * @min 1
 * @desc The maximum amount of shields a battler can have.
 * This is a hard cap.
 * @default 99
 *
 * @param StunState:num
 * @text Stun State ID
 * @parent BreakShields
 * @type state
 * @desc This is the state to be applied when all Break Shields
 * are reduced to 0.
 * @default 13
 *
 * @param Animation
 *
 * @param ReduceAniID:num
 * @text Reduce Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when Break Shields are reduced.
 * Requires VisuMZ_0_CoreEngine.
 * @default 2
 *
 * @param StunAniID:num
 * @text Stun Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when Break Stun is achieved.
 * Requires VisuMZ_0_CoreEngine.
 * @default 15
 *
 * @param Weaknesses
 *
 * @param MinRate:num
 * @text Minimum Rate
 * @parent Weaknesses
 * @desc What is the minimum element rate for an attack to be
 * considered striking a weakness?
 * @default 1.05
 *
 * @param Reduction:num
 * @text Default Reduction
 * @parent Weaknesses
 * @type number
 * @min 1
 * @desc Default reduction amount for Break Shields when striking
 * an elemental weakness.
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param Icons
 *
 * @param ShieldIcon:num
 * @text Break Shield Icon
 * @parent Icons
 * @desc Icon used to represent Break Shields.
 * @default 81
 *
 * @param StunIcon:num
 * @text Stun State Icon
 * @parent Icons
 * @desc Icon used to represent Break Stun if the Break Stun state
 * does NOT have an icon assigned to it.
 * @default 6
 *
 * @param ShowStunTurns:eval
 * @text Show Turns?
 * @parent StunIcon:num
 * @type boolean
 * @on Show Turns
 * @off Hide Turns
 * @desc Show how many turns are remaining with the Break Stun?
 * @default false
 *
 * @param ProtectIcon:num
 * @text Protect Icon
 * @parent Icons
 * @desc Icon used to represent Protected Elements.
 * Used for other plugins.
 * @default 128
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Icons
 * @number
 * @min 1
 * @desc What is the font size used to display the turns and
 * Break Shields remaining?
 * @default 22
 *
 * @param Battlers
 * 
 * @param Actors
 * @parent Battlers
 *
 * @param ActorDisplayIcon:eval
 * @text Show Battler Icon?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons on the SV_Actor battlers?
 * @default false
 *
 * @param ActorDisplayPosition:str
 * @text Position
 * @parent Actors
 * @type combo
 * @option top left
 * @option top center
 * @option top right
 * @option middle left
 * @option middle center
 * @option middle right
 * @option bottom left
 * @option bottom center
 * @option bottom right
 * @desc Where on the battler would you like to place the icon?
 * @default bottom center
 *
 * @param ActorOffsetX:num
 * @text Offset X
 * @parent Actors
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param ActorOffsetY:num
 * @text Offset Y
 * @parent Actors
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +8
 * 
 * @param Enemies
 * @parent Battlers
 *
 * @param EnemyDisplayIcon:eval
 * @text Show Battler Icon?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons on the enemy battlers?
 * @default true
 *
 * @param EnemyDisplayPosition:str
 * @text Position
 * @parent Enemies
 * @type combo
 * @option top left
 * @option top center
 * @option top right
 * @option middle left
 * @option middle center
 * @option middle right
 * @option bottom left
 * @option bottom center
 * @option bottom right
 * @desc Where on the battler would you like to place the icon?
 * @default bottom center
 *
 * @param EnemyOffsetX:num
 * @text Offset X
 * @parent Enemies
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param EnemyOffsetY:num
 * @text Offset Y
 * @parent Enemies
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +8
 *
 * @param NameAttachShieldIcon:eval
 * @text Name: Attach Shields
 * @parent Enemies
 * @type boolean
 * @on Attach
 * @off Normal Position
 * @desc Attach the Break Shield icon to the enemy name?
 * Overrides direct attachment. Requires VisuMZ_1_BattleCore!
 * @default true
 *
 * @param AttachShieldOffsetX:num
 * @text Attach: Offset X
 * @parent NameAttachShieldIcon:eval
 * @desc How much to offset the attached icon's X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param AttachShieldOffsetY:num
 * @text Attach: Offset Y
 * @parent NameAttachShieldIcon:eval
 * @desc How much to offset the attached icon's Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param BattleStatus
 * @text Battle Status
 *
 * @param BattleStatusDisplayIcons:eval
 * @text Show Break Shields?
 * @parent BattleStatus
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons in the Battle Status?
 * @default true
 *
 * @param BattleStatusAutoPosition:eval
 * @text Auto-Position?
 * @parent BattleStatus
 * @type boolean
 * @on Auto-Position
 * @off Manual Position
 * @desc Automatically position the Break Shield icon?
 * If not, it'll position it to the upper left.
 * @default true
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param MenuStatus
 * @text Menu Status
 *
 * @param MenuStatusBreakShieldIcons:eval
 * @text Show Break Shields?
 * @parent MenuStatus
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons in the menu scenes?
 * @default true
 *
 */
//=============================================================================

const _0x1044=['cKzJH','create','BreakReduce','BREAK_SHIELD_BATTLER_DISPLAY_ICON','bXzyc','_scene','isSTB','EnemyOffsetX','clamp','twErR','split','itemRect','Window_BattleStatus_drawItemStatus','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','min','ARRAYEVAL','_currentBreakShield','exit','_lineHeight','65685vneioP','ARRAYSTRUCT','constructor','BREAK_SHIELDS_DEFAULT_REDUCTION','ceil','Mechanics','yfFgO','originalElementRate','244648qoMPVa','applyChangeBreakShield','Max','Sprite_EnemyName_updateAttachedSprites','executeDamage','drawItemStatusBreakShieldsDefault','currentBreakShield','requestFauxAnimation','Window_StatusBase_drawActorIcons','331MhfGMF','tVjnn','prototype','wiZKd','pbPzk','BattleCore','FUNC','includes','applyBreakStun','ActorOffsetY','createAttachedSprites','JSON','drawItemStatus','loadBitmap','addChild','BreakShields','NameAttachShieldIcon','border','opacity','createBreakShieldIconSprite','PfCkA','isBreakStunned','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_numberSprite','parse','ARRAYFUNC','AddedBreakShields','call','contains','iconWidth','SADEz','VurSG','currentClass','startBreakShieldReduceAnimation','NUM','FontSize','placeBreakShieldIcon','_spriteset','lNxdp','AWdZs','IconSet','breakShield_StunIcon','yNOcX','getProtectedWeaknessElements','VisuMZ_0_CoreEngine','lKphc','EnemyOffsetY','STRUCT','1SJgVpa','Settings','_inBattle','_autoPositioning','hlQiV','elementRate','update','list','XvZnA','jLWTk','numberFontFace','BREAK_SHIELDS_DISPLAY_OFFSET_Y','BREAK_SHIELDS_DISPLAY_OFFSET_X','AffectEnemies','_enemy','deathStateId','wPLls','affVY','clear','round','Base','replace','vltDo','actor','shouldDisplay','ARRAYSTR','OJWks','31299FpABht','ActorDisplayIcon','_needRefreshAllEnemyWeaknessWindows','292SLRsZX','BREAK_SHIELD_BATTLER_ATTACH_ICON_NAME','default','updateAttachedSprites','addedBreakShields','1qkECET','300962QAwmZU','createInnerSprite','isBreakShieldIconDisplayed','map','ShowFacesListStyle','ProtectIcon','VisuMZ_1_BattleCore','ActorDisplayPosition','EnemyDisplayPosition','updateBreakShieldIconSprite','NahrN','paQaY','whaAZ','nZbqO','iconHeight','hQQQr','width','updateIcon','inBattle','drawItemStatusBreakBattleCore','Sprite_Enemy_initMembers','baseBreakShield','isSTBExploitSystemEnabled','shAoq','YXUPN','updateNumber','fontSize','setFrame','BREAK_SHIELDS_DISPLAY_AUTO','note','AlterBreakShield','ShieldIcon','applyItemUserEffect','isAppeared','BREAK_SHIELDS_ACTORS','_battler','217530tGyZPw','isEnemy','max','floor','WQWDk','getElementIdWithName','_numberValue','CfdiT','EnemyDisplayIcon','svCJL','resetBreakShields','PmQqi','calcElementRate','alterBreakShield','updateAutoPosition','Sprite_EnemyName_createAttachedSprites','isSceneBattle','girUe','BREAK_SHIELDS_STUN_STATE','BREAK_SHIELDS_DISPLAY_ICONS','Sprite_Actor_setBattler','ARRAYNUM','ConvertParams','BattleStatusOffsetY','AMQUU','test','executeBreakShieldReduction','name','BattleLayout','AttachShieldOffsetY','anchor','refresh','drawItemStatusBreakShields','isAffectedByBreakShield','_actor','JAFec','Game_Battler_removeBattleStates','createNumberDisplay','aXZcu','trim','Game_Actor_refresh','Game_Action_executeDamage','initMembers','iconIndex','ReduceAniID','format','48644WAjqEv','_displayValue','topBreakShield','BREAK_SHIELD_BATTLER_DISPLAY_OFFSET_X','StunIcon','Game_Action_applyItemUserEffect','actor%1-breakShieldIcon','show','SetBreakShield','BREAK_SHIELDS_BASE','setBreakShield','shouldDisplayBreakShields','status','BREAK_SHIELDS_STUN_ANIMATION','BREAK_SHIELDS_MAX','push','traitObjects','stbCannotBeExploited','itemBreakShieldReduction','enemy','updateFrame','BREAK_SHIELD_BATTLER_DISPLAY_OFFSET_Y','setup','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','elements','BREAK_SHIELDS_ENEMIES','return\x200','iqdRi','uKDhn','initialize','_breakShieldSprite','_elementIDs','BREAK_SHIELDS_REDUCE_ANIMATION','bitmap','version','IucxZ','actorId','loadSystem','Fahwh','removeBattleStates','fpwnh','resetBreakShield','PaliO','battleLayoutStyle','breakShield_StunTurns','MinRate','item','1KBOzNw','_iconIndex','move','Sprite_Enemy_setBattler','xWZqh','BattleStatusDisplayIcons','LdxEz','tuDFQ','setBattler','filter','Xgqnr','BREAK_SHIELD_BATTLER_DISPLAY_POSITION','description','ActorOffsetX','_resettingBreakShield','members','RegExp','isHpEffect','rZjOo','drawText','isActor','nameY','toUpperCase','MenuStatusBreakShieldIcons','findTargetSprite','VisuMZ_2_BattleSystemSTB','BREAK_SHIELD_BATTLER_ATTACH_OFFSET_X','BaseBreakShields','AffectActors','breakShield_ShieldIcon','3ZAgQvZ','match','height'];const _0x2538cd=_0x2ecc;(function(_0x42d5c7,_0x2257e2){const _0x37e29b=_0x2ecc;while(!![]){try{const _0x19a477=-parseInt(_0x37e29b(0x1ef))*parseInt(_0x37e29b(0x19c))+-parseInt(_0x37e29b(0x19d))*parseInt(_0x37e29b(0x21e))+parseInt(_0x37e29b(0x263))*-parseInt(_0x37e29b(0x197))+parseInt(_0x37e29b(0x252))+parseInt(_0x37e29b(0x1c1))+parseInt(_0x37e29b(0x194))*parseInt(_0x37e29b(0x23c))+-parseInt(_0x37e29b(0x25a))*-parseInt(_0x37e29b(0x293));if(_0x19a477===_0x2257e2)break;else _0x42d5c7['push'](_0x42d5c7['shift']());}catch(_0x494a34){_0x42d5c7['push'](_0x42d5c7['shift']());}}}(_0x1044,0x2ad8e));var label=_0x2538cd(0x272),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2538cd(0x227)](function(_0x4e6d64){const _0x404abb=_0x2538cd;return _0x4e6d64[_0x404abb(0x1fb)]&&_0x4e6d64[_0x404abb(0x22a)][_0x404abb(0x26a)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x2538cd(0x1d7)]=function(_0x11e8d1,_0x3097b8){const _0xd9f9d1=_0x2538cd;for(const _0x52c256 in _0x3097b8){if(_0x52c256[_0xd9f9d1(0x23d)](/(.*):(.*)/i)){const _0x6331ad=String(RegExp['$1']),_0x50bedb=String(RegExp['$2'])[_0xd9f9d1(0x234)]()[_0xd9f9d1(0x1e8)]();let _0x15e775,_0x49e3d8,_0x3b4ad4;switch(_0x50bedb){case _0xd9f9d1(0x285):_0x15e775=_0x3097b8[_0x52c256]!==''?Number(_0x3097b8[_0x52c256]):0x0;break;case _0xd9f9d1(0x1d6):_0x49e3d8=_0x3097b8[_0x52c256]!==''?JSON[_0xd9f9d1(0x27b)](_0x3097b8[_0x52c256]):[],_0x15e775=_0x49e3d8['map'](_0x1a3862=>Number(_0x1a3862));break;case'EVAL':_0x15e775=_0x3097b8[_0x52c256]!==''?eval(_0x3097b8[_0x52c256]):null;break;case _0xd9f9d1(0x24e):_0x49e3d8=_0x3097b8[_0x52c256]!==''?JSON['parse'](_0x3097b8[_0x52c256]):[],_0x15e775=_0x49e3d8[_0xd9f9d1(0x1a0)](_0x448abe=>eval(_0x448abe));break;case _0xd9f9d1(0x26e):_0x15e775=_0x3097b8[_0x52c256]!==''?JSON[_0xd9f9d1(0x27b)](_0x3097b8[_0x52c256]):'';break;case'ARRAYJSON':_0x49e3d8=_0x3097b8[_0x52c256]!==''?JSON[_0xd9f9d1(0x27b)](_0x3097b8[_0x52c256]):[],_0x15e775=_0x49e3d8['map'](_0x18beac=>JSON[_0xd9f9d1(0x27b)](_0x18beac));break;case _0xd9f9d1(0x269):_0x15e775=_0x3097b8[_0x52c256]!==''?new Function(JSON[_0xd9f9d1(0x27b)](_0x3097b8[_0x52c256])):new Function(_0xd9f9d1(0x209));break;case _0xd9f9d1(0x27c):_0x49e3d8=_0x3097b8[_0x52c256]!==''?JSON[_0xd9f9d1(0x27b)](_0x3097b8[_0x52c256]):[],_0x15e775=_0x49e3d8[_0xd9f9d1(0x1a0)](_0x399212=>new Function(JSON[_0xd9f9d1(0x27b)](_0x399212)));break;case'STR':_0x15e775=_0x3097b8[_0x52c256]!==''?String(_0x3097b8[_0x52c256]):'';break;case _0xd9f9d1(0x192):_0x49e3d8=_0x3097b8[_0x52c256]!==''?JSON[_0xd9f9d1(0x27b)](_0x3097b8[_0x52c256]):[],_0x15e775=_0x49e3d8['map'](_0x3c0baf=>String(_0x3c0baf));break;case _0xd9f9d1(0x292):_0x3b4ad4=_0x3097b8[_0x52c256]!==''?JSON[_0xd9f9d1(0x27b)](_0x3097b8[_0x52c256]):{},_0x15e775=VisuMZ[_0xd9f9d1(0x1d7)]({},_0x3b4ad4);break;case _0xd9f9d1(0x253):_0x49e3d8=_0x3097b8[_0x52c256]!==''?JSON['parse'](_0x3097b8[_0x52c256]):[],_0x15e775=_0x49e3d8['map'](_0x64ff92=>VisuMZ[_0xd9f9d1(0x1d7)]({},JSON[_0xd9f9d1(0x27b)](_0x64ff92)));break;default:continue;}_0x11e8d1[_0x6331ad]=_0x15e775;}}return _0x11e8d1;},(_0x21619c=>{const _0x19eebd=_0x2538cd,_0x4a0ba3=_0x21619c[_0x19eebd(0x1dc)];for(const _0x7d9736 of dependencies){if(_0x19eebd(0x219)!=='soufr'){if(!Imported[_0x7d9736]){alert(_0x19eebd(0x279)['format'](_0x4a0ba3,_0x7d9736)),SceneManager[_0x19eebd(0x250)]();break;}}else{function _0x541f19(){const _0x483f09=_0x19eebd;return _0x16c6fb[_0x483f09(0x272)]['Game_BattlerBase_elementRate'][_0x483f09(0x27e)](this,_0x25d13c);}}}const _0xce8b73=_0x21619c['description'];if(_0xce8b73[_0x19eebd(0x23d)](/\[Version[ ](.*?)\]/i)){const _0x3ad67f=Number(RegExp['$1']);_0x3ad67f!==VisuMZ[label][_0x19eebd(0x211)]&&(alert(_0x19eebd(0x24c)[_0x19eebd(0x1ee)](_0x4a0ba3,_0x3ad67f)),SceneManager[_0x19eebd(0x250)]());}if(_0xce8b73['match'](/\[Tier[ ](\d+)\]/i)){const _0x13fe5c=Number(RegExp['$1']);_0x13fe5c<tier?(alert(_0x19eebd(0x206)[_0x19eebd(0x1ee)](_0x4a0ba3,_0x13fe5c,tier)),SceneManager[_0x19eebd(0x250)]()):tier=Math[_0x19eebd(0x1c3)](_0x13fe5c,tier);}VisuMZ[_0x19eebd(0x1d7)](VisuMZ[label][_0x19eebd(0x294)],_0x21619c['parameters']);})(pluginData),VisuMZ['BreakShields'][_0x2538cd(0x22e)]={'BreakReduce':/<BREAK (?:REDUCE|REDUCTION):[ ](\d+)>/i,'SetBreakShield':/<(?:SET|CHANGE) BREAK (?:SHIELD|SHIELDS): (\d+)>/i,'AlterBreakShield':/<(?:INCREASE|DECREASE|ALTER) BREAK (?:SHIELD|SHIELDS): ([\+\-]\d+)>/i,'ProtectedElements':/<PROTECT (?:ELEMENT|ELEMENTS):[ ](.*)>/i,'AddedBreakShields':/<BREAK (?:SHIELD|SHIELDS): ([\+\-]\d+)>/i,'BaseBreakShields':/<BREAK (?:SHIELD|SHIELDS): (\d+)>/i},DataManager['getElementIdWithName']=function(_0x4a6e38){const _0x536f7e=_0x2538cd;_0x4a6e38=_0x4a6e38[_0x536f7e(0x234)]()[_0x536f7e(0x1e8)](),this[_0x536f7e(0x20e)]=this['_elementIDs']||{};if(this[_0x536f7e(0x20e)][_0x4a6e38])return this[_0x536f7e(0x20e)][_0x4a6e38];let _0x123138=0x1;for(const _0x2221b2 of $dataSystem[_0x536f7e(0x207)]){if(!_0x2221b2)continue;let _0x40e454=_0x2221b2[_0x536f7e(0x234)]();_0x40e454=_0x40e454[_0x536f7e(0x18e)](/\x1I\[(\d+)\]/gi,''),_0x40e454=_0x40e454[_0x536f7e(0x18e)](/\\I\[(\d+)\]/gi,''),this[_0x536f7e(0x20e)][_0x40e454]=_0x123138,_0x123138++;}return this['_elementIDs'][_0x4a6e38]||0x0;},ImageManager['breakShield_ShieldIcon']=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)]['UI'][_0x2538cd(0x1bc)],ImageManager['breakShield_StunIcon']=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)]['UI'][_0x2538cd(0x1f3)],ImageManager['breakShield_StunTurns']=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)]['UI']['ShowStunTurns'],ImageManager['breakShield_ProtectIcon']=VisuMZ['BreakShields'][_0x2538cd(0x294)]['UI'][_0x2538cd(0x1a2)],SceneManager[_0x2538cd(0x1d1)]=function(){const _0xe1cc6=_0x2538cd;return this[_0xe1cc6(0x244)]&&this[_0xe1cc6(0x244)][_0xe1cc6(0x254)]===Scene_Battle;},VisuMZ[_0x2538cd(0x272)]['BattleManager_setup']=BattleManager[_0x2538cd(0x205)],BattleManager[_0x2538cd(0x205)]=function(_0x4e976a,_0x1bcb2d,_0x2ea5c7){const _0x2a25e5=_0x2538cd;VisuMZ[_0x2a25e5(0x272)]['BattleManager_setup'][_0x2a25e5(0x27e)](this,_0x4e976a,_0x1bcb2d,_0x2ea5c7),$gameParty[_0x2a25e5(0x1cb)](),$gameTroop[_0x2a25e5(0x1cb)]();},Game_Action['BREAK_SHIELDS_MINIMUM_WEAKNESS_RATE']=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)][_0x2538cd(0x257)][_0x2538cd(0x21c)],Game_Action['BREAK_SHIELDS_DEFAULT_REDUCTION']=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)][_0x2538cd(0x257)]['Reduction'],VisuMZ['BreakShields'][_0x2538cd(0x1ea)]=Game_Action[_0x2538cd(0x265)][_0x2538cd(0x25e)],Game_Action[_0x2538cd(0x265)][_0x2538cd(0x25e)]=function(_0x26281e,_0x4c447b){const _0x4611a9=_0x2538cd;VisuMZ[_0x4611a9(0x272)][_0x4611a9(0x1ea)][_0x4611a9(0x27e)](this,_0x26281e,_0x4c447b),!!_0x26281e&&_0x4c447b>0x0&&_0x26281e[_0x4611a9(0x1e2)]()&&this[_0x4611a9(0x22f)]()&&this[_0x4611a9(0x1db)](_0x26281e,_0x4c447b);},Game_Action[_0x2538cd(0x265)][_0x2538cd(0x1db)]=function(_0x35c0e6,_0x11a6c4){const _0x57c3c1=_0x2538cd;if(!_0x35c0e6[_0x57c3c1(0x278)]()){if('XvZnA'!==_0x57c3c1(0x29b)){function _0x1171b3(){const _0x22b309=_0x57c3c1;this['setBreakShield'](this[_0x22b309(0x260)]()+_0x30acc3);}}else{var _0x3dcf56=this[_0x57c3c1(0x1cd)](_0x35c0e6);if(_0x3dcf56>=Game_Action['BREAK_SHIELDS_MINIMUM_WEAKNESS_RATE']){var _0x11a6c4=-0x1*this[_0x57c3c1(0x201)]();_0x35c0e6['startBreakShieldReduceAnimation'](),_0x35c0e6[_0x57c3c1(0x1ce)](_0x11a6c4);}}}},Game_Action[_0x2538cd(0x265)][_0x2538cd(0x201)]=function(){const _0x554c53=_0x2538cd,_0xe8c786=VisuMZ[_0x554c53(0x272)][_0x554c53(0x22e)];return this[_0x554c53(0x21d)]()[_0x554c53(0x1ba)][_0x554c53(0x23d)](_0xe8c786[_0x554c53(0x241)])?parseInt(RegExp['$1']):Game_Action[_0x554c53(0x255)];},VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x1f4)]=Game_Action[_0x2538cd(0x265)]['applyItemUserEffect'],Game_Action[_0x2538cd(0x265)][_0x2538cd(0x1bd)]=function(_0x24fc83){const _0x19a4a4=_0x2538cd;VisuMZ['BreakShields']['Game_Action_applyItemUserEffect']['call'](this,_0x24fc83);if(!!_0x24fc83&&_0x24fc83[_0x19a4a4(0x1e2)]()){if(_0x19a4a4(0x290)!==_0x19a4a4(0x1d9))this[_0x19a4a4(0x25b)](_0x24fc83);else{function _0x503f32(){const _0x43f679=_0x19a4a4;this[_0x43f679(0x1b0)](_0xaecbf2);}}}},Game_Action[_0x2538cd(0x265)][_0x2538cd(0x25b)]=function(_0x5f0fcb){const _0x16c004=_0x2538cd;if(!_0x5f0fcb[_0x16c004(0x278)]()){if(_0x16c004(0x217)===_0x16c004(0x20b)){function _0x55b3e2(){this['opacity']=0x0;}}else{const _0x212c53=VisuMZ[_0x16c004(0x272)][_0x16c004(0x22e)];this[_0x16c004(0x21d)]()['note'][_0x16c004(0x23d)](_0x212c53['SetBreakShield'])&&(_0x5f0fcb[_0x16c004(0x1f9)](parseInt(RegExp['$1'])),$gameTemp[_0x16c004(0x196)]=!![]),this[_0x16c004(0x21d)]()[_0x16c004(0x1ba)]['match'](_0x212c53[_0x16c004(0x1bb)])&&(_0x5f0fcb[_0x16c004(0x1ce)](parseInt(RegExp['$1'])),$gameTemp[_0x16c004(0x196)]=!![]);}}},VisuMZ['BreakShields']['Game_BattlerBase_elementRate']=Game_BattlerBase['prototype']['elementRate'],Game_BattlerBase[_0x2538cd(0x265)][_0x2538cd(0x298)]=function(_0x2af7a3){const _0x18ee3=_0x2538cd;var _0x31e6e4=VisuMZ[_0x18ee3(0x272)]['Game_BattlerBase_elementRate']['call'](this,_0x2af7a3);if(this[_0x18ee3(0x28e)]()[_0x18ee3(0x27f)](_0x2af7a3)){if(_0x18ee3(0x1b4)!=='EFTpt')return Math[_0x18ee3(0x24d)](0x1,_0x31e6e4);else{function _0x1af975(){this['_iconIndex']=0x0;}}}else return _0x31e6e4;},Game_BattlerBase[_0x2538cd(0x265)][_0x2538cd(0x259)]=function(_0x33a30d){const _0x45fe71=_0x2538cd;return VisuMZ[_0x45fe71(0x272)]['Game_BattlerBase_elementRate'][_0x45fe71(0x27e)](this,_0x33a30d);},Game_Battler[_0x2538cd(0x1f8)]=VisuMZ[_0x2538cd(0x272)]['Settings'][_0x2538cd(0x257)][_0x2538cd(0x18d)],Game_Battler[_0x2538cd(0x1fd)]=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)][_0x2538cd(0x257)][_0x2538cd(0x25c)],Game_Battler[_0x2538cd(0x1d3)]=VisuMZ[_0x2538cd(0x272)]['Settings'][_0x2538cd(0x257)]['StunState'],Game_Battler[_0x2538cd(0x20f)]=VisuMZ[_0x2538cd(0x272)]['Settings'][_0x2538cd(0x257)][_0x2538cd(0x1ed)],Game_Battler[_0x2538cd(0x1fc)]=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)][_0x2538cd(0x257)]['StunAniID'],Game_Battler['BREAK_SHIELDS_ACTORS']=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)]['Mechanics'][_0x2538cd(0x23a)],Game_Battler[_0x2538cd(0x208)]=VisuMZ['BreakShields']['Settings'][_0x2538cd(0x257)][_0x2538cd(0x186)],VisuMZ['BreakShields']['Game_Battler_removeBattleStates']=Game_Battler[_0x2538cd(0x265)][_0x2538cd(0x216)],Game_Battler[_0x2538cd(0x265)][_0x2538cd(0x216)]=function(){const _0x53ca80=_0x2538cd;VisuMZ['BreakShields'][_0x53ca80(0x1e5)][_0x53ca80(0x27e)](this),this['resetBreakShield']();},Game_Battler[_0x2538cd(0x265)][_0x2538cd(0x1e2)]=function(){return![];},Game_Battler['prototype'][_0x2538cd(0x218)]=function(){const _0x3dddca=_0x2538cd;this[_0x3dddca(0x1e2)]()&&this[_0x3dddca(0x1f9)](this[_0x3dddca(0x1f1)]());},Game_Battler[_0x2538cd(0x265)][_0x2538cd(0x1b2)]=function(){const _0x2658ed=_0x2538cd;return Game_Battler[_0x2658ed(0x1f8)];},Game_Battler[_0x2538cd(0x265)][_0x2538cd(0x1f1)]=function(){const _0x4219a2=_0x2538cd;var _0x4b26ad=this[_0x4219a2(0x1b2)]();return _0x4b26ad=this[_0x4219a2(0x19b)](_0x4b26ad),_0x4b26ad[_0x4219a2(0x247)](0x1,Game_Battler[_0x4219a2(0x1fd)]);},Game_Battler['prototype'][_0x2538cd(0x19b)]=function(_0x7f7147){const _0x3136de=_0x2538cd,_0x1ede03=VisuMZ[_0x3136de(0x272)]['RegExp'];for(const _0xce882f of this[_0x3136de(0x1ff)]()){if(!_0xce882f)continue;if(_0xce882f[_0x3136de(0x1ba)]['match'](_0x1ede03[_0x3136de(0x27d)])){if('jLWTk'!==_0x3136de(0x29c)){function _0x4c1a28(){_0x45384e=_0x3d1a23(_0x160a4e['$1']);}}else _0x7f7147+=Number(RegExp['$1'])||0x0;}}return _0x7f7147;},Game_Battler[_0x2538cd(0x265)][_0x2538cd(0x260)]=function(){const _0x20d378=_0x2538cd;if(this[_0x20d378(0x24f)]===undefined){if(_0x20d378(0x18f)==='vltDo')this[_0x20d378(0x1f9)](this[_0x20d378(0x1f1)]());else{function _0x49fbaa(){const _0x15fd7d=_0x20d378,_0x424616=_0x5a6e3d(_0x113911['$1']);_0x424616<_0x38a677?(_0xf5cb0c(_0x15fd7d(0x206)['format'](_0x4e8bba,_0x424616,_0x4c23be)),_0x4ce7a7[_0x15fd7d(0x250)]()):_0x174a44=_0x22185f[_0x15fd7d(0x1c3)](_0x424616,_0x561e80);}}}return this['_currentBreakShield'];},Game_Battler[_0x2538cd(0x265)][_0x2538cd(0x1f9)]=function(_0x3af171){const _0x5c3492=_0x2538cd;if(this[_0x5c3492(0x1e2)]()){if(_0x5c3492(0x18a)===_0x5c3492(0x20a)){function _0x243ae8(){const _0x5263d3=_0x5c3492;_0x29115f['prototype'][_0x5263d3(0x299)]['call'](this),this[_0x5263d3(0x191)]()?(this[_0x5263d3(0x275)]=0xff,this['updateIcon'](),this[_0x5263d3(0x203)](),this[_0x5263d3(0x1b6)](),this[_0x5263d3(0x1cf)]()):this[_0x5263d3(0x275)]=0x0;}}else{this['_currentBreakShield']=Math[_0x5c3492(0x256)](_0x3af171),this['_currentBreakShield']=this[_0x5c3492(0x24f)][_0x5c3492(0x247)](0x0,Game_Battler[_0x5c3492(0x1fd)]);if(this[_0x5c3492(0x24f)]<=0x0){if(_0x5c3492(0x248)===_0x5c3492(0x248))this[_0x5c3492(0x26b)]();else{function _0x245029(){const _0x10e753=_0x5c3492;var _0x598bfc=_0x3667d5[_0x10e753(0x20f)];_0x4ac452['requestFauxAnimation']([this],_0x598bfc,![],![]);}}}this[_0x5c3492(0x1e0)]();}}},Game_Battler['prototype'][_0x2538cd(0x1ce)]=function(_0x48a33f){const _0x32a212=_0x2538cd;this[_0x32a212(0x1f9)](this[_0x32a212(0x260)]()+_0x48a33f);},Game_Battler['prototype'][_0x2538cd(0x26b)]=function(){const _0x424daf=_0x2538cd;this[_0x424daf(0x1f9)](this['topBreakShield']());var _0x113505=Game_Battler[_0x424daf(0x1d3)];this['addState'](_0x113505),this['startBreakShieldBrokenAnimation']();},Game_Battler[_0x2538cd(0x265)][_0x2538cd(0x278)]=function(){return this['isStateAffected'](Game_Battler['BREAK_SHIELDS_STUN_STATE']);},Game_Battler['prototype']['startBreakShieldReduceAnimation']=function(){const _0x496e76=_0x2538cd;if(Imported['VisuMZ_0_CoreEngine']&&Game_Battler[_0x496e76(0x20f)]){if(_0x496e76(0x222)===_0x496e76(0x222)){var _0x2df2c5=Game_Battler[_0x496e76(0x20f)];$gameTemp[_0x496e76(0x261)]([this],_0x2df2c5,![],![]);}else{function _0x574480(){const _0xbd5ee3=_0x496e76;this[_0xbd5ee3(0x210)]=_0x11c86a[_0xbd5ee3(0x214)](_0xbd5ee3(0x28b)),this[_0xbd5ee3(0x1b8)](0x0,0x0,0x0,0x0);}}}},Game_Battler[_0x2538cd(0x265)]['startBreakShieldBrokenAnimation']=function(){const _0x160b30=_0x2538cd;if(Imported[_0x160b30(0x28f)]&&Game_Battler[_0x160b30(0x1fc)]){var _0x1c74be=Game_Battler['BREAK_SHIELDS_STUN_ANIMATION'];$gameTemp['requestFauxAnimation']([this],_0x1c74be,![],![]);}},Game_Battler[_0x2538cd(0x265)][_0x2538cd(0x28e)]=function(){const _0x5c57fc=_0x2538cd,_0x51c2f6=VisuMZ['BreakShields']['RegExp'];let _0x2f9cf3=[];for(const _0x581eaf of this[_0x5c57fc(0x1ff)]()){if(!_0x581eaf)continue;if(_0x581eaf[_0x5c57fc(0x1ba)][_0x5c57fc(0x23d)](_0x51c2f6['ProtectedElements'])){if(_0x5c57fc(0x1ac)!==_0x5c57fc(0x1ac)){function _0x281497(){const _0x56d0aa=_0x5c57fc;_0x12ad97[_0x56d0aa(0x272)]['Game_Battler_removeBattleStates']['call'](this),this[_0x56d0aa(0x218)]();}}else{const _0x4b5601=RegExp['$1'][_0x5c57fc(0x249)](',')[_0x5c57fc(0x1a0)](_0x4b5a8b=>_0x4b5a8b[_0x5c57fc(0x1e8)]());for(const _0x57ba7b of _0x4b5601){if(_0x5c57fc(0x243)!==_0x5c57fc(0x243)){function _0x1fe8d5(){_0x2cee1c=_0x561f01(_0x380ec3['$1']);}}else{const _0x4363a0=/^\d+$/[_0x5c57fc(0x1da)](_0x57ba7b);if(_0x4363a0)_0x2f9cf3[_0x5c57fc(0x1fe)](Number(_0x57ba7b));else{const _0x3df555=DataManager[_0x5c57fc(0x1c6)](_0x57ba7b);if(_0x3df555)_0x2f9cf3['push'](_0x3df555);}}}}}}return _0x2f9cf3['sort'](function(_0x4f9706,_0x1d7107){const _0x4f2705=_0x5c57fc;if('Fahwh'!==_0x4f2705(0x215)){function _0x5749b4(){const _0x4820bf=_0x4f2705;this[_0x4820bf(0x21f)]=_0x1d4594['breakShield_StunIcon'];}}else return _0x4f9706-_0x1d7107;}),_0x2f9cf3;},Game_Actor[_0x2538cd(0x265)][_0x2538cd(0x1e2)]=function(){const _0x1051e3=_0x2538cd;if(Imported[_0x1051e3(0x237)]&&BattleManager[_0x1051e3(0x245)]()&&BattleManager['isSTBExploitSystemEnabled']()){if('tVjnn'===_0x1051e3(0x264))return this['stbCannotBeExploited']()?!![]:![];else{function _0x22a9ac(){this['setBreakShield'](this['topBreakShield']());}}}return Game_Battler[_0x1051e3(0x1bf)];},Game_Actor[_0x2538cd(0x265)]['baseBreakShield']=function(){const _0x13207b=_0x2538cd,_0x1782da=VisuMZ[_0x13207b(0x272)][_0x13207b(0x22e)];let _0x1bd764=Game_Battler['prototype'][_0x13207b(0x1b2)][_0x13207b(0x27e)](this);if(!!this[_0x13207b(0x283)]()&&this[_0x13207b(0x283)]()[_0x13207b(0x1ba)][_0x13207b(0x23d)](_0x1782da[_0x13207b(0x239)]))_0x1bd764=parseInt(RegExp['$1']);else{if(this['actor']()&&this['actor']()[_0x13207b(0x1ba)][_0x13207b(0x23d)](_0x1782da[_0x13207b(0x239)])){if(_0x13207b(0x1a8)!==_0x13207b(0x1a8)){function _0x412081(){const _0x57bcd1=_0x13207b,_0x1feb4d=_0x302679[_0x57bcd1(0x272)]['RegExp'];this['item']()[_0x57bcd1(0x1ba)][_0x57bcd1(0x23d)](_0x1feb4d[_0x57bcd1(0x1f7)])&&(_0x199bfc[_0x57bcd1(0x1f9)](_0x11fadd(_0x1619f3['$1'])),_0x350f10[_0x57bcd1(0x196)]=!![]),this[_0x57bcd1(0x21d)]()[_0x57bcd1(0x1ba)]['match'](_0x1feb4d[_0x57bcd1(0x1bb)])&&(_0x3e78eb[_0x57bcd1(0x1ce)](_0x466210(_0x34b2ad['$1'])),_0x12d9e9['_needRefreshAllEnemyWeaknessWindows']=!![]);}}else _0x1bd764=parseInt(RegExp['$1']);}}return Math['max'](0x1,_0x1bd764);},VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x1e9)]=Game_Actor[_0x2538cd(0x265)]['refresh'],Game_Actor['prototype'][_0x2538cd(0x1e0)]=function(){const _0x5814bd=_0x2538cd;VisuMZ[_0x5814bd(0x272)][_0x5814bd(0x1e9)][_0x5814bd(0x27e)](this),!$gameParty[_0x5814bd(0x1af)]()&&!this['_resettingBreakShield']&&(this[_0x5814bd(0x22c)]=!![],this[_0x5814bd(0x218)](),this[_0x5814bd(0x22c)]=undefined);},Game_Enemy[_0x2538cd(0x265)][_0x2538cd(0x1e2)]=function(){const _0x5b7ccc=_0x2538cd;if(Imported['VisuMZ_2_BattleSystemSTB']&&BattleManager[_0x5b7ccc(0x245)]()&&BattleManager[_0x5b7ccc(0x1b3)]())return this[_0x5b7ccc(0x200)]()?!![]:![];return Game_Battler[_0x5b7ccc(0x208)];},Game_Enemy[_0x2538cd(0x265)]['baseBreakShield']=function(){const _0x10bd6a=_0x2538cd,_0x2b2533=VisuMZ['BreakShields'][_0x10bd6a(0x22e)];let _0x62eed=Game_Battler[_0x10bd6a(0x265)][_0x10bd6a(0x1b2)]['call'](this);if(this[_0x10bd6a(0x202)]()&&this[_0x10bd6a(0x202)]()[_0x10bd6a(0x1ba)]['match'](_0x2b2533[_0x10bd6a(0x239)])){if('MGknL'===_0x10bd6a(0x28d)){function _0x30567e(){return _0x3712bc(_0x1d97d4['$1']);}}else _0x62eed=parseInt(RegExp['$1']);}return Math[_0x10bd6a(0x1c3)](0x1,_0x62eed);},Game_Unit[_0x2538cd(0x265)]['resetBreakShields']=function(){const _0x277762=_0x2538cd;var _0x501f17=this[_0x277762(0x295)];this[_0x277762(0x295)]=![];for(const _0x1cfe41 of this[_0x277762(0x22d)]()){if(_0x277762(0x282)!==_0x277762(0x1a9))_0x1cfe41&&_0x1cfe41[_0x277762(0x218)]();else{function _0x281705(){const _0x168f76=_0x277762,_0x38e4c8='actor%1-breakShieldIcon'['format'](_0x81eabd[_0x168f76(0x213)]()),_0x553755=this[_0x168f76(0x19e)](_0x38e4c8,_0x18ac11);_0x553755[_0x168f76(0x205)](_0x41104b,![]),_0x553755[_0x168f76(0x220)](_0x26ad90,_0x501105),_0x553755[_0x168f76(0x1f6)]();}}}this['_inBattle']=_0x501f17;},Sprite_Battler[_0x2538cd(0x265)][_0x2538cd(0x276)]=function(){const _0x1a5486=_0x2538cd;this['_breakShieldSprite']=new Sprite_BreakShieldIcon(),this[_0x1a5486(0x271)](this['_breakShieldSprite']);},Sprite_Actor[_0x2538cd(0x242)]=VisuMZ['BreakShields'][_0x2538cd(0x294)]['UI'][_0x2538cd(0x195)],Sprite_Actor[_0x2538cd(0x229)]=VisuMZ[_0x2538cd(0x272)]['Settings']['UI'][_0x2538cd(0x1a4)],Sprite_Actor['BREAK_SHIELD_BATTLER_DISPLAY_OFFSET_X']=VisuMZ['BreakShields'][_0x2538cd(0x294)]['UI'][_0x2538cd(0x22b)],Sprite_Actor[_0x2538cd(0x204)]=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)]['UI'][_0x2538cd(0x26c)],VisuMZ['BreakShields']['Sprite_Actor_initMembers']=Sprite_Actor[_0x2538cd(0x265)][_0x2538cd(0x1eb)],Sprite_Actor[_0x2538cd(0x265)][_0x2538cd(0x1eb)]=function(){const _0x5ad1c5=_0x2538cd;VisuMZ[_0x5ad1c5(0x272)]['Sprite_Actor_initMembers'][_0x5ad1c5(0x27e)](this),this[_0x5ad1c5(0x19f)]()&&this[_0x5ad1c5(0x276)]();},Sprite_Actor[_0x2538cd(0x265)][_0x2538cd(0x19f)]=function(){const _0xdaa325=_0x2538cd;return Sprite_Actor[_0xdaa325(0x242)]&&this['constructor']===Sprite_Actor;},VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x1d5)]=Sprite_Actor[_0x2538cd(0x265)][_0x2538cd(0x226)],Sprite_Actor[_0x2538cd(0x265)][_0x2538cd(0x226)]=function(_0x52baff){const _0x3ed0a5=_0x2538cd;VisuMZ[_0x3ed0a5(0x272)][_0x3ed0a5(0x1d5)]['call'](this,_0x52baff),this[_0x3ed0a5(0x20d)]&&this[_0x3ed0a5(0x20d)][_0x3ed0a5(0x205)](this[_0x3ed0a5(0x1e3)],!![]);},Sprite_Enemy[_0x2538cd(0x242)]=VisuMZ['BreakShields'][_0x2538cd(0x294)]['UI'][_0x2538cd(0x1c9)],Sprite_Enemy[_0x2538cd(0x229)]=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)]['UI'][_0x2538cd(0x1a5)],Sprite_Enemy[_0x2538cd(0x1f2)]=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)]['UI'][_0x2538cd(0x246)],Sprite_Enemy[_0x2538cd(0x204)]=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)]['UI'][_0x2538cd(0x291)],Sprite_Enemy['BREAK_SHIELD_BATTLER_ATTACH_ICON_NAME']=VisuMZ[_0x2538cd(0x272)]['Settings']['UI'][_0x2538cd(0x273)],Sprite_Enemy['BREAK_SHIELD_BATTLER_ATTACH_OFFSET_X']=VisuMZ['BreakShields'][_0x2538cd(0x294)]['UI']['AttachShieldOffsetX'],Sprite_Enemy['BREAK_SHIELD_BATTLER_ATTACH_OFFSET_Y']=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)]['UI'][_0x2538cd(0x1de)],VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x1b1)]=Sprite_Enemy[_0x2538cd(0x265)]['initMembers'],Sprite_Enemy[_0x2538cd(0x265)][_0x2538cd(0x1eb)]=function(){const _0x533d9d=_0x2538cd;VisuMZ[_0x533d9d(0x272)][_0x533d9d(0x1b1)][_0x533d9d(0x27e)](this);if(this[_0x533d9d(0x19f)]()){if('wiZKd'===_0x533d9d(0x266))this['createBreakShieldIconSprite']();else{function _0x36ea3f(){const _0x4a117f=_0x533d9d;this['_breakShieldSprite']=new _0x52bffa(),this['addChild'](this[_0x4a117f(0x20d)]);}}}},Sprite_Enemy['prototype']['isBreakShieldIconDisplayed']=function(){const _0x4a2930=_0x2538cd;if(Imported['VisuMZ_1_BattleCore']&&Sprite_Enemy[_0x4a2930(0x198)]){if(_0x4a2930(0x1aa)==='KmGlY'){function _0x7d8c9f(){const _0x365535=_0x4a2930;_0xb5c2df[_0x365535(0x272)][_0x365535(0x1d0)][_0x365535(0x27e)](this),this['_breakShieldSprite']=new _0xc6bc0c(),this[_0x365535(0x271)](this[_0x365535(0x20d)]);}}else return![];}else{if('WQWDk'===_0x4a2930(0x1c5))return Sprite_Enemy[_0x4a2930(0x242)];else{function _0x1fdfc7(){const _0x377960=_0x4a2930;this[_0x377960(0x21f)]=_0x2821fe['iconIndex'];}}}},VisuMZ['BreakShields']['Sprite_Enemy_setBattler']=Sprite_Enemy['prototype'][_0x2538cd(0x226)],Sprite_Enemy[_0x2538cd(0x265)]['setBattler']=function(_0xcea88a){const _0x252256=_0x2538cd;VisuMZ['BreakShields'][_0x252256(0x221)][_0x252256(0x27e)](this,_0xcea88a);if(this['_breakShieldSprite']){if(_0x252256(0x23f)===_0x252256(0x258)){function _0x1ea39c(){const _0x48a437=_0x252256;this[_0x48a437(0x27a)]=new _0xa9ada4(),this[_0x48a437(0x27a)][_0x48a437(0x210)]=new _0x4c0240(_0xc3e631['iconWidth'],_0x4154f8[_0x48a437(0x1ab)]),this[_0x48a437(0x27a)][_0x48a437(0x1df)]['x']=0.5,this[_0x48a437(0x27a)][_0x48a437(0x1df)]['y']=0.5,this[_0x48a437(0x271)](this[_0x48a437(0x27a)]);}}else this['_breakShieldSprite'][_0x252256(0x205)](this[_0x252256(0x187)],!![]);}};function Sprite_BreakShieldIcon(){const _0x487b49=_0x2538cd;this[_0x487b49(0x20c)](...arguments);}Sprite_BreakShieldIcon[_0x2538cd(0x265)]=Object[_0x2538cd(0x240)](Sprite[_0x2538cd(0x265)]),Sprite_BreakShieldIcon[_0x2538cd(0x265)][_0x2538cd(0x254)]=Sprite_BreakShieldIcon,Sprite_BreakShieldIcon[_0x2538cd(0x265)][_0x2538cd(0x20c)]=function(){const _0x2475c6=_0x2538cd;Sprite[_0x2475c6(0x265)][_0x2475c6(0x20c)]['call'](this),this[_0x2475c6(0x1eb)](),this['loadBitmap'](),this[_0x2475c6(0x1e6)]();},Sprite_BreakShieldIcon[_0x2538cd(0x265)][_0x2538cd(0x1eb)]=function(){const _0x179572=_0x2538cd;this[_0x179572(0x1c0)]=null,this[_0x179572(0x296)]=![],this[_0x179572(0x21f)]=0x0,this[_0x179572(0x1c7)]='',this[_0x179572(0x1f0)]='',this[_0x179572(0x1df)]['x']=0.5,this[_0x179572(0x1df)]['y']=0.5;},Sprite_BreakShieldIcon[_0x2538cd(0x265)][_0x2538cd(0x270)]=function(){const _0xdb043f=_0x2538cd;this[_0xdb043f(0x210)]=ImageManager[_0xdb043f(0x214)](_0xdb043f(0x28b)),this[_0xdb043f(0x1b8)](0x0,0x0,0x0,0x0);},Sprite_BreakShieldIcon[_0x2538cd(0x265)][_0x2538cd(0x1e6)]=function(){const _0x358b17=_0x2538cd;this[_0x358b17(0x27a)]=new Sprite(),this['_numberSprite'][_0x358b17(0x210)]=new Bitmap(ImageManager[_0x358b17(0x280)],ImageManager[_0x358b17(0x1ab)]),this[_0x358b17(0x27a)][_0x358b17(0x1df)]['x']=0.5,this[_0x358b17(0x27a)][_0x358b17(0x1df)]['y']=0.5,this[_0x358b17(0x271)](this[_0x358b17(0x27a)]);},Sprite_BreakShieldIcon['prototype'][_0x2538cd(0x205)]=function(_0x5c2778,_0x3ee071){const _0x2b2f67=_0x2538cd;this[_0x2b2f67(0x1c0)]!==_0x5c2778&&(this['_battler']=_0x5c2778),this['_autoPositioning']=_0x3ee071;},Sprite_BreakShieldIcon[_0x2538cd(0x265)][_0x2538cd(0x299)]=function(){const _0x37d895=_0x2538cd;Sprite[_0x37d895(0x265)]['update']['call'](this);if(this['shouldDisplay']())this[_0x37d895(0x275)]=0xff,this[_0x37d895(0x1ae)](),this[_0x37d895(0x203)](),this[_0x37d895(0x1b6)](),this['updateAutoPosition']();else{if(_0x37d895(0x1d2)===_0x37d895(0x1d2))this[_0x37d895(0x275)]=0x0;else{function _0x19b130(){const _0x41025a=_0x37d895;return this[_0x41025a(0x244)]&&this[_0x41025a(0x244)][_0x41025a(0x254)]===_0x4f4664;}}}},Sprite_BreakShieldIcon[_0x2538cd(0x265)]['shouldDisplay']=function(){const _0x5357bc=_0x2538cd;return this['_battler']&&this[_0x5357bc(0x1c0)][_0x5357bc(0x1be)]()&&this[_0x5357bc(0x1c0)][_0x5357bc(0x1e2)]();},Sprite_BreakShieldIcon[_0x2538cd(0x265)][_0x2538cd(0x1ae)]=function(){const _0x2731af=_0x2538cd;if(this[_0x2731af(0x1c0)]['isDead']()){const _0x2a913e=$dataStates[this[_0x2731af(0x1c0)][_0x2731af(0x188)]()];_0x2a913e&&_0x2a913e[_0x2731af(0x1ec)]>0x0?this[_0x2731af(0x21f)]=_0x2a913e[_0x2731af(0x1ec)]:this['_iconIndex']=0x0,this[_0x2731af(0x1c7)]='';}else{if(this[_0x2731af(0x1c0)][_0x2731af(0x278)]()){const _0x1cfdc0=$dataStates[Game_Battler[_0x2731af(0x1d3)]];if(_0x1cfdc0&&_0x1cfdc0[_0x2731af(0x1ec)]>0x0)this['_iconIndex']=_0x1cfdc0[_0x2731af(0x1ec)];else{if(_0x2731af(0x212)!==_0x2731af(0x281))this[_0x2731af(0x21f)]=ImageManager[_0x2731af(0x28c)];else{function _0x1e37d7(){const _0x4f7fff=_0x2731af;this[_0x4f7fff(0x20c)](...arguments);}}}if(ImageManager[_0x2731af(0x21b)]){if(_0x2731af(0x1e4)===_0x2731af(0x1ca)){function _0x553a86(){const _0x35f4ec=_0x2731af;if(!_0x18ac9f[_0x35f4ec(0x278)]()){var _0x5f50be=this[_0x35f4ec(0x1cd)](_0x116887);if(_0x5f50be>=_0x3abcc6['BREAK_SHIELDS_MINIMUM_WEAKNESS_RATE']){var _0x2f81c1=-0x1*this[_0x35f4ec(0x201)]();_0x8f7a1c[_0x35f4ec(0x284)](),_0x78a11[_0x35f4ec(0x1ce)](_0x2f81c1);}}}}else{this['_numberValue']=this['_battler']['_stateTurns'][_0x1cfdc0['id']]||0x0;if(this[_0x2731af(0x1c7)]<=0x0)this[_0x2731af(0x1c7)]='';}}else{if(_0x2731af(0x297)===_0x2731af(0x1b5)){function _0x1f2555(){const _0x3f2025=_0x2731af;return this['_battler']&&this[_0x3f2025(0x1c0)]['isAppeared']()&&this[_0x3f2025(0x1c0)][_0x3f2025(0x1e2)]();}}else this[_0x2731af(0x1c7)]='';}}else{if('gOEgU'===_0x2731af(0x1a7)){function _0x30e17d(){const _0x2cea6f=_0x2731af;_0x425aad['BreakShields'][_0x2cea6f(0x24b)][_0x2cea6f(0x27e)](this,_0x3c7753),this[_0x2cea6f(0x1e1)](_0x186c43);}}else this['_iconIndex']=ImageManager[_0x2731af(0x23b)],this[_0x2731af(0x1c7)]=this[_0x2731af(0x1c0)][_0x2731af(0x260)]();}}},Sprite_BreakShieldIcon[_0x2538cd(0x265)][_0x2538cd(0x203)]=function(){const _0x10da7f=_0x2538cd,_0x572929=ImageManager[_0x10da7f(0x280)],_0x5cb911=ImageManager[_0x10da7f(0x1ab)],_0x3269ce=this[_0x10da7f(0x21f)]%0x10*_0x572929,_0x1c7c7a=Math[_0x10da7f(0x1c4)](this[_0x10da7f(0x21f)]/0x10)*_0x5cb911;this[_0x10da7f(0x1b8)](_0x3269ce,_0x1c7c7a,_0x572929,_0x5cb911);},Sprite_BreakShieldIcon[_0x2538cd(0x265)][_0x2538cd(0x1b6)]=function(){const _0x4e3851=_0x2538cd;if(this[_0x4e3851(0x1f0)]===this[_0x4e3851(0x1c7)])return;this['_displayValue']=this['_numberValue'];const _0x2b9792=this[_0x4e3851(0x27a)][_0x4e3851(0x210)];_0x2b9792['fontFace']=$gameSystem[_0x4e3851(0x183)](),_0x2b9792[_0x4e3851(0x1b7)]=VisuMZ[_0x4e3851(0x272)]['Settings']['UI'][_0x4e3851(0x286)],_0x2b9792[_0x4e3851(0x18b)](),_0x2b9792[_0x4e3851(0x231)](this[_0x4e3851(0x1f0)],0x0,0x0,_0x2b9792[_0x4e3851(0x1ad)],_0x2b9792[_0x4e3851(0x23e)],'center');},Sprite_BreakShieldIcon['prototype'][_0x2538cd(0x1cf)]=function(){const _0x2b5b1d=_0x2538cd;if(!this[_0x2b5b1d(0x296)])return;if(!SceneManager['isSceneBattle']())return;if(!SceneManager[_0x2b5b1d(0x244)][_0x2b5b1d(0x288)])return;const _0x2bdb46=SceneManager[_0x2b5b1d(0x244)][_0x2b5b1d(0x288)][_0x2b5b1d(0x236)](this[_0x2b5b1d(0x1c0)]);if(!_0x2bdb46)return;const _0x4c2837=this[_0x2b5b1d(0x1c0)][_0x2b5b1d(0x232)]()?Sprite_Actor:Sprite_Enemy,_0x515430=_0x4c2837[_0x2b5b1d(0x229)];this['x']=0x0;if(_0x515430[_0x2b5b1d(0x23d)](/left/i)){if(_0x2b5b1d(0x193)!==_0x2b5b1d(0x277))this['x']=Math[_0x2b5b1d(0x1c4)](_0x2bdb46['width']/-0x2);else{function _0x384f09(){_0x2de7ef=_0x3dceaa['max'](_0x2ab726,_0x2b5696);}}}else _0x515430['match'](/right/i)&&(this['x']=Math[_0x2b5b1d(0x256)](_0x2bdb46[_0x2b5b1d(0x1ad)]/0x2));this['x']+=_0x4c2837[_0x2b5b1d(0x1f2)],this['y']=0x0;if(_0x515430[_0x2b5b1d(0x23d)](/top/i)){if(_0x2b5b1d(0x230)===_0x2b5b1d(0x1c8)){function _0x3cba3f(){this['_numberValue']='';}}else this['y']=_0x2bdb46['height']*-0x1;}else _0x515430['match'](/middle/i)&&(this['y']=Math[_0x2b5b1d(0x18c)](_0x2bdb46['height']*-0.5));this['y']+=_0x4c2837[_0x2b5b1d(0x204)];};Imported[_0x2538cd(0x1a3)]&&Sprite_Enemy[_0x2538cd(0x198)]&&(VisuMZ[_0x2538cd(0x272)]['Sprite_EnemyName_createAttachedSprites']=Sprite_EnemyName[_0x2538cd(0x265)][_0x2538cd(0x26d)],Sprite_EnemyName[_0x2538cd(0x265)][_0x2538cd(0x26d)]=function(){const _0x5cf8c7=_0x2538cd;VisuMZ[_0x5cf8c7(0x272)][_0x5cf8c7(0x1d0)][_0x5cf8c7(0x27e)](this),this['_breakShieldSprite']=new Sprite_BreakShieldIcon(),this['addChild'](this['_breakShieldSprite']);},VisuMZ[_0x2538cd(0x272)]['Sprite_EnemyName_updateAttachedSprites']=Sprite_EnemyName[_0x2538cd(0x265)]['updateAttachedSprites'],Sprite_EnemyName['prototype'][_0x2538cd(0x19a)]=function(){const _0x57d35d=_0x2538cd;VisuMZ[_0x57d35d(0x272)][_0x57d35d(0x25d)][_0x57d35d(0x27e)](this),this[_0x57d35d(0x1a6)]();},Sprite_EnemyName['prototype']['updateBreakShieldIconSprite']=function(){const _0x4f0965=_0x2538cd;if(!this[_0x4f0965(0x20d)])return;if(this[_0x4f0965(0x1c0)]!==this[_0x4f0965(0x20d)]['_battler']){if(_0x4f0965(0x228)===_0x4f0965(0x289)){function _0x542c70(){const _0x50de55=_0x4f0965;_0x2dd82d=_0x4f88e3['x']+_0x6cfd57['width']-_0x4da97a[_0x50de55(0x280)];}}else this['_breakShieldSprite']['setup'](this['_battler'],![]);}const _0x59f49d=this['textWidth']();this['_lineHeight']=this[_0x4f0965(0x251)]||Window_Base['prototype']['lineHeight'](),this['_breakShieldSprite']['x']=Math[_0x4f0965(0x18c)]((_0x59f49d+ImageManager[_0x4f0965(0x280)])/-0x2)-0x8,this[_0x4f0965(0x20d)]['y']=this[_0x4f0965(0x251)]/0x2,this[_0x4f0965(0x20d)]['x']+=Sprite_Enemy[_0x4f0965(0x238)]||0x0,this[_0x4f0965(0x20d)]['y']+=Sprite_Enemy['BREAK_SHIELD_BATTLER_ATTACH_OFFSET_Y']||0x0;});;function _0x2ecc(_0x2c11e3,_0x20805b){_0x2c11e3=_0x2c11e3-0x183;let _0x10446d=_0x1044[_0x2c11e3];return _0x10446d;}Window_StatusBase['BREAK_SHIELDS_MENU_ICONS']=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)]['UI'][_0x2538cd(0x235)],VisuMZ['BreakShields']['Window_StatusBase_drawActorIcons']=Window_StatusBase[_0x2538cd(0x265)]['drawActorIcons'],Window_StatusBase[_0x2538cd(0x265)]['drawActorIcons']=function(_0x59e86d,_0x574a06,_0x403942,_0x3a0858){const _0x3436be=_0x2538cd;_0x3a0858=_0x3a0858||0x90;if(this[_0x3436be(0x1fa)](_0x59e86d)){const _0x2422e8=_0x574a06+Math[_0x3436be(0x18c)](ImageManager[_0x3436be(0x280)]/0x2),_0x2df0dd=_0x403942+Math[_0x3436be(0x18c)](ImageManager[_0x3436be(0x1ab)]/0x2)+0x2;this[_0x3436be(0x287)](_0x59e86d,_0x2422e8,_0x2df0dd),_0x574a06+=ImageManager[_0x3436be(0x280)],_0x3a0858-=ImageManager['iconWidth'];}VisuMZ[_0x3436be(0x272)][_0x3436be(0x262)][_0x3436be(0x27e)](this,_0x59e86d,_0x574a06,_0x403942,_0x3a0858);},Window_StatusBase[_0x2538cd(0x265)][_0x2538cd(0x1fa)]=function(_0x36eeca){const _0x58bbe0=_0x2538cd;if(!_0x36eeca)return![];if(!Window_StatusBase['BREAK_SHIELDS_MENU_ICONS'])return![];if(_0x36eeca[_0x58bbe0(0x232)]()){if(_0x58bbe0(0x267)===_0x58bbe0(0x224)){function _0x11e9fe(){const _0x4385fd=_0x58bbe0;this[_0x4385fd(0x1c0)]=_0x12571c;}}else return Game_Battler[_0x58bbe0(0x1bf)];}else{if(_0x36eeca[_0x58bbe0(0x1c2)]()){if(_0x58bbe0(0x1e7)!==_0x58bbe0(0x1e7)){function _0x1eec30(){const _0xa4532b=_0x58bbe0,_0x38bda9=_0x58698c(_0x4e8a7e['$1']);_0x38bda9!==_0x5311cc[_0x348243][_0xa4532b(0x211)]&&(_0xa41d65(_0xa4532b(0x24c)[_0xa4532b(0x1ee)](_0x1b550c,_0x38bda9)),_0x196c0f[_0xa4532b(0x250)]());}}else return Game_Battler[_0x58bbe0(0x208)];}else return!![];}},Window_StatusBase[_0x2538cd(0x265)][_0x2538cd(0x287)]=function(_0x5dd04f,_0x28c6d5,_0x66517b){const _0x580c1c=_0x2538cd,_0x187150=_0x580c1c(0x1f5)[_0x580c1c(0x1ee)](_0x5dd04f[_0x580c1c(0x213)]()),_0x2814fd=this[_0x580c1c(0x19e)](_0x187150,Sprite_BreakShieldIcon);_0x2814fd['setup'](_0x5dd04f,![]),_0x2814fd[_0x580c1c(0x220)](_0x28c6d5,_0x66517b),_0x2814fd[_0x580c1c(0x1f6)]();},Window_BattleStatus[_0x2538cd(0x1d4)]=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)]['UI'][_0x2538cd(0x223)],Window_BattleStatus[_0x2538cd(0x1b9)]=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)]['UI']['BattleStatusAutoPosition'],Window_BattleStatus[_0x2538cd(0x185)]=VisuMZ[_0x2538cd(0x272)]['Settings']['UI']['BattleStatusOffsetX'],Window_BattleStatus[_0x2538cd(0x184)]=VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x294)]['UI'][_0x2538cd(0x1d8)],VisuMZ[_0x2538cd(0x272)][_0x2538cd(0x24b)]=Window_BattleStatus[_0x2538cd(0x265)][_0x2538cd(0x26f)],Window_BattleStatus['prototype'][_0x2538cd(0x26f)]=function(_0x2c7a63){const _0x3ab022=_0x2538cd;VisuMZ[_0x3ab022(0x272)][_0x3ab022(0x24b)]['call'](this,_0x2c7a63),this['drawItemStatusBreakShields'](_0x2c7a63);},Window_BattleStatus[_0x2538cd(0x265)]['drawItemStatusBreakShields']=function(_0x5162b5){const _0x40571c=_0x2538cd;if(!Window_BattleStatus[_0x40571c(0x1d4)])return;if(!Game_Battler[_0x40571c(0x1bf)])return;const _0x2701b7=this['actor'](_0x5162b5);if(!_0x2701b7[_0x40571c(0x1e2)]())return;if(!Window_BattleStatus[_0x40571c(0x1b9)])this['drawItemStatusBreakShieldsDefault'](_0x5162b5);else{if(!Imported['VisuMZ_1_BattleCore'])this[_0x40571c(0x25f)](_0x5162b5);else{if(_0x40571c(0x189)!==_0x40571c(0x189)){function _0x1ca398(){const _0x11b2ec=_0x40571c;this[_0x11b2ec(0x24f)]=_0x5414a7[_0x11b2ec(0x256)](_0x14fbd3),this[_0x11b2ec(0x24f)]=this['_currentBreakShield'][_0x11b2ec(0x247)](0x0,_0x27e26b[_0x11b2ec(0x1fd)]),this[_0x11b2ec(0x24f)]<=0x0&&this[_0x11b2ec(0x26b)](),this['refresh']();}}else this[_0x40571c(0x1b0)](_0x5162b5);}}},Window_BattleStatus['prototype'][_0x2538cd(0x25f)]=function(_0x11be49){const _0x18ee8b=_0x2538cd,_0x5ea27c=this['actor'](_0x11be49),_0x250768=this['itemRectWithPadding'](_0x11be49),_0x931cf8=Math[_0x18ee8b(0x18c)](ImageManager[_0x18ee8b(0x280)]/0x2);let _0x536e44=_0x250768['x']+_0x931cf8-0x4+Window_BattleStatus[_0x18ee8b(0x185)],_0x35c7d2=_0x250768['y']+_0x931cf8+0x4+Window_BattleStatus[_0x18ee8b(0x184)];this[_0x18ee8b(0x287)](_0x5ea27c,_0x536e44,_0x35c7d2);},Window_BattleStatus['prototype']['drawItemStatusBreakBattleCore']=function(_0x19af9b){const _0x4d12d7=_0x2538cd,_0x10ea7b=this[_0x4d12d7(0x190)](_0x19af9b),_0x5eb5e5=this[_0x4d12d7(0x24a)](_0x19af9b),_0x43fed7=Math[_0x4d12d7(0x18c)](_0x5eb5e5['x']+(_0x5eb5e5[_0x4d12d7(0x1ad)]-0x80)/0x2),_0x4383e0=this[_0x4d12d7(0x233)](_0x5eb5e5),_0x9c624=Math[_0x4d12d7(0x18c)](ImageManager[_0x4d12d7(0x280)]/0x2);let _0x3afd1b=_0x43fed7-_0x9c624-0x4,_0x2e0256=_0x4383e0+_0x9c624;if(_0x3afd1b-ImageManager[_0x4d12d7(0x280)]/0x2<_0x5eb5e5['x']){if(_0x4d12d7(0x28a)!==_0x4d12d7(0x225))_0x3afd1b=_0x43fed7+_0x9c624-0x4,_0x2e0256=_0x4383e0-_0x9c624;else{function _0x483bd5(){const _0x1f8b9d=_0x4d12d7,_0x5c48a6=_0x197d3e[_0x1f8b9d(0x280)],_0x377ee8=_0x10816c[_0x1f8b9d(0x1ab)],_0x8636ed=this['_iconIndex']%0x10*_0x5c48a6,_0x3445ee=_0x138c0a[_0x1f8b9d(0x1c4)](this[_0x1f8b9d(0x21f)]/0x10)*_0x377ee8;this[_0x1f8b9d(0x1b8)](_0x8636ed,_0x3445ee,_0x5c48a6,_0x377ee8);}}}let _0x289b0d=_0x5eb5e5['x']+_0x9c624+0x4,_0x4cee33=_0x5eb5e5['y']+_0x9c624+0x4;const _0x19730e=this[_0x4d12d7(0x21a)]();switch(_0x19730e){case _0x4d12d7(0x29a):if(!VisuMZ[_0x4d12d7(0x268)][_0x4d12d7(0x294)][_0x4d12d7(0x1dd)][_0x4d12d7(0x1a1)]){if(_0x4d12d7(0x1cc)==='lqdEh'){function _0x326e5f(){const _0x37cbeb=_0x4d12d7;this[_0x37cbeb(0x1c7)]=this['_battler']['_stateTurns'][_0x561415['id']]||0x0;if(this[_0x37cbeb(0x1c7)]<=0x0)this[_0x37cbeb(0x1c7)]='';}}else _0x289b0d=_0x5eb5e5['x']+_0x5eb5e5['width']-ImageManager[_0x4d12d7(0x280)];}break;case'xp':case'portrait':case _0x4d12d7(0x199):case _0x4d12d7(0x274):_0x289b0d=_0x3afd1b,_0x4cee33=_0x2e0256+ImageManager[_0x4d12d7(0x1ab)];break;}_0x289b0d+=Window_BattleStatus[_0x4d12d7(0x185)],_0x4cee33+=Window_BattleStatus[_0x4d12d7(0x184)],this[_0x4d12d7(0x287)](_0x10ea7b,_0x289b0d,_0x4cee33);};