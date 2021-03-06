/*
 * File: app/controller/CMessage.js
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

Ext.define('HKD.controller.CMessage', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            grdListMessage: 'grid#gridmessage',
            cpMain: 'container#cpMain',
            mainContainerView: 'mainContainerView',
            mainDisplayView: 'mainContainerView panel[cls=main-display-view]',
            messagetype: 'selectfield#messagetype',
            message: 'selectfield#message',
            msgId: 'textfield#txtMsgId',
            cboSender: 'selectfield#cboSender',
            cboTrgMember: 'selectfield#cboTrgMember',
            cboImportant: 'selectfield#cboImportant',
            cboProgress: 'selectfield#cboProgress',
            cpInputViewComment: 'container#cpInputViewComment',
            btnAddComment: 'button#btnAddComment',
            gridComment: 'grid#gridComment',
            txtComment: 'textfield#txtComment',
            filterMessageBtn: 'button#btnFilterMessage',
            textMessage: 'panel#textMessage',
            containerComment: 'container#containerComment',
            menuConstToolbar: 'toolbar#menuConstToolbar'
        },

        control: {
            "button#mybutton14": {
                tap: 'onButtonTap'
            },
            "grid#gridmessage": {
                itemdoubletap: 'onGridItemDoubletapGridMessage',
                itemsingletap: 'onGridItemTapShowByMessage'
            },
            "selectfield#messagetype": {
                change: 'onSelectfieldChangeMessaType'
            },
            "selectfield#message": {
                change: 'onSelectfieldChangeMessage'
            },
            "selectfield#myselectfield20": {
                change: 'onSelectfieldChangeCircleGroup'
            },
            "button#btnSearch": {
                tap: 'onButtonTapSearchMessage'
            },
            "container#cpInputViewComment": {
                show: 'onContainerInitializeDetailMessage'
            },
            "button#btnAddComment": {
                tap: 'onButtonTapAddComment'
            },
            "button#mybutton1": {
                tap: 'onButtonTapCloseMessageComment'
            },
            "image#btnShowComment": {
                tap: 'onShowCommentTap'
            },
            "button#btnCloseComment": {
                tap: 'onCloseCommentButton'
            },
            "button#btnCloseTextMessage": {
                tap: 'onCloseTextMessageButton'
            }
        }
    },

    onButtonTap: function(button, e, eOpts) {
        var circleContainer = this.getCircleContainer();
        var addressRecipientContainer = this.getGridRecipientsContainer();
        addressRecipientContainer.show();
        // if(newValue == 'circle'){
        //     circleContainer.show();
        //     addressRecipientContainer.hide();
        // }else if(newValue == 'address'){
        //     addressRecipientContainer.show();
        //     circleContainer.hide();
        // }else{
        //     circleContainer.hide();
        //     addressRecipientContainer.hide();
        // }
    },

    onGridItemDoubletapGridMessage: function(dataview, index, target, record, e, eOpts) {
        console.log(record.get('ADD_EMP_ID'));
        console.log(HKD.util.Utilities.userEmpInfo.EMP_ID);
        console.log(Constant.ADMIN_ROLE);
        console.log(HKD.util.Utilities.userEmpInfo.EMP_AUTH_ID);
        if(HKD.util.Utilities.userEmpInfo.EMP_ID == record.get('ADD_EMP_ID')||HKD.util.Utilities.userEmpInfo.EMP_AUTH_ID == Constant.ADMIN_ROLE ){
            var mainDisplayView = this.getMainDisplayView();
            // Here you can switch view if you want because main display view has layout card (check if it has the old view otherwise add new view).
            // But for simple, I just remove the old view and add new one
            mainDisplayView.removeAt(0);
            HKD.util.Utilities.frmMessageStatusAddNew = false;
            var newController = Ext.create('HKD.controller.CUCEmployees', {application: HKD.app}).resetUCEmployees();
            // BEGIN: Le Dang Son - 2014/06/16
            HKD.util.Utilities.message = record;

            // END

            mainDisplayView.add({
                xtype: 'navigationview',
                showAnimation: 'pop',
                navigationBar: null,
                items: [
                    {
                        xtype: 'navigationBar'
                    },
                    {
                        xtype: 'cpAddEditMessage'
                    }
                ]
            });
        }

    },

    onSelectfieldChangeMessaType: function(selectfield, newValue, oldValue, eOpts) {
        var message = this.getMessage(),
            store = message.getStore();
            store.clearFilter(true);
            console.log('combo type message : ' + newValue );
            store.filter('type', newValue);
            if(store.getCount()>0)
                message.setReadOnly(false);
            else
                message.setReadOnly(true);
        store.load();

    },

    onSelectfieldChangeMessage: function(selectfield, newValue, oldValue, eOpts) {
        var storeGrid = this.getGrdListMessage().getStore();
        console.log("storeGrid: " + storeGrid );
        if('' !== newValue && null !== newValue && -1 !== newValue){
            //storeGrid.getProxy().setExtraParam("msgFilterName", newValue);
            storeGrid.getProxy().getExtraParams().msgFilterName = newValue;
            console.log(storeGrid.getProxy().getExtraParams());
            console.log("newValue1: " + newValue );
        }else{
            storeGrid.getProxy().getExtraParams().msgFilterName = 'RecvUnconfirmed';
            //storeGrid.getProxy().setExtraParam("msgFilterName", 'RecvUnconfirmed');
            console.log("newValue2: " + newValue );}

        storeGrid.load(
            {
                params: {
                    start                  : 1,
                    limit                  : 2000,
                    pageSize:50
                    //currentPage:1
                    //msgFilterName:newValue
                }
            });
        this.getGrdListMessage().refresh();

    },

    onGridItemTapShowByMessage: function(dataview, index, target, record, e, eOpts) {
        //if(HKD.util.Utilities.userEmpInfo.EMP_ID == record.get('ADD_EMP_ID')||HKD.util.Utilities.userEmpInfo.EMP_AUTH_ID == Constant.ADMIN_ROLE ){
            var mainDisplayView = this.getMainDisplayView();
            mainDisplayView.removeAt(0);
            HKD.util.Utilities.frmMessageStatusAddNew = false;
            //var newController = Ext.create('HKD.controller.CUCEmployees', {application: HKD.app}).resetUCEmployees();
            // BEGIN: Le Dang Son - 2014/06/16
            HKD.util.Utilities.message = record;
            mainDisplayView.add({
                xtype: 'navigationview',
                showAnimation: 'pop',
                navigationBar: null,
                items: [
                    {
                        xtype: 'navigationBar'
                    },
                    {
                        xtype: 'cpInputViewComment'
                    }
                ]
            });
            this.getFilterMessageBtn().hide();

    },

    onSelectfieldChangeCircleGroup: function(selectfield, newValue, oldValue, eOpts) {
        this.grdMsgLoadWithExtraParam(newValue);
    },

    onButtonTapSearchMessage: function(button, e, eOpts) {
        var sMsgId =0 , sSender = 0, sTrgMember =0,sImportant=0,sProgress=0,sReleaseBefore='',sReleaseSince ='';

        if(this.getMsgId().getValue()!==null){
            sMsgId = this.getMsgId().getValue();
        }
        if(this.getCboSender().getValue()!==null){
            sSender = this.getCboSender().getValue();
        }
        if(this.getCboTrgMember().getValue()!==null){
            sTrgMember= this.getCboTrgMember().getValue();
        }
        if(this.getCboImportant().getValue()!==null){
           sImportant= this.getCboImportant().getValue();
        }
        if(this.getCboProgress().getValue()!==null){
            sProgress= this.getCboProgress().getValue();
        }

        var arraySearchInfo = {
            empCd:HKD.util.Utilities.userEmpInfo.EMP_ID,
            trgMember:sTrgMember,
            favorite:false,
            msgId:sMsgId,
            sender:sSender,
            subject:"",
            message:"",
            important:sImportant,
            progress: sProgress,
            checkFavorite:false,
            checkAttach:false,
            releaseBefore:"",
            releaseSince: "",
            checkReleaseBefore:false,
            checkReleaseSince:false
        },
        searchInfo = JSON.stringify(arraySearchInfo),
        gridListMessage = this.getGrdListMessage(),

        storeGridListMessage = gridListMessage.getStore();console.log(gridListMessage);
        storeGridListMessage.getProxy().setExtraParam("searchFrom", 1);
        storeGridListMessage.getProxy().setExtraParam("searchInfo", searchInfo);
        //storeGridListMessage.getProxy().setExtraParam("limit", 50);
        //storeGridListMessage.currentPage = 1;
        console.log(arraySearchInfo);

        storeGridListMessage.load({
            params: {
                start:0,
                searchFrom:1,
                limit: 1000,
                pageSize:50
            },
            callback: function(records, operation, success) {

                if (success === false) {
                    console.log(operation);
                    //MessageCommon.showErrorMessage(operation);
                    //MessageCommon.showLoadGridFailMessage('HKD 対象一覧');
                }
            }
        });
        //gridListMessage.refresh();
    },

    onContainerInitializeDetailMessage: function(component, eOpts) {
        me = this;
        var record = HKD.util.Utilities.message,detailMessage,
        msgID= record.data.MSG_ID.trim();
        console.log(msgID);
        if(null !== msgID){
            Ext.Ajax.request({
                method: 'GET',
                url: apiUrl + 'main/loadMessageDetail',
                params: {msgID: msgID},
                success: function(data){
                    var obj = Ext.decode(data.responseText);
                    if(obj.responseCode === 403){
                        MessageCommon.showErrorMessage(obj.responseMessage);
                    }else{
                        if(obj.success === true){
                            detailMessage = obj.data.MSG_TEXT;
                            console.log(detailMessage);
                            var msg = Ext.getCmp('textMessage');//this.getTextMessage();
                            msg.setHtml(detailMessage.replace('/\r\n|\r|\n/','<br />'));

                        }
                    }
                },
                failure: function(error){
                    MessageCommon.showErrorMessage(MessageCommon.MesErrorServerFail);
                }
            });
        }

         Ext.Ajax.request({
                method: 'POST',
                url: apiUrl + 'main/checkEditMessage',
                async: false,
                params: {msgID: msgID},
                success: function(data){
                    var obj = Ext.decode(data.responseText);
                    if(obj.responseCode === 403){
                        MessageCommon.showErrorMessage(obj.responseMessage);
                    }else{
                        if(obj.success === true){
                            if(obj.data.hasCircle===true){

                                if(obj.data.editable !== false){
                                    me.getBtnAddComment().setDisabled(false);
                                }else{
                                    me.getBtnAddComment().setDisabled(true);
                                }
                            }
                        }
                    }
                },
                failure: function(error){
                    MessageCommon.showErrorMessage(MessageCommon.MesErrorServerFail);
                }
            });

        // message status is draft or complete all user can't comment --  admin can't comment
            if(HKD.util.Utilities.message.data.EMP_PROGRESS_TEXT != '伝達中'||HKD.util.Utilities.userEmpInfo.EMP_AUTH_ID == Constant.ADMIN_ROLE){
                me.getBtnAddComment().setDisabled(true);
            } else{
                // creater all way comment
                if(HKD.util.Utilities.userEmpInfo.EMP_ID == record.get('ADD_EMP_ID')){
                    me.getBtnAddComment().setDisabled(false);
                }
            }
         //Load and show comments of message
            var grdMsgCommentStore = me.getGridComment().getStore();
            console.log(grdMsgCommentStore);
            grdMsgCommentStore.getProxy().getExtraParams().msgID = msgID;
            grdMsgCommentStore.load(
            {
                params: {
                    start                  : 1,
                    limit                  : 100,
                    pageSize:50
                }
            });
        me.getGridComment().refresh();
    },

    onButtonTapAddComment: function(button, e, eOpts) {
        this.getBtnAddComment().setDisabled(true);
        var record = HKD.util.Utilities.message,
        msgID = record.data.MSG_ID.trim();
        if(HKD.util.Utilities.message !== null){
            if(record.data.EMP_PROGRESS_TEXT.trim() != '伝達中'){
                MessageCommon.showErrorMessage(MessageCommon.NotCommentOnCloseMessage);
                this.getBtnAddComment().setDisabled(false);
                return false;
            }
            var comment = this.getTxtComment();
            if(comment.getValue().trim().length === 0){
                MessageCommon.showErrorMessage(MessageCommon.CommentNull);
                this.getBtnAddComment().setDisabled(false);
                return false;
            }else{
                var param = {
                    msgID: msgID,
                    comment: this.getTxtComment().getValue()
                };
                var me = this;
                Ext.Ajax.request({
                    method: 'POST',
                    url: apiUrl + 'main/addComment',
                    params: {param: Ext.encode(param)},
                    success: function(response){
                        var obj = Ext.decode(response.responseText);
                        if(obj.responseCode === 403){
                            MessageCommon.showErrorMessage(obj.responseMessage);
                        }else{
                            if(obj.success === true){
                                me.getTxtComment().setValue('');
                                var grdMsgCommentStore = me.getGridComment().getStore();
                                grdMsgCommentStore.getProxy().getExtraParams().msgID = msgID;
                                MessageCommon.showInfoMessage(MessageCommon.UpdateSuccessfully);
                                grdMsgCommentStore.load();
                                me.getBtnAddComment().setDisabled(false);
                            }else{
                                MessageCommon.showInfoMessage(MessageCommon.UpdateFail);
                                me.getBtnAddComment().setDisabled(false);
                            }
                        }
                    },
                    failure: function(error){
                        MessageCommon.showErrorMessage(MessageCommon.MesErrorServerFail);
                        me.getBtnAddComment().setDisabled(false);
                    }
                });
            }
        }
        this.getBtnAddComment().setDisabled(false);
        return false;


        ///Test
    },

    onButtonTapCloseMessageComment: function(button, e, eOpts) {
        var mainDisplayView = Ext.getCmp('mainDisplayView');
        mainDisplayView.removeAt(0);
        mainDisplayView.add({
            xtype: 'navigationview',
            showAnimation: 'slide',
            navigationBar: null,
            items: [
                {
                    xtype: 'navigationBar'
                },
                {
                    xtype: 'cpListMessage'
                }
            ]
        });
        Ext.getCmp('btnFilterMessage').show();
    },

    onShowCommentTap: function(image, e, eOpts) {
        var me =this;
        var isPhone = !Ext.isEmpty(Ext.os.is.Phone);  // needed since this function returns either undefined or true
        //var menucont = commonController.getMainContainer();
        var swapcont = me.getCpInputViewComment();
        var gridcont = swapcont.down('#textMessage');
        if (!gridcont) {return;}
        me.showComment(gridcont, (image.closed ? (isPhone ? '100%' : '340px') : '0px'), !image.closed);
    },

    onCloseCommentButton: function(button, e, eOpts) {
        var me =this;
        var isPhone = !Ext.isEmpty(Ext.os.is.Phone);  // needed since this function returns either undefined or true
        //var menucont = commonController.getMainContainer();
        var swapcont = me.getCpInputViewComment();
        var gridcont = swapcont.down('#textMessage');
        if (!gridcont) {return;}
        me.showComment(gridcont, '0px', true);
    },

    onCloseTextMessageButton: function(button, e, eOpts) {
        var mainDisplayView = Ext.getCmp('mainDisplayView');
        mainDisplayView.removeAt(0);
        mainDisplayView.add({
            xtype: 'navigationview',
            showAnimation: 'slide',
            navigationBar: null,
            items: [
                {
                    xtype: 'navigationBar'
                },
                {
                    xtype: 'cpListMessage'
                }
            ]
        });
        Ext.getCmp('btnFilterMessage').show();
    },

    grdMsgLoadWithExtraParam: function(newValue) {
        var msgFilterName = this.getMessage().getValue();//get selected value of cmb message status
        //console.log(msgFilterName);
        var grdListMessageStore = this.getGrdListMessage().getStore();
        if('' !== msgFilterName && null !== msgFilterName && -1 !== msgFilterName)
            grdListMessageStore.getProxy().setExtraParam("msgFilterName", msgFilterName);
        else
            grdListMessageStore.getProxy().setExtraParam("msgFilterName", 'RecvUnconfirmed');

        if('' !== newValue && null !== newValue && '-1' !== newValue){
            grdListMessageStore.getProxy().setExtraParam("circleID", newValue);
        }else{
            grdListMessageStore.getProxy().setExtraParam("circleID", '');
        }

        grdListMessageStore.getProxy().setExtraParam("searchFrom", 0);
        grdListMessageStore.load({
            params: {
                start                  : 1,
                limit                  : 5000,
                pageSize:50,
                currentPage:1
                //msgFilterName:newValue,
                //circleID:newValue

            }
        });
        this.getGrdListMessage().refresh();

    },

    showComment: function(panel, myWidth, close) {
        var help, me=this, cont;

        cont = me.getCpInputViewComment();
        help = me.getContainerComment();
        icon = me.getMenuConstToolbar().down('#btnShowComment');
        help.setWidth(myWidth);
        help.setHidden(false);
        if (!Ext.os.is.Phone) {
           help.down('#menuCloseToolbar').setHidden(true);  // Hide help menu toolbar for tablets
        }
        if (close) {
            icon.setSrc('../accom/resources/sm/images/comment.png');
            icon.closed = true;
        } else {
            icon.setSrc('../accom/resources/sm/images/next_32.png');
            icon.closed = false;
        }

    }

});