window.addEventListener( 'load', initialize, false )

function initialize() {
  var world = new World()
  world.setRender();
  world.setCameraPosition();
  world.setLighting();

  var marioFactory = new CubeFactory()

  for ( var i=0; i<mario.cubeAttributes.length; i++ ){
    marioFactory.createCube( mario.cubeAttributes[ i ].color, mario.cubeAttributes[ i ].position )
  };

  cubePlacer(marioFactory.cubes, world)

}


World = function(){
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, .1, 100 );
  this.renderer = new THREE.WebGLRenderer();
  this.controls = new THREE.OrbitControls( this.camera );
}

World.prototype = {
  setRender: function() {
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
  },

  render: function( mesh ) {
    var self = this
    requestAnimationFrame( function(){
     self.render( mesh )
   });

    // mesh.rotation.x += 0.01;
    this.renderer.render( this.scene, this.camera );
  },

  setCameraPosition: function(){
    this.camera.position.z = 30;
    this.camera.position.x = 4;
    this.camera.position.y = 3;
  },

  setLighting: function() {
    var frontLight = new THREE.DirectionalLight( 0xFFFFFF );
    frontLight.position.set( 3, 1, 10 ).normalize();
    var ambientLight = new THREE.AmbientLight( 0x555555 );
    this.scene.add( frontLight );
    // this.scene.add( ambientLight );
  },

  setScene: function( mesh ) {
    this.scene.add( mesh );
  }
}

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
  }
}

function cubePlacer ( cubes, world ){
  for ( var i=0; i<cubes.length; i++ ){
    world.setScene(cubes[ i ].mesh);
    world.render(cubes[ i ].mesh);
  }
}

function marioShrinker ( geometry, scale ){
  var scale = new THREE.Vector( 1,2,1 );
  THREEx.GeometryUtils.scale( geometry, scale );
}


//geometry merging examples:
// THREE.GeometryUtils.merge(geometry, otherGeometry);

// var mesh = new THREE.Mesh(new THREE.CubeGeometry(10,10,10), new THREE.MeshNormalMaterial());
// mesh.position.x = 30;
// mesh.rotation.y = Math.PI/3;
// THREE.GeometryUtils.merge(geometry, mesh);