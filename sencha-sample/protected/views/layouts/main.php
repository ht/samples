<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title><?=$this->pageTitle?></title>
    <script src="<?=Yii::app()->baseUrl?>/resources/extjs/lib/ext-all.js"></script>
	<script src="<?=Yii::app()->baseUrl?>/resources/tag/BoxSelect.js"></script>
	<link rel="stylesheet" type="text/css" href="<?=Yii::app()->baseUrl?>/resources/tag/BoxSelect.css" />
	<script src="js/Global.js"></script>
	<script type="text/javascript">
		apiUrl = '<?=Yii::app()->params['API_URL']?>';
		Global.authData.token = '<?=$this->token?>';
		<?php if($this->internalAccess):?>
		Global.internalAccess = true;
		<?php endif;?>
		<?php if(!Yii::app()->user->isGuest):?>
		Global.userLoged = true;
		Global.authData = Ext.decode('<?=json_encode(Yii::app()->user->getState('authData'))?>');
		<?php endif;?>
		phpClientUrl = '<?=Yii::app()->baseUrl?>';
	</script>
	<script src="<?=Yii::app()->baseUrl?>/client/app/Work.js"></script>	
    <script src="js/Validate.js"></script>
    <script src="js/Common.js"></script>
    <script src="js/ScreenType.js"></script>
    <script src="js/MessageCommon.js"></script>
    <script src="js/Constant.js"></script>
    <script type="text/javascript">
		<?php
			$appScript = file_get_contents('client/pc/app.js');
			$appScript = str_replace("name: 'MyApp'", "name: 'MyApp', appFolder: 'client/pc/app'", $appScript); 
			echo $appScript;
		?>
	</script> 
</head>
<body></body>
</html>