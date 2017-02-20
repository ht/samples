/**
 * enchant();
 * enchant.js を使う前に必要な処理。
 * (enchant.js 本体や、読み込んだプラグインの中で定義されている enchant.Foo, enchant.Plugin.Bar などのクラスを、
 *  それぞれグローバルの Foo, Bar にエクスポートする。)
 */
enchant();
/*
 * window.onload
 * ページがロードされた際に実行される関数。
 * すべての処理はページがロードされてから行うため、 window.onload の中で実行する。
 * 特に new Game(); は、<body> タグが存在しないとエラーになるので注意。
 */
var game;
var imageassets =["chara1.png","battle_ryu.png",
                  "chara2.png","pad.png","bg.png",
                  "greee.png",
                  "kusa_x_280_y_0.png",
                  "background.png",
                  "zarigani_move.png",
                  "bg_life.png",
                  "kusa.png",
                  "title.png",
                  "title_logo.png",
                  "gameover.png",
                  "river.mp3",
                  "0094.wav"
                  ];

var zarScenes = {
	startScene:null,
	gameScene:null,
	attackScene:null
};

var ryu;

//ZariController
var zarCon;


window.onload = function(){

	zarCon = new ZariController();
	
	game = new ZariGame(zarScenes.gameScene);

	
    /**
     * Game#start
     * ゲームを開始する。この関数を実行するまで、ゲームは待機状態となる。
     * 代わりに Game#debug を使うことで、デバッグモードで起動することができる。
     * Game#pause(); で一時停止し、 Game#resume(); で再開することができる。
     */
	
	
    game.start();
};






var ZariGame = Class.create(Game,{

	
	initialize:function(scene){

		Game.call(this,320,320);


		
		this.fps = 15;
	    this.preload(imageassets);
	    this._mainScene = scene;

	    
	    
	},
	onenterframe:function(){
		
	},
	
	onload:function(){
		//scene = new ZariGameScene();

	    var ldScene = new Scene();
	    var bg = new Sprite(320,320);
	    this.load["bg.png"];
	    bg.image = this.assets["bg.png"];
	    bg.x = 0;
	    bg.y = 0;
	    ldScene.addChild(bg);
	    
		this.loddingScene = ldScene;
		

		this._mainScene = 
			zarScenes.startScene = new ZariGameScene();
		//this._mainScene.backgroundColor = 'cyan';
		
		zarScenes.startScene = new SplashScene();

		//lifeguage = new Sprite(320,50);
		//lifeguage.image = game.assets["bg_life.png"];
		//lifeguage.frame = 0;
		//this._mainScene.addChild(lifeguage);
	    /*
	    var ldScene = new Scene();
	    var bg = new Sprite(1219,819);
	    bg.image = this.assets["pad.png"];
	    bg.x = 0;
	    bg.y = 0;
	    ldScene.addChild(bg);
	    
		this.lodingScene = ldScene;
		*/
	    
		
		
		this.gp1 = new ZariArea(this._mainScene,320,280);
    	this.gp1.x = 0;
    	this.gp1.y = 100;

    	this.pane = new ZariPane(this._mainScene,this.width,100);

        //テストざりがに
		var zari = new Zari(this._mainScene);
		zari.tag = -100;
		
		var zariG = new ZariGold(this._mainScene);
		zariG.tag = -100;

        
        //操作アイテム。
		zarCon.handitem = new HandItem(this._mainScene);

		//水エリアにざりがに放流
        for ( var i = 0; i < 10; i++) {
    		var zari2 = new Zari(this.gp1);
    		zari2.tag = i+1;
    		zari2.setRndDegree();
    		//zari2.pad = pad;
    	}

    	//障害物
        for ( var i = 0; i < 10; i++) {
    		new Kusa(this._mainScene,0,50);
    	}
        
        var kusa = new Sprite(320,40);
		kusa.y = this._mainScene.height-kusa.height;
		kusa.x = 0;
		kusa.image = game.assets["kusa_x_280_y_0.png"];
		this._mainScene.addChild(kusa);
		
        ryu = new Ryu(this._mainScene);
    	
        /**
         * new Sprite(width, height)
         * スプライトオブジェクトを作成する。
         * Sprite は、Entity, Node, EventTarget を継承しており、それぞれのメソッドやプロパティを使うことができる。
         */
        
        zarCon.scorelabel = new Label("らいふげーじ："+zarCon.guagenum);
        zarCon.scorelabel.x = 0;
        zarCon.scorelabel.y = 0;
        
        this._mainScene.addChild(zarCon.scorelabel);
        


	    this.pushScene(this._mainScene);
		this.pushScene(zarScenes.startScene);
		game.assets['river.mp3'].play();
		
	}
	

});

