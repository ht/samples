<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title><?=$this->pageTitle?></title>
    <script src="<?=Yii::app()->baseUrl?>/resources/extjs/lib/ext-all.js"></script>
    <script src="js/Global.js"></script>
	<script type="text/javascript">
		apiUrl = '<?=Yii::app()->params['API_URL']?>';
		<?php if(!Yii::app()->user->isGuest):?>
		Global.userLoged = true;
		Global.authData = Ext.decode('<?=json_encode(Yii::app()->user->getState('authData'))?>');
		<?php endif;?>
		phpClientUrl = '<?=Yii::app()->baseUrl?>';
	</script>
	<script src="js/Common.js"></script>
    <script src="js/MessageCommon.js"></script>
    <link rel="stylesheet" href="resources/extensible/resources/css/extensible-all.css">
    <script src="resources/extensible/lib/extensible-all-debug.js"></script>
	<script type="text/javascript">
		<?php
			$appScript = file_get_contents('client/pcSchedule/app.js');
			$appScript = str_replace("name: 'MyApp'", "name: 'MyApp', appFolder: 'client/pcSchedule/app'", $appScript); 
			echo $appScript;
		?>
		MyApp.app.common.loadTheme(Ext.util.Cookies.get('theme'));
	</script>
</head>
<body></body>
</html>