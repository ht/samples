<?php

class TimeReportController extends Controller {
	public function init() {
		$this->actionNotAuth = array (
		);
		parent::init ();
	}
	

	public function actionUpdateWorkrecord() {
		try {
			$objWorkRecord = new TWorkrecord();
			$late_minutes = $_POST['LATE_MINUTES'];
			$work_type_id = $_POST['WORK_TYPE_ID'];
			$workrecord_id = $_POST['WORKRECORD_ID'];
			$rsl = $objWorkRecord->updateLateMinutes($late_minutes, $work_type_id, $workrecord_id);
			echo json_encode ( true );
		} catch ( Exception $e ) {
			echo (json_encode ( false ));
		}
	}
}