/*
 * File: app/controller/CCircle.js
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

Ext.define('HKD.controller.CCircle', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            txtEmployees: 'textfield#txtEmployees',
            fstListEmployeeAfter: 'fieldset#fstListEmployeeAfter',
            txtGroupCircle: 'textfield#txtGroupCircle',
            mainDisplayView: 'panel#mainDisplayView',
            cmbListCircle: 'selectfield#cmbListCircle',
            btnDeleteCircle: 'button#btnDeleteCircle'
        },

        control: {
            "button#btnAddGroup": {
                tap: 'onButtonTapAddGroup'
            },
            "button#btnBackCircle": {
                tap: 'onButtonTapBackCircle'
            },
            "container#pnCircle": {
                show: 'onContainerShowPnCircle',
                activate: 'onContainerActivate'
            },
            "button#btnSaveCircle": {
                tap: 'onButtonTapSaveCircle'
            },
            "button#btnCloseCircle": {
                tap: 'onButtonTapCloseCircle'
            },
            "radiofield#rdoAddCase": {
                change: 'onRadiofieldChangeMode'
            },
            "selectfield#cmbListCircle": {
                change: 'onSelectfieldChangeListCircle'
            },
            "button#btnDeleteCircle": {
                tap: 'onButtonTapDeleteCircle'
            }
        }
    },

    onButtonTapAddGroup: function(button, e, eOpts) {
        Ext.getCmp('ctnBeforeCircle').hide();
        Ext.getCmp('ctnAfterCircle').show({ type: 'slide', duration: 500 });

        //set read only combobox list circle
        this.getCmbListCircle().setReadOnly(true);

        Ext.getCmp('fstListEmployeeAfter').removeAll();
        ////////////////////////////////////// Create for user login
        var acempID = HKD.util.Utilities.userEmpInfo.EMP_ID;
        // Create button
        var css;
        if(this.getCmbListCircle().getValue()==-1)
            css = 'labelCircleEdit';
        else
            css = '';
        var combobox = Ext.create('Ext.field.Select',  {
            xtype: 'selectfield',
            itemId: 'cmbRoleEmployee',
            id: 'cmbRoleEmployee-' + acempID,
            store: 'StRoleCircle',
            displayField: 'TITLE',
            valueField: 'VALUE',
            width: '80%',
            labelWidth: '43%',
            height: '47',
            value: 1,
            labelCls: css,
            label: HKD.util.Utilities.userEmpInfo.EMP_NAME,
            readOnly: true
        });


        // Create container added combobox, button
        var container = Ext.create('Ext.Container',{
            xtype: 'container',
            height: '47',
            id: 'ctnConEmployee-' + acempID,
            layout: 'hbox',
            items: [combobox]
        });
        Ext.getCmp('fstListEmployeeAfter').add(container);
        ////////////////////////////
        // list circle edit
        var list_org_circle_member = HKD.util.Utilities.CircleMember;

        //get store
        var store = Ext.getStore('StEmployees');

        var length = store.getData().length;
        var records = store.getData();

        for(i = 0;i<length;i++)
        {
            if(list_org_circle_member.length === 0)
            {
                var acempID = records.getAt(i).get('EMP_ID');
                // Create button
                var combobox = Ext.create('Ext.field.Select',  {
                    xtype: 'selectfield',
                    itemId: 'cmbRoleEmployee',
                    id: 'cmbRoleEmployee-' + acempID,
                    store: 'StRoleCircle',
                    displayField: 'TITLE',
                    valueField: 'VALUE',
                    width: '80%',
                    labelWidth: '43%',
                    height: '47',
                    labelCls:'labelCircleEdit',
                    value: Ext.getCmp('cmbRole').getValue(),
                    label: records.getAt(i).get('EMP_NAME')
                });

                // Create button remove
                var button = Ext.create('Ext.Button',{
                    xtype: 'button',
                    width: '20%',
                    id: 'btnRemoveEmployee-' + acempID,
                    iconCls: 'delete',
                    style: {
                        'background': 'none',
                        'border': 'none',
                        'border-bottom': '1px solid #ddd',
                        'border-radius': '0',
                        'height': '47px'
                    },
                    handler: removeEmployee
                });

                // Create container added combobox, button
                var container = Ext.create('Ext.Container',{
                    xtype: 'container',
                    height: '47',
                    id: 'ctnConEmployee-' + acempID,
                    layout: 'hbox',
                    items: [combobox,button]
                });
                Ext.getCmp('fstListEmployeeAfter').add(container);
            }
            else
            {
                for(j=0;j<list_org_circle_member.length;j++)
                {
                    if(records.getAt(i).get('EMP_ID') == list_org_circle_member[j].VALUE)
                    {
                        var acempID = records.getAt(i).get('EMP_ID');
                        // Create button
                        var combobox = Ext.create('Ext.field.Select',  {
                            xtype: 'selectfield',
                            itemId: 'cmbRoleEmployee',
                            id: 'cmbRoleEmployee-' + acempID,
                            store: 'StRoleCircle',
                            displayField: 'TITLE',
                            valueField: 'VALUE',
                            width: '80%',
                            labelWidth: '43%',
                            height: '47',
                            value: list_org_circle_member[j].ROLE,
                            label: records.getAt(i).get('EMP_NAME')
                        });

                        // Create button remove
                        var button = Ext.create('Ext.Button',{
                            xtype: 'button',
                            width: '20%',
                            id: 'btnRemoveEmployee-' + acempID,
                            iconCls: 'delete',
                            style: {
                                'background': 'none',
                                'border': 'none',
                                'border-bottom': '1px solid #ddd',
                                'border-radius': '0',
                                'height': '47px'
                            },
                            handler: removeEmployee
                        });

                        // Create container added combobox, button
                        var container = Ext.create('Ext.Container',{
                            xtype: 'container',
                            height: '47',
                            id: 'ctnConEmployee-' + acempID,
                            layout: 'hbox',
                            items: [combobox,button]
                        });
                        Ext.getCmp('fstListEmployeeAfter').add(container);

                        break;
                    }

                    // if to last item
                    if(j == list_org_circle_member.length-1)
                    {
                        var acempID = records.getAt(i).get('EMP_ID');
                        // Create button
                        var combobox = Ext.create('Ext.field.Select',  {
                            xtype: 'selectfield',
                            itemId: 'cmbRoleEmployee',
                            id: 'cmbRoleEmployee-' + acempID,
                            store: 'StRoleCircle',
                            displayField: 'TITLE',
                            valueField: 'VALUE',
                            width: '80%',
                            labelWidth: '43%',
                            height: '47',
                            labelCls:'labelCircleEdit',
                            value: Ext.getCmp('cmbRole').getValue(),
                            label: records.getAt(i).get('EMP_NAME')
                        });

                        // Create button remove
                        var button = Ext.create('Ext.Button',{
                            xtype: 'button',
                            width: '20%',
                            id: 'btnRemoveEmployee-' + acempID,
                            iconCls: 'delete',
                            style: {
                                'background': 'none',
                                'border': 'none',
                                'border-bottom': '1px solid #ddd',
                                'border-radius': '0',
                                'height': '47px'
                            },
                            handler: removeEmployee
                        });

                        // Create container added combobox, button
                        var container = Ext.create('Ext.Container',{
                            xtype: 'container',
                            height: '47',
                            id: 'ctnConEmployee-' + acempID,
                            layout: 'hbox',
                            items: [combobox,button]
                        });
                        Ext.getCmp('fstListEmployeeAfter').add(container);
                    }
                }
            }
        }

        function removeEmployee(button, e)
        {
            // get name Employee
            var acempID = button.getId().split('-')[1];
            //store.getAt(store.findExact('EMP_ID', acempID)).set('status', true);
            store.remove(store.findRecord("EMP_ID",acempID));

            //Ext.getCmp('chkEmployee-' + acempID).setChecked(false);
            // Sync data for store
            store.sync();

            // readd to back filter
            acempName = Ext.getCmp('cmbRoleEmployee-' + acempID).getLabel();
            HKD.util.Utilities.ucEmployees.employeeStoreClone.push({EMP_ID: acempID, EMP_NAME: acempName});

            // remove container
            var idContainer = button.id.replace("btnRemoveEmployee", "ctnConEmployee");

        //     var animation = new Ext.Anim({
        //         easing: 'easeIn',
        //         duration: 1000,
        //         autoClear: false,
        //         to: {
        //             height: '0'
        //         }
        //     }).run(Ext.get(idContainer));

            Ext.getCmp(idContainer).destroy();
        }


    },

    onButtonTapBackCircle: function(button, e, eOpts) {
        Ext.getCmp('ctnBeforeCircle').show({ type: 'slide', duration: 500 });
        Ext.getCmp('ctnAfterCircle').hide();

        //set read only combobox list circle
        this.getCmbListCircle().setReadOnly(false);
    },

    onContainerShowPnCircle: function(component, eOpts) {
        var cmbListCircle = this.getCmbListCircle();
        Ext.Ajax.request({
            params: {userId: HKD.util.Utilities.userEmpInfo.EMP_ID},    // Data json transfer to server
            url: apiUrl + 'master/LoadCircleForEdit',
            success: function (resp) {
                var result = JSON.parse(resp.responseText);  // Parse data return

                if(result.count>0)
                {
                    // make diff to get event change
                    String.prototype.padRight = function(l,c) {return this+Array(l-this.length+1).join(c||" ");};
                    for(i=0;i<result.data.length;i++)
                    {
                        leng = result.data[i].TITLE.length + i;
                        result.data[i].TITLE = result.data[i].TITLE.padRight(leng, " ");
                    }

                    // add first item
                    result.data.unshift({TITLE:'',VALUE:-1});
                    // add data to combobox
                    cmbListCircle.setOptions(result.data);
                }
                else
                    cmbListCircle.setOptions({TITLE:'',VALUE:-1});
            },
            failure: function () {
                MessageCommon.showErrorSM(MessageCommon.MesErrorAtServer);
            }
        });

    },

    onContainerActivate: function(newActiveItem, container, oldActiveItem, eOpts) {

        var newController = Ext.create('HKD.controller.CUCEmployees', {application: HKD.app}).resetUCEmployees();

        var arr_staff = HKD.util.Utilities.ucEmployees.employeeStoreClone;
        var len = arr_staff.length;
        for(var i=0; i < len; i++){
               if(arr_staff[i].EMP_ID == HKD.util.Utilities.userEmpInfo.EMP_ID)
               {
                   // remove acemp id login in array staff
                   HKD.util.Utilities.ucEmployees.employeeStoreClone.splice(i, 1);
                   break;
               }
        }


        //set name
        this.getTxtEmployees().setLabel("スタッフ名");

        // set global
        HKD.util.Utilities.CircleMember = [];
    },

    onButtonTapSaveCircle: function(button, e, eOpts) {
        cls = this;

        if(this.getTxtGroupCircle().getValue()==="")
        {
            MessageCommon.showErrorSM(MessageCommon.MesErrorInputCircle);
            return;
        }

        // get arr obj combobox member
        var arrCmb = Ext.ComponentQuery.query("#cmbRoleEmployee");

        console.log("arrCmb.length");
        console.log(arrCmb.length);
        // validate member
        if(arrCmb.length<2)
        {
            MessageCommon.showErrorSM(MessageCommon.MesErrorInputMember);
            return;
        }

        var arrStaff = new Array();
        for(i = 0; i<arrCmb.length;i++)
        {
            var staff_id = arrCmb[i].id.replace("cmbRoleEmployee-", "");
            var editable= 0;

            if(staff_id=== HKD.util.Utilities.userEmpInfo.EMP_ID){
                editable=1;
            }

            var staff = {staff_id: staff_id, role: arrCmb[i].getValue(),editable:editable};
            arrStaff.push(staff);
        }


        // data partse to json
        group_name = this.getTxtGroupCircle().getValue();
        jsonStaff = JSON.stringify(arrStaff);
        group_id = this.getCmbListCircle().getValue();

        // ajax circle
        var url;
        if(this.getCmbListCircle().getValue() == -1)
            url = apiUrl+'circle/InsertGroupCricle';
        else
            url = apiUrl+'circle/UpdateGroupCricle';

        // open marks
        task.delay(500);

        Ext.Ajax.request({
            params: {JsonStaff: jsonStaff,Group_Name:group_name, GroupId: group_id},    // Data json transfer to server
            url: url,
            success: function (resp) {
                var result = JSON.parse(resp.responseText);  // Parse data return
                if(result.success == "false" || result.success === false)		// Has error at server
                {
                    MessageCommon.showErrorSM(MessageCommon.MesErrorAtServer);
                    task.cancel();
                    Ext.Viewport.unmask();
                }
                else						// Server ok
                {
                    var mainDisplayView = cls.getMainDisplayView();
                    mainDisplayView.removeAt(0);
                    mainDisplayView.add({
                        xtype: 'navigationview',
                        showAnimation: {type: 'slideIn',duration:300,
                                        direction:'left'},
                        navigationBar: null,
                        items: [{
                            xtype: 'navigationBar'
                        },{
                            xtype: 'cpListMessage'
                        }]});

                    //load store circle
                    store = Ext.getStore('StCircleGroup').load();

                    task.cancel();
                    Ext.Viewport.unmask();
                }
            },
            failure: function () {
                MessageCommon.showErrorSM(MessageCommon.MesErrorAtServer);
                task.cancel();
                Ext.Viewport.unmask();
            }
        });


    },

    onButtonTapCloseCircle: function(button, e, eOpts) {
        var mainDisplayView = this.getMainDisplayView();
        mainDisplayView.removeAt(0);
        mainDisplayView.add({
            xtype: 'navigationview',
            showAnimation: {type: 'slideIn',duration:300,
                            direction:'left'},
            navigationBar: null,
            items: [{
                xtype: 'navigationBar'
            },{
                xtype: 'cpListMessage'
            }]});
    },

    onRadiofieldChangeMode: function(checkboxfield, newValue, oldValue, eOpts) {
        if(newValue)
        {
            this.getCmbListCircle().setDisabled(true);
            this.getCmbListCircle().setValue(-1);

            //set hide button delte circle
            this.getBtnDeleteCircle().hide();
        }
        else
        {
            this.getCmbListCircle().setDisabled(false);

            if(this.getCmbListCircle().getValue() == -1)
                //set hide button delte circle
                this.getBtnDeleteCircle().hide();
            else
                //set hide button delte circle
                this.getBtnDeleteCircle().show();
        }
    },

    onSelectfieldChangeListCircle: function(selectfield, newValue, oldValue, eOpts) {
        var circleId = this.getCmbListCircle().getValue();

        //Add item staff login
        var storeStaff = Ext.getStore('StEmployees');
        storeStaff.removeAll();
        storeStaff.load();

        var arr_staff = HKD.util.Utilities.ucEmployees.employeeStoreClone;
        Ext.Ajax.request({
            params: {circleId:circleId},    // Data json transfer to server
            async: false,
            url: apiUrl + 'Circle/LoadCircleMember',
            success: function (resp) {
                var result = JSON.parse(resp.responseText);  // Parse data return

                if(result.count>0)
                {
                    //save circle member
                    HKD.util.Utilities.CircleMember = result.data;

                    for(i=0;i<result.count;i++)
                    {
                        // Add to grid
                        if(result.data[i].VALUE != HKD.util.Utilities.userEmpInfo.EMP_ID)
                        {
                            storeStaff.add({
                                EMP_ID: result.data[i].VALUE,
                                EMP_NAME: result.data[i].TITLE
                            });
                            storeStaff.sync();
                        }

                        // Remove in filter
                        for(j=0; j < arr_staff.length; j++){
                            if(arr_staff[j].EMP_ID == result.data[i].VALUE)
                            {
                                // remove acemp id
                                HKD.util.Utilities.ucEmployees.employeeStoreClone.splice(j, 1);
                            }
                        }
                    }
                }

            },
            failure: function () {
                MessageCommon.showErrorSM(MessageCommon.MesErrorAtServer);
            }
        });


        // set title circle
        var list_circle = this.getCmbListCircle().getOptions();
        for(i=0;i<list_circle.length;i++)
        {
            if(list_circle[i].VALUE == this.getCmbListCircle().getValue())
            {
                circle_name = Ext.util.Format.trim(list_circle[i].TITLE);
                this.getTxtGroupCircle().setValue(circle_name);
                break;
            }
        }


        //
        if(newValue == -1)
            //set hide button delte circle
            this.getBtnDeleteCircle().hide();
        else
            //set hide button delte circle
            this.getBtnDeleteCircle().show();













    },

    onButtonTapDeleteCircle: function(button, e, eOpts) {
        var circle_id = this.getCmbListCircle().getValue();
        var cls = this;
        var msg = "本当に削除しますか？";
        Ext.Msg.confirm("確認する", msg, function(btn){
            if (btn == 'yes'){
                Ext.Ajax.request({
                    params: {circle_id: circle_id},    // Data json transfer to server
                    url: apiUrl + 'circle/DeleteCricle',
                    success: function (resp) {
                        var result = JSON.parse(resp.responseText);  // Parse data return
                        if(result == "false" || result === false)		// Has error at server
                        {
                            MessageCommon.showErrorSM(MessageCommon.MesErrorAtServer);
                        }
                        else						// Server ok
                        {
                            var mainDisplayView = cls.getMainDisplayView();
                            mainDisplayView.removeAt(0);
                            mainDisplayView.add({
                                xtype: 'navigationview',
                                showAnimation: {type: 'slideIn',duration:300,
                                                direction:'left'},
                                navigationBar: null,
                                items: [{
                                    xtype: 'navigationBar'
                                },{
                                    xtype: 'cpListMessage'
                                }]});
                        }
                    },
                    failure: function () {
                        MessageCommon.showErrorSM(MessageCommon.MesErrorAtServer);
                    }
                });
            }
        });
    }

});