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
		this.mesh = new THREE.Mesh( floorGeo, floorMat);
		this.placement();
		scene.add( this.mesh );
	},
	placement: function(){
		this.mesh.rotation.x = - Math.PI/2;
		this.mesh.position.y = -25;
	},
}

