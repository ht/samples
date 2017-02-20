<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{
	public $passwordSecret;
	public $internalAccess;
	
	public function __construct($username, $password, $passwordSecret, $internalAccess){
		$this->passwordSecret = $passwordSecret;
		$this->internalAccess = $internalAccess;
		parent::__construct($username, $password);
	}
	
	/**
	 * Authenticates a user.
	 * The example implementation makes sure if the username and password
	 * are both 'demo'.
	 * In practical applications, this should be changed to authenticate
	 * against some persistent user identity storage (e.g. database).
	 * @return boolean whether authentication succeeds.
	 */
	public function authenticate(){
        $user = Employee::findDataByID($this->username);
        if($user === null){
            $this->errorCode = self::ERROR_USERNAME_INVALID;
        }else{
            if(trim($user['EMP_PASSWORD']) !== $this->password){
                $this->errorCode = self::ERROR_PASSWORD_INVALID;
            }else{
				if($this->internalAccess == 'false'){
					$user = Employee::findDataSecretByID($this->username);
					if(trim($user['EMP_PASSWORD']) !== $this->passwordSecret){
						$this->errorCode = self::ERROR_PASSWORD_INVALID;
					}else{
						$this->errorCode = self::ERROR_NONE;
					}
				}else{
					$this->errorCode = self::ERROR_NONE;
				}
            }
        }
		return !$this->errorCode;
	}
}