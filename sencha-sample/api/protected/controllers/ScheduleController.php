<?php

class ScheduleController extends Controller
{
    public function actionIndex()
    {
        echo 'This is default action';
    }


    public function actionLoadScheduleDataByMonth(){
        $currDate = date("Y/m/d",strtotime(@Yii::app()->request->getParam('currDate')));
        $listEmployee = json_decode(@Yii::app()->request->getParam('listEmployee'),true);
        $listRoom = json_decode(@Yii::app()->request->getParam('listRoom'),true);
        $currentUser = @Yii::app()->request->getParam('currentUser');
        $activeView = @Yii::app()->request->getParam('activeView');
        $data = array(
            'id'=>1,
            'cid'=>2,
            'start'=>'',
            'end'=>'',
            'title'=>'',
            'notes'=>''
        );
        $dataScheduleByRoom = '';
        $dataSchedule = array();
        $dataScheduleRoom = array();
        $schedule = new TSchedule();
        $dataMonthShiftTable = $schedule->getMonthShiftTable($currentUser, $listEmployee, $currDate);
        $countMonthShiftTable = count($dataMonthShiftTable);
        $schedulesStaff = new TScheduleStaff();
        $employee = new Employee();

        for($i=0; $i<$countMonthShiftTable; $i++){
            $data = array();
            $staffIds = '';
            $staffNames = '';
            $staffTitleNames ='';
            $staffTitleNamesFull ='';
            $data['id']=$dataMonthShiftTable[$i]['SCHEDULE_ID'];
            ($currentUser!=$dataMonthShiftTable[$i]['STAFF_ID'])?$data['cid']=4 : $data['cid']=2;
            $data['title']= htmlspecialchars($dataMonthShiftTable[$i]['TITLE']);
            $data['notes']= ($currentUser!=$dataMonthShiftTable[$i]['STAFF_ID'] && 0==$dataMonthShiftTable[$i]['PUBLIC_SCHEDULE']) ? '' : htmlspecialchars($dataMonthShiftTable[$i]['REMARKS']);
            $data['start']= $dataMonthShiftTable[$i]['START_DATETIME'];
            $data['end']= $dataMonthShiftTable[$i]['END_DATETIME'];
            $results = $schedulesStaff->getStaffNameByScheduleID($dataMonthShiftTable[$i]['SCHEDULE_ID']);
            //show for private
            if ($currentUser!=$dataMonthShiftTable[$i]['STAFF_ID'] && 0==$dataMonthShiftTable[$i]['PUBLIC_SCHEDULE'])
                $data['privates'] = 0;
            else
                $data['privates'] = 1;

            foreach($results as $item){
                $staffNames .= $item['EMP_NAME'] .', ';
                $staffIds .= $item['EMP_ID'] .',';
            }
            $staffNamesCompare = $staffNames . '   ';
            $data['staffs'] = substr($staffNames, 0, -2);
            $data['staffids'] = substr($staffIds, 0, -1);
            //get name of tool
            if ($currentUser!=$dataMonthShiftTable[$i]['STAFF_ID']){
                if (($key = array_search($currentUser, $listEmployee)) !== false) {
                    unset($listEmployee[$key]);
                }
                $resultEmp = $employee->getStaffNameByListEmpID($listEmployee);
                $resultEmpFull = $employee->getStaffNameByListFullEmpID($listEmployee);
                foreach($resultEmp as $itemEmp){
                    if (strpos($staffNamesCompare, trim($itemEmp['EMPNAME']))!== false)
                        $staffTitleNames .= $itemEmp['EMPNAME'].', ';
                }
                $data['staffsname'] = substr($staffTitleNames, 0, -2).' ';

                foreach($resultEmpFull as $itemEmpFull){
                    if (strpos($staffNamesCompare, trim($itemEmpFull['EMPNAME']))!== false)
                        $staffTitleNamesFull .= $itemEmpFull['EMPNAME'].', ';
                }
                $data['staffsnamefull'] = substr($staffTitleNamesFull, 0, -2).' ';
            }else{
                $data['staffsname'] =' ';
                $data['staffsnamefull'] =' ';
            }

            $startDate = explode(' ', $dataMonthShiftTable[$i]['START_DATETIME']);
            if(isset($startDate[0]) && $startDate[0] != '0000-00-00' && isset($startDate[1]) && $startDate[1] === '00:00:00'){
                $data['ad'] = true;
            }
            $dataSchedule[] = $data;
        }
        //schedule for Room
        if (0<count($listRoom) && 0==$activeView){
            $dataScheduleByRoom = $schedule->getScheduleEventRoom($listRoom, $currDate);
            $countScheduleRoom = count($dataScheduleByRoom);
            if (0<$countScheduleRoom){
                for($i=0; $i<$countScheduleRoom; $i++){
                    $data = array();
                    $staffNames = '';
                    $staffIds = '';
                    $data['id']=$dataScheduleByRoom[$i]['SCHEDULE_ID'];
                    $data['cid']=4;
                    $data['title']= htmlspecialchars($dataScheduleByRoom[$i]['TITLE']);
                    $data['notes']= ($currentUser!=$dataScheduleByRoom[$i]['STAFF_ID'] && 0==$dataScheduleByRoom[$i]['OPENED_FLAG']) ? ' ' : htmlspecialchars($dataScheduleByRoom[$i]['REMARKS']);
                    $data['start']= $dataScheduleByRoom[$i]['START_DATETIME'];
                    $data['end']= $dataScheduleByRoom[$i]['END_DATETIME'];
                    $results = $schedulesStaff->getStaffNameByScheduleID($dataScheduleByRoom[$i]['SCHEDULE_ID']);
                    //show for private
                    $data['privates'] = 1;

                    foreach($results as $item){
                        $staffNames .= $item['EMP_NAME'] .', ';
                        $staffIds .= $item['EMP_ID'] .',';
                    }

                    $data['staffs'] = substr($staffNames, 0, -2);
                    $data['staffids'] = substr($staffIds, 0, -1);

                    //get name of Room
                    $macRoom = new MAcRoom();
                    $dataRoom = $macRoom->getRoomName($dataScheduleByRoom[$i]['ROOM_ID']);
                    $data['staffsname'] = $dataRoom[0]['NAME'].' ';
                    $data['staffsnamefull'] =$dataRoom[0]['NAME'].' ';
                    $startDate = explode(' ', $dataScheduleByRoom[$i]['START_DATETIME']);
                    if(isset($startDate[0]) && $startDate[0] != '0000-00-00' && isset($startDate[1]) && $startDate[1] === '00:00:00'){
                        $data['ad'] = true;
                    }
                    $dataScheduleRoom[] = $data;
                }
            }
        }
        //merge Schedule for Room and staff
        if (0==$activeView)
            $dataSchedule=array_merge($dataSchedule, $dataScheduleRoom);

        $arrScheduleData = Array(
            'success'=> true,
            'message'=> 'Load Data',
            'data'=>''
        );
        $arrScheduleData['data']= $dataSchedule;

        echo json_encode($arrScheduleData);
    }

    /**
     * @content: load userID
     */
    public function actionGetTaskList(){
        $type = @Yii::app()->request->getParam('typeTaskList');
        //$this->userEmpInfo['EMP_ID'] = 4;
        $schedule = new TSchedule();
        if(1==$type){
            $dataTaskList = $schedule->getTaskListForNomal($this->userEmpInfo['EMP_ID']);
            $countData = (21<count($dataTaskList))?21:count($dataTaskList);
        }
        else if(2==$type){
            $dataTaskList = $schedule->getTaskListForHistory($this->userEmpInfo['EMP_ID']);
            $countData = (21<count($dataTaskList))?21:count($dataTaskList);
        }
        else{
            $dataTaskList = $schedule->getTaskListForMeeting($this->userEmpInfo['EMP_ID']);
            $countData = (31<count($dataTaskList))?31:count($dataTaskList);
        }

        $returnArrTaskList = array();
        $arrTaskList = array(
            'TIME'=>'',
            'TASK'=>''
        );

        if(1==$type){
            for($i=0;$i<$countData;$i++){
                $arrTaskList['TIME']=date('m/d h:i',strtotime($dataTaskList[$i]['TIME']));
                $arrTaskList['TASK']=(''==$dataTaskList[$i]['TITLE'])?'-': $dataTaskList[$i]['TITLE'];
                $returnArrTaskList[] = $arrTaskList;
            }
            $data = array();
            $data['data'] = array();
            $data['success'] = true ;
            $data['data'] = $returnArrTaskList;
        }
        else if(2==$type){
            for($i=0;$i<$countData;$i++){
                $startDate = (''==$dataTaskList[$i]['LASTUPDATE_DATETIME']) ? '1900/1/1' : $dataTaskList[$i]['LASTUPDATE_DATETIME'];
                $datetime1 = strtotime($startDate);
                $datetime2 = strtotime($dataTaskList[$i]['SYSTEMDATE']);
                $interval  = $datetime2 - $datetime1;
                $minute_diff  = floor($interval / 60);
                $hoursNumber = $interval / 3600;
                $hour_diff    = (1<=$hoursNumber)?floor($interval / 3600):0;
                $dateNumber = $interval / 86400;
                $date_diff    = (1<=$dateNumber)?floor($interval / 86400):0;

                if(0<$date_diff)
                    $arrTaskList['TASK']=$date_diff . "日前";
                else if (0<$hour_diff)
                    $arrTaskList['TASK']=$hour_diff . "時間前";
                else
                    $arrTaskList['TASK']=$minute_diff. "分前";

                //neu user dang nhap ma khac voi user update sau cung
                if ($dataTaskList[$i]['LASTUPDATE_STAFF_ID']!=$this->userEmpInfo['EMP_ID'])
                    $arrTaskList['TASK'] .= $dataTaskList[$i]['EMP_NAME'];

                //$arrTaskList['TASK'] =$dataTaskList[$i]['SYSTEMDATE'];
                $title = (''==$dataTaskList[$i]['TITLE']) ? '-': $dataTaskList[$i]['TITLE'];
                $arrTaskList['TIME']=date('m/d ',strtotime($dataTaskList[$i]['TIME'])).$title;
                $returnArrTaskList[] = $arrTaskList;
            }
            $data = array();
            $data['data'] = array();
            $data['success'] = true ;
            $data['data'] = $returnArrTaskList;
        }else{
            for($i=0;$i<$countData;$i++){
                $timeString = (''==$dataTaskList[$i]['STATUS_NAME']) ? '-' : $dataTaskList[$i]['STATUS_NAME'];

                $acemString = (''==$dataTaskList[$i]['EMP_NAME']) ? '-' : $dataTaskList[$i]['EMP_NAME'];
                $timeString ='['.$timeString.']'.$acemString;

                $titleString = (''==$dataTaskList[$i]['TITLE']) ? '-' : $dataTaskList[$i]['TITLE'];
                $arrTaskList['TASK']=date('m/d',strtotime($dataTaskList[$i]['START_DATETIME'])).$titleString;

                $arrTaskList['TIME']=$timeString;
                $returnArrTaskList[] = $arrTaskList;
            }
            $data = array();
            $data['data'] = array();
            $data['success'] = true ;
            $data['data'] = $returnArrTaskList;
        }

        $returnArrTaskList = array();
        echo json_encode($data);
    }
	
	
	public function actionLoadStaffForSmartPhone(){
        $customId = @Yii::app()->request->getParam('customId');
		$currentUser = $this->userEmpInfo['EMP_ID'];
		$data  = Array(
            'Id'=>1,
            'Name'=>1,
        );
        $dataSchedule = array();
        $schedule = new TSchedule();
		if($customId==null){$customId="";}
        $dataStaff = $schedule->getStaffForSmartPhone($currentUser,$customId);
		//print_r($dataStaff);exit;
		if(count($dataStaff)>0){
			for($i=0; $i<count($dataStaff); $i++){
				$data['Id']=$dataStaff[$i]['EMP_ID'];
				$data['Name']= $dataStaff[$i]['EMP_NAME'];
				$dataSchedule[] = $data;
			}
		}
        $arrScheduleData = Array(
            'success'=> true,
            'results'=>''
        );
        $arrScheduleData['results']= $dataSchedule;
        echo json_encode($arrScheduleData);
    }

	public function actionLoadScheduleForSmartPhone(){
        $currDate = date("Y/m/d",strtotime(@Yii::app()->request->getParam('idDate')));
		$currentUser = $this->userEmpInfo['EMP_ID'];
		//$currDate = '2014-06-25';
		// Get List Employee
        $customId = @Yii::app()->request->getParam('customId');
		if($customId==null){$customId="";}
		$schedule = new TSchedule();
		$listStaff = array();
		$valueStaff = "";
        $dataStaff = $schedule->getStaffForSmartPhone($currentUser,$customId);
		//print_r($dataStaff);exit;
        for($i=0; $i<count($dataStaff); $i++){
            $valueStaff = $dataStaff[$i]['EMP_ID'];
			$listStaff[] = $valueStaff;
        }
		// Get Stask Schedule
        $data  = Array(
            'Id'=>1,
            'ResourceId'=>1,
			//'Name'=>'',
            'StartDate'=>'',
            'EndDate'=>''
            
        );
        $dataSchedule = array();
        $dataTask = $schedule->getTaskForSmartPhone($currentUser, $listStaff, $currDate);//print_r($dataMonthShiftTable);exit;
        for($i=0; $i<count($dataTask); $i++){
            $data['Id']= $i;//$dataTask[$i]['SCHEDULE_ID'];
			$data['ResourceId']=$dataTask[$i]['STAFF_ID'];
            //$data['Name']= $dataTask[$i]['STAFF_NAME'];
            $data['StartDate']= $dataTask[$i]['START_DATETIME'];
            $data['EndDate']= $dataTask[$i]['END_DATETIME'];
            $dataSchedule[] = $data;
        }

        $arrScheduleData = Array(
            'success'=> true,
            'results'=>''
        );
        $arrScheduleData['results']= $dataSchedule;
        //print_r($arrScheduleData);exit;
        echo json_encode($arrScheduleData);
    }
	
	public function actionLoadScheduleEvents(){
        $currDate = date("Y/m/d",strtotime(@Yii::app()->request->getParam('idDate')));
		$schedule = new TSchedule();
		
		$listStaffs = json_decode(@Yii::app()->request->getParam('listStaff'));
				
		if(count($listStaffs) == 0){
			$result = TGroup::loadGroupScheduleByEmp($this->userEmpInfo['EMP_ID']);
			if($result){
				$result = TGroup::loadMembersGroupsByID($result[0]['CUSTOM_ID']);
				if($result){
					$listStaffs = explode(',', $result['CUSTOM_MEMBER']);
				}else{
					$listStaffs[] = $this->userEmpInfo['EMP_ID'];
				}
			}else{
				$listStaffs[] = $this->userEmpInfo['EMP_ID'];
			}
		}
		$t = count($listStaffs);
		
		$listRoom = array();
		$listStaff = array();
		for($i = 0; $i < $t; $i++){
			if(strpos($listStaffs[$i], 'ROOM_') !== false){
				$listRoom[] = str_replace('ROOM_', '', $listStaffs[$i]);
			}else{
				$listStaff[] = $listStaffs[$i];
			}
		}
        $dataSchedule = array();
		if(count($listStaff) > 0){
			$dataTask = $schedule->findScheduleEventsByStaff($listStaff, $currDate);
			if($dataTask){
				for($i = 0; $i < count($dataTask); $i++){
					$data = array(
						'Id' => $dataTask[$i]['SCHEDULE_ID'],
						'Name' => $dataTask[$i]['TITLE'],
						'ResourceId' => $dataTask[$i]['STAFF_ID'],
						'StartDate' => $dataTask[$i]['START_DATETIME'],
						'EndDate' => $dataTask[$i]['END_DATETIME'],
						'Resizable' => false,
						'Draggable' => false
					);
					$endDate = explode(' ', $dataTask[$i]['END_DATETIME']);
					if(isset($endDate[0]) && $endDate[0] != '0000-00-00' && isset($endDate[1]) && $endDate[1] === '00:00:00'){
						$data['EndDate'] = date('Y-m-d', strtotime($endDate[0] . '+1 days')) . ' 00:00:00';
						$data['AllDay'] = true;
					}
					$dataSchedule[] = $data;
				}
			}
		}
		if(count($listRoom) > 0){
			$dataTask = $schedule->findScheduleEventsByRoom($listRoom, $currDate);
			if($dataTask){
				for($i = 0; $i < count($dataTask); $i++){
					$data = array(
						'Id' => $dataTask[$i]['SCHEDULE_ID'],
						'Name' => $dataTask[$i]['TITLE'],
						'ResourceId' => 'ROOM_' . $dataTask[$i]['ROOM_ID'],
						'StartDate' => $dataTask[$i]['START_DATETIME'],
						'EndDate' => $dataTask[$i]['END_DATETIME'],
						'Resizable' => false,
						'Draggable' => false
					);
					$endDate = explode(' ', $dataTask[$i]['END_DATETIME']);
					if(isset($endDate[0]) && $endDate[0] != '0000-00-00' && isset($endDate[1]) && $endDate[1] === '00:00:00'){
						$data['EndDate'] = date('Y-m-d', strtotime($endDate[0] . '+1 days')) . ' 00:00:00';
						$data['AllDay'] = true;
					}
					$dataSchedule[] = $data;
				}
			}
		}
        echo json_encode(array('success'=> true, 'results'=> $dataSchedule));
    }
	
	public function actionLoadDetailTaskScheduler(){
		try{
			$resourceId = @Yii::app()->request->getParam('resourceId');
			//$resourceId = 4;
			$startDate = date("Y/m/d",strtotime(@Yii::app()->request->getParam('startDate')));
			//$startDate = '2014-06-19';
			$endDate = date("Y/m/d",strtotime(@Yii::app()->request->getParam('endDate')));	
			$userId = @Yii::app()->request->getParam('userId');
			//$endDate = '2014-06-19';
			$schedule = new TSchedule;
			$data = array();
			$data['success'] = false;
			$data['data'] = array();
			if($resourceId != null){
				$data['success'] = true;
				$results = $schedule->getDataDetailTask($userId,$resourceId,$startDate,$endDate);
				$data['data'] = $results;
			}
			echo json_encode($data);
		} catch (Exception $e) {
			echo json_encode(array("success" => false, "error" => $e->getMessage()));
		}
    }
	
    public function actionGetUserID(){
        echo json_encode($this->userEmpInfo['EMP_ID']);
    }

    public function actionGetSection(){
        $schedule = new AcSectionMaster();
        $resultData = array();
        $dataSectionTable = array();

        $dataSectionTable = $schedule->getSection();
        $countDataSection = count($dataSectionTable);
        $resultData[]=Array(-1,'参加プロジェクト');

        for($i=0; $i<$countDataSection;$i++){
            $resultData[] = Array($dataSectionTable[$i]['SECTION_ID'],$dataSectionTable[$i]['SECTION_NAME']);
        }

        echo json_encode($resultData);
        //print_r($dataSectionTable);
    }
	
	
    public function actionGetSections(){
        $schedule = new AcSectionMaster();
        $resultData = array();
        $dataSectionTable = array();

        $dataSectionTable = $schedule->getSection();
        $countDataSection = count($dataSectionTable);
        $resultData[] = array('VALUE' => -1, 'TITLE' => '参加プロジェクト');

        for($i=0; $i<$countDataSection;$i++){
            $resultData[] = array('VALUE' => $dataSectionTable[$i]['SECTION_ID'], 'TITLE' => $dataSectionTable[$i]['SECTION_NAME']);
        }
        echo json_encode($resultData);
    }

    /**
     * @content: load userID
     */
    public function actionGetType(){
        $schedule = new MScheduleType();
        echo json_encode($schedule->getType());
    }

    /**
     * @content: load userID
     */
    public function actionGetRoom(){
        $schedule = new MAcRoom();
        echo json_encode($schedule->getRoom());
    }

    /**
     * @content: load userID
     */
    public function actionGetStaffStatus(){
        $schedule = new MScheduleStatus();
		echo json_encode($schedule->getStaffStatus());
    }

    public function actionGetProjectBySectionExtra(){
        $sectionId = @Yii::app()->request->getParam('sectionId');
        $chkOnlyActive = (integer)@Yii::app()->request->getParam('chkOnlyActive');

        /*$sectionId =-1;*/
        //$chkOnlyActive =1;

        //$this->userEmpInfo['EMP_ID'] = 4;
        $ptProjectJob = new PTProjectJob();
        $resultData = array();
        $dataSectionTableExtra = array();
        $dataSectionTable = array();
        if(-1 ==$sectionId){
            $resultData = $ptProjectJob->getProjectBySection( $this->userEmpInfo['EMP_SECTION_ID'], $chkOnlyActive);//print_r($resultData);exit();
            $dataSectionTableExtra = $ptProjectJob->getProjectBySectionExtra( $this->userEmpInfo['EMP_SECTION_ID'], $this->userEmpInfo['EMP_ID'], $chkOnlyActive);//print_r($dataSectionTableExtra);exit();
            $dataSectionTable = array_merge($resultData, $dataSectionTableExtra);
        }else{

            $dataSectionTable = $ptProjectJob->getProjectBySection($sectionId, $chkOnlyActive);
        }
        echo json_encode($dataSectionTable);
        //print_r($dataSectionTable);
    }

    public function actionGetUserInformation(){
        $arrayEmployee = json_decode(@Yii::app()->request->getParam('arrayEmployeeParam'));
        $arrayGetEmployee = Array();
        if (0 < count($arrayEmployee)){
			$employee = new Employee();
            $arrayGetEmployee = $employee->getEmployyeeNameById($arrayEmployee);
        }
        echo json_encode($arrayGetEmployee);
    }
    
    /**
     *
     */
    public function actionAddSchedule(){
        $arrayScheduleInfo =json_decode(@Yii::app()->request->getParam('arrayScheduleInfo'),true);
        //file_put_contents('DataSchedule', @Yii::app()->request->getParam('arrayScheduleInfo'));
        $staffId = explode(",",$arrayScheduleInfo['MemberSchedule']);//print_r($staffId);exit();

        $schedule = new TSchedule();
        $scheduleStaff = new TScheduleStaff();
        //$schedulePublic = new TSchedulePublic();
        $result = array();


        $curTr = @Yii::app()->db->getCurrentTransaction();

        if($curTr === null || !$curTr->getActive()){
            $transaction = @Yii::app()->db->beginTransaction();
        }else{
            $transaction=false;
        }
        //Add Schedule
        try {
            $scheduleResult =  $schedule->addSchecule($arrayScheduleInfo, $this->userEmpInfo['EMP_ID']);//print_r($scheduleResult);exit();
            if($scheduleResult["success"]){// addSchecule success
                $resultInsertScheduleStaff = $scheduleStaff->addScheculeStaff($staffId,$scheduleResult["scheduleId"], $this->userEmpInfo['EMP_ID']);
                //$resultInsertSchedulePublic = $schedulePublic->addScheculePublic($scheduleResult["scheduleId"], $arrayScheduleInfo['PrivacySchedule']);//print_r($resultInsertSchedulePublic);exit();
                if($resultInsertScheduleStaff['success']){
                    $linkWeb = $schedule->linkWebData($scheduleResult["scheduleId"], -1, null, null);
                    if ($linkWeb){
                        $transaction->commit();
                        $result['success'] = true;
                        echo json_encode($result);
                    }else{
                        if ($transaction) {
                            $transaction->rollback();
                        }
                        $result['success'] = false;
                        echo json_encode($result);
                    }
                }else {// addSchecule fail
                    if ($transaction) {
                        $transaction->rollback();
                    }
                    $result['success'] = false;
                    echo json_encode($result);
                }
            }else {// addSchecule fail
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

    /**
     *
     */
    public function actionEditSchedule(){
        $arrayScheduleInfo =json_decode(@Yii::app()->request->getParam('arrayScheduleInfo'),true);
        //file_put_contents('DataEditSchedule', @Yii::app()->request->getParam('arrayScheduleInfo'));
        $staffId = explode(",",$arrayScheduleInfo['MemberSchedule']);

        $schedule = new TSchedule();
        $scheduleStaff = new TScheduleStaff();
        $result = array();

        $curTr = @Yii::app()->db->getCurrentTransaction();

        if($curTr === null || !$curTr->getActive()){
            $transaction = @Yii::app()->db->beginTransaction();
        }else{
            $transaction=false;
        }
        //Edit Schedule
        try {
            $scheduleDate =  $schedule->getScheduleDateForLinkWeb((integer)$arrayScheduleInfo['EventId']);
            $org_start_date = $scheduleDate[0]['START_DATE'];
            $org_end_date = $scheduleDate[0]['END_DATE'];

            //get start date from controll
            /*$start_date_time = substr($arrayScheduleInfo['StartDate'],0,-5);
            $start_date_time = str_replace("T"," ",$start_date_time);
            $start_date = substr($start_date_time,0,10);
            $start_date = str_replace("-","/",$start_date);*/

            $start_date = $arrayScheduleInfo['StartDate'];
            $start_date = substr($start_date,0,10);
            $start_date = str_replace("-","/",$start_date);


            //get end date from controll
            /*$end_date_time = substr($arrayScheduleInfo['EndDate'],0,-5);
            $end_date_time = str_replace("T"," ",$end_date_time);
            $end_date = substr($end_date_time,0,10);
            $end_date = str_replace("-","/",$end_date);*/

            $end_date = $arrayScheduleInfo['EndDate'];
            $end_date = substr($end_date,0,10);
            $end_date = str_replace("-","/",$end_date);



            $scheduleResult =  $schedule->editSchecule($arrayScheduleInfo, $this->userEmpInfo['EMP_ID']);
            if($scheduleResult["success"]){// addSchecule success
				$resultInsertScheduleStaff = $scheduleStaff->addScheculeStaff($staffId,$scheduleResult["scheduleId"], $this->userEmpInfo['EMP_ID']);
                if($resultInsertScheduleStaff['success']){
					if($org_start_date != $start_date || $org_end_date != $end_date)
					{
						$linkWeb = $schedule->linkWebData( $arrayScheduleInfo['EventId'], Constant::$NEW_OBJECT_ID, $org_start_date, $org_end_date);
					}
					else
					{
						$linkWeb = $schedule->linkWebData( $arrayScheduleInfo['EventId'], Constant::$NEW_OBJECT_ID, null, null);
					}

					if ($linkWeb){
						$transaction->commit();
						$result['success'] = true;
						echo json_encode($result);
					}else{
						if ($transaction) {
							$transaction->rollback();
						}
						$result['success'] = false;
						echo json_encode($result);
					}
				}else{
					if ($transaction) {
                        $transaction->rollback();
                    }
                    $result['success'] = false;
                    echo json_encode($result);
				}

            }else {// addSchecule fail
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

    /**
     *
     */
    public function actionDeleteSchedule(){
        $arrayScheduleInfo =json_decode(@Yii::app()->request->getParam('arrayScheduleInfo'),true);
        //$staffId = explode(",",$arrayScheduleInfo['MemberSchedule']);//print_r($staffId);exit();

        $schedule = new TSchedule();
        $result = array();

        $curTr = @Yii::app()->db->getCurrentTransaction();

        if($curTr === null || !$curTr->getActive()){
            $transaction = @Yii::app()->db->beginTransaction();
        }else{
            $transaction=false;
        }
        //Add Schedule
        try {
            $scheduleResult =  $schedule->deleteSchecule($arrayScheduleInfo, $this->userEmpInfo['EMP_ID']);//print_r($scheduleResult);exit();
            if($scheduleResult["success"]){// addSchecule success
                $transaction->commit();
                $result['success'] = true;
                echo json_encode($result);
            }else {// addSchecule fail
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

    public function init() {
    	$this->actionNotAuth = array (
    			'GetProjectForSection',
    			'SaveSchedule',
    	);
    	parent::init ();
    }
    
    public function actionLoadDataForAddNew(){
    	try {
    		$objScheduleType = new MScheduleType();
    		$objRoom = new MAcRoom();
    		$objSection = new AcSectionMaster();
    		$objScheduleStatus = new MScheduleStatus();
    		
    		$dataScheduleType = $objScheduleType->getType();
    		$dataRoom = $objRoom ->getRoom();
    		$dataSection = $objSection -> getSection();
    		$dataStaffStatus =  $objScheduleStatus -> getStaffStatus();
    		
    	
    		$dataReturn = array (
    		"ScheduleType" => $dataScheduleType,
    		"Room" => $dataRoom,
    		"Section" => $dataSection,
    		"StaffStatus" => $dataStaffStatus,
    		);
    		echo json_encode ( $dataReturn );
    	} catch ( Exception $e ) {
    		echo (json_encode ( false ));
    	}
    }
    public function actionLoadDataForEdit(){
    	try {
    		$staff_id = $_POST['STAFF_ID'];
    		$schedule_id = $_POST['SCHEDULE_ID'];
    	
    		$objSchedule = new TSchedule();
    		
    		$dataSchedule = $objSchedule->getScheduleForLoadEdit($staff_id, $schedule_id);
    		 
    		$dataReturn = array (
    				"DataSchedule" => $dataSchedule,
    		);
    		echo json_encode ( $dataReturn );
    	} catch ( Exception $e ) {
    		echo (json_encode ( false ));
    	}
    }
    public function actionGetProjectForSection(){
    	try {
    		$acemp_id = $_POST['EMP_ID'];
    		$cmb_section_value = $_POST['CMB_SECTION_VALUE'];
    		$acemp_section_id = $_POST['EMP_SECTION_ID'];
    		$active = $_POST['ACTIVE'];
    		
    		if($cmb_section_value == -1)
    			$section_id = $acemp_section_id;
    		else 
    			$section_id = $cmb_section_value;
    		
    		$objProject = new PTProject();
    		$dataProject = $objProject->getProjectForSection($cmb_section_value, $section_id, $acemp_id, $active);
    	
    		$dataReturn = array (
    				"Project" => $dataProject,
    		);
    		echo json_encode ( $dataReturn );
    	} catch ( Exception $e ) {
    		echo (json_encode ( false ));
    	}
    }
    
    public function actionGetJobForProject(){
    	try {
    		$acemp_id = $_POST['EMP_ID'];
    		$cmb_section_value = $_POST['CMB_SECTION_VALUE'];
    		$acemp_section_id = $_POST['EMP_SECTION_ID'];
    		$active = $_POST['ACTIVE'];
    		$project_id = $_POST['PROJECT_ID'];
    
    		if($cmb_section_value == -1)
    			$section_id = $acemp_section_id;
    		else
    			$section_id = $cmb_section_value;
    
    		$objProject = new PTProject();
    		$dataJob = $objProject->getJobForProject($cmb_section_value, $section_id, $acemp_id, $active, $project_id);
    		 
    		$dataReturn = array (
    				"Job" => $dataJob,
    		);
    		echo json_encode ( $dataReturn );
    	} catch ( Exception $e ) {
    		// $dataReturn = array (
    		// "status" => false,
    		// "content" => $e->getMessage ()
    		// );
    		echo (json_encode ( false ));
    	}
    }
    public function actionSaveSchedule(){
    	try {
    		$schedule_id = $_POST['SCHEDULE_ID'];
    		$title = $_POST['TITLE'];
    		$remarks = $_POST['REMARKS'];
    		$start_datetime = $_POST['START_DATETIME'];
    		$end_datetime = $_POST['END_DATETIME'];
    		$room_id = ($_POST['ROOM_ID']==-1 || $_POST['ROOM_ID']== '') ? "NULL" : $_POST['ROOM_ID'];
    		$active_flag = $_POST['ACTIVE_FLAG'];
    		$opened_flag = $_POST['OPENED_FLAG'];
    		$lock_flag = $_POST['LOCK_FLAG'];
    		$staff_id = $_POST['STAFF_ID'];						// USER LOGIN
    		$lastupdate_staff_id = $_POST['LASTUPDATE_STAFF_ID'];
    		$job_id = ($_POST['JOB_ID']==-1 || $_POST['JOB_ID']== '') ? "NULL" : $_POST['JOB_ID'];
    		$schedule_type_id = $_POST['SCHEDULE_TYPE_ID'];
    		$arr_staff = CJSON::decode($_POST['ARR_STAFF']);		// LIST USER
    		
    		$objSchedule = new TSchedule();
    		$objScheduleStaff = new TScheduleStaff();
    		
    		//CASE ADD NEW SCHEDULE
    		if($schedule_id == -1)
    		{
    			$schedule_id = $objSchedule -> getAutoIncrement();
    			$rs = $objSchedule -> insertNewSchedule($schedule_id, $title, $remarks, $start_datetime, $end_datetime, $room_id,
    					 $active_flag, $opened_flag, $lock_flag, $staff_id, $job_id, $schedule_type_id);
    			
    			// INSERT SCHEDULE OK
    			if($rs == 1)
    			{
    				for($i=0; $i<count($arr_staff); $i++)
    				{
    					
    					$acemp_id = $arr_staff[$i]['EMP_ID'];
    					//CASE IS USER LOGIN
    					if($acemp_id == $staff_id)
    					{
    						$status_id = Constant::$SCHEDULE_STAFF_STATUS_ACTIVE;
    						$rs = $objScheduleStaff->insertScheduleStaff($schedule_id, $acemp_id, $status_id);
    					}
    					//CASE IS NOT LOGIN
    					else 
    					{
    						$status_id = Constant::$SCHEDULE_STAFF_STATUS_UNREAD;
    						$rs = $objScheduleStaff->insertScheduleStaff($schedule_id, $acemp_id, $status_id);
    					}
    				}
    				
    				// process link data web
    				$objSchedule->linkWebData($schedule_id, Constant::$NEW_OBJECT_ID, null, null);
    			}
    		}
    		//CASE UPDATE SHCEDULE
    		else 
    		{
    			// UPDATE SCHEDULE STAFF
    			$rs = $objSchedule->updateSchedule($schedule_id, $title, $remarks, $start_datetime, $end_datetime, $room_id,
    					 $active_flag, $opened_flag, $lock_flag, $staff_id, $job_id, $schedule_type_id);
    			
    			// GET SCHEDULE STAFF
    			$dataScheduleStaffInserted = $objScheduleStaff->getScheduleStaffByScheduleID($schedule_id);
    			
    			// UPDATE ACTIVE FLAG IS 0 FOR STAFF REMOVED
    			for($i=0; $i<count($dataScheduleStaffInserted); $i++)
    			{
    				for($j= 0;$j<count($arr_staff);$j++)
    				{
    					if($arr_staff[$j]['EMP_ID'] == $dataScheduleStaffInserted[$i]['STAFF_ID'])
    						break;
    					if($j==count($arr_staff)-1)			// LAST ITEM
    					{
    						$schedule_staff_id = $dataScheduleStaffInserted[$i]['SCHEDULE_STAFF_ID'];
    						$rs = $objScheduleStaff->updateActiveFlagForStaffRemoved($schedule_staff_id);
    					}
    				}
    				
    			}
    			
    			// INSERT FOR NEW STAFF
    			for($r=0; $r<count($arr_staff); $r++)
    			{
    				for($k = 0; $k<count($dataScheduleStaffInserted);$k++)
    				{
    					if($arr_staff[$r]['EMP_ID'] == $dataScheduleStaffInserted[$k]['STAFF_ID'])
    						break;
    					if($k==count($dataScheduleStaffInserted)-1)			// LAST ITEM
    					{
	    					$acemp_id = $arr_staff[$r]['EMP_ID'];
			    			//CASE IS USER LOGIN
			    			if($acemp_id == $staff_id)
			    			{
			    				$status_id = Constant::$SCHEDULE_STAFF_STATUS_ACTIVE;
			    				$rs = $objScheduleStaff->insertScheduleStaff($schedule_id, $acemp_id, $status_id);
			    			}
			    			//CASE IS NOT LOGIN
			    			else
			    			{
			    				$status_id = Constant::$SCHEDULE_STAFF_STATUS_UNREAD;
			    				$rs = $objScheduleStaff->insertScheduleStaff($schedule_id, $acemp_id, $status_id);
			    			}
    					}
    				}
	    			
    			} 
    			
    			// prepare data for link web
    			$scheduleDate =  $objSchedule->getScheduleDateForLinkWeb($schedule_id);
    			$org_start_date = $scheduleDate[0]['START_DATE'];
    			$org_end_date = $scheduleDate[0]['END_DATE'];
    			
    			$start_date = substr($start_datetime,0,10);
    			$end_date = substr($end_datetime,0,10);
    			// process link data web
    			if($org_start_date != $start_date || $org_end_date != $end_date)
    			{
    				$objSchedule->linkWebData( $schedule_id, Constant::$NEW_OBJECT_ID, $org_start_date, $org_end_date);
    			}
    			else
    			{
    				$objSchedule->linkWebData( $schedule_id, Constant::$NEW_OBJECT_ID, null, null);
    			}   			
    		}
     		echo json_encode ( $schedule_id );
    	} catch ( Exception $e ) {
    		// $dataReturn = array (
    		// "status" => false,
    		// "content" => $e->getMessage ()
    		// );
    		echo (json_encode ( false ));
    	}
    }
    
    public function actionGetScheduleStaff(){
    	try {
    		$schedule_id = $_POST['SCHEDULE_ID'];
    	
    		$objScheduleStaff = new TScheduleStaff();
    		$dataScheduleStaff = $objScheduleStaff->getStaffForEdit($schedule_id);
    		 
    		$dataReturn = array (
    				"ScheduleStaff" => $dataScheduleStaff,
    		);
    		echo json_encode ( $dataReturn );
    	} catch ( Exception $e ) {
    		echo (json_encode ( false ));
    	}
    }
    
    public function actionGetScheduleByScheduleID(){
        $scheduleID = json_decode(@Yii::app()->request->getParam('scheduleId'));

        $schedules = new TSchedule();
        $returnData = $schedules->getScheduleByScheduleID($scheduleID);

        $schedulesStaff = new TScheduleStaff();
        $returnDataStaff = $schedulesStaff->getStaffByScheduleID($scheduleID);

        $returnArray = array(
            'schedule'=>$returnData,
            'scheduleStaff'=>$returnDataStaff
        );
        echo json_encode($returnArray);
    }
    
    public function actionLoadScheduleByID(){
        $scheduleID = json_decode(@Yii::app()->request->getParam('scheduleId'));
		$data = array('success' => false, 'schedule' => false, 'scheduleStaff' => false);
		if($scheduleID != null && $scheduleID != ''){
			$data['success'] = true;
			$schedules = new TSchedule();
			$result = $schedules->findScheduleByID($scheduleID);
			$data['schedule'] = $result;
			$schedulesStaff = new TScheduleStaff();
			$result = $schedulesStaff->getStaffByScheduleID($scheduleID);
			$data['scheduleStaff'] = $result;
		}
		echo json_encode($data);
    }
    /**
     *
     */
    public function actionCheckRoom(){
        $arrayScheduleId = json_decode(@Yii::app()->request->getParam('scheduleid'),true);
        $arrayScheduleRoom = json_decode(@Yii::app()->request->getParam('room'),true);
        $arrayScheduleStartDate = json_decode(@Yii::app()->request->getParam('startdate'),true);
        $arrayScheduleEndDate = json_decode(@Yii::app()->request->getParam('enddate'),true);

        $room = new TSchedule();
        $returnString = $room->checkRoom($arrayScheduleId,$arrayScheduleRoom,$arrayScheduleStartDate,$arrayScheduleEndDate);
        echo json_encode($returnString);
    }
    /**
     *
     */
    public function actionCheckOpened(){
        $arrayScheduleId = json_decode(@Yii::app()->request->getParam('scheduleid'),true);
        $userLogin = $this->userEmpInfo['EMP_ID'];
        $tSchedule = new TSchedule();
        $tScheduleStaff = new TScheduleStaff();
        $returnString = $tSchedule->checkOpened($arrayScheduleId,$userLogin);//print_r($returnString);exit();
        $returnStaffString = $tScheduleStaff->checkOpened($arrayScheduleId,$userLogin);//print_r($returnString);exit();
        if (0<$returnStaffString)
            $returnString = 0;
        echo json_encode($returnString);
    }
	public function actionEditScheduler(){
		$scheduleInfo = json_decode(@Yii::app()->request->getParam('arrayScheduleInfo'), true);
		$schedule = new TSchedule();
		$scheduleStaff = new TScheduleStaff();
		$data = array('success' => false, 'checkRoom' => '');
		if($scheduleInfo['Room'] != ''){
			$result = $schedule->checkRoom(
				$scheduleInfo['EventId'], $scheduleInfo['Room'], $scheduleInfo['StartDate'], $scheduleInfo['EndDate']
			);
			if($result != ''){
				$data['checkRoom'] = $result;
				echo json_encode($data);
				Yii::app()->end();
			}
		}
		$staffId = explode(",", $scheduleInfo['MemberSchedule']);
		$curTr = @Yii::app()->db->getCurrentTransaction();
		$transaction = false;
		if($curTr === null || !$curTr->getActive())
			$transaction = @Yii::app()->db->beginTransaction();
		try {
			$scheduleDate =  $schedule->getScheduleDateForLinkWeb($scheduleInfo['EventId']);
			$orgStartDate = $scheduleDate[0]['START_DATE'];
			$orgEndDate = $scheduleDate[0]['END_DATE'];
			$startDate = $scheduleInfo['StartDate'];
			$startDate = substr($startDate, 0, 10);
			$startDate = str_replace("-", "/", $startDate);
			$endDate = $scheduleInfo['EndDate'];
			$endDate = substr($endDate, 0, 10);
			$endDate = str_replace("-", "/", $endDate);
			$result = $schedule->editSchecule($scheduleInfo, $this->userEmpInfo['EMP_ID']);
			if($result["success"]){
				$result = $scheduleStaff->addScheculeStaff($staffId, $result["scheduleId"], $this->userEmpInfo['EMP_ID']);
				if($result['success']){
					if($orgStartDate != $startDate || $orgEndDate != $endDate){
						$result = $schedule->linkWebData($scheduleInfo['EventId'], Constant::$NEW_OBJECT_ID, $orgStartDate, $orgEndDate);
					}else{
						$result = $schedule->linkWebData($scheduleInfo['EventId'], Constant::$NEW_OBJECT_ID, null, null);
					}
					if ($result){
						$transaction->commit();
						$transaction = false;
						$data['success'] = true;
					}
				}
			}
		}catch(Exception $ex){
		}
		if ($transaction){
			$transaction->rollback();
		}
		echo json_encode($data);
	}
	

	public function actionAddScheduler(){
		$scheduleInfo =json_decode(@Yii::app()->request->getParam('arrayScheduleInfo'), true);
		$staffId = explode(",", $scheduleInfo['MemberSchedule']);
		$schedule = new TSchedule();
		$scheduleStaff = new TScheduleStaff();
		$data = array('success' => false, 'checkRoom' => '');
		if($scheduleInfo['Room'] != ''){
			$result = $schedule->checkRoom(
				0, $scheduleInfo['Room'], $scheduleInfo['StartDate'], $scheduleInfo['EndDate']
			);
			if($result != ''){
				$data['checkRoom'] = $result;
				echo json_encode($data);
				Yii::app()->end();
			}
		}
		$curTr = @Yii::app()->db->getCurrentTransaction();
		if($curTr === null || !$curTr->getActive()){
			$transaction = @Yii::app()->db->beginTransaction();
		}else{
			$transaction=false;
		}
		try {
			$result = $schedule->addSchecule($scheduleInfo, $this->userEmpInfo['EMP_ID']);
			if($result["success"]){
				$resultInsertScheduleStaff = $scheduleStaff->addScheculeStaff($staffId, $result["scheduleId"], $this->userEmpInfo['EMP_ID']);
				if($resultInsertScheduleStaff['success']){
					$linkWeb = $schedule->linkWebData($result["scheduleId"], -1, null, null);
					if ($linkWeb){
						$transaction->commit();
						$transaction = false;
						$data['success'] = true;
					}
				}
			}
		} catch(Exception $e) {
		}
		if ($transaction) {
			$transaction->rollback();
		}
		echo json_encode($data);
	}
} 