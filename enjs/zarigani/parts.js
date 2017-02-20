//enchant();
var Kusa = Class.create(Sprite,{
	initialize:function(scene,offsetx,offsety){
		
        Sprite.call(this,50,25);

        this.image = game.assets["kusa.png"];
        /**
         * Node.x Node.y {Number}
         * x, y 座標を指定する。
         * viewport の大きさに合わせて画面が拡大縮小されている場合も、
         * オリジナルの座標系で指定できる。
         */
        this.x = offsetx + Math.random()*game.width;
        this.y = offsety + Math.random()*game.height;
        //ゆらゆらゆれてる草。
        this.frame = [0,0,1,0,1,1,1,0,1];
        
    	scene.addChild(this);
        
	},
	onenterframe:function(){
	
	}
});



var Ryu = Class.create(Sprite,{
	initialize:function(scene){
		var img = game.assets["battle_ryu.png"];
		Sprite.call(this,img.width,img.height);
		this.image = img;
		this.frame = 0;
		this.x = 0;
		this.y = -300;
		this.scaleX = 0.3;
		this.scaleY = 0.3;
        scene.addChild(this);

	},
	henka:10,
    /**
     * タッチされると消える処理を実現するために、
     * touchstart イベントが起こったとき、クマが消える処理をリスナとして追加する。
     */
    ontouchstart:function(){
        /**
         * クマを game.rootScene から削除する。
         * Group#addChild の逆は Group#removeChild。
         */
        game.currentScene.removeChild(this);
    	
    },
    onenterframe:function(){
    	if(this.x<-1500)return;
    	
    	if(this.henka==0){
    		//this.tl.
    		//this.x -=20;
    		if(this.rotation == 0){
    			this.rotation = 8;
    		}
    		else{
        		if(this.rotation == 8){
        			this.rotation = -8;
        		}
        		else{
        			this.rotation = 8;
        		}
    			
    		}
    			
    		
    	}
    	
    }
	
		
});

var Bear = Class.create(Sprite,{
	initialize:function(scene){
		
        Sprite.call(this,32, 32);

        /**
         * Sprite.image {Object}
         * Game#preload で指定されたファイルは、Game.assets のプロパティとして格納される。
         * Sprite.image にこれを代入することで、画像を表示することができる
         */
        this.image = game.assets["chara1.png"];
        

        /**
         * Node.x Node.y {Number}
         * x, y 座標を指定する。
         * viewport の大きさに合わせて画面が拡大縮小されている場合も、
         * オリジナルの座標系で指定できる。
         */
        this.x = Math.random()*game.width;
        this.y = Math.random()*game.height;

        
        /**
         * Sprite.frame {Number}
         * (width, height) ピクセルの格子で指定された画像を区切り、
         * 左上から数えて frame 番目の画像を表示することができる。
         * デフォルトでは、0:左上の画像が表示される。
         * このサンプルでは、シロクマが立っている画像を表示する (chara1.gif 参照)。
         */
        this.frame = [6,7];
        /**
         * Group#addChild(node) {Function}
         * オブジェクトをノードツリーに追加するメソッド。
         * ここでは、クマの画像を表示するスプライトオブジェクトを、rootScene に追加している。
         * Game.rootScene は Group を継承した Scene クラスのインスタンスで、描画ツリーのルートになる特別な Scene オブジェクト。
         * この rootScene に描画したいオブジェクトを子として追加する (addChild) ことで、毎フレーム描画されるようになる。
         * 引数には enchant.Node を継承したクラス (Entity, Group, Scene, Label, Sprite..) を指定する。
         */
        
    	scene.addChild(this);
        
	},
    /**
     * EventTarget#addEventListener(event, listener)
     * イベントに対するリスナを登録する。
     * リスナとして登録された関数は、指定されたイベントの発行時に実行される。
     * よく使うイベントには、以下のようなものがある。
     * - "touchstart" : タッチ/クリックされたとき
     * - "touchmove" : タッチ座標が動いた/ドラッグされたとき
     * - "touchend" : タッチ/クリックが離されたとき
     * - "enterframe" : 新しいフレームが描画される前
     * - "exitframe" : 新しいフレームが描画された後
     * enchant.js やプラグインに組み込まれたイベントは、それぞれのタイミングで自動で発行されるが、
     * EventTarget#dispatchEvent で任意のイベントを発行することもできる。
     *
     * ここでは、右に向かって走っていくアニメーションを表現するために、
     * 新しいフレームが描画される前に、毎回クマの画像を切り替え、x座標を1増やすという処理をリスナとして追加する。
     */
	onenterframe:function(){

        /**
         * クマを走らせるために、x座標をインクリメントしている。
         * この無名関数 function(){ ... } は enterframe イベントのリスナなので、毎フレーム実行される。
         */
        //this.x += 1;

        /**
         * this.age (Node.age) は、クマのオブジェクトが今までに何回描画されたか
         * クマの画像を変えて走るアニメーションを表現するために、
         * frame を 6 -> 7 -> 6 -> 7.. と順番に変えている。
         */
        //this.frame = this.age % 2 + 3;
		
	},
    /**
     * タッチされると消える処理を実現するために、
     * touchstart イベントが起こったとき、クマが消える処理をリスナとして追加する。
     */
    ontouchstart:function(){
        /**
         * クマを game.rootScene から削除する。
         * Group#addChild の逆は Group#removeChild。
         */
        game.currentScene.removeChild(this);
    	
    }
});

