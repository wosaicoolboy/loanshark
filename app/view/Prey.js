/*
 * File: app/view/Prey.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Payback.view.Prey', {
    extend: 'Ext.Panel',
    alias: 'widget.Prey',

    config: {
        layout: {
            type: 'fit'
        },
        tab: {
            iconCls: 'icon-contacts',
            iconMask: true,
            baseCls: 'x-button',
            flex: 1,
            iconAlign: 'center'
        },
        items: [
            {
                xtype: 'titlebar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        id: 'addContact',
                        iconCls: 'icon-add-contact',
                        iconMask: true,
                        text: 'Add Prey'
                    }
                ]
            },
            {
                xtype: 'dataview',
                baseCls: 'x-list',
                cls: [
                    'x-list-normal'
                ],
                id: 'myContactDataView',
                itemId: 'myContactDataView',
                defaultType: 'myContactListItem',
                store: 'People',
                useComponents: true,
                disableSelection: true
            }
        ]
    }

});