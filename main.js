//import "ol/ol.css";
import { Vector } from "ol/source";
import { GeoJSON } from "ol/format";
import Map from "ol/Map";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import { Fill, Stroke, Style, Text } from "ol/style";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import MVT from "ol/format/MVT";
import Layer from "ol/layer/Layer";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

var style_simple = new Style({
  fill: new Fill({
    color: "#ADD8E6",
  }),
  stroke: new Stroke({
    color: "#880000",
    width: 1,
  }),
});

function simpleStyle(feature) {
  return style_simple;
}

/*var url = 'http://127.0.0.1:5000/tjs/api?vtc_url=http://localhost:8080/geoserver/gwc/service/tms/1.0.0/'+
 'countries%3Ane_110m_admin_0_countries@EPSG%3A3857@geojson/{z}/{x}/{-y}.geojson&'+
 'attribute_url=http://127.0.0.1:8000/static/sample-csv.csv&'+
 'framework_key=UN_A3&attribute1=Country_name&attribute2=GDP(2005)'*/

let url =
  "http://localhost:8080/geoserver/gwc/service/tms/1.0.0/topp%3Astates@EPSG%3A900913@geojson/{z}/{x}/{-y}.geojson";

const layer = new VectorTileLayer({
  //style:simpleStyle,
  style: simpleStyle,
  source: new VectorTileSource({
    attributions: "Made by Sharon",
    format: new GeoJSON(),
    maxZoom: 19,
    url: url,
    tileLoadFunction: function (tile, url) {
      tile.setLoader(function (extent, resolution, projection) {
        fetch(url).then(function (response) {
          console.log(response);
          response.text().then(function (data) {
            console.log(data);
            const jsons = JSON.parse(data);
            const format = tile.getFormat();
            console.log(data);
            tile.setFeatures(format.readFeatures(data));
          });
        });
      });
    },
  }),
});

var map = new Map({
  view: new View({
    //center: [0, 0],
    center: fromLonLat([-75, 42]),
    zoom: 4,
  }),

  layers: [layer],
  target: "map",
});
