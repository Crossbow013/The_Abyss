//=============================================================================
// Trilobytes - Substitute
// TLB_Substitute.js
//=============================================================================

var Imported = Imported || {};
Imported.TLB_Substitute = true;

var TLB = TLB || {};
TLB.Substitute = TLB.Substitute || {};
TLB.Substitute.version = 1.00;

/*:
 * @plugindesc This plugin allows for substitute states where a random
 * ally will take hits for a target if they have that state.
 * @author John Clifford AKA Trihan
 *
 * @help
 *
 * Plug and play, just add a <substitute> tag to any state you wish to
 * apply this effect to.
 *
 * TERMS OF USE
 * This plugin was a commissioned work and may only be used by the client.
 */
 
 var parameters = PluginManager.parameters('TLB_Substitute');
 TLB.Param = TLB.Param || {};
 TLB.Param.Sub = TLB.Param.Sub || {};
 
 for (const param in parameters) {
	 TLB.Param.Sub[param] = parameters[param];
 }
 
 TLB.Substitute.BattleManager_applySubstitute = BattleManager.applySubstitute;
 BattleManager.applySubstitute = function(target) {
	 if (target.states().some(state => state.meta.substitute)) {
		 const potentialSubstitutes = target.friendsUnit().members().filter(member => member !== target && member.canMove());
		 if (potentialSubstitutes) {
			 const substitute = potentialSubstitutes[Math.randomInt(potentialSubstitutes.length - 1)];
			 this._logWindow.displaySubstitute(substitute, target);
			 return substitute;
		 }
	 } else return TLB.Substitute.BattleManager_applySubstitute.call(this, target);
 };