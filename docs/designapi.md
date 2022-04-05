
https://sbcode.net/threejs/physics-cannonjs/
https://github.com/schteppe/cannon.js/wiki/Parameter-tweaking
# Physics API:
  Simple setup for check and config default setup
```js
linearDamping default 0.01
linearFactor default 0.01
```


```js
Collision filter groups - must be powers of 2!
const GROUP1 = 1
const GROUP2 = 2
const GROUP3 = 4
```

```js
function initMeshPlane(iMesh){


  iMesh.userData.shapeType="Box";
  iMesh.userData.isTrigger=true;
  iMesh.userData.onCollide=function(event){
    console.log("collide?")
  }
}



```