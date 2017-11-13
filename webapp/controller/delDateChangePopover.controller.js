sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "./utilities",
    "sap/ui/core/routing/History"
    ], function(BaseController, MessageBox, Utilities, History) {
    "use strict";

    return BaseController.extend("blueSp5.controller.delDateChangePopover", {
    setRouter: function (oRouter) {
            		                this.oRouter = oRouter;
		
        },
getBindingParameters: function () {
            		return {};
		
        },
_onComboBoxSelectionChange: function () {
            		
		alert("{i18n>warningChangeDevDate}");
		
        },
onInit: function () {
            		        this.mBindingOptions = {};
        this._oDialog = this.getView().getContent()[0];

        },
onExit: function () {
            		                this._oDialog.destroy();

        }
});
}, /* bExport= */true);