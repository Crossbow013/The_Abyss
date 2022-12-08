//=============================================================================
// VisuStella MZ - Aggro Control System
// VisuMZ_2_AggroControlSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_AggroControlSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AggroControlSystem = VisuMZ.AggroControlSystem || {};
VisuMZ.AggroControlSystem.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.09] [AggroControlSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Aggro_Control_System_VisuStella_MZ
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A common mechanic found in many RPG's nowadays is the ability to steer the
 * way enemies target party members. This can be in the form of provocations, 
 * taunts, and aggro.
 *
 * Provocations come in the form of states, where when a unit applies a provoke
 * state on a target, the target must attack the provoker when using single
 * target skills. This plugin provides support for multiple provocations and
 * such provocations will be given focus based on the state's priority value.
 *
 * Taunts are a third way to steer an opponent to focus on a party member. The
 * taunt effects can be split up into global, physical, magical, or certain hit
 * only taunts and these can be applied to almost any trait object.
 *
 * Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Three different ways to influencing which targets enemies should attack:
 *   Provoke, taunt, and aggro.
 * * Provoke and taunt effects work both ways for actors and enemies.
 * * Aggro effects accumulate through battle and can be manipulated through
 *   notetag values, Plugin Commands, and/or Plugin Parameters.
 * * Provoked battlers can have provoke lines displayed to indicate which
 *   unit has provoked them.
 * * Taunting units can have animations played on them repeatedly to quickly
 *   relay information to the player about their taunt properties.
 * * Gauges that can be displayed over the heads of actor sprites to display
 *   how much aggro that actor holds in comparison to the other actors.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * VisuMZ_1_BattleCore
 *
 * - Provoke Priority Lines and Taunt animations become available if these
 *   plugins are installed.
 *
 * ---
 *
 * ============================================================================
 * How Aggro, Provoke, and Taunts Work
 * ============================================================================
 *
 * This section will explain how aggro, provoke, and taunts work.
 *
 * ---
 *
 * Provoke
 *
 * - Provocations come in the form of states, where when a unit applies a
 * provoke state on a target, the target must attack the provoker when using
 * single target skills. This plugin provides support for multiple provocations
 * and such provocations will be given focus based on the state's database
 * priority value.
 *
 * - The provoke will last only as long as the duration of the state itself. If
 * the state's duration is refreshed by reapplying the Provoke state, then the
 * provoker of that state will then switch over to the one applying the newly
 * added state.
 *
 * - When an actor selects a target for an action and the actor is provoked by
 * an enemy on the other team, the player's choice selection becomes limited to
 * only the provoker.
 *
 * - Provoke can be bypassed through the <Bypass Provoke> notetag.
 *
 * ---
 *
 * Taunts
 *
 * - Taunts are a third way to steer an opponent to focus on a party member.
 * The taunt effects can be split up into global, physical, magical, or certain
 * hit only taunts and these can be applied to almost any trait object.
 *
 * - When an actor selects a target and the enemy team has a taunting unit,
 * the player's choice selection becomes limited to only the targets with the
 * associated taunt type.
 *
 * - Taunts can be bypassed through the <Bypass Taunt> notetag.
 *
 * ---
 *
 * Aggro
 *
 * - Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * - Skills and items can raise its user's aggro value through notetags and/or
 * how much damage they've dealt or healed. Skills and items can also change a
 * target's aggro value through notetags, too.
 *
 * - Through the Plugin Parameters, you can set Aggro to automatically raised
 * based on how much damage or healing dealt by a user.
 *
 * - Some enemies can be bypass forced aggro target through the <Bypass Aggro>
 * notetag while other enemies can be forced to target the highest aggro target
 * through the <Target Highest Aggro> notetag;
 *
 * ---
 *
 * Priorities
 *
 * - Priority will be given in the order of provokes, taunts, and then aggro.
 * This means if an enemy is provoked, the opposing side has a taunt, and there
 * is a member with high aggro, then the enemy will always attack the provoker
 * first before targeting a taunting unit before targeting the unit with high
 * aggro values.
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
 * === Provoke-Related Notetags ===
 *
 * The following notetags enable you to utilize the Provoke effects added by
 * this plugin. Provoked targets can only attack the provoking unit for single
 * target actions.
 *
 * ---
 *
 * <Provoke>
 *
 * - Used for: State Notetags
 * - Causes the state affected unit to be able to only attack the caster of the
 *   provoke state for single target actions.
 * - If multiple provoke states are applied, then the provoker is the one who
 *   applied the highest priority provoke state.
 *
 * ---
 *
 * <Bypass Provoke>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Makes the affected unit to ignore any and all provoke effects applied by
 *   any provoke states, allowing them to target foes as if they are unaffected
 *   by provoke states altogether.
 *
 * ---
 * 
 * <Bypass Provoke>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass provoke effects applied by any provoke states,
 *   allowing this action to target foes as if the user is unaffected by any
 *   provoke effects altogether.
 * 
 * ---
 * 
 * <Provoke Height Origin: x%>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the provoke height origin point to x% of the sprite's height.
 * - This is the landing point for the provoke trails.
 * - Replace 'x' with a number presenting what rate of the sprite's height to
 *   set as the provoke height origin point.
 * 
 * ---
 *
 * === Taunt-Related Notetags ===
 *
 * ---
 *
 * <Taunt>
 * <All Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Physical Taunt>
 * <Magical Taunt>
 * <Certain Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions
 *   respectively.
 * - Add/remove any combination of the above to cause the affected unit to
 *   become the target of those types of actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Bypass Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The affected unit will ignore any and all taunt effects created by the
 *   opposing team, allowing them to use single target actions as if no
 *   taunters exist on the opposing team.
 *
 * ---
 * 
 * <Bypass Taunt>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass taunt effects created by the opposing team,
 *   allowing the user to use single target actions as if no taunters exist on
 *   the opposing team.
 * 
 * ---
 *
 * === Aggro-Related Notetags ===
 *
 * ---
 *
 * <User Aggro: +x>
 * <User Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the user's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <Target Aggro: +x>
 * <Target Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the target's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
 *
 * ---
 *
 * <Aggro: +x>
 * <Aggro: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to passively have increased/decreased aggro
 *   values independent of the amount of aggro it earns in battle.
 * - Replace 'x' with the amount of aggro this object increases/decreases by.
 *
 * ---
 *
 * <Aggro Multiplier: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to increase the amount of perceived aggro it has
 *   by the aggro multiplier.
 * - Replace 'x' with a number representing the percentage to increase/decrease
 *   the perceived aggro by.
 * - If multiple of these traits exist across different trait objects, the
 *   effects are increased multiplicatively.
 *
 * ---
 *
 * <Bypass Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will decide targets by aggro weight
 *   instead of always picking the highest aggro unit(s).
 * - If used on trait objects, the affected unit will decide targets by aggro
 *   weight instead of always picking the highest aggro unit(s).
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 * 
 * <Bypass Highest Aggro>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass highest aggro effects and instead focuses on
 *   targets by aggro weight instead.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 * 
 * ---
 *
 * <Target Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will always decide its targets by
 *   the highest aggro value.
 * - If used on trait objects, the affected unit will always decide on targets
 *   by the highest aggro value.
 * - If the <Bypass Highest Aggro> notetag exists, this effect is ignored.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 *
 * === JavaScript Notetags: Aggro-Related ===
 *
 * ---
 *
 * <JS User Aggro>
 *  code
 *  code
 *  value = code
 * </JS User Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change the user's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <JS Target Aggro>
 *  code
 *  code
 *  value = code
 * </JS Target Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change target's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
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
 * Actor: Change Aggro
 * - Changes target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Actor: Set Aggro
 * - Set target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Aggro
 * - Changes target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Enemy: Set Aggro
 * - Set target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Provoke Settings
 * ============================================================================
 *
 * The Provoke Settings Plugin Parameters adjust the visual aspects related to
 * the provoke effect. These settings will require VisuMZ_1_BattleCore to be
 * installed in order for them to work due to dependencies. 
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 *   Show Priority Lines?:
 *   - Show priority target lines for this plugin?
 *   - Requires VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Line Settings
 * 
 *   Arc Height:
 *   - How tall should the line arc in pixels?
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Height Origin:
 *   - The rate from the battler's sprite base to determine where the line
 *     starts from.
 * 
 *   Line Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Opacity:
 *   - The highest possible opacity for active provoke lines.
 * 
 *   Opacity Speed:
 *   - The speed at which opacity fluctuates for the line sprite.
 * 
 *   Parts:
 *   - The number of joint parts to split up the sprite as.
 * 
 *   Parts Size:
 *   - The number in pixels for the diameter of each part.
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Provoke Origin' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Taunt Settings
 * ============================================================================
 *
 * Battlers with specific taunt types can have animations playing on them over
 * and over to relay information to the player. These settings require you to
 * have both VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore installed in your
 * project's plugin list in order to use.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine & VisuMZ_1_BattleCore
 * 
 *   Show Animations?:
 *   - Show animations for each of the taunt effects?
 *   - Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Animation ID's
 * 
 *   Physical Taunt:
 *   - The animation ID used for physical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Magical Taunt:
 *   - The animation ID used for magical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Certain Hit Taunt:
 *   - The animation ID used for certain hit taunts.
 *   - Use 0 or 'None' to bypass this type.
 *
 * ---
 *
 * Animation Settings
 * 
 *   Cycle Time:
 *   - The amount of frames to wait before each animation cycle.
 *   - WARNING: Lower numbers can jeopardize game performance.
 * 
 *   Mirror Actor Ani?:
 *   - Mirror animations played on actors?
 * 
 *   Mute Animation SFX?:
 *   - Mute sounds played by animations?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Aggro Settings
 * ============================================================================
 *
 * This lets you adjust the settings for this plugin's Aggro mechanics. Most of
 * these settings focus on the visual gauge display of the Aggro gauge, but you
 * can also change up the settings for how aggro is utilized.
 *
 * ---
 *
 * General
 * 
 *   Priority: Highest TGR:
 *   - When enemies target actors for an single target attack, always target
 *     the highest members or make it weighted?
 *
 *   Aggro Per Damage:
 *   - The amount of aggro generated per point of HP damage dealt to an enemy.
 *
 *   Aggro Per Heal:
 *   - The amount of aggro generated per point of HP recovered to an ally.
 *
 * ---
 *
 * Gauge
 * 
 *   Visible Battler Gauge:
 *   - Display an aggro gauge over an SV actor's head to show current aggro
 *     level compared to other party members.
 * 
 *   Visible Status Gauge:
 *   - Display an aggro gauge in the Battle Status Window to show the current
 *     aggro level compared to others.
 * 
 *   Gauge Color 1:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Width:
 *   - Width in pixels you want the gauge to be.
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the Aggro Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the Aggro Gauge to be scaled?
 * 
 *   Battler Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 * 
 *   Battle Status Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Aggro Gauge' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
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
 * ** Filename has been shortened from VisuMZ_2_AggroControlSystem.js to
 *    VisuMZ_2_AggroControlSys.js due to deployment reasons. For some mobile
 *    devices, keeping the name as long as VisuMZ_2_AggroControlSystem.js
 *    causes problems, but VisuMZ_2_AggroControlSys.js is fine. Take note of
 *    this while you are updating.
 * ** 'user' and 'target' now works properly with the JS notetags.
 *    Fix made by Irina.
 * 
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Highest and lowest TGR members are now cached on an action by action
 *    basis for reduce needed computations. Update made by Irina.
 * 
 * Version 1.07: April 9, 2021
 * * Bug Fixes!
 * ** Provoke effect now takes into consideration when Provoke is applied by
 *    a weapon effect that comes off a counter attack from an actor. Fix made
 *    by Olivia.
 * 
 * Version 1.06: March 12, 2021
 * * Bug Fixes!
 * ** Subsequent battles or changing scenes should no longer clear the custom
 *    rendered bitmap used for the provoke trail. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for the Skill and Item versions of the following
 *    notetags into the help file and wiki:
 * *** <Bypass Provoke>
 * *** <Bypass Taunt>
 * *** <Bypass Highest Aggro>
 * 
 * Version 1.05: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Aggro Settings > Battle Status Gauge
 * **** These settings allow you to offset the Aggro Gauge in the Battle Status
 *      Window from its original position.
 * 
 * Version 1.04: February 26, 2021
 * * Bug Fixes!
 * ** Fixed positioning of gauge for List Style battle layouts without faces.
 *    Fix made by Olivia.
 * 
 * Version 1.03: February 5, 2021
 * * Feature Update!
 * ** Aggro is now cleared at the end of each battle in addition to the start
 *    of each battle. Update made by Olivia.
 *
 * Version 1.02: November 1, 2020
 * * Compatibility Update!
 * ** Plugin is made more compatible with other plugins.
 * 
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Provoke lines should now be placed correctly if the UI area is smaller
 *    than the resolution area.
 * ** The Plugin Commands should no longer cause crashes. Fix made by Irina.
 *
 * Version 1.00: September 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeAggro
 * @text Actor: Change Aggro
 * @desc Changes target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSetAggro
 * @text Actor: Set Aggro
 * @desc Set target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeAggro
 * @text Enemy: Change Aggro
 * @desc Changes target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySetAggro
 * @text Enemy: Set Aggro
 * @desc Set target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
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
 * @param AggroControl
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Provoke:struct
 * @text Provoke Settings
 * @type struct<Provoke>
 * @desc Settings related to the Provoke mechanic.
 * These settings require VisuMZ_1_BattleCore.
 * @default {"VisuMZ_1_BattleCore":"","ShowLines:eval":"true","LineSettings":"","ArcHeight:num":"125","BlendMode:num":"1","HeightOrigin:num":"0.8","LineColor:str":"#ff0000","Opacity:num":"255","OpacitySpeed:num":"4","Parts:num":"256","PartsSize:num":"5","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Provoke Origin"}
 *
 * @param Taunt:struct
 * @text Taunt Settings
 * @type struct<Taunt>
 * @desc Settings related to the Taunt mechanic.
 * @default {"Dependency":"VisuMZ_1_BattleCore","ShowAnimation:eval":"true","AnimationID":"","AniPhysical:num":"1","AniMagical:num":"2","AniCertain:num":"3","AnimationSettings":"","CycleTime:num":"60","MirrorActorAni:eval":"true","MuteAnimations:eval":"true"}
 *
 * @param Aggro:struct
 * @text Aggro Settings
 * @type struct<Aggro>
 * @desc Settings related to the Aggro mechanic.
 * @default {"General":"","PriorityHighest:eval":"true","AggroPerDmg:num":"0.1","AggroPerHeal:num":"0.5","Gauge":"","VisibleGauge:eval":"false","StatusGauge:eval":"true","GaugeColor1:str":"#959595","GaugeColor2:str":"#ffffff","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"+0","OffsetY:num":"+2","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Aggro Gauge"}
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
 * Provoke Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Provoke:
 *
 * @param VisuMZ_1_BattleCore
 *
 * @param ShowLines:eval
 * @text Show Priority Lines?
 * @parent VisuMZ_1_BattleCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show priority target lines for this plugin?
 * Requires VisuMZ_1_BattleCore.
 * @default true
 *
 * @param LineSettings
 * @text Line Settings
 *
 * @param ArcHeight:num
 * @text Arc Height
 * @parent LineSettings
 * @type number
 * @desc How tall should the line arc in pixels?
 * @default 125
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent LineSettings
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @param HeightOrigin:num
 * @text Height Origin
 * @parent LineSettings
 * @desc The rate from the battler's sprite base to determine where the line starts from.
 * @default 0.8
 *
 * @param LineColor:str
 * @text Line Color
 * @parent LineSettings
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ff0000
 *
 * @param Opacity:num
 * @text Opacity
 * @parent LineSettings
 * @type number
 * @min 1
 * @max 255
 * @desc The highest possible opacity for active provoke lines.
 * @default 255
 *
 * @param OpacitySpeed:num
 * @text Opacity Speed
 * @parent Opacity:num
 * @type number
 * @min 1
 * @desc The speed at which opacity fluctuates for the line sprite.
 * @default 4
 *
 * @param Parts:num
 * @text Parts
 * @parent LineSettings
 * @type number
 * @min 1
 * @desc The number of joint parts to split up the sprite as.
 * @default 256
 *
 * @param PartsSize:num
 * @text Parts Size
 * @parent Parts:num
 * @type number
 * @min 1
 * @desc The number in pixels for the diameter of each part.
 * @default 5
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Provoke Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Provoke Origin' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Provoke Origin
 *
 */
/* ----------------------------------------------------------------------------
 * Taunt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Taunt:
 *
 * @param Dependency
 * @text VisuMZ_0_CoreEngine
 * @default VisuMZ_1_BattleCore
 *
 * @param ShowAnimation:eval
 * @text Show Animations?
 * @parent Dependency
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show animations for each of the taunt effects?
 * Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 * @default true
 *
 * @param AnimationID
 * @text Animation ID's
 *
 * @param AniPhysical:num
 * @text Physical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for physical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 13
 *
 * @param AniMagical:num
 * @text Magical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for magical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 14
 *
 * @param AniCertain:num
 * @text Certain Hit Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for certain hit taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 15
 *
 * @param AnimationSettings
 * @text Animation Settings
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent AnimationSettings
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 60
 *
 * @param MirrorActorAni:eval
 * @text Mirror Actor Ani?
 * @parent AnimationSettings
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations played on actors?
 * @default true
 *
 * @param MuteAnimations:eval
 * @text Mute Animation SFX?
 * @parent AnimationSettings
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute sounds played by animations?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Aggro Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Aggro:
 *
 * @param General
 *
 * @param PriorityHighest:eval
 * @text Priority: Highest TGR
 * @parent General
 * @type boolean
 * @on Always
 * @off Weighted
 * @desc When enemies target actors for an single target attack,
 * always target the highest members or make it weighted?
 * @default true
 *
 * @param AggroPerDmg:num
 * @text Aggro Per Damage
 * @parent General
 * @desc The amount of aggro generated per point of HP damage dealt to an enemy.
 * @default 0.1
 *
 * @param AggroPerHeal:num
 * @text Aggro Per Heal
 * @parent General
 * @desc The amount of aggro generated per point of HP recovered to an ally.
 * @default 0.5
 *
 * @param Gauge
 *
 * @param VisibleGauge:eval
 * @text Visible Battler Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge over an SV actor's head to show
 * current aggro level compared to other party members.
 * @default false
 *
 * @param StatusGauge:eval
 * @text Visible Status Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge in the Battle Status Window
 * to show the current aggro level compared to others.
 * @default true
 *
 * @param GaugeColor1:str
 * @text Gauge Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #959595
 *
 * @param GaugeColor2:str
 * @text Gauge Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Gauge
 * @desc How large/small do you want the Aggro Gauge to be scaled?
 * @default 0.5
 * 
 * @param BattlerGauge
 * @text Battler Gauge
 * @parent Gauge
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +2
 * 
 * @param BattleStatus
 * @text Battle Status Gauge
 * @parent Gauge
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Aggro Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Aggro Gauge
 *
 */
//=============================================================================

const _0x515139=_0x522f;(function(_0x2e3fbc,_0x282a01){const _0x52c925=_0x522f,_0x426a58=_0x2e3fbc();while(!![]){try{const _0x82239d=parseInt(_0x52c925(0x156))/0x1*(parseInt(_0x52c925(0x25a))/0x2)+-parseInt(_0x52c925(0x1fc))/0x3+-parseInt(_0x52c925(0x14d))/0x4+parseInt(_0x52c925(0x247))/0x5+parseInt(_0x52c925(0x1f8))/0x6+parseInt(_0x52c925(0x27f))/0x7*(-parseInt(_0x52c925(0x15b))/0x8)+parseInt(_0x52c925(0x1d1))/0x9;if(_0x82239d===_0x282a01)break;else _0x426a58['push'](_0x426a58['shift']());}catch(_0x957183){_0x426a58['push'](_0x426a58['shift']());}}}(_0x5787,0x7f7ed));var label='AggroControlSystem',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x515139(0x263)](function(_0x355232){const _0x17565c=_0x515139;return _0x355232[_0x17565c(0x23e)]&&_0x355232[_0x17565c(0x248)]['includes']('['+label+']');})[0x0];function _0x522f(_0x1c22a5,_0x2594ca){const _0x578714=_0x5787();return _0x522f=function(_0x522fc1,_0x44ab84){_0x522fc1=_0x522fc1-0xff;let _0x674a8d=_0x578714[_0x522fc1];return _0x674a8d;},_0x522f(_0x1c22a5,_0x2594ca);}VisuMZ[label][_0x515139(0x188)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x515139(0x180)]=function(_0x1df7e2,_0x422c20){const _0x30a6e9=_0x515139;for(const _0x289475 in _0x422c20){if(_0x30a6e9(0x1ef)==='Fdcaj'){if(_0x289475[_0x30a6e9(0x293)](/(.*):(.*)/i)){const _0x107af5=String(RegExp['$1']),_0x4ea65a=String(RegExp['$2'])[_0x30a6e9(0x1f5)]()['trim']();let _0x42fc2d,_0x5a083c,_0x217475;switch(_0x4ea65a){case _0x30a6e9(0x1a9):_0x42fc2d=_0x422c20[_0x289475]!==''?Number(_0x422c20[_0x289475]):0x0;break;case _0x30a6e9(0x173):_0x5a083c=_0x422c20[_0x289475]!==''?JSON[_0x30a6e9(0x288)](_0x422c20[_0x289475]):[],_0x42fc2d=_0x5a083c[_0x30a6e9(0x18a)](_0x5d1e10=>Number(_0x5d1e10));break;case _0x30a6e9(0x161):_0x42fc2d=_0x422c20[_0x289475]!==''?eval(_0x422c20[_0x289475]):null;break;case _0x30a6e9(0x20d):_0x5a083c=_0x422c20[_0x289475]!==''?JSON['parse'](_0x422c20[_0x289475]):[],_0x42fc2d=_0x5a083c[_0x30a6e9(0x18a)](_0x1f4b81=>eval(_0x1f4b81));break;case _0x30a6e9(0x270):_0x42fc2d=_0x422c20[_0x289475]!==''?JSON[_0x30a6e9(0x288)](_0x422c20[_0x289475]):'';break;case _0x30a6e9(0x115):_0x5a083c=_0x422c20[_0x289475]!==''?JSON[_0x30a6e9(0x288)](_0x422c20[_0x289475]):[],_0x42fc2d=_0x5a083c[_0x30a6e9(0x18a)](_0x1aa7fe=>JSON[_0x30a6e9(0x288)](_0x1aa7fe));break;case'FUNC':_0x42fc2d=_0x422c20[_0x289475]!==''?new Function(JSON['parse'](_0x422c20[_0x289475])):new Function(_0x30a6e9(0x104));break;case _0x30a6e9(0x10e):_0x5a083c=_0x422c20[_0x289475]!==''?JSON['parse'](_0x422c20[_0x289475]):[],_0x42fc2d=_0x5a083c['map'](_0x26d03a=>new Function(JSON['parse'](_0x26d03a)));break;case _0x30a6e9(0x254):_0x42fc2d=_0x422c20[_0x289475]!==''?String(_0x422c20[_0x289475]):'';break;case'ARRAYSTR':_0x5a083c=_0x422c20[_0x289475]!==''?JSON[_0x30a6e9(0x288)](_0x422c20[_0x289475]):[],_0x42fc2d=_0x5a083c[_0x30a6e9(0x18a)](_0x28c3aa=>String(_0x28c3aa));break;case _0x30a6e9(0x1d7):_0x217475=_0x422c20[_0x289475]!==''?JSON[_0x30a6e9(0x288)](_0x422c20[_0x289475]):{},_0x42fc2d=VisuMZ[_0x30a6e9(0x180)]({},_0x217475);break;case _0x30a6e9(0x139):_0x5a083c=_0x422c20[_0x289475]!==''?JSON[_0x30a6e9(0x288)](_0x422c20[_0x289475]):[],_0x42fc2d=_0x5a083c['map'](_0x314b18=>VisuMZ['ConvertParams']({},JSON[_0x30a6e9(0x288)](_0x314b18)));break;default:continue;}_0x1df7e2[_0x107af5]=_0x42fc2d;}}else delete this['_provoker'][_0x525994];}return _0x1df7e2;},(_0x249d35=>{const _0x2184ea=_0x515139,_0x26e405=_0x249d35[_0x2184ea(0x256)];for(const _0x121539 of dependencies){if(!Imported[_0x121539]){if(_0x2184ea(0x244)!=='KlZmA')_0x5e89ac[_0x2184ea(0x258)][_0x2184ea(0x240)][_0x2184ea(0x27e)](this,_0x28c9d8),this[_0x2184ea(0x137)]();else{alert(_0x2184ea(0x1db)[_0x2184ea(0x276)](_0x26e405,_0x121539)),SceneManager[_0x2184ea(0x190)]();break;}}}const _0x48f969=_0x249d35[_0x2184ea(0x248)];if(_0x48f969[_0x2184ea(0x293)](/\[Version[ ](.*?)\]/i)){const _0x25c791=Number(RegExp['$1']);_0x25c791!==VisuMZ[label][_0x2184ea(0x1f7)]&&(alert(_0x2184ea(0x264)[_0x2184ea(0x276)](_0x26e405,_0x25c791)),SceneManager['exit']());}if(_0x48f969[_0x2184ea(0x293)](/\[Tier[ ](\d+)\]/i)){const _0x5287e6=Number(RegExp['$1']);if(_0x5287e6<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2184ea(0x276)](_0x26e405,_0x5287e6,tier)),SceneManager[_0x2184ea(0x190)]();else{if('qkfcl'===_0x2184ea(0x1ba)){if(!_0x4dd59b)return![];return _0x4e75a2['note'][_0x2184ea(0x293)](/<BYPASS PROVOKE>/i);}else tier=Math[_0x2184ea(0x21a)](_0x5287e6,tier);}}VisuMZ[_0x2184ea(0x180)](VisuMZ[label][_0x2184ea(0x188)],_0x249d35[_0x2184ea(0x22a)]);})(pluginData),PluginManager[_0x515139(0x281)](pluginData[_0x515139(0x256)],_0x515139(0x16d),_0x29717a=>{const _0x35e5c2=_0x515139;if(!$gameParty[_0x35e5c2(0x1a1)]())return;VisuMZ['ConvertParams'](_0x29717a,_0x29717a);const _0x12758c=$gameActors['actor'](_0x29717a[_0x35e5c2(0x174)]),_0x4d2729=_0x29717a[_0x35e5c2(0x158)];if(_0x12758c)_0x12758c['gainAggro'](_0x4d2729);}),PluginManager['registerCommand'](pluginData['name'],'ActorSetAggro',_0xbec5a7=>{const _0xd79dc4=_0x515139;if(!$gameParty[_0xd79dc4(0x1a1)]())return;VisuMZ[_0xd79dc4(0x180)](_0xbec5a7,_0xbec5a7);const _0x2b6d08=$gameActors['actor'](_0xbec5a7[_0xd79dc4(0x174)]),_0xe35aa4=_0xbec5a7[_0xd79dc4(0x158)];if(_0x2b6d08)_0x2b6d08[_0xd79dc4(0x21c)](_0xe35aa4);}),PluginManager[_0x515139(0x281)](pluginData[_0x515139(0x256)],_0x515139(0x222),_0x2c437e=>{const _0x5c2c5b=_0x515139;if(!$gameParty[_0x5c2c5b(0x1a1)]())return;VisuMZ[_0x5c2c5b(0x180)](_0x2c437e,_0x2c437e);const _0x4a0399=$gameTroop[_0x5c2c5b(0x160)]()[_0x2c437e[_0x5c2c5b(0x21b)]],_0x36b6f7=_0x2c437e['Aggro'];if(_0x4a0399)_0x4a0399['gainAggro'](_0x36b6f7);}),PluginManager[_0x515139(0x281)](pluginData[_0x515139(0x256)],'EnemySetAggro',_0x4be941=>{const _0x164bb0=_0x515139;if(!$gameParty[_0x164bb0(0x1a1)]())return;VisuMZ['ConvertParams'](_0x4be941,_0x4be941);const _0x4ce686=$gameTroop['members']()[_0x4be941[_0x164bb0(0x21b)]],_0x2d9212=_0x4be941[_0x164bb0(0x158)];if(_0x4ce686)_0x4ce686[_0x164bb0(0x21c)](_0x2d9212);}),DataManager[_0x515139(0x17b)]=function(_0x3045ad){const _0x1cf3d3=_0x515139;if(!_0x3045ad)return![];return _0x3045ad['note'][_0x1cf3d3(0x293)](/<PROVOKE>/i);},DataManager[_0x515139(0x259)]=function(_0x46321e){const _0x8d802d=_0x515139;if(!_0x46321e)return![];return _0x46321e['note'][_0x8d802d(0x293)](/<BYPASS PROVOKE>/i);},DataManager[_0x515139(0x25c)]=function(_0x3a756c){const _0x40de2b=_0x515139;if(!_0x3a756c)return![];return _0x3a756c[_0x40de2b(0x1ae)][_0x40de2b(0x293)](/<BYPASS TAUNT>/i);},DataManager['isBypassHighestAggro']=function(_0x440ce1){const _0x220f4c=_0x515139;if(!_0x440ce1)return![];return _0x440ce1[_0x220f4c(0x1ae)][_0x220f4c(0x293)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},DataManager[_0x515139(0x18b)]=function(_0x3e0b3b){const _0x27f5e0=_0x515139;if(!_0x3e0b3b)return![];return _0x3e0b3b['note'][_0x27f5e0(0x293)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},ImageManager[_0x515139(0x241)]=function(){const _0x4a46e2=_0x515139;if(this['_provokeBitmap'])return this[_0x4a46e2(0x2ae)];return this[_0x4a46e2(0x2ae)]=new Bitmap(0x64,0x64),this[_0x4a46e2(0x2ae)]['drawCircle'](0x32,0x32,0x32,ColorManager['provokeLineColor']()),this[_0x4a46e2(0x2ae)][_0x4a46e2(0x196)]=![],this[_0x4a46e2(0x2ae)];},ConfigManager[_0x515139(0x1e5)]=!![],ConfigManager[_0x515139(0x206)]=!![],VisuMZ['AggroControlSystem'][_0x515139(0x164)]=ConfigManager[_0x515139(0x2a1)],ConfigManager[_0x515139(0x2a1)]=function(){const _0x40283a=_0x515139,_0x3893fd=VisuMZ[_0x40283a(0x258)][_0x40283a(0x164)][_0x40283a(0x27e)](this);return _0x3893fd[_0x40283a(0x1e5)]=this[_0x40283a(0x1e5)],_0x3893fd[_0x40283a(0x206)]=this['provokeOrigin'],_0x3893fd;},VisuMZ[_0x515139(0x258)][_0x515139(0x129)]=ConfigManager[_0x515139(0x166)],ConfigManager['applyData']=function(_0x2b6299){const _0x27f88f=_0x515139;VisuMZ[_0x27f88f(0x258)][_0x27f88f(0x129)][_0x27f88f(0x27e)](this,_0x2b6299);if(_0x27f88f(0x1e5)in _0x2b6299)this[_0x27f88f(0x1e5)]=_0x2b6299[_0x27f88f(0x1e5)];else{if('yfYhf'==='yfYhf')this[_0x27f88f(0x1e5)]=!![];else{let _0x57760d=_0x9a911f[_0x27f88f(0x258)][_0x27f88f(0x134)][_0x27f88f(0x27e)](this);if(this[_0x27f88f(0x22f)]()&&this[_0x27f88f(0x19b)]){if(this[_0x27f88f(0x19b)]['isDead']())return 0x0;if(this['_battler'][_0x27f88f(0x12b)]()&&this[_0x27f88f(0x19b)]['friendsUnit']()[_0x27f88f(0x272)]()[_0x27f88f(0x14a)]===0x1)return 0x1;}return _0x57760d[_0x27f88f(0x1a2)](0x0,0x1);}}_0x27f88f(0x206)in _0x2b6299?this[_0x27f88f(0x206)]=_0x2b6299['provokeOrigin']:this['provokeOrigin']=!![];},TextManager[_0x515139(0x1e5)]=VisuMZ['AggroControlSystem'][_0x515139(0x188)][_0x515139(0x158)][_0x515139(0x225)],TextManager[_0x515139(0x206)]=VisuMZ[_0x515139(0x258)][_0x515139(0x188)][_0x515139(0x144)][_0x515139(0x225)],ColorManager[_0x515139(0x25b)]=function(_0x14dc7e,_0x1d2fb5){const _0x419b28=_0x515139;_0x1d2fb5=String(_0x1d2fb5),this[_0x419b28(0x2ac)]=this[_0x419b28(0x2ac)]||{};if(_0x1d2fb5[_0x419b28(0x293)](/#(.*)/i))this[_0x419b28(0x2ac)][_0x14dc7e]='#%1'[_0x419b28(0x276)](String(RegExp['$1']));else{if(_0x419b28(0x299)!==_0x419b28(0x299)){const _0x21fade=_0x17bacb(_0x4a2036['$1']);_0x32594b[_0x419b28(0x105)]=this['subject'](),_0x15feb9['target']=_0xe0a33c,_0x29b06c[_0x419b28(0x283)]=this['item'](),_0x377419['a']=this[_0x419b28(0x175)](),_0x19ec06['b']=_0x46c44b;let _0x2f0114=_0x52d3c3[_0x419b28(0x234)]();try{_0x58fffc(_0x21fade);}catch(_0x317b9e){if(_0xe6952f[_0x419b28(0x2a6)]())_0x5951fe[_0x419b28(0x27a)](_0x317b9e);}_0x4488b5[_0x419b28(0x21c)](_0x2f0114),_0x45b675[_0x419b28(0x105)]=_0x140cd3,_0x4be567[_0x419b28(0x17c)]=_0x264741,_0x37a7de[_0x419b28(0x283)]=_0x217508,_0x10bda2['a']=_0x570627,_0x335ac8['b']=_0x2ecd4f;}else this[_0x419b28(0x2ac)][_0x14dc7e]=this[_0x419b28(0x20f)](Number(_0x1d2fb5));}return this[_0x419b28(0x2ac)][_0x14dc7e];},ColorManager[_0x515139(0x215)]=function(_0x566915){const _0x2847f9=_0x515139;_0x566915=String(_0x566915);if(_0x566915[_0x2847f9(0x293)](/#(.*)/i)){if(_0x2847f9(0x1b3)===_0x2847f9(0x1da))this[_0x2847f9(0x170)]();else return'#%1'[_0x2847f9(0x276)](String(RegExp['$1']));}else return'dJHOB'!=='dJHOB'?this[_0x2847f9(0x19b)]&&this[_0x2847f9(0x1ad)]===_0x2847f9(0x19c):this['textColor'](Number(_0x566915));},ColorManager[_0x515139(0x16b)]=function(){const _0x12b15d=_0x515139,_0x4a8551=_0x12b15d(0x163);this[_0x12b15d(0x2ac)]=this[_0x12b15d(0x2ac)]||{};if(this[_0x12b15d(0x2ac)][_0x4a8551])return this['_colorCache'][_0x4a8551];const _0x2e5370=VisuMZ[_0x12b15d(0x258)][_0x12b15d(0x188)][_0x12b15d(0x144)][_0x12b15d(0x1dc)];return this[_0x12b15d(0x25b)](_0x4a8551,_0x2e5370);},ColorManager[_0x515139(0x114)]=function(){const _0x223c2b=_0x515139,_0x309998=_0x223c2b(0x187);this['_colorCache']=this[_0x223c2b(0x2ac)]||{};if(this['_colorCache'][_0x309998])return this[_0x223c2b(0x2ac)][_0x309998];const _0xc15cfb=VisuMZ[_0x223c2b(0x258)][_0x223c2b(0x188)][_0x223c2b(0x158)][_0x223c2b(0x13f)];return this[_0x223c2b(0x25b)](_0x309998,_0xc15cfb);},ColorManager['aggroGaugeColor2']=function(){const _0x95d23c=_0x515139,_0x19635e=_0x95d23c(0x18e);this[_0x95d23c(0x2ac)]=this[_0x95d23c(0x2ac)]||{};if(this[_0x95d23c(0x2ac)][_0x19635e])return this[_0x95d23c(0x2ac)][_0x19635e];const _0x1a8663=VisuMZ['AggroControlSystem'][_0x95d23c(0x188)][_0x95d23c(0x158)]['GaugeColor2'];return this[_0x95d23c(0x25b)](_0x19635e,_0x1a8663);},SceneManager[_0x515139(0x1a5)]=function(){const _0x5a7c8e=_0x515139;return this[_0x5a7c8e(0x27c)]&&this['_scene'][_0x5a7c8e(0x20e)]===Scene_Battle;},BattleManager['convertBattleTargetToString']=function(_0x25243c){const _0x53161b=_0x515139;let _0xb95d34=this[_0x53161b(0x106)];this[_0x53161b(0x229)]&&('QdhAM'===_0x53161b(0x142)?(_0x253d55[_0x53161b(0x258)][_0x53161b(0x28e)][_0x53161b(0x27e)](this),this['addAggroControlSystemCommands']()):_0xb95d34=this[_0x53161b(0x229)]);if(!_0xb95d34)return null;if(_0xb95d34[_0x53161b(0x14f)]()&&_0x25243c['isEnemy']())return _0x53161b(0x28d)[_0x53161b(0x276)](_0xb95d34[_0x53161b(0x2a4)]());else{if(_0xb95d34[_0x53161b(0x1b1)]()&&_0x25243c[_0x53161b(0x14f)]())return _0x53161b(0x1ca)['format'](_0xb95d34[_0x53161b(0x275)]());}return null;},BattleManager['convertStringToBattleTarget']=function(_0x3f37e0){const _0x3ec672=_0x515139;if(!_0x3f37e0)return null;if(_0x3f37e0[_0x3ec672(0x293)](/BATTLE ACTOR (\d+)/i)){if(_0x3ec672(0x13e)!==_0x3ec672(0x13e)){if(!_0x58b0a7)return![];return _0x11aa11['note'][_0x3ec672(0x293)](/<BYPASS TAUNT>/i);}else return $gameActors[_0x3ec672(0x14b)](Number(RegExp['$1']));}else{if(_0x3f37e0[_0x3ec672(0x293)](/BATTLE ENEMY (\d+)/i)){if(_0x3ec672(0x282)===_0x3ec672(0x1c2))this[_0x3ec672(0x1c3)]();else return $gameTroop[_0x3ec672(0x160)]()[Number(RegExp['$1'])];}}return null;},BattleManager[_0x515139(0x112)]=function(){const _0x3c3289=_0x515139;return VisuMZ['AggroControlSystem'][_0x3c3289(0x188)][_0x3c3289(0x158)][_0x3c3289(0x14e)];},VisuMZ[_0x515139(0x258)][_0x515139(0x16a)]=Game_Action[_0x515139(0x1bf)]['targetsForAlive'],Game_Action[_0x515139(0x1bf)][_0x515139(0x26e)]=function(_0x32304e){const _0xb573b7=_0x515139;if(this[_0xb573b7(0x13d)]())return this[_0xb573b7(0x223)]();else{if(this[_0xb573b7(0x169)]())return this[_0xb573b7(0x17f)](_0x32304e);else return this[_0xb573b7(0x1c6)]()?[_0x32304e[_0xb573b7(0x1f0)]()]:VisuMZ[_0xb573b7(0x258)][_0xb573b7(0x16a)][_0xb573b7(0x27e)](this,_0x32304e);}},Game_Action[_0x515139(0x1bf)][_0x515139(0x13d)]=function(){const _0x324876=_0x515139;if(this[_0x324876(0x283)]()[_0x324876(0x1cf)]!==0x1)return![];if(DataManager['isBypassProvoke'](this[_0x324876(0x283)]()))return![];if(this[_0x324876(0x175)]()[_0x324876(0x162)]())return![];return this[_0x324876(0x175)]()['isProvokeAffected']();},Game_Action[_0x515139(0x1bf)][_0x515139(0x223)]=function(){const _0x38dd9a=_0x515139;return[this[_0x38dd9a(0x175)]()[_0x38dd9a(0x11c)]()];},Game_Action['prototype']['isTauntAffected']=function(){const _0x2655ff=_0x515139;if(this[_0x2655ff(0x283)]()[_0x2655ff(0x1cf)]!==0x1)return![];if(DataManager[_0x2655ff(0x25c)](this['item']()))return![];if(this['subject']()['bypassTaunt']())return![];const _0x349c06=this[_0x2655ff(0x154)]();if(this[_0x2655ff(0x1a3)]()&&_0x349c06['physicalTauntMembers']()[_0x2655ff(0x14a)]>0x0)return!![];if(this['isMagical']()&&_0x349c06['magicalTauntMembers']()['length']>0x0)return!![];if(this['isCertainHit']()&&_0x349c06[_0x2655ff(0x21e)]()[_0x2655ff(0x14a)]>0x0)return!![];return![];},Game_Action[_0x515139(0x1bf)][_0x515139(0x17f)]=function(_0x469e6a){const _0x65214=_0x515139;if(this[_0x65214(0x117)]<0x0){if(_0x65214(0x1f4)!==_0x65214(0x124))return[_0x469e6a[_0x65214(0x1ea)](this[_0x65214(0x283)]()['hitType'])];else{this[_0x65214(0x1f9)]=_0xd4521d[_0x65214(0x1df)];if(!this[_0x65214(0x19b)])return;if(!this[_0x65214(0x19b)][_0x65214(0x236)]())return;const _0x26fe8a=[this['_battler']],_0x49ede2=this[_0x65214(0x26b)](),_0x541a11=this[_0x65214(0x19b)][_0x65214(0x14f)]()&&_0x56da2e[_0x65214(0x178)],_0x3e3b16=_0x1176fe[_0x65214(0x2af)];_0x3338ba[_0x65214(0x17e)](_0x26fe8a,_0x49ede2,_0x541a11,_0x3e3b16);}}else{const _0x53fcdd=_0x469e6a[_0x65214(0x29d)](this['_targetIndex']);return _0x53fcdd[_0x65214(0x148)](this['item']()[_0x65214(0x195)])?[_0x53fcdd]:[_0x469e6a[_0x65214(0x1ea)]()];}},Game_Action[_0x515139(0x1bf)][_0x515139(0x1c6)]=function(){const _0x435706=_0x515139;if(this[_0x435706(0x283)]()['scope']!==0x1)return![];if(this[_0x435706(0x117)]>=0x0)return![];if(DataManager[_0x435706(0x252)](this[_0x435706(0x283)]()))return![];if(this[_0x435706(0x175)]()[_0x435706(0x12e)]())return![];if(DataManager[_0x435706(0x18b)](this[_0x435706(0x283)]()))return!![];if(this['subject']()[_0x435706(0x18b)]())return!![];return BattleManager['isTargetHighestTGR']();},VisuMZ[_0x515139(0x258)][_0x515139(0x1e2)]=Game_Action[_0x515139(0x1bf)][_0x515139(0x131)],Game_Action['prototype'][_0x515139(0x131)]=function(){const _0x58a47e=_0x515139;VisuMZ[_0x58a47e(0x258)][_0x58a47e(0x1e2)]['call'](this),this[_0x58a47e(0x10a)]();},Game_Action[_0x515139(0x1bf)][_0x515139(0x10a)]=function(){const _0x410145=_0x515139,_0x2b181c=this[_0x410145(0x283)]()[_0x410145(0x1ae)];if(_0x2b181c['match'](/<(?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT): ([\+\-]\d+)>/i)){if(_0x410145(0x274)!==_0x410145(0x274))return![];else{const _0x5df024=Number(RegExp['$1']);this[_0x410145(0x175)]()[_0x410145(0x153)](_0x5df024);}}if(_0x2b181c[_0x410145(0x293)](/<JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>\s*([\s\S]*)\s*<\/JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>/i)){const _0x10296b=String(RegExp['$1']);window[_0x410145(0x105)]=this['subject'](),window[_0x410145(0x283)]=this['item'](),window['a']=this[_0x410145(0x175)](),window['b']=a;let _0x485020=user[_0x410145(0x234)]();try{if(_0x410145(0x1d2)!=='WPBfU')return _0x410145(0x28d)[_0x410145(0x276)](_0xda6206[_0x410145(0x2a4)]());else eval(_0x10296b);}catch(_0x19e5fe){if(_0x410145(0x24a)!==_0x410145(0x24a))this['initialize'](...arguments);else{if($gameTemp[_0x410145(0x2a6)]())console[_0x410145(0x27a)](_0x19e5fe);}}user[_0x410145(0x21c)](_0x485020),window['user']=undefined,window[_0x410145(0x17c)]=undefined,window['item']=undefined,window['a']=undefined,window['b']=undefined;}},VisuMZ['AggroControlSystem'][_0x515139(0x27d)]=Game_Action[_0x515139(0x1bf)][_0x515139(0x1b5)],Game_Action['prototype'][_0x515139(0x1b5)]=function(_0x53d656){const _0x250e7a=_0x515139;VisuMZ[_0x250e7a(0x258)][_0x250e7a(0x27d)]['call'](this,_0x53d656),this[_0x250e7a(0x189)](_0x53d656);},Game_Action['prototype'][_0x515139(0x189)]=function(_0x5cfce1){const _0x144d5f=_0x515139;if(!this[_0x144d5f(0x283)]())return;if(!SceneManager[_0x144d5f(0x1a5)]())return;const _0x4ef861=this[_0x144d5f(0x283)]()[_0x144d5f(0x1ae)];if(_0x4ef861[_0x144d5f(0x293)](/<TARGET (?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)){if(_0x144d5f(0x1d4)!=='pJjbl'){const _0x1b712f=this[_0x144d5f(0x1f2)][_0x144d5f(0x19b)];if(!_0x1b712f)this[_0x144d5f(0x146)]=0x0;else _0x1b712f[_0x144d5f(0x12b)]()&&_0x1b712f[_0x144d5f(0x11c)]()?this[_0x144d5f(0x146)]=0xff:this[_0x144d5f(0x146)]=0x0;}else{const _0x48f8ec=Number(RegExp['$1']);_0x5cfce1[_0x144d5f(0x153)](_0x48f8ec);}}if(_0x4ef861['match'](/<JS TARGET (?:AGGRO|ENMITY|THREAT)>\s*([\s\S]*)\s*<\/JS TARGET (?:AGGRO|ENMITY|THREAT)>/i)){if(_0x144d5f(0x1a0)!=='jjEfb'){if(!this['_provokeContainer'])return;if(!this['_damageContainer'])return;this[_0x144d5f(0x159)]['x']=this[_0x144d5f(0x250)]['x'],this[_0x144d5f(0x159)]['y']=this[_0x144d5f(0x250)]['y'];}else{const _0x23c95d=String(RegExp['$1']);window[_0x144d5f(0x105)]=this[_0x144d5f(0x175)](),window[_0x144d5f(0x17c)]=_0x5cfce1,window[_0x144d5f(0x283)]=this[_0x144d5f(0x283)](),window['a']=this[_0x144d5f(0x175)](),window['b']=_0x5cfce1;let _0x4fadb0=_0x5cfce1[_0x144d5f(0x234)]();try{if(_0x144d5f(0x119)===_0x144d5f(0x119))eval(_0x23c95d);else{const _0x3b9cdf=_0x1beae2[_0x144d5f(0x210)]?0x4:0x3,_0x4994e9=_0x3b9cdf*0x80+(_0x3b9cdf-0x1)*0x8+0x4,_0x59216c=this[_0x144d5f(0x14b)](_0x9194f9);let _0x13a7f3=_0x38647e['x']+this['padding'];_0x34f21a[_0x144d5f(0x1ec)][_0x144d5f(0x188)]['BattleLayout'][_0x144d5f(0x255)]?_0x13a7f3=_0x4b7384['x']+_0x129a82[_0x144d5f(0x2aa)]+0x8:_0x13a7f3+=_0x3bc31f[_0x144d5f(0x22c)],_0x2c8021=_0x30055a[_0x144d5f(0x1d3)](_0x106aa6[_0x144d5f(0x24c)](_0x5e069c['x']+_0x4dd232[_0x144d5f(0x181)]-_0x4994e9,_0x13a7f3)),_0x1d1051-=0x4;}}catch(_0x522e49){if(_0x144d5f(0x29f)===_0x144d5f(0x29f)){if($gameTemp[_0x144d5f(0x2a6)]())console[_0x144d5f(0x27a)](_0x522e49);}else this[_0x144d5f(0x1b9)](),this[_0x144d5f(0x137)]();}_0x5cfce1[_0x144d5f(0x21c)](_0x4fadb0),window[_0x144d5f(0x105)]=undefined,window['target']=undefined,window[_0x144d5f(0x283)]=undefined,window['a']=undefined,window['b']=undefined;}}},VisuMZ[_0x515139(0x258)][_0x515139(0x15c)]=Game_Action[_0x515139(0x1bf)][_0x515139(0x16c)],Game_Action[_0x515139(0x1bf)][_0x515139(0x16c)]=function(_0x3777d2,_0x3b4b83){const _0x51ffaf=_0x515139;VisuMZ[_0x51ffaf(0x258)]['Game_Action_executeHpDamage'][_0x51ffaf(0x27e)](this,_0x3777d2,_0x3b4b83),this['executeHpDamageAggroControl'](_0x3777d2,_0x3b4b83);},Game_Action['prototype']['executeHpDamageAggroControl']=function(_0x406f32,_0x3b827a){const _0xbb4f3e=_0x515139,_0x480b81=VisuMZ['AggroControlSystem'][_0xbb4f3e(0x188)][_0xbb4f3e(0x158)];if(_0x3b827a>0x0&&_0x406f32['isActor']()!==this['subject']()[_0xbb4f3e(0x14f)]()){const _0x5c165e=_0x480b81['AggroPerDmg'];this[_0xbb4f3e(0x175)]()[_0xbb4f3e(0x153)](_0x5c165e*_0x3b827a);}if(_0x3b827a<0x0&&_0x406f32[_0xbb4f3e(0x14f)]()===this['subject']()['isActor']()){const _0x5f18ac=_0x480b81[_0xbb4f3e(0x246)];this[_0xbb4f3e(0x175)]()[_0xbb4f3e(0x153)](_0x5f18ac*Math['abs'](_0x3b827a));}},VisuMZ[_0x515139(0x258)][_0x515139(0x184)]=Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x19e)],Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x19e)]=function(){const _0x19595d=_0x515139;this[_0x19595d(0x232)]={},VisuMZ[_0x19595d(0x258)][_0x19595d(0x184)]['call'](this),this[_0x19595d(0x199)]();},Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x199)]=function(){const _0x5544ef=_0x515139;this[_0x5544ef(0x1b9)](),this[_0x5544ef(0x137)]();},Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x1b9)]=function(){const _0x4eb917=_0x515139;this[_0x4eb917(0x1c9)]={};},VisuMZ[_0x515139(0x258)][_0x515139(0x10c)]=Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x10d)],Game_BattlerBase['prototype'][_0x515139(0x10d)]=function(){const _0x55831e=_0x515139;this[_0x55831e(0x232)]={},VisuMZ['AggroControlSystem']['Game_BattlerBase_refresh'][_0x55831e(0x27e)](this);},Game_BattlerBase[_0x515139(0x1bf)]['checkCacheKey']=function(_0x42341f){const _0x16a56c=_0x515139;return this[_0x16a56c(0x232)]=this[_0x16a56c(0x232)]||{},this['_cache'][_0x42341f]!==undefined;},Game_BattlerBase[_0x515139(0x1bf)]['provoker']=function(){const _0x41086f=_0x515139;for(const _0x15745b of this[_0x41086f(0x297)]()){if(_0x41086f(0x191)===_0x41086f(0x191)){if(DataManager[_0x41086f(0x17b)](_0x15745b)){if(this['_provoker']===undefined)this[_0x41086f(0x1b9)]();const _0x400ccb=this['_provoker'][_0x15745b['id']],_0xd23b90=BattleManager['convertStringToBattleTarget'](_0x400ccb);if(_0xd23b90&&_0xd23b90[_0x41086f(0x12b)]())return _0xd23b90;}}else _0xad610f[_0x41086f(0x258)][_0x41086f(0x26c)]['call'](this),this[_0x41086f(0x1eb)]();}return null;},Game_BattlerBase['prototype'][_0x515139(0x13d)]=function(){const _0x170bae=_0x515139;return!!this[_0x170bae(0x11c)]();},Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x162)]=function(){const _0x53f8f6=_0x515139;return this[_0x53f8f6(0x13b)]()['some'](_0xc87cd5=>_0xc87cd5&&_0xc87cd5['note'][_0x53f8f6(0x293)](/<BYPASS PROVOKE>/i));},Game_BattlerBase['prototype'][_0x515139(0x1cc)]=function(){const _0x15becc=_0x515139;let _0xbb8361='provokeHeightOrigin';if(this[_0x15becc(0x23c)](_0xbb8361))return this[_0x15becc(0x232)][_0xbb8361];return this['_cache'][_0xbb8361]=this[_0x15becc(0x19a)](),this['_cache'][_0xbb8361];},Game_BattlerBase['prototype']['createProvokeHeightOrigin']=function(){const _0x4ddf53=_0x515139,_0x696fe5=this[_0x4ddf53(0x14f)]()?this[_0x4ddf53(0x14b)]()[_0x4ddf53(0x1ae)]:this['isEnemy']()?this['enemy']()[_0x4ddf53(0x1ae)]:'';if(_0x696fe5[_0x4ddf53(0x293)](/<PROVOKE HEIGHT ORIGIN: (\d+)([%％])>/i))return _0x4ddf53(0x1bd)!==_0x4ddf53(0x26d)?Number(RegExp['$1'])*0.01:_0x4fc6db['AggroControlSystem'][_0x4ddf53(0x16a)][_0x4ddf53(0x27e)](this,_0xd80b51);return VisuMZ['AggroControlSystem']['Settings'][_0x4ddf53(0x144)]['HeightOrigin'];},Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x148)]=function(_0x5a5ed6){const _0x5afee7=_0x515139;switch(_0x5a5ed6){case Game_Action[_0x5afee7(0x150)]:return this[_0x5afee7(0x1c7)]();break;case Game_Action[_0x5afee7(0x2a8)]:return this[_0x5afee7(0x1ff)]();break;case Game_Action[_0x5afee7(0x1d0)]:return this['certainHitTaunt']();break;}},Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x236)]=function(){const _0x1e6b7d=_0x515139;return this['physicalTaunt']()||this['magicalTaunt']()||this[_0x1e6b7d(0x15a)]();},Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x1c7)]=function(){const _0x936f30=_0x515139;return this[_0x936f30(0x13b)]()[_0x936f30(0x1e1)](_0x38aebf=>_0x38aebf&&_0x38aebf[_0x936f30(0x1ae)][_0x936f30(0x293)](/<(?:TAUNT|PHYSICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x1ff)]=function(){const _0x3b6741=_0x515139;return this['traitObjects']()[_0x3b6741(0x1e1)](_0x4e2a1d=>_0x4e2a1d&&_0x4e2a1d[_0x3b6741(0x1ae)]['match'](/<(?:TAUNT|MAGICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x15a)]=function(){const _0x373dfd=_0x515139;return this['traitObjects']()[_0x373dfd(0x1e1)](_0x2312c6=>_0x2312c6&&_0x2312c6['note'][_0x373dfd(0x293)](/<(?:TAUNT|CERTAIN TAUNT|CERTAIN HIT TAUNT|ALL TAUNT)>/i));},Game_BattlerBase['prototype']['bypassTaunt']=function(){const _0x5c94ca=_0x515139;return this[_0x5c94ca(0x13b)]()[_0x5c94ca(0x1e1)](_0x445d18=>_0x445d18&&_0x445d18[_0x5c94ca(0x1ae)][_0x5c94ca(0x293)](/<BYPASS TAUNT>/i));},Game_BattlerBase['prototype']['clearAggro']=function(){const _0xb12341=_0x515139;this[_0xb12341(0x1ac)]=0x1;},VisuMZ[_0x515139(0x258)][_0x515139(0x10b)]=Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x15e)],Game_BattlerBase['prototype'][_0x515139(0x15e)]=function(_0x19b5d6){const _0x375b52=_0x515139;let _0x1116f3=VisuMZ['AggroControlSystem'][_0x375b52(0x10b)][_0x375b52(0x27e)](this,_0x19b5d6);if(_0x19b5d6===0x0){if(this[_0x375b52(0x1ac)]===undefined)this[_0x375b52(0x137)]();_0x1116f3*=this[_0x375b52(0x19c)]();}return _0x1116f3;},Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x21c)]=function(_0xba1441){const _0x1bdb94=_0x515139;if(this[_0x1bdb94(0x1ac)]===undefined)this[_0x1bdb94(0x137)]();this[_0x1bdb94(0x1ac)]=Math[_0x1bdb94(0x21a)](0x1,Math[_0x1bdb94(0x1d3)](this[_0x1bdb94(0x1ac)]));},Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x153)]=function(_0x46834e){const _0x46f01c=_0x515139;if(this['_aggro']===undefined)this[_0x46f01c(0x137)]();this[_0x46f01c(0x1ac)]=Math[_0x46f01c(0x21a)](0x1,this[_0x46f01c(0x1ac)]+Math['round'](_0x46834e));},Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x23f)]=function(_0x470c6c){this['gainAggro'](-_0x470c6c);},Game_BattlerBase['prototype']['aggro']=function(){const _0x447444=_0x515139;if(this[_0x447444(0x203)]())return 0x0;return this[_0x447444(0x24f)]()*this[_0x447444(0x125)]();},Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x234)]=function(){const _0x22c152=_0x515139;return this[_0x22c152(0x1ac)]===undefined&&this['clearAggro'](),this[_0x22c152(0x1ac)];},Game_BattlerBase['prototype'][_0x515139(0x24f)]=function(){const _0x474e09=_0x515139;return this[_0x474e09(0x13b)]()[_0x474e09(0x18f)]((_0xf69a0f,_0x1f9b5e)=>{const _0x3cc9d9=_0x474e09;return _0x1f9b5e&&_0x1f9b5e[_0x3cc9d9(0x1ae)][_0x3cc9d9(0x293)](/<(?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)?_0xf69a0f+Number(RegExp['$1'])/0x64:_0xf69a0f;},this[_0x474e09(0x234)]());},Game_BattlerBase[_0x515139(0x1bf)]['aggroMultiplier']=function(){return this['traitObjects']()['reduce']((_0x53ddda,_0x5cfaf6)=>{const _0xd4b548=_0x522f;if(_0xd4b548(0x219)!==_0xd4b548(0x1dd)){if(_0x5cfaf6&&_0x5cfaf6['note'][_0xd4b548(0x293)](/<(?:AGGRO|ENMITY|THREAT) MULTIPLIER: (\d+)%>/i)){if(_0xd4b548(0x2a9)==='rOOQA')_0xefc85e[_0xd4b548(0x258)][_0xd4b548(0x1e2)][_0xd4b548(0x27e)](this),this[_0xd4b548(0x10a)]();else return _0x53ddda+Number(RegExp['$1'])/0x64;}else return'qEDny'===_0xd4b548(0x1f3)?this[_0xd4b548(0x22f)]()?_0x528077['aggroGaugeColor1']():_0x5ba184['AggroControlSystem']['Sprite_Gauge_gaugeColor1'][_0xd4b548(0x27e)](this):_0x53ddda;}else{const _0x29543f=_0x2d4e99[_0xd4b548(0x258)][_0xd4b548(0x188)]['Aggro'];if(_0x240b86>0x0&&_0x30191f[_0xd4b548(0x14f)]()!==this['subject']()[_0xd4b548(0x14f)]()){const _0x5262f2=_0x29543f[_0xd4b548(0x1c5)];this['subject']()[_0xd4b548(0x153)](_0x5262f2*_0x108de4);}if(_0x335bfe<0x0&&_0x457703[_0xd4b548(0x14f)]()===this[_0xd4b548(0x175)]()[_0xd4b548(0x14f)]()){const _0x262fc2=_0x29543f[_0xd4b548(0x246)];this['subject']()['gainAggro'](_0x262fc2*_0x2aee4c['abs'](_0x456ce3));}}},0x1);},Game_BattlerBase[_0x515139(0x1bf)][_0x515139(0x12e)]=function(){const _0x1035ec=_0x515139;return this[_0x1035ec(0x13b)]()[_0x1035ec(0x1e1)](_0x3565a7=>_0x3565a7&&_0x3565a7[_0x1035ec(0x1ae)][_0x1035ec(0x293)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},Game_BattlerBase['prototype'][_0x515139(0x18b)]=function(){const _0x1d6123=_0x515139;return this['traitObjects']()['some'](_0x59010e=>_0x59010e&&_0x59010e[_0x1d6123(0x1ae)]['match'](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},VisuMZ[_0x515139(0x258)][_0x515139(0x240)]=Game_Battler[_0x515139(0x1bf)][_0x515139(0x1e9)],Game_Battler[_0x515139(0x1bf)][_0x515139(0x1e9)]=function(_0x62944b){const _0x1a9506=_0x515139;VisuMZ[_0x1a9506(0x258)][_0x1a9506(0x240)]['call'](this,_0x62944b),this['clearAggro']();},VisuMZ[_0x515139(0x258)][_0x515139(0x1de)]=Game_Battler[_0x515139(0x1bf)][_0x515139(0x20a)],Game_Battler['prototype']['onBattleEnd']=function(){const _0x46b631=_0x515139;VisuMZ[_0x46b631(0x258)][_0x46b631(0x1de)][_0x46b631(0x27e)](this),this[_0x46b631(0x137)]();},VisuMZ[_0x515139(0x258)][_0x515139(0x224)]=Game_Battler['prototype'][_0x515139(0x2a2)],Game_Battler[_0x515139(0x1bf)]['addState']=function(_0x451303){const _0x3a5fba=_0x515139;VisuMZ[_0x3a5fba(0x258)]['Game_Battler_addState'][_0x3a5fba(0x27e)](this,_0x451303),this['applyProvokeEffect'](_0x451303);},Game_Battler['prototype'][_0x515139(0x233)]=function(_0x55d7ff){const _0x53ae9d=_0x515139;if(this[_0x53ae9d(0x145)](_0x55d7ff)){if(this[_0x53ae9d(0x1c9)]===undefined)this['clearProvokers']();const _0x381c00=BattleManager[_0x53ae9d(0x216)](this);this[_0x53ae9d(0x1c9)][_0x55d7ff]=_0x381c00,!this['_provoker'][_0x55d7ff]&&(_0x53ae9d(0x2ad)===_0x53ae9d(0x197)?_0x1ccaf2(this[_0x53ae9d(0x280)][_0x53ae9d(0x28f)](this),0x3e8):delete this[_0x53ae9d(0x1c9)][_0x55d7ff]);}},VisuMZ[_0x515139(0x258)][_0x515139(0x1b0)]=BattleManager['invokeCounterAttack'],BattleManager[_0x515139(0x205)]=function(_0x2a5a3c,_0x6d4708){const _0x297da0=_0x515139;this[_0x297da0(0x229)]=_0x6d4708,VisuMZ['AggroControlSystem'][_0x297da0(0x1b0)]['call'](this,_0x2a5a3c,_0x6d4708),this[_0x297da0(0x229)]=undefined;},VisuMZ[_0x515139(0x258)]['BattleManager_invokeMagicReflection']=BattleManager[_0x515139(0x1c8)],BattleManager[_0x515139(0x1c8)]=function(_0x3dc172,_0xbf91e4){const _0xa5cdd6=_0x515139;this[_0xa5cdd6(0x229)]=_0xbf91e4,VisuMZ[_0xa5cdd6(0x258)][_0xa5cdd6(0x147)]['call'](this,_0x3dc172,_0xbf91e4),this[_0xa5cdd6(0x229)]=undefined;},Game_Unit[_0x515139(0x1bf)]['physicalTauntMembers']=function(){const _0x2b4858=_0x515139;return this['aliveMembers']()[_0x2b4858(0x263)](_0x5753f1=>_0x5753f1&&_0x5753f1[_0x2b4858(0x1c7)]());},Game_Unit[_0x515139(0x1bf)][_0x515139(0x267)]=function(){const _0x171541=_0x515139;return this[_0x171541(0x272)]()[_0x171541(0x263)](_0x5ba158=>_0x5ba158&&_0x5ba158[_0x171541(0x1ff)]());},Game_Unit[_0x515139(0x1bf)][_0x515139(0x21e)]=function(){const _0x25e479=_0x515139;return this[_0x25e479(0x272)]()[_0x25e479(0x263)](_0x46e308=>_0x46e308&&_0x46e308[_0x25e479(0x15a)]());},Game_Unit['prototype'][_0x515139(0x1ea)]=function(_0x52cfb3){const _0x5251cc=_0x515139;let _0x40654f=[];switch(_0x52cfb3){case Game_Action[_0x5251cc(0x150)]:_0x40654f=this['physicalTauntMembers']();break;case Game_Action[_0x5251cc(0x2a8)]:_0x40654f=this[_0x5251cc(0x267)]();break;case Game_Action[_0x5251cc(0x1d0)]:_0x40654f=this['certainHitTauntMembers']();break;}let _0xcec76=Math['random']()*this[_0x5251cc(0x11e)](_0x40654f),_0x376050=null;if(BattleManager[_0x5251cc(0x112)]()){if('sQxbp'!==_0x5251cc(0x1f6)){const _0x52d06b=!![];return this['findTgrMember'](_0x40654f,_0x52d06b);}else _0x44e70d-=_0x28a999['tgr'],_0x45a382<=0x0&&!_0x5a31ad&&(_0x295da0=_0x1c1f87);}else{if('zbFCv'!==_0x5251cc(0x135)){for(const _0x32b13e of _0x40654f){if(_0x5251cc(0x121)===_0x5251cc(0x121)){_0xcec76-=_0x32b13e['tgr'];if(_0xcec76<=0x0&&!_0x376050){if('ynzTz'===_0x5251cc(0x10f))return[_0x28f13c['highestTgrMember']()];else _0x376050=_0x32b13e;}}else{if(!_0x5e7ce4[_0x5251cc(0x1a1)]())return;_0x137d6e[_0x5251cc(0x180)](_0x2fd462,_0x4e3041);const _0x4d5013=_0x1120ea[_0x5251cc(0x14b)](_0x503a57[_0x5251cc(0x174)]),_0x367acc=_0x44fbf8[_0x5251cc(0x158)];if(_0x4d5013)_0x4d5013[_0x5251cc(0x21c)](_0x367acc);}}return _0x376050||this[_0x5251cc(0x103)]();}else return this[_0x5251cc(0x22f)]()?this[_0x5251cc(0x100)]():_0x45b606['AggroControlSystem'][_0x5251cc(0x193)]['call'](this);}},Game_Unit[_0x515139(0x1bf)][_0x515139(0x11e)]=function(_0x2579e4){const _0x2b863f=_0x515139;return _0x2579e4[_0x2b863f(0x18f)]((_0x396f31,_0x48491a)=>_0x396f31+_0x48491a[_0x2b863f(0x15f)],0x0);},Game_Unit['prototype'][_0x515139(0x1be)]=function(){const _0x148419=_0x515139,_0x247619=this[_0x148419(0x272)]()['map'](_0x1980a1=>_0x1980a1[_0x148419(0x15f)]);return Math[_0x148419(0x21a)](..._0x247619);},Game_Unit[_0x515139(0x1bf)][_0x515139(0x11d)]=function(){const _0x3f0a59=_0x515139,_0x54c290=this[_0x3f0a59(0x272)]()[_0x3f0a59(0x18a)](_0x4994b5=>_0x4994b5[_0x3f0a59(0x15f)]);return Math[_0x3f0a59(0x24c)](..._0x54c290);},Game_Unit[_0x515139(0x1bf)][_0x515139(0x249)]=function(){const _0xfdc848=_0x515139;this[_0xfdc848(0x182)]=undefined,this['_lowestTgrMember']=undefined;},Game_Unit[_0x515139(0x1bf)][_0x515139(0x1f0)]=function(){const _0x5d687d=_0x515139;if(!this['_highestTgrMember']){if('ngagH'===_0x5d687d(0x25e)){const _0x385ab6=this[_0x5d687d(0x1be)](),_0x91480=this[_0x5d687d(0x272)]()['filter'](_0x24a921=>_0x24a921[_0x5d687d(0x15f)]===_0x385ab6);this[_0x5d687d(0x182)]=_0x91480[Math['randomInt'](_0x91480[_0x5d687d(0x14a)])]||this[_0x5d687d(0x103)]();}else _0x559c05[_0x5d687d(0x1bf)][_0x5d687d(0x128)][_0x5d687d(0x27e)](this),this[_0x5d687d(0x1d6)](),this[_0x5d687d(0x19f)](),this[_0x5d687d(0x239)](),this['updateChildrenOpacity']();}return this['_highestTgrMember'];},Game_Unit[_0x515139(0x1bf)][_0x515139(0x167)]=function(){const _0x1d311d=_0x515139;if(!this[_0x1d311d(0x12c)]){if(_0x1d311d(0x194)===_0x1d311d(0x194)){const _0x18efc0=this[_0x1d311d(0x11d)](),_0x46c346=this[_0x1d311d(0x272)]()['filter'](_0x275c76=>_0x275c76[_0x1d311d(0x15f)]===_0x18efc0);this['_lowestTgrMember']=_0x46c346[Math[_0x1d311d(0x126)](_0x46c346[_0x1d311d(0x14a)])]||this[_0x1d311d(0x103)]();}else _0x23e4b4['AggroControlSystem'][_0x1d311d(0x212)][_0x1d311d(0x27e)](this),this[_0x1d311d(0x251)]();}return this[_0x1d311d(0x12c)];},VisuMZ[_0x515139(0x258)]['BattleManager_endAction']=BattleManager[_0x515139(0x220)],BattleManager[_0x515139(0x220)]=function(){const _0x44e4f6=_0x515139;VisuMZ[_0x44e4f6(0x258)][_0x44e4f6(0x1a7)][_0x44e4f6(0x27e)](this),$gameParty[_0x44e4f6(0x249)](),$gameTroop['clearTgrCache']();},Game_Unit[_0x515139(0x1bf)][_0x515139(0x11f)]=function(_0x5ee6dc,_0x53c623){const _0x44b815=_0x515139,_0x3086b4=_0x5ee6dc['map'](_0x12e5e2=>_0x12e5e2[_0x44b815(0x15f)]),_0xf79e28=_0x53c623?Math[_0x44b815(0x21a)](..._0x3086b4):Math[_0x44b815(0x24c)](..._0x3086b4),_0x23235a=_0x5ee6dc['filter'](_0x56f184=>_0x56f184[_0x44b815(0x15f)]===_0xf79e28);return _0x23235a[Math[_0x44b815(0x126)](_0x23235a['length'])]||this[_0x44b815(0x103)]();},VisuMZ[_0x515139(0x258)][_0x515139(0x286)]=Scene_Options[_0x515139(0x1bf)][_0x515139(0x201)],Scene_Options[_0x515139(0x1bf)][_0x515139(0x201)]=function(){const _0x376ba9=_0x515139;let _0x21676c=VisuMZ['AggroControlSystem'][_0x376ba9(0x286)][_0x376ba9(0x27e)](this);const _0x194339=VisuMZ[_0x376ba9(0x258)][_0x376ba9(0x188)];if(_0x194339[_0x376ba9(0x144)][_0x376ba9(0x1b8)]&&_0x194339[_0x376ba9(0x144)][_0x376ba9(0x1d5)])_0x21676c++;if(_0x194339['Aggro'][_0x376ba9(0x1b8)]&&_0x194339[_0x376ba9(0x158)][_0x376ba9(0x1d5)])_0x21676c++;return _0x21676c;},Sprite_Battler[_0x515139(0x1df)]=VisuMZ[_0x515139(0x258)][_0x515139(0x188)]['Taunt'][_0x515139(0x207)],Sprite_Battler[_0x515139(0x2a3)]=VisuMZ[_0x515139(0x258)][_0x515139(0x188)][_0x515139(0x268)]['AniPhysical'],Sprite_Battler['_magicalTauntAnimation']=VisuMZ[_0x515139(0x258)][_0x515139(0x188)][_0x515139(0x268)][_0x515139(0x113)],Sprite_Battler['_certainHitTauntAnimation']=VisuMZ[_0x515139(0x258)][_0x515139(0x188)][_0x515139(0x268)][_0x515139(0x1e4)],Sprite_Battler[_0x515139(0x178)]=VisuMZ[_0x515139(0x258)][_0x515139(0x188)][_0x515139(0x268)][_0x515139(0x1e0)],Sprite_Battler[_0x515139(0x2af)]=VisuMZ[_0x515139(0x258)][_0x515139(0x188)][_0x515139(0x268)][_0x515139(0x271)],VisuMZ[_0x515139(0x258)]['Sprite_Battler_initialize']=Sprite_Battler[_0x515139(0x1bf)][_0x515139(0x25d)],Sprite_Battler[_0x515139(0x1bf)][_0x515139(0x25d)]=function(_0x90b435){const _0x149353=_0x515139;VisuMZ['AggroControlSystem'][_0x149353(0x168)][_0x149353(0x27e)](this,_0x90b435),this[_0x149353(0x13c)]()&&setTimeout(this['createProvokeSprite'][_0x149353(0x28f)](this),0x3e8);},VisuMZ[_0x515139(0x258)][_0x515139(0x11b)]=Sprite_Battler[_0x515139(0x1bf)][_0x515139(0x19e)],Sprite_Battler[_0x515139(0x1bf)][_0x515139(0x19e)]=function(){const _0x58b581=_0x515139;VisuMZ[_0x58b581(0x258)]['Sprite_Battler_initMembers']['call'](this),this[_0x58b581(0x107)]();},Sprite_Battler[_0x515139(0x1bf)][_0x515139(0x107)]=function(){const _0x2b4a23=_0x515139;this[_0x2b4a23(0x1f9)]=VisuMZ[_0x2b4a23(0x258)][_0x2b4a23(0x188)][_0x2b4a23(0x268)][_0x2b4a23(0x207)],this[_0x2b4a23(0x1ee)]=[_0x2b4a23(0x12d),_0x2b4a23(0x298),_0x2b4a23(0x123)];},Sprite_Battler['prototype']['isShowPriorityLines']=function(){const _0x11f3ed=_0x515139;if(!Imported[_0x11f3ed(0x1ce)])return![];if(![Sprite_Actor,Sprite_Enemy]['includes'](this['constructor']))return![];return ConfigManager[_0x11f3ed(0x206)]&&VisuMZ[_0x11f3ed(0x258)][_0x11f3ed(0x188)][_0x11f3ed(0x144)][_0x11f3ed(0x111)];},Sprite_Battler[_0x515139(0x1bf)]['createProvokeSprite']=function(){const _0x3894d0=_0x515139;if(!SceneManager[_0x3894d0(0x1a5)]())return;this[_0x3894d0(0x1a6)]=new Sprite_ProvokeTrail(this),this[_0x3894d0(0x1a6)][_0x3894d0(0x120)]()[_0x3894d0(0x253)](this[_0x3894d0(0x1a6)]);},VisuMZ[_0x515139(0x258)][_0x515139(0x151)]=Sprite_Battler[_0x515139(0x1bf)][_0x515139(0x140)],Sprite_Battler[_0x515139(0x1bf)][_0x515139(0x140)]=function(_0x2a9e70){const _0xdc1e15=_0x515139;VisuMZ[_0xdc1e15(0x258)]['Sprite_Battler_setBattler'][_0xdc1e15(0x27e)](this,_0x2a9e70);if(this[_0xdc1e15(0x284)])this[_0xdc1e15(0x284)][_0xdc1e15(0x19b)]=_0x2a9e70;},VisuMZ[_0x515139(0x258)][_0x515139(0x294)]=Sprite_Battler[_0x515139(0x1bf)][_0x515139(0x128)],Sprite_Battler[_0x515139(0x1bf)][_0x515139(0x128)]=function(){const _0x518c30=_0x515139;VisuMZ[_0x518c30(0x258)]['Sprite_Battler_update'][_0x518c30(0x27e)](this),this[_0x518c30(0x1c1)]();},Sprite_Battler[_0x515139(0x1bf)][_0x515139(0x1c1)]=function(){const _0x167639=_0x515139;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!Imported[_0x167639(0x1ce)])return;if(!VisuMZ[_0x167639(0x258)]['Settings'][_0x167639(0x268)][_0x167639(0x226)])return;if(!this[_0x167639(0x19b)])return;this[_0x167639(0x1f9)]--;if(this['_tauntAnimationTimer']<=0x0){if(_0x167639(0x296)===_0x167639(0x18d))return _0x158166[_0x167639(0x235)]();else this[_0x167639(0x170)]();}},Sprite_Battler[_0x515139(0x1bf)][_0x515139(0x170)]=function(){const _0x3fa189=_0x515139;this[_0x3fa189(0x1f9)]=Sprite_Battler['_animationCycleTime'];if(!this[_0x3fa189(0x19b)])return;if(!this[_0x3fa189(0x19b)]['taunting']())return;const _0x30b700=[this[_0x3fa189(0x19b)]],_0x572711=this[_0x3fa189(0x26b)](),_0xce8d1c=this[_0x3fa189(0x19b)]['isActor']()&&Sprite_Battler[_0x3fa189(0x178)],_0x18ff26=Sprite_Battler['_muteTauntAnimations'];$gameTemp[_0x3fa189(0x17e)](_0x30b700,_0x572711,_0xce8d1c,_0x18ff26);},Sprite_Battler[_0x515139(0x1bf)][_0x515139(0x26b)]=function(){const _0x20d655=_0x515139;let _0x3fc735=this[_0x20d655(0x1ee)][_0x20d655(0x14a)];while(_0x3fc735){if(_0x20d655(0x1ab)==='fsszm')_0x2ac648['AggroControlSystem'][_0x20d655(0x1a7)][_0x20d655(0x27e)](this),_0x361924['clearTgrCache'](),_0x334c9f[_0x20d655(0x249)]();else{const _0x403844=this['_tauntAnimationCycle'][_0x20d655(0x155)]();this['_tauntAnimationCycle'][_0x20d655(0x1fe)](_0x403844);const _0x5206c8=_0x20d655(0x292)[_0x20d655(0x276)](_0x403844);if(this['_battler'][_0x5206c8]()){if(_0x20d655(0x1a8)!==_0x20d655(0x1a8))this[_0x20d655(0x253)](this[_0x20d655(0x159)]);else{const _0x3978f8=_0x20d655(0x19d)[_0x20d655(0x276)](_0x403844),_0x334efb=Sprite_Battler[_0x3978f8];if(_0x334efb)return _0x334efb;}}_0x3fc735--;}}return Sprite_Battler[_0x20d655(0x279)];},VisuMZ[_0x515139(0x258)][_0x515139(0x1bb)]=Sprite_Actor[_0x515139(0x1bf)][_0x515139(0x22d)],Sprite_Actor['prototype'][_0x515139(0x22d)]=function(){const _0x4c1efa=_0x515139;VisuMZ[_0x4c1efa(0x258)][_0x4c1efa(0x1bb)][_0x4c1efa(0x27e)](this),this[_0x4c1efa(0x1b6)]();},Sprite_Actor[_0x515139(0x1bf)][_0x515139(0x1b6)]=function(){const _0x3e581e=_0x515139;if(this[_0x3e581e(0x20e)]!==Sprite_Actor)return;if(!this[_0x3e581e(0x1fd)]())return;if(!SceneManager[_0x3e581e(0x1a5)]())return;const _0x49f746=VisuMZ['AggroControlSystem'][_0x3e581e(0x188)][_0x3e581e(0x158)],_0xd0d850=new Sprite_Gauge();_0xd0d850['anchor']['x']=_0x49f746['AnchorX'],_0xd0d850[_0x3e581e(0x22e)]['y']=_0x49f746[_0x3e581e(0x17a)];const _0x2ec07b=Sprite_Gauge['prototype'][_0x3e581e(0x28c)]();_0xd0d850['scale']['x']=_0xd0d850['scale']['y']=_0x49f746['Scale'],this['_aggroGaugeSprite']=_0xd0d850,this['addChild'](_0xd0d850);},Sprite_Actor[_0x515139(0x1bf)]['isAggroGaugeVisible']=function(){const _0x42f109=_0x515139;if(Imported['VisuMZ_1_BattleCore']&&this[_0x42f109(0x20e)]===Sprite_SvEnemy)return![];return ConfigManager['aggroGauge']&&VisuMZ[_0x42f109(0x258)]['Settings'][_0x42f109(0x158)][_0x42f109(0x277)];},VisuMZ[_0x515139(0x258)]['Sprite_Actor_update']=Sprite_Actor['prototype'][_0x515139(0x128)],Sprite_Actor[_0x515139(0x1bf)]['update']=function(){const _0x301310=_0x515139;VisuMZ['AggroControlSystem'][_0x301310(0x177)][_0x301310(0x27e)](this),this[_0x301310(0x143)]();},Sprite_Actor[_0x515139(0x1bf)][_0x515139(0x143)]=function(){const _0xc6b54c=_0x515139;if(!this[_0xc6b54c(0x19b)])return;if(!this[_0xc6b54c(0x284)])return;const _0x5ecdd8=VisuMZ[_0xc6b54c(0x258)][_0xc6b54c(0x188)][_0xc6b54c(0x158)],_0x3ed9e1=this[_0xc6b54c(0x284)];let _0x9a69f9=_0x5ecdd8['OffsetX'];this['_battler'][_0xc6b54c(0x221)]&&(_0x9a69f9+=this[_0xc6b54c(0x19b)][_0xc6b54c(0x221)]());let _0x43a3eb=_0x5ecdd8[_0xc6b54c(0x269)];this[_0xc6b54c(0x19b)][_0xc6b54c(0x108)]&&(_0xc6b54c(0x287)!==_0xc6b54c(0x28b)?_0x43a3eb+=this[_0xc6b54c(0x19b)][_0xc6b54c(0x108)]():this[_0xc6b54c(0x137)]()),_0x3ed9e1['x']=_0x9a69f9,_0x3ed9e1['y']=-this['height']+_0x43a3eb,this[_0xc6b54c(0x19b)]&&_0x3ed9e1['_statusType']!=='aggro'&&(_0x3ed9e1[_0xc6b54c(0x171)]=!![],_0x3ed9e1[_0xc6b54c(0x1cd)](this[_0xc6b54c(0x19b)],_0xc6b54c(0x19c))),this[_0xc6b54c(0x13a)]['x']<0x0&&(_0xc6b54c(0x1d9)!==_0xc6b54c(0x23a)?_0x3ed9e1[_0xc6b54c(0x13a)]['x']=-Math[_0xc6b54c(0x29b)](_0x3ed9e1[_0xc6b54c(0x13a)]['x']):(_0x2bfe96[_0xc6b54c(0x258)][_0xc6b54c(0x152)][_0xc6b54c(0x27e)](this),this[_0xc6b54c(0x1e6)]()));},Sprite_Gauge[_0x515139(0x1bf)][_0x515139(0x22f)]=function(){const _0x4401f7=_0x515139;return this[_0x4401f7(0x19b)]&&this['_statusType']===_0x4401f7(0x19c);},VisuMZ['AggroControlSystem'][_0x515139(0x238)]=Sprite_Gauge[_0x515139(0x1bf)][_0x515139(0x192)],Sprite_Gauge['prototype']['gaugeX']=function(){const _0x5903df=_0x515139;return this[_0x5903df(0x22f)]()?0x0:VisuMZ[_0x5903df(0x258)]['Sprite_Gauge_gaugeX'][_0x5903df(0x27e)](this);},VisuMZ['AggroControlSystem'][_0x515139(0x134)]=Sprite_Gauge[_0x515139(0x1bf)][_0x515139(0x202)],Sprite_Gauge[_0x515139(0x1bf)]['gaugeRate']=function(){const _0xaae397=_0x515139;let _0x35e3be=VisuMZ[_0xaae397(0x258)][_0xaae397(0x134)][_0xaae397(0x27e)](this);if(this[_0xaae397(0x22f)]()&&this[_0xaae397(0x19b)]){if(this[_0xaae397(0x19b)][_0xaae397(0x203)]())return 0x0;if(this[_0xaae397(0x19b)][_0xaae397(0x12b)]()&&this[_0xaae397(0x19b)]['friendsUnit']()[_0xaae397(0x272)]()['length']===0x1)return 0x1;}return _0x35e3be[_0xaae397(0x1a2)](0x0,0x1);},VisuMZ[_0x515139(0x258)][_0x515139(0x149)]=Sprite_Gauge[_0x515139(0x1bf)][_0x515139(0x2a0)],Sprite_Gauge[_0x515139(0x1bf)][_0x515139(0x2a0)]=function(){const _0x1e8701=_0x515139;return this[_0x1e8701(0x22f)]()?this[_0x1e8701(0x211)]():VisuMZ[_0x1e8701(0x258)][_0x1e8701(0x149)][_0x1e8701(0x27e)](this);},Sprite_Gauge['prototype']['currentValueAggroControl']=function(){const _0x7d117e=_0x515139,_0x4fb93f=this[_0x7d117e(0x19b)][_0x7d117e(0x165)](),_0x423c62=this[_0x7d117e(0x19b)][_0x7d117e(0x15f)]-_0x4fb93f[_0x7d117e(0x11d)](),_0x3a4370=_0x4fb93f['tgrMax']()-_0x4fb93f[_0x7d117e(0x11d)]();if(_0x423c62>=_0x3a4370)return 0x64;return _0x423c62/Math[_0x7d117e(0x21a)](_0x3a4370,0x1)*0x64;},VisuMZ[_0x515139(0x258)][_0x515139(0x193)]=Sprite_Gauge[_0x515139(0x1bf)][_0x515139(0x1fa)],Sprite_Gauge['prototype'][_0x515139(0x1fa)]=function(){const _0x57f75e=_0x515139;return this[_0x57f75e(0x22f)]()?_0x57f75e(0x14c)!==_0x57f75e(0x14c)?_0x485cf8[_0x57f75e(0x258)]['Settings'][_0x57f75e(0x144)]['PartsSize']/0x64:this['currentMaxValueAggroControl']():_0x57f75e(0x28a)===_0x57f75e(0x29c)?_0x26f8a7['AggroControlSystem'][_0x57f75e(0x188)]['Provoke']['Opacity']:VisuMZ[_0x57f75e(0x258)][_0x57f75e(0x193)][_0x57f75e(0x27e)](this);},Sprite_Gauge[_0x515139(0x1bf)][_0x515139(0x100)]=function(){return 0x64;},VisuMZ['AggroControlSystem'][_0x515139(0x262)]=Sprite_Gauge['prototype'][_0x515139(0x16f)],Sprite_Gauge['prototype'][_0x515139(0x16f)]=function(){const _0x582591=_0x515139;if(this[_0x582591(0x22f)]()){if(_0x582591(0x1b2)===_0x582591(0x198)){const _0x1757e0=this['isActor']()?this[_0x582591(0x14b)]()[_0x582591(0x1ae)]:this[_0x582591(0x1b1)]()?this[_0x582591(0x16e)]()[_0x582591(0x1ae)]:'';if(_0x1757e0[_0x582591(0x293)](/<PROVOKE HEIGHT ORIGIN: (\d+)([%％])>/i))return _0x1bd241(_0x40eea3['$1'])*0.01;return _0x2ee452[_0x582591(0x258)]['Settings'][_0x582591(0x144)]['HeightOrigin'];}else return ColorManager[_0x582591(0x114)]();}else{if('IBPWR'!==_0x582591(0x218)){if(!_0x3571e7[_0x582591(0x1a1)]())return;_0x182c3a[_0x582591(0x180)](_0x117c2d,_0xa1a6a7);const _0x2b845c=_0x3e9349[_0x582591(0x160)]()[_0x31e470[_0x582591(0x21b)]],_0x5e8cbd=_0x272fc2[_0x582591(0x158)];if(_0x2b845c)_0x2b845c[_0x582591(0x21c)](_0x5e8cbd);}else return VisuMZ['AggroControlSystem'][_0x582591(0x262)][_0x582591(0x27e)](this);}},VisuMZ[_0x515139(0x258)][_0x515139(0x133)]=Sprite_Gauge[_0x515139(0x1bf)][_0x515139(0x101)],Sprite_Gauge[_0x515139(0x1bf)]['gaugeColor2']=function(){const _0x2304d0=_0x515139;if(this['isAggroType']()){if('yyHrK'!=='yyHrK')this[_0x2304d0(0x227)]();else return ColorManager[_0x2304d0(0x235)]();}else return _0x2304d0(0x176)!=='KuKel'?_0x4f8e62[_0x2304d0(0x258)][_0x2304d0(0x188)][_0x2304d0(0x144)][_0x2304d0(0x172)]:VisuMZ[_0x2304d0(0x258)][_0x2304d0(0x133)][_0x2304d0(0x27e)](this);},VisuMZ[_0x515139(0x258)][_0x515139(0x26c)]=Sprite_Gauge['prototype'][_0x515139(0x128)],Sprite_Gauge[_0x515139(0x1bf)][_0x515139(0x128)]=function(){const _0x32bf8e=_0x515139;VisuMZ[_0x32bf8e(0x258)][_0x32bf8e(0x26c)][_0x32bf8e(0x27e)](this),this['updateOpacityAggroControl']();},Sprite_Gauge[_0x515139(0x1bf)][_0x515139(0x1eb)]=function(){const _0xf3f6be=_0x515139;if(!this[_0xf3f6be(0x22f)]())return;if(!Imported[_0xf3f6be(0x1ce)])return;const _0x2966ac=this['_battler'][_0xf3f6be(0xff)]();if(this['_menuAggroType'])this[_0xf3f6be(0x146)]=0xff;else _0x2966ac&&_0x2966ac[_0xf3f6be(0x146)]>0x0?'BKvRU'===_0xf3f6be(0x257)?(_0x2d2aa5['AggroControlSystem'][_0xf3f6be(0x15c)]['call'](this,_0x5f4e77,_0x4eb1cf),this['executeHpDamageAggroControl'](_0x518781,_0x4214d4)):this[_0xf3f6be(0x146)]=0xff:this[_0xf3f6be(0x146)]=0x0;},VisuMZ['AggroControlSystem'][_0x515139(0x209)]=Sprite_Gauge[_0x515139(0x1bf)][_0x515139(0x245)],Sprite_Gauge[_0x515139(0x1bf)][_0x515139(0x245)]=function(){const _0x1a0c40=_0x515139;if(this[_0x1a0c40(0x22f)]())return;VisuMZ[_0x1a0c40(0x258)][_0x1a0c40(0x209)][_0x1a0c40(0x27e)](this);};function Sprite_ProvokeTrail(){const _0x1876ee=_0x515139;this[_0x1876ee(0x25d)](...arguments);}function _0x5787(){const _0x2c571b=['Idedp','ARRAYSTRUCT','scale','traitObjects','isShowPriorityLines','isProvokeAffected','dnkGe','GaugeColor1','setBattler','_homeX','BWGdl','updateAggroGaugeSprite','Provoke','isStateAffected','opacity','BattleManager_invokeMagicReflection','matchTauntType','Sprite_Gauge_currentValue','length','actor','BXSRR','659696ZgXudA','PriorityHighest','isActor','HITTYPE_PHYSICAL','Sprite_Battler_setBattler','Spriteset_Battle_createBattleField','gainAggro','opponentsUnit','shift','15074MSLkQX','BFeTg','Aggro','_provokeContainer','certainHitTaunt','531928TlrPrW','Game_Action_executeHpDamage','BlendMode','sparam','tgr','members','EVAL','bypassProvoke','provoke-line-color','ConfigManager_makeData','friendsUnit','applyData','lowestTgrMember','Sprite_Battler_initialize','isTauntAffected','Game_Action_targetsForAlive','provokeLineColor','executeHpDamage','ActorChangeAggro','enemy','gaugeColor1','startNewTauntAnimation','visible','Parts','ARRAYNUM','ActorID','subject','KuKel','Sprite_Actor_update','_mirrorActorTauntAnimations','maxSprites','AnchorY','stateHasProvoke','target','aggroGaugeX','requestFauxAnimation','tauntTargetsForAlive','ConvertParams','width','_highestTgrMember','applyTauntFilters','Game_BattlerBase_initMembers','xIcrd','indexOf','aggro-gauge-color-1','Settings','applyItemUserEffectAggroControl','map','alwaysTargetHighestAggro','createInnerSprite','NadmO','aggro-gauge-color-2','reduce','exit','ezAOn','gaugeX','Sprite_Gauge_currentMaxValue','ggjpH','hitType','_customModified','ftrFV','hKMkX','initAggroControl','createProvokeHeightOrigin','_battler','aggro','_%1TauntAnimation','initMembers','updateSubPositions','jjEfb','inBattle','clamp','isPhysical','partsSize','isSceneBattle','_provokeSprite','BattleManager_endAction','Yvwpr','NUM','leftwardAnimation','BjNwc','_aggro','_statusType','note','create','BattleManager_invokeCounterAttack','isEnemy','UTcJR','JqsEz','BattleLayout','applyItemUserEffect','createAggroGauge','wgTQZ','AddOption','clearProvokers','FphXV','Sprite_Actor_createStateSprite','padding','kkRfM','tgrMax','prototype','pow','updateTauntAnimations','XCSio','addAggroControlSystemProvokeCommand','createChildSprites','AggroPerDmg','isAggroAffected','physicalTaunt','invokeMagicReflection','_provoker','Battle\x20Enemy\x20%1','ArcHeight','provokeHeightOrigin','setup','VisuMZ_1_BattleCore','scope','HITTYPE_CERTAIN','2254194YsFdPe','WPBfU','round','pJjbl','AdjustOptionsRect','updateBattlerPositions','STRUCT','isTpb','cZUGI','PYpgW','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','LineColor','WnnaI','Game_Battler_onBattleEnd','_animationCycleTime','MirrorActorAni','some','Game_Action_applyGlobal','Opacity','AniCertain','aggroGauge','createBattleFieldAggroControl','_spriteset','aggroGaugeY','onBattleStart','randomTauntTarget','updateOpacityAggroControl','BattleCore','includes','_tauntAnimationCycle','Fdcaj','highestTgrMember','children','_mainSprite','usCSk','XclRE','toUpperCase','JkFZH','version','5240778dEvmFl','_tauntAnimationTimer','currentMaxValue','sortEnemies','3072231UzjMcX','isAggroGaugeVisible','push','magicalTaunt','_opacitySpeed','maxCommands','gaugeRate','isDead','_sprites','invokeCounterAttack','provokeOrigin','CycleTime','heightOrigin','Sprite_Gauge_drawValue','onBattleEnd','_enemies','inputtingAction','ARRAYEVAL','constructor','textColor','optDisplayTp','currentValueAggroControl','Spriteset_Battle_update','setFrame','list','getColor','convertBattleTargetToString','Window_BattleEnemy_refresh','IBPWR','EUljv','max','EnemyIndex','setAggro','maxOpacity','certainHitTauntMembers','nameX','endAction','battleUIOffsetX','EnemyChangeAggro','makeProvokeTarget','Game_Battler_addState','OptionName','ShowAnimation','addAggroControlSystemAggroCommand','orbGx','_counterAttackingTarget','parameters','addGeneralOptions','iconWidth','createStateSprite','anchor','isAggroType','drawAggroGauge','OpacitySpeed','_cache','applyProvokeEffect','battleAggro','aggroGaugeColor2','taunting','nbewW','Sprite_Gauge_gaugeX','updateOpacity','PrAFh','_targetX','checkCacheKey','addChildAt','status','loseAggro','Game_Battler_onBattleStart','provokeBitmap','arcHeight','physicalTauntMembers','KlZmA','drawValue','AggroPerHeal','5219255VlsKEX','description','clearTgrCache','XIWdR','FOUkv','min','boxHeight','_targetY','baseAggro','_damageContainer','updateAggroControl','isBypassHighestAggro','addChild','STR','ShowFacesListStyle','name','DaqvU','AggroControlSystem','isBypassProvoke','10bYFDHU','getColorDataFromPluginParameters','isBypassTaunt','initialize','ngagH','VisuMZ_2_BattleSystemATB','battleLayoutStyle','cwMvs','Sprite_Gauge_gaugeColor1','filter','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','bitmapHeight','isAtbGaugeVisible','magicalTauntMembers','Taunt','OffsetY','BattleStatusOffsetX','getNextTauntAnimation','Sprite_Gauge_update','TDnvP','targetsForAlive','isSideView','JSON','MuteAnimations','aliveMembers','itemRectWithPadding','WWCyV','index','format','VisibleGauge','bypassTaunt','_certainHitTauntAnimation','log','_battleField','_scene','Game_Action_applyItemUserEffect','call','56EHSGve','createProvokeSprite','registerCommand','cDmMv','item','_aggroGaugeSprite','addAggroControlSystemCommands','Scene_Options_maxCommands','vrsBp','parse','isCertainHit','UiCSY','HQTzF','bitmapWidth','Battle\x20Actor\x20%1','Window_Options_addGeneralOptions','bind','height','dTKcL','%1Taunt','match','Sprite_Battler_update','isMagical','dvWup','states','magical','wtxtn','TIWRz','abs','KbynL','smoothTarget','placeActorName','kmixV','currentValue','makeData','addState','_physicalTauntAnimation','actorId','itemRect','isPlaytest','fYtdb','HITTYPE_MAGICAL','lqibm','faceWidth','_homeY','_colorCache','Sknmr','_provokeBitmap','_muteTauntAnimations','battler','currentMaxValueAggroControl','gaugeColor2','gaugeHeight','randomTarget','return\x200','user','_subject','initTauntAnimations','battleUIOffsetY','_statusWindow','applySubjectAggro','Game_BattlerBase_sparam','Game_BattlerBase_refresh','refresh','ARRAYFUNC','umklX','Window_StatusBase_placeActorName','ShowLines','isTargetHighestTGR','AniMagical','aggroGaugeColor1','ARRAYJSON','createBattleField','_targetIndex','boxWidth','oWtQC','applyProvokeFilters','Sprite_Battler_initMembers','provoker','tgrMin','tgrSumFromGroup','findTgrMember','parentContainer','gfZpp','convertStringToBattleTarget','certainHit','zxNsE','aggroMultiplier','randomInt','blendMode','update','ConfigManager_applyData','_menuAggroType','isAlive','_lowestTgrMember','physical','bypassHighestAggro','addCommand','OpCOj','applyGlobal','HeightOrigin','Sprite_Gauge_gaugeColor2','Sprite_Gauge_gaugeRate','heEFx','isAggroGaugeShown','clearAggro'];_0x5787=function(){return _0x2c571b;};return _0x5787();}Sprite_ProvokeTrail[_0x515139(0x1bf)]=Object[_0x515139(0x1af)](Sprite['prototype']),Sprite_ProvokeTrail['prototype'][_0x515139(0x20e)]=Sprite_ProvokeTrail,Sprite_ProvokeTrail[_0x515139(0x1bf)][_0x515139(0x25d)]=function(_0x28c3e3){const _0x46c2c8=_0x515139;this[_0x46c2c8(0x1f2)]=_0x28c3e3,Sprite[_0x46c2c8(0x1bf)][_0x46c2c8(0x25d)]['call'](this),this[_0x46c2c8(0x19e)](),this[_0x46c2c8(0x1c4)]();},Sprite_ProvokeTrail[_0x515139(0x1bf)][_0x515139(0x19e)]=function(){const _0x56fd30=_0x515139,_0x964d1=VisuMZ[_0x56fd30(0x258)][_0x56fd30(0x188)][_0x56fd30(0x144)];this[_0x56fd30(0x22e)]['x']=0.5,this[_0x56fd30(0x22e)]['y']=0.5,this[_0x56fd30(0x141)]=0x0,this[_0x56fd30(0x2ab)]=0x0,this['_targetX']=0x0,this['_targetY']=0x0,this[_0x56fd30(0x146)]=0x0,this[_0x56fd30(0x200)]=_0x964d1[_0x56fd30(0x231)],this[_0x56fd30(0x127)]=_0x964d1[_0x56fd30(0x15d)];},Sprite_ProvokeTrail[_0x515139(0x1bf)]['maxSprites']=function(){const _0x3dd0cf=_0x515139;return VisuMZ[_0x3dd0cf(0x258)][_0x3dd0cf(0x188)][_0x3dd0cf(0x144)][_0x3dd0cf(0x172)];},Sprite_ProvokeTrail[_0x515139(0x1bf)]['partsSize']=function(){const _0x2e6508=_0x515139;return VisuMZ[_0x2e6508(0x258)][_0x2e6508(0x188)][_0x2e6508(0x144)]['PartsSize']/0x64;},Sprite_ProvokeTrail['prototype']['createChildSprites']=function(){const _0x249011=_0x515139;this[_0x249011(0x204)]=[];let _0x4cb3b3=0x0;for(let _0x8a75df=0x0;_0x8a75df<=this[_0x249011(0x179)]();_0x8a75df++){if('xIcrd'!==_0x249011(0x185))return _0x54309b(_0x528cdd['$1'])*0.01;else{const _0x4dfe01=new Sprite();_0x4dfe01['bitmap']=ImageManager[_0x249011(0x241)](),_0x4dfe01[_0x249011(0x22e)]['x']=0.5,_0x4dfe01[_0x249011(0x22e)]['y']=0.5,_0x4dfe01[_0x249011(0x13a)]['x']=_0x4dfe01[_0x249011(0x13a)]['y']=this[_0x249011(0x1a4)](),_0x4dfe01[_0x249011(0x146)]=_0x4cb3b3,_0x4dfe01[_0x249011(0x127)]=this[_0x249011(0x127)],this[_0x249011(0x253)](_0x4dfe01),this[_0x249011(0x204)]['push'](_0x4dfe01),_0x4cb3b3+=this[_0x249011(0x200)];if(_0x4cb3b3>=0xff)_0x4cb3b3=0x0;}}},Sprite_ProvokeTrail[_0x515139(0x1bf)][_0x515139(0x1aa)]=function(){const _0x432d4c=_0x515139;return this['_mainSprite'][_0x432d4c(0x20e)]===Sprite_Actor;},Sprite_ProvokeTrail[_0x515139(0x1bf)][_0x515139(0x120)]=function(){const _0x1becce=_0x515139;return SceneManager[_0x1becce(0x27c)]['_spriteset'][_0x1becce(0x159)];},Sprite_ProvokeTrail[_0x515139(0x1bf)]['update']=function(){const _0x1e5690=_0x515139;Sprite[_0x1e5690(0x1bf)]['update'][_0x1e5690(0x27e)](this),this[_0x1e5690(0x1d6)](),this[_0x1e5690(0x19f)](),this[_0x1e5690(0x239)](),this['updateChildrenOpacity']();},Sprite_ProvokeTrail[_0x515139(0x1bf)][_0x515139(0x208)]=function(){const _0x3f6a8f=_0x515139;return VisuMZ['AggroControlSystem'][_0x3f6a8f(0x188)][_0x3f6a8f(0x144)]['HeightOrigin'];},Sprite_ProvokeTrail[_0x515139(0x1bf)][_0x515139(0x1d6)]=function(){const _0x1f996c=_0x515139;if(!this[_0x1f996c(0x1f2)]['_battler'])return;if(!this[_0x1f996c(0x1f2)][_0x1f996c(0x19b)][_0x1f996c(0x11c)]())return;const _0x2941d5=this[_0x1f996c(0x1f2)][_0x1f996c(0x19b)][_0x1f996c(0x11c)]()['battler']();if(!_0x2941d5)return;const _0x250c4d=this['_mainSprite'][_0x1f996c(0x19b)]['provokeHeightOrigin'](),_0x3f5393=this['_mainSprite'][_0x1f996c(0x19b)][_0x1f996c(0x11c)]()[_0x1f996c(0x1cc)]();this[_0x1f996c(0x141)]=this[_0x1f996c(0x1f2)]['x'],this[_0x1f996c(0x2ab)]=this[_0x1f996c(0x1f2)]['y']-this[_0x1f996c(0x1f2)][_0x1f996c(0x290)]*_0x250c4d,this[_0x1f996c(0x23b)]=_0x2941d5['x'],this[_0x1f996c(0x24e)]=_0x2941d5['y']-_0x2941d5[_0x1f996c(0x290)]*_0x3f5393,this[_0x1f996c(0x141)]+=Math['round']((Graphics[_0x1f996c(0x181)]-Graphics[_0x1f996c(0x118)])/0x2),this[_0x1f996c(0x2ab)]+=Math[_0x1f996c(0x1d3)]((Graphics['height']-Graphics[_0x1f996c(0x24d)])/0x2),this[_0x1f996c(0x23b)]+=Math[_0x1f996c(0x1d3)]((Graphics[_0x1f996c(0x181)]-Graphics['boxWidth'])/0x2),this[_0x1f996c(0x24e)]+=Math[_0x1f996c(0x1d3)]((Graphics[_0x1f996c(0x290)]-Graphics['boxHeight'])/0x2);if(!$gameSystem[_0x1f996c(0x26f)]()){if(_0x2941d5['_battler'][_0x1f996c(0x14f)]())visible=!![],this['_targetX']+=SceneManager[_0x1f996c(0x27c)][_0x1f996c(0x109)]['x'],this[_0x1f996c(0x24e)]+=SceneManager[_0x1f996c(0x27c)][_0x1f996c(0x109)]['y'];else{if(_0x2941d5['_battler']['isEnemy']()){if(_0x1f996c(0x24b)!==_0x1f996c(0x24b))return this['isAggroType']()?this['currentValueAggroControl']():_0x3fb152[_0x1f996c(0x258)][_0x1f996c(0x149)][_0x1f996c(0x27e)](this);else visible=!![],this['_homeX']+=SceneManager[_0x1f996c(0x27c)][_0x1f996c(0x109)]['x'],this[_0x1f996c(0x2ab)]+=SceneManager[_0x1f996c(0x27c)][_0x1f996c(0x109)]['y'];}}}},Sprite_ProvokeTrail['prototype'][_0x515139(0x242)]=function(){const _0x59ac69=_0x515139;return VisuMZ[_0x59ac69(0x258)]['Settings']['Provoke'][_0x59ac69(0x1cb)];},Sprite_ProvokeTrail['prototype'][_0x515139(0x19f)]=function(){const _0xbfb5f0=_0x515139;if(!this[_0xbfb5f0(0x1f2)]['_battler'])return;if(!this[_0xbfb5f0(0x1f2)][_0xbfb5f0(0x19b)][_0xbfb5f0(0x11c)]())return;if(!this['_sprites'])return;if(this['_sprites'][_0xbfb5f0(0x14a)]<=0x0)return;const _0xd1a93d=(this[_0xbfb5f0(0x23b)]-this[_0xbfb5f0(0x141)])/this[_0xbfb5f0(0x179)](),_0x5e786e=(this[_0xbfb5f0(0x24e)]-this[_0xbfb5f0(0x2ab)])/this['maxSprites']();for(let _0x10387d=0x0;_0x10387d<=this[_0xbfb5f0(0x179)]();_0x10387d++){if(_0xbfb5f0(0x138)!==_0xbfb5f0(0x138))_0x4371c6+=this[_0xbfb5f0(0x19b)][_0xbfb5f0(0x221)]();else{const _0x4a668b=this[_0xbfb5f0(0x204)][_0x10387d];if(!_0x4a668b)continue;_0x4a668b['x']=this[_0xbfb5f0(0x141)]+_0xd1a93d*_0x10387d;const _0x3f25d0=this[_0xbfb5f0(0x179)]()-_0x10387d,_0x414b03=this['maxSprites']()/0x2,_0x21743e=this[_0xbfb5f0(0x242)](),_0x20dd00=-_0x21743e/Math['pow'](_0x414b03,0x2),_0x43295f=_0x20dd00*Math[_0xbfb5f0(0x1c0)](_0x3f25d0-_0x414b03,0x2)+_0x21743e;_0x4a668b['y']=this[_0xbfb5f0(0x2ab)]+_0x5e786e*_0x10387d-_0x43295f;}}},Sprite_ProvokeTrail[_0x515139(0x1bf)][_0x515139(0x21d)]=function(){const _0x2dbdca=_0x515139;return VisuMZ[_0x2dbdca(0x258)]['Settings']['Provoke'][_0x2dbdca(0x1e3)];},Sprite_ProvokeTrail[_0x515139(0x1bf)][_0x515139(0x239)]=function(){const _0x2ddc3b=_0x515139,_0x1f9f98=this[_0x2ddc3b(0x1f2)][_0x2ddc3b(0x19b)];if(!_0x1f9f98)_0x2ddc3b(0x130)===_0x2ddc3b(0x130)?this[_0x2ddc3b(0x146)]=0x0:_0x3c032b=_0x4ce77f['x']+_0x4c59fe[_0x2ddc3b(0x2aa)]+0x8;else _0x1f9f98[_0x2ddc3b(0x12b)]()&&_0x1f9f98[_0x2ddc3b(0x11c)]()?this['opacity']=0xff:this[_0x2ddc3b(0x146)]=0x0;},Sprite_ProvokeTrail[_0x515139(0x1bf)]['updateChildrenOpacity']=function(){const _0x4b9193=_0x515139;if(!this[_0x4b9193(0x1f2)][_0x4b9193(0x19b)])return;if(!this[_0x4b9193(0x1f2)][_0x4b9193(0x19b)][_0x4b9193(0x11c)]())return;if(!this[_0x4b9193(0x204)])return;if(this[_0x4b9193(0x204)]['length']<=0x0)return;for(let _0x4309ea=0x0;_0x4309ea<=this[_0x4b9193(0x179)]();_0x4309ea++){if(_0x4b9193(0x157)===_0x4b9193(0x157)){const _0x1665a1=this[_0x4b9193(0x204)][this[_0x4b9193(0x1aa)]()?this['maxSprites']()-_0x4309ea:_0x4309ea];if(!_0x1665a1)continue;_0x1665a1[_0x4b9193(0x146)]-=this[_0x4b9193(0x200)];if(_0x1665a1[_0x4b9193(0x146)]<=0x0)_0x1665a1['opacity']=0xff;}else return _0x1a21ff[_0x4b9193(0x258)][_0x4b9193(0x188)][_0x4b9193(0x144)][_0x4b9193(0x132)];}},VisuMZ[_0x515139(0x258)][_0x515139(0x152)]=Spriteset_Battle['prototype'][_0x515139(0x116)],Spriteset_Battle[_0x515139(0x1bf)][_0x515139(0x116)]=function(){const _0x36525d=_0x515139;VisuMZ[_0x36525d(0x258)]['Spriteset_Battle_createBattleField'][_0x36525d(0x27e)](this),this[_0x36525d(0x1e6)]();},Spriteset_Battle[_0x515139(0x1bf)]['createBattleFieldAggroControl']=function(){const _0x4a7be8=_0x515139;if(!Imported[_0x4a7be8(0x1ce)])return;const _0x5da2c1=this[_0x4a7be8(0x27b)]['x'],_0x500d7d=this[_0x4a7be8(0x27b)]['y'],_0x3848fa=this['_battleField'][_0x4a7be8(0x181)],_0x2cb89a=this['_battleField'][_0x4a7be8(0x290)];this[_0x4a7be8(0x159)]=new Sprite(),this[_0x4a7be8(0x159)][_0x4a7be8(0x213)](0x0,0x0,_0x3848fa,_0x2cb89a),this[_0x4a7be8(0x159)]['x']=_0x5da2c1,this[_0x4a7be8(0x159)]['y']=_0x500d7d;if(Imported[_0x4a7be8(0x1ce)]){const _0x1d76c7=this[_0x4a7be8(0x1f1)][_0x4a7be8(0x186)](this['_damageContainer']);this[_0x4a7be8(0x23d)](this[_0x4a7be8(0x159)],_0x1d76c7);}else{if(_0x4a7be8(0x1b7)!==_0x4a7be8(0x1b7)){if(!this[_0x4a7be8(0x12c)]){const _0xf7f74f=this[_0x4a7be8(0x11d)](),_0x5e7c04=this[_0x4a7be8(0x272)]()[_0x4a7be8(0x263)](_0x23c9b4=>_0x23c9b4[_0x4a7be8(0x15f)]===_0xf7f74f);this[_0x4a7be8(0x12c)]=_0x5e7c04[_0x9050df[_0x4a7be8(0x126)](_0x5e7c04[_0x4a7be8(0x14a)])]||this[_0x4a7be8(0x103)]();}return this[_0x4a7be8(0x12c)];}else this['addChild'](this[_0x4a7be8(0x159)]);}},VisuMZ[_0x515139(0x258)][_0x515139(0x212)]=Spriteset_Battle['prototype'][_0x515139(0x128)],Spriteset_Battle[_0x515139(0x1bf)][_0x515139(0x128)]=function(){const _0x41412d=_0x515139;VisuMZ['AggroControlSystem'][_0x41412d(0x212)][_0x41412d(0x27e)](this),this[_0x41412d(0x251)]();},Spriteset_Battle[_0x515139(0x1bf)]['updateAggroControl']=function(){const _0x516ecc=_0x515139;if(!this['_provokeContainer'])return;if(!this['_damageContainer'])return;this[_0x516ecc(0x159)]['x']=this[_0x516ecc(0x250)]['x'],this[_0x516ecc(0x159)]['y']=this[_0x516ecc(0x250)]['y'];},VisuMZ['AggroControlSystem']['Window_BattleEnemy_refresh']=Window_BattleEnemy[_0x515139(0x1bf)][_0x515139(0x10d)],Window_BattleEnemy[_0x515139(0x1bf)][_0x515139(0x10d)]=function(){const _0x59e9ef=_0x515139;if(this[_0x59e9ef(0x11a)]())Imported[_0x59e9ef(0x1ce)]&&this['sortEnemies'](),Window_Selectable[_0x59e9ef(0x1bf)][_0x59e9ef(0x10d)][_0x59e9ef(0x27e)](this);else{if(this[_0x59e9ef(0x183)]())Imported[_0x59e9ef(0x1ce)]&&this[_0x59e9ef(0x1fb)](),Window_Selectable[_0x59e9ef(0x1bf)][_0x59e9ef(0x10d)][_0x59e9ef(0x27e)](this);else{if('HvChN'===_0x59e9ef(0x237)){if(this[_0x59e9ef(0x1c9)]===_0xe50ded)this[_0x59e9ef(0x1b9)]();const _0x5249fe=_0x350bdf[_0x59e9ef(0x216)](this);this['_provoker'][_0xcd0931]=_0x5249fe,!this[_0x59e9ef(0x1c9)][_0x35007f]&&delete this['_provoker'][_0x23f86f];}else VisuMZ['AggroControlSystem'][_0x59e9ef(0x217)][_0x59e9ef(0x27e)](this);}}},Window_BattleEnemy[_0x515139(0x1bf)][_0x515139(0x11a)]=function(){const _0x2fce06=_0x515139,_0x58dcbe=BattleManager[_0x2fce06(0x20c)](),_0x3a3760=BattleManager[_0x2fce06(0x14b)]();if(!_0x58dcbe)return![];if(!_0x3a3760)return![];if(DataManager[_0x2fce06(0x259)](_0x58dcbe[_0x2fce06(0x283)]()))return![];if(_0x3a3760['bypassProvoke']())return![];if(_0x3a3760[_0x2fce06(0x13d)]())return this[_0x2fce06(0x20b)]=[_0x3a3760[_0x2fce06(0x11c)]()],!![];else{if(_0x2fce06(0x2a7)!==_0x2fce06(0x2a7)){if(_0x48d1bb['stateHasProvoke'](_0x1b113e)){if(this[_0x2fce06(0x1c9)]===_0x2a8bc7)this['clearProvokers']();const _0x1d0998=this[_0x2fce06(0x1c9)][_0x16442f['id']],_0x5dedb7=_0x3d6d4a[_0x2fce06(0x122)](_0x1d0998);if(_0x5dedb7&&_0x5dedb7[_0x2fce06(0x12b)]())return _0x5dedb7;}}else return![];}},Window_BattleEnemy[_0x515139(0x1bf)][_0x515139(0x183)]=function(){const _0x4ca2eb=_0x515139,_0xcde287=BattleManager['inputtingAction'](),_0x1a6f33=BattleManager[_0x4ca2eb(0x14b)](),_0x388367=$gameTroop;if(!_0xcde287)return![];if(!_0x1a6f33)return![];if(!_0xcde287[_0x4ca2eb(0x283)]())return![];if(DataManager[_0x4ca2eb(0x25c)](_0xcde287[_0x4ca2eb(0x283)]()))return![];if(_0x1a6f33[_0x4ca2eb(0x278)]())return![];if(_0xcde287[_0x4ca2eb(0x1a3)]()&&_0x388367[_0x4ca2eb(0x243)]()[_0x4ca2eb(0x14a)]>0x0)this[_0x4ca2eb(0x20b)]=_0x388367[_0x4ca2eb(0x243)]();else{if(_0xcde287[_0x4ca2eb(0x295)]()&&_0x388367[_0x4ca2eb(0x267)]()[_0x4ca2eb(0x14a)]>0x0)this[_0x4ca2eb(0x20b)]=_0x388367[_0x4ca2eb(0x267)]();else{if(_0xcde287[_0x4ca2eb(0x289)]()&&_0x388367['certainHitTauntMembers']()[_0x4ca2eb(0x14a)]>0x0)this[_0x4ca2eb(0x20b)]=_0x388367['certainHitTauntMembers']();else{if(_0x4ca2eb(0x291)!=='BfTnm')return![];else{const _0x52e14a=_0x57b39a[_0x4ca2eb(0x246)];this[_0x4ca2eb(0x175)]()[_0x4ca2eb(0x153)](_0x52e14a*_0x17f984['abs'](_0x5925c4));}}}}return!![];},VisuMZ[_0x515139(0x258)][_0x515139(0x28e)]=Window_Options[_0x515139(0x1bf)][_0x515139(0x22b)],Window_Options['prototype']['addGeneralOptions']=function(){const _0x12c3e0=_0x515139;VisuMZ[_0x12c3e0(0x258)][_0x12c3e0(0x28e)][_0x12c3e0(0x27e)](this),this[_0x12c3e0(0x285)]();},Window_Options[_0x515139(0x1bf)][_0x515139(0x285)]=function(){const _0x3a68a1=_0x515139;VisuMZ[_0x3a68a1(0x258)][_0x3a68a1(0x188)][_0x3a68a1(0x144)][_0x3a68a1(0x1b8)]&&this['addAggroControlSystemProvokeCommand'](),VisuMZ[_0x3a68a1(0x258)]['Settings']['Aggro'][_0x3a68a1(0x1b8)]&&this[_0x3a68a1(0x227)]();},Window_Options[_0x515139(0x1bf)][_0x515139(0x1c3)]=function(){const _0x3665f1=_0x515139,_0x579bcf=TextManager['provokeOrigin'],_0x48c678=_0x3665f1(0x206);this[_0x3665f1(0x12f)](_0x579bcf,_0x48c678);},Window_Options[_0x515139(0x1bf)][_0x515139(0x227)]=function(){const _0x1f170c=_0x515139,_0x80e6a3=TextManager[_0x1f170c(0x1e5)],_0xf85302=_0x1f170c(0x1e5);this[_0x1f170c(0x12f)](_0x80e6a3,_0xf85302);},VisuMZ[_0x515139(0x258)]['Window_StatusBase_placeActorName']=Window_StatusBase[_0x515139(0x1bf)][_0x515139(0x29e)],Window_StatusBase[_0x515139(0x1bf)]['placeActorName']=function(_0x5506a5,_0x94e19d,_0x1b4475){const _0x4c4251=_0x515139;if(this['isAggroGaugeShown']())this[_0x4c4251(0x230)](_0x5506a5[_0x4c4251(0x275)]());VisuMZ[_0x4c4251(0x258)][_0x4c4251(0x110)][_0x4c4251(0x27e)](this,_0x5506a5,_0x94e19d,_0x1b4475);},Window_StatusBase[_0x515139(0x1bf)][_0x515139(0x136)]=function(){const _0xbbc3c3=_0x515139;if(![Window_BattleActor,Window_BattleStatus][_0xbbc3c3(0x1ed)](this[_0xbbc3c3(0x20e)]))return![];if(!SceneManager[_0xbbc3c3(0x1a5)]())return![];return ConfigManager['aggroGauge']&&VisuMZ[_0xbbc3c3(0x258)][_0xbbc3c3(0x188)]['Aggro']['StatusGauge'];},Window_StatusBase[_0x515139(0x1bf)]['placeAggroGauge']=function(_0x144b41,_0x102ec5,_0x2bdba4){const _0x510c49=_0x515139;this['placeGauge'](_0x144b41,_0x510c49(0x19c),_0x102ec5,_0x2bdba4);},Window_BattleStatus[_0x515139(0x1bf)][_0x515139(0x230)]=function(_0x1c7c77){const _0x2a3329=_0x515139,_0x2a5db1=this[_0x2a3329(0x14b)](_0x1c7c77),_0x12db47=this[_0x2a3329(0x17d)](_0x1c7c77),_0x377897=this[_0x2a3329(0x1e8)](_0x1c7c77),_0x4cf8e1='actor%1-gauge-aggro'[_0x2a3329(0x276)](_0x2a5db1[_0x2a3329(0x2a4)]()),_0x40090e=this[_0x2a3329(0x18c)](_0x4cf8e1,Sprite_Gauge),_0x136658=VisuMZ['AggroControlSystem'][_0x2a3329(0x188)][_0x2a3329(0x158)];_0x40090e['x']=_0x12db47+(_0x136658[_0x2a3329(0x26a)]||0x0),_0x40090e['y']=_0x377897+(_0x136658['BattleStatusOffsetY']||0x0),_0x40090e[_0x2a3329(0x12a)]=!![],_0x40090e[_0x2a3329(0x1cd)](_0x2a5db1,'aggro'),_0x40090e[_0x2a3329(0x171)]=!![];},Window_BattleStatus['prototype'][_0x515139(0x17d)]=function(_0x228b22){const _0x1ae81c=_0x515139;let _0x36a2d0=this[_0x1ae81c(0x273)](_0x228b22),_0x3ce20d=this[_0x1ae81c(0x21f)](_0x36a2d0);if(Imported['VisuMZ_1_BattleCore']){let _0x5554f6=this[_0x1ae81c(0x2a5)](_0x228b22);if(this[_0x1ae81c(0x260)]()===_0x1ae81c(0x214)){const _0x12eb38=$dataSystem[_0x1ae81c(0x210)]?0x4:0x3,_0x1b0f54=_0x12eb38*0x80+(_0x12eb38-0x1)*0x8+0x4,_0x4d855d=this[_0x1ae81c(0x14b)](_0x228b22);let _0x35a8b8=_0x5554f6['x']+this[_0x1ae81c(0x1bc)];if(VisuMZ['BattleCore'][_0x1ae81c(0x188)][_0x1ae81c(0x1b4)]['ShowFacesListStyle']){if(_0x1ae81c(0x261)==='lQkAH')return _0x25568c[_0x1ae81c(0x258)]['Sprite_Gauge_gaugeX'][_0x1ae81c(0x27e)](this);else _0x35a8b8=_0x5554f6['x']+ImageManager[_0x1ae81c(0x2aa)]+0x8;}else _0x35a8b8+=ImageManager[_0x1ae81c(0x22c)];_0x3ce20d=Math[_0x1ae81c(0x1d3)](Math[_0x1ae81c(0x24c)](_0x5554f6['x']+_0x5554f6['width']-_0x1b0f54,_0x35a8b8)),_0x3ce20d-=0x4;}else _0x3ce20d=Math[_0x1ae81c(0x1d3)](_0x5554f6['x']+(_0x5554f6[_0x1ae81c(0x181)]-0x80)/0x2);}return _0x3ce20d;},Window_BattleStatus[_0x515139(0x1bf)]['aggroGaugeY']=function(_0x75704d){const _0x3c67e7=_0x515139,_0xbeec54=this['itemRect'](_0x75704d);let _0x50946a=this['nameY'](_0xbeec54);if(Imported[_0x3c67e7(0x1ce)]){if(_0x3c67e7(0x29a)===_0x3c67e7(0x228))return _0x4f58ab[_0x3c67e7(0x27c)][_0x3c67e7(0x1e7)][_0x3c67e7(0x159)];else{if(this['battleLayoutStyle']()===_0x3c67e7(0x214)){let _0x3a2214=this[_0x3c67e7(0x2a5)](_0x75704d);_0x50946a=Math['round'](_0x3a2214['y']+(_0x3a2214[_0x3c67e7(0x290)]-Sprite_Name[_0x3c67e7(0x1bf)][_0x3c67e7(0x265)]())/0x2);}}}if(this['isAtbGaugeVisible']())_0x50946a-=Sprite_Gauge[_0x3c67e7(0x1bf)][_0x3c67e7(0x102)]()-0x1;return _0x50946a;},Window_BattleStatus['prototype'][_0x515139(0x266)]=function(){const _0xbd2aae=_0x515139;if(!BattleManager[_0xbd2aae(0x1d8)]())return![];if(Imported[_0xbd2aae(0x25f)])return this['showVisualAtbGauge']('time');return!![];};