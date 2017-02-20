<?php


class SiteController extends Controller
{
	public function init(){
		$this->actionNotAuth = array(
			'Login',
			'Error',
			'VerifyToken'
		);
		$this->actionNotAuthToken = array(
			'VerifyClient'
		);
		parent::init();
	}
	
	public function actionIndex()
	{
		echo 'OJ';
	}
	

	public function actionLogin(){
		$data = array();
		$data['success'] = false;
		$data['data'] = array();
		if(isset($_POST['empUsername']) && isset($_POST['empPassword']) && isset($_POST['empPasswordSecret'])){
			$model = new LoginForm;
			$model->username = $_POST['empUsername'];
			$model->password = $_POST['empPassword'];
			$model->passwordSecret = $_POST['empPasswordSecret'];
			$model->internalAccess = $_POST['internalAccess'];
			if($model->validate() && $model->login()){
				$data['success'] = true;
				$session = new CHttpSession;
				$session->open();
				$sessionID = $session->getSessionID();
				$oauth = new OauthToken;
				$oauth->updateToken($this->token, $sessionID, $model->username);
				$userEmpInfo = Employee::findDataByID($model->username);
				$userEmpInfo['EMP_PASSWORD'] = null;
				$data['data'] = array(
					'sessionID' => $sessionID,
					'token' => $this->token,
					'userEmpInfo' => $userEmpInfo
				);
			}
		}
		echo json_encode($data);
	}
	

	public function actionVerifyToken(){
		$data = array();
		$data['response'] = false;
		if(isset($_POST['token'])){
			$oauth = new OauthToken;
			$result = $oauth->findDataByTokenAndSessionID($_POST['token'], $_POST['sessionID']);
			if($result && $result['USER_ID'] == $_POST['empID']){
				$data['response'] = true;
			}
		}
		echo json_encode($data);
	}
	
	public function actionVerifyClient(){
		$data = array();
		$data['response'] = false;
		if(isset($_POST['client_id']) && isset($_POST['client_secret'])){
			$oauth = new OauthToken;
			$result = $oauth->findClient($_POST['client_id'], $_POST['client_secret']);
			if($result){
				$session = new CHttpSession;
				$session->open();
				$sessionID = $session->getSessionID();
				$data['response'] = true;
				$data['token'] = $oauth->saveToken(null, null);
			}
		}
		echo json_encode($data);
	}
	

	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				echo $error['message'];
		}
	}
}