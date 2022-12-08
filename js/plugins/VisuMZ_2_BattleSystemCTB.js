//=============================================================================
// VisuStella MZ - Battle System CTB - Charge Turn Battle
// VisuMZ_2_BattleSystemCTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemCTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemCTB = VisuMZ.BattleSystemCTB || {};
VisuMZ.BattleSystemCTB.version = 1.19;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.19] [BattleSystemCTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_CTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a Charge Turn Battle (CTB) system using RPG Maker MZ's
 * TPB as a base. CTB functions by calculating the speed of every battler and
 * balancing them relative to one another. When it's a battler's turn, the
 * battler will either choose an action to perform immediately or charge it
 * for later depending if the skill requires charging.
 * 
 * This is a battle system where agility plays an important factor in the
 * progress of battle where higher agility values give battlers more advantage
 * and additional turns over lower agility values, which give battlers less
 * advantage and less turns.
 * 
 * A turn order display will appear to compensate for the removal of gauges.
 * The turn order display will show a preview of what the turn order could
 * possibly be like. This turn order display is variable and can be changed
 * due to player and enemy influence by using different action speeds, effects
 * provided by this plugin that alter the turn order, and more!
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB integrated mechanics converted for CTB such as
 *   speed, calculations, etc.
 * * No more waiting for gauges to show up! In fact, you won't even see the
 *   TPB gauge in-game.
 * * A turn order display that previews a potential lineup for how the
 *   participating battlers in battle will play out.
 * * Notetags that give skills and items access to manipulating a battler's
 *   CTB speed.
 * * Notetags that give skills and items access to directly manipulate a target
 *   batter's position on the Turn Order display.
 * * These mechanics are separate from ATB and TPB itself, so you can still use
 *   either battle system without affecting both of them.
 * * Through the Core Engine, you can switch in and out of CTB for a different
 *   battle system.
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
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
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
 * Despite the fact that the Battle System CTB plugin uses RPG Maker MZ's TPB
 * as a base, it does not have any gauges to depict the time it takes for a
 * battler's turn to appear. Instead, a turn order display appears on the
 * screen (you pick where it can appear: top, bottom, left, or right) and shows
 * a possible preview of the battler turn order.
 * 
 * This is only a preview of what can happen because lots of different things
 * can influence the position and ordering of the turn order display, ranging
 * from skill/item speeds, notetag effects, changes in AGI, etc. What is seen
 * on the turn order display is the most likely possibility instead of the
 * exact order to occur due to the external influences.
 * 
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to CTB,
 * skills and items with positive speed values will have an impact on how full
 * their CTB Speed will be in the following turn. A value of 2000 will put the
 * turn at 50% ready, 1000 will put the gauge at 25% ready, 500 will put it at
 * 12.5% ready, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
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
 * === General CTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <CTB Help>
 *  description
 *  description
 * </CTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under CTB.
 * - This is primarily used if the skill behaves differently in CTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to CTB.
 *
 * ---
 * 
 * === CTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the CTB Turn Order Display
 * 
 * ---
 *
 * <CTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <CTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <CTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === CTB Speed Manipulation-Related Notetags ===
 * 
 * These notetags are used for CTB Speed manipulation purposes.
 * 
 * ---
 *
 * <CTB Set Order: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position to exactly x.
 * - Replace 'x' with a number value depicting the exact position of the turn
 *   order position. 0 is the currently active battler and cannot be used.
 *   1 is closest to taking a turn. Higher numbers are further away.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB Change Order: +x>
 * <CTB Change Order: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position by x slots.
 * - Replace 'x' with a number value indicating the increase or decrease.
 *   Negative values decrease the turns needed to wait while positive values
 *   increase the turns needed.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB After Speed: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's CTB Speed will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   CTB Speed to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <CTB Charge Speed: x%>
 * <CTB Charge Speed: +x%>
 * <CTB Charge Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <CTB Cast Speed: x%>
 * <CTB Cast Speed: +x%>
 * <CTB Cast Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 * 
 * === JavaScript Notetags: CTB Speed Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional CTB Speed Manipulation.
 * 
 * ---
 * 
 * <JS CTB Order>
 *  code
 *  code
 *  order = code;
 * </JS CTB Order>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine where to set the target's
 *   order on the CTB Turn Order Display to.
 * - The 'order' variable represents the final position on the Turn Order
 *   Display to place the target.
 * - The 'position' variable represents the target's current position on the
 *   Turn Order Display.
 * - This does not affect the currently active battler.
 * 
 * ---
 * 
 * <JS CTB Charge Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Charge Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a charging state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS CTB Cast Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Cast Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a casting state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS CTB After Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB After Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to after performing this skill/item action.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * Actor: Change CTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change CTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the CTB Turn Order.
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
 * Actor: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the actor(s).
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
 * Enemy: Change CTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change CTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * Enemy: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the enemy(ies).
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
 * System: CTB Turn Order Visibility
 * - Determine the visibility of the CTB Turn Order Display.
 * 
 *   Visibility:
 *   - Changes the visibility of the CTB Turn Order Display.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System CTB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * General
 * 
 *   Device Friendly:
 *   - Make the calculations more device friendly?
 *   - Or make it for desktop at full strength?
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Initial Speed:
 *   - JavaScript code to determine how much speed to give each battler at the
 *     start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Order Change Effects Settings
 * ============================================================================
 * 
 * Whenever the turn order a battler is changed by a CTB Order notetag, play
 * these effects on the target battler. These effects do not play if the order
 * was changed due to speed changes and only through the specific notetags.
 *
 * ---
 *
 * Delay Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is delayed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is delayed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is delayed.
 *
 * ---
 *
 * Delay Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is delayed.
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
 * Rush Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is rushed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is rushed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is rushed.
 *
 * ---
 *
 * Rush Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is rushed.
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
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System CTB. These adjust how the
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
 *   Total Horizontal:
 *   - How many slots do you want to display for top and bottom Turn Order
 *     Display positions?
 * 
 *   Total Vertical:
 *   - How many slots do you want to display for left and right Turn Order
 *     Display positions?
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
 * Version 1.19: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.18: June 2, 2022
 * * Bug Fixes!
 * ** Notetag effect for <CTB After Speed: x%> should now be working properly.
 *    Fix made by Olivia.
 * ** Notetag effect for <JS CTB After Speed> should now be working properly.
 *    Fix made by Olivia.
 * 
 * Version 1.17: May 2, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: April 28, 2022
 * * Feature Update!
 * ** Added update for CTB-specific idle time to allow a more consistent turn
 *    end processing for actors and enemies with higher than normal AGI values.
 *    Update made by Olivia.
 * 
 * Version 1.15: April 21, 2022
 * * Bug Fixes!
 * ** The endless softlock has been fixed! Much thanks to AndyL for providing a
 *    project that can easily replicate it! Fix made by Yanfly.
 * * Feature Update!
 * ** Slightly more accurate turn order forecasting. However, there is only so
 *    much I can do due to JavaScript's "accuracy" with decimal values. Update
 *    made by Yanfly.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Updated anti-softlock check at 180 frames (3 seconds) to automatically
 *    clear any battle states to see if they're the cause of the hangup.
 * ** Updated anti-softlock check at 300 frames (5 seconds) to automatically
 *    clear all states to see if they're the cause of the hangup.
 * ** Updated anti-softlock check at 600 frames (10 seconds) to automatically
 *    abort the battle to salvage the game from freezing.
 * 
 * Version 1.13: March 3, 2022
 * * Feature Update!
 * ** Reserved common events for non-action sequence skills now function
 *    separately from one another when used by a battler with Action Times+.
 *    Update made by Olivia.
 * 
 * Version 1.12: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.10: June 18, 2021
 * * Bug Fixes!
 * ** Fixed turn order icon reappearing for a dying battler. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Mechanics > General > Device Friendly
 * **** Make the calculations more device friendly? Or make it for desktop at
 *      full strength?
 * 
 * Version 1.09: June 11, 2021
 * * Bug Fixes!
 * ** Plugin Command: "Enemy: Change CTB Turn Order Face" should now properly
 *    change to the correct face index. Fix made by Arisu.
 * 
 * Version 1.08: April 23, 2021
 * * Feature Update!
 * ** When using 100% for After Speed notetag, no other battler is able to
 *    interrupt the action. Update made by Olivia.
 * 
 * Version 1.07: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.06: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * ** Added in a built-in anti-softlock check.
 * 
 * Version 1.05: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Optimization Update!
 * ** Uses less resources for turn order display.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change CTB Turn Order Face
 * **** Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Turn Order icons no longer stay invisible after rotating out completely.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <CTB Turn Order Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Action times + should no longer freeze the game. Fix made by Yanfly.
 * ** Actors and enemies without actions will no longer softlock the game.
 *    Fix made by Yanfly.
 * ** Auto-battle during CTB should no longer lock the game! Fix by Yanfly.
 * ** Enemies without any actions should no longer cause endless loops.
 *    Fix made by Yanfly.
 * ** SV_Actor graphics on the Turn Order display are now centered.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release: October 19, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorIcon
 * @text Actor: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the CTB Turn Order.
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
 * @command CtbTurnOrderActorFace
 * @text Actor: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the CTB Turn Order.
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
 * @command CtbTurnOrderClearActorGraphic
 * @text Actor: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the actor(s).
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
 * @command CtbTurnOrderEnemyIcon
 * @text Enemy: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderEnemyFace
 * @text Enemy: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the enemy(ies).
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
 * @text System: CTB Turn Order Visibility
 * @desc Determine the visibility of the CTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the CTB Turn Order Display.
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
 * @param BattleSystemCTB
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
 * @desc Mechanics settings used for Battle System CTB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.50","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Effect:struct
 * @text Order Change Effects
 * @type struct<Effect>
 * @desc Effects to play when the Turn Order is changed in CTB.
 * @default {"Delay":"","DelayAnimation":"","DelayAnimationID:num":"54","DelayMirror:eval":"false","DelayMute:eval":"false","DelayPopups":"","DelayPopupText:str":"DELAY","DelayTextColor:str":"25","DelayFlashColor:eval":"[255, 0, 0, 160]","DelayFlashDuration:num":"60","Rush":"","RushAnimation":"","RushAnimationID:num":"51","RushMirror:eval":"false","RushMute:eval":"false","RushPopups":"","RushPopupText:str":"RUSH","RushTextColor:str":"24","RushFlashColor:eval":"[0, 255, 0, 160]","RushFlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System CTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","TotalHorzSprites:num":"16","TotalVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * @param General
 *
 * @param DeviceFriendly:eval
 * @text Device Friendly
 * @parent General
 * @type boolean
 * @on Device Friendly
 * @off For Desktops
 * @desc Make the calculations more device friendly?
 * Or make it for desktop at full strength?
 * @default false
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Speed
 * @parent JavaScript
 * @desc JavaScript code to determine how much speed to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Delay
 * @text Delay Turn Order
 * 
 * @param DelayAnimation
 * @text Animation
 * @parent Delay
 *
 * @param DelayAnimationID:num
 * @text Animation ID
 * @parent DelayAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is delayed.
 * @default 54
 *
 * @param DelayMirror:eval
 * @text Mirror Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayMute:eval
 * @text Mute Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayPopups
 * @text Popups
 * @parent Delay
 *
 * @param DelayPopupText:str
 * @text Text
 * @parent DelayPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is delayed.
 * @default DELAY
 *
 * @param DelayTextColor:str
 * @text Text Color
 * @parent DelayPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param DelayFlashColor:eval
 * @text Flash Color
 * @parent DelayPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DelayFlashDuration:num
 * @text Flash Duration
 * @parent DelayPopups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Rush
 * @text Rush Turn Order
 * 
 * @param RushAnimation
 * @text Animation
 * @parent Rush
 *
 * @param RushAnimationID:num
 * @text Animation ID
 * @parent RushAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is rushed.
 * @default 51
 *
 * @param RushMirror:eval
 * @text Mirror Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushMute:eval
 * @text Mute Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushPopups
 * @text Popups
 * @parent Rush
 *
 * @param RushPopupText:str
 * @text Text
 * @parent RushPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is rushed.
 * @default RUSH
 *
 * @param RushTextColor:str
 * @text Text Color
 * @parent RushPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param RushFlashColor:eval
 * @text Flash Color
 * @parent RushPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param RushFlashDuration:num
 * @text Flash Duration
 * @parent RushPopups
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
 * @param TotalHorzSprites:num
 * @text Total Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param TotalVertSprites:num
 * @text Total Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for left and
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

const _0x379849=_0x48fc;(function(_0x1b32fb,_0x4d85c5){const _0x240fee=_0x48fc,_0x49a19f=_0x1b32fb();while(!![]){try{const _0x9e9f60=parseInt(_0x240fee(0x125))/0x1*(-parseInt(_0x240fee(0x1e4))/0x2)+parseInt(_0x240fee(0x1a6))/0x3*(parseInt(_0x240fee(0x1ef))/0x4)+-parseInt(_0x240fee(0x24d))/0x5+parseInt(_0x240fee(0x1ca))/0x6*(parseInt(_0x240fee(0x25a))/0x7)+parseInt(_0x240fee(0x1cf))/0x8*(parseInt(_0x240fee(0x1a7))/0x9)+parseInt(_0x240fee(0x232))/0xa*(parseInt(_0x240fee(0x23e))/0xb)+parseInt(_0x240fee(0x2f0))/0xc*(-parseInt(_0x240fee(0x175))/0xd);if(_0x9e9f60===_0x4d85c5)break;else _0x49a19f['push'](_0x49a19f['shift']());}catch(_0x4514e2){_0x49a19f['push'](_0x49a19f['shift']());}}}(_0x597d,0x7dccf));var label=_0x379849(0x18a),tier=tier||0x0,dependencies=[_0x379849(0x2df),_0x379849(0x227)],pluginData=$plugins[_0x379849(0x241)](function(_0x35a866){const _0x204307=_0x379849;return _0x35a866['status']&&_0x35a866[_0x204307(0x13d)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x379849(0x124)]||{},VisuMZ[_0x379849(0x271)]=function(_0x2de45f,_0x1349f7){const _0x8b948a=_0x379849;for(const _0x122fa2 in _0x1349f7){if(_0x122fa2[_0x8b948a(0x2fc)](/(.*):(.*)/i)){const _0x339a62=String(RegExp['$1']),_0x4d44c7=String(RegExp['$2'])[_0x8b948a(0x2a0)]()[_0x8b948a(0x13a)]();let _0x24f8eb,_0x560bcc,_0xf8d3b5;switch(_0x4d44c7){case _0x8b948a(0x287):_0x24f8eb=_0x1349f7[_0x122fa2]!==''?Number(_0x1349f7[_0x122fa2]):0x0;break;case _0x8b948a(0x2a8):_0x560bcc=_0x1349f7[_0x122fa2]!==''?JSON[_0x8b948a(0x2b2)](_0x1349f7[_0x122fa2]):[],_0x24f8eb=_0x560bcc['map'](_0x214611=>Number(_0x214611));break;case _0x8b948a(0x27f):_0x24f8eb=_0x1349f7[_0x122fa2]!==''?eval(_0x1349f7[_0x122fa2]):null;break;case _0x8b948a(0x316):_0x560bcc=_0x1349f7[_0x122fa2]!==''?JSON[_0x8b948a(0x2b2)](_0x1349f7[_0x122fa2]):[],_0x24f8eb=_0x560bcc[_0x8b948a(0x207)](_0x4928a6=>eval(_0x4928a6));break;case _0x8b948a(0x259):_0x24f8eb=_0x1349f7[_0x122fa2]!==''?JSON['parse'](_0x1349f7[_0x122fa2]):'';break;case _0x8b948a(0x28b):_0x560bcc=_0x1349f7[_0x122fa2]!==''?JSON[_0x8b948a(0x2b2)](_0x1349f7[_0x122fa2]):[],_0x24f8eb=_0x560bcc[_0x8b948a(0x207)](_0x36a782=>JSON['parse'](_0x36a782));break;case'FUNC':_0x24f8eb=_0x1349f7[_0x122fa2]!==''?new Function(JSON[_0x8b948a(0x2b2)](_0x1349f7[_0x122fa2])):new Function(_0x8b948a(0x1c2));break;case _0x8b948a(0x334):_0x560bcc=_0x1349f7[_0x122fa2]!==''?JSON[_0x8b948a(0x2b2)](_0x1349f7[_0x122fa2]):[],_0x24f8eb=_0x560bcc[_0x8b948a(0x207)](_0x527d40=>new Function(JSON[_0x8b948a(0x2b2)](_0x527d40)));break;case'STR':_0x24f8eb=_0x1349f7[_0x122fa2]!==''?String(_0x1349f7[_0x122fa2]):'';break;case _0x8b948a(0x258):_0x560bcc=_0x1349f7[_0x122fa2]!==''?JSON[_0x8b948a(0x2b2)](_0x1349f7[_0x122fa2]):[],_0x24f8eb=_0x560bcc[_0x8b948a(0x207)](_0x31a293=>String(_0x31a293));break;case _0x8b948a(0x27b):_0xf8d3b5=_0x1349f7[_0x122fa2]!==''?JSON[_0x8b948a(0x2b2)](_0x1349f7[_0x122fa2]):{},_0x24f8eb=VisuMZ[_0x8b948a(0x271)]({},_0xf8d3b5);break;case _0x8b948a(0x325):_0x560bcc=_0x1349f7[_0x122fa2]!==''?JSON[_0x8b948a(0x2b2)](_0x1349f7[_0x122fa2]):[],_0x24f8eb=_0x560bcc[_0x8b948a(0x207)](_0x223753=>VisuMZ['ConvertParams']({},JSON['parse'](_0x223753)));break;default:continue;}_0x2de45f[_0x339a62]=_0x24f8eb;}}return _0x2de45f;},(_0x47ed34=>{const _0x6c56ee=_0x379849,_0x2dbfd9=_0x47ed34['name'];for(const _0x4d5a3b of dependencies){if(_0x6c56ee(0x260)!=='ocJFe'){if(!_0x271aa6[_0x6c56ee(0x124)][_0x6c56ee(0x16e)])return;const _0x392c9f=_0x5988aa['Settings'],_0xe3134d=this[_0x6c56ee(0x23b)]===_0x1d9b81?_0x6c56ee(0x110):_0x6c56ee(0x2e5),_0x17371d=_0x6c56ee(0x2bf)[_0x6c56ee(0x168)](_0xe3134d),_0x3420cf=new _0x2c7cc8();_0x3420cf[_0x6c56ee(0x2a4)]['x']=this['anchor']['x'],_0x3420cf[_0x6c56ee(0x2a4)]['y']=this[_0x6c56ee(0x2a4)]['y'];if(_0x392c9f[_0x17371d])_0x3420cf[_0x6c56ee(0x2b4)]=_0x2c4a1b[_0x6c56ee(0x186)](_0x392c9f[_0x17371d]);else{let _0x186a06=this[_0x6c56ee(0x132)](),_0x6d1321=this[_0x6c56ee(0x1d6)](),_0x54f00a=_0x392c9f[_0x6c56ee(0x29a)];_0x3420cf['bitmap']=new _0x4eb203(_0x186a06,_0x6d1321);const _0x30eb93=_0x6c56ee(0x181),_0x3a0965=_0x4dbc7e[_0x6c56ee(0x2d6)](_0x392c9f[_0x6c56ee(0x29f)['format'](_0xe3134d)]);_0x3420cf[_0x6c56ee(0x2b4)]['fillRect'](0x0,0x0,_0x186a06,_0x6d1321,_0x30eb93),_0x186a06-=0x2,_0x6d1321-=0x2,_0x3420cf[_0x6c56ee(0x2b4)]['fillRect'](0x1,0x1,_0x186a06,_0x6d1321,_0x3a0965),_0x186a06-=_0x54f00a*0x2,_0x6d1321-=_0x54f00a*0x2,_0x3420cf[_0x6c56ee(0x2b4)][_0x6c56ee(0x226)](0x1+_0x54f00a,0x1+_0x54f00a,_0x186a06,_0x6d1321,_0x30eb93),_0x186a06-=0x2,_0x6d1321-=0x2,_0x54f00a+=0x1,_0x3420cf['bitmap'][_0x6c56ee(0x2b0)](0x1+_0x54f00a,0x1+_0x54f00a,_0x186a06,_0x6d1321);}this[_0x6c56ee(0x297)]=_0x3420cf,this[_0x6c56ee(0x139)](this[_0x6c56ee(0x297)]);}else{if(!Imported[_0x4d5a3b]){alert(_0x6c56ee(0x2d0)['format'](_0x2dbfd9,_0x4d5a3b)),SceneManager[_0x6c56ee(0x1a5)]();break;}}}const _0x4d6fb9=_0x47ed34[_0x6c56ee(0x13d)];if(_0x4d6fb9['match'](/\[Version[ ](.*?)\]/i)){if(_0x6c56ee(0x2e7)==='elEHG'){const _0x63cf5f=Number(RegExp['$1']);_0x63cf5f!==VisuMZ[label][_0x6c56ee(0x1ff)]&&(alert(_0x6c56ee(0x203)[_0x6c56ee(0x168)](_0x2dbfd9,_0x63cf5f)),SceneManager[_0x6c56ee(0x1a5)]());}else{if(!this['containerWindow']())return this[_0x6c56ee(0x2dd)]();const _0x44cb68=this[_0x6c56ee(0x304)]()[_0x6c56ee(0x1a0)];return _0x44cb68['indexOf'](this);}}if(_0x4d6fb9[_0x6c56ee(0x2fc)](/\[Tier[ ](\d+)\]/i)){const _0x513355=Number(RegExp['$1']);if(_0x513355<tier){if('PMTby'==='PMTby')alert(_0x6c56ee(0x171)['format'](_0x2dbfd9,_0x513355,tier)),SceneManager[_0x6c56ee(0x1a5)]();else{const _0x3c4d31=this[_0x6c56ee(0x114)];this[_0x6c56ee(0x1af)]=(this[_0x6c56ee(0x1af)]*(_0x3c4d31-0x1)+this['_fadeTarget'])/_0x3c4d31,this['_fadeDuration']--,this[_0x6c56ee(0x114)]<=0x0&&(this[_0x6c56ee(0x2e8)](),this[_0x6c56ee(0x32d)]=0x0,this[_0x6c56ee(0x1e6)](),this['opacity']=this[_0x6c56ee(0x167)]);}}else tier=Math[_0x6c56ee(0x17a)](_0x513355,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x6c56ee(0x124)],_0x47ed34['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData['name'],'CtbTurnOrderActorIcon',_0x35d444=>{const _0x297a79=_0x379849;VisuMZ[_0x297a79(0x271)](_0x35d444,_0x35d444);const _0x356162=_0x35d444['Actors'],_0x24543b=_0x35d444['IconIndex'];for(const _0x5db143 of _0x356162){const _0x51dda9=$gameActors[_0x297a79(0x20b)](_0x5db143);if(!_0x51dda9)continue;_0x51dda9[_0x297a79(0x1c3)]=_0x297a79(0x10f),_0x51dda9[_0x297a79(0x311)]=_0x24543b;}}),PluginManager[_0x379849(0x2a2)](pluginData[_0x379849(0x142)],_0x379849(0x26b),_0x4a7049=>{const _0x29ef67=_0x379849;VisuMZ[_0x29ef67(0x271)](_0x4a7049,_0x4a7049);const _0x1e6ef3=_0x4a7049[_0x29ef67(0x19e)],_0x5d7c64=_0x4a7049[_0x29ef67(0x1fd)],_0x2fef7b=_0x4a7049[_0x29ef67(0x1fc)];for(const _0x523ce of _0x1e6ef3){const _0x45bc82=$gameActors[_0x29ef67(0x20b)](_0x523ce);if(!_0x45bc82)continue;_0x45bc82[_0x29ef67(0x1c3)]='face',_0x45bc82[_0x29ef67(0x21a)]=_0x5d7c64,_0x45bc82[_0x29ef67(0x2fe)]=_0x2fef7b;}}),PluginManager[_0x379849(0x2a2)](pluginData[_0x379849(0x142)],_0x379849(0x329),_0xfd39ec=>{const _0x5d38fd=_0x379849;VisuMZ['ConvertParams'](_0xfd39ec,_0xfd39ec);const _0x41c1f0=_0xfd39ec[_0x5d38fd(0x19e)];for(const _0x1c3928 of _0x41c1f0){if(_0x5d38fd(0x214)==='hrZAZ'){let _0x267827=_0x237dae[_0x5d38fd(0x307)]/0x1388;return _0x267827+=_0x44c256['_actionBattlers'][_0x5d38fd(0x150)](this)*0x5,_0x267827;}else{const _0x4b207e=$gameActors[_0x5d38fd(0x20b)](_0x1c3928);if(!_0x4b207e)continue;_0x4b207e[_0x5d38fd(0x115)]();}}}),PluginManager[_0x379849(0x2a2)](pluginData['name'],_0x379849(0x135),_0x3dbf59=>{const _0xa1a33=_0x379849;VisuMZ[_0xa1a33(0x271)](_0x3dbf59,_0x3dbf59);const _0x1a0345=_0x3dbf59[_0xa1a33(0x278)],_0x2594ef=_0x3dbf59[_0xa1a33(0x12d)];for(const _0x3a0c4b of _0x1a0345){if(_0xa1a33(0x1da)!==_0xa1a33(0x1da))return _0x1d795d[_0xa1a33(0x18a)][_0xa1a33(0x1d8)][_0xa1a33(0x1c6)](this);else{const _0x5b8098=$gameTroop[_0xa1a33(0x1ac)]()[_0x3a0c4b];if(!_0x5b8098)continue;_0x5b8098['_ctbTurnOrderGraphicType']='icon',_0x5b8098[_0xa1a33(0x311)]=_0x2594ef;}}}),PluginManager['registerCommand'](pluginData[_0x379849(0x142)],_0x379849(0x328),_0x1a4512=>{const _0x412f71=_0x379849;VisuMZ['ConvertParams'](_0x1a4512,_0x1a4512);const _0x220864=_0x1a4512[_0x412f71(0x278)],_0x553900=_0x1a4512[_0x412f71(0x1fd)],_0x4331b0=_0x1a4512[_0x412f71(0x1fc)];for(const _0x525ff3 of _0x220864){if(_0x412f71(0x2ca)==='yrgvQ'){const _0x3f0844=$gameTroop[_0x412f71(0x1ac)]()[_0x525ff3];if(!_0x3f0844)continue;_0x3f0844['_ctbTurnOrderGraphicType']=_0x412f71(0x1f7),_0x3f0844[_0x412f71(0x21a)]=_0x553900,_0x3f0844[_0x412f71(0x2fe)]=_0x4331b0;}else{const _0x1d5304=this[_0x412f71(0x1e5)](),_0x6bddf8=_0x1d5304*_0x46e5f1;this[_0x412f71(0x165)]=this[_0x412f71(0x165)]+_0x6bddf8;}}}),PluginManager[_0x379849(0x2a2)](pluginData[_0x379849(0x142)],_0x379849(0x1e1),_0x1bd64f=>{const _0x2e7800=_0x379849;VisuMZ[_0x2e7800(0x271)](_0x1bd64f,_0x1bd64f);const _0x5cc33c=_0x1bd64f[_0x2e7800(0x278)];for(const _0x5a1ba4 of _0x5cc33c){const _0xd560be=$gameTroop[_0x2e7800(0x1ac)]()[_0x5a1ba4];if(!_0xd560be)continue;_0xd560be[_0x2e7800(0x115)]();}}),PluginManager[_0x379849(0x2a2)](pluginData[_0x379849(0x142)],'SystemTurnOrderVisibility',_0x3423fb=>{const _0x28940e=_0x379849;VisuMZ[_0x28940e(0x271)](_0x3423fb,_0x3423fb);const _0x4eecf6=_0x3423fb[_0x28940e(0x218)];$gameSystem[_0x28940e(0x283)](_0x4eecf6);}),VisuMZ[_0x379849(0x18a)][_0x379849(0x14b)]=Scene_Boot[_0x379849(0x2fd)]['onDatabaseLoaded'],Scene_Boot[_0x379849(0x2fd)][_0x379849(0x176)]=function(){const _0x309865=_0x379849;this['process_VisuMZ_BattleSystemCTB_CreateRegExp'](),VisuMZ[_0x309865(0x18a)][_0x309865(0x14b)]['call'](this),this[_0x309865(0x323)]();},VisuMZ[_0x379849(0x18a)][_0x379849(0x140)]={},Scene_Boot['prototype'][_0x379849(0x26f)]=function(){const _0x3954aa=_0x379849,_0x3a4c91=VisuMZ[_0x3954aa(0x18a)][_0x3954aa(0x140)],_0x49234a=_0x3954aa(0x202),_0x14c792=['Charge',_0x3954aa(0x151),_0x3954aa(0x13b)];for(const _0xba4bf2 of _0x14c792){if(_0x3954aa(0x2aa)===_0x3954aa(0x243))_0x2d9365[_0x3954aa(0x18a)]['Game_System_initialize'][_0x3954aa(0x1c6)](this),this[_0x3954aa(0x2da)]();else{const _0x236700=_0x49234a[_0x3954aa(0x168)](_0xba4bf2[_0x3954aa(0x2a0)]()['trim'](),_0x3954aa(0x12e),_0x3954aa(0x2a6)),_0x28bb64=new RegExp(_0x236700,'i');VisuMZ[_0x3954aa(0x18a)][_0x3954aa(0x140)][_0xba4bf2]=_0x28bb64;}}VisuMZ['BattleSystemCTB']['RegExp'][_0x3954aa(0x15e)]=/<JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>\s*([\s\S]*)\s*<\/JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>/i;},Scene_Boot[_0x379849(0x2fd)][_0x379849(0x323)]=function(){const _0x40c184=_0x379849;if(VisuMZ[_0x40c184(0x242)])return;const _0x5da600=$dataSkills[_0x40c184(0x291)]($dataItems);for(const _0x427509 of _0x5da600){if(!_0x427509)continue;VisuMZ[_0x40c184(0x18a)][_0x40c184(0x1d5)](_0x427509);}},VisuMZ[_0x379849(0x18a)]['ParseSkillNotetags']=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x379849(0x2c4)]=function(_0x5626f4){const _0x1c0d58=_0x379849;VisuMZ[_0x1c0d58(0x18a)][_0x1c0d58(0x2c4)][_0x1c0d58(0x1c6)](this,_0x5626f4),VisuMZ[_0x1c0d58(0x18a)][_0x1c0d58(0x1d5)](_0x5626f4);},VisuMZ['BattleSystemCTB']['ParseItemNotetags']=VisuMZ[_0x379849(0x265)],VisuMZ[_0x379849(0x265)]=function(_0x216c7c){const _0x51ab52=_0x379849;VisuMZ[_0x51ab52(0x18a)][_0x51ab52(0x265)][_0x51ab52(0x1c6)](this,_0x216c7c),VisuMZ[_0x51ab52(0x18a)][_0x51ab52(0x1d5)](_0x216c7c);},VisuMZ[_0x379849(0x18a)]['Parse_Notetags_CreateJS']=function(_0x51f30c){const _0x47e749=_0x379849,_0x590ea2=['Charge',_0x47e749(0x151),'After'];for(const _0x107687 of _0x590ea2){VisuMZ[_0x47e749(0x18a)][_0x47e749(0x1cd)](_0x51f30c,_0x107687);}VisuMZ['BattleSystemCTB'][_0x47e749(0x204)](_0x51f30c,_0x47e749(0x1de));},VisuMZ['BattleSystemCTB']['JS']={},VisuMZ[_0x379849(0x18a)][_0x379849(0x1cd)]=function(_0x16d7d9,_0x272a47){const _0x594b34=_0x379849,_0x1eed8b=_0x16d7d9[_0x594b34(0x1fe)];if(_0x1eed8b[_0x594b34(0x2fc)](VisuMZ[_0x594b34(0x18a)][_0x594b34(0x140)][_0x272a47])){if(_0x594b34(0x1b0)===_0x594b34(0x1db))this[_0x594b34(0x230)](_0x956035-_0x20e4c8);else{const _0x2afe14=String(RegExp['$1']),_0x58f269=_0x594b34(0x129)[_0x594b34(0x168)](_0x2afe14,_0x272a47),_0x21f9c2=VisuMZ[_0x594b34(0x18a)][_0x594b34(0x152)](_0x16d7d9,_0x272a47);VisuMZ[_0x594b34(0x18a)]['JS'][_0x21f9c2]=new Function(_0x58f269);}}},VisuMZ[_0x379849(0x18a)]['createOrderJS']=function(_0x36592d,_0x3c0866){const _0x5a1748=_0x379849,_0x1713b6=_0x36592d[_0x5a1748(0x1fe)];if(_0x1713b6['match'](VisuMZ[_0x5a1748(0x18a)][_0x5a1748(0x140)]['OrderJS'])){const _0x234ee3=String(RegExp['$1']),_0x480c66=_0x5a1748(0x322)[_0x5a1748(0x168)](_0x234ee3,_0x3c0866),_0xee66e4=VisuMZ[_0x5a1748(0x18a)][_0x5a1748(0x152)](_0x36592d,_0x3c0866);VisuMZ[_0x5a1748(0x18a)]['JS'][_0xee66e4]=new Function(_0x480c66);}},VisuMZ['BattleSystemCTB']['createKeyJS']=function(_0x3aea00,_0x1d6114){const _0x54d3eb=_0x379849;if(VisuMZ[_0x54d3eb(0x152)])return VisuMZ[_0x54d3eb(0x152)](_0x3aea00,_0x1d6114);let _0x4c68f8='';if($dataActors['includes'](_0x3aea00))_0x4c68f8='Actor-%1-%2'[_0x54d3eb(0x168)](_0x3aea00['id'],_0x1d6114);if($dataClasses[_0x54d3eb(0x26c)](_0x3aea00))_0x4c68f8=_0x54d3eb(0x22e)[_0x54d3eb(0x168)](_0x3aea00['id'],_0x1d6114);if($dataSkills[_0x54d3eb(0x26c)](_0x3aea00))_0x4c68f8=_0x54d3eb(0x2c6)[_0x54d3eb(0x168)](_0x3aea00['id'],_0x1d6114);if($dataItems[_0x54d3eb(0x26c)](_0x3aea00))_0x4c68f8=_0x54d3eb(0x24f)[_0x54d3eb(0x168)](_0x3aea00['id'],_0x1d6114);if($dataWeapons[_0x54d3eb(0x26c)](_0x3aea00))_0x4c68f8=_0x54d3eb(0x270)[_0x54d3eb(0x168)](_0x3aea00['id'],_0x1d6114);if($dataArmors['includes'](_0x3aea00))_0x4c68f8=_0x54d3eb(0x229)[_0x54d3eb(0x168)](_0x3aea00['id'],_0x1d6114);if($dataEnemies[_0x54d3eb(0x26c)](_0x3aea00))_0x4c68f8=_0x54d3eb(0x1ae)['format'](_0x3aea00['id'],_0x1d6114);if($dataStates[_0x54d3eb(0x26c)](_0x3aea00))_0x4c68f8=_0x54d3eb(0x30d)[_0x54d3eb(0x168)](_0x3aea00['id'],_0x1d6114);return _0x4c68f8;},ImageManager[_0x379849(0x2eb)]=ImageManager[_0x379849(0x2eb)]||0x9,ImageManager[_0x379849(0x1d4)]=ImageManager[_0x379849(0x1d4)]||0x6,VisuMZ[_0x379849(0x18a)]['BattleManager_battleSys']=BattleManager[_0x379849(0x28f)],BattleManager[_0x379849(0x28f)]=function(){const _0x124fd9=_0x379849;if(this[_0x124fd9(0x24e)]())return'CTB';return VisuMZ[_0x124fd9(0x18a)][_0x124fd9(0x1dc)][_0x124fd9(0x1c6)](this);},BattleManager[_0x379849(0x24e)]=function(){const _0xa26201=_0x379849;return $gameSystem['getBattleSystem']()===_0xa26201(0x244);},VisuMZ[_0x379849(0x18a)]['BattleManager_isTpb']=BattleManager[_0x379849(0x332)],BattleManager[_0x379849(0x332)]=function(){const _0x16c7c4=_0x379849;if(this[_0x16c7c4(0x24e)]())return!![];return VisuMZ[_0x16c7c4(0x18a)]['BattleManager_isTpb']['call'](this);},VisuMZ[_0x379849(0x18a)][_0x379849(0x221)]=BattleManager[_0x379849(0x2e1)],BattleManager[_0x379849(0x2e1)]=function(){const _0x2a47d1=_0x379849;if(this[_0x2a47d1(0x24e)]())return![];return VisuMZ[_0x2a47d1(0x18a)]['BattleManager_isActiveTpb'][_0x2a47d1(0x1c6)](this);},VisuMZ[_0x379849(0x18a)][_0x379849(0x143)]=BattleManager[_0x379849(0x173)],BattleManager[_0x379849(0x173)]=function(_0x57775a){const _0x3a8118=_0x379849;this['isCTB']()?_0x3a8118(0x223)!=='omeKN'?this[_0x3a8118(0x1ea)]===_0x3a8118(0x30f)&&(this['_tpbChargeTime']+=this[_0x3a8118(0x154)](),this['_tpbChargeTime']>=0x1&&this[_0x3a8118(0x2f7)]()):this['updateTurnCTB'](_0x57775a):_0x3a8118(0x2d7)!==_0x3a8118(0x1a1)?VisuMZ['BattleSystemCTB']['BattleManager_updateTurn'][_0x3a8118(0x1c6)](this,_0x57775a):(_0x4bf1f0[_0x3a8118(0x1e9)](),_0x7f7d4f[_0x3a8118(0x20f)]()&&this['startAction'](),_0x4684d0[_0x3a8118(0x290)]());},BattleManager[_0x379849(0x2cc)]=function(_0x52964b){const _0x181f57=_0x379849;return VisuMZ['BattleSystemCTB'][_0x181f57(0x143)][_0x181f57(0x1c6)](this,_0x52964b);},VisuMZ[_0x379849(0x18a)][_0x379849(0x189)]=BattleManager[_0x379849(0x31a)],BattleManager[_0x379849(0x31a)]=function(){const _0x11b0fc=_0x379849;if(this['isCTB']()){if(_0x11b0fc(0x22b)===_0x11b0fc(0x22b))this[_0x11b0fc(0x121)]();else return _0x1415e1[_0x11b0fc(0x24e)]()?_0xc7c4fd[_0x11b0fc(0x18a)][_0x11b0fc(0x124)][_0x11b0fc(0x113)]['BattlerRelativeSpeedJS']['call'](this,this):_0x592631[_0x11b0fc(0x18a)]['Game_Battler_tpbRelativeSpeed']['call'](this);}else VisuMZ[_0x11b0fc(0x18a)][_0x11b0fc(0x189)]['call'](this);},BattleManager[_0x379849(0x121)]=function(){const _0x2691d7=_0x379849,_0x4a429a=this[_0x2691d7(0x254)],_0x5dd56b=_0x4a429a[_0x2691d7(0x21e)]();_0x5dd56b?(_0x5dd56b['prepare'](),_0x5dd56b['isValid']()&&this[_0x2691d7(0x21c)](),_0x4a429a[_0x2691d7(0x290)]()):(_0x4a429a['setCtbAfterSpeed'](0x0),this[_0x2691d7(0x177)](),this[_0x2691d7(0x254)]=null);},BattleManager['isAnyBattlerReadyCTB']=function(){const _0x1648e8=_0x379849;if(this[_0x1648e8(0x254)])return!![];if(this[_0x1648e8(0x2a3)]!==_0x1648e8(0x16a))return!![];if(this[_0x1648e8(0x266)])return![];const _0x4163bf=this[_0x1648e8(0x1d0)]()[_0x1648e8(0x241)](_0x28d869=>_0x28d869&&_0x28d869['isAppeared']());return _0x4163bf[_0x1648e8(0x32c)](_0x446d46=>_0x446d46[_0x1648e8(0x1b2)]());},Game_Battler[_0x379849(0x2fd)][_0x379849(0x1b2)]=function(){const _0x13160e=_0x379849;if(this[_0x13160e(0x288)]())return!![];if(this[_0x13160e(0x118)]())return!![];if(this[_0x13160e(0x1b8)]())return!![];return![];},BattleManager[_0x379849(0x256)]=function(){const _0x4ac56e=_0x379849;let _0x1ec4f0=VisuMZ[_0x4ac56e(0x18a)]['Settings'][_0x4ac56e(0x113)][_0x4ac56e(0x146)]?0x1e:0xa;this[_0x4ac56e(0x293)]()&&this[_0x4ac56e(0x197)]()?(this[_0x4ac56e(0x1aa)]=this[_0x4ac56e(0x1aa)]||0x0,this[_0x4ac56e(0x1aa)]++,this[_0x4ac56e(0x1aa)]>=_0x1ec4f0&&this['processCtbAntiSoftlock']()):this[_0x4ac56e(0x1aa)]=0x0;},BattleManager[_0x379849(0x197)]=function(){const _0x20d91e=_0x379849;if(this[_0x20d91e(0x254)])return![];if(this['_phase']!==_0x20d91e(0x16a))return![];if(this['isInputting']())return![];return!![];},BattleManager['processCtbAntiSoftlock']=function(){const _0x519e3e=_0x379849;if($gameTemp[_0x519e3e(0x319)]()&&this[_0x519e3e(0x1aa)]>=0x14){if(_0x519e3e(0x22a)===_0x519e3e(0x22a))console[_0x519e3e(0x1f3)](_0x519e3e(0x30a),this[_0x519e3e(0x1aa)]);else{const _0x1fa43f=this[_0x519e3e(0x132)](),_0x2e30fe=this['bitmapHeight'](),_0x67e7a5=_0x5e3643['min'](_0x1fa43f,_0x2e30fe);this[_0x519e3e(0x120)]['bitmap']=new _0x28c3bc(_0x1fa43f,_0x2e30fe);const _0x419d3e=this[_0x519e3e(0x120)]['bitmap'],_0x37fca9=this[_0x519e3e(0x1c4)][_0x519e3e(0x2fc)](/\$/i),_0x284735=_0x37fca9?0x1:_0x2745aa[_0x519e3e(0x2eb)],_0x2de9f5=_0x37fca9?0x1:_0x1cc8c7[_0x519e3e(0x1d4)],_0x8abdb8=_0x25dda7[_0x519e3e(0x28d)]/_0x284735,_0x5e641a=_0x1d5204[_0x519e3e(0x13f)]/_0x2de9f5,_0x57488e=_0x5804a1[_0x519e3e(0x21f)](0x1,_0x67e7a5/_0x8abdb8,_0x67e7a5/_0x5e641a),_0x48b64d=_0x8abdb8*_0x57488e,_0x19d4c3=_0x5e641a*_0x57488e,_0x4337c4=_0x2a656f[_0x519e3e(0x209)]((_0x1fa43f-_0x48b64d)/0x2),_0x3578ce=_0x13a82e['round']((_0x2e30fe-_0x19d4c3)/0x2);_0x419d3e[_0x519e3e(0x1b9)](_0xf8f28,0x0,0x0,_0x8abdb8,_0x5e641a,_0x4337c4,_0x3578ce,_0x48b64d,_0x19d4c3);}}this[_0x519e3e(0x254)]=null,this[_0x519e3e(0x2a3)]=_0x519e3e(0x16a),this['_inputting']=![],this['_debutCTB']=!![];for(const _0x390a07 of this['allBattleMembers']()){if('lDzZS'!==_0x519e3e(0x116))this[_0x519e3e(0x220)]=_0x252eea;else{if(!_0x390a07)continue;if(_0x390a07['isAlive']()){_0x390a07[_0x519e3e(0x198)](_0x519e3e(0x16f)),_0x390a07[_0x519e3e(0x1ea)]=_0x519e3e(0x30f);const _0x2c4b0a=_0x390a07[_0x519e3e(0x2dc)],_0x166eb3=_0x390a07[_0x519e3e(0x220)]||0x0;_0x390a07[_0x519e3e(0x134)](![]),_0x390a07['_tpbTurnCount']=_0x2c4b0a,_0x390a07['_tpbChargeTime']=Math[_0x519e3e(0x21f)](_0x166eb3,0.99),_0x390a07[_0x519e3e(0x225)]();}}}if(this['_anti_CTB_SoftlockCount']===0xb4){if(_0x519e3e(0x1ce)!==_0x519e3e(0x1ce))return _0x9687af[_0x519e3e(0x24e)]()?_0x5d051f['BattleSystemCTB']['Settings'][_0x519e3e(0x113)][_0x519e3e(0x15d)][_0x519e3e(0x1c6)](this,this):_0x547a3c['BattleSystemCTB'][_0x519e3e(0x19b)][_0x519e3e(0x1c6)](this);else $gameParty[_0x519e3e(0x262)](),$gameParty[_0x519e3e(0x262)][_0x519e3e(0x1c6)]($gameTroop);}if(this[_0x519e3e(0x1aa)]===0x12c)for(const _0x1cafce of this[_0x519e3e(0x1d0)]()){if(_0x519e3e(0x25f)===_0x519e3e(0x25f)){if(!_0x1cafce)continue;if(_0x1cafce[_0x519e3e(0x1e3)]())continue;_0x1cafce[_0x519e3e(0x23c)]();}else this[_0x519e3e(0x2f7)]();}this['_anti_CTB_SoftlockCount']>=0x258&&(_0x519e3e(0x272)===_0x519e3e(0x272)?(BattleManager[_0x519e3e(0x1f8)](),$gameTemp['isPlaytest']()&&console['log'](_0x519e3e(0x131))):_0x5a298b[_0x519e3e(0x280)](this[_0x519e3e(0x216)][_0x519e3e(0x13a)](),0x0,_0x27d64c/0x2,_0x5e0f2f,_0x2c655e/0x2,'center'));},VisuMZ[_0x379849(0x18a)][_0x379849(0x128)]=BattleManager[_0x379849(0x308)],BattleManager[_0x379849(0x308)]=function(){const _0x535c28=_0x379849;if(this[_0x535c28(0x24e)]()){if(_0x535c28(0x279)===_0x535c28(0x279))this[_0x535c28(0x277)]();else return _0x334ae3['BattleSystemCTB'][_0x535c28(0x124)]['Mechanics'][_0x535c28(0x15d)]['call'](this,this);}else _0x535c28(0x147)!==_0x535c28(0x2af)?VisuMZ[_0x535c28(0x18a)]['BattleManager_updateAllTpbBattlers']['call'](this):(_0x38e3e8[_0x535c28(0x262)](),_0x4f8c39['removeBattleStates'][_0x535c28(0x1c6)](_0x3c8555));},BattleManager['updateAllTpbBattlersCTB']=function(){const _0x320f49=_0x379849,_0x26b2ed=this['allBattleMembers']();_0x26b2ed[_0x320f49(0x249)]((_0x71ad51,_0x102577)=>{const _0x255d4e=_0x320f49;if(_0x255d4e(0x1cb)!=='ziSId')return _0x71ad51[_0x255d4e(0x263)](0x1)-_0x102577[_0x255d4e(0x263)](0x1);else{const _0x1ee1e1=_0x54a81c[_0x255d4e(0x18a)]['JS'][_0x11b789][_0x255d4e(0x1c6)](this,this[_0x255d4e(0x184)](),_0x21c2bf);_0x2577e4[_0x255d4e(0x1f0)](_0x1ee1e1);}});for(const _0x16c0a7 of _0x26b2ed){this[_0x320f49(0x301)](_0x16c0a7);}},VisuMZ[_0x379849(0x18a)][_0x379849(0x1d7)]=BattleManager['startBattle'],BattleManager['startBattle']=function(){const _0x411f45=_0x379849;VisuMZ[_0x411f45(0x18a)]['BattleManager_startBattle'][_0x411f45(0x1c6)](this),this[_0x411f45(0x237)](!![]);},VisuMZ['BattleSystemCTB'][_0x379849(0x12f)]=BattleManager[_0x379849(0x177)],BattleManager[_0x379849(0x177)]=function(){const _0x4d51e0=_0x379849;this[_0x4d51e0(0x2cd)](),VisuMZ[_0x4d51e0(0x18a)][_0x4d51e0(0x12f)][_0x4d51e0(0x1c6)](this),this[_0x4d51e0(0x205)]();},BattleManager[_0x379849(0x2cd)]=function(){const _0x3e641c=_0x379849;if(!this[_0x3e641c(0x24e)]())return;if(this[_0x3e641c(0x254)]&&this[_0x3e641c(0x254)][_0x3e641c(0x126)]()<=0x0){if(_0x3e641c(0x2bc)!==_0x3e641c(0x321))this[_0x3e641c(0x261)](),this['_subject'][_0x3e641c(0x198)](_0x3e641c(0x16f));else{const _0x2487c1=this['actor']()[_0x3e641c(0x1fe)];if(_0x2487c1[_0x3e641c(0x2fc)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x2487c1[_0x3e641c(0x2fc)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x3e641c(0x10f);}return _0x1552c6['Settings'][_0x3e641c(0x208)];}}},BattleManager[_0x379849(0x205)]=function(){const _0x9d135f=_0x379849;if(!this['isCTB']())return;if(this[_0x9d135f(0x254)]&&$gameTemp[_0x9d135f(0x2f5)]()){this['_subject']['_tpbState']=_0x9d135f(0x20e),this[_0x9d135f(0x254)][_0x9d135f(0x20c)]=_0x9d135f(0x2c1);return;}this[_0x9d135f(0x237)](),this[_0x9d135f(0x254)]&&this[_0x9d135f(0x31a)]();},VisuMZ['BattleSystemCTB'][_0x379849(0x224)]=BattleManager['startActorInput'],BattleManager[_0x379849(0x144)]=function(){const _0x4b34f3=_0x379849;this[_0x4b34f3(0x237)](),VisuMZ['BattleSystemCTB'][_0x4b34f3(0x224)][_0x4b34f3(0x1c6)](this);},BattleManager[_0x379849(0x237)]=function(_0x2f2ad9){const _0x8965a4=_0x379849;if(!this[_0x8965a4(0x24e)]())return;const _0x2fec9a=SceneManager[_0x8965a4(0x161)]['_ctbTurnOrderWindow'];if(!_0x2fec9a)return;_0x2fec9a[_0x8965a4(0x1f6)](_0x2f2ad9);},BattleManager[_0x379849(0x261)]=function(){const _0x4cc2ea=_0x379849;if(!this[_0x4cc2ea(0x24e)]())return;const _0x212b88=SceneManager[_0x4cc2ea(0x161)][_0x4cc2ea(0x1e7)];if(!_0x212b88)return;_0x212b88[_0x4cc2ea(0x2cf)](this[_0x4cc2ea(0x254)]);},BattleManager[_0x379849(0x25e)]=function(){const _0x5e5e48=_0x379849,_0x57faa2=this['allBattleMembers']()[_0x5e5e48(0x207)](_0x4ef2b7=>String([_0x4ef2b7['name'](),'Ticks\x20to\x20Goal:\x20'+_0x4ef2b7[_0x5e5e48(0x263)](0x1)]));console[_0x5e5e48(0x1f3)](_0x57faa2);},VisuMZ[_0x379849(0x18a)]['Game_System_initialize']=Game_System[_0x379849(0x2fd)][_0x379849(0x1a2)],Game_System[_0x379849(0x2fd)][_0x379849(0x1a2)]=function(){const _0x28fb03=_0x379849;VisuMZ[_0x28fb03(0x18a)]['Game_System_initialize'][_0x28fb03(0x1c6)](this),this[_0x28fb03(0x2da)]();},Game_System[_0x379849(0x2fd)][_0x379849(0x2da)]=function(){const _0x226094=_0x379849;this[_0x226094(0x159)]=!![];},Game_System[_0x379849(0x2fd)][_0x379849(0x26d)]=function(){const _0xc7bf95=_0x379849;if(this[_0xc7bf95(0x159)]===undefined){if(_0xc7bf95(0x23a)!=='bfTgg')this['initBattleSystemCTB']();else return _0x8321ed[_0xc7bf95(0x18a)][_0xc7bf95(0x124)][_0xc7bf95(0x113)][_0xc7bf95(0x23d)][_0xc7bf95(0x1c6)](this,this);}return this['_ctbTurnOrderVisible'];},Game_System[_0x379849(0x2fd)][_0x379849(0x283)]=function(_0x3c2bbc){const _0x124841=_0x379849;if(this[_0x124841(0x159)]===undefined){if(_0x124841(0x2fb)===_0x124841(0x1ec)){const _0x135ce7=_0x109fda[_0x124841(0x18a)][_0x124841(0x124)]['Mechanics'];let _0x572766=this['tpbRelativeSpeed']()*_0x5bafd7(_0x135ce7['InitialGaugeJS']);const _0x358bd1=this['traitObjects']()[_0x124841(0x291)](this[_0x124841(0x17e)]()),_0x351ef5=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x223e0d=_0x358bd1[_0x124841(0x207)](_0x3311dd=>_0x3311dd&&_0x3311dd[_0x124841(0x1fe)][_0x124841(0x2fc)](_0x351ef5)?_0x4f2ae0(_0x2a3fcf['$1'])*0.01:0x0);_0x572766=_0x223e0d[_0x124841(0x2ed)]((_0x32b8cf,_0x2cd8d7)=>_0x32b8cf+_0x2cd8d7,_0x572766),this[_0x124841(0x1ea)]='charging',this['_tpbChargeTime']=(_0xfae536?0x1:_0x572766)['clamp'](0x0,0x1),this['isRestricted']()&&(this[_0x124841(0x220)]=0x0);}else this[_0x124841(0x2da)]();}this[_0x124841(0x159)]=_0x3c2bbc;},VisuMZ[_0x379849(0x18a)][_0x379849(0x1a9)]=Game_Action['prototype'][_0x379849(0x15b)],Game_Action[_0x379849(0x2fd)][_0x379849(0x15b)]=function(_0x5ad259){const _0x25842b=_0x379849;VisuMZ[_0x25842b(0x18a)][_0x25842b(0x1a9)][_0x25842b(0x1c6)](this,_0x5ad259),this[_0x25842b(0x2c9)](_0x5ad259);},Game_Action['prototype'][_0x379849(0x2c9)]=function(_0x10997d){const _0x21ea98=_0x379849;if(!SceneManager[_0x21ea98(0x16d)]())return;if(!BattleManager[_0x21ea98(0x24e)]())return;if(this['item']())this[_0x21ea98(0x1f9)](_0x10997d);},Game_Action[_0x379849(0x2fd)][_0x379849(0x1f9)]=function(_0x19088f){const _0x24f7c8=_0x379849,_0x210bf7=this[_0x24f7c8(0x211)]()[_0x24f7c8(0x1fe)];if(_0x19088f[_0x24f7c8(0x136)]()){const _0x4ada91=VisuMZ['BattleSystemCTB'][_0x24f7c8(0x152)](this['item'](),_0x24f7c8(0x1bc));if(VisuMZ['BattleSystemCTB']['JS'][_0x4ada91]){const _0x4988b9=VisuMZ['BattleSystemCTB']['JS'][_0x4ada91][_0x24f7c8(0x1c6)](this,this[_0x24f7c8(0x184)](),_0x19088f);_0x19088f[_0x24f7c8(0x28a)](_0x4988b9);}_0x210bf7[_0x24f7c8(0x2fc)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&('bYQVi'!=='bYQVi'?this[_0x24f7c8(0x2c0)]=_0x194f4f?_0x5c7fe7[_0x24f7c8(0x28d)]-this[_0x24f7c8(0x2c0)]-_0x3f4f99['SpriteThin']:0x0:_0x19088f[_0x24f7c8(0x28a)](Number(RegExp['$1'])*0.01));if(_0x210bf7[_0x24f7c8(0x2fc)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)){if('wsecX'!==_0x24f7c8(0x1c7)){const _0x4349ab=this[_0x24f7c8(0x2f2)]()[_0x24f7c8(0x1fe)];if(_0x4349ab[_0x24f7c8(0x2fc)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x3deab6(_0x211bfb['$2']);return _0x2aa586[_0x24f7c8(0x124)][_0x24f7c8(0x188)];}else _0x19088f['changeCtbChargeTime'](Number(RegExp['$1'])*0.01);}}else{if(_0x19088f[_0x24f7c8(0x156)]()){if('uAKEJ'===_0x24f7c8(0x2a5)){const _0x15e368=VisuMZ[_0x24f7c8(0x18a)]['createKeyJS'](this[_0x24f7c8(0x211)](),'Cast');if(VisuMZ[_0x24f7c8(0x18a)]['JS'][_0x15e368]){if('Bbcja'===_0x24f7c8(0x145)){const _0x3ceb81=this[_0x24f7c8(0x18d)]();if(!_0x3ceb81)return _0x577f06[_0x24f7c8(0x2b3)];const _0x322eab=0x1*(this[_0x24f7c8(0x1a8)]+0x1);return _0x3ceb81['ctbTicksToGoal'](_0x322eab,_0x240939);}else{const _0x3300d8=VisuMZ[_0x24f7c8(0x18a)]['JS'][_0x15e368][_0x24f7c8(0x1c6)](this,this['subject'](),_0x19088f);_0x19088f['setCtbCastTime'](_0x3300d8);}}_0x210bf7[_0x24f7c8(0x2fc)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x19088f[_0x24f7c8(0x1f0)](Number(RegExp['$1'])*0.01);if(_0x210bf7[_0x24f7c8(0x2fc)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)){if(_0x24f7c8(0x238)!==_0x24f7c8(0x130))_0x19088f[_0x24f7c8(0x312)](Number(RegExp['$1'])*0.01);else{const _0xb430ab=this[_0x24f7c8(0x25d)]();if(this[_0x24f7c8(0x292)]===_0xb430ab)return;this[_0x24f7c8(0x292)]=_0xb430ab;const _0x3bddc4=_0x5948de[_0x24f7c8(0x124)],_0x38b477=this[_0x24f7c8(0x18c)](),_0x3bc960=_0x3bddc4[_0x24f7c8(0x1c1)],_0xe2ad9d=_0x3bddc4[_0x24f7c8(0x1f5)],_0x4be9b5=_0x672f95[_0x24f7c8(0x161)]['_ctbTurnOrderWindow'];if(!_0x4be9b5)return;this['_positionDuration']=_0x3bddc4[_0x24f7c8(0x2ff)],this[_0x24f7c8(0x2c0)]=_0x38b477?_0x3bddc4[_0x24f7c8(0x157)]*_0xb430ab:0x0,this[_0x24f7c8(0x155)]=_0x38b477?0x0:_0x3bddc4[_0x24f7c8(0x157)]*_0xb430ab,_0xb430ab>0x0&&(this['_positionTargetX']+=_0x38b477?_0xe2ad9d:0x0,this[_0x24f7c8(0x155)]+=_0x38b477?0x0:_0xe2ad9d),_0x3bc960?this[_0x24f7c8(0x2c0)]=_0x38b477?_0x4be9b5['width']-this[_0x24f7c8(0x2c0)]-_0x3bddc4[_0x24f7c8(0x157)]:0x0:this[_0x24f7c8(0x155)]=_0x38b477?0x0:_0x4be9b5[_0x24f7c8(0x13f)]-this['_positionTargetY']-_0x3bddc4['SpriteThin'];}}}else{const _0x38cfe5=this[_0x24f7c8(0x2f2)]()[_0x24f7c8(0x1fe)];if(_0x38cfe5[_0x24f7c8(0x2fc)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x338c4c(_0x202cf4['$1']);return _0x24f1d5[_0x24f7c8(0x124)]['EnemyBattlerFaceName'];}}}const _0x83c38e=VisuMZ[_0x24f7c8(0x18a)][_0x24f7c8(0x152)](this[_0x24f7c8(0x211)](),_0x24f7c8(0x1de));if(VisuMZ[_0x24f7c8(0x18a)]['JS'][_0x83c38e]){if(_0x24f7c8(0x2db)===_0x24f7c8(0x137)){if(!this[_0x24f7c8(0x180)])return;const _0x4c80be=this['battler']();if(!_0x4c80be)return;if(this['_letter']===_0x4c80be[_0x24f7c8(0x216)]&&this[_0x24f7c8(0x252)]===_0x4c80be[_0x24f7c8(0x252)])return;this[_0x24f7c8(0x216)]=_0x4c80be[_0x24f7c8(0x216)],this[_0x24f7c8(0x252)]=_0x4c80be[_0x24f7c8(0x252)];const _0x50e654=_0x24e0a9[_0x24f7c8(0x124)],_0x4329b6=this[_0x24f7c8(0x18c)](),_0x19678d=this[_0x24f7c8(0x132)](),_0x36af79=this[_0x24f7c8(0x1d6)](),_0x4a8d5d=this[_0x24f7c8(0x180)]['bitmap'];_0x4a8d5d[_0x24f7c8(0x318)]();if(!this['_plural'])return;_0x4a8d5d[_0x24f7c8(0x1f1)]=_0x50e654[_0x24f7c8(0x2e6)]||_0x51b2e5[_0x24f7c8(0x336)](),_0x4a8d5d[_0x24f7c8(0x111)]=_0x50e654[_0x24f7c8(0x1b1)]||0x10,_0x4329b6?_0x4a8d5d[_0x24f7c8(0x280)](this[_0x24f7c8(0x216)][_0x24f7c8(0x13a)](),0x0,_0x36af79/0x2,_0x19678d,_0x36af79/0x2,_0x24f7c8(0x2b5)):_0x4a8d5d[_0x24f7c8(0x280)](this[_0x24f7c8(0x216)][_0x24f7c8(0x13a)](),0x0,0x2,_0x19678d-0x8,_0x36af79-0x4,_0x24f7c8(0x19d));}else{const _0xc45660=VisuMZ[_0x24f7c8(0x18a)]['JS'][_0x83c38e][_0x24f7c8(0x1c6)](this,this['subject'](),_0x19088f);_0x19088f[_0x24f7c8(0x2e3)](_0xc45660);}}_0x210bf7[_0x24f7c8(0x2fc)](/<(?:CTB) (?:SET|MAKE|EXACT) ORDER:[ ](\d+)>/i)&&_0x19088f[_0x24f7c8(0x2e3)](Number(RegExp['$1'])),_0x210bf7[_0x24f7c8(0x2fc)](/<(?:CTB) (?:CHANGE|DELAY|RUSH|SHIFT) ORDER:[ ]([\+\-]\d+)>/i)&&('kEMjS'!==_0x24f7c8(0x1ee)?this[_0x24f7c8(0x309)]=_0x1fb6ef[_0x24f7c8(0x26d)]():_0x19088f[_0x24f7c8(0x10e)](Number(RegExp['$1'])));},VisuMZ[_0x379849(0x18a)]['Game_Action_applyGlobal']=Game_Action[_0x379849(0x2fd)][_0x379849(0x2be)],Game_Action[_0x379849(0x2fd)][_0x379849(0x2be)]=function(){const _0x1c9c60=_0x379849;VisuMZ[_0x1c9c60(0x18a)]['Game_Action_applyGlobal'][_0x1c9c60(0x1c6)](this),this[_0x1c9c60(0x2d2)]();},Game_Action[_0x379849(0x2fd)][_0x379849(0x2d2)]=function(){const _0x3d4c94=_0x379849;if(!this['item']())return;if(!BattleManager['isCTB']())return;const _0x1e91f6=this[_0x3d4c94(0x211)]()[_0x3d4c94(0x1fe)];let _0x203e7b=0x0;this['_forcing']&&(_0x203e7b=this['subject']()[_0x3d4c94(0x220)]);const _0x29648a=VisuMZ['BattleSystemCTB'][_0x3d4c94(0x152)](this['item'](),_0x3d4c94(0x13b));if(VisuMZ['BattleSystemCTB']['JS'][_0x29648a]){if(_0x3d4c94(0x326)===_0x3d4c94(0x1d3)){const _0x50efb6=_0x4d495b['BattleSystemCTB'][_0x3d4c94(0x124)][_0x3d4c94(0x269)],_0x39d1b8=_0x24372f>0x0?_0x3d4c94(0x2ae):'Rush';if(_0x50efb6[_0x3d4c94(0x2d1)[_0x3d4c94(0x168)](_0x39d1b8)]){const _0x375ceb=_0x50efb6[_0x3d4c94(0x2d1)[_0x3d4c94(0x168)](_0x39d1b8)],_0x325da6=_0x50efb6['%1Mirror'[_0x3d4c94(0x168)](_0x39d1b8)],_0xa2902d=_0x50efb6[_0x3d4c94(0x164)['format'](_0x39d1b8)];_0x2c1891[_0x3d4c94(0x1fa)]([this],_0x375ceb,_0x325da6,_0xa2902d);}if(this[_0x3d4c94(0x18d)]()&&_0x50efb6[_0x3d4c94(0x32b)[_0x3d4c94(0x168)](_0x39d1b8)]['length']>0x0){const _0x252129=_0x50efb6['%1PopupText'[_0x3d4c94(0x168)](_0x39d1b8)],_0x3f7e41={'textColor':_0x31f5d8[_0x3d4c94(0x2d6)](_0x50efb6[_0x3d4c94(0x282)[_0x3d4c94(0x168)](_0x39d1b8)]),'flashColor':_0x50efb6['%1FlashColor'[_0x3d4c94(0x168)](_0x39d1b8)],'flashDuration':_0x50efb6[_0x3d4c94(0x13e)[_0x3d4c94(0x168)](_0x39d1b8)]};this['setupTextPopup'](_0x252129,_0x3f7e41);}}else _0x203e7b=VisuMZ['BattleSystemCTB']['JS'][_0x29648a][_0x3d4c94(0x1c6)](this,this[_0x3d4c94(0x184)](),this[_0x3d4c94(0x184)]());}let _0x3ef5d5=this[_0x3d4c94(0x211)]()[_0x3d4c94(0x2ab)]>0x0?this[_0x3d4c94(0x211)]()[_0x3d4c94(0x2ab)]:0x0;if(this[_0x3d4c94(0x1d2)]())_0x3ef5d5+=this['subject']()[_0x3d4c94(0x119)]();_0x203e7b+=(_0x3ef5d5/0xfa0)[_0x3d4c94(0x14d)](0x0,0x1);_0x1e91f6[_0x3d4c94(0x2fc)](/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x203e7b=Number(RegExp['$1'])*0.01);const _0x398cf5=this['subject']()[_0x3d4c94(0x1e0)]()[_0x3d4c94(0x291)](this[_0x3d4c94(0x184)]()[_0x3d4c94(0x17e)]()),_0x316730=/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x3fabb7=_0x398cf5[_0x3d4c94(0x207)](_0x10b303=>_0x10b303&&_0x10b303[_0x3d4c94(0x1fe)]['match'](_0x316730)?Number(RegExp['$1'])*0.01:0x0);_0x203e7b=_0x3fabb7[_0x3d4c94(0x2ed)]((_0x5af210,_0xd2f7ba)=>_0x5af210+_0xd2f7ba,_0x203e7b),this[_0x3d4c94(0x184)]()['setCtbAfterSpeed'](_0x203e7b);},Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x28a)]=function(_0x312498){const _0x371427=_0x379849;this[_0x371427(0x220)]=_0x312498;},Game_BattlerBase['prototype'][_0x379849(0x15f)]=function(_0x46247c){const _0x700677=_0x379849;this['setCtbChargeTime'](this[_0x700677(0x220)]+_0x46247c);},Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x1f0)]=function(_0x48a861){const _0x986196=_0x379849,_0x36afde=this[_0x986196(0x1e5)]();this['_tpbCastTime']=_0x36afde*_0x48a861;},Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x312)]=function(_0xda0e48){const _0x373f33=_0x379849,_0x5d2caf=this[_0x373f33(0x1e5)](),_0x3a6e06=_0x5d2caf*_0xda0e48;this[_0x373f33(0x165)]=this[_0x373f33(0x165)]+_0x3a6e06;},VisuMZ[_0x379849(0x18a)][_0x379849(0x122)]=Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x327)],Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x327)]=function(){const _0x29dfa6=_0x379849;VisuMZ[_0x29dfa6(0x18a)][_0x29dfa6(0x122)]['call'](this),BattleManager[_0x29dfa6(0x237)]();},VisuMZ['BattleSystemCTB']['Game_BattlerBase_hide']=Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x2f6)],Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x2f6)]=function(){const _0x41b66a=_0x379849;VisuMZ[_0x41b66a(0x18a)][_0x41b66a(0x14a)][_0x41b66a(0x1c6)](this),BattleManager[_0x41b66a(0x237)]();},Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x115)]=function(){const _0x2b59bc=_0x379849;delete this[_0x2b59bc(0x1c3)],delete this[_0x2b59bc(0x21a)],delete this[_0x2b59bc(0x2fe)],delete this[_0x2b59bc(0x311)];},Game_BattlerBase[_0x379849(0x2fd)]['TurnOrderCTBGraphicType']=function(){const _0x12e0d4=_0x379849;return this['_ctbTurnOrderGraphicType']===undefined&&(this[_0x12e0d4(0x1c3)]=this['createTurnOrderCTBGraphicType']()),this[_0x12e0d4(0x1c3)];},Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x16c)]=function(){const _0x47ca0b=_0x379849;return Window_CTB_TurnOrder[_0x47ca0b(0x124)]['EnemyBattlerType'];},Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x183)]=function(){const _0x4acab8=_0x379849;return this[_0x4acab8(0x21a)]===undefined&&(this['_ctbTurnOrderFaceName']=this[_0x4acab8(0x29e)]()),this['_ctbTurnOrderFaceName'];},Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x29e)]=function(){const _0x3ed1b3=_0x379849;return Window_CTB_TurnOrder[_0x3ed1b3(0x124)]['EnemyBattlerFaceName'];},Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x213)]=function(){const _0x4b3c50=_0x379849;return this['_ctbTurnOrderFaceIndex']===undefined&&(this[_0x4b3c50(0x2fe)]=this[_0x4b3c50(0x148)]()),this[_0x4b3c50(0x2fe)];},Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x148)]=function(){const _0x2ec9df=_0x379849;return Window_CTB_TurnOrder[_0x2ec9df(0x124)][_0x2ec9df(0x188)];},Game_BattlerBase[_0x379849(0x2fd)]['TurnOrderCTBGraphicIconIndex']=function(){const _0x4e396d=_0x379849;return this['_ctbTurnOrderIconIndex']===undefined&&(this['_ctbTurnOrderIconIndex']=this['createTurnOrderCTBGraphicIconIndex']()),this[_0x4e396d(0x311)];},Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x21d)]=function(){const _0x2e821d=_0x379849;return Window_CTB_TurnOrder[_0x2e821d(0x124)][_0x2e821d(0x233)];},Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x31f)]=function(_0xfea537){const _0x578429=_0x379849;this[_0x578429(0x311)]=_0xfea537;},Game_BattlerBase['prototype']['ctbTicksToGoal']=function(_0x28e194,_0x203024){const _0x1e6a3a=_0x379849;if(this[_0x1e6a3a(0x1e3)]())return Number[_0x1e6a3a(0x2b3)];if(!this[_0x1e6a3a(0x23f)]())return Number['MAX_SAFE_INTEGER'];const _0x2c5e9c=0x1;_0x28e194*=_0x2c5e9c;if(_0x28e194===_0x2c5e9c&&!_0x203024){if(this===BattleManager[_0x1e6a3a(0x254)])return Number[_0x1e6a3a(0x307)]/0xa;if(this===BattleManager['actor']()){if(_0x1e6a3a(0x193)!==_0x1e6a3a(0x320))return Number[_0x1e6a3a(0x307)]/0xa;else{if(this[_0x1e6a3a(0x288)]())return!![];if(this[_0x1e6a3a(0x118)]())return!![];if(this[_0x1e6a3a(0x1b8)]())return!![];return![];}}if(BattleManager[_0x1e6a3a(0x299)]&&BattleManager[_0x1e6a3a(0x299)]['includes'](this)){let _0x2b7aca=Number['MIN_SAFE_INTEGER']/0x1388;return _0x2b7aca+=BattleManager['_actionBattlers']['indexOf'](this)*0x5,_0x2b7aca;}if(this[_0x1e6a3a(0x1ea)]==='casting')return(this[_0x1e6a3a(0x1e5)]()*_0x2c5e9c-this[_0x1e6a3a(0x165)])/this[_0x1e6a3a(0x154)]();}return _0x28e194-=this[_0x1e6a3a(0x2ef)]()*_0x2c5e9c,_0x28e194/=this[_0x1e6a3a(0x154)]()*_0x2c5e9c,_0x28e194||0x0;},Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x2ad)]=function(){const _0x50d05a=_0x379849;if(this[_0x50d05a(0x1ea)]===_0x50d05a(0x30e))return _0x50d05a(0x1c0)!==_0x50d05a(0x1ba)?(this['tpbRequiredCastTime']()-this[_0x50d05a(0x165)])/this[_0x50d05a(0x154)]():this[_0x50d05a(0x23b)]?this[_0x50d05a(0x23b)][_0x50d05a(0x1ac)]()[this[_0x50d05a(0x11c)]]:null;else{if(_0x50d05a(0x18e)===_0x50d05a(0x25b)){const _0x48dab5=_0x1bf731[_0x50d05a(0x1fe)];if(_0x48dab5[_0x50d05a(0x2fc)](_0x484905['BattleSystemCTB']['RegExp'][_0x50d05a(0x15e)])){const _0x1390b5=_0x5f5407(_0x1a457a['$1']),_0x50f081='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x50d05a(0x168)](_0x1390b5,_0x32f80b),_0x464b58=_0x22ea74[_0x50d05a(0x18a)][_0x50d05a(0x152)](_0xd2713e,_0x1e8c1a);_0x1dfaa7[_0x50d05a(0x18a)]['JS'][_0x464b58]=new _0x166762(_0x50f081);}}else return 0x0;}},VisuMZ[_0x379849(0x18a)][_0x379849(0x2ac)]=Game_Battler['prototype'][_0x379849(0x281)],Game_Battler[_0x379849(0x2fd)][_0x379849(0x281)]=function(_0x1bf43e){const _0x15498a=_0x379849;BattleManager[_0x15498a(0x24e)]()?this[_0x15498a(0x2c8)](_0x1bf43e):VisuMZ[_0x15498a(0x18a)][_0x15498a(0x2ac)][_0x15498a(0x1c6)](this,_0x1bf43e);},Game_Battler['prototype'][_0x379849(0x2c8)]=function(_0x35551e){const _0x4d7998=_0x379849,_0xecfee5=VisuMZ['BattleSystemCTB'][_0x4d7998(0x124)][_0x4d7998(0x113)];let _0x3f2292=this['tpbRelativeSpeed']()*eval(_0xecfee5[_0x4d7998(0x11e)]);const _0x53a475=this[_0x4d7998(0x1e0)]()['concat'](this[_0x4d7998(0x17e)]()),_0x2eccb0=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x2f9e77=_0x53a475['map'](_0x3b149a=>_0x3b149a&&_0x3b149a['note']['match'](_0x2eccb0)?Number(RegExp['$1'])*0.01:0x0);_0x3f2292=_0x2f9e77['reduce']((_0x3288fe,_0x29e4c2)=>_0x3288fe+_0x29e4c2,_0x3f2292),this[_0x4d7998(0x1ea)]=_0x4d7998(0x30f),this[_0x4d7998(0x220)]=(_0x35551e?0x1:_0x3f2292)['clamp'](0x0,0x1),this['isRestricted']()&&(this[_0x4d7998(0x220)]=0x0);},Game_Battler[_0x379849(0x2fd)][_0x379849(0x136)]=function(){const _0x2fbd3a=_0x379849;return this[_0x2fbd3a(0x1ea)]==='charging';},Game_Battler[_0x379849(0x2fd)][_0x379849(0x156)]=function(){const _0x50c6e3=_0x379849;return this[_0x50c6e3(0x1ea)]==='casting'&&this['currentAction']()&&this[_0x50c6e3(0x21e)]()[_0x50c6e3(0x211)]()&&this[_0x50c6e3(0x21e)]()[_0x50c6e3(0x211)]()['speed']<0x0;},Game_BattlerBase[_0x379849(0x2fd)][_0x379849(0x166)]=function(){const _0x20d2d8=_0x379849;if(this[_0x20d2d8(0x156)]()){if(_0x20d2d8(0x239)===_0x20d2d8(0x1e2))this[_0x20d2d8(0x2c8)](_0x23307e);else return this['_tpbCastTime']/this[_0x20d2d8(0x1e5)]();}else return 0x0;},Game_Battler[_0x379849(0x2fd)][_0x379849(0x294)]=function(){const _0x2172cc=_0x379849;return!this[_0x2172cc(0x2bd)]();},Game_Battler[_0x379849(0x2fd)][_0x379849(0x11f)]=function(_0x570b5b){const _0xf7af96=_0x379849;this[_0xf7af96(0x31d)]=_0x570b5b;},VisuMZ[_0x379849(0x18a)]['Game_Battler_updateTpbIdleTime']=Game_Battler[_0x379849(0x2fd)][_0x379849(0x324)],Game_Battler['prototype'][_0x379849(0x324)]=function(){const _0x31682c=_0x379849;BattleManager['isCTB']()?this['updateTpbIdleTimeCTB']():VisuMZ[_0x31682c(0x18a)][_0x31682c(0x29b)]['call'](this);},Game_Battler[_0x379849(0x2fd)][_0x379849(0x273)]=function(){const _0x3dd5e2=_0x379849;if(!this['canMove']()){if(_0x3dd5e2(0x12b)!==_0x3dd5e2(0x219))this[_0x3dd5e2(0x17f)]+=this[_0x3dd5e2(0x154)]();else return _0x3cfaff[_0x3dd5e2(0x18a)][_0x3dd5e2(0x1be)][_0x3dd5e2(0x1c6)](this);}},VisuMZ[_0x379849(0x18a)][_0x379849(0x1cc)]=Game_Battler['prototype'][_0x379849(0x231)],Game_Battler[_0x379849(0x2fd)]['onRestrict']=function(){const _0x313976=_0x379849;this[_0x313976(0x295)]=BattleManager[_0x313976(0x24e)](),VisuMZ[_0x313976(0x18a)][_0x313976(0x1cc)][_0x313976(0x1c6)](this),this[_0x313976(0x295)]=undefined;},VisuMZ[_0x379849(0x18a)]['Game_Battler_clearTpbChargeTime']=Game_Battler['prototype'][_0x379849(0x178)],Game_Battler[_0x379849(0x2fd)][_0x379849(0x178)]=function(){const _0x31d573=_0x379849;if(BattleManager[_0x31d573(0x24e)]())this[_0x31d573(0x29c)]();else{if(_0x31d573(0x27d)!==_0x31d573(0x27d)){_0x100073[_0x31d573(0x271)](_0x1e6e32,_0xfce3cf);const _0x23ca1c=_0x12d0c4[_0x31d573(0x218)];_0xf384ac[_0x31d573(0x283)](_0x23ca1c);}else VisuMZ[_0x31d573(0x18a)][_0x31d573(0x268)][_0x31d573(0x1c6)](this);}},Game_Battler[_0x379849(0x2fd)][_0x379849(0x29c)]=function(){const _0x164a03=_0x379849;if(this[_0x164a03(0x295)])return;this[_0x164a03(0x1ea)]=_0x164a03(0x30f),this[_0x164a03(0x220)]-=0x1,this[_0x164a03(0x220)]+=this[_0x164a03(0x31d)]||0x0;},VisuMZ[_0x379849(0x18a)][_0x379849(0x28e)]=Game_Battler[_0x379849(0x2fd)][_0x379849(0x1f4)],Game_Battler[_0x379849(0x2fd)][_0x379849(0x1f4)]=function(){const _0xb5eaa6=_0x379849;if(BattleManager[_0xb5eaa6(0x24e)]()){if(_0xb5eaa6(0x162)==='hlYMp')return _0x3a5b65[_0xb5eaa6(0x27a)]&&_0x1b72e9[_0xb5eaa6(0x13d)]['includes']('['+_0x49d316+']');else this['applyCTBPenalty']();}else VisuMZ[_0xb5eaa6(0x18a)][_0xb5eaa6(0x28e)][_0xb5eaa6(0x1c6)](this);},Game_Battler[_0x379849(0x2fd)][_0x379849(0x335)]=function(){const _0x3baa55=_0x379849;this['_tpbState']='charging',this[_0x3baa55(0x220)]+=VisuMZ['BattleSystemCTB'][_0x3baa55(0x124)]['Mechanics']['EscapeFailPenalty']||0x0;},VisuMZ['BattleSystemCTB'][_0x379849(0x1b7)]=Game_Battler[_0x379849(0x2fd)][_0x379849(0x112)],Game_Battler[_0x379849(0x2fd)][_0x379849(0x112)]=function(){const _0x4e3f52=_0x379849;if(BattleManager[_0x4e3f52(0x24e)]())return VisuMZ['BattleSystemCTB'][_0x4e3f52(0x124)][_0x4e3f52(0x113)][_0x4e3f52(0x23d)][_0x4e3f52(0x1c6)](this,this);else{if(_0x4e3f52(0x26a)!==_0x4e3f52(0x26a))this['x']=this[_0x4e3f52(0x2c0)],this['y']=this[_0x4e3f52(0x155)],this['opacity']<=0x0&&!this[_0x4e3f52(0x1c5)]&&this[_0x4e3f52(0x21b)](0xff);else return VisuMZ[_0x4e3f52(0x18a)][_0x4e3f52(0x1b7)][_0x4e3f52(0x1c6)](this);}},VisuMZ['BattleSystemCTB'][_0x379849(0x19b)]=Game_Battler['prototype'][_0x379849(0x1a3)],Game_Battler[_0x379849(0x2fd)][_0x379849(0x1a3)]=function(){const _0x677bd=_0x379849;return BattleManager['isCTB']()?VisuMZ['BattleSystemCTB'][_0x677bd(0x124)][_0x677bd(0x113)][_0x677bd(0x15d)][_0x677bd(0x1c6)](this,this):VisuMZ[_0x677bd(0x18a)][_0x677bd(0x19b)][_0x677bd(0x1c6)](this);},VisuMZ[_0x379849(0x18a)][_0x379849(0x2d5)]=Game_Battler[_0x379849(0x2fd)][_0x379849(0x182)],Game_Battler['prototype'][_0x379849(0x182)]=function(){const _0xe1cb8e=_0x379849;return BattleManager[_0xe1cb8e(0x24e)]()?VisuMZ[_0xe1cb8e(0x18a)]['Settings'][_0xe1cb8e(0x113)][_0xe1cb8e(0x30c)][_0xe1cb8e(0x1c6)](this,this):VisuMZ['BattleSystemCTB'][_0xe1cb8e(0x2d5)][_0xe1cb8e(0x1c6)](this);},VisuMZ[_0x379849(0x18a)][_0x379849(0x1d8)]=Game_Battler['prototype'][_0x379849(0x154)],Game_Battler[_0x379849(0x2fd)][_0x379849(0x154)]=function(){const _0x311442=_0x379849;if(BattleManager[_0x311442(0x24e)]()){let _0x97a9bf=VisuMZ[_0x311442(0x18a)][_0x311442(0x124)][_0x311442(0x113)][_0x311442(0x212)][_0x311442(0x1c6)](this,this);const _0x498d4e=0x0;return _0x97a9bf+_0x498d4e;}else return VisuMZ[_0x311442(0x18a)][_0x311442(0x1d8)][_0x311442(0x1c6)](this);},VisuMZ['BattleSystemCTB']['Game_Battler_tpbRequiredCastTime']=Game_Battler[_0x379849(0x2fd)][_0x379849(0x1e5)],Game_Battler[_0x379849(0x2fd)][_0x379849(0x1e5)]=function(){const _0x30dd81=_0x379849;if(BattleManager['isCTB']()){if('oEhjP'===_0x30dd81(0x286))return VisuMZ['BattleSystemCTB'][_0x30dd81(0x124)][_0x30dd81(0x113)][_0x30dd81(0x274)]['call'](this,this);else{const _0x113bd9=this['windowRect']();this[_0x30dd81(0x285)]=_0x113bd9['x'],this[_0x30dd81(0x1a4)]=_0x113bd9['y'],_0x28bd62[_0x30dd81(0x2fd)][_0x30dd81(0x1a2)]['call'](this,_0x113bd9),this[_0x30dd81(0x201)](),this[_0x30dd81(0x1f2)](),this[_0x30dd81(0x1af)]=0x0;}}else{if(_0x30dd81(0x172)!==_0x30dd81(0x2d8))return VisuMZ[_0x30dd81(0x18a)][_0x30dd81(0x1be)][_0x30dd81(0x1c6)](this);else _0x31f538[_0x30dd81(0x15f)](_0x5a3f72(_0x476b61['$1'])*0.01);}},Game_Battler[_0x379849(0x2fd)][_0x379849(0x20a)]=function(){const _0x349af8=_0x379849,_0x351e6a=SceneManager[_0x349af8(0x161)][_0x349af8(0x1e7)];if(!_0x351e6a)return-0x1;const _0x4eb379=_0x351e6a[_0x349af8(0x1a0)];if(!_0x4eb379)return-0x1;const _0x3ad3cd=_0x4eb379[_0x349af8(0x2e2)](_0x22e928=>_0x22e928['battler']()===this);return _0x4eb379[_0x349af8(0x150)](_0x3ad3cd);},Game_Battler['prototype'][_0x379849(0x10e)]=function(_0x55caf9){const _0x1b4087=_0x379849;if(!BattleManager[_0x1b4087(0x24e)]())return;if(!SceneManager[_0x1b4087(0x16d)]())return;if(this===BattleManager[_0x1b4087(0x20b)]())return;if(this===BattleManager['_subject'])return;const _0x333c26=this['getCurrentTurnOrderPositionCTB']();if(_0x333c26<0x0)return;this[_0x1b4087(0x2e3)](_0x333c26+_0x55caf9);},Game_Battler[_0x379849(0x2fd)][_0x379849(0x2e3)]=function(_0x4339c4){const _0x11c8f6=_0x379849;if(!BattleManager[_0x11c8f6(0x24e)]())return;if(!SceneManager[_0x11c8f6(0x16d)]())return;if(this===BattleManager[_0x11c8f6(0x20b)]())return;if(this===BattleManager[_0x11c8f6(0x254)])return;_0x4339c4=Math[_0x11c8f6(0x17a)](_0x4339c4,0x1),this[_0x11c8f6(0x1b4)](_0x4339c4);},Game_Battler[_0x379849(0x2fd)]['processTurnOrderChangeCTB']=function(_0x3a147e){const _0xb8cdd5=_0x379849;if(!BattleManager[_0xb8cdd5(0x24e)]())return;if(!SceneManager[_0xb8cdd5(0x16d)]())return;if(this===BattleManager[_0xb8cdd5(0x20b)]())return;if(this===BattleManager[_0xb8cdd5(0x254)])return;const _0x9fd72a=SceneManager['_scene']['_ctbTurnOrderWindow'];if(!_0x9fd72a)return;const _0x473fd9=_0x9fd72a['_turnOrderContainer'];if(!_0x473fd9)return;const _0x354132=this[_0xb8cdd5(0x20a)]();_0x354132!==_0x3a147e&&this[_0xb8cdd5(0x230)](_0x3a147e-_0x354132);let _0x4db30a=_0x3a147e,_0x4a22c4=_0x3a147e;_0x354132>_0x3a147e?_0x4db30a-=0x1:_0x4a22c4+=0x1;const _0xee754f=_0x473fd9[_0x4db30a]['ticksLeft'](!![]),_0x2820a1=_0x473fd9[_0x4a22c4][_0xb8cdd5(0x14e)](!![]),_0x361a03=(_0xee754f+_0x2820a1)/0x2;let _0x127b3c=_0x361a03*this[_0xb8cdd5(0x154)]();if(this[_0xb8cdd5(0x1ea)]==='charging'){if(_0xb8cdd5(0x250)!=='ZSlEw')return _0xa742d7[_0xb8cdd5(0x263)](0x1)-_0x3c57a4[_0xb8cdd5(0x263)](0x1);else this[_0xb8cdd5(0x220)]=0x1-_0x127b3c;}else this['_tpbState']==='casting'&&(this[_0xb8cdd5(0x165)]=this['tpbRequiredCastTime']()-_0x127b3c);BattleManager[_0xb8cdd5(0x299)]=[],BattleManager[_0xb8cdd5(0x237)]();},Game_Battler[_0x379849(0x2fd)]['onCtbOrderChange']=function(_0x4ea5aa){const _0x10b48a=_0x379849,_0x576705=VisuMZ[_0x10b48a(0x18a)][_0x10b48a(0x124)][_0x10b48a(0x269)],_0x46c678=_0x4ea5aa>0x0?_0x10b48a(0x2ae):_0x10b48a(0x2d9);if(_0x576705[_0x10b48a(0x2d1)[_0x10b48a(0x168)](_0x46c678)]){const _0xae0535=_0x576705[_0x10b48a(0x2d1)[_0x10b48a(0x168)](_0x46c678)],_0x31db4f=_0x576705[_0x10b48a(0x127)[_0x10b48a(0x168)](_0x46c678)],_0x521b2c=_0x576705['%1Mute'[_0x10b48a(0x168)](_0x46c678)];$gameTemp[_0x10b48a(0x1fa)]([this],_0xae0535,_0x31db4f,_0x521b2c);}if(this['battler']()&&_0x576705[_0x10b48a(0x32b)[_0x10b48a(0x168)](_0x46c678)][_0x10b48a(0x17b)]>0x0){if(_0x10b48a(0x247)===_0x10b48a(0x2d3))this['x']=this['_positionTargetX'],this['y']=this[_0x10b48a(0x155)];else{const _0xd97a2d=_0x576705['%1PopupText'[_0x10b48a(0x168)](_0x46c678)],_0x1c98a4={'textColor':ColorManager[_0x10b48a(0x2d6)](_0x576705[_0x10b48a(0x282)[_0x10b48a(0x168)](_0x46c678)]),'flashColor':_0x576705[_0x10b48a(0x169)['format'](_0x46c678)],'flashDuration':_0x576705[_0x10b48a(0x13e)[_0x10b48a(0x168)](_0x46c678)]};this[_0x10b48a(0x248)](_0xd97a2d,_0x1c98a4);}}},VisuMZ[_0x379849(0x18a)][_0x379849(0x32e)]=Game_Battler[_0x379849(0x2fd)][_0x379849(0x225)],Game_Battler[_0x379849(0x2fd)]['updateTpb']=function(){const _0x4531aa=_0x379849;if(BattleManager[_0x4531aa(0x2ee)](this))return;VisuMZ['BattleSystemCTB'][_0x4531aa(0x32e)]['call'](this);},BattleManager[_0x379849(0x2ee)]=function(_0x2fddf3){const _0x9a2222=_0x379849;return BattleManager[_0x9a2222(0x1d0)]()[_0x9a2222(0x241)](_0x6145a2=>_0x6145a2!==_0x2fddf3)[_0x9a2222(0x32c)](_0x4fd056=>_0x4fd056[_0x9a2222(0x158)]()&&_0x4fd056[_0x9a2222(0x2bd)]()&&_0x4fd056[_0x9a2222(0x31d)]>=0x1);},VisuMZ['BattleSystemCTB'][_0x379849(0x32a)]=Game_Battler[_0x379849(0x2fd)][_0x379849(0x27c)],Game_Battler['prototype'][_0x379849(0x27c)]=function(){const _0x5eeba4=_0x379849;BattleManager['isCTB']()?_0x5eeba4(0x305)!==_0x5eeba4(0x2ec)?this[_0x5eeba4(0x2f9)]():_0x527db9[_0x5eeba4(0x1f3)](_0x5eeba4(0x131)):VisuMZ[_0x5eeba4(0x18a)][_0x5eeba4(0x32a)][_0x5eeba4(0x1c6)](this);},Game_Battler[_0x379849(0x2fd)][_0x379849(0x2f9)]=function(){const _0x4cf57c=_0x379849;this[_0x4cf57c(0x1ea)]==='charging'&&(_0x4cf57c(0x18b)!==_0x4cf57c(0x18b)?(_0x37a412[_0x4cf57c(0x18a)][_0x4cf57c(0x306)][_0x4cf57c(0x1c6)](this),this[_0x4cf57c(0x2d2)]()):(this[_0x4cf57c(0x220)]+=this[_0x4cf57c(0x154)](),this[_0x4cf57c(0x220)]>=0x1&&this['onTpbCharged']()));},VisuMZ['BattleSystemCTB']['Game_Battler_updateTpbCastTime']=Game_Battler['prototype']['updateTpbCastTime'],Game_Battler[_0x379849(0x2fd)]['updateTpbCastTime']=function(){const _0x1cae79=_0x379849;BattleManager[_0x1cae79(0x24e)]()?this[_0x1cae79(0x314)]():VisuMZ[_0x1cae79(0x18a)]['Game_Battler_updateTpbCastTime'][_0x1cae79(0x1c6)](this);},Game_Battler[_0x379849(0x2fd)][_0x379849(0x314)]=function(){const _0x376e4f=_0x379849;if(this['_tpbState']===_0x376e4f(0x30e)){this[_0x376e4f(0x165)]+=this[_0x376e4f(0x154)]();if(this[_0x376e4f(0x165)]>=this[_0x376e4f(0x1e5)]()){if(_0x376e4f(0x235)===_0x376e4f(0x235))this['_tpbState']=_0x376e4f(0x20e);else{const _0x35a35d=this[_0x376e4f(0x32d)];this['x']=(this['x']*(_0x35a35d-0x1)+this[_0x376e4f(0x2c0)])/_0x35a35d,this['y']=(this['y']*(_0x35a35d-0x1)+this[_0x376e4f(0x155)])/_0x35a35d,this[_0x376e4f(0x32d)]--;}}}},Game_Actor[_0x379849(0x2fd)][_0x379849(0x16c)]=function(){const _0x214e9a=_0x379849,_0x52969f=this[_0x214e9a(0x20b)]()[_0x214e9a(0x1fe)];if(_0x52969f['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x52969f[_0x214e9a(0x2fc)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x214e9a(0x10f);}return Window_CTB_TurnOrder['Settings'][_0x214e9a(0x208)];},Game_Actor[_0x379849(0x2fd)]['TurnOrderCTBGraphicFaceName']=function(){const _0x20a0cd=_0x379849,_0x55f79b=this['actor']()[_0x20a0cd(0x1fe)];if(_0x55f79b[_0x20a0cd(0x2fc)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x20a0cd(0x12a)]();},Game_Actor['prototype'][_0x379849(0x213)]=function(){const _0x1baf5f=_0x379849,_0x48a6ab=this[_0x1baf5f(0x20b)]()[_0x1baf5f(0x1fe)];if(_0x48a6ab[_0x1baf5f(0x2fc)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if('fRCvp'!==_0x1baf5f(0x257))return Number(RegExp['$2']);else{const _0x5aa86b=this[_0x1baf5f(0x2f2)]()[_0x1baf5f(0x1fe)];if(_0x5aa86b[_0x1baf5f(0x2fc)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0xab05d9(_0x5ceb7a['$1']);return _0x363dfb[_0x1baf5f(0x124)][_0x1baf5f(0x233)];}}return this[_0x1baf5f(0x17c)]();},Game_Actor['prototype'][_0x379849(0x21d)]=function(){const _0x482b4d=_0x379849,_0x11c781=this[_0x482b4d(0x20b)]()['note'];if(_0x11c781['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder[_0x482b4d(0x124)][_0x482b4d(0x275)];},Game_Enemy[_0x379849(0x2fd)][_0x379849(0x16c)]=function(){const _0x1c3757=_0x379849,_0x56af33=this['enemy']()[_0x1c3757(0x1fe)];if(_0x56af33[_0x1c3757(0x2fc)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x1c3757(0x2a9)!==_0x1c3757(0x2a9))_0xd18189[_0x1c3757(0x11f)](0x0),this[_0x1c3757(0x177)](),this[_0x1c3757(0x254)]=null;else return _0x1c3757(0x1f7);}else{if(_0x56af33[_0x1c3757(0x2fc)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x1c3757(0x10f);}return Window_CTB_TurnOrder[_0x1c3757(0x124)][_0x1c3757(0x20d)];},Game_Enemy[_0x379849(0x2fd)]['createTurnOrderCTBGraphicFaceName']=function(){const _0x2bb1a2=_0x379849,_0x2f3c20=this[_0x2bb1a2(0x2f2)]()['note'];if(_0x2f3c20[_0x2bb1a2(0x2fc)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_CTB_TurnOrder[_0x2bb1a2(0x124)][_0x2bb1a2(0x138)];},Game_Enemy['prototype']['createTurnOrderCTBGraphicFaceIndex']=function(){const _0xbd5623=_0x379849,_0x52d27b=this[_0xbd5623(0x2f2)]()[_0xbd5623(0x1fe)];if(_0x52d27b['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_CTB_TurnOrder['Settings']['EnemyBattlerFaceIndex'];},Game_Enemy[_0x379849(0x2fd)][_0x379849(0x21d)]=function(){const _0x5aa1e4=_0x379849,_0x395721=this[_0x5aa1e4(0x2f2)]()[_0x5aa1e4(0x1fe)];if(_0x395721[_0x5aa1e4(0x2fc)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder[_0x5aa1e4(0x124)]['EnemyBattlerIcon'];},VisuMZ[_0x379849(0x18a)][_0x379849(0x25c)]=Scene_Battle[_0x379849(0x2fd)][_0x379849(0x1ab)],Scene_Battle[_0x379849(0x2fd)][_0x379849(0x1ab)]=function(){const _0x2e983c=_0x379849;VisuMZ[_0x2e983c(0x18a)]['Scene_Battle_createAllWindows'][_0x2e983c(0x1c6)](this),this['createCTBTurnOrderWindow']();},Scene_Battle[_0x379849(0x2fd)][_0x379849(0x190)]=function(){const _0x388099=_0x379849;if(!BattleManager[_0x388099(0x24e)]())return;this['_ctbTurnOrderWindow']=new Window_CTB_TurnOrder();const _0x417a91=this[_0x388099(0x317)](this[_0x388099(0x2a1)]);this['addChildAt'](this[_0x388099(0x1e7)],_0x417a91),this[_0x388099(0x2b8)](),BattleManager[_0x388099(0x237)](!![]);},Scene_Battle[_0x379849(0x2fd)][_0x379849(0x2b8)]=function(){const _0x2577a3=_0x379849,_0x4aebaa=Window_CTB_TurnOrder[_0x2577a3(0x124)];if(_0x4aebaa[_0x2577a3(0x264)]!==_0x2577a3(0x195))return;if(!_0x4aebaa[_0x2577a3(0x31e)])return;if(!this['_logWindow'])return;const _0x14245d=this[_0x2577a3(0x1e7)]['y']-Math[_0x2577a3(0x209)]((Graphics[_0x2577a3(0x13f)]-Graphics['boxHeight'])/0x2),_0x37227c=_0x14245d+this[_0x2577a3(0x1e7)][_0x2577a3(0x13f)];this[_0x2577a3(0x2f8)]['y']=_0x37227c+_0x4aebaa[_0x2577a3(0x2b7)];};function _0x597d(){const _0x5dc1db=['uFVIs','updateTurn','battleEnd','1344187UcfzMk','onDatabaseLoaded','endAction','clearTpbChargeTime','floor','max','length','faceIndex','createChildren','skills','_tpbIdleTime','_letterSprite','#000000','tpbRelativeSpeed','TurnOrderCTBGraphicFaceName','subject','RepositionTopHelpY','loadSystem','QSMKc','EnemyBattlerFaceIndex','BattleManager_processTurn','BattleSystemCTB','pOCfH','isHorz','battler','NSkXs','bind','createCTBTurnOrderWindow','zxLHN','windowRect','jiCGd','TotalHorzSprites','top','createLetterSprite','otherCtbChecksPassed','setActionState','_isAlive','ceil','Game_Battler_tpbBaseSpeed','maxBattleMembers','right','Actors','drSjD','_turnOrderContainer','STIGs','initialize','tpbBaseSpeed','_homeY','exit','350733eAmpzV','8658EoZOJf','_dupe','Game_Action_applyItemUserEffect','_anti_CTB_SoftlockCount','createAllWindows','members','loadSvActor','Enemy-%1-%2','opacity','psqyT','EnemyBattlerFontSize','isPassCTB','gradientFillRect','processTurnOrderChangeCTB','IconSet','setBlendColor','Game_Battler_tpbSpeed','isActing','blt','MEqmp','initMembers','Charge','battlerHue','Game_Battler_tpbRequiredCastTime','TurnOrderCTBGraphicIconIndex','IVvZd','OrderDirection','return\x200','_ctbTurnOrderGraphicType','_graphicSv','_isBattleOver','call','wsecX','constructor','updateLetter','102xsQvaw','xgwBl','Game_Battler_onRestrict','createRateJS','pybaw','168yZjxBV','allBattleMembers','changeSvActorGraphicBitmap','isAttack','obDcb','svActorVertCells','Parse_Notetags_CreateJS','bitmapHeight','BattleManager_startBattle','Game_Battler_tpbAcceleration','_graphicFaceIndex','mCFxc','OvDTb','BattleManager_battleSys','updateGraphic','Order','placeGauge','traitObjects','CtbTurnOrderClearEnemyGraphic','OkFVL','isDead','484fQcuoC','tpbRequiredCastTime','updatePosition','_ctbTurnOrderWindow','ljwhV','prepare','_tpbState','iconHeight','FicWc','checkOpacity','kEMjS','20HceNtT','setCtbCastTime','fontFace','updateVisibility','log','applyTpbPenalty','SubjectDistance','updateTurnOrder','face','processAbort','applyItemBattleSystemCTBUserEffect','requestFauxAnimation','isSideView','FaceIndex','FaceName','note','version','time','createBattlerSprites','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','createOrderJS','postEndActionCTB','processUpdateGraphic','map','ActorBattlerType','round','getCurrentTurnOrderPositionCTB','actor','_actionState','EnemyBattlerType','ready','isValid','ZJnOx','item','TpbAccelerationJS','TurnOrderCTBGraphicFaceIndex','HREXA','battlerName','_letter','iconWidth','Visible','PGchD','_ctbTurnOrderFaceName','startFade','startAction','createTurnOrderCTBGraphicIconIndex','currentAction','min','_tpbChargeTime','BattleManager_isActiveTpb','SpriteLength','omeKN','BattleManager_startActorInput','updateTpb','fillRect','VisuMZ_1_BattleCore','uaDai','Armor-%1-%2','ntmOw','ImIGV','UYJnI','updateGraphicHue','Class-%1-%2','padding','onCtbOrderChange','onRestrict','11530WRuQaB','EnemyBattlerIcon','_graphicHue','hVNsu','aHOxB','updateTurnOrderCTB','HjvkZ','PSRji','yhmdd','_unit','clearStates','TpbSpeedCalcJS','3124UNVaVZ','isAppeared','update','filter','ParseAllNotetags','YpuHt','CTB','setText','_helpWindow','qMBvY','setupTextPopup','sort','wLCry','qYOXz','updateSelectionEffect','4272045czAcXu','isCTB','Item-%1-%2','ZSlEw','faceWidth','_plural','_blendColor','_subject','loadFace','checkCtbAntiSoftlock','StcMV','ARRAYSTR','JSON','277620qSHnBk','NVvya','Scene_Battle_createAllWindows','containerPosition','logCtbData','zzLOq','ocJFe','rotateCTBSprites','removeBattleStates','ctbTicksToGoal','DisplayPosition','ParseItemNotetags','_autoBattle','_graphicEnemy','Game_Battler_clearTpbChargeTime','Effect','MHmLT','CtbTurnOrderActorFace','includes','isBattleSystemCTBTurnOrderVisible','updateBattleContainerOrder','process_VisuMZ_BattleSystemCTB_CreateRegExp','Weapon-%1-%2','ConvertParams','YPQzn','updateTpbIdleTimeCTB','TpbCastTimeJS','ActorBattlerIcon','isEnemy','updateAllTpbBattlersCTB','Enemies','moPCr','status','STRUCT','updateTpbChargeTime','bqPPv','RepositionTopHelpX','EVAL','drawText','initTpbChargeTime','%1TextColor','setBattleSystemCTBTurnOrderVisible','WHbjQ','_homeX','oEhjP','NUM','isTpbCharged','%1\x20%2\x20%3','setCtbChargeTime','ARRAYJSON','CQkNG','width','Game_Battler_applyTpbPenalty','battleSys','removeCurrentAction','concat','_position','isAnyBattlerReadyCTB','ctbStopped','_onRestrictBypassCtbReset','bottom','_backgroundSprite','%1SystemBg','_actionBattlers','BorderThickness','Game_Battler_updateTpbIdleTime','clearTpbChargeTimeCTB','YGDUh','createTurnOrderCTBGraphicFaceName','%1BorderColor','toUpperCase','_windowLayer','registerCommand','_phase','anchor','uAKEJ','(?:GAUGE|TIME|SPEED)','createTestBitmap','ARRAYNUM','AYLAv','sINVj','speed','Game_Battler_initTpbChargeTime','ctbTicksToGoalAddedCastTime','Delay','xDXIi','clearRect','left','parse','MAX_SAFE_INTEGER','bitmap','center','TKWDp','ScreenBuffer','repositionLogWindowCTB','RepositionTopForHelp','_ogWindowLayerX','rZXSP','phAbS','canMove','applyGlobal','%1SystemBorder','_positionTargetX','acting','_graphicFaceName','changeEnemyGraphicBitmap','ParseSkillNotetags','create','Skill-%1-%2','loadSvEnemy','initTpbChargeTimeCTB','applyBattleSystemCTBUserEffect','yrgvQ','createInitialPositions','updateTurnCTB','preEndActionCTB','tETgf','rotateCTBSprite','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','%1AnimationID','applyGlobalBattleSystemCTBEffects','SHnQA','_turnOrderInnerSprite','Game_Battler_tpbRelativeSpeed','getColor','sUbvk','Cffqt','Rush','initBattleSystemCTB','dTIEd','_tpbTurnCount','defaultPosition','_graphicIconIndex','VisuMZ_0_CoreEngine','qPHtn','isActiveTpb','find','setTurnOrderCTB','changeFaceGraphicBitmap','Enemy','EnemyBattlerFontFace','elEHG','checkPosition','DisplayOffsetX','KVbuV','svActorHorzCells','FHZSn','reduce','ctbHasInstantActionAfter','tpbChargeTime','12ArsopI','QjftZ','enemy','TurnOrder','TurnOrderCTBGraphicType','isCommonEventReserved','hide','onTpbCharged','_logWindow','updateTpbChargeTimeCTB','hasSvBattler','VwfBz','match','prototype','_ctbTurnOrderFaceIndex','UpdateFrames','ByAIx','updateTpbBattler','xWizw','Window_StatusBase_placeGauge','containerWindow','FShsW','Game_Action_applyGlobal','MIN_SAFE_INTEGER','updateAllTpbBattlers','visible','Anti-CTB\x20Softlock\x20Count:','addInnerChild','BattlerRelativeSpeedJS','State-%1-%2','casting','charging','SLirF','_ctbTurnOrderIconIndex','changeCtbCastTime','mainSprite','updateTpbCastTimeCTB','createGraphicSprite','ARRAYEVAL','getChildIndex','clear','isPlaytest','processTurn','MzkgV','wqqFl','_ctbAfterSpeed','RepositionLogWindow','setCTBGraphicIconIndex','xROBg','KbKwf','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','process_VisuMZ_BattleSystemCTB_JS_Notetags','updateTpbIdleTime','ARRAYSTRUCT','VdTzz','appear','CtbTurnOrderEnemyFace','CtbTurnOrderClearActorGraphic','Game_Battler_updateTpbChargeTime','%1PopupText','some','_positionDuration','Game_Battler_updateTpb','addLoadListener','Window_Help_setItem','rrhLi','isTpb','_graphicType','ARRAYFUNC','applyCTBPenalty','mainFontFace','children','changeTurnOrderByCTB','icon','Actor','fontSize','tpbSpeed','Mechanics','_fadeDuration','clearTurnOrderCTBGraphics','lDzZS','createBackgroundSprite','isTpbReady','attackSpeed','hNAMt','svactor','_index','%1BgColor2','InitialGaugeJS','setCtbAfterSpeed','_graphicSprite','processTurnCTB','Game_BattlerBase_appear','compareBattlerSprites','Settings','551GsKWGS','numActions','%1Mirror','BattleManager_updateAllTpbBattlers','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','faceName','DMFac','setItem','IconIndex','(?:CTB)','BattleManager_endAction','WvPOR','Aborting\x20Battle.\x20Softlock\x20cannot\x20be\x20fixed.','bitmapWidth','%1BgColor1','onBattleStart','CtbTurnOrderEnemyIcon','isCtbChargingState','gkRjH','EnemyBattlerFaceName','addChild','trim','After','_statusWindow','description','%1FlashDuration','height','RegExp','updateOpacity','name','BattleManager_updateTurn','startActorInput','lhtvz','DeviceFriendly','QlEJL','createTurnOrderCTBGraphicFaceIndex','updatePadding','Game_BattlerBase_hide','Scene_Boot_onDatabaseLoaded','_ogWindowLayerY','clamp','ticksLeft','faceHeight','indexOf','Cast','createKeyJS','vwain','tpbAcceleration','_positionTargetY','isCtbCastingState','SpriteThin','isAlive','_ctbTurnOrderVisible','changeIconGraphicBitmap','applyItemUserEffect','JXLrT','TpbBaseSpeedCalcJS','OrderJS','changeCtbChargeTime','svBattlerName','_scene','LjhHi','_isAppeared','%1Mute','_tpbCastTime','getCtbCastTimeRate','_fadeTarget','format','%1FlashColor','turn','isActor','createTurnOrderCTBGraphicType','isSceneBattle','ShowMarkerBorder','undecided','cTGjh','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'];_0x597d=function(){return _0x5dc1db;};return _0x597d();}function Sprite_CTB_TurnOrder_Battler(){this['initialize'](...arguments);}Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)]=Object[_0x379849(0x2c5)](Sprite_Clickable['prototype']),Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x1c8)]=Sprite_CTB_TurnOrder_Battler,Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x1a2)]=function(_0x13793d,_0x403e26,_0x3698ab){const _0x4d6221=_0x379849;this[_0x4d6221(0x1bb)](_0x13793d,_0x403e26,_0x3698ab),Sprite_Clickable['prototype']['initialize'][_0x4d6221(0x1c6)](this),this[_0x4d6221(0x17d)]();},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x1bb)]=function(_0xcbb792,_0x1261f1,_0x4862e9){const _0x41d9da=_0x379849;this['_unit']=_0xcbb792,this['_index']=_0x1261f1,this[_0x41d9da(0x1a8)]=_0x4862e9;const _0x5341ae=Window_CTB_TurnOrder[_0x41d9da(0x124)],_0x4501e2=this[_0x41d9da(0x18c)](),_0x2b9270=this[_0x41d9da(0x2dd)]();this[_0x41d9da(0x32d)]=0x0,this[_0x41d9da(0x2c0)]=_0x4501e2?_0x5341ae[_0x41d9da(0x157)]*_0x2b9270:0x0,this[_0x41d9da(0x155)]=_0x4501e2?0x0:_0x5341ae['SpriteThin']*_0x2b9270,this[_0x41d9da(0x114)]=0x0,this[_0x41d9da(0x167)]=0xff,this[_0x41d9da(0x199)]=!![],this[_0x41d9da(0x163)]=!![];},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)]['createChildren']=function(){const _0x579422=_0x379849;this[_0x579422(0x2cb)](),this[_0x579422(0x117)](),this['createGraphicSprite'](),this['createBorderSprite'](),this[_0x579422(0x196)]();},Sprite_CTB_TurnOrder_Battler['prototype'][_0x379849(0x2cb)]=function(){const _0x58cad6=_0x379849;this['x']=this[_0x58cad6(0x2c0)],this['y']=this['_positionTargetY'];},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x18c)]=function(){const _0x56a505=_0x379849,_0x238a59=Window_CTB_TurnOrder[_0x56a505(0x124)],_0x38a3e2=[_0x56a505(0x195),_0x56a505(0x296)][_0x56a505(0x26c)](_0x238a59[_0x56a505(0x264)]);return _0x38a3e2;},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x132)]=function(){const _0x4c44ce=_0x379849,_0xbbbfe2=Window_CTB_TurnOrder[_0x4c44ce(0x124)];return this['isHorz']()?_0xbbbfe2['SpriteThin']:_0xbbbfe2[_0x4c44ce(0x222)];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x379849(0x1d6)]=function(){const _0x2fa3aa=_0x379849,_0x4d0127=Window_CTB_TurnOrder['Settings'];return this[_0x2fa3aa(0x18c)]()?_0x4d0127[_0x2fa3aa(0x222)]:_0x4d0127[_0x2fa3aa(0x157)];},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x2a7)]=function(){const _0x3b6356=_0x379849;this[_0x3b6356(0x2b4)]=new Bitmap(0x48,0x24);const _0x399c42=this[_0x3b6356(0x18d)]()?this[_0x3b6356(0x18d)]()['name']():_0x3b6356(0x289)[_0x3b6356(0x168)](this[_0x3b6356(0x23b)],this['_index'],this[_0x3b6356(0x1a8)]);this[_0x3b6356(0x2b4)][_0x3b6356(0x280)](_0x399c42,0x0,0x0,0x48,0x24,'center');},Sprite_CTB_TurnOrder_Battler['prototype']['createBackgroundSprite']=function(){const _0x4cc27d=_0x379849;if(!Window_CTB_TurnOrder['Settings']['ShowMarkerBg'])return;const _0x4c4f51=Window_CTB_TurnOrder[_0x4cc27d(0x124)],_0x325f47=this[_0x4cc27d(0x23b)]===$gameParty?_0x4cc27d(0x110):_0x4cc27d(0x2e5),_0x248115=_0x4cc27d(0x298)[_0x4cc27d(0x168)](_0x325f47),_0x15ca79=new Sprite();_0x15ca79['anchor']['x']=this[_0x4cc27d(0x2a4)]['x'],_0x15ca79[_0x4cc27d(0x2a4)]['y']=this[_0x4cc27d(0x2a4)]['y'];if(_0x4c4f51[_0x248115])_0x15ca79[_0x4cc27d(0x2b4)]=ImageManager['loadSystem'](_0x4c4f51[_0x248115]);else{if(_0x4cc27d(0x2ce)==='DJZeb'){const _0x398a18=new _0x211e7c();_0x398a18[_0x4cc27d(0x2a4)]['x']=this[_0x4cc27d(0x2a4)]['x'],_0x398a18['anchor']['y']=this[_0x4cc27d(0x2a4)]['y'],this[_0x4cc27d(0x120)]=_0x398a18,this[_0x4cc27d(0x139)](this[_0x4cc27d(0x120)]),this['processUpdateGraphic']();}else{const _0x31f6df=this['bitmapWidth'](),_0x5667a4=this[_0x4cc27d(0x1d6)]();_0x15ca79[_0x4cc27d(0x2b4)]=new Bitmap(_0x31f6df,_0x5667a4);const _0x15c476=ColorManager['getColor'](_0x4c4f51[_0x4cc27d(0x133)['format'](_0x325f47)]),_0x34cad8=ColorManager[_0x4cc27d(0x2d6)](_0x4c4f51[_0x4cc27d(0x11d)[_0x4cc27d(0x168)](_0x325f47)]);_0x15ca79['bitmap'][_0x4cc27d(0x1b3)](0x0,0x0,_0x31f6df,_0x5667a4,_0x15c476,_0x34cad8,!![]);}}this[_0x4cc27d(0x297)]=_0x15ca79,this[_0x4cc27d(0x139)](this[_0x4cc27d(0x297)]),this[_0x4cc27d(0x28d)]=this[_0x4cc27d(0x297)]['width'],this['height']=this[_0x4cc27d(0x297)][_0x4cc27d(0x13f)];},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x315)]=function(){const _0x3b3d88=_0x379849,_0x831359=new Sprite();_0x831359[_0x3b3d88(0x2a4)]['x']=this[_0x3b3d88(0x2a4)]['x'],_0x831359[_0x3b3d88(0x2a4)]['y']=this[_0x3b3d88(0x2a4)]['y'],this['_graphicSprite']=_0x831359,this[_0x3b3d88(0x139)](this[_0x3b3d88(0x120)]),this['processUpdateGraphic']();},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)]['createBorderSprite']=function(){const _0x5107e2=_0x379849;if(!Window_CTB_TurnOrder[_0x5107e2(0x124)][_0x5107e2(0x16e)])return;const _0x111180=Window_CTB_TurnOrder[_0x5107e2(0x124)],_0x1440fd=this[_0x5107e2(0x23b)]===$gameParty?_0x5107e2(0x110):'Enemy',_0x6eb71=_0x5107e2(0x2bf)[_0x5107e2(0x168)](_0x1440fd),_0xdf7f5a=new Sprite();_0xdf7f5a[_0x5107e2(0x2a4)]['x']=this[_0x5107e2(0x2a4)]['x'],_0xdf7f5a[_0x5107e2(0x2a4)]['y']=this['anchor']['y'];if(_0x111180[_0x6eb71])_0xdf7f5a[_0x5107e2(0x2b4)]=ImageManager[_0x5107e2(0x186)](_0x111180[_0x6eb71]);else{let _0x556884=this[_0x5107e2(0x132)](),_0x92c964=this[_0x5107e2(0x1d6)](),_0x4c3f42=_0x111180[_0x5107e2(0x29a)];_0xdf7f5a['bitmap']=new Bitmap(_0x556884,_0x92c964);const _0x14640b=_0x5107e2(0x181),_0x14c27c=ColorManager['getColor'](_0x111180[_0x5107e2(0x29f)['format'](_0x1440fd)]);_0xdf7f5a[_0x5107e2(0x2b4)]['fillRect'](0x0,0x0,_0x556884,_0x92c964,_0x14640b),_0x556884-=0x2,_0x92c964-=0x2,_0xdf7f5a[_0x5107e2(0x2b4)][_0x5107e2(0x226)](0x1,0x1,_0x556884,_0x92c964,_0x14c27c),_0x556884-=_0x4c3f42*0x2,_0x92c964-=_0x4c3f42*0x2,_0xdf7f5a[_0x5107e2(0x2b4)]['fillRect'](0x1+_0x4c3f42,0x1+_0x4c3f42,_0x556884,_0x92c964,_0x14640b),_0x556884-=0x2,_0x92c964-=0x2,_0x4c3f42+=0x1,_0xdf7f5a[_0x5107e2(0x2b4)]['clearRect'](0x1+_0x4c3f42,0x1+_0x4c3f42,_0x556884,_0x92c964);}this['_backgroundSprite']=_0xdf7f5a,this['addChild'](this[_0x5107e2(0x297)]);},Sprite_CTB_TurnOrder_Battler['prototype']['createLetterSprite']=function(){const _0x3c2bd6=_0x379849,_0x27686c=Window_CTB_TurnOrder[_0x3c2bd6(0x124)];if(!_0x27686c['EnemyBattlerDrawLetter'])return;if(this[_0x3c2bd6(0x23b)]===$gameParty)return;const _0x26a896=this[_0x3c2bd6(0x132)](),_0x54c475=this[_0x3c2bd6(0x1d6)](),_0x1c8544=new Sprite();_0x1c8544[_0x3c2bd6(0x2a4)]['x']=this[_0x3c2bd6(0x2a4)]['x'],_0x1c8544[_0x3c2bd6(0x2a4)]['y']=this[_0x3c2bd6(0x2a4)]['y'],_0x1c8544[_0x3c2bd6(0x2b4)]=new Bitmap(_0x26a896,_0x54c475),this[_0x3c2bd6(0x180)]=_0x1c8544,this[_0x3c2bd6(0x139)](this[_0x3c2bd6(0x180)]);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x379849(0x18d)]=function(){const _0x3c830f=_0x379849;return this['_unit']?this['_unit'][_0x3c830f(0x1ac)]()[this[_0x3c830f(0x11c)]]:null;},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x14e)]=function(_0xb63a4b){const _0x14beee=_0x379849,_0x1680ad=this[_0x14beee(0x18d)]();if(!_0x1680ad)return Number[_0x14beee(0x2b3)];const _0x29044f=0x1*(this[_0x14beee(0x1a8)]+0x1);return _0x1680ad['ctbTicksToGoal'](_0x29044f,_0xb63a4b);},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)]['update']=function(){const _0x2099d7=_0x379849;Sprite_Clickable[_0x2099d7(0x2fd)][_0x2099d7(0x240)][_0x2099d7(0x1c6)](this),this[_0x2099d7(0x2e8)](),this[_0x2099d7(0x1e6)](),this[_0x2099d7(0x1ed)](),this[_0x2099d7(0x141)](),this[_0x2099d7(0x1dd)](),this[_0x2099d7(0x22d)](),this[_0x2099d7(0x1c9)](),this['updateSelectionEffect']();},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x2e8)]=function(){const _0x20b576=_0x379849,_0x2ff2a5=this['containerPosition']();if(this[_0x20b576(0x292)]===_0x2ff2a5)return;this[_0x20b576(0x292)]=_0x2ff2a5;const _0xd5a0e8=Window_CTB_TurnOrder['Settings'],_0x2e76e4=this['isHorz'](),_0xbae203=_0xd5a0e8[_0x20b576(0x1c1)],_0xf7d316=_0xd5a0e8[_0x20b576(0x1f5)],_0x1af582=SceneManager[_0x20b576(0x161)][_0x20b576(0x1e7)];if(!_0x1af582)return;this[_0x20b576(0x32d)]=_0xd5a0e8[_0x20b576(0x2ff)],this[_0x20b576(0x2c0)]=_0x2e76e4?_0xd5a0e8[_0x20b576(0x157)]*_0x2ff2a5:0x0,this['_positionTargetY']=_0x2e76e4?0x0:_0xd5a0e8[_0x20b576(0x157)]*_0x2ff2a5;_0x2ff2a5>0x0&&(_0x20b576(0x310)===_0x20b576(0x310)?(this[_0x20b576(0x2c0)]+=_0x2e76e4?_0xf7d316:0x0,this['_positionTargetY']+=_0x2e76e4?0x0:_0xf7d316):this[_0x20b576(0x335)]());if(_0xbae203)this[_0x20b576(0x2c0)]=_0x2e76e4?_0x1af582['width']-this[_0x20b576(0x2c0)]-_0xd5a0e8['SpriteThin']:0x0;else{if(_0x20b576(0x31c)===_0x20b576(0x19f)){const _0x1bfac7=_0x2b4c07['Settings'],_0x436048=this[_0x20b576(0x132)](),_0x13cc86=this['bitmapHeight'](),_0x237436=_0x39d128[_0x20b576(0x21f)](_0x436048,_0x13cc86);this[_0x20b576(0x120)][_0x20b576(0x2b4)]=new _0x3137f8(_0x436048,_0x13cc86);const _0x3c5f66=this[_0x20b576(0x120)][_0x20b576(0x2b4)],_0x76e486=_0x16e488['min'](0x1,_0x237436/_0xad1e17[_0x20b576(0x28d)],_0x237436/_0xa0d8c5[_0x20b576(0x13f)]),_0x1dad46=_0xe76eb0['width']*_0x76e486,_0x1ffb18=_0x14ea8b[_0x20b576(0x13f)]*_0x76e486,_0x645d52=_0x534cb0[_0x20b576(0x209)]((_0x436048-_0x1dad46)/0x2),_0x431e23=_0x271b1b[_0x20b576(0x209)]((_0x13cc86-_0x1ffb18)/0x2);_0x3c5f66[_0x20b576(0x1b9)](_0x49a521,0x0,0x0,_0x1c4c89[_0x20b576(0x28d)],_0x3900b5['height'],_0x645d52,_0x431e23,_0x1dad46,_0x1ffb18);}else this[_0x20b576(0x155)]=_0x2e76e4?0x0:_0x1af582['height']-this[_0x20b576(0x155)]-_0xd5a0e8['SpriteThin'];}},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x1e6)]=function(){const _0x15f95b=_0x379849;if(this[_0x15f95b(0x114)]>0x0)return;if(this[_0x15f95b(0x32d)]>0x0){const _0x3f3a4e=this['_positionDuration'];this['x']=(this['x']*(_0x3f3a4e-0x1)+this[_0x15f95b(0x2c0)])/_0x3f3a4e,this['y']=(this['y']*(_0x3f3a4e-0x1)+this[_0x15f95b(0x155)])/_0x3f3a4e,this['_positionDuration']--;}if(this[_0x15f95b(0x32d)]<=0x0&&this[_0x15f95b(0x199)]){if(_0x15f95b(0x191)===_0x15f95b(0x191))this['x']=this[_0x15f95b(0x2c0)],this['y']=this[_0x15f95b(0x155)],this[_0x15f95b(0x1af)]<=0x0&&!this[_0x15f95b(0x1c5)]&&(_0x15f95b(0x170)!=='Vvzfl'?this['startFade'](0xff):this['setCtbChargeTime'](this[_0x15f95b(0x220)]+_0x3ca01f));else return this[_0x15f95b(0x206)]();}},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)]['defaultPosition']=function(){const _0x337771=_0x379849;return Window_CTB_TurnOrder['Settings'][_0x337771(0x194)]*0x14;},Sprite_CTB_TurnOrder_Battler['prototype']['containerWindow']=function(){const _0x47562c=_0x379849;return SceneManager[_0x47562c(0x161)][_0x47562c(0x1e7)];},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x25d)]=function(){const _0x5aac7e=_0x379849;if(!this['containerWindow']())return this[_0x5aac7e(0x2dd)]();const _0x55c493=this[_0x5aac7e(0x304)]()['_turnOrderContainer'];return _0x55c493[_0x5aac7e(0x150)](this);},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)]['rotateDupeNumber']=function(){const _0x3920cd=_0x379849,_0xabaaf9=Window_CTB_TurnOrder[_0x3920cd(0x124)],_0x2c9c5b=this['isHorz'](),_0x1c66cb=_0x2c9c5b?_0xabaaf9['TotalHorzSprites']:_0xabaaf9['TotalVertSprites'];this[_0x3920cd(0x1a8)]-=0x1,this[_0x3920cd(0x1a8)]<0x0&&(this[_0x3920cd(0x1a8)]=_0x1c66cb-0x1,this[_0x3920cd(0x21b)](0x0));},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x21b)]=function(_0x12068c){const _0x378edd=_0x379849,_0x5a7836=Window_CTB_TurnOrder[_0x378edd(0x124)];this['_fadeDuration']=_0x5a7836[_0x378edd(0x2ff)],this[_0x378edd(0x167)]=_0x12068c;},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x1ed)]=function(){const _0x38bcbb=_0x379849,_0x2f435f=this[_0x38bcbb(0x18d)]();if(!_0x2f435f)return;if(this[_0x38bcbb(0x199)]===_0x2f435f[_0x38bcbb(0x158)]()&&this[_0x38bcbb(0x163)]===_0x2f435f[_0x38bcbb(0x23f)]())return;this[_0x38bcbb(0x199)]=_0x2f435f[_0x38bcbb(0x158)](),this['_isAppeared']=_0x2f435f[_0x38bcbb(0x23f)]();let _0x42b8dc=this[_0x38bcbb(0x199)]&&this[_0x38bcbb(0x163)]?0xff:0x0;this[_0x38bcbb(0x21b)](_0x42b8dc);},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x141)]=function(){const _0x49ff17=_0x379849;if(this[_0x49ff17(0x114)]>0x0){const _0x403432=this[_0x49ff17(0x114)];this[_0x49ff17(0x1af)]=(this[_0x49ff17(0x1af)]*(_0x403432-0x1)+this[_0x49ff17(0x167)])/_0x403432,this['_fadeDuration']--,this[_0x49ff17(0x114)]<=0x0&&(this[_0x49ff17(0x2e8)](),this[_0x49ff17(0x32d)]=0x0,this['updatePosition'](),this[_0x49ff17(0x1af)]=this[_0x49ff17(0x167)]);}if(this['_isBattleOver'])return;BattleManager[_0x49ff17(0x2a3)]===_0x49ff17(0x174)&&(_0x49ff17(0x28c)!=='CQkNG'?this[_0x49ff17(0x22f)]=0x0:(this['_isBattleOver']=!![],this[_0x49ff17(0x21b)](0x0)));},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x1dd)]=function(){const _0x1d9307=_0x379849,_0x552b3f=this[_0x1d9307(0x18d)]();if(!_0x552b3f)return;const _0x2f5362=Window_CTB_TurnOrder[_0x1d9307(0x124)],_0x3d833f=this['_unit']===$gameParty?_0x1d9307(0x110):'Enemy';let _0x2a3824=_0x552b3f[_0x1d9307(0x2f4)]();if(_0x552b3f[_0x1d9307(0x16b)]()&&_0x2a3824===_0x1d9307(0x2f2))_0x2a3824=_0x1d9307(0x1f7);else _0x552b3f[_0x1d9307(0x276)]()&&_0x2a3824===_0x1d9307(0x11b)&&(_0x2a3824=_0x1d9307(0x2f2));if(this['_graphicType']!==_0x2a3824){if(_0x1d9307(0x2bb)===_0x1d9307(0x2bb))return this[_0x1d9307(0x206)]();else{if(!this[_0x1d9307(0x24e)]())return;if(this[_0x1d9307(0x254)]&&_0x2293ee['isCommonEventReserved']()){this[_0x1d9307(0x254)]['_tpbState']=_0x1d9307(0x20e),this[_0x1d9307(0x254)][_0x1d9307(0x20c)]=_0x1d9307(0x2c1);return;}this[_0x1d9307(0x237)](),this[_0x1d9307(0x254)]&&this[_0x1d9307(0x31a)]();}}switch(this[_0x1d9307(0x333)]){case _0x1d9307(0x1f7):if(this['_graphicFaceName']!==_0x552b3f['TurnOrderCTBGraphicFaceName']())return this['processUpdateGraphic']();if(this[_0x1d9307(0x1d9)]!==_0x552b3f['TurnOrderCTBGraphicFaceIndex']())return this[_0x1d9307(0x206)]();break;case _0x1d9307(0x10f):if(this['_graphicIconIndex']!==_0x552b3f[_0x1d9307(0x1bf)]()){if('WHbjQ'===_0x1d9307(0x284))return this[_0x1d9307(0x206)]();else this[_0x1d9307(0x24e)]()?this['updateTurnCTB'](_0x2b59ef):_0x36f8f1['BattleSystemCTB']['BattleManager_updateTurn'][_0x1d9307(0x1c6)](this,_0x24b0c5);}break;case _0x1d9307(0x2f2):if(_0x552b3f[_0x1d9307(0x2fa)]()){if(this[_0x1d9307(0x1c4)]!==_0x552b3f[_0x1d9307(0x160)]())return this[_0x1d9307(0x206)]();}else{if(this['_graphicEnemy']!==_0x552b3f[_0x1d9307(0x215)]())return this[_0x1d9307(0x206)]();}break;case _0x1d9307(0x11b):if(_0x552b3f['isActor']()){if('YGDUh'!==_0x1d9307(0x29d)){this[_0x1d9307(0x254)][_0x1d9307(0x1ea)]=_0x1d9307(0x20e),this[_0x1d9307(0x254)][_0x1d9307(0x20c)]=_0x1d9307(0x2c1);return;}else{if(this['_graphicSv']!==_0x552b3f['battlerName']()){if(_0x1d9307(0x24a)===_0x1d9307(0x24a))return this[_0x1d9307(0x206)]();else this[_0x1d9307(0x261)](),this['_subject'][_0x1d9307(0x198)](_0x1d9307(0x16f));}}}else{if(this[_0x1d9307(0x267)]!==_0x552b3f['battlerName']()){if(_0x1d9307(0x331)!==_0x1d9307(0x300))return this['processUpdateGraphic']();else _0x1c8fd7[_0x1d9307(0x24e)]()?this[_0x1d9307(0x2c8)](_0x4da599):_0x5e552c['BattleSystemCTB'][_0x1d9307(0x2ac)][_0x1d9307(0x1c6)](this,_0x4d8d18);}}break;}},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)]['processUpdateGraphic']=function(){const _0x4fe4bb=_0x379849,_0x4293c8=this[_0x4fe4bb(0x18d)]();if(!_0x4293c8)return;this['_graphicType']=_0x4293c8[_0x4fe4bb(0x2f4)]();if(_0x4293c8[_0x4fe4bb(0x16b)]()&&this[_0x4fe4bb(0x333)]===_0x4fe4bb(0x2f2))this['_graphicType']=_0x4fe4bb(0x1f7);else _0x4293c8[_0x4fe4bb(0x276)]()&&this[_0x4fe4bb(0x333)]===_0x4fe4bb(0x11b)&&(this[_0x4fe4bb(0x333)]=_0x4fe4bb(0x2f2));let _0x4f2340;switch(this['_graphicType']){case _0x4fe4bb(0x1f7):this[_0x4fe4bb(0x2c2)]=_0x4293c8[_0x4fe4bb(0x183)](),this[_0x4fe4bb(0x1d9)]=_0x4293c8[_0x4fe4bb(0x213)](),_0x4f2340=ImageManager[_0x4fe4bb(0x255)](this[_0x4fe4bb(0x2c2)]),_0x4f2340[_0x4fe4bb(0x32f)](this[_0x4fe4bb(0x2e4)][_0x4fe4bb(0x18f)](this,_0x4f2340));break;case _0x4fe4bb(0x10f):this[_0x4fe4bb(0x2de)]=_0x4293c8[_0x4fe4bb(0x21d)](),_0x4f2340=ImageManager['loadSystem'](_0x4fe4bb(0x1b5)),_0x4f2340[_0x4fe4bb(0x32f)](this[_0x4fe4bb(0x15a)][_0x4fe4bb(0x18f)](this,_0x4f2340));break;case _0x4fe4bb(0x2f2):if(_0x4293c8['hasSvBattler']()){if(_0x4fe4bb(0x2e0)!==_0x4fe4bb(0x1e8))this[_0x4fe4bb(0x1c4)]=_0x4293c8['svBattlerName'](),_0x4f2340=ImageManager[_0x4fe4bb(0x1ad)](this['_graphicSv']),_0x4f2340[_0x4fe4bb(0x32f)](this[_0x4fe4bb(0x1d1)][_0x4fe4bb(0x18f)](this,_0x4f2340));else{const _0x3e6d4e=this[_0x4fe4bb(0x18d)]();if(!_0x3e6d4e)return;const _0x4c646e=_0x3e6d4e[_0x4fe4bb(0x18d)]();if(!_0x4c646e)return;const _0x36b44a=_0x4c646e[_0x4fe4bb(0x313)]();if(!_0x36b44a)return;this[_0x4fe4bb(0x1b6)](_0x36b44a[_0x4fe4bb(0x253)]);}}else{if($gameSystem[_0x4fe4bb(0x1fb)]()){if('WbcFR'===_0x4fe4bb(0x2b6)){const _0xcfa5b0=_0x5a334e[_0x4fe4bb(0x18a)][_0x4fe4bb(0x152)](this[_0x4fe4bb(0x211)](),_0x4fe4bb(0x151));if(_0x3c6d24[_0x4fe4bb(0x18a)]['JS'][_0xcfa5b0]){const _0xd7da92=_0x214b16['BattleSystemCTB']['JS'][_0xcfa5b0]['call'](this,this['subject'](),_0x1868de);_0x3e1e66[_0x4fe4bb(0x1f0)](_0xd7da92);}_0x377630['match'](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x208557[_0x4fe4bb(0x1f0)](_0x753eb0(_0x43b3d2['$1'])*0.01),_0xf9ea1a[_0x4fe4bb(0x2fc)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x3f0041[_0x4fe4bb(0x312)](_0x26dedc(_0x44aab9['$1'])*0.01);}else this['_graphicEnemy']=_0x4293c8[_0x4fe4bb(0x215)](),_0x4f2340=ImageManager[_0x4fe4bb(0x2c7)](this[_0x4fe4bb(0x267)]),_0x4f2340['addLoadListener'](this[_0x4fe4bb(0x2c3)]['bind'](this,_0x4f2340));}else this[_0x4fe4bb(0x267)]=_0x4293c8[_0x4fe4bb(0x215)](),_0x4f2340=ImageManager['loadEnemy'](this[_0x4fe4bb(0x267)]),_0x4f2340[_0x4fe4bb(0x32f)](this[_0x4fe4bb(0x2c3)][_0x4fe4bb(0x18f)](this,_0x4f2340));}break;case _0x4fe4bb(0x11b):this[_0x4fe4bb(0x1c4)]=_0x4293c8[_0x4fe4bb(0x215)](),_0x4f2340=ImageManager['loadSvActor'](this['_graphicSv']),_0x4f2340[_0x4fe4bb(0x32f)](this[_0x4fe4bb(0x1d1)]['bind'](this,_0x4f2340));break;}},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x2e4)]=function(_0x3c93f1){const _0x249428=_0x379849,_0x458f94=this['_graphicFaceIndex'],_0x2b4901=this[_0x249428(0x132)](),_0x5b37a8=this[_0x249428(0x1d6)](),_0x754912=Math[_0x249428(0x17a)](_0x2b4901,_0x5b37a8);this['_graphicSprite'][_0x249428(0x2b4)]=new Bitmap(_0x2b4901,_0x5b37a8);const _0x1510af=this['_graphicSprite'][_0x249428(0x2b4)],_0x3ced69=ImageManager[_0x249428(0x251)],_0x331e45=ImageManager[_0x249428(0x14f)],_0xac46f6=_0x754912/Math['max'](_0x3ced69,_0x331e45),_0x51d196=ImageManager[_0x249428(0x251)],_0x2b82e6=ImageManager[_0x249428(0x14f)],_0x1a3f1c=_0x458f94%0x4*_0x3ced69+(_0x3ced69-_0x51d196)/0x2,_0x1f7263=Math['floor'](_0x458f94/0x4)*_0x331e45+(_0x331e45-_0x2b82e6)/0x2,_0x29236a=(_0x2b4901-_0x3ced69*_0xac46f6)/0x2,_0x5959be=(_0x5b37a8-_0x331e45*_0xac46f6)/0x2;_0x1510af[_0x249428(0x1b9)](_0x3c93f1,_0x1a3f1c,_0x1f7263,_0x51d196,_0x2b82e6,_0x29236a,_0x5959be,_0x754912,_0x754912);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x379849(0x15a)]=function(_0x40ccd1){const _0x5d4a79=_0x379849,_0x5ca962=this[_0x5d4a79(0x2de)],_0x11b6ac=this['bitmapWidth'](),_0x47ce41=this[_0x5d4a79(0x1d6)]();this[_0x5d4a79(0x120)]['bitmap']=new Bitmap(_0x11b6ac,_0x47ce41);const _0x28b85d=this['_graphicSprite'][_0x5d4a79(0x2b4)],_0xfaa286=ImageManager[_0x5d4a79(0x217)],_0x276f83=ImageManager[_0x5d4a79(0x1eb)],_0x22711c=Math['min'](_0xfaa286,_0x276f83,_0x11b6ac,_0x47ce41),_0x18874d=_0x5ca962%0x10*_0xfaa286,_0x70f9dd=Math[_0x5d4a79(0x179)](_0x5ca962/0x10)*_0x276f83,_0x4cbb5d=Math['floor'](Math['max'](_0x11b6ac-_0x22711c,0x0)/0x2),_0x36a929=Math['floor'](Math[_0x5d4a79(0x17a)](_0x47ce41-_0x22711c,0x0)/0x2);_0x28b85d['blt'](_0x40ccd1,_0x18874d,_0x70f9dd,_0xfaa286,_0x276f83,_0x4cbb5d,_0x36a929,_0x22711c,_0x22711c);},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x1d1)]=function(_0x28afab){const _0x15c680=_0x379849,_0x4df626=this['bitmapWidth'](),_0x376ce7=this['bitmapHeight'](),_0x4de0c2=Math[_0x15c680(0x21f)](_0x4df626,_0x376ce7);this[_0x15c680(0x120)][_0x15c680(0x2b4)]=new Bitmap(_0x4df626,_0x376ce7);const _0x27762e=this['_graphicSprite'][_0x15c680(0x2b4)],_0x300346=this['_graphicSv']['match'](/\$/i),_0x148955=_0x300346?0x1:ImageManager[_0x15c680(0x2eb)],_0x33f10a=_0x300346?0x1:ImageManager[_0x15c680(0x1d4)],_0x5f04ba=_0x28afab[_0x15c680(0x28d)]/_0x148955,_0x298303=_0x28afab['height']/_0x33f10a,_0x4b4fca=Math[_0x15c680(0x21f)](0x1,_0x4de0c2/_0x5f04ba,_0x4de0c2/_0x298303),_0x46586f=_0x5f04ba*_0x4b4fca,_0x26abd7=_0x298303*_0x4b4fca,_0x206d92=Math[_0x15c680(0x209)]((_0x4df626-_0x46586f)/0x2),_0x486fee=Math[_0x15c680(0x209)]((_0x376ce7-_0x26abd7)/0x2);_0x27762e[_0x15c680(0x1b9)](_0x28afab,0x0,0x0,_0x5f04ba,_0x298303,_0x206d92,_0x486fee,_0x46586f,_0x26abd7);},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)]['changeEnemyGraphicBitmap']=function(_0x3b06b4){const _0xcf1b16=_0x379849,_0x442fbb=Window_CTB_TurnOrder['Settings'],_0x2390b2=this[_0xcf1b16(0x132)](),_0x491074=this[_0xcf1b16(0x1d6)](),_0xd08989=Math[_0xcf1b16(0x21f)](_0x2390b2,_0x491074);this[_0xcf1b16(0x120)][_0xcf1b16(0x2b4)]=new Bitmap(_0x2390b2,_0x491074);const _0x18099f=this[_0xcf1b16(0x120)]['bitmap'],_0x4d5745=Math['min'](0x1,_0xd08989/_0x3b06b4[_0xcf1b16(0x28d)],_0xd08989/_0x3b06b4['height']),_0x34dabb=_0x3b06b4[_0xcf1b16(0x28d)]*_0x4d5745,_0x5b9ba1=_0x3b06b4[_0xcf1b16(0x13f)]*_0x4d5745,_0x404366=Math[_0xcf1b16(0x209)]((_0x2390b2-_0x34dabb)/0x2),_0x1d441b=Math[_0xcf1b16(0x209)]((_0x491074-_0x5b9ba1)/0x2);_0x18099f[_0xcf1b16(0x1b9)](_0x3b06b4,0x0,0x0,_0x3b06b4[_0xcf1b16(0x28d)],_0x3b06b4['height'],_0x404366,_0x1d441b,_0x34dabb,_0x5b9ba1);},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x22d)]=function(){const _0x9f70d8=_0x379849,_0x251d75=this[_0x9f70d8(0x18d)]();if(!_0x251d75)return;if(!_0x251d75['isEnemy']())return;if(this[_0x9f70d8(0x234)]===_0x251d75[_0x9f70d8(0x1bd)]())return;this[_0x9f70d8(0x234)]=_0x251d75[_0x9f70d8(0x1bd)]();if(_0x251d75[_0x9f70d8(0x2fa)]())this['_graphicHue']=0x0;this[_0x9f70d8(0x120)]['setHue'](this[_0x9f70d8(0x234)]);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x379849(0x1c9)]=function(){const _0x5231b9=_0x379849;if(!this[_0x5231b9(0x180)])return;const _0x1af2b9=this[_0x5231b9(0x18d)]();if(!_0x1af2b9)return;if(this[_0x5231b9(0x216)]===_0x1af2b9[_0x5231b9(0x216)]&&this[_0x5231b9(0x252)]===_0x1af2b9[_0x5231b9(0x252)])return;this['_letter']=_0x1af2b9[_0x5231b9(0x216)],this[_0x5231b9(0x252)]=_0x1af2b9['_plural'];const _0x5a0514=Window_CTB_TurnOrder['Settings'],_0x2fe1be=this[_0x5231b9(0x18c)](),_0x5ea1c8=this['bitmapWidth'](),_0x303a50=this[_0x5231b9(0x1d6)](),_0x3dc5e2=this['_letterSprite']['bitmap'];_0x3dc5e2['clear']();if(!this[_0x5231b9(0x252)])return;_0x3dc5e2['fontFace']=_0x5a0514[_0x5231b9(0x2e6)]||$gameSystem[_0x5231b9(0x336)](),_0x3dc5e2[_0x5231b9(0x111)]=_0x5a0514[_0x5231b9(0x1b1)]||0x10,_0x2fe1be?_0x3dc5e2[_0x5231b9(0x280)](this['_letter'][_0x5231b9(0x13a)](),0x0,_0x303a50/0x2,_0x5ea1c8,_0x303a50/0x2,'center'):_0x5231b9(0x15c)===_0x5231b9(0x236)?this[_0x5231b9(0x159)]=!![]:_0x3dc5e2[_0x5231b9(0x280)](this[_0x5231b9(0x216)][_0x5231b9(0x13a)](),0x0,0x2,_0x5ea1c8-0x8,_0x303a50-0x4,_0x5231b9(0x19d));},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)][_0x379849(0x24c)]=function(){const _0x25e187=_0x379849,_0x6f7777=this[_0x25e187(0x18d)]();if(!_0x6f7777)return;const _0x16ff32=_0x6f7777[_0x25e187(0x18d)]();if(!_0x16ff32)return;const _0x11ce8b=_0x16ff32['mainSprite']();if(!_0x11ce8b)return;this[_0x25e187(0x1b6)](_0x11ce8b['_blendColor']);},Sprite_CTB_TurnOrder_Battler[_0x379849(0x2fd)]['getStateTooltipBattler']=function(){const _0xc3cc3b=_0x379849;return this[_0xc3cc3b(0x18d)]();},VisuMZ[_0x379849(0x18a)][_0x379849(0x330)]=Window_Help[_0x379849(0x2fd)][_0x379849(0x12c)],Window_Help[_0x379849(0x2fd)][_0x379849(0x12c)]=function(_0x103662){const _0x2f56ba=_0x379849;BattleManager[_0x2f56ba(0x24e)]()&&_0x103662&&_0x103662['note']&&_0x103662[_0x2f56ba(0x1fe)]['match'](/<(?:CTB) HELP>\s*([\s\S]*)\s*<\/(?:CTB) HELP>/i)?_0x2f56ba(0x2f1)===_0x2f56ba(0x2f1)?this[_0x2f56ba(0x245)](String(RegExp['$1'])):(this[_0x2f56ba(0x1a8)]=_0xf43003-0x1,this[_0x2f56ba(0x21b)](0x0)):_0x2f56ba(0x302)!=='xWizw'?this[_0x2f56ba(0x301)](_0x461f54):VisuMZ[_0x2f56ba(0x18a)][_0x2f56ba(0x330)][_0x2f56ba(0x1c6)](this,_0x103662);},VisuMZ[_0x379849(0x18a)]['Window_StatusBase_placeGauge']=Window_StatusBase[_0x379849(0x2fd)][_0x379849(0x1df)],Window_StatusBase[_0x379849(0x2fd)]['placeGauge']=function(_0x130de7,_0x1acf6b,_0x210dde,_0xfaf607){const _0x57697c=_0x379849;if(BattleManager[_0x57697c(0x24e)]()&&_0x1acf6b===_0x57697c(0x200))return;VisuMZ['BattleSystemCTB'][_0x57697c(0x303)][_0x57697c(0x1c6)](this,_0x130de7,_0x1acf6b,_0x210dde,_0xfaf607);};function _0x48fc(_0x24ae18,_0x12aabc){const _0x597d16=_0x597d();return _0x48fc=function(_0x48fc2d,_0x599794){_0x48fc2d=_0x48fc2d-0x10e;let _0x1b3ba8=_0x597d16[_0x48fc2d];return _0x1b3ba8;},_0x48fc(_0x24ae18,_0x12aabc);}function Window_CTB_TurnOrder(){const _0x96d168=_0x379849;this[_0x96d168(0x1a2)](...arguments);}Window_CTB_TurnOrder['prototype']=Object[_0x379849(0x2c5)](Window_Base[_0x379849(0x2fd)]),Window_CTB_TurnOrder[_0x379849(0x2fd)][_0x379849(0x1c8)]=Window_CTB_TurnOrder,Window_CTB_TurnOrder[_0x379849(0x124)]=VisuMZ[_0x379849(0x18a)][_0x379849(0x124)][_0x379849(0x2f3)],Window_CTB_TurnOrder[_0x379849(0x2fd)]['initialize']=function(){const _0x3c9584=_0x379849,_0x2f85a9=this[_0x3c9584(0x192)]();this[_0x3c9584(0x285)]=_0x2f85a9['x'],this[_0x3c9584(0x1a4)]=_0x2f85a9['y'],Window_Base[_0x3c9584(0x2fd)]['initialize']['call'](this,_0x2f85a9),this['createBattlerSprites'](),this['updateVisibility'](),this[_0x3c9584(0x1af)]=0x0;},Window_CTB_TurnOrder[_0x379849(0x2fd)][_0x379849(0x192)]=function(){const _0x4c6fa0=_0x379849,_0x5bbdc3=Window_CTB_TurnOrder[_0x4c6fa0(0x124)],_0x369037=SceneManager[_0x4c6fa0(0x161)][_0x4c6fa0(0x13c)]['height'],_0x1c2fea=SceneManager[_0x4c6fa0(0x161)][_0x4c6fa0(0x246)]['height'],_0x2d2263=_0x5bbdc3[_0x4c6fa0(0x1f5)];let _0x17ba82=0x0,_0x4a5130=0x0,_0x465f43=0x0,_0x13c981=0x0;switch(_0x5bbdc3[_0x4c6fa0(0x264)]){case _0x4c6fa0(0x195):_0x17ba82=_0x5bbdc3['SpriteThin']*_0x5bbdc3[_0x4c6fa0(0x194)]+_0x2d2263,_0x4a5130=_0x5bbdc3[_0x4c6fa0(0x222)],_0x465f43=Math[_0x4c6fa0(0x19a)]((Graphics['width']-_0x17ba82)/0x2),_0x13c981=_0x5bbdc3[_0x4c6fa0(0x2b7)];break;case _0x4c6fa0(0x296):_0x17ba82=_0x5bbdc3['SpriteThin']*_0x5bbdc3[_0x4c6fa0(0x194)]+_0x2d2263,_0x4a5130=_0x5bbdc3[_0x4c6fa0(0x222)],_0x465f43=Math[_0x4c6fa0(0x19a)]((Graphics['width']-_0x17ba82)/0x2),_0x13c981=Graphics[_0x4c6fa0(0x13f)]-_0x369037-_0x4a5130-_0x5bbdc3[_0x4c6fa0(0x2b7)];break;case _0x4c6fa0(0x2b1):_0x17ba82=_0x5bbdc3['SpriteLength'],_0x4a5130=_0x5bbdc3[_0x4c6fa0(0x157)]*_0x5bbdc3['TotalVertSprites']+_0x2d2263,_0x465f43=_0x5bbdc3[_0x4c6fa0(0x2b7)],_0x13c981=Math[_0x4c6fa0(0x19a)]((Graphics['height']-_0x369037+_0x1c2fea-_0x4a5130)/0x2);break;case _0x4c6fa0(0x19d):_0x17ba82=_0x5bbdc3[_0x4c6fa0(0x222)],_0x4a5130=_0x5bbdc3['SpriteThin']*_0x5bbdc3['TotalVertSprites']+_0x2d2263,_0x465f43=Graphics[_0x4c6fa0(0x28d)]-_0x17ba82-_0x5bbdc3[_0x4c6fa0(0x2b7)],_0x13c981=Math[_0x4c6fa0(0x19a)]((Graphics[_0x4c6fa0(0x13f)]-_0x369037+_0x1c2fea-_0x4a5130)/0x2);break;}return _0x465f43+=_0x5bbdc3[_0x4c6fa0(0x2e9)],_0x13c981+=_0x5bbdc3['DisplayOffsetY'],new Rectangle(_0x465f43,_0x13c981,_0x17ba82,_0x4a5130);},Window_CTB_TurnOrder[_0x379849(0x2fd)][_0x379849(0x149)]=function(){const _0x5c357b=_0x379849;this[_0x5c357b(0x22f)]=0x0;},Window_CTB_TurnOrder[_0x379849(0x2fd)][_0x379849(0x18c)]=function(){const _0x3029df=_0x379849,_0x120dbe=Window_CTB_TurnOrder[_0x3029df(0x124)],_0x1dc9ed=[_0x3029df(0x195),'bottom'][_0x3029df(0x26c)](_0x120dbe['DisplayPosition']);return _0x1dc9ed;},Window_CTB_TurnOrder['prototype'][_0x379849(0x201)]=function(){const _0x2d1967=_0x379849,_0x33bcf4=Window_CTB_TurnOrder[_0x2d1967(0x124)],_0x2c435f=this[_0x2d1967(0x18c)](),_0x1fd824=_0x2c435f?_0x33bcf4['TotalHorzSprites']:_0x33bcf4['TotalVertSprites'];this[_0x2d1967(0x2d4)]=new Sprite(),this[_0x2d1967(0x30b)](this[_0x2d1967(0x2d4)]),this['_turnOrderContainer']=[];for(let _0x264404=0x0;_0x264404<$gameParty[_0x2d1967(0x19c)]();_0x264404++){for(let _0x5e4228=0x0;_0x5e4228<_0x1fd824;_0x5e4228++){if(_0x2d1967(0x22c)!==_0x2d1967(0x22c))_0x43ff15[_0x2d1967(0x280)](this[_0x2d1967(0x216)]['trim'](),0x0,0x2,_0x5dc40d-0x8,_0x490ccd-0x4,'right');else{const _0x496c19=new Sprite_CTB_TurnOrder_Battler($gameParty,_0x264404,_0x5e4228);this['_turnOrderInnerSprite'][_0x2d1967(0x139)](_0x496c19),this[_0x2d1967(0x1a0)]['push'](_0x496c19);}}}for(let _0x1937e0=0x0;_0x1937e0<$gameTroop[_0x2d1967(0x1ac)]()[_0x2d1967(0x17b)];_0x1937e0++){if('ZJnOx'===_0x2d1967(0x210))for(let _0x999697=0x0;_0x999697<_0x1fd824;_0x999697++){const _0x57fba4=new Sprite_CTB_TurnOrder_Battler($gameTroop,_0x1937e0,_0x999697);this[_0x2d1967(0x2d4)][_0x2d1967(0x139)](_0x57fba4),this[_0x2d1967(0x1a0)]['push'](_0x57fba4);}else return(this['tpbRequiredCastTime']()-this[_0x2d1967(0x165)])/this[_0x2d1967(0x154)]();}},Window_CTB_TurnOrder[_0x379849(0x2fd)][_0x379849(0x240)]=function(){const _0xbc0586=_0x379849;Window_Base[_0xbc0586(0x2fd)][_0xbc0586(0x240)][_0xbc0586(0x1c6)](this),this[_0xbc0586(0x1e6)](),this['updateVisibility']();},Window_CTB_TurnOrder[_0x379849(0x2fd)][_0x379849(0x1e6)]=function(){const _0x29bafc=_0x379849,_0x3abf2b=Window_CTB_TurnOrder[_0x29bafc(0x124)];if(_0x3abf2b[_0x29bafc(0x264)]!==_0x29bafc(0x195))return;if(!_0x3abf2b[_0x29bafc(0x2b9)])return;const _0x238d84=SceneManager['_scene'][_0x29bafc(0x246)];if(!_0x238d84)return;if(_0x238d84[_0x29bafc(0x309)]){if(_0x29bafc(0x24b)!==_0x29bafc(0x153))this['x']=this['_homeX']+(_0x3abf2b[_0x29bafc(0x27e)]||0x0),this['y']=this[_0x29bafc(0x1a4)]+(_0x3abf2b[_0x29bafc(0x185)]||0x0);else{const _0x1126c5=_0x413371(_0x5c6309['$1']);_0x1126c5<_0x1829bb?(_0x4894a0(_0x29bafc(0x171)[_0x29bafc(0x168)](_0x3e022c,_0x1126c5,_0x30059b)),_0x476e3e[_0x29bafc(0x1a5)]()):_0x3cc981=_0x9c2d7d[_0x29bafc(0x17a)](_0x1126c5,_0x4e3423);}}else this['x']=this[_0x29bafc(0x285)],this['y']=this['_homeY'];const _0x1f181b=SceneManager['_scene']['_windowLayer'];Window_CTB_TurnOrder[_0x29bafc(0x2ba)]===undefined&&(Window_CTB_TurnOrder[_0x29bafc(0x2ba)]=Math[_0x29bafc(0x209)]((Graphics[_0x29bafc(0x28d)]-Math[_0x29bafc(0x21f)](Graphics['boxWidth'],_0x1f181b[_0x29bafc(0x28d)]))/0x2),Window_CTB_TurnOrder['_ogWindowLayerY']=Math[_0x29bafc(0x209)]((Graphics[_0x29bafc(0x13f)]-Math['min'](Graphics['boxHeight'],_0x1f181b[_0x29bafc(0x13f)]))/0x2)),this['x']+=_0x1f181b['x']-Window_CTB_TurnOrder[_0x29bafc(0x2ba)],this['y']+=_0x1f181b['y']-Window_CTB_TurnOrder[_0x29bafc(0x14c)];},Window_CTB_TurnOrder[_0x379849(0x2fd)][_0x379849(0x26e)]=function(){const _0x5028c4=_0x379849;if(!this[_0x5028c4(0x2d4)])return;const _0xa7374f=this['_turnOrderInnerSprite'][_0x5028c4(0x337)];if(!_0xa7374f)return;_0xa7374f[_0x5028c4(0x249)](this[_0x5028c4(0x123)][_0x5028c4(0x18f)](this));},Window_CTB_TurnOrder[_0x379849(0x2fd)]['compareBattlerSprites']=function(_0x154421,_0x57c460){const _0x3d6d24=_0x379849,_0x42c270=this['isHorz'](),_0x6023dd=Window_CTB_TurnOrder['Settings'][_0x3d6d24(0x1c1)];if(_0x42c270&&!_0x6023dd){if(_0x3d6d24(0x2ea)!==_0x3d6d24(0x11a))return _0x154421['x']-_0x57c460['x'];else this['preEndActionCTB'](),_0x342c01[_0x3d6d24(0x18a)]['BattleManager_endAction'][_0x3d6d24(0x1c6)](this),this[_0x3d6d24(0x205)]();}else{if(_0x42c270&&_0x6023dd)return _0x57c460['x']-_0x154421['x'];else{if(!_0x42c270&&_0x6023dd)return _0x3d6d24(0x228)===_0x3d6d24(0x187)?(this[_0x3d6d24(0x2fe)]===_0x5f0bc7&&(this[_0x3d6d24(0x2fe)]=this[_0x3d6d24(0x148)]()),this['_ctbTurnOrderFaceIndex']):_0x154421['y']-_0x57c460['y'];else{if(!_0x42c270&&!_0x6023dd)return _0x57c460['y']-_0x154421['y'];}}}},Window_CTB_TurnOrder[_0x379849(0x2fd)]['updateVisibility']=function(){const _0x193558=_0x379849;this[_0x193558(0x309)]=$gameSystem[_0x193558(0x26d)]();},Window_CTB_TurnOrder[_0x379849(0x2fd)][_0x379849(0x1f6)]=function(_0x3cbc63){const _0x2fc856=_0x379849;this[_0x2fc856(0x26e)](),this[_0x2fc856(0x1a0)][_0x2fc856(0x249)]((_0x530403,_0x116fd3)=>{const _0x59c4ba=_0x2fc856;return _0x59c4ba(0x31b)==='IaQfz'?this[_0x59c4ba(0x206)]():_0x530403['ticksLeft']()-_0x116fd3['ticksLeft']();});if(!_0x3cbc63)return;for(const _0x2c1087 of this[_0x2fc856(0x1a0)]){if(!_0x2c1087)continue;_0x2c1087[_0x2fc856(0x240)](),_0x2c1087['_positionDuration']=0x0;}},Window_CTB_TurnOrder['prototype'][_0x379849(0x2cf)]=function(_0x4436f0){const _0x13fed9=_0x379849;for(const _0x51a312 of this['_turnOrderContainer']){if(!_0x51a312)continue;if(_0x51a312[_0x13fed9(0x18d)]()!==_0x4436f0)continue;_0x51a312['rotateDupeNumber']();}};