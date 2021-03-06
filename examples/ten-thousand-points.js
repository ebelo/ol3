goog.require('ol.Map');
goog.require('ol.RendererHint');
goog.require('ol.View2D');
goog.require('ol.control.MousePosition');
goog.require('ol.control.defaults');
goog.require('ol.geom2.LineStringCollection');
goog.require('ol.geom2.PointCollection');
goog.require('ol.layer.TileLayer');
goog.require('ol.layer.VectorLayer2');
goog.require('ol.source.OSM');
goog.require('ol.source.VectorSource2');


// WARNING
// This example is an experimental testbed for WebGL vector work.  The function
// calls used here are internal and low-level and are not representative of the
// final API.


var pointCollection = ol.geom2.PointCollection.createEmpty(101 * 101);
var i, j, x, y;
for (i = 0; i < 101; ++i) {
  for (j = 0; j < 101; ++j) {
    x = 20000000 * (i - 50) / 50;
    y = 20000000 * (j - 50) / 50;
    pointCollection.add([x, y]);
  }
}

var k = 1000000;
var lineStringCollection = ol.geom2.LineStringCollection.pack([
  [[-20 * k, -20 * k], [20 * k, 20 * k]],
  [[-20 * k, 20 * k], [20 * k, -20 * k]],
  [[0 * k, 15 * k],
   [10 * k, 5 * k],
   [5 * k, 5 * k],
   [5 * k, -15 * k],
   [-5 * k, -15 * k],
   [-5 * k, 5 * k],
   [-10 * k, 5 * k],
   [0 * k, 15 * k]]
]);

var map = new ol.Map({
  controls: ol.control.defaults().extend([
    new ol.control.MousePosition({
      undefinedHTML: '&nbsp;'
    })
  ]),
  layers: [
    new ol.layer.TileLayer({
      source: new ol.source.OSM()
    }),
    new ol.layer.VectorLayer2({
      source: new ol.source.VectorSource2({
        lineStringCollections: [lineStringCollection],
        projection: 'EPSG:3857',
        pointCollections: [pointCollection]
      })
    })
  ],
  renderer: ol.RendererHint.WEBGL,
  target: 'map',
  view: new ol.View2D({
    center: [0, 0],
    zoom: 0
  })
});
