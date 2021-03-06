/*
 * File: app/view/CpAddEditSchedule.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
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

Ext.define('HKD.view.CpAddEditSchedule', {
    extend: 'Ext.Container',
    alias: 'widget.cpAddEditSchedule',

    requires: [
        'HKD.view.UCEmployees',
        'Ext.form.FieldSet',
        'Ext.field.Checkbox',
        'Ext.field.Select',
        'Ext.field.TextArea',
        'Ext.Button'
    ],

    config: {
        id: 'cpAddEditSchedule',
        itemId: 'cpAddEditSchedule',
        scrollable: true,
        items: [
            {
                xtype: 'fieldset',
                title: '',
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'txtTitle',
                        label: 'タイトル',
                        labelWidth: '35%',
                        readOnly: false
                    },
                    {
                        xtype: 'checkboxfield',
                        itemId: 'chkAllDay',
                        label: '日間予定',
                        labelWidth: '35%'
                    },
                    {
                        xtype: 'textfield',
                        disabled: false,
                        itemId: 'txtStartDate',
                        label: '開始',
                        labelWidth: '35%',
                        placeHolder: 'yyyy/mm/dd hh:mm',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'txtEndDate',
                        label: '終了',
                        labelWidth: '35%',
                        placeHolder: 'yyyy/mm/dd hh:mm',
                        readOnly: true
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'cmbScheduleType',
                        label: '予定タイプ',
                        labelWidth: '35%',
                        displayField: 'TITLE',
                        valueField: 'VALUE'
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'cmbRoom',
                        label: '会議室',
                        labelWidth: '35%',
                        displayField: 'TITLE',
                        valueField: 'VALUE'
                    },
                    {
                        xtype: 'checkboxfield',
                        itemId: 'chkOnlyActive',
                        label: '進行中のみ',
                        labelWidth: '35%'
                    },
                    {
                        xtype: 'selectfield',
                        disabled: false,
                        itemId: 'cmbSectionSchedule',
                        label: '部署',
                        labelWidth: '35%',
                        displayField: 'SECTION_NAME',
                        valueField: 'SECTION_ID'
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'cmbProject',
                        label: 'プロジェクト',
                        labelWidth: '35%',
                        displayField: 'PROJECT_NAME',
                        valueField: 'PROJECT_ID'
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'cmbJobName',
                        label: 'ジョブ',
                        labelWidth: '35%',
                        displayField: 'JOB_NAME',
                        valueField: 'JOB_ID'
                    },
                    {
                        xtype: 'textareafield',
                        itemId: 'txtRemarks',
                        label: '備考',
                        labelWidth: '35%'
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'cmbStaffStatus',
                        label: '参加予定',
                        labelWidth: '35%',
                        readOnly: true,
                        displayField: 'TITLE',
                        valueField: 'VALUE'
                    },
                    {
                        xtype: 'checkboxfield',
                        itemId: 'chkClosedFlag',
                        label: '公開予定',
                        labelWidth: '35%'
                    },
                    {
                        xtype: 'checkboxfield',
                        itemId: 'chkUnLockFlag',
                        label: '編集可能',
                        labelWidth: '35%',
                        checked: true
                    },
                    {
                        xtype: 'container',
                        items: [
                            {
                                xtype: 'ucemployees'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'center',
                            pack: 'center'
                        },
                        items: [
                            {
                                xtype: 'button',
                                hidden: false,
                                id: 'btnDeleteSchedule',
                                itemId: 'btnDeleteSchedule',
                                margin: '10 5 10 5',
                                ui: 'action',
                                width: '30%',
                                text: '削除'
                            },
                            {
                                xtype: 'button',
                                id: 'btnSaveSchedule',
                                itemId: 'btnSaveSchedule',
                                margin: '10 5 10 5',
                                ui: 'confirm',
                                width: '30%',
                                text: '保存'
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnCloseSchedule',
                                margin: '10 5 10 5',
                                ui: 'decline',
                                width: '30%',
                                text: '閉じる'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});