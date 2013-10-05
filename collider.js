(function() {
  var Player, axes, createEnemies, gameBoard, gameOptions, gameStats, play, players, render, updateBestScore, updateScore,
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

  updateScore = function() {
    return d3.select('#current-score').text(gameStats.score.toString());
  };

  updateBestScore = function() {
    gameStats.bestScore = _.max([gameStats.bestScore, gameStats.score]);
    return d3.select('#best-score').text(gameStats.bestScore.toString());
  };

  Player = (function() {

    Player.prototype.path = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjY0MCIgaGVpZ2h0PSI0ODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8IS0tIENyZWF0ZWQgd2l0aCBTVkctZWRpdCAtIGh0dHA6Ly9zdmctZWRpdC5nb29nbGVjb2RlLmNvbS8gLS0+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPGVsbGlwc2Ugcnk9IjY0IiByeD0iOTIiIGlkPSJzdmdfMSIgY3k9IjEyMSIgY3g9IjIyOSIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNGRjAwMDAiLz4KICA8ZWxsaXBzZSByeT0iMTQiIHJ4PSIxNyIgaWQ9InN2Z18yIiBjeT0iOTYiIGN4PSIyMDQiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkYwMDAwIi8+CiAgPGVsbGlwc2Ugcnk9IjE0IiByeD0iMTMiIGlkPSJzdmdfMyIgY3k9Ijk1IiBjeD0iMjU1IiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iI0ZGMDAwMCIvPgogIDxlbGxpcHNlIHJ5PSIxMiIgcng9IjE2IiBpZD0ic3ZnXzQiIGN5PSIxMjkiIGN4PSIyMjYiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkYwMDAwIi8+CiA8L2c+Cjwvc3ZnPg=='

    Player.prototype.fill = '#ff6600';

    Player.prototype.x = 0;

    Player.prototype.y = 0;

    Player.prototype.angle = 0;

    Player.prototype.r = 5;

    function Player(gameOptions) {
      this.setupDragging = __bind(this.setupDragging, this);
      this.moveRelative = __bind(this.moveRelative, this);
      this.moveAbsolute = __bind(this.moveAbsolute, this);
      this.transform = __bind(this.transform, this);
      this.setY = __bind(this.setY, this);
      this.getY = __bind(this.getY, this);
      this.setX = __bind(this.setX, this);
      this.getX = __bind(this.getX, this);
      this.render = __bind(this.render, this);      this.gameOptions = gameOptions;
    }

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

  createEnemies = function() {
    return _.range(0, gameOptions.nEnemies).map(function(i) {
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100
      };
    });
  };

  render = function(enemy_data) {
    var checkCollision, enemies, onCollision, tweenWithCollisionDetection;
    enemies = gameBoard.selectAll('circle.enemy').data(enemy_data, function(d) {
      return d.id;
    });
    enemies.enter().append('svg:circle').attr('class', 'enemy').attr('cx', function(enemy) {
      return axes.x(enemy.x);
    }).attr('cy', function(enemy) {
      return axes.y(enemy.y);
    }).attr('r', 0);
    enemies.exit().remove();
    checkCollision = function(enemy, collidedCallback) {
      return _(players).each(function(player) {
        var radiusSum, separation, xDiff, yDiff;
        radiusSum = parseFloat(enemy.attr('r')) + player.r;
        xDiff = parseFloat(enemy.attr('cx')) - player.x;
        yDiff = parseFloat(enemy.attr('cy')) - player.y;
        separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
        if (separation < radiusSum) return collidedCallback(player, enemy);
      });
    };
    onCollision = function() {
      updateBestScore();
      gameStats.score = 0;
      return updateScore();
    };
    tweenWithCollisionDetection = function(endData) {
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
        checkCollision(enemy, onCollision);
        enemyNextPos = {
          x: startPos.x + (endPos.x - startPos.x) * t,
          y: startPos.y + (endPos.y - startPos.y) * t
        };
        return enemy.attr('cx', enemyNextPos.x).attr('cy', enemyNextPos.y);
      };
    };
    return enemies.transition().duration(500).attr('r', 10).transition().duration(2000).tween('custom', tweenWithCollisionDetection);
  };

  play = function() {
    var gameTurn, increaseScore;
    gameTurn = function() {
      var newEnemyPositions;
      newEnemyPositions = createEnemies();
      return render(newEnemyPositions);
    };
    increaseScore = function() {
      gameStats.score += 1;
      return updateScore();
    };
    gameTurn();
    setInterval(gameTurn, 2000);
    return setInterval(increaseScore, 50);
  };

  play();

}).call(this);