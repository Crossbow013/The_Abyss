//=============================================================================
// Trilobytes - Limited Shop Stock
// TLB_LimitedShopStock.js
//=============================================================================

var Imported = Imported || {};
Imported.TLB_LimitedShopStock = true;

var TLB = TLB || {};
TLB.LimitedShopStock ??= {};
TLB.LimitedShopStock.version = 1.00;

/*:
 * @target MZ
 * @plugindesc This plugin adds limited inventory to shops.
 * @author John Clifford/Trihan
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to set up limited stock for shops in events. There
 * are various plugin commands to control stock, including setting quantities
 * of items, weapons and armours; adding to existing stock; and removing items
 * from stock.
 *
 * Note that due to the way the plugin is designed, you are free to place your
 * shop setup plugin commands above your shop processing command in the same
 * event. This will not cause the stock to reset when the shop is revisited.
 *
 * Be aware that selling an item to a shop that is set up for limited stock
 * of that item will increase its inventory by the number you sold.
 *
 * IMPORTANT: you do not have to include limited items in your shop processing
 * command; any items you select in the plugin commands will be added to the
 * goods list automatically for you. If you do include an item in the actual
 * shop, it will start selling as a normal item once sold out (if you selected
 * "remove from sale if sold out" from the parameters for the item).
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following plugin commands are available for this plugin via the "Plugin
 * Command" event command.
 *
 * Set Shop Stock
 *   Set up a limited-stock shop.
 *
 *   Map ID:
 *   - Map ID on which the shop event is located (0 for current map).
 *
 *   Event ID:
 *   - ID of the shop event (0 for current event).
 *
 *   Items:
 *   - List of items the shop has.
 *
 *     Item ID:
 *     - The item the shop will sell.
 *
 *     Quantity:
 *     - The number of the item the shop will start with.
 *
 *     Price Type:
 *     - Determine whether to use the database price or the specified value
 *       below.
 *       
 *       - Standard (database)
 *       - Specified value
 *
 *     Specific Price:
 *     - Price to sell item for if "Specified value" is selected (has no effect
 *       otherwise)
 *
 *   Weapons:
 *   - List of weapons the shop has.
 *
 *     (structure as above)
 *
 *   Armours:
 *   - List of armours the shop has.
 *
 *     (structure as above)
 *
 * Add to Stock
 *   Add items to an existing shop.
 *
 *   Map ID:
 *   - Map ID on which the shop event is located (0 for current map).
 *
 *   Event ID:
 *   - ID of the shop event (0 for current event).
 *
 *   Items:
 *   - List of items the shop will gain.
 *
 *     Item ID:
 *     - The item the shop will add to.
 *
 *     Quantity:
 *     - The number of the item the shop will gain.
 *
 *   Weapons:
 *   - List of weapons the shop will gain.
 *
 *     (structure as above)
 *
 *   Armours:
 *   - List of armours the shop will gain.
 *
 *     (structure as above)
 *
 * Add to Stock (with price setting)
 *   Add items to an existing shop, includes settings for price.
 *
 *   Map ID:
 *   - Map ID on which the shop event is located (0 for current map).
 *
 *   Event ID:
 *   - ID of the shop event (0 for current event).
 *
 *   Items:
 *   - List of items the shop will gain.
 *
 *     Item ID:
 *     - The item the shop will add to.
 *
 *     Quantity:
 *     - The number of the item the shop will gain.
 *
 *     Price Type:
 *     - Determine whether to use the database price or the specified value
 *       below.
 *       
 *       - Standard (database)
 *       - Specified value
 *
 *     Specific Price:
 *     - Price to sell item for if "Specified value" is selected (has no effect
 *       otherwise)
 *
 *   Weapons:
 *   - List of weapons the shop will gain.
 *
 *     (structure as above)
 *
 *   Armours:
 *   - List of armours the shop will gain.
 *
 *     (structure as above)
 *
 * Remove from Stock
 *   Remove items from an existing shop.
 *
 *   Map ID:
 *   - Map ID on which the shop event is located (0 for current map).
 *
 *   Event ID:
 *   - ID of the shop event (0 for current event).
 *
 *   Items:
 *   - List of items the shop will lose.
 *
 *     Item ID:
 *     - The item the shop will remove from.
 *
 *     Quantity:
 *     - The number of the item the shop will lose.
 *
 *     Remove From Sale if Sold Out?
 *     - Removes the item from stock if it reaches 0. Selling that item to the
 *       shop will no longer restock it.
 *
 *       - Remove from sale (true)
 *       - Keep in list (false)
 * 
 *   Weapons:
 *   - List of weapons the shop will lose.
 *
 *     (structure as above)
 *
 *   Armours:
 *   - List of armours the shop will lose.
 *
 *     (structure as above)
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 * Stock Text
 *   The string to display after an item's name to show its remaining stock
 *   (%1 for quantity)
 *   Default: "(%1 left)"
 *
 * Sold Out Text
 *   The string to display when an item has 0 stock remaining.
 *   Default: "(SOLD OUT)"
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished plugin!
 *
 * @param general
 * @text General Settings
 *
 * @param stockText
 * @parent general
 * @text Stock Text
 * @desc The string to display after an item's name to show its remaining stock (%1 for quantity).
 * @default (%1 left)
 *
 * @param soldOutText
 * @parent general
 * @text Sold Out Text
 * @desc The string to display when an item has 0 stock remaining.
 * @default (SOLD OUT)
 *
 * @command setStock
 * @text Set Shop Stock
 * @desc Set up a limited-stock shop.
 *
 * @arg mapId
 * @type number
 * @min 0
 * @default 0
 * @text Map ID
 * @desc Map ID on which the shop event is located (0 for current map).
 *
 * @arg eventId
 * @type number
 * @min 0
 * @default 0
 * @text Event ID
 * @desc ID of the shop event (0 for current event).
 *
 * @arg items
 * @type struct<item>[]
 * @text Items
 * @desc List of items the shop has.
 *
 * @arg weapons
 * @type struct<weapon>[]
 * @text Weapons
 * @desc List of weapons the shop has.
 *
 * @arg armours
 * @type struct<armour>[]
 * @text Armours
 * @desc List of armours the shop has.
 *
 * @command addStock
 * @text Add to Stock
 * @desc Add items to an existing shop.
 *
 * @arg mapId
 * @type number
 * @min 0
 * @default 0
 * @text Map ID
 * @desc Map ID on which the shop event is located (0 for current map).
 *
 * @arg eventId
 * @type number
 * @min 0
 * @default 0
 * @text Event ID
 * @desc ID of the shop event (0 for current event).
 *
 * @arg items
 * @type struct<itemAdd>[]
 * @text Items
 * @desc List of items the shop will gain.
 *
 * @arg weapons
 * @type struct<weaponAdd>[]
 * @text Weapons
 * @desc List of weapons the shop will gain.
 *
 * @arg armours
 * @type struct<armourAdd>[]
 * @text Armours
 * @desc List of armours the shop will gain.
 *
 * @command addStockWithPrice
 * @text Add to Stock (with price setting)
 * @desc Add items to an existing shop, includes settings for price.
 *
 * @arg mapId
 * @type Number
 * @min 0
 * @default 0
 * @text Map ID
 * @desc Map ID on which the shop event is located (0 for current map).
 *
 * @arg eventId
 * @type number
 * @min 0
 * @default 0
 * @text Event ID
 * @desc ID of the shop event (0 for current event).
 *
 * @arg items
 * @type struct<itemAddWithPrice>[]
 * @text Items
 * @desc List of items the shop will gain.
 *
 * @arg weapons
 * @type struct<weaponAddWithPrice>[]
 * @text Weapons
 * @desc List of weapons the shop will gain.
 *
 * @arg armours
 * @type struct<armourAddWithPrice>[]
 * @text Armours
 * @desc List of armours the shop will gain.
 *
 * @command removeStock
 * @text Remove from Stock
 * @desc Remove items from an existing shop.
 *
 * @arg mapId
 * @type number
 * @min 0
 * @default 0
 * @text Map ID
 * @desc Map ID on which the shop event is located (0 for current map).
 *
 * @arg eventId
 * @type number
 * @min 0
 * @default 0
 * @text Event ID
 * @desc ID of the shop event (0 for current event).
 *
 * @arg items
 * @type struct<itemRemove>[]
 * @text Items
 * @desc List of items the shop will lose.
 *
 * @arg weapons
 * @type struct<weaponRemove>[]
 * @text Weapons
 * @desc List of weapons the shop will lose.
 *
 * @arg armours
 * @type struct<armourRemove>[]
 * @text Armours
 * @desc List of armours the shop will lose.
 *
 * @command changePrices
 * @text Change Prices
 * @desc Modify the prices of items the shop is selling. Will have no effect if the item doesn't have stock set up in that shop.
 *
 * @arg mapId
 * @type number
 * @min 0
 * @default 0
 * @text Map ID
 * @desc Map ID on which the shop event is located (0 for current map).
 *
 * @arg eventId
 * @type number
 * @min 0
 * @default 0
 * @text Event ID
 * @desc ID of the shop event (0 for current event).
 *
 * @arg items
 * @type struct<itemPriceChange>[]
 * @text Items
 * @desc List of items to change the prices of.
 *
 * @arg weapons
 * @type struct<weaponPriceChange>[]
 * @text Weapons
 * @desc List of weapons to change the prices of.
 *
 * @arg armours
 * @type struct<armourPriceChange>[]
 * @text Armours
 * @desc List of armours to change the prices of.
 */
/*~struct~item:
 * @param item
 * @type item
 * @text Item ID
 * @desc The item the shop will sell.
 * @default 1
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity
 * @desc The number of the item the shop will start with.
 * @default 1
 *
 * @param priceType
 * @type select
 * @option Standard (database)
 * @value standard
 * @option Specified value
 * @value specified
 * @text Price Type
 * @desc Determine whether to use the database price or the specified value below.
 * @default standard
 *
 * @param price
 * @type number
 * @min 0
 * @text Specific Price
 * @desc Price to sell item for if "Specified value" is selected (has no effect otherwise)
 * @default 0
 */
 /*~struct~itemAdd:
 * @param item
 * @type item
 * @text Item ID
 * @desc The item the shop will add to.
 * @default 1
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity
 * @desc The number of the item the shop will gain.
 * @default 1
 */
 /*~struct~itemAddWithPrice:
 * @param item
 * @type item
 * @text Item ID
 * @desc The item the shop will add to.
 * @default 1
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity
 * @desc The number of the item the shop will gain.
 * @default 1
 *
 * @param priceType
 * @type select
 * @option Standard (database)
 * @value standard
 * @option Specified value
 * @value specified
 * @text Price Type
 * @desc Determine whether to use the database price or the specified value below.
 * @default standard
 *
 * @param price
 * @type number
 * @min 0
 * @text Specific Price
 * @desc Price to sell item for if "Specified value" is selected (has no effect otherwise)
 * @default 0
 */
 /*~struct~itemRemove:
 * @param item
 * @type item
 * @text Item ID
 * @desc The item the shop will remove from.
 * @default 1
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity
 * @desc The number of the item the shop will lose.
 * @default 1
 *
 * @param removeIfSoldOut
 * @type boolean
 * @on Remove from sale
 * @off Keep in list
 * @text Remove From Sale if Sold Out?
 * @desc Removes the item from stock if it reaches 0. Selling that item to the shop will no longer restock it.
 * @default false
 */
/*~struct~itemPriceChange:
 * @param item
 * @type item
 * @text Item ID
 * @desc The item the shop will change the price of.
 * @default 1
 *
 * @param priceType
 * @type select
 * @option Standard (database)
 * @value standard
 * @option Specified value
 * @value specified
 * @text Price Type
 * @desc Determine whether to use the database price or the specified value below.
 * @default standard
 *
 * @param price
 * @type number
 * @min 0
 * @text Specific Price
 * @desc Price to sell item for if "Specified value" is selected (has no effect otherwise)
 * @default 0
 */
/*~struct~weapon:
 * @param weapon
 * @type weapon
 * @text Weapon ID
 * @desc The weapon the shop will sell.
 * @default 1
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity
 * @desc the number of the weapon the shop will start with.
 * @default 1
 *
 * @param priceType
 * @type select
 * @option Standard (database)
 * @value standard
 * @option Specified value
 * @value specified
 * @text Price Type
 * @desc Determine whether to use the database price or the specified value below.
 * @default standard
 *
 * @param price
 * @type number
 * @min -1
 * @text Price
 * @desc Price to sell weapon for if "Specified value" is selected (has no effect otherwise)
 * @default 0
 */
 /*~struct~weaponAdd:
 * @param weapon
 * @type weapon
 * @text Weapon ID
 * @desc The weapon the shop will add to.
 * @default 1
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity
 * @desc The number of the weapon the shop will gain.
 * @default 1
 */
 /*~struct~weaponRemove:
 * @param weapon
 * @type weapon
 * @text Weapon ID
 * @desc The weapon the shop will remove from.
 * @default 1
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity
 * @desc The number of the weapon the shop will lose.
 * @default 1
 *
 * @param removeIfSoldOut
 * @type boolean
 * @on Remove from sale
 * @off Keep in list
 * @text Remove From Sale if Sold Out?
 * @desc Removes the weapon from stock if it reaches 0. Selling that weapon to the shop will no longer restock it.
 * @default false
 */
/*~struct~weaponPriceChange:
 * @param weapon
 * @type weapon
 * @text Weapon ID
 * @desc The weapon the shop will change the price of.
 * @default 1
 *
 * @param priceType
 * @type select
 * @option Standard (database)
 * @value standard
 * @option Specified value
 * @value specified
 * @text Price Type
 * @desc Determine whether to use the database price or the specified value below.
 * @default standard
 *
 * @param price
 * @type number
 * @min 0
 * @text Specific Price
 * @desc Price to sell weapon for if "Specified value" is selected (has no effect otherwise)
 * @default 0
 */
 /*~struct~armour:
 * @param armour
 * @type armor
 * @text Armour ID
 * @desc The armour the shop will sell.
 * @default 1
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity
 * @desc the number of the armour the shop will start with.
 * @default 1
 *
 * @param priceType
 * @type select
 * @option Standard (database)
 * @value standard
 * @option Specified value
 * @value specified
 * @text Price Type
 * @desc Determine whether to use the database price or the specified value below.
 * @default standard
 *
 * @param price
 * @type number
 * @min 0
 * @text Price
 * @desc Price to sell armour for if "Specified value" is selected (has no effect otherwise)
 * @default 0
 */
 /*~struct~armourAdd:
 * @param armour
 * @type armour
 * @text Armour ID
 * @desc The armour the shop will add to.
 * @default 1
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity
 * @desc The number of the armour the shop will gain.
 * @default 1
 */
 /*~struct~armourRemove:
 * @param armour
 * @type armour
 * @text Armour ID
 * @desc The armour the shop will remove from.
 * @default 1
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity
 * @desc The number of the armour the shop will lose.
 * @default 1
 *
 * @param removeIfSoldOut
 * @type boolean
 * @on Remove from sale
 * @off Keep in list
 * @text Remove From Sale if Sold Out?
 * @desc Removes the armour from stock if it reaches 0. Selling that armour to the shop will no longer restock it.
 * @default false
 */
/*~struct~armourPriceChange:
 * @param armour
 * @type armour
 * @text Armour ID
 * @desc The armour the shop will change the price of.
 * @default 1
 *
 * @param priceType
 * @type select
 * @option Standard (database)
 * @value standard
 * @option Specified value
 * @value specified
 * @text Price Type
 * @desc Determine whether to use the database price or the specified value below.
 * @default standard
 *
 * @param price
 * @type number
 * @min 0
 * @text Specific Price
 * @desc Price to sell armour for if "Specified value" is selected (has no effect otherwise)
 * @default 0
 */
	
var parameters = PluginManager.parameters('TLB_LimitedShopStock');
TLB.Param ??= {};
TLB.Param.LSS ??= {};

for (const param in parameters) {
	TLB.Param.LSS[param] = parameters[param];
}

PluginManager.registerCommand('TLB_LimitedShopStock', 'setStock', args => {
	const mapId = Number(args.mapId) > 0 ? Number(args.mapId) : $gameMap._mapId;
	const eventId = Number(args.eventId) > 0 ? Number(args.eventId) : $gameMap._interpreter._eventId;
	if (eventId === $gameMap._interpreter._eventId && $gameSystem.shopStock(mapId, eventId).length > 0) return;
	const stock = [];
	if (args.items.length > 0) {
		const items = JSON.parse(args.items);
		for (let item of items) {
			item = JSON.parse(item);
			const priceType = item.priceType === 'standard' ? 0 : 1;
			stock.push({type: 0, id: Number(item.item), quantity: Number(item.quantity), priceType: priceType, price: Number(item.price)});
		}
	}
	if (args.weapons.length > 0) {
		const weapons = JSON.parse(args.weapons);
		for (let weapon of weapons) {
			weapon = JSON.parse(weapon);
			const priceType = weapon.priceType === 'standard' ? 0 : 1;
			stock.push({type: 1, id: Number(weapon.weapon), quantity: Number(weapon.quantity), priceType: priceType, price: Number(weapon.price)});
		}
	}
	if (args.armours.length > 0) {
		const armours = JSON.parse(args.armours);
		for (let armour of armours) {
			armour = JSON.parse(armour);
			const priceType = armour.priceType === 'standard' ? 0 : 1;
			stock.push({type: 2, id: Number(armour.armour), quantity: Number(armour.quantity), priceType: priceType, price: Number(armour.price)});
		}
	}
	$gameSystem.setShopStock(mapId, eventId, stock);
});

PluginManager.registerCommand('TLB_LimitedShopStock', 'addStock', args => {
	const mapId = Number(args.mapId) > 0 ? Number(args.mapId) : $gameMap._mapId;
	const eventId = Number(args.eventId) > 0 ? Number(args.eventId) : $gameMap._interpreter._eventId;
	const stock = [];
	if (args.items.length > 0) {
		const items = JSON.parse(args.items);
		for (let item of items) {
			item = JSON.parse(item);
			let priceType;
			let price;
			const stockItem = { type: 0, id: Number(item.item), quantity: Number(item.quantity) };
			if (item.priceType) {
				if (item.priceType === 'standard') stockItem.priceType = 0;
				else {
					stockItem.priceType = 1;
					stockItem.price = Number(item.price);
				}
			}
			stock.push(stockItem);
		}
	}
	if (args.weapons.length > 0) {
		const weapons = JSON.parse(args.weapons);
		for (let weapon of weapons) {
			weapon = JSON.parse(weapon);
			let priceType;
			let price;
			const stockItem = { type: 1, id: Number(weapon.weapon), quantity: Number(weapon.quantity) };
			if (weapon.priceType) {
				if (weapon.priceType === 'standard') stockItem.priceType = 0;
				else {
					stockItem.priceType = 1;
					stockItem.price = Number(weapon.price);
				}
			}
			stock.push(stockItem);
		}
	}
	if (args.armours.length > 0) {
		const armours = JSON.parse(args.armours);
		for (const armour of armours) {
			armour = JSON.parse(armour);
			let priceType;
			let price;
			const stockItem = { type: 2, id: Number(armour.armour), quantity: Number(armour.quantity) };
			if (armour.priceType) {
				if (armour.priceType === 'standard') stockItem.priceType = 0;
				else {
					stockItem.priceType = 1;
					stockItem.price = Number(armour.price);
				}
			}
			stock.push(stockItem);
		}
	}
	$gameSystem.addShopStock(mapId, eventId, stock);
});

PluginManager.registerCommand('TLB_LimitedShopStock', 'addStockWithPrice', args => {
	const mapId = Number(args.mapId) > 0 ? Number(args.mapId) : $gameMap._mapId;
	const eventId = Number(args.eventId) > 0 ? Number(args.eventId) : $gameMap._interpreter._eventId;
	const stock = [];
	if (args.items.length > 0) {
		const items = JSON.parse(args.items);
		for (let item of items) {
			item = JSON.parse(item);
			stock.push({ type: 0, id: Number(item.item), quantity: Number(item.quantity), priceType: item.priceType, price: Number(item.price) });
		}
	}
	if (args.weapons.length > 0) {
		const weapons = JSON.parse(args.weapons);
		for (let weapon of weapons) {
			weapon = JSON.parse(weapon);
			stock.push({ type: 1, id: Number(weapon.weapon), quantity: Number(weapon.quantity), priceType: weapon.priceType, price: Number(weapon.price) });
		}
	}
	if (args.armours.length > 0) {
		const armours = JSON.parse(args.armours);
		for (const armour of armours) {
			armour = JSON.parse(armour);
			stock.push({ type: 2, id: Number(armour.armour), quantity: Number(armour.quantity), priceType: armour.priceType, price: Number(armour.price) });
		}
	}
	$gameSystem.addShopStock(mapId, eventId, stock);
});

PluginManager.registerCommand('TLB_LimitedShopStock', 'removeStock', args => {
	const mapId = Number(args.mapId) > 0 ? Number(args.mapId) : $gameMap._mapId;
	const eventId = Number(args.eventId) > 0 ? Number(args.eventId) : $gameMap._interpreter._eventId;
	const stock = [];
	if (args.items.length > 0) {
		const items = JSON.parse(args.items);
		for (let item of items) {
			item = JSON.parse(item);
			stock.push({ type: 0, id: Number(item.item), quantity: Number(item.quantity), removeIfSoldOut: eval(item.removeIfSoldOut) });
		}
	}
	if (args.weapons.length > 0) {
		const weapons = JSON.parse(args.weapons);
		for (let weapon of weapons) {
			weapon = JSON.parse(weapon);
			stock.push({ type: 1, id: Number(weapon.weapon), quantity: Number(weapon.quantity), removeIfSoldOut: eval(weapon.removeIfSoldOut) });
		}
	}
	if (args.armours.length > 0) {
		const armours = JSON.parse(args.armours);
		for (const armour of armours) {
			armour = JSON.parse(armour);
			stock.push({ type: 2, id: Number(armour.armour), quantity: Number(armour.quantity), removeIfSoldOut: eval(armour.removeIfSoldOut) });
		}
	}
	$gameSystem.removeShopStock(mapId, eventId, stock);
});

PluginManager.registerCommand('TLB_LimitedShopStock', 'changePrices', args => {
	const mapId = Number(args.mapId) > 0 ? Number(args.mapId) : $gameMap._mapId;
	const eventId = Number(args.eventId) > 0 ? Number(args.eventId) : $gameMap._interpreter._eventId;
	if (args.items.length > 0) {
		const items = JSON.parse(args.items);
		for (let item of items) {
			item = JSON.parse(item);
			const key = [mapId, eventId, 0, Number(item.item)];
			if ($gameSystem.getShopStock(key)) {
				const priceType = item.priceType === 'standard' ? 0 : 1;
				$gameSystem._shopStock[key].priceType = priceType;
				$gameSystem._shopStock[key].price = Number(item.price);
			}
		}
	}
	if (args.weapons.length > 0) {
		const weapons = JSON.parse(args.weapons);
		for (let weapon of weapons) {
			weapon = JSON.parse(weapon);
			const key = [mapId, eventId, 1, Number(weapon.weapon)];
			if ($gameSystem.getShopStock(key)) {
				const priceType = weapon.priceType === 'standard' ? 0 : 1;
				$gameSystem._shopStock[key].priceType = priceType;
				$gameSystem._shopStock[key].price = Number(weapon.price);
			}
		}
	}
	if (args.armours.length > 0) {
		const items = JSON.parse(args.armours);
		for (let armour of armours) {
			armour = JSON.parse(armour);
			const key = [mapId, eventId, 2, Number(armour.armour)];
			if ($gameSystem.getShopStock(key)) {
				const priceType = armour.priceType === 'standard' ? 0 : 1;
				$gameSystem._shopStock[key].priceType = priceType;
				$gameSystem._shopStock[key].price = Number(armour.price);
			}
		}
	}
});
	
TLB.LimitedShopStock.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	TLB.LimitedShopStock.Game_System_initialize.apply(this, arguments);
	this._shopStock = {};
};

Game_System.prototype.shopStock = function(mapId, eventId) {
	return Object.keys(this._shopStock).map(key => key.split(",")).map(element => element.map(value => Number(value))).filter(key => key[0] === mapId && key[1] === eventId);
};

Game_System.prototype.setShopStock = function(mapId, eventId, items) {
	for (const item of items) {
		const key = [mapId, eventId, item.type, item.id];
		this._shopStock[key] = { quantity: item.quantity, priceType: item.priceType, price: item.price };
	}
};

Game_System.prototype.isLimitedStock = function(key) {
	return this._shopStock[key] !== undefined;
};

Game_System.prototype.isLimitedItemStock = function(item) {
	const type = item.itypeId ? 0 : item.wtypeId ? 1 : item.atypeId ? 2 : -1;
	return this.isLimitedStock([$gameMap.mapId(), $gameMap._interpreter._eventId, type, item.id]);
};

Game_System.prototype.addShopStock = function(mapId, eventId, items) {
	for(const item of items) {
		const key = [mapId, eventId, item.type, item.id];
		if (this.getShopStock(key)) {
			this._shopStock[key].quantity += item.quantity;
		} else {
			const priceType = item.priceType ? item.priceType : 0;
			const price = item.price ? item.price : 0;
			this._shopStock[key] = { quantity: item.quantity, priceType: priceType, price: price };
		}
	}
};

Game_System.prototype.checkShopStock = function(key) {
	return this._shopStock[key]?.quantity > 0;
};

Game_System.prototype.checkItemStock = function(item) {
	const type = item.itypeId ? 0 : item.wtypeId ? 1 : item.atypeId ? 2 : -1;
	return this.checkShopStock([$gameMap.mapId(), $gameMap._interpreter._eventId, type, item.id]);
};

Game_System.prototype.getShopStock = function(key) {
	return this._shopStock[key];
};

Game_System.prototype.getItemStock = function(item) {
	const type = item.itypeId ? 0 : item.wtypeId ? 1 : item.atypeId ? 2 : -1;
	return this.getShopStock([$gameMap.mapId(), $gameMap._interpreter._eventId, type, item.id]);
};

Game_System.prototype.removeShopStock = function(mapId, eventId, items) {
	for (const item of items) {
		const key = [mapId, eventId, item.type, item.id];
		if (this.getShopStock(key)) {
			this._shopStock[key].quantity -= item.quantity;
			if (!this.checkShopStock(key)) {
				if (item.removeIfSoldOut) delete this._shopStock[key];
				else this._shopStock[key].quantity = 0; 
			}
		}
	}
};

TLB.LimitedShopStock.Window_ShopBuy_drawItem = Window_ShopBuy.prototype.drawItem;
Window_ShopBuy.prototype.drawItem = function(index) {
	TLB.LimitedShopStock.Window_ShopBuy_drawItem.call(this, index);
	const item = this._data[index];
	if ($gameSystem.isLimitedItemStock(item)) {
		this.changePaintOpacity(this.isEnabled(item));
		const rect = this.itemRect(index);
		rect.x += ImageManager.iconWidth + this.textWidth(item.name) + this.itemPadding() + 20;
		rect.y += 2;
		const stock = $gameSystem.getItemStock(item).quantity || 0;
		this.drawText(stock > 0 ? TLB.Param.LSS.stockText.format(stock) : TLB.Param.LSS.soldOutText, rect.x, rect.y, this.contentsWidth());
		this.changePaintOpacity(true);
	}
};

TLB.LimitedShopStock.Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
Window_ShopBuy.prototype.isEnabled = function(item) {
	return TLB.LimitedShopStock.Window_ShopBuy_isEnabled.call(this, item) && ($gameSystem.isLimitedItemStock(item) ? $gameSystem.checkItemStock(item) : true);
};

TLB.LimitedShopStock.Scene_Shop_prepare = Scene_Shop.prototype.prepare;
Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
	const limitedItems = $gameSystem.shopStock($gameMap.mapId(), $gameMap._interpreter._eventId);
	for (const item of limitedItems) {
		const stockItem = $gameSystem.getShopStock(item);
		goods.push([item[2], item[3], stockItem.priceType, stockItem.price]);
	}
	TLB.LimitedShopStock.Scene_Shop_prepare.call(this, goods, purchaseOnly);
};

TLB.LimitedShopStock.Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
Scene_Shop.prototype.maxBuy = function() {
	const max = TLB.LimitedShopStock.Scene_Shop_maxBuy.call(this);
	const item = this._item;
	const type = item.itypeId ? 0 : item.wtypeId ? 1 : item.atypeId ? 2 : -1;
	const key = [$gameMap.mapId(), $gameMap._interpreter._eventId, type, this._item.id];
	if ($gameSystem.isLimitedItemStock(item)) {
		return Math.min(max, $gameSystem.getItemStock(item).quantity);
	} else {
		return max;
	}
};

TLB.LimitedShopStock.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
	TLB.LimitedShopStock.Scene_Shop_doBuy.call(this, number);
	const item = this._item;
	const type = item.itypeId ? 0 : item.wtypeId ? 1 : item.atypeId ? 2 : -1;
	if ($gameSystem.isLimitedItemStock(item)) {
		$gameSystem.removeShopStock($gameMap.mapId(), $gameMap._interpreter._eventId, [ { id: this._item.id, type: type, quantity: number } ]);
	}
};

TLB.LimitedShopStock.Scene_Shop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
	TLB.LimitedShopStock.Scene_Shop_doSell.call(this, number);
	const item = this._item;
	const type = item.itypeId ? 0 : item.wtypeId ? 1 : item.atypeId ? 2 : -1;
	if ($gameSystem.isLimitedItemStock(item)) {
		$gameSystem.addShopStock($gameMap.mapId(), $gameMap._interpreter._eventId, [ { id: this._item.id, type: type, quantity: number } ]);
		this._buyWindow.refresh();
	}
};

