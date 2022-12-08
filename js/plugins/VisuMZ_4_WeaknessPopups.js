//=============================================================================
// VisuStella MZ - Weakness Popups
// VisuMZ_4_WeaknessPopups.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_WeaknessPopups = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaknessPopups = VisuMZ.WeaknessPopups || {};
VisuMZ.WeaknessPopups.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.05] [WeaknessPopups]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weakness_Popups_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * When striking enemies with elemental attacks, it's difficult for the player
 * to know at first glance if he or she has hit a weakness or resistance,
 * especially if they are unfamiliar with how much damage the enemy should take
 * normally. This plugin creates popups that appear upon being hit at various
 * elemental rates, from 200% to 101% for Weaknesses, 99% to 1% for resistance,
 * 0% for immunity, and under that for absorption.
 * 
 * Critical hits also gain an extra popup effect to indicate landing a critical
 * hit in case they've missed the extra flash that comes with one by default.
 * This plugin helps relay information to the player in a more visible form.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create popups that appear in battle whenever battlers take elemental
 *   damage that results in weaknesses, resistances, immunities, or absorption.
 * * Critical hits will also generate popups.
 * * Popups can use images or generate bitmap text on the spot.
 * * Move the popups through various means like scaling and acceleration.
 * * Elemental rates can generate different popups depending on the rate.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 *
 * If you decide to use front view with the VisuStella MZ Battle Core, Weakness
 * Popups will show up for actors above the Battle Status Window. Normally,
 * they would not appear in front view without the Battle Core because normal
 * damage popups don't appear there either.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popups are created from a similar template. These are used for Critical Hits
 * and Elemental Rates. The Critical Hit popups will only appear once critical
 * hits are applied in battle. Elemental Rate popups will only appear once
 * certain damage thresholds are met through the element rate calculations.
 *
 * ---
 *
 * General
 * 
 *   Enabled:
 *   - Is this popup enabled?
 *
 * ---
 *
 * Custom Image
 * 
 *   Filename:
 *   - Select an image from img/system/ to use as a custom image popup.
 *   - If you use this, ignore the Render settings.
 *
 * ---
 *
 * Render
 * 
 *   Text:
 *   - Type in the text you want displayed for the popup.
 * 
 *   Bitmap Width:
 *   Bitmap Height:
 *   - What is the maximum width/height of this popup?
 * 
 *   Font Name:
 *   - What font do you wish to use for this popup?
 * 
 *   Font Size:
 *   - What's the font size to use for the popup text?
 * 
 *   Bold?:
 *   Italic?
 *   - Do you wish to make the text bold/italic?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Outline Size:
 *   - What size do you want to use for the outline?
 * 
 *   Outline Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Offset
 * 
 *   Offset: X:
 *   Offset: Y:
 *   - How much do you wish to offset the X/Y position by?
 * 
 *   Variance:
 *   - How much variance should be given to offset X?
 *
 * ---
 *
 * Scale
 * 
 *   Duration:
 *   - How many frames should it take the scaling to reach the target scale?
 * 
 *   Starting Scale: X:
 *   Starting Scale: Y:
 *   - What scale X/Y value should the popup start at?
 * 
 *   Target Scale: X:
 *   Target Scale: Y:
 *   - What scale X/Y value should the popup end at?
 *
 * ---
 *
 * Acceleration
 * 
 *   Starting Speed: X:
 *   Starting Speed: Y:
 *   - How much should the starting X/Y speed of the popup be?
 * 
 *   Delta Speed: X:
 *   Delta Speed: Y:
 *   - How much should the growing X/Y speed of the popup be?
 *
 * ---
 *
 * Fading
 * 
 *   Opaque Duration:
 *   - How many frames should the popup stay opaque?
 * 
 *   Fade Duration:
 *   - After the opaque duration wears off, how many frames will it take for
 *     the popup to vanish?
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
 * Version 1.05: December 30, 2021
 * * Bug Fixes!
 * ** Corrected a bug that caused 0 damage/healing when this plugin is on.
 *    Fix made by Olivia.
 * 
 * Version 1.04: December 23, 2021
 * * Compatibility Update!
 * ** Weakness Popups now ignore the notetags involving caster element damage
 *    when calculating the type of popup to display. Update made by Olivia.
 * 
 * Version 1.03: June 4, 2021
 * * Compatibility Update!
 * ** Added automatic offset for those using UI Areas and Widths with different
 *    values from their screen resolutions once the Action Sequence Camera
 *    plugin is enabled. Update made by Irina.
 * 
 * Version 1.02: March 5, 2021
 * * Bug Fixes!
 * ** Weakness Popups for front view actors will no longer appear at the top
 *    of the screen. Fix made by Irina.
 * ** Weakness Popups will no longer shift positions prior to an actor's status
 *    window positioning anchor. Fix made by Irina.
 * * Documentation Update!
 * ** Added "Extra Features" section for more clarity on what having the Battle
 *    Core enables for Front View games.
 * 
 * Version 1.01: January 1, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** Plugin Parameters for the Popup Settings now have a Variance factor for
 *    Offset X and Offset Y. Added by Yanfly.
 *
 * Version 1.00: November 27, 2020
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
 * @param WeaknessPopups
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Critical
 *
 * @param Critical:struct
 * @text Critical Popup Settings
 * @parent Critical
 * @type struct<Popup>
 * @desc Settings for the Critical Popup!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"CRITICAL!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ec008c","outlineSize:num":"5","outlineColor:str":"rgba(255, 255, 255, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"-25","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 * 
 * @param Element
 * @text Element Rates
 *
 * @param Element200:struct
 * @text Rate >= 200%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 200%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element175:struct
 * @text Rate >= 175%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 150%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element150:struct
 * @text Rate >= 150%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 150%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element125:struct
 * @text Rate >= 125%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 125%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element110:struct
 * @text Rate >= 110%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 110%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element105:struct
 * @text Rate >= 105%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 105%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element101:struct
 * @text Rate >= 101%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 105%!
 * @default {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element99:struct
 * @text Rate <= 99%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 95%!
 * @default {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element95:struct
 * @text Rate <= 95%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 95%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element90:struct
 * @text Rate <= 90%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 90%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element75:struct
 * @text Rate <= 75%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 75%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element50:struct
 * @text Rate <= 50%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 50%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element25:struct
 * @text Rate <= 25%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 25%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element0:struct
 * @text Rate = 0%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is exactly 0%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"IMMUNE!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#6dcff6","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param ElementNegative:struct
 * @text Rate < 0%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is under 0%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"ABSORB!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#bd8cbf","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
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
 * Popup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Enabled
 * @parent General
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Is this popup enabled?
 * @default true
 *
 * @param Image
 * @text Custom Image
 *
 * @param filename:str
 * @text Filename
 * @parent Image
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Select an image from img/system/ to use as a custom image
 * popup. If you use this, ignore the Render settings.
 * @default 
 *
 * @param Render
 *
 * @param text:str
 * @text Text
 * @parent Render
 * @desc Type in the text you want displayed for the popup.
 * @default Text!
 *
 * @param bitmapWidth:num
 * @text Bitmap Width
 * @parent Render
 * @type number
 * @min 1
 * @desc What is the maximum width of this popup?
 * @default 600
 *
 * @param bitmapHeight:num
 * @text Bitmap Height
 * @parent Render
 * @type number
 * @min 1
 * @desc What is the maximum height of this popup?
 * @default 200
 *
 * @param fontFace:str
 * @text Font Name
 * @parent Render
 * @desc What font do you wish to use for this popup?
 * @default Impact
 *
 * @param fontSize:num
 * @text Font Size
 * @parent fontFace:str
 * @type number
 * @min 1
 * @desc What's the font size to use for the popup text?
 * @default 48
 *
 * @param fontBold:eval
 * @text Bold?
 * @parent fontFace:str
 * @type boolean
 * @on Bold
 * @off Normal
 * @desc Do you wish to make the text bold?
 * @default true
 *
 * @param fontItalic:eval
 * @text Italic?
 * @parent fontFace:str
 * @type boolean
 * @on Italic
 * @off Normal
 * @desc Do you wish to make the text italic?
 * @default false
 *
 * @param textColor:str
 * @text Text Color
 * @parent Render
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param outlineSize:num
 * @text Outline Size
 * @parent Render
 * @type number
 * @min 0
 * @desc What size do you want to use for the outline?
 * @default 5
 *
 * @param outlineColor:str
 * @text Outline Color
 * @parent outlineSize:num
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1)
 *
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset: X
 * @parent Offset
 * @desc How much do you wish to offset the X position by?
 * @default 0
 *
 * @param offsetXvariance:num
 * @text Variance
 * @type number
 * @parent offsetX:num
 * @desc How much variance should be given to offset X?
 * @default 0
 *
 * @param offsetY:num
 * @text Offset: Y
 * @parent Offset
 * @desc How much do you wish to offset the Y position by?
 * @default 0
 *
 * @param offsetYvariance:num
 * @text Variance
 * @type number
 * @parent offsetY:num
 * @desc How much variance should be given to offset Y?
 * @default 0
 *
 * @param Scale
 *
 * @param scaleDuration:num
 * @text Duration
 * @parent Scale
 * @type number
 * @min 1
 * @desc How many frames should it take the scaling to reach the target scale?
 * @default 20
 *
 * @param startScaleX:num
 * @text Starting Scale: X
 * @parent Scale
 * @desc What scale X value should the popup start at?
 * @default 2.0
 *
 * @param startScaleY:num
 * @text Starting Scale: Y
 * @parent Scale
 * @desc What scale Y value should the popup start at?
 * @default 2.0
 *
 * @param targetScaleX:num
 * @text Target Scale: X
 * @parent Scale
 * @desc What scale X value should the popup end at?
 * @default 1.0
 *
 * @param targetScaleY:num
 * @text Target Scale: Y
 * @parent Scale
 * @desc What scale Y value should the popup end at?
 * @default 1.0
 *
 * @param Acceleration
 *
 * @param startSpeedX:num
 * @text Starting Speed: X
 * @parent Acceleration
 * @desc How much should the starting X speed of the popup be?
 * Negative: Left, Positive: Right
 * @default 0
 *
 * @param startSpeedY:num
 * @text Starting Speed: Y
 * @parent Acceleration
 * @desc How much should the starting Y speed of the popup be?
 * Negative: Up, Positive: Down
 * @default 0
 *
 * @param deltaSpeedX:num
 * @text Delta Speed: X
 * @parent Acceleration
 * @desc How much should the growing X speed of the popup be?
 * Negative: Left, Positive: Right
 * @default -0.10
 *
 * @param deltaSpeedY:num
 * @text Delta Speed: Y
 * @parent Acceleration
 * @desc How much should the growing Y speed of the popup be?
 * Negative: Up, Positive: Down
 * @default 0
 *
 * @param Fading
 *
 * @param opaqueDuration:num
 * @text Opaque Duration
 * @parent Fading
 * @type number
 * @min 1
 * @desc How many frames should the popup stay opaque?
 * @default 40
 *
 * @param fadeDuration:num
 * @text Fade Duration
 * @parent Fading
 * @type number
 * @min 1
 * @desc After the opaque duration wears off, how many frames will
 * it take for the popup to vanish?
 * @default 20
 *
 */
//=============================================================================

const _0x32e930=_0x2fa3;function _0x4ed8(){const _0x330c39=['offsetXvariance','prototype','targetScaleX','format','createWeaknessPopup','fontFace','executeDamage','OppsC','NUM','VnGBk','startScaleY','opaqueDuration','exit','updateWeaknessPopupsContainer','_targetScaleX','Spriteset_Battle_createBattleField','updateScaling','cFzni','createBitmap','createWeaknessPopupsForElementRate','Element75','ARRAYSTR','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_data','index','Element90','outlineSize','version','calcUserElementDamageFlat','Settings','2211520hRmHWV','hyuuN','scaleDuration','Element150','loadWeaknessPopupBitmap','height','toUpperCase','_scene','#ffffff','scale','Game_Action_calcUserElementDamagePlus','hmiRN','calcUserElementDamageRate','_damageContainer','_distortionSprite','textColor','status','Element101','_createDamageContainer','kveTy','Element110','adjustFlippedBattlefield','SLguD','isSceneBattle','randomInt','Impact','_baseY','updateOpacity','startSpeedX','Element95','Element105','_statusWindow','Element25','loadSystem','updatePosition','calcElementRate','getColor','_battleField','cxvCt','match','destroy','vNMFh','WeaknessPopups','return\x200','STRUCT','offsetY','FUNC','_scaleDuration','Element125','_spriteset','116548oiGtcS','ConvertParams','map','deltaSpeedX','includes','EIgmT','_fadeDuration','7AJtPWe','iPUFX','rtheB','_speedX','createWeaknessPopupsContainer','centerFrontViewSprite','call','isFlipped','createWeaknessPopupsForCritical','offsetYvariance','Game_Action_calcUserElementDamageRate','Window_BattleStatus_createDamageContainer','parameters','createWeaknessPopupType','isDamage','511Jjeima','1426WlUdLO','bypassUserElementBonus','357990XgMsyx','critical','kTmiK','parse','bitmap','removeChild','WiBmq','Element99','text','fontItalic','getWeaknessPopupContainer','description','_battler','enabled','width','484RhdQpI','outlineColor','DefaultPopupSettings','startSpeedY','findTargetSprite','fontBold','max','addChild','5992281BUaUxU','8755232KwCbMP','_speedY','ARRAYEVAL','_baseX','anchor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','result','_weaknessPopupsContainer','ceil','extraPositionY','cPMrw','Spriteset_Battle_adjustFlippedBattlefield','drawText','offsetX','center','none','constructor','_createWeaknessPopupContainer','#%1','12ENPVFb','rMzbj','isSideView','calcUserElementDamagePlus','initMembers','boxHeight','initialize','Spriteset_Battle_update','opacity','ARRAYSTRUCT','SubPm','createWeaknessPopups','filename','Game_Action_executeDamage','185808jmvDWE','update','ARRAYFUNC','filter','initPosition','fadeDuration','fontSize','bitmapHeight','VisuMZ_1_BattleCore','ARRAYJSON','BattleCore','TzdMV','TEXT','createBitmapImage','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_opaqueDuration','parent','isActor','_targetScaleY','EVAL','_weaknessPopupContainer','boxWidth','deltaSpeedY','inCLz'];_0x4ed8=function(){return _0x330c39;};return _0x4ed8();}(function(_0x51cc27,_0x48c381){const _0x2464ae=_0x2fa3,_0x3d9cfa=_0x51cc27();while(!![]){try{const _0x2d6648=-parseInt(_0x2464ae(0x1fc))/0x1*(-parseInt(_0x2464ae(0x1fd))/0x2)+-parseInt(_0x2464ae(0x17e))/0x3+parseInt(_0x2464ae(0x1e6))/0x4+parseInt(_0x2464ae(0x1b4))/0x5*(-parseInt(_0x2464ae(0x170))/0x6)+parseInt(_0x2464ae(0x1ed))/0x7*(-parseInt(_0x2464ae(0x15d))/0x8)+parseInt(_0x2464ae(0x15c))/0x9+parseInt(_0x2464ae(0x1ff))/0xa*(parseInt(_0x2464ae(0x154))/0xb);if(_0x2d6648===_0x48c381)break;else _0x3d9cfa['push'](_0x3d9cfa['shift']());}catch(_0x132b41){_0x3d9cfa['push'](_0x3d9cfa['shift']());}}}(_0x4ed8,0x90e59));var label=_0x32e930(0x1de),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x32e930(0x181)](function(_0x5ef010){const _0x266ca5=_0x32e930;return _0x5ef010[_0x266ca5(0x1c4)]&&_0x5ef010[_0x266ca5(0x150)][_0x266ca5(0x1ea)]('['+label+']');})[0x0];function _0x2fa3(_0x4545e6,_0x4f16eb){const _0x4ed8fd=_0x4ed8();return _0x2fa3=function(_0x2fa305,_0x12b7a5){_0x2fa305=_0x2fa305-0x14d;let _0x1ed410=_0x4ed8fd[_0x2fa305];return _0x1ed410;},_0x2fa3(_0x4545e6,_0x4f16eb);}VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x32e930(0x1e7)]=function(_0x4a59b9,_0x33ddc1){const _0xa5e318=_0x32e930;for(const _0x10dfcf in _0x33ddc1){if(_0x10dfcf['match'](/(.*):(.*)/i)){const _0x57b94c=String(RegExp['$1']),_0x94143b=String(RegExp['$2'])[_0xa5e318(0x1ba)]()['trim']();let _0x38b8c7,_0x72fa7e,_0x2c66c2;switch(_0x94143b){case _0xa5e318(0x19e):_0x38b8c7=_0x33ddc1[_0x10dfcf]!==''?Number(_0x33ddc1[_0x10dfcf]):0x0;break;case'ARRAYNUM':_0x72fa7e=_0x33ddc1[_0x10dfcf]!==''?JSON[_0xa5e318(0x202)](_0x33ddc1[_0x10dfcf]):[],_0x38b8c7=_0x72fa7e[_0xa5e318(0x1e8)](_0x2622c5=>Number(_0x2622c5));break;case _0xa5e318(0x191):_0x38b8c7=_0x33ddc1[_0x10dfcf]!==''?eval(_0x33ddc1[_0x10dfcf]):null;break;case _0xa5e318(0x15f):_0x72fa7e=_0x33ddc1[_0x10dfcf]!==''?JSON[_0xa5e318(0x202)](_0x33ddc1[_0x10dfcf]):[],_0x38b8c7=_0x72fa7e[_0xa5e318(0x1e8)](_0x1c2f21=>eval(_0x1c2f21));break;case'JSON':_0x38b8c7=_0x33ddc1[_0x10dfcf]!==''?JSON[_0xa5e318(0x202)](_0x33ddc1[_0x10dfcf]):'';break;case _0xa5e318(0x187):_0x72fa7e=_0x33ddc1[_0x10dfcf]!==''?JSON[_0xa5e318(0x202)](_0x33ddc1[_0x10dfcf]):[],_0x38b8c7=_0x72fa7e[_0xa5e318(0x1e8)](_0x35a9d5=>JSON['parse'](_0x35a9d5));break;case _0xa5e318(0x1e2):_0x38b8c7=_0x33ddc1[_0x10dfcf]!==''?new Function(JSON[_0xa5e318(0x202)](_0x33ddc1[_0x10dfcf])):new Function(_0xa5e318(0x1df));break;case _0xa5e318(0x180):_0x72fa7e=_0x33ddc1[_0x10dfcf]!==''?JSON[_0xa5e318(0x202)](_0x33ddc1[_0x10dfcf]):[],_0x38b8c7=_0x72fa7e[_0xa5e318(0x1e8)](_0x35693c=>new Function(JSON['parse'](_0x35693c)));break;case'STR':_0x38b8c7=_0x33ddc1[_0x10dfcf]!==''?String(_0x33ddc1[_0x10dfcf]):'';break;case _0xa5e318(0x1ab):_0x72fa7e=_0x33ddc1[_0x10dfcf]!==''?JSON[_0xa5e318(0x202)](_0x33ddc1[_0x10dfcf]):[],_0x38b8c7=_0x72fa7e['map'](_0x3bf68d=>String(_0x3bf68d));break;case _0xa5e318(0x1e0):_0x2c66c2=_0x33ddc1[_0x10dfcf]!==''?JSON[_0xa5e318(0x202)](_0x33ddc1[_0x10dfcf]):{},_0x38b8c7=VisuMZ[_0xa5e318(0x1e7)]({},_0x2c66c2);break;case _0xa5e318(0x179):_0x72fa7e=_0x33ddc1[_0x10dfcf]!==''?JSON[_0xa5e318(0x202)](_0x33ddc1[_0x10dfcf]):[],_0x38b8c7=_0x72fa7e[_0xa5e318(0x1e8)](_0x3baa0c=>VisuMZ['ConvertParams']({},JSON[_0xa5e318(0x202)](_0x3baa0c)));break;default:continue;}_0x4a59b9[_0x57b94c]=_0x38b8c7;}}return _0x4a59b9;},(_0x4cba2f=>{const _0x18ec59=_0x32e930,_0x43b311=_0x4cba2f['name'];for(const _0x4a9aaa of dependencies){if(_0x18ec59(0x1ca)===_0x18ec59(0x1ca)){if(!Imported[_0x4a9aaa]){alert(_0x18ec59(0x1ac)[_0x18ec59(0x199)](_0x43b311,_0x4a9aaa)),SceneManager[_0x18ec59(0x1a2)]();break;}}else this[_0x18ec59(0x1f0)]=this[_0x18ec59(0x1ad)][_0x18ec59(0x1d0)],this[_0x18ec59(0x15e)]=this[_0x18ec59(0x1ad)]['startSpeedY'],this['_opaqueDuration']=this['_data']['opaqueDuration'],this['_fadeDuration']=this[_0x18ec59(0x1ad)][_0x18ec59(0x183)],this['_scaleDuration']=this['_data']['scaleDuration'];}const _0x2733ce=_0x4cba2f[_0x18ec59(0x150)];if(_0x2733ce[_0x18ec59(0x1db)](/\[Version[ ](.*?)\]/i)){if(_0x18ec59(0x19d)===_0x18ec59(0x1ef))return this[_0x18ec59(0x1c3)](_0x1d787d(_0x5ecc1c));else{const _0x363900=Number(RegExp['$1']);_0x363900!==VisuMZ[label][_0x18ec59(0x1b1)]&&(_0x18ec59(0x189)!==_0x18ec59(0x189)?_0x4efaec=_0x18ec59(0x1e4):(alert(_0x18ec59(0x18c)[_0x18ec59(0x199)](_0x43b311,_0x363900)),SceneManager[_0x18ec59(0x1a2)]()));}}if(_0x2733ce[_0x18ec59(0x1db)](/\[Tier[ ](\d+)\]/i)){const _0x3abbc7=Number(RegExp['$1']);_0x3abbc7<tier?(alert(_0x18ec59(0x162)[_0x18ec59(0x199)](_0x43b311,_0x3abbc7,tier)),SceneManager[_0x18ec59(0x1a2)]()):tier=Math[_0x18ec59(0x15a)](_0x3abbc7,tier);}VisuMZ[_0x18ec59(0x1e7)](VisuMZ[label][_0x18ec59(0x1b3)],_0x4cba2f[_0x18ec59(0x1f9)]);})(pluginData),ColorManager[_0x32e930(0x1d8)]=function(_0x2d9467){const _0x4c9d8d=_0x32e930;_0x2d9467=String(_0x2d9467);if(_0x2d9467['match'](/#(.*)/i))return _0x4c9d8d(0x16f)['format'](String(RegExp['$1']));else{if(_0x4c9d8d(0x1da)!==_0x4c9d8d(0x1da)){if(_0x38101c[_0x4c9d8d(0x1fe)])return 0x1;return _0x2af58e[_0x4c9d8d(0x1de)][_0x4c9d8d(0x1f7)][_0x4c9d8d(0x1f3)](this,_0x2e977e,_0x313a87);}else return this[_0x4c9d8d(0x1c3)](Number(_0x2d9467));}},SceneManager[_0x32e930(0x1cb)]=function(){const _0x14462c=_0x32e930;return this[_0x14462c(0x1bb)]&&this[_0x14462c(0x1bb)][_0x14462c(0x16d)]===Scene_Battle;},VisuMZ[_0x32e930(0x1de)][_0x32e930(0x17d)]=Game_Action[_0x32e930(0x197)]['executeDamage'],Game_Action['prototype'][_0x32e930(0x19c)]=function(_0x1b897d,_0x3231ce){const _0x12c92a=_0x32e930;VisuMZ[_0x12c92a(0x1de)][_0x12c92a(0x17d)]['call'](this,_0x1b897d,_0x3231ce),this[_0x12c92a(0x17b)](_0x1b897d,_0x3231ce);},Game_Action['prototype']['createWeaknessPopups']=function(_0x18e320,_0x224633){const _0x2eb252=_0x32e930;if(!SceneManager[_0x2eb252(0x1cb)]())return;if(!this[_0x2eb252(0x1fb)]())return;this['createWeaknessPopupsForCritical'](_0x18e320,_0x224633),this[_0x2eb252(0x1a9)](_0x18e320,_0x224633);},Game_Action['prototype'][_0x32e930(0x1f5)]=function(_0x502d7b,_0x580fb9){const _0x929b4b=_0x32e930,_0x3ebed1=_0x502d7b[_0x929b4b(0x163)]();if(!_0x3ebed1[_0x929b4b(0x200)])return;const _0x57084c=SceneManager['_scene']['_spriteset'];if(!_0x57084c)return;_0x57084c[_0x929b4b(0x1fa)](_0x502d7b,'Critical');},Game_Action[_0x32e930(0x197)][_0x32e930(0x1a9)]=function(_0x411a4a,_0x25fcdb){const _0x2c72e3=_0x32e930,_0x16053d=SceneManager[_0x2c72e3(0x1bb)][_0x2c72e3(0x1e5)];if(!_0x16053d)return;$gameTemp[_0x2c72e3(0x1fe)]=!![];const _0x6e2e57=this[_0x2c72e3(0x1d7)](_0x411a4a);$gameTemp[_0x2c72e3(0x1fe)]=![];let _0x9cfa42=_0x2c72e3(0x16c);if(_0x6e2e57===0x0)_0x9cfa42='Element0';else{if(_0x6e2e57<0x0){if(_0x2c72e3(0x1ee)===_0x2c72e3(0x17a)){const _0xf697aa=_0x37abe6(_0x56d97b['$1']);_0xf697aa<_0x48ca63?(_0x2b95d2(_0x2c72e3(0x162)['format'](_0x3552f6,_0xf697aa,_0x296ebb)),_0x579f4e[_0x2c72e3(0x1a2)]()):_0x15036a=_0x61a356[_0x2c72e3(0x15a)](_0xf697aa,_0x3cb145);}else _0x9cfa42='ElementNegative';}else{if(_0x6e2e57>=0x2)_0x2c72e3(0x1b5)==='hyuuN'?_0x9cfa42='Element200':_0x330726=_0x2c72e3(0x1d2);else{if(_0x6e2e57>=1.75)'DvdqR'!==_0x2c72e3(0x205)?_0x9cfa42='Element175':_0x33d852[_0x2c72e3(0x1f2)](this[_0x2c72e3(0x151)][_0x2c72e3(0x151)][_0x2c72e3(0x1ae)]());else{if(_0x6e2e57>=1.5)_0x9cfa42=_0x2c72e3(0x1b7);else{if(_0x6e2e57>=1.25)_0x9cfa42='Element125';else{if(_0x6e2e57>=1.1)_0x9cfa42='Element110';else{if(_0x6e2e57>=1.05)_0x2c72e3(0x167)!=='CJxOF'?_0x9cfa42='Element105':_0x44bea3=_0x2c72e3(0x1c8);else{if(_0x6e2e57>=1.01)_0x9cfa42=_0x2c72e3(0x1c5);else{if(_0x6e2e57<=0.25)'uMCFr'!==_0x2c72e3(0x195)?_0x9cfa42=_0x2c72e3(0x1d4):this[_0x2c72e3(0x1b8)]();else{if(_0x6e2e57<=0.5)_0x9cfa42=_0x2c72e3(0x1aa);else{if(_0x6e2e57<=0.75)_0x9cfa42=_0x2c72e3(0x1af);else{if(_0x6e2e57<=0.9)'nxePc'===_0x2c72e3(0x1c7)?_0x42f674='ElementNegative':_0x9cfa42=_0x2c72e3(0x1d1);else{if(_0x6e2e57<=0.99){if(_0x2c72e3(0x1dd)!=='EvAhB')_0x9cfa42=_0x2c72e3(0x206);else{if(this[_0x2c72e3(0x18d)]-->0x0)return;if(this[_0x2c72e3(0x1ec)]>0x0){const _0xc3995f=this['_fadeDuration'];this[_0x2c72e3(0x178)]=(this[_0x2c72e3(0x178)]*(_0xc3995f-0x1)+0x0)/_0xc3995f,this[_0x2c72e3(0x1ec)]--;}else{const _0x98139a=this['parent'];_0x98139a&&(_0x98139a[_0x2c72e3(0x204)](this),this['destroy']());}}}}}}}}}}}}}}}}_0x16053d[_0x2c72e3(0x1fa)](_0x411a4a,_0x9cfa42);},VisuMZ[_0x32e930(0x1de)][_0x32e930(0x1be)]=Game_Action[_0x32e930(0x197)][_0x32e930(0x173)],Game_Action[_0x32e930(0x197)][_0x32e930(0x173)]=function(_0x31b9e5,_0x1eccd0){const _0x4ca226=_0x32e930;if($gameTemp[_0x4ca226(0x1fe)])return 0x0;return VisuMZ['WeaknessPopups'][_0x4ca226(0x1be)][_0x4ca226(0x1f3)](this,_0x31b9e5,_0x1eccd0);},VisuMZ[_0x32e930(0x1de)]['Game_Action_calcUserElementDamageRate']=Game_Action['prototype'][_0x32e930(0x1c0)],Game_Action[_0x32e930(0x197)][_0x32e930(0x1c0)]=function(_0x33bdf8,_0x25264c){const _0x2d17ee=_0x32e930;if($gameTemp[_0x2d17ee(0x1fe)])return 0x1;return VisuMZ['WeaknessPopups'][_0x2d17ee(0x1f7)]['call'](this,_0x33bdf8,_0x25264c);},VisuMZ[_0x32e930(0x1de)]['Game_Action_calcUserElementDamageFlat']=Game_Action['prototype'][_0x32e930(0x1b2)],Game_Action[_0x32e930(0x197)][_0x32e930(0x1b2)]=function(_0x173a9c,_0x25a587){const _0x37ba5d=_0x32e930;if($gameTemp[_0x37ba5d(0x1fe)])return 0x0;return VisuMZ[_0x37ba5d(0x1de)]['Game_Action_calcUserElementDamageFlat']['call'](this,_0x173a9c,_0x25a587);};function Sprite_WeaknessPopup(){const _0x4388ea=_0x32e930;this[_0x4388ea(0x176)](...arguments);}Sprite_WeaknessPopup[_0x32e930(0x197)]=Object['create'](Sprite['prototype']),Sprite_WeaknessPopup[_0x32e930(0x197)][_0x32e930(0x16d)]=Sprite_WeaknessPopup,Sprite_WeaknessPopup['prototype'][_0x32e930(0x176)]=function(_0x4aa81e,_0x53dc20){const _0x242049=_0x32e930;this[_0x242049(0x151)]=_0x4aa81e,this[_0x242049(0x1ad)]=_0x53dc20,this[_0x242049(0x174)](),Sprite['prototype'][_0x242049(0x176)][_0x242049(0x1f3)](this),this['createBitmap'](),this[_0x242049(0x182)]();},Sprite_WeaknessPopup[_0x32e930(0x197)][_0x32e930(0x1a8)]=function(){const _0xdbe340=_0x32e930;if(this[_0xdbe340(0x1ad)][_0xdbe340(0x17c)])this[_0xdbe340(0x1b8)]();else{if('hmiRN'!==_0xdbe340(0x1bf))return;else this[_0xdbe340(0x18b)]();}},Sprite_WeaknessPopup['prototype']['loadWeaknessPopupBitmap']=function(){const _0x11c788=_0x32e930;this['bitmap']=ImageManager[_0x11c788(0x1d5)](this[_0x11c788(0x1ad)][_0x11c788(0x17c)]);},Sprite_WeaknessPopup['prototype'][_0x32e930(0x18b)]=function(){const _0x48aac6=_0x32e930;this['bitmap']=new Bitmap(this[_0x48aac6(0x1ad)]['bitmapWidth'],this[_0x48aac6(0x1ad)][_0x48aac6(0x185)]),this[_0x48aac6(0x203)]['fontFace']=this['_data'][_0x48aac6(0x19b)],this[_0x48aac6(0x203)][_0x48aac6(0x184)]=this[_0x48aac6(0x1ad)]['fontSize'],this[_0x48aac6(0x203)][_0x48aac6(0x159)]=this['_data'][_0x48aac6(0x159)],this['bitmap']['fontItalic']=this[_0x48aac6(0x1ad)][_0x48aac6(0x14e)],this[_0x48aac6(0x203)][_0x48aac6(0x1c3)]=ColorManager[_0x48aac6(0x1d8)](this[_0x48aac6(0x1ad)]['textColor']),this[_0x48aac6(0x203)][_0x48aac6(0x1b0)]=this[_0x48aac6(0x1ad)][_0x48aac6(0x1b0)],this[_0x48aac6(0x203)][_0x48aac6(0x155)]=this['_data'][_0x48aac6(0x155)],this['bitmap'][_0x48aac6(0x169)](this[_0x48aac6(0x1ad)][_0x48aac6(0x14d)],0x0,0x0,this[_0x48aac6(0x203)][_0x48aac6(0x153)],this[_0x48aac6(0x203)]['height'],_0x48aac6(0x16b));},Sprite_WeaknessPopup[_0x32e930(0x197)][_0x32e930(0x174)]=function(){const _0x1f63b0=_0x32e930;this[_0x1f63b0(0x1f0)]=this[_0x1f63b0(0x1ad)][_0x1f63b0(0x1d0)],this[_0x1f63b0(0x15e)]=this[_0x1f63b0(0x1ad)][_0x1f63b0(0x157)],this[_0x1f63b0(0x18d)]=this[_0x1f63b0(0x1ad)][_0x1f63b0(0x1a1)],this[_0x1f63b0(0x1ec)]=this[_0x1f63b0(0x1ad)][_0x1f63b0(0x183)],this[_0x1f63b0(0x1e3)]=this['_data'][_0x1f63b0(0x1b6)];},Sprite_WeaknessPopup[_0x32e930(0x197)][_0x32e930(0x182)]=function(){const _0x4ae78b=_0x32e930,_0xcf29bc=SceneManager['_scene'][_0x4ae78b(0x1d3)];!$gameSystem[_0x4ae78b(0x172)]()&&this[_0x4ae78b(0x151)][_0x4ae78b(0x151)][_0x4ae78b(0x18f)]()&&(Imported[_0x4ae78b(0x186)]&&_0xcf29bc['centerFrontViewSprite'](this['_battler'][_0x4ae78b(0x151)][_0x4ae78b(0x1ae)]()));this['x']=this[_0x4ae78b(0x151)][_0x4ae78b(0x160)]??this[_0x4ae78b(0x151)]['x'],this['x']+=this['_data'][_0x4ae78b(0x16a)],this['y']=this[_0x4ae78b(0x151)][_0x4ae78b(0x1ce)]??this[_0x4ae78b(0x151)]['y'],this['y']-=this['_battler'][_0x4ae78b(0x1b9)]*this['_battler']['scale']['y'],this['y']+=this['_data'][_0x4ae78b(0x1e1)];if(Imported[_0x4ae78b(0x186)]&&VisuMZ[_0x4ae78b(0x188)]['version']>=1.38){this['x']+=this[_0x4ae78b(0x151)]['extraPositionX']();const _0x16fe0b=this[_0x4ae78b(0x151)][_0x4ae78b(0x1c2)][_0x4ae78b(0x1bd)]['y'];this['y']+=this[_0x4ae78b(0x151)][_0x4ae78b(0x166)]();}const _0x50cb87=this['_data'][_0x4ae78b(0x196)]||0x0,_0x20c4e1=this[_0x4ae78b(0x1ad)][_0x4ae78b(0x1f6)]||0x0;this['x']+=Math[_0x4ae78b(0x1cc)](_0x50cb87*0x2)-_0x50cb87,this['y']+=Math['randomInt'](_0x20c4e1*0x2)-_0x20c4e1,this[_0x4ae78b(0x161)]['x']=0.5,this['anchor']['y']=0.5,this[_0x4ae78b(0x1bd)]['x']=this['_data']['startScaleX'],this[_0x4ae78b(0x1bd)]['y']=this[_0x4ae78b(0x1ad)][_0x4ae78b(0x1a0)],this[_0x4ae78b(0x1a4)]=this['_data'][_0x4ae78b(0x198)],this['_targetScaleY']=this['_data']['targetScaleY'];},Sprite_WeaknessPopup[_0x32e930(0x197)][_0x32e930(0x17f)]=function(){const _0xdace2c=_0x32e930;Sprite[_0xdace2c(0x197)][_0xdace2c(0x17f)][_0xdace2c(0x1f3)](this),this[_0xdace2c(0x1d6)](),this['updateScaling'](),this['updateOpacity']();},Sprite_WeaknessPopup[_0x32e930(0x197)][_0x32e930(0x1d6)]=function(){const _0x4f0436=_0x32e930;this['x']+=this[_0x4f0436(0x1f0)],this['y']+=this['_speedY'],this[_0x4f0436(0x1f0)]+=this[_0x4f0436(0x1ad)][_0x4f0436(0x1e9)],this['_speedY']+=this[_0x4f0436(0x1ad)][_0x4f0436(0x194)];},Sprite_WeaknessPopup['prototype'][_0x32e930(0x1a6)]=function(){const _0x55c576=_0x32e930;if(this[_0x55c576(0x1e3)]>0x0){const _0x10b192=this[_0x55c576(0x1e3)];this['scale']['x']=(this[_0x55c576(0x1bd)]['x']*(_0x10b192-0x1)+this[_0x55c576(0x1a4)])/_0x10b192,this['scale']['y']=(this['scale']['y']*(_0x10b192-0x1)+this[_0x55c576(0x190)])/_0x10b192,this[_0x55c576(0x1e3)]--;}else this[_0x55c576(0x1bd)]['x']=0x1,this[_0x55c576(0x1bd)]['y']=0x1;},Sprite_WeaknessPopup['prototype'][_0x32e930(0x1cf)]=function(){const _0x31ce13=_0x32e930;if(this[_0x31ce13(0x18d)]-->0x0)return;if(this[_0x31ce13(0x1ec)]>0x0){if('EVhRd'!==_0x31ce13(0x19f)){const _0x14507b=this[_0x31ce13(0x1ec)];this[_0x31ce13(0x178)]=(this[_0x31ce13(0x178)]*(_0x14507b-0x1)+0x0)/_0x14507b,this[_0x31ce13(0x1ec)]--;}else _0x5d3a59[_0x31ce13(0x1de)][_0x31ce13(0x1a5)]['call'](this),this[_0x31ce13(0x1f1)]();}else{const _0x3c1fc2=this[_0x31ce13(0x18e)];if(_0x3c1fc2){if(_0x31ce13(0x1a7)===_0x31ce13(0x1eb))return!_0x4b5c5b['isSideView']()&&_0x48257c[_0x31ce13(0x151)][_0x31ce13(0x18f)]()?_0x1a707d['_scene'][_0x31ce13(0x1d3)][_0x31ce13(0x192)]:this[_0x31ce13(0x164)];else _0x3c1fc2[_0x31ce13(0x204)](this),this[_0x31ce13(0x1dc)]();}}},VisuMZ[_0x32e930(0x1de)][_0x32e930(0x1a5)]=Spriteset_Battle[_0x32e930(0x197)]['createBattleField'],Spriteset_Battle[_0x32e930(0x197)]['createBattleField']=function(){const _0x58f3e2=_0x32e930;VisuMZ[_0x58f3e2(0x1de)][_0x58f3e2(0x1a5)]['call'](this),this[_0x58f3e2(0x1f1)]();},Spriteset_Battle['prototype'][_0x32e930(0x1f1)]=function(){const _0xad2d23=_0x32e930;if(this[_0xad2d23(0x164)])return;this['_weaknessPopupsContainer']=new Sprite(),this[_0xad2d23(0x164)]['x']=this[_0xad2d23(0x1d9)]['x'],this['_weaknessPopupsContainer']['y']=this[_0xad2d23(0x1d9)]['y'];const _0x420bc8=Math['ceil']((Graphics['width']-Graphics[_0xad2d23(0x193)])/0x2),_0x14afae=Math[_0xad2d23(0x165)]((Graphics['height']-Graphics[_0xad2d23(0x175)])/0x2);this['_weaknessPopupsContainer']['x']+=_0x420bc8,this[_0xad2d23(0x164)]['y']+=_0x14afae,this[_0xad2d23(0x15b)](this[_0xad2d23(0x164)]);},VisuMZ[_0x32e930(0x1de)][_0x32e930(0x168)]=Spriteset_Battle['prototype'][_0x32e930(0x1c9)],Spriteset_Battle[_0x32e930(0x197)][_0x32e930(0x1c9)]=function(){const _0x448602=_0x32e930;VisuMZ[_0x448602(0x1de)]['Spriteset_Battle_adjustFlippedBattlefield'][_0x448602(0x1f3)](this);!this[_0x448602(0x164)]&&this[_0x448602(0x1f1)]();if(!this[_0x448602(0x1f4)]())return;this[_0x448602(0x164)]['scale']['x']=-0x1,this['_weaknessPopupsContainer']['x']=this[_0x448602(0x1d9)]['x']+this[_0x448602(0x1d9)][_0x448602(0x153)];},VisuMZ[_0x32e930(0x1de)][_0x32e930(0x177)]=Spriteset_Battle[_0x32e930(0x197)][_0x32e930(0x17f)],Spriteset_Battle[_0x32e930(0x197)][_0x32e930(0x17f)]=function(){const _0x1fd889=_0x32e930;VisuMZ[_0x1fd889(0x1de)]['Spriteset_Battle_update']['call'](this),this[_0x1fd889(0x1a3)]();},Spriteset_Battle['prototype']['updateWeaknessPopupsContainer']=function(){const _0x49ab8c=_0x32e930;if(!this[_0x49ab8c(0x164)])return;if(!this['_damageContainer'])return;this[_0x49ab8c(0x164)]['x']=this[_0x49ab8c(0x1c1)]['x'],this[_0x49ab8c(0x164)]['y']=this['_damageContainer']['y'];if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x11fe2e=Math[_0x49ab8c(0x165)]((Graphics['width']-Graphics[_0x49ab8c(0x193)])/0x2),_0x572781=Math['ceil']((Graphics['height']-Graphics[_0x49ab8c(0x175)])/0x2);this[_0x49ab8c(0x164)]['x']+=_0x11fe2e,this[_0x49ab8c(0x164)]['y']+=_0x572781;},Spriteset_Battle[_0x32e930(0x197)][_0x32e930(0x1fa)]=function(_0x2a852c,_0x16fcd6){const _0xd47815=_0x32e930;if(!_0x2a852c)return;if(!this['_weaknessPopupsContainer'])return;const _0x2c73d8=this['getWeaknessPopupData'](_0x16fcd6);if(!_0x2c73d8)return;if(!_0x2c73d8[_0xd47815(0x152)])return;this[_0xd47815(0x19a)](_0x2a852c,_0x2c73d8);},VisuMZ[_0x32e930(0x1de)][_0x32e930(0x156)]=function(){const _0xfc502b=_0x32e930;return{'enabled':!![],'filename':'','text':_0xfc502b(0x18a),'bitmapWidth':0x258,'bitmapHeight':0xc8,'fontFace':_0xfc502b(0x1cd),'fontSize':0x24,'fontBold':![],'fontItalic':![],'textColor':_0xfc502b(0x1bc),'outlineSize':0x5,'outlineColor':'rgba(1,\x201,\x201,\x201)','offsetX':0x0,'offsetY':0x0,'scaleDuration':0x14,'startScaleX':0x2,'startScaleY':0x2,'targetScaleX':0x1,'targetScaleY':0x1,'startSpeedX':0x0,'startSpeedY':0x0,'deltaSpeedX':0x0,'deltaSpeedY':0x0,'opaqueDuration':0x28,'fadeDuration':0x14};},Spriteset_Battle[_0x32e930(0x197)]['getWeaknessPopupData']=function(_0x1bc3c9){const _0xe58fb2=_0x32e930,_0x5d5122=VisuMZ['WeaknessPopups'][_0xe58fb2(0x1b3)];if(!_0x5d5122)return null;return _0x5d5122[_0x1bc3c9];},Spriteset_Battle[_0x32e930(0x197)][_0x32e930(0x19a)]=function(_0x1746e6,_0x39a708){const _0x239697=_0x32e930;if(!_0x1746e6)return;if(!_0x39a708)return;if(!_0x39a708[_0x239697(0x152)])return;if(!this['_weaknessPopupsContainer'])return;if(!Imported[_0x239697(0x186)]&&_0x1746e6['isActor']()&&!$gameSystem[_0x239697(0x172)]()){if(_0x239697(0x201)!==_0x239697(0x171))return;else _0x27b96f[_0x239697(0x1de)][_0x239697(0x177)][_0x239697(0x1f3)](this),this['updateWeaknessPopupsContainer']();}const _0x43f0b7=this[_0x239697(0x158)](_0x1746e6);if(!_0x43f0b7)return;const _0x21179f=new Sprite_WeaknessPopup(_0x43f0b7,_0x39a708),_0xb29f2=this[_0x239697(0x14f)](_0x43f0b7);_0xb29f2[_0x239697(0x15b)](_0x21179f);},Spriteset_Battle[_0x32e930(0x197)][_0x32e930(0x14f)]=function(_0x55542b){const _0x1c5d92=_0x32e930;return!$gameSystem[_0x1c5d92(0x172)]()&&_0x55542b['_battler'][_0x1c5d92(0x18f)]()?SceneManager[_0x1c5d92(0x1bb)][_0x1c5d92(0x1d3)]['_weaknessPopupContainer']:this[_0x1c5d92(0x164)];},VisuMZ[_0x32e930(0x1de)][_0x32e930(0x1f8)]=Window_BattleStatus[_0x32e930(0x197)][_0x32e930(0x1c6)],Window_BattleStatus[_0x32e930(0x197)]['_createDamageContainer']=function(){const _0x4fdd81=_0x32e930;this[_0x4fdd81(0x16e)](),VisuMZ[_0x4fdd81(0x1de)][_0x4fdd81(0x1f8)][_0x4fdd81(0x1f3)](this);},Window_BattleStatus[_0x32e930(0x197)][_0x32e930(0x16e)]=function(){const _0x466952=_0x32e930;this[_0x466952(0x192)]=new Sprite(),this['addChild'](this[_0x466952(0x192)]);};