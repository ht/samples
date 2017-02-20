//enchant();


var HandItem = Class.create(Sprite,{
	initialize:function(scene){
		
        Sprite.call(this,64, 64);

        this.image = game.assets["chara1.png"];
        /**
         * vx, vy
         * @type {Number}
         * 入力ベクトルの(x, y)方向の大きさ
         */
        this.vx = 0;
		this.vy = 0;

        /**
         * rad, dist
         * @type {Number}
         * 入力ベクトルの極座標表示
         * radは角度、distはベクトルの大きさを示す
         */
        this.rad = 0;
        this.dist = 0;
        this.r = this.width/2;
        this.mode = 'direct';

        this.x = 0;
        this.y = 100;//game.height-this.height;

        this.istouched = false;
        this.ismoving = false;
        this.speed = 8;
        
        this.frame = [10];
        this.catching = false;
        this._catchage = 0;
        
    	scene.addChild(this);
        
	},
	onenterframe:function(){
		if(this.istouched && this.ismoving){
			this.frame = [10,11];
			this.x += this.vx * (this.dist * this.speed);
			this.y += this.vy * (this.dist * this.speed);
			this.rotation = this.rad*(180/Math.PI);
			

		}
		//１０フレームすぎたら捕まえ状態解除
		if(this.catching){
			if(this.age - this._catchage > 5){
				this.catching = false;
			}
			
		}

	},
    /**
     * タッチされると消える処理を実現するために、
     * touchstart イベントが起こったとき、クマが消える処理をリスナとして追加する。
     */
    ontouchstart:function(e){
    	this.istouched = true;
    	//console.log('handitem touched');
		this._detectInput(e.localX, e.localY);
		this._calcPolar(e.localX, e.localY);

    },
    ontouchmove:function(e){
    	this.ismoving = true;
		this._detectInput(e.localX, e.localY);
		this._calcPolar(e.localX, e.localY);
    },
    ontouchend:function(){
    	this.vx = 0;
    	this.vy = 0;
    	this.ismoving = false;
    	this.istouched = false;
    	this.catching = true;
    	this._catchage = this.age;
    	//console.log('handitem touch end');
    	this.frame = [10];
    },
	_detectInput: function(x, y) {
		x -= this.width / 2;
		y -= this.height / 2;
		var distance = Math.sqrt(x * x + y * y);
		var tan = y / x;
		var rad = Math.atan(tan);
		var dir = x / Math.abs(x);
		if (distance == 0) {
			this.vx = 0;
			this.vy = 0;
		} else if (x == 0) {
			this.vx = 0;
			if (this.mode == 'direct') {
				this.vy = (y / this.r);
			} else {
				dir = y / Math.abs(y);
				this.vy = Math.pow((y / this.r), 2) * dir;
			}
		} else if (distance < this.r) {
			if (this.mode == 'direct') {
				this.vx = (x / this.r);
				this.vy = (y / this.r);
			} else {
				this.vx = Math.pow((distance / this.r), 2) * Math.cos(rad) * dir;
				this.vy = Math.pow((distance / this.r), 2) * Math.sin(rad) * dir;
			}
		} else {
			this.vx = Math.cos(rad) * dir;
			this.vy = Math.sin(rad) * dir;
		}
	},
	_calcPolar: function(x, y) {
		x -= this.width / 2;
		y -= this.height / 2;
		var add = 0;
		var rad = 0;
		var dist = Math.sqrt(x * x + y * y);
		if (dist > this.r) {
			dist = this.r;
		}
		dist /= this.r;
		if (this.mode == 'normal') {
			dist *= dist;
		}
		if (x >= 0 && y < 0) {
			add = Math.PI/2*3;
			rad = x / y;
		} else if (x < 0 && y <= 0) {
			add = Math.PI;
			rad = y / x;
		} else if (x <= 0 && y > 0) {
			add = Math.PI / 2;
			rad = x / y;
		} else if (x > 0 && y >= 0) {
			add = 0;
			rad = y / x;
		} 
		if (x == 0 || y == 0) {
			rad = 0;
		}
		this.rad = Math.abs(Math.atan(rad)) + add; 
		this.dist = dist;
		//console.log(this.rad*(180/Math.PI));
		//console.log(this.dist);
	}

	
});
