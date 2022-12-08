/*:
 * @target MZ
 * @plugindesc [Tier 6] [1.23] RNGMaps Meta Maze
 * @author Aerosys
 * @url https://aerosys.blog
 * @base MK_RNGMaps_Addons
 * @orderAfter MK_RNGMaps_Addons
 * 
 * @help
 * You are not allowed to re-distribute this Plugin.
 * 
 * @endofhelp
 * 
 * 
 * =====================================================================================
 * PARAMS
 * =====================================================================================
 * 
 * @param North Spawn Id
 * @desc Region Id to define where the Player spawns when coming from the north.
 * @default 14
 *
 * @param West Region Id
 * @desc Region Id to define Exit to the west
 * @default 8
 * 
 * @param West Spawn Id
 * @desc Region Id to define where the Player spawns when coming from the west.
 * @default 9
 *
 * @param East Region Id
 * @desc Region Id to define Exit to the east
 * @default 15
 *
 * @param East Spawn Id
 * @desc Region Id to define where the Player spawns when coming from the east.
 * @default 16
 * 
 * @param Top Absolute Exit Region Id
 * @default 25
 * 
 * @param Left Absolute Exit Region Id
 * @default 20
 * 
 * @param Right Absolute Exit Region Id
 * @default 27
 * 
 * @param Bottom Absolute Exit Region Id
 * @default 17
 * 
 * @
 * ==============================================================================
 * COMMANDS
 * ==============================================================================
 * 
 * @command setupNewMetaMazeCommands
 * @text --- Setup new Meta Maze
 * 
 * 
 * @command createLine
 * @text create Line
 * 
 * @arg length
 * @text Length
 * @type number
 * @default 5
 * 
 * @arg direction
 * @text Direction
 * @type select
 * @option bottom <-> top
 * @option left <-> right
 * @default bottom <-> top
 * 
 * @arg enterAt
 * @text Enter at:
 * @type select
 * @option Top
 * @option Left
 * @option Right
 * @option Bottom
 * @default Bottom
 * 
 * 
 * @command createGrid
 * @text create Grid
 * 
 * @arg width
 * @text Width
 * @type number
 * @default 3
 * 
 * @arg height
 * @text Height
 * @type number
 * @default 3
 * 
 * @arg exitTop
 * @text Exit to the Top?
 * @type boolean
 * @default true
 * 
 * @arg exitLeft
 * @text Exit to the Left?
 * @type boolean
 * @default false
 * 
 * @arg exitRight
 * @text Exit to the Right?
 * @type boolean
 * @default false
 * 
 * @arg exitBottom
 * @text Exit to the Bottom?
 * @type boolean
 * @default true
 * 
 * @arg enterAt
 * @text Enter at:
 * @type select
 * @option Top
 * @option Left
 * @option Right
 * @option Bottom
 * @default Bottom
 * 
 * 
 * @command createMaze
 * @text create Maze
 * 
 * @arg width
 * @text Width
 * @type number
 * @default 3
 * 
 * @arg height
 * @text Height
 * @type number
 * @default 3
 * 
 * @arg exitTop
 * @text Exit to the Top?
 * @type boolean
 * @default true
 * 
 * @arg exitLeft
 * @text Exit to the Left?
 * @type boolean
 * @default false
 * 
 * @arg exitRight
 * @text Exit to the Right?
 * @type boolean
 * @default false
 * 
 * @arg exitBottom
 * @text Exit to the Bottom?
 * @type boolean
 * @default true
 * 
 * @arg enterAt
 * @text Enter at:
 * @type select
 * @option Top
 * @option Left
 * @option Right
 * @option Bottom
 * @default Bottom
 * 
 * 
 * @command createImperfectMaze
 * @text create imperfect Maze
 * 
 * @arg width
 * @text Width
 * @type number
 * @default 3
 * 
 * @arg height
 * @text Height
 * @type number
 * @default 3
 * 
 * @arg mergeBackProbability
 * @text Merge Back Probability
 * @type number
 * @default 0.3
 * 
 * @arg cutOffDeadEnds
 * @text Cut Off Dead Ends
 * @type number
 * @default 1
 * 
 * @arg exitTop
 * @text Exit to the Top?
 * @type boolean
 * @default true
 * 
 * @arg exitLeft
 * @text Exit to the Left?
 * @type boolean
 * @default false
 * 
 * @arg exitRight
 * @text Exit to the Right?
 * @type boolean
 * @default false
 * 
 * @arg exitBottom
 * @text Exit to the Bottom?
 * @type boolean
 * @default true
 * 
 * @arg enterAt
 * @text Enter at:
 * @type select
 * @option Top
 * @option Left
 * @option Right
 * @option Bottom
 * @default Bottom
 * 
 * 
 * @command movePlayerCommands
 * @text --- Move Player
 * 
 * 
 * @command goTo
 * @text Go to
 * 
 * @arg direction
 * @text Direction
 * @type select
 * @option Top
 * @option Left
 * @option Right
 * @option Bottom
 * @default Top
 * 
 * 
 * @command transfer
 * @text Transfer
 * @desc Orders the Meta Maze to spawn the Player in a desired cell. You may need to regenerate the Dungeon with "spawnPlayerAt(x, y)"
 * @text Transfer
 * 
 * @arg x
 * @type number
 * 
 * @arg y
 * @type number
 * 
 * 
 * @command transferByVariables
 * @text Transfer (by Variables)
 * @desc Orders the Meta Maze to spawn the Player in a desired cell. You may need to regenerate the Dungeon with "spawnPlayerAt(x, y)"
 * 
 * @arg x
 * @type variable
 * @default 1
 * 
 * @arg y
 * @type variable
 * @default 2
 * 
 * 
 * @command spawnPlayerAt
 * @text Spawn Player at (fixed)
 * @desc Spawns the Player at a custom Position
 * 
 * @arg x
 * @type Number
 * @default 1
 * 
 * @arg y
 * @type Number
 * @default 1
 * 
 * 
 * @command spawnPlayerAtVariables
 * @text Spawn Player at (by Variables)
 * @desc Spawns the Player at a custom Position
 * 
 * @arg x
 * @type variable
 * @default 1
 * 
 * @arg y
 * @type variable
 * @default 1
 * 
 * 
 * @command leaveMetaMaze
 * @text leave Meta Maze
 * @desc Call this method when the Player left the Meta Maze.
 * 
 * 
 * 
 * @command dungeonGeneratorAddons
 * @text --- Dungeon Generators' Addons
 * 
 * 
 * @command placeExits
 * @text Place Exits
 * @desc This Command only works when using Snippets
 * 
 * 
 * @command drawAssetXTimes
 * @text draw Asset X Times (Meta)
 * @desc Draws an Asset X Times over the whole Meta Maze
 * 
 * @arg generator
 * @text Generator
 * @type select
 * @option Maze Generator using Snippets
 * @option Map Generator without using Snippets
 * @default Maze Generator using Snippets
 * 
 * @arg type
 * @desc (only when using Map Generator that is not using Snippets)
 * @type select
 * @option Chest
 * @option Enemy
 * @option NPC
 * @option POI
 * @option Switch
 * @option decorative
 * @default Chest
 * 
 * @arg regionId
 * @type number
 * @default 1
 * 
 * @arg min
 * @type number
 * @default 1
 * 
 * @arg max
 * @type number
 * @default 1
 * 
 * 
 * @command getVariableData
 * @text Get Data (Variables)
 * 
 * @arg data
 * @type select
 * @option Player X in MetaMaze
 * @option Player Y in MetaMaze
 * @option Meta Maze Width
 * @option Meta Maze Height
 * @default Player X in MetaMaze
 * 
 * @arg variableId
 * @text Variable to store into
 * @type variable
 * @default 1
 * 
 * 
 * @command getSwitchData
 * @text Get Data (Switches)
 * 
 * @arg data
 * @type select
 * @option is inside MetaMaze?
 * @option is outside MetaMaze?
 * @option has Exit Top?
 * @option has Exit Left?
 * @option has Exit Right?
 * @option has Exit Bottom?
 * @option has Inner Exit Top?
 * @option has Inner Exit Left?
 * @option has Inner Exit Right?
 * @option has Inner Exit Bottom?
 * @option has Main Exit Top?
 * @option has Main Exit Left?
 * @option has Main Exit Right?
 * @option has Main Exit Bottom?
 * @default is inside MetaMaze?
 * 
 * @arg switchId
 * @text Switch to store into
 * @type switch
 * @default 1
 */

'use strict';

var Imported    = Imported || {};
var MK          = MK || {};
Imported.MK_RNGMaps_Metamaze = true;

if (!Imported.MK_RNGMaps_Addons)
    alert ("Missing Plugin: MK_RNGMaps_Addons");

var params = PluginManager.parameters('MK_RNGMaps_Metamaze');
MK.SOUTH_EXIT_REGION_ID         = MK.ENTRANCE_REGION_ID;
MK.SOUTH_SPAWN_ID               = MK.SPAWNING_POINT_REGION_ID;
MK.NORTH_EXIT_REGION_ID         = MK.EXIT_REGION_ID;
MK.NORTH_SPAWN_ID               = Number(params['North Spawn Id']);
MK.WEST_EXIT_REGION_ID          = Number(params['West Region Id']);
MK.WEST_SPAWN_ID                = Number(params['West Spawn Id']);
MK.EAST_EXIT_REGION_ID          = Number(params['East Region Id']);
MK.EAST_SPAWN_ID                = Number(params['East Spawn Id']);
MK.NORTH_ABSOLUTE_REGION_ID     = Number(params['Top Absolute Exit Region Id']);
MK.WEST_ABSOLUTE_REGION_ID      = Number(params['Left Absolute Exit Region Id']);
MK.EAST_ABSOLUTE_REGION_ID      = Number(params['Right Absolute Exit Region Id']);
MK.SOUTH_ABSOLUTE_REGION_ID     = Number(params['Bottom Absolute Exit Region Id']);


(function(){

    const alias1 = AbstractMapGenerator.prototype.reset;
    AbstractMapGenerator.prototype.reset = function() {
        alias1.call(this);
        
        // Meta Maze
        if ($metaMaze.active) {
            this.setSeed($metaMaze.getSeedForCurrentPosition());
            this.setFloorId($metaMaze.getCurrentFloorId());
        }
    }

    const alias3 = AbstractMapGenerator.prototype.finalize;
    AbstractMapGenerator.prototype.finalize = function() {
        
        if (!this.spawnLocation && $metaMaze.active && $metaMaze.nextStartPosition)
            this.spawnPlayerAt($metaMaze.nextStartPosition, $metaMaze.getNextRegionId());
        
        alias3.call(this);
    }

    // =====================================================================================
    // Save Actions
    // =====================================================================================
    const alias4 = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = alias4.call(this);
        contents.MK = contents.MK || { };
        
        if ($metaMaze.active) {
            contents.MK.metaMaze = { };
            contents.MK.metaMaze = $metaMaze.temp;
        }
        return contents;
    }
    
    // =====================================================================================
    // Load Actions
    // =====================================================================================
    const alias5 = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        alias5.call(this, contents);

        if (contents.MK) {
            $metaMaze.active = !!contents.MK.metaMaze

            if (contents.MK.metaMaze)
                $metaMaze.temp = contents.MK.metaMaze;
        }
    }

    const alias10 = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        $metaMaze.active = false;
        alias10.call(this);
    }
})();


// =====================================================================================
// Meta Maze
// =====================================================================================

class RNGMaps_Meta {
    
    constructor() {
        this.temp = { };
    }

    reset() {
        this.active = false;
    }

    setSeed(seed) {
        MK.rng.setSeed(seed);
        this.temp.seed = seed;
        return this;
    }
    
    setRandomSeed() {
        MK.rng.noSeedableRNG();
        this.temp.seed = MK.rng.randomInteger(0, 20000);
        return this;
    }
    
    getSeedForCurrentPosition() {
        return MK.generateSeed(this.temp.seed, this.temp.currentPosition.x, this.temp.currentPosition.y);
    }

    getCurrentFloorId() {
        return "" + this.temp.currentPosition.x + "-" + this.temp.currentPosition.y;
    }

    getNextRegionId() {
        switch(this.nextStartPosition) {
            case 'top'      : return MK.NORTH_SPAWN_ID;
            case 'left'     : return MK.WEST_SPAWN_ID;
            case 'right'    : return MK.EAST_SPAWN_ID;
            case 'bottom'   : return MK.SOUTH_SPAWN_ID;
        }
    }
    
    applyMapParams(params) {
        this.active = true;
        this.temp.map = params.map;
        this.temp.exits = params.exits;
    }
    
    enterAt(arg1, arg2) {

        if (typeof arg1 == "number" && typeof arg2 == "number")
            return this.enterAtXY(arg1, arg2);
        
        if (typeof arg1 == "string")
            return this.enterAtDirection(arg1);
        
        throw Error("enterAt: arguments must be either (string) or (x, y), but were "
            + arg1 + " | " + arg2);
    }

    enterAtDirection(direction) {
        MK.requireNonNull(direction, "enterAt", "direction");
        direction = direction.toLowerCase();
        MK.requireToBeOneOfThese(direction, ["top", "left", "right", "bottom"],
            "enterAt", "direction");

        if (!this.temp.exits[direction])
            throw Error ("enterAt: Wanted to enter the Dungeon at "
                    + direction
                    + " but there was no entrance made here."
                    + "\nPlease call withExit before.");
        
        const x = this.temp.exits[direction].x;
        const y = this.temp.exits[direction].y;
        this.temp.currentPosition = {x: x, y: y};
        this.nextStartPosition = direction;
    }

    enterAtXY(x, y) {
        this.temp.currentPosition = { x: x, y: y };
        this.nextStartPosition = null;
    }
    
    areaType() {
        return this.temp.map[this.temp.currentPosition.x][this.temp.currentPosition.y];
    }

    hasMainExitTop() {
        return this.temp.exits.top
            && this.temp.exits.top.x == this.temp.currentPosition.x
            && this.temp.exits.top.y == this.temp.currentPosition.y;
    }

    hasMainExitRight() {
        return this.temp.exits.right
            && this.temp.exits.right.x == this.temp.currentPosition.x
            && this.temp.exits.right.y == this.temp.currentPosition.y;
    }

    hasMainExitBottom() {
        return this.temp.exits.bottom
            && this.temp.exits.bottom.x == this.temp.currentPosition.x
            && this.temp.exits.bottom.y == this.temp.currentPosition.y;
    }

    hasMainExitLeft() {
        return this.temp.exits.left
            && this.temp.exits.left.x == this.temp.currentPosition.x
            && this.temp.exits.left.y == this.temp.currentPosition.y;
    }

    hasInnerExitTop() {
        return [1, 3, 5, 7, 9, 11, 13, 15].contains(this.areaType());
    }

    hasInnerExitRight() {
        return [2, 3, 6, 7, 10, 11, 14, 15].contains(this.areaType());
    }

    hasInnerExitBottom() {
        return [4, 5, 6, 7, 12, 13, 14, 15].contains(this.areaType());
    }

    hasInnerExitLeft() {
        return [8, 9, 10, 11, 12, 13, 14, 15].contains(this.areaType());
    }
    
    hasExitTop() {
        return this.hasInnerExitTop() || this.hasMainExitTop();
    }
    
    hasExitRight() {
        return this.hasInnerExitRight() || this.hasMainExitRight();
    }
    
    hasExitBottom() {
        return this.hasInnerExitBottom() || this.hasMainExitBottom();
    }
    
    hasExitLeft() {
        return this.hasInnerExitLeft() || this.hasMainExitLeft();
    }
    
    getPosition() {
        return this.temp.currentPosition;
    }

    goTo(direction) {
        MK.requireNonNull(direction, "goTo", "direction");
        direction = direction.toLowerCase();
        MK.requireToBeOneOfThese(direction, ["top", "left", "right", "bottom"], "goTo", "direction");

        if (direction == "top") {
            this.temp.currentPosition.y = this.temp.currentPosition.y - 1;
            this.nextStartPosition = "bottom";
        }
        if (direction == "right") {
            this.temp.currentPosition.x = this.temp.currentPosition.x + 1;
            this.nextStartPosition = "left";
        }
        if (direction == "bottom") {
            this.temp.currentPosition.y = this.temp.currentPosition.y + 1;
            this.nextStartPosition = "top";
        }
        if (direction == "left") {
            this.temp.currentPosition.x = this.temp.currentPosition.x - 1;
            this.nextStartPosition = "right";
        }
        this.resetIfLeft();
    }

    transfer(x, y) {
        MK.requireType(x, "number", "transfer", "x");
        MK.requireType(y, "number", "transfer", "y");

        this.temp.currentPosition = { x: x, y: y };
        this.nextStartPosition = null;
        return this;
    }

    spawnPlayerAt() {
        this.spawnLocationArguments = arguments;
        return this;
    }

    leave() {
        this.reset();
    }

    getWidth()  { return this.temp.map.length    }
    getHeight() { return this.temp.map[0].length }
    
    isInsideMetaMaze() {
        if (!this.active) return false;
        const x = this.temp.currentPosition.x;
        const y = this.temp.currentPosition.y;
        const w = this.getWidth();
        const h = this.getHeight();
        return 0 <= x && x < w && 0 <= y && y < h;
    }
    
    hasLeftMetaMaze() {
        return !this.isInsideMetaMaze();
    }
    
    resetIfLeft() {
        if (this.hasLeftMetaMaze())
            this.reset();
    }

    tower(h) {
        return this.grid(1, h);
    }
    
    grid(w, h) {
        this.setSeed(MK.rng.randomInteger(0, 20000));
        return new RNGMaps_MetaParams(w, h).grid();
    }
    
    maze(w, h) {
        this.setSeed(MK.rng.randomInteger(0, 20000));
        return new RNGMaps_MetaParams(w, h).maze();
    }
    
    imperfectMaze(w, h, cutOffDeadEnds, mergeBackProbability) {
        this.setSeed(MK.rng.randomInteger(0, 20000));
        return new RNGMaps_MetaParams(w, h)
            .imperfectMaze(cutOffDeadEnds, mergeBackProbability);
    }
}

var $metaMaze = new RNGMaps_Meta();


// =====================================================================================
// Meta Maze DungeonGenerator Addons
// =====================================================================================

DungeonGenerator.prototype.placeExits = function() {
    this._identifyDecoRegions();

    if ($metaMaze.hasMainExitTop() && this.assetsInfo.decoration[MK.NORTH_ABSOLUTE_REGION_ID])
        this._placeAbsoluteExitOn('top');
    
    else if ($metaMaze.hasExitTop())
        this._placeSpecialLocation(MK.NORTH_EXIT_REGION_ID, 'top');
    
    if ($metaMaze.hasMainExitRight() && this.assetsInfo.decoration[MK.EAST_ABSOLUTE_REGION_ID])
        this._placeAbsoluteExitOn('right');
    
    else if ($metaMaze.hasExitRight())
        this._placeSpecialLocation(MK.EAST_EXIT_REGION_ID, 'right');
    
    if ($metaMaze.hasMainExitBottom() && this.assetsInfo.decoration[MK.SOUTH_ABSOLUTE_REGION_ID])
        this._placeAbsoluteExitOn('bottom');
    
    else if ($metaMaze.hasExitBottom())
        this._placeSpecialLocation(MK.SOUTH_EXIT_REGION_ID, 'bottom');
    
    if ($metaMaze.hasMainExitLeft() && this.assetsInfo.decoration[MK.WEST_ABSOLUTE_REGION_ID])
        this._placeAbsoluteExitOn('left');
    
    else if ($metaMaze.hasExitLeft())
        this._placeSpecialLocation(MK.WEST_EXIT_REGION_ID, 'left');
    
    return this;
}

DungeonGenerator.prototype._placeAbsoluteExitOn = function(direction) {
    let r1, r2;
    if (direction == 'top') {
        r1 = MK.NORTH_EXIT_REGION_ID;
        r2 = MK.NORTH_ABSOLUTE_REGION_ID;
    }
    if (direction == 'right') {
        r1 = MK.EAST_EXIT_REGION_ID;
        r2 = MK.EAST_ABSOLUTE_REGION_ID;
    }
    if (direction == 'bottom') {
        r1 = MK.SOUTH_EXIT_REGION_ID;
        r2 = MK.SOUTH_ABSOLUTE_REGION_ID;
    }
    if (direction == 'left') {
        r1 = MK.WEST_EXIT_REGION_ID;
        r2 = MK.WEST_ABSOLUTE_REGION_ID;
    }
    const deco = this._choseSpecialLocation(r1, direction);
    this.drawDecorationToXY(deco.x, deco.y, r2);
}

MazeBuilderParams.prototype.makeWaysOut = function() {
    if ($metaMaze.hasExitTop())
        this.makeWayOut("top");

    if ($metaMaze.hasExitBottom())
        this.makeWayOut("bottom")
    
    if ($metaMaze.hasExitLeft())
        this.makeWayOut("left")
    
    if ($metaMaze.hasExitRight())
        this.makeWayOut("right")
    
    return this;
}

RandomWalkParams.prototype.makeWaysOut = function() {
    if ($metaMaze.hasExitTop())
        this.makeWayOut("top");

    if ($metaMaze.hasExitBottom())
        this.makeWayOut("bottom")
    
    if ($metaMaze.hasExitLeft())
        this.makeWayOut("left")
    
    if ($metaMaze.hasExitRight())
        this.makeWayOut("right")
    
    return this;
}

const _alias_mapGenerator_generate = MapGenerator.prototype.generate;
MapGenerator.prototype.generate = function(f, args) {
    
    if ($metaMaze.active) {
        args.exits.top      = $metaMaze.hasExitTop();
        args.exits.left     = $metaMaze.hasExitLeft();
        args.exits.right    = $metaMaze.hasExitRight();
        args.exits.bottom   = $metaMaze.hasExitBottom();

        if ($metaMaze.spawnLocationArguments)
            args.spawnLocationArguments = $metaMaze.spawnLocationArguments;

        else if ($metaMaze.nextStartPosition)
            args.spawnLocationArguments = [$metaMaze.nextStartPosition];
        
        $metaMaze.spawnLocationArguments = undefined;
        $metaMaze.nextStartPosition = undefined;
    }
    return _alias_mapGenerator_generate.call(this, f, args);
}

RNGMaps_Meta.prototype.calculateXTimesMeta = function(regionId, min, max) {
    min = !min && min !== 0 ? 1 : min;
    max = max || min;
    
    const seed = MK.generateSeed(this.temp.seed, regionId);
    MK.rng.setSeed(seed);
    
    let n = MK.rng.randomInteger(min, max);
    const matrix = MK.createMatrix(this.getWidth(), this.getHeight());

    while (n > 0) {
        let x = MK.rng.randomInteger(0, this.getWidth() -1);
        let y = MK.rng.randomInteger(0, this.getHeight() -1);

        if (this.temp.map[x][y] == 0)
            continue;
        
        matrix[x][y] = matrix[x][y] + 1;
        n--;
    }
    return matrix[this.getPosition().x][this.getPosition().y];
}


AbstractMapGenerator.prototype.drawAssetMeta = function(f, regionId, min, max) {
    const n = $metaMaze.calculateXTimesMeta(regionId, min, max);
    if (n > 0) f.call(this, regionId, n);
    return this;
}

DungeonGenerator.prototype.drawDecorationXTimesMeta = function(regionId, min, max) {
    return this.drawAssetMeta(this.drawDecorationXTimes, regionId, min, max);
}

MapGenerator.prototype.drawChestMeta = function(regionId, min, max) {
    return this.drawAssetMeta(this.drawChest, regionId, min, max);
}

MapGenerator.prototype.drawEnemyMeta = function(regionId, min, max) {
    return this.drawAssetMeta(this.drawEnemy, regionId, min, max);
}

MapGenerator.prototype.drawNPCMeta = function(regionId, min, max) {
    return this.drawAssetMeta(this.drawNPC, regionId, min, max);
}

MapGenerator.prototype.drawPOIMeta = function(regionId, min, max) {
    return this.drawAssetMeta(this.drawPOI, regionId, min, max);
}

MapGenerator.prototype.drawSwitchMeta = function(regionId, min, max) {
    return this.drawAssetMeta(this.drawSwitch, regionId, min, max);
}

MapGenerator.prototype.drawDecorationMeta = function(regionId, min, max) {
    return this.drawAssetMeta(this.drawDecoration, regionId, min, max);
}


// =====================================================================================
// Meta Maze Params Builder
// =====================================================================================

class RNGMaps_MetaParams {
    
    constructor(w, h) {
        MK.requireNonNull(w, "Meta()", "w");
        MK.requireNonNull(h, "Meta()", "h");

        this.w = w;
        this.h = h;
        this.exits = {};
    }
    
    grid() {
        this.map = MK.createMatrix(this.w, this.h, 15);
        this.frame();
        return this;
    }

    maze() {
        this.map = MK.mazeAlgorithms.prims(this.w, this.h);
        return this;
    }

    imperfectMaze(cutOffDeadEnds, mergeBackProbability) {
        cutOffDeadEnds          = cutOffDeadEnds || 1;
        mergeBackProbability    = mergeBackProbability || 0.3;

        do {
            this.map = MK.mazeAlgorithms.prims(this.w, this.h);
            MK.mazeAlgorithms.mergeDeadEnds(this.map, mergeBackProbability);
            MK.mazeAlgorithms.cutOffDeadEnds(this.map, cutOffDeadEnds);
        
        } while (  this.getPossibleExits('top').length == 0
                || this.getPossibleExits('left').length == 0
                || this.getPossibleExits('right').length == 0
                || this.getPossibleExits('bottom').length == 0);
        return this;
    }
    
    frame() {
        
        // top & bottom
        for (let x = 0; x < this.w; x++) {
            this.map[x][0]          = this.map[x][0]            & 14;
            this.map[x][this.h - 1] = this.map[x][this.h - 1]   & 11;
        }
        
        // left & right
        for (let y = 0; y < this.h; y++) {
            this.map[0][y]          = this.map[0][y]            & 7;
            this.map[this.w - 1][y] = this.map[this.w - 1][y]   & 13;
        }
    }
    
    withExit(direction) {
        MK.requireNonNull(direction, "withExit", "direction");
        direction = direction.toLowerCase();
        MK.requireToBeOneOfThese(direction, ["top", "left", "right", "bottom"],
            "withExit", "direction");
            
        if (this.exits[direction])
            throw Error ("withExit: Exit at [" + direction + "] already defined!");
        
        let options           = this.getPossibleExits(direction);
        let option            = MK.rng.pickRandom(options);
        let x                 = option.x;
        let y                 = option.y;
        this.exits[direction] = option;

        let z;
        if (direction == "top")     z = 1;
        if (direction == "right")   z = 2;
        if (direction == "bottom")  z = 4;
        if (direction == "left")    z = 8;
        this.map[x][y] = this.map[x][y] | z;

        return this;
    }
    
    getPossibleExits(direction) {
        const options = [];
        
        if (direction == 'top') {
            for (let x = 0; x < this.w; x++) {
                if (this.map[x][0] != 0)
                    options.push({x: x, y: 0});
            }
        }
        
        if (direction == 'bottom') {
            for (let x = 0; x < this.w; x++) {
                if (this.map[x][this.h - 1] != 0)
                    options.push({x: x, y: this.h - 1});
            }
        }
        
        if (direction == 'left') {
            for (let y = 0; y < this.h; y++) {
                if (this.map[0][y] != 0)
                    options.push({x: 0, y: y});
            }
        }
        
        if (direction == 'right') {
            for (let y = 0; y < this.h; y++) {
                if (this.map[this.w - 1][y] != 0)
                    options.push({x: this.w - 1, y: y});
            }
        }
        
        return options;
    }
    
    apply() {
        $metaMaze.applyMapParams(this);
        return $metaMaze;
    }
}


// =====================================================================================
// Plugin Manager
// =====================================================================================

if (PluginManager && PluginManager.registerCommand) {
    
    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'createLine', args => {
        
        let w, h, exit1, exit2;
        if ('bottom <-> top' == args.direction.toLowerCase()) {
            exit1   = 'bottom';
            exit2   = 'top';
            w       = 1;
            h       = Number(args.length);
        }
        if ('left <-> right' == args.direction.toLowerCase()) {
            exit1   = 'left';
            exit2   = 'right';
            w       = Number(args.length);
            h       = 1;
        }

        $metaMaze.grid(w, h)
            .withExit(exit1)
            .withExit(exit2)
            .apply()
            .enterAt(args.enterAt);
    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'createGrid', args => {
        const w = Number(args.width);
        const h = Number(args.height);

        const builder = $metaMaze.grid(w, h)
        if ('true' == args.exitTop)     builder.withExit('top');
        if ('true' == args.exitLeft)    builder.withExit('left');
        if ('true' == args.exitRight)   builder.withExit('right');
        if ('true' == args.exitBottom)  builder.withExit('bottom');

        builder.apply().enterAt(args.enterAt);
    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'createMaze', args => {
        const w = Number(args.width);
        const h = Number(args.height);

        const builder = $metaMaze.maze(w, h);
        if ('true' == args.exitTop)     builder.withExit('top');
        if ('true' == args.exitLeft)    builder.withExit('left');
        if ('true' == args.exitRight)   builder.withExit('right');
        if ('true' == args.exitBottom)  builder.withExit('bottom');

        builder.apply().enterAt(args.enterAt);
    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'createImperfectMaze', args => {
        const w = Number(args.width);
        const h = Number(args.height);
        const c = Number(args.cutOffDeadEnds);
        const d = Number(args.mergeBackProbability);

        const builder = $metaMaze.imperfectMaze(w, h, c, d);
        if ('true' == args.exitTop)     builder.withExit('top');
        if ('true' == args.exitLeft)    builder.withExit('left');
        if ('true' == args.exitRight)   builder.withExit('right');
        if ('true' == args.exitBottom)  builder.withExit('bottom');

        builder.apply().enterAt(args.enterAt);
    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'goTo', args => {
        $metaMaze.goTo(args.direction);
    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'transfer', args => {
        $metaMaze.transfer(Number(args.x), Number(args.y));
    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'transferByVariables', args => {
        const x = $gameVariables.value(Number(args.x));
        const y = $gameVariables.value(Number(args.y));
        $metaMaze.transfer(x, y);
    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'spawnPlayerAt', args => {
        $metaMaze.spawnPlayerAt(Number(args.x), Number(args.y));
    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'spawnPlayerAtVariables', args => {
        const x = $gameVariables.value(Number(args.x));
        const y = $gameVariables.value(Number(args.y));
        $metaMaze.spawnPlayerAt(x, y);
    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'leaveMetaMaze', _ => {
        $metaMaze.reset();
    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'placeExits', _ => {
        $dungeonGenerator.placeExits();
    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'drawPaths', args => {
        $mapGenerator.drawPaths(args.mapName, Number(args.thickness));
    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'drawDecorationXTimes', args => {
        const regionId  = Number(args.regionId);
        const min       = Number(args.min);
        const max       = Number(args.max);
        
        if ('Maze Generator using Snippets' == args.generator) {
            $dungeonGenerator.drawDecorationXTimesMeta(regionId, min, max);
        } else {
            switch (args.type) {
                case "Chest":       $mapGenerator.drawChestMeta(regionId, min, max);
                case "Enemy":       $mapGenerator.drawEnemyMeta(regionId, min, max);
                case "NPC":         $mapGenerator.drawNPCMeta(regionId, min, max);
                case "POI":         $mapGenerator.drawPOIMeta(regionId, min, max);
                case "Switch":      $mapGenerator.drawSwitchMeta(regionId, min, max);
                case "decorative":  $mapGenerator.drawDecorationMeta(regionId, min, max);
            }
        }
    });
    
    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'getVariableData', args => {
        let value;
        switch(args.data) {
            case 'Player X in MetaMaze' : value = $metaMaze.temp.currentPosition.x; break;
            case 'Player Y in MetaMaze' : value = $metaMaze.temp.currentPosition.y; break;
            case 'Meta Maze Width'      : value = $metaMaze.getWidth();  break;
            case 'Meta Maze Height'     : value = $metaMaze.getHeight(); break;
        }
        $gameVariables.setValue(Number(args.variableId), value);
    });
    
    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'getSwitchData', args => {
        let value;
        switch(args.data) {
            case 'is inside MetaMaze?'      : value = $metaMaze.isInsideMetaMaze();         break;
            case 'is outside MetaMaze?'     : value = $metaMaze.hasLeftMetaMaze();          break;
            case 'has Exit Top?'            : value = $metaMaze.hasExitTop();               break;
            case 'has Exit Left?'           : value = $metaMaze.hasExitLeft();              break;
            case 'has Exit Right?'          : value = $metaMaze.hasExitRight();             break;
            case 'has Exit Bottom?'         : value = $metaMaze.hasExitBottom();            break;
            case 'has Inner Exit Top?'      : value = $metaMaze.hasInnerExitTop();          break;
            case 'has Inner Exit Left?'     : value = $metaMaze.hasInnerExitLeft();         break;
            case 'has Inner Exit Right?'    : value = $metaMaze.hasInnerExitRight();        break;
            case 'has Inner Exit Bottom?'   : value = $metaMaze.hasInnerExitBottom();       break;
            case 'has Main Exit Top?'       : value = $metaMaze.hasMainExitTop();           break;
            case 'has Main Exit Left?'      : value = $metaMaze.hasMainExitLeft();          break;
            case 'has Main Exit Right?'     : value = $metaMaze.hasMainExitRight();         break;
            case 'has Main Exit Bottom?'    : value = $metaMaze.hasMainExitBottom();        break;
        }
        $gameSwitches.setValue(Number(args.switchId), value);
    });
}