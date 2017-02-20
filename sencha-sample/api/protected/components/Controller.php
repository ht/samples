<?php

class Controller extends CController
{
	public $userInfo;//Information of client access api
	public $userEmpInfo;//Information of user access api
	
	public $token;//Code of client
	
	public $actionNotAuth;//Actions of class, which shouldn't auth
	public $actionNotAuthToken;
	

	public function beforeAction($action){
		if(isset($_GET['debug'])){
			$this->userEmpInfo = Employee::findDataByID(3);
			return parent::beforeAction($action);
		}
		if($this->actionNotAuthToken != null && in_array(ucfirst($action->getID()), $this->actionNotAuthToken))
			return parent::beforeAction($action);
			
		$header = apache_request_headers();
		if(isset($_POST['token']) && isset($_POST['sessionID'])){
			$header['token'] = $_POST['token'];
			$header['sessionID'] = $_POST['sessionID'];
		}
		if(isset($header['token']) && $header['token'] != '')
			$this->token = $header['token'];
		else
			die(json_encode(array('responseCode' => 403, 'responseMessage' => Message::$notAuthorized)));
		
		if($this->actionNotAuth == null || !in_array(ucfirst($action->getID()), $this->actionNotAuth)){
			$data = $this->verifyUser($header);
			if($data['responseCode'] !== 200){
				die(json_encode($data));
			}else{
				return parent::beforeAction($action);
			}
		}else{
			$oauth = new OauthToken;
			$result = $oauth->findClientByToken($header['token']);
			if($result && $result['TOKEN_ID']){
				return parent::beforeAction($action);
			}
		}
	}
	
	/**
		* @desciption: all client will be verify before access function of site
		* Each client after login will have a token key and a sessionID
		* After login, when user access to other function on site, token key and sessionID will be send together to server
		* If have both token and sessionID in database, client is validate, user info will be created base on token key and sessionID
		* Base on auth key of user, this user will be access to what functions
	*/
	public function verifyUser($header){
		$data = array('responseCode' => 404, 'responseMessage' => Message::$pageNotFound);
		if(isset($header['token']) && isset($header['sessionID']) && trim($header['token']) != '' && $header['sessionID'] != ''){
			$oauthToken = new OauthToken;
			$this->userInfo = $oauthToken->findDataByTokenAndSessionID($header['token'], $header['sessionID']);
			if($this->userInfo != null && $this->userInfo['TOKEN_ID'] != ''){
				$this->userEmpInfo = Employee::findDataByID($this->userInfo['USER_ID']);
				$data = array('responseCode' => 200, 'responseMessage' => Message::$ok);
				/*if($this->userEmpInfo != null && $this->userEmpInfo['EMP_ID'] != ''){
					if($this->userCanAccess()){
						$data = array('responseCode' => 200, 'responseMessage' => Message::$ok);
					}else{
						$data = array('responseCode' => 403, 'responseMessage' => Message::$notAuthorized);
					}
				}*/
			}
		}
		return $data;
	}
	

}