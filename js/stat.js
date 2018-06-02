'use strict';
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = '#ffffff';
var CLOUD_OFFSET = 10;
var SHADOW_OFFSET = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var FONT = 'PT Mono';
var FONT_SIZE = 16;
var LINE_HEIGHT = 18;
var FONT_COLOR = '#000000';
var TEXT_OFFSET = 20;
var CLOUD_TEXT = 'Ура вы победили!\nСписок результатов:';
var GRAPH_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP_X = 50;
var COLUMN_GAP_Y = 10;
var MAX_COLUMNS = 4;
var PLAYER_NAME = 'Вы';
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_OFFSET, y + height / 2);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x + width / 2, y + height - CLOUD_OFFSET);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x + width - CLOUD_OFFSET, y + height / 2);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width / 2, y + CLOUD_OFFSET);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
};

var renderText = function (ctx, text) {
  var lines = text.split('\n');
  ctx.fillStyle = FONT_COLOR;
  ctx.textBaseline = 'top';
  ctx.font = FONT_SIZE + 'px ' + FONT;
  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], CLOUD_X + TEXT_OFFSET, CLOUD_Y + TEXT_OFFSET + FONT_SIZE * i);
  }
};

var renderGraph = function (ctx, names, times) {
  var validScore = Math.min(names.length, times.length, MAX_COLUMNS);
  var topScore = 0;
  var columns = [];
  var columnsMaxHeight = GRAPH_HEIGHT - 2 * LINE_HEIGHT;

  var getColumnColor = function (player) {
    var color = PLAYER_COLOR;
    if (player !== PLAYER_NAME) {
      color = 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
    }
    return color;
  };

  for (var i = 0; i < validScore; i++) {
    columns.push({
      name: names[i],
      score: Math.round(times[i]),
      color: getColumnColor(names[i])
    });
    topScore = times[i] > topScore ? Math.round(times[i]) : topScore;
  }

  var columnMultiplier = columnsMaxHeight / topScore;

  for (i = 0; i < columns.length; i++) {
    var columnHeight = Math.round(columns[i].score * columnMultiplier);
    var columnOffsetX = CLOUD_X + ((CLOUD_WIDTH - columns.length * (COLUMN_WIDTH + COLUMN_GAP_X) + COLUMN_GAP_X) / 2 + i * (COLUMN_WIDTH + COLUMN_GAP_X));
    var columnOffsetY = CLOUD_Y + CLOUD_HEIGHT - columnHeight - 2 * LINE_HEIGHT - COLUMN_GAP_Y;
    ctx.textBaseline = 'top';
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(columns[i].score, columnOffsetX, columnOffsetY);
    ctx.textBaseline = 'bottom';
    ctx.fillText(columns[i].name, columnOffsetX, CLOUD_HEIGHT + CLOUD_Y - COLUMN_GAP_Y);
    ctx.fillStyle = columns[i].color;
    ctx.fillRect(columnOffsetX, columnOffsetY + LINE_HEIGHT, COLUMN_WIDTH, columnHeight);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);
  renderText(ctx, CLOUD_TEXT);
  renderGraph(ctx, names, times);
};
