// (function() {
var axes, enemyData,gameBoard, gameOptions,gameStats,play,render,Player;
__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

gameStats = {
  score: 0,
  bestScore: 0
};

axes = {
  x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
};

gameBoard = d3.select('.container').append('svg:svg').attr('width', gameOptions.width).attr('height', gameOptions.height);

// Player = function(gameOptions){
//   return {
//     x:gameOptions.width * 0.5,
//     y:gameOptions.height * 0.5,
//     r:5,
//     path: 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z'
//   };
// };

// Player.prototype.getX = function(){return this.x;};

// Player.prototype.getY = function(){return this.y;};

// Player.prototype.setX = function(x){this.x = x;};

// Player.prototype.setY = function(y){this.y = y;};

// Player.prototype.render = function(to) {
//   this.el = to.append('svg:path').attr('d', this.path).attr('fill', 'red');
//   this.transform({
//     x: gameOptions.width * 0.5,
//     y: gameOptions.height * 0.5
//   });
//   return this;
// };

// Player.prototype.transform = function(opts){
//   this.setX(opts.x || this.x);
//   this.setY(opts.y || this.y);
//   return this.el;
// };

 Player = (function() {

    function Player(gameOptions) {
      this.setupDragging = __bind(this.setupDragging, this);
      this.moveRelative = __bind(this.moveRelative, this);
      this.moveAbsolute = __bind(this.moveAbsolute, this);
      this.transform = __bind(this.transform, this);
      this.setY = __bind(this.setY, this);
      this.getY = __bind(this.getY, this);
      this.setX = __bind(this.setX, this);
      this.getX = __bind(this.getX, this);
      this.render = __bind(this.render, this);
      this.gameOptions = gameOptions;
    }

    Player.prototype.path = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z';

    Player.prototype.fill = '#0000ff';

    Player.prototype.x = 0;

    Player.prototype.y = 0;

    Player.prototype.angle = 0;

    Player.prototype.r = 5;


    Player.prototype.render = function(to) {
      this.el = to.append('svg:path').attr('d', this.path).attr('fill', this.fill);
      this.transform({
        x: this.gameOptions.width * 0.5,
        y: this.gameOptions.height * 0.5
      });
      this.setupDragging();
      return this;
    };

    Player.prototype.getX = function() {
      return this.x;
    };

    Player.prototype.setX = function(x) {
      var maxX, minX;
      minX = this.gameOptions.padding;
      maxX = this.gameOptions.width - this.gameOptions.padding;
      if (x <= minX) x = minX;
      if (x >= maxX) x = maxX;
      return this.x = x;
    };

    Player.prototype.getY = function() {
      return this.y;
    };

    Player.prototype.setY = function(y) {
      var maxY, minY;
      minY = this.gameOptions.padding;
      maxY = this.gameOptions.height - this.gameOptions.padding;
      if (y <= minY) y = minY;
      if (y >= maxY) y = maxY;
      return this.y = y;
    };

    Player.prototype.transform = function(opts) {
      this.angle = opts.angle || this.angle;
      this.setX(opts.x || this.x);
      this.setY(opts.y || this.y);
      return this.el.attr('transform', ("rotate(" + this.angle + "," + (this.getX()) + "," + (this.getY()) + ") ") + ("translate(" + (this.getX()) + "," + (this.getY()) + ")"));
    };

    Player.prototype.moveAbsolute = function(x, y) {
      return this.transform({
        x: x,
        y: y
      });
    };

    Player.prototype.moveRelative = function(dx, dy) {
      return this.transform({
        x: this.getX() + dx,
        y: this.getY() + dy,
        angle: 360 * (Math.atan2(dy, dx) / (Math.PI * 2))
      });
    };

    Player.prototype.setupDragging = function() {
      var drag, dragMove,
        _this = this;
      dragMove = function() {
        return _this.moveRelative(d3.event.dx, d3.event.dy);
      };
      drag = d3.behavior.drag().on('drag', dragMove);
      return this.el.call(drag);
    };

    return Player;

  })();

  players = [];

  players.push(new Player(gameOptions).render(gameBoard));


//var player = new Player(gameOptions).render(gameBoard);

enemyData = function() {
  return _.range(0,gameOptions.nEnemies).map(function(i){
    return {
      id: i,
      x:Math.random()*100,
      y:Math.random()*100
    };
  });
};


render = function(enemy_data) {
  var enemies,tweenWithoutCollision;

  enemies = gameBoard.selectAll('circle').data(enemy_data, function(d) {return d.id;});

  var svgElement = d3.select('.container').select('svg');
  enemies.enter().append('circle').attr("cx",function(enemyData){return axes.x(enemyData.x);})
    .attr("cy",function(enemyData){return axes.y(enemyData.y);}).attr("r",10);

  tweenWithoutCollision = function(endData) {
    var endPos, enemy, startPos;
    enemy = d3.select(this);
    startPos = {
      x: parseFloat(enemy.attr('cx')),
      y: parseFloat(enemy.attr('cy'))
    };
    endPos = {
      x: axes.x(endData.x),
      y: axes.y(endData.y)
    };
    return function(t) {
      var enemyNextPos;
//      checkCollision(enemy, onCollision);
      enemyNextPos = {
        x: startPos.x + (endPos.x - startPos.x) * t,
        y: startPos.y + (endPos.y - startPos.y) * t
      };
      return enemy.attr('cx', enemyNextPos.x).attr('cy', enemyNextPos.y);
    };
  };
  return enemies.transition().duration(2000).tween('custom', tweenWithoutCollision);
};

play = function() {
  var gameTurn;
  gameTurn = function() {
    var newEnemyPositions;
    newEnemyPositions = enemyData();
    return render(newEnemyPositions);
  };
  // increaseScore = function() {
  //   gameStats.score += 1;
  //   return updateScore();
  // };
  gameTurn();
  setInterval(gameTurn, 2000);
  //return setInterval(increaseScore, 50);
};

play();

// }).call(this);



