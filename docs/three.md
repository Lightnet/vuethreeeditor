- https://troisjs.github.io/guide/lights/
- https://codepen.io/collection/AxoWoz
- https://stackoverflow.com/questions/15248872/dynamically-create-2d-text-in-three-js
- https://askcodez.com/trois-js-etiquettes-de-sprites-de-texte-2d.html
- https://gist.github.com/jefedeoro/51dd4496d15cc6b3a9ff3b8c80e88d6c
- https://stackoverflow.com/questions/15248872/dynamically-create-2d-text-in-three-js
- https://github.com/SeregPie/THREE.TextSprite
```js
let sprite = new THREE.TextSprite({
  text: 'Hello World!',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: 12,
  color: '#ffbbff',
});
scene.add(sprite);
```

- https://threejs.org/docs/#manual/en/introduction/Creating-text
- https://www.npmjs.com/package/troika-three-text
```js
var textShapes = THREE.FontUtils.generateShapes( text, options );
var text = new THREE.ShapeGeometry( textShapes );
var textMesh = new THREE.Mesh( text, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;
scene.add(textMesh);
// Example text options : {'font' : 'helvetiker','weight' : 'normal', 'style' : 'normal','size' : 100,'curveSegments' : 300};
```
```js
var textShapes = THREE.FontUtils.generateShapes( text, options );
var text = new THREE.ShapeGeometry( textShapes );
textMesh.geometry = text;
textMesh.geometry.needsUpdate = true;
```


Works!
```js
import {Text} from 'troika-three-text'

// Create:
const myText = new Text()
myScene.add(myText)

// Set properties to configure:
myText.text = 'Hello world!'
myText.fontSize = 0.2
myText.position.z = -2
myText.color = 0x9966FF

// Update the rendering:
myText.sync()
```
