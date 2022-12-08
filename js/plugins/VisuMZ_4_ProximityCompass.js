//=============================================================================
// VisuStella MZ - Proximity Compass
// VisuMZ_4_ProximityCompass.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ProximityCompass = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ProximityCompass = VisuMZ.ProximityCompass || {};
VisuMZ.ProximityCompass.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.07] [ProximityCompass]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Proximity_Compass_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that adds a compass to the map screen, marking
 * the position of nearby events and the directions of far away events. Events
 * are represented by icons from the icon set. This can be used to help the
 * player locate objectives, points of interests, NPCs, and more.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Places a compass on the main map screen.
 * * Said compass will show the marked events on it with icons.
 * * Marked events will move around the compass relative to the player's
 *   current position on the map.
 * * Fade out marked events that are too far from the player's location.
 * * Minimap subfeature will display all of the passable tiles under the
 *   compass frame.
 * * Minimap can be toggled to a larger version shown on the middle of the
 *   screen displaying more of the map's data all at once.
 * * Use custom graphics to kit out the minimap to your liking.
 * * The compass can be turned on/off in the Options menu.
 * * The compass can also be resized in the Options menu.
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
 * VisuMZ_1_EventsMoveCore
 * 
 * Region marked passability using the Events and Movement Core region
 * restriction notetags will also be counted towards the creation of the
 * minimap. These are the notetags that will affect the minimap:
 * 
 *   <All Allow Region: x>
 *   <Player Allow Region: x>
 *   <All Forbid Region: x>
 *   <Player Forbid Region: x>
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * ---
 * 
 * === Map Notetags ===
 * 
 * ---
 *
 * <Hide Compass>
 *
 * - Used for: Map Notetags
 * - Place this notetag inside maps where you don't want the compass to show.
 *
 * ---
 * 
 * <Hide Minimap>
 * 
 * - Used for: Map Notetags
 * - Place this notetag inside maps where you don't want the minimap to show.
 * - The compass, however, can show by itself.
 * - However, if the compass does not show, neither will the minimap.
 * 
 * ---
 * 
 * <Minimap Image: filename>
 * 
 * - Used for: Map Notetags
 * - Place this notetag inside maps that you want to use custom minimaps for
 *   instead of the rendered passability map created by the plugin.
 * - This image will appear in both the compass's minimap and the toggled
 *   large minimap.
 * - This will remove any blend modes used by the large minimap to keep color
 *   consistency in line with the compass.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder.
 *   - Filenames are case sensitive.
 *   - Leave out the filename extension from the notetag.
 * - If the compass does not show, neither will the minimap.
 * 
 * ---
 * 
 * <Explorable>
 * 
 * - Used for: Map Notetags
 * - Place this notetag inside maps that you want to be explorable.
 * - The explorable portion will only appear with the toggled "large" minimap.
 * - This has no effect on maps where the compass does not show.
 * - This overrides the "Default Explorable?" Plugin Parameter settings.
 * 
 * ---
 * 
 * <Already Explored>
 * 
 * - Used for: Map Notetags
 * - Place this notetag inside maps that you want to be already explored.
 * - The whole map will be visible from the getgo when viewing the "large"
 *   version of the minimap.
 * - This has no effect on maps where the compass does not show.
 * - This overrides the "Default Explorable?" Plugin Parameter settings.
 * 
 * ---
 * 
 * === Event Notetags and Comment Tags ===
 * 
 * ---
 *
 * <Compass Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This will assign an icon to the event or the event's page.
 * - Replace 'x' with a number representing the icon index you wish for this
 *   event or event page to appear as in the Proximity Compass.
 * - This notetag effect will take priority over the <Minimap Icon: x> notetag.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Compass Proximity: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This icon will only appear on the compass if the player is within range.
 * - Replace 'x' with the number of tiles the player must be within range of
 *   this event or event page in order to appear in the Proximity Compass.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Minimap Icon: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This icon will only appear if there is no designated compass icon AND
 *   will ONLY appear on the large minimap.
 * - If <Compass Icon: x> is used, then <Compass Icon: x> will take priority.
 * - This is primarily used to mark NPC locations.
 * - This will override the setting found in the Plugin Parameters.
 * - Minimap icons will appear a different size (by default smaller) than
 *   events with <Compass Icon: x>.
 * 
 * ---
 * 
 * <Hide Minimap Icon>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Makes it so that it will not show an icon while on the minimap.
 * - If <Compass Icon: x> is used, then <Compass Icon: x> will take priority.
 * - This is primarily used to hide event locations that would be marked by
 *   default due to the Plugin Parameters.
 * - This will override the setting found in the Plugin Parameters.
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
 * === Compass Plugin Commands ===
 * 
 * ---
 *
 * Compass: Show/Hide Proximity Compass
 * - Show or hide the Proximity Compass.
 * - Does not bypass user settings.
 *
 *   Setting:
 *   - Show or hide the Proximity Compass.
 *   - Does not bypass user settings.
 *
 * ---
 *
 * Compass: Change Player Icon
 * - Change the player icon to a different icon.
 *
 *   Icon Index:
 *   - This is the icon you wish to change the player icon to.
 *
 * ---
 * 
 * === Minimap Plugin Commands ===
 * 
 * ---
 *
 * Minimap: Clear Explored Minimap
 * - Clears target map's exploration progress for the large minimap.
 * - Does not work on maps with <Already Explored> notetag.
 *
 *   Map ID:
 *   - ID of the map you wish to clear exploration progress for.
 *   - Use '0' for current map.
 *   - You may use JavaScript.
 *
 * ---
 *
 * Minimap: Fully Reveal Minimap
 * - Fully reveals the minimap for target map.
 *
 *   Map ID:
 *   - ID of the map you wish to reveal map for.
 *   - Use '0' for current map.
 *   - You may use JavaScript.
 *
 * ---
 *
 * Minimap: Toggle Large Minimap
 * - Show, hide, or toggle the large minimap.
 * - Requires Minimaps to be enabled.
 *
 *   Show/Hide?:
 *   - Show, hide, or toggle the large minimap.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * Default settings used for the Proximity Compass.
 *
 * ---
 *
 * Default
 * 
 *   Show by Default:
 *   - Show the Proximity Compass by default?
 * 
 *   Proximity Range:
 *   - Default range from the player to be shown on the Proximity Compass.
 * 
 *   Player Icon:
 *   - Icon used for the player to show on the Proximity Compass.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Compass Settings
 * ============================================================================
 *
 * Compass settings used for the Proximity Compass.
 *
 * ---
 *
 * Position
 * 
 *   Center X:
 *   - Code used to calculate the X position of the compass's center.
 *   - This is NOT the upper left corner of the compass.
 * 
 *   Center Y:
 *   - Code used to calculate the Y position of the compass's center.
 *   - This is NOT the upper left corner of the compass.
 *
 * ---
 *
 * Contents
 * 
 *   Default Event Icons:
 *     
 *     Below Characters:
 *     - Default icon used for events on below characters level.
 *     - These appear on the compass and large minimap.
 * 
 *     Same as Characters:
 *     - Default icon used for events on same as characters level.
 *     - These appear on the compass and large minimap.
 * 
 *     Above Characters:
 *     - Default icon used for events on above characters level.
 *     - These appear on the compass and large minimap.
 * 
 *   Filename:
 *   - The picture used for the compass' frame.
 *   - This will come from the img/pictures/ folder.
 * 
 *   Radius:
 *   - Radius of the Proximity Compass in pixels.
 * 
 *   Tile Scale:
 *   - The scale used to calculate the distance of a tile relative to the
 *     distance on the compass
 * 
 *   Back Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Back Opacity:
 *   - Sets the opacity of the back color.
 *
 * ---
 *
 * Fading
 * 
 *   Close Minimum Opacity:
 *   - Minimum opacity when the player is too close to the compass on the
 *     map screen.
 *   - Hiding the compass during messages and events will make the compass
 *     fully transparent.
 * 
 *   Compass Fade Speed:
 *   - Fade speed of the compass when toggled on/off.
 *   - Lower is slower. Higher is faster.
 * 
 *   Icon Fade Speed:
 *   - Fade speed of the icons when out of range.
 *   - Lower is slower. Higher is faster.
 *
 * ---
 *
 * Hiding
 * 
 *   Hide During Messages:
 *   - If true, hide compass whenever a message is being displayed.
 * 
 *   Hide During Events:
 *   - If true, hide compass whenever an event is running.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Minimap Settings
 * ============================================================================
 *
 * As of the v1.06 update, this plugin now has a Minimap feature. This section
 * governs the minimap feature, if you want to use it, and how it appears.
 * 
 * A keyboard button can be used to toggle the "large" minimap (provided
 * minimaps are enabled for the current map). This minimap will show the areas
 * that are explored and not explored. As the player moves around, the
 * exploration area will enlarge based on the game's screen size.
 * 
 * For mouse toggling, we recommend using VisuStella MZ's Picture Common Events
 * and this plugin's "Minimap: Toggle Large Minimap" Plugin Command for the
 * best customization options.
 * 
 * The minimap used on the compass itself will always be fully revealed due to
 * its limited area of visibility.
 *
 * ---
 *
 * General
 * 
 *   Enable Minimap?:
 *   - Enable the minimap for the game? Cannot disable midgame.
 *   - The <Hide Minimap> map notetag can hide it though.
 *
 * ---
 *
 * Contents
 * 
 *   Filename:
 *   - Use this picture if current map uses a minimap.
 *   - This will come from the img/pictures/ folder.
 *   - If empty, it will use the filename used by the default compass.
 * 
 *   Hide Ceilings:
 *   - Ceiling autotiles are normally passable.
 *   - Hide them in the minimap?
 * 
 *   Tile Color:
 *   - Sets the color of the passable tiles found on the minimap.
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Tile Opacity:
 *   - What is the opacity level for the tiles?
 * 
 *   Tile Sharpness:
 *   - How sharp do you want the passability minimap to be?
 *   - Use a number from 2 to 16.
 *
 * ---
 * 
 * Large Minimap Settings
 * 
 *   Border Buffer:
 *   - Determine the buffer distance from the edge of the map when creating the
 *     large minimap.
 * 
 *   Default Event Icons:
 *     
 *     Below Characters:
 *     - Default icon used for events on below characters level.
 *     - These only appear on the large minimap.
 * 
 *     Same as Characters:
 *     - Default icon used for events on same as characters level.
 *     - These only appear on the large minimap.
 * 
 *     Above Characters:
 *     - Default icon used for events on above characters level.
 *     - These only appear on the large minimap.
 * 
 *   Default Explorable?:
 *   - By default, are maps explorable or already mapped?
 *   - Notetags will override this feature.
 * 
 *   Hide During Messages:
 *   - If true, hide large minimap whenever a message is being displayed.
 * 
 *   Hide During Events:
 *   - If true, hide large minimap whenever an event is running.
 * 
 *   Icon Scaling:
 * 
 *     Player Icon Scale:
 *     - What is the icon scale for the player icon?
 *     - Only applies to the large minimap.
 * 
 *     Compass Icon Scale:
 *     - What is the icon scale for <Compass Icon: x>?
 *     - Only applies to the large minimap.
 * 
 *     Minimap Icon Scale:
 *     - What is the icon scale for <Minimap Icon: x>?
 *     - Only applies to the large minimap.
 * 
 *   Ignore Icon Proximity:
 *   - If true, <Compass Proximity: x> notetag effects are ignored on the
 *     large minimap.
 * 
 *   Toggle Key:
 *   - What key is used to toggle the larger minimap on/off?
 *   - This feature is not usable unless the compass is enabled.
 *   - This feature won't trigger if there is a <Hide Minimap> notetag.
 * 
 * ---
 * 
 * Large Minimap Background Image
 * 
 *   Background Filename:
 *   - Use this picture if for the large minimap's background.
 *   - This will come from the img/pictures/ folder.
 * 
 *   Hide Background Color:
 *   - If true, hide the background color when using the minimap
 *     background image.
 * 
 *   Image Opacity:
 *   - Sets the opacity of the minimap background image.
 * 
 *   Minimap Blend Mode:
 *   - What kind of blend mode do you wish to apply to the rendered
 *     passability minimap?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for the Proximity Compass.
 *
 * ---
 *
 * Options
 * 
 *   Add Show Option?:
 *   - Add the 'Show Compass' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Add Size Option?:
 *   - Add the 'Compass Size' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
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
 * Version 1.07: August 11, 2022
 * * Feature Update!
 * ** Minimap can now no-longer be toggled during events and messages if the
 *    other minimap-related settings have it disabled. Update made by Arisu.
 * 
 * Version 1.06: June 16, 2022
 * * Documentation Update!
 * ** List new minimap feature under Introduction.
 * ** Added "VisuStella MZ Compatibility" for VisuMZ_1_EventsMoveCore in
 *    regards to the new Minimap feature.
 * ** Help file updated for new features.
 * ** Split the Notetags section up between "Map Notetags" and "Event Notetags"
 *    for better category searching.
 * ** Added segment to <Compass Icon: x> notetag:
 * *** This notetag effect will take priority over the <Minimap Icon: x>
 *     notetag.
 * * New Features!
 * ** New Plugin Parameter added by Olivia and sponsored by AndyL:
 * *** Plugin Parameters > Compass Settings > Contents > Default Event Icons
 * **** These settings allow you to set the default icons used for the compass
 *      based on their character priority level.
 * *** Plugin Parameters > Compass Settings > Fading > Close Minimum Opacity
 * **** Minimum opacity when the player is too close to the compass on the map
 *      screen. Hiding the compass during messages and events will make the
 *      compass fully transparent.
 * ** New Feature Set: Minimap, added by Olivia and sponsored by AndlyL:
 * *** Plugin Parameters > Minimap Settings
 * **** Read the help file for details.
 * ** New Notetags added by Olivia and sponsored by AndyL:
 * *** <Hide Minimap>
 * *** <Explorable>
 * *** <Already Explored>
 * *** <Minimap Icon: x>
 * *** <Hide Minimap Icon>
 * **** Read the help file for details.
 * ** New Plugin Commands added by Olivia and sponsored by AndyL:
 * *** Minimap: Clear Explored Minimap
 * *** Minimap: Fully Reveal Minimap
 * *** Minimap: Toggle Large Minimap
 * **** Read the help file for details.
 * 
 * Version 1.05: March 31, 2022
 * * Feature Update!
 * ** Spawned events with proximity compass icons will no longer show the whole
 *    spritesheet for a frame. Update made by Olivia.
 * 
 * Version 1.04: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: January 15, 2021
 * * Feature Update!
 * ** Failsafes added in case events added manually through other plugins do
 *    not update with proper events.
 * 
 * Version 1.02: November 15, 2020
 * * Bug Fix!
 * ** Events spawned by the Events & Movement Core will now have their compass
 *    icons displayed upon spawning without requiring a reload of the map. Fix
 *    made by Arisu.
 * 
 * Version 1.01: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 *
 * Version 1.00: October 23, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CompassVisibility
 * @text Compass: Show/Hide Proximity Compass
 * @desc Show or hide the Proximity Compass.
 * Does not bypass user settings.
 *
 * @arg value:eval
 * @text Setting
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the Proximity Compass.
 * Does not bypass user settings.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CompassPlayerIcon
 * @text Compass: Change Player Icon
 * @desc Change the player icon to a different icon.
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @desc This is the icon you wish to change the player icon to.
 * @default 82
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Minimap
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MinimapClearExplored
 * @text Minimap: Clear Explored Minimap
 * @desc Clears target map's exploration progress for the large minimap.
 * Does not work on maps with <Already Explored> notetag.
 *
 * @arg MapID:eval
 * @text Map ID
 * @desc ID of the map you wish to clear exploration progress for.
 * Use '0' for current map. You may use JavaScript.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MinimapFullExplore
 * @text Minimap: Fully Reveal Minimap
 * @desc Fully reveals the minimap for target map.
 *
 * @arg MapID:eval
 * @text Map ID
 * @desc ID of the map you wish to reveal map for.
 * Use '0' for current map. You may use JavaScript.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MinimapToggle
 * @text Minimap: Toggle Large Minimap
 * @desc Show, hide, or toggle the large minimap.
 * Requires Minimaps to be enabled.
 *
 * @arg Value:str
 * @text Show/Hide?
 * @type select
 * @option Show
 * @value show
 * @option Hide
 * @value hide
 * @option Toggle
 * @value toggle
 * @desc Show, hide, or toggle the large minimap.
 * @default toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param ProximityCompass
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Default:struct
 * @text Default Settings
 * @type struct<Default>
 * @desc Default settings used for the Proximity Compass.
 * @default {"Show:eval":"true","Proximity:num":"1000","PlayerIcon:num":"82"}
 *
 * @param Compass:struct
 * @text Compass Settings
 * @type struct<Compass>
 * @desc Compass settings used for the Proximity Compass.
 * @default {"Position":"","CenterX:str":"Graphics.width - 128 * ConfigManager.compassSize / 100","CenterY:str":"Graphics.height - 128 * ConfigManager.compassSize / 100","Contents":"","DefaultEventIcons":"","DefaultEventIcon_Below:num":"0","DefaultEventIcon_Same:num":"0","DefaultEventIcon_Above:num":"0","Filename:str":"","Radius:num":"100","TileScale:num":"0.25","BackColor:str":"#000000","BackOpacity:num":"200","Fading":"","MinCompassOpacity:num":"128","CompassFadeSpeed:num":"16","IconFadeSpeed:num":"16","Hiding":"","HideMessage:eval":"false","HideEvents:eval":"false"}
 *
 * @param Minimap:struct
 * @text Minimap Settings
 * @type struct<Minimap>
 * @desc Minimap settings used for the Proximity Compass.
 * @default {"General":"","Enable:eval":"true","Contents":"","Filename:str":"","HideCeilingPassability:eval":"true","TileColor:str":"#ccccff","TileOpacity:num":"128","TileSharpness:num":"8","Large":"","BorderBuffer:num":"72","DefaultEventIcons":"","DefaultEventIcon_Below:num":"0","DefaultEventIcon_Same:num":"20","DefaultEventIcon_Above:num":"0","DefaultExplore:eval":"true","HideMessage:eval":"true","HideEvents:eval":"true","IconScale":"","PlayerIconScale:num":"1.00","CompassIconScale:num":"1.00","MinimapIconScale:num":"0.50","IgnoreProximity:eval":"true","ToggleKey:str":"tab","LargeBack":"","BackFilename:str":"","HideBackColor:eval":"true","ImageOpacity:num":"255","PassabilityBlendMode:num":"2"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for the Proximity Compass.
 * @default {"AddShowOption:eval":"true","ShowName:str":"Show Compass","AddSizeOption:eval":"true","SizeName:str":"Compass Size","AdjustRect:eval":"true"}
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
 * Default Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Default:
 *
 * @param Show:eval
 * @text Show by Default
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Proximity Compass by default?
 * @default true
 *
 * @param Proximity:num
 * @text Proximity Range
 * @type number
 * @min 1
 * @max 1000
 * @desc Default range from the player to be shown on the Proximity Compass.
 * @default 1000
 *
 * @param PlayerIcon:num
 * @text Player Icon
 * @desc Icon used for the player to show on the Proximity Compass.
 * @default 82
 *
 */
/* ----------------------------------------------------------------------------
 * Compass Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Compass:
 *
 * @param Position
 *
 * @param CenterX:str
 * @text Center X
 * @parent Position
 * @desc Code used to calculate the X position of the compass's center.
 * This is NOT the upper left corner of the compass.
 * @default Graphics.width - 128 * ConfigManager.compassSize / 100
 *
 * @param CenterY:str
 * @text Center Y
 * @parent Position
 * @desc Code used to calculate the Y position of the compass's center.
 * This is NOT the upper left corner of the compass.
 * @default Graphics.height - 128 * ConfigManager.compassSize / 100
 *
 * @param Contents
 * 
 * @param DefaultEventIcons
 * @text Default Event Icons
 * @parent Contents
 * 
 * @param DefaultEventIcon_Below:num
 * @text Below Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on below characters level.
 * These appear on the compass and large minimap.
 * @default 0
 * 
 * @param DefaultEventIcon_Same:num
 * @text Same as Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on same as characters level.
 * These appear on the compass and large minimap.
 * @default 0
 * 
 * @param DefaultEventIcon_Above:num
 * @text Above Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on above characters level.
 * These appear on the compass and large minimap.
 * @default 0
 *
 * @param Filename:str
 * @text Filename
 * @parent Contents
 * @type file
 * @dir img/pictures/
 * @desc The picture used for the compass' frame.
 * This will come from the img/pictures/ folder.
 * @default 
 *
 * @param Radius:num
 * @text Radius
 * @parent Contents
 * @type number
 * @min 1
 * @desc Radius of the Proximity Compass in pixels.
 * @default 100
 *
 * @param TileScale:num
 * @text Tile Scale
 * @parent Contents
 * @desc The scale used to calculate the distance of a tile relative to the distance on the compass
 * @default 0.25
 *
 * @param BackColor:str
 * @text Back Color
 * @parent Contents
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #000000
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent Contents
 * @type number
 * @min 1
 * @max 255
 * @desc Sets the opacity of the back color.
 * @default 200
 *
 * @param Fading
 *
 * @param MinCompassOpacity:num
 * @text Close Minimum Opacity
 * @parent Fading
 * @type number
 * @min 0
 * @desc Minimum opacity when the player is too close to the
 * compass on the map screen.
 * @default 128
 *
 * @param CompassFadeSpeed:num
 * @text Compass Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the compass when toggled on/off.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param IconFadeSpeed:num
 * @text Icon Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the icons when out of range.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param Hiding
 *
 * @param HideMessage:eval
 * @text Hide During Messages
 * @parent Hiding
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide compass whenever a message is being displayed.
 * @default false
 *
 * @param HideEvents:eval
 * @text Hide During Events
 * @parent Hiding
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide compass whenever an event is running.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Minimap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Minimap:
 *
 * @param General
 * 
 * @param Enable:eval
 * @text Enable Minimap?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the minimap for the game? Cannot disable midgame.
 * The <Hide Minimap> map notetag can hide it though.
 * @default true
 *
 * @param Contents
 *
 * @param Filename:str
 * @text Filename
 * @parent Contents
 * @type file
 * @dir img/pictures/
 * @desc Use this picture if current map uses a minimap.
 * This will come from the img/pictures/ folder.
 * @default 
 *
 * @param HideCeilingPassability:eval
 * @text Hide Ceilings
 * @parent Contents
 * @type boolean
 * @on Hide
 * @off Show
 * @desc Ceiling autotiles are normally passable.
 * Hide them in the minimap?
 * @default true
 *
 * @param TileColor:str
 * @text Tile Color
 * @parent Contents
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ccccff
 *
 * @param TileOpacity:num
 * @text Tile Opacity
 * @parent Contents
 * @type number
 * @min 1
 * @max 255
 * @desc What is the opacity level for the tiles?
 * @default 128
 *
 * @param TileSharpness:num
 * @text Tile Sharpness
 * @parent Contents
 * @type number
 * @min 2
 * @max 16
 * @desc How sharp do you want the passability minimap to be?
 * Use a number from 2 to 16.
 * @default 8
 * 
 * @param Large
 * @text Large Minimap Settings
 * 
 * @param BorderBuffer:num
 * @text Border Buffer
 * @parent Large
 * @type number
 * @min 0
 * @desc Determine the buffer distance from the edge of the map
 * when creating the large minimap.
 * @default 72
 * 
 * @param DefaultEventIcons
 * @text Default Event Icons
 * @parent Large
 * 
 * @param DefaultEventIcon_Below:num
 * @text Below Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on below characters level.
 * These only appear on the large minimap.
 * @default 0
 * 
 * @param DefaultEventIcon_Same:num
 * @text Same as Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on same as characters level.
 * These only appear on the large minimap.
 * @default 20
 * 
 * @param DefaultEventIcon_Above:num
 * @text Above Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on above characters level.
 * These only appear on the large minimap.
 * @default 0
 * 
 * @param DefaultExplore:eval
 * @text Default Explorable?
 * @parent Large
 * @type boolean
 * @on Explorable
 * @off Already Mapped
 * @desc By default, are maps explorable or already mapped?
 * Notetags will override this feature.
 * @default true
 *
 * @param HideMessage:eval
 * @text Hide During Messages
 * @parent Large
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide large minimap whenever a message is being displayed.
 * @default true
 *
 * @param HideEvents:eval
 * @text Hide During Events
 * @parent Large
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide large minimap whenever an event is running.
 * @default true
 * 
 * @param IconScale
 * @text Icon Scaling
 * @parent Large
 *
 * @param PlayerIconScale:num
 * @text Player Icon Scale
 * @parent IconScale
 * @desc What is the icon scale for the player icon?
 * Only applies to the large minimap.
 * @default 1.00
 *
 * @param CompassIconScale:num
 * @text Compass Icon Scale
 * @parent IconScale
 * @desc What is the icon scale for <Compass Icon: x>?
 * Only applies to the large minimap.
 * @default 1.00
 *
 * @param MinimapIconScale:num
 * @text Minimap Icon Scale
 * @parent IconScale
 * @desc What is the icon scale for <Minimap Icon: x>?
 * Only applies to the large minimap.
 * @default 0.50
 *
 * @param IgnoreProximity:eval
 * @text Ignore Icon Proximity
 * @parent Large
 * @type boolean
 * @on Ignore
 * @off Normal
 * @desc If true, <Compass Proximity: x> notetag effects are
 * ignored on the large minimap.
 * @default true
 * 
 * @param ToggleKey:str
 * @text Toggle Key
 * @parent Large
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc What key is used to toggle the larger minimap on/off?
 * @default tab
 * 
 * @param LargeBack
 * @text Large Minimap Image
 *
 * @param BackFilename:str
 * @text Background Filename
 * @parent LargeBack
 * @type file
 * @dir img/pictures/
 * @desc Use this picture if for the large minimap's background.
 * This will come from the img/pictures/ folder.
 * @default 
 *
 * @param HideBackColor:eval
 * @text Hide Background Color
 * @parent LargeBack
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide the background color when using the minimap
 * background image.
 * @default true
 * 
 * @param ImageOpacity:num
 * @text Image Opacity
 * @parent LargeBack
 * @type number
 * @min 1
 * @max 255
 * @desc Sets the opacity of the minimap background image.
 * @default 255
 *
 * @param PassabilityBlendMode:num
 * @text Minimap Blend Mode
 * @parent LargeBack
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the
 * rendered passability minimap?
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param AddShowOption:eval
 * @text Add Show Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Compass' option to the Options menu?
 * @default true
 *
 * @param ShowName:str
 * @text Option Name
 * @parent AddShowOption:eval
 * @desc Command name of the option.
 * @default Show Compass
 *
 * @param AddSizeOption:eval
 * @text Add Size Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Compass Size' option to the Options menu?
 * @default true
 *
 * @param SizeName:str
 * @text Option Name
 * @parent AddSizeOption:eval
 * @desc Command name of the option.
 * @default Compass Size
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 */
//=============================================================================

const _0x499a1d=_0x5bf6;(function(_0x14d825,_0x38b7bc){const _0x355da1=_0x5bf6,_0x2145e0=_0x14d825();while(!![]){try{const _0x43f8f7=-parseInt(_0x355da1(0xce))/0x1*(-parseInt(_0x355da1(0x175))/0x2)+-parseInt(_0x355da1(0xc2))/0x3*(-parseInt(_0x355da1(0x1bd))/0x4)+-parseInt(_0x355da1(0xb3))/0x5*(-parseInt(_0x355da1(0xcc))/0x6)+-parseInt(_0x355da1(0x137))/0x7*(-parseInt(_0x355da1(0x120))/0x8)+-parseInt(_0x355da1(0x206))/0x9+-parseInt(_0x355da1(0x163))/0xa+-parseInt(_0x355da1(0x16b))/0xb;if(_0x43f8f7===_0x38b7bc)break;else _0x2145e0['push'](_0x2145e0['shift']());}catch(_0x300044){_0x2145e0['push'](_0x2145e0['shift']());}}}(_0x566b,0x440ee));function _0x566b(){const _0x26116f=['autotileType','96hnCxmm','MapID','jxinI','isPlayerPassableByAnyDirection','includes','return\x200','NyCuB','PlayerAllow','fullRevealUnexploredMask','UDUzD','lApCs','setInitialOpacity','updatePositionMinimapSmall','JSON','Settings','update','HideMessage','screenX','Proximity','code','_ProximityMinimap','ARRAYSTR','eFOdm','262430mjXCAd','Yoqoo','max','Game_System_initialize','qcIMi','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','#%1','drawOnUnexploredMask','isBusy','isLoopHorizontal','addProximityCompassSizeCommand','getMinimapExploredTiles','BackFilename','DEFAULT_EXPLORE','Window_Options_changeVolume','BackColor','usesPictureBack','isLoopVertical','BORDER_BUFFER','removeFullRevealMinimap','updateExploration','jSuRJ','nLZyD','deltaX','isTriggered','IconSet','floor','iconHeight','_unexploredMask','JxLOe','Filename','registerMinimapExploredTiles','makeData','_scene','getConfigValue','MYfEf','scale','TileScale','yHEyX','description','CompassPlayerIcon','Window_Options_isVolumeSymbol','registerCommand','DTVWT','4005680pwxJAD','_minimapExploredTiles','_playerSprite','Options','fillRect','_priorityType','IconFadeSpeed','initMembers','10549814yLzKqJ','GEoEF','page','isPassable','updatePositionMinimapLarge','cos','_minimapScale','isCloseToCompassScreenPosition','COMPASS_FRAME','version','5818UXZBwO','createCustomMinimap','bCPtA','MinimapToggle','Pcgyk','Value','parent','Default','ARRAYEVAL','getCompassFrameFilename','checkProximityCompassStringTags','Game_Event_setupSpawn','updateMain','updateProximityCompassMinimapToggleKey','thZes','call','_realX','clear','addFullRevealMinimap','setupProximityCompassEffects','BACK_IMG_BLENDMODE','MinimapClearExplored','onLoadImageMinimap','SvtJW','CUQGm','event','CompassFadeSpeed','initProximityCompassEffects','_minimapSprite','updatePositionClassic','ProximityCompass','PassabilityBlendMode','AllAllow','_ProximityCompassFrameSprite','DefaultEventIcon_Same','exit','getFullRevealMinimaps','Window_Options_addGeneralOptions','QhrHQ','addChild','getLargeMinimapMode','parameters','status','setupSpawnProximityCompass','vsIyL','yIfgA','AdjustRect','Minimap','createUnexplored','isShowProximityCompass','setupSpawnProximityMinimap','constructor','mRrrW','Scene_Map_updateMain','PlayerForbid','isLargeMinimapChild','opacity','updatePosition','clamp','showCompass','EVAL','isEventRunning','createPictureBack','round','eCzMK','isVolumeSymbol','MinCompassOpacity','show','ConfigManager_applyData','atan2','textColor','isShow','4RysXFX','updateMinimap','setupSpawn','hIaaH','_passabilityMinimaps','sort','parse','JJsSM','createDefaultMinimap','white','getColor','_largeMinimapChild','DefaultEventIcon_Below','changeVolume','PcgLP','_characterContainer','AddShowOption','aZpHe','ZdDBP','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','sqrt','dNMbP','Radius','_playerCompassIcon','BACK_FILENAME','ujlUg','createFrame','BjlLr','minimapPassableColor','list','changeProximityCompassSize','eaTZe','vUEPH','filter','createImageMinimap','setupProximityCompassCommentTags','CenterX','BorderBuffer','addShowProximityCompassCommand','TileSharpness','tileHeight','createSprites','bind','createProximityScreenMinimap','initializeProximityCompass','drawCircle','GdcwQ','cFztQ','TILE_SIZE','bitmap','clearPageSettings','hideCompass','MinimapIconScale','drawUnexplored','contains','updateScale','TileColor','addGeneralOptions','ZMsIb','_realY','createProximityCompass','getPassabilityMinimap','_regionRules','DefaultExplore','ARRAYSTRUCT','PlayerIconScale','apply','Show','applyBackgroundScale','%1,%2','setupPageSettings','getCompassIcon','_compassProximity','2205666DbjQzx','NUM','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','HideEvents','name','PECWE','setShowProximityCompass','KJsKM','note','PaPDt','_ProximityCompassSprite','compassSize','PZnpx','_lastPlayerY','updateOpacity','anchor','blendMode','vXlpa','toggle','Game_Event_setupPageSettings','PlayerIcon','setLargeMinimapChild','sbymN','getCompassProximity','setFrame','push','clearUnexploredMask','MinimapFullExplore','debugTestRevealMap','TliLH','_minimapIconIndex','FUNC','abs','50epinYs','Scene_Map_createSpriteset','Game_Event_clearPageSettings','_emptyBitmap','smooth','TILE_OPACITY','iconIndex','_largeMinimapMode','CompassIconScale','addLoadListener','width','pOWGd','addCommand','BACK_IMG_OPACITY','create','1449333ifvbuu','naVMF','VisuMZ_1_EventsMoveCore','_fullRevealMaps','_showProximityCompass','split','CompassVisibility','AraLS','ConvertParams','_eventOverload','327684xfLKYd','trim','139icXbZv','pAgOV','HyUNt','xaddv','Enable','HideCeilingPassability','getPlayerCompassIcon','IGNORE_CEILING_PASSABILITY','hideMinimap','loadSystem','height','createContainer','_erased','_minimapMaskSprite','flPdQ','ConfigManager_makeData','AllForbid','iQjfI','onLoadCustomMinimap','map','createMinimap','ARRAYFUNC','loadPicture','_pictureBackSprite','hide','Scene_Options_maxCommands','initialize','_iconIndex','ceil','VEFMl','clearRect','lUdBt','_maskContainer','FArwh','format','ShowName','createBackground','BWnwv','_lastPlayerX','kfeTo','ENABLE','setPlayerCompassIcon','tileWidth','STR','clearMinimapExploredMapData','IgnoreProximity','regionId','Compass','STRUCT','mapId','createPassabilityMinimap','bVWRT','sin','createSpriteset','min','setLargeMinimapMode','events','_character','isMinimapNormallyVisible','setupProximityCompassNotetags','match','WRRHm','screenY','_compassIconIndex','applyData','isMinimapSprite','_backgroundSprite','_ProximityCompassBackgroundSprite','prototype','ToggleKey','updateFrame','TILE_COLOR','_characterSprites','IwYjW','createCharacters','isSceneMap','SPKTC','gmPyt','CenterY','maxCommands','changeValue'];_0x566b=function(){return _0x26116f;};return _0x566b();}function _0x5bf6(_0x19690d,_0x564fd1){const _0x566b9f=_0x566b();return _0x5bf6=function(_0x5bf6f8,_0x4704bf){_0x5bf6f8=_0x5bf6f8-0xab;let _0x395860=_0x566b9f[_0x5bf6f8];return _0x395860;},_0x5bf6(_0x19690d,_0x564fd1);}var label=_0x499a1d(0x193),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x499a1d(0x1de)](function(_0x5a8611){const _0x3b0a6d=_0x499a1d;return _0x5a8611[_0x3b0a6d(0x19f)]&&_0x5a8611[_0x3b0a6d(0x15e)][_0x3b0a6d(0x124)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x598fe9,_0x17b72b){const _0x119e4c=_0x499a1d;for(const _0xa93508 in _0x17b72b){if(_0xa93508[_0x119e4c(0x10a)](/(.*):(.*)/i)){const _0x9e8a16=String(RegExp['$1']),_0x457f87=String(RegExp['$2'])['toUpperCase']()[_0x119e4c(0xcd)]();let _0x28de26,_0x432ff1,_0x4d4e9c;switch(_0x457f87){case _0x119e4c(0x207):_0x28de26=_0x17b72b[_0xa93508]!==''?Number(_0x17b72b[_0xa93508]):0x0;break;case'ARRAYNUM':_0x432ff1=_0x17b72b[_0xa93508]!==''?JSON[_0x119e4c(0x1c3)](_0x17b72b[_0xa93508]):[],_0x28de26=_0x432ff1[_0x119e4c(0xe1)](_0x5ac61f=>Number(_0x5ac61f));break;case _0x119e4c(0x1b1):_0x28de26=_0x17b72b[_0xa93508]!==''?eval(_0x17b72b[_0xa93508]):null;break;case _0x119e4c(0x17d):_0x432ff1=_0x17b72b[_0xa93508]!==''?JSON[_0x119e4c(0x1c3)](_0x17b72b[_0xa93508]):[],_0x28de26=_0x432ff1[_0x119e4c(0xe1)](_0x361011=>eval(_0x361011));break;case _0x119e4c(0x12d):_0x28de26=_0x17b72b[_0xa93508]!==''?JSON[_0x119e4c(0x1c3)](_0x17b72b[_0xa93508]):'';break;case'ARRAYJSON':_0x432ff1=_0x17b72b[_0xa93508]!==''?JSON['parse'](_0x17b72b[_0xa93508]):[],_0x28de26=_0x432ff1['map'](_0x5f3756=>JSON[_0x119e4c(0x1c3)](_0x5f3756));break;case _0x119e4c(0xb1):_0x28de26=_0x17b72b[_0xa93508]!==''?new Function(JSON[_0x119e4c(0x1c3)](_0x17b72b[_0xa93508])):new Function(_0x119e4c(0x125));break;case _0x119e4c(0xe3):_0x432ff1=_0x17b72b[_0xa93508]!==''?JSON[_0x119e4c(0x1c3)](_0x17b72b[_0xa93508]):[],_0x28de26=_0x432ff1[_0x119e4c(0xe1)](_0x2447e2=>new Function(JSON[_0x119e4c(0x1c3)](_0x2447e2)));break;case _0x119e4c(0xf9):_0x28de26=_0x17b72b[_0xa93508]!==''?String(_0x17b72b[_0xa93508]):'';break;case _0x119e4c(0x135):_0x432ff1=_0x17b72b[_0xa93508]!==''?JSON[_0x119e4c(0x1c3)](_0x17b72b[_0xa93508]):[],_0x28de26=_0x432ff1['map'](_0x4a690e=>String(_0x4a690e));break;case _0x119e4c(0xfe):_0x4d4e9c=_0x17b72b[_0xa93508]!==''?JSON[_0x119e4c(0x1c3)](_0x17b72b[_0xa93508]):{},_0x28de26=VisuMZ[_0x119e4c(0xca)]({},_0x4d4e9c);break;case _0x119e4c(0x1fd):_0x432ff1=_0x17b72b[_0xa93508]!==''?JSON[_0x119e4c(0x1c3)](_0x17b72b[_0xa93508]):[],_0x28de26=_0x432ff1[_0x119e4c(0xe1)](_0x3a6f87=>VisuMZ[_0x119e4c(0xca)]({},JSON[_0x119e4c(0x1c3)](_0x3a6f87)));break;default:continue;}_0x598fe9[_0x9e8a16]=_0x28de26;}}return _0x598fe9;},(_0x50bd85=>{const _0x4d196e=_0x499a1d,_0x4cb249=_0x50bd85[_0x4d196e(0x20a)];for(const _0x11abea of dependencies){if('HyUNt'!==_0x4d196e(0xd0))return _0x3b2735[_0x4d196e(0x193)][_0x4d196e(0x160)][_0x4d196e(0x184)](this,_0x3b61a6);else{if(!Imported[_0x11abea]){alert(_0x4d196e(0x208)[_0x4d196e(0xf0)](_0x4cb249,_0x11abea)),SceneManager[_0x4d196e(0x198)]();break;}}}const _0x2c06fa=_0x50bd85[_0x4d196e(0x15e)];if(_0x2c06fa[_0x4d196e(0x10a)](/\[Version[ ](.*?)\]/i)){const _0x3e60e0=Number(RegExp['$1']);if(_0x3e60e0!==VisuMZ[label][_0x4d196e(0x174)]){if(_0x4d196e(0x122)===_0x4d196e(0x122))alert(_0x4d196e(0x1d0)['format'](_0x4cb249,_0x3e60e0)),SceneManager[_0x4d196e(0x198)]();else{if(_0xdd72d1[_0x4d196e(0x172)]()){const _0x9d57c=_0x4b474a[_0x4d196e(0x1b7)]??0x80;this[_0x4d196e(0x1ad)]=(this[_0x4d196e(0x1ad)]-_0x127c52)[_0x4d196e(0x1af)](_0x9d57c,0xff);}else this['opacity']+=_0x1fbbc5;}}}if(_0x2c06fa[_0x4d196e(0x10a)](/\[Tier[ ](\d+)\]/i)){const _0x5c3cda=Number(RegExp['$1']);_0x5c3cda<tier?(alert(_0x4d196e(0x13c)[_0x4d196e(0xf0)](_0x4cb249,_0x5c3cda,tier)),SceneManager['exit']()):tier=Math['max'](_0x5c3cda,tier);}VisuMZ[_0x4d196e(0xca)](VisuMZ[label]['Settings'],_0x50bd85[_0x4d196e(0x19e)]);})(pluginData),PluginManager[_0x499a1d(0x161)](pluginData[_0x499a1d(0x20a)],_0x499a1d(0xc8),_0x411757=>{const _0xcdb307=_0x499a1d;VisuMZ[_0xcdb307(0xca)](_0x411757,_0x411757);const _0x25ca45=_0x411757['value'];$gameSystem['setShowProximityCompass'](_0x25ca45);}),PluginManager[_0x499a1d(0x161)](pluginData[_0x499a1d(0x20a)],_0x499a1d(0x15f),_0x48f10b=>{const _0x45e259=_0x499a1d;VisuMZ[_0x45e259(0xca)](_0x48f10b,_0x48f10b);const _0x3f524a=_0x48f10b[_0x45e259(0xb9)];$gameSystem[_0x45e259(0xf7)](_0x3f524a);}),PluginManager[_0x499a1d(0x161)](pluginData[_0x499a1d(0x20a)],_0x499a1d(0x18a),_0x91968f=>{const _0xe69b29=_0x499a1d;if(!Sprite_ProximityMinimap[_0xe69b29(0xf6)])return;VisuMZ[_0xe69b29(0xca)](_0x91968f,_0x91968f);let _0x172629=_0x91968f[_0xe69b29(0x121)]||0x0;if(_0x172629<=0x0)_0x172629=$gameMap[_0xe69b29(0xff)]();$gameMap[_0xe69b29(0xfa)](_0x172629);if(_0x172629===$gameMap[_0xe69b29(0xff)]()){const _0x1bc357=SceneManager[_0xe69b29(0x158)];if(_0x1bc357){if('QhrHQ'!==_0xe69b29(0x19b))_0x1718bd[_0xe69b29(0x128)]();else{const _0x2bbca0=_0x1bc357[_0xe69b29(0x134)];_0x2bbca0&&_0x2bbca0[_0xe69b29(0xac)]();}}}}),PluginManager[_0x499a1d(0x161)](pluginData['name'],_0x499a1d(0xad),_0x4df3d7=>{const _0x19b456=_0x499a1d;if(!Sprite_ProximityMinimap['ENABLE'])return;VisuMZ['ConvertParams'](_0x4df3d7,_0x4df3d7);let _0x23bc06=_0x4df3d7[_0x19b456(0x121)]||0x0;if(_0x23bc06<=0x0)_0x23bc06=$gameMap[_0x19b456(0xff)]();$gameMap[_0x19b456(0x187)](_0x23bc06);if(_0x23bc06===$gameMap['mapId']()){const _0x6ceab8=SceneManager[_0x19b456(0x158)];if(_0x6ceab8){const _0x4bf2f6=_0x6ceab8[_0x19b456(0x134)];_0x4bf2f6&&_0x4bf2f6['fullRevealUnexploredMask']();}}}),PluginManager[_0x499a1d(0x161)](pluginData['name'],_0x499a1d(0x178),_0xde7c0a=>{const _0x3e02c3=_0x499a1d;if(!Sprite_ProximityMinimap[_0x3e02c3(0xf6)])return;if($gameMap['hideMinimap']())return;VisuMZ[_0x3e02c3(0xca)](_0xde7c0a,_0xde7c0a);const _0x54a172=_0xde7c0a[_0x3e02c3(0x17a)];switch(_0x54a172['toLowerCase']()['trim']()){case _0x3e02c3(0x1b8):$gameSystem[_0x3e02c3(0x105)](!![]);break;case _0x3e02c3(0xe6):$gameSystem['setLargeMinimapMode'](![]);break;case _0x3e02c3(0x218):const _0x5c5ed6=!$gameSystem['getLargeMinimapMode']();$gameSystem[_0x3e02c3(0x105)](_0x5c5ed6);break;}}),ImageManager[_0x499a1d(0x1fa)]=function(){const _0x2ea6ed=_0x499a1d;this[_0x2ea6ed(0x1c1)]=this[_0x2ea6ed(0x1c1)]||{};const _0x41a82c=$gameMap['mapId']();if(!this['_passabilityMinimaps'][_0x41a82c]){const _0x55fc24=this[_0x2ea6ed(0x100)]();this[_0x2ea6ed(0x1c1)][_0x41a82c]=_0x55fc24;}return this[_0x2ea6ed(0x1c1)][_0x41a82c];},ImageManager['clearPassabilityMinimap']=function(_0x396717){const _0x2e071e=_0x499a1d;this[_0x2e071e(0x1c1)]=this[_0x2e071e(0x1c1)]||{},delete this[_0x2e071e(0x1c1)][_0x396717];},ImageManager['createPassabilityMinimap']=function(){const _0x17e09e=_0x499a1d,_0x3fdffa=$gameMap[_0x17e09e(0x140)](),_0xafa7fc=$gameMap[_0x17e09e(0x148)](),_0x1b1b18=_0x3fdffa?0x3:0x1,_0x5abfc4=_0xafa7fc?0x3:0x1,_0x52e344=Sprite_ProximityMinimap[_0x17e09e(0x1ed)],_0x52ffbd=$gameMap['width'](),_0x5afcf6=$gameMap[_0x17e09e(0xd8)](),_0xe9636c=new Bitmap(_0x52ffbd*_0x1b1b18*_0x52e344,_0x5afcf6*_0x5abfc4*_0x52e344);_0xe9636c[_0x17e09e(0xb7)]=!![];const _0x177573=ColorManager[_0x17e09e(0x1d9)](),_0x4e7357=[0x50,0x51,0x52,0x53,0x54,0x55,0x56,0x57];_0x4e7357[_0x17e09e(0xab)](0x60,0x61,0x62,0x63,0x64,0x65,0x66,0x67),_0x4e7357[_0x17e09e(0xab)](0x70,0x71,0x72,0x73,0x74,0x75,0x76,0x77);for(let _0x6e72ad=0x0;_0x6e72ad<_0x52ffbd;_0x6e72ad++){for(let _0x1793d0=0x0;_0x1793d0<_0x5afcf6;_0x1793d0++){if($gameMap['isPlayerPassableByAnyDirection'](_0x6e72ad,_0x1793d0)){if(_0x17e09e(0x20d)!=='rUIhz'){if(Imported[_0x17e09e(0xc4)]){const _0x340fad=$gameMap[_0x17e09e(0x1fb)],_0x458888=$gameMap[_0x17e09e(0xfc)](_0x6e72ad,_0x1793d0);if(_0x340fad[_0x17e09e(0xde)][_0x17e09e(0x124)](_0x458888))continue;if(_0x340fad[_0x17e09e(0x1ab)]['includes'](_0x458888))continue;}if(Sprite_ProximityMinimap[_0x17e09e(0xd5)]){if(_0x17e09e(0x15d)==='GNYKM')return _0x3d2a51[_0x17e09e(0x193)][_0x17e09e(0x12e)][_0x17e09e(0xfd)][_0x17e09e(0x155)];else{if(_0x4e7357['includes']($gameMap['autotileType'](_0x6e72ad,_0x1793d0,0x0)))continue;if(_0x4e7357[_0x17e09e(0x124)]($gameMap['autotileType'](_0x6e72ad,_0x1793d0,0x1)))continue;if(_0x4e7357['includes']($gameMap[_0x17e09e(0x11f)](_0x6e72ad,_0x1793d0,0x2)))continue;if(_0x4e7357[_0x17e09e(0x124)]($gameMap[_0x17e09e(0x11f)](_0x6e72ad,_0x1793d0,0x3)))continue;if(_0x4e7357['includes']($gameMap[_0x17e09e(0x11f)](_0x6e72ad,_0x1793d0,0x4)))continue;}}for(let _0xdb8fbb=0x0;_0xdb8fbb<_0x1b1b18;_0xdb8fbb++){for(let _0x25e15b=0x0;_0x25e15b<_0x5abfc4;_0x25e15b++){if(_0x17e09e(0xcf)===_0x17e09e(0x11b)){const _0x34cdf4=this[_0x17e09e(0x1fb)],_0x1f0954=this['regionId'](_0x35a65d,_0x4abf08);if(_0x34cdf4[_0x17e09e(0x195)][_0x17e09e(0x124)](_0x1f0954))return!![];if(_0x34cdf4[_0x17e09e(0x127)][_0x17e09e(0x124)](_0x1f0954))return!![];}else{const _0x277411=(_0x6e72ad+_0x52ffbd*_0xdb8fbb)*_0x52e344,_0xb912a6=(_0x1793d0+_0x5afcf6*_0x25e15b)*_0x52e344;_0xe9636c[_0x17e09e(0x167)](_0x277411,_0xb912a6,_0x52e344,_0x52e344,_0x177573);if(Imported[_0x17e09e(0xc4)]){const _0x4bf838=$gameMap[_0x17e09e(0x1fb)],_0x20c8ea=$gameMap[_0x17e09e(0xfc)](_0x6e72ad,_0x1793d0);if(_0x4bf838[_0x17e09e(0x195)][_0x17e09e(0x124)](_0x20c8ea))continue;if(_0x4bf838[_0x17e09e(0x127)][_0x17e09e(0x124)](_0x20c8ea))continue;}!$gameMap[_0x17e09e(0x16e)](_0x6e72ad,_0x1793d0,0x2)&&_0xe9636c['clearRect'](_0x277411,_0xb912a6+_0x52e344-0x1,_0x52e344,0x1);if(!$gameMap['isPassable'](_0x6e72ad,_0x1793d0,0x4)){if(_0x17e09e(0xdf)!=='iQjfI')for(let _0x3fa22d=0x0;_0x3fa22d<=_0x467331;_0x3fa22d++){const _0x26d23e=new _0x4b2f0a();_0x26d23e['bitmap']=_0x32d56a,this[_0x17e09e(0x191)]['addChild'](_0x26d23e),_0x26d23e[_0x17e09e(0x15b)]['x']=_0x38b664,_0x26d23e[_0x17e09e(0x15b)]['y']=_0x3a6149,_0x26d23e['x']=_0x2ac63a*_0x234670,_0x26d23e['y']=_0x2a475e*_0x3fa22d;}else _0xe9636c[_0x17e09e(0xec)](_0x277411,_0xb912a6,0x1,_0x52e344);}!$gameMap[_0x17e09e(0x16e)](_0x6e72ad,_0x1793d0,0x6)&&_0xe9636c[_0x17e09e(0xec)](_0x277411+_0x52e344-0x1,_0xb912a6,0x1,_0x52e344),!$gameMap['isPassable'](_0x6e72ad,_0x1793d0,0x8)&&_0xe9636c[_0x17e09e(0xec)](_0x277411,_0xb912a6,_0x52e344,0x1);}}}}else{if(!_0x572f5b['isSceneMap']())return![];const _0x668911=_0x1a0c9a[_0x17e09e(0x158)][_0x17e09e(0x210)];if(!_0x668911)return![];const _0x21ec69=_0x668911['x'],_0x5441d1=_0x668911['y'],_0x32181e=_0x2f8bb3[_0x17e09e(0x193)][_0x17e09e(0x12e)]['Compass'][_0x17e09e(0x1d3)]||0x1,_0x1ddfb9=_0x668911[_0x17e09e(0x15b)]['x'],_0x275d5a=new _0x18a385(_0x21ec69-_0x32181e*_0x1ddfb9,_0x5441d1-_0x32181e*_0x1ddfb9,_0x32181e*_0x1ddfb9*0x2+_0x50af5f[_0x17e09e(0xf8)]()/0x2,_0x32181e*_0x1ddfb9*0x2+_0x42d036[_0x17e09e(0x1e5)]()/0x2);return _0x275d5a[_0x17e09e(0x1f3)](this['screenX'](),this['screenY']());}}}}return _0xe9636c['_customModified']=![],_0xe9636c;},ColorManager[_0x499a1d(0x1c7)]=function(_0x1a1d9b){const _0x270038=_0x499a1d;return _0x1a1d9b=String(_0x1a1d9b),_0x1a1d9b[_0x270038(0x10a)](/#(.*)/i)?_0x270038(0xed)!==_0x270038(0xed)?(this[_0x270038(0xc5)]=this[_0x270038(0xc5)]||[],this['_fullRevealMaps']):'#%1'[_0x270038(0xf0)](String(RegExp['$1'])):_0x270038(0xef)!=='FArwh'?!![]:this[_0x270038(0x1bb)](Number(_0x1a1d9b));},ColorManager[_0x499a1d(0x1d9)]=function(){const _0x2c3e2c=_0x499a1d;return ColorManager[_0x2c3e2c(0x1c7)](Sprite_ProximityMinimap[_0x2c3e2c(0x115)]);},ConfigManager[_0x499a1d(0x1b0)]=!![],ConfigManager['compassSize']=0x64,VisuMZ[_0x499a1d(0x193)]['ConfigManager_makeData']=ConfigManager[_0x499a1d(0x157)],ConfigManager['makeData']=function(){const _0x4eb73e=_0x499a1d,_0x155544=VisuMZ[_0x4eb73e(0x193)][_0x4eb73e(0xdd)][_0x4eb73e(0x184)](this);return _0x155544[_0x4eb73e(0x1b0)]=this[_0x4eb73e(0x1b0)],_0x155544[_0x4eb73e(0x211)]=this[_0x4eb73e(0x211)],_0x155544;},VisuMZ[_0x499a1d(0x193)][_0x499a1d(0x1b9)]=ConfigManager[_0x499a1d(0x10e)],ConfigManager[_0x499a1d(0x10e)]=function(_0x57743b){const _0xf7fbc5=_0x499a1d;VisuMZ['ProximityCompass'][_0xf7fbc5(0x1b9)]['call'](this,_0x57743b),'showCompass'in _0x57743b?this[_0xf7fbc5(0x1b0)]=_0x57743b['showCompass']:this[_0xf7fbc5(0x1b0)]=ConfigManager[_0xf7fbc5(0x1b0)],_0xf7fbc5(0x211)in _0x57743b?_0xf7fbc5(0x1cb)!==_0xf7fbc5(0x1cb)?(_0x102a9e[_0xf7fbc5(0x193)]['Settings'][_0xf7fbc5(0x166)][_0xf7fbc5(0x1cd)]&&this[_0xf7fbc5(0x1e3)](),_0x588c6e[_0xf7fbc5(0x193)][_0xf7fbc5(0x12e)]['Options']['AddSizeOption']&&this['addProximityCompassSizeCommand']()):this[_0xf7fbc5(0x211)]=_0x57743b[_0xf7fbc5(0x211)]:_0xf7fbc5(0x1dc)==='pydzY'?this[_0xf7fbc5(0x11e)](_0x50ebde,0x32):this[_0xf7fbc5(0x211)]=ConfigManager[_0xf7fbc5(0x211)];},SceneManager[_0x499a1d(0x119)]=function(){const _0x562c8c=_0x499a1d;return this[_0x562c8c(0x158)]&&this[_0x562c8c(0x158)]['constructor']===Scene_Map;},TextManager[_0x499a1d(0x1b0)]=VisuMZ[_0x499a1d(0x193)][_0x499a1d(0x12e)]['Options'][_0x499a1d(0xf1)],TextManager['compassSize']=VisuMZ[_0x499a1d(0x193)][_0x499a1d(0x12e)][_0x499a1d(0x166)]['SizeName'],VisuMZ['ProximityCompass'][_0x499a1d(0x13a)]=Game_System['prototype'][_0x499a1d(0xe8)],Game_System['prototype'][_0x499a1d(0xe8)]=function(){const _0x40a32f=_0x499a1d;VisuMZ[_0x40a32f(0x193)][_0x40a32f(0x13a)][_0x40a32f(0x184)](this),this['initializeProximityCompass']();},Game_System[_0x499a1d(0x112)][_0x499a1d(0x1e9)]=function(){const _0x3108c8=_0x499a1d;this[_0x3108c8(0xc6)]=VisuMZ[_0x3108c8(0x193)][_0x3108c8(0x12e)][_0x3108c8(0x17c)][_0x3108c8(0x200)],this[_0x3108c8(0x1d4)]=VisuMZ['ProximityCompass'][_0x3108c8(0x12e)][_0x3108c8(0x17c)][_0x3108c8(0x21a)];},Game_System['prototype'][_0x499a1d(0x1a6)]=function(){const _0x296a4f=_0x499a1d;if(this['_showProximityCompass']===undefined){if('bVWRT'!==_0x296a4f(0x101)){var _0x47a440=this[_0x296a4f(0x21d)](),_0x148358=_0x4b4911['deltaX'](this[_0x296a4f(0x107)][_0x296a4f(0x185)],_0xd6657b[_0x296a4f(0x185)]),_0x3a29a4=_0x1a3e71[_0x296a4f(0x14e)](this[_0x296a4f(0x107)][_0x296a4f(0x1f8)],_0x41aa7e[_0x296a4f(0x1f8)]);const _0x3d1030=_0x4dd95e[_0x296a4f(0x193)][_0x296a4f(0x12e)][_0x296a4f(0xfd)][_0x296a4f(0x169)];_0x47a440>=_0x3c091a[_0x296a4f(0xb2)](_0x148358)+_0x3cf878[_0x296a4f(0xb2)](_0x3a29a4)?this[_0x296a4f(0x1ad)]+=_0x3d1030:this[_0x296a4f(0x1ad)]-=_0x3d1030;}else this[_0x296a4f(0x1e9)]();}return this[_0x296a4f(0xc6)];},Game_System[_0x499a1d(0x112)][_0x499a1d(0x20c)]=function(_0x5979ae){const _0x4bfaf7=_0x499a1d;this[_0x4bfaf7(0xc6)]===undefined&&this[_0x4bfaf7(0x1e9)](),this[_0x4bfaf7(0xc6)]=_0x5979ae;},Game_System['prototype']['getPlayerCompassIcon']=function(){const _0x51b6e0=_0x499a1d;return this[_0x51b6e0(0x1d4)]===undefined&&this['initializeProximityCompass'](),this['_playerCompassIcon'];},Game_System['prototype'][_0x499a1d(0xf7)]=function(_0x2320b6){const _0x3aae52=_0x499a1d;this[_0x3aae52(0x1d4)]===undefined&&(_0x3aae52(0xaf)!==_0x3aae52(0xaf)?_0x39374f*=_0x4a6863[_0x3aae52(0x1fe)]:this['initializeProximityCompass']()),this[_0x3aae52(0x1d4)]=_0x2320b6;},Game_System[_0x499a1d(0x112)][_0x499a1d(0x105)]=function(_0x395114){const _0x43e2e8=_0x499a1d;this[_0x43e2e8(0xba)]=_0x395114;},Game_System['prototype'][_0x499a1d(0x19d)]=function(){const _0x357f92=_0x499a1d;return this[_0x357f92(0xba)];},Game_Map['prototype']['isEventOverloaded']=function(){const _0x3212db=_0x499a1d;return this[_0x3212db(0xcb)];},Game_Map[_0x499a1d(0x112)][_0x499a1d(0x1f0)]=function(){const _0x50acee=_0x499a1d;if(!ConfigManager[_0x50acee(0x1b0)])return!![];else{if(!!$dataMap&&!!$dataMap['note']){if(_0x50acee(0x1d8)!==_0x50acee(0x136))return $dataMap['note']['match'](/<HIDE COMPASS>/i);else this['_minimapIconIndex']=_0x30b1a1(_0x5969b3['$1']);}else return![];}},Game_Map[_0x499a1d(0x112)][_0x499a1d(0x123)]=function(_0xffd1d0,_0x2cdc47){const _0x4dcc33=_0x499a1d;if(Imported[_0x4dcc33(0xc4)]){const _0x359792=this[_0x4dcc33(0x1fb)],_0x454819=this[_0x4dcc33(0xfc)](_0xffd1d0,_0x2cdc47);if(_0x359792[_0x4dcc33(0xde)]['includes'](_0x454819))return![];if(_0x359792['PlayerForbid']['includes'](_0x454819))return![];}if(this['isPassable'](_0xffd1d0,_0x2cdc47,0x2))return!![];if(this['isPassable'](_0xffd1d0,_0x2cdc47,0x4))return!![];if(this['isPassable'](_0xffd1d0,_0x2cdc47,0x6))return!![];if(this[_0x4dcc33(0x16e)](_0xffd1d0,_0x2cdc47,0x8))return!![];if(Imported['VisuMZ_1_EventsMoveCore']){const _0x4b71d7=this[_0x4dcc33(0x1fb)],_0x2ef056=this[_0x4dcc33(0xfc)](_0xffd1d0,_0x2cdc47);if(_0x4b71d7[_0x4dcc33(0x195)][_0x4dcc33(0x124)](_0x2ef056))return!![];if(_0x4b71d7['PlayerAllow'][_0x4dcc33(0x124)](_0x2ef056))return!![];}return![];},Game_Map[_0x499a1d(0x112)]['hideMinimap']=function(){const _0x4e523c=_0x499a1d;if(!Sprite_ProximityMinimap[_0x4e523c(0xf6)])return!![];else{if(!!$dataMap&&!!$dataMap[_0x4e523c(0x20e)])return $dataMap[_0x4e523c(0x20e)]['match'](/<HIDE (?:MINIMAP|MINI-MAP)>/i);else{if('bFqSZ'!==_0x4e523c(0xc3))return![];else{if(!_0x4ff32f['ENABLE'])return!![];else return!!_0x136827&&!!_0x4fb086['note']?_0x10ce61[_0x4e523c(0x20e)][_0x4e523c(0x10a)](/<HIDE (?:MINIMAP|MINI-MAP)>/i):![];}}}},Game_Map[_0x499a1d(0x112)]['isMinimapExplorable']=function(){const _0x3d426b=_0x499a1d,_0x45226f=$dataMap?$dataMap['note']||'':'';if(_0x45226f['match'](/<EXPLORABLE>/i))return!![];else{if(_0x45226f[_0x3d426b(0x10a)](/<ALREADY EXPLORED>/i))return _0x3d426b(0x179)!=='Pcgyk'?this[_0x3d426b(0x1c8)]:![];}if(this[_0x3d426b(0x199)]()[_0x3d426b(0x124)](this[_0x3d426b(0xff)]()))return![];return Sprite_ProximityMinimap[_0x3d426b(0x144)];},Game_Map['prototype'][_0x499a1d(0x142)]=function(_0x1ede1f){const _0x40409a=_0x499a1d;return this['_minimapExploredTiles']=this[_0x40409a(0x164)]||{},this['_minimapExploredTiles'][_0x1ede1f]=this['_minimapExploredTiles'][_0x1ede1f]||[],this[_0x40409a(0x164)][_0x1ede1f];},Game_Map[_0x499a1d(0x112)][_0x499a1d(0xfa)]=function(_0x4e42d6){const _0x8521bc=_0x499a1d;this['_minimapExploredTiles']=this[_0x8521bc(0x164)]||{},this[_0x8521bc(0x164)][_0x4e42d6]=this['_minimapExploredTiles'][_0x4e42d6]||[],delete this[_0x8521bc(0x164)][_0x4e42d6],this['removeFullRevealMinimap'](_0x4e42d6);},Game_Map[_0x499a1d(0x112)][_0x499a1d(0x156)]=function(_0x7c560d,_0x519566,_0x25d9fd){const _0x1a0d9e=_0x499a1d;this[_0x1a0d9e(0x164)]=this[_0x1a0d9e(0x164)]||{},this['_minimapExploredTiles'][_0x7c560d]=this[_0x1a0d9e(0x164)][_0x7c560d]||[];const _0x12fe5a=_0x1a0d9e(0x202)[_0x1a0d9e(0xf0)](_0x519566,_0x25d9fd);if(this['_minimapExploredTiles'][_0x7c560d]['includes'](_0x12fe5a))return;this[_0x1a0d9e(0x164)][_0x7c560d]['push'](_0x12fe5a),this['_minimapExploredTiles'][_0x7c560d][_0x1a0d9e(0x1c2)]();},Game_Map[_0x499a1d(0x112)]['getFullRevealMinimaps']=function(){const _0x45c664=_0x499a1d;return this['_fullRevealMaps']=this['_fullRevealMaps']||[],this[_0x45c664(0xc5)];},Game_Map[_0x499a1d(0x112)]['addFullRevealMinimap']=function(_0x4d3dc8){const _0x363b8e=_0x499a1d;this[_0x363b8e(0xc5)]=this[_0x363b8e(0xc5)]||[],!this[_0x363b8e(0xc5)][_0x363b8e(0x124)](_0x4d3dc8)&&this[_0x363b8e(0xc5)][_0x363b8e(0xab)](_0x4d3dc8);},Game_Map[_0x499a1d(0x112)][_0x499a1d(0x14a)]=function(_0x4efb3d){const _0x41a86e=_0x499a1d;this[_0x41a86e(0xc5)]=this[_0x41a86e(0xc5)]||[],this[_0x41a86e(0xc5)]['remove'](_0x4efb3d);},Game_Map['prototype'][_0x499a1d(0xae)]=function(){const _0x4263e0=_0x499a1d;this[_0x4263e0(0x164)]=this[_0x4263e0(0x164)]||{},this['_minimapExploredTiles'][_0xd6fdc9]=[];const _0xd6fdc9=this[_0x4263e0(0xff)]();for(let _0x5c2e60=0x0;_0x5c2e60<this[_0x4263e0(0xbd)]();_0x5c2e60++){if('bdrYl'!==_0x4263e0(0x10b))for(let _0x334476=0x0;_0x334476<this[_0x4263e0(0xd8)]();_0x334476++){if(_0x4263e0(0xbe)===_0x4263e0(0x117)){const _0x57471e=_0x3864a7[_0x4263e0(0x134)];_0x57471e&&_0x57471e[_0x4263e0(0x128)]();}else{const _0x545344=_0x4263e0(0x202)[_0x4263e0(0xf0)](_0x5c2e60,_0x334476);this[_0x4263e0(0x164)][_0xd6fdc9]['push'](_0x545344);}}else this['showCompass']=_0x57c864[_0x4263e0(0x1b0)];}},Game_Map['prototype'][_0x499a1d(0x108)]=function(){const _0xead411=_0x499a1d,_0x47e3ff=VisuMZ['ProximityCompass']['Settings'][_0xead411(0x1a4)];if($gameMap['hideCompass']())return![];else{if(_0x47e3ff[_0xead411(0x130)]&&$gameMessage[_0xead411(0x13f)]())return![];else{if(_0x47e3ff[_0xead411(0x209)]&&$gameMap[_0xead411(0x1b2)]())return![];else return!$gameSystem[_0xead411(0x19d)]()?![]:$gameSystem[_0xead411(0x1a6)]();}}},Game_Player[_0x499a1d(0x112)][_0x499a1d(0x172)]=function(){const _0x10b950=_0x499a1d;if(!SceneManager[_0x10b950(0x119)]())return![];const _0x534ea2=SceneManager[_0x10b950(0x158)]['_ProximityCompassSprite'];if(!_0x534ea2)return![];const _0x28a4f1=_0x534ea2['x'],_0x31d2ec=_0x534ea2['y'],_0x3f4c49=VisuMZ['ProximityCompass'][_0x10b950(0x12e)]['Compass'][_0x10b950(0x1d3)]||0x1,_0x303abe=_0x534ea2['scale']['x'],_0x5ec0b6=new Rectangle(_0x28a4f1-_0x3f4c49*_0x303abe,_0x31d2ec-_0x3f4c49*_0x303abe,_0x3f4c49*_0x303abe*0x2+$gameMap['tileWidth']()/0x2,_0x3f4c49*_0x303abe*0x2+$gameMap[_0x10b950(0x1e5)]()/0x2);return _0x5ec0b6[_0x10b950(0x1f3)](this[_0x10b950(0x131)](),this[_0x10b950(0x10c)]());},VisuMZ[_0x499a1d(0x193)][_0x499a1d(0xb5)]=Game_Event[_0x499a1d(0x112)][_0x499a1d(0x1ef)],Game_Event['prototype'][_0x499a1d(0x1ef)]=function(){const _0x1d62a7=_0x499a1d;VisuMZ[_0x1d62a7(0x193)][_0x1d62a7(0xb5)]['call'](this),this[_0x1d62a7(0x190)]();},VisuMZ[_0x499a1d(0x193)]['Game_Event_setupPageSettings']=Game_Event['prototype']['setupPageSettings'],Game_Event[_0x499a1d(0x112)][_0x499a1d(0x203)]=function(){const _0x2ec9b2=_0x499a1d;VisuMZ[_0x2ec9b2(0x193)][_0x2ec9b2(0x219)][_0x2ec9b2(0x184)](this),this[_0x2ec9b2(0x188)]();},Game_Event[_0x499a1d(0x112)][_0x499a1d(0x188)]=function(){const _0x4ab6f7=_0x499a1d;if(!this[_0x4ab6f7(0x18e)]())return;this[_0x4ab6f7(0x190)](),this[_0x4ab6f7(0x109)](),this[_0x4ab6f7(0x1e0)]();},Game_Event[_0x499a1d(0x112)]['setupProximityCompassNotetags']=function(){const _0x2281ff=_0x499a1d,_0x194c2b=this[_0x2281ff(0x18e)]()[_0x2281ff(0x20e)];if(_0x194c2b==='')return;this[_0x2281ff(0x17f)](_0x194c2b);},Game_Event[_0x499a1d(0x112)][_0x499a1d(0x1e0)]=function(){const _0x5670f2=_0x499a1d;if(!this[_0x5670f2(0x16d)]())return;const _0x19f5b0=this[_0x5670f2(0x1da)]();let _0x4610b0='';for(const _0x35f34a of _0x19f5b0){if([0x6c,0x198]['includes'](_0x35f34a[_0x5670f2(0x133)])){if(_0x4610b0!=='')_0x4610b0+='\x0a';_0x4610b0+=_0x35f34a[_0x5670f2(0x19e)][0x0];}}this[_0x5670f2(0x17f)](_0x4610b0);},Game_Event[_0x499a1d(0x112)][_0x499a1d(0x190)]=function(){const _0x1f36a1=_0x499a1d;this[_0x1f36a1(0x10d)]=0x0,this[_0x1f36a1(0x205)]=VisuMZ['ProximityCompass'][_0x1f36a1(0x12e)]['Default'][_0x1f36a1(0x132)];{const _0x3dee06=VisuMZ[_0x1f36a1(0x193)][_0x1f36a1(0x12e)][_0x1f36a1(0xfd)];this['_compassIconIndex']=0x0;switch(this[_0x1f36a1(0x168)]){case 0x0:this[_0x1f36a1(0x10d)]=_0x3dee06[_0x1f36a1(0x1c9)]||0x0;break;case 0x1:this[_0x1f36a1(0x10d)]=_0x3dee06['DefaultEventIcon_Same']||0x0;break;case 0x2:this[_0x1f36a1(0x10d)]=_0x3dee06['DefaultEventIcon_Above']||0x0;break;}}{const _0x4e6876=VisuMZ[_0x1f36a1(0x193)][_0x1f36a1(0x12e)][_0x1f36a1(0x1a4)];this[_0x1f36a1(0xb0)]=0x0;switch(this[_0x1f36a1(0x168)]){case 0x0:this['_minimapIconIndex']=_0x4e6876[_0x1f36a1(0x1c9)]||0x0;break;case 0x1:this[_0x1f36a1(0xb0)]=_0x4e6876[_0x1f36a1(0x197)]||0x0;break;case 0x2:this[_0x1f36a1(0xb0)]=_0x4e6876['DefaultEventIcon_Above']||0x0;break;}}},Game_Event[_0x499a1d(0x112)][_0x499a1d(0x17f)]=function(_0x107551){const _0x41cb73=_0x499a1d;_0x107551[_0x41cb73(0x10a)](/<COMPASS ICON: (\d+)>/i)&&(this['_compassIconIndex']=parseInt(RegExp['$1']));_0x107551[_0x41cb73(0x10a)](/<COMPASS PROXIMITY: (\d+)>/i)&&(_0x41cb73(0x14d)!==_0x41cb73(0x13b)?this[_0x41cb73(0x205)]=parseInt(RegExp['$1']):_0x525c98+=_0x1a7168[_0x41cb73(0xbd)]());_0x107551[_0x41cb73(0x10a)](/<MINIMAP ICON: (\d+)>/i)&&(this[_0x41cb73(0xb0)]=parseInt(RegExp['$1']));if(_0x107551[_0x41cb73(0x10a)](/<HIDE MINIMAP ICON>/i)){if('sbymN'===_0x41cb73(0x21c))this['_minimapIconIndex']=0x0;else{const _0x29f6f6=0x2,_0x2b217c=_0x5a9580['ceil'](this[_0x41cb73(0x171)]*this[_0x41cb73(0x191)]['width'])+_0x29f6f6,_0x32553d=_0x17055e['ceil'](this[_0x41cb73(0x171)]*this[_0x41cb73(0x191)][_0x41cb73(0xd8)])+_0x29f6f6;this['_backgroundSprite'][_0x41cb73(0x15b)]['x']=_0x2b217c,this['_backgroundSprite'][_0x41cb73(0x15b)]['y']=_0x32553d;}}},VisuMZ[_0x499a1d(0x193)][_0x499a1d(0x180)]=Game_Event[_0x499a1d(0x112)]['setupSpawn'],Game_Event[_0x499a1d(0x112)][_0x499a1d(0x1bf)]=function(_0x5332eb){const _0x2d59cd=_0x499a1d;VisuMZ[_0x2d59cd(0x193)]['Game_Event_setupSpawn'][_0x2d59cd(0x184)](this,_0x5332eb),this[_0x2d59cd(0x1a0)](),this[_0x2d59cd(0x1a7)]();},Game_Event['prototype'][_0x499a1d(0x1a0)]=function(){const _0x1ab524=_0x499a1d,_0x4bd0a5=SceneManager[_0x1ab524(0x158)];if(!_0x4bd0a5)return;const _0x105339=_0x4bd0a5['_ProximityCompassSprite'];if(!_0x105339)return;const _0x4ea8de=new Sprite_CompassIcon(this);_0x4ea8de[_0x1ab524(0x12f)](),_0x105339[_0x1ab524(0x116)]['push'](_0x4ea8de),_0x105339[_0x1ab524(0x19c)](_0x4ea8de),_0x105339[_0x1ab524(0x19c)](_0x105339['_playerSprite']);},Game_Event[_0x499a1d(0x112)][_0x499a1d(0x1a7)]=function(){const _0x2b8be4=_0x499a1d,_0x21aecc=SceneManager[_0x2b8be4(0x158)];if(!_0x21aecc)return;const _0x3de1af=_0x21aecc[_0x2b8be4(0x134)];if(!_0x3de1af)return;const _0x356193=new Sprite_CompassIcon(this);_0x356193[_0x2b8be4(0x21b)](_0x3de1af[_0x2b8be4(0x171)]),_0x356193[_0x2b8be4(0x12f)](),_0x3de1af['_characterSprites']['push'](_0x356193),_0x3de1af[_0x2b8be4(0x1cc)]['addChild'](_0x356193),_0x3de1af[_0x2b8be4(0x1cc)]['addChild'](_0x3de1af[_0x2b8be4(0x165)]);},VisuMZ['ProximityCompass'][_0x499a1d(0xb4)]=Scene_Map[_0x499a1d(0x112)]['createSpriteset'],Scene_Map['prototype'][_0x499a1d(0x103)]=function(){const _0x97b80b=_0x499a1d;VisuMZ[_0x97b80b(0x193)][_0x97b80b(0xb4)][_0x97b80b(0x184)](this),this[_0x97b80b(0x1f9)](),this[_0x97b80b(0x1e8)]();},Scene_Map[_0x499a1d(0x112)][_0x499a1d(0x1f9)]=function(){const _0x31be42=_0x499a1d;if(this[_0x31be42(0x1a8)]!==Scene_Map)return;this[_0x31be42(0x210)]=new Sprite_ProximityCompass(),this[_0x31be42(0x19c)](this[_0x31be42(0x210)]);},Scene_Map['prototype'][_0x499a1d(0x1e8)]=function(){const _0x536175=_0x499a1d;if(this[_0x536175(0x1a8)]!==Scene_Map)return;if($gameMap[_0x536175(0xd6)]())return;this[_0x536175(0x134)]=new Sprite_ProximityMinimap(),this[_0x536175(0x19c)](this[_0x536175(0x134)]);},VisuMZ['ProximityCompass']['Scene_Map_updateMain']=Scene_Map[_0x499a1d(0x112)][_0x499a1d(0x181)],Scene_Map[_0x499a1d(0x112)][_0x499a1d(0x181)]=function(){const _0x52f2bf=_0x499a1d;VisuMZ[_0x52f2bf(0x193)][_0x52f2bf(0x1aa)][_0x52f2bf(0x184)](this),this[_0x52f2bf(0x182)]();},Scene_Map[_0x499a1d(0x112)][_0x499a1d(0x182)]=function(){const _0x3e9769=_0x499a1d;if($gameMap[_0x3e9769(0xd6)]())return;if($gameMap[_0x3e9769(0x1f0)]())return;const _0x190360=VisuMZ[_0x3e9769(0x193)][_0x3e9769(0x12e)][_0x3e9769(0x1a4)];if(_0x190360[_0x3e9769(0x130)]&&$gameMessage[_0x3e9769(0x13f)]())return;if(_0x190360[_0x3e9769(0x209)]&&$gameMap[_0x3e9769(0x1b2)]())return;if(!$gameSystem[_0x3e9769(0x1a6)]())return;const _0x520418=VisuMZ['ProximityCompass'][_0x3e9769(0x12e)][_0x3e9769(0x1a4)][_0x3e9769(0x113)];if(Input[_0x3e9769(0x14f)](_0x520418)){const _0x1faadc=!$gameSystem[_0x3e9769(0x19d)]();$gameSystem[_0x3e9769(0x105)](_0x1faadc);}},VisuMZ[_0x499a1d(0x193)][_0x499a1d(0xe7)]=Scene_Options[_0x499a1d(0x112)][_0x499a1d(0x11d)],Scene_Options['prototype'][_0x499a1d(0x11d)]=function(){const _0xe1bd58=_0x499a1d;let _0x576a6c=VisuMZ[_0xe1bd58(0x193)][_0xe1bd58(0xe7)]['call'](this);const _0x55fca9=VisuMZ[_0xe1bd58(0x193)][_0xe1bd58(0x12e)]['Options'];if(_0x55fca9[_0xe1bd58(0x1a3)]){if(_0x55fca9[_0xe1bd58(0x1cd)])_0x576a6c++;if(_0x55fca9['AddSizeOption'])_0x576a6c++;}return _0x576a6c;};function Sprite_ProximityCompass(){const _0x27c831=_0x499a1d;this['initialize'][_0x27c831(0x1ff)](this,arguments);}Sprite_ProximityCompass[_0x499a1d(0x112)]=Object[_0x499a1d(0xc1)](Sprite_Clickable[_0x499a1d(0x112)]),Sprite_ProximityCompass[_0x499a1d(0x112)][_0x499a1d(0x1a8)]=Sprite_ProximityCompass,Sprite_ProximityCompass['prototype'][_0x499a1d(0xe8)]=function(){const _0x4ff67b=_0x499a1d;Sprite_Clickable[_0x4ff67b(0x112)]['initialize'][_0x4ff67b(0x184)](this),this[_0x4ff67b(0x16a)](),this[_0x4ff67b(0x1e6)]();},Sprite_ProximityCompass['prototype'][_0x499a1d(0x16a)]=function(){const _0x2fc23c=_0x499a1d;this['x']=eval(VisuMZ[_0x2fc23c(0x193)][_0x2fc23c(0x12e)][_0x2fc23c(0xfd)][_0x2fc23c(0x1e1)]),this['y']=eval(VisuMZ[_0x2fc23c(0x193)][_0x2fc23c(0x12e)][_0x2fc23c(0xfd)][_0x2fc23c(0x11c)]),this[_0x2fc23c(0x215)]['x']=0.5,this['anchor']['y']=0.5,this[_0x2fc23c(0x216)]=0x2,!this['isShow']()&&(this[_0x2fc23c(0x1ad)]=0x0),this[_0x2fc23c(0x15b)]['x']=ConfigManager['compassSize']*0.01,this[_0x2fc23c(0x15b)]['y']=ConfigManager[_0x2fc23c(0x211)]*0.01,this[_0x2fc23c(0x1ad)]=this['isShow']()?0xff:0x0;},Sprite_ProximityCompass['prototype']['createSprites']=function(){const _0x270c7e=_0x499a1d;this[_0x270c7e(0xf2)](),this[_0x270c7e(0xe2)](),this[_0x270c7e(0x176)](),this[_0x270c7e(0x1d7)](),this[_0x270c7e(0x118)](),this[_0x270c7e(0x12f)]();},Sprite_ProximityCompass['prototype'][_0x499a1d(0xf2)]=function(){const _0x81aa64=_0x499a1d;this[_0x81aa64(0x111)]=new Sprite(),this['addChild'](this[_0x81aa64(0x111)]),this['_ProximityCompassBackgroundSprite'][_0x81aa64(0x215)]['x']=0.5,this['_ProximityCompassBackgroundSprite']['anchor']['y']=0.5;const _0x1436ba=VisuMZ[_0x81aa64(0x193)]['Settings'][_0x81aa64(0xfd)],_0x120068=_0x1436ba['Radius'];var _0x5c5400=_0x120068*0x2,_0x167ffb=_0x120068*0x2,_0x545f31=_0x1436ba[_0x81aa64(0x146)];const _0x1fc5d0=new Bitmap(_0x5c5400,_0x167ffb);_0x1fc5d0['paintOpacity']=_0x1436ba['BackOpacity'],_0x1fc5d0[_0x81aa64(0x1ea)](_0x5c5400/0x2,_0x167ffb/0x2,_0x5c5400/0x2,_0x545f31),this[_0x81aa64(0x111)][_0x81aa64(0x1ee)]=_0x1fc5d0;},Sprite_ProximityCompass[_0x499a1d(0x112)]['createMinimap']=function(){const _0x2b8e4f=_0x499a1d;if($gameMap[_0x2b8e4f(0xd6)]())return;const _0x2aff7f=VisuMZ['ProximityCompass'][_0x2b8e4f(0x12e)]['Compass'];this[_0x2b8e4f(0x191)]=new Sprite(),this[_0x2b8e4f(0x191)]['bitmap']=ImageManager[_0x2b8e4f(0x1fa)](),this[_0x2b8e4f(0x19c)](this[_0x2b8e4f(0x191)]);let _0x3a3899=_0x2aff7f[_0x2b8e4f(0x15c)]*$gameMap['tileWidth']();_0x3a3899/=Sprite_ProximityMinimap[_0x2b8e4f(0x1ed)],this[_0x2b8e4f(0x191)]['scale']['x']=_0x3a3899,this['_minimapSprite'][_0x2b8e4f(0x15b)]['y']=_0x3a3899,this['_minimapSprite'][_0x2b8e4f(0x1ad)]=Sprite_ProximityMinimap[_0x2b8e4f(0xb8)];const _0x346b48=_0x2aff7f[_0x2b8e4f(0x1d3)]-0x1;this[_0x2b8e4f(0xdb)]=new Sprite(),this[_0x2b8e4f(0xdb)][_0x2b8e4f(0x1ee)]=new Bitmap(_0x346b48*0x2,_0x346b48*0x2),this[_0x2b8e4f(0xdb)][_0x2b8e4f(0x1ee)][_0x2b8e4f(0x1ea)](_0x346b48,_0x346b48,_0x346b48,'white'),this[_0x2b8e4f(0xdb)]['anchor']['x']=0.5,this[_0x2b8e4f(0xdb)][_0x2b8e4f(0x215)]['y']=0.5,this[_0x2b8e4f(0x19c)](this[_0x2b8e4f(0xdb)]),this[_0x2b8e4f(0x191)]['mask']=this['_minimapMaskSprite'];},Sprite_ProximityCompass[_0x499a1d(0x112)][_0x499a1d(0x176)]=function(){const _0x8366bb=_0x499a1d,_0x1a3448=$dataMap?$dataMap[_0x8366bb(0x20e)]||'':'';if(_0x1a3448['match'](/<MINIMAP IMAGE:[ ](.*)>/i)){if('dYFKa'!==_0x8366bb(0x129)){const _0xaa7dfc=RegExp['$1']['trim'](),_0xf10160=ImageManager[_0x8366bb(0xe4)](_0xaa7dfc);_0xf10160[_0x8366bb(0xbc)](this[_0x8366bb(0xe0)][_0x8366bb(0x1e7)](this,_0xf10160));}else _0x4cb853[_0x8366bb(0x167)](_0x4fdfe9,_0x24c570,_0x4256fa,_0x1b1b58,_0x8366bb(0x1c6));}},Sprite_ProximityCompass['prototype'][_0x499a1d(0xe0)]=function(_0x52a03e){const _0x16acd4=_0x499a1d,_0x3e1148=this[_0x16acd4(0x191)]['bitmap'],_0xb8738d=_0x3e1148['width']/($gameMap[_0x16acd4(0x140)]()?0x3:0x1),_0x337d74=_0x3e1148[_0x16acd4(0xd8)]/($gameMap[_0x16acd4(0x148)]()?0x3:0x1),_0x29703a=_0xb8738d/_0x52a03e[_0x16acd4(0xbd)],_0x2f8eae=_0x337d74/_0x52a03e[_0x16acd4(0xd8)],_0x41db6e=$gameMap['isLoopHorizontal']()?0x2:0x0,_0x2a7245=$gameMap[_0x16acd4(0x148)]()?0x2:0x0;for(let _0x5c0067=0x0;_0x5c0067<=_0x41db6e;_0x5c0067++){if(_0x16acd4(0x183)!==_0x16acd4(0x183)){this['_ProximityCompassFrameSprite']=new _0x3823e0(),this['addChild'](this['_ProximityCompassFrameSprite']),this[_0x16acd4(0x196)][_0x16acd4(0x215)]['x']=0.5,this['_ProximityCompassFrameSprite'][_0x16acd4(0x215)]['y']=0.5;const _0x38f616=this['getCompassFrameFilename']();;_0x38f616?this['_ProximityCompassFrameSprite']['bitmap']=_0x47394c[_0x16acd4(0xe4)](_0x38f616):this[_0x16acd4(0x196)]['bitmap']=_0x25da31[_0x16acd4(0xb6)];}else for(let _0xf036c4=0x0;_0xf036c4<=_0x2a7245;_0xf036c4++){const _0x25d0ee=new Sprite();_0x25d0ee[_0x16acd4(0x1ee)]=_0x52a03e,this[_0x16acd4(0x191)][_0x16acd4(0x19c)](_0x25d0ee),_0x25d0ee['scale']['x']=_0x29703a,_0x25d0ee[_0x16acd4(0x15b)]['y']=_0x2f8eae,_0x25d0ee['x']=_0xb8738d*_0x5c0067,_0x25d0ee['y']=_0x337d74*_0xf036c4;}}this[_0x16acd4(0x191)][_0x16acd4(0x1ee)]=new Bitmap(0x1,0x1);},Sprite_ProximityCompass[_0x499a1d(0x112)][_0x499a1d(0x1d7)]=function(){const _0x43452a=_0x499a1d;this['_ProximityCompassFrameSprite']=new Sprite(),this[_0x43452a(0x19c)](this[_0x43452a(0x196)]),this[_0x43452a(0x196)][_0x43452a(0x215)]['x']=0.5,this[_0x43452a(0x196)][_0x43452a(0x215)]['y']=0.5;const _0x1654c6=this[_0x43452a(0x17e)]();;if(_0x1654c6){if(_0x43452a(0x1ce)!==_0x43452a(0x1ce)){const _0xe2d2b6=this[_0x43452a(0x159)](_0x50c8e7),_0x42a3e5=0xa,_0x3602ea=_0xe2d2b6+(_0x247dde?_0x42a3e5:-_0x42a3e5);_0x3602ea>0x64&&_0x4cc3ac?this[_0x43452a(0x11e)](_0x5731a9,0x32):this[_0x43452a(0x11e)](_0x4db06d,_0x3602ea[_0x43452a(0x1af)](0x32,0x64));}else this['_ProximityCompassFrameSprite'][_0x43452a(0x1ee)]=ImageManager[_0x43452a(0xe4)](_0x1654c6);}else _0x43452a(0x138)!==_0x43452a(0x138)?this[_0x43452a(0x10d)]=_0x559429(_0x4e3198['$1']):this[_0x43452a(0x196)][_0x43452a(0x1ee)]=ImageManager[_0x43452a(0xb6)];},Sprite_ProximityCompass[_0x499a1d(0x112)]['getCompassFrameFilename']=function(){const _0x331235=_0x499a1d;if(this[_0x331235(0x191)]){if(_0x331235(0x1eb)==='GdcwQ')return Sprite_ProximityMinimap[_0x331235(0x173)]||VisuMZ[_0x331235(0x193)]['Settings'][_0x331235(0xfd)][_0x331235(0x155)];else _0x10cb95[_0x331235(0x193)][_0x331235(0xb5)]['call'](this),this['initProximityCompassEffects']();}else return VisuMZ[_0x331235(0x193)][_0x331235(0x12e)][_0x331235(0xfd)][_0x331235(0x155)];},Sprite_ProximityCompass[_0x499a1d(0x112)][_0x499a1d(0x118)]=function(){const _0x2fec78=_0x499a1d;this['_characterSprites']=[];for(const _0x584fe8 of $gameMap[_0x2fec78(0x106)]()){if(!_0x584fe8)continue;this[_0x2fec78(0x116)]['push'](new Sprite_CompassIcon(_0x584fe8));}this[_0x2fec78(0x165)]=new Sprite_CompassIcon($gamePlayer),this['_characterSprites']['push'](this[_0x2fec78(0x165)]);for(const _0x8c4e44 of this[_0x2fec78(0x116)]){this[_0x2fec78(0x19c)](_0x8c4e44);}this[_0x2fec78(0x19c)](this[_0x2fec78(0x165)]);},Sprite_ProximityCompass['prototype']['update']=function(){const _0x4b20d0=_0x499a1d;Sprite_Clickable[_0x4b20d0(0x112)][_0x4b20d0(0x12f)]['call'](this),this[_0x4b20d0(0x214)](),this['updateMinimap']();},Sprite_ProximityCompass[_0x499a1d(0x112)][_0x499a1d(0x214)]=function(){const _0x5a6bea=_0x499a1d,_0x4e4841=VisuMZ['ProximityCompass'][_0x5a6bea(0x12e)]['Compass'],_0x36e270=_0x4e4841[_0x5a6bea(0x18f)];if(this['isShow']()){if($gamePlayer[_0x5a6bea(0x172)]()){const _0x5c6d81=_0x4e4841[_0x5a6bea(0x1b7)]??0x80;this[_0x5a6bea(0x1ad)]=(this[_0x5a6bea(0x1ad)]-_0x36e270)['clamp'](_0x5c6d81,0xff);}else this[_0x5a6bea(0x1ad)]+=_0x36e270;}else this['opacity']-=_0x36e270;},Sprite_ProximityCompass[_0x499a1d(0x112)][_0x499a1d(0x1bc)]=function(){const _0x1c8fa2=_0x499a1d,_0x1a2961=VisuMZ[_0x1c8fa2(0x193)][_0x1c8fa2(0x12e)][_0x1c8fa2(0xfd)];if($gameMap[_0x1c8fa2(0x1f0)]()){if(_0x1c8fa2(0x1a1)===_0x1c8fa2(0x217))this[_0x1c8fa2(0x1c1)]=this[_0x1c8fa2(0x1c1)]||{},delete this['_passabilityMinimaps'][_0x406da7];else return![];}else{if(_0x1a2961[_0x1c8fa2(0x130)]&&$gameMessage['isBusy']()){if(_0x1c8fa2(0x1cf)!==_0x1c8fa2(0x16c))return![];else{if(_0x4c91d4<0x0)_0x14b71e+=_0x44d092[_0x1c8fa2(0xd8)]();else _0x4bb924>_0x10bc27['height']()-_0x58fad0&&(_0x3ab91b-=_0x4f2341[_0x1c8fa2(0xd8)]());_0x5c305c[_0x1c8fa2(0x167)](_0x446db6,_0x206c1f,_0x535baf,_0x3da516,_0x1c8fa2(0x1c6));}}else{if(_0x1a2961[_0x1c8fa2(0x209)]&&$gameMap[_0x1c8fa2(0x1b2)]()){if('jSuRJ'===_0x1c8fa2(0x14c))return![];else _0x34b968['ProximityCompass']['Window_Options_changeVolume'][_0x1c8fa2(0x184)](this,_0x54b16b,_0x1fb81a,_0x55ca34);}else return this[_0x1c8fa2(0x191)]&&$gameSystem['getLargeMinimapMode']()?_0x1c8fa2(0x126)===_0x1c8fa2(0x126)?![]:_0x1c8fa2(0x13d)[_0x1c8fa2(0xf0)](_0x3cde08(_0x529887['$1'])):$gameSystem['isShowProximityCompass']();}}},Sprite_ProximityCompass[_0x499a1d(0x112)][_0x499a1d(0x1be)]=function(){const _0x1045ea=_0x499a1d;if(!this[_0x1045ea(0x191)])return;const _0x4e54ba=VisuMZ[_0x1045ea(0x193)]['Settings'][_0x1045ea(0xfd)];let _0x35d965=_0x4e54ba[_0x1045ea(0x15c)]*$gameMap[_0x1045ea(0xf8)](),_0x5bd608=$gamePlayer['_realX']+0.5;if($gameMap[_0x1045ea(0x140)]())_0x5bd608+=$gameMap['width']();let _0x2f88a0=$gamePlayer['_realY']+0.5;if($gameMap[_0x1045ea(0x148)]())_0x2f88a0+=$gameMap[_0x1045ea(0xd8)]();this[_0x1045ea(0x191)]['x']=_0x5bd608*-_0x35d965,this[_0x1045ea(0x191)]['y']=_0x2f88a0*-_0x35d965;};function Sprite_ProximityMinimap(){const _0x56c9dd=_0x499a1d;this[_0x56c9dd(0xe8)]['apply'](this,arguments);}Sprite_ProximityMinimap['prototype']=Object['create'](Sprite_Clickable['prototype']),Sprite_ProximityMinimap['prototype'][_0x499a1d(0x1a8)]=Sprite_ProximityMinimap,Sprite_ProximityMinimap[_0x499a1d(0xf6)]=VisuMZ['ProximityCompass'][_0x499a1d(0x12e)][_0x499a1d(0x1a4)][_0x499a1d(0xd2)],Sprite_ProximityMinimap[_0x499a1d(0x173)]=VisuMZ['ProximityCompass'][_0x499a1d(0x12e)][_0x499a1d(0x1a4)][_0x499a1d(0x155)]||'',Sprite_ProximityMinimap['TILE_COLOR']=VisuMZ[_0x499a1d(0x193)][_0x499a1d(0x12e)][_0x499a1d(0x1a4)][_0x499a1d(0x1f5)]||0x0,Sprite_ProximityMinimap[_0x499a1d(0x1ed)]=VisuMZ[_0x499a1d(0x193)][_0x499a1d(0x12e)][_0x499a1d(0x1a4)][_0x499a1d(0x1e4)]||0x8,Sprite_ProximityMinimap['TILE_OPACITY']=VisuMZ[_0x499a1d(0x193)][_0x499a1d(0x12e)][_0x499a1d(0x1a4)]['TileOpacity']||0x80,Sprite_ProximityMinimap[_0x499a1d(0xd5)]=VisuMZ[_0x499a1d(0x193)][_0x499a1d(0x12e)]['Minimap'][_0x499a1d(0xd3)]||![],Sprite_ProximityMinimap[_0x499a1d(0x149)]=VisuMZ['ProximityCompass'][_0x499a1d(0x12e)][_0x499a1d(0x1a4)][_0x499a1d(0x1e2)]||0x0,Sprite_ProximityMinimap['DEFAULT_EXPLORE']=VisuMZ[_0x499a1d(0x193)]['Settings']['Minimap'][_0x499a1d(0x1fc)]||![],Sprite_ProximityMinimap['BACK_FILENAME']=VisuMZ[_0x499a1d(0x193)][_0x499a1d(0x12e)][_0x499a1d(0x1a4)][_0x499a1d(0x143)]||'',Sprite_ProximityMinimap[_0x499a1d(0xc0)]=VisuMZ[_0x499a1d(0x193)][_0x499a1d(0x12e)][_0x499a1d(0x1a4)]['ImageOpacity']||0x1,Sprite_ProximityMinimap[_0x499a1d(0x189)]=VisuMZ['ProximityCompass']['Settings'][_0x499a1d(0x1a4)][_0x499a1d(0x194)]||0x0,Sprite_ProximityMinimap[_0x499a1d(0x112)][_0x499a1d(0xe8)]=function(){const _0x1038fe=_0x499a1d;Sprite_Clickable['prototype'][_0x1038fe(0xe8)][_0x1038fe(0x184)](this),this['initMembers'](),this[_0x1038fe(0x1e6)]();},Sprite_ProximityMinimap[_0x499a1d(0x112)][_0x499a1d(0x16a)]=function(){const _0xeb3d16=_0x499a1d;this['x']=Math[_0xeb3d16(0x1b4)](Graphics[_0xeb3d16(0xbd)]/0x2),this['y']=Math[_0xeb3d16(0x1b4)](Graphics[_0xeb3d16(0xd8)]/0x2),this[_0xeb3d16(0x215)]['x']=0.5,this[_0xeb3d16(0x215)]['y']=0.5,this[_0xeb3d16(0x1ad)]=this[_0xeb3d16(0x1bc)]()?0xff:0x0,this[_0xeb3d16(0xf4)]=-0x32,this[_0xeb3d16(0x213)]=-0x32;},Sprite_ProximityMinimap[_0x499a1d(0x112)][_0x499a1d(0x1e6)]=function(){const _0x24e329=_0x499a1d;this[_0x24e329(0x1b3)](),this[_0x24e329(0xf2)](),this[_0x24e329(0xd9)](),this[_0x24e329(0xe2)](),this[_0x24e329(0x1a5)](),this[_0x24e329(0x1f2)](),this[_0x24e329(0x201)](),this[_0x24e329(0x118)](),this['update']();},Sprite_ProximityMinimap[_0x499a1d(0x112)][_0x499a1d(0x1b3)]=function(){const _0x1b3e4c=_0x499a1d;if(!this[_0x1b3e4c(0x147)]())return;const _0x26ca9c=Sprite_ProximityMinimap[_0x1b3e4c(0x1d5)];this[_0x1b3e4c(0xe5)]=new Sprite(),this['_pictureBackSprite'][_0x1b3e4c(0x1ee)]=ImageManager[_0x1b3e4c(0xe4)](_0x26ca9c),this[_0x1b3e4c(0x19c)](this[_0x1b3e4c(0xe5)]),this['_pictureBackSprite'][_0x1b3e4c(0x215)]['x']=0.5,this[_0x1b3e4c(0xe5)][_0x1b3e4c(0x215)]['y']=0.5,this[_0x1b3e4c(0xe5)][_0x1b3e4c(0x1ad)]=Sprite_ProximityMinimap[_0x1b3e4c(0xc0)];},Sprite_ProximityMinimap['prototype'][_0x499a1d(0x147)]=function(){const _0x73feb=_0x499a1d;return Sprite_ProximityMinimap[_0x73feb(0x1d5)]!=='';},Sprite_ProximityMinimap[_0x499a1d(0x112)][_0x499a1d(0xf2)]=function(){const _0x3e4e42=_0x499a1d,_0x10191e=VisuMZ['ProximityCompass']['Settings'][_0x3e4e42(0xfd)],_0x3a6da8=_0x10191e['BackColor'];this[_0x3e4e42(0x110)]=new Sprite(),this[_0x3e4e42(0x19c)](this['_backgroundSprite']),this[_0x3e4e42(0x110)][_0x3e4e42(0x1ee)]=new Bitmap(0x1,0x1),this['_backgroundSprite'][_0x3e4e42(0x1ee)][_0x3e4e42(0x167)](0x0,0x0,0x1,0x1,_0x3a6da8),this['_backgroundSprite'][_0x3e4e42(0x1ee)][_0x3e4e42(0xb7)]=![],this['_backgroundSprite']['anchor']['x']=0.5,this[_0x3e4e42(0x110)][_0x3e4e42(0x215)]['y']=0.5,this[_0x3e4e42(0x110)][_0x3e4e42(0x1ad)]=_0x10191e['BackOpacity'],this[_0x3e4e42(0x147)]()&&(_0x3e4e42(0x18c)==='dmXnj'?(_0x2e89f3[_0x3e4e42(0x112)][_0x3e4e42(0x12f)][_0x3e4e42(0x184)](this),this['updateOpacity'](),this[_0x3e4e42(0x114)](),this[_0x3e4e42(0x1ae)](),this[_0x3e4e42(0x1f4)]()):this[_0x3e4e42(0x110)][_0x3e4e42(0x1ad)]=0x0);},Sprite_ProximityMinimap[_0x499a1d(0x112)]['createContainer']=function(){const _0x436148=_0x499a1d;this['_maskContainer']=new Sprite(),this[_0x436148(0x19c)](this['_maskContainer']);},Sprite_ProximityMinimap[_0x499a1d(0x112)][_0x499a1d(0xe2)]=function(){const _0x176593=_0x499a1d;let _0x5bcf05=![];const _0x285d7c=$dataMap?$dataMap[_0x176593(0x20e)]||'':'';if(_0x285d7c[_0x176593(0x10a)](/<MINIMAP IMAGE:[ ](.*)>/i)){if(_0x176593(0xd1)!==_0x176593(0x177)){const _0x58abb2=RegExp['$1'][_0x176593(0xcd)]();this[_0x176593(0x1df)](_0x58abb2),_0x5bcf05=!![];}else{if(_0x33fd7c[_0x176593(0x193)][_0x176593(0x12e)][_0x176593(0x1a4)][_0x176593(0xfb)])return 0xf4240;}}else this['createDefaultMinimap']();this[_0x176593(0x191)]['anchor']['x']=0.5,this[_0x176593(0x191)][_0x176593(0x215)]['y']=0.5,this[_0x176593(0x191)][_0x176593(0x1ad)]=Sprite_ProximityMinimap[_0x176593(0xb8)];const _0x3fe62d=Sprite_ProximityMinimap[_0x176593(0x149)]*0x2,_0x29656a=ImageManager[_0x176593(0x1fa)](),_0x51151b=(Graphics[_0x176593(0xbd)]-_0x3fe62d-0x2)/(_0x29656a[_0x176593(0xbd)]/($gameMap[_0x176593(0x140)]()?0x3:0x1)),_0x3ac572=(Graphics[_0x176593(0xd8)]-_0x3fe62d-0x2)/(_0x29656a[_0x176593(0xd8)]/($gameMap[_0x176593(0x148)]()?0x3:0x1));this[_0x176593(0x171)]=Math['min'](_0x51151b,_0x3ac572),!_0x5bcf05&&(this[_0x176593(0x191)][_0x176593(0x15b)]['x']=this['_minimapScale'],this[_0x176593(0x191)][_0x176593(0x15b)]['y']=this[_0x176593(0x171)]);},Sprite_ProximityMinimap[_0x499a1d(0x112)]['createImageMinimap']=function(_0x1af716){const _0x4593b0=_0x499a1d;this[_0x4593b0(0x191)]=new Sprite(),this['_minimapSprite'][_0x4593b0(0x1ee)]=ImageManager[_0x4593b0(0xe4)](_0x1af716),this[_0x4593b0(0xee)]['addChild'](this[_0x4593b0(0x191)]),this[_0x4593b0(0x191)][_0x4593b0(0x1ee)][_0x4593b0(0xbc)](this['onLoadImageMinimap'][_0x4593b0(0x1e7)](this));},Sprite_ProximityMinimap[_0x499a1d(0x112)][_0x499a1d(0x18b)]=function(){const _0x112641=_0x499a1d,_0x54ccc2=Sprite_ProximityMinimap[_0x112641(0x149)]*0x2,_0x903937=(Graphics[_0x112641(0xbd)]-_0x54ccc2-0x2)/this[_0x112641(0x191)]['width'],_0x46e542=(Graphics[_0x112641(0xd8)]-_0x54ccc2-0x2)/this[_0x112641(0x191)][_0x112641(0xd8)],_0x56365e=Math[_0x112641(0x104)](_0x903937,_0x46e542);this[_0x112641(0x191)][_0x112641(0x15b)]['x']=_0x56365e,this[_0x112641(0x191)][_0x112641(0x15b)]['y']=_0x56365e;},Sprite_ProximityMinimap['prototype'][_0x499a1d(0x1c5)]=function(){const _0x34a261=_0x499a1d;this[_0x34a261(0x191)]=new Sprite(),this['_minimapSprite'][_0x34a261(0x1ee)]=ImageManager[_0x34a261(0x1fa)](),this[_0x34a261(0xee)][_0x34a261(0x19c)](this[_0x34a261(0x191)]);const _0x3224a5=$gameMap['width']()*Sprite_ProximityMinimap[_0x34a261(0x1ed)],_0x174c1d=$gameMap[_0x34a261(0xd8)]()*Sprite_ProximityMinimap[_0x34a261(0x1ed)],_0x2ae53a=$gameMap[_0x34a261(0x140)]()?_0x3224a5:0x0,_0x128410=$gameMap[_0x34a261(0x148)]()?_0x174c1d:0x0;this[_0x34a261(0x191)][_0x34a261(0x21e)](_0x2ae53a,_0x128410,_0x3224a5,_0x174c1d);if(this[_0x34a261(0x147)]()){const _0x33c8a7=Sprite_ProximityMinimap[_0x34a261(0x189)];this[_0x34a261(0x191)][_0x34a261(0x216)]=_0x33c8a7;}},Sprite_ProximityMinimap[_0x499a1d(0x112)][_0x499a1d(0x1a5)]=function(){const _0x17bc00=_0x499a1d;this[_0x17bc00(0x153)]=new Sprite(),this[_0x17bc00(0x153)][_0x17bc00(0x1ee)]=new Bitmap($gameMap[_0x17bc00(0xbd)](),$gameMap[_0x17bc00(0xd8)]()),this[_0x17bc00(0x153)][_0x17bc00(0x1ee)][_0x17bc00(0xb7)]=ImageManager[_0x17bc00(0x1fa)]()[_0x17bc00(0xb7)],this[_0x17bc00(0xee)][_0x17bc00(0x19c)](this[_0x17bc00(0x153)]),this['_maskContainer']['mask']=this[_0x17bc00(0x153)],this[_0x17bc00(0x153)][_0x17bc00(0x215)]['x']=0.5,this['_unexploredMask'][_0x17bc00(0x215)]['y']=0.5,this[_0x17bc00(0x153)][_0x17bc00(0x15b)]['x']=this[_0x17bc00(0x171)]*Sprite_ProximityMinimap[_0x17bc00(0x1ed)],this[_0x17bc00(0x153)][_0x17bc00(0x15b)]['y']=this['_minimapScale']*Sprite_ProximityMinimap['TILE_SIZE'];},Sprite_ProximityMinimap[_0x499a1d(0x112)][_0x499a1d(0x1f2)]=function(){const _0x46d63e=_0x499a1d;if(!this['_unexploredMask'])return;if(!$gameMap['isMinimapExplorable']()){this[_0x46d63e(0x153)][_0x46d63e(0x1ee)][_0x46d63e(0x167)](0x0,0x0,$gameMap[_0x46d63e(0xbd)](),$gameMap[_0x46d63e(0xd8)](),'white');return;}const _0x2672b3=$gameMap[_0x46d63e(0x142)]($gameMap[_0x46d63e(0xff)]());for(const _0x61018 of _0x2672b3){const _0x2ba1bb=_0x61018[_0x46d63e(0xc7)](',')[_0x46d63e(0xe1)](_0x3e493=>Number(_0x3e493)||0x0);this['drawOnUnexploredMask'](_0x2ba1bb[0x0],_0x2ba1bb[0x1]);}},Sprite_ProximityMinimap['prototype'][_0x499a1d(0x201)]=function(){const _0xe598c9=_0x499a1d,_0x34479f=0x2,_0x1bee9a=Math['ceil'](this[_0xe598c9(0x171)]*this[_0xe598c9(0x191)]['width'])+_0x34479f,_0x46d202=Math['ceil'](this[_0xe598c9(0x171)]*this[_0xe598c9(0x191)]['height'])+_0x34479f;this[_0xe598c9(0x110)][_0xe598c9(0x15b)]['x']=_0x1bee9a,this[_0xe598c9(0x110)][_0xe598c9(0x15b)]['y']=_0x46d202;},Sprite_ProximityMinimap['prototype'][_0x499a1d(0x118)]=function(){const _0x36571b=_0x499a1d;this[_0x36571b(0x116)]=[],this['_characterContainer']=new Sprite(),this['_maskContainer'][_0x36571b(0x19c)](this[_0x36571b(0x1cc)]);for(const _0x1d14ef of $gameMap[_0x36571b(0x106)]()){if(!_0x1d14ef)continue;const _0x7f89ef=new Sprite_CompassIcon(_0x1d14ef);_0x7f89ef[_0x36571b(0x21b)](this[_0x36571b(0x171)]),this['_characterSprites'][_0x36571b(0xab)](_0x7f89ef);}this[_0x36571b(0x165)]=new Sprite_CompassIcon($gamePlayer),this[_0x36571b(0x165)][_0x36571b(0x21b)](this[_0x36571b(0x171)]),this[_0x36571b(0x116)]['push'](this[_0x36571b(0x165)]);for(const _0x478aef of this[_0x36571b(0x116)]){'mRrrW'!==_0x36571b(0x1a9)?this[_0x36571b(0x211)]=_0x2561b5['compassSize']:this[_0x36571b(0x1cc)]['addChild'](_0x478aef);}this['_characterContainer'][_0x36571b(0x19c)](this[_0x36571b(0x165)]);},Sprite_ProximityMinimap[_0x499a1d(0x112)][_0x499a1d(0x12f)]=function(){const _0x4e8e1c=_0x499a1d;Sprite_Clickable['prototype'][_0x4e8e1c(0x12f)][_0x4e8e1c(0x184)](this),this[_0x4e8e1c(0x214)](),this['updateExploration']();},Sprite_ProximityMinimap[_0x499a1d(0x112)]['updateOpacity']=function(){const _0x3ea09b=_0x499a1d,_0x3a9e31=VisuMZ[_0x3ea09b(0x193)][_0x3ea09b(0x12e)]['Compass'],_0x39e54b=_0x3a9e31[_0x3ea09b(0x18f)];this[_0x3ea09b(0x1bc)]()?this[_0x3ea09b(0x1ad)]+=_0x39e54b:this[_0x3ea09b(0x1ad)]-=_0x39e54b;},Sprite_ProximityMinimap[_0x499a1d(0x112)]['isShow']=function(){const _0x3b45ca=_0x499a1d,_0x5f6ac3=VisuMZ[_0x3b45ca(0x193)]['Settings'][_0x3b45ca(0x1a4)];if($gameMap['hideCompass']()){if(_0x3b45ca(0x1a2)!=='vKIuV')return![];else{if(this[_0x3b45ca(0x1ac)]())this[_0x3b45ca(0x16f)]();else this[_0x3b45ca(0x10f)]()?this[_0x3b45ca(0x12c)]():this[_0x3b45ca(0x192)]();}}else{if(_0x5f6ac3[_0x3b45ca(0x130)]&&$gameMessage[_0x3b45ca(0x13f)]())return![];else{if(_0x5f6ac3[_0x3b45ca(0x209)]&&$gameMap[_0x3b45ca(0x1b2)]())return![];else return!$gameSystem['getLargeMinimapMode']()?![]:$gameSystem['isShowProximityCompass']();}}},Sprite_ProximityMinimap[_0x499a1d(0x112)][_0x499a1d(0x14b)]=function(){const _0x4444e2=_0x499a1d;if(!this['_unexploredMask'])return;if(!$gameMap['isMinimapExplorable']())return;if($gamePlayer['x']===this['_lastPlayerX']&&$gamePlayer['y']===this[_0x4444e2(0x213)])return;const _0x568c17=$gamePlayer['x'],_0x461ebf=$gamePlayer['y'];this[_0x4444e2(0xf4)]=_0x568c17,this[_0x4444e2(0x213)]=_0x461ebf;const _0x2dee6c=$gameMap[_0x4444e2(0xff)]();$gameMap['registerMinimapExploredTiles'](_0x2dee6c,_0x568c17,_0x461ebf),this[_0x4444e2(0x13e)](_0x568c17,_0x461ebf);},Sprite_ProximityMinimap[_0x499a1d(0x112)][_0x499a1d(0x13e)]=function(_0x4f5ea8,_0x3c111b){const _0x574220=_0x499a1d;if(!this[_0x574220(0x153)])return;const _0x47dfdd=this[_0x574220(0x153)]['bitmap'],_0x35aa5b=Math[_0x574220(0xea)](Graphics[_0x574220(0xbd)]/$gameMap['tileWidth']()),_0x52cf1c=Math[_0x574220(0xea)](Graphics[_0x574220(0xd8)]/$gameMap['tileHeight']()),_0x4dc5c3=Math[_0x574220(0xea)](_0x35aa5b/0x2),_0x16480b=Math[_0x574220(0xea)](_0x52cf1c/0x2);let _0x268172=_0x4f5ea8-_0x4dc5c3,_0x448a3b=_0x3c111b-_0x16480b;if(!$gameMap[_0x574220(0x140)]()){if(_0x574220(0xeb)==='VEFMl')_0x268172=Math[_0x574220(0x139)](_0x268172,0x0),_0x268172=Math['min'](_0x268172,$gameMap[_0x574220(0xbd)]()-_0x35aa5b);else return 0xf4240;}!$gameMap[_0x574220(0x148)]()&&(_0x448a3b=Math['max'](_0x448a3b,0x0),_0x448a3b=Math[_0x574220(0x104)](_0x448a3b,$gameMap['height']()-_0x52cf1c));_0x47dfdd[_0x574220(0x167)](_0x268172,_0x448a3b,_0x35aa5b,_0x52cf1c,_0x574220(0x1c6));const _0x25da52=_0x268172;if($gameMap[_0x574220(0x140)]()){if(_0x268172<0x0)_0x268172+=$gameMap['width']();else _0x268172>$gameMap[_0x574220(0xbd)]()-_0x35aa5b&&(_0x268172-=$gameMap[_0x574220(0xbd)]());_0x47dfdd[_0x574220(0x167)](_0x268172,_0x448a3b,_0x35aa5b,_0x52cf1c,_0x574220(0x1c6));}if($gameMap[_0x574220(0x148)]()){if(_0x574220(0x1ec)===_0x574220(0x1ec)){if(_0x448a3b<0x0)_0x448a3b+=$gameMap[_0x574220(0xd8)]();else _0x448a3b>$gameMap[_0x574220(0xd8)]()-_0x52cf1c&&(_0x448a3b-=$gameMap['height']());_0x47dfdd[_0x574220(0x167)](_0x268172,_0x448a3b,_0x35aa5b,_0x52cf1c,'white');}else return![];}$gameMap['isLoopHorizontal']()&&$gameMap[_0x574220(0x148)]()&&_0x268172!==_0x25da52&&_0x47dfdd['fillRect'](_0x25da52,_0x448a3b,_0x35aa5b,_0x52cf1c,_0x574220(0x1c6));},Sprite_ProximityMinimap[_0x499a1d(0x112)][_0x499a1d(0xac)]=function(){const _0x6f9bdc=_0x499a1d;if(!this['_unexploredMask'])return;const _0x4707f4=this[_0x6f9bdc(0x153)][_0x6f9bdc(0x1ee)];_0x4707f4[_0x6f9bdc(0x186)](),this[_0x6f9bdc(0xf4)]=-0x32,this[_0x6f9bdc(0x213)]=-0x32,this[_0x6f9bdc(0x14b)]();},Sprite_ProximityMinimap['prototype'][_0x499a1d(0x128)]=function(){const _0x2c571b=_0x499a1d;if(!this[_0x2c571b(0x153)])return;const _0xef92ca=this['_unexploredMask']['bitmap'];_0xef92ca[_0x2c571b(0x167)](0x0,0x0,_0xef92ca[_0x2c571b(0xbd)],_0xef92ca['height'],_0x2c571b(0x1c6));};function Sprite_CompassIcon(){const _0x411ccc=_0x499a1d;this[_0x411ccc(0xe8)][_0x411ccc(0x1ff)](this,arguments);}Sprite_CompassIcon[_0x499a1d(0x112)]=Object[_0x499a1d(0xc1)](Sprite['prototype']),Sprite_CompassIcon['prototype'][_0x499a1d(0x1a8)]=Sprite_CompassIcon,Sprite_CompassIcon[_0x499a1d(0x112)]['initialize']=function(_0xf64d15){const _0x1f27d0=_0x499a1d;this[_0x1f27d0(0x107)]=_0xf64d15,this['_iconIndex']=0x0,Sprite[_0x1f27d0(0x112)][_0x1f27d0(0xe8)]['call'](this),this['initMembers'](),this['loadBitmap'](),this[_0x1f27d0(0x12b)]();},Sprite_CompassIcon['prototype'][_0x499a1d(0x16a)]=function(){const _0x5cc11a=_0x499a1d;this[_0x5cc11a(0x215)]['x']=0.5,this['anchor']['y']=0.5;var _0x588063=0x1/(ConfigManager[_0x5cc11a(0x211)]*0.01);this[_0x5cc11a(0x15b)]['x']=_0x588063,this['scale']['y']=_0x588063,this[_0x5cc11a(0x1c8)]=![],this['_largeMinimapScale']=0x1;},Sprite_CompassIcon[_0x499a1d(0x112)]['loadBitmap']=function(){const _0x2a11cb=_0x499a1d;this[_0x2a11cb(0x1ee)]=ImageManager[_0x2a11cb(0xd7)](_0x2a11cb(0x150));},Sprite_CompassIcon[_0x499a1d(0x112)][_0x499a1d(0x12b)]=function(){const _0xd7f16c=_0x499a1d;if(this[_0xd7f16c(0x107)]===$gamePlayer)_0xd7f16c(0x1f7)!==_0xd7f16c(0x1f7)?_0x1f4671=_0x5609dd['max'](_0x578db5,_0x519466):this[_0xd7f16c(0x1ad)]=0xff;else{if(_0xd7f16c(0x1c4)===_0xd7f16c(0x1d2))this[_0xd7f16c(0x191)]=new _0x40e537(),this[_0xd7f16c(0x191)][_0xd7f16c(0x1ee)]=_0x39af7f[_0xd7f16c(0xe4)](_0x3214dd),this['_maskContainer'][_0xd7f16c(0x19c)](this[_0xd7f16c(0x191)]),this[_0xd7f16c(0x191)][_0xd7f16c(0x1ee)][_0xd7f16c(0xbc)](this[_0xd7f16c(0x18b)][_0xd7f16c(0x1e7)](this));else{var _0x22b24d=this[_0xd7f16c(0x21d)](),_0x133480=$gameMap[_0xd7f16c(0x14e)](this[_0xd7f16c(0x107)][_0xd7f16c(0x185)],$gamePlayer['_realX']),_0x430291=$gameMap[_0xd7f16c(0x14e)](this[_0xd7f16c(0x107)][_0xd7f16c(0x1f8)],$gamePlayer['_realY']);_0x22b24d>=Math[_0xd7f16c(0xb2)](_0x133480)+Math[_0xd7f16c(0xb2)](_0x430291)?this['opacity']=0xff:this[_0xd7f16c(0x1ad)]=0x0;}}},Sprite_CompassIcon[_0x499a1d(0x112)][_0x499a1d(0x21d)]=function(){const _0x1097ed=_0x499a1d;if(this[_0x1097ed(0x1ac)]()){if(_0x1097ed(0x15a)===_0x1097ed(0x1c0)){const _0x5d50a7=_0x3f7538[_0x1097ed(0x1b0)],_0x45d9d0=_0x1097ed(0x1b0);this['addCommand'](_0x5d50a7,_0x45d9d0);}else{if(VisuMZ['ProximityCompass']['Settings'][_0x1097ed(0x1a4)][_0x1097ed(0xfb)])return 0xf4240;}}return this[_0x1097ed(0x107)]?this['_character']['_compassProximity']:0x1;},Sprite_CompassIcon[_0x499a1d(0x112)][_0x499a1d(0x21b)]=function(_0x1707d7){const _0x9d359c=_0x499a1d;this[_0x9d359c(0x1c8)]=!![],this['_largeMinimapScale']=_0x1707d7;},Sprite_CompassIcon[_0x499a1d(0x112)]['isLargeMinimapChild']=function(){const _0x4ba205=_0x499a1d;return this[_0x4ba205(0x1c8)];},Sprite_CompassIcon[_0x499a1d(0x112)]['update']=function(){const _0x23378b=_0x499a1d;Sprite[_0x23378b(0x112)][_0x23378b(0x12f)][_0x23378b(0x184)](this),this[_0x23378b(0x214)](),this['updateFrame'](),this['updatePosition'](),this[_0x23378b(0x1f4)]();},Sprite_CompassIcon[_0x499a1d(0x112)]['updateOpacity']=function(){const _0x17328b=_0x499a1d;if(this[_0x17328b(0x107)]===$gamePlayer)_0x17328b(0x12a)!=='lApCs'?this[_0x17328b(0x1e9)]():this[_0x17328b(0x1ad)]=0xff;else{if(this[_0x17328b(0x107)]&&this[_0x17328b(0x107)][_0x17328b(0xda)])'CUQGm'===_0x17328b(0x18d)?this[_0x17328b(0x1ad)]=0x0:_0x255f55+=_0x3b18c3['height']();else{if('BfEGW'==='JJFsZ')this[_0x17328b(0x1ad)]+=_0x397efb;else{var _0x50421d=this[_0x17328b(0x21d)](),_0x3cc01c=$gameMap[_0x17328b(0x14e)](this[_0x17328b(0x107)][_0x17328b(0x185)],$gamePlayer[_0x17328b(0x185)]),_0x10032c=$gameMap[_0x17328b(0x14e)](this[_0x17328b(0x107)]['_realY'],$gamePlayer['_realY']);const _0x4469b9=VisuMZ[_0x17328b(0x193)][_0x17328b(0x12e)][_0x17328b(0xfd)][_0x17328b(0x169)];if(_0x50421d>=Math[_0x17328b(0xb2)](_0x3cc01c)+Math[_0x17328b(0xb2)](_0x10032c))this[_0x17328b(0x1ad)]+=_0x4469b9;else{if(_0x17328b(0x1dd)===_0x17328b(0xf3)){const _0x4a1ebd=_0x3b26a6[_0x17328b(0x134)];_0x4a1ebd&&_0x4a1ebd[_0x17328b(0xac)]();}else this['opacity']-=_0x4469b9;}}}}},Sprite_CompassIcon[_0x499a1d(0x112)][_0x499a1d(0x114)]=function(){const _0x38cb5d=_0x499a1d;this['_iconIndex']=this[_0x38cb5d(0x204)]();if(this[_0x38cb5d(0xe9)]===0x0){if(_0x38cb5d(0x162)!=='OhYhC')this[_0x38cb5d(0x21e)](0x0,0x0,0x0,0x0);else return!![];}else{var _0x2eef51=ImageManager['iconWidth'],_0x3af73a=ImageManager[_0x38cb5d(0x152)],_0x47b697=this['_iconIndex']%0x10*_0x2eef51,_0x212769=Math[_0x38cb5d(0x151)](this[_0x38cb5d(0xe9)]/0x10)*_0x3af73a;this[_0x38cb5d(0x21e)](_0x47b697,_0x212769,_0x2eef51,_0x3af73a);}},Sprite_CompassIcon[_0x499a1d(0x112)][_0x499a1d(0x204)]=function(){const _0x1401a4=_0x499a1d;if(this[_0x1401a4(0x107)]===$gamePlayer)return $gameSystem[_0x1401a4(0xd4)]();else return this[_0x1401a4(0x1ac)]()?this['_character']['_compassIconIndex']||this[_0x1401a4(0x107)][_0x1401a4(0xb0)]:this[_0x1401a4(0x107)][_0x1401a4(0x10d)];},Sprite_CompassIcon[_0x499a1d(0x112)]['updatePosition']=function(){const _0x1b833e=_0x499a1d;if(this[_0x1b833e(0x1ac)]())this['updatePositionMinimapLarge']();else{if(this[_0x1b833e(0x10f)]()){if(_0x1b833e(0x154)!==_0x1b833e(0x11a))this[_0x1b833e(0x12c)]();else{const _0xf97dc7=_0x2b893e[_0x1b833e(0x193)][_0x1b833e(0x12e)][_0x1b833e(0x1a4)];if(this[_0x1b833e(0x107)]===_0x5bf895)_0x1b8236*=_0xf97dc7[_0x1b833e(0x1fe)];else{if(this['_character'][_0x1b833e(0x10d)]>0x0)_0x304232*=_0xf97dc7['CompassIconScale'];else this[_0x1b833e(0x107)][_0x1b833e(0x10d)]<=0x0&&(_0x290b5f*=_0xf97dc7[_0x1b833e(0x1f1)]);}}}else this['updatePositionClassic']();}},Sprite_CompassIcon[_0x499a1d(0x112)][_0x499a1d(0x10f)]=function(){const _0x4f01b3=_0x499a1d;return this['parent']&&this[_0x4f01b3(0x17b)]['_minimapSprite'];},Sprite_CompassIcon[_0x499a1d(0x112)][_0x499a1d(0x192)]=function(){const _0x4d2e24=_0x499a1d,_0x298484=VisuMZ[_0x4d2e24(0x193)][_0x4d2e24(0x12e)][_0x4d2e24(0xfd)];var _0xe17aad=_0x298484[_0x4d2e24(0x1d3)],_0x3bde00=_0x298484[_0x4d2e24(0x15c)]*$gameMap[_0x4d2e24(0xf8)](),_0x3ae403=$gameMap['deltaX'](this['_character'][_0x4d2e24(0x185)],$gamePlayer['_realX'])*_0x3bde00,_0x20fbe5=$gameMap[_0x4d2e24(0x14e)](this[_0x4d2e24(0x107)]['_realY'],$gamePlayer[_0x4d2e24(0x1f8)])*_0x3bde00,_0x532a4e=Math[_0x4d2e24(0x1d1)](_0x3ae403*_0x3ae403+_0x20fbe5*_0x20fbe5);if(_0x532a4e<_0xe17aad)this['x']=Math[_0x4d2e24(0x1b4)](_0x3ae403),this['y']=Math['round'](_0x20fbe5);else{var _0x3bcf19=Math['atan2'](_0x20fbe5,_0x3ae403);this['x']=Math[_0x4d2e24(0x1b4)](_0xe17aad*Math[_0x4d2e24(0x170)](_0x3bcf19)),this['y']=Math[_0x4d2e24(0x1b4)](_0xe17aad*Math['sin'](_0x3bcf19));}},Sprite_CompassIcon[_0x499a1d(0x112)][_0x499a1d(0x12c)]=function(){const _0x2345ff=_0x499a1d,_0x418663=VisuMZ[_0x2345ff(0x193)]['Settings'][_0x2345ff(0xfd)],_0x4ff07c=_0x418663[_0x2345ff(0x1d3)],_0x3c4bac=_0x418663[_0x2345ff(0x15c)]*$gameMap['tileWidth'](),_0x9e7eb4=$gameMap[_0x2345ff(0x14e)](this[_0x2345ff(0x107)]['_realX'],$gamePlayer[_0x2345ff(0x185)])*_0x3c4bac,_0x500f92=$gameMap['deltaX'](this['_character'][_0x2345ff(0x1f8)],$gamePlayer[_0x2345ff(0x1f8)])*_0x3c4bac,_0x46f6f6=Math[_0x2345ff(0x1d1)](_0x9e7eb4*_0x9e7eb4+_0x500f92*_0x500f92);this['x']=Math['round'](_0x9e7eb4),this['y']=Math[_0x2345ff(0x1b4)](_0x500f92);if(_0x46f6f6>=_0x4ff07c){const _0x5ec7c5=_0x9e7eb4[_0x2345ff(0x1af)](-_0x4ff07c,_0x4ff07c),_0x24e1ad=_0x500f92[_0x2345ff(0x1af)](-_0x4ff07c,_0x4ff07c),_0x2353b3=Math[_0x2345ff(0x1ba)](_0x24e1ad,_0x5ec7c5),_0x5b0737=Math['cos'](_0x2353b3)*_0x4ff07c,_0x458479=Math[_0x2345ff(0x102)](_0x2353b3)*_0x4ff07c;this['x']=Math[_0x2345ff(0x1b4)](_0x9e7eb4)[_0x2345ff(0x1af)](-_0x5b0737,_0x5b0737),this['y']=Math[_0x2345ff(0x1b4)](_0x500f92)[_0x2345ff(0x1af)](-_0x458479,_0x458479);}},Sprite_CompassIcon['prototype'][_0x499a1d(0x16f)]=function(){const _0x3534e9=_0x499a1d,_0x1c6dcb=$gameMap[_0x3534e9(0xbd)](),_0x52e537=$gameMap['height'](),_0x44fce1=this['_largeMinimapScale'];let _0x138627=this[_0x3534e9(0x107)][_0x3534e9(0x185)]+0.5,_0xdc7cff=this[_0x3534e9(0x107)][_0x3534e9(0x1f8)]+0.5;const _0x34a8bc=Sprite_ProximityMinimap['TILE_SIZE']*_0x44fce1;_0x138627*=_0x34a8bc,_0xdc7cff*=_0x34a8bc,_0x138627-=_0x1c6dcb/0x2*_0x34a8bc,_0xdc7cff-=_0x52e537/0x2*_0x34a8bc,this['x']=_0x138627,this['y']=_0xdc7cff;},Sprite_CompassIcon[_0x499a1d(0x112)][_0x499a1d(0x1f4)]=function(){const _0x3f83bc=_0x499a1d;let _0x30975c=0x1/(ConfigManager[_0x3f83bc(0x211)]*0.01);if(this['isLargeMinimapChild']()){const _0x9464ac=VisuMZ[_0x3f83bc(0x193)][_0x3f83bc(0x12e)][_0x3f83bc(0x1a4)];if(this[_0x3f83bc(0x107)]===$gamePlayer){if(_0x3f83bc(0xdc)!=='flPdQ'){_0x2949fc['ConvertParams'](_0x5cf335,_0x407aad);const _0x561234=_0x5bfeff['value'];_0x4433b8['setShowProximityCompass'](_0x561234);}else _0x30975c*=_0x9464ac['PlayerIconScale'];}else{if(this['_character']['_compassIconIndex']>0x0)'PZnpx'!==_0x3f83bc(0x212)?(_0x206ea0[_0x3f83bc(0x193)][_0x3f83bc(0x219)]['call'](this),this[_0x3f83bc(0x188)]()):_0x30975c*=_0x9464ac[_0x3f83bc(0xbb)];else this[_0x3f83bc(0x107)]['_compassIconIndex']<=0x0&&('AraLS'===_0x3f83bc(0xc9)?_0x30975c*=_0x9464ac['MinimapIconScale']:_0x32f111['clearRect'](_0x47a5b0+_0x34db86-0x1,_0x767a52,0x1,_0x1470f6));}}this['scale']['x']=_0x30975c,this[_0x3f83bc(0x15b)]['y']=_0x30975c;},VisuMZ[_0x499a1d(0x193)][_0x499a1d(0x19a)]=Window_Options[_0x499a1d(0x112)][_0x499a1d(0x1f6)],Window_Options[_0x499a1d(0x112)][_0x499a1d(0x1f6)]=function(){const _0x34801a=_0x499a1d;VisuMZ[_0x34801a(0x193)][_0x34801a(0x19a)][_0x34801a(0x184)](this),this['addProximityCompassCommands']();},Window_Options[_0x499a1d(0x112)]['addProximityCompassCommands']=function(){const _0x58e0e8=_0x499a1d;VisuMZ[_0x58e0e8(0x193)]['Settings'][_0x58e0e8(0x166)][_0x58e0e8(0x1cd)]&&this[_0x58e0e8(0x1e3)](),VisuMZ['ProximityCompass'][_0x58e0e8(0x12e)][_0x58e0e8(0x166)]['AddSizeOption']&&this[_0x58e0e8(0x141)]();},Window_Options[_0x499a1d(0x112)][_0x499a1d(0x1e3)]=function(){const _0x305405=_0x499a1d,_0x492e0d=TextManager[_0x305405(0x1b0)],_0x236472=_0x305405(0x1b0);this[_0x305405(0xbf)](_0x492e0d,_0x236472);},Window_Options[_0x499a1d(0x112)][_0x499a1d(0x141)]=function(){const _0x57dad9=_0x499a1d,_0xbd9338=TextManager[_0x57dad9(0x211)],_0x3ba5c1=_0x57dad9(0x211);this[_0x57dad9(0xbf)](_0xbd9338,_0x3ba5c1);},VisuMZ[_0x499a1d(0x193)][_0x499a1d(0x160)]=Window_Options[_0x499a1d(0x112)][_0x499a1d(0x1b6)],Window_Options['prototype']['isVolumeSymbol']=function(_0x46ac61){const _0xcc193d=_0x499a1d;if(_0x46ac61===_0xcc193d(0x211)){if(_0xcc193d(0x1b5)==='eCzMK')return!![];else _0x1b7a99=_0x269e4b[_0xcc193d(0x139)](_0x41f525,0x0),_0x1d823a=_0x4d838c[_0xcc193d(0x104)](_0x3ffd1f,_0x42475f[_0xcc193d(0xbd)]()-_0x16c2df);}else return VisuMZ['ProximityCompass'][_0xcc193d(0x160)]['call'](this,_0x46ac61);},VisuMZ['ProximityCompass'][_0x499a1d(0x145)]=Window_Options[_0x499a1d(0x112)][_0x499a1d(0x1ca)],Window_Options['prototype'][_0x499a1d(0x1ca)]=function(_0x10b5bf,_0x5f3f20,_0x58b06c){const _0x4fcf6e=_0x499a1d;if(_0x10b5bf===_0x4fcf6e(0x211)){if(_0x4fcf6e(0x20f)!==_0x4fcf6e(0x20f)){if(!this[_0x4fcf6e(0x191)])return;const _0x4de05c=_0x19e1b6['ProximityCompass'][_0x4fcf6e(0x12e)][_0x4fcf6e(0xfd)];let _0x5a44df=_0x4de05c[_0x4fcf6e(0x15c)]*_0x2a975a[_0x4fcf6e(0xf8)](),_0x445883=_0x46e0f4[_0x4fcf6e(0x185)]+0.5;if(_0x3b2500[_0x4fcf6e(0x140)]())_0x445883+=_0x33fd33[_0x4fcf6e(0xbd)]();let _0xa7465e=_0x5b34cc[_0x4fcf6e(0x1f8)]+0.5;if(_0xe8c3e5[_0x4fcf6e(0x148)]())_0xa7465e+=_0x4a53fa[_0x4fcf6e(0xd8)]();this[_0x4fcf6e(0x191)]['x']=_0x445883*-_0x5a44df,this[_0x4fcf6e(0x191)]['y']=_0xa7465e*-_0x5a44df;}else this[_0x4fcf6e(0x1db)](_0x10b5bf,_0x5f3f20,_0x58b06c);}else _0x4fcf6e(0x20b)!==_0x4fcf6e(0x20b)?this[_0x4fcf6e(0x1e9)]():VisuMZ[_0x4fcf6e(0x193)]['Window_Options_changeVolume']['call'](this,_0x10b5bf,_0x5f3f20,_0x58b06c);},Window_Options[_0x499a1d(0x112)]['changeProximityCompassSize']=function(_0x42ee00,_0x2862f3,_0x3c7a1e){const _0x107ae3=_0x499a1d,_0x5e3a86=this[_0x107ae3(0x159)](_0x42ee00),_0x29e3c5=0xa,_0x3b3094=_0x5e3a86+(_0x2862f3?_0x29e3c5:-_0x29e3c5);_0x3b3094>0x64&&_0x3c7a1e?_0x107ae3(0x1d6)!=='ujlUg'?this[_0x107ae3(0x196)][_0x107ae3(0x1ee)]=_0x3cb05a[_0x107ae3(0xb6)]:this[_0x107ae3(0x11e)](_0x42ee00,0x32):'kfeTo'!==_0x107ae3(0xf5)?this[_0x107ae3(0x196)][_0x107ae3(0x1ee)]=_0x297571[_0x107ae3(0xe4)](_0x3f205d):this[_0x107ae3(0x11e)](_0x42ee00,_0x3b3094[_0x107ae3(0x1af)](0x32,0x64));};