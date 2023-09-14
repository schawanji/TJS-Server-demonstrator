import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";

import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { FullScreen, defaults as defaultControls } from "ol/control";
import { vectorLayer } from "./js/vectorlayers";





const map = new Map({
  controls: defaultControls().extend([new FullScreen()]),

  layers: [
    new TileLayer({
      source: new OSM(),
    }), vectorLayer
  ],
  target: "map",
  view: new View({
    center: [-9201767, 2922912],
    zoom: 4,
  }),
});

