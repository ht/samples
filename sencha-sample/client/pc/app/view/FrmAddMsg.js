/*
 * File: app/view/FrmAddMsg.js
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

Ext.define('MyApp.view.FrmAddMsg', {
    extend: 'Ext.window.Window',
    alias: 'widget.FrmAddMsg',

    requires: [
        'MyApp.view.UcTreeMember',
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.form.field.File',
        'Ext.form.field.TextArea',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.tree.Panel',
        'Ext.button.Button'
    ],

    height: 550,
    id: 'FrmAddMsg',
    itemId: 'FrmAddMsg',
    constrain: true,
    resizable: false,
    layout: 'absolute',
    icon: 'resources/images/ACcommIcon.ico',
    title: 'メッセージの作成と編集 (新規)',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    x: 0,
                    y: -20,
                    border: false,
                    height: 530,
                    id: 'pnlAddMsg',
                    itemId: 'pnlAddMsg',
                    width: 820,
                    resizable: false,
                    layout: 'absolute',
                    bodyPadding: 10,
                    bodyStyle: {
                        background: 'none !important'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            x: 10,
                            y: 30,
                            id: 'txtReleaseDate',
                            itemId: 'txtReleaseDate',
                            width: 210,
                            fieldLabel: 'リリース日',
                            labelWidth: 65,
                            name: 'txtFrmAddMsgReleaseDate',
                            readOnly: true
                        },
                        {
                            xtype: 'datefield',
                            x: 290,
                            y: 30,
                            id: 'dtpExpilationDate',
                            itemId: 'dtpExpilationDate',
                            width: 210,
                            fieldLabel: '伝達期限',
                            labelWidth: 65,
                            maskRe: /[\d/\d/\d]/,
                            format: 'Y/m/d'
                        },
                        {
                            xtype: 'combobox',
                            x: 10,
                            y: 60,
                            id: 'cboMessagePartImportant',
                            itemId: 'cboMessagePartImportant',
                            width: 210,
                            fieldLabel: '重要度',
                            labelWidth: 65,
                            name: 'cboMessagePartImportant',
                            editable: false,
                            displayField: 'TITLE',
                            queryMode: 'local',
                            store: 'StCriticalLevels',
                            valueField: 'VALUE'
                        },
                        {
                            xtype: 'label',
                            x: 290,
                            y: 60,
                            text: '進捗:'
                        },
                        {
                            xtype: 'combobox',
                            x: 360,
                            y: 60,
                            id: 'cboMessagePartProgress',
                            itemId: 'cboMessagePartProgress',
                            width: 140,
                            fieldLabel: '',
                            labelWidth: 65,
                            editable: false,
                            displayField: 'TITLE',
                            queryMode: 'local',
                            store: 'StProgresses',
                            valueField: 'VALUE'
                        },
                        {
                            xtype: 'textfield',
                            x: 10,
                            y: 90,
                            id: 'txtMsgTitle',
                            itemId: 'txtMsgTitle',
                            width: 490,
                            fieldLabel: '題名',
                            labelWidth: 65
                        },
                        {
                            xtype: 'boxselect',
                            createNewOnEnter: true,
                            createNewOnBlur: true,
                            filterPickList: true,
                            growMin: 35,
                            growMax: 40,
                            x: 10,
                            y: 120,
                            id: 'cboTag',
                            itemId: 'cboTag',
                            width: 490,
                            fieldLabel: 'タグ',
                            labelWidth: 65,
                            displayField: 'TITLE',
                            multiSelect: true,
                            queryMode: 'local',
                            store: 'StTag',
                            valueField: 'VALUE',
							forceSelection: false
                        },
                        {
                            xtype: 'textfield',
                            x: 10,
                            y: 170,
                            id: 'txtFileAttach',
                            itemId: 'txtFileAttach',
                            width: 440,
                            readOnly: true
                        },
                        {
                            xtype: 'filefield',
                            x: 455,
                            y: 170,
                            id: 'fileAttach',
                            itemId: 'fileAttach',
                            width: 50,
                            name: 'fileAttach[]',
                            buttonOnly: true,
                            buttonText: '添付..'
                        },
                        {
                            xtype: 'textareafield',
                            x: 10,
                            y: 200,
                            height: 290,
                            id: 'txtMsgText',
                            itemId: 'txtMsgText',
                            width: 490,
                            fieldLabel: ''
                        },
                        {
                            xtype: 'combobox',
                            x: 510,
                            y: 50,
                            id: 'cboFixedForm',
                            itemId: 'cboFixedForm',
                            width: 280,
                            fieldLabel: 'テンプレート',
                            labelWidth: 80,
                            editable: false,
                            displayField: 'TITLE',
                            queryMode: 'local',
                            store: 'StFixedForm',
                            valueField: 'VALUE'
                        },
                        {
                            xtype: 'fieldset',
                            x: 510,
                            y: 80,
                            height: 450,
                            width: 290,
                            layout: 'absolute',
                            title: '送信先',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    x: 7,
                                    y: 10,
                                    id: 'chkCircle',
                                    itemId: 'chkCircle',
                                    fieldLabel: '',
                                    boxLabel: ''
                                },
                                {
                                    xtype: 'combobox',
                                    x: 25,
                                    y: 10,
                                    disabled: true,
                                    id: 'cboCircle',
                                    itemId: 'cboCircle',
                                    width: 240,
                                    fieldLabel: 'サークル',
                                    labelWidth: 80,
                                    editable: false,
                                    displayField: 'TITLE',
                                    queryMode: 'local',
                                    store: 'StCircleGroup',
                                    valueField: 'VALUE'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    x: 7,
                                    y: 40,
                                    id: 'chkGroup',
                                    itemId: 'chkGroup',
                                    fieldLabel: '',
                                    boxLabel: '',
                                    checked: true
                                },
                                {
                                    xtype: 'combobox',
                                    x: 25,
                                    y: 40,
                                    id: 'cboGroup',
                                    itemId: 'cboGroup',
                                    width: 240,
                                    fieldLabel: 'グループ指定',
                                    labelWidth: 80,
                                    editable: false,
                                    displayField: 'TITLE',
                                    queryMode: 'local',
                                    store: 'StGroup',
                                    valueField: 'VALUE'
                                },
                                {
                                    xtype: 'container',
                                    x: 0,
                                    y: 70,
                                    items: [
                                        {
                                            xtype: 'ucTreeMember'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            x: 300,
                            y: 500,
                            height: 30,
                            id: 'btnSave',
                            itemId: 'btnSave',
                            width: 90,
                            text: '保存'
                        },
                        {
                            xtype: 'button',
                            x: 410,
                            y: 500,
                            height: 30,
                            itemId: 'btnCloseAddMsg',
                            width: 90,
                            text: '閉じる'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});