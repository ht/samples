<?php

class Common{
	public static function fillterArray($inputArray, $column, $fillterValue){
		$arrayResult=array();
		foreach ($inputArray as $val) {
			if($val[$column]==$fillterValue){
				$arrayResult[] = $val;
			}
		}
		return $arrayResult;
	}
	
}