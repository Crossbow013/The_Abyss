//=============================================================================
// VisuStella MZ - Bright Effects
// VisuMZ_2_BrightEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BrightEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BrightEffects = VisuMZ.BrightEffects || {};
VisuMZ.BrightEffects.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.05] [BrightEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Bright_Effects_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * This RPG Maker MZ plugin allows you to add various bright effects to your
 * game's maps and battle system. These effects can make the game appear more
 * vivid, light, and gives you control over the color settings of a particular
 * map to make a more distinct feeling, too. The bright effects can be changed
 * midway through events in both maps and battles, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * A Bloom filter effect that can help soften the feel of a map by giving
 *   objects on the screen a slight hazy glow.
 * * Godrays can be used to show animated sunlight coming down from the sky
 *   above.
 * * The Color Adjustment filter allows you to alter the brightness, contrast,
 *   and saturation levels of your maps and battles.
 * * Plugin Commands that allow you to adjust these settings on the go.
 * * Notetags for maps to alter the Bloom, Godray, and Color Adjustments
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
 * * Pixi JS Filters*
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Action Sequence Impact product page. Install it as a
 * Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * New Effects
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Bloom
 * 
 * This filter puts a faint (or large) glow around lighter-colored objects on
 * the map to give them a softer, hazy, brighter feeling.
 * 
 * Properties:
 *
 * Scale: To adjust the strength of the bloom. Higher values is more
 * intense brightness.
 *
 * Brightness: The brightness, lower value is more subtle brightness, higher
 * value is blown-out.
 *
 * Threshold: Defines how bright a color needs to be to affect bloom.
 *
 * ---
 *
 * Godray
 * 
 * The Godray filter puts down rays of light coming from the sky at an angle.
 * This is often used to represent sunlight peaking from above the clouds.
 * 
 * Properties:
 *
 * Visible: If on, the godrays will be visible by default. If off, they won't.
 *
 * Speed: The speed at which the light flickers. Lower for slower rate.
 * Higher for faster speeds.
 *
 * Gain: General intensity of the effect.
 *
 * Lacunarity: The density of the fractal noise.
 *
 * Angle: The angle/light-source direction of the rays.
 *
 * ---
 *
 * Color Adjustment
 * 
 * The Color Adjustment filter allows you to control the colors on the screen
 * to be more/less bright, contrast more/less, and more/less saturated.
 * 
 * Properties:
 *
 * Brightness: Adjusts the overall brightness of the screen. Use lower numbers
 * to make it darker and higher numbers to increase the brightness.
 *
 * Contrast: Increases the separation between dark and bright. Darker colors
 * become darker. Lighter colors become lighter. Increase this number to make
 * the effect more intense or decrease it to lessen it.
 *
 * Saturate: Adjusts the intensity of color on the screen. User higher numbers
 * to make colors more intense and lower numbers to make it less.
 *
 * ---
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
 * VisuMZ_1_OptionsCore
 * 
 * As of the VisuStella MZ Options Core v1.10 update, both the Bright Effects
 * and Horror Effects plugins will be affected by the "Special Effects" option
 * found under the Options Core's General Settings. If the "Special Effects"
 * option is set to OFF, then the filter effects applied by those plugins will
 * also be disabled. They will be reenabled when the option is set back to ON.
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
 * === Bloom-Related Notetags ===
 * 
 * ---
 *
 * <Bloom Scale: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom scale to x for map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less bloom
 *   - Higher - More bloom
 *
 * ---
 *
 * <Bloom Brightness: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom brightness to x for map/battle
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Bloom Threshold: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes the bloom threshold to x for map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less picky
 *   - Higher - More picky
 *
 * ---
 *
 * <Bloom Horz Scale: x to y>
 * <Bloom Vert Scale: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting scale when traveling left to right on the map
 *   (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less bloom
 *   - Higher - More bloom
 *
 * ---
 *
 * <Bloom Horz Brightness: x to y>
 * <Bloom Vert Brightness: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting brightness when traveling left to right on the
 *   map (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Bloom Horz Threshold: x to y>
 * <Bloom Vert Threshold: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Sets an adjusting threshold when traveling left to right on the
 *   map (Horz) or up to down on the map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less picky
 *   - Higher - More picky
 *
 * ---
 * 
 * === Godray-Related Notetags ===
 * 
 * ---
 *
 * <Godray>
 * <No Godray>
 *
 * - Used for: Map Notetags and Troop Names
 * - Changes if there will be a godray on the map/battle regardless of the
 *   default settings in the plugin parameters.
 *
 * ---
 *
 * <Godray Speed: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the flickering speed of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Slower
 *   - Higher - Faster
 *
 * ---
 *
 * <Godray Gain: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the gain/intensity of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Lighter
 *   - Higher - Intense
 *
 * ---
 *
 * <Godray Lacunarity: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the lacunarity/density of the rays.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less dense
 *   - Higher - More dense
 *
 * ---
 *
 * <Godray Angle: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Sets the angle of the rays.
 * - Replace 'x' with a number to represent the value. Use a negative or
 *   positive integer value.
 *   - Negative - Coming from the left
 *   - Positive - Coming from the right
 *
 * ---
 *
 * <Godray Horz Speed: x to y>
 * <Godray Vert Speed: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray speed going left to right on a map (Horz) or up
 *   to down on a map (Vert). 
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Slower
 *   - Higher - Faster
 *
 * ---
 *
 * <Godray Horz Gain: x to y>
 * <Godray Vert Gain: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray gain going left to right on a map (Horz) or up to
 *   down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Lighter
 *   - Higher - Intense
 *
 * ---
 *
 * <Godray Horz Lacunarity: x to y>
 * <Godray Vert Lacunarity: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray lacunarity going left to right on a map (Horz) or
 *   up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less dense
 *   - Higher - More dense
 *
 * ---
 *
 * <Godray Horz Angle: x to y>
 * <Godray Vert Angle: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts godray angle going left to right on a map (Horz) or up
 *   to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use a negative or
 *   positive integer values.
 *   - Negative - Coming from the left
 *   - Positive - Coming from the right
 *
 * ---
 * 
 * === Color Adjust-Related Notetags ===
 * 
 * ---
 *
 * <Color Adjust Brightness: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Alters the screen brightness for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Contrast: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Adjusts the screen contrast for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Less contrast
 *   - Higher - More contrast
 *
 * ---
 *
 * <Color Adjust Saturate: x>
 *
 * - Used for: Map Notetags and Troop Names
 * - Adjusts the screen saturation for the map/battle.
 * - Replace 'x' with a number to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Horz Brightness: x to y>
 * <Color Adjust Vert Brightness: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Alters the screen brightness when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Darker
 *   - Higher - Brighter
 *
 * ---
 *
 * <Color Adjust Horz Contrast: x to y>
 * <Color Adjust Vert Contrast: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts the screen contrast when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less contrast
 *   - Higher - More contrast
 *
 * ---
 *
 * <Color Adjust Horz Saturate: x to y>
 * <Color Adjust Vert Saturate: x to y>
 *
 * - Used for: Map Notetags
 * - Map only. Adjusts the screen saturation when moving left to right on a map
 *   (Horz) or up to down on a map (Vert).
 * - Replace 'x' and 'y' with numbers to represent the value. Use decimals.
 *   - Lower - Less intensity
 *   - Higher - More intensity
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
 * === Bloom Plugin Commands ===
 * 
 * ---
 *
 * Bloom: Change Settings
 * - Change the Bloom filter settings for the screen.
 *
 *   Bloom Scale:
 *   - Change bloom scale for the screen.
 *
 *   Bloom Brightness:
 *   - Change bloom brightness for the screen.
 *
 *   Bloom Threshold:
 *   - Change bloom threshold for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *
 * ---
 *
 * Bloom: Reset
 * - Reset the Bloom filter settings for the settings found in the Plugin
 *   Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *
 * ---
 * 
 * === Godray Plugin Commands ===
 * 
 * ---
 *
 * Godray: Change Settings
 * - Change the Godray filter settings for the screen.
 *
 *   Visible?:
 *   - Show godrays on the screen?
 *   - Visibility changes are immediate.
 *
 *   Godray Speed:
 *   - Change godray speed for the screen.
 *
 *   Godray Gain:
 *   - Change godray gain for the screen.
 *
 *   Godray Lacunarity:
 *   - Change godray lacunarity for the screen.
 *
 *   Godray Angle:
 *   - Change godray angle for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *   - Visibility changes are immediate.
 *
 * ---
 *
 * Godray: Reset
 * - Reset the Godray filter settings for the settings found in the Plugin
 *   Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *   - Visibility changes are immediate.
 *
 * ---
 * 
 * === Color Adjust Plugin Commands ===
 * 
 * ---
 *
 * Color Adjust: Change Settings
 * - Change the Color Adjustment filter settings for the screen.
 *
 *   Adjust Brightness:
 *   - Change color adjust brightness for the screen.
 *
 *   Adjust Contrast:
 *   - Change color adjust contrast for the screen.
 *
 *   Adjust Saturation:
 *   - Change color adjust saturation for the screen.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the change to occur.
 *
 * ---
 *
 * Color Adjust: Reset
 * - Reset the Color Adjustment filter settings for the settings found in the
 *   Plugin Parameters or map notetags.
 *
 *   Shift Duration:
 *   - The amount of time it takes for the reset to occur.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 * 
 * This section is for the general plugin parameter settings.
 * 
 * ---
 * 
 * General
 * 
 *   Apply Base-Only?
 *   - Base-Only excludes pictures, timers, and weather.
 *   - Whole includes the above.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Bloom Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Bloom Settings
 * 
 *   Bloom Scale:
 *   - Default bloom scale for the screen unless changed through tags.
 * 
 *   Bloom Brightness:
 *   - Default bloom brightness for the screen unless changed through tags.
 * 
 *   Bloom Threshold:
 *   - Default bloom threshold for the screen unless changed through tags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Godray Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Godray Settings
 * 
 *   Default Visible?:
 *   - Show godrays on all screens by default unless changed through tags?
 * 
 *   Godray Speed:
 *   - Default godray speed for all screens unless changed through tags.
 * 
 *   Godray Gain:
 *   - Default godray gain for all screens unless changed through tags.
 * 
 *   Godray Lacunarity:
 *   - Default godray lacunarity for all screens unless changed through tags.
 * 
 *   Godray Angle:
 *   - Default godray angle for all screens unless changed through tags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Adjust Settings
 * ============================================================================
 *
 * There are two versions of these plugin parameters. One of them are for the
 * Map Defaults and the other is for the Battle Defaults. These settings are
 * applied to the map and battle scenes respectively and will serve as the
 * stock setting when no map notetags, troop name tags, or Plugin Commands have
 * been used to alter them.
 *
 * ---
 *
 * Color Adjust Settings
 * 
 *   Adjust Brightness:
 *   - Default color adjust brightness for all screens unless changed
 *     through tags.
 * 
 *   Adjust Contrast:
 *   - Default color adjust contrast for all screens unless changed
 *     through tags.
 * 
 *   Adjust Saturation:
 *   - Default color adjust saturation for all screens unless changed
 *     through tags.
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
 * Version 1.05: April 28, 2022
 * * Bug Fixes!
 * ** No longer crashes with event test play. Fix made by Olivia.
 * 
 * Version 1.04: March 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features:
 * ** New Plugin Parameters added: "Apply Base-Only?"
 * *** Base-Only excludes pictures, timers, and weather.
 * *** Whole includes the above.
 * 
 * Version 1.03: April 2, 2021
 * * Bug Fixes!
 * ** Changing scenes while a filter change is in transition will automatically
 *    load up the changes made to the filter to prevent desynchronization.
 *    Fix made by Olivia.
 * 
 * Version 1.02: March 12, 2021
 * * Compatibility Update!
 * ** Added compatibility with the VisuStella MZ Options Core v1.10 update.
 * *** When the "Special Effects" option is set to OFF, the filters for this
 *     plugin will be shut off. They will be returned to normal when set to ON.
 * * Documentation Update!
 * ** Added the Options Core section to the "Extra Features" list.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Bright effects from battle should no longer carry back over into the
 *    map scene. Fix made by Yanfly.
 *
 * Version 1.00: January 18, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BloomChange
 * @text Bloom: Change Settings
 * @desc Change the Bloom filter settings for the screen.
 *
 * @arg Scale:num
 * @text Bloom Scale
 * @desc Change bloom scale for the screen.
 * @default 0.5
 *
 * @arg Brightness:num
 * @text Bloom Brightness
 * @desc Change bloom brightness for the screen.
 * @default 1.0
 *
 * @arg Threshold:num
 * @text Bloom Threshold
 * @desc Change bloom threshold for the screen.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BloomReset
 * @text Bloom: Reset
 * @desc Reset the Bloom filter settings for the settings found in
 * the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GodrayChange
 * @text Godray: Change Settings
 * @desc Change the Godray filter settings for the screen.
 *
 * @arg Visible:eval
 * @text Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show godrays on the screen?
 * Visibility changes are immediate.
 * @default true
 *
 * @arg Speed:num
 * @text Godray Speed
 * @desc Change godray speed for the screen.
 * @default 0.01
 *
 * @arg Gain:num
 * @text Godray Gain
 * @desc Change godray gain for the screen.
 * @default 0.6
 *
 * @arg Lacunarity:num
 * @text Godray Lacunarity
 * @desc Change godray lacunarity for the screen.
 * @default 2.0
 *
 * @arg Angle:num
 * @text Godray Angle
 * @desc Change godray angle for the screen.
 * @default -30
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * Visibility changes are immediate.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GodrayReset
 * @text Godray: Reset
 * @desc Reset the Godray filter settings for the settings
 * found in the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * Visibility changes are immediate.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ColorAdjustChange
 * @text Color Adjust: Change Settings
 * @desc Change the Color Adjustment filter settings for the screen.
 *
 * @arg Brightness:num
 * @text Adjust Brightness
 * @desc Change color adjust brightness for the screen.
 * @default 1.0
 *
 * @arg Contrast:num
 * @text Adjust Contrast
 * @desc Change color adjust contrast for the screen.
 * @default 0.0
 *
 * @arg Saturate:num
 * @text Adjust Saturation
 * @desc Change color adjust saturation for the screen.
 * @default 0.0
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the change to occur.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ColorAdjustReset
 * @text Color Adjust: Reset
 * @desc Reset the Color Adjustment filter settings for the settings
 * found in the Plugin Parameters or map notetags.
 *
 * @arg Duration:num
 * @text Shift Duration
 * @type number
 * @desc The amount of time it takes for the reset to occur.
 * @default 60
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
 * @param BrightEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Map
 * @text Map Defaults
 *
 * @param MapBaseFilter:eval
 * @text Apply Base-Only?
 * @parent Map
 * @type boolean
 * @on Base-Only
 * @off Apply Whole
 * @desc Base-Only excludes pictures, timers, and weather.
 * Whole includes the above.
 * @default true
 *
 * @param MapBloom:struct
 * @text Bloom Settings
 * @parent Map
 * @type struct<Bloom>
 * @desc Default bloom settings for all maps.
 * @default {"Scale:num":"0.5","Brightness:num":"1.0","Threshold:num":"0.5"}
 *
 * @param MapGodray:struct
 * @text Godray Settings
 * @parent Map
 * @type struct<Godray>
 * @desc Default Godray settings for all maps.
 * @default {"Visible:eval":"false","Speed:num":"0.01","Gain:num":"0.6","Lacunarity:num":"2.0","Angle:num":"-30"}
 *
 * @param MapColorAdjust:struct
 * @text Color Adjust Settings
 * @parent Map
 * @type struct<ColorAdjust>
 * @desc Default color adjustment settings for all maps.
 * @default {"Brightness:num":"1.0","Contrast:num":"0.0","Saturate:num":"0.0"}
 * 
 * @param Battle
 * @text Battle Defaults
 *
 * @param BattleBaseFilter:eval
 * @text Apply Base-Only?
 * @parent Battle
 * @type boolean
 * @on Base-Only
 * @off Apply Whole
 * @desc Base-Only excludes pictures, timers, and weather.
 * Whole includes the above.
 * @default true
 *
 * @param BattleBloom:struct
 * @text Bloom Settings
 * @parent Battle
 * @type struct<Bloom>
 * @desc Default bloom settings for all battles.
 * @default {"Scale:num":"0.5","Brightness:num":"1.0","Threshold:num":"0.5"}
 *
 * @param BattleGodray:struct
 * @text Godray Settings
 * @parent Battle
 * @type struct<Godray>
 * @desc Default Godray settings for all battles.
 * @default {"Visible:eval":"false","Speed:num":"0.01","Gain:num":"0.6","Lacunarity:num":"2.0","Angle:num":"-30"}
 *
 * @param BattleColorAdjust:struct
 * @text Color Adjust Settings
 * @parent Battle
 * @type struct<ColorAdjust>
 * @desc Default color adjustment settings for all battles.
 * @default {"Brightness:num":"1.0","Contrast:num":"0.0","Saturate:num":"0.0"}
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
 * Bloom Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Bloom:
 *
 * @param Scale:num
 * @text Bloom Scale
 * @desc Default bloom scale for the screen unless changed through tags.
 * @default 0.5
 *
 * @param Brightness:num
 * @text Bloom Brightness
 * @desc Default bloom brightness for the screen unless changed through tags.
 * @default 1.0
 *
 * @param Threshold:num
 * @text Bloom Threshold
 * @desc Default bloom threshold for the screen unless changed through tags.
 * @default 0.5
 *
 */
/* ----------------------------------------------------------------------------
 * Godray Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Godray:
 *
 * @param Visible:eval
 * @text Default Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show godrays on all screens by default unless changed through tags?
 * @default false
 *
 * @param Speed:num
 * @text Godray Speed
 * @desc Default godray speed for all screens unless changed through tags.
 * @default 0.01
 *
 * @param Gain:num
 * @text Godray Gain
 * @desc Default godray gain for all screens unless changed through tags.
 * @default 0.6
 *
 * @param Lacunarity:num
 * @text Godray Lacunarity
 * @desc Default godray lacunarity for all screens unless changed through tags.
 * @default 2.0
 *
 * @param Angle:num
 * @text Godray Angle
 * @desc Default godray angle for all screens unless changed through tags.
 * @default -30
 *
 */
/* ----------------------------------------------------------------------------
 * Color Adjust Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ColorAdjust:
 *
 * @param Brightness:num
 * @text Adjust Brightness
 * @desc Default color adjust brightness for all screens unless changed through tags.
 * @default 1.0
 *
 * @param Contrast:num
 * @text Adjust Contrast
 * @desc Default color adjust contrast for all screens unless changed through tags.
 * @default 0.0
 *
 * @param Saturate:num
 * @text Adjust Saturation
 * @desc Default color adjust saturation for all screens unless changed through tags.
 * @default 0.0
 *
 */
//=============================================================================

var _0x4f6add=_0x4eb0;(function(_0x12549d,_0x209430){var _0x3334d8=_0x4eb0,_0x45df13=_0x12549d();while(!![]){try{var _0x454171=-parseInt(_0x3334d8(0x100))/0x1*(-parseInt(_0x3334d8(0xc8))/0x2)+-parseInt(_0x3334d8(0x157))/0x3*(-parseInt(_0x3334d8(0xd8))/0x4)+parseInt(_0x3334d8(0x109))/0x5*(-parseInt(_0x3334d8(0x140))/0x6)+parseInt(_0x3334d8(0x115))/0x7+-parseInt(_0x3334d8(0x139))/0x8+parseInt(_0x3334d8(0x138))/0x9*(-parseInt(_0x3334d8(0xe6))/0xa)+-parseInt(_0x3334d8(0x186))/0xb*(-parseInt(_0x3334d8(0xf0))/0xc);if(_0x454171===_0x209430)break;else _0x45df13['push'](_0x45df13['shift']());}catch(_0x11f238){_0x45df13['push'](_0x45df13['shift']());}}}(_0xe927,0x19d75));function _0xe927(){var _0x37cc92=['_brightEffectsGodrayHorzSpeed','JIdaf','ColorAdjustChange','GHtbB','BloomReset','prototype','STRUCT','ColorAdjustReset','NUNym','ntCRZ','VwXeg','_brightEffectsBloomHorzThreshold','_BrightEffectsColorAdjustSettingsBattle','QsjGQ','lTExN','updateMapBrightEffectsAdvBloom','constructor','Scene_Battle_start','_brightEffectsGodrayVertSpeed','contrast','BloomChange','setupBrightEffectsFilters','132eHIIos','psqmt','push','_brightEffectsGodrayVertLacunarity','GspEA','_brightEffectsColorAdjustVertBrightness','ColorMatrixFilter','exit','width','filter','Game_Player_update','jfOQy','registerCommand','ARRAYSTRUCT','_baseSprite','SheZh','GodrayReset','QiOwq','BattleGodray','qKSOd','FUNC','_brightEffectsColorAdjustVertSaturate','pdWrO','match','_brightEffectsGodrayHorzAngle','_BrightEffectsColorAdjustSettingsMap','updateBrightEffectsFilters','getBrightEffectsAdvBloomSettings','setupBrightEffectsAdvBloomFilter','NUM','YLLkq','status','gain','Spriteset_Base_createOverallFilters','_realY','createOverallFilters','createBrightEffectsGodrayFilter','2PEJaKE','_brightEffectsGodrayVertGain','_BrightEffectsGodraySettingsBattle','Speed','Angle','brightEffectsBaseOnly','call','sFsAc','note','nlCvV','Ubsmu','max','_BrightEffectsGodraySettingsMap','WgfnD','updateBrightEffectsColorAdjustFilter','_BrightEffectsGodrayFilter','86212srhvfO','tkwBM','WyFzh','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ConvertParams','visible','Scale','Lacunarity','_brightEffectsColorAdjustHorzSaturate','dYWyi','brightness','Vutoe','QGnbR','_brightEffectsColorAdjustHorzContrast','135610CnvbZB','bEzaO','getBrightEffectsGodraySettings','TmHWs','update','MapBaseFilter','DxQba','_BrightEffectsAdvBloomSettingsMap','yYRwW','Spriteset_Base_update','259584RVnCIU','_BrightEffectsAdvBloomSettingsBattle','description','currentSaturate','Settings','QOjRK','currentBrightness','BRIGHT_EFFECTS_BASE_ONLY','ggKZn','kYzJw','Contrast','_scene','updateBrightEffectsGodrayFilter','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_brightEffectsColorAdjustVertContrast','POdnP','28833EHXBEU','height','Gain','duration','includes','updateMapBrightEffectsColorAdjust','LKYmK','filters','lacunarity','985260XIimRR','GQlqF','EufFL','HLERN','currentContrast','xnzOQ','BrightEffects','saturate','AdvancedBloomFilter','updateBrightEffectsAdvBloomFilter','getBrightEffectsColorAdjustSettings','_brightEffectsBloomVertThreshold','887376zSrkRv','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','toUpperCase','specialEffects','OhJZd','_brightEffectsGodrayHorzGain','qKPGn','itbND','setupBrightEffectsGodrayFilter','ARRAYFUNC','locate','_brightEffectsBloomHorzScale','format','Game_CharacterBase_locate','RYfOE','setupBrightEffectsColorAdjustFilter','_BrightEffectsAdvBloomFilter','BlCZr','updateMapBrightEffects','ARRAYNUM','_realX','updateMapBrightEffectsGodray','Duration','oMNwO','setup','map','oKYxW','threshold','Brightness','MapColorAdjust','_brightEffectsBloomVertBrightness','hhrOQ','tQMpU','troop','fpDaB','18zTVAxP','1026176JalhUJ','DXJAW','enabled','parse','createBrightEffectsFilters','Saturate','Game_Map_setup','6MwRlmi','_brightEffectsBloomVertScale','return\x200','MapGodray','lUXbR','yNwYT','DWePe','JWLQz','mKAyC','ARRAYSTR','_brightEffectsBloomHorzBrightness','setBrightEffectsAdvBloomSettings','_brightEffectsColorAdjustHorzBrightness','uBxwn','time','isSceneBattle','BattleBloom','STR','_brightEffectsGodrayVertAngle','AtlVx','createBrightEffectsAdvBloomFilter','speed','BattleColorAdjust','6sCMSdd','Visible','obkpa','MtYFu','angle','name','parameters','RtNHO','createBrightEffectsColorAdjustFilter','SAzTK','Threshold','_BrightEffectsColorAdjustFilter','npayW','JSON','GodrayFilter','FpsGP','GodrayChange','setBrightEffectsColorAdjustSettings','start','BattleBaseFilter','_brightEffectsGodrayHorzLacunarity','bloomScale','setBrightEffectsGodraySettings','MapBloom','NGvge'];_0xe927=function(){return _0x37cc92;};return _0xe927();}var label=_0x4f6add(0x10f),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4f6add(0x18f)](function(_0x446c9f){var _0x24174d=_0x4f6add;return _0x446c9f[_0x24174d(0x1a5)]&&_0x446c9f[_0x24174d(0xf2)][_0x24174d(0x104)]('['+label+']');})[0x0];function _0x4eb0(_0x4d8665,_0x4042e7){var _0xe92780=_0xe927();return _0x4eb0=function(_0x4eb0ba,_0x381250){_0x4eb0ba=_0x4eb0ba-0xc4;var _0xd6f683=_0xe92780[_0x4eb0ba];return _0xd6f683;},_0x4eb0(_0x4d8665,_0x4042e7);}VisuMZ[label][_0x4f6add(0xf4)]=VisuMZ[label][_0x4f6add(0xf4)]||{},VisuMZ[_0x4f6add(0xdc)]=function(_0x5de2e7,_0x196a7){var _0x7692cc=_0x4f6add;for(const _0x5dcf4d in _0x196a7){if(_0x5dcf4d[_0x7692cc(0x19d)](/(.*):(.*)/i)){const _0x10d8e9=String(RegExp['$1']),_0x3001f0=String(RegExp['$2'])[_0x7692cc(0x117)]()['trim']();let _0x460241,_0x4765b0,_0x4ae17b;switch(_0x3001f0){case _0x7692cc(0x1a3):_0x460241=_0x196a7[_0x5dcf4d]!==''?Number(_0x196a7[_0x5dcf4d]):0x0;break;case _0x7692cc(0x128):_0x4765b0=_0x196a7[_0x5dcf4d]!==''?JSON[_0x7692cc(0x13c)](_0x196a7[_0x5dcf4d]):[],_0x460241=_0x4765b0['map'](_0x53c58e=>Number(_0x53c58e));break;case'EVAL':_0x460241=_0x196a7[_0x5dcf4d]!==''?eval(_0x196a7[_0x5dcf4d]):null;break;case'ARRAYEVAL':_0x4765b0=_0x196a7[_0x5dcf4d]!==''?JSON['parse'](_0x196a7[_0x5dcf4d]):[],_0x460241=_0x4765b0[_0x7692cc(0x12e)](_0x143266=>eval(_0x143266));break;case _0x7692cc(0x164):_0x460241=_0x196a7[_0x5dcf4d]!==''?JSON[_0x7692cc(0x13c)](_0x196a7[_0x5dcf4d]):'';break;case'ARRAYJSON':_0x4765b0=_0x196a7[_0x5dcf4d]!==''?JSON[_0x7692cc(0x13c)](_0x196a7[_0x5dcf4d]):[],_0x460241=_0x4765b0['map'](_0x5284f6=>JSON[_0x7692cc(0x13c)](_0x5284f6));break;case _0x7692cc(0x19a):_0x460241=_0x196a7[_0x5dcf4d]!==''?new Function(JSON[_0x7692cc(0x13c)](_0x196a7[_0x5dcf4d])):new Function(_0x7692cc(0x142));break;case _0x7692cc(0x11e):_0x4765b0=_0x196a7[_0x5dcf4d]!==''?JSON[_0x7692cc(0x13c)](_0x196a7[_0x5dcf4d]):[],_0x460241=_0x4765b0[_0x7692cc(0x12e)](_0x1b214b=>new Function(JSON[_0x7692cc(0x13c)](_0x1b214b)));break;case _0x7692cc(0x151):_0x460241=_0x196a7[_0x5dcf4d]!==''?String(_0x196a7[_0x5dcf4d]):'';break;case _0x7692cc(0x149):_0x4765b0=_0x196a7[_0x5dcf4d]!==''?JSON[_0x7692cc(0x13c)](_0x196a7[_0x5dcf4d]):[],_0x460241=_0x4765b0[_0x7692cc(0x12e)](_0xb5fb6b=>String(_0xb5fb6b));break;case _0x7692cc(0x176):_0x4ae17b=_0x196a7[_0x5dcf4d]!==''?JSON['parse'](_0x196a7[_0x5dcf4d]):{},_0x460241=VisuMZ[_0x7692cc(0xdc)]({},_0x4ae17b);break;case _0x7692cc(0x193):_0x4765b0=_0x196a7[_0x5dcf4d]!==''?JSON[_0x7692cc(0x13c)](_0x196a7[_0x5dcf4d]):[],_0x460241=_0x4765b0['map'](_0x433959=>VisuMZ[_0x7692cc(0xdc)]({},JSON[_0x7692cc(0x13c)](_0x433959)));break;default:continue;}_0x5de2e7[_0x10d8e9]=_0x460241;}}return _0x5de2e7;},(_0x24ad63=>{var _0x3776eb=_0x4f6add;const _0x2b067d=_0x24ad63[_0x3776eb(0x15c)];for(const _0x4672aa of dependencies){if(!Imported[_0x4672aa]){if('xnzOQ'===_0x3776eb(0x10e)){alert(_0x3776eb(0xfd)[_0x3776eb(0x121)](_0x2b067d,_0x4672aa)),SceneManager[_0x3776eb(0x18d)]();break;}else var _0x50e0ca=_0x25f8ce[_0x3776eb(0x19e)][0x0],_0x41c1b2=_0x3a6552[_0x3776eb(0x19e)][0x1]-_0x50e0ca,_0x41981b=_0x2696c2['_realX']/_0xf4d681[_0x3776eb(0x18e)](),_0x28b3d9=_0x50e0ca+_0x41c1b2*_0x41981b;}}const _0x5ba7a7=_0x24ad63[_0x3776eb(0xf2)];if(_0x5ba7a7[_0x3776eb(0x19d)](/\[Version[ ](.*?)\]/i)){if('RrAha'!==_0x3776eb(0xe4)){const _0x455dc3=Number(RegExp['$1']);_0x455dc3!==VisuMZ[label]['version']&&(_0x3776eb(0x11b)!==_0x3776eb(0x166)?(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3776eb(0x121)](_0x2b067d,_0x455dc3)),SceneManager[_0x3776eb(0x18d)]()):(this['_brightEffectsBloomHorzScale']=[_0x1b3d29(_0x47fa1a['$1']),_0x32d862(_0x457cf1['$2'])],this['_brightEffectsBloomVertScale']=_0x24df96));}else this[_0x3776eb(0x107)][_0x3776eb(0x188)](this[_0x3776eb(0x125)]);}if(_0x5ba7a7[_0x3776eb(0x19d)](/\[Tier[ ](\d+)\]/i)){const _0x3086c6=Number(RegExp['$1']);_0x3086c6<tier?(alert(_0x3776eb(0x116)['format'](_0x2b067d,_0x3086c6,tier)),SceneManager[_0x3776eb(0x18d)]()):tier=Math[_0x3776eb(0xd3)](_0x3086c6,tier);}VisuMZ[_0x3776eb(0xdc)](VisuMZ[label][_0x3776eb(0xf4)],_0x24ad63[_0x3776eb(0x15d)]);})(pluginData),PluginManager[_0x4f6add(0x192)](pluginData[_0x4f6add(0x15c)],_0x4f6add(0x184),_0x14607f=>{var _0x130b4d=_0x4f6add;VisuMZ['ConvertParams'](_0x14607f,_0x14607f);const _0x45d90c=$gameScreen['getBrightEffectsAdvBloomSettings']();_0x45d90c[_0x130b4d(0x16c)]=_0x14607f[_0x130b4d(0xde)],_0x45d90c['brightness']=_0x14607f['Brightness'],_0x45d90c[_0x130b4d(0x130)]=_0x14607f[_0x130b4d(0x161)],_0x45d90c['duration']=_0x14607f[_0x130b4d(0x12b)],!SceneManager['isSceneBattle']()&&('Difkc'==='Difkc'?($gameMap[_0x130b4d(0x14a)]=undefined,$gameMap[_0x130b4d(0x133)]=undefined):_0x5538a7=_0x296372[_0x130b4d(0xd3)](_0x3ec77a,_0x1d50d4));}),PluginManager[_0x4f6add(0x192)](pluginData[_0x4f6add(0x15c)],_0x4f6add(0x174),_0x2cfa68=>{var _0x2e3326=_0x4f6add;VisuMZ['ConvertParams'](_0x2cfa68,_0x2cfa68);if(SceneManager[_0x2e3326(0x14f)]())$gameTroop['setupBrightEffectsAdvBloomFilter']();else{if(_0x2e3326(0xe3)===_0x2e3326(0x146))return this[_0x2e3326(0xfb)]&&this[_0x2e3326(0xfb)][_0x2e3326(0x180)]===_0x4dc450;else $gameMap[_0x2e3326(0x1a2)]();}const _0xeb350d=$gameScreen['getBrightEffectsAdvBloomSettings']();_0xeb350d[_0x2e3326(0x103)]=_0x2cfa68[_0x2e3326(0x12b)];}),PluginManager['registerCommand'](pluginData[_0x4f6add(0x15c)],_0x4f6add(0x167),_0x4ea06e=>{var _0x109f1b=_0x4f6add;VisuMZ[_0x109f1b(0xdc)](_0x4ea06e,_0x4ea06e);const _0x24c7c8=$gameScreen[_0x109f1b(0xe8)]();_0x24c7c8[_0x109f1b(0xdd)]=_0x4ea06e[_0x109f1b(0x158)],_0x24c7c8[_0x109f1b(0x155)]=_0x4ea06e[_0x109f1b(0xcb)],_0x24c7c8[_0x109f1b(0x1a6)]=_0x4ea06e['Gain'],_0x24c7c8[_0x109f1b(0x108)]=_0x4ea06e['Lacunarity'],_0x24c7c8[_0x109f1b(0x15b)]=_0x4ea06e['Angle'],_0x24c7c8[_0x109f1b(0x103)]=_0x4ea06e[_0x109f1b(0x12b)],!SceneManager[_0x109f1b(0x14f)]()&&($gameMap[_0x109f1b(0x170)]=undefined,$gameMap['_brightEffectsGodrayVertSpeed']=undefined);}),PluginManager[_0x4f6add(0x192)](pluginData['name'],_0x4f6add(0x196),_0x4323a1=>{var _0x553ace=_0x4f6add;VisuMZ['ConvertParams'](_0x4323a1,_0x4323a1);SceneManager[_0x553ace(0x14f)]()?$gameTroop[_0x553ace(0x11d)]():$gameMap['setupBrightEffectsGodrayFilter']();const _0x12656d=$gameScreen['getBrightEffectsGodraySettings']();_0x12656d['duration']=_0x4323a1[_0x553ace(0x12b)];}),PluginManager[_0x4f6add(0x192)](pluginData['name'],_0x4f6add(0x172),_0xc83bdd=>{var _0xa2d9ef=_0x4f6add;VisuMZ['ConvertParams'](_0xc83bdd,_0xc83bdd);const _0x3c1f70=$gameScreen[_0xa2d9ef(0x113)]();_0x3c1f70[_0xa2d9ef(0xe2)]=_0xc83bdd[_0xa2d9ef(0x131)],_0x3c1f70[_0xa2d9ef(0x183)]=_0xc83bdd['Contrast'],_0x3c1f70[_0xa2d9ef(0x110)]=_0xc83bdd[_0xa2d9ef(0x13e)],_0x3c1f70[_0xa2d9ef(0x103)]=_0xc83bdd[_0xa2d9ef(0x12b)],!SceneManager[_0xa2d9ef(0x14f)]()&&($gameMap[_0xa2d9ef(0xe0)]=undefined,$gameMap[_0xa2d9ef(0x19b)]=undefined);}),PluginManager[_0x4f6add(0x192)](pluginData[_0x4f6add(0x15c)],_0x4f6add(0x177),_0x391d06=>{var _0x363ec9=_0x4f6add;VisuMZ['ConvertParams'](_0x391d06,_0x391d06);if(SceneManager['isSceneBattle']()){if(_0x363ec9(0x19c)===_0x363ec9(0x19c))$gameTroop[_0x363ec9(0x124)]();else return this[_0x363ec9(0x19f)]===_0x564c6b&&_0xaf512d['setupBrightEffectsColorAdjustFilter'](),this['_BrightEffectsColorAdjustSettingsMap'];}else _0x363ec9(0x15e)===_0x363ec9(0x145)?(_0x15e1fe[_0x363ec9(0x103)]--,this['_BrightEffectsColorAdjustFilter'][_0x363ec9(0xf6)]=(this[_0x363ec9(0x162)][_0x363ec9(0xf6)]*(_0x50f0a2-0x1)+_0x9c0928[_0x363ec9(0xe2)])/_0x2d8818,this['_BrightEffectsColorAdjustFilter'][_0x363ec9(0x10d)]=(this[_0x363ec9(0x162)][_0x363ec9(0x10d)]*(_0x116967-0x1)+_0xc2d059[_0x363ec9(0x183)])/_0x4c216f,this[_0x363ec9(0x162)]['currentSaturate']=(this[_0x363ec9(0x162)][_0x363ec9(0xf3)]*(_0x11aa67-0x1)+_0x108b15['saturate'])/_0x2ac6f2):$gameMap[_0x363ec9(0x124)]();const _0x39ddb0=$gameScreen[_0x363ec9(0x113)]();_0x39ddb0['duration']=_0x391d06['Duration'];}),SceneManager[_0x4f6add(0x14f)]=function(){var _0x4aab8f=_0x4f6add;return this['_scene']&&this[_0x4aab8f(0xfb)][_0x4aab8f(0x180)]===Scene_Battle;},SceneManager['isSceneMap']=function(){var _0x537b90=_0x4f6add;return this[_0x537b90(0xfb)]&&this['_scene'][_0x537b90(0x180)]===Scene_Map;},Game_Screen[_0x4f6add(0x175)]['setBrightEffectsAdvBloomSettings']=function(_0x8c1bb,_0x2b8ba2,_0x55e04d,_0xd8382a){var _0x119ad9=_0x4f6add;SceneManager[_0x119ad9(0x14f)]()?this[_0x119ad9(0xf1)]={'bloomScale':_0x8c1bb,'brightness':_0x2b8ba2,'threshold':_0x55e04d,'duration':_0xd8382a||0x0}:this['_BrightEffectsAdvBloomSettingsMap']={'bloomScale':_0x8c1bb,'brightness':_0x2b8ba2,'threshold':_0x55e04d,'duration':_0xd8382a||0x0};},Game_Screen[_0x4f6add(0x175)]['setBrightEffectsGodraySettings']=function(_0x5bfbd8,_0x2db65f,_0x2d8b1a,_0x3b7288,_0x4c9e09,_0x9b36a5){var _0x5c11df=_0x4f6add;if(SceneManager[_0x5c11df(0x14f)]()){if(_0x5c11df(0x17e)==='PUezj')var _0x248892=_0x5c4cc7[_0x5c11df(0xfe)][0x0],_0x6c30f=_0x4f1790[_0x5c11df(0xfe)][0x1]-_0x248892,_0x509baf=_0x22950e[_0x5c11df(0xc5)]/_0x1df6b8[_0x5c11df(0x101)](),_0x10046d=_0x248892+_0x6c30f*_0x509baf;else this[_0x5c11df(0xca)]={'visible':_0x5bfbd8,'speed':_0x2db65f,'gain':_0x2d8b1a,'lacunarity':_0x3b7288,'angle':_0x4c9e09,'duration':_0x9b36a5||0x0};}else this['_BrightEffectsGodraySettingsMap']={'visible':_0x5bfbd8,'speed':_0x2db65f,'gain':_0x2d8b1a,'lacunarity':_0x3b7288,'angle':_0x4c9e09,'duration':_0x9b36a5||0x0};},Game_Screen[_0x4f6add(0x175)][_0x4f6add(0x168)]=function(_0x30b77e,_0x5cf609,_0x10501c,_0x5534a5){var _0x7bdac5=_0x4f6add;if(SceneManager[_0x7bdac5(0x14f)]())this[_0x7bdac5(0x17c)]={'brightness':_0x30b77e,'contrast':_0x5cf609,'saturate':_0x10501c,'duration':_0x5534a5||0x0};else{if('ofCxi'===_0x7bdac5(0x163)){var _0x397bc9=_0x28a450['getBrightEffectsAdvBloomSettings'](),_0x5ef814=_0x397bc9[_0x7bdac5(0x103)];_0x5ef814<=0x0?(this['_BrightEffectsAdvBloomFilter'][_0x7bdac5(0x16c)]=_0x397bc9[_0x7bdac5(0x16c)],this[_0x7bdac5(0x125)][_0x7bdac5(0xe2)]=_0x397bc9[_0x7bdac5(0xe2)],this['_BrightEffectsAdvBloomFilter'][_0x7bdac5(0x130)]=_0x397bc9[_0x7bdac5(0x130)]):(_0x397bc9[_0x7bdac5(0x103)]--,this['_BrightEffectsAdvBloomFilter'][_0x7bdac5(0x16c)]=(this['_BrightEffectsAdvBloomFilter'][_0x7bdac5(0x16c)]*(_0x5ef814-0x1)+_0x397bc9['bloomScale'])/_0x5ef814,this[_0x7bdac5(0x125)][_0x7bdac5(0xe2)]=(this[_0x7bdac5(0x125)][_0x7bdac5(0xe2)]*(_0x5ef814-0x1)+_0x397bc9['brightness'])/_0x5ef814,this[_0x7bdac5(0x125)][_0x7bdac5(0x130)]=(this[_0x7bdac5(0x125)]['threshold']*(_0x5ef814-0x1)+_0x397bc9[_0x7bdac5(0x130)])/_0x5ef814);}else this['_BrightEffectsColorAdjustSettingsMap']={'brightness':_0x30b77e,'contrast':_0x5cf609,'saturate':_0x10501c,'duration':_0x5534a5||0x0};}},Game_Screen['prototype'][_0x4f6add(0x1a1)]=function(){var _0x16723f=_0x4f6add;return SceneManager['isSceneBattle']()?(this['_BrightEffectsAdvBloomSettingsBattle']===undefined&&$gameTroop[_0x16723f(0x1a2)](),this['_BrightEffectsAdvBloomSettingsBattle']):(this[_0x16723f(0xed)]===undefined&&(_0x16723f(0x10a)===_0x16723f(0x159)?this[_0x16723f(0x19f)]={'brightness':_0xa3299e,'contrast':_0x1764a3,'saturate':_0x130a4b,'duration':_0x47263c||0x0}:$gameMap[_0x16723f(0x1a2)]()),this['_BrightEffectsAdvBloomSettingsMap']);},Game_Screen[_0x4f6add(0x175)][_0x4f6add(0xe8)]=function(){var _0x3abd90=_0x4f6add;return SceneManager[_0x3abd90(0x14f)]()?(this[_0x3abd90(0xca)]===undefined&&$gameTroop[_0x3abd90(0x11d)](),this[_0x3abd90(0xca)]):(this[_0x3abd90(0xd4)]===undefined&&(_0x3abd90(0x173)===_0x3abd90(0x173)?$gameMap[_0x3abd90(0x11d)]():this[_0x3abd90(0x194)][_0x3abd90(0x107)][_0x3abd90(0x188)](this[_0x3abd90(0x162)])),this['_BrightEffectsGodraySettingsMap']);},Game_Screen[_0x4f6add(0x175)]['getBrightEffectsColorAdjustSettings']=function(){var _0x3b8331=_0x4f6add;if(SceneManager[_0x3b8331(0x14f)]())return this[_0x3b8331(0x17c)]===undefined&&$gameTroop[_0x3b8331(0x124)](),this[_0x3b8331(0x17c)];else{if(_0x3b8331(0x10c)!==_0x3b8331(0x12f))return this[_0x3b8331(0x19f)]===undefined&&$gameMap['setupBrightEffectsColorAdjustFilter'](),this['_BrightEffectsColorAdjustSettingsMap'];else var _0x22fe5b=_0x18cc57['_brightEffectsColorAdjustHorzSaturate'][0x0],_0x35443f=_0x32b5d5[_0x3b8331(0xe0)][0x1]-_0x22fe5b,_0x32e6c5=_0x1b2fea['_realX']/_0x40324f[_0x3b8331(0x18e)](),_0x529779=_0x22fe5b+_0x35443f*_0x32e6c5;}},VisuMZ[_0x4f6add(0x10f)]['Scene_Battle_start']=Scene_Battle['prototype'][_0x4f6add(0x169)],Scene_Battle[_0x4f6add(0x175)][_0x4f6add(0x169)]=function(){var _0x46c854=_0x4f6add;VisuMZ['BrightEffects'][_0x46c854(0x181)][_0x46c854(0xce)](this),$gameTroop[_0x46c854(0x185)]();},Game_Troop[_0x4f6add(0x175)]['setupBrightEffectsFilters']=function(){var _0x3555af=_0x4f6add;this[_0x3555af(0x1a2)](),this[_0x3555af(0x11d)](),this[_0x3555af(0x124)]();},Game_Troop[_0x4f6add(0x175)][_0x4f6add(0x1a2)]=function(){var _0x511b0f=_0x4f6add;const _0x5dca3d=VisuMZ[_0x511b0f(0x10f)][_0x511b0f(0xf4)][_0x511b0f(0x150)];var _0x238f23=_0x5dca3d[_0x511b0f(0xde)],_0x3f2200=_0x5dca3d[_0x511b0f(0x131)],_0x2d62fd=_0x5dca3d[_0x511b0f(0x161)];if(!!this[_0x511b0f(0x136)]()){if(_0x511b0f(0x123)!=='ytQCA'){var _0xb7b86d=this[_0x511b0f(0x136)]()[_0x511b0f(0x15c)];if(_0xb7b86d[_0x511b0f(0x19d)](/<BLOOM SCALE: (.*)>/i))var _0x238f23=Number(RegExp['$1'])||0x0;if(_0xb7b86d[_0x511b0f(0x19d)](/<BLOOM BRIGHTNESS: (.*)>/i)){if(_0x511b0f(0x12c)===_0x511b0f(0x12c))var _0x3f2200=Number(RegExp['$1'])||0x0;else return _0x2b8652[_0x511b0f(0x1a5)]&&_0x9010a2[_0x511b0f(0xf2)][_0x511b0f(0x104)]('['+_0x46c1a1+']');}if(_0xb7b86d[_0x511b0f(0x19d)](/<BLOOM THRESHOLD: (.*)>/i)){if('IzuaW'!=='KVrmk')var _0x2d62fd=Number(RegExp['$1'])||0x0;else _0x595217[_0x511b0f(0x11d)]();}}else{var _0x11f56b=this['troop']()[_0x511b0f(0x15c)];if(_0x11f56b[_0x511b0f(0x19d)](/<COLOR ADJUST BRIGHTNESS: (.*)>/i))var _0x10c5e7=_0x12ae98(_0x42c80e['$1'])||0x0;if(_0x11f56b['match'](/<COLOR ADJUST CONTRAST: (.*)>/i))var _0x2aea16=_0x33ae40(_0x593826['$1'])||0x0;if(_0x11f56b[_0x511b0f(0x19d)](/<COLOR ADJUST SATURATE: (.*)>/i))var _0xfc9684=_0x2d6aea(_0x4af141['$1'])||0x0;}}$gameScreen['setBrightEffectsAdvBloomSettings'](_0x238f23,_0x3f2200,_0x2d62fd,0x0);},Game_Troop[_0x4f6add(0x175)]['setupBrightEffectsGodrayFilter']=function(){var _0x30ffbb=_0x4f6add;const _0x237f99=VisuMZ[_0x30ffbb(0x10f)][_0x30ffbb(0xf4)][_0x30ffbb(0x198)];var _0x2d62cd=_0x237f99[_0x30ffbb(0x158)],_0x5b6ac0=_0x237f99['Speed'],_0x5497a3=_0x237f99[_0x30ffbb(0x102)],_0x3ae293=_0x237f99[_0x30ffbb(0xdf)],_0x5cb4c3=_0x237f99['Angle'];if(!!this[_0x30ffbb(0x136)]()){var _0x39ff41=this[_0x30ffbb(0x136)]()['name'];if(_0x39ff41[_0x30ffbb(0x19d)](/<GODRAY>/i)){if(_0x30ffbb(0x1a4)===_0x30ffbb(0x1a4))_0x2d62cd=!![];else return _0x4c04b0[_0x30ffbb(0xf7)];}else _0x39ff41[_0x30ffbb(0x19d)](/<NO GODRAY>/i)&&(_0x2d62cd=![]);_0x39ff41[_0x30ffbb(0x19d)](/<GODRAY SPEED: (.*)>/i)&&(_0x30ffbb(0x153)===_0x30ffbb(0x179)?_0x509c35=_0x989694(_0x2b08ac['$1'])||0x0:_0x5b6ac0=Number(RegExp['$1'])||0x0),_0x39ff41['match'](/<GODRAY GAIN: (.*)>/i)&&(_0x5497a3=Number(RegExp['$1'])||0x0),_0x39ff41[_0x30ffbb(0x19d)](/<GODRAY LACUNARITY: (.*)>/i)&&(_0x3ae293=Number(RegExp['$1'])||0x0),_0x39ff41[_0x30ffbb(0x19d)](/<GODRAY ANGLE: (.*)>/i)&&(_0x5cb4c3=Number(RegExp['$1'])||0x0);}$gameScreen[_0x30ffbb(0x16d)](_0x2d62cd,_0x5b6ac0,_0x5497a3,_0x3ae293,_0x5cb4c3,0x0);},Game_Troop[_0x4f6add(0x175)]['setupBrightEffectsColorAdjustFilter']=function(){var _0x3d824b=_0x4f6add;const _0x1e75ff=VisuMZ['BrightEffects']['Settings'][_0x3d824b(0x156)];var _0x55f123=_0x1e75ff['Brightness'],_0x567ce3=_0x1e75ff[_0x3d824b(0xfa)],_0x5a2dd0=_0x1e75ff[_0x3d824b(0x13e)];if(!!this['troop']()){var _0x19cfa9=this[_0x3d824b(0x136)]()[_0x3d824b(0x15c)];if(_0x19cfa9[_0x3d824b(0x19d)](/<COLOR ADJUST BRIGHTNESS: (.*)>/i))var _0x55f123=Number(RegExp['$1'])||0x0;if(_0x19cfa9[_0x3d824b(0x19d)](/<COLOR ADJUST CONTRAST: (.*)>/i))var _0x567ce3=Number(RegExp['$1'])||0x0;if(_0x19cfa9[_0x3d824b(0x19d)](/<COLOR ADJUST SATURATE: (.*)>/i))var _0x5a2dd0=Number(RegExp['$1'])||0x0;}$gameScreen[_0x3d824b(0x168)](_0x55f123,_0x567ce3,_0x5a2dd0,0x0);},VisuMZ[_0x4f6add(0x10f)][_0x4f6add(0x13f)]=Game_Map[_0x4f6add(0x175)]['setup'],Game_Map[_0x4f6add(0x175)][_0x4f6add(0x12d)]=function(_0x2ddc2b){var _0x1dbffb=_0x4f6add;VisuMZ[_0x1dbffb(0x10f)][_0x1dbffb(0x13f)][_0x1dbffb(0xce)](this,_0x2ddc2b),!!$dataMap&&(_0x1dbffb(0x187)==='psqmt'?this[_0x1dbffb(0x185)]():_0x3720c1=!![]);},Game_Map['prototype']['setupBrightEffectsFilters']=function(){var _0x4e18e3=_0x4f6add;if(ConfigManager['specialEffects']===![])return;this[_0x4e18e3(0x1a2)](),this['setupBrightEffectsGodrayFilter'](),this['setupBrightEffectsColorAdjustFilter'](),$gamePlayer[_0x4e18e3(0x127)]();},Game_Map[_0x4f6add(0x175)][_0x4f6add(0x1a2)]=function(){var _0x2fa32=_0x4f6add;const _0x453949=VisuMZ[_0x2fa32(0x10f)][_0x2fa32(0xf4)][_0x2fa32(0x16e)];var _0x483311=_0x453949[_0x2fa32(0xde)],_0x43bff0=_0x453949['Brightness'],_0x3f45f2=_0x453949[_0x2fa32(0x161)];this[_0x2fa32(0x120)]=undefined,this[_0x2fa32(0x141)]=undefined,this[_0x2fa32(0x14a)]=undefined,this[_0x2fa32(0x133)]=undefined,this[_0x2fa32(0x17b)]=undefined,this['_brightEffectsBloomVertThreshold']=undefined;if($dataMap){var _0x5adec4=$dataMap[_0x2fa32(0xd0)]||'';if(_0x5adec4['match'](/<BLOOM SCALE: (.*)>/i)){if('HZjIE'!==_0x2fa32(0x144))var _0x483311=Number(RegExp['$1'])||0x0;else this[_0x2fa32(0x17c)]={'brightness':_0x3d8786,'contrast':_0x110eba,'saturate':_0x2e1874,'duration':_0x1d6382||0x0};}if(_0x5adec4['match'](/<BLOOM BRIGHTNESS: (.*)>/i))var _0x43bff0=Number(RegExp['$1'])||0x0;if(_0x5adec4[_0x2fa32(0x19d)](/<BLOOM THRESHOLD: (.*)>/i)){if(_0x2fa32(0x17d)===_0x2fa32(0x195))this[_0x2fa32(0x14c)]=_0x1e5053,this[_0x2fa32(0x18b)]=[_0x29e4b9(_0x5c2bca['$1']),_0x44e12e(_0x52bd1e['$2'])];else var _0x3f45f2=Number(RegExp['$1'])||0x0;}if(_0x5adec4['match'](/<BLOOM (?:HORZ|HORIZONTAL) SCALE: (.*) TO (.*)>/i)){if('RhfSs'===_0x2fa32(0x191))var _0x5129ea=_0x57c093(_0x5bf2b9['$1'])||0x0;else this['_brightEffectsBloomHorzScale']=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x2fa32(0x141)]=undefined;}_0x5adec4[_0x2fa32(0x19d)](/<BLOOM (?:VERT|VERTICAL) SCALE: (.*) TO (.*)>/i)&&(this[_0x2fa32(0x120)]=undefined,this[_0x2fa32(0x141)]=[Number(RegExp['$1']),Number(RegExp['$2'])]);_0x5adec4[_0x2fa32(0x19d)](/<BLOOM (?:HORZ|HORIZONTAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this[_0x2fa32(0x14a)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x2fa32(0x133)]=undefined);_0x5adec4[_0x2fa32(0x19d)](/<BLOOM (?:VERT|VERTICAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this['_brightEffectsBloomHorzBrightness']=undefined,this['_brightEffectsBloomVertBrightness']=[Number(RegExp['$1']),Number(RegExp['$2'])]);if(_0x5adec4[_0x2fa32(0x19d)](/<BLOOM (?:HORZ|HORIZONTAL) THRESHOLD: (.*) TO (.*)>/i)){if(_0x2fa32(0x134)!==_0x2fa32(0xd9))this[_0x2fa32(0x17b)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x2fa32(0x114)]=undefined;else var _0x36d2c6=_0x38528e[_0x2fa32(0x18b)][0x0],_0x14c8b3=_0x5f05b2['_brightEffectsColorAdjustVertBrightness'][0x1]-_0x36d2c6,_0x42c73a=_0x31f8eb[_0x2fa32(0xc5)]/_0x38b38f[_0x2fa32(0x101)](),_0x28f5db=_0x36d2c6+_0x14c8b3*_0x42c73a;}if(_0x5adec4['match'](/<BLOOM (?:VERT|VERTICAL) THRESHOLD: (.*) TO (.*)>/i)){if('ZRqEc'==='CFkXh')var _0x460192=_0x19b014['_brightEffectsGodrayHorzGain'][0x0],_0x4215b3=_0x5a5e14[_0x2fa32(0x11a)][0x1]-_0x460192,_0x3cfc04=_0x234613[_0x2fa32(0x129)]/_0x365663['width'](),_0x167dfc=_0x460192+_0x4215b3*_0x3cfc04;else this['_brightEffectsBloomHorzThreshold']=undefined,this[_0x2fa32(0x114)]=[Number(RegExp['$1']),Number(RegExp['$2'])];}}$gameScreen[_0x2fa32(0x14b)](_0x483311,_0x43bff0,_0x3f45f2,0x0);},Game_Map['prototype'][_0x4f6add(0x11d)]=function(){var _0x44532e=_0x4f6add;const _0x12f63d=VisuMZ[_0x44532e(0x10f)][_0x44532e(0xf4)][_0x44532e(0x143)];var _0x1ce6f5=_0x12f63d[_0x44532e(0x158)],_0x2bad0f=_0x12f63d['Speed'],_0xf6ded4=_0x12f63d['Gain'],_0x38a66f=_0x12f63d[_0x44532e(0xdf)],_0x50a656=_0x12f63d['Angle'];this['_brightEffectsGodrayHorzSpeed']=undefined,this[_0x44532e(0x182)]=undefined,this['_brightEffectsGodrayHorzGain']=undefined,this[_0x44532e(0xc9)]=undefined,this[_0x44532e(0x16b)]=undefined,this[_0x44532e(0x189)]=undefined,this['_brightEffectsGodrayHorzAngle']=undefined,this[_0x44532e(0x152)]=undefined;if($dataMap){if(_0x44532e(0x147)===_0x44532e(0x197)){this[_0x44532e(0x125)]=new _0x7371e4[(_0x44532e(0x107))][(_0x44532e(0x111))]();this['brightEffectsBaseOnly']()?this['_baseSprite'][_0x44532e(0x107)][_0x44532e(0x188)](this[_0x44532e(0x125)]):this['filters'][_0x44532e(0x188)](this[_0x44532e(0x125)]);var _0x487b87=_0x51c716[_0x44532e(0x1a1)]();_0x487b87&&_0x487b87['duration']>0x0&&(this['_BrightEffectsAdvBloomFilter'][_0x44532e(0x16c)]=_0x487b87[_0x44532e(0x16c)],this['_BrightEffectsAdvBloomFilter'][_0x44532e(0xe2)]=_0x487b87[_0x44532e(0xe2)],this[_0x44532e(0x125)]['threshold']=_0x487b87[_0x44532e(0x130)]);}else{var _0x300c57=$dataMap[_0x44532e(0xd0)]||'';if(_0x300c57[_0x44532e(0x19d)](/<GODRAY>/i))_0x1ce6f5=!![];else{if(_0x300c57[_0x44532e(0x19d)](/<NO GODRAY>/i)){if('POdnP'===_0x44532e(0xff))_0x1ce6f5=![];else{this[_0x44532e(0xd7)]=new _0x52e049['filters'][(_0x44532e(0x165))](),this['_BrightEffectsGodrayFilter'][_0x44532e(0x13b)]=![],this[_0x44532e(0xd7)][_0x44532e(0x14e)]=0x0;this[_0x44532e(0xcd)]()?this[_0x44532e(0x194)]['filters'][_0x44532e(0x188)](this[_0x44532e(0xd7)]):this[_0x44532e(0x107)][_0x44532e(0x188)](this['_BrightEffectsGodrayFilter']);var _0x2bc61f=_0x1ff32b['getBrightEffectsGodraySettings']();_0x2bc61f&&_0x2bc61f[_0x44532e(0x103)]>0x0&&(this[_0x44532e(0xd7)][_0x44532e(0x155)]=_0x2bc61f[_0x44532e(0x155)],this[_0x44532e(0xd7)][_0x44532e(0x1a6)]=_0x2bc61f[_0x44532e(0x1a6)],this[_0x44532e(0xd7)]['lacunarity']=_0x2bc61f['lacunarity'],this[_0x44532e(0xd7)]['angle']=_0x2bc61f[_0x44532e(0x15b)]);}}}_0x300c57[_0x44532e(0x19d)](/<GODRAY SPEED: (.*)>/i)&&(_0x2bad0f=Number(RegExp['$1'])||0x0);_0x300c57[_0x44532e(0x19d)](/<GODRAY GAIN: (.*)>/i)&&(_0xf6ded4=Number(RegExp['$1'])||0x0);_0x300c57[_0x44532e(0x19d)](/<GODRAY LACUNARITY: (.*)>/i)&&(_0x38a66f=Number(RegExp['$1'])||0x0);_0x300c57[_0x44532e(0x19d)](/<GODRAY ANGLE: (.*)>/i)&&(_0x50a656=Number(RegExp['$1'])||0x0);_0x300c57[_0x44532e(0x19d)](/<GODRAY (?:HORZ|HORIZONTAL) SPEED: (.*) TO (.*)>/i)&&('eQkcB'!=='eQkcB'?_0x7c7a47[_0x44532e(0x124)]():(this[_0x44532e(0x170)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsGodrayVertSpeed']=undefined));_0x300c57['match'](/<GODRAY (?:VERT|VERTICAL) SPEED: (.*) TO (.*)>/i)&&(this[_0x44532e(0x170)]=undefined,this['_brightEffectsGodrayVertSpeed']=[Number(RegExp['$1']),Number(RegExp['$2'])]);_0x300c57[_0x44532e(0x19d)](/<GODRAY (?:HORZ|HORIZONTAL) GAIN: (.*) TO (.*)>/i)&&(this[_0x44532e(0x11a)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x44532e(0xc9)]=undefined);_0x300c57[_0x44532e(0x19d)](/<GODRAY (?:VERT|VERTICAL) GAIN: (.*) TO (.*)>/i)&&(this[_0x44532e(0x11a)]=undefined,this['_brightEffectsGodrayVertGain']=[Number(RegExp['$1']),Number(RegExp['$2'])]);_0x300c57[_0x44532e(0x19d)](/<GODRAY (?:HORZ|HORIZONTAL) LACUNARITY: (.*) TO (.*)>/i)&&(this[_0x44532e(0x16b)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x44532e(0x189)]=undefined);_0x300c57['match'](/<GODRAY (?:VERT|VERTICAL) LACUNARITY: (.*) TO (.*)>/i)&&('uPDhn'===_0x44532e(0xd2)?(_0x5aecc6[_0x44532e(0x10f)][_0x44532e(0x190)][_0x44532e(0xce)](this,_0x3a4894),this[_0x44532e(0x127)]()):(this[_0x44532e(0x16b)]=undefined,this[_0x44532e(0x189)]=[Number(RegExp['$1']),Number(RegExp['$2'])]));if(_0x300c57[_0x44532e(0x19d)](/<GODRAY (?:HORZ|HORIZONTAL) ANGLE: (.*) TO (.*)>/i)){if('UtvBJ'!=='MFErk')this[_0x44532e(0x19e)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x44532e(0x152)]=undefined;else{var _0x1d4d84=this[_0x44532e(0x136)]()[_0x44532e(0x15c)];if(_0x1d4d84[_0x44532e(0x19d)](/<BLOOM SCALE: (.*)>/i))var _0xbcaa33=_0x2d8b75(_0x5d1e77['$1'])||0x0;if(_0x1d4d84[_0x44532e(0x19d)](/<BLOOM BRIGHTNESS: (.*)>/i))var _0x53a3dd=_0x270d71(_0xca4b10['$1'])||0x0;if(_0x1d4d84['match'](/<BLOOM THRESHOLD: (.*)>/i))var _0x5da084=_0xc7d988(_0x575ad6['$1'])||0x0;}}_0x300c57['match'](/<GODRAY (?:VERT|VERTICAL) ANGLE: (.*) TO (.*)>/i)&&(_0x44532e(0xcf)==='sFsAc'?(this[_0x44532e(0x19e)]=undefined,this[_0x44532e(0x152)]=[Number(RegExp['$1']),Number(RegExp['$2'])]):this['_BrightEffectsAdvBloomSettingsMap']={'bloomScale':_0x36ca11,'brightness':_0x3b49f6,'threshold':_0x5cdf05,'duration':_0x3a3f18||0x0});}}$gameScreen[_0x44532e(0x16d)](_0x1ce6f5,_0x2bad0f,_0xf6ded4,_0x38a66f,_0x50a656,0x0);},Game_Map[_0x4f6add(0x175)][_0x4f6add(0x124)]=function(){var _0x37727e=_0x4f6add;const _0xbb62b0=VisuMZ[_0x37727e(0x10f)][_0x37727e(0xf4)][_0x37727e(0x132)];var _0x399d47=_0xbb62b0['Brightness'],_0x14e5cc=_0xbb62b0['Contrast'],_0x149222=_0xbb62b0['Saturate'];this[_0x37727e(0x14c)]=undefined,this['_brightEffectsColorAdjustVertBrightness']=undefined,this[_0x37727e(0xe5)]=undefined,this[_0x37727e(0xfe)]=undefined,this['_brightEffectsColorAdjustHorzSaturate']=undefined,this['_brightEffectsColorAdjustVertSaturate']=undefined;if($dataMap){if(_0x37727e(0x171)!==_0x37727e(0x137)){var _0x3b9018=$dataMap[_0x37727e(0xd0)]||'';if(_0x3b9018[_0x37727e(0x19d)](/<COLOR ADJUST BRIGHTNESS: (.*)>/i))var _0x399d47=Number(RegExp['$1'])||0x0;if(_0x3b9018[_0x37727e(0x19d)](/<COLOR ADJUST CONTRAST: (.*)>/i))var _0x14e5cc=Number(RegExp['$1'])||0x0;if(_0x3b9018[_0x37727e(0x19d)](/<COLOR ADJUST SATURATE: (.*)>/i)){if('oDUzR'===_0x37727e(0xe7))var _0x464be0=_0x1a4d0e(_0x25a85e['$1'])||0x0;else var _0x149222=Number(RegExp['$1'])||0x0;}_0x3b9018[_0x37727e(0x19d)](/<COLOR ADJUST (?:HORZ|HORIZONTAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this[_0x37727e(0x14c)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x37727e(0x18b)]=undefined),_0x3b9018[_0x37727e(0x19d)](/<COLOR ADJUST (?:VERT|VERTICAL) BRIGHTNESS: (.*) TO (.*)>/i)&&(this[_0x37727e(0x14c)]=undefined,this[_0x37727e(0x18b)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x3b9018[_0x37727e(0x19d)](/<COLOR ADJUST (?:HORZ|HORIZONTAL) CONTRAST: (.*) TO (.*)>/i)&&(this[_0x37727e(0xe5)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this['_brightEffectsColorAdjustVertContrast']=undefined),_0x3b9018[_0x37727e(0x19d)](/<COLOR ADJUST (?:VERT|VERTICAL) CONTRAST: (.*) TO (.*)>/i)&&(this[_0x37727e(0xe5)]=undefined,this[_0x37727e(0xfe)]=[Number(RegExp['$1']),Number(RegExp['$2'])]),_0x3b9018[_0x37727e(0x19d)](/<COLOR ADJUST (?:HORZ|HORIZONTAL) SATURATE: (.*) TO (.*)>/i)&&('GspEA'===_0x37727e(0x18a)?(this[_0x37727e(0xe0)]=[Number(RegExp['$1']),Number(RegExp['$2'])],this[_0x37727e(0x19b)]=undefined):_0x2875fe=_0x1bcf6c(_0xba7eb4['$1'])||0x0),_0x3b9018['match'](/<COLOR ADJUST (?:VERT|VERTICAL) SATURATE: (.*) TO (.*)>/i)&&(_0x37727e(0x17a)!==_0x37727e(0x17a)?(_0x12477a(_0x37727e(0xdb)[_0x37727e(0x121)](_0x2974c2,_0x357629)),_0x2d4e93[_0x37727e(0x18d)]()):(this[_0x37727e(0xe0)]=undefined,this[_0x37727e(0x19b)]=[Number(RegExp['$1']),Number(RegExp['$2'])]));}else{if(_0x2127c7[_0x37727e(0x118)]===![])return;this[_0x37727e(0x1a2)](),this[_0x37727e(0x11d)](),this[_0x37727e(0x124)](),_0x6b4fe4[_0x37727e(0x127)]();}}$gameScreen[_0x37727e(0x168)](_0x399d47,_0x14e5cc,_0x149222,0x0);},VisuMZ['BrightEffects'][_0x4f6add(0x122)]=Game_CharacterBase['prototype'][_0x4f6add(0x11f)],Game_CharacterBase['prototype'][_0x4f6add(0x11f)]=function(_0x3fe93f,_0x3f7539){var _0x51895c=_0x4f6add;VisuMZ[_0x51895c(0x10f)]['Game_CharacterBase_locate'][_0x51895c(0xce)](this,_0x3fe93f,_0x3f7539),this===$gamePlayer&&this['updateMapBrightEffects']();},VisuMZ[_0x4f6add(0x10f)][_0x4f6add(0x190)]=Game_Player[_0x4f6add(0x175)][_0x4f6add(0xea)],Game_Player[_0x4f6add(0x175)][_0x4f6add(0xea)]=function(_0x4c10ba){var _0x3389d1=_0x4f6add;VisuMZ[_0x3389d1(0x10f)][_0x3389d1(0x190)][_0x3389d1(0xce)](this,_0x4c10ba),this[_0x3389d1(0x127)]();},Game_Player[_0x4f6add(0x175)]['updateMapBrightEffects']=function(){var _0x57c4ca=_0x4f6add;if(ConfigManager[_0x57c4ca(0x118)]===![])return;this['updateMapBrightEffectsAdvBloom'](),this[_0x57c4ca(0x12a)](),this[_0x57c4ca(0x105)]();},Game_Player[_0x4f6add(0x175)][_0x4f6add(0x17f)]=function(){var _0x5bbbe7=_0x4f6add,_0x2edc3a=$gameScreen[_0x5bbbe7(0x1a1)](),_0x3b9f79=_0x2edc3a[_0x5bbbe7(0x16c)],_0x180fc5=_0x2edc3a[_0x5bbbe7(0xe2)],_0x23d60a=_0x2edc3a[_0x5bbbe7(0x130)];if($gameMap[_0x5bbbe7(0x120)]!==undefined){if(_0x5bbbe7(0x16f)===_0x5bbbe7(0x16f))var _0x29c077=$gameMap[_0x5bbbe7(0x120)][0x0],_0x308809=$gameMap[_0x5bbbe7(0x120)][0x1]-_0x29c077,_0x98904d=$gamePlayer['_realX']/$gameMap[_0x5bbbe7(0x18e)](),_0x3b9f79=_0x29c077+_0x308809*_0x98904d;else _0x28ccb9('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x5bbbe7(0x121)](_0x5cbe90,_0x17a7ac,_0xba789b)),_0x5acbeb[_0x5bbbe7(0x18d)]();}else{if($gameMap[_0x5bbbe7(0x141)]!==undefined){if(_0x5bbbe7(0xee)!==_0x5bbbe7(0xda))var _0x29c077=$gameMap[_0x5bbbe7(0x141)][0x0],_0x308809=$gameMap[_0x5bbbe7(0x141)][0x1]-_0x29c077,_0x98904d=$gamePlayer[_0x5bbbe7(0xc5)]/$gameMap[_0x5bbbe7(0x101)](),_0x3b9f79=_0x29c077+_0x308809*_0x98904d;else _0x5c19b3[_0x5bbbe7(0x1a2)]();}}if($gameMap[_0x5bbbe7(0x14a)]!==undefined){if(_0x5bbbe7(0x13a)===_0x5bbbe7(0x13a))var _0x29c077=$gameMap['_brightEffectsBloomHorzBrightness'][0x0],_0x308809=$gameMap[_0x5bbbe7(0x14a)][0x1]-_0x29c077,_0x98904d=$gamePlayer[_0x5bbbe7(0x129)]/$gameMap[_0x5bbbe7(0x18e)](),_0x180fc5=_0x29c077+_0x308809*_0x98904d;else var _0x1532b2=_0x601b75[_0x5bbbe7(0x152)][0x0],_0x3b879e=_0x4e7826[_0x5bbbe7(0x152)][0x1]-_0x1532b2,_0x27e938=_0x790523[_0x5bbbe7(0xc5)]/_0x935502[_0x5bbbe7(0x101)](),_0x410a40=_0x1532b2+_0x3b879e*_0x27e938;}else{if($gameMap[_0x5bbbe7(0x133)]!==undefined){if('UoeAQ'==='UoeAQ')var _0x29c077=$gameMap['_brightEffectsBloomVertBrightness'][0x0],_0x308809=$gameMap[_0x5bbbe7(0x133)][0x1]-_0x29c077,_0x98904d=$gamePlayer['_realY']/$gameMap[_0x5bbbe7(0x101)](),_0x180fc5=_0x29c077+_0x308809*_0x98904d;else this[_0x5bbbe7(0x194)]['filters'][_0x5bbbe7(0x188)](this['_BrightEffectsGodrayFilter']);}}if($gameMap[_0x5bbbe7(0x17b)]!==undefined){if(_0x5bbbe7(0x126)===_0x5bbbe7(0xf9))_0x5d1cf1=!![];else var _0x29c077=$gameMap[_0x5bbbe7(0x17b)][0x0],_0x308809=$gameMap['_brightEffectsBloomHorzThreshold'][0x1]-_0x29c077,_0x98904d=$gamePlayer[_0x5bbbe7(0x129)]/$gameMap[_0x5bbbe7(0x18e)](),_0x23d60a=_0x29c077+_0x308809*_0x98904d;}else{if($gameMap[_0x5bbbe7(0x114)]!==undefined){if(_0x5bbbe7(0x15a)===_0x5bbbe7(0x15a))var _0x29c077=$gameMap[_0x5bbbe7(0x114)][0x0],_0x308809=$gameMap[_0x5bbbe7(0x114)][0x1]-_0x29c077,_0x98904d=$gamePlayer[_0x5bbbe7(0xc5)]/$gameMap['height'](),_0x23d60a=_0x29c077+_0x308809*_0x98904d;else this['_brightEffectsGodrayHorzAngle']=_0x5b7877,this[_0x5bbbe7(0x152)]=[_0xa25e9b(_0x425ac8['$1']),_0x26af60(_0x57b989['$2'])];}}$gameScreen[_0x5bbbe7(0x14b)](_0x3b9f79,_0x180fc5,_0x23d60a,_0x2edc3a['duration']);},Game_Player['prototype'][_0x4f6add(0x12a)]=function(){var _0xa1fd51=_0x4f6add,_0x5ae201=$gameScreen[_0xa1fd51(0xe8)](),_0x5564c7=_0x5ae201[_0xa1fd51(0xdd)],_0x345b68=_0x5ae201[_0xa1fd51(0x155)],_0x2bc0ee=_0x5ae201[_0xa1fd51(0x1a6)],_0x3c3dff=_0x5ae201[_0xa1fd51(0x108)],_0x5cc69c=_0x5ae201[_0xa1fd51(0x15b)];if($gameMap[_0xa1fd51(0x170)]!==undefined)var _0x21f3d2=$gameMap['_brightEffectsGodrayHorzSpeed'][0x0],_0x1d7f96=$gameMap['_brightEffectsGodrayHorzSpeed'][0x1]-_0x21f3d2,_0x8f9e9d=$gamePlayer[_0xa1fd51(0x129)]/$gameMap[_0xa1fd51(0x18e)](),_0x345b68=_0x21f3d2+_0x1d7f96*_0x8f9e9d;else{if($gameMap[_0xa1fd51(0x141)]!==undefined)var _0x21f3d2=$gameMap['_brightEffectsGodrayVertSpeed'][0x0],_0x1d7f96=$gameMap[_0xa1fd51(0x182)][0x1]-_0x21f3d2,_0x8f9e9d=$gamePlayer[_0xa1fd51(0xc5)]/$gameMap['height'](),_0x345b68=_0x21f3d2+_0x1d7f96*_0x8f9e9d;}if($gameMap['_brightEffectsGodrayHorzGain']!==undefined){if(_0xa1fd51(0x10b)===_0xa1fd51(0x199))_0x5d2486[_0xa1fd51(0x14f)]()?this['_BrightEffectsColorAdjustSettingsBattle']={'brightness':_0x3625b2,'contrast':_0x518c6a,'saturate':_0x347ac0,'duration':_0x3ee889||0x0}:this[_0xa1fd51(0x19f)]={'brightness':_0x19317f,'contrast':_0x119b46,'saturate':_0x526073,'duration':_0x99e9b3||0x0};else var _0x21f3d2=$gameMap['_brightEffectsGodrayHorzGain'][0x0],_0x1d7f96=$gameMap[_0xa1fd51(0x11a)][0x1]-_0x21f3d2,_0x8f9e9d=$gamePlayer['_realX']/$gameMap[_0xa1fd51(0x18e)](),_0x2bc0ee=_0x21f3d2+_0x1d7f96*_0x8f9e9d;}else{if($gameMap['_brightEffectsGodrayVertGain']!==undefined){if(_0xa1fd51(0xec)===_0xa1fd51(0xec))var _0x21f3d2=$gameMap[_0xa1fd51(0xc9)][0x0],_0x1d7f96=$gameMap[_0xa1fd51(0xc9)][0x1]-_0x21f3d2,_0x8f9e9d=$gamePlayer[_0xa1fd51(0xc5)]/$gameMap[_0xa1fd51(0x101)](),_0x2bc0ee=_0x21f3d2+_0x1d7f96*_0x8f9e9d;else this['filters']['push'](this[_0xa1fd51(0x162)]);}}if($gameMap['_brightEffectsGodrayHorzLacunarity']!==undefined)var _0x21f3d2=$gameMap[_0xa1fd51(0x16b)][0x0],_0x1d7f96=$gameMap[_0xa1fd51(0x16b)][0x1]-_0x21f3d2,_0x8f9e9d=$gamePlayer['_realX']/$gameMap['width'](),_0x3c3dff=_0x21f3d2+_0x1d7f96*_0x8f9e9d;else{if($gameMap[_0xa1fd51(0x189)]!==undefined){if(_0xa1fd51(0xf8)==='ggKZn')var _0x21f3d2=$gameMap[_0xa1fd51(0x189)][0x0],_0x1d7f96=$gameMap[_0xa1fd51(0x189)][0x1]-_0x21f3d2,_0x8f9e9d=$gamePlayer[_0xa1fd51(0xc5)]/$gameMap['height'](),_0x3c3dff=_0x21f3d2+_0x1d7f96*_0x8f9e9d;else return this['_BrightEffectsGodraySettingsBattle']===_0x5d8796&&_0x525ecf[_0xa1fd51(0x11d)](),this[_0xa1fd51(0xca)];}}if($gameMap[_0xa1fd51(0x19e)]!==undefined)var _0x21f3d2=$gameMap[_0xa1fd51(0x19e)][0x0],_0x1d7f96=$gameMap[_0xa1fd51(0x19e)][0x1]-_0x21f3d2,_0x8f9e9d=$gamePlayer[_0xa1fd51(0x129)]/$gameMap['width'](),_0x5cc69c=_0x21f3d2+_0x1d7f96*_0x8f9e9d;else{if($gameMap[_0xa1fd51(0x152)]!==undefined)var _0x21f3d2=$gameMap[_0xa1fd51(0x152)][0x0],_0x1d7f96=$gameMap[_0xa1fd51(0x152)][0x1]-_0x21f3d2,_0x8f9e9d=$gamePlayer['_realY']/$gameMap[_0xa1fd51(0x101)](),_0x5cc69c=_0x21f3d2+_0x1d7f96*_0x8f9e9d;}$gameScreen['setBrightEffectsGodraySettings'](_0x5564c7,_0x345b68,_0x2bc0ee,_0x3c3dff,_0x5cc69c,_0x5ae201[_0xa1fd51(0x103)]);},Game_Player['prototype'][_0x4f6add(0x105)]=function(){var _0x1975cc=_0x4f6add,_0x427e04=$gameScreen['getBrightEffectsColorAdjustSettings'](),_0x55800f=_0x427e04['brightness'],_0x5d4e34=_0x427e04[_0x1975cc(0x183)],_0x4f7333=_0x427e04[_0x1975cc(0x110)];if($gameMap[_0x1975cc(0x14c)]!==undefined)var _0xe2cc33=$gameMap[_0x1975cc(0x14c)][0x0],_0x2cde36=$gameMap[_0x1975cc(0x14c)][0x1]-_0xe2cc33,_0x3a875a=$gamePlayer[_0x1975cc(0x129)]/$gameMap['width'](),_0x55800f=_0xe2cc33+_0x2cde36*_0x3a875a;else{if($gameMap[_0x1975cc(0x18b)]!==undefined){if(_0x1975cc(0x178)!==_0x1975cc(0xd5))var _0xe2cc33=$gameMap[_0x1975cc(0x18b)][0x0],_0x2cde36=$gameMap[_0x1975cc(0x18b)][0x1]-_0xe2cc33,_0x3a875a=$gamePlayer['_realY']/$gameMap[_0x1975cc(0x101)](),_0x55800f=_0xe2cc33+_0x2cde36*_0x3a875a;else var _0x4a8a7d=_0x1c1f20(_0x16756e['$1'])||0x0;}}if($gameMap[_0x1975cc(0xe5)]!==undefined){if('uBxwn'!==_0x1975cc(0x14d))this[_0x1975cc(0x185)]();else var _0xe2cc33=$gameMap['_brightEffectsColorAdjustHorzContrast'][0x0],_0x2cde36=$gameMap[_0x1975cc(0xe5)][0x1]-_0xe2cc33,_0x3a875a=$gamePlayer[_0x1975cc(0x129)]/$gameMap[_0x1975cc(0x18e)](),_0x5d4e34=_0xe2cc33+_0x2cde36*_0x3a875a;}else{if($gameMap[_0x1975cc(0xfe)]!==undefined){if(_0x1975cc(0xd1)===_0x1975cc(0xd1))var _0xe2cc33=$gameMap[_0x1975cc(0xfe)][0x0],_0x2cde36=$gameMap[_0x1975cc(0xfe)][0x1]-_0xe2cc33,_0x3a875a=$gamePlayer[_0x1975cc(0xc5)]/$gameMap['height'](),_0x5d4e34=_0xe2cc33+_0x2cde36*_0x3a875a;else var _0x3320e6=_0x172c85(_0xc80472['$1'])||0x0;}}if($gameMap['_brightEffectsColorAdjustHorzSaturate']!==undefined)var _0xe2cc33=$gameMap[_0x1975cc(0xe0)][0x0],_0x2cde36=$gameMap[_0x1975cc(0xe0)][0x1]-_0xe2cc33,_0x3a875a=$gamePlayer['_realX']/$gameMap[_0x1975cc(0x18e)](),_0x4f7333=_0xe2cc33+_0x2cde36*_0x3a875a;else{if($gameMap[_0x1975cc(0x19b)]!==undefined)var _0xe2cc33=$gameMap['_brightEffectsColorAdjustVertSaturate'][0x0],_0x2cde36=$gameMap[_0x1975cc(0x19b)][0x1]-_0xe2cc33,_0x3a875a=$gamePlayer['_realY']/$gameMap[_0x1975cc(0x101)](),_0x4f7333=_0xe2cc33+_0x2cde36*_0x3a875a;}$gameScreen[_0x1975cc(0x168)](_0x55800f,_0x5d4e34,_0x4f7333,_0x427e04['duration']);},Spriteset_Base[_0x4f6add(0xf7)]=![],Spriteset_Map[_0x4f6add(0xf7)]=VisuMZ[_0x4f6add(0x10f)][_0x4f6add(0xf4)][_0x4f6add(0xeb)],Spriteset_Battle[_0x4f6add(0xf7)]=VisuMZ[_0x4f6add(0x10f)][_0x4f6add(0xf4)][_0x4f6add(0x16a)],Spriteset_Base[_0x4f6add(0x175)][_0x4f6add(0xcd)]=function(){var _0x3d536d=_0x4f6add;return Spriteset_Base[_0x3d536d(0xf7)];},Spriteset_Map['prototype']['brightEffectsBaseOnly']=function(){return Spriteset_Map['BRIGHT_EFFECTS_BASE_ONLY'];},Spriteset_Battle['prototype'][_0x4f6add(0xcd)]=function(){return Spriteset_Battle['BRIGHT_EFFECTS_BASE_ONLY'];},VisuMZ[_0x4f6add(0x10f)][_0x4f6add(0xc4)]=Spriteset_Base[_0x4f6add(0x175)][_0x4f6add(0xc6)],Spriteset_Base[_0x4f6add(0x175)][_0x4f6add(0xc6)]=function(){var _0x1f1752=_0x4f6add;VisuMZ[_0x1f1752(0x10f)][_0x1f1752(0xc4)][_0x1f1752(0xce)](this),this[_0x1f1752(0x13d)]();},Spriteset_Base[_0x4f6add(0x175)][_0x4f6add(0x13d)]=function(){var _0x34f55d=_0x4f6add;if(ConfigManager[_0x34f55d(0x118)]===![])return;this[_0x34f55d(0x107)]=this['filters']||[],this[_0x34f55d(0x154)](),this[_0x34f55d(0xc7)](),this[_0x34f55d(0x15f)](),this[_0x34f55d(0x1a0)]();},Spriteset_Base[_0x4f6add(0x175)][_0x4f6add(0x154)]=function(){var _0xd089b5=_0x4f6add;this['_BrightEffectsAdvBloomFilter']=new PIXI['filters'][(_0xd089b5(0x111))]();if(this[_0xd089b5(0xcd)]()){if(_0xd089b5(0x11c)==='itbND')this[_0xd089b5(0x194)][_0xd089b5(0x107)]['push'](this['_BrightEffectsAdvBloomFilter']);else var _0x58a42=_0x1ebc0a(_0x4340ca['$1'])||0x0;}else _0xd089b5(0x148)===_0xd089b5(0x148)?this[_0xd089b5(0x107)]['push'](this[_0xd089b5(0x125)]):_0x5c2e67=_0x2b81aa(_0x4206b8['$1'])||0x0;var _0x8dd037=$gameScreen['getBrightEffectsAdvBloomSettings']();_0x8dd037&&_0x8dd037[_0xd089b5(0x103)]>0x0&&(this[_0xd089b5(0x125)][_0xd089b5(0x16c)]=_0x8dd037[_0xd089b5(0x16c)],this['_BrightEffectsAdvBloomFilter'][_0xd089b5(0xe2)]=_0x8dd037[_0xd089b5(0xe2)],this[_0xd089b5(0x125)][_0xd089b5(0x130)]=_0x8dd037[_0xd089b5(0x130)]);},Spriteset_Base[_0x4f6add(0x175)][_0x4f6add(0xc7)]=function(){var _0x4c9c2=_0x4f6add;this['_BrightEffectsGodrayFilter']=new PIXI[(_0x4c9c2(0x107))]['GodrayFilter'](),this[_0x4c9c2(0xd7)][_0x4c9c2(0x13b)]=![],this[_0x4c9c2(0xd7)][_0x4c9c2(0x14e)]=0x0;if(this['brightEffectsBaseOnly']())this[_0x4c9c2(0x194)][_0x4c9c2(0x107)][_0x4c9c2(0x188)](this[_0x4c9c2(0xd7)]);else{if(_0x4c9c2(0xf5)===_0x4c9c2(0xf5))this[_0x4c9c2(0x107)][_0x4c9c2(0x188)](this[_0x4c9c2(0xd7)]);else var _0x2cb02d=_0x5e42e8(_0x2dd982['$1'])||0x0;}var _0x4fd7e2=$gameScreen[_0x4c9c2(0xe8)]();if(_0x4fd7e2&&_0x4fd7e2[_0x4c9c2(0x103)]>0x0){if('SAzTK'===_0x4c9c2(0x160))this[_0x4c9c2(0xd7)]['speed']=_0x4fd7e2[_0x4c9c2(0x155)],this[_0x4c9c2(0xd7)][_0x4c9c2(0x1a6)]=_0x4fd7e2['gain'],this[_0x4c9c2(0xd7)][_0x4c9c2(0x108)]=_0x4fd7e2[_0x4c9c2(0x108)],this[_0x4c9c2(0xd7)]['angle']=_0x4fd7e2[_0x4c9c2(0x15b)];else var _0x2730e5=_0x2ae58e[_0x4c9c2(0x14a)][0x0],_0x18950c=_0x37a3f7[_0x4c9c2(0x14a)][0x1]-_0x2730e5,_0x32ffeb=_0x34fde4[_0x4c9c2(0x129)]/_0x41a627[_0x4c9c2(0x18e)](),_0x4b02e3=_0x2730e5+_0x18950c*_0x32ffeb;}},Spriteset_Base[_0x4f6add(0x175)][_0x4f6add(0x15f)]=function(){var _0x1214cd=_0x4f6add;this['_BrightEffectsColorAdjustFilter']=new PIXI[(_0x1214cd(0x107))][(_0x1214cd(0x18c))]();this['brightEffectsBaseOnly']()?'EDfzS'!==_0x1214cd(0x135)?this[_0x1214cd(0x194)][_0x1214cd(0x107)][_0x1214cd(0x188)](this[_0x1214cd(0x162)]):_0x5afc59[_0x1214cd(0x124)]():this[_0x1214cd(0x107)][_0x1214cd(0x188)](this['_BrightEffectsColorAdjustFilter']);var _0x5c1b31=$gameScreen['getBrightEffectsColorAdjustSettings']();_0x5c1b31&&_0x5c1b31[_0x1214cd(0x103)]>0x0&&(this['_BrightEffectsColorAdjustFilter'][_0x1214cd(0xf6)]=_0x5c1b31[_0x1214cd(0xe2)],this[_0x1214cd(0x162)][_0x1214cd(0x10d)]=_0x5c1b31[_0x1214cd(0x183)],this['_BrightEffectsColorAdjustFilter']['currentSaturate']=_0x5c1b31[_0x1214cd(0x110)]);},VisuMZ['BrightEffects']['Spriteset_Base_update']=Spriteset_Base[_0x4f6add(0x175)][_0x4f6add(0xea)],Spriteset_Base[_0x4f6add(0x175)]['update']=function(){var _0x2ec5db=_0x4f6add;VisuMZ[_0x2ec5db(0x10f)][_0x2ec5db(0xef)][_0x2ec5db(0xce)](this),this[_0x2ec5db(0x1a0)]();},Spriteset_Base[_0x4f6add(0x175)][_0x4f6add(0x1a0)]=function(){var _0x5553d6=_0x4f6add;this[_0x5553d6(0x112)](),this[_0x5553d6(0xfc)](),this[_0x5553d6(0xd6)]();},Spriteset_Base[_0x4f6add(0x175)]['updateBrightEffectsAdvBloomFilter']=function(){var _0x1bbcce=_0x4f6add;if(!!this[_0x1bbcce(0x125)]){if(_0x1bbcce(0xe1)!==_0x1bbcce(0xe9)){var _0x2fdbd8=$gameScreen[_0x1bbcce(0x1a1)](),_0x359b2f=_0x2fdbd8['duration'];_0x359b2f<=0x0?(this['_BrightEffectsAdvBloomFilter']['bloomScale']=_0x2fdbd8[_0x1bbcce(0x16c)],this['_BrightEffectsAdvBloomFilter'][_0x1bbcce(0xe2)]=_0x2fdbd8[_0x1bbcce(0xe2)],this[_0x1bbcce(0x125)][_0x1bbcce(0x130)]=_0x2fdbd8[_0x1bbcce(0x130)]):(_0x2fdbd8[_0x1bbcce(0x103)]--,this[_0x1bbcce(0x125)][_0x1bbcce(0x16c)]=(this[_0x1bbcce(0x125)][_0x1bbcce(0x16c)]*(_0x359b2f-0x1)+_0x2fdbd8['bloomScale'])/_0x359b2f,this['_BrightEffectsAdvBloomFilter'][_0x1bbcce(0xe2)]=(this[_0x1bbcce(0x125)][_0x1bbcce(0xe2)]*(_0x359b2f-0x1)+_0x2fdbd8[_0x1bbcce(0xe2)])/_0x359b2f,this['_BrightEffectsAdvBloomFilter'][_0x1bbcce(0x130)]=(this[_0x1bbcce(0x125)][_0x1bbcce(0x130)]*(_0x359b2f-0x1)+_0x2fdbd8[_0x1bbcce(0x130)])/_0x359b2f);}else var _0xb26fc=_0x4e2180(_0x18db95['$1'])||0x0;}},Spriteset_Base[_0x4f6add(0x175)][_0x4f6add(0xfc)]=function(){var _0x4c9cf9=_0x4f6add;if(!!this[_0x4c9cf9(0xd7)]){var _0xd5eff0=$gameScreen[_0x4c9cf9(0xe8)](),_0x5c6215=_0xd5eff0[_0x4c9cf9(0x103)];if(_0x5c6215<=0x0){if(_0x4c9cf9(0x119)==='OhJZd')this[_0x4c9cf9(0xd7)][_0x4c9cf9(0x155)]=_0xd5eff0[_0x4c9cf9(0x155)],this[_0x4c9cf9(0xd7)][_0x4c9cf9(0x1a6)]=_0xd5eff0[_0x4c9cf9(0x1a6)],this[_0x4c9cf9(0xd7)][_0x4c9cf9(0x108)]=_0xd5eff0[_0x4c9cf9(0x108)],this['_BrightEffectsGodrayFilter']['angle']=_0xd5eff0[_0x4c9cf9(0x15b)];else{_0x206ef4[_0x4c9cf9(0xdc)](_0x548eed,_0x54d8e6);const _0x5cb12c=_0x1774e0[_0x4c9cf9(0xe8)]();_0x5cb12c['visible']=_0xba01bf[_0x4c9cf9(0x158)],_0x5cb12c[_0x4c9cf9(0x155)]=_0x3bdfaf[_0x4c9cf9(0xcb)],_0x5cb12c['gain']=_0x16643d['Gain'],_0x5cb12c[_0x4c9cf9(0x108)]=_0x3fb3d2[_0x4c9cf9(0xdf)],_0x5cb12c[_0x4c9cf9(0x15b)]=_0x4fe063[_0x4c9cf9(0xcc)],_0x5cb12c[_0x4c9cf9(0x103)]=_0x20ec88['Duration'],!_0x2362e4['isSceneBattle']()&&(_0x1382e5[_0x4c9cf9(0x170)]=_0x3cd85b,_0x3ddf44['_brightEffectsGodrayVertSpeed']=_0x13f4ea);}}else{if(_0x4c9cf9(0x106)!==_0x4c9cf9(0x106))var _0x4a4f30=_0x5855db[_0x4c9cf9(0x133)][0x0],_0x2e7080=_0x1785ea['_brightEffectsBloomVertBrightness'][0x1]-_0x4a4f30,_0x5e25a7=_0x42048a['_realY']/_0xe3fede[_0x4c9cf9(0x101)](),_0x31e575=_0x4a4f30+_0x2e7080*_0x5e25a7;else _0xd5eff0['duration']--,this[_0x4c9cf9(0xd7)][_0x4c9cf9(0x155)]=(this[_0x4c9cf9(0xd7)][_0x4c9cf9(0x155)]*(_0x5c6215-0x1)+_0xd5eff0[_0x4c9cf9(0x155)])/_0x5c6215,this[_0x4c9cf9(0xd7)][_0x4c9cf9(0x1a6)]=(this['_BrightEffectsGodrayFilter'][_0x4c9cf9(0x1a6)]*(_0x5c6215-0x1)+_0xd5eff0[_0x4c9cf9(0x1a6)])/_0x5c6215,this['_BrightEffectsGodrayFilter'][_0x4c9cf9(0x108)]=(this[_0x4c9cf9(0xd7)][_0x4c9cf9(0x108)]*(_0x5c6215-0x1)+_0xd5eff0[_0x4c9cf9(0x108)])/_0x5c6215,this[_0x4c9cf9(0xd7)]['angle']=(this['_BrightEffectsGodrayFilter'][_0x4c9cf9(0x15b)]*(_0x5c6215-0x1)+_0xd5eff0['angle'])/_0x5c6215;}this[_0x4c9cf9(0xd7)][_0x4c9cf9(0x14e)]+=this[_0x4c9cf9(0xd7)]['speed'],this[_0x4c9cf9(0xd7)][_0x4c9cf9(0x13b)]=_0xd5eff0[_0x4c9cf9(0xdd)];}},Spriteset_Base[_0x4f6add(0x175)][_0x4f6add(0xd6)]=function(){var _0x1897e6=_0x4f6add;if(!!this[_0x1897e6(0x162)]){var _0xbe1c6a=$gameScreen[_0x1897e6(0x113)](),_0x4e9625=_0xbe1c6a[_0x1897e6(0x103)];_0x4e9625<=0x0?(this[_0x1897e6(0x162)][_0x1897e6(0xf6)]=_0xbe1c6a[_0x1897e6(0xe2)],this['_BrightEffectsColorAdjustFilter'][_0x1897e6(0x10d)]=_0xbe1c6a[_0x1897e6(0x183)],this[_0x1897e6(0x162)][_0x1897e6(0xf3)]=_0xbe1c6a[_0x1897e6(0x110)]):(_0xbe1c6a['duration']--,this[_0x1897e6(0x162)][_0x1897e6(0xf6)]=(this[_0x1897e6(0x162)][_0x1897e6(0xf6)]*(_0x4e9625-0x1)+_0xbe1c6a[_0x1897e6(0xe2)])/_0x4e9625,this[_0x1897e6(0x162)]['currentContrast']=(this[_0x1897e6(0x162)]['currentContrast']*(_0x4e9625-0x1)+_0xbe1c6a['contrast'])/_0x4e9625,this['_BrightEffectsColorAdjustFilter'][_0x1897e6(0xf3)]=(this[_0x1897e6(0x162)][_0x1897e6(0xf3)]*(_0x4e9625-0x1)+_0xbe1c6a[_0x1897e6(0x110)])/_0x4e9625),this[_0x1897e6(0x162)]['brightness'](this[_0x1897e6(0x162)][_0x1897e6(0xf6)]),this[_0x1897e6(0x162)][_0x1897e6(0x183)](this[_0x1897e6(0x162)][_0x1897e6(0x10d)],!![]),this[_0x1897e6(0x162)]['saturate'](this[_0x1897e6(0x162)][_0x1897e6(0xf3)],!![]);}};