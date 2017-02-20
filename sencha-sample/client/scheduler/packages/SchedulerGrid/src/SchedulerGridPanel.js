Ext.define("Ext.ux.SchedulerGrid",{
	alias:"widget.schedulergrid",
	extend:"Sch.panel.SchedulerGrid",

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],

    constructor: function() {
        Ext.QuickTips.init();
        this.callParent(arguments);
    },

    initComponent: function() {
        var me = this,
            startDate = new Date(2011, 1, 7, 8),
            endDate = Sch.util.Date.add(startDate,Sch.util.Date.HOUR, 10),
            listeners = {
                eventcontextmenu: me.onEventContextMenu, 
                beforetooltipshow: me.beforeTooltipShow, 
                beforeeventresize: me.allowModify,
                beforeeventdrag: me.allowModify,
                scope: me
            };

        //set up the listeners
        me.listeners = listeners;
        //we have to hack the start and end dates 
        //in right now
        me.startDate = startDate;
        me.endDate = endDate;

        this.callParent(arguments);
    },

    show : function(eventRecord) {
        var resourceId = eventRecord.getResourceId();
        // Load the image of the resource
        this.img.setSrc(this.schedulerView.resourceStore.getById(resourceId).get('ImgUrl'));

        this.callParent(arguments);
    },

    onEventContextMenu: function (s, rec, e) {
        e.stopEvent();

        if (!s.ctx) {
            s.ctx = new Ext.menu.Menu({
                items: [{
                    text: 'Delete event',
                    iconCls: 'icon-delete',
                    handler : function() {
                        s.eventStore.remove(s.ctx.rec);
                    }
                }]
            });
        }
        s.ctx.rec = rec;
        s.ctx.showAt(e.getXY());
    },

    eventRenderer: function (item, resourceRec, tplData) {
        var bookingStart = item.getStartDate();
        tplData.style = 'background-color:' + (resourceRec.get('Color') || 'Coral');

        return {
            headerText: Ext.Date.format(bookingStart, this.getDisplayDateFormat()),
            footerText: item.data.Title
        };
    },

    // Don't show tooltip if editor is visible
    beforeTooltipShow: function (s, r) {
        return s.getEventEditor().getCollapsed();
    },

    initStoreEvents: function () {
        var s = this.scheduler;

        s.eventStore.on({
            'update' : function (store, bookingRecord, operation) {
                if (operation !== Ext.data.Model.EDIT) return;

                var el= s.getSchedulingView().getElementFromEventRecord(bookingRecord);
                if (el) {
                    el.addCls('sch-fake-loading');

                    // Simulate server delay 1.5 seconds
                    Ext.Function.defer(function() {
                        bookingRecord.commit();
                        el.removeCls('sch-fake-loading');
                    }, 1500, bookingRecord);
                }
            },
            
            add : function(s, rs) {
                // Pretend it's been sent to server and stored
                rs[0].commit();
            }
        });

        s.resourceStore.on('load', function(rStore) {
            // Events piggyback on the resource store load
            s.eventStore.loadData(rStore.proxy.reader.jsonData.tasks);
        });
    },

    allowModify: function(s, r) {
        // Don't allow modifications while "fake loading" is happening
        return !r.dirty;
    },
});