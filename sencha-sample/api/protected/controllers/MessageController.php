<?php
class MessageController extends Controller
{
	public function init(){
		parent::init();
	}
	public function actionIndex()
	{
		echo 'OJ';
	}
	public function actionLoadMessageCircle(){
		$messageID = @Yii::app()->request->getParam('msgID');
		$data = array();
		$data['success'] = false;
		$data['data'] = array();
		$results = TMsgFlag::loadMessageCircleByID($messageID);
		if($results){
			$data['success'] = true;
			$data['data'] = $results;
		}	
		echo json_encode($data);
	}	
	public function actionLoadMessageInfo(){
		$messageID = @Yii::app()->request->getParam('msgID');
		$data = array();
		$data['success'] = false;
		$data['data'] = array();
		$results = TMsgFlag::findMessageInfoByID($messageID);
		if($results != false){
			$data['success'] = true;
			$data['data'] = $results;
		}
		echo json_encode($data);
	}
	
	public function actionAddMessage(){
		$arrayMsgInfo = (array)json_decode(@Yii::app()->request->getParam('messageInfo'));
		$arrayNewReceiver=(array)json_decode(@Yii::app()->request->getParam('newReceiver'));
		$result = array();
		
		// begin tran 
		$curTr = @Yii::app()->db->getCurrentTransaction();
		if($curTr === null || !$curTr->getActive()){
			$transaction = @Yii::app()->db->beginTransaction();
		}else{
			$transaction=false;
		}
		try {
			$msgMain = new TMain();
			$msgMainResult= $msgMain->insertMessage($arrayMsgInfo);
			if($msgMainResult > 0){// insert Tmain success 
				$msgFlag = new TMsgFlag();
				$circleMsg = new TCircleMsg();
				$result['msgId']=$msgMainResult;
				// insert tag
				$tag= new TTag();
				$arrayTag = $tag->insertTagMsg($arrayMsgInfo['TAG']);
				
				$tagMsg = new TTagMsg();
				$tagMsg->updateTagMsg($result['msgId'],$arrayTag);
				
				
				$msgFlag->insertMsgFLAG($arrayNewReceiver,$msgMainResult);
				if($arrayMsgInfo['CIRCLEID']!=""& $arrayMsgInfo['CIRCLEID']!=null) // circleId is choose
				{	
					$circleMsg-> updateCircleMsg($arrayMsgInfo['CIRCLEID'],$msgMainResult);
					if ($transaction){
					$transaction->commit();
					$result['success'] = true;
					$result['sqlCommand'] = '';
					echo json_encode($result);
					exit;
					}						
				}
				else {// circleId is not choose			
					//end of  task.
					if ($transaction){
						$transaction->commit();	
						$result['success'] = true;
						$result['sqlCommand'] = '';
						echo json_encode($result);
						exit;
					}						
					else{
						$result['success'] = false;
						$result['sqlCommand'] = $msgMainResult['sqlCommand'];
						echo json_encode($result);
						exit;
						}
				}					
			}
			else{ // insert Tmain Failse
				if ($transaction) {
					$transaction->rollback();
				}
				$result['success'] = false;
				$result['sqlCommand'] = $msgMainResult['sqlCommand'];
				echo json_encode($result);
			}
        } catch(Exception $e) {
            if ($transaction) {
                $transaction->rollback();
            }
			$result['success'] = false;
			$result['error'] = $e;
			echo json_encode($result);
        }
	}
	
	public function actionUpdateMessage(){
	
		$arrayMsgInfo = (array)json_decode(@Yii::app()->request->getParam('messageInfo'));
		$arrayNewReceiver=(array)json_decode(@Yii::app()->request->getParam('newReceiver'));
		$arrayOldReceiver=(array)json_decode(@Yii::app()->request->getParam('oldReceiver'));
		$result = array();
		$result['msgId']=$arrayMsgInfo['MSG_ID'];
		//begin tran
		$curTr = @Yii::app()->db->getCurrentTransaction();
		if($curTr === null || !$curTr->getActive()){
			$transaction = @Yii::app()->db->beginTransaction();
		}else{
			$transaction=false;
		}
		try {
			$msgMain = new TMain();
			$msgMainResult= $msgMain->updateMessage($arrayMsgInfo);
			if($msgMainResult==true){// update Tmain success 
			$msgFlag = new TMsgFlag();
			$circleMsg = new TCircleMsg();
			// insert tag
			$tag= new TTag();
			$arrayTag = $tag->insertTagMsg($arrayMsgInfo['TAG']);
			
			$tagMsg = new TTagMsg();
			$tagMsg->updateTagMsg($result['msgId'],$arrayTag);
			
				$msgFlagResult =  $msgFlag->updateMsgFLAG($arrayNewReceiver,$arrayOldReceiver,$arrayMsgInfo['MSG_ID']);
				if($msgMainResult==true){ // update MsgFLAG success
					if($arrayMsgInfo['CIRCLEID']!=""& $arrayMsgInfo['CIRCLEID']!=null) // circleId is choose
					{	
						$msgupdateCircleMsg = $circleMsg-> updateCircleMsg($arrayMsgInfo['CIRCLEID'],$arrayMsgInfo['MSG_ID']);
						if ($transaction){
						$transaction->commit();	
						$result['success'] = true;
						echo json_encode($result);
						exit;
						}						
						else{
							$result['success'] = false;
							echo json_encode($result);
							exit;
						}
					}
					else {// circleId is not choose			
						$circleMsg-> deleteCircleMsg($arrayMsgInfo['MSG_ID']);
						if ($transaction){
							$transaction->commit();	
							$result['success'] = true;
							echo json_encode($result);
							exit;
						}						
						else{
							$result['success'] = false;
							echo json_encode($result);
							exit;
						}
					}	
				}
				else{ // insert  MsgFLAG false
					if ($transaction) {
					$transaction->rollback();
					}
					$result['success'] = false;
					echo json_encode($result);
				}
			}
			else{ // insert Tmain Failse
				if ($transaction) {
					$transaction->rollback();
				}
				$result['success'] = false;
				echo json_encode($result);
			}
        } catch(Exception $e) {
            if ($transaction) {
                $transaction->rollback();
            } 
			$result['success'] = false;
			echo json_encode($result);
        }
	}
	
	

	public function actionUpLoadFile(){
		$dir = new Dir();
		$msgId = @Yii::app()->request->getParam('messageId');
		$releaseDate = @Yii::app()->request->getParam('releaseDate');
		$result = array();
		$path = Constant::$ATTACHFOLDERPATH . DIRECTORY_SEPARATOR .$releaseDate. DIRECTORY_SEPARATOR . $msgId ; 
		
		try {
			if (!is_dir($path)) {
				$dir->create($path);	
			}
			if ( $dir->checkAllowUpload($path,$_FILES)) // file type - size 
			{
				$uploadResult = $dir->uploadMutifile($path,$_FILES);
				$result["success"] = $uploadResult["success"];
				$result["error"] = $uploadResult["error"];
				echo json_encode($result);
			}
			else
			{
				$result["success"] = false;
				$result["error"] = "check Allow Upload fail";
				echo json_encode($result);
			}
		} catch ( Exception $e ) {
			$result["success"] = false;
			echo json_encode($result);
        }
	}
	public function actionLoadFixedFormMsg(){
		$fixedFormId = @Yii::app()->request->getParam('FixedFormId');
		$data = array();
		$data['success'] = false;
		$data['data'] = array();
		$results = TFixedForm::loadFixedFormMsg($fixedFormId);
		if($results!=false){
		$data['success'] = true;
		$data['count'] = count($results);
		}
		$data['data'] = $results;
		echo json_encode($data);
	}
	
	public function actionLoadFixedFormReciever(){
		$fixedFormId = @Yii::app()->request->getParam('FixedFormId');
		$data = array();
		$data['success'] = false;
		$data['data'] = array();
		$results = TGroupMember::loadFixedFormReciever($fixedFormId);
		if($results!=false){
			$data['success'] = true;
			$data['count'] = count($results);
		}
		$data['data'] = $results;
		echo json_encode($data);
	}
	
	public function actionLoadCommentTime(){
		$msgId = (array)json_decode(@Yii::app()->request->getParam('msgId'));
		$data = array();
		$data['success'] = false;
		$data['data'] = array();
		$results = TMain::loadCommentTime($msgId);
		if($results!=false){
			$data['success'] = true;
			$data['count'] = count($results);
		}
		$data['data'] = $results;
		echo json_encode($data);
	}
	public function actionUpdateMsgProgress(){
		$msgId = @Yii::app()->request->getParam('msgID');
		$status = @Yii::app()->request->getParam('status');
		$data = array();
		$data['success'] = false;
		
		$results = TMain::updateMsgProgress($msgId,$status);
		if($results!=false){
			$data['success'] = true;
		}
		$data['data'] = $results;
		echo json_encode($data);
	}
}