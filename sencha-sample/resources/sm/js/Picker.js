// init
function Picker(){}

// CONST
Picker.EMPTY = '';

/*
*mode = 1 ->
*mode = 2 ->
*mode = 3 ->
*/
Picker.showPicker = function(mode, component){
    var slotOrder;
    switch(mode) {
        case 1:
            slotOrder = ['year', 'month', 'day'];
            break;
        case 2:
            slotOrder = ['hour','minute'];
            break;
        case 3:
            slotOrder = ['year', 'month', 'day', 'hour','minute'];
            break;
        default:
            slotOrder = ['year', 'month', 'day'];
    }
    
    
    var randomNumber = function(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    };
    
    var datetimepickettoolbaritems = [{
        text: 'Done',
        ui: 'action',
        align: 'right',
        handler: function() {
            var date = cpnPicker.getValue();
            var str = Picker.formatDate(date,mode);
            component.setValue(str);
            cpnPicker.hide();
        }
    },{
        text: 'Cancel',
        handler: function() {
            cpnPicker.hide();
        }
    }];
    
    
    var cpnPicker = Ext.create('Ext.ux.picker.DateTime', {
        useTitles: true,
        doneButton: false,
        cancelButton: false,
        minuteInterval : 30,
        //value: new Date(),
        slotOrder: slotOrder,
        toolbar: {
            items : datetimepickettoolbaritems,
            style: {position: 'relative'}
        }
        
    });
    var strDate = component.getValue();
    
    // Match component vs picker
    Picker.matchComponentVsPicker(cpnPicker, strDate, mode);
    
    Ext.Viewport.add(cpnPicker);
    cpnPicker.show();
    //component.setValue("SDFGHJKL");
    
};

Picker.formatDate = function(date, mode)
{
    var str = '';
    year = date.getFullYear();
    month = (date.getMonth()+1)>=10 ? (date.getMonth()+1): "0" + (date.getMonth()+1);
    day = date.getDate()>=10 ? date.getDate(): "0" + date.getDate();
    hour = date.getHours()>=10 ? date.getHours(): "0" + date.getHours();
    minute_round = (date.getMinutes()>0 && date.getMinutes()<=30) ? 30 : 0;
    minute = minute_round>=10 ? minute_round: "0" + minute_round;
    switch(mode) {
        case 1:
            str = year + '/' + month + '/' + day;		// YYYY/MM/DD
            break;
        case 2:
            str = hour + ':' + minute;					// hh:mm
            break;
        case 3:
            str = year + '/' + month + '/' + day + ' ' + hour + ':' + minute; // YYYY/MM/DD hh:mm
            break;
        default:
            str = year + '/' + month + '/' + day;		// YYYY/MM/DD
    }
    
    return str;
};


Picker.matchComponentVsPicker = function(cpnPicker, str, mode){
    if(str)
        switch(mode) {
            case 1:
                year = parseInt(str.substring(0,4),10);
                month = parseInt(str.substring(5,7),10);
                day  = parseInt(str.substring(8,10),10);
                cpnPicker.setValueAnimated({
                    year : year,
                    month: month,
                    day  : day
                });
                break;
            case 2:
                hour = parseInt(str.substring(0,2),10);
                minute = parseInt(str.substring(3,5),10);
                cpnPicker.setValueAnimated({
                    hour : hour,
                    minute : minute
                });
                break;
            case 3:
                year = parseInt(str.substring(0,4),10);
                month = parseInt(str.substring(5,7),10);
                day  = parseInt(str.substring(8,10),10);
                hour = parseInt(str.substring(11,13),10);
                minute = parseInt(str.substring(14,16),10);
                cpnPicker.setValueAnimated({
                    year : year,
                    month: month,
                    day  : day,
                    hour : hour,
                    minute : minute
                });
                break;
            default:
                year = parseInt(str.substring(0,4),10);
                month = parseInt(str.substring(5,7),10);
                day  = parseInt(str.substring(8,10),10);
                cpnPicker.setValueAnimated({
                    year : year,
                    month: month,
                    day  : day
                });
        }
    else
    {
        date = new Date();
        if(date.getMinutes()>0 && date.getMinutes()<=30)
            date.setMinutes(30);
        else
            date.setMinutes(0);
        cpnPicker.setValueAnimated(date);
    }
};
