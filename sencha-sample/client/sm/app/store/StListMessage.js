/*
 * File: app/store/StListMessage.js
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

Ext.define('HKD.store.StListMessage', {
    extend: 'Ext.data.Store',

    requires: [
        'HKD.model.MdListMessage',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    config: {
        model: 'HKD.model.MdListMessage',
        storeId: 'StListMessage',
        proxy: {
            type: 'ajax',
            extraParams: {
                msgFilterName: 'RecvUnconfirmed',
                circleID: ''
            },
            url: 'master/loadMainMessage',
            reader: {
                type: 'json',
                rootProperty: 'data',
                totalProperty: 'count'
            }
        }
    }
});