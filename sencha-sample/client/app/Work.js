// init
function Work(){}

// CONST
/////WORK STATUS///////
Work.OUTOFOFFICE = 0;     
Work.WORKING = 1;         
Work.BREAK = 2;           
Work.BEOUT = 4;           
Work.GOTHOME = 5;       
Work.DIRECT = 6;         
Work.BUSINESSTRIP = 7;    
/////////////////////


//Get Work info
Work.getWorkInfo = function(acemp_id){
    
    Ext.Ajax.request({
        params: {EMP_ID: MyApp.util.Utilities.userEmpInfo.EMP_ID},    // Data json transfer to server
        async: false,
        url: apiUrl +'work/GetWorkInfo',
        success: function (resp) {
            var result = JSON.parse(resp.responseText);  // Parse data return
            if(result == "false" || result === false)		// Has error at server
                MessageCommon.showErrorMessage(MessageCommon.MesErrorAtServer);
            else						// Server ok
            {
                if(result.length === 0)
                {
                    //Set value
                    MyApp.util.Utilities.userEmpInfo.WORKRECORD_ID = null;
                    MyApp.util.Utilities.userEmpInfo.ARRIVE_TIME = null;
                    MyApp.util.Utilities.userEmpInfo.LEAVE_TIME = null;
                    MyApp.util.Utilities.userEmpInfo.WORK_STATUS_ID = 0;
                    MyApp.util.Utilities.userEmpInfo.WORK_STATUS_TEXT = '出勤前';
                    MyApp.util.Utilities.userEmpInfo.BACK_TEXT = '';
                    MyApp.util.Utilities.userEmpInfo.REMARKS = '';
                    MyApp.util.Utilities.userEmpInfo.WORK_TYPE_ID = 0;
                }
                else
                {
                    //set value
                    MyApp.util.Utilities.userEmpInfo.WORKRECORD_ID = result[0].WORKRECORD_ID;
                    MyApp.util.Utilities.userEmpInfo.ARRIVE_TIME = result[0].ARRIVE_TIME;
                    MyApp.util.Utilities.userEmpInfo.LEAVE_TIME = result[0].LEAVE_TIME;
                    MyApp.util.Utilities.userEmpInfo.WORK_STATUS_ID = result[0].STATUS_ID;
                    MyApp.util.Utilities.userEmpInfo.WORK_STATUS_TEXT = result[0].STATUS_TEXT;
                    MyApp.util.Utilities.userEmpInfo.BACK_TEXT = result[0].SCHEDULED_BACK_TEXT;
                    MyApp.util.Utilities.userEmpInfo.REMARKS = result[0].REMARKS;
                    MyApp.util.Utilities.userEmpInfo.WORK_TYPE_ID = result[0].WORK_TYPE_ID;
                }
                
            }

        },
        failure: function () {
            MessageCommon.showErrorMessage(MessageCommon.MesErrorAtServer);
        }
    });
};


// method show window
Work.show = function() {
    var frmWork = Ext.create('MyApp.view.FrmWork');
    frmWork.show();
};

// get day in week
Work.dayInWeek = function(date) {
    var d = new Date(date);
    var weekday = new Array(7);
    weekday[0]=  "日";
    weekday[1] = "月";
    weekday[2] = "火";
    weekday[3] = "水";
    weekday[4] = "木";
    weekday[5] = "金";
    weekday[6] = "土";
    
    return weekday[d.getDay()];
};

// format date type: yyyy/mm/dd
Work.formatDate = function(date){
    var d = new Date(date);
    var m = d.getMonth() + 1;
    var month = m < 10 ? "0" + m : m;
    var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    
    return d.getFullYear() + '/' + month + '/' + day; 
};