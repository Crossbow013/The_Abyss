//=============================================================================
// VisuStella MZ - Combat Log
// VisuMZ_4_CombatLog.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_CombatLog = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CombatLog = VisuMZ.CombatLog || {};
VisuMZ.CombatLog.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.12] [CombatLog]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Combat_Log_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes text appears way too fast in the battle system or sometimes
 * players may miss what kind of information was delivered on-screen. For times
 * like that, being able to access the Combat Log would be important. The
 * Combat Log records all of the text that appears in the battle log window at
 * the top. The player can access the Combat Log display any time during action
 * selection phase or by holding down the designated Hot Key. Sometimes,
 * players can even review over the Combat Log to try and figure out any kinds
 * of patterns enemies may even have.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Record the events that happen in battle into an accessible Combat Log for
 *   players to go back and review.
 * * Access the Combat Log in-battle through the Party Command Window, Actor
 *   Command Window, or by holding down the Hot Key.
 * * Icons are added to help players quickly differentiate between different
 *   types of events.
 * * Combat Log can have its numbers color-coded to quickly determine their
 *   effects towards action targets.
 * * Players can review past Combat Logs from an option in the Main Menu.
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
 * VisuMZ_1_BattleCore
 * 
 * The VisuStella MZ Battle Core's <Battle Commands> notetag can now add in
 * "Combat Log" to its list to have the Combat Log shown as an option to the
 * Actor Command Window. Do remember to have this option enabled in the Plugin
 * Parameters as well.
 * 
 * ---
 *
 * VisuMZ_1_MessageCore
 *
 * By having the VisuStella MZ Message Core installed, you can enable the
 * Auto Color functions for the Combat Log. Do remember to have this option
 * enabled in the Plugin Parameters as well.
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
 * === Bypass-Related Notetags ===
 * 
 * ---
 *
 * <Bypass Combat Log>
 *
 * - Used for: State Notetags
 * - Insert this notetag inside a state to make its state messages ignored.
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
 * === Combat Log Plugin Commands ===
 * 
 * ---
 *
 * Combat Log: Add Text
 * - Adds custom text to the current Combat Log.
 *
 *   Text:
 *   - What text would you like to add to the Combat Log?
 *
 *   Icon:
 *   - What icon would you like to bind to this entry?
 *
 * ---
 *
 * Combat Log: Add Horizontal Line
 * - Adds a horizontal line to the current Combat Log.
 *
 * ---
 *
 * Combat Log: Bypass Text?
 * - Temporarily bypass adding any new text to the Combat Log until this
 *   is turned off?
 *
 *   Bypass?:
 *   - Bypass text from being added to the Combat Log temporarily?
 *
 * ---
 *
 * Combat Log: Hot Key Enable?
 * - Enables/disables the Combat Log hot key in battle?
 *
 *   Enable?:
 *   - Enables/disables the Combat Log hot key in battle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Show in Main Menu?
 * - Shows/hides CombatLog menu inside the Main Menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside the Main Menu.
 *   - Note! This command will be disabled if the player does not have any
 *     Combat Logs recorded.
 *
 * ---
 *
 * System: Show in Party Command?
 * - Shows/hides CombatLog menu inside the Window_PartyCommand.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside Window_PartyCommand.
 *
 * ---
 *
 * System: Show in Actor Command?
 * - Shows/hides CombatLog menu inside the Window_ActorCommand.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside Window_ActorCommand.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for the Combat Log. Determine how the commands appear,
 * the hot key used, and accessibility through the Main Menu, Party Command
 * Window, and Actor Command Window.
 *
 * ---
 *
 * General
 * 
 *   Command Name:
 *   - Name of the 'Combat Log' option in the various menus.
 * 
 *   Icon:
 *   - Icon used for each of the 'Combat Log' options.
 * 
 *   Hot Key:
 *   - This is the key used for quickly opening the Combat Log in battle.
 * 
 *   Stored Logs:
 *   - How many combat logs are stored as a history?
 *   - This affects the Combat Log menu.
 *
 * ---
 *
 * Main Menu
 * 
 *   Show in Main Menu?:
 *   - Add the 'Combat Log' option to the Main Menu by default?
 *   - Note! This command will be disabled if the player does not have any
 *     Combat Logs recorded.
 *
 * ---
 *
 * Window_PartyCommand
 * 
 *   Show in Window?:
 *   - Add the 'Combat Log' option to Window_PartyCommand by default?
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Show in Window?:
 *   - Add the 'Combat Log' option to Window_ActorCommand by default?
 * 
 *   Help: Combat Log:
 *   - Help text for Combat Log command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Combat Log Settings
 * ============================================================================
 *
 * Settings regarding the Combat Log contents. Disable any unwanted information
 * you want from here to prevent them from being displayed.
 *
 * ---
 *
 * General
 * 
 *   Show Icons?:
 *   - Show icons in the Combat Log?
 * 
 *   Auto Color?:
 *   - Use auto colors for the Combat Log?
 *   - Requires VisuMZ_1_MessageCore
 * 
 *   Color Numbers?:
 *   - Color numbers for damage differences?
 *
 * ---
 *
 * Battle Start
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *
 * ---
 *
 * Enemy Emerge
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Advantages
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Preemptive Icon:
 *   Surprised Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Turn Count
 *
 * ---
 *
 * End Turn
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Turn Count
 *
 * ---
 *
 * Battle Victory
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Escape
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Defeat
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Action Text
 * 
 *   Show Skill Message 1?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Skill Message 2?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Item Message?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * HP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * HP Settings > HP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * HP Settings > HP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * HP Settings > No HP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * MP Settings > MP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings > MP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings > No MP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * TP Settings > TP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings > TP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings > No TP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * State Settings
 * 
 *   Show State Add?:
 *   - Show this event in the Combat Log?
 * 
 *   Show State Remove?:
 *   - Show this event in the Combat Log?
 * 
 *   Show State Current?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * Buff & Debuff Settings
 * 
 *   Show Add Buff?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Add Debuff?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Erase Buff?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * Counterattack
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Reflection
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Substitute
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Effect Failure
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Critical Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Missed Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Evaded Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_CombatLog. Pretty up the scene to fit the rest
 * of your game with these settings!
 *
 * ---
 *
 * Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Settings regarding this plugin's windows. These alter how the windows appear
 * in the battle and menu scenes.
 *
 * ---
 *
 * Combat Log (Battle)
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Combat Log (Menu)
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Combat History (Menu)
 * 
 *   Latest Command:
 *   - Text displayed for latest battle.
 *   - %1 - Battle Count
 * 
 *   Past Command:
 *   - Text displayed for past battles.
 *   - %1 - Battle Count
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Compatibility Settings
 * ============================================================================
 *
 * These settings are for creating compatibility with the other VisuStella MZ
 * plugins that can benefit from having their effects recorded inside of the
 * Combat Log.
 *
 * ---
 *
 * Battle System - ATB > Interrupt
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Battle System - CTB > Order Change
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Battle System - STB > Instant
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Anti-Damage Barriers > Cancel Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Nullify Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Reduction Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Absorption Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - Damage
 *
 * ---
 *
 * Anti-Damage Barriers > MP Dispersion Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - MP
 *
 * ---
 *
 * Anti-Damage Barriers > TP Dispersion Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - TP
 *
 * ---
 *
 * Life State Effects > Auto Life
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Curse
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Doom
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Fragile
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Guts
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Undead
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Steal Items > Steal Text
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
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
 * * Trihan
 * * Arisu
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.12: June 23, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.11: January 27, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 6, 2022
 * * Bug Fixes!
 * ** Incorrect text usage for enemy recovery is now fixed. Fix made by Arisu.
 * 
 * Version 1.09: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: April 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > General Settings > Help: Combat Log
 * **** Help text for Combat Log command.
 * 
 * Version 1.07: March 19, 2021
 * * Bug Fixes!
 * ** Combat log should no longer mask some windows from appearing and is now
 *    instead placed as a non-window object. Fix made by Arisu.
 * 
 * Version 1.06: March 12, 2021
 * * Bug Fixes!
 * ** Icons for counters, reflections, and substitutes should now display
 *    properly in the combat log. Fix made by Arisu.
 * ** Turn data should now display properly in TPB-base battle systems.
 *    Fix made by Arisu.
 * ** Switching out to the Options Scene or Party Scene should no longer clear
 *    the Combat Log in-battle. Fix made by Arisu.
 * 
 * Version 1.05: January 22, 2021
 * * Feature Update!
 * ** Dimmed background sprite now expands through the width of the screen
 *    while in battle to no longer display the jagged edges. Update by Irina.
 * 
 * Version 1.04: January 15, 2021
 * * Feature Update!
 * ** Any entries added to the Combat Log with \V[x] will now have their exact
 *    variable data stored at the time instead of displaying their current
 *    variable value. Update made by Irina.
 * 
 * Version 1.03: January 8, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Irina.
 * *** Plugin Parameters > General Settings > Stored Logs
 * **** How many combat logs are stored as a history?
 * 
 * Version 1.02: January 1, 2021
 * * Bug Fixes!
 * ** Compatibility with the Absorption Barrier should be fixed. Fix made by
 *    Yanfly.
 * 
 * Version 1.01: December 25, 2020
 * * Feature Update!
 * ** Combat Log when opened with the hot key will automatically close itself
 *    if the Message Window is open. Update made by Yanfly.
 *
 * Version 1.00: January 15, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogAddText
 * @text Combat Log: Add Text
 * @desc Adds custom text to the current Combat Log.
 *
 * @arg Text:str
 * @text Text
 * @desc What text would you like to add to the Combat Log?
 * @default Custom
 *
 * @arg Icon:num
 * @text Icon
 * @desc What icon would you like to bind to this entry?
 * @default 87
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogAddHorzLine
 * @text Combat Log: Add Horizontal Line
 * @desc Adds a horizontal line to the current Combat Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogBypass
 * @text Combat Log: Bypass Text?
 * @desc Temporarily bypass adding any new text to the Combat Log until this is turned off?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass Text
 * @off Add Normally
 * @desc Bypass text from being added to the Combat Log temporarily?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogEnableHotKey
 * @text Combat Log: Hot Key Enable?
 * @desc Enables/disables the Combat Log hot key in battle?
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Combat Log hot key in battle.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogMenu
 * @text System: Show in Main Menu?
 * @desc Shows/hides CombatLog menu inside the Main Menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside the Main Menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogParty
 * @text System: Show in Party Command?
 * @desc Shows/hides CombatLog menu inside the Window_PartyCommand.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside Window_PartyCommand.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogActor
 * @text System: Show in Actor Command?
 * @desc Shows/hides CombatLog menu inside the Window_ActorCommand.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside Window_ActorCommand.
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
 * @param CombatLog
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
 * @desc General settings for the Combat Log.
 * @default {"General":"","Name:str":"Combat Log","Icon:num":"189","HotKey:str":"shift","MainMenu":"","ShowMainMenu:eval":"true","PartyCommand":"","ShowPartyCommand:eval":"true","ActorCommand":"","ShowActorCommand:eval":"true"}
 *
 * @param CombatLog:struct
 * @text Combat Log Settings
 * @type struct<CombatLog>
 * @desc Settings regarding the Combat Log contents.
 * @default {"General":"","ShowIcons:eval":"true","AutoColor:eval":"true","ColorNumbers:eval":"true","BattleStart":"","ShowBattleStart:eval":"true","IconBattleStart:num":"97","TextBattleStart:str":"\\C[4]Battle Start!\\C[0]","EnemyEmerge":"","ShowEnemyEmerge:eval":"true","IconEnemyEmerge:num":"5","Advantages":"","ShowAdvantages:eval":"true","IconPreemptive:num":"77","IconSurprise:num":"78","StartTurn":"","ShowStartTurn:eval":"true","IconStartTurn:num":"97","TextStartTurn:str":"\\C[4]Turn \\C[5]%1\\C[4]: \\C[6]Start!","EndTurn":"","ShowEndTurn:eval":"true","IconEndTurn:num":"97","TextEndTurn:str":"\\C[4]Turn \\C[5]%1\\C[4]: \\C[6]End!","Victory":"","ShowVictory:eval":"true","IconVictory:num":"87","Escape":"","ShowEscape:eval":"true","IconEscape:num":"82","Defeat":"","ShowDefeat:eval":"true","IconDefeat:num":"1","Actions":"","ShowSkillMessage1:eval":"true","ShowSkillMessage2:eval":"true","ShowItemMessage:eval":"true","HP":"","ShowHP:eval":"true","HealHP":"","IconHealHP:num":"72","TextColorHealHP:num":"24","DmgHP":"","IconDmgHP:num":"168","TextColorDmgHP:num":"2","NoDmgHP":"","IconNoDmgHP:num":"81","TextColorNoDmgHP:num":"6","MP":"","ShowMP:eval":"true","HealMP":"","IconHealMP:num":"72","TextColorHealMP:num":"4","DmgMP":"","IconDmgMP:num":"171","TextColorDmgMP:num":"5","NoDmgMP":"","IconNoDmgMP:num":"81","TextColorNoDmgMP:num":"6","TP":"","ShowTP:eval":"true","HealTP":"","IconHealTP:num":"164","TextColorHealTP:num":"24","DmgTP":"","IconDmgTP:num":"170","TextColorDmgTP:num":"28","NoDmgTP":"","IconNoDmgTP:num":"81","TextColorNoDmgTP:num":"6","States":"","ShowStateAdd:eval":"true","ShowStateRemove:eval":"true","ShowStateCurrent:eval":"true","Buffs":"","ShowAddBuff:eval":"true","ShowAddDebuff:eval":"true","ShowEraseBuff:eval":"true","Counter":"","ShowCounter:eval":"true","IconCounter:num":"77","Reflect":"","ShowReflect:eval":"true","IconReflect:num":"81","Subst":"","ShowSubst:eval":"true","IconSubst:num":"81","Fail":"","ShowFail:eval":"true","IconFail:num":"166","Critical":"","ShowCritical:eval":"true","IconCritical:num":"87","Miss":"","ShowMiss:eval":"true","IconMiss:num":"82","Evade":"","ShowEvade:eval":"true","IconEvade:num":"82"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_CombatLog.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding this plugin's windows.
 * @default {"CombatLogBattle":"","CombatLogBattle_BgType:num":"1","CombatLogBattle_RectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = Graphics.boxHeight;\\nreturn new Rectangle(wx, wy, ww, wh);\"","CombatLogMenu":"","CombatLogMenu_BgType:num":"0","CombatLogMenu_RectJS:func":"\"const wx = 0;\\nconst wy = this._historyWindow.y + this._historyWindow.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.mainAreaHeight() - this._historyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","CombatHistory":"","CombatHistoryLatest:str":"Latest","CombatHistoryPrevious:str":"Battle #%1","CombatHistory_BgType:num":"0","CombatHistory_RectJS:func":"\"const ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param -
 *
 * @param Compatibility:struct
 * @text Compatibility Settings
 * @type struct<Compatibility>
 * @desc Compatibility settings with other VisuStella MZ plugins.
 * @default {"VisuMZ_2_BattleSystemATB":"","VisuMZ_2_BattleSystemATB_Interrupt":"","ShowBattleSysAtbInterrupt:eval":"true","IconBattleSysAtbInterrupt:num":"78","TextBattleSysAtbInterrupt:str":"%1 has been interrupted!","VisuMZ_2_BattleSystemCTB":"","VisuMZ_2_BattleSystemCTB_OrderChange":"","ShowBattleSysCtbOrderChange:eval":"true","IconBattleSysCtbOrderChange:num":"75","TextBattleSysCtbOrderChange:str":"%1's turn order has changed!","VisuMZ_2_BattleSystemSTB":"","VisuMZ_2_BattleSystemSTB_Instant":"","ShowBattleSysStbInstant:eval":"true","IconBattleSysStbInstant:num":"73","TextBattleSysStbInstant:str":"%1's gains an extra action!","VisuMZ_3_AntiDmgBarriers":"","VisuMZ_3_AntiDmgBarriers_Cancel":"","Show_AntiDmgBarrier_Cancel:eval":"true","Text_AntiDmgBarrier_Cancel:str":"%2 cancels damage for %1!","VisuMZ_3_AntiDmgBarriers_Nullify":"","Show_AntiDmgBarrier_Nullify:eval":"true","Text_AntiDmgBarrier_Nullify:str":"%2 nullifies damage for %1!","VisuMZ_3_AntiDmgBarriers_Reduce":"","Show_AntiDmgBarrier_Reduce:eval":"true","Text_AntiDmgBarrier_Reduce:str":"%2 reduces damage for %1!","VisuMZ_3_AntiDmgBarriers_Absorb":"","Show_AntiDmgBarrier_Absorb:eval":"true","Text_AntiDmgBarrier_Absorb:str":"%2 absorbs \\C[5]%2\\C[0] damage for %1!","VisuMZ_3_AntiDmgBarriers_MpDisperse":"","Show_AntiDmgBarrier_MpDisperse:eval":"true","Text_AntiDmgBarrier_MpDisperse:str":"%2 dispersed damage to %1's %3!","VisuMZ_3_AntiDmgBarriers_TpDisperse":"","Show_AntiDmgBarrier_TpDisperse:eval":"true","Text_AntiDmgBarrier_TpDisperse:str":"%2 dispersed damage to %1's %3!","VisuMZ_3_LifeStateEffects":"","VisuMZ_3_LifeStateEffects_AutoLife":"","Show_LifeStateEffects_AutoLife:eval":"true","Icon_LifeStateEffects_AutoLife:num":"70","Text_LifeStateEffects_AutoLife:str":"%1 is automatically revived!","VisuMZ_3_LifeStateEffects_Curse":"","Show_LifeStateEffects_Curse:eval":"true","Icon_LifeStateEffects_Curse:num":"71","Text_LifeStateEffects_Curse:str":"%1's curse takes hold...","VisuMZ_3_LifeStateEffects_Doom":"","Show_LifeStateEffects_Doom:eval":"true","Icon_LifeStateEffects_Doom:num":"1","Text_LifeStateEffects_Doom:str":"%1 has fallen to doom.","VisuMZ_3_LifeStateEffects_Fragile":"","Show_LifeStateEffects_Fragile:eval":"true","Icon_LifeStateEffects_Fragile:num":"166","Text_LifeStateEffects_Fragile:str":"%1 was too fragile!","VisuMZ_3_LifeStateEffects_Guts":"","Show_LifeStateEffects_Guts:eval":"true","Icon_LifeStateEffects_Guts:num":"77","Text_LifeStateEffects_Guts:str":"%1 powers through a fatal blow!","VisuMZ_3_LifeStateEffects_Undead":"","Show_LifeStateEffects_Undead:eval":"true","Icon_LifeStateEffects_Undead:num":"10","Text_LifeStateEffects_Undead:str":"%1 suffers from being undead!","VisuMZ_3_StealItems":"","VisuMZ_3_StealItems_Steal":"","Show_StealItems_Steal:eval":"true","Icon_StealItems_Steal:num":"142"}
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
 * @param General
 *
 * @param Name:str
 * @text Command Name
 * @parent General
 * @desc Name of the 'Combat Log' option in the various menus.
 * @default Combat Log
 *
 * @param Icon:num
 * @text Icon
 * @parent General
 * @desc Icon used for each of the 'Combat Log' options.
 * @default 189
 *
 * @param HotKey:str
 * @text Hot Key
 * @parent General
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for quickly opening the Combat Log in battle.
 * @default shift
 *
 * @param StoredLogs:num
 * @text Stored Logs
 * @parent General
 * @desc How many combat logs are stored as a history?
 * This affects the Combat Log menu.
 * @default 5
 *
 * @param MainMenu
 * @text Main Menu
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @parent MainMenu
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to the Main Menu by default?
 * @default true
 *
 * @param PartyCommand
 * @text Window_PartyCommand
 *
 * @param ShowPartyCommand:eval
 * @text Show in Window?
 * @parent PartyCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to Window_PartyCommand by default?
 * @default true
 *
 * @param ActorCommand
 * @text Window_ActorCommand
 *
 * @param ShowActorCommand:eval
 * @text Show in Window?
 * @parent ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to Window_ActorCommand by default?
 * @default true
 *
 * @param BattleHelpCombatLog:json
 * @text Help: Combat Log
 * @parent ActorCommand
 * @type note
 * @desc Help text for Combat Log command.
 * Requires VisuMZ_1_BattleCore!
 * @default "View the combat log."
 *
 */
/* ----------------------------------------------------------------------------
 * Combat Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CombatLog:
 *
 * @param General
 *
 * @param ShowIcons:eval
 * @text Show Icons?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show icons in the Combat Log?
 * @default true
 *
 * @param AutoColor:eval
 * @text Auto Color?
 * @parent General
 * @type boolean
 * @on Use Auto Color
 * @off Don't Use
 * @desc Use auto colors for the Combat Log?
 * Requires VisuMZ_1_MessageCore
 * @default true
 *
 * @param ColorNumbers:eval
 * @text Color Numbers?
 * @parent General
 * @type boolean
 * @on Color Numbers
 * @off Don't Color
 * @desc Color numbers for damage differences?
 * @default true
 * 
 * @param BattleStart
 * @text Battle Start
 *
 * @param ShowBattleStart:eval
 * @text Show?
 * @parent BattleStart
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleStart:num
 * @text Icon
 * @parent BattleStart
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextBattleStart:str
 * @text Text
 * @parent BattleStart
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes.
 * @default \C[4]Battle Start!\C[0]
 * 
 * @param EnemyEmerge
 * @text Enemy Emerge
 *
 * @param ShowEnemyEmerge:eval
 * @text Show?
 * @parent EnemyEmerge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEnemyEmerge:num
 * @text Icon
 * @parent EnemyEmerge
 * @desc Icon used for this event in the Combat Log.
 * @default 5
 * 
 * @param Advantages
 * @text Battle Advantages
 *
 * @param ShowAdvantages:eval
 * @text Show?
 * @parent Advantages
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconPreemptive:num
 * @text Preemptive Icon
 * @parent Advantages
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 *
 * @param IconSurprise:num
 * @text Surprised Icon
 * @parent Advantages
 * @desc Icon used for this event in the Combat Log.
 * @default 78
 * 
 * @param StartTurn
 * @text Start Turn
 *
 * @param ShowStartTurn:eval
 * @text Show?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconStartTurn:num
 * @text Icon
 * @parent StartTurn
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextStartTurn:str
 * @text Text
 * @parent StartTurn
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Turn Count
 * @default \C[4]Turn \C[5]%1\C[4]: \C[6]Start!
 * 
 * @param EndTurn
 * @text End Turn
 *
 * @param ShowEndTurn:eval
 * @text Show?
 * @parent EndTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEndTurn:num
 * @text Icon
 * @parent EndTurn
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextEndTurn:str
 * @text Text
 * @parent EndTurn
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Turn Count
 * @default \C[4]Turn \C[5]%1\C[4]: \C[6]End!
 * 
 * @param Victory
 * @text Battle Victory
 *
 * @param ShowVictory:eval
 * @text Show?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconVictory:num
 * @text Icon
 * @parent Victory
 * @desc Icon used for this event in the Combat Log.
 * @default 87
 * 
 * @param Escape
 * @text Battle Escape
 *
 * @param ShowEscape:eval
 * @text Show?
 * @parent Escape
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEscape:num
 * @text Icon
 * @parent Escape
 * @desc Icon used for this event in the Combat Log.
 * @default 82
 * 
 * @param Defeat
 * @text Battle Defeat
 *
 * @param ShowDefeat:eval
 * @text Show?
 * @parent Defeat
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconDefeat:num
 * @text Icon
 * @parent Defeat
 * @desc Icon used for this event in the Combat Log.
 * @default 1
 * 
 * @param Actions
 * @text Action Text
 *
 * @param ShowSkillMessage1:eval
 * @text Show Skill Message 1?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowSkillMessage2:eval
 * @text Show Skill Message 2?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowItemMessage:eval
 * @text Show Item Message?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HP
 * @text HP Settings
 *
 * @param ShowHP:eval
 * @text Show?
 * @parent HP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealHP
 * @text HP Heal
 * @parent HP
 *
 * @param IconHealHP:num
 * @text Icon
 * @parent HealHP
 * @desc Icon used for this event in the Combat Log.
 * @default 72
 *
 * @param TextColorHealHP:num
 * @text Text Color
 * @parent HealHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 24
 * 
 * @param DmgHP
 * @text HP Damage
 * @parent HP
 *
 * @param IconDmgHP:num
 * @text Icon
 * @parent DmgHP
 * @desc Icon used for this event in the Combat Log.
 * @default 168
 *
 * @param TextColorDmgHP:num
 * @text Text Color
 * @parent DmgHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 2
 * 
 * @param NoDmgHP
 * @text No HP Damage
 * @parent HP
 *
 * @param IconNoDmgHP:num
 * @text Icon
 * @parent NoDmgHP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgHP:num
 * @text Text Color
 * @parent NoDmgHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param MP
 * @text MP Settings
 *
 * @param ShowMP:eval
 * @text Show?
 * @parent MP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealMP
 * @text MP Heal
 * @parent MP
 *
 * @param IconHealMP:num
 * @text Icon
 * @parent HealMP
 * @desc Icon used for this event in the Combat Log.
 * @default 72
 *
 * @param TextColorHealMP:num
 * @text Text Color
 * @parent HealMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 4
 * 
 * @param DmgMP
 * @text MP Damage
 * @parent MP
 *
 * @param IconDmgMP:num
 * @text Icon
 * @parent DmgMP
 * @desc Icon used for this event in the Combat Log.
 * @default 171
 *
 * @param TextColorDmgMP:num
 * @text Text Color
 * @parent DmgMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 5
 * 
 * @param NoDmgMP
 * @text No MP Damage
 * @parent MP
 *
 * @param IconNoDmgMP:num
 * @text Icon
 * @parent NoDmgMP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgMP:num
 * @text Text Color
 * @parent NoDmgMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param TP
 * @text TP Settings
 *
 * @param ShowTP:eval
 * @text Show?
 * @parent TP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealTP
 * @text TP Heal
 * @parent TP
 *
 * @param IconHealTP:num
 * @text Icon
 * @parent HealTP
 * @desc Icon used for this event in the Combat Log.
 * @default 164
 *
 * @param TextColorHealTP:num
 * @text Text Color
 * @parent HealTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 24
 * 
 * @param DmgTP
 * @text TP Damage
 * @parent TP
 *
 * @param IconDmgTP:num
 * @text Icon
 * @parent DmgTP
 * @desc Icon used for this event in the Combat Log.
 * @default 170
 *
 * @param TextColorDmgTP:num
 * @text Text Color
 * @parent DmgTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 28
 * 
 * @param NoDmgTP
 * @text No TP Damage
 * @parent TP
 *
 * @param IconNoDmgTP:num
 * @text Icon
 * @parent NoDmgTP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgTP:num
 * @text Text Color
 * @parent NoDmgTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param States
 * @text State Settings
 *
 * @param ShowStateAdd:eval
 * @text Show State Add?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowStateRemove:eval
 * @text Show State Remove?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowStateCurrent:eval
 * @text Show State Current?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param Buffs
 * @text Buff & Debuff Settings
 *
 * @param ShowAddBuff:eval
 * @text Show Add Buff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowAddDebuff:eval
 * @text Show Add Debuff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowEraseBuff:eval
 * @text Show Erase Buff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param Counter
 * @text Counterattack
 *
 * @param ShowCounter:eval
 * @text Show?
 * @parent Counter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconCounter:num
 * @text Icon
 * @parent Counter
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 * 
 * @param Reflect
 * @text Reflection
 *
 * @param ShowReflect:eval
 * @text Show?
 * @parent Reflect
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconReflect:num
 * @text Icon
 * @parent Reflect
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 * 
 * @param Subst
 * @text Substitute
 *
 * @param ShowSubst:eval
 * @text Show?
 * @parent Subst
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconSubst:num
 * @text Icon
 * @parent Subst
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 * 
 * @param Fail
 * @text Effect Failure
 *
 * @param ShowFail:eval
 * @text Show?
 * @parent Fail
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconFail:num
 * @text Icon
 * @parent Fail
 * @desc Icon used for this event in the Combat Log.
 * @default 166
 * 
 * @param Critical
 * @text Critical Hit
 *
 * @param ShowCritical:eval
 * @text Show?
 * @parent Critical
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconCritical:num
 * @text Icon
 * @parent Critical
 * @desc Icon used for this event in the Combat Log.
 * @default 87
 * 
 * @param Miss
 * @text Missed Hit
 *
 * @param ShowMiss:eval
 * @text Show?
 * @parent Miss
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconMiss:num
 * @text Icon
 * @parent Miss
 * @desc Icon used for this event in the Combat Log.
 * @default 82
 * 
 * @param Evade
 * @text Evaded Hit
 *
 * @param ShowEvade:eval
 * @text Show?
 * @parent Evade
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEvade:num
 * @text Icon
 * @parent Evade
 * @desc Icon used for this event in the Combat Log.
 * @default 82
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param CombatLogBattle
 * @text Combat Log (Battle)
 *
 * @param CombatLogBattle_BgType:num
 * @text Background Type
 * @parent CombatLogBattle
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 1
 *
 * @param CombatLogBattle_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatLogBattle
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = Graphics.boxHeight;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CombatLogMenu
 * @text Combat Log (Menu)
 *
 * @param CombatLogMenu_BgType:num
 * @text Background Type
 * @parent CombatLogMenu
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CombatLogMenu_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatLogMenu
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._historyWindow.y + this._historyWindow.height;\nconst ww = Graphics.boxWidth;\nconst wh = this.mainAreaHeight() - this._historyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CombatHistory
 * @text Combat History (Menu)
 *
 * @param CombatHistoryLatest:str
 * @text Latest Command
 * @parent CombatHistory
 * @desc Text displayed for latest battle.
 * %1 - Battle Count
 * @default Latest
 *
 * @param CombatHistoryPrevious:str
 * @text Past Command
 * @parent CombatHistory
 * @desc Text displayed for past battles.
 * %1 - Battle Count
 * @default Battle #%1
 *
 * @param CombatHistory_BgType:num
 * @text Background Type
 * @parent CombatHistory
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CombatHistory_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatHistory
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Compatibility Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Compatibility:
 *
 * @param VisuMZ_2_BattleSystemATB
 * @text Battle System - ATB
 * 
 * @param VisuMZ_2_BattleSystemATB_Interrupt
 * @text Interrupt
 * @parent VisuMZ_2_BattleSystemATB
 *
 * @param ShowBattleSysAtbInterrupt:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysAtbInterrupt:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @desc Icon used for this event in the Combat Log.
 * @default 78
 *
 * @param TextBattleSysAtbInterrupt:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 has been interrupted!
 *
 * @param VisuMZ_2_BattleSystemCTB
 * @text Battle System - CTB
 * 
 * @param VisuMZ_2_BattleSystemCTB_OrderChange
 * @text Order Change
 * @parent VisuMZ_2_BattleSystemCTB
 *
 * @param ShowBattleSysCtbOrderChange:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysCtbOrderChange:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @desc Icon used for this event in the Combat Log.
 * @default 75
 *
 * @param TextBattleSysCtbOrderChange:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's turn order has changed!
 *
 * @param VisuMZ_2_BattleSystemSTB
 * @text Battle System - STB
 * 
 * @param VisuMZ_2_BattleSystemSTB_Instant
 * @text Instant
 * @parent VisuMZ_2_BattleSystemSTB
 *
 * @param ShowBattleSysStbInstant:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysStbInstant:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @desc Icon used for this event in the Combat Log.
 * @default 73
 *
 * @param TextBattleSysStbInstant:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's gains an extra action!
 *
 * @param VisuMZ_3_AntiDmgBarriers
 * @text Anti-Damage Barriers
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Cancel
 * @text Cancel Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Cancel:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Cancel
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Cancel:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Cancel
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 cancels damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Nullify
 * @text Nullify Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Nullify:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Nullify
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Nullify:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Nullify
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 nullifies damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Reduce
 * @text Reduction Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Reduce:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Reduce:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 reduces damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Reduce
 * @text Reduction Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Reduce:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Reduce:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 reduces damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Absorb
 * @text Absorption Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Absorb:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Absorb
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Absorb:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Absorb
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - Damage
 * @default %2 absorbs \C[5]%2\C[0] damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @text MP Dispersion Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_MpDisperse:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_MpDisperse:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - MP
 * @default %2 dispersed damage to %1's %3!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @text TP Dispersion Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_TpDisperse:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_TpDisperse:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - TP
 * @default %2 dispersed damage to %1's %3!
 *
 * @param VisuMZ_3_LifeStateEffects
 * @text Life State Effects
 * 
 * @param VisuMZ_3_LifeStateEffects_AutoLife
 * @text Auto Life
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_AutoLife:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_AutoLife:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @desc Icon used for this event in the Combat Log.
 * @default 70
 *
 * @param Text_LifeStateEffects_AutoLife:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 is automatically revived!
 * 
 * @param VisuMZ_3_LifeStateEffects_Curse
 * @text Curse
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Curse:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Curse:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @desc Icon used for this event in the Combat Log.
 * @default 71
 *
 * @param Text_LifeStateEffects_Curse:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's curse takes hold...
 * 
 * @param VisuMZ_3_LifeStateEffects_Doom
 * @text Doom
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Doom:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Doom:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @desc Icon used for this event in the Combat Log.
 * @default 1
 *
 * @param Text_LifeStateEffects_Doom:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 has fallen to doom.
 * 
 * @param VisuMZ_3_LifeStateEffects_Fragile
 * @text Fragile
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Fragile:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Fragile:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @desc Icon used for this event in the Combat Log.
 * @default 166
 *
 * @param Text_LifeStateEffects_Fragile:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 was too fragile!
 * 
 * @param VisuMZ_3_LifeStateEffects_Guts
 * @text Guts
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Guts:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Guts:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 *
 * @param Text_LifeStateEffects_Guts:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 powers through a fatal blow!
 * 
 * @param VisuMZ_3_LifeStateEffects_Undead
 * @text Undead
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Undead:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Undead:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @desc Icon used for this event in the Combat Log.
 * @default 10
 *
 * @param Text_LifeStateEffects_Undead:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 suffers from being undead!
 *
 * @param VisuMZ_3_StealItems
 * @text Steal Items
 * 
 * @param VisuMZ_3_StealItems_Steal
 * @text Steal Text
 * @parent VisuMZ_3_StealItems
 *
 * @param Show_StealItems_Steal:eval
 * @text Show?
 * @parent VisuMZ_3_StealItems_Steal
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_StealItems_Steal:num
 * @text Icon
 * @parent VisuMZ_3_StealItems_Steal
 * @desc Icon used for this event in the Combat Log.
 * @default 142
 *
 */
//=============================================================================

const _0x2c528f=_0x1d6d;function _0x1d6d(_0x4548eb,_0xf84ca1){const _0x36c082=_0x36c0();return _0x1d6d=function(_0x1d6d05,_0x3f3783){_0x1d6d05=_0x1d6d05-0xb9;let _0x320acd=_0x36c082[_0x1d6d05];return _0x320acd;},_0x1d6d(_0x4548eb,_0xf84ca1);}(function(_0xdd3ba8,_0x5d3a8e){const _0x2fbd3e=_0x1d6d,_0xdba169=_0xdd3ba8();while(!![]){try{const _0x5abf58=parseInt(_0x2fbd3e(0x1a6))/0x1+-parseInt(_0x2fbd3e(0x150))/0x2+parseInt(_0x2fbd3e(0x126))/0x3*(parseInt(_0x2fbd3e(0x21d))/0x4)+-parseInt(_0x2fbd3e(0x1b0))/0x5*(-parseInt(_0x2fbd3e(0x1cf))/0x6)+parseInt(_0x2fbd3e(0x283))/0x7*(-parseInt(_0x2fbd3e(0x250))/0x8)+parseInt(_0x2fbd3e(0xf6))/0x9+-parseInt(_0x2fbd3e(0x25e))/0xa;if(_0x5abf58===_0x5d3a8e)break;else _0xdba169['push'](_0xdba169['shift']());}catch(_0x1a4775){_0xdba169['push'](_0xdba169['shift']());}}}(_0x36c0,0x2dd00));var label=_0x2c528f(0x1ba),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x455ac0){const _0x273efe=_0x2c528f;return _0x455ac0[_0x273efe(0x281)]&&_0x455ac0['description'][_0x273efe(0x197)]('['+label+']');})[0x0];VisuMZ[label][_0x2c528f(0xd6)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x2c528f(0x259)]=function(_0x4fb6d2,_0x1c84ce){const _0x10eaa0=_0x2c528f;for(const _0x3b9dc7 in _0x1c84ce){if(_0x3b9dc7['match'](/(.*):(.*)/i)){const _0x459978=String(RegExp['$1']),_0x419d9d=String(RegExp['$2'])[_0x10eaa0(0x296)]()[_0x10eaa0(0x123)]();let _0x47cece,_0x18e1fe,_0x1607ff;switch(_0x419d9d){case _0x10eaa0(0x21a):_0x47cece=_0x1c84ce[_0x3b9dc7]!==''?Number(_0x1c84ce[_0x3b9dc7]):0x0;break;case'ARRAYNUM':_0x18e1fe=_0x1c84ce[_0x3b9dc7]!==''?JSON[_0x10eaa0(0xc2)](_0x1c84ce[_0x3b9dc7]):[],_0x47cece=_0x18e1fe[_0x10eaa0(0x1b4)](_0x2cb68=>Number(_0x2cb68));break;case _0x10eaa0(0x290):_0x47cece=_0x1c84ce[_0x3b9dc7]!==''?eval(_0x1c84ce[_0x3b9dc7]):null;break;case'ARRAYEVAL':_0x18e1fe=_0x1c84ce[_0x3b9dc7]!==''?JSON['parse'](_0x1c84ce[_0x3b9dc7]):[],_0x47cece=_0x18e1fe['map'](_0x2a4bbc=>eval(_0x2a4bbc));break;case _0x10eaa0(0x113):_0x47cece=_0x1c84ce[_0x3b9dc7]!==''?JSON['parse'](_0x1c84ce[_0x3b9dc7]):'';break;case _0x10eaa0(0x27e):_0x18e1fe=_0x1c84ce[_0x3b9dc7]!==''?JSON['parse'](_0x1c84ce[_0x3b9dc7]):[],_0x47cece=_0x18e1fe[_0x10eaa0(0x1b4)](_0x17320d=>JSON[_0x10eaa0(0xc2)](_0x17320d));break;case _0x10eaa0(0x1e1):_0x47cece=_0x1c84ce[_0x3b9dc7]!==''?new Function(JSON['parse'](_0x1c84ce[_0x3b9dc7])):new Function('return\x200');break;case'ARRAYFUNC':_0x18e1fe=_0x1c84ce[_0x3b9dc7]!==''?JSON[_0x10eaa0(0xc2)](_0x1c84ce[_0x3b9dc7]):[],_0x47cece=_0x18e1fe['map'](_0x5bf3af=>new Function(JSON[_0x10eaa0(0xc2)](_0x5bf3af)));break;case _0x10eaa0(0x178):_0x47cece=_0x1c84ce[_0x3b9dc7]!==''?String(_0x1c84ce[_0x3b9dc7]):'';break;case _0x10eaa0(0x129):_0x18e1fe=_0x1c84ce[_0x3b9dc7]!==''?JSON[_0x10eaa0(0xc2)](_0x1c84ce[_0x3b9dc7]):[],_0x47cece=_0x18e1fe[_0x10eaa0(0x1b4)](_0x5e3b8b=>String(_0x5e3b8b));break;case _0x10eaa0(0x16c):_0x1607ff=_0x1c84ce[_0x3b9dc7]!==''?JSON[_0x10eaa0(0xc2)](_0x1c84ce[_0x3b9dc7]):{},_0x47cece=VisuMZ[_0x10eaa0(0x259)]({},_0x1607ff);break;case _0x10eaa0(0x27f):_0x18e1fe=_0x1c84ce[_0x3b9dc7]!==''?JSON[_0x10eaa0(0xc2)](_0x1c84ce[_0x3b9dc7]):[],_0x47cece=_0x18e1fe[_0x10eaa0(0x1b4)](_0x152c3a=>VisuMZ['ConvertParams']({},JSON['parse'](_0x152c3a)));break;default:continue;}_0x4fb6d2[_0x459978]=_0x47cece;}}return _0x4fb6d2;},(_0x573b8a=>{const _0x72a73e=_0x2c528f,_0x54ea4b=_0x573b8a[_0x72a73e(0x18a)];for(const _0x417d9d of dependencies){if(!Imported[_0x417d9d]){alert(_0x72a73e(0x1db)[_0x72a73e(0xe1)](_0x54ea4b,_0x417d9d)),SceneManager[_0x72a73e(0x13c)]();break;}}const _0x3ce860=_0x573b8a[_0x72a73e(0x288)];if(_0x3ce860[_0x72a73e(0x179)](/\[Version[ ](.*?)\]/i)){const _0x561d20=Number(RegExp['$1']);_0x561d20!==VisuMZ[label][_0x72a73e(0xe5)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x54ea4b,_0x561d20)),SceneManager[_0x72a73e(0x13c)]());}if(_0x3ce860['match'](/\[Tier[ ](\d+)\]/i)){const _0xcb966f=Number(RegExp['$1']);_0xcb966f<tier?(alert(_0x72a73e(0xf8)[_0x72a73e(0xe1)](_0x54ea4b,_0xcb966f,tier)),SceneManager[_0x72a73e(0x13c)]()):tier=Math[_0x72a73e(0x23d)](_0xcb966f,tier);}VisuMZ[_0x72a73e(0x259)](VisuMZ[label][_0x72a73e(0xd6)],_0x573b8a['parameters']);})(pluginData),PluginManager[_0x2c528f(0x284)](pluginData['name'],_0x2c528f(0x231),_0x379ea6=>{const _0x1c7d2b=_0x2c528f;VisuMZ['ConvertParams'](_0x379ea6,_0x379ea6);const _0x33a389=_0x379ea6['Text'],_0x21d8e6=_0x379ea6[_0x1c7d2b(0x11c)];$gameSystem[_0x1c7d2b(0x26b)](_0x33a389,_0x21d8e6);}),PluginManager['registerCommand'](pluginData['name'],_0x2c528f(0xba),_0x3b9ca8=>{const _0x510ada=_0x2c528f;VisuMZ[_0x510ada(0x259)](_0x3b9ca8,_0x3b9ca8),$gameSystem[_0x510ada(0x1ff)]();}),PluginManager[_0x2c528f(0x284)](pluginData[_0x2c528f(0x18a)],'CombatLogBypass',_0x575289=>{const _0x56b791=_0x2c528f;VisuMZ[_0x56b791(0x259)](_0x575289,_0x575289);const _0x5500d2=_0x575289[_0x56b791(0x107)];$gameSystem[_0x56b791(0x1dc)](_0x5500d2);}),PluginManager[_0x2c528f(0x284)](pluginData[_0x2c528f(0x18a)],_0x2c528f(0x23a),_0x469eb2=>{const _0x1efe1d=_0x2c528f;VisuMZ[_0x1efe1d(0x259)](_0x469eb2,_0x469eb2);const _0x1e4b3b=_0x469eb2['Enable'];$gameSystem[_0x1efe1d(0xd9)](_0x1e4b3b);}),PluginManager[_0x2c528f(0x284)](pluginData[_0x2c528f(0x18a)],_0x2c528f(0x16a),_0xfe3d2f=>{const _0x1f25f7=_0x2c528f;VisuMZ['ConvertParams'](_0xfe3d2f,_0xfe3d2f);const _0x5cbb43=_0xfe3d2f[_0x1f25f7(0x201)];$gameSystem['setMainMenuCombatLogVisible'](_0x5cbb43);}),PluginManager[_0x2c528f(0x284)](pluginData[_0x2c528f(0x18a)],_0x2c528f(0x273),_0x18db44=>{const _0x8577ab=_0x2c528f;VisuMZ[_0x8577ab(0x259)](_0x18db44,_0x18db44);const _0x5a5e8b=_0x18db44['Show'];$gameSystem[_0x8577ab(0x20c)](_0x5a5e8b);}),PluginManager[_0x2c528f(0x284)](pluginData[_0x2c528f(0x18a)],_0x2c528f(0x18e),_0x552363=>{const _0xc47a79=_0x2c528f;VisuMZ[_0xc47a79(0x259)](_0x552363,_0x552363);const _0x4c5e1c=_0x552363[_0xc47a79(0x201)];$gameSystem[_0xc47a79(0x211)](_0x4c5e1c);}),VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x268)]={'BypassCombatLog':/<BYPASS COMBAT LOG>/i},ImageManager[_0x2c528f(0x210)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x1e2)][_0x2c528f(0x11c)],ImageManager['combatLog_BattleStart_Icon']=VisuMZ[_0x2c528f(0x1ba)]['Settings']['CombatLog']['IconBattleStart'],ImageManager[_0x2c528f(0x151)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)]['CombatLog'][_0x2c528f(0x22a)],ImageManager[_0x2c528f(0x1d6)]=VisuMZ['CombatLog'][_0x2c528f(0xd6)][_0x2c528f(0x1ba)][_0x2c528f(0xca)],ImageManager['combatLog_Surprise_Icon']=VisuMZ['CombatLog'][_0x2c528f(0xd6)][_0x2c528f(0x1ba)]['IconSurprise'],ImageManager[_0x2c528f(0xd0)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x1ba)][_0x2c528f(0x1c1)],ImageManager[_0x2c528f(0x166)]=VisuMZ[_0x2c528f(0x1ba)]['Settings'][_0x2c528f(0x1ba)][_0x2c528f(0x120)],ImageManager['combatLog_Result_Victory']=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x1ba)][_0x2c528f(0x1bf)],ImageManager[_0x2c528f(0x124)]=VisuMZ[_0x2c528f(0x1ba)]['Settings'][_0x2c528f(0x1ba)][_0x2c528f(0x1f3)],ImageManager['combatLog_Result_Defeat']=VisuMZ[_0x2c528f(0x1ba)]['Settings']['CombatLog']['IconDefeat'],ImageManager[_0x2c528f(0x18c)]=VisuMZ[_0x2c528f(0x1ba)]['Settings'][_0x2c528f(0x1ba)][_0x2c528f(0xc3)],ImageManager[_0x2c528f(0x12e)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)]['CombatLog'][_0x2c528f(0x1ed)],ImageManager[_0x2c528f(0x267)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x1ba)][_0x2c528f(0x1fb)],ImageManager[_0x2c528f(0x12d)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x1ba)][_0x2c528f(0x22e)],ImageManager[_0x2c528f(0xf9)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x1ba)]['IconCritical'],ImageManager['combatLog_Miss_Icon']=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x1ba)]['IconMiss'],ImageManager[_0x2c528f(0x1b6)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)]['CombatLog'][_0x2c528f(0x203)],ImageManager[_0x2c528f(0xd5)]=VisuMZ['CombatLog'][_0x2c528f(0xd6)][_0x2c528f(0x1ba)][_0x2c528f(0x238)],ImageManager[_0x2c528f(0x17c)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x1ba)]['IconDmgHP'],ImageManager['combatLog_HP_NoDmg']=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)]['CombatLog'][_0x2c528f(0x230)],ImageManager[_0x2c528f(0x272)]=VisuMZ[_0x2c528f(0x1ba)]['Settings'][_0x2c528f(0x1ba)]['IconHealMP'],ImageManager[_0x2c528f(0x27d)]=VisuMZ[_0x2c528f(0x1ba)]['Settings'][_0x2c528f(0x1ba)]['IconDmgMP'],ImageManager[_0x2c528f(0x103)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x1ba)][_0x2c528f(0x29f)],ImageManager[_0x2c528f(0x26a)]=VisuMZ[_0x2c528f(0x1ba)]['Settings'][_0x2c528f(0x1ba)][_0x2c528f(0x270)],ImageManager[_0x2c528f(0x1fc)]=VisuMZ[_0x2c528f(0x1ba)]['Settings'][_0x2c528f(0x1ba)]['IconDmgTP'],ImageManager[_0x2c528f(0x19e)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)]['CombatLog'][_0x2c528f(0x106)],TextManager[_0x2c528f(0x247)]=VisuMZ['CombatLog']['Settings'][_0x2c528f(0x1e2)][_0x2c528f(0x256)],TextManager[_0x2c528f(0x1fd)]=VisuMZ['CombatLog'][_0x2c528f(0xd6)][_0x2c528f(0x1ba)][_0x2c528f(0x136)],TextManager[_0x2c528f(0x251)]=VisuMZ[_0x2c528f(0x1ba)]['Settings'][_0x2c528f(0x1ba)][_0x2c528f(0x23b)],TextManager[_0x2c528f(0x112)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x1ba)][_0x2c528f(0xec)],TextManager[_0x2c528f(0x163)]=VisuMZ['CombatLog'][_0x2c528f(0xd6)]['General']['BattleHelpCombatLog']??_0x2c528f(0x1d9),TextManager[_0x2c528f(0x1cc)]=VisuMZ[_0x2c528f(0x1ba)]['Settings'][_0x2c528f(0x119)][_0x2c528f(0x138)],TextManager[_0x2c528f(0x188)]=VisuMZ['CombatLog']['Settings']['Window'][_0x2c528f(0x176)],ColorManager['combatLog_HP_Heal']=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)]['CombatLog'][_0x2c528f(0x24f)],ColorManager[_0x2c528f(0x17c)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x1ba)][_0x2c528f(0x232)],ColorManager[_0x2c528f(0xcc)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)]['CombatLog'][_0x2c528f(0x160)],ColorManager[_0x2c528f(0x272)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x1ba)][_0x2c528f(0x224)],ColorManager[_0x2c528f(0x27d)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x1ba)][_0x2c528f(0x17b)],ColorManager['combatLog_MP_NoDmg']=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x1ba)][_0x2c528f(0x29f)],ColorManager[_0x2c528f(0x26a)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)]['CombatLog'][_0x2c528f(0x293)],ColorManager['combatLog_TP_Dmg']=VisuMZ[_0x2c528f(0x1ba)]['Settings']['CombatLog']['TextColorDmgTP'],ColorManager[_0x2c528f(0x19e)]=VisuMZ[_0x2c528f(0x1ba)]['Settings'][_0x2c528f(0x1ba)]['TextColorNoDmgTP'],ColorManager[_0x2c528f(0x1bb)]=function(_0x30ca56,_0x2dc902){const _0x500cd9=_0x2c528f;if(!VisuMZ[_0x500cd9(0x1ba)][_0x500cd9(0xd6)][_0x500cd9(0x1ba)]['ColorNumbers'])return Math[_0x500cd9(0x28d)](_0x2dc902);const _0x462308=_0x500cd9(0x1bc);let _0x581689;if(_0x2dc902>0x0)_0x581689=_0x462308[_0x500cd9(0xe1)](_0x30ca56,'Heal');else _0x2dc902===0x0?_0x581689=_0x462308[_0x500cd9(0xe1)](_0x30ca56,_0x500cd9(0x21c)):_0x581689=_0x462308['format'](_0x30ca56,'Dmg');return _0x2dc902=Math[_0x500cd9(0x28d)](_0x2dc902),ColorManager[_0x581689]?'\x5cC[%1]%2\x5cC[0]'[_0x500cd9(0xe1)](ColorManager[_0x581689],_0x2dc902):_0x2dc902;},SceneManager[_0x2c528f(0xd4)]=function(){const _0x1001a5=_0x2c528f;return this[_0x1001a5(0x130)]&&this[_0x1001a5(0x130)][_0x1001a5(0x271)]===Scene_Battle;},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x15b)]=BattleManager[_0x2c528f(0x191)],BattleManager['startBattle']=function(){const _0x5006ea=_0x2c528f;VisuMZ[_0x5006ea(0x1ba)][_0x5006ea(0x15b)][_0x5006ea(0x114)](this),this['startBattleCombatLog']();},BattleManager['startBattleCombatLog']=function(){const _0x1eafd1=_0x2c528f,_0x27e8c2=VisuMZ[_0x1eafd1(0x1ba)][_0x1eafd1(0xd6)][_0x1eafd1(0x1ba)];if(_0x27e8c2[_0x1eafd1(0x15a)]){$gameSystem[_0x1eafd1(0x187)](),$gameSystem['setBypassCombatLog'](![]),$gameSystem[_0x1eafd1(0x1ff)]();let _0x2e9cc0=TextManager['combatLog_BattleStart'],_0x16d45e=ImageManager['combatLog_BattleStart_Icon'];$gameSystem['addTextToCombatLog'](_0x2e9cc0,_0x16d45e),$gameSystem[_0x1eafd1(0x1ff)]();}if(_0x27e8c2[_0x1eafd1(0x134)])for(const _0x1cbb14 of $gameTroop[_0x1eafd1(0x289)]()){let _0x126266=TextManager['emerge'][_0x1eafd1(0xe1)](_0x1cbb14[_0x1eafd1(0xcf)]()),_0x2a0bbd=ImageManager['combatLog_EnemyEmerge_Icon'];$gameSystem['addTextToCombatLog'](_0x126266,_0x2a0bbd);}if(_0x27e8c2[_0x1eafd1(0x1d4)]){if(this[_0x1eafd1(0x228)]){let _0x51c28f=TextManager[_0x1eafd1(0xf0)][_0x1eafd1(0xe1)]($gameParty[_0x1eafd1(0xcf)]()),_0x25e47a=ImageManager[_0x1eafd1(0x1d6)];$gameSystem[_0x1eafd1(0x26b)](_0x51c28f,_0x25e47a);}else{if(this[_0x1eafd1(0x26e)]){let _0x299604=TextManager[_0x1eafd1(0x1dd)]['format']($gameParty[_0x1eafd1(0xcf)]()),_0x4f23aa=ImageManager['combatLog_Surprise_Icon'];$gameSystem[_0x1eafd1(0x26b)](_0x299604,_0x4f23aa);}}}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x28b)]=BattleManager[_0x2c528f(0x1da)],BattleManager[_0x2c528f(0x1da)]=function(){const _0x26c13e=_0x2c528f;if($gameTroop[_0x26c13e(0x127)]()>0x0&&VisuMZ['CombatLog'][_0x26c13e(0xd6)][_0x26c13e(0x1ba)][_0x26c13e(0x169)]){$gameSystem[_0x26c13e(0x1ff)]();let _0xc498d2=TextManager[_0x26c13e(0x112)][_0x26c13e(0xe1)]($gameTroop[_0x26c13e(0x127)]()),_0x4da7f3=ImageManager['combatLog_EndTurn_Icon'];$gameSystem[_0x26c13e(0x26b)](_0xc498d2,_0x4da7f3),$gameSystem[_0x26c13e(0x1ff)]();}VisuMZ[_0x26c13e(0x1ba)]['BattleManager_endTurn'][_0x26c13e(0x114)](this);},VisuMZ[_0x2c528f(0x1ba)]['BattleManager_updateTurnEnd']=BattleManager[_0x2c528f(0x1c8)],BattleManager[_0x2c528f(0x1c8)]=function(){const _0x1c279c=_0x2c528f;VisuMZ[_0x1c279c(0x1ba)][_0x1c279c(0x14b)][_0x1c279c(0x114)](this);if(this['isTpb']()&&VisuMZ[_0x1c279c(0x1ba)][_0x1c279c(0xd6)][_0x1c279c(0x1ba)]['ShowStartTurn']&&$gameTroop[_0x1c279c(0x127)]()>0x0){$gameSystem['addHorzLineToCombatLog']();let _0xf15f2c=TextManager[_0x1c279c(0x251)][_0x1c279c(0xe1)]($gameTroop[_0x1c279c(0x127)]()),_0x4925d1=ImageManager[_0x1c279c(0xd0)];$gameSystem[_0x1c279c(0x26b)](_0xf15f2c,_0x4925d1);}},VisuMZ['CombatLog']['BattleManager_processVictory']=BattleManager[_0x2c528f(0x20b)],BattleManager[_0x2c528f(0x20b)]=function(){const _0xb472fe=_0x2c528f;$gameSystem[_0xb472fe(0x1dc)](!![]),VisuMZ['CombatLog'][_0xb472fe(0x266)][_0xb472fe(0x114)](this),$gameSystem['setBypassCombatLog'](![]);if(VisuMZ['CombatLog'][_0xb472fe(0xd6)]['CombatLog'][_0xb472fe(0x252)]){$gameSystem[_0xb472fe(0x1ff)]();let _0xf06538=TextManager['victory']['format']($gameParty[_0xb472fe(0xcf)]()),_0x1fb2cc=ImageManager['combatLog_Result_Victory'];$gameSystem[_0xb472fe(0x26b)](_0xf06538,_0x1fb2cc),$gameSystem[_0xb472fe(0x1ff)]();}},VisuMZ['CombatLog'][_0x2c528f(0x1ac)]=BattleManager[_0x2c528f(0x24d)],BattleManager['processAbort']=function(){const _0x3fccd7=_0x2c528f;$gameSystem['setBypassCombatLog'](!![]),VisuMZ['CombatLog'][_0x3fccd7(0x1ac)][_0x3fccd7(0x114)](this),$gameSystem[_0x3fccd7(0x1dc)](![]),$gameSystem[_0x3fccd7(0x1ff)]();},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x261)]=BattleManager[_0x2c528f(0x1a9)],BattleManager['onEscapeSuccess']=function(){const _0x394d14=_0x2c528f;VisuMZ[_0x394d14(0x1ba)][_0x394d14(0x261)][_0x394d14(0x114)](this);if(VisuMZ[_0x394d14(0x1ba)][_0x394d14(0xd6)][_0x394d14(0x1ba)][_0x394d14(0x1f0)]){$gameSystem['addHorzLineToCombatLog']();let _0x16901e=TextManager[_0x394d14(0x213)][_0x394d14(0xe1)]($gameParty[_0x394d14(0xcf)]()),_0x10d4da=ImageManager[_0x394d14(0x124)];$gameSystem[_0x394d14(0x26b)](_0x16901e,_0x10d4da),$gameSystem[_0x394d14(0x1ff)]();}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xf3)]=BattleManager['onEscapeFailure'],BattleManager[_0x2c528f(0x207)]=function(){const _0x5cbb29=_0x2c528f;VisuMZ[_0x5cbb29(0x1ba)][_0x5cbb29(0xf3)][_0x5cbb29(0x114)](this);if(VisuMZ[_0x5cbb29(0x1ba)][_0x5cbb29(0xd6)]['CombatLog']['ShowEscape']){$gameSystem[_0x5cbb29(0x1ff)]();let _0xceec0=TextManager[_0x5cbb29(0x213)]['format']($gameParty[_0x5cbb29(0xcf)]()),_0x12f3a3=ImageManager[_0x5cbb29(0x124)];$gameSystem[_0x5cbb29(0x26b)](_0xceec0,_0x12f3a3),$gameSystem['addTextToCombatLog'](TextManager[_0x5cbb29(0xbc)],_0x12f3a3),$gameSystem['addHorzLineToCombatLog']();}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x12f)]=BattleManager[_0x2c528f(0x254)],BattleManager[_0x2c528f(0x254)]=function(){const _0x15c003=_0x2c528f;VisuMZ['CombatLog'][_0x15c003(0x12f)]['call'](this);if(VisuMZ[_0x15c003(0x1ba)][_0x15c003(0xd6)][_0x15c003(0x1ba)][_0x15c003(0x1e5)]){$gameSystem['addHorzLineToCombatLog']();let _0x3cbb12=TextManager[_0x15c003(0xe6)][_0x15c003(0xe1)]($gameParty[_0x15c003(0xcf)]()),_0x54ad66=ImageManager[_0x15c003(0x28e)];$gameSystem['addTextToCombatLog'](_0x3cbb12,_0x54ad66),$gameSystem['addHorzLineToCombatLog']();}},VisuMZ['CombatLog'][_0x2c528f(0x110)]=Game_System['prototype'][_0x2c528f(0x25d)],Game_System[_0x2c528f(0x12a)][_0x2c528f(0x25d)]=function(){const _0x58d7e9=_0x2c528f;VisuMZ[_0x58d7e9(0x1ba)][_0x58d7e9(0x110)]['call'](this),this[_0x58d7e9(0x18f)](),this[_0x58d7e9(0x154)]();},Game_System[_0x2c528f(0xdc)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)]['General']['StoredLogs']??0x5,Game_System[_0x2c528f(0x12a)][_0x2c528f(0x18f)]=function(){const _0x86fe44=_0x2c528f;this[_0x86fe44(0xc0)]=[],this[_0x86fe44(0x1b5)]=![];},Game_System[_0x2c528f(0x12a)][_0x2c528f(0x27b)]=function(_0x56e76f){const _0x88f9ba=_0x2c528f;if(this[_0x88f9ba(0xc0)]===undefined)this[_0x88f9ba(0x18f)]();return _0x56e76f=_0x56e76f||0x0,this[_0x88f9ba(0xc0)][_0x56e76f]=this[_0x88f9ba(0xc0)][_0x56e76f]||[],this[_0x88f9ba(0xc0)][_0x56e76f];},Game_System[_0x2c528f(0x12a)][_0x2c528f(0x26b)]=function(_0x169406,_0x141e35){const _0x2297d7=_0x2c528f;if(this[_0x2297d7(0x23c)]())return;if(!_0x169406)return;_0x141e35=_0x141e35||0x0,_0x169406=VisuMZ['CombatLog'][_0x2297d7(0x21f)](_0x169406);const _0x472ec8=this['getCombatLog'](),_0x38a38b=_0x169406[_0x2297d7(0x190)]('\x0a');while(_0x38a38b['length']>0x0){let _0x37b836=_0x38a38b[_0x2297d7(0x1d0)]();VisuMZ[_0x2297d7(0x1ba)]['Settings']['CombatLog']['ShowIcons']&&(_0x37b836=_0x2297d7(0x1f4)[_0x2297d7(0xe1)](_0x141e35,_0x37b836)),_0x141e35=0x0,_0x472ec8[_0x2297d7(0x128)](_0x37b836);}this[_0x2297d7(0x24e)]();},Game_System['prototype'][_0x2c528f(0x1ff)]=function(){const _0x9321b1=_0x2c528f;if(this[_0x9321b1(0x23c)]())return;const _0x253170=this[_0x9321b1(0x27b)](),_0x5c9dc7=_0x253170[_0x253170['length']-0x1];if(_0x5c9dc7===_0x9321b1(0x249))return;_0x253170[_0x9321b1(0x128)](_0x9321b1(0x249)),this[_0x9321b1(0x24e)]();},VisuMZ[_0x2c528f(0x1ba)]['RemoveUnwantedTextCodes']=function(_0x386f84){const _0x45977b=_0x2c528f;while(_0x386f84[_0x45977b(0x179)](/\\V\[(\d+)\]/gi)){_0x386f84=_0x386f84['replace'](/\\V\[(\d+)\]/gi,(_0x261f6a,_0x1d054c)=>$gameVariables[_0x45977b(0x193)](parseInt(_0x1d054c)));}return _0x386f84;},Game_System[_0x2c528f(0x12a)][_0x2c528f(0x187)]=function(){const _0x189ba7=_0x2c528f;if(this['_combatLogs']===undefined)this[_0x189ba7(0x18f)]();this[_0x189ba7(0xc0)]['unshift']([]);while(this[_0x189ba7(0xc0)][_0x189ba7(0x1f6)]>Game_System[_0x189ba7(0xdc)]){this[_0x189ba7(0xc0)]['pop']();}},Game_System[_0x2c528f(0x12a)][_0x2c528f(0xc4)]=function(){const _0x1db111=_0x2c528f;if(this['_combatLogs']===undefined)this['initCombatLogBase']();return this[_0x1db111(0xc0)][_0x1db111(0x1f6)];},Game_System['prototype']['isBypassCombatLog']=function(){const _0x245586=_0x2c528f;if(this[_0x245586(0x1b5)]===undefined)this[_0x245586(0x18f)]();return this[_0x245586(0x1b5)];},Game_System[_0x2c528f(0x12a)]['setBypassCombatLog']=function(_0x179e04){const _0x24a232=_0x2c528f;if(this[_0x24a232(0x1b5)]===undefined)this[_0x24a232(0x18f)]();this[_0x24a232(0x1b5)]=_0x179e04;;},Game_System[_0x2c528f(0x12a)]['refreshCombatLog']=function(){const _0x3aee48=_0x2c528f;if(!SceneManager['isSceneBattle']())return;const _0x1c4980=SceneManager[_0x3aee48(0x130)]['_combatLogWindow'];_0x1c4980&&_0x1c4980[_0x3aee48(0x195)]();},Game_System[_0x2c528f(0x12a)][_0x2c528f(0x154)]=function(){const _0x454df9=_0x2c528f,_0x23beef=VisuMZ[_0x454df9(0x1ba)][_0x454df9(0xd6)][_0x454df9(0x1e2)];this[_0x454df9(0x1c0)]={'mainMenu':_0x23beef[_0x454df9(0x12c)],'partyCmd':_0x23beef[_0x454df9(0x19f)],'actorCmd':_0x23beef[_0x454df9(0x229)],'hotkeyOn':!![]};},Game_System[_0x2c528f(0x12a)][_0x2c528f(0x1f2)]=function(){const _0x2451da=_0x2c528f;if(this[_0x2451da(0x1c0)]===undefined)this[_0x2451da(0x154)]();return this[_0x2451da(0x1c0)][_0x2451da(0x1ab)];},Game_System['prototype'][_0x2c528f(0xfa)]=function(){const _0xbbe741=_0x2c528f;if(this[_0xbbe741(0xc0)]===undefined)this[_0xbbe741(0x18f)]();return this[_0xbbe741(0xc4)]()>0x0;},Game_System[_0x2c528f(0x12a)][_0x2c528f(0x19b)]=function(_0x597d7c){const _0x5f1c96=_0x2c528f;if(this[_0x5f1c96(0x1c0)]===undefined)this['initCombatLogAccess']();this[_0x5f1c96(0x1c0)][_0x5f1c96(0x1ab)]=_0x597d7c;},Game_System[_0x2c528f(0x12a)]['isPartyCmdCombatLogVisible']=function(){const _0x39bc6b=_0x2c528f;if(this[_0x39bc6b(0x1c0)]===undefined)this[_0x39bc6b(0x154)]();return this[_0x39bc6b(0x1c0)]['partyCmd'];},Game_System['prototype'][_0x2c528f(0x20c)]=function(_0x5f8973){const _0x32ad54=_0x2c528f;if(this[_0x32ad54(0x1c0)]===undefined)this['initCombatLogAccess']();this[_0x32ad54(0x1c0)][_0x32ad54(0x1c4)]=_0x5f8973;},Game_System['prototype'][_0x2c528f(0x260)]=function(){const _0x474d18=_0x2c528f;if(this[_0x474d18(0x1c0)]===undefined)this[_0x474d18(0x154)]();return this[_0x474d18(0x1c0)][_0x474d18(0x1a5)];},Game_System[_0x2c528f(0x12a)][_0x2c528f(0x211)]=function(_0x34ce08){const _0x2514be=_0x2c528f;if(this[_0x2514be(0x1c0)]===undefined)this[_0x2514be(0x154)]();this[_0x2514be(0x1c0)][_0x2514be(0x1a5)]=_0x34ce08;},Game_System[_0x2c528f(0x12a)][_0x2c528f(0x202)]=function(){const _0x26d0b2=_0x2c528f;if(this[_0x26d0b2(0x1c0)]===undefined)this[_0x26d0b2(0x154)]();return this[_0x26d0b2(0x1c0)][_0x26d0b2(0xf4)];},Game_System[_0x2c528f(0x12a)][_0x2c528f(0xd9)]=function(_0x255359){const _0xd23682=_0x2c528f;if(this[_0xd23682(0x1c0)]===undefined)this[_0xd23682(0x154)]();this['_combatLogAccess']['hotkeyOn']=_0x255359;},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x28a)]=Game_BattlerBase['prototype'][_0x2c528f(0x156)],Game_BattlerBase['prototype']['setHp']=function(_0x365dc6){const _0x298b39=_0x2c528f,_0x2bb1c0=this[_0x298b39(0x1a2)];VisuMZ[_0x298b39(0x1ba)][_0x298b39(0x28a)][_0x298b39(0x114)](this,_0x365dc6);if(!SceneManager['isSceneBattle']())return;if(this['_combatLogPayment'])return;if(!VisuMZ[_0x298b39(0x1ba)][_0x298b39(0xd6)][_0x298b39(0x1ba)]['ShowHP'])return;const _0x167527=_0x365dc6;let _0x111c1d,_0x33729e,_0x27c852=_0x167527-_0x2bb1c0;if(_0x167527>_0x2bb1c0)_0x111c1d=this[_0x298b39(0x116)]()?TextManager[_0x298b39(0x222)]:TextManager['enemyRecovery'],_0x33729e=ImageManager[_0x298b39(0xd5)];else _0x167527===_0x2bb1c0?(_0x111c1d=this[_0x298b39(0x116)]()?TextManager[_0x298b39(0x1b7)]:TextManager[_0x298b39(0x1a1)],_0x33729e=ImageManager[_0x298b39(0xcc)]):(_0x111c1d=this[_0x298b39(0x116)]()?TextManager['actorDamage']:TextManager[_0x298b39(0x196)],_0x33729e=ImageManager[_0x298b39(0x17c)]);_0x27c852=ColorManager[_0x298b39(0x1bb)]('HP',_0x27c852);let _0x25262c=_0x111c1d[_0x298b39(0xe1)](this[_0x298b39(0xcf)](),_0x27c852,TextManager['hp']);$gameSystem['addTextToCombatLog'](_0x25262c,_0x33729e);},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x219)]=Game_BattlerBase[_0x2c528f(0x12a)][_0x2c528f(0x177)],Game_BattlerBase[_0x2c528f(0x12a)]['setMp']=function(_0x1f5079){const _0x5d0bd2=_0x2c528f,_0x4a95c1=this['_mp'];VisuMZ[_0x5d0bd2(0x1ba)]['Game_BattlerBase_setMp'][_0x5d0bd2(0x114)](this,_0x1f5079);if(!SceneManager['isSceneBattle']())return;if(this[_0x5d0bd2(0x135)])return;if(!VisuMZ['CombatLog'][_0x5d0bd2(0xd6)][_0x5d0bd2(0x1ba)][_0x5d0bd2(0x157)])return;const _0x2127f8=_0x1f5079;let _0x4d41d9,_0x4c4cce,_0x31904e=_0x2127f8-_0x4a95c1;if(_0x2127f8>_0x4a95c1)_0x4d41d9=this[_0x5d0bd2(0x116)]()?TextManager['actorRecovery']:TextManager[_0x5d0bd2(0x274)],_0x4c4cce=ImageManager[_0x5d0bd2(0x272)];else _0x2127f8===_0x4a95c1?(_0x4d41d9=this[_0x5d0bd2(0x116)]()?TextManager[_0x5d0bd2(0x167)]:TextManager[_0x5d0bd2(0x240)],_0x4c4cce=ImageManager[_0x5d0bd2(0x103)]):(_0x4d41d9=this['isActor']()?TextManager[_0x5d0bd2(0x167)]:TextManager[_0x5d0bd2(0x240)],_0x4c4cce=ImageManager[_0x5d0bd2(0x27d)]);_0x31904e=ColorManager['applyCombatLogColor']('MP',_0x31904e);let _0x169f44=_0x4d41d9[_0x5d0bd2(0xe1)](this[_0x5d0bd2(0xcf)](),_0x31904e,TextManager['mp']);$gameSystem[_0x5d0bd2(0x26b)](_0x169f44,_0x4c4cce);},VisuMZ['CombatLog'][_0x2c528f(0xbe)]=Game_BattlerBase[_0x2c528f(0x12a)]['setTp'],Game_BattlerBase[_0x2c528f(0x12a)]['setTp']=function(_0x51e7e1){const _0xcce1c6=_0x2c528f,_0x4f1d3f=this[_0xcce1c6(0x185)];VisuMZ[_0xcce1c6(0x1ba)][_0xcce1c6(0xbe)][_0xcce1c6(0x114)](this,_0x51e7e1);if(!SceneManager[_0xcce1c6(0xd4)]())return;if(this[_0xcce1c6(0x135)])return;if(this[_0xcce1c6(0x13a)])return;if(!VisuMZ[_0xcce1c6(0x1ba)][_0xcce1c6(0xd6)][_0xcce1c6(0x1ba)][_0xcce1c6(0x295)])return;const _0x346896=_0x51e7e1;let _0x59395e,_0x2fa2c4,_0x5b8bfc=_0x346896-_0x4f1d3f;if(_0x346896>_0x4f1d3f)_0x59395e=this[_0xcce1c6(0x116)]()?TextManager[_0xcce1c6(0x222)]:TextManager[_0xcce1c6(0x274)],_0x2fa2c4=ImageManager[_0xcce1c6(0x26a)];else _0x346896===_0x4f1d3f?(_0x59395e=this['isActor']()?TextManager[_0xcce1c6(0x167)]:TextManager['enemyLoss'],_0x2fa2c4=ImageManager[_0xcce1c6(0x19e)]):(_0x59395e=this[_0xcce1c6(0x116)]()?TextManager[_0xcce1c6(0x167)]:TextManager[_0xcce1c6(0x240)],_0x2fa2c4=ImageManager['combatLog_TP_Dmg']);_0x5b8bfc=ColorManager[_0xcce1c6(0x1bb)]('TP',_0x5b8bfc);let _0x5195c2=_0x59395e[_0xcce1c6(0xe1)](this[_0xcce1c6(0xcf)](),_0x5b8bfc,TextManager['tp']);$gameSystem[_0xcce1c6(0x26b)](_0x5195c2,_0x2fa2c4);},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x162)]=Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0x29d)],Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0x29d)]=function(_0x375d14){const _0x369e91=_0x2c528f;this[_0x369e91(0x13a)]=!![],VisuMZ[_0x369e91(0x1ba)][_0x369e91(0x162)][_0x369e91(0x114)](this,_0x375d14),this[_0x369e91(0x13a)]=![];},VisuMZ['CombatLog']['Game_Battler_useItem']=Game_Battler['prototype'][_0x2c528f(0x299)],Game_Battler['prototype'][_0x2c528f(0x299)]=function(_0x30cb39){const _0x3f0893=_0x2c528f;this[_0x3f0893(0x135)]=!![],VisuMZ['CombatLog'][_0x3f0893(0x1f9)][_0x3f0893(0x114)](this,_0x30cb39),this[_0x3f0893(0x135)]=![];},VisuMZ['CombatLog'][_0x2c528f(0xe0)]=Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0x29c)],Game_Battler[_0x2c528f(0x12a)]['addState']=function(_0x258baf){const _0x5f14e2=_0x2c528f,_0x38532c=this['isStateAffected'](_0x258baf);VisuMZ[_0x5f14e2(0x1ba)][_0x5f14e2(0xe0)]['call'](this,_0x258baf);const _0x254b12=this[_0x5f14e2(0x223)](_0x258baf);this['combatLogStateChanges'](_0x258baf,_0x38532c,_0x254b12);},VisuMZ[_0x2c528f(0x1ba)]['Game_Battler_removeState']=Game_Battler[_0x2c528f(0x12a)]['removeState'],Game_Battler['prototype'][_0x2c528f(0x291)]=function(_0x41dc42){const _0x2fc610=_0x2c528f,_0x3c80a0=this[_0x2fc610(0x223)](_0x41dc42);VisuMZ[_0x2fc610(0x1ba)][_0x2fc610(0x11f)][_0x2fc610(0x114)](this,_0x41dc42);const _0x4d377d=this[_0x2fc610(0x223)](_0x41dc42);this['combatLogStateChanges'](_0x41dc42,_0x3c80a0,_0x4d377d);},Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0x186)]=function(_0x23b61e,_0x500a5c,_0x39485b){const _0x5c5e70=_0x2c528f;if(!SceneManager[_0x5c5e70(0xd4)]())return;const _0x319fb1=$dataStates[_0x23b61e];if(!_0x319fb1)return;if(_0x319fb1[_0x5c5e70(0x221)][_0x5c5e70(0x179)](VisuMZ['CombatLog'][_0x5c5e70(0x268)]['BypassCombatLog']))return;const _0x2e4f50=VisuMZ[_0x5c5e70(0x1ba)][_0x5c5e70(0xd6)]['CombatLog'];if(!_0x500a5c&&_0x39485b){let _0x51f63e=this[_0x5c5e70(0x116)]()?_0x319fb1[_0x5c5e70(0x1e0)]:_0x319fb1[_0x5c5e70(0x277)];if(_0x51f63e&&_0x2e4f50['ShowStateAdd']){let _0x21d2d6=_0x51f63e[_0x5c5e70(0xe1)](this[_0x5c5e70(0xcf)]()),_0x2f80da=_0x319fb1[_0x5c5e70(0x102)];$gameSystem[_0x5c5e70(0x26b)](_0x21d2d6,_0x2f80da);}}if(_0x500a5c&&_0x39485b){let _0x53f525=_0x319fb1['message3'];if(_0x53f525&&_0x2e4f50[_0x5c5e70(0x1c6)]){let _0x39384b=_0x53f525[_0x5c5e70(0xe1)](this[_0x5c5e70(0xcf)]()),_0x8585ca=_0x319fb1['iconIndex'];$gameSystem[_0x5c5e70(0x26b)](_0x39384b,_0x8585ca);}}if(_0x500a5c&&!_0x39485b){let _0x5c4cdf=_0x319fb1[_0x5c5e70(0x248)];if(_0x5c4cdf&&_0x2e4f50[_0x5c5e70(0x1d1)]){let _0x21b0bf=_0x5c4cdf[_0x5c5e70(0xe1)](this['combatLogName']()),_0x161938=_0x319fb1['iconIndex'];$gameSystem[_0x5c5e70(0x26b)](_0x21b0bf,_0x161938);}}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x241)]=Game_BattlerBase['prototype'][_0x2c528f(0x175)],Game_BattlerBase[_0x2c528f(0x12a)][_0x2c528f(0x175)]=function(_0x28f137){const _0xdbaa2d=_0x2c528f;VisuMZ[_0xdbaa2d(0x1ba)][_0xdbaa2d(0x241)][_0xdbaa2d(0x114)](this,_0x28f137);if(!VisuMZ[_0xdbaa2d(0x1ba)][_0xdbaa2d(0xd6)][_0xdbaa2d(0x1ba)][_0xdbaa2d(0x1df)])return;this[_0xdbaa2d(0x29e)](_0x28f137,0x1,TextManager['buffAdd']);},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x1a8)]=Game_BattlerBase['prototype'][_0x2c528f(0x1de)],Game_BattlerBase[_0x2c528f(0x12a)]['decreaseBuff']=function(_0x55881e){const _0x24578a=_0x2c528f;VisuMZ[_0x24578a(0x1ba)][_0x24578a(0x1a8)][_0x24578a(0x114)](this,_0x55881e);if(!VisuMZ['CombatLog']['Settings']['CombatLog'][_0x24578a(0x278)])return;this[_0x24578a(0x29e)](_0x55881e,-0x1,TextManager[_0x24578a(0x1b8)]);},VisuMZ[_0x2c528f(0x1ba)]['Game_BattlerBase_eraseBuff']=Game_BattlerBase[_0x2c528f(0x12a)][_0x2c528f(0x208)],Game_BattlerBase[_0x2c528f(0x12a)][_0x2c528f(0x208)]=function(_0x8c0777){const _0x251cab=_0x2c528f,_0x1eb31b=this[_0x251cab(0x132)][_0x8c0777]||0x0;VisuMZ[_0x251cab(0x1ba)][_0x251cab(0x1ee)][_0x251cab(0x114)](this,_0x8c0777);const _0x56def8=this[_0x251cab(0x132)][_0x8c0777]||0x0,_0x2fcb06=_0x56def8>_0x1eb31b?0x1:-0x1;if(!VisuMZ[_0x251cab(0x1ba)][_0x251cab(0xd6)][_0x251cab(0x1ba)][_0x251cab(0x11b)])return;this[_0x251cab(0x29e)](_0x8c0777,_0x2fcb06,TextManager['buffRemove']);},Game_Battler[_0x2c528f(0x12a)]['combatLogBuffChanges']=function(_0x95ffbd,_0x1f3b92,_0x1d5224){const _0x41baf4=_0x2c528f;if(!SceneManager[_0x41baf4(0xd4)]())return;if(!_0x1d5224)return;const _0x2d9757=this['buffIconIndex'](_0x1f3b92||-0x1,_0x95ffbd),_0x3034a2=TextManager['param'](_0x95ffbd),_0x30d7a5=_0x1d5224[_0x41baf4(0xe1)](this[_0x41baf4(0xcf)](),_0x3034a2);$gameSystem[_0x41baf4(0x26b)](_0x30d7a5,_0x2d9757);},Game_Actor[_0x2c528f(0x12a)][_0x2c528f(0xcf)]=function(){const _0x1254b7=_0x2c528f;return _0x1254b7(0xdd)[_0x1254b7(0xe1)](this[_0x1254b7(0x14c)]);},Game_Enemy['prototype'][_0x2c528f(0xcf)]=function(){const _0x36e3d0=_0x2c528f;return this[_0x36e3d0(0x18a)]();},Game_Party[_0x2c528f(0x12a)][_0x2c528f(0xcf)]=function(){const _0x1f6cbe=_0x2c528f,_0xfafb25=this[_0x1f6cbe(0x216)]()['length'];if(_0xfafb25===0x0)return'';else return _0xfafb25===0x1?this[_0x1f6cbe(0x20f)]()['combatLogName']():TextManager[_0x1f6cbe(0x1a3)]['format'](this[_0x1f6cbe(0x20f)]()[_0x1f6cbe(0xcf)]());},VisuMZ['CombatLog'][_0x2c528f(0xd1)]=Scene_Menu[_0x2c528f(0x12a)]['createCommandWindow'],Scene_Menu[_0x2c528f(0x12a)][_0x2c528f(0x1d3)]=function(){const _0x4b5813=_0x2c528f;VisuMZ[_0x4b5813(0x1ba)][_0x4b5813(0xd1)][_0x4b5813(0x114)](this);const _0x171547=this['_commandWindow'];_0x171547[_0x4b5813(0x262)](_0x4b5813(0x1ba),this[_0x4b5813(0x10c)]['bind'](this));},Scene_Menu[_0x2c528f(0x12a)][_0x2c528f(0x10c)]=function(){const _0x27de20=_0x2c528f;SceneManager[_0x27de20(0x128)](Scene_CombatLog);},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x255)]=Scene_Battle[_0x2c528f(0x12a)][_0x2c528f(0x14a)],Scene_Battle['prototype'][_0x2c528f(0x14a)]=function(){const _0x2e835b=_0x2c528f;VisuMZ[_0x2e835b(0x1ba)]['Scene_Battle_createDisplayObjects'][_0x2e835b(0x114)](this),this[_0x2e835b(0x227)]();},Scene_Battle[_0x2c528f(0x12a)]['createCombatLogWindow']=function(){const _0x552e81=_0x2c528f,_0x4852bc=this[_0x552e81(0xf5)]();this[_0x552e81(0xe4)]=new Window_CombatLogDisplay(_0x4852bc),this['_combatLogWindow'][_0x552e81(0x11e)](0x0),this[_0x552e81(0xcb)](this['_combatLogWindow']),this['_combatLogWindow']['x']=this[_0x552e81(0xbf)]['x'],this[_0x552e81(0xe4)]['y']=this[_0x552e81(0xbf)]['y'],this['_combatLogWindow'][_0x552e81(0x15d)](VisuMZ[_0x552e81(0x1ba)][_0x552e81(0xd6)][_0x552e81(0x119)][_0x552e81(0x181)]),this[_0x552e81(0xe4)][_0x552e81(0x262)](_0x552e81(0xc7),this[_0x552e81(0x11d)]['bind'](this)),this[_0x552e81(0xe4)][_0x552e81(0x262)](_0x552e81(0xdf),this['closeCombatLog'][_0x552e81(0xb9)](this)),this['_partyCommandWindow']['setHandler'](_0x552e81(0xc7),this[_0x552e81(0x1b3)]['bind'](this,this[_0x552e81(0x1e4)])),this[_0x552e81(0x125)][_0x552e81(0x262)]('combatLog',this[_0x552e81(0x1b3)][_0x552e81(0xb9)](this,this[_0x552e81(0x125)]));},Scene_Battle['prototype'][_0x2c528f(0xf5)]=function(){const _0x268877=_0x2c528f,_0x2a0d3c=VisuMZ['CombatLog']['Settings'][_0x268877(0x119)][_0x268877(0x159)];if(_0x2a0d3c)return _0x2a0d3c[_0x268877(0x114)](this);const _0x3c75ee=0x0,_0x56884b=0x0,_0x35df72=Graphics[_0x268877(0xfc)],_0x1fbb7d=Graphics[_0x268877(0x22c)];return new Rectangle(_0x3c75ee,_0x56884b,_0x35df72,_0x1fbb7d);},VisuMZ[_0x2c528f(0x1ba)]['Scene_Battle_isAnyInputWindowActive']=Scene_Battle[_0x2c528f(0x12a)]['isAnyInputWindowActive'],Scene_Battle[_0x2c528f(0x12a)]['isAnyInputWindowActive']=function(){const _0x59c082=_0x2c528f;if(this[_0x59c082(0xe4)]&&this[_0x59c082(0xe4)]['active'])return!![];return VisuMZ[_0x59c082(0x1ba)]['Scene_Battle_isAnyInputWindowActive'][_0x59c082(0x114)](this);},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x1c3)]=Scene_Battle[_0x2c528f(0x12a)]['updateCancelButton'],Scene_Battle[_0x2c528f(0x12a)]['updateCancelButton']=function(){const _0x13b005=_0x2c528f;VisuMZ[_0x13b005(0x1ba)]['Scene_Battle_updateCancelButton'][_0x13b005(0x114)](this),this['_combatLogWindow']&&this['_combatLogWindow'][_0x13b005(0x13b)]>0x0&&this[_0x13b005(0x12b)]&&(this[_0x13b005(0x12b)][_0x13b005(0xfe)]=![]);},VisuMZ[_0x2c528f(0x1ba)]['Scene_Battle_isTimeActive']=Scene_Battle[_0x2c528f(0x12a)]['isTimeActive'],Scene_Battle[_0x2c528f(0x12a)][_0x2c528f(0x152)]=function(){const _0x17198f=_0x2c528f;return BattleManager['isActiveTpb']()&&this[_0x17198f(0xe4)]&&this[_0x17198f(0xe4)][_0x17198f(0x17f)]?![]:VisuMZ[_0x17198f(0x1ba)][_0x17198f(0x209)][_0x17198f(0x114)](this);},Scene_Battle[_0x2c528f(0x12a)][_0x2c528f(0x1b3)]=function(_0x50f2da){const _0x1703e3=_0x2c528f;this[_0x1703e3(0xe4)][_0x1703e3(0x235)](),this[_0x1703e3(0xe4)]['activate'](),this[_0x1703e3(0xe4)][_0x1703e3(0x16b)](),this[_0x1703e3(0xe4)]['setLastWindow'](_0x50f2da);},Scene_Battle[_0x2c528f(0x12a)][_0x2c528f(0x11d)]=function(){const _0x45953f=_0x2c528f;this[_0x45953f(0xe4)][_0x45953f(0xea)]();const _0x1edadd=this[_0x45953f(0xe4)]['getLastWindow']();_0x1edadd[_0x45953f(0x144)]();};function _0x36c0(){const _0x24a792=['map','_bypassAddToCombatLog','combatLog_Evasion_Icon','actorNoDamage','debuffAdd','select','CombatLog','applyCombatLogColor','combatLog_%1_%2','Show_AntiDmgBarrier_Absorb','Show_AntiDmgBarrier_Cancel','IconVictory','_combatLogAccess','IconStartTurn','SCROLL_SPEED_PAGEDN','Scene_Battle_updateCancelButton','partyCmd','cursorDown','ShowStateCurrent','down','updateTurnEnd','centerSprite','checkRefresh','addCommand','_combatLog_Latest','processCursorMove','states','794058WTuEUm','shift','ShowStateRemove','setLastWindow','createCommandWindow','ShowAdvantages','Window_BattleLog_displayMiss','combatLog_Preemptive_Icon','isTriggered','message3','View\x20the\x20combat\x20log.','endTurn','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setBypassCombatLog','surprise','decreaseBuff','ShowAddBuff','message1','FUNC','General','updateHelp','_partyCommandWindow','ShowDefeat','refresh','Game_BattlerBase_getAntiDamageBarrierReduction','loadTitle2','Text_AntiDmgBarrier_Cancel','processCancel','addWindow','calcWindowHeight','IconReflect','Game_BattlerBase_eraseBuff','Window_PartyCommand_addCustomCommands','ShowEscape','mainAreaHeight','isMainMenuCombatLogVisible','IconEscape','\x5cI[%1]%2','Window_BattleLog_displaySubstitute','length','VisuMZ_1_MainMenuCore','historyWindowRect','Game_Battler_useItem','evasion','IconSubst','combatLog_TP_Dmg','combatLog_BattleStart','itemHeight','addHorzLineToCombatLog','VisuMZ_3_ActiveChainSkills','Show','isCombatLogHotKeyActive','IconEvade','isCursorMovable','ShowCounter','fillRect','onEscapeFailure','eraseBuff','Scene_Battle_isTimeActive','ShowEvade','processVictory','setPartyCmdCombatLogVisible','substitute','combatLog_Miss_Icon','leader','combatLog_BattleCmd_Icon','setActorCmdCombatLogVisible','Text_AntiDmgBarrier_Reduce','escapeStart','displayAction','_logWindow','battleMembers','onTouchOk','createCustomBackgroundImages','Game_BattlerBase_setMp','NUM','startTurn','NoDmg','241100DxBjVG','CombatHistory_RectJS','RemoveUnwantedTextCodes','addChildToBack','note','actorRecovery','isStateAffected','TextColorHealMP','_list','ShowBattleSysStbInstant','createCombatLogWindow','_preemptive','ShowActorCommand','IconEnemyEmerge','Window_BattleLog_addStealText','boxHeight','_dimmerSprite','IconFail','Text_AntiDmgBarrier_MpDisperse','IconNoDmgHP','CombatLogAddText','TextColorDmgHP','resize','CombatLogMenu_RectJS','open','Show_AntiDmgBarrier_Nullify','Window_ActorCommand_addCustomCommands','IconHealHP','Game_Battler_onCtbOrderChange','CombatLogEnableHotKey','TextStartTurn','isBypassCombatLog','max','setFrame','isCombatLogCommandVisible','enemyLoss','Game_BattlerBase_increaseBuff','dimColor2','actorNoHit','_helpWindow','Window_ActorCommand_updateHelp','Game_Battler_onAntiDamageCancelBarrier','combatLog_BattleCmd_Name','message4','=====HORZLINE=====','Show_AntiDmgBarrier_MpDisperse','SHOW_LINE_BACKGROUND','smoothScrollTo','processAbort','refreshCombatLog','TextColorHealHP','8SOvDHJ','combatLog_StartTurn','ShowVictory','Compatibility','processDefeat','Scene_Battle_createDisplayObjects','Name','AutoColor','onAntiDamageCancelBarrier','ConvertParams','displayAbsorptionBarrierPopup','displayCritical','createDimmerSprite','initialize','6762750iGTvFB','scale','isActorCmdCombatLogVisible','BattleManager_onEscapeSuccess','setHandler','drawItem','loadTitle1','bitmap','BattleManager_processVictory','combatLog_Substitute_Icon','RegExp','onAtbInterrupt','combatLog_TP_Heal','addTextToCombatLog','Show_AntiDmgBarrier_Reduce','Show_LifeStateEffects_%1','_surprise','ShowBattleSysCtbOrderChange','IconHealTP','constructor','combatLog_MP_Heal','SystemShowCombatLogParty','enemyRecovery','counterAttack','setLogWindow','message2','ShowAddDebuff','smoothScrollUp','criticalToActor','getCombatLog','HORZ_LINE_THICKNESS','combatLog_MP_Dmg','ARRAYJSON','ARRAYSTRUCT','Window_BattleLog_displayReflection','status','maxCols','666407ZbgIos','registerCommand','Window_PartyCommand_makeCommandList','Icon_StealItems_Steal','Window_BattleLog_displayCounter','description','aliveMembers','Game_BattlerBase_setHp','BattleManager_endTurn','Window_ActorCommand_makeCommandList','abs','combatLog_Result_Defeat','success','EVAL','removeState','end','TextColorHealTP','ShowCritical','ShowTP','toUpperCase','padding','home','useItem','Window_BattleLog_startTurn','popScene','addState','gainSilentTp','combatLogBuffChanges','IconNoDmgMP','bind','CombatLogAddHorzLine','getLastWindow','escapeFailure','Show_StealItems_Steal','Game_BattlerBase_setTp','_windowLayer','_combatLogs','onLifeStateEffect','parse','IconCounter','getTotalCombatLogs','Window_Selectable_allowShiftScrolling','allowShiftScrolling','combatLog','removeCombatLogCommand','addCustomCommands','IconPreemptive','addChild','combatLog_HP_NoDmg','ShowReflect','displayMiss','combatLogName','combatLog_StartTurn_Icon','Scene_Menu_createCommandWindow','isPartyCmdCombatLogVisible','_requestRefresh','isSceneBattle','combatLog_HP_Heal','Settings','isAccessKeyPressed','Text_AntiDmgBarrier_TpDisperse','setCombatLogHotKeyActive','scrollTo','Window_MenuCommand_addOriginalCommands','COMBATLOG_MAXIMUM_BATTLE_ENTRIES','\x5cN[%1]','BgFilename2','cancel','Game_Battler_addState','format','Game_Battler_onLifeStateEffect','resetFontSettings','_combatLogWindow','version','defeat','IconBattleSysCtbOrderChange','pageup','ShowMiss','close','commandStyle','TextEndTurn','getAntiDamageBarrierReduction','_backSprite2','CombatLogMenu_BgType','preemptive','update','magicEvasion','BattleManager_onEscapeFailure','hotkeyOn','combatLogWindowRect','2933379EeXvNn','displayReflection','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','combatLog_CriticalHit_Icon','isMainMenuCombatLogEnabled','_combatLogIndex','boxWidth','isOpen','visible','none','ACCESS_BUTTON','Game_Battler_onAntiDamageMpBarrier','iconIndex','combatLog_MP_NoDmg','addLoadListener','BgSettings','IconNoDmgTP','Bypass','splice','isPressed','Window_BattleLog_displayEvasion','TextBattleSysCtbOrderChange','commandCombatLog','_historyWindow','drawTextEx','Window_Selectable_isCursorMovable','Game_System_initialize','onAntiDamageTpBarrier','combatLog_EndTurn','JSON','call','_lastWindow','isActor','Game_Battler_onAntiDamageNullificationBarrier','BypassCombatLog','Window','Game_Battler_onAntiDamageTpBarrier','ShowEraseBuff','Icon','closeCombatLog','setCombatLogIndex','Game_Battler_removeState','IconEndTurn','magicReflection','VisuMZ_1_BattleCore','trim','combatLog_Result_Escape','_actorCommandWindow','6qmyqpH','turnCount','push','ARRAYSTR','prototype','_cancelButton','ShowMainMenu','combatLog_Failure_Icon','combatLog_Reflection_Icon','BattleManager_processDefeat','_scene','anchor','_buffs','isCombatLogCommandEnabled','ShowEnemyEmerge','_combatLogPayment','TextBattleStart','drawHorzLine','CombatHistoryLatest','addCombatLogCommand','_combatLogSilentTp','openness','exit','displayEvasion','Window_BattleLog_startAction','smoothScrollDown','refreshDimmerBitmap','BgFilename1','BIGGER_LINE_HEIGHT','drawRect','activate','ShowFail','Window_BattleLog_displayAction','ShowBattleSysAtbInterrupt','Game_Battler_displayAbsorptionBarrierPopup','adjustSprite','createDisplayObjects','BattleManager_updateTurnEnd','_actorId','scaleSprite','SCROLL_SPEED_CURSOR','createHistoryWindow','31914aSCSnb','combatLog_EnemyEmerge_Icon','isTimeActive','displayCounter','initCombatLogAccess','currentSymbol','setHp','ShowMP','displaySubstitute','CombatLogBattle_RectJS','ShowBattleStart','BattleManager_startBattle','_backSprite1','setBackgroundType','width','inBattle','TextColorNoDmgHP','result','Game_Battler_gainSilentTp','combatLogHelp','Window_BattleLog_displayFailure','isActiveChainSkillsUiVisible','combatLog_EndTurn_Icon','actorLoss','stbGainInstant','ShowEndTurn','SystemShowCombatLogMenu','battleRefresh','STRUCT','physical','isSkill','CombatHistory_BgType','gradientFillRect','findSymbol','text','Game_Battler_onAtbInterrupt','addOriginalCommands','increaseBuff','CombatHistoryPrevious','setMp','STR','match','create','TextColorDmgMP','combatLog_HP_Dmg','mainAreaTop','startAction','active','maxScrollY','CombatLogBattle_BgType','enemyNoHit','onAntiDamageNullificationBarrier','Game_Battler_stbGainInstant','_tp','combatLogStateChanges','finishCurrentCombatLog','_combatLog_HistoryFmt','Icon_LifeStateEffects_%1','name','battleCount','combatLog_Counter_Icon','actionFailure','SystemShowCombatLogActor','initCombatLogBase','split','startBattle','displayCurrentState','value','height','requestRefresh','enemyDamage','includes','isBusy','addStealText','HotKey','setMainMenuCombatLogVisible','currentExt','TextBattleSysAtbInterrupt','combatLog_TP_NoDmg','ShowPartyCommand','itemLineRect','enemyNoDamage','_hp','partyName','onAntiDamageMpBarrier','actorCmd','263914LZVcPX','Window_BattleLog_displayCritical','Game_BattlerBase_decreaseBuff','onEscapeSuccess','makeCommandList','mainMenu','BattleManager_processAbort','isHit','Show_AntiDmgBarrier_TpDisperse','createBackground','10XEdSoO','commandName','criticalToEnemy','openCombatLog'];_0x36c0=function(){return _0x24a792;};return _0x36c0();}function Scene_CombatLog(){const _0x594fbd=_0x2c528f;this[_0x594fbd(0x25d)](...arguments);}Scene_CombatLog[_0x2c528f(0x12a)]=Object[_0x2c528f(0x17a)](Scene_MenuBase[_0x2c528f(0x12a)]),Scene_CombatLog['prototype'][_0x2c528f(0x271)]=Scene_CombatLog,Scene_CombatLog['prototype'][_0x2c528f(0x25d)]=function(){const _0x46bfc4=_0x2c528f;Scene_MenuBase[_0x46bfc4(0x12a)][_0x46bfc4(0x25d)]['call'](this);},Scene_CombatLog[_0x2c528f(0x12a)]['helpAreaHeight']=function(){return 0x0;},Scene_CombatLog['prototype'][_0x2c528f(0x17a)]=function(){const _0x4ef3b2=_0x2c528f;Scene_MenuBase[_0x4ef3b2(0x12a)][_0x4ef3b2(0x17a)]['call'](this),this[_0x4ef3b2(0x14f)](),this[_0x4ef3b2(0x227)]();},Scene_CombatLog[_0x2c528f(0x12a)][_0x2c528f(0x14f)]=function(){const _0x2cce50=_0x2c528f,_0x333b77=this[_0x2cce50(0x1f8)]();this[_0x2cce50(0x10d)]=new Window_CombatLogHistory(_0x333b77),this['_historyWindow']['setHandler'](_0x2cce50(0xdf),this[_0x2cce50(0x29b)][_0x2cce50(0xb9)](this)),this[_0x2cce50(0x1eb)](this[_0x2cce50(0x10d)]),this[_0x2cce50(0x10d)][_0x2cce50(0x15d)](VisuMZ['CombatLog'][_0x2cce50(0xd6)][_0x2cce50(0x119)][_0x2cce50(0x16f)]);},Scene_CombatLog[_0x2c528f(0x12a)][_0x2c528f(0x1f8)]=function(){const _0x3b3cdd=_0x2c528f,_0x310a8c=VisuMZ[_0x3b3cdd(0x1ba)]['Settings'][_0x3b3cdd(0x119)][_0x3b3cdd(0x21e)];if(_0x310a8c)return _0x310a8c['call'](this);const _0x5707c8=Graphics[_0x3b3cdd(0xfc)],_0x2c4620=this[_0x3b3cdd(0x1ec)](0x1,!![]),_0x588b9f=0x0,_0x146419=this[_0x3b3cdd(0x17d)]();return new Rectangle(_0x588b9f,_0x146419,_0x5707c8,_0x2c4620);},Scene_CombatLog[_0x2c528f(0x12a)][_0x2c528f(0x227)]=function(){const _0x1e1e9d=_0x2c528f,_0x398ffd=this['combatLogWindowRect']();this[_0x1e1e9d(0xe4)]=new Window_CombatLogDisplay(_0x398ffd),this[_0x1e1e9d(0x1eb)](this[_0x1e1e9d(0xe4)]),this[_0x1e1e9d(0x10d)][_0x1e1e9d(0x276)](this[_0x1e1e9d(0xe4)]),this['_combatLogWindow'][_0x1e1e9d(0x15d)](VisuMZ[_0x1e1e9d(0x1ba)][_0x1e1e9d(0xd6)][_0x1e1e9d(0x119)][_0x1e1e9d(0xef)]);},Scene_CombatLog[_0x2c528f(0x12a)][_0x2c528f(0xf5)]=function(){const _0x4c6292=_0x2c528f,_0x1efb8b=VisuMZ[_0x4c6292(0x1ba)][_0x4c6292(0xd6)][_0x4c6292(0x119)][_0x4c6292(0x234)];if(_0x1efb8b)return _0x1efb8b[_0x4c6292(0x114)](this);const _0x38fcce=0x0,_0x104e0e=this['_historyWindow']['y']+this[_0x4c6292(0x10d)][_0x4c6292(0x194)],_0xb37d97=Graphics[_0x4c6292(0xfc)],_0x3ef110=this[_0x4c6292(0x1f1)]()-this[_0x4c6292(0x10d)]['height'];return new Rectangle(_0x38fcce,_0x104e0e,_0xb37d97,_0x3ef110);},Scene_CombatLog[_0x2c528f(0x12a)][_0x2c528f(0x1af)]=function(){const _0x408345=_0x2c528f;Scene_MenuBase[_0x408345(0x12a)][_0x408345(0x1af)]['call'](this),this['setBackgroundOpacity'](this['getBackgroundOpacity']()),this[_0x408345(0x218)]();},Scene_CombatLog[_0x2c528f(0x12a)]['getBackgroundOpacity']=function(){const _0x2002f6=_0x2c528f;return VisuMZ['CombatLog'][_0x2002f6(0xd6)][_0x2002f6(0x105)]['SnapshotOpacity'];},Scene_CombatLog[_0x2c528f(0x12a)][_0x2c528f(0x218)]=function(){const _0x313fe9=_0x2c528f,_0x4fb5c9=VisuMZ[_0x313fe9(0x1ba)][_0x313fe9(0xd6)][_0x313fe9(0x105)];_0x4fb5c9&&(_0x4fb5c9[_0x313fe9(0x141)]!==''||_0x4fb5c9[_0x313fe9(0xde)]!=='')&&(this[_0x313fe9(0x15c)]=new Sprite(ImageManager[_0x313fe9(0x264)](_0x4fb5c9[_0x313fe9(0x141)])),this[_0x313fe9(0xee)]=new Sprite(ImageManager[_0x313fe9(0x1e8)](_0x4fb5c9['BgFilename2'])),this['addChild'](this[_0x313fe9(0x15c)]),this['addChild'](this[_0x313fe9(0xee)]),this[_0x313fe9(0x15c)]['bitmap'][_0x313fe9(0x104)](this[_0x313fe9(0x149)]['bind'](this,this[_0x313fe9(0x15c)])),this['_backSprite2'][_0x313fe9(0x265)][_0x313fe9(0x104)](this[_0x313fe9(0x149)]['bind'](this,this[_0x313fe9(0xee)])));},Scene_CombatLog[_0x2c528f(0x12a)][_0x2c528f(0x149)]=function(_0x33c2f5){const _0x30dd76=_0x2c528f;this[_0x30dd76(0x14d)](_0x33c2f5),this[_0x30dd76(0x1c9)](_0x33c2f5);},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xc5)]=Window_Selectable['prototype'][_0x2c528f(0xc6)],Window_Selectable[_0x2c528f(0x12a)][_0x2c528f(0xc6)]=function(){const _0x4127b3=_0x2c528f;if(SceneManager[_0x4127b3(0xd4)]()){const _0x375245=SceneManager['_scene'][_0x4127b3(0xe4)];if(_0x375245&&_0x375245[_0x4127b3(0xfd)]())return![];}return VisuMZ[_0x4127b3(0x1ba)]['Window_Selectable_allowShiftScrolling'][_0x4127b3(0x114)](this);},VisuMZ[_0x2c528f(0x1ba)]['Window_Selectable_isCursorMovable']=Window_Selectable[_0x2c528f(0x12a)]['isCursorMovable'],Window_Selectable[_0x2c528f(0x12a)][_0x2c528f(0x204)]=function(){const _0x1c081b=_0x2c528f;if(SceneManager[_0x1c081b(0xd4)]()){const _0x5b164d=SceneManager[_0x1c081b(0x130)][_0x1c081b(0xe4)];if(_0x5b164d&&_0x5b164d[_0x1c081b(0xfd)]())return![];}return VisuMZ[_0x1c081b(0x1ba)][_0x1c081b(0x10f)][_0x1c081b(0x114)](this);},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xdb)]=Window_MenuCommand['prototype'][_0x2c528f(0x174)],Window_MenuCommand[_0x2c528f(0x12a)]['addOriginalCommands']=function(){const _0x57ee36=_0x2c528f;VisuMZ['CombatLog'][_0x57ee36(0xdb)]['call'](this);if(Imported[_0x57ee36(0x1f7)])return;this['addCombatLogCommand']();},Window_MenuCommand[_0x2c528f(0x12a)]['addCombatLogCommand']=function(){const _0x1c58d5=_0x2c528f;if(!this[_0x1c58d5(0x23f)]())return;const _0x4fc9ea=TextManager[_0x1c58d5(0x247)],_0x5de560=this[_0x1c58d5(0x133)]();this[_0x1c58d5(0x1cb)](_0x4fc9ea,_0x1c58d5(0xc7),_0x5de560);},Window_MenuCommand['prototype']['isCombatLogCommandVisible']=function(){const _0x28c991=_0x2c528f;return $gameSystem[_0x28c991(0x1f2)]();},Window_MenuCommand[_0x2c528f(0x12a)][_0x2c528f(0x133)]=function(){const _0x42dbba=_0x2c528f;return $gameSystem[_0x42dbba(0xfa)]();},VisuMZ[_0x2c528f(0x1ba)]['Window_BattleLog_startTurn']=Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0x21b)],Window_BattleLog[_0x2c528f(0x12a)]['startTurn']=function(){const _0x2fa6d8=_0x2c528f;VisuMZ['CombatLog'][_0x2fa6d8(0x29a)][_0x2fa6d8(0x114)](this);if(!VisuMZ[_0x2fa6d8(0x1ba)][_0x2fa6d8(0xd6)]['CombatLog']['ShowStartTurn'])return;$gameSystem[_0x2fa6d8(0x1ff)]();let _0x13fbb0=TextManager['combatLog_StartTurn'][_0x2fa6d8(0xe1)]($gameTroop['turnCount']()),_0x4fecda=ImageManager['combatLog_StartTurn_Icon'];$gameSystem[_0x2fa6d8(0x26b)](_0x13fbb0,_0x4fecda);},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x13e)]=Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0x17e)],Window_BattleLog['prototype'][_0x2c528f(0x17e)]=function(_0xcfedab,_0x151f55,_0x2966c6){const _0x1452c7=_0x2c528f;$gameSystem[_0x1452c7(0x1ff)](),VisuMZ['CombatLog'][_0x1452c7(0x13e)]['call'](this,_0xcfedab,_0x151f55,_0x2966c6);},VisuMZ['CombatLog']['Window_BattleLog_displayCurrentState']=Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0x192)],Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0x192)]=function(_0x5df520){const _0xd79e0a=_0x2c528f;VisuMZ[_0xd79e0a(0x1ba)]['Window_BattleLog_displayCurrentState'][_0xd79e0a(0x114)](this,_0x5df520);if(!_0x5df520)return;if(!VisuMZ[_0xd79e0a(0x1ba)][_0xd79e0a(0xd6)][_0xd79e0a(0x1ba)][_0xd79e0a(0x1c6)]);const _0x26cc3c=_0x5df520[_0xd79e0a(0x1ce)]();for(const _0x58fe24 of _0x26cc3c){if(!_0x58fe24)continue;if(!_0x58fe24[_0xd79e0a(0x1d8)])continue;if(_0x58fe24[_0xd79e0a(0x221)][_0xd79e0a(0x179)](VisuMZ[_0xd79e0a(0x1ba)][_0xd79e0a(0x268)][_0xd79e0a(0x118)]))continue;let _0x4b9fd8=_0x58fe24[_0xd79e0a(0x1d8)],_0x46942d=_0x4b9fd8[_0xd79e0a(0xe1)](_0x5df520['combatLogName']()),_0x35a855=_0x58fe24[_0xd79e0a(0x102)];$gameSystem[_0xd79e0a(0x26b)](_0x46942d,_0x35a855);}},VisuMZ['CombatLog']['Window_BattleLog_displayAction']=Window_BattleLog[_0x2c528f(0x12a)]['displayAction'],Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0x214)]=function(_0x4da558,_0x28ced5){const _0x4fe78e=_0x2c528f;VisuMZ[_0x4fe78e(0x1ba)][_0x4fe78e(0x146)][_0x4fe78e(0x114)](this,_0x4da558,_0x28ced5);const _0x1169f6=VisuMZ[_0x4fe78e(0x1ba)][_0x4fe78e(0xd6)][_0x4fe78e(0x1ba)];if(DataManager[_0x4fe78e(0x16e)](_0x28ced5)){if(_0x28ced5[_0x4fe78e(0x1e0)]&&_0x1169f6['ShowSkillMessage1']){let _0x1ecbfb=_0x28ced5[_0x4fe78e(0x1e0)],_0x43762e=_0x1ecbfb['format'](_0x4da558['combatLogName'](),_0x28ced5[_0x4fe78e(0x18a)]),_0x11ab5f=_0x28ced5['iconIndex'];$gameSystem[_0x4fe78e(0x26b)](_0x43762e,_0x11ab5f);}if(_0x28ced5['message2']&&_0x1169f6['ShowSkillMessage2']){let _0x17f5fd=_0x28ced5[_0x4fe78e(0x277)],_0x2ebcaa=_0x17f5fd['format'](_0x4da558[_0x4fe78e(0xcf)](),_0x28ced5['name']),_0x1d5f71=_0x28ced5[_0x4fe78e(0x102)];$gameSystem[_0x4fe78e(0x26b)](_0x2ebcaa,_0x1d5f71);}}else{if(TextManager[_0x4fe78e(0x299)]&&_0x1169f6['ShowItemMessage']){let _0x423900=TextManager[_0x4fe78e(0x299)],_0x120195=_0x423900[_0x4fe78e(0xe1)](_0x4da558[_0x4fe78e(0xcf)](),_0x28ced5['name']),_0x513a9b=_0x28ced5[_0x4fe78e(0x102)];$gameSystem[_0x4fe78e(0x26b)](_0x120195,_0x513a9b);}}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x287)]=Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0x153)],Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0x153)]=function(_0x36916a){const _0x2a0b80=_0x2c528f;VisuMZ['CombatLog'][_0x2a0b80(0x287)][_0x2a0b80(0x114)](this,_0x36916a);if(TextManager[_0x2a0b80(0x275)]&&VisuMZ[_0x2a0b80(0x1ba)][_0x2a0b80(0xd6)][_0x2a0b80(0x1ba)][_0x2a0b80(0x205)]){let _0x32827e=TextManager[_0x2a0b80(0x275)],_0x352544=_0x32827e[_0x2a0b80(0xe1)](_0x36916a[_0x2a0b80(0xcf)]()),_0x3e2a19=ImageManager['combatLog_Counter_Icon'];$gameSystem[_0x2a0b80(0x26b)](_0x352544,_0x3e2a19);}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x280)]=Window_BattleLog['prototype'][_0x2c528f(0xf7)],Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0xf7)]=function(_0x220403){const _0x349602=_0x2c528f;VisuMZ[_0x349602(0x1ba)][_0x349602(0x280)]['call'](this,_0x220403);if(TextManager[_0x349602(0x121)]&&VisuMZ[_0x349602(0x1ba)][_0x349602(0xd6)][_0x349602(0x1ba)][_0x349602(0xcd)]){let _0x5868ba=TextManager[_0x349602(0x121)],_0x2c6a5c=_0x5868ba[_0x349602(0xe1)](_0x220403[_0x349602(0xcf)]()),_0x3ec95b=ImageManager[_0x349602(0x12e)];$gameSystem[_0x349602(0x26b)](_0x2c6a5c,_0x3ec95b);}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x1f5)]=Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0x158)],Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0x158)]=function(_0x1821ca,_0x5c6e9d){const _0x2985dd=_0x2c528f;VisuMZ[_0x2985dd(0x1ba)][_0x2985dd(0x1f5)][_0x2985dd(0x114)](this,_0x1821ca,_0x5c6e9d);if(TextManager['substitute']&&VisuMZ[_0x2985dd(0x1ba)][_0x2985dd(0xd6)][_0x2985dd(0x1ba)]['ShowSubst']){const _0x363156=_0x1821ca[_0x2985dd(0xcf)]();let _0x44e891=TextManager[_0x2985dd(0x20d)],_0x36f36a=_0x44e891[_0x2985dd(0xe1)](_0x363156,_0x5c6e9d[_0x2985dd(0xcf)]()),_0x3e8031=ImageManager[_0x2985dd(0x267)];$gameSystem[_0x2985dd(0x26b)](_0x36f36a,_0x3e8031);}},VisuMZ[_0x2c528f(0x1ba)]['Window_BattleLog_displayFailure']=Window_BattleLog[_0x2c528f(0x12a)]['displayFailure'],Window_BattleLog[_0x2c528f(0x12a)]['displayFailure']=function(_0x180955){const _0xdccff5=_0x2c528f;VisuMZ[_0xdccff5(0x1ba)][_0xdccff5(0x164)][_0xdccff5(0x114)](this,_0x180955);if(_0x180955[_0xdccff5(0x161)]()[_0xdccff5(0x1ad)]()&&!_0x180955[_0xdccff5(0x161)]()[_0xdccff5(0x28f)]){if(TextManager[_0xdccff5(0x18d)]&&VisuMZ[_0xdccff5(0x1ba)][_0xdccff5(0xd6)]['CombatLog'][_0xdccff5(0x145)]){let _0xff3e26=TextManager[_0xdccff5(0x18d)],_0x3f3120=_0xff3e26[_0xdccff5(0xe1)](_0x180955[_0xdccff5(0xcf)]()),_0x4c6d5f=ImageManager[_0xdccff5(0x12d)];$gameSystem[_0xdccff5(0x26b)](_0x3f3120,_0x4c6d5f);}}},VisuMZ['CombatLog']['Window_BattleLog_displayCritical']=Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0x25b)],Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0x25b)]=function(_0x2066e5){const _0xfdad39=_0x2c528f;VisuMZ[_0xfdad39(0x1ba)][_0xfdad39(0x1a7)][_0xfdad39(0x114)](this,_0x2066e5);if(_0x2066e5['result']()['critical']&&VisuMZ[_0xfdad39(0x1ba)][_0xfdad39(0xd6)][_0xfdad39(0x1ba)][_0xfdad39(0x294)]){if(_0x2066e5[_0xfdad39(0x116)]()){if(TextManager['criticalToActor']){let _0x549d82=TextManager[_0xfdad39(0x27a)],_0x9124e8=ImageManager[_0xfdad39(0xf9)];$gameSystem['addTextToCombatLog'](_0x549d82,_0x9124e8);}}else{if(TextManager[_0xfdad39(0x1b2)]){let _0x3053db=TextManager['criticalToEnemy'],_0x307ee8=ImageManager[_0xfdad39(0xf9)];$gameSystem['addTextToCombatLog'](_0x3053db,_0x307ee8);}}}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x1d5)]=Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0xce)],Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0xce)]=function(_0x329ef9){const _0x4371a0=_0x2c528f;VisuMZ[_0x4371a0(0x1ba)][_0x4371a0(0x1d5)][_0x4371a0(0x114)](this,_0x329ef9);if(_0x329ef9[_0x4371a0(0x161)]()[_0x4371a0(0x16d)]&&VisuMZ[_0x4371a0(0x1ba)][_0x4371a0(0xd6)][_0x4371a0(0x1ba)][_0x4371a0(0xe9)]){const _0x17d903=_0x329ef9[_0x4371a0(0x116)]();if(_0x17d903&&TextManager[_0x4371a0(0x243)]){let _0xeffc10=TextManager[_0x4371a0(0x243)],_0x27a16b=_0xeffc10[_0x4371a0(0xe1)](_0x329ef9[_0x4371a0(0xcf)]()),_0x242cc4=ImageManager[_0x4371a0(0x20e)];$gameSystem[_0x4371a0(0x26b)](_0x27a16b,_0x242cc4);}else{if(!_0x17d903&&TextManager[_0x4371a0(0x182)]){let _0x5df12a=TextManager[_0x4371a0(0x182)],_0x1be1f4=_0x5df12a[_0x4371a0(0xe1)](_0x329ef9['combatLogName']()),_0x55b82b=ImageManager['combatLog_Miss_Icon'];$gameSystem[_0x4371a0(0x26b)](_0x1be1f4,_0x55b82b);}}}else{if(TextManager[_0x4371a0(0x18d)]&&VisuMZ['CombatLog'][_0x4371a0(0xd6)][_0x4371a0(0x1ba)][_0x4371a0(0x145)]){let _0x40ff6b=TextManager[_0x4371a0(0x18d)],_0xe2fd34=_0x40ff6b[_0x4371a0(0xe1)](_0x329ef9[_0x4371a0(0xcf)]()),_0x255928=ImageManager[_0x4371a0(0x12d)];$gameSystem[_0x4371a0(0x26b)](_0xe2fd34,_0x255928);}}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x10a)]=Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0x13d)],Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0x13d)]=function(_0x2e8081){const _0x4b9a46=_0x2c528f;VisuMZ[_0x4b9a46(0x1ba)][_0x4b9a46(0x10a)]['call'](this,_0x2e8081);if(VisuMZ['CombatLog']['Settings']['CombatLog'][_0x4b9a46(0x20a)]){if(_0x2e8081['result']()[_0x4b9a46(0x16d)]&&TextManager[_0x4b9a46(0x1fa)]){let _0x1bef81=TextManager[_0x4b9a46(0x1fa)],_0x5eed47=_0x1bef81[_0x4b9a46(0xe1)](_0x2e8081[_0x4b9a46(0xcf)]()),_0x3fd073=ImageManager[_0x4b9a46(0x1b6)];$gameSystem[_0x4b9a46(0x26b)](_0x5eed47,_0x3fd073);}else{if(TextManager[_0x4b9a46(0xf2)]){let _0x29d58a=TextManager[_0x4b9a46(0xf2)],_0x3b8d00=_0x29d58a[_0x4b9a46(0xe1)](_0x2e8081[_0x4b9a46(0xcf)]()),_0x444a90=ImageManager['combatLog_Evasion_Icon'];$gameSystem['addTextToCombatLog'](_0x3b8d00,_0x444a90);}}}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x285)]=Window_PartyCommand[_0x2c528f(0x12a)][_0x2c528f(0x1aa)],Window_PartyCommand[_0x2c528f(0x12a)][_0x2c528f(0x1aa)]=function(){const _0x128af0=_0x2c528f;VisuMZ[_0x128af0(0x1ba)][_0x128af0(0x285)][_0x128af0(0x114)](this);if(Imported[_0x128af0(0x122)])return;this['addCombatLogCommand']();},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x1ef)]=Window_PartyCommand[_0x2c528f(0x12a)][_0x2c528f(0xc9)],Window_PartyCommand[_0x2c528f(0x12a)][_0x2c528f(0xc9)]=function(){const _0x3b14ec=_0x2c528f;VisuMZ[_0x3b14ec(0x1ba)][_0x3b14ec(0x1ef)][_0x3b14ec(0x114)](this),this[_0x3b14ec(0x139)]();},Window_PartyCommand[_0x2c528f(0x12a)]['addCombatLogCommand']=function(){const _0x1cb810=_0x2c528f;if(!$gameSystem[_0x1cb810(0xd2)]())return;if(this['findSymbol'](_0x1cb810(0xc7))>=0x0)return;const _0x514b8b=Imported[_0x1cb810(0x122)]?this[_0x1cb810(0xeb)]():_0x1cb810(0x172),_0x1f2c0c=TextManager[_0x1cb810(0x247)],_0x12cb49=ImageManager[_0x1cb810(0x210)]||0x0,_0x274ed2=_0x514b8b===_0x1cb810(0x172)?_0x1f2c0c:_0x1cb810(0x1f4)[_0x1cb810(0xe1)](_0x12cb49,_0x1f2c0c);this[_0x1cb810(0x1cb)](_0x274ed2,'combatLog');},VisuMZ['CombatLog'][_0x2c528f(0x28c)]=Window_ActorCommand['prototype'][_0x2c528f(0x1aa)],Window_ActorCommand[_0x2c528f(0x12a)]['makeCommandList']=function(){const _0x29e269=_0x2c528f;VisuMZ[_0x29e269(0x1ba)][_0x29e269(0x28c)][_0x29e269(0x114)](this);if(Imported[_0x29e269(0x122)])return;if(this['findSymbol'](_0x29e269(0xc7))>=0x0)return;this[_0x29e269(0x139)]();},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x237)]=Window_ActorCommand[_0x2c528f(0x12a)][_0x2c528f(0xc9)],Window_ActorCommand[_0x2c528f(0x12a)][_0x2c528f(0xc9)]=function(){const _0xf76f7e=_0x2c528f;VisuMZ[_0xf76f7e(0x1ba)][_0xf76f7e(0x237)][_0xf76f7e(0x114)](this),this['addCombatLogCommand']();},Window_ActorCommand[_0x2c528f(0x12a)][_0x2c528f(0x139)]=function(){const _0x533b66=_0x2c528f;if(!$gameSystem['isActorCmdCombatLogVisible']())return;this[_0x533b66(0x171)]('combatLog')>=0x0&&this[_0x533b66(0xc8)]();const _0x6433bc=Imported[_0x533b66(0x122)]?this[_0x533b66(0xeb)]():_0x533b66(0x172),_0x13bd73=TextManager['combatLog_BattleCmd_Name'],_0x5c37e4=ImageManager[_0x533b66(0x210)]||0x0,_0x3ce833=_0x6433bc===_0x533b66(0x172)?_0x13bd73:_0x533b66(0x1f4)[_0x533b66(0xe1)](_0x5c37e4,_0x13bd73);this[_0x533b66(0x1cb)](_0x3ce833,_0x533b66(0xc7));},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)][_0x2c528f(0x245)]=Window_ActorCommand[_0x2c528f(0x12a)][_0x2c528f(0x1e3)],Window_ActorCommand['prototype'][_0x2c528f(0x1e3)]=function(){const _0x3d25b3=_0x2c528f,_0x3b85f8=this[_0x3d25b3(0x155)]();switch(_0x3b85f8){case _0x3d25b3(0xc7):this[_0x3d25b3(0x244)]['setText'](TextManager[_0x3d25b3(0x163)]);break;default:VisuMZ[_0x3d25b3(0x1ba)]['Settings'][_0x3d25b3(0x245)][_0x3d25b3(0x114)](this);break;}},Window_ActorCommand['prototype'][_0x2c528f(0xc8)]=function(){const _0x35b6e3=_0x2c528f;while(this[_0x35b6e3(0x171)](_0x35b6e3(0xc7))>=0x0){const _0x150698=this[_0x35b6e3(0x171)](_0x35b6e3(0xc7));this[_0x35b6e3(0x225)][_0x35b6e3(0x108)](_0x150698,0x1);}};function Window_CombatLogHistory(){const _0x5206cb=_0x2c528f;this[_0x5206cb(0x25d)](...arguments);}Window_CombatLogHistory[_0x2c528f(0x12a)]=Object[_0x2c528f(0x17a)](Window_HorzCommand[_0x2c528f(0x12a)]),Window_CombatLogHistory[_0x2c528f(0x12a)]['constructor']=Window_CombatLogHistory,Window_CombatLogHistory[_0x2c528f(0x12a)][_0x2c528f(0x25d)]=function(_0x22c66e){const _0x21d46c=_0x2c528f;Window_HorzCommand[_0x21d46c(0x12a)][_0x21d46c(0x25d)]['call'](this,_0x22c66e);},Window_CombatLogHistory[_0x2c528f(0x12a)][_0x2c528f(0x282)]=function(){const _0x118784=_0x2c528f;return $gameSystem[_0x118784(0xc4)]();},Window_CombatLogHistory['prototype']['processCursorHomeEndTrigger']=function(){},Window_CombatLogHistory[_0x2c528f(0x12a)][_0x2c528f(0x1c5)]=function(_0x335297){},Window_CombatLogHistory[_0x2c528f(0x12a)]['cursorUp']=function(_0x315453){},Window_CombatLogHistory[_0x2c528f(0x12a)]['update']=function(){const _0x15e377=_0x2c528f;Window_HorzCommand[_0x15e377(0x12a)][_0x15e377(0xf1)][_0x15e377(0x114)](this),this['_logWindow']&&this[_0x15e377(0x215)][_0x15e377(0x11e)](this[_0x15e377(0x19c)]());},Window_CombatLogHistory[_0x2c528f(0x12a)][_0x2c528f(0x276)]=function(_0x13bd98){const _0x20459b=_0x2c528f;this[_0x20459b(0x215)]=_0x13bd98;},Window_CombatLogHistory['prototype']['makeCommandList']=function(){const _0x86164=_0x2c528f;let _0x1a7c3a=$gameSystem['getTotalCombatLogs']();for(let _0x16b635=0x0;_0x16b635<_0x1a7c3a;_0x16b635++){let _0x4e6e1c=_0x16b635===0x0?TextManager[_0x86164(0x1cc)]:TextManager[_0x86164(0x188)],_0x18003f=_0x4e6e1c['format']($gameSystem[_0x86164(0x18b)]()-_0x16b635);this[_0x86164(0x1cb)](_0x18003f,'history',!![],_0x16b635);}};function Window_CombatLogDisplay(){const _0x459a79=_0x2c528f;this[_0x459a79(0x25d)](...arguments);}Window_CombatLogDisplay['prototype']=Object[_0x2c528f(0x17a)](Window_Command['prototype']),Window_CombatLogDisplay[_0x2c528f(0x12a)][_0x2c528f(0x271)]=Window_CombatLogDisplay,Window_CombatLogDisplay['BIGGER_LINE_HEIGHT']=![],Window_CombatLogDisplay['SHOW_LINE_BACKGROUND']=![],Window_CombatLogDisplay['HORZ_LINE_THICKNESS']=0x4,Window_CombatLogDisplay['SCROLL_SPEED_CURSOR']=0.2,Window_CombatLogDisplay['SCROLL_SPEED_PAGEDN']=1.5,Window_CombatLogDisplay[_0x2c528f(0x100)]=VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xd6)]['General'][_0x2c528f(0x19a)]||_0x2c528f(0xff),Window_CombatLogDisplay[_0x2c528f(0x12a)]['initialize']=function(_0x37ceda){const _0x30f5cd=_0x2c528f;Window_Command[_0x30f5cd(0x12a)][_0x30f5cd(0x25d)][_0x30f5cd(0x114)](this,_0x37ceda),this['deactivate'](),this[_0x30f5cd(0xd3)]=![],SceneManager[_0x30f5cd(0xd4)]()&&(this[_0x30f5cd(0x13b)]=0x0);},Window_CombatLogDisplay['prototype'][_0x2c528f(0x1fe)]=function(){const _0x509529=_0x2c528f;let _0x35316f=Window_Scrollable[_0x509529(0x12a)][_0x509529(0x1fe)][_0x509529(0x114)](this);return _0x35316f+(Window_CombatLogDisplay[_0x509529(0x142)]?0x8:0x0);},Window_CombatLogDisplay[_0x2c528f(0x12a)]['isAutoColorAffected']=function(){const _0x353f0d=_0x2c528f;return VisuMZ[_0x353f0d(0x1ba)][_0x353f0d(0xd6)][_0x353f0d(0x1ba)][_0x353f0d(0x257)];},Window_CombatLogDisplay[_0x2c528f(0x12a)]['isMenuCursorBlacklisted']=function(){return!![];},Window_CombatLogDisplay[_0x2c528f(0x12a)][_0x2c528f(0x1b9)]=function(_0x3d7624){},Window_CombatLogDisplay[_0x2c528f(0x12a)]['processOk']=function(){const _0xf6602a=_0x2c528f;this[_0xf6602a(0x1ea)]();},Window_CombatLogDisplay[_0x2c528f(0x12a)][_0x2c528f(0x217)]=function(){const _0x491691=_0x2c528f;this[_0x491691(0x1ea)]();},Window_CombatLogDisplay[_0x2c528f(0x12a)][_0x2c528f(0x1cd)]=function(){const _0x4c9e56=_0x2c528f;SceneManager['isSceneBattle']()&&!this[_0x4c9e56(0x17f)]&&($gameSystem[_0x4c9e56(0x202)]()&&Window_CombatLogDisplay['ACCESS_BUTTON']!==undefined&&(this[_0x4c9e56(0xd7)]()?(this[_0x4c9e56(0x1ca)](),this['open']()):this[_0x4c9e56(0xea)]())),this[_0x4c9e56(0xfd)]()&&(Input['isPressed'](_0x4c9e56(0x1c7))&&this[_0x4c9e56(0x13f)](Window_CombatLogDisplay[_0x4c9e56(0x14e)]),Input[_0x4c9e56(0x109)]('up')&&this['smoothScrollUp'](Window_CombatLogDisplay[_0x4c9e56(0x14e)]),Input['isPressed']('pagedown')&&this[_0x4c9e56(0x13f)](Window_CombatLogDisplay['SCROLL_SPEED_PAGEDN']),Input[_0x4c9e56(0x109)](_0x4c9e56(0xe8))&&this[_0x4c9e56(0x279)](Window_CombatLogDisplay[_0x4c9e56(0x1c2)]),Input[_0x4c9e56(0x1d7)](_0x4c9e56(0x298))&&this[_0x4c9e56(0x24c)](0x0,0x0),Input[_0x4c9e56(0x1d7)](_0x4c9e56(0x292))&&this[_0x4c9e56(0x24c)](0x0,this[_0x4c9e56(0x180)]()));},Window_CombatLogDisplay[_0x2c528f(0x12a)][_0x2c528f(0xd7)]=function(){const _0x1749bf=_0x2c528f;if($gameMessage[_0x1749bf(0x198)]())return![];if(BattleManager['_victoryPhase'])return![];if(Imported[_0x1749bf(0x200)]){if(SceneManager[_0x1749bf(0x130)][_0x1749bf(0x165)]())return![];}if(Imported['VisuMZ_3_InputComboSkills']){if(SceneManager[_0x1749bf(0x130)]['canPerformInputComboSkills']())return![];}return Input[_0x1749bf(0x109)](Window_CombatLogDisplay[_0x1749bf(0x100)]);},Window_CombatLogDisplay[_0x2c528f(0x12a)][_0x2c528f(0x11e)]=function(_0x16f0ec){const _0x5e7fdc=_0x2c528f;if(this[_0x5e7fdc(0xfb)]===_0x16f0ec)return;this[_0x5e7fdc(0xfb)]=_0x16f0ec,this[_0x5e7fdc(0x1e6)](),this[_0x5e7fdc(0xda)](0x0,0x0);},Window_CombatLogDisplay[_0x2c528f(0x12a)]['makeCommandList']=function(){const _0x549f8c=_0x2c528f;if(this['_combatLogIndex']===undefined)return;const _0x361ac7=$gameSystem['getCombatLog'](this[_0x549f8c(0xfb)]);for(const _0x20e72c of _0x361ac7){if(!_0x20e72c)continue;this[_0x549f8c(0x1cb)](_0x20e72c,'combatLog');}const _0x3199e7=this[_0x549f8c(0x225)][this[_0x549f8c(0x225)][_0x549f8c(0x1f6)]-0x1];_0x3199e7&&_0x3199e7[_0x549f8c(0x18a)]!==_0x549f8c(0x249)&&this['addCommand'](_0x549f8c(0x249),_0x549f8c(0xc7));},Window_CombatLogDisplay[_0x2c528f(0x12a)]['drawItemBackground']=function(_0x4ebe94){const _0x4b82ee=_0x2c528f;if(Window_CombatLogDisplay[_0x4b82ee(0x24b)]){const _0x45a5c2=this['itemRect'](_0x4ebe94);this['drawBackgroundRect'](_0x45a5c2);}},Window_CombatLogDisplay[_0x2c528f(0x12a)][_0x2c528f(0x263)]=function(_0x18cacf){const _0x134e5b=_0x2c528f,_0x115c2f=this[_0x134e5b(0x1a0)](_0x18cacf),_0x5ed477=this[_0x134e5b(0x1b1)](_0x18cacf);_0x5ed477==='=====HORZLINE====='?this['drawHorzLine'](_0x115c2f):this[_0x134e5b(0x10e)](_0x5ed477,_0x115c2f['x'],_0x115c2f['y'],_0x115c2f[_0x134e5b(0x15e)]);},Window_CombatLogDisplay[_0x2c528f(0x12a)][_0x2c528f(0x137)]=function(_0x39be83){const _0x49dcbd=_0x2c528f;this[_0x49dcbd(0xe3)]();const _0xeb46bb=Window_CombatLogDisplay[_0x49dcbd(0x27c)],_0x29d179=_0x39be83['y']+(_0x39be83[_0x49dcbd(0x194)]-_0xeb46bb)/0x2;this[_0x49dcbd(0x143)](_0x39be83['x'],_0x29d179,_0x39be83[_0x49dcbd(0x15e)],_0xeb46bb);},Window_CombatLogDisplay[_0x2c528f(0x12a)][_0x2c528f(0x195)]=function(){const _0x42cef9=_0x2c528f;this[_0x42cef9(0xd3)]=!![];},Window_CombatLogDisplay['prototype'][_0x2c528f(0x1ca)]=function(){const _0x1f7be5=_0x2c528f;this[_0x1f7be5(0xd3)]&&this[_0x1f7be5(0x16b)]();},Window_CombatLogDisplay[_0x2c528f(0x12a)][_0x2c528f(0x16b)]=function(){const _0x4d93a7=_0x2c528f;this['_requestRefresh']=![],this[_0x4d93a7(0xfb)]=0x0,this[_0x4d93a7(0x1e6)](),this[_0x4d93a7(0xda)](0x0,this[_0x4d93a7(0x180)]());},Window_CombatLogDisplay['prototype'][_0x2c528f(0x1d2)]=function(_0x2879cd){this['_lastWindow']=_0x2879cd;},Window_CombatLogDisplay[_0x2c528f(0x12a)][_0x2c528f(0xbb)]=function(){const _0x4c8e62=_0x2c528f;return this[_0x4c8e62(0x115)];},Window_CombatLogDisplay[_0x2c528f(0x12a)][_0x2c528f(0x25c)]=function(){const _0x125f14=_0x2c528f;this[_0x125f14(0x22d)]=new Sprite(),this['_dimmerSprite']['bitmap']=new Bitmap(0x0,0x0),this[_0x125f14(0x22d)]['x']=-0x4,this[_0x125f14(0x220)](this[_0x125f14(0x22d)]);},Window_CombatLogDisplay[_0x2c528f(0x12a)][_0x2c528f(0x140)]=function(){const _0x14de22=_0x2c528f;if(this[_0x14de22(0x22d)]){const _0x5b579b=this['_dimmerSprite'][_0x14de22(0x265)],_0x2a85d7=this[_0x14de22(0x15e)]>0x0?this[_0x14de22(0x15e)]+0x8:0x0,_0x1187de=this['height'],_0x5c0de8=this[_0x14de22(0x297)],_0x522cb=ColorManager['dimColor1'](),_0x14ce99=ColorManager[_0x14de22(0x242)]();_0x5b579b[_0x14de22(0x233)](_0x2a85d7,_0x1187de),_0x5b579b[_0x14de22(0x170)](0x0,0x0,_0x2a85d7,_0x5c0de8,_0x14ce99,_0x522cb,!![]),_0x5b579b[_0x14de22(0x206)](0x0,_0x5c0de8,_0x2a85d7,_0x1187de-_0x5c0de8*0x2,_0x522cb),_0x5b579b[_0x14de22(0x170)](0x0,_0x1187de-_0x5c0de8,_0x2a85d7,_0x5c0de8,_0x522cb,_0x14ce99,!![]),this[_0x14de22(0x22d)][_0x14de22(0x23e)](0x0,0x0,_0x2a85d7,_0x1187de),$gameParty[_0x14de22(0x15f)]()&&(this['_dimmerSprite'][_0x14de22(0x25f)]['x']=0x64,this[_0x14de22(0x22d)][_0x14de22(0x131)]['x']=0.5);}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x173)]=Game_Battler['prototype'][_0x2c528f(0x269)],Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0x269)]=function(){const _0x2edb78=_0x2c528f;VisuMZ[_0x2edb78(0x1ba)][_0x2edb78(0x173)][_0x2edb78(0x114)](this);if(!SceneManager['isSceneBattle']())return;const _0x47f3de=VisuMZ['CombatLog'][_0x2edb78(0xd6)][_0x2edb78(0x253)];if(!_0x47f3de)return;if(!_0x47f3de[_0x2edb78(0x147)])return;const _0x51ba7f=_0x47f3de[_0x2edb78(0x19d)];if(_0x51ba7f){let _0x243a5a=_0x51ba7f[_0x2edb78(0xe1)](this[_0x2edb78(0xcf)]()),_0x4d88ab=_0x47f3de['IconBattleSysAtbInterrupt'];$gameSystem[_0x2edb78(0x26b)](_0x243a5a,_0x4d88ab);}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x239)]=Game_Battler[_0x2c528f(0x12a)]['onCtbOrderChange'],Game_Battler[_0x2c528f(0x12a)]['onCtbOrderChange']=function(_0x2d3d8f){const _0xb8ebed=_0x2c528f;VisuMZ[_0xb8ebed(0x1ba)]['Game_Battler_onCtbOrderChange'][_0xb8ebed(0x114)](this,_0x2d3d8f);if(_0x2d3d8f===0x0)return;if(!SceneManager[_0xb8ebed(0xd4)]())return;const _0x34835a=VisuMZ[_0xb8ebed(0x1ba)]['Settings'][_0xb8ebed(0x253)];if(!_0x34835a)return;if(!_0x34835a[_0xb8ebed(0x26f)])return;const _0x33fa85=_0x34835a[_0xb8ebed(0x10b)];if(_0x33fa85){let _0x52864a=_0x33fa85[_0xb8ebed(0xe1)](this[_0xb8ebed(0xcf)]()),_0x4ab72a=_0x34835a[_0xb8ebed(0xe7)];$gameSystem[_0xb8ebed(0x26b)](_0x52864a,_0x4ab72a);}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x184)]=Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0x168)],Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0x168)]=function(_0x2f2761){const _0xaf4af1=_0x2c528f;VisuMZ[_0xaf4af1(0x1ba)][_0xaf4af1(0x184)]['call'](this,_0x2f2761);if(_0x2f2761===0x0)return;if(!SceneManager[_0xaf4af1(0xd4)]())return;const _0xa8b091=VisuMZ['CombatLog'][_0xaf4af1(0xd6)]['Compatibility'];if(!_0xa8b091)return;if(!_0xa8b091[_0xaf4af1(0x226)])return;const _0x1360ac=_0xa8b091['TextBattleSysStbInstant'];if(_0x1360ac){let _0x140db2=_0x1360ac[_0xaf4af1(0xe1)](this[_0xaf4af1(0xcf)]()),_0x29429c=_0xa8b091['IconBattleSysStbInstant'];$gameSystem[_0xaf4af1(0x26b)](_0x140db2,_0x29429c);}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x117)]=Game_Battler[_0x2c528f(0x12a)]['onAntiDamageNullificationBarrier'],Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0x183)]=function(_0xf916cc){const _0x2e9298=_0x2c528f,_0x16b652=VisuMZ['CombatLog'][_0x2e9298(0xd6)]['Compatibility'];if(_0x16b652&&_0x16b652[_0x2e9298(0x236)]&&SceneManager['isSceneBattle']()){let _0x31d345=_0x16b652['Text_AntiDmgBarrier_Nullify'];if(_0x31d345){let _0x46398c=_0x31d345[_0x2e9298(0xe1)](this[_0x2e9298(0xcf)](),_0xf916cc['name']),_0x54fdf8=_0xf916cc[_0x2e9298(0x102)];$gameSystem[_0x2e9298(0x26b)](_0x46398c,_0x54fdf8);}}VisuMZ[_0x2e9298(0x1ba)]['Game_Battler_onAntiDamageNullificationBarrier']['call'](this,_0xf916cc);},VisuMZ[_0x2c528f(0x1ba)]['Game_Battler_onAntiDamageCancelBarrier']=Game_Battler[_0x2c528f(0x12a)]['onAntiDamageCancelBarrier'],Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0x258)]=function(_0x4ad3c1){const _0x1cbd06=_0x2c528f,_0x50f815=VisuMZ[_0x1cbd06(0x1ba)][_0x1cbd06(0xd6)]['Compatibility'];if(_0x50f815&&_0x50f815[_0x1cbd06(0x1be)]&&SceneManager[_0x1cbd06(0xd4)]()){let _0x102335=_0x50f815[_0x1cbd06(0x1e9)];if(_0x102335){let _0x43d894=_0x102335[_0x1cbd06(0xe1)](this['combatLogName'](),_0x4ad3c1[_0x1cbd06(0x18a)]),_0x5c24c2=_0x4ad3c1[_0x1cbd06(0x102)];$gameSystem[_0x1cbd06(0x26b)](_0x43d894,_0x5c24c2);}}VisuMZ[_0x1cbd06(0x1ba)][_0x1cbd06(0x246)]['call'](this,_0x4ad3c1);},VisuMZ['CombatLog'][_0x2c528f(0x1e7)]=Game_BattlerBase[_0x2c528f(0x12a)][_0x2c528f(0xed)],Game_BattlerBase[_0x2c528f(0x12a)]['getAntiDamageBarrierReduction']=function(_0x3fb77b){const _0x269220=_0x2c528f,_0x3115f7=VisuMZ[_0x269220(0x1ba)][_0x269220(0xd6)][_0x269220(0x253)];if(_0x3115f7&&_0x3115f7[_0x269220(0x26c)]&&SceneManager['isSceneBattle']()){let _0x2c71d1=_0x3115f7[_0x269220(0x212)];if(_0x2c71d1){let _0x40206f=_0x2c71d1[_0x269220(0xe1)](this[_0x269220(0xcf)](),$dataStates[_0x3fb77b][_0x269220(0x18a)]),_0x2e6225=$dataStates[_0x3fb77b][_0x269220(0x102)];$gameSystem[_0x269220(0x26b)](_0x40206f,_0x2e6225);}}return VisuMZ[_0x269220(0x1ba)]['Game_BattlerBase_getAntiDamageBarrierReduction'][_0x269220(0x114)](this,_0x3fb77b);},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x148)]=Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0x25a)],Game_Battler['prototype']['displayAbsorptionBarrierPopup']=function(_0x10443e,_0x56a249){const _0xbf72bd=_0x2c528f;VisuMZ['CombatLog'][_0xbf72bd(0x148)]['call'](this,_0x10443e,_0x56a249);if(_0x10443e===0x0)return;const _0x375392=VisuMZ[_0xbf72bd(0x1ba)][_0xbf72bd(0xd6)][_0xbf72bd(0x253)];if(_0x375392&&_0x375392[_0xbf72bd(0x1bd)]&&SceneManager[_0xbf72bd(0xd4)]()){let _0x13f019=_0x375392['Text_AntiDmgBarrier_Absorb'];if(_0x13f019){let _0x30a9aa=_0x13f019['format'](this[_0xbf72bd(0xcf)](),_0x56a249[_0xbf72bd(0x18a)],_0x10443e),_0x350e41=_0x56a249[_0xbf72bd(0x102)];$gameSystem[_0xbf72bd(0x26b)](_0x30a9aa,_0x350e41);}}},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x101)]=Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0x1a4)],Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0x1a4)]=function(_0xeca45f){const _0x5aa28a=_0x2c528f,_0x3e466b=VisuMZ[_0x5aa28a(0x1ba)][_0x5aa28a(0xd6)][_0x5aa28a(0x253)];if(_0x3e466b&&_0x3e466b[_0x5aa28a(0x24a)]&&SceneManager[_0x5aa28a(0xd4)]()){let _0x5d2e0d=_0x3e466b[_0x5aa28a(0x22f)];if(_0x5d2e0d){let _0xba6bd5=_0x5d2e0d[_0x5aa28a(0xe1)](this['combatLogName'](),_0xeca45f['name'],TextManager['mp']),_0x174d30=_0xeca45f['iconIndex'];$gameSystem[_0x5aa28a(0x26b)](_0xba6bd5,_0x174d30);}}VisuMZ['CombatLog']['Game_Battler_onAntiDamageMpBarrier'][_0x5aa28a(0x114)](this,_0xeca45f);},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0x11a)]=Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0x111)],Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0x111)]=function(_0x38292b){const _0x2a6e94=_0x2c528f,_0x2a5665=VisuMZ['CombatLog'][_0x2a6e94(0xd6)]['Compatibility'];if(_0x2a5665&&_0x2a5665[_0x2a6e94(0x1ae)]&&SceneManager[_0x2a6e94(0xd4)]()){let _0x405d4c=_0x2a5665[_0x2a6e94(0xd8)];if(_0x405d4c){let _0x34babd=_0x405d4c['format'](this[_0x2a6e94(0xcf)](),_0x38292b['name'],TextManager['tp']),_0x4761f4=_0x38292b[_0x2a6e94(0x102)];$gameSystem[_0x2a6e94(0x26b)](_0x34babd,_0x4761f4);}}VisuMZ[_0x2a6e94(0x1ba)][_0x2a6e94(0x11a)][_0x2a6e94(0x114)](this,_0x38292b);},VisuMZ[_0x2c528f(0x1ba)][_0x2c528f(0xe2)]=Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0xc1)],Game_Battler[_0x2c528f(0x12a)][_0x2c528f(0xc1)]=function(_0x10cdb2){const _0x3855df=_0x2c528f;VisuMZ[_0x3855df(0x1ba)]['Game_Battler_onLifeStateEffect']['call'](this,_0x10cdb2);if(!SceneManager[_0x3855df(0xd4)]())return;if(!_0x10cdb2)return;const _0x5eaf95=VisuMZ[_0x3855df(0x1ba)]['Settings']['Compatibility'];if(!_0x5eaf95)return;if(!_0x5eaf95[_0x3855df(0x26d)[_0x3855df(0xe1)](_0x10cdb2)])return;let _0xa355c5=_0x5eaf95['Text_LifeStateEffects_%1'[_0x3855df(0xe1)](_0x10cdb2)];if(_0xa355c5){let _0x213b88=_0xa355c5[_0x3855df(0xe1)](this[_0x3855df(0xcf)]()),_0x5122c6=_0x5eaf95[_0x3855df(0x189)['format'](_0x10cdb2)];$gameSystem[_0x3855df(0x26b)](_0x213b88,_0x5122c6);}},VisuMZ[_0x2c528f(0x1ba)]['Window_BattleLog_addStealText']=Window_BattleLog['prototype'][_0x2c528f(0x199)],Window_BattleLog[_0x2c528f(0x12a)][_0x2c528f(0x199)]=function(_0xd5436e){const _0x2aa876=_0x2c528f;VisuMZ['CombatLog'][_0x2aa876(0x22b)][_0x2aa876(0x114)](this,_0xd5436e);if(_0xd5436e==='')return;const _0x5044cc=VisuMZ['CombatLog'][_0x2aa876(0xd6)][_0x2aa876(0x253)];if(_0x5044cc&&_0x5044cc[_0x2aa876(0xbd)]&&SceneManager[_0x2aa876(0xd4)]()){let _0x15f76b=_0x5044cc[_0x2aa876(0x286)];$gameSystem[_0x2aa876(0x26b)](_0xd5436e,_0x15f76b);}};