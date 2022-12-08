//=============================================================================
// VisuStella MZ - Battle System - FTB - Free Turn Battle
// VisuMZ_2_BattleSystemFTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemFTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemFTB = VisuMZ.BattleSystemFTB || {};
VisuMZ.BattleSystemFTB.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.09] [BattleSystemFTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_FTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Free Turn Battle (FTB) is a type of battle system made for RPG Maker MZ,
 * where the teams for actors and enemies take turns attacking one another as
 * a whole. During each team's turns, an action count is given to them and they
 * can freely perform actions among their teammates as wanted (or if turned off
 * by the Plugin Parameters, in a cycle). When the action count is depleted or
 * if one team ran out of battler's that can act, the other team begins their
 * turn and so forth.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ftb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actor and enemy teams take turns attacking each other as a whole.
 * * Action counts are given to each team at the start of each turn to utilize
 *   actions for.
 * * If enabled, actors can be freely switched around to perform actions with.
 * * Alter the mechanics of the Battle System FTB to your liking through the
 *   Plugin Parameters.
 * * An Action Count Display is shown for each side to relay information to the
 *   player about the current state of each turn.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Surprise Attacks and Preemptive Bonuses
 * 
 * Due to the nature of a team-based battle system, surprise attacks and
 * preemptive bonuses no longer prevent the other team from being able to act
 * for a turn as that gives the initiating team too much advantage. Instead,
 * a surprise attack means the enemy team will always start first for each turn
 * while a preemptive bonus means the actor team will always start first for
 * each turn.
 * 
 * ---
 * 
 * Agility and Speed
 * 
 * When there is no surprise attack or preemptive bonus, aka a neutral battle
 * initiative, then the team that goes first is determined by their Agility
 * value at the start of battle (unless determined otherwise through the Plugin
 * Parameters).
 * 
 * However, because of the nature of team-based battle systems, agility and
 * speed have no impact on action speeds as action speeds are now instantly
 * performed.
 * 
 * Agility, however, can influence Action Counts through buffs and debuffs if
 * enabled through the Plugin Parameters. Each stack of Agility buffs will
 * raise the Action Count for a team while each stack of Agility debuffs will
 * decrease them for subsequent turns.
 * 
 * ---
 * 
 * Action Count
 * 
 * Each team will have an allotted number of actions available for usage. This
 * amount is determined by the number of alive members they have available by
 * default multiplied by their action count base.
 * 
 * The amount of actions that can be performed at base value can be determined
 * inside the Plugin Parameters > Mechanics Settings > Base.
 * 
 * The action count can be altered by AGI buffs and/or debuffs depending on the
 * Plugin Parameter settings.
 * 
 * Further action counts can be altered by various notetag effects tied to the
 * trait objects of each battle member.
 * 
 * ---
 * 
 * Action Orders
 * 
 * As team-based battle systems always have teams go between each other, the
 * standard action orders seen for turn-based and tick-based battle systems no
 * longer exist. However, in the event the actor team has berserk, confused, or
 * autobattlers, the actions will be performed in the following order:
 * 
 * 1. Berserk, confused, and auto battlers go first.
 * 2. If any actions are left, inputtable actors go next.
 * 3. If any actions are left, but there are no inputtable actors, berserk,
 *    confused, and auto battlers use up the remaining actions.
 * 4. Switch to the next team.
 * 
 * For enemy teams, enemies will always go in order from left-to-right for the
 * front view or right-to-left for sideview. If there are actions left, the
 * enemy team will cycle back to the first acting enemy.
 * 
 * ---
 * 
 * Free Range Switching
 * 
 * If this is enabled (it's an optional feature) and it's the player's turn,
 * the player can freely switch between actors in his/her party by pressing the
 * left/right buttons or the page up/page down buttons. The Actor Command
 * Window will automatically update to the newly selected actor. This gives the
 * player complete control and freedom over the party and the party's actions.
 * 
 * For touch controls, instead of pressing left/right or page up/page down on
 * the keyboard, click on the Battle Status Window for the target actor to be
 * selected to perform an action. The Actor Command Window will automatically
 * update to the newly selected actor.
 * 
 * ---
 *
 * Turn Structure
 * 
 * Each battle turn is dedicated to one team or the other. You need to design
 * your turns with this in mind. When one team finishes its actions, the next
 * turn will have the other team perform theirs.
 * 
 * As a result, both teams will not benefit from their turn end activities such
 * as regeneration at the end of each battle turn. Instead, they will only
 * occur at the end of their own respective turns.
 * 
 * However, for states and buffs, this is slightly different. States and buffs
 * update at the end of the opposing team's turn. This is so that 1 turn states
 * like Guard will last until the opponent's turn is over instead of being over
 * immediately after the player's turn ends (rendering the effect useless).
 * 
 * The state and buff turn updates can be disabled in the Plugin Parameters.
 * However, the durations must be accounted for if disabled (ie. making Guard
 * last two turns instead of 1).
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
 * === General FTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <FTB Help>
 *  description
 *  description
 * </FTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under FTB.
 * - This is primarily used if the skill behaves differently in FTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to FTB.
 *
 * ---
 * 
 * === Action Cost-Related Notetags ===
 * 
 * ---
 *
 * <FTB Action Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the FTB action cost of this skill/item to 'x'.
 * - Replace 'x' with a number value representing the action cost required to
 *   perform the skill.
 *
 * ---
 *
 * <FTB Hide Action Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the FTB action cost for this skill/item hidden regardless of Plugin
 *   Parameter settings.
 *
 * ---
 *
 * <FTB Show Action Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the FTB action cost for this skill/item visible regardless of Plugin
 *   Parameter settings.
 *
 * ---
 * 
 * === Mechanics-Related Notetags ===
 * 
 * ---
 *
 * <FTB Pass Turn>
 *
 * - Used for: Skill, Item Notetags
 * - If a battler uses this skill/item, then even if there are actions left for
 *   the team to perform, that battler would no longer be able to input as they
 *   have already passed their turn.
 * - By default, this applies to "Guard". If you don't want it to apply to the
 *   Guard skill, turn it off in the Plugin Parameters for mechanics.
 *
 * ---
 *
 * <FTB Actions: +x>
 * <FTB Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Battlers associated with these trait objects can increase or decrease the
 *   maximum number of actions performed each turn.
 * - Replace 'x' with a number representing the increase or decrease in action
 *   count per turn.
 * - Depending on the Plugin Parameters, altering the max value can result in
 *   gaining or losing remaining actions for the current turn.
 *
 * ---
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: FTB Action Count Visibility
 * - Determine the visibility of the FTB Action Count Display.
 *
 *   Visibility:
 *   - Changes the visibility of the FTB Action Count Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Determines the general settings of the FTB Battle System. These settings
 * range from determining how the Action Count resources and costs are
 * displayed to the text that appear during team shifting.
 *
 * ---
 *
 * Action Counts
 * 
 *   Full Name:
 *   - What is the full name of "Action Counts" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Action Counts" in your game?
 * 
 *   Cost Format:
 *   - How are Action Count costs displayed?
 *   - %1 - Cost, %2 - Abbr Text, %3 - Icon
 * 
 * ---
 * 
 * Icons
 * 
 *   Actor Action Icon:
 *   - What icon is used to represent actor actions?
 * 
 *   Enemy Action Icon:
 *   - What icon is used to represent enemy actions?
 * 
 *   Empty Action Icon:
 *   - What icon is used to represent empty actions?
 *
 * ---
 *
 * Team Shift
 * 
 *   Party's Turn:
 *   - Text that appears when it's the party's turn.
 *   - %1 - Party Name
 * 
 *   Enemy's Turn:
 *   - Text that appears when it's the enemy's turn.
 * 
 *   Wait Frames:
 *   - How many frames to wait in between team changes?
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the action cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the action cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the action cost for the Guard command?
 * 
 *   Show Cost: 0 Action:
 *   - Show the action cost when the cost is 0 action?
 * 
 *   Show Cost: 1 Action:
 *   - Show the action cost when the cost is 1 action?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the FTB Battle System. From here, you can
 * enable or disable core mechanics, determine how to determine turn advantage,
 * and how the various supporting mechanics operate.
 *
 * ---
 *
 * Main Mechanics
 * 
 *   Enable Free Switch?:
 *   - Enable free range switching between actors?
 * 
 *     Maintain Same Actor?:
 *     - Requires Free Switching.
 *     - Maintain the same actor after an action or move onto the next
 *       available actor?
 * 
 *   Reset Index New Turns:
 *   - Resets the selected actor whenever a new turn starts?
 *   - Needs "Free Switching" to be off.
 * 
 *   Guard > Pass Turn?:
 *   - Does guarding cause a battler to pass turn?
 * 
 *   Gain Differences?:
 *   - If the max Action Count for a team changes, gain the difference in value
 *     if positive?
 * 
 *   Lose Differences?:
 *   - If the max Action Count for a team changes, lose the difference in value
 *     if negative?
 * 
 *   State/Buff Updates:
 *   - If enabled, update state/buff turns only on opponent turns.
 *   - Otherwise, they occur every turn.
 *
 * ---
 *
 * Turn Advantage
 * 
 *   Neutral Advantage:
 *   - For a neutral advantage battle, what determines which team goes first?
 *     - Random - 50% chance on which team goes first
 *     - Player - Player's team always goes first.
 *     - Lowest AGI - Battler with lowest AGI's team goes first
 *     - Average AGI - Team with the highest average AGI goes first
 *     - Highest AGI - Battler with highest AGI's team goes first
 *     - Total AGI - Team with highest total AGI goes first
 *
 * ---
 *
 * Action Generation
 * 
 *   Base:
 *   - What is the starting base number of actions that are generated per
 *     battler each turn?
 * 
 *   AGI Buff Influence?:
 *   - Do AGI buffs give +1 for each stack?
 * 
 *   AGI Debuff Influence?:
 *   - Do AGI debuffs give -1 for each stack?
 * 
 *   Maximum Actions:
 *   - What is the absolute maximum number of actions a team can have
 *     each turn?
 * 
 *   Minimum Actions:
 *   - What is the bare minimum number of actions a team can have each turn?
 * 
 *   Allow Overflow?:
 *   - Allow current actions to overflow?
 *   - Or let them cap at the current team max?
 *
 * ---
 *
 * Default Action Costs
 * 
 *   Skills:
 *   - What is the default action cost for skills?
 * 
 *   Items:
 *   - What is the default action cost for items?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Count Display Settings
 * ============================================================================
 *
 * Adjust the settings for the Action Count Display. They appear in the upper
 * or lower corners of the screen for the player party and the enemy troop.
 *
 * ---
 *
 * Display Settings
 * 
 *   Draw Horizontally?:
 *   - Which direction do you want the Action Count Display to go?
 * 
 *   Bottom Position?:
 *   - Place the Action Count Display towards the bottom of the screen?
 * 
 *     Offset Top Log Y?:
 *     - If using the top position, offset the log window's Y position.
 * 
 *     Reposition for Help?:
 *     - If using the top position, reposition the display when the help window
 *       is open?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's X/Y coordinates by this much when the
 *     Help Window is visible.
 *
 * ---
 *
 * Picture Settings
 * 
 *   Actor Action Picture:
 *   Enemy Action Picture:
 *   Empty Action Picture:
 *   - Optional. Place an image for an actor, enemy, or empty action instead of
 *     an icon?
 *
 * ---
 *
 * Coordinates
 * 
 *   Screen Buffer X:
 *   Screen Buffer Y:
 *   - Buffer from the the edge of the screen's X/Y by this much.
 * 
 *   Actor Offset X:
 *   Actor Offset Y:
 *   Enemy Offset X:
 *   Enemy Offset Y:
 *   - Offset the actor/enemy images' X/Y by this much.
 *
 * ---
 *
 * Draw Settings
 * 
 *   Max Actions Visible:
 *   - How many action slots max should be drawn for each team?
 * 
 *   Image Size:
 *   - What is the size of the icons or pictures for the action slots?
 * 
 *   Gap Distance:
 *   - How wide should the gab between each slot be in pixels?
 * 
 *   Icon Smoothing?:
 *   - Smooth the display for icons?
 *   - Or pixelate them?
 * 
 *   Picture Smoothing?:
 *   - Smooth the display for pictures?
 *   - Or pixelate them?
 *
 * ---
 *
 * Turns Remaining
 * 
 *   Show Number?:
 *   - Show a number to display the actions remaining?
 * 
 *   Font Size:
 *   - What font size should be used for this number?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the remaining actions number X/Y.
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
 * Version 1.09: June 2, 2022
 * * Bug Fixes!
 * ** Fixed a bug where Force Actions do not work when there's only one action
 *    left for the turn. Fix made by Olivia.
 * 
 * Version 1.08: April 21, 2022
 * * Bug Fixes!
 * ** Fixed a bug that prevents the battle system from shifting back to the
 *    default battle system after an enemy counter attack. Fix made by Olivia.
 * 
 * Version 1.07: April 14, 2022
 * * Compatibility Update!
 * ** Now works more compatible with counters. Update made by Olivia.
 * 
 * Verison 1.06: March 17, 2022
 * * Bug Fixes!
 * ** Death by slip damage will now perform the proper death animation.
 *    Fix made by Olivia.
 * 
 * Version 1.05: August 13, 2021
 * * Bug Fixes!
 * ** Fixed some Plugin Parameters that did not work properly when
 *    showing/hiding action costs. Fix made by Irina.
 * 
 * Version 1.04: June 18, 2021
 * * Documentation Update!
 * ** Added "Action Count" section to Major Changes for extra clarity on how
 *    action counts are determined.
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Olivia:
 * *** <FTB Show Action Cost>
 * **** Makes the FTB action cost for this skill/item visible regardless of
 *      Plugin Parameter settings.
 * 
 * Version 1.03: May 28, 2021
 * * Documentation Update!
 * ** Updated the text for Plugin Parameter "Maintain Same Actor?"
 * *** Requires Free Switching. Maintain the same actor after an action or move
 *     onto the next available actor?
 * * Feature Update!
 * ** When there are more actions available than the number of actions that can
 *    be shown at a time, the visible icons displayed will be trimmed to fit
 *    the number of maximum visible icons displayed. Update by Olivia.
 * 
 * Version 1.02: April 2, 2021
 * * Bug Fixes!
 * ** Action costs for FTP will now only take effect if inside battle only.
 *    Fix made by Olivia.
 * 
 * Version 1.01: March 19, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.00 Official Release Date: February 22, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemActionCountVisibility
 * @text System: FTB Action Count Visibility
 * @desc Determine the visibility of the FTB Action Count Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the FTB Action Count Display.
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
 * @param BattleSystemFTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc Determines the general settings of the FTB Battle System.
 * @default {"ActionCounts":"","ActionCountFull:str":"Fight Points","ActionCountAbbr:str":"FP","ActionCountCostFmt:str":"\\FS[22]\\C[0]×%1%3\\C[0]","Icons":"","ActorActionsIcon:num":"165","EnemyActionsIcon:num":"162","EmptyActionsIcon:num":"161","TeamShift":"","PartyTeamShiftFmt:str":"%1's Turn!","TroopTeamShiftFmt:str":"Opponent's Turn!","TeamShiftWait:num":"60","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","Show_0_Action_Cost:eval":"true","Show_1_Action_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of the FTB Battle System.
 * @default {"Main":"","FreeChange:eval":"true","KeepPrevActor:eval":"true","GuardPass:eval":"true","GainDiff:eval":"true","LoseDiff:eval":"false","StateBuffUpdate:eval":"true","TurnAdvantage":"","NeutralAdvantage:str":"average agi","ActionGeneration":"","GenerateBase:num":"1","AgiBuff:eval":"true","AgiDebuff:eval":"false","MaxActions:num":"99","MinActions:num":"1","AllowOverflow:eval":"false","DefaultCost":"","DefaultCostSkill:num":"1","DefaultCostItem:num":"1"}
 *
 * @param ActionCountDisplay:struct
 * @text Action Count Display
 * @type struct<ActionCountDisplay>
 * @desc Adjust the settings for the Action Count Display.
 * @default {"Display":"","DrawHorz:eval":"true","BottomPosition:eval":"true","LogWindowTopOffsetY:num":"40","RepositionTopForHelp:eval":"true","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"160","Pictures":"","ActorActionPicture:str":"","EnemyActionPicture:str":"","EmptyActionPicture:str":"","Coordinates":"","ScreenBufferX:num":"16","ScreenBufferY:num":"16","ActorOffsetX:num":"0","ActorOffsetY:num":"0","EnemyOffsetX:num":"0","EnemyOffsetY:num":"0","DrawSettings":"","MaxVisible:num":"10","ImageSize:num":"32","ImageGapDistance:num":"2","IconSmoothing:eval":"false","PictureSmoothing:eval":"true","TurnsRemaining":"","DrawActionsRemaining:eval":"true","ActionsRemainingFontSize:num":"26","ActionsRemainingOffsetX:num":"0","ActionsRemainingOffsetY:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param ActionCounts
 * @text Action Counts
 *
 * @param ActionCountFull:str
 * @text Full Name
 * @parent ActionCounts
 * @desc What is the full name of "Action Counts" in your game?
 * @default Fight Points
 *
 * @param ActionCountAbbr:str
 * @text Abbreviation
 * @parent ActionCounts
 * @desc What is the abbreviation of "Action Counts" in your game?
 * @default FP
 *
 * @param ActionCountCostFmt:str
 * @text Cost Format
 * @parent ActionCounts
 * @desc How are Action Count costs displayed?
 * %1 - Cost, %2 - Abbr Text, %3 - Icon
 * @default \FS[22]\C[0]×%1%3\C[0]
 *
 * @param Icons
 *
 * @param ActorActionsIcon:num
 * @text Actor Action Icon
 * @parent Icons
 * @desc What icon is used to represent actor actions?
 * @default 165
 *
 * @param EnemyActionsIcon:num
 * @text Enemy Action Icon
 * @parent Icons
 * @desc What icon is used to represent enemy actions?
 * @default 162
 *
 * @param EmptyActionsIcon:num
 * @text Empty Action Icon
 * @parent Icons
 * @desc What icon is used to represent empty actions?
 * @default 161
 *
 * @param TeamShift
 * @text Team Shift
 *
 * @param PartyTeamShiftFmt:str
 * @text Party's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the party's turn.
 * %1 - Party Name
 * @default %1's Turn!
 *
 * @param TroopTeamShiftFmt:str
 * @text Enemy's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the enemy's turn.
 * @default Opponent's Turn!
 *
 * @param TeamShiftWait:num
 * @text Wait Frames
 * @parent TeamShift
 * @type number
 * @desc How many frames to wait in between team changes?
 * @default 60
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the action cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Guard command?
 * @default false
 *
 * @param Show_0_Action_Cost:eval
 * @text Show Cost: 0 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 0 action?
 * @default true
 *
 * @param Show_1_Action_Cost:eval
 * @text Show Cost: 1 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 1 action?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Main
 * @text Main Mechanics
 *
 * @param FreeChange:eval
 * @text Enable Free Switch?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable free range switching between actors?
 * @default true
 *
 * @param KeepPrevActor:eval
 * @text Maintain Same Actor?
 * @parent FreeChange:eval
 * @type boolean
 * @on Maintain
 * @off Next Available
 * @desc Requires Free Switching. Maintain the same actor after
 * an action or move onto the next available actor?
 * @default true
 *
 * @param NewTurnResetIndex:eval
 * @text Reset Index New Turns
 * @parent Main
 * @type boolean
 * @on Reset
 * @off Keep
 * @desc Resets the selected actor whenever a new turn starts?
 * Needs "Free Switching" to be off.
 * @default false
 *
 * @param GuardPass:eval
 * @text Guard > Pass Turn?
 * @parent Main
 * @type boolean
 * @on Pass Turn
 * @off Don't Pass
 * @desc Does guarding cause a battler to pass turn?
 * @default true
 *
 * @param GainDiff:eval
 * @text Gain Differences?
 * @parent Main
 * @type boolean
 * @on Gain Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * gain the difference in value if positive?
 * @default true
 *
 * @param LoseDiff:eval
 * @text Lose Differences?
 * @parent Main
 * @type boolean
 * @on Lose Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * lose the difference in value if negative?
 * @default false
 *
 * @param StateBuffUpdate:eval
 * @text State/Buff Updates
 * @parent Main
 * @type boolean
 * @on Opponent Turns Only
 * @off All Turns
 * @desc If enabled, update state/buff turns only on opponent
 * turns. Otherwise, they occur every turn.
 * @default true
 *
 * @param TurnAdvantage
 * @text Turn Advantage
 *
 * @param NeutralAdvantage:str
 * @text Neutral Advantage
 * @parent TurnAdvantage
 * @type select
 * @option Random - 50% chance on which team goes first
 * @value random
 * @option Player - Player's team always goes first
 * @value player
 * @option Enemy - Enemy's team always goes first
 * @value enemy
 * @option Lowest AGI - Battler with lowest AGI's team goes first
 * @value lowest agi
 * @option Average AGI - Team with the highest average AGI goes first
 * @value average agi
 * @option Highest AGI - Battler with highest AGI's team goes first
 * @value highest agi
 * @option Total AGI - Team with highest total AGI goes first
 * @value total agi
 * @desc For a neutral advantage battle, what determines which team goes first?
 * @default average agi
 *
 * @param ActionGeneration
 * @text Action Generation
 *
 * @param GenerateBase:num
 * @text Base
 * @parent ActionGeneration
 * @type number
 * @desc What is the starting base number of actions that are generated per battler each turn?
 * @default 1
 *
 * @param AgiBuff:eval
 * @text AGI Buff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI buffs give +1 for each stack?
 * @default true
 *
 * @param AgiDebuff:eval
 * @text AGI Debuff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI debuffs give -1 for each stack?
 * @default false
 *
 * @param MaxActions:num
 * @text Maximum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the absolute maximum number of actions a team can have each turn?
 * @default 99
 *
 * @param MinActions:num
 * @text Minimum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the bare minimum number of actions a team can have each turn?
 * @default 1
 *
 * @param AllowOverflow:eval
 * @text Allow Overflow?
 * @parent ActionGeneration
 * @type boolean
 * @on Allow
 * @off Cap to Max
 * @desc Allow current actions to overflow?
 * Or let them cap at the current team max?
 * @default false
 *
 * @param DefaultCost
 * @text Default Action Costs
 *
 * @param DefaultCostSkill:num
 * @text Skills
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for skills?
 * @default 1
 *
 * @param DefaultCostItem:num
 * @text Items
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for items?
 * @default 1
 * 
 */
/* ----------------------------------------------------------------------------
 * Action Count Display Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionCountDisplay:
 *
 * @param Display
 * @text Display Settings
 *
 * @param DrawHorz:eval
 * @text Draw Horizontally?
 * @parent Display
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Which direction do you want the Action Count Display to go?
 * @default true
 *
 * @param BottomPosition:eval
 * @text Bottom Position?
 * @parent Display
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Place the Action Count Display towards the bottom of the screen?
 * @default true
 *
 * @param LogWindowTopOffsetY:num
 * @text Offset Top Log Y?
 * @parent BottomPosition:eval
 * @type number
 * @desc If using the top position, offset the log window's Y position.
 * @default 40
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent BottomPosition:eval
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If using the top position, reposition the display when the help window is open?
 * @default true
 *
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 160
 *
 * @param Pictures
 * @text Picture Settings
 *
 * @param ActorActionPicture:str
 * @text Actor Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an actor action instead of an icon?
 * @default 
 *
 * @param EnemyActionPicture:str
 * @text Enemy Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an enemy action instead of an icon?
 * @default 
 *
 * @param EmptyActionPicture:str
 * @text Empty Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an empty action instead of an icon?
 * @default 
 *
 * @param Coordinates
 *
 * @param ScreenBufferX:num
 * @text Screen Buffer X
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's X by this much.
 * @default 16
 *
 * @param ScreenBufferY:num
 * @text Screen Buffer Y
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's Y by this much.
 * @default 16
 *
 * @param ActorOffsetX:num
 * @text Actor Offset X
 * @parent Coordinates
 * @desc Offset the actor images' X by this much.
 * @default 0
 *
 * @param ActorOffsetY:num
 * @text Actor Offset Y
 * @parent Coordinates
 * @desc Offset the actor images' Y by this much.
 * @default 0
 *
 * @param EnemyOffsetX:num
 * @text Enemy Offset X
 * @parent Coordinates
 * @desc Offset the enemy images' X by this much.
 * @default 0
 *
 * @param EnemyOffsetY:num
 * @text Enemy Offset Y
 * @parent Coordinates
 * @desc Offset the enemy images' Y by this much.
 * @default 0
 *
 * @param DrawSettings
 * @text Draw Settings
 *
 * @param MaxVisible:num
 * @text Max Actions Visible
 * @parent DrawSettings
 * @desc How many action slots max should be drawn for each team?
 * @default 10
 *
 * @param ImageSize:num
 * @text Image Size
 * @parent DrawSettings
 * @desc What is the size of the icons or pictures for the action slots?
 * @default 32
 *
 * @param ImageGapDistance:num
 * @text Gap Distance
 * @parent DrawSettings
 * @desc How wide should the gab between each slot be in pixels?
 * @default 2
 *
 * @param IconSmoothing:eval
 * @text Icon Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for icons?
 * Or pixelate them?
 * @default false
 *
 * @param PictureSmoothing:eval
 * @text Picture Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for pictures?
 * Or pixelate them?
 * @default true
 *
 * @param TurnsRemaining
 * @text Turns Remaining
 *
 * @param DrawActionsRemaining:eval
 * @text Show Number?
 * @parent TurnsRemaining
 * @type boolean
 * @on Show Number
 * @off Don't Show
 * @desc Show a number to display the actions remaining?
 * @default true
 *
 * @param ActionsRemainingFontSize:num
 * @text Font Size
 * @parent DrawActionsRemaining:eval
 * @desc What font size should be used for this number?
 * @default 26
 *
 * @param ActionsRemainingOffsetX:num
 * @text Offset X
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number X.
 * @default 0
 *
 * @param ActionsRemainingOffsetY:num
 * @text Offset Y
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number Y.
 * @default 0
 *
 */
//=============================================================================

const _0x233678=_0x1fc4;function _0x1fc4(_0x118c63,_0x415deb){const _0x5de3ab=_0x5de3();return _0x1fc4=function(_0x1fc4d6,_0x34977d){_0x1fc4d6=_0x1fc4d6-0x141;let _0x4cca6d=_0x5de3ab[_0x1fc4d6];return _0x4cca6d;},_0x1fc4(_0x118c63,_0x415deb);}(function(_0x41f54a,_0x5a7f2b){const _0x1e20ac=_0x1fc4,_0x243dd2=_0x41f54a();while(!![]){try{const _0x357ce7=parseInt(_0x1e20ac(0x22e))/0x1+-parseInt(_0x1e20ac(0x2b7))/0x2*(parseInt(_0x1e20ac(0x251))/0x3)+-parseInt(_0x1e20ac(0x2af))/0x4+parseInt(_0x1e20ac(0x285))/0x5*(parseInt(_0x1e20ac(0x227))/0x6)+-parseInt(_0x1e20ac(0x15f))/0x7+-parseInt(_0x1e20ac(0x242))/0x8*(parseInt(_0x1e20ac(0x144))/0x9)+parseInt(_0x1e20ac(0x20c))/0xa;if(_0x357ce7===_0x5a7f2b)break;else _0x243dd2['push'](_0x243dd2['shift']());}catch(_0x826e98){_0x243dd2['push'](_0x243dd2['shift']());}}}(_0x5de3,0x9d47d));function _0x5de3(){const _0x25a031=['recalculateActionsFTB','BattleManager_startInput','opacity','turnCount','commandCancelFTB','members','RepositionTopHelpX','constructor','startTurnFTB','forceChangeEquip','updateVisibility','IlEDx','23475530vIHtab','PassTurn','Game_BattlerBase_appear','BattleManager_isTeamBased','ftbEnemyActionsIcon','cEUcF','agi','bind','_buffs','GuardPass','RepositionTopForHelp','performTurnEndFTB','makeDeepCopy','ActionCountFull','removeBuff','DefaultCostSkill','LbVUz','useItem','cursorPageup','item','_logWindow','MinActions','_surprise','SgyNG','releaseUnequippableItems','format','EnemyActionsIcon','2962140jZEPNi','qZXuO','textWidth','_FTB_RECALC_SUB_DIFF','changeEquip','ActorActionPicture','version','835473hnVlkx','ARRAYJSON','hide','enemies','updateStateTurns','General','canUse','_FTB_RECALC_ADD_DIFF','inBattle','PictureSmoothing','drawBigIcon','ScreenBufferX','initialize','updateStateTurnsFTB','lowest\x20agi','Show_0_Action_Cost','_handlers','PSjpS','getChildIndex','applyGlobal','102792qiazIM','setBackgroundType','Scene_Battle_createActorCommandWindow','indexOf','addLoadListener','clearBuffs','match','Game_Action_applyGlobal','some','fontSize','isDead','jULFs','_FTB_FREE_CHANGE','isSideView','ftbTroopTeamShift','9SNZeYt','_ftbActionsMax','_ftbTeamOdd','forceAction','isTpb','xeNjO','Game_Battler_addBuff','BattleManager_endAllBattlersTurn','endAllBattlersTurn','SystemActionCountVisibility','commandCancel','ftbSwitchActorDirection','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_currentActions','Game_BattlerBase_clearStates','_currentActor','_FTB_ACTION_OVERFLOW','close','startActorCommandSelection','QFtou','ftbCostFormat','selectNextActor','blt','processTouchFTB','JIzSU','description','initBattleSystemFTB','BattleManager_battleSys','processTouch','random','ActorOffsetX','drawPicture','gainCurrentActionsFTB','JSON','isBattleSystemFTBActionCountVisible','sort','_FTB_COST_SHOW_GUARD','jcKrA','push','qtSnQ','DefaultCostItem','call','isSceneBattle','Game_BattlerBase_hide','XIugQ','hLzEd','yOwmA','Game_Actor_changeEquip','isSkill','parse','height','Game_Actor_changeEquipById','5edNmEm','Game_BattlerBase_updateStateTurns','loseCurrentActionsFTB','aliveMembers','stepBack','Game_Unit_onBattleStart','NvYwt','dXVWv','_passedTurnFTB','currentAction','total\x20agi','MaxVisible','_doubleTouch','select','getNextSubject','STRUCT','QITmO','_forceAction','reduce','passTurnFTB','MaxActions','BattleManager_endTurn','_FTB_MAX_ACTIONS','Game_Actor_discardEquip','xYQLg','player','selectNextActorFTB','Window_Base_makeAdditionalSkillCostText','FTB','isOpen','initMembers','addChildAt','mxRXo','YJken','reduceActionsFTB','Game_BattlerBase_canUse','Game_Battler_addDebuff','DYsuc','includes','FreeChange','guardSkillId','IconSmoothing','4845228euHFFh','UrDeG','NDzqi','setItem','_unit','discardEquip','width','createContentsArray','363494RKXWZz','setBattleSystem','_forcedBattlers','DrawHorz','map','changeClass','BottomPosition','STR','Flrcc','makeAdditionalSkillCostText','ShowCostForAttack','selectNextCommand','round','playCursorSound','ktElW','ARRAYEVAL','kqilc','addDebuff','getActionCostFTB','AgiBuff','lozUf','ciXoO','Game_Enemy_transform','Game_Battler_performCollapse','filter','WzYKK','windowRect','Window_Selectable_processTouch','contents','Window_Selectable_cursorPagedown','Scene_Battle_commandCancel','BattleSystemFTB','obocS','Game_Battler_useItem','_ftbCurrentUnit','startActorInput','addText','BattleManager_selectNextActor','payActionCostFTB','Game_Actor_forceChangeEquip','BattleManager_endAction','canMove','enemy','endTurn','DlwZj','resetFontSettings','HideActionPointCost','addBuff','_FTB_COST_SHOW_1','ItemScene','BattleManager_isTurnBased','cursorPagedown','_ftbActionsCur','randomInt','status','setBattleSystemFTBActionCountVisible','ftbEmptyActionsIcon','_statusWindow','clear','GenerateBase','_inputting','repositionLogWindowFTB','AllowOverflow','removeStatesAuto','OCtBt','clearStates','update','_actionBattlers','xLMsm','speed','min','isPartyCommandWindowDisabled','TeamShiftWait','screenX','canActorBeSelectedFTB','removeActionBattlersFTB','KfpsX','ScreenBufferY','_FTB_KEEP_PREV_ACTOR','getCurrentActionsFTB','_maxActions','Game_Battler_removeBuff','_ftbTroopActionCountWindow','_ftbActionCountVisible','DFYeA','onBattleStart','Window_Selectable_cursorRight','_FTB_COST_POSITION','BattleManager_setup','ftb%1ActionsIcon','BattleManager_startTurn','ShowActionPointCost','Game_Battler_addState','fMLDl','_lastTargetIndex','agility','subject','VDiNA','hitIndex','updatePosition','create','_context','loadPicture','endTurnFTB','isActiveTpb','BattleManager_isActiveTpb','drawText','setTarget','drawActionsRemaining','\x5cI[%1]','max','FUNC','applyGlobalFTB','_FTB_ACTION_AGI_BUFF','padding','RegExp','dxdCQ','updatePadding','Empty','ryFqa','ARRAYNUM','_inBattle','YpnGa','commandFight','_actorCommandWindow','imageSmoothingEnabled','_FTB_ACTION_AGI_DEBUFF','_FTB_GUARD_PASS','loadSystem','_FTB_STATE_BUFF_TURN_UPDATES_ONLY_ON_OPPONENT_TURNS','DrawActionsRemaining','_ftbPartyActionCountWindow','CostPosition','pop','getMaxActionsFTB','toUpperCase','Nothing','skillCostSeparator','floor','cancel','onTurnEnd','yntxg','Game_Action_speed','_ftbLastIndex','Game_Battler_removeState','updateBuffTurns','261qNvDuG','BattleManager_invokeCounterAttack','makeActionOrdersFTB','RepositionTopHelpY','battleEnd','ftbTotalAgility','endActionFTB','makeActions','Settings','YYrjK','invokeCounterAttack','drawTextEx','%1ActionPicture','innerHeight','canDrawActionsRemaining','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ThqVa','boOBj','ImageSize','uTbSd','_actor','EmptyActionPicture','setUnit','Window_Base_drawItemNumber','BattleManager_processTurn','TXNqK','yoHfW','6323282hiXSYr','ItemQuantityFmt','appear','Game_Battler_forceAction','startTurn','jYWnO','attackSkillId','actors','ImageGapDistance','shift','ftbActionPointsFull','visible','LVZEm','unshift','_FTB_ACTION_BASE','drawImage','battleSys','processTurn','Scene_Battle_commandFight','_FTB_COST_SHOW_0','transform','changeEquipById','EnemyActionPicture','GgoAl','xPbCl','battleMembers','ftbActorActionsIcon','startDamagePopup','isTeamBased','mjxFl','xCOHB','startInput','FRVlv','initMembersFTB','battler','_FTB_MIN_ACTIONS','IconSet','trim','getBattleSystem','clearPassTurnFTB','endAction','createActorCommandWindowFTB','note','GainDiff','onTouchSelectFTB','EVAL','_FTB_BETWEEN_TEAMS_WAIT','Mechanics','Game_Actor_selectNextCommand','setup','friendsUnit','hqRib','innerWidth','toLowerCase','MJnUc','ActionCountCostFmt','_bypassStateTurnUpdatesFTB','_FTB_RESET_INDEX','BattleManager_makeActionOrders','maxCols','_actions','processSwitchActors','LoseDiff','Scene_Battle_createAllWindows','RFscI','canInput','checkNeedsUpdate','Nhegj','NFohq','setSkill','concat','cursorLeft','RenTO','setCurrentActionsFTB','PartyTeamShiftFmt','BattleManager_isTpb','ftbLowestAgility','forceActionFTB','xEPBH','qsdxD','ftbAliveMembers','ftbActionCount','_ftbTeamEven','createActorCommandWindow','ARRAYSTR','Show_1_Action_Cost','isTurnBased','BattleManager_forceAction','keepPrevSubjectFTB','ftbPartyTeamShift','prototype','finishActorInput','ItemQuantityFontSize','removeState','startInputFTB','makeAdditionalCostTextFTB','_FTB_NEUTRAL_TURN_ADVANTAGE','drawItemNumberFTB','setText','name','Current','jPTAS','BattleManager_startBattle','Game_Actor_changeClass','highest\x20agi','ARRAYFUNC','BattleManager_finishActorInput','Enemy','EnemyOffsetX','Window_Help_setItem','return\x200','_ftbTurnAdvantageUnit','NBXGF','AgiDebuff','performCollapse','updateTurn','addState','drawItemNumber','length','cursorRight','EeMxJ','_phase','XKOIA','setLastFtbIndex','refresh','isFTB','YLDJO','ActionCountAbbr','startBattleFTB','ConvertParams','vqZyZ','isActor','mjsWy','index','Actor','average\x20agi','ftbFreeRangeSwitch','Game_Actor_releaseUnequippableItems','isPassingTurnFTB','NeutralAdvantage','Window_Selectable_cursorPageup','createActionCountWindowsFTB','Game_BattlerBase_updateBuffTurns','ftbCreateTeamSwitchText','exit','createAllWindows','_scene','processTurnFTB','ActionsRemainingFontSize','ftbHighestAgility','clamp','numItems','setMaxActionsFTB','makeActionOrders','isAlive','createActionsFTB','_action','HFtxH','_subject','_FTB_COST_SHOW_ATTACK','Game_Battler_onTurnEnd'];_0x5de3=function(){return _0x25a031;};return _0x5de3();}var label='BattleSystemFTB',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x233678(0x2cf)](function(_0x4a5bc8){const _0x573c66=_0x233678;return _0x4a5bc8[_0x573c66(0x2ed)]&&_0x4a5bc8[_0x573c66(0x26a)][_0x573c66(0x2ab)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x233678(0x14c)]||{},VisuMZ['ConvertParams']=function(_0x4ad1d7,_0x21acf5){const _0x9e634c=_0x233678;for(const _0x5cdca8 in _0x21acf5){if(_0x5cdca8[_0x9e634c(0x248)](/(.*):(.*)/i)){if(_0x9e634c(0x29d)==='xYQLg'){const _0x5a5002=String(RegExp['$1']),_0x76790f=String(RegExp['$2'])[_0x9e634c(0x33e)]()[_0x9e634c(0x184)]();let _0x27571c,_0x3ed745,_0x4968a1;switch(_0x76790f){case'NUM':_0x27571c=_0x21acf5[_0x5cdca8]!==''?Number(_0x21acf5[_0x5cdca8]):0x0;break;case _0x9e634c(0x32f):_0x3ed745=_0x21acf5[_0x5cdca8]!==''?JSON[_0x9e634c(0x282)](_0x21acf5[_0x5cdca8]):[],_0x27571c=_0x3ed745[_0x9e634c(0x2bb)](_0x2b076d=>Number(_0x2b076d));break;case _0x9e634c(0x18c):_0x27571c=_0x21acf5[_0x5cdca8]!==''?eval(_0x21acf5[_0x5cdca8]):null;break;case _0x9e634c(0x2c6):_0x3ed745=_0x21acf5[_0x5cdca8]!==''?JSON[_0x9e634c(0x282)](_0x21acf5[_0x5cdca8]):[],_0x27571c=_0x3ed745[_0x9e634c(0x2bb)](_0x182a9d=>eval(_0x182a9d));break;case _0x9e634c(0x272):_0x27571c=_0x21acf5[_0x5cdca8]!==''?JSON[_0x9e634c(0x282)](_0x21acf5[_0x5cdca8]):'';break;case _0x9e634c(0x22f):_0x3ed745=_0x21acf5[_0x5cdca8]!==''?JSON['parse'](_0x21acf5[_0x5cdca8]):[],_0x27571c=_0x3ed745[_0x9e634c(0x2bb)](_0x4174f0=>JSON['parse'](_0x4174f0));break;case _0x9e634c(0x326):_0x27571c=_0x21acf5[_0x5cdca8]!==''?new Function(JSON[_0x9e634c(0x282)](_0x21acf5[_0x5cdca8])):new Function(_0x9e634c(0x1cd));break;case _0x9e634c(0x1c8):_0x3ed745=_0x21acf5[_0x5cdca8]!==''?JSON[_0x9e634c(0x282)](_0x21acf5[_0x5cdca8]):[],_0x27571c=_0x3ed745[_0x9e634c(0x2bb)](_0xd45d56=>new Function(JSON[_0x9e634c(0x282)](_0xd45d56)));break;case _0x9e634c(0x2be):_0x27571c=_0x21acf5[_0x5cdca8]!==''?String(_0x21acf5[_0x5cdca8]):'';break;case _0x9e634c(0x1b3):_0x3ed745=_0x21acf5[_0x5cdca8]!==''?JSON['parse'](_0x21acf5[_0x5cdca8]):[],_0x27571c=_0x3ed745[_0x9e634c(0x2bb)](_0x399005=>String(_0x399005));break;case _0x9e634c(0x294):_0x4968a1=_0x21acf5[_0x5cdca8]!==''?JSON[_0x9e634c(0x282)](_0x21acf5[_0x5cdca8]):{},_0x27571c=VisuMZ['ConvertParams']({},_0x4968a1);break;case'ARRAYSTRUCT':_0x3ed745=_0x21acf5[_0x5cdca8]!==''?JSON[_0x9e634c(0x282)](_0x21acf5[_0x5cdca8]):[],_0x27571c=_0x3ed745[_0x9e634c(0x2bb)](_0xd3aa3=>VisuMZ['ConvertParams']({},JSON[_0x9e634c(0x282)](_0xd3aa3)));break;default:continue;}_0x4ad1d7[_0x5a5002]=_0x27571c;}else _0x4031f8+=_0x42dc2d;}}return _0x4ad1d7;},(_0x51e13b=>{const _0x5b5c07=_0x233678,_0x1f306=_0x51e13b['name'];for(const _0x5b3a18 of dependencies){if(_0x5b5c07(0x27f)!==_0x5b5c07(0x1a2)){if(!Imported[_0x5b3a18]){alert(_0x5b5c07(0x153)[_0x5b5c07(0x225)](_0x1f306,_0x5b3a18)),SceneManager['exit']();break;}}else{this[_0x5b5c07(0x2e4)]();const _0x5a916b=_0xb70825['ItemsEquipsCore'][_0x5b5c07(0x14c)][_0x5b5c07(0x2e8)];this[_0x5b5c07(0x2d3)]['fontSize']=_0x5a916b['ItemQuantityFontSize'];if(_0x3674f0){const _0x35eb59=_0x5a916b['ItemQuantityFmt'],_0x28852c=_0x35eb59[_0x5b5c07(0x225)](_0x1faff1[_0x5b5c07(0x1f6)](_0x200eda)),_0xebbaf6=this['textWidth'](_0x28852c+this[_0x5b5c07(0x340)]());_0x14b091-=_0xebbaf6;}else _0xb68d32-=this[_0x5b5c07(0x229)](this[_0x5b5c07(0x340)]())+_0x39096f;_0x4f622f[_0x5b5c07(0x2d6)][_0x5b5c07(0x15b)][_0x5b5c07(0x27a)](this,_0x230f42,_0x3c9e5d,_0x494d4a,_0x1e28f2);}}const _0xe5e5c4=_0x51e13b[_0x5b5c07(0x26a)];if(_0xe5e5c4[_0x5b5c07(0x248)](/\[Version[ ](.*?)\]/i)){if('xPbCl'===_0x5b5c07(0x177)){const _0x4515e2=Number(RegExp['$1']);_0x4515e2!==VisuMZ[label]['version']&&(_0x5b5c07(0x1e1)===_0x5b5c07(0x1e1)?(alert(_0x5b5c07(0x25d)[_0x5b5c07(0x225)](_0x1f306,_0x4515e2)),SceneManager[_0x5b5c07(0x1ef)]()):this[_0x5b5c07(0x323)](_0x3522b6,_0x3ee70e));}else this['padding']=0x0;}if(_0xe5e5c4[_0x5b5c07(0x248)](/\[Tier[ ](\d+)\]/i)){const _0x2a698c=Number(RegExp['$1']);_0x2a698c<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x5b5c07(0x225)](_0x1f306,_0x2a698c,tier)),SceneManager['exit']()):tier=Math[_0x5b5c07(0x325)](_0x2a698c,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x51e13b['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x233678(0x25a),_0x321a91=>{const _0x4b6da7=_0x233678;VisuMZ[_0x4b6da7(0x1e0)](_0x321a91,_0x321a91);const _0x376ef1=_0x321a91['Visible'];$gameSystem[_0x4b6da7(0x2ee)](_0x376ef1);}),VisuMZ['BattleSystemFTB']['RegExp']={'ActionPointCost':/<FTB (?:FP|ACTION) COST:[ ](\d+)>/i,'HideActionPointCost':/<FTB HIDE (?:FP|ACTION) COST>/i,'ShowActionPointCost':/<FTB SHOW (?:FP|ACTION) COST>/i,'PassTurn':/<FTB PASS TURN>/i,'ActionPointTraitPlus':/<FTB (?:FP|ACTION|ACTIONS):[ ]([\+\-]\d+)>/i},DataManager[_0x233678(0x2c9)]=function(_0x53b86f){const _0x31e9b5=_0x233678;if(!_0x53b86f)return 0x0;const _0x43cf3c=VisuMZ[_0x31e9b5(0x2d6)][_0x31e9b5(0x14c)][_0x31e9b5(0x18e)],_0x9fd336=VisuMZ['BattleSystemFTB'][_0x31e9b5(0x32a)],_0x2f86f3=_0x53b86f[_0x31e9b5(0x189)];if(_0x2f86f3[_0x31e9b5(0x248)](_0x9fd336['ActionPointCost']))return Number(RegExp['$1']);else{if(DataManager[_0x31e9b5(0x281)](_0x53b86f)){if('xEPBH'===_0x31e9b5(0x1ad))return _0x43cf3c[_0x31e9b5(0x21b)];else this['subject']()[_0x31e9b5(0x298)]();}else return DataManager['isItem'](_0x53b86f)?_0x43cf3c[_0x31e9b5(0x279)]:0x0;}},ImageManager[_0x233678(0x179)]=VisuMZ['BattleSystemFTB'][_0x233678(0x14c)][_0x233678(0x233)]['ActorActionsIcon'],ImageManager[_0x233678(0x210)]=VisuMZ['BattleSystemFTB'][_0x233678(0x14c)][_0x233678(0x233)][_0x233678(0x226)],ImageManager[_0x233678(0x2ef)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)]['General']['EmptyActionsIcon'],TextManager[_0x233678(0x169)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)][_0x233678(0x233)][_0x233678(0x219)],TextManager['ftbActionPointsAbbr']=VisuMZ[_0x233678(0x2d6)]['Settings'][_0x233678(0x233)][_0x233678(0x1de)],TextManager[_0x233678(0x265)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)][_0x233678(0x233)][_0x233678(0x196)],TextManager[_0x233678(0x1b8)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)]['General'][_0x233678(0x1a9)],TextManager[_0x233678(0x250)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)][_0x233678(0x233)]['TroopTeamShiftFmt'],SceneManager['isSceneBattle']=function(){const _0x5264ed=_0x233678;return this[_0x5264ed(0x1f1)]&&this[_0x5264ed(0x1f1)][_0x5264ed(0x207)]===Scene_Battle;},BattleManager['_FTB_FREE_CHANGE']=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)][_0x233678(0x18e)][_0x233678(0x2ac)],BattleManager[_0x233678(0x305)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)][_0x233678(0x18e)]['KeepPrevActor'],BattleManager['_FTB_RESET_INDEX']=VisuMZ[_0x233678(0x2d6)]['Settings'][_0x233678(0x18e)]['NewTurnResetIndex']??![],BattleManager['_FTB_GUARD_PASS']=VisuMZ['BattleSystemFTB'][_0x233678(0x14c)][_0x233678(0x18e)][_0x233678(0x215)],BattleManager[_0x233678(0x235)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)][_0x233678(0x18e)][_0x233678(0x18a)],BattleManager[_0x233678(0x22a)]=VisuMZ['BattleSystemFTB']['Settings'][_0x233678(0x18e)][_0x233678(0x19d)],BattleManager[_0x233678(0x1bf)]=VisuMZ[_0x233678(0x2d6)]['Settings']['Mechanics'][_0x233678(0x1ea)],BattleManager[_0x233678(0x18d)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)][_0x233678(0x233)][_0x233678(0x2ff)],BattleManager[_0x233678(0x338)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)][_0x233678(0x18e)]['StateBuffUpdate'],VisuMZ[_0x233678(0x2d6)]['BattleManager_battleSys']=BattleManager[_0x233678(0x16f)],BattleManager[_0x233678(0x16f)]=function(){const _0x19a982=_0x233678;if(this['isFTB']())return _0x19a982(0x2a1);return VisuMZ['BattleSystemFTB'][_0x19a982(0x26c)][_0x19a982(0x27a)](this);},BattleManager[_0x233678(0x1dc)]=function(){const _0x77f0f6=_0x233678;return $gameSystem[_0x77f0f6(0x185)]()===_0x77f0f6(0x2a1);},VisuMZ[_0x233678(0x2d6)][_0x233678(0x1aa)]=BattleManager['isTpb'],BattleManager[_0x233678(0x255)]=function(){const _0x458e69=_0x233678;if(this[_0x458e69(0x1dc)]())return![];return VisuMZ['BattleSystemFTB']['BattleManager_isTpb']['call'](this);},VisuMZ['BattleSystemFTB'][_0x233678(0x320)]=BattleManager[_0x233678(0x31f)],BattleManager['isActiveTpb']=function(){const _0x1fc80b=_0x233678;if(this['isFTB']())return![];return VisuMZ[_0x1fc80b(0x2d6)][_0x1fc80b(0x320)][_0x1fc80b(0x27a)](this);},VisuMZ[_0x233678(0x2d6)][_0x233678(0x2e9)]=BattleManager[_0x233678(0x1b5)],BattleManager['isTurnBased']=function(){const _0x273d87=_0x233678;if(this[_0x273d87(0x1dc)]())return!![];return VisuMZ[_0x273d87(0x2d6)]['BattleManager_isTurnBased']['call'](this);},VisuMZ[_0x233678(0x2d6)]['BattleManager_isTeamBased']=BattleManager[_0x233678(0x17b)],BattleManager[_0x233678(0x17b)]=function(){const _0x4d1033=_0x233678;if(this['isFTB']())return!![];return VisuMZ[_0x4d1033(0x2d6)][_0x4d1033(0x20f)]['call'](this);},VisuMZ['BattleSystemFTB'][_0x233678(0x201)]=BattleManager[_0x233678(0x17e)],BattleManager[_0x233678(0x17e)]=function(){const _0x306388=_0x233678;if(this[_0x306388(0x1dc)]())this[_0x306388(0x222)]=![];VisuMZ['BattleSystemFTB'][_0x306388(0x201)]['call'](this);if(this[_0x306388(0x1dc)]()&&$gameParty['canInput']())this[_0x306388(0x1bd)]();},BattleManager[_0x233678(0x1bd)]=function(){const _0xbd4f8=_0x233678;this[_0xbd4f8(0x163)]();},VisuMZ[_0x233678(0x2d6)]['BattleManager_processTurn']=BattleManager[_0x233678(0x170)],BattleManager[_0x233678(0x170)]=function(){const _0x213eca=_0x233678;this['isFTB']()?this[_0x213eca(0x1f2)]():'JnEFc'==='JnEFc'?VisuMZ[_0x213eca(0x2d6)]['BattleManager_processTurn'][_0x213eca(0x27a)](this):this[_0x213eca(0x1fd)]=_0x22d6d7;},BattleManager[_0x233678(0x1f2)]=function(){const _0x33686e=_0x233678,_0x2cfd44=this[_0x33686e(0x1fd)];if(_0x2cfd44&&!_0x2cfd44[_0x33686e(0x191)]()['canActFTB']())this[_0x33686e(0x187)](),this[_0x33686e(0x1fd)]=null,this[_0x33686e(0x1d2)](![]);else{if(_0x2cfd44&&_0x2cfd44[_0x33686e(0x1e2)]()&&_0x2cfd44[_0x33686e(0x1a0)]()){if('kZLkM'!=='jsoJM'){const _0x11d973=_0x2cfd44[_0x33686e(0x28e)]();if(!_0x11d973)_0x33686e(0x211)===_0x33686e(0x211)?VisuMZ['BattleSystemFTB'][_0x33686e(0x15c)][_0x33686e(0x27a)](this):(this[_0x33686e(0x1fd)]&&(!this['_actionBattlers'][_0x33686e(0x2ab)](this['_subject'])&&this['_actionBattlers'][_0x33686e(0x16c)](this['_subject'])),this[_0x33686e(0x1fd)]=this[_0x33686e(0x293)]());else _0x11d973[_0x33686e(0x296)]?VisuMZ[_0x33686e(0x2d6)]['BattleManager_processTurn'][_0x33686e(0x27a)](this):(this['_currentActor']=_0x2cfd44,this[_0x33686e(0x2da)]());}else this[_0x33686e(0x252)]=_0x3765c0[_0x33686e(0x1f5)](_0x1f3b45[_0x33686e(0x182)],_0x41714a['_FTB_MAX_ACTIONS']);}else'Smkxa'==='MvSEH'?(_0x11eec8[_0x33686e(0x2d6)]['Game_Enemy_transform'][_0x33686e(0x27a)](this,_0x1245be),this['friendsUnit']()[_0x33686e(0x200)]()):VisuMZ[_0x33686e(0x2d6)][_0x33686e(0x15c)][_0x33686e(0x27a)](this);}},VisuMZ['BattleSystemFTB'][_0x233678(0x1c9)]=BattleManager['finishActorInput'],BattleManager[_0x233678(0x1ba)]=function(){const _0x38b7c4=_0x233678;this[_0x38b7c4(0x1dc)]()?VisuMZ[_0x38b7c4(0x2d6)][_0x38b7c4(0x15c)]['call'](this):VisuMZ[_0x38b7c4(0x2d6)][_0x38b7c4(0x1c9)][_0x38b7c4(0x27a)](this);},VisuMZ[_0x233678(0x2d6)]['BattleManager_selectNextActor']=BattleManager[_0x233678(0x266)],BattleManager['selectNextActor']=function(){const _0x562b4c=_0x233678;if(this[_0x562b4c(0x1dc)]()){if(_0x562b4c(0x28c)!==_0x562b4c(0x2d7))this[_0x562b4c(0x29f)]();else{const _0x270aa6=_0x3d3174[_0x562b4c(0x160)],_0x3da7d1=_0x270aa6[_0x562b4c(0x225)](_0x2d8151[_0x562b4c(0x1f6)](_0x4026c1)),_0x43347b=this['textWidth'](_0x3da7d1+this[_0x562b4c(0x340)]());_0x4a2081-=_0x43347b;}}else{if(_0x562b4c(0x264)===_0x562b4c(0x17c)){if(_0x1725b3['isSceneBattle']()&&_0x1ebbb1[_0x562b4c(0x1dc)]()){const _0x38995d=_0x2bd142[_0x562b4c(0x2c9)](_0x5e63c2);if(_0x38995d>this['friendsUnit']()[_0x562b4c(0x306)]())return![];}return _0x27ad34[_0x562b4c(0x2d6)][_0x562b4c(0x2a8)][_0x562b4c(0x27a)](this,_0x225e5f);}else VisuMZ[_0x562b4c(0x2d6)][_0x562b4c(0x2dc)][_0x562b4c(0x27a)](this);}},BattleManager[_0x233678(0x29f)]=function(){const _0x7b6eef=_0x233678;this[_0x7b6eef(0x260)]=null,this[_0x7b6eef(0x2f3)]=![];},VisuMZ[_0x233678(0x2d6)][_0x233678(0x2df)]=BattleManager[_0x233678(0x187)],BattleManager[_0x233678(0x187)]=function(){const _0x3507d1=_0x233678,_0x16af6c=this[_0x3507d1(0x1fd)];VisuMZ[_0x3507d1(0x2d6)][_0x3507d1(0x2df)][_0x3507d1(0x27a)](this),this[_0x3507d1(0x14a)](_0x16af6c);},BattleManager[_0x233678(0x14a)]=function(_0x186609){const _0x2c2d5c=_0x233678;if(!this[_0x2c2d5c(0x1dc)]())return;if(_0x186609){if(_0x2c2d5c(0x2b0)===_0x2c2d5c(0x318)){if(this['isFTB']())return'FTB';return _0x11e7b8['BattleSystemFTB'][_0x2c2d5c(0x26c)]['call'](this);}else{const _0x1869a4=_0x186609['_actions'][_0x2c2d5c(0x2cf)](_0x2f1619=>_0x2f1619[_0x2c2d5c(0x296)]);_0x186609[_0x2c2d5c(0x14b)]();if(_0x1869a4){if(_0x2c2d5c(0x1c4)===_0x2c2d5c(0x1c4)){let _0x134fc5=_0x1869a4[_0x2c2d5c(0x1d5)];while(_0x134fc5--){if(_0x2c2d5c(0x154)==='QxJsq'){const _0x1f9a36=_0x450515(_0x9e67d1['$1']);_0x1f9a36!==_0x1177d4[_0x42614a][_0x2c2d5c(0x22d)]&&(_0x51f586(_0x2c2d5c(0x25d)[_0x2c2d5c(0x225)](_0xb73892,_0x1f9a36)),_0x451e63[_0x2c2d5c(0x1ef)]());}else _0x186609[_0x2c2d5c(0x19b)][_0x2c2d5c(0x33c)]();}_0x186609[_0x2c2d5c(0x19b)]=_0x1869a4[_0x2c2d5c(0x1a5)](_0x186609['_actions']);}else{if(this['isFTB']())return![];return _0x1fee05['BattleSystemFTB'][_0x2c2d5c(0x320)][_0x2c2d5c(0x27a)](this);}}}}if(this[_0x2c2d5c(0x2b9)][_0x2c2d5c(0x1d5)]>0x0){if(_0x2c2d5c(0x223)!==_0x2c2d5c(0x223))this['onTouchSelectFTB'](!![]);else{if(this['_subject']){if('jcKrA'!==_0x2c2d5c(0x276))return _0xd8534f[_0x2c2d5c(0x2d6)][_0x2c2d5c(0x345)][_0x2c2d5c(0x27a)](this);else!this['_actionBattlers'][_0x2c2d5c(0x2ab)](this['_subject'])&&this[_0x2c2d5c(0x2fa)][_0x2c2d5c(0x16c)](this[_0x2c2d5c(0x1fd)]);}this['_subject']=this[_0x2c2d5c(0x293)]();}}else this[_0x2c2d5c(0x1b7)](_0x186609)&&(this[_0x2c2d5c(0x1fd)]=_0x186609);_0x186609['friendsUnit']()[_0x2c2d5c(0x1da)](_0x186609);},BattleManager[_0x233678(0x1b7)]=function(_0x299875){const _0x3d80e4=_0x233678;if(!_0x299875)return![];if(!_0x299875['isActor']())return![];if(!_0x299875['canMove']())return![];if(!_0x299875[_0x3d80e4(0x1a0)]())return![];if(_0x299875['isPassingTurnFTB']())return![];return BattleManager[_0x3d80e4(0x24e)]&&BattleManager[_0x3d80e4(0x305)];},VisuMZ[_0x233678(0x2d6)][_0x233678(0x1c5)]=BattleManager['startBattle'],BattleManager['startBattle']=function(){const _0x26c10d=_0x233678;VisuMZ[_0x26c10d(0x2d6)][_0x26c10d(0x1c5)][_0x26c10d(0x27a)](this),this[_0x26c10d(0x1df)]();},BattleManager['startBattleFTB']=function(){const _0x45b31c=_0x233678;if(!this[_0x45b31c(0x1dc)]())return;if(this['_preemptive']){if('DzwEV'===_0x45b31c(0x19f)){if(!_0x2de179[_0x45b31c(0x1dc)]())return;if(!_0x455107[_0x45b31c(0x236)]())return;const _0x244a0d=this[_0x45b31c(0x33d)]();this[_0x45b31c(0x1fa)]();let _0x5c68e3=this[_0x45b31c(0x306)]();const _0x1e4957=this[_0x45b31c(0x33d)]()-_0x244a0d;if(_0x1f5d04[_0x45b31c(0x235)]&&_0x1e4957>0x0)_0x5c68e3+=_0x1e4957;if(_0x1f2ff0[_0x45b31c(0x22a)]&&_0x1e4957<0x0)_0x5c68e3+=_0x1e4957;_0x5c68e3=_0x5b4cdf['min'](_0x5c68e3,_0x2888ce[_0x45b31c(0x29b)]),this[_0x45b31c(0x1a8)](_0x5c68e3);}else this['_ftbTurnAdvantageUnit']=_0x45b31c(0x166);}else this[_0x45b31c(0x222)]?this['_ftbTurnAdvantageUnit']=_0x45b31c(0x231):this[_0x45b31c(0x1ce)]=BattleManager[_0x45b31c(0x1bf)];this[_0x45b31c(0x1ce)]=this[_0x45b31c(0x1ce)]||'random';let _0x573907=0x0,_0x27edea=0x0;switch(this[_0x45b31c(0x1ce)][_0x45b31c(0x194)]()[_0x45b31c(0x184)]()){case _0x45b31c(0x26e):let _0x50de65=[_0x45b31c(0x166),_0x45b31c(0x231)];this[_0x45b31c(0x1ce)]=_0x50de65[Math[_0x45b31c(0x2ec)](_0x50de65['length'])];break;case _0x45b31c(0x29e):this[_0x45b31c(0x1ce)]=_0x45b31c(0x166);break;case _0x45b31c(0x2e1):this[_0x45b31c(0x1ce)]=_0x45b31c(0x231);break;case _0x45b31c(0x23c):_0x573907=$gameParty['ftbLowestAgility'](),_0x27edea=$gameTroop[_0x45b31c(0x1ab)](),this[_0x45b31c(0x1ce)]=_0x573907>=_0x27edea?'actors':_0x45b31c(0x231);break;case _0x45b31c(0x1e6):_0x573907=$gameParty['agility'](),_0x27edea=$gameTroop[_0x45b31c(0x316)](),this[_0x45b31c(0x1ce)]=_0x573907>=_0x27edea?_0x45b31c(0x166):'enemies';break;case _0x45b31c(0x1c7):_0x573907=$gameParty[_0x45b31c(0x1f4)](),_0x27edea=$gameTroop[_0x45b31c(0x1f4)](),this[_0x45b31c(0x1ce)]=_0x573907>=_0x27edea?'actors':_0x45b31c(0x231);break;case _0x45b31c(0x28f):_0x573907=$gameParty[_0x45b31c(0x149)](),_0x27edea=$gameTroop[_0x45b31c(0x149)](),this[_0x45b31c(0x1ce)]=_0x573907>=_0x27edea?_0x45b31c(0x166):_0x45b31c(0x231);break;}this[_0x45b31c(0x253)]=this[_0x45b31c(0x1ce)]===_0x45b31c(0x166)?$gameParty:$gameTroop,this['_ftbTeamEven']=this[_0x45b31c(0x1ce)]===_0x45b31c(0x166)?$gameTroop:$gameParty;},VisuMZ['BattleSystemFTB'][_0x233678(0x199)]=BattleManager[_0x233678(0x1f8)],BattleManager[_0x233678(0x1f8)]=function(){const _0x2fd2ed=_0x233678;if(this[_0x2fd2ed(0x1dc)]()){if('WQshB'!=='zIdzs')this['makeActionOrdersFTB']();else{if(!_0x27e762['isFTB']())return;if(!this[_0x2fd2ed(0x317)]())return;if(!this[_0x2fd2ed(0x21f)]())return;this[_0x2fd2ed(0x281)]()&&this['item']()['id']===this[_0x2fd2ed(0x317)]()[_0x2fd2ed(0x2ad)]()&&(_0x1f3147[_0x2fd2ed(0x336)]&&this[_0x2fd2ed(0x317)]()[_0x2fd2ed(0x298)]());const _0x3472a6=_0xd7a996[_0x2fd2ed(0x2d6)][_0x2fd2ed(0x32a)],_0x2852cd=this['item']()[_0x2fd2ed(0x189)];_0x2852cd[_0x2fd2ed(0x248)](_0x3472a6[_0x2fd2ed(0x20d)])&&this[_0x2fd2ed(0x317)]()[_0x2fd2ed(0x298)]();}}else VisuMZ[_0x2fd2ed(0x2d6)]['BattleManager_makeActionOrders'][_0x2fd2ed(0x27a)](this);},BattleManager['makeActionOrdersFTB']=function(){const _0x106b2d=_0x233678;let _0x5a2a0d=[],_0x113e8c=[],_0x53b52f=0x0;const _0x37d437=$gameTroop[_0x106b2d(0x203)]();let _0x2ed4c7=_0x37d437%0x2===0x0?this[_0x106b2d(0x1b1)]:this['_ftbTeamOdd'];this[_0x106b2d(0x2d9)]=_0x2ed4c7;if(_0x2ed4c7===$gameParty){if(_0x106b2d(0x1cf)===_0x106b2d(0x1a3))this[_0x106b2d(0x2fa)][_0x106b2d(0x16c)](this[_0x106b2d(0x1fd)]);else{let _0x385e57=$gameParty[_0x106b2d(0x1af)]()['filter'](_0x5cb4fb=>_0x5cb4fb['canMove']()&&!_0x5cb4fb['canInput']()),_0xe86b0e=$gameParty[_0x106b2d(0x1af)]()['filter'](_0x10b1fd=>_0x10b1fd[_0x106b2d(0x2e0)]()&&_0x10b1fd['canInput']());_0x5a2a0d=_0x5a2a0d[_0x106b2d(0x1a5)](_0x385e57),_0x53b52f=Game_Unit['_FTB_MAX_ACTIONS'];while(_0x53b52f--){if(_0x106b2d(0x1d9)!=='XKOIA'){if(!_0x4f912a[_0x106b2d(0x1dc)]())return;_0x128018[_0x106b2d(0x186)](),_0x4c65cd[_0x106b2d(0x186)]();const _0xd970ce=_0xf12667[_0x106b2d(0x203)]()+0x1;let _0x4c6b30=_0xd970ce%0x2===0x0?this['_ftbTeamEven']:this[_0x106b2d(0x253)],_0x332fe3=_0xd970ce%0x2===0x0?this[_0x106b2d(0x253)]:this[_0x106b2d(0x1b1)];_0xd970ce>0x1&&_0x332fe3['performTurnEndFTB'](),_0x4c6b30['updateStateTurnsFTB'](),_0x4c6b30[_0x106b2d(0x208)]();}else _0x5a2a0d=_0x5a2a0d['concat'](_0xe86b0e);}_0x53b52f=Game_Unit['_FTB_MAX_ACTIONS']-0x1;while(_0x53b52f--){_0x5a2a0d=_0x5a2a0d[_0x106b2d(0x1a5)](_0x385e57);}}}if(_0x2ed4c7===$gameTroop){if('ZTWYH'!==_0x106b2d(0x2f7)){let _0x505176=$gameTroop[_0x106b2d(0x1af)]()['filter'](_0xcadb06=>_0xcadb06['canMove']());$gameSystem[_0x106b2d(0x24f)]()?_0x505176[_0x106b2d(0x274)]((_0x36650d,_0x12b993)=>_0x12b993['screenX']()-_0x36650d[_0x106b2d(0x300)]()):_0x505176['sort']((_0x5b198f,_0x43b7f3)=>_0x5b198f[_0x106b2d(0x300)]()-_0x43b7f3[_0x106b2d(0x300)]());_0x53b52f=Game_Unit['_FTB_MAX_ACTIONS'];while(_0x53b52f--){if('DYsuc'!==_0x106b2d(0x2aa)){const _0x511442=_0x35c85c[_0x106b2d(0x150)[_0x106b2d(0x225)](_0xe7f7fc)],_0x447890=_0x13b551[_0x106b2d(0x31d)](_0x511442);_0x447890['addLoadListener'](this[_0x106b2d(0x270)][_0x106b2d(0x213)](this,_0x447890,_0x1b61bc,_0x4af111,_0x13539d));}else _0x113e8c=_0x113e8c[_0x106b2d(0x1a5)](_0x505176);}$gameTroop[_0x106b2d(0x14b)]();}else{if(!_0x36dbd4&&_0x1b5f67['id']===_0x9a8b96['attackSkillId']())return _0x140f0a;if(!_0x42a8a7&&_0x317d91['id']===_0x1d9c34[_0x106b2d(0x2ad)]())return _0x328a8d;}}this[_0x106b2d(0x2fa)]=_0x5a2a0d['concat'](_0x113e8c);},BattleManager[_0x233678(0x302)]=function(){const _0x3f565f=_0x233678;if(!this[_0x3f565f(0x1dc)]())return;this['_actionBattlers']=this[_0x3f565f(0x2fa)]||[],this[_0x3f565f(0x2fa)]=this['_actionBattlers'][_0x3f565f(0x2cf)](_0x3c259b=>_0x3c259b[_0x3f565f(0x2e0)]()&&!_0x3c259b['isPassingTurnFTB']());},VisuMZ[_0x233678(0x2d6)][_0x233678(0x30f)]=BattleManager[_0x233678(0x190)],BattleManager[_0x233678(0x190)]=function(_0x36542b,_0xd26534,_0x4c1c4b){const _0x3ff2b6=_0x233678;VisuMZ['BattleSystemFTB'][_0x3ff2b6(0x30f)][_0x3ff2b6(0x27a)](this,_0x36542b,_0xd26534,_0x4c1c4b),this[_0x3ff2b6(0x180)]();},BattleManager[_0x233678(0x180)]=function(){const _0x1602f5=_0x233678;if(!BattleManager['isFTB']())return;this['_ftbCurrentUnit']=undefined,$gameParty[_0x1602f5(0x208)](),$gameTroop[_0x1602f5(0x208)]();},VisuMZ[_0x233678(0x2d6)][_0x233678(0x311)]=BattleManager[_0x233678(0x163)],BattleManager[_0x233678(0x163)]=function(){const _0x36cac2=_0x233678;this[_0x36cac2(0x208)](),VisuMZ[_0x36cac2(0x2d6)][_0x36cac2(0x311)]['call'](this),this[_0x36cac2(0x1ee)]();},BattleManager[_0x233678(0x208)]=function(){const _0x45bec0=_0x233678;if(!BattleManager['isFTB']())return;$gameParty[_0x45bec0(0x186)](),$gameTroop['clearPassTurnFTB']();const _0x1eb3f0=$gameTroop[_0x45bec0(0x203)]()+0x1;let _0x3051d8=_0x1eb3f0%0x2===0x0?this[_0x45bec0(0x1b1)]:this['_ftbTeamOdd'],_0x1afbbe=_0x1eb3f0%0x2===0x0?this[_0x45bec0(0x253)]:this[_0x45bec0(0x1b1)];_0x1eb3f0>0x1&&_0x1afbbe[_0x45bec0(0x217)](),_0x3051d8[_0x45bec0(0x23b)](),_0x3051d8[_0x45bec0(0x208)]();},VisuMZ[_0x233678(0x2d6)][_0x233678(0x29a)]=BattleManager['endTurn'],BattleManager[_0x233678(0x2e2)]=function(){const _0x1d477c=_0x233678;VisuMZ[_0x1d477c(0x2d6)]['BattleManager_endTurn'][_0x1d477c(0x27a)](this),this[_0x1d477c(0x31e)]();},BattleManager[_0x233678(0x31e)]=function(){const _0x3cb1af=_0x233678;if(!BattleManager[_0x3cb1af(0x1dc)]())return;},VisuMZ[_0x233678(0x2d6)][_0x233678(0x258)]=BattleManager['endAllBattlersTurn'],BattleManager[_0x233678(0x259)]=function(){const _0x5a3dda=_0x233678;if(this['isFTB']())return;VisuMZ[_0x5a3dda(0x2d6)][_0x5a3dda(0x258)][_0x5a3dda(0x27a)](this);},BattleManager[_0x233678(0x1ee)]=function(){const _0xce0b5e=_0x233678;if(!BattleManager['isFTB']())return;let _0x44cf46='';if(this[_0xce0b5e(0x2d9)]===$gameParty){let _0x532941=$gameParty[_0xce0b5e(0x1c2)]();_0x44cf46=TextManager[_0xce0b5e(0x1b8)]['format'](_0x532941);}else _0x44cf46=TextManager[_0xce0b5e(0x250)];if(_0x44cf46!==''){this['_logWindow'][_0xce0b5e(0x277)](_0xce0b5e(0x2db),_0x44cf46);const _0x2141ef=BattleManager[_0xce0b5e(0x18d)];this[_0xce0b5e(0x220)][_0xce0b5e(0x277)]('waitCount',_0x2141ef),this[_0xce0b5e(0x220)][_0xce0b5e(0x277)](_0xce0b5e(0x2f1));}},VisuMZ[_0x233678(0x2d6)][_0x233678(0x145)]=BattleManager['invokeCounterAttack'],BattleManager[_0x233678(0x14e)]=function(_0x270b2a,_0x20d18b){const _0x39e14c=_0x233678,_0x3e2c07=BattleManager[_0x39e14c(0x1dc)]();if(_0x3e2c07)$gameSystem['setBattleSystem']('DTB');VisuMZ[_0x39e14c(0x2d6)][_0x39e14c(0x145)][_0x39e14c(0x27a)](this,_0x270b2a,_0x20d18b);if(_0x3e2c07)$gameSystem[_0x39e14c(0x2b8)](_0x39e14c(0x2a1));},VisuMZ[_0x233678(0x2d6)]['Game_System_initialize']=Game_System[_0x233678(0x1b9)][_0x233678(0x23a)],Game_System['prototype'][_0x233678(0x23a)]=function(){const _0xb36b95=_0x233678;VisuMZ[_0xb36b95(0x2d6)]['Game_System_initialize']['call'](this),this['initBattleSystemFTB']();},Game_System[_0x233678(0x1b9)][_0x233678(0x26b)]=function(){const _0x518efa=_0x233678;this[_0x518efa(0x30a)]=!![];},Game_System[_0x233678(0x1b9)]['isBattleSystemFTBActionCountVisible']=function(){const _0x48e952=_0x233678;if(BattleManager[_0x48e952(0x1d8)]===_0x48e952(0x148))return![];return this[_0x48e952(0x30a)]===undefined&&(_0x48e952(0x314)!==_0x48e952(0x314)?_0x204fdb['BattleSystemFTB']['Window_Selectable_processTouch'][_0x48e952(0x27a)](this):this[_0x48e952(0x26b)]()),this[_0x48e952(0x30a)];},Game_System['prototype'][_0x233678(0x2ee)]=function(_0x40e28d){const _0x3538d6=_0x233678;this[_0x3538d6(0x30a)]===undefined&&(_0x3538d6(0x2b1)===_0x3538d6(0x256)?(_0x4d0d4c=_0x864cc5[_0x3538d6(0x304)],_0x565e10=_0x52ef4d?this[_0x3538d6(0x193)]-_0x4f76a9[_0x3538d6(0x239)]-_0x3a2c77:_0x128b47[_0x3538d6(0x239)],_0x4e8949&&_0x2b70ad&&(_0x1f027c-=_0x43a974)):this[_0x3538d6(0x26b)]()),this[_0x3538d6(0x30a)]=_0x40e28d;},VisuMZ[_0x233678(0x2d6)][_0x233678(0x345)]=Game_Action[_0x233678(0x1b9)][_0x233678(0x2fc)],Game_Action[_0x233678(0x1b9)][_0x233678(0x2fc)]=function(){const _0x4ee73b=_0x233678;return BattleManager['isFTB']()?_0x4ee73b(0x2e3)===_0x4ee73b(0x2e3)?0x0:!!this[_0x4ee73b(0x28d)]:VisuMZ[_0x4ee73b(0x2d6)]['Game_Action_speed'][_0x4ee73b(0x27a)](this);},VisuMZ[_0x233678(0x2d6)][_0x233678(0x249)]=Game_Action[_0x233678(0x1b9)][_0x233678(0x241)],Game_Action[_0x233678(0x1b9)][_0x233678(0x241)]=function(){const _0x4c6d9c=_0x233678;VisuMZ['BattleSystemFTB'][_0x4c6d9c(0x249)]['call'](this),this[_0x4c6d9c(0x327)]();},Game_Action[_0x233678(0x1b9)]['applyGlobalFTB']=function(){const _0x2b3eee=_0x233678;if(!BattleManager[_0x2b3eee(0x1dc)]())return;if(!this['subject']())return;if(!this['item']())return;this[_0x2b3eee(0x281)]()&&this['item']()['id']===this[_0x2b3eee(0x317)]()[_0x2b3eee(0x2ad)]()&&(BattleManager['_FTB_GUARD_PASS']&&this[_0x2b3eee(0x317)]()['passTurnFTB']());const _0x465081=VisuMZ[_0x2b3eee(0x2d6)][_0x2b3eee(0x32a)],_0x18b078=this[_0x2b3eee(0x21f)]()[_0x2b3eee(0x189)];_0x18b078[_0x2b3eee(0x248)](_0x465081[_0x2b3eee(0x20d)])&&this[_0x2b3eee(0x317)]()[_0x2b3eee(0x298)]();},VisuMZ[_0x233678(0x2d6)]['Game_BattlerBase_hide']=Game_BattlerBase[_0x233678(0x1b9)][_0x233678(0x230)],Game_BattlerBase['prototype'][_0x233678(0x230)]=function(){const _0x5a9489=_0x233678;VisuMZ[_0x5a9489(0x2d6)][_0x5a9489(0x27c)][_0x5a9489(0x27a)](this),BattleManager[_0x5a9489(0x302)](),this[_0x5a9489(0x191)]()[_0x5a9489(0x200)]();},VisuMZ[_0x233678(0x2d6)][_0x233678(0x20e)]=Game_BattlerBase[_0x233678(0x1b9)]['appear'],Game_BattlerBase['prototype'][_0x233678(0x161)]=function(){const _0x524d67=_0x233678;VisuMZ[_0x524d67(0x2d6)]['Game_BattlerBase_appear'][_0x524d67(0x27a)](this),BattleManager[_0x524d67(0x302)](),this[_0x524d67(0x191)]()[_0x524d67(0x200)]();},VisuMZ[_0x233678(0x2d6)][_0x233678(0x2ce)]=Game_Battler[_0x233678(0x1b9)]['performCollapse'],Game_Battler['prototype'][_0x233678(0x1d1)]=function(){const _0x54e155=_0x233678;VisuMZ['BattleSystemFTB'][_0x54e155(0x2ce)][_0x54e155(0x27a)](this),BattleManager['removeActionBattlersFTB'](),this['friendsUnit']()['recalculateActionsFTB']();},Game_BattlerBase[_0x233678(0x1b9)][_0x233678(0x298)]=function(){const _0x5f33d0=_0x233678;this[_0x5f33d0(0x28d)]=!![],BattleManager[_0x5f33d0(0x302)]();},Game_BattlerBase[_0x233678(0x1b9)]['isPassingTurnFTB']=function(){return!!this['_passedTurnFTB'];},Game_BattlerBase[_0x233678(0x16d)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)]['Mechanics'][_0x233678(0x2f2)],Game_BattlerBase[_0x233678(0x328)]=VisuMZ['BattleSystemFTB'][_0x233678(0x14c)][_0x233678(0x18e)][_0x233678(0x2ca)],Game_BattlerBase[_0x233678(0x335)]=VisuMZ[_0x233678(0x2d6)]['Settings']['Mechanics'][_0x233678(0x1d0)],Game_BattlerBase[_0x233678(0x1b9)][_0x233678(0x1b0)]=function(){const _0x474982=_0x233678;let _0x476652=Game_BattlerBase[_0x474982(0x16d)];if(this['_buffs']===undefined)this[_0x474982(0x247)]();const _0x837998=this[_0x474982(0x214)][0x6]||0x0;if(_0x837998>0x0&&Game_BattlerBase[_0x474982(0x328)])_0x476652+=_0x837998;else _0x837998<0x0&&Game_BattlerBase[_0x474982(0x335)]&&(_0x476652+=_0x837998);const _0x237d42=VisuMZ[_0x474982(0x2d6)]['RegExp'],_0x209428=this['traitObjects']();for(const _0x162cae of _0x209428){if(_0x474982(0x14d)!==_0x474982(0x14d))_0x225035[_0x474982(0x2d6)]['Game_Battler_useItem'][_0x474982(0x27a)](this,_0x3389bf),this[_0x474982(0x2dd)](_0x474e04);else{if(!_0x162cae)continue;const _0x48e66f=_0x162cae[_0x474982(0x189)];_0x48e66f[_0x474982(0x248)](_0x237d42['ActionPointTraitPlus'])&&(_0x476652+=Number(RegExp['$1']));}}return Math[_0x474982(0x325)](0x0,_0x476652);},VisuMZ[_0x233678(0x2d6)][_0x233678(0x25f)]=Game_BattlerBase[_0x233678(0x1b9)][_0x233678(0x2f8)],Game_BattlerBase[_0x233678(0x1b9)][_0x233678(0x2f8)]=function(){const _0x5e286c=_0x233678;VisuMZ[_0x5e286c(0x2d6)]['Game_BattlerBase_clearStates'][_0x5e286c(0x27a)](this),this[_0x5e286c(0x191)]()[_0x5e286c(0x200)]();},VisuMZ[_0x233678(0x2d6)][_0x233678(0x2a8)]=Game_BattlerBase[_0x233678(0x1b9)][_0x233678(0x234)],Game_BattlerBase[_0x233678(0x1b9)][_0x233678(0x234)]=function(_0x3844a5){const _0x30504d=_0x233678;if(SceneManager[_0x30504d(0x27b)]()&&BattleManager['isFTB']()){if(_0x30504d(0x21c)==='LbVUz'){const _0x4ff8aa=DataManager[_0x30504d(0x2c9)](_0x3844a5);if(_0x4ff8aa>this[_0x30504d(0x191)]()[_0x30504d(0x306)]())return![];}else this[_0x30504d(0x1ac)](_0x1b1366,_0x28f483);}return VisuMZ[_0x30504d(0x2d6)][_0x30504d(0x2a8)][_0x30504d(0x27a)](this,_0x3844a5);},VisuMZ['BattleSystemFTB'][_0x233678(0x2d8)]=Game_Battler[_0x233678(0x1b9)][_0x233678(0x21d)],Game_Battler[_0x233678(0x1b9)]['useItem']=function(_0x43640a){const _0x1df2a1=_0x233678;VisuMZ[_0x1df2a1(0x2d6)]['Game_Battler_useItem'][_0x1df2a1(0x27a)](this,_0x43640a),this[_0x1df2a1(0x2dd)](_0x43640a);},Game_Battler['prototype']['payActionCostFTB']=function(_0x15048f){const _0x39750c=_0x233678;if(!_0x15048f)return;if(!SceneManager[_0x39750c(0x27b)]())return;if(!BattleManager['isFTB']())return;const _0x3a8769=BattleManager[_0x39750c(0x1fb)];if(_0x3a8769&&_0x3a8769['_forceAction'])return;const _0x167cb9=DataManager['getActionCostFTB'](_0x15048f);this[_0x39750c(0x191)]()['reduceActionsFTB'](_0x167cb9);},VisuMZ[_0x233678(0x2d6)][_0x233678(0x1ff)]=Game_Battler[_0x233678(0x1b9)][_0x233678(0x343)],Game_Battler['prototype'][_0x233678(0x343)]=function(){const _0x560507=_0x233678;this['_bypassStateTurnUpdatesFTB']=BattleManager[_0x560507(0x1dc)]()&&BattleManager['_FTB_STATE_BUFF_TURN_UPDATES_ONLY_ON_OPPONENT_TURNS'],VisuMZ[_0x560507(0x2d6)][_0x560507(0x1ff)][_0x560507(0x27a)](this),delete this[_0x560507(0x197)];},VisuMZ['BattleSystemFTB'][_0x233678(0x286)]=Game_BattlerBase[_0x233678(0x1b9)][_0x233678(0x232)],Game_BattlerBase[_0x233678(0x1b9)][_0x233678(0x232)]=function(){const _0x19a682=_0x233678;if(this[_0x19a682(0x197)])return;VisuMZ[_0x19a682(0x2d6)]['Game_BattlerBase_updateStateTurns'][_0x19a682(0x27a)](this);},VisuMZ[_0x233678(0x2d6)][_0x233678(0x1ed)]=Game_BattlerBase['prototype'][_0x233678(0x143)],Game_BattlerBase['prototype'][_0x233678(0x143)]=function(){const _0x319a7d=_0x233678;if(this[_0x319a7d(0x197)])return;VisuMZ[_0x319a7d(0x2d6)][_0x319a7d(0x1ed)][_0x319a7d(0x27a)](this);},VisuMZ[_0x233678(0x2d6)]['Game_Battler_addState']=Game_Battler[_0x233678(0x1b9)]['addState'],Game_Battler['prototype'][_0x233678(0x1d3)]=function(_0x27e6e0){const _0x3f412b=_0x233678;VisuMZ['BattleSystemFTB'][_0x3f412b(0x313)][_0x3f412b(0x27a)](this,_0x27e6e0),this[_0x3f412b(0x191)]()[_0x3f412b(0x200)]();},VisuMZ[_0x233678(0x2d6)][_0x233678(0x142)]=Game_Battler[_0x233678(0x1b9)]['removeState'],Game_Battler['prototype'][_0x233678(0x1bc)]=function(_0x24b36b){const _0x4e2ba0=_0x233678;VisuMZ[_0x4e2ba0(0x2d6)][_0x4e2ba0(0x142)][_0x4e2ba0(0x27a)](this,_0x24b36b),this['friendsUnit']()['recalculateActionsFTB']();},VisuMZ[_0x233678(0x2d6)][_0x233678(0x257)]=Game_Battler['prototype'][_0x233678(0x2e6)],Game_Battler[_0x233678(0x1b9)]['addBuff']=function(_0x2f6ca5,_0x4a6c40){const _0x1769a3=_0x233678;VisuMZ[_0x1769a3(0x2d6)]['Game_Battler_addBuff'][_0x1769a3(0x27a)](this,_0x2f6ca5,_0x4a6c40),this[_0x1769a3(0x191)]()[_0x1769a3(0x200)]();},VisuMZ[_0x233678(0x2d6)][_0x233678(0x2a9)]=Game_Battler[_0x233678(0x1b9)][_0x233678(0x2c8)],Game_Battler[_0x233678(0x1b9)][_0x233678(0x2c8)]=function(_0x453b2f,_0x19c4f8){const _0x1a93f6=_0x233678;VisuMZ['BattleSystemFTB']['Game_Battler_addDebuff'][_0x1a93f6(0x27a)](this,_0x453b2f,_0x19c4f8),this[_0x1a93f6(0x191)]()['recalculateActionsFTB']();},VisuMZ[_0x233678(0x2d6)][_0x233678(0x308)]=Game_Battler[_0x233678(0x1b9)][_0x233678(0x21a)],Game_Battler[_0x233678(0x1b9)][_0x233678(0x21a)]=function(_0x28898a){const _0x19608e=_0x233678;VisuMZ[_0x19608e(0x2d6)][_0x19608e(0x308)]['call'](this,_0x28898a),this[_0x19608e(0x191)]()['recalculateActionsFTB']();},VisuMZ[_0x233678(0x2d6)][_0x233678(0x162)]=Game_Battler[_0x233678(0x1b9)]['forceAction'],Game_Battler['prototype'][_0x233678(0x254)]=function(_0x3a6664,_0x578e6b){const _0x426508=_0x233678;BattleManager['isFTB']()?this[_0x426508(0x1ac)](_0x3a6664,_0x578e6b):_0x426508(0x2d0)===_0x426508(0x1d7)?_0x4cb5a4[_0x426508(0x2d6)][_0x426508(0x1eb)]['call'](this):VisuMZ[_0x426508(0x2d6)][_0x426508(0x162)][_0x426508(0x27a)](this,_0x3a6664,_0x578e6b);},Game_Battler[_0x233678(0x1b9)][_0x233678(0x1ac)]=function(_0x60d9f5,_0x21aedb){const _0x121b4a=_0x233678,_0x518a8d=new Game_Action(this,!![]);_0x518a8d['setSkill'](_0x60d9f5),_0x518a8d[_0x121b4a(0x296)]=!![];if(_0x21aedb===-0x2)_0x518a8d[_0x121b4a(0x322)](this[_0x121b4a(0x315)]);else _0x21aedb===-0x1?_0x121b4a(0x2cc)===_0x121b4a(0x2a5)?this[_0x121b4a(0x29f)]():_0x518a8d['decideRandomTarget']():_0x518a8d[_0x121b4a(0x322)](_0x21aedb);this[_0x121b4a(0x19b)][_0x121b4a(0x16c)](_0x518a8d);},VisuMZ[_0x233678(0x2d6)][_0x233678(0x1b6)]=BattleManager[_0x233678(0x254)],BattleManager[_0x233678(0x254)]=function(_0x462038){const _0x5aaf33=_0x233678;if(BattleManager[_0x5aaf33(0x1dc)]()){if(_0x5aaf33(0x2a6)===_0x5aaf33(0x1ae)){const _0x10a305=new _0x5aac15(this,!![]);_0x10a305[_0x5aaf33(0x1a4)](_0x218d6e),_0x10a305[_0x5aaf33(0x296)]=!![];if(_0x181ac1===-0x2)_0x10a305[_0x5aaf33(0x322)](this[_0x5aaf33(0x315)]);else _0x24c84b===-0x1?_0x10a305['decideRandomTarget']():_0x10a305[_0x5aaf33(0x322)](_0x44376e);this['_actions'][_0x5aaf33(0x16c)](_0x10a305);}else this[_0x5aaf33(0x1ac)](_0x462038);}else VisuMZ[_0x5aaf33(0x2d6)][_0x5aaf33(0x1b6)][_0x5aaf33(0x27a)](this,_0x462038);},BattleManager['forceActionFTB']=function(_0x9e1ca1){const _0x531db9=_0x233678,_0xd35225=JsonEx[_0x531db9(0x218)](_0x9e1ca1['currentAction']());this[_0x531db9(0x2b9)][_0x531db9(0x277)]([_0x9e1ca1,_0xd35225]);},VisuMZ['BattleSystemFTB'][_0x233678(0x18f)]=Game_Actor[_0x233678(0x1b9)][_0x233678(0x2c2)],Game_Actor[_0x233678(0x1b9)][_0x233678(0x2c2)]=function(){const _0x1e94aa=_0x233678;if(BattleManager[_0x1e94aa(0x1dc)]()){if(_0x1e94aa(0x228)!==_0x1e94aa(0x228)){const _0x4400a2=_0x536eb4[_0x1e94aa(0x14c)];if(!_0x4400a2['DrawActionsRemaining'])return![];const _0x25da66=_0x4400a2[_0x1e94aa(0x2bd)],_0x3a7ee8=_0x4400a2[_0x1e94aa(0x2ba)],_0x5db5a7=this['_unit']===_0x30eb7c;if(_0x3a7ee8)return _0x5db5a7?_0x3d8df8===0x0:_0x4661e9===_0x4400a2['MaxVisible']-0x1;else return _0x25da66?_0x3a9c18===0x0:_0x22cd2f===_0x4400a2[_0x1e94aa(0x290)]-0x1;}else{if(this['battler']())this[_0x1e94aa(0x181)]()['stepForward']();return![];}}return VisuMZ[_0x1e94aa(0x2d6)][_0x1e94aa(0x18f)][_0x1e94aa(0x27a)](this);},VisuMZ['BattleSystemFTB'][_0x233678(0x280)]=Game_Actor[_0x233678(0x1b9)][_0x233678(0x22b)],Game_Actor['prototype']['changeEquip']=function(_0x31ff9f,_0x67703a){const _0x1a8f3c=_0x233678;VisuMZ[_0x1a8f3c(0x2d6)]['Game_Actor_changeEquip'][_0x1a8f3c(0x27a)](this,_0x31ff9f,_0x67703a),this[_0x1a8f3c(0x191)]()[_0x1a8f3c(0x200)]();},VisuMZ[_0x233678(0x2d6)][_0x233678(0x2de)]=Game_Actor[_0x233678(0x1b9)][_0x233678(0x209)],Game_Actor[_0x233678(0x1b9)][_0x233678(0x209)]=function(_0xf3eefd,_0x28c86c){const _0x168fd4=_0x233678;VisuMZ[_0x168fd4(0x2d6)]['Game_Actor_forceChangeEquip'][_0x168fd4(0x27a)](this,_0xf3eefd,_0x28c86c),this[_0x168fd4(0x191)]()[_0x168fd4(0x200)]();},VisuMZ[_0x233678(0x2d6)]['Game_Actor_changeEquipById']=Game_Actor[_0x233678(0x1b9)][_0x233678(0x174)],Game_Actor['prototype']['changeEquipById']=function(_0x226716,_0x37bc06){const _0x5242da=_0x233678;VisuMZ[_0x5242da(0x2d6)][_0x5242da(0x284)][_0x5242da(0x27a)](this,_0x226716,_0x37bc06),this['friendsUnit']()[_0x5242da(0x200)]();},VisuMZ[_0x233678(0x2d6)]['Game_Actor_discardEquip']=Game_Actor[_0x233678(0x1b9)][_0x233678(0x2b4)],Game_Actor['prototype'][_0x233678(0x2b4)]=function(_0x5498b5){const _0x479ed0=_0x233678;VisuMZ[_0x479ed0(0x2d6)][_0x479ed0(0x29c)][_0x479ed0(0x27a)](this,_0x5498b5),this[_0x479ed0(0x191)]()[_0x479ed0(0x200)]();},VisuMZ['BattleSystemFTB'][_0x233678(0x1e8)]=Game_Actor['prototype'][_0x233678(0x224)],Game_Actor[_0x233678(0x1b9)][_0x233678(0x224)]=function(_0x51a1d5){const _0x47a27e=_0x233678;VisuMZ[_0x47a27e(0x2d6)][_0x47a27e(0x1e8)][_0x47a27e(0x27a)](this,_0x51a1d5),this[_0x47a27e(0x191)]()[_0x47a27e(0x200)]();},VisuMZ[_0x233678(0x2d6)][_0x233678(0x1c6)]=Game_Actor[_0x233678(0x1b9)][_0x233678(0x2bc)],Game_Actor[_0x233678(0x1b9)][_0x233678(0x2bc)]=function(_0x46dd5c,_0xc0a948){const _0x512005=_0x233678;VisuMZ[_0x512005(0x2d6)][_0x512005(0x1c6)][_0x512005(0x27a)](this,_0x46dd5c,_0xc0a948),this[_0x512005(0x191)]()[_0x512005(0x200)]();},VisuMZ['BattleSystemFTB'][_0x233678(0x2cd)]=Game_Enemy[_0x233678(0x1b9)][_0x233678(0x173)],Game_Enemy[_0x233678(0x1b9)][_0x233678(0x173)]=function(_0x1e50ba){const _0x172dc7=_0x233678;VisuMZ[_0x172dc7(0x2d6)][_0x172dc7(0x2cd)][_0x172dc7(0x27a)](this,_0x1e50ba),this[_0x172dc7(0x191)]()['recalculateActionsFTB']();},Game_Unit[_0x233678(0x29b)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)][_0x233678(0x18e)][_0x233678(0x299)],Game_Unit[_0x233678(0x182)]=VisuMZ[_0x233678(0x2d6)]['Settings'][_0x233678(0x18e)][_0x233678(0x221)],Game_Unit[_0x233678(0x261)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)]['Mechanics'][_0x233678(0x2f5)],Game_Unit[_0x233678(0x1b9)][_0x233678(0x208)]=function(){const _0x1e497e=_0x233678;this[_0x1e497e(0x1fa)](),this[_0x1e497e(0x1a8)](this[_0x1e497e(0x33d)]());},Game_Unit[_0x233678(0x1b9)][_0x233678(0x1fa)]=function(){const _0x65769=_0x233678;this[_0x65769(0x330)]=!![];let _0x546b5d=0x0,_0x1149c3=this['aliveMembers']()[_0x65769(0x2cf)](_0x439a40=>_0x439a40[_0x65769(0x2e0)]());_0x546b5d=_0x1149c3[_0x65769(0x297)]((_0x314cb2,_0x2f47db)=>_0x314cb2+_0x2f47db[_0x65769(0x1b0)](),_0x546b5d),_0x546b5d=_0x546b5d[_0x65769(0x1f5)](Game_Unit['_FTB_MIN_ACTIONS'],Game_Unit[_0x65769(0x29b)]),this[_0x65769(0x252)]=_0x546b5d;},Game_Unit[_0x233678(0x1b9)][_0x233678(0x200)]=function(){const _0x42359f=_0x233678;if(!BattleManager[_0x42359f(0x1dc)]())return;if(!$gameParty[_0x42359f(0x236)]())return;const _0x35dd91=this[_0x42359f(0x33d)]();this[_0x42359f(0x1fa)]();let _0x24cc0a=this[_0x42359f(0x306)]();const _0x29915a=this[_0x42359f(0x33d)]()-_0x35dd91;if(BattleManager['_FTB_RECALC_ADD_DIFF']&&_0x29915a>0x0)_0x24cc0a+=_0x29915a;if(BattleManager[_0x42359f(0x22a)]&&_0x29915a<0x0)_0x24cc0a+=_0x29915a;_0x24cc0a=Math[_0x42359f(0x2fd)](_0x24cc0a,Game_Unit[_0x42359f(0x29b)]),this[_0x42359f(0x1a8)](_0x24cc0a);},Game_Unit[_0x233678(0x1b9)][_0x233678(0x306)]=function(){const _0xf2b89f=_0x233678;return this[_0xf2b89f(0x2eb)]||0x0;},Game_Unit[_0x233678(0x1b9)]['setCurrentActionsFTB']=function(_0x26db0d){const _0x5a2089=_0x233678;this[_0x5a2089(0x2eb)]=Math[_0x5a2089(0x2c3)](_0x26db0d)[_0x5a2089(0x1f5)](0x0,Game_Unit['_FTB_MAX_ACTIONS']),!Game_Unit[_0x5a2089(0x261)]&&(_0x5a2089(0x32e)===_0x5a2089(0x155)?!this[_0x5a2089(0x2fa)][_0x5a2089(0x2ab)](this[_0x5a2089(0x1fd)])&&this[_0x5a2089(0x2fa)]['unshift'](this[_0x5a2089(0x1fd)]):this[_0x5a2089(0x2eb)]=Math[_0x5a2089(0x2fd)](this[_0x5a2089(0x2eb)],this[_0x5a2089(0x33d)]()));},Game_Unit[_0x233678(0x1b9)]['gainCurrentActionsFTB']=function(_0x24ba4e){const _0x5b4c20=_0x233678;this[_0x5b4c20(0x1a8)](this[_0x5b4c20(0x306)]()+_0x24ba4e);},Game_Unit['prototype'][_0x233678(0x287)]=function(_0x1867e3){const _0x322182=_0x233678;this[_0x322182(0x271)](-_0x1867e3);},Game_Unit['prototype']['getMaxActionsFTB']=function(){const _0x1c8b98=_0x233678;return this[_0x1c8b98(0x252)]||0x0;},Game_Unit['prototype'][_0x233678(0x1f7)]=function(_0x3bd1aa){const _0x3af097=_0x233678;this['_ftbActionsMax']=_0x3bd1aa['clamp'](Game_Unit[_0x3af097(0x182)],Game_Unit[_0x3af097(0x29b)]);},Game_Unit[_0x233678(0x1b9)][_0x233678(0x2a7)]=function(_0x5ad24b){const _0x172bb3=_0x233678;this[_0x172bb3(0x287)](_0x5ad24b);},Game_Unit[_0x233678(0x1b9)]['canActFTB']=function(){const _0x2653e6=_0x233678;if(BattleManager[_0x2653e6(0x1fd)]){if(this[_0x2653e6(0x205)]()[_0x2653e6(0x2ab)](BattleManager['_subject'])){if(_0x2653e6(0x16b)==='LVZEm'){const _0x9a2081=BattleManager[_0x2653e6(0x1fd)]['currentAction']();if(_0x9a2081&&_0x9a2081[_0x2653e6(0x296)])return!![];}else _0x4e14cf['BattleSystemFTB'][_0x2653e6(0x27c)]['call'](this),_0x22dde9[_0x2653e6(0x302)](),this['friendsUnit']()[_0x2653e6(0x200)]();}}return this[_0x2653e6(0x2eb)]=this[_0x2653e6(0x2eb)]||0x0,this[_0x2653e6(0x2eb)]>0x0;},Game_Unit[_0x233678(0x1b9)][_0x233678(0x217)]=function(){const _0x20c0e5=_0x233678;for(const _0x155eb2 of this[_0x20c0e5(0x205)]()){if(!_0x155eb2)continue;const _0x27ef7b=_0x155eb2[_0x20c0e5(0x1f9)]();_0x155eb2[_0x20c0e5(0x343)](),_0x155eb2[_0x20c0e5(0x17a)](),_0x27ef7b&&_0x155eb2[_0x20c0e5(0x24c)]()&&_0x155eb2[_0x20c0e5(0x1d1)]();}},Game_Unit[_0x233678(0x1b9)]['meetEndTurnConditionsFTB']=function(){const _0xc66680=_0x233678;if(this['getCurrentActionsFTB']()<=0x0)return!![];if(!this[_0xc66680(0x288)]()[_0xc66680(0x24a)](_0x9cd625=>_0x9cd625['canMove']()))return!![];return![];},Game_Unit[_0x233678(0x1b9)]['updateStateTurnsFTB']=function(){const _0x1d3348=_0x233678;for(const _0x1ae644 of this[_0x1d3348(0x205)]()){if('tWazz'===_0x1d3348(0x27d)){if(_0x18c737===_0x1d3348(0x33f))return;if(_0x10b548===_0x1d3348(0x1c3))_0x43ccb8=this[_0x1d3348(0x2b3)]===_0x37322a?_0x1d3348(0x1e5):_0x1d3348(0x1ca);const _0x46b027=_0x4428e8[_0x1d3348(0x14c)];if(_0x46b027['%1ActionPicture'[_0x1d3348(0x225)](_0x28a0f3)]){const _0x56bcb1=_0x46b027[_0x1d3348(0x150)[_0x1d3348(0x225)](_0x52d804)],_0x826a43=_0x24d35d[_0x1d3348(0x31d)](_0x56bcb1);_0x826a43[_0x1d3348(0x246)](this['drawPicture'][_0x1d3348(0x213)](this,_0x826a43,_0x18f64f,_0x22d2fd,_0xa99f18));}else{const _0xc18825=_0x288639['ftb%1ActionsIcon'[_0x1d3348(0x225)](_0x1505c1)];this[_0x1d3348(0x238)](_0xc18825,_0x249f55,_0x24b85d),this[_0x1d3348(0x152)](_0x533b22)&&this[_0x1d3348(0x323)](_0x365911,_0x56fede);}}else{if(!_0x1ae644)continue;_0x1ae644['updateStateTurns'](),_0x1ae644[_0x1d3348(0x2f6)](0x2),_0x1ae644[_0x1d3348(0x143)](),_0x1ae644[_0x1d3348(0x17a)]();}}},Game_Unit[_0x233678(0x1b9)]['clearPassTurnFTB']=function(){const _0x5d6177=_0x233678;for(const _0x170d1a of this[_0x5d6177(0x205)]()){if(_0x5d6177(0x32b)!==_0x5d6177(0x32b))this[_0x5d6177(0x1ce)]=_0x5d6177(0x231);else{if(!_0x170d1a)continue;_0x170d1a['_passedTurnFTB']=![];}}},Game_Unit[_0x233678(0x1b9)][_0x233678(0x1ab)]=function(){const _0x363f67=_0x233678,_0xfa1cee=this['members']();return Math[_0x363f67(0x2fd)](..._0xfa1cee[_0x363f67(0x2bb)](_0x11b1a9=>_0x11b1a9[_0x363f67(0x212)]));},Game_Unit[_0x233678(0x1b9)][_0x233678(0x1f4)]=function(){const _0x2af3bd=_0x233678,_0x344173=this[_0x2af3bd(0x205)]();return Math[_0x2af3bd(0x325)](..._0x344173[_0x2af3bd(0x2bb)](_0x23962c=>_0x23962c[_0x2af3bd(0x212)]));},Game_Unit[_0x233678(0x1b9)]['ftbTotalAgility']=function(){const _0x49697a=_0x233678,_0x29d2f0=this[_0x49697a(0x205)]();return _0x29d2f0[_0x49697a(0x297)]((_0x342eaa,_0x5dc3c1)=>_0x342eaa+_0x5dc3c1[_0x49697a(0x212)],0x0);},VisuMZ[_0x233678(0x2d6)][_0x233678(0x28a)]=Game_Unit['prototype'][_0x233678(0x30c)],Game_Unit[_0x233678(0x1b9)]['onBattleStart']=function(_0x41527d){const _0x56cc60=_0x233678;VisuMZ[_0x56cc60(0x2d6)]['Game_Unit_onBattleStart']['call'](this,_0x41527d),BattleManager[_0x56cc60(0x1dc)]()&&('ktElW'===_0x56cc60(0x2c5)?this[_0x56cc60(0x141)]=0x0:_0x2c0558['BattleSystemFTB'][_0x56cc60(0x171)][_0x56cc60(0x27a)](this));},Game_Unit['prototype'][_0x233678(0x1af)]=function(){const _0x4ba333=_0x233678,_0x3329f0=this[_0x4ba333(0x288)]();if(BattleManager[_0x4ba333(0x198)])return _0x3329f0;if(BattleManager['_FTB_FREE_CHANGE'])return _0x3329f0;this['_ftbLastIndex']=this[_0x4ba333(0x141)]||0x0;while(!_0x3329f0['some'](_0xcf3db6=>_0xcf3db6[_0x4ba333(0x1e4)]()===this[_0x4ba333(0x141)])){if(_0x4ba333(0x2cb)===_0x4ba333(0x15d)){if(!_0x526f51)return;const _0x4166b1=_0x3bd408['Settings'],_0x3c0df7=_0x4166b1[_0x4ba333(0x156)],_0x129c5e=_0x3c0df7/_0x53afe8[_0x4ba333(0x2b5)],_0x81111f=_0x3c0df7/_0x3b92df['height'],_0x4e98ad=_0x4cbc2d[_0x4ba333(0x2fd)](_0x129c5e,_0x81111f,0x1),_0x2ff2d0=_0x5c6e50[_0x4ba333(0x283)],_0x1a4d47=_0x3b0b7f[_0x4ba333(0x283)],_0x4318a3=_0x51afdf[_0x4ba333(0x2c3)](_0x2ff2d0*_0x4e98ad),_0x24b5cf=_0x3db73d['round'](_0x1a4d47*_0x4e98ad),_0x2494c5=_0x397ad4[_0x4ba333(0x2c3)](_0x135bbb+(_0x3c0df7-_0x4318a3)/0x2),_0xdcee4d=_0x1064a7[_0x4ba333(0x2c3)](_0x277d5a+(_0x3c0df7-_0x24b5cf)/0x2);this[_0x4ba333(0x2d3)][_0x4ba333(0x31c)]['imageSmoothingEnabled']=_0x4166b1[_0x4ba333(0x237)],this['contents'][_0x4ba333(0x267)](_0x10c864,0x0,0x0,_0x2ff2d0,_0x1a4d47,_0x2494c5,_0xdcee4d,_0x4318a3,_0x24b5cf),this[_0x4ba333(0x2d3)][_0x4ba333(0x31c)]['imageSmoothingEnabled']=!![],this[_0x4ba333(0x152)](_0x360e82)&&this[_0x4ba333(0x323)](_0x404dd8,_0x4a6817);}else{const _0x1ae908=this['members'](),_0x520c4f=_0x1ae908[this[_0x4ba333(0x141)]];let _0x556c3b=_0x1ae908['indexOf'](_0x520c4f)+0x1;if(_0x556c3b>=_0x1ae908['length'])_0x556c3b=0x0;this[_0x4ba333(0x141)]=_0x556c3b;}}for(;;){if(_0x4ba333(0x157)!==_0x4ba333(0x195)){const _0xb7e1e0=_0x3329f0[0x0]['index']();if(_0xb7e1e0===this['_ftbLastIndex'])break;_0x3329f0[_0x4ba333(0x277)](_0x3329f0[_0x4ba333(0x168)]());}else{if(!this[_0x4ba333(0x2b3)])return;(this['_currentActions']!==this[_0x4ba333(0x2b3)][_0x4ba333(0x306)]()||this[_0x4ba333(0x307)]!==this[_0x4ba333(0x2b3)][_0x4ba333(0x33d)]())&&(this['_currentActions']=this[_0x4ba333(0x2b3)][_0x4ba333(0x306)](),this[_0x4ba333(0x307)]=this['_unit'][_0x4ba333(0x33d)](),this[_0x4ba333(0x1db)]());}}return _0x3329f0;},Game_Unit[_0x233678(0x1b9)][_0x233678(0x1da)]=function(_0x189ca6){this['_ftbLastIndex']=_0x189ca6?_0x189ca6['index']():0x0,this['_ftbLastIndex']++;},VisuMZ[_0x233678(0x2d6)]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x233678(0x1b9)][_0x233678(0x1b2)],Scene_Battle[_0x233678(0x1b9)][_0x233678(0x1b2)]=function(){const _0x3fab60=_0x233678;VisuMZ[_0x3fab60(0x2d6)][_0x3fab60(0x244)][_0x3fab60(0x27a)](this),BattleManager['isFTB']()&&('LKKAV'!=='LKKAV'?(this[_0x3fab60(0x25e)]=this[_0x3fab60(0x2b3)][_0x3fab60(0x306)](),this[_0x3fab60(0x307)]=this[_0x3fab60(0x2b3)][_0x3fab60(0x33d)](),this[_0x3fab60(0x1db)]()):this[_0x3fab60(0x188)]());},Scene_Battle[_0x233678(0x1b9)]['createActorCommandWindowFTB']=function(){const _0x445004=_0x233678,_0x203418=this[_0x445004(0x333)];this[_0x445004(0x2fe)]()&&(_0x445004(0x2c7)!==_0x445004(0x2c7)?this['ftbSwitchActorDirection'](![]):delete _0x203418[_0x445004(0x23e)][_0x445004(0x342)]);},VisuMZ[_0x233678(0x2d6)][_0x233678(0x2d5)]=Scene_Battle['prototype'][_0x233678(0x25b)],Scene_Battle['prototype'][_0x233678(0x25b)]=function(){const _0x590dae=_0x233678;BattleManager[_0x590dae(0x1dc)]()?this[_0x590dae(0x204)]():VisuMZ[_0x590dae(0x2d6)]['Scene_Battle_commandCancel'][_0x590dae(0x27a)](this);},Scene_Battle['prototype'][_0x233678(0x204)]=function(){const _0x176f74=_0x233678;this['_partyCommandWindow'][_0x176f74(0x190)](),this[_0x176f74(0x333)][_0x176f74(0x262)]();},VisuMZ[_0x233678(0x2d6)][_0x233678(0x171)]=Scene_Battle[_0x233678(0x1b9)][_0x233678(0x332)],Scene_Battle[_0x233678(0x1b9)][_0x233678(0x332)]=function(){const _0x5af5e5=_0x233678;BattleManager[_0x5af5e5(0x1dc)]()?this[_0x5af5e5(0x263)]():_0x5af5e5(0x331)!=='YpnGa'?_0x432341[_0x5af5e5(0x277)](_0x4090f0):VisuMZ[_0x5af5e5(0x2d6)][_0x5af5e5(0x171)][_0x5af5e5(0x27a)](this);},VisuMZ[_0x233678(0x2d6)][_0x233678(0x19e)]=Scene_Battle[_0x233678(0x1b9)][_0x233678(0x1f0)],Scene_Battle[_0x233678(0x1b9)][_0x233678(0x1f0)]=function(){const _0x253fdc=_0x233678;VisuMZ[_0x253fdc(0x2d6)]['Scene_Battle_createAllWindows'][_0x253fdc(0x27a)](this),this['createActionCountWindowsFTB']();},Scene_Battle['prototype'][_0x233678(0x1ec)]=function(){const _0x35f977=_0x233678;if(!BattleManager[_0x35f977(0x1dc)]())return;const _0x2a8817=this[_0x35f977(0x240)](this['_windowLayer']);this[_0x35f977(0x309)]=new Window_FTB_ActionCount(),this[_0x35f977(0x309)][_0x35f977(0x15a)]($gameTroop),this[_0x35f977(0x2a4)](this['_ftbTroopActionCountWindow'],_0x2a8817),this[_0x35f977(0x33a)]=new Window_FTB_ActionCount(),this[_0x35f977(0x33a)][_0x35f977(0x15a)]($gameParty),this[_0x35f977(0x2a4)](this[_0x35f977(0x33a)],_0x2a8817),this[_0x35f977(0x2f4)]();},Scene_Battle[_0x233678(0x1b9)]['repositionLogWindowFTB']=function(){const _0x51a29e=_0x233678;if(!BattleManager[_0x51a29e(0x1dc)]())return;if(!this[_0x51a29e(0x220)])return;const _0x3fba58=Window_FTB_ActionCount['Settings'];if(_0x3fba58['BottomPosition'])return;this[_0x51a29e(0x220)]['y']+=_0x3fba58['LogWindowTopOffsetY'];},Window_Base['_FTB_COST_POSITION']=VisuMZ['BattleSystemFTB']['Settings'][_0x233678(0x233)][_0x233678(0x33b)],Window_Base[_0x233678(0x1fe)]=VisuMZ[_0x233678(0x2d6)]['Settings'][_0x233678(0x233)][_0x233678(0x2c1)],Window_Base[_0x233678(0x275)]=VisuMZ[_0x233678(0x2d6)]['Settings'][_0x233678(0x233)]['ShowCostForGuard'],Window_Base[_0x233678(0x172)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)]['General'][_0x233678(0x23d)],Window_Base[_0x233678(0x2e7)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)][_0x233678(0x233)][_0x233678(0x1b4)],VisuMZ[_0x233678(0x2d6)][_0x233678(0x2a0)]=Window_Base['prototype'][_0x233678(0x2c0)],Window_Base[_0x233678(0x1b9)]['makeAdditionalSkillCostText']=function(_0x2dc94d,_0x35d9e2,_0x4b6c1e){const _0x1c44c8=_0x233678;return _0x4b6c1e=VisuMZ[_0x1c44c8(0x2d6)][_0x1c44c8(0x2a0)][_0x1c44c8(0x27a)](this,_0x2dc94d,_0x35d9e2,_0x4b6c1e),_0x4b6c1e=this[_0x1c44c8(0x1be)](_0x2dc94d,_0x35d9e2,_0x4b6c1e),_0x4b6c1e;},VisuMZ[_0x233678(0x2d6)][_0x233678(0x15b)]=Window_Base[_0x233678(0x1b9)][_0x233678(0x1d4)],Window_Base['prototype'][_0x233678(0x1d4)]=function(_0x7aef1f,_0x5a6a11,_0x44aaae,_0x5b1869){const _0x1d7939=_0x233678;BattleManager[_0x1d7939(0x1dc)]()&&this[_0x1d7939(0x207)]===Window_BattleItem?this['drawItemNumberFTB'](_0x7aef1f,_0x5a6a11,_0x44aaae,_0x5b1869):_0x1d7939(0x269)==='JIzSU'?VisuMZ['BattleSystemFTB'][_0x1d7939(0x15b)][_0x1d7939(0x27a)](this,_0x7aef1f,_0x5a6a11,_0x44aaae,_0x5b1869):(_0x2df0e1(_0x1d7939(0x25d)['format'](_0x343e2d,_0x18830b)),_0x31a3a1[_0x1d7939(0x1ef)]()),this[_0x1d7939(0x2e4)]();},Window_Base[_0x233678(0x1b9)][_0x233678(0x1c0)]=function(_0x58c948,_0x39f8c3,_0x431b4f,_0x385718){const _0x2d83ab=_0x233678,_0x4b587d=BattleManager[_0x2d83ab(0x158)]||$gameParty[_0x2d83ab(0x205)]()[0x0],_0x16c4fb=this[_0x2d83ab(0x1be)](_0x4b587d,_0x58c948,''),_0x19fd4d=this['textSizeEx'](_0x16c4fb)['width'],_0x4150aa=Window_Base[_0x2d83ab(0x30e)];let _0x3d854c=_0x39f8c3+_0x385718-_0x19fd4d;if(_0x16c4fb==='')_0x2d83ab(0x17f)===_0x2d83ab(0x176)?(_0x35bbb6===this['index']()&&(this[_0x2d83ab(0x291)]=!![]),this[_0x2d83ab(0x292)](_0x4c2cc9),_0x43c078['processSwitchActors'](_0x12f0f5,_0x501643)):VisuMZ[_0x2d83ab(0x2d6)][_0x2d83ab(0x15b)][_0x2d83ab(0x27a)](this,_0x58c948,_0x39f8c3,_0x431b4f,_0x385718);else{if(this['isDrawItemNumber'](_0x58c948)){this[_0x2d83ab(0x2e4)]();const _0x46250e=VisuMZ['ItemsEquipsCore'][_0x2d83ab(0x14c)][_0x2d83ab(0x2e8)];this[_0x2d83ab(0x2d3)][_0x2d83ab(0x24b)]=_0x46250e[_0x2d83ab(0x1bb)];if(_0x4150aa){const _0x460628=_0x46250e['ItemQuantityFmt'],_0x27d359=_0x460628['format']($gameParty[_0x2d83ab(0x1f6)](_0x58c948)),_0x18fb21=this['textWidth'](_0x27d359+this[_0x2d83ab(0x340)]());_0x3d854c-=_0x18fb21;}else _0x385718-=this[_0x2d83ab(0x229)](this[_0x2d83ab(0x340)]())+_0x19fd4d;VisuMZ['BattleSystemFTB'][_0x2d83ab(0x15b)]['call'](this,_0x58c948,_0x39f8c3,_0x431b4f,_0x385718);}}this[_0x2d83ab(0x14f)](_0x16c4fb,_0x3d854c,_0x431b4f);},Window_Base[_0x233678(0x1b9)]['makeAdditionalCostTextFTB']=function(_0x2a31f8,_0x400226,_0x2e36ef){const _0x333e54=_0x233678;if(!BattleManager[_0x333e54(0x1dc)]())return _0x2e36ef;if(!_0x2a31f8)return _0x2e36ef;if(!_0x400226)return _0x2e36ef;if(_0x400226['note'][_0x333e54(0x248)](VisuMZ['BattleSystemFTB'][_0x333e54(0x32a)][_0x333e54(0x2e5)]))return _0x2e36ef;let _0x3de332=DataManager[_0x333e54(0x2c9)](_0x400226);const _0x400ee9=Window_Base[_0x333e54(0x30e)],_0x50acbc=Window_Base[_0x333e54(0x1fe)],_0x5c0eea=Window_Base[_0x333e54(0x275)],_0x2fc4fd=Window_Base['_FTB_COST_SHOW_0'],_0x2dbe34=Window_Base[_0x333e54(0x2e7)];if(_0x400226['note'][_0x333e54(0x248)](VisuMZ[_0x333e54(0x2d6)][_0x333e54(0x32a)][_0x333e54(0x312)])){if(_0x3de332<0x0)return _0x2e36ef;}else{if(DataManager[_0x333e54(0x281)](_0x400226)&&this[_0x333e54(0x207)]===Window_ActorCommand){if(!_0x50acbc&&_0x400226['id']===_0x2a31f8[_0x333e54(0x165)]())return _0x2e36ef;if(!_0x5c0eea&&_0x400226['id']===_0x2a31f8[_0x333e54(0x2ad)]())return _0x2e36ef;}if(_0x3de332<0x0)return _0x2e36ef;if(!_0x2fc4fd&&_0x3de332===0x0)return _0x2e36ef;if(!_0x2dbe34&&_0x3de332===0x1)return _0x2e36ef;}const _0x506084=_0x333e54(0x324)[_0x333e54(0x225)](ImageManager[_0x333e54(0x179)]),_0x8ed391=TextManager['ftbActionPointsAbbr'];let _0x56ccec=TextManager[_0x333e54(0x265)][_0x333e54(0x225)](_0x3de332,_0x8ed391,_0x506084);if(_0x2e36ef==='')_0x2e36ef+=_0x56ccec;else _0x400ee9?_0x333e54(0x17d)!==_0x333e54(0x17d)?this[_0x333e54(0x1dc)]()?this[_0x333e54(0x146)]():_0x19be1a['BattleSystemFTB'][_0x333e54(0x199)][_0x333e54(0x27a)](this):_0x2e36ef=_0x56ccec+this[_0x333e54(0x340)]()+_0x2e36ef:_0x2e36ef=_0x2e36ef+this['skillCostSeparator']()+_0x56ccec;return _0x2e36ef;},VisuMZ[_0x233678(0x2d6)][_0x233678(0x1cc)]=Window_Help[_0x233678(0x1b9)]['setItem'],Window_Help[_0x233678(0x1b9)][_0x233678(0x2b2)]=function(_0x493455){const _0x23b549=_0x233678;BattleManager[_0x23b549(0x1dc)]()&&_0x493455&&_0x493455[_0x23b549(0x189)]&&_0x493455['note'][_0x23b549(0x248)](/<(?:FTB) HELP>\s*([\s\S]*)\s*<\/(?:FTB) HELP>/i)?this[_0x23b549(0x1c1)](String(RegExp['$1'])):_0x23b549(0x2bf)===_0x23b549(0x2bf)?VisuMZ[_0x23b549(0x2d6)]['Window_Help_setItem'][_0x23b549(0x27a)](this,_0x493455):_0x342b9e['BattleSystemFTB'][_0x23b549(0x1b6)][_0x23b549(0x27a)](this,_0xffa9a);},Window_Selectable[_0x233678(0x1b9)]['ftbFreeRangeSwitch']=function(){const _0x1005b5=_0x233678;return this['constructor']===Window_ActorCommand&&BattleManager['isFTB']()&&BattleManager[_0x1005b5(0x24e)];},VisuMZ[_0x233678(0x2d6)][_0x233678(0x30d)]=Window_Selectable['prototype'][_0x233678(0x1d6)],Window_Selectable[_0x233678(0x1b9)]['cursorRight']=function(_0x12b1ea){const _0x2c07f4=_0x233678;this[_0x2c07f4(0x1e7)]()&&this['maxCols']()===0x1?_0x2c07f4(0x192)!=='hqRib'?_0xa530b4[_0x2c07f4(0x2d6)][_0x2c07f4(0x199)]['call'](this):this[_0x2c07f4(0x25c)](!![]):VisuMZ[_0x2c07f4(0x2d6)][_0x2c07f4(0x30d)]['call'](this,_0x12b1ea);},VisuMZ[_0x233678(0x2d6)]['Window_Selectable_cursorLeft']=Window_Selectable[_0x233678(0x1b9)][_0x233678(0x1a6)],Window_Selectable[_0x233678(0x1b9)][_0x233678(0x1a6)]=function(_0x442959){const _0x53e09b=_0x233678;this[_0x53e09b(0x1e7)]()&&this[_0x53e09b(0x19a)]()===0x1?this['ftbSwitchActorDirection'](![]):VisuMZ[_0x53e09b(0x2d6)]['Window_Selectable_cursorLeft'][_0x53e09b(0x27a)](this,_0x442959);},VisuMZ['BattleSystemFTB']['Window_Selectable_cursorPagedown']=Window_Selectable[_0x233678(0x1b9)]['cursorPagedown'],Window_Selectable[_0x233678(0x1b9)][_0x233678(0x2ea)]=function(){const _0x4b592b=_0x233678;this[_0x4b592b(0x1e7)]()?'KfpsX'!==_0x4b592b(0x303)?this[_0x4b592b(0x26b)]():this[_0x4b592b(0x25c)](!![]):VisuMZ[_0x4b592b(0x2d6)][_0x4b592b(0x2d4)][_0x4b592b(0x27a)](this);},VisuMZ[_0x233678(0x2d6)][_0x233678(0x1eb)]=Window_Selectable['prototype'][_0x233678(0x21e)],Window_Selectable[_0x233678(0x1b9)][_0x233678(0x21e)]=function(){const _0x547a9e=_0x233678;this['ftbFreeRangeSwitch']()?this['ftbSwitchActorDirection'](![]):VisuMZ[_0x547a9e(0x2d6)][_0x547a9e(0x1eb)][_0x547a9e(0x27a)](this);},Window_ActorCommand[_0x233678(0x1b9)][_0x233678(0x25c)]=function(_0xf93271){const _0x1da782=_0x233678,_0x5f3c53=BattleManager[_0x1da782(0x260)];let _0x15d020=$gameParty[_0x1da782(0x178)]()[_0x1da782(0x245)](_0x5f3c53);const _0x591ff9=$gameParty[_0x1da782(0x178)]()[_0x1da782(0x1d5)]-0x1;let _0x832f85=$gameParty['battleMembers']()[_0x15d020];for(;;){_0x15d020+=_0xf93271?0x1:-0x1;if(_0x15d020<0x0)_0x15d020=_0x591ff9;if(_0x15d020>_0x591ff9)_0x15d020=0x0;_0x832f85=$gameParty[_0x1da782(0x178)]()[_0x15d020];if(_0x832f85&&_0x832f85[_0x1da782(0x1a0)]()&&!_0x832f85[_0x1da782(0x1e9)]())break;if(_0x832f85===_0x5f3c53)break;}this['processSwitchActors'](_0x5f3c53,_0x832f85);},Window_ActorCommand[_0x233678(0x1b9)]['processSwitchActors']=function(_0x19be11,_0x1991a7){const _0x3e9690=_0x233678;if(_0x19be11===_0x1991a7)return;if(_0x19be11[_0x3e9690(0x181)]())_0x19be11[_0x3e9690(0x181)]()[_0x3e9690(0x289)]();this[_0x3e9690(0x2c4)](),BattleManager['_subject']=_0x1991a7,BattleManager[_0x3e9690(0x260)]=_0x1991a7,BattleManager[_0x3e9690(0x2da)](),SceneManager[_0x3e9690(0x1f1)][_0x3e9690(0x263)]();},VisuMZ[_0x233678(0x2d6)][_0x233678(0x2d2)]=Window_Selectable[_0x233678(0x1b9)][_0x233678(0x26d)],Window_Selectable[_0x233678(0x1b9)][_0x233678(0x26d)]=function(){const _0x2b564d=_0x233678;BattleManager[_0x2b564d(0x1dc)]()&&BattleManager['_FTB_FREE_CHANGE']&&this[_0x2b564d(0x207)]===Window_BattleStatus?this['processTouchFTB']():VisuMZ['BattleSystemFTB'][_0x2b564d(0x2d2)][_0x2b564d(0x27a)](this);},Window_BattleStatus[_0x233678(0x1b9)][_0x233678(0x268)]=function(){const _0x27d8d4=_0x233678;if(this[_0x27d8d4(0x2a2)]()){if(TouchInput['isTriggered']()){if(_0x27d8d4(0x295)!==_0x27d8d4(0x1fc))this['onTouchSelectFTB'](!![]);else return _0x2eb2a6[_0x27d8d4(0x279)];}}},Window_BattleStatus[_0x233678(0x1b9)][_0x233678(0x18b)]=function(_0x4778f4){const _0x279b6e=_0x233678,_0x4aa622=SceneManager[_0x279b6e(0x1f1)][_0x279b6e(0x333)];if(!_0x4aa622)return;if(!_0x4aa622['active'])return;this[_0x279b6e(0x291)]=![];const _0x586af4=this['index'](),_0x1a0128=this[_0x279b6e(0x319)]();if(_0x1a0128>=0x0){const _0x452605=$gameParty['battleMembers']()[_0x586af4],_0x3d29f4=$gameParty[_0x279b6e(0x178)]()[_0x1a0128];this[_0x279b6e(0x301)](_0x3d29f4)&&(_0x1a0128===this[_0x279b6e(0x1e4)]()&&(_0x279b6e(0x23f)===_0x279b6e(0x20b)?this[_0x279b6e(0x204)]():this['_doubleTouch']=!![]),this[_0x279b6e(0x292)](_0x1a0128),_0x4aa622[_0x279b6e(0x19c)](_0x452605,_0x3d29f4));}},Window_BattleStatus[_0x233678(0x1b9)][_0x233678(0x301)]=function(_0x4fa10a){const _0x3223e5=_0x233678;if(!_0x4fa10a)return![];if(!_0x4fa10a['canMove']())return![];if(!_0x4fa10a[_0x3223e5(0x1a0)]())return![];if(_0x4fa10a['isPassingTurnFTB']())return![];return!![];};function Window_FTB_ActionCount(){const _0x3d8623=_0x233678;this[_0x3d8623(0x23a)](...arguments);}Window_FTB_ActionCount[_0x233678(0x1b9)]=Object[_0x233678(0x31b)](Window_Base['prototype']),Window_FTB_ActionCount[_0x233678(0x1b9)][_0x233678(0x207)]=Window_FTB_ActionCount,Window_FTB_ActionCount[_0x233678(0x14c)]=VisuMZ[_0x233678(0x2d6)][_0x233678(0x14c)]['ActionCountDisplay'],Window_FTB_ActionCount[_0x233678(0x1b9)][_0x233678(0x23a)]=function(){const _0x54e88e=_0x233678,_0x178f37=this['windowRect']();Window_Base[_0x54e88e(0x1b9)][_0x54e88e(0x23a)][_0x54e88e(0x27a)](this,_0x178f37),this['setBackgroundType'](0x0),this[_0x54e88e(0x2a3)](),this[_0x54e88e(0x202)]=0x0;},Window_FTB_ActionCount[_0x233678(0x1b9)][_0x233678(0x2d1)]=function(){const _0x1cd4f0=_0x233678;return new Rectangle(0x0,0x0,Graphics[_0x1cd4f0(0x2b5)],Graphics['height']);},Window_FTB_ActionCount[_0x233678(0x1b9)][_0x233678(0x2a3)]=function(){const _0x2e1e94=_0x233678;this['_unit']=null,this[_0x2e1e94(0x25e)]=0x0,this[_0x2e1e94(0x307)]=0x0;const _0x777095=Window_FTB_ActionCount[_0x2e1e94(0x14c)];this['_storedBitmaps']={'ActorPicture':_0x777095[_0x2e1e94(0x22c)]?ImageManager[_0x2e1e94(0x31d)](_0x777095[_0x2e1e94(0x22c)]):'','EnemyPicture':_0x777095['EnemyActionPicture']?ImageManager[_0x2e1e94(0x31d)](_0x777095[_0x2e1e94(0x175)]):'','EmptyPicture':_0x777095[_0x2e1e94(0x159)]?ImageManager[_0x2e1e94(0x31d)](_0x777095[_0x2e1e94(0x159)]):''};},Window_FTB_ActionCount[_0x233678(0x1b9)][_0x233678(0x32c)]=function(){const _0x303d63=_0x233678;this[_0x303d63(0x329)]=0x0;},Window_FTB_ActionCount[_0x233678(0x1b9)][_0x233678(0x15a)]=function(_0x12aab4){const _0x23420b=_0x233678;this['_unit']=_0x12aab4,this[_0x23420b(0x2f9)]();},Window_FTB_ActionCount[_0x233678(0x1b9)][_0x233678(0x2f9)]=function(){const _0x4aef61=_0x233678;Window_Base['prototype'][_0x4aef61(0x2f9)][_0x4aef61(0x27a)](this),this[_0x4aef61(0x1a1)](),this['updatePosition'](),this['updateVisibility']();},Window_FTB_ActionCount[_0x233678(0x1b9)]['checkNeedsUpdate']=function(){const _0x4b3bcb=_0x233678;if(!this[_0x4b3bcb(0x2b3)])return;(this['_currentActions']!==this['_unit']['getCurrentActionsFTB']()||this[_0x4b3bcb(0x307)]!==this[_0x4b3bcb(0x2b3)][_0x4b3bcb(0x33d)]())&&(_0x4b3bcb(0x28b)===_0x4b3bcb(0x28b)?(this['_currentActions']=this[_0x4b3bcb(0x2b3)][_0x4b3bcb(0x306)](),this['_maxActions']=this[_0x4b3bcb(0x2b3)][_0x4b3bcb(0x33d)](),this[_0x4b3bcb(0x1db)]()):this[_0x4b3bcb(0x1ce)]=_0x57c356[_0x4b3bcb(0x1bf)]);},Window_FTB_ActionCount[_0x233678(0x1b9)][_0x233678(0x20a)]=function(){const _0xde7f8f=_0x233678;this[_0xde7f8f(0x16a)]=$gameSystem[_0xde7f8f(0x273)]();},Window_FTB_ActionCount[_0x233678(0x1b9)][_0x233678(0x1db)]=function(){const _0x4348d5=_0x233678;this[_0x4348d5(0x2d3)][_0x4348d5(0x2f1)]();if(!this[_0x4348d5(0x2b3)])return;const _0x51be3f=Window_FTB_ActionCount[_0x4348d5(0x14c)];if(!_0x51be3f)return;const _0x5d49d4=this['createStartingCoordinates'](),_0x2e479b=this[_0x4348d5(0x2b6)](),_0x269665=_0x51be3f[_0x4348d5(0x156)]+_0x51be3f['ImageGapDistance'],_0x423542=_0x51be3f[_0x4348d5(0x2ba)];let _0x553496=_0x5d49d4['x'],_0x33dc58=_0x5d49d4['y'];while(_0x2e479b[_0x4348d5(0x1d5)]>_0x51be3f[_0x4348d5(0x290)]){_0x2e479b[_0x4348d5(0x168)]();}while(_0x2e479b['length']>0x0){const _0x6e0b27=_0x2e479b[_0x4348d5(0x168)]();this[_0x4348d5(0x16e)](_0x6e0b27,_0x553496,_0x33dc58,_0x2e479b['length']),_0x423542?_0x553496+=_0x269665:_0x4348d5(0x27e)!==_0x4348d5(0x27e)?(_0x28e7b8['BattleSystemFTB']['Game_Unit_onBattleStart'][_0x4348d5(0x27a)](this,_0x5558b7),_0x1918a5[_0x4348d5(0x1dc)]()&&(this[_0x4348d5(0x141)]=0x0)):_0x33dc58+=_0x269665;}},Window_FTB_ActionCount['prototype']['createStartingCoordinates']=function(){const _0x497d1e=_0x233678,_0x456eb9=Window_FTB_ActionCount[_0x497d1e(0x14c)],_0xaa990d=this[_0x497d1e(0x2b3)]===$gameParty,_0xe0260f=_0x456eb9[_0x497d1e(0x156)],_0x65a796=_0xe0260f*(_0x456eb9['MaxVisible']-0x1)+_0x456eb9[_0x497d1e(0x167)]*(_0x456eb9[_0x497d1e(0x290)]-0x2),_0x5063ae=_0x456eb9[_0x497d1e(0x2ba)],_0x1b0d73=SceneManager[_0x497d1e(0x1f1)][_0x497d1e(0x2f0)][_0x497d1e(0x283)];let _0x28f4eb=0x0,_0x124c19=0x0;const _0x5333a4=_0x456eb9['BottomPosition'];if(_0x5333a4){_0x124c19=this[_0x497d1e(0x151)]-_0x1b0d73-_0x456eb9['ScreenBufferY']-_0xe0260f,_0x28f4eb=_0xaa990d?this['innerWidth']-_0x456eb9[_0x497d1e(0x239)]-_0xe0260f:_0x456eb9[_0x497d1e(0x239)];if(_0x5063ae&&_0xaa990d){if(_0x497d1e(0x1dd)===_0x497d1e(0x2fb)){if(!_0x42c89b[_0x497d1e(0x1dc)]())return;this['_ftbCurrentUnit']=_0x30625d,_0x371ca5[_0x497d1e(0x208)](),_0x45eb06['startTurnFTB']();}else _0x28f4eb-=_0x65a796;}else!_0x5063ae&&(_0x497d1e(0x164)!==_0x497d1e(0x278)?_0x124c19-=_0x65a796:(this['x']=_0x508924[_0x497d1e(0x206)]||0x0,this['y']=_0x15d49d[_0x497d1e(0x147)]||0x0));}else{_0x124c19=_0x456eb9[_0x497d1e(0x304)],_0x28f4eb=_0xaa990d?this[_0x497d1e(0x193)]-_0x456eb9[_0x497d1e(0x239)]-_0xe0260f:_0x456eb9[_0x497d1e(0x239)];if(_0x5063ae&&_0xaa990d){if(_0x497d1e(0x1e3)===_0x497d1e(0x1e3))_0x28f4eb-=_0x65a796;else{if(this[_0x497d1e(0x306)]()<=0x0)return!![];if(!this[_0x497d1e(0x288)]()[_0x497d1e(0x24a)](_0x321c40=>_0x321c40['canMove']()))return!![];return![];}}}return _0x28f4eb+=_0xaa990d?_0x456eb9[_0x497d1e(0x26f)]:_0x456eb9[_0x497d1e(0x1cb)],_0x124c19+=_0xaa990d?_0x456eb9[_0x497d1e(0x26f)]:_0x456eb9['EnemyOffsetY'],new Point(Math[_0x497d1e(0x2c3)](_0x28f4eb),Math[_0x497d1e(0x2c3)](_0x124c19));},Window_FTB_ActionCount[_0x233678(0x1b9)]['createContentsArray']=function(){const _0x2a9bb6=_0x233678,_0xa9df66=Window_FTB_ActionCount[_0x2a9bb6(0x14c)];let _0x4a1f71=!![];if(_0xa9df66[_0x2a9bb6(0x2ba)]){if(this['_unit']===$gameParty)_0x4a1f71=!_0x4a1f71;}else _0x4a1f71=!_0xa9df66[_0x2a9bb6(0x2bd)];let _0x28cd27=this[_0x2a9bb6(0x2b3)][_0x2a9bb6(0x306)](),_0x21280e=Math['max'](0x0,this[_0x2a9bb6(0x2b3)][_0x2a9bb6(0x33d)]()-_0x28cd27);const _0x2b18c8=[];while(_0x28cd27--){const _0x45b834=_0x2a9bb6(0x1c3);_0x2b18c8['push'](_0x45b834);}while(_0x21280e--){if('yntxg'===_0x2a9bb6(0x344)){const _0x3bee09=_0x2a9bb6(0x32d);_0x4a1f71?_0x2b18c8[_0x2a9bb6(0x277)](_0x3bee09):_0x2b18c8['unshift'](_0x3bee09);}else this[_0x2a9bb6(0x1dc)]()?this[_0x2a9bb6(0x1f2)]():_0x1023d3['BattleSystemFTB'][_0x2a9bb6(0x15c)][_0x2a9bb6(0x27a)](this);}while(_0x2b18c8['length']<0xa){const _0x387a01='Nothing';_0x4a1f71?_0x2b18c8['push'](_0x387a01):_0x2b18c8[_0x2a9bb6(0x16c)](_0x387a01);}return _0x2b18c8;},Window_FTB_ActionCount['prototype'][_0x233678(0x16e)]=function(_0x5784da,_0x2ce8dd,_0x2b4c14,_0x5687c6){const _0x354219=_0x233678;if(_0x5784da===_0x354219(0x33f))return;if(_0x5784da===_0x354219(0x1c3))_0x5784da=this[_0x354219(0x2b3)]===$gameParty?_0x354219(0x1e5):_0x354219(0x1ca);const _0x5886fd=Window_FTB_ActionCount[_0x354219(0x14c)];if(_0x5886fd[_0x354219(0x150)[_0x354219(0x225)](_0x5784da)]){if(_0x354219(0x30b)!==_0x354219(0x30b)){const _0x4907ee=this[_0x354219(0x2d1)]();_0x2b7b15[_0x354219(0x1b9)][_0x354219(0x23a)][_0x354219(0x27a)](this,_0x4907ee),this[_0x354219(0x243)](0x0),this[_0x354219(0x2a3)](),this[_0x354219(0x202)]=0x0;}else{const _0x5507dc=_0x5886fd[_0x354219(0x150)['format'](_0x5784da)],_0x31796a=ImageManager[_0x354219(0x31d)](_0x5507dc);_0x31796a[_0x354219(0x246)](this[_0x354219(0x270)]['bind'](this,_0x31796a,_0x2ce8dd,_0x2b4c14,_0x5687c6));}}else{if(_0x354219(0x24d)!==_0x354219(0x24d))_0x14a68a[_0x354219(0x2d6)][_0x354219(0x2a9)]['call'](this,_0x45937f,_0x279638),this[_0x354219(0x191)]()['recalculateActionsFTB']();else{const _0x3af5c4=ImageManager[_0x354219(0x310)[_0x354219(0x225)](_0x5784da)];this[_0x354219(0x238)](_0x3af5c4,_0x2ce8dd,_0x2b4c14),this['canDrawActionsRemaining'](_0x5687c6)&&this[_0x354219(0x323)](_0x2ce8dd,_0x2b4c14);}}},Window_FTB_ActionCount['prototype'][_0x233678(0x270)]=function(_0x1862ee,_0x18e225,_0x499974,_0x2efaca){const _0x2b8646=_0x233678;if(!_0x1862ee)return;const _0x470ede=Window_FTB_ActionCount[_0x2b8646(0x14c)],_0x511827=_0x470ede[_0x2b8646(0x156)],_0x421fec=_0x511827/_0x1862ee['width'],_0x4f3f28=_0x511827/_0x1862ee[_0x2b8646(0x283)],_0x219053=Math[_0x2b8646(0x2fd)](_0x421fec,_0x4f3f28,0x1),_0x439002=_0x1862ee['height'],_0x342e90=_0x1862ee[_0x2b8646(0x283)],_0x4b3718=Math[_0x2b8646(0x2c3)](_0x439002*_0x219053),_0x533ad0=Math[_0x2b8646(0x2c3)](_0x342e90*_0x219053),_0x55ce1b=Math[_0x2b8646(0x2c3)](_0x18e225+(_0x511827-_0x4b3718)/0x2),_0x325745=Math[_0x2b8646(0x2c3)](_0x499974+(_0x511827-_0x533ad0)/0x2);this['contents']['_context'][_0x2b8646(0x334)]=_0x470ede[_0x2b8646(0x237)],this['contents'][_0x2b8646(0x267)](_0x1862ee,0x0,0x0,_0x439002,_0x342e90,_0x55ce1b,_0x325745,_0x4b3718,_0x533ad0),this[_0x2b8646(0x2d3)][_0x2b8646(0x31c)]['imageSmoothingEnabled']=!![],this[_0x2b8646(0x152)](_0x2efaca)&&this['drawActionsRemaining'](_0x18e225,_0x499974);},Window_FTB_ActionCount[_0x233678(0x1b9)][_0x233678(0x238)]=function(_0x56fe8c,_0x557c8c,_0x2dc3f4){const _0x3c1d90=_0x233678,_0x5697bc=Window_FTB_ActionCount[_0x3c1d90(0x14c)];let _0x17ee32=_0x5697bc['ImageSize'];const _0x3f5746=ImageManager[_0x3c1d90(0x337)](_0x3c1d90(0x183)),_0x290042=ImageManager['iconWidth'],_0x50514c=ImageManager['iconHeight'],_0x47fbaa=_0x56fe8c%0x10*_0x290042,_0x352205=Math[_0x3c1d90(0x341)](_0x56fe8c/0x10)*_0x50514c;this[_0x3c1d90(0x2d3)][_0x3c1d90(0x31c)][_0x3c1d90(0x334)]=_0x5697bc[_0x3c1d90(0x2ae)],this[_0x3c1d90(0x2d3)][_0x3c1d90(0x267)](_0x3f5746,_0x47fbaa,_0x352205,_0x290042,_0x50514c,_0x557c8c,_0x2dc3f4,_0x17ee32,_0x17ee32),this[_0x3c1d90(0x2d3)]['_context']['imageSmoothingEnabled']=!![];},Window_FTB_ActionCount[_0x233678(0x1b9)][_0x233678(0x31a)]=function(){const _0x451153=_0x233678,_0x3e7ce0=Window_FTB_ActionCount['Settings'];if(_0x3e7ce0[_0x451153(0x2bd)])return;if(!_0x3e7ce0[_0x451153(0x216)])return;const _0x295cba=SceneManager['_scene']['_helpWindow'];if(!_0x295cba)return;_0x295cba[_0x451153(0x16a)]?(this['x']=_0x3e7ce0['RepositionTopHelpX']||0x0,this['y']=_0x3e7ce0[_0x451153(0x147)]||0x0):(this['x']=0x0,this['y']=0x0);},Window_FTB_ActionCount[_0x233678(0x1b9)][_0x233678(0x152)]=function(_0x523380){const _0xa21dce=_0x233678,_0x24d979=Window_FTB_ActionCount[_0xa21dce(0x14c)];if(!_0x24d979[_0xa21dce(0x339)])return![];const _0x25796a=_0x24d979[_0xa21dce(0x2bd)],_0x311606=_0x24d979['DrawHorz'],_0x1a52b9=this['_unit']===$gameParty;if(_0x311606){if(_0xa21dce(0x15e)===_0xa21dce(0x1a7))_0x565bd4[_0xa21dce(0x277)](_0x2f861b);else return _0x1a52b9?_0x523380===0x0:_0x523380===_0x24d979['MaxVisible']-0x1;}else return _0x25796a?_0x523380===0x0:_0x523380===_0x24d979[_0xa21dce(0x290)]-0x1;},Window_FTB_ActionCount[_0x233678(0x1b9)]['drawActionsRemaining']=function(_0x34b68f,_0x2c7ecd){const _0xefee47=_0x233678;this['resetFontSettings']();const _0x4fee10=Window_FTB_ActionCount[_0xefee47(0x14c)],_0x24f92e=new Rectangle(_0x34b68f,_0x2c7ecd,_0x4fee10['ImageSize'],_0x4fee10[_0xefee47(0x156)]);_0x24f92e['x']+=_0x4fee10['ActionsRemainingOffsetX'],_0x24f92e['y']+=_0x4fee10['ActionsRemainingOffsetY'];const _0x5ba96a=this[_0xefee47(0x2b3)]['getCurrentActionsFTB']();this[_0xefee47(0x2d3)][_0xefee47(0x24b)]=_0x4fee10[_0xefee47(0x1f3)],this[_0xefee47(0x2d3)][_0xefee47(0x321)](_0x5ba96a,_0x24f92e['x'],_0x24f92e['y'],_0x24f92e[_0xefee47(0x2b5)],_0x24f92e[_0xefee47(0x283)],'center'),this[_0xefee47(0x2e4)]();};