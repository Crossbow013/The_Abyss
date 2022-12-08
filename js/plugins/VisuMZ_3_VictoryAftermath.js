//=============================================================================
// VisuStella MZ - Victory Aftermath
// VisuMZ_3_VictoryAftermath.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VictoryAftermath = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VictoryAftermath = VisuMZ.VictoryAftermath || {};
VisuMZ.VictoryAftermath.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.16] [VictoryAftermath]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Victory_Aftermath_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Victory Aftermath plugin consolidates the rewards granted upon finishing
 * a battle successfully into one screen (or more if there are level ups).
 * This helps reduce the amount of button presses needed to display similar
 * information by default. The level up screens will also display parameter
 * changes and new skills acquired in addition to victory quotes.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Consolidates EXP, Gold, and Items acquired through battle rewards into one
 *   battle screen.
 * * EXP gauges for currently active battle party will be displayed on the same
 *   screen to indicate progress.
 * * Upon leveling up, individual screens can be shown (optionally) to display
 *   parameter changes, new skills acquired, and level up quotes.
 * * Plugin Commands can be used to clear/add new quotes at any time.
 * * Plugin Commands can be used by bypass certain parts of the Victory
 *   Aftermath segments or the entire thing completely.
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
 * - VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
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
 * - The EXP gauge colors will match the color settings found in the Core
 * Engine's Plugin Parameters instead of defaulting to specific colors.
 *
 * - The continue message will display any changed input keys designated by
 * the Core Engine's Plugin Parameters.
 *
 * ---
 *
 * VisuMZ_1_MainMenuCore
 *
 * - Upon leveling up, the Menu Image will show up (optional) as a bust during
 * the quote segment.
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
 * <Level Up Quotes>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 * </Level Up Quotes>
 *
 * - Used for: Actor Notetags
 * - Description
 * - Replace 'text' with the text you'd want the actor to say when leveling up.
 * - The <New Quote> tag is used between the <Level Up Quotes> notetags to
 *   separate quotes.
 * - If an actor has multiple quotes (due to the <New Quote> notetag), then a
 *   random quote will be selected upon level up.
 * - If this notetag is not found inside an actor's notebox, a random level up
 *   quote will be selected from the Plugin Parameters => Level Up => Quotes =>
 *   Level Up Quotes plugin parameter.
 *
 * ---
 *
 * <New Skill Quotes>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 * </New Skill Quotes>
 *
 * - Used for: Actor Notetags
 * - Description
 * - Replace 'text' with the text you'd want the actor to say when leveling up
 *   in addition to learning a new skill upon leveling up.
 * - The <New Quote> tag is used between the <New Skill Quotes> notetags to
 *   separate quotes.
 * - If an actor has multiple quotes (due to the <New Quote> notetag), then a
 *   random quote will be selected upon level up and learning a new skill.
 * - If this notetag is not found inside an actor's notebox, a random new skill
 *   quote will be selected from the Plugin Parameters => Level Up => Quotes =>
 *   New Skill Quotes plugin parameter.
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
 * Actor: Add Level Up Quotes
 * - Add new entries target actor's level up quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to add quotes for.
 *
 *   New Quotes:
 *   - Add new entries to actor's level up quotes.
 *   - Text codes allowed. %1 - Actor's Name
 *
 * ---
 *
 * Actor: Add New Skill Quotes
 * - Add new entries target actor's new skill quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to add quotes for.
 *
 *   New Quotes:
 *   - Add new entries to actor's new skill quotes.
 *   - Text codes allowed. %1 - Actor's Name
 *
 * ---
 *
 * Actor: Clear Level Up Quotes
 * - Clear target actor's level up quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to clear quotes for.
 *
 * ---
 *
 * Actor: Clear New Skill Quotes
 * - Clear target actor's new skill quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to clear quotes for.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Bypass Victory Motion
 * - Bypass actors performing their victory motion?
 *
 *   Bypass?:
 *   - Bypass actors performing their victory motion?
 *
 * ---
 *
 * System: Bypass Victory Music
 * - Bypass playing the victory music?
 *
 *   Bypass?:
 *   - Bypass playing the victory music?
 *
 * ---
 *
 * System: Bypass Victory Phase
 * - Bypass the entire victory phase and all aspects about it?
 *
 *   Bypass?:
 *   - Bypass the entire victory phase and all aspects about it?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The general settings Plugin Parameters control the overall settings found
 * within the main aspects of the Victory Aftermath sequence.
 *
 * ---
 *
 * General Settings
 * 
 *   Fade In Speed:
 *   - Fade in speed for the victory window.
 * 
 *   Hide Delay (MS):
 *   - Delay in milliseconds before hiding the UI Windows.
 * 
 *   Show Delay (MS):
 *   - Delay in milliseconds before showing the Victory Windows.
 * 
 *   Update Duration:
 *   - Duration in frames on updating actor EXP gauges.
 * 
 *   Auto Skip Auto Battle?:
 *   - Skip the Victory Aftermath sequence if the player has decided to use
 *     the party Auto Battle command?
 * 
 *   Mirror Contents?:
 *   - Mirror the positions of EXP, Gold, and Items?
 * 
 *   Show EXP Gauges?:
 *   - Show the EXP Gauges of the main party members for the first screen of
 *     the Victory Aftermath?
 *   - This is added for those with large parties and cannot fit everything
 *     into one screen for all party members and would prefer not showing any
 *     EXP Gauges at all instead.
 *
 * ---
 * 
 * Collapse Effect
 * 
 *   Normal Collapse Wait?:
 *   - Wait for the normal collapse effect to finish?
 * 
 *   Boss Collapse Wait?:
 *   - Wait for the boss collapse effect to finish?
 * 
 * ---
 * 
 * Victory Music
 * 
 *   Victory BGM:
 *   - Background music to play during the victory sequence.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Reward Strips Settings
 * ============================================================================
 *
 * Reward strip settings that appear in the first screen of the Victory
 * Aftermath. These are used to let you have control over what rewards are
 * displayed at the end of each battle and can be used to display custom data
 * from other plugins as well.
 *
 * ---
 *
 * Reward Strip
 * 
 *   Label:
 *   - This one doesn't have any use other than being a label to  quickly
 *     determine what this one is for.
 * 
 *   JS: Show:
 *   - Code used to determine if the reward strip is shown.
 * 
 *   JS: Text:
 *   - Code used to determine if the text displayed as the category.
 * 
 *   JS: Data:
 *   - Code used to determine what data should be displayed in the
 *     reward strip.
 *
 * ---
 * 
 * The default parameters for this will be updated from time to time as more
 * VisuStella MZ plugins are released to add in extra displayed resources that
 * the party can gain from battle.
 *
 * ============================================================================
 * Plugin Parameters: Level Up Settings
 * ============================================================================
 *
 * When actors level up, extra screens will be displayed in the Victory
 * Aftermath sequence. Alter these settings to best fit your game.
 *
 * ---
 *
 * General
 * 
 *   Enable?:
 *   - Enable the Level Up portion of the Victory Aftermath phase?
 * 
 *   Show Face?:
 *   - Show the actor's face?
 * 
 *   Show Param Change?:
 *   - Show an extra column for parameter value differences?
 * 
 *     Hide Level?:
 *     - Hide the level change in the parameter value differences?
 * 
 *   Shown Max Skills:
 *   - The maximum amount of skills that are displayed.
 *   - This is due to limited screen space.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Quotes
 * 
 *   Level Up Quotes:
 *   - A list of generic level up quotes for those who don't have the
 *     <Level Up Quote> notetags.
 *   - %1 - Actor Name
 * 
 *   New Skill Quotes:
 *   - A list of generic level up quotes for those who don't have the
 *     <New Skill Quote> notetags.
 *   - %1 - Actor Name
 *
 * ---
 *
 * VisuMZ_1_MainMenuCore
 * - The following Plugin Parameters require VisuMZ_1_MainMenuCore.
 * 
 *   Show Bust?:
 *   - Show the actor's menu image as a bust?
 * 
 *   Bust Position X:
 *   - Positon to center the actor's menu image bust.
 *   - You may use JavaScript code.
 * 
 *   Bust Position Y:
 *   - Positon to anchor the actor's menu image bust.
 *   - You may use JavaScript code.
 * 
 *   Bust Scale:
 *   - The amount to scale the actor's menu image bust.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * There's certain diction used in the Victory Aftermath plugin that's not set
 * anywhere else in the game. Change the settings to make it fit your game.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Continue Format:
 *   - Text format for continue message.
 *   - %1 - OK key, %2 - Cancel key
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Level Format:
 *   - Text format for actor level.
 *   - %1 - Level
 * 
 *   Level Up:
 *   - Text format for reaching a level up.
 * 
 *   Sound Effect:
 *   - Sound effect played when a level up occurs.
 * 
 *     Volume:
 *     - Volume of the sound effect played.
 * 
 *     Pitch:
 *     - Pitch of the sound effect played.
 * 
 *     Pan:
 *     - Pan of the sound effect played.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors
 *     from the Window Skin.
 * 
 *   New Skill Format:
 *   - Text format describing that a new skill has been learned.
 *   - %1 - Actor Name
 * 
 *   Reward Items:
 *   - Text displayed for items rewarded.
 * 
 *   Victory Title:
 *   - Text displayed at the top of the victory screen.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.16: January 6, 2022
 * * Bug Fixes!
 * ** Fixed incorrect level change display text. Fix made by Olivia.
 * 
 * Version 1.15: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** Battle Core's post-battle common events should now load properly. This
 *     incompatibility is due to RPG Maker MZ 1.4.0's core scripts added in
 *     a common event queue clear. Update made by Olivia.
 * 
 * Version 1.14: December 9, 2021
 * * Feature Update!
 * ** Victory Aftermath gauges now automatically round to the nearest pixel
 *    rather than be on half pixels with specific resolutions. Update by Irina.
 * 
 * Version 1.13: September 23, 2021
 * * Bug Fixes!
 * ** Values for parameter differences should no longer be hidden or the same
 *    as the previous values. Fix made by Irina.
 * 
 * Version 1.12: August 27, 2021
 * * Bug Fixes!
 * ** X-Parameters and S-Parameters shown in the level up stat changes should
 *    now display the percentage signs properly. Fix made by Olivia.
 * 
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: March 12, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > General > Show EXP Gauges?
 * **** Show the EXP Gauges of the main party members for the first screen of
 *      the Victory Aftermath?
 * **** This is added for those with large parties and cannot fit everything
 *      into one screen for all party members and would prefer not showing any
 *      EXP Gauges at all instead.
 * 
 * Version 1.09: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Vocab > Level Up > Volume
 * *** Plugin Parameters > Vocab > Level Up > Pitch
 * *** Plugin Parameters > Vocab > Level Up > Pan
 * **** For the people who want more control over the level up sound effect.
 * 
 * Version 1.08: December 11, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Feature Updates!
 * ** The default Plugin Parameter for "Reward Strips" have been updated to
 *    contain compatibility for a future plugin.
 * 
 * Version 1.07: December 4, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Parameter added by Olivia:
 * ** Plugin Parameters > Level Up Settings > Hide Level?
 * *** Hide the level change in the parameter value differences when comparing
 *     the stat changes from the previous level to the next.
 * 
 * Version 1.06: November 29, 2020
 * * Bug Fixed!
 * ** The default reward strips Plugin Parameters data is now updated for the
 *    SP display costs to show the Skill Points data instead of Ability Points
 *    data. Fix made by Arisu.
 * 
 * Version 1.05: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameter added by Arisu.
 * *** Plugin Parameters > Reward Strips
 * **** Reward strip settings that appear in the first screen of the Victory
 *      Aftermath. These are used to let you have control over what rewards are
 *      displayed at the end of each battle and can be used to display custom
 *      data from other plugins as well.
 * 
 * Version 1.04: October 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > General > Mirror Contents?
 * **** Mirror the positions of EXP, Gold, and Items?
 * 
 * Version 1.03: October 18, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** BGM pitch plugin parameter is now uncapped.
 * * New Features!
 * ** New plugin parameters added by Yanfly.
 * *** Plugin Parameters > General > Collapse Effect > Normal Collapse Wait?
 * *** Plugin Parameters > General > Collapse Effect > Boss Collapse Wait?
 * **** These settings enable you to decide if you want the Victory Aftermath
 *      to wait until collapse effects are finished before continuing.
 * *** Plugin Parameters > General > Music > Volume
 * *** Plugin Parameters > General > Music > Pitch
 * *** Plugin Parameters > General > Music > Pan
 * **** Adjusts the volume, pitch, and pan of the victory music.
 * 
 * Version 1.02: September 13, 2020
 * * Feature Update!
 * ** Victory Aftermath windows now wait until all boss collapse effects are
 *    done before showing. Update added by Olivia.
 * * New Features!
 * ** New Plugin Parameter under General Settings: Auto Skip Auto Battle?
 * *** Skip the Victory Aftermath sequence if the player has decided to use the
 *     party Auto Battle command?
 * *** Feature added by Olivia
 * 
 * Version 1.01: September 6, 2020
 * * New Features!
 * ** New Plugin Parameters added in Level Up Settings for disabling
 *    the back rectangles and/or changing their colors.
 *
 * Version 1.00: August 26, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesLevelUpAdd
 * @text Actor: Add Level Up Quotes
 * @desc Add new entries target actor's level up quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to add quotes for.
 * @default 1
 *
 * @arg NewQuotes:arrayjson
 * @text New Quotes
 * @type note[]
 * @desc Add new entries to actor's level up quotes.
 * Text codes allowed. %1 - Actor's Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Text\\\"\""]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesNewSkillAdd
 * @text Actor: Add New Skill Quotes
 * @desc Add new entries target actor's new skill quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to add quotes for.
 * @default 1
 *
 * @arg NewQuotes:arrayjson
 * @text New Quotes
 * @type note[]
 * @desc Add new entries to actor's new skill quotes.
 * Text codes allowed. %1 - Actor's Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Text\\\"\""]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesLevelUpClear
 * @text Actor: Clear Level Up Quotes
 * @desc Clear target actor's level up quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to clear quotes for.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesNewSkillClear
 * @text Actor: Clear New Skill Quotes
 * @desc Clear target actor's new skill quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to clear quotes for.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryMotion
 * @text System: Bypass Victory Motion
 * @desc Bypass actors performing their victory motion?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass actors performing their victory motion?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryMusic
 * @text System: Bypass Victory Music
 * @desc Bypass playing the victory music?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass playing the victory music?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryPhase
 * @text System: Bypass Victory Phase
 * @desc Bypass the entire victory phase and all aspects about it?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass the entire victory phase and all aspects about it?
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
 * @param VictoryAftermath
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
 * @desc General settings pertaining to the Victory Aftermath phase.
 * @default {"General":"","FadeInSpeed:num":"8","HideDelayMS:num":"1500","ShowDelayMS:num":"2000","UpdateDuration:num":"180","AutoBattleAutoSkip:eval":"true","MirrorContents:eval":"false","Collapse":"","WaitRegularCollapse:eval":"true","WaitBossCollapse:eval":"true","Music":"","Bgm:str":"Ship3","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param Rewards:arraystruct
 * @text Reward Strips
 * @parent General:struct
 * @type struct<Rewards>[]
 * @desc Reward strip settings that appear in the first screen of the Victory Aftermath.
 * @default ["{\"Label\":\"EXP\",\"Show:func\":\"\\\"return true;\\\"\",\"Text:func\":\"\\\"return TextManager.exp;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.exp;\\\"\"}","{\"Label\":\"Gold\",\"Show:func\":\"\\\"return true;\\\"\",\"Text:func\":\"\\\"return TextManager.currencyUnit;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.gold;\\\"\"}","{\"Label\":\"AP (Skill Learn System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_SkillLearnSystem &&\\\\n    VisuMZ.SkillLearnSystem.Settings.AbilityPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.abilityPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.abilityPoints;\\\"\"}","{\"Label\":\"CP (Class Change System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    VisuMZ.ClassChangeSystem.Settings.ClassPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.classPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.classPoints;\\\"\"}","{\"Label\":\"JP (Class Change System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    VisuMZ.ClassChangeSystem.Settings.JobPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.jobPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.jobPoints;\\\"\"}","{\"Label\":\"SP (Skill Learn System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_SkillLearnSystem &&\\\\n    VisuMZ.SkillLearnSystem.Settings.SkillPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.skillPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.skillPoints;\\\"\"}"]
 *
 * @param LevelUp:struct
 * @text Level Up Settings
 * @type struct<LevelUp>
 * @desc Settings pertaining to the Level Up portion of the Victory Aftermath phase.
 * @default {"General":"","Enable:eval":"true","ShowFace:eval":"false","ShowParamDiff:eval":"true","HideLevelDiff:eval":"false","MaxSkills:num":"8","DelayBuffer:num":"200","DrawBackRect:eval":"true","BackRectColor:str":"19","Quotes":"","LevelUpQuotes:arrayjson":"[\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Alright! A level up!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Yes! I've leveled up!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Oh? I've leveled up!?\\\\n This is awesome!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Looks like I've become stronger!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I feel like I'm getting used to battle.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"The power! I can feel it!\\\\\\\"\\\"\"]","NewSkillQuotes:arrayjson":"[\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Looks like I've acquired a new skill!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"This new skill should come in handy.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"It seems I've learned something new!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I've acquired a new power!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"This should be useful for future battles.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I wonder what this new skill is like?\\\\\\\"\\\"\"]","MainMenuCore":"","ShowBust:eval":"true","BustPosX:str":"Graphics.width * 0.25","BustPosY:str":"Graphics.height","BustScale:num":"1.20"}
 *
 * @param Vocab:struct
 * @text Vocabulary
 * @type struct<Vocab>
 * @desc The vocabulary used for this plugin and related settings.
 * @default {"ContinueFmt:str":"Press %1 or %2 to continue","KeyOK:str":"OK","KeyCancel:str":"Cancel","LvFmt:str":"LV %1","LvUp:str":"LEVEL UP!","LvUpSfx:str":"Up4","LvUpVolume:num":"90","LvUpPitch:num":"100","LvUpPan:num":"0","LvUpColor:str":"17","NewSkill:str":"%1 has learned:","RewardItems:str":"Items Obtained","Victory:str":"Victory!"}
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
 * @param FadeInSpeed:num
 * @text Fade In Speed
 * @parent General
 * @desc Fade in speed for the victory window.
 * @default 8
 *
 * @param HideDelayMS:num
 * @text Hide Delay (MS)
 * @parent General
 * @desc Delay in milliseconds before hiding the UI Windows.
 * @default 1500
 *
 * @param ShowDelayMS:num
 * @text Show Delay (MS)
 * @parent General
 * @desc Delay in milliseconds before showing the Victory Windows.
 * @default 2000
 *
 * @param UpdateDuration:num
 * @text Update Duration
 * @parent General
 * @desc Duration in frames on updating actor EXP gauges.
 * @default 180
 *
 * @param AutoBattleAutoSkip:eval
 * @text Skip Auto Battle?
 * @parent General
 * @type boolean
 * @on Skip
 * @off Don't Skip
 * @desc Skip the Victory Aftermath sequence if the player has
 * decided to use the party Auto Battle command?
 * @default true
 *
 * @param MirrorContents:eval
 * @text Mirror Contents?
 * @parent General
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the positions of EXP, Gold, and Items?
 * @default false
 *
 * @param ShowExpGauges:eval
 * @text Show EXP Gauges?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the EXP Gauges of the main party members
 * for the first screen of the Victory Aftermath?
 * @default true
 * 
 * @param Collapse
 * @text Collapse Effect
 *
 * @param WaitRegularCollapse:eval
 * @text Normal Collapse Wait?
 * @parent Collapse
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait for the normal collapse effect to finish?
 * @default true
 *
 * @param WaitBossCollapse:eval
 * @text Boss Collapse Wait?
 * @parent Collapse
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait for the boss collapse effect to finish?
 * @default true
 * 
 * @param Music
 * @text Victory Music
 *
 * @param Bgm:str
 * @text Victory BGM
 * @parent Music
 * @type file
 * @dir audio/bgm/
 * @desc Background music to play during the victory sequence.
 * @default Ship3
 *
 * @param volume:num
 * @text Volume
 * @parent Music
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @parent Music
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @parent Music
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Rewards Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Rewards:
 *
 * @param Label
 * @desc This one doesn't have any use other than being a label to 
 * quickly determine what this one is for.
 * @default Untitled
 *
 * @param Show:func
 * @text JS: Show
 * @type note
 * @desc Code used to determine if the reward strip is shown.
 * @default "return true;"
 *
 * @param Text:func
 * @text JS: Text
 * @type note
 * @desc Code used to determine if the text displayed as the category.
 * @default "return 'Untitled';"
 *
 * @param Data:func
 * @text JS: Data
 * @type note
 * @desc Code used to determine what data should be displayed in the reward strip.
 * @default "return 0;"
 *
 */
/* ----------------------------------------------------------------------------
 * Level Up Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LevelUp:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the Level Up portion of the Victory Aftermath phase?
 * @default true
 *
 * @param ShowFace:eval
 * @text Show Face?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the actor's face?
 * @default false
 *
 * @param ShowParamDiff:eval
 * @text Show Param Change?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show an extra column for parameter value differences?
 * @default true
 *
 * @param HideLevelDiff:eval
 * @text Hide Level?
 * @parent ShowParamDiff:eval
 * @type boolean
 * @on Hide
 * @off Normal
 * @desc Hide the level change in the parameter value differences?
 * @default false
 *
 * @param MaxSkills:num
 * @text Shown Max Skills
 * @parent General
 * @desc The maximum amount of skills that are displayed.
 * This is due to limited screen space.
 * @default 8
 *
 * @param DelayBuffer:num
 * @text Delay Buffer
 * @parent General
 * @type number
 * @desc How many milliseconds to wait in between playing
 * each level up sound effect?
 * @default 200
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Quotes
 *
 * @param LevelUpQuotes:arrayjson
 * @text Level Up Quotes
 * @parent Quotes
 * @type note[]
 * @desc A list of generic level up quotes for those who don't
 * have the <Level Up Quote> notetags. %1 - Actor Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Alright! A level up!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Yes! I've leveled up!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Oh? I've leveled up!?\\n This is awesome!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Looks like I've become stronger!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I feel like I'm getting used to battle.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"The power! I can feel it!\\\"\""]
 *
 * @param NewSkillQuotes:arrayjson
 * @text New Skill Quotes
 * @parent Quotes
 * @type note[]
 * @desc A list of generic level up quotes for those who don't
 * have the <New Skill Quote> notetags. %1 - Actor Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Looks like I've acquired a new skill!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"This new skill should come in handy.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"It seems I've learned something new!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I've acquired a new power!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"This should be useful for future battles.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I wonder what this new skill is like?\\\"\""]
 *
 * @param MainMenuCore
 * @text VisuMZ_1_MainMenuCore
 *
 * @param ShowBust:eval
 * @text Show Bust?
 * @parent MainMenuCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the actor's menu image as a bust?
 * @default true
 *
 * @param BustPosX:str
 * @text Bust Position X
 * @parent MainMenuCore
 * @desc Positon to center the actor's menu image bust.
 * You may use JavaScript code.
 * @default Graphics.width * 0.25
 *
 * @param BustPosY:str
 * @text Bust Position Y
 * @parent MainMenuCore
 * @desc Positon to anchor the actor's menu image bust.
 * You may use JavaScript code.
 * @default Graphics.height
 *
 * @param BustScale:num
 * @text Bust Scale
 * @parent MainMenuCore
 * @desc The amount to scale the actor's menu image bust.
 * @default 1.20
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param ContinueFmt:str
 * @text Continue Format
 * @desc Text format for continue message.
 * %1 - OK key, %2 - Cancel key
 * @default Press %1 or %2 to continue
 *
 * @param KeyOK:str
 * @text OK Button
 * @parent ContinueFmt:str
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param KeyCancel:str
 * @text Cancel Button
 * @parent ContinueFmt:str
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param LvFmt:str
 * @text Level Format
 * @desc Text format for actor level.
 * %1 - Level
 * @default LV %1
 *
 * @param LvUp:str
 * @text Level Up
 * @desc Text format for reaching a level up.
 * @default LEVEL UP!
 *
 * @param LvUpSfx:str
 * @text Sound Effect
 * @parent LvUp:str
 * @type file
 * @dir audio/se/
 * @desc Sound effect played when a level up occurs.
 * @default Up4
 *
 * @param LvUpVolume:num
 * @text Volume
 * @parent LvUpSfx:str
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param LvUpPitch:num
 * @text Pitch
 * @parent LvUpSfx:str
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param LvUpPan:num
 * @text Pan
 * @parent LvUpSfx:str
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param LvUpColor:str
 * @text Text Color
 * @parent LvUp:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param NewSkill:str
 * @text New Skill Format
 * @desc Text format describing that a new skill has been learned.
 * %1 - Actor Name
 * @default %1 has learned:
 *
 * @param RewardItems:str
 * @text Reward Items
 * @desc Text displayed for items rewarded.
 * @default Items Obtained
 *
 * @param Victory:str
 * @text Victory Title
 * @desc Text displayed at the top of the victory screen.
 * @default Victory!
 *
 */
//=============================================================================

const _0x2806ce=_0x3668;(function(_0x19d8c0,_0x5a307a){const _0x40323d=_0x3668,_0x499c21=_0x19d8c0();while(!![]){try{const _0x261939=-parseInt(_0x40323d(0x1cc))/0x1+parseInt(_0x40323d(0x1d9))/0x2*(-parseInt(_0x40323d(0x174))/0x3)+parseInt(_0x40323d(0x14c))/0x4+-parseInt(_0x40323d(0x18a))/0x5+parseInt(_0x40323d(0x192))/0x6*(-parseInt(_0x40323d(0x20b))/0x7)+-parseInt(_0x40323d(0xb8))/0x8+parseInt(_0x40323d(0x116))/0x9;if(_0x261939===_0x5a307a)break;else _0x499c21['push'](_0x499c21['shift']());}catch(_0x561a1b){_0x499c21['push'](_0x499c21['shift']());}}}(_0x4235,0x6b1ee));var label=_0x2806ce(0x165),tier=tier||0x0,dependencies=[_0x2806ce(0xf3)],pluginData=$plugins[_0x2806ce(0xb0)](function(_0x3c7fb4){const _0x16924f=_0x2806ce;return _0x3c7fb4[_0x16924f(0x159)]&&_0x3c7fb4[_0x16924f(0x1cf)][_0x16924f(0x114)]('['+label+']');})[0x0];VisuMZ[label][_0x2806ce(0xfc)]=VisuMZ[label][_0x2806ce(0xfc)]||{},VisuMZ[_0x2806ce(0x1aa)]=function(_0x114427,_0x4bbace){const _0x4b74a5=_0x2806ce;for(const _0x4f3559 in _0x4bbace){if(_0x4f3559['match'](/(.*):(.*)/i)){const _0x54dccf=String(RegExp['$1']),_0x2188b2=String(RegExp['$2'])['toUpperCase']()[_0x4b74a5(0x18c)]();let _0x245b4f,_0x1ff1e0,_0x33bb9a;switch(_0x2188b2){case _0x4b74a5(0x1f0):_0x245b4f=_0x4bbace[_0x4f3559]!==''?Number(_0x4bbace[_0x4f3559]):0x0;break;case _0x4b74a5(0x230):_0x1ff1e0=_0x4bbace[_0x4f3559]!==''?JSON['parse'](_0x4bbace[_0x4f3559]):[],_0x245b4f=_0x1ff1e0[_0x4b74a5(0x18b)](_0x1511b8=>Number(_0x1511b8));break;case'EVAL':_0x245b4f=_0x4bbace[_0x4f3559]!==''?eval(_0x4bbace[_0x4f3559]):null;break;case _0x4b74a5(0xd1):_0x1ff1e0=_0x4bbace[_0x4f3559]!==''?JSON[_0x4b74a5(0x11a)](_0x4bbace[_0x4f3559]):[],_0x245b4f=_0x1ff1e0[_0x4b74a5(0x18b)](_0x330661=>eval(_0x330661));break;case _0x4b74a5(0xd4):_0x245b4f=_0x4bbace[_0x4f3559]!==''?JSON[_0x4b74a5(0x11a)](_0x4bbace[_0x4f3559]):'';break;case _0x4b74a5(0x185):_0x1ff1e0=_0x4bbace[_0x4f3559]!==''?JSON[_0x4b74a5(0x11a)](_0x4bbace[_0x4f3559]):[],_0x245b4f=_0x1ff1e0[_0x4b74a5(0x18b)](_0xb3b74=>JSON[_0x4b74a5(0x11a)](_0xb3b74));break;case _0x4b74a5(0x224):_0x245b4f=_0x4bbace[_0x4f3559]!==''?new Function(JSON[_0x4b74a5(0x11a)](_0x4bbace[_0x4f3559])):new Function(_0x4b74a5(0x22a));break;case _0x4b74a5(0xda):_0x1ff1e0=_0x4bbace[_0x4f3559]!==''?JSON['parse'](_0x4bbace[_0x4f3559]):[],_0x245b4f=_0x1ff1e0[_0x4b74a5(0x18b)](_0x27dc0a=>new Function(JSON[_0x4b74a5(0x11a)](_0x27dc0a)));break;case _0x4b74a5(0x1ff):_0x245b4f=_0x4bbace[_0x4f3559]!==''?String(_0x4bbace[_0x4f3559]):'';break;case'ARRAYSTR':_0x1ff1e0=_0x4bbace[_0x4f3559]!==''?JSON[_0x4b74a5(0x11a)](_0x4bbace[_0x4f3559]):[],_0x245b4f=_0x1ff1e0['map'](_0x2895c6=>String(_0x2895c6));break;case _0x4b74a5(0x1b8):_0x33bb9a=_0x4bbace[_0x4f3559]!==''?JSON[_0x4b74a5(0x11a)](_0x4bbace[_0x4f3559]):{},_0x245b4f=VisuMZ['ConvertParams']({},_0x33bb9a);break;case'ARRAYSTRUCT':_0x1ff1e0=_0x4bbace[_0x4f3559]!==''?JSON['parse'](_0x4bbace[_0x4f3559]):[],_0x245b4f=_0x1ff1e0[_0x4b74a5(0x18b)](_0x2241d4=>VisuMZ[_0x4b74a5(0x1aa)]({},JSON[_0x4b74a5(0x11a)](_0x2241d4)));break;default:continue;}_0x114427[_0x54dccf]=_0x245b4f;}}return _0x114427;},(_0x41dd2c=>{const _0x36f23f=_0x2806ce,_0x20270a=_0x41dd2c[_0x36f23f(0xb5)];for(const _0x1bb7b6 of dependencies){if(!Imported[_0x1bb7b6]){alert(_0x36f23f(0x1ce)[_0x36f23f(0x217)](_0x20270a,_0x1bb7b6)),SceneManager[_0x36f23f(0x20c)]();break;}}const _0x1219aa=_0x41dd2c['description'];if(_0x1219aa[_0x36f23f(0x1b1)](/\[Version[ ](.*?)\]/i)){const _0x1e913f=Number(RegExp['$1']);_0x1e913f!==VisuMZ[label]['version']&&(alert(_0x36f23f(0xd3)[_0x36f23f(0x217)](_0x20270a,_0x1e913f)),SceneManager[_0x36f23f(0x20c)]());}if(_0x1219aa[_0x36f23f(0x1b1)](/\[Tier[ ](\d+)\]/i)){const _0x481c39=Number(RegExp['$1']);_0x481c39<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x36f23f(0x217)](_0x20270a,_0x481c39,tier)),SceneManager[_0x36f23f(0x20c)]()):tier=Math[_0x36f23f(0x83)](_0x481c39,tier);}VisuMZ[_0x36f23f(0x1aa)](VisuMZ[label][_0x36f23f(0xfc)],_0x41dd2c['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x2806ce(0xb5)],_0x2806ce(0xa8),_0x3588c0=>{const _0x76fcbd=_0x2806ce;VisuMZ['ConvertParams'](_0x3588c0,_0x3588c0);const _0x3081a6=$gameActors['actor'](_0x3588c0['ActorID']),_0x2552ca=_0x3588c0['NewQuotes'];if(_0x3081a6)while(_0x2552ca[_0x76fcbd(0x20e)]>0x0){_0x3081a6[_0x76fcbd(0xfe)]()[_0x76fcbd(0x19e)](_0x2552ca[_0x76fcbd(0x16d)]());}}),PluginManager[_0x2806ce(0x1a5)](pluginData[_0x2806ce(0xb5)],_0x2806ce(0x132),_0x2d5c8f=>{const _0x705908=_0x2806ce;VisuMZ[_0x705908(0x1aa)](_0x2d5c8f,_0x2d5c8f);const _0x17d51c=$gameActors[_0x705908(0x12c)](_0x2d5c8f[_0x705908(0x1f1)]),_0x4652db=_0x2d5c8f[_0x705908(0xf6)];if(_0x17d51c)while(_0x4652db[_0x705908(0x20e)]>0x0){_0x17d51c[_0x705908(0xc9)]()[_0x705908(0x19e)](_0x4652db[_0x705908(0x16d)]());}}),PluginManager[_0x2806ce(0x1a5)](pluginData[_0x2806ce(0xb5)],_0x2806ce(0x21a),_0x513ddb=>{const _0x36ae4d=_0x2806ce;VisuMZ[_0x36ae4d(0x1aa)](_0x513ddb,_0x513ddb);const _0x17479b=$gameActors[_0x36ae4d(0x12c)](_0x513ddb[_0x36ae4d(0x1f1)]);if(_0x17479b)while(_0x17479b[_0x36ae4d(0xfe)]()[_0x36ae4d(0x20e)]>0x0){_0x17479b['levelUpQuotes']()[_0x36ae4d(0x16d)]();}}),PluginManager[_0x2806ce(0x1a5)](pluginData[_0x2806ce(0xb5)],_0x2806ce(0x127),_0x139da6=>{const _0x6262db=_0x2806ce;VisuMZ[_0x6262db(0x1aa)](_0x139da6,_0x139da6);const _0x35fcea=$gameActors['actor'](_0x139da6['ActorID']);if(_0x35fcea)while(_0x35fcea[_0x6262db(0xc9)]()[_0x6262db(0x20e)]>0x0){_0x35fcea[_0x6262db(0xc9)]()[_0x6262db(0x16d)]();}}),PluginManager['registerCommand'](pluginData[_0x2806ce(0xb5)],_0x2806ce(0x228),_0x3ca365=>{const _0x441b78=_0x2806ce;VisuMZ[_0x441b78(0x1aa)](_0x3ca365,_0x3ca365),$gameSystem[_0x441b78(0xca)]()[_0x441b78(0x16c)]=_0x3ca365[_0x441b78(0x1c6)];}),PluginManager[_0x2806ce(0x1a5)](pluginData[_0x2806ce(0xb5)],'SystemBypassVictoryMusic',_0x32a4a6=>{const _0x197643=_0x2806ce;VisuMZ[_0x197643(0x1aa)](_0x32a4a6,_0x32a4a6),$gameSystem[_0x197643(0xca)]()[_0x197643(0x158)]=_0x32a4a6['Bypass'];}),PluginManager[_0x2806ce(0x1a5)](pluginData[_0x2806ce(0xb5)],_0x2806ce(0x151),_0x4af28c=>{const _0x5bf05b=_0x2806ce;VisuMZ[_0x5bf05b(0x1aa)](_0x4af28c,_0x4af28c),$gameSystem[_0x5bf05b(0xca)]()[_0x5bf05b(0x200)]=_0x4af28c[_0x5bf05b(0x1c6)];}),TextManager[_0x2806ce(0xdb)]=VisuMZ[_0x2806ce(0x165)][_0x2806ce(0xfc)][_0x2806ce(0x19c)][_0x2806ce(0xfa)],TextManager[_0x2806ce(0x130)]=VisuMZ[_0x2806ce(0x165)][_0x2806ce(0xfc)][_0x2806ce(0x19c)][_0x2806ce(0xcb)],TextManager[_0x2806ce(0x1fc)]=VisuMZ['VictoryAftermath'][_0x2806ce(0xfc)][_0x2806ce(0x19c)][_0x2806ce(0x20a)],TextManager[_0x2806ce(0xdf)]=VisuMZ['VictoryAftermath'][_0x2806ce(0xfc)][_0x2806ce(0x19c)][_0x2806ce(0x11b)],TextManager['victoryDisplayLvUp']=VisuMZ[_0x2806ce(0x165)][_0x2806ce(0xfc)][_0x2806ce(0x19c)][_0x2806ce(0x1d7)],TextManager[_0x2806ce(0xec)]=VisuMZ['VictoryAftermath'][_0x2806ce(0xfc)][_0x2806ce(0x19c)][_0x2806ce(0xd0)],TextManager[_0x2806ce(0x1c7)]=VisuMZ[_0x2806ce(0x165)][_0x2806ce(0xfc)]['Vocab'][_0x2806ce(0x227)],TextManager[_0x2806ce(0x180)]=VisuMZ['VictoryAftermath'][_0x2806ce(0xfc)][_0x2806ce(0x19c)][_0x2806ce(0x1ae)],TextManager['quoteLevelUp']=function(_0x40a763){const _0x5e6cd2=_0x2806ce,_0x588f65=VisuMZ['VictoryAftermath'][_0x5e6cd2(0xfc)]['LevelUp'][_0x5e6cd2(0x176)];if(!_0x40a763)return _0x588f65[Math['randomInt'](_0x588f65[_0x5e6cd2(0x20e)])];if(!_0x40a763['isActor']())return _0x588f65[Math[_0x5e6cd2(0x148)](_0x588f65[_0x5e6cd2(0x20e)])];const _0x487d85=_0x40a763[_0x5e6cd2(0xfe)]();if(_0x487d85[_0x5e6cd2(0x20e)]>0x0)return _0x487d85[Math['randomInt'](_0x487d85[_0x5e6cd2(0x20e)])];return _0x588f65[Math[_0x5e6cd2(0x148)](_0x588f65[_0x5e6cd2(0x20e)])];},TextManager[_0x2806ce(0xe2)]=function(_0x1b719b){const _0x23c01b=_0x2806ce,_0x567acc=VisuMZ[_0x23c01b(0x165)][_0x23c01b(0xfc)]['LevelUp'][_0x23c01b(0xbe)];if(!_0x1b719b)return _0x567acc[Math['randomInt'](_0x567acc[_0x23c01b(0x20e)])];if(!_0x1b719b[_0x23c01b(0xac)]())return _0x567acc[Math[_0x23c01b(0x148)](_0x567acc[_0x23c01b(0x20e)])];const _0x5c19ff=_0x1b719b[_0x23c01b(0xc9)]();if(_0x5c19ff[_0x23c01b(0x20e)]>0x0)return _0x5c19ff[Math['randomInt'](_0x5c19ff[_0x23c01b(0x20e)])];return _0x567acc[Math[_0x23c01b(0x148)](_0x567acc[_0x23c01b(0x20e)])];},ColorManager['getColorDataFromPluginParameters']=function(_0x5a7099,_0x1898dc){const _0x588af3=_0x2806ce;return _0x1898dc=String(_0x1898dc),this['_colorCache']=this[_0x588af3(0x1d2)]||{},_0x1898dc[_0x588af3(0x1b1)](/#(.*)/i)?this[_0x588af3(0x1d2)][_0x5a7099]=_0x588af3(0x211)[_0x588af3(0x217)](String(RegExp['$1'])):this[_0x588af3(0x1d2)][_0x5a7099]=this[_0x588af3(0xbb)](Number(_0x1898dc)),this['_colorCache'][_0x5a7099];},ColorManager[_0x2806ce(0xb6)]=function(_0x37be72){const _0x4463fe=_0x2806ce;return _0x37be72=String(_0x37be72),_0x37be72[_0x4463fe(0x1b1)](/#(.*)/i)?_0x4463fe(0x211)[_0x4463fe(0x217)](String(RegExp['$1'])):this[_0x4463fe(0xbb)](Number(_0x37be72));},ColorManager['victoryLevelUpColor']=function(){const _0x4f9cbe=_0x2806ce,_0x46f95f=_0x4f9cbe(0x212);this[_0x4f9cbe(0x1d2)]=this[_0x4f9cbe(0x1d2)]||{};if(this[_0x4f9cbe(0x1d2)][_0x46f95f])return this['_colorCache'][_0x46f95f];const _0x48b956=VisuMZ[_0x4f9cbe(0x165)][_0x4f9cbe(0xfc)][_0x4f9cbe(0x19c)][_0x4f9cbe(0x1ef)];return this[_0x4f9cbe(0x1a6)](_0x46f95f,_0x48b956);},SoundManager[_0x2806ce(0x207)]=function(){const _0x15d6e7=_0x2806ce;if(this[_0x15d6e7(0x108)])return;if(!this[_0x15d6e7(0x1d0)]){const _0x1a8b0c=VisuMZ[_0x15d6e7(0x165)]['Settings']['Vocab'];this[_0x15d6e7(0x1d0)]={'name':_0x1a8b0c[_0x15d6e7(0x1ee)]||'','volume':_0x1a8b0c['LvUpVolume']??0x5a,'pitch':_0x1a8b0c[_0x15d6e7(0xa1)]??0x64,'pan':_0x1a8b0c[_0x15d6e7(0xb4)]??0x0};}this[_0x15d6e7(0x1d0)][_0x15d6e7(0xb5)]!==''&&(AudioManager[_0x15d6e7(0xf0)](this[_0x15d6e7(0x1d0)]),this['_victoryLevelUpBuffer']=!![],setTimeout(this[_0x15d6e7(0x181)][_0x15d6e7(0xc6)](this),0xc8));},SoundManager[_0x2806ce(0x181)]=function(){const _0x3b04dd=_0x2806ce;this[_0x3b04dd(0x108)]=![];},SoundManager[_0x2806ce(0x12f)]=function(){const _0x3883f2=_0x2806ce;if(!this[_0x3883f2(0x20d)]){const _0x381400=VisuMZ['VictoryAftermath'][_0x3883f2(0xfc)][_0x3883f2(0x203)];if(_0x381400[_0x3883f2(0x1e5)]===undefined)_0x381400[_0x3883f2(0x1e5)]=0x5a;if(_0x381400[_0x3883f2(0x22e)]===undefined)_0x381400[_0x3883f2(0x22e)]=0x64;if(_0x381400[_0x3883f2(0x140)]===undefined)_0x381400[_0x3883f2(0x140)]=0x0;this[_0x3883f2(0x20d)]={'name':_0x381400[_0x3883f2(0x195)]||'','volume':_0x381400['volume']||0x0,'pitch':_0x381400[_0x3883f2(0x22e)]||0x0,'pan':_0x381400[_0x3883f2(0x140)]||0x0};}this['_victoryBgm']['name']!==''&&AudioManager[_0x3883f2(0x1c9)](this['_victoryBgm']);},BattleManager['_victoryUpdateDuration']=VisuMZ['VictoryAftermath'][_0x2806ce(0xfc)]['General'][_0x2806ce(0x177)]||0x1,VisuMZ[_0x2806ce(0x165)][_0x2806ce(0x15e)]=BattleManager[_0x2806ce(0x15f)],BattleManager[_0x2806ce(0x15f)]=function(){const _0x24e4f5=_0x2806ce;VisuMZ[_0x24e4f5(0x165)][_0x24e4f5(0x15e)]['call'](this),this[_0x24e4f5(0xf9)]=![],this[_0x24e4f5(0x21b)]=-0x1,this[_0x24e4f5(0xbf)]=![];},VisuMZ[_0x2806ce(0x165)][_0x2806ce(0x1c1)]=BattleManager[_0x2806ce(0x1a7)],BattleManager[_0x2806ce(0x1a7)]=function(){const _0x39a453=_0x2806ce;return this[_0x39a453(0x167)]()?!![]:VisuMZ[_0x39a453(0x165)][_0x39a453(0x1c1)]['call'](this);},BattleManager[_0x2806ce(0x167)]=function(){const _0x5e7c8d=_0x2806ce;return this[_0x5e7c8d(0x96)]===_0x5e7c8d(0xdd)&&this['_victoryPhase'];},BattleManager[_0x2806ce(0x1e6)]=function(){const _0x564bcd=_0x2806ce;this[_0x564bcd(0x184)](_0x564bcd(0x117)),this[_0x564bcd(0x162)]();},BattleManager['processVictoryAftermath']=function(){const _0xf68ad0=_0x2806ce;this['processVictoryAftermathParty'](),this[_0xf68ad0(0xa7)](),this[_0xf68ad0(0xd2)](),this[_0xf68ad0(0x157)]();},BattleManager[_0x2806ce(0x219)]=function(){const _0x497ad2=_0x2806ce;$gameParty[_0x497ad2(0x141)](),$gameParty[_0x497ad2(0x1e9)]();},BattleManager[_0x2806ce(0xa7)]=function(){const _0x55aa5b=_0x2806ce;if(this[_0x55aa5b(0x17f)]())return;this['playVictoryMe'](),SoundManager[_0x55aa5b(0x12f)]();},BattleManager[_0x2806ce(0x17f)]=function(){const _0x73dd8d=_0x2806ce;return $gameSystem[_0x73dd8d(0xca)]()[_0x73dd8d(0x158)]||$gameSystem[_0x73dd8d(0xca)]()[_0x73dd8d(0x200)];},BattleManager[_0x2806ce(0xd2)]=function(){const _0x286f76=_0x2806ce;this['makeTempActors'](),this[_0x286f76(0xbd)](),this[_0x286f76(0xe8)]();},BattleManager['makeTempActors']=function(){const _0x57cafc=_0x2806ce;this[_0x57cafc(0x134)]=$gameParty['battleMembers']()['map'](_0x4fbca2=>_0x4fbca2['makeVictoryCopy']()),this[_0x57cafc(0xde)]=JsonEx[_0x57cafc(0x11c)](this[_0x57cafc(0x134)]);},BattleManager[_0x2806ce(0x157)]=function(){const _0x29f6d7=_0x2806ce;this[_0x29f6d7(0x183)](),this[_0x29f6d7(0x133)](0x0),this[_0x29f6d7(0x87)](_0x29f6d7(0x227)),this[_0x29f6d7(0xf9)]=!![],this[_0x29f6d7(0xff)]()?this['skipVictoryAftermathTransition']():this[_0x29f6d7(0xd6)]();},BattleManager[_0x2806ce(0x183)]=function(){const _0x2bb1c2=_0x2806ce,_0x516069=VisuMZ[_0x2bb1c2(0x165)][_0x2bb1c2(0xfc)][_0x2bb1c2(0x203)];_0x516069[_0x2bb1c2(0x1d4)]===undefined&&(_0x516069[_0x2bb1c2(0x1d4)]=!![]),_0x516069['AutoBattleAutoSkip']===!![]&&(this[_0x2bb1c2(0xbf)]=this['_autoBattle']);},BattleManager[_0x2806ce(0xff)]=function(){const _0x33d481=_0x2806ce;if(this[_0x33d481(0xbf)])return!![];return $gameSystem[_0x33d481(0xca)]()[_0x33d481(0x200)];},BattleManager[_0x2806ce(0x1ea)]=function(){const _0x40cdc8=_0x2806ce,_0x1c621b=VisuMZ['VictoryAftermath']['Settings'][_0x40cdc8(0x203)],_0x4e7f2c=SceneManager[_0x40cdc8(0x193)];setTimeout(_0x4e7f2c[_0x40cdc8(0xd9)]['bind'](_0x4e7f2c),_0x1c621b[_0x40cdc8(0x110)]);},BattleManager[_0x2806ce(0xd6)]=function(){const _0x278c73=_0x2806ce,_0x3e4ffc=VisuMZ[_0x278c73(0x165)][_0x278c73(0xfc)]['General'],_0x130f5a=SceneManager[_0x278c73(0x193)];this[_0x278c73(0x1c5)]=this[_0x278c73(0x99)][_0x278c73(0x1de)]/(BattleManager[_0x278c73(0x1cd)]||0x1),Window_StatusBase[_0x278c73(0xfd)][_0x278c73(0xa2)](),setTimeout(_0x130f5a['hideWindowsForVictoryAftermath'][_0x278c73(0xc6)](_0x130f5a),_0x3e4ffc[_0x278c73(0x182)]),setTimeout(_0x130f5a[_0x278c73(0x145)][_0x278c73(0xc6)](_0x130f5a),_0x3e4ffc['ShowDelayMS']);},BattleManager[_0x2806ce(0x1f9)]=function(){const _0x4aa27e=_0x2806ce;for(;;){this[_0x4aa27e(0x21b)]++;if(this[_0x4aa27e(0x21b)]>=$gameParty[_0x4aa27e(0x218)]())return null;const _0x922be4=$gameParty[_0x4aa27e(0x112)]()[this['_victoryActorIndex']],_0x2f73a2=this[_0x4aa27e(0xde)][this[_0x4aa27e(0x21b)]];if(_0x922be4[_0x4aa27e(0x213)]!==_0x2f73a2[_0x4aa27e(0x213)])return _0x922be4;}return null;},VisuMZ[_0x2806ce(0x165)][_0x2806ce(0xab)]=Game_System[_0x2806ce(0xfd)]['initialize'],Game_System['prototype'][_0x2806ce(0x1a3)]=function(){const _0x276820=_0x2806ce;VisuMZ['VictoryAftermath'][_0x276820(0xab)][_0x276820(0x129)](this),this['initVictoryAftermath']();},Game_System[_0x2806ce(0xfd)][_0x2806ce(0x125)]=function(){this['_victoryAftermathSettings']={'bypassVictoryMusic':![],'bypassVictoryPhase':![],'bypassVictoryMotion':![]};},Game_System['prototype'][_0x2806ce(0xca)]=function(){const _0x23f174=_0x2806ce;if(this[_0x23f174(0x138)]===undefined)this[_0x23f174(0x125)]();return this[_0x23f174(0x138)];},VisuMZ[_0x2806ce(0x165)][_0x2806ce(0x120)]=Game_Actor[_0x2806ce(0xfd)]['setup'],Game_Actor['prototype'][_0x2806ce(0x1e2)]=function(_0x5aee2f){const _0x55cf80=_0x2806ce;VisuMZ['VictoryAftermath'][_0x55cf80(0x120)][_0x55cf80(0x129)](this,_0x5aee2f),this[_0x55cf80(0x100)]();},Game_Actor[_0x2806ce(0xfd)]['setupVictoryAftermathQuotes']=function(){const _0x4a9551=_0x2806ce;this[_0x4a9551(0x178)]=[],this[_0x4a9551(0x21c)]=[];const _0x37a4c9=this[_0x4a9551(0x12c)]()['note'];_0x37a4c9[_0x4a9551(0x1b1)](/<LEVEL UP (?:QUOTE|QUOTES)>\s*([\s\S]*)\s*<\/LEVEL UP (?:QUOTE|QUOTES)>/i)&&(this[_0x4a9551(0x178)]=String(RegExp['$1'])['split'](/<NEW QUOTE>[\r\n]+/i)),_0x37a4c9[_0x4a9551(0x1b1)](/<NEW SKILL (?:QUOTE|QUOTES)>\s*([\s\S]*)\s*<\/NEW SKILL (?:QUOTE|QUOTES)>/i)&&(this[_0x4a9551(0x21c)]=String(RegExp['$1'])['split'](/<NEW QUOTE>[\r\n]+/i));},Game_Actor[_0x2806ce(0xfd)][_0x2806ce(0xfe)]=function(){const _0x3bb3b3=_0x2806ce;if(this[_0x3bb3b3(0x178)]===undefined)this[_0x3bb3b3(0x100)]();return this[_0x3bb3b3(0x178)];},Game_Actor[_0x2806ce(0xfd)][_0x2806ce(0xc9)]=function(){const _0x6e445b=_0x2806ce;if(this[_0x6e445b(0x21c)]===undefined)this[_0x6e445b(0x100)]();return this['_victoryAftermathNewSkillQuotes'];},Game_Actor['prototype'][_0x2806ce(0xf1)]=function(){const _0x555aa0=_0x2806ce;if(this[_0x555aa0(0x1da)]())return 0x1;const _0x60910a=this[_0x555aa0(0x135)]()-this[_0x555aa0(0x1f2)](),_0x24e98a=this[_0x555aa0(0x13d)]()-this['currentLevelExp']();return(_0x24e98a/_0x60910a)[_0x555aa0(0x154)](0x0,0x1);},VisuMZ[_0x2806ce(0x165)][_0x2806ce(0x13b)]=Game_Actor[_0x2806ce(0xfd)][_0x2806ce(0x90)],Game_Actor[_0x2806ce(0xfd)][_0x2806ce(0x90)]=function(){const _0x34cfe9=_0x2806ce;return SceneManager['isSceneBattle']()?![]:VisuMZ['VictoryAftermath'][_0x34cfe9(0x13b)][_0x34cfe9(0x129)](this);},Game_Actor[_0x2806ce(0xfd)]['makeVictoryCopy']=function(){const _0x3ca8a6=_0x2806ce,_0x37126a=JsonEx[_0x3ca8a6(0x11c)](this);return _0x37126a[_0x3ca8a6(0x137)]=!![],_0x37126a;},VisuMZ[_0x2806ce(0x165)][_0x2806ce(0x10b)]=Game_Actor[_0x2806ce(0xfd)][_0x2806ce(0x8c)],Game_Actor[_0x2806ce(0xfd)]['isBattleMember']=function(){const _0x144d0f=_0x2806ce;return this[_0x144d0f(0x137)]?!![]:VisuMZ[_0x144d0f(0x165)][_0x144d0f(0x10b)][_0x144d0f(0x129)](this);},VisuMZ['VictoryAftermath'][_0x2806ce(0x107)]=Game_Actor[_0x2806ce(0xfd)][_0x2806ce(0x1e9)],Game_Actor['prototype'][_0x2806ce(0x1e9)]=function(){const _0x206535=_0x2806ce;this[_0x206535(0x14b)]()?this[_0x206535(0x1ab)](_0x206535(0x1dd)):VisuMZ[_0x206535(0x165)][_0x206535(0x107)][_0x206535(0x129)](this);},Game_Actor[_0x2806ce(0xfd)][_0x2806ce(0x14b)]=function(){const _0x47aeaa=_0x2806ce;return $gameSystem[_0x47aeaa(0xca)]()[_0x47aeaa(0x16c)]||$gameSystem[_0x47aeaa(0xca)]()[_0x47aeaa(0x200)];},Scene_Battle[_0x2806ce(0xfd)]['hideWindowsForVictoryAftermath']=function(){const _0x33d285=_0x2806ce;if(this[_0x33d285(0x18f)][_0x33d285(0x1db)]())return setTimeout(this[_0x33d285(0xb2)][_0x33d285(0xc6)](this),0x7d0);if(!SceneManager[_0x33d285(0x1a8)]())return;this['setVisibleUI'](![]),this[_0x33d285(0x86)](),this[_0x33d285(0x1bc)](),this['_statusWindow']['y']=Graphics['height']*0xa;},Scene_Battle[_0x2806ce(0xfd)][_0x2806ce(0x145)]=function(){const _0x1ca75d=_0x2806ce;if(this[_0x1ca75d(0x18f)][_0x1ca75d(0x1db)]())return setTimeout(this[_0x1ca75d(0x145)][_0x1ca75d(0xc6)](this),0x7d0);this[_0x1ca75d(0x1d3)]=[],this[_0x1ca75d(0x13c)](),this[_0x1ca75d(0x153)](),this[_0x1ca75d(0x168)]();},Scene_Battle[_0x2806ce(0xfd)]['createVictorySteps']=function(){const _0x2479be=_0x2806ce;this[_0x2479be(0x169)]=[],this[_0x2479be(0x152)](),this[_0x2479be(0x199)]();},Scene_Battle['prototype']['createVictoryStepRewards']=function(){const _0x397226=_0x2806ce;this['_victorySteps'][_0x397226(0x19e)](_0x397226(0x1dc));},Scene_Battle[_0x2806ce(0xfd)][_0x2806ce(0x199)]=function(){const _0x2794c3=_0x2806ce;if(!this[_0x2794c3(0xc3)]())return;for(const _0xc885e6 of $gameParty[_0x2794c3(0x112)]()){if(!_0xc885e6)continue;const _0x233db4=BattleManager[_0x2794c3(0x134)][_0xc885e6[_0x2794c3(0xc4)]()];_0xc885e6[_0x2794c3(0x213)]>_0x233db4[_0x2794c3(0x213)]&&this[_0x2794c3(0x128)](_0xc885e6);}},Scene_Battle[_0x2806ce(0xfd)][_0x2806ce(0x128)]=function(_0x2f92f7){const _0x4761c2=_0x2806ce;Imported[_0x4761c2(0xad)]&&Window_VictoryLevelUp[_0x4761c2(0x1b9)]&&ImageManager[_0x4761c2(0x1b4)](_0x2f92f7['getMenuImage']()),this[_0x4761c2(0x169)][_0x4761c2(0x19e)]('levelups');},Scene_Battle[_0x2806ce(0xfd)][_0x2806ce(0xc3)]=function(){const _0x3ec181=_0x2806ce;return VisuMZ[_0x3ec181(0x165)][_0x3ec181(0xfc)][_0x3ec181(0x139)][_0x3ec181(0x1f7)];},Scene_Battle[_0x2806ce(0xfd)][_0x2806ce(0x168)]=function(){const _0x36353a=_0x2806ce;this['_victoryStep']=this[_0x36353a(0x169)][_0x36353a(0x16d)]()||'',this[_0x36353a(0x17d)]();},Scene_Battle['prototype']['processVictoryStep']=function(){const _0xaf8397=_0x2806ce;switch(this[_0xaf8397(0x18d)]['toLowerCase']()[_0xaf8397(0x18c)]()){case'rewards':this[_0xaf8397(0xd5)](),this['_victoryContinueWindow'][_0xaf8397(0xc0)](BattleManager['_victoryUpdateDuration']);break;case _0xaf8397(0xe3):this[_0xaf8397(0x109)](),this[_0xaf8397(0x9f)](),this[_0xaf8397(0x220)]['setDelayDuration'](0x0);break;default:this[_0xaf8397(0xd9)]();break;}this[_0xaf8397(0xa9)](this[_0xaf8397(0x220)]);},Scene_Battle[_0x2806ce(0xfd)][_0x2806ce(0x84)]=function(){const _0x1f6e39=_0x2806ce,_0x10d784=Window_Base[_0x1f6e39(0xfd)][_0x1f6e39(0x126)](),_0x1e72fb=Math[_0x1f6e39(0x105)](Graphics[_0x1f6e39(0xcc)]/0x2)-0x64,_0x152e30=Math[_0x1f6e39(0x105)](Graphics[_0x1f6e39(0xee)]-_0x10d784*1.25),_0x3104c4=Math[_0x1f6e39(0x105)](Graphics[_0x1f6e39(0xcc)]/0x2),_0x53f997=_0x10d784;return new Rectangle(_0x1e72fb,_0x152e30,_0x3104c4,_0x53f997);},Scene_Battle[_0x2806ce(0xfd)][_0x2806ce(0x229)]=function(){const _0x40124e=_0x2806ce,_0x2623f9=0x0,_0x1ba1da=0x0,_0x260dc0=Graphics[_0x40124e(0xcc)],_0x54ced4=Graphics['height'];return new Rectangle(_0x2623f9,_0x1ba1da,_0x260dc0,_0x54ced4);},Scene_Battle['prototype'][_0x2806ce(0x153)]=function(){const _0x58353e=_0x2806ce;if(this[_0x58353e(0x220)])return;const _0x197243=this['victoryContinueMessageWindowRect'](),_0x276e30=new Window_VictoryContinueMessage(_0x197243);this['addChild'](_0x276e30),this[_0x58353e(0x1d3)][_0x58353e(0x19e)](_0x276e30),this[_0x58353e(0x220)]=_0x276e30;},Scene_Battle[_0x2806ce(0xfd)][_0x2806ce(0xd5)]=function(){const _0x25ad88=_0x2806ce;if(this[_0x25ad88(0xf5)])return;const _0x363616=this[_0x25ad88(0x229)](),_0x5aec48=new Window_VictoryRewards(_0x363616);this[_0x25ad88(0xa9)](_0x5aec48),this[_0x25ad88(0x1d3)][_0x25ad88(0x19e)](_0x5aec48),this[_0x25ad88(0xf5)]=_0x5aec48;},Scene_Battle[_0x2806ce(0xfd)][_0x2806ce(0x109)]=function(){const _0x21af88=_0x2806ce;if(this[_0x21af88(0x208)])return;const _0x253629=this[_0x21af88(0x229)](),_0x5abe0e=new Window_VictoryLevelUp(_0x253629);this[_0x21af88(0xa9)](_0x5abe0e),this['_victoryWindows']['push'](_0x5abe0e),this[_0x21af88(0x208)]=_0x5abe0e;},Scene_Battle['prototype'][_0x2806ce(0x9f)]=function(){const _0xe6af2f=_0x2806ce,_0x506392=BattleManager[_0xe6af2f(0x1f9)]();this['_victoryLevelUpWindow'][_0xe6af2f(0x172)](_0x506392);},Scene_Battle['prototype'][_0x2806ce(0xd9)]=function(){const _0x8cac2d=_0x2806ce;BattleManager[_0x8cac2d(0xc2)](),BattleManager[_0x8cac2d(0xf9)]=![];};Imported[_0x2806ce(0x173)]&&(VisuMZ[_0x2806ce(0x165)]['Scene_Battle_allowUpdateBattleAniSpeed']=Scene_Battle['prototype'][_0x2806ce(0x1f8)],Scene_Battle['prototype']['allowUpdateBattleAniSpeed']=function(){const _0x2d29c6=_0x2806ce;if(BattleManager['isVictoryPhase']())return![];return VisuMZ[_0x2d29c6(0x165)]['Scene_Battle_allowUpdateBattleAniSpeed'][_0x2d29c6(0x129)](this);});;function _0x3668(_0x152c0b,_0x4af3bb){const _0x423508=_0x4235();return _0x3668=function(_0x3668cf,_0x31bd93){_0x3668cf=_0x3668cf-0x82;let _0x27b601=_0x423508[_0x3668cf];return _0x27b601;},_0x3668(_0x152c0b,_0x4af3bb);}Scene_Battle[_0x2806ce(0xfd)][_0x2806ce(0x1df)]=function(){const _0x194451=_0x2806ce;return this['_victoryContinueWindow']&&this[_0x194451(0x220)][_0x194451(0x1e1)]();},VisuMZ[_0x2806ce(0x165)][_0x2806ce(0x22f)]=Scene_Battle['prototype'][_0x2806ce(0x9d)],Scene_Battle[_0x2806ce(0xfd)]['update']=function(){const _0x4990c3=_0x2806ce;VisuMZ[_0x4990c3(0x165)][_0x4990c3(0x22f)][_0x4990c3(0x129)](this),this['updateVictoryPhase']();},Scene_Battle[_0x2806ce(0xfd)][_0x2806ce(0xe9)]=function(){const _0x591d25=_0x2806ce;if(!BattleManager[_0x591d25(0x167)]())return;if(!this[_0x591d25(0x1df)]())return;(Input[_0x591d25(0x95)]('ok')||Input[_0x591d25(0x95)](_0x591d25(0xf2))||TouchInput[_0x591d25(0x95)]())&&(Input[_0x591d25(0x1ac)](),TouchInput[_0x591d25(0x1ac)](),this['updateVictorySteps']());},Sprite_Enemy['prototype'][_0x2806ce(0x1db)]=function(){const _0x827c64=_0x2806ce,_0x4acf4a=VisuMZ[_0x827c64(0x165)][_0x827c64(0xfc)]['General'];if(this[_0x827c64(0x223)]===_0x827c64(0xea)){if(_0x4acf4a[_0x827c64(0x1e4)]!==undefined)return _0x4acf4a[_0x827c64(0x1e4)];}else{if(this[_0x827c64(0x223)]===_0x827c64(0x113)){if(_0x4acf4a[_0x827c64(0x231)]!==undefined)return _0x4acf4a['WaitBossCollapse'];}}return[_0x827c64(0xea),_0x827c64(0x113)][_0x827c64(0x114)]();},Sprite_Battler['prototype'][_0x2806ce(0x1db)]=function(){return![];},Spriteset_Battle[_0x2806ce(0xfd)][_0x2806ce(0x1db)]=function(){const _0x435fe2=_0x2806ce;return this[_0x435fe2(0x8e)]()[_0x435fe2(0x22d)](_0x172fdd=>_0x172fdd[_0x435fe2(0x1db)]());};function Sprite_VictoryGauge(){const _0xb687f2=_0x2806ce;this[_0xb687f2(0x1a3)](...arguments);}Sprite_VictoryGauge['prototype']=Object[_0x2806ce(0x216)](Sprite[_0x2806ce(0xfd)]),Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0x12b)]=Sprite_VictoryGauge,Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0x1a3)]=function(_0x100a3e,_0x5466b5,_0x3b988c){const _0x4df258=_0x2806ce;this['_index']=_0x100a3e,this[_0x4df258(0xa6)]=_0x5466b5,this[_0x4df258(0x16e)]=_0x3b988c,Sprite[_0x4df258(0xfd)][_0x4df258(0x1a3)]['call'](this),this['initMembers'](),this[_0x4df258(0x1f3)](),this['refresh'](),this[_0x4df258(0x1a9)]();},Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0x15f)]=function(){const _0x5611a9=_0x2806ce;this[_0x5611a9(0x190)]=BattleManager[_0x5611a9(0x1cd)],this['_currentlevel']=this[_0x5611a9(0x12c)]()['level'],this[_0x5611a9(0xb3)]=![];},Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0x1f3)]=function(){const _0x4c8e99=_0x2806ce;this[_0x4c8e99(0x204)]=new Bitmap(this[_0x4c8e99(0x16e)],this[_0x4c8e99(0x126)]()*0x2);},Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0x126)]=function(){const _0x30a5bb=_0x2806ce;return Window_Base[_0x30a5bb(0xfd)][_0x30a5bb(0x126)]();},Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0x12c)]=function(){return BattleManager['_victoryTempActorsA'][this['_index']];},Sprite_VictoryGauge[_0x2806ce(0xfd)]['update']=function(){const _0xf55703=_0x2806ce;Sprite['prototype'][_0xf55703(0x9d)]['call'](this),this['updateExpGain'](),this[_0xf55703(0x1a9)]();},Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0xa0)]=function(){const _0x3d0af0=_0x2806ce;if(this[_0x3d0af0(0x190)]<=0x0)return;const _0x2d7df1=this['actor']();this[_0x3d0af0(0x190)]--;this[_0x3d0af0(0x16b)]()&&(this[_0x3d0af0(0x190)]=0x0);if(this[_0x3d0af0(0x190)]<=0x0){const _0x56d340=$gameActors[_0x3d0af0(0x12c)](_0x2d7df1[_0x3d0af0(0x187)]);_0x2d7df1['changeExp'](_0x56d340[_0x3d0af0(0x13d)](),![]);}else _0x2d7df1[_0x3d0af0(0x1e0)](BattleManager[_0x3d0af0(0x1c5)]);this[_0x3d0af0(0x1c2)]!==_0x2d7df1[_0x3d0af0(0x213)]&&(this[_0x3d0af0(0x1c2)]=_0x2d7df1['level'],this[_0x3d0af0(0xb3)]=!![],SoundManager[_0x3d0af0(0x207)]()),this[_0x3d0af0(0x1c0)]();},Game_Actor[_0x2806ce(0xfd)][_0x2806ce(0x1e0)]=function(_0xd5afb6){const _0x2b8823=_0x2806ce,_0x1371ed=this[_0x2b8823(0x13d)]()+_0xd5afb6*this[_0x2b8823(0xf7)]();this[_0x2b8823(0x210)](_0x1371ed,this['shouldDisplayLevelUp']());},Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0x16b)]=function(){const _0x219bdd=_0x2806ce;return SceneManager[_0x219bdd(0x193)][_0x219bdd(0x1df)]();},Sprite_VictoryGauge[_0x2806ce(0xfd)]['updateOpacity']=function(){const _0x555402=_0x2806ce;this[_0x555402(0x206)]=this[_0x555402(0xa6)][_0x555402(0x91)];},Sprite_VictoryGauge[_0x2806ce(0xfd)]['refresh']=function(){const _0x163bb8=_0x2806ce;this[_0x163bb8(0x204)][_0x163bb8(0x1ac)](),this[_0x163bb8(0x1ad)](),this[_0x163bb8(0x150)](),this[_0x163bb8(0x1d8)](),this[_0x163bb8(0x17c)](),this[_0x163bb8(0x97)](),this[_0x163bb8(0x8d)]();},Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0x1ad)]=function(){const _0x24ddbb=_0x2806ce;this['bitmap'][_0x24ddbb(0xfb)]=$gameSystem[_0x24ddbb(0x19f)](),this[_0x24ddbb(0x204)]['fontSize']=$gameSystem[_0x24ddbb(0x8b)](),this[_0x24ddbb(0x204)]['textColor']=ColorManager['normalColor']();},Sprite_VictoryGauge['prototype'][_0x2806ce(0x150)]=function(){const _0x298ff7=_0x2806ce;this[_0x298ff7(0x1ad)]();const _0x581ea8=this['lineHeight'](),_0x416b44=Math[_0x298ff7(0x105)](_0x581ea8/0x2),_0x168390=0x0,_0x2bf96d=this[_0x298ff7(0x204)]['width']-_0x581ea8,_0x2ea67c=_0x298ff7(0xc5),_0x38062c=this[_0x298ff7(0x12c)]()['name']();this['bitmap'][_0x298ff7(0x10c)](_0x38062c,_0x416b44,_0x168390,_0x2bf96d,_0x581ea8,_0x2ea67c);},Sprite_VictoryGauge['prototype'][_0x2806ce(0x1d8)]=function(){const _0x572494=_0x2806ce;this[_0x572494(0x1ad)]();const _0x5a1bfe=this[_0x572494(0x126)](),_0x5052ee=Math['round'](_0x5a1bfe/0x2),_0x13dae8=0x0,_0x4183d5=this[_0x572494(0x204)][_0x572494(0xcc)]-_0x5a1bfe,_0x408aaa=this[_0x572494(0xaa)]()===''?_0x572494(0x196):_0x572494(0x225),_0x423786=TextManager['victoryDisplayLvFmt']['format'](this[_0x572494(0x12c)]()[_0x572494(0x213)]);this[_0x572494(0xb3)]&&(this[_0x572494(0x204)][_0x572494(0xbb)]=ColorManager['powerUpColor']()),this[_0x572494(0x204)][_0x572494(0x10c)](_0x423786,_0x5052ee,_0x13dae8,_0x4183d5,_0x5a1bfe,_0x408aaa);},Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0xaa)]=function(){const _0x49f8f8=_0x2806ce,_0x29e100=$gameParty[_0x49f8f8(0x111)]()[this[_0x49f8f8(0x222)]];if(!_0x29e100)return'';if(Imported['VisuMZ_X_Template']&&VisuMZ[_0x49f8f8(0x8f)][_0x49f8f8(0xfc)][_0x49f8f8(0x22b)][_0x49f8f8(0x16a)])return VisuMZ[_0x49f8f8(0x8f)][_0x49f8f8(0xfc)]['JobPoints'][_0x49f8f8(0xe4)]['format'](_0x29e100['earnedJobPoints'](),TextManager[_0x49f8f8(0x16f)],TextManager[_0x49f8f8(0x17a)]);if(Imported[_0x49f8f8(0x9b)]){const _0x39b50e=VisuMZ[_0x49f8f8(0x98)][_0x49f8f8(0xfc)];if(_0x39b50e['ClassPoints'][_0x49f8f8(0x16a)])return _0x39b50e[_0x49f8f8(0x88)][_0x49f8f8(0xe4)]['format'](_0x29e100[_0x49f8f8(0xdc)](),TextManager[_0x49f8f8(0x160)],TextManager[_0x49f8f8(0x21e)]);if(_0x39b50e[_0x49f8f8(0x22b)][_0x49f8f8(0x16a)])return _0x39b50e[_0x49f8f8(0x22b)]['AftermathText'][_0x49f8f8(0x217)](_0x29e100[_0x49f8f8(0x1c8)](),TextManager[_0x49f8f8(0x16f)],TextManager[_0x49f8f8(0x17a)]);}if(Imported[_0x49f8f8(0xbc)]){const _0x5bcc37=VisuMZ['SkillLearnSystem'][_0x49f8f8(0xfc)];if(_0x5bcc37[_0x49f8f8(0xae)][_0x49f8f8(0x16a)])return _0x5bcc37[_0x49f8f8(0xae)][_0x49f8f8(0xe4)]['format'](_0x29e100[_0x49f8f8(0xa4)](),TextManager['abilityPointsAbbr'],TextManager[_0x49f8f8(0x82)]);if(_0x5bcc37['SkillPoints'][_0x49f8f8(0x16a)])return _0x5bcc37[_0x49f8f8(0x1b0)][_0x49f8f8(0xe4)][_0x49f8f8(0x217)](_0x29e100[_0x49f8f8(0x155)](),TextManager[_0x49f8f8(0x11e)],TextManager[_0x49f8f8(0x161)]);}return'';},Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0x17c)]=function(){const _0x15aea3=_0x2806ce;this[_0x15aea3(0x1ad)]();const _0xfa33fa=this['lineHeight'](),_0x1927fa=Math['round'](_0xfa33fa/0x2),_0x4769de=0x0,_0x4964d7=this[_0x15aea3(0x204)][_0x15aea3(0xcc)]-_0xfa33fa,_0x1c958b='right';let _0x40bbe0=this[_0x15aea3(0xaa)]();this[_0x15aea3(0x204)]['drawText'](_0x40bbe0,_0x1927fa,_0x4769de,_0x4964d7,_0xfa33fa,_0x1c958b);},Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0x97)]=function(){const _0x2945a3=_0x2806ce,_0x4cee05=this[_0x2945a3(0x126)](),_0x3fc39b=this[_0x2945a3(0x204)][_0x2945a3(0xcc)]-_0x4cee05,_0x9862e2=Sprite_Gauge['prototype'][_0x2945a3(0x10e)](),_0x2487d7=Math[_0x2945a3(0x105)](_0x4cee05/0x2),_0x45696b=_0x4cee05*0x2-_0x9862e2-0x2,_0x1a41a9=Math['floor']((_0x3fc39b-0x2)*this['actor']()['expRate']()),_0x4ddc54=_0x9862e2-0x2,_0x65b12b=this['gaugeBackColor'](),_0x2b3c96=this[_0x2945a3(0x12d)](),_0x4584c0=this[_0x2945a3(0x1b2)]();this[_0x2945a3(0x204)][_0x2945a3(0x1f6)](_0x2487d7,_0x45696b,_0x3fc39b,_0x9862e2,_0x65b12b),this[_0x2945a3(0x204)][_0x2945a3(0x17e)](_0x2487d7+0x1,_0x45696b+0x1,_0x1a41a9,_0x4ddc54,_0x2b3c96,_0x4584c0);},Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0x118)]=function(){const _0x268e49=_0x2806ce;return ColorManager[_0x268e49(0x118)]();},Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0x12d)]=function(){const _0x19f3b3=_0x2806ce;return this[_0x19f3b3(0x12c)]()[_0x19f3b3(0x1da)]()?Imported[_0x19f3b3(0x19b)]?ColorManager[_0x19f3b3(0x1b5)]():ColorManager['textColor'](0xe):Imported[_0x19f3b3(0x19b)]?ColorManager[_0x19f3b3(0x19a)]():ColorManager[_0x19f3b3(0xbb)](0x1e);},Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0x1b2)]=function(){const _0x225027=_0x2806ce;return this[_0x225027(0x12c)]()[_0x225027(0x1da)]()?Imported[_0x225027(0x19b)]?ColorManager[_0x225027(0x14d)]():ColorManager['textColor'](0x6):Imported[_0x225027(0x19b)]?ColorManager[_0x225027(0xcf)]():ColorManager['textColor'](0x1f);},Sprite_VictoryGauge[_0x2806ce(0xfd)][_0x2806ce(0x8d)]=function(){const _0x1062c0=_0x2806ce;this[_0x1062c0(0x1ad)]();const _0x42e587=this[_0x1062c0(0x126)](),_0xd86c81=_0x42e587,_0x3ef8fe=_0x42e587;let _0x28541e=this['bitmap']['width']-_0x42e587*0x2;const _0x1a3e24=this[_0x1062c0(0x12c)]();let _0x5815a0=Math['round'](_0x1a3e24[_0x1062c0(0x13d)]()-_0x1a3e24[_0x1062c0(0x1f2)]()),_0x1c7649='/'+Math[_0x1062c0(0x105)](_0x1a3e24['nextLevelExp']()-_0x1a3e24['currentLevelExp']());Imported[_0x1062c0(0x19b)]&&VisuMZ[_0x1062c0(0x214)][_0x1062c0(0xfc)]['QoL'][_0x1062c0(0x1a4)]&&(_0x5815a0=VisuMZ[_0x1062c0(0x209)](_0x5815a0),_0x1c7649=VisuMZ[_0x1062c0(0x209)](_0x1c7649));this[_0x1062c0(0xb3)]?(this[_0x1062c0(0x204)][_0x1062c0(0xbb)]=ColorManager[_0x1062c0(0x144)](),this[_0x1062c0(0x204)]['drawText'](TextManager[_0x1062c0(0x156)],_0xd86c81,_0x3ef8fe,_0x28541e,_0x42e587,_0x1062c0(0xc5))):this[_0x1062c0(0x204)][_0x1062c0(0x10c)](TextManager[_0x1062c0(0x1de)],_0xd86c81,_0x3ef8fe,_0x28541e,_0x42e587,_0x1062c0(0xc5));this[_0x1062c0(0x1ad)]();if(_0x1a3e24[_0x1062c0(0x1da)]()){this['bitmap'][_0x1062c0(0x10c)](_0x1062c0(0x221),_0xd86c81,_0x3ef8fe,_0x28541e,_0x42e587,_0x1062c0(0x196));return;}this[_0x1062c0(0x204)][_0x1062c0(0x1a1)]-=0x8,this[_0x1062c0(0x204)][_0x1062c0(0xbb)]=ColorManager[_0x1062c0(0xbb)](0x8),this['bitmap']['drawText'](_0x1c7649,_0xd86c81,_0x3ef8fe,_0x28541e,_0x42e587,_0x1062c0(0x196)),_0x28541e-=this[_0x1062c0(0x204)][_0x1062c0(0x1af)](_0x1c7649),this['resetFontSettings'](),this[_0x1062c0(0x204)][_0x1062c0(0x10c)](_0x5815a0,_0xd86c81,_0x3ef8fe,_0x28541e,_0x42e587,_0x1062c0(0x196));};function Window_VictoryContinueMessage(){const _0x4a7e57=_0x2806ce;this[_0x4a7e57(0x1a3)](...arguments);}Window_VictoryContinueMessage[_0x2806ce(0xfd)]=Object[_0x2806ce(0x216)](Window_Base[_0x2806ce(0xfd)]),Window_VictoryContinueMessage[_0x2806ce(0xfd)][_0x2806ce(0x12b)]=Window_VictoryContinueMessage,Window_VictoryContinueMessage[_0x2806ce(0xfd)][_0x2806ce(0x1a3)]=function(_0x4dc645){const _0x2e4862=_0x2806ce;Window_Base[_0x2e4862(0xfd)][_0x2e4862(0x1a3)]['call'](this,_0x4dc645),this[_0x2e4862(0xef)](0x2),this[_0x2e4862(0x1c0)]();},Window_VictoryContinueMessage[_0x2806ce(0xfd)][_0x2806ce(0xc0)]=function(_0x4f59b9){const _0x4b24f3=_0x2806ce;this[_0x4b24f3(0x1ec)]=_0x4f59b9,this[_0x4b24f3(0x91)]=0x0;},Window_VictoryContinueMessage[_0x2806ce(0xfd)][_0x2806ce(0xf4)]=function(){const _0x2b5f68=_0x2806ce;this[_0x2b5f68(0x1cb)]=0x0;},Window_VictoryContinueMessage[_0x2806ce(0xfd)][_0x2806ce(0x9d)]=function(){const _0x27e571=_0x2806ce;Window_Base[_0x27e571(0xfd)][_0x27e571(0x9d)][_0x27e571(0x129)](this),this['updateContentsOpacity']();},Window_VictoryContinueMessage[_0x2806ce(0xfd)][_0x2806ce(0xe7)]=function(){const _0x52d96d=_0x2806ce;this[_0x52d96d(0x1ec)]>0x0&&this[_0x52d96d(0x16b)]()&&(this['_delayDuration']=0x0,Input[_0x52d96d(0x1ac)](),TouchInput[_0x52d96d(0x1ac)]());if(this[_0x52d96d(0x1ec)]-->0x0)return;this['contentsOpacity']+=Window_VictoryRewards[_0x52d96d(0x194)];},Window_VictoryContinueMessage['prototype'][_0x2806ce(0x16b)]=function(){const _0x4b1bec=_0x2806ce;return Input['isPressed']('ok')||Input['isPressed'](_0x4b1bec(0xf2))||TouchInput['isPressed']();},Window_VictoryContinueMessage['prototype']['refresh']=function(){const _0x45e1ce=_0x2806ce;this[_0x45e1ce(0x106)][_0x45e1ce(0x1ac)]();const _0xfdf5f0=TextManager[_0x45e1ce(0xdb)];let _0x2b24e9=TextManager[_0x45e1ce(0x130)],_0x842f1=TextManager[_0x45e1ce(0x1fc)];Imported[_0x45e1ce(0x19b)]&&(_0x2b24e9=TextManager[_0x45e1ce(0x12e)]('ok'),_0x842f1=TextManager[_0x45e1ce(0x12e)](_0x45e1ce(0xf2)));const _0x2fa955=_0xfdf5f0[_0x45e1ce(0x217)](_0x2b24e9,_0x842f1),_0x1f8566=this[_0x45e1ce(0x1a0)](_0x2fa955)[_0x45e1ce(0xcc)],_0x16b463=Math['round']((this[_0x45e1ce(0x1fd)]-_0x1f8566)/0x2);this[_0x45e1ce(0xe0)](_0x2fa955,_0x16b463,0x0,_0x1f8566);},Window_VictoryContinueMessage[_0x2806ce(0xfd)]['isContinueReady']=function(){return this['_delayDuration']<=0x0;};function Window_VictoryRewards(){const _0x4be801=_0x2806ce;this[_0x4be801(0x1a3)](...arguments);}Window_VictoryRewards[_0x2806ce(0x194)]=VisuMZ[_0x2806ce(0x165)]['Settings'][_0x2806ce(0x203)][_0x2806ce(0xcd)],Window_VictoryRewards[_0x2806ce(0xfd)]=Object['create'](Window_StatusBase[_0x2806ce(0xfd)]),Window_VictoryRewards['prototype'][_0x2806ce(0x12b)]=Window_VictoryRewards,Window_VictoryRewards[_0x2806ce(0xfd)]['initialize']=function(_0x13f7d){const _0x1aa0e8=_0x2806ce;Window_StatusBase[_0x1aa0e8(0xfd)]['initialize']['call'](this,_0x13f7d),this[_0x1aa0e8(0xef)](0x2),this[_0x1aa0e8(0x91)]=0x0,this[_0x1aa0e8(0x1c0)]();},Window_VictoryRewards[_0x2806ce(0xfd)]['updatePadding']=function(){this['padding']=0x0;},Window_VictoryRewards[_0x2806ce(0xfd)][_0x2806ce(0x9d)]=function(){const _0x537d1f=_0x2806ce;Window_StatusBase[_0x537d1f(0xfd)][_0x537d1f(0x9d)]['call'](this),this['updateContentsOpacity']();},Window_VictoryRewards[_0x2806ce(0xfd)]['updateContentsOpacity']=function(){const _0x30e550=_0x2806ce;SceneManager[_0x30e550(0x193)][_0x30e550(0x18d)]===_0x30e550(0x1dc)?this[_0x30e550(0x91)]+=Window_VictoryRewards[_0x30e550(0x194)]:this[_0x30e550(0x91)]-=Window_VictoryRewards[_0x30e550(0x194)];},Window_VictoryRewards[_0x2806ce(0xfd)][_0x2806ce(0x189)]=function(){const _0x2ac794=_0x2806ce;return VisuMZ['VictoryAftermath'][_0x2ac794(0xfc)]['General']['MirrorContents'];},Window_VictoryRewards[_0x2806ce(0xfd)][_0x2806ce(0x1c0)]=function(){const _0x396306=_0x2806ce;Window_StatusBase['prototype']['refresh'][_0x396306(0x129)](this),this[_0x396306(0x106)][_0x396306(0x1ac)](),this[_0x396306(0x1ad)](),this['drawBackgroundElements'](),this[_0x396306(0x1bf)](),this[_0x396306(0x14a)](),this[_0x396306(0x166)](),this[_0x396306(0x1f4)]();},Window_VictoryRewards[_0x2806ce(0xfd)][_0x2806ce(0x15b)]=function(){const _0x1be21c=_0x2806ce,_0x4aa702=this[_0x1be21c(0x126)](),_0x3b8ca4=0x0,_0x3cdf18=_0x4aa702*2.5,_0x2f0f39='rgba(0,\x200,\x200,\x200.8)',_0x2dce93=_0x1be21c(0xf8),_0x317f31=ColorManager['normalColor']();this['contents'][_0x1be21c(0x17e)](_0x3b8ca4,_0x3cdf18,this['width'],this['height']-_0x3cdf18-_0x4aa702*1.5,_0x2f0f39,_0x2dce93),this[_0x1be21c(0x106)]['fillRect'](0x0,_0x3cdf18-0x1,this[_0x1be21c(0xcc)],0x2,_0x317f31),this['contents']['fillRect'](0x0,this[_0x1be21c(0xee)]-_0x4aa702*1.5-0x1,this['width'],0x2,_0x317f31);const _0x47b8fd=this[_0x1be21c(0x189)](),_0x22a9f4=_0x47b8fd?Math[_0x1be21c(0x105)](this[_0x1be21c(0xcc)]/0x2+0x28):0x64,_0x99b278=_0x3cdf18-_0x4aa702*0.75,_0x30e7c8=TextManager[_0x1be21c(0x1c7)];this[_0x1be21c(0x15d)](),this[_0x1be21c(0x15d)](),this['drawText'](_0x30e7c8,_0x22a9f4,_0x99b278,this[_0x1be21c(0xcc)]);},Window_VictoryRewards['_rewardSets']=VisuMZ[_0x2806ce(0x165)]['Settings'][_0x2806ce(0x14f)],Window_VictoryRewards[_0x2806ce(0xfd)][_0x2806ce(0x1bf)]=function(){const _0x2dbb08=_0x2806ce;this[_0x2dbb08(0x1ad)]();const _0xbf5417=this[_0x2dbb08(0x189)](),_0x2b6604=this[_0x2dbb08(0x126)](),_0x3c979f=Math[_0x2dbb08(0x1d1)](_0x2b6604/0x2),_0x4bade3=_0xbf5417?Math[_0x2dbb08(0x105)](this[_0x2dbb08(0xcc)]/0x2+0x28):0x64,_0x4f9320=Math[_0x2dbb08(0x105)](_0x2b6604*3.5),_0x3ca7bb=Math[_0x2dbb08(0x105)](this[_0x2dbb08(0xcc)]/0x2-0x8c),_0x5809b1=_0x3ca7bb-_0x3c979f-0x50;let _0x14b7b8=_0x4f9320;for(const _0x1a2019 of Window_VictoryRewards[_0x2dbb08(0x13a)]){if(!_0x1a2019[_0x2dbb08(0x215)]())continue;this[_0x2dbb08(0x1b7)](_0x4bade3,_0x14b7b8,_0x3ca7bb),this[_0x2dbb08(0x9a)](ColorManager[_0x2dbb08(0x11d)]()),this['drawText'](_0x1a2019[_0x2dbb08(0x1bb)](),_0x4bade3+_0x3c979f,_0x14b7b8,_0x5809b1),this[_0x2dbb08(0x9a)](ColorManager[_0x2dbb08(0x1d6)]());const _0x4918be=_0x1a2019[_0x2dbb08(0x205)]();Imported['VisuMZ_3_VisualGoldDisplay']&&_0x1a2019[_0x2dbb08(0x1bb)]()===TextManager[_0x2dbb08(0x197)]?this[_0x2dbb08(0x1fa)](_0x4918be,TextManager['currencyUnit'],_0x4bade3+_0x3c979f,_0x14b7b8,_0x5809b1):this[_0x2dbb08(0x10c)](_0x4918be,_0x4bade3+_0x3c979f,_0x14b7b8,_0x5809b1,'right'),_0x14b7b8+=_0x2b6604;}},Window_VictoryRewards['prototype'][_0x2806ce(0x1b7)]=function(_0x48003c,_0x3ac8c0,_0x3a8d9b){const _0x2f1b5c=_0x2806ce,_0x2b8be1=this['lineHeight']()-0x2,_0x4bc296=Math[_0x2f1b5c(0x1d1)](_0x2b8be1/0x2),_0x113f05=_0x2f1b5c(0xb7),_0x2c5051=ColorManager[_0x2f1b5c(0x142)](),_0x4de7f3=0x50,_0x17901b=_0x3a8d9b-_0x4bc296-_0x4de7f3;!ImageManager[_0x2f1b5c(0x11f)]&&(ImageManager[_0x2f1b5c(0x11f)]=new Bitmap(_0x3a8d9b,_0x2b8be1),ImageManager[_0x2f1b5c(0x11f)]['paintOpacity']=this[_0x2f1b5c(0x92)](),ImageManager[_0x2f1b5c(0x11f)]['drawCircle'](_0x4bc296,_0x4bc296,_0x4bc296,_0x113f05),ImageManager[_0x2f1b5c(0x11f)][_0x2f1b5c(0xa5)](_0x4bc296,0x0,_0x2b8be1,_0x2b8be1),ImageManager[_0x2f1b5c(0x11f)]['fillRect'](_0x4bc296,0x0,_0x17901b,_0x2b8be1,_0x113f05),ImageManager[_0x2f1b5c(0x11f)][_0x2f1b5c(0x17e)](_0x4bc296+_0x17901b,0x0,_0x4de7f3,_0x2b8be1,_0x113f05,_0x2c5051)),this[_0x2f1b5c(0x106)][_0x2f1b5c(0x10a)](ImageManager[_0x2f1b5c(0x11f)],0x0,0x0,_0x3a8d9b,_0x2b8be1,_0x48003c,_0x3ac8c0,_0x3a8d9b,_0x2b8be1);},Window_VictoryRewards[_0x2806ce(0xfd)][_0x2806ce(0x14a)]=function(){const _0x2366d7=_0x2806ce;this['resetFontSettings']();if(BattleManager[_0x2366d7(0x99)]['items']['length']<=0x0)return;const _0x23063e=this[_0x2366d7(0x189)](),_0x135e56=this[_0x2366d7(0x126)](),_0x188023=_0x23063e?0x8c:Math['round'](this[_0x2366d7(0xcc)]/0x2+0x28),_0x5506d8=Math[_0x2366d7(0x105)](_0x135e56*0x3),_0x20e29b=Math[_0x2366d7(0x105)](this[_0x2366d7(0xcc)]/0x2-0x8c),_0x1e86aa=TextManager[_0x2366d7(0xec)],_0x36ebf4=ColorManager[_0x2366d7(0x1d6)]();this[_0x2366d7(0x15d)](),this[_0x2366d7(0x10c)](_0x1e86aa,_0x188023,_0x5506d8,_0x20e29b,_0x2366d7(0xc5));const _0x18a072=_0x23063e?0x64:Math[_0x2366d7(0x105)](this[_0x2366d7(0xcc)]/0x2),_0xf87f54=_0x5506d8+_0x135e56*1.5,_0x3baf2b=Math[_0x2366d7(0x105)](this['width']/0x2)-0x64;this['contents'][_0x2366d7(0x1f6)](_0x18a072,_0xf87f54,_0x3baf2b,0x2,_0x36ebf4);},Window_VictoryRewards[_0x2806ce(0xfd)][_0x2806ce(0x166)]=function(){const _0xe2fc4f=_0x2806ce,_0x1a5259=this[_0xe2fc4f(0x189)](),_0x1bcca5=this[_0xe2fc4f(0x126)](),_0x4286cc=_0x1a5259?0x64:Math['round'](this[_0xe2fc4f(0xcc)]/0x2+0x28),_0x22fc45=Math['round'](_0x1bcca5*0x5),_0xed1841=Math['round'](this[_0xe2fc4f(0xcc)]/0x2-0x8c),_0x4eb049=this[_0xe2fc4f(0xee)]-_0x22fc45-_0x1bcca5*0x2,_0x148137=new Rectangle(_0x4286cc,_0x22fc45,_0xed1841,_0x4eb049);this[_0xe2fc4f(0x21d)]=new Window_VictoryItem(_0x148137,this),this[_0xe2fc4f(0xa9)](this[_0xe2fc4f(0x21d)]);},Window_VictoryRewards['prototype'][_0x2806ce(0x1f4)]=function(){const _0x3ffa94=_0x2806ce;this['resetFontSettings']();const _0x5a7948=this[_0x3ffa94(0x189)](),_0x2644aa=this[_0x3ffa94(0x126)](),_0xf9d0b1=$gameParty[_0x3ffa94(0x218)](),_0xce5e1e=_0x5a7948?Math[_0x3ffa94(0x105)](this['width']/0x2+0x28):0x64,_0x1f989a=this[_0x3ffa94(0xee)]-1.5-_0x2644aa*0x2*(_0xf9d0b1+0x1),_0x56c161=Math['round'](this['width']/0x2-0x8c);let _0x5be972=Math[_0x3ffa94(0x105)](_0x1f989a);if(VisuMZ[_0x3ffa94(0x165)]['Settings'][_0x3ffa94(0x203)][_0x3ffa94(0x101)]??!![])for(let _0x2eac7=0x0;_0x2eac7<_0xf9d0b1;_0x2eac7++){if(!$gameParty[_0x3ffa94(0x111)]()[_0x2eac7])continue;this['drawActorNameStrip'](_0xce5e1e,_0x5be972,_0x56c161),this[_0x3ffa94(0x146)](_0x2eac7,_0xce5e1e,_0x5be972,_0x56c161),_0x5be972+=_0x2644aa*0x2;}},Window_VictoryRewards[_0x2806ce(0xfd)][_0x2806ce(0x131)]=function(_0x38738f,_0x14632a,_0x3e28d8){const _0x4bd4b5=_0x2806ce,_0x411ac8=this[_0x4bd4b5(0x126)]()-0x2,_0x1ae16c=Math[_0x4bd4b5(0x1d1)](_0x411ac8/0x2),_0x9fa40c=_0x4bd4b5(0xb7),_0x214cf8=ColorManager[_0x4bd4b5(0x142)](),_0x4520c9=_0x3e28d8-_0x411ac8;!ImageManager[_0x4bd4b5(0x1b3)]&&(ImageManager[_0x4bd4b5(0x1b3)]=new Bitmap(_0x3e28d8,_0x411ac8),ImageManager[_0x4bd4b5(0x1b3)]['paintOpacity']=this[_0x4bd4b5(0x92)](),ImageManager[_0x4bd4b5(0x1b3)][_0x4bd4b5(0x147)](_0x1ae16c,_0x1ae16c,_0x1ae16c,_0x9fa40c),ImageManager[_0x4bd4b5(0x1b3)]['drawCircle'](_0x1ae16c+_0x4520c9,_0x1ae16c,_0x1ae16c,_0x9fa40c),ImageManager['victoryNameBitmap'][_0x4bd4b5(0xa5)](_0x1ae16c,0x0,_0x4520c9,_0x411ac8),ImageManager[_0x4bd4b5(0x1b3)][_0x4bd4b5(0x1f6)](_0x1ae16c,0x0,_0x4520c9,_0x411ac8,_0x9fa40c)),this[_0x4bd4b5(0x106)][_0x4bd4b5(0x10a)](ImageManager[_0x4bd4b5(0x1b3)],0x0,0x0,_0x3e28d8,_0x411ac8,_0x38738f,_0x14632a,_0x3e28d8,_0x411ac8);},Window_VictoryRewards['prototype'][_0x2806ce(0x146)]=function(_0x1b601b,_0x83b4f2,_0x23a934,_0x848951){const _0x115d83=_0x2806ce,_0x39ac1b=_0x115d83(0x19d)[_0x115d83(0x217)](_0x1b601b),_0x1c44ce=this[_0x115d83(0xe1)](_0x39ac1b,_0x1b601b,_0x848951);_0x1c44ce[_0x115d83(0xc1)](_0x83b4f2,_0x23a934),_0x1c44ce['show']();},Window_VictoryRewards[_0x2806ce(0xfd)]['createGaugeSprite']=function(_0x1bd842,_0x2d1eb8,_0x1bc023){const _0xe37fc4=_0x2806ce,_0x27891f=this[_0xe37fc4(0x17b)];if(_0x27891f[_0x1bd842])return _0x27891f[_0x1bd842];else{const _0x54adcf=new Sprite_VictoryGauge(_0x2d1eb8,this,_0x1bc023);return _0x27891f[_0x1bd842]=_0x54adcf,this[_0xe37fc4(0xd7)](_0x54adcf),_0x54adcf;}};function Window_VictoryItem(){const _0x38eed5=_0x2806ce;this[_0x38eed5(0x1a3)](...arguments);}Window_VictoryItem[_0x2806ce(0xfd)]=Object['create'](Window_ItemList[_0x2806ce(0xfd)]),Window_VictoryItem[_0x2806ce(0xfd)]['constructor']=Window_VictoryItem,Window_VictoryItem[_0x2806ce(0xfd)][_0x2806ce(0x1a3)]=function(_0x5e44fa,_0x3d1a1d){const _0x4d608d=_0x2806ce;this[_0x4d608d(0xa6)]=_0x3d1a1d,Window_ItemList[_0x4d608d(0xfd)][_0x4d608d(0x1a3)][_0x4d608d(0x129)](this,_0x5e44fa),this[_0x4d608d(0xef)](0x2),this[_0x4d608d(0x1c0)](),this[_0x4d608d(0xe7)](),this[_0x4d608d(0x179)][_0x4d608d(0x20e)]>this['maxVisibleItems']()&&(this['activate'](),this[_0x4d608d(0x20f)](0x0));},Window_VictoryItem['prototype'][_0x2806ce(0x1fb)]=function(){const _0x47af40=_0x2806ce;return Window_Base['prototype'][_0x47af40(0x1fb)]['call'](this);},Window_VictoryItem[_0x2806ce(0xfd)]['updatePadding']=function(){const _0x8b84a3=_0x2806ce;this[_0x8b84a3(0x1cb)]=0x0;},Window_VictoryItem[_0x2806ce(0xfd)]['maxCols']=function(){return 0x1;},Window_VictoryItem[_0x2806ce(0xfd)][_0x2806ce(0xaf)]=function(){return 0x0;},Window_VictoryItem[_0x2806ce(0xfd)][_0x2806ce(0x9d)]=function(){const _0x5418bd=_0x2806ce;Window_ItemList[_0x5418bd(0xfd)][_0x5418bd(0x9d)][_0x5418bd(0x129)](this),this[_0x5418bd(0xe7)]();},Window_VictoryItem['prototype'][_0x2806ce(0xe7)]=function(){const _0x544401=_0x2806ce;this['contentsOpacity']=this[_0x544401(0xa6)]['contentsOpacity'];},Window_VictoryItem['prototype'][_0x2806ce(0x1c4)]=function(){const _0x5b8349=_0x2806ce,_0xf6ef48=BattleManager[_0x5b8349(0x99)][_0x5b8349(0x186)];_0xf6ef48[_0x5b8349(0x1bd)]((_0xc351cc,_0x30c670)=>_0xc351cc['id']-_0x30c670['id']);const _0x30aacd=_0xf6ef48['filter'](_0x202170=>DataManager[_0x5b8349(0xc7)](_0x202170)),_0x323fba=_0xf6ef48[_0x5b8349(0xb0)](_0xa6409d=>DataManager['isWeapon'](_0xa6409d)),_0x1f6a9d=_0xf6ef48[_0x5b8349(0xb0)](_0x4fdd40=>DataManager['isArmor'](_0x4fdd40));this[_0x5b8349(0x179)]=_0x30aacd['concat'](_0x323fba)['concat'](_0x1f6a9d),this[_0x5b8349(0x179)]=this[_0x5b8349(0x179)][_0x5b8349(0xb0)]((_0x18271e,_0x1703ba,_0x3065f1)=>_0x3065f1[_0x5b8349(0x104)](_0x18271e)===_0x1703ba);},Window_VictoryItem[_0x2806ce(0xfd)][_0x2806ce(0x170)]=function(_0x2249fa){return!![];},Window_VictoryItem[_0x2806ce(0xfd)]['isShowNew']=function(){return![];},Window_VictoryItem[_0x2806ce(0xfd)][_0x2806ce(0x121)]=function(_0x3f7180){const _0x9a6e45=_0x2806ce;return BattleManager[_0x9a6e45(0x99)][_0x9a6e45(0x186)][_0x9a6e45(0xb0)](_0x4a1151=>_0x4a1151===_0x3f7180)['length'];},Window_VictoryItem[_0x2806ce(0xfd)][_0x2806ce(0x9e)]=function(_0x4a8ab1){},Window_VictoryItem[_0x2806ce(0xfd)]['drawItemNumber']=function(_0xe013ea,_0x26bce9,_0x48b536,_0x879cc8){const _0x43235b=_0x2806ce;let _0x3da1db=_0x43235b(0x1ca);Imported[_0x43235b(0x22c)]&&(_0x3da1db=VisuMZ[_0x43235b(0xd8)][_0x43235b(0xfc)][_0x43235b(0x164)]['ItemQuantityFmt']);let _0x332d81=_0x3da1db[_0x43235b(0x217)](this['itemCount'](_0xe013ea));this['drawText'](_0x332d81,_0x26bce9,_0x48b536,_0x879cc8,_0x43235b(0x196));};function _0x4235(){const _0x2fcf06=['gaugeHeight','skills','ShowDelayMS','members','battleMembers','bossCollapse','includes','drawLevelUpQuote','26454393ZlCbaE','BattleVictoryJS','gaugeBackColor','drawParamChanges','parse','LvFmt','makeDeepCopy','systemColor','skillPointsAbbr','victoryRewardBitmap','Game_Actor_setup','itemCount','BackRectColor','paramValueByName','addChildToBack','initVictoryAftermath','lineHeight','ActorQuotesNewSkillClear','onVictoryStepLevelUpMember','call','param','constructor','actor','gaugeColor1','getInputButtonString','playVictoryBgm','victoryKeyOk','drawActorNameStrip','ActorQuotesNewSkillAdd','endBattle','_victoryTempActorsA','nextLevelExp','Param','_victoryAftermathCopy','_victoryAftermathSettings','LevelUp','_rewardSets','Game_Actor_shouldDisplayLevelUp','createVictorySteps','currentExp','drawLevelMessage','_actorSprite','pan','removeBattleStates','dimColor2','drawParamDiffValue','victoryLevelUpColor','createVictoryAftermathWindows','placeActorGauges','drawCircle','randomInt','getQuoteText','drawItemGainTitle','isBypassVictoryAftermathMotion','701820XrQDEO','maxLvGaugeColor2','quoteLevelUp','Rewards','drawActorName','SystemBypassVictoryPhase','createVictoryStepRewards','createVictoryContinueMessageWindow','clamp','earnedSkillPoints','victoryDisplayLvUp','prepareVictoryAftermathTransition','bypassVictoryMusic','status','faceHeight','drawBackgroundElements','rgba(0,\x200,\x200,\x200.8)','makeFontBigger','BattleManager_initMembers','initMembers','classPointsAbbr','skillPointsFull','processVictoryAftermath','VisuMZ_1_MessageCore','ItemScene','VictoryAftermath','makeItemGainWindow','isVictoryPhase','updateVictorySteps','_victorySteps','AftermathActorDisplay','isFastForwarded','bypassVictoryMotion','shift','_fullWidth','jobPointsAbbr','isEnabled','faceWidth','setActor','VisuMZ_1_OptionsCore','3JBsCjU','actorParams','LevelUpQuotes','UpdateDuration','_victoryAftermathLevelUpQuotes','_data','jobPointsFull','_additionalSprites','drawActorAdditionalRewards','processVictoryStep','gradientFillRect','isBypassVictoryAftermathMusic','victoryNewSkillFmt','removeVictoryLevelUpBuffer','HideDelayMS','checkVictoryAftermathAutoBattleAutoSkip','processBattleCoreJS','ARRAYJSON','items','_actorId','levelUp','mirrorContents','1791075RjNocP','map','trim','_victoryStep','drawParamAfterValue','_spriteset','_duration','drawActorFace','28758nxXGiL','_scene','_opacitySpeed','Bgm','right','currencyUnit','drawNewLearnedSkills','createVictoryStepLevelUps','expGaugeColor1','VisuMZ_0_CoreEngine','Vocab','actor%1-gauge','push','mainFontFace','textSizeEx','fontSize','findNewSkills','initialize','DigitGroupingStandardText','registerCommand','getColorDataFromPluginParameters','isBusy','isSceneBattle','updateOpacity','ConvertParams','setActionState','clear','resetFontSettings','NewSkill','measureTextWidth','SkillPoints','match','gaugeColor2','victoryNameBitmap','loadPicture','maxLvGaugeColor1','paramchangeTextColor','drawRewardStrip','STRUCT','_showBust','drawParamName','Text','hideSubInputWindows','sort','paintOpacity','drawRewards','refresh','BattleManager_isBusy','_currentlevel','anchor','makeItemList','_tempActorExpGain','Bypass','victoryDisplayTitle','earnedJobPoints','playBgm','x%1','padding','638214RVbwhr','_victoryUpdateDuration','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','description','_victoryLevelUpSFX','floor','_colorCache','_victoryWindows','AutoBattleAutoSkip','drawNewLearnedSkillsList','normalColor','LvUp','drawActorLevel','838294pCYZLN','isMaxLevel','isCollapsing','rewards','done','exp','isVictoryContinueReady','gainTempExp','isContinueReady','setup','HideLevelDiff','WaitRegularCollapse','volume','processVictory','ShowParamDiff','getQuoteWidth','performVictory','skipVictoryAftermathTransition','BustPosY','_delayDuration','BustPosX','LvUpSfx','LvUpColor','NUM','ActorID','currentLevelExp','createBitmap','drawPartyExpGauges','createSubWindow','fillRect','Enable','allowUpdateBattleAniSpeed','nextVictoryLevelUpActor','drawCurrencyValue','itemHeight','victoryKeyCancel','innerWidth','_actor','STR','bypassVictoryPhase','getVictoryAftermathBackColor','drawParamBeforeValue','General','bitmap','Data','opacity','playVictoryLevelUpSFX','_victoryLevelUpWindow','GroupDigits','KeyCancel','1190HFDfNi','exit','_victoryBgm','length','select','changeExp','#%1','victory-level-up-color','level','CoreEngine','Show','create','format','maxBattleMembers','processVictoryAftermathParty','ActorQuotesLevelUpClear','_victoryActorIndex','_victoryAftermathNewSkillQuotes','_itemGainWindow','classPointsFull','paramValueFontSize','_victoryContinueWindow','MAX\x20LEVEL','_index','_effectType','FUNC','center','getMenuImage','Victory','SystemBypassVictoryMotion','victoryFullScreenWindowRect','return\x200','JobPoints','VisuMZ_1_ItemsEquipsCore','some','pitch','Scene_Battle_update','ARRAYNUM','WaitBossCollapse','scale','abilityPointsFull','max','victoryContinueMessageWindowRect','(+%1)','closeCommandWindows','processPostBattleCommonEvents','ClassPoints','(%1)','DrawBackRect','mainFontSize','isBattleMember','drawExpValues','battlerSprites','Template','shouldDisplayLevelUp','contentsOpacity','translucentOpacity','drawItemDarkRect','ShowFace','isRepeated','_phase','drawExpGauge','ClassChangeSystem','_rewards','changeTextColor','VisuMZ_2_ClassChangeSystem','ExtDisplayedParams','update','drawItemBackground','setupVictoryLevelUpNextActor','updateExpGain','LvUpPitch','loadFaceImages','textWidth','earnedAbilityPoints','clearRect','_mainWindow','processVictoryAftermathMusic','ActorQuotesLevelUpAdd','addChild','getAdditionalRewardsText','Game_System_initialize','isActor','VisuMZ_1_MainMenuCore','AbilityPoints','colSpacing','filter','boxWidth','hideWindowsForVictoryAftermath','_showLevelUp','LvUpPan','name','getColor','rgba(0,\x200,\x200,\x201)','3565440CtfBye','_showFace','itemPadding','textColor','VisuMZ_2_SkillLearnSystem','makeRewards','NewSkillQuotes','_autoBattleVictorySkip','setDelayDuration','move','replayBgmAndBgs','isVictoryLevelUpPhaseEnabled','index','left','bind','isItem','pop','newSkillQuotes','victoryAftermathSettings','KeyOK','width','FadeInSpeed','drawNewLearnedSkillsBackground','expGaugeColor2','RewardItems','ARRAYEVAL','processVictoryAftermathRewards','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','JSON','createVictoryRewardsWindow','processVictoryAftermathTransition','addInnerChild','ItemsEquipsCore','finishVictoryPhase','ARRAYFUNC','victoryContinueFmt','earnedClassPoints','battleEnd','_victoryTempActorsB','victoryDisplayLvFmt','drawTextEx','createGaugeSprite','quoteLevelSkill','levelups','AftermathText','beforeActor','_subWindow','updateContentsOpacity','gainRewards','updateVictoryPhase','collapse','MessageWidth','victoryDisplayItem','createActorSprite','height','setBackgroundType','playSe','expRate','cancel','VisuMZ_1_BattleCore','updatePadding','_victoryRewardsWindow','NewQuotes','finalExpRate','rgba(0,\x200,\x200,\x200.4)','_victoryPhase','ContinueFmt','fontFace','Settings','prototype','levelUpQuotes','isBypassVictoryAftermathPhase','setupVictoryAftermathQuotes','ShowExpGauges','BustScale','afterActor','indexOf','round','contents','Game_Actor_performVictory','_victoryLevelUpBuffer','createVictoryLevelUpWindow','blt','Game_Actor_isBattleMember','drawText','_drawParamDiff'];_0x4235=function(){return _0x2fcf06;};return _0x4235();}function Window_VictoryLevelUp(){this['initialize'](...arguments);}Window_VictoryLevelUp['_opacitySpeed']=Window_VictoryRewards[_0x2806ce(0x194)],Window_VictoryLevelUp[_0x2806ce(0x1b9)]=VisuMZ[_0x2806ce(0x165)][_0x2806ce(0xfc)][_0x2806ce(0x139)]['ShowBust'],Window_VictoryLevelUp[_0x2806ce(0xfd)]=Object[_0x2806ce(0x216)](Window_StatusBase['prototype']),Window_VictoryLevelUp[_0x2806ce(0xfd)][_0x2806ce(0x12b)]=Window_VictoryLevelUp,Window_VictoryLevelUp[_0x2806ce(0xfd)][_0x2806ce(0x1a3)]=function(_0x35efd7){const _0x1c6c7f=_0x2806ce;Window_StatusBase[_0x1c6c7f(0xfd)][_0x1c6c7f(0x1a3)][_0x1c6c7f(0x129)](this,_0x35efd7),this[_0x1c6c7f(0xef)](0x2),this[_0x1c6c7f(0x91)]=0x0,this['refresh'](),this['createActorSprite'](),this[_0x1c6c7f(0x1f5)]();},Window_VictoryLevelUp[_0x2806ce(0xfd)]['updatePadding']=function(){const _0x2ce9b0=_0x2806ce;this[_0x2ce9b0(0x1cb)]=0x0;},Window_VictoryLevelUp[_0x2806ce(0xfd)][_0x2806ce(0x9d)]=function(){const _0x587844=_0x2806ce;Window_StatusBase[_0x587844(0xfd)]['update'][_0x587844(0x129)](this),this[_0x587844(0xe7)]();},Window_VictoryLevelUp[_0x2806ce(0xfd)][_0x2806ce(0xe7)]=function(){const _0x4f10cd=_0x2806ce;SceneManager['_scene'][_0x4f10cd(0x18d)]==='levelups'?this[_0x4f10cd(0x91)]+=Window_VictoryLevelUp['_opacitySpeed']:this[_0x4f10cd(0x91)]-=Window_VictoryLevelUp['_opacitySpeed'],this[_0x4f10cd(0x13f)]&&(this[_0x4f10cd(0x13f)][_0x4f10cd(0x206)]=this[_0x4f10cd(0x91)]);},Window_VictoryLevelUp[_0x2806ce(0xfd)]['refresh']=function(){const _0x4ae064=_0x2806ce;Window_StatusBase[_0x4ae064(0xfd)]['refresh']['call'](this),this[_0x4ae064(0x106)][_0x4ae064(0x1ac)](),this[_0x4ae064(0x1ad)](),this[_0x4ae064(0x15b)]();},Window_VictoryLevelUp[_0x2806ce(0xfd)][_0x2806ce(0x15b)]=function(){const _0x30b972=_0x2806ce,_0xf8cf32=this[_0x30b972(0x126)](),_0x35c137=_0x30b972(0x15c),_0x591eb8=_0x30b972(0xf8),_0x540311=ColorManager[_0x30b972(0x1d6)](),_0xfe610f=SceneManager['_scene']['_victoryContinueWindow']['x'],_0x5d7e06=Math[_0x30b972(0x105)](this[_0x30b972(0xcc)]/0x2);this[_0x30b972(0x106)]['gradientFillRect'](_0xfe610f,0x0,_0x5d7e06,this[_0x30b972(0xee)],_0x591eb8,_0x35c137,!![]),this[_0x30b972(0x106)][_0x30b972(0x1f6)](_0xfe610f-0x1,0x0,0x2,this[_0x30b972(0xee)],_0x540311),this[_0x30b972(0x106)][_0x30b972(0x1f6)](_0xfe610f+_0x5d7e06-0x1,0x0,0x2,this['height'],_0x540311);const _0x328d62=_0xf8cf32,_0xf6721d=_0xf8cf32*0x1;this['contents'][_0x30b972(0x17e)](0x0,_0x328d62,this[_0x30b972(0xcc)],_0xf6721d,_0x35c137,_0x591eb8),this[_0x30b972(0x106)][_0x30b972(0x1f6)](0x0,_0x328d62-0x1,this['width'],0x2,_0x540311),this['contents'][_0x30b972(0x1f6)](0x0,_0x328d62+_0xf6721d-0x1,this['width'],0x2,_0x540311);const _0x4f8760=this[_0x30b972(0xee)]-_0xf8cf32*5.5,_0x55244b=_0xf8cf32*0x4;this[_0x30b972(0x106)][_0x30b972(0x17e)](0x0,_0x4f8760,this[_0x30b972(0xcc)],_0x55244b,_0x35c137,_0x591eb8),this['contents']['gradientFillRect'](0x0,_0x4f8760,this[_0x30b972(0xcc)],_0x55244b,_0x591eb8,_0x35c137),this['contents'][_0x30b972(0x1f6)](0x0,_0x4f8760-0x2,this[_0x30b972(0xcc)],0x2,_0x540311),this['contents'][_0x30b972(0x1f6)](0x0,_0x4f8760+_0x55244b,this[_0x30b972(0xcc)],0x2,_0x540311);},Window_VictoryLevelUp[_0x2806ce(0xfd)][_0x2806ce(0xed)]=function(){const _0x2c593f=_0x2806ce,_0x2e44aa=VisuMZ['VictoryAftermath']['Settings']['LevelUp'];this[_0x2c593f(0x13f)]=new Sprite(),this['_actorSprite'][_0x2c593f(0x1c3)]['x']=0.5,this[_0x2c593f(0x13f)][_0x2c593f(0x1c3)]['y']=0x1,this[_0x2c593f(0x13f)][_0x2c593f(0x206)]=0x0,this[_0x2c593f(0x13f)]['x']=Math[_0x2c593f(0x105)](eval(_0x2e44aa[_0x2c593f(0x1ed)])),this[_0x2c593f(0x13f)]['y']=Math[_0x2c593f(0x105)](eval(_0x2e44aa[_0x2c593f(0x1eb)])),this[_0x2c593f(0x13f)][_0x2c593f(0x232)]['x']=_0x2e44aa[_0x2c593f(0x102)],this[_0x2c593f(0x13f)][_0x2c593f(0x232)]['y']=_0x2e44aa[_0x2c593f(0x102)],this[_0x2c593f(0x124)](this[_0x2c593f(0x13f)]);},Window_VictoryLevelUp['prototype'][_0x2806ce(0x1f5)]=function(){const _0x76e4fe=_0x2806ce,_0x5a0a29=new Rectangle(0x0,0x0,this[_0x76e4fe(0xcc)],this[_0x76e4fe(0xee)]);this[_0x76e4fe(0xe6)]=new Window_VictoryLevelUpActor(_0x5a0a29,this),this['addChild'](this[_0x76e4fe(0xe6)]);},Window_VictoryLevelUp['prototype']['setActor']=function(_0x8b0878){const _0x3c62bd=_0x2806ce;Imported['VisuMZ_1_MainMenuCore']&&Window_VictoryLevelUp['_showBust']&&(this[_0x3c62bd(0x13f)][_0x3c62bd(0x204)]=ImageManager['loadPicture'](_0x8b0878[_0x3c62bd(0x226)]())),SoundManager['playVictoryLevelUpSFX'](),this[_0x3c62bd(0xe6)][_0x3c62bd(0x172)](_0x8b0878);};function Window_VictoryLevelUpActor(){const _0x3ca696=_0x2806ce;this[_0x3ca696(0x1a3)](...arguments);}Window_VictoryLevelUpActor['_opacitySpeed']=Window_VictoryRewards[_0x2806ce(0x194)],Window_VictoryLevelUpActor[_0x2806ce(0x10d)]=VisuMZ['VictoryAftermath']['Settings'][_0x2806ce(0x139)][_0x2806ce(0x1e7)],Window_VictoryLevelUpActor[_0x2806ce(0xb9)]=VisuMZ[_0x2806ce(0x165)][_0x2806ce(0xfc)][_0x2806ce(0x139)][_0x2806ce(0x94)],Window_VictoryLevelUpActor[_0x2806ce(0xfd)]=Object[_0x2806ce(0x216)](Window_StatusBase['prototype']),Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0x12b)]=Window_VictoryLevelUpActor,Window_VictoryLevelUpActor['prototype']['initialize']=function(_0x5619d5,_0x457c31){const _0x2082c7=_0x2806ce;this[_0x2082c7(0xa6)]=_0x457c31,Window_StatusBase[_0x2082c7(0xfd)]['initialize'][_0x2082c7(0x129)](this,_0x5619d5),this['setBackgroundType'](0x2),this[_0x2082c7(0x91)]=0x0,this['_actor']=null,this[_0x2082c7(0x1c0)]();},Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0xf4)]=function(){const _0x2456a4=_0x2806ce;this[_0x2456a4(0x1cb)]=0x0;},Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0x9d)]=function(){const _0x2813ce=_0x2806ce;Window_StatusBase['prototype'][_0x2813ce(0x9d)][_0x2813ce(0x129)](this),this[_0x2813ce(0xe7)]();},Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0xe7)]=function(){const _0x1867e2=_0x2806ce;this[_0x1867e2(0x91)]=this[_0x1867e2(0xa6)][_0x1867e2(0x91)];},Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0x172)]=function(_0x400790){const _0x5659f9=_0x2806ce;this[_0x5659f9(0x1fe)]=_0x400790,this[_0x5659f9(0x1c0)]();},Window_VictoryLevelUpActor[_0x2806ce(0xfd)]['beforeActor']=function(){const _0x247b58=_0x2806ce,_0x16842d=this[_0x247b58(0x1fe)][_0x247b58(0xc4)]();return BattleManager['_victoryTempActorsB'][_0x16842d];},Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0x103)]=function(){const _0x4a81a8=_0x2806ce,_0x445411=this[_0x4a81a8(0x1fe)][_0x4a81a8(0xc4)]();return BattleManager[_0x4a81a8(0x134)][_0x445411];},Window_VictoryLevelUpActor[_0x2806ce(0xfd)]['refresh']=function(){const _0x54ff75=_0x2806ce;Window_StatusBase[_0x54ff75(0xfd)][_0x54ff75(0x1c0)][_0x54ff75(0x129)](this),this[_0x54ff75(0x106)]['clear'](),this[_0x54ff75(0x1ad)]();if(!this[_0x54ff75(0x1fe)])return;this[_0x54ff75(0x13e)](),this[_0x54ff75(0x119)](),this['drawNewLearnedSkills'](),this[_0x54ff75(0x115)]();},Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0x13e)]=function(){const _0x33141f=_0x2806ce,_0x4ebb78=this[_0x33141f(0x126)](),_0x3e26a2=TextManager[_0x33141f(0x188)][_0x33141f(0x217)](this[_0x33141f(0x1fe)]['name'](),TextManager[_0x33141f(0x213)],this[_0x33141f(0x1fe)][_0x33141f(0x213)]),_0x1fdef7=this[_0x33141f(0x1a0)](_0x3e26a2)[_0x33141f(0xcc)],_0x33df24=SceneManager[_0x33141f(0x193)][_0x33141f(0x220)]['x']+Math[_0x33141f(0x105)]((this[_0x33141f(0xcc)]/0x2-_0x1fdef7)/0x2),_0x2ecd79=_0x4ebb78;this[_0x33141f(0xe0)](_0x3e26a2,_0x33df24,_0x2ecd79,_0x1fdef7);},Window_VictoryLevelUpActor[_0x2806ce(0xfd)]['drawItemDarkRect']=function(_0x2012f1,_0x57e2c1,_0x2ce3c5,_0x269044,_0x5f1a20){const _0x5dadb9=_0x2806ce;if(VisuMZ[_0x5dadb9(0x165)][_0x5dadb9(0xfc)][_0x5dadb9(0x139)][_0x5dadb9(0x8a)]===![])return;_0x5f1a20=Math['max'](_0x5f1a20||0x1,0x1);while(_0x5f1a20--){_0x269044=_0x269044||this[_0x5dadb9(0x126)](),this[_0x5dadb9(0x106)][_0x5dadb9(0x1be)]=0xa0;const _0x442b21=ColorManager['getVictoryAftermathBackColor']();this[_0x5dadb9(0x106)][_0x5dadb9(0x1f6)](_0x2012f1+0x1,_0x57e2c1+0x1,_0x2ce3c5-0x2,_0x269044-0x2,_0x442b21),this['contents'][_0x5dadb9(0x1be)]=0xff;}},ColorManager[_0x2806ce(0x201)]=function(){const _0x3a6fe8=_0x2806ce,_0x19fa66=VisuMZ['VictoryAftermath'][_0x3a6fe8(0xfc)]['LevelUp'];let _0x26da61=_0x19fa66['BackRectColor']!==undefined?_0x19fa66[_0x3a6fe8(0x122)]:0x13;return ColorManager[_0x3a6fe8(0xb6)](_0x26da61);},Window_VictoryLevelUpActor[_0x2806ce(0xfd)]['drawParamChanges']=function(){const _0x54f48c=_0x2806ce,_0x525ab5=this[_0x54f48c(0x126)](),_0x3e7ffb='→',_0x24abee=this[_0x54f48c(0x175)](),_0x330422=_0x525ab5*0x2,_0x552b0e=this['height']-_0x525ab5*5.5,_0x54c0cd=this[_0x54f48c(0xa3)](_0x3e7ffb)+this[_0x54f48c(0xba)]()*0x2,_0x560d5e=Window_VictoryLevelUpActor[_0x54f48c(0x10d)]?0x4:0x3,_0x197298=Math[_0x54f48c(0x105)]((this[_0x54f48c(0xcc)]/0x2-_0x54c0cd-this[_0x54f48c(0xba)]()*0x2)/_0x560d5e),_0x3e9e43=_0x552b0e-_0x330422,_0x3ca93f=VisuMZ[_0x54f48c(0x165)][_0x54f48c(0xfc)][_0x54f48c(0x139)][_0x54f48c(0x1e3)],_0x37985f=SceneManager['_scene'][_0x54f48c(0x220)]['x']+this[_0x54f48c(0xba)](),_0x39e801=_0x37985f+_0x197298,_0x19cd6d=_0x39e801+_0x197298,_0x2bc8e5=_0x19cd6d+_0x54c0cd,_0x30d60b=_0x2bc8e5+_0x197298;let _0x3c2e59=Math[_0x54f48c(0x105)](_0x330422+(_0x3e9e43-(_0x24abee[_0x54f48c(0x20e)]+(_0x3ca93f?0x0:0x1))*_0x525ab5)/0x2),_0x673d1e=0x2;!_0x3ca93f&&(this[_0x54f48c(0x1ad)](),VisuMZ['ItemsEquipsCore']&&(this['contents'][_0x54f48c(0x1a1)]=Window_EquipStatus['prototype'][_0x54f48c(0x21f)]()),this[_0x54f48c(0x93)](_0x37985f,_0x3c2e59,_0x197298,_0x525ab5,_0x673d1e),this[_0x54f48c(0x1ba)](_0x54f48c(0x213),_0x37985f,_0x3c2e59,_0x197298),this[_0x54f48c(0x93)](_0x39e801,_0x3c2e59,_0x197298,_0x525ab5,_0x673d1e),this['drawParamBeforeValue']('level',_0x39e801,_0x3c2e59,_0x197298),this[_0x54f48c(0x93)](_0x19cd6d,_0x3c2e59,_0x54c0cd,_0x525ab5,_0x673d1e),this[_0x54f48c(0x9a)](ColorManager[_0x54f48c(0x11d)]()),this[_0x54f48c(0x10c)](_0x3e7ffb,_0x19cd6d,_0x3c2e59,_0x54c0cd,_0x54f48c(0x225)),this['drawItemDarkRect'](_0x2bc8e5,_0x3c2e59,_0x197298,_0x525ab5,_0x673d1e),this[_0x54f48c(0x18e)](_0x54f48c(0x213),_0x2bc8e5,_0x3c2e59,_0x197298),Window_VictoryLevelUpActor[_0x54f48c(0x10d)]&&(this['drawItemDarkRect'](_0x30d60b,_0x3c2e59,_0x197298,_0x525ab5,_0x673d1e),this['drawParamDiffValue'](_0x54f48c(0x213),_0x30d60b,_0x3c2e59,_0x197298)),_0x3c2e59+=_0x525ab5,_0x673d1e=_0x673d1e===0x2?0x1:0x2);for(const _0x4fd86f of _0x24abee){this[_0x54f48c(0x1ad)](),VisuMZ['ItemsEquipsCore']&&(this['contents']['fontSize']=Window_EquipStatus[_0x54f48c(0xfd)][_0x54f48c(0x21f)]()),this[_0x54f48c(0x93)](_0x37985f,_0x3c2e59,_0x197298,_0x525ab5,_0x673d1e),this[_0x54f48c(0x1ba)](_0x4fd86f,_0x37985f,_0x3c2e59,_0x197298),this[_0x54f48c(0x93)](_0x39e801,_0x3c2e59,_0x197298,_0x525ab5,_0x673d1e),this[_0x54f48c(0x202)](_0x4fd86f,_0x39e801,_0x3c2e59,_0x197298),this[_0x54f48c(0x93)](_0x19cd6d,_0x3c2e59,_0x54c0cd,_0x525ab5,_0x673d1e),this[_0x54f48c(0x9a)](ColorManager[_0x54f48c(0x11d)]()),this[_0x54f48c(0x10c)](_0x3e7ffb,_0x19cd6d,_0x3c2e59,_0x54c0cd,'center'),this[_0x54f48c(0x93)](_0x2bc8e5,_0x3c2e59,_0x197298,_0x525ab5,_0x673d1e),this[_0x54f48c(0x18e)](_0x4fd86f,_0x2bc8e5,_0x3c2e59,_0x197298),Window_VictoryLevelUpActor[_0x54f48c(0x10d)]&&(this[_0x54f48c(0x93)](_0x30d60b,_0x3c2e59,_0x197298,_0x525ab5,_0x673d1e),this['drawParamDiffValue'](_0x4fd86f,_0x30d60b,_0x3c2e59,_0x197298)),_0x3c2e59+=_0x525ab5,_0x673d1e=_0x673d1e===0x2?0x1:0x2;}},Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0x175)]=function(){const _0x31b907=_0x2806ce;return Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0x31b907(0x214)][_0x31b907(0xfc)][_0x31b907(0x136)][_0x31b907(0x9c)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0x1ba)]=function(_0x5b8e6b,_0x45207e,_0x4eb41c,_0x33170c){const _0x2e9d34=_0x2806ce;this[_0x2e9d34(0x9a)](ColorManager[_0x2e9d34(0x11d)]());let _0x3c5716='';_0x5b8e6b===_0x2e9d34(0x213)?_0x3c5716=TextManager[_0x2e9d34(0x213)]:_0x3c5716=TextManager[_0x2e9d34(0x12a)](_0x5b8e6b),this[_0x2e9d34(0x10c)](_0x3c5716,_0x45207e+this[_0x2e9d34(0xba)](),_0x4eb41c,_0x33170c-this['itemPadding']()*0x2);},Window_VictoryLevelUpActor[_0x2806ce(0xfd)]['drawParamBeforeValue']=function(_0x13dc10,_0xb78ea4,_0xda0e5f,_0x52b9e7){const _0x21129c=_0x2806ce,_0x3e7e05=this['beforeActor']();let _0x4770f0='';_0x13dc10===_0x21129c(0x213)?_0x4770f0=_0x3e7e05[_0x21129c(0x213)]:_0x4770f0=Imported[_0x21129c(0x19b)]?_0x3e7e05[_0x21129c(0x123)](_0x13dc10,!![]):_0x3e7e05[_0x21129c(0x12a)](_0x13dc10),this['changeTextColor'](ColorManager[_0x21129c(0x1d6)]()),this[_0x21129c(0x10c)](_0x4770f0,_0xb78ea4+this['itemPadding'](),_0xda0e5f,_0x52b9e7-this[_0x21129c(0xba)]()*0x2,_0x21129c(0x196));},Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0x18e)]=function(_0x4772fb,_0x44afc4,_0x126373,_0x2486d9){const _0x1fef09=_0x2806ce,_0x296820=this[_0x1fef09(0xe5)](),_0xb17b8a=this[_0x1fef09(0x1fe)];let _0x3dcd39=0x0,_0x764453=0x0,_0x16ba88='0';_0x4772fb===_0x1fef09(0x213)?(_0x3dcd39=_0x296820['level'],_0x764453=_0xb17b8a[_0x1fef09(0x213)],_0x16ba88=_0x764453):(_0x3dcd39=Imported[_0x1fef09(0x19b)]?_0x296820['paramValueByName'](_0x4772fb,![]):_0x296820[_0x1fef09(0x12a)](_0x4772fb),_0x764453=Imported[_0x1fef09(0x19b)]?_0xb17b8a[_0x1fef09(0x123)](_0x4772fb,![]):_0xb17b8a['param'](_0x4772fb),_0x16ba88=Imported[_0x1fef09(0x19b)]?_0xb17b8a['paramValueByName'](_0x4772fb,!![]):_0x764453);const _0x2e7801=_0x764453-_0x3dcd39;this[_0x1fef09(0x9a)](ColorManager[_0x1fef09(0x1b6)](_0x2e7801)),this[_0x1fef09(0x10c)](_0x16ba88,_0x44afc4+this['itemPadding'](),_0x126373,_0x2486d9-this[_0x1fef09(0xba)]()*0x2,_0x1fef09(0x196));},Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0x143)]=function(_0x1812ed,_0x45d668,_0x349bef,_0x4116a0){const _0x390e4b=_0x2806ce,_0x5d0e84=this[_0x390e4b(0xe5)](),_0xbb389f=this[_0x390e4b(0x1fe)];let _0x549206=0x0,_0x453386=0x0;_0x1812ed===_0x390e4b(0x213)?(_0x549206=_0x5d0e84[_0x390e4b(0x213)],_0x453386=_0xbb389f['level']):(_0x549206=Imported[_0x390e4b(0x19b)]?_0x5d0e84[_0x390e4b(0x123)](_0x1812ed,![]):_0x5d0e84['param'](_0x1812ed),_0x453386=Imported['VisuMZ_0_CoreEngine']?_0xbb389f[_0x390e4b(0x123)](_0x1812ed,![]):_0xbb389f[_0x390e4b(0x12a)](_0x1812ed));const _0x362683=_0x453386-_0x549206;let _0x560dd4=_0x362683;if(_0x549206%0x1!==0x0)_0x560dd4=Math[_0x390e4b(0x105)](_0x362683*0x64)+'%';_0x362683!==0x0&&(this[_0x390e4b(0x9a)](ColorManager[_0x390e4b(0x1b6)](_0x362683)),_0x560dd4=(_0x362683>=0x0?_0x390e4b(0x85):_0x390e4b(0x89))[_0x390e4b(0x217)](_0x560dd4),this[_0x390e4b(0x10c)](_0x560dd4,_0x45d668+this[_0x390e4b(0xba)](),_0x349bef,_0x4116a0-this[_0x390e4b(0xba)]()*0x2,_0x390e4b(0xc5)));},Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0x198)]=function(){const _0x491f2c=_0x2806ce;this[_0x491f2c(0x1ad)]();const _0x276318=this['findNewSkills']();if(_0x276318['length']<=0x0)return;const _0x3ac043=VisuMZ[_0x491f2c(0x165)][_0x491f2c(0xfc)][_0x491f2c(0x139)]['MaxSkills'];while(_0x276318[_0x491f2c(0x20e)]>_0x3ac043){_0x276318[_0x491f2c(0xc8)]();}this['drawNewLearnedSkillsBackground'](_0x276318),this['drawNewLearnedSkillsList'](_0x276318);},Window_VictoryLevelUpActor['prototype'][_0x2806ce(0x1a2)]=function(){const _0x4ac560=_0x2806ce,_0x1200e2=this[_0x4ac560(0xe5)]()[_0x4ac560(0x10f)]();return this[_0x4ac560(0x1fe)][_0x4ac560(0x1a2)](_0x1200e2);},Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0xce)]=function(_0x578277){const _0x4c210f=_0x2806ce,_0x4a9a56=this['lineHeight'](),_0x5c5b92='rgba(0,\x200,\x200,\x200.8)',_0x507428=_0x4c210f(0xf8),_0x1b02eb=ColorManager[_0x4c210f(0x1d6)](),_0x555da7=Math[_0x4c210f(0x105)](this[_0x4c210f(0xcc)]/0x2)-0x64-_0x4a9a56*0x2,_0x45f93e=(_0x578277[_0x4c210f(0x20e)]+0x1)*_0x4a9a56,_0xbadfcc=_0x4a9a56,_0x578254=this[_0x4c210f(0xee)]-_0x4a9a56*6.5-_0x45f93e;this[_0x4c210f(0x106)][_0x4c210f(0x1f6)](_0xbadfcc-0x2,_0x578254-0x2,_0x555da7+0x4,_0x45f93e+0x4,_0x1b02eb),this[_0x4c210f(0x106)][_0x4c210f(0xa5)](_0xbadfcc,_0x578254,_0x555da7,_0x45f93e),this[_0x4c210f(0x106)]['gradientFillRect'](_0xbadfcc,_0x578254,_0x555da7,_0x45f93e,_0x5c5b92,_0x507428);},Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0x1d5)]=function(_0x5c8ec0){const _0x4fad74=_0x2806ce,_0x4526f2=this['lineHeight'](),_0x50fe29=_0x4fad74(0x15c),_0x4a1158=_0x4fad74(0xf8),_0x23cf6c=ColorManager[_0x4fad74(0x1d6)](),_0x4231f2=Math['round'](this[_0x4fad74(0xcc)]/0x2)-0x64-(_0x4526f2+this[_0x4fad74(0xba)]())*0x2,_0x42baa8=(_0x5c8ec0[_0x4fad74(0x20e)]+0x1)*_0x4526f2;let _0x1902c8=_0x4526f2+this[_0x4fad74(0xba)](),_0x43ff0e=this['height']-_0x4526f2*6.5-_0x42baa8;const _0x21751d=TextManager['victoryNewSkillFmt'][_0x4fad74(0x217)](this[_0x4fad74(0x1fe)][_0x4fad74(0xb5)]()),_0x32e305=this[_0x4fad74(0x1a0)](_0x21751d)['width'],_0x5e2338=Math[_0x4fad74(0x105)](_0x1902c8+(_0x4231f2-_0x32e305)/0x2);this[_0x4fad74(0xe0)](_0x21751d,_0x5e2338,_0x43ff0e,_0x32e305),_0x43ff0e+=_0x4526f2,this[_0x4fad74(0x106)][_0x4fad74(0x1f6)](_0x1902c8,_0x43ff0e-0x1,_0x4231f2,0x2,_0x23cf6c);for(const _0x46277e of _0x5c8ec0){if(!_0x46277e)continue;this['resetFontSettings'](),this['drawItemName'](_0x46277e,_0x1902c8+this[_0x4fad74(0xba)](),_0x43ff0e,_0x4231f2-this[_0x4fad74(0xba)]()*0x2),_0x43ff0e+=_0x4526f2;}},Window_VictoryLevelUpActor[_0x2806ce(0xfd)][_0x2806ce(0x115)]=function(){const _0x3c6fab=_0x2806ce,_0x1d0ff7=this['lineHeight'](),_0x5bcfd6=Window_VictoryLevelUpActor[_0x3c6fab(0xb9)],_0xc345a6=this[_0x3c6fab(0x1e8)](),_0x1d7180=_0x1d0ff7*0x4,_0x108d18=Math[_0x3c6fab(0x105)]((this[_0x3c6fab(0xcc)]-_0xc345a6)/0x2),_0x134a91=_0x108d18+(_0x5bcfd6?ImageManager[_0x3c6fab(0x171)]+0x14:0x0),_0x141100=this[_0x3c6fab(0xee)]-_0x1d0ff7*5.5;let _0x5dd878=this[_0x3c6fab(0x149)]();_0x5bcfd6&&this[_0x3c6fab(0x191)](this[_0x3c6fab(0x1fe)],_0x108d18,_0x141100,ImageManager[_0x3c6fab(0x171)],ImageManager[_0x3c6fab(0x15a)]),this[_0x3c6fab(0xe0)](_0x5dd878,_0x134a91,_0x141100,_0xc345a6-_0x134a91);},Window_VictoryLevelUpActor['prototype'][_0x2806ce(0x1e8)]=function(){const _0x4d7295=_0x2806ce;let _0x16a08c=Graphics[_0x4d7295(0xb1)];return Imported[_0x4d7295(0x163)]&&(_0x16a08c=Math['min'](_0x16a08c,VisuMZ['MessageCore'][_0x4d7295(0xfc)][_0x4d7295(0x203)][_0x4d7295(0xeb)])),_0x16a08c-this[_0x4d7295(0xba)]()*0x2;},Window_VictoryLevelUpActor['prototype'][_0x2806ce(0x149)]=function(){const _0x4fa71f=_0x2806ce;return this[_0x4fa71f(0x1a2)]()[_0x4fa71f(0x20e)]>0x0?TextManager[_0x4fa71f(0xe2)](this['_actor'])[_0x4fa71f(0x217)](this['_actor'][_0x4fa71f(0xb5)]()):TextManager[_0x4fa71f(0x14e)](this[_0x4fa71f(0x1fe)])['format'](this['_actor'][_0x4fa71f(0xb5)]());};