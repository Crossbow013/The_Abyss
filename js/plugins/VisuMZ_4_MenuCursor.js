//=============================================================================
// VisuStella MZ - Menu Cursor
// VisuMZ_4_MenuCursor.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_MenuCursor = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MenuCursor = VisuMZ.MenuCursor || {};
VisuMZ.MenuCursor.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.07] [MenuCursor]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Menu_Cursor_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Add a menu cursor that uses an icon or an image from the pictures or system
 * folder to help the player find out which windows are active quicker. The
 * subtle movements of a waving cursor can do wonders to grabbing the player's
 * attention to speed up the process of directing player focus.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Use icons, pictures, or system images as the menu cursor.
 * * Decide on how the cursor is anchored and positioned with offsets to fine
 *   tune its location.
 * * Want to animate the cursor? You can do so by following a specific image
 *   format and name schema.
 * * Oscillate the cursor back and forth from a left to right horizontal bounce
 *   or an up to down vertical bounce. Or if you want, just don't have any kind
 *   of oscillation at all!
 * * Alter the menu cursor mid-game through Plugin Commands, too!
 * * Automatically pad in-game windows to accommodate for cursor oscillation.
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
 * Animated Menu Cursor Instructions
 * ============================================================================
 *
 * Save your animated picture into your game project's img/pictures/ folder or
 * the img/system/ folder depending on which you want to load from.
 * 
 * The filename must be named with the following format:
 *
 * filename[HxV]
 *
 * Replace H in the filename with the number of horizontal cells it has.
 * Replace V in the filename with the number of vertical cells it has.
 * The number of total cells it has available is equal the multiplicative
 * product of the horizontal and vertical cells.
 *
 * For example:
 *
 * "Cursor_Blue[3x2]" will have 3 horizontal cells and 2 vertical cells. This
 * means there are a total of 6 cells that will be used for animating.
 *
 * Animations will be played from left to right, then up to down so please
 * arrange them as such. For example, 4x5 will play like this:
 *
 *  1  2  3  4
 *  5  6  7  8
 *  9 10 11 12
 * 13 14 15 16
 * 17 18 19 20
 *
 * Keep this in mind as you format your animated menu cursor.
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
 * === Menu Cursor Plugin Commands ===
 * 
 * ---
 *
 * Menu Cursor: Change Settings
 * - Changes the settings for the menu cursor's appearance.
 *
 *   Appearance Type:
 *   - Select the appearance type for the menu cursor.
 *
 *     Icon Index:
 *     - If "icon" is selected as the appearance type, use this icon as
 *       the cursor.
 *
 *     Picture Filename:
 *     - If "picture" is selected as the appearance type, use this image from
 *       img/pictures/ as the cursor.
 *
 *     System Filename:
 *     - If "system" is selected as the appearance type, use this image from
 *       img/system/ as the cursor.
 *
 *     Frame Delay:
 *     - The frame delay for any animated "picture" or "system" cursors before
 *       moving onto the next frame.
 * 
 *   Anchor:
 *
 *     Anchor X:
 *     Anchor Y:
 *     - Select the position to determine where the cursor's Anchor
 *       is located.
 * 
 *   Position:
 *
 *     Position X:
 *     Position Y:
 *     - Select the placement to determine where the cursor's Position
 *       is located.
 * 
 *   Offset:
 * 
 *     Offset X:
 *     Offset Y:
 *     - Select how much to offset the cursor's X/Y position by.
 * 
 *   Wave:
 * 
 *     Wave Type:
 *     - Determine how the cursor moves while active.
 * 
 *     Speed:
 *     - Select how fast the cursor oscillates.
 *     - Lower is slower. Higher is faster.
 * 
 *     Distance:
 *     - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Cursor Settings
 * ============================================================================
 *
 * This is where you can change the settings for the menu cursor.
 *
 * ---
 *
 * Appearance Type
 * 
 *   Appearance Type:
 *   - Select the appearance type for the menu cursor.
 *     - Icon - Uses an icon as the cursor
 *     - Picture - Uses a file from img/pictures/ as the cursor
 *     - System - Uses a file from img/system/ as the cursor
 * 
 *   Icon Index:
 *   - If "icon" is selected as the appearance type, use this icon as
 *     the cursor.
 * 
 *   Picture Filename:
 *   - If "picture" is selected as the appearance type, use this image from
 *     img/pictures/ as the cursor.
 * 
 *   System Filename:
 *   - If "system" is selected as the appearance type, use this image from
 *     img/system/ as the cursor.
 * 
 *   Frame Delay:
 *   - The frame delay for any animated "picture" or "system" cursors before
 *     moving onto the next frame.
 *
 * ---
 *
 * Anchor
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Select the position to determine where the cursor's Anchor X/Y
 *     is located.
 *
 * ---
 *
 * Position
 * 
 *   Position X:
 *   Position Y:
 *   - Select the placement to determine where the cursor's Position X/Y
 *     is located.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   Offset Y:
 *   - Select how much to offset the cursor's X position by.
 *     - X: Negative numbers go left. Positive numbers go right.
 *     - Y: Negative numbers go up. Positive numbers go down.
 *
 * ---
 *
 * Wave
 * 
 *   Wave Type:
 *   - Determine how the cursor moves while active.
 *     - Horizontal - Cursor oscillates left and right
 *     - Vertical - Cursor oscillates up and down
 *     - None - Cursor does not oscillate.
 * 
 *   Speed:
 *   - Select how fast the cursor oscillates.
 *   - Lower is slower. Higher is faster.
 * 
 *   Distance:
 *   - Select how far the cursor sprite will oscillate from its origin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Tiling
 * ============================================================================
 *
 * For added visual clarity, you can add a tiling background to the menu cursor
 * that can scroll, hue shift, and has a color tone.
 *
 * ---
 *
 * General
 * 
 *   Enable?:
 *   - Enable background tiling?
 * 
 *   Filename:
 *   - Filename of the parallax used for the tiling effect.
 *   - Leave empty to not use a background tile.
 *
 * ---
 *
 * Appearance
 * 
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the tiling?
 * 
 *   Buffer:
 *   - How many pixels should be used to buffer the tiling?
 * 
 *   Color Tone:
 *   - What tone do you want for the tiling?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Hue:
 *   - Do you wish to adjust this tiling's hue?
 * 
 *   Hue Shift:
 *   - How much do you want the hue to shift each frame?
 * 
 *   Opacity:
 *   - What is the opacity of the tiling effect?
 * 
 *   Scroll X Speed:
 *   Scroll Y Speed:
 *   - How fast should the tile effect scroll horizontally/vertically?
 *   - 0 for no scroll.
 *   - Negative values scroll the other way.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Blacklist Settings
 * ============================================================================
 * 
 * The menu cursor will not appear in these windows.
 * 
 * ---
 * 
 * Settings
 * 
 *   Window Blacklist:
 *   - Insert the names of the windows' constructors here
 *   - Example: Window_ItemCategory
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Padding Settings
 * ============================================================================
 *
 * Make some windows more padded to accommodate for the menu cursor's
 * oscillation. Because of the oscillation, the cursor would sometimes go over
 * the displayed text. These settings help pad the individual entries and shift
 * over the text to make room for the cursor to move back and forth at.
 *
 * ---
 *
 * Window Padding Settings
 * 
 *   All Windows:
 *   - How much extra item padding do you want for all windows?
 * 
 *   Window_MenuCommand:
 *   Window_MenuStatus:
 *   Window_MenuActor:
 *   Window_ItemCategory:
 *   Window_ItemList:
 *   Window_SkillType:
 *   Window_SkillList:
 *   Window_EquipCommand:
 *   Window_EquipSlot:
 *   Window_EquipItem:
 *   Window_Options:
 *   Window_SavefileList:
 *   Window_ShopCommand:
 *   Window_ShopBuy:
 *   Window_ShopSell:
 *   Window_NameInput:
 *   Window_ChoiceList:
 *   Window_EventItem:
 *   Window_PartyCommand:
 *   Window_ActorCommand:
 *   Window_BattleStatus:
 *   Window_BattleActor:
 *   Window_BattleEnemy:
 *   Window_BattleSkill:
 *   Window_BattleItem:
 *   Window_TitleCommand:
 *   Window_GameEnd:
 *   Window_DebugRange:
 *   Window_DebugEdit:
 *   Window_CommonEventMenuList:
 *   Window_QuestCommand:
 *   Window_QuestList:
 *   - How much extra item padding do you want for this window?
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
 * * Harmless
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.07: July 9, 2021
 * * Compatibility Update!
 * ** Added Item Crafting System's number window to the default list.
 * 
 * Version 1.06: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** "Background Tiling" series has been added for more visual clarity.
 * 
 * Version 1.05: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for removed feature.
 * * Feature Update!
 * ** "Window_NumberInput" for Window Padding Settings Plugin Parameter is now
 *    removed. This is due to numerous "bug reports" despite the issue of no
 *    numbers being shown having been fixed since v1.01. Since many users did
 *    not do a fresh reinstall of the plugin to fix the problem and continued
 *    to submit it as bug reports, we have decided it would be better to just
 *    hardcode the padding values for this window instead. Update by Irina.
 * 
 * Version 1.04: January 15, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * ** Added "Window_ShopNumber" to the default black list.
 * 
 * Version 1.03: January 8, 2021
 * * Bug Fixes!
 * ** Menu Cursor will no longer show if there is no index selected. Fix made
 *    by Irina.
 * 
 * Version 1.02: January 1, 2021
 * * Feature Update!
 * ** Added "Window_Status" to the default black list.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Changed the default value of the Window_NumberInput padding amount to 0
 *    from 16 so that numbers don't disappear. Fix made by Yanfly.
 *
 * Version 1.00: January 22, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCursorChangeSettings
 * @text Menu Cursor: Change Settings
 * @desc Changes the settings for the menu cursor's appearance.
 *
 * @arg type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the menu cursor.
 * @default icon
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @arg pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @arg systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @arg frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @arg Anchor
 *
 * @arg anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default center
 *
 * @arg anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default top
 * 
 * @arg Position
 *
 * @arg positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @arg positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @arg Offset
 *
 * @arg offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @arg offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @arg Wave
 *
 * @arg waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @arg waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @arg waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
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
 * @param MenuCursor
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MenuCursor:struct
 * @text Menu Cursor
 * @type struct<MenuCursor>
 * @desc Default settings for the menu cursor's appearance.
 * @default {"type:str":"icon","iconIndex:num":"112","pictureFilename:str":"","systemFilename:str":"","frameDelay:num":"8","Anchor":"","anchorX:str":"center","anchorY:str":"top","Position":"","positionX:str":"left","positionY:str":"middle","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Wave":"","waveType:str":"horz","waveSpeed:num":"0.05","waveDistance:num":"10"}
 *
 * @param Tiling:struct
 * @text Background Tiling
 * @parent MenuCursor:struct
 * @type struct<Tiling>
 * @desc Background tiling settings for the menu cursor.
 * @default {"General":"","Enable:eval":"false","Filename:str":"StarlitSky","Appearance":"","BlendMode:num":"0","Buffer:num":"2","ColorTone:eval":"[0, 0, 0, 0]","Hue:num":"0","HueShift:num":"+0","Opacity:num":"255","ScrollX:num":"-1.25","ScrollY:num":"+0.5"}
 * 
 * @param CursorBlacklist:arraystr
 * @text Window Blacklist
 * @parent MenuCursor:struct
 * @type string[]
 * @desc The menu cursor will not appear in these windows.
 * @default ["Window_ItemCategory","Window_OptionsCategory","Window_Status","Window_ShopNumber","Window_ItemCraftingNumber"]
 *
 * @param WindowPadding:struct
 * @text Window Padding
 * @type struct<WindowPadding>
 * @desc Make some windows more padded to accommodate for the menu cursor's oscillation.
 * @default {"AllWindows_Padding:num":"0","Window_MenuCommand_Padding:num":"0","Window_MenuStatus_Padding:num":"0","Window_MenuActor_Padding:num":"0","Window_ItemCategory_Padding:num":"0","Window_ItemList_Padding:num":"0","Window_SkillType_Padding:num":"0","Window_SkillList_Padding:num":"0","Window_EquipCommand_Padding:num":"0","Window_EquipSlot_Padding:num":"16","Window_EquipItem_Padding:num":"0","Window_Options_Padding:num":"16","Window_SavefileList_Padding:num":"0","Window_ShopCommand_Padding:num":"0","Window_ShopBuy_Padding:num":"0","Window_ShopSell_Padding:num":"0","Window_NameInput_Padding:num":"0","Window_ChoiceList_Padding:num":"16","Window_EventItem_Padding:num":"0","Window_PartyCommand_Padding:num":"0","Window_ActorCommand_Padding:num":"0","Window_BattleStatus_Padding:num":"0","Window_BattleActor_Padding:num":"0","Window_BattleEnemy_Padding:num":"0","Window_BattleSkill_Padding:num":"0","Window_BattleItem_Padding:num":"0","Window_TitleCommand_Padding:num":"0","Window_GameEnd_Padding:num":"0","Window_DebugRange_Padding:num":"16","Window_DebugEdit_Padding:num":"16","Window_CommonEventMenuList_Padding:num":"0","Window_QuestCommand_Padding:num":"0","Window_QuestList_Padding:num":"16"}
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
 * MenuCursor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuCursor:
 *
 * @param type:str
 * @text Appearance Type
 * @parent Appearance
 * @type select
 * @option Icon - Uses an icon as the cursor
 * @value icon
 * @option Picture - Uses a file from img/pictures/ as the cursor
 * @value picture
 * @option System - Uses a file from img/system/ as the cursor
 * @value system
 * @desc Select the appearance type for the menu cursor.
 * @default icon
 *
 * @param iconIndex:num
 * @text Icon Index
 * @parent type:str
 * @desc If "icon" is selected as the appearance type,
 * use this icon as the cursor.
 * @default 112
 *
 * @param pictureFilename:str
 * @text Picture Filename
 * @parent type:str
 * @type file
 * @dir img/pictures/
 * @desc If "picture" is selected as the appearance type,
 * use this image from img/pictures/ as the cursor.
 * @default 
 *
 * @param systemFilename:str
 * @text System Filename
 * @parent type:str
 * @type file
 * @dir img/system/
 * @desc If "system" is selected as the appearance type,
 * use this image from img/system/ as the cursor.
 * @default 
 *
 * @param frameDelay:num
 * @text Frame Delay
 * @parent type:str
 * @desc The frame delay for any animated "picture" or "system"
 * cursors before moving onto the next frame.
 * @default 8
 * 
 * @param Anchor
 *
 * @param anchorX:str
 * @text Anchor X
 * @parent Anchor
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the position to determine where the cursor's
 * Anchor X is located.
 * @default center
 *
 * @param anchorY:str
 * @text Anchor Y
 * @parent Anchor
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the position to determine where the cursor's
 * Anchor Y is located.
 * @default top
 * 
 * @param Position
 *
 * @param positionX:str
 * @text Position X
 * @parent Position
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Select the placement to determine where the cursor's
 * Position X is located.
 * @default left
 *
 * @param positionY:str
 * @text Position Y
 * @parent Position
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @desc Select the placement to determine where the cursor's
 * Position Y is located.
 * @default middle
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Select how much to offset the cursor's X position by.
 * Negative numbers go left. Positive numbers go right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Select how much to offset the cursor's Y position by.
 * Negative numbers go up. Positive numbers go down.
 * @default +0
 * 
 * @param Wave
 *
 * @param waveType:str
 * @text Wave Type
 * @parent Wave
 * @type select
 * @option Horizontal - Cursor oscillates left and right
 * @value horz
 * @option Vertical - Cursor oscillates up and down
 * @value vert
 * @option None - Cursor does not oscillate.
 * @value none
 * @desc Determine how the cursor moves while active.
 * @default horz
 *
 * @param waveSpeed:num
 * @text Speed
 * @parent Wave
 * @desc Select how fast the cursor oscillates.
 * Lower is slower. Higher is faster.
 * @default 0.05
 *
 * @param waveDistance:num
 * @text Distance
 * @parent Wave
 * @type number
 * @desc Select how far the cursor sprite will oscillate from its origin.
 * @default 10
 *
 */
/* ----------------------------------------------------------------------------
 * Tiling Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tiling:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable background tiling?
 * @default false
 * 
 * @param Filename:str
 * @text Filename
 * @parent General
 * @type file
 * @dir img/parallaxes/
 * @desc Filename of the parallax used for the tiling effect.
 * Leave empty to not use a background tile.
 * @default StarlitSky
 * 
 * @param Appearance
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the tiling?
 * @default 0
 *
 * @param Buffer:num
 * @text Buffer
 * @parent Appearance
 * @type number
 * @desc How many pixels should be used to buffer the tiling?
 * @default 2
 *
 * @param ColorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the tiling?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @param Hue:num
 * @text Hue
 * @parent Appearance
 * @type number
 * @min 0
 * @max 360
 * @desc Do you wish to adjust this tiling's hue?
 * @default 0
 *
 * @param HueShift:num
 * @text Hue Shift
 * @parent Hue:num
 * @desc How much do you want the hue to shift each frame?
 * @default +0
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the opacity of the tiling effect?
 * @default 255
 *
 * @param ScrollX:num
 * @text Scroll X Speed
 * @parent Appearance
 * @desc How fast should the tile effect scroll horizontally?
 * 0 for no scroll. Negative values scroll the other way.
 * @default -1.25
 *
 * @param ScrollY:num
 * @text Scroll Y Speed
 * @parent Appearance
 * @desc How fast should the tile effect scroll vertically?
 * 0 for no scroll. Negative values scroll the other way.
 * @default +0.5
 *
 */
/* ----------------------------------------------------------------------------
 * Window Padding Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WindowPadding:
 *
 * @param AllWindows_Padding:num
 * @text All Windows
 * @type number
 * @desc How much extra item padding do you want for all windows?
 * @default 0
 *
 * @param Window_MenuCommand_Padding:num
 * @text Window_MenuCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_MenuStatus_Padding:num
 * @text Window_MenuStatus
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_MenuActor_Padding:num
 * @text Window_MenuActor
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ItemCategory_Padding:num
 * @text Window_ItemCategory
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ItemList_Padding:num
 * @text Window_ItemList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_SkillType_Padding:num
 * @text Window_SkillType
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_SkillList_Padding:num
 * @text Window_SkillList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_EquipCommand_Padding:num
 * @text Window_EquipCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_EquipSlot_Padding:num
 * @text Window_EquipSlot
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_EquipItem_Padding:num
 * @text Window_EquipItem
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_Options_Padding:num
 * @text Window_Options
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_SavefileList_Padding:num
 * @text Window_SavefileList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ShopCommand_Padding:num
 * @text Window_ShopCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ShopBuy_Padding:num
 * @text Window_ShopBuy
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ShopSell_Padding:num
 * @text Window_ShopSell
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_NameInput_Padding:num
 * @text Window_NameInput
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ChoiceList_Padding:num
 * @text Window_ChoiceList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_EventItem_Padding:num
 * @text Window_EventItem
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_PartyCommand_Padding:num
 * @text Window_PartyCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_ActorCommand_Padding:num
 * @text Window_ActorCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleStatus_Padding:num
 * @text Window_BattleStatus
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleActor_Padding:num
 * @text Window_BattleActor
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleEnemy_Padding:num
 * @text Window_BattleEnemy
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleSkill_Padding:num
 * @text Window_BattleSkill
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_BattleItem_Padding:num
 * @text Window_BattleItem
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_TitleCommand_Padding:num
 * @text Window_TitleCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_GameEnd_Padding:num
 * @text Window_GameEnd
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_DebugRange_Padding:num
 * @text Window_DebugRange
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_DebugEdit_Padding:num
 * @text Window_DebugEdit
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 * @param Window_CommonEventMenuList_Padding:num
 * @text Window_CommonEventMenuList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_QuestCommand_Padding:num
 * @text Window_QuestCommand
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 0
 *
 * @param Window_QuestList_Padding:num
 * @text Window_QuestList
 * @type number
 * @desc How much extra item padding do you want for this window?
 * @default 16
 *
 */
//=============================================================================

const _0xed40=['updateParentWindow','loadParallax','map','type','Settings','system','updateFrame','Dwmpf','Tiling','format','ScrollY','parent','_parentWindow','create','anchor','left','_menuCursorSprite','_frameIndex','parse','waveType','FlACy','parameters','_updateBackgroundTilingScroll','ConvertParams','6LXZcJC','createMenuCursor','WindowPadding','_scene','index','refreshMenuCursorChildren','initMembers','waveSpeed','initialize','updateAnchor','bind','waveDistance','none','Window_createCursorSprite','ColorTone','JSON','rxohu','NUM','includes','setFrame','picture','positionY','ScrollX','_menuCursorData','62DERseP','STRUCT','updateOpacity','frameCount','_cursorBgTiling','ARRAYNUM','ARRAYFUNC','updateScale','STR','setMenuCursor','push','max','middle','322409enJckZ','279352QMEmIm','9092PqMeRN','pictureFilename','Window_Base_itemPadding','updatePosition','AllWindows_ItemPadding','addChild','28cHeFvk','filters','menuCursor','ARRAYEVAL','setHue','call','exit','scale','offsetY','Window_Selectable_initialize','filter','HKerK','srUtl','_padding','round','4626vcvFfn','PfvPw','description','ttuxR','zTuPj','_settings','constructor','Opacity','_hue','center','isVisible','MenuCursorChangeSettings','bottom','name','width','_updateCursor','children','height','registerCommand','279613RquxIs','ARRAYJSON','origin','floor','trim','icon','_updateBackgroundTilingHueShift','_updateBackgroundTiling','Game_System_initialize','ujCAL','lLRVM','isMenuCursorBlacklisted','_updateBackgroundTilingDimensions','_createCursorSprite','HueShift','Hue','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','toUpperCase','initMenuCursorSettings','Buffer','itemPadding','positionX','removeChild','iconIndex','updateFrameIcon','gqSHO','anchorY','FUNC','_frameRows','opacity','systemFilename','Window_updateCursor','frameDelay','makeDeepCopy','_frameCols','MenuCursor','_colorFilter','_createBackgroundTiling','determineFrameColsRows','bitmap','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ABJLE','updateFrameColsRows','updateWave','prototype','%1_Padding','_clientArea','BTSbb','Filename','_cache','setParentWindow','match','return\x200','top','status','addLoadListener','_cursorSprite','ARRAYSTRUCT','_frameMax','move','Uhajv','loadBitmap','122080OWfwrO','15449QWVtrv','anchorX'];const _0x3df085=_0x179e;(function(_0x4b9e2b,_0x15c01e){const _0x497f26=_0x179e;while(!![]){try{const _0x21433a=-parseInt(_0x497f26(0x260))+parseInt(_0x497f26(0x20f))*parseInt(_0x497f26(0x1eb))+-parseInt(_0x497f26(0x1f8))+-parseInt(_0x497f26(0x222))+parseInt(_0x497f26(0x1f9))+-parseInt(_0x497f26(0x27b))*-parseInt(_0x497f26(0x261))+parseInt(_0x497f26(0x200))*parseInt(_0x497f26(0x1fa));if(_0x21433a===_0x15c01e)break;else _0x4b9e2b['push'](_0x4b9e2b['shift']());}catch(_0x32be10){_0x4b9e2b['push'](_0x4b9e2b['shift']());}}}(_0xed40,0x2e394));var label=_0x3df085(0x245),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3df085(0x20a)](function(_0x1edee6){const _0x505eb5=_0x3df085;return _0x1edee6[_0x505eb5(0x258)]&&_0x1edee6[_0x505eb5(0x211)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x3df085(0x267)]||{},VisuMZ[_0x3df085(0x27a)]=function(_0x5b2afc,_0x5e5e78){const _0x15a48c=_0x3df085;for(const _0x29b486 in _0x5e5e78){if(_0x15a48c(0x24b)!=='GJFLl'){if(_0x29b486[_0x15a48c(0x255)](/(.*):(.*)/i)){const _0x521424=String(RegExp['$1']),_0x3f30cf=String(RegExp['$2'])[_0x15a48c(0x233)]()[_0x15a48c(0x226)]();let _0x1ca0bd,_0x470a44,_0x3d3eb6;switch(_0x3f30cf){case _0x15a48c(0x1e4):_0x1ca0bd=_0x5e5e78[_0x29b486]!==''?Number(_0x5e5e78[_0x29b486]):0x0;break;case _0x15a48c(0x1f0):_0x470a44=_0x5e5e78[_0x29b486]!==''?JSON[_0x15a48c(0x275)](_0x5e5e78[_0x29b486]):[],_0x1ca0bd=_0x470a44[_0x15a48c(0x265)](_0x2aad6f=>Number(_0x2aad6f));break;case'EVAL':_0x1ca0bd=_0x5e5e78[_0x29b486]!==''?eval(_0x5e5e78[_0x29b486]):null;break;case _0x15a48c(0x203):_0x470a44=_0x5e5e78[_0x29b486]!==''?JSON[_0x15a48c(0x275)](_0x5e5e78[_0x29b486]):[],_0x1ca0bd=_0x470a44[_0x15a48c(0x265)](_0x3b4cb7=>eval(_0x3b4cb7));break;case _0x15a48c(0x1e2):_0x1ca0bd=_0x5e5e78[_0x29b486]!==''?JSON['parse'](_0x5e5e78[_0x29b486]):'';break;case _0x15a48c(0x223):_0x470a44=_0x5e5e78[_0x29b486]!==''?JSON['parse'](_0x5e5e78[_0x29b486]):[],_0x1ca0bd=_0x470a44['map'](_0x1f78ed=>JSON[_0x15a48c(0x275)](_0x1f78ed));break;case _0x15a48c(0x23d):_0x1ca0bd=_0x5e5e78[_0x29b486]!==''?new Function(JSON[_0x15a48c(0x275)](_0x5e5e78[_0x29b486])):new Function(_0x15a48c(0x256));break;case _0x15a48c(0x1f1):_0x470a44=_0x5e5e78[_0x29b486]!==''?JSON['parse'](_0x5e5e78[_0x29b486]):[],_0x1ca0bd=_0x470a44[_0x15a48c(0x265)](_0x132738=>new Function(JSON[_0x15a48c(0x275)](_0x132738)));break;case _0x15a48c(0x1f3):_0x1ca0bd=_0x5e5e78[_0x29b486]!==''?String(_0x5e5e78[_0x29b486]):'';break;case'ARRAYSTR':_0x470a44=_0x5e5e78[_0x29b486]!==''?JSON[_0x15a48c(0x275)](_0x5e5e78[_0x29b486]):[],_0x1ca0bd=_0x470a44[_0x15a48c(0x265)](_0x492919=>String(_0x492919));break;case _0x15a48c(0x1ec):_0x3d3eb6=_0x5e5e78[_0x29b486]!==''?JSON['parse'](_0x5e5e78[_0x29b486]):{},_0x1ca0bd=VisuMZ[_0x15a48c(0x27a)]({},_0x3d3eb6);break;case _0x15a48c(0x25b):_0x470a44=_0x5e5e78[_0x29b486]!==''?JSON['parse'](_0x5e5e78[_0x29b486]):[],_0x1ca0bd=_0x470a44['map'](_0x541d1c=>VisuMZ['ConvertParams']({},JSON['parse'](_0x541d1c)));break;default:continue;}_0x5b2afc[_0x521424]=_0x1ca0bd;}}else{if(_0x2f1fb8[_0x15a48c(0x1ee)]%this[_0x15a48c(0x214)]['frameDelay']>0x0)return;}}return _0x5b2afc;},(_0x4f80bc=>{const _0x570375=_0x3df085,_0x18530c=_0x4f80bc[_0x570375(0x21c)];for(const _0x5204f0 of dependencies){if(!Imported[_0x5204f0]){if(_0x570375(0x1e3)!==_0x570375(0x213)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x570375(0x26c)](_0x18530c,_0x5204f0)),SceneManager[_0x570375(0x206)]();break;}else this[_0x570375(0x214)]=_0x2bfe6e[_0x570375(0x202)](),this[_0x570375(0x1dc)](),this[_0x570375(0x25f)]();}}const _0xfaf581=_0x4f80bc['description'];if(_0xfaf581[_0x570375(0x255)](/\[Version[ ](.*?)\]/i)){const _0x35a1cb=Number(RegExp['$1']);_0x35a1cb!==VisuMZ[label]['version']&&(alert(_0x570375(0x24a)['format'](_0x18530c,_0x35a1cb)),SceneManager[_0x570375(0x206)]());}if(_0xfaf581[_0x570375(0x255)](/\[Tier[ ](\d+)\]/i)){if('fzEFL'===_0x570375(0x22c))_0x12da32[_0x570375(0x255)](/\[(\d+)x(\d+)\]/i)?(this['_frameCols']=_0x2e61ca['max'](0x1,_0x4bc6a3(_0x1447a0['$1'])),this[_0x570375(0x23e)]=_0x2eab0e[_0x570375(0x1f6)](0x1,_0x59c9cd(_0x138335['$2']))):(this[_0x570375(0x244)]=0x1,this['_frameRows']=0x1),this[_0x570375(0x25c)]=this[_0x570375(0x244)]*this[_0x570375(0x23e)];else{const _0x3fbfd6=Number(RegExp['$1']);_0x3fbfd6<tier?(alert(_0x570375(0x232)[_0x570375(0x26c)](_0x18530c,_0x3fbfd6,tier)),SceneManager[_0x570375(0x206)]()):tier=Math[_0x570375(0x1f6)](_0x3fbfd6,tier);}}VisuMZ[_0x570375(0x27a)](VisuMZ[label][_0x570375(0x267)],_0x4f80bc[_0x570375(0x278)]);})(pluginData),PluginManager[_0x3df085(0x221)](pluginData[_0x3df085(0x21c)],_0x3df085(0x21a),_0x2cbfe4=>{const _0x213142=_0x3df085;VisuMZ['ConvertParams'](_0x2cbfe4,_0x2cbfe4);const _0x1658ca=JsonEx[_0x213142(0x243)](_0x2cbfe4);$gameSystem[_0x213142(0x1f4)](_0x1658ca);}),VisuMZ[_0x3df085(0x245)][_0x3df085(0x22a)]=Game_System['prototype'][_0x3df085(0x1db)],Game_System[_0x3df085(0x24e)][_0x3df085(0x1db)]=function(){const _0x59e0ae=_0x3df085;VisuMZ[_0x59e0ae(0x245)][_0x59e0ae(0x22a)][_0x59e0ae(0x205)](this),this[_0x59e0ae(0x234)]();},Game_System[_0x3df085(0x24e)][_0x3df085(0x234)]=function(){const _0x36e2fe=_0x3df085;this['_menuCursorData']=JsonEx[_0x36e2fe(0x243)](VisuMZ[_0x36e2fe(0x245)]['Settings'][_0x36e2fe(0x245)]);},Game_System[_0x3df085(0x24e)][_0x3df085(0x202)]=function(){const _0x37d185=_0x3df085;if(this[_0x37d185(0x1ea)]===undefined)this['initMenuCursorSettings']();return this['_menuCursorData'];},Game_System[_0x3df085(0x24e)][_0x3df085(0x1f4)]=function(_0x3c7398){const _0x258d50=_0x3df085;this[_0x258d50(0x1ea)]=_0x3c7398,this[_0x258d50(0x1d8)](SceneManager[_0x258d50(0x1d6)]);},Game_System['prototype'][_0x3df085(0x1d8)]=function(_0x98aa34){const _0x563815=_0x3df085;if(!_0x98aa34)return;_0x98aa34[_0x563815(0x27c)]&&_0x98aa34[_0x563815(0x27c)]();if(_0x98aa34['children']){if(_0x563815(0x26a)===_0x563815(0x26a))for(const _0x43c167 of _0x98aa34[_0x563815(0x21f)]){'gqSHO'===_0x563815(0x23b)?$gameSystem['refreshMenuCursorChildren'](_0x43c167):(this[_0x563815(0x26f)]=null,this[_0x563815(0x214)]=null,this[_0x563815(0x274)]=0x0,this[_0x563815(0x244)]=0x1,this[_0x563815(0x23e)]=0x1,this[_0x563815(0x25c)]=0x1,this[_0x563815(0x253)]={'scale':{'x':0x1,'y':0x1}},this[_0x563815(0x23f)]=0x0);}else{if(this[_0x563815(0x26f)]['constructor']===_0x294a08)_0x3fd6f7['log'](this[_0x563815(0x25a)]);this[_0x563815(0x23f)]=0x0;return;}}};function _0x179e(_0x58a4f5,_0x58b3fa){return _0x179e=function(_0xed402b,_0x179e9e){_0xed402b=_0xed402b-0x1d5;let _0x3d3d15=_0xed40[_0xed402b];return _0x3d3d15;},_0x179e(_0x58a4f5,_0x58b3fa);}function Sprite_MenuCursor(){const _0x90aa23=_0x3df085;this[_0x90aa23(0x1db)](...arguments);}Sprite_MenuCursor[_0x3df085(0x24e)]=Object[_0x3df085(0x270)](Sprite[_0x3df085(0x24e)]),Sprite_MenuCursor[_0x3df085(0x24e)]['constructor']=Sprite_MenuCursor,Sprite_MenuCursor['prototype']['initialize']=function(){const _0xfcbd9f=_0x3df085;Sprite[_0xfcbd9f(0x24e)][_0xfcbd9f(0x1db)]['call'](this),this[_0xfcbd9f(0x1d9)]();},Sprite_MenuCursor[_0x3df085(0x24e)][_0x3df085(0x1d9)]=function(){const _0x96bf8b=_0x3df085;this['_parentWindow']=null,this[_0x96bf8b(0x214)]=null,this[_0x96bf8b(0x274)]=0x0,this[_0x96bf8b(0x244)]=0x1,this[_0x96bf8b(0x23e)]=0x1,this[_0x96bf8b(0x25c)]=0x1,this[_0x96bf8b(0x253)]={'scale':{'x':0x1,'y':0x1}},this[_0x96bf8b(0x23f)]=0x0;},Sprite_MenuCursor[_0x3df085(0x24e)][_0x3df085(0x254)]=function(_0x153246){const _0x512702=_0x3df085;if(this[_0x512702(0x26f)]===_0x153246)return;this[_0x512702(0x26f)]=_0x153246,this[_0x512702(0x26f)]?_0x512702(0x25e)!=='Uhajv'?(this['_menuCursorData']=_0x44cd51,this[_0x512702(0x1d8)](_0x174fa8[_0x512702(0x1d6)])):this[_0x512702(0x263)]():this[_0x512702(0x214)]=null;},Sprite_MenuCursor[_0x3df085(0x24e)]['updateParentWindow']=function(){const _0x526d2d=_0x3df085;this[_0x526d2d(0x214)]=$gameSystem[_0x526d2d(0x202)](),this[_0x526d2d(0x1dc)](),this[_0x526d2d(0x25f)]();},Sprite_MenuCursor[_0x3df085(0x24e)][_0x3df085(0x1dc)]=function(){const _0x30c7df=_0x3df085;switch(this[_0x30c7df(0x214)][_0x30c7df(0x262)]){case _0x30c7df(0x272):this[_0x30c7df(0x271)]['x']=0x0;break;case _0x30c7df(0x218):this[_0x30c7df(0x271)]['x']=0.5;break;case'right':this['anchor']['x']=0x1;break;}switch(this[_0x30c7df(0x214)][_0x30c7df(0x23c)]){case'top':this[_0x30c7df(0x271)]['y']=0x0;break;case _0x30c7df(0x1f7):this['anchor']['y']=0.5;break;case _0x30c7df(0x21b):this[_0x30c7df(0x271)]['y']=0x1;break;}},Sprite_MenuCursor[_0x3df085(0x24e)][_0x3df085(0x25f)]=function(){const _0x570602=_0x3df085;if(!this['_settings'])return;switch(this[_0x570602(0x214)][_0x570602(0x266)]){case'icon':this['bitmap']=ImageManager['loadSystem']('IconSet');break;case _0x570602(0x1e7):this[_0x570602(0x249)]=ImageManager['loadPicture'](this[_0x570602(0x214)][_0x570602(0x1fb)]),this[_0x570602(0x248)](this['_settings']['pictureFilename']);break;case'system':this['bitmap']=ImageManager['loadSystem'](this['_settings']['systemFilename']),this['determineFrameColsRows'](this[_0x570602(0x214)][_0x570602(0x240)]);break;}this[_0x570602(0x274)]=0x0,this['bitmap'][_0x570602(0x259)](this[_0x570602(0x269)][_0x570602(0x1dd)](this,!![]));},Sprite_MenuCursor[_0x3df085(0x24e)][_0x3df085(0x248)]=function(_0x57dbc8){const _0x34ab12=_0x3df085;_0x57dbc8[_0x34ab12(0x255)](/\[(\d+)x(\d+)\]/i)?(this['_frameCols']=Math[_0x34ab12(0x1f6)](0x1,Number(RegExp['$1'])),this[_0x34ab12(0x23e)]=Math[_0x34ab12(0x1f6)](0x1,Number(RegExp['$2']))):'rruai'!==_0x34ab12(0x210)?(this['_frameCols']=0x1,this['_frameRows']=0x1):(this['removeChild'](this[_0x34ab12(0x273)]),delete this[_0x34ab12(0x273)]),this['_frameMax']=this[_0x34ab12(0x244)]*this[_0x34ab12(0x23e)];},Sprite_MenuCursor[_0x3df085(0x24e)]['update']=function(){const _0x554201=_0x3df085;Sprite['prototype']['update'][_0x554201(0x205)](this);if(this['_parentWindow']&&this[_0x554201(0x249)]&&this[_0x554201(0x249)][_0x554201(0x21d)]>0x0)_0x554201(0x22b)!==_0x554201(0x20b)?(this[_0x554201(0x1ed)](),this['updateScale'](),this[_0x554201(0x269)](),this[_0x554201(0x1fd)](),this[_0x554201(0x24d)]()):_0x7f70b9=_0x4696a4[_0x554201(0x1f6)](_0x386e81,_0x477cee);else{if(_0x554201(0x212)!==_0x554201(0x277))this[_0x554201(0x23f)]=0x0;else{if(!this['parent'])return;if(this[_0x554201(0x23f)]<=0x0)return;if(this['_cache'][_0x554201(0x207)]['x']===this[_0x554201(0x26e)][_0x554201(0x207)]['x']&&this['_cache'][_0x554201(0x207)]['y']===this[_0x554201(0x26e)]['scale']['y'])return;this[_0x554201(0x207)]['x']=0x1/this[_0x554201(0x26e)]['scale']['x'],this['scale']['y']=0x1/this[_0x554201(0x26e)][_0x554201(0x207)]['y'],this[_0x554201(0x253)][_0x554201(0x207)]['x']=this['parent'][_0x554201(0x207)]['x'],this[_0x554201(0x253)][_0x554201(0x207)]['y']=this['parent']['scale']['y'];}}},Sprite_MenuCursor[_0x3df085(0x24e)][_0x3df085(0x1ed)]=function(){const _0x58e7bb=_0x3df085;this[_0x58e7bb(0x23f)]=this[_0x58e7bb(0x219)]()?0xff:0x0;},Sprite_MenuCursor[_0x3df085(0x24e)][_0x3df085(0x219)]=function(){const _0x34f891=_0x3df085,_0xbd62a0=this[_0x34f891(0x26f)];if(!_0xbd62a0)return![];if(!_0xbd62a0['active'])return![];if(_0xbd62a0[_0x34f891(0x1d7)]()<0x0)return![];return!![];},Sprite_MenuCursor[_0x3df085(0x24e)][_0x3df085(0x1f2)]=function(){const _0x23b9fa=_0x3df085;if(!this['parent'])return;if(this[_0x23b9fa(0x23f)]<=0x0)return;if(this['_cache']['scale']['x']===this[_0x23b9fa(0x26e)][_0x23b9fa(0x207)]['x']&&this[_0x23b9fa(0x253)][_0x23b9fa(0x207)]['y']===this['parent']['scale']['y'])return;this['scale']['x']=0x1/this[_0x23b9fa(0x26e)]['scale']['x'],this[_0x23b9fa(0x207)]['y']=0x1/this[_0x23b9fa(0x26e)][_0x23b9fa(0x207)]['y'],this[_0x23b9fa(0x253)][_0x23b9fa(0x207)]['x']=this['parent'][_0x23b9fa(0x207)]['x'],this[_0x23b9fa(0x253)][_0x23b9fa(0x207)]['y']=this[_0x23b9fa(0x26e)][_0x23b9fa(0x207)]['y'];},Sprite_MenuCursor[_0x3df085(0x24e)][_0x3df085(0x269)]=function(_0x226080){const _0x4a7917=_0x3df085;if(!_0x226080){if(Graphics[_0x4a7917(0x1ee)]%this['_settings'][_0x4a7917(0x242)]>0x0)return;}switch(this[_0x4a7917(0x214)][_0x4a7917(0x266)]){case _0x4a7917(0x227):this[_0x4a7917(0x23a)]();break;case'picture':case _0x4a7917(0x268):this[_0x4a7917(0x24c)]();break;};},Sprite_MenuCursor['prototype']['updateFrameIcon']=function(){const _0x19f1a8=_0x3df085,_0x5bc7b4=this[_0x19f1a8(0x214)][_0x19f1a8(0x239)],_0x49990e=ImageManager['iconWidth'],_0x17935d=ImageManager['iconHeight'],_0x158956=_0x5bc7b4%0x10*_0x49990e,_0x14f10e=Math[_0x19f1a8(0x225)](_0x5bc7b4/0x10)*_0x17935d;this[_0x19f1a8(0x1e6)](_0x158956,_0x14f10e,_0x49990e,_0x17935d);},Sprite_MenuCursor[_0x3df085(0x24e)][_0x3df085(0x24c)]=function(){const _0x18f3d4=_0x3df085;this['_frameIndex']++;if(this[_0x18f3d4(0x274)]>=this[_0x18f3d4(0x25c)])this[_0x18f3d4(0x274)]=0x0;var _0x26c903=this['bitmap'][_0x18f3d4(0x21d)]/this[_0x18f3d4(0x244)],_0x1b3d9e=this[_0x18f3d4(0x249)]['height']/this[_0x18f3d4(0x23e)],_0x3f9c6c=this['_frameIndex']%this['_frameCols']*_0x26c903,_0x44f650=Math[_0x18f3d4(0x225)](this['_frameIndex']/this[_0x18f3d4(0x244)])*_0x1b3d9e;this[_0x18f3d4(0x1e6)](_0x3f9c6c,_0x44f650,_0x26c903,_0x1b3d9e);},Sprite_MenuCursor['prototype']['updatePosition']=function(){const _0x4156cf=_0x3df085;if(!this['parent'])return;if(!this[_0x4156cf(0x26f)])return;const _0x99f8e7=this[_0x4156cf(0x26f)][_0x4156cf(0x25a)];if(!_0x99f8e7){if(this[_0x4156cf(0x26f)][_0x4156cf(0x215)]===Window_MenuCommand)console['log'](this['_cursorSprite']);this[_0x4156cf(0x23f)]=0x0;return;}const _0x138bd8=_0x99f8e7[_0x4156cf(0x21d)],_0x601a8=_0x99f8e7[_0x4156cf(0x220)],_0x12af61=this[_0x4156cf(0x26f)][_0x4156cf(0x250)],_0xf04a92=this[_0x4156cf(0x26f)][_0x4156cf(0x20d)];switch(this['_settings'][_0x4156cf(0x237)]){case'left':this['x']=_0x99f8e7['x'];break;case _0x4156cf(0x218):this['x']=_0x99f8e7['x']+Math[_0x4156cf(0x20e)](_0x138bd8/0x2);break;case'right':this['x']=_0x99f8e7['x']+_0x138bd8;break;}switch(this[_0x4156cf(0x214)][_0x4156cf(0x1e8)]){case _0x4156cf(0x257):this['y']=_0x99f8e7['y'];break;case _0x4156cf(0x1f7):this['y']=_0x99f8e7['y']+Math[_0x4156cf(0x20e)](_0x601a8/0x2);break;case'bottom':this['y']=_0x99f8e7['y']+_0x601a8;break;}this['x']+=_0x12af61['x'],this['y']+=_0x12af61['y'],this['x']+=this[_0x4156cf(0x214)]['offsetX'],this['y']+=this[_0x4156cf(0x214)][_0x4156cf(0x208)],this['x']=this['x']['clamp'](_0xf04a92,this[_0x4156cf(0x26f)][_0x4156cf(0x21d)]-_0xf04a92),this['y']=this['y']['clamp'](_0xf04a92,this[_0x4156cf(0x26f)][_0x4156cf(0x220)]-_0xf04a92);},Sprite_MenuCursor[_0x3df085(0x24e)][_0x3df085(0x24d)]=function(){const _0x4b2739=_0x3df085,_0x1b19ed=this['_settings'][_0x4b2739(0x276)];if(_0x1b19ed===_0x4b2739(0x1df))return;if(this['_settings']['waveDistance']<=0x0)return;const _0x55323f=this['_settings'][_0x4b2739(0x1de)],_0x1d5889=this[_0x4b2739(0x214)][_0x4b2739(0x1da)],_0x5e3bfe=Math[_0x4b2739(0x20e)](Math['cos'](Graphics[_0x4b2739(0x1ee)]*_0x1d5889)*_0x55323f);if(_0x1b19ed==='horz')this['x']+=_0x5e3bfe;else _0x1b19ed==='vert'&&(this['y']+=_0x5e3bfe);},VisuMZ[_0x3df085(0x245)][_0x3df085(0x1fc)]=Window_Base['prototype'][_0x3df085(0x236)],Window_Base[_0x3df085(0x24e)][_0x3df085(0x236)]=function(){const _0x3ec280=_0x3df085,_0x41c530=VisuMZ[_0x3ec280(0x245)][_0x3ec280(0x267)][_0x3ec280(0x1d5)];let _0x5b60b6=_0x41c530[_0x3ec280(0x1fe)]||0x0;return _0x5b60b6+=_0x41c530[_0x3ec280(0x24f)[_0x3ec280(0x26c)](this[_0x3ec280(0x215)][_0x3ec280(0x21c)])]||0x0,VisuMZ[_0x3ec280(0x245)][_0x3ec280(0x1fc)][_0x3ec280(0x205)](this)+_0x5b60b6;},VisuMZ[_0x3df085(0x245)][_0x3df085(0x1e0)]=Window[_0x3df085(0x24e)][_0x3df085(0x22f)],Window[_0x3df085(0x24e)]['_createCursorSprite']=function(){const _0x52e764=_0x3df085;VisuMZ[_0x52e764(0x245)][_0x52e764(0x1e0)][_0x52e764(0x205)](this),this[_0x52e764(0x247)]();},Window[_0x3df085(0x24e)][_0x3df085(0x247)]=function(){const _0x226e65=_0x3df085,_0x3cc6a6=VisuMZ[_0x226e65(0x245)][_0x226e65(0x267)][_0x226e65(0x26b)];if(!_0x3cc6a6)return;if(!_0x3cc6a6['Enable'])return;if(_0x3cc6a6[_0x226e65(0x252)]==='')return;this[_0x226e65(0x1ef)]=new TilingSprite(),this[_0x226e65(0x1ef)][_0x226e65(0x249)]=ImageManager[_0x226e65(0x264)](_0x3cc6a6[_0x226e65(0x252)]),this['_clientArea'][_0x226e65(0x1ff)](this[_0x226e65(0x1ef)]),this[_0x226e65(0x1ef)][_0x226e65(0x201)]=this[_0x226e65(0x1ef)][_0x226e65(0x201)]||[],this[_0x226e65(0x1ef)][_0x226e65(0x246)]=new ColorFilter(),this['_cursorBgTiling'][_0x226e65(0x201)][_0x226e65(0x1f5)](this[_0x226e65(0x1ef)][_0x226e65(0x246)]),this[_0x226e65(0x1ef)]['blendMode']=_0x3cc6a6['BlendMode'],this[_0x226e65(0x1ef)][_0x226e65(0x23f)]=_0x3cc6a6[_0x226e65(0x216)],this[_0x226e65(0x1ef)][_0x226e65(0x246)]['_hue']=_0x3cc6a6[_0x226e65(0x231)]||0x0,this[_0x226e65(0x1ef)]['_colorFilter']['setHue'](_0x3cc6a6[_0x226e65(0x231)]||0x0),this[_0x226e65(0x1ef)][_0x226e65(0x246)]['setColorTone'](_0x3cc6a6[_0x226e65(0x1e1)]||[0x0,0x0,0x0,0x0]);},VisuMZ[_0x3df085(0x245)][_0x3df085(0x241)]=Window[_0x3df085(0x24e)]['_updateCursor'],Window[_0x3df085(0x24e)][_0x3df085(0x21e)]=function(){const _0x29cf39=_0x3df085;VisuMZ[_0x29cf39(0x245)][_0x29cf39(0x241)]['call'](this),this['_updateBackgroundTiling']();},Window[_0x3df085(0x24e)][_0x3df085(0x229)]=function(){const _0x4128d5=_0x3df085;if(!this[_0x4128d5(0x1ef)])return;this['_updateBackgroundTilingDimensions'](),this['_updateBackgroundTilingScroll'](),this[_0x4128d5(0x228)]();},Window['prototype'][_0x3df085(0x22e)]=function(){const _0x3d7c6a=_0x3df085,_0x3db380=VisuMZ[_0x3d7c6a(0x245)][_0x3d7c6a(0x267)][_0x3d7c6a(0x26b)];if(!_0x3db380)return;const _0x3e2490=this[_0x3d7c6a(0x25a)],_0x3c34e8=this[_0x3d7c6a(0x1ef)],_0x471276=_0x3db380[_0x3d7c6a(0x235)];_0x3c34e8[_0x3d7c6a(0x25d)](_0x3e2490['x']+_0x471276,_0x3e2490['y']+_0x471276,Math[_0x3d7c6a(0x1f6)](_0x3e2490[_0x3d7c6a(0x21d)]-_0x471276*0x2,0x0),Math[_0x3d7c6a(0x1f6)](_0x3e2490[_0x3d7c6a(0x220)]-_0x471276*0x2,0x0));},Window[_0x3df085(0x24e)][_0x3df085(0x279)]=function(){const _0x2baf87=_0x3df085;if(!this['active'])return;const _0x69f645=VisuMZ[_0x2baf87(0x245)][_0x2baf87(0x267)][_0x2baf87(0x26b)];if(!_0x69f645)return;const _0x4cd16a=this[_0x2baf87(0x1ef)];_0x4cd16a[_0x2baf87(0x224)]['x']+=_0x69f645[_0x2baf87(0x1e9)],_0x4cd16a[_0x2baf87(0x224)]['y']+=_0x69f645[_0x2baf87(0x26d)];},Window[_0x3df085(0x24e)][_0x3df085(0x228)]=function(){const _0x36782b=_0x3df085;if(!this['active'])return;const _0xae4301=VisuMZ[_0x36782b(0x245)]['Settings'][_0x36782b(0x26b)];if(!_0xae4301)return;this[_0x36782b(0x1ef)][_0x36782b(0x246)]['_hue']+=_0xae4301[_0x36782b(0x230)],this[_0x36782b(0x1ef)][_0x36782b(0x246)][_0x36782b(0x204)](this[_0x36782b(0x1ef)][_0x36782b(0x246)][_0x36782b(0x217)]);},VisuMZ[_0x3df085(0x245)][_0x3df085(0x209)]=Window_Selectable['prototype'][_0x3df085(0x1db)],Window_Selectable[_0x3df085(0x24e)][_0x3df085(0x1db)]=function(_0x14bc95){const _0x533c8a=_0x3df085;VisuMZ[_0x533c8a(0x245)][_0x533c8a(0x209)][_0x533c8a(0x205)](this,_0x14bc95),this[_0x533c8a(0x27c)]();},Window_Selectable['prototype'][_0x3df085(0x27c)]=function(){const _0x342bba=_0x3df085;if(this[_0x342bba(0x22d)]())return;this[_0x342bba(0x273)]&&(this[_0x342bba(0x238)](this['_menuCursorSprite']),delete this[_0x342bba(0x273)]),this[_0x342bba(0x273)]=new Sprite_MenuCursor(),this[_0x342bba(0x1ff)](this[_0x342bba(0x273)]),this[_0x342bba(0x273)][_0x342bba(0x254)](this);},Window_Selectable[_0x3df085(0x24e)][_0x3df085(0x22d)]=function(){const _0x12fa80=_0x3df085,_0x2a2ec3=VisuMZ[_0x12fa80(0x245)][_0x12fa80(0x267)]['CursorBlacklist']||[];return _0x2a2ec3[_0x12fa80(0x1e5)](this[_0x12fa80(0x215)][_0x12fa80(0x21c)]);},Window_NumberInput[_0x3df085(0x24e)]['itemPadding']=function(){const _0x41099c=_0x3df085;try{if(_0x41099c(0x20c)!==_0x41099c(0x251))return VisuMZ[_0x41099c(0x245)][_0x41099c(0x1fc)]['call'](this);else _0x272710[_0x41099c(0x24e)][_0x41099c(0x1db)][_0x41099c(0x205)](this),this[_0x41099c(0x1d9)]();}catch(_0x3d1226){return 0x8;}};