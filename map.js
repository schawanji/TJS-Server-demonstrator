import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";

import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { FullScreen, defaults as defaultControls } from "ol/control";

import GeoJSON from "ol/format/GeoJSON";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { gradStyle,defaultStyle } from './js/styles';




const map = new Map({
  controls: defaultControls().extend([new FullScreen()]),

  layers: [
    new TileLayer({
      source: new OSM(),
    }), //vectorLayer
  ],
  target: "map",
  view: new View({
    center: [-9201767, 2922912],
    zoom: 4,
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

console.log(url)
  let selected;
  const selectedStyle = (feature)=>{
  
      if(feature.get('name')===selected){
  return defaultStyle
      }
  
      return gradStyle(feature)
  }
  
  
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      url: `${url}`,
      //url: 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json',
      format: new GeoJSON(),
    }),
    style: selectedStyle,
  });
  
  map.addLayer(vectorLayer);

  const handleChange =(event)=>{
  selected= event.target.value
  vectorLayer.changed()
  
  }
  
  document.getElementById('states').addEventListener('change', handleChange)

  
  
});