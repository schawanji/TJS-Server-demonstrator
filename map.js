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

  var colorGradient = [
    "rgb(128,128,128)",
    "rgb(140,81,10)",
    "rgb(216,179,101)",
    "rgb(246,232,195)",
    "rgb(199,234,229)",
    "rgb(90,180,172)",
    "rgb(1,102,94)",
  ];

  var gradStyle = function (feature) {
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
    const style = new Style({
      fill: new Fill({
        color: color,
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
    style.getText().setText(feature.get("name"));
    return style;
  };

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      url: `${url}`,
      format: new GeoJSON(),
    }),
    style: gradStyle,
  });

  map.addLayer(vectorLayer);
  layer.innerHTML = `<div class="preference">
  <input type="checkbox" name="new-layer" id="new-layer" /><label
    for="new-layer"
    >New Layer</label
  >
</div>`;
});
