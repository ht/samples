/*
 * File: app/view/CpInputViewComment.js
 *
 * This file was generated by Sencha Architect
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('HKD.view.CpInputViewComment', {
    extend: 'Ext.Container',
    alias: 'widget.cpInputViewComment',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Img',
        'Ext.Panel',
        'Ext.field.Text',
        'Ext.grid.Grid',
        'Ext.grid.column.Column'
    ],

    config: {
        id: 'cpInputViewComment',
        itemId: 'cpInputViewComment',
        width: '100%',
        layout: 'hbox',
        items: [
            {
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [
                    {
                        xtype: 'toolbar',
                        cls: 'menuconttoolbardark',
                        docked: 'top',
                        itemId: 'menuConstToolbar',
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'btnCloseTextMessage',
                                padding: '0 0 .2em 0',
                                ui: 'plain',
                                iconCls: 'delete',
                                text: ''
                            },
                            {
                                xtype: 'image',
                                docked: 'right',
                                height: '1.5em',
                                itemId: 'btnShowComment',
                                margin: '.5em 0 0 0',
                                width: '1.5em',
                                src: '../accom/resources/sm/images/comment.png'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        height: '100%',
                        id: 'textMessage',
                        style: 'white-space:pre-wrap;overflow: hidden; border-left: 1px solid gray; background-color:#fffd8f;',
                        styleHtmlContent: true,
                        width: '100%',
                        layout: 'fit',
                        scrollable: true
                    }
                ]
            },
            {
                xtype: 'container',
                flex: 1,
                hidden: true,
                itemId: 'containerComment',
                layout: 'vbox',
                scrollable: 'vertical',
                items: [
                    {
                        xtype: 'toolbar',
                        cls: 'menuconttoolbardark',
                        docked: 'top',
                        itemId: 'menuCloseToolbar',
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'btnCloseComment',
                                margin: '0 0 .2em 0',
                                padding: '0 0 .2em 0',
                                ui: 'plain',
                                iconCls: 'delete',
                                text: ''
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'txtComment',
                                width: '80%',
                                label: 'コメント'
                            },
                            {
                                xtype: 'button',
                                id: 'btnAddComment',
                                itemId: 'btnAddComment',
                                ui: 'confirm',
                                width: '20%',
                                text: '保存'
                            }
                        ]
                    },
                    {
                        xtype: 'grid',
                        titleBar: false,
                        flex: 1,
                        height: '40%',
                        id: 'gridComment',
                        style: 'height: 45px !important;     margin-top: -20px !important;         background-color: lightblue !important;',
                        store: 'StMessageComment',
                        itemHeight: 45,
                        columns: [
                            {
                                xtype: 'column',
                                width: 110,
                                dataIndex: 'ADD_TIME',
                                text: '日時'
                            },
                            {
                                xtype: 'column',
                                width: 300,
                                dataIndex: 'COMMENT_TEXT',
                                text: 'コメント'
                            },
                            {
                                xtype: 'column',
                                width: 110,
                                dataIndex: 'EMP_NAME',
                                text: '名前'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});