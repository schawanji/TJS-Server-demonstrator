import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Fill, Stroke, Style, Text } from "ol/style";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { FullScreen, defaults as defaultControls } from "ol/control";

const map = new Map({
  controls: defaultControls().extend([new FullScreen()]),

  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: "map",
  view: new View({
    center: [-9201767, 2922912],
    zoom: 3,
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

  let tjsUrl = document.querySelector("#apiurl").value;
  let frameworkData = document.querySelector("#frameworkurl").value;
  let attributeData = document.querySelector("#attributeurl").value;
  let frameworkKey = document.querySelector("#frameworkkey").value;
  let attributeKey = document.querySelector("#attributekey").value;
  let layer = document.querySelector("#preference");

  const url = `${tjsUrl}FrameworkURI=${frameworkData}&GetDataURL=${attributeData}&FrameworkKey=${frameworkKey}&AttributeKey=${attributeKey}`;

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
  layer.innerHTML = `<div class="preference">
  <input type="checkbox" name="new-layer" id="new-layer" /><label
    for="new-layer"
    >New Layer</label
  >
</div>`;
});
