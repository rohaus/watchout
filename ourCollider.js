
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


  var svgElement = d3.select('.container').select('svg');
  var enemyData = _.range(0,gameOptions.nEnemies).map(function(i){
    return {id: i, x:Math.random()*100,y:Math.random()*100};
  });
  var listOfEnemies = d3.selectAll('circle').data(enemyData, function(d) {return d.id;});



  svgElement.selectAll('circle').data(enemyData).enter().append('circle');
  svgElement.selectAll('circle').attr("cx",function(enemyData){return axes.x(enemyData.x);})
    .attr("cy",function(enemyData){return axes.y(enemyData.y);}).attr("r",10);

  listOfEnemies.transition().duration(500);


  // return enemies.transition().duration(500).attr('r', 10).transition().duration(2000).tween('custom', tweenWithCollisionDetection);


  // render = function(enemy_data) {
  //   // var checkCollision, enemies, onCollision, tweenWithCollisionDetection;
  //   // enemies = gameBoard.selectAll('circle.enemy').data(enemy_data, function(d) {
  //   //   return d.id;
  //   // });
  //   // enemies.enter().append('svg:circle').attr('class', 'enemy').attr('cx', function(enemy) {
  //   //   return axes.x(enemy.x);
  //   // }).attr('cy', function(enemy) {
  //   //   return axes.y(enemy.y);
  //   // }).attr('r', 0);
  //   // enemies.exit().remove();
  //   checkCollision = function(enemy, collidedCallback) {
  //     return _(players).each(function(player) {
  //       var radiusSum, separation, xDiff, yDiff;
  //       radiusSum = parseFloat(enemy.attr('r')) + player.r;
  //       xDiff = parseFloat(enemy.attr('cx')) - player.x;
  //       yDiff = parseFloat(enemy.attr('cy')) - player.y;
  //       separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  //       if (separation < radiusSum) return collidedCallback(player, enemy);
  //     });
  //   };
  //   onCollision = function() {
  //     updateBestScore();
  //     gameStats.score = 0;
  //     return updateScore();
  //   };
  //   tweenWithCollisionDetection = function(endData) {
  //     var endPos, enemy, startPos;
  //     enemy = d3.select(this);
  //     startPos = {
  //       x: parseFloat(enemy.attr('cx')),
  //       y: parseFloat(enemy.attr('cy'))
  //     };
  //     endPos = {
  //       x: axes.x(endData.x),
  //       y: axes.y(endData.y)
  //     };
  //     return function(t) {
  //       var enemyNextPos;
  //       checkCollision(enemy, onCollision);
  //       enemyNextPos = {
  //         x: startPos.x + (endPos.x - startPos.x) * t,
  //         y: startPos.y + (endPos.y - startPos.y) * t
  //       };
  //       return enemy.attr('cx', enemyNextPos.x).attr('cy', enemyNextPos.y);
  //     };
  //   };
  //   return enemies.transition().duration(500).attr('r', 10).transition().duration(2000).tween('custom', tweenWithCollisionDetection);
  // };