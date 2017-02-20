<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'Accom PC',

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.common.*',
		'application.models.*',
		'application.components.*',
	),
	// application components
	'components'=>array(
		// uncomment the following to enable URLs in path-format
		'urlManager'=>array(
			'urlFormat'=>'path',
			'showScriptName' => false,
			'rules'=>array(
				'schedule' => 'site/schedule',
				'scheduler' => 'site/scheduler',
				'pc' => 'site/pc',
				'sm' => 'site/sm',
				'<controller:\w+>/<id:\d+>'=>'<controller>/view',
				'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
			),
		),
	),
	'params' => array(
		'API_URL' => (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://54.92.121.75/accom/api/'
	)
);

//54.92.121.75

