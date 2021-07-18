import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Fill, Stroke, Style, Text } from "ol/style";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: "map",
  view: new View({
    center: [-9101767, 2822912],
    zoom: 4,
  }),
});

const style = new Style({
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.6)",
  }),
  stroke: new Stroke({
    color: "#319FD3",
    width: 1,
  }),
  text: new Text({
    font: "12px Calibri,sans-serif",
    fill: new Fill({
      color: "#000",
    }),
    stroke: new Stroke({
      color: "#fff",
      width: 3,
    }),
  }),
});

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let tjsUrl = document.querySelector("#api").value;
  let frameworkData = document.querySelector("#framework").value;
  let attributeData = document.querySelector("#attribute").value;
  let frameworkKey = document.querySelector("#key").value;
  let results = document.querySelector("#results");

  const url = `${tjsUrl}FrameworkURI=${frameworkData}&GetDataURL=${attributeData}&FrameworkKey=${frameworkKey}`;

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      url: `${url}`,
      format: new GeoJSON(),
    }),
    style: function (feature) {
      style.getText().setText(feature.get("name"));
      return style;
    },
  });

  map.addLayer(vectorLayer);
});

const highlightStyle = new Style({
  stroke: new Stroke({
    color: "#f00",
    width: 1,
  }),
  fill: new Fill({
    color: "rgba(255,0,0,0.1)",
  }),
  text: new Text({
    font: "12px Calibri,sans-serif",
    fill: new Fill({
      color: "#000",
    }),
    stroke: new Stroke({
      color: "#f00",
      width: 3,
    }),
  }),
});

const featureOverlay = new VectorLayer({
  source: new VectorSource(),
  map: map,
  style: function (feature) {
    highlightStyle.getText().setText(feature.get("name"));
    return highlightStyle;
  },
});

let highlight;
const displayFeatureInfo = function (pixel) {
  const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
    return feature;
  });

  const info = document.getElementById("info");
  if (feature) {
    info.innerHTML = feature.getId() + ": " + feature.get("name");
  } else {
    info.innerHTML = "&nbsp;";
  }

  if (feature !== highlight) {
    if (highlight) {
      featureOverlay.getSource().removeFeature(highlight);
    }
    if (feature) {
      featureOverlay.getSource().addFeature(feature);
    }
    highlight = feature;
  }
};

map.on("pointermove", function (evt) {
  if (evt.dragging) {
    return;
  }
  const pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel);
});

map.on("click", function (evt) {
  displayFeatureInfo(evt.pixel);
});
