<?php
// remove the following lines when in production mode
defined('YII_DEBUG') or define('YII_DEBUG',false);
// specify how many levels of call stack should be shown in each log message
defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL',0);

$yii=dirname(__FILE__).'/lib/yii/yii.php';
require_once($yii);
// change the following paths if necessary
$config=require(dirname(__FILE__).'/protected/config/main.php');
Yii::createWebApplication($config)->run();


