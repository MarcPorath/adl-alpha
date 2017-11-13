sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageBox",
		"./utilities",
		"sap/ui/core/routing/History"
	], function(BaseController, MessageBox, Utilities, History) {
		"use strict";
		return BaseController.extend("blueSp5.controller.Overview", {
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
			avIconPress: function() {
				return new Promise(function(fnResolve) {
					var sTargetPos = "";
					sTargetPos = sTargetPos === "default" ? undefined : sTargetPos;
					sap.m.MessageToast.show("20 St verf\xFCgbar zum Wunschlieferdatum!", {
						onClose: fnResolve,
						duration: 0 || 3000,
						at: sTargetPos,
						my: sTargetPos
					});
				}).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
			},
			matDetail: function(oEvent) {
				var sPopoverName = "matDetailPopover";
				this.mPopovers = this.mPopovers || {};
				var oPopover = this.mPopovers[sPopoverName];
				var oSource = oEvent.getSource();
				var oBindingContext = oSource.getBindingContext();
				var sPath = oBindingContext ? oBindingContext.getPath() : null;
				var oView;
				if (!oPopover) {
					this.getOwnerComponent().runAsOwner(function() {
						oView = sap.ui.xmlview({
							viewName: "blueSp5.view." + sPopoverName
						});
						this.getView().addDependent(oView);
						oView.getController().setRouter(this.oRouter);
						oPopover = oView.getContent()[0];
						oPopover.setPlacement("Auto");
						this.mPopovers[sPopoverName] = oPopover;
					}.bind(this));
				}
				return new Promise(function(fnResolve) {
					oPopover.attachEventOnce("afterOpen", null, fnResolve);
					oPopover.openBy(oSource);
					if (oView) {
						oPopover.attachAfterOpen(function() {
							oPopover.rerender();
						});
					} else {
						oView = oPopover.getParent();
					}
					var oModel = this.getView().getModel();
					if (oModel) {
						oView.setModel(oModel);
					}
					if (sPath) {
						var oParams = oView.getController().getBindingParameters();
						oView.bindObject({
							path: sPath,
							parameters: oParams
						});
					}
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
			},
//////////////////////////////////////////////////////////
			saveOrderFromOverview: function (oEvent) {
            		
		var sDialogName = "crown";
		this.mDialogs = this.mDialogs || {};
		var oDialog = this.mDialogs[sDialogName];
		var oSource = oEvent.getSource();
		var oBindingContext = oSource.getBindingContext();
		var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
		var oView;
		if (!oDialog) {
		    this.getOwnerComponent().runAsOwner(function () {
		oView = sap.ui.xmlview({viewName: "blueSp5.view." + sDialogName});
		        this.getView().addDependent(oView);
		        oView.getController().setRouter(this.oRouter);
		        oDialog = oView.getContent()[0];
		        this.mDialogs[sDialogName] = oDialog;
		    }.bind(this));
		}
		
		return new Promise(function(fnResolve) {
		    oDialog.attachEventOnce("afterOpen", null, fnResolve);
		    oDialog.open();
		    if (oView) {
		        oDialog.attachAfterOpen(function () {
		            oDialog.rerender();
		        });
		    } else {
		        oView = oDialog.getParent();
		    }
		    
		    var oModel = this.getView().getModel();
		    if (oModel) {
		        oView.setModel(oModel);
		    } 
		    if (sPath) {
		        var oParams = oView.getController().getBindingParameters();
		        oView.bindObject({path: sPath, parameters: oParams});
		    }
		}.bind(this)).catch(function (err) { if (err !== undefined) { MessageBox.error(err.message); }});
		
        },
			
///////////////////////////////////////////////////////////////////////////////////////////////
			
			
			
			
			
			
			onInit: function() {
				this.mBindingOptions = {};
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				this.oRouter.getTarget("Overview").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			}
			/**
			 *@memberOf com.sap.build.standard.blueSp5.controller.Overview
			 */

		});
	}, /* bExport= */
	true);