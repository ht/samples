<?php
    class Fancybox extends CWidget{
        public function init(){
            $this->registerCoreScript();
        }
        
        public function run(){
            
        }
        
        public function registerCoreScript(){
            $cs = Yii::app()->clientScript;
            $assets = dirname(__FILE__).'/assets';
            $baseUrl = Yii::app()->assetManager->publish($assets);
            $cs->registerCoreScript('jquery')
                ->registerScriptFile($baseUrl.'/jquery.fancybox.js')
                ->registerCssFile($baseUrl.'/jquery.fancybox.css')
                ->registerScript('fancybox', '$(".fancybox").fancybox();', CClientScript::POS_READY);
        }
    }