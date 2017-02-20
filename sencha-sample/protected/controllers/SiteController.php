<?php

class SiteController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	
	public function actionPc(){
		$this->pageTitle = 'Accom';
		$this->render('index');
	}
	
	public function actionSchedule(){
		$this->pageTitle = 'Scheduler';
		$this->layout = 'schedule';
		$this->render('index');
	}
	
	public function actionScheduler(){
		$this->pageTitle = 'Scheduler';
		$this->layout = 'scheduler';
		$this->render('index');
	}
	
	public function actionSm(){
		$this->pageTitle = 'Accom';
		$this->layout = 'sm';
		$this->render('index');
	}

	/**
	 * Displays the login page
	 */
	public function actionLogin()
	{
		$data['success'] = false;
		if(isset($_POST['data'])){
			$model = new LoginForm;
			$data['success'] = $model->login(json_decode($_POST['data']));
		}
		echo json_encode($data);
	}
	
	public function actionCheckLogin(){
		$data['success'] = false;
		if(!Yii::app()->user->isGuest){
			$data['success'] = true;
		}
		echo json_encode($data);
	}

	/**
	 * Logs out the current user and redirect to homepage.
	 */
	public function actionLogout()
	{
		Yii::app()->user->logout();
		Yii::app()->end();
	}
}