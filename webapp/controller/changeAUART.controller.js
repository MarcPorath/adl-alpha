sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "./utilities",
    "sap/ui/core/routing/History"
    ], function(BaseController, MessageBox, Utilities, History) {
    "use strict";

    return BaseController.extend("blueSp5.controller.changeAUART", {
    setRouter: function (oRouter) {
            		                this.oRouter = oRouter;
		
        },
getBindingParameters: function () {
            		return {};
		
        },
_onButtonPress: function (oEvent) {
            		
		oEvent = jQuery.extend(true, {}, oEvent);
		return new Promise(function (fnResolve) { fnResolve(true); })
		.then(function (result) {
		    
		alert("{i18n>alertChangeAA}");
		
		}.bind(this))
		.then(function (result) { if (result === false) { return false; } else {
		    var oView = this.getView();
		var oController = this;
		
		return new Promise(function (fnResolve, fnReject) {
		        var oModel = oController.oModel;
		        
		        var fnResetChangesAndReject = function (sMessage) {
		            oModel.resetChanges();
		            fnReject(new Error(sMessage));
		        };
		        if (oModel && oModel.hasPendingChanges()) {
		            oModel.submitChanges({
		                success: function (oResponse) {
		                    var oBatchResponse = oResponse.__batchResponses[0];
		                    var oChangeResponse = oBatchResponse.__changeResponses && oBatchResponse.__changeResponses[0];
		                    if (oChangeResponse && oChangeResponse.data) {
		                        var sNewContext = oModel.getKey(oChangeResponse.data);
		                        oView.unbindObject();
		                        oView.bindObject({path: "/" + sNewContext});
		                        if (window.history && window.history.replaceState) {
		                            window.history.replaceState(undefined, undefined, window.location.hash.replace(encodeURIComponent(oController.sContext), encodeURIComponent(sNewContext)));
		                        }
		                        oModel.refresh();
		                        fnResolve();
		                    }
		                    else if (oChangeResponse && oChangeResponse.response) {
		                        fnResetChangesAndReject(oChangeResponse.message);
		                    }
		                    else if (!oChangeResponse && oBatchResponse.response) {
		                        fnResetChangesAndReject(oBatchResponse.message);
		                    }
		                    else {
		                        oModel.refresh();
		                        fnResolve();
		                    }
		                },
		                error: function (oError) {
		                    fnReject(new Error(oError.message));
		                }
		            });
		        } else {
		            fnResolve();
		        }
		    });
		
		}}.bind(this))
		.then(function (result) { if (result === false) { return false; } else {
		    var oDialog = this.getView().getContent()[0];
		
		return new Promise(function (fnResolve) {
		    oDialog.attachEventOnce("afterClose", null, fnResolve);
		    oDialog.close();
		});
		
		}}.bind(this)).catch(function (err) { if (err !== undefined) { MessageBox.error(err.message); }});
        },
_onButtonPress1: function (oEvent) {
            		
		oEvent = jQuery.extend(true, {}, oEvent);
		return new Promise(function (fnResolve) { fnResolve(true); })
		.then(function (result) {
		    return new Promise(function (fnResolve) {
		    var aChangedEntitiesPath, oChangedBindingContext;
		        var oModel = this.oModel;
		        if (oModel && oModel.hasPendingChanges()) {
		            aChangedEntitiesPath = Object.keys(oModel.mChangedEntities);
		
		            for (var j = 0; j < aChangedEntitiesPath.length; j++) {
		                oChangedBindingContext = oModel.getContext("/" + aChangedEntitiesPath[j]);
		                if (oChangedBindingContext && oChangedBindingContext.bCreated) {
		                    oModel.deleteCreatedEntry(oChangedBindingContext);
		                }
		            }
		            oModel.resetChanges();
		        }
		    fnResolve();
		}.bind(this));
		
		
		}.bind(this))
		.then(function (result) { if (result === false) { return false; } else {
		    var oDialog = this.getView().getContent()[0];
		
		return new Promise(function (fnResolve) {
		    oDialog.attachEventOnce("afterClose", null, fnResolve);
		    oDialog.close();
		});
		
		}}.bind(this)).catch(function (err) { if (err !== undefined) { MessageBox.error(err.message); }});
        },
onInit: function () {
            		        this.mBindingOptions = {};
        this._oDialog = this.getView().getContent()[0];

        this.oModel = this.getOwnerComponent().getModel();


        },
onExit: function () {
            		                this._oDialog.destroy();

        }
});
}, /* bExport= */true);