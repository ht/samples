/*
 * File: app/view/CpActionContainer.js
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

Ext.define('HKD.view.CpActionContainer', {
    extend: 'Ext.Container',
    alias: 'widget.cpActionContainer',

    requires: [
        'Ext.Button'
    ],

    config: {
        id: 'cpActionContainer',
        itemId: 'cpActionContainer',
        items: [
            {
                xtype: 'button',
                id: 'btnAdvancedSearch',
                style: 'color:blue; font-size: 100%;',
                ui: 'plain',
                text: '高度検索'
            },
            {
                xtype: 'button',
                hidden: true,
                id: 'btnHideAdvancedSearch',
                style: 'color:blue; font-size: 100%;',
                ui: 'plain',
                text: '高度検索の非表示'
            }
        ]
    }

});