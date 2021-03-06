/*
 * File: app/controller/CFrmSearchMsg.js
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

Ext.define('MyApp.controller.CFrmSearchMsg', {
    extend: 'Ext.app.Controller',

    frmSearchMsgAfterRender: function(component, eOpts) {

        if(Ext.getStore('StEmployeesSearch').getCount()=== 0){ // store FixedForm(msg template) did not load
            Ext.getStore('StEmployeesSearch').load({
                callback : function(records, options, success) {
                    if (success===false){
                        MessageCommon.showErrorMessage(MessageCommon.MesErrorServerFail);
                        return;
                    }
                }
            });
        }

        if(Ext.getStore('StProgressesSearch').getCount()=== 0){ // store FixedForm(msg template) did not load
            Ext.getStore('StProgressesSearch').load({
                callback : function(records, options, success) {
                    if (success===false){
                        MessageCommon.showErrorMessage(MessageCommon.MesErrorServerFail);
                        return;
                    }
                }
            });
        }

    },

    frmSearchMsgBeforeShow: function(component, eOpts) {
        var includeInactive = 0;
        if(Ext.getCmp('chkIncludeInactive').getValue()){
            includeInactive= 1;
        }
        this.reloadStoreSender(includeInactive);
    },

    chkEnableReleaseBeforeChange: function(field, newValue, oldValue, eOpts) {
        if(newValue===true)
        {
            Ext.getCmp('dtpReleaseBefore').setDisabled(false);
        }
        else
        {
            Ext.getCmp('dtpReleaseBefore').setDisabled(true);
        }
    },

    chkEnableReleaseSinceChange: function(field, newValue, oldValue, eOpts) {
        if(newValue===true)
        {
            Ext.getCmp('dtpReleaseSince').setDisabled(false);
        }
        else
        {
            Ext.getCmp('dtpReleaseSince').setDisabled(true);
        }
    },

    btnSearchClick: function(button, e, eOpts) {
        if(this.checkInputData()===false){
            return;
        }
        else{
        //     try
        //     {
                MyApp.util.Utilities.isLoadingMsg=true;
                new MyApp.controller.CFrmMain().resetSearchValue();
                var sTrgMember =0;
                var sSender =0;
                var sImportant=0;
                var sProgress=0;
                var sReleaseBefore='';
                var sReleaseSince ='';

                if(Ext.getCmp('cboTrgMemberSearch').getValue()!==null)
                {
                    sTrgMember = Ext.getCmp('cboTrgMemberSearch').getValue();
                }
                if(Ext.getCmp('cboSenderSearch').getValue()!==null)
                {
                    sSender = Ext.getCmp('cboSenderSearch').getValue();
                }

                if(Ext.getCmp('cboImportantSearch').getValue()!==null)
                {
                    sImportant = Ext.getCmp('cboImportantSearch').getValue();
                }

                if(Ext.getCmp('cboProgressSearch').getValue()!==null)
                {
                    sProgress = Ext.getCmp('cboProgressSearch').getValue();
                }


                if(Ext.getCmp('chkEnableReleaseBefore').getValue())
                {
                    sReleaseBefore= MyApp.app.common.convertDateToYmd(Ext.getCmp('dtpReleaseBefore').getValue());
                }

                if(Ext.getCmp('chkEnableReleaseSince').getValue())
                {
                    sReleaseSince  = MyApp.app.common.convertDateToYmd(Ext.getCmp('dtpReleaseSince').getValue());
                }

                var arraySearchInfo = {
                    empCd:MyApp.util.Utilities.userEmpInfo.EMP_ID,
                    trgMember:sTrgMember,
                    favorite:Ext.getCmp('chkFavorite').getValue(),
                    msgId:Ext.getCmp('txtMsgId').getValue(),
                    sender:sSender,
                    subject: Ext.getCmp('txtSubjectSearch').getValue(),
                    message:Ext.getCmp('txtMessageSearch').getValue(),
                    important:sImportant,
                    progress: sProgress,
                    checkFavorite:Ext.getCmp('chkFavorite').getValue(),
                    checkAttach:Ext.getCmp('chkAttach').getValue(),
                    releaseBefore:sReleaseBefore,
                    releaseSince: sReleaseSince,
                    checkReleaseBefore:Ext.getCmp('chkEnableReleaseBefore').getValue(),
                    checkReleaseSince:Ext.getCmp('chkEnableReleaseSince').getValue()
                };
                var searchInfo=JSON.stringify(arraySearchInfo);



                var grdMsgStore = Ext.getCmp('grdMsg').getStore();

                grdMsgStore.getProxy().setExtraParam("searchFrom", 1);
                grdMsgStore.getProxy().setExtraParam("searchInfo", searchInfo);
                grdMsgStore.getProxy().setExtraParam("limete", 50);

                grdMsgStore.load({
                    params: {start:0,searchFrom:1},
                    async: false,
                    callback: function (records, options, success) {
                        MyApp.util.Utilities.isLoadingMsg=false;
                        if (success===false){
                            MessageCommon.showErrorMessage(MessageCommon.MesErrorServerFail);
                            return;
                        }
                    }
                });
                grdMsgStore.currentPage = 1;

                button.up('window').hide();

        }
    },

    frmSearchMsgBeforeHide: function(component, eOpts) {
        MyApp.util.Utilities.openedForm=false;
        var includeInactive = 0;
        this.reloadStoreSender(includeInactive);
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        var includeInactive = 0;
        if(newValue){
            includeInactive= 1;
        }

        this.reloadStoreSender(includeInactive);
    },

    checkInputData: function() {

        if((Ext.getCmp('chkEnableReleaseBefore').getValue()===true &&
            Ext.getCmp('dtpReleaseBefore').getValue()===null)||
           Ext.getCmp('dtpReleaseBefore').isValid()===false){

            MessageCommon.showErrorMessageForcus('【以前にリリースされたメッセージ】を選んだ後で、日付を選んでください。','chkEnableReleaseBefore');
            return false;
        }
        if((Ext.getCmp('chkEnableReleaseSince').getValue()===true &&
            Ext.getCmp('dtpReleaseSince').getValue()===null)||
           Ext.getCmp('dtpReleaseSince').isValid()===false){

            MessageCommon.showErrorMessageForcus('【以降にリリースさえれたメッセージ】を選んだ後で、日付を選んでください。','chkEnableReleaseSince');
            return false;
        }
        return true;
    },

    reloadStoreSender: function(includeInactive) {
        Ext.getStore('StEmployeesSearch').load({
            params: {includeInactive:includeInactive},
            callback : function(records, options, success) {
                if (success===false){
                    MessageCommon.showErrorMessage(MessageCommon.MesErrorServerFail);
                    return;
                }
                else{
                    var stEmployeesSearch = Ext.getStore('StEmployeesSearch');
                    if(typeof(stEmployeesSearch.getAt(0)) != 'undefined'){
                        Ext.getCmp('cboSenderSearch').setValue(stEmployeesSearch.getAt(0).get('EMP_ID'));
                        Ext.getCmp('cboTrgMemberSearch').setValue(stEmployeesSearch.getAt(0).get('EMP_ID'));
                    }
                }

            }
        });


    },

    init: function(application) {
        this.control({
            "#FrmSearchMsg": {
                afterrender: this.frmSearchMsgAfterRender,
                beforeshow: this.frmSearchMsgBeforeShow,
                beforehide: this.frmSearchMsgBeforeHide
            },
            "#chkEnableReleaseBefore": {
                change: this.chkEnableReleaseBeforeChange
            },
            "#chkEnableReleaseSince": {
                change: this.chkEnableReleaseSinceChange
            },
            "#btnSearch": {
                click: this.btnSearchClick
            },
            "#chkIncludeInactive": {
                change: this.onCheckboxfieldChange
            }
        });
    }

});
