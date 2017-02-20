<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'Imeigs Company',
	'sourceLanguage'=>'00',
    'language'=>'00',
	// preloading 'log' component
	'preload'=>array('log'),
	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
		'application.common.*',
		'application.services.*',
	),

	'modules'=>array(
		'gii'=>array(
			'class'=>'system.gii.GiiModule',
			'password'=>'123456',
			// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('127.0.0.1','::1','*'),
		),
	),

	// application components
	'components'=>array( 
        'assetManager' => array(
            'linkAssets' => true,
        ),
		'db'=>array(
			'class'=>'CDbConnection',
			'connectionString'=>'oci:dbname=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=10.0.0.1)(PORT=1521)) 
			(CONNECT_DATA=(SERVER=SHARED) (SERVICE_NAME=ora)));charset=UTF8',
			'username'=>'hkd',
			'password'=>'hkd',
		),
        'mail' => array(
            'class' => 'ext.yiimail.YiiMail',
             'transportType'=>'smtp',
             'transportOptions'=>array(
               'host'=>'smtp.g.net',
               'username'=>'imeigs',
               'password'=>'mvsafgnmqtucixet',
               'port'=>'25',
             ),
            'logging' => true,
            'dryRun' => false,
        ),
		'urlManager'=>array(
			'urlFormat'=>'path',
			'showScriptName' => false,
			'rules'=>array(
				'<controller:\w+>/<id:\d+>'=>'<controller>/view',
				'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
			),
		),
        
		'errorHandler'=>array(
			'errorAction'=>'site/error',
		),

        'log' => array(
            'class' => 'CLogRouter',
            'routes' => array(
                array(
                    'class' => 'CFileLogRoute',
                    'levels' => 'trace,debug, info, error, warning'
                ),
                // uncomment the following to show log messages on web pages
//                array(
//                    'class' => 'CWebLogRoute'
//                )
            ),
        ),



        
        'cache'  => array(
            'class'=>'system.caching.CFileCache',
        ),
	),
	'params'=>array(
        'hkdschema'=>'HKD',
		'commonschema' => 'HKDMember',
		'allowedExts' =>array("gif", "jpeg", "jpg", "png","rar","zip","doc","docx","xlsx","xls"),
		'maxsize'=>'9999999999999'
	),
);
