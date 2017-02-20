<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title><?=$this->pageTitle?></title>
    <script src="<?=Yii::app()->baseUrl?>/resources/extjs/lib/ext-all-debug.js"></script>
    <script src="js/Global.js"></script>
	<script src="js/Constant.js"></script>
	<script type="text/javascript">
		apiUrl = '<?=Yii::app()->params['API_URL']?>';
		<?php if(isset(Constant::$SCHEDULE_TIME_START)):?>
		Constant.SCHEDULE_TIME_START = "<?=Constant::$SCHEDULE_TIME_START?>";
		<?php endif;?>
		<?php if(isset(Constant::$SCHEDULE_TIME_END)):?>
		Constant.SCHEDULE_TIME_END = "<?=Constant::$SCHEDULE_TIME_END?>";
		<?php endif;?>
		<?php if(!Yii::app()->user->isGuest):?>
		Global.userLoged = true;
		Global.authData = Ext.decode('<?=json_encode(Yii::app()->user->getState('authData'))?>');
		<?php endif;?>
		if(!Global.userLoged){
			alert('ログインに失敗しました！もう一度ログインしてください！');
			window.location = "<?=Yii::app()->baseUrl?>/pc";
		}
		phpClientUrl = '<?=Yii::app()->baseUrl?>';
	</script>
	<script type="text/javascript">
		Ext.Ajax.defaultHeaders = {
			'token': Global.authData.token,
			'sessionID': Global.authData.sessionID
		};
		scheduleEventData = null;
		Ext.Ajax.request({
			method: 'GET',
			url: apiUrl +'schedule/LoadScheduleEvents',
			params: {idDate: new Date()},
			success: function(data){
				scheduleEventData = Ext.decode(data.responseText).results;
			}
		});
	</script>
	<script src="js/Common.js"></script>
    <script src="js/ScreenType.js"></script>
    <script src="js/MessageCommon.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/resources/scheduler/js/sch-all-debug.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/resources/scheduler/js/schedule-config.js"></script>
    <link rel="stylesheet" href="<?=Yii::app()->baseUrl?>/resources/scheduler/css/sch-all-debug.css">
    <link rel="stylesheet" href="<?=Yii::app()->baseUrl?>/resources/scheduler/css/custom-style.css">
	<script type="text/javascript">
		<?php
			$appScript = file_get_contents('client/scheduler/app.js');
			$appScript = str_replace("name: 'MyApp'", "name: 'MyApp', appFolder: 'client/scheduler/app'", $appScript); 
			echo $appScript;
		?>
		MyApp.app.common.loadTheme(Ext.util.Cookies.get('theme'));
	</script>
</head>
<body></body>
</html>