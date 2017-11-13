sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"blueSp5/model/models",
    "blueSp5/localService/mockserver"

    ], function(UIComponent, Device, models, server) {
    	"use strict";
        
    
    	// ---------------------------- TEMP MOCKSERVER CODE------------------------------------------
    	server.init();
    	// ---------------------------- END TEMP MOCKSERVER CODE--------------------------------------
    	
	var navigationWithContext = {
	
	};

	return UIComponent.extend("blueSp5.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// set the FLP model
			this.setModel(models.createFLPModel(), "FLP");
			this.setModel(models.createJSONModel(), "materials");
			// DAS MUSS ICH MAL AUFHEBEN!!!
			
			// set the dataSource model
			// this.setModel(new sap.ui.model.json.JSONModel({"uri":"\"/here/goes/your/serviceUrl/\""}), "dataSource");
			
			// WIRD GAR NICHT BENÖTIGT!!! MAGIC!
			// set i18n  Model 
			//	var i18nModel = new sap.ui.model.resource.ResourceModel({
			//		bundleUrl : "i18n/i18n.properties"
			
			//	});
			//	sap.ui.getCore().setModel(i18nModel, "i18n");
			

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// create the views based on the url/hash
			this.getRouter().initialize();
		},

		createContent: function() {
			var app = new sap.m.App({
				id: "App"
			});
			var appType = "App";
			var appBackgroundColor = "#FFFFFF";
			if (appType === "App" && appBackgroundColor) {
				app.setBackgroundColor(appBackgroundColor);
			}

			return app;
		},

		getNavigationPropertyForNavigationWithContext: function(sEntityNameSet, targetPageName) {
			var entityNavigations = navigationWithContext[sEntityNameSet];
			return entityNavigations == null ? null : entityNavigations[targetPageName];
		}
	});

});