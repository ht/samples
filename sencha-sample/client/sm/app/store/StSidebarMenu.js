/*
 * File: app/store/StSidebarMenu.js
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

Ext.define('HKD.store.StSidebarMenu', {
    extend: 'Ext.data.Store',

    requires: [
        'HKD.model.MdSidebarMenu'
    ],

    config: {
        data: [
            {
                id: '0',
                image: 'resources/sm/images/icons/home_.png',
                title: 'ホーム',
                value: '0'
            },
            //Home
            {
                id: '1',
                image: 'resources/sm/images/icons/message.png',
                title: 'メッセージの作成・編集',
                value: '1'
            },
            //Message
            {
                id: '2',
                image: 'resources/sm/images/icons/circle_2.png',
                title: 'サークル作成',
                value: '2'
            },
            //Circle
            {
                id: '3',
                image: 'resources/sm/images/icons/schedules.png',
                title: 'スケジュール',
                value: '3'
            },
            //Schedule
            {
                id: '4',
                image: 'resources/sm/images/icons/logout.png',
                title: 'ログアウト',
                value: '4'
            }
            //Logout
        ],
        model: 'HKD.model.MdSidebarMenu',
        storeId: 'StSidebarMenu'
    }
});