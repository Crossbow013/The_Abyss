//=============================================================================
// VisuStella MZ - Dragonbones Union
// VisuMZ_2_DragonbonesUnion.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_DragonbonesUnion = true;

var VisuMZ = VisuMZ || {};
VisuMZ.DragonbonesUnion = VisuMZ.DragonbonesUnion || {};
VisuMZ.DragonbonesUnion.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.17] [DragonbonesUnion]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Dragonbones_Union_VisuStella_MZ
 * @base Public_0_Dragonbones
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter Public_0_Dragonbones
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * DragonBones allows your games to use skeletal animation, a type of computer
 * animation in which a character (or object) is represented by skins/textures
 * and a digital set of interconnected bones (called the skeleton). Using a set
 * of instructions, the game will create animations based off these skins,
 * skeletons, and instructions to create beautifully smooth and light-weight
 * movements.
 *
 * This plugin gives you such control over various facets of your game: the
 * battle system, event pictures, and map sprites for characters. Various
 * plugin commands, notetags, and comment tags are added through this plugin to
 * give you as much control as you need over Dragonbones from the RPG Maker MZ
 * editor itself.
 *
 * The version of Dragonbones used for this plugin is 5.7.002b.
 * More information can be found at http://dragonbones.com/
 *
 * Features include all (but not limited to) the following:
 * 
 * - Adds Dragonbones support to RPG Maker MZ.
 * - Dragonbones armatures can be used as battler sprites.
 * - Dragonbones armatures can be attached to event pictures.
 * - Dragonbones armatures can be inserted into the map as character sprites.
 * - A variety of Plugin Parameters, Notetags, and Plugin Commands to control
 *   the Dragonbones armatures and their animations.
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
 * - Dragonbones*
 *
 * *Note* You can download this library from the below URL or from the
 * Dragonbones Union product page. Install it as a Tier 0 plugin.
 *
 * URL: https://www.npmjs.com/package/pixi5-dragonbones/v/5.7.0-2b
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Dragonbones Naming
 * ============================================================================
 *
 * If you are trying to set up a Dragonbones armature through notetags, Plugin
 * Commands, etc., and are getting the error message "Cannot Read property
 * 'parent' of null", then most likely, the incorrect Dragonbones armature name
 * is being used.
 *
 * ---
 * 
 * To find the Proper Name:
 * 
 * 1. Open up the Dragonbones armature in the Dragonbones editor.
 * 
 * ---
 * 
 * 2. Open the armature's Properties.
 * 
 * ---
 * 
 * 3. Look at what the "Name:" field lists. This is the name to use with the
 *    Dragonbones Union plugin.
 * 
 * ---
 *
 * ============================================================================
 * Dragonbones Armature Behaviors
 * ============================================================================
 *
 * Dragonbones armatures have certain behaviors when used with battlers,
 * pictures, and/or map sprites.
 *
 * ---
 *
 * 1. When a Dragonbones armature is loaded, it will play the 'idle' animation
 *    or whatever is set inside the Plugin Parameters => General Settings =>
 *    Loaded Animation field upon loading. Make your Dragonbones armatures with
 *    this in mind. At other times, the 'idle' animation will be used as a base
 *    defaulting animation.
 *
 * ---
 *
 * 2. The Dragonbones armature will always be anchored at the X, Y coordinates
 *    of the target. This X, Y coordinate point will be where the root/pivot
 *    point of the Dragonbones armature will be located.
 *
 * ---
 *
 * 3. The properties used by a sprite (ie the opacity, scale, rotation, and
 *    tint) will also be shared and/or amplified with the Dragonbones armature.
 *    The exception to this will be Blend Modes aren't supported.
 *
 * ---
 *
 * ============================================================================
 * IMPORTANT!! Dragonbones Armatures as Map Sprites
 * ============================================================================
 *
 * If you plan on using Dragonbones armatures as map sprites, please keep in
 * mind that there will be certain limitations and properties regarding them,
 * which will be listed below:
 *
 * ---
 *
 * 1. Try not to use more than 99 vertices for meshes. The reason behind this
 *    is because the Dragonbones armature is added as a sprite to the game's
 *    Tilemap. Any and all sprites added to the Tilemap have some restrictions
 *    placed on them as per Pixi JS's design. The Dragonbones armatures are no
 *    exception to this.
 *
 *    If the number of vertices exceeds 99, strange things will occur to the
 *    Dragonbones armature that are outside of this plugin's control. While it
 *    won't stop the plugin from functioning properly, expected behaviors may
 *    happen due to the threshold.
 *
 * ---
 *
 * 2. When using Dragonbones armatures that are too tall or wide, they may clip
 *    into the tile layer above or to the side due to how the Tilemap works.
 *    Things that you would see happen would include clipping into the tops of
 *    trees and structures.
 *
 * ---
 *
 * 3. Certain motions will request specific animations from the Dragonbones
 *    armature. If the animations exist, it will play those motions. If they
 *    don't, the motions may request a different animation down the line. The
 *    request orders are as follows:
 *
 *    Jumping:
 *    - jump, walk, idle
 *
 *    Rope (Climbing) (Requires: VisuMZ_1_EventsMoveCore):
 *    - ropeclimb, ladderclimb, walk, ropeidle, ladderidle, idle
 *
 *    Rope (Idle) (Requires: VisuMZ_1_EventsMoveCore):
 *    - ropeidle, ladderidle, idle
 *
 *    Ladder (Climbing):
 *    - ladderclimb, walk, ladderidle, idle
 *
 *    Ladder (Idle):
 *    - ladderidle, idle
 *
 *    Dashing:
 *    - dash, walk, idle
 *
 *    Walking:
 *    - walk, idle
 *
 *    Idle:
 *    - idle
 *
 *    Name the animations for the Dragonbones armature as such to make the most
 *    out of the motion priority lists.
 *
 * ---
 *
 * 4. You can add directional animations for your Dragonbones armature motion
 *    animations. To do so, add a number after the animation's name like such:
 *    walk2, walk4, walk6, walk8. These numbers are based off the NumPad
 *    directions to determine which way to face:
 *
 *    7 8 9
 *    4   6
 *    1 2 3
 *
 *    These numbers are added onto the priority system listed in #3 above, too.
 *    Diagonal directions also become split and added multiple times for better
 *    streamlining, with a priority given to the horizontal direction before
 *    the vertical direction. For example, dashing becomes the following:
 *
 *    Dashing (Upper Left):
 *    - dash7, dash4, dash8, dash,
 *      walk7, walk4, walk8, walk,
 *      idle7, idle4, idle8, idle
 *
 *    Dashing (Right):
 *    - dash6, dash,
 *      walk6, walk,
 *      idle6, idle
 *
 * ---
 *
 * 5. When a Dragonbones armature is moving, it will animate slower or faster
 *    depending on the character's current movement speed. At speed
 *    '4: Normal', it will animation 4x faster than what's seen in Dragonbones.
 *    At speed '6: x4 Faster', it will animate 6x faster while '1: x8 Slower'
 *    will be at x1 speed seen in Dragonbones. In other words, the speed
 *    animated is equal to the number written on the left of the
 *    movement speed.
 *
 *    When dashing, that multiplier increases by 1 in order to match movement
 *    speeds and the Dragonbones armature will do the same to follow.
 *
 * ---
 *
 * You will need to create your Dragonbones armatures with these 5 key rules in
 * mind in order to make the armatures animate smoothly within your game.
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
 * VisuMZ_3_StateTooltips
 *
 * If you are using a Dragonbones Battler and want to apply a state tooltip to
 * it, the access area of the battler will be based on the hitbox size you
 * declare for the Dragonbones Battler with notetags. This is because all
 * Dragonbones battlers do not have innate automatically calculated hitbox
 * sizes as a result of their dynamically animated nature.
 * 
 * Please refer to the notetag section of the Dragonbones Union plugin for
 * Dragonbones Battler hitboxes to learn how to apply hitbox sizes.
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
 * === Dragonbones Battler Notetags ===
 *
 * The following notetags are to be assigned to either actors and/or enemies.
 * An assigned actor/enemy will have their original sprite hidden from view in
 * favor of the Dragonbones armature to be displayed. Use these notetags to
 * declare various settings for your Dragonbones armatures.
 *
 * ---
 *
 * <Dragonbones Battler: filename>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the DragonBones associated with this actor/enemy to be 'filename'.
 * - The name will be associated with the assets used.
 * - It will be used to check for associated filenames that end with _ske.json,
 *   _tex.json, and _tex.png.
 * - The listed assets must be found in the assigned assets folder.
 *
 * Examples:
 *
 * <Dragonbones Battler: Demon>
 * <Dragonbones Battler: DragonBoy>
 * <Dragonbones Battler: Swordsman>
 * <Dragonbones Battler: Ubbie>
 *
 * ---
 *
 * <Dragonbones Battler Scale: x, y>
 *
 * <Dragonbones Battler Scale X: x>
 * <Dragonbones Battler Scale Y: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the base scale for the Dragonbones associated with this actor/enemy.
 *   This is for those instances where a Dragonbones armature is too large or
 *   small and needs to be scaled down/up.
 * - This scale will be amplified by the actor/enemy's sprite's scale value.
 * - Use the 1st notetag to assign values to both Scale X and Scale Y.
 * - Use the 2nd/3rd notetags to assign Scale X and Y values separately.
 * - Use negative values to flip the Dragonbones armature around.
 *
 * Examples:
 * 
 * <Dragonbones Battler Scale: -0.3, 0.3>
 *
 * <Dragonbones Battler Scale X: -0.3>
 * <Dragonbones Battler Scale Y: 0.3>
 *
 * ---
 *
 * <Dragonbones Battler Offset: x, y>
 *
 * <Dragonbones Battler Offset X: x>
 * <Dragonbones Battler Offset Y: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - When a Dragonbones armature is attached to an actor/enemy's sprite, it
 *   will always be attached at the root point assigned within the Dragonbones
 *   data. If a Dragonbones armature has a root point that does not fit well
 *   with your battler sprite, you can offset it using these notetags.
 * - Replace 'x' and 'y' with number values representing how many pixels you
 *   want to offset the Dragonbones armature by.
 * - Use the 1st notetag to assign values to both Offset X and Offset Y.
 * - Use the 2nd/3rd notetags to assign Offset X and Y values separately.
 * - Use negative values to offset to the left (X) or up (Y) directions.
 *
 * Examples:
 *
 * <Dragonbones Battler Offset: -10, 5>
 *
 * <Dragonbones Battler Offset X: -10>
 * <Dragonbones Battler Offset Y: 5>
 *
 * ---
 *
 * <Dragonbones Battler Size: width, height>
 *
 * <Dragonbones Battler Width: x>
 * <Dragonbones Battler Height: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Dragonbones armatures have no standard width or height. This makes it
 *   problematic when trying to calculate the sprite's width/height for Action
 *   Sequences and the like. These notetags allow you to assign a width and
 *   height value to the sprite, despite the fact the Dragonbones armatures
 *   have no such thing.
 * - Replace 'width', 'height', or 'x' with number values representing the
 *   dimension values in pixels.
 * - Use the 1st notetag to assign values to both Width and Height.
 * - Use the 2nd/3rd notetags to assign Width and Height values separately.
 * - If these notetags aren't used, then use the values defined by default in
 *   Plugin Parameters => Battler Settings => Default => Width/Height.
 *
 * Examples:
 *
 * <Dragonbones Battler Size: 50, 100>
 *
 * <Dragonbones Battler Width: 50>
 * <Dragonbones Battler Height: 100>
 *
 * ---
 *
 * <Dragonbones Battler Time Scale: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Lets you adjust the time scale for the Dragonbones armature.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 *
 * Example:
 *
 * <Dragonbones Battler Time Scale: 1.5>
 *
 * ---
 *
 * <Dragonbones Battler Motion Walk: animation>
 * <Dragonbones Battler Motion Wait: animation>
 * <Dragonbones Battler Motion Chant: animation>
 * <Dragonbones Battler Motion Guard: animation>
 * <Dragonbones Battler Motion Damage: animation>
 * <Dragonbones Battler Motion Evade: animation>
 * <Dragonbones Battler Motion Thrust: animation>
 * <Dragonbones Battler Motion Swing: animation>
 * <Dragonbones Battler Motion Missile: animation>
 * <Dragonbones Battler Motion Skill: animation>
 * <Dragonbones Battler Motion Spell: animation>
 * <Dragonbones Battler Motion Item: animation>
 * <Dragonbones Battler Motion Escape: animation>
 * <Dragonbones Battler Motion Victory: animation>
 * <Dragonbones Battler Motion Dying: animation>
 * <Dragonbones Battler Motion Abnormal: animation>
 * <Dragonbones Battler Motion Sleep: animation>
 * <Dragonbones Battler Motion Dead: animation>
 *
 * - Used for: Actor, Enemy Notetags
 * - Use these notetags to assign Dragonbones animations to play when the
 *   actor/enemy sprite is supposed to play such a motion.
 * - Replace 'animation' with the name of the Dragonbones animation.
 * - If this notetag is not used, when such a motion is rquested, it will
 *   default to attempting to play the animation name equal to the motion.
 * - Animation names do not need to be case sensitive.
 * - If no animation is found, then no animation will be played.
 *
 * Examples:
 *
 * <Dragonbones Battler Motion Wait: idle>
 * <Dragonbones Battler Motion Swing: attack>
 * <Dragonbones Battler Motion Thrust: attack>
 * <Dragonbones Battler Motion Missle: attack>
 * <Dragonbones Battler Motion Skill: special>
 * <Dragonbones Battler Motion Spell: special>
 * <Dragonbones Battler Motion Dead: defeated>
 *
 * ---
 *
 * <Dragonbones Battler Settings>
 *  Battler: filename
 *  
 *  Scale: x, y
 *
 *  Scale X: x
 *  Scale Y: x
 *
 *  Offset: x, y
 *
 *  Offset X: x
 *  Offset Y: x
 *
 *  Size: width, height
 *
 *  Width: x
 *  Height: x
 *
 *  Time Scale: x
 *
 *  Motion Walk: animation
 *  Motion Wait: animation
 *  Motion Chant: animation
 *  Motion Guard: animation
 *  Motion Damage: animation
 *  Motion Evade: animation
 *  Motion Thrust: animation
 *  Motion Swing: animation
 *  Motion Missile: animation
 *  Motion Skill: animation
 *  Motion Spell: animation
 *  Motion Item: animation
 *  Motion Escape: animation
 *  Motion Victory: animation
 *  Motion Dying: animation
 *  Motion Abnormal: animation
 *  Motion Sleep: animation
 *  Motion Dead: animation
 * </Dragonbones Battler Settings>
 *
 * - Used for: Actor, Enemy Notetags
 * - The above notetag allows to wrap up all the information you'd like to
 *   set for Dragonbones battler armatures needed inside a single notetag
 *   container.
 * - The settings are the same as the notetags listed above it.
 * - You may remove the settings you don't wish to change.
 * - The only necessary data is the 'Battler: filename' line.
 *
 * Example:
 *
 * <Dragonbones Battler Settings>
 *  Battler: Demon
 *  
 *  Scale: 0.3, 0.3
 *
 *  Size: 80, 80
 *
 *  Motion Wait: idle
 *  Motion Damage: hit
 *  Motion Swing: attack
 *  Motion Thrust: attack
 *  Motion Missile: attack
 *  Motion Skill: special
 *  Motion spell: special
 *  Motion Dead: defeated
 * </Dragonbones Battler Settings>
 *
 * ---
 * 
 * <Dragonbones Hue Affected>
 * 
 * - Used for: Enemy Notetags
 * - The above notetag enables hues to affect enemy battlers.
 * - This will bypass the Plugin Parameter default settings.
 * 
 * ---
 * 
 * <Dragonbones No Hue>
 * 
 * - Used for: Enemy Notetags
 * - The above notetag disables hues to affect enemy battlers.
 * - This will bypass the Plugin Parameter default settings.
 * 
 * ---
 *
 * === Dragonbones Map Sprite Notetags & Comment Tags ===
 *
 * You can also use Dragonbones armatures as map sprites. When used, any of the
 * original sprites before will become invisible and will be replaced with the
 * Dragonbones armature.
 *
 * These notetags can be used for actors and events. In the case of events,
 * both notetags and comment tags can be used to determine what settings to use
 * for the Dragonbones armatures.
 *
 * Be cautious when using Comment Tags for event pages since comments contain a
 * maximum line count of 6.
 *
 * ---
 *
 * <Dragonbones Sprite: filename>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Sets the DragonBones associated with this map sprite to be 'filename'.
 * - The name will be associated with the assets used.
 * - It will be used to check for associated filenames that end with _ske.json,
 *   _tex.json, and _tex.png.
 * - The listed assets must be found in the assigned assets folder.
 *
 * Examples:
 *
 * <Dragonbones Sprite: Demon>
 * <Dragonbones Sprite: DragonBoy>
 * <Dragonbones Sprite: Swordsman>
 * <Dragonbones Sprite: Ubbie>
 *
 * ---
 *
 * <Dragonbones Sprite Scale: x, y>
 *
 * <Dragonbones Sprite Scale X: x>
 * <Dragonbones Sprite Scale Y: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Sets the base scale for the Dragonbones associated with this map sprite.
 *   This is for those instances where a Dragonbones armature is too large or
 *   small and needs to be scaled down/up.
 * - This scale will be amplified by the character's sprite's scale value.
 * - Use the 1st notetag to assign values to both Scale X and Scale Y.
 * - Use the 2nd/3rd notetags to assign Scale X and Y values separately.
 * - Use negative values to flip the Dragonbones armature around.
 *
 * Examples:
 * 
 * <Dragonbones Sprite Scale: -0.3, 0.3>
 *
 * <Dragonbones Sprite Scale X: -0.3>
 * <Dragonbones Sprite Scale Y: 0.3>
 *
 * ---
 *
 * <Dragonbones Sprite Offset: x, y>
 *
 * <Dragonbones Sprite Offset X: x>
 * <Dragonbones Sprite Offset Y: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - When a Dragonbones armature is attached to an character's map sprite, it
 *   will always be attached at the root point assigned within the Dragonbones
 *   data. If a Dragonbones armature has a root point that does not fit well
 *   with your battler sprite, you can offset it using these notetags.
 * - Replace 'x' and 'y' with number values representing how many pixels you
 *   want to offset the Dragonbones armature by.
 * - Use the 1st notetag to assign values to both Offset X and Offset Y.
 * - Use the 2nd/3rd notetags to assign Offset X and Y values separately.
 * - Use negative values to offset to the left (X) or up (Y) directions.
 *
 * Examples:
 *
 * <Dragonbones Sprite Offset: -10, 5>
 *
 * <Dragonbones Sprite Offset X: -10>
 * <Dragonbones Sprite Offset Y: 5>
 *
 * ---
 *
 * <Dragonbones Sprite Time Scale: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the time scale for the Dragonbones armature.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 *
 * Example:
 *
 * <Dragonbones Sprite Time Scale: 1.5>
 *
 * ---
 * 
 * <Dragonbones Sprite Walk Rate: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the animation speed for the Dragonbones armature only
 *   when it is walking.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 * - If used with the <Dragonbones Sprite Time Scale: x>, the speed will stack
 *   multiplicatively.
 *
 * Example:
 *
 * <Dragonbones Sprite Walk Rate: 1.5>
 * 
 * ---
 * 
 * <Dragonbones Sprite Dash Rate: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the animation speed for the Dragonbones armature only
 *   when it is dashing.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 * - If used with the <Dragonbones Sprite Time Scale: x>, the speed will stack
 *   multiplicatively.
 *
 * Example:
 *
 * <Dragonbones Sprite Dash Rate: 1.5>
 * 
 * ---
 *
 * <Dragonbones Sprite Size: width, height>
 *
 * <Dragonbones Sprite Width: x>
 * <Dragonbones Sprite Height: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Dragonbones armatures have no standard width or height. This makes it
 *   problematic when trying to calculate the sprite's width/height for various
 *   plugins that use it. These notetags allow you to assign a width and
 *   height value to the sprite, despite the fact the Dragonbones armatures
 *   have no such thing.
 * - Replace 'width', 'height', or 'x' with number values representing the
 *   dimension values in pixels.
 * - Use the 1st notetag to assign values to both Width and Height.
 * - Use the 2nd/3rd notetags to assign Width and Height values separately.
 * - If these notetags aren't used, then use the values defined by default in
 *   the Plugin Parameters.
 *
 * Examples:
 *
 * <Dragonbones Sprite Size: 48, 64>
 *
 * <Dragonbones Sprite Width: 48>
 * <Dragonbones Sprite Height: 64>
 *
 * ---
 *
 * <Dragonbones Sprite Flip Left>
 * <Dragonbones Sprite Flip Right>
 *
 * <Dragonbones Sprite No Flip Left>
 * <Dragonbones Sprite No Flip Right>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets the map sprite know to flip itself when facing either the left/right
 *   directions in order to reuse animations.
 * - The 'No' variants will prevent flipping from occuring.
 * - These notetags will override settings applied in the Plugin Parameters.
 *
 * ---
 *
 * <Dragonbones Sprite Motion Idle: animation>
 * <Dragonbones Sprite Motion Walk: animation>
 * <Dragonbones Sprite Motion Dash: animation>
 * <Dragonbones Sprite Motion Jump: animation>
 * <Dragonbones Sprite Motion LadderIdle: animation>
 * <Dragonbones Sprite Motion LadderClimb: animation>
 * <Dragonbones Sprite Motion RopeIdle: animation>
 * <Dragonbones Sprite Motion RopeClimb: animation>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you set specific animations different from the ones listed in the
 *   Plugin Parameters for specific motions.
 * - Replace 'animation' with the name of the Dragonbones animation.
 * - If this notetag is not used, when such a motion is rquested, it will
 *   default to attempting to play the animation name equal to the motion.
 * - Animation names do not need to be case sensitive.
 * - If no animation is found, then no animation will be played.
 *
 * Example:
 *
 * <Dragonbones Sprite Motion Idle: stand>
 * <Dragonbones Sprite Motion Walk: move>
 * <Dragonbones Sprite Motion Dash: run>
 * <Dragonbones Sprite Motion Jump: hop>
 *
 * ---
 *
 * <Dragonbones Sprite Settings>
 *  Filename: filename
 *
 *  Scale: x, y
 *
 *  Scale X: x
 *  Scale Y: x
 *
 *  Offset: x, y
 *
 *  Offset X: x
 *  Offset Y: x
 *
 *  Time Scale: x
 * 
 *  Walk Rate: x
 *  Dash Rate: x
 *
 *  Width: x
 *  Height: x
 *
 *  Flip Left
 *  Flip Right
 *
 *  No Flip Left
 *  No Flip Right
 *
 *  Motion Idle: animation
 *  Motion Walk: animation
 *  Motion Dash: animation
 *  Motion Jump: animation
 *  Motion LadderIdle: animation
 *  Motion LadderClimb: animation
 *  Motion RopeIdle: animation
 *  Motion RopeClimb: animation
 * </Dragonbones Sprite Settings>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - The above notetag allows to wrap up all the information you'd like to
 *   set for Dragonbones battler armatures needed inside a single notetag
 *   container.
 * - The settings are the same as the notetags listed above it.
 * - You may remove the settings you don't wish to change.
 * - The only necessary data is the 'Filename: filename' line.
 *
 * Example:
 *
 * <Dragonbones Sprite Settings>
 *  Filename: Ubbie
 *
 *  Scale: 0.1, 0.1
 *
 *  Flip Right
 *
 *  Motion Idle: stand
 *  Motion Walk: walk
 * </Dragonbones Sprite Settings>
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
 * === Battler Plugin Commands ===
 * 
 * ---
 *
 * Battler: Actor Change Settings
 * - Change target actor's Dragonbones armature settings for battle.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *     Filename:
 *     - Change the armature's filename.
 *
 *     Offset X:
 *     - Change the armature's Offset X value.
 *
 *     Offset Y:
 *     - Change the armature's Offset Y value.
 *
 *     Scale X:
 *     - Change the armature's Scale X value.
 * 
 *     Scale Y:
 *     - Change the armature's Scale Y value.
 *
 *     Time Scale:
 *     - Change the armature's Time Scale value.
 *
 *     Width:
 *     - Change the battler width size.
 *
 *     Height:
 *     - Change the battler height size.
 *
 *   Motion Settings:
 *
 *     Walk:
 *     Wait:
 *     Chant:
 *     Guard:
 *     Damage:
 *     Evade:
 *     Thrust:
 *     Swing:
 *     Missile:
 *     Skill:
 *     Spell:
 *     Item:
 *     Escape:
 *     Victory:
 *     Dying:
 *     Abnormal:
 *     Sleep:
 *     Dead:
 *     - Change the animation used for this motion.
 *
 * ---
 * 
 * === Map Sprite Plugin Commands ===
 * 
 * ---
 *
 * Map Sprite: Actor Change Settings
 * - Change target actor's Dragonbones armature settings for map sprites.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *     Filename:
 *     - Change the armature's filename.
 *
 *     Offset X:
 *     - Change the armature's Offset X value.
 *
 *     Offset Y:
 *     - Change the armature's Offset Y value.
 *
 *     Scale X:
 *     - Change the armature's Scale X value.
 * 
 *     Scale Y:
 *     - Change the armature's Scale Y value.
 *
 *     Time Scale:
 *     - Change the armature's Time Scale value.
 * 
 *       Walk Rate:
 *       - Change the armature's walk animation rate.
 * 
 *       Dash Rate:
 *       - Change the armature's dash animation rate.
 *
 *     Width:
 *     - Change the battler width size.
 *
 *     Height:
 *     - Change the battler height size.
 *
 *   Flip Settings:
 *
 *     Flip Left?:
 *     Flip Right:
 *     - Flip the scale x value when facing left/right-ward directions?
 *
 *   Motion Settings:
 *
 *     Idle:
 *     Walk:
 *     Dash:
 *     Jump:
 *     Ladder (Idle):
 *     Ladder (Climb):
 *     Rope (Idle):
 *     Rope (Climb):
 *     - Base rope climbing animation name used.
 *
 * ---
 *
 * Map Sprite: Actor Play Animation
 * - Target actor plays a custom Dragonbones animation.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * NOTE: An alternative to this is to put the following code inside of a
 *       Movement Route's script call:
 *
 *       this.dragonbonesAnimation = "AnimationName";
 *
 *       Replace 'AnimationName' (keep the quotes) with the name of the
 *       Dragonbones animation.
 *
 * ---
 *
 * Map Sprite: Actor Stop Animation
 * - Stops a target actor's custom Dragonbones animation.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 * ---
 *
 * Map Sprite: Event Play Animation
 * - Target event plays a custom Dragonbones animation.
 *
 *   Event ID:
 *   - Select which Event ID to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Event Stop Animation
 * - Stops a target event's custom Dragonbones animation.
 *
 *   Event ID:
 *   - Select which Event ID to affect.
 *
 * ---
 *
 * Map Sprite: Follower Play Animation
 * - Target follower plays a custom Dragonbones animation.
 *
 *   Follower Index:
 *   - Select which Follower Index to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Follower Stop Animation
 * - Stops a target follower's custom Dragonbones animation.
 *
 *   Follower ID:
 *   - Select which Follower Index to affect.
 *
 * ---
 *
 * Map Sprite: Player Play Animation
 * - Player plays a custom Dragonbones animation.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Player Stop Animation
 * - Stops player's custom Dragonbones animation.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Dragonbones Setup
 * - Setup a Dragonbones armature for a picture.
 *
 *   Picture ID:
 *   - Select which Picture ID(s) to give a Dragonbones armature.
 *
 *   Armature Filename:
 *   - What is the armature's filename?
 *
 *   Play Animation:
 *   - Play this animation once it starts.
 *
 *   Offset: X:
 *   - Default X offset value for this Dragonbones armature.
 *
 *   Offset: Y:
 *   - Default Y offset value for this Dragonbones armature.
 *
 *   Scale: X:
 *   - Default X scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Scale: Y:
 *   - Default Y scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Time Scale:
 *   - Default time scale for this Dragonbones armature.
 *   - Higher values play faster. Lower values play slower.
 *
 * ---
 *
 * Picture: Play Dragonbones Animation
 * - Make an existing Dragonbones armature attached to a picture play
 *   an animation.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Play Animation:
 *   - Play this animation.
 * 
 *   Finish: Revert Idle:
 *   - Revert animation to 'idle' animation after finishing?
 *
 * ---
 *
 * Picture: Offset Dragonbones
 * - Offset the X, Y attachment point of the Dragonbones armature.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Offset: X:
 *   - X offset value for this Dragonbones armature.
 *
 *   Offset: Y:
 *   - Y offset value for this Dragonbones armature.
 *
 * ---
 *
 * Picture: Scale Dragonbones
 * - Change the scaling values of the Dragonbones armature.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Scale: X:
 *   - X scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Scale: Y:
 *   - Y scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 * ---
 *
 * Picture: Time Scale Dragonbones
 * - Change the speed at which Dragonbones animations play.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Time Scale:
 *   - Time scale for this Dragonbones armature.
 *   - Higher values play faster. Lower values play slower.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings that apply to all uses of Dragonbones through
 * this plugin. While the majority of these can remain unchanged, for those who
 * wish to customize the nature of the plugin to their liking can do so through
 * these Plugin Parameters.
 *
 * ---
 *
 * Assets Path
 * - The filepath to the directory that houses all the Dragonbone files.
 *
 * ---
 *
 * Defaults
 * 
 *   Loaded Animation:
 *   - The default animation to play once a Dragonbones armature is loaded.
 * 
 *   Looping Animations:
 *   - Force these animations to become looping animations even if they don't
 *     loop in Dragonbones.
 *
 * ---
 *
 * Skeletal Data
 * Texture Data
 * Texture Asset
 * 
 *   Key:
 *   - Key used to determine where needed data is stored.
 * 
 *   Extension:
 *   - Extension used to determine which files contain needed data.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battler Settings
 * ============================================================================
 *
 * Actor and Enemy sprites can have Dragonbones armatures attached to them as
 * sprites. Use these settings to make the Dragonbones armatures fit your needs
 * in battle.
 *
 * ---
 *
 * Default Settings
 * 
 *   Enemy Hue Affected?:
 *   - Affect hues for enemies with Dragonbones battlers?
 * 
 *   Offset: X:
 *   - Default X offset for battler sprites.
 * 
 *   Offset: Y:
 *   - Default Y offset for battler sprites.
 * 
 *   Scale: X:
 *   - Default scale for X used by Dragonbones battlers.
 * 
 *     Flip for Actors?:
 *     Flip for Enemies?:
 *     - Flip the scale x value into negative automatically for all actors
 *       or enemies?
 * 
 *   Scale: Y:
 *   - Default scale for Y used by Dragonbones battlers.
 * 
 *   Width:
 *   - Treat battler sprites as if they have this width.
 *   - Used for Action Sequences.
 * 
 *   Height:
 *   - Treat battler sprites as if they have this height.
 *   - Used for Action Sequences.
 *
 * ---
 * 
 * Idle Bypass
 * 
 *   List:
 *   - This is a list of animations that will not return back to the idle
 *     animation after completion.
 *   - Remove them if you want them to revert back to the idle animation
 *     after completion.
 *   - Add to the list if you want animations to stay in their final frame.
 * 
 * ---
 *
 * Default Motions
 * 
 *   Walk:
 *   Wait:
 *   Chant:
 *   Guard:
 *   Damage:
 *   Evade:
 *   Thrust:
 *   Swing:
 *   Missile:
 *   Skill:
 *   Spell:
 *   Item:
 *   Escape:
 *   Victory:
 *   Dying:
 *   Abnormal:
 *   Sleep:
 *   Dead:
 *   - Play this Dragonbones animation whenever this motion is requested
 *     by default.
 *   - Used for Action Sequences.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Map Sprite Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust the default configurations for any
 * map sprite that's using a Dragonbones armature. These settings can be
 * overwritten on per a sprite basis using notetags and comment tags, too.
 *
 * ---
 *
 * Defaults
 * 
 *   Offset: X:
 *   - Default X offset for map sprites.
 * 
 *   Offset: Y:
 *   - Default Y offset for map sprites.
 * 
 *   Scale: X:
 *   - Default scale for X used by Dragonbones map sprites.
 * 
 *     Flip Left?:
 *     Flip Right?:
 *     - Flip the scale x value when facing left/right-ward directions?
 * 
 *   Scale: Y:
 *   - Default scale for Y used by Dragonbones map sprites.
 * 
 *   Time Scale:
 *   - The rate at which animations play.
 *   - Higher numbers go faster.
 * 
 *   Width:
 *   - Treat map sprites as if they have this width.
 *   - Used for various plugins.
 * 
 *   Height:
 *   - Treat map sprites as if they have this height.
 *   - Used for various plugins.
 *
 * ---
 *
 * Motion Settings
 * 
 *   Idle:
 *   Walk:
 *   Dash:
 *   Jump:
 *   Ladder (Idle):
 *   Ladder (Climb):
 *   Rope (Idle):
 *   Rope (Climb):
 *   - Base walk animation name used.
 * 
 *   Walk Timer:
 *   - Number of frames to count as walking so that an idle animation isn't
 *     immediately forced upon stopping.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Experimental Settings
 * ============================================================================
 *
 * These settings are experimental and have not been tested extensively yet.
 *
 * ---
 *
 * Experimental Settings
 * 
 *   Enemy Stances:
 *   - Enemies can use stance motions for idling such as chanting,
 *     guarding, etc.
 *   - Requires VisuMZ_1_BattleCore!
 *   - This is not available normally since animations are not available for
 *     enemies with the base RPG Maker MZ core scripts.
 *   - Disable this to use the default animation flow for enemies.
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
 *
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * Special Thanks To
 * 
 * * Green Kel
 * * Ækashics
 * * Swift Illusion
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.17: January 27, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Added Plugin Command Parameter for "Picture: Play Dragonbones Animation":
 * *** Finish: Revert Idle?
 * **** Revert animation to 'idle' animation after finishing?
 * **** Added by Irina
 *
 * Version 1.16: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.15: June 18, 2021
 * * Compatibility Update
 * ** Compatibility update with Elements and Status Menu Core's trait hues.
 *    These will be affected by the notetags and/or Plugin Parameters applied.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Ækashics:
 * *** <Dragonbones Hue Affected>
 * *** <Dragonbones No Hue>
 * **** Determines if this enemy's Dragonbones battler is affected by hues
 *      or not. This will bypass the Plugin Parameter's default value.
 * ** New Plugin Parameter added by Irina and sponsored by Ækashics:
 * *** Plugin Parameters > Battler Settings > Default > Enemy Hue Affected?
 * **** Affect hues for enemies with Dragonbones battlers?
 * **** This will be disabled by default. Enable it or set it to true to make
 *      it work properly.
 * 
 * Version 1.14: April 2, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_StateTooltips plugin.
 * 
 * Version 1.13: March 19, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Experimental: Enemy Stances
 * **** Allows enemies to utilize stance motions for idling such as chanting,
 *      guarding, etc.
 * **** Requires VisuMZ_1_BattleCore!
 * **** This is not available normally since animations are not available for
 *      enemies with the base RPG Maker MZ core scripts.
 * **** Disable this to use the default animation flow for enemies.
 * 
 * Version 1.12: February 19, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash upon teleporting with an altering
 *    Dragonbones armature load without a base sprite. Fix made by Irina.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Fixed a bug involving the changing of a Dragonbones battler in-battle to
 *    prevent multiple instances being added at once. Fix made by Irina.
 * 
 * Version 1.10: January 22, 2021
 * * Bug Fixes!
 * ** Upon changing map sprites, Dragonbones characters would become skewed.
 *    This should no longer happen.
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** Map Sprite: Actor Change Settings new Plugin Command parameters
 * *** "Walk Rate" and "Dash Rate" modifiers added.
 * 
 * Version 1.09: November 29, 2020
 * * Bug Fixes!
 * ** Dragonbones height for actors is no longer affected by frame divisibility
 *    for SV Actors to skew the positions of height data. Fix made by Arisu.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** Two new notetags have been added for map sprites by Irina.
 * *** <Dragonbones Sprite Walk Rate: x>
 * *** <Dragonbones Sprite Dash Rate: x>
 * **** These two new notetags allow you to animate specific Dragonbones
 *      animations at a different speed when walking or dashing. These speed
 *      multipliers will stack multiplicatively with the time scale.
 * 
 * Version 1.07: October 25, 2020
 * * Bug Fixes!
 * ** Dead animations for actors no longer keep looping upon motion refreshes.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for new features.
 * * New Features!
 * ** New plugin parameter added by Irina.
 * *** Plugin Parameters > Battler Settings > Idle Bypass > List
 * **** This is a list of animations that will not return back to the idle
 *      animation after completion. Remove them if you want them to revert back
 *      to the idle animation after completion. Add to the list if you want
 *      animations to stay in their final frame.
 * 
 * Version 1.06: October 18, 2020
 * * Bug Fixes!
 * ** Enemies with Dragonbones battlers transforming into other enemies with
 *    Dragonbones battlers will now attach the sprites properly. Fix by Yanfly.
 * ** Enemies with Dragonbones battlers transforming into enemies without them
 *    will now remove the non-transformed bitmap.
 * * Documentation Update!
 * ** Added the 'Dragonbones Naming' section.
 * 
 * Version 1.05: October 4, 2020
 * * Bug Fixes!
 * ** Selected Dragonbones battlers will no longer leave behind a residual
 *    blink effect. Fix made by Irina.
 * ** There should be no more crashes from map events that have been previously
 *    deleted but not cleared from the map event list. Fix made by Irina.
 * 
 * Version 1.04: September 20, 2020
 * * Bug Fixes!
 * ** Hidden enemies with Dragonbones should be invisible at the start of
 *    battle. Fix made by Yanfly.
 * 
 * Version 1.03: September 13, 2020
 * * Compatibility Update!
 * ** Added compatibility with the new Battle Core v1.04 features!
 * 
 * Version 1.02: September 6, 2020
 * * Bug Fixes!
 * ** Previously, a Dragonbones battler does not show the blinking indicator if
 *    the battler is a selected target. This is now fixed. Fix made by Yanfly.
 * ** Prevents a crash now if no bitmap is detected for the main sprite.
 * 
 * Version 1.01: August 30, 2020
 * * Bug Fixes!
 * ** Erasing a picture no longer causes a crash when changing scenes. Fix made
 *    by Yanfly.
 * * Compatibility Update
 * ** Added compatibility for VisuStella MZ's Visual State Effects.
 *
 * Version 1.00: August 24, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Battler_ActorChange
 * @text Battler: Actor Change Settings
 * @desc Change target actor's Dragonbones armature settings for battle.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Filename:str
 * @text Filename
 * @parent ActorID:num
 * @desc Change the armature's filename.
 * @default name
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @parent ActorID:num
 * @desc Change the armature's Offset X value.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent ActorID:num
 * @desc Change the armature's Offset Y value.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale X
 * @parent ActorID:num
 * @desc Change the armature's Scale X value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale Y
 * @parent ActorID:num
 * @desc Change the armature's Scale Y value.
 * @default 1.0
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @parent ActorID:num
 * @desc Change the armature's Time Scale value.
 * @default 1.0
 *
 * @arg Width:eval
 * @text Width
 * @parent ActorID:num
 * @desc Change the battler width size.
 * @default 64
 *
 * @arg Height:eval
 * @text Height
 * @parent ActorID:num
 * @desc Change the battler height size.
 * @default 64
 *
 * @arg DefaultMotions
 * @text Motion Settings
 *
 * @arg MotionWalk:str
 * @text Walk
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default walk
 *
 * @arg MotionWait:str
 * @text Wait
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default wait
 *
 * @arg MotionChant:str
 * @text Chant
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default chant
 *
 * @arg MotionGuard:str
 * @text Guard
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default guard
 *
 * @arg MotionDamage:str
 * @text Damage
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default damage
 *
 * @arg MotionEvade:str
 * @text Evade
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default evade
 *
 * @arg MotionThrust:str
 * @text Thrust
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default thrust
 *
 * @arg MotionSwing:str
 * @text Swing
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default swing
 *
 * @arg MotionMissile:str
 * @text Missile
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default missile
 *
 * @arg MotionSkill:str
 * @text Skill
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default skill
 *
 * @arg MotionSpell:str
 * @text Spell
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default spell
 *
 * @arg MotionItem:str
 * @text Item
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default item
 *
 * @arg MotionEscape:str
 * @text Escape
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default escape
 *
 * @arg MotionVictory:str
 * @text Victory
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default victory
 *
 * @arg MotionDying:str
 * @text Dying
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default dying
 *
 * @arg MotionAbnormal:str
 * @text Abnormal
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default abnormal
 *
 * @arg MotionSleep:str
 * @text Sleep
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default sleep
 *
 * @arg MotionDead:str
 * @text Dead
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default dead
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorChange
 * @text Map Sprite: Actor Change Settings
 * @desc Change target actor's Dragonbones armature settings for map sprites.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Filename:str
 * @text Filename
 * @parent ActorID:num
 * @desc Change the armature's filename.
 * @default name
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @parent ActorID:num
 * @desc Change the armature's Offset X value.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent ActorID:num
 * @desc Change the armature's Offset Y value.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale X
 * @parent ActorID:num
 * @desc Change the armature's Scale X value.
 * @default 0.5
 *
 * @arg ScaleY:eval
 * @text Scale Y
 * @parent ActorID:num
 * @desc Change the armature's Scale Y value.
 * @default 0.5
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @parent ActorID:num
 * @desc Change the armature's Time Scale value.
 * @default 1.0
 *
 * @arg WalkRate:eval
 * @text Walk Rate
 * @parent TimeScale:eval
 * @desc Change the armature's walk animation rate.
 * @default 1.0
 *
 * @arg DashRate:eval
 * @text Dash Rate
 * @parent TimeScale:eval
 * @desc Change the armature's dash animation rate.
 * @default 1.0
 *
 * @arg Width:eval
 * @text Width
 * @parent ActorID:num
 * @desc Change the armature's width value.
 * @default 48
 *
 * @arg Height:eval
 * @text Height
 * @parent ActorID:num
 * @desc Change the armature's height.
 * @default 48
 *
 * @arg FlipSettings
 * @text Flip Settings
 *
 * @arg FlipLeft:eval
 * @text Flip Left?
 * @parent FlipSettings
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing left-ward directions?
 * @default false
 *
 * @arg FlipRight:eval
 * @text Flip Right?
 * @parent FlipSettings
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing right-ward directions?
 * animation is found?
 * @default false
 *
 * @arg Animations
 * @text Motion Settings
 *
 * @arg Idle:str
 * @text Idle
 * @parent Animations
 * @desc Base idle animation name used.
 * @default idle
 *
 * @arg Walk:str
 * @text Walk
 * @parent Animations
 * @desc Base walk animation name used.
 * @default walk
 *
 * @arg Dash:str
 * @text Dash
 * @parent Animations
 * @desc Base dash animation name used.
 * @default dash
 *
 * @arg Jump:str
 * @text Jump
 * @parent Animations
 * @desc Base jump animation name used.
 * @default jump
 *
 * @arg LadderIdle:str
 * @text Ladder (Idle)
 * @parent Animations
 * @desc Base ladder idle animation name used.
 * @default ladderidle
 *
 * @arg LadderClimb:str
 * @text Ladder (Climb)
 * @parent Animations
 * @desc Base ladder climbing animation name used.
 * @default ladderclimb
 *
 * @arg RopeIdle:str
 * @text Rope (Idle)
 * @parent Animations
 * @desc Base rope idle animation name used.
 * @default ropeidle
 *
 * @arg RopeClimb:str
 * @text Rope (Climb)
 * @parent Animations
 * @desc Base rope climbing animation name used.
 * @default ropecllmb
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorAnimationPlay
 * @text Map Sprite: Actor Play Animation
 * @desc Target actor plays a custom Dragonbones animation.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorAnimationStop
 * @text Map Sprite: Actor Stop Animation
 * @desc Stops a target actor's custom Dragonbones animation.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_EventAnimationPlay
 * @text Map Sprite: Event Play Animation
 * @desc Target event plays a custom Dragonbones animation.
 *
 * @arg EventID:eval
 * @text Event ID
 * @desc Select which Event ID to affect.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_EventAnimationStop
 * @text Map Sprite: Event Stop Animation
 * @desc Stops a target event's custom Dragonbones animation.
 *
 * @arg EventID:eval
 * @text Event ID
 * @desc Select which Event ID to affect.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_FollowerAnimationPlay
 * @text Map Sprite: Follower Play Animation
 * @desc Target follower plays a custom Dragonbones animation.
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Select which Follower Index to affect.
 * @default 0
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_FollowerAnimationStop
 * @text Map Sprite: Follower Stop Animation
 * @desc Stops a target follower's custom Dragonbones animation.
 *
 * @arg FollowerIndex:eval
 * @text Follower ID
 * @desc Select which Follower Index to affect.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_PlayerAnimationPlay
 * @text Map Sprite: Player Play Animation
 * @desc Player plays a custom Dragonbones animation.
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_PlayerAnimationStop
 * @text Map Sprite: Player Stop Animation
 * @desc Stops player's custom Dragonbones animation.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_SetupDragonbones
 * @text Picture: Dragonbones Setup
 * @desc Setup a Dragonbones armature for a picture.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID(s) to give a Dragonbones armature.
 * @default 1
 *
 * @arg Filename:str
 * @text Armature Filename
 * @desc What is the armature's filename?
 * @default Untitled
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation once it starts.
 * @default Idle
 *
 * @arg OffsetX:eval
 * @text Offset: X
 * @desc Default X offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset: Y
 * @desc Default Y offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale: X
 * @desc Default X scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale: Y
 * @desc Default Y scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @desc Default time scale for this Dragonbones armature.
 * Higher values play faster. Lower values play slower.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_DragonbonesAnimation
 * @text Picture: Play Dragonbones Animation
 * @desc Make an existing Dragonbones armature attached to a picture play an animation.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @arg IdleFinish:eval
 * @text Finish: Revert Idle?
 * @parent FlipSettings
 * @type boolean
 * @on Revert
 * @off Freeze
 * @desc Revert animation to 'idle' animation after finishing?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_DragonbonesOffset
 * @text Picture: Offset Dragonbones
 * @desc Offset the X, Y attachment point of the Dragonbones armature.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg OffsetX:eval
 * @text Offset: X
 * @desc X offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset: Y
 * @desc Y offset value for this Dragonbones armature.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_ScaleDragonbones
 * @text Picture: Scale Dragonbones
 * @desc Change the scaling values of the Dragonbones armature.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg ScaleX:eval
 * @text Scale: X
 * @desc X scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale: Y
 * @desc Y scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_TimeScaleDragonbones
 * @text Picture: Time Scale Dragonbones
 * @desc Change the speed at which Dragonbones animations play.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @desc Default time scale for this Dragonbones armature.
 * Higher values play faster. Lower values play slower.
 * @default 1.0
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
 * @param DragonbonesUnion
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Main
 * @text Main Settings
 *
 * @param AssetsPath:str
 * @text Assets Path
 * @parent Main
 * @desc The filepath to the directory that houses all the Dragonbone files.
 * @default ./dragonbones_assets/
 *
 * @param General:struct
 * @text General Settings
 * @parent Main
 * @type struct<General>
 * @desc A set of general settings pertaining to all uses of Dragonbones.
 * @default {"Defaults":"","LoadAnimation:str":"idle","LoopingAnimations:arraystr":"[\"idle\",\"walk\",\"wait\",\"chant\",\"guard\",\"dying\",\"abnormal\",\"sleep\",\"dash\",\"ladderidle\",\"ladderclimb\",\"ropeidle\",\"ropeclimb\"]","SkeletalData":"","SkeKey:str":"dbData","SkeExt:str":"_ske.json","TextureData":"","TexKey:str":"texData","TexExt:str":"_tex.json","TextureAsset":"","TxaKey:str":"texAsset","TxaExt:str":"_tex.png"}
 *
 * @param Battler:struct
 * @text Battler Settings
 * @parent Main
 * @type struct<Battler>
 * @desc A set of general settings pertaining to Dragonbones battlers.
 * @default {"Defaults":"","OffsetX:num":"0","OffsetY:num":"0","ScaleX:num":"1.0","FlipActors:eval":"false","FlipEnemies:eval":"false","ScaleY:num":"1.0","TimeScale:num":"1.0","Width:num":"64","Height:num":"64","IdleBypass":"","IdleBypassList:arraystr":"[\"dead\",\"escape\",\"victory\"]","DefaultMotions":"","MotionWalk:str":"walk","MotionWait:str":"wait","MotionChant:str":"chant","MotionGuard:str":"guard","MotionDamage:str":"damage","MotionEvade:str":"evade","MotionThrust:str":"thrust","MotionSwing:str":"swing","MotionMissile:str":"missile","MotionSkill:str":"skill","MotionSpell:str":"spell","MotionItem:str":"item","MotionEscape:str":"escape","MotionVictory:str":"victory","MotionDying:str":"dying","MotionAbnormal:str":"abnormal","MotionSleep:str":"sleep","MotionDead:str":"dead"}
 *
 * @param MapSprite:struct
 * @text Map Sprite Settings
 * @parent Main
 * @type struct<MapSprite>
 * @desc A set of general settings pertaining to Dragonbones map sprites.
 * @default {"Defaults":"","OffsetX:num":"0","OffsetY:num":"0","ScaleX:num":"0.5","FlipLeft:eval":"false","FlipRight:eval":"false","ScaleY:num":"0.5","TimeScale:num":"1.0","Width:num":"48","Height:num":"48","Animations":"","Idle:str":"idle","Walk:str":"walk","WalkTimer:num":"2","Dash:str":"dash","Jump:str":"jump","LadderIdle:str":"ladderidle","LadderClimb:str":"ladderclimb","RopeIdle:str":"ropeidle","RopeClimb:str":"ropecllmb"}
 * 
 * @param Experimental
 * 
 * @param EnemyStances:eval
 * @text Enemy Stances
 * @parent Experimental
 * @type boolean
 * @on Enable Stances
 * @off No Stances
 * @desc Enemies can use stance motions for idling such as
 * chanting, guarding, etc. Requires VisuMZ_1_BattleCore!
 * @default false
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
 * @param LoadAnimation:str
 * @text Loaded Animation
 * @parent Defaults
 * @desc The default animation to play once a Dragonbones armature is loaded.
 * @default idle
 *
 * @param LoopingAnimations:arraystr
 * @text Looping Animations
 * @parent Defaults
 * @type string[]
 * @desc Force these animations to become looping animations even if they don't loop in Dragonbones.
 * @default ["idle","walk","wait","chant","guard","dying","abnormal","sleep","dash","ladderidle","ladderclimb","ropeidle","ropeclimb"]
 *
 * @param SkeletalData
 * @text Skeletal Data
 *
 * @param SkeKey:str
 * @text Key
 * @parent SkeletalData
 * @desc Key used to determine where skeletal data is stored.
 * @default dbData
 *
 * @param SkeExt:str
 * @text Extension
 * @parent SkeletalData
 * @desc Extension used to determine which files contain skeletal data.
 * @default _ske.json
 *
 * @param TextureData
 * @text Texture Data
 *
 * @param TexKey:str
 * @text Key
 * @parent TextureData
 * @desc Key used to determine where texture data is stored.
 * @default texData
 *
 * @param TexExt:str
 * @text Extension
 * @parent TextureData
 * @desc Extension used to determine which files contain texture data.
 * @default _tex.json
 *
 * @param TextureAsset
 * @text Texture Asset
 *
 * @param TxaKey:str
 * @text Key
 * @parent TextureAsset
 * @desc Key used to determine where texture assets are stored.
 * @default texAsset
 *
 * @param TxaExt:str
 * @text Extension
 * @parent TextureAsset
 * @desc Extension used to determine which files contain texture assets.
 * @default _tex.png
 *
 */
/* ----------------------------------------------------------------------------
 * Battler Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battler:
 *
 * @param Defaults
 * @text Default Settings
 *
 * @param HueAffected:eval
 * @text Enemy Hue Affected?
 * @parent Defaults
 * @type boolean
 * @on Affect Hues
 * @off No Hues
 * @desc Affect hues for enemies with Dragonbones battlers?
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Defaults
 * @desc Default X offset for battler sprites.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Defaults
 * @desc Default Y offset for battler sprites.
 * @default 0
 *
 * @param ScaleX:num
 * @text Scale: X
 * @parent Defaults
 * @desc Default scale for X used by Dragonbones battlers.
 * @default 1.0
 *
 * @param FlipActors:eval
 * @text Flip for Actors?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value into negative automatically for all actors?
 * @default false
 *
 * @param FlipEnemies:eval
 * @text Flip for Enemies?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value into negative automatically for all enemies?
 * @default false
 *
 * @param ScaleY:num
 * @text Scale: Y
 * @parent Defaults
 * @desc Default scale for Y used by Dragonbones battlers.
 * @default 1.0
 *
 * @param TimeScale:num
 * @text Time Scale
 * @parent Defaults
 * @desc The rate at which animations play.
 * Higher numbers go faster.
 * @default 1.0
 *
 * @param Width:num
 * @text Width
 * @parent Defaults
 * @desc Treat battler sprites as if they have this width.
 * Used for Action Sequences.
 * @default 64
 *
 * @param Height:num
 * @text Height
 * @parent Defaults
 * @desc Treat battler sprites as if they have this height.
 * Used for Action Sequences.
 * @default 64
 *
 * @param IdleBypass
 * @text Idle Bypass
 *
 * @param IdleBypassList:arraystr
 * @text List
 * @parent IdleBypass
 * @type combo[]
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc This is a list of animations that will not return back to the idle animation after completion.
 * @default ["dead","escape","victory"]
 *
 * @param DefaultMotions
 * @text Default Motions
 *
 * @param MotionWalk:str
 * @text Walk
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default walk
 *
 * @param MotionWait:str
 * @text Wait
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default wait
 *
 * @param MotionChant:str
 * @text Chant
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default chant
 *
 * @param MotionGuard:str
 * @text Guard
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default guard
 *
 * @param MotionDamage:str
 * @text Damage
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default damage
 *
 * @param MotionEvade:str
 * @text Evade
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default evade
 *
 * @param MotionThrust:str
 * @text Thrust
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default thrust
 *
 * @param MotionSwing:str
 * @text Swing
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default swing
 *
 * @param MotionMissile:str
 * @text Missile
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default missile
 *
 * @param MotionSkill:str
 * @text Skill
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default skill
 *
 * @param MotionSpell:str
 * @text Spell
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default spell
 *
 * @param MotionItem:str
 * @text Item
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default item
 *
 * @param MotionEscape:str
 * @text Escape
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default escape
 *
 * @param MotionVictory:str
 * @text Victory
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default victory
 *
 * @param MotionDying:str
 * @text Dying
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default dying
 *
 * @param MotionAbnormal:str
 * @text Abnormal
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default abnormal
 *
 * @param MotionSleep:str
 * @text Sleep
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default sleep
 *
 * @param MotionDead:str
 * @text Dead
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default dead
 *
 */
/* ----------------------------------------------------------------------------
 * Map Sprite Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MapSprite:
 *
 * @param Defaults
 * @text Default Settings
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Defaults
 * @desc Default X offset for map sprites.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Defaults
 * @desc Default Y offset for map sprites.
 * @default 0
 *
 * @param ScaleX:num
 * @text Scale: X
 * @parent Defaults
 * @desc Default scale for X used by Dragonbones map sprites.
 * @default 0.5
 *
 * @param FlipLeft:eval
 * @text Flip Left?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing left-ward directions?
 * @default false
 *
 * @param FlipRight:eval
 * @text Flip Right?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing right-ward directions?
 * animation is found?
 * @default false
 *
 * @param ScaleY:num
 * @text Scale: Y
 * @parent Defaults
 * @desc Default scale for Y used by Dragonbones map sprites.
 * @default 0.5
 *
 * @param TimeScale:num
 * @text Time Scale
 * @parent Defaults
 * @desc The rate at which animations play.
 * Higher numbers go faster.
 * @default 1.0
 *
 * @param Width:num
 * @text Width
 * @parent Defaults
 * @desc Treat map sprites as if they have this width.
 * Used for various plugins.
 * @default 48
 *
 * @param Height:num
 * @text Height
 * @parent Defaults
 * @desc Treat map sprites as if they have this height.
 * Used for various plugins.
 * @default 48
 *
 * @param Animations
 * @text Motion Settings
 *
 * @param Idle:str
 * @text Idle
 * @parent Animations
 * @desc Base idle animation name used.
 * @default idle
 *
 * @param Walk:str
 * @text Walk
 * @parent Animations
 * @desc Base walk animation name used.
 * @default walk
 *
 * @param WalkTimer:num
 * @text Walk Timer
 * @parent Walk:str
 * @desc Number of frames to count as walking so that an idle animation isn't immediately forced upon stopping.
 * @default 2
 *
 * @param Dash:str
 * @text Dash
 * @parent Animations
 * @desc Base dash animation name used.
 * @default dash
 *
 * @param Jump:str
 * @text Jump
 * @parent Animations
 * @desc Base jump animation name used.
 * @default jump
 *
 * @param LadderIdle:str
 * @text Ladder (Idle)
 * @parent Animations
 * @desc Base ladder idle animation name used.
 * @default ladderidle
 *
 * @param LadderClimb:str
 * @text Ladder (Climb)
 * @parent Animations
 * @desc Base ladder climbing animation name used.
 * @default ladderclimb
 *
 * @param RopeIdle:str
 * @text Rope (Idle)
 * @parent Animations
 * @desc Base rope idle animation name used.
 * @default ropeidle
 *
 * @param RopeClimb:str
 * @text Rope (Climb)
 * @parent Animations
 * @desc Base rope climbing animation name used.
 * @default ropecllmb
 *
 */
//=============================================================================

const _0x19c152=_0x3e8a;function _0x3e8a(_0x1428e7,_0x2821f3){const _0x368087=_0x3680();return _0x3e8a=function(_0x3e8a2d,_0x139e6f){_0x3e8a2d=_0x3e8a2d-0x1d1;let _0xed1148=_0x368087[_0x3e8a2d];return _0xed1148;},_0x3e8a(_0x1428e7,_0x2821f3);}(function(_0x2066e9,_0x3c600c){const _0x22c85d=_0x3e8a,_0x389a24=_0x2066e9();while(!![]){try{const _0x11e1d5=parseInt(_0x22c85d(0x1e6))/0x1*(parseInt(_0x22c85d(0x334))/0x2)+-parseInt(_0x22c85d(0x335))/0x3+-parseInt(_0x22c85d(0x2fa))/0x4+parseInt(_0x22c85d(0x28a))/0x5*(-parseInt(_0x22c85d(0x311))/0x6)+parseInt(_0x22c85d(0x30d))/0x7+-parseInt(_0x22c85d(0x266))/0x8+parseInt(_0x22c85d(0x1d8))/0x9;if(_0x11e1d5===_0x3c600c)break;else _0x389a24['push'](_0x389a24['shift']());}catch(_0x112f23){_0x389a24['push'](_0x389a24['shift']());}}}(_0x3680,0xe51b8));function _0x3680(){const _0x1673ab=['Height','direction','length','STRUCT','MapSprite_ActorChange','_dragonbonesData','EnemyStances','bind','guard','Idle','addDragonbonesAnimationDirections','dashRate','isHidden','refreshMotionDragonbones','createBaseDragonbonesSprite','setupDragonbones','hasDragonbones','MotionSleep','_dragonbonesBattlerData','RopeClimb','_dragonbonesSpriteContainer','_shadowSprite','followers','requestMotion','width','Game_Enemy_performCollapse','FUNC','defineProperty','IdleBypassList','trim','realMoveSpeed','TexKey','DashRate','makeDeepCopy','VisuMZ_1_BattleCore','offsetX','walk','LoopingAnimations','concat','4472680qPbcUO','ActorID','sleep','Sprite_Actor_updateShadow','HueAffected','Scene_Battle_terminate','stateMotionIndex','actor','ScaleX','Settings','updateDragonbones','isJumping','picture','isCompleted','updateCharacterFrameDragonbonesUnion','Game_Interpreter_PluginCommand','MotionAbnormal','MapSprite_FollowerAnimationPlay','performDamageDragonbonesUnion','6919311PVfWTk','play','refresh','height','204hSMtUd','Game_Actor_performDamage','_pictureContainer','shared','MotionEvade','MapSprite_ActorAnimationPlay','disposeDragonbones','ConvertParams','Jump','Sprite_Enemy_updateBitmap','removeChild','status','erasePicture','Game_Enemy_performAction','processLoad','lastFileName','runQueuedCallbacks','performAction','offsetY','MotionWait','follower','createArmature','bitmap','STR','chant','walkRate','WalkTimer','_weaponSprite','DragonbonesUnion','Sprite_Actor_updateBitmap','battler','FollowerIndex','updateDragonbonesArmature','code','animationNames','780990UHzbch','2985687GAgfDD','isMoving','registerCommand','realPictureId','dead','children','JSON','_character','MapSprite_EventAnimationStop','getLastPluginCommandInterpreter','dying','_dragonbonesFilename','MapSprite_ActorAnimationStop','escape','Game_Actor_performAttack','jump','push','find','Filename','setBattler','MotionDamage','34180056TRoHDT','constructor','Picture_SetupDragonbones','Sprite_Enemy_setBattler','Loader','_dragonbonesAnimation','MotionSkill','Dragonbones','event','leader','MotionThrust','_spriteset','TimeScale','Sprite_Enemy_initMembers','2eklKdx','performCollapseDragonbonesUnion','addDragonbonesChild','battlerSprites','AssetsPath','updateDragonbonesTimeScale','Sprite_Enemy_setHue','_playtestF7Looping','dash','animations','ladderidle','findTargetSprite','Sprite_Actor_startMotion','_playTestFastMode','MotionWalk','testArmature','animation','Game_Enemy_setup','MotionGuard','Animation','FlipEnemies','addChildAt','testLoaded','ScaleY','PictureID','currentDragonbonesAnimation','lastAnimationName','parseDragonBonesData','_battler','attack','updateDragonbonesUnion','Sprite_Character_updateBitmap','item','setup','setDragonbonesHue','Dash','scale','requestMotionRefresh','performDamage','updateDragonbonesAnimation','dragonbonesAnimation','updateBitmap','Width','battlerHue','initialize','Game_Screen_erasePicture','MotionItem','isGuardWaiting','Game_Actor_performCollapse','abnormal','addChild','Game_Enemy_transform','loadComplete','Sprite_Character_updateCharacterFrame','loading','LadderClimb','updateDragonbonesProperties','LadderIdle','MotionEscape','filter','Sprite_Picture_initialize','LoadQueue','DefaultAnimation','RopeIdle','setupDragonbonesData','Game_CharacterBase_update','createDefaultPicture','transform','SkeKey','MotionSwing','VisuMZ_1_OptionsCore','hasDragonbonesBattler','startMotion','isSceneMap','_scene','includes','setFrame','playTimes','description','playDragonbonesMotion','Game_Enemy_performDamage','loadNextArmature','isUndecided','updateFrameDragonbonesUnion','MotionMissile','note','map','dragonbonesFlip','match','_baseDragonbonesSprite','_enemy','isMagicSkill','MotionSpell','dispose','ARRAYNUM','isSkill','MotionDying','Sprite_Actor_updateFrame','setupDragonbonesDataCommentTags','toLowerCase','clearPageSettings','parseTextureAtlasData','EventID','call','scaleX','isAlive','enemy','Picture_ScaleDragonbones','OffsetY','factory','Game_Picture_initialize','FlipActors','once','isChanting','timeScale','SkeExt','filename','Battler','wait','_dragonbonesMoveTimer','playDragonbonesAnimation','visible','command357','General','FlipLeft','updateShadow','Sprite_Character_initialize','_enemyId','6669728UNgwuR','NUM','isGuard','ARRAYJSON','parse','parameters','performCollapse','isOnRope','TexExt','flipLeft','format','playDragonbonesIdleAnimation','updateFrame','scaleY','name','motion','updateShadowDragonbonesUnion','_lastPluginCommandInterpreter','Game_Actor_setup','MapSprite','findPictureSprite','return\x200','ARRAYSTRUCT','isActor','isInputting','_dragonbonesSpriteData','isItem','ARRAYEVAL','ARRAYFUNC','max','MotionChant','Game_Battler_requestMotion','LoadedFilenames','isActing','isAttack','CallbackQueue','247310oiZztZ','checkDragonbonesStringTags','list','onLoadDragonbones','setupPageSettings','initMembersDragonbonesUnion','dragonbonesData','MapSprite_FollowerAnimationStop','Battler_ActorChange','initDragonbonesData','Game_Event_clearPageSettings','skill','loadArmature','ladderclimb','dragonbonesSpriteData','index','initMembers','Picture_TimeScaleDragonbones','opacity','isDying','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_pictures','isDashing','Sprite_Actor_initMembers','PixiFactory','OffsetX','isDragonbonesHueAffected','prototype','revertToIdle','TxaKey','ARRAYSTR','erasePictureDragonbonesUnion','update','updateCharacterFrame','FlipRight','VisuMZ_0_CoreEngine','Walk','Sprite_Picture_update','isEnemy','add','TxaExt','battleAniSpeed','setupDragonbonesDataNotetags','_mainSprite','performActionMotions','ropeidle','performActionDragonbonesUnion','idle','Game_Follower_refresh','performAttack','setHue','terminate','Game_Player_refresh','flipRight','Game_Event_setupPageSettings','_dragonbonesFlipDirection','load','round','exit','_stateSprite','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Picture_DragonbonesAnimation','_dragonbonesName','_dragonbones','EVAL','requestDragonbonesAnimation','data','showPicture','setLastPluginCommandInterpreter','shift','eventId','MotionVictory'];_0x3680=function(){return _0x1673ab;};return _0x3680();}var label=_0x19c152(0x32d),tier=tier||0x0,dependencies=[_0x19c152(0x1df)],pluginData=$plugins[_0x19c152(0x221)](function(_0x411bac){const _0x334dce=_0x19c152;return _0x411bac[_0x334dce(0x31c)]&&_0x411bac['description'][_0x334dce(0x231)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x19c152(0x303)]||{},VisuMZ[_0x19c152(0x318)]=function(_0x2f347a,_0x37b358){const _0x39de88=_0x19c152;for(const _0x46a9eb in _0x37b358){if(_0x46a9eb[_0x39de88(0x23e)](/(.*):(.*)/i)){const _0x1a5a11=String(RegExp['$1']),_0x4cbdfe=String(RegExp['$2'])['toUpperCase']()[_0x39de88(0x2f0)]();let _0x3362de,_0x29dbcd,_0x58f1db;switch(_0x4cbdfe){case _0x39de88(0x267):_0x3362de=_0x37b358[_0x46a9eb]!==''?Number(_0x37b358[_0x46a9eb]):0x0;break;case _0x39de88(0x244):_0x29dbcd=_0x37b358[_0x46a9eb]!==''?JSON[_0x39de88(0x26a)](_0x37b358[_0x46a9eb]):[],_0x3362de=_0x29dbcd[_0x39de88(0x23c)](_0x21d6c7=>Number(_0x21d6c7));break;case _0x39de88(0x2cb):_0x3362de=_0x37b358[_0x46a9eb]!==''?eval(_0x37b358[_0x46a9eb]):null;break;case _0x39de88(0x281):_0x29dbcd=_0x37b358[_0x46a9eb]!==''?JSON[_0x39de88(0x26a)](_0x37b358[_0x46a9eb]):[],_0x3362de=_0x29dbcd[_0x39de88(0x23c)](_0x56a9d6=>eval(_0x56a9d6));break;case _0x39de88(0x33b):_0x3362de=_0x37b358[_0x46a9eb]!==''?JSON[_0x39de88(0x26a)](_0x37b358[_0x46a9eb]):'';break;case _0x39de88(0x269):_0x29dbcd=_0x37b358[_0x46a9eb]!==''?JSON[_0x39de88(0x26a)](_0x37b358[_0x46a9eb]):[],_0x3362de=_0x29dbcd[_0x39de88(0x23c)](_0x372cad=>JSON[_0x39de88(0x26a)](_0x372cad));break;case _0x39de88(0x2ed):_0x3362de=_0x37b358[_0x46a9eb]!==''?new Function(JSON[_0x39de88(0x26a)](_0x37b358[_0x46a9eb])):new Function(_0x39de88(0x27b));break;case _0x39de88(0x282):_0x29dbcd=_0x37b358[_0x46a9eb]!==''?JSON[_0x39de88(0x26a)](_0x37b358[_0x46a9eb]):[],_0x3362de=_0x29dbcd[_0x39de88(0x23c)](_0xb7cd29=>new Function(JSON[_0x39de88(0x26a)](_0xb7cd29)));break;case _0x39de88(0x328):_0x3362de=_0x37b358[_0x46a9eb]!==''?String(_0x37b358[_0x46a9eb]):'';break;case _0x39de88(0x2a8):_0x29dbcd=_0x37b358[_0x46a9eb]!==''?JSON[_0x39de88(0x26a)](_0x37b358[_0x46a9eb]):[],_0x3362de=_0x29dbcd[_0x39de88(0x23c)](_0x148288=>String(_0x148288));break;case _0x39de88(0x2d6):_0x58f1db=_0x37b358[_0x46a9eb]!==''?JSON[_0x39de88(0x26a)](_0x37b358[_0x46a9eb]):{},_0x3362de=VisuMZ[_0x39de88(0x318)]({},_0x58f1db);break;case _0x39de88(0x27c):_0x29dbcd=_0x37b358[_0x46a9eb]!==''?JSON[_0x39de88(0x26a)](_0x37b358[_0x46a9eb]):[],_0x3362de=_0x29dbcd[_0x39de88(0x23c)](_0x436a98=>VisuMZ['ConvertParams']({},JSON['parse'](_0x436a98)));break;default:continue;}_0x2f347a[_0x1a5a11]=_0x3362de;}}return _0x2f347a;},(_0x25cf40=>{const _0x299a3b=_0x19c152,_0x5525b6=_0x25cf40[_0x299a3b(0x274)];for(const _0x50d479 of dependencies){if(!Imported[_0x50d479]){alert(_0x299a3b(0x2c6)[_0x299a3b(0x270)](_0x5525b6,_0x50d479)),SceneManager['exit']();break;}}const _0x1ea530=_0x25cf40[_0x299a3b(0x234)];if(_0x1ea530['match'](/\[Version[ ](.*?)\]/i)){const _0x3b09d7=Number(RegExp['$1']);_0x3b09d7!==VisuMZ[label]['version']&&(alert(_0x299a3b(0x2c7)[_0x299a3b(0x270)](_0x5525b6,_0x3b09d7)),SceneManager[_0x299a3b(0x2c4)]());}if(_0x1ea530[_0x299a3b(0x23e)](/\[Tier[ ](\d+)\]/i)){const _0x10a2df=Number(RegExp['$1']);_0x10a2df<tier?(alert(_0x299a3b(0x29e)[_0x299a3b(0x270)](_0x5525b6,_0x10a2df,tier)),SceneManager[_0x299a3b(0x2c4)]()):tier=Math[_0x299a3b(0x283)](_0x10a2df,tier);}VisuMZ[_0x299a3b(0x318)](VisuMZ[label][_0x299a3b(0x303)],_0x25cf40[_0x299a3b(0x26b)]);})(pluginData);function DragonbonesManager(){throw new Error('This\x20is\x20a\x20static\x20class');}DragonbonesManager[_0x19c152(0x1ea)]=VisuMZ[_0x19c152(0x32d)][_0x19c152(0x303)]['AssetsPath'],DragonbonesManager[_0x19c152(0x224)]=VisuMZ['DragonbonesUnion'][_0x19c152(0x303)][_0x19c152(0x261)]['LoadAnimation'],DragonbonesManager[_0x19c152(0x286)]=[],DragonbonesManager[_0x19c152(0x223)]=[],DragonbonesManager['CallbackQueue']=[],DragonbonesManager['test']=function(_0x36aee2,_0xcb9c24,_0x29af85,_0x1e29d7){const _0xd5eeb7=_0x19c152;if(!_0x29af85)_0x29af85=SceneManager[_0xd5eeb7(0x230)];if(!_0x1e29d7)_0x1e29d7=_0xd5eeb7(0x1f5);if(_0x29af85[_0x1e29d7]){const _0x467d4a=_0x29af85[_0x1e29d7];_0x467d4a&&(_0x29af85[_0xd5eeb7(0x31b)](_0x467d4a),_0x467d4a[_0xd5eeb7(0x243)]());}this[_0xd5eeb7(0x296)](_0x36aee2,DragonbonesManager[_0xd5eeb7(0x1fc)][_0xd5eeb7(0x2da)](this,_0x36aee2,_0xcb9c24,_0x29af85,_0x1e29d7));},DragonbonesManager[_0x19c152(0x1fc)]=function(_0x385d3f,_0xffbe8b,_0x2866e7,_0x59cb8f){const _0x3bb492=_0x19c152,_0x2c224d=this[_0x3bb492(0x326)](_0x385d3f);_0x2c224d&&(_0x2866e7[_0x3bb492(0x218)](_0x2c224d),_0x2c224d['x']=Graphics[_0x3bb492(0x2eb)]/0x2,_0x2c224d['y']=Graphics[_0x3bb492(0x310)]*0x3/0x4,_0xffbe8b=_0xffbe8b||DragonbonesManager['DefaultAnimation'],_0xffbe8b=_0xffbe8b[_0x3bb492(0x249)](),_0x2c224d[_0x3bb492(0x1f6)][_0x3bb492(0x1ef)][_0xffbe8b]&&_0x2c224d[_0x3bb492(0x1f6)][_0x3bb492(0x30e)](_0xffbe8b)),_0x2866e7[_0x59cb8f]=_0x2c224d;},DragonbonesManager[_0x19c152(0x326)]=function(_0x114e6a){const _0x27a194=_0x19c152,_0x263ee2=dragonBones[_0x27a194(0x2a2)][_0x27a194(0x253)]['buildArmatureDisplay'](_0x114e6a);if(!_0x263ee2)return null;for(const _0x3cf895 in _0x263ee2['animation'][_0x27a194(0x1ef)]){if(_0x3cf895[_0x27a194(0x249)]()===_0x3cf895)continue;_0x263ee2['animation'][_0x27a194(0x1ef)][_0x3cf895[_0x27a194(0x249)]()]=_0x263ee2[_0x27a194(0x1f6)][_0x27a194(0x1ef)][_0x3cf895],delete _0x263ee2[_0x27a194(0x1f6)][_0x27a194(0x1ef)][_0x3cf895];}for(let _0x26657c=0x0;_0x26657c<_0x263ee2[_0x27a194(0x1f6)][_0x27a194(0x333)]['length'];_0x26657c++){_0x263ee2['animation']['animationNames'][_0x26657c]=_0x263ee2[_0x27a194(0x1f6)][_0x27a194(0x333)][_0x26657c][_0x27a194(0x249)]();}const _0x3a1f44=VisuMZ[_0x27a194(0x32d)][_0x27a194(0x303)]['General'][_0x27a194(0x2f8)];for(let _0x45cf75 of _0x3a1f44){_0x45cf75=_0x45cf75[_0x27a194(0x249)]()['trim']();_0x263ee2[_0x27a194(0x1f6)]['animations'][_0x45cf75]&&(_0x263ee2[_0x27a194(0x1f6)][_0x27a194(0x1ef)][_0x45cf75][_0x27a194(0x233)]=0x0);for(let _0x58ccb3=0x1;_0x58ccb3<=0x9;_0x58ccb3++){const _0x2cd5c5=_0x45cf75+_0x58ccb3;_0x263ee2['animation']['animations'][_0x2cd5c5]&&(_0x263ee2['animation'][_0x27a194(0x1ef)][_0x2cd5c5][_0x27a194(0x233)]=0x0);}}return _0x263ee2[_0x27a194(0x1f6)][_0x27a194(0x1ef)][DragonbonesManager['DefaultAnimation']]&&_0x263ee2['animation']['play'](DragonbonesManager['DefaultAnimation']),_0x263ee2;},DragonbonesManager[_0x19c152(0x296)]=function(_0x57bb80,_0x7d55d1){const _0x4ae869=_0x19c152;_0x57bb80=_0x57bb80[_0x4ae869(0x2f0)](),DragonbonesManager[_0x4ae869(0x223)]['push'](_0x57bb80),DragonbonesManager[_0x4ae869(0x289)][_0x4ae869(0x1d3)](_0x7d55d1);const _0x30ca8c=PIXI[_0x4ae869(0x1dc)]['shared'];!_0x30ca8c[_0x4ae869(0x21c)]&&this[_0x4ae869(0x237)]();},DragonbonesManager[_0x19c152(0x237)]=function(){const _0x25ff7c=_0x19c152;DragonbonesManager['LoadQueue']['length']>0x0?this['prepareNextLoadArmature']():this[_0x25ff7c(0x321)]();},DragonbonesManager['prepareNextLoadArmature']=function(){const _0x2493b4=_0x19c152,_0x32ad68=DragonbonesManager[_0x2493b4(0x223)][_0x2493b4(0x2d0)]();if(this[_0x2493b4(0x286)][_0x2493b4(0x231)](_0x32ad68))this[_0x2493b4(0x237)]();else!this['LoadedFilenames'][_0x2493b4(0x231)](_0x32ad68)&&this[_0x2493b4(0x31f)](_0x32ad68);},DragonbonesManager[_0x19c152(0x31f)]=function(_0x1762b0){const _0x3a5e23=_0x19c152;this[_0x3a5e23(0x286)][_0x3a5e23(0x1d3)](_0x1762b0),this[_0x3a5e23(0x320)]=_0x1762b0;const _0x4e0a97=VisuMZ[_0x3a5e23(0x32d)][_0x3a5e23(0x303)][_0x3a5e23(0x261)],_0x31b0bf=DragonbonesManager['AssetsPath'],_0x3eedb0=PIXI[_0x3a5e23(0x1dc)][_0x3a5e23(0x314)];_0x3eedb0[_0x3a5e23(0x2b1)](_0x1762b0+_0x4e0a97[_0x3a5e23(0x22a)],_0x31b0bf+_0x1762b0+_0x4e0a97[_0x3a5e23(0x259)]),_0x3eedb0[_0x3a5e23(0x2b1)](_0x1762b0+_0x4e0a97[_0x3a5e23(0x2f2)],_0x31b0bf+_0x1762b0+_0x4e0a97[_0x3a5e23(0x26e)]),_0x3eedb0[_0x3a5e23(0x2b1)](_0x1762b0+_0x4e0a97['TxaKey'],_0x31b0bf+_0x1762b0+_0x4e0a97[_0x3a5e23(0x2b2)]),_0x3eedb0[_0x3a5e23(0x256)]('complete',DragonbonesManager[_0x3a5e23(0x21a)],this),_0x3eedb0[_0x3a5e23(0x2c2)]();},DragonbonesManager[_0x19c152(0x21a)]=function(_0x10e46d,_0x29860a){const _0x10ba77=_0x19c152,_0x169be8=VisuMZ[_0x10ba77(0x32d)][_0x10ba77(0x303)]['General'],_0x10e751=this[_0x10ba77(0x320)],_0x5a0ca7=dragonBones[_0x10ba77(0x2a2)][_0x10ba77(0x253)];_0x5a0ca7[_0x10ba77(0x201)](_0x29860a[_0x10e751+_0x169be8['SkeKey']][_0x10ba77(0x2cd)]),_0x5a0ca7[_0x10ba77(0x24b)](_0x29860a[_0x10e751+_0x169be8['TexKey']][_0x10ba77(0x2cd)],_0x29860a[_0x10e751+_0x169be8[_0x10ba77(0x2a7)]]['texture']),this[_0x10ba77(0x237)]();},DragonbonesManager[_0x19c152(0x321)]=function(){const _0x20d5d1=_0x19c152;while(DragonbonesManager['CallbackQueue'][_0x20d5d1(0x2d5)]>0x0){const _0x317bef=DragonbonesManager['CallbackQueue']['shift']();if(_0x317bef)_0x317bef(this);}},PluginManager[_0x19c152(0x337)](pluginData[_0x19c152(0x274)],_0x19c152(0x292),_0xa7fa35=>{const _0x45cdab=_0x19c152;if(!$gameMap)return;VisuMZ[_0x45cdab(0x318)](_0xa7fa35,_0xa7fa35);const _0x50c730=$gameActors[_0x45cdab(0x301)](_0xa7fa35[_0x45cdab(0x2fb)]);if(!_0x50c730)return;_0x50c730[_0x45cdab(0x2e5)]={'battler':_0xa7fa35[_0x45cdab(0x1d5)],'scaleX':_0xa7fa35[_0x45cdab(0x302)],'scaleY':_0xa7fa35[_0x45cdab(0x1fd)],'offsetX':_0xa7fa35['OffsetX'],'offsetY':_0xa7fa35[_0x45cdab(0x252)],'timeScale':_0xa7fa35['TimeScale'],'width':_0xa7fa35[_0x45cdab(0x210)],'height':_0xa7fa35[_0x45cdab(0x2d3)],'motion':{'walk':_0xa7fa35[_0x45cdab(0x1f4)],'wait':_0xa7fa35[_0x45cdab(0x324)],'chant':_0xa7fa35['MotionChant'],'guard':_0xa7fa35[_0x45cdab(0x1f8)],'damage':_0xa7fa35[_0x45cdab(0x1d7)],'evade':_0xa7fa35['MotionEvade'],'thrust':_0xa7fa35[_0x45cdab(0x1e2)],'swing':_0xa7fa35['MotionSwing'],'missile':_0xa7fa35[_0x45cdab(0x23a)],'skill':_0xa7fa35[_0x45cdab(0x1de)],'spell':_0xa7fa35[_0x45cdab(0x242)],'item':_0xa7fa35['MotionItem'],'escape':_0xa7fa35['MotionEscape'],'victory':_0xa7fa35[_0x45cdab(0x2d2)],'dying':_0xa7fa35[_0x45cdab(0x246)],'abnormal':_0xa7fa35['MotionAbnormal'],'sleep':_0xa7fa35[_0x45cdab(0x2e4)],'dead':_0xa7fa35['MotionDead']}};}),SceneManager['isSceneBattle']=function(){const _0x4f0fa3=_0x19c152;return this['_scene']&&this[_0x4f0fa3(0x230)]['constructor']===Scene_Battle;},SceneManager[_0x19c152(0x22f)]=function(){const _0x365dbc=_0x19c152;return this[_0x365dbc(0x230)]&&this['_scene'][_0x365dbc(0x1d9)]===Scene_Map;},Game_BattlerBase[_0x19c152(0x2a5)][_0x19c152(0x32f)]=function(){const _0x4af73e=_0x19c152;if(!SceneManager['isSceneBattle']())return null;if(!SceneManager['_scene'][_0x4af73e(0x1e3)])return null;return SceneManager[_0x4af73e(0x230)][_0x4af73e(0x1e3)][_0x4af73e(0x1f1)](this);},Game_BattlerBase[_0x19c152(0x2a5)]['initDragonbonesData']=function(){const _0x4118d8=_0x19c152,_0x3af551=VisuMZ[_0x4118d8(0x32d)][_0x4118d8(0x303)][_0x4118d8(0x25b)];this[_0x4118d8(0x2e5)]={'battler':'','scaleX':_0x3af551[_0x4118d8(0x302)],'scaleY':_0x3af551['ScaleY'],'width':_0x3af551['Width'],'height':_0x3af551['Height'],'offsetX':_0x3af551[_0x4118d8(0x2a3)],'offsetY':_0x3af551[_0x4118d8(0x252)],'timeScale':_0x3af551[_0x4118d8(0x1e4)],'motion':{'walk':_0x3af551[_0x4118d8(0x1f4)],'wait':_0x3af551[_0x4118d8(0x324)],'chant':_0x3af551[_0x4118d8(0x284)],'guard':_0x3af551[_0x4118d8(0x1f8)],'damage':_0x3af551[_0x4118d8(0x1d7)],'evade':_0x3af551[_0x4118d8(0x315)],'thrust':_0x3af551[_0x4118d8(0x1e2)],'swing':_0x3af551[_0x4118d8(0x22b)],'missile':_0x3af551[_0x4118d8(0x23a)],'skill':_0x3af551[_0x4118d8(0x1de)],'spell':_0x3af551['MotionSpell'],'item':_0x3af551[_0x4118d8(0x214)],'escape':_0x3af551[_0x4118d8(0x220)],'victory':_0x3af551[_0x4118d8(0x2d2)],'dying':_0x3af551[_0x4118d8(0x246)],'abnormal':_0x3af551[_0x4118d8(0x30a)],'sleep':_0x3af551['MotionSleep'],'dead':_0x3af551['MotionDead']}};if(_0x3af551['FlipActors']&&this[_0x4118d8(0x27d)]())this[_0x4118d8(0x2e5)][_0x4118d8(0x24e)]*=-0x1;if(_0x3af551[_0x4118d8(0x1fa)]&&this[_0x4118d8(0x2b0)]())this['_dragonbonesBattlerData'][_0x4118d8(0x24e)]*=-0x1;},Game_BattlerBase[_0x19c152(0x2a5)][_0x19c152(0x226)]=function(){const _0x5c27fa=_0x19c152,_0x4f25bc=VisuMZ[_0x5c27fa(0x32d)][_0x5c27fa(0x303)][_0x5c27fa(0x25b)],_0x250b17=(this['isActor']()?this['actor']():this[_0x5c27fa(0x250)]())[_0x5c27fa(0x23b)],_0x3ff80b=this['dragonbonesData']();_0x250b17[_0x5c27fa(0x23e)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:BATTLER|SKIN|NAME):[ ]*(.*)>/i)&&(_0x3ff80b['battler']=String(RegExp['$1'])[_0x5c27fa(0x2f0)]());_0x250b17[_0x5c27fa(0x23e)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER):[ ]*(.*)>/i)&&(_0x3ff80b[_0x5c27fa(0x32f)]=String(RegExp['$1'])[_0x5c27fa(0x2f0)]());_0x250b17[_0x5c27fa(0x23e)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SCALE:[ ](.*),[ ](.*)>/i)&&(_0x3ff80b['scaleX']=Number(RegExp['$1']),_0x3ff80b[_0x5c27fa(0x273)]=Number(RegExp['$2']));_0x250b17['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:SCALEX|SCALE X):[ ](.*)>/i)&&(_0x3ff80b['scaleX']=Number(RegExp['$1']));_0x250b17['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SCALEY:[ ](.*)>/i)&&(_0x3ff80b[_0x5c27fa(0x273)]=Number(RegExp['$1']));_0x250b17[_0x5c27fa(0x23e)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]OFFSET:[ ](.*),[ ](.*)>/i)&&(_0x3ff80b['offsetX']=Number(RegExp['$1']),_0x3ff80b[_0x5c27fa(0x323)]=Number(RegExp['$2']));_0x250b17[_0x5c27fa(0x23e)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:OFFSETX|OFFSET X):[ ](.*)>/i)&&(_0x3ff80b['offsetX']=Number(RegExp['$1']));_0x250b17[_0x5c27fa(0x23e)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:OFFSETY|OFFSET Y):[ ](.*)>/i)&&(_0x3ff80b[_0x5c27fa(0x323)]=Number(RegExp['$1']));_0x250b17['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:TIMESCALE|TIME SCALE):[ ](.*)>/i)&&(_0x3ff80b[_0x5c27fa(0x258)]=Number(RegExp['$1']));_0x250b17[_0x5c27fa(0x23e)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SIZE:[ ](.*),[ ](.*)>/i)&&(_0x3ff80b['width']=Number(RegExp['$1']),_0x3ff80b[_0x5c27fa(0x310)]=Number(RegExp['$2']));_0x250b17['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]WIDTH:[ ](.*)>/i)&&(_0x3ff80b[_0x5c27fa(0x2eb)]=Number(RegExp['$1']));_0x250b17[_0x5c27fa(0x23e)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]HEIGHT:[ ](.*)>/i)&&(_0x3ff80b[_0x5c27fa(0x310)]=Number(RegExp['$1']));const _0x2db312=_0x250b17[_0x5c27fa(0x23e)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:ANI|MOTION)[ ](.*):[ ](.*)>/gi);if(_0x2db312)for(const _0x3f2336 of _0x2db312){_0x3f2336['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:ANI|MOTION)[ ](.*):[ ](.*)>/i);const _0x1c0def=String(RegExp['$1'])[_0x5c27fa(0x249)]()[_0x5c27fa(0x2f0)](),_0xf1a427=String(RegExp['$2'])['trim']();_0x3ff80b[_0x5c27fa(0x275)][_0x1c0def]=_0xf1a427;}if(_0x250b17[_0x5c27fa(0x23e)](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER) (?:SETTINGS|SETTING)>\s*([\s\S]*)\s*<\/(?:DB|DRAGONBONE|DRAGONBONES BATTLER) (?:SETTINGS|SETTING)>/i)){const _0x2fc0ad=String(RegExp['$1']);_0x2fc0ad['match'](/(?:BATTLER|SKIN|NAME|FILENAME):[ ]*(.*)/i)&&(_0x3ff80b['battler']=String(RegExp['$1'])[_0x5c27fa(0x2f0)]());_0x2fc0ad[_0x5c27fa(0x23e)](/SCALE:[ ](.*),[ ](.*)/i)&&(_0x3ff80b[_0x5c27fa(0x24e)]=Number(RegExp['$1']),_0x3ff80b[_0x5c27fa(0x273)]=Number(RegExp['$2']));_0x2fc0ad[_0x5c27fa(0x23e)](/(?:SCALEX|SCALE X):[ ](.*)/i)&&(_0x3ff80b[_0x5c27fa(0x24e)]=Number(RegExp['$1']));_0x2fc0ad[_0x5c27fa(0x23e)](/(?:SCALEY|SCALE Y):[ ](.*)/i)&&(_0x3ff80b[_0x5c27fa(0x273)]=Number(RegExp['$1']));_0x2fc0ad[_0x5c27fa(0x23e)](/OFFSET:[ ](.*),[ ](.*)/i)&&(_0x3ff80b['offsetX']=Number(RegExp['$1']),_0x3ff80b[_0x5c27fa(0x323)]=Number(RegExp['$2']));_0x2fc0ad[_0x5c27fa(0x23e)](/(?:OFFSETX|OFFSET X):[ ](.*)/i)&&(_0x3ff80b[_0x5c27fa(0x2f6)]=Number(RegExp['$1']));_0x2fc0ad[_0x5c27fa(0x23e)](/(?:OFFSETY|OFFSET Y):[ ](.*)/i)&&(_0x3ff80b['offsetY']=Number(RegExp['$1']));_0x2fc0ad[_0x5c27fa(0x23e)](/(?:TIMESCALE|TIME SCALE):[ ](.*)/i)&&(_0x3ff80b[_0x5c27fa(0x258)]=Number(RegExp['$1']));_0x2fc0ad[_0x5c27fa(0x23e)](/SIZE:[ ](.*),[ ](.*)/i)&&(_0x3ff80b[_0x5c27fa(0x2eb)]=Number(RegExp['$1']),_0x3ff80b[_0x5c27fa(0x310)]=Number(RegExp['$2']));_0x2fc0ad[_0x5c27fa(0x23e)](/WIDTH:[ ](.*)/i)&&(_0x3ff80b[_0x5c27fa(0x2eb)]=Number(RegExp['$1']));_0x2fc0ad['match'](/HEIGHT:[ ](.*)/i)&&(_0x3ff80b['height']=Number(RegExp['$1']));const _0x26c7f6=_0x2fc0ad[_0x5c27fa(0x23e)](/(?:ANI|MOTION)[ ](.*):[ ](.*)/gi);if(_0x26c7f6)for(const _0x23c2d5 of _0x26c7f6){_0x23c2d5[_0x5c27fa(0x23e)](/(?:ANI|MOTION)[ ](.*):[ ](.*)/i);const _0x481dc7=String(RegExp['$1'])[_0x5c27fa(0x249)]()['trim'](),_0x1b965b=String(RegExp['$2'])[_0x5c27fa(0x2f0)]();_0x3ff80b[_0x5c27fa(0x275)][_0x481dc7]=_0x1b965b;}}if(_0x4f25bc[_0x5c27fa(0x255)]&&this['isActor']())_0x3ff80b[_0x5c27fa(0x24e)]*=-0x1;if(_0x4f25bc['FlipEnemies']&&this['isEnemy']())_0x3ff80b[_0x5c27fa(0x24e)]*=-0x1;},Game_BattlerBase[_0x19c152(0x2a5)][_0x19c152(0x290)]=function(){const _0x9199ac=_0x19c152;if(this[_0x9199ac(0x2e5)]!==undefined)return this[_0x9199ac(0x2e5)];return this[_0x9199ac(0x293)](),this[_0x9199ac(0x226)](),this['_dragonbonesBattlerData'];},Game_BattlerBase['prototype']['hasDragonbonesBattler']=function(){const _0x5e830b=_0x19c152;return this[_0x5e830b(0x32f)]()&&this['dragonbonesData']()[_0x5e830b(0x32f)]!=='';},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x285)]=Game_Battler['prototype'][_0x19c152(0x2ea)],Game_Battler[_0x19c152(0x2a5)][_0x19c152(0x2ea)]=function(_0x332820){const _0x143a11=_0x19c152;VisuMZ[_0x143a11(0x32d)][_0x143a11(0x285)][_0x143a11(0x24d)](this,_0x332820),this['hasDragonbonesBattler']()&&this[_0x143a11(0x32f)]()[_0x143a11(0x235)](_0x332820);},VisuMZ['DragonbonesUnion']['Game_Battler_requestMotionRefresh']=Game_Battler[_0x19c152(0x2a5)][_0x19c152(0x20b)],Game_Battler[_0x19c152(0x2a5)][_0x19c152(0x20b)]=function(){const _0x11d1f5=_0x19c152;VisuMZ[_0x11d1f5(0x32d)]['Game_Battler_requestMotionRefresh'][_0x11d1f5(0x24d)](this),this[_0x11d1f5(0x22d)]()&&this['battler']()[_0x11d1f5(0x271)]();},Game_Battler['prototype'][_0x19c152(0x2cc)]=function(_0x462e4e){const _0x3969e0=_0x19c152;this['hasDragonbonesBattler']()&&this[_0x3969e0(0x32f)]()['playDragonbonesAnimation'](_0x462e4e);},Game_Battler['prototype'][_0x19c152(0x30c)]=function(){const _0x46eb01=_0x19c152;if(!this[_0x46eb01(0x22d)]())return;this['requestMotion']('damage');},Game_Battler[_0x19c152(0x2a5)][_0x19c152(0x1e7)]=function(){const _0x3bb4e5=_0x19c152;if(!this[_0x3bb4e5(0x22d)]())return;this[_0x3bb4e5(0x2ea)](_0x3bb4e5(0x339));},VisuMZ['DragonbonesUnion'][_0x19c152(0x278)]=Game_Actor[_0x19c152(0x2a5)]['setup'],Game_Actor[_0x19c152(0x2a5)][_0x19c152(0x207)]=function(_0x9dcede){const _0x393231=_0x19c152;VisuMZ[_0x393231(0x32d)][_0x393231(0x278)][_0x393231(0x24d)](this,_0x9dcede),this[_0x393231(0x293)](),this[_0x393231(0x226)]();},VisuMZ['DragonbonesUnion']['Game_Actor_performAction']=Game_Actor['prototype'][_0x19c152(0x322)],Game_Actor['prototype'][_0x19c152(0x322)]=function(_0x499f4f){const _0x485d24=_0x19c152;this['requestDragonbonesAnimation'](_0x485d24(0x203)),VisuMZ[_0x485d24(0x32d)]['Game_Actor_performAction'][_0x485d24(0x24d)](this,_0x499f4f);},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x1d1)]=Game_Actor[_0x19c152(0x2a5)][_0x19c152(0x2bb)],Game_Actor['prototype'][_0x19c152(0x2bb)]=function(){const _0x179a83=_0x19c152;this[_0x179a83(0x2cc)](_0x179a83(0x203)),VisuMZ[_0x179a83(0x32d)][_0x179a83(0x1d1)]['call'](this);},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x312)]=Game_Actor[_0x19c152(0x2a5)][_0x19c152(0x20c)],Game_Actor[_0x19c152(0x2a5)][_0x19c152(0x20c)]=function(){const _0x42c699=_0x19c152;VisuMZ[_0x42c699(0x32d)][_0x42c699(0x312)][_0x42c699(0x24d)](this),this[_0x42c699(0x30c)]();},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x216)]=Game_Actor[_0x19c152(0x2a5)][_0x19c152(0x26c)],Game_Actor[_0x19c152(0x2a5)][_0x19c152(0x26c)]=function(){const _0x500ecf=_0x19c152;VisuMZ[_0x500ecf(0x32d)][_0x500ecf(0x216)]['call'](this),this['performCollapseDragonbonesUnion']();},VisuMZ['DragonbonesUnion'][_0x19c152(0x1f7)]=Game_Enemy['prototype'][_0x19c152(0x207)],Game_Enemy['prototype'][_0x19c152(0x207)]=function(_0x17ee18,_0x105fb2,_0x3ccd44){const _0x1a7d1a=_0x19c152;VisuMZ['DragonbonesUnion'][_0x1a7d1a(0x1f7)][_0x1a7d1a(0x24d)](this,_0x17ee18,_0x105fb2,_0x3ccd44),this[_0x1a7d1a(0x293)](),this[_0x1a7d1a(0x226)]();},VisuMZ[_0x19c152(0x32d)]['Game_Enemy_transform']=Game_Enemy[_0x19c152(0x2a5)][_0x19c152(0x229)],Game_Enemy['prototype'][_0x19c152(0x229)]=function(_0x57a8ac){const _0x5df963=_0x19c152,_0x170699=this['_enemyId'];VisuMZ[_0x5df963(0x32d)][_0x5df963(0x219)][_0x5df963(0x24d)](this,_0x57a8ac),this[_0x5df963(0x265)]!==_0x170699&&(this[_0x5df963(0x293)](),this[_0x5df963(0x226)]());},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x31e)]=Game_Enemy[_0x19c152(0x2a5)]['performAction'],Game_Enemy[_0x19c152(0x2a5)]['performAction']=function(_0x5a7032){const _0x368654=_0x19c152;VisuMZ[_0x368654(0x32d)][_0x368654(0x31e)][_0x368654(0x24d)](this,_0x5a7032),this[_0x368654(0x2b8)](_0x5a7032);},Game_Enemy[_0x19c152(0x2a5)]['performActionDragonbonesUnion']=function(_0x6d230c){const _0xad995e=_0x19c152;if(!this[_0xad995e(0x22d)]())return;this['requestDragonbonesAnimation'](_0xad995e(0x203));if(Imported[_0xad995e(0x2f5)])return this[_0xad995e(0x2b6)](_0x6d230c);if(_0x6d230c[_0xad995e(0x288)]())this['requestDragonbonesAnimation'](_0xad995e(0x203));else{if(_0x6d230c[_0xad995e(0x268)]())this[_0xad995e(0x2ea)]('guard');else{if(_0x6d230c[_0xad995e(0x241)]())this[_0xad995e(0x2ea)]('spell');else{if(_0x6d230c[_0xad995e(0x245)]())_0x6d230c[_0xad995e(0x206)]()['damage']['type']>0x0?this[_0xad995e(0x2cc)](_0xad995e(0x203)):this[_0xad995e(0x2ea)](_0xad995e(0x295));else _0x6d230c[_0xad995e(0x280)]()&&this[_0xad995e(0x2ea)](_0xad995e(0x206));}}}},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x236)]=Game_Enemy['prototype']['performDamage'],Game_Enemy[_0x19c152(0x2a5)][_0x19c152(0x20c)]=function(){const _0x88c656=_0x19c152;VisuMZ[_0x88c656(0x32d)]['Game_Enemy_performDamage'][_0x88c656(0x24d)](this),this[_0x88c656(0x30c)]();},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x2ec)]=Game_Enemy[_0x19c152(0x2a5)][_0x19c152(0x26c)],Game_Enemy[_0x19c152(0x2a5)][_0x19c152(0x26c)]=function(){const _0x33183d=_0x19c152;VisuMZ['DragonbonesUnion']['Game_Enemy_performCollapse'][_0x33183d(0x24d)](this),this[_0x33183d(0x1e7)]();},VisuMZ['DragonbonesUnion'][_0x19c152(0x2ff)]=Scene_Battle[_0x19c152(0x2a5)][_0x19c152(0x2bd)],Scene_Battle[_0x19c152(0x2a5)][_0x19c152(0x2bd)]=function(){const _0x2d7a44=_0x19c152;this['_spriteset'][_0x2d7a44(0x317)](),VisuMZ[_0x2d7a44(0x32d)]['Scene_Battle_terminate'][_0x2d7a44(0x24d)](this);},Sprite_Battler[_0x19c152(0x2a5)][_0x19c152(0x28f)]=function(){const _0x42de17=_0x19c152;this['_dragonbones']=null,this[_0x42de17(0x2c9)]='';},Sprite_Battler[_0x19c152(0x2a5)][_0x19c152(0x2e2)]=function(){const _0x4aefcf=_0x19c152;this[_0x4aefcf(0x317)]();const _0x17991a=this['_battler']['dragonbonesData']();this['_dragonbonesName']=_0x17991a[_0x4aefcf(0x32f)],armatureName=_0x17991a['battler'],DragonbonesManager[_0x4aefcf(0x296)](armatureName,this[_0x4aefcf(0x28d)][_0x4aefcf(0x2da)](this)),this[_0x4aefcf(0x327)]=new Bitmap(_0x17991a[_0x4aefcf(0x2eb)],_0x17991a[_0x4aefcf(0x310)]),this[_0x4aefcf(0x2b5)]&&(this[_0x4aefcf(0x2b5)]['bitmap']=new Bitmap(_0x17991a[_0x4aefcf(0x2eb)],_0x17991a[_0x4aefcf(0x310)]));},Sprite_Battler[_0x19c152(0x2a5)]['disposeDragonbones']=function(){const _0x28c8fe=_0x19c152;this['_dragonbones']&&(this[_0x28c8fe(0x2e7)]&&this[_0x28c8fe(0x2e7)][_0x28c8fe(0x31b)](this['_dragonbones']),this[_0x28c8fe(0x31b)](this[_0x28c8fe(0x2ca)]),this[_0x28c8fe(0x2ca)][_0x28c8fe(0x243)](),delete this[_0x28c8fe(0x2ca)],delete this[_0x28c8fe(0x2c9)]);},Sprite_Battler['prototype'][_0x19c152(0x28d)]=function(){const _0x523c5f=_0x19c152,_0x58e4b7=this[_0x523c5f(0x202)]['dragonbonesData']();this[_0x523c5f(0x2ca)]=DragonbonesManager[_0x523c5f(0x326)](_0x58e4b7[_0x523c5f(0x32f)]),!this['_dragonbonesSpriteContainer']&&(this[_0x523c5f(0x2e7)]=new Sprite(),this['_dragonbonesSpriteContainer'][_0x523c5f(0x218)](this[_0x523c5f(0x2ca)])),this[_0x523c5f(0x1fb)](this[_0x523c5f(0x2e7)],0x0),this['attachSpritesToDistortionSprite']&&(this['attachSpritesToDistortionSprite'](),this[_0x523c5f(0x2e7)][_0x523c5f(0x218)](this[_0x523c5f(0x2ca)])),this['playDragonbonesIdleAnimation'](),this['_dragonbones']['x']=_0x58e4b7['offsetX'],this[_0x523c5f(0x2ca)]['y']=_0x58e4b7[_0x523c5f(0x323)],this[_0x523c5f(0x2ca)][_0x523c5f(0x20a)]['x']=_0x58e4b7['scaleX'],this[_0x523c5f(0x2ca)]['scale']['y']=_0x58e4b7[_0x523c5f(0x273)],this[_0x523c5f(0x202)]&&this[_0x523c5f(0x202)][_0x523c5f(0x2df)]()&&(this['opacity']=0x0);},Sprite_Battler[_0x19c152(0x2a5)]['playDragonbonesMotion']=function(_0x3ebc54){const _0x1d4952=_0x19c152;if(!this[_0x1d4952(0x2ca)])return;const _0x1877b6=this[_0x1d4952(0x202)][_0x1d4952(0x290)]();if(_0x1877b6[_0x1d4952(0x275)][_0x3ebc54]){const _0x4049f7=_0x1877b6[_0x1d4952(0x275)][_0x3ebc54];this[_0x1d4952(0x25e)](_0x4049f7);}},Sprite_Battler[_0x19c152(0x2a5)]['playDragonbonesAnimation']=function(_0x377270){const _0x165bab=_0x19c152;_0x377270=_0x377270[_0x165bab(0x249)]();if(!this[_0x165bab(0x2ca)])return;const _0x3f1293=this['_dragonbones']['animation'];if(_0x3f1293[_0x165bab(0x1ef)][_0x377270]){const _0x1dc7ac=_0x3f1293['lastAnimationName'],_0x5a0ab7=[_0x165bab(0x2b9),'walk',_0x165bab(0x25c),_0x165bab(0x329),'guard',_0x165bab(0x33f),_0x165bab(0x217),'sleep',_0x165bab(0x339)];if(_0x1dc7ac===_0x377270&&_0x5a0ab7[_0x165bab(0x231)](_0x377270))return;_0x3f1293[_0x165bab(0x30e)](_0x377270);}},Sprite_Battler[_0x19c152(0x2a5)]['updateDragonbones']=function(){const _0x38c123=_0x19c152;this[_0x38c123(0x1eb)](),this['updateDragonbonesAnimation'](),this['updateDragonbonesSelection']();},Sprite_Battler[_0x19c152(0x2a5)][_0x19c152(0x1eb)]=function(){const _0x4d0b6e=_0x19c152;if(!this['_dragonbones'])return;let _0x4fca31=this['_battler']['dragonbonesData']()['timeScale'];const _0x2b8986=SceneManager[_0x4d0b6e(0x230)];Imported[_0x4d0b6e(0x2ad)]&&_0x2b8986[_0x4d0b6e(0x1ed)]&&$gameTemp[_0x4d0b6e(0x1f3)]&&(_0x4fca31*=0x2),Imported[_0x4d0b6e(0x22c)]&&_0x2b8986['_battleAniSpeedLooping']&&(_0x4fca31*=(ConfigManager[_0x4d0b6e(0x2b3)]||0x0)+0x1),this['_dragonbones'][_0x4d0b6e(0x1f6)][_0x4d0b6e(0x258)]=_0x4fca31;},Sprite_Battler[_0x19c152(0x2a5)][_0x19c152(0x20d)]=function(){const _0x382740=_0x19c152;if(!this['_dragonbones'])return;const _0x5cdb46=this['_dragonbones']['animation'];if(_0x5cdb46['isCompleted']){const _0x7fea57=_0x5cdb46[_0x382740(0x200)];let _0x1da674=VisuMZ['DragonbonesUnion'][_0x382740(0x303)][_0x382740(0x25b)][_0x382740(0x2ef)];_0x1da674===undefined&&(_0x1da674=[_0x382740(0x339),_0x382740(0x342),'victory']),!_0x1da674['includes'](_0x7fea57)&&this[_0x382740(0x271)]();}},Sprite_Battler[_0x19c152(0x2a5)]['updateDragonbonesSelection']=function(){return;},Sprite_Battler[_0x19c152(0x2a5)]['playDragonbonesIdleAnimation']=function(){const _0x48db0a=_0x19c152;if(!this[_0x48db0a(0x2ca)])return;const _0x5b1008=this[_0x48db0a(0x202)];if(!_0x5b1008)return;const _0x2a2fb9=this[_0x48db0a(0x2ca)][_0x48db0a(0x1f6)];if(_0x2a2fb9&&!_0x2a2fb9[_0x48db0a(0x307)])return;this['_battler'][_0x48db0a(0x24f)]()&&this[_0x48db0a(0x25e)](_0x48db0a(0x2b9));const _0x252be6=_0x5b1008[_0x48db0a(0x300)]();if(_0x5b1008[_0x48db0a(0x27e)]()||_0x5b1008[_0x48db0a(0x287)]())this[_0x48db0a(0x235)](_0x48db0a(0x2f7));else{if(_0x252be6===0x3)this[_0x48db0a(0x235)]('dead');else{if(_0x252be6===0x2)this['playDragonbonesMotion'](_0x48db0a(0x2fc));else{if(_0x5b1008['isChanting']())this[_0x48db0a(0x235)](_0x48db0a(0x329));else{if(_0x5b1008[_0x48db0a(0x268)]()||_0x5b1008[_0x48db0a(0x215)]())this['playDragonbonesMotion'](_0x48db0a(0x2db));else{if(_0x252be6===0x1)this[_0x48db0a(0x235)]('abnormal');else{if(_0x5b1008['isDying']())this[_0x48db0a(0x235)](_0x48db0a(0x33f));else _0x5b1008['isUndecided']()?this['playDragonbonesMotion'](_0x48db0a(0x2f7)):this[_0x48db0a(0x235)](_0x48db0a(0x25c));}}}}}}},VisuMZ[_0x19c152(0x32d)]['Sprite_Enemy_setHue']=Sprite_Enemy[_0x19c152(0x2a5)][_0x19c152(0x2bc)],Sprite_Enemy[_0x19c152(0x2a5)]['setHue']=function(_0x46ac65){const _0x3f265c=_0x19c152;this[_0x3f265c(0x2a4)]()?this[_0x3f265c(0x208)](_0x46ac65):VisuMZ[_0x3f265c(0x32d)][_0x3f265c(0x1ec)][_0x3f265c(0x24d)](this,_0x46ac65);},Sprite_Enemy['prototype'][_0x19c152(0x2a4)]=function(){const _0x55392d=_0x19c152;if(!this['_battler'])return![];if(!this[_0x55392d(0x2ca)])return![];const _0x161f59=this[_0x55392d(0x202)][_0x55392d(0x250)]()[_0x55392d(0x23b)]||'';if(_0x161f59[_0x55392d(0x23e)](/<DRAGONBONES HUE AFFECTED>/i))return!![];else{if(_0x161f59[_0x55392d(0x23e)](/<DRAGONBONES NO HUE>/i))return![];}return VisuMZ[_0x55392d(0x32d)][_0x55392d(0x303)][_0x55392d(0x25b)][_0x55392d(0x2fe)];},Sprite_Enemy[_0x19c152(0x2a5)][_0x19c152(0x208)]=function(_0x37b797){const _0x492724=_0x19c152;this[_0x492724(0x2e7)]['_hue']!==_0x37b797&&this[_0x492724(0x2e7)][_0x492724(0x2bc)](_0x37b797);},VisuMZ['DragonbonesUnion']['Sprite_Actor_initMembers']=Sprite_Actor['prototype']['initMembers'],Sprite_Actor[_0x19c152(0x2a5)]['initMembers']=function(){const _0x5e0836=_0x19c152;VisuMZ['DragonbonesUnion'][_0x5e0836(0x2a1)]['call'](this),this[_0x5e0836(0x28f)]();},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x32e)]=Sprite_Actor[_0x19c152(0x2a5)][_0x19c152(0x20f)],Sprite_Actor[_0x19c152(0x2a5)][_0x19c152(0x20f)]=function(){const _0x42cf04=_0x19c152,_0x2769fc=this[_0x42cf04(0x202)];_0x2769fc[_0x42cf04(0x22d)]()?(Sprite_Battler[_0x42cf04(0x2a5)]['updateBitmap']['call'](this),this[_0x42cf04(0x2c9)]!==_0x2769fc[_0x42cf04(0x290)]()[_0x42cf04(0x32f)]&&this['setupDragonbones'](),this[_0x42cf04(0x304)]()):(VisuMZ[_0x42cf04(0x32d)]['Sprite_Actor_updateBitmap'][_0x42cf04(0x24d)](this),this[_0x42cf04(0x31b)](this[_0x42cf04(0x2ca)]));},VisuMZ[_0x19c152(0x32d)]['Sprite_Actor_startMotion']=Sprite_Actor[_0x19c152(0x2a5)][_0x19c152(0x22e)],Sprite_Actor['prototype']['startMotion']=function(_0x68b7f0){const _0x17cbec=_0x19c152;VisuMZ[_0x17cbec(0x32d)][_0x17cbec(0x1f2)]['call'](this,_0x68b7f0),this[_0x17cbec(0x1d9)][_0x17cbec(0x274)]==='Sprite_Actor'&&this[_0x17cbec(0x235)](_0x68b7f0);},VisuMZ[_0x19c152(0x32d)]['Sprite_Actor_updateShadow']=Sprite_Actor[_0x19c152(0x2a5)][_0x19c152(0x263)],Sprite_Actor[_0x19c152(0x2a5)][_0x19c152(0x263)]=function(){const _0x1a35ba=_0x19c152;this[_0x1a35ba(0x276)](),VisuMZ[_0x1a35ba(0x32d)][_0x1a35ba(0x2fd)][_0x1a35ba(0x24d)](this),this[_0x1a35ba(0x202)]&&this[_0x1a35ba(0x202)][_0x1a35ba(0x22d)]()&&(this[_0x1a35ba(0x2e8)][_0x1a35ba(0x25f)]=![]);},Sprite_Actor[_0x19c152(0x2a5)][_0x19c152(0x276)]=function(){const _0x49b2d2=_0x19c152;if(this[_0x49b2d2(0x1d9)]!==Sprite_Actor)return;let _0x4ccfbb=!![];if(this[_0x49b2d2(0x202)]&&this[_0x49b2d2(0x202)][_0x49b2d2(0x22d)]())_0x4ccfbb=![];this[_0x49b2d2(0x2b5)][_0x49b2d2(0x25f)]=_0x4ccfbb,this[_0x49b2d2(0x32c)]['visible']=_0x4ccfbb,this[_0x49b2d2(0x2c5)]['visible']=_0x4ccfbb;},VisuMZ[_0x19c152(0x32d)]['Sprite_Actor_updateFrame']=Sprite_Actor[_0x19c152(0x2a5)][_0x19c152(0x272)],Sprite_Actor['prototype'][_0x19c152(0x272)]=function(){const _0xc97018=_0x19c152;this['_battler']&&this[_0xc97018(0x202)][_0xc97018(0x22d)]()?this[_0xc97018(0x239)]():VisuMZ[_0xc97018(0x32d)][_0xc97018(0x247)][_0xc97018(0x24d)](this);},Sprite_Actor['prototype'][_0x19c152(0x239)]=function(){const _0x109d37=_0x19c152,_0x39828e=this['_mainSprite']['bitmap'];if(_0x39828e){const _0x30a81c=_0x39828e[_0x109d37(0x2eb)],_0x70ec61=_0x39828e[_0x109d37(0x310)];this[_0x109d37(0x2b5)][_0x109d37(0x232)](0x0,0x0,_0x30a81c,_0x70ec61),this[_0x109d37(0x232)](0x0,0x0,_0x30a81c,_0x70ec61);}},VisuMZ['DragonbonesUnion'][_0x19c152(0x1e5)]=Sprite_Enemy['prototype'][_0x19c152(0x29a)],Sprite_Enemy[_0x19c152(0x2a5)][_0x19c152(0x29a)]=function(){const _0x554cd9=_0x19c152;VisuMZ[_0x554cd9(0x32d)]['Sprite_Enemy_initMembers'][_0x554cd9(0x24d)](this),this[_0x554cd9(0x28f)]();},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x1db)]=Sprite_Enemy[_0x19c152(0x2a5)][_0x19c152(0x1d6)],Sprite_Enemy[_0x19c152(0x2a5)][_0x19c152(0x1d6)]=function(_0x4a1097){const _0x561451=_0x19c152;this[_0x561451(0x317)](),VisuMZ[_0x561451(0x32d)]['Sprite_Enemy_setBattler'][_0x561451(0x24d)](this,_0x4a1097);if(_0x4a1097[_0x561451(0x2df)]())this[_0x561451(0x29c)]=0x0;},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x31a)]=Sprite_Enemy[_0x19c152(0x2a5)][_0x19c152(0x20f)],Sprite_Enemy[_0x19c152(0x2a5)]['updateBitmap']=function(){const _0x13c246=_0x19c152,_0x2830a0=this[_0x13c246(0x202)];_0x2830a0['hasDragonbonesBattler']()?(Sprite_Battler[_0x13c246(0x2a5)][_0x13c246(0x20f)]['call'](this),this['_dragonbonesName']!==_0x2830a0[_0x13c246(0x290)]()[_0x13c246(0x32f)]&&this['setupDragonbones'](),this[_0x13c246(0x304)](),this['setHue'](this[_0x13c246(0x240)][_0x13c246(0x211)]())):(VisuMZ['DragonbonesUnion'][_0x13c246(0x31a)][_0x13c246(0x24d)](this),this['removeChild'](this['_dragonbones']));},VisuMZ[_0x19c152(0x32d)]['Sprite_Enemy_refreshMotion']=Sprite_Enemy[_0x19c152(0x2a5)]['refreshMotion'],Sprite_Enemy[_0x19c152(0x2a5)]['refreshMotion']=function(){const _0x287ad4=_0x19c152;VisuMZ[_0x287ad4(0x32d)]['Sprite_Enemy_refreshMotion']['call'](this);if(!VisuMZ[_0x287ad4(0x32d)][_0x287ad4(0x303)][_0x287ad4(0x2d9)])return;const _0x59421b=this[_0x287ad4(0x202)];_0x59421b&&_0x59421b[_0x287ad4(0x22d)]()&&this['refreshMotionDragonbones']();},Sprite_Enemy[_0x19c152(0x2a5)][_0x19c152(0x2e0)]=function(){const _0x7bca46=_0x19c152,_0x260ebc=this[_0x7bca46(0x202)];if(_0x260ebc){const _0x1d5778=_0x260ebc['stateMotionIndex']();if(_0x260ebc[_0x7bca46(0x27e)]()||_0x260ebc['isActing']())this['playDragonbonesMotion'](_0x7bca46(0x2f7));else{if(_0x1d5778===0x3)this[_0x7bca46(0x235)]('dead');else{if(_0x1d5778===0x2)this['playDragonbonesMotion'](_0x7bca46(0x2fc));else{if(_0x260ebc[_0x7bca46(0x257)]())this[_0x7bca46(0x235)]('chant');else{if(_0x260ebc[_0x7bca46(0x268)]()||_0x260ebc[_0x7bca46(0x215)]())this[_0x7bca46(0x235)](_0x7bca46(0x2db));else{if(_0x1d5778===0x1)this[_0x7bca46(0x235)](_0x7bca46(0x217));else{if(_0x260ebc[_0x7bca46(0x29d)]())this[_0x7bca46(0x235)](_0x7bca46(0x33f));else _0x260ebc[_0x7bca46(0x238)]()?this[_0x7bca46(0x235)](_0x7bca46(0x2f7)):this[_0x7bca46(0x235)](_0x7bca46(0x2f7));}}}}}}}},Spriteset_Battle[_0x19c152(0x2a5)][_0x19c152(0x317)]=function(){const _0x4b2afd=_0x19c152;for(const _0x21a1ac of this[_0x4b2afd(0x1e9)]()){if(!_0x21a1ac)continue;_0x21a1ac['disposeDragonbones']();}},PluginManager[_0x19c152(0x337)](pluginData[_0x19c152(0x274)],_0x19c152(0x1da),_0x3c497f=>{const _0x603db0=_0x19c152;if(!$gameScreen)return;VisuMZ[_0x603db0(0x318)](_0x3c497f,_0x3c497f),$gameScreen['createDefaultPicture'](_0x3c497f[_0x603db0(0x1fe)]);const _0x599a3a=$gameScreen[_0x603db0(0x306)](_0x3c497f[_0x603db0(0x1fe)]),_0x13c023=_0x599a3a[_0x603db0(0x290)]();_0x13c023[_0x603db0(0x25a)]=_0x3c497f[_0x603db0(0x1d5)],_0x13c023[_0x603db0(0x1f6)]=_0x3c497f['Animation'],_0x13c023[_0x603db0(0x2f6)]=_0x3c497f['OffsetX'],_0x13c023[_0x603db0(0x323)]=_0x3c497f['OffsetY'],_0x13c023[_0x603db0(0x24e)]=_0x3c497f[_0x603db0(0x302)],_0x13c023[_0x603db0(0x273)]=_0x3c497f['ScaleY'],_0x13c023[_0x603db0(0x258)]=_0x3c497f[_0x603db0(0x1e4)];}),PluginManager[_0x19c152(0x337)](pluginData[_0x19c152(0x274)],_0x19c152(0x2c8),_0xa762fc=>{const _0x4c2026=_0x19c152;if(!$gameScreen)return;VisuMZ[_0x4c2026(0x318)](_0xa762fc,_0xa762fc),$gameScreen['createDefaultPicture'](_0xa762fc[_0x4c2026(0x1fe)]);const _0x215351=$gameScreen[_0x4c2026(0x306)](_0xa762fc[_0x4c2026(0x1fe)]),_0x278d7a=_0x215351['dragonbonesData'](),_0x4660cc=_0xa762fc['IdleFinish']||![];_0x278d7a[_0x4c2026(0x1f6)]=_0xa762fc[_0x4c2026(0x1f9)],_0x278d7a[_0x4c2026(0x2a6)]=_0x4660cc;}),PluginManager[_0x19c152(0x337)](pluginData[_0x19c152(0x274)],'Picture_DragonbonesOffset',_0x100fcb=>{const _0x5158a8=_0x19c152;if(!$gameScreen)return;VisuMZ[_0x5158a8(0x318)](_0x100fcb,_0x100fcb),$gameScreen['createDefaultPicture'](_0x100fcb['PictureID']);const _0x35ff7f=$gameScreen[_0x5158a8(0x306)](_0x100fcb[_0x5158a8(0x1fe)]),_0x19e6b3=_0x35ff7f[_0x5158a8(0x290)]();_0x19e6b3[_0x5158a8(0x2f6)]=_0x100fcb[_0x5158a8(0x2a3)],_0x19e6b3[_0x5158a8(0x323)]=_0x100fcb[_0x5158a8(0x252)];}),PluginManager[_0x19c152(0x337)](pluginData[_0x19c152(0x274)],_0x19c152(0x251),_0x5c9982=>{const _0x4447b6=_0x19c152;if(!$gameScreen)return;VisuMZ['ConvertParams'](_0x5c9982,_0x5c9982),$gameScreen[_0x4447b6(0x228)](_0x5c9982['PictureID']);const _0x349c31=$gameScreen['picture'](_0x5c9982[_0x4447b6(0x1fe)]),_0x7ead59=_0x349c31[_0x4447b6(0x290)]();_0x7ead59[_0x4447b6(0x24e)]=_0x5c9982['ScaleX'],_0x7ead59[_0x4447b6(0x273)]=_0x5c9982[_0x4447b6(0x1fd)];}),PluginManager[_0x19c152(0x337)](pluginData['name'],_0x19c152(0x29b),_0xbcf712=>{const _0x25ce9d=_0x19c152;if(!$gameScreen)return;VisuMZ[_0x25ce9d(0x318)](_0xbcf712,_0xbcf712),$gameScreen[_0x25ce9d(0x228)](_0xbcf712[_0x25ce9d(0x1fe)]);const _0x5f3757=$gameScreen[_0x25ce9d(0x306)](_0xbcf712['PictureID']),_0x3d5dfa=_0x5f3757[_0x25ce9d(0x290)]();_0x3d5dfa[_0x25ce9d(0x258)]=_0xbcf712['TimeScale'];}),Game_Screen['prototype'][_0x19c152(0x228)]=function(_0x216c55){const _0x23e10e=_0x19c152;if(this[_0x23e10e(0x306)](_0x216c55))return;this[_0x23e10e(0x2ce)](_0x216c55,'',0x0,Math['round'](Graphics['width']/0x2),Math[_0x23e10e(0x2c3)](Graphics[_0x23e10e(0x310)]/0x2),0x64,0x64,0xff,0x0);},VisuMZ[_0x19c152(0x32d)]['Game_Screen_erasePicture']=Game_Screen['prototype'][_0x19c152(0x31d)],Game_Screen[_0x19c152(0x2a5)]['erasePicture']=function(_0x26f613){const _0x347328=_0x19c152;this[_0x347328(0x2a9)](_0x26f613),VisuMZ[_0x347328(0x32d)][_0x347328(0x213)]['call'](this,_0x26f613);},Game_Screen[_0x19c152(0x2a5)]['erasePictureDragonbonesUnion']=function(_0x415c2a){const _0x2b4e11=_0x19c152,_0x68b759=this[_0x2b4e11(0x338)](_0x415c2a),_0x5d5838=this[_0x2b4e11(0x29f)][_0x68b759];if(!_0x5d5838)return;_0x5d5838['initDragonbonesData'](),_0x5d5838[_0x2b4e11(0x317)]();},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x254)]=Game_Picture[_0x19c152(0x2a5)][_0x19c152(0x212)],Game_Picture[_0x19c152(0x2a5)][_0x19c152(0x212)]=function(){const _0x3888ec=_0x19c152;VisuMZ[_0x3888ec(0x32d)][_0x3888ec(0x254)][_0x3888ec(0x24d)](this),this[_0x3888ec(0x293)]();},Game_Picture['prototype'][_0x19c152(0x293)]=function(){const _0x41f5b7=_0x19c152;this[_0x41f5b7(0x2d8)]={'filename':'','animation':DragonbonesManager[_0x41f5b7(0x224)],'scaleX':0x1,'scaleY':0x1,'offsetX':0x0,'offsetY':0x0,'timeScale':0x1,'revertToIdle':![]};},Game_Picture[_0x19c152(0x2a5)][_0x19c152(0x290)]=function(){const _0x1c6c40=_0x19c152;if(this[_0x1c6c40(0x2d8)]!==undefined)return this['_dragonbonesData'];return this[_0x1c6c40(0x293)](),this['_dragonbonesData'];},Game_Picture['prototype'][_0x19c152(0x2e3)]=function(){const _0x20a164=_0x19c152;return this[_0x20a164(0x290)]()[_0x20a164(0x25a)]!=='';},Game_Picture['prototype'][_0x19c152(0x317)]=function(){const _0x2c691e=_0x19c152;if(!SceneManager[_0x2c691e(0x230)])return;if(!SceneManager[_0x2c691e(0x230)]['_spriteset'])return;const _0x4b9e45=SceneManager[_0x2c691e(0x230)][_0x2c691e(0x1e3)][_0x2c691e(0x27a)](this);if(_0x4b9e45)_0x4b9e45['disposeDragonbones']();},Spriteset_Base['prototype'][_0x19c152(0x27a)]=function(_0x17461f){const _0x1cfb41=_0x19c152;return this[_0x1cfb41(0x313)][_0x1cfb41(0x33a)][_0x1cfb41(0x1d4)](_0x59637e=>_0x59637e&&_0x59637e[_0x1cfb41(0x306)]()===_0x17461f);},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x222)]=Sprite_Picture[_0x19c152(0x2a5)][_0x19c152(0x212)],Sprite_Picture[_0x19c152(0x2a5)][_0x19c152(0x212)]=function(_0x42df4f){const _0x5d74d6=_0x19c152;this[_0x5d74d6(0x293)](),VisuMZ['DragonbonesUnion'][_0x5d74d6(0x222)][_0x5d74d6(0x24d)](this,_0x42df4f);},Sprite_Picture[_0x19c152(0x2a5)]['initDragonbonesData']=function(_0x437c4a){const _0x2e66dd=_0x19c152;this[_0x2e66dd(0x2ca)]=null,this[_0x2e66dd(0x340)]='',this[_0x2e66dd(0x1dd)]='';},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x2af)]=Sprite_Picture['prototype'][_0x19c152(0x2aa)],Sprite_Picture[_0x19c152(0x2a5)]['update']=function(){const _0xc8e1dd=_0x19c152;VisuMZ[_0xc8e1dd(0x32d)][_0xc8e1dd(0x2af)]['call'](this),this[_0xc8e1dd(0x304)]();},Sprite_Picture[_0x19c152(0x2a5)]['disposeDragonbones']=function(){const _0x36acb8=_0x19c152;this[_0x36acb8(0x2ca)]&&(this['removeChild'](this[_0x36acb8(0x2ca)]),this[_0x36acb8(0x2ca)][_0x36acb8(0x243)](),this[_0x36acb8(0x2ca)]=null,this[_0x36acb8(0x340)]='',this[_0x36acb8(0x1dd)]='');},Sprite_Picture[_0x19c152(0x2a5)][_0x19c152(0x304)]=function(){const _0x2206c1=_0x19c152,_0x160a1e=this[_0x2206c1(0x306)]();if(!_0x160a1e)return this[_0x2206c1(0x317)]();if(!_0x160a1e[_0x2206c1(0x2e3)]())return this[_0x2206c1(0x317)]();this[_0x2206c1(0x331)]();if(!this['_dragonbones'])return;this[_0x2206c1(0x20d)](),this['updateDragonbonesProperties'](),this[_0x2206c1(0x1eb)]();},Sprite_Picture[_0x19c152(0x2a5)]['updateDragonbonesArmature']=function(){const _0x13de90=_0x19c152,_0x2bb980=this[_0x13de90(0x306)]()['dragonbonesData']();if(this[_0x13de90(0x340)]===_0x2bb980[_0x13de90(0x25a)])return;this[_0x13de90(0x317)](),this['_dragonbonesFilename']=_0x2bb980[_0x13de90(0x25a)],DragonbonesManager[_0x13de90(0x296)](_0x2bb980['filename'],this['onLoadDragonbones'][_0x13de90(0x2da)](this));},Sprite_Picture[_0x19c152(0x2a5)]['onLoadDragonbones']=function(){const _0x149a35=_0x19c152,_0x352dfc=this[_0x149a35(0x306)]()[_0x149a35(0x290)]();this[_0x149a35(0x2ca)]=DragonbonesManager[_0x149a35(0x326)](_0x352dfc[_0x149a35(0x25a)]),this[_0x149a35(0x1fb)](this[_0x149a35(0x2ca)],0x0),this[_0x149a35(0x20d)]();},Sprite_Picture[_0x19c152(0x2a5)][_0x19c152(0x20d)]=function(){const _0x22aa69=_0x19c152;if(!this[_0x22aa69(0x2ca)])return;const _0x4a7b24=this[_0x22aa69(0x306)]()[_0x22aa69(0x290)]();this[_0x22aa69(0x1dd)]!==_0x4a7b24[_0x22aa69(0x1f6)]&&(this[_0x22aa69(0x1dd)]=_0x4a7b24['animation'],this[_0x22aa69(0x25e)]());},Sprite_Picture['prototype'][_0x19c152(0x25e)]=function(){const _0xc63ddf=_0x19c152;if(!this[_0xc63ddf(0x2ca)])return;const _0x4f7438=this[_0xc63ddf(0x2ca)]['animation'],_0x435c20=this[_0xc63ddf(0x1dd)][_0xc63ddf(0x249)]()[_0xc63ddf(0x2f0)]();_0x4f7438[_0xc63ddf(0x1ef)][_0x435c20]&&_0x4f7438[_0xc63ddf(0x30e)](_0x435c20);},Sprite_Picture['prototype']['updateDragonbonesProperties']=function(){const _0x432a4c=_0x19c152;if(!this['_dragonbones'])return;const _0x166a63=this[_0x432a4c(0x306)]()[_0x432a4c(0x290)]();this['_dragonbones']['x']=_0x166a63[_0x432a4c(0x2f6)],this[_0x432a4c(0x2ca)]['y']=_0x166a63['offsetY'],this[_0x432a4c(0x2ca)][_0x432a4c(0x20a)]['x']=_0x166a63[_0x432a4c(0x24e)],this[_0x432a4c(0x2ca)]['scale']['y']=_0x166a63[_0x432a4c(0x273)],this[_0x432a4c(0x2ca)][_0x432a4c(0x1f6)]['isPlaying']===![]&&_0x166a63[_0x432a4c(0x2a6)]&&(_0x166a63[_0x432a4c(0x1f6)]=_0x432a4c(0x2b9));},Sprite_Picture[_0x19c152(0x2a5)][_0x19c152(0x1eb)]=function(){const _0x51e0a3=_0x19c152;if(!this['_dragonbones'])return;const _0x5860ab=this[_0x51e0a3(0x306)]()['dragonbonesData']();let _0x12431b=_0x5860ab['timeScale'];this['_dragonbones'][_0x51e0a3(0x1f6)]['timeScale']=_0x12431b;},PluginManager[_0x19c152(0x337)](pluginData[_0x19c152(0x274)],_0x19c152(0x2d7),_0x7740e3=>{const _0x32f333=_0x19c152;if(!$gameMap)return;VisuMZ[_0x32f333(0x318)](_0x7740e3,_0x7740e3);const _0x4fe4c4=$gameActors['actor'](_0x7740e3[_0x32f333(0x2fb)]);if(!_0x4fe4c4)return;const _0x2917a8=JsonEx[_0x32f333(0x2f4)](_0x4fe4c4[_0x32f333(0x27f)]);_0x4fe4c4[_0x32f333(0x27f)]={'filename':_0x7740e3[_0x32f333(0x1d5)],'animation':'','scaleX':_0x7740e3[_0x32f333(0x302)],'scaleY':_0x7740e3[_0x32f333(0x1fd)],'offsetX':_0x7740e3[_0x32f333(0x2a3)],'offsetY':_0x7740e3[_0x32f333(0x252)],'timeScale':_0x7740e3[_0x32f333(0x1e4)],'walkRate':_0x7740e3['WalkRate']??0x1,'dashRate':_0x7740e3[_0x32f333(0x2f3)]??0x1,'width':_0x7740e3[_0x32f333(0x210)],'height':_0x7740e3[_0x32f333(0x2d3)],'flipLeft':_0x7740e3['FlipLeft'],'flipRight':_0x7740e3[_0x32f333(0x2ac)],'animationNames':{'idle':_0x7740e3[_0x32f333(0x2dc)],'walk':_0x7740e3[_0x32f333(0x2ae)],'dash':_0x7740e3[_0x32f333(0x209)],'jump':_0x7740e3[_0x32f333(0x319)],'ladderidle':_0x7740e3[_0x32f333(0x21f)],'ladderclimb':_0x7740e3[_0x32f333(0x21d)],'ropeidle':_0x7740e3[_0x32f333(0x225)],'ropeclimb':_0x7740e3[_0x32f333(0x2e6)]}},$gamePlayer[_0x32f333(0x30f)]();}),PluginManager[_0x19c152(0x337)](pluginData[_0x19c152(0x274)],_0x19c152(0x316),_0x163e0a=>{const _0x19f1c6=_0x19c152;if(!$gameMap)return;if(SceneManager[_0x19f1c6(0x230)]['constructor']!==Scene_Map)return;VisuMZ['ConvertParams'](_0x163e0a,_0x163e0a);const _0x730883=$gameActors['actor'](_0x163e0a['ActorID']),_0x54bf7a=_0x730883[_0x19f1c6(0x299)](),_0x4acd36=_0x54bf7a===0x0?$gamePlayer:$gamePlayer['followers']()[_0x19f1c6(0x325)](_0x54bf7a-0x1);if(!_0x4acd36)return;_0x4acd36[_0x19f1c6(0x20e)]=_0x163e0a[_0x19f1c6(0x1f9)];}),PluginManager[_0x19c152(0x337)](pluginData[_0x19c152(0x274)],_0x19c152(0x341),_0x3692d=>{const _0x5496d5=_0x19c152;if(!$gameMap)return;if(SceneManager['_scene'][_0x5496d5(0x1d9)]!==Scene_Map)return;VisuMZ[_0x5496d5(0x318)](_0x3692d,_0x3692d);const _0x5975a1=$gameActors[_0x5496d5(0x301)](_0x3692d[_0x5496d5(0x2fb)]),_0x3470bd=_0x5975a1[_0x5496d5(0x299)](),_0x3bccd2=_0x3470bd===0x0?$gamePlayer:$gamePlayer[_0x5496d5(0x2e9)]()['follower'](_0x3470bd-0x1);if(!_0x3bccd2)return;_0x3bccd2[_0x5496d5(0x20e)]='';}),PluginManager[_0x19c152(0x337)](pluginData[_0x19c152(0x274)],'MapSprite_EventAnimationPlay',_0x7a3640=>{const _0x199fab=_0x19c152;if(!$gameMap)return;if(SceneManager[_0x199fab(0x230)]['constructor']!==Scene_Map)return;VisuMZ[_0x199fab(0x318)](_0x7a3640,_0x7a3640);const _0xb859eb=$gameTemp[_0x199fab(0x33e)](),_0x86a0c7=$gameMap['event'](_0x7a3640[_0x199fab(0x24c)]||_0xb859eb[_0x199fab(0x2d1)]());if(!_0x86a0c7)return;_0x86a0c7[_0x199fab(0x20e)]=_0x7a3640[_0x199fab(0x1f9)];}),PluginManager[_0x19c152(0x337)](pluginData['name'],_0x19c152(0x33d),_0x53a704=>{const _0x25bba6=_0x19c152;if(!$gameMap)return;if(SceneManager['_scene'][_0x25bba6(0x1d9)]!==Scene_Map)return;VisuMZ['ConvertParams'](_0x53a704,_0x53a704);const _0xc633ec=$gameTemp[_0x25bba6(0x33e)](),_0x500fa4=$gameMap['event'](_0x53a704[_0x25bba6(0x24c)]||_0xc633ec[_0x25bba6(0x2d1)]());if(!_0x500fa4)return;_0x500fa4[_0x25bba6(0x20e)]='';}),PluginManager[_0x19c152(0x337)](pluginData[_0x19c152(0x274)],_0x19c152(0x30b),_0x3d5264=>{const _0x25a615=_0x19c152;if(!$gameMap)return;if(SceneManager[_0x25a615(0x230)][_0x25a615(0x1d9)]!==Scene_Map)return;VisuMZ[_0x25a615(0x318)](_0x3d5264,_0x3d5264);const _0x45f912=$gamePlayer[_0x25a615(0x2e9)]()[_0x25a615(0x325)](_0x3d5264[_0x25a615(0x330)]);if(!_0x45f912)return;_0x45f912[_0x25a615(0x20e)]=_0x3d5264[_0x25a615(0x1f9)];}),PluginManager[_0x19c152(0x337)](pluginData[_0x19c152(0x274)],_0x19c152(0x291),_0x1288e2=>{const _0x59a902=_0x19c152;if(!$gameMap)return;if(SceneManager[_0x59a902(0x230)][_0x59a902(0x1d9)]!==Scene_Map)return;VisuMZ[_0x59a902(0x318)](_0x1288e2,_0x1288e2);const _0x2e8bef=$gamePlayer[_0x59a902(0x2e9)]()[_0x59a902(0x325)](_0x1288e2[_0x59a902(0x330)]);if(!_0x2e8bef)return;_0x2e8bef[_0x59a902(0x20e)]='';}),PluginManager[_0x19c152(0x337)](pluginData['name'],'MapSprite_PlayerAnimationPlay',_0xb36520=>{const _0x54a583=_0x19c152;if(!$gameMap)return;if(SceneManager[_0x54a583(0x230)][_0x54a583(0x1d9)]!==Scene_Map)return;VisuMZ[_0x54a583(0x318)](_0xb36520,_0xb36520),$gamePlayer[_0x54a583(0x20e)]=_0xb36520[_0x54a583(0x1f9)];}),PluginManager['registerCommand'](pluginData[_0x19c152(0x274)],'MapSprite_PlayerAnimationStop',_0x1210a9=>{const _0xbddcaf=_0x19c152;if(!$gameMap)return;if(SceneManager[_0xbddcaf(0x230)]['constructor']!==Scene_Map)return;$gamePlayer[_0xbddcaf(0x20e)]='';}),Game_Temp[_0x19c152(0x2a5)]['setLastPluginCommandInterpreter']=function(_0x39b687){const _0x37c254=_0x19c152;this[_0x37c254(0x277)]=_0x39b687;},Game_Temp[_0x19c152(0x2a5)][_0x19c152(0x33e)]=function(){const _0x29b61c=_0x19c152;return this[_0x29b61c(0x277)];},Object[_0x19c152(0x2ee)](Game_CharacterBase['prototype'],_0x19c152(0x20e),{'get':function(){const _0xe28736=_0x19c152;return this['dragonbonesSpriteData']()[_0xe28736(0x1f6)];},'set':function(_0x2ab748){const _0x3d43e5=_0x19c152;this[_0x3d43e5(0x298)]()[_0x3d43e5(0x1f6)]=_0x2ab748;},'configurable':!![]}),Game_CharacterBase['prototype']['initDragonbonesData']=function(){const _0x5b444d=_0x19c152,_0x447fc3=VisuMZ[_0x5b444d(0x32d)]['Settings'][_0x5b444d(0x279)];this[_0x5b444d(0x27f)]={'filename':'','animation':'','scaleX':_0x447fc3[_0x5b444d(0x302)],'scaleY':_0x447fc3['ScaleY'],'offsetX':_0x447fc3[_0x5b444d(0x2a3)],'offsetY':_0x447fc3[_0x5b444d(0x252)],'timeScale':_0x447fc3[_0x5b444d(0x1e4)],'walkRate':0x1,'dashRate':0x1,'width':_0x447fc3[_0x5b444d(0x210)],'height':_0x447fc3[_0x5b444d(0x2d3)],'flipLeft':_0x447fc3[_0x5b444d(0x262)],'flipRight':_0x447fc3[_0x5b444d(0x2ac)],'animationNames':{'idle':_0x447fc3[_0x5b444d(0x2dc)],'walk':_0x447fc3[_0x5b444d(0x2ae)],'dash':_0x447fc3[_0x5b444d(0x209)],'jump':_0x447fc3['Jump'],'ladderidle':_0x447fc3[_0x5b444d(0x21f)],'ladderclimb':_0x447fc3[_0x5b444d(0x21d)],'ropeidle':_0x447fc3['RopeIdle'],'ropeclimb':_0x447fc3['RopeClimb']}},this[_0x5b444d(0x25d)]===undefined&&(this[_0x5b444d(0x25d)]=0x0);},Game_CharacterBase[_0x19c152(0x2a5)]['setupDragonbonesData']=function(){},Game_CharacterBase[_0x19c152(0x2a5)][_0x19c152(0x28b)]=function(_0x569009){const _0x1d8e16=_0x19c152,_0x117596=this[_0x1d8e16(0x298)]();_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE:[ ]*(.*)>/i)&&(_0x117596[_0x1d8e16(0x25a)]=String(RegExp['$1'])['trim']());_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE (?:SKIN|NAME|FILENAME):[ ]*(.*)>/i)&&(_0x117596[_0x1d8e16(0x25a)]=String(RegExp['$1'])['trim']());_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE[ ]SCALE:[ ](.*),[ ](.*)>/i)&&(_0x117596[_0x1d8e16(0x24e)]=Number(RegExp['$1']),_0x117596[_0x1d8e16(0x273)]=Number(RegExp['$2']));_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE[ ](?:SCALEX|SCALE X):[ ](.*)>/i)&&(_0x117596[_0x1d8e16(0x24e)]=Number(RegExp['$1']));_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE[ ](?:SCALEY|SCALE Y):[ ](.*)>/i)&&(_0x117596[_0x1d8e16(0x273)]=Number(RegExp['$1']));_0x569009['match'](/<DRAGONBONES SPRITE[ ]OFFSET:[ ](.*),[ ](.*)>/i)&&(_0x117596['offsetX']=Number(RegExp['$1']),_0x117596[_0x1d8e16(0x323)]=Number(RegExp['$2']));_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE[ ](?:OFFSETX|OFFSET X):[ ](.*)>/i)&&(_0x117596[_0x1d8e16(0x2f6)]=Number(RegExp['$1']));_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE[ ](?:OFFSETY|OFFSET Y):[ ](.*)>/i)&&(_0x117596['offsetY']=Number(RegExp['$1']));_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE[ ]SIZE:[ ](.*),[ ](.*)>/i)&&(_0x117596[_0x1d8e16(0x2eb)]=Number(RegExp['$1']),_0x117596[_0x1d8e16(0x310)]=Number(RegExp['$2']));_0x569009['match'](/<DRAGONBONES SPRITE[ ]WIDTH:[ ](.*)>/i)&&(_0x117596[_0x1d8e16(0x2eb)]=Number(RegExp['$1']));_0x569009['match'](/<DRAGONBONES SPRITE[ ]HEIGHT:[ ](.*)>/i)&&(_0x117596[_0x1d8e16(0x310)]=Number(RegExp['$1']));_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE[ ](?:TIMESCALE|TIME SCALE):[ ](.*)>/i)&&(_0x117596[_0x1d8e16(0x258)]=Number(RegExp['$1']));_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE[ ](?:WALK RATE|WALKING RATE):[ ](.*)>/i)&&(_0x117596[_0x1d8e16(0x32a)]=Number(RegExp['$1']));_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE[ ](?:DASH RATE|DASHING RATE):[ ](.*)>/i)&&(_0x117596[_0x1d8e16(0x2de)]=Number(RegExp['$1']));_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE FLIP LEFT>/i)&&(_0x117596[_0x1d8e16(0x26f)]=!![]);_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE NO FLIP LEFT>/i)&&(_0x117596[_0x1d8e16(0x26f)]=![]);_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE FLIP RIGHT>/i)&&(_0x117596[_0x1d8e16(0x2bf)]=!![]);_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE NO FLIP RIGHT>/i)&&(_0x117596[_0x1d8e16(0x2bf)]=![]);const _0x56afb9=_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE MOTION (.*):[ ](.*)>/gi);if(_0x56afb9)for(const _0x3e9340 of _0x56afb9){_0x3e9340[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE MOTION (.*):[ ](.*)>/i);const _0x29a670=String(RegExp['$1'])[_0x1d8e16(0x249)]()[_0x1d8e16(0x2f0)](),_0x18a623=String(RegExp['$2'])[_0x1d8e16(0x249)]()[_0x1d8e16(0x2f0)]();_0x117596[_0x1d8e16(0x333)][_0x29a670]=_0x18a623;}if(_0x569009[_0x1d8e16(0x23e)](/<DRAGONBONES SPRITE (?:SETTINGS|SETTING)>\s*([\s\S]*)\s*<\/DRAGONBONES SPRITE (?:SETTINGS|SETTING)>/i)){const _0x42b758=String(RegExp['$1']);_0x42b758[_0x1d8e16(0x23e)](/(?:SKIN|NAME|FILENAME):[ ]*(.*)/i)&&(_0x117596['filename']=String(RegExp['$1'])[_0x1d8e16(0x2f0)]());_0x42b758[_0x1d8e16(0x23e)](/SCALE:[ ](.*),[ ](.*)/i)&&(_0x117596[_0x1d8e16(0x24e)]=Number(RegExp['$1']),_0x117596[_0x1d8e16(0x273)]=Number(RegExp['$2']));_0x42b758[_0x1d8e16(0x23e)](/(?:SCALEX|SCALE X):[ ](.*)/i)&&(_0x117596[_0x1d8e16(0x24e)]=Number(RegExp['$1']));_0x42b758[_0x1d8e16(0x23e)](/(?:SCALEY|SCALE Y):[ ](.*)/i)&&(_0x117596['scaleY']=Number(RegExp['$1']));_0x42b758[_0x1d8e16(0x23e)](/OFFSET:[ ](.*),[ ](.*)/i)&&(_0x117596['offsetX']=Number(RegExp['$1']),_0x117596['offsetY']=Number(RegExp['$2']));_0x42b758[_0x1d8e16(0x23e)](/(?:OFFSETX|OFFSET X):[ ](.*)/i)&&(_0x117596[_0x1d8e16(0x2f6)]=Number(RegExp['$1']));_0x42b758[_0x1d8e16(0x23e)](/(?:OFFSETY|OFFSET Y):[ ](.*)/i)&&(_0x117596[_0x1d8e16(0x323)]=Number(RegExp['$1']));_0x42b758['match'](/(?:TIMESCALE|TIME SCALE):[ ](.*)/i)&&(_0x117596[_0x1d8e16(0x258)]=Number(RegExp['$1']));_0x42b758[_0x1d8e16(0x23e)](/(?:WALK RATE|WALKING RATE):[ ](.*)/i)&&(_0x117596['walkRate']=Number(RegExp['$1']));_0x42b758[_0x1d8e16(0x23e)](/(?:DASH RATE|DASHING RATE):[ ](.*)/i)&&(_0x117596[_0x1d8e16(0x2de)]=Number(RegExp['$1']));_0x42b758[_0x1d8e16(0x23e)](/SIZE:[ ](.*),[ ](.*)/i)&&(_0x117596[_0x1d8e16(0x2eb)]=Number(RegExp['$1']),_0x117596[_0x1d8e16(0x310)]=Number(RegExp['$2']));_0x42b758['match'](/WIDTH:[ ](.*)/i)&&(_0x117596[_0x1d8e16(0x2eb)]=Number(RegExp['$1']));_0x42b758[_0x1d8e16(0x23e)](/HEIGHT:[ ](.*)/i)&&(_0x117596[_0x1d8e16(0x310)]=Number(RegExp['$1']));_0x42b758['match'](/NO FLIP LEFT/i)&&(_0x117596['flipLeft']=![]);_0x42b758[_0x1d8e16(0x23e)](/FLIP LEFT/i)&&(_0x117596['flipLeft']=!![]);_0x42b758[_0x1d8e16(0x23e)](/NO FLIP RIGHT/i)&&(_0x117596[_0x1d8e16(0x2bf)]=![]);_0x42b758[_0x1d8e16(0x23e)](/FLIP RIGHT/i)&&(_0x117596[_0x1d8e16(0x2bf)]=!![]);const _0x239ada=_0x569009[_0x1d8e16(0x23e)](/(?:ANI|MOTION) (.*):[ ](.*)/gi);if(_0x239ada)for(const _0x515293 of _0x239ada){_0x515293[_0x1d8e16(0x23e)](/(?:ANI|MOTION) (.*):[ ](.*)/i);const _0x22fb74=String(RegExp['$1'])[_0x1d8e16(0x249)]()['trim'](),_0x40d3de=String(RegExp['$2'])[_0x1d8e16(0x249)]()[_0x1d8e16(0x2f0)]();_0x117596[_0x1d8e16(0x333)][_0x22fb74]=_0x40d3de;}}},Game_CharacterBase['prototype'][_0x19c152(0x298)]=function(){const _0x9a0dac=_0x19c152;if(this[_0x9a0dac(0x27f)]!==undefined)return this[_0x9a0dac(0x27f)];return this[_0x9a0dac(0x293)](),this[_0x9a0dac(0x226)](),this['_dragonbonesSpriteData'];},Game_CharacterBase[_0x19c152(0x2a5)][_0x19c152(0x2e3)]=function(){const _0x3cd171=_0x19c152;return this[_0x3cd171(0x298)]()['filename']!=='';},Game_CharacterBase[_0x19c152(0x2a5)][_0x19c152(0x1ff)]=function(_0x114b27){const _0x3f8e53=_0x19c152,_0x594d3a=this[_0x3f8e53(0x298)]();if(!_0x114b27)return _0x594d3a['animationNames']['idle'];_0x594d3a[_0x3f8e53(0x1f6)]=_0x594d3a[_0x3f8e53(0x1f6)][_0x3f8e53(0x249)]()[_0x3f8e53(0x2f0)]();if(_0x594d3a[_0x3f8e53(0x1f6)]!==''&&_0x114b27[_0x3f8e53(0x1f6)][_0x3f8e53(0x1ef)][_0x594d3a[_0x3f8e53(0x1f6)]])return _0x594d3a[_0x3f8e53(0x1f6)];let _0x9ea24a=[];if(this[_0x3f8e53(0x305)]())_0x9ea24a=_0x9ea24a[_0x3f8e53(0x2f9)](this[_0x3f8e53(0x2dd)](_0x594d3a[_0x3f8e53(0x333)][_0x3f8e53(0x1d2)])),_0x9ea24a=_0x9ea24a['concat'](this[_0x3f8e53(0x2dd)](_0x594d3a[_0x3f8e53(0x333)][_0x3f8e53(0x2f7)]));else{if(this['isOnLadder']()&&!this[_0x3f8e53(0x305)]())Imported['VisuMZ_1_EventsMoveCore']&&this[_0x3f8e53(0x26d)]()?(this[_0x3f8e53(0x25d)]>0x0&&(_0x9ea24a[_0x3f8e53(0x1d3)](_0x594d3a['animationNames']['ropeclimb']),_0x9ea24a[_0x3f8e53(0x1d3)](_0x594d3a[_0x3f8e53(0x333)][_0x3f8e53(0x297)]),_0x9ea24a=_0x9ea24a['concat'](this['addDragonbonesAnimationDirections'](_0x594d3a['animationNames']['walk']))),_0x9ea24a[_0x3f8e53(0x1d3)](_0x594d3a[_0x3f8e53(0x333)][_0x3f8e53(0x2b7)]),_0x9ea24a[_0x3f8e53(0x1d3)](_0x594d3a[_0x3f8e53(0x333)][_0x3f8e53(0x1f0)])):(this[_0x3f8e53(0x25d)]>0x0&&(_0x9ea24a[_0x3f8e53(0x1d3)](_0x594d3a[_0x3f8e53(0x333)][_0x3f8e53(0x297)]),_0x9ea24a=_0x9ea24a[_0x3f8e53(0x2f9)](this['addDragonbonesAnimationDirections'](_0x594d3a[_0x3f8e53(0x333)]['walk']))),_0x9ea24a[_0x3f8e53(0x1d3)](_0x594d3a[_0x3f8e53(0x333)][_0x3f8e53(0x1f0)]));else this[_0x3f8e53(0x25d)]>0x0&&(this[_0x3f8e53(0x2a0)]()&&(_0x9ea24a=_0x9ea24a[_0x3f8e53(0x2f9)](this[_0x3f8e53(0x2dd)](_0x594d3a[_0x3f8e53(0x333)][_0x3f8e53(0x1ee)]))),_0x9ea24a=_0x9ea24a[_0x3f8e53(0x2f9)](this[_0x3f8e53(0x2dd)](_0x594d3a[_0x3f8e53(0x333)][_0x3f8e53(0x2f7)])));}_0x9ea24a=_0x9ea24a[_0x3f8e53(0x2f9)](this[_0x3f8e53(0x2dd)](_0x594d3a[_0x3f8e53(0x333)][_0x3f8e53(0x2b9)]));for(const _0x2a4ed5 of _0x9ea24a){if(_0x114b27[_0x3f8e53(0x1f6)][_0x3f8e53(0x1ef)][_0x2a4ed5])return _0x2a4ed5;}return _0x594d3a[_0x3f8e53(0x333)]['idle'];},Game_CharacterBase[_0x19c152(0x2a5)][_0x19c152(0x2dd)]=function(_0x51cde2){const _0xdf4eab=_0x19c152,_0xaf8f=this[_0xdf4eab(0x298)](),_0x2354e7=this[_0xdf4eab(0x2d4)]();let _0x4a89d7=[];_0x4a89d7[_0xdf4eab(0x1d3)](_0x51cde2+_0x2354e7);if(_0x2354e7===0x1){_0x4a89d7[_0xdf4eab(0x1d3)](_0x51cde2+0x4);if(_0xaf8f[_0xdf4eab(0x26f)])_0x4a89d7[_0xdf4eab(0x1d3)](_0x51cde2+0x6);_0x4a89d7['push'](_0x51cde2+0x2);}if(_0x2354e7===0x3){_0x4a89d7[_0xdf4eab(0x1d3)](_0x51cde2+0x6);if(_0xaf8f[_0xdf4eab(0x2bf)])_0x4a89d7['push'](_0x51cde2+0x4);_0x4a89d7[_0xdf4eab(0x1d3)](_0x51cde2+0x2);}if(_0x2354e7===0x7){_0x4a89d7['push'](_0x51cde2+0x4);if(_0xaf8f[_0xdf4eab(0x26f)])_0x4a89d7['push'](_0x51cde2+0x6);_0x4a89d7['push'](_0x51cde2+0x8);}if(_0x2354e7===0x9){_0x4a89d7[_0xdf4eab(0x1d3)](_0x51cde2+0x6);if(_0xaf8f[_0xdf4eab(0x2bf)])_0x4a89d7[_0xdf4eab(0x1d3)](_0x51cde2+0x4);_0x4a89d7[_0xdf4eab(0x1d3)](_0x51cde2+0x8);}return _0x4a89d7[_0xdf4eab(0x1d3)](_0x51cde2),_0x4a89d7;},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x227)]=Game_CharacterBase[_0x19c152(0x2a5)][_0x19c152(0x2aa)],Game_CharacterBase[_0x19c152(0x2a5)]['update']=function(){const _0x243426=_0x19c152;VisuMZ[_0x243426(0x32d)][_0x243426(0x227)][_0x243426(0x24d)](this),this[_0x243426(0x204)]();},Game_CharacterBase[_0x19c152(0x2a5)][_0x19c152(0x204)]=function(){const _0x33a8d=_0x19c152;if(!this[_0x33a8d(0x2e3)]())return;this[_0x33a8d(0x336)]()?this['_dragonbonesMoveTimer']=VisuMZ[_0x33a8d(0x32d)][_0x33a8d(0x303)][_0x33a8d(0x279)][_0x33a8d(0x32b)]:this[_0x33a8d(0x25d)]--;},VisuMZ['DragonbonesUnion'][_0x19c152(0x2be)]=Game_Player[_0x19c152(0x2a5)][_0x19c152(0x30f)],Game_Player[_0x19c152(0x2a5)][_0x19c152(0x30f)]=function(){const _0x56b165=_0x19c152;VisuMZ[_0x56b165(0x32d)]['Game_Player_refresh']['call'](this),this[_0x56b165(0x226)]();},Game_Player[_0x19c152(0x2a5)][_0x19c152(0x226)]=function(){const _0x2495ee=_0x19c152,_0x52cbf5=$gameParty[_0x2495ee(0x1e1)]();!_0x52cbf5?this[_0x2495ee(0x293)]():this[_0x2495ee(0x27f)]=_0x52cbf5[_0x2495ee(0x298)]();},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x2ba)]=Game_Follower[_0x19c152(0x2a5)][_0x19c152(0x30f)],Game_Follower[_0x19c152(0x2a5)][_0x19c152(0x30f)]=function(){const _0x400792=_0x19c152;VisuMZ['DragonbonesUnion'][_0x400792(0x2ba)]['call'](this),this[_0x400792(0x226)]();},Game_Follower[_0x19c152(0x2a5)]['setupDragonbonesData']=function(){const _0x5f32fe=_0x19c152,_0x532124=this[_0x5f32fe(0x301)]();!_0x532124?this['initDragonbonesData']():this['_dragonbonesSpriteData']=_0x532124[_0x5f32fe(0x298)]();},Game_Actor[_0x19c152(0x2a5)][_0x19c152(0x293)]=function(){const _0x456aca=_0x19c152;Game_BattlerBase[_0x456aca(0x2a5)]['initDragonbonesData'][_0x456aca(0x24d)](this),Game_CharacterBase[_0x456aca(0x2a5)][_0x456aca(0x293)][_0x456aca(0x24d)](this);},Game_Actor[_0x19c152(0x2a5)]['setupDragonbonesData']=function(){const _0xbd8b11=_0x19c152;Game_BattlerBase[_0xbd8b11(0x2a5)][_0xbd8b11(0x226)]['call'](this);const _0x4dc0ac=this[_0xbd8b11(0x301)]()[_0xbd8b11(0x23b)];Game_CharacterBase[_0xbd8b11(0x2a5)]['checkDragonbonesStringTags']['call'](this,_0x4dc0ac);},Game_Actor[_0x19c152(0x2a5)][_0x19c152(0x298)]=function(){const _0xb48119=_0x19c152;if(this[_0xb48119(0x27f)]!==undefined)return this[_0xb48119(0x27f)];return this[_0xb48119(0x293)](),this['setupDragonbonesData'](),this[_0xb48119(0x27f)];},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x294)]=Game_Event[_0x19c152(0x2a5)][_0x19c152(0x24a)],Game_Event[_0x19c152(0x2a5)]['clearPageSettings']=function(){const _0x538fbc=_0x19c152;VisuMZ[_0x538fbc(0x32d)][_0x538fbc(0x294)][_0x538fbc(0x24d)](this),this['initDragonbonesData']();},VisuMZ[_0x19c152(0x32d)][_0x19c152(0x2c0)]=Game_Event[_0x19c152(0x2a5)]['setupPageSettings'],Game_Event['prototype'][_0x19c152(0x28e)]=function(){const _0x585712=_0x19c152;VisuMZ[_0x585712(0x32d)]['Game_Event_setupPageSettings']['call'](this),this[_0x585712(0x293)](),this[_0x585712(0x226)]();},Game_Event[_0x19c152(0x2a5)][_0x19c152(0x226)]=function(){const _0x3c5674=_0x19c152;this[_0x3c5674(0x2b4)](),this['setupDragonbonesDataCommentTags']();},Game_Event[_0x19c152(0x2a5)]['setupDragonbonesDataNotetags']=function(){const _0x1fbea1=_0x19c152;if(!this[_0x1fbea1(0x1e0)]())return;const _0x354a45=this[_0x1fbea1(0x1e0)]()[_0x1fbea1(0x23b)];if(_0x354a45==='')return;this['checkDragonbonesStringTags'](_0x354a45);},Game_Event[_0x19c152(0x2a5)][_0x19c152(0x248)]=function(){const _0x545ae5=_0x19c152;if(!this[_0x545ae5(0x1e0)]())return;if(!this['page']())return;const _0x2cb27f=this[_0x545ae5(0x28c)]();let _0x384b6b='';for(const _0x42c5c8 of _0x2cb27f){if([0x6c,0x198][_0x545ae5(0x231)](_0x42c5c8[_0x545ae5(0x332)])){if(_0x384b6b!=='')_0x384b6b+='\x0a';_0x384b6b+=_0x42c5c8[_0x545ae5(0x26b)][0x0];}}this[_0x545ae5(0x28b)](_0x384b6b);},VisuMZ[_0x19c152(0x32d)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x19c152(0x2a5)]['command357'],Game_Interpreter[_0x19c152(0x2a5)][_0x19c152(0x260)]=function(_0x178d0d){const _0x299a84=_0x19c152;return $gameTemp[_0x299a84(0x2cf)](this),VisuMZ['DragonbonesUnion'][_0x299a84(0x309)][_0x299a84(0x24d)](this,_0x178d0d);},VisuMZ[_0x19c152(0x32d)]['Sprite_Character_initialize']=Sprite_Character[_0x19c152(0x2a5)][_0x19c152(0x212)],Sprite_Character[_0x19c152(0x2a5)][_0x19c152(0x212)]=function(_0x1d6471){const _0x1538d1=_0x19c152;this[_0x1538d1(0x293)](),VisuMZ[_0x1538d1(0x32d)][_0x1538d1(0x264)][_0x1538d1(0x24d)](this,_0x1d6471),this[_0x1538d1(0x2e1)]();},Sprite_Character[_0x19c152(0x2a5)]['initDragonbonesData']=function(){const _0x2bd9dc=_0x19c152;this[_0x2bd9dc(0x2ca)]=null,this[_0x2bd9dc(0x340)]='',this[_0x2bd9dc(0x1dd)]='';},Sprite_Character['prototype']['createBaseDragonbonesSprite']=function(){const _0x5a8abb=_0x19c152;this[_0x5a8abb(0x23f)]=new Sprite(),this['addChild'](this['_baseDragonbonesSprite']);},VisuMZ[_0x19c152(0x32d)]['Sprite_Character_updateBitmap']=Sprite_Character[_0x19c152(0x2a5)][_0x19c152(0x20f)],Sprite_Character[_0x19c152(0x2a5)][_0x19c152(0x20f)]=function(){const _0x4945b5=_0x19c152;VisuMZ['DragonbonesUnion'][_0x4945b5(0x205)]['call'](this),this[_0x4945b5(0x304)]();},Sprite_Character['prototype'][_0x19c152(0x317)]=function(){const _0x160bd5=_0x19c152;this[_0x160bd5(0x2ca)]&&(this['_baseDragonbonesSprite'][_0x160bd5(0x31b)](this[_0x160bd5(0x2ca)]),this['_dragonbones'][_0x160bd5(0x243)](),this[_0x160bd5(0x2ca)]=null,this[_0x160bd5(0x340)]='',this['_dragonbonesAnimation']='');},Sprite_Character[_0x19c152(0x2a5)][_0x19c152(0x304)]=function(){const _0x30f636=_0x19c152;if(!this[_0x30f636(0x33c)])return this[_0x30f636(0x317)]();if(!this['_character'][_0x30f636(0x2e3)]())return this['disposeDragonbones']();this[_0x30f636(0x331)]();if(!this[_0x30f636(0x2ca)])return;this[_0x30f636(0x20d)](),this['updateDragonbonesProperties'](),this[_0x30f636(0x1eb)]();},Sprite_Character['prototype']['updateDragonbonesArmature']=function(){const _0x568fd6=_0x19c152,_0x5dc7cb=this[_0x568fd6(0x33c)]['dragonbonesSpriteData']();if(this[_0x568fd6(0x340)]===_0x5dc7cb[_0x568fd6(0x25a)])return;this[_0x568fd6(0x317)](),this[_0x568fd6(0x340)]=_0x5dc7cb[_0x568fd6(0x25a)],DragonbonesManager[_0x568fd6(0x296)](_0x5dc7cb[_0x568fd6(0x25a)],this[_0x568fd6(0x28d)]['bind'](this));},Sprite_Character[_0x19c152(0x2a5)][_0x19c152(0x28d)]=function(){const _0xee67aa=_0x19c152,_0x1ac0d2=this[_0xee67aa(0x33c)][_0xee67aa(0x298)]();this[_0xee67aa(0x2ca)]=DragonbonesManager[_0xee67aa(0x326)](_0x1ac0d2[_0xee67aa(0x25a)]),this[_0xee67aa(0x20d)](),setTimeout(this[_0xee67aa(0x1e8)][_0xee67aa(0x2da)](this),0x0);},Sprite_Character[_0x19c152(0x2a5)][_0x19c152(0x1e8)]=function(){const _0x9032b6=_0x19c152;if(!this[_0x9032b6(0x2ca)])return;if(!this['_baseDragonbonesSprite'])return;this[_0x9032b6(0x23f)][_0x9032b6(0x1fb)](this[_0x9032b6(0x2ca)],0x0);},Sprite_Character[_0x19c152(0x2a5)]['updateDragonbonesAnimation']=function(){const _0x2c7844=_0x19c152;if(!this[_0x2c7844(0x2ca)])return;const _0x1dbc57=this[_0x2c7844(0x33c)][_0x2c7844(0x298)](),_0x115c63=this['_dragonbones'][_0x2c7844(0x1f6)];_0x115c63['isCompleted']&&(this['_character']['dragonbonesAnimation']='',this['_dragonbonesAnimation']='',_0x115c63[_0x2c7844(0x200)]='');const _0x29c86b=this[_0x2c7844(0x33c)][_0x2c7844(0x1ff)](this[_0x2c7844(0x2ca)]);this[_0x2c7844(0x1dd)]!==_0x29c86b&&(this[_0x2c7844(0x1dd)]=_0x29c86b,this[_0x2c7844(0x25e)]());},Sprite_Character[_0x19c152(0x2a5)][_0x19c152(0x25e)]=function(){const _0x375220=_0x19c152;if(!this[_0x375220(0x2ca)])return;const _0x44bad2=this['_dragonbones'][_0x375220(0x1f6)],_0x16da45=this[_0x375220(0x1dd)][_0x375220(0x249)]()['trim']();if(_0x44bad2['animations'][_0x16da45]){if(_0x44bad2[_0x375220(0x200)]===_0x16da45&&_0x44bad2[_0x375220(0x1ef)][_0x16da45][_0x375220(0x233)]<=0x0)return;_0x44bad2[_0x375220(0x30e)](_0x16da45);}},Sprite_Character['prototype'][_0x19c152(0x21e)]=function(){const _0x128051=_0x19c152;if(!this[_0x128051(0x2ca)])return;const _0x56391d=this[_0x128051(0x33c)][_0x128051(0x298)]();this['_dragonbones']['x']=_0x56391d['offsetX'],this[_0x128051(0x2ca)]['y']=_0x56391d[_0x128051(0x323)],this[_0x128051(0x2ca)][_0x128051(0x20a)]['x']=_0x56391d[_0x128051(0x24e)]*this[_0x128051(0x23d)](),this[_0x128051(0x2ca)]['scale']['y']=_0x56391d[_0x128051(0x273)];},Sprite_Character['prototype'][_0x19c152(0x23d)]=function(){const _0x5014a7=_0x19c152,_0x43616c=this[_0x5014a7(0x33c)][_0x5014a7(0x298)]();this[_0x5014a7(0x2c1)]=this['_dragonbonesFlipDirection']||0x1;if(_0x43616c['flipLeft']&&[0x1,0x4,0x7][_0x5014a7(0x231)](this['_character'][_0x5014a7(0x2d4)]()))this[_0x5014a7(0x2c1)]=-0x1;else{if(_0x43616c['flipRight']&&[0x9,0x6,0x3][_0x5014a7(0x231)](this[_0x5014a7(0x33c)][_0x5014a7(0x2d4)]()))this[_0x5014a7(0x2c1)]=-0x1;else![0x8,0x2]['includes'](this[_0x5014a7(0x33c)]['direction']())&&(this[_0x5014a7(0x2c1)]=0x1);}return this[_0x5014a7(0x2c1)];},Sprite_Character[_0x19c152(0x2a5)]['updateDragonbonesTimeScale']=function(){const _0x40df74=_0x19c152;if(!this[_0x40df74(0x2ca)])return;const _0x3a6c95=this[_0x40df74(0x33c)][_0x40df74(0x298)]();let _0x28416a=_0x3a6c95[_0x40df74(0x258)];this['_character'][_0x40df74(0x336)]()&&(_0x28416a*=this[_0x40df74(0x33c)][_0x40df74(0x2f1)](),this['_character'][_0x40df74(0x2a0)]()?_0x28416a*=_0x3a6c95['dashRate']:_0x28416a*=_0x3a6c95[_0x40df74(0x32a)]),this[_0x40df74(0x2ca)][_0x40df74(0x1f6)][_0x40df74(0x258)]=_0x28416a;},VisuMZ[_0x19c152(0x32d)]['Sprite_Character_updateCharacterFrame']=Sprite_Character['prototype'][_0x19c152(0x2ab)],Sprite_Character[_0x19c152(0x2a5)][_0x19c152(0x2ab)]=function(){const _0x5ca076=_0x19c152;this[_0x5ca076(0x33c)]&&this[_0x5ca076(0x33c)][_0x5ca076(0x2e3)]()?this[_0x5ca076(0x308)]():VisuMZ[_0x5ca076(0x32d)][_0x5ca076(0x21b)]['call'](this);},Sprite_Character[_0x19c152(0x2a5)][_0x19c152(0x308)]=function(){const _0x4e80f1=_0x19c152,_0x74f3=this[_0x4e80f1(0x33c)]['dragonbonesSpriteData'](),_0x4226bb=_0x74f3[_0x4e80f1(0x310)];this['setFrame'](0x0,0x0,0x0,_0x4226bb);};