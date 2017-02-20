<?php

class Constant{
	public static $SECTID_HKDALL = 0;
	public static $HIGH_SECTION_HKD = 1;
	public static $EMPCD_ADMIN = 0;
	public static $PROGRESS_NOTIFY = 1;
	public static $PROGRESS_COMPLETE = 2;
	public static $PROGRESS_TRASH = 3;
	public static $ATTACHFOLDERPATH = 'upload/hkd/message';
	
	public static $OUTOFOFFICE = 0; // 勤務外
	public static $WORKING = 1; // 勤務中
	public static $BREAK = 2; // 休憩中
	public static $BEOUT = 4; // 外出中
	public static $GOTHOME = 5; // 帰宅
	public static $DIRECT = 6; // 直行
	public static $BUSINESSTRIP = 7; // 出張
	
	public static $DATE_CHANGE_LIMIT = 4;
	
	public static $NEW_OBJECT_ID = -1;
	
	public static $SCHEDULE_STAFF_STATUS_UNREAD = 1;      	//未読
	public static $SCHEDULE_STAFF_STATUS_ACTIVE = 2;      	//参加
	public static $SCHEDULE_STAFF_STATUS_NOT_ACTIVE = 3;  	//不参加
    public static $SCHEDULE_STAFF_STATUS_THINKING = 4;    	//調整中
    
    public static $ACTIVE_FLAG = 1;
    public static $OPENED_FLAG = 1;
    public static $LOCK_FLAG =  0;

}
