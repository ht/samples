<?php
class CircleController extends Controller {
	public function init() {
		$this->actionNotAuth = array (
				'Index',
				'InsertGroupCricle' 
		);
		parent::init ();
	}
	public function actionIndex() {
		echo 'Circle';
	}
	


	
	public function actionInsertGroupCricle() {
		// begin tran 
		$curTr = @Yii::app()->db->getCurrentTransaction();
		if($curTr === null || !$curTr->getActive()){
			$transaction = @Yii::app()->db->beginTransaction();
		}else{
			$transaction=false;
		}
		
		try {
			if (isset ( $_POST ['JsonStaff'] ))
				$arrStaff = json_decode ( $_POST ['JsonStaff'], TRUE );
			else 
				echo json_encode (false);
			if (isset ( $_POST ['Group_Name'] ))
				$circle_name = $_POST ['Group_Name'];
			else
				echo json_encode (false);
			
			
			// Get group id
			$data = TGroup::getAutoIncrement ();
			$circle_id = $data [0] ['NEXTVAL'];
			
			// insert TGroup
			$rslInsertTGroup = TGroup::insertCircle ( $circle_id, $circle_name );
			
			$cntStaff = count($arrStaff);
			
			for($i=0;$i<$cntStaff;$i++)
			{
				// Get group_member_id
				//$data = TGroupMember::getAutoIncrement ();
				//$group_member_id = $data [0] ['NEXTVAL'];
				
				// Get acemp_id
				$acemp_id = $arrStaff[$i]['staff_id'];
				
				//insert T_GROUP_MEMBER
				//$rslInsertTGroupMember = TGroupMember::insertGroupMember($group_member_id, $group_id,$acemp_id);
				
				//Get role
				$role = $arrStaff[$i]['role'];
				
				//Get editable
				$editable = $arrStaff[$i]['editable'];
				
				// insert T_MEMBER_ROLE
				$rslInsertTMemberRole = TMemberRole::insertMemberRole($circle_id, $role, $acemp_id,$editable);
			}
			
			if ($transaction){
				$transaction->commit();	
				echo json_encode ( true);
			}						
			else{
				echo (json_encode ( false ));
			}
			
		} catch ( Exception $e ) {
			 if ($transaction) {
                $transaction->rollback();
            }
			echo (json_encode ( false ));
			
		}
		
	}
	

	public function actionLoadCircleMember() {
		$circleId = @Yii::app()->request->getParam('circleId');
		$data = array();
		$data['data'] = array();
		$data['count'] = 0;
		$data['success'] = true;
		$results = MCircleGroup::loadCircleMember($circleId);
		$data['count'] = count($results);
		$data['data'] = $results;
		echo json_encode($data);
	}
	

	
	public function actionUpdateGroupCricle() {
		// begin tran 
		$curTr = @Yii::app()->db->getCurrentTransaction();
		if($curTr === null || !$curTr->getActive()){
			$transaction = @Yii::app()->db->beginTransaction();
		}else{
			$transaction=false;
		}
		
		try {
		
			if (isset ( $_POST ['JsonStaff'] ))
				$arrStaff = json_decode ( $_POST ['JsonStaff'], TRUE );
			else 
				echo json_encode ('JsonStaff');
				
			if (isset ( $_POST ['Group_Name'] ))
				$circle_name = $_POST ['Group_Name'];
			else
				echo json_encode ('Group_Name');
				
			if (isset ( $_POST ['GroupId'] ))
				$circle_id = $_POST ['GroupId'];
			else
				echo json_encode ('GroupId');
			
			// update TGroup
			$rslUpdateCircle = TGroup::updateCircle ( $circle_id, $circle_name );

			//delete GroupMember
			//$rslDeleteGroupMember = TGroupMember::deleteGroupMember($group_id);
			
			//delete MemberRole
			$deleteMemberRole = TMemberRole::deleteMemberRole($circle_id);
			
			$cntStaff = count($arrStaff);
			for($i=0;$i<$cntStaff;$i++)
			{
				// Get group_member_id
				//$data = TGroupMember::getAutoIncrement ();
				//$group_member_id = $data [0] ['NEXTVAL'];
				
				// Get acemp_id
				$acemp_id = $arrStaff[$i]['staff_id'];
				
				//insert T_GROUP_MEMBER
				//$rslInsertTGroupMember = TGroupMember::insertGroupMember($group_member_id, $group_id,$acemp_id);
				
				//Get role
				$role = $arrStaff[$i]['role'];
				
				//Get editable
				$editable = $arrStaff[$i]['editable'];
				
				// insert T_MEMBER_ROLE
				$rslInsertTMemberRole = TMemberRole::insertMemberRole($circle_id, $role, $acemp_id,$editable);
			}
			
			if ($transaction){
				$transaction->commit();	
				echo json_encode ( true);
			}						
			else{
				echo (json_encode ( false ));
			}
						
			
			
		} catch ( Exception $e ) {
			 if ($transaction) {
                $transaction->rollback();
            }
			echo (json_encode ( false ));
		}
		
	}
	public function actionDeleteCricle() {
		try {
			$circle_id = $_POST['circle_id'];
			TGroup::deleteCircle($circle_id);
				
			echo json_encode ( true );
		} catch ( Exception $e ) {
			echo (json_encode ( false ));
		}
	}
}