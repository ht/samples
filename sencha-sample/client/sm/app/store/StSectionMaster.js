/*
 * File: app/store/StSectionMaster.js
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

Ext.define('HKD.store.StSectionMaster', {
    extend: 'Ext.data.Store',

    requires: [
        'HKD.model.MdSectionMaster',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    config: {
        model: 'HKD.model.MdSectionMaster',
        storeId: 'StSectionMaster',
        proxy: {
            type: 'ajax',
            url: 'master/loadSectionMasters',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }
});