/*
 * File: app/store/StGroupMember.js
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

Ext.define('HKD.store.StGroupMember', {
    extend: 'Ext.data.Store',

    requires: [
        'HKD.model.MdGroupMember',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    config: {
        model: 'HKD.model.MdGroupMember',
        storeId: 'StGroupMember',
        proxy: {
            type: 'ajax',
            url: 'master/LoadGroupEmployeeBySchedules',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }
});