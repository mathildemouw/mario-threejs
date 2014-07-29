function FloorPlane ( opts ) {
  this.texture = THREE.ImageUtils.loadTexture(opts.texture);
  this.width = opts.width;
  this.length = opts.length;
  this.mat = new THREE.MeshLambertMaterial({map:this.texture, color: opts.color, side: THREE.DoubleSide});
  this.geo = new THREE.PlaneGeometry( this.width, this.length, 10, 10);
  this.mesh = new THREE.Mesh( this.geo, this.mat);

}

FloorPlane.prototype = {
  render: function ( scene ) {
    // this.geo = new THREE.PlaneGeometry( this.width, this.length, 10, 10);
    // this.mat = new THREE.MeshLambertMaterial({color: 0xff0000});
    // this.mesh = new THREE.Mesh( this.geo, this.mat);
    this.placement();
    scene.add( this.mesh );
  },
  placement: function(){
    this.mesh.rotation.x = - Math.PI/2;
    this.mesh.position.y = -25;
  },
}