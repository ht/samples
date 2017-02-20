Ext.define('MyApp.app.common', {
    statics: {
		checkParentNode: function(node){
			if(node.getDepth() > 1){
				p = node.parentNode;
				var checked = 1;
				p.suspendEvents();
				p.eachChild(function(c) {
					if (!c.get('checked')){
						checked = 0;
						return;
					}
				});
				if(checked == 1){
					p.set('checked', true);
					this.checkParentNode(p);
				}
				else{
					p.set('checked', false);
				}
				p.resumeEvents();
			}
		},
        checkChange: function (node, checked) {
            node.eachChild(function (n) {
                n.set('checked', checked);
                if (n.hasChildNodes()) {
                    MyApp.app.common.checkChange(n, checked);
                }
            });
        },
        cloneObj:function(obj) {
			if (null == obj || "object" != typeof obj) return obj;
			var copy = obj.constructor();
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
			}
			return copy;
		},
        loadTheme: function (theme) {
            switch (theme) {
                case 'gray':
                    Ext.util.CSS.swapStyleSheet('theme', 'resources/extjs/resources/ext-theme-gray/ext-theme-gray-all.css');
                    break;
                case 'access':
                    Ext.util.CSS.swapStyleSheet('theme', 'resources/extjs/resources/ext-theme-access/ext-theme-access-all.css');
                    break;
                case 'neptune':
                    Ext.util.CSS.swapStyleSheet('theme', 'resources/extjs/resources/ext-theme-neptune/ext-theme-neptune-all.css');
                    break;
                case 'neptune-pink':
                    Ext.util.CSS.swapStyleSheet('theme', 'resources/extjs/resources/ext-theme-neptune/ext-theme-neptune-pink-all.css');
                    break;
                default:
                    Ext.util.CSS.swapStyleSheet('theme', 'resources/extjs/resources/ext-theme-classic/ext-theme-classic-all.css');
            }
        },
        parseUrl: function () {
            var obj = {};
            var pairs = location.search.substring(1).split('&');
            for (var i in pairs) {
                var split = pairs[i].split('=');
                obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
            }
            return obj;
        },
        openNewWindow: function PopupCenter(url, title, w, h) {
            width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            var left = (width - w) / 2 - 10;
            var top = (height - h) / 2;
            var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            if (window.focus) {
                newWindow.focus();
            }
        },
        uncheckParent: function (node) {
            node.set("checked", false);
            MyApp.app.common.uncheckParent(node.parentNode);
        },


        GetCurrentDate: function () {
            var start = new Date(Date.now());
            var day = start.getDate();
            var month = start.getMonth();
            var year = start.getFullYear();
            var result = new Date(year, month, day);
            return result;
        },
        // get Today by 'yyyy/mm/dd'
        getScheduleToday: function (today) {
            today = new Date(today);
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            today = yyyy + '-' + mm + '-' + dd;
            return today;
        },

        convertDateToYmd: function (today) {
            today = new Date(today);
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }
            today = yyyy + '-' + mm + '-' + dd;
            return today;
        },
        //today
        getTime: function (today) {
            today = new Date(today);
            var hh = today.getHours();
            var mi = today.getMinutes(); //January is 0!
            var ss = today.getSeconds();

            if (hh < 10) {
                hh = '0' + hh;
            }

            if (mi < 10) {
                mi = '0' + mi;
            }

            if (ss < 10) {
                ss = '0' + ss;
            }
            time_s = hh + ':' + mi + ':' + ss;
            return time_s;
        },
        callbackTimeSchedule: function (segmentValue, segmentItem, dateValue, dateItem, activeViewValue) {
            var me = this;
            //console.log(dateValue);
            setTimeout(function () {
                me.reload(segmentValue, activeViewValue, dateValue);
                Ext.ComponentQuery.query('#' + segmentItem)[0].setValue(segmentValue);
                if (dateValue)
                    Ext.ComponentQuery.query('#' + dateItem)[0].setValue(dateValue);
            }, 0);
        },

        subStringBySchedule: function (str) {
            var nArrSchedule = str.split("_");
            return nArrSchedule[1] * 1;
        },

        callbackSchedule: function (segmentValue, segmentItem, dateValue, dateItem, activeViewValue) {
            var me = this;
            setTimeout(function () {
                me.reload(segmentValue, activeViewValue);
                if (3 < segmentValue)
                    Ext.ComponentQuery.query('#' + segmentItem)[0].setValue(segmentValue);
                if (dateValue)
                    Ext.ComponentQuery.query('#' + dateItem)[0].setValue(dateValue);
            }, 0);
        },

        validateDate: function (date) {
            // regular expression to match required date format
            re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

            if ('' !== date.trim() && !date.match(re)) {
                alert("Invalid date format: " + date);
                return false;
            }
        },


        //Check validate for time
        validateTime: function (timeCheck) {
            // regular expression to match required time format
            re = /^\d{1,2}:\d{2}([ap]m)?$/;

            if ('' !== timeCheck.trim() && !timeCheck.match(re)) {
                alert("Invalid date format: " + timeCheck);
                return false;
            }
        },

        //in_array(1, ['1', '2', '3']) and in_array(1, ['1', '2', '3'], false) ==>true  but in_array(1, ['1', '2', '3'], true) ====>false
        in_array: function (needle, haystack, argStrict) {
            var key = '',
                strict = !!argStrict;
            if (strict) {
                for (key in haystack) {
                    if (haystack[key] === needle) {
                        return true;
                    }
                }
            } else {
                for (key in haystack) {
                    if (haystack[key] == needle) {
                        return true;
                    }
                }
            }
            return false;
        },
        getListUser: function (arrayEmployee) {//console.log(arrayEmployee);
            MyApp.util.Utilities.userScheduleName = '';
            MyApp.util.Utilities.userScheduleID = 0;
            Ext.Ajax.request({
                type: 'rest',
                url: apiUrl + 'schedule/GetUserInformation',
                async: false,
                params: {
                    arrayEmployeeParam: JSON.stringify(arrayEmployee)
                },
                success: function (response) {
                    var userInformation = Ext.decode(response.responseText, true);
                    var countUserInformation = userInformation.length;

                    if (0 < countUserInformation) {
                        MyApp.util.Utilities.userScheduleID = '';
                        MyApp.util.Utilities.userScheduleName = '';

                        for (i = 0; i < countUserInformation - 1; i++) {
                            MyApp.util.Utilities.userScheduleID = MyApp.util.Utilities.userScheduleID + userInformation[i]['USERID'] + ',';
                            MyApp.util.Utilities.userScheduleName = MyApp.util.Utilities.userScheduleName + userInformation[i]['USERNAME'] + ',';
                        }
                        MyApp.util.Utilities.userScheduleID = MyApp.util.Utilities.userScheduleID + userInformation[countUserInformation - 1]['USERID'];
                        MyApp.util.Utilities.userScheduleName = MyApp.util.Utilities.userScheduleName + userInformation[countUserInformation - 1]['USERNAME'];

                    }
                },
                failure: function () {
                    Ext.MessageBox.show({
                        title: MessageCommon.ScheduleNoteTitle,
                        msg: MessageCommon.MesErrorAtServer,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.Msg.OK
                    });
                    return;
                },
                scope: this
            });
        },
        reload: function (code, activeViewValue) {
            var calendarPanel, calendarDay;
            var calendarStore = Ext.create('Extensible.calendar.data.MemoryCalendarStore', {
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: apiUrl + 'json/calendars.json',
                    noCache: false,

                    reader: {
                        type: 'json',
                        root: 'calendars'
                    }
                }
            });
            var match_staff = function(arrayStaff,arrayChecked){
                var i = arrayStaff.length-1;
                for (i; i>=0; i--) {
                    if (-1 !== arrayChecked.indexOf(arrayStaff[i]*1) && MyApp.util.Utilities.userEmpInfo.ACEMP_ID*1!==arrayStaff[i]*1){
                        return true;
                    }
                }
                return false;
            };

            //render
            var renderUI = function (eventStore,code, activeViewValue) {
                if (this.calendarPanel) {
                    Ext.destroy(this.calendarPanel);
                }

                this.calendarPanel = Ext.create('Extensible.calendar.CalendarPanel', {
                    eventStore: eventStore,
                    calendarStore: calendarStore,
                    renderTo: 'gridSchedule',
                    width: '100%',
                    height: 597,
                    activeItem: activeViewValue,

                    // These show by default, turn them off
                    dayViewCfg: {
                        showHourSeparator: true,
                        // Start the view at 6:00
                        viewStartHour: 8,
                        // End the view at 8:00pm / 20:00
                        viewEndHour: 22,
                        // Default the scroll position on load to 8:00 if the body is overflowed
                        scrollStartHour: 6,
                        // Customize the hour (and event) heights. See the docs for details on setting this.
                        // This example will be double-height (the default is 42)
                        hourHeight: 80,
                        // Allow drag-drop, drag-create and resize of events in 10-minute increments
                        ddIncrement: (10>code)?30:code,
                        // Since the hour blocks are double-height, we can shorten the minimum event display
                        // height to match the ddIncrement
                        minEventDisplayMinutes: (10>code)?30:code
                    },
                    weekViewCfg: {
                        // These settings create a fixed weekday view.
                        // This view will only show Mon-Fri.
                        dayCount: 7,
                        // Always start the view on Monday
                        startDay: 1,
                        startDayIsStatic: true,
                        showHourSeparator: true,
                        // Start the view at 6:00
                        viewStartHour: 8,
                        // End the view at 8:00pm / 20:00
                        viewEndHour: 22,
                        // Default the scroll position on load to 8:00 if the body is overflowed
                        scrollStartHour: 6,
                        // Customize the hour (and event) heights. See the docs for details on setting this.
                        // This example will be double-height (the default is 42)
                        hourHeight: 80,
                        // Allow drag-drop, drag-create and resize of events in 10-minute increments
                        ddIncrement: (10>code)?30:code,
                        // Since the hour blocks are double-height, we can shorten the minimum event display
                        // height to match the ddIncrement
                        minEventDisplayMinutes: (10>code)?30:code
                    },
                    startDate: MyApp.util.Utilities.dateSelected,
                    showMonthView: true,

                    // Defaults to 3 days. You could also set the dayCount config
                    // inside multiDayViewCfg to change that.
                    showMultiDayView: false,
                    showMultiWeekView: false
                });
                var w = Ext.getCmp('pnlGridSchedule');
                var g = Ext.getCmp('pnlScheduleLeft');
                w.setLoading(false);
                g.setLoading(false);
            };
            //define eventStore
            if (0===MyApp.util.Utilities.listNewStaff.length && 0===MyApp.util.Utilities.listNewRoom.length && 0 ===MyApp.util.Utilities.paraAddOrRemove){
                MyApp.util.Utilities.eventStore = Ext.create('Extensible.calendar.data.EventStore', {
                    id: 'scheduleStoreId',
                    autoLoad: false,
                    storeId: 'StScheduleStoreId',
                    proxy: {
                        type: 'rest',
                        url: apiUrl + 'schedule/LoadScheduleDataByMonth',
    
                        reader: {
                            type: 'json',
                            root: 'data'
                        },
    
                        writer: {
                            type: 'json',
                            nameProperty: 'mapping'
                        },
    
                        listeners: {
                            exception: function (proxy, request, operation, options) {
                                var w = Ext.getCmp('pnlGridSchedule');
                                var g = Ext.getCmp('pnlScheduleLeft');

                                w.setLoading(false);
                                g.setLoading(false);
                                if (request.responseText !== undefined){
                                    // responseText was returned, decode it
                                    responseObj = Ext.decode(request.responseText,true);
                                    if (responseObj !== null && responseObj.msg !== undefined){
                                        //message was returned
                                        Ext.MessageBox.show({
                                            title: 'Server Error',
                                            msg: responseObj.msg,
                                            icon: Ext.MessageBox.ERROR,
                                            buttons: Ext.Msg.OK
                                        });
                                    }else{
                                        //responseText was decoded, but no message sent
                                        Ext.MessageBox.show({
                                            title: 'Server Error',
                                            msg: operation.request.scope.reader.jsonData.errors,
                                            icon: Ext.MessageBox.ERROR,
                                            buttons: Ext.Msg.OK
                                        });
                                    }
                                }else{
                                    //no responseText sent
                                    Ext.MessageBox.show({
                                        title: 'Server Error',
                                        msg:  operation.getError(),
                                        icon: Ext.MessageBox.ERROR,
                                        buttons: Ext.Msg.OK
                                    });
                                }
                            }
                        }
                    }
                });
    
                if (MyApp.util.Utilities.dateSelected.length > 10)
                    MyApp.util.Utilities.eventStore.getProxy().setExtraParam("currDate", this.getScheduleToday(MyApp.util.Utilities.dateSelected));
                else
                    MyApp.util.Utilities.eventStore.getProxy().setExtraParam("currDate", MyApp.util.Utilities.dateSelected);
    
                if (0 === MyApp.util.Utilities.listUserID) {
                } else {//khong rut gọn code duoc vì bất đồng bộ
                    if (MyApp.util.Utilities.listEmployee.indexOf(MyApp.util.Utilities.userEmpInfo.ACEMP_ID) == -1) {
                        MyApp.util.Utilities.listEmployee.push(MyApp.util.Utilities.userEmpInfo.ACEMP_ID);
                    }
                }
                MyApp.util.Utilities.eventStore.getProxy().setExtraParam("listEmployee", JSON.stringify(MyApp.util.Utilities.listEmployee));
                MyApp.util.Utilities.eventStore.getProxy().setExtraParam("currentUser", MyApp.util.Utilities.userEmpInfo.ACEMP_ID);
                MyApp.util.Utilities.eventStore.getProxy().setExtraParam("listRoom", JSON.stringify(MyApp.util.Utilities.listRoom));
                MyApp.util.Utilities.eventStore.getProxy().setExtraParam("activeView", JSON.stringify(activeViewValue));

                MyApp.util.Utilities.eventStore.load({
                    callback: function(records, operation, success){
                        if (success){
                            renderUI(MyApp.util.Utilities.eventStore, code, activeViewValue);
                        }
                    }
                });
                MyApp.util.Utilities.goTime = 0;

            }else{//additional load or remove
                if (1 > MyApp.util.Utilities.paraAddOrRemove){
                    var newStore = Ext.create('Extensible.calendar.data.EventStore', {
                        id: 'scheduleStoreId',
                        autoLoad: false,
                        storeId: 'StScheduleStoreId',
                        proxy: {
                            type: 'rest',
                            url: apiUrl + 'schedule/LoadScheduleDataByMonth',
        
                            reader: {
                                type: 'json',
                                root: 'data'
                            },
        
                            writer: {
                                type: 'json',
                                nameProperty: 'mapping'
                            },
        
                            listeners: {
                                exception: function (proxy, request, operation, options) {
                                    var w = Ext.getCmp('pnlGridSchedule');
                                    var g = Ext.getCmp('pnlScheduleLeft');
                                    
                                    w.setLoading(false);
                                    g.setLoading(false);
                                    if (request.responseText !== undefined){
                                        // responseText was returned, decode it
                                        responseObj = Ext.decode(request.responseText,true);
                                        if (responseObj !== null && responseObj.msg !== undefined){
                                            //message was returned
                                            Ext.MessageBox.show({ 
                                                title: 'Server Error', 
                                                msg: responseObj.msg, 
                                                icon: Ext.MessageBox.ERROR, 
                                                buttons: Ext.Msg.OK 
                                            });                                            
                                        }else{
                                            //responseText was decoded, but no message sent
                                            Ext.MessageBox.show({ 
                                                title: 'Server Error', 
                                                msg: operation.request.scope.reader.jsonData.errors, 
                                                icon: Ext.MessageBox.ERROR, 
                                                buttons: Ext.Msg.OK 
                                            });                                                                                         
                                        }
                                    }else{
                                        //no responseText sent
                                        Ext.MessageBox.show({ 
                                            title: 'Server Error', 
                                            msg:  operation.getError(), 
                                            icon: Ext.MessageBox.ERROR, 
                                            buttons: Ext.Msg.OK 
                                        });
                                    }
                                }
                            }
                        }
                    });
    
                    if (MyApp.util.Utilities.dateSelected.length > 10)
                        newStore.getProxy().setExtraParam("currDate", this.getScheduleToday(MyApp.util.Utilities.dateSelected));
                    else
                        newStore.getProxy().setExtraParam("currDate", MyApp.util.Utilities.dateSelected);
                    
                    newStore.getProxy().setExtraParam("listEmployee", JSON.stringify(MyApp.util.Utilities.listNewStaff));
                    newStore.getProxy().setExtraParam("currentUser", -1);
                    newStore.getProxy().setExtraParam("listRoom", JSON.stringify(MyApp.util.Utilities.listNewRoom));
                    newStore.getProxy().setExtraParam("activeView", JSON.stringify(activeViewValue));
                    newStore.load({
                        callback: function(newRecords, operation, success) {
                            // do something after the load finishes
                            if (success){
                                MyApp.util.Utilities.eventStore.add(Ext.data.Record(newRecords));
                                MyApp.util.Utilities.eventStore.sync();
                                renderUI(MyApp.util.Utilities.eventStore, code, activeViewValue);
                            }   
                        }
                    });
                }else if (1 == MyApp.util.Utilities.paraAddOrRemove){//remove staff
                    var i = MyApp.util.Utilities.eventStore.getCount()-1;
                    for (i; i>=0; i--) {
                        var stringStaff = MyApp.util.Utilities.eventStore.getAt(i).get('StaffIds');
						//console.log(stringStaff);
                        var arrayStaff = stringStaff.split(",");
                        var removeTrue = false;
                        var nostaffidoldstaff = false;
                        if (-1 ===arrayStaff.indexOf(MyApp.util.Utilities.userEmpInfo.ACEMP_ID)){//khong chua login
                            for(var j = 0; j<arrayStaff.length; j++){
                                //có it nhất 1 staff id thuộc MyApp.util.Utilities.listOldStaff
                                if (-1 !== MyApp.util.Utilities.listOldStaff.indexOf(arrayStaff[j]*1)){
                                    nostaffidoldstaff = true;
                                }
                            }
                        }else{
                            nostaffidoldstaff = true;
                        }
                        if (!nostaffidoldstaff){
                            MyApp.util.Utilities.eventStore.removeAt(i);
                        }else{
                           if (!match_staff(arrayStaff,MyApp.util.Utilities.listOldStaff)){
                                MyApp.util.Utilities.eventStore.getAt(i).set('CalendarId', 2);
                           }
                        }
                    }					
					var w = Ext.getCmp('pnlGridSchedule');
					var g = Ext.getCmp('pnlScheduleLeft');
						
					w.setLoading(false);
					g.setLoading(false);
                    MyApp.util.Utilities.eventStore.sync();
                    renderUI(MyApp.util.Utilities.eventStore, code, activeViewValue);
                }
            }
            MyApp.util.Utilities.listNewStaff = [];
            MyApp.util.Utilities.listNewRoom = [];
            MyApp.util.Utilities.paraAddOrRemove = 0;
        }
    }
});