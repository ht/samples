<?php

class Dir{
	
	/**	
	 * @desciption: create directory
	 * @param string path
	 * @return Boolean create success or fail
	*/
	static public function create($path)
	{
		return mkdir($path, 0777, true);
	}
	
	/**	
	 * @desciption: upload Mutifile
	 * @param string path
	 * @param array arrayFile	 
	 * @return array message info [success,error]
	*/
	static public function uploadMutifile($path,$arrayFile)
	{	
		try {
		
			$countFileUpload=count($arrayFile["fileAttach"]["name"]);
			 
			for ($i = 0 ; $i< $countFileUpload ; $i++)
				{
					if (file_exists($path. DIRECTORY_SEPARATOR . $arrayFile["fileAttach"]["name"][$i])) {
						$result['success'] = false;
						$result['error'] =  "file already exists. " ;
						return $result;
					} else {
						 $uploadResult = move_uploaded_file($arrayFile["fileAttach"]["tmp_name"][$i],
						 $path. DIRECTORY_SEPARATOR . $arrayFile["fileAttach"]["name"][$i]);
						 if($uploadResult>0)
						 {
						 $result['success'] = true;
						 $result['error'] = "";
						 }
						 else{
						 $result['success'] = false;
						 $result['error'] = "move uploaded file fail";
						}
					}
				}
			return $result;
		} catch ( Exception $e ) {
			$result['success'] = false;
			$result['error'] = $e;
			return $result;
        }	
	}
		/**	
	 * @desciption: checkAllowUpload
	 * @param array arrayFile	 
	 * @return true/false
	*/
	static public function checkAllowUpload($path,$arrayFile)
	{	
		try {
			$countFileUpload=count($arrayFile["fileAttach"]["name"]);
			for ($i = 0 ; $i< $countFileUpload ; $i++)
				{
					$filename = basename($arrayFile['fileAttach']['name'][$i]);
					$ext = substr($filename, strrpos($filename, '.') + 1);
					if(( in_array($ext, Yii::app()->params->allowedExts)==false) || ($arrayFile["fileAttach"]["size"] [$i]> Yii::app()->params->maxsize)){
					return false;					
					}
				}
			return true;
		} catch ( Exception $e ) {
			return false;
        }	
	}

	
	
}