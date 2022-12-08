//=============================================================================
// VisuStella MZ - Boost Action
// VisuMZ_3_BoostAction.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BoostAction = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BoostAction = VisuMZ.BoostAction || {};
VisuMZ.BoostAction.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.05] [BoostAction]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Boost_Action_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_MessageCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds Boost Points, a mechanic which augments the potency of
 * skills and/or items based on the type of notetag they have. The newly added
 * mechanic allows actors and/or enemies to temporarily power themselves up for
 * the current turn by using the Boost Points resource. Boost Points are gained
 * at the end of each turn if the battler did not use any Boost Points. While
 * Boosted, actions can deal more damage, hit more times, make buffs/debuffs or
 * states last longer, and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add a new battle resource to your game: Boost Points!
 * * Determine how many Boost Points can be stored at a time!
 * * Also determine how many Boost Points can be used at a time!
 * * Determine how Boosting affects skills and items through the different
 *   kinds of notetags provided through this plug.
 * * Enemies can Boost, too! As long as the proper notetags are in place!
 * * Utilize Shortcut Keys to quickly Boost skills and/or items.
 * * Boosting skills and/or items can also affect the text displayed in the
 *   Help Window, too!
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
 * * VisuMZ_1_SkillsStatesCore
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
 * VisuMZ_3_WeaknessDisplay
 *
 * The "Analyze" ability in the VisuStella MZ Weakness Display can be Boosted
 * through this plugin and reveal multiple weaknesses at a time.
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
 * VisuMZ_1_BattleCore
 * 
 * When using Action Sequences, Boost effects for damage, turn extensions,
 * analyze, etc. will not occur for anything other than the Action Sequence:
 * "MECH: Action Effect" in order to maintain controlled effects. However, if
 * you do want to apply bonuses for Boosts, utilize "MECH: Boost Store Data" to
 * store inside a variable how many times Boosts were used. This can be used
 * however which way you want it to as long as it is manageable through events
 * and Common Events.
 * 
 * ---
 *
 * VisuMZ_2_BattleSystemBTB
 * 
 * The Boost Actions plugin cannot be used together with Battle System - BTB.
 * If the Battle System is switched to using Battle System - BTB, then the
 * Boost Actions plugin will shut itself off.
 * 
 * The reason why these plugins cannot work together is because their mechanics
 * play off too similarly to each other and cause conflicts. We, the plugin
 * developer team, highly recommend that you utilize Battle System - BTB's
 * Brave system instead of the Boost system to make the best use of the battle
 * system in effect.
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
 * === Boost Effect-Related Notetags ===
 * 
 * ---
 *
 * <Boost Damage>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the damage dealt by this skill/item.
 * - The amount of damage increased will be determined by the Plugin Parameter
 *   Mechanical settings for Damage Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Turns>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the duration of skills, buffs, and debuffs added by
 *   this skill/item.
 * - The amount of turns increased will be determined by the Plugin Parameter
 *   Mechanical settings for Turn Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Repeat>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of repeated hits dealt by this skill/item.
 * - The amount of hits increased will be determined by the Plugin Parameter
 *   Mechanical settings for Repeated Hits Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Effect Gain>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of Boost Points acquired through the
 *   <Target Boost Points: +x> and <User Boost Points: +x> notetags.
 * - The power of the effect will be determined by the Plugin Parameter
 *   Mechanical settings for Effect Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Analyze>
 *
 * - Used for: Skill, Item Notetags
 * - Requires VisuMZ_3_WeaknessDisplay!
 * - Boosts will alter the number of revealed weaknesses by this skill/item.
 * - The amount of weaknesses revealed will be determined by the Plugin
 *   Parameter Mechanical settings for Analyze Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 * 
 * ---
 * 
 * === Boost Points Gain/Loss-Related Notetags ===
 * 
 * ---
 *
 * <User Boost Points: +x>
 * <User Boost Points: -x>
 *
 * <Target Boost Points: +x>
 * <Target Boost Points: -x>
 *
 * - Used for: Skill, Item Notetags
 * - The user/target will gain/lose Boost Points if this skill/item connects.
 * - Replace 'x' with a number representing the number of Boost Points for the
 *   user/target to gain/lose.
 *
 * ---
 *
 * <Boost Points Battle Start: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by multiplicatively.
 *
 * ---
 *
 * <Boost Points Battle Start: +x>
 * <Boost Points Battle Start: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by additively.
 *
 * ---
 * 
 * === Boost Point Requirements-Related Notetags ===
 * 
 * The following are notetags that make skills/items require a certain amount
 * of Boost Points to be in "use" before they can become enabled.
 * 
 * ---
 *
 * <Require x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require >= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require > x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require more than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require = x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require exactly x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require < x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require less than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require <= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at most x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 * 
 * === Boosting-Related Notetags ===
 * 
 * ---
 *
 * <Boost Stealed>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - As long as the battler is affected by a trait object with this notetag,
 *   the battler cannot Boost.
 *
 * ---
 * 
 * === Enemy-Related Notetags ===
 * 
 * ---
 *
 * <Boost Skill id: Full>
 * <Boost name: Full>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will use as many Boost
 *   Points as it can to cast it.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Least x>
 * <Boost name: At Least x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use Boost Points
 *   after reaching 'x' Boost Points and will use as much as it can.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Most x>
 * <Boost name: At Most x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only as many Boost
 *   Points as it can unless the Boost Points spent go over 'x'.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: Exactly x>
 * <Boost name: Exactly x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use 'x' Boost
 *   Points when Boosting for the skill.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 * 
 * === Regeneration-Related Notetags ===
 * 
 * ---
 *
 * <Boost Points Regen: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by multiplicatively.
 *
 * ---
 *
 * <Boost Points Regen: +x>
 * <Boost Points Regen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by additively.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Boosting-Related Text Codes ===
 *
 * These text codes are used for Help Window descriptions. When Boosting, the
 * text displayed in the Help Window can change to reflect the amount boosted.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boostDamage[x]      This will apply damage modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostTurn[x]        This will apply turn modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostRepeat[x]      This will apply repeat hit modifiers to number x based
 *                      on the actor's currently used Boost amount.
 * 
 * \boostEffect[x]      This will apply Boost Point effect modifiers to number
 *                      x based on the actor's currently used Boost amount.
 * 
 * \boostAnalyze[x]     This will apply analyze modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boost[text]         The text inside the brackets won't appear unless at
 *                      least 1 Boost is used.
 * 
 * \boost0[text]        The text inside the brackets won't appear unless if any
 *                      Boost is used.
 * 
 * \boost>=x[text]      The text inside the brackets will only appear if at
 *                      least x Boosts are used.
 * 
 * \boost>x[text]       The text inside the brackets will only appear if more
 *                      than x Boosts are used.
 * 
 * \boost=x[text]       The text inside the brackets will only appear if
 *                      exactly x Boosts are used.
 * 
 * \boost<x[text]       The text inside the brackets will only appear if less
 *                      than x Boosts are used.
 * 
 * \boost<=x[text]      The text inside the brackets will only appear if at
 *                      most x Boosts are used.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * These Plugin Parameters govern the mechanics behind Boost Points and
 * Boosting for this RPG Maker MZ plugin.
 *
 * ---
 *
 * Boost Points
 * 
 *   Max Stored:
 *   - Maximum Boost Points that can be stored at any time.
 * 
 *   Max Usable:
 *   - How many Boost Points can be usable at a time?
 * 
 *   Start Battle:
 *   - How many Boost Points as a base do you want battlers to start
 *     battles with?
 * 
 *   Regeneration:
 *   - How many Boost Points do you want battlers to regenerate each
 *     turn applicable?
 * 
 *     Always Regen?:
 *     - Always regenerate Boost Points each turn?
 *     - Otherwise, regenerate on turns when Boost Points weren't used.
 * 
 *     Death Regen?:
 *     - Regenerate Boost Points while dead?
 *     - Otherwise, don't.
 * 
 *   Death Removal?:
 *   - Remove all stored Boost Points on death?
 *   - Otherwise, keep them.
 *
 * ---
 *
 * Boost Animations
 * 
 *   Animation ID's:
 *   - Animation IDs start from 0 Boosts to max.
 *   - These animations play when Boosting/Unboosting.
 * 
 *   Animation Delay:
 *   - How many milliseconds to play between animations when enemies
 *     Boost actions?
 *
 * ---
 *
 * Boost Modifiers
 * 
 *   Damage:
 * 
 *     Multipliers:
 *     - Damage multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *     Addition:
 *     - Damage addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *   State/Buff Turns:
 * 
 *     Multipliers:
 *     - Turn multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *     Addition:
 *     - Turn addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *   Repeated Hits:
 * 
 *     Multipliers:
 *     - Repeat multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *     Addition:
 *     - Repeat addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *   Effect:
 * 
 *     Multipliers:
 *     - Effect multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *     Addition:
 *     - Effect addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *   Analyze:
 * 
 *     Multipliers:
 *     - Analyze multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 * 
 *     Addition:
 *     - Analyze addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * These Plugin Parameter settings govern the visual elements related to Boost
 * Points and Boosting.
 *
 * ---
 *
 * Icons
 * 
 *   Boost Icon:
 *   - What icon do you wish to represent Boosting and
 *     Boost Point availability?
 * 
 *   Empty Icon:
 *   - What icon do you wish to represent Unboosting and
 *     Boost Point absence?
 * 
 *   Icon Size Rate:
 *   - What size do you wish the icons to be displayed at?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *   Smooth Icons?:
 *   - Do you wish to smooth out the icons or pixelate them?
 *
 * ---
 *
 * Vocab
 * 
 *   Boost Command:
 *   - This is the text used for the "Boost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 * 
 *   Unboost Command:
 *   - This is the text used for the "Unboost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 *
 * ---
 *
 * Shortcut Controls
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Enable Page Up/Down keys to adjust Boost points as a shortcut?
 * 
 *   Bypassed Windows:
 *   - These are constructor names for windows that the shortcut key will not
 *     work on.
 *
 * ---
 *
 * Battle Status
 * 
 *   Show Boost Points?:
 *   - Show Boost Points in the Battle Status Window?
 * 
 *   Auto-Position?:
 *   - Automatically position the Boost Points?
 *   - If not, it'll position it to the upper left.
 * 
 *   Offset X/Y:
 *   - How much to offset the Boost icons X/Y position by?
 *   - For X: Negative goes left. Positive goes right.
 *   - For Y: Negative goes up. Positive goes down.
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
 * Version 1.05: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: August 27, 2021
 * * Compatibility Update!
 * ** Boost text should now work properly with VisuStella MZ's Party System
 *    switching. Update made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 23, 2021
 * * Bug Fixes!
 * ** Boost icons should no longer disappear after a single battle. Fix made
 *    by Olivia.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** <User Boost Points: +x> notetag should now work properly. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: May 5, 2021
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
 * @param BoostAction
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
 * @desc Settings for the Boost Action mechanics.
 * @default {"BoostPoints":"","MaxStored:num":"5","Usable:num":"3","StartBattle:num":"1","Regen:num":"1","AlwaysRegen:eval":"false","DeathRegen:eval":"false","DeathRemoval:eval":"true","Animations":"","Animations:arraynum":"[\"12\",\"13\",\"15\",\"14\",\"2\",\"51\",\"52\",\"53\",\"67\",\"66\",\"107\"]","AnimationDelay:num":"800","Modifiers":"","Damage":"","DmgMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","DmgAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Turns":"","TurnMultiply:arraynum":"[\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\"]","TurnAddition:arraynum":"[\"0\",\"2\",\"4\",\"6\",\"8\",\"10\",\"12\",\"14\",\"16\",\"18\",\"20\"]","Repeat":"","RepeatMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","RepeatAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Effect":"","EffectMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","EffectAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Analyze":"","AnalyzeMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","AnalyzeAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Settings for the Boost Action UI.
 * @default {"Icons":"","BoostIcon:num":"163","EmptyIcon:num":"161","IconSizeRate:num":"0.5","SmoothIcons:eval":"true","Vocab":"","BoostCmd:str":"Boost","ShowBoostCmd:eval":"true","UnboostCmd:str":"Unboost","ShowUnboostCmd:eval":"true","Controls":"","PgUpDnShortcuts:eval":"true","BypassConstructors:arraystr":"[\"Window_BattleActor\",\"Window_BattleEnemy\",\"Window_BattleItem\",\"Window_PartyBattleSwitch\"]","BattleStatus":"","BattleStatusShow:eval":"true","BattleStatusAutoPosition:eval":"true","BattleStatusOffsetX:num":"+0","BattleStatusOffsetY:num":"+0"}
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
 * @param BoostPoints
 * @text Boost Points
 *
 * @param MaxStored:num
 * @text Max Stored
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc Maximum Boost Points that can be stored at any time.
 * @default 5
 *
 * @param Usable:num
 * @text Max Usable
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc How many Boost Points can be usable at a time?
 * @default 3
 *
 * @param StartBattle:num
 * @text Start Battle
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points as a base do you want battlers
 * to start battles with?
 * @default 1
 *
 * @param Regen:num
 * @text Regeneration
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points do you want battlers to regenerate
 * each turn applicable?
 * @default 1
 *
 * @param AlwaysRegen:eval
 * @text Always Regen?
 * @parent Regen:num
 * @type boolean
 * @on Always
 * @off Other
 * @desc Always regenerate Boost Points each turn? Otherwise,
 * regenerate on turns when Boost Points weren't used.
 * @default false
 *
 * @param DeathRegen:eval
 * @text Death Regen?
 * @parent Regen:num
 * @type boolean
 * @on Regen on Death
 * @off No Regen
 * @desc Regenerate Boost Points while dead?
 * Otherwise, don't.
 * @default false
 *
 * @param DeathRemoval:eval
 * @text Death Removal?
 * @parent BoostPoints
 * @type boolean
 * @on Remove on Death
 * @off No Removal
 * @desc Remove all stored Boost Points on death?
 * Otherwise, keep them.
 * @default true
 * 
 * @param Animations
 * @text Boost Animations
 *
 * @param Animations:arraynum
 * @text Animation ID's
 * @parent Animations
 * @type animation[]
 * @desc Animation IDs start from 0 Boosts to max.
 * These animations play when Boosting/Unboosting.
 * @default ["12","13","15","14","2","51","52","53","67","66","107"]
 *
 * @param AnimationDelay:num
 * @text Animation Delay
 * @parent Animations
 * @type number
 * @desc How many milliseconds to play between animations when
 * enemies Boost actions?
 * @default 1000
 * 
 * @param Modifiers
 * @text Boost Modifiers
 * 
 * @param Damage
 * @parent Modifiers
 *
 * @param DmgMultiply:arraynum
 * @text Multipliers
 * @parent Damage
 * @type string[]
 * @desc Damage multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param DmgAddition:arraynum
 * @text Addition
 * @parent Damage
 * @type string[]
 * @desc Damage addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Turns
 * @parent Modifiers
 * @text State/Buff Turns
 *
 * @param TurnMultiply:arraynum
 * @text Multipliers
 * @parent Turns
 * @type string[]
 * @desc Turn multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0"]
 *
 * @param TurnAddition:arraynum
 * @text Addition
 * @parent Turns
 * @type string[]
 * @desc Turn addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["0","2","4","6","8","10","12","14","16","18","20"]
 * 
 * @param Repeat
 * @parent Modifiers
 * @text Repeated Hits
 *
 * @param RepeatMultiply:arraynum
 * @text Multipliers
 * @parent Repeat
 * @type string[]
 * @desc Repeat multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param RepeatAddition:arraynum
 * @text Addition
 * @parent Repeat
 * @type string[]
 * @desc Repeat addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Effect
 * @parent Modifiers
 *
 * @param EffectMultiply:arraynum
 * @text Multipliers
 * @parent Effect
 * @type string[]
 * @desc Effect multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param EffectAddition:arraynum
 * @text Addition
 * @parent Effect
 * @type string[]
 * @desc Effect addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Analyze
 * @parent Modifiers
 *
 * @param AnalyzeMultiply:arraynum
 * @text Multipliers
 * @parent Analyze
 * @type string[]
 * @desc Analyze multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param AnalyzeAddition:arraynum
 * @text Addition
 * @parent Analyze
 * @type string[]
 * @desc Analyze addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
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
 * @param BoostIcon:num
 * @text Boost Icon
 * @parent Icons
 * @desc What icon do you wish to represent Boosting
 * and Boost Point availability?
 * @default 163
 *
 * @param EmptyIcon:num
 * @text Empty Icon
 * @parent Icons
 * @desc What icon do you wish to represent Unboosting
 * and Boost Point absence?
 * @default 161
 *
 * @param IconSizeRate:num
 * @text Icon Size Rate
 * @parent Icons
 * @desc What size do you wish the icons to be displayed at?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param SmoothIcons:eval
 * @text Smooth Icons?
 * @parent Icons
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Do you wish to smooth out the icons or pixelate them?
 * @default true
 * 
 * @param Vocab
 *
 * @param BoostCmd:str
 * @text Boost Command
 * @parent Vocab
 * @desc This is the text used for the "Boost" command
 * displayed in the Actor Command Window.
 * @default Boost
 *
 * @param ShowBoostCmd:eval
 * @text Show?
 * @parent BoostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 *
 * @param UnboostCmd:str
 * @text Unboost Command
 * @parent Vocab
 * @desc This is the text used for the "Unboost" command
 * displayed in the Actor Command Window.
 * @default Unboost
 *
 * @param ShowUnboostCmd:eval
 * @text Show?
 * @parent UnboostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 * 
 * @param Controls
 * @text Shortcut Controls
 *
 * @param PgUpDnShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Controls
 * @type boolean
 * @on Enable Shortcuts
 * @off Disable Shortcuts
 * @desc Enable Page Up/Down keys to adjust Boost points
 * as a shortcut?
 * @default true
 *
 * @param BypassConstructors:arraystr
 * @text Bypassed Windows
 * @parent Controls
 * @type string[]
 * @desc These are constructor names for windows that the shortcut
 * key will not work on.
 * @default ["Window_BattleActor","Window_BattleEnemy","Window_BattleItem","Window_PartyBattleSwitch"]
 * 
 * @param BattleStatus
 * @text Battle Status
 *
 * @param BattleStatusShow:eval
 * @text Show Boost Points?
 * @parent BattleStatus
 * @type boolean
 * @on Show Boost Points
 * @off Hide Boost Points
 * @desc Show Boost Points in the Battle Status Window?
 * @default true
 *
 * @param BattleStatusAutoPosition:eval
 * @text Auto-Position?
 * @parent BattleStatus
 * @type boolean
 * @on Auto-Position
 * @off Manual Position
 * @desc Automatically position the Boost Points?
 * If not, it'll position it to the upper left.
 * @default true
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How much to offset the Boost icons X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How much to offset the Boost icons Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 */
//=============================================================================

function _0x5dc3(){const _0x4ff68e=['isSceneBattle','clamp','Damage','BoostCmd','updateIcon','loadBitmap','add','gainStoredBoostPoints','convertBoostRepeatEscape','text','Game_Action_numRepeats','IconSet','EnemyBoostSkillName','replace','BoostSealed','updateFrame','_icons','BoostGainPoints','isHidden','isSkill','members','faceWidth','_inBattle','smooth','regenerateBoostPoints','meetstoUseBoostPointsRequirement','EmptyIcon','addUnboostCommand','parameters','_stateTurns','Game_Battler_regenerateTp','BypassConstructors','floor','selectNextCommand','Window_Selectable_cursorPagedown','blt','VisuMZ_0_CoreEngine','EVAL','EffectMultiply','Settings','AnimationDelay','Scene_Battle_selectNextCommand','addChild','Scene_Battle_createActorCommandWindow','boostMultiplier','processTurn','7ArIEdz','unboostIcon','setupBattleBoostPointsMultiplier','round','StartBattle','Amount','_slot','_subject','bpRegenAdded','addCommand','setupBoostAI','ShowFacesListStyle','Game_Party_partyChangeRefresh','parse','convertBoostEqualEscape','partyChangeRefresh','BOOST_POINTS_MULTIPLIERS','startChangeBoostPointsAnimation','BOOST_POINTS_DEATH_REGEN','optDisplayTp','filter','BP\x20Effect','apply','boostCommandName','BoostAction','ICON_SIZE_RATE','GreaterEqual','convertBoostTurnEscape','Game_Battler_addDebuff','push','Equal','clearBoostSubject','bpRegenMultipliers','convertBoostEffectEscape','convertBoostUpEscape','isBTB','BoostPointsRegenFlat','Game_Battler_removeBattleStates','ShowBoostCmd','startActorCommandSelection','numRepeats','_actorCommandWindow','__Game_Action_applyItemUserEffect','IconSizeRate','MaxStored','_bpTurnFlat','BoostBattleStartFlat','Game_Battler_regenerateAll','STR','processtoUseBoostPoints','format','ARRAYSTRUCT','boostSmooth','Game_Battler_addState','boost','PgUpDnShortcuts','BoostRepeat','Game_BattlerBase_initialize','BOOST_POINTS_REGEN_ALWAYS','setupBattleBoostPointsAdded','Game_BattlerBase_resetStateCounts','Animations','meetsUsableItemConditions','2377254htLvmQ','BoostTurns','randomInt','BpEffect','processEnemyUseBoost','item','BattleManager_processTurn','callUpdateHelp','addDebuff','192849iFUlWK','VisuMZ_1_MessageCore','Game_BattlerBase_meetsUsableItemConditions','Window_Selectable_cursorPageup','Regen','processEnemyBPUsage','addActor','allowBoostAction','UserBoostPoints','traitObjects','isBoostSealed','drawItemStatusBoostPointsAuto','removeActor','addGuardCommand','height','inBattle','BOOST_POINTS_DISPLAY_OFFSET_Y','addBuff','BattleLayout','10zQdFfl','create','convertBoostAnalyzeEscape','some','createActorCommandWindow','BOOST_ACTION_BYPASS_CONSTRUCTORS','resetStateCounts','_boostAI','iconHeight','convertBoost0Escape','bitmap','RegExp','shouldDrawBoostIcons','1134584XUSJvO','setStoredBoostPoints','isActor','2658294LTERRb','max','VisuMZ_1_BattleCore','calculateBPtoUse','applyBoostPointTurns','Require','scale','meetsBoostShortcutRequirements','convertEscapeCharacters','bind','resize','createChildSprites','LessEqual','BattleStatusOffsetX','convertBoostGreaterEscape','DmgMultiply','_storedBoostPoints','maxTurns','addBoostCommand','drawItemStatusBoostPointsDefault','RepeatAddition','prototype','\x5cI[%1]%2','BOOST_POINTS_DISPLAY_OFFSET_X','applyBoostPointDamage','commandUnboost','boostIconsheetBitmap','drawItemStatusBoostPoints','width','canUndoBoostPoints','setup','_iconIndex','Turn','commandBoost','constructor','unboostCommandName','2105295weunel','BoostBattleStartRate','actor','requestFauxAnimation','applyBPEffects','ARRAYSTR','minTurns','applyItemUserEffect','clear','ARRAYNUM','convertBoostLessEqualEscape','UNBOOST_ACTION_SHOW','setupBattleBoostPoints','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Mechanics','removeBattleStates','Game_Party_addActor','FUNC','regenerateAll','applyGuard','note','match','endActionBoostPoints','BOOST_POINTS_DISPLAY_AUTO_POS','reset','border','placeBoostPoints','name','AnalyzeAddition','isDead','Less','cursorPageup','unboost','DmgAddition','description','BoostPointsRegenRate','actorId','Game_Party_removeActor','SmoothIcons','setFrame','VisuMZ_1_SkillsStatesCore','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','initBoostAction','setHandler','BOOST_POINTS_TURN_REGEN','BattleStatusAutoPosition','convertBoostDamageEscape','RefreshHelpWindowInBattle','BattleCore','Game_Enemy_setup','TargetBoostPoints','_helpWindow','BOOST_ACTION_SHORTCUT_PAGEUP_PAGEDN','15LXnrIc','ConvertParams','_turnUsedBoostPoints','endAction','includes','commandStyle','_boostIconSheet','addState','Skill\x20','Scene_Battle_startActorCommandSelection','_battler','BOOST_ACTION_SHOW','TurnMultiply','toLowerCase','BOOST_POINTS_ADDITION','status','toUpperCase','loadSystem','ARRAYJSON','Analyze','currentAction','_bpTurnRate','_bpSubject','BattleManager_endAction','storedBoostPoints','BOOST_POINTS_MAX_TOUSE','exit','enemy','lineHeight','cursorPagedown','call','boostAddition','_scene','default','createInnerSprite','189344fJRojd','Game_Action_apply','map','setToUseBoostPoints','subject','_logWindow','show','regenerateTp','NUM','_toUseBoostPoints','refresh','initMembers','Usable','_waitCount','canUseBoostPoints','greater','Game_Battler_addBuff','_actor','boostIcon','BOOST_POINTS_ANIMATIONS','toUseBoostPoints','actor%1-boostPoints','BOOST_POINTS_DEATH_REMOVE','trim','portrait','109204Nqihkn','STRUCT','boostTransferBitmap','Window_ActorCommand_addGuardCommand','Window_Base_convertEscapeCharacters','getStateReapplyRulings','setBoostSubject','convertBoostLessEscape','initialize','EnemyBoostSkillID','return\x200','split','BoostDamage','drawItemStatus','itemRect','iconWidth','DeathRemoval','currentSymbol','Repeat','BattleManager_setup','gainToUseBoostPoints','boostPointsRegenValue','BOOST_POINTS_DISPLAY_BATTLE_STATUS','convertBoostGreaterEqualEscape','BOOST_POINTS_MAX_STORED'];_0x5dc3=function(){return _0x4ff68e;};return _0x5dc3();}const _0x3e729f=_0x16c5;(function(_0x5721bb,_0x4a059f){const _0x23403b=_0x16c5,_0x5bc179=_0x5721bb();while(!![]){try{const _0xd6b80e=-parseInt(_0x23403b(0x1a1))/0x1+-parseInt(_0x23403b(0x240))/0x2+parseInt(_0x23403b(0x21d))/0x3*(parseInt(_0x23403b(0x259))/0x4)+parseInt(_0x23403b(0x1e8))/0x5+parseInt(_0x23403b(0x198))/0x6+-parseInt(_0x23403b(0x159))/0x7*(parseInt(_0x23403b(0x1c1))/0x8)+parseInt(_0x23403b(0x1c4))/0x9*(-parseInt(_0x23403b(0x1b4))/0xa);if(_0xd6b80e===_0x4a059f)break;else _0x5bc179['push'](_0x5bc179['shift']());}catch(_0x5840a3){_0x5bc179['push'](_0x5bc179['shift']());}}}(_0x5dc3,0x37ec7));var label=_0x3e729f(0x171),tier=tier||0x0,dependencies=[_0x3e729f(0x296),_0x3e729f(0x1c6),_0x3e729f(0x210),_0x3e729f(0x1a2)],pluginData=$plugins[_0x3e729f(0x16d)](function(_0x3abc7b){const _0x4bed77=_0x3e729f;return _0x3abc7b[_0x4bed77(0x22c)]&&_0x3abc7b[_0x4bed77(0x20a)][_0x4bed77(0x221)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x3e729f(0x152)]||{},VisuMZ['ConvertParams']=function(_0x55b838,_0x310308){const _0x57de26=_0x3e729f;for(const _0x4c7452 in _0x310308){if(_0x4c7452[_0x57de26(0x1fd)](/(.*):(.*)/i)){const _0x5ecad8=String(RegExp['$1']),_0x10d406=String(RegExp['$2'])[_0x57de26(0x22d)]()['trim']();let _0x12ee25,_0x259f45,_0x583043;switch(_0x10d406){case _0x57de26(0x248):_0x12ee25=_0x310308[_0x4c7452]!==''?Number(_0x310308[_0x4c7452]):0x0;break;case _0x57de26(0x1f1):_0x259f45=_0x310308[_0x4c7452]!==''?JSON['parse'](_0x310308[_0x4c7452]):[],_0x12ee25=_0x259f45[_0x57de26(0x242)](_0x53c10d=>Number(_0x53c10d));break;case _0x57de26(0x150):_0x12ee25=_0x310308[_0x4c7452]!==''?eval(_0x310308[_0x4c7452]):null;break;case'ARRAYEVAL':_0x259f45=_0x310308[_0x4c7452]!==''?JSON[_0x57de26(0x166)](_0x310308[_0x4c7452]):[],_0x12ee25=_0x259f45[_0x57de26(0x242)](_0x4f8316=>eval(_0x4f8316));break;case'JSON':_0x12ee25=_0x310308[_0x4c7452]!==''?JSON['parse'](_0x310308[_0x4c7452]):'';break;case _0x57de26(0x22f):_0x259f45=_0x310308[_0x4c7452]!==''?JSON[_0x57de26(0x166)](_0x310308[_0x4c7452]):[],_0x12ee25=_0x259f45[_0x57de26(0x242)](_0x39e24c=>JSON[_0x57de26(0x166)](_0x39e24c));break;case _0x57de26(0x1f9):_0x12ee25=_0x310308[_0x4c7452]!==''?new Function(JSON[_0x57de26(0x166)](_0x310308[_0x4c7452])):new Function(_0x57de26(0x263));break;case'ARRAYFUNC':_0x259f45=_0x310308[_0x4c7452]!==''?JSON[_0x57de26(0x166)](_0x310308[_0x4c7452]):[],_0x12ee25=_0x259f45[_0x57de26(0x242)](_0x42d2a1=>new Function(JSON[_0x57de26(0x166)](_0x42d2a1)));break;case _0x57de26(0x189):_0x12ee25=_0x310308[_0x4c7452]!==''?String(_0x310308[_0x4c7452]):'';break;case _0x57de26(0x1ed):_0x259f45=_0x310308[_0x4c7452]!==''?JSON[_0x57de26(0x166)](_0x310308[_0x4c7452]):[],_0x12ee25=_0x259f45['map'](_0x1e59fc=>String(_0x1e59fc));break;case _0x57de26(0x25a):_0x583043=_0x310308[_0x4c7452]!==''?JSON['parse'](_0x310308[_0x4c7452]):{},_0x12ee25=VisuMZ['ConvertParams']({},_0x583043);break;case _0x57de26(0x18c):_0x259f45=_0x310308[_0x4c7452]!==''?JSON[_0x57de26(0x166)](_0x310308[_0x4c7452]):[],_0x12ee25=_0x259f45[_0x57de26(0x242)](_0x2e8c50=>VisuMZ[_0x57de26(0x21e)]({},JSON[_0x57de26(0x166)](_0x2e8c50)));break;default:continue;}_0x55b838[_0x5ecad8]=_0x12ee25;}}return _0x55b838;},(_0x56a12e=>{const _0x472f24=_0x3e729f,_0x263ecb=_0x56a12e[_0x472f24(0x203)];for(const _0x1802cd of dependencies){if(!Imported[_0x1802cd]){alert(_0x472f24(0x1f5)[_0x472f24(0x18b)](_0x263ecb,_0x1802cd)),SceneManager[_0x472f24(0x237)]();break;}}const _0x1da3d3=_0x56a12e[_0x472f24(0x20a)];if(_0x1da3d3[_0x472f24(0x1fd)](/\[Version[ ](.*?)\]/i)){const _0x7adb85=Number(RegExp['$1']);_0x7adb85!==VisuMZ[label]['version']&&(alert(_0x472f24(0x211)[_0x472f24(0x18b)](_0x263ecb,_0x7adb85)),SceneManager[_0x472f24(0x237)]());}if(_0x1da3d3[_0x472f24(0x1fd)](/\[Tier[ ](\d+)\]/i)){const _0x1f2bd4=Number(RegExp['$1']);_0x1f2bd4<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x472f24(0x18b)](_0x263ecb,_0x1f2bd4,tier)),SceneManager['exit']()):tier=Math[_0x472f24(0x1c5)](_0x1f2bd4,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x472f24(0x152)],_0x56a12e[_0x472f24(0x28e)]);})(pluginData),VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x1bf)]={'BoostDamage':/<(?:BP|BOOST) (?:DMG|DAMAGE)>/i,'BoostTurns':/<(?:BP|BOOST) (?:TURN|TURNS)>/i,'BoostRepeat':/<(?:BP|BOOST) (?:REPEAT|REPEATS|HIT|HITS)>/i,'BoostAnalyze':/<(?:BP|BOOST) (?:ANALYZE|ANALYSIS)>/i,'TargetBoostPoints':/<TARGET (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'UserBoostPoints':/<USER (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'BoostGainPoints':/<(?:BP|BOOST) (?:BP|BOOST POINT|BOOST POINTS|POINT|POINTS|EFFECT|EFFECTS) (?:EFFECT|GAIN|LOSS)>/i,'Require':{'Amount':/<REQUIRE (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'GreaterEqual':/<REQUIRE >= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Greater':/<REQUIRE > (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Equal':/<REQUIRE = (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Less':/<REQUIRE < (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'LessEqual':/<REQUIRE <= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i},'BoostSealed':/<(?:BP|BOOST) (?:SEAL|SEALED)>/i,'BoostBattleStartRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: (\d+)([%％])>/i,'BoostBattleStartFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: ([\+\-]\d+)>/i,'BoostPointsRegenRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: (\d+)([%％])>/i,'BoostPointsRegenFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: ([\+\-]\d+)>/i,'EnemyBoostSkillID':/<BOOST SKILL (\d+):[ ](.*)>/i,'EnemyBoostSkillName':/<BOOST (.*):[ ](.*)>/i},ImageManager['boostIcon']=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)]['UI']['BoostIcon'],ImageManager['unboostIcon']=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)]['UI'][_0x3e729f(0x28c)],ImageManager[_0x3e729f(0x18d)]=VisuMZ['BoostAction']['Settings']['UI'][_0x3e729f(0x20e)],ImageManager['boostIconsheetBitmap']=function(){const _0x30ff6b=_0x3e729f;if(!this[_0x30ff6b(0x223)]){this[_0x30ff6b(0x223)]=new Bitmap();const _0x563079=ImageManager[_0x30ff6b(0x22e)](_0x30ff6b(0x27d));_0x563079['addLoadListener'](this[_0x30ff6b(0x25b)][_0x30ff6b(0x1cd)](this,_0x563079));}return this[_0x30ff6b(0x223)];},ImageManager['boostTransferBitmap']=function(_0x3babaa){const _0x4f8f0c=_0x3e729f;this[_0x4f8f0c(0x223)][_0x4f8f0c(0x1ce)](_0x3babaa[_0x4f8f0c(0x1e0)],_0x3babaa['height']),this[_0x4f8f0c(0x223)][_0x4f8f0c(0x295)](_0x3babaa,0x0,0x0,_0x3babaa['width'],_0x3babaa['height'],0x0,0x0),this[_0x4f8f0c(0x223)][_0x4f8f0c(0x289)]=ImageManager[_0x4f8f0c(0x18d)],this[_0x4f8f0c(0x223)]['_customModified']=![];},TextManager[_0x3e729f(0x170)]=VisuMZ['BoostAction'][_0x3e729f(0x152)]['UI'][_0x3e729f(0x275)],TextManager[_0x3e729f(0x1e7)]=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)]['UI']['UnboostCmd'],VisuMZ['BoostAction'][_0x3e729f(0x26c)]=BattleManager[_0x3e729f(0x1e2)],BattleManager[_0x3e729f(0x1e2)]=function(_0x56b56f,_0xc43820,_0x4713ae){const _0x34a4df=_0x3e729f;VisuMZ[_0x34a4df(0x171)][_0x34a4df(0x26c)][_0x34a4df(0x23b)](this,_0x56b56f,_0xc43820,_0x4713ae),$gameParty['setupBattleBoostPoints'](),$gameTroop[_0x34a4df(0x1f4)]();},VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x19e)]=BattleManager[_0x3e729f(0x158)],BattleManager[_0x3e729f(0x158)]=function(){const _0xe8ec93=_0x3e729f;this[_0xe8ec93(0x19c)](),VisuMZ['BoostAction'][_0xe8ec93(0x19e)][_0xe8ec93(0x23b)](this);},BattleManager[_0x3e729f(0x19c)]=function(){const _0x1cedb9=_0x3e729f;var _0x50729a=this[_0x1cedb9(0x160)],_0x33d5fd=_0x50729a[_0x1cedb9(0x231)]();!!_0x50729a&&_0x50729a['isEnemy']()&&!!_0x33d5fd&&_0x33d5fd[_0x1cedb9(0x285)]()&&_0x50729a['storedBoostPoints']()>0x0&&!_0x50729a[_0x1cedb9(0x1ab)]()&&_0x50729a['processtoUseBoostPoints'](_0x33d5fd[_0x1cedb9(0x19d)]());},BattleManager[_0x3e729f(0x1a8)]=function(){const _0x227b43=_0x3e729f;if(Imported['VisuMZ_2_BattleSystemBTB']&&this[_0x227b43(0x17c)]())return![];return!![];},VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x27c)]=Game_Action[_0x3e729f(0x1d9)]['numRepeats'],Game_Action[_0x3e729f(0x1d9)][_0x3e729f(0x181)]=function(){const _0x2d95ce=_0x3e729f;var _0x32c119=VisuMZ['BoostAction'][_0x2d95ce(0x27c)][_0x2d95ce(0x23b)](this);_0x32c119=this['applyBoostPointRepeats'](_0x32c119);return Math[_0x2d95ce(0x15c)](_0x32c119);;},Game_Action[_0x3e729f(0x1d9)]['applyBoostPointRepeats']=function(_0x2f69dc){const _0x17c988=_0x3e729f,_0x13dd3d=VisuMZ['BoostAction'][_0x17c988(0x1bf)];if(!!this[_0x17c988(0x244)]()&&this[_0x17c988(0x19d)]()[_0x17c988(0x1fc)][_0x17c988(0x1fd)](_0x13dd3d[_0x17c988(0x191)])){var _0x2a299a=this[_0x17c988(0x244)]()['boostMultiplier'](_0x17c988(0x26b));_0x2f69dc=Math[_0x17c988(0x15c)](_0x2f69dc*_0x2a299a),_0x2f69dc+=this['subject']()['boostAddition']('Repeat');}return _0x2f69dc;},VisuMZ[_0x3e729f(0x171)]['Game_Action_applyGuard']=Game_Action['prototype'][_0x3e729f(0x1fb)],Game_Action[_0x3e729f(0x1d9)]['applyGuard']=function(_0x19971f,_0x4e0d75){const _0x2c1219=_0x3e729f;return _0x19971f=this[_0x2c1219(0x1dc)](_0x19971f),VisuMZ[_0x2c1219(0x171)]['Game_Action_applyGuard']['call'](this,_0x19971f,_0x4e0d75);},Game_Action['prototype'][_0x3e729f(0x1dc)]=function(_0x29c3e6){const _0x27745a=_0x3e729f,_0x17952c=VisuMZ[_0x27745a(0x171)]['RegExp'];if(!!this[_0x27745a(0x244)]()&&this[_0x27745a(0x19d)]()[_0x27745a(0x1fc)][_0x27745a(0x1fd)](_0x17952c[_0x27745a(0x265)])){var _0x1a3c67=this[_0x27745a(0x244)]()[_0x27745a(0x157)]('Damage');_0x29c3e6=Math[_0x27745a(0x15c)](_0x29c3e6*_0x1a3c67),_0x29c3e6+=this[_0x27745a(0x244)]()[_0x27745a(0x23c)](_0x27745a(0x274));}return _0x29c3e6;},VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x241)]=Game_Action[_0x3e729f(0x1d9)][_0x3e729f(0x16f)],Game_Action[_0x3e729f(0x1d9)][_0x3e729f(0x16f)]=function(_0x324655){const _0x2b9e7b=_0x3e729f;this[_0x2b9e7b(0x1c8)](![]),VisuMZ['BoostAction'][_0x2b9e7b(0x241)][_0x2b9e7b(0x23b)](this,_0x324655),this[_0x2b9e7b(0x1c8)](!![]);},Game_Action[_0x3e729f(0x1d9)][_0x3e729f(0x1c8)]=function(_0x1c66a6){const _0x1b24af=_0x3e729f,_0x26f64a=VisuMZ['BoostAction'][_0x1b24af(0x1bf)];if(!!this['subject']()&&this[_0x1b24af(0x19d)]()['note'][_0x1b24af(0x1fd)](_0x26f64a[_0x1b24af(0x199)])){var _0x4963ce=this[_0x1b24af(0x244)]()[_0x1b24af(0x157)]('Turn');$gameTemp['_bpTurnRate']=_0x4963ce,$gameTemp[_0x1b24af(0x186)]=this[_0x1b24af(0x244)]()['boostAddition'](_0x1b24af(0x1e4));}_0x1c66a6&&($gameTemp[_0x1b24af(0x232)]=undefined,$gameTemp['_bpTurnFlat']=undefined);},VisuMZ['BoostAction'][_0x3e729f(0x183)]=Game_Action[_0x3e729f(0x1d9)][_0x3e729f(0x1ef)],Game_Action[_0x3e729f(0x1d9)][_0x3e729f(0x1ef)]=function(_0x2309eb){const _0x4d63ae=_0x3e729f;VisuMZ[_0x4d63ae(0x171)][_0x4d63ae(0x183)][_0x4d63ae(0x23b)](this,_0x2309eb),this[_0x4d63ae(0x1ec)](_0x2309eb);},Game_Action[_0x3e729f(0x1d9)][_0x3e729f(0x1ec)]=function(_0x598c8d){const _0x4c22b6=_0x3e729f,_0x4630aa=VisuMZ[_0x4c22b6(0x171)][_0x4c22b6(0x1bf)];if(!!_0x598c8d&&this[_0x4c22b6(0x19d)]()[_0x4c22b6(0x1fc)][_0x4c22b6(0x1fd)](_0x4630aa[_0x4c22b6(0x21a)])){var _0x596a99=parseInt(RegExp['$1']);this[_0x4c22b6(0x19d)]()[_0x4c22b6(0x1fc)][_0x4c22b6(0x1fd)](_0x4630aa[_0x4c22b6(0x283)])&&(_0x596a99=Math['round'](this[_0x4c22b6(0x244)]()[_0x4c22b6(0x157)](_0x4c22b6(0x16e))*_0x596a99),_0x596a99+=this[_0x4c22b6(0x244)]()['boostAddition']('BP\x20Effect')),_0x598c8d['gainStoredBoostPoints'](_0x596a99);}if(!!this[_0x4c22b6(0x244)]()&&this[_0x4c22b6(0x19d)]()[_0x4c22b6(0x1fc)]['match'](_0x4630aa[_0x4c22b6(0x1a9)])){var _0x596a99=parseInt(RegExp['$1']);this[_0x4c22b6(0x19d)]()['note'][_0x4c22b6(0x1fd)](_0x4630aa[_0x4c22b6(0x283)])&&(_0x596a99=Math[_0x4c22b6(0x15c)](this[_0x4c22b6(0x244)]()[_0x4c22b6(0x157)](_0x4c22b6(0x16e))*_0x596a99),_0x596a99+=this[_0x4c22b6(0x244)]()['boostAddition']('BP\x20Effect')),this[_0x4c22b6(0x244)]()[_0x4c22b6(0x279)](_0x596a99);}},Game_BattlerBase['BOOST_POINTS_MAX_STORED']=VisuMZ['BoostAction'][_0x3e729f(0x152)][_0x3e729f(0x1f6)][_0x3e729f(0x185)],Game_BattlerBase[_0x3e729f(0x236)]=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)][_0x3e729f(0x1f6)][_0x3e729f(0x24c)],Game_BattlerBase[_0x3e729f(0x16b)]=VisuMZ[_0x3e729f(0x171)]['Settings'][_0x3e729f(0x1f6)]['DeathRegen'],Game_BattlerBase[_0x3e729f(0x256)]=VisuMZ['BoostAction']['Settings']['Mechanics'][_0x3e729f(0x269)],Game_BattlerBase[_0x3e729f(0x193)]=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)][_0x3e729f(0x1f6)]['AlwaysRegen'],Game_BattlerBase['BOOST_POINTS_TURN_REGEN']=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)][_0x3e729f(0x1f6)][_0x3e729f(0x1a5)],Game_BattlerBase['BOOST_POINTS_START_BATTLE']=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)]['Mechanics'][_0x3e729f(0x15d)],VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x192)]=Game_BattlerBase[_0x3e729f(0x1d9)][_0x3e729f(0x261)],Game_BattlerBase[_0x3e729f(0x1d9)][_0x3e729f(0x261)]=function(){const _0x541b47=_0x3e729f;VisuMZ[_0x541b47(0x171)]['Game_BattlerBase_initialize'][_0x541b47(0x23b)](this),this['initBoostAction']();},Game_BattlerBase['prototype'][_0x3e729f(0x212)]=function(){const _0x4f7303=_0x3e729f;this[_0x4f7303(0x1d4)]=this[_0x4f7303(0x1d4)]||0x0,this['_toUseBoostPoints']=this[_0x4f7303(0x249)]||0x0,this['_turnUsedBoostPoints']=this['_turnUsedBoostPoints']||0x0;},Game_BattlerBase[_0x3e729f(0x1d9)][_0x3e729f(0x235)]=function(){const _0x5c5c8a=_0x3e729f;return this['_storedBoostPoints']===undefined&&this[_0x5c5c8a(0x212)](),this[_0x5c5c8a(0x1d4)];},Game_BattlerBase[_0x3e729f(0x1d9)][_0x3e729f(0x1c2)]=function(_0x3557d1){const _0x48b034=_0x3e729f;this[_0x48b034(0x1d4)]===undefined&&this[_0x48b034(0x212)](),_0x3557d1=Math['round'](_0x3557d1),this['_storedBoostPoints']=_0x3557d1[_0x48b034(0x273)](0x0,Game_BattlerBase[_0x48b034(0x271)]),this['refresh']();},Game_BattlerBase['prototype'][_0x3e729f(0x254)]=function(){const _0xfb9440=_0x3e729f;return this[_0xfb9440(0x249)]===undefined&&this['initBoostAction'](),this[_0xfb9440(0x249)];},Game_BattlerBase[_0x3e729f(0x1d9)]['setToUseBoostPoints']=function(_0x1617a5){const _0x346a23=_0x3e729f;this[_0x346a23(0x249)]===undefined&&this[_0x346a23(0x212)](),_0x1617a5=Math['round'](_0x1617a5),this['_toUseBoostPoints']=_0x1617a5[_0x346a23(0x273)](0x0,Game_BattlerBase[_0x346a23(0x236)]),this['refresh']();},Game_BattlerBase[_0x3e729f(0x1d9)][_0x3e729f(0x26e)]=function(){const _0xc2b577=_0x3e729f;if(!Game_BattlerBase[_0xc2b577(0x16b)]&&(this['isDead']()||this[_0xc2b577(0x284)]()))return 0x0;else{var _0x420dfd=Game_BattlerBase[_0xc2b577(0x214)];return _0x420dfd=this[_0xc2b577(0x179)](_0x420dfd),_0x420dfd=this['bpRegenAdded'](_0x420dfd),_0x420dfd;}},Game_BattlerBase[_0x3e729f(0x1d9)]['isBoostSealed']=function(){const _0x51a945=_0x3e729f,_0x519120=this[_0x51a945(0x1aa)](),_0x5e0942=VisuMZ[_0x51a945(0x171)][_0x51a945(0x1bf)];return _0x519120[_0x51a945(0x1b7)](_0x50c6b6=>_0x50c6b6&&_0x50c6b6['note'][_0x51a945(0x1fd)](_0x5e0942[_0x51a945(0x280)]));},VisuMZ['BoostAction'][_0x3e729f(0x195)]=Game_BattlerBase[_0x3e729f(0x1d9)]['resetStateCounts'],Game_BattlerBase['prototype'][_0x3e729f(0x1ba)]=function(_0x5264a7){const _0x442d0f=_0x3e729f;var _0x5c4586=this['_stateTurns'][_0x5264a7]||0x0;VisuMZ['BoostAction'][_0x442d0f(0x195)][_0x442d0f(0x23b)](this,_0x5264a7);if(!!$gameTemp[_0x442d0f(0x232)]){$gameTemp[_0x442d0f(0x186)]=$gameTemp['_bpTurnFlat']||0x0;var _0x5c949f=$dataStates[_0x5264a7],_0x13ebc=Math['round'](_0x5c949f[_0x442d0f(0x1d5)]*$gameTemp[_0x442d0f(0x232)])+$gameTemp[_0x442d0f(0x186)],_0x439f16=Math[_0x442d0f(0x15c)](_0x5c949f[_0x442d0f(0x1ee)]*$gameTemp['_bpTurnRate'])+$gameTemp[_0x442d0f(0x186)],_0x424492=0x1+Math[_0x442d0f(0x1c5)](_0x13ebc-_0x439f16,0x0);const _0x1e7089=this[_0x442d0f(0x25e)](_0x5c949f)[_0x442d0f(0x22a)]()[_0x442d0f(0x257)]();switch(_0x1e7089){case _0x442d0f(0x200):this[_0x442d0f(0x28f)][_0x5264a7]=_0x439f16+Math['randomInt'](_0x424492);break;case _0x442d0f(0x24f):const _0x23b647=this[_0x442d0f(0x28f)][_0x5264a7],_0x6b931c=_0x439f16+Math[_0x442d0f(0x19a)](_0x424492);this[_0x442d0f(0x28f)][_0x5264a7]=Math['max'](_0x23b647,_0x6b931c);break;case _0x442d0f(0x278):this[_0x442d0f(0x28f)][_0x5264a7]=_0x439f16+Math['randomInt'](_0x424492)+_0x5c4586;break;}}},VisuMZ['BoostAction'][_0x3e729f(0x1a3)]=Game_BattlerBase[_0x3e729f(0x1d9)]['meetsUsableItemConditions'],Game_BattlerBase[_0x3e729f(0x1d9)][_0x3e729f(0x197)]=function(_0x3f59c5){const _0x37ec09=_0x3e729f;return VisuMZ['BoostAction'][_0x37ec09(0x1a3)][_0x37ec09(0x23b)](this,_0x3f59c5)?this['meetstoUseBoostPointsRequirement'](_0x3f59c5):![];},Game_BattlerBase[_0x3e729f(0x1d9)][_0x3e729f(0x28b)]=function(_0x1bad04){const _0x50b0f9=_0x3e729f,_0x126906=VisuMZ['BoostAction']['RegExp'];var _0x578b02=_0x1bad04[_0x50b0f9(0x1fc)];if(_0x578b02[_0x50b0f9(0x1fd)](_0x126906[_0x50b0f9(0x1c9)][_0x50b0f9(0x15e)])||_0x578b02[_0x50b0f9(0x1fd)](_0x126906[_0x50b0f9(0x1c9)][_0x50b0f9(0x173)])){var _0x24c615=parseInt(RegExp['$1']);return this[_0x50b0f9(0x1c3)]()?this['toUseBoostPoints']()>=_0x24c615:this[_0x50b0f9(0x235)]()>=_0x24c615;}else{if(_0x1bad04[_0x50b0f9(0x1fc)][_0x50b0f9(0x1fd)](_0x126906[_0x50b0f9(0x1c9)][_0x50b0f9(0x173)])){var _0x24c615=parseInt(RegExp['$1']);return this['isActor']()?this['toUseBoostPoints']()>_0x24c615:this[_0x50b0f9(0x235)]()>_0x24c615;}else{if(_0x1bad04[_0x50b0f9(0x1fc)][_0x50b0f9(0x1fd)](_0x126906[_0x50b0f9(0x1c9)][_0x50b0f9(0x177)])){var _0x24c615=parseInt(RegExp['$1']);return this[_0x50b0f9(0x1c3)]()?this[_0x50b0f9(0x254)]()===_0x24c615:this[_0x50b0f9(0x235)]()===_0x24c615;}else{if(_0x1bad04['note'][_0x50b0f9(0x1fd)](_0x126906[_0x50b0f9(0x1c9)][_0x50b0f9(0x206)])){var _0x24c615=parseInt(RegExp['$1']);return this[_0x50b0f9(0x1c3)]()?this[_0x50b0f9(0x254)]()<_0x24c615:this[_0x50b0f9(0x235)]()<_0x24c615;}else{if(_0x1bad04[_0x50b0f9(0x1fc)][_0x50b0f9(0x1fd)](_0x126906['Require'][_0x50b0f9(0x1d0)])){var _0x24c615=parseInt(RegExp['$1']);return this[_0x50b0f9(0x1c3)]()?this[_0x50b0f9(0x254)]()<=_0x24c615:this['storedBoostPoints']()<=_0x24c615;}else return!![];}}}}},Game_Battler[_0x3e729f(0x169)]={'Damage':VisuMZ['BoostAction'][_0x3e729f(0x152)][_0x3e729f(0x1f6)][_0x3e729f(0x1d3)],'Turn':VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)]['Mechanics'][_0x3e729f(0x229)],'Repeat':VisuMZ['BoostAction'][_0x3e729f(0x152)][_0x3e729f(0x1f6)]['RepeatMultiply'],'BpEffect':VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)][_0x3e729f(0x1f6)][_0x3e729f(0x151)],'Analyze':VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)][_0x3e729f(0x1f6)]['AnalyzeMultiply']},Game_Battler[_0x3e729f(0x22b)]={'Damage':VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)][_0x3e729f(0x1f6)][_0x3e729f(0x209)],'Turn':VisuMZ['BoostAction']['Settings']['Mechanics']['TurnAddition'],'Repeat':VisuMZ['BoostAction'][_0x3e729f(0x152)][_0x3e729f(0x1f6)][_0x3e729f(0x1d8)],'BpEffect':VisuMZ[_0x3e729f(0x171)]['Settings']['Mechanics']['EffectAddition'],'Analyze':VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)][_0x3e729f(0x1f6)][_0x3e729f(0x204)]},Game_Battler[_0x3e729f(0x253)]=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)][_0x3e729f(0x1f6)][_0x3e729f(0x196)],Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x279)]=function(_0x2d1764){const _0x5174bf=_0x3e729f;this[_0x5174bf(0x1c2)](this['storedBoostPoints']()+_0x2d1764);},Game_Battler['prototype'][_0x3e729f(0x26d)]=function(_0x5f24b7){const _0x6c31bb=_0x3e729f;this[_0x6c31bb(0x243)](this[_0x6c31bb(0x254)]()+_0x5f24b7);},Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x157)]=function(_0x166595){const _0x41ff32=_0x3e729f,_0x122ecf=Game_Battler[_0x41ff32(0x169)];if(_0x166595['match'](/Damage/i))var _0x247f4b=_0x122ecf['Damage'];else{if(_0x166595['match'](/Turn/i))var _0x247f4b=_0x122ecf['Turn'];else{if(_0x166595['match'](/Repeat/i))var _0x247f4b=_0x122ecf[_0x41ff32(0x26b)];else{if(_0x166595[_0x41ff32(0x1fd)](/BP Effect/i))var _0x247f4b=_0x122ecf[_0x41ff32(0x19b)];else{if(_0x166595[_0x41ff32(0x1fd)](/Analyze/i))var _0x247f4b=_0x122ecf[_0x41ff32(0x230)];else return this[_0x41ff32(0x254)]();}}}}var _0xff4c1b=this[_0x41ff32(0x254)]();return _0x247f4b[_0xff4c1b]||_0x247f4b[0x0];},Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x23c)]=function(_0x433ae1){const _0x24d632=_0x3e729f,_0x4ab210=Game_Battler[_0x24d632(0x22b)];if(_0x433ae1[_0x24d632(0x1fd)](/Damage/i))var _0x554c27=_0x4ab210[_0x24d632(0x274)];else{if(_0x433ae1[_0x24d632(0x1fd)](/Turn/i))var _0x554c27=_0x4ab210[_0x24d632(0x1e4)];else{if(_0x433ae1['match'](/Repeat/i))var _0x554c27=_0x4ab210[_0x24d632(0x26b)];else{if(_0x433ae1[_0x24d632(0x1fd)](/BP Effect/i))var _0x554c27=_0x4ab210[_0x24d632(0x19b)];else{if(_0x433ae1[_0x24d632(0x1fd)](/Analyze/i))var _0x554c27=_0x4ab210[_0x24d632(0x230)];else return this[_0x24d632(0x254)]();}}}}var _0x3e4788=this[_0x24d632(0x254)]();return parseInt(_0x554c27[_0x3e4788]||_0x554c27[0x0]);},Game_Battler[_0x3e729f(0x1d9)]['setupBattleBoostPoints']=function(){const _0x2f25fc=_0x3e729f;var _0x18297b=Game_BattlerBase['BOOST_POINTS_START_BATTLE'];_0x18297b=this[_0x2f25fc(0x15b)](_0x18297b),_0x18297b=this[_0x2f25fc(0x194)](_0x18297b),_0x18297b=Math['round'](_0x18297b),this[_0x2f25fc(0x1c2)](_0x18297b);},Game_Battler['prototype'][_0x3e729f(0x15b)]=function(_0x3a6a0c){const _0x509666=_0x3e729f,_0x4a75e3=this[_0x509666(0x1aa)](),_0x433ad3=VisuMZ[_0x509666(0x171)][_0x509666(0x1bf)];for(const _0x1b2350 of _0x4a75e3){if(!_0x1b2350)continue;_0x1b2350['note'][_0x509666(0x1fd)](_0x433ad3[_0x509666(0x1e9)])&&(_0x3a6a0c*=Number(RegExp['$1'])*0.01);}return _0x3a6a0c;},Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x194)]=function(_0x48c0cf){const _0x5029aa=_0x3e729f,_0xc79b0b=this['traitObjects'](),_0x189075=VisuMZ[_0x5029aa(0x171)][_0x5029aa(0x1bf)];for(const _0x51c10f of _0xc79b0b){if(!_0x51c10f)continue;_0x51c10f[_0x5029aa(0x1fc)]['match'](_0x189075[_0x5029aa(0x187)])&&(_0x48c0cf+=Number(RegExp['$1']));}return _0x48c0cf;},Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x16a)]=function(){const _0x36325a=_0x3e729f;var _0x92f780=this[_0x36325a(0x254)]()[_0x36325a(0x273)](0x0,Game_BattlerBase[_0x36325a(0x236)]);const _0x421c07=Game_Battler['BOOST_POINTS_ANIMATIONS'];var _0x2b894b=Number(_0x421c07[_0x92f780]||_0x421c07[0x0]);_0x2b894b>0x0&&$gameTemp[_0x36325a(0x1eb)]([this],_0x2b894b,![],![]);},Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x24e)]=function(){const _0xb1c2c8=_0x3e729f;if(this['isBoostSealed']())return![];return this[_0xb1c2c8(0x254)]()<Game_BattlerBase[_0xb1c2c8(0x236)]&&this[_0xb1c2c8(0x235)]()>0x0;},Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x1e1)]=function(){const _0x3fcbaa=_0x3e729f;return this[_0x3fcbaa(0x254)]()>0x0;},VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x17e)]=Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x1f7)],Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x1f7)]=function(){const _0x584724=_0x3e729f;VisuMZ['BoostAction'][_0x584724(0x17e)][_0x584724(0x23b)](this),this['_storedBoostPoints']=0x0,this[_0x584724(0x249)]=0x0;},VisuMZ['BoostAction']['Game_Battler_regenerateTp']=Game_Battler[_0x3e729f(0x1d9)]['regenerateTp'],Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x247)]=function(){const _0x4867a3=_0x3e729f;VisuMZ['BoostAction'][_0x4867a3(0x290)]['call'](this),this[_0x4867a3(0x28a)]();},VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x188)]=Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x1fa)],Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x1fa)]=function(){const _0x1178f4=_0x3e729f;VisuMZ[_0x1178f4(0x171)][_0x1178f4(0x188)][_0x1178f4(0x23b)](this),Game_BattlerBase[_0x1178f4(0x16b)]&&this[_0x1178f4(0x205)]()&&$gameParty[_0x1178f4(0x1b0)]()&&this[_0x1178f4(0x28a)]();},Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x28a)]=function(){const _0x527b1c=_0x3e729f;(Game_BattlerBase['BOOST_POINTS_REGEN_ALWAYS']||this[_0x527b1c(0x21f)]<=0x0)&&this[_0x527b1c(0x279)](this[_0x527b1c(0x26e)]()),this[_0x527b1c(0x21f)]=0x0;},VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x234)]=BattleManager[_0x3e729f(0x220)],BattleManager[_0x3e729f(0x220)]=function(){const _0x39bb54=_0x3e729f;this['_subject']&&this['_subject'][_0x39bb54(0x1fe)](),VisuMZ['BoostAction'][_0x39bb54(0x234)][_0x39bb54(0x23b)](this);},Game_Battler[_0x3e729f(0x1d9)]['endActionBoostPoints']=function(){const _0xcfc399=_0x3e729f;this['_turnUsedBoostPoints']+=this[_0xcfc399(0x254)](),this[_0xcfc399(0x243)](0x0);},Game_Battler['prototype']['bpRegenMultipliers']=function(_0x1cd439){const _0x3ebc3e=_0x3e729f,_0x23a083=this[_0x3ebc3e(0x1aa)](),_0x38a5ab=VisuMZ['BoostAction'][_0x3ebc3e(0x1bf)];for(const _0xbbcfb of _0x23a083){if(!_0xbbcfb)continue;_0xbbcfb[_0x3ebc3e(0x1fc)]['match'](_0x38a5ab[_0x3ebc3e(0x20b)])&&(_0x1cd439*=Number(RegExp['$1'])*0.01);}return _0x1cd439;},Game_Battler['prototype'][_0x3e729f(0x161)]=function(_0x5dad9c){const _0x1180da=_0x3e729f,_0x587cd4=this[_0x1180da(0x1aa)](),_0xea550=VisuMZ['BoostAction'][_0x1180da(0x1bf)];for(const _0x517d70 of _0x587cd4){if(!_0x517d70)continue;_0x517d70[_0x1180da(0x1fc)][_0x1180da(0x1fd)](_0xea550[_0x1180da(0x17d)])&&(_0x5dad9c+=Number(RegExp['$1']));}return _0x5dad9c;},VisuMZ[_0x3e729f(0x171)]['Game_Battler_addState']=Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x224)],Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x224)]=function(_0x325913){const _0x4c6308=_0x3e729f;var _0x237904=this[_0x4c6308(0x205)]();VisuMZ[_0x4c6308(0x171)][_0x4c6308(0x18e)][_0x4c6308(0x23b)](this,_0x325913),Game_BattlerBase[_0x4c6308(0x256)]&&!_0x237904&&this[_0x4c6308(0x205)]()&&this[_0x4c6308(0x1c2)](0x0);},VisuMZ[_0x3e729f(0x171)]['Game_Battler_addBuff']=Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x1b2)],Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x1b2)]=function(_0x3c78c5,_0x1d14f3){const _0x1f4a2b=_0x3e729f;!!$gameTemp[_0x1f4a2b(0x232)]&&($gameTemp['_bpTurnFlat']=$gameTemp[_0x1f4a2b(0x186)]||0x0,_0x1d14f3=Math[_0x1f4a2b(0x15c)]($gameTemp[_0x1f4a2b(0x232)]*_0x1d14f3)+$gameTemp[_0x1f4a2b(0x186)]),VisuMZ['BoostAction'][_0x1f4a2b(0x250)][_0x1f4a2b(0x23b)](this,_0x3c78c5,_0x1d14f3);},VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x175)]=Game_Battler['prototype']['addDebuff'],Game_Battler[_0x3e729f(0x1d9)][_0x3e729f(0x1a0)]=function(_0x388e67,_0x20a2d2){const _0x46e298=_0x3e729f;!!$gameTemp[_0x46e298(0x232)]&&($gameTemp[_0x46e298(0x186)]=$gameTemp[_0x46e298(0x186)]||0x0,_0x20a2d2=Math[_0x46e298(0x15c)]($gameTemp[_0x46e298(0x232)]*_0x20a2d2)+$gameTemp[_0x46e298(0x186)]),VisuMZ['BoostAction'][_0x46e298(0x175)]['call'](this,_0x388e67,_0x20a2d2);},Game_Enemy['BOOST_POINTS_ANIMATION_DELAY']=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)][_0x3e729f(0x1f6)][_0x3e729f(0x153)],VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x219)]=Game_Enemy[_0x3e729f(0x1d9)][_0x3e729f(0x1e2)],Game_Enemy[_0x3e729f(0x1d9)][_0x3e729f(0x1e2)]=function(_0x455c1e,_0x26ab3b,_0x12237c){const _0x2fbe19=_0x3e729f;VisuMZ[_0x2fbe19(0x171)][_0x2fbe19(0x219)][_0x2fbe19(0x23b)](this,_0x455c1e,_0x26ab3b,_0x12237c),this[_0x2fbe19(0x163)]();},Game_Enemy[_0x3e729f(0x1d9)][_0x3e729f(0x163)]=function(){const _0x57295d=_0x3e729f,_0x37f9bd=VisuMZ['BoostAction'][_0x57295d(0x1bf)];if(this[_0x57295d(0x238)]()[_0x57295d(0x1bb)]===undefined){this[_0x57295d(0x238)]()[_0x57295d(0x1bb)]={};var _0x53998a=this[_0x57295d(0x238)]()[_0x57295d(0x1fc)][_0x57295d(0x264)](/[\r\n]+/);for(var _0x7832d7=0x0;_0x7832d7<_0x53998a['length'];_0x7832d7++){var _0x522b0b=_0x53998a[_0x7832d7];if(_0x522b0b[_0x57295d(0x1fd)](_0x37f9bd[_0x57295d(0x262)])){var _0x390177=_0x57295d(0x225)+parseInt(RegExp['$1']),_0x12795a=String(RegExp['$2'])[_0x57295d(0x22a)]();this[_0x57295d(0x238)]()[_0x57295d(0x1bb)][_0x390177]=_0x12795a;}else{if(_0x522b0b[_0x57295d(0x1fd)](_0x37f9bd[_0x57295d(0x27e)])){var _0x1f9325=String(RegExp['$1']),_0x12795a=String(RegExp['$2'])['toLowerCase']();this[_0x57295d(0x238)]()[_0x57295d(0x1bb)][_0x1f9325]=_0x12795a;}}}}},Game_Enemy[_0x3e729f(0x1d9)][_0x3e729f(0x18a)]=function(_0x440784){const _0x3081ae=_0x3e729f;this[_0x3081ae(0x163)]();var _0x191bc3=this[_0x3081ae(0x1c7)](_0x440784);_0x191bc3>0x0&&(this[_0x3081ae(0x1a6)](_0x191bc3),this[_0x3081ae(0x16a)]());},Game_Enemy['prototype']['calculateBPtoUse']=function(_0x5afa15){const _0x20c4aa=_0x3e729f;if(this[_0x20c4aa(0x235)]()<=0x0)return 0x0;var _0x5b9a93=_0x5afa15[_0x20c4aa(0x203)],_0x3078e1=_0x20c4aa(0x225)+_0x5afa15['id'],_0x23074c=0x0;if(this[_0x20c4aa(0x238)]()['_boostAI'][_0x5b9a93]||this[_0x20c4aa(0x238)]()[_0x20c4aa(0x1bb)][_0x3078e1]){var _0x5a74c8=this['enemy']()[_0x20c4aa(0x1bb)][_0x5b9a93]||this[_0x20c4aa(0x238)]()[_0x20c4aa(0x1bb)][_0x3078e1];if(_0x5a74c8['match'](/(?:ALL|FULL)/i))_0x23074c=this[_0x20c4aa(0x235)]();else{if(_0x5a74c8[_0x20c4aa(0x1fd)](/AT LEAST (\d+)/i)){var _0x1de2b0=parseInt(RegExp['$1']);this['storedBoostPoints']()>=_0x1de2b0&&(_0x23074c=this[_0x20c4aa(0x235)]());}else{if(_0x5a74c8[_0x20c4aa(0x1fd)](/AT MOST (\d+)/i)){var _0x1de2b0=parseInt(RegExp['$1']);this[_0x20c4aa(0x235)]()<=_0x1de2b0&&(_0x23074c=this[_0x20c4aa(0x235)]());}else{if(_0x5a74c8[_0x20c4aa(0x1fd)](/EXACTLY (\d+)/i)){var _0x1de2b0=parseInt(RegExp['$1']);this[_0x20c4aa(0x235)]()===_0x1de2b0&&(_0x23074c=_0x1de2b0);}}}}}return _0x23074c[_0x20c4aa(0x273)](0x0,Game_BattlerBase[_0x20c4aa(0x236)]);},Game_Enemy['prototype'][_0x3e729f(0x1a6)]=function(_0x5ec9e9){const _0x15f2c3=_0x3e729f;_0x5ec9e9=_0x5ec9e9['clamp'](0x0,this['storedBoostPoints']()),_0x5ec9e9=_0x5ec9e9[_0x15f2c3(0x273)](0x0,Game_BattlerBase[_0x15f2c3(0x236)]),this[_0x15f2c3(0x279)](-_0x5ec9e9),this[_0x15f2c3(0x26d)](_0x5ec9e9);},Game_Enemy[_0x3e729f(0x1d9)][_0x3e729f(0x16a)]=function(){const _0x293ed7=_0x3e729f;var _0x10c9a5=0x0,_0xc2b4a=this['toUseBoostPoints']()['clamp'](0x0,Game_BattlerBase[_0x293ed7(0x236)]);const _0x128921=Game_Battler[_0x293ed7(0x253)],_0x27623b=Game_Enemy['BOOST_POINTS_ANIMATION_DELAY'],_0x5f461b=0x3e8/0x3c;for(var _0xf0ac8d=0x1;_0xf0ac8d<=_0xc2b4a;_0xf0ac8d++){var _0x2d48a9=_0x128921[_0xf0ac8d]||_0x128921[0x0];if(_0x2d48a9>0x0){let _0x27ca3c=_0x27623b*(_0xf0ac8d-0x1);setTimeout($gameTemp[_0x293ed7(0x1eb)][_0x293ed7(0x1cd)]($gameTemp,[this],_0x2d48a9,![],![]),_0x27ca3c);}_0x10c9a5+=_0x27623b/_0x5f461b;}_0x10c9a5=Math['ceil'](_0x10c9a5),SceneManager[_0x293ed7(0x23d)][_0x293ed7(0x245)][_0x293ed7(0x24d)]=_0x10c9a5;},Game_Unit[_0x3e729f(0x1d9)][_0x3e729f(0x1f4)]=function(){const _0x292dca=_0x3e729f;var _0x57fd8b=this['_inBattle'];this[_0x292dca(0x288)]=![];for(const _0x211c0b of this[_0x292dca(0x286)]()){if(!_0x211c0b)continue;_0x211c0b['setupBattleBoostPoints']();}this[_0x292dca(0x288)]=_0x57fd8b;},VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x1f8)]=Game_Party[_0x3e729f(0x1d9)][_0x3e729f(0x1a7)],Game_Party['prototype'][_0x3e729f(0x1a7)]=function(_0x36e929){const _0x4e91b4=_0x3e729f;VisuMZ[_0x4e91b4(0x171)]['Game_Party_addActor'][_0x4e91b4(0x23b)](this,_0x36e929),setTimeout(VisuMZ['BoostAction']['RefreshHelpWindowInBattle']['bind'](this),0x32);},VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x20d)]=Game_Party[_0x3e729f(0x1d9)][_0x3e729f(0x1ad)],Game_Party[_0x3e729f(0x1d9)][_0x3e729f(0x1ad)]=function(_0xe5834f){const _0x3ccd4a=_0x3e729f;VisuMZ[_0x3ccd4a(0x171)][_0x3ccd4a(0x20d)][_0x3ccd4a(0x23b)](this,_0xe5834f),setTimeout(VisuMZ[_0x3ccd4a(0x171)][_0x3ccd4a(0x217)][_0x3ccd4a(0x1cd)](this),0x32);},VisuMZ['BoostAction']['Game_Party_partyChangeRefresh']=Game_Party[_0x3e729f(0x1d9)][_0x3e729f(0x168)],Game_Party['prototype'][_0x3e729f(0x168)]=function(){const _0x36701f=_0x3e729f;VisuMZ[_0x36701f(0x171)][_0x36701f(0x165)]['call'](this),setTimeout(VisuMZ['BoostAction'][_0x36701f(0x217)][_0x36701f(0x1cd)](this),0x32);},VisuMZ[_0x3e729f(0x171)]['RefreshHelpWindowInBattle']=function(){const _0x4cd989=_0x3e729f;if(!SceneManager['isSceneBattle']())return;const _0x361ede=SceneManager['_scene']['_helpWindow'];if(!_0x361ede)return;_0x361ede[_0x4cd989(0x25f)](BattleManager[_0x4cd989(0x1ea)]()),_0x361ede[_0x4cd989(0x24a)]();},VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x156)]=Scene_Battle['prototype'][_0x3e729f(0x1b8)],Scene_Battle[_0x3e729f(0x1d9)][_0x3e729f(0x1b8)]=function(){const _0x42eec7=_0x3e729f;VisuMZ[_0x42eec7(0x171)][_0x42eec7(0x156)][_0x42eec7(0x23b)](this),this[_0x42eec7(0x182)][_0x42eec7(0x213)](_0x42eec7(0x18f),this[_0x42eec7(0x1e5)][_0x42eec7(0x1cd)](this)),this['_actorCommandWindow'][_0x42eec7(0x213)](_0x42eec7(0x208),this['commandUnboost'][_0x42eec7(0x1cd)](this));},Scene_Battle[_0x3e729f(0x1d9)][_0x3e729f(0x1e5)]=function(_0x8abaf6){const _0x258978=_0x3e729f;BattleManager[_0x258978(0x1ea)]()[_0x258978(0x279)](-0x1),BattleManager[_0x258978(0x1ea)]()['gainToUseBoostPoints'](0x1),BattleManager['actor']()['startChangeBoostPointsAnimation'](),this['_helpWindow'][_0x258978(0x24a)](),!_0x8abaf6&&this[_0x258978(0x182)]['activate'](),this[_0x258978(0x182)][_0x258978(0x24a)]();},Scene_Battle[_0x3e729f(0x1d9)][_0x3e729f(0x1dd)]=function(_0x4f1bfb){const _0x44dd63=_0x3e729f;BattleManager[_0x44dd63(0x1ea)]()[_0x44dd63(0x26d)](-0x1),BattleManager[_0x44dd63(0x1ea)]()[_0x44dd63(0x279)](0x1),BattleManager['actor']()[_0x44dd63(0x16a)](),this[_0x44dd63(0x21b)][_0x44dd63(0x24a)](),!_0x4f1bfb&&this[_0x44dd63(0x182)]['activate'](),this['_actorCommandWindow']['refresh']();},VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x154)]=Scene_Battle[_0x3e729f(0x1d9)][_0x3e729f(0x293)],Scene_Battle[_0x3e729f(0x1d9)]['selectNextCommand']=function(){const _0x553904=_0x3e729f;this[_0x553904(0x21b)]&&this[_0x553904(0x21b)][_0x553904(0x178)](),VisuMZ[_0x553904(0x171)][_0x553904(0x154)]['call'](this);},VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x226)]=Scene_Battle[_0x3e729f(0x1d9)][_0x3e729f(0x180)],Scene_Battle[_0x3e729f(0x1d9)][_0x3e729f(0x180)]=function(){const _0x19f15b=_0x3e729f;VisuMZ[_0x19f15b(0x171)][_0x19f15b(0x226)][_0x19f15b(0x23b)](this),this[_0x19f15b(0x21b)]&&this['_helpWindow'][_0x19f15b(0x25f)](BattleManager[_0x19f15b(0x1ea)]());};function Sprite_BoostContainer(){const _0x238ec1=_0x3e729f;this[_0x238ec1(0x261)](...arguments);}Sprite_BoostContainer[_0x3e729f(0x1d9)]=Object[_0x3e729f(0x1b5)](Sprite[_0x3e729f(0x1d9)]),Sprite_BoostContainer[_0x3e729f(0x1d9)][_0x3e729f(0x1e6)]=Sprite_BoostContainer,Sprite_BoostContainer[_0x3e729f(0x172)]=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)]['UI'][_0x3e729f(0x184)],Sprite_BoostContainer[_0x3e729f(0x1d9)][_0x3e729f(0x261)]=function(){const _0x13d44c=_0x3e729f;Sprite[_0x13d44c(0x1d9)][_0x13d44c(0x261)][_0x13d44c(0x23b)](this),this['initMembers'](),this[_0x13d44c(0x1cf)]();},Sprite_BoostContainer[_0x3e729f(0x1d9)][_0x3e729f(0x24b)]=function(){const _0x1e3314=_0x3e729f;this[_0x1e3314(0x1ca)]['x']=Sprite_BoostContainer[_0x1e3314(0x172)],this[_0x1e3314(0x1ca)]['y']=Sprite_BoostContainer['ICON_SIZE_RATE'];},Sprite_BoostContainer[_0x3e729f(0x1d9)]['createChildSprites']=function(){const _0x2af30d=_0x3e729f;this[_0x2af30d(0x282)]=[];for(let _0x1d142d=0x1;_0x1d142d<=Game_BattlerBase[_0x2af30d(0x271)];_0x1d142d++){const _0x5f0f59=new Sprite_BoostIcon(_0x1d142d);this[_0x2af30d(0x155)](_0x5f0f59),this['_icons'][_0x2af30d(0x176)](_0x5f0f59);}},Sprite_BoostContainer['prototype'][_0x3e729f(0x1e2)]=function(_0x3564ac){const _0x4ff59a=_0x3e729f;if(!this[_0x4ff59a(0x282)])return;for(const _0x15aba4 of this[_0x4ff59a(0x282)]){_0x15aba4[_0x4ff59a(0x1e2)](_0x3564ac);}};function Sprite_BoostIcon(){const _0x42f483=_0x3e729f;this[_0x42f483(0x261)](...arguments);}function _0x16c5(_0x1d2cc7,_0x177874){const _0x5dc3f6=_0x5dc3();return _0x16c5=function(_0x16c566,_0x3246b7){_0x16c566=_0x16c566-0x150;let _0x402638=_0x5dc3f6[_0x16c566];return _0x402638;},_0x16c5(_0x1d2cc7,_0x177874);}Sprite_BoostIcon[_0x3e729f(0x1d9)]=Object[_0x3e729f(0x1b5)](Sprite[_0x3e729f(0x1d9)]),Sprite_BoostIcon[_0x3e729f(0x1d9)][_0x3e729f(0x1e6)]=Sprite_BoostIcon,Sprite_BoostIcon['prototype']['initialize']=function(_0xbabdbd){const _0x43d0d0=_0x3e729f;this['_slot']=_0xbabdbd,Sprite[_0x43d0d0(0x1d9)][_0x43d0d0(0x261)][_0x43d0d0(0x23b)](this),this[_0x43d0d0(0x24b)](),this[_0x43d0d0(0x277)]();},Sprite_BoostIcon[_0x3e729f(0x1d9)][_0x3e729f(0x24b)]=function(){const _0x3312a2=_0x3e729f;this[_0x3312a2(0x1e3)]=ImageManager[_0x3312a2(0x15a)],this['x']=ImageManager[_0x3312a2(0x268)]*(this[_0x3312a2(0x15f)]-0x1);},Sprite_BoostIcon[_0x3e729f(0x1d9)][_0x3e729f(0x277)]=function(){const _0xa4cd43=_0x3e729f;this[_0xa4cd43(0x1be)]=ImageManager[_0xa4cd43(0x1de)](),this[_0xa4cd43(0x20f)](0x0,0x0,0x0,0x0);},Sprite_BoostIcon[_0x3e729f(0x1d9)][_0x3e729f(0x1e2)]=function(_0x2135b7){const _0x33c385=_0x3e729f;this[_0x33c385(0x227)]!==_0x2135b7&&(this['_battler']=_0x2135b7);},Sprite_BoostIcon[_0x3e729f(0x1d9)]['update']=function(){const _0x2cec93=_0x3e729f;Sprite[_0x2cec93(0x1d9)]['update'][_0x2cec93(0x23b)](this),this[_0x2cec93(0x276)](),this['updateFrame']();},Sprite_BoostIcon['prototype']['updateIcon']=function(){const _0x5eda1d=_0x3e729f;if(this[_0x5eda1d(0x227)]){let _0xd0abc=this[_0x5eda1d(0x227)][_0x5eda1d(0x235)]();_0xd0abc>=this[_0x5eda1d(0x15f)]?this[_0x5eda1d(0x1e3)]=ImageManager['boostIcon']:this['_iconIndex']=ImageManager[_0x5eda1d(0x15a)];}else this[_0x5eda1d(0x1e3)]=0x0;},Sprite_BoostIcon[_0x3e729f(0x1d9)][_0x3e729f(0x281)]=function(){const _0xc5630f=_0x3e729f,_0x394457=ImageManager['iconWidth'],_0x3e11b4=ImageManager[_0xc5630f(0x1bc)],_0x42cec6=this[_0xc5630f(0x1e3)]%0x10*_0x394457,_0x349440=Math[_0xc5630f(0x292)](this[_0xc5630f(0x1e3)]/0x10)*_0x3e11b4;this[_0xc5630f(0x20f)](_0x42cec6,_0x349440,_0x394457,_0x3e11b4);},VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x25d)]=Window_Base['prototype'][_0x3e729f(0x1cc)],Window_Base[_0x3e729f(0x1d9)][_0x3e729f(0x1cc)]=function(_0x3e421d){const _0x4e55a4=_0x3e729f;return _0x3e421d=VisuMZ[_0x4e55a4(0x171)]['Window_Base_convertEscapeCharacters'][_0x4e55a4(0x23b)](this,_0x3e421d),_0x3e421d=this['convertBoostEscapeCharacters'](_0x3e421d),_0x3e421d;},Window_Base[_0x3e729f(0x1d9)]['convertBoostEscapeCharacters']=function(_0x15d3c1){const _0x289a29=_0x3e729f;return _0x15d3c1=_0x15d3c1[_0x289a29(0x27f)](/\x1b(?:BP|BOOST)DMG\[(\d+)\]/gi,function(){return this['convertBoostDamageEscape'](parseInt(arguments[0x1]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1[_0x289a29(0x27f)](/\x1b(?:BP|BOOST)DAMAGE\[(\d+)\]/gi,function(){const _0x4c04bf=_0x289a29;return this[_0x4c04bf(0x216)](parseInt(arguments[0x1]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1[_0x289a29(0x27f)](/\x1b(?:BP|BOOST)TURN\[(\d+)\]/gi,function(){return this['convertBoostTurnEscape'](parseInt(arguments[0x1]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1['replace'](/\x1b(?:BP|BOOST)TURNS\[(\d+)\]/gi,function(){const _0x42c321=_0x289a29;return this[_0x42c321(0x174)](parseInt(arguments[0x1]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1['replace'](/\x1b(?:BP|BOOST)REP\[(\d+)\]/gi,function(){const _0x16d8ae=_0x289a29;return this[_0x16d8ae(0x27a)](parseInt(arguments[0x1]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1[_0x289a29(0x27f)](/\x1b(?:BP|BOOST)REPEAT\[(\d+)\]/gi,function(){return this['convertBoostRepeatEscape'](parseInt(arguments[0x1]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1[_0x289a29(0x27f)](/\x1b(?:BP|BOOST)REPEATS\[(\d+)\]/gi,function(){const _0x97cf78=_0x289a29;return this[_0x97cf78(0x27a)](parseInt(arguments[0x1]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1[_0x289a29(0x27f)](/\x1b(?:BP|BOOST)HITS\[(\d+)\]/gi,function(){const _0x2c9c6d=_0x289a29;return this[_0x2c9c6d(0x27a)](parseInt(arguments[0x1]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1[_0x289a29(0x27f)](/\x1b(?:BP|BOOST)ANALYZE\[(\d+)\]/gi,function(){const _0x6bbc49=_0x289a29;return this[_0x6bbc49(0x1b6)](parseInt(arguments[0x1]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1[_0x289a29(0x27f)](/\x1b(?:BP|BOOST)EFFECT\[(\d+)\]/gi,function(){return this['convertBoostEffectEscape'](parseInt(arguments[0x1]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1[_0x289a29(0x27f)](/\x1b(?:BP|BOOST)\[(.*?)\]/gi,function(){const _0x6dbb9c=_0x289a29;return this[_0x6dbb9c(0x17b)](String(arguments[0x1]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1[_0x289a29(0x27f)](/\x1b(?:BP|BOOST)0\[(.*?)\]/gi,function(){const _0x235f1a=_0x289a29;return this[_0x235f1a(0x1bd)](String(arguments[0x1]));}['bind'](this)),_0x15d3c1=_0x15d3c1[_0x289a29(0x27f)](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){const _0x7b7c65=_0x289a29;return this[_0x7b7c65(0x167)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1[_0x289a29(0x27f)](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){const _0x16d401=_0x289a29;return this[_0x16d401(0x167)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1[_0x289a29(0x27f)](/\x1b(?:BP|BOOST)\<=(\d+)\[(.*?)\]/gi,function(){return this['convertBoostLessEqualEscape'](parseInt(arguments[0x1]),String(arguments[0x2]));}['bind'](this)),_0x15d3c1=_0x15d3c1['replace'](/\x1b(?:BP|BOOST)\<(\d+)\[(.*?)\]/gi,function(){const _0x55927f=_0x289a29;return this[_0x55927f(0x260)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1[_0x289a29(0x27f)](/\x1b(?:BP|BOOST)\>=(\d+)\[(.*?)\]/gi,function(){const _0x26afdc=_0x289a29;return this[_0x26afdc(0x270)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x289a29(0x1cd)](this)),_0x15d3c1=_0x15d3c1['replace'](/\x1b(?:BP|BOOST)\>(\d+)\[(.*?)\]/gi,function(){const _0x11ed68=_0x289a29;return this[_0x11ed68(0x1d2)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x289a29(0x1cd)](this)),_0x15d3c1;},Window_Base['prototype']['convertBoostDamageEscape']=function(_0x4eaf69){const _0xce4f45=_0x3e729f;if(!!this[_0xce4f45(0x233)]){var _0x1e66cf=this[_0xce4f45(0x233)]['boostMultiplier'](_0xce4f45(0x274));_0x4eaf69=Math[_0xce4f45(0x15c)](_0x4eaf69*_0x1e66cf),_0x4eaf69+=this[_0xce4f45(0x233)][_0xce4f45(0x23c)]('Damage');}return _0x4eaf69;},Window_Base[_0x3e729f(0x1d9)]['convertBoostTurnEscape']=function(_0x11519d){const _0x2da7e5=_0x3e729f;if(!!this['_bpSubject']){var _0x5d67eb=this[_0x2da7e5(0x233)][_0x2da7e5(0x157)](_0x2da7e5(0x1e4));_0x11519d=Math[_0x2da7e5(0x15c)](_0x11519d*_0x5d67eb),_0x11519d+=this[_0x2da7e5(0x233)][_0x2da7e5(0x23c)](_0x2da7e5(0x1e4));}return _0x11519d;},Window_Base[_0x3e729f(0x1d9)][_0x3e729f(0x27a)]=function(_0x2811a2){const _0x4940cc=_0x3e729f;if(!!this['_bpSubject']){var _0x22cac5=this[_0x4940cc(0x233)][_0x4940cc(0x157)](_0x4940cc(0x26b));_0x2811a2=Math[_0x4940cc(0x15c)](_0x2811a2*_0x22cac5),_0x2811a2+=this[_0x4940cc(0x233)][_0x4940cc(0x23c)](_0x4940cc(0x26b));}return _0x2811a2;},Window_Base[_0x3e729f(0x1d9)][_0x3e729f(0x1b6)]=function(_0x3009be){const _0x6b1433=_0x3e729f;if(!!this['_bpSubject']){var _0x8d82f3=this[_0x6b1433(0x233)][_0x6b1433(0x157)](_0x6b1433(0x230));_0x3009be=Math[_0x6b1433(0x15c)](_0x3009be*_0x8d82f3),_0x3009be+=this['_bpSubject'][_0x6b1433(0x23c)]('Analyze');}return _0x3009be;},Window_Base['prototype'][_0x3e729f(0x17a)]=function(_0x4840dd){const _0x29714c=_0x3e729f;if(!!this[_0x29714c(0x233)]){var _0x5926e6=this['_bpSubject'][_0x29714c(0x157)](_0x29714c(0x16e));_0x4840dd=Math[_0x29714c(0x15c)](_0x4840dd*_0x5926e6),_0x4840dd+=this[_0x29714c(0x233)][_0x29714c(0x23c)](_0x29714c(0x16e));}return _0x4840dd;},Window_Base['prototype']['convertBoostUpEscape']=function(_0xb97df2){const _0x2080c7=_0x3e729f;return!!this['_bpSubject']&&this[_0x2080c7(0x233)]['toUseBoostPoints']()>0x0?_0xb97df2:'';},Window_Base[_0x3e729f(0x1d9)][_0x3e729f(0x1bd)]=function(_0x5edd40){const _0x47eb3f=_0x3e729f;return!this[_0x47eb3f(0x233)]||this[_0x47eb3f(0x233)][_0x47eb3f(0x254)]()<=0x0?_0x5edd40:'';},Window_Base[_0x3e729f(0x1d9)]['convertBoostEqualEscape']=function(_0x19bd29,_0x7404a3){const _0xcacafc=_0x3e729f;return!!this[_0xcacafc(0x233)]&&this[_0xcacafc(0x233)][_0xcacafc(0x254)]()===_0x19bd29?_0x7404a3:'';},Window_Base[_0x3e729f(0x1d9)][_0x3e729f(0x167)]=function(_0x1025cf,_0x152717){const _0x5ee00f=_0x3e729f;return!!this[_0x5ee00f(0x233)]&&this[_0x5ee00f(0x233)]['toUseBoostPoints']()===_0x1025cf?_0x152717:'';},Window_Base[_0x3e729f(0x1d9)][_0x3e729f(0x1f2)]=function(_0x2527f6,_0x15b27f){const _0x30e44a=_0x3e729f;return!!this[_0x30e44a(0x233)]&&this[_0x30e44a(0x233)][_0x30e44a(0x254)]()<=_0x2527f6?_0x15b27f:'';},Window_Base[_0x3e729f(0x1d9)]['convertBoostLessEscape']=function(_0x43100c,_0x51ddd4){const _0x2cf552=_0x3e729f;return!!this[_0x2cf552(0x233)]&&this[_0x2cf552(0x233)][_0x2cf552(0x254)]()<_0x43100c?_0x51ddd4:'';},Window_Base['prototype'][_0x3e729f(0x270)]=function(_0x5e814b,_0x337b84){const _0x323b33=_0x3e729f;return!!this['_bpSubject']&&this[_0x323b33(0x233)][_0x323b33(0x254)]()>=_0x5e814b?_0x337b84:'';},Window_Base[_0x3e729f(0x1d9)][_0x3e729f(0x1d2)]=function(_0x272364,_0x5ef99c){const _0xcce123=_0x3e729f;return!!this[_0xcce123(0x233)]&&this[_0xcce123(0x233)]['toUseBoostPoints']()>_0x272364?_0x5ef99c:'';},Window_Selectable[_0x3e729f(0x21c)]=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)]['UI'][_0x3e729f(0x190)],Window_Selectable[_0x3e729f(0x1b9)]=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)]['UI'][_0x3e729f(0x291)],Window_Selectable[_0x3e729f(0x1d9)]['canUseBoostShortcut']=function(){const _0x337b94=_0x3e729f,_0x4174cc=this[_0x337b94(0x1e6)][_0x337b94(0x203)];return Window_Selectable['BOOST_ACTION_BYPASS_CONSTRUCTORS']['includes'](_0x4174cc)?![]:!![];},Window_Selectable['prototype'][_0x3e729f(0x1cb)]=function(){const _0x769f07=_0x3e729f;if(!SceneManager[_0x769f07(0x272)]())return![];if(!Window_Selectable[_0x769f07(0x21c)])return![];if(!BattleManager[_0x769f07(0x1a8)]())return![];return this['canUseBoostShortcut']();},VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x294)]=Window_Selectable[_0x3e729f(0x1d9)][_0x3e729f(0x23a)],Window_Selectable['prototype']['cursorPagedown']=function(){const _0x505f3e=_0x3e729f;if(this[_0x505f3e(0x1cb)]()){const _0x5864a4=BattleManager[_0x505f3e(0x1ea)]();_0x5864a4&&_0x5864a4['canUseBoostPoints']()&&(SceneManager[_0x505f3e(0x23d)][_0x505f3e(0x1e5)](!![]),this['refresh'](),this[_0x505f3e(0x19f)]()),Input[_0x505f3e(0x1f0)]();}else VisuMZ['BoostAction'][_0x505f3e(0x294)]['call'](this);},VisuMZ['BoostAction'][_0x3e729f(0x1a4)]=Window_Selectable[_0x3e729f(0x1d9)][_0x3e729f(0x207)],Window_Selectable[_0x3e729f(0x1d9)]['cursorPageup']=function(){const _0x269c46=_0x3e729f;if(this['meetsBoostShortcutRequirements']()){const _0x3f2a4f=BattleManager[_0x269c46(0x1ea)]();_0x3f2a4f&&_0x3f2a4f[_0x269c46(0x1e1)]()&&(SceneManager['_scene']['commandUnboost'](!![]),this['refresh'](),this[_0x269c46(0x19f)]()),Input['clear']();}else VisuMZ['BoostAction'][_0x269c46(0x1a4)]['call'](this);},Window_Help[_0x3e729f(0x1d9)][_0x3e729f(0x25f)]=function(_0x19febc){this['_bpSubject']=_0x19febc;},Window_Help[_0x3e729f(0x1d9)][_0x3e729f(0x178)]=function(){const _0x1ff54f=_0x3e729f;this[_0x1ff54f(0x233)]=undefined;},Window_StatusBase[_0x3e729f(0x1d9)][_0x3e729f(0x1c0)]=function(){return BattleManager['allowBoostAction']();},Window_StatusBase[_0x3e729f(0x1d9)][_0x3e729f(0x202)]=function(_0x59e0e5,_0x239c43,_0x5dee3d){const _0x38f42d=_0x3e729f;if(!this[_0x38f42d(0x1c0)]())return;const _0x55639e=_0x38f42d(0x255)['format'](_0x59e0e5[_0x38f42d(0x20c)]()),_0x255182=this[_0x38f42d(0x23f)](_0x55639e,Sprite_BoostContainer);_0x255182[_0x38f42d(0x1e2)](_0x59e0e5),_0x255182['move'](_0x239c43,_0x5dee3d),_0x255182[_0x38f42d(0x246)]();},Window_ActorCommand[_0x3e729f(0x228)]=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)]['UI'][_0x3e729f(0x17f)],Window_ActorCommand[_0x3e729f(0x1f3)]=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)]['UI']['ShowUnboostCmd'],VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x25c)]=Window_ActorCommand[_0x3e729f(0x1d9)][_0x3e729f(0x1ae)],Window_ActorCommand['prototype'][_0x3e729f(0x1ae)]=function(){const _0x193ceb=_0x3e729f;BattleManager[_0x193ceb(0x1a8)]()&&(this[_0x193ceb(0x1d6)](),this[_0x193ceb(0x28d)]()),VisuMZ[_0x193ceb(0x171)]['Window_ActorCommand_addGuardCommand'][_0x193ceb(0x23b)](this);},Window_ActorCommand['prototype']['addBoostCommand']=function(){const _0x1df261=_0x3e729f;if(!Window_ActorCommand[_0x1df261(0x228)])return;const _0x2f8140=this[_0x1df261(0x222)](),_0x54074e=TextManager['boostCommandName'],_0x1c5beb=ImageManager[_0x1df261(0x252)],_0x4b4e67=_0x2f8140===_0x1df261(0x27b)?_0x54074e:_0x1df261(0x1da)[_0x1df261(0x18b)](_0x1c5beb,_0x54074e);var _0x142e87=this[_0x1df261(0x251)][_0x1df261(0x24e)]();this[_0x1df261(0x162)](_0x4b4e67,'boost',_0x142e87);},Window_ActorCommand['prototype'][_0x3e729f(0x28d)]=function(){const _0x5f048f=_0x3e729f;if(!Window_ActorCommand[_0x5f048f(0x1f3)])return;const _0x3f3edf=this[_0x5f048f(0x222)](),_0x573002=TextManager[_0x5f048f(0x1e7)],_0x39bb17=ImageManager[_0x5f048f(0x15a)],_0x1e7d96=_0x3f3edf===_0x5f048f(0x27b)?_0x573002:_0x5f048f(0x1da)[_0x5f048f(0x18b)](_0x39bb17,_0x573002);var _0x2bf139=this[_0x5f048f(0x251)][_0x5f048f(0x1e1)]();this[_0x5f048f(0x162)](_0x1e7d96,_0x5f048f(0x208),_0x2bf139);},Window_ActorCommand[_0x3e729f(0x1d9)]['playOkSound']=function(){const _0x3006fa=_0x3e729f;this['currentSymbol']()!==_0x3006fa(0x18f)&&this[_0x3006fa(0x26a)]()!==_0x3006fa(0x208)&&Window_Selectable[_0x3006fa(0x1d9)]['playOkSound'][_0x3006fa(0x23b)](this);},Window_BattleStatus[_0x3e729f(0x26f)]=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)]['UI']['BattleStatusShow'],Window_BattleStatus['BOOST_POINTS_DISPLAY_AUTO_POS']=VisuMZ['BoostAction']['Settings']['UI'][_0x3e729f(0x215)],Window_BattleStatus[_0x3e729f(0x1db)]=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)]['UI'][_0x3e729f(0x1d1)],Window_BattleStatus[_0x3e729f(0x1b1)]=VisuMZ[_0x3e729f(0x171)][_0x3e729f(0x152)]['UI']['BattleStatusOffsetY'],VisuMZ[_0x3e729f(0x171)]['Window_BattleStatus_drawItemStatus']=Window_BattleStatus[_0x3e729f(0x1d9)]['drawItemStatus'],Window_BattleStatus[_0x3e729f(0x1d9)][_0x3e729f(0x266)]=function(_0x39b67a){const _0x575e0=_0x3e729f;VisuMZ['BoostAction']['Window_BattleStatus_drawItemStatus']['call'](this,_0x39b67a),this[_0x575e0(0x1df)](_0x39b67a);},Window_BattleStatus['prototype'][_0x3e729f(0x1df)]=function(_0x57e020){const _0x23c2f0=_0x3e729f;if(!Window_BattleStatus[_0x23c2f0(0x26f)])return;const _0x3693a5=this[_0x23c2f0(0x1ea)](_0x57e020);if(!_0x3693a5)return;!Window_BattleStatus[_0x23c2f0(0x1ff)]?this[_0x23c2f0(0x1d7)](_0x57e020):this[_0x23c2f0(0x1ac)](_0x57e020);},Window_BattleStatus[_0x3e729f(0x1d9)][_0x3e729f(0x1d7)]=function(_0x524793){const _0x2c2bcf=_0x3e729f,_0x1129a8=this[_0x2c2bcf(0x1ea)](_0x524793),_0x5dd86d=this['itemRectWithPadding'](_0x524793);let _0x112219=_0x5dd86d['x']-0x4+Window_BattleStatus[_0x2c2bcf(0x1db)],_0xee6af4=_0x5dd86d['y']+0x4+Window_BattleStatus[_0x2c2bcf(0x1b1)];this[_0x2c2bcf(0x202)](_0x1129a8,_0x112219,_0xee6af4);},Window_BattleStatus[_0x3e729f(0x1d9)][_0x3e729f(0x1ac)]=function(_0x41f434){const _0x54cc0b=_0x3e729f,_0x198ec6=this[_0x54cc0b(0x1ea)](_0x41f434),_0x570d30=this[_0x54cc0b(0x267)](_0x41f434),_0x41ffce=Math['ceil'](ImageManager[_0x54cc0b(0x268)]*Game_BattlerBase[_0x54cc0b(0x271)]*Sprite_BoostContainer[_0x54cc0b(0x172)]),_0x4c8d08=Math['ceil'](ImageManager[_0x54cc0b(0x1bc)]*Sprite_BoostContainer['ICON_SIZE_RATE']);let _0xd9ad1a=_0x570d30['x']+0x4,_0x4ea8a9=_0x570d30['y']+0x4;const _0x451175=this['battleLayoutStyle']();switch(_0x451175){case'list':VisuMZ[_0x54cc0b(0x218)][_0x54cc0b(0x152)][_0x54cc0b(0x1b3)][_0x54cc0b(0x164)]?_0xd9ad1a+=ImageManager[_0x54cc0b(0x287)]+0x8:_0xd9ad1a+=ImageManager[_0x54cc0b(0x268)]+0x8;_0xd9ad1a+=0x88,_0xd9ad1a+=0x88*0x2;$dataSystem['optDisplayTp']&&(_0xd9ad1a+=0x88);_0x4ea8a9+=Math[_0x54cc0b(0x1c5)](0x0,Math['round']((this[_0x54cc0b(0x239)]()-_0x4c8d08)/0x2));break;case'xp':case _0x54cc0b(0x23e):case _0x54cc0b(0x201):_0xd9ad1a=Math['round'](_0x570d30['x']+(_0x570d30[_0x54cc0b(0x1e0)]-_0x41ffce)/0x2);break;case _0x54cc0b(0x258):_0xd9ad1a=Math['round'](_0x570d30['x']+(_0x570d30[_0x54cc0b(0x1e0)]-_0x41ffce)/0x2);const _0x25cfc1=$dataSystem[_0x54cc0b(0x16c)]?0x4:0x3;_0x4ea8a9=Math['round'](_0x570d30['y']+_0x570d30[_0x54cc0b(0x1af)]-0x4-this[_0x54cc0b(0x239)]()*_0x25cfc1);break;}_0xd9ad1a+=Window_BattleStatus['BOOST_POINTS_DISPLAY_OFFSET_X'],_0x4ea8a9+=Window_BattleStatus[_0x54cc0b(0x1b1)],this[_0x54cc0b(0x202)](_0x198ec6,_0xd9ad1a,_0x4ea8a9);};