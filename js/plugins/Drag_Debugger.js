//=============================================================================
// Drag_Debugger.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v0.10) A plugin to add a debugger window during your playtest.
 * @author Drag
 *
 * @url https://discord.gg/ckYyc8hHGb
 *
 * @help 
  * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
 * A question, a suggestion, an issue ? Please join me on my dedicated
 * discord server thanks to the dedicated link above.
 *
 * --------------------------------WARNING-------------------------------- 
 *
 * In order for this plugin to work as intended, please, make sure that
 * the file "Drag_Debugger.js" is located into the "/js/plugins/" folder
 * of your project and that the file "Drag_DevTools_index.html" is located
 * at the root of your project, next to the "game.rmmzproject" file.
 *
 * This plugin will open up a new window at the start of your playtest, 
 * where data from your game will be displayed, like switch, variables or
 * events, updated in real time during your playtest.
 *
 * ⚠ Be aware that even though you can edit most of the values displayed
 * in the debugger window, like the content of a Show Text event command, 
 * nothing will be saved in your files and you'll have to make thoses changes 
 * in your editor as well if you want to keep them. 
 * This debugger is only intended to make your playtest session easier and/or 
 * faster and will not replace the editor in any way. ⚠
 *
 * Special thanks to :
 * Doro, Drifty, Tea for your support, your bug test, your help ❤
 * Trihan for the autorun warning script.
 *
 * You guys/ladies are awesome !
 *
 * @param lightMode
 * @type select
 * @text Light Mode
 * @option Light
 * @value light
 * @option Dark
 * @value dark
 * @default dark
 */
 
var Imported = Imported || {};
Imported.Drag_Debugger = true;

var Drag = Drag || {};
Drag.Debugger ??= {};
Drag.Debugger.alias ??= {};
Drag.Debugger.version = 0.10;


(function() {
	
	//------------------------------------------------------------------------------------------------------------
	// global variables
	
	Drag.Debugger.pluginName = "Drag_Debugger";
	Drag.Debugger.nwWindowPath = "Drag_DevTools_index.html"; 
	Drag.Debugger.nwWindowName = "Drag's DevTools"
	Drag.Debugger.grid = null;
	Drag.Debugger.collisions = null;
	Drag.Debugger.regionIds = null;
	
	//-----------------------------------------------------------------------------
	// plugin parameters
	
    Drag.Debugger.params = PluginManager.parameters(Drag.Debugger.pluginName) || null;
	if (Drag.Debugger.params) {
		Drag.Debugger.params.lightMode = Drag.Debugger.params.lightMode || "dark";
	}
	
	//------------------------------------------------------------------------------------------------------------
	// plugin command	
	
	//------------------------------------------------------------------------------------------------------------
	// Scene Manager

	SceneManager.openDebugger = function() { 
		try {
			if ($gameTemp.isPlaytest() && !Drag.windowHandler) {
				const fs = require('fs')
				if (fs.existsSync(Drag.Debugger.nwWindowPath)) {
					console.log("Debugger opened by : " + Drag.Debugger.pluginName);
					Drag.windowHandler = window.open(Drag.Debugger.nwWindowPath, Drag.Debugger.nwWindowName,"dependent=1, menubar=1, resizable=1, width=415, height=750, top=" + window.screenTop + ", left=" + (window.screenLeft - 450));
					
					const GUI = require('nw.gui');
					GUI.Window.get().on('close', function() {
						GUI.App.closeAllWindows();
						GUI.App.quit();
					});
					
					Drag.windowHandler.blur();
					nw.Window.get().focus();
					
				} else { 
					console.error(`Couldn't open NWJS Tileset Window. ${Drag.Debugger.nwWindowPath} file does not exist or is not in the right place.`);
				}
			}
		} catch(err) {
			console.error(err);
		}
		
	};
	
	Drag.Debugger.alias.SceneManager_updateMain = SceneManager.updateMain;
	SceneManager.updateMain = function() {
		Drag.Debugger.alias.SceneManager_updateMain.call(this);
		if (Drag?.windowHandler?.requestRefreshView && !Drag.windowHandler.closed)
			Drag.windowHandler.requestRefreshView();
		Drag.Debugger.updateAllElements(true, true);
	};
	
	Drag.Debugger.alias.SceneManager_terminate = SceneManager.terminate;
	SceneManager.terminate = function() {
		const GUI = require('nw.gui');
		GUI.App.closeAllWindows();
		GUI.App.quit();
	};

	SceneManager.catchUnknownError = function(e) {
		Graphics.printError("UnknownError", String(e), e);
		AudioManager.stopAll();
	};
	
	SceneManager.getCurrentScene = function() {
		return this._scene;
	};
	
	//---------------------------------------------------------------------------------------------------------
	// Graphics
	
	Graphics._makeErrorHtml = function(name, message , error) {
		let stack = error?.stack.replace(/\n/gm, "").replace(/(  {2,}?)/gm, "<br>").replace(/(chrome)(.*?)(?=\/js)/gm, "").replace(/(\(\/js)/gm, "<b>(/js").replace(/(\)<br>)/gm, ")</b><br>");
		const nameDiv = document.createElement("div");
		const messageDiv = document.createElement("div");
		const stackDiv = document.createElement("div");
		nameDiv.id = "errorName";
		messageDiv.id = "errorMessage";
		stackDiv.id = "errorStack";
		nameDiv.innerHTML = Utils.escapeHtml(name || "");
		messageDiv.innerHTML = Utils.escapeHtml(message || "");
		stackDiv.innerHTML = stack || "";
		return nameDiv.outerHTML + messageDiv.outerHTML + stackDiv.outerHTML;
	};
	
	Graphics._updateErrorPrinter = function() {
		this._errorPrinter.style.width = "100%";
		this._errorPrinter.style.height = "auto";
		this._errorPrinter.style.padding = "10px";
		this._errorPrinter.style.boxSizing = "border-box";
		this._errorPrinter.style.fontSize = "20px";
		this._errorPrinter.style.lineHeight = "28px";
	};
	
	Drag.Debugger.alias._Graphics_updateAllElements = Graphics._updateAllElements;
	Graphics._updateAllElements = function() {
		Drag.Debugger.alias._Graphics_updateAllElements.call(this);
		Drag.Debugger.updateAllElements(false, true);
	};
	
	Drag.Debugger.alias._Graphics_createAllElements = Graphics._createAllElements;
	Graphics._createAllElements = function() {
		Drag.Debugger.alias._Graphics_createAllElements.call(this);
		Drag.Debugger.createAllElements();
	};
	
	//---------------------------------------------------------------------------------------------------------
	// Scene Map
	
	Drag.Debugger.alias._Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
	Scene_Map.prototype.onMapLoaded = function() {
		Drag.Debugger.alias._Scene_Map_onMapLoaded.call(this);
		$dataMap.mapId = $gameMap._mapId;
	};
	
	//---------------------------------------------------------------------------------------------------------
	// Scene Boot
	
	Drag.Debugger.alias._Scene_Boot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function() {
		Drag.Debugger.alias._Scene_Boot_start.call(this);
		SceneManager.openDebugger();
	};
	
	//---------------------------------------------------------------------------------------------------------
	// Game Switches

	Game_Switches.prototype.getName = function(switchId) {
		return $dataSystem.switches[switchId];
	};
	
	//---------------------------------------------------------------------------------------------------------
	// Game Variables
	
	Game_Variables.prototype.getName = function(varId) {
		return $dataSystem.variables[varId];
	};
	
	//---------------------------------------------------------------------------------------------------------
	// Game Event
	
	//Fix crashes if $dataMap is null
	Game_Event.prototype.event = function() {
		return $dataMap?.events?.[this._eventId];
	};
	
	Game_Event.prototype.stop = function() {
		if (this._starting)
			this._starting = false;
		if ($gameMap._interpreter._eventId === this.eventId())
			$gameMap._interpreter.clear();
		if (this._interpreter)
			this._interpreter.clear();
	};
	
	//---------------------------------------------------------------------------------------------------------
	// Game_Interpreter
	
	// Drag.Debugger.alias._Game_Interpreter_executeCommand = Game_Interpreter.prototype.executeCommand;
	// Game_Interpreter.prototype.executeCommand = function() {
		// this.history ??= [];
		// this.history[this._eventId] ??= [];
		// this.history[this._eventId].push(this._index);
		// Drag.Debugger.alias._Game_Interpreter_executeCommand.call(this);
	// };
		
	//------------------------------------------------------------------------------------------------------------
	//plugin functions
	
	Drag.Debugger.createAllElements = function() {
		var styles = `
			:root {
				--tile-width: 48px;
				--graphics-width: 0px;
				--graphics-height: 0px;
				--graphics-realScale: 1;
				--anchor-scrolled-x: 0;
				--anchor-scrolled-y: 0;
			}

			#overCanvas { 
				text-align: center;
				overflow: hidden;
				z-index: 100;
				position: absolute;
				margin: auto;
				top: 0px;
				left: 0px;
				right: 0px;
				bottom: 0px;
				width: calc(var(--graphics-width) * var(--graphics-realScale));
				height: calc(var(--graphics-height) * var(--graphics-realScale));
			}
			
			.vertLine {
				position: absolute;
				top: calc(var(--anchor-scrolled-y) * -1 * var(--tile-width) * var(--graphics-realScale));
				left: calc(var(--x) * var(--tile-width) * var(--graphics-realScale));
				width: 1px;
				height: calc(var(--graphics-height) * var(--graphics-realScale));
				background: black;
				z-index: 101;
			}
			
			.horzLine {
				position: absolute;
				left: calc(var(--anchor-scrolled-x) * -1 * var(--tile-width) * var(--graphics-realScale));
				top: calc(var(--y) * var(--tile-width) * var(--graphics-realScale));
				height: 1px;
				width: calc(var(--graphics-width) * var(--graphics-realScale));
				background: black;
				z-index: 101;
			}
			
			#grid, #collisions, #regionsId {
				position: absolute;
				left: calc(var(--anchor-scrolled-x) * var(--tile-width) * var(--graphics-realScale));
				top: calc(var(--anchor-scrolled-y) * var(--tile-width) * var(--graphics-realScale));
				
			}
			
			.collisionArrow {
				position: absolute;
				width: calc(var(--tile-width) * var(--graphics-realScale));
				height: calc(var(--tile-width) * var(--graphics-realScale));
				font-weight: bold;
				font-size: calc(22px * var(--graphics-realScale));
				z-index: 102;
				text-align: center;
				line-height: calc(var(--tile-width) * var(--graphics-realScale));
				top: calc(var(--y) * var(--tile-width) * var(--graphics-realScale));
				left: calc(var(--x) * var(--tile-width) * var(--graphics-realScale));
			}
			
			.collisionArrow[data-d="2"] > span {
				position: absolute;
				top: 50%;
				transform: translate(-50%, 0px);
			}
			
			.collisionArrow[data-d="2"][data-isPassable="true"] > span::after {
				content: '↓';
			}
			
			.collisionArrow[data-d="4"] > span {
				position: absolute;
				left: -50%;
				transform: translate(50%, 0px);
			}
			
			.collisionArrow[data-d="4"][data-isPassable="true"] > span::after {
				content: '←';
			}
			
			.collisionArrow[data-d="6"] > span {
				position: absolute;
				right: -50%;
				transform: translate(-50%, 0px);
			}
			
			.collisionArrow[data-d="6"][data-isPassable="true"] > span::after {
				content: '→';
			}
			
			.collisionArrow[data-d="8"] > span {
				position: absolute;
				top: -50%;
				left: 50%;
				transform: translate(-50%, 0px);
			}
			
			.collisionArrow[data-d="8"][data-isPassable="true"] > span::after {
				content: '↑';
			}
			
			.regionIdTile {
				position: absolute;
				font-weight: bold;
				font-size: calc(22px * var(--graphics-realScale));
				box-sizing: border-box;
				color: white;
				width: calc(var(--tile-width) * var(--graphics-realScale));
				height: calc(var(--tile-width) * var(--graphics-realScale));
				top: calc(var(--y) * var(--tile-width) * var(--graphics-realScale));
				left: calc(var(--x) * var(--tile-width) * var(--graphics-realScale));
			}
			
			.regionIdTile[data-regionId]:not([data-regionId="0"]) {
				border: 4px solid rgba(255, 255, 255, 0.3);
			}
			
			.regionIdTile::after {
				content: attr(data-regionId);
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				position: absolute;
			}
		`;

		var styleSheet = document.createElement("style");
		styleSheet.innerText = styles;
		document.head.appendChild(styleSheet);
		
		Drag.Debugger.overCanvas = document.createElement("div");
		Drag.Debugger.overCanvas.setAttribute("id", "overCanvas");
		document.body.appendChild(Drag.Debugger.overCanvas);
	};
	
	Drag.Debugger.updateAllElements = function(contentUpdate = false, posUpdate = false) {
		if (contentUpdate)
			this.updateAllContentElements();

		if (posUpdate)
			this.updateAllPosElements();
	};
	
	Drag.Debugger.updateAllContentElements = function() {
		// this.updateGridContent();
		this.updateCollisionsContent();
		this.updateRegionsIdContent();
	};
	
	Drag.Debugger.updateAllPosElements = function() {
		if (!$gameMap || !$dataMap) {
			this.hideGrid();
			this.hideCollisions();
			this.hideRegionsId();
			return;
		}
		
		const anchorScrolledX = $gameMap.adjustX(0);
		if (anchorScrolledX !== Drag.Debugger.anchorScrolledX) {
			Drag.Debugger.anchorScrolledX = anchorScrolledX;
			Drag.Debugger.overCanvas.style.display = "none";
			return;
		}
		
		const anchorScrolledY = $gameMap.adjustY(0);
		if (anchorScrolledY !== Drag.Debugger.anchorScrolledY) {
			Drag.Debugger.anchorScrolledY = anchorScrolledY;
			Drag.Debugger.overCanvas.style.display = "none";
			return;
		}
		
		if (Drag.Debugger.overCanvas.style.display !== "block")
			Drag.Debugger.overCanvas.style.display = "block";	
		
		document.documentElement.style.setProperty('--tile-width', $gameMap.tileWidth() + "px");
		document.documentElement.style.setProperty('--graphics-realScale', Graphics._realScale);
		document.documentElement.style.setProperty('--graphics-width', Graphics.width + "px");
		document.documentElement.style.setProperty('--graphics-height', Graphics.height + "px");
		document.documentElement.style.setProperty("--anchor-scrolled-x", $gameMap.adjustX(0));
		document.documentElement.style.setProperty("--anchor-scrolled-y", $gameMap.adjustY(0));
		
		// this.updateGridPos();
		// this.updateCollisionsPos();
		// this.updateRegionsIdPos();
	};
	
	//--------------------------------------------------
	// grid overlay
		
	Drag.Debugger.toggleGrid = function() {
		if (!Drag.Debugger.grid) 
			this.showGrid();
		else
			this.hideGrid();
	};
	
	Drag.Debugger.showGrid = function() {
		Drag.Debugger.grid = document.createElement("div");
		Drag.Debugger.grid.setAttribute("id", "grid");
		Drag.Debugger.overCanvas.appendChild(Drag.Debugger.grid);
		
		const mapWidth = $gameMap.width();
		for (let x = 0; x <= mapWidth; x++) {
			let line = document.createElement("div");
			line.setAttribute("data-x", x);
			line.style.setProperty('--x', x);
			line.classList.add("vertLine");
			Drag.Debugger.grid.appendChild(line);
		}
		
		const mapHeight = $gameMap.height();
		for (let y = 0; y <= mapHeight; y++) {
			let line = document.createElement("div");
			line.setAttribute("data-y", y);
			line.style.setProperty('--y', y);
			line.classList.add("horzLine");
			Drag.Debugger.grid.appendChild(line);
		}
	};
	
	Drag.Debugger.hideGrid = function() {
		Drag.Debugger.grid?.remove();
		Drag.Debugger.grid = null;
	};
	
	// Drag.Debugger.updateGridContent = function() {
	// };
	
	// Drag.Debugger.updateGridPos = function() {
	// };
	
	//--------------------------------------------------
	// collisions overlay
	
	Drag.Debugger.toggleCollisions = function() {
		if (!Drag.Debugger.collisions)
			this.showCollisions();
		else
			this.hideCollisions();
	};
	
	Drag.Debugger.isPassable = function(x, y, d) {
		const x2 = $gameMap.roundXWithDirection(x, d);
		const y2 = $gameMap.roundYWithDirection(y, d);
		const d2 = 10 - d;
		return ($gameMap.isPassable(x, y, d) && $gameMap.isPassable(x2, y2, d2));
	};
	
	Drag.Debugger.showCollisions = function() {
		const mapWidth = $gameMap.width();
		const mapHeight = $gameMap.height();	
		Drag.Debugger.collisions = document.createElement("div");
		Drag.Debugger.collisions.setAttribute("id", "collisions");
		Drag.Debugger.overCanvas.appendChild(Drag.Debugger.collisions);
		for (let x = 0; x < mapWidth; x++) {
			for (let y = 0; y < mapHeight; y++) {
				for (let d = 2; d < 10; d += 2) {
					const isPassable = this.isPassable(x, y, d);
					let collisionArrow = document.createElement("div");
					collisionArrow.setAttribute("data-x", x);
					collisionArrow.setAttribute("data-y", y);
					collisionArrow.setAttribute("data-d", d);
					collisionArrow.setAttribute("data-isPassable", isPassable);
					collisionArrow.style.setProperty('--x', x);
					collisionArrow.style.setProperty('--y', y);
					collisionArrow.classList.add("collisionArrow");
					Drag.Debugger.collisions.appendChild(collisionArrow);
					collisionArrow.appendChild(document.createElement("span"));
				}
			}
		}
	};
	
	Drag.Debugger.hideCollisions = function() {
		Drag.Debugger.collisions?.remove();
		Drag.Debugger.collisions = null;
	};
	
	Drag.Debugger.updateCollisionsContent = function() {
		if (!Drag.Debugger.collisions || !$dataMap)
			return;
		for (collisionArrow of Drag.Debugger.collisions.childNodes) {
			const x = parseInt(collisionArrow.getAttribute('data-x')) || 0;
			const y = parseInt(collisionArrow.getAttribute('data-y')) || 0;
			const d = parseInt(collisionArrow.getAttribute('data-d')) || 0;
			const currentIsPassable = collisionArrow.getAttribute('data-isPassable') === "true";
			const x2 = $gameMap.roundXWithDirection(x, d);
			const y2 = $gameMap.roundYWithDirection(y, d);
			const d2 = 10 - d;
			const isPassable = $gameMap.isPassable(x, y, d) && $gameMap.isPassable(x2, y2, d2);
			if (currentIsPassable !== isPassable) {
				collisionArrow.setAttribute('data-isPassable', isPassable);
			}
		}
	};
	
	// Drag.Debugger.updateCollisionsPos = function() {
	// };
	
	//--------------------------------------------------
	// regionsId overlay
	
	Drag.Debugger.regionsIdsColours = ["#b46868bf", "#b48e68bf", "#b4b468bf", "#8eb468bf", "#68b468bf", "#68b48ebf", "#68b4b4bf", "#688eb4bf", "#6868b4bf", "#8e68b4bf", "#b468b4bf", "#b4688ebf"];
	
	Drag.Debugger.toggleRegionIds = function() {
		if (!Drag.Debugger.regionsId) 
			this.showRegionsId();
		else
			this.hideRegionsId();
	};
	
	Drag.Debugger.showRegionsId = function() {
		const mapWidth = $gameMap.width();
		const mapHeight = $gameMap.height();	
		Drag.Debugger.regionsId = document.createElement("div");
		Drag.Debugger.regionsId.setAttribute("id", "regionsId");
		Drag.Debugger.overCanvas.appendChild(Drag.Debugger.regionsId);
		for (let x = 0; x < mapWidth; x++) {
			for (let y = 0; y < mapHeight; y++) {
				const regionId = $gameMap.regionId(x, y);
				let regionIdTile = document.createElement("div");
				regionIdTile.setAttribute("data-x", x);
				regionIdTile.setAttribute("data-y", y);
				regionIdTile.style.setProperty('--x', x);
				regionIdTile.style.setProperty('--y', y);
				regionIdTile.setAttribute("data-regionId", regionId);
				regionIdTile.style.background = regionId > 0 ? Drag.Debugger.regionsIdsColours[regionId % Drag.Debugger.regionsIdsColours.length] : "transparent";
				regionIdTile.classList.add("regionIdTile");
				Drag.Debugger.regionsId.appendChild(regionIdTile);
			}
		}
	};
	
	Drag.Debugger.hideRegionsId = function() {
		Drag.Debugger.regionsId?.remove();
		Drag.Debugger.regionsId = null;
	};
	
	Drag.Debugger.updateRegionsIdContent = function() {
		if (!Drag.Debugger.regionsId || !$dataMap)
			return;
		for (regionIdTile of Drag.Debugger.regionsId.childNodes) {
			const x = parseInt(regionIdTile.getAttribute('data-x')) || 0;
			const y = parseInt(regionIdTile.getAttribute('data-y')) || 0;
			const currentRegionId = parseInt(regionIdTile.getAttribute('data-regionId')) || 0;
			const regionId = $gameMap.regionId(x, y);
			if (currentRegionId !== regionId) {
				regionIdTile.setAttribute('data-regionId', regionId);
				regionIdTile.style.background = regionId > 0 ? Drag.Debugger.regionsIdsColours[regionId % Drag.Debugger.regionsIdsColours.length] : "transparent";
			}
		}
	};
	
	// Drag.Debugger.updateRegionsIdPos = function() {
	// };
	
	//--------------------------------------------------
	// plugin accessors
	
	Drag.Debugger.setEventTrigger = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].trigger = val;
		if ($gameMap.event(eventId).findProperPageIndex() === pageId && !$gameMap.event(eventId)._erased)
			$gameMap.event(eventId).setupPage();
	};
	
	Drag.Debugger.setEventPriorityType = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].priorityType = val;
		if ($gameMap.event(eventId).findProperPageIndex() === pageId)
			$gameMap.event(eventId).setPriorityType(val);
	};
	
	Drag.Debugger.setEventWalkAnime = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].walkAnime = val;
		if ($gameMap.event(eventId).findProperPageIndex() === pageId)
			$gameMap.event(eventId).setWalkAnime(val);
	};
	
	Drag.Debugger.setEventStepAnime = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].stepAnime = val;
		if ($gameMap.event(eventId).findProperPageIndex() === pageId)
			$gameMap.event(eventId).setStepAnime(val);
	};
	
	Drag.Debugger.setEventDirectionFix = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].directionFix = val;
		if ($gameMap.event(eventId).findProperPageIndex() === pageId)
			$gameMap.event(eventId).setDirectionFix(val);
	};
	
	Drag.Debugger.setEventThrough = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].through = val;
		if ($gameMap.event(eventId).findProperPageIndex() === pageId)
			$gameMap.event(eventId).setThrough(val);
	};
	
	Drag.Debugger.toggleEventSwitch1 = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].conditions.switch1Valid = val;
		$gameMap.event(eventId).refresh();
		$dataMap.events[eventId].pages[pageId].conditions.switch1Valid;
	};
	
	Drag.Debugger.toggleEventSwitch2 = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].conditions.switch2Valid = val;
		$gameMap.event(eventId).refresh();
	};
	
	Drag.Debugger.toggleEventVariable1 = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].conditions.variableValid = val;
		$gameMap.event(eventId).refresh();
	};
	
	Drag.Debugger.toggleEventSelfSwitch1 = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].conditions.selfSwitchValid = val;
		$gameMap.event(eventId).refresh();
	};
	
	Drag.Debugger.toggleEventItem1 = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].conditions.itemValid = val;
		$gameMap.event(eventId).refresh();
	};
	
	Drag.Debugger.toggleEventActor1 = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].conditions.actorValid = val;
		$gameMap.event(eventId).refresh();
	};
	
	Drag.Debugger.changeEventSwitch1Id = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].conditions.switch1Id = val;
		$gameMap.event(eventId).refresh();
	};
	
	Drag.Debugger.changeEventSwitch2Id = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].conditions.switch2Id = val;
		$gameMap.event(eventId).refresh();
	};
	
	Drag.Debugger.changeEventVariable1Id = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].conditions.variableId = val;
		$gameMap.event(eventId).refresh();
	};
	
	Drag.Debugger.changeEventVariable1Value = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].conditions.variableValue = val;
		$gameMap.event(eventId).refresh();
	};
	
	Drag.Debugger.changeEventSelfSwitch1Id = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].conditions.selfSwitchCh = val;
		$gameMap.event(eventId).refresh();
	};
	
	Drag.Debugger.changeEventItem1Id = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].conditions.itemId = val;
		$gameMap.event(eventId).refresh();
	};
	
	Drag.Debugger.changeEventActor1Id = function(eventId, pageId, val) {
		$dataMap.events[eventId].pages[pageId].conditions.actorId = val;
		$gameMap.event(eventId).refresh();
	};
	
	Drag.Debugger.isEventRunning = function(eventId) {
		let gameEvent = $gameMap.event(eventId);
		if (!gameEvent)
			return false;
		let isRunning = false;
		for (let i = 0; i < gameEvent.event().pages.length; i++) {
			if (this.isPageRunning(eventId, i))
				isRunning = true;
		}
		return isRunning;
	};
	
	Drag.Debugger.isPageRunning = function(eventId, pageId) {
		let gameEvent = $gameMap.event(eventId);
		if (!gameEvent)
			return false;
		let eventPageIndex = gameEvent._pageIndex;
		
		if (pageId !== eventPageIndex)
			return false;
		
		return gameEvent?._starting || ($gameMap?._interpreter?._eventId === eventId) || gameEvent?._interpreter;
	};
	
	Drag.Debugger.getPageRunning = function(eventId) {
		let gameEvent = $gameMap.event(eventId);
		if (!gameEvent)
			return -1;
		for (let i = 0; i < gameEvent.event().pages.length; i++) {
			if (this.isPageRunning(eventId, i))
				return i;
		}
	};
	
	Drag.Debugger.getActivePage = function(eventId) {
		let gameEvent = $gameMap?.event(eventId);
		if (!gameEvent)
			return -1;
		let pages = [...gameEvent?.event()?.pages]?.reverse();
		if (!pages)
			return -1
		for (let [i, page] of pages.entries())
			if (gameEvent.meetsConditions(page))
				return pages.length - 1 - i;
		return -1;
	};
	
	Drag.Debugger.getEventsByTrigger = function(trigger) {
		return $dataMap.events.filter(ev => ev?.pages.filter(page => page.trigger === trigger).length > 0);
	};
	
	Drag.Debugger.getPagesByTrigger = function(trigger, gameEvent) {
		return gameEvent?.event()?.pages.filter(page => page.trigger === trigger) || [];
	};
	
	Drag.Debugger.getEventConditions = function(page, mapId, evId) {
		if (!page)
			return null;
		return [{
			conditionId: page.conditions.switch1Id, 
			conditionCheck: $gameSwitches.value(page.conditions.switch1Id),
			valid: page.conditions.switch1Valid,
			outputON: "Turn ON switch " + page.conditions.switch1Id,
			outputOFF: "Turn OFF switch " + page.conditions.switch1Id
		}, {
			conditionId: page.conditions.switch2Id,
			conditionCheck: $gameSwitches.value(page.conditions.switch2Id),
			valid: page.conditions.switch2Valid,
			outputON: "Turn ON switch " + page.conditions.switch2Id,
			outputOFF: "Turn OFF switch " + page.conditions.switch2Id
		}, {
			conditionId: page.conditions.variableId,
			conditionCheck: $gameVariables.value(page.conditions.variableId) >= page.conditions.variableValue,
			valid: page.conditions.variableValid,
			value: page.conditions.variableValue,
			outputON: "Set variable " + page.conditions.variableId + " to " + page.conditions.variableValue + " or higher",
			outputOFF: "Set variable " + page.conditions.variableId + " to 0 or lesser"
		}, {
			conditionId: page.conditions.selfSwitchCh, 
			conditionCheck: $gameSelfSwitches.value([mapId, evId, page.conditions.selfSwitchCh]),
			valid: page.conditions.selfSwitchValid, 
			outputON: "Turn ON self switch " + page.conditions.selfSwitchCh,
			outputOFF: "Turn OFF self switch " + page.conditions.selfSwitchCh
		}, {
			conditionId: page.conditions.itemId, 
			conditionCheck: $gameParty.hasItem($dataItems[page.conditions.itemId]),
			valid: page.conditions.itemValid,
			outputON: "Acquire item " + page.conditions.itemId,
			outputOFF: "Lose item " + page.conditions.itemId
		}, {
			conditionId: page.conditions.actorId,
			conditionCheck: $gameParty.members().contains($gameActors.actor(page.conditions.actorId)),
			valid: page.conditions.actorValid,
			outputON: "Add actor " + page.conditions.actorId + " to the party",
			outputOFF: "Remove actor " + page.conditions.actorId + " from the party"
		}];
	};
	
	Drag.Debugger.getConditionsValid = function(conditions) {
		return conditions.filter(condition => condition.valid);
	};
	
	Drag.Debugger.pageHasEraseEventCommand = function(page) {
		for (command of page.list)
			if (command.code === 214)
				return true;
		return false;
	};
	
	Drag.Debugger.checkAutorunEvent = function(gameEvent) {
		let dataEvent = gameEvent?.event();
		if (!gameEvent || !dataEvent)
			return [];
		let higherPagesConditions = [];
		let pages = [...dataEvent.pages].reverse();
		let status = [];
		let currentEvPage = $gameMap?.event(dataEvent.id)?.findProperPageIndex();
		checkPage: for ([i, page] of pages.entries()) {
			let pageId = pages.length - 1 - i;
			let conditions = this.getEventConditions(page, $gameMap._mapId, dataEvent.id); 
			if (!conditions)
				continue checkPage;
			let isAutorun = page.trigger === 3;
			let isEmpty = page.list.length <= 1;
			
			if (!isAutorun || this.pageHasEraseEventCommand(page) || isEmpty || pageId !== currentEvPage) {
				higherPagesConditions.push([pages.length - 1 - i, conditions]);
				continue checkPage;
			}
			
			let hasConditions = this.getConditionsValid(conditions).length > 0;
			let code = 0;
			if (i !== 0) 
				code += 2;
			if (!hasConditions)
				code += 1;
			else 
				code += 2;
			status.push(code, pageId, conditions, higherPagesConditions);
			break;
		}
		return status;
	};
	
})();