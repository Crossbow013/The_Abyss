//=============================================================================
// VisuStella MZ - Visual State Effects
// VisuMZ_3_VisualStateEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VisualStateEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualStateEffects = VisuMZ.VisualStateEffects || {};
VisuMZ.VisualStateEffects.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.16] [VisualStateEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_State_Effects_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * States, buffs, and debuffs are amongst one of the most important aspects of
 * the battle system. Therefore, relaying proper information to the player is
 * extremely important. RPG Maker MZ does relay information to the player about
 * the various states and effects, but it is far from perfect. This plugin
 * allows you to add more detail and visual effects regarding states to relay
 * proper data.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Choose to display State Overlays and State Icons over actors and enemies.
 * * Create text popups for Buffs, Debuffs, and States along with full control
 *   over their color, flash, and flash duration.
 * * Play animations upon receiving or removing Buffs, Debuffs, and States.
 * * States can have repeating animations.
 * * States can change the tone of a sprite.
 * * States can freeze a sprite in place.
 * * States can adjust the opacity of a battler to make them semi-transparent.
 * * Hovering effects that can be visibly applied to trait objects.
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
 * - VisuMZ_0_CoreEngine
 * - VisuMZ_1_BattleCore
 * - VisuMZ_1_SkillsStatesCore
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * State Motion Index and State Overlay Index
 * 
 * - The original RPG Maker MZ functions have been overwritten because they
 * only display the motions and overlays of the highest priority state even if
 * it does not have any motions while lower priority states with motions and
 * overlays will be hidden.
 * 
 * - The changed code will now take the highest priority state motion index (or
 * a custom one defined by a notetag) and the highest priority state overlay
 * index to show those instead.
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
 * === State-Related Notetags ===
 * 
 * The following notetags are made for states.
 * 
 * ---
 * 
 * <Hide State Popup>
 *
 * - Used for: State Notetags
 * - Don't display any of the popups for this state.
 * 
 * ---
 * 
 * <State Popup>
 *  text color: c
 *  flash color: r, g, b, a
 *  flash duration: d
 * </State Popup>
 *
 * - Used for: State Notetags
 * - Changes the settings of the state popup from the defaults declared by the
 *   Plugin Parameters. Each of the settings are optional. If the lines do not
 *   appear in the notetag, then the default values from the Plugin Parameters
 *   will be used instead.
 * - Replace 'c' #rrggbb for custom colors or insert a regular number for text
 *   colors from the Window Skin.
 * - Replace 'r', 'g', 'b', 'a' with number values ranging from 0 to 255 for
 *   'red', 'green', 'blue', and 'alpha' to determine the flash color.
 * - Replace 'd' with a number representing the amount of frames you want the
 *   flash duration to last for.
 * 
 * Examples:
 * 
 * <State Popup>
 *  text color: 3
 * </State Popup>
 * 
 * <State Popup>
 *  text color: #abcdef
 *  flash color: 255, 255, 0, 160
 * </State Popup>
 * 
 * <State Popup>
 *  flash color: 0, 255, 255, 160
 *  flash duration: 90
 * </State Popup>
 * 
 * <State Popup>
 *  flash duration: 777
 * </State Popup>
 * 
 * ---
 * 
 * <Add Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play when the state is applied.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play when the state is added.
 * - This does not work for states without icons nor the death state.
 * 
 * ---
 * 
 * <Erase Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play when the state is removed.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play when the state is removed.
 * - This does not work for states without icons nor the death state.
 * 
 * ---
 * 
 * <Repeat Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play in intervals when the battler is
 *   affected by it.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play on repeat while the battler is affected by the state.
 * - The battler will cycle through the various repeating state animations
 *   available through states.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * - WARNING: Abusing Repeat Animations can jeopardize game performance.
 * 
 * ---
 * 
 * <Repeat Animation Cycle: x>
 *
 * - Used for: State Notetags
 * - Determines the cycle/duration of this specific state's repeating animation
 *   if you do not wish to use the plugin parameter's default setting.
 * - Replace 'x' with the number of frames you wish to play this animation for
 *   before moving onto the next animation.
 * - WARNING: Lower numbers can jeopardize game performance.
 * 
 * ---
 * 
 * <Custom Overlay: filename>
 * 
 * - Used for: State Notetags
 * - For those who don't want to use the img/system/ folder's "States" image
 *   file and want something custom, this notetag will do exactly that.
 * - Custom state overlays will follow similar dimensions to the original
 *   States image:
 *   - Pixel Width: 768
 *   - Pixel Height: 96
 *   - Total Frames: 8
 *   - If you want to use different sizes, we recommend you look into Effekseer
 *     custom animations with the <Repeat Animation: x> notetag instead.
 * - Replace 'filename' with the filename of the image you want to use as
 *   a state overlay found in the game project's img/system/ folder.
 *   - Do not include the file extension.
 * 
 * ---
 * 
 * <State Motion: Walk>
 * <State Motion: Wait>
 * <State Motion: Chant>
 * <State Motion: Guard>
 * <State Motion: Damage>
 * <State Motion: Evade>
 * <State Motion: Thrust>
 * <State Motion: Swing>
 * <State Motion: Missile>
 * <State Motion: Skill>
 * <State Motion: Spell>
 * <State Motion: Item>
 * <State Motion: Escape>
 * <State Motion: Victory>
 * <State Motion: Dying>
 * <State Motion: Abnormal>
 * <State Motion: Sleep>
 * <State Motion: Dead>
 *
 * - Used for: State Notetags
 * - Lets you determine what kind of state motion to play when the battler is
 *   affected by the state.
 * - The battler will only play the highest priority state motion.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <State Motion Lock>
 * 
 * - Used for: State Notetags
 * - If an actor or animated sideview enemy is affected by a state that has
 *   this notetag, their animation will be locked in place while this state
 *   is in effect.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <State Tone: red, green, blue, gray>
 *
 * - Used for: State Notetags
 * - Tints the battler with a tone determined by the state.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * - If a battler has multiple states with tones, then the state with the
 *   highest priority value is applied to the battler.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <Visual Opacity: x>
 * <Visual Opacity: x%>
 * 
 * - Used for: State Notetags
 * - When a battler is affected by this state, change the opacity of their main
 *   battler sprite to 'x' or 'x%'.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * - This does NOT affect UI elements like the HP Gauges, State Icons, or their
 *   positioning markers such as the battler's shadow as this is only to used
 *   to represent a change in their opacity through a state.
 * - To change the whole battler's opacity including everything from the UI
 *   elements, State Icons, etc., use the Action Sequence Plugin Command to
 *   visually alter the whole opacity level instead.
 * - The Visual Opacity level will compound with the opacity level adjusted by
 *   the Action Sequence Plugin Command. Keep this in mind when using both of
 *   them together.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <Visual Rainbow: +x>
 * <Visual Rainbow: -x>
 * 
 * - Used for: State Notetags
 * - When a battler is affected by this state, the battler has a colorful
 *   rainbow shifting effect.
 * - Replace 'x' with a number representing how fast the colors shift for the
 *   battler. Higher numbers are faster. Lower numbers are slower.
 * - This does NOT affect UI elements like the HP Gauges, State Icons, or their
 *   positioning markers such as the battler's shadow as this is only to used
 *   to represent a change in their opacity through a state.
 * - The Visual Rainbow shift will be stacked on top of any battlers/enemies
 *   that already have a hue change.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 *
 * === Hover-Related Notetags ===
 * 
 * ---
 * 
 * <Visual Hover Effect>
 *  Base: x
 *  Speed: y
 *  Rate: z
 *  Death: case
 * </Visual Hover Effect>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Creates a hover effect when tied to a trait object.
 * - The 'base' value determines the minimum height above the ground for the
 *   hover effect. Replace 'x' with a number representing the pixel height.
 * - The 'speed' value determines the flat adjustment towards the wobbling
 *   change. Replace 'y' with a number representing the speed. Lower values
 *   move faster while higher values move slower.
 * - The 'rate' determines the fluctuation rate when the hover effect bobbles
 *   up and down. Replace 'z' with a number representing the fluctuation rate.
 * - The 'death' scenario lets you decide if you want the hovering battler to
 *   remain hovering if they're dead or fall down to the floor. Replace 'case'
 *   with 'Hover' or 'Floor'.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * Example:
 * 
 * <Visual Hover Effect>
 *  Base: 100
 *  Speed: 20
 *  Rate: 5.0
 *  Death: floor
 * </Visual Hover Effect>
 * 
 * ---
 *
 * === Breathing-Related Notetags ===
 * 
 * The following notetags are purely EXPERIMENTAL. There is a high likelihood
 * of unintended graphical glitches when using them. Use them at your own risk.
 * 
 * ---
 * 
 * <Visual Breathing Effect>
 *  Speed: x
 *  Speed X: x
 *  Speed Y: x
 *  
 *  Rate: x.y
 *  Rate X: x.y
 *  Rate Y: x.y
 * 
 *  HP Link: On
 *  HP Link: Off
 * </Visual Breathing Effect>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Creates a hover effect when tied to a trait object.
 * - The 'speed' value determines how long each cycle is.
 *   - When using 'Speed', this will apply to both 'Speed X' and 'Speed Y'
 *   - 'Speed X' refers to the horizontal breathing cycle
 *   - 'Speed Y' refers to the vertical breathing cycle
 *   - If not declared, both will default to a value of '10'
 * - The 'rate' value determines how exaggerated the breathing distortion looks
 *   for the affected target.
 *   - When using 'Rate', this will apply to both 'Rate X' and 'Rate Y
 *   - 'Rate X' refers to horizontal breathing distortion effect
 *   - 'Rate Y' refers to vertical breathing distortion effect
 *   - If not declared, 'Rate X' will default to 0.000 and 'Rate Y' to 0.020.
 * - HP Link refers to the breathing speed relative to the target's HP rate
 *   where the lower the rate, the slower the speed becomes.
 *   - 'On' means it's enabled.
 *   - 'Off' means it's disabled.
 *   - If not declared, this will default to 'OFF'
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * Examples:
 * 
 * <Visual Breathing Effect>
 *  Speed: 10
 *  Rate Y: 0.050
 *  HP Link: On
 * </Visual Breathing Effect>
 * 
 * <Visual Breathing Effect>
 *  Speed X: 15
 *  Speed Y: 10
 *  Rate X: 0.01
 *  Rate Y: 0.050
 * </Visual Breathing Effect>
 * 
 * ---
 * 
 * <No Breathing>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Removes any breathing effects for the affected target.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Visual State Effects.
 *
 * ---
 *
 * Actors
 * 
 *   Show State Overlay?:
 *   - Show state overlays over an actor's head?
 * 
 *   Show State Icons?:
 *   - Show state icons over an actor's head?
 *
 * ---
 *
 * Enemies
 * 
 *   Show State Overlay?:
 *   - Show state overlays over an enemy's head?
 * 
 *   Show State Icons?:
 *   - Show state icons over an enemy's head?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Buff/Debuff Settings Settings
 * ============================================================================
 *
 * Buff/Debuff settings for Visual State Effects.
 *
 * ---
 *
 * Popups
 * 
 *   Show Popups?:
 *   - Show Buff/Debuff Popups when applied?
 * 
 *     Buff Format:
 *     - How do you want the buff text to appear?
 *     - %1 - Parameter Name
 * 
 *       Text Color:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *       Flash Color:
 *       - Adjust the popup's flash color.
 *       - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the flash effect?
 * 
 *     Debuff Format:
 *     - How do you want the debuff text to appear?
 *     - %1 - Parameter Name
 * 
 *       Text Color:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *       Flash Color:
 *       - Adjust the popup's flash color.
 *       - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * Animations
 * 
 *   Show Animations?:
 *   - Show Buff/Debuff Animations when applied?
 * 
 *     Mirror Animations?:
 *     - Mirror animations for buffs/debuffs?
 * 
 *     Mute Animations?:
 *     - Mute animations for buffs/debuffs?
 * 
 * ---
 * 
 * Buff Animations
 * 
 *   MaxHP Buff:
 *   MaxMP Buff:
 *   ATK Buff:
 *   DEF Buff:
 *   MAT Buff:
 *   MDF Buff:
 *   AGI Buff:
 *   LUK Buff:
 *   - Animation played when applying specific Buffs.
 * 
 * Debuff Animations
 * 
 *   MaxHP Debuff:
 *   MaxMP Debuff:
 *   ATK Debuff:
 *   DEF Debuff:
 *   MAT Debuff:
 *   MDF Debuff:
 *   AGI Debuff:
 *   LUK Debuff:
 *   - Animation played when applying specific Debuff.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: State Settings
 * ============================================================================
 *
 * Default State settings for Visual State Effects.
 *
 * ---
 *
 * Popups
 * 
 *   Show Popups?:
 *   - Show States Popups when applied and removed?
 * 
 *     Add State Format:
 *     - How do you want added states to appear?
 *     - %1 - State Name
 * 
 *     Erase State Format:
 *     - How do you want erased states to appear?
 *     - %1 - State Name
 * 
 *     Default Text Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *       Match Turn Count?:
 *       - Match turn count color by default?
 * 
 *     Flash Color:
 *     - Adjust the popup's default flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the default flash effect?
 *
 * ---
 *
 * State Animations
 * 
 *   Add/Erase Animations
 * 
 *     Mirror Animations?:
 *     - Mirror animations for states?
 * 
 *     Mute Animations?:
 *     - Mute animations for states?
 * 
 *   Repeating Animations
 * 
 *     Cycle Time:
 *     - The amount of frames to wait before each animation cycle.
 *     - WARNING: Lower numbers can jeopardize game performance.
 * 
 *     Mirror Animations?:
 *     - Mirror repeating animations for states by default?
 * 
 *     Mute Animations?:
 *     - Mute repeating animations for states by default?
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
 * Version 1.16: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New state notetag added by Irina: <Custom Overlay: filename>
 * *** For those who don't want to use the img/system/ folder's "States" image
 *     file and want something custom, this notetag will do exactly that.
 * *** Custom state overlays will follow similar dimensions to the original
 *     States image: Pixel Width of 768, Pixel Height of 96, Total Frames of 8.
 * *** If you want to use different sizes, we recommend you look into Effekseer
 *     custom animations with the <Repeat Animation: x> notetag instead.
 * 
 * Version 1.15: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: July 2, 2021
 * * Feature Updates!
 * ** When a battler's sprite opacity is zero, repeating animations are hidden
 *    along with them. Update made by Arisu.
 * 
 * Version 1.13: June 18, 2021
 * * Bug Fixes!
 * ** Repeating animations no longer play on invisible enemies or dead enemies
 *    through passive state effects. Fix made by Arisu.
 * 
 * Version 1.12: June 11, 2021
 * * Documentation Update!
 * ** Added warnings for the following notetags by Irina:
 * *** <Repeat Animation: x>
 * *** <State Motion: x>
 * *** <State Motion Lock>
 * *** <Visual Opacity: x>
 * *** <Visual Rainbow: +/-x>
 * *** <Visual Hover Effect>
 * *** <Visual Breathing Effect>
 * **** NOTE: Using this with Passive State Conditions will make this effect
 *      update at the next battler refresh cycle. This is due to the effect
 *      being cached in order to prevent lag and overloading the engine.
 * 
 * Version 1.11: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina:
 * *** <Visual Breathing Effect>
 * *** <No Breathing>
 * **** Enables/disables breathing effects for your actors and/or enemies.
 *      Refer to the documentation for more details on how to set it up.
 * **** These are EXPERIMENTAL notetags. This means that these effects have the
 *      possibility of creating graphical glitches when used. Use at your own
 *      risk as these are not perfected features.
 * 
 * Version 1.10: January 1, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Yanfly.
 * *** <Visual Rainbow: +x> and <Visual Rainbow: -x>
 * 
 * Version 1.09: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Yanfly.
 * *** <Visual Opacity: x> and <Visual Opacity: x%>
 * 
 * Version 1.08: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Requires updated Core Engine. Fix made by Yanfly.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** <State Motion: x> now works for sideview enemies. Keep in mind the state
 *    motion does not apply to the active battler during the Input phase. Fix
 *    made by Yanfly.
 * 
 * Version 1.06: November 8, 2020
 * * Bug Fixes!
 * ** <Add Animation: x> and <Erase Animation: x> notetags now work properly.
 *    Fix by Arisu.
 * 
 * Version 1.05: November 1, 2020
 * * Feature Update!
 * ** Upon dying, state removal popups are no longer shown to prevent massive
 *    clutter of the screen. Update by Irina.
 * 
 * Version 1.04: October 25, 2020
 * * Bug Fixes!
 * ** Zooming in should no longer display faint outlines around state sprites.
 *    Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility with the Battle Core's new <Battler Sprite Grounded>
 *    notetag. Added by Irina.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Motion Locked Battlers at the start of battle no longer show their entire
 *    sprite sheet. Fix made by Arisu.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update
 * ** Added compatibility with Battle Core's newest update for the new
 *    distortion effects.
 * 
 * Version 1.01: September 6, 2020
 * * Compatibility Update
 * ** Added compatibility with Battle Core's newest update for the
 *    <Battle UI Offset: +x, +y> notetags. Update made by Yanfly.
 *
 * Version 1.00: September 2, 2020
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
 * @param VisualStateEffects
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
 * @desc General settings for Visual State Effects.
 * @default {"Actors":"","ActorOverlay:eval":"true","ActorStateIcon:eval":"true","Enemies":"","EnemyOverlay:eval":"true","EnemyStateIcon:eval":"true"}
 *
 * @param BuffDebuff:struct
 * @text Buff/Debuff Settings
 * @type struct<BuffDebuff>
 * @desc Buff/Debuff settings for Visual State Effects.
 * @default {"ShowPopups:eval":"true","BuffPopupFmt:str":"%1▲","BuffTextColor:str":"24","BuffFlashColor:eval":"[0, 255, 0, 160]","BuffFlashDuration:num":"60","DebuffPopupFmt:str":"%1▼","DebuffTextColor:str":"27","DebuffFlashColor:eval":"[255, 0, 0, 160]","DebuffFlashDuration:num":"60","ShowAnimations:eval":"true","AnimationMirror:eval":"false","AnimationMute:eval":"false","BuffAnimations":"","Buff0Animation:num":"52","Buff1Animation:num":"53","Buff2Animation:num":"52","Buff3Animation:num":"52","Buff4Animation:num":"53","Buff5Animation:num":"53","Buff6Animation:num":"51","Buff7Animation:num":"51","DebuffAnimations":"","Debuff0Animation:num":"55","Debuff1Animation:num":"56","Debuff2Animation:num":"55","Debuff3Animation:num":"55","Debuff4Animation:num":"56","Debuff5Animation:num":"56","Debuff6Animation:num":"54","Debuff7Animation:num":"54"}
 *
 * @param State:struct
 * @text State Defaults
 * @type struct<State>
 * @desc Default State settings for Visual State Effects.
 * @default {"ShowPopups:eval":"true","AddPopupFmt:str":"+%1","ErasePopupFmt:str":"-%1","TextColor:str":"0","MatchTurnCountColor:eval":"true","FlashColor:eval":"[0, 0, 0, 0]","FlashDuration:num":"60","StateAnimations":"","AddEraseAnimations":"","AnimationMirror:eval":"false","AnimationMute:eval":"false","RepeatingAnimations":"","CycleTime:num":"300","RepeatMirror:eval":"false","RepeatMute:eval":"true"}
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
 * @param Actors
 *
 * @param ActorOverlay:eval
 * @text Show State Overlay?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state overlays over an actor's head?
 * @default true
 *
 * @param ActorStateIcon:eval
 * @text Show State Icons?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state icons over an actor's head?
 * @default true
 *
 * @param Enemies
 *
 * @param EnemyOverlay:eval
 * @text Show State Overlay?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state overlays over an enemy's head?
 * @default true
 *
 * @param EnemyStateIcon:eval
 * @text Show State Icons?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state icons over an enemy's head?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BuffDebuff:
 *
 * @param ShowPopups:eval
 * @text Show Popups?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Buff/Debuff Popups when applied?
 * @default true
 *
 * @param BuffPopupFmt:str
 * @text Buff Format
 * @parent ShowPopups:eval
 * @desc How do you want the buff text to appear?
 * %1 - Parameter Name
 * @default %1▲
 *
 * @param BuffTextColor:str
 * @text Text Color
 * @parent BuffPopupFmt:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param BuffFlashColor:eval
 * @text Flash Color
 * @parent BuffPopupFmt:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param BuffFlashDuration:num
 * @text Flash Duration
 * @parent BuffPopupFmt:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param DebuffPopupFmt:str
 * @text Debuff Format
 * @parent ShowPopups:eval
 * @desc How do you want the debuff text to appear?
 * %1 - Parameter Name
 * @default %1▼
 *
 * @param DebuffTextColor:str
 * @text Text Color
 * @parent DebuffPopupFmt:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param DebuffFlashColor:eval
 * @text Flash Color
 * @parent DebuffPopupFmt:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DebuffFlashDuration:num
 * @text Flash Duration
 * @parent DebuffPopupFmt:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Buff/Debuff Animations when applied?
 * @default true
 *
 * @param AnimationMirror:eval
 * @text Mirror Animations?
 * @parent ShowAnimations:eval
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations for buffs/debuffs?
 * @default false
 *
 * @param AnimationMute:eval
 * @text Mute Animations?
 * @parent ShowAnimations:eval
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute animations for buffs/debuffs?
 * @default false
 * 
 * @param BuffAnimations
 * @text Buff Animations
 * @parent ShowAnimations:eval
 *
 * @param Buff0Animation:num
 * @text MaxHP Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MaxHP Buffs.
 * @default 52
 *
 * @param Buff1Animation:num
 * @text MaxMP Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MaxMP Buffs.
 * @default 53
 *
 * @param Buff2Animation:num
 * @text ATK Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying ATK Buffs.
 * @default 52
 *
 * @param Buff3Animation:num
 * @text DEF Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying DEF Buffs.
 * @default 52
 *
 * @param Buff4Animation:num
 * @text MAT Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MAT Buffs.
 * @default 53
 *
 * @param Buff5Animation:num
 * @text MDF Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MDF Buffs.
 * @default 53
 *
 * @param Buff6Animation:num
 * @text AGI Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying AGI Buffs.
 * @default 51
 *
 * @param Buff7Animation:num
 * @text LUK Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying LUK Buffs.
 * @default 51
 * 
 * @param DebuffAnimations
 * @text Debuff Animations
 * @parent ShowAnimations:eval
 *
 * @param Debuff0Animation:num
 * @text MaxHP Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MaxHP Debuffs.
 * @default 55
 *
 * @param Debuff1Animation:num
 * @text MaxMP Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MaxMP Debuffs.
 * @default 56
 *
 * @param Debuff2Animation:num
 * @text ATK Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying ATK Debuffs.
 * @default 55
 *
 * @param Debuff3Animation:num
 * @text DEF Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying DEF Debuffs.
 * @default 55
 *
 * @param Debuff4Animation:num
 * @text MAT Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MAT Debuffs.
 * @default 56
 *
 * @param Debuff5Animation:num
 * @text MDF Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MDF Debuffs.
 * @default 56
 *
 * @param Debuff6Animation:num
 * @text AGI Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying AGI Debuffs.
 * @default 54
 *
 * @param Debuff7Animation:num
 * @text LUK Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying LUK Debuffs.
 * @default 54
 *
 */
/* ----------------------------------------------------------------------------
 * State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~State:
 *
 * @param ShowPopups:eval
 * @text Show Popups?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show States Popups when applied and removed?
 * @default true
 *
 * @param AddPopupFmt:str
 * @text Add State Format
 * @parent ShowPopups:eval
 * @desc How do you want added states to appear?
 * %1 - State Name
 * @default +%1
 *
 * @param ErasePopupFmt:str
 * @text Erase State Format
 * @parent ShowPopups:eval
 * @desc How do you want erased states to appear?
 * %1 - State Name
 * @default -%1
 *
 * @param TextColor:str
 * @text Default Text Color
 * @parent ShowPopups:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param MatchTurnCountColor:eval
 * @text Match Turn Count?
 * @parent TextColor:str
 * @type boolean
 * @on Match
 * @off Don't
 * @desc Match turn count color by default?
 * @default true
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent ShowPopups:eval
 * @desc Adjust the popup's default flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type number
 * @desc What is the frame duration of the default flash effect?
 * @default 60
 * 
 * @param StateAnimations
 * @text State Animations
 * 
 * @param AddEraseAnimations
 * @text Add/Erase Animations
 * @parent StateAnimations
 *
 * @param AnimationMirror:eval
 * @text Mirror Animations?
 * @parent AddEraseAnimations
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations for states?
 * @default false
 *
 * @param AnimationMute:eval
 * @text Mute Animations?
 * @parent AddEraseAnimations
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute animations for states?
 * @default false
 * 
 * @param RepeatingAnimations
 * @text Repeating Animations
 * @parent StateAnimations
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent RepeatingAnimations
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 300
 *
 * @param RepeatMirror:eval
 * @text Mirror Animations?
 * @parent RepeatingAnimations
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror repeating animations for states by default?
 * @default false
 *
 * @param RepeatMute:eval
 * @text Mute Animations?
 * @parent RepeatingAnimations
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute repeating animations for states by default?
 * @default true
 *
 */
//=============================================================================

const _0x1a4b4d=_0x4bb8;function _0x7f39(){const _0x58dcd6=['format','_dragonbonesSpriteContainer','State','354JEamiv','smooth','IconSet','EMcvR','_hoverMinimum','LFJJm','setBattler','filter','some','extraPositionY','speedX','updateVisualStateRainbow','_hue','Game_BattlerBase_decreaseBuff','initMembers','Bklyw','dmZeg','_cache','Sprite_Enemy_createStateIconSprite','onLoadCustomOverlayBitmap','Sprite_Actor_setBattler','bind','GLzgs','overlay','increaseBuff','clamp','IxxJV','min','Sprite_Battler_extraPositionY','ActorOverlay','hsScN','TextColor','parameters','requestFauxAnimation','Sprite_Battler_mainSpriteScaleX','_bitmapName','onRemoveState','HMMkL','ICON_BUFF_START','cos','YcMMl','speed','_actor','%1FlashDuration','4ivYwat','xmQnt','ShowPopups','Sprite_SvEnemy','toLowerCase','Sprite_StateOverlay_loadBitmap','hpLinked','note','%1%2Animation','ActorStateIcon','getVisualRepeatingStateAnimationCycle','VisuMZ_0_CoreEngine','createVisualRepeatingStateAnimation','General','1560927jkEMco','_breathingRand','split','prototype','ARRAYEVAL','setupBuffDebuffPopup','hasSvBattler','Sprite_StateOverlay_updateFrame','4122qXieFU','_distortionSprite','stateMotionIndex','return\x200','stateOverlayIndex','Sprite_Actor_refreshMotion','ShowAnimations','isStateAffected','2500jbeKlA','round','isDead','frameCount','wTAXc','VisualStateEffects','AnimationMirror','createVisualHoveringData','textColor','Game_BattlerBase_refresh','Sprite_SvEnemy_refreshMotion','randomInt','pNiSz','flashColor','eMaXL','NbEoK','Sprite_Battler_mainSpriteScaleY','push','EVAL','trim','isEnemy','EnemyStateIcon','_overlayIndex','flashDuration','_pattern','setupVisualStateEffect','name','_visualStateAnimationRepeatDuration','Sprite_Actor_createStateSprite','updateCustomOverlayFrame','updateFrame','random','Sprite_Enemy_setBattler','hoverData','ydLyH','noBreathing','uIyMo','STRUCT','MatchTurnCountColor','_hoverRand','visualBattlerOpacity','visualStateRainbow','version','tRdyS','Game_Battler_onAddState','initVisualHoverEffect','9318KocBpV','deathHover','Erase','updateDistortionOpacity','MjKxb','oiBnF','FUNC','createStateIconSprite','applyBreathingCalculations','exit','setupVisualStateEffectsPopup','max','JSON','_customStateMotion','refreshMotion','_mainSprite','269789qekWjG','die','Sprite_Actor_updateFrame','TOvmm','hover','breathing','createStateSprite','2822415mMeCWc','scale','Sprite_Enemy_update','KXdDL','onLoadDefaultOverlayBitmap','AFqGY','isAlive','Sprite_Battler_updateOpacity','breathingData','%1PopupFmt','update','battleUIOffsetX','KoMwh','FlashDuration','Game_BattlerBase_initMembers','gARBo','bitmap','ARRAYNUM','Sprite_Actor_update','hGbPs','VvEgW','height','param','getVisualStateTone','iMXDa','hoverHeight','refresh','BuffDebuff','oLbza','rate','Buff','okxRB','getStateOverlayIndex','ARRAYFUNC','visualRepeatingStateAniCycle','traitObjects','_battler','getStateMotionIndex','yNkxD','%1FlashColor','isSceneBattle','base','match','STR','map','setupIconTextPopup','createVisualBreathingData','opacity','jHARK','deathStateId','createVisualStateTone','length','Add','rateY','states','_dragonbones','floor','Game_Battler_onRemoveState','GMrKQ','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','onAddState','description','setup','checkCacheKey','setHue','AnimationMute','gftUf','_svBattlerSprite','3955gNdHGx','updateOpacity','battler','call','battleUIOffsetY','Debuff','_die_bypass_visualStateEffects','_stateIconSprite','NUM','AeWOV','UsBkk','oZiKc','createVisualRepeatingStateAnimationCycle','visible','kPEfj','ConvertParams','startMotion','isActor','toUpperCase','updateVisualStateEffectsOverlay','ZhNPD','_visualStateAnimationIndex','usQjx','createVisualStateRainbow','visualStateTone','eFltE','FlashColor','loadSystem','_stateSprite','constructor','setupStateAnimation','GOWad','string','parse','Settings','iconIndex','VPVPl','mainSpriteScaleX','updateVisualStateEffectsIcons','bvkca','stateMotionLock','createVisualBattlerOpacity','RepeatMute','GXEaD','isActing','36XlAyVE','setColorTone','visualStateToneTargetSprite','includes','initVisualStateEffects','States','isInputting','23969rKSeTc','decreaseBuff','Game_BattlerBase_die','applyBreathingScaleX','status','CycleTime','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_stateMotionLocked','_loadingCustomOverlay','Sprite_Battler_updateDragonbonesTimeScale','ARRAYSTR','updateRepeatingVisualStateAnimation','getVisualRepeatingStateAnimation','isBattlerGrounded','customizeStatePopup','OXZJy','addLoadListener','isRepeatingVisualStateAnimationShown','hLnyA','1092pXrsIl','Game_BattlerBase_increaseBuff','bEZWr','rateX','addChild','SYlaa','setFrame','updateDragonbonesTimeScale','loadBitmap','speedY','setupVisualBuffDebuffEffect','mainSpriteScaleY','809968luGDbw','updateVisualStateEffects','stateColor','RepeatMirror','applyBreathingScaleY','Fjobv','isSpriteVisible','EnemyOverlay'];_0x7f39=function(){return _0x58dcd6;};return _0x7f39();}(function(_0x173a90,_0x365790){const _0x1ddd50=_0x4bb8,_0x539104=_0x173a90();while(!![]){try{const _0x4d2be4=parseInt(_0x1ddd50(0x1de))/0x1*(parseInt(_0x1ddd50(0x19c))/0x2)+-parseInt(_0x1ddd50(0x1d6))/0x3*(parseInt(_0x1ddd50(0x1c8))/0x4)+-parseInt(_0x1ddd50(0x22b))/0x5+parseInt(_0x1ddd50(0x214))/0x6*(-parseInt(_0x1ddd50(0x26f))/0x7)+parseInt(_0x1ddd50(0x191))/0x8*(parseInt(_0x1ddd50(0x16b))/0x9)+parseInt(_0x1ddd50(0x1e6))/0xa*(-parseInt(_0x1ddd50(0x172))/0xb)+parseInt(_0x1ddd50(0x185))/0xc*(parseInt(_0x1ddd50(0x224))/0xd);if(_0x4d2be4===_0x365790)break;else _0x539104['push'](_0x539104['shift']());}catch(_0x1a0e31){_0x539104['push'](_0x539104['shift']());}}}(_0x7f39,0x7e012));function _0x4bb8(_0x5b2dcc,_0x31643c){const _0x7f3918=_0x7f39();return _0x4bb8=function(_0x4bb809,_0x3173c6){_0x4bb809=_0x4bb809-0x151;let _0xb75603=_0x7f3918[_0x4bb809];return _0xb75603;},_0x4bb8(_0x5b2dcc,_0x31643c);}var label='VisualStateEffects',tier=tier||0x0,dependencies=[_0x1a4b4d(0x1d3),'VisuMZ_1_BattleCore','VisuMZ_1_SkillsStatesCore'],pluginData=$plugins[_0x1a4b4d(0x1a3)](function(_0x3e314e){const _0x335c83=_0x1a4b4d;return _0x3e314e[_0x335c83(0x176)]&&_0x3e314e[_0x335c83(0x268)][_0x335c83(0x16e)]('['+label+']');})[0x0];VisuMZ[label][_0x1a4b4d(0x160)]=VisuMZ[label][_0x1a4b4d(0x160)]||{},VisuMZ[_0x1a4b4d(0x27e)]=function(_0x3370cc,_0x231d90){const _0x4cd3a2=_0x1a4b4d;for(const _0x282260 in _0x231d90){if(_0x4cd3a2(0x227)!==_0x4cd3a2(0x27d)){if(_0x282260['match'](/(.*):(.*)/i)){const _0x392e2f=String(RegExp['$1']),_0x1866c2=String(RegExp['$2'])[_0x4cd3a2(0x281)]()['trim']();let _0x4bb42b,_0x437a0e,_0x176531;switch(_0x1866c2){case _0x4cd3a2(0x277):_0x4bb42b=_0x231d90[_0x282260]!==''?Number(_0x231d90[_0x282260]):0x0;break;case _0x4cd3a2(0x23c):_0x437a0e=_0x231d90[_0x282260]!==''?JSON['parse'](_0x231d90[_0x282260]):[],_0x4bb42b=_0x437a0e[_0x4cd3a2(0x257)](_0x3ae324=>Number(_0x3ae324));break;case _0x4cd3a2(0x1f8):_0x4bb42b=_0x231d90[_0x282260]!==''?eval(_0x231d90[_0x282260]):null;break;case _0x4cd3a2(0x1da):_0x437a0e=_0x231d90[_0x282260]!==''?JSON[_0x4cd3a2(0x15f)](_0x231d90[_0x282260]):[],_0x4bb42b=_0x437a0e[_0x4cd3a2(0x257)](_0x34e18e=>eval(_0x34e18e));break;case _0x4cd3a2(0x220):_0x4bb42b=_0x231d90[_0x282260]!==''?JSON[_0x4cd3a2(0x15f)](_0x231d90[_0x282260]):'';break;case'ARRAYJSON':_0x437a0e=_0x231d90[_0x282260]!==''?JSON[_0x4cd3a2(0x15f)](_0x231d90[_0x282260]):[],_0x4bb42b=_0x437a0e[_0x4cd3a2(0x257)](_0x5f01b6=>JSON[_0x4cd3a2(0x15f)](_0x5f01b6));break;case _0x4cd3a2(0x21a):_0x4bb42b=_0x231d90[_0x282260]!==''?new Function(JSON[_0x4cd3a2(0x15f)](_0x231d90[_0x282260])):new Function(_0x4cd3a2(0x1e1));break;case _0x4cd3a2(0x24c):_0x437a0e=_0x231d90[_0x282260]!==''?JSON[_0x4cd3a2(0x15f)](_0x231d90[_0x282260]):[],_0x4bb42b=_0x437a0e[_0x4cd3a2(0x257)](_0x2a8de9=>new Function(JSON[_0x4cd3a2(0x15f)](_0x2a8de9)));break;case _0x4cd3a2(0x256):_0x4bb42b=_0x231d90[_0x282260]!==''?String(_0x231d90[_0x282260]):'';break;case _0x4cd3a2(0x17c):_0x437a0e=_0x231d90[_0x282260]!==''?JSON[_0x4cd3a2(0x15f)](_0x231d90[_0x282260]):[],_0x4bb42b=_0x437a0e[_0x4cd3a2(0x257)](_0x37d310=>String(_0x37d310));break;case _0x4cd3a2(0x20b):_0x176531=_0x231d90[_0x282260]!==''?JSON[_0x4cd3a2(0x15f)](_0x231d90[_0x282260]):{},_0x4bb42b=VisuMZ[_0x4cd3a2(0x27e)]({},_0x176531);break;case'ARRAYSTRUCT':_0x437a0e=_0x231d90[_0x282260]!==''?JSON[_0x4cd3a2(0x15f)](_0x231d90[_0x282260]):[],_0x4bb42b=_0x437a0e[_0x4cd3a2(0x257)](_0x4a639a=>VisuMZ[_0x4cd3a2(0x27e)]({},JSON[_0x4cd3a2(0x15f)](_0x4a639a)));break;default:continue;}_0x3370cc[_0x392e2f]=_0x4bb42b;}}else return this[_0x4cd3a2(0x221)]=_0x41f989(_0x1b114e['$1'])[_0x4cd3a2(0x1cc)]()['trim'](),0x4;}return _0x3370cc;},(_0x4a20e4=>{const _0xa74a56=_0x1a4b4d,_0x3bad01=_0x4a20e4[_0xa74a56(0x200)];for(const _0x1c2f1a of dependencies){if(!Imported[_0x1c2f1a]){if(_0xa74a56(0x23e)===_0xa74a56(0x243))_0x41c9b6['VisualStateEffects'][_0xa74a56(0x232)][_0xa74a56(0x272)](this),this[_0xa74a56(0x217)]();else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0xa74a56(0x199)](_0x3bad01,_0x1c2f1a)),SceneManager[_0xa74a56(0x21d)]();break;}}}const _0x5be6aa=_0x4a20e4[_0xa74a56(0x268)];if(_0x5be6aa[_0xa74a56(0x255)](/\[Version[ ](.*?)\]/i)){const _0x29e055=Number(RegExp['$1']);_0x29e055!==VisuMZ[label][_0xa74a56(0x210)]&&(alert(_0xa74a56(0x178)[_0xa74a56(0x199)](_0x3bad01,_0x29e055)),SceneManager[_0xa74a56(0x21d)]());}if(_0x5be6aa[_0xa74a56(0x255)](/\[Tier[ ](\d+)\]/i)){const _0x544d93=Number(RegExp['$1']);_0x544d93<tier?_0xa74a56(0x1f4)===_0xa74a56(0x1f4)?(alert(_0xa74a56(0x266)['format'](_0x3bad01,_0x544d93,tier)),SceneManager[_0xa74a56(0x21d)]()):this[_0xa74a56(0x26e)][_0xa74a56(0x15a)][_0xa74a56(0x27c)]=![]:tier=Math[_0xa74a56(0x21f)](_0x544d93,tier);}VisuMZ[_0xa74a56(0x27e)](VisuMZ[label]['Settings'],_0x4a20e4[_0xa74a56(0x1bc)]);})(pluginData),VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x239)]=Game_BattlerBase['prototype'][_0x1a4b4d(0x1aa)],Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x1aa)]=function(){const _0x256076=_0x1a4b4d;this[_0x256076(0x1ad)]={},VisuMZ[_0x256076(0x1eb)][_0x256076(0x239)][_0x256076(0x272)](this);},VisuMZ[_0x1a4b4d(0x1eb)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x245)],Game_BattlerBase[_0x1a4b4d(0x1d9)]['refresh']=function(){const _0x2bbc14=_0x1a4b4d;this[_0x2bbc14(0x1ad)]={},VisuMZ[_0x2bbc14(0x1eb)][_0x2bbc14(0x1ef)][_0x2bbc14(0x272)](this);},Game_BattlerBase['prototype']['checkCacheKey']=function(_0x2118ca){const _0x311ce5=_0x1a4b4d;return this[_0x311ce5(0x1ad)]=this['_cache']||{},this[_0x311ce5(0x1ad)][_0x2118ca]!==undefined;},VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x186)]=Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x1b4)],Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x1b4)]=function(_0x462251){const _0x1ca709=_0x1a4b4d;VisuMZ['VisualStateEffects'][_0x1ca709(0x186)][_0x1ca709(0x272)](this,_0x462251),this[_0x1ca709(0x18f)](_0x462251,!![]);},VisuMZ['VisualStateEffects'][_0x1a4b4d(0x1a9)]=Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x173)],Game_BattlerBase[_0x1a4b4d(0x1d9)]['decreaseBuff']=function(_0x11af4e){const _0x1b8dde=_0x1a4b4d;VisuMZ[_0x1b8dde(0x1eb)][_0x1b8dde(0x1a9)][_0x1b8dde(0x272)](this,_0x11af4e),this[_0x1b8dde(0x18f)](_0x11af4e,![]);},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x18f)]=function(_0x2c6496,_0x2c9101){const _0x1459f8=_0x1a4b4d;if(!SceneManager[_0x1459f8(0x253)]())return;if(!this[_0x1459f8(0x271)]())return;const _0x204d22=VisuMZ[_0x1459f8(0x1eb)][_0x1459f8(0x160)]['BuffDebuff'],_0x2a368b=_0x2c9101?'Buff':_0x1459f8(0x274);_0x204d22[_0x1459f8(0x1ca)]&&this['battler']()['setupBuffDebuffPopup'](_0x2c6496,_0x2c9101);if(_0x204d22[_0x1459f8(0x1e4)]){if(_0x1459f8(0x19f)!==_0x1459f8(0x19f))_0x25841b['x']=0x0,this[_0x1459f8(0x24f)][_0x1459f8(0x236)]&&(_0x56810d['x']+=this['_battler'][_0x1459f8(0x236)]()),_0x128eb9['y']=-_0x447fe5[_0x1459f8(0x1e7)]((this[_0x1459f8(0x240)]+0x28)*0.9),_0x2cb5ec['y']<0x14-this['y']&&(_0x1872c9['y']=0x14-this['y']),this[_0x1459f8(0x24f)][_0x1459f8(0x273)]&&(_0x40a510['y']+=this[_0x1459f8(0x24f)][_0x1459f8(0x273)]()-0x4);else{const _0x57fbf2=[this],_0x3f781e=_0x204d22[_0x1459f8(0x1d0)[_0x1459f8(0x199)](_0x2a368b,_0x2c6496)]||0x0,_0x446979=_0x204d22[_0x1459f8(0x1ec)],_0xa44cdf=_0x204d22[_0x1459f8(0x26c)];$gameTemp[_0x1459f8(0x1bd)](_0x57fbf2,_0x3f781e,_0x446979,_0xa44cdf);}}},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x1ff)]=function(_0x16fc60,_0x5cac1f){const _0x17a09f=_0x1a4b4d;if(!SceneManager[_0x17a09f(0x253)]())return;if(_0x16fc60===this[_0x17a09f(0x25c)]())return;if(_0x5cac1f&&!this['isStateAffected'](_0x16fc60))return;if(!_0x5cac1f&&this[_0x17a09f(0x1e5)](_0x16fc60))return;if(!this['battler']())return;const _0x58397e=VisuMZ[_0x17a09f(0x1eb)][_0x17a09f(0x160)][_0x17a09f(0x19b)],_0x32a4fd=$dataStates[_0x16fc60];if(!_0x32a4fd)return;_0x58397e[_0x17a09f(0x1ca)]&&!_0x32a4fd[_0x17a09f(0x1cf)][_0x17a09f(0x255)](/<HIDE STATE POPUP>/i)&&(_0x17a09f(0x157)==='eFltE'?this[_0x17a09f(0x271)]()['setupVisualStateEffectsPopup'](_0x16fc60,_0x5cac1f):(_0x279508['VisualStateEffects']['Sprite_Battler_initMembers'][_0x17a09f(0x272)](this),this[_0x17a09f(0x16f)](),this[_0x17a09f(0x213)]())),VisuMZ[_0x17a09f(0x1eb)][_0x17a09f(0x15c)](this,_0x32a4fd,_0x5cac1f);},VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x15c)]=function(_0x4d1c6a,_0x388759,_0x5bf465){const _0x3a2827=_0x1a4b4d,_0x1edb29=VisuMZ[_0x3a2827(0x1eb)][_0x3a2827(0x160)][_0x3a2827(0x19b)],_0x2af4fb=_0x1edb29['AnimationMirror'],_0x5d5543=_0x1edb29[_0x3a2827(0x26c)],_0x1edce5=_0x388759[_0x3a2827(0x1cf)];if(_0x5bf465&&_0x1edce5['match'](/(?:ADD|APPLY) ANIMATION:[ ](\d+)/i)){const _0x5eaf87=Number(RegExp['$1']);$gameTemp['requestFauxAnimation']([_0x4d1c6a],_0x5eaf87,_0x2af4fb,_0x5d5543);}if(!_0x5bf465&&_0x1edce5[_0x3a2827(0x255)](/(?:ERASE|REMOVE) ANIMATION:[ ](\d+)/i)){const _0xf3b4ae=Number(RegExp['$1']);$gameTemp[_0x3a2827(0x1bd)]([_0x4d1c6a],_0xf3b4ae,_0x2af4fb,_0x5d5543);}},Game_BattlerBase[_0x1a4b4d(0x1d9)]['getVisualRepeatingStateAnimation']=function(){const _0x5abb8a=_0x1a4b4d,_0x4e9b43='visualRepeatingStateAnimation';if(this['checkCacheKey'](_0x4e9b43))return this[_0x5abb8a(0x1ad)][_0x4e9b43];return this[_0x5abb8a(0x1ad)][_0x4e9b43]=this[_0x5abb8a(0x1d4)](),this[_0x5abb8a(0x1ad)][_0x4e9b43];},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x1d4)]=function(){const _0x2b3aca=_0x1a4b4d;let _0x40baf1=[];for(const _0x5c8212 of this[_0x2b3aca(0x261)]()){if(!_0x5c8212)continue;_0x5c8212[_0x2b3aca(0x1cf)][_0x2b3aca(0x255)](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION:[ ](\d+)>/i)&&_0x40baf1[_0x2b3aca(0x1f7)](Number(RegExp['$1'])||0x0);}return _0x40baf1;},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x1d2)]=function(){const _0x31f7e5=_0x1a4b4d,_0x265d57=_0x31f7e5(0x24d);if(this['checkCacheKey'](_0x265d57))return this[_0x31f7e5(0x1ad)][_0x265d57];return this[_0x31f7e5(0x1ad)][_0x265d57]=this['createVisualRepeatingStateAnimationCycle'](),this[_0x31f7e5(0x1ad)][_0x265d57];},Game_BattlerBase['prototype'][_0x1a4b4d(0x27b)]=function(){const _0x54adc9=_0x1a4b4d;let _0x4a59b0=[];for(const _0x5c55a0 of this[_0x54adc9(0x261)]()){if(_0x54adc9(0x187)!==_0x54adc9(0x152)){if(!_0x5c55a0)continue;if(_0x5c55a0['note']['match'](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION CYCLE:[ ](\d+)>/i))_0x54adc9(0x265)==='GMrKQ'?_0x4a59b0['push'](Number(RegExp['$1'])||0x0):(this[_0x54adc9(0x23b)]=_0x1031a2,this[_0x54adc9(0x17a)]=![],this[_0x54adc9(0x1bf)]=this['_overlayIndex'],this[_0x54adc9(0x203)]());else{if(_0x54adc9(0x1ba)!=='hsScN'){if(!this[_0x54adc9(0x24f)])return;const _0x18a962=this[_0x54adc9(0x24f)][_0x54adc9(0x20f)]();if(_0x18a962===0x0&&this[_0x54adc9(0x1df)][_0x54adc9(0x1a8)]!==0x0)this[_0x54adc9(0x1df)]['setHue'](0x0);else{let _0x5db3b1=this[_0x54adc9(0x1df)][_0x54adc9(0x1a8)]+_0x18a962;_0x5db3b1%=0x168,this[_0x54adc9(0x1df)][_0x54adc9(0x26b)](_0x5db3b1);}}else _0x4a59b0[_0x54adc9(0x1f7)](VisuMZ['VisualStateEffects']['Settings'][_0x54adc9(0x19b)][_0x54adc9(0x177)]);}}else this[_0x54adc9(0x19a)][_0x54adc9(0x16c)](_0x32abfd);}return _0x4a59b0;},Game_BattlerBase[_0x1a4b4d(0x1d9)]['stateMotionIndex']=function(){const _0x548763=_0x1a4b4d,_0x272f84=_0x548763(0x1e0);if(this[_0x548763(0x26a)](_0x272f84))return this[_0x548763(0x1ad)][_0x272f84];return this[_0x548763(0x1ad)][_0x272f84]=this[_0x548763(0x250)](),this[_0x548763(0x1ad)][_0x272f84];},Game_BattlerBase[_0x1a4b4d(0x1d9)]['getStateMotionIndex']=function(){const _0x5c0c08=_0x1a4b4d,_0xe7af1e=this[_0x5c0c08(0x261)]();for(const _0x183df0 of _0xe7af1e){if(!_0x183df0)continue;if(_0x183df0[_0x5c0c08(0x1cf)][_0x5c0c08(0x255)](/<STATE MOTION:[ ](.*)>/i))return this[_0x5c0c08(0x221)]=String(RegExp['$1'])[_0x5c0c08(0x1cc)]()[_0x5c0c08(0x1f9)](),0x4;else{if(_0x183df0['motion']!==0x0){if(_0x5c0c08(0x1a1)!==_0x5c0c08(0x1a1)){let _0x586de4=_0x190334['VisualStateEffects'][_0x5c0c08(0x1f6)][_0x5c0c08(0x272)](this);return _0x586de4+=this['applyBreathingScaleY'](),_0x586de4;}else return _0x183df0['motion'];}}}return 0x0;},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x166)]=function(){const _0x4c6136=_0x1a4b4d,_0x1fb88f=_0x4c6136(0x166);if(this[_0x4c6136(0x26a)](_0x1fb88f))return this[_0x4c6136(0x1ad)][_0x1fb88f];return this[_0x4c6136(0x1ad)][_0x1fb88f]=this['getStateMotionLock'](),this[_0x4c6136(0x1ad)][_0x1fb88f];},Game_BattlerBase['prototype']['getStateMotionLock']=function(){const _0x550f9b=_0x1a4b4d,_0xd43de=this[_0x550f9b(0x261)]();for(const _0x52306f of _0xd43de){if(!_0x52306f)continue;if(_0x52306f[_0x550f9b(0x1cf)][_0x550f9b(0x255)](/<STATE MOTION (?:LOCK|LOCKED)>/i)){if(_0x550f9b(0x1f2)==='pNiSz')return!![];else{const _0x5a97e4=_0x30ce70(_0x11fadc['$1']);_0x5a97e4!==_0xa4cfca[_0xed6ce0][_0x550f9b(0x210)]&&(_0xb00b8f('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x4f747f,_0x5a97e4)),_0x5d08b5[_0x550f9b(0x21d)]());}}}return![];},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x1e2)]=function(){const _0x2bca14=_0x1a4b4d,_0x5e1a0a=_0x2bca14(0x1e2);if(this[_0x2bca14(0x26a)](_0x5e1a0a))return this[_0x2bca14(0x1ad)][_0x5e1a0a];return this['_cache'][_0x5e1a0a]=this['getStateOverlayIndex'](),this[_0x2bca14(0x1ad)][_0x5e1a0a];},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x24b)]=function(){const _0x489027=_0x1a4b4d,_0x559b59=this[_0x489027(0x261)]();for(const _0x409d4e of _0x559b59){if(!_0x409d4e)continue;if(_0x409d4e[_0x489027(0x1cf)][_0x489027(0x255)](/<CUSTOM OVERLAY:[ ](.*)>/i))return String(RegExp['$1']);if(_0x409d4e[_0x489027(0x1b3)]!==0x0)return _0x409d4e[_0x489027(0x1b3)];}return 0x0;},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x242)]=function(){const _0x5717dd=_0x1a4b4d,_0x420449=_0x5717dd(0x156);if(this[_0x5717dd(0x26a)](_0x420449))return this['_cache'][_0x420449];return this['_cache'][_0x420449]=this[_0x5717dd(0x25d)](),this[_0x5717dd(0x1ad)][_0x420449];},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x25d)]=function(){const _0x39231e=_0x1a4b4d;for(const _0x45ca84 of this['states']()){if(_0x39231e(0x162)!==_0x39231e(0x162))_0x587dec[_0x39231e(0x1eb)][_0x39231e(0x23d)][_0x39231e(0x272)](this),this['updateVisualStateEffects']();else{if(!_0x45ca84)continue;if(_0x45ca84[_0x39231e(0x1cf)][_0x39231e(0x255)](/<STATE TONE:[ ](.*)>/i)){let _0x166bd5=String(RegExp['$1'])['trim']()[_0x39231e(0x1d8)](',')[_0x39231e(0x257)](_0x32e32f=>Number(_0x32e32f)||0x0);while(_0x166bd5[_0x39231e(0x25e)]<0x4)_0x166bd5[_0x39231e(0x1f7)](0x0);return _0x166bd5[0x0]=_0x166bd5[0x0]['clamp'](-0xff,0xff),_0x166bd5[0x1]=_0x166bd5[0x1]['clamp'](-0xff,0xff),_0x166bd5[0x2]=_0x166bd5[0x2][_0x39231e(0x1b5)](-0xff,0xff),_0x166bd5[0x3]=_0x166bd5[0x3][_0x39231e(0x1b5)](0x0,0xff),_0x166bd5;}}}return[0x0,0x0,0x0,0x0];},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x207)]=function(){const _0x4d28a1=_0x1a4b4d,_0x4c3cb8=_0x4d28a1(0x207);if(this[_0x4d28a1(0x26a)](_0x4c3cb8))return this[_0x4d28a1(0x1ad)][_0x4c3cb8];return this['_cache'][_0x4c3cb8]=this['createVisualHoveringData'](),this['_cache'][_0x4c3cb8];},Game_BattlerBase['prototype'][_0x1a4b4d(0x1ed)]=function(){const _0x5bfb32=_0x1a4b4d,_0x5e3815=/<VISUAL (?:HOVER|FLOAT) EFFECT>\s*([\s\S]*)\s*<\/VISUAL (?:HOVER|FLOAT) EFFECT>/i,_0x21a3ac={'hover':![],'base':0x64,'speed':0x14,'rate':0x5,'deathHover':![]};for(const _0x50051d of this['traitObjects']()){if(!_0x50051d)continue;if(_0x50051d[_0x5bfb32(0x1cf)]['match'](_0x5e3815)){if(_0x5bfb32(0x1b6)!=='IxxJV'){let _0x236e7b=_0x4674c0[_0x5bfb32(0x1eb)][_0x5bfb32(0x1be)][_0x5bfb32(0x272)](this);return _0x236e7b+=this[_0x5bfb32(0x175)](),_0x236e7b;}else{_0x21a3ac[_0x5bfb32(0x228)]=!![];const _0x5d1e65=String(RegExp['$1']);_0x5d1e65['match'](/BASE:[ ](.*)/i)&&(_0x21a3ac[_0x5bfb32(0x254)]=Number(RegExp['$1'])||0x0);_0x5d1e65[_0x5bfb32(0x255)](/SPEED:[ ](.*)/i)&&(_0x21a3ac[_0x5bfb32(0x1c5)]=Number(RegExp['$1'])||0x0);_0x5d1e65[_0x5bfb32(0x255)](/RATE:[ ](.*)/i)&&(_0x21a3ac[_0x5bfb32(0x248)]=Number(RegExp['$1'])||0x0);if(_0x5d1e65[_0x5bfb32(0x255)](/DEATH: HOVER/i))_0x21a3ac['deathHover']=!![];else _0x5d1e65[_0x5bfb32(0x255)](/DEATH: FLOOR/i)&&(_0x21a3ac[_0x5bfb32(0x215)]=![]);break;}}}return _0x21a3ac;},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x209)]=function(){const _0x25da72=_0x1a4b4d,_0x1a5087=_0x25da72(0x209);if(this[_0x25da72(0x26a)](_0x1a5087))return this['_cache'][_0x1a5087];const _0x194817=this[_0x25da72(0x24e)]();return this[_0x25da72(0x1ad)][_0x1a5087]=_0x194817[_0x25da72(0x1a4)](_0x480df7=>_0x480df7&&_0x480df7[_0x25da72(0x1cf)][_0x25da72(0x255)](/<NO (?:BREATH|BREATHING)>/i)),this[_0x25da72(0x1ad)][_0x1a5087];},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x233)]=function(){const _0x58fe58=_0x1a4b4d,_0x5749f7='breathingData';if(this[_0x58fe58(0x26a)](_0x5749f7))return this[_0x58fe58(0x1ad)][_0x5749f7];return this[_0x58fe58(0x1ad)][_0x5749f7]=this[_0x58fe58(0x259)](),this[_0x58fe58(0x1ad)][_0x5749f7];},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x259)]=function(){const _0x46786d=_0x1a4b4d,_0x4bd041=/<VISUAL (?:BREATH|BREATHING) EFFECT>\s*([\s\S]*)\s*<\/VISUAL (?:BREATH|BREATHING) EFFECT>/i,_0x1c9390={'breathing':![],'speedX':0xa,'speedY':0xa,'rateX':0x0,'rateY':0.02,'hpLinked':![]};for(const _0x286186 of this[_0x46786d(0x24e)]()){if(!_0x286186)continue;if(_0x286186[_0x46786d(0x1cf)][_0x46786d(0x255)](_0x4bd041)){if(_0x46786d(0x25b)!==_0x46786d(0x279)){_0x1c9390['breathing']=!![];const _0x5bf285=String(RegExp['$1']);if(_0x5bf285[_0x46786d(0x255)](/SPEED:[ ](.*)/i)){if(_0x46786d(0x169)!==_0x46786d(0x211))_0x1c9390['speedX']=Number(RegExp['$1'])||0x0,_0x1c9390[_0x46786d(0x18e)]=Number(RegExp['$1'])||0x0;else{const _0x23f654=this[_0x46786d(0x1a0)]-_0xb1cfd8/_0x2ce285[_0x46786d(0x21f)](0x1,_0x3afc42/0x2);this['_hoverMinimum']=_0x3d27f5[_0x46786d(0x21f)](_0x23f654,0x0);}}_0x5bf285[_0x46786d(0x255)](/(?:SPEEDX|SPEED X):[ ](.*)/i)&&(_0x1c9390[_0x46786d(0x1a6)]=Number(RegExp['$1'])||0x0);_0x5bf285[_0x46786d(0x255)](/(?:SPEEDY|SPEED Y):[ ](.*)/i)&&(_0x1c9390[_0x46786d(0x18e)]=Number(RegExp['$1'])||0x0);_0x5bf285[_0x46786d(0x255)](/RATE:[ ](.*)/i)&&('isQwH'!=='boEZj'?(_0x1c9390[_0x46786d(0x188)]=Number(RegExp['$1'])||0x0,_0x1c9390[_0x46786d(0x260)]=Number(RegExp['$1'])||0x0):_0x810f57[_0x46786d(0x1f3)][_0x46786d(0x1f7)](0x0));_0x5bf285[_0x46786d(0x255)](/(?:RATEX|RATE X):[ ](.*)/i)&&(_0x1c9390[_0x46786d(0x188)]=Number(RegExp['$1'])||0x0);_0x5bf285[_0x46786d(0x255)](/(?:RATEY|RATE Y):[ ](.*)/i)&&(_0x1c9390['rateY']=Number(RegExp['$1'])||0x0);if(_0x5bf285['match'](/(?:HPLINK|HP LINK|HPLINKED|HP LINKED): ON/i))_0x46786d(0x15d)===_0x46786d(0x165)?this[_0x46786d(0x271)]()[_0x46786d(0x1db)](_0x1cec28,_0x556db6):_0x1c9390['hpLinked']=!![];else{if(_0x5bf285[_0x46786d(0x255)](/(?:HPLINK|HP LINK|HPLINKED|HP LINKED): OFF/i)){if('xmQnt'===_0x46786d(0x1c9))_0x1c9390['hpLinked']=![];else{const _0x157d10=_0x46786d(0x20f);if(this[_0x46786d(0x26a)](_0x157d10))return this[_0x46786d(0x1ad)][_0x157d10];return this['_cache'][_0x157d10]=this['createVisualStateRainbow'](),this[_0x46786d(0x1ad)][_0x157d10];}}}break;}else this[_0x46786d(0x1ad)]={},_0x302e4f['VisualStateEffects'][_0x46786d(0x1ef)][_0x46786d(0x272)](this);}}return _0x1c9390;},VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x212)]=Game_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x267)],Game_Battler['prototype'][_0x1a4b4d(0x267)]=function(_0x1e3f60){const _0x15e3c9=_0x1a4b4d;VisuMZ[_0x15e3c9(0x1eb)]['Game_Battler_onAddState'][_0x15e3c9(0x272)](this,_0x1e3f60),this['setupVisualStateEffect'](_0x1e3f60,!![]);},VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x174)]=Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x225)],Game_BattlerBase['prototype'][_0x1a4b4d(0x225)]=function(){const _0x3dd0a3=_0x1a4b4d;this[_0x3dd0a3(0x275)]=!![],VisuMZ['VisualStateEffects'][_0x3dd0a3(0x174)][_0x3dd0a3(0x272)](this),this[_0x3dd0a3(0x275)]=undefined;},VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x264)]=Game_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x1c0)],Game_Battler['prototype']['onRemoveState']=function(_0x3be4ee){const _0xe68d4d=_0x1a4b4d;if(!this[_0xe68d4d(0x275)])this[_0xe68d4d(0x1ff)](_0x3be4ee,![]);VisuMZ[_0xe68d4d(0x1eb)]['Game_Battler_onRemoveState']['call'](this,_0x3be4ee);},VisuMZ[_0x1a4b4d(0x1eb)]['Sprite_Battler_initMembers']=Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x1aa)],Sprite_Battler['prototype']['initMembers']=function(){const _0x4f0301=_0x1a4b4d;VisuMZ[_0x4f0301(0x1eb)]['Sprite_Battler_initMembers'][_0x4f0301(0x272)](this),this[_0x4f0301(0x16f)](),this[_0x4f0301(0x213)]();},Sprite_Battler['prototype'][_0x1a4b4d(0x16f)]=function(){this['_visualStateAnimationRepeatDuration']=0x0,this['_visualStateAnimationIndex']=0x0;},Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x1db)]=function(_0x1b8a52,_0x213b26){const _0x4573fb=_0x1a4b4d,_0x2388c2=VisuMZ['VisualStateEffects'][_0x4573fb(0x160)][_0x4573fb(0x246)],_0x58d502=_0x213b26?_0x4573fb(0x249):'Debuff',_0x30e870=_0x213b26?Game_BattlerBase[_0x4573fb(0x1c2)]:Game_BattlerBase['ICON_DEBUFF_START'],_0x51d2a8=_0x30e870+_0x1b8a52,_0x533830=TextManager[_0x4573fb(0x241)](_0x1b8a52),_0xe314cf=_0x2388c2['%1PopupFmt'[_0x4573fb(0x199)](_0x58d502)];if(_0xe314cf[_0x4573fb(0x25e)]<=0x0)return;let _0x3de7d5=_0xe314cf[_0x4573fb(0x199)](_0x533830);const _0x3c6277={'textColor':_0x2388c2['%1TextColor'[_0x4573fb(0x199)](_0x58d502)]||0x0,'flashColor':_0x2388c2[_0x4573fb(0x252)[_0x4573fb(0x199)](_0x58d502)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x2388c2[_0x4573fb(0x1c7)[_0x4573fb(0x199)](_0x58d502)]||0x0},_0x44994c=ImageManager[_0x4573fb(0x159)](_0x4573fb(0x19e));_0x44994c['addLoadListener'](this[_0x4573fb(0x258)][_0x4573fb(0x1b1)](this,_0x51d2a8,_0x3de7d5,_0x3c6277));},Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x21e)]=function(_0x24de86,_0x56d3d7){const _0x20e12d=_0x1a4b4d,_0x31b741=VisuMZ[_0x20e12d(0x1eb)][_0x20e12d(0x160)][_0x20e12d(0x19b)],_0xdefaa5=$dataStates[_0x24de86];if(!_0xdefaa5)return;const _0x2dc18d=_0x56d3d7?_0x20e12d(0x25f):_0x20e12d(0x216),_0x5dad32=_0xdefaa5[_0x20e12d(0x161)];if(_0x5dad32<=0x0)return;const _0x5b6cca=_0x31b741[_0x20e12d(0x234)['format'](_0x2dc18d)];if(_0x5b6cca['length']<=0x0)return;let _0x51a5ac=_0x5b6cca[_0x20e12d(0x199)](_0xdefaa5[_0x20e12d(0x200)]);const _0x41685c={'textColor':_0x31b741[_0x20e12d(0x1bb)]||0x0,'flashColor':_0x31b741[_0x20e12d(0x158)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x31b741[_0x20e12d(0x238)]||0x0};_0x31b741[_0x20e12d(0x20c)]&&(_0x41685c[_0x20e12d(0x1ee)]=ColorManager[_0x20e12d(0x193)](_0xdefaa5));VisuMZ[_0x20e12d(0x1eb)][_0x20e12d(0x180)](_0xdefaa5,_0x41685c);const _0x6f3235=ImageManager[_0x20e12d(0x159)]('IconSet');_0x6f3235[_0x20e12d(0x182)](this[_0x20e12d(0x258)][_0x20e12d(0x1b1)](this,_0x5dad32,_0x51a5ac,_0x41685c));},VisuMZ[_0x1a4b4d(0x1eb)]['customizeStatePopup']=function(_0x231830,_0x116619){const _0x13c275=_0x1a4b4d,_0x305f45=_0x231830['note'];if(_0x305f45[_0x13c275(0x255)](/<STATE POPUP>\s*([\s\S]*)\s*<\/STATE POPUP>/i)){const _0xed315e=String(RegExp['$1'])[_0x13c275(0x1f9)]()['split'](/[\r\n]+/);for(const _0x552028 of _0xed315e){if('HMMkL'===_0x13c275(0x1c1)){if(_0x552028[_0x13c275(0x255)](/(?:TEXT COLOR|TEXTCOLOR):[ ](.*)/i)){if(_0x13c275(0x247)!=='oLbza'){const _0x2e83aa=_0x58ef8d(_0x741b09['$1']);_0x4306ec['requestFauxAnimation']([_0xb062b4],_0x2e83aa,_0x392a39,_0x1ed32d);}else _0x116619['textColor']=String(RegExp['$1'])[_0x13c275(0x1f9)]();}if(_0x552028[_0x13c275(0x255)](/(?:FLASH COLOR|FLASHCOLOR):[ ](.*)/i)){if(_0x13c275(0x1f5)===_0x13c275(0x1f5)){_0x116619[_0x13c275(0x1f3)]=String(RegExp['$1'])['trim']()[_0x13c275(0x1d8)](',')[_0x13c275(0x257)](_0x59e90e=>Number(_0x59e90e));while(_0x116619[_0x13c275(0x1f3)][_0x13c275(0x25e)]<=0x4){if(_0x13c275(0x1ab)!==_0x13c275(0x1ab))return _0x14779b['status']&&_0x3681e7[_0x13c275(0x268)][_0x13c275(0x16e)]('['+_0x387a0d+']');else _0x116619[_0x13c275(0x1f3)]['push'](0x0);};_0x116619[_0x13c275(0x1fd)]=_0x116619[_0x13c275(0x1fd)]||0x1;}else{if(!this[_0x13c275(0x24f)])return;const _0x4c9617=this[_0x13c275(0x16d)](),_0x234090=this[_0x13c275(0x24f)][_0x13c275(0x242)]();_0x4c9617&&_0x4c9617[_0x13c275(0x16c)](_0x234090),this[_0x13c275(0x19a)]&&this[_0x13c275(0x19a)][_0x13c275(0x16c)](_0x234090);}}_0x552028['match'](/(?:FLASH DURATION|FLASHDURATION):[ ](\d+)/i)&&(_0x116619[_0x13c275(0x1fd)]=Number(RegExp['$1']));}else return this[_0x13c275(0x1ad)]=this[_0x13c275(0x1ad)]||{},this[_0x13c275(0x1ad)][_0x5b289e]!==_0x3887b3;}}},Sprite_Battler[_0x1a4b4d(0x1d9)]['updateRepeatingVisualStateAnimation']=function(){const _0x2a4d76=_0x1a4b4d;if(!this[_0x2a4d76(0x183)]())return;if(this[_0x2a4d76(0x201)]>0x0){if('GHYeG'===_0x2a4d76(0x23a))this[_0x2a4d76(0x153)]=0x0;else{this[_0x2a4d76(0x201)]--;return;}}const _0x4f7234=this['_battler']['getVisualRepeatingStateAnimation'](),_0x3343e7=this['_battler'][_0x2a4d76(0x1d2)]();if(_0x4f7234[_0x2a4d76(0x25e)]<=0x0)return;this[_0x2a4d76(0x153)]>=_0x4f7234[_0x2a4d76(0x25e)]&&(this[_0x2a4d76(0x153)]=0x0);const _0x54dade=_0x4f7234[this[_0x2a4d76(0x153)]],_0x349e47=VisuMZ[_0x2a4d76(0x1eb)]['Settings'][_0x2a4d76(0x19b)],_0x2aa115=[this[_0x2a4d76(0x24f)]],_0x55e7c0=_0x349e47[_0x2a4d76(0x194)],_0xb81d75=_0x349e47[_0x2a4d76(0x168)];$gameTemp[_0x2a4d76(0x1bd)](_0x2aa115,_0x54dade,_0x55e7c0,_0xb81d75);const _0x198452=_0x3343e7[this['_visualStateAnimationIndex']]||_0x349e47[_0x2a4d76(0x177)];this[_0x2a4d76(0x201)]=_0x198452,this[_0x2a4d76(0x153)]++;},Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x183)]=function(){const _0x5aa8eb=_0x1a4b4d;if(!this[_0x5aa8eb(0x24f)])return![];if(!this['_battler'][_0x5aa8eb(0x197)]())return![];if(!this[_0x5aa8eb(0x24f)]['isAppeared']())return![];if(!this['_battler'][_0x5aa8eb(0x231)]())return![];if(this[_0x5aa8eb(0x15b)][_0x5aa8eb(0x200)]===_0x5aa8eb(0x1cb))return![];if(this[_0x5aa8eb(0x25a)]<=0x0)return![];return!![];},Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x192)]=function(){const _0x4d3234=_0x1a4b4d;if(this[_0x4d3234(0x276)]){if(_0x4d3234(0x184)!==_0x4d3234(0x184)){const _0x5c24b4=this[_0x4d3234(0x1c6)];if(!_0x5c24b4)return;const _0x175e20=_0x5c24b4['stateMotionIndex']();if(_0x175e20>=0x4){if(!_0x5c24b4[_0x4d3234(0x171)]()&&!_0x5c24b4[_0x4d3234(0x16a)]())return this['startMotion'](_0x5c24b4[_0x4d3234(0x221)]);}_0x99b88a['VisualStateEffects'][_0x4d3234(0x1f0)][_0x4d3234(0x272)](this);}else this['updateVisualStateEffectsIcons']();}if(this[_0x4d3234(0x15a)]){if('qALPR'===_0x4d3234(0x208)){if(typeof this[_0x4d3234(0x1fc)]===_0x4d3234(0x15e))return this[_0x4d3234(0x203)]();else{if(this[_0x4d3234(0x1bf)]!==_0x4d3234(0x170)){this[_0x4d3234(0x17a)]=!![];const _0x1af9ef=_0xe748f['loadSystem']('States');_0x1af9ef['addLoadListener'](this[_0x4d3234(0x22f)][_0x4d3234(0x1b1)](this,_0x1af9ef));}else this[_0x4d3234(0x1bf)]===_0x4d3234(0x170)&&_0x24bf45['VisualStateEffects'][_0x4d3234(0x1dd)][_0x4d3234(0x272)](this);}}else this[_0x4d3234(0x151)]();}this[_0x4d3234(0x17d)](),this['updateVisualStateTone'](),this['updateVisualStateRainbow']();},Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x164)]=function(){const _0x2183db=_0x1a4b4d;if(!this[_0x2183db(0x24f)])return;const _0x1a877c=VisuMZ['VisualStateEffects']['Settings'][_0x2183db(0x1d5)],_0x4210b2=this[_0x2183db(0x276)];_0x4210b2[_0x2183db(0x27c)]=this[_0x2183db(0x24f)][_0x2183db(0x280)]()?_0x1a877c[_0x2183db(0x1d1)]:_0x1a877c[_0x2183db(0x1fb)];if(this[_0x2183db(0x24f)][_0x2183db(0x280)]()){_0x4210b2['x']=0x0;this[_0x2183db(0x24f)]['battleUIOffsetX']&&(_0x4210b2['x']+=this[_0x2183db(0x24f)][_0x2183db(0x236)]());_0x4210b2['y']=-Math[_0x2183db(0x1e7)]((this[_0x2183db(0x240)]+0x28)*0.9);_0x4210b2['y']<0x14-this['y']&&(_0x4210b2['y']=0x14-this['y']);if(this[_0x2183db(0x24f)]['battleUIOffsetY']){if('HnkmF'!==_0x2183db(0x22e))_0x4210b2['y']+=this['_battler'][_0x2183db(0x273)]()-0x4;else{const _0x177911=_0x2b499c(_0x47f93e['$1']);_0x177911<_0x151f03?(_0x1273c0(_0x2183db(0x266)[_0x2183db(0x199)](_0x15b349,_0x177911,_0x4675b7)),_0x1bbc2c[_0x2183db(0x21d)]()):_0x35edf8=_0x10d7d0['max'](_0x177911,_0x4de070);}}}},Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x151)]=function(){const _0x52fa69=_0x1a4b4d;if(!this['_battler'])return;const _0x10060a=VisuMZ[_0x52fa69(0x1eb)][_0x52fa69(0x160)]['General'],_0x1438d5=this[_0x52fa69(0x15a)];_0x1438d5[_0x52fa69(0x27c)]=this[_0x52fa69(0x24f)]['isActor']()?_0x10060a[_0x52fa69(0x1b9)]:_0x10060a[_0x52fa69(0x198)];this[_0x52fa69(0x26e)]&&(this[_0x52fa69(0x26e)]['_stateSprite'][_0x52fa69(0x27c)]=![]);this['_battler'][_0x52fa69(0x1fa)]()&&!this[_0x52fa69(0x24f)][_0x52fa69(0x1dc)]()&&(this[_0x52fa69(0x276)]?_0x1438d5['y']=this[_0x52fa69(0x276)]['y']+_0x1438d5[_0x52fa69(0x240)]:_0x1438d5['y']=-this[_0x52fa69(0x240)]+_0x1438d5['height']);;},Sprite_Battler['prototype']['updateVisualStateTone']=function(){const _0xcf953b=_0x1a4b4d;if(!this['_battler'])return;const _0x2c7613=this[_0xcf953b(0x16d)](),_0x2015ef=this[_0xcf953b(0x24f)][_0xcf953b(0x242)]();_0x2c7613&&_0x2c7613[_0xcf953b(0x16c)](_0x2015ef),this['_dragonbonesSpriteContainer']&&this[_0xcf953b(0x19a)]['setColorTone'](_0x2015ef);},Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x16d)]=function(){const _0x20a0c2=_0x1a4b4d;return this[_0x20a0c2(0x223)]||this;},VisuMZ[_0x1a4b4d(0x1eb)]['Sprite_Battler_updateDragonbonesTimeScale']=Sprite_Battler['prototype']['updateDragonbonesTimeScale'],Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x18c)]=function(){const _0x5ec810=_0x1a4b4d;if(!this[_0x5ec810(0x262)])return;this[_0x5ec810(0x24f)][_0x5ec810(0x166)]()?this[_0x5ec810(0x262)]['animation']['timeScale']=0x0:VisuMZ[_0x5ec810(0x1eb)][_0x5ec810(0x17b)][_0x5ec810(0x272)](this);},Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x213)]=function(){this['_hoverMinimum']=-0x1;},VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x1b8)]=Sprite_Battler['prototype'][_0x1a4b4d(0x1a5)],Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x1a5)]=function(){const _0x961260=_0x1a4b4d;let _0x11d163=VisuMZ[_0x961260(0x1eb)][_0x961260(0x1b8)][_0x961260(0x272)](this);return _0x11d163-=Math['floor'](this[_0x961260(0x244)]()),_0x11d163;},Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x244)]=function(){const _0x2fbf5a=_0x1a4b4d;if(this[_0x2fbf5a(0x15b)]===Sprite_SvEnemy)return 0x0;if(!this['_battler'])return 0x0;if(this[_0x2fbf5a(0x24f)][_0x2fbf5a(0x17f)]&&this[_0x2fbf5a(0x24f)][_0x2fbf5a(0x17f)]()){if(_0x2fbf5a(0x154)===_0x2fbf5a(0x196)){if(!this['isRepeatingVisualStateAnimationShown']())return;if(this['_visualStateAnimationRepeatDuration']>0x0){this[_0x2fbf5a(0x201)]--;return;}const _0xa319a8=this[_0x2fbf5a(0x24f)][_0x2fbf5a(0x17e)](),_0x1bd24c=this[_0x2fbf5a(0x24f)]['getVisualRepeatingStateAnimationCycle']();if(_0xa319a8['length']<=0x0)return;this[_0x2fbf5a(0x153)]>=_0xa319a8[_0x2fbf5a(0x25e)]&&(this[_0x2fbf5a(0x153)]=0x0);const _0x46f84b=_0xa319a8[this[_0x2fbf5a(0x153)]],_0x24a0d7=_0x5044a8['VisualStateEffects']['Settings'][_0x2fbf5a(0x19b)],_0x4946be=[this['_battler']],_0x1f01ef=_0x24a0d7[_0x2fbf5a(0x194)],_0x17e128=_0x24a0d7[_0x2fbf5a(0x168)];_0x5d4d2b[_0x2fbf5a(0x1bd)](_0x4946be,_0x46f84b,_0x1f01ef,_0x17e128);const _0xab7c5e=_0x1bd24c[this[_0x2fbf5a(0x153)]]||_0x24a0d7[_0x2fbf5a(0x177)];this[_0x2fbf5a(0x201)]=_0xab7c5e,this['_visualStateAnimationIndex']++;}else return 0x0;}const _0x1892a5=this[_0x2fbf5a(0x24f)][_0x2fbf5a(0x207)]();let _0x4a2d69=0x0;this[_0x2fbf5a(0x20d)]=this['_hoverRand']||Math[_0x2fbf5a(0x263)](Math[_0x2fbf5a(0x205)]()*0x2710);const _0x30e4e7=Graphics['frameCount']+this[_0x2fbf5a(0x20d)],_0x5444a9=_0x1892a5[_0x2fbf5a(0x1c5)],_0x12855b=_0x1892a5[_0x2fbf5a(0x248)];let _0x20a292=_0x1892a5[_0x2fbf5a(0x228)];if(_0x20a292&&this[_0x2fbf5a(0x24f)][_0x2fbf5a(0x1e8)]())_0x20a292=_0x1892a5['deathHover'];if(_0x20a292){_0x4a2d69+=Math[_0x2fbf5a(0x1c3)](_0x30e4e7/(_0x5444a9||0x1))*_0x12855b,_0x4a2d69+=_0x1892a5[_0x2fbf5a(0x254)];if(this[_0x2fbf5a(0x1a0)]<0x0)this[_0x2fbf5a(0x1a0)]=_0x4a2d69;const _0x55a70b=this[_0x2fbf5a(0x1a0)]+_0x5444a9/Math['max'](0x1,_0x12855b**1.5);this[_0x2fbf5a(0x1a0)]=Math['min'](_0x55a70b,_0x4a2d69);}else{if(_0x2fbf5a(0x1c4)===_0x2fbf5a(0x23f))_0x41aa92[_0x2fbf5a(0x16c)](_0x1be7f6);else{const _0x4c32e4=this[_0x2fbf5a(0x1a0)]-_0x5444a9/Math[_0x2fbf5a(0x21f)](0x1,_0x12855b/0x2);this[_0x2fbf5a(0x1a0)]=Math['max'](_0x4c32e4,0x0);}}return Math['max'](0x0,this[_0x2fbf5a(0x1a0)]);},VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x232)]=Sprite_Battler['prototype'][_0x1a4b4d(0x270)],Sprite_Battler['prototype']['updateOpacity']=function(){const _0x3e985f=_0x1a4b4d;VisuMZ['VisualStateEffects'][_0x3e985f(0x232)]['call'](this),this['updateDistortionOpacity']();},Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x217)]=function(){const _0x4c342c=_0x1a4b4d;if(!this[_0x4c342c(0x1df)])return;if(!this[_0x4c342c(0x24f)])return;if(this[_0x4c342c(0x15b)]===Sprite_SvEnemy)return;const _0x21912e=this[_0x4c342c(0x24f)][_0x4c342c(0x20e)]();if(this[_0x4c342c(0x1df)][_0x4c342c(0x25a)]!==_0x21912e){if(_0x4c342c(0x278)!==_0x4c342c(0x278)){this['_visualStateAnimationRepeatDuration']--;return;}else{const _0x4f4683=0x8;if(this[_0x4c342c(0x1df)][_0x4c342c(0x25a)]>_0x21912e)this['_distortionSprite'][_0x4c342c(0x25a)]=Math[_0x4c342c(0x21f)](this[_0x4c342c(0x1df)]['opacity']-_0x4f4683,_0x21912e);else{if(_0x4c342c(0x1b2)==='GLzgs')this[_0x4c342c(0x1df)]['opacity']=Math['min'](this[_0x4c342c(0x1df)][_0x4c342c(0x25a)]+_0x4f4683,_0x21912e);else{const _0x349d4f=_0x35a19b[_0x4c342c(0x1eb)][_0x4c342c(0x160)][_0x4c342c(0x19b)],_0x2b326f=_0x349d4f[_0x4c342c(0x1ec)],_0x3de6c3=_0x349d4f[_0x4c342c(0x26c)],_0x4c8aa5=_0x335c7c[_0x4c342c(0x1cf)];if(_0x28556b&&_0x4c8aa5['match'](/(?:ADD|APPLY) ANIMATION:[ ](\d+)/i)){const _0x43ce34=_0x31a44c(_0x3909aa['$1']);_0x4593ea[_0x4c342c(0x1bd)]([_0x1f0fdc],_0x43ce34,_0x2b326f,_0x3de6c3);}if(!_0x14c9b5&&_0x4c8aa5['match'](/(?:ERASE|REMOVE) ANIMATION:[ ](\d+)/i)){const _0x487eb5=_0x4586c3(_0x33f0c4['$1']);_0x37daeb[_0x4c342c(0x1bd)]([_0x25f569],_0x487eb5,_0x2b326f,_0x3de6c3);}}}}}},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x20e)]=function(){const _0x2b8889=_0x1a4b4d,_0x2a01a5='visualBattlerOpacity';if(this[_0x2b8889(0x26a)](_0x2a01a5))return this['_cache'][_0x2a01a5];return this['_cache'][_0x2a01a5]=this[_0x2b8889(0x167)](),this[_0x2b8889(0x1ad)][_0x2a01a5];},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x167)]=function(){const _0x3664be=_0x1a4b4d;for(const _0x116b44 of this[_0x3664be(0x261)]()){if(_0x3664be(0x27a)===_0x3664be(0x251))_0x3dab72=_0x22cf4b['max'](_0x159788,_0x5cbdda);else{if(!_0x116b44)continue;if(_0x116b44[_0x3664be(0x1cf)]['match'](/<VISUAL OPACITY:[ ](\d+)([%％])>/i)){const _0x13e0c1=Number(RegExp['$1'])*0.01;return Math[_0x3664be(0x1e7)](_0x13e0c1*0xff)[_0x3664be(0x1b5)](0x0,0xff);}if(_0x116b44['note'][_0x3664be(0x255)](/<VISUAL OPACITY:[ ](\d+)>/i)){if(_0x3664be(0x26d)!==_0x3664be(0x26d))_0x2b4bc7['VisualStateEffects'][_0x3664be(0x1a9)]['call'](this,_0x368ed5),this['setupVisualBuffDebuffEffect'](_0x1a2058,![]);else return Number(RegExp['$1'])['clamp'](0x0,0xff);}}}return 0xff;},Sprite_Battler['prototype'][_0x1a4b4d(0x1a7)]=function(){const _0x2e77c5=_0x1a4b4d;if(!this[_0x2e77c5(0x24f)])return;const _0x53f082=this[_0x2e77c5(0x24f)][_0x2e77c5(0x20f)]();if(_0x53f082===0x0&&this[_0x2e77c5(0x1df)][_0x2e77c5(0x1a8)]!==0x0)this[_0x2e77c5(0x1df)]['setHue'](0x0);else{if(_0x2e77c5(0x24a)!=='okxRB')_0x2b3378[_0x2e77c5(0x1ee)]=_0x4ba915(_0x1e1191['$1'])['trim']();else{let _0x55b3e1=this[_0x2e77c5(0x1df)][_0x2e77c5(0x1a8)]+_0x53f082;_0x55b3e1%=0x168,this[_0x2e77c5(0x1df)][_0x2e77c5(0x26b)](_0x55b3e1);}}},Game_BattlerBase[_0x1a4b4d(0x1d9)]['visualStateRainbow']=function(){const _0x33b803=_0x1a4b4d,_0x485f91='visualStateRainbow';if(this[_0x33b803(0x26a)](_0x485f91))return this['_cache'][_0x485f91];return this['_cache'][_0x485f91]=this[_0x33b803(0x155)](),this[_0x33b803(0x1ad)][_0x485f91];},Game_BattlerBase[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x155)]=function(){const _0x16d610=_0x1a4b4d;for(const _0x4a5d8e of this['states']()){if(!_0x4a5d8e)continue;if(_0x4a5d8e['note'][_0x16d610(0x255)](/<VISUAL RAINBOW:[ ]([\+\-]\d+)>/i)){if(_0x16d610(0x20a)==='uIyMo')return Number(RegExp['$1']);else{if(this[_0x16d610(0x15b)]===_0x133fdb)return 0x0;if(!this[_0x16d610(0x24f)])return 0x0;if(this[_0x16d610(0x24f)][_0x16d610(0x17f)]&&this[_0x16d610(0x24f)][_0x16d610(0x17f)]())return 0x0;const _0x29c453=this[_0x16d610(0x24f)][_0x16d610(0x207)]();let _0x3a73b8=0x0;this[_0x16d610(0x20d)]=this[_0x16d610(0x20d)]||_0x4a2886['floor'](_0x14f0c3['random']()*0x2710);const _0x495721=_0x50e4ab[_0x16d610(0x1e9)]+this[_0x16d610(0x20d)],_0x5028c1=_0x29c453[_0x16d610(0x1c5)],_0x1fd16e=_0x29c453[_0x16d610(0x248)];let _0x2532b3=_0x29c453[_0x16d610(0x228)];if(_0x2532b3&&this[_0x16d610(0x24f)][_0x16d610(0x1e8)]())_0x2532b3=_0x29c453[_0x16d610(0x215)];if(_0x2532b3){_0x3a73b8+=_0x4d5597[_0x16d610(0x1c3)](_0x495721/(_0x5028c1||0x1))*_0x1fd16e,_0x3a73b8+=_0x29c453[_0x16d610(0x254)];if(this[_0x16d610(0x1a0)]<0x0)this[_0x16d610(0x1a0)]=_0x3a73b8;const _0x1f2828=this[_0x16d610(0x1a0)]+_0x5028c1/_0x1aec7c[_0x16d610(0x21f)](0x1,_0x1fd16e**1.5);this['_hoverMinimum']=_0x29c71f[_0x16d610(0x1b7)](_0x1f2828,_0x3a73b8);}else{const _0x26cbbd=this[_0x16d610(0x1a0)]-_0x5028c1/_0x2f21e1[_0x16d610(0x21f)](0x1,_0x1fd16e/0x2);this[_0x16d610(0x1a0)]=_0x1dba58[_0x16d610(0x21f)](_0x26cbbd,0x0);}return _0x40ba64['max'](0x0,this[_0x16d610(0x1a0)]);}}}return 0x0;},VisuMZ['VisualStateEffects'][_0x1a4b4d(0x1be)]=Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x163)],Sprite_Battler['prototype']['mainSpriteScaleX']=function(){const _0x57f19f=_0x1a4b4d;let _0x1ed42c=VisuMZ[_0x57f19f(0x1eb)][_0x57f19f(0x1be)][_0x57f19f(0x272)](this);return _0x1ed42c+=this[_0x57f19f(0x175)](),_0x1ed42c;},VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x1f6)]=Sprite_Battler['prototype'][_0x1a4b4d(0x190)],Sprite_Battler[_0x1a4b4d(0x1d9)]['mainSpriteScaleY']=function(){const _0xbd818c=_0x1a4b4d;let _0x1dcbeb=VisuMZ['VisualStateEffects'][_0xbd818c(0x1f6)]['call'](this);return _0x1dcbeb+=this['applyBreathingScaleY'](),_0x1dcbeb;},Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x175)]=function(){const _0x42299d=_0x1a4b4d;if(!this['_battler'])return 0x0;if(this[_0x42299d(0x24f)][_0x42299d(0x209)]())return 0x0;const _0x588487=this[_0x42299d(0x24f)][_0x42299d(0x233)]();if(!_0x588487)return 0x0;if(!_0x588487[_0x42299d(0x229)])return 0x0;let _0x587e84=this[_0x42299d(0x21c)](_0x588487,_0x588487[_0x42299d(0x1a6)],_0x588487[_0x42299d(0x188)]);const _0x4d064d=this[_0x42299d(0x1df)][_0x42299d(0x22c)]['x']>0x0?0x1:-0x1;return _0x587e84*_0x4d064d;},Sprite_Battler['prototype'][_0x1a4b4d(0x195)]=function(){const _0x2db447=_0x1a4b4d;if(!this[_0x2db447(0x24f)])return 0x0;if(this['_battler'][_0x2db447(0x209)]())return 0x0;const _0x657a43=this[_0x2db447(0x24f)]['breathingData']();if(!_0x657a43)return 0x0;if(!_0x657a43[_0x2db447(0x229)])return 0x0;let _0x2e6864=this[_0x2db447(0x21c)](_0x657a43,_0x657a43[_0x2db447(0x18e)],_0x657a43[_0x2db447(0x260)]);return _0x2e6864;},Sprite_Battler[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x21c)]=function(_0x3f104d,_0x263248,_0x1d1642){const _0x5a2a53=_0x1a4b4d;this[_0x5a2a53(0x1d7)]=this['_breathingRand']??Math[_0x5a2a53(0x1f1)](0x2710);let _0x36c750=Graphics['frameCount']+this[_0x5a2a53(0x1d7)];return _0x3f104d[_0x5a2a53(0x1ce)]&&(_0x5a2a53(0x1ea)===_0x5a2a53(0x230)?this[_0x5a2a53(0x276)]?_0x70e42['y']=this[_0x5a2a53(0x276)]['y']+_0x241d2a['height']:_0x21ac64['y']=-this[_0x5a2a53(0x240)]+_0x13a6f0['height']:_0x263248/=this[_0x5a2a53(0x24f)]['hpRate']()),Math[_0x5a2a53(0x1c3)](_0x36c750/_0x263248)*_0x1d1642;},VisuMZ[_0x1a4b4d(0x1eb)]['Sprite_Actor_createStateSprite']=Sprite_Actor[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x22a)],Sprite_Actor[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x22a)]=function(){const _0x4154b3=_0x1a4b4d;VisuMZ[_0x4154b3(0x1eb)][_0x4154b3(0x202)]['call'](this),this[_0x4154b3(0x21b)]();},Sprite_Actor[_0x1a4b4d(0x1d9)]['createStateIconSprite']=function(){const _0x12eb88=_0x1a4b4d;if(this[_0x12eb88(0x15b)]!==Sprite_Actor)return;this['_stateIconSprite']=new Sprite_StateIcon(),this['addChild'](this[_0x12eb88(0x276)]),this[_0x12eb88(0x276)][_0x12eb88(0x23b)][_0x12eb88(0x19d)]=![];},VisuMZ[_0x1a4b4d(0x1eb)]['Sprite_Actor_refreshMotion']=Sprite_Actor[_0x1a4b4d(0x1d9)]['refreshMotion'],Sprite_Actor[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x222)]=function(){const _0x2f22c0=_0x1a4b4d,_0x2f2e5e=this[_0x2f22c0(0x1c6)];if(!_0x2f2e5e)return;const _0x46ed41=_0x2f2e5e[_0x2f22c0(0x1e0)]();if(_0x46ed41>=0x4){if(!_0x2f2e5e[_0x2f22c0(0x171)]()&&!_0x2f2e5e['isActing']()){if(_0x2f22c0(0x18a)===_0x2f22c0(0x219)){const _0xd5996a='visualStateTone';if(this[_0x2f22c0(0x26a)](_0xd5996a))return this[_0x2f22c0(0x1ad)][_0xd5996a];return this[_0x2f22c0(0x1ad)][_0xd5996a]=this[_0x2f22c0(0x25d)](),this['_cache'][_0xd5996a];}else return this[_0x2f22c0(0x27f)](_0x2f2e5e[_0x2f22c0(0x221)]);}}VisuMZ['VisualStateEffects'][_0x2f22c0(0x1e3)][_0x2f22c0(0x272)](this);},VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x1f0)]=Sprite_SvEnemy[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x222)],Sprite_SvEnemy['prototype'][_0x1a4b4d(0x222)]=function(){const _0x155966=_0x1a4b4d,_0x111b0e=this[_0x155966(0x1c6)];if(!_0x111b0e)return;const _0x5e6904=_0x111b0e[_0x155966(0x1e0)]();if(_0x5e6904>=0x4){if(!_0x111b0e[_0x155966(0x171)]()&&!_0x111b0e[_0x155966(0x16a)]()){if(_0x155966(0x237)!==_0x155966(0x237))_0xce3b4e[_0x155966(0x1a6)]=_0x1d9f75(_0x3a784e['$1'])||0x0,_0x5bc888['speedY']=_0x413c22(_0x45ccf3['$1'])||0x0;else return this[_0x155966(0x27f)](_0x111b0e[_0x155966(0x221)]);}}VisuMZ[_0x155966(0x1eb)]['Sprite_SvEnemy_refreshMotion'][_0x155966(0x272)](this);},VisuMZ[_0x1a4b4d(0x1eb)]['Sprite_Actor_setBattler']=Sprite_Actor[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x1a2)],Sprite_Actor['prototype'][_0x1a4b4d(0x1a2)]=function(_0x3a97b2){const _0x59aca9=_0x1a4b4d;VisuMZ[_0x59aca9(0x1eb)][_0x59aca9(0x1b0)]['call'](this,_0x3a97b2);if(this[_0x59aca9(0x276)])this[_0x59aca9(0x276)][_0x59aca9(0x269)](_0x3a97b2);},VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x23d)]=Sprite_Actor[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x235)],Sprite_Actor[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x235)]=function(){const _0x2aa488=_0x1a4b4d;VisuMZ[_0x2aa488(0x1eb)][_0x2aa488(0x23d)]['call'](this),this['updateVisualStateEffects']();},VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x226)]=Sprite_Actor[_0x1a4b4d(0x1d9)]['updateFrame'],Sprite_Actor[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x204)]=function(){const _0x20b279=_0x1a4b4d;if(this['_battler'][_0x20b279(0x166)]()&&this['_mainSprite']&&this[_0x20b279(0x223)][_0x20b279(0x23b)]){if(this['_stateMotionLocked'])return;this[_0x20b279(0x179)]=this[_0x20b279(0x223)]['_frame']['width']>0x0;}else _0x20b279(0x218)===_0x20b279(0x218)?this[_0x20b279(0x179)]=![]:this[_0x20b279(0x1df)][_0x20b279(0x25a)]=_0x54c59c[_0x20b279(0x21f)](this[_0x20b279(0x1df)][_0x20b279(0x25a)]-_0xf73f57,_0x1ab45d);VisuMZ[_0x20b279(0x1eb)][_0x20b279(0x226)][_0x20b279(0x272)](this);},VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x1ae)]=Sprite_Enemy[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x21b)],Sprite_Enemy[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x21b)]=function(){const _0x5221fb=_0x1a4b4d;this[_0x5221fb(0x22a)](),VisuMZ[_0x5221fb(0x1eb)][_0x5221fb(0x1ae)]['call'](this);},Sprite_Enemy[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x22a)]=function(){const _0x43956c=_0x1a4b4d;this[_0x43956c(0x15a)]=new Sprite_StateOverlay(),this[_0x43956c(0x189)](this[_0x43956c(0x15a)]);},VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x206)]=Sprite_Enemy['prototype']['setBattler'],Sprite_Enemy[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x1a2)]=function(_0x4ca44f){const _0x23bd4e=_0x1a4b4d;VisuMZ['VisualStateEffects'][_0x23bd4e(0x206)]['call'](this,_0x4ca44f);if(this['_stateSprite'])this[_0x23bd4e(0x15a)][_0x23bd4e(0x269)](_0x4ca44f);},VisuMZ[_0x1a4b4d(0x1eb)][_0x1a4b4d(0x22d)]=Sprite_Enemy[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x235)],Sprite_Enemy[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x235)]=function(){const _0x15a33a=_0x1a4b4d;VisuMZ[_0x15a33a(0x1eb)]['Sprite_Enemy_update'][_0x15a33a(0x272)](this),this[_0x15a33a(0x192)]();},VisuMZ[_0x1a4b4d(0x1eb)]['Sprite_StateOverlay_loadBitmap']=Sprite_StateOverlay[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x18d)],Sprite_StateOverlay[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x18d)]=function(){const _0x3ab810=_0x1a4b4d;VisuMZ['VisualStateEffects'][_0x3ab810(0x1cd)][_0x3ab810(0x272)](this),this['_bitmapName']=_0x3ab810(0x170);},VisuMZ[_0x1a4b4d(0x1eb)]['Sprite_StateOverlay_updateFrame']=Sprite_StateOverlay[_0x1a4b4d(0x1d9)]['updateFrame'],Sprite_StateOverlay[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x204)]=function(){const _0x2a4dec=_0x1a4b4d;if(typeof this['_overlayIndex']===_0x2a4dec(0x15e))return this[_0x2a4dec(0x203)]();else{if(this[_0x2a4dec(0x1bf)]!==_0x2a4dec(0x170)){this[_0x2a4dec(0x17a)]=!![];const _0x47ec90=ImageManager[_0x2a4dec(0x159)](_0x2a4dec(0x170));_0x47ec90[_0x2a4dec(0x182)](this['onLoadDefaultOverlayBitmap']['bind'](this,_0x47ec90));}else this[_0x2a4dec(0x1bf)]==='States'&&VisuMZ[_0x2a4dec(0x1eb)][_0x2a4dec(0x1dd)]['call'](this);}},Sprite_StateOverlay[_0x1a4b4d(0x1d9)][_0x1a4b4d(0x22f)]=function(_0xf2d031){const _0x48838b=_0x1a4b4d;this[_0x48838b(0x23b)]=_0xf2d031,this[_0x48838b(0x17a)]=![],this[_0x48838b(0x1bf)]=_0x48838b(0x170),VisuMZ[_0x48838b(0x1eb)]['Sprite_StateOverlay_updateFrame'][_0x48838b(0x272)](this);},Sprite_StateOverlay['prototype'][_0x1a4b4d(0x203)]=function(){const _0x271c9b=_0x1a4b4d;if(!this['_loadingCustomOverlay']&&this[_0x271c9b(0x1bf)]!==this[_0x271c9b(0x1fc)]){if(_0x271c9b(0x1ac)!==_0x271c9b(0x1ac))this[_0x271c9b(0x23b)]=_0xb12ae1,this[_0x271c9b(0x17a)]=![],this[_0x271c9b(0x1bf)]=_0x271c9b(0x170),_0xa4bae7[_0x271c9b(0x1eb)]['Sprite_StateOverlay_updateFrame'][_0x271c9b(0x272)](this);else{this[_0x271c9b(0x17a)]=!![];const _0xd2873f=ImageManager[_0x271c9b(0x159)](this['_overlayIndex']);_0xd2873f['addLoadListener'](this[_0x271c9b(0x1af)][_0x271c9b(0x1b1)](this,_0xd2873f));}}if(this['_bitmapName']===this[_0x271c9b(0x1fc)]){if(_0x271c9b(0x181)===_0x271c9b(0x181)){const _0x216157=0x60,_0x2148e7=0x60,_0x3b0bbb=this[_0x271c9b(0x1fe)]*_0x216157,_0x111567=0x0;this[_0x271c9b(0x18b)](_0x3b0bbb,_0x111567,_0x216157,_0x2148e7);}else{const _0x413d60=this[_0x271c9b(0x1c6)];if(!_0x413d60)return;const _0x52a34f=_0x413d60['stateMotionIndex']();if(_0x52a34f>=0x4){if(!_0x413d60[_0x271c9b(0x171)]()&&!_0x413d60[_0x271c9b(0x16a)]())return this['startMotion'](_0x413d60[_0x271c9b(0x221)]);}_0x4acde1['VisualStateEffects'][_0x271c9b(0x1e3)]['call'](this);}}},Sprite_StateOverlay[_0x1a4b4d(0x1d9)]['onLoadCustomOverlayBitmap']=function(_0x3d93f6){const _0x14601f=_0x1a4b4d;this[_0x14601f(0x23b)]=_0x3d93f6,this[_0x14601f(0x17a)]=![],this[_0x14601f(0x1bf)]=this[_0x14601f(0x1fc)],this[_0x14601f(0x203)]();};