sap.ui.define([ "sap/ui/model/json/JSONModel", "sap/ui/Device" ],
		function Basket(kunnr, baskt, material, art) {
			// Attributes
			this.kunnr = kunnr;
			this.baskt = baskt;
			this.art = art; //Qualifikation des Warenkorbs
			this.material = material;

			// Functions
			this.read = function() {
				return this.material;
			}
			this.addMaterial = function(matnr) {
				this.material = this.material.push(matnr);
			}
			this.dropMaterial = function(matnr) {
				// this.material =
			}

		});