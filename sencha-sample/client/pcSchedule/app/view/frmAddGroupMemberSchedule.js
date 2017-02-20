/*
 * File: app/view/frmAddGroupMemberSchedule.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.frmAddGroupMemberSchedule', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    height: 123,
    width: 400,
    resizable: false,
    layout: 'absolute',
    title: '文字入力',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    x: 20,
                    y: 10,
                    id: 'txtGroupMemberLabel',
                    itemId: 'txtGroupMemberLabel',
                    width: 350
                },
                {
                    xtype: 'button',
                    x: 220,
                    y: 50,
                    id: 'btnAddNewGroup',
                    itemId: 'btnAddNewGroup',
                    width: 60,
                    text: 'OK'
                },
                {
                    xtype: 'button',
                    x: 290,
                    y: 50,
                    id: 'btnGroupMemberCancel',
                    itemId: 'btnGroupMemberCancel',
                    width: 80,
                    text: 'キャンセル'
                }
            ]
        });

        me.callParent(arguments);
    }

});