window.addEventListener('load', initialize);

function initialize() {
  var world = new World()
  world.setRender();
  world.setCameraPosition();
  world.setLighting();

  var marioFactory = new CubeFactory()
  var mergedMarioGeometry = new THREE.Geometry()

  for ( var i = 0; i < mario.cubeAttributes.length; i++ ){
    marioFactory.createCube( mario.cubeAttributes[ i ].color, mario.cubeAttributes[ i ].position, mario.cubeAttributes[ i ].color)
}

  for ( var i = 0; i < marioFactory.cubes.length; i++ ){
    THREE.GeometryUtils.merge( mergedMarioGeometry, marioFactory.cubes[ i ].mesh)
  };

  var mergedMarioMesh = new THREE.Mesh( mergedMarioGeometry)

  world.setScene( mergedMarioMesh );
  world.render( mergedMarioMesh );

  marioGrassTexture = "0xff0000";
  marioFloor = new Floor( {texture: marioGrassTexture, width: 900, length: 900});
  marioFloor.render( world.scene )
}

World = function(){
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, .1, 100 );
  this.renderer = new THREE.WebGLRenderer();
  this.controls = new THREE.OrbitControls( this.camera );
}

World.prototype.setRender = function() {
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
  }

World.prototype.render = function( mesh ) {
    var self = this
    requestAnimationFrame( function(){
     self.render( mesh )
   });

    this.renderer.render( this.scene, this.camera );
  }

World.prototype.setCameraPosition = function(){
    this.camera.position.z = 30;
    this.camera.position.x = 4;
    this.camera.position.y = 3;
  }

World.prototype.setLighting = function() {
    var frontLight = new THREE.DirectionalLight( 0xFFFFFF );
    frontLight.position.set( 3, 1, 10 ).normalize();
    var ambientLight = new THREE.AmbientLight( 0x555555 );
    this.scene.add( frontLight );
  }

World.prototype.setScene = function( mesh ) {
    this.scene.add( mesh );
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
function Floor ( opts ) {
  this.texture = opts.texture;
  this.width = opts.width;
  this.length = opts.length;
}

Floor.prototype = {
  render: function ( scene ) {
    // this.mesh = new THREE.Mesh( new THREE.PlaneGeometry(this.width, this.length, new THREE.MeshBasicMaterial( {color: this.texture, ambient: 0x333333, map:texture} )))
    this.geo = new THREE.PlaneGeometry( this.width, this.length, 10, 10);
    this.mat = new THREE.MeshLambertMaterial({color: this.texture});
    this.mesh = new THREE.Mesh( this.geo, this.mat);
    this.placement();
    scene.add( this.mesh );
  },
  placement: function(){
    this.mesh.rotation.x = - Math.PI/2;
    this.mesh.position.y = -25;
  },
}

