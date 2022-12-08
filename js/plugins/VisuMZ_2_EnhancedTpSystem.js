//=============================================================================
// VisuStella MZ - Enhanced TP System
// VisuMZ_2_EnhancedTpSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EnhancedTpSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EnhancedTP = VisuMZ.EnhancedTP || {};
VisuMZ.EnhancedTP.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.11] [EnhancedTP]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Enhanced_TP_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The TP system in RPG Maker MZ is rather limiting. A lot of the TP system is
 * hardcoded in giving RPG Maker MZ users very little control over how much TP
 * gain a battler can receive from particular actions and situations. This
 * plugin gives you the ability to adjust how much TP battlers will acquire
 * various actions, different TP modes, and letting players selecting and pick
 * what TP mode they want for each actor.
 *
 * Features include all (but not limited to) the following:
 * 
 * * TP Modes that allow actors and enemies to have different ways of
 *   generating TP through battle.
 * * 30 pre-made TP Modes for you to use and/or learn from.
 * * Functionality for skills and items to change a target's TP Mode.
 * * The ability to teach actors new TP modes upon learning new skills.
 * * Unlock new TP Modes from becoming the target of skills and/or items.
 * * Trait Objects (like states) that will enforce a specific TP Mode when
 *   applied.
 * * TP Gauge can flash a variety of colors once a certain percentile range
 *   has been met.
 * * Integrated TP Mode changer for players within Scene_Skill.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * MaxTP Overwrite
 *
 * - There was nothing altering MaxTP before and this plugin offers TP Modes
 * that change up the MaxTP total. The function has been overwritten for more
 * plugin functionality.
 *
 * ---
 *
 * Preserve TP
 *
 * - Preserve TP function has been overwritten so it is no longer determined by
 * the presence of the Preserve TP trait, but instead, determined by whether or
 * not the current TP Mode has TP Preservation as its property. This is to keep
 * the consistency in the TP Modes and to give the game dev more control over
 * this aspect.
 *
 * ---
 * 
 * Initial TP Gain in Battle Reworked
 *
 * - If 'Preserve TP' was off, battlers would normally have a random amount of
 * TP given to them at the start of battle by default. However, there was no
 * place to control this value in the RPG Maker MZ editor itself so this has
 * been overwritten to give you, the game dev, full control over this aspect,
 * and whether or not it requires the 'Preserve TP' flag or not.
 *
 * ---
 *
 * On Damage TP Gain
 *
 * - The on Damage function has been overwritten to remove the default TP gain
 * aspect in favor of custom TP gain aspect granted by the current equipped TP
 * Mode to keep functionality under control.
 *
 * ---
 * 
 * Sprite_Gauge Changes
 * 
 * - The sprite gauge has been changed slightly to allow for flashing gauges.
 * They're separated into different layers now when it comes strictly to a TP
 * gauge. There shouldn't be any noticeable compatibility problems with them
 * unless there are plugins that alter the TP gauge completely.
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
 * === General TP Mode Notetags ===
 *
 * These are TP Mode-related notatags that affect both actors and enemies.
 *
 * ---
 *
 * <TP Mode: name>
 *
 * - Used for: Actor Enemy, State Notetags
 * - Sets the starting TP Mode for this actor/enemy to be 'name'.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Starting TP Modes>
 *  name
 *  name
 *  name
 *  name
 * </Starting TP Modes>
 *
 * - Used for: Actor Notetags
 * - Adds TP Modes to the actor's available list of TP Modes from the start.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Change Target TP Mode: name>
 *
 * <Change User TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target/user's TP Mode to the target TP Mode upon using this
 *   item/skill.
 * - For <Change Target TP Mode: name>, the action must successfully hit the
 *   target in order for the TP Mode to change.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * === Actor-Only TP Mode Notetags ===
 *
 * These are TP Mode-related notetags that only affect actors.
 *
 * ---
 *
 * <Learn TP Mode: name>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Insert multiple copies of this notetag to have the skill learn more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Keep in mind that learning the skill is required for the TP Mode to be
 *   learned. Adding the skill through a trait will not teach the TP Mode.
 *
 * ---
 *
 * <Learn TP Modes>
 *  name
 *  name
 *  name
 * </Learn TP Modes>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Unlock TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Insert multiple copies of this notetag to have the item/skill unlock more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Unlock TP Modes>
 *  name
 *  name
 *  name
 * </Unlock TP Modes>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Force TP Mode: name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the affected battler to use the specific named TP Mode in battle.
 * - Priority is given based the ordering of trait objects if multiple forced
 *   TP Mode effects are present.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
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
 * Actor: Change TP Mode
 * - Changes target actor(s) TP Mode.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock TP Mode
 * - Unlocks TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Modes:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock All TP Modes
 * - Unlocks all TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change TP Mode
 * - Changes target enemy(ies) TP Mode.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected enemy(ies).
 *
 * ---
 *
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: Show/Hide TP Mode
 * - Shows/Hides TP Mode from Scene_Skill.
 *
 *   Show TP Mode?:
 *   - Shows/Hides TP Mode in Scene_Skill.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings for the Enhanced TP System plugin. These
 * control the default settings for TP Modes and TP Mode option appearing in
 * Scene_Skill for the player.
 *
 * ---
 *
 * Defaults
 * 
 *   Default TP Mode:
 *   - Which TP mode should actors and enemies have by default?
 * 
 *   Global TP Modes:
 *   - TP Modes available to the all actors to pick from.
 *
 * ---
 *
 * Scene_Skill
 * 
 *   Show TP Mode?:
 *   - Show TP Mode in Scene_Skill by default?
 * 
 *   TP Mode Command:
 *   - The command name format shown in Scene_Skill.
 *   - %1 - TP Text
 * 
 *   TP Mode Icon:
 *   - Icon used for TP Mode shown in Scene_Skill.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: TP Modes
 * ============================================================================
 *
 * TP Modes are the TP settings that an actor or enemy has. TP Modes regulate
 * how TP is earned as well as the maximum TP value the actor/enemy can have.
 * Players can switch between TP Modes if granted the option, too.
 *
 * TP Modes can be added, removed, and editted by you the game dev. Each TP
 * Mode will have the following Plugin Parameters for you to adjust:
 *
 * ---
 *
 * General
 * 
 *   TP Mode Name:
 *   - The name for this TP Mode.
 *   - Used for notetag reference.
 * 
 *   Icon:
 *   - Icon used for this TP Mode.
 * 
 *   Help:
 *   - Help description used for this TP Mode.
 *   - %1 - In-game TP vocabulary.
 * 
 *   MaxTP Formula:
 *   - What's the MaxTP for this TP Mode?
 * 
 *   TCR Multiplier:
 *   - Multiplier on how much TP is earned.
 *   - Stacks multiplicatively with TCR.
 * 
 *   Preserve TP?:
 *   - If preserved, carry TP to the next battle.
 *   - If not, TP resets each battle.
 *
 * ---
 * 
 * Gauge
 * 
 *   Flash Gauge?:
 *   - Let this gauge flash once it reaches a certain percentage value.
 *   - Requires VisuMZ_1_SkillsStatesCore!
 * 
 *   Required Rate:
 *   - What rate does this gauge need to be over in order for it to flash?
 * 
 *   Flash Speed:
 *   - How fast should the gauge flash different colors?
 *   - Lower numbers are slower. Higher numbers are faster.
 * 
 *   Color Lightness:
 *   - How light should the flash color be?
 *   - Lower numbers are darker. Higher numbers are lighter.
 * 
 *   Custom Label:
 *   - Instead of displaying "TP", what label do you want to display here?
 *   - Leave empty to keep using "TP".
 *   - This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 *   Custom Color 1:
 *   Custom Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Empty for default colors.
 *   - This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 * ---
 *
 * TP Formulas > Generic
 * 
 *   Initial TP:
 *   - How much TP is gained at the start of battle?
 * 
 *   Critical Hit:
 *   - How much TP is gained when landing a critical hit?
 * 
 *   Evasion:
 *   - How much TP is gained when evading an action?
 * 
 *   Use Item:
 *   - How much TP is gained when using an item in battle?
 * 
 *   Use Skill:
 *   - How much TP is gained when using a skill in battle that isn't
 *     Attack or Guard?
 *
 * ---
 *
 * TP Formulas > During Regen
 * 
 *   TP Regen:
 *   - How much TP is gained each turn during regeneration?
 * 
 *   Critical HP:
 *   - How much TP is gained when user is in critical HP (25%)
 *     during regeneration.
 * 
 *   Full HP:
 *   - How much TP is gained when user has full HP
 *     during regeneration.
 * 
 *   Critical MP:
 *   - How much TP is gained when user is in critical MP (25%)
 *     during regeneration.
 * 
 *   Full MP:
 *   - How much TP is gained when user has full MP
 *     during regeneration.
 * 
 *   Only Member:
 *   - How much TP is gained when user is the only alive party member
 *     during regeneration.
 *
 * ---
 *
 * TP Formulas > HP Damage
 * 
 *   Take HP Damage:
 *   - How much TP is gained when receiving HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal HP Damage:
 *   - How much TP is gained when dealing HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally HP Damage:
 *   - How much TP is gained when an ally receives HP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > HP Heal
 * 
 *   Take HP Heal:
 *   - How much TP is gained when receiving HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal HP Heal:
 *   - How much TP is gained when dealing HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally HP Heal:
 *   - How much TP is gained when an ally receives HP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Damage
 * 
 *   Take MP Damage:
 *   - How much TP is gained when receiving MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal MP Damage:
 *   - How much TP is gained when dealing MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally MP Damage:
 *   - How much TP is gained when an ally receives MP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Heal
 * 
 *   Take MP Heal:
 *   - How much TP is gained when receiving MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal MP Heal:
 *   - How much TP is gained when dealing MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally MP Heal:
 *   - How much TP is gained when an ally receives MP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > Buffs
 * 
 *   Deal Ally Buff:
 *   - How much TP is gained when user inflicts a buff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Buff:
 *   - How much TP is gained when user inflicts a buff on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Buff:
 *   - How much TP is gained when user gains a buff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Buff:
 *   - How much TP is gained when user gains a buff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Debuffs
 * 
 *   Deal Ally Debuff:
 *   - How much TP is gained when user inflicts a debuff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Debuff:
 *   - How much TP is gained when user inflicts a debuff on an enemy through
 *     an Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Debuff:
 *   - How much TP is gained when user gains a debuff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Debuff:
 *   - How much TP is gained when user gains a debuff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > States
 * 
 *   Deal Ally State:
 *   - How much TP is gained when user inflicts a state on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy State:
 *   - How much TP is gained when user inflicts a state on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally State:
 *   - How much TP is gained when user gains a state from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy State:
 *   - How much TP is gained when user gains a state from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Death
 * 
 *   Ally Death:
 *   - How much TP is gained when an allied member dies.
 *   - Does not matter who the killer is.
 * 
 *   Enemy Death:
 *   - How much TP is gained when an enemy member dies.
 *   - Does not matter who the killer is.
 *
 * ---
 *
 * TP Formulas > Battle
 * 
 *   Win Battle:
 *   - How much TP is gained when the player wins a battle.
 * 
 *   Flee Battle:
 *   - How much TP is gained when the player escapes a battle.
 * 
 *   Lose Battle:
 *   - How much TP is gained when the player loses a battle.
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
 * Version 1.11: July 16, 2021
 * * Bug Fixes!
 * ** Fixed a problem that bypassed teaching TP modes through item usage.
 *    Fix made by Arisu.
 * 
 * Version 1.10: July 9, 2021
 * * Bug Fixes!
 * ** Fixed bugs regarding the TP Mode Unlock notetags not being detected
 *    properly. Fix made by Olivia.
 * 
 * Version 1.09: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: May 7, 2021
 * * Bug Fixes!
 * ** Normal Attack States will no longer trigger state gains if no states are
 *    applied. Fix made by Irina.
 * 
 * Version 1.07: April 23, 2021
 * * Bug Fixes!
 * ** Death effects for TP should now only trigger once. Fix made by Olivia.
 * 
 * Version 1.06: February 12, 2021
 * * Feature Update!
 * ** <Force TP Mode: name> notetag is now updated to be enforced outside of
 *    battle as well. Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Documentation Update!
 * ** Add notes to the "Custom Label" and "Custom Color" Plugin Parameters:
 * *** This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 * Version 1.04: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > General Settings > Background Type
 * 
 * Version 1.03: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New plugin parameters added by Arisu:
 * *** Custom Label
 * **** Instead of displaying "TP", what label do you want to display here?
 *      Leave empty to keep using "TP".
 * *** Custom Color 1, Custom Color 2
 * **** Use #rrggbb for custom colors or regular numbers for text colors from
 *      the Window Skin. Empty for default colors.
 * *** These plugin parameters are added onto TP Modes.
 * 
 * Version 1.02: November 8, 2020
 * * Bug Fixes!
 * ** Turning off Preserve TP will no longer generate random amounts of TP at
 *    the start of battle. Fix made by Arisu.
 * 
 * Version 1.01: November 1, 2020
 * * Bug Fixes!
 * ** Skill & States Core is no longer a dependency for Enhanced TP System.
 *    Fix made by Olivia.
 *
 * Version 1.00: October 26, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTPMode
 * @text Actor: Change TP Mode
 * @desc Changes target actor(s) TP Mode.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected actor(s).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockTPMode
 * @text Actor: Unlock TP Mode
 * @desc Unlocks TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModes:arraystr
 * @text TP Modes
 * @type string[]
 * @desc Change to this TP Mode for selected actor(s).
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockAllTPModes
 * @text Actor: Unlock All TP Modes
 * @desc Unlocks all TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTPMode
 * @text Enemy: Change TP Mode
 * @desc Changes target enemy(ies) TP Mode.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected enemy(ies).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SceneSkillTpMode
 * @text System: Show/Hide TP Mode
 * @desc Shows/Hides TP Mode from Scene_Skill.
 *
 * @arg Show:eval
 * @text Show TP Mode?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/Hides TP Mode in Scene_Skill.
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
 * @param EnhancedTP
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
 * @desc General settings pertaining to TP.
 * @default {"Defaults":"","DefaultTpMode:str":"Stoic","GlobalTPModes:arraystr":"[\"Stoic\",\"Comrade\",\"Warrior\",\"Healer\"]","SceneSkill":"","ShowTpMode:eval":"true","TpModeCmdName:str":"%1 Mode","TpModeIcon:num":"164"}
 *
 * @param TpMode:arraystruct
 * @text TP Modes
 * @type struct<TpMode>[]
 * @desc TP Modes available in the game.
 * @default ["{\"Name:str\":\"Stoic\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 when receiving damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Comrade\",\"Icon:num\":\"76\",\"Help:json\":\"\\\"Raise %1 whenever allies take damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"20 * user.tcr\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Warrior\",\"Icon:num\":\"77\",\"Help:json\":\"\\\"Raise %1 by attacking and dealing HP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Healer\",\"Icon:num\":\"72\",\"Help:json\":\"\\\"Raise %1 by healing HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Breaker\",\"Icon:num\":\"171\",\"Help:json\":\"\\\"Raise %1 whenever user deals MP damage\\\\nor receives MP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"50 * (value / Math.max(1, this.mmp)) * user.tcr\",\"DealMpDmg:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Battery\",\"Icon:num\":\"165\",\"Help:json\":\"\\\"Raise %1 whenever use helps an ally restore MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Slayer\",\"Icon:num\":\"1\",\"Help:json\":\"\\\"Raise %1 whenever an enemy is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"25 * user.tcr\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Avenger\",\"Icon:num\":\"17\",\"Help:json\":\"\\\"Raise %1 whenever an ally is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"50 * user.tcr\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Winner\",\"Icon:num\":\"87\",\"Help:json\":\"\\\"Raise %1 whenever your party wins a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"20 * user.tcr\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Coward\",\"Icon:num\":\"89\",\"Help:json\":\"\\\"Raise %1 whenever your party escapes from battle\\\\nor loses a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"20 * user.tcr\",\"LoseBattle:str\":\"20 * user.tcr\"}","{\"Name:str\":\"Cautious\",\"Icon:num\":\"32\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"10 * user.tcr\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Thrifty\",\"Icon:num\":\"33\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"10 * user.tcr\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Daredevil\",\"Icon:num\":\"48\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"16 * user.tcr\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Splurger\",\"Icon:num\":\"49\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"16 * user.tcr\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Caster\",\"Icon:num\":\"79\",\"Help:json\":\"\\\"Raise %1 whenever user performs a skill.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"16 * user.tcr\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Alchemist\",\"Icon:num\":\"176\",\"Help:json\":\"\\\"Raise %1 whenever user uses an item.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"16 * user.tcr\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Enchanter\",\"Icon:num\":\"73\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a buff\\\\nor status effect to an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"16 * user.tcr\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"16 * user.tcr\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Tactician\",\"Icon:num\":\"74\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a debuff\\\\nor status effect to a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"16 * user.tcr\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"16 * user.tcr\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Boosted\",\"Icon:num\":\"84\",\"Help:json\":\"\\\"Raise %1 whenever user receives a buff or\\\\nstatus effect from an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"16 * user.tcr\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"16 * user.tcr\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Sufferer\",\"Icon:num\":\"2\",\"Help:json\":\"\\\"Raise %1 whenever user receives a debuff or\\\\nstatus effect from a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"16 * user.tcr\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"16 * user.tcr\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Striker\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 whenever user lands a critical hit.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"16 * user.tcr\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Dancer\",\"Icon:num\":\"82\",\"Help:json\":\"\\\"Raise %1 whenever user evades an attack.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"16 * user.tcr\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Loner\",\"Icon:num\":\"166\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn as the\\\\nlast remaining alive member.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"16 * user.tcr\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Initiator\",\"Icon:num\":\"164\",\"Help:json\":\"\\\"User gains %1 at the start of battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20 * user.tcr\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Charger\",\"Icon:num\":\"311\",\"Help:json\":\"\\\"User loses all %1 at the start of battle but\\\\ngains more each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"-1 * user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"2 ** user.turnCount() * user.tcr\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Berserker\",\"Icon:num\":\"5\",\"Help:json\":\"\\\"User starts with full %1 at the start of battle,\\\\nbut loses 20 %1 each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"-20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Maximizer\",\"Icon:num\":\"239\",\"Help:json\":\"\\\"User's Max%1 is raised to 300 gains %1 from\\\\ndealing/receiving HP damage at a slower rate.\\\"\",\"MaxFormula:str\":\"300\",\"MultiplierTCR:num\":\"0.5\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Minimizer\",\"Icon:num\":\"236\",\"Help:json\":\"\\\"User's Max%1 is lowered to 50 gains %1 from\\\\ndealing/receiving HP damage at a faster rate.\\\"\",\"MaxFormula:str\":\"50\",\"MultiplierTCR:num\":\"2.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Recycler\",\"Icon:num\":\"75\",\"Help:json\":\"\\\"User's Max%1 becomes 20. User starts with 20 %1\\\\nand regenerates 20 %1 each turn.\\\"\",\"MaxFormula:str\":\"20\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Assassin\",\"Icon:num\":\"10\",\"Help:json\":\"\\\"User's Max%1 becomes 500. User starts with 500 %1,\\\\nbut receiving healing or damage halves user's %1.\\\"\",\"MaxFormula:str\":\"500\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"500\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"user.tp / -2\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"user.tp / -2\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}"]
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
 * @param Defaults
 *
 * @param DefaultTpMode:str
 * @text Default TP Mode
 * @parent Defaults
 * @desc Which TP mode should actors and enemies have by default?
 * @default Stoic
 *
 * @param GlobalTPModes:arraystr
 * @text Global TP Modes
 * @type string[]
 * @parent Defaults
 * @desc TP Modes available to the all actors to pick from.
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @param SceneSkill
 * @text Scene_Skill
 *
 * @param ShowTpMode:eval
 * @text Show TP Mode?
 * @parent SceneSkill
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show TP Mode in Scene_Skill by default?
 * @default true
 *
 * @param TpModeCmdName:str 
 * @text TP Mode Command
 * @parent SceneSkill
 * @desc The command name format shown in Scene_Skill.
 * %1 - TP Text
 * @default %1 Mode
 *
 * @param TpModeIcon:num
 * @text TP Mode Icon
 * @parent SceneSkill
 * @desc Icon used for TP Mode shown in Scene_Skill.
 * @default 164
 *
 * @param TpWindowBgType:num
 * @text Background Type
 * @parent SceneSkill
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
 */
/* ----------------------------------------------------------------------------
 * TP Modes
 * ----------------------------------------------------------------------------
 */
/*~struct~TpMode:
 *
 * @param Name:str 
 * @text TP Mode Name
 * @desc The name for this TP Mode.
 * Used for notetag reference.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @parent Name:str
 * @desc Icon used for this TP Mode.
 * @default 160
 *
 * @param Help:json
 * @text Help
 * @parent Name:str
 * @type note
 * @desc Help description used for this TP Mode.
 * %1 - In-game TP vocabulary.
 * @default "Help Line 1\nHelp Line 2"
 *
 * @param MaxFormula:str
 * @text MaxTP Formula
 * @parent Name:str
 * @desc What's the MaxTP for this TP Mode?
 * @default 100
 *
 * @param MultiplierTCR:num
 * @text TCR Multiplier
 * @parent Name:str
 * @desc Multiplier on how much TP is earned.
 * Stacks multiplicatively with TCR.
 * @default 1.0
 *
 * @param Preserve:eval
 * @text Preserve TP?
 * @parent Name:str
 * @type boolean
 * @on Preserve
 * @off Don't
 * @desc If preserved, carry TP to the next battle.
 * If not, TP resets each battle.
 * @default true
 *
 * @param Gauge
 *
 * @param FlashGauge:eval
 * @text Flash Gauge?
 * @parent Gauge
 * @type boolean
 * @on Flash
 * @off Don't Flash
 * @desc Let this gauge flash once it reaches a certain percentage 
 * value. Requires VisuMZ_1_SkillsStatesCore!
 * @default true
 *
 * @param FlashRequirement:num
 * @text Required Rate
 * @parent Gauge
 * @desc What rate does this gauge need to be over in order for it to flash?
 * @default 1.0
 *
 * @param FlashSpeed:num
 * @text Flash Speed
 * @parent Gauge
 * @type number
 * @min 1
 * @max 255
 * @desc How fast should the gauge flash different colors?
 * Lower numbers are slower. Higher numbers are faster.
 * @default 16
 *
 * @param FlashLightness:num
 * @text Color Lightness
 * @parent Gauge
 * @type number
 * @min 0
 * @max 255
 * @desc How light should the flash color be?
 * Lower numbers are darker. Higher numbers are lighter.
 * @default 160
 *
 * @param CustomLabel:str
 * @text Custom Label
 * @parent Gauge
 * @desc Instead of displaying "TP", what label do you want
 * to display here? Leave empty to keep using "TP".
 * @default 
 *
 * @param CustomColor1:str
 * @text Custom Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin. Empty for default.
 * @default 
 *
 * @param CustomColor2:str
 * @text Custom Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin. Empty for default.
 * @default 
 *
 * @param Formulas
 * @text TP Formulas
 *
 * @param Generic
 * @parent Formulas
 *
 * @param Initial:str
 * @text Initial TP
 * @parent Generic
 * @desc How much TP is gained at the start of battle?
 * @default 0
 *
 * @param CriticalHit:str
 * @text Critical Hit
 * @parent Generic
 * @desc How much TP is gained when landing a critical hit?
 * @default 0
 *
 * @param Evasion:str
 * @text Evasion
 * @parent Generic
 * @desc How much TP is gained when evading an action?
 * @default 0
 *
 * @param UseItem:str
 * @text Use Item
 * @parent Generic
 * @desc How much TP is gained when using an item in battle?
 * @default 0
 *
 * @param UseSkill:str
 * @text Use Skill
 * @parent Generic
 * @desc How much TP is gained when using a skill in battle that isn't Attack or Guard?
 * @default 0
 *
 * @param Regen
 * @text During Regen
 * @parent Formulas
 *
 * @param TpRegen:str
 * @text TP Regen
 * @parent Regen
 * @desc How much TP is gained each turn during regeneration?
 * @default 0
 *
 * @param CriticalHp:str
 * @text Critical HP
 * @parent Regen
 * @desc How much TP is gained when user is in critical HP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullHp:str
 * @text Full HP
 * @parent Regen
 * @desc How much TP is gained when user has full HP
 * during regeneration.
 * @default 0
 *
 * @param CriticalMp:str
 * @text Critical MP
 * @parent Regen
 * @desc How much TP is gained when user is in critical MP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullMp:str
 * @text Full MP
 * @parent Regen
 * @desc How much TP is gained when user has full MP
 * during regeneration.
 * @default 0
 *
 * @param OnlyMember:str
 * @text Only Member
 * @parent Regen
 * @desc How much TP is gained when user is the only alive party member during regeneration.
 * @default 0
 *
 * @param HPDmg
 * @text HP Damage
 * @parent Formulas
 *
 * @param TakeHpDmg:str
 * @text Take HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when receiving HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpDmg:str
 * @text Deal HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when dealing HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpDmg:str
 * @text Ally HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when an ally receives HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param HPHeal
 * @text HP Heal
 * @parent Formulas
 *
 * @param TakeHpHeal:str
 * @text Take HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when receiving HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpHeal:str
 * @text Deal HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when dealing HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpHeal:str
 * @text Ally HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when an ally receives HP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPDmg
 * @text MP Damage
 * @parent Formulas
 *
 * @param TakeMpDmg:str
 * @text Take MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when receiving MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpDmg:str
 * @text Deal MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when dealing MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpDmg:str
 * @text Ally MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when an ally receives MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPHeal
 * @text MP Heal
 * @parent Formulas
 *
 * @param TakeMpHeal:str
 * @text Take MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when receiving MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpHeal:str
 * @text Deal MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when dealing MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpHeal:str
 * @text Ally MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when an ally receives MP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param Buffs
 * @parent Formulas
 *
 * @param DealAllyBuff:str
 * @text Deal Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyBuff:str
 * @text Deal Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyBuff:str
 * @text Gain Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyBuff:str
 * @text Gain Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Debuffs
 * @parent Formulas
 *
 * @param DealAllyDebuff:str
 * @text Deal Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyDebuff:str
 * @text Deal Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyDebuff:str
 * @text Gain Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyDebuff:str
 * @text Gain Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param States
 * @parent Formulas
 *
 * @param DealAllyState:str
 * @text Deal Ally State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyState:str
 * @text Deal Enemy State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyState:str
 * @text Gain Ally State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyState:str
 * @text Gain Enemy State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Death
 * @parent Formulas
 *
 * @param KillAlly:str
 * @text Ally Death
 * @parent Death
 * @desc How much TP is gained when an allied member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param KillEnemy:str
 * @text Enemy Death
 * @parent Death
 * @desc How much TP is gained when an enemy member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param Battle
 * @parent Formulas
 *
 * @param WinBattle:str
 * @text Win Battle
 * @parent Battle
 * @desc How much TP is gained when the player wins a battle.
 * @default 0
 *
 * @param FleeBattle:str
 * @text Flee Battle
 * @parent Battle
 * @desc How much TP is gained when the player escapes a battle.
 * @default 0
 *
 * @param LoseBattle:str
 * @text Lose Battle
 * @parent Battle
 * @desc How much TP is gained when the player loses a battle.
 * @default 0
 *
 */
//=============================================================================

const _0x5050=['EPUmc','Game_System_initialize','DealMpDmg','onBattleStart','addTpModeCommand','YASUe','\x5cI[%1]%2','TakeHpHeal','learnAvailablePartyTpModes','maxTp','gradientFillRect','Game_Action_testApply','UseSkill','drawIcon','CriticalMp','1pAwgnO','onTpModeCancel','Game_Actor_learnSkill','showTpModeInSceneSkill','itemAt','CustomColor%1','changeTextColor','TpWindowBgType','35IiVmak','applyItemEnhancedTPEffect','cakOE','note','298870eYMMKJ','createEnhancedTpChildSprites','GainEnemyBuff','tpModeValue','playEquip','KillAlly','getColor','executeHpDamage','max','RmrRA','update','ActorChangeTPMode','AllyMpDmg','_hue','jAoUm','Game_Battler_gainSilentTp','Enemies','onDatabaseLoaded','setBackgroundType','Initial','setBlendColor','Nisab','setTpModeInSceneSkill','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','UmvsK','lineHeight','status','_tpMode','AllyHpDmg','KdZhS','subject','gaugeColor1','BattleManager_processDefeat','parse','bUnTA','learnTpMode','_tpGaugeSprite','KGSTg','xgPHO','result','Scene_Skill_create','TpModeOrder','addState','FleeBattle','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','CHNZU','sparam','ARRAYEVAL','applyGlobal','abs','onEscapeSuccess','TpRegen','GainAllyState','missed','pvXFO','textColor','gaugeBackColor','sortTpModes','exit','DealHpDmg','drawFullGauge','remove','AllyMpHeal','makeItemList','iconWidth','General','_hp','initEnhancedTP','TEpfu','show','DefaultTpMode','setHue','DtBjf','addWindow','QUtOV','executeMpDamage','learnSkillEnhancedTP','applyGlobalEnhancedTP','leader','tpCostColor','hJiEs','BattleManager_onEscapeSuccess','dvmbq','EVAL','Game_Battler_regenerateTp','STRUCT','Game_Action_executeHpDamage','MZyrt','480241gFzOLu','enemy','GainAllyDebuff','255307BKGLon','clamp','onChangeTpMode','DealEnemyDebuff','onTpModeOk','drawFullGaugeEnhancedTp','refresh','opponentsUnit','deselect','_availableTpModes','convertEnhancedTpFunctions','Sprite_Gauge_drawGaugeRect','_tpModeWindow','Game_BattlerBase_isPreserveTp','Game_Party_initialize','GlobalTPModes','FlashGauge','TpModeCmdName','createSkillTypeWindow','testApplyEnhancedTP','tpGaugeFlashSpeed','WinBattle','Sprite_Gauge_drawFullGauge','FlashLightness','SJjZA','changeBattlerTpLabel','createTpGaugeBitmaps','deathStateId','terms','setStypeId','isAlive','UseItem','FullHp','FlashSpeed','EdGIo','learnSkill','isSkill','bitmap','PDnDo','Game_Action_itemEffectAddDebuff','Sprite_Gauge_update','includes','gainSilentTp','item','Show','DealHpHeal','isTpModeCommandVisible','setHelpWindowItem','RLzpN','evaded','AllyHpHeal','length','drawText','hide','_regeneratingTp','BattleManager_processVictory','qTdbr','trg','DQnYB','JSON','GainAllyBuff','setActor','DealMpHeal','target','STR','cancel','Help','461CMFKfA','_battler','TiRwC','2263KyRmvi','tpMode','GainEnemyState','return\x200','WtIeK','defaultTpMode','TakeMpHeal','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','tpModesCommandIcon','split','DealEnemyState','forceSelect','_mp','MaxFormula','createTpModeWindow','bjRzu','FullMp','NbphV','zigba','_helpWindow','XzIQg','description','kQktn','ConvertParams','gaugeRate','apply','applyItemUserEffect','EnemyChangeTPMode','ritVa','DealAllyState','TXXCB','fRsQa','parameters','makeCommandList','friendsUnit','Game_Action_executeMpDamage','Sprite_Gauge_redraw','MaxFormulaFunc','bhKLG','TakeMpDmg','itemEffectAddBuff','itemEffectAddDebuff','EnhancedTP','map','_tp','width','Game_Actor_setup','maxCols','registerCommand','FlashRequirement','AzZFN','Name','index','41aebKJR','initTpModes','constructor','Scene_Boot_onDatabaseLoaded','drawGaugeRectEnhancedTp','useItem','_tpGaugeBack','ARRAYFUNC','tpModeWindowRect','KillEnemy','10691MCoGJZ','_statusWindow','bind','NSWiw','addCommand','Game_BattlerBase_sparam','_statusType','Wrlwq','scrollTo','refreshActor','ShowTpMode','clear','_tpModes','success','_cache','lsSVc','critical','TPModeName','Game_Action_itemEffectAddState','members','setFrame','itemLineRect','mmp','GainEnemyDebuff','CIVPh','14BTUpcH','_tpTextSprite','DIxpe','Window_SkillList_setStypeId','TakeHpDmg','commandTpMode','SedPg','fillRect','isTpGaugeFlashing','Game_Action_itemEffectAddBuff','traitObjects','SiRwS','AJWcx','floor','drawTpMode','skillIsNotAttackGuard','DealAllyBuff','changeTpCustomColor','height','processDefeat','VisuMZ_1_SkillsStatesCore','%1Func','TPModes','hXuAr','Game_Battler_onBattleStart','selectLast','Evasion','Settings','aliveMembers','aqhwL','actor','boxWidth','basic','qczVv','MultiplierTCR','FDJdh','kXNZS','ActorUnlockTPMode','iconHeight','trBMv','mhp','min','process_VisuMZ_EnhancedTP_Settings','181zChNtR','elPSt','toUpperCase','version','availableTpModes','tpModes','resetTextColor','processVictory','_skillTypeWindow','6607deKGId','isPreserveTp','Scene_Skill_createSkillTypeWindow','dAxRi','Scene_Skill_refreshActor','addChild','create','tpGaugeFlashLightness','name','isDead','push','regenerateTp','OnlyMember','itemEffectAddState','Preserve','updateEnhancedTp','ARRAYSTRUCT','TpModes','_tpModeCache','setHandler','testApply','DealEnemyBuff','initialize','drawGaugeRect','call','FUNC','trim','Game_Action_applyGlobal','gainTpFromTpMode','tpRate','Icon','changeTpMode','VdKRp','CustomLabel','setup','hnHuA','wdXvy','format','Sprite_Gauge_setup','wDVMc','activate','_data','LoseBattle','learnAvailableActorTpModes','_stypeId','Actors','gaugeColor2','BCWzK','CriticalHit','match','#%1','prototype','Window_SkillType_makeCommandList','_tpMode_SceneSkill','redraw','playOkSound','mEMid','_actor','filter','isActor','TpModeIcon','Game_Action_applyItemUserEffect','NUM','mainAreaHeight','ARRAYNUM'];const _0x3ca99e=_0x55c2;(function(_0x13bd0e,_0x3ce885){const _0x35a8c6=_0x55c2;while(!![]){try{const _0x320895=parseInt(_0x35a8c6(0x188))*parseInt(_0x35a8c6(0x105))+-parseInt(_0x35a8c6(0xbc))+-parseInt(_0x35a8c6(0xbf))*parseInt(_0x35a8c6(0x1e1))+parseInt(_0x35a8c6(0x1ed))+-parseInt(_0x35a8c6(0x13a))*-parseInt(_0x35a8c6(0x102))+parseInt(_0x35a8c6(0x191))*-parseInt(_0x35a8c6(0x15d))+-parseInt(_0x35a8c6(0x144))*-parseInt(_0x35a8c6(0x1e9));if(_0x320895===_0x3ce885)break;else _0x13bd0e['push'](_0x13bd0e['shift']());}catch(_0x195c95){_0x13bd0e['push'](_0x13bd0e['shift']());}}}(_0x5050,0x42c69));function _0x55c2(_0x441277,_0x5e456a){return _0x55c2=function(_0x505088,_0x55c292){_0x505088=_0x505088-0xad;let _0x52fa08=_0x5050[_0x505088];return _0x52fa08;},_0x55c2(_0x441277,_0x5e456a);}var label=_0x3ca99e(0x12f),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3ca99e(0x1cb)](function(_0x1ffc11){const _0x26b933=_0x3ca99e;return _0x1ffc11['status']&&_0x1ffc11['description'][_0x26b933(0xe8)]('['+label+']');})[0x0];VisuMZ[label][_0x3ca99e(0x178)]=VisuMZ[label][_0x3ca99e(0x178)]||{},VisuMZ[_0x3ca99e(0x11c)]=function(_0x265752,_0x1032bc){const _0x29a680=_0x3ca99e;for(const _0x1659fc in _0x1032bc){if(_0x1659fc[_0x29a680(0x1c2)](/(.*):(.*)/i)){const _0x4c2656=String(RegExp['$1']),_0x23540a=String(RegExp['$2'])[_0x29a680(0x18a)]()[_0x29a680(0x1ab)]();let _0x2f5f99,_0x26a359,_0x2183da;switch(_0x23540a){case _0x29a680(0x1cf):_0x2f5f99=_0x1032bc[_0x1659fc]!==''?Number(_0x1032bc[_0x1659fc]):0x0;break;case _0x29a680(0x1d1):_0x26a359=_0x1032bc[_0x1659fc]!==''?JSON[_0x29a680(0x20e)](_0x1032bc[_0x1659fc]):[],_0x2f5f99=_0x26a359[_0x29a680(0x130)](_0x4110e0=>Number(_0x4110e0));break;case _0x29a680(0xb7):_0x2f5f99=_0x1032bc[_0x1659fc]!==''?eval(_0x1032bc[_0x1659fc]):null;break;case _0x29a680(0x21c):_0x26a359=_0x1032bc[_0x1659fc]!==''?JSON[_0x29a680(0x20e)](_0x1032bc[_0x1659fc]):[],_0x2f5f99=_0x26a359[_0x29a680(0x130)](_0x2f1d88=>eval(_0x2f1d88));break;case _0x29a680(0xfa):_0x2f5f99=_0x1032bc[_0x1659fc]!==''?JSON[_0x29a680(0x20e)](_0x1032bc[_0x1659fc]):'';break;case'ARRAYJSON':_0x26a359=_0x1032bc[_0x1659fc]!==''?JSON[_0x29a680(0x20e)](_0x1032bc[_0x1659fc]):[],_0x2f5f99=_0x26a359[_0x29a680(0x130)](_0x398102=>JSON[_0x29a680(0x20e)](_0x398102));break;case _0x29a680(0x1aa):_0x2f5f99=_0x1032bc[_0x1659fc]!==''?new Function(JSON[_0x29a680(0x20e)](_0x1032bc[_0x1659fc])):new Function(_0x29a680(0x108));break;case _0x29a680(0x141):_0x26a359=_0x1032bc[_0x1659fc]!==''?JSON[_0x29a680(0x20e)](_0x1032bc[_0x1659fc]):[],_0x2f5f99=_0x26a359[_0x29a680(0x130)](_0x4c374b=>new Function(JSON['parse'](_0x4c374b)));break;case _0x29a680(0xff):_0x2f5f99=_0x1032bc[_0x1659fc]!==''?String(_0x1032bc[_0x1659fc]):'';break;case'ARRAYSTR':_0x26a359=_0x1032bc[_0x1659fc]!==''?JSON[_0x29a680(0x20e)](_0x1032bc[_0x1659fc]):[],_0x2f5f99=_0x26a359[_0x29a680(0x130)](_0x460df7=>String(_0x460df7));break;case _0x29a680(0xb9):_0x2183da=_0x1032bc[_0x1659fc]!==''?JSON['parse'](_0x1032bc[_0x1659fc]):{},_0x2f5f99=VisuMZ[_0x29a680(0x11c)]({},_0x2183da);break;case _0x29a680(0x1a1):_0x26a359=_0x1032bc[_0x1659fc]!==''?JSON['parse'](_0x1032bc[_0x1659fc]):[],_0x2f5f99=_0x26a359[_0x29a680(0x130)](_0x4725ac=>VisuMZ[_0x29a680(0x11c)]({},JSON[_0x29a680(0x20e)](_0x4725ac)));break;default:continue;}_0x265752[_0x4c2656]=_0x2f5f99;}}return _0x265752;},(_0x48f7d7=>{const _0x8343ea=_0x3ca99e,_0x53a083=_0x48f7d7[_0x8343ea(0x199)];for(const _0x521576 of dependencies){if(!Imported[_0x521576]){alert(_0x8343ea(0x204)[_0x8343ea(0x1b6)](_0x53a083,_0x521576)),SceneManager[_0x8343ea(0x227)]();break;}}const _0x5bf919=_0x48f7d7[_0x8343ea(0x11a)];if(_0x5bf919[_0x8343ea(0x1c2)](/\[Version[ ](.*?)\]/i)){if(_0x8343ea(0xf7)!==_0x8343ea(0x1d7)){const _0x46d3b9=Number(RegExp['$1']);_0x46d3b9!==VisuMZ[label]['version']&&(alert(_0x8343ea(0x219)[_0x8343ea(0x1b6)](_0x53a083,_0x46d3b9)),SceneManager[_0x8343ea(0x227)]());}else return this[_0x8343ea(0x1ba)]?this['_data']['length']:0x1;}if(_0x5bf919[_0x8343ea(0x1c2)](/\[Tier[ ](\d+)\]/i)){if(_0x8343ea(0xe5)==='PDnDo'){const _0x3d520e=Number(RegExp['$1']);_0x3d520e<tier?(alert(_0x8343ea(0x10c)[_0x8343ea(0x1b6)](_0x53a083,_0x3d520e,tier)),SceneManager[_0x8343ea(0x227)]()):_0x8343ea(0x163)===_0x8343ea(0x116)?(this[_0x8343ea(0xcb)][_0x8343ea(0xc7)](),this['_skillTypeWindow'][_0x8343ea(0x1b9)]()):tier=Math[_0x8343ea(0x1f5)](_0x3d520e,tier);}else this[_0x8343ea(0x1ee)]();}VisuMZ['ConvertParams'](VisuMZ[label][_0x8343ea(0x178)],_0x48f7d7[_0x8343ea(0x125)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x3ca99e(0x199)],_0x3ca99e(0x1f8),_0x3f53da=>{const _0xcd0290=_0x3ca99e;VisuMZ[_0xcd0290(0x11c)](_0x3f53da,_0x3f53da);const _0x53e872=_0x3f53da['Actors'][_0xcd0290(0x130)](_0x249772=>$gameActors[_0xcd0290(0x17b)](_0x249772))[_0xcd0290(0x22a)](null),_0x337777=_0x3f53da[_0xcd0290(0x155)];for(const _0x37249a of _0x53e872){if(!_0x37249a)continue;_0x37249a[_0xcd0290(0x1b0)](_0x337777);}}),PluginManager[_0x3ca99e(0x135)](pluginData[_0x3ca99e(0x199)],_0x3ca99e(0x182),_0x23c4e9=>{const _0x4f5982=_0x3ca99e;VisuMZ[_0x4f5982(0x11c)](_0x23c4e9,_0x23c4e9);const _0x584644=_0x23c4e9[_0x4f5982(0x1be)][_0x4f5982(0x130)](_0x2c170d=>$gameActors[_0x4f5982(0x17b)](_0x2c170d))[_0x4f5982(0x22a)](null),_0xf34f8b=_0x23c4e9[_0x4f5982(0x173)];for(const _0x2c3d77 of _0x584644){if(_0x4f5982(0x223)!==_0x4f5982(0x223)){const _0x3e51c5=this[_0x4f5982(0x103)][_0x4f5982(0xd3)]();this[_0x4f5982(0x211)][_0x4f5982(0x234)](this[_0x4f5982(0x211)][_0x4f5982(0x1fa)]+_0x3e51c5);const _0xb6694b=this[_0x4f5982(0x103)][_0x4f5982(0x198)]();this[_0x4f5982(0x211)][_0x4f5982(0x201)]([0xff,0xff,0xff,_0xb6694b]);}else{if(!_0x2c3d77)continue;for(const _0x47955c of _0xf34f8b){if(_0x4f5982(0x123)==='zPKjm')return _0x54d350[_0x4f5982(0x12f)]['Settings'][_0x4f5982(0x22e)][_0x4f5982(0x233)]['toUpperCase']()[_0x4f5982(0x1ab)]();else _0x2c3d77[_0x4f5982(0x210)](_0x47955c);}}}}),PluginManager[_0x3ca99e(0x135)](pluginData[_0x3ca99e(0x199)],'ActorUnlockAllTPModes',_0x5a6250=>{const _0xff3243=_0x3ca99e;VisuMZ['ConvertParams'](_0x5a6250,_0x5a6250);const _0x28e744=_0x5a6250['Actors'][_0xff3243(0x130)](_0x4c915d=>$gameActors[_0xff3243(0x17b)](_0x4c915d))[_0xff3243(0x22a)](null),_0x146e60=VisuMZ[_0xff3243(0x12f)]['TpModeOrder'];for(const _0x27c5e0 of _0x28e744){if(!_0x27c5e0)continue;for(const _0x1d03eb of _0x146e60){_0x27c5e0[_0xff3243(0x210)](_0x1d03eb);}}}),PluginManager['registerCommand'](pluginData['name'],_0x3ca99e(0x120),_0x4eb100=>{const _0x240441=_0x3ca99e;VisuMZ[_0x240441(0x11c)](_0x4eb100,_0x4eb100);const _0x5b5830=_0x4eb100[_0x240441(0x1fd)][_0x240441(0x130)](_0x29d51b=>$gameTroop[_0x240441(0x157)]()[_0x29d51b])[_0x240441(0x22a)](null),_0x3e823a=_0x4eb100[_0x240441(0x155)];for(const _0x4b6ef3 of _0x5b5830){if(_0x240441(0xb6)===_0x240441(0xb6)){if(!_0x4b6ef3)continue;_0x4b6ef3[_0x240441(0x1b0)](_0x3e823a);}else _0x3aebd[_0x240441(0x12f)][_0x240441(0xca)]['call'](this,_0x30ff0,_0x5ad358,_0x4a16c8,_0x3a139f);}}),PluginManager['registerCommand'](pluginData[_0x3ca99e(0x199)],'SceneSkillTpMode',_0x4efd0b=>{const _0x3f61f0=_0x3ca99e;VisuMZ[_0x3f61f0(0x11c)](_0x4efd0b,_0x4efd0b),$gameSystem[_0x3f61f0(0x203)](_0x4efd0b[_0x3f61f0(0xeb)]);}),VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0x13d)]=Scene_Boot['prototype'][_0x3ca99e(0x1fe)],Scene_Boot[_0x3ca99e(0x1c4)][_0x3ca99e(0x1fe)]=function(){const _0xeaa188=_0x3ca99e;VisuMZ[_0xeaa188(0x12f)]['Scene_Boot_onDatabaseLoaded'][_0xeaa188(0x1a9)](this),this[_0xeaa188(0x187)]();},Scene_Boot[_0x3ca99e(0x1c4)][_0x3ca99e(0x187)]=function(){const _0x5e5ba0=_0x3ca99e;VisuMZ['EnhancedTP']['TpModes']={},VisuMZ[_0x5e5ba0(0x12f)][_0x5e5ba0(0x216)]=[];for(const _0x26d0fd of VisuMZ['EnhancedTP'][_0x5e5ba0(0x178)]['TpMode']){if(_0x5e5ba0(0x20f)==='bUnTA'){if(!_0x26d0fd)continue;_0x26d0fd[_0x5e5ba0(0x11a)]=_0x26d0fd[_0x5e5ba0(0x101)][_0x5e5ba0(0x1b6)](TextManager['tp']),this[_0x5e5ba0(0xc9)](_0x26d0fd);const _0x218d2c=_0x26d0fd[_0x5e5ba0(0x138)][_0x5e5ba0(0x18a)]()[_0x5e5ba0(0x1ab)]();VisuMZ[_0x5e5ba0(0x12f)][_0x5e5ba0(0x1a2)][_0x218d2c]=_0x26d0fd,VisuMZ['EnhancedTP'][_0x5e5ba0(0x216)]['push'](_0x218d2c);}else{const _0x28b383=_0x18ac5c(_0x410322['$1'])['split'](/[\r\n]+/);for(const _0x183ae7 of _0x28b383){_0x3c9757['learnTpMode'](_0x183ae7);}}}},Scene_Boot[_0x3ca99e(0x1c4)][_0x3ca99e(0xc9)]=function(_0x3cfe40){const _0x39f412=_0x3ca99e,_0x4e25b8=[_0x39f412(0x112),_0x39f412(0x200),_0x39f412(0x1c1),'Evasion',_0x39f412(0xde),_0x39f412(0x1de),_0x39f412(0x220),'CriticalHp',_0x39f412(0xdf),_0x39f412(0x1e0),_0x39f412(0x115),_0x39f412(0x19d),_0x39f412(0x161),'DealHpDmg',_0x39f412(0x209),_0x39f412(0x1d9),_0x39f412(0xec),'AllyHpHeal',_0x39f412(0x12c),'DealMpDmg',_0x39f412(0x1f9),_0x39f412(0x10b),'DealMpHeal',_0x39f412(0x22b),_0x39f412(0x16d),_0x39f412(0x1a6),_0x39f412(0xfb),_0x39f412(0x1ef),'DealAllyDebuff',_0x39f412(0xc2),_0x39f412(0xbe),_0x39f412(0x15b),_0x39f412(0x122),_0x39f412(0x10f),_0x39f412(0x221),_0x39f412(0x107),_0x39f412(0x1f2),_0x39f412(0x143),_0x39f412(0xd4),_0x39f412(0x218),'LoseBattle'];for(const _0x40a2af of _0x4e25b8){const _0x41642c='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20damage\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20heal\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20%1;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x39f412(0x1b6)](_0x3cfe40[_0x40a2af]);_0x3cfe40[_0x39f412(0x172)[_0x39f412(0x1b6)](_0x40a2af)]=new Function('user',_0x39f412(0xfe),'value',_0x41642c);}},TextManager['tpModesCommandText']=VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0x178)]['General'][_0x3ca99e(0xd0)],ColorManager[_0x3ca99e(0x1f3)]=function(_0x5b44a1){const _0x9108af=_0x3ca99e;return _0x5b44a1=String(_0x5b44a1),_0x5b44a1[_0x9108af(0x1c2)](/#(.*)/i)?_0x9108af(0x1c3)['format'](String(RegExp['$1'])):this[_0x9108af(0x224)](Number(_0x5b44a1));},ImageManager[_0x3ca99e(0x10d)]=VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0x178)][_0x3ca99e(0x22e)][_0x3ca99e(0x1cd)],VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0xf6)]=BattleManager['processVictory'],BattleManager[_0x3ca99e(0x18f)]=function(){const _0x320aa0=_0x3ca99e;VisuMZ[_0x320aa0(0x12f)][_0x320aa0(0xf6)][_0x320aa0(0x1a9)](this),$gameParty[_0x320aa0(0x1ad)](_0x320aa0(0xd4),$gameParty[_0x320aa0(0xb2)](),0x0);},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0xb5)]=BattleManager[_0x3ca99e(0x21f)],BattleManager[_0x3ca99e(0x21f)]=function(){const _0xb9893e=_0x3ca99e;VisuMZ['EnhancedTP'][_0xb9893e(0xb5)]['call'](this),$gameParty[_0xb9893e(0x1ad)](_0xb9893e(0x218),$gameParty[_0xb9893e(0xb2)](),0x0);},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0x20d)]=BattleManager[_0x3ca99e(0x170)],BattleManager['processDefeat']=function(){const _0x1972b1=_0x3ca99e;VisuMZ[_0x1972b1(0x12f)]['BattleManager_processDefeat'][_0x1972b1(0x1a9)](this),$gameParty[_0x1972b1(0x1ad)](_0x1972b1(0x1bb),$gameParty[_0x1972b1(0xb2)](),0x0);},VisuMZ['EnhancedTP'][_0x3ca99e(0x1d3)]=Game_System[_0x3ca99e(0x1c4)][_0x3ca99e(0x1a7)],Game_System[_0x3ca99e(0x1c4)][_0x3ca99e(0x1a7)]=function(){const _0x55945c=_0x3ca99e;VisuMZ[_0x55945c(0x12f)][_0x55945c(0x1d3)][_0x55945c(0x1a9)](this),this['initEnhancedTP']();},Game_System['prototype'][_0x3ca99e(0x230)]=function(){const _0x1735ee=_0x3ca99e;this[_0x1735ee(0x1c6)]=VisuMZ[_0x1735ee(0x12f)][_0x1735ee(0x178)][_0x1735ee(0x22e)][_0x1735ee(0x14e)];},Game_System['prototype'][_0x3ca99e(0x1e4)]=function(){const _0x28f84b=_0x3ca99e;if(this[_0x28f84b(0x1c6)]===undefined)this[_0x28f84b(0x230)]();return this['_tpMode_SceneSkill'];},Game_System[_0x3ca99e(0x1c4)][_0x3ca99e(0x203)]=function(_0x58447e){const _0x2c2dc8=_0x3ca99e;if(this['_tpMode_SceneSkill']===undefined)this['initEnhancedTP']();this[_0x2c2dc8(0x1c6)]=_0x58447e;},VisuMZ[_0x3ca99e(0x12f)]['Game_Action_apply']=Game_Action[_0x3ca99e(0x1c4)][_0x3ca99e(0x11e)],Game_Action[_0x3ca99e(0x1c4)][_0x3ca99e(0x11e)]=function(_0x59929d){const _0x1083da=_0x3ca99e;VisuMZ['EnhancedTP']['Game_Action_apply'][_0x1083da(0x1a9)](this,_0x59929d),this['applyEnhancedTP'](_0x59929d);},Game_Action[_0x3ca99e(0x1c4)]['applyEnhancedTP']=function(_0x41bcc5){const _0x14ecef=_0x3ca99e,_0x2112fa=_0x41bcc5[_0x14ecef(0x214)]();_0x2112fa[_0x14ecef(0x154)]&&this[_0x14ecef(0x20b)]()[_0x14ecef(0x1ad)]('CriticalHit',_0x41bcc5,0x0),(_0x2112fa[_0x14ecef(0xf0)]||_0x2112fa[_0x14ecef(0x222)])&&(_0x14ecef(0xbb)===_0x14ecef(0xbb)?_0x41bcc5[_0x14ecef(0x1ad)](_0x14ecef(0x177),_0x41bcc5,0x0):(this[_0x14ecef(0x140)]=new _0x44bec5(),this[_0x14ecef(0x196)](this[_0x14ecef(0x140)])));},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0xba)]=Game_Action[_0x3ca99e(0x1c4)]['executeHpDamage'],Game_Action[_0x3ca99e(0x1c4)][_0x3ca99e(0x1f4)]=function(_0xa31fd,_0x238fc6){const _0x357420=_0x3ca99e;VisuMZ[_0x357420(0x12f)][_0x357420(0xba)][_0x357420(0x1a9)](this,_0xa31fd,_0x238fc6);const _0x3a3664=this[_0x357420(0x20b)]();if(_0x238fc6>0x0){if(_0x357420(0x1d2)!==_0x357420(0x1d2))return!![];else _0xa31fd['gainTpFromTpMode'](_0x357420(0x161),_0xa31fd,_0x238fc6),_0x3a3664[_0x357420(0x1ad)](_0x357420(0x228),_0xa31fd,_0x238fc6),_0xa31fd[_0x357420(0x127)]()['gainTpFromTpMode'](_0x357420(0x209),_0xa31fd,_0x238fc6);}else _0x238fc6=Math['abs'](_0x238fc6),_0xa31fd[_0x357420(0x1ad)]('TakeHpHeal',_0xa31fd,_0x238fc6),_0x3a3664[_0x357420(0x1ad)](_0x357420(0xec),_0xa31fd,_0x238fc6),_0xa31fd[_0x357420(0x127)]()[_0x357420(0x1ad)](_0x357420(0xf1),_0xa31fd,_0x238fc6);},VisuMZ['EnhancedTP']['Game_Action_executeMpDamage']=Game_Action[_0x3ca99e(0x1c4)][_0x3ca99e(0xaf)],Game_Action[_0x3ca99e(0x1c4)][_0x3ca99e(0xaf)]=function(_0x2855c2,_0x406a0d){const _0x33fc0c=_0x3ca99e;VisuMZ[_0x33fc0c(0x12f)][_0x33fc0c(0x128)][_0x33fc0c(0x1a9)](this,_0x2855c2,_0x406a0d);const _0x4b37d6=this[_0x33fc0c(0x20b)]();if(_0x406a0d>0x0)_0x2855c2[_0x33fc0c(0x1ad)]('TakeMpDmg',_0x2855c2,_0x406a0d),_0x4b37d6[_0x33fc0c(0x1ad)](_0x33fc0c(0x1d4),_0x2855c2,_0x406a0d),_0x2855c2['friendsUnit']()[_0x33fc0c(0x1ad)](_0x33fc0c(0x1f9),_0x2855c2,_0x406a0d);else{if('cakOE'===_0x33fc0c(0x1eb))_0x406a0d=Math[_0x33fc0c(0x21e)](_0x406a0d),_0x2855c2[_0x33fc0c(0x1ad)](_0x33fc0c(0x10b),_0x2855c2,_0x406a0d),_0x4b37d6['gainTpFromTpMode'](_0x33fc0c(0xfd),_0x2855c2,_0x406a0d),_0x2855c2[_0x33fc0c(0x127)]()[_0x33fc0c(0x1ad)]('AllyMpHeal',_0x2855c2,_0x406a0d);else return _0x12cd84[_0x33fc0c(0x207)]&&_0x362c40[_0x33fc0c(0x11a)][_0x33fc0c(0xe8)]('['+_0x4db4ce+']');}},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0x166)]=Game_Action[_0x3ca99e(0x1c4)][_0x3ca99e(0x12d)],Game_Action['prototype'][_0x3ca99e(0x12d)]=function(_0x46447d,_0x176610){const _0x264f80=_0x3ca99e;VisuMZ[_0x264f80(0x12f)][_0x264f80(0x166)][_0x264f80(0x1a9)](this,_0x46447d,_0x176610);if(!_0x46447d[_0x264f80(0x214)]()['success'])return;const _0x165721=this[_0x264f80(0x20b)]();if(_0x165721[_0x264f80(0x1cc)]()===_0x46447d[_0x264f80(0x1cc)]()){if(_0x264f80(0x153)===_0x264f80(0x153))_0x165721[_0x264f80(0x1ad)](_0x264f80(0x16d),_0x46447d,0x0),_0x46447d[_0x264f80(0x1ad)](_0x264f80(0xfb),_0x46447d,0x0);else{if(this['_availableTpModes']===_0x50e469)this[_0x264f80(0x230)]();this[_0x264f80(0x1da)]();let _0x28ce65=this[_0x264f80(0xc8)][_0x264f80(0x130)](_0x1d3c67=>_0x2937e4['EnhancedTP'][_0x264f80(0x1a2)][_0x1d3c67]);return _0x28ce65[_0x264f80(0x22a)](null);}}else _0x165721[_0x264f80(0x1ad)](_0x264f80(0x1a6),_0x46447d,0x0),_0x46447d[_0x264f80(0x1ad)](_0x264f80(0x1ef),_0x46447d,0x0);},VisuMZ[_0x3ca99e(0x12f)]['Game_Action_itemEffectAddDebuff']=Game_Action[_0x3ca99e(0x1c4)][_0x3ca99e(0x12e)],Game_Action['prototype']['itemEffectAddDebuff']=function(_0x2a8f70,_0x1fcbb1){const _0x57436f=_0x3ca99e;VisuMZ[_0x57436f(0x12f)][_0x57436f(0xe6)][_0x57436f(0x1a9)](this,_0x2a8f70,_0x1fcbb1);if(!_0x2a8f70[_0x57436f(0x214)]()[_0x57436f(0x151)])return;const _0x3b38e5=this['subject']();_0x3b38e5[_0x57436f(0x1cc)]()===_0x2a8f70['isActor']()?_0x57436f(0x121)===_0x57436f(0x169)?(this[_0x57436f(0xc8)]=[],_0x4198d6[_0x57436f(0x1c4)][_0x57436f(0x230)]['call'](this),this[_0x57436f(0x1da)](),this[_0x57436f(0x1bc)]()):(_0x3b38e5[_0x57436f(0x1ad)]('DealAllyDebuff',_0x2a8f70,0x0),_0x2a8f70['gainTpFromTpMode'](_0x57436f(0xbe),_0x2a8f70,0x0)):(_0x3b38e5['gainTpFromTpMode']('DealEnemyDebuff',_0x2a8f70,0x0),_0x2a8f70[_0x57436f(0x1ad)]('GainEnemyDebuff',_0x2a8f70,0x0));},VisuMZ['EnhancedTP'][_0x3ca99e(0x156)]=Game_Action['prototype'][_0x3ca99e(0x19e)],Game_Action['prototype'][_0x3ca99e(0x19e)]=function(_0x1d61b0,_0x2e0718){const _0x53b99e=_0x3ca99e,_0x2d4030=_0x1d61b0[_0x53b99e(0x214)]()[_0x53b99e(0x151)];_0x1d61b0[_0x53b99e(0x214)]()['success']=![],VisuMZ[_0x53b99e(0x12f)][_0x53b99e(0x156)][_0x53b99e(0x1a9)](this,_0x1d61b0,_0x2e0718);if(!_0x1d61b0[_0x53b99e(0x214)]()[_0x53b99e(0x151)]){if(_0x53b99e(0x213)!==_0x53b99e(0x1f6)){_0x1d61b0[_0x53b99e(0x214)]()[_0x53b99e(0x151)]=_0x2d4030;return;}else{const _0x3d8fe9=_0x43599b(_0x52e59e['$1'])[_0x53b99e(0x10e)](/[\r\n]+/);for(const _0x1a4115 of _0x3d8fe9){this[_0x53b99e(0x210)](_0x1a4115['toUpperCase']()[_0x53b99e(0x1ab)]());}}}const _0x17aefd=this[_0x53b99e(0x20b)]();_0x17aefd[_0x53b99e(0x1cc)]()===_0x1d61b0[_0x53b99e(0x1cc)]()?(_0x17aefd[_0x53b99e(0x1ad)](_0x53b99e(0x122),_0x1d61b0,0x0),_0x1d61b0['gainTpFromTpMode'](_0x53b99e(0x221),_0x1d61b0,0x0)):(_0x17aefd[_0x53b99e(0x1ad)]('DealEnemyState',_0x1d61b0,0x0),_0x1d61b0[_0x53b99e(0x1ad)](_0x53b99e(0x107),_0x1d61b0,0x0));},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0x1ce)]=Game_Action[_0x3ca99e(0x1c4)]['applyItemUserEffect'],Game_Action[_0x3ca99e(0x1c4)][_0x3ca99e(0x11f)]=function(_0x190197){const _0x2057ca=_0x3ca99e;VisuMZ[_0x2057ca(0x12f)][_0x2057ca(0x1ce)]['call'](this,_0x190197),this[_0x2057ca(0x1ea)](_0x190197);},Game_Action['prototype'][_0x3ca99e(0x1ea)]=function(_0x3ae82e){const _0x42c848=_0x3ca99e;if(!_0x3ae82e)return;const _0x4eb29e=this[_0x42c848(0xea)]()['note'],_0x54cdab=this[_0x42c848(0x20b)]();_0x4eb29e['match'](/<CHANGE TARGET TP MODE: (.*)>/i)&&(_0x42c848(0x174)===_0x42c848(0x174)?_0x3ae82e['changeTpMode'](String(RegExp['$1'])):this['changeTextColor'](_0x3e04fa[_0x42c848(0xb3)]()));if(!_0x3ae82e[_0x42c848(0x1cc)]())return;const _0x54bd9b=_0x4eb29e['match'](/<UNLOCK TP MODE: (.*)>/gi);if(_0x54bd9b)for(const _0x328cf1 of _0x54bd9b){_0x42c848(0x20a)===_0x42c848(0x235)?(_0x5835c8=_0x248fed[_0x42c848(0x21e)](_0x2dea90),_0x1f592d['gainTpFromTpMode'](_0x42c848(0x1d9),_0x2973a2,_0x6389c0),_0x91fcac[_0x42c848(0x1ad)](_0x42c848(0xec),_0x3b538b,_0x1a5a25),_0x43a0b6[_0x42c848(0x127)]()[_0x42c848(0x1ad)](_0x42c848(0xf1),_0x5320b6,_0x2644e1)):(_0x328cf1[_0x42c848(0x1c2)](/<UNLOCK TP MODE: (.*)>/i),_0x3ae82e['learnTpMode'](String(RegExp['$1'])));}if(_0x4eb29e['match'](/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i)){const _0x19ad65=String(RegExp['$1'])[_0x42c848(0x10e)](/[\r\n]+/);for(const _0x59ed37 of _0x19ad65){_0x42c848(0x15f)!==_0x42c848(0x21a)?_0x3ae82e[_0x42c848(0x210)](_0x59ed37):(this[_0x42c848(0x1ca)]=_0x1a9e61,this[_0x42c848(0xc5)](),this[_0x42c848(0x14c)](0x0,0x0));}}},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0x1ac)]=Game_Action[_0x3ca99e(0x1c4)][_0x3ca99e(0x21d)],Game_Action[_0x3ca99e(0x1c4)][_0x3ca99e(0x21d)]=function(){const _0x3c2e26=_0x3ca99e;VisuMZ[_0x3c2e26(0x12f)][_0x3c2e26(0x1ac)][_0x3c2e26(0x1a9)](this),this['applyGlobalEnhancedTP']();},Game_Action[_0x3ca99e(0x1c4)][_0x3ca99e(0xb1)]=function(){const _0x48ccc2=_0x3ca99e,_0x4179c4=this[_0x48ccc2(0xea)]()[_0x48ccc2(0x1ec)],_0x5307f4=this[_0x48ccc2(0x20b)]();_0x4179c4[_0x48ccc2(0x1c2)](/<CHANGE USER TP MODE: (.*)>/i)&&('QBzBc'==='QBzBc'?_0x5307f4[_0x48ccc2(0x1b0)](String(RegExp['$1'])):(_0xd14689[_0x48ccc2(0x12f)][_0x48ccc2(0x1b7)][_0x48ccc2(0x1a9)](this,_0x415534,_0x2307ee),this[_0x48ccc2(0x14a)]==='tp'&&this[_0x48ccc2(0x1ee)]()));},VisuMZ['EnhancedTP'][_0x3ca99e(0x1dd)]=Game_Action[_0x3ca99e(0x1c4)]['testApply'],Game_Action['prototype'][_0x3ca99e(0x1a5)]=function(_0x16be83){const _0x3cf4d0=_0x3ca99e;if(this[_0x3cf4d0(0xd2)](_0x16be83))return!![];return VisuMZ[_0x3cf4d0(0x12f)][_0x3cf4d0(0x1dd)][_0x3cf4d0(0x1a9)](this,_0x16be83);},Game_Action[_0x3ca99e(0x1c4)][_0x3ca99e(0xd2)]=function(_0x1e1069){const _0x3a7e39=_0x3ca99e;if(!this['item']())return![];const _0x3ec5a7=this[_0x3a7e39(0xea)]()['note'],_0x54807b=[/<CHANGE USER TP MODE: (.*)>/i,/<CHANGE TARGET TP MODE: (.*)>/i,/<UNLOCK TP MODE: (.*)>/gi,/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i];for(const _0x557de0 of _0x54807b){if(_0x3ec5a7[_0x3a7e39(0x1c2)](_0x557de0))return!![];}return![];},Game_BattlerBase[_0x3ca99e(0x1c4)][_0x3ca99e(0x230)]=function(){const _0x5cf6c4=_0x3ca99e;this[_0x5cf6c4(0x1b0)](this[_0x5cf6c4(0x10a)]());},Game_BattlerBase[_0x3ca99e(0x1c4)][_0x3ca99e(0x1b0)]=function(_0x2f7fce){const _0x41548a=_0x3ca99e;_0x2f7fce=_0x2f7fce['toUpperCase']()[_0x41548a(0x1ab)]();if(!VisuMZ[_0x41548a(0x12f)][_0x41548a(0x1a2)][_0x2f7fce])return;this['_tpMode']=_0x2f7fce,this[_0x41548a(0xc1)](_0x2f7fce);},Game_BattlerBase[_0x3ca99e(0x1c4)][_0x3ca99e(0x10a)]=function(){const _0x2ae87b=_0x3ca99e;return VisuMZ[_0x2ae87b(0x12f)][_0x2ae87b(0x178)]['General'][_0x2ae87b(0x233)][_0x2ae87b(0x18a)]()['trim']();},Game_BattlerBase['prototype'][_0x3ca99e(0x106)]=function(){const _0x529524=_0x3ca99e;if(this['_tpMode']===undefined)this['initEnhancedTP']();let _0x470f9f=this[_0x529524(0x208)];for(const _0x3bd815 of this[_0x529524(0x167)]()){if(!_0x3bd815)continue;if(_0x3bd815[_0x529524(0x1ec)]['match'](/<FORCE TP MODE: (.*)>/i)){const _0x58a698=String(RegExp['$1'])['toUpperCase']()['trim']();if(!VisuMZ['EnhancedTP'][_0x529524(0x1a2)][_0x58a698])continue;_0x470f9f=_0x58a698;break;}}return VisuMZ[_0x529524(0x12f)][_0x529524(0x1a2)][_0x470f9f[_0x529524(0x18a)]()['trim']()];},Game_BattlerBase['prototype'][_0x3ca99e(0x1f0)]=function(_0x2bed49,_0x5ccdcb,_0x208728){const _0x1f5e06=_0x3ca99e,_0x146b8e=this[_0x1f5e06(0x106)]();if(!_0x146b8e)return 0x0;_0x2bed49=_0x1f5e06(0x172)['format'](_0x2bed49);if(!_0x146b8e[_0x2bed49])return 0x0;return _0x146b8e[_0x2bed49](this,_0x5ccdcb,_0x208728);},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0x1fc)]=Game_Battler['prototype'][_0x3ca99e(0xe9)],Game_Battler[_0x3ca99e(0x1c4)][_0x3ca99e(0xe9)]=function(_0x1121cd){const _0x4c342d=_0x3ca99e;this[_0x4c342d(0xf5)]?this[_0x4c342d(0x131)]=(this[_0x4c342d(0x131)]+_0x1121cd)['clamp'](0x0,this[_0x4c342d(0x1db)]()):_0x4c342d(0x17a)===_0x4c342d(0xe1)?(_0x1e5242[_0x4c342d(0x1c2)](/<LEARN TP MODE: (.*)>/i),this[_0x4c342d(0x210)](_0x107fb3(_0xc5b06e['$1']))):VisuMZ['EnhancedTP'][_0x4c342d(0x1fc)]['call'](this,_0x1121cd);},Game_BattlerBase[_0x3ca99e(0x1c4)]['gainTpFromTpMode']=function(_0x1391aa,_0x11eb74,_0x5681db){const _0x5844a4=_0x3ca99e,_0x221f69=Math[_0x5844a4(0x16a)](this[_0x5844a4(0x1f0)](_0x1391aa,_0x11eb74,_0x5681db));this['gainSilentTp'](_0x221f69);},VisuMZ[_0x3ca99e(0x12f)]['Game_BattlerBase_maxTp']=Game_BattlerBase[_0x3ca99e(0x1c4)][_0x3ca99e(0x1db)],Game_BattlerBase['prototype'][_0x3ca99e(0x1db)]=function(){const _0x200ff3=_0x3ca99e;if(this['tpMode']())return Math[_0x200ff3(0x16a)](this['tpMode']()[_0x200ff3(0x12a)](this,this,0x0));return VisuMZ[_0x200ff3(0x12f)]['Game_BattlerBase_maxTp']['call'](this);},VisuMZ['EnhancedTP']['Game_BattlerBase_isPreserveTp']=Game_BattlerBase['prototype'][_0x3ca99e(0x192)],Game_BattlerBase['prototype']['isPreserveTp']=function(){const _0x36440d=_0x3ca99e;if(this['tpMode']())return this['tpMode']()[_0x36440d(0x19f)];return VisuMZ[_0x36440d(0x12f)][_0x36440d(0xcc)]['call'](this);},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0x149)]=Game_BattlerBase[_0x3ca99e(0x1c4)][_0x3ca99e(0x21b)],Game_BattlerBase['prototype'][_0x3ca99e(0x21b)]=function(_0x4c49f8){const _0x1f7c3a=_0x3ca99e;let _0x244037=VisuMZ[_0x1f7c3a(0x12f)][_0x1f7c3a(0x149)][_0x1f7c3a(0x1a9)](this,_0x4c49f8);return _0x4c49f8===0x5&&this[_0x1f7c3a(0x106)]()&&(_0x244037*=this['tpMode']()[_0x1f7c3a(0x17f)]),_0x244037;},Game_BattlerBase[_0x3ca99e(0x1c4)][_0x3ca99e(0x165)]=function(){const _0x2bcc3e=_0x3ca99e;if(!Imported[_0x2bcc3e(0x171)])return![];const _0x8f5e23=this[_0x2bcc3e(0x106)]();if(!_0x8f5e23)return![];if(!_0x8f5e23[_0x2bcc3e(0xcf)])return![];const _0x50f385=_0x8f5e23[_0x2bcc3e(0x136)]||0x0;return this[_0x2bcc3e(0x1ae)]()>=_0x50f385;},Game_BattlerBase['prototype']['tpGaugeFlashSpeed']=function(){const _0x1d7433=_0x3ca99e,_0x142ea3=this['tpMode']();if(!_0x142ea3)return![];return(_0x142ea3[_0x1d7433(0xe0)]||0x1)[_0x1d7433(0xc0)](0x1,0xff);},Game_BattlerBase['prototype']['tpGaugeFlashLightness']=function(){const _0x290bfe=_0x3ca99e,_0x21f49d=this[_0x290bfe(0x106)]();if(!_0x21f49d)return![];return(_0x21f49d[_0x290bfe(0xd6)]||0x0)[_0x290bfe(0xc0)](0x0,0xff);},Game_Battler['prototype']['initTp']=function(){},VisuMZ['EnhancedTP'][_0x3ca99e(0x175)]=Game_Battler['prototype'][_0x3ca99e(0x1d5)],Game_Battler[_0x3ca99e(0x1c4)][_0x3ca99e(0x1d5)]=function(_0x2a6886){const _0x4f7529=_0x3ca99e;VisuMZ['EnhancedTP'][_0x4f7529(0x175)][_0x4f7529(0x1a9)](this,_0x2a6886),this['gainTpFromTpMode'](_0x4f7529(0x200),this,0x0);},VisuMZ[_0x3ca99e(0x12f)]['Game_Battler_useItem']=Game_Battler[_0x3ca99e(0x1c4)][_0x3ca99e(0x13f)],Game_Battler['prototype'][_0x3ca99e(0x13f)]=function(_0xe3c3bd){const _0x99e098=_0x3ca99e;VisuMZ[_0x99e098(0x12f)]['Game_Battler_useItem']['call'](this,_0xe3c3bd);this[_0x99e098(0x16c)](_0xe3c3bd)&&this[_0x99e098(0x1ad)](_0x99e098(0x1de),this,0x0);if(DataManager['isItem'](_0xe3c3bd)){if('TEpfu'!==_0x99e098(0x231)){this[_0x99e098(0xcb)][_0x99e098(0x1b9)]();const _0x576b4f=this[_0x99e098(0xcb)][_0x99e098(0xea)]();if(!_0x576b4f)return;this['actor']()[_0x99e098(0x1b0)](_0x576b4f[_0x99e098(0x138)]),this['_tpModeWindow'][_0x99e098(0xc5)](),this[_0x99e098(0x145)]['refresh']();}else this['gainTpFromTpMode'](_0x99e098(0xde),this,0x0);}},Game_Battler[_0x3ca99e(0x1c4)][_0x3ca99e(0x16c)]=function(_0x2f003f){const _0x1510b=_0x3ca99e;if(!_0x2f003f)return![];if(!DataManager[_0x1510b(0xe3)](_0x2f003f))return![];if(_0x2f003f['id']===this['attackSkillId']())return![];if(_0x2f003f['id']===this['guardSkillId']())return![];return!![];},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0xb8)]=Game_Battler[_0x3ca99e(0x1c4)][_0x3ca99e(0x19c)],Game_Battler['prototype']['regenerateTp']=function(){const _0x2c92c9=_0x3ca99e;this[_0x2c92c9(0xf5)]=!![];const _0x2f04f9=Math['floor'](this['maxTp']()*this[_0x2c92c9(0xf8)]);this[_0x2c92c9(0xe9)](_0x2f04f9),this[_0x2c92c9(0x1ad)](_0x2c92c9(0x220),this,0x0);this[_0x2c92c9(0x22f)]<this[_0x2c92c9(0x185)]/0x4&&this['gainTpFromTpMode']('CriticalHp',this,0x0);this[_0x2c92c9(0x22f)]>=this[_0x2c92c9(0x185)]&&this[_0x2c92c9(0x1ad)]('FullHp',this,0x0);this['_mp']<this[_0x2c92c9(0x15a)]/0x4&&this[_0x2c92c9(0x1ad)]('CriticalMp',this,0x0);if(this[_0x2c92c9(0x111)]>=this[_0x2c92c9(0x15a)]){if('twoqN'!==_0x2c92c9(0x212))this[_0x2c92c9(0x1ad)](_0x2c92c9(0x115),this,0x0);else{const _0x1b3e57=_0x27c778(_0x4f0a8c['$1']);_0x1b3e57!==_0x15893e[_0x1be2e1][_0x2c92c9(0x18b)]&&(_0x1b6f82(_0x2c92c9(0x219)[_0x2c92c9(0x1b6)](_0x34d100,_0x1b3e57)),_0x2ec53a[_0x2c92c9(0x227)]());}}this['friendsUnit']()['aliveMembers']()[_0x2c92c9(0xf2)]<=0x1&&(_0x2c92c9(0x109)!=='UXHzg'?this['gainTpFromTpMode'](_0x2c92c9(0x19d),this,0x0):this[_0x2c92c9(0x1ad)](_0x2c92c9(0xde),this,0x0)),this[_0x2c92c9(0xf5)]=undefined,this[_0x2c92c9(0xc5)]();},Game_Battler[_0x3ca99e(0x1c4)]['chargeTpByDamage']=function(_0x547b8b){},VisuMZ[_0x3ca99e(0x12f)]['Game_Battler_addState']=Game_Battler[_0x3ca99e(0x1c4)][_0x3ca99e(0x217)],Game_Battler[_0x3ca99e(0x1c4)]['addState']=function(_0x23e445){const _0x544fda=_0x3ca99e,_0x1da974=this[_0x544fda(0xdd)]();VisuMZ[_0x544fda(0x12f)]['Game_Battler_addState'][_0x544fda(0x1a9)](this,_0x23e445);if(_0x23e445===this[_0x544fda(0xda)]()&&this[_0x544fda(0x19a)]()&&_0x1da974){if(_0x544fda(0x184)===_0x544fda(0x147)){if(!this[_0x544fda(0x103)])return;const _0x4b1b85=this[_0x544fda(0x103)][_0x544fda(0x106)]();_0x4b1b85[_0x544fda(0x1b2)]&&(_0x220931[_0x544fda(0xdb)][_0x544fda(0x17d)][0x7]=_0x4b1b85[_0x544fda(0x1b2)][_0x544fda(0x1ab)]());}else this['friendsUnit']()[_0x544fda(0x1ad)](_0x544fda(0x1f2),this,0x0),this[_0x544fda(0xc6)]()[_0x544fda(0x1ad)]('KillEnemy',this,0x0);}},Game_Battler[_0x3ca99e(0x1c4)][_0x3ca99e(0xc1)]=function(_0x2efbb1){const _0x26242e=_0x3ca99e;this[_0x26242e(0x152)]={},this['_tp']=Math[_0x26242e(0x186)](this[_0x26242e(0x131)],this[_0x26242e(0x1db)]());},VisuMZ['EnhancedTP'][_0x3ca99e(0x133)]=Game_Actor[_0x3ca99e(0x1c4)]['setup'],Game_Actor[_0x3ca99e(0x1c4)][_0x3ca99e(0x1b3)]=function(_0xc0e0a6){const _0x360e7d=_0x3ca99e;VisuMZ[_0x360e7d(0x12f)][_0x360e7d(0x133)][_0x360e7d(0x1a9)](this,_0xc0e0a6),this['initEnhancedTP']();},Game_Actor[_0x3ca99e(0x1c4)][_0x3ca99e(0x230)]=function(){const _0x972e90=_0x3ca99e;this[_0x972e90(0xc8)]=[],Game_Battler[_0x972e90(0x1c4)][_0x972e90(0x230)][_0x972e90(0x1a9)](this),this[_0x972e90(0x1da)](),this[_0x972e90(0x1bc)]();},Game_Actor[_0x3ca99e(0x1c4)]['defaultTpMode']=function(){const _0x4b0bc7=_0x3ca99e;return this[_0x4b0bc7(0x17b)]()&&this[_0x4b0bc7(0x17b)]()['note'][_0x4b0bc7(0x1c2)](/<TP MODE: (.*)>/i)?_0x4b0bc7(0x14b)!==_0x4b0bc7(0x119)?String(RegExp['$1'])['toUpperCase']()['trim']():_0x4b0bc7(0x1c3)[_0x4b0bc7(0x1b6)](_0x4c9d12(_0x57969f['$1'])):Game_Battler['prototype'][_0x4b0bc7(0x10a)]['call'](this);},Game_Actor['prototype']['onChangeTpMode']=function(_0x1a9368){const _0x244b57=_0x3ca99e;_0x1a9368=_0x1a9368[_0x244b57(0x18a)]()[_0x244b57(0x1ab)](),Game_Battler[_0x244b57(0x1c4)][_0x244b57(0xc1)][_0x244b57(0x1a9)](this,_0x1a9368),this[_0x244b57(0x210)](_0x1a9368);},Game_Actor[_0x3ca99e(0x1c4)][_0x3ca99e(0x210)]=function(_0x3b2318){const _0x51faea=_0x3ca99e;_0x3b2318=_0x3b2318['toUpperCase']()[_0x51faea(0x1ab)]();if(!VisuMZ[_0x51faea(0x12f)]['TpModes'][_0x3b2318])return;this[_0x51faea(0xc8)]=this[_0x51faea(0xc8)]||[],!this['_availableTpModes']['includes'](_0x3b2318)&&(_0x51faea(0x1b1)!==_0x51faea(0x1b1)?(_0x620bc4[_0x51faea(0x12f)][_0x51faea(0x1ac)]['call'](this),this[_0x51faea(0xb1)]()):(this[_0x51faea(0xc8)][_0x51faea(0x19b)](_0x3b2318),this[_0x51faea(0x226)]()));},VisuMZ['EnhancedTP']['sortTpModes']=function(_0x5800bf){const _0x1d85cd=_0x3ca99e,_0x431c6a=[];for(const _0x3b0147 of VisuMZ[_0x1d85cd(0x12f)][_0x1d85cd(0x216)]){if(_0x5800bf[_0x1d85cd(0xe8)](_0x3b0147))_0x431c6a[_0x1d85cd(0x19b)](_0x3b0147);}return _0x431c6a;},Game_Actor[_0x3ca99e(0x1c4)][_0x3ca99e(0x226)]=function(){const _0x7ee701=_0x3ca99e;if(this[_0x7ee701(0xc8)]===undefined)this[_0x7ee701(0x230)]();this[_0x7ee701(0xc8)]=VisuMZ[_0x7ee701(0x12f)][_0x7ee701(0x226)](this['_availableTpModes']);},Game_Actor[_0x3ca99e(0x1c4)]['availableTpModes']=function(){const _0x176c89=_0x3ca99e;if(this['_availableTpModes']===undefined)this[_0x176c89(0x230)]();this[_0x176c89(0x1da)]();let _0x74d7c1=this['_availableTpModes']['map'](_0x2ea0a6=>VisuMZ[_0x176c89(0x12f)][_0x176c89(0x1a2)][_0x2ea0a6]);return _0x74d7c1[_0x176c89(0x22a)](null);},Game_Actor[_0x3ca99e(0x1c4)][_0x3ca99e(0x1da)]=function(){const _0x994bd4=_0x3ca99e;for(const _0x23322e of $gameParty[_0x994bd4(0x18d)]()){this[_0x994bd4(0x210)](_0x23322e[_0x994bd4(0x18a)]()['trim']());}},Game_Actor[_0x3ca99e(0x1c4)][_0x3ca99e(0x1bc)]=function(){const _0x186513=_0x3ca99e;if(this['actor']()&&this[_0x186513(0x17b)]()[_0x186513(0x1ec)][_0x186513(0x1c2)](/<STARTING TP (?:MODE|MODES)>\s*([\s\S]*)\s*<\/STARTING TP (?:MODE|MODES)>/i)){if(_0x186513(0x12b)!==_0x186513(0x12b))_0x32e28a=_0x5c5b3a['abs'](_0x13fd52),_0xf3e49e[_0x186513(0x1ad)](_0x186513(0x10b),_0xc146b,_0x19658b),_0x2d3753[_0x186513(0x1ad)]('DealMpHeal',_0x1c2837,_0x1899d8),_0x224d90[_0x186513(0x127)]()[_0x186513(0x1ad)](_0x186513(0x22b),_0x1b39f9,_0x388911);else{const _0x44191b=String(RegExp['$1'])[_0x186513(0x10e)](/[\r\n]+/);for(const _0x30bc2d of _0x44191b){this['learnTpMode'](_0x30bc2d[_0x186513(0x18a)]()[_0x186513(0x1ab)]());}}}},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0x1e3)]=Game_Actor[_0x3ca99e(0x1c4)]['learnSkill'],Game_Actor[_0x3ca99e(0x1c4)][_0x3ca99e(0xe2)]=function(_0x1c8a15){const _0x58b7e6=_0x3ca99e;VisuMZ[_0x58b7e6(0x12f)][_0x58b7e6(0x1e3)][_0x58b7e6(0x1a9)](this,_0x1c8a15),this[_0x58b7e6(0xb0)](_0x1c8a15);},Game_Actor[_0x3ca99e(0x1c4)][_0x3ca99e(0xb0)]=function(_0x23a9ee){const _0x327fe1=_0x3ca99e;if(!$dataSkills[_0x23a9ee])return;const _0x5bbae3=$dataSkills[_0x23a9ee][_0x327fe1(0x1ec)],_0x5be248=_0x5bbae3[_0x327fe1(0x1c2)](/<LEARN TP MODE: (.*)>/gi);if(_0x5be248){if('zlnGe'!=='lbyKt')for(const _0x21e409 of _0x5be248){if(_0x327fe1(0xae)==='QUtOV')_0x21e409[_0x327fe1(0x1c2)](/<LEARN TP MODE: (.*)>/i),this[_0x327fe1(0x210)](String(RegExp['$1']));else{if(this['tpMode']())return this[_0x327fe1(0x106)]()[_0x327fe1(0x19f)];return _0x3e5108['EnhancedTP'][_0x327fe1(0xcc)][_0x327fe1(0x1a9)](this);}}else return this[_0x327fe1(0x17b)]()&&this[_0x327fe1(0x17b)]()['note']['match'](/<TP MODE: (.*)>/i)?_0xa7ab66(_0x16b848['$1'])[_0x327fe1(0x18a)]()[_0x327fe1(0x1ab)]():_0x141bc4[_0x327fe1(0x1c4)]['defaultTpMode'][_0x327fe1(0x1a9)](this);}if(_0x5bbae3['match'](/<LEARN TP MODES>\s*([\s\S]*)\s*<\/LEARN TP MODES>/i)){const _0x2478b5=String(RegExp['$1'])[_0x327fe1(0x10e)](/[\r\n]+/);for(const _0x440594 of _0x2478b5){this['learnTpMode'](_0x440594);}}},Game_Enemy[_0x3ca99e(0x1c4)][_0x3ca99e(0x10a)]=function(){const _0x2d010e=_0x3ca99e;if(this[_0x2d010e(0xbd)]()[_0x2d010e(0x1ec)][_0x2d010e(0x1c2)](/<TP MODE: (.*)>/i))return String(RegExp['$1'])[_0x2d010e(0x18a)]()[_0x2d010e(0x1ab)]();else{if(_0x2d010e(0x205)!==_0x2d010e(0x124))return Game_Battler[_0x2d010e(0x1c4)][_0x2d010e(0x10a)][_0x2d010e(0x1a9)](this);else{_0x17aea0=_0x109f5e[_0x2d010e(0x18a)]()['trim']();if(!_0x48229c[_0x2d010e(0x12f)][_0x2d010e(0x1a2)][_0x9f2377])return;this[_0x2d010e(0x208)]=_0x4db767,this[_0x2d010e(0xc1)](_0xcfe8c0);}}},Game_Unit[_0x3ca99e(0x1c4)][_0x3ca99e(0x1ad)]=function(_0x5a2b94,_0x2e99a4,_0x184c1c){const _0x45a007=_0x3ca99e;for(const _0x35ec2a of this[_0x45a007(0x179)]()){if(_0x45a007(0x202)!=='Nisab')_0x4e9121[_0x45a007(0x1ad)](_0x45a007(0x177),_0x443109,0x0);else{if(!_0x35ec2a)continue;_0x35ec2a[_0x45a007(0x1ad)](_0x5a2b94,_0x2e99a4,_0x184c1c);}}},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0xcd)]=Game_Party[_0x3ca99e(0x1c4)][_0x3ca99e(0x1a7)],Game_Party['prototype'][_0x3ca99e(0x1a7)]=function(){const _0x3a59a7=_0x3ca99e;VisuMZ[_0x3a59a7(0x12f)][_0x3a59a7(0xcd)]['call'](this),this['initTpModes']();},Game_Party[_0x3ca99e(0x1c4)][_0x3ca99e(0x13b)]=function(){const _0x4dfeab=_0x3ca99e;this[_0x4dfeab(0x150)]=[];for(const _0x4ae0dd of VisuMZ[_0x4dfeab(0x12f)][_0x4dfeab(0x178)]['General'][_0x4dfeab(0xce)]){_0x4dfeab(0x137)!==_0x4dfeab(0x189)?this[_0x4dfeab(0x150)][_0x4dfeab(0x19b)](_0x4ae0dd[_0x4dfeab(0x18a)]()[_0x4dfeab(0x1ab)]()):(_0x4e0beb[_0x4dfeab(0x12f)][_0x4dfeab(0x133)][_0x4dfeab(0x1a9)](this,_0x146ed1),this[_0x4dfeab(0x230)]());}},Game_Party['prototype'][_0x3ca99e(0x18d)]=function(){const _0x297ff2=_0x3ca99e;if(this['_tpModes']===undefined)this[_0x297ff2(0x13b)]();return this['_tpModes'];},VisuMZ[_0x3ca99e(0x12f)]['Scene_Skill_create']=Scene_Skill[_0x3ca99e(0x1c4)][_0x3ca99e(0x197)],Scene_Skill['prototype'][_0x3ca99e(0x197)]=function(){const _0x5bab87=_0x3ca99e;VisuMZ[_0x5bab87(0x12f)][_0x5bab87(0x215)][_0x5bab87(0x1a9)](this),this[_0x5bab87(0x113)]();},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0x193)]=Scene_Skill[_0x3ca99e(0x1c4)][_0x3ca99e(0xd1)],Scene_Skill[_0x3ca99e(0x1c4)][_0x3ca99e(0xd1)]=function(){const _0x3b6014=_0x3ca99e;VisuMZ['EnhancedTP']['Scene_Skill_createSkillTypeWindow'][_0x3b6014(0x1a9)](this),this['_skillTypeWindow'][_0x3b6014(0x1a4)]('tpMode',this[_0x3b6014(0x162)][_0x3b6014(0x146)](this));},Scene_Skill[_0x3ca99e(0x1c4)][_0x3ca99e(0x113)]=function(){const _0x3485e7=_0x3ca99e,_0x59302e=this[_0x3485e7(0x142)]();this[_0x3485e7(0xcb)]=new Window_TpModes(_0x59302e),this[_0x3485e7(0xcb)]['setHelpWindow'](this[_0x3485e7(0x118)]),this[_0x3485e7(0xcb)]['setHandler']('ok',this[_0x3485e7(0xc3)][_0x3485e7(0x146)](this)),this[_0x3485e7(0xcb)][_0x3485e7(0x1a4)](_0x3485e7(0x100),this[_0x3485e7(0x1e2)]['bind'](this)),this[_0x3485e7(0xad)](this[_0x3485e7(0xcb)]);const _0xf5babf=VisuMZ[_0x3485e7(0x12f)][_0x3485e7(0x178)][_0x3485e7(0x22e)][_0x3485e7(0x1e8)];this[_0x3485e7(0xcb)][_0x3485e7(0x1ff)](_0xf5babf||0x0);},Scene_Skill[_0x3ca99e(0x1c4)][_0x3ca99e(0x142)]=function(){const _0x3fc689=_0x3ca99e,_0x512d85=0x0,_0x354a99=this[_0x3fc689(0x145)]['y']+this[_0x3fc689(0x145)]['height'],_0x332ebf=Graphics[_0x3fc689(0x17c)],_0x4012b7=this[_0x3fc689(0x1d0)]()-this[_0x3fc689(0x145)]['height'];return new Rectangle(_0x512d85,_0x354a99,_0x332ebf,_0x4012b7);},Scene_Skill['prototype'][_0x3ca99e(0x162)]=function(){const _0x3c26a1=_0x3ca99e;this[_0x3c26a1(0xcb)][_0x3c26a1(0x1b9)](),this[_0x3c26a1(0xcb)]['selectLast']();},Scene_Skill['prototype'][_0x3ca99e(0xc3)]=function(){const _0x4e8137=_0x3ca99e;this[_0x4e8137(0xcb)][_0x4e8137(0x1b9)]();const _0x3c485d=this[_0x4e8137(0xcb)]['item']();if(!_0x3c485d)return;this[_0x4e8137(0x17b)]()[_0x4e8137(0x1b0)](_0x3c485d[_0x4e8137(0x138)]),this['_tpModeWindow'][_0x4e8137(0xc5)](),this[_0x4e8137(0x145)][_0x4e8137(0xc5)]();},Scene_Skill[_0x3ca99e(0x1c4)][_0x3ca99e(0x1e2)]=function(){const _0x27ffcc=_0x3ca99e;this['_tpModeWindow'][_0x27ffcc(0xc7)](),this[_0x27ffcc(0x190)]['activate']();},VisuMZ['EnhancedTP'][_0x3ca99e(0x195)]=Scene_Skill['prototype']['refreshActor'],Scene_Skill['prototype'][_0x3ca99e(0x14d)]=function(){const _0x56dcfd=_0x3ca99e;VisuMZ['EnhancedTP'][_0x56dcfd(0x195)][_0x56dcfd(0x1a9)](this);if(this[_0x56dcfd(0xcb)])this[_0x56dcfd(0xcb)][_0x56dcfd(0xfc)](this['actor']());},VisuMZ['EnhancedTP'][_0x3ca99e(0x1b7)]=Sprite_Gauge[_0x3ca99e(0x1c4)][_0x3ca99e(0x1b3)],Sprite_Gauge['prototype'][_0x3ca99e(0x1b3)]=function(_0x3fdb41,_0xb3a059){const _0x5afa66=_0x3ca99e;VisuMZ[_0x5afa66(0x12f)]['Sprite_Gauge_setup'][_0x5afa66(0x1a9)](this,_0x3fdb41,_0xb3a059),this[_0x5afa66(0x14a)]==='tp'&&(_0x5afa66(0x1c0)!=='hkosi'?this[_0x5afa66(0x1ee)]():this['gainTpFromTpMode'](_0x5afa66(0x19d),this,0x0));},Sprite_Gauge['prototype'][_0x3ca99e(0x1ee)]=function(){const _0x31e283=_0x3ca99e;!this[_0x31e283(0x140)]&&(this[_0x31e283(0x140)]=new Sprite(),this[_0x31e283(0x196)](this[_0x31e283(0x140)])),!this[_0x31e283(0x211)]&&(_0x31e283(0x104)!=='TiRwC'?(_0x5226d4[_0x31e283(0x1ad)](_0x31e283(0x16d),_0x565095,0x0),_0x27d936['gainTpFromTpMode'](_0x31e283(0xfb),_0xf20f9d,0x0)):(this[_0x31e283(0x211)]=new Sprite(),this[_0x31e283(0x196)](this['_tpGaugeSprite']))),!this[_0x31e283(0x15e)]&&(this[_0x31e283(0x15e)]=new Sprite(),this[_0x31e283(0x196)](this[_0x31e283(0x15e)]));},VisuMZ['EnhancedTP']['Sprite_Gauge_redraw']=Sprite_Gauge['prototype'][_0x3ca99e(0x1c7)],Sprite_Gauge['prototype']['redraw']=function(){const _0x1796b1=_0x3ca99e;let _0x5672ed=$dataSystem['terms']['basic'][0x7];this[_0x1796b1(0x14a)]==='tp'&&(_0x1796b1(0x117)===_0x1796b1(0x117)?this['changeBattlerTpLabel']():this[_0x1796b1(0xd8)]());VisuMZ[_0x1796b1(0x12f)][_0x1796b1(0x129)][_0x1796b1(0x1a9)](this);this[_0x1796b1(0x14a)]==='tp'&&(_0x1796b1(0x15c)!==_0x1796b1(0x15c)?(_0xa0f16b['gainTpFromTpMode'](_0x1796b1(0xc2),_0xcfd40f,0x0),_0x3f2d61[_0x1796b1(0x1ad)](_0x1796b1(0x15b),_0x5553c0,0x0)):this['redrawEnhancedTp']());if(this[_0x1796b1(0x14a)]==='tp'){if(_0x1796b1(0xb4)===_0x1796b1(0xf9)){this['_tpModes']=[];for(const _0x1a248b of _0x3bb2fd[_0x1796b1(0x12f)]['Settings'][_0x1796b1(0x22e)][_0x1796b1(0xce)]){this['_tpModes'][_0x1796b1(0x19b)](_0x1a248b[_0x1796b1(0x18a)]()[_0x1796b1(0x1ab)]());}}else $dataSystem[_0x1796b1(0xdb)][_0x1796b1(0x17d)][0x7]=_0x5672ed;}},Sprite_Gauge[_0x3ca99e(0x1c4)]['redrawEnhancedTp']=function(){const _0x3c39f7=_0x3ca99e;this[_0x3c39f7(0x15e)]&&(this[_0x3c39f7(0x15e)][_0x3c39f7(0xe4)]=this['bitmap']),this[_0x3c39f7(0x158)](0x0,0x0,0x0,0x0);},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0xd5)]=Sprite_Gauge[_0x3ca99e(0x1c4)][_0x3ca99e(0x229)],Sprite_Gauge[_0x3ca99e(0x1c4)][_0x3ca99e(0x229)]=function(_0x608b1f,_0x276f78,_0x2f1158,_0x43106a,_0x2a8156,_0x4f975b){const _0x2de6e4=_0x3ca99e;this[_0x2de6e4(0x14a)]==='tp'&&this[_0x2de6e4(0x211)]?'doMdI'!==_0x2de6e4(0x1b8)?this[_0x2de6e4(0xc4)](_0x608b1f,_0x276f78,_0x2f1158,_0x43106a,_0x2a8156,_0x4f975b):(_0x62ab6e[_0x2de6e4(0x1c2)](/<UNLOCK TP MODE: (.*)>/i),_0x1b023a['learnTpMode'](_0x2f6e4c(_0x4f3434['$1']))):VisuMZ[_0x2de6e4(0x12f)][_0x2de6e4(0xd5)]['call'](this,_0x608b1f,_0x276f78,_0x2f1158,_0x43106a,_0x2a8156,_0x4f975b);},Sprite_Gauge['prototype'][_0x3ca99e(0xd9)]=function(_0x1b40be){const _0x13202b=_0x3ca99e;!this[_0x13202b(0x140)][_0x13202b(0xe4)]&&(_0x13202b(0x114)!==_0x13202b(0x194)?this[_0x13202b(0x140)][_0x13202b(0xe4)]=new Bitmap(this[_0x13202b(0xe4)][_0x13202b(0x132)],this[_0x13202b(0xe4)][_0x13202b(0x16f)]):(this['friendsUnit']()['gainTpFromTpMode'](_0x13202b(0x1f2),this,0x0),this[_0x13202b(0xc6)]()[_0x13202b(0x1ad)](_0x13202b(0x143),this,0x0)));if(!this[_0x13202b(0x211)]['bitmap']){if(_0x13202b(0x181)===_0x13202b(0x17e)){if(!this[_0x13202b(0xea)]())return![];const _0x310dfc=this[_0x13202b(0xea)]()['note'],_0x2be968=[/<CHANGE USER TP MODE: (.*)>/i,/<CHANGE TARGET TP MODE: (.*)>/i,/<UNLOCK TP MODE: (.*)>/gi,/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i];for(const _0x10cdca of _0x2be968){if(_0x310dfc['match'](_0x10cdca))return!![];}return![];}else this['_tpGaugeSprite'][_0x13202b(0xe4)]=new Bitmap(this[_0x13202b(0xe4)][_0x13202b(0x132)],this[_0x13202b(0xe4)]['height']);}_0x1b40be&&(this[_0x13202b(0x140)]['bitmap'][_0x13202b(0x14f)](),this[_0x13202b(0x211)][_0x13202b(0xe4)][_0x13202b(0x14f)]());},Sprite_Gauge[_0x3ca99e(0x1c4)][_0x3ca99e(0xc4)]=function(_0x28341e,_0x40e4bf,_0x40681a,_0x58d365,_0x256c82,_0x13d0a7){const _0x264e9a=_0x3ca99e;this['createTpGaugeBitmaps'](!![]);const _0x2b3932=this[_0x264e9a(0x11d)](),_0x49db15=Math[_0x264e9a(0x16a)]((_0x256c82-0x2)*_0x2b3932),_0xc086e7=_0x13d0a7-0x2,_0x2fb488=this[_0x264e9a(0x225)]();this[_0x264e9a(0x140)][_0x264e9a(0xe4)][_0x264e9a(0x164)](_0x40681a,_0x58d365,_0x256c82,_0x13d0a7,_0x2fb488),_0x28341e=this['changeTpCustomColor'](_0x28341e,0x1),_0x40e4bf=this[_0x264e9a(0x16e)](_0x40e4bf,0x2),this['_tpGaugeSprite'][_0x264e9a(0xe4)][_0x264e9a(0x1dc)](_0x40681a+0x1,_0x58d365+0x1,_0x49db15,_0xc086e7,_0x28341e,_0x40e4bf);},VisuMZ['EnhancedTP'][_0x3ca99e(0xca)]=Sprite_Gauge[_0x3ca99e(0x1c4)][_0x3ca99e(0x1a8)],Sprite_Gauge['prototype'][_0x3ca99e(0x1a8)]=function(_0x519fdf,_0x5ac201,_0x5ef0cc,_0x463f2a){const _0x5927fe=_0x3ca99e;this['_statusType']==='tp'&&this[_0x5927fe(0x211)]?this[_0x5927fe(0x13e)](_0x519fdf,_0x5ac201,_0x5ef0cc,_0x463f2a):VisuMZ['EnhancedTP'][_0x5927fe(0xca)][_0x5927fe(0x1a9)](this,_0x519fdf,_0x5ac201,_0x5ef0cc,_0x463f2a);},Sprite_Gauge[_0x3ca99e(0x1c4)][_0x3ca99e(0x13e)]=function(_0x5419e9,_0x59cc65,_0x19ae2a,_0x2c9b92){const _0x246108=_0x3ca99e;this[_0x246108(0xd9)](!![]);const _0x3fce73=this[_0x246108(0x11d)](),_0x46189d=Math['floor']((_0x19ae2a-0x2)*_0x3fce73),_0x58242a=_0x2c9b92-0x2,_0x43f431=this['gaugeBackColor'](),_0x1a8f84=this[_0x246108(0x16e)](this[_0x246108(0x20c)](),0x1),_0xb4d33f=this['changeTpCustomColor'](this[_0x246108(0x1bf)](),0x2);this[_0x246108(0x140)][_0x246108(0xe4)][_0x246108(0x164)](_0x5419e9,_0x59cc65,_0x19ae2a,_0x2c9b92,_0x43f431),this[_0x246108(0x211)][_0x246108(0xe4)]['gradientFillRect'](_0x5419e9+0x1,_0x59cc65+0x1,_0x46189d,_0x58242a,_0x1a8f84,_0xb4d33f);},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0xe7)]=Sprite_Gauge['prototype'][_0x3ca99e(0x1f7)],Sprite_Gauge['prototype'][_0x3ca99e(0x1f7)]=function(){const _0x26e5a7=_0x3ca99e;VisuMZ[_0x26e5a7(0x12f)][_0x26e5a7(0xe7)]['call'](this),this['updateEnhancedTp']();},Sprite_Gauge[_0x3ca99e(0x1c4)][_0x3ca99e(0x1a0)]=function(){const _0x5a04f8=_0x3ca99e;if(this[_0x5a04f8(0x14a)]!=='tp')return;if(!this[_0x5a04f8(0x211)])return;if(!this['_battler'])return;const _0x5244d4=this['_battler'][_0x5a04f8(0x106)]();if(this[_0x5a04f8(0x1a3)]!==_0x5244d4){if('RLzpN'===_0x5a04f8(0xef))this[_0x5a04f8(0x1a3)]=_0x5244d4,this['redraw']();else{if(this[_0x5a04f8(0xd2)](_0x367933))return!![];return _0x1f10a2['EnhancedTP'][_0x5a04f8(0x1dd)][_0x5a04f8(0x1a9)](this,_0x1e9c79);}}if(this[_0x5a04f8(0x103)][_0x5a04f8(0x165)]()){const _0x52ab61=this['_battler'][_0x5a04f8(0xd3)]();this[_0x5a04f8(0x211)][_0x5a04f8(0x234)](this[_0x5a04f8(0x211)][_0x5a04f8(0x1fa)]+_0x52ab61);const _0x238cc8=this[_0x5a04f8(0x103)][_0x5a04f8(0x198)]();this['_tpGaugeSprite'][_0x5a04f8(0x201)]([0xff,0xff,0xff,_0x238cc8]);}else this[_0x5a04f8(0x211)]['setBlendColor']([0xff,0xff,0xff,0x0]),this['_tpGaugeSprite'][_0x5a04f8(0x234)](0x0);},Sprite_Gauge[_0x3ca99e(0x1c4)]['changeBattlerTpLabel']=function(){const _0x177b63=_0x3ca99e;if(!this[_0x177b63(0x103)])return;const _0x46e7c4=this[_0x177b63(0x103)][_0x177b63(0x106)]();_0x46e7c4[_0x177b63(0x1b2)]&&($dataSystem[_0x177b63(0xdb)][_0x177b63(0x17d)][0x7]=_0x46e7c4[_0x177b63(0x1b2)]['trim']());},Sprite_Gauge['prototype'][_0x3ca99e(0x16e)]=function(_0x5b84bf,_0xb19fc8){const _0x3e8e39=_0x3ca99e;if(!this[_0x3e8e39(0x103)])return _0x5b84bf;const _0x5dc2b3=this[_0x3e8e39(0x103)]['tpMode'](),_0x571c00=_0x3e8e39(0x1e6)[_0x3e8e39(0x1b6)](_0xb19fc8);if(_0x5dc2b3[_0x571c00])return ColorManager[_0x3e8e39(0x1f3)](_0x5dc2b3[_0x571c00]);else{if(_0x3e8e39(0x180)!==_0x3e8e39(0x168))return _0x5b84bf;else _0x244f77[_0x3e8e39(0x1ad)](_0x3e8e39(0x122),_0x2169ce,0x0),_0x476914[_0x3e8e39(0x1ad)](_0x3e8e39(0x221),_0x3b5ac1,0x0);}},Window_Base[_0x3ca99e(0x1c4)][_0x3ca99e(0x16b)]=function(_0x29d237,_0xfec439,_0x2fdf10,_0x12c372,_0x4fc014){const _0x3aa2ce=_0x3ca99e;if(!_0x29d237)return;const _0x127132=_0x2fdf10+(this[_0x3aa2ce(0x206)]()-ImageManager[_0x3aa2ce(0x183)])/0x2,_0x31a0cb=ImageManager[_0x3aa2ce(0x22d)]+0x4,_0x1e5268=Math[_0x3aa2ce(0x1f5)](0x0,_0x12c372-_0x31a0cb);this[_0x3aa2ce(0x18e)](),_0x4fc014&&_0x4fc014[_0x3aa2ce(0x106)]()===_0x29d237&&this[_0x3aa2ce(0x1e7)](ColorManager[_0x3aa2ce(0xb3)]()),this[_0x3aa2ce(0x1df)](_0x29d237[_0x3aa2ce(0x1af)],_0xfec439,_0x127132),this[_0x3aa2ce(0xf3)](_0x29d237[_0x3aa2ce(0x138)],_0xfec439+_0x31a0cb,_0x2fdf10,_0x1e5268);},VisuMZ['EnhancedTP'][_0x3ca99e(0x1c5)]=Window_SkillType['prototype'][_0x3ca99e(0x126)],Window_SkillType[_0x3ca99e(0x1c4)][_0x3ca99e(0x126)]=function(){const _0x2fbfd5=_0x3ca99e;VisuMZ[_0x2fbfd5(0x12f)]['Window_SkillType_makeCommandList'][_0x2fbfd5(0x1a9)](this),this['addTpModeCommand']();},Window_SkillType[_0x3ca99e(0x1c4)][_0x3ca99e(0x1d6)]=function(){const _0x193335=_0x3ca99e;if(!this['isTpModeCommandVisible']())return;let _0x6382e8=TextManager['tpModesCommandText'][_0x193335(0x1b6)](TextManager['tp']);Imported[_0x193335(0x171)]&&(_0x193335(0x11b)===_0x193335(0x1b5)?_0x40590e[_0x193335(0x210)](_0x6a049):_0x6382e8=_0x193335(0x1d8)[_0x193335(0x1b6)](ImageManager[_0x193335(0x10d)],_0x6382e8)),this[_0x193335(0x148)](_0x6382e8,'tpMode',!![],_0x193335(0x106));},Window_SkillType[_0x3ca99e(0x1c4)][_0x3ca99e(0xed)]=function(){const _0x2c8041=_0x3ca99e;return $gameSystem[_0x2c8041(0x1e4)]();},VisuMZ[_0x3ca99e(0x12f)][_0x3ca99e(0x160)]=Window_SkillList[_0x3ca99e(0x1c4)][_0x3ca99e(0xdc)],Window_SkillList[_0x3ca99e(0x1c4)][_0x3ca99e(0xdc)]=function(_0x248b9c){const _0x24607b=_0x3ca99e,_0x5ddc93=this[_0x24607b(0x1bd)]!==_0x248b9c;if(!_0x5ddc93)return;this[_0x24607b(0x232)]();const _0x1ec03d=SceneManager['_scene'][_0x24607b(0xcb)];if(_0x1ec03d)_0x1ec03d[_0x24607b(0xf4)]();const _0x11f845=this[_0x24607b(0x145)];if(_0x11f845)_0x11f845[_0x24607b(0x232)]();VisuMZ[_0x24607b(0x12f)][_0x24607b(0x160)][_0x24607b(0x1a9)](this,_0x248b9c);if(_0x5ddc93&&_0x1ec03d&&_0x248b9c===_0x24607b(0x106)){if(_0x11f845)_0x11f845[_0x24607b(0xf4)]();this[_0x24607b(0xf4)](),_0x1ec03d[_0x24607b(0x232)]();}};function Window_TpModes(){const _0x46f0b7=_0x3ca99e;this[_0x46f0b7(0x1a7)](...arguments);}Window_TpModes['prototype']=Object[_0x3ca99e(0x197)](Window_Selectable[_0x3ca99e(0x1c4)]),Window_TpModes[_0x3ca99e(0x1c4)][_0x3ca99e(0x13c)]=Window_TpModes,Window_TpModes[_0x3ca99e(0x1c4)][_0x3ca99e(0x1a7)]=function(_0x296afa){const _0x9440fd=_0x3ca99e;Window_Selectable[_0x9440fd(0x1c4)][_0x9440fd(0x1a7)][_0x9440fd(0x1a9)](this,_0x296afa),this[_0x9440fd(0x1ca)]=null,this['_data']=[],this[_0x9440fd(0xf4)]();},Window_TpModes[_0x3ca99e(0x1c4)]['setActor']=function(_0x4eb88c){const _0x36df11=_0x3ca99e;this[_0x36df11(0x1ca)]!==_0x4eb88c&&(_0x36df11(0xd7)===_0x36df11(0xd7)?(this[_0x36df11(0x1ca)]=_0x4eb88c,this[_0x36df11(0xc5)](),this[_0x36df11(0x14c)](0x0,0x0)):this[_0x36df11(0x1ca)]?this[_0x36df11(0x1ba)]=this[_0x36df11(0x1ca)][_0x36df11(0x18c)]():this['_data']=[]);},Window_TpModes['prototype'][_0x3ca99e(0x134)]=function(){return 0x2;},Window_TpModes[_0x3ca99e(0x1c4)]['colSpacing']=function(){return 0x10;},Window_TpModes['prototype']['maxItems']=function(){const _0x24230a=_0x3ca99e;return this['_data']?this[_0x24230a(0x1ba)]['length']:0x1;},Window_TpModes[_0x3ca99e(0x1c4)][_0x3ca99e(0xea)]=function(){const _0x124456=_0x3ca99e;return this[_0x124456(0x1e5)](this[_0x124456(0x139)]());},Window_TpModes[_0x3ca99e(0x1c4)][_0x3ca99e(0x1e5)]=function(_0x13da1f){const _0x52c741=_0x3ca99e;return this[_0x52c741(0x1ba)]&&_0x13da1f>=0x0?this[_0x52c741(0x1ba)][_0x13da1f]:null;},Window_TpModes[_0x3ca99e(0x1c4)][_0x3ca99e(0x22c)]=function(){const _0x40fe1a=_0x3ca99e;if(this[_0x40fe1a(0x1ca)])'quZdP'===_0x40fe1a(0x1b4)?(!this['_tpGaugeBack']&&(this[_0x40fe1a(0x140)]=new _0x5f0c6d(),this['addChild'](this[_0x40fe1a(0x140)])),!this['_tpGaugeSprite']&&(this[_0x40fe1a(0x211)]=new _0x563ce9(),this[_0x40fe1a(0x196)](this['_tpGaugeSprite'])),!this['_tpTextSprite']&&(this[_0x40fe1a(0x15e)]=new _0x160ccf(),this[_0x40fe1a(0x196)](this['_tpTextSprite']))):this[_0x40fe1a(0x1ba)]=this[_0x40fe1a(0x1ca)]['availableTpModes']();else{if(_0x40fe1a(0x1c9)===_0x40fe1a(0x1fb)){this['createTpGaugeBitmaps'](!![]);const _0x36fd5e=this[_0x40fe1a(0x11d)](),_0x429eaa=_0x200368[_0x40fe1a(0x16a)]((_0x1632cb-0x2)*_0x36fd5e),_0x4d35eb=_0x431aaf-0x2,_0x1ef44b=this['gaugeBackColor'](),_0x440b31=this[_0x40fe1a(0x16e)](this['gaugeColor1'](),0x1),_0x183667=this[_0x40fe1a(0x16e)](this[_0x40fe1a(0x1bf)](),0x2);this['_tpGaugeBack']['bitmap'][_0x40fe1a(0x164)](_0x1a3e8d,_0xa476a5,_0x53c5ff,_0x5b8bf1,_0x1ef44b),this['_tpGaugeSprite'][_0x40fe1a(0xe4)][_0x40fe1a(0x1dc)](_0x4bbe6c+0x1,_0x15f7ff+0x1,_0x429eaa,_0x4d35eb,_0x440b31,_0x183667);}else this['_data']=[];}},Window_TpModes[_0x3ca99e(0x1c4)][_0x3ca99e(0x176)]=function(){const _0x9af009=_0x3ca99e;this[_0x9af009(0x110)](0x0);},Window_TpModes[_0x3ca99e(0x1c4)]['drawItem']=function(_0x4dbce9){const _0x5ad838=_0x3ca99e,_0x355bee=this[_0x5ad838(0x1e5)](_0x4dbce9);if(!_0x355bee)return;const _0x4a565e=this[_0x5ad838(0x159)](_0x4dbce9);this[_0x5ad838(0x16b)](_0x355bee,_0x4a565e['x'],_0x4a565e['y'],_0x4a565e[_0x5ad838(0x132)],this['_actor']);},Window_TpModes['prototype']['updateHelp']=function(){const _0x5de5e3=_0x3ca99e;this[_0x5de5e3(0xee)](this[_0x5de5e3(0xea)]());},Window_TpModes['prototype'][_0x3ca99e(0xc5)]=function(){const _0x2b16ae=_0x3ca99e;this[_0x2b16ae(0x22c)](),Window_Selectable[_0x2b16ae(0x1c4)][_0x2b16ae(0xc5)][_0x2b16ae(0x1a9)](this);},Window_TpModes[_0x3ca99e(0x1c4)][_0x3ca99e(0x1c8)]=function(){const _0x3d13a8=_0x3ca99e;SoundManager[_0x3d13a8(0x1f1)]();};