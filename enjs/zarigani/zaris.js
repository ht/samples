//enchant();
var ZariController= Class.create({
	initialize:function(){
		//Group.call(this);
		this.handitem=null;
		this.guagenum=0;
		this.scorelabel=null;
		this.attackfailure=false;
		this.lifeguage=null;
		//var lifetimes = [30,30,30,10];
		this.lifetimes=[15,15,10,5];
		this.lifetimeage=0;
	    this.curtag=0; //タップ順。
		this.isstart=false;
		this.maxZari=20;
		this.mode = 0;
		
	}
/*
 * 
,
	handitem:null,
	guagenum:0,
	scorelabel:null,
	attackfailure:false,
	lifeguage:null,
	lifetimes:[15,15,10,5],
    lifetimeage:0,
	curtag:1, //タップ順。
	isstart:false,
	maxZari:20,
*/	
});


var ZariNo = Class.create(Group,{
	no:-99,
	text:{
		get:function(){
			return this.no;
		},
		set:function(v){
			this.no = v;
			
			
		}
	},
	initialize:function(parent,_no){
		Group.call(this,16,16);
		this._pair = parent;
		this._sp = new Sprite(16,16);
		
		this._sp.image = game.assets["bg_life.png"];
		this._sp.frame = 29;
		this.no = _no;
		this._label = new Label("" + _no);
		this._label.font = "12px cursive";
		this._label.color = "#f00";
		this._label.x = 0;
		this._label.y = 0;
		
		this.addChild(this._sp);
		this.addChild(this._label);
	},
	onenterframe:function(){
		this._label.text = ""+this.no;
	},
	ontouchend:function(){
		var e = new enchant.Event('touchend');
		this._pair.dispatchEvent(e);
	}
});


var Zari = Class.create(Sprite,{
	MOVEACT:[0,1],
	MOVEACTNIGE:[2,3],
	MOVEACTHAYA:[0,1],
	tag:{
		get:function(){return this._tag;},
		set:function(val){this._tag = val;
			//ヒット回数のラベルを配置
			//var num = this._calrnd(1,20);
			this.label = new ZariNo(this,val);
			this.label.x = this.x;
			this.label.y = this.y;
			if(this.parentNode==null){
				this.scene.addChild(this.label);
				
			}
			else{
				this.parentNode.addChild(this.label);
				
			}
		}
	},
	initialize:function(scene){
        Sprite.call(this,32, 32);
        this._tag = 0;
	    this.image = game.assets["zarigani_move.png"];
        
   
		this.x = Math.random()*scene.width;
		this.y = Math.random()*scene.height;
		
		this.vx = 0;
		this.vy = 0;
		
		this.frame = this.MOVEACT;
		this.olddegree = null;
		this.isrunaway = false;
		this.runaway_framenum = 0;
		this.chgdegree_framenum = 0;
		
		this._pad = null;
		this.degree = -90;
		this.speed = 2.0;
		
		
		scene.addChild(this);
        
        
	},
	setRndDegree:function(){
		this.setDegree(Math.random()*350);

	},
	setDegree:function(degree){
		this.degree = degree;
		this.rotation = degree + 90;
		this.vx = Math.cos(degree * Math.PI / 180);
		this.vy = Math.sin(degree * Math.PI / 180);
		
	},
	pad:{
		get:function(){
			return this._pad;
		},
		set:function(uipad){
			this._pad = uipad;
		}
	},

	_calcdegree_old:function(){
		if(this._pad && this._pad.isTouched){
			this.x += this._pad.vx * this.speed;
			this.y += this._pad.vy * this.speed;
			var dg = this._pad.rad *(180/ Math.PI);
			//パッドの角度を追加で加算して動く向きをかえる
			//まだ、まわってしまうので、パッドの方向が変化した分だけって感じ？
			if(this.olddegree==null) this.olddegree = dg;
			

			
			//this.degree = Math.max(this.degree,dg-360);
		}
		if(this._pad && !this._pad.isTouched && this.olddegree != null){
			this.x += this._pad.vx * this.speed;
			this.y += this._pad.vy * this.speed;
			var dg = this._pad.rad *(180/ Math.PI);

			if (dg >180) {
				this.degree -= 10;
				this.degree = Math.min(this.degree, this.degree+360);
				this.setDegree(this.degree);
			}
			if (dg < 180) {
				this.degree += 10;
				this.degree = Math.max(this.degree, this.degree-360);
				this.setDegree(this.degree);
			}
			this.vx = this._pad.vx;
			this.vy = this._pad.vy;
			
			this.olddegree = null;
		}
		
	},
	_calrnd:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	},
	
	_calcAction:function(){
		//逃げるアクション開始
		if(!this.isrunaway){
		//ランダムで向きを変える
			var x = this._calrnd(5,60) % 31;
			if (x==0){
				this.setRndDegree();
				this.chgdegree_framenum = this._calrnd(15,40);
				//console.log("degree changed " + this.degree);
				return;
				
			}
			if(this.chgdegree_framenum>0){
				this.chgdegree_framenum--;
				return;
			}
			
		
			//1/10で２０フレーム内だけスピードを上げる
			var runaway = this._calrnd(1,50) % 45;
			if( runaway == 0){
				//console.log("runaway ready " + runaway);
				this.runaway_framenum = this._calrnd(10,25);
				this.isrunaway = true;
				this.frame = this.MOVEACTNIGE;
				if(this.degree + 150 > 360){
					this.setDegree(this.degree + 150 - 360);
					
				}
				else{
					this.setDegree(this.degree + 150);
					
				}
			}
		}
		else{
			if(this.runaway_framenum>0){
				this.runaway_framenum--;
				this.speed = 9;
			}
			else{
				this.speed = 2;
				this.isrunaway = false;
				this.frame = this.MOVEACT;
			}
				
		}
		
	},

	onenterframe:function(){
		if(this.age % 2 == 0)
			this._calcAction();
		if(this.age % 2 == 0){
			if(zarCon.handitem.arc_within(this,3,40)){
				//if(this.isrunaway)
				console.log("runaway ready arc");
				this.runaway_framenum = this._calrnd(10,25);
				this.isrunaway = true;
				this.frame = this.MOVEACTNIGE;
				if(this.degree + 150 > 360){
					this.setDegree(this.degree + 150 - 360);
					
				}
				else{
					this.setDegree(this.degree + 150);
					
				}
				
			}
		}
		if( zarCon.handitem.catching){
			if (this.intersect(zarCon.handitem)){
				var za = this;
				game.pushScene(new AttackScene(10,function(){
					if(!zarCon.attackfailure)					{
						za.parentNode.removeChild(za);
						zarCon.guagenum+=10;
					}
					
				}));
				
			}
		}
			
        /**
         * ランダムな方向に移動する動き
         * 
         */
        //this.frame = this.age % 2 + 3;
		this.x += this.vx * this.speed;
		this.y += this.vy * this.speed;
		this.label.x = this.x;
		this.label.y = this.y;
		//this.label.rotation = this.rotation;
		if(this.age % 15 == 0){
			this.label.text = this.tag;
    		this.label._label.color = "#f00";

		}
		var pn = this.parentNode;
		
		if(this.parentNode){
			(function(){})();
		}
		else{
			pn = this.scene;
		}
		if (this.x+this.width < 0) this.x = pn.width;
		if (this.x > pn.width) this.x = -this.width;
		if (this.y+this.height < 0) this.y = pn.height;
		if (this.y > pn.height) this.y = -this.height;
		
	},
    /**
     * タッチされると消える処理を実現するために、
     * touchstart イベントが起こったとき、クマが消える処理をリスナとして追加する。
     */
    ontouchend:function(){

    	if(this.tag != zarCon.curtag +1){
    		this.label.text = "俺じゃねーよ！！！！";
    		this.label._label.color = "#f00";
    		return;
    	}
    	zarCon.curtag = this.tag;
    	zarCon.guagenum+=10;

        /**
         * クマを game.rootScene から削除する。
         * Group#addChild の逆は Group#removeChild。
         */
    	if(this.parentNode){
    		this.parentNode.removeChild(this);
    	}
    	else{
        	var sc = this.scene;
        	sc.removeChild(this);
    		
    	}
    	
        //game.currentScene.removeChild(this);
    }
});

var ZariGold = Class.create(Zari,{
	_angle:0,
	initialize:function(scene){
		Zari.call(this,scene);
		this.frame = 4;
		this.scale(2,2);
		
	},
	angle:{
		get:function(){
			return this._angle;
		},
		set:function(angle){
			this._angle = angle;
		}
	},
	onenterframe:function()
	{
		Zari.prototype.onenterframe.call(this);
		
		if(this.age % 10 == 0){
			if(this._angle == 1){
				this.rotate(-40);
				this._angle = 2;
				
			}
			else if(this._angle == 2){
				this.rotate(40);
				this._angle = 1;
				
			}
			else{
				this.rotate(20);
				this._angle = 1;
				
			}
			
		}
	}
});


var ZariPane = Class.create(Group,{
	initialize:function(scene,w,h){
		Group.call(this);
		this.width = w;
		this.height = h;

		var pane = new Sprite(64,64);
		pane.image = game.assets["chara2.png"];
		pane.frame = 0;
		//pane.width = pane.image.width;
		pane.x = this.width;// - pane.image.width;
		pane.y = 0;
		this.addChild(pane);
		
		var btn = new enchant.ui.Button();
		btn.width = 32;
		btn.height = 32;
		btn.x = this.width - 64-32;
		btn.y = 0;
		btn.text = "boti";
		btn.ontouchend = function(){
			
			
			ryu.henka = 0;
			ryu.tl.moveTo(-1800,ryu.y,60,enchant.Easing.QUAD_EASEINOUT);
			ryu.tl.tween({
				x:-1800,
				y:ryu.y,
				time:100,
				esing:enchant.Easing.QUAD_EASYINOUT
			});
			game.assets['0094.wav'].play();
			
		};
		
		//this.addChild(pane);
		this.addChild(btn);
		this.x = 0;
		this.y = 0;
		
		scene.addChild(this);
		
	}
});

var ZariArea = Class.create(Group,{
	initialize:function(scene,w,h){
		Group.call(this);
		this.width = w;
		this.height = h;

		//var pane = new Sprite(320,280);
		//pane.image = game.assets["background.png"];
		//pane.frame = 0;
		//this.addChild(pane);
		
		
		scene.addChild(this);
		
	}
});


var ZariGameScene = Class.create(Scene,{
	initialize:function(){
        Scene.call(this);

        
        this.backgroundColor = "cyan";
		zarCon.lifeguage = new Sprite(320,50);
		zarCon.lifeguage.image = game.assets["bg_life.png"];
		zarCon.lifeguage.frame = 0;
		this.addChild(zarCon.lifeguage);
		var pad;
        this.gamepad = pad = new enchant.ui.APad('direct');
        pad.x = 0;
        pad.y = game.height-pad.height;
        //var pad = new APad("direct");
        ////////this._mainScene.addChild(pad);
        // アナログパッドを表示
        // directモード : var pad = new APad("direct");


	},
	onenterframe:function(){
    	zarCon.scorelabel.text = "らいふげーじ："+zarCon.guagenum;
        var ss = game.fps * zarCon.lifetimes[zarCon.lifeguage.frame];
        if(game.frame -zarCon.lifetimeage > ss){
        	if(zarCon.lifeguage.frame == 3){
                if(!zarCon.isstart){
                	zarCon.lifeguage.frame = 0;
                	return;
                	
                }

        		game.pushScene(new GameoverScene());
        		//game.pause();
        	}
        	else{
            	zarCon.lifetimeage = game.frame;
            	zarCon.lifeguage.frame++;
        		
        	}
        		

        }
    	
    	
        if(this.gamepad.isTouched){
        	//console.log(pad.vx);
        	
        	//console.log(pad.vy);
        	var cdg = this.gamepad.rad*(180/Math.PI);

        }		
	}
	
});

var AttackScene = Class.create(Scene,{
	initialize:function(tapcnt,fn){
        Scene.call(this);
        zarCon.attackfailure = true;
        this._fn = fn;
        
        this.istouched = false;
        //this.backgroundcolor = "black";
        this.titlelogos = new Array();
    	var titlelogo = new Sprite(100,100);
        titlelogo.image = game.assets["greee.png"];
        titlelogo.frame = 0;
        titlelogo.x = 100;
        titlelogo.y = 100;
        this._tapcnt = tapcnt;
        this.cur = 0;
        titlelogo.ontouchend = function(e){
        	this.parentNode._tapcnt--;
        };
        this.addChild(titlelogo);
	},
	onenterframe:function(){
		var cc = true;
		if(this._tapcnt==0){
			zarCon.attackfailure = false;
			this._fn();
			game.popScene();
		}
	}
	
});
