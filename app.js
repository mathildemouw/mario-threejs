window.addEventListener('load', initialize);
document.getElementById("marioWorld");

function initialize() {
  var world = new World();
  world.init();

  var marioCollection = new CubeFactory()
  marioCollection.applyColor( mario )
  var mergableMarioGeometry = new THREE.Geometry()
  marioCollection.mergeColoredCubes( mergableMarioGeometry )
  var mergedMarioMesh = new THREE.Mesh( mergableMarioGeometry)

  world.setScene( mergedMarioMesh );
  world.render( mergedMarioMesh );

  var marioGrassTexture = new Image();
  marioGrassTexture.src = 'images/marioGrassTile.jpg';
  // marioGrassTexture.onload = function () {
  //   var data = getHeightData(marioGrassTexture);

    
  // }
  var marioFloor = new FloorPlane( { texture: marioGrassTexture, width: 600, length: 600, color: '#ff0000'});
  marioFloor.render( world.scene );
  // world.setScene( marioFloor.mesh );
  // world.render( marioFloor.mesh );
}
// TODO: why crazy acid colors?
// TODO: texture from images on FloorPlane
// TODO: Mushroom from three.js shapes (not blocks)
