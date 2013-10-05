
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

    Player.prototype.x = 0;

    Player.prototype.y = 0;

    Player.prototype.angle = 0;

    Player.prototype.r = 5;