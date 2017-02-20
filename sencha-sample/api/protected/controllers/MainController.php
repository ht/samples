<?php


class MainController extends Controller
{
	public function actionIndex()
	{
		echo 'This is default action';
	}


	public function actionLoadCommentForMessage(){
		$data = array();
		$data['success'] = false;
		$data['data'] = array();
		$data['count'] = 0;
		$msgID = @Yii::app()->request->getParam('msgID');
		if($msgID != null){	
			$data['success'] = true;
			$results = TComment::findDataByMessageID($msgID);
			$data['count'] = count($results);
			$data['data'] = $results;
		}
		echo json_encode($data);
	 }
	

	public function actionLoadEmloyeeForMessage(){
		$data = array();
		$data['success'] = false ;
		$data['data'] = array();
		$data['count'] = 0;
		$msgID = @Yii::app()->request->getParam('msgID');
		if($msgID != null){	
			$data['success'] = true;
			$results = TMsgFlag::findDataByMessageID($msgID);
			$data['count'] = count($results);
			$data['data'] = $results;
		}
		echo json_encode($data);
	}
	

	public function actionLoadMessageDetail(){
		$data = array();
		$data['success'] = false;
		$data['data'] = array();
		$msgID = @Yii::app()->request->getParam('msgID');
		if($msgID != null){	
			$data['success'] = true;
			$results = TMain::findDataByMessageID($msgID);
			$data['data'] = $results;
		}
		echo json_encode($data);
	}
	

	public function actionUpdateMessageFlag(){
		$data = array();
		$data['success'] = false;
		if(isset($_POST['param'])){
			$param = json_decode($_POST['param']);
			if($param != null){
				$param->empID = $this->userEmpInfo['EMP_ID'];
				$result = TMsgFlag::updateMessageFlag($param);
				$data['success'] = true;
			}
		}
		echo json_encode($data);
	}
	

	public function actionAddComment(){
		$data = array();
		$data['success'] = false;
		if(isset($_POST['param'])){
			$param = json_decode($_POST['param']);
			if($param != null){
				$param->empID = $this->userEmpInfo['EMP_ID'];
				TComment::insertData($param);
				$data['success'] = true;
			}
		}
		echo json_encode($data);
	}
	

	public function actionUpdateFavorite(){
		$data = array();
		$data['success'] = false;
		if(isset($_POST['msgID']) && isset($_POST['status'])){
			$param = array(
				':msgID' => $_POST['msgID'],
				':status' => $_POST['status'],
				':empID' => $this->userEmpInfo['EMP_ID']
			);
			if(TMain::updateFavorite($param))
				$data['success'] = true;
			else
				$data['success'] = false;
		}
		echo json_encode($data);
	}
	


	public function actionCheckEditMessage(){
		$data = array();
		$data['success'] = false;
		if(isset($_POST['msgID'])){
			$checkEditMessageResult = TCircleMsg::checkEditMessage($_POST['msgID'], $this->userEmpInfo['EMP_ID']);
			$data['success'] = true;
			$data['data'] = array(
				'editable' => $checkEditMessageResult['editable'],
				'hasCircle' => $checkEditMessageResult['hasCircle']
			);
		}
		echo json_encode($data);
	}
	


	public function actionDowloadAttach(){
		
		$data = array();
		$data['success'] = false;
		$data['data']['path'] = '';
		
		$path = Constant::$ATTACHFOLDERPATH . DIRECTORY_SEPARATOR . $_POST['path'];
		$fileName = $_POST['fileName'];
		
		$file = array();
		if (is_dir($path)) {
			$dirToZip = opendir($path);
			while ($dirToZip && ($fileInFolder = readdir($dirToZip)) !== false) {
				if ($fileInFolder != "." && $fileInFolder != "..") {
					$file[] = $path.DIRECTORY_SEPARATOR.$fileInFolder;
				}
			}
		}
			if(isset($_POST['path'])){
			$dir = trim($path); // DIR NAME TO MOVE THE ZIPPED FILES
			$zip = new ZipArchive();
			$fizip = $dir.DIRECTORY_SEPARATOR.$fileName.".zip";
			
			if(file_exists($fizip)){
				unlink($fizip);
			}
			
			if($zip->open($fizip, ZipArchive::CREATE) === TRUE) {
				foreach ($file as $fl) {
				  if(file_exists($fl)){
					$zip->addFromString(basename($fl),  file_get_contents($fl));
				  }
				}
				$zip->close();
			}
			
			if(file_exists($fizip)){
				$data['data']['path'] = $fizip;
				$data['success'] = true;
			}
		}
		echo json_encode($data);
	}
	
	
}