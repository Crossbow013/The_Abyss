//=============================================================================
// VisuStella MZ - Battle System - OTB - Order Turn Battle
// VisuMZ_2_BattleSystemOTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemOTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemOTB = VisuMZ.BattleSystemOTB || {};
VisuMZ.BattleSystemOTB.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.10] [BattleSystemOTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_OTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the RPG Maker MZ battle system to "Order Turn Battle",
 * a turn-based battle system where actions are executed immediately and the
 * orders for both the current and next turn are not only visible, but also
 * malleable. New mechanics are introduced where the player can manipulate the
 * turn order of an action's user or action's target in various ways they want.
 * 
 * The two Turn Orders are displayed at the top of the top of the screen to
 * give the player a clear understanding of who's turn it will be when it
 * becomes time to act, making it easier and viable for the player to formulate
 * strategies and adapt to the situation in battle.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "otb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * Two Turn Order Displays appear at the top of the screen, giving the player
 *   an idea of who's turn it will be and when, for both the current turn and
 *   the next turn.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * Skills and Items can manipulate the turn order of the action's user or the
 *   action's target(s). This can apply to either the current turn or the next
 *   turn, depending on the notetags and/or action effects used.
 * * The Turn Order Display will give a preview on how turn orders will change
 *   upon specific skills and/or items being used.
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
 * Turn Order Displays
 * 
 * The Two Turn Order Displays will capture the battle's current and next turn
 * orders determined by the BattleManager. This feature does not overwrite any
 * functions, but the Turn Order Displays may or may not conflict with any
 * existing HUD elements that are already positioned on the screen. If so, you
 * can choose to offset the Turn Order Display or move it to a different part
 * of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Agility
 * 
 * Agility behaves slightly different from normal when it comes to the Order
 * Turn Battle system. Aside from the first turn in battle, agility will always
 * calculate the turn order for the "Next Turn" when conducted. This means that
 * any changes to agility values will not have any effect on the next turn's
 * already established turn order.
 * 
 * However, this can be remedied by utilizing the notetags provided by this
 * plugin to alter the Next Turn orders for specific targets. In fact, for
 * skill and item "effects" that add AGI Buffs and/or Debuffs, the target's
 * turn position on the Turn Order Display will be manipulated in accordance.
 * This auto-conversion feature can be disabled in the Plugin Parameters.
 * 
 * ---
 * 
 * Action Speed
 * 
 * Because the Order Turn Battle system already calculates agility speeds
 * before selecting an action to perform, the effects of the actioon speed will
 * not work the same way it did with the default battle system. Instead, the
 * Action Speed will be sent through a formula to determine its effect on the
 * following turn, either pushing the user ahead in next turn's turn order
 * (with a positive speed value) or back (with a negative speed value).
 * 
 * This option can have its formula altered or straight up disabled in the
 * Plugin Parameters.
 * 
 * ---
 * 
 * Infinity Speed and Clamping
 * 
 * Since Action Speeds are decided in such a way, enemies that will survive a
 * stun state past two turns will have "Infinity" speed on the recovery turn,
 * allowing them to act first relative to the rest of the battle participants
 * in order to balance out the turns they've lost.
 * 
 * Enemies with "Infinity" speed cannot be overtaken through turn order
 * manipulation while they are on the "Next Turn" order. If anything, battlers
 * who shift their turn order faster will be just trailing behind them, thus
 * the "clamping" effect. However if this occurs during the "Current Turn"
 * order, all is fair game and any battler can overtake them. Plan out your
 * battle system effects carefully with these rules in mind.
 * 
 * If you do not like the idea of Infinity Speed and/or Clamping, you can turn
 * them off in the Plugin Parameters.
 * 
 * This effect does not affect stun states that last only one turn. The effect
 * will only occur with stun states that last 2 turns or more.
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
 * Force Actions
 * 
 * Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 * system. With other battle systems, force actions are added into a hidden
 * queue that would act upon after the current battler finishes his/her current
 * action. The new changes made with force actions is that they now appear on
 * the queue visibly.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_2_PartySystem
 * 
 * In battle, the player cannot change entire parties at once from the Party
 * Command Window. The feature will be unaccessible while Order Turn Battle is
 * in play. However, the player can still change party members through the
 * Actor Command Window by having actors replace other actors. Party changing
 * is also available through battle events, Common Events, and script calls.
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
 * === General OTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <OTB Help>
 *  description
 *  description
 * </OTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under OTB.
 * - This is primarily used if the skill behaves differently in OTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to OTB.
 *
 * ---
 * 
 * === OTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the OTB Turn Order Display
 * 
 * ---
 *
 * <OTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <OTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <OTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <OTB Instant>
 * <OTB Instant Use>
 * <OTB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Added Action Notetags ===
 * 
 * ---
 * 
 * <OTB User Add Current Turn Actions: x>
 * <OTB User Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the user to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * <OTB Target Add Current Turn Actions: x>
 * <OTB Target Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the target to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * === Turn Order Manipulation-Related Notetags ===
 * 
 * ---
 *
 * <OTB User Current Turn: +x>
 * <OTB User Next Turn: +x>
 * <OTB User Follow Turn: +x>
 *
 * <OTB User Current Turn: -x>
 * <OTB User Next Turn: -x>
 * <OTB User Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the user's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the user has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the user closer to the front.
 *   - Positive numbers move the user towards the back.
 * - This effect only occurs once per skill/item use and at the start of the
 *   action when initializing the skill/item.
 *
 * ---
 *
 * <OTB Target Current Turn: +x>
 * <OTB Target Next Turn: +x>
 * <OTB Target Follow Turn: +x>
 *
 * <OTB Target Current Turn: -x>
 * <OTB Target Next Turn: -x>
 * <OTB Target Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the target has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the target closer to the front.
 *   - Positive numbers move the target towards the back.
 * - This effect will occur as many times as there are successfully connected
 *   hits for each target, meaning a target can have its turn order shifted
 *   multiple times.
 * - These are best used with single target skills/items as multi-target skills
 *   may shift multiple targets back and forth with each other if they are
 *   adjacent to one another.
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
 * Actor: Change OTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the OTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change OTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the OTB Turn Order.
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
 * Actor: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the actor(s).
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
 * Enemy: Change OTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change OTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
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
 * Enemy: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the enemy(ies).
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
 * System: OTB Turn Order Visibility
 * - Determine the visibility of the OTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the OTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Conversion Settings
 * ============================================================================
 *
 * Automatically converts specific mechanics to fit OTB.
 *
 * ---
 *
 * Buffs
 * 
 *   AGI Buff => Current:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Buff => Next:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * Debuffs
 * 
 *   AGI Debuff => Current:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Debuff => Next:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of Battle System OTB. These range from how Action
 * Times are handled to speed.
 *
 * ---
 *
 * Action Times+
 * 
 *   Enable Action Times?:
 *   - Enable Action Times+ to have an effect on OTB?
 * 
 *     Randomize Order?:
 *     - If enabled, randomize the action order for added actions?
 *
 * ---
 *
 * Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   Post-Stun Infinity?:
 *   - After a 2+ turn stun states, battlers have infinity speed for their
 *     recovery turn.
 *   - Once again, this only applies to stun states that last 2+ turns.
 * 
 *     Infinity Clamp?:
 *     - Prevents turn order manipulation from going faster than infinity
 *       speed battlers.
 * 
 *   JS: Initial Speed:
 *   - Code used to calculate initial speed at the start of battle.
 * 
 *   JS: Speed => Order:
 *   - Code used to calculate how action speeds alter next turn's order.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System OTB. These adjust how the
 * two visible turn orders appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 *     - Top
 *     - Bottom
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *     Offset X:
 *     - Reposition the display's X coordinates by this much when the Help
 *       Window is visible.
 * 
 *     Offset Y:
 *     - Reposition the display's Y coordinates by this much when the Help
 *       Window is visible.
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *     - Left to Right
 *     - Right to Left
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
 * UI Background
 * 
 *   Background Style:
 *   - Select the style you want for the background.
 *     - fill
 *     - gradient
 *     - image
 *     - transparent
 * 
 *   Image Filename:
 *   - When using the "image" style, select an image from /img/system/ as the
 *     background image.
 * 
 *     Offset X:
 *     - How much do you want to offset the Background Image's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Background Image's Y position?
 * 
 * ---
 * 
 * UI Text
 * 
 *   Font Size:
 *   - The font size used for parameter values.
 * 
 *   Active Battler Text:
 *   - Text used to display the active battler.
 *   - This text will always be center aligned.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Current Turn Text:
 *   - Text used to display the current turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Next Turn Text:
 *   - Text used to display the next turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Text Align:
 *   - Text alignment for the Current and Next Turn texts?
 *     - auto
 *     - left
 *     - center
 *     - right
 * 
 * ---
 * 
 * Slots
 * 
 *   Width:
 *   - How many pixels wide should the slots be on the Turn Order display?
 * 
 *   Height:
 *   - How many pixels tall should the slots be on the Turn Order display?
 * 
 *   Preview Scale:
 *   - How much do you want to scale the preview sprites by?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *     Offset X:
 *     - How much do you want to offset the Preview Sprites' X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Preview Sprites' Y position?
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
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
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
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
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
 * Version 1.10: July 7, 2022
 * * Feature Update!
 * ** When the "Recover All" event command revives a dead unit, that revived
 *    unit can gain actions back if all other conditions are met. Update made
 *    by Olivia.
 * 
 * Version 1.09: June 2, 2022
 * * Documentation Update!
 * ** Added "Force Actions" to "Major Updates" section.
 * *** Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 *     system. With other battle systems, force actions are added into a hidden
 *     queue that would act upon after the current battler finishes his/her
 *     current action. The new changes made with force actions is that they now
 *     appear on the queue visibly.
 * * Bug Fixes!
 * ** Fixed a bug that caused Forced Actions to not work properly while in OTB.
 *    Changes made to Forced Actions will now insert new actions at the front
 *    of the current action queue. Fix made by Olivia.
 * 
 * Version 1.08: March 10, 2022
 * * Feature Update!
 * ** OTB Instant Actions should now appear in the turn order in a more
 *    sensible fashion. Update made by Olivia.
 * 
 * Version 1.07: February 24, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia:
 * *** <OTB User Add Current Turn Actions: x>
 * *** <OTB User Add Next Turn Actions: x>
 * *** <OTB Target Add Current Turn Actions: x>
 * *** <OTB Target Add Next Turn Actions: x>
 * **** Adds extra actions for the user/target to perform during the
 *      current/next turn.
 * **** Added actions will go towards the back of the action list.
 * **** Multi-hit skills/items will trigger this effect multiple times.
 * 
 * Version 1.05: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.04: August 6, 2021
 * * Bug Fixes!
 * ** Enemies with multiple actions will no longer step forward when it's not
 *    their turn. Fix made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Post-stun infinity clamping should now be adjusted properly for
 *    previewing turn order changes.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Subsequent battles will properly reset the turn order. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: April 26, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderActorIcon
 * @text Actor: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the OTB Turn Order.
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
 * @command OtbTurnOrderActorFace
 * @text Actor: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the OTB Turn Order.
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
 * @command OtbTurnOrderClearActorGraphic
 * @text Actor: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the actor(s).
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
 * @command OtbTurnOrderEnemyIcon
 * @text Enemy: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
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
 * @command OtbTurnOrderEnemyFace
 * @text Enemy: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
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
 * @command OtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the enemy(ies).
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
 * @text System: OTB Turn Order Visibility
 * @desc Determine the visibility of the OTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the OTB Turn Order Display.
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
 * @param BattleSystemOTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Conversion:struct
 * @text Conversion Settings
 * @type struct<Conversion>
 * @desc Automatically converts specific mechanics to fit OTB.
 * @default {"Buffs":"","ConvertAgiBuffCurrent:eval":"true","ConvertAgiBuffNext:eval":"true","Debuffs":"","ConvertAgiDebuffCurrent:eval":"true","ConvertAgiDebuffNext:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of Battle System OTB.
 * @default {"Actions":"","EnableActionTimes:eval":"true","RandomizeActionTimesOrder:eval":"true","Speed":"","AllowRandomSpeed:eval":"false","PostStunInfinitySpeed:eval":"true","InfinityClamp:eval":"true","InitialSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Return Speed\\nreturn speed;\"","ConvertSpeedJS:func":"\"// Declare Constants\\nconst item = this.item();\\nconst modifier = 50;\\n\\n// Calculate Order Slots Changed\\nlet change = item.speed / (-modifier);\\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\\n\\n// Return Change\\nreturn change || 0;\""}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System OTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionTopHelpX:num":"+0","RepositionTopHelpY:num":"+96","RepositionLogWindow:eval":"true","LogWindowOffsetY:num":"+0","OrderDirection:eval":"false","SubjectDistance:num":"16","ScreenBuffer:num":"36","UiBackground":"","BgDimStyle:str":"gradient","BgImageFilename:str":"","BgImageOffsetX:num":"+0","BgImageOffsetY:num":"+0","UiText":"","UiFontSize:num":"16","UiSubjectText:str":"★","UiSubjectOffsetX:num":"+0","UiSubjectOffsetY:num":"-6","UiCurrentText:str":"✦CURRENT TURN✦","UiCurrentOffsetX:num":"+6","UiCurrentOffsetY:num":"-6","UiNextText:str":"✧NEXT TURN✧","UiNextOffsetX:num":"+6","UiNextOffsetY:num":"-6","UiAlignment:str":"auto","Slots":"","SpriteThin:num":"72","SpriteLength:num":"72","PreviewScale:num":"0.5","PreviewOffsetX:num":"+0","PreviewOffsetY:num":"+0","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","PreviewActorBorderColor:str":"0","ActorSystemBorder:str":"","PreviewActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","PreviewEnemyBorderColor:str":"0","EnemySystemBorder:str":"","PreviewEnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","PreviewActorBgColor1:str":"19","ActorBgColor2:str":"9","PreviewActorBgColor2:str":"0","ActorSystemBg:str":"","PreviewActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","PreviewEnemyBgColor1:str":"19","EnemyBgColor2:str":"18","PreviewEnemyBgColor2:str":"0","EnemySystemBg:str":"","PreviewEnemySystemBg:str":""}
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
 * Conversion Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Conversion:
 * 
 * @param Buffs
 *
 * @param ConvertAgiBuffCurrent:eval
 * @text AGI Buff => Current
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiBuffNext:eval
 * @text AGI Buff => Next
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 * 
 * @param Debuffs
 *
 * @param ConvertAgiDebuffCurrent:eval
 * @text AGI Debuff => Current
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiDebuffNext:eval
 * @text AGI Debuff => Next
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Actions
 * @text Action Times+
 *
 * @param EnableActionTimes:eval
 * @text Enable Action Times?
 * @parent Actions
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Action Times+ to have an effect on OTB?
 * @default true
 *
 * @param RandomizeActionTimesOrder:eval
 * @text Randomize Order?
 * @parent EnableActionTimes:eval
 * @type boolean
 * @on Randomize
 * @off Clumped
 * @desc If enabled, randomize the action order for added actions?
 * @default true
 * 
 * @param Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent Speed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param PostStunInfinitySpeed:eval
 * @text Post-Stun Infinity?
 * @parent Speed
 * @type boolean
 * @on Infinity
 * @off Normal
 * @desc After a 2+ turn stun states, battlers have infinity speed for their recovery turn.
 * @default true
 *
 * @param InfinityClamp:eval
 * @text Infinity Clamp?
 * @parent PostStunInfinitySpeed:eval
 * @type boolean
 * @on Enable Clamp
 * @off Disable Clamp
 * @desc Prevents turn order manipulation from going faster than infinity speed battlers.
 * @default true
 *
 * @param InitialSpeedJS:func
 * @text JS: Initial Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ConvertSpeedJS:func
 * @text JS: Speed => Order
 * @parent Speed
 * @type note
 * @desc Code used to calculate how action speeds alter next turn's order.
 * @default "// Declare Constants\nconst item = this.item();\nconst modifier = 50;\n\n// Calculate Order Slots Changed\nlet change = item.speed / (-modifier);\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\n\n// Return Change\nreturn change || 0;"
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
 * @param RepositionTopHelpX:num
 * @text Offset X
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default +0
 *
 * @param RepositionTopHelpY:num
 * @text Offset Y
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default +96
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
 * @param LogWindowOffsetY:num
 * @text Offset Y
 * @parent RepositionLogWindow:eval
 * @desc How much do you want to offset the Log Window's Y position?
 * @default +0
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right
 * @off Right to Left
 * @desc Decide on the direction of the Turn Order.
 * @default false
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 16
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 36
 *
 * @param UiBackground
 * @text UI Background
 *
 * @param BgDimStyle:str
 * @text Background Style
 * @parent UiBackground
 * @type select
 * @option fill
 * @option gradient
 * @option image
 * @option transparent
 * @desc Select the style you want for the background.
 * @default gradient
 *
 * @param BgImageFilename:str
 * @text Image Filename
 * @parent UiBackground
 * @type file
 * @dir img/system/
 * @desc When using the "image" style, select an image from /img/system/ as the background image.
 * @default 
 *
 * @param BgImageOffsetX:num
 * @text Offset X
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's X position?
 * @default +0
 *
 * @param BgImageOffsetY:num
 * @text Offset Y
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's Y position?
 * @default +0
 *
 * @param UiText
 * @text UI Text
 *
 * @param UiFontSize:num
 * @text Font Size
 * @parent UiText
 * @desc The font size used for parameter values.
 * @default 16
 *
 * @param UiSubjectText:str
 * @text Active Battler Text
 * @parent UiText
 * @desc Text used to display the active battler.
 * This text will always be center aligned.
 * @default ★
 *
 * @param UiSubjectOffsetX:num
 * @text Offset X
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's X position?
 * @default +0
 *
 * @param UiSubjectOffsetY:num
 * @text Offset Y
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiCurrentText:str
 * @text Current Turn Text
 * @parent UiText
 * @desc Text used to display the current turn.
 * @default ✦CURRENT TURN✦
 *
 * @param UiCurrentOffsetX:num
 * @text Offset X
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiCurrentOffsetY:num
 * @text Offset Y
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiNextText:str
 * @text Next Turn Text
 * @parent UiText
 * @desc Text used to display the next turn.
 * @default ✧NEXT TURN✧
 *
 * @param UiNextOffsetX:num
 * @text Offset X
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiNextOffsetY:num
 * @text Offset Y
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiAlignment:str
 * @text Text Align
 * @parent UiText
 * @type combo
 * @option auto
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Current and Next Turn texts?
 * @default auto
 * 
 * @param Slots
 *
 * @param SpriteThin:num
 * @text Width
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels wide should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteLength:num
 * @text Height
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels tall should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param PreviewScale:num
 * @text Preview Scale
 * @parent Slots
 * @desc How much do you want to scale the preview sprites by?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param PreviewOffsetX:num
 * @text Offset X
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' X position?
 * @default +0
 *
 * @param PreviewOffsetY:num
 * @text Offset Y
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' Y position?
 * @default +0
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
 * @param PreviewActorBorderColor:str
 * @text Preview Version
 * @parent ActorBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBorder:str
 * @text Preview Version
 * @parent ActorSystemBorder:str
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
 * @param PreviewEnemyBorderColor:str
 * @text Preview Version
 * @parent EnemyBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBorder:str
 * @text Preview Version
 * @parent EnemySystemBorder:str
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
 * @param PreviewActorBgColor1:str
 * @text Preview Version
 * @parent ActorBgColor1:str
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
 * @param PreviewActorBgColor2:str
 * @text Preview Version
 * @parent ActorBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBg:str
 * @text Preview Version
 * @parent ActorSystemBg:str
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
 * @param PreviewEnemyBgColor1:str
 * @text Preview Version
 * @parent EnemyBgColor1:str
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
 * @param PreviewEnemyBgColor2:str
 * @text Preview Version
 * @parent EnemyBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBg:str
 * @text Preview Version
 * @parent EnemySystemBg:str
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

const _0x324937=_0x4ab9;(function(_0x31d1e8,_0x4296d4){const _0xd3533c=_0x4ab9,_0x46db1e=_0x31d1e8();while(!![]){try{const _0x36bc5a=-parseInt(_0xd3533c(0x2db))/0x1*(parseInt(_0xd3533c(0x213))/0x2)+parseInt(_0xd3533c(0x122))/0x3+-parseInt(_0xd3533c(0x33e))/0x4*(-parseInt(_0xd3533c(0x2bd))/0x5)+-parseInt(_0xd3533c(0x111))/0x6*(-parseInt(_0xd3533c(0x2bf))/0x7)+parseInt(_0xd3533c(0xe7))/0x8+parseInt(_0xd3533c(0x27f))/0x9+parseInt(_0xd3533c(0x1c4))/0xa*(-parseInt(_0xd3533c(0x22c))/0xb);if(_0x36bc5a===_0x4296d4)break;else _0x46db1e['push'](_0x46db1e['shift']());}catch(_0x2cd0e5){_0x46db1e['push'](_0x46db1e['shift']());}}}(_0x2f32,0xe76d7));var label=_0x324937(0x2c8),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x324937(0x1d9)](function(_0xc369c6){const _0x526d2a=_0x324937;return _0xc369c6[_0x526d2a(0x36a)]&&_0xc369c6['description'][_0x526d2a(0x1b5)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x324937(0x16e)]||{},VisuMZ[_0x324937(0x2d4)]=function(_0x478d18,_0x1b51c2){const _0x39b383=_0x324937;for(const _0x16b455 in _0x1b51c2){if(_0x16b455['match'](/(.*):(.*)/i)){const _0x5779c8=String(RegExp['$1']),_0x30c640=String(RegExp['$2'])[_0x39b383(0x18f)]()[_0x39b383(0x2b5)]();let _0x3347fc,_0x11fc96,_0x19d152;switch(_0x30c640){case'NUM':_0x3347fc=_0x1b51c2[_0x16b455]!==''?Number(_0x1b51c2[_0x16b455]):0x0;break;case _0x39b383(0x1f8):_0x11fc96=_0x1b51c2[_0x16b455]!==''?JSON['parse'](_0x1b51c2[_0x16b455]):[],_0x3347fc=_0x11fc96[_0x39b383(0x17d)](_0x5139b3=>Number(_0x5139b3));break;case _0x39b383(0x23d):_0x3347fc=_0x1b51c2[_0x16b455]!==''?eval(_0x1b51c2[_0x16b455]):null;break;case _0x39b383(0x35e):_0x11fc96=_0x1b51c2[_0x16b455]!==''?JSON[_0x39b383(0x21d)](_0x1b51c2[_0x16b455]):[],_0x3347fc=_0x11fc96[_0x39b383(0x17d)](_0x4f3ebd=>eval(_0x4f3ebd));break;case'JSON':_0x3347fc=_0x1b51c2[_0x16b455]!==''?JSON[_0x39b383(0x21d)](_0x1b51c2[_0x16b455]):'';break;case'ARRAYJSON':_0x11fc96=_0x1b51c2[_0x16b455]!==''?JSON[_0x39b383(0x21d)](_0x1b51c2[_0x16b455]):[],_0x3347fc=_0x11fc96[_0x39b383(0x17d)](_0x1f019b=>JSON[_0x39b383(0x21d)](_0x1f019b));break;case'FUNC':_0x3347fc=_0x1b51c2[_0x16b455]!==''?new Function(JSON[_0x39b383(0x21d)](_0x1b51c2[_0x16b455])):new Function(_0x39b383(0x10b));break;case _0x39b383(0x259):_0x11fc96=_0x1b51c2[_0x16b455]!==''?JSON['parse'](_0x1b51c2[_0x16b455]):[],_0x3347fc=_0x11fc96[_0x39b383(0x17d)](_0x1e3272=>new Function(JSON[_0x39b383(0x21d)](_0x1e3272)));break;case'STR':_0x3347fc=_0x1b51c2[_0x16b455]!==''?String(_0x1b51c2[_0x16b455]):'';break;case _0x39b383(0x19c):_0x11fc96=_0x1b51c2[_0x16b455]!==''?JSON[_0x39b383(0x21d)](_0x1b51c2[_0x16b455]):[],_0x3347fc=_0x11fc96[_0x39b383(0x17d)](_0x396c40=>String(_0x396c40));break;case _0x39b383(0x2d0):_0x19d152=_0x1b51c2[_0x16b455]!==''?JSON[_0x39b383(0x21d)](_0x1b51c2[_0x16b455]):{},_0x3347fc=VisuMZ['ConvertParams']({},_0x19d152);break;case'ARRAYSTRUCT':_0x11fc96=_0x1b51c2[_0x16b455]!==''?JSON[_0x39b383(0x21d)](_0x1b51c2[_0x16b455]):[],_0x3347fc=_0x11fc96[_0x39b383(0x17d)](_0x20aedd=>VisuMZ[_0x39b383(0x2d4)]({},JSON[_0x39b383(0x21d)](_0x20aedd)));break;default:continue;}_0x478d18[_0x5779c8]=_0x3347fc;}}return _0x478d18;},(_0x260ede=>{const _0x159a22=_0x324937,_0x2d0f41=_0x260ede[_0x159a22(0x221)];for(const _0x57a327 of dependencies){if(!Imported[_0x57a327]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x159a22(0x2dc)](_0x2d0f41,_0x57a327)),SceneManager[_0x159a22(0x274)]();break;}}const _0x19728c=_0x260ede[_0x159a22(0x292)];if(_0x19728c[_0x159a22(0x2a3)](/\[Version[ ](.*?)\]/i)){const _0x310963=Number(RegExp['$1']);_0x310963!==VisuMZ[label]['version']&&(alert(_0x159a22(0xe4)['format'](_0x2d0f41,_0x310963)),SceneManager[_0x159a22(0x274)]());}if(_0x19728c[_0x159a22(0x2a3)](/\[Tier[ ](\d+)\]/i)){const _0x534f0d=Number(RegExp['$1']);if(_0x534f0d<tier){if('DVGOX'===_0x159a22(0x2b3)){if(!this[_0x159a22(0x1bb)])return;const _0x2d5fe9=_0x31509f[_0x159a22(0x16e)],_0x469852=_0x2d5fe9[_0x159a22(0x29e)];_0x469852?this['_spriteContainer'][_0x159a22(0x287)][_0x159a22(0x229)]((_0x32ef18,_0x1a8499)=>_0x32ef18['x']-_0x1a8499['x']):this[_0x159a22(0x1bb)][_0x159a22(0x287)][_0x159a22(0x229)]((_0x44698c,_0x38bf44)=>_0x38bf44['x']-_0x44698c['x']);}else alert(_0x159a22(0x117)[_0x159a22(0x2dc)](_0x2d0f41,_0x534f0d,tier)),SceneManager[_0x159a22(0x274)]();}else{if('waYkV'!==_0x159a22(0x1d3)){if(!_0x4e2848[_0x159a22(0x22d)]())return;this[_0x159a22(0x2ae)]=0x0;}else tier=Math['max'](_0x534f0d,tier);}}VisuMZ[_0x159a22(0x2d4)](VisuMZ[label]['Settings'],_0x260ede[_0x159a22(0xd8)]);})(pluginData),PluginManager[_0x324937(0x2bc)](pluginData[_0x324937(0x221)],_0x324937(0x368),_0x5aeaf0=>{const _0x3cf832=_0x324937;VisuMZ[_0x3cf832(0x2d4)](_0x5aeaf0,_0x5aeaf0);const _0x8eb29f=_0x5aeaf0['Actors'],_0x29135a=_0x5aeaf0[_0x3cf832(0x147)];for(const _0x46846f of _0x8eb29f){if('xwJFv'===_0x3cf832(0x310)){const _0x1d0fb3=this[_0x3cf832(0x232)]+_0x3eb92b[_0x3cf832(0x1a5)],_0x5e0d7c=_0x1841b0+_0x7a6026['UiCurrentOffsetY'],_0x3df61c=this[_0x3cf832(0x1ba)];this[_0x3cf832(0x2a8)](_0x16c8e0[_0x3cf832(0x2a7)],_0x1d0fb3,_0x5e0d7c,_0x3df61c,_0x2e4bcb);}else{const _0x1771e3=$gameActors[_0x3cf832(0x378)](_0x46846f);if(!_0x1771e3)continue;_0x1771e3[_0x3cf832(0x1ae)]=_0x3cf832(0x353),_0x1771e3['_otbTurnOrderIconIndex']=_0x29135a;}}}),PluginManager['registerCommand'](pluginData[_0x324937(0x221)],_0x324937(0x118),_0xf75a9=>{const _0x4c4bf7=_0x324937;VisuMZ[_0x4c4bf7(0x2d4)](_0xf75a9,_0xf75a9);const _0x521e67=_0xf75a9[_0x4c4bf7(0x215)],_0x402b19=_0xf75a9[_0x4c4bf7(0x2b7)],_0x5e6bf4=_0xf75a9[_0x4c4bf7(0x12d)];for(const _0x3aeeee of _0x521e67){const _0xe8bb17=$gameActors[_0x4c4bf7(0x378)](_0x3aeeee);if(!_0xe8bb17)continue;_0xe8bb17[_0x4c4bf7(0x1ae)]=_0x4c4bf7(0x1c1),_0xe8bb17[_0x4c4bf7(0x2e7)]=_0x402b19,_0xe8bb17[_0x4c4bf7(0xdc)]=_0x5e6bf4;}}),PluginManager[_0x324937(0x2bc)](pluginData[_0x324937(0x221)],_0x324937(0xd6),_0x536d6d=>{const _0x24f264=_0x324937;VisuMZ[_0x24f264(0x2d4)](_0x536d6d,_0x536d6d);const _0x19493=_0x536d6d[_0x24f264(0x215)];for(const _0x1dc967 of _0x19493){if(_0x24f264(0x340)!==_0x24f264(0x374)){const _0x274a6a=$gameActors[_0x24f264(0x378)](_0x1dc967);if(!_0x274a6a)continue;_0x274a6a['clearTurnOrderOTBGraphics']();}else _0x567b73[_0x24f264(0x2c8)][_0x24f264(0x37c)][_0x24f264(0x281)](this);}}),PluginManager[_0x324937(0x2bc)](pluginData[_0x324937(0x221)],_0x324937(0x1aa),_0x35424f=>{const _0x94e15d=_0x324937;VisuMZ['ConvertParams'](_0x35424f,_0x35424f);const _0x1970cc=_0x35424f['Enemies'],_0x3aa251=_0x35424f[_0x94e15d(0x147)];for(const _0x2fcea1 of _0x1970cc){const _0x3171d2=$gameTroop[_0x94e15d(0xf4)]()[_0x2fcea1];if(!_0x3171d2)continue;_0x3171d2[_0x94e15d(0x1ae)]=_0x94e15d(0x353),_0x3171d2[_0x94e15d(0x26f)]=_0x3aa251;}}),PluginManager[_0x324937(0x2bc)](pluginData[_0x324937(0x221)],_0x324937(0x34b),_0x1975da=>{const _0xc99893=_0x324937;VisuMZ[_0xc99893(0x2d4)](_0x1975da,_0x1975da);const _0x456ee9=_0x1975da['Enemies'],_0x2a3747=_0x1975da[_0xc99893(0x2b7)],_0x476957=_0x1975da[_0xc99893(0x12d)];for(const _0x26d2a0 of _0x456ee9){if(_0xc99893(0xca)==='PMZyO'){const _0xfa9fc1=$gameTroop[_0xc99893(0xf4)]()[_0x26d2a0];if(!_0xfa9fc1)continue;_0xfa9fc1['_otbTurnOrderGraphicType']=_0xc99893(0x1c1),_0xfa9fc1['_otbTurnOrderFaceName']=_0x2a3747,_0xfa9fc1[_0xc99893(0xdc)]=_0x476957;}else{if(!this[_0xc99893(0x2cd)]())return;_0x39d81c?_0x5145bc[_0xc99893(0x212)](this,_0x1a66d2,_0x583a36['_actionBattlers']):_0x15d5bb[_0xc99893(0x212)](this,_0x2cda12,_0x345525[_0xc99893(0x159)]);}}}),PluginManager[_0x324937(0x2bc)](pluginData[_0x324937(0x221)],_0x324937(0x278),_0x50a8df=>{const _0x381e92=_0x324937;VisuMZ[_0x381e92(0x2d4)](_0x50a8df,_0x50a8df);const _0x3ffd80=_0x50a8df['Enemies'];for(const _0x780b74 of _0x3ffd80){const _0x2cb21c=$gameTroop[_0x381e92(0xf4)]()[_0x780b74];if(!_0x2cb21c)continue;_0x2cb21c['clearTurnOrderOTBGraphics']();}}),PluginManager['registerCommand'](pluginData['name'],_0x324937(0x136),_0x477eaa=>{const _0x118b42=_0x324937;VisuMZ[_0x118b42(0x2d4)](_0x477eaa,_0x477eaa);const _0x254a54=_0x477eaa[_0x118b42(0x241)];$gameSystem[_0x118b42(0x1ef)](_0x254a54);}),VisuMZ[_0x324937(0x2c8)][_0x324937(0x2a6)]={'Instant':/<OTB (?:INSTANT|INSTANT CAST|INSTANT USE)>/i,'UserFollOrder':/<OTB USER FOLLOW TURN: ([\+\-]\d+)>/i,'UserCurrOrder':/<OTB USER CURRENT TURN: ([\+\-]\d+)>/i,'UserNextOrder':/<OTB USER NEXT TURN: ([\+\-]\d+)>/i,'TargetFollOrder':/<OTB TARGET FOLLOW TURN: ([\+\-]\d+)>/i,'TargetCurrOrder':/<OTB TARGET CURRENT TURN: ([\+\-]\d+)>/i,'TargetNextOrder':/<OTB TARGET NEXT TURN: ([\+\-]\d+)>/i,'UserAddActionCurrent':/<OTB USER ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'UserAddActionNext':/<OTB USER ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionCurrent':/<OTB TARGET ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionNext':/<OTB TARGET ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i},DataManager[_0x324937(0x10d)]=function(_0x3feb19){const _0x235cd3=_0x324937;_0x3feb19=_0x3feb19[_0x235cd3(0x18f)]()[_0x235cd3(0x2b5)](),this[_0x235cd3(0x286)]=this['_stateIDs']||{};if(this[_0x235cd3(0x286)][_0x3feb19])return this['_stateIDs'][_0x3feb19];for(const _0x13b5d1 of $dataStates){if(!_0x13b5d1)continue;this[_0x235cd3(0x286)][_0x13b5d1[_0x235cd3(0x221)][_0x235cd3(0x18f)]()['trim']()]=_0x13b5d1['id'];}return this[_0x235cd3(0x286)][_0x3feb19]||0x0;},ImageManager['svActorHorzCells']=ImageManager[_0x324937(0x317)]||0x9,ImageManager[_0x324937(0x283)]=ImageManager[_0x324937(0x283)]||0x6,SceneManager[_0x324937(0x29d)]=function(){const _0x466edd=_0x324937;return this['_scene']&&this[_0x466edd(0x217)][_0x466edd(0x14a)]===Scene_Battle;},VisuMZ[_0x324937(0x2c8)][_0x324937(0xfa)]=BattleManager[_0x324937(0x32b)],BattleManager['setup']=function(_0x211be9,_0x569904,_0x5471a0){const _0x463cd6=_0x324937;VisuMZ['BattleSystemOTB'][_0x463cd6(0xfa)][_0x463cd6(0x281)](this,_0x211be9,_0x569904,_0x5471a0),this[_0x463cd6(0x1e4)]();},BattleManager['initMembersOTB']=function(){const _0x546427=_0x324937;if(!this[_0x546427(0x22d)]())return;this[_0x546427(0x159)]=[],this[_0x546427(0x20d)]=![];},VisuMZ[_0x324937(0x2c8)][_0x324937(0x369)]=BattleManager[_0x324937(0x156)],BattleManager['battleSys']=function(){const _0x1efdb7=_0x324937;if(this[_0x1efdb7(0x22d)]())return'OTB';return VisuMZ[_0x1efdb7(0x2c8)]['BattleManager_battleSys']['call'](this);},BattleManager[_0x324937(0x22d)]=function(){const _0x40c226=_0x324937;return $gameSystem[_0x40c226(0x1ea)]()===_0x40c226(0x2fc);},VisuMZ['BattleSystemOTB'][_0x324937(0x12a)]=BattleManager[_0x324937(0x2e2)],BattleManager['isTpb']=function(){const _0x14434d=_0x324937;if(this[_0x14434d(0x22d)]())return![];return VisuMZ[_0x14434d(0x2c8)]['BattleManager_isTpb'][_0x14434d(0x281)](this);},VisuMZ[_0x324937(0x2c8)][_0x324937(0x352)]=BattleManager['isActiveTpb'],BattleManager['isActiveTpb']=function(){const _0x4a0074=_0x324937;if(this[_0x4a0074(0x22d)]())return![];return VisuMZ[_0x4a0074(0x2c8)][_0x4a0074(0x352)]['call'](this);},VisuMZ[_0x324937(0x2c8)][_0x324937(0xd3)]=BattleManager[_0x324937(0x195)],BattleManager[_0x324937(0x195)]=function(){const _0x33a578=_0x324937;if(this[_0x33a578(0x22d)]())return!![];return VisuMZ[_0x33a578(0x2c8)][_0x33a578(0xd3)][_0x33a578(0x281)](this);},VisuMZ['BattleSystemOTB'][_0x324937(0x301)]=BattleManager[_0x324937(0x295)],BattleManager[_0x324937(0x295)]=function(){const _0x15f84e=_0x324937;VisuMZ[_0x15f84e(0x2c8)][_0x15f84e(0x301)][_0x15f84e(0x281)](this),this[_0x15f84e(0x22d)]()&&$gameParty[_0x15f84e(0x17b)]()&&!this['_surprise']&&this['startInputOTB']();},BattleManager[_0x324937(0x141)]=function(){const _0x1cdc9a=_0x324937;this[_0x1cdc9a(0x13d)]();},VisuMZ[_0x324937(0x2c8)][_0x324937(0x192)]=BattleManager[_0x324937(0x2f7)],BattleManager[_0x324937(0x2f7)]=function(){const _0x2b93fa=_0x324937;this[_0x2b93fa(0x22d)]()?_0x2b93fa(0xc4)!==_0x2b93fa(0xc4)?this[_0x2b93fa(0x17f)]():this[_0x2b93fa(0x2f4)]():VisuMZ['BattleSystemOTB'][_0x2b93fa(0x192)][_0x2b93fa(0x281)](this);},BattleManager[_0x324937(0x2f4)]=function(){const _0x27390b=_0x324937,_0x4f4c9c=this[_0x27390b(0x34f)];if(_0x4f4c9c[_0x27390b(0x267)]()&&_0x4f4c9c[_0x27390b(0x17b)]()){if(_0x27390b(0x372)===_0x27390b(0x372)){const _0x2b6298=_0x4f4c9c[_0x27390b(0x1bf)]();if(!_0x2b6298)_0x27390b(0xcb)===_0x27390b(0x2ad)?(_0x11bd7f[_0x27390b(0x2c8)][_0x27390b(0x2f2)]['call'](this,_0x49ad72),this['onBattleStartOTB'](_0x48190e)):VisuMZ['BattleSystemOTB'][_0x27390b(0x192)][_0x27390b(0x281)](this);else _0x2b6298[_0x27390b(0x11a)]?VisuMZ['BattleSystemOTB']['BattleManager_processTurn']['call'](this):(this[_0x27390b(0x10f)]=_0x4f4c9c,this[_0x27390b(0x306)]());}else _0x217dfd=_0x3a8ff4[_0x27390b(0x250)](0x0,_0x595c90['BattleSystemOTB'][_0x27390b(0x160)](_0x1affa3));}else VisuMZ[_0x27390b(0x2c8)][_0x27390b(0x192)][_0x27390b(0x281)](this);},VisuMZ[_0x324937(0x2c8)]['BattleManager_finishActorInput']=BattleManager[_0x324937(0x1fd)],BattleManager[_0x324937(0x1fd)]=function(){const _0x383ac3=_0x324937;this[_0x383ac3(0x22d)]()?VisuMZ[_0x383ac3(0x2c8)]['BattleManager_processTurn'][_0x383ac3(0x281)](this):_0x383ac3(0x32d)===_0x383ac3(0x32d)?VisuMZ[_0x383ac3(0x2c8)][_0x383ac3(0x2ec)][_0x383ac3(0x281)](this):_0x1339fb[_0x383ac3(0x22d)]()?this[_0x383ac3(0x251)]():_0x1b1061[_0x383ac3(0x2c8)][_0x383ac3(0x1c0)]['call'](this);},VisuMZ[_0x324937(0x2c8)][_0x324937(0xfe)]=BattleManager['selectNextActor'],BattleManager[_0x324937(0x1f4)]=function(){const _0x235644=_0x324937;this[_0x235644(0x22d)]()?_0x235644(0x13a)===_0x235644(0x1a8)?(this['_otbTurnOrderVisible']===_0x3ebc26&&this[_0x235644(0x15b)](),this[_0x235644(0x1ff)]=_0x203fe5):this['selectNextActorOTB']():_0x235644(0x243)===_0x235644(0x243)?VisuMZ['BattleSystemOTB']['BattleManager_selectNextActor'][_0x235644(0x281)](this):_0x365f45['_sourceArray'][_0x235644(0x1be)](_0x52a05b);},BattleManager['selectNextActorOTB']=function(){const _0xf6fd69=_0x324937;this[_0xf6fd69(0x10f)]=null,this['_inputting']=![];},VisuMZ[_0x324937(0x2c8)][_0x324937(0x379)]=BattleManager['endAction'],BattleManager[_0x324937(0x19d)]=function(){const _0x35f7a4=_0x324937;this['preEndActionOTB'](),VisuMZ[_0x35f7a4(0x2c8)][_0x35f7a4(0x379)]['call'](this),this[_0x35f7a4(0x12f)]();},BattleManager[_0x324937(0xd7)]=function(){const _0x32c291=_0x324937;if(!this['isOTB']())return;this[_0x32c291(0x35f)]();this['_subject']&&this[_0x32c291(0x34f)][_0x32c291(0x35d)]();if(this[_0x32c291(0x34f)]&&this[_0x32c291(0x34f)][_0x32c291(0x2cd)]()&&this[_0x32c291(0x13b)][_0x32c291(0x1b5)](this[_0x32c291(0x34f)])){if(_0x32c291(0x142)!=='HvzSX')return _0xa18029[_0x32c291(0x22d)]();else{const _0x4fd3ae=this[_0x32c291(0x34f)][_0x32c291(0x272)][_0x32c291(0x1d9)](_0x800f6f=>_0x800f6f[_0x32c291(0x11a)]);this['_subject'][_0x32c291(0x31e)]();if(_0x4fd3ae){let _0x473f9d=_0x4fd3ae[_0x32c291(0x2e9)];while(_0x473f9d--){this[_0x32c291(0x34f)][_0x32c291(0x272)]['pop']();}this[_0x32c291(0x34f)][_0x32c291(0x272)]=_0x4fd3ae[_0x32c291(0x2f3)](this['_subject'][_0x32c291(0x272)]);}}}},BattleManager['postEndActionOTB']=function(){const _0x30ebc1=_0x324937;if(!this[_0x30ebc1(0x22d)]())return;this['removeActionBattlersOTB']();if(this['_subject']){if('YLlCN'!==_0x30ebc1(0xe9))return _0x4a93ea(_0x165e04['$2']);else this['endBattlerActions'](this[_0x30ebc1(0x34f)]),this[_0x30ebc1(0x34f)]=null;}this[_0x30ebc1(0x2de)][_0x30ebc1(0x2e9)]>0x0&&(this[_0x30ebc1(0x34f)]=this[_0x30ebc1(0x1ec)]());;},BattleManager[_0x324937(0x276)]=VisuMZ[_0x324937(0x2c8)][_0x324937(0x16e)][_0x324937(0x2b1)][_0x324937(0x143)],BattleManager['OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER']=VisuMZ['BattleSystemOTB'][_0x324937(0x16e)]['Mechanics'][_0x324937(0x24c)],BattleManager[_0x324937(0x334)]=VisuMZ['BattleSystemOTB'][_0x324937(0x16e)][_0x324937(0x2b1)][_0x324937(0x1ce)],VisuMZ[_0x324937(0x2c8)][_0x324937(0x234)]=BattleManager[_0x324937(0x2e1)],BattleManager[_0x324937(0x2e1)]=function(){const _0x21e51b=_0x324937;this[_0x21e51b(0x22d)]()?this[_0x21e51b(0x183)]():VisuMZ[_0x21e51b(0x2c8)]['BattleManager_makeActionOrders'][_0x21e51b(0x281)](this);},BattleManager[_0x324937(0x183)]=function(){const _0xfc9897=_0x324937;let _0x4792f3=this[_0xfc9897(0x20d)]?0x1:0x2;while(_0x4792f3--){this[_0xfc9897(0x37e)]();}const _0x3a8845=!this['_otb_createdFirstTurnOrders'];this['_otb_createdFirstTurnOrders']=!![];},BattleManager['makeNextActionOrdersOTB']=function(){const _0x2cba49=_0x324937;this['_actionBattlers']=this[_0x2cba49(0x159)],this[_0x2cba49(0x26b)]();const _0x532505=[];_0x532505[_0x2cba49(0x15e)](...$gameParty[_0x2cba49(0x121)]()),_0x532505[_0x2cba49(0x15e)](...$gameTroop['members']());for(const _0x268f9a of _0x532505){_0x268f9a['makeSpeed']();}_0x532505[_0x2cba49(0x229)]((_0x517de1,_0x2fb656)=>_0x2fb656['speed']()-_0x517de1[_0x2cba49(0x34e)]()),this['_otb_actionBattlersNext']=_0x532505,this[_0x2cba49(0x1a6)](),this['removeActionBattlersOTB'](),this[_0x2cba49(0x115)]();},BattleManager[_0x324937(0x1a6)]=function(){const _0x2e8c54=_0x324937;if(!BattleManager['OTB_ADDED_ACTION_TIMES'])return;const _0x4b18f9=this['_otb_actionBattlersNext'],_0x4044db=this[_0x2e8c54(0x2fd)]();for(const _0x5f4def of _0x4044db){if(!_0x5f4def)continue;if(!_0x5f4def['isAppeared']())continue;if(!_0x5f4def['isAlive']())continue;if(!_0x4b18f9[_0x2e8c54(0x1b5)](_0x5f4def))continue;const _0x4cdf76=_0x4b18f9[_0x2e8c54(0x134)](_0x5f4def);let _0x4ed07c=_0x5f4def[_0x2e8c54(0x30a)]()-0x1;while(_0x4ed07c--){if(_0x2e8c54(0x1e3)!==_0x2e8c54(0x1dd)){let _0x4720f6=_0x4cdf76;if(BattleManager[_0x2e8c54(0x20a)]){if(_0x2e8c54(0x17c)!==_0x2e8c54(0x139))_0x4720f6=Math[_0x2e8c54(0x1b8)](_0x4b18f9[_0x2e8c54(0x2e9)]-_0x4cdf76)+_0x4cdf76;else{if(!this[_0x2e8c54(0x22d)]())return;const _0x6d2f65=_0x286a7d['_scene'][_0x2e8c54(0xf6)];if(!_0x6d2f65)return;_0x6d2f65[_0x2e8c54(0x214)](this[_0x2e8c54(0x2d2)]());}}_0x4b18f9[_0x2e8c54(0x187)](_0x4720f6,0x0,_0x5f4def);}else this['isOTB']()?this[_0x2e8c54(0x1c3)]():_0x425298[_0x2e8c54(0x2c8)]['BattleManager_selectNextActor'][_0x2e8c54(0x281)](this);}}},BattleManager[_0x324937(0x35f)]=function(){const _0x3581e8=_0x324937;if(!this[_0x3581e8(0x22d)]())return;this[_0x3581e8(0x13b)]=this['_actionBattlers']||[],this['_actionBattlers'][_0x3581e8(0x1be)](null),this[_0x3581e8(0x13b)][_0x3581e8(0x1be)](undefined),this[_0x3581e8(0x13b)]=this[_0x3581e8(0x13b)][_0x3581e8(0x1d9)](_0x3b75ba=>_0x3b75ba[_0x3581e8(0x26c)]()),this[_0x3581e8(0x13b)]=this[_0x3581e8(0x13b)][_0x3581e8(0x1d9)](_0x5c487d=>VisuMZ[_0x3581e8(0x2c8)]['ActionBattlersFilter'](_0x5c487d));if(this[_0x3581e8(0x255)]){if(_0x3581e8(0x10c)===_0x3581e8(0x10c))this[_0x3581e8(0x13b)]=this[_0x3581e8(0x13b)][_0x3581e8(0x1d9)](_0x5ee861=>!_0x5ee861[_0x3581e8(0x267)]());else{if(this['_graphicSv']!==_0x430bbb[_0x3581e8(0x289)]())return this[_0x3581e8(0x180)]();}}if(this[_0x3581e8(0x179)]){if(_0x3581e8(0x371)!==_0x3581e8(0x34c))this['_actionBattlers']=this[_0x3581e8(0x13b)][_0x3581e8(0x1d9)](_0x251ad6=>!_0x251ad6[_0x3581e8(0x140)]());else{this[_0x3581e8(0x19e)]=new _0x4fbe8b(),this[_0x3581e8(0x19e)][_0x3581e8(0x1b9)]=_0x5c4a8f,this[_0x3581e8(0x21c)](this['_bgImageSprite']);const _0xc039ba=_0x52fd3b[_0x3581e8(0x16e)];this[_0x3581e8(0x19e)]['x']=_0xc039ba['BgImageOffsetX'],this[_0x3581e8(0x19e)]['y']=_0xc039ba[_0x3581e8(0x228)];}}this['_otb_actionBattlersNext']=this[_0x3581e8(0x159)]||[],this[_0x3581e8(0x159)][_0x3581e8(0x1be)](null),this['_otb_actionBattlersNext'][_0x3581e8(0x1be)](undefined),this[_0x3581e8(0x159)]=this[_0x3581e8(0x159)][_0x3581e8(0x1d9)](_0x37eca8=>_0x37eca8[_0x3581e8(0x26c)]()),this[_0x3581e8(0x159)]=this[_0x3581e8(0x159)][_0x3581e8(0x1d9)](_0xff941f=>VisuMZ[_0x3581e8(0x2c8)]['ActionBattlersNextFilter'](_0xff941f)),this[_0x3581e8(0x2f5)](),this[_0x3581e8(0x329)]();},VisuMZ['BattleSystemOTB'][_0x324937(0x119)]=function(_0x5477ed){const _0x51c8e8=_0x324937;if(!_0x5477ed)return![];if(!_0x5477ed[_0x51c8e8(0x373)]())return![];if(!_0x5477ed[_0x51c8e8(0x127)]())return![];return _0x5477ed['canMove']();},VisuMZ['BattleSystemOTB'][_0x324937(0x23b)]=function(_0x5f0b3e){const _0x19aa54=_0x324937;if(!_0x5f0b3e)return![];const _0x6872ca=JsonEx[_0x19aa54(0x130)](_0x5f0b3e);return _0x6872ca[_0x19aa54(0x262)]=!![],_0x6872ca[_0x19aa54(0x338)]=!![],_0x6872ca[_0x19aa54(0x1b3)](),_0x6872ca['removeStatesAuto'](0x1),_0x6872ca[_0x19aa54(0x288)](0x2),_0x6872ca[_0x19aa54(0x344)](),VisuMZ[_0x19aa54(0x2c8)][_0x19aa54(0x119)](_0x6872ca);},BattleManager[_0x324937(0xe8)]=function(_0x258994,_0x276dd7,_0x20f4dd){const _0x119e14=_0x324937;if(!_0x276dd7)return;const _0x66f934=_0x20f4dd?this[_0x119e14(0x159)]:this[_0x119e14(0x13b)];if(!_0x66f934)return;if(!_0x66f934[_0x119e14(0x1b5)](_0x258994))return;const _0x394f65=VisuMZ[_0x119e14(0x2c8)]['GetAllIndicies'](_0x258994,_0x66f934),_0x1ab638=_0x20f4dd?VisuMZ[_0x119e14(0x2c8)][_0x119e14(0x160)](_0x66f934):0x0,_0x27af88=_0x394f65[_0x119e14(0x2e9)]-0x1;for(let _0x2217e6=_0x27af88;_0x2217e6>=0x0;_0x2217e6--){_0x119e14(0x1e9)==='AHDof'?_0x5af74f=_0x119e14(0x31b):_0x66f934[_0x119e14(0x187)](_0x394f65[_0x2217e6],0x1);}for(var _0x388159=0x0;_0x388159<_0x394f65[_0x119e14(0x2e9)];_0x388159++){var _0x959b8c=(_0x394f65[_0x388159]-_0x276dd7)[_0x119e14(0x326)](_0x1ab638,_0x66f934[_0x119e14(0x2e9)]);_0x66f934[_0x119e14(0x187)](_0x959b8c,0x0,_0x258994);}this['removeActionBattlersOTB'](),this['refreshTurnOrder']();},VisuMZ[_0x324937(0x2c8)][_0x324937(0x362)]=function(_0x4731ee,_0x5655b0){const _0x4592fe=_0x324937,_0xcf356d=[],_0x5d03e2=_0x5655b0['length'];for(let _0x5af8af=0x0;_0x5af8af<_0x5d03e2;_0x5af8af++){if(_0x5655b0[_0x5af8af]===_0x4731ee)_0xcf356d[_0x4592fe(0x15e)](_0x5af8af);}return _0xcf356d;},VisuMZ[_0x324937(0x2c8)][_0x324937(0x160)]=function(_0x35f236){const _0x573f5d=_0x324937;if(!BattleManager['OTB_STUN_INFINITY_CLAMP'])return 0x0;if(!_0x35f236)return 0x0;let _0x1c3550=0x0;const _0x94f378=_0x35f236[_0x573f5d(0x2e9)];for(let _0x14875b=0x0;_0x14875b<_0x94f378;_0x14875b++){if('JaGJW'==='JaGJW'){const _0x1280aa=_0x35f236[_0x14875b];if(!_0x1280aa)continue;if(_0x1280aa[_0x573f5d(0x34e)]()!==Infinity)return _0x14875b;else _0x573f5d(0x25c)!==_0x573f5d(0x252)?_0x1c3550++:this[_0x573f5d(0x13d)]();}else this[_0x573f5d(0xee)]=0x0;}return _0x1c3550;},BattleManager[_0x324937(0x26b)]=function(){const _0x6ef608=_0x324937;if(!this[_0x6ef608(0x22d)]())return;const _0x170ba0=SceneManager['_scene'][_0x6ef608(0xf6)];if(!_0x170ba0)return;_0x170ba0['shiftNextTurnSpritesToCurrentTurn']();},BattleManager[_0x324937(0x115)]=function(){const _0xd54b95=_0x324937;if(!this['isOTB']())return;const _0x2ade7b=SceneManager[_0xd54b95(0x217)]['_otbTurnOrderWindow'];if(!_0x2ade7b)return;_0x2ade7b[_0xd54b95(0x28a)]();},VisuMZ[_0x324937(0x2c8)][_0x324937(0x1c9)]=BattleManager['getNextSubject'],BattleManager[_0x324937(0x1ec)]=function(){const _0x117a29=_0x324937;return this[_0x117a29(0x34f)]=VisuMZ[_0x117a29(0x2c8)][_0x117a29(0x1c9)][_0x117a29(0x281)](this),this[_0x117a29(0x22d)]()&&this[_0x117a29(0x34f)]&&('Qpabj'==='Qpabj'?this['otbShiftTurnOrderForSubject'](this[_0x117a29(0x34f)]):(this[_0x117a29(0x10f)]=null,this[_0x117a29(0x137)]=![])),this[_0x117a29(0x34f)];},BattleManager[_0x324937(0x1d0)]=function(_0x8c2ea8){const _0x5f0b20=_0x324937;if(!this[_0x5f0b20(0x22d)]())return;const _0x56fc96=SceneManager[_0x5f0b20(0x217)][_0x5f0b20(0xf6)];if(!_0x56fc96)return;if(!_0x8c2ea8)return;_0x56fc96[_0x5f0b20(0x377)](_0x8c2ea8);},BattleManager[_0x324937(0x329)]=function(){const _0x449a84=_0x324937;if(!this[_0x449a84(0x22d)]())return;const _0x2a0092=SceneManager[_0x449a84(0x217)]['_otbTurnOrderWindow'];if(!_0x2a0092)return;_0x2a0092[_0x449a84(0x34a)]();},VisuMZ['BattleSystemOTB']['BattleManager_endTurn']=BattleManager[_0x324937(0x37a)],BattleManager[_0x324937(0x37a)]=function(){const _0x4c0f3=_0x324937;VisuMZ[_0x4c0f3(0x2c8)][_0x4c0f3(0x2ef)][_0x4c0f3(0x281)](this),this[_0x4c0f3(0x22d)]()&&this[_0x4c0f3(0x2df)]();},BattleManager[_0x324937(0x2df)]=function(){const _0x1bceb6=_0x324937;if(!this[_0x1bceb6(0x22d)]())return;const _0x138ec6=SceneManager[_0x1bceb6(0x217)][_0x1bceb6(0xf6)];if(!_0x138ec6)return;_0x138ec6[_0x1bceb6(0x176)]();},BattleManager[_0x324937(0x2f5)]=function(){const _0x2c7923=_0x324937;if(!this[_0x2c7923(0x22d)]())return;const _0x42dc5f=SceneManager[_0x2c7923(0x217)][_0x2c7923(0xf6)];if(!_0x42dc5f)return;_0x42dc5f[_0x2c7923(0x18b)]();},BattleManager['otbReturnBattlerToTurnOrders']=function(_0x47f6e0){const _0x3eed82=_0x324937;if(!_0x47f6e0)return;const _0x518338=_0x47f6e0[_0x3eed82(0x30a)]();_0x47f6e0[_0x3eed82(0x31e)]();if(!this[_0x3eed82(0x13b)][_0x3eed82(0x1b5)](_0x47f6e0)){if(_0x3eed82(0x30b)!==_0x3eed82(0xe2)){const _0x5e56ba=Math[_0x3eed82(0x250)](0x0,_0x518338-(_0x47f6e0[_0x3eed82(0x2ae)]||0x0));this['otbAddBattlerToTurnOrderAtEnd'](_0x47f6e0,_0x5e56ba,this[_0x3eed82(0x13b)]);}else{const _0x1fd5e4=_0x30c075['Settings'];this['_spriteContainer']=new _0x5c609e(),this['addChild'](this[_0x3eed82(0x1bb)]),this['_subject']=null,this[_0x3eed82(0x198)]=[],this[_0x3eed82(0x2af)]=[],this['_previewContainer']=new _0x2d83e5(),this[_0x3eed82(0x348)]['x']=_0x1fd5e4['PreviewOffsetX'],this['_previewContainer']['y']=_0x1fd5e4['PreviewOffsetY'],this[_0x3eed82(0x348)]['x']-=_0x23e869[_0x3eed82(0x2c2)](_0x1fd5e4['SpriteThin']*0.5*_0x1fd5e4[_0x3eed82(0x191)]),_0x1fd5e4[_0x3eed82(0x29e)]&&(this[_0x3eed82(0x348)]['x']+=_0x1fd5e4[_0x3eed82(0x123)]),this[_0x3eed82(0x348)]['y']-=_0x570adf['ceil'](_0x1fd5e4[_0x3eed82(0x247)]*0.5*_0x1fd5e4[_0x3eed82(0x191)]),this[_0x3eed82(0x224)](this[_0x3eed82(0x348)]),this[_0x3eed82(0xda)]=[],this[_0x3eed82(0x294)]=[];}}if(!this[_0x3eed82(0x159)][_0x3eed82(0x1b5)](_0x47f6e0)){const _0x372f17=_0x518338;this['otbAddBattlerToTurnOrderAtEnd'](_0x47f6e0,_0x372f17,this[_0x3eed82(0x159)]);}},BattleManager['otbAddBattlerToTurnOrderAtEnd']=function(_0x58f5f2,_0x568c9f,_0xc14c6a){const _0x28eef8=_0x324937;if(!this[_0x28eef8(0x22d)]())return;const _0x4b5ae8=SceneManager['_scene'][_0x28eef8(0xf6)];while(_0x568c9f--){_0xc14c6a[_0x28eef8(0x15e)](_0x58f5f2);if(_0x4b5ae8){if(_0x28eef8(0xf5)===_0x28eef8(0x25e)){const _0x4d30a1=new _0x4cbbfb(this,!![]);_0x4d30a1['setSkill'](_0xef27f),_0x4d30a1[_0x28eef8(0x11a)]=!![];if(_0x385f75===-0x2)_0x4d30a1[_0x28eef8(0x1fa)](this[_0x28eef8(0x2cc)]);else _0xa10285===-0x1?_0x4d30a1[_0x28eef8(0x328)]():_0x4d30a1[_0x28eef8(0x1fa)](_0xa0dbcf);this['_actions'][_0x28eef8(0x15e)](_0x4d30a1);}else _0x4b5ae8[_0x28eef8(0xc7)](_0x58f5f2,_0xc14c6a);}}},BattleManager[_0x324937(0xe0)]=function(_0x6db933){const _0x590423=_0x324937;if(!_0x6db933)return;const _0x36807a=_0x6db933['makeActionTimes']();_0x6db933[_0x590423(0x31e)]();if(!this[_0x590423(0x13b)][_0x590423(0x1b5)](_0x6db933)){const _0x2ff144=Math[_0x590423(0x250)](0x0,_0x36807a-(_0x6db933['_otbTimesActedThisTurn']||0x0));this[_0x590423(0x240)](_0x6db933,_0x2ff144,this[_0x590423(0x13b)]);}if(!this[_0x590423(0x159)][_0x590423(0x1b5)](_0x6db933)){const _0x425c2b=_0x36807a;this['addBattlerToTurnOrderAtStart'](_0x6db933,_0x425c2b,this[_0x590423(0x159)]);}},BattleManager[_0x324937(0x19a)]=function(_0x508497,_0x232073,_0x539895){const _0x10cec2=_0x324937;if(!this[_0x10cec2(0x22d)]())return;const _0x55cb88=SceneManager[_0x10cec2(0x217)]['_otbTurnOrderWindow'];while(_0x232073--){if(_0x10cec2(0x210)==='wjdPk')_0x5c3bb0[_0x10cec2(0x376)](),_0x571bbd[_0x10cec2(0x2c8)]['Scene_Battle_actorCommandSingleSkill']['call'](this);else{_0x539895[_0x10cec2(0x1cf)](_0x508497);if(_0x55cb88){if('noOCC'===_0x10cec2(0x1eb))_0x55cb88['addBattlerToTurnOrderAtStart'](_0x508497,_0x539895);else{const _0x4e3b53=this[_0x10cec2(0x31b)]()[_0x10cec2(0x169)];if(_0x4e3b53[_0x10cec2(0x2a3)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x10cec2(0x1c1);else{if(_0x4e3b53[_0x10cec2(0x2a3)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x10cec2(0x353);}return _0x191d26[_0x10cec2(0x16e)][_0x10cec2(0x1c7)];}}}}},BattleManager[_0x324937(0x211)]=function(_0x2c174f){const _0x3cfd01=_0x324937;if(!this['isOTB']())return;const _0x4d58d6=this[_0x3cfd01(0x13b)],_0x48d44c=_0x2c174f===this['_subject']?0x1:0x0;let _0x27bc7f=0x0;for(let _0x4ea256=0x0;_0x4ea256<_0x4d58d6[_0x3cfd01(0x2e9)];_0x4ea256++){if('EHqls'===_0x3cfd01(0x14c)){const _0x509543=_0x5b8d59[_0x3cfd01(0x13b)][_0x3cfd01(0x134)](_0x10434f)+0x1;return _0x509543;}else{const _0x2d7b93=_0x4d58d6[_0x4ea256];if(!_0x2d7b93)continue;if(!_0x2d7b93[_0x3cfd01(0x272)])continue;if(!_0x2d7b93['_actions'][_0x48d44c])continue;if(!_0x2d7b93[_0x3cfd01(0x272)][_0x48d44c][_0x3cfd01(0x11a)])continue;_0x27bc7f=_0x4ea256;}}this[_0x3cfd01(0x13b)][_0x3cfd01(0x187)](_0x27bc7f,0x0,_0x2c174f);const _0x3e9b9f=SceneManager['_scene']['_otbTurnOrderWindow'];_0x3e9b9f&&(_0x3cfd01(0xdf)==='xfDLx'?_0x3e9b9f[_0x3cfd01(0x1e6)](_0x2c174f,_0x27bc7f):_0x227859[_0x3cfd01(0x211)](_0x4242bd));},BattleManager[_0x324937(0x376)]=function(){const _0x1ee070=_0x324937;if(!this[_0x1ee070(0x22d)]())return;const _0x22428a=SceneManager[_0x1ee070(0x217)][_0x1ee070(0xf6)];if(!_0x22428a)return;_0x22428a[_0x1ee070(0x214)](null);},BattleManager[_0x324937(0x305)]=function(){const _0x35b913=_0x324937;if(!this[_0x35b913(0x22d)]())return;const _0x4e8d20=SceneManager['_scene']['_otbTurnOrderWindow'];if(!_0x4e8d20)return;_0x4e8d20[_0x35b913(0x214)](this['inputtingAction']());},VisuMZ[_0x324937(0x2c8)][_0x324937(0x21e)]=Game_System['prototype'][_0x324937(0x101)],Game_System[_0x324937(0x256)][_0x324937(0x101)]=function(){const _0x5b6cd7=_0x324937;VisuMZ['BattleSystemOTB'][_0x5b6cd7(0x21e)]['call'](this),this[_0x5b6cd7(0x15b)]();},Game_System[_0x324937(0x256)][_0x324937(0x15b)]=function(){const _0x522a39=_0x324937;this[_0x522a39(0x1ff)]=!![];},Game_System[_0x324937(0x256)][_0x324937(0x11e)]=function(){const _0x32da70=_0x324937;return this['_otbTurnOrderVisible']===undefined&&this[_0x32da70(0x15b)](),this[_0x32da70(0x1ff)];},Game_System[_0x324937(0x256)][_0x324937(0x1ef)]=function(_0x4c84f9){const _0x49d136=_0x324937;this[_0x49d136(0x1ff)]===undefined&&this[_0x49d136(0x15b)](),this[_0x49d136(0x1ff)]=_0x4c84f9;},Game_Action[_0x324937(0x1df)]=VisuMZ[_0x324937(0x2c8)]['Settings']['Conversion'][_0x324937(0x108)],Game_Action[_0x324937(0x1f3)]=VisuMZ['BattleSystemOTB'][_0x324937(0x16e)]['Conversion'][_0x324937(0x22b)],Game_Action[_0x324937(0x350)]=VisuMZ[_0x324937(0x2c8)][_0x324937(0x16e)][_0x324937(0x2ab)]['ConvertAgiBuffNext'],Game_Action[_0x324937(0x1f5)]=VisuMZ[_0x324937(0x2c8)][_0x324937(0x16e)][_0x324937(0x2ab)][_0x324937(0x2cb)],VisuMZ['BattleSystemOTB'][_0x324937(0x124)]=Game_Action[_0x324937(0x256)][_0x324937(0x34e)],Game_Action['prototype'][_0x324937(0x34e)]=function(){const _0x1eb7b7=_0x324937;if(BattleManager[_0x1eb7b7(0x22d)]())return 0x0;else{if(_0x1eb7b7(0x26d)!=='KMlmA')_0x5d49f9[_0x1eb7b7(0x2ff)]=_0x1e6d8f['_instance']||0x0,_0x9df96e[_0x1eb7b7(0x2ff)]--;else return VisuMZ['BattleSystemOTB'][_0x1eb7b7(0x124)][_0x1eb7b7(0x281)](this);}},VisuMZ[_0x324937(0x2c8)]['Game_Action_applyGlobal']=Game_Action[_0x324937(0x256)][_0x324937(0x37f)],Game_Action['prototype']['applyGlobal']=function(){const _0x1b61ac=_0x324937;VisuMZ[_0x1b61ac(0x2c8)]['Game_Action_applyGlobal']['call'](this),this[_0x1b61ac(0x239)]();},Game_Action[_0x324937(0x256)][_0x324937(0x239)]=function(){const _0x19c574=_0x324937;if(!SceneManager[_0x19c574(0x29d)]())return;if(!BattleManager[_0x19c574(0x22d)]())return;if(!this['item']())return;if(!this['subject']())return;const _0x5ad570=VisuMZ['BattleSystemOTB'][_0x19c574(0x2a6)],_0x5bc66b=this[_0x19c574(0x14d)]()[_0x19c574(0x169)];if(_0x5bc66b['match'](_0x5ad570[_0x19c574(0xd4)])){if(_0x19c574(0x304)!==_0x19c574(0x304)){const _0x2b4397=this[_0x19c574(0x1f6)],_0x35f3ad=this[_0x19c574(0x284)](),_0x44b17c=this[_0x19c574(0x24d)]();this[_0x19c574(0x32a)]['bitmap']=new _0x36d4db(_0x35f3ad,_0x44b17c);const _0x442d3f=this[_0x19c574(0x32a)][_0x19c574(0x1b9)],_0x221e98=_0x935fd8[_0x19c574(0xc3)],_0x972ae0=_0x290531[_0x19c574(0x331)],_0x35bb11=_0x4dc3b6[_0x19c574(0x165)](_0x221e98,_0x972ae0,_0x35f3ad,_0x44b17c),_0x45024a=_0x2b4397%0x10*_0x221e98,_0x17fe4a=_0x30240f[_0x19c574(0x1f2)](_0x2b4397/0x10)*_0x972ae0,_0x3bfd95=_0x121f4f['floor'](_0x41edd8[_0x19c574(0x250)](_0x35f3ad-_0x35bb11,0x0)/0x2),_0x17519f=_0xe84ae9[_0x19c574(0x1f2)](_0x1a5045['max'](_0x44b17c-_0x35bb11,0x0)/0x2);_0x442d3f[_0x19c574(0x2fb)](_0x35d526,_0x45024a,_0x17fe4a,_0x221e98,_0x972ae0,_0x3bfd95,_0x17519f,_0x35bb11,_0x35bb11);}else this['subject']()[_0x19c574(0x2d9)](0x1);}let _0x1b1b1e=this[_0x19c574(0x2b2)](),_0x2fd858=this[_0x19c574(0x30e)]();_0x1b1b1e!==0x0&&BattleManager[_0x19c574(0xe8)](this['subject'](),-_0x1b1b1e,![]),_0x2fd858!==0x0&&BattleManager[_0x19c574(0xe8)](this['subject'](),-_0x2fd858,!![]);},Game_Action['prototype'][_0x324937(0x2b2)]=function(){const _0x287a94=_0x324937;if(!SceneManager[_0x287a94(0x29d)]())return 0x0;if(!BattleManager[_0x287a94(0x22d)]())return 0x0;if(!this[_0x287a94(0x14d)]())return 0x0;if(!this['subject']())return 0x0;if(!this[_0x287a94(0xdb)]()[_0x287a94(0x2ea)]())return 0x0;const _0x1fa763=VisuMZ[_0x287a94(0x2c8)][_0x287a94(0x2a6)],_0x213be0=this[_0x287a94(0x14d)]()[_0x287a94(0x169)],_0x2ffc16=BattleManager[_0x287a94(0x13b)]||[];let _0xc7b1d3=0x0;return _0x213be0[_0x287a94(0x2a3)](_0x1fa763[_0x287a94(0x205)])&&(_0x287a94(0x186)!==_0x287a94(0x186)?_0x490aa7[_0x287a94(0x2c8)][_0x287a94(0x1c0)]['call'](this):_0x2ffc16['includes'](this[_0x287a94(0xdb)]())&&(_0xc7b1d3+=Number(RegExp['$1']))),_0x213be0[_0x287a94(0x2a3)](_0x1fa763[_0x287a94(0x33f)])&&(_0xc7b1d3+=Number(RegExp['$1'])),_0xc7b1d3;},Game_Action[_0x324937(0x256)][_0x324937(0x30e)]=function(){const _0x105e93=_0x324937;if(!SceneManager[_0x105e93(0x29d)]())return 0x0;if(!BattleManager['isOTB']())return 0x0;if(!this[_0x105e93(0x14d)]())return 0x0;if(!this[_0x105e93(0xdb)]())return 0x0;if(!this['subject']()['canChangeOtbTurnOrder']())return 0x0;const _0xf49712=VisuMZ[_0x105e93(0x2c8)][_0x105e93(0x16e)][_0x105e93(0x2b1)],_0x45aa19=VisuMZ[_0x105e93(0x2c8)][_0x105e93(0x2a6)],_0x4a0a52=this['item']()[_0x105e93(0x169)],_0x45d34e=BattleManager[_0x105e93(0x159)]||[];let _0xa22159=0x0;_0xf49712['ConvertSpeedJS']&&(_0xa22159+=_0xf49712[_0x105e93(0x2ca)][_0x105e93(0x281)](this));if(_0x4a0a52[_0x105e93(0x2a3)](_0x45aa19[_0x105e93(0x205)])){if(_0x105e93(0x2a2)!==_0x105e93(0x21b))_0x45d34e[_0x105e93(0x1b5)](this['subject']())&&(_0xa22159+=Number(RegExp['$1']));else{const _0x297f63=this['enemy']()[_0x105e93(0x169)];if(_0x297f63[_0x105e93(0x2a3)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x3aab0a(_0x40d882['$1']);return _0x285511[_0x105e93(0x16e)]['EnemyBattlerFaceName'];}}if(_0x4a0a52[_0x105e93(0x2a3)](_0x45aa19['UserNextOrder'])){if(_0x105e93(0x31f)===_0x105e93(0x31f))_0xa22159+=Number(RegExp['$1']);else{if(!_0x3b73ce[_0x105e93(0x29d)]())return 0x0;if(!_0x11353c[_0x105e93(0x22d)]())return 0x0;if(!this[_0x105e93(0x14d)]())return 0x0;if(!this[_0x105e93(0xdb)]())return 0x0;if(!this['subject']()[_0x105e93(0x2ea)]())return 0x0;const _0x29af4a=_0x29cb71[_0x105e93(0x2c8)][_0x105e93(0x2a6)],_0x1bde2d=this[_0x105e93(0x14d)]()[_0x105e93(0x169)],_0x1c663c=_0x33a9a3[_0x105e93(0x13b)]||[];let _0x12b016=0x0;return _0x1bde2d[_0x105e93(0x2a3)](_0x29af4a[_0x105e93(0x205)])&&(_0x1c663c[_0x105e93(0x1b5)](this[_0x105e93(0xdb)]())&&(_0x12b016+=_0x325892(_0x3fd93f['$1']))),_0x1bde2d['match'](_0x29af4a[_0x105e93(0x33f)])&&(_0x12b016+=_0x462848(_0x4615d4['$1'])),_0x12b016;}}return _0xa22159;},VisuMZ[_0x324937(0x2c8)][_0x324937(0x151)]=Game_Action[_0x324937(0x256)][_0x324937(0xeb)],Game_Action['prototype'][_0x324937(0xeb)]=function(_0x149e7f){const _0x5a80cc=_0x324937;VisuMZ['BattleSystemOTB'][_0x5a80cc(0x151)][_0x5a80cc(0x281)](this,_0x149e7f),this['applyItemAddedActionOTB'](_0x149e7f),this['applyItemTargetEffectOTB'](_0x149e7f);},Game_Action['prototype'][_0x324937(0x312)]=function(_0x2cda3e){const _0x4f0253=_0x324937;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x4f0253(0x22d)]())return;if(!this[_0x4f0253(0x14d)]())return;if(!_0x2cda3e)return;const _0x2559aa=VisuMZ[_0x4f0253(0x2c8)][_0x4f0253(0x2a6)],_0x4324df=this['item']()[_0x4f0253(0x169)];if(_0x4324df[_0x4f0253(0x2a3)](_0x2559aa[_0x4f0253(0x21a)])){const _0x3a7761=!![],_0x51d0b7=Number(RegExp['$1'])||0x0;this[_0x4f0253(0xdb)]()[_0x4f0253(0x233)](_0x51d0b7,_0x3a7761);}if(_0x4324df[_0x4f0253(0x2a3)](_0x2559aa[_0x4f0253(0x100)])){if(_0x4f0253(0x231)!==_0x4f0253(0x2f1)){const _0x2bb42c=![],_0x31af97=Number(RegExp['$1'])||0x0;this[_0x4f0253(0xdb)]()[_0x4f0253(0x233)](_0x31af97,_0x2bb42c);}else _0x21e76d+=_0x43e3e5(_0x3ea6b3['$1']);}if(_0x4324df[_0x4f0253(0x2a3)](_0x2559aa['TargetAddActionCurrent'])){if(_0x4f0253(0x1cb)!==_0x4f0253(0x1cb))return this['_subject']=_0x5d3127[_0x4f0253(0x2c8)][_0x4f0253(0x1c9)][_0x4f0253(0x281)](this),this['isOTB']()&&this[_0x4f0253(0x34f)]&&this['otbShiftTurnOrderForSubject'](this[_0x4f0253(0x34f)]),this[_0x4f0253(0x34f)];else{const _0x54b7ee=!![],_0x126ddd=Number(RegExp['$1'])||0x0;_0x2cda3e[_0x4f0253(0x233)](_0x126ddd,_0x54b7ee);}}if(_0x4324df[_0x4f0253(0x2a3)](_0x2559aa['TargetAddActionNext'])){const _0x1048e9=![],_0x49ee97=Number(RegExp['$1'])||0x0;_0x2cda3e[_0x4f0253(0x233)](_0x49ee97,_0x1048e9);}},Game_Action[_0x324937(0x256)][_0x324937(0x28c)]=function(_0x129d6e){const _0x1aead8=_0x324937;if(!SceneManager[_0x1aead8(0x29d)]())return;if(!BattleManager[_0x1aead8(0x22d)]())return;if(!this[_0x1aead8(0x14d)]())return;if(!_0x129d6e)return;if(!_0x129d6e[_0x1aead8(0x2ea)]())return 0x0;let _0x57856f=this[_0x1aead8(0x16d)](_0x129d6e),_0x30b383=this[_0x1aead8(0x2c1)](_0x129d6e);if(_0x57856f!==0x0){if('KEfal'!=='KEfal'){const _0x5edab0=this[_0x1aead8(0x16a)]();if(!_0x5edab0)return 0x0;const _0x36e713=this[_0x1aead8(0x208)]===_0x5edab0[_0x1aead8(0x2af)]?!![]:![],_0x156042=_0x36e713?_0x5629af[_0x1aead8(0x159)]:_0x48741b[_0x1aead8(0x13b)],_0x3135b1=this[_0x1aead8(0x2e3)](),_0x2afa8c=_0x55523f[_0x1aead8(0x2c8)][_0x1aead8(0x362)](_0x3135b1,_0x156042);return _0x2afa8c[this['_instance']]??_0x2afa8c[_0x2afa8c['length']-0x1]??-0x1;}else BattleManager[_0x1aead8(0xe8)](_0x129d6e,-_0x57856f,![]);}if(_0x30b383!==0x0){if(_0x1aead8(0x309)!==_0x1aead8(0x2ba))BattleManager[_0x1aead8(0xe8)](_0x129d6e,-_0x30b383,!![]);else return this['processUpdateGraphic']();}},Game_Action[_0x324937(0x256)][_0x324937(0x16d)]=function(_0x53da2f){const _0x1441fe=_0x324937;if(!SceneManager['isSceneBattle']())return 0x0;if(!BattleManager[_0x1441fe(0x22d)]())return 0x0;if(!this[_0x1441fe(0x14d)]())return 0x0;if(!_0x53da2f)return 0x0;if(!_0x53da2f[_0x1441fe(0x2ea)]())return 0x0;const _0xeb0957=VisuMZ['BattleSystemOTB']['RegExp'],_0x4833f9=this[_0x1441fe(0x14d)]()[_0x1441fe(0x169)],_0x147658=BattleManager['_actionBattlers']||[];let _0x408c7f=0x0;if(_0x4833f9[_0x1441fe(0x2a3)](_0xeb0957[_0x1441fe(0x2c9)])){if(_0x1441fe(0x193)===_0x1441fe(0x166)){let _0x84ebf6=this[_0x1441fe(0x284)](),_0x48e172=this[_0x1441fe(0x24d)](),_0x497773=this[_0x1441fe(0x366)]();_0x30963b[_0x1441fe(0x1b9)]=new _0x408ba8(_0x84ebf6,_0x48e172);const _0x31d79b=_0x1441fe(0x35b),_0x15d00c=_0xe49290[_0x1441fe(0x20f)](_0x5ce188[_0x1441fe(0x16c)['format'](_0x1c3a8d)]);_0x3af57c[_0x1441fe(0x1b9)]['fillRect'](0x0,0x0,_0x84ebf6,_0x48e172,_0x31d79b),_0x84ebf6-=0x2,_0x48e172-=0x2,_0x138a07[_0x1441fe(0x1b9)][_0x1441fe(0x162)](0x1,0x1,_0x84ebf6,_0x48e172,_0x15d00c),_0x84ebf6-=_0x497773*0x2,_0x48e172-=_0x497773*0x2,_0x59ece0['bitmap'][_0x1441fe(0x162)](0x1+_0x497773,0x1+_0x497773,_0x84ebf6,_0x48e172,_0x31d79b),_0x84ebf6-=0x2,_0x48e172-=0x2,_0x497773+=0x1,_0x4d2fa4[_0x1441fe(0x1b9)][_0x1441fe(0x102)](0x1+_0x497773,0x1+_0x497773,_0x84ebf6,_0x48e172);}else _0x147658[_0x1441fe(0x1b5)](_0x53da2f)&&(_0x408c7f+=Number(RegExp['$1']));}_0x4833f9['match'](_0xeb0957[_0x1441fe(0xd1)])&&(_0x408c7f+=Number(RegExp['$1']));const _0x3c55b6=this[_0x1441fe(0x14d)]()['effects'];for(const _0x366515 of _0x3c55b6){if(!_0x366515)continue;if(_0x366515['code']===Game_Action[_0x1441fe(0x31a)]&&_0x366515[_0x1441fe(0x189)]===0x6){if(_0x1441fe(0x1d8)!==_0x1441fe(0x209)){if(Game_Action['OTB_CONVERT_AGI_BUFF_CURRENT_TURN'])_0x408c7f-=0x1;}else{const _0x34efbb=this[_0x1441fe(0x198)][_0x1441fe(0x1f0)]();_0x34efbb[_0x1441fe(0x1e1)](0x0);}}if(_0x366515[_0x1441fe(0x146)]===Game_Action['EFFECT_ADD_DEBUFF']&&_0x366515[_0x1441fe(0x189)]===0x6){if(Game_Action[_0x1441fe(0x1f3)])_0x408c7f+=0x1;}}return _0x408c7f;},Game_Action[_0x324937(0x256)][_0x324937(0x2c1)]=function(_0xc828){const _0x393ead=_0x324937;if(!SceneManager[_0x393ead(0x29d)]())return 0x0;if(!BattleManager[_0x393ead(0x22d)]())return 0x0;if(!this['item']())return 0x0;if(!_0xc828)return 0x0;if(!_0xc828[_0x393ead(0x2ea)]())return 0x0;const _0x34db20=VisuMZ['BattleSystemOTB']['RegExp'],_0x59e4a1=this[_0x393ead(0x14d)]()['note'],_0x4e3468=BattleManager[_0x393ead(0x159)]||[];let _0x45a2fc=0x0;if(_0x59e4a1[_0x393ead(0x2a3)](_0x34db20[_0x393ead(0x2c9)])){if(_0x393ead(0x18d)!==_0x393ead(0x18d)){if(!this['_letterSprite'])return;const _0x36e7a2=this[_0x393ead(0x2e3)]();if(!_0x36e7a2)return;if(this[_0x393ead(0x367)]===_0x36e7a2[_0x393ead(0x367)]&&this[_0x393ead(0x30c)]===_0x36e7a2['_plural'])return;this[_0x393ead(0x367)]=_0x36e7a2[_0x393ead(0x367)],this[_0x393ead(0x30c)]=_0x36e7a2[_0x393ead(0x30c)];const _0x1079d0=_0x18393c['Settings'],_0x1d3b9a=this[_0x393ead(0x284)](),_0x3b23df=this[_0x393ead(0x24d)](),_0x2699df=this[_0x393ead(0x320)][_0x393ead(0x1b9)];_0x2699df[_0x393ead(0xfc)]();if(!this[_0x393ead(0x30c)])return;_0x2699df['fontFace']=_0x1079d0['EnemyBattlerFontFace']||_0x2a1a9d['mainFontFace'](),_0x2699df[_0x393ead(0xf8)]=_0x1079d0[_0x393ead(0x1c6)]||0x10,_0x1079d0[_0x393ead(0x29e)]?_0x2699df[_0x393ead(0x2a8)](this[_0x393ead(0x367)][_0x393ead(0x2b5)](),_0x1d3b9a*0x1/0x8,_0x3b23df/0x2,_0x1d3b9a,_0x3b23df/0x2,_0x393ead(0x175)):_0x2699df[_0x393ead(0x2a8)](this[_0x393ead(0x367)][_0x393ead(0x2b5)](),0x0,_0x3b23df/0x2,_0x1d3b9a*0x7/0x8,_0x3b23df/0x2,_0x393ead(0x15f));}else _0x4e3468['includes'](_0xc828)&&(_0x45a2fc+=Number(RegExp['$1']));}if(_0x59e4a1[_0x393ead(0x2a3)](_0x34db20[_0x393ead(0x1b4)])){if('GWZTG'!==_0x393ead(0x200))_0x45a2fc+=Number(RegExp['$1']);else{if(this[_0x393ead(0x34e)]()===_0x411842)return![];return!![];}}const _0x1f21dd=this[_0x393ead(0x14d)]()[_0x393ead(0xc8)];for(const _0x3bfa19 of _0x1f21dd){if(_0x393ead(0x22e)!=='qqaIi'){if(!_0x3bfa19)continue;if(_0x3bfa19[_0x393ead(0x146)]===Game_Action[_0x393ead(0x31a)]&&_0x3bfa19[_0x393ead(0x189)]===0x6){if(Game_Action['OTB_CONVERT_AGI_BUFF_NEXT_TURN'])_0x45a2fc-=0x1;}if(_0x3bfa19['code']===Game_Action[_0x393ead(0x361)]&&_0x3bfa19[_0x393ead(0x189)]===0x6){if(Game_Action['OTB_CONVERT_AGI_DEBUFF_NEXT_TURN'])_0x45a2fc+=0x1;}}else{const _0x5c2f57=_0x7a831e(_0x811387['$1']);_0x5c2f57<_0x281391?(_0xbaf9ae(_0x393ead(0x117)[_0x393ead(0x2dc)](_0x11c83a,_0x5c2f57,_0x391c50)),_0x32f0f0['exit']()):_0x297403=_0x228773[_0x393ead(0x250)](_0x5c2f57,_0x4c12cf);}}return _0x45a2fc;},Game_BattlerBase[_0x324937(0x256)][_0x324937(0xce)]=function(){const _0x228f15=_0x324937;delete this[_0x228f15(0x1ae)],delete this[_0x228f15(0x2e7)],delete this[_0x228f15(0xdc)],delete this['_otbTurnOrderIconIndex'];},Game_BattlerBase[_0x324937(0x256)][_0x324937(0x280)]=function(){const _0x421d22=_0x324937;if(this[_0x421d22(0x1ae)]===undefined){if('Hfrot'!==_0x421d22(0x28e))this[_0x421d22(0x1ae)]=this[_0x421d22(0x226)]();else return this[_0x421d22(0xdc)]===_0x22b8e8&&(this[_0x421d22(0xdc)]=this[_0x421d22(0x18e)]()),this[_0x421d22(0xdc)];}return this[_0x421d22(0x1ae)];},Game_BattlerBase[_0x324937(0x256)][_0x324937(0x226)]=function(){const _0x3b1fb5=_0x324937;return Window_OTB_TurnOrder[_0x3b1fb5(0x16e)][_0x3b1fb5(0x1c7)];},Game_BattlerBase[_0x324937(0x256)][_0x324937(0x1b7)]=function(){const _0x2727ef=_0x324937;return this[_0x2727ef(0x2e7)]===undefined&&(_0x2727ef(0x10e)===_0x2727ef(0x10e)?this['_otbTurnOrderFaceName']=this[_0x2727ef(0x1f9)]():_0x3cae89[_0x2727ef(0x1b5)](this['subject']())&&(_0x159e88+=_0x1dfdb1(_0x5b0c3c['$1']))),this[_0x2727ef(0x2e7)];},Game_BattlerBase[_0x324937(0x256)][_0x324937(0x1f9)]=function(){const _0xcfc106=_0x324937;return Window_OTB_TurnOrder[_0xcfc106(0x16e)]['EnemyBattlerFaceName'];},Game_BattlerBase[_0x324937(0x256)][_0x324937(0x128)]=function(){const _0x5592de=_0x324937;return this[_0x5592de(0xdc)]===undefined&&(this[_0x5592de(0xdc)]=this[_0x5592de(0x18e)]()),this[_0x5592de(0xdc)];},Game_BattlerBase[_0x324937(0x256)][_0x324937(0x18e)]=function(){return Window_OTB_TurnOrder['Settings']['EnemyBattlerFaceIndex'];},Game_BattlerBase['prototype'][_0x324937(0x2d7)]=function(){const _0x21d298=_0x324937;return this[_0x21d298(0x26f)]===undefined&&(this[_0x21d298(0x26f)]=this[_0x21d298(0x2c7)]()),this[_0x21d298(0x26f)];},Game_BattlerBase[_0x324937(0x256)][_0x324937(0x2c7)]=function(){const _0x4365c6=_0x324937;return Window_OTB_TurnOrder[_0x4365c6(0x16e)][_0x4365c6(0xf0)];},Game_BattlerBase[_0x324937(0x256)][_0x324937(0x1db)]=function(_0x204dcb){const _0x2ccc0f=_0x324937;this[_0x2ccc0f(0x26f)]=_0x204dcb;},VisuMZ[_0x324937(0x2c8)][_0x324937(0x2fe)]=Game_BattlerBase[_0x324937(0x256)][_0x324937(0x242)],Game_BattlerBase[_0x324937(0x256)][_0x324937(0x242)]=function(){const _0x1b1cdf=_0x324937;VisuMZ['BattleSystemOTB'][_0x1b1cdf(0x2fe)][_0x1b1cdf(0x281)](this),BattleManager[_0x1b1cdf(0x35f)]();},VisuMZ[_0x324937(0x2c8)][_0x324937(0x18c)]=Game_BattlerBase[_0x324937(0x256)]['appear'],Game_BattlerBase[_0x324937(0x256)][_0x324937(0x23f)]=function(){const _0x4b91cd=_0x324937,_0xa7ebc5=this['_hidden'];VisuMZ[_0x4b91cd(0x2c8)][_0x4b91cd(0x18c)][_0x4b91cd(0x281)](this),BattleManager[_0x4b91cd(0x22d)]()&&SceneManager['isSceneBattle']()&&_0xa7ebc5&&!this['_hidden']&&('pXScR'===_0x4b91cd(0x29b)?this[_0x4b91cd(0x2df)]():BattleManager[_0x4b91cd(0xf7)](this));},VisuMZ[_0x324937(0x2c8)][_0x324937(0x1e2)]=Game_Battler[_0x324937(0x256)][_0x324937(0x335)],Game_Battler[_0x324937(0x256)][_0x324937(0x335)]=function(){const _0xa2c72c=_0x324937;VisuMZ[_0xa2c72c(0x2c8)]['Game_Battler_performCollapse'][_0xa2c72c(0x281)](this),BattleManager[_0xa2c72c(0x35f)]();},Game_Battler[_0x324937(0x37b)]=VisuMZ[_0x324937(0x2c8)]['Settings'][_0x324937(0x2b1)][_0x324937(0x1fb)],VisuMZ['BattleSystemOTB'][_0x324937(0x2f2)]=Game_Battler[_0x324937(0x256)][_0x324937(0x12b)],Game_Battler[_0x324937(0x256)][_0x324937(0x12b)]=function(_0x109b0b){const _0xad23e5=_0x324937;VisuMZ['BattleSystemOTB'][_0xad23e5(0x2f2)][_0xad23e5(0x281)](this,_0x109b0b),this[_0xad23e5(0x114)](_0x109b0b);},Game_Battler[_0x324937(0x256)]['onBattleStartOTB']=function(_0x1b1de4){const _0x242493=_0x324937;if(!BattleManager['isOTB']())return;this[_0x242493(0x2ae)]=0x0;},VisuMZ[_0x324937(0x2c8)]['Game_Battler_onBattleEnd']=Game_Battler[_0x324937(0x256)][_0x324937(0x132)],Game_Battler[_0x324937(0x256)]['onBattleEnd']=function(){const _0x3cf451=_0x324937;VisuMZ[_0x3cf451(0x2c8)][_0x3cf451(0x357)][_0x3cf451(0x281)](this),this[_0x3cf451(0x264)]();},Game_Battler['prototype'][_0x324937(0x264)]=function(){const _0x3a19f7=_0x324937;if(!BattleManager[_0x3a19f7(0x22d)]())return;this[_0x3a19f7(0x2ae)]=0x0;},Game_Battler[_0x324937(0x256)][_0x324937(0x35d)]=function(){const _0x52587e=_0x324937;if(!BattleManager[_0x52587e(0x22d)]())return;this[_0x52587e(0x2ae)]=this[_0x52587e(0x2ae)]||0x0,this[_0x52587e(0x2ae)]++;if(this[_0x52587e(0x30f)]()>0x0&&this===BattleManager[_0x52587e(0x34f)]){if(_0x52587e(0x2e5)==='CsNqE')this[_0x52587e(0x1e8)]=_0x3e3594[_0x52587e(0x265)](),_0x174c87=_0x2b7197['loadEnemy'](this[_0x52587e(0x1e8)]),_0x2179a3[_0x52587e(0x18a)](this[_0x52587e(0x324)][_0x52587e(0x24b)](this,_0x66bebd));else{const _0x53580e=BattleManager[_0x52587e(0x2de)];if(_0x53580e[_0x52587e(0x2e9)]>0x0&&_0x53580e[0x0]!==this)return;const _0x2e29ce=this[_0x52587e(0x2e3)]();if(_0x2e29ce&&BattleManager['isNextOtbSubject'](this))_0x2e29ce[_0x52587e(0x173)]();}}},BattleManager[_0x324937(0x1c8)]=function(_0x363ec0){const _0x1d4b9c=_0x324937;if(!_0x363ec0)return![];return this[_0x1d4b9c(0x13b)][0x0]===_0x363ec0;},VisuMZ[_0x324937(0x2c8)][_0x324937(0xfb)]=Game_Battler['prototype'][_0x324937(0x1f1)],Game_Battler[_0x324937(0x256)]['onTurnEnd']=function(){const _0x378f3a=_0x324937;VisuMZ['BattleSystemOTB']['Game_Battler_onTurnEnd']['call'](this),this[_0x378f3a(0x2e4)]();},Game_Battler[_0x324937(0x256)][_0x324937(0x2e4)]=function(){const _0x4fa9a5=_0x324937;if(!BattleManager[_0x4fa9a5(0x22d)]())return;this['_otbTimesActedThisTurn']=0x0;},VisuMZ[_0x324937(0x2c8)][_0x324937(0x1c0)]=Game_Battler[_0x324937(0x256)][_0x324937(0x15a)],Game_Battler[_0x324937(0x256)]['makeSpeed']=function(){const _0x209415=_0x324937;BattleManager['isOTB']()?this[_0x209415(0x251)]():VisuMZ[_0x209415(0x2c8)][_0x209415(0x1c0)][_0x209415(0x281)](this);},Game_Battler[_0x324937(0x256)][_0x324937(0x251)]=function(){const _0x399ede=_0x324937;if(this[_0x399ede(0x36d)]())this['_speed']=Infinity;else{const _0x23effd=this[_0x399ede(0x1bf)]()||new Game_Action(this);this['_speed']=VisuMZ[_0x399ede(0x2c8)][_0x399ede(0x16e)]['Mechanics'][_0x399ede(0x2a0)][_0x399ede(0x281)](_0x23effd);}},Game_Battler[_0x324937(0x256)][_0x324937(0x36d)]=function(){const _0xf41050=_0x324937;if(!Game_Battler[_0xf41050(0x37b)])return![];if(!this[_0xf41050(0x373)]())return![];if(!this[_0xf41050(0x127)]())return![];if(this[_0xf41050(0x2cd)]())return![];const _0x1d4123=JsonEx[_0xf41050(0x130)](this);return _0x1d4123[_0xf41050(0x262)]=!![],_0x1d4123[_0xf41050(0x338)]=!![],_0x1d4123[_0xf41050(0x1b3)](),_0x1d4123[_0xf41050(0x288)](0x1),_0x1d4123[_0xf41050(0x288)](0x2),_0x1d4123['refresh'](),_0x1d4123['canMove']();},VisuMZ['BattleSystemOTB'][_0x324937(0x13c)]=Game_Action['prototype'][_0x324937(0xc6)],Game_Action[_0x324937(0x256)]['allowRandomSpeed']=function(){const _0x445e03=_0x324937;if(BattleManager[_0x445e03(0x22d)]()){if('BtkGL'===_0x445e03(0x27d))return VisuMZ[_0x445e03(0x2c8)]['Settings'][_0x445e03(0x2b1)]['AllowRandomSpeed'];else _0x38c990['BattleSystemOTB'][_0x445e03(0x301)][_0x445e03(0x281)](this),this[_0x445e03(0x22d)]()&&_0x1b0d29[_0x445e03(0x17b)]()&&!this[_0x445e03(0x255)]&&this[_0x445e03(0x141)]();}else return VisuMZ[_0x445e03(0x2c8)]['Game_Action_allowRandomSpeed'][_0x445e03(0x281)](this);},Game_Battler[_0x324937(0x256)][_0x324937(0x2d9)]=function(_0x4879b6){const _0xda7519=_0x324937;if(!this[_0xda7519(0x2cd)]())return;this[_0xda7519(0x2ae)]=this[_0xda7519(0x2ae)]||0x0,this[_0xda7519(0x2ae)]--,BattleManager[_0xda7519(0x19a)](this,_0x4879b6,BattleManager[_0xda7519(0x13b)]);},Game_Battler[_0x324937(0x256)][_0x324937(0x233)]=function(_0x422707,_0x2aeba3){const _0x2f2f14=_0x324937;if(!this['canMove']())return;_0x2aeba3?BattleManager['otbAddBattlerToTurnOrderAtEnd'](this,_0x422707,BattleManager[_0x2f2f14(0x13b)]):BattleManager[_0x2f2f14(0x212)](this,_0x422707,BattleManager[_0x2f2f14(0x159)]);},Game_Battler['prototype']['canChangeOtbTurnOrder']=function(){const _0x584f9f=_0x324937;if(this[_0x584f9f(0x34e)]()===Infinity)return![];return!![];},Game_Battler[_0x324937(0x256)]['otbProcessActionCheck']=function(_0x3b12b3,_0x33c131){const _0x374cb2=_0x324937;if(this[_0x374cb2(0x338)]||this[_0x374cb2(0x262)])return;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x374cb2(0x22d)]())return;if(_0x3b12b3&&!this[_0x374cb2(0x2cd)]())BattleManager[_0x374cb2(0x35f)]();else!_0x3b12b3&&this[_0x374cb2(0x2cd)]()&&BattleManager[_0x374cb2(0xf7)](this);if(this['canMove']()){if(_0x374cb2(0xe6)!==_0x374cb2(0x126)){const _0x34a210=this[_0x374cb2(0x30a)]()-_0x33c131;_0x34a210>0x0&&(_0x374cb2(0x1fe)===_0x374cb2(0x1fe)?(BattleManager[_0x374cb2(0x212)](this,_0x34a210,BattleManager[_0x374cb2(0x13b)]),BattleManager[_0x374cb2(0x212)](this,_0x34a210,BattleManager[_0x374cb2(0x159)])):_0x2a4084[_0x374cb2(0x1b9)]=_0x256706[_0x374cb2(0x223)](_0x23f621[_0x36f4cd]));}else{if(this[_0x374cb2(0x22d)]())return!![];return _0x474341[_0x374cb2(0x2c8)][_0x374cb2(0xd3)][_0x374cb2(0x281)](this);}}},VisuMZ[_0x324937(0x2c8)]['Game_Battler_addState']=Game_Battler[_0x324937(0x256)][_0x324937(0x365)],Game_Battler[_0x324937(0x256)][_0x324937(0x365)]=function(_0x474ca6){const _0x51409b=_0x324937,_0x22ec17=this[_0x51409b(0x2cd)](),_0x7e2019=this[_0x51409b(0x30a)]();VisuMZ[_0x51409b(0x2c8)]['Game_Battler_addState']['call'](this,_0x474ca6),this[_0x51409b(0x25a)](_0x22ec17,_0x7e2019);},VisuMZ['BattleSystemOTB'][_0x324937(0x245)]=Game_Battler['prototype']['removeState'],Game_Battler['prototype']['removeState']=function(_0x31eccf){const _0x6a6d4c=_0x324937,_0x30358a=this[_0x6a6d4c(0x2cd)](),_0x1a8957=this[_0x6a6d4c(0x30a)]();VisuMZ[_0x6a6d4c(0x2c8)][_0x6a6d4c(0x245)]['call'](this,_0x31eccf),this[_0x6a6d4c(0x25a)](_0x30358a,_0x1a8957);},VisuMZ[_0x324937(0x2c8)][_0x324937(0x31c)]=Game_BattlerBase[_0x324937(0x256)][_0x324937(0x201)],Game_BattlerBase[_0x324937(0x256)][_0x324937(0x201)]=function(){const _0x3b478d=_0x324937;if(BattleManager[_0x3b478d(0x22d)]())this['removeState'](this[_0x3b478d(0xf1)]());VisuMZ[_0x3b478d(0x2c8)]['Game_BattlerBase_recoverAll']['call'](this);if(BattleManager[_0x3b478d(0x22d)]())this[_0x3b478d(0x344)]();},VisuMZ[_0x324937(0x2c8)][_0x324937(0x27e)]=Game_Battler[_0x324937(0x256)][_0x324937(0x261)],Game_Battler['prototype']['forceAction']=function(_0x3110d9,_0x90a404){const _0xe68e0=_0x324937;BattleManager[_0xe68e0(0x22d)]()?this[_0xe68e0(0x174)](_0x3110d9,_0x90a404):VisuMZ[_0xe68e0(0x2c8)][_0xe68e0(0x27e)][_0xe68e0(0x281)](this,_0x3110d9,_0x90a404);},Game_Battler['prototype'][_0x324937(0x174)]=function(_0x59f792,_0x4607dc){const _0x2be4b7=_0x324937,_0x1b7185=new Game_Action(this,!![]);_0x1b7185['setSkill'](_0x59f792),_0x1b7185[_0x2be4b7(0x11a)]=!![];if(_0x4607dc===-0x2)_0x1b7185[_0x2be4b7(0x1fa)](this['_lastTargetIndex']);else{if(_0x4607dc===-0x1){if(_0x2be4b7(0x237)===_0x2be4b7(0x258)){if(this[_0x2be4b7(0x2f8)]!==_0x4c80ae[_0x2be4b7(0x265)]())return this[_0x2be4b7(0x180)]();}else _0x1b7185[_0x2be4b7(0x328)]();}else'VsAlX'===_0x2be4b7(0x1a2)?this['_otbTurnOrderFaceIndex']=this['createTurnOrderOTBGraphicFaceIndex']():_0x1b7185['setTarget'](_0x4607dc);}this['_actions']['push'](_0x1b7185);},VisuMZ[_0x324937(0x2c8)]['BattleManager_forceAction']=BattleManager[_0x324937(0x261)],BattleManager[_0x324937(0x261)]=function(_0x43ab98){const _0x4981c7=_0x324937;BattleManager[_0x4981c7(0x22d)]()?_0x4981c7(0x222)===_0x4981c7(0x113)?(_0x5dd0ad[_0x4981c7(0x162)](_0x455180,_0x1d7421,_0x3d081b/0x2,_0x59c67e,_0x30224f),_0x2579a0[_0x4981c7(0x298)](_0x56056e+_0x1ecf3a/0x2,_0x5a3135,_0x3d4ff7/0x2,_0x5d0d21,_0x1e30bf,_0x4c3c82,![]),_0x4a3df6[_0x4981c7(0x162)](_0x1f5386,_0xcf1b09,_0xeaa867/0x2,_0x1f2d6c,_0x1fe1ed),_0x454b8d[_0x4981c7(0x298)](_0x1a0386+_0x990968/0x2,_0xf69f48,_0x2241c8/0x2,_0x572790,_0x4da8c3,_0xddb204,![]),_0x5e44a5[_0x4981c7(0x162)](_0x4a7f00,_0x2dd1cb,_0x1b4d56/0x2,_0x2f7fc7,_0x3b19ae),_0x50d5ac[_0x4981c7(0x298)](_0x28ba10+_0x4df19e/0x2,_0x73aef4,_0x325edc/0x2,_0x262ee0,_0x3c6414,_0x3a02c4,![])):this[_0x4981c7(0x174)](_0x43ab98):VisuMZ[_0x4981c7(0x2c8)]['BattleManager_forceAction'][_0x4981c7(0x281)](this,_0x43ab98);},BattleManager[_0x324937(0x174)]=function(_0x30d20b){const _0x1cdfb7=_0x324937;BattleManager[_0x1cdfb7(0x211)](_0x30d20b);},VisuMZ[_0x324937(0x2c8)][_0x324937(0x323)]=Game_Actor[_0x324937(0x256)][_0x324937(0x167)],Game_Actor[_0x324937(0x256)][_0x324937(0x167)]=function(){const _0x22cdc9=_0x324937;if(BattleManager[_0x22cdc9(0x22d)]()){if(this[_0x22cdc9(0x2e3)]())this[_0x22cdc9(0x2e3)]()[_0x22cdc9(0x173)]();return![];}return VisuMZ[_0x22cdc9(0x2c8)]['Game_Actor_selectNextCommand'][_0x22cdc9(0x281)](this);},Game_Actor[_0x324937(0x256)]['createTurnOrderOTBGraphicType']=function(){const _0x516590=_0x324937,_0x45f83b=this[_0x516590(0x378)]()[_0x516590(0x169)];if(_0x45f83b[_0x516590(0x2a3)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x516590(0x29f)===_0x516590(0x36b))this['initBattleSystemOTB']();else return _0x516590(0x1c1);}else{if(_0x45f83b[_0x516590(0x2a3)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_OTB_TurnOrder[_0x516590(0x16e)]['ActorBattlerType'];},Game_Actor[_0x324937(0x256)][_0x324937(0x1b7)]=function(){const _0x52f079=_0x324937,_0xeb65a1=this['actor']()['note'];if(_0xeb65a1['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x52f079(0x273)!==_0x52f079(0x273))_0x43ebd7[_0x52f079(0x212)](this,_0x3842c4,_0x2a823f[_0x52f079(0x159)]);else return String(RegExp['$1']);}return this[_0x52f079(0x318)]();},Game_Actor[_0x324937(0x256)]['TurnOrderOTBGraphicFaceIndex']=function(){const _0x2f8e68=_0x324937,_0xc297fe=this['actor']()['note'];if(_0xc297fe[_0x2f8e68(0x2a3)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x2f8e68(0x199)!==_0x2f8e68(0x199))this['_speed']=_0x19ae26;else return Number(RegExp['$2']);}return this[_0x2f8e68(0x297)]();},Game_Actor['prototype'][_0x324937(0x2c7)]=function(){const _0x5be8aa=_0x324937,_0x1f34de=this[_0x5be8aa(0x378)]()[_0x5be8aa(0x169)];if(_0x1f34de[_0x5be8aa(0x2a3)](/<OTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x5be8aa(0x354)!==_0x5be8aa(0x1e0))return Number(RegExp['$1']);else this['isOTB']()?this[_0x5be8aa(0x2f4)]():_0x115381['BattleSystemOTB'][_0x5be8aa(0x192)]['call'](this);}return Window_OTB_TurnOrder[_0x5be8aa(0x16e)][_0x5be8aa(0xf3)];},Game_Enemy[_0x324937(0x256)][_0x324937(0x226)]=function(){const _0x17a546=_0x324937,_0x47b691=this[_0x17a546(0x31b)]()[_0x17a546(0x169)];if(_0x47b691[_0x17a546(0x2a3)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x17a546(0x20b)!==_0x17a546(0x20b)?0x1:_0x17a546(0x1c1);else{if(_0x47b691[_0x17a546(0x2a3)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x17a546(0x353);}return Window_OTB_TurnOrder['Settings']['EnemyBattlerType'];},Game_Enemy[_0x324937(0x256)][_0x324937(0x1f9)]=function(){const _0x5d8603=_0x324937,_0x5316dc=this[_0x5d8603(0x31b)]()[_0x5d8603(0x169)];if(_0x5316dc['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x5d8603(0xe5)==='lPLqg'){this['_targetHomeX']=this['_homeX']=_0xaf31a5['x'],this[_0x5d8603(0x157)]=this[_0x5d8603(0x2d8)]=_0x5a7b2d['y'],this[_0x5d8603(0x266)]=0x0;const _0x225bff=_0xcfa217[_0x5d8603(0x16e)];this['_spriteGroupWidth']=_0x84eb30['ceil']((_0x55d445[_0x5d8603(0x342)]-_0x225bff['SpriteThin']-_0x225bff['SubjectDistance']*0x2)/0x2),_0x225bff[_0x5d8603(0x29e)]?(this[_0x5d8603(0x120)]=_0x26b8d3[_0x5d8603(0x342)]-_0x225bff[_0x5d8603(0x123)],this[_0x5d8603(0x232)]=this[_0x5d8603(0x1ba)]+_0x225bff[_0x5d8603(0x32f)],this[_0x5d8603(0xec)]=0x0):(this['_subjectX']=0x0,this[_0x5d8603(0x232)]=_0x225bff[_0x5d8603(0x123)]+_0x225bff['SubjectDistance'],this[_0x5d8603(0xec)]=this[_0x5d8603(0x232)]+_0x225bff[_0x5d8603(0x32f)]+this['_spriteGroupWidth']);}else return String(RegExp['$1']);}return Window_OTB_TurnOrder['Settings'][_0x5d8603(0x1d2)];},Game_Enemy[_0x324937(0x256)][_0x324937(0x18e)]=function(){const _0x291754=_0x324937,_0x549f68=this[_0x291754(0x31b)]()[_0x291754(0x169)];if(_0x549f68[_0x291754(0x2a3)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if('KVfnq'===_0x291754(0x2e0))return Number(RegExp['$2']);else _0x5922cc+=_0x3fdef7[_0x291754(0x2ca)][_0x291754(0x281)](this);}return Window_OTB_TurnOrder['Settings'][_0x291754(0x11c)];},Game_Enemy[_0x324937(0x256)]['createTurnOrderOTBGraphicIconIndex']=function(){const _0x465c1b=_0x324937,_0x1e9f13=this[_0x465c1b(0x31b)]()[_0x465c1b(0x169)];if(_0x1e9f13[_0x465c1b(0x2a3)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0x465c1b(0x16e)][_0x465c1b(0xf0)];},VisuMZ['BattleSystemOTB'][_0x324937(0x27a)]=Game_Party['prototype']['addActor'],Game_Party['prototype']['addActor']=function(_0x40ad14){const _0x5e19a2=_0x324937;VisuMZ[_0x5e19a2(0x2c8)][_0x5e19a2(0x27a)]['call'](this,_0x40ad14);if(Imported['VisuMZ_2_PartySystem'])return;SceneManager[_0x5e19a2(0x29d)]()&&BattleManager['isOTB']()&&(BattleManager[_0x5e19a2(0x35f)](),BattleManager['otbReturnBattlerToTurnOrders']($gameActors[_0x5e19a2(0x378)](_0x40ad14)));},VisuMZ['BattleSystemOTB'][_0x324937(0x21f)]=Game_Party[_0x324937(0x256)][_0x324937(0x152)],Game_Party['prototype'][_0x324937(0x152)]=function(_0x34386e){const _0xc71d94=_0x324937;VisuMZ[_0xc71d94(0x2c8)][_0xc71d94(0x21f)][_0xc71d94(0x281)](this,_0x34386e),SceneManager[_0xc71d94(0x29d)]()&&BattleManager['isOTB']()&&(_0xc71d94(0x270)!==_0xc71d94(0x270)?(this[_0xc71d94(0x135)]=!![],this[_0xc71d94(0x1e1)](0x0)):BattleManager[_0xc71d94(0x35f)]());},VisuMZ['BattleSystemOTB'][_0x324937(0x33d)]=Scene_Battle['prototype'][_0x324937(0x14b)],Scene_Battle[_0x324937(0x256)]['createActorCommandWindow']=function(){const _0x138a42=_0x324937;VisuMZ[_0x138a42(0x2c8)][_0x138a42(0x33d)][_0x138a42(0x281)](this),BattleManager[_0x138a42(0x22d)]()&&this[_0x138a42(0x347)]();},Scene_Battle[_0x324937(0x256)][_0x324937(0x347)]=function(){const _0x60a8b1=_0x324937,_0x6b8f5e=this[_0x60a8b1(0x219)];this[_0x60a8b1(0x12e)]()&&delete _0x6b8f5e[_0x60a8b1(0x311)][_0x60a8b1(0x316)];},VisuMZ['BattleSystemOTB'][_0x324937(0x37c)]=Scene_Battle[_0x324937(0x256)][_0x324937(0x321)],Scene_Battle[_0x324937(0x256)][_0x324937(0x321)]=function(){const _0x216c6b=_0x324937;BattleManager[_0x216c6b(0x22d)]()?this[_0x216c6b(0x155)]():VisuMZ[_0x216c6b(0x2c8)][_0x216c6b(0x37c)][_0x216c6b(0x281)](this);},Scene_Battle[_0x324937(0x256)]['commandCancelOTB']=function(){const _0x59b7d9=_0x324937;BattleManager[_0x59b7d9(0x376)](),this['_partyCommandWindow'][_0x59b7d9(0x32b)](),this['_actorCommandWindow']['close']();},VisuMZ[_0x324937(0x2c8)]['Scene_Battle_commandFight']=Scene_Battle[_0x324937(0x256)][_0x324937(0x1b0)],Scene_Battle['prototype']['commandFight']=function(){const _0x514dc2=_0x324937;BattleManager['isOTB']()?this[_0x514dc2(0x332)]():VisuMZ[_0x514dc2(0x2c8)][_0x514dc2(0x307)][_0x514dc2(0x281)](this);},VisuMZ[_0x324937(0x2c8)][_0x324937(0x1de)]=Scene_Battle[_0x324937(0x256)]['createAllWindows'],Scene_Battle[_0x324937(0x256)]['createAllWindows']=function(){const _0xbadb89=_0x324937;VisuMZ[_0xbadb89(0x2c8)][_0xbadb89(0x1de)][_0xbadb89(0x281)](this),this[_0xbadb89(0x285)]();},Scene_Battle[_0x324937(0x256)][_0x324937(0x285)]=function(){const _0x318917=_0x324937;if(!BattleManager[_0x318917(0x22d)]())return;this[_0x318917(0xf6)]=new Window_OTB_TurnOrder();const _0x497eaa=this[_0x318917(0x1d7)](this[_0x318917(0x35a)]);this[_0x318917(0x25d)](this[_0x318917(0xf6)],_0x497eaa),this[_0x318917(0x129)](),SceneManager['isPreviousSceneBattleTransitionable']()&&('IKQJq'===_0x318917(0x16b)?this[_0x318917(0xf6)][_0x318917(0x34d)]():_0x3b364b=_0x249054['max'](_0x3d4a84,_0x3ecaef));},Scene_Battle[_0x324937(0x256)]['repositionLogWindowOTB']=function(){const _0x2b3744=_0x324937,_0x2fb101=Window_OTB_TurnOrder['Settings'];if(_0x2fb101['DisplayPosition']!==_0x2b3744(0x325))return;if(!_0x2fb101[_0x2b3744(0x149)])return;if(!this[_0x2b3744(0x11b)])return;const _0xfc1ffa=this['_otbTurnOrderWindow']['y']-Math[_0x2b3744(0x184)]((Graphics[_0x2b3744(0x23a)]-Graphics[_0x2b3744(0x1fc)])/0x2),_0x4a2f56=_0xfc1ffa+this[_0x2b3744(0xf6)][_0x2b3744(0x23a)];this[_0x2b3744(0x11b)]['y']=_0x4a2f56+(_0x2fb101[_0x2b3744(0x2cf)]||0x0);},VisuMZ[_0x324937(0x2c8)][_0x324937(0x22a)]=Scene_Battle[_0x324937(0x256)][_0x324937(0x2b9)],Scene_Battle[_0x324937(0x256)][_0x324937(0x2b9)]=function(){const _0x533ddc=_0x324937;BattleManager['otbPreviewOrderClear'](),VisuMZ['BattleSystemOTB']['Scene_Battle_commandAttack'][_0x533ddc(0x281)](this);},VisuMZ[_0x324937(0x2c8)]['Scene_Battle_commandGuard']=Scene_Battle[_0x324937(0x256)]['commandGuard'],Scene_Battle['prototype'][_0x324937(0x164)]=function(){const _0x22812d=_0x324937;BattleManager[_0x22812d(0x376)](),VisuMZ[_0x22812d(0x2c8)][_0x22812d(0xd5)][_0x22812d(0x281)](this);},VisuMZ[_0x324937(0x2c8)][_0x324937(0x2f6)]=Scene_Battle['prototype'][_0x324937(0x355)],Scene_Battle[_0x324937(0x256)][_0x324937(0x355)]=function(){const _0x38f37a=_0x324937;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x38f37a(0x2c8)][_0x38f37a(0x2f6)]['call'](this);},VisuMZ[_0x324937(0x2c8)]['Scene_Battle_onActorCancel']=Scene_Battle[_0x324937(0x256)]['onActorCancel'],Scene_Battle[_0x324937(0x256)][_0x324937(0x1bc)]=function(){const _0x2877e6=_0x324937;BattleManager[_0x2877e6(0x376)](),VisuMZ[_0x2877e6(0x2c8)][_0x2877e6(0x339)][_0x2877e6(0x281)](this);},VisuMZ[_0x324937(0x2c8)]['Scene_Battle_onEnemyOk']=Scene_Battle[_0x324937(0x256)]['onEnemyOk'],Scene_Battle[_0x324937(0x256)][_0x324937(0x2aa)]=function(){const _0x31e9cf=_0x324937;BattleManager['otbPreviewOrderClear'](),VisuMZ['BattleSystemOTB'][_0x31e9cf(0x1ad)]['call'](this);},VisuMZ[_0x324937(0x2c8)]['Scene_Battle_onEnemyCancel']=Scene_Battle['prototype'][_0x324937(0x20c)],Scene_Battle['prototype'][_0x324937(0x20c)]=function(){const _0x481cba=_0x324937;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x481cba(0x2c8)][_0x481cba(0x345)]['call'](this);},VisuMZ[_0x324937(0x2c8)]['Scene_Battle_onSkillOk']=Scene_Battle[_0x324937(0x256)][_0x324937(0xcd)],Scene_Battle['prototype']['onSkillOk']=function(){const _0xce6e12=_0x324937;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0xce6e12(0x2c8)][_0xce6e12(0x1a7)][_0xce6e12(0x281)](this);},VisuMZ[_0x324937(0x2c8)]['Scene_Battle_onSkillCancel']=Scene_Battle[_0x324937(0x256)][_0x324937(0x1e7)],Scene_Battle[_0x324937(0x256)][_0x324937(0x1e7)]=function(){const _0xba4e30=_0x324937;BattleManager[_0xba4e30(0x376)](),VisuMZ[_0xba4e30(0x2c8)][_0xba4e30(0x359)][_0xba4e30(0x281)](this);},VisuMZ[_0x324937(0x2c8)][_0x324937(0xdd)]=Scene_Battle['prototype'][_0x324937(0x268)],Scene_Battle[_0x324937(0x256)][_0x324937(0x268)]=function(){const _0x474221=_0x324937;BattleManager[_0x474221(0x376)](),VisuMZ[_0x474221(0x2c8)][_0x474221(0xdd)]['call'](this);},VisuMZ[_0x324937(0x2c8)][_0x324937(0x314)]=Scene_Battle[_0x324937(0x256)][_0x324937(0x33b)],Scene_Battle[_0x324937(0x256)]['onItemCancel']=function(){const _0x34e8b2=_0x324937;BattleManager[_0x34e8b2(0x376)](),VisuMZ[_0x34e8b2(0x2c8)][_0x34e8b2(0x314)][_0x34e8b2(0x281)](this);},VisuMZ['BattleSystemOTB']['Scene_Battle_actorCommandSingleSkill']=Scene_Battle['prototype'][_0x324937(0x1c5)],Scene_Battle[_0x324937(0x256)][_0x324937(0x1c5)]=function(){const _0x570792=_0x324937;BattleManager[_0x570792(0x376)](),VisuMZ['BattleSystemOTB'][_0x570792(0x1d6)][_0x570792(0x281)](this);};function Sprite_OTB_TurnOrder_Battler(){this['initialize'](...arguments);}function _0x4ab9(_0x260bee,_0x55c29f){const _0x2f32e1=_0x2f32();return _0x4ab9=function(_0x4ab9db,_0x17be34){_0x4ab9db=_0x4ab9db-0xc1;let _0x25ad3e=_0x2f32e1[_0x4ab9db];return _0x25ad3e;},_0x4ab9(_0x260bee,_0x55c29f);}function _0x2f32(){const _0x4586ce=['call','image','svActorVertCells','bitmapWidth','createOTBTurnOrderWindow','_stateIDs','children','removeStatesAuto','svBattlerName','createNewTurnOrderSprites','select','applyItemTargetEffectOTB','index','ZgcVB','jRoJF','%1-%2','windowRect','description','removeChild','_previewNext','startInput','isUsingSideviewUiLayout','faceIndex','gradientFillRect','DisplayOffsetX','_graphicType','WoaUK','DisplayOffsetY','isSceneBattle','OrderDirection','ZwUCt','InitialSpeedJS','GlViw','TqSKb','match','JBUAV','dResC','RegExp','UiCurrentText','drawText','ShowMarkerBorder','onEnemyOk','Conversion','containerPosition','BlUWJ','_otbTimesActedThisTurn','_nextTurn','_targetHomeX','Mechanics','otbCalcUserCurrentOrderChange','YBMjc','%1BgColor1','trim','center','FaceName','zKGtb','commandAttack','JyoLd','%1SystemBg','registerCommand','2185jwesOj','cjXif','1428KjKNKH','QQkXx','otbCalcTargetNextOrderChange','ceil','gUvUO','Actor','esEpS','_index','createTurnOrderOTBGraphicIconIndex','BattleSystemOTB','TargetFollOrder','ConvertSpeedJS','ConvertAgiDebuffNext','_lastTargetIndex','canMove','updateGraphicHue','LogWindowOffsetY','STRUCT','RepositionTopHelpY','inputtingAction','setText','ConvertParams','_isAlive','drawDimmedArea','TurnOrderOTBGraphicIconIndex','_homeY','otbGainInstant','defaultPosition','1wKcTeV','format','UiNextOffsetX','_forcedBattlers','otbRemoveCurrentSubject','KVfnq','makeActionOrders','isTpb','battler','onTurnEndOTB','bvuYd','_homeX','_otbTurnOrderFaceName','ScreenBuffer','length','canChangeOtbTurnOrder','BQhHp','BattleManager_finishActorInput','contents','battlerHue','BattleManager_endTurn','WidthBase','jWIdi','Game_Battler_onBattleStart','concat','processTurnOTB','otbRemoveUnableTurnOrderSprites','Scene_Battle_onActorOk','processTurn','_graphicSv','mWGJM','_blendColor','blt','OTB','allBattleMembers','Game_BattlerBase_hide','_instance','_statusWindow','BattleManager_startInput','VlSHR','UiSubjectOffsetY','cFJLQ','otbPreviewOrderChange','startActorInput','Scene_Battle_commandFight','wLjdq','FlWog','makeActionTimes','EDnYS','_plural','_ogWindowLayerX','otbCalcUserNextOrderChange','numActions','tVzAx','_handlers','applyItemAddedActionOTB','changeIconGraphicBitmap','Scene_Battle_onItemCancel','BgDimStyle','cancel','svActorHorzCells','faceName','EnemyBattlerDrawLetter','EFFECT_ADD_BUFF','enemy','Game_BattlerBase_recoverAll','Window_Selectable_select','makeActions','KJWGt','_letterSprite','commandCancel','loadSvActor','Game_Actor_selectNextCommand','changeEnemyGraphicBitmap','top','clamp','setHue','decideRandomTarget','refreshTurnOrder','_graphicSprite','setup','setItem','fDOFw','UiFontSize','SubjectDistance','jSJAb','iconHeight','startActorCommandSelection','TfGLt','OTB_STUN_INFINITY_CLAMP','performCollapse','_isAppeared','changeSourceArray','_tempBattler','Scene_Battle_onActorCancel','_fadeDuration','onItemCancel','EnemyBattlerFontFace','Scene_Battle_createActorCommandWindow','17236YKUBGK','UserCurrOrder','odVsH','_offset','width','updateSelectionEffect','refresh','Scene_Battle_onEnemyCancel','BorderThickness','createActorCommandWindowOTB','_previewContainer','attack','requestUpdateTurnOrders','OtbTurnOrderEnemyFace','gSJNs','resumeTurnOrderSprites','speed','_subject','OTB_CONVERT_AGI_BUFF_NEXT_TURN','changeFaceGraphicBitmap','BattleManager_isActiveTpb','icon','lCuOb','onActorOk','svactor','Game_Battler_onBattleEnd','additionalTargetXAdjustments','Scene_Battle_onSkillCancel','_windowLayer','#000000','createOrderPreview','performActionEndOTB','ARRAYEVAL','removeActionBattlersOTB','currentSymbol','EFFECT_ADD_DEBUFF','GetAllIndicies','create','dimColor1','addState','getBorderThickness','_letter','OtbTurnOrderActorIcon','BattleManager_battleSys','status','lVCtw','sRmFB','isInfinitySpeedOTB','gradient','loadFace','moveToPosition','kvOoy','mcUAt','isAlive','mAbzv','DedFU','otbPreviewOrderClear','shiftTurnOrderForSubject','actor','BattleManager_endAction','endTurn','OTB_STUN_INFINITY_SPEED','Scene_Battle_commandCancel','HNugs','makeNextActionOrdersOTB','applyGlobal','updateVisibility','_fadeTarget','iconWidth','gYiCe','createBackgroundSprite','allowRandomSpeed','addBattlerToTurnOrderAtEnd','effects','IconSet','PMZyO','wjvps','CVCJi','onSkillOk','clearTurnOrderOTBGraphics','txBMr','_fadeSpeed','TargetCurrOrder','shiftNextTurnSpritesToCurrentTurn','BattleManager_isTurnBased','Instant','Scene_Battle_commandGuard','OtbTurnOrderClearActorGraphic','preEndActionOTB','parameters','tktvF','_previewCurrent','subject','_otbTurnOrderFaceIndex','Scene_Battle_onItemOk','sortContainer','xfDLx','otbUnshiftBattlerToTurnOrders','WgnWs','WmtWV','adjustForPreview','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','kCdBB','UoAKm','8349592YudeBR','turnOrderChangeOTB','YLlCN','drawBgImage','applyItemUserEffect','_nextX','dRGxv','padding','ZNfyp','EnemyBattlerIcon','deathStateId','_unit','ActorBattlerIcon','members','fKULS','_otbTurnOrderWindow','otbReturnBattlerToTurnOrders','fontSize','update','BattleManager_setup','Game_Battler_onTurnEnd','clear','TVOyG','BattleManager_selectNextActor','active','UserAddActionNext','initialize','clearRect','createChildren','updateOpacity','oGLKu','_graphicHue','DisplayPosition','ConvertAgiBuffCurrent','VisuMZ_3_SideviewBattleUI','initHomePositions','return\x200','yszFU','getStateIdWithName','BXfDH','_currentActor','setSkill','26916SIPJrM','_backgroundSprite','imolo','onBattleStartOTB','otbCreateNewTurnOrderSprites','_requestTurnOrderUpdate','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','OtbTurnOrderActorFace','ActionBattlersFilter','_forceAction','_logWindow','EnemyBattlerFaceIndex','calculateTargetIndex','isBattleSystemOTBTurnOrderVisible','yTuZY','_subjectX','battleMembers','4493187bDWabO','SpriteThin','Game_Action_speed','ZsgfK','VjNaj','isAppeared','TurnOrderOTBGraphicFaceIndex','repositionLogWindowOTB','BattleManager_isTpb','onBattleStart','contentsBack','FaceIndex','isPartyCommandWindowDisabled','postEndActionOTB','makeDeepCopy','createOrderPreviewSprite','onBattleEnd','setBlendColor','indexOf','_isBattleOver','SystemTurnOrderVisibility','_inputting','PreviewOffsetY','oAhza','HBKKl','_actionBattlers','Game_Action_allowRandomSpeed','startTurn','changeSvActorGraphicBitmap','faceWidth','isEnemy','startInputOTB','HvzSX','EnableActionTimes','HgpKs','updatePadding','code','IconIndex','rpVnc','RepositionLogWindow','constructor','createActorCommandWindow','VylOV','item','bottom','initMembers','DCDEp','Game_Action_applyItemUserEffect','removeActor','findIndex','JumkM','commandCancelOTB','battleSys','_targetHomeY','_ogWindowLayerY','_otb_actionBattlersNext','makeSpeed','initBattleSystemOTB','singleSkill','_helpWindow','push','right','getInfinityClamp','_actorWindow','fillRect','setGuard','commandGuard','min','kVuEh','selectNextCommand','Window_Help_setItem','note','containerWindow','IKQJq','%1BorderColor','otbCalcTargetCurrentOrderChange','Settings','ZFwgJ','DJHcT','Enemy','createTurnOrderSprites','stepForward','forceActionOTB','left','removeCurrentSubject','SideviewBattleUI','UiNextOffsetY','_preemptive','hasSvBattler','canInput','rauSH','map','createSpriteContainers','applyBattleItemWindowOTB','processUpdateGraphic','needsSelection','_positionTargetY','makeActionOrdersOTB','round','Ijhob','ipFXJ','splice','calculateTargetPositions','dataId','addLoadListener','removeUnableTurnOrderSprites','Game_BattlerBase_appear','AmyfV','createTurnOrderOTBGraphicFaceIndex','toUpperCase','fontFace','PreviewScale','BattleManager_processTurn','zOibd','loadEnemy','isTurnBased','createLetterSprite','_positionDuration','_currentTurn','LjzOk','otbAddBattlerToTurnOrderAtStart','lDqQV','ARRAYSTR','endAction','_bgImageSprite','cdaBU','_graphicFaceIndex','xtuec','jqoIU','UpdateFrames','anmHC','UiCurrentOffsetX','otbApplyActionTimes','Scene_Battle_onSkillOk','OOFGx','dimColor2','OtbTurnOrderEnemyIcon','%1BgColor2','updateTurnOrders','Scene_Battle_onEnemyOk','_otbTurnOrderGraphicType','_graphicFaceName','commandFight','_contentsBackSprite','mainFontFace','updateStateTurns','TargetNextOrder','includes','_containerHeight','TurnOrderOTBGraphicFaceName','randomInt','bitmap','_spriteGroupWidth','_spriteContainer','onActorCancel','RepositionTopForHelp','remove','currentAction','Game_Battler_makeSpeed','face','uFNtU','selectNextActorOTB','430DKggVi','actorCommandSingleSkill','EnemyBattlerFontSize','EnemyBattlerType','isNextOtbSubject','BattleManager_getNextSubject','visible','afoCR','resetFontSettings','cHYZs','InfinityClamp','unshift','otbShiftTurnOrderForSubject','QDvAC','EnemyBattlerFaceName','waYkV','createInitialPositions','ochOB','Scene_Battle_actorCommandSingleSkill','getChildIndex','YuIMT','filter','RyoWY','setOTBGraphicIconIndex','nldnr','RcOAs','Scene_Battle_createAllWindows','OTB_CONVERT_AGI_BUFF_CURRENT_TURN','vXgtf','startFade','Game_Battler_performCollapse','KNrwU','initMembersOTB','BgImageFilename','addForceActionBattler','onSkillCancel','_graphicEnemy','AMQPS','getBattleSystem','noOCC','getNextSubject','oKNnO','PreviewActor','setBattleSystemOTBTurnOrderVisible','shift','onTurnEnd','floor','OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN','selectNextActor','OTB_CONVERT_AGI_DEBUFF_NEXT_TURN','_graphicIconIndex','endBattlerActions','ARRAYNUM','createTurnOrderOTBGraphicFaceName','setTarget','PostStunInfinitySpeed','boxHeight','finishActorInput','GuBPr','_otbTurnOrderVisible','bcUMS','recoverAll','FoNQT','fnGRP','_containerWidth','UserFollOrder','yxafe','VloZV','_sourceArray','fwvMK','OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER','WfwML','onEnemyCancel','_otb_createdFirstTurnOrders','auto','getColor','IspYu','otbAddForceActionBattler','otbAddBattlerToTurnOrderAtEnd','1295902PLrbIq','previewOrderByAction','Actors','cxnea','_scene','removeSprite','_actorCommandWindow','UserAddActionCurrent','LvNZr','addChildToBack','parse','Game_System_initialize','Game_Party_removeActor','opacity','name','hHFNO','loadSystem','addChild','TurnOrder','createTurnOrderOTBGraphicType','BgImageOffsetX','BgImageOffsetY','sort','Scene_Battle_commandAttack','ConvertAgiDebuffCurrent','1212101egMKiq','isOTB','SWGCE','processSpriteRemoval','lTpke','gyghp','_currentX','otbAddActions','BattleManager_makeActionOrders','UiNextText','updateLetter','Acyfk','%1SystemBorder','applyGlobalBattleSystemOTB','height','ActionBattlersNextFilter','isBattleItemWindowOTB','EVAL','GHhRX','appear','addBattlerToTurnOrderAtStart','Visible','hide','mqxfN','faceHeight','Game_Battler_removeState','_phase','SpriteLength','UiCurrentOffsetY','isHorz','battleEnd','bind','RandomizeActionTimesOrder','bitmapHeight','drawUiText','createGraphicSprite','max','makeOTBSpeed','PwQBl','mainSprite','aXpnf','_surprise','prototype','checkOpacity','XEQQJ','ARRAYFUNC','otbProcessActionCheck','mTxjT','sVHEi','addChildAt','goJor','UiSubjectText','lineHeight','forceAction','_tempActor','clearOrderPreview','onBattleEndOTB','battlerName','_homeDuration','isActor','onItemOk','setAttack','_positionTargetX','otbShiftNextTurnSpritesToCurrentTurn','isBattleMember','KMlmA','zshrz','_otbTurnOrderIconIndex','SNKBA','updatePosition','_actions','TArTK','exit','YJkuh','OTB_ADDED_ACTION_TIMES','getUnitSideSide','OtbTurnOrderClearEnemyGraphic','anchor','Game_Party_addActor','CEAAt','createBorderSprite','BtkGL','Game_Battler_forceAction','8950374ZZkSfD','TurnOrderOTBGraphicType'];_0x2f32=function(){return _0x4586ce;};return _0x2f32();}Sprite_OTB_TurnOrder_Battler['prototype']=Object['create'](Sprite_Clickable[_0x324937(0x256)]),Sprite_OTB_TurnOrder_Battler['prototype']['constructor']=Sprite_OTB_TurnOrder_Battler,Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x101)]=function(_0x4fbbe8,_0x4e3aa6,_0x214d3b){const _0x1f12e7=_0x324937;this[_0x1f12e7(0x14f)](_0x4fbbe8,_0x4e3aa6,_0x214d3b),Sprite_Clickable[_0x1f12e7(0x256)]['initialize'][_0x1f12e7(0x281)](this),this[_0x1f12e7(0x220)]=0x0,this['createChildren'](),this['checkOpacity']();},Sprite_OTB_TurnOrder_Battler['prototype'][_0x324937(0x14f)]=function(_0x4c7d7c,_0x4834a4,_0x3fa615){const _0x578dea=_0x324937;this[_0x578dea(0xf2)]=_0x4c7d7c[_0x578dea(0x267)]()?$gameParty:$gameTroop,this['_index']=_0x4c7d7c[_0x578dea(0x28d)](),this[_0x578dea(0x2ff)]=_0x4834a4,this[_0x578dea(0x208)]=_0x3fa615;const _0x57b0d7=Window_OTB_TurnOrder[_0x578dea(0x16e)],_0x128093=this['isHorz']();this[_0x578dea(0x197)]=0x0,this[_0x578dea(0x26a)]=_0x57b0d7['OrderDirection']?-_0x57b0d7[_0x578dea(0x123)]:this[_0x578dea(0x16a)]()['width'],this[_0x578dea(0x182)]=0x0,this[_0x578dea(0x33a)]=0x0,this[_0x578dea(0xc2)]=0xff,this[_0x578dea(0x2d5)]=![],this[_0x578dea(0x336)]=![],this[_0x578dea(0x204)]=0x0,this[_0x578dea(0x1b6)]=0x0;},Sprite_OTB_TurnOrder_Battler['prototype'][_0x324937(0x103)]=function(){const _0x56a9fe=_0x324937;this[_0x56a9fe(0x1d4)](),this[_0x56a9fe(0xc5)](),this[_0x56a9fe(0x24f)](),this[_0x56a9fe(0x27c)](),this['createLetterSprite']();},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x1d4)]=function(){const _0x46c379=_0x324937;this['x']=this[_0x46c379(0x26a)],this['y']=this[_0x46c379(0x182)];},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x249)]=function(){return!![];},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x284)]=function(){const _0x48c61a=_0x324937,_0x72468b=Window_OTB_TurnOrder[_0x48c61a(0x16e)];return _0x72468b[_0x48c61a(0x123)];},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x24d)]=function(){const _0x5a6c21=_0x324937,_0x2a4384=Window_OTB_TurnOrder[_0x5a6c21(0x16e)];return _0x2a4384['SpriteLength'];},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x277)]=function(){const _0x4e99d8=_0x324937;return this[_0x4e99d8(0xf2)]===$gameParty?_0x4e99d8(0x2c4):_0x4e99d8(0x171);},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)]['createBackgroundSprite']=function(){const _0x4ae1a8=_0x324937;if(!Window_OTB_TurnOrder['Settings']['ShowMarkerBg'])return;const _0x5884a6=Window_OTB_TurnOrder['Settings'],_0x1609d1=this['getUnitSideSide'](),_0x161c26=_0x4ae1a8(0x2bb)[_0x4ae1a8(0x2dc)](_0x1609d1),_0x191c00=new Sprite();_0x191c00[_0x4ae1a8(0x279)]['x']=this[_0x4ae1a8(0x279)]['x'],_0x191c00[_0x4ae1a8(0x279)]['y']=this[_0x4ae1a8(0x279)]['y'];if(_0x5884a6[_0x161c26])_0x191c00[_0x4ae1a8(0x1b9)]=ImageManager[_0x4ae1a8(0x223)](_0x5884a6[_0x161c26]);else{const _0xcc101a=this[_0x4ae1a8(0x284)](),_0x3ca451=this['bitmapHeight']();_0x191c00[_0x4ae1a8(0x1b9)]=new Bitmap(_0xcc101a,_0x3ca451);const _0x168c36=ColorManager[_0x4ae1a8(0x20f)](_0x5884a6[_0x4ae1a8(0x2b4)[_0x4ae1a8(0x2dc)](_0x1609d1)]),_0x53bbee=ColorManager[_0x4ae1a8(0x20f)](_0x5884a6[_0x4ae1a8(0x1ab)['format'](_0x1609d1)]);_0x191c00[_0x4ae1a8(0x1b9)][_0x4ae1a8(0x298)](0x0,0x0,_0xcc101a,_0x3ca451,_0x168c36,_0x53bbee,!![]);}this['_backgroundSprite']=_0x191c00,this['addChild'](this[_0x4ae1a8(0x112)]),this[_0x4ae1a8(0x342)]=this[_0x4ae1a8(0x112)][_0x4ae1a8(0x342)],this['height']=this['_backgroundSprite'][_0x4ae1a8(0x23a)];},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x24f)]=function(){const _0x3a481b=_0x324937,_0x5bbcc1=new Sprite();_0x5bbcc1[_0x3a481b(0x279)]['x']=this[_0x3a481b(0x279)]['x'],_0x5bbcc1[_0x3a481b(0x279)]['y']=this['anchor']['y'],this[_0x3a481b(0x32a)]=_0x5bbcc1,this['addChild'](this[_0x3a481b(0x32a)]),this[_0x3a481b(0x180)]();},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)]['createBorderSprite']=function(){const _0x6d774d=_0x324937;if(!Window_OTB_TurnOrder[_0x6d774d(0x16e)][_0x6d774d(0x2a9)])return;const _0x126d50=Window_OTB_TurnOrder[_0x6d774d(0x16e)],_0x3ac350=this['getUnitSideSide'](),_0x3bcaea=_0x6d774d(0x238)[_0x6d774d(0x2dc)](_0x3ac350),_0x136d85=new Sprite();_0x136d85[_0x6d774d(0x279)]['x']=this[_0x6d774d(0x279)]['x'],_0x136d85[_0x6d774d(0x279)]['y']=this[_0x6d774d(0x279)]['y'];if(_0x126d50[_0x3bcaea]){if(_0x6d774d(0x1c2)!==_0x6d774d(0x37d))_0x136d85['bitmap']=ImageManager[_0x6d774d(0x223)](_0x126d50[_0x3bcaea]);else{const _0x54cf94=new _0x4fee9a(_0x3f38d7,-0x1,null);this[_0x6d774d(0x1bb)][_0x6d774d(0x224)](_0x54cf94),this[_0x6d774d(0x34f)]=_0x54cf94,_0x54cf94[_0x6d774d(0x1e1)](0xff),_0x54cf94[_0x6d774d(0x197)]=0x258,_0x54cf94['x']=this[_0x6d774d(0x120)],_0x54cf94[_0x6d774d(0x26a)]=this[_0x6d774d(0x120)],_0x5dad41&&(_0x54cf94[_0x6d774d(0x220)]=0xff);}}else{let _0x3c2448=this['bitmapWidth'](),_0x424f82=this[_0x6d774d(0x24d)](),_0x487691=this['getBorderThickness']();_0x136d85['bitmap']=new Bitmap(_0x3c2448,_0x424f82);const _0x39b00b=_0x6d774d(0x35b),_0x7257d=ColorManager['getColor'](_0x126d50['%1BorderColor'[_0x6d774d(0x2dc)](_0x3ac350)]);_0x136d85['bitmap'][_0x6d774d(0x162)](0x0,0x0,_0x3c2448,_0x424f82,_0x39b00b),_0x3c2448-=0x2,_0x424f82-=0x2,_0x136d85[_0x6d774d(0x1b9)][_0x6d774d(0x162)](0x1,0x1,_0x3c2448,_0x424f82,_0x7257d),_0x3c2448-=_0x487691*0x2,_0x424f82-=_0x487691*0x2,_0x136d85[_0x6d774d(0x1b9)]['fillRect'](0x1+_0x487691,0x1+_0x487691,_0x3c2448,_0x424f82,_0x39b00b),_0x3c2448-=0x2,_0x424f82-=0x2,_0x487691+=0x1,_0x136d85[_0x6d774d(0x1b9)][_0x6d774d(0x102)](0x1+_0x487691,0x1+_0x487691,_0x3c2448,_0x424f82);}this['_backgroundSprite']=_0x136d85,this['addChild'](this[_0x6d774d(0x112)]);},Sprite_OTB_TurnOrder_Battler['prototype']['getBorderThickness']=function(){const _0x3d1522=_0x324937,_0x2ce5ce=Window_OTB_TurnOrder[_0x3d1522(0x16e)];return _0x2ce5ce[_0x3d1522(0x346)];},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x196)]=function(){const _0x4e80ba=_0x324937,_0x2f1870=Window_OTB_TurnOrder[_0x4e80ba(0x16e)];if(!_0x2f1870[_0x4e80ba(0x319)])return;if(this['_unit']===$gameParty)return;const _0x59599b=this['bitmapWidth'](),_0x530ad7=this[_0x4e80ba(0x24d)](),_0x220df6=new Sprite();_0x220df6['anchor']['x']=this['anchor']['x'],_0x220df6[_0x4e80ba(0x279)]['y']=this[_0x4e80ba(0x279)]['y'],_0x220df6[_0x4e80ba(0x1b9)]=new Bitmap(_0x59599b,_0x530ad7),this['_letterSprite']=_0x220df6,this[_0x4e80ba(0x224)](this[_0x4e80ba(0x320)]);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x324937(0x2e3)]=function(){const _0x38a496=_0x324937;return this[_0x38a496(0xf2)]?this[_0x38a496(0xf2)][_0x38a496(0xf4)]()[this[_0x38a496(0x2c6)]]:null;},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0xf9)]=function(){const _0x20d541=_0x324937;Sprite_Clickable[_0x20d541(0x256)][_0x20d541(0xf9)][_0x20d541(0x281)](this),this[_0x20d541(0x271)](),this[_0x20d541(0x257)](),this[_0x20d541(0x104)](),this['updateGraphic'](),this[_0x20d541(0x2ce)](),this[_0x20d541(0x236)](),this[_0x20d541(0x343)]();},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x370)]=function(_0x5db392,_0x9a6909){const _0x3172b7=_0x324937,_0x2d8a2a=Window_OTB_TurnOrder['Settings'];this['_positionDuration']=_0x2d8a2a[_0x3172b7(0x1a3)],this[_0x3172b7(0x26a)]=_0x5db392,this[_0x3172b7(0x182)]=_0x9a6909;},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x271)]=function(){const _0x51854c=_0x324937;if(this[_0x51854c(0x197)]>0x0){const _0x4012e3=this[_0x51854c(0x197)];this['x']=(this['x']*(_0x4012e3-0x1)+this['_positionTargetX'])/_0x4012e3,this['y']=(this['y']*(_0x4012e3-0x1)+this['_positionTargetY'])/_0x4012e3,this[_0x51854c(0x197)]--;}if(this[_0x51854c(0x197)]<=0x0){if(_0x51854c(0x185)!=='Ijhob')return _0x41c1d3['BattleSystemOTB'][_0x51854c(0x13c)][_0x51854c(0x281)](this);else{this['x']=this[_0x51854c(0x26a)],this['y']=this[_0x51854c(0x182)];if(this[_0x51854c(0x220)]<0xff&&!this[_0x51854c(0x135)]&&this['_fadeDuration']<=0x0){const _0xd3ee68=this[_0x51854c(0x2e3)]();_0xd3ee68&&(this[_0x51854c(0xc2)]=_0xd3ee68[_0x51854c(0x373)]()&&_0xd3ee68['isAppeared']()?0xff:0x0);}}}},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)]['defaultPosition']=function(){return 0x1;},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)]['containerWindow']=function(){const _0x59337b=_0x324937;return SceneManager[_0x59337b(0x217)]['_otbTurnOrderWindow'];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x324937(0x2ac)]=function(){const _0xd3d51f=_0x324937,_0x42b1b5=this[_0xd3d51f(0x2e3)]();if(!_0x42b1b5)return this[_0xd3d51f(0x2da)]();if(_0x42b1b5===BattleManager[_0xd3d51f(0x34f)])return'KfaAq'===_0xd3d51f(0x148)?this[_0xd3d51f(0x180)]():0x0;if(BattleManager[_0xd3d51f(0x13b)][_0xd3d51f(0x1b5)](_0x42b1b5)){const _0x57c370=BattleManager[_0xd3d51f(0x13b)][_0xd3d51f(0x134)](_0x42b1b5)+0x1;return _0x57c370;}return this[_0xd3d51f(0x2da)]();},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x1e1)]=function(_0x5dd9e7){const _0x855ebc=_0x324937,_0x41384a=Window_OTB_TurnOrder['Settings'];this[_0x855ebc(0x33a)]=_0x41384a[_0x855ebc(0x1a3)],this['_fadeTarget']=_0x5dd9e7;},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)]['checkOpacity']=function(){const _0x4de650=_0x324937,_0x2a23d2=this['battler']();if(!_0x2a23d2)return;if(this[_0x4de650(0x2d5)]===_0x2a23d2['isAlive']()&&this[_0x4de650(0x336)]===_0x2a23d2['isAppeared']())return;this['_isAlive']=_0x2a23d2[_0x4de650(0x373)](),this[_0x4de650(0x336)]=_0x2a23d2[_0x4de650(0x127)]();let _0x4e67fa=this[_0x4de650(0x2d5)]&&this['_isAppeared']?0xff:0x0;this['startFade'](_0x4e67fa);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x324937(0x104)]=function(){const _0x34c646=_0x324937;if(this[_0x34c646(0x33a)]>0x0){const _0x4673eb=this[_0x34c646(0x33a)];this[_0x34c646(0x220)]=(this[_0x34c646(0x220)]*(_0x4673eb-0x1)+this[_0x34c646(0xc2)])/_0x4673eb,this[_0x34c646(0x33a)]--,this[_0x34c646(0x33a)]<=0x0&&(this['opacity']=this[_0x34c646(0xc2)]);}if(this[_0x34c646(0x135)])return;if(BattleManager[_0x34c646(0x246)]===_0x34c646(0x24a)){if(_0x34c646(0x275)!=='YJkuh')return this[_0x34c646(0x180)]();else this['_isBattleOver']=!![],this[_0x34c646(0x1e1)](0x0);}},Sprite_OTB_TurnOrder_Battler['prototype']['updateGraphic']=function(){const _0x3982ec=_0x324937,_0x9de04=this['battler']();if(!_0x9de04)return;const _0x4514df=Window_OTB_TurnOrder[_0x3982ec(0x16e)],_0x24d319=this[_0x3982ec(0xf2)]===$gameParty?_0x3982ec(0x2c4):_0x3982ec(0x171);let _0x50d117=_0x9de04[_0x3982ec(0x280)]();if(_0x9de04[_0x3982ec(0x267)]()&&_0x50d117===_0x3982ec(0x31b))_0x50d117=_0x3982ec(0x1c1);else _0x9de04[_0x3982ec(0x140)]()&&_0x50d117==='svactor'&&(_0x50d117='enemy');if(this[_0x3982ec(0x29a)]!==_0x50d117){if('cjXif'===_0x3982ec(0x2be))return this[_0x3982ec(0x180)]();else _0x29f15f[_0x3982ec(0x376)](),_0x27e686[_0x3982ec(0x2c8)][_0x3982ec(0xdd)][_0x3982ec(0x281)](this);}switch(this[_0x3982ec(0x29a)]){case _0x3982ec(0x1c1):if(this[_0x3982ec(0x1af)]!==_0x9de04['TurnOrderOTBGraphicFaceName']())return this[_0x3982ec(0x180)]();if(this[_0x3982ec(0x1a0)]!==_0x9de04['TurnOrderOTBGraphicFaceIndex']()){if(_0x3982ec(0x1d5)!==_0x3982ec(0x1d5)){const _0x27debb=this['battler']();if(!_0x27debb)return;if(!_0x27debb[_0x3982ec(0x140)]())return;if(this['_graphicHue']===_0x27debb[_0x3982ec(0x2ee)]())return;this['_graphicHue']=_0x27debb[_0x3982ec(0x2ee)]();if(_0x27debb[_0x3982ec(0x17a)]())this[_0x3982ec(0x106)]=0x0;this['_graphicSprite'][_0x3982ec(0x327)](this[_0x3982ec(0x106)]);}else return this[_0x3982ec(0x180)]();}break;case _0x3982ec(0x353):if(this['_graphicIconIndex']!==_0x9de04['TurnOrderOTBGraphicIconIndex']())return this[_0x3982ec(0x180)]();break;case'enemy':if(_0x9de04[_0x3982ec(0x17a)]()){if(_0x3982ec(0x150)===_0x3982ec(0x150)){if(this[_0x3982ec(0x2f8)]!==_0x9de04[_0x3982ec(0x289)]()){if('crhxR'===_0x3982ec(0x28f))this[_0x3982ec(0x29a)]=_0x3982ec(0x31b);else return this['processUpdateGraphic']();}}else this[_0x3982ec(0x1c3)]();}else{if(this['_graphicEnemy']!==_0x9de04['battlerName']())return this[_0x3982ec(0x180)]();}break;case _0x3982ec(0x356):if(_0x9de04[_0x3982ec(0x267)]()){if(_0x3982ec(0x2c0)!=='CSQvh'){if(this[_0x3982ec(0x2f8)]!==_0x9de04['battlerName']())return this[_0x3982ec(0x180)]();}else{const _0x56ed8d=this[_0x3982ec(0x284)](),_0x13642d=this['bitmapHeight'](),_0x276dbb=_0x5ca0a3['min'](_0x56ed8d,_0x13642d);this[_0x3982ec(0x32a)][_0x3982ec(0x1b9)]=new _0x1fdaa0(_0x56ed8d,_0x13642d);const _0x9d49d5=this[_0x3982ec(0x32a)][_0x3982ec(0x1b9)],_0x19be64=this[_0x3982ec(0x2f8)]['match'](/\$/i),_0x375a4b=_0x19be64?0x1:_0x22743d[_0x3982ec(0x317)],_0x4b5ccb=_0x19be64?0x1:_0xaff2d7[_0x3982ec(0x283)],_0x144c6f=_0x412175[_0x3982ec(0x342)]/_0x375a4b,_0x77abf4=_0x46cb82[_0x3982ec(0x23a)]/_0x4b5ccb,_0xf01b2e=_0x14992e[_0x3982ec(0x165)](0x1,_0x276dbb/_0x144c6f,_0x276dbb/_0x77abf4),_0x5b35d8=_0x144c6f*_0xf01b2e,_0xca6971=_0x77abf4*_0xf01b2e,_0x3b4cb6=_0x2d7354[_0x3982ec(0x184)]((_0x56ed8d-_0x5b35d8)/0x2),_0x12dfd8=_0x59c55e[_0x3982ec(0x184)]((_0x13642d-_0xca6971)/0x2);_0x9d49d5[_0x3982ec(0x2fb)](_0x12bb3a,0x0,0x0,_0x144c6f,_0x77abf4,_0x3b4cb6,_0x12dfd8,_0x5b35d8,_0xca6971);}}else{if(this[_0x3982ec(0x1e8)]!==_0x9de04[_0x3982ec(0x265)]())return this[_0x3982ec(0x180)]();}break;}},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x180)]=function(){const _0x370bcb=_0x324937,_0x5b766e=this[_0x370bcb(0x2e3)]();if(!_0x5b766e)return;this[_0x370bcb(0x29a)]=_0x5b766e[_0x370bcb(0x280)]();if(_0x5b766e[_0x370bcb(0x267)]()&&this[_0x370bcb(0x29a)]===_0x370bcb(0x31b))_0x370bcb(0x1cd)!==_0x370bcb(0x1cd)?_0x169599+=_0x3fb0d3(_0x74485d['$1']):this[_0x370bcb(0x29a)]=_0x370bcb(0x1c1);else _0x5b766e['isEnemy']()&&this['_graphicType']===_0x370bcb(0x356)&&(_0x370bcb(0x2a1)==='GlViw'?this['_graphicType']=_0x370bcb(0x31b):(_0x19b803['BattleSystemOTB'][_0x370bcb(0x357)][_0x370bcb(0x281)](this),this[_0x370bcb(0x264)]()));let _0x496b14;switch(this[_0x370bcb(0x29a)]){case _0x370bcb(0x1c1):this['_graphicFaceName']=_0x5b766e[_0x370bcb(0x1b7)](),this['_graphicFaceIndex']=_0x5b766e[_0x370bcb(0x128)](),_0x496b14=ImageManager[_0x370bcb(0x36f)](this['_graphicFaceName']),_0x496b14[_0x370bcb(0x18a)](this[_0x370bcb(0x351)][_0x370bcb(0x24b)](this,_0x496b14));break;case _0x370bcb(0x353):this['_graphicIconIndex']=_0x5b766e[_0x370bcb(0x2c7)](),_0x496b14=ImageManager[_0x370bcb(0x223)](_0x370bcb(0xc9)),_0x496b14[_0x370bcb(0x18a)](this[_0x370bcb(0x313)]['bind'](this,_0x496b14));break;case _0x370bcb(0x31b):if(_0x5b766e[_0x370bcb(0x17a)]())this[_0x370bcb(0x2f8)]=_0x5b766e[_0x370bcb(0x289)](),_0x496b14=ImageManager[_0x370bcb(0x322)](this[_0x370bcb(0x2f8)]),_0x496b14[_0x370bcb(0x18a)](this[_0x370bcb(0x13e)]['bind'](this,_0x496b14));else $gameSystem['isSideView']()?(this[_0x370bcb(0x1e8)]=_0x5b766e[_0x370bcb(0x265)](),_0x496b14=ImageManager['loadSvEnemy'](this[_0x370bcb(0x1e8)]),_0x496b14[_0x370bcb(0x18a)](this[_0x370bcb(0x324)][_0x370bcb(0x24b)](this,_0x496b14))):_0x370bcb(0xcc)!==_0x370bcb(0xcc)?this[_0x370bcb(0x101)](...arguments):(this[_0x370bcb(0x1e8)]=_0x5b766e[_0x370bcb(0x265)](),_0x496b14=ImageManager[_0x370bcb(0x194)](this['_graphicEnemy']),_0x496b14['addLoadListener'](this[_0x370bcb(0x324)][_0x370bcb(0x24b)](this,_0x496b14)));break;case'svactor':this[_0x370bcb(0x2f8)]=_0x5b766e[_0x370bcb(0x265)](),_0x496b14=ImageManager[_0x370bcb(0x322)](this[_0x370bcb(0x2f8)]),_0x496b14[_0x370bcb(0x18a)](this[_0x370bcb(0x13e)][_0x370bcb(0x24b)](this,_0x496b14));break;}},Sprite_OTB_TurnOrder_Battler['prototype']['changeFaceGraphicBitmap']=function(_0x2ddfda){const _0x2f4064=_0x324937,_0x385f5c=this[_0x2f4064(0x1a0)],_0x4e9c0f=this[_0x2f4064(0x284)](),_0x381af1=this['bitmapHeight'](),_0x117b46=Math[_0x2f4064(0x250)](_0x4e9c0f,_0x381af1);this[_0x2f4064(0x32a)][_0x2f4064(0x1b9)]=new Bitmap(_0x4e9c0f,_0x381af1);const _0x59a47c=this['_graphicSprite']['bitmap'],_0x55c491=ImageManager[_0x2f4064(0x13f)],_0x2ec22f=ImageManager['faceHeight'],_0x1e76b7=_0x117b46/Math[_0x2f4064(0x250)](_0x55c491,_0x2ec22f),_0x1e50bf=ImageManager[_0x2f4064(0x13f)],_0x29a4da=ImageManager[_0x2f4064(0x244)],_0x144806=_0x385f5c%0x4*_0x55c491+(_0x55c491-_0x1e50bf)/0x2,_0x2e1d02=Math[_0x2f4064(0x1f2)](_0x385f5c/0x4)*_0x2ec22f+(_0x2ec22f-_0x29a4da)/0x2,_0x3ff646=(_0x4e9c0f-_0x55c491*_0x1e76b7)/0x2,_0x157b47=(_0x381af1-_0x2ec22f*_0x1e76b7)/0x2;_0x59a47c[_0x2f4064(0x2fb)](_0x2ddfda,_0x144806,_0x2e1d02,_0x1e50bf,_0x29a4da,_0x3ff646,_0x157b47,_0x117b46,_0x117b46);},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)]['changeIconGraphicBitmap']=function(_0x23b652){const _0x21fa6a=_0x324937,_0x969493=this[_0x21fa6a(0x1f6)],_0x2fb05f=this[_0x21fa6a(0x284)](),_0xf05844=this[_0x21fa6a(0x24d)]();this[_0x21fa6a(0x32a)][_0x21fa6a(0x1b9)]=new Bitmap(_0x2fb05f,_0xf05844);const _0x466720=this['_graphicSprite'][_0x21fa6a(0x1b9)],_0x593455=ImageManager[_0x21fa6a(0xc3)],_0x3fbd8c=ImageManager[_0x21fa6a(0x331)],_0x219612=Math[_0x21fa6a(0x165)](_0x593455,_0x3fbd8c,_0x2fb05f,_0xf05844),_0xe6f627=_0x969493%0x10*_0x593455,_0x4aeab9=Math[_0x21fa6a(0x1f2)](_0x969493/0x10)*_0x3fbd8c,_0x5887a0=Math[_0x21fa6a(0x1f2)](Math['max'](_0x2fb05f-_0x219612,0x0)/0x2),_0x256987=Math[_0x21fa6a(0x1f2)](Math[_0x21fa6a(0x250)](_0xf05844-_0x219612,0x0)/0x2);_0x466720[_0x21fa6a(0x2fb)](_0x23b652,_0xe6f627,_0x4aeab9,_0x593455,_0x3fbd8c,_0x5887a0,_0x256987,_0x219612,_0x219612);},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x13e)]=function(_0x175a77){const _0x1a261e=_0x324937,_0x1ad23b=this['bitmapWidth'](),_0x21791a=this['bitmapHeight'](),_0x203daf=Math[_0x1a261e(0x165)](_0x1ad23b,_0x21791a);this[_0x1a261e(0x32a)][_0x1a261e(0x1b9)]=new Bitmap(_0x1ad23b,_0x21791a);const _0x165cc5=this[_0x1a261e(0x32a)]['bitmap'],_0x5a9fc6=this['_graphicSv']['match'](/\$/i),_0xf920be=_0x5a9fc6?0x1:ImageManager[_0x1a261e(0x317)],_0x8ef472=_0x5a9fc6?0x1:ImageManager[_0x1a261e(0x283)],_0xbc495d=_0x175a77[_0x1a261e(0x342)]/_0xf920be,_0x51c85c=_0x175a77[_0x1a261e(0x23a)]/_0x8ef472,_0x2f5ea4=Math[_0x1a261e(0x165)](0x1,_0x203daf/_0xbc495d,_0x203daf/_0x51c85c),_0x29a359=_0xbc495d*_0x2f5ea4,_0x187c52=_0x51c85c*_0x2f5ea4,_0x58c6c4=Math[_0x1a261e(0x184)]((_0x1ad23b-_0x29a359)/0x2),_0x55d0bf=Math['round']((_0x21791a-_0x187c52)/0x2);_0x165cc5[_0x1a261e(0x2fb)](_0x175a77,0x0,0x0,_0xbc495d,_0x51c85c,_0x58c6c4,_0x55d0bf,_0x29a359,_0x187c52);},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x324)]=function(_0x227209){const _0x3ff7e7=_0x324937,_0xd6af47=Window_OTB_TurnOrder[_0x3ff7e7(0x16e)],_0xd46248=this[_0x3ff7e7(0x284)](),_0x18213c=this[_0x3ff7e7(0x24d)](),_0x22b7fa=Math[_0x3ff7e7(0x165)](_0xd46248,_0x18213c);this['_graphicSprite']['bitmap']=new Bitmap(_0xd46248,_0x18213c);const _0x29b60b=this['_graphicSprite'][_0x3ff7e7(0x1b9)],_0x3df14c=Math[_0x3ff7e7(0x165)](0x1,_0x22b7fa/_0x227209['width'],_0x22b7fa/_0x227209[_0x3ff7e7(0x23a)]),_0x4d2597=_0x227209[_0x3ff7e7(0x342)]*_0x3df14c,_0x3f29b6=_0x227209['height']*_0x3df14c,_0x3554c6=Math['round']((_0xd46248-_0x4d2597)/0x2),_0x4f2294=Math[_0x3ff7e7(0x184)]((_0x18213c-_0x3f29b6)/0x2);_0x29b60b['blt'](_0x227209,0x0,0x0,_0x227209['width'],_0x227209[_0x3ff7e7(0x23a)],_0x3554c6,_0x4f2294,_0x4d2597,_0x3f29b6);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x324937(0x2ce)]=function(){const _0x3794de=_0x324937,_0x175e8f=this[_0x3794de(0x2e3)]();if(!_0x175e8f)return;if(!_0x175e8f['isEnemy']())return;if(this[_0x3794de(0x106)]===_0x175e8f[_0x3794de(0x2ee)]())return;this['_graphicHue']=_0x175e8f[_0x3794de(0x2ee)]();if(_0x175e8f[_0x3794de(0x17a)]())this[_0x3794de(0x106)]=0x0;this[_0x3794de(0x32a)][_0x3794de(0x327)](this[_0x3794de(0x106)]);},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)]['updateLetter']=function(){const _0x193ec0=_0x324937;if(!this[_0x193ec0(0x320)])return;const _0x381386=this[_0x193ec0(0x2e3)]();if(!_0x381386)return;if(this[_0x193ec0(0x367)]===_0x381386[_0x193ec0(0x367)]&&this['_plural']===_0x381386[_0x193ec0(0x30c)])return;this[_0x193ec0(0x367)]=_0x381386['_letter'],this[_0x193ec0(0x30c)]=_0x381386['_plural'];const _0x175db3=Window_OTB_TurnOrder[_0x193ec0(0x16e)],_0x4ab654=this['bitmapWidth'](),_0x485dc1=this[_0x193ec0(0x24d)](),_0x456812=this[_0x193ec0(0x320)][_0x193ec0(0x1b9)];_0x456812['clear']();if(!this[_0x193ec0(0x30c)])return;_0x456812[_0x193ec0(0x190)]=_0x175db3[_0x193ec0(0x33c)]||$gameSystem[_0x193ec0(0x1b2)](),_0x456812[_0x193ec0(0xf8)]=_0x175db3[_0x193ec0(0x1c6)]||0x10,_0x175db3[_0x193ec0(0x29e)]?_0x456812['drawText'](this[_0x193ec0(0x367)]['trim'](),_0x4ab654*0x1/0x8,_0x485dc1/0x2,_0x4ab654,_0x485dc1/0x2,_0x193ec0(0x175)):_0x456812[_0x193ec0(0x2a8)](this[_0x193ec0(0x367)][_0x193ec0(0x2b5)](),0x0,_0x485dc1/0x2,_0x4ab654*0x7/0x8,_0x485dc1/0x2,_0x193ec0(0x15f));},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x343)]=function(){const _0x5ed45e=_0x324937,_0x20aef1=this['battler']();if(!_0x20aef1)return;const _0x1006c3=_0x20aef1[_0x5ed45e(0x2e3)]();if(!_0x1006c3)return;const _0xa4d991=_0x1006c3[_0x5ed45e(0x253)]();if(!_0xa4d991)return;this[_0x5ed45e(0x133)](_0xa4d991[_0x5ed45e(0x2fa)]);},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)]['getStateTooltipBattler']=function(){return null;},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x337)]=function(_0x4f5c15){const _0x58c8d0=_0x324937;this[_0x58c8d0(0x208)]=_0x4f5c15,this[_0x58c8d0(0x188)]();if(this[_0x58c8d0(0x208)]===null){if(_0x58c8d0(0x16f)===_0x58c8d0(0x16f))this['_instance']=-0x1;else{const _0x5d0fdc=this['_actorCommandWindow'];this[_0x58c8d0(0x12e)]()&&delete _0x5d0fdc[_0x58c8d0(0x311)]['cancel'];}}},Sprite_OTB_TurnOrder_Battler['prototype'][_0x324937(0x188)]=function(){const _0x2162e7=_0x324937,_0x55f546=this[_0x2162e7(0x16a)]();if(!_0x55f546)return;const _0x187ecc=Window_OTB_TurnOrder[_0x2162e7(0x16e)],_0x4bd063=_0x187ecc[_0x2162e7(0x29e)],_0x578a58=this[_0x2162e7(0x208)]===_0x55f546[_0x2162e7(0x2af)]?!![]:![],_0x24e281=this['_instance']===-0x1&&BattleManager[_0x2162e7(0x34f)]===this['battler'](),_0x2a328d=_0x55f546['_spriteGroupWidth']-_0x187ecc[_0x2162e7(0x123)];let _0x3adbb5=Math['ceil'](_0x2a328d/(this[_0x2162e7(0x208)][_0x2162e7(0x2e9)]-0x1||0x1));_0x3adbb5=Math['min'](_0x187ecc['SpriteThin'],_0x3adbb5);let _0x334075=0x0,_0x279b4f=0x0,_0x2ac5e3=_0x24e281?-0x1:this[_0x2162e7(0x208)][_0x2162e7(0x134)](this);!_0x24e281&&(_0x2ac5e3=this[_0x2162e7(0x11d)]());if(_0x24e281)_0x334075=_0x55f546[_0x2162e7(0x120)];else{if(_0x4bd063){if(_0x2162e7(0x254)!==_0x2162e7(0x254)){if(!_0x3f2858['isOTB']())return;this[_0x2162e7(0x2ae)]=0x0;}else _0x334075=(_0x578a58?_0x55f546['_nextX']:_0x55f546[_0x2162e7(0x232)])+_0x2a328d,_0x334075-=_0x2ac5e3*_0x3adbb5;}else'doQQF'!==_0x2162e7(0x2eb)?(_0x334075=_0x578a58?_0x55f546['_nextX']:_0x55f546[_0x2162e7(0x232)],_0x334075+=_0x2ac5e3*_0x3adbb5):_0x126f19['BattleSystemOTB']['Window_Help_setItem'][_0x2162e7(0x281)](this,_0x4746d3);}_0x334075+=this['additionalTargetXAdjustments'](_0x2ac5e3,_0x187ecc[_0x2162e7(0x123)]-_0x3adbb5),!_0x24e281&&_0x2ac5e3<0x0&&(_0x334075=this['x'],_0x279b4f=this['y'],this[_0x2162e7(0x1e1)](0x0)),this[_0x2162e7(0x370)](_0x334075,_0x279b4f);},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x358)]=function(_0x1ffb11,_0x5d462a){return 0x0;},Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)][_0x324937(0x11d)]=function(){const _0x3f8aec=_0x324937,_0xa65499=this[_0x3f8aec(0x16a)]();if(!_0xa65499)return 0x0;const _0x57d134=this['_sourceArray']===_0xa65499[_0x3f8aec(0x2af)]?!![]:![],_0x522c91=_0x57d134?BattleManager[_0x3f8aec(0x159)]:BattleManager[_0x3f8aec(0x13b)],_0x1091ea=this[_0x3f8aec(0x2e3)](),_0xcd00bf=VisuMZ[_0x3f8aec(0x2c8)][_0x3f8aec(0x362)](_0x1091ea,_0x522c91);return _0xcd00bf[this[_0x3f8aec(0x2ff)]]??_0xcd00bf[_0xcd00bf[_0x3f8aec(0x2e9)]-0x1]??-0x1;};function Sprite_OTB_TurnOrder_Preview(){this['initialize'](...arguments);}Sprite_OTB_TurnOrder_Preview[_0x324937(0x256)]=Object[_0x324937(0x363)](Sprite_OTB_TurnOrder_Battler[_0x324937(0x256)]),Sprite_OTB_TurnOrder_Preview['prototype'][_0x324937(0x14a)]=Sprite_OTB_TurnOrder_Preview,Sprite_OTB_TurnOrder_Preview[_0x324937(0x256)][_0x324937(0x101)]=function(_0x4fac59,_0x4df056,_0x5a9cde,_0x5442a5){const _0x2e54d7=_0x324937;this['_offset']=_0x5442a5,Sprite_OTB_TurnOrder_Battler['prototype']['initialize'][_0x2e54d7(0x281)](this,_0x4fac59,_0x4df056,_0x5a9cde),this['adjustForPreview']();},Sprite_OTB_TurnOrder_Preview[_0x324937(0x256)][_0x324937(0xe3)]=function(){const _0x3e0012=_0x324937,_0x1e2de4=Window_OTB_TurnOrder[_0x3e0012(0x16e)];this['scale']['x']=this['scale']['y']=_0x1e2de4[_0x3e0012(0x191)];},Sprite_OTB_TurnOrder_Preview[_0x324937(0x256)][_0x324937(0x277)]=function(){const _0x28a932=_0x324937;return this[_0x28a932(0xf2)]===$gameParty?_0x28a932(0x1ee):'PreviewEnemy';},Sprite_OTB_TurnOrder_Preview['prototype']['getBorderThickness']=function(){const _0x59a925=_0x324937,_0x1ba87a=Window_OTB_TurnOrder['Settings'];return Math[_0x59a925(0x2c2)](_0x1ba87a[_0x59a925(0x346)]/(_0x1ba87a[_0x59a925(0x191)]||0.01));},Sprite_OTB_TurnOrder_Preview[_0x324937(0x256)][_0x324937(0x370)]=function(_0x4ffe7a,_0x4adfb0){const _0x57c862=_0x324937;Sprite_OTB_TurnOrder_Battler[_0x57c862(0x256)][_0x57c862(0x370)][_0x57c862(0x281)](this,_0x4ffe7a,_0x4adfb0),this['x']=this[_0x57c862(0x26a)],this['y']=this[_0x57c862(0x182)];},Sprite_OTB_TurnOrder_Preview['prototype'][_0x324937(0x1e1)]=function(_0x4a9146){const _0x5b7764=_0x324937;Sprite_OTB_TurnOrder_Battler['prototype'][_0x5b7764(0x1e1)][_0x5b7764(0x281)](this,_0x4a9146);if(_0x4a9146>0x0){if('CSUyZ'!==_0x5b7764(0x105))this['_fadeDuration']=0x1;else return this[_0x5b7764(0x180)]();}else{if(_0x5b7764(0x154)===_0x5b7764(0x154))this['_fadeDuration']/=0x2,this['_fadeDuration']=Math[_0x5b7764(0x1f2)](this['_fadeDuration']);else{if(!this['isOTB']())return;const _0x159f0e=_0x5ab9ba[_0x5b7764(0x217)][_0x5b7764(0xf6)];while(_0x4fcd5a--){_0x284b12[_0x5b7764(0x1cf)](_0x3808d7),_0x159f0e&&_0x159f0e[_0x5b7764(0x240)](_0x3f5273,_0x5ca646);}}}},Sprite_OTB_TurnOrder_Preview[_0x324937(0x256)][_0x324937(0x358)]=function(_0x5924ea,_0x421cb9){const _0x3fb9d5=_0x324937,_0x33653e=Window_OTB_TurnOrder[_0x3fb9d5(0x16e)];if(_0x5924ea>0x0){if(this['_offset']>0x0){if(_0x3fb9d5(0x203)!=='fnGRP'){const _0x58f4d4=_0x2902d2[_0x3fb9d5(0x16e)];return _0x526045['ceil'](_0x58f4d4['BorderThickness']/(_0x58f4d4['PreviewScale']||0.01));}else{if(_0x33653e[_0x3fb9d5(0x29e)]){if('qZxhi'===_0x3fb9d5(0x302))_0x1d3319[_0x3fb9d5(0x256)][_0x3fb9d5(0xf9)][_0x3fb9d5(0x281)](this),this[_0x3fb9d5(0x1ac)](),this['updatePosition'](),this['updateVisibility'](),this[_0x3fb9d5(0xde)]();else return-_0x33653e[_0x3fb9d5(0x123)];}else{if('xEnXU'!==_0x3fb9d5(0x330))return _0x33653e['SpriteThin'];else{const _0x1f5dc5=this[_0x3fb9d5(0x284)](),_0x1a083b=this['bitmapHeight']();_0x1da34c[_0x3fb9d5(0x1b9)]=new _0x394170(_0x1f5dc5,_0x1a083b);const _0x5531bf=_0xb68e3a[_0x3fb9d5(0x20f)](_0x5317fc[_0x3fb9d5(0x2b4)[_0x3fb9d5(0x2dc)](_0x555c3e)]),_0x47cc69=_0x19988c['getColor'](_0x2b4a67[_0x3fb9d5(0x1ab)['format'](_0x577f07)]);_0x355faf[_0x3fb9d5(0x1b9)][_0x3fb9d5(0x298)](0x0,0x0,_0x1f5dc5,_0x1a083b,_0x5531bf,_0x47cc69,!![]);}}}}else{if(this[_0x3fb9d5(0x341)]<0x0)return _0x33653e[_0x3fb9d5(0x29e)]?-_0x421cb9:_0x421cb9;}}return 0x0;},Sprite_OTB_TurnOrder_Preview[_0x324937(0x256)][_0x324937(0x11d)]=function(){const _0x1e5dcc=_0x324937,_0x330412=this[_0x1e5dcc(0x16a)](),_0x3d61d3=this[_0x1e5dcc(0x208)]===_0x330412[_0x1e5dcc(0x2af)]?!![]:![],_0x1bd882=_0x3d61d3?BattleManager['_otb_actionBattlersNext']:BattleManager['_actionBattlers'];let _0x3ec72b=0x0,_0x2c92dd=_0x1bd882[_0x1e5dcc(0x2e9)]-0x1;_0x3d61d3&&(_0x3ec72b=Math[_0x1e5dcc(0x250)](0x0,VisuMZ[_0x1e5dcc(0x2c8)][_0x1e5dcc(0x160)](_0x1bd882)));let _0x35a281=Sprite_OTB_TurnOrder_Battler[_0x1e5dcc(0x256)][_0x1e5dcc(0x11d)]['call'](this);return _0x35a281+=this[_0x1e5dcc(0x341)],_0x35a281[_0x1e5dcc(0x326)](_0x3ec72b,_0x2c92dd);},Sprite_OTB_TurnOrder_Preview[_0x324937(0x256)][_0x324937(0x343)]=function(){},Window_Selectable[_0x324937(0x256)][_0x324937(0x23c)]=function(){return![];},VisuMZ[_0x324937(0x2c8)][_0x324937(0x31d)]=Window_Selectable[_0x324937(0x256)][_0x324937(0x28b)],Window_Selectable[_0x324937(0x256)][_0x324937(0x28b)]=function(_0x5b20fd){const _0x597cd2=_0x324937;VisuMZ[_0x597cd2(0x2c8)][_0x597cd2(0x31d)][_0x597cd2(0x281)](this,_0x5b20fd),this[_0x597cd2(0x23c)]()&&this[_0x597cd2(0xff)]&&this['applyBattleItemWindowOTB']();},Window_Selectable[_0x324937(0x256)][_0x324937(0x17f)]=function(){const _0x31e096=_0x324937;BattleManager[_0x31e096(0x305)]();},VisuMZ[_0x324937(0x2c8)][_0x324937(0x168)]=Window_Help[_0x324937(0x256)][_0x324937(0x32c)],Window_Help['prototype'][_0x324937(0x32c)]=function(_0x38c52b){const _0x4dcb9b=_0x324937;BattleManager['isOTB']()&&_0x38c52b&&_0x38c52b[_0x4dcb9b(0x169)]&&_0x38c52b[_0x4dcb9b(0x169)][_0x4dcb9b(0x2a3)](/<(?:OTB) HELP>\s*([\s\S]*)\s*<\/(?:OTB) HELP>/i)?_0x4dcb9b(0x1dc)!==_0x4dcb9b(0x1dc)?this[_0x4dcb9b(0x131)](_0x5ab4e9,![],_0x3b7931):this[_0x4dcb9b(0x2d3)](String(RegExp['$1'])):VisuMZ['BattleSystemOTB'][_0x4dcb9b(0x168)][_0x4dcb9b(0x281)](this,_0x38c52b);},Window_ActorCommand[_0x324937(0x256)][_0x324937(0x23c)]=function(){return BattleManager['isOTB']();},Window_ActorCommand[_0x324937(0x256)][_0x324937(0x17f)]=function(){const _0x21a6ea=_0x324937,_0x184bd7=BattleManager['inputtingAction']();if(_0x184bd7){if('FvwTv'===_0x21a6ea(0x207))return![];else{const _0x3fb4f7=this[_0x21a6ea(0x360)]();switch(_0x3fb4f7){case _0x21a6ea(0x349):_0x184bd7[_0x21a6ea(0x269)]();break;case'guard':_0x184bd7[_0x21a6ea(0x163)]();break;case _0x21a6ea(0x15c):_0x184bd7['setSkill'](this['currentExt']());break;default:_0x184bd7[_0x21a6ea(0x110)](null);break;}}}Window_Command[_0x21a6ea(0x256)][_0x21a6ea(0x17f)]['call'](this);},Window_BattleSkill['prototype'][_0x324937(0x23c)]=function(){const _0x16a75a=_0x324937;return BattleManager[_0x16a75a(0x22d)]();},Window_BattleSkill[_0x324937(0x256)][_0x324937(0x17f)]=function(){const _0x1dd1b8=_0x324937,_0x2bbdbb=this[_0x1dd1b8(0x14d)](),_0x965c61=BattleManager[_0x1dd1b8(0x2d2)]();if(_0x965c61)_0x965c61['setSkill'](_0x2bbdbb?_0x2bbdbb['id']:null);Window_SkillList[_0x1dd1b8(0x256)][_0x1dd1b8(0x17f)][_0x1dd1b8(0x281)](this);},Window_BattleItem[_0x324937(0x256)][_0x324937(0x23c)]=function(){return BattleManager['isOTB']();},Window_BattleItem['prototype'][_0x324937(0x17f)]=function(){const _0x3af419=_0x324937,_0x589ae9=this[_0x3af419(0x14d)](),_0x2ff509=BattleManager[_0x3af419(0x2d2)]();if(_0x2ff509)_0x2ff509['setItem'](_0x589ae9?_0x589ae9['id']:null);Window_ItemList[_0x3af419(0x256)][_0x3af419(0x17f)]['call'](this);},Window_BattleActor[_0x324937(0x256)][_0x324937(0x23c)]=function(){const _0x1ec0c0=_0x324937;return BattleManager[_0x1ec0c0(0x22d)]();},Window_BattleEnemy[_0x324937(0x256)][_0x324937(0x23c)]=function(){const _0x486c85=_0x324937;return BattleManager[_0x486c85(0x22d)]();};function Window_OTB_TurnOrder(){const _0x10d64d=_0x324937;this[_0x10d64d(0x101)](...arguments);}Window_OTB_TurnOrder[_0x324937(0x256)]=Object[_0x324937(0x363)](Window_Base['prototype']),Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x14a)]=Window_OTB_TurnOrder,Window_OTB_TurnOrder[_0x324937(0x16e)]=VisuMZ[_0x324937(0x2c8)][_0x324937(0x16e)][_0x324937(0x225)],Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x101)]=function(){const _0x3c142f=_0x324937,_0x5536fc=this[_0x3c142f(0x291)]();this[_0x3c142f(0x10a)](_0x5536fc),Window_Base[_0x3c142f(0x256)][_0x3c142f(0x101)][_0x3c142f(0x281)](this,_0x5536fc),this[_0x3c142f(0x220)]=0x0,this[_0x3c142f(0x2d6)](),this[_0x3c142f(0x24e)](),this[_0x3c142f(0x17e)](),this[_0x3c142f(0xc1)]();},Window_OTB_TurnOrder[_0x324937(0x256)]['windowRect']=function(){const _0x5aebbd=_0x324937,_0x31f9d4=Window_OTB_TurnOrder[_0x5aebbd(0x16e)],_0xc512a9=SceneManager['_scene'][_0x5aebbd(0x300)][_0x5aebbd(0x23a)];let _0x1440cb=Graphics['width']-_0x31f9d4[_0x5aebbd(0x2e8)]*0x2,_0x174da4=_0x31f9d4[_0x5aebbd(0x247)]+this[_0x5aebbd(0x260)](),_0x113025=_0x31f9d4[_0x5aebbd(0x2e8)],_0x59c7c6=0x0;switch(_0x31f9d4[_0x5aebbd(0x107)]){case _0x5aebbd(0x14e):_0x59c7c6=Graphics['height']-_0xc512a9-_0x31f9d4['ScreenBuffer']-_0x174da4;break;default:_0x59c7c6=_0x31f9d4[_0x5aebbd(0x2e8)];break;}if(Imported[_0x5aebbd(0x109)]&&BattleManager[_0x5aebbd(0x296)]()){const _0x2dd86e=VisuMZ[_0x5aebbd(0x177)][_0x5aebbd(0x16e)]['StatusWindow'];_0x1440cb-=_0x2dd86e[_0x5aebbd(0x2f0)]+_0x2dd86e['MoveDistance'],_0x1440cb-=_0x31f9d4[_0x5aebbd(0x2e8)];}return _0x113025+=_0x31f9d4[_0x5aebbd(0x299)]||0x0,_0x59c7c6+=_0x31f9d4[_0x5aebbd(0x29c)]||0x0,new Rectangle(_0x113025,_0x59c7c6,_0x1440cb,_0x174da4);},Window_OTB_TurnOrder['prototype'][_0x324937(0x10a)]=function(_0x2e1ffb){const _0x4e6b0a=_0x324937;this[_0x4e6b0a(0x2b0)]=this[_0x4e6b0a(0x2e6)]=_0x2e1ffb['x'],this[_0x4e6b0a(0x157)]=this[_0x4e6b0a(0x2d8)]=_0x2e1ffb['y'],this[_0x4e6b0a(0x266)]=0x0;const _0x440023=Window_OTB_TurnOrder[_0x4e6b0a(0x16e)];this[_0x4e6b0a(0x1ba)]=Math['ceil']((_0x2e1ffb['width']-_0x440023[_0x4e6b0a(0x123)]-_0x440023[_0x4e6b0a(0x32f)]*0x2)/0x2),_0x440023[_0x4e6b0a(0x29e)]?(this[_0x4e6b0a(0x120)]=_0x2e1ffb[_0x4e6b0a(0x342)]-_0x440023[_0x4e6b0a(0x123)],this[_0x4e6b0a(0x232)]=this['_spriteGroupWidth']+_0x440023[_0x4e6b0a(0x32f)],this['_nextX']=0x0):(this['_subjectX']=0x0,this[_0x4e6b0a(0x232)]=_0x440023[_0x4e6b0a(0x123)]+_0x440023[_0x4e6b0a(0x32f)],this[_0x4e6b0a(0xec)]=this[_0x4e6b0a(0x232)]+_0x440023[_0x4e6b0a(0x32f)]+this['_spriteGroupWidth']);},Window_OTB_TurnOrder['prototype'][_0x324937(0x145)]=function(){const _0x5e0422=_0x324937;this[_0x5e0422(0xee)]=0x0;},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x2d6)]=function(){const _0x4e9c4c=_0x324937,_0x1e0eed=Window_OTB_TurnOrder[_0x4e9c4c(0x16e)];if(_0x1e0eed[_0x4e9c4c(0x315)]==='transparent')return;if(_0x1e0eed[_0x4e9c4c(0x315)]===_0x4e9c4c(0x282)&&_0x1e0eed[_0x4e9c4c(0x1e5)]!==''){if('ZUNpt'==='ZUNpt'){const _0xbe43a0=ImageManager[_0x4e9c4c(0x223)](_0x1e0eed['BgImageFilename']);_0xbe43a0['addLoadListener'](this[_0x4e9c4c(0xea)]['bind'](this,_0xbe43a0));return;}else this[_0x4e9c4c(0x22d)]()?_0x32835e[_0x4e9c4c(0x2c8)][_0x4e9c4c(0x192)][_0x4e9c4c(0x281)](this):_0x2ba0fa[_0x4e9c4c(0x2c8)][_0x4e9c4c(0x2ec)][_0x4e9c4c(0x281)](this);};const _0x1760b1=this[_0x4e9c4c(0x12c)],_0x4f3ec5=ColorManager[_0x4e9c4c(0x364)](),_0x8e08ab=ColorManager[_0x4e9c4c(0x1a9)](),_0x3cc9bc=this[_0x4e9c4c(0x120)],_0x2cab1d=_0x1e0eed['SpriteThin'],_0x238d27=0x0,_0x522901=_0x1e0eed[_0x4e9c4c(0x247)],_0x497e0c=this[_0x4e9c4c(0x232)],_0x5902ad=this['_nextX'],_0x1601d8=this['_spriteGroupWidth'];switch(_0x1e0eed['BgDimStyle']){case _0x4e9c4c(0x36e):_0x1e0eed[_0x4e9c4c(0x29e)]?(_0x1760b1[_0x4e9c4c(0x298)](_0x3cc9bc,_0x238d27,_0x2cab1d/0x2,_0x522901,_0x8e08ab,_0x4f3ec5,![]),_0x1760b1[_0x4e9c4c(0x162)](_0x3cc9bc+_0x2cab1d/0x2,_0x238d27,_0x2cab1d/0x2,_0x522901,_0x4f3ec5),_0x1760b1[_0x4e9c4c(0x298)](_0x497e0c,_0x238d27,_0x1601d8/0x2,_0x522901,_0x8e08ab,_0x4f3ec5,![]),_0x1760b1[_0x4e9c4c(0x162)](_0x497e0c+_0x1601d8/0x2,_0x238d27,_0x1601d8/0x2,_0x522901,_0x4f3ec5),_0x1760b1['gradientFillRect'](_0x5902ad,_0x238d27,_0x1601d8/0x2,_0x522901,_0x8e08ab,_0x4f3ec5,![]),_0x1760b1[_0x4e9c4c(0x162)](_0x5902ad+_0x1601d8/0x2,_0x238d27,_0x1601d8/0x2,_0x522901,_0x4f3ec5)):(_0x1760b1['fillRect'](_0x3cc9bc,_0x238d27,_0x2cab1d/0x2,_0x522901,_0x4f3ec5),_0x1760b1[_0x4e9c4c(0x298)](_0x3cc9bc+_0x2cab1d/0x2,_0x238d27,_0x2cab1d/0x2,_0x522901,_0x4f3ec5,_0x8e08ab,![]),_0x1760b1['fillRect'](_0x497e0c,_0x238d27,_0x1601d8/0x2,_0x522901,_0x4f3ec5),_0x1760b1[_0x4e9c4c(0x298)](_0x497e0c+_0x1601d8/0x2,_0x238d27,_0x1601d8/0x2,_0x522901,_0x4f3ec5,_0x8e08ab,![]),_0x1760b1[_0x4e9c4c(0x162)](_0x5902ad,_0x238d27,_0x1601d8/0x2,_0x522901,_0x4f3ec5),_0x1760b1[_0x4e9c4c(0x298)](_0x5902ad+_0x1601d8/0x2,_0x238d27,_0x1601d8/0x2,_0x522901,_0x4f3ec5,_0x8e08ab,![]));break;default:_0x1760b1[_0x4e9c4c(0x162)](_0x3cc9bc,_0x238d27,_0x2cab1d,_0x522901,_0x4f3ec5),_0x1760b1[_0x4e9c4c(0x162)](_0x497e0c,_0x238d27,_0x1601d8,_0x522901,_0x4f3ec5),_0x1760b1[_0x4e9c4c(0x162)](_0x5902ad,_0x238d27,_0x1601d8,_0x522901,_0x4f3ec5);break;}},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0xea)]=function(_0x176347){const _0x5528e5=_0x324937;this[_0x5528e5(0x19e)]=new Sprite(),this[_0x5528e5(0x19e)]['bitmap']=_0x176347,this[_0x5528e5(0x21c)](this['_bgImageSprite']);const _0x5b45d1=Window_OTB_TurnOrder[_0x5528e5(0x16e)];this[_0x5528e5(0x19e)]['x']=_0x5b45d1[_0x5528e5(0x227)],this[_0x5528e5(0x19e)]['y']=_0x5b45d1[_0x5528e5(0x228)];},Window_OTB_TurnOrder[_0x324937(0x256)]['drawUiText']=function(){const _0x215a2b=_0x324937;this['contents'][_0x215a2b(0xfc)](),this[_0x215a2b(0x1cc)]();const _0x281046=Window_OTB_TurnOrder['Settings'];this[_0x215a2b(0x2ed)][_0x215a2b(0xf8)]=_0x281046[_0x215a2b(0x32e)];let _0x2922b2=_0x281046['UiAlignment'];_0x2922b2===_0x215a2b(0x20e)&&(_0x2922b2=_0x281046[_0x215a2b(0x29e)]?_0x215a2b(0x15f):_0x215a2b(0x175));let _0x53d829=_0x281046[_0x215a2b(0x247)];if(_0x281046[_0x215a2b(0x25f)]!==''){const _0xc2662a=this[_0x215a2b(0x120)]+_0x281046['UiSubjectOffsetX'],_0x399359=_0x53d829+_0x281046[_0x215a2b(0x303)],_0x2092cd=_0x281046['SpriteThin'];this[_0x215a2b(0x2a8)](_0x281046[_0x215a2b(0x25f)],_0xc2662a,_0x399359,_0x2092cd,_0x215a2b(0x2b6));}if(_0x281046[_0x215a2b(0x2a7)]!==''){if(_0x215a2b(0x2c5)!==_0x215a2b(0x27b)){const _0x38bea4=this[_0x215a2b(0x232)]+_0x281046[_0x215a2b(0x1a5)],_0x254fb2=_0x53d829+_0x281046[_0x215a2b(0x248)],_0x188530=this[_0x215a2b(0x1ba)];this[_0x215a2b(0x2a8)](_0x281046[_0x215a2b(0x2a7)],_0x38bea4,_0x254fb2,_0x188530,_0x2922b2);}else this[_0x215a2b(0x332)]();}if(_0x281046[_0x215a2b(0x235)]!==''){if('DOtoP'===_0x215a2b(0x1da))this['createOrderPreviewSprite'](_0x5d2b5a,![],_0x1045cf);else{const _0x573b87=this['_nextX']+_0x281046[_0x215a2b(0x2dd)],_0x4dd4a9=_0x53d829+_0x281046[_0x215a2b(0x178)],_0x40b504=this[_0x215a2b(0x1ba)];this[_0x215a2b(0x2a8)](_0x281046[_0x215a2b(0x235)],_0x573b87,_0x4dd4a9,_0x40b504,_0x2922b2);}}},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x17e)]=function(){const _0x3ec840=_0x324937,_0x292228=Window_OTB_TurnOrder[_0x3ec840(0x16e)];this[_0x3ec840(0x1bb)]=new Sprite(),this[_0x3ec840(0x224)](this['_spriteContainer']),this['_subject']=null,this[_0x3ec840(0x198)]=[],this['_nextTurn']=[],this['_previewContainer']=new Sprite(),this[_0x3ec840(0x348)]['x']=_0x292228['PreviewOffsetX'],this[_0x3ec840(0x348)]['y']=_0x292228[_0x3ec840(0x138)],this['_previewContainer']['x']-=Math[_0x3ec840(0x2c2)](_0x292228[_0x3ec840(0x123)]*0.5*_0x292228[_0x3ec840(0x191)]),_0x292228[_0x3ec840(0x29e)]&&(_0x3ec840(0xd9)!==_0x3ec840(0xd9)?_0x31e2ca[_0x3ec840(0x1b5)](_0x1cb58c)&&(_0x10c268+=_0x538d39(_0x642fb4['$1'])):this[_0x3ec840(0x348)]['x']+=_0x292228[_0x3ec840(0x123)]),this['_previewContainer']['y']-=Math[_0x3ec840(0x2c2)](_0x292228[_0x3ec840(0x247)]*0.5*_0x292228['PreviewScale']),this[_0x3ec840(0x224)](this[_0x3ec840(0x348)]),this[_0x3ec840(0xda)]=[],this['_previewNext']=[];},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0xf9)]=function(){const _0x2bbf97=_0x324937;Window_Base[_0x2bbf97(0x256)][_0x2bbf97(0xf9)]['call'](this),this[_0x2bbf97(0x1ac)](),this[_0x2bbf97(0x271)](),this['updateVisibility'](),this['sortContainer']();},Window_OTB_TurnOrder[_0x324937(0x256)]['requestUpdateTurnOrders']=function(){const _0x5f4748=_0x324937;this[_0x5f4748(0x116)]=!![];},Window_OTB_TurnOrder['prototype']['updateTurnOrders']=function(){const _0x4af3ec=_0x324937;if(!this[_0x4af3ec(0x116)])return;this['_requestTurnOrderUpdate']=![];for(const _0x5ae71c of this[_0x4af3ec(0x198)]){if(!_0x5ae71c)continue;_0x5ae71c[_0x4af3ec(0x188)]();}for(const _0x5a9df8 of this['_nextTurn']){if('lDqQV'!==_0x4af3ec(0x19b)){this[_0x4af3ec(0x13b)]=this[_0x4af3ec(0x159)],this[_0x4af3ec(0x26b)]();const _0xa34435=[];_0xa34435['push'](..._0x2cacd7['battleMembers']()),_0xa34435[_0x4af3ec(0x15e)](..._0x4fba6e['members']());for(const _0x14f408 of _0xa34435){_0x14f408[_0x4af3ec(0x15a)]();}_0xa34435['sort']((_0xe6b0f8,_0x570319)=>_0x570319[_0x4af3ec(0x34e)]()-_0xe6b0f8['speed']()),this[_0x4af3ec(0x159)]=_0xa34435,this['otbApplyActionTimes'](),this['removeActionBattlersOTB'](),this[_0x4af3ec(0x115)]();}else{if(!_0x5a9df8)continue;_0x5a9df8['calculateTargetPositions']();}}},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x271)]=function(){const _0x30fd9a=_0x324937,_0x1244e7=Window_OTB_TurnOrder[_0x30fd9a(0x16e)];if(_0x1244e7[_0x30fd9a(0x107)]!==_0x30fd9a(0x325))return;if(!_0x1244e7[_0x30fd9a(0x1bd)])return;const _0x35e86d=SceneManager[_0x30fd9a(0x217)][_0x30fd9a(0x15d)];if(!_0x35e86d)return;if(_0x35e86d[_0x30fd9a(0x1ca)]){if(_0x30fd9a(0x144)!==_0x30fd9a(0x144))return _0x494025[_0x30fd9a(0x22d)]();else this['x']=this[_0x30fd9a(0x2e6)]+(_0x1244e7['RepositionTopHelpX']||0x0),this['y']=this[_0x30fd9a(0x2d8)]+(_0x1244e7[_0x30fd9a(0x2d1)]||0x0);}else this['x']=this[_0x30fd9a(0x2e6)],this['y']=this[_0x30fd9a(0x2d8)];const _0x41cecf=SceneManager['_scene']['_windowLayer'];Window_OTB_TurnOrder[_0x30fd9a(0x30d)]===undefined&&(Window_OTB_TurnOrder[_0x30fd9a(0x30d)]=Math[_0x30fd9a(0x184)]((Graphics[_0x30fd9a(0x342)]-Math[_0x30fd9a(0x165)](Graphics['boxWidth'],_0x41cecf[_0x30fd9a(0x342)]))/0x2));Window_OTB_TurnOrder[_0x30fd9a(0x158)]===undefined&&(_0x30fd9a(0x216)!==_0x30fd9a(0x1a1)?Window_OTB_TurnOrder['_ogWindowLayerY']=Math[_0x30fd9a(0x184)]((Graphics[_0x30fd9a(0x23a)]-Math[_0x30fd9a(0x165)](Graphics[_0x30fd9a(0x1fc)],_0x41cecf[_0x30fd9a(0x23a)]))/0x2):this['_fadeDuration']=0x1);;this['x']+=_0x41cecf['x']-Window_OTB_TurnOrder['_ogWindowLayerX'],this['y']+=_0x41cecf['y']-Window_OTB_TurnOrder['_ogWindowLayerY'];},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0xc1)]=function(){const _0x2361d6=_0x324937;this['visible']=$gameSystem[_0x2361d6(0x11e)]();if(BattleManager[_0x2361d6(0x246)]==='battleEnd'){if(_0x2361d6(0xe1)!==_0x2361d6(0x2a4)){if(!this[_0x2361d6(0xd0)]){if(_0x2361d6(0x1ed)!==_0x2361d6(0x36c)){const _0x427ea9=Window_OTB_TurnOrder[_0x2361d6(0x16e)];this[_0x2361d6(0xd0)]=Math['ceil'](0xff/(_0x427ea9[_0x2361d6(0x1a3)]||0x1));}else{this['x']=this[_0x2361d6(0x26a)],this['y']=this[_0x2361d6(0x182)];if(this[_0x2361d6(0x220)]<0xff&&!this['_isBattleOver']&&this[_0x2361d6(0x33a)]<=0x0){const _0x396c31=this[_0x2361d6(0x2e3)]();_0x396c31&&(this[_0x2361d6(0xc2)]=_0x396c31[_0x2361d6(0x373)]()&&_0x396c31[_0x2361d6(0x127)]()?0xff:0x0);}}}this['opacity']-=this[_0x2361d6(0xd0)],this['contentsOpacity']-=this['_fadeSpeed'],this[_0x2361d6(0x1b1)][_0x2361d6(0x220)]-=this[_0x2361d6(0xd0)];}else return!![];}},Window_OTB_TurnOrder['prototype'][_0x324937(0xde)]=function(){const _0x1cd88c=_0x324937;if(!this['_spriteContainer'])return;const _0x4447d5=Window_OTB_TurnOrder['Settings'],_0x6daff3=_0x4447d5[_0x1cd88c(0x29e)];if(_0x6daff3)_0x1cd88c(0x202)!==_0x1cd88c(0x202)?_0x5a4217[_0x1cd88c(0x2c8)][_0x1cd88c(0x2ec)]['call'](this):this[_0x1cd88c(0x1bb)][_0x1cd88c(0x287)][_0x1cd88c(0x229)]((_0x2a3621,_0x1f1157)=>_0x2a3621['x']-_0x1f1157['x']);else{if(_0x1cd88c(0x206)!=='yxafe')return _0x1cd88c(0x353);else this[_0x1cd88c(0x1bb)][_0x1cd88c(0x287)][_0x1cd88c(0x229)]((_0x270406,_0x5661a5)=>_0x5661a5['x']-_0x270406['x']);}},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x218)]=function(_0x585aac){const _0x49a63c=_0x324937;if(!_0x585aac)return;_0x585aac[_0x49a63c(0x208)]&&(_0x49a63c(0x1a4)===_0x49a63c(0x1a4)?_0x585aac[_0x49a63c(0x208)]['remove'](_0x585aac):_0x1c5f63=_0x8a815d['randomInt'](_0x917a8c[_0x49a63c(0x2e9)]-_0x3e473b)+_0x5c61cf);const _0x5c99da=Window_OTB_TurnOrder['Settings'],_0x2cb4c8=0x3e8/0x3c*_0x5c99da[_0x49a63c(0x1a3)]+0x1f4;_0x585aac['startFade'](0x0),setTimeout(this[_0x49a63c(0x22f)][_0x49a63c(0x24b)](this,_0x585aac),_0x2cb4c8);},Window_OTB_TurnOrder['prototype']['processSpriteRemoval']=function(_0x3b74e0){const _0x10ce54=_0x324937;_0x3b74e0[_0x10ce54(0x208)]&&(_0x10ce54(0xfd)!==_0x10ce54(0x25b)?_0x3b74e0['_sourceArray'][_0x10ce54(0x1be)](_0x3b74e0):_0x1e0631[_0x10ce54(0x2c8)][_0x10ce54(0x234)][_0x10ce54(0x281)](this)),this['_spriteContainer'][_0x10ce54(0x293)](_0x3b74e0),this['_previewContainer'][_0x10ce54(0x293)](_0x3b74e0);},Window_OTB_TurnOrder['prototype'][_0x324937(0x176)]=function(){const _0x2a120b=_0x324937;if(!this[_0x2a120b(0x34f)])return;this[_0x2a120b(0x218)](this[_0x2a120b(0x34f)]);},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0xd2)]=function(){const _0x317a3b=_0x324937;while(this[_0x317a3b(0x198)][_0x317a3b(0x2e9)]){const _0x293d32=this[_0x317a3b(0x198)][_0x317a3b(0x1f0)]();_0x293d32[_0x317a3b(0x1e1)](0x0);}while(this[_0x317a3b(0x2af)][_0x317a3b(0x2e9)]){if(_0x317a3b(0x2b8)!==_0x317a3b(0x2b8)){if(!this[_0x317a3b(0x22d)]())return;const _0x5abf18=_0xab62a1[_0x317a3b(0x217)][_0x317a3b(0xf6)];if(!_0x5abf18)return;_0x5abf18[_0x317a3b(0xd2)]();}else{const _0x5629da=this[_0x317a3b(0x2af)][_0x317a3b(0x1f0)]();if(!_0x5629da)continue;this[_0x317a3b(0x198)][_0x317a3b(0x15e)](_0x5629da);}}for(const _0x557029 of this[_0x317a3b(0x198)]){if(_0x317a3b(0x1d1)!==_0x317a3b(0x11f)){if(!_0x557029)continue;_0x557029[_0x317a3b(0x337)](this[_0x317a3b(0x198)]);}else{var _0x20465c=(_0x8e823e[_0x251591]-_0x3fe888)[_0x317a3b(0x326)](_0x198c54,_0x50b9c0[_0x317a3b(0x2e9)]);_0x36265e[_0x317a3b(0x187)](_0x20465c,0x0,_0x15b1f8);}}},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x172)]=function(_0x3bb8ef,_0x6af0a2){const _0x23768e=_0x324937,_0x9ebded=_0x3bb8ef===BattleManager[_0x23768e(0x13b)]?this[_0x23768e(0x198)]:this[_0x23768e(0x2af)],_0x14d7b4={};for(const _0x22b730 of _0x3bb8ef){if(_0x23768e(0x230)===_0x23768e(0x230)){const _0x734091=_0x23768e(0x290)['format'](_0x22b730[_0x23768e(0x267)]()?'actor':'enemy',_0x22b730[_0x23768e(0x28d)]());_0x14d7b4[_0x734091]=_0x14d7b4[_0x734091]||0x0;const _0x2c818a=_0x14d7b4[_0x734091]++,_0x618677=new Sprite_OTB_TurnOrder_Battler(_0x22b730,_0x2c818a,_0x9ebded);this[_0x23768e(0x1bb)][_0x23768e(0x224)](_0x618677),_0x9ebded[_0x23768e(0x15e)](_0x618677);}else{if(_0x47df28[_0x23768e(0x1df)])_0x4b8452-=0x1;}}for(const _0x3a9acf of _0x9ebded){if(!_0x3a9acf)continue;_0x3a9acf[_0x23768e(0x1e1)](0xff),_0x3a9acf[_0x23768e(0x188)](),_0x6af0a2&&(_0x3a9acf['opacity']=0xff,_0x3a9acf['x']=_0x3a9acf['_positionTargetX'],_0x3a9acf[_0x23768e(0x197)]=0x0);}},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x28a)]=function(){const _0x521a16=_0x324937,_0x54f8dc=BattleManager[_0x521a16(0x159)];this['createTurnOrderSprites'](_0x54f8dc);},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x377)]=function(_0x5adfbf,_0x32adc2){const _0x29f349=_0x324937;this['removeCurrentSubject']();for(const _0x58be5b of this[_0x29f349(0x198)]){if(_0x29f349(0xcf)===_0x29f349(0x308)){const _0xd8e2cb=_0x3ccde9[_0x29f349(0x16e)];return _0xd8e2cb[_0x29f349(0x346)];}else{if(!_0x58be5b)continue;_0x58be5b['battler']()===_0x5adfbf&&(_0x58be5b['_instance']=_0x58be5b['_instance']||0x0,_0x58be5b[_0x29f349(0x2ff)]--);}}const _0x605fc0=this[_0x29f349(0x198)][_0x29f349(0x153)](_0x19a232=>_0x19a232['battler']()===_0x5adfbf);if(this[_0x29f349(0x198)][_0x605fc0])_0x29f349(0x125)===_0x29f349(0x125)?(this[_0x29f349(0x34f)]=this[_0x29f349(0x198)][_0x605fc0],this[_0x29f349(0x198)][_0x605fc0][_0x29f349(0x188)](),this['_currentTurn'][_0x29f349(0x187)](_0x605fc0,0x1)):(_0x423224['BattleSystemOTB'][_0x29f349(0x21e)][_0x29f349(0x281)](this),this[_0x29f349(0x15b)]());else{if(_0x5adfbf){const _0x4f89ec=new Sprite_OTB_TurnOrder_Battler(_0x5adfbf,-0x1,null);this[_0x29f349(0x1bb)][_0x29f349(0x224)](_0x4f89ec),this[_0x29f349(0x34f)]=_0x4f89ec,_0x4f89ec['startFade'](0xff),_0x4f89ec[_0x29f349(0x197)]=0x258,_0x4f89ec['x']=this[_0x29f349(0x120)],_0x4f89ec[_0x29f349(0x26a)]=this[_0x29f349(0x120)],_0x32adc2&&(_0x4f89ec['opacity']=0xff);}}for(const _0x1fe23a of this[_0x29f349(0x198)]){if(!_0x1fe23a)continue;_0x1fe23a[_0x29f349(0x188)]();}},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x18b)]=function(){const _0x11cc6f=_0x324937;for(const _0x2b9a37 of this[_0x11cc6f(0x198)]){if(!_0x2b9a37)continue;const _0x917fd3=_0x2b9a37[_0x11cc6f(0x2e3)]();if(BattleManager[_0x11cc6f(0x13b)]['includes'](_0x917fd3))continue;this[_0x11cc6f(0x218)](_0x2b9a37);}for(const _0x1e20e8 of this[_0x11cc6f(0x2af)]){if(!_0x1e20e8)continue;const _0xa4ab97=_0x1e20e8[_0x11cc6f(0x2e3)]();if(BattleManager[_0x11cc6f(0x159)][_0x11cc6f(0x1b5)](_0xa4ab97))continue;this['removeSprite'](_0x1e20e8);}},Window_OTB_TurnOrder['prototype']['addBattlerToTurnOrderAtEnd']=function(_0x42d4cf,_0xbca9a5){const _0x3082d9=_0x324937,_0x404649=_0xbca9a5===BattleManager['_actionBattlers']?this[_0x3082d9(0x198)]:this[_0x3082d9(0x2af)];if(!_0x404649)return;const _0x1904e4=VisuMZ[_0x3082d9(0x2c8)][_0x3082d9(0x362)](_0x42d4cf,_0xbca9a5),_0x2b1157=_0x1904e4['length']-0x1,_0x18aa57=new Sprite_OTB_TurnOrder_Battler(_0x42d4cf,_0x2b1157,_0x404649);this['_spriteContainer'][_0x3082d9(0x224)](_0x18aa57),_0x404649['push'](_0x18aa57),_0x18aa57[_0x3082d9(0x1e1)](0xff),this[_0x3082d9(0x34a)]();},Window_OTB_TurnOrder[_0x324937(0x256)]['addBattlerToTurnOrderAtStart']=function(_0x29f03f,_0xd20852){const _0x4b072f=_0x324937,_0x401478=_0xd20852===BattleManager['_actionBattlers']?this[_0x4b072f(0x198)]:this[_0x4b072f(0x2af)];if(!_0x401478)return;for(const _0x5973c4 of _0x401478){if(!_0x5973c4)continue;if(_0x5973c4[_0x4b072f(0x2e3)]()===_0x29f03f){if(_0x4b072f(0x333)===_0x4b072f(0xef))return this['processUpdateGraphic']();else _0x5973c4[_0x4b072f(0x2ff)]=_0x5973c4[_0x4b072f(0x2ff)]||0x0,_0x5973c4[_0x4b072f(0x2ff)]++;}}const _0x540f2f=0x0,_0x3e7e31=new Sprite_OTB_TurnOrder_Battler(_0x29f03f,_0x540f2f,_0x401478);this['_spriteContainer'][_0x4b072f(0x224)](_0x3e7e31),_0x401478[_0x4b072f(0x1cf)](_0x3e7e31),_0x3e7e31[_0x4b072f(0x1e1)](0xff),_0x3e7e31[_0x4b072f(0x197)]=0x258,_0x3e7e31['x']=this[_0x4b072f(0x120)],this[_0x4b072f(0x34a)]();},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x1e6)]=function(_0x15438a,_0x3e9bb6){const _0x30bec0=_0x324937,_0x11f2b9=this[_0x30bec0(0x198)];if(!_0x11f2b9)return;let _0x2518d8=0x0;for(let _0x3a6907=0x0;_0x3a6907<_0x3e9bb6;_0x3a6907++){if(_0x30bec0(0x2f9)!==_0x30bec0(0x170)){const _0x14f8f2=_0x11f2b9[_0x3a6907];if(!_0x14f8f2)continue;if(_0x14f8f2[_0x30bec0(0x2e3)]()!==_0x15438a)continue;_0x2518d8=_0x14f8f2[_0x30bec0(0x2ff)]+0x1;}else _0x4fb6eb[_0x30bec0(0x1cf)](_0x4d3b37),_0x6fc27b&&_0x17084e['addBattlerToTurnOrderAtStart'](_0x4e46a1,_0x39f7dd);}for(let _0x33ed7f=_0x3e9bb6;_0x33ed7f<_0x11f2b9[_0x30bec0(0x2e9)];_0x33ed7f++){if(_0x30bec0(0xed)!==_0x30bec0(0xed))this[_0x30bec0(0x116)]=!![];else{const _0x2dd036=_0x11f2b9[_0x33ed7f];if(!_0x2dd036)continue;if(_0x2dd036['battler']()!==_0x15438a)continue;_0x2dd036[_0x30bec0(0x2ff)]=_0x2dd036[_0x30bec0(0x2ff)]||0x0,_0x2dd036[_0x30bec0(0x2ff)]++;}}const _0x5bd83a=new Sprite_OTB_TurnOrder_Battler(_0x15438a,_0x2518d8,_0x11f2b9);this['_spriteContainer'][_0x30bec0(0x224)](_0x5bd83a),_0x11f2b9[_0x30bec0(0x187)](_0x3e9bb6,0x0,_0x5bd83a),_0x5bd83a[_0x30bec0(0x1e1)](0xff),_0x5bd83a['_positionDuration']=0x258,_0x5bd83a['x']=this['_subjectX'],this[_0x30bec0(0x34a)]();},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x34d)]=function(){const _0x4e4575=_0x324937;this[_0x4e4575(0x172)](BattleManager['_actionBattlers'],!![]),this['createTurnOrderSprites'](BattleManager[_0x4e4575(0x159)],!![]),this[_0x4e4575(0x377)](BattleManager[_0x4e4575(0x34f)],!![]),this[_0x4e4575(0xde)]();},Window_OTB_TurnOrder[_0x324937(0x256)]['previewOrderByAction']=function(_0x479c88){const _0x146460=_0x324937;this[_0x146460(0x263)](),_0x479c88&&_0x479c88['item']()!==null&&this[_0x146460(0x35c)](_0x479c88);},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x263)]=function(){const _0x25e2b4=_0x324937;for(const _0x63b416 of this[_0x25e2b4(0x348)][_0x25e2b4(0x287)]){if(_0x25e2b4(0x2a5)===_0x25e2b4(0x2c3))_0x2608db['otbPreviewOrderClear'](),_0x1ef881[_0x25e2b4(0x2c8)]['Scene_Battle_onActorCancel'][_0x25e2b4(0x281)](this);else{if(!_0x63b416)continue;this[_0x25e2b4(0x218)](_0x63b416);}}},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x35c)]=function(_0xb4b3b2){const _0x42784d=_0x324937,_0x37b3a7=_0xb4b3b2[_0x42784d(0xdb)](),_0x1d3cf6=_0xb4b3b2['otbCalcUserCurrentOrderChange'](),_0x4006ad=_0xb4b3b2[_0x42784d(0x30e)]();_0x1d3cf6!==0x0&&this[_0x42784d(0x131)](_0x37b3a7,![],_0x1d3cf6);_0x4006ad!==0x0&&this['createOrderPreviewSprite'](_0x37b3a7,!![],_0x4006ad);if(!_0xb4b3b2[_0x42784d(0x181)]())return;const _0x33b27e=SceneManager['_scene'][_0x42784d(0x161)],_0x20ff3d=SceneManager[_0x42784d(0x217)]['_enemyWindow'];let _0x3e191a=null;if(_0x33b27e&&_0x33b27e[_0x42784d(0xff)]){if(_0x42784d(0x26e)!==_0x42784d(0x375))_0x3e191a=_0x33b27e['actor'](_0x33b27e[_0x42784d(0x28d)]());else{if(!_0x51c092['isOTB']())return;this[_0x42784d(0x2ae)]=this['_otbTimesActedThisTurn']||0x0,this[_0x42784d(0x2ae)]++;if(this['numActions']()>0x0&&this===_0x3dbb76[_0x42784d(0x34f)]){const _0x3c0cd9=_0x220c0c[_0x42784d(0x2de)];if(_0x3c0cd9[_0x42784d(0x2e9)]>0x0&&_0x3c0cd9[0x0]!==this)return;const _0x33af6=this[_0x42784d(0x2e3)]();if(_0x33af6&&_0x3b000e['isNextOtbSubject'](this))_0x33af6[_0x42784d(0x173)]();}}}else _0x20ff3d&&_0x20ff3d['active']&&(_0x3e191a=_0x20ff3d[_0x42784d(0x31b)]());if(!_0x3e191a)return;const _0x7508d0=_0xb4b3b2[_0x42784d(0x16d)](_0x3e191a),_0x2f9bbf=_0xb4b3b2[_0x42784d(0x2c1)](_0x3e191a);_0x7508d0!==0x0&&this[_0x42784d(0x131)](_0x3e191a,![],_0x7508d0);if(_0x2f9bbf!==0x0){if(_0x42784d(0x19f)!==_0x42784d(0x19f)){if(!this[_0x42784d(0x22d)]())return;this[_0x42784d(0x35f)]();this['_subject']&&(this[_0x42784d(0x1f7)](this['_subject']),this['_subject']=null);this[_0x42784d(0x2de)][_0x42784d(0x2e9)]>0x0&&(this[_0x42784d(0x34f)]=this[_0x42784d(0x1ec)]());;}else this['createOrderPreviewSprite'](_0x3e191a,!![],_0x2f9bbf);}},Window_OTB_TurnOrder[_0x324937(0x256)][_0x324937(0x131)]=function(_0x1c9b93,_0x164bdb,_0x188d30){const _0x4cc387=_0x324937;if(!_0x1c9b93)return;if(_0x188d30===0x0)return;const _0x17e6a=_0x164bdb?BattleManager[_0x4cc387(0x159)]:BattleManager[_0x4cc387(0x13b)],_0x4c870a=VisuMZ[_0x4cc387(0x2c8)][_0x4cc387(0x362)](_0x1c9b93,_0x17e6a),_0x2b4269=_0x164bdb?this[_0x4cc387(0x2af)]:this[_0x4cc387(0x198)],_0x31f0b0=_0x164bdb?this[_0x4cc387(0x294)]:this['_previewCurrent'];if(_0x4c870a[_0x4cc387(0x2e9)]<=0x0)return;for(let _0x4c40ea=0x0;_0x4c40ea<_0x4c870a[_0x4cc387(0x2e9)];_0x4c40ea++){if(_0x4cc387(0x23e)!=='GHhRX')return _0x3d5a8c;else{const _0x12d8cd=new Sprite_OTB_TurnOrder_Preview(_0x1c9b93,_0x4c40ea,_0x2b4269,_0x188d30);this[_0x4cc387(0x348)][_0x4cc387(0x224)](_0x12d8cd),_0x31f0b0[_0x4cc387(0x15e)](_0x12d8cd),_0x12d8cd[_0x4cc387(0x188)](),_0x12d8cd[_0x4cc387(0x1e1)](0xff);}}};