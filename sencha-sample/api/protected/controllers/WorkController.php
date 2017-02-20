<?php

class WorkController extends Controller {
	public function init() {
		$this->actionNotAuth = array (
			
		);
		parent::init ();
	}
	public function actionIndex() {
		try {
			$objWork = new AcWorkType();
			$arrWork = $objWork->getAcWorkType();
			
			echo json_encode ( true );
		} catch ( Exception $e ) {
			// $dataReturn = array (
			// "status" => false,
			// "content" => $e->getMessage ()
			// );
			echo (json_encode ( false ));
		}
	}

	public function actionGetWorkrecord(){
		try {
			$workrecord_id = $_POST ['WORKRECORD_ID'];
			$objWorkrecord = new TWorkrecord();
			$arrWorkrecord = $objWorkrecord->getWorkRecord($workrecord_id);
				
			echo json_encode ( $arrWorkrecord );
		} catch ( Exception $e ) {
			echo (json_encode ( false ));
		}
		
	}
	

	public function actionGetWork() {
		try {
			
			$objWork = new AcWorkType();
			$arrWork = $objWork->getAcWorkType();
			echo json_encode ( $arrWork );
		} catch ( Exception $e ) {
			// $dataReturn = array (
			// "status" => false,
			// "content" => $e->getMessage ()
			// );
			echo (json_encode ( false ));
		}
	}
	

	public function actionProcArrive(){
		try {
			$acemp_id = $_POST['EMP_ID'];	
			$objWorkRecord = new TWorkrecord();
			$data = $objWorkRecord->insertWorkRecord($acemp_id);
		
			echo json_encode ( $data );
		} catch ( Exception $e ) {
			// $dataReturn = array (
			// "status" => false,
			// "content" => $e->getMessage ()
			// );
			echo (json_encode ( false ));
		}
	}
	

	public function actionProcLeave(){
		try {
			$str_message = "";
			$commonDB = new CommonDB();
			$current_hour =  $commonDB->getCurrentHour();
			
			$acemp_id = $_POST['EMP_ID'];
			//$acemp_id = 123;
			$work_type_id = $_POST['WORK_TYPE_ID'];
			//$work_type_id = 2;
			
 			$objWorkType = new AcWorkType();
 			$dataRoleTime = $objWorkType->getRoleTime($work_type_id);
 			$hour_role = $dataRoleTime[0]['DUR_TIME'];
 			$start_time = $dataRoleTime[0]['START_TIME'];
 			
 			if(count($dataRoleTime)==1)
 				if($start_time)
 				{
 					if($hour_role > $current_hour && $current_hour > Constant::$DATE_CHANGE_LIMIT)
 						$str_message = $dataRoleTime[0]['EMP_WORK_TYPE_NAME']."出勤の定時は　".$hour_role.":00"."　です。"."<Br>定時より前ですが、本当に退勤しますか？";
 						
 				}
 				else 
 				{
 					$objScheduleShift = new TScheduleShift();
 					$dataScheduleShift = $objScheduleShift->getScheduleShift($acemp_id);
 					
 					if(count($dataScheduleShift)==1)
 						$end_time = $dataScheduleShift[0]['END_TIME'];
 					
 					if(count($dataScheduleShift)==1 && $end_time)
 					{
 						if($end_time > $current_hour && $current_hour > Constant::$DATE_CHANGE_LIMIT)
 							$str_message = "本日の退勤予定は　".$end_time.":00"."　です。"."予定時刻より前ですが、本当に退勤しますか？";
 					}
 					else 
 						$str_message ="19時より前ですが、本当に退勤しますか？";
 						
 				}
 			
 			echo json_encode ( $str_message );
		} catch ( Exception $e ) {
			echo (json_encode ( false ));
		}
	}
	

	public function actionUpdateLeave(){
		try {
			$workrecord_id = $_POST['WORKRECORD_ID'];
			$commonDb = new CommonDB();
			$current_time = $commonDb->getCurrentTime();
			$work_status_id = Constant::$GOTHOME;
			$objWorkrecord = new TWorkrecord();
			$objWorkrecord->updateLeave($current_time, $workrecord_id, $work_status_id);
			echo json_encode ( $current_time );
		} catch ( Exception $e ) {
			echo (json_encode ( false ));
		}
	}
	

	public function actionProcBreakSta(){
		try {

			$workrecord_id = $_POST['WORKRECORD_ID'];
			//$workrecord_id = 149924;
			$commonDB = new CommonDB();
			$current_time = $commonDB->getCurrentTime();
			$date = new DateTime($current_time);
			$date->add(new DateInterval('PT59M'));
			$back_time = $date->format('H:i');
			
			$objBreak = new TBreak();
			$objBreak->insertTBreak($workrecord_id);
			
			$objWorkrecord = new TWorkrecord();
			$work_status_id = Constant::$BREAK;
			$objWorkrecord->updateBreak($work_status_id, $workrecord_id, $back_time);
			
			
			
			$str_message = "さんの休憩入時刻を記録しました。<Br>休憩入時刻  ".$current_time;
			echo json_encode ( $str_message );
		} catch ( Exception $e ) {
			// $dataReturn = array (
			// "status" => false,
			// "content" => $e->getMessage ()
			// );
			echo (json_encode ( false ));
		}
	}
	

	public function actionProcBreakEnd(){
		try {
			$workrecord_id = $_POST['WORKRECORD_ID'];
			$objWorkrecord = new TWorkrecord();
			$work_status_id = Constant::$WORKING;
			$objWorkrecord->updateBreak($work_status_id, $workrecord_id,'');
			
			$objBreak = new TBreak();
			$objBreak->updateDateTBreak($workrecord_id);
			
			$commonDB = new CommonDB();
			$current_time = $commonDB->getCurrentTime();
			//$str_message = "cong them emloy nameさんの休憩戻時刻を記録しました。<Br>休憩戻時刻  ".$current_time."neu lblBreakMinute.Text >= 60 thi cong them<Br><Br>【警告】　休憩時間が60分を超えています。";
			echo json_encode ( $current_time );
		} catch ( Exception $e ) {
			// $dataReturn = array (
			// "status" => false,
			// "content" => $e->getMessage ()
			// );
			echo (json_encode ( false ));
		}
	}
	

	
	public function actionProcOutSta(){
		try {
			$workrecord_id = $_POST['WORKRECORD_ID'];
			$objWorkrecord = new TWorkrecord();
			$work_status_id = Constant::$BEOUT;
			$objWorkrecord->updateBreak($work_status_id, $workrecord_id,'未定');
			
			echo json_encode ( true );
		} catch ( Exception $e ) {
			// $dataReturn = array (
			// "status" => false,
			// "content" => $e->getMessage ()
			// );
			echo (json_encode ( false ));
		}
	}
	

	
	public function actionProcOutEnd(){
		try {
			$workrecord_id = $_POST['WORKRECORD_ID'];
			$objWorkrecord = new TWorkrecord();
			$work_status_id = Constant::$WORKING;
			$objWorkrecord->updateBreak($work_status_id, $workrecord_id,'');
				
			//$str_message = "cong them emloy nameさんを稼動中にしました。";
			echo json_encode ( true );
		} catch ( Exception $e ) {
			// $dataReturn = array (
			// "status" => false,
			// "content" => $e->getMessage ()
			// );
			echo (json_encode ( false ));
		}
	}
	

	
	public function actionGetWorkInfo(){
		try {
			$acemp_id = $_POST['EMP_ID'];
			//$acemp_id = 189;
			$objWorkRecord = new TWorkrecord();
			$data_work_info = $objWorkRecord->getWorkInfo($acemp_id);
		
			echo json_encode ( $data_work_info );
		} catch ( Exception $e ) {
			// $dataReturn = array (
			// "status" => false,
			// "content" => $e->getMessage ()
			// );
			echo (json_encode ( false ));
		}
	}
	

	public function actionGetBreakMinutes(){
		try {
			$workrecord_id = $_POST['WORKRECORD_ID'];
			$objBreak = new TBreak();
			$data = $objBreak->getBreakMinutes($workrecord_id);
	
			echo json_encode ( $data );
		} catch ( Exception $e ) {
			// $dataReturn = array (
			// "status" => false,
			// "content" => $e->getMessage ()
			// );
			echo (json_encode ( false ));
		}
	}
	

	public function actionSaveWork(){
		try {
				$work_type_id = $_POST['WORK_TYPE_ID'];
				$late_minutes = ($_POST['LATE_MINUTES'] == '') ? 0 : $_POST['LATE_MINUTES'];
				$back_text = $_POST['BACK_TEXT'];
				$workrecord_id = $_POST['WORKRECORD_ID'];
				$category = $_POST['CATEGORY'];
				$fix_request_id = $_POST['FIX_REQUEST_ID'];
				$arrive_time = $_POST['ARRIVE_TIME'];
				$leave_time = $_POST['LEAVE_TIME'];
				$remarks = $_POST['REMARKS'];
				$objWorkrecord = new TWorkrecord();
				$objWorkrecord->saveWorkrecord($work_type_id, $late_minutes, $back_text, $workrecord_id);
				if($category && $remarks)
				{
					$objFixRequest = new TFixRequest();
					if($fix_request_id == -1)
					{
						$objFixRequest->insertFixRequest($workrecord_id, $category, $arrive_time, $leave_time, $remarks);
					}
					else
					{
						$objFixRequest->updateFixRequest($category, $arrive_time, $leave_time, $remarks, $fix_request_id);
					}
				}
				echo json_encode ( true );
			} catch ( Exception $e ) {
				echo (json_encode ( false ));
			}
	}
}