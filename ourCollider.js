(function() {
  var axes, enemyData,gameBoard, gameOptions,gameStats,play,render;
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



  // var enemyData = _.range(0,gameOptions.nEnemies).map(function(i){
  //   return {id: i, x:Math.random()*100,y:Math.random()*100};
  // });
  // var listOfEnemies = d3.selectAll('circle').data(enemyData, function(d) {return d.id;});
  // svgElement.selectAll('circle').data(enemyData).enter().append('circle');
  // svgElement.selectAll('circle').attr("cx",function(enemyData){return axes.x(enemyData.x);})
  //   .attr("cy",function(enemyData){return axes.y(enemyData.y);}).attr("r",10);

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

}).call(this);



