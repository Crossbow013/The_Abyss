/*:
@target MZ
@title sirL_MP69$14$34
@author SirLegna
@date February 15, 2022
@url https://sirlegna.itch.io/sir-legnas-plugin-generator 
@filename sirL_MP69$14$34
Please reach out to me for any help or just to talk about your project

@plugindesc This plugin is composed of multiple plugins. If problem report it with debug hash which can be found in Help section to the generator page.

@param Rewards For Escaping

@param RewardsForEscaping.lostItem
@text Lost Item
@parent Rewards For Escaping
@desc The text that appears when item is lost %1 = item name
@default %1 lost!
@type string

@param RewardsForEscaping.includeEquip
@text Include Equipment on Lost
@parent Rewards For Escaping
@desc Items that are equipped by party members will also be affected
@default true
@type boolean
@on Includes
@off Excludes

@param NoteSection
@text Personal Notes
@desc A place to put personal notes
@default []
@type multiline_string[]
@ End of params
@help
Generator Version = 2.0.1
Debug Hash : 69$14$34

	
If you find any issue, please let me know via the 
Community page at 
https://sirlegna.itch.io/sir-legnas-plugin-generator/
community

This plugin is composed of multiple plugins, which are listed here:
	1. v1.0.0 - Rewards For Escaping

===== v1.0.0 - Rewards For Escaping =====
This plugin allows the developer to enable 
rewards/penalties when the party successfully escapes.

Use Cases:
Set up for rewards/penalties when the party has escaped:
	1. Go to the plugin parameters and modify them to 
	meet your desire as when losing an item should it 
	include equip items and what message will appear.
	2. Go to the database in the Enemies section and find 
	the enemy you would like to define rewards/penalizes 
	when a party successfully escapes that enemy.
	3. Define the enemy note tags for the rewards/penalizes 
	for when the party successfully escapes; note tags can 
	be found in the note tag section.
	4. Done now when the enemy is in a battle, and the 
	party successfully escapes; the enemy will 
	reward/penalties the player for escaping.

Scripts:
SirL.MPRewardsForEscaping.escapeRewards(BM)
	Create all the escape rewards/penalties then displays 
	and rewards/penalize the party 

Parameters:
	* BM means the active battle manager

Returns: None

SirL.MPRewardsForEscaping.makeItemsForEscape(enemy,
listType)
	Get the items, weapons, armors that are going to 
	drop/taken during this escape by calculating the 
	percentages for that enemy given

Parameters:
	* enemy means the enemy object that you are getting 
	the dropped/took items, weapons, armors from
	* listType means a string of either "Drops" or "Takes" to 
	determine if this list is for drop items or taken items

Returns: An array of all the items that are dropped from 
or toke by that enemy

SirL.MPRewardsForEscaping.loseRewards(lostItems)
	Remove items from the party with the game message 
	defined in RewardsForEscaping.lostItem

Parameters:
	* lostItems means the standard format of drop item 
	object described, however this will take instead of gain.

Returns: Nothing

Note Tags: 


Note tags for Enemies:
	* Escape Experience Reward
<SirL.partyEscapeExp: AMOUNT>
	This note tag will define the amount of experience the 
	party is rewarded upon a successful escape. With 
	AMOUNT being the number value of that amount. You 
	can define the AMOUNT using any JavaScript function as 
	well.
	Example uses for note tag:
	 <SirL.partyEscapeExp:500> which means when the 
	party escapes this enemy will reward the player with 
	500 experience points.

	 <SirL.partyEscapeExp:-500> which means when the 
	party escapes this enemy will penalize the player with 
	the lost of 500 experience points.

	 <SirL.partyEscapeExp:$gameVariables.value(1)> which 
	means when the party escapes this enemy will reward 
	the player with experience points equal to the value 
	stored in game variable 1.

	 <SirL.partyEscapeExp:$gameParty.highestLevel()> 
	which means when the party escapes this enemy will 
	reward the player with experience points equal to the 
	highest level in the player party.

	 <SirL.partyEscapeExp:Math.floor(Math.random() * 
	51)> which means when the party escapes this enemy 
	will reward the player with experience points equal to a 
	random value between 0 and 50.

	* Escape Gold Reward
<SirL.partyEscapeGold: AMOUNT>
	This note tag will define the amount of gold the party 
	will reward upon a successful escape. With AMOUNT 
	being the number value of that amount. You can define 
	the AMOUNT using a JavaScript function as well.
	Example uses for note tag:
	 <SirL.partyEscapeGold:500> which means when the 
	party escapes this enemy will reward the player with 
	500 gold.

	 <SirL.partyEscapeGold:-500> which means when the 
	party escapes this enemy will penalize the player with 
	the lost of 500 gold.

	 <SirL.partyEscapeGold:$gameVariables.value(1)> 
	which means when the party escapes this enemy will 
	reward the player with gold equal to the value stored in 
	game variable 1.

	 <SirL.partyEscapeGold:$gameParty.highestLevel()> 
	which means when the party escapes this enemy will 
	reward the player with gold equal to the highest level in 
	the player party.

	 <SirL.partyEscapeGold:Math.floor(Math.random() * 
	51)> which means when the party escapes this enemy 
	will reward the player with gold equal to a random value 
	between 0 and 50.

	* Escape Drop Rewards
<SirL.partyEscapeDrops:[{"type":"TYPE",
"probability":PROB,"id":INDEX}]>
	This note tag defines the drops that the enemy will 
	leave upon a successful escape. You can include as 
	many drops as you want with commas. TYPE is defining 
	the type of drop; "Item", "Weapon", "Armor". PROB is 
	the number of likelihood such as 1/PROB. And INDEX is 
	the index that can be found in the database.
	Example uses for note tag:
	 
	<SirL.partyEscapeDrops:[{"type":"Item",
	"probability":10,"id":7}]> which means with default 
	RMMZ game, when the party escapes the enemy will 
	have a 1/10 chance of dropping a potion

	 
	<SirL.partyEscapeDrops:[{"type":"Weapon",
	"probability":1,"id":1}, 
	{"type":"Armor","probability":2,"id":2}]> which means 
	when the party escapes the enemy will always drop the 
	Weapon in index 1 of the database and a 50% (1/2) 
	chance of dropping the Armor in index 2 of the database

	* Escape Take Rewards
<SirL.partyEscapeTakes:[{"type":"TYPE",
"probability":PROB,"id":INDEX}]>
	This note tag defines the items the enemy will take upon 
	a successful escape. You can include as many items as 
	you want with commas. TYPE is defining the type of 
	drop; "Item", "Weapon", "Armor". PROB is the number 
	of likelihood such as 1/PROB. And INDEX is the index 
	that can be found in the database.
	Example uses for note tag:
	 
	<SirL.partyEscapeTakes:[{"type":"Item","probability":10,
	"id":7}]> which means with default RMMZ game, when 
	the party escapes the enemy will have a 1/10 chance of 
	taking a potion

	 
	<SirL.partyEscapeTakes:[{"type":"Weapon",
	"probability":1,"id":1}, 
	{"type":"Armor","probability":2,"id":2}]> which means 
	when the party escapes the enemy will always take the 
	Weapon in index 1 of the database and a 50% (1/2) 
	chance of taking the Armor in index 2 of the database

Core functionality that this plugin works with:
	* BattleManager.onEscapeSuccess

CHANGELOG
	v1.0.0 - Allow enemies to fail at escaping with drops 
	being fixed values

TERMS OF USE
	All required Terms of Use follow the higher the number, 
	the higher the priority, for example: 1. Can use X and 
	then 2. Cannot use X, then you cannot use X

	Optional Terms of Use are terms that the creator would 
	like to have, but are not forcing anyone to follow.

REQUIRED TERMS OF USE
	1. You are free to use the plugin created in any 
	commercial or non-commercial projects with the RPG 
	Maker software.
	2. You are free to modify the script created to your 
	liking however, for any bug fixes or general features you 
	are required to post an explanation in the Bugs/Features 
	Requests forums on the generator page. This is so that 
	the community can always be using the best code 
	available.
	3. You are not allowed to modify the terms of use except 
	for creating stricter terms.
	4. Place SirLegna Generated Plugins in your credits

OPTIONAL TERMS OF USE
	* Gifting SirLegna a copy of your game. I would love to 
	see how you use my code for ideas on how to improve 
	my plugins.

CREDITS:
	 - SirLegna can be found at https://sirlegna.itch.io/ 
	Creator
	 - Kurochan can be found at https://kurochan.itch.io/
	Tester, code reviewer, and fellow idea generator.
	 - jerjer can be found at 
	https://stackoverflow.com/a/9092085
	Creator of the getFnParamNames function
	 - Dmitri Pavlutin can be found at 
	https://dmitripavlutin.com/
	how-to-compare-objects-in-javascript/
	Creator of the shallowEqual function
*/


var Imported = Imported || {};
Imported.sirL_MP69$14$34 = true;
var SirL = SirL || {};
SirL.MPCore = SirL.MPCore || {};
SirL.MP69$14$34 = SirL.MP69$14$34 || {};
SirL.MP69$14$34.pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1];
SirL.MP69$14$34.pP = PluginManager.parameters(SirL.MP69$14$34.pluginName);
SirL.MPRewardsForEscaping = SirL.MPRewardsForEscaping || {};
typeof SirL.savablePP != `undefined` ? SirL.savablePP = SirL.savablePP.concat(...[]) : SirL.savablePP = [];
SirL.MPRewardsForEscaping.escapeRewards = function(BM){
	BM._rewards = {
			gold: $gameTroop.members().reduce(function(sum,enemy){
			if(enemy.enemy().meta["SirL.partyEscapeGold"]){
				const e = enemy;
				const v = $gameVariables._data;
				const t = $gameTroop;
				const p = $gameParty;
				sum += eval(enemy.enemy().meta["SirL.partyEscapeGold"])
			}
			return sum;
		},0),
			exp: $gameTroop.members().reduce(function(sum,enemy){
			if(enemy.enemy().meta["SirL.partyEscapeExp"]){
				const e = enemy;
				const v = $gameVariables._data;
				const t = $gameTroop;
				const p = $gameParty;
				sum += eval(enemy.enemy().meta["SirL.partyEscapeExp"])
			}
			return sum;
		},0),
			items: $gameTroop.members().reduce(function(r,enemy){
			escapedDropItems = []
			if(enemy.enemy().meta["SirL.partyEscapeDrops"]){
				escapedDropItems = SirL.MPRewardsForEscaping.makeItemsForEscape(enemy,"Drops")
			}
			return r.concat(escapedDropItems);
		},[]),
		lostItems: $gameTroop.members().reduce(function(r,enemy){
			escapedLostItems = []
			if(enemy.enemy().meta["SirL.partyEscapeTakes"]){
				escapedLostItems = SirL.MPRewardsForEscaping.makeItemsForEscape(enemy,"Takes")
			}
			return r.concat(escapedLostItems);
		},[])
	}
	
	BM.displayRewards();
	BM.gainRewards();
	SirL.MPRewardsForEscaping.loseRewards(BM._rewards.lostItems);
}
SirL.MPRewardsForEscaping.makeItemsForEscape = function(enemy,listType) {
    const rate = enemy.dropItemRate();
	kinds = [,"Item","Weapon","Armor"]
	drops = SirL.MPCore.toList(enemy.enemy().meta["SirL.partyEscape"+listType])
    return drops.reduce((r, di) => {
		di.kind = kinds.indexOf(di.type)
        if (di.kind > 0 && Math.random() * di.probability < rate) {
            return r.concat(enemy.itemObject(di.kind, di.id));
        } else {
            return r;
        }
    }, []);
}
SirL.MPRewardsForEscaping.loseRewards = function(lostItems) {
	if (lostItems.length > 0) {
		$gameMessage.newPage();
		for (const item of lostItems) {
			$gameParty.gainItem(item, -1, SirL.MPCore.toBoolean(PluginManager.parameters(SirL.MP69$14$34.pluginName)["RewardsForEscaping.includeEquip"]));
			$gameMessage.add(PluginManager.parameters(SirL.MP69$14$34.pluginName)["RewardsForEscaping.lostItem"].format(item.name));
		}
    }
}
BattleManager.onEscapeSuccess = function() {
	this.displayEscapeSuccessMessage();
	SirL.MPRewardsForEscaping.escapeRewards(this)
	this._escaped = true;
	this.processAbort();
};
SirL.MPCore.toList = function(string){
	return JSON.parse(string)
};
SirL.MPCore.toBoolean = function(string){
	return Boolean(JSON.parse(string))
};
