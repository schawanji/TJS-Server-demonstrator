

import GeoJSON from "ol/format/GeoJSON";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { gradStyle,defaultStyle } from "./styles";


let selected;
const selectedStyle = (feature)=>{

    if(feature.get('name')===selected){
return defaultStyle
    }

    return gradStyle(feature)
}
const vectorLayer = new VectorLayer({
  source: new VectorSource({
    //url: `${url}`,
    url: 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json',
    format: new GeoJSON(),
  }),
  style: selectedStyle,
});

const handleChange =(event)=>{
selected= event.target.value
vectorLayer.changed()

}

document.getElementById('states').addEventListener('change', handleChange)
export {vectorLayer}