World = function(){
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, .1, 100 );
  // this.renderer = new THREE.CanvasRenderer(); this is an interesting thing worth exploring...
  this.renderer = new THREE.WebGLRenderer();
  // this.renderer = opts.renderer;
  this.controls = new THREE.OrbitControls( this.camera );
}

World.prototype.setRender = function() {
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
  }
World.prototype.init = function(){
  this.setRender();
  this.setCameraPosition();
  this.setLighting();
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
    frontLight.position.set( 3, 1, -10 ).normalize();
    var ambientLight = new THREE.AmbientLight( 0x555555 );
    this.scene.add( ambientLight );
    this.scene.add( frontLight );
  }

World.prototype.setScene = function( mesh ) {
    this.scene.add( mesh );
  }