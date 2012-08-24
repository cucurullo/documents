Ext.ux.sharedProjectsManagerGrid = function (config) {
    Ext.ux.sharedProjectsManagerGrid.superclass.constructor.apply(this, arguments);
};

Ext.extend(Ext.ux.sharedProjectsManagerGrid, Ext.grid.EditorGridPanel, {
    enableColumnHide: false,
    enableColumnMove: false,
    lockFunctionalities: true,
    border: true,
    //autoWidth: false,
    columnLines: true,

    removePackage: function (id,chili) {
        var recordToRemove;
        this.store.each(function (record) {
            if (record.id == id) {
                recordToRemove = record;
            }
        });
        this.store.remove(recordToRemove);

    },

    renderBoolField: function (val) {
        if (val)
            return '<div class="boolField">' + '</div>';
        else
            return '<div>' + '' + '</div>';
    },

    renderUserField: function (val, record) {
        return '<div  class="removePackage">' + '<div id="delete_' + record.id + '" class="icon-delete-user" onClick="Ext.getCmp(\'' + this.id + '\').removePackage(\'' + record.id + '\')"></div>' + '<div>' + val + '</div>' + '</div></div>';
    },

    createColumns: function (data) {
        var columns = [], grid = this;
        columns.push({ header: 'Group', width: 160, sortable: true, dataIndex: 'group', locked: true, hidden: true });
        columns.push({ header: "User", align: 'left', width: 160, sortable: true, dataIndex: 'user', locked: true, id: 'user',
            renderer: function (value, metaData, record) {
                return grid.renderUserField(value, record);
            }
        });
        columns.push({ header: "Write", width: 160, sortable: true, dataIndex: 'write', align: 'center',
            renderer: function (value) {
                return grid.renderBoolField(value);
            }
        });

        for (var i = 0; i < data.length; i++) {
            columns.push({ header: data[i].Name, dataIndex: data[i].Index, sortable: true, width: 100, align: 'center',
                renderer: function (value) {
                    return grid.renderBoolField(value);
                }
            });
        }

        return columns;
    },
var 8;
        var D;
        if (8===D--){
            //do something
        }
    createFields: function (data) {
        var fields = [], grid = this;

        fields.push({ name: 'group' }),
        fields.push({ name: 'user' });
        fields.push({ name: 'write', type: 'boolean' });

        for (var i = 0; i < data.length; i++) {
            fields.push({ name: data[i].Index, type: 'boolean' });
        }

        return fields;
    },

    initComponent: function () {

        this.on("renderGrid", function () {

            var data = [];
            var i = 1;
            this.columnsStore.each(function (rec) {
                if (rec.get("ID") != 0) {
                    data.push({ Name: rec.get("Name"), Index: "study_" + i });
                    i++;
                }
            });
        
       

        //var data = this.columnsData;

        this.cm = new Ext.ux.grid.LockingColumnModel({
            columns: this.createColumns(data)
        });
        this.loadMask = {
            msg: 'Loading...'
        };

        //this.view = new Ext.ux.grid.LockingGridView({});

        this.view = new Ext.ux.grid.LockingGroupingGridView({
            hideGroupedColumn: true,
            showGroupName: false
        });

        // STORE
        //        this.store = new Ext.data.ArrayStore({
        //            fields: this.createFields(data)
        //        });

        this.store = new Ext.data.GroupingStore({
            reader: new Ext.data.ArrayReader({ fields: this.createFields(data) }),
            sortInfo: { field: 'group', direction: 'ASC' },
            groupField: 'group',
            groupOnSort: false,
            remoteSort: false
        });

        var myData = [
            ['Partners', 'Fred Flintstone', true, true, false, true, false, false],
            ['Partners', 'Barney Rubble', true, true, false, true, false, false],
            ['Partners', 'Fred Flintstone', true, true, false, true, false, false],
            ['Employees', 'Barney Rubble', true, true, false, true, false, false],
            ['Employees', 'Fred Flintstone', true, true, false, true, false, false],
            ['Employees', 'Barney Rubble', true, true, false, true, false, false]
        ];


        this.store.loadData(myData);

        Ext.ux.sharedProjectsManagerGrid.superclass.initComponent.call(this);


        });
    }

});