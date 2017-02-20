<?php
/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class Controller extends CController
{
	/**
	 * @var string the default layout for the controller view. Defaults to '//layouts/column1',
	 * meaning using a single column layout. See 'protected/views/layouts/column1.php'.
	 */
	public $layout = 'main';
	
	public $internalAccess = false;
	
	public $token;
	
	public function init(){
		if(substr(Yii::app()->request->url, -1) == '/'){
			$this->redirect(rtrim(Yii::app()->request->url, '/'));
			Yii::app()->end();
		}
		if($_SERVER['REMOTE_ADDR'] == Constant::$ALL_CONNECT_IP){
			$this->internalAccess = true;
		}
		parent::init();
	}
	
	public function beforeAction($action){
		if(Yii::app()->user->isGuest){
			$ch = curl_init();
			$params = array(
				'client_id'     => Constant::$CLIENT_ID, 
				'client_secret' => Constant::$CLIENT_SECRET
			);
			curl_setopt($ch, CURLOPT_URL, Yii::app()->params['API_URL'] . 'site/verifyClient');
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2); 
			curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$response = curl_exec($ch);
			curl_close ($ch);
			$result = json_decode($response);
			if(isset($result->response) && $result->response){
				$this->token = $result->token;
				return parent::beforeAction($action);
			}
		}else{
			return parent::beforeAction($action);
		}
	}
}
