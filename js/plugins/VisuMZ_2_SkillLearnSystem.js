//=============================================================================
// VisuStella MZ - Skill Learn System
// VisuMZ_2_SkillLearnSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_SkillLearnSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillLearnSystem = VisuMZ.SkillLearnSystem || {};
VisuMZ.SkillLearnSystem.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.09] [SkillLearnSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Learn_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin lets your game's actors have an alternative way of learning
 * skills aside from leveling up. Instead, they can learn skills through the
 * in-game skill menu, where they can trade gold, items, or the brand new
 * resources made available by this plugin: Ability Points and/or Skill Points.
 * 
 * Ability Points and Skill Points are new resources provided by this plugin
 * that can be acquired in a variety of ways, of which, you can set through its
 * mechanical settings in the Plugin Parameters. These can be through leveling
 * up, performing actions, and/or defeating enemies.
 * 
 * When learning skills through this plugin's in-game system, skills can have
 * a variety of costs and requirements. These requirements can come in the form
 * of needing to be at a certain level, having specific skills learned, and/or
 * having certain switches on.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actors can now learn new skills from the in-game skill menu under the
 *   new "Learn" command.
 * * In this new menu, actors can spend various resources to learn new skills.
 * * These resources can be Ability Points, Skill Points, items, and more.
 * * Ability Points and Skill Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Learnable skills may have requirements that need to be first met even if
 *   the actor has the available resources.
 * * Skill learning requirements can include levels, having other skills
 *   learned, and/or enabled switches.
 * * Play animations upon learning a new skill inside the menu.
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
 * Battle Test
 *
 * When doing a battle test through the database, all of an actor's learnable
 * skills through the Skill Learn System's notetags will become available for
 * the test battle to reduce the need to manually add them.
 *
 * ---
 *
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Skill Points and Ability Points earned can be visibly shown in the rewards
 * window.
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
 * === Ability Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting AP: x>
 * <Class name Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in a
 *   specific class if Ability Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Ability Points for.
 * - Replace 'name' with the name of the class to set starting Ability
 *   Points for.
 *
 * ---
 *
 * <AP Gain: x>
 * <User AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Ability Points gain from
 *   the Plugin Parameters.
 *
 * ---
 *
 * <Target AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <AP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Ability Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Ability Points to
 *   grant the player's party each.
 * - This effect will take over the "Per Enemy" Ability Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <AP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Ability Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Ability
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Ability Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Skill Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting SP: x>
 * <Class name Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in a specific
 *   class if Skill Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Skill Points for.
 * - Replace 'name' with the name of the class to set starting Skill
 *   Points for.
 *
 * ---
 *
 * <SP Gain: x>
 * <User SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <SP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Skill Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Skill Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <SP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Skill Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Skill
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Skill Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Learnable Skills-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill: id>
 * <Learn Skills: id, id, id>
 * 
 * <Learn Skill: name>
 * <Learn Skills: name, name, name>
 *
 * - Used for: Class Notetags
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple entries are permited.
 *
 * ---
 *
 * <Learn Skills>
 *  id
 *  id
 *  id
 *  name
 *  name
 *  name
 * </Learn Skills>
 *
 * - Used for: Class
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple middle entries are permited.
 *
 * ---
 * 
 * === Skill Learn Cost-Related Notetags ===
 * 
 * ---
 *
 * <Learn AP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Ability Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Ability Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Ability Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn CP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Class Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn JP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Job Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn SP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Skill Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn Item id Cost: x>
 * <Learn Item name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the items needed to be consumed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the item needed to be 
 *   consumed.
 * - Replace 'name' with the name of the item needed to be consumed.
 * - Replace 'x' with a number representing the amount of the item needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Weapon id Cost: x>
 * <Learn Weapon name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the weapons needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the weapon needed to be 
 *   consumed.
 * - Replace 'name' with the name of the weapon needed to be consumed.
 * - Replace 'x' with a number representing the amount of the weapon needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Armor id Cost: x>
 * <Learn Armor name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the armors needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the armor needed to be 
 *   consumed.
 * - Replace 'name' with the name of the armor needed to be consumed.
 * - Replace 'x' with a number representing the amount of the armor needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Gold Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the gold cost needed for an actor to learn the skill through
 *   the Skill Learn System.
 * - Replace 'x' with a number representing the amount of gold needed to learn
 *   this skill.
 * - If this notetag is not used, then the gold cost will default to the value
 *   found in the settings.
 *
 * ---
 *
 * <Learn Skill Costs>
 *  AP: x
 * 
 *  SP: x
 * 
 *  Item id: x
 *  Item name: x
 * 
 *  Weapon id: x
 *  Weapon name: x
 * 
 *  Armor id: x
 *  Armor name: x
 *  
 *  Gold: x
 * </Learn Skill Costs>
 *
 * - Used for: Skill Notetags
 * - Determines a group of resources needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with the ID's of items, weapons, armors to be consumed.
 * - Replace 'name' with the names of items, weapons, armors to be consumed.
 * - Replace 'x' with the quantities of the designated resource to be consumed.
 * - Insert multiple entries of items, weapons, and armors inside the notetags
 *   to add more resource entries.
 *
 * ---
 * 
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic Ability Point and Skill Point costs.
 * 
 * ---
 *
 * <JS Learn AP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn AP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Ability Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Ability
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn AP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn CP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn CP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Class Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn CP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn JP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn JP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Job Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn JP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn SP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn SP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Skill Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn SP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 * 
 * === Show Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Show Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to even
 *   appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Show Skill: id>
 * <Learn Show Skill: name>
 * 
 * <Learn Show All Skills: id, id, id>
 * <Learn Show All Skills: name, name, name>
 * 
 * <Learn Show Any Skills: id, id, id>
 * <Learn Show Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to appear visibly in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to appear visibly in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 *
 * ---
 *
 * <Learn Show Switch: x>
 * 
 * <Learn Show All Switches: x, x, x>
 * 
 * <Learn Show Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Show Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined show conditions.
 * 
 * ---
 *
 * <JS Learn Show>
 *  code
 *  code
 *  visible = code;
 * </JS Learn Show>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   visibly shown in the Skill Learn System menu.
 * - The 'visible' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be visible.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other show conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Show List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Show Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Require Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Require Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to be
 *   enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Require Skill: id>
 * <Learn Require Skill: name>
 * 
 * <Learn Require All Skills: id, id, id>
 * <Learn Require All Skills: name, name, name>
 * 
 * <Learn Require Any Skills: id, id, id>
 * <Learn Require Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to be enabled in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to be enabled in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 *
 * ---
 *
 * <Learn Require Switch: x>
 * 
 * <Learn Require All Switches: x, x, x>
 * 
 * <Learn Require Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to be enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Requirement Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined learning requirement conditions.
 * 
 * ---
 *
 * <JS Learn Requirements>
 *  code
 *  code
 *  enabled = code;
 * </JS Learn Requirements>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   enabled for learning in the Skill Learn System menu.
 * - The 'enabled' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be enabled.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other requirement conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Requirements List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list
 *   as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Requirements Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Animation-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill Animation: id>
 * <Learn Skill Animation: id, id, id>
 * 
 * - Used for: Skill Notetags
 * - Plays the animation(s) when this skill is learned through the Skill Learn
 *   System's menu.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 *
 * ---
 * 
 * <Learn Skill Fade Speed: x>
 * 
 * - Used for: Skill Notetags
 * - This determines the speed at which the skill's icon fades in during the
 *   skill learning animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Learn Skill Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Skill Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   skill's icon during learning instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of learning skills, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === JavaScript Notetags: On Learning Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * produce special effects when the skill is learned.
 * 
 * ---
 *
 * <JS On Learn Skill>
 *  code
 *  code
 *  code
 * </JS On Learn Skill>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform the desired actions when
 *   the skill is learned.
 * - This will apply to any time the skill is learned by an actor, even if it
 *   is through natural leveling or through the Skill Learn System menu.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
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
 * === Ability Points Plugin Commands ===
 * 
 * ---
 *
 * Ability Points: Gain
 * - The target actor(s) gains Ability Points.
 * - Gained amounts are affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Add
 * - The target actor(s) receives Ability Points.
 * - Received amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Lose
 * - The target actor(s) loses Ability Points.
 * - Lost amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Set
 * - Changes the exact Ability Points for the target actor(s).
 * - Changed amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Skill Points Plugin Commands ===
 * 
 * ---
 *
 * Skill Points: Gain
 * - The target actor(s) gains Skill Points.
 * - Gained amounts are affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Add
 * - The target actor(s) receives Skill Points.
 * - Received amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Lose
 * - The target actor(s) loses Skill Points.
 * - Lost amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Set
 * - Changes the exact Skill Points for the target actor(s).
 * - Changed amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Show Skill Learn in Skill Menu?
 * - Shows/hides Skill Learn inside the skill menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Skill Learn inside the skill menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for the Skill Learn System. These determine the settings
 * that are used for the Skill Learn System menu's main screen.
 *
 * ---
 *
 * Visual
 * 
 *   Displayed Costs:
 *   - Select which cost types to display in the skill entry.
 *   - This also determines the order they are displayed.
 *     - AP - Ability Points
 *     - SP - Skill Points
 *     - Item - Item Costs
 *     - Weapon - Weapon Costs
 *     - Armor - Armor Costs
 *     - Gold - Gold Costs
 * 
 *   JS: Draw Status:
 *   - JavaScript code used to draw in Window_SkillStatus when the Skill Learn
 *     System is active.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Learned Text:
 *   - This is the text that appears if the skill has been learned.
 *   - You may use text codes.
 * 
 *   Requirements
 * 
 *     Requirement Header:
 *     - Header for requirements.
 *     - %1 - Requirements (all of them)
 * 
 *     Separation Format:
 *     - This determines how the requirements are separated.
 *     - %1 - Previous Requirement, %2 - Second Requirement
 * 
 *     Level Format:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Skill Format:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Switch Format:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Separation Format:
 *     - This determines how the costs are separated from one another.
 *     - %1 - Previous Cost, %2 - Second Cost
 * 
 *     Item Format:
 *     - Determine how items are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Item Name
 * 
 *     Weapon Format:
 *     - Determine how weapons are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * 
 *     Armor Format:
 *     - Determine how armors are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Armor Name
 * 
 *     Gold Format:
 *     - Determine how gold is displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Skill Learn System. The Skill Learn System is
 * accessible normally through the in-game Skill menu.
 *
 * ---
 *
 * Main Access Settings
 * 
 *   Command Name:
 *   - Name of the 'Skill Learn' option in the Menu.
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Learn?
 * 
 *   Show in Menu?:
 *   - Add the 'Skill Learn' option to the Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Animation settings for the Skill Learn System. By default, an animation will
 * be played upon learning a skill through the Skill Learn System's menu in
 * order to provide player feedback about learning the said skill.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when learning a skill?
 * 
 *   Show Windows?:
 *   - Show windows during a skill learn animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when learning.
 *
 * ---
 *
 * Skill Sprite
 * 
 *   Scale:
 *   - How big do you want the skill sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the icon to fade in?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Settings for the sound effect played when learning a new skill through the
 * Skill Learn System.
 *
 * ---
 *
 * Settings
 * 
 *   Filename:
 *   - Filename of the sound effect played.
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
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for the Skill Learn System. There are two new windows added
 * into the Skill menu through this plugin: the Detail Window and the Confirm
 * Window.
 * 
 * The Detail Window will list the required costs of learning a skill in detail
 * in case the icons provided are not clear enough to show what's needed.
 * 
 * The Confirm Window is a window that appears towards the bottom to let the
 * player make a confirmation before deciding to learn the skill.
 *
 * ---
 *
 * Detail Window
 * 
 *   Requirements
 * 
 *     Requirement Title:
 *     - Text used when drawing the learning requirements.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Requirement Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Not Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Level:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Requirement Skill:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Requirement Switch:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Cost Title:
 *     - Text used when drawing the learning costs.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Cost Name:
 *     - Text used to label the resource being consumed.
 * 
 *     Cost Quantity:
 *     - Text used to label the cost of the resource.
 * 
 *     Cost of Owned:
 *     - Text used to label the amount of the resource in possession.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Confirm Window
 * 
 *   Confirm Text:
 *   - Text used for the Confirm command.
 *   - Text codes can be used.
 * 
 *   Cancel Text:
 *   - Text used for the Cancel command.
 *   - Text codes can be used.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Ability Points Settings
 * ============================================================================
 *
 * Ability Points are an actor-only resource used as a currency for this
 * plugin. You can determine how they appear in-game, how they're earned, and
 * what kind of mechanics are involved with them. Ability Points can also be 
 * used in other VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Ability Points:
 *   - Do you want Ability Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Ability Points an actor can have?
 *   - Use 0 for unlimited Ability Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Ability Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Ability Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Ability Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Ability Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Ability Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Ability Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Ability Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Ability Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much AP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Ability Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Ability Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawAbilityPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorAbilityPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Ability Points aren't shared or if you want the Ability
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Points Settings
 * ============================================================================
 *
 * Skill Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Skill Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Skill Points:
 *   - Do you want Skill Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Skill Points an actor can have?
 *   - Use 0 for unlimited Skill Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Skill Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Skill Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Skill Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Skill Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Skill Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Skill Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Skill Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much SP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Skill Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Skill Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawSkillPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorSkillPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Skill Points aren't shared or if you want the Skill
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
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
 * Version 1.09: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: March 24, 2022
 * * Documentation Update!
 * ** Fixed a typo for missing a "/" in the <Learn Skills> group notetag.
 * 
 * Version 1.07: February 10, 2022
 * * Bug Fixes!
 * ** Costs for CP and JP will have better fail safes to not automatically
 *    reduce to 0 under specific conditions when learning skills. Fix by Arisu.
 * 
 * Version 1.06: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Learn Skill Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      skill's icon during learning instead.
 * 
 * Version 1.04: December 18, 2020
 * * Bug Fixes!
 * ** Notetags that utilize multiple numeric ID's instead of skill names should
 *    now be working properly. Fix made by Yanfly.
 * 
 * Version 1.03: December 11, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** The Plugin Parameter for "Displayed Costs" have been updated to contain
 *    compatibility for a future plugin.
 * ** The Plugin Parameter for "JS: Draw Status" has been updated to contain
 *    compatibility for a future plugin.
 * *** To quickly acquire the new changes for the above Plugin Parameters,
 *     delete the "General" settings from the main Plugin Parameters page, then
 *     open them up again. These settings will be defaulted to the new
 *     additions added for the plugin. Warning! Old settings will be lost.
 * * New Features!
 * ** Added <Learn CP Cost: x>, <Learn JP Cost: x>, <JS Learn CP Cost>,
 *    <JS Learn JP Cost> notetags. Added by Arisu.
 * 
 * Version 1.02: November 29, 2020
 * * Bug Fixes!
 * ** The plugin should no longer be dependent on Skills & States Core. Fix
 *    made by Arisu.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** Game no longer crashes when displaying AP/SP rewards for those without
 *    the Victory Aftermath plugin. Fix made by Yanfly.
 *
 * Version 1.00: November 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsGain
 * @text Ability Points: Gain
 * @desc The target actor(s) gains Ability Points.
 * Gained amounts are affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsAdd
 * @text Ability Points: Add
 * @desc The target actor(s) receives Ability Points.
 * Received amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsLose
 * @text Ability Points: Lose
 * @desc The target actor(s) loses Ability Points.
 * Lost amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsSet
 * @text Ability Points: Set
 * @desc Changes the exact Ability Points for the target actor(s).
 * Changed amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsGain
 * @text Skill Points: Gain
 * @desc The target actor(s) gains Skill Points.
 * Gained amounts are affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsAdd
 * @text Skill Points: Add
 * @desc The target actor(s) receives Skill Points.
 * Received amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsLose
 * @text Skill Points: Lose
 * @desc The target actor(s) loses Skill Points.
 * Lost amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsSet
 * @text Skill Points: Set
 * @desc Changes the exact Skill Points for the target actor(s).
 * Changed amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowSkillLearnSystemMenu
 * @text System: Show Skill Learn in Skill Menu?
 * @desc Shows/hides Skill Learn inside the skill menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Skill Learn inside the skill menu.
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
 * @param SkillLearnSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Scene_SkillLearn
 *
 * @param General:struct
 * @text General Settings
 * @parent Scene_SkillLearn
 * @type struct<General>
 * @desc General settings for the Skill Learn System.
 * @default {"Visual":"","DisplayedCosts:arraystr":"[\"AP\",\"SP\",\"Item\",\"Weapon\",\"Armor\",\"Gold\"]","StatusWindowDrawJS:func":"\"// Draw Face\\nconst fx = this.colSpacing() / 2;\\nconst fh = this.innerHeight;\\nconst fy = fh / 2 - this.lineHeight() * 1.5;\\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\\n\\n// Return if Window Size is Too Small\\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\\nlet sw = this.innerWidth - sx - 2;\\nif (sw < 300) return;\\n\\n// Draw Costs\\n// Compatibility Target\\nconst costs = this.getSkillLearnDisplayedCosts();\\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\\nconst maxCol = Math.ceil(costs.length / maxEntries);\\nlet cx = sx;\\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\\nconst by = cy;\\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\\nif (maxCol === 1) {\\n    cw = Math.min(ImageManager.faceWidth, cw);\\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\\n}\\nfor (const cost of costs) {\\n    switch (cost) {\\n\\n        case 'AP':\\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'CP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'JP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'SP':\\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'Gold':\\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\\n            break;\\n\\n        default:\\n            continue;\\n    }\\n    cy += this.lineHeight();\\n    if (cy + this.lineHeight() > this.innerHeight) {\\n        cy = by;\\n        cx += cw + (this.itemPadding() * 2);\\n    }\\n}\"","Vocabulary":"","Learned:str":"Learned","Requirements":"","RequireFmt:str":"Requires %1","ReqSeparateFmt:str":"%1, %2","ReqLevelFmt:str":"\\C[16]%3\\C[0]%1","ReqSkillFmt:str":"%1\\C[16]%2\\C[0]","ReqSwitchFmt:str":"\\C[16]%1\\C[0]","Costs":"","SeparationFmt:str":"%1  %2","ItemFmt:str":"×%1%2","WeaponFmt:str":"×%1%2","ArmorFmt:str":"×%1%2","GoldFmt:str":"×%1%2"}
 *
 * @param MenuAccess:struct
 * @text Menu Access Settings
 * @parent Scene_SkillLearn
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Skill Learn System.
 * @default {"Name:str":"Learn","Icon:num":"87","ShowMenu:eval":"true"}
 *
 * @param Animation:struct
 * @text Animation Settings
 * @parent Scene_SkillLearn
 * @type struct<Animation>
 * @desc Animation settings for the Skill Learn System.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"true","Animations:arraynum":"[\"40\",\"48\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Learn Sound Effect
 * @parent Scene_SkillLearn
 * @type struct<Sound>
 * @desc Settings for the sound effect played when learning a new skill through the Skill Learn System.
 * @default {"name:str":"Skill3","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param Window:struct
 * @text Window Settings
 * @parent Scene_SkillLearn
 * @type struct<Window>
 * @desc Window settings for the Skill Learn System.
 * @default {"DetailWindow":"","Requirements":"","RequirementTitle:str":"\\C[16]%1%2 Requirements\\C[0]","ReqMetFmt:str":"\\C[24]✔ %1\\C[0]","ReqNotMetFmt:str":"\\C[0]✘ %1\\C[0]","ReqLevelFmt:str":"\\I[87]%2 %1 Reached","ReqSkillFmt:str":"%1%2 Learned","ReqSwitchFmt:str":"\\I[160]%1","Costs":"","LearningTitle:str":"\\C[16]Learning\\C[0] %1%2","IngredientName:str":"\\C[16]Resource\\C[0]","IngredientCost:str":"\\C[16]Cost\\C[0]","IngredientOwned:str":"\\C[16]Owned\\C[0]","DetailWindow_BgType:num":"0","DetailWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y;\\nconst ww = skillWindowRect.width;\\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","ConfirmWindow":"","ConfirmCmd:str":"\\I[164]Learn","CancelCmd:str":"\\I[168]Cancel","ConfirmWindow_BgType:num":"0","ConfirmWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst ww = skillWindowRect.width;\\nconst wh = this.calcWindowHeight(2, false);\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param AbilityPoints:struct
 * @text Ability Points Settings
 * @parent Resources
 * @type struct<AbilityPoints>
 * @desc Settings for Ability Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","DefaultCost:num":"0","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"78","Vocabulary":"","FullText:str":"Ability Points","AbbrText:str":"AP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(5)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(10)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
 *
 * @param SkillPoints:struct
 * @text Skill Points Settings
 * @parent Resources
 * @type struct<SkillPoints>
 * @desc Settings for Skill Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","DefaultCost:num":"1","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"79","Vocabulary":"","FullText:str":"Skill Points","AbbrText:str":"SP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
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
 * @param Visual
 * 
 * @param DisplayedCosts:arraystr
 * @text Displayed Costs
 * @parent Visual
 * @type select[]
 * @option AP - Ability Points
 * @value AP
 * @option CP - Class Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value CP
 * @option JP - Job Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value JP
 * @option SP - Skill Points
 * @value SP
 * @option Item - Item Costs
 * @value Item
 * @option Weapon - Weapon Costs
 * @value Weapon
 * @option Armor - Armor Costs
 * @value Armor
 * @option Gold - Gold Costs
 * @value Gold
 * @desc Select which cost types to display in the skill entry.
 * This also determines the order they are displayed.
 * @default ["AP","SP","Item","Weapon","Armor","Gold"]
 *
 * @param StatusWindowDrawJS:func
 * @text JS: Draw Status
 * @parent Visual
 * @type note
 * @desc JavaScript code used to draw in Window_SkillStatus when the Skill Learn System is active.
 * @default "// Draw Face\nconst fx = this.colSpacing() / 2;\nconst fh = this.innerHeight;\nconst fy = fh / 2 - this.lineHeight() * 1.5;\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\n\n// Return if Window Size is Too Small\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\nlet sw = this.innerWidth - sx - 2;\nif (sw < 300) return;\n\n// Draw Costs\n// Compatibility Target\nconst costs = this.getSkillLearnDisplayedCosts();\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\nconst maxCol = Math.ceil(costs.length / maxEntries);\nlet cx = sx;\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\nconst by = cy;\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\nif (maxCol === 1) {\n    cw = Math.min(ImageManager.faceWidth, cw);\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\n}\nfor (const cost of costs) {\n    switch (cost) {\n\n        case 'AP':\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'CP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'JP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'SP':\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'Gold':\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\n            break;\n\n        default:\n            continue;\n    }\n    cy += this.lineHeight();\n    if (cy + this.lineHeight() > this.innerHeight) {\n        cy = by;\n        cx += cw + (this.itemPadding() * 2);\n    }\n}"
 *
 * @param Vocabulary
 *
 * @param Learned:str
 * @text Learned Text
 * @parent Vocabulary
 * @desc This is the text that appears if the skill has been
 * learned. You may use text codes.
 * @default Learned
 *
 * @param Requirements
 * @parent Vocabulary
 *
 * @param RequireFmt:str
 * @text Requirement Header
 * @parent Requirements
 * @desc Header for requirements.
 * %1 - Requirements (all of them)
 * @default Requires %1
 *
 * @param ReqSeparateFmt:str
 * @text Separation Format
 * @parent Requirements
 * @desc This determines how the requirements are separated.
 * %1 - Previous Requirement, %2 - Second Requirement
 * @default %1, %2
 *
 * @param ReqLevelFmt:str
 * @text Level Format
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \C[16]%3\C[0]%1
 *
 * @param ReqSkillFmt:str
 * @text Skill Format
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1\C[16]%2\C[0]
 *
 * @param ReqSwitchFmt:str
 * @text Switch Format
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \C[16]%1\C[0]
 *
 * @param Costs
 * @parent Vocabulary
 *
 * @param SeparationFmt:str
 * @text Separation Format
 * @parent Costs
 * @desc This determines how the costs are separated from one another.
 * %1 - Previous Cost, %2 - Second Cost
 * @default %1  %2
 *
 * @param ItemFmt:str
 * @text Item Format
 * @parent Costs
 * @desc Determine how items are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Item Name
 * @default ×%1%2
 *
 * @param WeaponFmt:str
 * @text Weapon Format
 * @parent Costs
 * @desc Determine how weapons are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * @default ×%1%2
 *
 * @param ArmorFmt:str
 * @text Armor Format
 * @parent Costs
 * @desc Determine how armors are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Armor Name
 * @default ×%1%2
 *
 * @param GoldFmt:str
 * @text Gold Format
 * @parent Costs
 * @desc Determine how gold is displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 * @default ×%1%2
 *
 */
/* ----------------------------------------------------------------------------
 * MenuAccess Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @desc Name of the 'Skill Learn' option in the Menu.
 * @default Learn
 *
 * @param Icon:num
 * @text Icon
 * @desc What is the icon you want to use to represent Skill Learn?
 * @default 87
 *
 * @param ShowMenu:eval
 * @text Show in Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Skill Learn' option to the Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when learning a skill?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during a skill learn animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when learning.
 * @default ["40","48"]
 *
 * @param Sprite
 * @text Skill Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the skill sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the icon to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill3
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param DetailWindow
 * @text Detail Window
 * 
 * @param Requirements
 * @parent DetailWindow
 *
 * @param RequirementTitle:str
 * @text Requirement Title
 * @parent Requirements
 * @desc Text used when drawing the learning requirements.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]%1%2 Requirements\C[0]
 *
 * @param ReqMetFmt:str
 * @text Requirement Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[24]✔ %1\C[0]
 *
 * @param ReqNotMetFmt:str
 * @text Requirement Not Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[0]✘ %1\C[0]
 *
 * @param ReqLevelFmt:str
 * @text Requirement Level
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \I[87]%2 %1 Reached
 *
 * @param ReqSkillFmt:str
 * @text Requirement Skill
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1%2 Learned
 *
 * @param ReqSwitchFmt:str
 * @text Requirement Switch
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \I[160]%1
 * 
 * @param Costs
 * @parent DetailWindow
 *
 * @param LearningTitle:str
 * @text Cost Title
 * @parent Costs
 * @desc Text used when drawing the learning costs.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]Learning\C[0] %1%2
 *
 * @param IngredientName:str
 * @text Cost Name
 * @parent Costs
 * @desc Text used to label the resource being consumed.
 * @default \C[16]Resource\C[0]
 *
 * @param IngredientCost:str
 * @text Cost Quantity
 * @parent Costs
 * @desc Text used to label the cost of the resource.
 * @default \C[16]Cost\C[0]
 *
 * @param IngredientOwned:str
 * @text Cost of Owned
 * @parent Costs
 * @desc Text used to label the amount of the resource in possession.
 * @default \C[16]Owned\C[0]
 *
 * @param DetailWindow_BgType:num
 * @text Background Type
 * @parent DetailWindow
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
 * @param DetailWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent DetailWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y;\nconst ww = skillWindowRect.width;\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ConfirmWindow
 * @text Confirm Window
 *
 * @param ConfirmCmd:str
 * @text Confirm Text
 * @parent ConfirmWindow
 * @desc Text used for the Confirm command.
 * Text codes can be used.
 * @default \I[164]Learn
 *
 * @param CancelCmd:str
 * @text Cancel Text
 * @parent ConfirmWindow
 * @desc Text used for the Cancel command.
 * Text codes can be used.
 * @default \I[168]Cancel
 *
 * @param ConfirmWindow_BgType:num
 * @text Background Type
 * @parent ConfirmWindow
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
 * @param ConfirmWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent ConfirmWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst ww = skillWindowRect.width;\nconst wh = this.calcWindowHeight(2, false);\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Ability Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AbilityPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Ability Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Ability Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default true
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type number
 * @desc What's the default AP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 0
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Ability Points an actor can have?
 * Use 0 for unlimited Ability Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Ability Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Ability Points?
 * @default 78
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Ability Points appears in-game.
 * @default Ability Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Ability Points appears in-game.
 * @default AP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Ability Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(5)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Ability Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Ability Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(10)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Ability Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much AP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Ability Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Skill Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Skill Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type number
 * @desc What's the default SP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 1
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Skill Points an actor can have?
 * Use 0 for unlimited Skill Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Skill Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Skill Points?
 * @default 79
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Skill Points appears in-game.
 * @default Skill Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Skill Points appears in-game.
 * @default SP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[4]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Skill Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Skill Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Skill Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Skill Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much SP an actor has earned in battle during the
 * victory phase?
 * @default false
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Skill Points as
 * the main acquired resource in the actor windows?
 * @default false
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
//=============================================================================

const _0x49f14c=_0x2ae0;(function(_0x16b2f1,_0x5d9bdb){const _0x453f9c=_0x2ae0,_0x5b6f0a=_0x16b2f1();while(!![]){try{const _0x31bec9=-parseInt(_0x453f9c(0x237))/0x1*(-parseInt(_0x453f9c(0x20d))/0x2)+-parseInt(_0x453f9c(0x1e5))/0x3+-parseInt(_0x453f9c(0x261))/0x4+-parseInt(_0x453f9c(0x281))/0x5*(parseInt(_0x453f9c(0xec))/0x6)+parseInt(_0x453f9c(0x263))/0x7+-parseInt(_0x453f9c(0x236))/0x8+parseInt(_0x453f9c(0xfb))/0x9*(parseInt(_0x453f9c(0x248))/0xa);if(_0x31bec9===_0x5d9bdb)break;else _0x5b6f0a['push'](_0x5b6f0a['shift']());}catch(_0x17e459){_0x5b6f0a['push'](_0x5b6f0a['shift']());}}}(_0x31ee,0x1b369));function _0x2ae0(_0x3ad01c,_0x9d7b88){const _0x31eebf=_0x31ee();return _0x2ae0=function(_0x2ae0a4,_0x3fa165){_0x2ae0a4=_0x2ae0a4-0x9e;let _0x2fa1f0=_0x31eebf[_0x2ae0a4];return _0x2fa1f0;},_0x2ae0(_0x3ad01c,_0x9d7b88);}var label=_0x49f14c(0xd7),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x125a38){const _0x5ba8ca=_0x49f14c;return _0x125a38['status']&&_0x125a38[_0x5ba8ca(0x21b)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x49f14c(0x211)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x49f14c(0x172)]=function(_0x5f5703,_0x66b166){const _0x17da3e=_0x49f14c;for(const _0x539fb4 in _0x66b166){if(_0x539fb4['match'](/(.*):(.*)/i)){const _0x3bb096=String(RegExp['$1']),_0x544a11=String(RegExp['$2'])[_0x17da3e(0xb7)]()[_0x17da3e(0x206)]();let _0x4f679a,_0x65d396,_0x174c9d;switch(_0x544a11){case'NUM':_0x4f679a=_0x66b166[_0x539fb4]!==''?Number(_0x66b166[_0x539fb4]):0x0;break;case _0x17da3e(0x22b):_0x65d396=_0x66b166[_0x539fb4]!==''?JSON[_0x17da3e(0x169)](_0x66b166[_0x539fb4]):[],_0x4f679a=_0x65d396[_0x17da3e(0x23a)](_0x2b26c4=>Number(_0x2b26c4));break;case _0x17da3e(0x24e):_0x4f679a=_0x66b166[_0x539fb4]!==''?eval(_0x66b166[_0x539fb4]):null;break;case _0x17da3e(0xe6):_0x65d396=_0x66b166[_0x539fb4]!==''?JSON['parse'](_0x66b166[_0x539fb4]):[],_0x4f679a=_0x65d396['map'](_0x1befbf=>eval(_0x1befbf));break;case _0x17da3e(0x11e):_0x4f679a=_0x66b166[_0x539fb4]!==''?JSON[_0x17da3e(0x169)](_0x66b166[_0x539fb4]):'';break;case _0x17da3e(0x15e):_0x65d396=_0x66b166[_0x539fb4]!==''?JSON[_0x17da3e(0x169)](_0x66b166[_0x539fb4]):[],_0x4f679a=_0x65d396['map'](_0x12f5e7=>JSON[_0x17da3e(0x169)](_0x12f5e7));break;case _0x17da3e(0x287):_0x4f679a=_0x66b166[_0x539fb4]!==''?new Function(JSON[_0x17da3e(0x169)](_0x66b166[_0x539fb4])):new Function(_0x17da3e(0xd9));break;case _0x17da3e(0xe8):_0x65d396=_0x66b166[_0x539fb4]!==''?JSON[_0x17da3e(0x169)](_0x66b166[_0x539fb4]):[],_0x4f679a=_0x65d396['map'](_0x4b051d=>new Function(JSON[_0x17da3e(0x169)](_0x4b051d)));break;case _0x17da3e(0x13a):_0x4f679a=_0x66b166[_0x539fb4]!==''?String(_0x66b166[_0x539fb4]):'';break;case _0x17da3e(0xc9):_0x65d396=_0x66b166[_0x539fb4]!==''?JSON['parse'](_0x66b166[_0x539fb4]):[],_0x4f679a=_0x65d396[_0x17da3e(0x23a)](_0x4b3d5e=>String(_0x4b3d5e));break;case _0x17da3e(0x1bf):_0x174c9d=_0x66b166[_0x539fb4]!==''?JSON['parse'](_0x66b166[_0x539fb4]):{},_0x4f679a=VisuMZ['ConvertParams']({},_0x174c9d);break;case'ARRAYSTRUCT':_0x65d396=_0x66b166[_0x539fb4]!==''?JSON[_0x17da3e(0x169)](_0x66b166[_0x539fb4]):[],_0x4f679a=_0x65d396[_0x17da3e(0x23a)](_0x804c3=>VisuMZ[_0x17da3e(0x172)]({},JSON['parse'](_0x804c3)));break;default:continue;}_0x5f5703[_0x3bb096]=_0x4f679a;}}return _0x5f5703;},(_0x59db3a=>{const _0x3f8739=_0x49f14c,_0x8d473b=_0x59db3a[_0x3f8739(0x14c)];for(const _0x1e9774 of dependencies){if(!Imported[_0x1e9774]){alert(_0x3f8739(0x294)[_0x3f8739(0x207)](_0x8d473b,_0x1e9774)),SceneManager[_0x3f8739(0x116)]();break;}}const _0x28b30b=_0x59db3a[_0x3f8739(0x21b)];if(_0x28b30b['match'](/\[Version[ ](.*?)\]/i)){const _0x578876=Number(RegExp['$1']);_0x578876!==VisuMZ[label]['version']&&(alert(_0x3f8739(0xfd)[_0x3f8739(0x207)](_0x8d473b,_0x578876)),SceneManager[_0x3f8739(0x116)]());}if(_0x28b30b[_0x3f8739(0x202)](/\[Tier[ ](\d+)\]/i)){const _0x548c2e=Number(RegExp['$1']);_0x548c2e<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x3f8739(0x207)](_0x8d473b,_0x548c2e,tier)),SceneManager[_0x3f8739(0x116)]()):tier=Math[_0x3f8739(0x16e)](_0x548c2e,tier);}VisuMZ[_0x3f8739(0x172)](VisuMZ[label][_0x3f8739(0x211)],_0x59db3a[_0x3f8739(0xfa)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x49f14c(0x14c)],_0x49f14c(0x187),_0x36a387=>{const _0x49604f=_0x49f14c;VisuMZ[_0x49604f(0x172)](_0x36a387,_0x36a387);const _0x35e9e8=_0x36a387[_0x49604f(0x1be)][_0x49604f(0x23a)](_0x3073d2=>$gameActors['actor'](_0x3073d2)),_0x12fcff=_0x36a387[_0x49604f(0x173)],_0x31d851=_0x36a387[_0x49604f(0xdd)];for(const _0x394f4c of _0x35e9e8){if(!_0x394f4c)continue;for(const _0xc4e4aa of _0x12fcff){_0x394f4c['gainAbilityPoints'](_0x31d851,_0xc4e4aa);}}}),PluginManager['registerCommand'](pluginData['name'],'AbilityPointsAdd',_0x22bd82=>{const _0x4617ff=_0x49f14c;VisuMZ[_0x4617ff(0x172)](_0x22bd82,_0x22bd82);const _0x1f5c2c=_0x22bd82[_0x4617ff(0x1be)][_0x4617ff(0x23a)](_0x15ff6d=>$gameActors[_0x4617ff(0x21a)](_0x15ff6d)),_0x19eb11=_0x22bd82[_0x4617ff(0x173)],_0x30fd2b=_0x22bd82[_0x4617ff(0xdd)];for(const _0x370c17 of _0x1f5c2c){if(!_0x370c17)continue;for(const _0x58c474 of _0x19eb11){_0x370c17[_0x4617ff(0x163)](_0x30fd2b,_0x58c474);}}}),PluginManager[_0x49f14c(0x1ca)](pluginData[_0x49f14c(0x14c)],_0x49f14c(0xbd),_0x491c25=>{const _0x265513=_0x49f14c;VisuMZ[_0x265513(0x172)](_0x491c25,_0x491c25);const _0xdf0ff8=_0x491c25[_0x265513(0x1be)][_0x265513(0x23a)](_0x59e74f=>$gameActors[_0x265513(0x21a)](_0x59e74f)),_0x446858=_0x491c25[_0x265513(0x173)],_0x4737c4=_0x491c25['Points'];for(const _0x14ddac of _0xdf0ff8){if(!_0x14ddac)continue;for(const _0x1fd808 of _0x446858){_0x14ddac['loseAbilityPoints'](_0x4737c4,_0x1fd808);}}}),PluginManager[_0x49f14c(0x1ca)](pluginData[_0x49f14c(0x14c)],_0x49f14c(0x10a),_0x1be06b=>{const _0x33c753=_0x49f14c;VisuMZ[_0x33c753(0x172)](_0x1be06b,_0x1be06b);const _0x1ab399=_0x1be06b[_0x33c753(0x1be)][_0x33c753(0x23a)](_0xc09782=>$gameActors[_0x33c753(0x21a)](_0xc09782)),_0x2c296f=_0x1be06b[_0x33c753(0x173)],_0xa97b47=_0x1be06b[_0x33c753(0xdd)];for(const _0x45ecbb of _0x1ab399){if(!_0x45ecbb)continue;for(const _0xa3d016 of _0x2c296f){_0x45ecbb['setAbilityPoints'](_0xa97b47,_0xa3d016);}}}),PluginManager[_0x49f14c(0x1ca)](pluginData['name'],'SkillPointsGain',_0x28465b=>{const _0x2bed14=_0x49f14c;VisuMZ[_0x2bed14(0x172)](_0x28465b,_0x28465b);const _0x549b93=_0x28465b[_0x2bed14(0x1be)]['map'](_0x444a84=>$gameActors[_0x2bed14(0x21a)](_0x444a84)),_0x53e29d=_0x28465b[_0x2bed14(0x173)],_0x3fa389=_0x28465b[_0x2bed14(0xdd)];for(const _0x157674 of _0x549b93){if(!_0x157674)continue;for(const _0x30ddfd of _0x53e29d){_0x157674[_0x2bed14(0x212)](_0x3fa389,_0x30ddfd);}}}),PluginManager[_0x49f14c(0x1ca)](pluginData[_0x49f14c(0x14c)],_0x49f14c(0x198),_0x4e0501=>{const _0x19ca8c=_0x49f14c;VisuMZ[_0x19ca8c(0x172)](_0x4e0501,_0x4e0501);const _0x24b4db=_0x4e0501['Actors'][_0x19ca8c(0x23a)](_0x681283=>$gameActors[_0x19ca8c(0x21a)](_0x681283)),_0x1a8864=_0x4e0501[_0x19ca8c(0x173)],_0x312e22=_0x4e0501[_0x19ca8c(0xdd)];for(const _0x234d53 of _0x24b4db){if(!_0x234d53)continue;for(const _0x37efdd of _0x1a8864){_0x234d53['addSkillPoints'](_0x312e22,_0x37efdd);}}}),PluginManager[_0x49f14c(0x1ca)](pluginData[_0x49f14c(0x14c)],'SkillPointsLose',_0x4dcd37=>{const _0x34e974=_0x49f14c;VisuMZ[_0x34e974(0x172)](_0x4dcd37,_0x4dcd37);const _0x29c532=_0x4dcd37[_0x34e974(0x1be)][_0x34e974(0x23a)](_0xedcceb=>$gameActors[_0x34e974(0x21a)](_0xedcceb)),_0x1576cb=_0x4dcd37[_0x34e974(0x173)],_0x1ac8d7=_0x4dcd37['Points'];for(const _0x3fdc65 of _0x29c532){if(!_0x3fdc65)continue;for(const _0x496d1f of _0x1576cb){_0x3fdc65[_0x34e974(0x129)](_0x1ac8d7,_0x496d1f);}}}),PluginManager[_0x49f14c(0x1ca)](pluginData[_0x49f14c(0x14c)],_0x49f14c(0x136),_0x1fcf25=>{const _0x3630c0=_0x49f14c;VisuMZ[_0x3630c0(0x172)](_0x1fcf25,_0x1fcf25);const _0xbabb29=_0x1fcf25[_0x3630c0(0x1be)][_0x3630c0(0x23a)](_0x377be6=>$gameActors[_0x3630c0(0x21a)](_0x377be6)),_0x112a3f=_0x1fcf25[_0x3630c0(0x173)],_0x2e74f2=_0x1fcf25[_0x3630c0(0xdd)];for(const _0x18ee04 of _0xbabb29){if(!_0x18ee04)continue;for(const _0x103d46 of _0x112a3f){_0x18ee04[_0x3630c0(0xa6)](_0x2e74f2,_0x103d46);}}}),PluginManager[_0x49f14c(0x1ca)](pluginData[_0x49f14c(0x14c)],_0x49f14c(0x16c),_0x21297b=>{const _0x3cb081=_0x49f14c;VisuMZ[_0x3cb081(0x172)](_0x21297b,_0x21297b),$gameSystem[_0x3cb081(0x18c)](_0x21297b[_0x3cb081(0xdb)]);}),VisuMZ['SkillLearnSystem'][_0x49f14c(0x18d)]=Scene_Boot[_0x49f14c(0x284)][_0x49f14c(0x118)],Scene_Boot[_0x49f14c(0x284)]['onDatabaseLoaded']=function(){const _0x16cdb3=_0x49f14c;VisuMZ[_0x16cdb3(0xd7)][_0x16cdb3(0x18d)][_0x16cdb3(0x24d)](this),this[_0x16cdb3(0x1f5)]();},Scene_Boot[_0x49f14c(0x284)][_0x49f14c(0x1f5)]=function(){const _0xcc3187=_0x49f14c;if(VisuMZ[_0xcc3187(0x123)])return;this[_0xcc3187(0x1d8)]();},VisuMZ[_0x49f14c(0xd7)]['RegExp']={'StartingAbilityPoints':/<STARTING (?:ABILITY POINTS|AP):[ ](.*)>/i,'StartClassAbilityPoints':/<CLASS (.*) STARTING (?:ABILITY POINTS|AP):[ ](.*)>/gi,'UserGainAbilityPoints':/<(?:ABILITY POINTS|AP|USER ABILITY POINTS|USER AP) GAIN:[ ](.*)>/i,'TargetGainAbilityPoints':/<TARGET (?:ABILITY POINTS|AP) GAIN:[ ](.*)>/i,'EnemyAbilityPoints':/<(?:ABILITY POINTS|AP):[ ](.*)>/i,'AbilityPointsRate':/<(?:ABILITY POINTS|AP) RATE:[ ](\d+)([%％])>/i,'StartingSkillPoints':/<STARTING (?:SKILL POINTS|SP):[ ](.*)>/i,'StartClassSkillPoints':/<CLASS (.*) STARTING (?:SKILL POINTS|SP):[ ](.*)>/gi,'UserGainSkillPoints':/<(?:SKILL POINTS|SP|USER SKILL POINTS|USER SP) GAIN:[ ](.*)>/i,'TargetGainSkillPoints':/<TARGET (?:SKILL POINTS|SP) GAIN:[ ](.*)>/i,'EnemySkillPoints':/<(?:SKILL POINTS|SP):[ ](.*)>/i,'SkillPointsRate':/<(?:SKILL POINTS|SP) RATE:[ ](\d+)([%％])>/i,'LearnSkillA':/<LEARN (?:SKILL|SKILLS):[ ](.*)>/gi,'LearnSkillB':/<LEARN (?:SKILL|SKILLS)>\s*([\s\S]*)\s*<\/LEARN (?:SKILL|SKILLS)>/i,'LearnApCost':/<LEARN (?:ABILITY POINTS|AP) COST:[ ](\d+)>/i,'LearnCpCost':/<LEARN (?:CLASS POINTS|CP) COST:[ ](\d+)>/i,'LearnJpCost':/<LEARN (?:JOB POINTS|JP) COST:[ ](\d+)>/i,'LearnSpCost':/<LEARN (?:SKILL POINTS|SP) COST:[ ](\d+)>/i,'LearnItemCost':/<LEARN ITEM (.*) COST:[ ](\d+)>/gi,'LearnWeaponCost':/<LEARN WEAPON (.*) COST:[ ](\d+)>/gi,'LearnArmorCost':/<LEARN ARMOR (.*) COST:[ ](\d+)>/gi,'LearnGoldCost':/<LEARN GOLD COST:[ ](\d+)>/i,'LearnCostBatch':/<LEARN SKILL (?:COST|COSTS)>\s*([\s\S]*)\s*<\/LEARN SKILL (?:COST|COSTS)>/i,'LearnShowLevel':/<LEARN SHOW LEVEL:[ ](\d+)>/i,'LearnShowSkillsAll':/<LEARN SHOW (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnShowSkillsAny':/<LEARN SHOW ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnShowSwitchesAll':/<LEARN SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnShowSwitchesAny':/<LEARN SHOW ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'LearnReqLevel':/<LEARN REQUIRE LEVEL:[ ](\d+)>/i,'LearnReqSkillsAll':/<LEARN REQUIRE (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnReqSkillsAny':/<LEARN REQUIRE ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnReqSwitchesAll':/<LEARN REQUIRE (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnReqSwitchesAny':/<LEARN REQUIRE ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'animationIDs':/<LEARN SKILL (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<LEARN SKILL FADE SPEED:[ ](\d+)>/i,'learnPicture':/<LEARN SKILL (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'jsLearnApCost':/<JS LEARN (?:ABILITY POINTS|AP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:ABILITY POINTS|AP) COST>/i,'jsLearnCpCost':/<JS LEARN (?:CLASS POINTS|CP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:CLASS POINTS|CP) COST>/i,'jsLearnJpCost':/<JS LEARN (?:JOB POINTS|JP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:JOB POINTS|JP) COST>/i,'jsLearnSpCost':/<JS LEARN (?:SKILL POINTS|SP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:SKILL POINTS|SP) COST>/i,'jsLearnShow':/<JS LEARN (?:SHOW|VISIBLE)>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE)>/i,'jsLearnShowListTxt':/<JS LEARN (?:SHOW|VISIBLE) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) LIST TEXT>/i,'jsLearnShowDetailTxt':/<JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>/i,'jsLearnReq':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS)>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS)>/i,'jsLearnReqListTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>/i,'jsLearnReqDetailTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>/i,'jsOnLearn':/<JS ON LEARN SKILL>\s*([\s\S]*)\s*<\/JS ON LEARN SKILL>/i},VisuMZ['SkillLearnSystem']['JS']={},Scene_Boot['prototype'][_0x49f14c(0x1d8)]=function(){const _0x207cc0=_0x49f14c,_0xb8809e=$dataActors[_0x207cc0(0xe0)]($dataSkills);for(const _0x1613ec of _0xb8809e){if(!_0x1613ec)continue;VisuMZ['SkillLearnSystem'][_0x207cc0(0x264)](_0x1613ec);}},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x10f)]=VisuMZ[_0x49f14c(0x10f)],VisuMZ[_0x49f14c(0x10f)]=function(_0x25c217){const _0x5cf064=_0x49f14c;VisuMZ[_0x5cf064(0xd7)]['ParseSkillNotetags'][_0x5cf064(0x24d)](this,_0x25c217),VisuMZ[_0x5cf064(0xd7)][_0x5cf064(0x264)](_0x25c217);},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x264)]=function(_0x1531d0){const _0x494c89=_0x49f14c,_0x3c142c=VisuMZ['SkillLearnSystem'][_0x494c89(0x1cb)];VisuMZ[_0x494c89(0xd7)]['createCostJS'](_0x1531d0,_0x494c89(0x1cd),_0x3c142c['jsLearnApCost']),VisuMZ[_0x494c89(0xd7)]['createCostJS'](_0x1531d0,'jsLearnCpCost',_0x3c142c[_0x494c89(0x1d9)]),VisuMZ['SkillLearnSystem'][_0x494c89(0xb5)](_0x1531d0,_0x494c89(0x19f),_0x3c142c[_0x494c89(0x19f)]),VisuMZ[_0x494c89(0xd7)]['createCostJS'](_0x1531d0,_0x494c89(0xb4),_0x3c142c[_0x494c89(0xb4)]),VisuMZ['SkillLearnSystem'][_0x494c89(0x15f)](_0x1531d0,_0x494c89(0x23c),_0x3c142c[_0x494c89(0x23c)]),VisuMZ[_0x494c89(0xd7)][_0x494c89(0x1b0)](_0x1531d0,_0x494c89(0x249),_0x3c142c[_0x494c89(0x249)]),VisuMZ[_0x494c89(0xd7)][_0x494c89(0xb1)](_0x1531d0,_0x494c89(0x125),_0x3c142c['jsLearnShowListTxt']),VisuMZ['SkillLearnSystem'][_0x494c89(0xb1)](_0x1531d0,'jsLearnShowDetailTxt',_0x3c142c['jsLearnShowDetailTxt']),VisuMZ['SkillLearnSystem'][_0x494c89(0xb1)](_0x1531d0,_0x494c89(0x1c9),_0x3c142c[_0x494c89(0x1c9)]),VisuMZ['SkillLearnSystem'][_0x494c89(0xb1)](_0x1531d0,_0x494c89(0x1b4),_0x3c142c['jsLearnReqDetailTxt']),VisuMZ[_0x494c89(0xd7)][_0x494c89(0x289)](_0x1531d0,'jsOnLearn',_0x3c142c[_0x494c89(0x1e4)]);},VisuMZ['SkillLearnSystem'][_0x49f14c(0xb5)]=function(_0x1372a3,_0x36efe4,_0x4731a4){const _0x92a14e=_0x49f14c,_0x166378=_0x1372a3[_0x92a14e(0x1f8)];if(_0x166378[_0x92a14e(0x202)](_0x4731a4)){const _0x34f8ed=String(RegExp['$1']),_0x859754=_0x92a14e(0x27d)[_0x92a14e(0x207)](_0x34f8ed),_0x55a9ef=VisuMZ['SkillLearnSystem'][_0x92a14e(0x183)](_0x1372a3,_0x36efe4);VisuMZ['SkillLearnSystem']['JS'][_0x55a9ef]=new Function(_0x859754);}},VisuMZ[_0x49f14c(0xd7)]['createVisibleJS']=function(_0x2efca2,_0x529a35,_0x439479){const _0x2f9a56=_0x49f14c,_0x5639a8=_0x2efca2[_0x2f9a56(0x1f8)];if(_0x5639a8['match'](_0x439479)){const _0x19e8cb=String(RegExp['$1']),_0x1bff4e=_0x2f9a56(0x181)['format'](_0x19e8cb),_0x4cb4b1=VisuMZ[_0x2f9a56(0xd7)]['createKeyJS'](_0x2efca2,_0x529a35);VisuMZ[_0x2f9a56(0xd7)]['JS'][_0x4cb4b1]=new Function(_0x1bff4e);}},VisuMZ[_0x49f14c(0xd7)]['createConditionJS']=function(_0x75c83b,_0x1aa012,_0xc0e2c8){const _0x2234b1=_0x49f14c,_0x4a9de0=_0x75c83b[_0x2234b1(0x1f8)];if(_0x4a9de0[_0x2234b1(0x202)](_0xc0e2c8)){const _0x454195=String(RegExp['$1']),_0x4b8683='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Condition\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x2234b1(0x207)](_0x454195),_0x2ebae5=VisuMZ[_0x2234b1(0xd7)]['createKeyJS'](_0x75c83b,_0x1aa012);VisuMZ[_0x2234b1(0xd7)]['JS'][_0x2ebae5]=new Function(_0x4b8683);}},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0xb1)]=function(_0x481a20,_0x1a7d0b,_0x2ac0c5){const _0x14fd0d=_0x49f14c,_0x5cb16e=_0x481a20[_0x14fd0d(0x1f8)];if(_0x5cb16e[_0x14fd0d(0x202)](_0x2ac0c5)){const _0x13df00=String(RegExp['$1']),_0x3ba8db=_0x14fd0d(0x214)[_0x14fd0d(0x207)](_0x13df00),_0x4b9b05=VisuMZ[_0x14fd0d(0xd7)][_0x14fd0d(0x183)](_0x481a20,_0x1a7d0b);VisuMZ[_0x14fd0d(0xd7)]['JS'][_0x4b9b05]=new Function(_0x3ba8db);}},VisuMZ[_0x49f14c(0xd7)]['createActionJS']=function(_0x52327f,_0x5ea0ac,_0x6d2261){const _0x3287fb=_0x49f14c,_0x5658e8=_0x52327f[_0x3287fb(0x1f8)];if(_0x5658e8[_0x3287fb(0x202)](_0x6d2261)){const _0x10de9c=String(RegExp['$1']),_0x218374='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x3287fb(0x207)](_0x10de9c),_0x5ef97d=VisuMZ[_0x3287fb(0xd7)][_0x3287fb(0x183)](_0x52327f,_0x5ea0ac);VisuMZ['SkillLearnSystem']['JS'][_0x5ef97d]=new Function(_0x218374);}},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x183)]=function(_0xb0c4fe,_0x434800){const _0x2cce5f=_0x49f14c;if(VisuMZ[_0x2cce5f(0x183)])return VisuMZ[_0x2cce5f(0x183)](_0xb0c4fe,_0x434800);let _0x1271c4='';if($dataActors[_0x2cce5f(0xf9)](_0xb0c4fe))_0x1271c4=_0x2cce5f(0x1a9)[_0x2cce5f(0x207)](_0xb0c4fe['id'],_0x434800);if($dataClasses[_0x2cce5f(0xf9)](_0xb0c4fe))_0x1271c4=_0x2cce5f(0x25e)[_0x2cce5f(0x207)](_0xb0c4fe['id'],_0x434800);if($dataSkills[_0x2cce5f(0xf9)](_0xb0c4fe))_0x1271c4='Skill-%1-%2'[_0x2cce5f(0x207)](_0xb0c4fe['id'],_0x434800);if($dataItems[_0x2cce5f(0xf9)](_0xb0c4fe))_0x1271c4=_0x2cce5f(0x10c)[_0x2cce5f(0x207)](_0xb0c4fe['id'],_0x434800);if($dataWeapons[_0x2cce5f(0xf9)](_0xb0c4fe))_0x1271c4=_0x2cce5f(0x1a4)['format'](_0xb0c4fe['id'],_0x434800);if($dataArmors[_0x2cce5f(0xf9)](_0xb0c4fe))_0x1271c4='Armor-%1-%2'[_0x2cce5f(0x207)](_0xb0c4fe['id'],_0x434800);if($dataEnemies['includes'](_0xb0c4fe))_0x1271c4=_0x2cce5f(0xad)[_0x2cce5f(0x207)](_0xb0c4fe['id'],_0x434800);if($dataStates[_0x2cce5f(0xf9)](_0xb0c4fe))_0x1271c4=_0x2cce5f(0xc4)[_0x2cce5f(0x207)](_0xb0c4fe['id'],_0x434800);return _0x1271c4;},DataManager[_0x49f14c(0xae)]=function(_0x34752d){const _0x20f861=_0x49f14c;_0x34752d=_0x34752d[_0x20f861(0xb7)]()['trim'](),this['_classIDs']=this[_0x20f861(0x17e)]||{};if(this[_0x20f861(0x17e)][_0x34752d])return this[_0x20f861(0x17e)][_0x34752d];for(const _0x2da59e of $dataClasses){if(!_0x2da59e)continue;let _0x291f20=_0x2da59e[_0x20f861(0x14c)];_0x291f20=_0x291f20[_0x20f861(0x1c3)](/\x1I\[(\d+)\]/gi,''),_0x291f20=_0x291f20[_0x20f861(0x1c3)](/\\I\[(\d+)\]/gi,''),this[_0x20f861(0x17e)][_0x291f20[_0x20f861(0xb7)]()[_0x20f861(0x206)]()]=_0x2da59e['id'];}return this[_0x20f861(0x17e)][_0x34752d]||0x0;},DataManager[_0x49f14c(0x17b)]=function(_0x387687){const _0x40d875=_0x49f14c;_0x387687=_0x387687[_0x40d875(0xb7)]()[_0x40d875(0x206)](),this[_0x40d875(0xef)]=this[_0x40d875(0xef)]||{};if(this['_skillIDs'][_0x387687])return this[_0x40d875(0xef)][_0x387687];for(const _0x57dde3 of $dataSkills){if(!_0x57dde3)continue;this[_0x40d875(0xef)][_0x57dde3[_0x40d875(0x14c)][_0x40d875(0xb7)]()['trim']()]=_0x57dde3['id'];}return this[_0x40d875(0xef)][_0x387687]||0x0;},DataManager[_0x49f14c(0x270)]=function(_0x234ee2){const _0x2c25d9=_0x49f14c;_0x234ee2=_0x234ee2[_0x2c25d9(0xb7)]()[_0x2c25d9(0x206)](),this[_0x2c25d9(0x1a2)]=this['_itemIDs']||{};if(this[_0x2c25d9(0x1a2)][_0x234ee2])return this[_0x2c25d9(0x1a2)][_0x234ee2];for(const _0x1abcd8 of $dataItems){if(!_0x1abcd8)continue;this[_0x2c25d9(0x1a2)][_0x1abcd8['name'][_0x2c25d9(0xb7)]()[_0x2c25d9(0x206)]()]=_0x1abcd8['id'];}return this[_0x2c25d9(0x1a2)][_0x234ee2]||0x0;},DataManager['getWeaponIdWithName']=function(_0x4e2e91){const _0x40552f=_0x49f14c;_0x4e2e91=_0x4e2e91[_0x40552f(0xb7)]()['trim'](),this[_0x40552f(0x21d)]=this[_0x40552f(0x21d)]||{};if(this[_0x40552f(0x21d)][_0x4e2e91])return this[_0x40552f(0x21d)][_0x4e2e91];for(const _0x3cea3b of $dataWeapons){if(!_0x3cea3b)continue;this[_0x40552f(0x21d)][_0x3cea3b['name'][_0x40552f(0xb7)]()[_0x40552f(0x206)]()]=_0x3cea3b['id'];}return this[_0x40552f(0x21d)][_0x4e2e91]||0x0;},DataManager['getArmorIdWithName']=function(_0x48c48e){const _0x1ec669=_0x49f14c;_0x48c48e=_0x48c48e[_0x1ec669(0xb7)]()[_0x1ec669(0x206)](),this['_armorIDs']=this[_0x1ec669(0x243)]||{};if(this[_0x1ec669(0x243)][_0x48c48e])return this[_0x1ec669(0x243)][_0x48c48e];for(const _0x47dadd of $dataArmors){if(!_0x47dadd)continue;this['_armorIDs'][_0x47dadd[_0x1ec669(0x14c)]['toUpperCase']()[_0x1ec669(0x206)]()]=_0x47dadd['id'];}return this[_0x1ec669(0x243)][_0x48c48e]||0x0;},DataManager[_0x49f14c(0x19a)]=function(_0x46ae59){const _0x44f900=_0x49f14c;if(!$dataClasses[_0x46ae59])return[];const _0x5521a0=[],_0x26e71c=$dataClasses[_0x46ae59][_0x44f900(0x1f8)],_0x7031b2=VisuMZ[_0x44f900(0xd7)]['RegExp'],_0xff2fb9=_0x26e71c[_0x44f900(0x202)](_0x7031b2[_0x44f900(0x150)]);if(_0xff2fb9)for(const _0x13f21b of _0xff2fb9){if(!_0x13f21b)continue;_0x13f21b[_0x44f900(0x202)](_0x7031b2[_0x44f900(0x150)]);const _0xc64847=String(RegExp['$1'])['split'](',')[_0x44f900(0x23a)](_0x580233=>_0x580233[_0x44f900(0x206)]());;for(let _0x386110 of _0xc64847){_0x386110=(String(_0x386110)||'')[_0x44f900(0x206)]();const _0x2f318c=/^\d+$/[_0x44f900(0x1ed)](_0x386110);_0x2f318c?_0x5521a0[_0x44f900(0x188)](Number(_0x386110)):_0x5521a0['push'](DataManager['getSkillIdWithName'](_0x386110));}}const _0x1d1bc5=_0x26e71c[_0x44f900(0x202)](_0x7031b2[_0x44f900(0x199)]);if(_0x1d1bc5)for(const _0x387dc6 of _0x1d1bc5){if(!_0x387dc6)continue;_0x387dc6[_0x44f900(0x202)](_0x7031b2[_0x44f900(0x150)]);const _0x4faf12=String(RegExp['$1'])[_0x44f900(0x18b)](/[\r\n]+/);for(let _0x37da01 of _0x4faf12){_0x37da01=(String(_0x37da01)||'')['trim']();const _0x28ca98=/^\d+$/[_0x44f900(0x1ed)](_0x37da01);_0x28ca98?_0x5521a0[_0x44f900(0x188)](Number(_0x37da01)):_0x5521a0[_0x44f900(0x188)](DataManager[_0x44f900(0x17b)](_0x37da01));}}return _0x5521a0[_0x44f900(0x16b)]((_0xb5d5f2,_0x1439fd)=>_0xb5d5f2-_0x1439fd)[_0x44f900(0xff)]((_0x2a862f,_0x4e04f0,_0x3454c5)=>_0x3454c5[_0x44f900(0x240)](_0x2a862f)===_0x4e04f0);},DataManager[_0x49f14c(0x127)]=function(_0x23bae8){const _0xd54fd3=_0x49f14c;if(!_0x23bae8)return 0x0;if(!DataManager['isSkill'](_0x23bae8))return 0x0;const _0x2dd1fe=VisuMZ['SkillLearnSystem']['RegExp'],_0x46175d=_0x23bae8[_0xd54fd3(0x1f8)];if(_0x46175d[_0xd54fd3(0x202)](_0x2dd1fe[_0xd54fd3(0x22c)]))return Number(RegExp['$1']);if(_0x46175d[_0xd54fd3(0x202)](_0x2dd1fe[_0xd54fd3(0x233)])){const _0x5ab5cf=String(RegExp['$1'])[_0xd54fd3(0x18b)](/[\r\n]+/);for(const _0x2861b0 of _0x5ab5cf){if(_0x2861b0[_0xd54fd3(0x202)](/(?:ABILITY POINTS|AP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x47262c=VisuMZ['SkillLearnSystem'][_0xd54fd3(0x183)](_0x23bae8,_0xd54fd3(0x1cd));if(VisuMZ[_0xd54fd3(0xd7)]['JS'][_0x47262c]){const _0xec7f2e=SceneManager[_0xd54fd3(0x182)][_0xd54fd3(0x282)]();return VisuMZ[_0xd54fd3(0xd7)]['JS'][_0x47262c][_0xd54fd3(0x24d)](this,_0xec7f2e,_0x23bae8);}return VisuMZ[_0xd54fd3(0xd7)][_0xd54fd3(0x211)][_0xd54fd3(0x176)][_0xd54fd3(0x159)]||0x0;},DataManager[_0x49f14c(0xc7)]=function(_0x5a34e1){const _0x22c8bf=_0x49f14c;if(!_0x5a34e1)return 0x0;if(!DataManager[_0x22c8bf(0x12a)](_0x5a34e1))return 0x0;const _0x3d7bd1=VisuMZ[_0x22c8bf(0xd7)]['RegExp'],_0x2fcd7b=_0x5a34e1[_0x22c8bf(0x1f8)];if(_0x2fcd7b['match'](_0x3d7bd1[_0x22c8bf(0x151)]))return Number(RegExp['$1']);if(_0x2fcd7b[_0x22c8bf(0x202)](_0x3d7bd1[_0x22c8bf(0x233)])){const _0x2373d5=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x2d558a of _0x2373d5){if(_0x2d558a[_0x22c8bf(0x202)](/(?:CLASS POINTS|CP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x11ab1a=VisuMZ[_0x22c8bf(0xd7)]['createKeyJS'](_0x5a34e1,_0x22c8bf(0x1d9));if(VisuMZ[_0x22c8bf(0xd7)]['JS'][_0x11ab1a]){const _0x4b80e4=SceneManager[_0x22c8bf(0x182)][_0x22c8bf(0x282)]();return VisuMZ[_0x22c8bf(0xd7)]['JS'][_0x11ab1a][_0x22c8bf(0x24d)](this,_0x4b80e4,_0x5a34e1)||0x0;}return VisuMZ[_0x22c8bf(0x105)][_0x22c8bf(0x211)][_0x22c8bf(0xb0)]['DefaultCost']||0x0;},DataManager[_0x49f14c(0xaa)]=function(_0x2da394){const _0x5f414e=_0x49f14c;if(!_0x2da394)return 0x0;if(!DataManager[_0x5f414e(0x12a)](_0x2da394))return 0x0;const _0x40e3a1=VisuMZ[_0x5f414e(0xd7)][_0x5f414e(0x1cb)],_0x240a57=_0x2da394['note'];if(_0x240a57[_0x5f414e(0x202)](_0x40e3a1[_0x5f414e(0x1fd)]))return Number(RegExp['$1']);if(_0x240a57['match'](_0x40e3a1['LearnCostBatch'])){const _0x394d59=String(RegExp['$1'])[_0x5f414e(0x18b)](/[\r\n]+/);for(const _0x5a7c07 of _0x394d59){if(_0x5a7c07['match'](/(?:JOB POINTS|JP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x3e975a=VisuMZ[_0x5f414e(0xd7)]['createKeyJS'](_0x2da394,_0x5f414e(0x19f));if(VisuMZ['SkillLearnSystem']['JS'][_0x3e975a]){const _0x281dc5=SceneManager['_scene'][_0x5f414e(0x282)]();return VisuMZ['SkillLearnSystem']['JS'][_0x3e975a]['call'](this,_0x281dc5,_0x2da394);}return VisuMZ[_0x5f414e(0x105)]['Settings'][_0x5f414e(0x1fc)]['DefaultCost']||0x0;},DataManager[_0x49f14c(0x11a)]=function(_0x5a1973){const _0x749845=_0x49f14c;if(!_0x5a1973)return 0x0;if(!DataManager[_0x749845(0x12a)](_0x5a1973))return 0x0;const _0x2a4838=VisuMZ[_0x749845(0xd7)][_0x749845(0x1cb)],_0x31d80b=_0x5a1973[_0x749845(0x1f8)];if(_0x31d80b[_0x749845(0x202)](_0x2a4838['LearnSpCost']))return Number(RegExp['$1']);if(_0x31d80b[_0x749845(0x202)](_0x2a4838['LearnCostBatch'])){const _0x196000=String(RegExp['$1'])[_0x749845(0x18b)](/[\r\n]+/);for(const _0x136522 of _0x196000){if(_0x136522[_0x749845(0x202)](/(?:SKILL POINTS|SP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x421637=VisuMZ['SkillLearnSystem'][_0x749845(0x183)](_0x5a1973,'jsLearnSpCost');if(VisuMZ[_0x749845(0xd7)]['JS'][_0x421637]){const _0x2a89a5=SceneManager['_scene']['user']();return VisuMZ[_0x749845(0xd7)]['JS'][_0x421637][_0x749845(0x24d)](this,_0x2a89a5,_0x5a1973);}return VisuMZ['SkillLearnSystem']['Settings'][_0x749845(0x260)][_0x749845(0x159)]||0x0;},DataManager[_0x49f14c(0x246)]=function(_0x54121e){const _0x36324e=_0x49f14c;if(!_0x54121e)return 0x0;if(!DataManager[_0x36324e(0x12a)](_0x54121e))return 0x0;const _0xccd772=VisuMZ[_0x36324e(0xd7)][_0x36324e(0x1cb)],_0xd36a06=_0x54121e[_0x36324e(0x1f8)],_0x5906bd=[],_0x2320b7=_0xd36a06[_0x36324e(0x202)](_0xccd772[_0x36324e(0xc5)]);if(_0x2320b7)for(const _0x5511d9 of _0x2320b7){if(!_0x5511d9)continue;_0x5511d9['match'](_0xccd772[_0x36324e(0xc5)]);const _0x1cf006=String(RegExp['$1']),_0x23b3c3={'id':0x0,'quantity':Number(RegExp['$2'])},_0x5bfa29=/^\d+$/[_0x36324e(0x1ed)](_0x1cf006);_0x5bfa29?_0x23b3c3['id']=Number(_0x1cf006):_0x23b3c3['id']=DataManager[_0x36324e(0x270)](_0x1cf006),_0x23b3c3['id']>0x0&&_0x5906bd[_0x36324e(0x188)](_0x23b3c3);}if(_0xd36a06[_0x36324e(0x202)](_0xccd772[_0x36324e(0x233)])){const _0x2df981=String(RegExp['$1'])[_0x36324e(0x18b)](/[\r\n]+/);for(const _0x170023 of _0x2df981){if(_0x170023[_0x36324e(0x202)](/ITEM[ ](.*):[ ](\d+)/gi)){const _0x13c21e=String(RegExp['$1']),_0x3e88b3={'id':0x0,'quantity':Number(RegExp['$2'])},_0x308020=/^\d+$/['test'](_0x13c21e);_0x308020?_0x3e88b3['id']=Number(_0x13c21e):_0x3e88b3['id']=DataManager[_0x36324e(0x270)](_0x13c21e),_0x3e88b3['id']>0x0&&_0x5906bd[_0x36324e(0x188)](_0x3e88b3);}}}return _0x5906bd;},DataManager[_0x49f14c(0x1ee)]=function(_0x2aba82){const _0x47b813=_0x49f14c;if(!_0x2aba82)return 0x0;if(!DataManager[_0x47b813(0x12a)](_0x2aba82))return 0x0;const _0x1f1c6c=VisuMZ[_0x47b813(0xd7)][_0x47b813(0x1cb)],_0x53e705=_0x2aba82[_0x47b813(0x1f8)],_0x5d8205=[],_0x5ea16a=_0x53e705[_0x47b813(0x202)](_0x1f1c6c['LearnWeaponCost']);if(_0x5ea16a)for(const _0x264649 of _0x5ea16a){if(!_0x264649)continue;_0x264649[_0x47b813(0x202)](_0x1f1c6c['LearnWeaponCost']);const _0x393378=String(RegExp['$1']),_0x58984c={'id':0x0,'quantity':Number(RegExp['$2'])},_0x4df3dc=/^\d+$/[_0x47b813(0x1ed)](_0x393378);_0x4df3dc?_0x58984c['id']=Number(_0x393378):_0x58984c['id']=DataManager[_0x47b813(0x130)](_0x393378),_0x58984c['id']>0x0&&_0x5d8205[_0x47b813(0x188)](_0x58984c);}if(_0x53e705['match'](_0x1f1c6c[_0x47b813(0x233)])){const _0x22b4fb=String(RegExp['$1'])[_0x47b813(0x18b)](/[\r\n]+/);for(const _0x49d55f of _0x22b4fb){if(_0x49d55f[_0x47b813(0x202)](/WEAPON[ ](.*):[ ](\d+)/gi)){const _0x8614d6=String(RegExp['$1']),_0x1f6588={'id':0x0,'quantity':Number(RegExp['$2'])},_0x4123ff=/^\d+$/[_0x47b813(0x1ed)](_0x8614d6);_0x4123ff?_0x1f6588['id']=Number(_0x8614d6):_0x1f6588['id']=DataManager['getWeaponIdWithName'](_0x8614d6),_0x1f6588['id']>0x0&&_0x5d8205[_0x47b813(0x188)](_0x1f6588);}}}return _0x5d8205;},DataManager[_0x49f14c(0x13f)]=function(_0x35ea46){const _0x35ac03=_0x49f14c;if(!_0x35ea46)return 0x0;if(!DataManager['isSkill'](_0x35ea46))return 0x0;const _0x119b08=VisuMZ['SkillLearnSystem'][_0x35ac03(0x1cb)],_0xefa97d=_0x35ea46[_0x35ac03(0x1f8)],_0x274a07=[],_0x4b72fb=_0xefa97d[_0x35ac03(0x202)](_0x119b08[_0x35ac03(0x1bb)]);if(_0x4b72fb)for(const _0xdc38a of _0x4b72fb){if(!_0xdc38a)continue;_0xdc38a['match'](_0x119b08[_0x35ac03(0x1bb)]);const _0x49c3d6=String(RegExp['$1']),_0xaedf7c={'id':0x0,'quantity':Number(RegExp['$2'])},_0x3a4155=/^\d+$/[_0x35ac03(0x1ed)](_0x49c3d6);_0x3a4155?_0xaedf7c['id']=Number(_0x49c3d6):_0xaedf7c['id']=DataManager[_0x35ac03(0x171)](_0x49c3d6),_0xaedf7c['id']>0x0&&_0x274a07['push'](_0xaedf7c);}if(_0xefa97d[_0x35ac03(0x202)](_0x119b08[_0x35ac03(0x233)])){const _0x4dbdb0=String(RegExp['$1'])[_0x35ac03(0x18b)](/[\r\n]+/);for(const _0x5d5f15 of _0x4dbdb0){if(_0x5d5f15[_0x35ac03(0x202)](/ARMOR[ ](.*):[ ](\d+)/gi)){const _0x30b7ba=String(RegExp['$1']),_0x534cc4={'id':0x0,'quantity':Number(RegExp['$2'])},_0x45838a=/^\d+$/[_0x35ac03(0x1ed)](_0x30b7ba);_0x45838a?_0x534cc4['id']=Number(_0x30b7ba):_0x534cc4['id']=DataManager[_0x35ac03(0x171)](_0x30b7ba),_0x534cc4['id']>0x0&&_0x274a07['push'](_0x534cc4);}}}return _0x274a07;},DataManager[_0x49f14c(0x19b)]=function(_0x36fcc1){const _0x5966d1=_0x49f14c;if(!_0x36fcc1)return 0x0;if(!DataManager[_0x5966d1(0x12a)](_0x36fcc1))return 0x0;const _0x3b6447=VisuMZ[_0x5966d1(0xd7)]['RegExp'],_0x298ad8=_0x36fcc1[_0x5966d1(0x1f8)];if(_0x298ad8[_0x5966d1(0x202)](_0x3b6447[_0x5966d1(0x10b)]))return Number(RegExp['$1']);if(_0x298ad8[_0x5966d1(0x202)](_0x3b6447[_0x5966d1(0x233)])){const _0x4ca50b=String(RegExp['$1'])[_0x5966d1(0x18b)](/[\r\n]+/);for(const _0x2e5ff2 of _0x4ca50b){if(_0x2e5ff2[_0x5966d1(0x202)](/GOLD:[ ](\d+)/gi))return Number(RegExp['$1']);}}return 0x0;},TextManager[_0x49f14c(0x1af)]=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0x14e)]['Icon'],ImageManager['abilityPointsIcon']=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0x176)][_0x49f14c(0x259)],ImageManager['skillPointsIcon']=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)]['SkillPoints'][_0x49f14c(0x259)],SoundManager[_0x49f14c(0x9f)]=function(){const _0x540b8c=_0x49f14c;AudioManager['playStaticSe'](VisuMZ[_0x540b8c(0xd7)][_0x540b8c(0x211)]['Sound']);},TextManager[_0x49f14c(0xba)]=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)]['General'][_0x49f14c(0x235)],TextManager[_0x49f14c(0x251)]=VisuMZ['SkillLearnSystem'][_0x49f14c(0x211)][_0x49f14c(0x1bc)]['RequireFmt'],TextManager[_0x49f14c(0x218)]=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0x1bc)][_0x49f14c(0x1ab)],TextManager[_0x49f14c(0xa9)]=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0x1bc)]['ReqLevelFmt'],TextManager['skillLearnReqSkillFmt']=VisuMZ[_0x49f14c(0xd7)]['Settings'][_0x49f14c(0x1bc)][_0x49f14c(0x122)],TextManager[_0x49f14c(0x132)]=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0x1bc)]['ReqSwitchFmt'],TextManager[_0x49f14c(0x252)]=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0x1bc)][_0x49f14c(0x1eb)],TextManager[_0x49f14c(0x256)]=VisuMZ['SkillLearnSystem'][_0x49f14c(0x211)][_0x49f14c(0x1bc)][_0x49f14c(0x244)],TextManager[_0x49f14c(0x15a)]=VisuMZ[_0x49f14c(0xd7)]['Settings']['General'][_0x49f14c(0x18e)],TextManager[_0x49f14c(0x1e8)]=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0x1bc)][_0x49f14c(0x19e)],TextManager['skillLearnGoldFmt']=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0x1bc)][_0x49f14c(0x157)],TextManager['skillLearnCmd']=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0x14e)][_0x49f14c(0x268)],TextManager[_0x49f14c(0xe1)]=VisuMZ['SkillLearnSystem']['Settings'][_0x49f14c(0xf8)][_0x49f14c(0xab)],TextManager['skillLearnReqMet']=VisuMZ['SkillLearnSystem'][_0x49f14c(0x211)][_0x49f14c(0xf8)][_0x49f14c(0x11b)],TextManager[_0x49f14c(0x102)]=VisuMZ[_0x49f14c(0xd7)]['Settings'][_0x49f14c(0xf8)][_0x49f14c(0x128)],TextManager['skillLearnReqListLevel']=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)]['Window']['ReqLevelFmt'],TextManager[_0x49f14c(0xb3)]=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0xf8)]['ReqSkillFmt'],TextManager[_0x49f14c(0x185)]=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0xf8)][_0x49f14c(0x21c)],TextManager['skillLearningTitle']=VisuMZ['SkillLearnSystem']['Settings'][_0x49f14c(0xf8)]['LearningTitle'],TextManager['skillLearningName']=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0xf8)][_0x49f14c(0x178)],TextManager[_0x49f14c(0x242)]=VisuMZ[_0x49f14c(0xd7)]['Settings'][_0x49f14c(0xf8)]['IngredientCost'],TextManager['skillLearningOwned']=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0xf8)][_0x49f14c(0x29a)],TextManager['skillLearnConfirmCmd']=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)]['Window'][_0x49f14c(0xdc)],TextManager[_0x49f14c(0x1b8)]=VisuMZ['SkillLearnSystem']['Settings'][_0x49f14c(0xf8)][_0x49f14c(0xda)],TextManager[_0x49f14c(0x141)]=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)]['AbilityPoints']['FullText'],TextManager[_0x49f14c(0x153)]=VisuMZ['SkillLearnSystem'][_0x49f14c(0x211)][_0x49f14c(0x176)][_0x49f14c(0x234)],TextManager[_0x49f14c(0xca)]=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0x176)][_0x49f14c(0x11f)],TextManager[_0x49f14c(0x15d)]=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0x260)][_0x49f14c(0x154)],TextManager[_0x49f14c(0x1c0)]=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0x260)][_0x49f14c(0x234)],TextManager[_0x49f14c(0x269)]=VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x211)][_0x49f14c(0x260)][_0x49f14c(0x11f)],VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x17d)]=BattleManager[_0x49f14c(0x19d)],BattleManager[_0x49f14c(0x19d)]=function(){const _0x3a184b=_0x49f14c;VisuMZ[_0x3a184b(0xd7)][_0x3a184b(0x17d)][_0x3a184b(0x24d)](this),this[_0x3a184b(0xa3)](),this[_0x3a184b(0xe5)](),this[_0x3a184b(0x254)](),this[_0x3a184b(0x219)]();},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x131)]=BattleManager[_0x49f14c(0xe3)],BattleManager['displayRewards']=function(){const _0xfaa922=_0x49f14c;VisuMZ[_0xfaa922(0xd7)][_0xfaa922(0x131)]['call'](this),this[_0xfaa922(0xfe)](),this[_0xfaa922(0x250)]();},BattleManager[_0x49f14c(0xa3)]=function(){const _0x534e0f=_0x49f14c;this[_0x534e0f(0x20f)]['abilityPoints']=$gameTroop['abilityPointsTotal']();},BattleManager[_0x49f14c(0xfe)]=function(){const _0x266134=_0x49f14c;if(!this[_0x266134(0x1f2)]())return;$gameMessage[_0x266134(0x1a1)]();const _0x321b90=$gameParty[_0x266134(0x1ac)](),_0x4628b1=VisuMZ[_0x266134(0xd7)][_0x266134(0x211)][_0x266134(0x176)],_0x613b6d=_0x4628b1[_0x266134(0x258)];for(const _0x7c416 of _0x321b90){if(!_0x7c416)continue;const _0xca2b5a=_0x613b6d['format'](_0x7c416['name'](),_0x7c416[_0x266134(0x13d)](),TextManager['abilityPointsAbbr'],TextManager[_0x266134(0xca)]);$gameMessage[_0x266134(0x220)]('\x5c.'+_0xca2b5a);}},BattleManager[_0x49f14c(0xe5)]=function(){const _0x3e4b7f=_0x49f14c;this['_rewards'][_0x3e4b7f(0x21e)]=this[_0x3e4b7f(0x20f)][_0x3e4b7f(0x21e)]||0x0;let _0x67abbe=$gameParty[_0x3e4b7f(0x1b7)]();VisuMZ['SkillLearnSystem']['Settings']['AbilityPoints'][_0x3e4b7f(0x1ff)]&&(_0x67abbe=_0x67abbe['filter'](_0x9876ba=>_0x9876ba['isAlive']()));for(const _0x3fed65 of _0x67abbe){if(!_0x3fed65)continue;if(!$dataSystem[_0x3e4b7f(0xe7)]&&!_0x3fed65[_0x3e4b7f(0x1e9)]())continue;_0x3fed65[_0x3e4b7f(0x1c2)](this[_0x3e4b7f(0x20f)][_0x3e4b7f(0x21e)]),_0x3fed65['gainAbilityPointsForMulticlasses'](this['_rewards'][_0x3e4b7f(0x21e)]);}},BattleManager['abilityPointsVisible']=function(){const _0x3692ed=_0x49f14c;return VisuMZ[_0x3692ed(0xd7)]['Settings'][_0x3692ed(0x176)]['ShowVictory'];},BattleManager[_0x49f14c(0x254)]=function(){const _0xdefcfe=_0x49f14c;this[_0xdefcfe(0x20f)][_0xdefcfe(0x160)]=$gameTroop[_0xdefcfe(0x12b)]();},BattleManager[_0x49f14c(0x250)]=function(){const _0x14b173=_0x49f14c;if(!this[_0x14b173(0xbc)]())return;$gameMessage[_0x14b173(0x1a1)]();const _0x2604f8=$gameParty['members'](),_0x463fb=VisuMZ[_0x14b173(0xd7)]['Settings'][_0x14b173(0x260)],_0x4916db=_0x463fb[_0x14b173(0x258)];for(const _0x99eb72 of _0x2604f8){if(!_0x99eb72)continue;const _0x19a7ec=_0x4916db[_0x14b173(0x207)](_0x99eb72[_0x14b173(0x14c)](),_0x99eb72[_0x14b173(0x224)](),TextManager['skillPointsAbbr'],TextManager[_0x14b173(0x269)]);$gameMessage['add']('\x5c.'+_0x19a7ec);}},BattleManager[_0x49f14c(0x219)]=function(){const _0x2e6f7b=_0x49f14c;this[_0x2e6f7b(0x20f)][_0x2e6f7b(0x160)]=this[_0x2e6f7b(0x20f)][_0x2e6f7b(0x160)]||0x0;let _0x4b93c9=$gameParty['allMembers']();VisuMZ['SkillLearnSystem']['Settings'][_0x2e6f7b(0x260)][_0x2e6f7b(0x1ff)]&&(_0x4b93c9=_0x4b93c9[_0x2e6f7b(0xff)](_0x2ac31c=>_0x2ac31c['isAlive']()));for(const _0x5a51c2 of _0x4b93c9){if(!_0x5a51c2)continue;if(!$dataSystem[_0x2e6f7b(0xe7)]&&!_0x5a51c2['isBattleMember']())continue;_0x5a51c2['gainSkillPoints'](this[_0x2e6f7b(0x20f)]['skillPoints']),_0x5a51c2[_0x2e6f7b(0x298)](this[_0x2e6f7b(0x20f)][_0x2e6f7b(0x160)]);}},BattleManager['skillPointsVisible']=function(){const _0x36b623=_0x49f14c;return VisuMZ['SkillLearnSystem'][_0x36b623(0x211)]['SkillPoints'][_0x36b623(0x25c)];},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x1e1)]=Game_System['prototype'][_0x49f14c(0x27e)],Game_System[_0x49f14c(0x284)]['initialize']=function(){const _0x396fca=_0x49f14c;VisuMZ[_0x396fca(0xd7)][_0x396fca(0x1e1)][_0x396fca(0x24d)](this),this[_0x396fca(0x28a)]();},Game_System[_0x49f14c(0x284)][_0x49f14c(0x28a)]=function(){const _0x889b14=_0x49f14c;this[_0x889b14(0x297)]=VisuMZ[_0x889b14(0xd7)][_0x889b14(0x211)][_0x889b14(0x14e)]['ShowMenu'];},Game_System[_0x49f14c(0x284)][_0x49f14c(0x11d)]=function(){const _0x337757=_0x49f14c;return this[_0x337757(0x297)]===undefined&&this[_0x337757(0x28a)](),this['_SkillLearnSystem_MenuAccess'];},Game_System[_0x49f14c(0x284)][_0x49f14c(0x18c)]=function(_0x4c5ea8){const _0x2a1c20=_0x49f14c;this[_0x2a1c20(0x297)]===undefined&&this[_0x2a1c20(0x28a)](),this[_0x2a1c20(0x297)]=_0x4c5ea8;},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0xd4)]=Game_Action['prototype'][_0x49f14c(0x14f)],Game_Action[_0x49f14c(0x284)][_0x49f14c(0x14f)]=function(_0x1d7c29){const _0x5bafa2=_0x49f14c;VisuMZ['SkillLearnSystem'][_0x5bafa2(0xd4)][_0x5bafa2(0x24d)](this,_0x1d7c29),this[_0x5bafa2(0x16f)](_0x1d7c29);},Game_Action['prototype'][_0x49f14c(0x16f)]=function(_0x4d6c9b){const _0x8bdf29=_0x49f14c;if(this[_0x8bdf29(0x1c4)]())this[_0x8bdf29(0x175)](_0x4d6c9b);},Game_Action['prototype'][_0x49f14c(0x175)]=function(_0x11c59b){const _0xd442b7=_0x49f14c,_0xe543c3=VisuMZ['SkillLearnSystem']['RegExp'],_0x2431c0=this['item']()[_0xd442b7(0x1f8)];if($gameParty[_0xd442b7(0x21f)]()){if(this[_0xd442b7(0x1fb)]()[_0xd442b7(0x117)]()&&_0x2431c0[_0xd442b7(0x202)](_0xe543c3[_0xd442b7(0xf2)])){const _0x59dae0=eval(RegExp['$1']);this['subject']()[_0xd442b7(0x1c2)](_0x59dae0);}else this[_0xd442b7(0x186)]();if(_0x11c59b['isActor']()&&_0x2431c0['match'](_0xe543c3[_0xd442b7(0x286)])){const _0xb46222=eval(RegExp['$1']);_0x11c59b[_0xd442b7(0x1c2)](_0xb46222);}}if($gameParty['inBattle']()){if(this[_0xd442b7(0x1fb)]()[_0xd442b7(0x117)]()&&_0x2431c0[_0xd442b7(0x202)](_0xe543c3['UserGainSkillPoints'])){const _0x23b62b=eval(RegExp['$1']);this['subject']()[_0xd442b7(0x212)](_0x23b62b);}else this[_0xd442b7(0x162)]();if(_0x11c59b[_0xd442b7(0x117)]()&&_0x2431c0[_0xd442b7(0x202)](_0xe543c3['TargetGainSkillPoints'])){const _0x428967=eval(RegExp['$1']);_0x11c59b[_0xd442b7(0x212)](_0x428967);}}if(_0x2431c0[_0xd442b7(0x202)](/<NOTETAG>/i)){}},Game_Action[_0x49f14c(0x284)][_0x49f14c(0x186)]=function(){const _0x11470b=_0x49f14c;if(!$gameParty[_0x11470b(0x21f)]())return;if(!this[_0x11470b(0x1fb)]()[_0x11470b(0x117)]())return;const _0x54b031=VisuMZ[_0x11470b(0xd7)]['Settings'][_0x11470b(0x176)];let _0x1aa8fb=0x0;try{_0x1aa8fb=eval(_0x54b031[_0x11470b(0x271)]);}catch(_0x4d1af4){if($gameTemp[_0x11470b(0x12e)]())console[_0x11470b(0xd5)](_0x4d1af4);}this[_0x11470b(0x1fb)]()[_0x11470b(0x1c2)](_0x1aa8fb);},Game_Action['prototype'][_0x49f14c(0x162)]=function(){const _0x1818c8=_0x49f14c;if(!$gameParty['inBattle']())return;if(!this[_0x1818c8(0x1fb)]()[_0x1818c8(0x117)]())return;const _0x4dd1b9=VisuMZ[_0x1818c8(0xd7)][_0x1818c8(0x211)][_0x1818c8(0x260)];let _0x2b67ca=0x0;try{_0x2b67ca=eval(_0x4dd1b9[_0x1818c8(0x271)]);}catch(_0x1b7af6){if($gameTemp['isPlaytest']())console[_0x1818c8(0xd5)](_0x1b7af6);}this[_0x1818c8(0x1fb)]()['gainSkillPoints'](_0x2b67ca);},VisuMZ['SkillLearnSystem']['Game_Battler_onBattleStart']=Game_Battler[_0x49f14c(0x284)][_0x49f14c(0x221)],Game_Battler[_0x49f14c(0x284)][_0x49f14c(0x221)]=function(_0x14a5ea){const _0x16f37f=_0x49f14c;VisuMZ[_0x16f37f(0xd7)][_0x16f37f(0x17f)][_0x16f37f(0x24d)](this,_0x14a5ea),this[_0x16f37f(0x117)]()&&(this['_earnedAbilityPoints']=this[_0x16f37f(0x13e)](),this['_earnedSkillPoints']=this[_0x16f37f(0x13b)]());},VisuMZ['SkillLearnSystem'][_0x49f14c(0xaf)]=Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x1f3)],Game_Actor['prototype'][_0x49f14c(0x1f3)]=function(_0x542a41){const _0x16f71c=_0x49f14c;VisuMZ[_0x16f71c(0xd7)][_0x16f71c(0xaf)][_0x16f71c(0x24d)](this,_0x542a41),this[_0x16f71c(0x1bd)](),this['gainStartingAbilityPoints'](),this[_0x16f71c(0x196)](),this[_0x16f71c(0x277)]();},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x134)]=Game_Actor[_0x49f14c(0x284)]['changeClass'],Game_Actor[_0x49f14c(0x284)]['changeClass']=function(_0x51347c,_0x9d6d41){const _0x31c077=_0x49f14c;this[_0x31c077(0x22e)]=!![],VisuMZ[_0x31c077(0xd7)][_0x31c077(0x134)]['call'](this,_0x51347c,_0x9d6d41),this[_0x31c077(0x22e)]=undefined;},VisuMZ['SkillLearnSystem'][_0x49f14c(0x12d)]=Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x1f1)],Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x1f1)]=function(){const _0x55ef25=_0x49f14c;VisuMZ[_0x55ef25(0xd7)][_0x55ef25(0x12d)][_0x55ef25(0x24d)](this),this[_0x55ef25(0x1c1)](this['currentClass']()['id']),this[_0x55ef25(0x119)](this[_0x55ef25(0xf3)]()['id']);},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x1bd)]=function(){const _0x77b4ef=_0x49f14c;this[_0x77b4ef(0x230)]={};},Game_Actor['prototype'][_0x49f14c(0x26d)]=function(){const _0x5e83f5=_0x49f14c,_0x34307d=VisuMZ[_0x5e83f5(0xd7)][_0x5e83f5(0x1cb)],_0x154761=this['actor']()[_0x5e83f5(0x1f8)];if(_0x154761[_0x5e83f5(0x202)](_0x34307d[_0x5e83f5(0x279)])){const _0x1c944f=eval(RegExp['$1']);this[_0x5e83f5(0x1c2)](_0x1c944f);}const _0x182062=VisuMZ[_0x5e83f5(0xd7)]['Settings']['AbilityPoints'];if(!_0x182062['SharedResource'])return;const _0x8e7b43=_0x154761[_0x5e83f5(0x202)](_0x34307d['StartClassAbilityPoints']);if(_0x8e7b43)for(const _0x37ad34 of _0x8e7b43){if(!_0x37ad34)continue;_0x37ad34[_0x5e83f5(0x202)](_0x34307d[_0x5e83f5(0x18f)]);const _0x2e521e=String(RegExp['$1']),_0x3b9e07=eval(RegExp['$2']),_0x5a9ced=/^\d+$/[_0x5e83f5(0x1ed)](_0x2e521e);let _0x264f10=0x0;_0x5a9ced?_0x264f10=Number(_0x2e521e):_0x264f10=DataManager[_0x5e83f5(0xae)](_0x2e521e),this['gainAbilityPoints'](_0x3b9e07,_0x264f10);}},Game_Actor['prototype'][_0x49f14c(0x13e)]=function(_0x5d58a8){const _0x3bbfb9=_0x49f14c;this['_abilityPoints']===undefined&&this[_0x3bbfb9(0x1bd)]();const _0x538d50=VisuMZ['SkillLearnSystem'][_0x3bbfb9(0x211)][_0x3bbfb9(0x176)];return _0x538d50[_0x3bbfb9(0x166)]?_0x5d58a8=0x0:_0x5d58a8=_0x5d58a8||this[_0x3bbfb9(0xf3)]()['id'],this[_0x3bbfb9(0x230)][_0x5d58a8]=this['_abilityPoints'][_0x5d58a8]||0x0,Math[_0x3bbfb9(0x28f)](this[_0x3bbfb9(0x230)][_0x5d58a8]);},Game_Actor['prototype'][_0x49f14c(0x231)]=function(_0x2d99c2,_0x216d61){const _0x2585ca=_0x49f14c;this['_abilityPoints']===undefined&&this[_0x2585ca(0x1bd)]();const _0x1d03f4=VisuMZ[_0x2585ca(0xd7)][_0x2585ca(0x211)][_0x2585ca(0x176)];_0x1d03f4['SharedResource']?_0x216d61=0x0:_0x216d61=_0x216d61||this[_0x2585ca(0xf3)]()['id'];this[_0x2585ca(0x230)][_0x216d61]=this['_abilityPoints'][_0x216d61]||0x0,this['_abilityPoints'][_0x216d61]=Math[_0x2585ca(0x28f)](_0x2d99c2||0x0);const _0x102587=_0x1d03f4[_0x2585ca(0x1ae)]||Number['MAX_SAFE_INTEGER'];this[_0x2585ca(0x230)][_0x216d61]=this['_abilityPoints'][_0x216d61][_0x2585ca(0x280)](0x0,_0x102587);},Game_Actor[_0x49f14c(0x284)]['gainAbilityPoints']=function(_0x4dad04,_0x4e28c6){const _0x4d1230=_0x49f14c;_0x4dad04>0x0&&(_0x4dad04*=this['abilityPointsRate']()),this[_0x4d1230(0x163)](_0x4dad04,_0x4e28c6);},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x226)]=function(_0xfed96d){const _0x1e161d=_0x49f14c;if(!Imported[_0x1e161d(0x23f)])return;_0xfed96d>0x0&&(_0xfed96d*=this[_0x1e161d(0x156)]()),this[_0x1e161d(0x29c)](_0xfed96d,_0x1e161d(0xea));},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x163)]=function(_0x3df1ad,_0xc64d05){const _0x2d4edf=_0x49f14c,_0x424ca6=VisuMZ[_0x2d4edf(0xd7)][_0x2d4edf(0x211)]['AbilityPoints'];_0x424ca6['SharedResource']?_0xc64d05=0x0:_0xc64d05=_0xc64d05||this['currentClass']()['id'],_0x3df1ad+=this[_0x2d4edf(0x13e)](_0xc64d05),this[_0x2d4edf(0x231)](_0x3df1ad,_0xc64d05);},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x1c8)]=function(_0x411d6a,_0x106359){const _0xdb8269=_0x49f14c;this[_0xdb8269(0x163)](-_0x411d6a,_0x106359);},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x156)]=function(){const _0x212dde=_0x49f14c;return this[_0x212dde(0xf6)]()[_0x212dde(0x149)]((_0x4b37cf,_0x1a8bba)=>{const _0x19556f=_0x212dde;return _0x1a8bba&&_0x1a8bba[_0x19556f(0x1f8)][_0x19556f(0x202)](VisuMZ[_0x19556f(0xd7)][_0x19556f(0x1cb)]['AbilityPointsRate'])?_0x4b37cf*(Number(RegExp['$1'])*0.01):_0x4b37cf;},0x1);},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x1c1)]=function(_0x4b5257){const _0x18dfa=_0x49f14c;if(this[_0x18dfa(0x22e)])return;const _0x379e5d=VisuMZ[_0x18dfa(0xd7)]['Settings'][_0x18dfa(0x176)];let _0x55da99=0x0;try{_0x55da99=eval(_0x379e5d[_0x18dfa(0x1cf)]);}catch(_0x919615){if($gameTemp['isPlaytest']())console[_0x18dfa(0xd5)](_0x919615);}this[_0x18dfa(0x1c2)](_0x55da99,_0x4b5257);},Game_Actor['prototype']['earnedAbilityPoints']=function(){const _0xdaba16=_0x49f14c;return this[_0xdaba16(0x291)]=this[_0xdaba16(0x291)]||0x0,this[_0xdaba16(0x13e)]()-this['_earnedAbilityPoints'];},Game_Actor['prototype'][_0x49f14c(0x196)]=function(){const _0x22a819=_0x49f14c;this[_0x22a819(0x20b)]={};},Game_Actor[_0x49f14c(0x284)]['gainStartingSkillPoints']=function(){const _0x3a881f=_0x49f14c,_0x278a2d=VisuMZ[_0x3a881f(0xd7)][_0x3a881f(0x1cb)],_0x3ec2db=this[_0x3a881f(0x21a)]()[_0x3a881f(0x1f8)];if(_0x3ec2db[_0x3a881f(0x202)](_0x278a2d[_0x3a881f(0x223)])){const _0x110b59=eval(RegExp['$1']);this[_0x3a881f(0x212)](_0x110b59);}const _0x3e9621=VisuMZ[_0x3a881f(0xd7)][_0x3a881f(0x211)][_0x3a881f(0x260)];if(!_0x3e9621['SharedResource'])return;const _0x1e39e9=_0x3ec2db[_0x3a881f(0x202)](_0x278a2d['StartClassSkillPoints']);if(_0x1e39e9)for(const _0x2b37f0 of _0x1e39e9){if(!_0x2b37f0)continue;_0x2b37f0[_0x3a881f(0x202)](_0x278a2d[_0x3a881f(0x20a)]);const _0xb665d6=String(RegExp['$1']),_0x81fb01=eval(RegExp['$2']),_0x24910c=/^\d+$/[_0x3a881f(0x1ed)](_0xb665d6);let _0x3fbdf1=0x0;_0x24910c?_0x3fbdf1=Number(_0xb665d6):_0x3fbdf1=DataManager[_0x3a881f(0xae)](_0xb665d6),this[_0x3a881f(0x212)](_0x81fb01,_0x3fbdf1);}},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x13b)]=function(_0xe95d4f){const _0x59ee0e=_0x49f14c;this['_skillPoints']===undefined&&this['initSkillPoints']();const _0x486da2=VisuMZ[_0x59ee0e(0xd7)][_0x59ee0e(0x211)][_0x59ee0e(0x260)];return _0x486da2[_0x59ee0e(0x166)]?_0xe95d4f=0x0:_0xe95d4f=_0xe95d4f||this[_0x59ee0e(0xf3)]()['id'],this[_0x59ee0e(0x20b)][_0xe95d4f]=this[_0x59ee0e(0x20b)][_0xe95d4f]||0x0,Math[_0x59ee0e(0x28f)](this['_skillPoints'][_0xe95d4f]);},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0xa6)]=function(_0x554f48,_0x27eaa4){const _0x3c320c=_0x49f14c;this[_0x3c320c(0x20b)]===undefined&&this[_0x3c320c(0x196)]();const _0x22666c=VisuMZ['SkillLearnSystem']['Settings'][_0x3c320c(0x260)];_0x22666c['SharedResource']?_0x27eaa4=0x0:_0x27eaa4=_0x27eaa4||this[_0x3c320c(0xf3)]()['id'];this[_0x3c320c(0x20b)][_0x27eaa4]=this['_skillPoints'][_0x27eaa4]||0x0,this['_skillPoints'][_0x27eaa4]=Math[_0x3c320c(0x28f)](_0x554f48||0x0);const _0x567c7b=_0x22666c[_0x3c320c(0x1ae)]||Number[_0x3c320c(0x174)];this['_skillPoints'][_0x27eaa4]=this[_0x3c320c(0x20b)][_0x27eaa4][_0x3c320c(0x280)](0x0,_0x567c7b);},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x212)]=function(_0x4650ee,_0x17fdae){const _0x4e9937=_0x49f14c;_0x4650ee>0x0&&(_0x4650ee*=this[_0x4e9937(0x197)]()),this['addSkillPoints'](_0x4650ee,_0x17fdae);},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x298)]=function(_0x57957f){const _0xe6901d=_0x49f14c;if(!Imported[_0xe6901d(0x23f)])return;_0x57957f>0x0&&(_0x57957f*=this[_0xe6901d(0x197)]()),this[_0xe6901d(0x29c)](_0x57957f,_0xe6901d(0x24b));},Game_Actor['prototype'][_0x49f14c(0x29b)]=function(_0xe9af38,_0x3e550d){const _0x50466c=_0x49f14c,_0x4fd94c=VisuMZ['SkillLearnSystem'][_0x50466c(0x211)][_0x50466c(0x260)];_0x4fd94c[_0x50466c(0x166)]?_0x3e550d=0x0:_0x3e550d=_0x3e550d||this[_0x50466c(0xf3)]()['id'],_0xe9af38+=this[_0x50466c(0x13b)](_0x3e550d),this[_0x50466c(0xa6)](_0xe9af38,_0x3e550d);},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x129)]=function(_0xc223f0,_0x5a6134){const _0x8708ed=_0x49f14c;this[_0x8708ed(0x29b)](-_0xc223f0,_0x5a6134);},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x197)]=function(){const _0x45bdd4=_0x49f14c;return this[_0x45bdd4(0xf6)]()[_0x45bdd4(0x149)]((_0xbc2030,_0x49d1b7)=>{const _0x1b428d=_0x45bdd4;return _0x49d1b7&&_0x49d1b7[_0x1b428d(0x1f8)][_0x1b428d(0x202)](VisuMZ['SkillLearnSystem'][_0x1b428d(0x1cb)][_0x1b428d(0x114)])?_0xbc2030*(Number(RegExp['$1'])*0.01):_0xbc2030;},0x1);},Game_Actor['prototype'][_0x49f14c(0x119)]=function(_0x367aaa){const _0x55838a=_0x49f14c;if(this[_0x55838a(0x22e)])return;const _0x56a5b2=VisuMZ['SkillLearnSystem']['Settings'][_0x55838a(0x260)];let _0x372671=0x0;try{_0x372671=eval(_0x56a5b2[_0x55838a(0x1cf)]);}catch(_0x1a0a54){if($gameTemp[_0x55838a(0x12e)]())console[_0x55838a(0xd5)](_0x1a0a54);}this[_0x55838a(0x212)](_0x372671,_0x367aaa);},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x224)]=function(){const _0xc020b6=_0x49f14c;return this[_0xc020b6(0x120)]=this[_0xc020b6(0x120)]||0x0,this['getSkillPoints']()-this[_0xc020b6(0x120)];},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x1df)]=function(_0x53f38e){const _0x4bb12a=_0x49f14c;if(!_0x53f38e)return![];const _0x3cced8=VisuMZ[_0x4bb12a(0xd7)][_0x4bb12a(0x183)](_0x53f38e,_0x4bb12a(0x249));if(VisuMZ[_0x4bb12a(0xd7)]['JS'][_0x3cced8]){if(!VisuMZ[_0x4bb12a(0xd7)]['JS'][_0x3cced8]['call'](this,this,_0x53f38e))return![];}const _0x168134=VisuMZ['SkillLearnSystem']['RegExp'],_0x1aa786=_0x53f38e[_0x4bb12a(0x1f8)];if(_0x1aa786[_0x4bb12a(0x202)](_0x168134[_0x4bb12a(0x215)])){const _0x3702bc=Number(RegExp['$1']);if(_0x3702bc>this['level'])return![];}if(_0x1aa786['match'](_0x168134[_0x4bb12a(0x1da)])){const _0x16be47=String(RegExp['$1'])[_0x4bb12a(0x18b)](',')[_0x4bb12a(0x23a)](_0x2b1463=>_0x2b1463['trim']());for(const _0x47ea17 of _0x16be47){let _0x799ad5=0x0;const _0x1ec692=/^\d+$/[_0x4bb12a(0x1ed)](_0x47ea17);_0x1ec692?_0x799ad5=Number(_0x47ea17):_0x799ad5=DataManager['getSkillIdWithName'](_0x47ea17);if(!this[_0x4bb12a(0x19c)](_0x799ad5))return![];}}if(_0x1aa786[_0x4bb12a(0x202)](_0x168134['LearnReqSkillsAny'])){const _0x5b77b7=String(RegExp['$1'])['split'](',')[_0x4bb12a(0x23a)](_0x62c129=>_0x62c129[_0x4bb12a(0x206)]());let _0x10940d=![];for(const _0x5d9385 of _0x5b77b7){let _0x21c70b=0x0;const _0x520e9b=/^\d+$/['test'](_0x5d9385);_0x520e9b?_0x21c70b=Number(_0x5d9385):_0x21c70b=DataManager['getSkillIdWithName'](_0x5d9385);if($dataSkills[_0x21c70b])console[_0x4bb12a(0xd5)]($dataSkills[_0x21c70b][_0x4bb12a(0x14c)],this['isLearnedSkill'](_0x21c70b));if(this[_0x4bb12a(0x19c)](_0x21c70b)){_0x10940d=!![];break;}}if(!_0x10940d)return![];}if(_0x1aa786[_0x4bb12a(0x202)](_0x168134[_0x4bb12a(0x26e)])){const _0x5ad3e8=String(RegExp['$1'])['split'](',')[_0x4bb12a(0x23a)](_0x46c226=>Number(_0x46c226));for(const _0x416547 of _0x5ad3e8){if(!$gameSwitches[_0x4bb12a(0x168)](_0x416547))return![];}}if(_0x1aa786[_0x4bb12a(0x202)](_0x168134[_0x4bb12a(0x142)])){const _0x18ad19=String(RegExp['$1'])[_0x4bb12a(0x18b)](',')['map'](_0x166a9b=>Number(_0x166a9b));let _0x59ac2a=![];for(const _0x431379 of _0x18ad19){if($gameSwitches[_0x4bb12a(0x168)](_0x431379)){_0x59ac2a=!![];break;}}if(!_0x59ac2a)return![];}return!![];},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x146)]=function(_0x13ebdd){const _0x5487c2=_0x49f14c;if(!_0x13ebdd)return![];const _0x165b3b=DataManager[_0x5487c2(0x127)](_0x13ebdd);if(_0x165b3b>this['getAbilityPoints']())return![];const _0x367f5f=DataManager[_0x5487c2(0x11a)](_0x13ebdd);if(_0x367f5f>this[_0x5487c2(0x13b)]())return![];const _0x3daabd=DataManager[_0x5487c2(0x19b)](_0x13ebdd);if(_0x3daabd>$gameParty[_0x5487c2(0x16a)]())return![];if(Imported[_0x5487c2(0x23f)]){const _0x5d3057=DataManager[_0x5487c2(0xc7)](_0x13ebdd);if(_0x5d3057>this[_0x5487c2(0x1f7)]())return![];const _0x3046c8=DataManager[_0x5487c2(0xaa)](_0x13ebdd);if(_0x3046c8>this['getJobPoints']())return![];}const _0x5df255=DataManager[_0x5487c2(0x246)](_0x13ebdd);for(const _0x5ab14e of _0x5df255){if(!_0x5ab14e)continue;const _0xb5ad84=$dataItems[_0x5ab14e['id']];if(_0xb5ad84&&_0x5ab14e[_0x5487c2(0x137)]>$gameParty['numItems'](_0xb5ad84))return![];}const _0x263600=DataManager[_0x5487c2(0x1ee)](_0x13ebdd);for(const _0x4aa667 of _0x263600){if(!_0x4aa667)continue;const _0x53828e=$dataWeapons[_0x4aa667['id']];if(_0x53828e&&_0x4aa667[_0x5487c2(0x137)]>$gameParty[_0x5487c2(0x195)](_0x53828e))return![];}const _0x314ad5=DataManager[_0x5487c2(0x13f)](_0x13ebdd);for(const _0x12b1da of _0x314ad5){if(!_0x12b1da)continue;const _0x5e3fed=$dataArmors[_0x12b1da['id']];if(_0x5e3fed&&_0x12b1da[_0x5487c2(0x137)]>$gameParty[_0x5487c2(0x195)](_0x5e3fed))return![];}return!![];},Game_Actor[_0x49f14c(0x284)]['processPayForSkillLearnSystem']=function(_0x14f492){const _0x309c63=_0x49f14c;if(!_0x14f492)return;const _0x4b639e=DataManager['getSkillLearnAbilityPointCost'](_0x14f492);this['loseAbilityPoints'](_0x4b639e);const _0x4e5f89=DataManager['getSkillLearnSkillPointCost'](_0x14f492);this['loseSkillPoints'](_0x4e5f89);const _0x5e542a=DataManager[_0x309c63(0x19b)](_0x14f492);$gameParty[_0x309c63(0x138)](_0x5e542a);if(Imported[_0x309c63(0x23f)]){const _0x454189=DataManager[_0x309c63(0xc7)](_0x14f492);this[_0x309c63(0x1ef)](_0x454189);const _0x61e688=DataManager[_0x309c63(0xaa)](_0x14f492);this[_0x309c63(0x1cc)](_0x61e688);}const _0x45ca9a=DataManager[_0x309c63(0x246)](_0x14f492);for(const _0x3227a9 of _0x45ca9a){if(!_0x3227a9)continue;const _0xfe8b9e=$dataItems[_0x3227a9['id']],_0x3bf25f=_0x3227a9[_0x309c63(0x137)];$gameParty['loseItem'](_0xfe8b9e,_0x3bf25f);}const _0x2a44a6=DataManager['getSkillLearnWeaponCost'](_0x14f492);for(const _0x3afddc of _0x2a44a6){if(!_0x3afddc)continue;const _0x362bb3=$dataWeapons[_0x3afddc['id']],_0x41911e=_0x3afddc[_0x309c63(0x137)];$gameParty[_0x309c63(0x290)](_0x362bb3,_0x41911e);}const _0x240a11=DataManager[_0x309c63(0x13f)](_0x14f492);for(const _0x549b4e of _0x240a11){if(!_0x549b4e)continue;const _0x496167=$dataArmors[_0x549b4e['id']],_0x14bb6a=_0x549b4e[_0x309c63(0x137)];$gameParty[_0x309c63(0x290)](_0x496167,_0x14bb6a);}this[_0x309c63(0x148)](_0x14f492['id']),this[_0x309c63(0x103)]();},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x213)]=Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x148)],Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x148)]=function(_0x53b3e6){const _0x3f7506=_0x49f14c,_0x171ade=!this['isLearnedSkill'](_0x53b3e6);VisuMZ[_0x3f7506(0xd7)]['Game_Actor_learnSkill'][_0x3f7506(0x24d)](this,_0x53b3e6);if(_0x171ade&&this[_0x3f7506(0x19c)](_0x53b3e6)){const _0x4294ee=$dataSkills[_0x53b3e6],_0x6a00d4=VisuMZ['SkillLearnSystem'][_0x3f7506(0x183)](_0x4294ee,_0x3f7506(0x1e4));VisuMZ[_0x3f7506(0xd7)]['JS'][_0x6a00d4]&&VisuMZ[_0x3f7506(0xd7)]['JS'][_0x6a00d4][_0x3f7506(0x24d)](this,this,_0x4294ee);}},Game_Actor[_0x49f14c(0x284)][_0x49f14c(0x200)]=function(){const _0x22c88b=_0x49f14c,_0x4ae6f4=DataManager[_0x22c88b(0x19a)](this[_0x22c88b(0xf3)]()['id']);for(const _0x15589c of _0x4ae6f4){const _0x3e2847=$dataSkills[_0x15589c];if(!_0x3e2847)continue;if(_0x3e2847[_0x22c88b(0x14c)][_0x22c88b(0x206)]()==='')continue;if(_0x3e2847[_0x22c88b(0x14c)][_0x22c88b(0x202)](/-----/i))continue;this[_0x22c88b(0x148)](_0x15589c);}},Game_Enemy[_0x49f14c(0x284)]['abilityPoints']=function(){const _0x151a02=_0x49f14c,_0x41abea=VisuMZ[_0x151a02(0xd7)]['Settings'][_0x151a02(0x176)],_0x4766bb=VisuMZ[_0x151a02(0xd7)][_0x151a02(0x1cb)],_0x101a01=this[_0x151a02(0x26c)]()[_0x151a02(0x1f8)];if(_0x101a01['match'](_0x4766bb[_0x151a02(0x164)]))try{return eval(RegExp['$1']);}catch(_0x4fcc9b){if($gameTemp[_0x151a02(0x12e)]())console[_0x151a02(0xd5)](_0x4fcc9b);return 0x0;}try{return eval(_0x41abea[_0x151a02(0x135)]);}catch(_0xc6410d){if($gameTemp[_0x151a02(0x12e)]())console[_0x151a02(0xd5)](_0xc6410d);return 0x0;}},Game_Enemy[_0x49f14c(0x284)][_0x49f14c(0x160)]=function(){const _0x4c3555=_0x49f14c,_0x526b2a=VisuMZ[_0x4c3555(0xd7)]['Settings']['SkillPoints'],_0x37334c=VisuMZ[_0x4c3555(0xd7)][_0x4c3555(0x1cb)],_0x43851e=this['enemy']()[_0x4c3555(0x1f8)];if(_0x43851e[_0x4c3555(0x202)](_0x37334c[_0x4c3555(0x209)]))try{return eval(RegExp['$1']);}catch(_0x2d22f2){if($gameTemp[_0x4c3555(0x12e)]())console[_0x4c3555(0xd5)](_0x2d22f2);return 0x0;}try{return eval(_0x526b2a[_0x4c3555(0x135)]);}catch(_0x19f68d){if($gameTemp[_0x4c3555(0x12e)]())console[_0x4c3555(0xd5)](_0x19f68d);return 0x0;}},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0xfc)]=Game_Party[_0x49f14c(0x284)]['setupBattleTestMembers'],Game_Party[_0x49f14c(0x284)][_0x49f14c(0x112)]=function(){const _0x3bcdf1=_0x49f14c;VisuMZ['SkillLearnSystem'][_0x3bcdf1(0xfc)][_0x3bcdf1(0x24d)](this),this[_0x3bcdf1(0x104)]();},Game_Party[_0x49f14c(0x284)]['setupBattleTestMembersSkillLearnSystem']=function(){const _0x1c0c24=_0x49f14c;for(const _0x2c6528 of this[_0x1c0c24(0x1b7)]()){if(!_0x2c6528)continue;_0x2c6528[_0x1c0c24(0x200)]();}},Game_Troop['prototype'][_0x49f14c(0x1d0)]=function(){const _0x46afff=_0x49f14c;return this[_0x46afff(0x288)]()['reduce']((_0xf9c28c,_0x30fa62)=>_0xf9c28c+_0x30fa62[_0x46afff(0x21e)](),0x0);},Game_Troop[_0x49f14c(0x284)][_0x49f14c(0x12b)]=function(){const _0x19a2a5=_0x49f14c;return this[_0x19a2a5(0x288)]()[_0x19a2a5(0x149)]((_0x20afb6,_0x26fb6a)=>_0x20afb6+_0x26fb6a[_0x19a2a5(0x160)](),0x0);},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0xe9)]=Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x1b5)],Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x1b5)]=function(){const _0x41b709=_0x49f14c;VisuMZ['SkillLearnSystem']['Scene_Skill_create'][_0x41b709(0x24d)](this),this[_0x41b709(0x228)]();},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x228)]=function(){const _0x3d43bc=_0x49f14c;this[_0x3d43bc(0x205)](),this[_0x3d43bc(0x190)]();},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x205)]=function(){const _0x397d5d=_0x49f14c,_0x284fd5=this[_0x397d5d(0xc1)]();this[_0x397d5d(0x22a)]=new Window_SkillLearnIngredients(_0x284fd5),this['addWindow'](this['_skillLearnIngredientsWindow']),this[_0x397d5d(0x22a)]['hide']();const _0x1be688=VisuMZ[_0x397d5d(0xd7)]['Settings'][_0x397d5d(0xf8)][_0x397d5d(0x1d1)];this[_0x397d5d(0x22a)]['setBackgroundType'](_0x1be688);},Scene_Skill[_0x49f14c(0x284)]['skillLearnIngredientsWindowRect']=function(){const _0xf6eaf0=_0x49f14c;if(VisuMZ[_0xf6eaf0(0xd7)][_0xf6eaf0(0x211)][_0xf6eaf0(0xf8)][_0xf6eaf0(0x145)])return VisuMZ['SkillLearnSystem'][_0xf6eaf0(0x211)][_0xf6eaf0(0xf8)]['DetailWindow_RectJS']['call'](this);const _0x168440=this[_0xf6eaf0(0x12f)](),_0x577425=_0x168440['x'],_0x5ac755=_0x168440['y'],_0x6b13e7=_0x168440[_0xf6eaf0(0x1c7)],_0x5e4335=_0x168440['height']-this[_0xf6eaf0(0x106)](0x2,![]);return new Rectangle(_0x577425,_0x5ac755,_0x6b13e7,_0x5e4335);},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x190)]=function(){const _0x30bc97=_0x49f14c,_0x30ba83=this['skillLearnConfirmWindow']();this['_skillLearnConfirmWindow']=new Window_SkillLearnConfirm(_0x30ba83),this[_0x30bc97(0x1ec)](this[_0x30bc97(0x14b)]),this[_0x30bc97(0x14b)][_0x30bc97(0x225)]('ok',this[_0x30bc97(0x147)]['bind'](this)),this['_skillLearnConfirmWindow'][_0x30bc97(0x225)](_0x30bc97(0x299),this[_0x30bc97(0x1d6)][_0x30bc97(0x1a3)](this)),this[_0x30bc97(0x14b)]['hide']();const _0x41f0de=VisuMZ[_0x30bc97(0xd7)]['Settings'][_0x30bc97(0xf8)]['ConfirmWindow_BgType'];this[_0x30bc97(0x14b)][_0x30bc97(0x1ba)](_0x41f0de);},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x14d)]=function(){const _0x1d6a1f=_0x49f14c;if(VisuMZ[_0x1d6a1f(0xd7)]['Settings'][_0x1d6a1f(0xf8)][_0x1d6a1f(0xcc)])return VisuMZ[_0x1d6a1f(0xd7)][_0x1d6a1f(0x211)][_0x1d6a1f(0xf8)]['ConfirmWindow_RectJS'][_0x1d6a1f(0x24d)](this);const _0x407da4=this[_0x1d6a1f(0x12f)](),_0x3f9f83=_0x407da4[_0x1d6a1f(0x1c7)],_0x1413d4=this[_0x1d6a1f(0x106)](0x2,![]),_0x36a1e5=_0x407da4['x'],_0x1eee0c=_0x407da4['y']+_0x407da4['height']-_0x1413d4;return new Rectangle(_0x36a1e5,_0x1eee0c,_0x3f9f83,_0x1413d4);},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x20e)]=Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0xbb)],Scene_Skill[_0x49f14c(0x284)]['onItemOk']=function(){const _0x1316fd=_0x49f14c;this[_0x1316fd(0x170)][_0x1316fd(0x1dc)]()?this[_0x1316fd(0x111)]():VisuMZ[_0x1316fd(0xd7)][_0x1316fd(0x20e)][_0x1316fd(0x24d)](this);},Scene_Skill[_0x49f14c(0x284)]['onSkillLearnItemOk']=function(){const _0xba746a=_0x49f14c;this['_itemWindow'][_0xba746a(0x1ce)](),this[_0xba746a(0x22a)][_0xba746a(0x25b)](),this['_skillLearnIngredientsWindow'][_0xba746a(0x103)](),this[_0xba746a(0x14b)][_0xba746a(0x25b)](),this['_skillLearnConfirmWindow'][_0xba746a(0x103)](),this['_skillLearnConfirmWindow']['activate'](),this[_0xba746a(0x14b)][_0xba746a(0x25a)](0x0);},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x147)]=function(){const _0x4c848b=_0x49f14c;VisuMZ[_0x4c848b(0xd7)][_0x4c848b(0x211)][_0x4c848b(0x210)]['ShowAnimations']?this[_0x4c848b(0x28e)]():this['finishSkillLearnAnimation']();},Scene_Skill['prototype'][_0x49f14c(0x1d6)]=function(){const _0x9a4124=_0x49f14c;this[_0x9a4124(0x170)][_0x9a4124(0x25b)](),this['_itemWindow'][_0x9a4124(0x278)](),this['_skillLearnIngredientsWindow'][_0x9a4124(0x1ce)](),this[_0x9a4124(0x14b)][_0x9a4124(0x1ce)]();},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0xb6)]=function(){const _0x9b917f=_0x49f14c;this[_0x9b917f(0xbf)][_0x9b917f(0xed)]=!![],this['_skillLearnAnimationPlaying']=![],SoundManager[_0x9b917f(0x9f)](),this[_0x9b917f(0x282)]()[_0x9b917f(0x24a)](this['item']()),this[_0x9b917f(0x1d6)](),this[_0x9b917f(0x170)][_0x9b917f(0x103)](),this[_0x9b917f(0x203)][_0x9b917f(0x103)]();},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x25f)]=Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0xf7)],Scene_Skill[_0x49f14c(0x284)]['update']=function(){const _0xda8b6a=_0x49f14c;VisuMZ['SkillLearnSystem'][_0xda8b6a(0x25f)][_0xda8b6a(0x24d)](this),this['updateSkillLearnAnimation']();},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x28e)]=function(){const _0x5e9092=_0x49f14c;this[_0x5e9092(0x227)]=!![],this['_skillLearnAnimationWait']=0x14,this[_0x5e9092(0xbf)][_0x5e9092(0xed)]=VisuMZ[_0x5e9092(0xd7)]['Settings'][_0x5e9092(0x210)][_0x5e9092(0x276)]||![],this[_0x5e9092(0x1fa)]();},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x1fa)]=function(){const _0x105818=_0x49f14c;this[_0x105818(0x139)]=new Sprite(),this[_0x105818(0xd8)](this['_skillLearnIconSprite']),this[_0x105818(0x113)](),this[_0x105818(0x24c)](),this[_0x105818(0x16d)](),this[_0x105818(0xeb)](),this[_0x105818(0x100)](),this['createSkillLearnAnimation'](this['_skillLearnAnimationIDs']['shift']());},Scene_Skill['prototype'][_0x49f14c(0x113)]=function(){const _0x26c787=_0x49f14c,_0xe74dc5=VisuMZ[_0x26c787(0xd7)][_0x26c787(0x1cb)],_0x41128c=this[_0x26c787(0x1c4)]()[_0x26c787(0x1f8)];this[_0x26c787(0x1d3)]='';if(_0x41128c[_0x26c787(0x202)](_0xe74dc5['learnPicture']))this[_0x26c787(0x1d3)]=String(RegExp['$1']);else _0x41128c[_0x26c787(0x202)](_0xe74dc5[_0x26c787(0xcf)])&&(this[_0x26c787(0x1d3)]=String(RegExp['$1']));this[_0x26c787(0x108)]=new Sprite();this[_0x26c787(0x1d3)]?this[_0x26c787(0x108)][_0x26c787(0x262)]=ImageManager[_0x26c787(0x110)](this[_0x26c787(0x1d3)]):(this[_0x26c787(0x108)][_0x26c787(0x262)]=ImageManager['loadSystem'](_0x26c787(0x143)),this[_0x26c787(0x108)][_0x26c787(0x262)][_0x26c787(0xc0)]=![]);this['_skillLearnBitmapSprite'][_0x26c787(0xa4)]['x']=0.5,this[_0x26c787(0x108)]['anchor']['y']=0.5;if(!this[_0x26c787(0x1d3)]){const _0x1a2166=VisuMZ[_0x26c787(0xd7)][_0x26c787(0x211)][_0x26c787(0x210)][_0x26c787(0x17c)]||0x8;this[_0x26c787(0x108)]['scale']['x']=_0x1a2166,this[_0x26c787(0x108)][_0x26c787(0xac)]['y']=_0x1a2166;}this[_0x26c787(0x139)]['addChild'](this['_skillLearnBitmapSprite']);},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x24c)]=function(){const _0x749bc5=_0x49f14c;if(this[_0x749bc5(0x1d3)])return;const _0x4483bc=this[_0x749bc5(0x1c4)](),_0x4d19fa=_0x4483bc[_0x749bc5(0x1db)],_0x1ca4d5=ImageManager['iconWidth'],_0x49d644=ImageManager[_0x749bc5(0x22f)],_0x161029=_0x4d19fa%0x10*_0x1ca4d5,_0xf0a4b8=Math[_0x749bc5(0x267)](_0x4d19fa/0x10)*_0x49d644;this['_skillLearnBitmapSprite'][_0x749bc5(0x1ea)](_0x161029,_0xf0a4b8,_0x1ca4d5,_0x49d644);},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x16d)]=function(){const _0x150853=_0x49f14c;this[_0x150853(0x139)]['x']=Math[_0x150853(0x28f)](Graphics[_0x150853(0x1c7)]/0x2);const _0x1c28f6=Math[_0x150853(0x28f)](ImageManager[_0x150853(0x22f)]*this[_0x150853(0x139)][_0x150853(0xac)]['y']);this[_0x150853(0x139)]['y']=Math[_0x150853(0x28f)]((Graphics['height']+_0x1c28f6)/0x2);},Scene_Skill['prototype'][_0x49f14c(0xeb)]=function(){const _0x35ba12=_0x49f14c;this[_0x35ba12(0x1b9)]=VisuMZ[_0x35ba12(0xd7)][_0x35ba12(0x211)][_0x35ba12(0x210)]['FadeSpeed']||0x1,this[_0x35ba12(0x1c4)]()[_0x35ba12(0x1f8)][_0x35ba12(0x202)](VisuMZ[_0x35ba12(0xd7)][_0x35ba12(0x1cb)]['opacitySpeed'])&&(this[_0x35ba12(0x1b9)]=Math[_0x35ba12(0x16e)](Number(RegExp['$1']),0x1)),this['_skillLearnIconSprite'][_0x35ba12(0x180)]=0x0;},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x100)]=function(){const _0x55f405=_0x49f14c;this[_0x55f405(0xf4)]=[],this[_0x55f405(0x1c4)]()[_0x55f405(0x1f8)][_0x55f405(0x202)](VisuMZ[_0x55f405(0xd7)][_0x55f405(0x1cb)][_0x55f405(0x28b)])?this['_skillLearnAnimationIDs']=RegExp['$1'][_0x55f405(0x18b)](',')['map'](_0x1697ba=>Number(_0x1697ba)):this['_skillLearnAnimationIDs']=this['_skillLearnAnimationIDs'][_0x55f405(0xe0)](VisuMZ[_0x55f405(0xd7)][_0x55f405(0x211)][_0x55f405(0x210)][_0x55f405(0x193)]);},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0xee)]=function(_0x2e1b19){const _0x1b73af=_0x49f14c,_0x412b58=$dataAnimations[_0x2e1b19];if(!_0x412b58)return;const _0x594d6c=this[_0x1b73af(0xb9)](_0x412b58);this[_0x1b73af(0x23d)]=new(_0x594d6c?Sprite_AnimationMV:Sprite_Animation)();const _0x118502=[this['_skillLearnIconSprite']],_0x21943f=0x0;this[_0x1b73af(0x23d)][_0x1b73af(0x1f3)](_0x118502,_0x412b58,![],_0x21943f,null),this[_0x1b73af(0xd8)](this[_0x1b73af(0x23d)]);},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0xb9)]=function(_0x58b1c6){const _0x1a35e5=_0x49f14c;return!!_0x58b1c6[_0x1a35e5(0x1c6)];},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x25d)]=function(){const _0x2cda0f=_0x49f14c;if(!this[_0x2cda0f(0x227)])return;this['updateSkillLearnSpriteOpacity'](),this['updateSkillLearnAnimationSprite'](),this[_0x2cda0f(0xc2)]()&&this[_0x2cda0f(0x229)]();},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x115)]=function(){const _0x187bae=_0x49f14c;this[_0x187bae(0x139)][_0x187bae(0x180)]+=this[_0x187bae(0x1b9)];},Scene_Skill['prototype'][_0x49f14c(0x272)]=function(){const _0x54803a=_0x49f14c;if(!this[_0x54803a(0x23d)])return;if(this[_0x54803a(0x23d)][_0x54803a(0x1b2)]())return;this[_0x54803a(0xa2)](),this[_0x54803a(0xee)](this[_0x54803a(0xf4)]['shift']());},Scene_Skill['prototype'][_0x49f14c(0xa2)]=function(){const _0x479ccf=_0x49f14c;if(!this[_0x479ccf(0x23d)])return;this['removeChild'](this['_skillLearnAnimationSprite']),this['_skillLearnAnimationSprite'][_0x479ccf(0x1b6)](),this[_0x479ccf(0x23d)]=undefined;},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x155)]=function(){const _0x2b93ed=_0x49f14c;if(!this[_0x2b93ed(0x139)])return;this[_0x2b93ed(0xa0)](this['_skillLearnIconSprite']),this[_0x2b93ed(0x139)]['destroy'](),this[_0x2b93ed(0x139)]=undefined;},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0xc2)]=function(){const _0x38d07c=_0x49f14c;if(TouchInput[_0x38d07c(0xa7)]())return!![];if(Input[_0x38d07c(0x18a)]('ok'))return!![];if(Input[_0x38d07c(0x18a)](_0x38d07c(0x299)))return!![];if(this[_0x38d07c(0x139)][_0x38d07c(0x180)]<0xff)return![];if(this[_0x38d07c(0x23d)])return![];return this['_skillLearnAnimationWait']--<=0x0;},Scene_Skill[_0x49f14c(0x284)][_0x49f14c(0x229)]=function(){const _0x1af060=_0x49f14c;this[_0x1af060(0xa2)](),this['destroySkillLearnSprite'](),this['finishSkillLearnAnimation'](),TouchInput[_0x1af060(0x15b)](),Input[_0x1af060(0x15b)]();},Window_Base[_0x49f14c(0x284)]['drawAbilityPoints']=function(_0x3394a0,_0x4b3ce3,_0x525a54,_0x3b2eb8,_0x34b816){const _0x497a9f=_0x49f14c;_0x34b816=_0x34b816||_0x497a9f(0x194);const _0x324271=_0x497a9f(0xf5)['format'](ImageManager['abilityPointsIcon']),_0xdb72a4=TextManager[_0x497a9f(0xca)],_0x44c3be=_0xdb72a4['format'](_0x3394a0,TextManager[_0x497a9f(0x153)],_0x324271,TextManager[_0x497a9f(0x141)]),_0x56ceb9=this[_0x497a9f(0xd2)](_0x44c3be)[_0x497a9f(0x1c7)];if(_0x34b816===_0x497a9f(0x194))_0x4b3ce3+=0x0;else _0x34b816===_0x497a9f(0x28d)?_0x4b3ce3+=Math['round']((_0x3b2eb8-_0x56ceb9)/0x2):_0x4b3ce3+=_0x3b2eb8-_0x56ceb9;this[_0x497a9f(0x126)](_0x44c3be,_0x4b3ce3,_0x525a54);},Window_Base[_0x49f14c(0x284)][_0x49f14c(0x165)]=function(_0x15f8d3,_0x547c9c,_0x59926a,_0xa54974,_0x3ff424,_0x3cce53){const _0x248b81=_0x49f14c,_0x34f572=_0x15f8d3[_0x248b81(0x13e)](_0x547c9c);this[_0x248b81(0x140)](_0x34f572,_0x59926a,_0xa54974,_0x3ff424,_0x3cce53);},Window_Base[_0x49f14c(0x284)][_0x49f14c(0x107)]=function(_0x4704e3,_0x39934a,_0x4c99f6,_0x2feff7,_0x3583b0){const _0x27e088=_0x49f14c;_0x3583b0=_0x3583b0||_0x27e088(0x194);const _0x3f9834=_0x27e088(0xf5)['format'](ImageManager['skillPointsIcon']),_0xc38c2f=TextManager[_0x27e088(0x269)],_0x21b305=_0xc38c2f[_0x27e088(0x207)](_0x4704e3,TextManager[_0x27e088(0x1c0)],_0x3f9834,TextManager[_0x27e088(0x15d)]),_0x1acf8e=this[_0x27e088(0xd2)](_0x21b305)[_0x27e088(0x1c7)];if(_0x3583b0===_0x27e088(0x194))_0x39934a+=0x0;else _0x3583b0===_0x27e088(0x28d)?_0x39934a+=Math[_0x27e088(0x28f)]((_0x2feff7-_0x1acf8e)/0x2):_0x39934a+=_0x2feff7-_0x1acf8e;this[_0x27e088(0x126)](_0x21b305,_0x39934a,_0x4c99f6);},Window_Base['prototype'][_0x49f14c(0x292)]=function(_0x5762e8,_0xd5c063,_0x276dfe,_0x2fccff,_0x1c3644,_0x1bc71b){const _0x566ce4=_0x49f14c,_0x31535f=_0x5762e8[_0x566ce4(0x13b)](_0xd5c063);this[_0x566ce4(0x107)](_0x31535f,_0x276dfe,_0x2fccff,_0x1c3644,_0x1bc71b);},VisuMZ[_0x49f14c(0xd7)]['Window_SkillType_makeCommandList']=Window_SkillType[_0x49f14c(0x284)][_0x49f14c(0x191)],Window_SkillType['prototype']['makeCommandList']=function(){const _0x196c96=_0x49f14c;VisuMZ[_0x196c96(0xd7)][_0x196c96(0x10d)][_0x196c96(0x24d)](this),this[_0x196c96(0x23e)]();},Window_SkillType['prototype'][_0x49f14c(0x23e)]=function(){const _0x57f101=_0x49f14c;if(!$gameSystem['isSkillLearnSystemMenuAccess']())return;if(!this['_actor'])return;let _0x3a2d33=this['skillLearnSystemCommandName']();const _0x5ef165=this[_0x57f101(0x266)]['skillTypes']()[0x0];this[_0x57f101(0x1a7)](_0x3a2d33,_0x57f101(0xa5),!![],'skillLearn');},Window_SkillType[_0x49f14c(0x284)]['skillLearnSystemCommandName']=function(){const _0x43b3e5=_0x49f14c;let _0x32062a=TextManager[_0x43b3e5(0x27f)];if(_0x32062a[_0x43b3e5(0x202)](/\\I\[(\d+)\]/i))return _0x32062a;if(!Imported[_0x43b3e5(0x10e)])return _0x32062a;if(this['commandStyle']()==='text')return _0x32062a;const _0x1ed16f=TextManager[_0x43b3e5(0x1af)];return _0x43b3e5(0x1e3)[_0x43b3e5(0x207)](_0x1ed16f,_0x32062a);},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x1f0)]=Window_SkillStatus['prototype'][_0x49f14c(0x103)],Window_SkillStatus[_0x49f14c(0x284)][_0x49f14c(0x103)]=function(){const _0x1ba823=_0x49f14c;this['resetFontSettings'](),this[_0x1ba823(0x1dc)]()?this[_0x1ba823(0x179)]():VisuMZ[_0x1ba823(0xd7)][_0x1ba823(0x1f0)][_0x1ba823(0x24d)](this);},Window_SkillStatus[_0x49f14c(0x284)][_0x49f14c(0x1dc)]=function(){const _0x1fc7ac=_0x49f14c,_0xb51614=SceneManager[_0x1fc7ac(0x182)];if(!_0xb51614)return![];const _0x5c07f4=_0xb51614[_0x1fc7ac(0x170)];if(!_0x5c07f4)return![];return _0x5c07f4[_0x1fc7ac(0x1dc)]&&_0x5c07f4['isSkillLearnMode']();},Window_SkillStatus['prototype'][_0x49f14c(0x179)]=function(){const _0x3d9d09=_0x49f14c;if(!this[_0x3d9d09(0x266)])return;Window_StatusBase['prototype'][_0x3d9d09(0x103)][_0x3d9d09(0x24d)](this);if(VisuMZ[_0x3d9d09(0xd7)][_0x3d9d09(0x211)][_0x3d9d09(0x1bc)][_0x3d9d09(0x222)]){VisuMZ[_0x3d9d09(0xd7)]['Settings'][_0x3d9d09(0x1bc)][_0x3d9d09(0x222)][_0x3d9d09(0x24d)](this);return;}const _0x55da18=this[_0x3d9d09(0x1e2)]()/0x2,_0xbe071c=this[_0x3d9d09(0xdf)],_0x3a4f05=_0xbe071c/0x2-this['lineHeight']()*1.5;this[_0x3d9d09(0x28c)](this[_0x3d9d09(0x266)],_0x55da18+0x1,0x0,0x90,_0xbe071c),this[_0x3d9d09(0x177)](this[_0x3d9d09(0x266)],_0x55da18+0xb4,_0x3a4f05);let _0x144528=this[_0x3d9d09(0x1e2)]()/0x2+0xb4+0xb4+0xb4,_0x38cd87=this[_0x3d9d09(0x239)]-_0x144528-0x2;if(_0x38cd87<0x12c)return;const _0x384bcc=this[_0x3d9d09(0x17a)](),_0x59bbbe=Math['floor'](this[_0x3d9d09(0xdf)]/this[_0x3d9d09(0x15c)]()),_0x1d9fe4=Math[_0x3d9d09(0xb2)](_0x384bcc[_0x3d9d09(0xb8)]/_0x59bbbe);let _0xf96a47=_0x144528,_0x575464=Math[_0x3d9d09(0x16e)](Math['round']((this[_0x3d9d09(0xdf)]-this[_0x3d9d09(0x15c)]()*Math['ceil'](_0x384bcc[_0x3d9d09(0xb8)]/_0x1d9fe4))/0x2),0x0);const _0x5ea063=_0x575464;let _0x3206e0=(this[_0x3d9d09(0x239)]-_0xf96a47-this['itemPadding']()*0x2*_0x1d9fe4)/_0x1d9fe4;_0x1d9fe4===0x1&&(_0x3206e0=Math[_0x3d9d09(0xc3)](ImageManager[_0x3d9d09(0x11c)],_0x3206e0),_0xf96a47+=Math['round']((this['innerWidth']-_0xf96a47-this[_0x3d9d09(0x13c)]()*0x2-_0x3206e0)/0x2));for(const _0x5a5bb2 of _0x384bcc){switch(_0x5a5bb2){case'AP':this[_0x3d9d09(0x165)](this[_0x3d9d09(0x266)],this['_actor'][_0x3d9d09(0xf3)]()['id'],_0xf96a47,_0x575464,_0x3206e0,_0x3d9d09(0xa8));break;case'CP':Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x3d9d09(0x1aa)](this[_0x3d9d09(0x266)],this['_actor'][_0x3d9d09(0xf3)]()['id'],_0xf96a47,_0x575464,_0x3206e0,_0x3d9d09(0xa8));break;case'JP':Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x3d9d09(0x27c)](this[_0x3d9d09(0x266)],this[_0x3d9d09(0x266)][_0x3d9d09(0xf3)]()['id'],_0xf96a47,_0x575464,_0x3206e0,_0x3d9d09(0xa8));break;case'SP':this[_0x3d9d09(0x292)](this[_0x3d9d09(0x266)],this[_0x3d9d09(0x266)][_0x3d9d09(0xf3)]()['id'],_0xf96a47,_0x575464,_0x3206e0,_0x3d9d09(0xa8));break;case _0x3d9d09(0xcb):this[_0x3d9d09(0x1a8)]($gameParty[_0x3d9d09(0x16a)](),TextManager[_0x3d9d09(0x201)],_0xf96a47,_0x575464,_0x3206e0);break;default:continue;}_0x575464+=this['lineHeight'](),_0x575464+this[_0x3d9d09(0x15c)]()>this['innerHeight']&&(_0x575464=_0x5ea063,_0xf96a47+=_0x3206e0+this['itemPadding']()*0x2);}},Window_SkillStatus[_0x49f14c(0x284)][_0x49f14c(0x17a)]=function(){const _0x443e54=_0x49f14c,_0x351f02=JsonEx[_0x443e54(0x1fe)](VisuMZ[_0x443e54(0xd7)][_0x443e54(0x211)][_0x443e54(0x1bc)][_0x443e54(0x245)]);return!Imported[_0x443e54(0x23f)]&&(_0x351f02['remove']('CP'),_0x351f02[_0x443e54(0x144)]('JP')),_0x351f02[_0x443e54(0x144)]('Item')['remove'](_0x443e54(0x167))[_0x443e54(0x144)](_0x443e54(0x208));},Window_SkillList[_0x49f14c(0x284)]['isSkillLearnMode']=function(){const _0x38a268=_0x49f14c;return this[_0x38a268(0x1de)]===_0x38a268(0x1d2);},VisuMZ['SkillLearnSystem'][_0x49f14c(0xc6)]=Window_SkillList['prototype'][_0x49f14c(0x217)],Window_SkillList[_0x49f14c(0x284)][_0x49f14c(0x217)]=function(_0x2721e2){const _0x443547=_0x49f14c,_0x22ae83=this[_0x443547(0x1dc)]();VisuMZ[_0x443547(0xd7)]['Window_SkillList_setStypeId'][_0x443547(0x24d)](this,_0x2721e2);if(_0x22ae83!==this['isSkillLearnMode']()){const _0x3d118c=SceneManager[_0x443547(0x182)];if(!_0x3d118c)return;const _0x4b8ef9=_0x3d118c[_0x443547(0x203)];if(_0x4b8ef9)_0x4b8ef9[_0x443547(0x103)]();}},VisuMZ[_0x49f14c(0xd7)]['Window_SkillList_maxCols']=Window_SkillList[_0x49f14c(0x284)][_0x49f14c(0x1d7)],Window_SkillList[_0x49f14c(0x284)][_0x49f14c(0x1d7)]=function(){const _0x5245a7=_0x49f14c;return this['isSkillLearnMode']()?0x1:VisuMZ[_0x5245a7(0xd7)][_0x5245a7(0xe2)]['call'](this);},VisuMZ['SkillLearnSystem'][_0x49f14c(0x109)]=Window_SkillList[_0x49f14c(0x284)]['makeItemList'],Window_SkillList[_0x49f14c(0x284)]['makeItemList']=function(){const _0x5aecc2=_0x49f14c;this[_0x5aecc2(0x266)]&&this[_0x5aecc2(0x1dc)]()?this[_0x5aecc2(0x204)]():VisuMZ[_0x5aecc2(0xd7)][_0x5aecc2(0x109)][_0x5aecc2(0x24d)](this);},Window_SkillList['prototype'][_0x49f14c(0x204)]=function(){const _0x42769a=_0x49f14c,_0x3b3a17=DataManager['getSkillLearnSkillsFromClass'](this['_actor'][_0x42769a(0xf3)]()['id']);this[_0x42769a(0xa1)]=_0x3b3a17[_0x42769a(0x23a)](_0xfcc609=>$dataSkills[_0xfcc609])[_0x42769a(0xff)](_0x5dd998=>this[_0x42769a(0xf9)](_0x5dd998));},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0xd1)]=Window_SkillList[_0x49f14c(0x284)]['includes'],Window_SkillList[_0x49f14c(0x284)][_0x49f14c(0xf9)]=function(_0x2b274c){const _0x1dd1d=_0x49f14c;return this[_0x1dd1d(0x1dc)]()?this[_0x1dd1d(0x133)](_0x2b274c):VisuMZ['SkillLearnSystem'][_0x1dd1d(0xd1)][_0x1dd1d(0x24d)](this,_0x2b274c);},Window_SkillList['prototype'][_0x49f14c(0x133)]=function(_0x3bf35c){const _0x50dea2=_0x49f14c;if(!_0x3bf35c)return![];if(_0x3bf35c[_0x50dea2(0x14c)][_0x50dea2(0xb8)]<=0x0)return![];if(_0x3bf35c[_0x50dea2(0x14c)][_0x50dea2(0x202)](/-----/i))return![];const _0x4d9a7f=VisuMZ['SkillLearnSystem'][_0x50dea2(0x183)](_0x3bf35c,_0x50dea2(0x23c));if(VisuMZ[_0x50dea2(0xd7)]['JS'][_0x4d9a7f]){if(!VisuMZ[_0x50dea2(0xd7)]['JS'][_0x4d9a7f]['call'](this,this[_0x50dea2(0x266)],_0x3bf35c))return![];}const _0x1f0fd3=VisuMZ['SkillLearnSystem'][_0x50dea2(0x1cb)],_0xef37d9=_0x3bf35c[_0x50dea2(0x1f8)];if(_0xef37d9[_0x50dea2(0x202)](_0x1f0fd3['LearnShowLevel'])){const _0x29d715=Number(RegExp['$1']);if(_0x29d715>this[_0x50dea2(0x266)][_0x50dea2(0x1b1)])return![];}if(_0xef37d9['match'](_0x1f0fd3[_0x50dea2(0x26f)])){const _0x41b579=String(RegExp['$1'])[_0x50dea2(0x18b)](',')[_0x50dea2(0x23a)](_0x510dca=>_0x510dca[_0x50dea2(0x206)]());;for(const _0x558613 of _0x41b579){let _0x17343c=0x0;const _0x255b4e=/^\d+$/[_0x50dea2(0x1ed)](_0x558613);_0x255b4e?_0x17343c=Number(_0x558613):_0x17343c=DataManager[_0x50dea2(0x17b)](_0x558613);if(!this[_0x50dea2(0x266)]['isLearnedSkill'](_0x17343c))return![];}}if(_0xef37d9[_0x50dea2(0x202)](_0x1f0fd3['LearnShowSkillsAny'])){const _0x2c15fd=String(RegExp['$1'])[_0x50dea2(0x18b)](',')[_0x50dea2(0x23a)](_0x5489dc=>_0x5489dc[_0x50dea2(0x206)]());;let _0x238381=![];for(const _0x550eea of _0x2c15fd){let _0xb66237=0x0;const _0x51b6ce=/^\d+$/[_0x50dea2(0x1ed)](_0x550eea);_0x51b6ce?_0xb66237=Number(_0x550eea):_0xb66237=DataManager[_0x50dea2(0x17b)](_0x550eea);if(this[_0x50dea2(0x266)]['isLearnedSkill'](_0xb66237)){_0x238381=!![];break;}}if(!_0x238381)return![];}if(_0xef37d9[_0x50dea2(0x202)](_0x1f0fd3['LearnShowSwitchesAll'])){const _0x383a07=String(RegExp['$1'])[_0x50dea2(0x18b)](',')[_0x50dea2(0x23a)](_0x30b411=>Number(_0x30b411));for(const _0x9de2fa of _0x383a07){if(!$gameSwitches['value'](_0x9de2fa))return![];}}if(_0xef37d9[_0x50dea2(0x202)](_0x1f0fd3['LearnShowSwitchesAny'])){const _0x1c3af1=String(RegExp['$1'])['split'](',')[_0x50dea2(0x23a)](_0x11af40=>Number(_0x11af40));let _0x47db6b=![];for(const _0x21a563 of _0x1c3af1){if($gameSwitches[_0x50dea2(0x168)](_0x21a563)){_0x47db6b=!![];break;}}if(!_0x47db6b)return![];}return _0x3bf35c;},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x283)]=Window_SkillList[_0x49f14c(0x284)]['isEnabled'],Window_SkillList[_0x49f14c(0x284)][_0x49f14c(0xd3)]=function(_0x473915){const _0x306802=_0x49f14c;return this[_0x306802(0x266)]&&this[_0x306802(0x1dc)]()?this['isSkillLearnEnabled'](_0x473915):VisuMZ[_0x306802(0xd7)][_0x306802(0x283)]['call'](this,_0x473915);},VisuMZ[_0x49f14c(0xd7)][_0x49f14c(0x1d4)]=Window_SkillList[_0x49f14c(0x284)][_0x49f14c(0x1a5)],Window_SkillList['prototype'][_0x49f14c(0x1a5)]=function(_0x3f7cbf){const _0x2a8f0d=_0x49f14c;this[_0x2a8f0d(0x273)]=this['isSkillLearnMode'](),VisuMZ[_0x2a8f0d(0xd7)][_0x2a8f0d(0x1d4)][_0x2a8f0d(0x24d)](this,_0x3f7cbf),this[_0x2a8f0d(0x273)]=![];},Window_SkillList['prototype'][_0x49f14c(0x192)]=function(_0x43c189){const _0x270b09=_0x49f14c;if(!_0x43c189)return![];if(_0x43c189['name'][_0x270b09(0xb8)]<=0x0)return![];if(_0x43c189[_0x270b09(0x14c)][_0x270b09(0x202)](/-----/i))return![];if(this[_0x270b09(0x266)][_0x270b09(0x19c)](_0x43c189['id']))return![];if(this[_0x270b09(0x273)]){if(!this['_actor'][_0x270b09(0x1df)](_0x43c189))return![];return this['_actor'][_0x270b09(0x146)](_0x43c189);}return!![];},VisuMZ[_0x49f14c(0xd7)]['Window_SkillList_drawSkillCost']=Window_SkillList[_0x49f14c(0x284)][_0x49f14c(0x158)],Window_SkillList[_0x49f14c(0x284)]['drawSkillCost']=function(_0x1ae739,_0xb8f1e8,_0x104592,_0x5f0ad4){const _0x2edc0f=_0x49f14c;this[_0x2edc0f(0x1dc)]()?this[_0x2edc0f(0x26a)](_0x1ae739)?this[_0x2edc0f(0x1f6)](_0x1ae739,_0xb8f1e8,_0x104592,_0x5f0ad4):this[_0x2edc0f(0xcd)](_0x1ae739,_0xb8f1e8,_0x104592,_0x5f0ad4):VisuMZ[_0x2edc0f(0xd7)][_0x2edc0f(0x124)][_0x2edc0f(0x24d)](this,_0x1ae739,_0xb8f1e8,_0x104592,_0x5f0ad4);},Window_SkillList[_0x49f14c(0x284)][_0x49f14c(0x26a)]=function(_0x1612d6){const _0x41ce94=_0x49f14c;return this[_0x41ce94(0x266)]&&!this[_0x41ce94(0x266)][_0x41ce94(0x1df)](_0x1612d6);},Window_SkillList[_0x49f14c(0x284)][_0x49f14c(0x1f6)]=function(_0x9b1d38,_0x485d7d,_0x5d0ef3,_0x1d1fa6){const _0x662385=_0x49f14c,_0x292772=this['getSkillLearnRequirementText'](_0x9b1d38),_0x4d907e=this[_0x662385(0xd2)](_0x292772)['width'];_0x485d7d+=_0x1d1fa6-_0x4d907e,this[_0x662385(0x126)](_0x292772,_0x485d7d,_0x5d0ef3);},Window_SkillList['prototype'][_0x49f14c(0x9e)]=function(_0x54da89){const _0xfc9cf4=_0x49f14c,_0x4c3f0d=VisuMZ[_0xfc9cf4(0xd7)][_0xfc9cf4(0x211)]['General'],_0x1fd237=TextManager['skillLearnReqSeparatorFmt'],_0x544b38=VisuMZ[_0xfc9cf4(0xd7)][_0xfc9cf4(0x1cb)],_0x18cb34=_0x54da89[_0xfc9cf4(0x1f8)];let _0x2276bb='',_0x17f5fe='';const _0x3cb6f5=[_0xfc9cf4(0x238),_0xfc9cf4(0x152),_0xfc9cf4(0x1e6),_0xfc9cf4(0x295)];for(const _0x160416 of _0x3cb6f5){switch(_0x160416){case _0xfc9cf4(0x238):if(_0x18cb34['match'](_0x544b38[_0xfc9cf4(0x215)])){const _0x12b78d=Number(RegExp['$1']);_0x17f5fe=TextManager[_0xfc9cf4(0xa9)][_0xfc9cf4(0x207)](_0x12b78d,TextManager[_0xfc9cf4(0x1b1)],TextManager['levelA']),_0x17f5fe[_0xfc9cf4(0xb8)]>0x0&&(_0x2276bb!==''?_0x2276bb=_0x1fd237['format'](_0x2276bb,_0x17f5fe):_0x2276bb=_0x17f5fe);}break;case _0xfc9cf4(0x152):if(_0x18cb34['match'](_0x544b38[_0xfc9cf4(0x1da)])){const _0x380c36=String(RegExp['$1'])[_0xfc9cf4(0x18b)](',')[_0xfc9cf4(0x23a)](_0x269fb9=>_0x269fb9[_0xfc9cf4(0x206)]());;for(const _0x139af4 of _0x380c36){let _0x3c6e9f=0x0;const _0x14e70d=/^\d+$/[_0xfc9cf4(0x1ed)](_0x139af4);_0x14e70d?_0x3c6e9f=Number(_0x139af4):_0x3c6e9f=DataManager[_0xfc9cf4(0x17b)](_0x139af4);if($dataSkills[_0x3c6e9f]){const _0x155d86=$dataSkills[_0x3c6e9f];_0x17f5fe=TextManager[_0xfc9cf4(0x189)][_0xfc9cf4(0x207)]('\x5cI[%1]'[_0xfc9cf4(0x207)](_0x155d86[_0xfc9cf4(0x1db)]),_0x155d86[_0xfc9cf4(0x14c)]),_0x17f5fe[_0xfc9cf4(0xb8)]>0x0&&(_0x2276bb!==''?_0x2276bb=_0x1fd237['format'](_0x2276bb,_0x17f5fe):_0x2276bb=_0x17f5fe);}}}if(_0x18cb34[_0xfc9cf4(0x202)](_0x544b38[_0xfc9cf4(0xc8)])){const _0x57bb3b=String(RegExp['$1'])['split'](',')[_0xfc9cf4(0x23a)](_0x127295=>_0x127295[_0xfc9cf4(0x206)]());;for(const _0x59ea76 of _0x57bb3b){let _0x21955c=0x0;const _0x5e109e=/^\d+$/[_0xfc9cf4(0x1ed)](_0x59ea76);_0x5e109e?_0x21955c=Number(_0x59ea76):_0x21955c=DataManager['getSkillIdWithName'](_0x59ea76);if($dataSkills[_0x21955c]){const _0x11583a=$dataSkills[_0x21955c];_0x17f5fe=TextManager['skillLearnReqSkillFmt'][_0xfc9cf4(0x207)](_0xfc9cf4(0xf5)[_0xfc9cf4(0x207)](_0x11583a[_0xfc9cf4(0x1db)]),_0x11583a[_0xfc9cf4(0x14c)]),_0x17f5fe[_0xfc9cf4(0xb8)]>0x0&&(_0x2276bb!==''?_0x2276bb=_0x1fd237[_0xfc9cf4(0x207)](_0x2276bb,_0x17f5fe):_0x2276bb=_0x17f5fe);}}}break;case _0xfc9cf4(0x1e6):if(_0x18cb34[_0xfc9cf4(0x202)](_0x544b38['LearnReqSwitchesAll'])){const _0x51ac51=String(RegExp['$1'])[_0xfc9cf4(0x18b)](',')[_0xfc9cf4(0x23a)](_0x29ea25=>_0x29ea25[_0xfc9cf4(0x206)]());;for(const _0x7c1a5e of _0x51ac51){$dataSystem[_0xfc9cf4(0x255)][_0x7c1a5e]&&(_0x17f5fe=TextManager[_0xfc9cf4(0x132)]['format']($dataSystem[_0xfc9cf4(0x255)][_0x7c1a5e]||''),_0x17f5fe['length']>0x0&&(_0x2276bb!==''?_0x2276bb=_0x1fd237[_0xfc9cf4(0x207)](_0x2276bb,_0x17f5fe):_0x2276bb=_0x17f5fe));}}if(_0x18cb34[_0xfc9cf4(0x202)](_0x544b38['LearnReqSwitchesAny'])){const _0x2f339e=String(RegExp['$1'])[_0xfc9cf4(0x18b)](',')[_0xfc9cf4(0x23a)](_0x11ca7e=>_0x11ca7e[_0xfc9cf4(0x206)]());;for(const _0x1d8f74 of _0x2f339e){$dataSystem[_0xfc9cf4(0x255)][_0x1d8f74]&&(_0x17f5fe=TextManager[_0xfc9cf4(0x132)]['format']($dataSystem[_0xfc9cf4(0x255)][_0x1d8f74]||''),_0x17f5fe[_0xfc9cf4(0xb8)]>0x0&&(_0x2276bb!==''?_0x2276bb=_0x1fd237['format'](_0x2276bb,_0x17f5fe):_0x2276bb=_0x17f5fe));}}break;case _0xfc9cf4(0x295):const _0x2b8e31=VisuMZ['SkillLearnSystem']['createKeyJS'](_0x54da89,_0xfc9cf4(0x1c9));VisuMZ[_0xfc9cf4(0xd7)]['JS'][_0x2b8e31]&&(_0x17f5fe=VisuMZ['SkillLearnSystem']['JS'][_0x2b8e31][_0xfc9cf4(0x24d)](this,this['_actor'],_0x54da89),_0x17f5fe[_0xfc9cf4(0xb8)]>0x0&&(_0x2276bb!==''?_0x2276bb=_0x1fd237['format'](_0x2276bb,_0x17f5fe):_0x2276bb=_0x17f5fe));break;}}return _0x2276bb=TextManager['skillLearnReqHeaderFmt']['format'](_0x2276bb),_0x2276bb['trim']();},Window_SkillList[_0x49f14c(0x284)][_0x49f14c(0xcd)]=function(_0x4ba160,_0x22e78f,_0x300592,_0x563d83){const _0x24ae79=_0x49f14c,_0x3236fe=this[_0x24ae79(0x1e7)](_0x4ba160),_0x31946a=this['textSizeEx'](_0x3236fe)[_0x24ae79(0x1c7)];_0x22e78f+=_0x563d83-_0x31946a,this[_0x24ae79(0x126)](_0x3236fe,_0x22e78f,_0x300592);},Window_SkillList[_0x49f14c(0x284)][_0x49f14c(0x1e7)]=function(_0x26ed16){const _0x586231=_0x49f14c;if(this[_0x586231(0x266)]&&this[_0x586231(0x266)][_0x586231(0x19c)](_0x26ed16['id']))return TextManager[_0x586231(0xba)];const _0x3ad5f5=VisuMZ[_0x586231(0xd7)][_0x586231(0x211)][_0x586231(0x1bc)],_0x2b0b4b=TextManager[_0x586231(0x252)];let _0x42be77='';const _0xcabdf4=JsonEx[_0x586231(0x1fe)](_0x3ad5f5[_0x586231(0x245)]);_0xcabdf4[_0x586231(0x188)]('Custom');for(const _0x3f87e0 of _0xcabdf4){if(!_0x3f87e0)continue;const _0xa2baf3=this[_0x586231(0x232)](_0x26ed16,_0x3f87e0)[_0x586231(0x206)]();_0xa2baf3[_0x586231(0xb8)]>0x0&&(_0x42be77!==''?_0x42be77=_0x2b0b4b[_0x586231(0x207)](_0x42be77,_0xa2baf3):_0x42be77=_0xa2baf3);}return _0x42be77['trim']();},Window_SkillList[_0x49f14c(0x284)][_0x49f14c(0x232)]=function(_0x4622ff,_0x3a26b7){const _0x104e50=_0x49f14c;let _0x172141=0x0,_0x1936ae='',_0x32d7dc='';switch(_0x3a26b7[_0x104e50(0xb7)]()['trim']()){case'AP':_0x172141=DataManager[_0x104e50(0x127)](_0x4622ff);if(_0x172141>0x0)return _0x1936ae=TextManager['abilityPointsFmt'],_0x1936ae[_0x104e50(0x207)](_0x172141,TextManager[_0x104e50(0x153)],'\x5cI[%1]'['format'](ImageManager[_0x104e50(0x216)]),TextManager[_0x104e50(0x141)]);break;case'SP':_0x172141=DataManager[_0x104e50(0x11a)](_0x4622ff);if(_0x172141>0x0)return _0x1936ae=TextManager[_0x104e50(0x269)],_0x1936ae[_0x104e50(0x207)](_0x172141,TextManager[_0x104e50(0x1c0)],_0x104e50(0xf5)['format'](ImageManager[_0x104e50(0x23b)]),TextManager[_0x104e50(0x15d)]);break;case _0x104e50(0xd6):_0x172141=DataManager[_0x104e50(0x246)](_0x4622ff),_0x1936ae=TextManager['skillLearnItemFmt'];for(const _0x460af9 of _0x172141){if(!_0x460af9)continue;const _0xffe803=$dataItems[_0x460af9['id']];if(!_0xffe803)continue;const _0x4f0c35=_0x1936ae[_0x104e50(0x207)](_0x460af9[_0x104e50(0x137)],_0x104e50(0xf5)[_0x104e50(0x207)](_0xffe803[_0x104e50(0x1db)]),_0xffe803[_0x104e50(0x14c)]);_0x32d7dc!==''?_0x32d7dc=TextManager['skillLearnSeparationFmt']['format'](_0x32d7dc,_0x4f0c35):_0x32d7dc=_0x4f0c35;}return _0x32d7dc;case _0x104e50(0x24f):_0x172141=DataManager[_0x104e50(0x1ee)](_0x4622ff),_0x1936ae=TextManager[_0x104e50(0x15a)];for(const _0x10d57a of _0x172141){if(!_0x10d57a)continue;const _0x58c41f=$dataWeapons[_0x10d57a['id']];if(!_0x58c41f)continue;const _0xf9a2d0=_0x1936ae[_0x104e50(0x207)](_0x10d57a[_0x104e50(0x137)],_0x104e50(0xf5)['format'](_0x58c41f[_0x104e50(0x1db)]),_0x58c41f[_0x104e50(0x14c)]);_0x32d7dc!==''?_0x32d7dc=TextManager['skillLearnSeparationFmt'][_0x104e50(0x207)](_0x32d7dc,_0xf9a2d0):_0x32d7dc=_0xf9a2d0;}return _0x32d7dc;case _0x104e50(0x12c):_0x172141=DataManager[_0x104e50(0x13f)](_0x4622ff),_0x1936ae=TextManager[_0x104e50(0x1e8)];for(const _0x57b5af of _0x172141){if(!_0x57b5af)continue;const _0x2d3cbd=$dataArmors[_0x57b5af['id']];if(!_0x2d3cbd)continue;const _0x35efba=_0x1936ae[_0x104e50(0x207)](_0x57b5af[_0x104e50(0x137)],_0x104e50(0xf5)['format'](_0x2d3cbd[_0x104e50(0x1db)]),_0x2d3cbd[_0x104e50(0x14c)]);_0x32d7dc!==''?_0x32d7dc=TextManager[_0x104e50(0x252)][_0x104e50(0x207)](_0x32d7dc,_0x35efba):_0x32d7dc=_0x35efba;}return _0x32d7dc;case _0x104e50(0x1dd):_0x172141=DataManager[_0x104e50(0x19b)](_0x4622ff);if(_0x172141>0x0)return _0x1936ae=TextManager[_0x104e50(0x274)],_0x1936ae[_0x104e50(0x207)](_0x172141,Imported[_0x104e50(0x20c)]?'\x5cI[%1]'[_0x104e50(0x207)](VisuMZ[_0x104e50(0xf0)][_0x104e50(0x211)][_0x104e50(0xcb)][_0x104e50(0x293)]):TextManager[_0x104e50(0x201)],TextManager[_0x104e50(0x201)]);break;case'CUSTOM':const _0x504e7b=VisuMZ['SkillLearnSystem'][_0x104e50(0x183)](_0x4622ff,_0x104e50(0x125));if(VisuMZ['SkillLearnSystem']['JS'][_0x504e7b])return VisuMZ[_0x104e50(0xd7)]['JS'][_0x504e7b][_0x104e50(0x24d)](this,this[_0x104e50(0x266)],_0x4622ff);break;case'CP':if(Imported[_0x104e50(0x23f)]){_0x172141=DataManager[_0x104e50(0xc7)](_0x4622ff);if(_0x172141>0x0)return _0x1936ae=TextManager[_0x104e50(0x27a)],_0x1936ae[_0x104e50(0x207)](_0x172141,TextManager['classPointsAbbr'],'\x5cI[%1]'[_0x104e50(0x207)](ImageManager['classPointsIcon']),TextManager[_0x104e50(0x285)]);break;}case'JP':if(Imported[_0x104e50(0x23f)]){_0x172141=DataManager[_0x104e50(0xaa)](_0x4622ff);if(_0x172141>0x0)return _0x1936ae=TextManager['jobPointsFmt'],_0x1936ae[_0x104e50(0x207)](_0x172141,TextManager[_0x104e50(0x296)],'\x5cI[%1]'[_0x104e50(0x207)](ImageManager[_0x104e50(0x14a)]),TextManager[_0x104e50(0x241)]);break;}}return'';},Window_ActorCommand['prototype'][_0x49f14c(0x1dc)]=function(){return![];};function Window_SkillLearnIngredients(){this['initialize'](...arguments);}Window_SkillLearnIngredients[_0x49f14c(0x284)]=Object[_0x49f14c(0x1b5)](Window_Base['prototype']),Window_SkillLearnIngredients[_0x49f14c(0x284)][_0x49f14c(0x253)]=Window_SkillLearnIngredients,Window_SkillLearnIngredients[_0x49f14c(0x284)][_0x49f14c(0x27e)]=function(_0x50278c){const _0x3df17f=_0x49f14c;Window_Base[_0x3df17f(0x284)][_0x3df17f(0x27e)]['call'](this,_0x50278c);},Window_SkillLearnIngredients[_0x49f14c(0x284)][_0x49f14c(0x103)]=function(){const _0x245cab=_0x49f14c;this[_0x245cab(0x1e0)]['clear'](),this[_0x245cab(0xbe)](),this[_0x245cab(0x257)]()?this[_0x245cab(0xd0)]():this[_0x245cab(0xf1)]();},Window_SkillLearnIngredients[_0x49f14c(0x284)][_0x49f14c(0x1f9)]=function(_0x48043d,_0x1e1e9b,_0x5b7634,_0x16b4ad){const _0x54ac2c=_0x49f14c,_0x341722=this[_0x54ac2c(0xd2)](_0x48043d)[_0x54ac2c(0x1c7)],_0x58152b=_0x1e1e9b+Math[_0x54ac2c(0x28f)]((_0x16b4ad-_0x341722)/0x2);this[_0x54ac2c(0x126)](_0x48043d,_0x58152b,_0x5b7634);},Window_SkillLearnIngredients[_0x49f14c(0x284)][_0x49f14c(0x1f4)]=function(_0x30c4d2,_0x2c9a96,_0x26b293,_0x50e2ba){const _0x418a4f=_0x49f14c,_0x225d64=this[_0x418a4f(0xd2)](_0x30c4d2)[_0x418a4f(0x1c7)],_0x40eef4=_0x2c9a96+Math[_0x418a4f(0x28f)](_0x50e2ba-_0x225d64);this[_0x418a4f(0x126)](_0x30c4d2,_0x40eef4,_0x26b293);},Window_SkillLearnIngredients[_0x49f14c(0x284)]['shouldDrawRequirements']=function(){const _0x22022e=_0x49f14c,_0x4a97b7=SceneManager[_0x22022e(0x182)][_0x22022e(0x1c4)](),_0x590591=SceneManager[_0x22022e(0x182)][_0x22022e(0x282)]();return _0x590591&&!_0x590591[_0x22022e(0x1df)](_0x4a97b7);},Window_SkillLearnIngredients[_0x49f14c(0x284)][_0x49f14c(0xd0)]=function(){const _0x52240e=_0x49f14c,_0x51697d=SceneManager[_0x52240e(0x182)][_0x52240e(0x1c4)](),_0x4f8c7e=VisuMZ['SkillLearnSystem'][_0x52240e(0x1cb)],_0x51f5a8=_0x51697d[_0x52240e(0x1f8)],_0x8dcb37=SceneManager[_0x52240e(0x182)]['user'](),_0xa99736=this[_0x52240e(0x15c)](),_0x15d708=TextManager[_0x52240e(0x184)],_0x389ae5=TextManager[_0x52240e(0x102)];let _0x7a6a1a=0x0,_0x4cfb3b=0x0;const _0x39ba05=_0x52240e(0xf5)[_0x52240e(0x207)](_0x51697d[_0x52240e(0x1db)]),_0x2895b8=TextManager[_0x52240e(0xe1)][_0x52240e(0x207)](_0x39ba05,_0x51697d[_0x52240e(0x14c)]);this[_0x52240e(0x1f9)](_0x2895b8,_0x7a6a1a,_0x4cfb3b,this[_0x52240e(0x239)]),_0x4cfb3b+=Math[_0x52240e(0x28f)](_0xa99736*1.5);let _0x296c96='';if(_0x51f5a8[_0x52240e(0x202)](_0x4f8c7e[_0x52240e(0x215)])){const _0x55e9ac=Number(RegExp['$1']),_0x35ac2c=TextManager[_0x52240e(0xe4)]['format'](_0x55e9ac,TextManager['level'],TextManager[_0x52240e(0x22d)]),_0x3c2fbe=_0x8dcb37[_0x52240e(0x1b1)]>=_0x55e9ac?_0x15d708:_0x389ae5;_0x296c96+=_0x3c2fbe[_0x52240e(0x207)](_0x35ac2c)+'\x0a';}if(_0x51f5a8['match'](_0x4f8c7e[_0x52240e(0x1da)])){const _0x1c02e6=String(RegExp['$1'])['split'](',')[_0x52240e(0x23a)](_0x45691f=>_0x45691f[_0x52240e(0x206)]());;for(const _0x4c4f01 of _0x1c02e6){let _0x381461=0x0;const _0x2d068e=/^\d+$/['test'](_0x4c4f01);_0x2d068e?_0x381461=Number(_0x4c4f01):_0x381461=DataManager[_0x52240e(0x17b)](_0x4c4f01);const _0xf040fe=$dataSkills[_0x381461];if(_0xf040fe){const _0x4cc7d6=TextManager['skillLearnReqListSkill'][_0x52240e(0x207)]('\x5cI[%1]'[_0x52240e(0x207)](_0xf040fe[_0x52240e(0x1db)]),_0xf040fe[_0x52240e(0x14c)]),_0x2a8b4b=_0x8dcb37[_0x52240e(0x19c)](_0x381461)?_0x15d708:_0x389ae5;_0x296c96+=_0x2a8b4b[_0x52240e(0x207)](_0x4cc7d6)+'\x0a';}}}if(_0x51f5a8[_0x52240e(0x202)](_0x4f8c7e['LearnReqSkillsAny'])){const _0x1da155=String(RegExp['$1'])[_0x52240e(0x18b)](',')[_0x52240e(0x23a)](_0x2e45a6=>_0x2e45a6[_0x52240e(0x206)]());;for(const _0x5691e6 of _0x1da155){let _0x5f3168=0x0;const _0x1fbd38=/^\d+$/[_0x52240e(0x1ed)](_0x5691e6);_0x1fbd38?_0x5f3168=Number(_0x5691e6):_0x5f3168=DataManager[_0x52240e(0x17b)](_0x5691e6);const _0x5d81fd=$dataSkills[_0x5f3168];if(_0x5d81fd){const _0x13dae2=TextManager[_0x52240e(0xb3)][_0x52240e(0x207)](_0x52240e(0xf5)[_0x52240e(0x207)](_0x5d81fd[_0x52240e(0x1db)]),_0x5d81fd[_0x52240e(0x14c)]),_0x321590=_0x8dcb37[_0x52240e(0x19c)](_0x5f3168)?_0x15d708:_0x389ae5;_0x296c96+=_0x321590['format'](_0x13dae2)+'\x0a';}}}if(_0x51f5a8[_0x52240e(0x202)](_0x4f8c7e[_0x52240e(0x26e)])){const _0x34cb1e=String(RegExp['$1'])['split'](',')[_0x52240e(0x23a)](_0x44367e=>Number(_0x44367e));for(const _0x16edbf of _0x34cb1e){const _0x5445de=$dataSystem[_0x52240e(0x255)][_0x16edbf],_0x2dcfe5=$gameSwitches[_0x52240e(0x168)](_0x16edbf)?_0x15d708:_0x389ae5;_0x296c96+=_0x2dcfe5[_0x52240e(0x207)](_0x5445de)+'\x0a';}}if(_0x51f5a8[_0x52240e(0x202)](_0x4f8c7e['LearnReqSwitchesAny'])){const _0x548726=String(RegExp['$1'])[_0x52240e(0x18b)](',')[_0x52240e(0x23a)](_0x4179dd=>Number(_0x4179dd));for(const _0x108286 of _0x548726){const _0x2d41dc=$dataSystem[_0x52240e(0x255)][_0x108286],_0x29eadb=$gameSwitches[_0x52240e(0x168)](_0x108286)?_0x15d708:_0x389ae5;_0x296c96+=_0x29eadb[_0x52240e(0x207)](_0x2d41dc)+'\x0a';}}const _0x26b713=VisuMZ[_0x52240e(0xd7)][_0x52240e(0x183)](_0x51697d,_0x52240e(0x1b4));if(VisuMZ[_0x52240e(0xd7)]['JS'][_0x26b713]){const _0x3b0aa5=VisuMZ[_0x52240e(0xd7)]['JS'][_0x26b713][_0x52240e(0x24d)](this,_0x8dcb37,_0x51697d);_0x296c96+=_0x3b0aa5+'\x0a';}this[_0x52240e(0x1f9)](_0x296c96,_0x7a6a1a,_0x4cfb3b,this[_0x52240e(0x239)]);},Window_SkillLearnIngredients[_0x49f14c(0x284)]['drawIngredients']=function(){const _0x153d7a=_0x49f14c,_0x3596b6=SceneManager[_0x153d7a(0x182)][_0x153d7a(0x1c4)](),_0x4d345d=SceneManager[_0x153d7a(0x182)]['user'](),_0x5e0379=this[_0x153d7a(0x17a)]();let _0x3c7ed1=0x0,_0x11562f=0x0;const _0x15e84b=this[_0x153d7a(0x15c)](),_0x56dcb1=Math[_0x153d7a(0x28f)](this[_0x153d7a(0x239)]/0x2),_0x43bc0f=Math[_0x153d7a(0x28f)](this[_0x153d7a(0x239)]/0x4),_0x3d7369=0x0,_0x393650=_0x56dcb1,_0x5897f8=_0x56dcb1+_0x43bc0f,_0x5eacf7='\x5cI[%1]'[_0x153d7a(0x207)](_0x3596b6[_0x153d7a(0x1db)]),_0x16081b=TextManager['skillLearningTitle'][_0x153d7a(0x207)](_0x5eacf7,_0x3596b6[_0x153d7a(0x14c)]);this[_0x153d7a(0x1f9)](_0x16081b,_0x3c7ed1,_0x11562f,this[_0x153d7a(0x239)]),_0x11562f+=_0x15e84b,this[_0x153d7a(0x1f9)](TextManager['skillLearningName'],_0x3d7369,_0x11562f,_0x56dcb1),this[_0x153d7a(0x1f9)](TextManager['skillLearningCost'],_0x393650,_0x11562f,_0x43bc0f),this[_0x153d7a(0x1f9)](TextManager[_0x153d7a(0xde)],_0x5897f8,_0x11562f,_0x43bc0f),_0x11562f+=_0x15e84b;const _0x504069=_0x3d7369+this[_0x153d7a(0x13c)]();for(const _0x4713e7 of _0x5e0379){this['resetFontSettings']();let _0x2d8055='',_0x961de7=0x0,_0x570cf1=0x0,_0x1cf110='';switch(_0x4713e7[_0x153d7a(0xb7)]()[_0x153d7a(0x206)]()){case'AP':_0x961de7=DataManager[_0x153d7a(0x127)](_0x3596b6);if(_0x961de7<=0x0)continue;this[_0x153d7a(0x140)](_0x961de7,_0x393650,_0x11562f,_0x43bc0f,_0x153d7a(0xa8)),_0x2d8055=_0x153d7a(0x1e3)[_0x153d7a(0x207)](ImageManager[_0x153d7a(0x216)],TextManager[_0x153d7a(0x141)]),this[_0x153d7a(0x126)](_0x2d8055,_0x504069,_0x11562f),_0x570cf1=_0x4d345d['getAbilityPoints'](),this[_0x153d7a(0x140)](_0x570cf1,_0x5897f8,_0x11562f,_0x43bc0f-this['itemPadding'](),_0x153d7a(0xa8));break;case'SP':_0x961de7=DataManager[_0x153d7a(0x11a)](_0x3596b6);if(_0x961de7<=0x0)continue;this[_0x153d7a(0x107)](_0x961de7,_0x393650,_0x11562f,_0x43bc0f,_0x153d7a(0xa8)),_0x2d8055=_0x153d7a(0x1e3)['format'](ImageManager['skillPointsIcon'],TextManager[_0x153d7a(0x15d)]),this[_0x153d7a(0x126)](_0x2d8055,_0x504069,_0x11562f),_0x570cf1=_0x4d345d[_0x153d7a(0x13b)](),this[_0x153d7a(0x107)](_0x570cf1,_0x5897f8,_0x11562f,_0x43bc0f-this[_0x153d7a(0x13c)](),'right');break;case _0x153d7a(0x1dd):_0x961de7=DataManager['getSkillLearnGoldCost'](_0x3596b6);if(_0x961de7<=0x0)continue;this[_0x153d7a(0x1a8)](_0x961de7,TextManager[_0x153d7a(0x201)],_0x393650,_0x11562f,_0x43bc0f);const _0x5e3ea7=Imported['VisuMZ_0_CoreEngine']?_0x153d7a(0xf5)[_0x153d7a(0x207)](VisuMZ[_0x153d7a(0xf0)][_0x153d7a(0x211)][_0x153d7a(0xcb)][_0x153d7a(0x293)]):TextManager['currencyUnit'];_0x2d8055=_0x153d7a(0x1ad)[_0x153d7a(0x207)](_0x5e3ea7,TextManager[_0x153d7a(0x201)]),this[_0x153d7a(0x126)](_0x2d8055,_0x504069,_0x11562f),_0x570cf1=$gameParty[_0x153d7a(0x16a)](),this[_0x153d7a(0x1a8)](_0x570cf1,TextManager['currencyUnit'],_0x5897f8,_0x11562f,_0x43bc0f-this[_0x153d7a(0x13c)]());break;case'ITEM':const _0x4f5df1=DataManager[_0x153d7a(0x246)](_0x3596b6);if(_0x4f5df1[_0x153d7a(0xb8)]<=0x0)continue;for(const _0x387045 of _0x4f5df1){if(!_0x387045)continue;const _0x26f1c6=$dataItems[_0x387045['id']];_0x1cf110=TextManager[_0x153d7a(0x256)],this[_0x153d7a(0x275)](_0x26f1c6,_0x504069,_0x11562f,_0x56dcb1-_0x504069),_0x2d8055=_0x1cf110[_0x153d7a(0x207)](_0x387045[_0x153d7a(0x137)],_0x153d7a(0xf5)[_0x153d7a(0x207)](_0x26f1c6[_0x153d7a(0x1db)]),_0x26f1c6[_0x153d7a(0x14c)]),this[_0x153d7a(0x1f4)](_0x2d8055,_0x393650,_0x11562f,_0x43bc0f),_0x2d8055=_0x1cf110[_0x153d7a(0x207)]($gameParty[_0x153d7a(0x195)](_0x26f1c6),_0x153d7a(0xf5)['format'](_0x26f1c6[_0x153d7a(0x1db)]),_0x26f1c6[_0x153d7a(0x14c)]),this[_0x153d7a(0x1f4)](_0x2d8055,_0x5897f8,_0x11562f,_0x43bc0f-this[_0x153d7a(0x13c)]()),_0x11562f+=_0x15e84b;if(_0x11562f+_0x15e84b>this[_0x153d7a(0xdf)])return;}continue;case _0x153d7a(0x24f):const _0x4c8537=DataManager[_0x153d7a(0x1ee)](_0x3596b6);if(_0x4c8537[_0x153d7a(0xb8)]<=0x0)continue;for(const _0x39b3c0 of _0x4c8537){if(!_0x39b3c0)continue;const _0x3cdc49=$dataWeapons[_0x39b3c0['id']];_0x1cf110=TextManager[_0x153d7a(0x15a)],this[_0x153d7a(0x275)](_0x3cdc49,_0x504069,_0x11562f,_0x56dcb1-_0x504069),_0x2d8055=_0x1cf110[_0x153d7a(0x207)](_0x39b3c0['quantity'],'\x5cI[%1]'['format'](_0x3cdc49[_0x153d7a(0x1db)]),_0x3cdc49['name']),this[_0x153d7a(0x1f4)](_0x2d8055,_0x393650,_0x11562f,_0x43bc0f),_0x2d8055=_0x1cf110[_0x153d7a(0x207)]($gameParty[_0x153d7a(0x195)](_0x3cdc49),'\x5cI[%1]'[_0x153d7a(0x207)](_0x3cdc49[_0x153d7a(0x1db)]),_0x3cdc49['name']),this[_0x153d7a(0x1f4)](_0x2d8055,_0x5897f8,_0x11562f,_0x43bc0f-this['itemPadding']()),_0x11562f+=_0x15e84b;if(_0x11562f+_0x15e84b>this[_0x153d7a(0xdf)])return;}continue;case _0x153d7a(0x12c):const _0x9c8c64=DataManager[_0x153d7a(0x13f)](_0x3596b6);if(_0x9c8c64[_0x153d7a(0xb8)]<=0x0)continue;for(const _0xcd9997 of _0x9c8c64){if(!_0xcd9997)continue;const _0x2e31a0=$dataArmors[_0xcd9997['id']];_0x1cf110=TextManager['skillLearnArmorFmt'],this['drawItemName'](_0x2e31a0,_0x504069,_0x11562f,_0x56dcb1-_0x504069),_0x2d8055=_0x1cf110['format'](_0xcd9997[_0x153d7a(0x137)],_0x153d7a(0xf5)[_0x153d7a(0x207)](_0x2e31a0[_0x153d7a(0x1db)]),_0x2e31a0[_0x153d7a(0x14c)]),this[_0x153d7a(0x1f4)](_0x2d8055,_0x393650,_0x11562f,_0x43bc0f),_0x2d8055=_0x1cf110[_0x153d7a(0x207)]($gameParty[_0x153d7a(0x195)](_0x2e31a0),_0x153d7a(0xf5)[_0x153d7a(0x207)](_0x2e31a0[_0x153d7a(0x1db)]),_0x2e31a0['name']),this['drawTextExRightAlign'](_0x2d8055,_0x5897f8,_0x11562f,_0x43bc0f-this['itemPadding']()),_0x11562f+=_0x15e84b;if(_0x11562f+_0x15e84b>this[_0x153d7a(0xdf)])return;}continue;case'CUSTOM':const _0x162e67=VisuMZ[_0x153d7a(0xd7)][_0x153d7a(0x183)](_0x3596b6,_0x153d7a(0x247));if(VisuMZ[_0x153d7a(0xd7)]['JS'][_0x162e67])_0x2d8055=VisuMZ[_0x153d7a(0xd7)]['JS'][_0x162e67]['call'](this,_0x4d345d,_0x3596b6),this[_0x153d7a(0x126)](_0x2d8055,_0x504069,_0x11562f);else continue;break;case'CP':if(Imported[_0x153d7a(0x23f)]){_0x961de7=DataManager[_0x153d7a(0xc7)](_0x3596b6)||0x0;if(_0x961de7<=0x0)continue;this[_0x153d7a(0x1a6)](_0x961de7,_0x393650,_0x11562f,_0x43bc0f,_0x153d7a(0xa8)),_0x2d8055=_0x153d7a(0x1e3)[_0x153d7a(0x207)](ImageManager[_0x153d7a(0x101)],TextManager[_0x153d7a(0x285)]),this[_0x153d7a(0x126)](_0x2d8055,_0x504069,_0x11562f),_0x570cf1=_0x4d345d['getClassPoints'](),this[_0x153d7a(0x1a6)](_0x570cf1,_0x5897f8,_0x11562f,_0x43bc0f-this[_0x153d7a(0x13c)](),'right');}break;case'JP':if(Imported[_0x153d7a(0x23f)]){_0x961de7=DataManager['getSkillLearnJobPointCost'](_0x3596b6)||0x0;if(_0x961de7<=0x0)continue;this[_0x153d7a(0x1a0)](_0x961de7,_0x393650,_0x11562f,_0x43bc0f,'right'),_0x2d8055=_0x153d7a(0x1e3)[_0x153d7a(0x207)](ImageManager[_0x153d7a(0x14a)],TextManager[_0x153d7a(0x241)]),this[_0x153d7a(0x126)](_0x2d8055,_0x504069,_0x11562f),_0x570cf1=_0x4d345d[_0x153d7a(0x1b3)](),this[_0x153d7a(0x1a0)](_0x570cf1,_0x5897f8,_0x11562f,_0x43bc0f-this[_0x153d7a(0x13c)](),_0x153d7a(0xa8));}break;default:continue;}_0x11562f+=_0x15e84b;if(_0x11562f+_0x15e84b>this[_0x153d7a(0xdf)])return;}},Window_SkillLearnIngredients[_0x49f14c(0x284)][_0x49f14c(0x17a)]=function(){const _0x4f738d=_0x49f14c,_0x5f0f62=JsonEx[_0x4f738d(0x1fe)](VisuMZ[_0x4f738d(0xd7)]['Settings'][_0x4f738d(0x1bc)][_0x4f738d(0x245)]);return _0x5f0f62[_0x4f738d(0x188)]('Custom'),_0x5f0f62;},Window_SkillLearnIngredients[_0x49f14c(0x284)]['showVisualGoldDisplay']=function(){return![];};function Window_SkillLearnConfirm(){const _0x263967=_0x49f14c;this[_0x263967(0x27e)](...arguments);}Window_SkillLearnConfirm[_0x49f14c(0x284)]=Object[_0x49f14c(0x1b5)](Window_HorzCommand[_0x49f14c(0x284)]),Window_SkillLearnConfirm[_0x49f14c(0x284)][_0x49f14c(0x253)]=Window_SkillLearnConfirm,Window_SkillLearnConfirm['prototype'][_0x49f14c(0x27e)]=function(_0xce1d0e){const _0x3c3fde=_0x49f14c;Window_HorzCommand[_0x3c3fde(0x284)][_0x3c3fde(0x27e)][_0x3c3fde(0x24d)](this,_0xce1d0e);},Window_SkillLearnConfirm[_0x49f14c(0x284)]['maxCols']=function(){return 0x2;},Window_SkillLearnConfirm[_0x49f14c(0x284)][_0x49f14c(0x121)]=function(){const _0x20aa93=_0x49f14c;return this[_0x20aa93(0xdf)];},Window_SkillLearnConfirm[_0x49f14c(0x284)][_0x49f14c(0x191)]=function(){const _0x2aaf54=_0x49f14c;this[_0x2aaf54(0x1a7)](TextManager[_0x2aaf54(0x265)],'ok',this[_0x2aaf54(0xce)]()),this[_0x2aaf54(0x1a7)](TextManager[_0x2aaf54(0x1b8)],_0x2aaf54(0x299));},Window_SkillLearnConfirm[_0x49f14c(0x284)]['isConfirmEnabled']=function(){const _0x318a67=_0x49f14c,_0x3f57bf=SceneManager[_0x318a67(0x182)];if(!_0x3f57bf)return![];const _0x1ab252=_0x3f57bf[_0x318a67(0x282)]();if(!_0x1ab252)return![];const _0x57ec4f=_0x3f57bf[_0x318a67(0x1c4)]();if(!_0x57ec4f)return![];if(!_0x1ab252[_0x318a67(0x1df)](_0x57ec4f))return![];return _0x1ab252[_0x318a67(0x146)](_0x57ec4f);},Window_SkillLearnConfirm['prototype'][_0x49f14c(0x1a5)]=function(_0x248cf1){const _0x5cc33b=_0x49f14c,_0xd2e668=this[_0x5cc33b(0x27b)](_0x248cf1);this[_0x5cc33b(0x1c5)](),this['changePaintOpacity'](this[_0x5cc33b(0x1d5)](_0x248cf1));const _0x58118a=this[_0x5cc33b(0x26b)](_0x248cf1),_0x571458=this[_0x5cc33b(0xd2)](_0x58118a)['width'];_0xd2e668['x']+=Math['round']((_0xd2e668['width']-_0x571458)/0x2),this[_0x5cc33b(0x126)](_0x58118a,_0xd2e668['x'],_0xd2e668['y'],_0x571458);},Window_SkillLearnConfirm[_0x49f14c(0x284)][_0x49f14c(0x161)]=function(){const _0x3f8c1a=_0x49f14c;if(this['currentSymbol']()==='ok'){}else Window_HorzCommand[_0x3f8c1a(0x284)]['playOkSound'][_0x3f8c1a(0x24d)](this);};function _0x31ee(){const _0x44383c=['jsOnLearn','234mQeaLz','SWITCHES','getSkillLearnCostText','skillLearnArmorFmt','isBattleMember','setFrame','SeparationFmt','addWindow','test','getSkillLearnWeaponCost','loseClassPoints','Window_SkillStatus_refresh','levelUp','abilityPointsVisible','setup','drawTextExRightAlign','process_VisuMZ_SkillLearnSystem_Notetags','drawSkillLearnRequirements','getClassPoints','note','drawTextExCenterAlign','createSkillLearnSkillSprite','subject','JobPoints','LearnJpCost','makeDeepCopy','AliveActors','onLoadBattleTestSkillLearnSystem','currencyUnit','match','_statusWindow','makeSkillLearnList','createSkillLearnIngredientsWindow','trim','format','Armor','EnemySkillPoints','StartClassSkillPoints','_skillPoints','VisuMZ_0_CoreEngine','74jGoMNv','Scene_Skill_onItemOk','_rewards','Animation','Settings','gainSkillPoints','Game_Actor_learnSkill','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20text\x20=\x20\x27\x27;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Text\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20text;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','LearnReqLevel','abilityPointsIcon','setStypeId','skillLearnReqSeparatorFmt','gainRewardsSkillPoints','actor','description','ReqSwitchFmt','_weaponIDs','abilityPoints','inBattle','add','onBattleStart','StatusWindowDrawJS','StartingSkillPoints','earnedSkillPoints','setHandler','gainAbilityPointsForMulticlasses','_skillLearnAnimationPlaying','createSkillLearnSystemWindows','processFinishSkillLearnAnimation','_skillLearnIngredientsWindow','ARRAYNUM','LearnApCost','levelA','_SkillLearnSystem_preventLevelUpGain','iconHeight','_abilityPoints','setAbilityPoints','createSkillLearnCostText','LearnCostBatch','AbbrText','Learned','1750136mhHFzb','5653OgIQCn','LEVEL','innerWidth','map','skillPointsIcon','jsLearnShow','_skillLearnAnimationSprite','addSkillLearnSystemCommand','VisuMZ_2_ClassChangeSystem','indexOf','jobPointsFull','skillLearningCost','_armorIDs','ItemFmt','DisplayedCosts','getSkillLearnItemCost','jsLearnShowDetailTxt','206270wkRVxi','jsLearnReq','processPayForSkillLearnSystem','Skill','setSkillLearnSkillSpriteFrame','call','EVAL','WEAPON','displayRewardsSkillPoints','skillLearnReqHeaderFmt','skillLearnSeparationFmt','constructor','makeRewardsSkillPoints','switches','skillLearnItemFmt','shouldDrawRequirements','VictoryText','Icon','select','show','ShowVictory','updateSkillLearnAnimation','Class-%1-%2','Scene_Skill_update','SkillPoints','110880HOcQzX','bitmap','950719ogdVBr','Parse_Notetags_CreateJS','skillLearnConfirmCmd','_actor','floor','Name','skillPointsFmt','shouldDrawSkillLearnRequirements','commandName','enemy','gainStartingAbilityPoints','LearnReqSwitchesAll','LearnShowSkillsAll','getItemIdWithName','PerAction','updateSkillLearnAnimationSprite','_skillLearnSystem_drawItemMode','skillLearnGoldFmt','drawItemName','ShowWindows','gainStartingSkillPoints','activate','StartingAbilityPoints','classPointsFmt','itemLineRect','drawActorJobPoints','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20cost\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Cost\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20cost;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','initialize','skillLearnCmd','clamp','55BaYUOQ','user','Window_SkillList_isEnabled','prototype','classPointsFull','TargetGainAbilityPoints','FUNC','deadMembers','createActionJS','initSkillLearnSystemMenuAccess','animationIDs','drawActorFace','center','startSkillLearnAnimation','round','loseItem','_earnedAbilityPoints','drawActorSkillPoints','GoldIcon','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','CUSTOM','jobPointsAbbr','_SkillLearnSystem_MenuAccess','gainSkillPointsForMulticlasses','cancel','IngredientOwned','addSkillPoints','gainMulticlassRewardPoints','getSkillLearnRequirementText','playSkillLearn','removeChild','_data','destroySkillLearnAnimationSprite','makeRewardsAbilityPoints','anchor','skill','setSkillPoints','isReleased','right','skillLearnReqLevelFmt','getSkillLearnJobPointCost','RequirementTitle','scale','Enemy-%1-%2','getClassIdWithName','Game_Actor_setup','ClassPoints','createTextJS','ceil','skillLearnReqListSkill','jsLearnSpCost','createCostJS','finishSkillLearnAnimation','toUpperCase','length','isMVAnimation','skillLearnAlreadyLearned','onItemOk','skillPointsVisible','AbilityPointsLose','resetFontSettings','_windowLayer','smooth','skillLearnIngredientsWindowRect','isFinishedSkillLearnAnimating','min','State-%1-%2','LearnItemCost','Window_SkillList_setStypeId','getSkillLearnClassPointCost','LearnReqSkillsAny','ARRAYSTR','abilityPointsFmt','Gold','ConfirmWindow_RectJS','drawSkillLearnCost','isConfirmEnabled','bigPicture','drawRequirements','Window_SkillList_includes','textSizeEx','isEnabled','Game_Action_applyItemUserEffect','log','ITEM','SkillLearnSystem','addChild','return\x200','CancelCmd','Show','ConfirmCmd','Points','skillLearningOwned','innerHeight','concat','skillLearnReqTitle','Window_SkillList_maxCols','displayRewards','skillLearnReqListLevel','gainRewardsAbilityPoints','ARRAYEVAL','optExtraExp','ARRAYFUNC','Scene_Skill_create','Ability','setSkillLearnSkillSpriteOpacity','26634lVeXmA','visible','createSkillLearnAnimation','_skillIDs','CoreEngine','drawIngredients','UserGainAbilityPoints','currentClass','_skillLearnAnimationIDs','\x5cI[%1]','traitObjects','update','Window','includes','parameters','27JjLVcn','Game_Party_setupBattleTestMembers','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','displayRewardsAbilityPoints','filter','createSkillLearnAnimationIDs','classPointsIcon','skillLearnReqNotMet','refresh','setupBattleTestMembersSkillLearnSystem','ClassChangeSystem','calcWindowHeight','drawSkillPoints','_skillLearnBitmapSprite','Window_SkillList_makeItemList','AbilityPointsSet','LearnGoldCost','Item-%1-%2','Window_SkillType_makeCommandList','VisuMZ_1_SkillsStatesCore','ParseSkillNotetags','loadPicture','onSkillLearnItemOk','setupBattleTestMembers','setSkillLearnSkillSpriteBitmap','SkillPointsRate','updateSkillLearnSpriteOpacity','exit','isActor','onDatabaseLoaded','levelUpGainSkillPoints','getSkillLearnSkillPointCost','ReqMetFmt','faceWidth','isSkillLearnSystemMenuAccess','JSON','TextFmt','_earnedSkillPoints','itemHeight','ReqSkillFmt','ParseAllNotetags','Window_SkillList_drawSkillCost','jsLearnShowListTxt','drawTextEx','getSkillLearnAbilityPointCost','ReqNotMetFmt','loseSkillPoints','isSkill','skillPointsTotal','ARMOR','Game_Actor_levelUp','isPlaytest','itemWindowRect','getWeaponIdWithName','BattleManager_displayRewards','skillLearnReqSwitchFmt','skillLearnIncludes','Game_Actor_changeClass','PerEnemy','SkillPointsSet','quantity','loseGold','_skillLearnIconSprite','STR','getSkillPoints','itemPadding','earnedAbilityPoints','getAbilityPoints','getSkillLearnArmorCost','drawAbilityPoints','abilityPointsFull','LearnReqSwitchesAny','IconSet','remove','DetailWindow_RectJS','canPayForSkillLearnSystem','onSkillLearnConfirmOk','learnSkill','reduce','jobPointsIcon','_skillLearnConfirmWindow','name','skillLearnConfirmWindow','MenuAccess','applyItemUserEffect','LearnSkillA','LearnCpCost','SKILLS','abilityPointsAbbr','FullText','destroySkillLearnSprite','abilityPointsRate','GoldFmt','drawSkillCost','DefaultCost','skillLearnWeaponFmt','clear','lineHeight','skillPointsFull','ARRAYJSON','createVisibleJS','skillPoints','playOkSound','applySkillPoints','addAbilityPoints','EnemyAbilityPoints','drawActorAbilityPoints','SharedResource','Weapon','value','parse','gold','sort','SystemShowSkillLearnSystemMenu','setSkillLearnSkillSpritePosition','max','applySkillLearnSystemUserEffect','_itemWindow','getArmorIdWithName','ConvertParams','Classes','MAX_SAFE_INTEGER','applyItemSkillLearnSystemUserEffect','AbilityPoints','drawActorSimpleStatus','IngredientName','refreshSkillLearnSystem','getSkillLearnDisplayedCosts','getSkillIdWithName','Scale','BattleManager_makeRewards','_classIDs','Game_Battler_onBattleStart','opacity','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Visible\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_scene','createKeyJS','skillLearnReqMet','skillLearnReqListSwitch','applyAbilityPoints','AbilityPointsGain','push','skillLearnReqSkillFmt','isTriggered','split','setSkillLearnSystemMenuAccess','Scene_Boot_onDatabaseLoaded','WeaponFmt','StartClassAbilityPoints','createSkillLearnConfirmWindow','makeCommandList','isSkillLearnEnabled','Animations','left','numItems','initSkillPoints','skillPointsRate','SkillPointsAdd','LearnSkillB','getSkillLearnSkillsFromClass','getSkillLearnGoldCost','isLearnedSkill','makeRewards','ArmorFmt','jsLearnJpCost','drawJobPoints','newPage','_itemIDs','bind','Weapon-%1-%2','drawItem','drawClassPoints','addCommand','drawCurrencyValue','Actor-%1-%2','drawActorClassPoints','ReqSeparateFmt','members','%1%2','MaxResource','skillLearnIcon','createConditionJS','level','isPlaying','getJobPoints','jsLearnReqDetailTxt','create','destroy','allMembers','skillLearnCancelCmd','_skillLearnIconSpriteOpacitySpeed','setBackgroundType','LearnArmorCost','General','initAbilityPoints','Actors','STRUCT','skillPointsAbbr','levelUpGainAbilityPoints','gainAbilityPoints','replace','item','resetTextColor','frames','width','loseAbilityPoints','jsLearnReqListTxt','registerCommand','RegExp','loseJobPoints','jsLearnApCost','hide','PerLevelUp','abilityPointsTotal','DetailWindow_BgType','skillLearn','_learnPicture','Window_SkillList_drawItem','isCommandEnabled','onSkillLearnConfirmCancel','maxCols','process_VisuMZ_SkillLearnSystem_JS','jsLearnCpCost','LearnReqSkillsAll','iconIndex','isSkillLearnMode','GOLD','_stypeId','meetRequirementsForSkillLearnSystem','contents','Game_System_initialize','colSpacing','\x5cI[%1]%2'];_0x31ee=function(){return _0x44383c;};return _0x31ee();}