<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{
	public $data;
	private $_id;
	public function __construct($data){
		$this->data = $data;
	}
	/**
	 * Authenticates a user.
	 * The example implementation makes sure if the username and password
	 * are both 'demo'.
	 * In practical applications, this should be changed to authenticate
	 * against some persistent user identity storage (e.g. database).
	 * @return boolean whether authentication succeeds.
	 */
	public function authenticate()
	{
		$ch = curl_init();
		$params = array(
			'token' => $this->data->token,
			'sessionID' => $this->data->sessionID,
			'empID' => $this->data->userEmpInfo->ACEMP_ID
		);
		curl_setopt($ch, CURLOPT_URL, $this->data->apiUrl . 'site/verifyToken');
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);     
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2); 
		curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'token: '. $this->data->token,
			'sessionID: '.$this->data->sessionID
		));
		$response = curl_exec($ch);
		curl_close ($ch);
		$result = json_decode($response);
		if($result->response){
			$this->_id = $this->data->userEmpInfo->ACEMP_ID;
			$this->setState('authData', $this->data);
			return true;
		}
		return false;
	}
	public function getId()
    {
        return $this->_id;
    }
}