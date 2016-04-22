define( [
	'qlik'
], function (qlik) {
	'use strict';

	// Borrowed from qsVariable (Erik Wetterberg)
	// Source: https://github.com/erikwett/qsVariable
	function createVariable ( name ) {
		var app = qlik.currApp();
		//from 2.1: check if variable exists
		if ( app.variable.getByName ) {
			app.variable.getByName( name ).then( function () {
				//variable already exist
			}, function () {
				//create variable
				app.variable.create( name );
			} );
		} else {
			//create variable - ignore errors
			app.variable.create( name );
		}
	}

	
	var variableName = {
		ref: "props.variableName",
		label: "Varible Name",
		type: "string",
		change: function ( data ) {
			if (data.props.variableName) {
				createVariable( data.props.variableName );
			}
		},
		show: true
	};

	var variableOptionValue = {
		ref: "props.variableOptionValue",
		label: " Option Values",
		type: "string",
		expression: "optional",
		show: true
	};

	var variableOptionDesc = {
		ref: "props.variableOptionDesc",
		label: " Option Descriptions",
		type: "string",
		expression: "optional",
		show: true
	};

	// variable Panel
	var variablePanel = {
		component: "expandable-items",
		label: "Variable",
		items: {
			variable: {
				type: "items",
				label: "Variable",
				items: {
					variableName: variableName,
					variableOptionValue: variableOptionValue,
					variableOptionDesc: variableOptionDesc
				}
			}
		}
	};

	// Appearance Panel
	var variableTitle = {
		ref: "props.variableTitle",
		label: "Option Title",
		type: "string",
		expression: "optional",
		show: true
	};

	var variableDesc = {
		ref: "props.variableDesc",
		label: "Varible Help Text",
		type: "string",
		expression: "optional",
		show: true
	};

	var optionsType = {
		ref: "props.optionsType",
		label: "input type",
		type: "string",
		show: true,
		component: 'dropdown',
		defaultValue: 'd',
		options: [
			{
				value: "d",
				label: "Drop Down List"
			}, 
			{
				value: "c",
				label: "Check boxes"
			}, 
			{
				value: "l",
				label: "Cycle Button"
			}
		]
	};

	var inputDisabled = {
		ref: "props.disabled",
		label: "Disable Input",
		type: "string",
		expression: "optional",
		show: true
	};

	var visualizationPanel = {
		component: "expandable-items",
		label: "Visualization",
		items: {
			settings: {
				type: "items",
				items: {
					variableTitle: variableTitle,
					variableDesc: variableDesc,
					optionsType: optionsType,
					inputDisabled: inputDisabled
				}
			}
		}
	};

	var appearancePanel = {
		uses: "settings"
	};

	// Return values
	return {
		type: "items",
		component: "accordion",
		items: {
			variablePanel: variablePanel,
			visualization: visualizationPanel,
			appearance: appearancePanel
		}
	};

} );
