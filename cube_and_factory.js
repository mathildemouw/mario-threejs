function Cube( color, position ) {
  this.geometry = new THREE.CubeGeometry( 1, 1, 1 );
  this.material = new THREE.MeshLambertMaterial( {color: color} );
  this.mesh = new THREE.Mesh( this.geometry, this.material )
  this.mesh.position.x = position.x
  this.mesh.position.y = position.y
  this.mesh.position.z = position.z
}

function CubeFactory() {
  this.cubes = [];
}

CubeFactory.prototype = {
  createCube: function( color, position ){
    var cube = new Cube( color, position );
    this.cubes.push( cube );
    return cube
  },
  applyColor: function ( cubeInfo ) {
    for ( var i = 0; i < cubeInfo.cubeAttributes.length; i++ ){
      this.createCube( cubeInfo.cubeAttributes[ i ].color, mario.cubeAttributes[ i ].position, mario.cubeAttributes[ i ].color)
    }
  },
  mergeColoredCubes: function ( geometryToMerge ) {
    for ( var i = 0; i < this.cubes.length; i++ ){
      THREE.GeometryUtils.merge( geometryToMerge, this.cubes[ i ].mesh)
    }
  },
}
