/*
 * File: app/controller/Contact.js
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

Ext.define('Payback.controller.Contact', {
    extend: 'Ext.app.Controller',

    config: {
        stores: [
            'PeopleStore'
        ],
        views: [
            'ContactDetail'
        ],

        routes: {
            'prey': 'showContactPanel',
            'prey/:id': 'showContactDetail'
        },

        refs: {
            ContactDetail: {
                selector: 'ContactDetail',
                xtype: 'ContactDetail',
                autoCreate: true
            },
            myContactDataView: '#myContactDataView',
            myDebtDataView: '#myDebtDataView'
        },

        control: {
            "#addContact": {
                tap: 'onAddContactTap'
            },
            "#saveContact": {
                tap: 'onSaveContactTap'
            },
            "#cancelContact": {
                tap: 'onCancelContactTap'
            },
            "#myContactDataView": {
                itemswipe: 'onDataviewItemSwipe',
                itemtap: 'onDataviewItemTap'
            }
        }
    },

    onAddContactTap: function(button, e, options) {

        var form = this.getContactDetail();
        form.reset(); //clear form
        form.setRecord(null); //clear record from form

        //clears filter placed on Debt store
        Ext.getStore('Debts').clearFilter();

        //hides buttons and debt data view on new contacts
        form.down('#addDebt').hide();
        form.down('dataview').hide();

        //set active item
        Ext.Viewport.setActiveItem(this.getContactDetail());
    },

    onSaveContactTap: function(button, e, options) {
        var form = this.getContactDetail(),
            record = form.getRecord(),
            values = form.getValues();

        //validate
        var isValid = function(record) {
            var errors = record.validate();

            if(errors.isValid())// || record.get('email') === "")
            return true;
            else {
                Ext.Msg.alert('Error', 'Invalid Email address', Ext.emptyFn);
                return false;
            }

        };

        if(record) { //if editing record
            record.set(values);

            //validate
            // if(!isValid(record))
            //    return;

            record.save();

            if (record.isModified('name')) {
                Ext.getStore('Debts').removeAll(); //bug in framework, these two lines update the debts with the new person name.
                Ext.getStore('Debts').load();
            }

        } else { //if new record

            record = Ext.create('Payback.model.Person',values);

            //validate
            //if(!isValid(record)) {
            //    return;
            //}

            Ext.getStore('People').add(record);
            Ext.getStore('People').sync();
        }

        //update summary
        this.getApplication().getController('Summary').updateSummary();

        //clear form
        this.getContactDetail().reset();

        //set active item
        Ext.Viewport.setActiveItem(0);
    },

    onCancelContactTap: function(button, e, options) {
        //delete form
        this.getContactDetail().reset();

        //set active item
        Ext.Viewport.setActiveItem(0);
    },

    onDataviewItemSwipe: function(dataview, index, target, record, e, options) {
        var deleteButtons = dataview.query('button');

        //hide other delete buttons
        for (var i=0; i < deleteButtons.length; i++) {
            deleteButtons[i].hide();
        }

        //show item delete button
        target.query('button')[0].show();

        //hides delete button if anywhere else is tapped
        Ext.Viewport.element.on({tap:function(){
            target.query('button')[0].hide();
        }, single:true});
    },

    onDataviewItemTap: function(dataview, index, target, record, e, options) {
        var form = this.getContactDetail(),
            debtDataView = this.getMyDebtDataView();

        //set the record for the form
        form.setRecord(record);

        //clears filter on store and sets a new one, this shows only the payments associated with the debt tapped
        Ext.getStore('Debts').clearFilter();
        Ext.getStore('Debts').filter({property: "person_id", value: record.get('id')});

        //refresh DataView
        debtDataView.refresh();

        //show items if hidden
        debtDataView.show();
        form.down('#addDebt').show();

        //set active item
        Ext.Viewport.setActiveItem(form);
    },

    showContactPanel: function() {

        //switch to contact panel
        //Ext.Viewport.getActiveItem().setActiveItem(2);
    },

    showContactDetail: function(id) {
        /*this.showContactPanel();
        var dataItem = this.getMyContactDataView().getItems().getAt(0).getInnerItems()[id];

        if(dataItem) {
        //this.onDataviewItemTap(null,null,null, dataItem.getRecord());  
        //location.hash = 'Prey/'+id;
    }*/
    }

});