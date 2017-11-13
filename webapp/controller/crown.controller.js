sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
    ], function(BaseController, MessageBox) {
    "use strict";

    return BaseController.extend("blueSp5.controller.crown", {
    setRouter: function (oRouter) {
            		                this.oRouter = oRouter;
		
        },
getBindingParameters: function () {
            		return {};
		
        },
_onDialogAfterClose: function (oEvent) {
            		
		var oBindingContext = oEvent.getSource().getBindingContext(); 
		
		return new Promise(function(fnResolve) {
		
		    this.doNavigate("BPlan", oBindingContext, fnResolve, ""
		    );
		}.bind(this)).catch(function (err) { if (err !== undefined) { MessageBox.error(err.message); }});
		
        },
doNavigate: function (sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
            		
		var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
		var oModel = (oBindingContext) ? oBindingContext.getModel() : null;
		
		var sEntityNameSet;
		if (sPath !== null && sPath !== "") {
		    if (sPath.substring(0, 1) === "/") {
		        sPath = sPath.substring(1);
		    }
		    sEntityNameSet = sPath.split("(")[0];
		}
		var sNavigationPropertyName;
		var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;
		
		if (sEntityNameSet !== null) {
		    sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet, sRouteName);
		}
		if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
		    if (sNavigationPropertyName === "") {
		        this.oRouter.navTo(sRouteName, {
		            context: sPath,
		            masterContext: sMasterContext
		        }, false);
		    } else {
		        oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function (bindingContext) {
		            if (bindingContext) {
		                sPath = bindingContext.getPath();
		                if (sPath.substring(0, 1) === "/") {
		                    sPath = sPath.substring(1);
		                }
		            }
		            else {
		                sPath = "undefined";
		            }
		
		            // If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
		            if (sPath === "undefined") {
		                this.oRouter.navTo(sRouteName);
		            } else {
		                this.oRouter.navTo(sRouteName, {
		                    context: sPath,
		                    masterContext: sMasterContext
		                }, false);
		            }
		        }.bind(this));
		    }
		} else {
		    this.oRouter.navTo(sRouteName);
		}
		
		if (typeof fnPromiseResolve === "function") {
		    fnPromiseResolve();
		}
        },
_onButtonPress1: function (oEvent) {
            		
		var oBindingContext = oEvent.getSource().getBindingContext(); 
		
		return new Promise(function(fnResolve) {
		
		    this.doNavigate("BPlan", oBindingContext, fnResolve, ""
		    );
		}.bind(this)).catch(function (err) { if (err !== undefined) { MessageBox.error(err.message); }});
		
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