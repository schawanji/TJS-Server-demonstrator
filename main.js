import "ol/ol.css";
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

/*var style_simple = new Style({
  fill: new Fill({
    color: "#ADD8E6",
  }),
  stroke: new Stroke({
    color: "#880000",
    width: 1,
  }),
});

var colorGradient = [
  "rgb(128,128,128)",
  "rgb(140,81,10)",
  "rgb(216,179,101)",
  "rgb(246,232,195)",
  "rgb(199,234,229)",
  "rgb(90,180,172)",
  "rgb(1,102,94)",
];

function simpleStyle(feature) {
  var data = feature.get("cases");
  var color;
  if (data < 50000) {
    color = colorGradient[6]; //low value
  } else if (data >= 50000 && data < 500000) {
    color = colorGradient[5]; //
  } else if (data >= 500000 && data < 1000000) {
    color = colorGradient[4];
  } else if (data >= 1000000 && data < 3000000) {
    color = colorGradient[3];
  } else if (data >= 3000000 && data < 5000000) {
    color = colorGradient[2];
  } else if (data >= 5000000) {
    color = colorGradient[1];
  } else if ((data = "null")) {
    color = colorGradient[0];
  }
  return new Style({
    stroke: new Stroke({
      color: "black", //'rgba(255, 255, 255 ,1.0)',
      lineDash: [3, 3],
      lineCap: "butt",
      lineJoin: "miter",
      width: 0.5,
    }),
    fill: new Fill({
      color: color,
    }),
  });
}

let url =
  "http://localhost:8080/geoserver/gwc/service/tms/1.0.0/topp%3Astates@EPSG%3A900913@geojson/{z}/{x}/{-y}.geojson";

let tjs_url =
  "http://127.0.0.1:5000/tjs/api/joindata?FrameworkURI=http://localhost:8080/geoserver/gwc/service/tms/1.0.0/topp%3Astates@EPSG%3A900913@geojson/{z}/{x}/{-y}.geojson&GetDataURL=https://schawanji.herokuapp.com/static/covid_data.csv&FrameworkKey=state";

const layer = new VectorTileLayer({
  style: simpleStyle,
  source: new VectorTileSource({
    attributions: "Made by Sharon",
    format: new GeoJSON(),
    maxZoom: 19,
    url: tjs_url,
    tileLoadFunction: function (tile, url) {
      tile.setLoader(function (extent, resolution, projection) {
        fetch(url).then(function (response) {
          response.text().then(function (data) {
            const jsons = JSON.parse(data);
            const format = tile.getFormat();

            tile.setFeatures(format.readFeatures(data));
          });
        });
      });
    },
  }),
});

var map = new Map({
  view: new View({
    center: fromLonLat([-95, 40]),
    zoom: 4,
  }),

  layers: [layer],
  target: "map",
});*/

const view = new View({
  center: [-9101767, 2822912],
  zoom: 14,
});

const map = new Map({
  controls: defaultControls().extend([
    new FullScreen({
      source: 'fullscreen',
    }),
  ]),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: 'map',
  view: view,
});
