Sch.preset.Manager.registerPreset("monthAndDay", {
    timeColumnWidth: 50,
    displayDateFormat: 'Y/m/d',
    shiftUnit: "MONTH",
    shiftIncrement: 1,
    defaultSpan: 10,
    timeResolution: {
        unit: "DAY",
        increment: 1
    },
    headerConfig: { 
        bottom: {
            unit: "DAY",
            align: 'center',
            renderer: function (start) {
                return Ext.Date.dayNames[start.getDay()].substring(0, 3);
            }
        },
        middle: {
            unit: "DAY",
            align: 'center',
            dateFormat: 'd'
        },
        top: {
            unit: "MONTH",
            dateFormat: 'F Y',
            align: 'center'
        }
    }
});