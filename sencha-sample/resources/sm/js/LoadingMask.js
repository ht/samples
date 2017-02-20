task = Ext.create('Ext.util.DelayedTask', function() {
Ext.Viewport.mask({ xtype: 'loadmask',
                  message: "Loading..." });
}, this);