import { Fill, Stroke, Style, Text } from "ol/style";
const defaultStyle = new Style({
    fill: new Fill({
      color: 'blue',
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

const form = document.getElementById('states')
const stateOptionElement = document.createElement('option')
stateOptionElement.innerHTML=feature.get("name")
form.appendChild(stateOptionElement)


    var data = feature.get("density");
    var color;
    if (data < 5) {
      color = colorGradient[6]; //low value
    } else if (data >= 5 && data < 50) {
      color = colorGradient[5]; //
    } else if (data >= 50 && data < 100) {
      color = colorGradient[4];
    } else if (data >= 100 && data < 300) {
      color = colorGradient[3];
    } else if (data >= 300 && data < 500) {
      color = colorGradient[2];
    } else if (data >= 500) {
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

  const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let tjsUrl = document.querySelector("#apiurl").value;
  let frameworkData = document.querySelector("#frameworkurl").value;
  let attributeData = document.querySelector("#attributeurl").value;
  let frameworkKey = document.querySelector("#frameworkkey").value;
  let attributeKey = document.querySelector("#attributekey").value;
  let layer = document.querySelector("#preference");

  //const url = `${tjsUrl}FrameworkURI=${frameworkData}&GetDataURL=${attributeData}&FrameworkKey=${frameworkKey}&AttributeKey=${attributeKey}`;


  
  map.addLayer(vectorLayer);
  layer.innerHTML = `<div class="preference">
  <input type="checkbox" name="new-layer" id="new-layer" /><label
    for="new-layer"
    >New Layer</label
  >
</div>`;
});


export {gradStyle,defaultStyle}