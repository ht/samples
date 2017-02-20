<?php

class MasterController extends Controller
{
	public function init(){
		$this->actionNotAuth = array(
			'LoadSectionMasters',
			'LoadEmployees'
		);
		parent::init();
	}
	public function actionIndex()
	{
		echo 'OJ';
	}

	public function actionTestRoom(){
        $employee = new Employee();
        //print_r($employee->loadMemberTest3());
        print_r($employee->loadMemberByGroup(1));
	}

	public function actionLoadSectionMasters(){
		$data = array();
		$data['success'] = true;
		$data['data'] = array();
		$results = SectionMaster::findData(false, false, true);
		$data['count'] = count($results);
		$data['data'] = $results;
		echo json_encode($data);
	}
	
	public function actionLoadEmployees(){
		$data = array();
		$data['success'] = true;
		$data['data'] = array();
		$results = Employee::findData();
		$data['count'] = count($results);
		$data['data'] = $results;
		echo json_encode($data);
	}
	
	public function actionLoadProgressesAddEmptyRow(){
		$data = array();
		$data['success'] = true;
		$data['data'] = array();
		$results = Progress::findDataAddEmptyRow();
		$data['count'] = count($results);
		$data['data'] = $results;
		echo json_encode($data);
	}
	
	public function actionLoadGroupMemberMaster(){
		$data = array();
		$data['success'] = true;
		$data['data'] = array();
		$results = Employee::getGroupMemberMaster();
		$data['count'] = count($results);
		$data['data'] = $results;
		echo json_encode($data);
	}
	
	public function actionLoadCircleMemberMaster(){
		$circleId = @Yii::app()->request->getParam('circleId');
		$data = array();
		$data['success'] = true;
		$data['data'] = array();
		$results = Employee::getCircleMemberMaster($circleId);
		$data['count'] = count($results);
		$data['data'] = $results;
		echo json_encode($data);
	}

	public function actionLoadProgresses(){
		$data = array();
		$data['success'] = true;
		$data['data'] = array();
		$results = Progress::findData();
		$data['count'] = count($results);
		$data['data'] = $results;
		echo json_encode($data);
	}
	
	public function actionLoadGroup(){
		$data = array();
		$data['success'] = true;
		$data['data'] = array();
		$results = TGroup::findData();
		$data['count'] = count($results);
		$data['data'] = $results;
		echo json_encode($data);
	}
	
    public function actionLoadGroupEmployeeBySchedules(){
		$data = array();
        $firstData = array(array(
            'CUSTOM_ID'=>'default',
            'GROUP_NAME'=>'---新規グループ',
        ));
		$data['success'] = true;
		$data['data'] = array();
        $results = TGroup::loadGroupScheduleByEmp($this->userEmpInfo['EMP_ID']);
		$data['count'] = count($results);
        $datamerge = array_merge($firstData,$results);
		$data['data'] = $datamerge;
        //print_r($results);exit();
		echo json_encode($data);
	}
	
    public function actionInsertGroupMemberBySchedule(){
        $txtGroupName = @Yii::app()->request->getParam('txtGroupName');
        $lists = implode(',',json_decode(@Yii::app()->request->getParam('arrayNode'),true));
        $results = TGroup::insertGroupMemberBySchedule($this->userEmpInfo['EMP_ID'], $txtGroupName, $lists);
        echo json_encode($results);
	}
	
	
    public function actionEditGroupMemberBySchedule(){
        $getGroupId = (integer)@Yii::app()->request->getParam('txtGroupId');
        $txtGroupName = @Yii::app()->request->getParam('txtGroupName');
        $lists =implode(',',json_decode(@Yii::app()->request->getParam('arrayNode'),true));
        $results = TGroup::updateGroupMemberBySchedule($getGroupId,$this->userEmpInfo['EMP_ID'], $txtGroupName, $lists);
        echo json_encode($results);
	}

    public function actionDeleteGroupMemberBySchedule(){
        $getGroupId = (integer)@Yii::app()->request->getParam('txtGroupId');
        $results = TGroup::deleteGroupMemberBySchedule($getGroupId, $this->userEmpInfo['EMP_ID']);
        echo json_encode($results);
	}
	
    public function actionLoadEmployeeByGroup(){
        $results = TGroup::loadEmployeeScheduleByCus(
            (int) @Yii::app()->request->getParam('customId'));
		echo json_encode($results);
	}	
	
	public function actionLoadCircleGroup(){
		$data = array();
		$empId = @Yii::app()->request->getParam('empId');
		if($empId){
			$results = MCircleGroup::loadCircleGroupByEmpId($empId);
		}else{
			$results = MCircleGroup::loadCircleGroup();
		}
		$data['success'] = true;
		$data['data'] = array();
		$data['count'] = count($results);
		$data['data'] = $results;
		echo json_encode($data);
	}
	public function actionLoadMemberByGroupBySchedule(){
		$employee = new Employee();
		echo json_encode($employee->loadMemberByGroup(1));
	}

	public function actionLoadMemberByGroupByMain(){
		$employee = new Employee();
		echo json_encode($employee->loadMemberByGroup(0));
	}

    public function actionLoadMemberBySchedule(){
        $arrayMember = json_decode(@Yii::app()->request->getParam('dataMember'),true);
		$employee = new Employee();
		echo json_encode($employee->loadMemberBySchedules($arrayMember));

	}
	
	public function actionLoadSectionFilter(){
		echo json_encode(SectionMaster::findDataTree());
	}
	
	public function actionLoadMembersGroupsBySchedule(){
        $schedule = new TSchedule();
		$data = array('success' => false, 'data' => null);
        $results = TGroup::loadMembersGroupsSchedule($this->userEmpInfo['EMP_ID']);
		if($results){
			$data = array('success' => true, 'data' => $results);
		}
        echo json_encode($data);
	}
	
	

	public function actionLoadComboEmp(){
		$data = array();
		$data['success'] = true;
		$data['data'] = array();
		$results = Employee::loadComboEmp();
		$data['count'] = count($results);
		$data['data'] = $results;
		echo json_encode($data);
	}
	

	public function actionLoadMainMessage(){
		$start = @Yii::app()->request->getParam('start');
		$limit = @Yii::app()->request->getParam('limit');
		$msgFilterName = @Yii::app()->request->getParam('msgFilterName');
		$circleID = @Yii::app()->request->getParam('circleID');
		$searchFrom = @Yii::app()->request->getParam('searchFrom');
		$arraySearchInfo = (array)json_decode(@Yii::app()->request->getParam('searchInfo'));
		$tag= @Yii::app()->request->getParam('tag'); 
		$senderGroup = (array)json_decode(@Yii::app()->request->getParam('SenderGroup'));
		$employee =  new Employee();
		$sender = @Yii::app()->request->getParam('sender');
		$arraySender = $employee->loadEmpBySection($senderGroup);
		if($sender!=0){
		array_push($arraySender, $sender);
		}
		$title = @Yii::app()->request->getParam('title');
		$message = @Yii::app()->request->getParam('message');
		
		if($start == null || $start == '')
			$start = 0;
		if($limit == null || $limit == '')
			$limit = 50;
		if($msgFilterName == null || $msgFilterName == '')
			$msgFilterName = 'RecvUnconfirmed';
		if($circleID == null || $circleID == '')
			$circleID = null;
		$data = array();
		$data['success'] = true;
		$data['data'] = array();
		if($searchFrom){
			$results= TMain:: addCommentTime (TMain::searchData($arraySearchInfo,$start,$limit,$count));
		}else{
			$results = TMain:: addCommentTime(TMain::findData($this->userEmpInfo['EMP_ID'], $msgFilterName, $start, $limit, $count, $circleID,$arraySender,$title,$message,$tag));
		}
		$data['count'] = $count;

		$data['data'] = $results;
		echo json_encode($data);
	}


	public function actionLoadComboboxSender(){
		$includeInactive = @Yii::app()->request->getParam('includeInactive');
		if($includeInactive!=null){
		$results = Employee::loadComboboxSender($includeInactive);
		}
		else{
		$results = Employee::loadComboboxSender(0);
		}
		$data = array();
		$data['success'] = true;
		$data['data'] = array();
		$data['count'] = count($results);
		$data['data'] = $results;
		echo json_encode($data);
	}
	

	public function actionLoadCircleGroupTree(){
		$userId = @Yii::app()->request->getParam('userId');
		if($userId!=null){
		echo json_encode(MCircleGroup::findDataTreeByUserId($userId));
		}else{
		echo json_encode(MCircleGroup::findDataTree());
		}
	}
	

	public function actionLoadFixedForm(){
		$data = array();
		$data['success'] = true;
		$data['data'] = array();
		$results = TFixedForm::loadFixedForm();
		$data['count'] = count($results);
		$data['data'] = $results;
		echo json_encode($data);
	}
	

	public function actionGetCurrentDate(){
		$data = array();
		$commonDB = new CommonDB();
		$data['success'] = true;
		$data['data'] = array();
		$results = $commonDB->getCurrentTime();
		$data['data'] = $results;
		echo json_encode($data);
	}
	

	public function actionLoadCircleForEdit(){
		$userId = @Yii::app()->request->getParam('userId');
		$data = array();
		$data['data'] = array();
		$data['count'] = 0;
		$data['success'] = true;
		$results = MCircleGroup::loadCircleForEdit($userId);
		$data['count'] = count($results);
		$data['data'] = $results;
		echo json_encode($data);
	}
	
	
	public function actionLoadCircleMemberRole(){
		$data = array();
		$data['data'] = array();
		$data['count'] = 0;
		$data['success'] = true;
		$results = MCircleGroup::loadCircleMemberRole();
		$data['count'] = count($results);
		$data['data'] = $results;
		echo json_encode($data);
	}

	public function actionLoadGroupByMain(){
		$employee = new Employee();
		echo json_encode($employee->loadLoadGroupByMain());
	}
	

	public function actionLoadTag(){
		$tag = new TTag();
		$data = array();
		$data['data'] = array();
		$data['count'] = 0;
		$results = $tag->getAllData();
		$data['count'] = count($results);
		$data['success'] = true;
		$data['data'] = $results;
		echo json_encode($data);
	}
	
}