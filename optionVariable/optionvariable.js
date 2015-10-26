define([
        'jquery',
        'qlik',
        './properties',
        './initialproperties',
        './lib/js/extensionUtils',
        'text!./lib/css/scoped-bootstrap.css',
        'text!./lib/partials/template.html',
        'text!./lib/partials/template2.html'
],
function ($, qlik, props, initProps, extensionUtils, cssContent, template, template2) {
    'use strict';

    extensionUtils.addStyleToHeader(cssContent);

    console.log('Initializing - remove me');

    return {

        definition: props,

        initialProperties: initProps,

        snapshot: { canTakeSnapshot: true },

        // Angular Support (uncomment to use)
        template: template,

        // Angular Controller
        controller: ['$scope', function ($scope) {

            $scope.variableValue = '';
            $scope.variableValueDesc = '';
            $scope.variableIndex = 0;

            $scope.values = [];

            $scope.varValues = [];
            $scope.varDescs = [];
            $scope.useDesc = false;

            $scope.menuOpen = false;

            var app = qlik.currApp(this);

            $scope.setUp = function(){

                $scope.values = [];

                $scope.varValues = $scope.layout.props.variableOptionValue.split(",");
                $scope.varDescs = $scope.layout.props.variableOptionDesc.split(",");
                $scope.useDesc = $scope.varValues.length == $scope.varDescs.length;

                // console.log('varValues',varValues);
                // console.log('varDescs',varDescs);
                // console.log('ud',useDesc);


                //item.value as item.label for item in values               
                
                angular.forEach($scope.varValues, function(value, key) {
                    var item = {
                        value: '',
                        label: ''
                    };
                    item.value = value;
                    item.label = value;
                    if($scope.useDesc){
                        item.label = $scope.varDescs[key];
                    }

                    $scope.values.push(item);
                });

                app.variable.getContent($scope.layout.props.variableName,function ( reply ) {
                    //console.log('r',reply);
                    $scope.variableValue = reply.qContent.qString; 
                    $scope.variableIndex = $scope.varValues.indexOf($scope.variableValue);
                    $scope.variableValueDesc = $scope.values[$scope.variableIndex].label;  
                });
                //console.log('v',$scope.values);
                $( ".options-"+$scope.layout.props.variableName ).parents('article').css( "overflow", "visible" );
            };
            $scope.setUp();                    
           
            $scope.changeVar = function(val){
               //console.log('vc',$scope.layout.props.variableName+' = '+val); 

                if(!$scope.layout.props.disabled){
                    console.log('mod var', $scope.layout.props.variableName+' = '+val)
                    app.variable.setContent($scope.layout.props.variableName,val);

                    $scope.variableValue = val;
                    $scope.variableIndex = $scope.varValues.indexOf(val);
                    $scope.variableValueDesc = $scope.values[$scope.variableIndex].label;  
                }
                else {
                    console.log('mod var disabled', $scope.layout.props.variableName)
                }
            };

            $scope.cicleVar = function(){
                $scope.variableIndex++;
                if($scope.variableIndex >= $scope.values.length){
                    $scope.variableIndex = 0;
                }
                console.log('indx',$scope.variableIndex);

                $scope.changeVar($scope.varValues[$scope.variableIndex]);
            }

            $scope.openMenu = function(){
                $( ".options-"+$scope.layout.props.variableName ).parents('article').css( "overflow", "visible" );
                $scope.menuOpen = !$scope.menuOpen;
            }

            // $scope.$watch( 'layout.props', function ( newVal ) {
            //     $scope.setUp();
            // } , true);
        }]
    };

});
