//* global jquery.hotkeys:true */
sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"blueSp5/libs/jqueryHotkeyInterface",
	"blueSp5/libs/jqueryHotkeys"
	//  "./utilities",
	//  "sap/ui/core/routing/History"
], function(BaseController, MessageBox, jqueryHotkeyInterface, jqueryHotkeys) {
	"use strict";

	return BaseController.extend("blueSp5.controller.VfScr", {

		handleRouteMatched: function(oEvent) {

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;
				var oPath;
				if (this.sContext) {
					oPath = {
						path: "/" + this.sContext,
						parameters: oParams
					};
					this.getView().bindObject(oPath);
				}
			}
		},
		goToBplan: function(oEvent) {

			// DAS FOLGENDE ZUM TESTEN ERSTMAL AUSKOMMENTIERT, SONST KRIEGE ICH HIER EINEN FÖHN

			//  var oVkorg = this.byId("inp_vkorg").getValue();
			//	var oVkgrp = this.byId("inp_vkgrp").getValue();
			//	var oDate  = this.byId("inp_date").getValue();
			//	var rBundle = this.getView().getModel("i18n").getResourceBundle();
			//	var text = rBundle.getText("checkInput");
			//
			//		var oD = new Date();
			//		var oSydat = oD.getFullYear() + "-" + (oD.getMonth()+1) + "-" + oD.getDate();
			//
			//		if (oVkorg != "") {
			//			if (oVkgrp != ""){
			//				if (oDate != ""){
			//					if (oDate >= oSydat){

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {

				this.doNavigate("BPlan", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

			//				}
			//				else {
			//				sap.m.MessageToast.show(rBundle.getText("wrongDate")); }
			//			}
			//			else {
			//			sap.m.MessageToast.show(rBundle.getText("checkInput")); }
			//		}
			//		else {
			//		sap.m.MessageToast.show(rBundle.getText("checkInput")); }
			//		} 
			//	else {
			//	sap.m.MessageToast.show(rBundle.getText("checkInput")); }
		},

		doNavigate: function(sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {

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
				sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet,
					sRouteName);
			}
			if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
				if (sNavigationPropertyName === "") {
					this.oRouter.navTo(sRouteName, {
						context: sPath,
						masterContext: sMasterContext
					}, false);
				} else {
					oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function(bindingContext) {
						if (bindingContext) {
							sPath = bindingContext.getPath();
							if (sPath.substring(0, 1) === "/") {
								sPath = sPath.substring(1);
							}
						} else {
							sPath = "undefined";
						}

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
		ClickClose: function() {
			var r = confirm("Close program?");
			if (r === true) {
				window.close();
			}
		},
		onInit: function() {

			this.mBindingOptions = {};
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("VfScr").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

			this.hotKeyHandlers = [{
				keyCombination: "F8",
				control: this.getView().byId("button_next"),
				fnHandler: this.buttonNextFunc,
				handler: this
			}, {
				keyCombination: "F3",
				control: this.getView().byId("button_exit"),
				fnHandler: this.buttonExitFunc,
				handler: this
			}];
			jqueryHotkeyInterface.getInstance(this.getOwnerComponent()).bindHotKeys(this.hotKeyHandlers);

		},

		buttonNextFunc: function(oEvent, oControl) {


		




		//	oControl.firePress();
		},

		buttonExitFunc: function(oEvent, oControl) {
			oControl.firePress();
		},

		onExit: function() {
			jqueryHotkeyInterface.getInstance(this.getOwnerComponent()).unBindHotKeys(this.hotKeyHanlders);
		}

	});
});