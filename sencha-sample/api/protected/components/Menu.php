<?php
class Menu extends CWidget{
    public $lang;
    public $active;
    public function run(){
        $menus = Menus::model()->findAll('status = 1 and lang_id = '.$this->lang. ' order by orders');
        echo '<ul>';
        foreach($menus as $menu){
            echo '<li>';
                $href = $menu->alias != ''?strpos($menu->alias, 'http://') == true?$menu->alias:Yii::app()->baseUrl.'/'.$menu->alias:Yii::app()->getBaseUrl(true);
                $class = $this->active == $menu->alias ? 'active' : '';
                echo '<a href="'.$href.'" class="'.$class.'">'.$menu->title.'</a>';
                $this->writeSubCate($menu->cates);
            echo '</li>';
        }
        echo '</ul>';
    }
    private function writeSubCate($subCates){
        if(count($subCates) > 0){
            echo '<ul class="sub_menus">';
            foreach($subCates as $cate){
                echo '<li>';
                    echo '<a href="'.Yii::app()->baseUrl.'/products/'.$cate->alias.'">'.$cate->title.'</a>';
                    $this->writeSubCate($cate->cates);
                echo '</li>';
            }
            echo '</ul>';
        }
    }
}