//enchant();


var SplashScene = Class.create(Scene,{
	
	initialize:function(){
        Scene.call(this);
        this.istouched = false;
        this.backgroundcolor = 'red';
        var titlelogo = new Sprite(280,280);
        titlelogo.image = game.assets["title.png"];
        titlelogo.frame = 0;
        titlelogo.x = 20;
        titlelogo.y = 20;
        
        this._logo = new Sprite(210,110);
        this._logo.image = game.assets["title_logo.png"];
        this._logo.x = -1000;
        this._logo.y = 50;
        
        this.addChild(titlelogo);
        this.addChild(this._logo);
        
        this._mode = 0;//0: hand ,1:tap ,2:numbertap

        var onbtnclick = function(e){
        	zarCon.isstart = true;
        	if(this.text=="H"){
        		zarCon.mode = 0;
        	}
        	else if(this.text =="T"){
        		zarCon.mode = 1;
        		zarCon.handitem.visible = false;
        	}
        	else{
        		zarCon.mode = 2;
        		zarCon.handitem.visible = false;
        		
        	}
    		game.popScene();
        	
        }
        
        var btn1 = new enchant.ui.Button(20.10);
        btn1.x = 40;
        btn1.y = 240;
        btn1.name = "H";
        btn1.text ="H";
        btn1.ontouchend = onbtnclick;
        
        var btn2 = new enchant.ui.Button(20.10);
        btn2.x = 100;
        btn2.y = 240;
        btn2.text = "T";
        btn2.ontouchend = onbtnclick;

        var btn3 = new enchant.ui.Button(20.10);
        btn3.x = 160;
        btn3.y = 240;
        btn3.text ="N";
        btn3.ontouchend = onbtnclick;
    
        
        
        this.addChild(btn1);
        this.addChild(btn2);
        this.addChild(btn3);
        
        //this.ryu2 = new Ryu(this);
        //this.ryu2.henka = 0;
	},
	onenterframe:function(){
		
		this._logo.tl.moveTo(60,50,15,enchant.Easing.QUAD_EASEINOUT);
		this._logo.tl.tween({
			x:100,
			y:50,
			time:100,
			esing:enchant.Easing.QUAD_EASYINOUT
		});		
		if(this.istouched){
			//isstart = true;
			//game.popScene();
		}
		else{
			//this.rotation += 10;
			
		}	
	},
    /**
     * タッチされると消える処理を実現するために、
     * touchstart イベントが起こったとき、クマが消える処理をリスナとして追加する。
     */
    ontouchstart:function(e){
    	this.istouched = true;
    }
	
});


var SplashScene2 = Class.create(Scene,{
	initialize:function(){
        Scene.call(this);
        this.istouched = false;
        this.backgroundcolor = "black";
        this.titlelogos = new Array();
        for(var i=0;i<20;i++){
        	var titlelogo = new Sprite(60,76);
            titlelogo.image = game.assets["greee.png"];
            titlelogo.frame = i;
            titlelogo.x = 0;
            titlelogo.y = 0;
        	this.titlelogos.push(titlelogo);
            this.addChild(titlelogo);
        }
        this.cur = 0;
	},
	onenterframe:function(){
		var cc = true;
		
		if(this.istouched){
			game.popScene();
		}
		else{
			if(this.cur<20){
				this.titlelogos[this.cur].ontouchend=function(){
					cc = true;
				};
				if(this.cur<10){
					this.titlelogos[this.cur].tl.moveTo(60*this.cur,0,10);//.delay(100).movoTo(-1800,0,100);
					
				}
				else{
					this.titlelogos[this.cur].tl.moveTo(60*(this.cur-10),76,10);//.delay(100).movoTo(-1800,0,100);
					
				}
				this.cur++;
				
			}
			else{
				//if(this.age<100)return;
				
				if (false){
					for(var i=1;i<10;i++){
						//this.titlelogos[i].tl.delay(100).movoTo(-1800,0,100);
						
					}
					for(var i=11;i<20;i++){
						//this.titlelogos[i].tl.delay(100).movoTo(-1800,0,100);
						
					}
					
				}
				
				
			}
				
			
		}	
	},
    /**
     * タッチされると消える処理を実現するために、
     * touchstart イベントが起こったとき、クマが消える処理をリスナとして追加する。
     */
    ontouchstart:function(e){
    	this.istouched = true;
    }
	
});

var GameoverScene = Class.create(Scene,{
	initialize:function(){
        Scene.call(this);
        this.istouched = false;
        this.backgroundcolor = 'red';
        var titlelogo = new Sprite(200,200);
        titlelogo.image = game.assets["gameover.png"];
        titlelogo.frame = 0;
        titlelogo.x = 60;
        titlelogo.y =60;
        
        this.addChild(titlelogo);
        //this.ryu2 = new Ryu(this);
        //this.ryu2.henka = 0;
        game.assets['river.mp3'].stop();
        
	},
	onenterframe:function(){
		if(this.istouched){
			game.popScene();
		}
	},
    /**
     * タッチされると消える処理を実現するために、
     * touchstart イベントが起こったとき、クマが消える処理をリスナとして追加する。
     */
    ontouchstart:function(e){
    	this.istouched = true;
    }
	
});
