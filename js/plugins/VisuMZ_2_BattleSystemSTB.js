//=============================================================================
// VisuStella MZ - Battle System - STB - Standard Turn Battle
// VisuMZ_2_BattleSystemSTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemSTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemSTB = VisuMZ.BattleSystemSTB || {};
VisuMZ.BattleSystemSTB.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.16] [BattleSystemSTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_STB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Standard Turn Battle (STB) system uses RPG Maker MZ's default non-TPB
 * battle system as a base. Action orders are determined by the battler's AGI
 * values and they go from highest to lowest. However, actions are not selected
 * at the start of the turn. Instead, as the turn progresses, actions are then
 * picked as each battler's turn comes up and is executed immediately.
 * 
 * Optional to the battle system but fine tuned to it is the Exploit System.
 * When landing an elemental weakness or critical hit against a foe, the
 * battler can gain bonuses as well as an extra turn while the foe will become
 * stunned or gain any desired state(s). When all enemies are exploited in a
 * single turn, a common event can also be played, too.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "stb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * An optional Exploit System that can be disabled if desired, but otherwise,
 *   fine tuned to make use of STB's highly compatible nature.
 * * Landing an elemental weakness or critical hit can allow the active battler
 *   to gain bonuses, ranging from states to extra actions to custom effects
 *   that can be added on through JavaScript plugin parameters.
 * * An exploited enemy can suffer from states and/or custom effects added
 *   through JavaScript plugin parameters.
 * * If all enemies are exploited, a common event can run to allow for a custom
 *   follow up action.
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
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 *
 * Action Speed
 * 
 * For skills and items, action speeds now behave differently now. Because
 * actions are now decided after a turn starts, positioning will no longer be
 * decided from the selected skill/item's action speed for the current turn.
 * 
 * Instead, the action speed used by a skill or item will determine the bonus
 * speed (or speed penalty if negative) for the following turn. Using a Guard
 * action with a +2000 Action Speed will raise the following turn's speed by
 * +2000, whereas what is originally a long charge time skill with -1000 speed
 * will decrease the following action's speed by -1000.
 * 
 * You can also customize how speed is calculated through JS Plugin Parameters
 * found in the Mechanics Settings.
 *
 * ---
 * 
 * Instant Use
 * 
 * Skills and Items can have an "Instant Use" property which allows them to be
 * used immediately without consuming a turn. This can be used for actions that
 * otherwise do not warrant a whole turn. These can be used for minor buffs,
 * debuffs, toggles, etc.
 * 
 * ---
 * 
 * Exploit System
 * 
 * This is an optional system. If you wish to turn it off, you can do so in the
 * plugin parameters.
 * 
 * There are two main ways that battlers can be exploited. One is by receiving
 * damage that strikes an elemental weakness. The other is by receiving damage
 * from a Critical Hit. Exploited battlers can receive penalty states. These
 * states can be adjusted in the plugin parameters. The default penalty state
 * is the Stunned state.
 * 
 * The battler doing the exploiting can receive bonuses instead. This is to
 * reward a power play. These bonuses can range from added states to receiving
 * an extra action and allowing the active battler to immediately attack again.
 * 
 * Each battler can only be exploited once per turn. This means if an enemy
 * would receive multiple attacks to its elemental weakness(es), the exploited
 * effect will only occur once per turn, meaning the penalty states won't stack
 * multiple times over. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * Each action can also exploit only once per use and against an unexploited
 * target. This means battlers cannot use the same elemental attacks against
 * the same foes over and over to stack up an infinite amount of turns. If the
 * player wants to gain more bonuses, the player would have to strike against
 * unexploited foes. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * When all members of a party/troop are exploited, a common event can be
 * triggered to run, allowing for potential follow up actions. How you wish to
 * make these common events is up to you.
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
 * VisuMZ_4_BreakShields
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
 * === General STB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <STB Help>
 *  description
 *  description
 * </STB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under STB.
 * - This is primarily used if the skill behaves differently in STB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to STB.
 *
 * ---
 * 
 * === STB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the STB Turn Order Display
 * 
 * ---
 *
 * <STB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <STB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <STB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <STB Instant>
 * <STB Instant Use>
 * <STB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Exploit-Related Notetags ===
 * 
 * ---
 *
 * <STB Exploited Gain State: id>
 * <STB Exploited Gain State: id, id, id>
 * 
 * <STB Exploited Gain State: name>
 * <STB Exploited Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy is exploited via elemental
 *   weaknesses or critical hits, apply the listed penalty state(s).
 * - Replace 'id' with a number representing the penalty state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple penalty states at once.
 * - Replace 'name' with the name of the penalty state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple penalty states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploited>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from being exploited via elemental
 *   weaknesses or critical hits.
 *
 * ---
 *
 * <STB Exploiter Gain State: id>
 * <STB Exploiter Gain State: id, id, id>
 * 
 * <STB Exploiter Gain State: name>
 * <STB Exploiter Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy exploits an opponent with
 *   an elemental weakness or critical hit, apply the listed bonus state(s).
 * - Replace 'id' with a number representing the bonus state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple bonus states at once.
 * - Replace 'name' with the name of the bonus state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple bonus states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploiter>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from exploiting any opponents via
 *   elemental weaknesses or critical hits.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change STB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the STB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change STB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the STB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change STB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the STB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change STB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the STB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: STB Turn Order Visibility
 * - Determine the visibility of the STB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the STB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the STB Battle System.
 *
 * ---
 *
 * Speed
 * 
 *   JS: Finalized Speed:
 *   - Code used to calculate the finalized speed at the start of each turn.
 * 
 *   JS: Next Turn Speed:
 *   - Code used to calculate speed for a following turn.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploit System Settings
 * ============================================================================
 *
 * Here, you can adjust the main settings for the Exploit System, including
 * where you can turn it on/off. The Exploited and Exploiter settings are
 * extensions of the Exploit System and are better off with their own sections.
 *
 * ---
 *
 * Settings
 * 
 *   Enable System?:
 *   - Enable the exploit system? 
 *   - If disabled, ignore all the  mechanics regarding the Exploit System.
 * 
 *   Critical Hits:
 *   - Do critical hits exploit the opponent?
 * 
 *   Elemental Weakness:
 *   - Do elemental weaknesses exploit the opponent?
 * 
 *     Minimum Rate:
 *     - What's the minimum rate needed to count as an elemental weakness?
 * 
 *   Forced Actions:
 *   - Apply exploit system to Forced Actions?
 *   - We added this function because forced actions can disrupt player
 *     strategies when used with the exploit system.
 * 
 *   Reset Each Turn:
 *   - Reset exploits at the end of each turn?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploited Effects Settings
 * ============================================================================
 *
 * These are effects for the exploited battlers (the receiving end). Change how
 * you want exploited battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a target is exploited.
 * 
 *   Full Exploit Events:
 *   vs Actors Event:
 *   vs Enemies Event:
 *   - If all actors/enemies have been fully exploited, run this common event.
 *   - Does not work with unlimited exploits.
 * 
 *   Unlimited Exploits:
 *   - Can battlers be exploited endlessly?
 * 
 *   JS: On Exploited:
 *   - Code used when the target has been exploited.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploiter Effects Settings
 * ============================================================================
 *
 * These are effects for the battlers doing the exploiting. Change how you want
 * exploiter battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a user exploits a foe.
 * 
 *   Extra Actions:
 *   - Successfully exploiting an enemy will grant the user this many
 *     extra actions.
 * 
 *   Multiple Exploits:
 *   - Can battlers exploit opponents multiple times with one action?
 * 
 *   JS: On Exploiting:
 *   - Code used when the user is exploiting a foe's weakness.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System STB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
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
 * Version 1.16: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.15: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Exploit System Settings > Forced Actions
 * **** Apply exploit system to Forced Actions?
 * **** We added this function because forced actions can disrupt player
 *      strategies when used with the exploit system.
 * 
 * Version 1.14: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.13: November 11, 2021
 * * Bug Fixes!
 * ** Critical hits for enemies with only one action per turn should now
 *    properly allow for the exploited effect to occur. Fix made by Olivia.
 * 
 * Version 1.12: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.11: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that altered the current action choice when enemies are using
 *    a skill that utilizes instants when there is only enough MP left for one
 *    of those actions. Fix made by Olivia.
 * 
 * Version 1.10: July 2, 2021
 * * Bug Fixes!
 * ** Dead battlers will no longer reappear in the turn order on subsequent
 *    turns. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** "Mechanics Settings" Plugin Parameters has been updated into
 *    "Speed Mechanics" with updated formulas that will now correlate any
 *    adjusted AGI changes made to battlers to alter the following turn
 *    properly. Update made by Olivia.
 * 
 * Version 1.09: March 26, 2021
 * * Bug Fixes!
 * ** Enemy exploit actions should now associate A.I. properly. Fix by Yanfly.
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.08: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.06: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Bug Fixes!
 * ** Starting battle from a surprise attack will no longer skip turn 1. And
 *    starting battle without any inputtable actors will no longer skip turn 1.
 *    Fix made by Yanfly.
 * 
 * Version 1.04: December 18, 2020
 * * Feature Update!
 * ** Enemies can now benefit from <STB Instant> skills. Update made by Olivia.
 * ** Action End States updating are now handled by Skills and States Core
 *    v1.07+ for proper intended usage. Change from Battle System - STB v1.02
 *    is reverted here to prevent triggering the update twice.
 * 
 * Version 1.03: December 4, 2020
 * * Bug Fixes!
 * ** Select Next Command no longer returns undefined. Fix made by Olivia.
 * 
 * Version 1.02: November 22, 2020
 * * Bug Fixes!
 * ** Action End States now update at the end of each individual action.
 *    Fix made by Yanfly.
 * 
 * Version 1.01: November 15, 2020
 * * Bug Fixes!
 * ** Now compatible with Party Command Window Disable from the Battle Core.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: November 23, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderActorIcon
 * @text Actor: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the STB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderActorFace
 * @text Actor: Change STB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the STB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderClearActorGraphic
 * @text Actor: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderEnemyIcon
 * @text Enemy: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the STB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderEnemyFace
 * @text Enemy: Change STB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the STB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: STB Turn Order Visibility
 * @desc Determine the visibility of the STB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the STB Turn Order Display.
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
 * @param BattleSystemSTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Speed:struct
 * @text Speed Mechanics
 * @type struct<Speed>
 * @desc Determines the mechanics of the STB Battle System.
 * @default {"Speed":"","InitialSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst agi = user.agi;\\n\\n// Create Base Speed\\nlet speed = agi;\\n\\n// Random Speed Check\\nif (user.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Add Saved Speed Modifiers from Previous Round\\nspeed += user.getSTBNextTurnSpeed();\\n\\n// Return Speed\\nreturn speed;\"","NextTurnSavedSpeedJS:func":"\"// Create Speed\\nconst action = this;\\nlet speed = 0;\\n\\n// Check Object\\nif (action.item()) {\\n    speed += action.item().speed;\\n}\\n\\n// Check Attack\\nif (action.isAttack()) {\\n    speed += action.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\""}
 *
 * @param Exploit:struct
 * @text Exploit System
 * @type struct<Exploit>
 * @desc Settings for the STB's Exploit System.
 * @default {"EnableExploit:eval":"true","ExploitCritical:eval":"true","ExploitEleWeakness:eval":"true","ExploitEleRate:num":"1.05","TurnResetExploits:eval":"true"}
 *
 * @param Exploited:struct
 * @text Exploited Effects
 * @parent Exploit:struct
 * @type struct<Exploited>
 * @desc Settings for targets being Exploited.
 * @default {"Mechanics":"","AddedStates:arraynum":"[\"13\"]","FullExploitEvents":"","vsActorsFullExploit:num":"0","vsEnemiesFullExploit:num":"0","UnlimitedExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst target = this;\\nconst user = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"0","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"","TextColor:str":"0","FlashColor:eval":"[255, 255, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Exploiter:struct
 * @text Exploiter Effects
 * @parent Exploit:struct
 * @type struct<Exploiter>
 * @desc Settings for users doing the Exploiting.
 * @default {"Mechanics":"","AddedStates:arraynum":"[]","ExtraActions:num":"1","MultipleExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"12","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"ONE MORE!","TextColor:str":"0","FlashColor:eval":"[255, 255, 128, 160]","FlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System STB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * Speed Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Speed:
 *
 * @param Speed
 *
 * @param InitialSpeedJS:func
 * @text JS: Finalized Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst user = this;\nconst agi = user.agi;\n\n// Create Base Speed\nlet speed = agi;\n\n// Random Speed Check\nif (user.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Add Saved Speed Modifiers from Previous Round\nspeed += user.getSTBNextTurnSpeed();\n\n// Return Speed\nreturn speed;"
 *
 * @param NextTurnSavedSpeedJS:func
 * @text JS: Next Turn Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate speed for a following turn.
 * @default "// Create Speed\nconst action = this;\nlet speed = 0;\n\n// Check Object\nif (action.item()) {\n    speed += action.item().speed;\n}\n\n// Check Attack\nif (action.isAttack()) {\n    speed += action.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Exploit System Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploit:
 *
 * @param EnableExploit:eval
 * @text Enable System?
 * @parent Exploit
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the exploit system? If disabled, ignore all the 
 * mechanics regarding the Exploit System.
 * @default true
 *
 * @param ExploitCritical:eval
 * @text Critical Hits
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do critical hits exploit the opponent?
 * @default true
 *
 * @param ExploitEleWeakness:eval
 * @text Elemental Weakness
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do elemental weaknesses exploit the opponent?
 * @default true
 *
 * @param ExploitEleRate:num
 * @text Minimum Rate
 * @parent ExploitEleWeakness:eval
 * @desc What's the minimum rate needed to count as an elemental weakness?
 * @default 1.05
 *
 * @param ForcedActions:eval
 * @text Forced Actions
 * @parent Exploit
 * @type boolean
 * @on Apply
 * @off Don't Apply
 * @desc Apply exploit system to Forced Actions?
 * @default false
 *
 * @param TurnResetExploits:eval
 * @text Reset Each Turn
 * @parent Exploit
 * @type boolean
 * @on Reset Exploits
 * @off Don't Reset
 * @desc Reset exploits at the end of each turn?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Exploited Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploited:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a target is exploited.
 * @default ["13"]
 * 
 * @param FullExploitEvents
 * @text Full Exploit Events
 * @parent Mechanics
 * 
 * @param vsActorsFullExploit:num
 * @text vs Actors Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all actors have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 * 
 * @param vsEnemiesFullExploit:num
 * @text vs Enemies Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all enemies have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 *
 * @param UnlimitedExploits:eval
 * @text Unlimited Exploits
 * @parent Mechanics
 * @type boolean
 * @on Unlimited
 * @off Once Per Turn
 * @desc Can battlers be exploited endlessly?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploited
 * @parent Mechanics
 * @type note
 * @desc Code used when the target has been exploited.
 * @default "// Declare Constants\nconst target = this;\nconst user = arguments[0];\nconst action = arguments[1];\n\n// Perform Actions\n"
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 0
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default 
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Exploiter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploiter:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a user exploits a foe.
 * @default []
 * 
 * @param ExtraActions:num
 * @text Extra Actions
 * @parent Mechanics
 * @type number
 * @desc Successfully exploiting an enemy will grant the user this many extra actions.
 * @default 1
 *
 * @param MultipleExploits:eval
 * @text Multiple Exploits
 * @parent Mechanics
 * @type boolean
 * @on Multiple
 * @off Once Per Action
 * @desc Can battlers exploit opponents multiple times with one action?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploiting
 * @parent Mechanics
 * @type note
 * @desc Code used when the user is exploiting a foe's weakness.
 * @default ""
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default ONE MORE!
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 128, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
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
 * @default 96
 * 
 * @param Slots
 *
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

const _0x15047e=_0x3b50;function _0x1ddc(){const _0x2a73a9=['ExploitCritical','performActionEnd','getSTBNextTurnSpeed','JgDMp','Mirror','makeSpeed','floor','FcbUE','getColor','updateLetter','updateBattleContainerOrder','STB','_stbNextTurnSpeed','recalculateHome','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','commandCancel','push','note','ARRAYNUM','BattleCore','PCIxw','_graphicHue','Mute','_targetHomeY','_currentActor','currentAction','updateVisibility','BattleManager_finishActorInput','EnemyBattlerIcon','ScreenBuffer','clearSTBExploit','sort','applyGlobal','Game_Action_applyGlobal','svactor','Game_Action_clear','%1BorderColor','_stbTurnOrderWindow','Game_Action_executeDamage','changeIconGraphicBitmap','icon','xnlRl','speed','_backgroundSprite','setSTBNextTurnSpeed','updateGraphic','TurnOrderSTBGraphicType','battler','pYCbz','ExploitedStates','actor','faceHeight','RegExp','GuUtR','CannotBeExploiter','isSceneBattle','selectNextActorSTB','battlerHue','removeActor','LtIdT','Enemies','ceil','startActorCommandSelection','createGraphicSprite','qzExv','ExploitEleWeakness','_windowLayer','updateTurnOrderSTB','EnemyBattlerFaceName','clearSTB','STR','maxBattleMembers','%1BgColor2','clearSTBNextTurnSpeed','_unit','LyJmQ','call','FaceIndex','_surprise','startFade','oFVyB','initHomePositions','BattleManager_processTurn','svBattlerName','_isAlive','PCfAt','RepositionLogWindow','performCollapse','_phase','round','actions','FaceName','description','Game_BattlerBase_hide','createBattlerRect','EnableExploit','_scene','KNice','EDBbf','createChildren','removeActionBattlersSTB','CdIEa','exit','_stbTurnOrderFaceIndex','JZGdU','_homeDuration','_graphicType','setBlendColor','createTestBitmap','RepositionTopHelpY','test','prototype','performActionEndSTB','_homeX','_partyCommandWindow','onBattleStart','center','TurnOrderSTBGraphicFaceName','ParseStateData','_isAppeared','changeFaceGraphicBitmap','createBattlerSprites','QgimH','loadSvEnemy','stbCannotBeExploiter','%1SystemBorder','processTurn','return\x200','SpriteLength','windowRect','createTurnOrderSTBGraphicFaceName','hqVMM','startActorInput','stbGainInstant','Game_BattlerBase_appear','filter','createBackgroundSprite','checkPosition','OrderDirection','changeEnemyGraphicBitmap','updateHomePosition','isSideView','ltlKp','Actor','getStateIdWithName','setSTBExploited','_stbTurnOrderIconIndex','allBattleMembers','loadSystem','isAppeared','tfsYe','isSTBExploited','7nxoSYC','zWczd','_graphicEnemy','NpGQH','registerCommand','repositionLogWindowSTB','Window_Help_setItem','VSwBA','CeSvu','jgoxV','UpdateFrames','Game_Party_removeActor','eurnh','_graphicSv','friendsUnit','DisplayPosition','ActorBattlerIcon','YSfjo','updateOpacity','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','applyGlobalBattleSystemSTB','StbTurnOrderActorFace','executeDamage','drawText','ezgZr','getBattleSystem','constructor','ARRAYSTRUCT','dKPPP','visible','_fadeDuration','_logWindow','_containerWidth','_actions','stbExploitedStates','enemy','TurnOrder','ConvertParams','members','trim','rgMeQ','addChild','gjicY','includes','BattleManager_selectNextActor','ActorBattlerType','#000000','hWCZV','processTurnSTB','battleEnd','FlashColor','ysprM','addState','Actors','checkOpacity','create','setBattleSystemSTBTurnOrderVisible','mainSprite','_forcing','_inputting','finishActorInput','getChildIndex','svActorHorzCells','Exploit','BrmgI','ivuMc','_stbExploited','_fullWidth','kJYaM','update','InitialSpeedJS','HVorI','min','createTurnOrderSTBGraphicType','performSTBExploiter','isSTB','calcElementRate','boxWidth','loadSvActor','_forceAction','642487HuAOpI','YMsRB','selectNextCommand','becomeSTBExploited','clearRect','stbExploiterStates','processUpdateGraphic','TurnResetExploits','requestFauxAnimation','Dpvak','_speed','parameters','_stbTurnOrderVisible','containerWindow','areAllEnemiesExploited','StbTurnOrderEnemyFace','_containerHeight','close','EnemyBattlerType','fillRect','qsFkV','isActor','createActorCommandWindow','50anqyQi','onBattleStartSTB','FcWfY','children','Game_Battler_onTurnEnd','changeSvActorGraphicBitmap','displayExploitedEffects','_positionDuration','bhUPx','GsPol','MEQLh','areAllActorsExploited','_blendColor','padding','stbCannotBeExploited','bottom','setItem','Settings','_stbTurnOrderFaceName','_graphicFaceName','match','toUpperCase','startTurn','remove','face','top','_graphicIconIndex','_homeY','Speed','EGQJo','Scene_Battle_commandCancel','FasJU','currentClass','ExtraActions','_stateIDs','Scene_Battle_createAllWindows','onTurnEnd','executeDamageSTB','setupTextPopup','PhagC','getStateTooltipBattler','addLoadListener','updatePadding','createSTBTurnOrderWindow','clearTurnOrderSTBGraphics','vsActorsFullExploit','subject','startInputSTB','critical','XYEqE','Enemy','_targetHomeX','makeSTBSpeed','izwml','BattleManager_isTurnBased','setSTBExploitedFlag','Game_Battler_makeSpeed','split','_plural','isBattleSystemSTBTurnOrderVisible','%1SystemBg','compareBattlerSprites','JrAiS','TurnOrderSTBGraphicFaceIndex','Game_Actor_selectNextCommand','1842765TaSHJB','isActiveTpb','calculateTargetPositions','blt','isTurnBased','pNYWH','endActionSTB','IconIndex','KZliL','_isBattleOver','name','TextColor','createLetterSprite','map','RepositionTopHelpX','createTurnOrderSTBGraphicIconIndex','max','result','numActions','_letter','ExploitEleRate','anchor','awcZa','uziFc','_turnOrderContainer','hasSvBattler','allowRandomSpeed','fontSize','_stbTurnOrderGraphicType','BattleManager_startInput','YquIZ','Game_BattlerBase_initMembers','Mechanics','setHue','_statusWindow','selectAllActions','fYsDr','clear','battleSys','height','udOVk','4195404yENdLH','_actionBattlers','pYNqi','RepositionTopForHelp','720906SzwFZh','_fadeTarget','reserveCommonEvent','defaultPosition','_ogWindowLayerX','Exploiter','hasSTBExploited','Game_Battler_performActionEnd','tlQEJ','BattleManager_makeActionOrders','4566152BBqDds','MaxVertSprites','fJkft','loadEnemy','updateTurnOrder','Scene_Battle_commandFight','_positionTargetX','_stbExploitAdvantageFlag','bind','getNextSubject','194236qnvqAl','updateSidePosition','boxHeight','gradientFillRect','updatePosition','bitmapHeight','WECTe','UnlimitedExploits','makeActionOrders','mainFontFace','isTpb','length','dfwMb','createActorCommandWindowSTB','BattleSystemSTB','iByjD','PopupText','_graphicFaceIndex','AnimationID','createBorderSprite','StbTurnOrderClearActorGraphic','KDuak','wBWaa','initMembersBattleSystemSTB','format','oSdzd','isSTBExploitSystemEnabled','bitmapWidth','createAllWindows','bitmap','version','width','_turnOrderInnerSprite','%1\x20%2\x20%3','_actorCommandWindow','DDJQP','211686eVbsVG','endAction','CustomJS','20MgBEBz','containerPosition','MaxHorzSprites','_subject','ForcedActions','indexOf','aliveMembers','_forcedBattlers','traitObjects','_positionTargetY','isEnemy','canInput','TurnOrderSTBGraphicIconIndex','fontFace','unshift','_letterSprite','Game_System_initialize','StbTurnOrderEnemyIcon','opacity','_graphicSprite','NRDOB','ElJdf','BattleManager_isTpb','_position','battlerName','qwpEo','FTlpc','CySSn','zLjQx','PZjeA','JSON','svActorVertCells','IETCx','EVAL','MultipleExploits','Exploited','LyGQV','addSTBNextTurnSpeed','OcJPt','appear','Visible','SpriteThin','Game_Battler_performCollapse','_ogWindowLayerY','AllowRandomSpeed','cvVqC','VDDpZ','iconHeight','_handlers','hide','CenterHorz','zbpVK','item','AddedStates','BattleManager_isActiveTpb','right','_helpWindow','EnemyBattlerDrawLetter','initialize','ARRAYEVAL','createTurnOrderSTBGraphicFaceIndex','isAlive','parse','initMembers','_fullHeight','clearNextTurnSpeedSTB','status','updateSelectionEffect','isPartyCommandWindowDisabled','oqdIc','iWgpM','startInput','tKlMu','Game_Action_speed','isHorz','updateGraphicHue','BattleManager_battleSys','initBattleSystemSTB','ShowMarkerBg','_index','bxlIf'];_0x1ddc=function(){return _0x2a73a9;};return _0x1ddc();}(function(_0x5dd26a,_0x1b6dc9){const _0x3bd280=_0x3b50,_0x40cd8a=_0x5dd26a();while(!![]){try{const _0x2549b0=parseInt(_0x3bd280(0x294))/0x1+parseInt(_0x3bd280(0x319))/0x2+-parseInt(_0x3bd280(0x2ec))/0x3+parseInt(_0x3bd280(0x32d))/0x4+-parseInt(_0x3bd280(0x2ab))/0x5*(-parseInt(_0x3bd280(0x351))/0x6)+-parseInt(_0x3bd280(0x244))/0x7*(-parseInt(_0x3bd280(0x323))/0x8)+-parseInt(_0x3bd280(0x315))/0x9*(parseInt(_0x3bd280(0x354))/0xa);if(_0x2549b0===_0x1b6dc9)break;else _0x40cd8a['push'](_0x40cd8a['shift']());}catch(_0x30501e){_0x40cd8a['push'](_0x40cd8a['shift']());}}}(_0x1ddc,0x689df));var label=_0x15047e(0x33b),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x1cce9c){const _0x3fa721=_0x15047e;return _0x1cce9c[_0x3fa721(0x19d)]&&_0x1cce9c[_0x3fa721(0x208)][_0x3fa721(0x26f)]('['+label+']');})[0x0];VisuMZ[label][_0x15047e(0x2bc)]=VisuMZ[label][_0x15047e(0x2bc)]||{},VisuMZ[_0x15047e(0x269)]=function(_0x2bc3cb,_0x5a780e){const _0x304461=_0x15047e;for(const _0xa83764 in _0x5a780e){if(_0x304461(0x1a3)===_0x304461(0x1a3)){if(_0xa83764['match'](/(.*):(.*)/i)){if(_0x304461(0x2a8)===_0x304461(0x2a8)){const _0x57913b=String(RegExp['$1']),_0x3e4e9f=String(RegExp['$2'])[_0x304461(0x2c0)]()[_0x304461(0x26b)]();let _0x123746,_0xeb07c6,_0xb524ca;switch(_0x3e4e9f){case'NUM':_0x123746=_0x5a780e[_0xa83764]!==''?Number(_0x5a780e[_0xa83764]):0x0;break;case _0x304461(0x1be):_0xeb07c6=_0x5a780e[_0xa83764]!==''?JSON[_0x304461(0x199)](_0x5a780e[_0xa83764]):[],_0x123746=_0xeb07c6[_0x304461(0x2f9)](_0x52c11b=>Number(_0x52c11b));break;case _0x304461(0x17c):_0x123746=_0x5a780e[_0xa83764]!==''?eval(_0x5a780e[_0xa83764]):null;break;case _0x304461(0x196):_0xeb07c6=_0x5a780e[_0xa83764]!==''?JSON[_0x304461(0x199)](_0x5a780e[_0xa83764]):[],_0x123746=_0xeb07c6[_0x304461(0x2f9)](_0x179a84=>eval(_0x179a84));break;case _0x304461(0x179):_0x123746=_0x5a780e[_0xa83764]!==''?JSON['parse'](_0x5a780e[_0xa83764]):'';break;case'ARRAYJSON':_0xeb07c6=_0x5a780e[_0xa83764]!==''?JSON[_0x304461(0x199)](_0x5a780e[_0xa83764]):[],_0x123746=_0xeb07c6[_0x304461(0x2f9)](_0x5c3c67=>JSON[_0x304461(0x199)](_0x5c3c67));break;case'FUNC':_0x123746=_0x5a780e[_0xa83764]!==''?new Function(JSON['parse'](_0x5a780e[_0xa83764])):new Function(_0x304461(0x22b));break;case'ARRAYFUNC':_0xeb07c6=_0x5a780e[_0xa83764]!==''?JSON['parse'](_0x5a780e[_0xa83764]):[],_0x123746=_0xeb07c6[_0x304461(0x2f9)](_0x50e027=>new Function(JSON[_0x304461(0x199)](_0x50e027)));break;case _0x304461(0x1f2):_0x123746=_0x5a780e[_0xa83764]!==''?String(_0x5a780e[_0xa83764]):'';break;case'ARRAYSTR':_0xeb07c6=_0x5a780e[_0xa83764]!==''?JSON['parse'](_0x5a780e[_0xa83764]):[],_0x123746=_0xeb07c6[_0x304461(0x2f9)](_0x44cba8=>String(_0x44cba8));break;case'STRUCT':_0xb524ca=_0x5a780e[_0xa83764]!==''?JSON[_0x304461(0x199)](_0x5a780e[_0xa83764]):{},_0x123746=VisuMZ['ConvertParams']({},_0xb524ca);break;case _0x304461(0x25f):_0xeb07c6=_0x5a780e[_0xa83764]!==''?JSON[_0x304461(0x199)](_0x5a780e[_0xa83764]):[],_0x123746=_0xeb07c6[_0x304461(0x2f9)](_0x3d1518=>VisuMZ[_0x304461(0x269)]({},JSON[_0x304461(0x199)](_0x3d1518)));break;default:continue;}_0x2bc3cb[_0x57913b]=_0x123746;}else this[_0x304461(0x32a)]=![];}}else _0x7fdc82['BattleSystemSTB'][_0x304461(0x1fe)][_0x304461(0x1f8)](this);}return _0x2bc3cb;},(_0x5216e7=>{const _0x27d293=_0x15047e,_0x57d5f9=_0x5216e7[_0x27d293(0x2f6)];for(const _0x4b5708 of dependencies){if(!Imported[_0x4b5708]){if('PZjeA'===_0x27d293(0x178)){alert(_0x27d293(0x257)[_0x27d293(0x345)](_0x57d5f9,_0x4b5708)),SceneManager[_0x27d293(0x212)]();break;}else this['x']=this['_homeX'],this['y']=this[_0x27d293(0x2c6)];}}const _0x52a133=_0x5216e7['description'];if(_0x52a133[_0x27d293(0x2bf)](/\[Version[ ](.*?)\]/i)){const _0x15f779=Number(RegExp['$1']);_0x15f779!==VisuMZ[label][_0x27d293(0x34b)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x27d293(0x345)](_0x57d5f9,_0x15f779)),SceneManager[_0x27d293(0x212)]());}if(_0x52a133[_0x27d293(0x2bf)](/\[Tier[ ](\d+)\]/i)){const _0x37bb6c=Number(RegExp['$1']);_0x37bb6c<tier?'xnlRl'!==_0x27d293(0x1d5)?(this['_graphicEnemy']=_0x51d8ce[_0x27d293(0x173)](),_0xf1a184=_0x586675[_0x27d293(0x326)](this[_0x27d293(0x246)]),_0x30193e[_0x27d293(0x2d4)](this[_0x27d293(0x237)]['bind'](this,_0x3b9f27))):(alert(_0x27d293(0x1ba)['format'](_0x57d5f9,_0x37bb6c,tier)),SceneManager[_0x27d293(0x212)]()):_0x27d293(0x1a1)!==_0x27d293(0x26e)?tier=Math[_0x27d293(0x2fc)](_0x37bb6c,tier):(this['_graphicEnemy']=_0x383601[_0x27d293(0x173)](),_0x5d9b8c=_0x57e5f8[_0x27d293(0x227)](this['_graphicEnemy']),_0x47d6a7[_0x27d293(0x2d4)](this['changeEnemyGraphicBitmap'][_0x27d293(0x32b)](this,_0x4f1239)));}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x5216e7[_0x27d293(0x29f)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x15047e(0x2f6)],'StbTurnOrderActorIcon',_0xf7c95d=>{const _0x4f65e3=_0x15047e;VisuMZ['ConvertParams'](_0xf7c95d,_0xf7c95d);const _0x4146ad=_0xf7c95d[_0x4f65e3(0x279)],_0x5d91b9=_0xf7c95d[_0x4f65e3(0x2f3)];for(const _0x194232 of _0x4146ad){const _0x5d88f5=$gameActors[_0x4f65e3(0x1de)](_0x194232);if(!_0x5d88f5)continue;_0x5d88f5[_0x4f65e3(0x308)]='icon',_0x5d88f5[_0x4f65e3(0x23e)]=_0x5d91b9;}}),PluginManager[_0x15047e(0x248)](pluginData[_0x15047e(0x2f6)],_0x15047e(0x259),_0x1ded7c=>{const _0x3ecac9=_0x15047e;VisuMZ['ConvertParams'](_0x1ded7c,_0x1ded7c);const _0x186273=_0x1ded7c[_0x3ecac9(0x279)],_0x337861=_0x1ded7c[_0x3ecac9(0x207)],_0x1f612a=_0x1ded7c[_0x3ecac9(0x1f9)];for(const _0xd86d94 of _0x186273){if(_0x3ecac9(0x2dc)==='XYEqE'){const _0x1ae4bd=$gameActors[_0x3ecac9(0x1de)](_0xd86d94);if(!_0x1ae4bd)continue;_0x1ae4bd[_0x3ecac9(0x308)]=_0x3ecac9(0x2c3),_0x1ae4bd[_0x3ecac9(0x2bd)]=_0x337861,_0x1ae4bd[_0x3ecac9(0x213)]=_0x1f612a;}else return _0x36948e(_0x35e104['$2']);}}),PluginManager[_0x15047e(0x248)](pluginData[_0x15047e(0x2f6)],_0x15047e(0x341),_0x2fe617=>{const _0x5735c6=_0x15047e;VisuMZ['ConvertParams'](_0x2fe617,_0x2fe617);const _0x1f2726=_0x2fe617[_0x5735c6(0x279)];for(const _0x68e7f6 of _0x1f2726){const _0x3ca614=$gameActors['actor'](_0x68e7f6);if(!_0x3ca614)continue;_0x3ca614['clearTurnOrderSTBGraphics']();}}),PluginManager[_0x15047e(0x248)](pluginData[_0x15047e(0x2f6)],_0x15047e(0x16c),_0x260bd3=>{const _0x33d311=_0x15047e;VisuMZ['ConvertParams'](_0x260bd3,_0x260bd3);const _0x4246f1=_0x260bd3['Enemies'],_0x49620b=_0x260bd3[_0x33d311(0x2f3)];for(const _0x264abf of _0x4246f1){const _0x41c22f=$gameTroop[_0x33d311(0x26a)]()[_0x264abf];if(!_0x41c22f)continue;_0x41c22f[_0x33d311(0x308)]=_0x33d311(0x1d4),_0x41c22f[_0x33d311(0x23e)]=_0x49620b;}}),PluginManager[_0x15047e(0x248)](pluginData[_0x15047e(0x2f6)],_0x15047e(0x2a3),_0x30b1f4=>{const _0x572835=_0x15047e;VisuMZ['ConvertParams'](_0x30b1f4,_0x30b1f4);const _0x28a5fc=_0x30b1f4[_0x572835(0x1e8)],_0x4e66a0=_0x30b1f4[_0x572835(0x207)],_0x59844b=_0x30b1f4[_0x572835(0x1f9)];for(const _0x3dd337 of _0x28a5fc){if(_0x572835(0x189)!=='VCjTN'){const _0x5ef827=$gameTroop[_0x572835(0x26a)]()[_0x3dd337];if(!_0x5ef827)continue;_0x5ef827['_stbTurnOrderGraphicType']=_0x572835(0x2c3),_0x5ef827[_0x572835(0x2bd)]=_0x4e66a0,_0x5ef827[_0x572835(0x213)]=_0x59844b;}else{const _0xf24330=this[_0x572835(0x2a9)]()?this['currentClass']()[_0x572835(0x1bd)]:this[_0x572835(0x267)]()[_0x572835(0x1bd)];if(_0xf24330[_0x572835(0x2bf)](_0x3130ab[_0x572835(0x33b)][_0x572835(0x1e0)][_0x572835(0x1dd)]))return _0xfcb776['BattleSystemSTB'][_0x572835(0x222)](_0x4bb6c7['$1']);return _0xbdc323['BattleSystemSTB'][_0x572835(0x2bc)][_0x572835(0x17e)][_0x572835(0x190)]||[];}}}),PluginManager['registerCommand'](pluginData[_0x15047e(0x2f6)],'StbTurnOrderClearEnemyGraphic',_0xbfa0a3=>{const _0x33943e=_0x15047e;VisuMZ[_0x33943e(0x269)](_0xbfa0a3,_0xbfa0a3);const _0x18878b=_0xbfa0a3[_0x33943e(0x1e8)];for(const _0x2860e5 of _0x18878b){if(_0x33943e(0x1dc)===_0x33943e(0x2e9))return _0x91703d(_0x303a5c['$2']);else{const _0x29138a=$gameTroop[_0x33943e(0x26a)]()[_0x2860e5];if(!_0x29138a)continue;_0x29138a['clearTurnOrderSTBGraphics']();}}}),PluginManager['registerCommand'](pluginData['name'],'SystemTurnOrderVisibility',_0x590f37=>{const _0x4f3cdd=_0x15047e;VisuMZ['ConvertParams'](_0x590f37,_0x590f37);const _0x13400b=_0x590f37[_0x4f3cdd(0x183)];$gameSystem[_0x4f3cdd(0x27c)](_0x13400b);}),VisuMZ[_0x15047e(0x33b)][_0x15047e(0x1e0)]={'Instant':/<STB (?:INSTANT|INSTANT CAST|Instant Use)>/i,'CannotBeExploited':/<STB CANNOT BE EXPLOITED>/i,'CannotBeExploiter':/<STB CANNOT BE EXPLOITER>/i,'ExploitedStates':/<STB EXPLOITED GAIN (?:STATE|STATES):[ ](.*)>/i,'ExploiterStates':/<STB EXPLOITER GAIN (?:STATE|STATES):[ ](.*)>/i},DataManager[_0x15047e(0x23c)]=function(_0x4df125){const _0x2e1ae9=_0x15047e;_0x4df125=_0x4df125['toUpperCase']()['trim'](),this['_stateIDs']=this[_0x2e1ae9(0x2cd)]||{};if(this[_0x2e1ae9(0x2cd)][_0x4df125])return this[_0x2e1ae9(0x2cd)][_0x4df125];for(const _0x413489 of $dataStates){if(!_0x413489)continue;this[_0x2e1ae9(0x2cd)][_0x413489[_0x2e1ae9(0x2f6)][_0x2e1ae9(0x2c0)]()[_0x2e1ae9(0x26b)]()]=_0x413489['id'];}return this[_0x2e1ae9(0x2cd)][_0x4df125]||0x0;},ImageManager['svActorHorzCells']=ImageManager[_0x15047e(0x282)]||0x9,ImageManager[_0x15047e(0x17a)]=ImageManager['svActorVertCells']||0x6,SceneManager[_0x15047e(0x1e3)]=function(){const _0x10be48=_0x15047e;return this['_scene']&&this['_scene'][_0x10be48(0x25e)]===Scene_Battle;},VisuMZ['BattleSystemSTB'][_0x15047e(0x1a7)]=BattleManager[_0x15047e(0x312)],BattleManager[_0x15047e(0x312)]=function(){const _0x56c4fb=_0x15047e;if(this[_0x56c4fb(0x28f)]())return _0x56c4fb(0x1b7);return VisuMZ[_0x56c4fb(0x33b)]['BattleManager_battleSys'][_0x56c4fb(0x1f8)](this);},BattleManager['isSTB']=function(){const _0x3b9954=_0x15047e;return $gameSystem[_0x3b9954(0x25d)]()===_0x3b9954(0x1b7);},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x171)]=BattleManager[_0x15047e(0x337)],BattleManager[_0x15047e(0x337)]=function(){const _0x2f9167=_0x15047e;if(this[_0x2f9167(0x28f)]())return![];return VisuMZ[_0x2f9167(0x33b)][_0x2f9167(0x171)]['call'](this);},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x191)]=BattleManager[_0x15047e(0x2ed)],BattleManager[_0x15047e(0x2ed)]=function(){const _0x260ffa=_0x15047e;if(this[_0x260ffa(0x28f)]())return![];return VisuMZ[_0x260ffa(0x33b)][_0x260ffa(0x191)][_0x260ffa(0x1f8)](this);},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x2e1)]=BattleManager[_0x15047e(0x2f0)],BattleManager[_0x15047e(0x2f0)]=function(){const _0x374348=_0x15047e;if(this[_0x374348(0x28f)]())return!![];return VisuMZ[_0x374348(0x33b)][_0x374348(0x2e1)][_0x374348(0x1f8)](this);},VisuMZ['BattleSystemSTB'][_0x15047e(0x309)]=BattleManager[_0x15047e(0x1a2)],BattleManager[_0x15047e(0x1a2)]=function(){const _0xd18fb5=_0x15047e;VisuMZ[_0xd18fb5(0x33b)][_0xd18fb5(0x309)][_0xd18fb5(0x1f8)](this);if(this[_0xd18fb5(0x28f)]()&&$gameParty['canInput']()&&!this[_0xd18fb5(0x1fa)])this['startInputSTB']();},BattleManager[_0x15047e(0x2da)]=function(){const _0x2eef9d=_0x15047e;this[_0x2eef9d(0x2c1)]();},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x1fe)]=BattleManager[_0x15047e(0x22a)],BattleManager[_0x15047e(0x22a)]=function(){const _0x418341=_0x15047e;this['isSTB']()?this[_0x418341(0x274)]():_0x418341(0x2b3)===_0x418341(0x18e)?_0x2db53c[_0x418341(0x33b)][_0x418341(0x1fe)][_0x418341(0x1f8)](this):VisuMZ[_0x418341(0x33b)]['BattleManager_processTurn'][_0x418341(0x1f8)](this);},BattleManager[_0x15047e(0x274)]=function(){const _0x2197be=_0x15047e,_0x5c4391=this['_subject'];if(_0x5c4391[_0x2197be(0x2a9)]()&&_0x5c4391[_0x2197be(0x166)]()){if(_0x2197be(0x247)===_0x2197be(0x174))_0x1a0e03[_0x2197be(0x33b)][_0x2197be(0x1fe)][_0x2197be(0x1f8)](this);else{const _0x13a9fc=_0x5c4391[_0x2197be(0x1c5)]();if(!_0x13a9fc)VisuMZ['BattleSystemSTB'][_0x2197be(0x1fe)][_0x2197be(0x1f8)](this);else _0x13a9fc[_0x2197be(0x293)]?VisuMZ['BattleSystemSTB'][_0x2197be(0x1fe)][_0x2197be(0x1f8)](this):(this[_0x2197be(0x1c4)]=_0x5c4391,this[_0x2197be(0x230)]());}}else VisuMZ[_0x2197be(0x33b)][_0x2197be(0x1fe)][_0x2197be(0x1f8)](this);},VisuMZ[_0x15047e(0x33b)]['BattleManager_finishActorInput']=BattleManager[_0x15047e(0x280)],BattleManager['finishActorInput']=function(){const _0x52d846=_0x15047e;this[_0x52d846(0x28f)]()?'SRYeI'!=='SRYeI'?_0x58e0a5=_0x52d846(0x267):VisuMZ[_0x52d846(0x33b)][_0x52d846(0x1fe)][_0x52d846(0x1f8)](this):VisuMZ[_0x52d846(0x33b)][_0x52d846(0x1c7)][_0x52d846(0x1f8)](this);},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x270)]=BattleManager['selectNextActor'],BattleManager['selectNextActor']=function(){const _0x2ae41b=_0x15047e;this[_0x2ae41b(0x28f)]()?this['selectNextActorSTB']():VisuMZ[_0x2ae41b(0x33b)]['BattleManager_selectNextActor'][_0x2ae41b(0x1f8)](this);},BattleManager[_0x15047e(0x1e4)]=function(){const _0x1aadda=_0x15047e;this['_currentActor']=null,this[_0x1aadda(0x27f)]=![];},VisuMZ[_0x15047e(0x33b)]['BattleManager_endAction']=BattleManager[_0x15047e(0x352)],BattleManager[_0x15047e(0x352)]=function(){const _0x5a0f91=_0x15047e;VisuMZ[_0x5a0f91(0x33b)]['BattleManager_endAction'][_0x5a0f91(0x1f8)](this),this[_0x5a0f91(0x2f2)]();},BattleManager[_0x15047e(0x2f2)]=function(){const _0x5b902f=_0x15047e;if(!this[_0x5b902f(0x28f)]())return;this[_0x5b902f(0x210)]();this[_0x5b902f(0x162)][_0x5b902f(0x338)]>0x0&&(_0x5b902f(0x303)===_0x5b902f(0x1a0)?_0xfd5483[_0x5b902f(0x2e2)](!![]):(this[_0x5b902f(0x15e)]&&(!this[_0x5b902f(0x316)][_0x5b902f(0x26f)](this[_0x5b902f(0x15e)])&&this['_actionBattlers'][_0x5b902f(0x169)](this[_0x5b902f(0x15e)])),this['_subject']=this[_0x5b902f(0x32c)]()));;},BattleManager[_0x15047e(0x347)]=function(){const _0x858611=_0x15047e;return VisuMZ[_0x858611(0x33b)][_0x858611(0x2bc)]['Exploit'][_0x858611(0x20b)];},BattleManager['areAllActorsExploited']=function(){const _0x331654=_0x15047e,_0x4723a4=$gameParty[_0x331654(0x161)]()[_0x331654(0x233)](_0x2146d4=>_0x2146d4['isAppeared']()),_0x4f08cf=_0x4723a4[_0x331654(0x233)](_0x5b7aff=>_0x5b7aff[_0x331654(0x243)]());return _0x4723a4[_0x331654(0x338)]===_0x4f08cf[_0x331654(0x338)];},BattleManager[_0x15047e(0x2a2)]=function(){const _0x509463=_0x15047e,_0x3445ba=$gameTroop[_0x509463(0x161)]()[_0x509463(0x233)](_0x702fbb=>_0x702fbb[_0x509463(0x241)]()),_0x19d2ec=_0x3445ba[_0x509463(0x233)](_0x20113b=>_0x20113b[_0x509463(0x243)]());return _0x3445ba['length']===_0x19d2ec['length'];},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x322)]=BattleManager[_0x15047e(0x335)],BattleManager[_0x15047e(0x335)]=function(){const _0x14a98c=_0x15047e;VisuMZ[_0x14a98c(0x33b)][_0x14a98c(0x322)][_0x14a98c(0x1f8)](this),this[_0x14a98c(0x28f)]()&&('sLvxC'!==_0x14a98c(0x350)?(this[_0x14a98c(0x210)](),this[_0x14a98c(0x1ef)](),this[_0x14a98c(0x19c)]()):(this[_0x14a98c(0x235)](),this[_0x14a98c(0x2b2)]=0x0,this[_0x14a98c(0x331)](),this[_0x14a98c(0x16d)]=this[_0x14a98c(0x31a)]));},BattleManager[_0x15047e(0x210)]=function(){const _0x63a98f=_0x15047e;if(!this[_0x63a98f(0x28f)]())return;this[_0x63a98f(0x316)]=this[_0x63a98f(0x316)]||[],this[_0x63a98f(0x316)]=this[_0x63a98f(0x316)][_0x63a98f(0x233)](_0x157b7e=>_0x157b7e&&_0x157b7e[_0x63a98f(0x241)]()&&_0x157b7e[_0x63a98f(0x198)]()),this[_0x63a98f(0x1ef)]();},BattleManager[_0x15047e(0x1ef)]=function(_0x361395){const _0x4a4521=_0x15047e;if(!this[_0x4a4521(0x28f)]())return;const _0x57e051=SceneManager[_0x4a4521(0x20c)][_0x4a4521(0x1d1)];if(!_0x57e051)return;_0x57e051[_0x4a4521(0x327)](_0x361395);},BattleManager[_0x15047e(0x19c)]=function(){const _0x4ab2ec=_0x15047e;for(const _0x38769a of this[_0x4ab2ec(0x23f)]()){if(!_0x38769a)continue;_0x38769a[_0x4ab2ec(0x1d8)](0x0);}},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x16b)]=Game_System[_0x15047e(0x21b)]['initialize'],Game_System[_0x15047e(0x21b)][_0x15047e(0x195)]=function(){const _0x4fb1fe=_0x15047e;VisuMZ['BattleSystemSTB'][_0x4fb1fe(0x16b)][_0x4fb1fe(0x1f8)](this),this[_0x4fb1fe(0x1a8)]();},Game_System['prototype'][_0x15047e(0x1a8)]=function(){this['_stbTurnOrderVisible']=!![];},Game_System[_0x15047e(0x21b)][_0x15047e(0x2e6)]=function(){const _0x3d8768=_0x15047e;return this[_0x3d8768(0x2a0)]===undefined&&(_0x3d8768(0x22f)!==_0x3d8768(0x22f)?(this[_0x3d8768(0x286)]===_0x100787&&this[_0x3d8768(0x344)](),this[_0x3d8768(0x286)]=_0x3e6abc):this[_0x3d8768(0x1a8)]()),this['_stbTurnOrderVisible'];},Game_System['prototype'][_0x15047e(0x27c)]=function(_0x237cfd){this['_stbTurnOrderVisible']===undefined&&this['initBattleSystemSTB'](),this['_stbTurnOrderVisible']=_0x237cfd;},VisuMZ[_0x15047e(0x33b)]['Game_Action_speed']=Game_Action[_0x15047e(0x21b)]['speed'],Game_Action['prototype'][_0x15047e(0x1d6)]=function(){const _0x42f8da=_0x15047e;if(BattleManager['isSTB']())return 0x0;else{if(_0x42f8da(0x1e7)===_0x42f8da(0x1e7))return VisuMZ['BattleSystemSTB'][_0x42f8da(0x1a4)][_0x42f8da(0x1f8)](this);else _0x2f49d5[_0x42f8da(0x33b)]['BattleManager_processTurn']['call'](this);}},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x1cd)]=Game_Action[_0x15047e(0x21b)][_0x15047e(0x1cc)],Game_Action['prototype'][_0x15047e(0x1cc)]=function(){const _0x453a30=_0x15047e;VisuMZ['BattleSystemSTB'][_0x453a30(0x1cd)]['call'](this),this[_0x453a30(0x258)]();},Game_Action['prototype'][_0x15047e(0x258)]=function(){const _0x61e290=_0x15047e;if(!SceneManager[_0x61e290(0x1e3)]())return;if(!BattleManager['isSTB']())return;const _0x11ba1e=this[_0x61e290(0x18f)](),_0x245abd=VisuMZ[_0x61e290(0x33b)]['RegExp'],_0x410056=VisuMZ['BattleSystemSTB'][_0x61e290(0x2bc)][_0x61e290(0x2c7)];_0x11ba1e&&_0x11ba1e[_0x61e290(0x1bd)][_0x61e290(0x2bf)](_0x245abd['Instant'])&&(_0x61e290(0x1ec)===_0x61e290(0x1ec)?this[_0x61e290(0x2d9)]()[_0x61e290(0x231)](0x1):(_0x28df8f[_0x61e290(0x33b)][_0x61e290(0x2af)][_0x61e290(0x1f8)](this),_0x39b263[_0x61e290(0x28f)]()&&_0x55827b[_0x61e290(0x33b)][_0x61e290(0x2bc)][_0x61e290(0x283)]['TurnResetExploits']&&this['clearSTBExploit']()));const _0x90aab8=_0x410056['NextTurnSavedSpeedJS']['call'](this);this[_0x61e290(0x2d9)]()[_0x61e290(0x180)](_0x90aab8);},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x1cf)]=Game_Action[_0x15047e(0x21b)]['clear'],Game_Action[_0x15047e(0x21b)][_0x15047e(0x311)]=function(){const _0x4c79e4=_0x15047e;VisuMZ['BattleSystemSTB'][_0x4c79e4(0x1cf)][_0x4c79e4(0x1f8)](this),this['clearSTB']();},Game_Action[_0x15047e(0x21b)]['clearSTB']=function(){const _0x5a57b6=_0x15047e;this[_0x5a57b6(0x32a)]=![];},Game_Action['prototype']['hasSTBExploited']=function(){const _0x42a089=_0x15047e;return this[_0x42a089(0x32a)]===undefined&&this[_0x42a089(0x1f1)](),this[_0x42a089(0x32a)];},Game_Action['prototype'][_0x15047e(0x2e2)]=function(_0x14b663){const _0x45fc3f=_0x15047e;this[_0x45fc3f(0x32a)]===undefined&&this[_0x45fc3f(0x1f1)](),this[_0x45fc3f(0x32a)]=_0x14b663;},VisuMZ['BattleSystemSTB'][_0x15047e(0x1d2)]=Game_Action['prototype'][_0x15047e(0x25a)],Game_Action[_0x15047e(0x21b)][_0x15047e(0x25a)]=function(_0x1cdc67,_0x59a354){const _0x32094b=_0x15047e;VisuMZ[_0x32094b(0x33b)][_0x32094b(0x1d2)][_0x32094b(0x1f8)](this,_0x1cdc67,_0x59a354),this[_0x32094b(0x2d0)](_0x1cdc67);},Game_Action['prototype']['executeDamageSTB']=function(_0x5b5d21){const _0x57eabf=_0x15047e;if(!SceneManager[_0x57eabf(0x1e3)]())return;if(!BattleManager[_0x57eabf(0x28f)]())return;if(!BattleManager[_0x57eabf(0x347)]())return;if(_0x5b5d21[_0x57eabf(0x252)]()===this['subject']()[_0x57eabf(0x252)]())return;const _0x5d46b7=VisuMZ[_0x57eabf(0x33b)]['Settings']['Exploit'],_0xced91a=_0x5b5d21['result']();if(!_0x5d46b7[_0x57eabf(0x15f)]&&this[_0x57eabf(0x27e)])return;_0x5d46b7[_0x57eabf(0x1ac)]&&_0xced91a['critical']&&(_0x57eabf(0x30a)===_0x57eabf(0x314)?this[_0x57eabf(0x344)]():(this['subject']()[_0x57eabf(0x28e)](_0x5b5d21,this),_0x5b5d21[_0x57eabf(0x297)](this[_0x57eabf(0x2d9)](),this)));if(_0x5d46b7[_0x57eabf(0x1ed)]){if(_0x57eabf(0x214)!==_0x57eabf(0x214))return _0x4a01bf[_0x57eabf(0x1bf)][_0x57eabf(0x2bc)]['Mechanics'][_0x57eabf(0x187)];else{const _0x5e309b=this[_0x57eabf(0x290)](_0x5b5d21);_0x5e309b>=_0x5d46b7[_0x57eabf(0x300)]&&(this[_0x57eabf(0x2d9)]()['performSTBExploiter'](_0x5b5d21,this),_0x5b5d21[_0x57eabf(0x297)](this[_0x57eabf(0x2d9)](),this));}}},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x30b)]=Game_BattlerBase[_0x15047e(0x21b)][_0x15047e(0x19a)],Game_BattlerBase['prototype'][_0x15047e(0x19a)]=function(){const _0x226777=_0x15047e;VisuMZ[_0x226777(0x33b)][_0x226777(0x30b)][_0x226777(0x1f8)](this),this[_0x226777(0x344)]();},Game_BattlerBase[_0x15047e(0x21b)][_0x15047e(0x344)]=function(){const _0xca15df=_0x15047e;this['clearSTBNextTurnSpeed'](),this[_0xca15df(0x1ca)]();},Game_BattlerBase[_0x15047e(0x21b)][_0x15047e(0x1f5)]=function(){const _0x192805=_0x15047e;this[_0x192805(0x1b8)]=0x0;},Game_BattlerBase[_0x15047e(0x21b)][_0x15047e(0x1ae)]=function(){const _0x55b000=_0x15047e;return this['_stbNextTurnSpeed']===undefined&&this[_0x55b000(0x344)](),this[_0x55b000(0x1b8)];},Game_BattlerBase[_0x15047e(0x21b)][_0x15047e(0x1d8)]=function(_0x49b82b){const _0x17cb1f=_0x15047e;if(this['_stbNextTurnSpeed']===undefined){if('KYqEn'!==_0x17cb1f(0x284))this['initMembersBattleSystemSTB']();else{const _0x53dfae=_0x5841e5['split'](','),_0x3bb961=[];for(let _0x196532 of _0x53dfae){_0x196532=(_0x5d6340(_0x196532)||'')[_0x17cb1f(0x26b)]();const _0x31aab0=/^\d+$/[_0x17cb1f(0x21a)](_0x196532);_0x31aab0?_0x3bb961[_0x17cb1f(0x1bc)](_0x5548a5(_0x196532)):_0x3bb961[_0x17cb1f(0x1bc)](_0x237706[_0x17cb1f(0x23c)](_0x196532));}return _0x3bb961;}}this[_0x17cb1f(0x1b8)]=_0x49b82b;},Game_BattlerBase[_0x15047e(0x21b)][_0x15047e(0x180)]=function(_0x392c95){const _0x38487f=_0x15047e;this['_stbNextTurnSpeed']===undefined&&this[_0x38487f(0x344)](),_0x392c95+=this['getSTBNextTurnSpeed'](),this[_0x38487f(0x1d8)](_0x392c95);},Game_BattlerBase[_0x15047e(0x21b)]['clearSTBExploit']=function(){const _0x5035b6=_0x15047e;this[_0x5035b6(0x286)]=![];},Game_BattlerBase['prototype'][_0x15047e(0x243)]=function(){const _0x166528=_0x15047e;return this[_0x166528(0x286)]===undefined&&this['initMembersBattleSystemSTB'](),this[_0x166528(0x286)];},Game_BattlerBase[_0x15047e(0x21b)]['setSTBExploited']=function(_0x3f6d16){const _0x4b674b=_0x15047e;this[_0x4b674b(0x286)]===undefined&&this['initMembersBattleSystemSTB'](),this[_0x4b674b(0x286)]=_0x3f6d16;},Game_BattlerBase['prototype'][_0x15047e(0x2b9)]=function(){const _0x5ba008=_0x15047e,_0x39bc6f=VisuMZ[_0x5ba008(0x33b)][_0x5ba008(0x1e0)]['CannotBeExploited'];return this['traitObjects']()['some'](_0x317bd7=>_0x317bd7['note'][_0x5ba008(0x2bf)](_0x39bc6f));},Game_BattlerBase[_0x15047e(0x21b)][_0x15047e(0x228)]=function(){const _0x2bcbe6=_0x15047e,_0x114855=VisuMZ[_0x2bcbe6(0x33b)][_0x2bcbe6(0x1e0)][_0x2bcbe6(0x1e2)];return this[_0x2bcbe6(0x163)]()['some'](_0xba67b3=>_0xba67b3['note']['match'](_0x114855));},Game_BattlerBase[_0x15047e(0x21b)][_0x15047e(0x2d7)]=function(){const _0x27f4ad=_0x15047e;delete this[_0x27f4ad(0x308)],delete this['_stbTurnOrderFaceName'],delete this[_0x27f4ad(0x213)],delete this[_0x27f4ad(0x23e)];},Game_BattlerBase['prototype']['TurnOrderSTBGraphicType']=function(){const _0x18d16f=_0x15047e;return this[_0x18d16f(0x308)]===undefined&&(_0x18d16f(0x176)==='CySSn'?this[_0x18d16f(0x308)]=this[_0x18d16f(0x28d)]():this[_0x18d16f(0x23e)]=_0x159612),this['_stbTurnOrderGraphicType'];},Game_BattlerBase[_0x15047e(0x21b)][_0x15047e(0x28d)]=function(){const _0x1b5860=_0x15047e;return Window_STB_TurnOrder[_0x1b5860(0x2bc)][_0x1b5860(0x2a6)];},Game_BattlerBase[_0x15047e(0x21b)]['TurnOrderSTBGraphicFaceName']=function(){const _0xcffb4c=_0x15047e;return this[_0xcffb4c(0x2bd)]===undefined&&(this['_stbTurnOrderFaceName']=this['createTurnOrderSTBGraphicFaceName']()),this[_0xcffb4c(0x2bd)];},Game_BattlerBase[_0x15047e(0x21b)][_0x15047e(0x22e)]=function(){const _0x39f669=_0x15047e;return Window_STB_TurnOrder['Settings'][_0x39f669(0x1f0)];},Game_BattlerBase[_0x15047e(0x21b)][_0x15047e(0x2ea)]=function(){const _0x575f56=_0x15047e;return this['_stbTurnOrderFaceIndex']===undefined&&(_0x575f56(0x2c8)===_0x575f56(0x2b5)?(this['initMembers'](_0x5b4154,_0x577d55),_0x2fac81[_0x575f56(0x21b)]['initialize']['call'](this),this[_0x575f56(0x16d)]=0x0,this[_0x575f56(0x20f)](),this['checkOpacity']()):this[_0x575f56(0x213)]=this[_0x575f56(0x197)]()),this[_0x575f56(0x213)];},Game_BattlerBase[_0x15047e(0x21b)][_0x15047e(0x197)]=function(){const _0x186c85=_0x15047e;return Window_STB_TurnOrder[_0x186c85(0x2bc)]['EnemyBattlerFaceIndex'];},Game_BattlerBase[_0x15047e(0x21b)]['TurnOrderSTBGraphicIconIndex']=function(){const _0x11044b=_0x15047e;if(this[_0x11044b(0x23e)]===undefined){if(_0x11044b(0x188)===_0x11044b(0x188))this[_0x11044b(0x23e)]=this['createTurnOrderSTBGraphicIconIndex']();else{const _0x3c0d20=_0x1740b8[_0x11044b(0x1c5)]();if(!_0x3c0d20)_0x49c032[_0x11044b(0x33b)][_0x11044b(0x1fe)][_0x11044b(0x1f8)](this);else _0x3c0d20[_0x11044b(0x293)]?_0x52b7b3[_0x11044b(0x33b)]['BattleManager_processTurn'][_0x11044b(0x1f8)](this):(this[_0x11044b(0x1c4)]=_0x53e853,this[_0x11044b(0x230)]());}}return this['_stbTurnOrderIconIndex'];},Game_BattlerBase[_0x15047e(0x21b)]['createTurnOrderSTBGraphicIconIndex']=function(){return Window_STB_TurnOrder['Settings']['EnemyBattlerIcon'];},Game_BattlerBase['prototype']['setSTBGraphicIconIndex']=function(_0x38fbc6){const _0x2b1278=_0x15047e;this[_0x2b1278(0x23e)]=_0x38fbc6;},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x209)]=Game_BattlerBase['prototype'][_0x15047e(0x18c)],Game_BattlerBase[_0x15047e(0x21b)]['hide']=function(){const _0x1e8b4f=_0x15047e;VisuMZ[_0x1e8b4f(0x33b)][_0x1e8b4f(0x209)]['call'](this),BattleManager['removeActionBattlersSTB']();},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x232)]=Game_BattlerBase[_0x15047e(0x21b)][_0x15047e(0x182)],Game_BattlerBase[_0x15047e(0x21b)]['appear']=function(){const _0x24ce6e=_0x15047e;VisuMZ[_0x24ce6e(0x33b)][_0x24ce6e(0x232)][_0x24ce6e(0x1f8)](this),BattleManager[_0x24ce6e(0x210)]();},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x185)]=Game_Battler[_0x15047e(0x21b)][_0x15047e(0x203)],Game_Battler[_0x15047e(0x21b)][_0x15047e(0x203)]=function(){const _0x191dff=_0x15047e;VisuMZ[_0x191dff(0x33b)]['Game_Battler_performCollapse'][_0x191dff(0x1f8)](this),BattleManager['removeActionBattlersSTB']();},VisuMZ[_0x15047e(0x33b)]['Game_Battler_onBattleStart']=Game_Battler[_0x15047e(0x21b)]['onBattleStart'],Game_Battler[_0x15047e(0x21b)][_0x15047e(0x21f)]=function(_0x3d74db){const _0x2df3f5=_0x15047e;VisuMZ[_0x2df3f5(0x33b)]['Game_Battler_onBattleStart']['call'](this,_0x3d74db),this[_0x2df3f5(0x2ac)](_0x3d74db);},Game_Battler[_0x15047e(0x21b)]['onBattleStartSTB']=function(_0x222d3c){const _0xa4a9ee=_0x15047e;if(!BattleManager['isSTB']())return;this[_0xa4a9ee(0x1ca)]();const _0x3cda0d=new Game_Action(this);this[_0xa4a9ee(0x1d8)](0x0);},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x2af)]=Game_Battler[_0x15047e(0x21b)][_0x15047e(0x2cf)],Game_Battler['prototype'][_0x15047e(0x2cf)]=function(){const _0x35c34d=_0x15047e;VisuMZ[_0x35c34d(0x33b)][_0x35c34d(0x2af)][_0x35c34d(0x1f8)](this),BattleManager['isSTB']()&&VisuMZ[_0x35c34d(0x33b)][_0x35c34d(0x2bc)][_0x35c34d(0x283)][_0x35c34d(0x29b)]&&this[_0x35c34d(0x1ca)]();},VisuMZ['BattleSystemSTB'][_0x15047e(0x320)]=Game_Battler[_0x15047e(0x21b)]['performActionEnd'],Game_Battler['prototype'][_0x15047e(0x1ad)]=function(){const _0x3cce53=_0x15047e;VisuMZ['BattleSystemSTB']['Game_Battler_performActionEnd']['call'](this),BattleManager[_0x3cce53(0x28f)]()&&('IETCx'!==_0x3cce53(0x17b)?_0x3b94d3[_0x3cce53(0x28f)]()?this[_0x3cce53(0x1ea)]():_0x344cea[_0x3cce53(0x33b)][_0x3cce53(0x328)][_0x3cce53(0x1f8)](this):this[_0x3cce53(0x21c)]());},Game_Battler[_0x15047e(0x21b)][_0x15047e(0x21c)]=function(){const _0x2ad7be=_0x15047e;if(this[_0x2ad7be(0x2fe)]()>0x0&&this===BattleManager[_0x2ad7be(0x15e)]){const _0x2bbe56=BattleManager['_forcedBattlers'];if(_0x2bbe56[_0x2ad7be(0x338)]>0x0&&_0x2bbe56[0x0]!==this)return;const _0x115a0d=this[_0x2ad7be(0x1db)]();if(_0x115a0d)_0x115a0d['stepForward']();}},Game_Battler[_0x15047e(0x21b)][_0x15047e(0x306)]=function(){const _0x2cfed5=_0x15047e;return VisuMZ[_0x2cfed5(0x1bf)][_0x2cfed5(0x2bc)][_0x2cfed5(0x30c)][_0x2cfed5(0x187)];},VisuMZ[_0x15047e(0x33b)]['Game_Battler_makeSpeed']=Game_Battler['prototype'][_0x15047e(0x1b1)],Game_Battler[_0x15047e(0x21b)][_0x15047e(0x1b1)]=function(){const _0x27e502=_0x15047e;BattleManager[_0x27e502(0x28f)]()?_0x27e502(0x33c)!==_0x27e502(0x33c)?_0x4b6282[_0x27e502(0x33b)][_0x27e502(0x2e3)][_0x27e502(0x1f8)](this):this[_0x27e502(0x2df)]():VisuMZ[_0x27e502(0x33b)][_0x27e502(0x2e3)][_0x27e502(0x1f8)](this);},Game_Battler[_0x15047e(0x21b)][_0x15047e(0x2df)]=function(){const _0x2f0ba0=_0x15047e;this[_0x2f0ba0(0x29e)]=VisuMZ[_0x2f0ba0(0x33b)][_0x2f0ba0(0x2bc)]['Speed'][_0x2f0ba0(0x28a)][_0x2f0ba0(0x1f8)](this);},Game_Battler[_0x15047e(0x21b)]['stbExploitedStates']=function(){const _0x1897a5=_0x15047e,_0x3b6426=this[_0x1897a5(0x2a9)]()?this[_0x1897a5(0x2cb)]()[_0x1897a5(0x1bd)]:this[_0x1897a5(0x267)]()[_0x1897a5(0x1bd)];if(_0x3b6426['match'](VisuMZ['BattleSystemSTB'][_0x1897a5(0x1e0)][_0x1897a5(0x1dd)])){if(_0x1897a5(0x325)!==_0x1897a5(0x343))return VisuMZ[_0x1897a5(0x33b)][_0x1897a5(0x222)](RegExp['$1']);else{const _0x20a344=_0x78ebc9['Settings'],_0x1fd450=[_0x1897a5(0x2c4),_0x1897a5(0x2ba)][_0x1897a5(0x26f)](_0x20a344['DisplayPosition']);return _0x1fd450;}}return VisuMZ[_0x1897a5(0x33b)]['Settings'][_0x1897a5(0x17e)][_0x1897a5(0x190)]||[];},Game_Battler[_0x15047e(0x21b)]['stbExploiterStates']=function(){const _0x4ab499=_0x15047e,_0x43ba6c=this['isActor']()?this[_0x4ab499(0x2cb)]()[_0x4ab499(0x1bd)]:this[_0x4ab499(0x267)]()[_0x4ab499(0x1bd)];if(_0x43ba6c[_0x4ab499(0x2bf)](VisuMZ[_0x4ab499(0x33b)][_0x4ab499(0x1e0)]['ExploiterStates']))return _0x4ab499(0x29d)!==_0x4ab499(0x25c)?VisuMZ[_0x4ab499(0x33b)][_0x4ab499(0x222)](RegExp['$1']):_0x388f30[_0x4ab499(0x2bc)]['EnemyBattlerFaceName'];return VisuMZ[_0x4ab499(0x33b)][_0x4ab499(0x2bc)][_0x4ab499(0x31e)]['AddedStates']||[];},VisuMZ['BattleSystemSTB'][_0x15047e(0x222)]=function(_0x3dd741){const _0x361dbd=_0x15047e,_0x15523d=_0x3dd741[_0x361dbd(0x2e4)](','),_0xebd02a=[];for(let _0x11b3b1 of _0x15523d){if(_0x361dbd(0x342)===_0x361dbd(0x2ca)){if(!this[_0x361dbd(0x34d)])return;const _0x42855b=this['_turnOrderInnerSprite'][_0x361dbd(0x2ae)];if(!_0x42855b)return;_0x42855b['sort'](this['compareBattlerSprites'][_0x361dbd(0x32b)](this));}else{_0x11b3b1=(String(_0x11b3b1)||'')[_0x361dbd(0x26b)]();const _0x3c18cf=/^\d+$/[_0x361dbd(0x21a)](_0x11b3b1);_0x3c18cf?_0xebd02a[_0x361dbd(0x1bc)](Number(_0x11b3b1)):_0xebd02a[_0x361dbd(0x1bc)](DataManager[_0x361dbd(0x23c)](_0x11b3b1));}}return _0xebd02a;},Game_Battler[_0x15047e(0x21b)][_0x15047e(0x297)]=function(_0x378144,_0x2c2cbb){const _0x17743a=_0x15047e;if(!BattleManager['isSTB']())return;if(!BattleManager['isSTBExploitSystemEnabled']())return;if(this['isSTBExploited']())return;const _0x415e79=VisuMZ['BattleSystemSTB'][_0x17743a(0x2bc)]['Exploited'];!_0x415e79[_0x17743a(0x334)]&&this[_0x17743a(0x23d)](!![]);if(this[_0x17743a(0x2b9)]())return;if(this['hp']<=0x0)return;this[_0x17743a(0x2b1)](_0x415e79);if(this['hp']>0x0||!this['isImmortal']())for(const _0x26acfa of this[_0x17743a(0x266)]()){if(!$dataStates[_0x26acfa])continue;this[_0x17743a(0x278)](_0x26acfa);}_0x415e79[_0x17743a(0x353)]&&_0x415e79['CustomJS'][_0x17743a(0x1f8)](this,_0x378144,_0x2c2cbb);if(this[_0x17743a(0x2a9)]()&&BattleManager[_0x17743a(0x2b6)]()){const _0x407ea9=_0x415e79[_0x17743a(0x2d8)];_0x407ea9>0x0&&$dataCommonEvents[_0x407ea9]&&('ZnvHw'!=='ZnvHw'?(_0xd3c306[_0x17743a(0x33b)][_0x17743a(0x322)][_0x17743a(0x1f8)](this),this['isSTB']()&&(this[_0x17743a(0x210)](),this[_0x17743a(0x1ef)](),this[_0x17743a(0x19c)]())):$gameTemp['reserveCommonEvent'](_0x407ea9));}else{if(this[_0x17743a(0x165)]()&&BattleManager[_0x17743a(0x2a2)]()){const _0xc4e501=_0x415e79['vsEnemiesFullExploit'];_0xc4e501>0x0&&$dataCommonEvents[_0xc4e501]&&$gameTemp[_0x17743a(0x31b)](_0xc4e501);}}},Game_Battler[_0x15047e(0x21b)][_0x15047e(0x28e)]=function(_0x3396be,_0x1c5d48){const _0xf3987f=_0x15047e;if(!BattleManager[_0xf3987f(0x28f)]())return;if(!BattleManager[_0xf3987f(0x347)]())return;if(_0x1c5d48[_0xf3987f(0x31f)]())return;if(_0x3396be['isSTBExploited']())return;const _0x539da2=VisuMZ[_0xf3987f(0x33b)][_0xf3987f(0x2bc)][_0xf3987f(0x31e)];!_0x539da2[_0xf3987f(0x17d)]&&(_0xf3987f(0x1fc)!==_0xf3987f(0x1fc)?_0x1a131b[_0xf3987f(0x34a)]=_0xf9817c[_0xf3987f(0x240)](_0x852041[_0x4d9da2]):_0x1c5d48[_0xf3987f(0x2e2)](!![]));if(this[_0xf3987f(0x228)]())return;this['displayExploitedEffects'](_0x539da2);_0x539da2['ExtraActions']>0x0&&this['stbGainInstant'](_0x539da2[_0xf3987f(0x2cc)]);for(const _0x3ea1df of this[_0xf3987f(0x299)]()){if(_0xf3987f(0x1b3)==='nRjtm')_0xfc99b6['BattleSystemSTB'][_0xf3987f(0x270)][_0xf3987f(0x1f8)](this);else{if(!$dataStates[_0x3ea1df])continue;this['addState'](_0x3ea1df);}}if(_0x539da2[_0xf3987f(0x353)]){if(_0xf3987f(0x201)!=='PCfAt')return this[_0xf3987f(0x1f6)]?this[_0xf3987f(0x1f6)][_0xf3987f(0x26a)]()[this['_index']]:null;else _0x539da2['CustomJS'][_0xf3987f(0x1f8)](this,_0x3396be,_0x1c5d48);}},Game_Battler[_0x15047e(0x21b)][_0x15047e(0x2b1)]=function(_0x4604af){const _0x573a80=_0x15047e;if(!_0x4604af)return;if(_0x4604af[_0x573a80(0x33f)]){if('PwufO'!==_0x573a80(0x273)){const _0x317ece=_0x4604af[_0x573a80(0x33f)],_0x39bb30=_0x4604af[_0x573a80(0x1b0)],_0x36530e=_0x4604af[_0x573a80(0x1c2)];$gameTemp[_0x573a80(0x29c)]([this],_0x317ece,_0x39bb30,_0x36530e);}else _0x333563[_0x573a80(0x33b)]['Game_Party_removeActor'][_0x573a80(0x1f8)](this,_0x43b0bd),_0x2b18f8['isSceneBattle']()&&_0x523e9c['isSTB']()&&_0xb4b615['_actionBattlers'][_0x573a80(0x2c2)](_0x131499[_0x573a80(0x1de)](_0x2bdc9a));}if(this[_0x573a80(0x1db)]()&&_0x4604af[_0x573a80(0x33d)]['length']>0x0){const _0x38b1c7=_0x4604af[_0x573a80(0x33d)],_0x1802b4={'textColor':ColorManager[_0x573a80(0x1b4)](_0x4604af[_0x573a80(0x2f7)]),'flashColor':_0x4604af[_0x573a80(0x276)],'flashDuration':_0x4604af['FlashDuration']};this[_0x573a80(0x2d1)](_0x38b1c7,_0x1802b4);}},Game_Battler['prototype']['stbGainInstant']=function(_0x213252){const _0x573a0c=_0x15047e;this[_0x573a0c(0x265)]=this['_actions']||[];const _0x3d1619=this[_0x573a0c(0x265)]['length']<=0x0;if(this['canMove']()){for(let _0x57eb02=0x0;_0x57eb02<_0x213252;_0x57eb02++){this[_0x573a0c(0x265)][_0x573a0c(0x1bc)](new Game_Action(this));}if(this['isEnemy']()){if(_0x573a0c(0x302)!=='awcZa'){const _0x1a58b3=_0x434403[_0x573a0c(0x2bc)];if(!_0x1a58b3[_0x573a0c(0x194)])return;if(this[_0x573a0c(0x1f6)]===_0x5e44b9)return;const _0x45e425=this['bitmapWidth'](),_0x128214=this['bitmapHeight'](),_0x170d55=new _0x2d8117();_0x170d55['anchor']['x']=this[_0x573a0c(0x301)]['x'],_0x170d55[_0x573a0c(0x301)]['y']=this[_0x573a0c(0x301)]['y'],_0x170d55[_0x573a0c(0x34a)]=new _0x5256fc(_0x45e425,_0x128214),this[_0x573a0c(0x16a)]=_0x170d55,this['addChild'](this[_0x573a0c(0x16a)]);}else{const _0xb85afc=this['enemy']()[_0x573a0c(0x206)][_0x573a0c(0x233)](_0x305f6e=>this['isActionValid'](_0x305f6e));if(_0xb85afc[_0x573a0c(0x338)]>0x0){if(_0x573a0c(0x24d)!=='jgoxV')this[_0x573a0c(0x164)]=_0x39f6cd?0x0:_0x59f46c[_0x573a0c(0x313)]-this[_0x573a0c(0x164)]-_0x34bad9[_0x573a0c(0x184)];else{let _0x244112;!_0x3d1619&&(_0x244112=this[_0x573a0c(0x265)]['shift']()),this[_0x573a0c(0x30f)](_0xb85afc),!_0x3d1619&&this[_0x573a0c(0x265)][_0x573a0c(0x169)](_0x244112);}}}}}},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x2eb)]=Game_Actor['prototype'][_0x15047e(0x296)],Game_Actor[_0x15047e(0x21b)][_0x15047e(0x296)]=function(){const _0x38e9fb=_0x15047e;if(BattleManager[_0x38e9fb(0x28f)]()){if(_0x38e9fb(0x295)===_0x38e9fb(0x20d))_0x2c03d2=!![];else{if(this[_0x38e9fb(0x1db)]())this[_0x38e9fb(0x1db)]()['stepForward']();return![];}}return VisuMZ[_0x38e9fb(0x33b)][_0x38e9fb(0x2eb)]['call'](this);},Game_Actor[_0x15047e(0x21b)][_0x15047e(0x28d)]=function(){const _0x53650b=_0x15047e,_0x3cb8d9=this['actor']()[_0x53650b(0x1bd)];if(_0x3cb8d9['match'](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x53650b(0x28b)===_0x53650b(0x2f1))this['x']=this[_0x53650b(0x21d)]+(_0xc9d9c3[_0x53650b(0x2fa)]||0x0),this['y']=this[_0x53650b(0x2c6)]+(_0x556b31[_0x53650b(0x219)]||0x0);else return _0x53650b(0x2c3);}else{if(_0x3cb8d9[_0x53650b(0x2bf)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_STB_TurnOrder['Settings'][_0x53650b(0x271)];},Game_Actor[_0x15047e(0x21b)][_0x15047e(0x221)]=function(){const _0x40a3e2=_0x15047e,_0x265983=this['actor']()[_0x40a3e2(0x1bd)];if(_0x265983[_0x40a3e2(0x2bf)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if('YSfjo'===_0x40a3e2(0x255))return String(RegExp['$1']);else this[_0x40a3e2(0x216)]='enemy';}return this['faceName']();},Game_Actor[_0x15047e(0x21b)][_0x15047e(0x2ea)]=function(){const _0x10550d=_0x15047e,_0x3d4c0c=this[_0x10550d(0x1de)]()[_0x10550d(0x1bd)];if(_0x3d4c0c['match'](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor['prototype'][_0x15047e(0x2fb)]=function(){const _0x4d53f1=_0x15047e,_0x56537a=this[_0x4d53f1(0x1de)]()[_0x4d53f1(0x1bd)];if(_0x56537a['match'](/<STB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x4d53f1(0x1c0)===_0x4d53f1(0x1ab)){const _0x44d29c=this[_0x4d53f1(0x267)]()[_0x4d53f1(0x1bd)];if(_0x44d29c[_0x4d53f1(0x2bf)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x4d53f1(0x2c3);else{if(_0x44d29c[_0x4d53f1(0x2bf)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return _0x37e694[_0x4d53f1(0x2bc)][_0x4d53f1(0x2a6)];}else return Number(RegExp['$1']);}return Window_STB_TurnOrder[_0x4d53f1(0x2bc)][_0x4d53f1(0x254)];},Game_Enemy[_0x15047e(0x21b)][_0x15047e(0x28d)]=function(){const _0x17e851=_0x15047e,_0x5da112=this['enemy']()[_0x17e851(0x1bd)];if(_0x5da112[_0x17e851(0x2bf)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if('EjFTR'===_0x17e851(0x170))this[_0x17e851(0x1c4)]=null,this[_0x17e851(0x27f)]=![];else return _0x17e851(0x2c3);}else{if(_0x5da112['match'](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x17e851(0x1d4);}return Window_STB_TurnOrder[_0x17e851(0x2bc)]['EnemyBattlerType'];},Game_Enemy[_0x15047e(0x21b)][_0x15047e(0x22e)]=function(){const _0x4ce6fc=_0x15047e,_0x2022a8=this['enemy']()[_0x4ce6fc(0x1bd)];if(_0x2022a8[_0x4ce6fc(0x2bf)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x4ce6fc(0x245)===_0x4ce6fc(0x2d2)){if(!_0x45579c[_0x4ce6fc(0x1e3)]())return;if(!_0x537d52[_0x4ce6fc(0x28f)]())return;if(!_0x1024df[_0x4ce6fc(0x347)]())return;if(_0xee7cec[_0x4ce6fc(0x252)]()===this['subject']()[_0x4ce6fc(0x252)]())return;const _0x5b0495=_0x171a97[_0x4ce6fc(0x33b)][_0x4ce6fc(0x2bc)][_0x4ce6fc(0x283)],_0x1843f1=_0x5f02f5[_0x4ce6fc(0x2fd)]();if(!_0x5b0495[_0x4ce6fc(0x15f)]&&this[_0x4ce6fc(0x27e)])return;_0x5b0495[_0x4ce6fc(0x1ac)]&&_0x1843f1[_0x4ce6fc(0x2db)]&&(this['subject']()[_0x4ce6fc(0x28e)](_0x573d18,this),_0x386ea2[_0x4ce6fc(0x297)](this['subject'](),this));if(_0x5b0495[_0x4ce6fc(0x1ed)]){const _0x1ab071=this[_0x4ce6fc(0x290)](_0x4976ff);_0x1ab071>=_0x5b0495[_0x4ce6fc(0x300)]&&(this[_0x4ce6fc(0x2d9)]()[_0x4ce6fc(0x28e)](_0x105f0e,this),_0xebf373[_0x4ce6fc(0x297)](this[_0x4ce6fc(0x2d9)](),this));}}else return String(RegExp['$1']);}return Window_STB_TurnOrder[_0x4ce6fc(0x2bc)][_0x4ce6fc(0x1f0)];},Game_Enemy[_0x15047e(0x21b)]['createTurnOrderSTBGraphicFaceIndex']=function(){const _0x4f024b=_0x15047e,_0x3699ae=this[_0x4f024b(0x267)]()[_0x4f024b(0x1bd)];if(_0x3699ae[_0x4f024b(0x2bf)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_STB_TurnOrder['Settings']['EnemyBattlerFaceIndex'];},Game_Enemy[_0x15047e(0x21b)][_0x15047e(0x2fb)]=function(){const _0x14cb8e=_0x15047e,_0xe01d17=this[_0x14cb8e(0x267)]()['note'];if(_0xe01d17['match'](/<STB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_STB_TurnOrder[_0x14cb8e(0x2bc)]['EnemyBattlerIcon'];},VisuMZ['BattleSystemSTB'][_0x15047e(0x24f)]=Game_Party[_0x15047e(0x21b)][_0x15047e(0x1e6)],Game_Party[_0x15047e(0x21b)][_0x15047e(0x1e6)]=function(_0x11fd70){const _0x9919ba=_0x15047e;VisuMZ[_0x9919ba(0x33b)][_0x9919ba(0x24f)][_0x9919ba(0x1f8)](this,_0x11fd70),SceneManager[_0x9919ba(0x1e3)]()&&BattleManager[_0x9919ba(0x28f)]()&&(_0x9919ba(0x1af)===_0x9919ba(0x1af)?BattleManager[_0x9919ba(0x316)][_0x9919ba(0x2c2)]($gameActors[_0x9919ba(0x1de)](_0x11fd70)):this[_0x9919ba(0x2d9)]()[_0x9919ba(0x231)](0x1));},VisuMZ[_0x15047e(0x33b)]['Scene_Battle_createActorCommandWindow']=Scene_Battle['prototype']['createActorCommandWindow'],Scene_Battle[_0x15047e(0x21b)][_0x15047e(0x2aa)]=function(){const _0x1505ba=_0x15047e;VisuMZ[_0x1505ba(0x33b)]['Scene_Battle_createActorCommandWindow']['call'](this),BattleManager['isSTB']()&&this[_0x1505ba(0x33a)]();},Scene_Battle[_0x15047e(0x21b)][_0x15047e(0x33a)]=function(){const _0x1a4f55=_0x15047e,_0x55b0ac=this['_actorCommandWindow'];this[_0x1a4f55(0x19f)]()&&delete _0x55b0ac[_0x1a4f55(0x18b)]['cancel'];},VisuMZ['BattleSystemSTB'][_0x15047e(0x2c9)]=Scene_Battle['prototype'][_0x15047e(0x1bb)],Scene_Battle[_0x15047e(0x21b)][_0x15047e(0x1bb)]=function(){const _0x18a7ff=_0x15047e;BattleManager[_0x18a7ff(0x28f)]()?this['commandCancelSTB']():VisuMZ['BattleSystemSTB'][_0x18a7ff(0x2c9)][_0x18a7ff(0x1f8)](this);},Scene_Battle['prototype']['commandCancelSTB']=function(){const _0x594954=_0x15047e;this[_0x594954(0x21e)]['setup'](),this[_0x594954(0x34f)][_0x594954(0x2a5)]();},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x328)]=Scene_Battle['prototype']['commandFight'],Scene_Battle[_0x15047e(0x21b)]['commandFight']=function(){const _0x1ad6d2=_0x15047e;if(BattleManager[_0x1ad6d2(0x28f)]())this['startActorCommandSelection']();else{if(_0x1ad6d2(0x2ad)===_0x1ad6d2(0x181))return this[_0x1ad6d2(0x29a)]();else VisuMZ['BattleSystemSTB'][_0x1ad6d2(0x328)][_0x1ad6d2(0x1f8)](this);}},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x2ce)]=Scene_Battle[_0x15047e(0x21b)]['createAllWindows'],Scene_Battle['prototype'][_0x15047e(0x349)]=function(){const _0x3d0f2c=_0x15047e;VisuMZ['BattleSystemSTB'][_0x3d0f2c(0x2ce)][_0x3d0f2c(0x1f8)](this),this[_0x3d0f2c(0x2d6)]();},Scene_Battle[_0x15047e(0x21b)][_0x15047e(0x2d6)]=function(){const _0x3b85d7=_0x15047e;if(!BattleManager[_0x3b85d7(0x28f)]())return;this[_0x3b85d7(0x1d1)]=new Window_STB_TurnOrder();const _0x3793e0=this[_0x3b85d7(0x281)](this[_0x3b85d7(0x1ee)]);this['addChildAt'](this['_stbTurnOrderWindow'],_0x3793e0),this[_0x3b85d7(0x249)](),BattleManager['updateTurnOrderSTB'](!![]);},Scene_Battle[_0x15047e(0x21b)][_0x15047e(0x249)]=function(){const _0x5bd049=_0x15047e,_0x291bb5=Window_STB_TurnOrder[_0x5bd049(0x2bc)];if(_0x291bb5['DisplayPosition']!=='top')return;if(!_0x291bb5['RepositionLogWindow'])return;if(!this['_logWindow'])return;const _0x1d8f7f=this[_0x5bd049(0x1d1)]['y']-Math[_0x5bd049(0x205)]((Graphics[_0x5bd049(0x313)]-Graphics[_0x5bd049(0x32f)])/0x2),_0x4c34dc=_0x1d8f7f+this[_0x5bd049(0x1d1)][_0x5bd049(0x313)];this[_0x5bd049(0x263)]['y']=_0x4c34dc+_0x291bb5['ScreenBuffer'];};function Sprite_STB_TurnOrder_Battler(){const _0x312689=_0x15047e;this[_0x312689(0x195)](...arguments);}Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)]=Object[_0x15047e(0x27b)](Sprite_Clickable[_0x15047e(0x21b)]),Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x25e)]=Sprite_STB_TurnOrder_Battler,Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x195)]=function(_0x5d85bb,_0x49b390){const _0x38fd6a=_0x15047e;this[_0x38fd6a(0x19a)](_0x5d85bb,_0x49b390),Sprite_Clickable['prototype']['initialize'][_0x38fd6a(0x1f8)](this),this[_0x38fd6a(0x16d)]=0x0,this[_0x38fd6a(0x20f)](),this[_0x38fd6a(0x27a)]();},Sprite_STB_TurnOrder_Battler['prototype']['initMembers']=function(_0xb6691,_0x10a938){const _0x18f1cb=_0x15047e;this['_unit']=_0xb6691,this[_0x18f1cb(0x1aa)]=_0x10a938;const _0x19819f=Window_STB_TurnOrder[_0x18f1cb(0x2bc)],_0xcc8bec=this[_0x18f1cb(0x1a5)](),_0x20883e=this['defaultPosition']();this[_0x18f1cb(0x2b2)]=0x0,this['_positionTargetX']=_0xcc8bec?_0x19819f['SpriteThin']*_0x20883e:0x0,this['_positionTargetY']=_0xcc8bec?0x0:_0x19819f[_0x18f1cb(0x184)]*_0x20883e,this[_0x18f1cb(0x262)]=0x0,this[_0x18f1cb(0x31a)]=0xff,this[_0x18f1cb(0x200)]=![],this[_0x18f1cb(0x223)]=![],this[_0x18f1cb(0x264)]=0x0,this[_0x18f1cb(0x2a4)]=0x0;},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x20f)]=function(){const _0x160ccd=_0x15047e;this['createInitialPositions'](),this[_0x160ccd(0x234)](),this[_0x160ccd(0x1eb)](),this[_0x160ccd(0x340)](),this[_0x160ccd(0x2f8)]();},Sprite_STB_TurnOrder_Battler['prototype']['createInitialPositions']=function(){const _0x345c67=_0x15047e;this['x']=this[_0x345c67(0x329)],this['y']=this[_0x345c67(0x164)];},Sprite_STB_TurnOrder_Battler['prototype'][_0x15047e(0x1a5)]=function(){const _0x14a421=_0x15047e,_0x2f0209=Window_STB_TurnOrder['Settings'],_0x22811e=[_0x14a421(0x2c4),'bottom']['includes'](_0x2f0209[_0x14a421(0x253)]);return _0x22811e;},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)]['bitmapWidth']=function(){const _0x4d0b68=_0x15047e,_0x561fd1=Window_STB_TurnOrder['Settings'];return this[_0x4d0b68(0x1a5)]()?_0x561fd1['SpriteThin']:_0x561fd1[_0x4d0b68(0x22c)];},Sprite_STB_TurnOrder_Battler['prototype'][_0x15047e(0x332)]=function(){const _0x210327=_0x15047e,_0x550c97=Window_STB_TurnOrder[_0x210327(0x2bc)];return this[_0x210327(0x1a5)]()?_0x550c97[_0x210327(0x22c)]:_0x550c97[_0x210327(0x184)];},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x218)]=function(){const _0x1bb720=_0x15047e;this[_0x1bb720(0x34a)]=new Bitmap(0x48,0x24);const _0x99d262=this[_0x1bb720(0x1db)]()?this[_0x1bb720(0x1db)]()[_0x1bb720(0x2f6)]():_0x1bb720(0x34e)[_0x1bb720(0x345)](this[_0x1bb720(0x1f6)],this[_0x1bb720(0x1aa)]);this[_0x1bb720(0x34a)]['drawText'](_0x99d262,0x0,0x0,0x48,0x24,_0x1bb720(0x220));},Sprite_STB_TurnOrder_Battler['prototype'][_0x15047e(0x234)]=function(){const _0x2e3881=_0x15047e;if(!Window_STB_TurnOrder[_0x2e3881(0x2bc)][_0x2e3881(0x1a9)])return;const _0x3e347f=Window_STB_TurnOrder[_0x2e3881(0x2bc)],_0x144af4=this[_0x2e3881(0x1f6)]===$gameParty?_0x2e3881(0x23b):_0x2e3881(0x2dd),_0x3d604e=_0x2e3881(0x2e7)[_0x2e3881(0x345)](_0x144af4),_0x353fe1=new Sprite();_0x353fe1[_0x2e3881(0x301)]['x']=this[_0x2e3881(0x301)]['x'],_0x353fe1['anchor']['y']=this['anchor']['y'];if(_0x3e347f[_0x3d604e])_0x353fe1['bitmap']=ImageManager['loadSystem'](_0x3e347f[_0x3d604e]);else{const _0x20ffb4=this[_0x2e3881(0x348)](),_0x17f281=this[_0x2e3881(0x332)]();_0x353fe1[_0x2e3881(0x34a)]=new Bitmap(_0x20ffb4,_0x17f281);const _0x2bb859=ColorManager[_0x2e3881(0x1b4)](_0x3e347f['%1BgColor1'['format'](_0x144af4)]),_0x5af233=ColorManager['getColor'](_0x3e347f[_0x2e3881(0x1f4)[_0x2e3881(0x345)](_0x144af4)]);_0x353fe1[_0x2e3881(0x34a)][_0x2e3881(0x330)](0x0,0x0,_0x20ffb4,_0x17f281,_0x2bb859,_0x5af233,!![]);}this['_backgroundSprite']=_0x353fe1,this['addChild'](this['_backgroundSprite']),this[_0x2e3881(0x34c)]=this[_0x2e3881(0x1d7)][_0x2e3881(0x34c)],this[_0x2e3881(0x313)]=this[_0x2e3881(0x1d7)]['height'];},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x1eb)]=function(){const _0x4f6005=_0x15047e,_0x12c6ed=new Sprite();_0x12c6ed['anchor']['x']=this[_0x4f6005(0x301)]['x'],_0x12c6ed['anchor']['y']=this[_0x4f6005(0x301)]['y'],this[_0x4f6005(0x16e)]=_0x12c6ed,this[_0x4f6005(0x26d)](this[_0x4f6005(0x16e)]),this['processUpdateGraphic']();},Sprite_STB_TurnOrder_Battler['prototype'][_0x15047e(0x340)]=function(){const _0x5f37c5=_0x15047e;if(!Window_STB_TurnOrder[_0x5f37c5(0x2bc)]['ShowMarkerBorder'])return;const _0x522630=Window_STB_TurnOrder['Settings'],_0x10c80f=this[_0x5f37c5(0x1f6)]===$gameParty?_0x5f37c5(0x23b):_0x5f37c5(0x2dd),_0x30f13a=_0x5f37c5(0x229)[_0x5f37c5(0x345)](_0x10c80f),_0x51117c=new Sprite();_0x51117c[_0x5f37c5(0x301)]['x']=this[_0x5f37c5(0x301)]['x'],_0x51117c[_0x5f37c5(0x301)]['y']=this[_0x5f37c5(0x301)]['y'];if(_0x522630[_0x30f13a])_0x51117c['bitmap']=ImageManager[_0x5f37c5(0x240)](_0x522630[_0x30f13a]);else{let _0x35441=this[_0x5f37c5(0x348)](),_0x1a9632=this[_0x5f37c5(0x332)](),_0x11c998=_0x522630['BorderThickness'];_0x51117c['bitmap']=new Bitmap(_0x35441,_0x1a9632);const _0x11295e=_0x5f37c5(0x272),_0x3e7538=ColorManager[_0x5f37c5(0x1b4)](_0x522630[_0x5f37c5(0x1d0)[_0x5f37c5(0x345)](_0x10c80f)]);_0x51117c[_0x5f37c5(0x34a)][_0x5f37c5(0x2a7)](0x0,0x0,_0x35441,_0x1a9632,_0x11295e),_0x35441-=0x2,_0x1a9632-=0x2,_0x51117c[_0x5f37c5(0x34a)][_0x5f37c5(0x2a7)](0x1,0x1,_0x35441,_0x1a9632,_0x3e7538),_0x35441-=_0x11c998*0x2,_0x1a9632-=_0x11c998*0x2,_0x51117c[_0x5f37c5(0x34a)]['fillRect'](0x1+_0x11c998,0x1+_0x11c998,_0x35441,_0x1a9632,_0x11295e),_0x35441-=0x2,_0x1a9632-=0x2,_0x11c998+=0x1,_0x51117c[_0x5f37c5(0x34a)][_0x5f37c5(0x298)](0x1+_0x11c998,0x1+_0x11c998,_0x35441,_0x1a9632);}this[_0x5f37c5(0x1d7)]=_0x51117c,this[_0x5f37c5(0x26d)](this[_0x5f37c5(0x1d7)]);},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x2f8)]=function(){const _0x2f57e7=_0x15047e,_0x11677f=Window_STB_TurnOrder[_0x2f57e7(0x2bc)];if(!_0x11677f[_0x2f57e7(0x194)])return;if(this['_unit']===$gameParty)return;const _0x102e9b=this[_0x2f57e7(0x348)](),_0x164b9f=this[_0x2f57e7(0x332)](),_0xfb6878=new Sprite();_0xfb6878[_0x2f57e7(0x301)]['x']=this['anchor']['x'],_0xfb6878[_0x2f57e7(0x301)]['y']=this[_0x2f57e7(0x301)]['y'],_0xfb6878[_0x2f57e7(0x34a)]=new Bitmap(_0x102e9b,_0x164b9f),this[_0x2f57e7(0x16a)]=_0xfb6878,this['addChild'](this[_0x2f57e7(0x16a)]);},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x1db)]=function(){const _0x25d543=_0x15047e;return this[_0x25d543(0x1f6)]?this[_0x25d543(0x1f6)]['members']()[this['_index']]:null;},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x289)]=function(){const _0x3e8187=_0x15047e;Sprite_Clickable[_0x3e8187(0x21b)][_0x3e8187(0x289)]['call'](this),this['checkPosition'](),this[_0x3e8187(0x331)](),this[_0x3e8187(0x27a)](),this[_0x3e8187(0x256)](),this[_0x3e8187(0x1d9)](),this['updateGraphicHue'](),this[_0x3e8187(0x1b5)](),this[_0x3e8187(0x19e)]();},Sprite_STB_TurnOrder_Battler['prototype'][_0x15047e(0x235)]=function(){const _0x3dc090=_0x15047e,_0x5abd79=this[_0x3dc090(0x15c)]();if(this['_position']===_0x5abd79)return;this[_0x3dc090(0x172)]=_0x5abd79;this['opacity']<0xff&&this[_0x3dc090(0x1db)]()&&_0x5abd79!==this['defaultPosition']()&&this[_0x3dc090(0x1fb)](0xff);if(_0x5abd79===this['defaultPosition']()&&this[_0x3dc090(0x262)]<=0x0&&this[_0x3dc090(0x16d)]>0x0)this[_0x3dc090(0x1fb)](0x0);else this['_fadeDuration']<=0x0&&this[_0x3dc090(0x16d)]<0xff&&(_0x3dc090(0x333)===_0x3dc090(0x333)?this['checkOpacity']():this[_0x3dc090(0x1f1)]());this[_0x3dc090(0x2ee)]();},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)]['checkTargetPositions']=function(){const _0x4b4ad0=_0x15047e,_0x6bb9a1=this[_0x4b4ad0(0x2a1)]();if(!_0x6bb9a1)return;let _0x1729e0=![];if(this[_0x4b4ad0(0x264)]!==_0x6bb9a1[_0x4b4ad0(0x34c)]){if(_0x4b4ad0(0x1e1)!==_0x4b4ad0(0x288))_0x1729e0=!![];else{const _0x11ebdc=_0x256b3b[_0x4b4ad0(0x2bc)];return this[_0x4b4ad0(0x1a5)]()?_0x11ebdc['SpriteThin']:_0x11ebdc[_0x4b4ad0(0x22c)];}}else this['_containerHeight']!==_0x6bb9a1[_0x4b4ad0(0x313)]&&(_0x1729e0=!![]);if(_0x1729e0){if(_0x4b4ad0(0x242)!==_0x4b4ad0(0x242)){const _0xa8d475=new _0x37a521(_0x433df5,_0x504ce7);this[_0x4b4ad0(0x34d)][_0x4b4ad0(0x26d)](_0xa8d475),this[_0x4b4ad0(0x304)][_0x4b4ad0(0x1bc)](_0xa8d475);}else this[_0x4b4ad0(0x2ee)]();}},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x2ee)]=function(){const _0x232a56=_0x15047e,_0x3b5143=Window_STB_TurnOrder[_0x232a56(0x2bc)],_0x25700c=this['isHorz'](),_0x15aa40=_0x3b5143[_0x232a56(0x236)],_0x84f564=_0x3b5143['SubjectDistance'],_0x3eca4e=SceneManager[_0x232a56(0x20c)][_0x232a56(0x1d1)];if(!_0x3eca4e)return;const _0x4cf672=this['containerPosition']();this[_0x232a56(0x2b2)]=_0x3b5143[_0x232a56(0x24e)],this[_0x232a56(0x329)]=_0x25700c?_0x3b5143[_0x232a56(0x184)]*_0x4cf672:0x0,this[_0x232a56(0x164)]=_0x25700c?0x0:_0x3b5143['SpriteThin']*_0x4cf672,_0x4cf672>0x0&&(this[_0x232a56(0x329)]+=_0x25700c?_0x84f564:0x0,this[_0x232a56(0x164)]+=_0x25700c?0x0:_0x84f564),_0x15aa40?this[_0x232a56(0x329)]=_0x25700c?_0x3eca4e[_0x232a56(0x34c)]-this[_0x232a56(0x329)]-_0x3b5143['SpriteThin']:0x0:this['_positionTargetY']=_0x25700c?0x0:_0x3eca4e[_0x232a56(0x313)]-this[_0x232a56(0x164)]-_0x3b5143[_0x232a56(0x184)];},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x331)]=function(){const _0x348cb2=_0x15047e;if(this[_0x348cb2(0x262)]>0x0)return;if(this[_0x348cb2(0x2b2)]>0x0){if(_0x348cb2(0x317)==='pYNqi'){const _0x3be2a5=this[_0x348cb2(0x2b2)];this['x']=(this['x']*(_0x3be2a5-0x1)+this[_0x348cb2(0x329)])/_0x3be2a5,this['y']=(this['y']*(_0x3be2a5-0x1)+this[_0x348cb2(0x164)])/_0x3be2a5,this['_positionDuration']--;}else _0x3eff87[_0x348cb2(0x25b)](this[_0x348cb2(0x2ff)][_0x348cb2(0x26b)](),0x0,_0x81c4f4/0x2,_0x51b7dc,_0x201215/0x2,_0x348cb2(0x220));}if(this[_0x348cb2(0x2b2)]<=0x0){this['x']=this[_0x348cb2(0x329)],this['y']=this[_0x348cb2(0x164)];if(this[_0x348cb2(0x16d)]<0xff&&!this['_isBattleOver']&&this[_0x348cb2(0x262)]<=0x0){const _0x4e004d=this[_0x348cb2(0x1db)]();_0x4e004d&&(this[_0x348cb2(0x31a)]=_0x4e004d[_0x348cb2(0x198)]()&&_0x4e004d[_0x348cb2(0x241)]()?0xff:0x0);}}},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)]['defaultPosition']=function(){const _0x55809c=_0x15047e,_0x396a73=Window_STB_TurnOrder[_0x55809c(0x2bc)],_0x10e6f6=this['isHorz']()?_0x396a73[_0x55809c(0x15d)]:_0x396a73[_0x55809c(0x324)];return _0x10e6f6+0x1;},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x2a1)]=function(){const _0x36d542=_0x15047e;return SceneManager[_0x36d542(0x20c)][_0x36d542(0x1d1)];},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x15c)]=function(){const _0x334eaa=_0x15047e,_0x4586cc=this[_0x334eaa(0x1db)]();if(!_0x4586cc)return this[_0x334eaa(0x31c)]();if(_0x4586cc===BattleManager[_0x334eaa(0x15e)])return 0x0;if(BattleManager[_0x334eaa(0x316)]['includes'](_0x4586cc)){const _0x148f55=BattleManager[_0x334eaa(0x316)][_0x334eaa(0x160)](_0x4586cc)+0x1;return _0x148f55;}return this[_0x334eaa(0x31c)]();},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x1fb)]=function(_0x18e36d){const _0x588544=_0x15047e,_0x4e0a34=Window_STB_TurnOrder['Settings'];this[_0x588544(0x262)]=_0x4e0a34[_0x588544(0x24e)],this[_0x588544(0x31a)]=_0x18e36d;},Sprite_STB_TurnOrder_Battler['prototype']['checkOpacity']=function(){const _0x1613c7=_0x15047e,_0xcdd8d5=this[_0x1613c7(0x1db)]();if(!_0xcdd8d5)return;if(this[_0x1613c7(0x200)]===_0xcdd8d5['isAlive']()&&this[_0x1613c7(0x223)]===_0xcdd8d5[_0x1613c7(0x241)]())return;this['_isAlive']=_0xcdd8d5['isAlive'](),this['_isAppeared']=_0xcdd8d5[_0x1613c7(0x241)]();let _0x2dfc5f=this[_0x1613c7(0x200)]&&this[_0x1613c7(0x223)]?0xff:0x0;this['startFade'](_0x2dfc5f);},Sprite_STB_TurnOrder_Battler['prototype'][_0x15047e(0x256)]=function(){const _0x653f17=_0x15047e;if(this[_0x653f17(0x262)]>0x0){if(_0x653f17(0x339)!==_0x653f17(0x339))this[_0x653f17(0x21c)]();else{const _0x393e6d=this['_fadeDuration'];this[_0x653f17(0x16d)]=(this['opacity']*(_0x393e6d-0x1)+this[_0x653f17(0x31a)])/_0x393e6d,this[_0x653f17(0x262)]--,this[_0x653f17(0x262)]<=0x0&&(this[_0x653f17(0x235)](),this['_positionDuration']=0x0,this[_0x653f17(0x331)](),this[_0x653f17(0x16d)]=this['_fadeTarget']);}}if(this[_0x653f17(0x2f5)])return;if(BattleManager[_0x653f17(0x204)]===_0x653f17(0x275)){if(_0x653f17(0x175)===_0x653f17(0x175))this[_0x653f17(0x2f5)]=!![],this[_0x653f17(0x1fb)](0x0);else return this[_0x653f17(0x29a)]();}},Sprite_STB_TurnOrder_Battler['prototype'][_0x15047e(0x1d9)]=function(){const _0x443fbf=_0x15047e,_0x303bd0=this[_0x443fbf(0x1db)]();if(!_0x303bd0)return;const _0x1a730c=Window_STB_TurnOrder['Settings'],_0xea4b2f=this[_0x443fbf(0x1f6)]===$gameParty?_0x443fbf(0x23b):_0x443fbf(0x2dd);let _0x30a6fb=_0x303bd0[_0x443fbf(0x1da)]();if(_0x303bd0[_0x443fbf(0x2a9)]()&&_0x30a6fb===_0x443fbf(0x267))_0x443fbf(0x260)===_0x443fbf(0x260)?_0x30a6fb='face':_0x459b2c[_0x443fbf(0x1bc)](_0xe5f462(_0x366d77));else _0x303bd0[_0x443fbf(0x165)]()&&_0x30a6fb===_0x443fbf(0x1ce)&&(_0x30a6fb='enemy');if(this[_0x443fbf(0x216)]!==_0x30a6fb){if(_0x443fbf(0x24b)!=='mTijC')return this[_0x443fbf(0x29a)]();else this[_0x443fbf(0x261)]=_0xdc5de8[_0x443fbf(0x2e6)]();}switch(this['_graphicType']){case'face':if(this['_graphicFaceName']!==_0x303bd0[_0x443fbf(0x221)]())return this['processUpdateGraphic']();if(this[_0x443fbf(0x33e)]!==_0x303bd0['TurnOrderSTBGraphicFaceIndex']()){if(_0x443fbf(0x17f)===_0x443fbf(0x277)){const _0x580328=_0x2267ce[_0x443fbf(0x33f)],_0xc432f8=_0x4c3b8c[_0x443fbf(0x1b0)],_0x44ee14=_0x544b55['Mute'];_0x4cc56b[_0x443fbf(0x29c)]([this],_0x580328,_0xc432f8,_0x44ee14);}else return this[_0x443fbf(0x29a)]();}break;case _0x443fbf(0x1d4):if(this['_graphicIconIndex']!==_0x303bd0[_0x443fbf(0x167)]()){if(_0x443fbf(0x226)===_0x443fbf(0x24c)){const _0x11b6a6=this['enemy']()[_0x443fbf(0x1bd)];if(_0x11b6a6[_0x443fbf(0x2bf)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x479d28(_0x4e1f7b['$1']);return _0x548dde[_0x443fbf(0x2bc)][_0x443fbf(0x1c8)];}else return this[_0x443fbf(0x29a)]();}break;case _0x443fbf(0x267):if(_0x303bd0[_0x443fbf(0x305)]()){if('xaORC'===_0x443fbf(0x321)){const _0x39fe84=this[_0x443fbf(0x262)];this['opacity']=(this['opacity']*(_0x39fe84-0x1)+this[_0x443fbf(0x31a)])/_0x39fe84,this[_0x443fbf(0x262)]--,this[_0x443fbf(0x262)]<=0x0&&(this[_0x443fbf(0x235)](),this[_0x443fbf(0x2b2)]=0x0,this[_0x443fbf(0x331)](),this[_0x443fbf(0x16d)]=this[_0x443fbf(0x31a)]);}else{if(this['_graphicSv']!==_0x303bd0['svBattlerName']())return this[_0x443fbf(0x29a)]();}}else{if(this[_0x443fbf(0x246)]!==_0x303bd0[_0x443fbf(0x173)]())return this[_0x443fbf(0x29a)]();}break;case'svactor':if(_0x303bd0[_0x443fbf(0x2a9)]()){if(this[_0x443fbf(0x251)]!==_0x303bd0[_0x443fbf(0x173)]())return this[_0x443fbf(0x29a)]();}else{if(this[_0x443fbf(0x246)]!==_0x303bd0['battlerName']())return this[_0x443fbf(0x29a)]();}break;}},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x29a)]=function(){const _0x3dc895=_0x15047e,_0x107164=this[_0x3dc895(0x1db)]();if(!_0x107164)return;this[_0x3dc895(0x216)]=_0x107164[_0x3dc895(0x1da)]();if(_0x107164['isActor']()&&this[_0x3dc895(0x216)]===_0x3dc895(0x267)){if(_0x3dc895(0x2e0)===_0x3dc895(0x177)){let _0x25180d;!_0x55d751&&(_0x25180d=this[_0x3dc895(0x265)]['shift']()),this[_0x3dc895(0x30f)](_0x46197f),!_0x20471d&&this[_0x3dc895(0x265)][_0x3dc895(0x169)](_0x25180d);}else this[_0x3dc895(0x216)]=_0x3dc895(0x2c3);}else _0x107164[_0x3dc895(0x165)]()&&this['_graphicType']===_0x3dc895(0x1ce)&&('fSoVL'==='BjCRX'?this[_0x3dc895(0x2a0)]=!![]:this[_0x3dc895(0x216)]=_0x3dc895(0x267));let _0x4c6850;switch(this[_0x3dc895(0x216)]){case _0x3dc895(0x2c3):this[_0x3dc895(0x2be)]=_0x107164[_0x3dc895(0x221)](),this[_0x3dc895(0x33e)]=_0x107164[_0x3dc895(0x2ea)](),_0x4c6850=ImageManager['loadFace'](this[_0x3dc895(0x2be)]),_0x4c6850[_0x3dc895(0x2d4)](this[_0x3dc895(0x224)][_0x3dc895(0x32b)](this,_0x4c6850));break;case'icon':this['_graphicIconIndex']=_0x107164[_0x3dc895(0x2fb)](),_0x4c6850=ImageManager[_0x3dc895(0x240)]('IconSet'),_0x4c6850[_0x3dc895(0x2d4)](this[_0x3dc895(0x1d3)][_0x3dc895(0x32b)](this,_0x4c6850));break;case _0x3dc895(0x267):if(_0x107164['hasSvBattler']()){if(_0x3dc895(0x310)!=='YuJEh')this[_0x3dc895(0x251)]=_0x107164['svBattlerName'](),_0x4c6850=ImageManager[_0x3dc895(0x292)](this[_0x3dc895(0x251)]),_0x4c6850['addLoadListener'](this[_0x3dc895(0x2b0)][_0x3dc895(0x32b)](this,_0x4c6850));else{const _0x39f9d2=_0xc1d4b7[_0x3dc895(0x2bc)];if(_0x39f9d2[_0x3dc895(0x253)]!=='top')return;if(!_0x39f9d2[_0x3dc895(0x202)])return;if(!this['_logWindow'])return;const _0x349839=this[_0x3dc895(0x1d1)]['y']-_0x53c169[_0x3dc895(0x205)]((_0x3181e6['height']-_0x30614c['boxHeight'])/0x2),_0x2db1b0=_0x349839+this[_0x3dc895(0x1d1)][_0x3dc895(0x313)];this['_logWindow']['y']=_0x2db1b0+_0x39f9d2['ScreenBuffer'];}}else $gameSystem[_0x3dc895(0x239)]()?(this[_0x3dc895(0x246)]=_0x107164[_0x3dc895(0x173)](),_0x4c6850=ImageManager[_0x3dc895(0x227)](this['_graphicEnemy']),_0x4c6850[_0x3dc895(0x2d4)](this[_0x3dc895(0x237)]['bind'](this,_0x4c6850))):(this[_0x3dc895(0x246)]=_0x107164[_0x3dc895(0x173)](),_0x4c6850=ImageManager[_0x3dc895(0x326)](this[_0x3dc895(0x246)]),_0x4c6850['addLoadListener'](this['changeEnemyGraphicBitmap'][_0x3dc895(0x32b)](this,_0x4c6850)));break;case _0x3dc895(0x1ce):this[_0x3dc895(0x251)]=_0x107164[_0x3dc895(0x173)](),_0x4c6850=ImageManager[_0x3dc895(0x292)](this['_graphicSv']),_0x4c6850['addLoadListener'](this[_0x3dc895(0x2b0)][_0x3dc895(0x32b)](this,_0x4c6850));break;}},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)]['changeFaceGraphicBitmap']=function(_0xbccb0){const _0x2d184a=_0x15047e,_0x56e2bf=this[_0x2d184a(0x33e)],_0x2fcbc8=this[_0x2d184a(0x348)](),_0xf9ed46=this[_0x2d184a(0x332)](),_0x38b4d7=Math['max'](_0x2fcbc8,_0xf9ed46);this[_0x2d184a(0x16e)][_0x2d184a(0x34a)]=new Bitmap(_0x2fcbc8,_0xf9ed46);const _0x4bc889=this[_0x2d184a(0x16e)][_0x2d184a(0x34a)],_0x173513=ImageManager['faceWidth'],_0x32d1be=ImageManager[_0x2d184a(0x1df)],_0x33f10e=_0x38b4d7/Math[_0x2d184a(0x2fc)](_0x173513,_0x32d1be),_0x139fab=ImageManager['faceWidth'],_0x4e58f6=ImageManager[_0x2d184a(0x1df)],_0x16a4bc=_0x56e2bf%0x4*_0x173513+(_0x173513-_0x139fab)/0x2,_0x24d917=Math[_0x2d184a(0x1b2)](_0x56e2bf/0x4)*_0x32d1be+(_0x32d1be-_0x4e58f6)/0x2,_0xbedd4=(_0x2fcbc8-_0x173513*_0x33f10e)/0x2,_0x37d8a3=(_0xf9ed46-_0x32d1be*_0x33f10e)/0x2;_0x4bc889[_0x2d184a(0x2ef)](_0xbccb0,_0x16a4bc,_0x24d917,_0x139fab,_0x4e58f6,_0xbedd4,_0x37d8a3,_0x38b4d7,_0x38b4d7);},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x1d3)]=function(_0x2f543f){const _0x3e279d=_0x15047e,_0x3495f6=this[_0x3e279d(0x2c5)],_0x424b7e=this['bitmapWidth'](),_0x1094c4=this[_0x3e279d(0x332)]();this[_0x3e279d(0x16e)][_0x3e279d(0x34a)]=new Bitmap(_0x424b7e,_0x1094c4);const _0x19632f=this[_0x3e279d(0x16e)]['bitmap'],_0x2aba33=ImageManager['iconWidth'],_0x1802f9=ImageManager[_0x3e279d(0x18a)],_0x126464=Math[_0x3e279d(0x28c)](_0x2aba33,_0x1802f9,_0x424b7e,_0x1094c4),_0x1965c5=_0x3495f6%0x10*_0x2aba33,_0x15a460=Math[_0x3e279d(0x1b2)](_0x3495f6/0x10)*_0x1802f9,_0x5dc3a7=Math[_0x3e279d(0x1b2)](Math['max'](_0x424b7e-_0x126464,0x0)/0x2),_0xff57d3=Math['floor'](Math['max'](_0x1094c4-_0x126464,0x0)/0x2);_0x19632f['blt'](_0x2f543f,_0x1965c5,_0x15a460,_0x2aba33,_0x1802f9,_0x5dc3a7,_0xff57d3,_0x126464,_0x126464);},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x2b0)]=function(_0x171bee){const _0x19bfe8=_0x15047e,_0x4ef73f=this['bitmapWidth'](),_0x275348=this['bitmapHeight'](),_0x33057f=Math[_0x19bfe8(0x28c)](_0x4ef73f,_0x275348);this[_0x19bfe8(0x16e)][_0x19bfe8(0x34a)]=new Bitmap(_0x4ef73f,_0x275348);const _0x1be899=this[_0x19bfe8(0x16e)][_0x19bfe8(0x34a)],_0x253c67=this['_graphicSv'][_0x19bfe8(0x2bf)](/\$/i),_0x35fdf4=_0x253c67?0x1:ImageManager['svActorHorzCells'],_0xf6ee6f=_0x253c67?0x1:ImageManager[_0x19bfe8(0x17a)],_0x3d4f8f=_0x171bee['width']/_0x35fdf4,_0x17c912=_0x171bee[_0x19bfe8(0x313)]/_0xf6ee6f,_0x51b576=Math[_0x19bfe8(0x28c)](0x1,_0x33057f/_0x3d4f8f,_0x33057f/_0x17c912),_0x32a1e4=_0x3d4f8f*_0x51b576,_0x2ffbd8=_0x17c912*_0x51b576,_0x52882a=Math[_0x19bfe8(0x205)]((_0x4ef73f-_0x32a1e4)/0x2),_0x2925ed=Math['round']((_0x275348-_0x2ffbd8)/0x2);_0x1be899[_0x19bfe8(0x2ef)](_0x171bee,0x0,0x0,_0x3d4f8f,_0x17c912,_0x52882a,_0x2925ed,_0x32a1e4,_0x2ffbd8);},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x237)]=function(_0x1aa8c6){const _0x5a9705=_0x15047e,_0x2d4bc5=Window_STB_TurnOrder[_0x5a9705(0x2bc)],_0x2963c9=this['bitmapWidth'](),_0x32ced5=this[_0x5a9705(0x332)](),_0x234f55=Math['min'](_0x2963c9,_0x32ced5);this['_graphicSprite'][_0x5a9705(0x34a)]=new Bitmap(_0x2963c9,_0x32ced5);const _0x59d8cc=this['_graphicSprite']['bitmap'],_0x36b0b0=Math['min'](0x1,_0x234f55/_0x1aa8c6[_0x5a9705(0x34c)],_0x234f55/_0x1aa8c6[_0x5a9705(0x313)]),_0x245f96=_0x1aa8c6[_0x5a9705(0x34c)]*_0x36b0b0,_0x177ea9=_0x1aa8c6['height']*_0x36b0b0,_0x3da924=Math[_0x5a9705(0x205)]((_0x2963c9-_0x245f96)/0x2),_0x25762c=Math['round']((_0x32ced5-_0x177ea9)/0x2);_0x59d8cc[_0x5a9705(0x2ef)](_0x1aa8c6,0x0,0x0,_0x1aa8c6[_0x5a9705(0x34c)],_0x1aa8c6[_0x5a9705(0x313)],_0x3da924,_0x25762c,_0x245f96,_0x177ea9);},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x1a6)]=function(){const _0x5b7003=_0x15047e,_0x767945=this[_0x5b7003(0x1db)]();if(!_0x767945)return;if(!_0x767945['isEnemy']())return;if(this['_graphicHue']===_0x767945[_0x5b7003(0x1e5)]())return;this[_0x5b7003(0x1c1)]=_0x767945['battlerHue']();if(_0x767945[_0x5b7003(0x305)]())this[_0x5b7003(0x1c1)]=0x0;this['_graphicSprite'][_0x5b7003(0x30d)](this[_0x5b7003(0x1c1)]);},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)]['updateLetter']=function(){const _0x4f5fc5=_0x15047e;if(!this['_letterSprite'])return;const _0x5881da=this[_0x4f5fc5(0x1db)]();if(!_0x5881da)return;if(this[_0x4f5fc5(0x2ff)]===_0x5881da['_letter']&&this[_0x4f5fc5(0x2e5)]===_0x5881da[_0x4f5fc5(0x2e5)])return;this[_0x4f5fc5(0x2ff)]=_0x5881da[_0x4f5fc5(0x2ff)],this[_0x4f5fc5(0x2e5)]=_0x5881da['_plural'];const _0x479da=Window_STB_TurnOrder[_0x4f5fc5(0x2bc)],_0x3f4a75=this[_0x4f5fc5(0x1a5)](),_0x26f300=this[_0x4f5fc5(0x348)](),_0x1688aa=this[_0x4f5fc5(0x332)](),_0x201130=this[_0x4f5fc5(0x16a)][_0x4f5fc5(0x34a)];_0x201130[_0x4f5fc5(0x311)]();if(!this[_0x4f5fc5(0x2e5)])return;_0x201130[_0x4f5fc5(0x168)]=_0x479da['EnemyBattlerFontFace']||$gameSystem[_0x4f5fc5(0x336)](),_0x201130[_0x4f5fc5(0x307)]=_0x479da['EnemyBattlerFontSize']||0x10,_0x3f4a75?_0x201130['drawText'](this['_letter'][_0x4f5fc5(0x26b)](),0x0,_0x1688aa/0x2,_0x26f300,_0x1688aa/0x2,_0x4f5fc5(0x220)):_0x201130[_0x4f5fc5(0x25b)](this['_letter'][_0x4f5fc5(0x26b)](),0x0,0x2,_0x26f300-0x8,_0x1688aa-0x4,_0x4f5fc5(0x192));},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x19e)]=function(){const _0x2dbbf2=_0x15047e,_0x21274c=this[_0x2dbbf2(0x1db)]();if(!_0x21274c)return;const _0x5e63e9=_0x21274c[_0x2dbbf2(0x1db)]();if(!_0x5e63e9)return;const _0x31659e=_0x5e63e9[_0x2dbbf2(0x27d)]();if(!_0x31659e)return;this[_0x2dbbf2(0x217)](_0x31659e[_0x2dbbf2(0x2b7)]);},Sprite_STB_TurnOrder_Battler[_0x15047e(0x21b)][_0x15047e(0x2d3)]=function(){const _0xc99a53=_0x15047e;return this[_0xc99a53(0x1db)]();},VisuMZ[_0x15047e(0x33b)][_0x15047e(0x24a)]=Window_Help[_0x15047e(0x21b)][_0x15047e(0x2bb)],Window_Help[_0x15047e(0x21b)]['setItem']=function(_0x23d0b5){const _0x35428d=_0x15047e;BattleManager[_0x35428d(0x28f)]()&&_0x23d0b5&&_0x23d0b5[_0x35428d(0x1bd)]&&_0x23d0b5[_0x35428d(0x1bd)][_0x35428d(0x2bf)](/<(?:STB) HELP>\s*([\s\S]*)\s*<\/(?:STB) HELP>/i)?'nTbPX'!==_0x35428d(0x26c)?this['setText'](String(RegExp['$1'])):this[_0x35428d(0x2df)]():VisuMZ[_0x35428d(0x33b)]['Window_Help_setItem'][_0x35428d(0x1f8)](this,_0x23d0b5);};function Window_STB_TurnOrder(){this['initialize'](...arguments);}function _0x3b50(_0x479783,_0x278c62){const _0x1ddca5=_0x1ddc();return _0x3b50=function(_0x3b5065,_0x2a764a){_0x3b5065=_0x3b5065-0x15c;let _0x3663df=_0x1ddca5[_0x3b5065];return _0x3663df;},_0x3b50(_0x479783,_0x278c62);}Window_STB_TurnOrder[_0x15047e(0x21b)]=Object[_0x15047e(0x27b)](Window_Base['prototype']),Window_STB_TurnOrder[_0x15047e(0x21b)][_0x15047e(0x25e)]=Window_STB_TurnOrder,Window_STB_TurnOrder[_0x15047e(0x2bc)]=VisuMZ[_0x15047e(0x33b)][_0x15047e(0x2bc)][_0x15047e(0x268)],Window_STB_TurnOrder[_0x15047e(0x21b)][_0x15047e(0x195)]=function(){const _0x134a42=_0x15047e,_0x589b66=this[_0x134a42(0x22d)]();this[_0x134a42(0x1fd)](_0x589b66),Window_Base['prototype'][_0x134a42(0x195)][_0x134a42(0x1f8)](this,_0x589b66),this[_0x134a42(0x225)](),this[_0x134a42(0x1c6)](),this[_0x134a42(0x16d)]=0x0;},Window_STB_TurnOrder[_0x15047e(0x21b)][_0x15047e(0x22d)]=function(){const _0xd42f77=_0x15047e;return this[_0xd42f77(0x20a)]($gameParty[_0xd42f77(0x1f3)](),0x9,!![]);},Window_STB_TurnOrder['prototype'][_0x15047e(0x1fd)]=function(_0xec6c52){const _0x202e84=_0x15047e;this['_targetHomeX']=this['_homeX']=_0xec6c52['x'],this[_0x202e84(0x1c3)]=this['_homeY']=_0xec6c52['y'],this[_0x202e84(0x287)]=_0xec6c52[_0x202e84(0x34c)],this[_0x202e84(0x19b)]=_0xec6c52['height'],this[_0x202e84(0x215)]=0x0;},Window_STB_TurnOrder[_0x15047e(0x21b)][_0x15047e(0x20a)]=function(_0xd1d6ff,_0x4256f0,_0x189595){const _0xc13620=_0x15047e,_0x2ca74=Window_STB_TurnOrder[_0xc13620(0x2bc)],_0x2c0d56=this['isHorz']()?_0x2ca74[_0xc13620(0x15d)]:_0x2ca74[_0xc13620(0x324)],_0x4dd6df=Math['min'](_0x2c0d56,_0xd1d6ff+_0x4256f0),_0x5f18aa=SceneManager[_0xc13620(0x20c)][_0xc13620(0x30e)]['height'],_0x50fe51=SceneManager[_0xc13620(0x20c)][_0xc13620(0x193)][_0xc13620(0x313)],_0x3d2696=_0x2ca74['SubjectDistance'],_0x4b66d8=Graphics[_0xc13620(0x313)]-_0x5f18aa-_0x50fe51;let _0x4716f0=0x0,_0x9101f8=0x0,_0x367f17=0x0,_0x82214a=0x0;switch(_0x2ca74[_0xc13620(0x253)]){case _0xc13620(0x2c4):_0x4716f0=_0x2ca74[_0xc13620(0x184)]*_0x4dd6df+_0x3d2696,_0x9101f8=_0x2ca74[_0xc13620(0x22c)],_0x367f17=Math[_0xc13620(0x1e9)]((Graphics[_0xc13620(0x34c)]-_0x4716f0)/0x2),_0x82214a=_0x2ca74[_0xc13620(0x1c9)];break;case _0xc13620(0x2ba):_0x4716f0=_0x2ca74[_0xc13620(0x184)]*_0x4dd6df+_0x3d2696,_0x9101f8=_0x2ca74[_0xc13620(0x22c)],_0x367f17=Math[_0xc13620(0x1e9)]((Graphics[_0xc13620(0x34c)]-_0x4716f0)/0x2),_0x82214a=Graphics[_0xc13620(0x313)]-_0x5f18aa-_0x9101f8-_0x2ca74[_0xc13620(0x1c9)];break;case'left':_0x4716f0=_0x2ca74[_0xc13620(0x22c)],_0x9101f8=_0x2ca74['SpriteThin']*_0x4dd6df+_0x3d2696,_0x367f17=_0x2ca74[_0xc13620(0x1c9)],_0x82214a=Math[_0xc13620(0x1e9)]((_0x4b66d8-_0x9101f8)/0x2),_0x82214a+=_0x50fe51;break;case _0xc13620(0x192):_0x4716f0=_0x2ca74[_0xc13620(0x22c)],_0x9101f8=_0x2ca74[_0xc13620(0x184)]*_0x4dd6df+_0x3d2696,_0x367f17=Graphics[_0xc13620(0x34c)]-_0x4716f0-_0x2ca74[_0xc13620(0x1c9)],_0x82214a=Math[_0xc13620(0x1e9)]((_0x4b66d8-_0x9101f8)/0x2),_0x82214a+=_0x50fe51;break;}if(!_0x189595){const _0x129039=Window_STB_TurnOrder[_0xc13620(0x2bc)][_0xc13620(0x236)];let _0x205117=Math['min'](_0x2c0d56,Math[_0xc13620(0x28c)]($gameParty[_0xc13620(0x1f3)]()+0x8)-_0x4dd6df);switch(_0x2ca74[_0xc13620(0x253)]){case _0xc13620(0x2c4):case _0xc13620(0x2ba):_0x129039&&(_0x367f17-=_0x205117*_0x2ca74[_0xc13620(0x184)]);break;}}return _0x367f17+=_0x2ca74['DisplayOffsetX'],_0x82214a+=_0x2ca74['DisplayOffsetY'],new Rectangle(_0x367f17,_0x82214a,_0x4716f0,_0x9101f8);},Window_STB_TurnOrder[_0x15047e(0x21b)][_0x15047e(0x2d5)]=function(){const _0x4db3d9=_0x15047e;this[_0x4db3d9(0x2b8)]=0x0;},Window_STB_TurnOrder[_0x15047e(0x21b)][_0x15047e(0x1a5)]=function(){const _0x376d6d=_0x15047e,_0x5a7a55=Window_STB_TurnOrder['Settings'],_0x6b76eb=[_0x376d6d(0x2c4),_0x376d6d(0x2ba)][_0x376d6d(0x26f)](_0x5a7a55[_0x376d6d(0x253)]);return _0x6b76eb;},Window_STB_TurnOrder[_0x15047e(0x21b)][_0x15047e(0x225)]=function(){const _0x415769=_0x15047e;this[_0x415769(0x34d)]=new Sprite(),this['addInnerChild'](this[_0x415769(0x34d)]),this['_turnOrderContainer']=[];for(let _0x35095d=0x0;_0x35095d<$gameParty[_0x415769(0x1f3)]();_0x35095d++){if(_0x415769(0x211)===_0x415769(0x285)){const _0x138462=this[_0x415769(0x2a1)]();if(!_0x138462)return;let _0x25050a=![];if(this[_0x415769(0x264)]!==_0x138462[_0x415769(0x34c)])_0x25050a=!![];else this[_0x415769(0x2a4)]!==_0x138462[_0x415769(0x313)]&&(_0x25050a=!![]);_0x25050a&&this[_0x415769(0x2ee)]();}else{const _0x56f496=new Sprite_STB_TurnOrder_Battler($gameParty,_0x35095d);this[_0x415769(0x34d)]['addChild'](_0x56f496),this[_0x415769(0x304)][_0x415769(0x1bc)](_0x56f496);}}for(let _0x61bf41=0x0;_0x61bf41<$gameTroop[_0x415769(0x26a)]()['length'];_0x61bf41++){const _0x25946e=new Sprite_STB_TurnOrder_Battler($gameTroop,_0x61bf41);this[_0x415769(0x34d)][_0x415769(0x26d)](_0x25946e),this[_0x415769(0x304)][_0x415769(0x1bc)](_0x25946e);}},Window_STB_TurnOrder[_0x15047e(0x21b)][_0x15047e(0x289)]=function(){const _0x2b03aa=_0x15047e;Window_Base['prototype'][_0x2b03aa(0x289)][_0x2b03aa(0x1f8)](this),this['updateHomePosition'](),this['updatePosition'](),this[_0x2b03aa(0x32e)](),this[_0x2b03aa(0x1b6)](),this[_0x2b03aa(0x1c6)]();},Window_STB_TurnOrder[_0x15047e(0x21b)][_0x15047e(0x238)]=function(){const _0x1eeff5=_0x15047e;if(this[_0x1eeff5(0x215)]>0x0){const _0x5a7734=this[_0x1eeff5(0x215)];this['_homeX']=(this[_0x1eeff5(0x21d)]*(_0x5a7734-0x1)+this[_0x1eeff5(0x2de)])/_0x5a7734,this[_0x1eeff5(0x2c6)]=(this[_0x1eeff5(0x2c6)]*(_0x5a7734-0x1)+this[_0x1eeff5(0x1c3)])/_0x5a7734,this[_0x1eeff5(0x215)]--,this[_0x1eeff5(0x215)]<=0x0&&(this['_homeX']=this[_0x1eeff5(0x2de)],this[_0x1eeff5(0x2c6)]=this[_0x1eeff5(0x1c3)]);}},Window_STB_TurnOrder[_0x15047e(0x21b)][_0x15047e(0x331)]=function(){const _0x7abf5c=_0x15047e,_0x3eb0fd=Window_STB_TurnOrder[_0x7abf5c(0x2bc)];if(_0x3eb0fd[_0x7abf5c(0x253)]!==_0x7abf5c(0x2c4))return;if(!_0x3eb0fd[_0x7abf5c(0x318)])return;const _0x649ade=SceneManager['_scene'][_0x7abf5c(0x193)];if(!_0x649ade)return;_0x649ade[_0x7abf5c(0x261)]?_0x7abf5c(0x346)!==_0x7abf5c(0x16f)?(this['x']=this[_0x7abf5c(0x21d)]+(_0x3eb0fd[_0x7abf5c(0x2fa)]||0x0),this['y']=this[_0x7abf5c(0x2c6)]+(_0x3eb0fd['RepositionTopHelpY']||0x0)):(this[_0x7abf5c(0x251)]=_0x542508[_0x7abf5c(0x1ff)](),_0x17fef9=_0x450d8e[_0x7abf5c(0x292)](this[_0x7abf5c(0x251)]),_0x220769[_0x7abf5c(0x2d4)](this['changeSvActorGraphicBitmap'][_0x7abf5c(0x32b)](this,_0x2931a1))):(this['x']=this[_0x7abf5c(0x21d)],this['y']=this[_0x7abf5c(0x2c6)]);const _0x46d8c8=SceneManager[_0x7abf5c(0x20c)][_0x7abf5c(0x1ee)];Window_STB_TurnOrder[_0x7abf5c(0x31d)]===undefined&&(Window_STB_TurnOrder['_ogWindowLayerX']=Math[_0x7abf5c(0x205)]((Graphics['width']-Math[_0x7abf5c(0x28c)](Graphics[_0x7abf5c(0x291)],_0x46d8c8[_0x7abf5c(0x34c)]))/0x2),Window_STB_TurnOrder[_0x7abf5c(0x186)]=Math['round']((Graphics[_0x7abf5c(0x313)]-Math[_0x7abf5c(0x28c)](Graphics['boxHeight'],_0x46d8c8[_0x7abf5c(0x313)]))/0x2)),this['x']+=_0x46d8c8['x']-Window_STB_TurnOrder['_ogWindowLayerX'],this['y']+=_0x46d8c8['y']-Window_STB_TurnOrder[_0x7abf5c(0x186)];},Window_STB_TurnOrder[_0x15047e(0x21b)]['updateSidePosition']=function(){const _0x267dde=_0x15047e,_0x5dbc5f=Window_STB_TurnOrder[_0x267dde(0x2bc)];if([_0x267dde(0x2c4)][_0x267dde(0x26f)](_0x5dbc5f[_0x267dde(0x253)]))return;this['x']=this[_0x267dde(0x21d)],this['y']=this[_0x267dde(0x2c6)];const _0x392860=SceneManager[_0x267dde(0x20c)][_0x267dde(0x1ee)];this['x']+=_0x392860['x'],this['y']+=_0x392860['y'];},Window_STB_TurnOrder[_0x15047e(0x21b)]['updateBattleContainerOrder']=function(){const _0x5841b0=_0x15047e;if(!this['_turnOrderInnerSprite'])return;const _0x574d43=this[_0x5841b0(0x34d)][_0x5841b0(0x2ae)];if(!_0x574d43)return;_0x574d43[_0x5841b0(0x1cb)](this['compareBattlerSprites'][_0x5841b0(0x32b)](this));},Window_STB_TurnOrder[_0x15047e(0x21b)][_0x15047e(0x2e8)]=function(_0x49790a,_0x4b7098){const _0x71f860=_0x15047e,_0x57f325=this['isHorz'](),_0x59faf6=Window_STB_TurnOrder[_0x71f860(0x2bc)][_0x71f860(0x236)];if(_0x57f325&&!_0x59faf6){if(_0x71f860(0x1f7)===_0x71f860(0x1f7))return _0x49790a['x']-_0x4b7098['x'];else _0x143d2d[_0x71f860(0x353)][_0x71f860(0x1f8)](this,_0x187447,_0x57b3f8);}else{if(_0x57f325&&_0x59faf6)return _0x4b7098['x']-_0x49790a['x'];else{if(!_0x57f325&&_0x59faf6){if(_0x71f860(0x2f4)!==_0x71f860(0x2b4))return _0x49790a['y']-_0x4b7098['y'];else{const _0x2fe1cb=this[_0x71f860(0x1db)]();if(!_0x2fe1cb)return;if(this[_0x71f860(0x200)]===_0x2fe1cb[_0x71f860(0x198)]()&&this[_0x71f860(0x223)]===_0x2fe1cb[_0x71f860(0x241)]())return;this[_0x71f860(0x200)]=_0x2fe1cb[_0x71f860(0x198)](),this[_0x71f860(0x223)]=_0x2fe1cb[_0x71f860(0x241)]();let _0x14ef76=this[_0x71f860(0x200)]&&this[_0x71f860(0x223)]?0xff:0x0;this[_0x71f860(0x1fb)](_0x14ef76);}}else{if(!_0x57f325&&!_0x59faf6){if('vmTCY'===_0x71f860(0x20e)){if(!this[_0x71f860(0x1a5)]())return;const _0x25e6c3=_0x5431d0[_0x71f860(0x33b)][_0x71f860(0x2bc)][_0x71f860(0x268)];if(!_0x25e6c3[_0x71f860(0x18d)])return;const _0x1d6740=_0x1fd241[_0x71f860(0x26a)]()[_0x71f860(0x233)](_0x1aa14b=>_0x1aa14b&&_0x1aa14b[_0x71f860(0x198)]()&&_0x1aa14b[_0x71f860(0x241)]())[_0x71f860(0x338)],_0x5ce788=_0x3ef7f8['members']()[_0x71f860(0x233)](_0x321e31=>_0x321e31&&_0x321e31['isAlive']()&&_0x321e31[_0x71f860(0x241)]())[_0x71f860(0x338)],_0x4dca95=this[_0x71f860(0x20a)](_0x1d6740,_0x5ce788);this[_0x71f860(0x2de)]=_0x4dca95['x'],this[_0x71f860(0x1c3)]=_0x4dca95['y'],(this[_0x71f860(0x2de)]!==this[_0x71f860(0x21d)]||this[_0x71f860(0x1c3)]!==this[_0x71f860(0x2c6)])&&(this['_homeDuration']=_0x25e6c3['UpdateFrames']);}else return _0x4b7098['y']-_0x49790a['y'];}}}}},Window_STB_TurnOrder[_0x15047e(0x21b)][_0x15047e(0x1c6)]=function(){const _0x2f0e43=_0x15047e;this[_0x2f0e43(0x261)]=$gameSystem[_0x2f0e43(0x2e6)]();},Window_STB_TurnOrder[_0x15047e(0x21b)][_0x15047e(0x327)]=function(_0x7f059e){const _0x54d9d2=_0x15047e;this[_0x54d9d2(0x304)][_0x54d9d2(0x1cb)]((_0x1b94f6,_0x1918a7)=>{const _0x2f8622=_0x54d9d2;if(_0x2f8622(0x250)!==_0x2f8622(0x250))this[_0x2f8622(0x15e)]&&(!this[_0x2f8622(0x316)][_0x2f8622(0x26f)](this[_0x2f8622(0x15e)])&&this[_0x2f8622(0x316)][_0x2f8622(0x169)](this[_0x2f8622(0x15e)])),this[_0x2f8622(0x15e)]=this[_0x2f8622(0x32c)]();else return _0x1b94f6[_0x2f8622(0x15c)]()-_0x1918a7[_0x2f8622(0x15c)]();}),this[_0x54d9d2(0x1b9)]();if(!_0x7f059e)return;for(const _0x264139 of this[_0x54d9d2(0x304)]){if(!_0x264139)continue;_0x264139[_0x54d9d2(0x289)](),_0x264139['_positionDuration']=0x0;}},Window_STB_TurnOrder[_0x15047e(0x21b)][_0x15047e(0x1b9)]=function(){const _0x317e7e=_0x15047e;if(!this[_0x317e7e(0x1a5)]())return;const _0xcc5d88=VisuMZ[_0x317e7e(0x33b)]['Settings'][_0x317e7e(0x268)];if(!_0xcc5d88[_0x317e7e(0x18d)])return;const _0x333b1e=$gameParty['members']()[_0x317e7e(0x233)](_0x7f6431=>_0x7f6431&&_0x7f6431[_0x317e7e(0x198)]()&&_0x7f6431['isAppeared']())[_0x317e7e(0x338)],_0x5eb139=$gameTroop[_0x317e7e(0x26a)]()[_0x317e7e(0x233)](_0x461b33=>_0x461b33&&_0x461b33[_0x317e7e(0x198)]()&&_0x461b33['isAppeared']())[_0x317e7e(0x338)],_0x14af6e=this['createBattlerRect'](_0x333b1e,_0x5eb139);this[_0x317e7e(0x2de)]=_0x14af6e['x'],this['_targetHomeY']=_0x14af6e['y'];if(this[_0x317e7e(0x2de)]!==this[_0x317e7e(0x21d)]||this[_0x317e7e(0x1c3)]!==this[_0x317e7e(0x2c6)]){if(_0x317e7e(0x23a)===_0x317e7e(0x23a))this['_homeDuration']=_0xcc5d88[_0x317e7e(0x24e)];else{_0x2f80a5[_0x317e7e(0x269)](_0x15642c,_0x1b3f16);const _0x2feecc=_0x4ae4ed[_0x317e7e(0x183)];_0x47b9f5['setBattleSystemSTBTurnOrderVisible'](_0x2feecc);}}};