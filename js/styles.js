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


    var data = feature.get("deaths");
    var color;
    if (data < 5) {
      color = colorGradient[6]; //low value
    } else if (data >= 5 && data < 500) {
      color = colorGradient[5]; //
    } else if (data >= 500 && data < 10000) {
      color = colorGradient[4];
    } else if (data >= 10000 && data < 30000) {
      color = colorGradient[3];
    } else if (data >= 30000 && data < 50000) {
      color = colorGradient[2];
    } else if (data >= 50000) {
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

export {gradStyle,defaultStyle}