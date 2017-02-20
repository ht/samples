<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title><?=$this->pageTitle?></title>
	<script>
        var Ext = Ext || {};
        Ext.theme = {
            name: "Default"
        };
    </script>
    <script src="<?=Yii::app()->baseUrl?>/resources/touch/resources/js/sencha-touch-all.js"></script>
    <link rel="stylesheet" href="<?=Yii::app()->baseUrl?>/resources/touch/resources/css/sencha-touch.css">
	<script src="js/Global.js"></script>
	<script type="text/javascript">
		apiUrl = '<?=Yii::app()->params['API_URL']?>';
		Global.authData.token = '<?=$this->token?>';
		<?php if($this->internalAccess):?>
		Global.internalAccess = true;
		<?php endif;?>
		<?php if(!Yii::app()->user->isGuest):?>
		Global.userLoged = true;
		Global.serverTime = '<?=date('Y-m-d')?>';
		Global.authData = Ext.decode('<?=json_encode(Yii::app()->user->getState('authData'))?>');
		<?php endif;?>
		phpClientUrl = '<?=Yii::app()->baseUrl?>';
	</script>
	<script src="js/Common.js"></script>
    <script src="js/Constant.js"></script>
    <script src="js/ScreenType.js"></script>
    <script src="js/MessageCommon.js"></script>
    <link rel="stylesheet" href="resources/sm/css/navigation.css">
    <link rel="stylesheet" href="resources/sm/css/style.css">
    <link rel="stylesheet" href="resources/sm/css/TreeGrid.css">
    <link rel="stylesheet" href="resources/sm/css/TouchTreeGrid.css">
    <link rel="stylesheet" href="resources/sm/css/touch-scheduler-all.css">
    <script src="resources/sm/js//DateTime.js"></script>
    <script src="resources/sm/js/DateTimePicker.js"></script>
    <script src="resources/sm/js/Picker.js"></script>
    <script src="resources/sm/js/touch-scheduler-all.js"></script>
    <script src="resources/sm/js/LoadingMask.js"></script>
	<script type="text/javascript">
		<?php
			$appScript = file_get_contents('client/sm/app.js');
			$appScript = str_replace("name: 'HKD'", "name: 'HKD', appFolder: 'client/sm/app'", $appScript); 
			echo $appScript;
		?>
	</script>

    <script src="<?=Yii::app()->baseUrl?>/client/sm/packages/sencha-touch-grid/src/grid/HeaderContainer.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/client/sm/packages/sencha-touch-grid/src/grid/HeaderGroup.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/client/sm/packages/sencha-touch-grid/src/grid/Row.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/client/sm/packages/sencha-touch-grid/src/grid/column/Column.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/client/sm/packages/sencha-touch-grid/src/grid/column/Boolean.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/client/sm/packages/sencha-touch-grid/src/grid/column/Date.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/client/sm/packages/sencha-touch-grid/src/grid/column/Template.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/client/sm/packages/sencha-touch-grid/src/grid/Grid.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/client/sm/packages/sencha-touch-grid/src/grid/plugin/ColumnResizing.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/client/sm/packages/sencha-touch-grid/src/grid/plugin/Editable.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/client/sm/packages/sencha-touch-grid/src/grid/plugin/MultiSelection.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/client/sm/packages/sencha-touch-grid/src/grid/plugin/PagingToolbar.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/client/sm/packages/sencha-touch-grid/src/grid/plugin/SummaryRow.js"></script>
    <script src="<?=Yii::app()->baseUrl?>/client/sm/packages/sencha-touch-grid/src/grid/plugin/ViewOptions.js"></script>
</head>
<body></body>
</html>