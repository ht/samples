<div id="slider-index" class="slider tpslides">
<?php foreach($slides as $item):?>
    <div class="tpslide">
        <img src="<?=Yii::app()->baseUrl?>/images/slides/<?=$item->id?>.jpg" alt="<?=$item->title?>" />
    </div>
<?php endforeach;?>
</div>
<div class="content">
    <div class="wrapper wrapper2">
        <div class="main main2">
            <div class="title">
                <h1><?=Yii::t('app','Online Shop')?></h1>
            </div>
            <?php foreach($models as $model):?>
            <div class="product">
                <?php if($model->promotion != 0 && $model->promotion != ''):?>
                <div class="sale">
                    <?=$model->promotion?>%<br>Off
                </div>
                <?php endif;?>
                <div class="product-image">
                    <a href="<?=Yii::app()->baseUrl?>/products/<?=$model->alias?>.html">
                        <img src="<?=Yii::app()->baseUrl?>/images/products/<?=count($model->images) > 0 ? file_exists('/images/products/thumbs2/'.$model->images[rand(0, count($model->images) - 1)]->title) ? 'thumbs2/' . $model->images[rand(0, count($model->images) - 1)]->title : 'thumbs/'.$model->image : 'thumbs/'.$model->image?>" alt="<?=$model->title?>" />
                    </a>
                </div>
                <div class="product-more">
                    <a href="<?=Yii::app()->baseUrl?>/products/<?=$model->alias?>.html"><?=$model->title?></a>
                    <a href="<?=Yii::app()->baseUrl?>/products/<?=$model->alias?>.html" class="more-action"><?=Yii::t('app', 'View Detail')?></a>
                </div>
            </div>
            <?php endforeach;?>
        </div>
    </div>
</div>
<div class="infos">
    <div class="wrapper">
        <div class="main">
            <div class="info-left">
                <div class="info-title">
                    <img src="<?=Yii::app()->baseUrl?>/images/websites/support-icon.jpg" alt="" />
                    <h2><?=Yii::t('app', 'Support')?></h2>
                </div>
                <div class="info-left-left">
                    <div class="info-child-title">
                        <img src="<?=Yii::app()->baseUrl?>/images/websites/hr-icon.jpg" alt="" />
                        <h3><?=Yii::t('app', 'Sales Department')?></h3>
                    </div>
                    <div class="info-left-left-content">
                        <span>1-888-987-HELP(4357)</span>
                        <span>Mon - Fri: 7am - 2am (CST)</span>
                        <span>Sat - Sun: 9am - 10pm (CST)</span>
                    </div>
                    <div class="info-child-title">
                        <img src="<?=Yii::app()->baseUrl?>/images/websites/hr-icon.jpg" alt="" />
                        <h3><?=Yii::t('app', 'Technical Department')?></h3>
                    </div>
                    <div class="info-left-left-content">
                        <span>1-888-987-HELP(4357)</span>
                        <span>Mon - Fri: 7am - 2am (CST)</span>
                        <span>Sat - Sun: 9am - 10pm (CST)</span>
                    </div>
                </div>
                <div class="info-left-right">
                    <div class="info-child-title">
                        <img src="<?=Yii::app()->baseUrl?>/images/websites/email-icon.jpg" alt="" />
                        <h3>Email</h3>
                    </div>
                    <div class="info-left-left-content">
                        <span>info@imeigs.com</span>
                    </div>
                    <div class="info-child-title">
                        <img src="<?=Yii::app()->baseUrl?>/images/websites/chat-icon.jpg" alt="" />
                        <h3>Ticket System</h3>
                    </div>
                    <div class="info-left-left-content">
                        <span><a href="<?=Yii::app()->baseUrl?>/ticket/create">Go to ticket system</a></span>
                    </div>
                    <div class="info-child-title">
                        <img src="<?=Yii::app()->baseUrl?>/images/websites/chat-icon.jpg" alt="" />
                        <h3>Live Chat</h3>
                    </div>
                    <div class="info-left-left-content">
                        <span><?=Yii::t('app', 'Live chat is available 24 hours a day, 7 day a week.')?></span>
                        <a href="" onclick="javascript:poptastic('https://app.purechat.com/VisitorWidget/ChatWindow?widgetId=6fd98ef5-676f-4c6f-87b3-3032a0fa0e8f');return false;">
                            <img src="<?=Yii::app()->baseUrl?>/images/websites/live-chat-connect.jpg" alt="" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="info-right">
                <div class="info-title info-right-title">
                    <img src="<?=Yii::app()->baseUrl?>/images/websites/news-icon.jpg" alt="" />
                    <h2><?=Yii::t('app', 'News')?></h2>
                </div>
                <div class="info-right-content">
                <?php if($news):?>
                    <div class="info-news-title">
                        <a href="<?=Yii::app()->baseUrl?>/news/<?=$news->alias?>.html"><?=$news->title?></a>
                    </div>
                    <div class="info-news-summary">
                        <?=$news->summary?>    
                    </div>
                    <div class="info-news-readmore">
                        <a href="<?=Yii::app()->baseUrl?>/news"><?=Yii::t('app', 'Read more...')?></a>
                    </div>
                <?php endif;?>
                </div>
            </div>
        </div>
    </div>
</div>