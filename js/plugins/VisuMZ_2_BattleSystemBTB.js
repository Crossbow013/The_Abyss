//=============================================================================
// VisuStella MZ - Battle System BTB - Brave Turn Battle
// VisuMZ_2_BattleSystemBTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemBTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemBTB = VisuMZ.BattleSystemBTB || {};
VisuMZ.BattleSystemBTB.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.12] [BattleSystemBTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_BTB_VisuStella_MZ
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
 * The Brave Turn Battle (BTB) system plays off RPG Maker MZ's default battle
 * system with a twist of allowing actors (and enemies) to use up actions from
 * the future or save up for later. These actions will be queued and delivered
 * all in one go! Any borrowed actions from the future will result in following
 * turns without any actions to use. Should a player decide to save up their
 * actions instead through Guarding, they can charge actions with less
 * repercussions. Players will have to be brave about how to go about the
 * battle system strategically.
 * 
 * Because multiple actions can be queued up all at once, they can result in
 * the creation of an action fusion. Some skills (and items) can appear instead
 * of the originally queued actions to result in stronger, better, and more
 * awesome effects, all of which, can be defined by the game dev.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "btb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Puts a twist on the Default Turn Battle system by allowing brave players
 *   to borrow actions from the future turns or save them up for later turns.
 * * Brave Points, a new currency, are added to mark how many saved turns there
 *   are for each battler.
 * * Certain actions can cost more Brave Points than others.
 * * Effects that allow battlers to alter the Brave Points of their targets.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Action fusion system which takes any of the queued up skills and/or items
 *   to bring forth new ones.
 * * Action fusion combinations can be either flexible or strict.
 * * Flexible action fusion combinations can have their actions queued up in
 *   any order to bring forth the result.
 * * Strict action fusion combinations must require their actions to be queued
 *   up in a specific order in order to bring forth the result.
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
 * Brave Points and the Brave Command
 * 
 * Abbreviated to "BP", Brave Points are a new currency available through the
 * Brave Turn Battle system. Battlers require at least 0 BP in order to perform
 * any actions for that turn. By default, each action consumes 1 BP. At the end
 * of each turn, each battler regenerates 1 BP. With the normal flow of battle,
 * this results in a net balance.
 * 
 * However, the player can activate the "Brave Command" located right above the
 * Guard Command. This lets the battler create an extra action to perform. When
 * used, the flow of battle will result in a negative net of BP. When BP is at
 * -1 or under, that battler's turn is skipped until it raises back to 0. This
 * effectively means that the "Brave Command" will borrow actions from future
 * turns.
 * 
 * The Guard Command, however will never consume any BP for its actions even if
 * replaced as it is always determined by the battler's current guard skill.
 * This means that when used, the Guard Command lets a battler save up BP for
 * future turns, allowing BP to go net positive for the turn.
 * 
 * By strategically deciding when to borrow actions or save up for them, whole
 * new strategies can be created for battle.
 * 
 * The game dev has control over how many max actions can be borrowed at once,
 * the maximum and minimum amounts for BP to go to, how much BP will cost at
 * default, and how much BP can be regenerated by default. These settings can
 * all be made within the Plugin Parameters.
 * 
 * ---
 *
 * Action Times +
 * 
 * While the Brave Turn Battle system is active, the "Action Times +" trait
 * is disabled. This is to prevent any conflicts with the Brave system. If the
 * Brave Turn Battle system is disabled during the course of the game, then the
 * "Action Times +" will resume working like normal.
 *
 * ---
 * 
 * Can Input
 * 
 * As mentioned in the "Brave Points and the Brave Command" above, if BP is
 * under 0, then that battler cannot input or act for that turn. The battler
 * would have to wait for BP regenerate back up to 0 first.
 * 
 * ---
 * 
 * Can Guard
 * 
 * The Guard action is only enabled when there's one action to use for that
 * turn. This means that if the "Brave Command" is used to generate new actions
 * to perform during that turn, the Guard Command will be disabled. It can be
 * enabled once again if the player cancels out the Brave Command until the
 * action count reaches 1.
 * 
 * ---
 * 
 * Enemy Brave Actions
 * 
 * Enemies can also use the "Brave Command" by faking it. By making a dummy
 * skill with the <BTB Multiple Actions: id, id, id, id> skill notetag or the
 * <BTB Multiple Actions: name, name, name, name> skill notetag, you can have
 * the enemy perform the exact skills you want in a multi-action queue.
 * 
 * Enemies that use this will also suffer from heavy BP expenditure and wait on
 * subsequent turns until they have enough BP to perform actions again.
 * 
 * This is also how you can have enemies perform Action Fusions. For the queued
 * skills, load up the Action Fusion's skill combination you want for the enemy
 * to perform.
 * 
 * ---
 *
 * ============================================================================
 * Action Fusions
 * ============================================================================
 *
 * This feature deserves its own section as it's quite indepth with how it
 * works. Action Fusions can be performed by either the actor and/or enemy
 * (though this can be disabled in the Plugin Parameters or through traits).
 * In order for them to occur, the queued up action list must have a certain
 * combination of skills/items for the Action Fusion to occur.
 *
 * ---
 * 
 * Fusion Types
 * 
 * There are two types of Action Fusions: Flexible and Strict. Flexible Action
 * Fusions can use a combination of skills/items in any order (thus flexible),
 * while Strict Action Fusions must have their skill/item combinations queued
 * up in the exact order they're listed (thus strict).
 * 
 * They all share the following properties:
 * 
 * Skill Action Fusions can only use skills for combinations. This means that
 * Action Fusions made as a skill database object cannot have item requirements
 * for the combinations.
 * 
 * Item Action Fusions can only use items for combinations. This means that
 * Action Fusions made as an item database object cannot have skills for the
 * combination requirements.
 * 
 * Skills and items that have selectable targets need to have matching targets
 * to be a part of the same Action Fusion combination. For example, if "Quad
 * Attack" requires "Attack", "Attack", "Attack", "Attack", then the player
 * would have to target the same enemy for each of the "Attack" actions. This
 * is to prevent the cases where the player wants to spread out the damage
 * evenly across various enemies without forming it into a single target "Quad
 * Attack" against one.
 * 
 * Skills and items that do not have selectable targets are combination targets
 * for any and all candidates. This means an area of effect "Flame" spell can
 * combine with any target selectable or otherwise skill.
 * 
 * When an Action Fusion is performed, it will not consume the resources for
 * the database object itself, but instead, from each of the skills/items used
 * to bring it out. This means the skill costs of the Action Fusion itself are
 * irrelevant, but the skill costs of the combinations do matter and will be
 * consumed instead. The same applies to items.
 * 
 * If the Action Fusion skill/item is used directly, its resource consumption
 * will be performed as if it was not an Action Fusion skill/item. The "Quad
 * Attack" skill will use its regular MP and TP costs while the "Double Elixir"
 * item will consume itself.
 * 
 * If a queue could potentially meet the demands of multiple Action Fusions,
 * then the Action Fusion with the highest database ID will be given priority,
 * as to make it less complicated. This means if the "Double Attack" Action
 * Fusion and "Triple Attack" Action Fusion were to occur at the same time,
 * if the "Triple Attack" skill has a higher ID than "Double Attack", then
 * "Triple Attack" will take priority instead.
 * 
 * The battler must be able to pay the actions of each of the queued actions
 * used to form the Action Fusion. This means if a battler would run out of MP
 * or items for the cost, it will just simply not occur.
 * 
 * An Action Fusion can have multiple combinations that create it as long as
 * there are multiple notetags that determine the Action Fusion. As an example,
 * the "Flame Strike" can occur with the "Attack" and "Flame" combination or
 * the "Strike" and "Flame" combination.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Examples:
 * 
 *   ---
 * 
 *   Fire Strike
 * 
 *   <BTB Flexible Fusion: Attack, Fire>
 * 
 *   This Action Fusion will occur if a battler has the "Attack" and "Fire"
 *   actions queued up in any order. "Attack" can come before "Fire" or "Fire"
 *   can come before "Attack" and it would still call upon "Fire Strike".
 * 
 *   ---
 * 
 *   Flame Strike
 * 
 *   <BTB Flexible Fusion: Attack, Flame>
 *   <BTB Flexible Fusion: Strike, Flame>
 * 
 *   This Action Fusion will occur if a battler has "Attack" and "Flame",
 *   "Flame" and "Attack", "Strike" and "Flame", or "Flame" and "Strike" in its
 *   action queue.
 * 
 *   ---
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Example:
 * 
 *   ---
 * 
 *   Shadow Flare Blade
 * 
 *   <BTB Strict Fusion: Shade II, Fire II, Attack>
 * 
 *   The battler must queue up "Shade II", "Fire II", and "Attack" in that
 *   exact order or else "Shadow Flare Blade" will not occur. Even if the
 *   battler changed the order to "Fire II", "Shade II", and "Attack", the
 *   Action Fusion will not occur.
 * 
 *   ---
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
 * VisuMZ_3_BoostAction
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
 * === General BTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <BTB Help>
 *  description
 *  description
 * </BTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under BTB.
 * - This is primarily used if the skill behaves differently in BTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to BTB.
 *
 * ---
 *
 * <BTB Cannot Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command disabled.
 *
 * ---
 *
 * <BTB Hide Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command hidden along with their
 *   BP values.
 *
 * ---
 * 
 * === BTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the BTB Turn Order Display
 * 
 * ---
 *
 * <BTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <BTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <BTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Brave Points Cost-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB BP Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Determines how much BP the battler uses when performing this action.
 * - Replace 'x' with a number value to determine its BP cost.
 *
 * ---
 *
 * <BTB Hide BP Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Prevents the BP cost from being shown for this action.
 *
 * ---
 * 
 * === Brave Point Manipulation-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB User Set BP: x>
 * <BTB Target Set BP: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the user/target's current BP to a specific value.
 * - Replace 'x' with a number value to determine how much you want the user
 *   or target's BP to be set to.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 *
 * <BTB User Gain BP: +x>
 * <BTB Target Gain BP: +x>
 *
 * <BTB User Lose BP: -x>
 * <BTB Target Lose BP: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to alter how much BP the user/target has.
 * - Replace 'x' with a number value to determine how much BP is gained/lost
 *   for the user/target.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 * 
 * === JavaScript Notetags: Brave Point Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over Brave Point alteration.
 * 
 * ---
 *
 * <JS BTB User BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB User BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the user's final
 *   BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the user's BP.
 *   This value also starts off as the user's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 *
 * <JS BTB Target BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB Target BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the current
 *   target's final BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the target's BP.
 *   This value also starts off as the target's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 * 
 * === Brave Point Managment-Related Notetags ===
 * 
 * The following notetags are used to for battlers to manage their BP settings
 * throughout the course of the fight.
 * 
 * ---
 *
 * <BTB Initial BP: +x>
 * <BTB Initial BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter that battler's initial BP at the start of battle.
 * - Replace 'x' with a number value representing how much you want to alter
 *   the affected battler's initial BP at the start of battle.
 *
 * ---
 *
 * <BTB BP Regen: +x>
 * <BTB BP Degen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter the amount of BP regenerated at the end of each battle turn.
 * - Replace 'x' with a number value representing how much BP is regenerated
 *   (or decreased). 
 *   - Use a positive number for gaining BP at the end of each turn.
 *   - Use a negative number for losing BP at the end of each turn.
 *
 * ---
 *
 * <BTB Maximum BP: +x>
 * <BTB Maximum BP: -x>
 *
 * <BTB Minimum BP: +x>
 * <BTB Minimum BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase or decrease the maximum/minimum BP that battler can have by 'x'.
 * - Replace 'x' with a number value representing the amount to change the
 *   battler's maximum/minimum BP by.
 * - These numbers cannot exceed or go under the designated amounts set by the
 *   hard cap in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * === Multiple Action-Related Notetags ===
 * 
 * These notetags allow you to determine how multiple actions are handled
 * through the Brave Turn Battle system.
 * 
 * ---
 *
 * <BTB Maximum Actions: +x>
 * <BTB Maximum Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase/decrease the maximum number of actions that battler can have
 *   through the Brave Command.
 * - Replace 'x' with a number value representing the amount of maximum actions
 *   to increase/decrease by.
 * - This value cannot make a battler go below 1 maximum action.
 * - This value cannot make a battler go above the hard cap set in this
 *   plugin's Plugin Parameters.
 *
 * ---
 *
 * <BTB Multiple Actions: id, id>
 * <BTB Multiple Actions: id, id, id>
 * <BTB Multiple Actions: id, id, id, id>
 *
 * <BTB Multiple Actions: name, name>
 * <BTB Multiple Actions: name, name, name>
 * <BTB Multiple Actions: name, name, name, name>
 *
 * - Used for: Skill Notetags
 * - When an enemy (NOT ACTOR) uses this skill, the game will appear as if the
 *   enemy is using the Brave Command to load up multiple actions at a time.
 * - Replace 'id' with the database ID of the skill to use in the multiple
 *   action queue.
 * - Replace 'name' with the name of the skill to use in the enemy's multiple
 *   action queue.
 * 
 * ---
 * 
 * === Action Fusion-Related Notetags ===
 * 
 * For more details, please refer to the Action Fusion dedicated section listed
 * earlier in the documentation.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 *
 * <BTB Cannot Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler cannot perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
 *
 * ---
 *
 * <BTB Enable Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler is allowed to perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
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
 * Actor: Change BTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change BTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the BTB Turn Order.
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
 * Actor: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the actor(s).
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
 * Enemy: Change BTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change BTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
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
 * Enemy: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the enemy(ies).
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
 * System: BTB Turn Order Visibility
 * - Determine the visibility of the BTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the BTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Battle System BTB. These range from how Brave
 * Points (BP) appear in-game to how their costs are displayed.
 *
 * ---
 *
 * Brave Points
 * 
 *   Full Name:
 *   - What is the full name of "Brave Points" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Brave Points" in your game?
 * 
 *   Icon:
 *   - What icon do you wish to use to represent Brave Points?
 * 
 *   Cost Format:
 *   - How are Brave Point costs displayed?
 *   - %1 - Cost, %2 - BP Text, %3 - Icon
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the BP Cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the BP cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the BP cost for the Guard command?
 * 
 *   Reduce Shown BP Cost:
 *   - Reduce shown BP costs by this much.
 *   - Used to match traditional games.
 * 
 *   Show Cost: 0 BP:
 *   - Show the BP cost when the cost is 0 BP?
 *   - Shown BP Cost reduction is applied.
 * 
 *   Show Cost: 1 BP:
 *   - Show the BP cost when the cost is 1 BP?
 *   - Shown BP Cost reduction is applied.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Adjust the mechanics settings for the Battle System BTB. Mechanics range
 * from how speed is handled to Brave action caps, how Brave Points are
 * managed, and Action Fusions.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Brave Action Max
 * 
 *   Default:
 *   - What is the default number of max actions a battler can have from the
 *     Brave system?
 * 
 *   Hard Cap:
 *   - What is the absolute highest for maximum actions a battler can have
 *     from the Brave system?
 *
 * ---
 *
 * Brave Points > Limits
 * 
 *   Default Maximum:
 *   - What is the default maximum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Default Minimum:
 *   - What is the default minimum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Hard Cap Maximum:
 *   - What is the absolute maximum number of Brave Points a battler can have
 *     at a time?
 * 
 *   Hard Cap Minimum:
 *   - What is the absolute minimum number of Brave Points a battler can have
 *     at a time?
 *
 * ---
 *
 * Brave Points > Costs
 * 
 *   Default Skill Cost:
 *   - How many Brave Points does a skill cost by default?
 * 
 *   Default Item Cost:
 *   - How many Brave Points does an item cost by default?
 * 
 *   Predicted Cost:
 *   - What is considered predicted cost?
 *
 * ---
 *
 * Brave Points > Start Battle
 * 
 *   Neutral:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     neutral?
 * 
 *   Favored:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     favored?
 *
 * ---
 *
 * Brave Points > Regeneration
 * 
 *   Base Recovery:
 *   - How many Brave Points are regenerated at the end of each turn?
 * 
 *   Needs to be Alive?:
 *   - Do battlers need to be alive to regenerate Brave Points?
 *
 * ---
 *
 * Action Fusions
 * 
 *   Actor Access?:
 *   - Allow actors access to Action Fusions?
 * 
 *   Enemy Access?:
 *   - Allow enemies access to Action Fusions?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Brave Animations Settings
 * ============================================================================
 *
 * Animation when applying/canceling Brave effects.
 *
 * ---
 *
 * On Brave
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
 * Cancel Brave
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
 * Enemy Brave
 * 
 *   Show Activation?:
 *   - Show the enemy activating Brave?
 * 
 *   Wait Frames:
 *   - This is the number of frames to wait between activations.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System BTB. These adjust how the
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
 * Plugin Parameters: Window Settings Settings
 * ============================================================================
 *
 * Settings regarding the windows of the Battle System BTB. These mostly adjust
 * how certain aspects of the Brave Turn Battle system appear in-game.
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Command Text:
 *   - What is the text that appears for the Brave command?
 * 
 *   Show Command?:
 *   - Show the Brave command in the Actor Command Window?
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Use Page Up/Down for shortcuts on activating Brave?
 * 
 *   JS: Draw Counters:
 *   - Code used to determine how the action counters are displayed on
 *     the window.
 * 
 *     Action Slot:
 *     - This is the text used to represent a non-selected action slot.
 * 
 *     Current Action:
 *     - This is the text used to represent the current action slot.
 *
 * ---
 *
 * Window_BattleStatus
 * 
 *   Display Format:
 *   - How are actor Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon
 * 
 *   Predict Format:
 *   - How are predicted Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 *
 * ---
 *
 * Window_BattleStatus > Text Colors
 * 
 *   Neutral Color:
 *   - Text code color for neutral number values.
 * 
 *   Positive Color:
 *   - Text code color for positive number values.
 * 
 *   Negative Color:
 *   - Text code color for negative number values.
 *
 * ---
 *
 * Window_BattleStatus > Style Settings > Default Style
 *
 * Window_BattleStatus > Style Settings > List Style
 *
 * Window_BattleStatus > Style Settings > XP Style
 *
 * Window_BattleStatus > Style Settings > Portrait Style
 *
 * Window_BattleStatus > Style Settings > Border Style
 *
 * Window_BattleStatus > Style Settings > Alignment Style
 * 
 *   Show Display?:
 *   - Show the actor's BP values in the Battle Status Window?
 * 
 *   Alignment:
 *   - How do you want the actor BP values to be aligned?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the actor BP display X/Y by how many pixels?
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
 * Version 1.12: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused a crash due to removing actors midway in battle.
 *    Fix made by Olivia.
 * 
 * Version 1.11: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.10: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: May 21, 2021
 * * Bug Fixes!
 * ** Using items and skills outside of battle will no longer have BP
 *    restrictions imposed upon them. Fix made by Olivia.
 * 
 * Version 1.06: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_BoostAction plugin.
 * 
 * Version 1.05: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.04: March 5, 2021
 * * Bug Fixes!
 * ** <BTB User Set BP: x>, <BTB User Gain BP: +x>, <BTB User Lose BP: -x>
 *    notetags should no work properly. Fix made by Arisu.
 * 
 * Version 1.03: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.02: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Brave Point preview in the battle status will now be bound by the
 *    absolute minimum hard card and the maximum soft cap. Fixed by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Yanfly.
 * *** <BTB Enable Fusion>
 *
 * Version 1.00: January 4, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorIcon
 * @text Actor: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the BTB Turn Order.
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
 * @command BtbTurnOrderActorFace
 * @text Actor: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the BTB Turn Order.
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
 * @command BtbTurnOrderClearActorGraphic
 * @text Actor: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the actor(s).
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
 * @command BtbTurnOrderEnemyIcon
 * @text Enemy: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
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
 * @command BtbTurnOrderEnemyFace
 * @text Enemy: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
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
 * @command BtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the enemy(ies).
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
 * @text System: BTB Turn Order Visibility
 * @desc Determine the visibility of the BTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the BTB Turn Order Display.
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
 * @param BattleSystemBTB
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
 * @desc General settings regarding Battle System BTB.
 * @default {"BravePoints":"","BravePointsFull:str":"Brave Points","BravePointsAbbr:str":"BP","BravePointsIcon:num":"73","BravePointCostFmt:str":"\\FS[22]\\C[4]%1\\C[6]%2\\C[0]","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","ReduceShownBPCost:num":"0","Show_0_BP_Cost:eval":"true","Show_1_BP_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Adjust the mechanics settings for the Battle System BTB.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","ActionMax":"","MaxActionsDefault:num":"4","MaxActionsHardCap:num":"9","BravePoints":"","BravePointsLimits":"","MaxBravePointsDefault:num":"3","MinBravePointsDefault:num":"-4","MaxBravePointsHardCap:num":"9","MinBravePointsHardCap:num":"-9","BravePointsCosts":"","BravePointSkillCost:num":"1","BravePointItemCost:num":"1","BravePointPredictedCost:num":"1","BravePointsStartBattle":"","BravePointStartNeutral:num":"0","BravePointStartFavor:num":"3","BravePointsRegen":"","BravePointRegenBase:num":"1","BravePointsRegenAlive:eval":"true","ActionFusions":"","ActorActionFusions:eval":"true","EnemyActionFusions:eval":"true"}
 *
 * @param BraveAnimation:struct
 * @text Brave Animations
 * @type struct<BraveAnimation>
 * @desc Animation when applying/canceling Brave effects.
 * @default {"OnBrave":"","BraveAnimationID:num":"12","BraveMirror:eval":"false","BraveMute:eval":"false","CancelBrave":"","CancelAnimationID:num":"62","CancelMirror:eval":"false","CancelMute:eval":"false"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System BTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding the windows of the Battle System BTB.
 * @default {"Window_ActorCommand":"","CommandName:str":"Brave","ShowCommand:eval":"true","BraveShortcuts:eval":"true","DrawActionCountersJS:func":"\"// Declare Constants\\nconst sprite = arguments[0];\\nconst parentWindow = arguments[1];\\nconst actor = arguments[2];\\n\\n// Set Location\\nsprite.x = Math.round(parentWindow.width / 2);\\nsprite.y = 0;\\nsprite.anchor.x = 0.5\\nsprite.anchor.y = 0.5\\n\\n// Create Text\\nconst textSlot = TextManager.btbActionSlot;\\nconst textCurrent = TextManager.btbActionCurrent;\\nlet text = textSlot.repeat(actor.numActions());\\nconst index = actor._actionInputIndex;\\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\\n\\n// Create and Draw Bitmap\\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\\nbitmap.fontSize = 36;\\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\\nsprite.bitmap = bitmap;\"","ActionSlot:str":"○","ActionCurrent:str":"◉","Window_BattleStatus":"","StatusDisplayFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1","StatusPredictFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1\\FS[16] → \\FS[22]%4","TextColors":"","NeutralColor:num":"0","PositiveColor:num":"4","NegativeColor:num":"2","Styles":"","DefaultStyle":"","default_display:eval":"true","default_align:str":"right","default_offsetX:num":"16","default_offsetY:num":"0","ListStyle":"","list_display:eval":"true","list_align:str":"left","list_offsetX:num":"-8","list_offsetY:num":"0","XPStyle":"","xp_display:eval":"true","xp_align:str":"right","xp_offsetX:num":"16","xp_offsetY:num":"0","PortraitStyle":"","portrait_display:eval":"true","portrait_align:str":"right","portrait_offsetX:num":"-8","portrait_offsetY:num":"56","BorderStyle":"","border_display:eval":"true","border_align:str":"right","border_offsetX:num":"16","border_offsetY:num":"0"}
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
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsFull:str
 * @text Full Name
 * @parent BravePoints
 * @desc What is the full name of "Brave Points" in your game?
 * @default Brave Points
 *
 * @param BravePointsAbbr:str
 * @text Abbreviation
 * @parent BravePoints
 * @desc What is the abbreviation of "Brave Points" in your game?
 * @default BP
 *
 * @param BravePointsIcon:num
 * @text Icon
 * @parent BravePoints
 * @desc What icon do you wish to use to represent Brave Points?
 * @default 73
 *
 * @param BravePointCostFmt:str
 * @text Cost Format
 * @parent BravePoints
 * @desc How are Brave Point costs displayed?
 * %1 - Cost, %2 - BP Text, %3 - Icon
 * @default \FS[22]\C[4]%1\C[6]%2\C[0]
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
 * @desc Put the BP Cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Guard command?
 * @default false
 *
 * @param ReduceShownBPCost:num
 * @text Reduce Shown BP Cost
 * @parent DisplayedCosts
 * @type number
 * @desc Reduce shown BP costs by this much.
 * Used to match traditional games.
 * @default 0
 *
 * @param Show_0_BP_Cost:eval
 * @text Show Cost: 0 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 0 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 * @param Show_1_BP_Cost:eval
 * @text Show Cost: 1 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 1 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ActionMax
 * @text Brave Action Max
 *
 * @param MaxActionsDefault:num
 * @text Default
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the default number of max actions a battler can 
 * have from the Brave system?
 * @default 4
 *
 * @param MaxActionsHardCap:num
 * @text Hard Cap
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the absolute highest for maximum actions a battler
 * can have from the Brave system?
 * @default 9
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsLimits
 * @text Limits
 * @parent BravePoints
 *
 * @param MaxBravePointsDefault:num
 * @text Default Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the default maximum number of Brave Points a
 * battler can have at a time?
 * @default 3
 *
 * @param MinBravePointsDefault:num
 * @text Default Minimum
 * @parent BravePointsLimits
 * @desc What is the default minimum number of Brave Points a
 * battler can have at a time?
 * @default -4
 *
 * @param MaxBravePointsHardCap:num
 * @text Hard Cap Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the absolute maximum number of Brave Points a
 * battler can have at a time?
 * @default 9
 *
 * @param MinBravePointsHardCap:num
 * @text Hard Cap Minimum
 * @parent BravePointsLimits
 * @desc What is the absolute minimum number of Brave Points a
 * battler can have at a time?
 * @default -9
 *
 * @param BravePointsCosts
 * @text Costs
 * @parent BravePoints
 *
 * @param BravePointSkillCost:num
 * @text Default Skill Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does a skill cost by default?
 * @default 1
 *
 * @param BravePointItemCost:num
 * @text Default Item Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does an item cost by default?
 * @default 1
 *
 * @param BravePointPredictedCost:num
 * @text Predicted Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc What is considered predicted cost?
 * @default 1
 *
 * @param BravePointsStartBattle
 * @text Start Battle
 * @parent BravePoints
 *
 * @param BravePointStartNeutral:num
 * @text Neutral
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is neutral?
 * @default 0
 *
 * @param BravePointStartFavor:num
 * @text Favored
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is favored?
 * @default 3
 *
 * @param BravePointsRegen
 * @text Regeneration
 * @parent BravePoints
 *
 * @param BravePointRegenBase:num
 * @text Base Recovery
 * @parent BravePointsRegen
 * @type number
 * @min 0
 * @desc How many Brave Points are regenerated at the end
 * of each turn?
 * @default 1
 *
 * @param BravePointsRegenAlive:eval
 * @text Needs to be Alive?
 * @parent BravePointsRegen
 * @type boolean
 * @on Alive
 * @off Can Be Dead
 * @desc Do battlers need to be alive to regenerate Brave Points?
 * @default true
 *
 * @param ActionFusions
 * @text Action Fusions
 *
 * @param ActorActionFusions:eval
 * @text Actor Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow actors access to Action Fusions?
 * @default true
 *
 * @param EnemyActionFusions:eval
 * @text Enemy Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow enemies access to Action Fusions?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * BraveAnimation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BraveAnimation:
 *
 * @param OnBrave
 * @text On Brave
 *
 * @param BraveAnimationID:num
 * @text Animation ID
 * @parent OnBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param BraveMirror:eval
 * @text Mirror Animation
 * @parent OnBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BraveMute:eval
 * @text Mute Animation
 * @parent OnBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param CancelBrave
 * @text Cancel Brave
 *
 * @param CancelAnimationID:num
 * @text Animation ID
 * @parent CancelBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 62
 *
 * @param CancelMirror:eval
 * @text Mirror Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param CancelMute:eval
 * @text Mute Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param EnemyBrave
 * @text Enemy Brave
 *
 * @param ShowEnemyBrave:eval
 * @text Show Activation?
 * @parent EnemyBrave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy activating Brave?
 * @default true
 *
 * @param WaitFrames:num
 * @text Wait Frames
 * @parent EnemyBrave
 * @type number
 * @desc This is the number of frames to wait between activations.
 * @default 20
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
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_ActorCommand
 *
 * @param CommandName:str
 * @text Command Text
 * @parent Window_ActorCommand
 * @desc What is the text that appears for the Brave command?
 * @default Brave
 *
 * @param ShowCommand:eval
 * @text Show Command?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Brave command in the Actor Command Window?
 * @default true
 *
 * @param BraveShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Use Shortcuts
 * @off Don't Use
 * @desc Use Page Up/Down for shortcuts on activating Brave?
 * @default true
 *
 * @param DrawActionCountersJS:func
 * @text JS: Draw Counters
 * @parent Window_ActorCommand
 * @type note
 * @desc Code used to determine how the action counters are
 * displayed on the window.
 * @default "// Declare Constants\nconst sprite = arguments[0];\nconst parentWindow = arguments[1];\nconst actor = arguments[2];\n\n// Set Location\nsprite.x = Math.round(parentWindow.width / 2);\nsprite.y = 0;\nsprite.anchor.x = 0.5\nsprite.anchor.y = 0.5\n\n// Create Text\nconst textSlot = TextManager.btbActionSlot;\nconst textCurrent = TextManager.btbActionCurrent;\nlet text = textSlot.repeat(actor.numActions());\nconst index = actor._actionInputIndex;\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\n\n// Create and Draw Bitmap\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\nbitmap.fontSize = 36;\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\nsprite.bitmap = bitmap;"
 *
 * @param ActionSlot:str
 * @text Action Slot
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent a non-selected action slot.
 * @default ○
 *
 * @param ActionCurrent:str
 * @text Current Action
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent the current action slot.
 * @default ◉
 *
 * @param Window_BattleStatus
 *
 * @param StatusDisplayFmt:str
 * @text Display Format
 * @parent Window_BattleStatus
 * @desc How are actor Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1
 *
 * @param StatusPredictFmt:str
 * @text Predict Format
 * @parent Window_BattleStatus
 * @desc How are predicted Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1\FS[16] → \FS[22]%4
 *
 * @param TextColors
 * @text Text Colors
 * @parent Window_BattleStatus
 *
 * @param NeutralColor:num
 * @text Neutral Color
 * @parent TextColors
 * @desc Text code color for neutral number values.
 * @default 0
 *
 * @param PositiveColor:num
 * @text Positive Color
 * @parent TextColors
 * @desc Text code color for positive number values.
 * @default 4
 *
 * @param NegativeColor:num
 * @text Negative Color
 * @parent TextColors
 * @desc Text code color for negative number values.
 * @default 2
 *
 * @param Styles
 * @text Style Settings
 * @parent Window_BattleStatus
 *
 * @param DefaultStyle
 * @text Default Style
 * @parent Styles
 *
 * @param default_display:eval
 * @text Show Display?
 * @parent DefaultStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param default_align:str
 * @text Alignment
 * @parent DefaultStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param default_offsetX:num
 * @text Offset X
 * @parent DefaultStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param default_offsetY:num
 * @text Offset Y
 * @parent DefaultStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param ListStyle
 * @text List Style
 * @parent Styles
 *
 * @param list_display:eval
 * @text Show Display?
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param list_align:str
 * @text Alignment
 * @parent ListStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default left
 *
 * @param list_offsetX:num
 * @text Offset X
 * @parent ListStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param list_offsetY:num
 * @text Offset Y
 * @parent ListStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param XPStyle
 * @text XP Style
 * @parent Styles
 *
 * @param xp_display:eval
 * @text Show Display?
 * @parent XPStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param xp_align:str
 * @text Alignment
 * @parent XPStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param xp_offsetX:num
 * @text Offset X
 * @parent XPStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param xp_offsetY:num
 * @text Offset Y
 * @parent XPStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param PortraitStyle
 * @text Portrait Style
 * @parent Styles
 *
 * @param portrait_display:eval
 * @text Show Display?
 * @parent PortraitStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param portrait_align:str
 * @text Alignment
 * @parent PortraitStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param portrait_offsetX:num
 * @text Offset X
 * @parent PortraitStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param portrait_offsetY:num
 * @text Offset Y
 * @parent PortraitStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 56
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Styles
 *
 * @param border_display:eval
 * @text Show Display?
 * @parent BorderStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param border_align:str
 * @text Alignment
 * @parent BorderStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param border_offsetX:num
 * @text Offset X
 * @parent BorderStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param border_offsetY:num
 * @text Offset Y
 * @parent BorderStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 */
//=============================================================================

const _0x5e9919=_0x2368;(function(_0x2c7587,_0x5e0115){const _0x41ab1b=_0x2368,_0x464ece=_0x2c7587();while(!![]){try{const _0x455c08=parseInt(_0x41ab1b(0x297))/0x1*(parseInt(_0x41ab1b(0x3eb))/0x2)+-parseInt(_0x41ab1b(0x3f8))/0x3*(-parseInt(_0x41ab1b(0x39d))/0x4)+parseInt(_0x41ab1b(0x1f6))/0x5+-parseInt(_0x41ab1b(0x21e))/0x6+-parseInt(_0x41ab1b(0x1ff))/0x7+-parseInt(_0x41ab1b(0x2f4))/0x8*(-parseInt(_0x41ab1b(0x2ec))/0x9)+-parseInt(_0x41ab1b(0x442))/0xa*(parseInt(_0x41ab1b(0x3d9))/0xb);if(_0x455c08===_0x5e0115)break;else _0x464ece['push'](_0x464ece['shift']());}catch(_0x2f5ed2){_0x464ece['push'](_0x464ece['shift']());}}}(_0x3ace,0x4a383));var label=_0x5e9919(0x2c3),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x564273){const _0x2cf49c=_0x5e9919;return _0x564273['status']&&_0x564273[_0x2cf49c(0x1bd)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x5e9919(0x28c)]=VisuMZ[label][_0x5e9919(0x28c)]||{},VisuMZ[_0x5e9919(0x34a)]=function(_0x5f1de2,_0x13af80){const _0xf3f927=_0x5e9919;for(const _0x4acd67 in _0x13af80){if(_0x4acd67['match'](/(.*):(.*)/i)){const _0x518904=String(RegExp['$1']),_0x1bbfa3=String(RegExp['$2'])[_0xf3f927(0x455)]()[_0xf3f927(0x420)]();let _0x14834e,_0x1fdcb3,_0x30bcf4;switch(_0x1bbfa3){case _0xf3f927(0x384):_0x14834e=_0x13af80[_0x4acd67]!==''?Number(_0x13af80[_0x4acd67]):0x0;break;case _0xf3f927(0x296):_0x1fdcb3=_0x13af80[_0x4acd67]!==''?JSON[_0xf3f927(0x28d)](_0x13af80[_0x4acd67]):[],_0x14834e=_0x1fdcb3[_0xf3f927(0x273)](_0x404626=>Number(_0x404626));break;case'EVAL':_0x14834e=_0x13af80[_0x4acd67]!==''?eval(_0x13af80[_0x4acd67]):null;break;case'ARRAYEVAL':_0x1fdcb3=_0x13af80[_0x4acd67]!==''?JSON[_0xf3f927(0x28d)](_0x13af80[_0x4acd67]):[],_0x14834e=_0x1fdcb3[_0xf3f927(0x273)](_0x10b1d8=>eval(_0x10b1d8));break;case _0xf3f927(0x3c9):_0x14834e=_0x13af80[_0x4acd67]!==''?JSON['parse'](_0x13af80[_0x4acd67]):'';break;case'ARRAYJSON':_0x1fdcb3=_0x13af80[_0x4acd67]!==''?JSON[_0xf3f927(0x28d)](_0x13af80[_0x4acd67]):[],_0x14834e=_0x1fdcb3['map'](_0x5e3e6e=>JSON[_0xf3f927(0x28d)](_0x5e3e6e));break;case _0xf3f927(0x1f9):_0x14834e=_0x13af80[_0x4acd67]!==''?new Function(JSON['parse'](_0x13af80[_0x4acd67])):new Function(_0xf3f927(0x3be));break;case _0xf3f927(0x1f2):_0x1fdcb3=_0x13af80[_0x4acd67]!==''?JSON['parse'](_0x13af80[_0x4acd67]):[],_0x14834e=_0x1fdcb3['map'](_0x9c9154=>new Function(JSON[_0xf3f927(0x28d)](_0x9c9154)));break;case _0xf3f927(0x269):_0x14834e=_0x13af80[_0x4acd67]!==''?String(_0x13af80[_0x4acd67]):'';break;case _0xf3f927(0x3cd):_0x1fdcb3=_0x13af80[_0x4acd67]!==''?JSON[_0xf3f927(0x28d)](_0x13af80[_0x4acd67]):[],_0x14834e=_0x1fdcb3['map'](_0x3c08ba=>String(_0x3c08ba));break;case _0xf3f927(0x436):_0x30bcf4=_0x13af80[_0x4acd67]!==''?JSON[_0xf3f927(0x28d)](_0x13af80[_0x4acd67]):{},_0x14834e=VisuMZ[_0xf3f927(0x34a)]({},_0x30bcf4);break;case _0xf3f927(0x221):_0x1fdcb3=_0x13af80[_0x4acd67]!==''?JSON[_0xf3f927(0x28d)](_0x13af80[_0x4acd67]):[],_0x14834e=_0x1fdcb3[_0xf3f927(0x273)](_0x2abf7c=>VisuMZ[_0xf3f927(0x34a)]({},JSON[_0xf3f927(0x28d)](_0x2abf7c)));break;default:continue;}_0x5f1de2[_0x518904]=_0x14834e;}}return _0x5f1de2;},(_0x17aed0=>{const _0x132605=_0x5e9919,_0x514bf8=_0x17aed0['name'];for(const _0x4d32cc of dependencies){if(_0x132605(0x352)!==_0x132605(0x2d1)){if(!Imported[_0x4d32cc]){alert(_0x132605(0x2fc)[_0x132605(0x313)](_0x514bf8,_0x4d32cc)),SceneManager['exit']();break;}}else{const _0x12538a=_0x1c90da[_0x132605(0x28c)],_0x5657b0=[_0x132605(0x435),_0x132605(0x1b7)][_0x132605(0x394)](_0x12538a[_0x132605(0x3fa)]);return _0x5657b0;}}const _0x78b15d=_0x17aed0[_0x132605(0x1bd)];if(_0x78b15d[_0x132605(0x1ad)](/\[Version[ ](.*?)\]/i)){if(_0x132605(0x23b)!=='CKnRF'){const _0x2f79b4=this[_0x132605(0x31c)]();if(!_0x2f79b4)return;const _0x5be0cb=_0x2f79b4[_0x132605(0x31c)]();if(!_0x5be0cb)return;const _0x39dc28=_0x5be0cb[_0x132605(0x360)]();if(!_0x39dc28)return;this[_0x132605(0x343)](_0x39dc28[_0x132605(0x37f)]);}else{const _0x9a1199=Number(RegExp['$1']);_0x9a1199!==VisuMZ[label][_0x132605(0x292)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x132605(0x313)](_0x514bf8,_0x9a1199)),SceneManager['exit']());}}if(_0x78b15d['match'](/\[Tier[ ](\d+)\]/i)){const _0x37d6db=Number(RegExp['$1']);if(_0x37d6db<tier)_0x132605(0x1d1)===_0x132605(0x1d1)?(alert(_0x132605(0x241)[_0x132605(0x313)](_0x514bf8,_0x37d6db,tier)),SceneManager[_0x132605(0x2c6)]()):_0x4104ff['pop']();else{if('SWQSH'===_0x132605(0x347))return _0x50928d=_0x77853b[_0x132605(0x2c3)][_0x132605(0x3a4)][_0x132605(0x259)](this,_0x543912,_0x4dba18,_0x2fb0fa),_0x291467=this[_0x132605(0x366)](_0x3de17f,_0x2bc670,_0x2a58e5),_0x29aeec;else tier=Math['max'](_0x37d6db,tier);}}VisuMZ[_0x132605(0x34a)](VisuMZ[label]['Settings'],_0x17aed0[_0x132605(0x1cb)]);})(pluginData),PluginManager[_0x5e9919(0x1a7)](pluginData['name'],_0x5e9919(0x24f),_0x1d600f=>{const _0x2f77c7=_0x5e9919;VisuMZ['ConvertParams'](_0x1d600f,_0x1d600f);const _0x2860e6=_0x1d600f[_0x2f77c7(0x39f)],_0x57fba3=_0x1d600f['IconIndex'];for(const _0x239f57 of _0x2860e6){if(_0x2f77c7(0x39c)===_0x2f77c7(0x1f8)){if(this[_0x2f77c7(0x2d0)]>0x0){const _0x2b930a=this[_0x2f77c7(0x2d0)];this[_0x2f77c7(0x36c)]=(this['_homeX']*(_0x2b930a-0x1)+this[_0x2f77c7(0x267)])/_0x2b930a,this[_0x2f77c7(0x3d5)]=(this['_homeY']*(_0x2b930a-0x1)+this[_0x2f77c7(0x254)])/_0x2b930a,this['_homeDuration']--,this[_0x2f77c7(0x2d0)]<=0x0&&(this[_0x2f77c7(0x36c)]=this[_0x2f77c7(0x267)],this['_homeY']=this[_0x2f77c7(0x254)]);}}else{const _0x24fb11=$gameActors['actor'](_0x239f57);if(!_0x24fb11)continue;_0x24fb11['_btbTurnOrderGraphicType']='icon',_0x24fb11[_0x2f77c7(0x2a5)]=_0x57fba3;}}}),PluginManager[_0x5e9919(0x1a7)](pluginData[_0x5e9919(0x3ec)],_0x5e9919(0x22f),_0x4be366=>{const _0x328ce1=_0x5e9919;VisuMZ['ConvertParams'](_0x4be366,_0x4be366);const _0x2559d2=_0x4be366['Actors'],_0x2f23d6=_0x4be366['FaceName'],_0x2d8296=_0x4be366[_0x328ce1(0x2f3)];for(const _0x16995d of _0x2559d2){if(_0x328ce1(0x2e3)!=='havYh'){const _0x159697=$gameActors['actor'](_0x16995d);if(!_0x159697)continue;_0x159697[_0x328ce1(0x359)]=_0x328ce1(0x406),_0x159697[_0x328ce1(0x1d8)]=_0x2f23d6,_0x159697[_0x328ce1(0x29e)]=_0x2d8296;}else{const _0x300615=_0x105129[_0x328ce1(0x2c3)][_0x328ce1(0x28c)][_0x328ce1(0x23d)],_0x4d1831=this[_0x328ce1(0x2b1)]();return _0x300615[_0x328ce1(0x3a2)[_0x328ce1(0x313)](_0x4d1831)]||0x0;}}}),PluginManager['registerCommand'](pluginData[_0x5e9919(0x3ec)],_0x5e9919(0x3f2),_0xd9684e=>{const _0x2bbb2d=_0x5e9919;VisuMZ[_0x2bbb2d(0x34a)](_0xd9684e,_0xd9684e);const _0x2b2eb5=_0xd9684e['Actors'];for(const _0xd696a0 of _0x2b2eb5){const _0x3c8c37=$gameActors[_0x2bbb2d(0x2ea)](_0xd696a0);if(!_0x3c8c37)continue;_0x3c8c37['clearTurnOrderBTBGraphics']();}}),PluginManager[_0x5e9919(0x1a7)](pluginData[_0x5e9919(0x3ec)],'BtbTurnOrderEnemyIcon',_0x179d3c=>{const _0x1fa2b9=_0x5e9919;VisuMZ['ConvertParams'](_0x179d3c,_0x179d3c);const _0xdb1548=_0x179d3c[_0x1fa2b9(0x1ea)],_0x849e42=_0x179d3c[_0x1fa2b9(0x364)];for(const _0x4ee5b2 of _0xdb1548){const _0x1ddc17=$gameTroop[_0x1fa2b9(0x1f5)]()[_0x4ee5b2];if(!_0x1ddc17)continue;_0x1ddc17[_0x1fa2b9(0x359)]=_0x1fa2b9(0x457),_0x1ddc17[_0x1fa2b9(0x2a5)]=_0x849e42;}}),PluginManager['registerCommand'](pluginData['name'],_0x5e9919(0x2bf),_0x1cf4ef=>{const _0x5e722c=_0x5e9919;VisuMZ[_0x5e722c(0x34a)](_0x1cf4ef,_0x1cf4ef);const _0x2d2f61=_0x1cf4ef['Enemies'],_0x530cfb=_0x1cf4ef[_0x5e722c(0x232)],_0x9e5ea5=_0x1cf4ef['FaceIndex'];for(const _0x4550da of _0x2d2f61){if(_0x5e722c(0x1e0)===_0x5e722c(0x1d7)){const _0x1249e8=new _0x341366();_0x1249e8['anchor']['x']=this['anchor']['x'],_0x1249e8[_0x5e722c(0x1c0)]['y']=this['anchor']['y'],this['_graphicSprite']=_0x1249e8,this['addChild'](this[_0x5e722c(0x3e4)]),this[_0x5e722c(0x41d)]();}else{const _0x1070fd=$gameTroop[_0x5e722c(0x1f5)]()[_0x4550da];if(!_0x1070fd)continue;_0x1070fd['_btbTurnOrderGraphicType']=_0x5e722c(0x406),_0x1070fd[_0x5e722c(0x1d8)]=_0x530cfb,_0x1070fd[_0x5e722c(0x29e)]=_0x9e5ea5;}}}),PluginManager[_0x5e9919(0x1a7)](pluginData[_0x5e9919(0x3ec)],'BtbTurnOrderClearEnemyGraphic',_0x550822=>{const _0x4dbfe1=_0x5e9919;VisuMZ['ConvertParams'](_0x550822,_0x550822);const _0x421acc=_0x550822[_0x4dbfe1(0x1ea)];for(const _0x489348 of _0x421acc){const _0x25edfa=$gameTroop[_0x4dbfe1(0x1f5)]()[_0x489348];if(!_0x25edfa)continue;_0x25edfa[_0x4dbfe1(0x1b8)]();}}),PluginManager['registerCommand'](pluginData[_0x5e9919(0x3ec)],_0x5e9919(0x3fd),_0x156030=>{const _0x3c6970=_0x5e9919;VisuMZ[_0x3c6970(0x34a)](_0x156030,_0x156030);const _0x4ec150=_0x156030[_0x3c6970(0x28e)];$gameSystem[_0x3c6970(0x327)](_0x4ec150);}),VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x3f3)]={'EnemyMultiAction':/<BTB (?:MULTI|MULTIPLE) (?:ACTION|ACTIONS):[ ](.*)>/i,'BravePointCost':/<BTB (?:BRAVE|BP) COST:[ ](\d+)>/i,'BravePointSetUser':/<BTB USER SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointSetTarget':/<BTB TARGET SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointAlterUser':/<BTB USER (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointAlterTarget':/<BTB TARGET (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'HideBravePointCost':/<BTB HIDE (?:BRAVE|BP) COST>/i,'BTB_Help':/<BTB HELP>\s*([\s\S]*)\s*<\/BTB HELP>/i,'FusionFlex':/<BTB (?:FLEX|FLEXIBLE) FUSION:[ ](.*)>/gi,'FusionStrict':/<BTB (?:STRICT|EXACT) FUSION:[ ](.*)>/gi,'JsBravePointsUser':/<JS BTB USER (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB USER (?:BRAVE|BP)>/i,'JsBravePointsTarget':/<JS BTB TARGET (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB TARGET (?:BRAVE|BP)>/i,'BravePointBattleStart':/<BTB INITIAL (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointRegen':/<BTB (?:BRAVE|BP) (?:REGEN|DEGEN):[ ]([\+\-]\d+)>/i,'MaxBravePoints':/<BTB (?:MAXIMUM|MAX) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MinBravePoints':/<BTB (?:MINIMUM|MIN) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MaxActions':/<BTB (?:MAXIMUM|MAX) (?:ACTION|ACTIONS):[ ]([\+\-]\d+)>/i,'CannotBrave':/<BTB CANNOT BRAVE>/i,'HideBrave':/<BTB HIDE BRAVE>/i,'CannotFusion':/<BTB CANNOT FUSION>/i,'EnableFusion':/<BTB ENABLE FUSION>/i},VisuMZ['BattleSystemBTB'][_0x5e9919(0x2e7)]=Scene_Boot[_0x5e9919(0x278)][_0x5e9919(0x24a)],Scene_Boot[_0x5e9919(0x278)][_0x5e9919(0x24a)]=function(){const _0x53295e=_0x5e9919;VisuMZ[_0x53295e(0x2c3)][_0x53295e(0x2e7)][_0x53295e(0x259)](this),this[_0x53295e(0x3c5)]();},Scene_Boot[_0x5e9919(0x278)][_0x5e9919(0x3c5)]=function(){const _0x5865cf=_0x5e9919;this['process_VisuMZ_BattleSystemBTB_Notetags'](),this[_0x5865cf(0x218)]();},Scene_Boot[_0x5e9919(0x278)][_0x5e9919(0x2db)]=function(){const _0x4130ef=_0x5e9919;if(VisuMZ[_0x4130ef(0x2aa)])return;const _0xe6d46=$dataSkills[_0x4130ef(0x30e)]($dataItems);for(const _0x5f54dc of _0xe6d46){if(_0x4130ef(0x362)===_0x4130ef(0x445))this[_0x4130ef(0x40a)][_0x4130ef(0x259)](this,this[_0x4130ef(0x3a6)],this,this[_0x4130ef(0x42e)]);else{if(!_0x5f54dc)continue;DataManager[_0x4130ef(0x439)](_0x5f54dc);}}},VisuMZ[_0x5e9919(0x2c3)]['JS']={},Scene_Boot['prototype'][_0x5e9919(0x218)]=function(){const _0x3e521d=_0x5e9919;if(VisuMZ[_0x3e521d(0x2aa)])return;const _0x128818=VisuMZ['BattleSystemBTB'][_0x3e521d(0x3f3)],_0x1b62c8=$dataSkills[_0x3e521d(0x30e)](dataItems);for(const _0x1e6f99 of _0x1b62c8){if(!_0x1e6f99)continue;VisuMZ[_0x3e521d(0x2c3)][_0x3e521d(0x220)](_0x1e6f99,_0x3e521d(0x2f7)),VisuMZ[_0x3e521d(0x2c3)][_0x3e521d(0x220)](_0x1e6f99,_0x3e521d(0x3a3));}},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x220)]=function(_0x5a92e1,_0x4db468){const _0x15f7f8=_0x5e9919,_0x413a1d=VisuMZ[_0x15f7f8(0x2c3)][_0x15f7f8(0x3f3)][_0x4db468],_0x1acd5e=_0x5a92e1[_0x15f7f8(0x2a4)];if(_0x1acd5e[_0x15f7f8(0x1ad)](_0x413a1d)){if('UmJSY'!==_0x15f7f8(0x274))return _0x1deb8a[_0x15f7f8(0x2c3)][_0x15f7f8(0x248)]['call'](this);else{const _0x3bd55a=String(RegExp['$1']),_0x44fcf6=_0x15f7f8(0x375)[_0x15f7f8(0x313)](_0x3bd55a),_0xa6dfa8=VisuMZ[_0x15f7f8(0x2c3)][_0x15f7f8(0x2d9)](_0x5a92e1,_0x4db468);VisuMZ[_0x15f7f8(0x2c3)]['JS'][_0xa6dfa8]=new Function(_0x44fcf6);}}},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x2d9)]=function(_0x10bdb5,_0x2965ca){const _0x17aed8=_0x5e9919;if(VisuMZ[_0x17aed8(0x2d9)])return VisuMZ['createKeyJS'](_0x10bdb5,_0x2965ca);let _0x371112='';if($dataActors[_0x17aed8(0x394)](_0x10bdb5))_0x371112=_0x17aed8(0x1b3)[_0x17aed8(0x313)](_0x10bdb5['id'],_0x2965ca);if($dataClasses[_0x17aed8(0x394)](_0x10bdb5))_0x371112=_0x17aed8(0x325)['format'](_0x10bdb5['id'],_0x2965ca);if($dataSkills[_0x17aed8(0x394)](_0x10bdb5))_0x371112=_0x17aed8(0x2de)[_0x17aed8(0x313)](_0x10bdb5['id'],_0x2965ca);if($dataItems[_0x17aed8(0x394)](_0x10bdb5))_0x371112=_0x17aed8(0x2ed)[_0x17aed8(0x313)](_0x10bdb5['id'],_0x2965ca);if($dataWeapons[_0x17aed8(0x394)](_0x10bdb5))_0x371112=_0x17aed8(0x30b)['format'](_0x10bdb5['id'],_0x2965ca);if($dataArmors['includes'](_0x10bdb5))_0x371112=_0x17aed8(0x3e1)[_0x17aed8(0x313)](_0x10bdb5['id'],_0x2965ca);if($dataEnemies[_0x17aed8(0x394)](_0x10bdb5))_0x371112=_0x17aed8(0x421)['format'](_0x10bdb5['id'],_0x2965ca);if($dataStates[_0x17aed8(0x394)](_0x10bdb5))_0x371112=_0x17aed8(0x1d0)[_0x17aed8(0x313)](_0x10bdb5['id'],_0x2965ca);return _0x371112;},VisuMZ['BattleSystemBTB'][_0x5e9919(0x312)]=VisuMZ[_0x5e9919(0x312)],VisuMZ[_0x5e9919(0x312)]=function(_0x2f5baa){const _0x866faa=_0x5e9919;VisuMZ[_0x866faa(0x2c3)][_0x866faa(0x312)][_0x866faa(0x259)](this,_0x2f5baa),DataManager['btbRegisterFusions'](_0x2f5baa),VisuMZ[_0x866faa(0x2c3)][_0x866faa(0x220)](_0x2f5baa,_0x866faa(0x2f7)),VisuMZ[_0x866faa(0x2c3)][_0x866faa(0x220)](_0x2f5baa,'JsBravePointsTarget');},VisuMZ['BattleSystemBTB']['ParseItemNotetags']=VisuMZ['ParseItemNotetags'],VisuMZ[_0x5e9919(0x2ef)]=function(_0x977fe7){const _0x542a69=_0x5e9919;VisuMZ[_0x542a69(0x2c3)][_0x542a69(0x2ef)][_0x542a69(0x259)](this,_0x977fe7),DataManager['btbRegisterFusions'](_0x977fe7),VisuMZ[_0x542a69(0x2c3)][_0x542a69(0x220)](_0x977fe7,_0x542a69(0x2f7)),VisuMZ[_0x542a69(0x2c3)][_0x542a69(0x220)](_0x977fe7,_0x542a69(0x3a3));},DataManager[_0x5e9919(0x36a)]=function(_0x4b87c1){const _0x22b95f=_0x5e9919;_0x4b87c1=_0x4b87c1[_0x22b95f(0x455)]()[_0x22b95f(0x420)](),this[_0x22b95f(0x26c)]=this[_0x22b95f(0x26c)]||{};if(this[_0x22b95f(0x26c)][_0x4b87c1])return this[_0x22b95f(0x26c)][_0x4b87c1];for(const _0x38203d of $dataSkills){if(!_0x38203d)continue;this[_0x22b95f(0x26c)][_0x38203d[_0x22b95f(0x3ec)][_0x22b95f(0x455)]()[_0x22b95f(0x420)]()]=_0x38203d['id'];}return this[_0x22b95f(0x26c)][_0x4b87c1]||0x0;},DataManager['getItemIdWithName']=function(_0x2bb454){const _0xca6a80=_0x5e9919;_0x2bb454=_0x2bb454[_0xca6a80(0x455)]()[_0xca6a80(0x420)](),this[_0xca6a80(0x2df)]=this[_0xca6a80(0x2df)]||{};if(this[_0xca6a80(0x2df)][_0x2bb454])return this['_itemIDs'][_0x2bb454];for(const _0x326729 of $dataItems){if(!_0x326729)continue;this[_0xca6a80(0x2df)][_0x326729['name'][_0xca6a80(0x455)]()['trim']()]=_0x326729['id'];}return this[_0xca6a80(0x2df)][_0x2bb454]||0x0;},DataManager[_0x5e9919(0x3c2)]={},DataManager[_0x5e9919(0x3ef)]={},DataManager[_0x5e9919(0x3f7)]={},DataManager[_0x5e9919(0x20a)]={},DataManager[_0x5e9919(0x439)]=function(_0x472d5a){const _0x2b3c5c=_0x5e9919;if(!_0x472d5a)return;const _0x2f1f2f=VisuMZ[_0x2b3c5c(0x2c3)][_0x2b3c5c(0x3f3)],_0x1fe00c=_0x472d5a[_0x2b3c5c(0x2a4)],_0x2a6762=DataManager[_0x2b3c5c(0x3fb)](_0x472d5a),_0x166b65=_0x1fe00c[_0x2b3c5c(0x1ad)](_0x2f1f2f[_0x2b3c5c(0x3d0)]);if(_0x166b65)for(const _0x4570d0 of _0x166b65){if(_0x2b3c5c(0x240)===_0x2b3c5c(0x40b))this['x']=this[_0x2b3c5c(0x36c)]+(_0xf0b2f1['RepositionTopHelpX']||0x0),this['y']=this[_0x2b3c5c(0x3d5)]+(_0x1085b5[_0x2b3c5c(0x386)]||0x0);else{if(!_0x4570d0)continue;_0x4570d0['match'](_0x2f1f2f['FusionFlex']);const _0x5335e6=String(RegExp['$1'])[_0x2b3c5c(0x281)](','),_0x296e62=this[_0x2b3c5c(0x2f8)](_0x5335e6,_0x2a6762)[_0x2b3c5c(0x365)]((_0x17ee98,_0x2dde24)=>_0x17ee98-_0x2dde24);if(_0x296e62[_0x2b3c5c(0x3b1)]<=0x1)continue;const _0x32d432=_0x296e62[_0x2b3c5c(0x3a0)]('-'),_0x58d749=_0x2a6762?DataManager[_0x2b3c5c(0x3c2)]:DataManager[_0x2b3c5c(0x3f7)];_0x58d749[_0x32d432]=_0x472d5a['id'];}}const _0x1b5843=_0x1fe00c[_0x2b3c5c(0x1ad)](_0x2f1f2f[_0x2b3c5c(0x293)]);if(_0x1b5843)for(const _0x4eb3b7 of _0x1b5843){if('IOgsq'!=='knavu'){if(!_0x4eb3b7)continue;_0x4eb3b7[_0x2b3c5c(0x1ad)](_0x2f1f2f[_0x2b3c5c(0x293)]);const _0x152d4d=String(RegExp['$1'])['split'](','),_0x356936=this[_0x2b3c5c(0x2f8)](_0x152d4d,_0x2a6762);if(_0x356936[_0x2b3c5c(0x3b1)]<=0x1)continue;const _0x1c1e43=_0x356936['join']('-'),_0x1d7f3e=_0x2a6762?DataManager[_0x2b3c5c(0x3c2)]:DataManager[_0x2b3c5c(0x3f7)];_0x1d7f3e[_0x1c1e43]=_0x472d5a['id'];}else return _0x2b3c5c(0x406);}},DataManager[_0x5e9919(0x2f8)]=function(_0x3f4f2d,_0x56e0bd){const _0x6b4d6c=_0x5e9919,_0x3157a0=[];for(let _0x1b5aba of _0x3f4f2d){_0x1b5aba=(String(_0x1b5aba)||'')[_0x6b4d6c(0x420)]();const _0x5f0e3b=/^\d+$/[_0x6b4d6c(0x402)](_0x1b5aba);if(_0x5f0e3b)_0x3157a0[_0x6b4d6c(0x41a)](Number(_0x1b5aba));else _0x56e0bd?_0x3157a0[_0x6b4d6c(0x41a)](DataManager[_0x6b4d6c(0x36a)](_0x1b5aba)):_0x3157a0['push'](DataManager[_0x6b4d6c(0x25e)](_0x1b5aba));}return _0x3157a0;},ImageManager[_0x5e9919(0x2f5)]=VisuMZ['BattleSystemBTB'][_0x5e9919(0x28c)][_0x5e9919(0x450)][_0x5e9919(0x276)],ImageManager[_0x5e9919(0x20d)]=ImageManager[_0x5e9919(0x20d)]||0x9,ImageManager[_0x5e9919(0x3fc)]=ImageManager[_0x5e9919(0x3fc)]||0x6,TextManager[_0x5e9919(0x3ee)]=VisuMZ[_0x5e9919(0x2c3)]['Settings']['General'][_0x5e9919(0x2d2)],TextManager['btbBravePointsAbbr']=VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x28c)][_0x5e9919(0x450)][_0x5e9919(0x228)],TextManager[_0x5e9919(0x42a)]=VisuMZ[_0x5e9919(0x2c3)]['Settings'][_0x5e9919(0x450)][_0x5e9919(0x198)],TextManager[_0x5e9919(0x287)]=VisuMZ['BattleSystemBTB'][_0x5e9919(0x28c)]['Window'][_0x5e9919(0x1d5)],TextManager['btbActionSlot']=VisuMZ[_0x5e9919(0x2c3)]['Settings'][_0x5e9919(0x23d)][_0x5e9919(0x356)],TextManager['btbActionCurrent']=VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x28c)][_0x5e9919(0x23d)]['ActionCurrent'],SceneManager[_0x5e9919(0x1e8)]=function(){const _0x3f6ca0=_0x5e9919;return this[_0x3f6ca0(0x404)]&&this[_0x3f6ca0(0x404)][_0x3f6ca0(0x400)]===Scene_Battle;},VisuMZ['BattleSystemBTB'][_0x5e9919(0x283)]=BattleManager['battleSys'],BattleManager[_0x5e9919(0x2a7)]=function(){const _0x591be3=_0x5e9919;if(this['isBTB']())return _0x591be3(0x345);return VisuMZ[_0x591be3(0x2c3)][_0x591be3(0x283)][_0x591be3(0x259)](this);},BattleManager[_0x5e9919(0x37b)]=function(){const _0x8b2afa=_0x5e9919;return $gameSystem[_0x8b2afa(0x40c)]()===_0x8b2afa(0x345);},VisuMZ[_0x5e9919(0x2c3)]['BattleManager_isTpb']=BattleManager['isTpb'],BattleManager[_0x5e9919(0x284)]=function(){const _0xe5e452=_0x5e9919;if(this[_0xe5e452(0x37b)]())return![];return VisuMZ[_0xe5e452(0x2c3)][_0xe5e452(0x3ea)][_0xe5e452(0x259)](this);},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x305)]=BattleManager['isActiveTpb'],BattleManager['isActiveTpb']=function(){const _0x41ddff=_0x5e9919;if(this[_0x41ddff(0x37b)]())return![];return VisuMZ[_0x41ddff(0x2c3)][_0x41ddff(0x305)][_0x41ddff(0x259)](this);},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x2d8)]=BattleManager['isTurnBased'],BattleManager[_0x5e9919(0x3f1)]=function(){const _0x435fb2=_0x5e9919;if(this[_0x435fb2(0x37b)]())return!![];return VisuMZ[_0x435fb2(0x2c3)][_0x435fb2(0x2d8)][_0x435fb2(0x259)](this);},VisuMZ['BattleSystemBTB']['BattleManager_startInput']=BattleManager[_0x5e9919(0x23f)],BattleManager[_0x5e9919(0x23f)]=function(){const _0x59a034=_0x5e9919;VisuMZ[_0x59a034(0x2c3)][_0x59a034(0x1d3)][_0x59a034(0x259)](this),this[_0x59a034(0x37b)]()&&this[_0x59a034(0x251)]()&&!this[_0x59a034(0x210)]&&$gameParty[_0x59a034(0x38d)]()&&this[_0x59a034(0x25c)]();},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x2bb)]=BattleManager['startTurn'],BattleManager[_0x5e9919(0x34c)]=function(){const _0x1fab0d=_0x5e9919;VisuMZ[_0x1fab0d(0x2c3)][_0x1fab0d(0x2bb)][_0x1fab0d(0x259)](this),this[_0x1fab0d(0x22b)]();},BattleManager[_0x5e9919(0x22b)]=function(){const _0x4eed1d=_0x5e9919;if(!SceneManager[_0x4eed1d(0x1e8)]())return;if(!this[_0x4eed1d(0x37b)]())return;const _0x202439=SceneManager['_scene'];if(!_0x202439)return;const _0x3d6a83=_0x202439[_0x4eed1d(0x3d1)];if(!_0x3d6a83)return;_0x3d6a83[_0x4eed1d(0x242)]();},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x367)]=BattleManager[_0x5e9919(0x2d3)],BattleManager[_0x5e9919(0x2d3)]=function(){const _0x58dcb7=_0x5e9919;VisuMZ[_0x58dcb7(0x2c3)][_0x58dcb7(0x367)][_0x58dcb7(0x259)](this),this[_0x58dcb7(0x37b)]()&&(this[_0x58dcb7(0x3c8)]=this[_0x58dcb7(0x3c8)][_0x58dcb7(0x1ba)](_0x165524=>_0x165524&&_0x165524['_actions'][_0x58dcb7(0x3b1)]>0x0),this[_0x58dcb7(0x34f)]());},BattleManager[_0x5e9919(0x1a3)]=function(){const _0x2180af=_0x5e9919;if(!this[_0x2180af(0x37b)]())return;if(!SceneManager[_0x2180af(0x1e8)]())return;const _0x13ccf3=this[_0x2180af(0x3c8)];for(const _0x269e34 of _0x13ccf3){_0x269e34[_0x2180af(0x392)]();}_0x13ccf3[_0x2180af(0x365)]((_0x5c0f6f,_0xfed3d5)=>_0xfed3d5[_0x2180af(0x454)]()-_0x5c0f6f[_0x2180af(0x454)]()),this[_0x2180af(0x37b)]()&&this[_0x2180af(0x34f)]();},BattleManager[_0x5e9919(0x398)]=function(){const _0x2fbfd7=_0x5e9919;if(!this[_0x2fbfd7(0x37b)]())return;this[_0x2fbfd7(0x3c8)]=this[_0x2fbfd7(0x3c8)]||[],this[_0x2fbfd7(0x3c8)]=this[_0x2fbfd7(0x3c8)][_0x2fbfd7(0x1ba)](_0x25fee0=>_0x25fee0&&_0x25fee0[_0x2fbfd7(0x25d)]()&&_0x25fee0['isAlive']()),this[_0x2fbfd7(0x34f)]();},BattleManager['updateTurnOrderBTB']=function(_0x4b1aac){const _0x4f4127=_0x5e9919;if(!this[_0x4f4127(0x37b)]())return;const _0x2656ff=SceneManager['_scene'][_0x4f4127(0x425)];if(!_0x2656ff)return;_0x2656ff[_0x4f4127(0x236)](_0x4b1aac);},VisuMZ[_0x5e9919(0x2c3)]['BattleManager_startAction']=BattleManager[_0x5e9919(0x234)],BattleManager['startAction']=function(){const _0x5a07a6=_0x5e9919;BattleManager[_0x5a07a6(0x37b)]()&&this['_subject']&&this[_0x5a07a6(0x1fc)][_0x5a07a6(0x379)](),VisuMZ[_0x5a07a6(0x2c3)]['BattleManager_startAction'][_0x5a07a6(0x259)](this);},VisuMZ['BattleSystemBTB']['Game_System_initialize']=Game_System[_0x5e9919(0x278)][_0x5e9919(0x1c1)],Game_System[_0x5e9919(0x278)][_0x5e9919(0x1c1)]=function(){const _0x1c6a6e=_0x5e9919;VisuMZ[_0x1c6a6e(0x2c3)][_0x1c6a6e(0x2b7)][_0x1c6a6e(0x259)](this),this[_0x1c6a6e(0x1dc)]();},Game_System[_0x5e9919(0x278)][_0x5e9919(0x1dc)]=function(){const _0x3d04a5=_0x5e9919;this[_0x3d04a5(0x22e)]=!![];},Game_System[_0x5e9919(0x278)][_0x5e9919(0x317)]=function(){const _0xed338e=_0x5e9919;return this[_0xed338e(0x22e)]===undefined&&this[_0xed338e(0x1dc)](),this['_btbTurnOrderVisible'];},Game_System[_0x5e9919(0x278)][_0x5e9919(0x327)]=function(_0xdd3dc6){const _0x24e5a8=_0x5e9919;this['_btbTurnOrderVisible']===undefined&&this[_0x24e5a8(0x1dc)](),this['_btbTurnOrderVisible']=_0xdd3dc6;},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x399)]=Game_Action[_0x5e9919(0x278)][_0x5e9919(0x1d2)],Game_Action['prototype']['applyItemUserEffect']=function(_0x37110a){const _0x18adbe=_0x5e9919;VisuMZ[_0x18adbe(0x2c3)][_0x18adbe(0x399)][_0x18adbe(0x259)](this,_0x37110a),this[_0x18adbe(0x243)](_0x37110a);},Game_Action[_0x5e9919(0x278)]['applyBattleSystemBTBUserEffect']=function(_0x4a2f69){const _0x5e0869=_0x5e9919;if(!BattleManager[_0x5e0869(0x37b)]())return;if(this[_0x5e0869(0x270)]())this[_0x5e0869(0x2c8)](_0x4a2f69);},Game_Action[_0x5e9919(0x278)][_0x5e9919(0x2c8)]=function(_0x13803e){const _0x4ed205=_0x5e9919,_0x309746=VisuMZ[_0x4ed205(0x2c3)]['RegExp'],_0x57f0ac=this[_0x4ed205(0x270)]()[_0x4ed205(0x2a4)],_0x4d9ad9=this[_0x4ed205(0x270)]();if(this[_0x4ed205(0x41e)]()){if(_0x4ed205(0x3df)===_0x4ed205(0x3df)){if(_0x57f0ac[_0x4ed205(0x1ad)](_0x309746[_0x4ed205(0x2b2)])){if('vdUPE'!==_0x4ed205(0x2cc)){const _0x133040=Number(RegExp['$1']);this[_0x4ed205(0x41e)]()[_0x4ed205(0x397)](_0x133040);}else{const _0x423e68=this[_0x4ed205(0x2c0)];this[_0x4ed205(0x309)]=(this['opacity']*(_0x423e68-0x1)+this[_0x4ed205(0x3d6)])/_0x423e68,this['_fadeDuration']--,this[_0x4ed205(0x2c0)]<=0x0&&(this['checkPosition'](),this[_0x4ed205(0x3e3)]=0x0,this['updatePosition'](),this['opacity']=this['_fadeTarget']);}}if(_0x57f0ac[_0x4ed205(0x1ad)](_0x309746[_0x4ed205(0x2c5)])){const _0x47ee53=Number(RegExp['$1']);this['subject']()[_0x4ed205(0x2a1)](_0x47ee53);}const _0xf8704b=_0x4ed205(0x2f7),_0x14067a=VisuMZ[_0x4ed205(0x2c3)][_0x4ed205(0x2d9)](_0x4d9ad9,_0xf8704b);if(VisuMZ[_0x4ed205(0x2c3)]['JS'][_0x14067a]){if('fXiIS'!==_0x4ed205(0x2bc)){const _0x16510a=VisuMZ[_0x4ed205(0x2c3)]['JS'][_0x14067a][_0x4ed205(0x259)](this,this[_0x4ed205(0x41e)](),_0x13803e,this[_0x4ed205(0x41e)]()[_0x4ed205(0x1b5)]());this['subject']()[_0x4ed205(0x397)](_0x16510a);}else return this[_0x4ed205(0x41d)]();}}else this[_0x4ed205(0x2ae)]();}if(_0x13803e){if(_0x57f0ac['match'](_0x309746[_0x4ed205(0x44d)])){if(_0x4ed205(0x2a6)!==_0x4ed205(0x31f)){const _0x2952ab=Number(RegExp['$1']);_0x13803e['setBravePoints'](_0x2952ab);}else this['_btbTurnOrderGraphicType']=this['createTurnOrderBTBGraphicType']();}if(_0x57f0ac[_0x4ed205(0x1ad)](_0x309746['BravePointAlterTarget'])){if('SECrU'==='SECrU'){const _0x49a2bc=Number(RegExp['$1']);_0x13803e['gainBravePoints'](_0x49a2bc);}else{this['x']=this['_positionTargetX'],this['y']=this['_positionTargetY'];if(this[_0x4ed205(0x309)]<0xff&&!this[_0x4ed205(0x29b)]&&this[_0x4ed205(0x2c0)]<=0x0){const _0x5a9bd1=this[_0x4ed205(0x31c)]();_0x5a9bd1&&(this[_0x4ed205(0x3d6)]=_0x5a9bd1['isAlive']()&&_0x5a9bd1[_0x4ed205(0x25d)]()?0xff:0x0);}}}const _0x3dd71b=_0x4ed205(0x3a3),_0x3158bd=VisuMZ[_0x4ed205(0x2c3)][_0x4ed205(0x2d9)](_0x4d9ad9,_0x3dd71b);if(VisuMZ[_0x4ed205(0x2c3)]['JS'][_0x3158bd]){if(_0x4ed205(0x3c1)!==_0x4ed205(0x231)){const _0x38e88d=VisuMZ[_0x4ed205(0x2c3)]['JS'][_0x3158bd][_0x4ed205(0x259)](this,this['subject'](),_0x13803e,_0x13803e[_0x4ed205(0x1b5)]());_0x13803e[_0x4ed205(0x397)](_0x38e88d);}else this[_0x4ed205(0x1fc)][_0x4ed205(0x379)]();}}},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x1c6)]=Game_Action[_0x5e9919(0x278)][_0x5e9919(0x454)],Game_Action[_0x5e9919(0x278)]['speed']=function(){const _0x357315=_0x5e9919;if(BattleManager['isBTB']())return VisuMZ[_0x357315(0x2c3)][_0x357315(0x28c)][_0x357315(0x332)]['CalcActionSpeedJS'][_0x357315(0x259)](this);else{if(_0x357315(0x3b7)!==_0x357315(0x19a))return VisuMZ[_0x357315(0x2c3)][_0x357315(0x1c6)]['call'](this);else{const _0xd049a1=new _0xf2cbec(this);_0xd049a1['setSkill'](_0x3f5c9f),_0xd049a1['_bypassAiValidCheck']=!![],this[_0x357315(0x261)]['push'](_0xd049a1);}}},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x34b)]=Game_Action[_0x5e9919(0x278)][_0x5e9919(0x3e5)],Game_Action['prototype'][_0x5e9919(0x3e5)]=function(){const _0x4565d9=_0x5e9919;if(BattleManager['isBTB']()){if('iHLME'!=='XJthQ')return VisuMZ[_0x4565d9(0x2c3)][_0x4565d9(0x28c)]['Mechanics']['AllowRandomSpeed'];else{const _0x67fef7=this['containerWindow']();if(!_0x67fef7)return;let _0x4b0808=![];if(this['_containerWidth']!==_0x67fef7['width'])_0x4b0808=!![];else this['_containerHeight']!==_0x67fef7[_0x4565d9(0x22c)]&&(_0x4b0808=!![]);_0x4b0808&&this[_0x4565d9(0x275)]();}}else return VisuMZ['BattleSystemBTB'][_0x4565d9(0x34b)][_0x4565d9(0x259)](this);},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x407)]=Game_Action[_0x5e9919(0x278)][_0x5e9919(0x280)],Game_Action[_0x5e9919(0x278)][_0x5e9919(0x280)]=function(_0x421180){const _0x4196ca=_0x5e9919;VisuMZ[_0x4196ca(0x2c3)][_0x4196ca(0x407)]['call'](this,_0x421180),BattleManager['sortActionOrdersBTB']();},VisuMZ['BattleSystemBTB'][_0x5e9919(0x32e)]=Game_Action[_0x5e9919(0x278)]['setItem'],Game_Action[_0x5e9919(0x278)]['setItem']=function(_0xe65fe2){const _0x15cac9=_0x5e9919;VisuMZ[_0x15cac9(0x2c3)][_0x15cac9(0x32e)][_0x15cac9(0x259)](this,_0xe65fe2),BattleManager[_0x15cac9(0x1a3)]();},Game_Action['prototype'][_0x5e9919(0x20e)]=function(_0x558c42){const _0x337b31=_0x5e9919;this[_0x337b31(0x294)]=_0x558c42;},Game_Action['prototype'][_0x5e9919(0x2cd)]=function(){const _0x392d2a=_0x5e9919;if(this[_0x392d2a(0x294)]===undefined)return 0x0;return this[_0x392d2a(0x294)]['split']('-')[_0x392d2a(0x3b1)]-0x1;},Game_Action[_0x5e9919(0x278)][_0x5e9919(0x262)]=function(){const _0x33ccc0=_0x5e9919;if(this[_0x33ccc0(0x294)]===undefined)return[];return this[_0x33ccc0(0x294)][_0x33ccc0(0x281)]('-')[_0x33ccc0(0x273)](_0x9ea882=>$dataSkills[Number(_0x9ea882)]);},Game_Action['prototype'][_0x5e9919(0x3ce)]=function(){const _0x54c675=_0x5e9919;if(this['_actionFusionRecipe']===undefined)return[];return this[_0x54c675(0x294)][_0x54c675(0x281)]('-')['map'](_0x583d94=>$dataItems[Number(_0x583d94)]);},Game_BattlerBase['prototype'][_0x5e9919(0x1b5)]=function(){const _0x2bbc57=_0x5e9919;return this[_0x2bbc57(0x378)]||0x0;},Game_BattlerBase['BTB_MAX_ACTIONS_DEFAULT']=VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x28c)][_0x5e9919(0x332)][_0x5e9919(0x31a)],Game_BattlerBase[_0x5e9919(0x23c)]=VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x28c)]['Mechanics'][_0x5e9919(0x265)],Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x3b8)]=function(){const _0x29a1db=_0x5e9919;if(this['cannotBraveTrait']())return 0x1;if(this[_0x29a1db(0x36f)]())return 0x1;const _0x1c758d=VisuMZ[_0x29a1db(0x2c3)][_0x29a1db(0x3f3)],_0x34db44=_0x1c758d[_0x29a1db(0x255)];let _0x3e7549=Game_BattlerBase[_0x29a1db(0x1cd)];const _0x2fd6d8=this[_0x29a1db(0x1e6)]();for(const _0x32c171 of _0x2fd6d8){if(!_0x32c171)continue;const _0x4ce547=_0x32c171['note'];_0x4ce547[_0x29a1db(0x1ad)](_0x34db44)&&(_0x3e7549+=Number(RegExp['$1']));}return _0x3e7549['clamp'](0x1,Game_BattlerBase['BTB_MAX_ACTIONS_HARD_CAP']);},Game_BattlerBase[_0x5e9919(0x30f)]=VisuMZ['BattleSystemBTB']['Settings'][_0x5e9919(0x332)][_0x5e9919(0x35a)],Game_BattlerBase[_0x5e9919(0x1b9)]=VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x28c)][_0x5e9919(0x332)][_0x5e9919(0x204)],Game_BattlerBase[_0x5e9919(0x24d)]=VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x28c)][_0x5e9919(0x332)][_0x5e9919(0x395)],Game_BattlerBase[_0x5e9919(0x2b4)]=VisuMZ['BattleSystemBTB'][_0x5e9919(0x28c)]['Mechanics'][_0x5e9919(0x1f7)],Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x247)]=function(){const _0x5c9513=_0x5e9919,_0x28ef64=VisuMZ[_0x5c9513(0x2c3)]['RegExp'],_0x440f49=_0x28ef64['MaxBravePoints'];let _0x7606b=Game_BattlerBase[_0x5c9513(0x30f)];const _0x227d52=this[_0x5c9513(0x1e6)]();for(const _0x310c62 of _0x227d52){if(_0x5c9513(0x390)===_0x5c9513(0x390)){if(!_0x310c62)continue;const _0x247baa=_0x310c62[_0x5c9513(0x2a4)];_0x247baa[_0x5c9513(0x1ad)](_0x440f49)&&(_0x7606b+=Number(RegExp['$1']));}else _0x58968f[_0x5c9513(0x2c3)]['Scene_Battle_createActorCommandWindow'][_0x5c9513(0x259)](this),this[_0x5c9513(0x1a2)]();}return Math[_0x5c9513(0x19e)](_0x7606b,Game_BattlerBase[_0x5c9513(0x24d)]);},Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x1ab)]=function(){const _0x2f97fd=_0x5e9919,_0x378adf=VisuMZ[_0x2f97fd(0x2c3)][_0x2f97fd(0x3f3)],_0x269976=_0x378adf[_0x2f97fd(0x2f9)];let _0x45928a=Game_BattlerBase[_0x2f97fd(0x1b9)];const _0x2d4faf=this[_0x2f97fd(0x1e6)]();for(const _0x3f1686 of _0x2d4faf){if(!_0x3f1686)continue;const _0x4f48cd=_0x3f1686[_0x2f97fd(0x2a4)];_0x4f48cd['match'](_0x269976)&&('xvmXK'===_0x2f97fd(0x320)?_0x562b82['push'](_0x2cae8c(_0x4fc458)):_0x45928a+=Number(RegExp['$1']));}return Math[_0x2f97fd(0x415)](_0x45928a,Game_BattlerBase[_0x2f97fd(0x2b4)]);},Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x397)]=function(_0x1ce381){const _0x2b76a0=_0x5e9919;this[_0x2b76a0(0x378)]=Math[_0x2b76a0(0x19e)](_0x1ce381,this[_0x2b76a0(0x247)]()),this[_0x2b76a0(0x2e1)]();},Game_BattlerBase['prototype']['gainBravePoints']=function(_0x1cfc84){const _0x385782=_0x5e9919;_0x1cfc84+=this[_0x385782(0x378)]||0x0,this['setBravePoints'](_0x1cfc84);},Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x2ca)]=function(_0x4dbc2c){const _0x99e4a4=_0x5e9919;this[_0x99e4a4(0x2a1)](-_0x4dbc2c);},Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x42d)]=function(_0x50dd0c){const _0x1d5502=_0x5e9919,_0x3789e2=VisuMZ[_0x1d5502(0x2c3)]['Settings'][_0x1d5502(0x332)];if(!_0x50dd0c)return _0x3789e2[_0x1d5502(0x33d)];if(DataManager[_0x1d5502(0x3fb)](_0x50dd0c)){if(_0x50dd0c['id']===this[_0x1d5502(0x1ce)]())return 0x0;if(this['currentAction']()&&this['currentAction']()[_0x1d5502(0x270)]()===_0x50dd0c&&this[_0x1d5502(0x1de)]()['_guardUnleash'])return 0x0;}const _0x2c5ed7=VisuMZ[_0x1d5502(0x2c3)][_0x1d5502(0x3f3)],_0x46b085=_0x50dd0c[_0x1d5502(0x2a4)];if(_0x46b085[_0x1d5502(0x1ad)](_0x2c5ed7['BravePointCost']))return Number(RegExp['$1']);let _0x215c5d=0x0;if(DataManager['isSkill'](_0x50dd0c))_0x215c5d=_0x3789e2[_0x1d5502(0x223)];else DataManager[_0x1d5502(0x391)](_0x50dd0c)&&(_0x215c5d=_0x3789e2[_0x1d5502(0x263)]);return _0x215c5d['clamp'](0x0,Game_BattlerBase[_0x1d5502(0x24d)]);},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x26a)]=Game_BattlerBase['prototype'][_0x5e9919(0x1be)],Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x1be)]=function(_0x115d1a){const _0x335f2e=_0x5e9919;if(_0x115d1a&&SceneManager[_0x335f2e(0x1e8)]()&&BattleManager[_0x335f2e(0x37b)]()){const _0x15ab58=this[_0x335f2e(0x42d)](_0x115d1a);if(this[_0x335f2e(0x1b5)]()-_0x15ab58<this[_0x335f2e(0x1ab)]())return![];}return VisuMZ['BattleSystemBTB'][_0x335f2e(0x26a)][_0x335f2e(0x259)](this,_0x115d1a);},Game_BattlerBase['prototype'][_0x5e9919(0x3fe)]=function(_0x311e19){const _0x401029=_0x5e9919;if(!BattleManager[_0x401029(0x37b)]())return;const _0x5c7d92=this[_0x401029(0x42d)](_0x311e19);this[_0x401029(0x2ca)](_0x5c7d92);},VisuMZ[_0x5e9919(0x2c3)]['Game_Battler_useItem']=Game_Battler[_0x5e9919(0x278)]['useItem'],Game_Battler[_0x5e9919(0x278)][_0x5e9919(0x3e0)]=function(_0x2baeeb){const _0x67da3f=_0x5e9919;if(this[_0x67da3f(0x203)](_0x2baeeb)){if(_0x67da3f(0x2fb)!==_0x67da3f(0x2fb))return _0x67da3f(0x406);else{this[_0x67da3f(0x1c9)](_0x2baeeb);return;}}VisuMZ['BattleSystemBTB']['Game_Battler_useItem'][_0x67da3f(0x259)](this,_0x2baeeb),this[_0x67da3f(0x3fe)](_0x2baeeb);},Game_Battler[_0x5e9919(0x278)][_0x5e9919(0x203)]=function(_0x456e47){const _0x3719f8=_0x5e9919;if(!BattleManager[_0x3719f8(0x37b)]())return![];if(!SceneManager[_0x3719f8(0x1e8)]())return![];if(!this[_0x3719f8(0x2f2)]())return![];if(this!==BattleManager[_0x3719f8(0x1fc)])return![];if(!this[_0x3719f8(0x1de)]())return![];if(!this[_0x3719f8(0x1de)]()[_0x3719f8(0x270)]())return![];if(this['currentAction']()[_0x3719f8(0x270)]()!==_0x456e47)return![];if(this[_0x3719f8(0x1de)]()[_0x3719f8(0x3fb)]())return this['currentAction']()[_0x3719f8(0x262)]()['length']>0x0;else return this[_0x3719f8(0x1de)]()['isItem']()?this[_0x3719f8(0x1de)]()[_0x3719f8(0x3ce)]()['length']>0x0:_0x3719f8(0x2be)!==_0x3719f8(0x2be)?![]:![];},Game_Battler['prototype'][_0x5e9919(0x1c9)]=function(_0x389aed){const _0xcf7075=_0x5e9919;if(!SceneManager['isSceneBattle']())return;DataManager[_0xcf7075(0x3fb)](_0x389aed)?this['btbPaySkillFusionCosts']():_0xcf7075(0x3d4)===_0xcf7075(0x3d4)?this[_0xcf7075(0x300)]():(_0x1cabb6['BattleSystemBTB'][_0xcf7075(0x21b)]['call'](this,_0x24eed5),this['onBattleStartBTB'](_0x246456));},Game_Battler[_0x5e9919(0x278)][_0x5e9919(0x1ac)]=function(){const _0x1c3b32=_0x5e9919,_0xccb2b9=this[_0x1c3b32(0x1de)]()[_0x1c3b32(0x262)]();if(!_0xccb2b9)return;for(const _0x2d6145 of _0xccb2b9){if(!_0x2d6145)continue;if(!this[_0x1c3b32(0x1be)](_0x2d6145))return![];VisuMZ['BattleSystemBTB']['Game_Battler_useItem'][_0x1c3b32(0x259)](this,_0x2d6145),this[_0x1c3b32(0x3fe)](_0x2d6145);}return!![];},Game_Battler['prototype']['btbPayItemFusionCosts']=function(){const _0x5a807d=_0x5e9919,_0x5beb40=this[_0x5a807d(0x1de)]()[_0x5a807d(0x3ce)]();if(!_0x5beb40)return;for(const _0x46ea68 of _0x5beb40){if(!_0x46ea68)continue;if(!this[_0x5a807d(0x1be)](_0x46ea68))return![];VisuMZ['BattleSystemBTB']['Game_Battler_useItem'][_0x5a807d(0x259)](this,_0x46ea68),this['payBravePointsCost'](_0x46ea68);}return!![];},Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x310)]=function(){const _0x171fcf=_0x5e9919,_0x1d4d25=this['bravePoints']()-this[_0x171fcf(0x337)]()+this[_0x171fcf(0x346)]();return _0x1d4d25[_0x171fcf(0x3b0)](Game_BattlerBase['BTB_MIN_BRAVEPOINTS_HARD_CAP'],this[_0x171fcf(0x247)]());},Game_BattlerBase['prototype'][_0x5e9919(0x337)]=function(){const _0x54f1bd=_0x5e9919;let _0x469df5=0x0;for(const _0x451688 of this[_0x54f1bd(0x261)]){if(_0x54f1bd(0x3c6)===_0x54f1bd(0x422))_0x16d4c2[_0x54f1bd(0x2c3)][_0x54f1bd(0x1d3)][_0x54f1bd(0x259)](this),this[_0x54f1bd(0x37b)]()&&this[_0x54f1bd(0x251)]()&&!this[_0x54f1bd(0x210)]&&_0x49c4ba[_0x54f1bd(0x38d)]()&&this[_0x54f1bd(0x25c)]();else{if(!_0x451688)continue;const _0x4f0145=_0x451688[_0x54f1bd(0x270)]();_0x469df5+=this[_0x54f1bd(0x42d)](_0x4f0145);}}return _0x469df5;},VisuMZ[_0x5e9919(0x2c3)]['Game_BattlerBase_canInput']=Game_BattlerBase[_0x5e9919(0x278)]['canInput'],Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x38d)]=function(){const _0x32dca4=_0x5e9919;return BattleManager['isBTB']()&&this['bravePoints']()<0x0?![]:VisuMZ[_0x32dca4(0x2c3)][_0x32dca4(0x1bf)]['call'](this);},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x248)]=Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x1a8)],Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x1a8)]=function(){const _0x673a06=_0x5e9919;return BattleManager['isBTB']()&&this[_0x673a06(0x1db)]()>0x1?![]:VisuMZ[_0x673a06(0x2c3)][_0x673a06(0x248)][_0x673a06(0x259)](this);},Game_BattlerBase['prototype'][_0x5e9919(0x25b)]=function(){const _0x363d9f=_0x5e9919;if(this[_0x363d9f(0x339)]())return![];return this[_0x363d9f(0x1db)]()<this[_0x363d9f(0x3b8)]()&&this[_0x363d9f(0x378)]>this['minBravePoints']();},Game_BattlerBase['prototype'][_0x5e9919(0x339)]=function(){const _0x516a59=_0x5e9919,_0x5728cc=VisuMZ[_0x516a59(0x2c3)][_0x516a59(0x3f3)],_0x2acdb1=_0x5728cc[_0x516a59(0x41c)];return this[_0x516a59(0x1e6)]()[_0x516a59(0x1a1)](_0x485a07=>_0x485a07&&_0x485a07['note']['match'](_0x2acdb1));},Game_BattlerBase[_0x5e9919(0x278)]['hideBraveTrait']=function(){const _0x272137=_0x5e9919,_0x20605c=VisuMZ[_0x272137(0x2c3)]['RegExp'],_0x3687cd=_0x20605c['HideBrave'];return this[_0x272137(0x1e6)]()[_0x272137(0x1a1)](_0x4582fe=>_0x4582fe&&_0x4582fe['note'][_0x272137(0x1ad)](_0x3687cd));},Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x1b8)]=function(){const _0x586a5d=_0x5e9919;delete this[_0x586a5d(0x359)],delete this['_btbTurnOrderFaceName'],delete this[_0x586a5d(0x29e)],delete this[_0x586a5d(0x2a5)];},Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x389)]=function(){const _0x9b8de0=_0x5e9919;if(this[_0x9b8de0(0x359)]===undefined){if(_0x9b8de0(0x213)!==_0x9b8de0(0x1c7))this[_0x9b8de0(0x359)]=this[_0x9b8de0(0x1cc)]();else{_0x2100b4[_0x9b8de0(0x34a)](_0x2a8f4f,_0x36f0f7);const _0x2c628c=_0x4221fa[_0x9b8de0(0x28e)];_0x5677d1['setBattleSystemBTBTurnOrderVisible'](_0x2c628c);}}return this[_0x9b8de0(0x359)];},Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x1cc)]=function(){const _0x10a92d=_0x5e9919;return Window_BTB_TurnOrder[_0x10a92d(0x28c)]['EnemyBattlerType'];},Game_BattlerBase[_0x5e9919(0x278)]['TurnOrderBTBGraphicFaceName']=function(){const _0x1ce99d=_0x5e9919;return this[_0x1ce99d(0x1d8)]===undefined&&(this[_0x1ce99d(0x1d8)]=this[_0x1ce99d(0x456)]()),this[_0x1ce99d(0x1d8)];},Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x456)]=function(){const _0x4edc8f=_0x5e9919;return Window_BTB_TurnOrder[_0x4edc8f(0x28c)]['EnemyBattlerFaceName'];},Game_BattlerBase[_0x5e9919(0x278)]['TurnOrderBTBGraphicFaceIndex']=function(){const _0x328488=_0x5e9919;return this['_btbTurnOrderFaceIndex']===undefined&&('rZJAo'!==_0x328488(0x377)?this[_0x328488(0x29e)]=this[_0x328488(0x3ae)]():(_0x537445[_0x328488(0x2c3)][_0x328488(0x407)][_0x328488(0x259)](this,_0x1613a9),_0x59c76f[_0x328488(0x1a3)]())),this[_0x328488(0x29e)];},Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x3ae)]=function(){const _0x4e7c8d=_0x5e9919;return Window_BTB_TurnOrder[_0x4e7c8d(0x28c)][_0x4e7c8d(0x29a)];},Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x2ee)]=function(){const _0x2e1e12=_0x5e9919;return this[_0x2e1e12(0x2a5)]===undefined&&(this[_0x2e1e12(0x2a5)]=this[_0x2e1e12(0x1b6)]()),this[_0x2e1e12(0x2a5)];},Game_BattlerBase['prototype'][_0x5e9919(0x1b6)]=function(){const _0x2690c9=_0x5e9919;return Window_BTB_TurnOrder[_0x2690c9(0x28c)]['EnemyBattlerIcon'];},Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x42f)]=function(_0x4dd034){const _0x2dae21=_0x5e9919;this[_0x2dae21(0x2a5)]=_0x4dd034;},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x372)]=Game_BattlerBase['prototype'][_0x5e9919(0x44a)],Game_BattlerBase[_0x5e9919(0x278)]['hide']=function(){const _0x18d53d=_0x5e9919;VisuMZ[_0x18d53d(0x2c3)][_0x18d53d(0x372)][_0x18d53d(0x259)](this),BattleManager[_0x18d53d(0x398)]();},VisuMZ[_0x5e9919(0x2c3)]['Game_BattlerBase_appear']=Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x257)],Game_BattlerBase[_0x5e9919(0x278)][_0x5e9919(0x257)]=function(){const _0x3930ab=_0x5e9919;VisuMZ[_0x3930ab(0x2c3)][_0x3930ab(0x1f3)][_0x3930ab(0x259)](this),BattleManager[_0x3930ab(0x398)]();},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x319)]=Game_Battler['prototype'][_0x5e9919(0x1ed)],Game_Battler[_0x5e9919(0x278)][_0x5e9919(0x1ed)]=function(){const _0x509133=_0x5e9919;VisuMZ[_0x509133(0x2c3)][_0x509133(0x319)][_0x509133(0x259)](this),BattleManager[_0x509133(0x398)]();},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x3ca)]=Game_Battler[_0x5e9919(0x278)][_0x5e9919(0x3b4)],Game_Battler[_0x5e9919(0x278)][_0x5e9919(0x3b4)]=function(){const _0xb91737=_0x5e9919;return BattleManager['isBTB']()?0x1:VisuMZ[_0xb91737(0x2c3)][_0xb91737(0x3ca)][_0xb91737(0x259)](this);},VisuMZ['BattleSystemBTB'][_0x5e9919(0x21b)]=Game_Battler[_0x5e9919(0x278)]['onBattleStart'],Game_Battler['prototype'][_0x5e9919(0x409)]=function(_0x57d825){const _0x1e8f22=_0x5e9919;VisuMZ[_0x1e8f22(0x2c3)][_0x1e8f22(0x21b)]['call'](this,_0x57d825),this[_0x1e8f22(0x33b)](_0x57d825);},Game_Battler[_0x5e9919(0x278)][_0x5e9919(0x33b)]=function(_0x32fd35){const _0x5b475f=_0x5e9919;if(!BattleManager[_0x5b475f(0x37b)]())return;const _0x30b5ce=VisuMZ[_0x5b475f(0x2c3)]['Settings'][_0x5b475f(0x332)],_0x16ad22=VisuMZ[_0x5b475f(0x2c3)][_0x5b475f(0x3f3)];let _0x2e19f0=_0x32fd35?_0x30b5ce[_0x5b475f(0x39b)]:_0x30b5ce['BravePointStartNeutral'];const _0x36ff57=this[_0x5b475f(0x1e6)]();for(const _0x4c332f of _0x36ff57){if(!_0x4c332f)continue;const _0x3916da=_0x4c332f[_0x5b475f(0x2a4)];_0x3916da[_0x5b475f(0x1ad)](_0x16ad22[_0x5b475f(0x308)])&&(_0x2e19f0+=Number(RegExp['$1']));}this[_0x5b475f(0x397)](_0x2e19f0);},Game_Battler[_0x5e9919(0x278)][_0x5e9919(0x2ae)]=function(){const _0x2db76a=_0x5e9919;this[_0x2db76a(0x261)][_0x2db76a(0x41a)](new Game_Action(this));const _0x4a26fe=VisuMZ[_0x2db76a(0x2c3)][_0x2db76a(0x28c)][_0x2db76a(0x322)];if(_0x4a26fe[_0x2db76a(0x414)]){const _0x157d38=_0x2db76a(0x452),_0x3a7cb1=_0x4a26fe['%1AnimationID'[_0x2db76a(0x313)](_0x157d38)],_0x2ef51e=_0x4a26fe[_0x2db76a(0x27a)[_0x2db76a(0x313)](_0x157d38)],_0x4ae2ce=_0x4a26fe[_0x2db76a(0x401)['format'](_0x157d38)];$gameTemp['requestFauxAnimation']([this],_0x3a7cb1,_0x2ef51e,_0x4ae2ce);}},Game_Battler[_0x5e9919(0x278)][_0x5e9919(0x363)]=function(){const _0x3d4f38=_0x5e9919;if(this[_0x3d4f38(0x261)][_0x3d4f38(0x3b1)]<=0x1)return;this['_actions'][_0x3d4f38(0x3a8)]();const _0x30afe8=VisuMZ[_0x3d4f38(0x2c3)][_0x3d4f38(0x28c)][_0x3d4f38(0x322)];if(_0x30afe8[_0x3d4f38(0x2da)]){const _0x5384e1=_0x3d4f38(0x1d9),_0x4300be=_0x30afe8['%1AnimationID'[_0x3d4f38(0x313)](_0x5384e1)],_0x38321b=_0x30afe8[_0x3d4f38(0x27a)[_0x3d4f38(0x313)](_0x5384e1)],_0x2cda95=_0x30afe8[_0x3d4f38(0x401)[_0x3d4f38(0x313)](_0x5384e1)];$gameTemp[_0x3d4f38(0x35f)]([this],_0x4300be,_0x38321b,_0x2cda95);}},VisuMZ[_0x5e9919(0x2c3)]['Game_Battler_onTurnEnd']=Game_Battler[_0x5e9919(0x278)]['onTurnEnd'],Game_Battler[_0x5e9919(0x278)][_0x5e9919(0x2d7)]=function(){const _0x3a7111=_0x5e9919;VisuMZ[_0x3a7111(0x2c3)]['Game_Battler_onTurnEnd'][_0x3a7111(0x259)](this),this[_0x3a7111(0x328)]();},Game_Battler[_0x5e9919(0x278)][_0x5e9919(0x328)]=function(){const _0x54c8a8=_0x5e9919;if(!BattleManager[_0x54c8a8(0x37b)]())return;if(!$gameParty[_0x54c8a8(0x411)]())return;this[_0x54c8a8(0x211)]();},Game_Battler['prototype'][_0x5e9919(0x211)]=function(){const _0x225c66=_0x5e9919,_0x364466=VisuMZ['BattleSystemBTB'][_0x225c66(0x28c)][_0x225c66(0x332)],_0x12e62b=_0x364466['BravePointsRegenAlive'];if(_0x12e62b&&!this[_0x225c66(0x431)]())return;const _0x259e57=this['calcRegenBravePoints']();this['gainBravePoints'](_0x259e57);},Game_Battler['prototype'][_0x5e9919(0x346)]=function(){const _0x461a03=_0x5e9919,_0x50baa1=VisuMZ[_0x461a03(0x2c3)][_0x461a03(0x3f3)],_0x152ad2=VisuMZ[_0x461a03(0x2c3)]['Settings']['Mechanics'];let _0x425473=_0x152ad2[_0x461a03(0x1ca)]||0x0;const _0x2315cd=this[_0x461a03(0x1e6)]();for(const _0x5a9d36 of _0x2315cd){if(!_0x5a9d36)continue;const _0x104ab1=_0x5a9d36[_0x461a03(0x2a4)];_0x104ab1[_0x461a03(0x1ad)](_0x50baa1[_0x461a03(0x1cf)])&&(_0x461a03(0x3ab)!=='WwAOo'?this[_0x461a03(0x1dc)]():_0x425473+=Number(RegExp['$1']));}return _0x425473;},Game_Battler['prototype'][_0x5e9919(0x379)]=function(){const _0x44053f=_0x5e9919;if(!this[_0x44053f(0x459)]())return;if(this[_0x44053f(0x1db)]()<=0x1)return;if(!this['currentAction']())return;if(!this[_0x44053f(0x1de)]()[_0x44053f(0x270)]())return;const _0x3d1e44=this[_0x44053f(0x216)]();if(_0x3d1e44[_0x44053f(0x3b1)]<=0x0)return;let _0x20ed07='',_0x5a68f4=0x0;const _0x6abc0b=this['currentAction']()[_0x44053f(0x3fb)](),_0x256d53=_0x6abc0b?DataManager[_0x44053f(0x3c2)]:DataManager[_0x44053f(0x3f7)],_0xbfb24b=_0x6abc0b?DataManager[_0x44053f(0x3ef)]:DataManager[_0x44053f(0x20a)];for(const _0x1a05db of _0x3d1e44){if('OoEfZ'!==_0x44053f(0x253)){if(!_0x1a05db)continue;if(_0x256d53[_0x1a05db]&&_0x256d53[_0x1a05db]>=_0x5a68f4){if(this[_0x44053f(0x3cb)](_0x1a05db)){if('nwRey'!==_0x44053f(0x3bb))_0x20ed07=_0x1a05db,_0x5a68f4=_0x256d53[_0x1a05db];else{if(this[_0x44053f(0x400)]!==_0x3bf3fe)return![];if(!_0x39c05b[_0x44053f(0x1e8)]())return![];if(!_0x6cce83[_0x44053f(0x37b)]())return![];return _0x57f758[_0x44053f(0x2c3)][_0x44053f(0x28c)]['Window']['BraveShortcuts'];}}}_0xbfb24b[_0x1a05db]&&_0xbfb24b[_0x1a05db]>=_0x5a68f4&&(this[_0x44053f(0x3cb)](_0x1a05db)&&(_0x44053f(0x28b)!==_0x44053f(0x28b)?_0x527984+=_0x57b200(_0x591b98['$1']):(_0x20ed07=_0x1a05db,_0x5a68f4=_0x256d53[_0x1a05db])));}else _0xe84c32=_0x44053f(0x3f6);}if(_0x5a68f4<=0x0)return;this['removeActionFusionIngredients'](_0x20ed07),this['currentAction']()[_0x44053f(0x20e)](_0x20ed07);if(_0x6abc0b)this['currentAction']()[_0x44053f(0x280)](_0x5a68f4);else{if('pVJGH'===_0x44053f(0x3b5)){if(this[_0x44053f(0x294)]===_0xd6051e)return[];return this['_actionFusionRecipe'][_0x44053f(0x281)]('-')[_0x44053f(0x273)](_0x4bff4a=>_0x258e7c[_0x5147d4(_0x4bff4a)]);}else this[_0x44053f(0x1de)]()[_0x44053f(0x24b)](_0x5a68f4);}},Game_Battler[_0x5e9919(0x278)][_0x5e9919(0x459)]=function(){const _0x49428c=_0x5e9919;if(this[_0x49428c(0x22d)]())return![];const _0x54e6d8=VisuMZ['BattleSystemBTB'][_0x49428c(0x28c)]['Mechanics'];if(this['isActor']()){if(_0x54e6d8[_0x49428c(0x1f1)]===undefined)return!![];return _0x54e6d8['ActorActionFusions'];}else{if(_0x54e6d8['EnemyActionFusions']===undefined)return!![];return _0x54e6d8[_0x49428c(0x43e)];}},Game_BattlerBase['prototype']['cannotFusionNotetagBTB']=function(){const _0x191cd0=_0x5e9919,_0xd89c7c=VisuMZ['BattleSystemBTB'][_0x191cd0(0x3f3)],_0x2a7426=this[_0x191cd0(0x1e6)]();for(const _0x21f3e5 of _0x2a7426){if(!_0x21f3e5)continue;const _0x53a590=_0x21f3e5[_0x191cd0(0x2a4)];if(_0x53a590[_0x191cd0(0x1ad)](_0xd89c7c[_0x191cd0(0x39e)]))return!![];if(_0x53a590[_0x191cd0(0x1ad)](_0xd89c7c[_0x191cd0(0x21c)]))return![];}return![];},Game_Battler[_0x5e9919(0x278)][_0x5e9919(0x216)]=function(){const _0x4811bc=_0x5e9919,_0x234f0e=this[_0x4811bc(0x1de)](),_0x5eaf6a=this[_0x4811bc(0x261)],_0x3558bb=_0x5eaf6a[_0x4811bc(0x1ba)](_0x5c45c5=>this['canActionFusionWithBTB'](_0x234f0e,_0x5c45c5)),_0xfbfdd2=_0x3558bb['map'](_0x497fff=>_0x497fff['item']()['id']),_0x18294c=VisuMZ[_0x4811bc(0x2c3)][_0x4811bc(0x29f)](_0x234f0e[_0x4811bc(0x270)]()['id'],_0xfbfdd2);let _0xc33a09=String(_0x234f0e['item']()['id']);for(let _0x429b47=0x1;_0x429b47<_0x5eaf6a[_0x4811bc(0x3b1)];_0x429b47++){const _0x34f7cb=_0x5eaf6a[_0x429b47];if(this['canActionFusionWithBTB'](_0x234f0e,_0x34f7cb))'QOHFl'===_0x4811bc(0x426)?(_0xc33a09='%1-%2'[_0x4811bc(0x313)](_0xc33a09,_0x34f7cb[_0x4811bc(0x270)]()['id']),_0x18294c['push'](_0xc33a09)):this[_0x4811bc(0x3cb)](_0x3db838)&&(_0xf6085c=_0x2a792a,_0x2e7cbd=_0x39229d[_0xbd5186]);else{if('Jtjrm'!=='cOsTB')break;else{const _0x33e61c=_0x10fc12[_0x4811bc(0x28c)];return this[_0x4811bc(0x3d2)]()?_0x33e61c[_0x4811bc(0x193)]:_0x33e61c['SpriteLength'];}}}return _0x18294c[_0x4811bc(0x1ba)]((_0x4010b4,_0x495e01,_0x3956f4)=>_0x3956f4['indexOf'](_0x4010b4)===_0x495e01);},VisuMZ['BattleSystemBTB']['formFlexCombo']=function(_0x64575c,_0x4aed76){const _0x2af231=[],_0x3bec1d=function(_0x45bc9a,_0x2377de){const _0x40d1fa=_0x2368;for(var _0xbf8c87=0x0;_0xbf8c87<_0x2377de[_0x40d1fa(0x3b1)];_0xbf8c87++){_0x2af231[_0x40d1fa(0x41a)](_0x45bc9a+'-'+_0x2377de[_0xbf8c87]),_0x3bec1d(_0x45bc9a+'-'+_0x2377de[_0xbf8c87],_0x2377de[_0x40d1fa(0x32d)](_0xbf8c87+0x1));}};return _0x3bec1d(_0x64575c,_0x4aed76),_0x2af231;},Game_Battler[_0x5e9919(0x278)][_0x5e9919(0x3cc)]=function(_0x52a516,_0x164ec9){const _0x11ebf7=_0x5e9919;if(!_0x52a516||!_0x164ec9)return![];if(_0x52a516===_0x164ec9)return![];if(!_0x52a516[_0x11ebf7(0x270)]()||!_0x164ec9[_0x11ebf7(0x270)]())return![];if(_0x52a516[_0x11ebf7(0x3fb)]()!==_0x164ec9[_0x11ebf7(0x3fb)]())return![];return!![];},Game_Battler[_0x5e9919(0x278)]['canPayActionFusionCombination']=function(_0x412719){const _0xd8e5e1=_0x5e9919,_0x5b6892=this[_0xd8e5e1(0x1de)]()['isSkill'](),_0x4cf085=JsonEx[_0xd8e5e1(0x1d6)](this);_0x4cf085[_0xd8e5e1(0x3dd)]=!![],_0x4cf085['currentAction']()['setActionFusionBTB'](_0x412719);if(_0x5b6892)return _0x4cf085[_0xd8e5e1(0x1ac)]();else{const _0x29d6e8=JsonEx[_0xd8e5e1(0x1d6)]($gameParty['_items']),_0x98c5f0=JsonEx[_0xd8e5e1(0x1d6)]($gameParty['_weapons']),_0x4e9326=JsonEx[_0xd8e5e1(0x1d6)]($gameParty[_0xd8e5e1(0x44f)]);let _0x2c9f85=_0x4cf085['btbPayItemFusionCosts']();return $gameParty[_0xd8e5e1(0x209)]=_0x29d6e8,$gameParty[_0xd8e5e1(0x447)]=_0x98c5f0,$gameParty[_0xd8e5e1(0x44f)]=_0x4e9326,_0x2c9f85;}},Game_Battler[_0x5e9919(0x278)]['removeActionFusionIngredients']=function(_0x5cf4d2){const _0x5b58ba=_0x5e9919,_0x291c3a=this[_0x5b58ba(0x1de)](),_0xe597f6=_0x5cf4d2[_0x5b58ba(0x281)]('-')[_0x5b58ba(0x273)](_0x1dcc99=>Number(_0x1dcc99));_0xe597f6['shift']();const _0x334b43=this[_0x5b58ba(0x261)],_0x368260=[];for(const _0x1cb297 of _0x334b43){this[_0x5b58ba(0x3cc)](_0x291c3a,_0x1cb297)&&('mRzKp'!==_0x5b58ba(0x3aa)?_0xe597f6['includes'](_0x1cb297['item']()['id'])&&(_0x5b58ba(0x32f)===_0x5b58ba(0x35e)?this[_0x5b58ba(0x22e)]=!![]:(_0x368260[_0x5b58ba(0x41a)](_0x1cb297),_0xe597f6['splice'](_0xe597f6[_0x5b58ba(0x3d3)](_0x1cb297['item']()['id']),0x1))):(_0x3fa67d[_0x5b58ba(0x37b)]()&&this['constructor']===_0x3ac1b0?this[_0x5b58ba(0x1af)](_0x298d7d,_0x553076,_0x2375b6,_0x533000):_0xa7dff7['BattleSystemBTB']['Window_Base_drawItemNumber']['call'](this,_0xfabdf7,_0x7d2f4c,_0x5bc5ab,_0x58a70d),this[_0x5b58ba(0x382)]()));}for(const _0x59df90 of _0x368260){_0x334b43[_0x5b58ba(0x307)](_0x59df90);}},Game_Actor[_0x5e9919(0x278)][_0x5e9919(0x397)]=function(_0x37d584){const _0x507680=_0x5e9919;Game_Battler['prototype'][_0x507680(0x397)][_0x507680(0x259)](this,_0x37d584);if(!SceneManager[_0x507680(0x1e8)]())return;if(!BattleManager[_0x507680(0x351)]()[_0x507680(0x394)](this))return;BattleManager[_0x507680(0x22b)]();},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x349)]=Game_Actor[_0x5e9919(0x278)][_0x5e9919(0x315)],Game_Actor[_0x5e9919(0x278)][_0x5e9919(0x315)]=function(){const _0x20ca8d=_0x5e9919;VisuMZ[_0x20ca8d(0x2c3)][_0x20ca8d(0x349)][_0x20ca8d(0x259)](this);if(BattleManager[_0x20ca8d(0x37b)]()&&this[_0x20ca8d(0x1b5)]()<0x0){if(_0x20ca8d(0x3e2)===_0x20ca8d(0x3e2))this[_0x20ca8d(0x3c3)]();else{const _0x85ac16=_0x247479[_0x20ca8d(0x2c3)][_0x20ca8d(0x3f3)],_0x2daf70=_0x85ac16[_0x20ca8d(0x41c)];return this[_0x20ca8d(0x1e6)]()[_0x20ca8d(0x1a1)](_0x14bc1d=>_0x14bc1d&&_0x14bc1d['note']['match'](_0x2daf70));}}},Game_Actor[_0x5e9919(0x278)][_0x5e9919(0x1cc)]=function(){const _0x5f50c6=_0x5e9919,_0x2c9978=this[_0x5f50c6(0x2ea)]()['note'];if(_0x2c9978['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x5f50c6(0x406);else{if(_0x2c9978['match'](/<BTB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x5f50c6(0x338)==='FveKl')return _0x5f50c6(0x457);else{const _0x4dcfa1=this['bravePoints']()-this[_0x5f50c6(0x337)]()+this[_0x5f50c6(0x346)]();return _0x4dcfa1[_0x5f50c6(0x3b0)](_0x4139d3['BTB_MIN_BRAVEPOINTS_HARD_CAP'],this[_0x5f50c6(0x247)]());}}}return Window_BTB_TurnOrder[_0x5f50c6(0x28c)]['ActorBattlerType'];},Game_Actor[_0x5e9919(0x278)][_0x5e9919(0x410)]=function(){const _0x3dac87=_0x5e9919,_0x41a419=this[_0x3dac87(0x2ea)]()[_0x3dac87(0x2a4)];if(_0x41a419[_0x3dac87(0x1ad)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x3dac87(0x44e)]();},Game_Actor[_0x5e9919(0x278)][_0x5e9919(0x38a)]=function(){const _0x467435=_0x5e9919,_0x2e1587=this[_0x467435(0x2ea)]()[_0x467435(0x2a4)];if(_0x2e1587[_0x467435(0x1ad)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x467435(0x26d)]();},Game_Actor[_0x5e9919(0x278)][_0x5e9919(0x1b6)]=function(){const _0x5798ec=_0x5e9919,_0x1b39f4=this[_0x5798ec(0x2ea)]()[_0x5798ec(0x2a4)];if(_0x1b39f4[_0x5798ec(0x1ad)](/<BTB TURN ORDER ICON:[ ](\d+)>/i)){if('qpkpw'===_0x5798ec(0x38f))this['btbPaySkillFusionCosts']();else return Number(RegExp['$1']);}return Window_BTB_TurnOrder[_0x5798ec(0x28c)][_0x5798ec(0x215)];},Game_Actor[_0x5e9919(0x278)][_0x5e9919(0x3cc)]=function(_0x2bff67,_0x242da8){const _0x2991b3=_0x5e9919;if(!Game_Battler[_0x2991b3(0x278)][_0x2991b3(0x3cc)][_0x2991b3(0x259)](this,_0x2bff67,_0x242da8))return![];if(_0x2bff67[_0x2991b3(0x217)]()&&_0x242da8['needsSelection']()){if(_0x2bff67[_0x2991b3(0x1e9)]()!==_0x242da8[_0x2991b3(0x1e9)]())return![];if(_0x2bff67['_targetIndex']!==_0x242da8['_targetIndex'])return![];}return!![];},Game_Enemy[_0x5e9919(0x278)][_0x5e9919(0x1cc)]=function(){const _0x532f9a=_0x5e9919,_0x649a80=this[_0x532f9a(0x3f6)]()[_0x532f9a(0x2a4)];if(_0x649a80['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x532f9a(0x406);else{if(_0x649a80['match'](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x532f9a(0x457);}return Window_BTB_TurnOrder[_0x532f9a(0x28c)][_0x532f9a(0x430)];},Game_Enemy[_0x5e9919(0x278)][_0x5e9919(0x456)]=function(){const _0x132ba5=_0x5e9919,_0x4f9db7=this[_0x132ba5(0x3f6)]()[_0x132ba5(0x2a4)];if(_0x4f9db7[_0x132ba5(0x1ad)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_BTB_TurnOrder[_0x132ba5(0x28c)][_0x132ba5(0x250)];},Game_Enemy[_0x5e9919(0x278)][_0x5e9919(0x3ae)]=function(){const _0x7d856c=_0x5e9919,_0x1f418d=this[_0x7d856c(0x3f6)]()[_0x7d856c(0x2a4)];if(_0x1f418d[_0x7d856c(0x1ad)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_BTB_TurnOrder['Settings'][_0x7d856c(0x29a)];},Game_Enemy['prototype'][_0x5e9919(0x1b6)]=function(){const _0xc4d4f=_0x5e9919,_0x5996a4=this['enemy']()['note'];if(_0x5996a4[_0xc4d4f(0x1ad)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder['Settings'][_0xc4d4f(0x412)];},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x1fa)]=Game_Enemy[_0x5e9919(0x278)][_0x5e9919(0x315)],Game_Enemy[_0x5e9919(0x278)][_0x5e9919(0x315)]=function(){const _0x1bb138=_0x5e9919;VisuMZ[_0x1bb138(0x2c3)][_0x1bb138(0x1fa)][_0x1bb138(0x259)](this),this['checkActionsBTB'](),this['makeMultiActionsBTB']();},Game_Enemy[_0x5e9919(0x278)][_0x5e9919(0x2eb)]=function(){const _0x133b3a=_0x5e9919;if(!BattleManager[_0x133b3a(0x37b)]())return;if(this[_0x133b3a(0x1db)]()<=0x0)return;this[_0x133b3a(0x31d)]=![],this['bravePoints']()<0x0&&this[_0x133b3a(0x3c3)]();},Game_Enemy[_0x5e9919(0x278)][_0x5e9919(0x38c)]=function(){const _0x20a2d9=_0x5e9919;if(!BattleManager[_0x20a2d9(0x37b)]())return;if(this[_0x20a2d9(0x1db)]()<=0x0)return;const _0xd03037=this[_0x20a2d9(0x261)][0x0];if(!_0xd03037)return;const _0x38a342=_0xd03037[_0x20a2d9(0x270)]();if(!_0x38a342)return;const _0x2a87d9=VisuMZ[_0x20a2d9(0x2c3)][_0x20a2d9(0x3f3)],_0x17df66=_0x38a342[_0x20a2d9(0x2a4)];let _0x567af5=[];if(_0x17df66[_0x20a2d9(0x1ad)](_0x2a87d9[_0x20a2d9(0x25f)])){const _0x5bab4b=String(RegExp['$1'])[_0x20a2d9(0x281)](',');for(let _0x5b4161 of _0x5bab4b){if(_0x20a2d9(0x1fd)===_0x20a2d9(0x3b3))this[_0x20a2d9(0x25c)]();else{_0x5b4161=(String(_0x5b4161)||'')[_0x20a2d9(0x420)]();const _0x1b0e0e=/^\d+$/[_0x20a2d9(0x402)](_0x5b4161);if(_0x1b0e0e){if(_0x20a2d9(0x2a0)!==_0x20a2d9(0x1f4))_0x567af5['push'](Number(_0x5b4161));else{if(this[_0x20a2d9(0x37b)]())return![];return _0x53fa0c['BattleSystemBTB']['BattleManager_isTpb']['call'](this);}}else _0x20a2d9(0x2fd)!=='ZMwue'?this[_0x20a2d9(0x302)](_0x38f70a)?this['queueBraveAnimationsBTB'](_0x456e41,_0x306cd8,_0x311cea):_0x5006f6['BattleSystemBTB']['Window_BattleLog_startAction'][_0x20a2d9(0x259)](this,_0x357d62,_0xce54,_0x4ab816):_0x567af5['push'](DataManager['getSkillIdWithName'](_0x5b4161));}}}if(_0x567af5['length']<=0x0)return;while(_0x567af5['length']>this['maxBraveActions']()){if(_0x20a2d9(0x357)===_0x20a2d9(0x427))return _0x2fc5d5(_0x4efd69['$1']);else _0x567af5[_0x20a2d9(0x3a8)]();}if(_0x567af5[_0x20a2d9(0x3b1)]<=0x0)return;this[_0x20a2d9(0x3c3)]();for(const _0x5a2365 of _0x567af5){if(_0x20a2d9(0x1dd)==='KJkKr')_0x47ebb0=_0x4d6780['x']+_0xd010d7['faceWidth']+0x8;else{const _0x1e2f54=new Game_Action(this);_0x1e2f54[_0x20a2d9(0x280)](_0x5a2365),_0x1e2f54[_0x20a2d9(0x260)]=!![],this[_0x20a2d9(0x261)]['push'](_0x1e2f54);}}},Game_Enemy[_0x5e9919(0x278)][_0x5e9919(0x3de)]=function(){const _0x418d73=_0x5e9919;let _0x4ff9a3=this['numActions']();for(const _0x52c0a7 of this['_actions']){if(!_0x52c0a7)continue;_0x4ff9a3+=_0x52c0a7[_0x418d73(0x2cd)]();}return _0x4ff9a3-0x1;},VisuMZ['BattleSystemBTB'][_0x5e9919(0x449)]=Game_Unit['prototype'][_0x5e9919(0x315)],Game_Unit['prototype'][_0x5e9919(0x315)]=function(){const _0x2852bb=_0x5e9919;VisuMZ[_0x2852bb(0x2c3)][_0x2852bb(0x449)]['call'](this),BattleManager['isBTB']()&&this===$gameTroop&&SceneManager['isSceneBattle']()&&BattleManager[_0x2852bb(0x2d3)]();},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x413)]=Game_Party[_0x5e9919(0x278)][_0x5e9919(0x245)],Game_Party[_0x5e9919(0x278)]['removeActor']=function(_0x2d1a2c){const _0x32458e=_0x5e9919;VisuMZ[_0x32458e(0x2c3)][_0x32458e(0x413)][_0x32458e(0x259)](this,_0x2d1a2c),SceneManager[_0x32458e(0x1e8)]()&&BattleManager[_0x32458e(0x37b)]()&&BattleManager[_0x32458e(0x3c8)][_0x32458e(0x307)]($gameActors[_0x32458e(0x2ea)](_0x2d1a2c));},VisuMZ[_0x5e9919(0x2c3)]['Scene_Battle_onDisabledPartyCommandSelection']=Scene_Battle['prototype']['onDisabledPartyCommandSelection'],Scene_Battle[_0x5e9919(0x278)][_0x5e9919(0x3b6)]=function(){const _0x776e14=_0x5e9919;BattleManager[_0x776e14(0x37b)]()?this['selectNextCommand']():VisuMZ[_0x776e14(0x2c3)][_0x776e14(0x291)][_0x776e14(0x259)](this);},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x350)]=Scene_Battle[_0x5e9919(0x278)][_0x5e9919(0x256)],Scene_Battle[_0x5e9919(0x278)]['createActorCommandWindow']=function(){const _0x3cc36b=_0x5e9919;VisuMZ['BattleSystemBTB'][_0x3cc36b(0x350)][_0x3cc36b(0x259)](this),this[_0x3cc36b(0x1a2)]();},Scene_Battle[_0x5e9919(0x278)]['createActorCommandWindowBTB']=function(){const _0x594f2e=_0x5e9919;if(!BattleManager['isBTB']())return;const _0x45bade=this[_0x594f2e(0x3b9)];if(!_0x45bade)return;_0x45bade[_0x594f2e(0x2e8)](_0x594f2e(0x33a),this[_0x594f2e(0x44c)][_0x594f2e(0x249)](this)),_0x45bade[_0x594f2e(0x2e8)](_0x594f2e(0x2b6),this[_0x594f2e(0x299)][_0x594f2e(0x249)](this));},Scene_Battle['prototype'][_0x5e9919(0x44c)]=function(){this['performBrave']();},Scene_Battle[_0x5e9919(0x278)]['commandCancelBTB']=function(){const _0x34bf84=_0x5e9919,_0x238285=BattleManager[_0x34bf84(0x2ea)]();if(!_0x238285)this[_0x34bf84(0x361)]();else{if(_0x238285[_0x34bf84(0x1db)]()<=0x1)this[_0x34bf84(0x361)]();else _0x238285[_0x34bf84(0x1eb)]>0x0?this[_0x34bf84(0x361)]():this[_0x34bf84(0x202)]();}},Scene_Battle['prototype'][_0x5e9919(0x2ae)]=function(){const _0x51a1fb=_0x5e9919,_0x14995d=BattleManager[_0x51a1fb(0x2ea)]();if(!_0x14995d)return;_0x14995d[_0x51a1fb(0x2ae)]();const _0x1874c9=this['_actorCommandWindow'][_0x51a1fb(0x3bd)],_0x2defef=this[_0x51a1fb(0x3b9)][_0x51a1fb(0x35c)],_0x3d50bb=this[_0x51a1fb(0x3b9)]['index']();this['_actorCommandWindow'][_0x51a1fb(0x196)](_0x14995d),this['_actorCommandWindow'][_0x51a1fb(0x1ef)](_0x3d50bb),this[_0x51a1fb(0x3b9)][_0x51a1fb(0x3bd)]=_0x1874c9,this[_0x51a1fb(0x3b9)][_0x51a1fb(0x35c)]=_0x2defef;},Scene_Battle[_0x5e9919(0x278)][_0x5e9919(0x202)]=function(){const _0x417d8e=_0x5e9919,_0x2b0364=BattleManager[_0x417d8e(0x2ea)]();if(!_0x2b0364)return;_0x2b0364[_0x417d8e(0x363)]();const _0x19211b=this[_0x417d8e(0x3b9)][_0x417d8e(0x3bd)],_0x2a6608=this['_actorCommandWindow']['_scrollY'],_0x590f5d=this[_0x417d8e(0x3b9)][_0x417d8e(0x432)]();this[_0x417d8e(0x3b9)][_0x417d8e(0x196)](_0x2b0364),this[_0x417d8e(0x3b9)][_0x417d8e(0x1ef)](_0x590f5d),this[_0x417d8e(0x3b9)][_0x417d8e(0x3bd)]=_0x19211b,this[_0x417d8e(0x3b9)][_0x417d8e(0x35c)]=_0x2a6608;},VisuMZ['BattleSystemBTB'][_0x5e9919(0x21a)]=Scene_Battle[_0x5e9919(0x278)]['createAllWindows'],Scene_Battle['prototype'][_0x5e9919(0x42b)]=function(){const _0xa0c9e8=_0x5e9919;VisuMZ[_0xa0c9e8(0x2c3)][_0xa0c9e8(0x21a)][_0xa0c9e8(0x259)](this),this[_0xa0c9e8(0x440)]();},Scene_Battle['prototype']['createBTBTurnOrderWindow']=function(){const _0x516713=_0x5e9919;if(!BattleManager[_0x516713(0x37b)]())return;this['_btbTurnOrderWindow']=new Window_BTB_TurnOrder();const _0x2eb440=this['getChildIndex'](this['_windowLayer']);this['addChildAt'](this['_btbTurnOrderWindow'],_0x2eb440),this[_0x516713(0x298)](),BattleManager[_0x516713(0x34f)](!![]);},Scene_Battle[_0x5e9919(0x278)]['repositionLogWindowBTB']=function(){const _0x3d028b=_0x5e9919,_0x4fd0bb=Window_BTB_TurnOrder[_0x3d028b(0x28c)];if(_0x4fd0bb['DisplayPosition']!=='top')return;if(!_0x4fd0bb[_0x3d028b(0x451)])return;if(!this['_logWindow'])return;const _0xa04833=this['_btbTurnOrderWindow']['y']-Math[_0x3d028b(0x3d7)]((Graphics[_0x3d028b(0x22c)]-Graphics['boxHeight'])/0x2),_0x553bed=_0xa04833+this[_0x3d028b(0x425)][_0x3d028b(0x22c)];this[_0x3d028b(0x438)]['y']=_0x553bed+_0x4fd0bb[_0x3d028b(0x2c9)];};function Sprite_BTB_TurnOrder_Battler(){this['initialize'](...arguments);}function _0x2368(_0x7d6be,_0x286841){const _0x3ace7b=_0x3ace();return _0x2368=function(_0x23682b,_0x5635d4){_0x23682b=_0x23682b-0x192;let _0x51321c=_0x3ace7b[_0x23682b];return _0x51321c;},_0x2368(_0x7d6be,_0x286841);}Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)]=Object[_0x5e9919(0x458)](Sprite_Clickable[_0x5e9919(0x278)]),Sprite_BTB_TurnOrder_Battler['prototype']['constructor']=Sprite_BTB_TurnOrder_Battler,Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x1c1)]=function(_0x57a389,_0x3d4bcc){const _0x5d727a=_0x5e9919;this['initMembers'](_0x57a389,_0x3d4bcc),Sprite_Clickable[_0x5d727a(0x278)]['initialize'][_0x5d727a(0x259)](this),this['opacity']=0x0,this[_0x5d727a(0x277)](),this[_0x5d727a(0x21d)]();},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x31e)]=function(_0x529cb6,_0xa4e804){const _0x38d730=_0x5e9919;this['_unit']=_0x529cb6,this[_0x38d730(0x42c)]=_0xa4e804;const _0x472373=Window_BTB_TurnOrder[_0x38d730(0x28c)],_0x438bfe=this['isHorz'](),_0x18327a=this['defaultPosition']();this[_0x38d730(0x3e3)]=0x0,this['_positionTargetX']=_0x438bfe?_0x472373[_0x38d730(0x193)]*_0x18327a:0x0,this[_0x38d730(0x2a9)]=_0x438bfe?0x0:_0x472373[_0x38d730(0x193)]*_0x18327a,this[_0x38d730(0x2c0)]=0x0,this[_0x38d730(0x3d6)]=0xff,this[_0x38d730(0x2c4)]=![],this['_isAppeared']=![],this['_containerWidth']=0x0,this[_0x38d730(0x383)]=0x0;},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x277)]=function(){const _0x31a30f=_0x5e9919;this[_0x31a30f(0x3ac)](),this[_0x31a30f(0x342)](),this[_0x31a30f(0x311)](),this[_0x31a30f(0x264)](),this[_0x31a30f(0x38e)]();},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x3ac)]=function(){const _0x4458e7=_0x5e9919;this['x']=this[_0x4458e7(0x2e6)],this['y']=this[_0x4458e7(0x2a9)];},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x3d2)]=function(){const _0x5a3937=_0x5e9919,_0x35b817=Window_BTB_TurnOrder[_0x5a3937(0x28c)],_0x587bcf=[_0x5a3937(0x435),_0x5a3937(0x1b7)][_0x5a3937(0x394)](_0x35b817[_0x5a3937(0x3fa)]);return _0x587bcf;},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5e9919(0x37e)]=function(){const _0x115fd0=_0x5e9919,_0x9ee702=Window_BTB_TurnOrder[_0x115fd0(0x28c)];return this[_0x115fd0(0x3d2)]()?_0x9ee702['SpriteThin']:_0x9ee702[_0x115fd0(0x348)];},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x2ad)]=function(){const _0x1507c6=_0x5e9919,_0x5762fe=Window_BTB_TurnOrder[_0x1507c6(0x28c)];return this[_0x1507c6(0x3d2)]()?_0x5762fe[_0x1507c6(0x348)]:_0x5762fe[_0x1507c6(0x193)];},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x416)]=function(){const _0x1e6832=_0x5e9919;this['bitmap']=new Bitmap(0x48,0x24);const _0x519932=this[_0x1e6832(0x31c)]()?this[_0x1e6832(0x31c)]()['name']():_0x1e6832(0x43b)[_0x1e6832(0x313)](this[_0x1e6832(0x2d6)],this[_0x1e6832(0x42c)]);this[_0x1e6832(0x271)][_0x1e6832(0x3ed)](_0x519932,0x0,0x0,0x48,0x24,_0x1e6832(0x396));},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)]['createBackgroundSprite']=function(){const _0x190da2=_0x5e9919;if(!Window_BTB_TurnOrder['Settings'][_0x190da2(0x448)])return;const _0xfb529b=Window_BTB_TurnOrder[_0x190da2(0x28c)],_0x4db4da=this[_0x190da2(0x2d6)]===$gameParty?'Actor':'Enemy',_0xae325e='%1SystemBg'['format'](_0x4db4da),_0x47b32e=new Sprite();_0x47b32e[_0x190da2(0x1c0)]['x']=this[_0x190da2(0x1c0)]['x'],_0x47b32e[_0x190da2(0x1c0)]['y']=this[_0x190da2(0x1c0)]['y'];if(_0xfb529b[_0xae325e])_0x47b32e['bitmap']=ImageManager[_0x190da2(0x2bd)](_0xfb529b[_0xae325e]);else{const _0x3323a0=this[_0x190da2(0x37e)](),_0x3b43a7=this[_0x190da2(0x2ad)]();_0x47b32e['bitmap']=new Bitmap(_0x3323a0,_0x3b43a7);const _0x455111=ColorManager['getColor'](_0xfb529b[_0x190da2(0x3da)[_0x190da2(0x313)](_0x4db4da)]),_0x55f238=ColorManager[_0x190da2(0x2a3)](_0xfb529b[_0x190da2(0x2f6)[_0x190da2(0x313)](_0x4db4da)]);_0x47b32e['bitmap'][_0x190da2(0x1c8)](0x0,0x0,_0x3323a0,_0x3b43a7,_0x455111,_0x55f238,!![]);}this['_backgroundSprite']=_0x47b32e,this[_0x190da2(0x354)](this[_0x190da2(0x1b0)]);},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x311)]=function(){const _0xdec6f6=_0x5e9919,_0x579304=new Sprite();_0x579304[_0xdec6f6(0x1c0)]['x']=this[_0xdec6f6(0x1c0)]['x'],_0x579304[_0xdec6f6(0x1c0)]['y']=this[_0xdec6f6(0x1c0)]['y'],this['_graphicSprite']=_0x579304,this[_0xdec6f6(0x354)](this[_0xdec6f6(0x3e4)]),this[_0xdec6f6(0x41d)]();},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x264)]=function(){const _0x5d1ec6=_0x5e9919;if(!Window_BTB_TurnOrder['Settings'][_0x5d1ec6(0x1b4)])return;const _0xf2e6c0=Window_BTB_TurnOrder[_0x5d1ec6(0x28c)],_0x10a64c=this['_unit']===$gameParty?_0x5d1ec6(0x197):_0x5d1ec6(0x201),_0x29ea1e=_0x5d1ec6(0x2c2)[_0x5d1ec6(0x313)](_0x10a64c),_0x19f849=new Sprite();_0x19f849[_0x5d1ec6(0x1c0)]['x']=this[_0x5d1ec6(0x1c0)]['x'],_0x19f849[_0x5d1ec6(0x1c0)]['y']=this['anchor']['y'];if(_0xf2e6c0[_0x29ea1e])_0x19f849[_0x5d1ec6(0x271)]=ImageManager[_0x5d1ec6(0x2bd)](_0xf2e6c0[_0x29ea1e]);else{let _0x2c256c=this[_0x5d1ec6(0x37e)](),_0x4ec1a8=this[_0x5d1ec6(0x2ad)](),_0x3e1825=_0xf2e6c0[_0x5d1ec6(0x2e0)];_0x19f849[_0x5d1ec6(0x271)]=new Bitmap(_0x2c256c,_0x4ec1a8);const _0x1c6136='#000000',_0x4bb2ea=ColorManager[_0x5d1ec6(0x2a3)](_0xf2e6c0[_0x5d1ec6(0x1df)['format'](_0x10a64c)]);_0x19f849[_0x5d1ec6(0x271)][_0x5d1ec6(0x1fe)](0x0,0x0,_0x2c256c,_0x4ec1a8,_0x1c6136),_0x2c256c-=0x2,_0x4ec1a8-=0x2,_0x19f849[_0x5d1ec6(0x271)]['fillRect'](0x1,0x1,_0x2c256c,_0x4ec1a8,_0x4bb2ea),_0x2c256c-=_0x3e1825*0x2,_0x4ec1a8-=_0x3e1825*0x2,_0x19f849[_0x5d1ec6(0x271)][_0x5d1ec6(0x1fe)](0x1+_0x3e1825,0x1+_0x3e1825,_0x2c256c,_0x4ec1a8,_0x1c6136),_0x2c256c-=0x2,_0x4ec1a8-=0x2,_0x3e1825+=0x1,_0x19f849[_0x5d1ec6(0x271)][_0x5d1ec6(0x40f)](0x1+_0x3e1825,0x1+_0x3e1825,_0x2c256c,_0x4ec1a8);}this[_0x5d1ec6(0x1b0)]=_0x19f849,this['addChild'](this[_0x5d1ec6(0x1b0)]),this[_0x5d1ec6(0x279)]=this[_0x5d1ec6(0x1b0)][_0x5d1ec6(0x279)],this[_0x5d1ec6(0x22c)]=this[_0x5d1ec6(0x1b0)][_0x5d1ec6(0x22c)];},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x38e)]=function(){const _0x3dd4f5=_0x5e9919,_0x54fd0b=Window_BTB_TurnOrder[_0x3dd4f5(0x28c)];if(!_0x54fd0b[_0x3dd4f5(0x1e7)])return;if(this[_0x3dd4f5(0x2d6)]===$gameParty)return;const _0xfe9bcd=this['bitmapWidth'](),_0x110eb7=this['bitmapHeight'](),_0x52283c=new Sprite();_0x52283c[_0x3dd4f5(0x1c0)]['x']=this['anchor']['x'],_0x52283c[_0x3dd4f5(0x1c0)]['y']=this[_0x3dd4f5(0x1c0)]['y'],_0x52283c[_0x3dd4f5(0x271)]=new Bitmap(_0xfe9bcd,_0x110eb7),this[_0x3dd4f5(0x214)]=_0x52283c,this['addChild'](this[_0x3dd4f5(0x214)]);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5e9919(0x31c)]=function(){const _0x2fb7ff=_0x5e9919;return this[_0x2fb7ff(0x2d6)]?this['_unit']['members']()[this[_0x2fb7ff(0x42c)]]:null;},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x2cb)]=function(){const _0x325352=_0x5e9919;Sprite_Clickable['prototype'][_0x325352(0x2cb)][_0x325352(0x259)](this),this['checkPosition'](),this[_0x325352(0x208)](),this[_0x325352(0x21d)](),this[_0x325352(0x3a9)](),this[_0x325352(0x1a4)](),this[_0x325352(0x286)](),this[_0x325352(0x27e)](),this[_0x325352(0x3cf)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5e9919(0x2c7)]=function(){const _0x3f09c8=_0x5e9919,_0x5ae032=this[_0x3f09c8(0x2ff)]();if(this[_0x3f09c8(0x40e)]===_0x5ae032)return;this['_position']=_0x5ae032;this[_0x3f09c8(0x309)]<0xff&&this[_0x3f09c8(0x31c)]()&&_0x5ae032!==this[_0x3f09c8(0x36b)]()&&(_0x3f09c8(0x2dd)!=='nmHIv'?(_0x2b625c[_0x3f09c8(0x2c3)][_0x3f09c8(0x399)][_0x3f09c8(0x259)](this,_0x5d686a),this['applyBattleSystemBTBUserEffect'](_0x1ba88b)):this[_0x3f09c8(0x423)](0xff));if(_0x5ae032===this['defaultPosition']()&&this[_0x3f09c8(0x2c0)]<=0x0&&this[_0x3f09c8(0x309)]>0x0)this[_0x3f09c8(0x423)](0x0);else this['_fadeDuration']<=0x0&&this[_0x3f09c8(0x309)]<0xff&&this[_0x3f09c8(0x21d)]();this[_0x3f09c8(0x275)]();},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x433)]=function(){const _0x3a8020=_0x5e9919,_0xaf37e7=this[_0x3a8020(0x200)]();if(!_0xaf37e7)return;let _0x1ad391=![];if(this['_containerWidth']!==_0xaf37e7['width'])_0x3a8020(0x37a)!=='DtZxT'?_0x1ad391=!![]:(this[_0x3a8020(0x41a)](_0x3a8020(0x437),[_0x10b13a],_0x3a2341),_0x18d391>0x0?this[_0x3a8020(0x41a)](_0x3a8020(0x295),_0x114237):this['push']('waitForAnimation'));else this[_0x3a8020(0x383)]!==_0xaf37e7['height']&&(_0x1ad391=!![]);_0x1ad391&&this[_0x3a8020(0x275)]();},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x275)]=function(){const _0x43f0e8=_0x5e9919,_0x3f567d=Window_BTB_TurnOrder[_0x43f0e8(0x28c)],_0x330d51=this[_0x43f0e8(0x3d2)](),_0x3d7bbc=_0x3f567d[_0x43f0e8(0x1a6)],_0x4fad45=_0x3f567d['SubjectDistance'],_0x24ee5b=SceneManager[_0x43f0e8(0x404)][_0x43f0e8(0x425)];if(!_0x24ee5b)return;const _0x32560e=this[_0x43f0e8(0x2ff)]();this[_0x43f0e8(0x3e3)]=_0x3f567d[_0x43f0e8(0x45a)],this[_0x43f0e8(0x2e6)]=_0x330d51?_0x3f567d['SpriteThin']*_0x32560e:0x0,this[_0x43f0e8(0x2a9)]=_0x330d51?0x0:_0x3f567d[_0x43f0e8(0x193)]*_0x32560e;_0x32560e>0x0&&(this[_0x43f0e8(0x2e6)]+=_0x330d51?_0x4fad45:0x0,this[_0x43f0e8(0x2a9)]+=_0x330d51?0x0:_0x4fad45);if(_0x3d7bbc){if(_0x43f0e8(0x326)!==_0x43f0e8(0x20c))this['_positionTargetX']=_0x330d51?_0x24ee5b[_0x43f0e8(0x279)]-this[_0x43f0e8(0x2e6)]-_0x3f567d[_0x43f0e8(0x193)]:0x0;else{this[_0x43f0e8(0x1c9)](_0x53c7a6);return;}}else this[_0x43f0e8(0x2a9)]=_0x330d51?0x0:_0x24ee5b[_0x43f0e8(0x22c)]-this[_0x43f0e8(0x2a9)]-_0x3f567d[_0x43f0e8(0x193)];},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x208)]=function(){const _0x6895fd=_0x5e9919;if(this['_fadeDuration']>0x0)return;if(this['_positionDuration']>0x0){const _0x3be8da=this['_positionDuration'];this['x']=(this['x']*(_0x3be8da-0x1)+this[_0x6895fd(0x2e6)])/_0x3be8da,this['y']=(this['y']*(_0x3be8da-0x1)+this[_0x6895fd(0x2a9)])/_0x3be8da,this[_0x6895fd(0x3e3)]--;}if(this[_0x6895fd(0x3e3)]<=0x0){if(_0x6895fd(0x2e2)===_0x6895fd(0x1e3))this[_0x6895fd(0x294)]=_0x595325;else{this['x']=this[_0x6895fd(0x2e6)],this['y']=this['_positionTargetY'];if(this['opacity']<0xff&&!this['_isBattleOver']&&this[_0x6895fd(0x2c0)]<=0x0){const _0x558299=this[_0x6895fd(0x31c)]();if(_0x558299){if('KghsM'===_0x6895fd(0x408)){if(this['isBTB']())return!![];return _0x364da0['BattleSystemBTB']['BattleManager_isTurnBased'][_0x6895fd(0x259)](this);}else this[_0x6895fd(0x3d6)]=_0x558299['isAlive']()&&_0x558299[_0x6895fd(0x25d)]()?0xff:0x0;}}}}},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)]['defaultPosition']=function(){const _0x5c95f3=_0x5e9919,_0x28a9a8=Window_BTB_TurnOrder[_0x5c95f3(0x28c)],_0x4605c5=this[_0x5c95f3(0x3d2)]()?_0x28a9a8['MaxHorzSprites']:_0x28a9a8[_0x5c95f3(0x2ce)];return _0x4605c5+0x1;},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)]['containerWindow']=function(){const _0x54d346=_0x5e9919;return SceneManager[_0x54d346(0x404)][_0x54d346(0x425)];},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x2ff)]=function(){const _0x5659aa=_0x5e9919,_0xf92fc5=this[_0x5659aa(0x31c)]();if(!_0xf92fc5)return this['defaultPosition']();if(_0xf92fc5===BattleManager[_0x5659aa(0x1fc)])return _0x5659aa(0x29c)===_0x5659aa(0x453)?_0x11e30b['Settings'][_0x5659aa(0x250)]:0x0;if(BattleManager[_0x5659aa(0x3c8)][_0x5659aa(0x394)](_0xf92fc5)){const _0xfeb3ef=BattleManager[_0x5659aa(0x3c8)]['indexOf'](_0xf92fc5)+0x1;return _0xfeb3ef;}return this[_0x5659aa(0x36b)]();},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x423)]=function(_0x2d5eb4){const _0x758432=_0x5e9919,_0x3fe6db=Window_BTB_TurnOrder[_0x758432(0x28c)];this[_0x758432(0x2c0)]=_0x3fe6db['UpdateFrames'],this[_0x758432(0x3d6)]=_0x2d5eb4;},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)]['checkOpacity']=function(){const _0xe70a65=_0x5e9919,_0x55c49a=this[_0xe70a65(0x31c)]();if(!_0x55c49a)return;if(this[_0xe70a65(0x2c4)]===_0x55c49a['isAlive']()&&this[_0xe70a65(0x376)]===_0x55c49a[_0xe70a65(0x25d)]())return;this[_0xe70a65(0x2c4)]=_0x55c49a['isAlive'](),this[_0xe70a65(0x376)]=_0x55c49a[_0xe70a65(0x25d)]();let _0x2d0a38=this[_0xe70a65(0x2c4)]&&this[_0xe70a65(0x376)]?0xff:0x0;this['startFade'](_0x2d0a38);},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)]['updateOpacity']=function(){const _0x132d49=_0x5e9919;if(this[_0x132d49(0x2c0)]>0x0){const _0x3f884a=this['_fadeDuration'];this[_0x132d49(0x309)]=(this[_0x132d49(0x309)]*(_0x3f884a-0x1)+this[_0x132d49(0x3d6)])/_0x3f884a,this['_fadeDuration']--;if(this['_fadeDuration']<=0x0){if(_0x132d49(0x272)!=='PBMNB')return this[_0x132d49(0x41d)]();else this[_0x132d49(0x2c7)](),this['_positionDuration']=0x0,this[_0x132d49(0x208)](),this[_0x132d49(0x309)]=this['_fadeTarget'];}}if(this[_0x132d49(0x29b)])return;BattleManager['_phase']===_0x132d49(0x304)&&(_0x132d49(0x353)===_0x132d49(0x316)?this[_0x132d49(0x34f)]():(this[_0x132d49(0x29b)]=!![],this[_0x132d49(0x423)](0x0)));},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x1a4)]=function(){const _0x1f2cd5=_0x5e9919,_0x2b7359=this['battler']();if(!_0x2b7359)return;const _0x5bbb0d=Window_BTB_TurnOrder[_0x1f2cd5(0x28c)],_0x49dc70=this[_0x1f2cd5(0x2d6)]===$gameParty?'Actor':_0x1f2cd5(0x201);let _0x28c829=_0x2b7359['TurnOrderBTBGraphicType']();if(_0x2b7359[_0x1f2cd5(0x2f2)]()&&_0x28c829===_0x1f2cd5(0x3f6)){if('HIPJO'!=='GyxzB')_0x28c829=_0x1f2cd5(0x406);else return _0x246a28[_0x1f2cd5(0x28c)][_0x1f2cd5(0x412)];}else{if(_0x2b7359['isEnemy']()&&_0x28c829==='svactor'){if(_0x1f2cd5(0x36e)!==_0x1f2cd5(0x444))_0x28c829=_0x1f2cd5(0x3f6);else{const _0x1587e0=_0x5c19b1[_0x1f2cd5(0x2ea)]();if(!_0x1587e0)return;_0x1587e0[_0x1f2cd5(0x363)]();const _0xe043fd=this[_0x1f2cd5(0x3b9)][_0x1f2cd5(0x3bd)],_0x147019=this[_0x1f2cd5(0x3b9)][_0x1f2cd5(0x35c)],_0x5c7c17=this['_actorCommandWindow'][_0x1f2cd5(0x432)]();this[_0x1f2cd5(0x3b9)]['setup'](_0x1587e0),this[_0x1f2cd5(0x3b9)][_0x1f2cd5(0x1ef)](_0x5c7c17),this[_0x1f2cd5(0x3b9)]['_scrollX']=_0xe043fd,this['_actorCommandWindow'][_0x1f2cd5(0x35c)]=_0x147019;}}}if(this[_0x1f2cd5(0x23a)]!==_0x28c829)return this[_0x1f2cd5(0x41d)]();switch(this[_0x1f2cd5(0x23a)]){case'face':if(this[_0x1f2cd5(0x29d)]!==_0x2b7359[_0x1f2cd5(0x410)]())return this[_0x1f2cd5(0x41d)]();if(this['_graphicFaceIndex']!==_0x2b7359[_0x1f2cd5(0x38a)]())return this[_0x1f2cd5(0x41d)]();break;case _0x1f2cd5(0x457):if(this[_0x1f2cd5(0x1a9)]!==_0x2b7359[_0x1f2cd5(0x2ee)]())return this[_0x1f2cd5(0x41d)]();break;case _0x1f2cd5(0x3f6):if(_0x2b7359[_0x1f2cd5(0x329)]()){if(this['_graphicSv']!==_0x2b7359[_0x1f2cd5(0x258)]()){if('SrWVf'===_0x1f2cd5(0x35b))return this[_0x1f2cd5(0x41d)]();else _0xc2e2[_0x1f2cd5(0x2c3)]['Window_Base_drawItemNumber']['call'](this,_0x555c8f,_0x1f75c9,_0x5e8432,_0x2b19d4);}}else{if(this[_0x1f2cd5(0x1c5)]!==_0x2b7359[_0x1f2cd5(0x19f)]())return this[_0x1f2cd5(0x41d)]();}break;case'svactor':if(_0x2b7359[_0x1f2cd5(0x2f2)]()){if(_0x1f2cd5(0x1bb)===_0x1f2cd5(0x1bb)){if(this[_0x1f2cd5(0x3db)]!==_0x2b7359[_0x1f2cd5(0x19f)]())return this[_0x1f2cd5(0x41d)]();}else return _0x49be82[_0x1f2cd5(0x37b)]()?_0x1c8ae5[_0x1f2cd5(0x2c3)][_0x1f2cd5(0x28c)][_0x1f2cd5(0x332)]['CalcActionSpeedJS']['call'](this):_0x2fe0f3[_0x1f2cd5(0x2c3)]['Game_Action_speed']['call'](this);}else{if(this['_graphicEnemy']!==_0x2b7359['battlerName']()){if('xcUPw'==='xcUPw')return this[_0x1f2cd5(0x41d)]();else{if(this['isBTB']())return![];return _0x120aea['BattleSystemBTB'][_0x1f2cd5(0x305)]['call'](this);}}}break;}},Sprite_BTB_TurnOrder_Battler['prototype']['processUpdateGraphic']=function(){const _0x381c16=_0x5e9919,_0x2a3768=this[_0x381c16(0x31c)]();if(!_0x2a3768)return;this[_0x381c16(0x23a)]=_0x2a3768['TurnOrderBTBGraphicType']();if(_0x2a3768[_0x381c16(0x2f2)]()&&this[_0x381c16(0x23a)]==='enemy')this[_0x381c16(0x23a)]=_0x381c16(0x406);else{if(_0x2a3768[_0x381c16(0x3b2)]()&&this[_0x381c16(0x23a)]===_0x381c16(0x1e2)){if(_0x381c16(0x3a7)!==_0x381c16(0x2a8))this[_0x381c16(0x23a)]=_0x381c16(0x3f6);else{if(_0x43f8f2[_0x381c16(0x1ad)](_0x411266[_0x381c16(0x2b2)])){const _0x33cedb=_0x1a7826(_0x23b0bb['$1']);this['subject']()[_0x381c16(0x397)](_0x33cedb);}if(_0x39e6b0[_0x381c16(0x1ad)](_0x2a42c9[_0x381c16(0x2c5)])){const _0x360add=_0x35968a(_0x24f3ee['$1']);this['subject']()[_0x381c16(0x2a1)](_0x360add);}const _0x466564=_0x381c16(0x2f7),_0x43e9b1=_0x2c200e[_0x381c16(0x2c3)][_0x381c16(0x2d9)](_0xf953dc,_0x466564);if(_0x33db07[_0x381c16(0x2c3)]['JS'][_0x43e9b1]){const _0x4a252a=_0x38d117[_0x381c16(0x2c3)]['JS'][_0x43e9b1][_0x381c16(0x259)](this,this['subject'](),_0x5a640e,this['subject']()[_0x381c16(0x1b5)]());this[_0x381c16(0x41e)]()[_0x381c16(0x397)](_0x4a252a);}}}}let _0x2d387a;switch(this[_0x381c16(0x23a)]){case _0x381c16(0x406):this[_0x381c16(0x29d)]=_0x2a3768[_0x381c16(0x410)](),this['_graphicFaceIndex']=_0x2a3768['TurnOrderBTBGraphicFaceIndex'](),_0x2d387a=ImageManager[_0x381c16(0x2dc)](this[_0x381c16(0x29d)]),_0x2d387a['addLoadListener'](this[_0x381c16(0x429)][_0x381c16(0x249)](this,_0x2d387a));break;case _0x381c16(0x457):this[_0x381c16(0x1a9)]=_0x2a3768['createTurnOrderBTBGraphicIconIndex'](),_0x2d387a=ImageManager['loadSystem'](_0x381c16(0x381)),_0x2d387a[_0x381c16(0x334)](this[_0x381c16(0x318)][_0x381c16(0x249)](this,_0x2d387a));break;case _0x381c16(0x3f6):if(_0x2a3768[_0x381c16(0x329)]())this[_0x381c16(0x3db)]=_0x2a3768[_0x381c16(0x258)](),_0x2d387a=ImageManager['loadSvActor'](this['_graphicSv']),_0x2d387a[_0x381c16(0x334)](this[_0x381c16(0x369)][_0x381c16(0x249)](this,_0x2d387a));else{if($gameSystem[_0x381c16(0x35d)]())_0x381c16(0x323)!==_0x381c16(0x323)?(this[_0x381c16(0x1c5)]=_0x2733df[_0x381c16(0x19f)](),_0x417171=_0x4c3deb[_0x381c16(0x237)](this[_0x381c16(0x1c5)]),_0x3507e0[_0x381c16(0x334)](this[_0x381c16(0x1b1)][_0x381c16(0x249)](this,_0x4283c4))):(this[_0x381c16(0x1c5)]=_0x2a3768[_0x381c16(0x19f)](),_0x2d387a=ImageManager[_0x381c16(0x237)](this[_0x381c16(0x1c5)]),_0x2d387a[_0x381c16(0x334)](this[_0x381c16(0x1b1)][_0x381c16(0x249)](this,_0x2d387a)));else{if(_0x381c16(0x26e)!=='KOqGv')this[_0x381c16(0x1c5)]=_0x2a3768[_0x381c16(0x19f)](),_0x2d387a=ImageManager[_0x381c16(0x230)](this[_0x381c16(0x1c5)]),_0x2d387a['addLoadListener'](this[_0x381c16(0x1b1)][_0x381c16(0x249)](this,_0x2d387a));else{this[_0x381c16(0x344)]=new _0x446aa1(),this[_0x381c16(0x1ae)](this[_0x381c16(0x344)]),this[_0x381c16(0x2e4)]=[];for(let _0x42c838=0x0;_0x42c838<_0x5fd504['maxBattleMembers']();_0x42c838++){const _0x573171=new _0x1a00f0(_0x1ac79f,_0x42c838);this[_0x381c16(0x344)]['addChild'](_0x573171),this[_0x381c16(0x2e4)][_0x381c16(0x41a)](_0x573171);}for(let _0x62633c=0x0;_0x62633c<_0x1d2aa5[_0x381c16(0x1f5)]()[_0x381c16(0x3b1)];_0x62633c++){const _0x196cb8=new _0x7a69aa(_0x35f8a,_0x62633c);this[_0x381c16(0x344)][_0x381c16(0x354)](_0x196cb8),this[_0x381c16(0x2e4)][_0x381c16(0x41a)](_0x196cb8);}}}}break;case _0x381c16(0x1e2):this[_0x381c16(0x3db)]=_0x2a3768[_0x381c16(0x19f)](),_0x2d387a=ImageManager['loadSvActor'](this[_0x381c16(0x3db)]),_0x2d387a['addLoadListener'](this[_0x381c16(0x369)][_0x381c16(0x249)](this,_0x2d387a));break;}},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)]['changeFaceGraphicBitmap']=function(_0x237a74){const _0xaf2a3=_0x5e9919,_0x1612c1=this['_graphicFaceIndex'],_0x23b5e0=this[_0xaf2a3(0x37e)](),_0x3717bf=this['bitmapHeight'](),_0x41e79c=Math[_0xaf2a3(0x415)](_0x23b5e0,_0x3717bf);this[_0xaf2a3(0x3e4)]['bitmap']=new Bitmap(_0x23b5e0,_0x3717bf);const _0x503cff=this[_0xaf2a3(0x3e4)][_0xaf2a3(0x271)],_0x41fd3f=ImageManager['faceWidth'],_0xdbd538=ImageManager[_0xaf2a3(0x3c0)],_0x5884f8=_0x41e79c/Math[_0xaf2a3(0x415)](_0x41fd3f,_0xdbd538),_0x138c05=ImageManager[_0xaf2a3(0x40d)],_0x57bc0d=ImageManager['faceHeight'],_0x1a3059=_0x1612c1%0x4*_0x41fd3f+(_0x41fd3f-_0x138c05)/0x2,_0x2b3d33=Math[_0xaf2a3(0x341)](_0x1612c1/0x4)*_0xdbd538+(_0xdbd538-_0x57bc0d)/0x2,_0x5d0d6d=(_0x23b5e0-_0x41fd3f*_0x5884f8)/0x2,_0x4fdaf2=(_0x3717bf-_0xdbd538*_0x5884f8)/0x2;_0x503cff[_0xaf2a3(0x355)](_0x237a74,_0x1a3059,_0x2b3d33,_0x138c05,_0x57bc0d,_0x5d0d6d,_0x4fdaf2,_0x41e79c,_0x41e79c);},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x318)]=function(_0x3c04b3){const _0x4377ad=_0x5e9919,_0x230fb1=this[_0x4377ad(0x1a9)],_0x1cbf24=this['bitmapWidth'](),_0x57626a=this['bitmapHeight']();this[_0x4377ad(0x3e4)][_0x4377ad(0x271)]=new Bitmap(_0x1cbf24,_0x57626a);const _0xe193f0=this[_0x4377ad(0x3e4)][_0x4377ad(0x271)],_0x2ba2a8=ImageManager[_0x4377ad(0x335)],_0x3aaee1=ImageManager[_0x4377ad(0x38b)],_0x1c5679=Math[_0x4377ad(0x19e)](_0x2ba2a8,_0x3aaee1,_0x1cbf24,_0x57626a),_0x5aec70=_0x230fb1%0x10*_0x2ba2a8,_0x215f2b=Math[_0x4377ad(0x341)](_0x230fb1/0x10)*_0x3aaee1,_0x117b0e=Math['floor'](Math[_0x4377ad(0x415)](_0x1cbf24-_0x1c5679,0x0)/0x2),_0x109a46=Math[_0x4377ad(0x341)](Math[_0x4377ad(0x415)](_0x57626a-_0x1c5679,0x0)/0x2);_0xe193f0[_0x4377ad(0x355)](_0x3c04b3,_0x5aec70,_0x215f2b,_0x2ba2a8,_0x3aaee1,_0x117b0e,_0x109a46,_0x1c5679,_0x1c5679);},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x369)]=function(_0x6a2d73){const _0x211dba=_0x5e9919,_0x4b44d4=this['bitmapWidth'](),_0x35e8f9=this[_0x211dba(0x2ad)](),_0x4b3502=Math[_0x211dba(0x19e)](_0x4b44d4,_0x35e8f9);this[_0x211dba(0x3e4)][_0x211dba(0x271)]=new Bitmap(_0x4b44d4,_0x35e8f9);const _0x1bfdd0=this[_0x211dba(0x3e4)][_0x211dba(0x271)],_0xb90c9a=this[_0x211dba(0x3db)][_0x211dba(0x1ad)](/\$/i),_0x1ba051=_0xb90c9a?0x1:ImageManager['svActorHorzCells'],_0x4afa87=_0xb90c9a?0x1:ImageManager[_0x211dba(0x3fc)],_0x4b7d64=_0x6a2d73[_0x211dba(0x279)]/_0x1ba051,_0x546583=_0x6a2d73['height']/_0x4afa87,_0x3a7e71=Math[_0x211dba(0x19e)](0x1,_0x4b3502/_0x4b7d64,_0x4b3502/_0x546583),_0x3213ff=_0x4b7d64*_0x3a7e71,_0x2cbfac=_0x546583*_0x3a7e71,_0x275968=Math[_0x211dba(0x3d7)]((_0x4b44d4-_0x3213ff)/0x2),_0x992ced=Math[_0x211dba(0x3d7)]((_0x35e8f9-_0x2cbfac)/0x2);_0x1bfdd0[_0x211dba(0x355)](_0x6a2d73,0x0,0x0,_0x4b7d64,_0x546583,_0x275968,_0x992ced,_0x3213ff,_0x2cbfac);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5e9919(0x1b1)]=function(_0x2d4846){const _0x9ecda6=_0x5e9919,_0x2e385e=Window_BTB_TurnOrder[_0x9ecda6(0x28c)],_0x1d0526=this[_0x9ecda6(0x37e)](),_0x273dda=this[_0x9ecda6(0x2ad)](),_0x47384b=Math[_0x9ecda6(0x19e)](_0x1d0526,_0x273dda);this[_0x9ecda6(0x3e4)][_0x9ecda6(0x271)]=new Bitmap(_0x1d0526,_0x273dda);const _0x5a8ac6=this['_graphicSprite'][_0x9ecda6(0x271)],_0x24136f=Math[_0x9ecda6(0x19e)](0x1,_0x47384b/_0x2d4846['width'],_0x47384b/_0x2d4846['height']),_0x458f13=_0x2d4846[_0x9ecda6(0x279)]*_0x24136f,_0x4d281c=_0x2d4846[_0x9ecda6(0x22c)]*_0x24136f,_0x189099=Math[_0x9ecda6(0x3d7)]((_0x1d0526-_0x458f13)/0x2),_0x44a69a=Math[_0x9ecda6(0x3d7)]((_0x273dda-_0x4d281c)/0x2);_0x5a8ac6[_0x9ecda6(0x355)](_0x2d4846,0x0,0x0,_0x2d4846[_0x9ecda6(0x279)],_0x2d4846[_0x9ecda6(0x22c)],_0x189099,_0x44a69a,_0x458f13,_0x4d281c);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x5e9919(0x286)]=function(){const _0x48e215=_0x5e9919,_0x10e563=this[_0x48e215(0x31c)]();if(!_0x10e563)return;if(!_0x10e563[_0x48e215(0x3b2)]())return;if(this['_graphicHue']===_0x10e563[_0x48e215(0x1a5)]())return;this['_graphicHue']=_0x10e563[_0x48e215(0x1a5)]();if(_0x10e563[_0x48e215(0x329)]())this[_0x48e215(0x331)]=0x0;this[_0x48e215(0x3e4)][_0x48e215(0x385)](this[_0x48e215(0x331)]);},Sprite_BTB_TurnOrder_Battler['prototype']['updateLetter']=function(){const _0x1ae6d7=_0x5e9919;if(!this['_letterSprite'])return;const _0x401fa1=this['battler']();if(!_0x401fa1)return;if(this[_0x1ae6d7(0x30c)]===_0x401fa1[_0x1ae6d7(0x30c)]&&this['_plural']===_0x401fa1[_0x1ae6d7(0x2ba)])return;this[_0x1ae6d7(0x30c)]=_0x401fa1[_0x1ae6d7(0x30c)],this[_0x1ae6d7(0x2ba)]=_0x401fa1[_0x1ae6d7(0x2ba)];const _0x2f78c2=Window_BTB_TurnOrder[_0x1ae6d7(0x28c)],_0x1182a8=this[_0x1ae6d7(0x3d2)](),_0x405e49=this[_0x1ae6d7(0x37e)](),_0x9b3169=this['bitmapHeight'](),_0xaaa9c7=this['_letterSprite'][_0x1ae6d7(0x271)];_0xaaa9c7[_0x1ae6d7(0x1b2)]();if(!this[_0x1ae6d7(0x2ba)])return;_0xaaa9c7[_0x1ae6d7(0x1e1)]=_0x2f78c2[_0x1ae6d7(0x1da)]||$gameSystem[_0x1ae6d7(0x32c)](),_0xaaa9c7[_0x1ae6d7(0x19c)]=_0x2f78c2[_0x1ae6d7(0x37c)]||0x10,_0x1182a8?_0xaaa9c7[_0x1ae6d7(0x3ed)](this[_0x1ae6d7(0x30c)]['trim'](),0x0,_0x9b3169/0x2,_0x405e49,_0x9b3169/0x2,_0x1ae6d7(0x396)):_0xaaa9c7[_0x1ae6d7(0x3ed)](this[_0x1ae6d7(0x30c)][_0x1ae6d7(0x420)](),0x0,0x2,_0x405e49-0x8,_0x9b3169-0x4,_0x1ae6d7(0x2c1));},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x3cf)]=function(){const _0x4de8c0=_0x5e9919,_0x44cc57=this['battler']();if(!_0x44cc57)return;const _0x4af296=_0x44cc57[_0x4de8c0(0x31c)]();if(!_0x4af296)return;const _0x2d099d=_0x4af296[_0x4de8c0(0x360)]();if(!_0x2d099d)return;this[_0x4de8c0(0x343)](_0x2d099d[_0x4de8c0(0x37f)]);},Sprite_BTB_TurnOrder_Battler[_0x5e9919(0x278)][_0x5e9919(0x3f9)]=function(){const _0x20aebd=_0x5e9919;return this[_0x20aebd(0x31c)]();},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x3a4)]=Window_Base[_0x5e9919(0x278)][_0x5e9919(0x3ad)],Window_Base[_0x5e9919(0x278)][_0x5e9919(0x3ad)]=function(_0x28beb6,_0xb283e3,_0x4ba3f6){const _0x138dd2=_0x5e9919;return _0x4ba3f6=VisuMZ[_0x138dd2(0x2c3)][_0x138dd2(0x3a4)]['call'](this,_0x28beb6,_0xb283e3,_0x4ba3f6),_0x4ba3f6=this[_0x138dd2(0x366)](_0x28beb6,_0xb283e3,_0x4ba3f6),_0x4ba3f6;},VisuMZ[_0x5e9919(0x2c3)]['Window_Base_drawItemNumber']=Window_Base['prototype'][_0x5e9919(0x23e)],Window_Base[_0x5e9919(0x278)][_0x5e9919(0x23e)]=function(_0x45a481,_0x457b9e,_0x4e0f54,_0x300a4d){const _0x254eba=_0x5e9919;if(BattleManager['isBTB']()&&this[_0x254eba(0x400)]===Window_BattleItem){if(_0x254eba(0x2ac)==='DdpFd'){const _0x24eecd=this[_0x254eba(0x31c)]();if(!_0x24eecd)return this['defaultPosition']();if(_0x24eecd===_0x2532e3['_subject'])return 0x0;if(_0x27e0f6[_0x254eba(0x3c8)]['includes'](_0x24eecd)){const _0x36a35c=_0x451ade[_0x254eba(0x3c8)][_0x254eba(0x3d3)](_0x24eecd)+0x1;return _0x36a35c;}return this['defaultPosition']();}else this[_0x254eba(0x1af)](_0x45a481,_0x457b9e,_0x4e0f54,_0x300a4d);}else VisuMZ['BattleSystemBTB'][_0x254eba(0x1c2)][_0x254eba(0x259)](this,_0x45a481,_0x457b9e,_0x4e0f54,_0x300a4d);this[_0x254eba(0x382)]();},Window_Base[_0x5e9919(0x278)][_0x5e9919(0x1af)]=function(_0x1dad65,_0x1eb806,_0x53c4ab,_0x24ece5){const _0x1f0edc=_0x5e9919,_0x7dd943=VisuMZ['BattleSystemBTB'][_0x1f0edc(0x28c)][_0x1f0edc(0x450)],_0x54122b=BattleManager['_actor']||$gameParty[_0x1f0edc(0x1f5)]()[0x0],_0x2d39f7=this[_0x1f0edc(0x366)](_0x54122b,_0x1dad65,''),_0x1c93ac=this[_0x1f0edc(0x417)](_0x2d39f7)[_0x1f0edc(0x279)],_0x3f3e0b=_0x7dd943[_0x1f0edc(0x21f)];let _0x19b1d9=_0x1eb806+_0x24ece5-_0x1c93ac;if(_0x2d39f7==='')_0x1f0edc(0x238)==='rBxHR'?this[_0x1f0edc(0x2a5)]=_0x52b0aa:VisuMZ[_0x1f0edc(0x2c3)]['Window_Base_drawItemNumber'][_0x1f0edc(0x259)](this,_0x1dad65,_0x1eb806,_0x53c4ab,_0x24ece5);else{if(this['isDrawItemNumber'](_0x1dad65)){if('lXUFc'!==_0x1f0edc(0x28f)){this[_0x1f0edc(0x382)]();const _0x3f72c3=VisuMZ[_0x1f0edc(0x229)][_0x1f0edc(0x28c)][_0x1f0edc(0x1c4)];this[_0x1f0edc(0x418)]['fontSize']=_0x3f72c3[_0x1f0edc(0x441)];if(_0x3f3e0b){const _0x4f3c45=_0x3f72c3[_0x1f0edc(0x227)],_0x540a93=_0x4f3c45[_0x1f0edc(0x313)]($gameParty[_0x1f0edc(0x3f4)](_0x1dad65)),_0x55cbd8=this[_0x1f0edc(0x289)](_0x540a93+this[_0x1f0edc(0x1d4)]());_0x19b1d9-=_0x55cbd8;}else'GazXi'==='KyxdG'?(_0x2f9357[_0x1f0edc(0x2c3)][_0x1f0edc(0x1fa)][_0x1f0edc(0x259)](this),this['checkActionsBTB'](),this['makeMultiActionsBTB']()):_0x24ece5-=this['textWidth'](this['skillCostSeparator']())+_0x1c93ac;VisuMZ[_0x1f0edc(0x2c3)]['Window_Base_drawItemNumber'][_0x1f0edc(0x259)](this,_0x1dad65,_0x1eb806,_0x53c4ab,_0x24ece5);}else{const _0x5b9eec=this[_0x1f0edc(0x3a1)],_0x3caee2=this[_0x1f0edc(0x37e)](),_0x835d38=this[_0x1f0edc(0x2ad)](),_0xcced19=_0x586b9e[_0x1f0edc(0x415)](_0x3caee2,_0x835d38);this['_graphicSprite'][_0x1f0edc(0x271)]=new _0x3c5e7c(_0x3caee2,_0x835d38);const _0x278278=this[_0x1f0edc(0x3e4)][_0x1f0edc(0x271)],_0xdbd0a4=_0x3640b0[_0x1f0edc(0x40d)],_0x35ae42=_0x9169f1[_0x1f0edc(0x3c0)],_0x47ac46=_0xcced19/_0xe12470[_0x1f0edc(0x415)](_0xdbd0a4,_0x35ae42),_0x460352=_0x40c581[_0x1f0edc(0x40d)],_0x2c2e62=_0x1ad2d3[_0x1f0edc(0x3c0)],_0x5d07e5=_0x5b9eec%0x4*_0xdbd0a4+(_0xdbd0a4-_0x460352)/0x2,_0x3a77f6=_0x3aba50[_0x1f0edc(0x341)](_0x5b9eec/0x4)*_0x35ae42+(_0x35ae42-_0x2c2e62)/0x2,_0x5e2b2c=(_0x3caee2-_0xdbd0a4*_0x47ac46)/0x2,_0x59bf5c=(_0x835d38-_0x35ae42*_0x47ac46)/0x2;_0x278278[_0x1f0edc(0x355)](_0x42edc8,_0x5d07e5,_0x3a77f6,_0x460352,_0x2c2e62,_0x5e2b2c,_0x59bf5c,_0xcced19,_0xcced19);}}}this['drawTextEx'](_0x2d39f7,_0x19b1d9,_0x53c4ab);},Window_Base[_0x5e9919(0x278)][_0x5e9919(0x366)]=function(_0x422dc7,_0x7bb7c0,_0x524428){const _0x51f5a0=_0x5e9919;if(!BattleManager[_0x51f5a0(0x37b)]())return _0x524428;if(!_0x422dc7)return _0x524428;if(!_0x7bb7c0)return _0x524428;if(_0x7bb7c0[_0x51f5a0(0x2a4)][_0x51f5a0(0x1ad)](VisuMZ['BattleSystemBTB'][_0x51f5a0(0x3f3)][_0x51f5a0(0x419)]))return _0x524428;let _0x32884f=_0x422dc7[_0x51f5a0(0x42d)](_0x7bb7c0);const _0x2b3371=VisuMZ[_0x51f5a0(0x2c3)][_0x51f5a0(0x28c)][_0x51f5a0(0x450)],_0x42866e=_0x2b3371[_0x51f5a0(0x21f)],_0x1dd1d=_0x2b3371[_0x51f5a0(0x199)],_0x30942a=_0x2b3371[_0x51f5a0(0x3d8)],_0x4af5a1=_0x2b3371['ReduceShownBPCost']||0x0,_0xc62939=_0x2b3371[_0x51f5a0(0x268)],_0x3f1ddb=_0x2b3371['Show_1_BP_Cost'];if(DataManager[_0x51f5a0(0x3fb)](_0x7bb7c0)&&this[_0x51f5a0(0x400)]===Window_ActorCommand){if(_0x51f5a0(0x1bc)!=='dfUzH')this['initMembers'](_0x466415,_0x332782),_0x2787a1['prototype'][_0x51f5a0(0x1c1)][_0x51f5a0(0x259)](this),this['opacity']=0x0,this[_0x51f5a0(0x277)](),this[_0x51f5a0(0x21d)]();else{if(!_0x1dd1d&&_0x7bb7c0['id']===_0x422dc7['attackSkillId']())return _0x524428;if(!_0x30942a&&_0x7bb7c0['id']===_0x422dc7['guardSkillId']())return _0x524428;}}_0x32884f-=_0x4af5a1;if(_0x32884f<0x0)return _0x524428;if(!_0xc62939&&_0x32884f===0x0)return _0x524428;if(!_0x3f1ddb&&_0x32884f===0x1)return _0x524428;const _0x45f5ab=_0x51f5a0(0x1ee)[_0x51f5a0(0x313)](ImageManager['btbBravePointsIcon']),_0x348c74=TextManager['btbBravePointsAbbr'];let _0x5d9dca=TextManager['btbCostFormat'][_0x51f5a0(0x313)](_0x32884f,_0x348c74,_0x45f5ab);if(_0x524428==='')_0x524428+=_0x5d9dca;else _0x42866e?_0x51f5a0(0x205)!==_0x51f5a0(0x32b)?_0x524428=_0x5d9dca+this['skillCostSeparator']()+_0x524428:_0x2a7c6c=_0x2839de+this['skillCostSeparator']()+_0x24cf9c:_0x51f5a0(0x33e)!==_0x51f5a0(0x2af)?_0x524428=_0x524428+this[_0x51f5a0(0x1d4)]()+_0x5d9dca:this['padding']=0x0;return _0x524428;},Window_Selectable['prototype'][_0x5e9919(0x3af)]=function(){return![];},VisuMZ['BattleSystemBTB']['Window_Selectable_select']=Window_Selectable[_0x5e9919(0x278)]['select'],Window_Selectable[_0x5e9919(0x278)][_0x5e9919(0x1ef)]=function(_0x59feb3){const _0x1266d5=_0x5e9919;VisuMZ[_0x1266d5(0x2c3)][_0x1266d5(0x370)][_0x1266d5(0x259)](this,_0x59feb3);if(this[_0x1266d5(0x3af)]()&&this['active']){if('ZfApM'===_0x1266d5(0x44b))return this['battler']();else this[_0x1266d5(0x30a)]();}},Window_Selectable[_0x5e9919(0x278)][_0x5e9919(0x30a)]=function(){const _0x23ed16=_0x5e9919;BattleManager[_0x23ed16(0x1a3)]();},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x31b)]=Window_Help['prototype'][_0x5e9919(0x24b)],Window_Help['prototype'][_0x5e9919(0x24b)]=function(_0x11f9ac){const _0x316ca5=_0x5e9919;if(BattleManager[_0x316ca5(0x37b)]()&&_0x11f9ac&&_0x11f9ac[_0x316ca5(0x2a4)]&&_0x11f9ac[_0x316ca5(0x2a4)][_0x316ca5(0x1ad)](VisuMZ[_0x316ca5(0x2c3)]['RegExp'][_0x316ca5(0x3a5)])){if('zgNbX'===_0x316ca5(0x43d)){if(_0x348f38['id']===this[_0x316ca5(0x1ce)]())return 0x0;if(this['currentAction']()&&this[_0x316ca5(0x1de)]()[_0x316ca5(0x270)]()===_0x4b5b3a&&this[_0x316ca5(0x1de)]()[_0x316ca5(0x374)])return 0x0;}else this['setText'](String(RegExp['$1']));}else VisuMZ[_0x316ca5(0x2c3)][_0x316ca5(0x31b)][_0x316ca5(0x259)](this,_0x11f9ac);},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x3e8)]=Window_BattleLog[_0x5e9919(0x278)][_0x5e9919(0x234)],Window_BattleLog[_0x5e9919(0x278)][_0x5e9919(0x234)]=function(_0x588b08,_0x2b0dd7,_0x32bc39){const _0x4bb33c=_0x5e9919;this[_0x4bb33c(0x302)](_0x588b08)?this['queueBraveAnimationsBTB'](_0x588b08,_0x2b0dd7,_0x32bc39):VisuMZ[_0x4bb33c(0x2c3)][_0x4bb33c(0x3e8)][_0x4bb33c(0x259)](this,_0x588b08,_0x2b0dd7,_0x32bc39);},Window_BattleLog[_0x5e9919(0x278)][_0x5e9919(0x3c7)]=function(_0x267015,_0x3df0ac,_0x2c9490){const _0x3ada25=_0x5e9919;VisuMZ[_0x3ada25(0x2c3)]['Window_BattleLog_startAction']['call'](this,_0x267015,_0x3df0ac,_0x2c9490);},Window_BattleLog['prototype'][_0x5e9919(0x302)]=function(_0x5ada08){const _0x263181=_0x5e9919;if(!BattleManager[_0x263181(0x37b)]())return![];if(!_0x5ada08)return![];if(!_0x5ada08[_0x263181(0x3b2)]())return![];if(_0x5ada08[_0x263181(0x31d)])return![];const _0x4e5c34=VisuMZ[_0x263181(0x2c3)][_0x263181(0x28c)][_0x263181(0x322)];if(!_0x4e5c34[_0x263181(0x222)])return![];if(_0x4e5c34['BraveAnimationID']<=0x0)return![];return VisuMZ['BattleSystemBTB'][_0x263181(0x28c)]['BraveAnimation'][_0x263181(0x222)];},Window_BattleLog[_0x5e9919(0x278)][_0x5e9919(0x373)]=function(_0x2dcc70,_0x396086,_0x58f75c){const _0x59b99e=_0x5e9919;_0x2dcc70['_braveStartupAnimation']=!![];let _0x95b6dc=_0x2dcc70[_0x59b99e(0x3de)]();const _0x29d046=VisuMZ[_0x59b99e(0x2c3)][_0x59b99e(0x28c)][_0x59b99e(0x322)],_0x4723f7=_0x29d046[_0x59b99e(0x414)],_0x182a97=_0x29d046[_0x59b99e(0x2fa)];while(_0x95b6dc--){this['push'](_0x59b99e(0x437),[_0x2dcc70],_0x4723f7),_0x95b6dc>0x0?_0x59b99e(0x301)!==_0x59b99e(0x301)?this[_0x59b99e(0x29e)]=this[_0x59b99e(0x3ae)]():this[_0x59b99e(0x41a)](_0x59b99e(0x295),_0x182a97):this['push'](_0x59b99e(0x36d));}this[_0x59b99e(0x41a)]('startActionBTB',_0x2dcc70,_0x396086,_0x58f75c);},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x3bf)]=Window_ActorCommand['prototype'][_0x5e9919(0x358)],Window_ActorCommand[_0x5e9919(0x278)]['addGuardCommand']=function(){const _0x1392a7=_0x5e9919;this[_0x1392a7(0x2d5)](),VisuMZ['BattleSystemBTB'][_0x1392a7(0x3bf)][_0x1392a7(0x259)](this);},Window_ActorCommand[_0x5e9919(0x278)][_0x5e9919(0x2d5)]=function(){const _0x232d5c=_0x5e9919;if(!this[_0x232d5c(0x3ba)]())return;const _0x3e593e=this[_0x232d5c(0x3ff)](),_0x374044=TextManager[_0x232d5c(0x287)],_0x30f502=ImageManager[_0x232d5c(0x2f5)],_0x2521a1=_0x3e593e===_0x232d5c(0x192)?_0x374044:_0x232d5c(0x2f0)[_0x232d5c(0x313)](_0x30f502,_0x374044);this[_0x232d5c(0x387)](_0x2521a1,'brave',this[_0x232d5c(0x42e)][_0x232d5c(0x25b)]()),BattleManager[_0x232d5c(0x22b)]();},Window_ActorCommand['prototype']['canAddBraveCommand']=function(){const _0x294eb4=_0x5e9919;if(!BattleManager[_0x294eb4(0x37b)]())return![];if(!VisuMZ[_0x294eb4(0x2c3)]['Settings'][_0x294eb4(0x23d)]['ShowCommand'])return![];if(this[_0x294eb4(0x42e)]&&this['_actor'][_0x294eb4(0x36f)]())return![];return!![];},VisuMZ[_0x5e9919(0x2c3)]['Window_Selectable_cursorPagedown']=Window_Selectable[_0x5e9919(0x278)][_0x5e9919(0x41b)],Window_Selectable[_0x5e9919(0x278)][_0x5e9919(0x41b)]=function(){const _0x3c4a20=_0x5e9919;if(this['isUsePageUpDnShortcutBTB']()){if('HlvGl'==='HlvGl')this[_0x3c4a20(0x42e)]&&!this[_0x3c4a20(0x42e)][_0x3c4a20(0x36f)]()&&this['_actor'][_0x3c4a20(0x25b)]()&&SceneManager[_0x3c4a20(0x404)][_0x3c4a20(0x2ae)]();else{_0x67c502[_0x3c4a20(0x278)][_0x3c4a20(0x397)][_0x3c4a20(0x259)](this,_0x316bae);if(!_0x2b700e[_0x3c4a20(0x1e8)]())return;if(!_0x2bbe2f[_0x3c4a20(0x351)]()[_0x3c4a20(0x394)](this))return;_0x25c475[_0x3c4a20(0x22b)]();}}else VisuMZ[_0x3c4a20(0x2c3)][_0x3c4a20(0x19b)]['call'](this);},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x20b)]=Window_Selectable['prototype'][_0x5e9919(0x22a)],Window_Selectable[_0x5e9919(0x278)]['cursorPageup']=function(){const _0x340051=_0x5e9919;if(this[_0x340051(0x2e9)]()){if(this[_0x340051(0x42e)]&&!this[_0x340051(0x42e)][_0x340051(0x36f)]()&&this[_0x340051(0x42e)][_0x340051(0x1db)]()>0x1){if(_0x340051(0x206)===_0x340051(0x321)){if(!_0x12ff02[_0x340051(0x37b)]())return![];if(!_0x50837b[_0x340051(0x1e8)]())return![];if(!this[_0x340051(0x2f2)]())return![];if(this!==_0x58e2d4['_subject'])return![];if(!this['currentAction']())return![];if(!this[_0x340051(0x1de)]()[_0x340051(0x270)]())return![];if(this[_0x340051(0x1de)]()[_0x340051(0x270)]()!==_0x182476)return![];if(this['currentAction']()[_0x340051(0x3fb)]())return this[_0x340051(0x1de)]()[_0x340051(0x262)]()[_0x340051(0x3b1)]>0x0;else return this[_0x340051(0x1de)]()[_0x340051(0x391)]()?this[_0x340051(0x1de)]()['getActionFusionRecipeItems']()[_0x340051(0x3b1)]>0x0:![];}else SceneManager[_0x340051(0x404)]['reduceBrave']();}}else{if(_0x340051(0x225)!==_0x340051(0x2b8))VisuMZ[_0x340051(0x2c3)][_0x340051(0x20b)][_0x340051(0x259)](this);else return _0x3e0926(_0x30a0b6['$2']);}},Window_Selectable[_0x5e9919(0x278)][_0x5e9919(0x2e9)]=function(){const _0x130e9d=_0x5e9919;if(this[_0x130e9d(0x400)]!==Window_ActorCommand)return![];if(!SceneManager[_0x130e9d(0x1e8)]())return![];if(!BattleManager[_0x130e9d(0x37b)]())return![];return VisuMZ['BattleSystemBTB'][_0x130e9d(0x28c)][_0x130e9d(0x23d)]['BraveShortcuts'];},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x1c3)]=Window_ActorCommand['prototype']['makeCommandList'],Window_ActorCommand[_0x5e9919(0x278)][_0x5e9919(0x424)]=function(){const _0xd05a66=_0x5e9919;VisuMZ[_0xd05a66(0x2c3)][_0xd05a66(0x1c3)][_0xd05a66(0x259)](this),this[_0xd05a66(0x20f)]();},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x43f)]=Window_Base[_0x5e9919(0x278)]['close'],Window_Base[_0x5e9919(0x278)]['close']=function(){const _0x117bc4=_0x5e9919;VisuMZ[_0x117bc4(0x2c3)]['Window_Base_close'][_0x117bc4(0x259)](this),SceneManager[_0x117bc4(0x1e8)]()&&this['destroyBTBActionCounters']&&(_0x117bc4(0x3e6)===_0x117bc4(0x239)?(this[_0x117bc4(0x3ac)](),this[_0x117bc4(0x342)](),this[_0x117bc4(0x311)](),this[_0x117bc4(0x264)](),this['createLetterSprite']()):this[_0x117bc4(0x1aa)]());},Window_ActorCommand['prototype'][_0x5e9919(0x1aa)]=function(){const _0x320a53=_0x5e9919;if(!this[_0x320a53(0x3a6)])return;if(this[_0x320a53(0x3a6)]['bitmap']){if(_0x320a53(0x306)===_0x320a53(0x212)){const _0x2bbef0=this[_0x320a53(0x2ea)]()['note'];if(_0x2bbef0[_0x320a53(0x1ad)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x4c0c7a(_0x3f8e57['$1']);return _0x4d26d6['Settings'][_0x320a53(0x215)];}else this[_0x320a53(0x3a6)][_0x320a53(0x271)]['destroy']();}this['removeChild'](this[_0x320a53(0x3a6)]),delete this[_0x320a53(0x3a6)];},Window_ActorCommand['prototype'][_0x5e9919(0x20f)]=function(){const _0x261afb=_0x5e9919;if(!BattleManager[_0x261afb(0x37b)]())return;if(!this[_0x261afb(0x42e)])return;this[_0x261afb(0x1aa)]();if(this['_actor']['hideBraveTrait']())return;this[_0x261afb(0x3a6)]=new Sprite(),this[_0x261afb(0x354)](this['_btbActionSprite']),this[_0x261afb(0x34d)]();},Window_ActorCommand['prototype'][_0x5e9919(0x34d)]=function(){const _0x5c900b=_0x5e9919,_0x45c6bf=VisuMZ['BattleSystemBTB'][_0x5c900b(0x28c)][_0x5c900b(0x23d)][_0x5c900b(0x32a)];if(_0x45c6bf)_0x45c6bf['call'](this,this[_0x5c900b(0x3a6)],this,this['_actor']);else{if(_0x5c900b(0x282)===_0x5c900b(0x282))this['modifyBTBActionCounterSprite_Fallback'][_0x5c900b(0x259)](this,this[_0x5c900b(0x3a6)],this,this['_actor']);else return this[_0x5c900b(0x2d6)]?this['_unit']['members']()[this[_0x5c900b(0x42c)]]:null;}},Window_ActorCommand[_0x5e9919(0x278)][_0x5e9919(0x40a)]=function(){const _0x7a2f26=_0x5e9919,_0x5dfb2e=arguments[0x0],_0x30ae81=arguments[0x1],_0x449fdb=arguments[0x2];_0x5dfb2e['x']=Math[_0x7a2f26(0x3d7)](_0x30ae81[_0x7a2f26(0x279)]/0x2),_0x5dfb2e['y']=0x0,_0x5dfb2e['anchor']['x']=0.5,_0x5dfb2e['anchor']['y']=0.5;const _0x36d289=TextManager['btbActionSlot'],_0x584bd4=TextManager[_0x7a2f26(0x27f)];let _0x3faece=_0x36d289[_0x7a2f26(0x3dc)](_0x449fdb[_0x7a2f26(0x1db)]());const _0x5591df=_0x449fdb[_0x7a2f26(0x1eb)];_0x3faece=_0x3faece[_0x7a2f26(0x266)](0x0,_0x5591df)+_0x584bd4+_0x3faece['substring'](_0x5591df+0x1);const _0x1bce16=new Bitmap(_0x30ae81[_0x7a2f26(0x279)],_0x30ae81['lineHeight']());_0x1bce16[_0x7a2f26(0x19c)]=0x24,_0x1bce16[_0x7a2f26(0x3ed)](_0x3faece,0x0,0x0,_0x1bce16[_0x7a2f26(0x279)],_0x1bce16[_0x7a2f26(0x22c)],_0x7a2f26(0x396)),_0x5dfb2e[_0x7a2f26(0x271)]=_0x1bce16;},Window_ActorCommand[_0x5e9919(0x278)]['isBattleItemWindowBTB']=function(){return BattleManager['isBTB']();},Window_ActorCommand['prototype'][_0x5e9919(0x30a)]=function(){const _0x15c28e=_0x5e9919,_0x50f826=BattleManager[_0x15c28e(0x233)]();if(_0x50f826){if('MZqja'===_0x15c28e(0x403))_0x234958+=_0x44a43d['round'](_0x3230bb-_0x14d7c4);else{const _0x282b7b=this[_0x15c28e(0x333)]();switch(_0x282b7b){case _0x15c28e(0x434):_0x50f826[_0x15c28e(0x1a0)]();break;case'guard':_0x50f826[_0x15c28e(0x1ec)]();break;case _0x15c28e(0x2b5):_0x50f826[_0x15c28e(0x280)](this['currentExt']());break;default:_0x50f826[_0x15c28e(0x280)](null);break;}}}Window_Command[_0x15c28e(0x278)][_0x15c28e(0x30a)]['call'](this);},Window_Base['prototype'][_0x5e9919(0x2b9)]=function(_0x115cf4,_0x16ef28,_0x1b11c6,_0x54b203,_0x540799){const _0x2d5419=_0x5e9919;if(!_0x115cf4)return;if(!BattleManager[_0x2d5419(0x37b)]())return;const _0x2a3c11=VisuMZ[_0x2d5419(0x2c3)]['Settings'][_0x2d5419(0x23d)],_0x1d2354=BattleManager['isInputting']()?_0x2a3c11[_0x2d5419(0x37d)]:_0x2a3c11['StatusDisplayFmt'],_0x1dd44b=_0x2a3c11[_0x2d5419(0x405)],_0x99fd98=_0x2a3c11[_0x2d5419(0x371)],_0x23f222=_0x2a3c11['NegativeColor'];let _0x5def9a=0x0,_0x5588f0=0x0;_0x5588f0=_0x115cf4['bravePoints']();if(_0x5588f0>0x0)_0x5def9a=_0x99fd98;if(_0x5588f0===0x0)_0x5def9a=_0x1dd44b;if(_0x5588f0<0x0)_0x5def9a=_0x23f222;const _0x220edf=_0x2d5419(0x246)[_0x2d5419(0x313)](_0x5def9a,_0x5588f0),_0x255358='\x5cI[%1]'[_0x2d5419(0x313)](ImageManager['btbBravePointsIcon']);_0x5588f0=_0x115cf4[_0x2d5419(0x310)]();if(_0x5588f0>0x0)_0x5def9a=_0x99fd98;if(_0x5588f0===0x0)_0x5def9a=_0x1dd44b;_0x5588f0<0x0&&(_0x5def9a=_0x23f222);const _0x270ea1='\x5cC[%1]%2\x5cC[0]'[_0x2d5419(0x313)](_0x5def9a,_0x5588f0);let _0x272144=_0x1d2354[_0x2d5419(0x313)](_0x220edf,TextManager[_0x2d5419(0x226)],_0x255358,_0x270ea1);const _0x4d93a3=this[_0x2d5419(0x417)](_0x272144)[_0x2d5419(0x279)];if(_0x540799===_0x2d5419(0x396))_0x16ef28+=Math['round']((_0x54b203-_0x4d93a3)/0x2);else{if(_0x540799===_0x2d5419(0x2c1)){if(_0x2d5419(0x33c)!==_0x2d5419(0x380))_0x16ef28+=Math['round'](_0x54b203-_0x4d93a3);else{const _0x50dbf8=this[_0x2d5419(0x270)](),_0x58b32d=_0x44797c['inputtingAction']();if(_0x58b32d)_0x58b32d[_0x2d5419(0x24b)](_0x50dbf8?_0x50dbf8['id']:null);_0x15528e[_0x2d5419(0x278)][_0x2d5419(0x30a)][_0x2d5419(0x259)](this);}}}this[_0x2d5419(0x26f)](_0x272144,_0x16ef28,_0x1b11c6,_0x54b203);},Window_StatusBase[_0x5e9919(0x278)]['showBravePoints']=function(_0x1c6c8f){const _0x4ab2f4=_0x5e9919;if(!_0x1c6c8f)return![];if(!BattleManager[_0x4ab2f4(0x37b)]())return![];if(!this['battleLayoutStyle'])return![];if(_0x1c6c8f[_0x4ab2f4(0x36f)]())return![];const _0x30a924=VisuMZ['BattleSystemBTB'][_0x4ab2f4(0x28c)]['Window'],_0x274166=this[_0x4ab2f4(0x2b1)]();return _0x30a924[_0x4ab2f4(0x41f)[_0x4ab2f4(0x313)](_0x274166)];},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x3c4)]=Window_BattleStatus['prototype'][_0x5e9919(0x330)],Window_BattleStatus[_0x5e9919(0x278)][_0x5e9919(0x330)]=function(_0x17300f){const _0x3db18f=_0x5e9919;VisuMZ[_0x3db18f(0x2c3)][_0x3db18f(0x3c4)][_0x3db18f(0x259)](this,_0x17300f);const _0x5506dd=this['actor'](_0x17300f);if(this[_0x3db18f(0x2d4)](_0x5506dd)){const _0x45cc33=this[_0x3db18f(0x2fe)](_0x17300f),_0x12ab2c=$dataSystem[_0x3db18f(0x324)]?0x4:0x3,_0xc67785=_0x12ab2c*0x80+(_0x12ab2c-0x1)*0x8+0x4;let _0x19557d=_0x45cc33['x']+this[_0x3db18f(0x224)];if(VisuMZ[_0x3db18f(0x2f1)][_0x3db18f(0x28c)][_0x3db18f(0x3f0)][_0x3db18f(0x368)])_0x3db18f(0x443)===_0x3db18f(0x1e4)?_0x36b20f+=_0x2d7712:_0x19557d=_0x45cc33['x']+ImageManager[_0x3db18f(0x40d)]+0x8;else{if(_0x3db18f(0x388)!==_0x3db18f(0x388)){if(!_0x401c73[_0x3db18f(0x278)][_0x3db18f(0x3cc)][_0x3db18f(0x259)](this,_0xe50a3f,_0x300c7b))return![];if(_0x4123a9[_0x3db18f(0x217)]()&&_0x5ef82e[_0x3db18f(0x217)]()){if(_0x1becc6[_0x3db18f(0x1e9)]()!==_0x8030e8['isForFriend']())return![];if(_0x106456[_0x3db18f(0x26b)]!==_0x4383a9[_0x3db18f(0x26b)])return![];}return!![];}else _0x19557d+=ImageManager['iconWidth'];}const _0x5d49f0=Math['round'](Math['min'](_0x45cc33['x']+_0x45cc33[_0x3db18f(0x279)]-_0xc67785,_0x19557d));let _0x599891=_0x5d49f0+0x88,_0x1bfba6=_0x45cc33['y'];_0x599891+=0x88*($dataSystem['optDisplayTp']?0x3:0x2),_0x599891+=this['getOffsetX_BTB'](),_0x1bfba6+=this[_0x3db18f(0x24e)]();const _0xbc1127=this[_0x3db18f(0x2b3)]();if(_0x599891>_0x45cc33['x']+_0x45cc33[_0x3db18f(0x279)])return;this[_0x3db18f(0x2b9)](_0x5506dd,_0x599891,_0x1bfba6,_0x45cc33[_0x3db18f(0x279)],_0xbc1127);}},VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x336)]=Window_BattleStatus[_0x5e9919(0x278)]['drawItemStatusXPStyle'],Window_BattleStatus[_0x5e9919(0x278)][_0x5e9919(0x314)]=function(_0x2ca95b){const _0x407e88=_0x5e9919;VisuMZ[_0x407e88(0x2c3)]['Window_BattleStatus_drawItemStatusXPStyle'][_0x407e88(0x259)](this,_0x2ca95b);const _0x25002a=this['actor'](_0x2ca95b);if(this['showBravePoints'](_0x25002a)){const _0x4996b4=this[_0x407e88(0x3e9)](_0x2ca95b);let _0x422e55=_0x4996b4['x'],_0x209c6f=_0x4996b4['y'];_0x422e55+=this['getOffsetX_BTB'](),_0x209c6f+=this['getOffsetY_BTB']();const _0x2c5c91=this['getAlignmentBTB']();this[_0x407e88(0x2b9)](_0x25002a,_0x422e55,_0x209c6f,_0x4996b4[_0x407e88(0x279)],_0x2c5c91);}},Window_BattleStatus[_0x5e9919(0x278)][_0x5e9919(0x3e9)]=function(_0x31f6d4){const _0x2a6aa5=_0x5e9919,_0x571436=this[_0x2a6aa5(0x43a)](_0x31f6d4);if(_0x571436[_0x2a6aa5(0x279)]<ImageManager[_0x2a6aa5(0x40d)])return _0x571436;let _0x41bb48=Math[_0x2a6aa5(0x3d7)]((_0x571436[_0x2a6aa5(0x279)]-ImageManager[_0x2a6aa5(0x40d)])/0x2);return _0x571436[_0x2a6aa5(0x279)]=ImageManager[_0x2a6aa5(0x40d)],_0x571436['x']+=_0x41bb48,_0x571436;},Window_BattleStatus[_0x5e9919(0x278)]['getAlignmentBTB']=function(){const _0xd938f1=_0x5e9919,_0x2234d6=VisuMZ['BattleSystemBTB']['Settings'][_0xd938f1(0x23d)],_0x2cedb5=this['battleLayoutStyle']();return _0x2234d6[_0xd938f1(0x3a2)[_0xd938f1(0x313)](_0x2cedb5)]||0x0;},Window_BattleStatus[_0x5e9919(0x278)][_0x5e9919(0x194)]=function(){const _0x3cfe90=_0x5e9919,_0x27c33c=VisuMZ['BattleSystemBTB'][_0x3cfe90(0x28c)][_0x3cfe90(0x23d)],_0x59228d=this['battleLayoutStyle']();return _0x27c33c[_0x3cfe90(0x3bc)[_0x3cfe90(0x313)](_0x59228d)]||0x0;},Window_BattleStatus['prototype'][_0x5e9919(0x24e)]=function(){const _0x3c4326=_0x5e9919,_0xbd2ae8=VisuMZ[_0x3c4326(0x2c3)][_0x3c4326(0x28c)]['Window'],_0x14fd60=this[_0x3c4326(0x2b1)]();return _0xbd2ae8['%1_offsetY'['format'](_0x14fd60)]||0x0;},Window_BattleSkill[_0x5e9919(0x278)][_0x5e9919(0x3af)]=function(){const _0x2fd870=_0x5e9919;return BattleManager[_0x2fd870(0x37b)]();},Window_BattleSkill[_0x5e9919(0x278)][_0x5e9919(0x30a)]=function(){const _0x1e366c=_0x5e9919,_0x33f330=this[_0x1e366c(0x270)](),_0x2ea0c0=BattleManager[_0x1e366c(0x233)]();if(_0x2ea0c0)_0x2ea0c0[_0x1e366c(0x280)](_0x33f330?_0x33f330['id']:null);Window_SkillList[_0x1e366c(0x278)][_0x1e366c(0x30a)][_0x1e366c(0x259)](this);},Window_BattleItem[_0x5e9919(0x278)][_0x5e9919(0x3af)]=function(){const _0x32d7cf=_0x5e9919;return BattleManager[_0x32d7cf(0x37b)]();},Window_BattleItem[_0x5e9919(0x278)]['applyBattleItemWindowBTB']=function(){const _0x109d07=_0x5e9919,_0x1e8987=this['item'](),_0x563484=BattleManager[_0x109d07(0x233)]();if(_0x563484)_0x563484[_0x109d07(0x24b)](_0x1e8987?_0x1e8987['id']:null);Window_ItemList[_0x109d07(0x278)][_0x109d07(0x30a)][_0x109d07(0x259)](this);};function Window_BTB_TurnOrder(){const _0x1c973d=_0x5e9919;this[_0x1c973d(0x1c1)](...arguments);}function _0x3ace(){const _0x2152ab=['drawTextEx','item','bitmap','PBMNB','map','UmJSY','calculateTargetPositions','BravePointsIcon','createChildren','prototype','width','%1Mirror','_helpWindow','TurnOrder','DisplayOffsetX','updateLetter','btbActionCurrent','setSkill','split','pmtsR','BattleManager_battleSys','isTpb','NdJYd','updateGraphicHue','btbBraveCommand','MaxHorzSprites','textWidth','left','Yisnv','Settings','parse','Visible','jLgGW','ceil','Scene_Battle_onDisabledPartyCommandSelection','version','FusionStrict','_actionFusionRecipe','waitCount','ARRAYNUM','47bPnqId','repositionLogWindowBTB','commandCancelBTB','EnemyBattlerFaceIndex','_isBattleOver','kRkdo','_graphicFaceName','_btbTurnOrderFaceIndex','formFlexCombo','NGmNh','gainBravePoints','createBattlerSprites','getColor','note','_btbTurnOrderIconIndex','lkGzx','battleSys','PpaaY','_positionTargetY','ParseAllNotetags','_windowLayer','qANXM','bitmapHeight','performBrave','KtLsp','updateBattleContainerOrder','battleLayoutStyle','BravePointSetUser','getAlignmentBTB','BTB_MIN_BRAVEPOINTS_HARD_CAP','singleSkill','cancel','Game_System_initialize','QxHiB','drawActorBravePoints','_plural','BattleManager_startTurn','CjKMo','loadSystem','UHoex','BtbTurnOrderEnemyFace','_fadeDuration','right','%1SystemBorder','BattleSystemBTB','_isAlive','BravePointAlterUser','exit','checkPosition','applyItemBattleSystemBTBUserEffect','ScreenBuffer','loseBravePoints','update','QgQif','getTotalActionFusionRecipes','MaxVertSprites','updatePadding','_homeDuration','SkMRX','BravePointsFull','makeActionOrders','showBravePoints','addBraveCommand','_unit','onTurnEnd','BattleManager_isTurnBased','createKeyJS','CancelAnimationID','process_VisuMZ_BattleSystemBTB_Notetags','loadFace','nmHIv','Skill-%1-%2','_itemIDs','BorderThickness','refresh','dZbCm','EAxar','_turnOrderContainer','updateHomePosition','_positionTargetX','Scene_Boot_onDatabaseLoaded','setHandler','isUsePageUpDnShortcutBTB','actor','checkActionsBTB','9CvdvYV','Item-%1-%2','TurnOrderBTBGraphicIconIndex','ParseItemNotetags','\x5cI[%1]%2','BattleCore','isActor','FaceIndex','3722152TPmuuw','btbBravePointsIcon','%1BgColor2','JsBravePointsUser','btbParseFusionData','MinBravePoints','WaitFrames','yNNdd','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ZMwue','itemLineRect','containerPosition','btbPayItemFusionCosts','jzEMA','showBraveAnimationBTB','%1AnimationID','battleEnd','BattleManager_isActiveTpb','eQbEc','remove','BravePointBattleStart','opacity','applyBattleItemWindowBTB','Weapon-%1-%2','_letter','DbjrA','concat','BTB_MAX_BRAVEPOINTS_DEFAULT','predictedBravePoints','createGraphicSprite','ParseSkillNotetags','format','drawItemStatusXPStyle','makeActions','GbLqV','isBattleSystemBTBTurnOrderVisible','changeIconGraphicBitmap','Game_Battler_performCollapse','MaxActionsDefault','Window_Help_setItem','battler','_braveStartupAnimation','initMembers','hHtrE','bOWcu','uMEiK','BraveAnimation','yuubh','optDisplayTp','Class-%1-%2','zzWjw','setBattleSystemBTBTurnOrderVisible','onTurnEndBTB','hasSvBattler','DrawActionCountersJS','XiBNK','mainFontFace','slice','Game_Action_setItem','pmxlF','drawItemStatusListStyle','_graphicHue','Mechanics','currentSymbol','addLoadListener','iconWidth','Window_BattleStatus_drawItemStatusXPStyle','predictedBravePointCost','FveKl','cannotBraveTrait','brave','onBattleStartBTB','XLjxR','BravePointPredictedCost','KkjKT','boxHeight','updateVisibility','floor','createBackgroundSprite','setBlendColor','_turnOrderInnerSprite','BTB','calcRegenBravePoints','VMLbn','SpriteLength','Game_Actor_makeActions','ConvertParams','Game_Action_allowRandomSpeed','startTurn','modifyBTBActionCounterSprite','children','updateTurnOrderBTB','Scene_Battle_createActorCommandWindow','allBattleMembers','AJghA','OgeBN','addChild','blt','ActionSlot','xYOYW','addGuardCommand','_btbTurnOrderGraphicType','MaxBravePointsDefault','SrWVf','_scrollY','isSideView','GgACE','requestFauxAnimation','mainSprite','commandCancel','KIcZA','cancelBrave','IconIndex','sort','makeAdditionalCostTextBTB','BattleManager_makeActionOrders','ShowFacesListStyle','changeSvActorGraphicBitmap','getSkillIdWithName','defaultPosition','_homeX','waitForAnimation','zpXRQ','hideBraveTrait','Window_Selectable_select','PositiveColor','Game_BattlerBase_hide','queueBraveAnimationsBTB','_guardUnleash','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_isAppeared','oZQsD','_bravePoints','processActionFusionsBTB','XLJFD','isBTB','EnemyBattlerFontSize','StatusPredictFmt','bitmapWidth','_blendColor','wiKYV','IconSet','resetFontSettings','_containerHeight','NUM','setHue','RepositionTopHelpY','addCommand','oGCWw','TurnOrderBTBGraphicType','TurnOrderBTBGraphicFaceIndex','iconHeight','makeMultiActionsBTB','canInput','createLetterSprite','TssFv','uOgQa','isItem','makeSpeed','windowRect','includes','MaxBravePointsHardCap','center','setBravePoints','removeActionBattlersBTB','Game_Action_applyItemUserEffect','boxWidth','BravePointStartFavor','ntghl','37024LbYpCQ','CannotFusion','Actors','join','_graphicFaceIndex','%1_align','JsBravePointsTarget','Window_Base_makeAdditionalSkillCostText','BTB_Help','_btbActionSprite','kooEQ','pop','updateOpacity','kuwvI','WwAOo','createInitialPositions','makeAdditionalSkillCostText','createTurnOrderBTBGraphicFaceIndex','isBattleItemWindowBTB','clamp','length','isEnemy','UtEaM','makeActionTimes','FWmlF','onDisabledPartyCommandSelection','cYNmP','maxBraveActions','_actorCommandWindow','canAddBraveCommand','ZEtun','%1_offsetX','_scrollX','return\x200','Window_ActorCommand_addGuardCommand','faceHeight','rhasg','_btbSkillFlexFusion','clearActions','Window_BattleStatus_drawItemStatusListStyle','process_VisuMZ_BattleSystemBTB','OKbGv','startActionBTB','_actionBattlers','JSON','Game_Battler_makeActionTimes','canPayActionFusionCombination','canActionFusionWithBTB','ARRAYSTR','getActionFusionRecipeItems','updateSelectionEffect','FusionFlex','_statusWindow','isHorz','indexOf','qECjs','_homeY','_fadeTarget','round','ShowCostForGuard','676313HKuQJV','%1BgColor1','_graphicSv','repeat','_tempBattler','braveAnimationTimes','ZuhSn','useItem','Armor-%1-%2','iNIue','_positionDuration','_graphicSprite','allowRandomSpeed','rDcJM','RepositionTopHelpX','Window_BattleLog_startAction','itemRectPortraitBTB','BattleManager_isTpb','2518JaOMkw','name','drawText','btbBravePointsFull','_btbSkillStrictFusion','BattleLayout','isTurnBased','BtbTurnOrderClearActorGraphic','RegExp','numItems','_fullHeight','enemy','_btbItemFlexFusion','180JkLHFX','getStateTooltipBattler','DisplayPosition','isSkill','svActorVertCells','SystemTurnOrderVisibility','payBravePointsCost','commandStyle','constructor','%1Mute','test','gNSrE','_scene','NeutralColor','face','Game_Action_setSkill','yLDbk','onBattleStart','modifyBTBActionCounterSprite_Fallback','fHkXf','getBattleSystem','faceWidth','_position','clearRect','TurnOrderBTBGraphicFaceName','inBattle','EnemyBattlerIcon','Game_Party_removeActor','BraveAnimationID','max','createTestBitmap','textSizeEx','contents','HideBravePointCost','push','cursorPagedown','CannotBrave','processUpdateGraphic','subject','%1_display','trim','Enemy-%1-%2','ssMLI','startFade','makeCommandList','_btbTurnOrderWindow','QOHFl','BtbuG','YIcCk','changeFaceGraphicBitmap','btbCostFormat','createAllWindows','_index','bravePointsCost','_actor','setBTBGraphicIconIndex','EnemyBattlerType','isAlive','index','checkTargetPositions','attack','top','STRUCT','showNormalAnimation','_logWindow','btbRegisterFusions','itemRect','%1\x20%2\x20%3','_ogWindowLayerY','nGjEo','EnemyActionFusions','Window_Base_close','createBTBTurnOrderWindow','ItemQuantityFontSize','10qEBfsP','xrOJk','GOsNc','CEzTX','initHomePositions','_weapons','ShowMarkerBg','Game_Unit_makeActions','hide','KuLNW','commandBrave','BravePointSetTarget','faceName','_armors','General','RepositionLogWindow','Brave','nIDpa','speed','toUpperCase','createTurnOrderBTBGraphicFaceName','icon','create','canProcessActionFusionsBTB','UpdateFrames','text','SpriteThin','getOffsetX_BTB','iCkyo','setup','Actor','BravePointCostFmt','ShowCostForAttack','EahuW','Window_Selectable_cursorPagedown','fontSize','createBattlerRect','min','battlerName','setAttack','some','createActorCommandWindowBTB','sortActionOrdersBTB','updateGraphic','battlerHue','OrderDirection','registerCommand','canGuard','_graphicIconIndex','destroyBTBActionCounters','minBravePoints','btbPaySkillFusionCosts','match','addInnerChild','drawItemNumberBTB','_backgroundSprite','changeEnemyGraphicBitmap','clear','Actor-%1-%2','ShowMarkerBorder','bravePoints','createTurnOrderBTBGraphicIconIndex','bottom','clearTurnOrderBTBGraphics','BTB_MIN_BRAVEPOINTS_DEFAULT','filter','Ihsvq','dfUzH','description','canUse','Game_BattlerBase_canInput','anchor','initialize','Window_Base_drawItemNumber','Window_ActorCommand_makeCommandList','ItemScene','_graphicEnemy','Game_Action_speed','MkbFp','gradientFillRect','useItemBTB','BravePointRegenBase','parameters','createTurnOrderBTBGraphicType','BTB_MAX_ACTIONS_DEFAULT','guardSkillId','BravePointRegen','State-%1-%2','wXnYd','applyItemUserEffect','BattleManager_startInput','skillCostSeparator','CommandName','makeDeepCopy','dBAHQ','_btbTurnOrderFaceName','Cancel','EnemyBattlerFontFace','numActions','initBattleSystemBTB','pSulJ','currentAction','%1BorderColor','WnZZq','fontFace','svactor','wydIK','mqpKV','maxBattleMembers','traitObjects','EnemyBattlerDrawLetter','isSceneBattle','isForFriend','Enemies','_actionInputIndex','setGuard','performCollapse','\x5cI[%1]','select','_fullWidth','ActorActionFusions','ARRAYFUNC','Game_BattlerBase_appear','oJSlZ','members','1501200PwIjRY','MinBravePointsHardCap','WfyVl','FUNC','Game_Enemy_makeActions','updateSidePosition','_subject','FxNVq','fillRect','3687019ToFZgq','containerWindow','Enemy','reduceBrave','btbMatchesCurrentFusionAction','MinBravePointsDefault','XBlGT','hDUll','SubjectDistance','updatePosition','_items','_btbItemStrictFusion','Window_Selectable_cursorPageup','urWGh','svActorHorzCells','setActionFusionBTB','createBTBActionCounters','_surprise','regenerateBravePoints','eRgJU','NvMAx','_letterSprite','ActorBattlerIcon','getActionFusionCombinationsBTB','needsSelection','process_VisuMZ_BattleSystemBTB_JS','bWxla','Scene_Battle_createAllWindows','Game_Battler_onBattleStart','EnableFusion','checkOpacity','2927034blJxHc','CostPosition','Parse_Notetags_BravePointsUserJS','ARRAYSTRUCT','ShowEnemyBrave','BravePointSkillCost','padding','AjGqk','btbBravePointsAbbr','ItemQuantityFmt','BravePointsAbbr','ItemsEquipsCore','cursorPageup','refreshStatusBTB','height','cannotFusionNotetagBTB','_btbTurnOrderVisible','BtbTurnOrderActorFace','loadEnemy','PkvvY','FaceName','inputtingAction','startAction','visible','updateTurnOrder','loadSvEnemy','NCaAT','yhtBv','_graphicType','CKnRF','BTB_MAX_ACTIONS_HARD_CAP','Window','drawItemNumber','startInput','IPbFY','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','requestRefresh','applyBattleSystemBTBUserEffect','DisplayOffsetY','removeActor','\x5cC[%1]%2\x5cC[0]','maxBravePoints','Game_BattlerBase_canGuard','bind','onDatabaseLoaded','setItem','_ogWindowLayerX','BTB_MAX_BRAVEPOINTS_HARD_CAP','getOffsetY_BTB','BtbTurnOrderActorIcon','EnemyBattlerFaceName','isSkipPartyCommandWindow','QtRUz','NsXYQ','_targetHomeY','MaxActions','createActorCommandWindow','appear','svBattlerName','call','compareBattlerSprites','canBrave','selectNextCommand','isAppeared','getItemIdWithName','EnemyMultiAction','_bypassAiValidCheck','_actions','getActionFusionRecipeSkills','BravePointItemCost','createBorderSprite','MaxActionsHardCap','substring','_targetHomeX','Show_0_BP_Cost','STR','Game_BattlerBase_canUse','_targetIndex','_skillIDs','faceIndex','gAafB'];_0x3ace=function(){return _0x2152ab;};return _0x3ace();}Window_BTB_TurnOrder[_0x5e9919(0x278)]=Object[_0x5e9919(0x458)](Window_Base[_0x5e9919(0x278)]),Window_BTB_TurnOrder[_0x5e9919(0x278)][_0x5e9919(0x400)]=Window_BTB_TurnOrder,Window_BTB_TurnOrder['Settings']=VisuMZ[_0x5e9919(0x2c3)][_0x5e9919(0x28c)]['TurnOrder'],Window_BTB_TurnOrder[_0x5e9919(0x278)][_0x5e9919(0x1c1)]=function(){const _0x37b77e=_0x5e9919,_0x53408c=this[_0x37b77e(0x393)]();this[_0x37b77e(0x446)](_0x53408c),Window_Base[_0x37b77e(0x278)]['initialize'][_0x37b77e(0x259)](this,_0x53408c),this['createBattlerSprites'](),this[_0x37b77e(0x340)](),this['opacity']=0x0;},Window_BTB_TurnOrder[_0x5e9919(0x278)][_0x5e9919(0x393)]=function(){const _0x32fdb9=_0x5e9919;return this[_0x32fdb9(0x19d)]($gameParty[_0x32fdb9(0x1e5)](),0x9,!![]);},Window_BTB_TurnOrder[_0x5e9919(0x278)][_0x5e9919(0x446)]=function(_0x41110d){const _0x1c812c=_0x5e9919;this[_0x1c812c(0x267)]=this['_homeX']=_0x41110d['x'],this[_0x1c812c(0x254)]=this[_0x1c812c(0x3d5)]=_0x41110d['y'],this[_0x1c812c(0x1f0)]=_0x41110d[_0x1c812c(0x279)],this[_0x1c812c(0x3f5)]=_0x41110d[_0x1c812c(0x22c)],this['_homeDuration']=0x0;},Window_BTB_TurnOrder[_0x5e9919(0x278)]['createBattlerRect']=function(_0x1ed553,_0x455ac5,_0x23feb8){const _0x1cdca1=_0x5e9919,_0x4baabe=Window_BTB_TurnOrder['Settings'],_0x19b9ec=this['isHorz']()?_0x4baabe[_0x1cdca1(0x288)]:_0x4baabe[_0x1cdca1(0x2ce)],_0x3fa6be=Math['min'](_0x19b9ec,_0x1ed553+_0x455ac5),_0x5dcdce=SceneManager[_0x1cdca1(0x404)][_0x1cdca1(0x3d1)]['height'],_0x4cba22=SceneManager['_scene'][_0x1cdca1(0x27b)]['height'],_0xc305e=_0x4baabe[_0x1cdca1(0x207)],_0x5d748c=Graphics[_0x1cdca1(0x22c)]-_0x5dcdce-_0x4cba22;let _0x47b30d=0x0,_0x271696=0x0,_0x36de0a=0x0,_0x3b1dc3=0x0;switch(_0x4baabe[_0x1cdca1(0x3fa)]){case _0x1cdca1(0x435):_0x47b30d=_0x4baabe[_0x1cdca1(0x193)]*_0x3fa6be+_0xc305e,_0x271696=_0x4baabe['SpriteLength'],_0x36de0a=Math[_0x1cdca1(0x290)]((Graphics[_0x1cdca1(0x279)]-_0x47b30d)/0x2),_0x3b1dc3=_0x4baabe[_0x1cdca1(0x2c9)];break;case _0x1cdca1(0x1b7):_0x47b30d=_0x4baabe[_0x1cdca1(0x193)]*_0x3fa6be+_0xc305e,_0x271696=_0x4baabe[_0x1cdca1(0x348)],_0x36de0a=Math[_0x1cdca1(0x290)]((Graphics[_0x1cdca1(0x279)]-_0x47b30d)/0x2),_0x3b1dc3=Graphics[_0x1cdca1(0x22c)]-_0x5dcdce-_0x271696-_0x4baabe['ScreenBuffer'];break;case _0x1cdca1(0x28a):_0x47b30d=_0x4baabe['SpriteLength'],_0x271696=_0x4baabe[_0x1cdca1(0x193)]*_0x3fa6be+_0xc305e,_0x36de0a=_0x4baabe[_0x1cdca1(0x2c9)],_0x3b1dc3=Math[_0x1cdca1(0x290)]((_0x5d748c-_0x271696)/0x2),_0x3b1dc3+=_0x4cba22;break;case _0x1cdca1(0x2c1):_0x47b30d=_0x4baabe[_0x1cdca1(0x348)],_0x271696=_0x4baabe[_0x1cdca1(0x193)]*_0x3fa6be+_0xc305e,_0x36de0a=Graphics[_0x1cdca1(0x279)]-_0x47b30d-_0x4baabe[_0x1cdca1(0x2c9)],_0x3b1dc3=Math['ceil']((_0x5d748c-_0x271696)/0x2),_0x3b1dc3+=_0x4cba22;break;}if(!_0x23feb8){const _0x218664=Window_BTB_TurnOrder[_0x1cdca1(0x28c)][_0x1cdca1(0x1a6)];let _0x1d4fe2=Math[_0x1cdca1(0x19e)](_0x19b9ec,Math[_0x1cdca1(0x19e)]($gameParty[_0x1cdca1(0x1e5)]()+0x8)-_0x3fa6be);switch(_0x4baabe[_0x1cdca1(0x3fa)]){case'top':case _0x1cdca1(0x1b7):if(_0x218664){if(_0x1cdca1(0x285)===_0x1cdca1(0x428)){const _0x3a5f4a=_0x59c2c2['Settings'],_0xaf5996=this[_0x1cdca1(0x37e)](),_0x31d7c2=this['bitmapHeight'](),_0x51b3d4=_0x3967c5['min'](_0xaf5996,_0x31d7c2);this[_0x1cdca1(0x3e4)]['bitmap']=new _0x5f5863(_0xaf5996,_0x31d7c2);const _0x3a74e5=this[_0x1cdca1(0x3e4)][_0x1cdca1(0x271)],_0x16a879=_0x2a87ba[_0x1cdca1(0x19e)](0x1,_0x51b3d4/_0x3f608a['width'],_0x51b3d4/_0x191f91['height']),_0xdb0a1c=_0x11b016[_0x1cdca1(0x279)]*_0x16a879,_0x472940=_0x287545[_0x1cdca1(0x22c)]*_0x16a879,_0x14e7b3=_0x1a0820[_0x1cdca1(0x3d7)]((_0xaf5996-_0xdb0a1c)/0x2),_0x290063=_0x441545[_0x1cdca1(0x3d7)]((_0x31d7c2-_0x472940)/0x2);_0x3a74e5[_0x1cdca1(0x355)](_0x107bb1,0x0,0x0,_0x26009c['width'],_0x50af42['height'],_0x14e7b3,_0x290063,_0xdb0a1c,_0x472940);}else _0x36de0a-=_0x1d4fe2*_0x4baabe['SpriteThin'];}break;}}return _0x36de0a+=_0x4baabe[_0x1cdca1(0x27d)],_0x3b1dc3+=_0x4baabe[_0x1cdca1(0x244)],new Rectangle(_0x36de0a,_0x3b1dc3,_0x47b30d,_0x271696);},Window_BTB_TurnOrder['prototype'][_0x5e9919(0x2cf)]=function(){const _0xc25853=_0x5e9919;this[_0xc25853(0x224)]=0x0;},Window_BTB_TurnOrder['prototype'][_0x5e9919(0x3d2)]=function(){const _0x15374d=_0x5e9919,_0x3a609a=Window_BTB_TurnOrder[_0x15374d(0x28c)],_0xd6830d=[_0x15374d(0x435),'bottom'][_0x15374d(0x394)](_0x3a609a[_0x15374d(0x3fa)]);return _0xd6830d;},Window_BTB_TurnOrder[_0x5e9919(0x278)][_0x5e9919(0x2a2)]=function(){const _0x327826=_0x5e9919;this['_turnOrderInnerSprite']=new Sprite(),this[_0x327826(0x1ae)](this[_0x327826(0x344)]),this[_0x327826(0x2e4)]=[];for(let _0x57a397=0x0;_0x57a397<$gameParty[_0x327826(0x1e5)]();_0x57a397++){const _0x3b11ad=new Sprite_BTB_TurnOrder_Battler($gameParty,_0x57a397);this[_0x327826(0x344)][_0x327826(0x354)](_0x3b11ad),this['_turnOrderContainer'][_0x327826(0x41a)](_0x3b11ad);}for(let _0x11efa7=0x0;_0x11efa7<$gameTroop[_0x327826(0x1f5)]()['length'];_0x11efa7++){if('sFOoc'==='rAmpX'){_0x5753bd[_0x327826(0x2c3)][_0x327826(0x336)]['call'](this,_0x4697bf);const _0x435b20=this[_0x327826(0x2ea)](_0x3014ca);if(this['showBravePoints'](_0x435b20)){const _0x3f5ba4=this[_0x327826(0x3e9)](_0x3dc454);let _0x200ae5=_0x3f5ba4['x'],_0x414582=_0x3f5ba4['y'];_0x200ae5+=this[_0x327826(0x194)](),_0x414582+=this['getOffsetY_BTB']();const _0xda09f0=this['getAlignmentBTB']();this[_0x327826(0x2b9)](_0x435b20,_0x200ae5,_0x414582,_0x3f5ba4[_0x327826(0x279)],_0xda09f0);}}else{const _0x5793ec=new Sprite_BTB_TurnOrder_Battler($gameTroop,_0x11efa7);this[_0x327826(0x344)][_0x327826(0x354)](_0x5793ec),this[_0x327826(0x2e4)][_0x327826(0x41a)](_0x5793ec);}}},Window_BTB_TurnOrder[_0x5e9919(0x278)]['update']=function(){const _0x13ea7f=_0x5e9919;Window_Base[_0x13ea7f(0x278)]['update'][_0x13ea7f(0x259)](this),this[_0x13ea7f(0x2e5)](),this[_0x13ea7f(0x208)](),this['updateSidePosition'](),this[_0x13ea7f(0x2b0)](),this[_0x13ea7f(0x340)]();},Window_BTB_TurnOrder[_0x5e9919(0x278)][_0x5e9919(0x2e5)]=function(){const _0x3986b6=_0x5e9919;if(this[_0x3986b6(0x2d0)]>0x0){if(_0x3986b6(0x195)===_0x3986b6(0x30d))this[_0x3986b6(0x2db)](),this[_0x3986b6(0x218)]();else{const _0x161f09=this[_0x3986b6(0x2d0)];this['_homeX']=(this[_0x3986b6(0x36c)]*(_0x161f09-0x1)+this[_0x3986b6(0x267)])/_0x161f09,this[_0x3986b6(0x3d5)]=(this[_0x3986b6(0x3d5)]*(_0x161f09-0x1)+this[_0x3986b6(0x254)])/_0x161f09,this[_0x3986b6(0x2d0)]--,this[_0x3986b6(0x2d0)]<=0x0&&(this[_0x3986b6(0x36c)]=this[_0x3986b6(0x267)],this['_homeY']=this['_targetHomeY']);}}},Window_BTB_TurnOrder['prototype'][_0x5e9919(0x208)]=function(){const _0x36d994=_0x5e9919,_0x26da2b=Window_BTB_TurnOrder[_0x36d994(0x28c)];if(_0x26da2b[_0x36d994(0x3fa)]!==_0x36d994(0x435))return;if(!_0x26da2b['RepositionTopForHelp'])return;const _0x460546=SceneManager[_0x36d994(0x404)][_0x36d994(0x27b)];if(!_0x460546)return;_0x460546['visible']?_0x36d994(0x252)===_0x36d994(0x252)?(this['x']=this['_homeX']+(_0x26da2b[_0x36d994(0x3e7)]||0x0),this['y']=this['_homeY']+(_0x26da2b['RepositionTopHelpY']||0x0)):_0x83c3c9+=_0x4b8719(_0x3edc40['$1']):(this['x']=this[_0x36d994(0x36c)],this['y']=this[_0x36d994(0x3d5)]);const _0x12e1d4=SceneManager[_0x36d994(0x404)][_0x36d994(0x2ab)];if(this[_0x36d994(0x24c)]===undefined){if(_0x36d994(0x219)==='dKgMP'){const _0x15bb01='Brave',_0x23d038=_0x561da[_0x36d994(0x303)[_0x36d994(0x313)](_0x15bb01)],_0x1723f4=_0xa3d257[_0x36d994(0x27a)[_0x36d994(0x313)](_0x15bb01)],_0x26253b=_0xe72df[_0x36d994(0x401)[_0x36d994(0x313)](_0x15bb01)];_0x5242ed[_0x36d994(0x35f)]([this],_0x23d038,_0x1723f4,_0x26253b);}else this[_0x36d994(0x24c)]=Math[_0x36d994(0x3d7)]((Graphics[_0x36d994(0x279)]-Math[_0x36d994(0x19e)](Graphics[_0x36d994(0x39a)],_0x12e1d4[_0x36d994(0x279)]))/0x2),this[_0x36d994(0x43c)]=Math[_0x36d994(0x3d7)]((Graphics[_0x36d994(0x22c)]-Math[_0x36d994(0x19e)](Graphics[_0x36d994(0x33f)],_0x12e1d4[_0x36d994(0x22c)]))/0x2);}this['x']+=_0x12e1d4['x']-this[_0x36d994(0x24c)],this['y']+=_0x12e1d4['y']-this['_ogWindowLayerY'];},Window_BTB_TurnOrder[_0x5e9919(0x278)][_0x5e9919(0x1fb)]=function(){const _0x5deb47=_0x5e9919,_0x14a740=Window_BTB_TurnOrder[_0x5deb47(0x28c)];if([_0x5deb47(0x435)][_0x5deb47(0x394)](_0x14a740[_0x5deb47(0x3fa)]))return;this['x']=this[_0x5deb47(0x36c)],this['y']=this[_0x5deb47(0x3d5)];const _0x2122c6=SceneManager['_scene'][_0x5deb47(0x2ab)];this['x']+=_0x2122c6['x'],this['y']+=_0x2122c6['y'];},Window_BTB_TurnOrder[_0x5e9919(0x278)][_0x5e9919(0x2b0)]=function(){const _0x58c0c9=_0x5e9919;if(!this['_turnOrderInnerSprite'])return;const _0x12e3cc=this[_0x58c0c9(0x344)][_0x58c0c9(0x34e)];if(!_0x12e3cc)return;_0x12e3cc['sort'](this[_0x58c0c9(0x25a)][_0x58c0c9(0x249)](this));},Window_BTB_TurnOrder[_0x5e9919(0x278)]['compareBattlerSprites']=function(_0x364f92,_0x432f6e){const _0x440459=_0x5e9919,_0x458467=this[_0x440459(0x3d2)](),_0x55e357=Window_BTB_TurnOrder[_0x440459(0x28c)][_0x440459(0x1a6)];if(_0x458467&&!_0x55e357)return _0x364f92['x']-_0x432f6e['x'];else{if(_0x458467&&_0x55e357)return _0x432f6e['x']-_0x364f92['x'];else{if(!_0x458467&&_0x55e357)return _0x364f92['y']-_0x432f6e['y'];else{if(!_0x458467&&!_0x55e357)return _0x432f6e['y']-_0x364f92['y'];}}}},Window_BTB_TurnOrder[_0x5e9919(0x278)][_0x5e9919(0x340)]=function(){const _0x453fc7=_0x5e9919;this[_0x453fc7(0x235)]=$gameSystem[_0x453fc7(0x317)]();},Window_BTB_TurnOrder[_0x5e9919(0x278)][_0x5e9919(0x236)]=function(_0x4ebbf7){const _0x494159=_0x5e9919;this['_turnOrderContainer'][_0x494159(0x365)]((_0x22dba1,_0x4529bd)=>{const _0xc956de=_0x494159;return _0x22dba1[_0xc956de(0x2ff)]()-_0x4529bd[_0xc956de(0x2ff)]();}),this['recalculateHome']();if(!_0x4ebbf7)return;for(const _0x1b1a9d of this[_0x494159(0x2e4)]){if(!_0x1b1a9d)continue;_0x1b1a9d[_0x494159(0x2cb)](),_0x1b1a9d[_0x494159(0x3e3)]=0x0;}},Window_BTB_TurnOrder[_0x5e9919(0x278)]['recalculateHome']=function(){const _0x5ccd15=_0x5e9919;if(!this[_0x5ccd15(0x3d2)]())return;const _0x34f980=VisuMZ[_0x5ccd15(0x2c3)]['Settings'][_0x5ccd15(0x27c)];if(!_0x34f980['CenterHorz'])return;const _0x2a66bc=$gameParty['members']()[_0x5ccd15(0x1ba)](_0x38ef88=>_0x38ef88&&_0x38ef88[_0x5ccd15(0x431)]()&&_0x38ef88[_0x5ccd15(0x25d)]())[_0x5ccd15(0x3b1)],_0x56e069=$gameTroop[_0x5ccd15(0x1f5)]()[_0x5ccd15(0x1ba)](_0x2fa6c1=>_0x2fa6c1&&_0x2fa6c1['isAlive']()&&_0x2fa6c1[_0x5ccd15(0x25d)]())[_0x5ccd15(0x3b1)],_0x111d1b=this['createBattlerRect'](_0x2a66bc,_0x56e069);this[_0x5ccd15(0x267)]=_0x111d1b['x'],this[_0x5ccd15(0x254)]=_0x111d1b['y'],(this['_targetHomeX']!==this['_homeX']||this[_0x5ccd15(0x254)]!==this['_homeY'])&&(this[_0x5ccd15(0x2d0)]=_0x34f980['UpdateFrames']);};