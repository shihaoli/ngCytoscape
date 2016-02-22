(function(){
    'use strict';
    angular
        .module('app', ['ngCytoscape', 'hljs', 'ui.router', 'ngMaterial'])
})();
(function(){
    'use strict';

    angular
        .module('app')
        .config(function (hljsServiceProvider) {
            hljsServiceProvider.setOptions({
                // replace tab with 4 spaces
                tabReplace: '    '
            });
        });
})();
(function(){
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/gettingStarted");
            //
            // Now set up the states
            $stateProvider
                .state('defaults', {
                    url: "/defaults",
                    templateUrl: "dst/templates/defaults.html",
                    controller: 'defaultsCtrl'
                })
                .state('gettingStarted', {
                    url: "/gettingStarted",
                    templateUrl: "dst/templates/gettingStarted.html",
                    controller: 'gettingStartedCtrl'
                })
                .state('elements', {
                    url: "/elements",
                    templateUrl: "dst/templates/elements.html",
                    controller: 'elementsCtrl'
                })
                .state('layouts', {
                    url: "/layouts",
                    templateUrl: "dst/templates/layouts.html",
                    controller: 'layoutsCtrl'
                })
                .state('styles', {
                    url: "/styles",
                    templateUrl: "dst/templates/styles.html",
                    controller: 'stylesCtrl'
                })
                .state('events', {
                    url: "/events",
                    templateUrl: "dst/templates/events.html",
                    controller: 'eventsCtrl'
                })
                .state('core', {
                    url: "/core",
                    templateUrl: "dst/templates/core.html",
                    controller: 'coreCtrl'
                })
        });
})();
(function(){
    'use strict';
    angular
        .module('app')
        .controller('appCntrl', appCntrl);
    appCntrl.$inject = ['$scope', 'cytoData', '$interval'];

    function appCntrl($scope, cytoData, $interval){
        cytoData.getGraph('jumbo-graph').then(function(graph){
            $scope.graph = graph;
        });

        var layouts = [
            {name:'grid', animate: true},
            {name:'circle', animate: true},
            {name:'cose', animate: true},
            {name:'concentric', animate: true},
            {name:'breadthfirst', animate: true},
            {name:'random', animate: true}
        ];

        var runLayouts;
        runLayouts = $interval(function(){
            var ran = Math.floor(Math.random() * 4);
            $scope.layout = layouts[ran];
        },10000);
         $scope.style =[
         {
             selector: 'node',
             style: {
                 'content': 'data(name)',
                 'text-valign': 'center',
                 'color': 'white',
                 'text-outline-width': 2,
                 'text-outline-color': '#888'
             }
         }];

        $scope.elements = [
            { group:'nodes',data: { id: 'ngCyto', name: 'ngCytoscape', href: 'http://cytoscape.org' } },
            { group:'nodes',data: { id: 'cyto', name: 'Cytoscape.js', href: 'http://js.cytoscape.org' } },
            { group:'nodes',data: { id: 'ng', name: 'Angular.js', href: 'http://js.cytoscape.org' } },
            { group:'edges',data: { id: 'ngToNgCyto', source:'ngCyto', target:'ng' }},
            { group:'edges',data: { id: 'cytoToNgCyto', source:'ngCyto', target:'cyto' }}
        ];
        $scope.layout = {name:'cose'};

        }
})();

(function(){
    'use strict';

    angular
        .module('app')
        .controller('codeView', codeView);
    codeView.$inject = ['$scope'];
    function codeView($scope){
        var vm = this;
        vm.switch = function(text){
         if(text === 'HTML'){
            vm.codeView.html = true;
            vm.codeView.javascript = false;
         }else{
            vm.codeView.html = false;
            vm.codeView.javascript = true;
         }
         };
         vm.codeView = {
         html:true,
         javascript:false
         };

    }
})();
(function(){
    'use strict';

    angular
        .module('app')
        .controller('coreCtrl', coreCtrl);
    coreCtrl.$inject = ['$scope', 'cytoData'];
    function coreCtrl($scope, cytoData){
        $scope.layout = {name:'grid'};

        $scope.graph = {};
        cytoData.getGraph('core').then(function(graph){
            $scope.graph = graph;
        });

        $scope.panTo = function(){
            $scope.graph.pan({
                x: 100,
                y: 100
            })
        };
        $scope.center = function(){
            $scope.graph.center()
        };

        $scope.elements = {
            n1:{data:{}},
            n2:{data:{}},
            n3:{data:{}},
            n4:{data:{}},
            n5:{data:{}},
            e1:{
                data:{
                    source: 'n1',
                    target: 'n3'
                }
            },
            e2:{
                data:{
                    source: 'n2',
                    target: 'n4'
                }
            },
            e3:{
                data:{
                    source: 'n4',
                    target: 'n5'
                }
            },
            e4:{
                data:{
                    source: 'n4',
                    target: 'n3'
                }
            },
        }
    }
})();
(function(){
    'use strict';

    angular
        .module('app')
        .controller('defaultsCtrl', defaultsCtrl);
    defaultsCtrl.$inject = ['$scope', 'cytoData'];
    function defaultsCtrl($scope, cytoData){
       /* $scope.switch = function(text){
            if(text === 'HTML'){
                $scope.codeView.html = true;
                $scope.codeView.javascript = false;
            }else{
                $scope.codeView.html = false;
                $scope.codeView.javascript = true;
            }
        };
        $scope.codeView = {
            html:true,
            javascript:false
        };*/
        $scope.layout = {name:'grid'};
        $scope.defaults = {
            zoomingEnabled: false,
            userPanningEnabled: false
        };

        $scope.elements = {
            n1:{
                data:{}
            },
            n2:{
                data:{}
            },
        };
    }
})();
(function(){
    'use strict';

    angular
        .module('app')
        .controller('elementsCtrl', elementsCtrl);
    elementsCtrl.$inject = ['$scope'];
    function elementsCtrl($scope){
        $scope.layout = {name:'grid'};
        $scope.addElement = function(){
            angular.extend($scope.elements,{
                n1:{
                    data:{},
                    position:{
                        x: 50,
                        y: 50
                    }
                }
            })
        };
        $scope.removeElement = function(){
            $scope.elements = {};
        };
        $scope.elements = {};
    }
})();
(function(){
    'use strict';

    angular
        .module('app')
        .controller('eventsCtrl', eventsCtrl);
    eventsCtrl.$inject = ['$scope'];
    function eventsCtrl($scope){
        $scope.event = {
            name: ''
        };
        $scope.styles = [
            {
                selector: 'node',
                style:{
                    height: 'data(weight)',
                    width: 'data(weight)',
                    'background-color': 'mapData(weight, 0, 100, blue, red)'
                }
            }
        ];
        $scope.elements = {
            n1:{
                data:{
                    weight: 30
                },
                position:{
                    x:50,
                    y:50
                }
            }
        };
        $scope.$on('cy:node:mouseover', function(ng,cy){
            $scope.event.name = 'cy:node:mouseover';
            $scope.$apply();
        });
        $scope.$on('cy:node:mouseout', function(ng,cy){
            $scope.event.name = 'cy:node:mouseout';
            $scope.$apply();
        });
        $scope.$on('cy:node:mousedown', function(ng,cy){
            $scope.event.name = 'cy:node:mousedown';
            $scope.$apply();
        });
        $scope.$on('cy:node:mouseup', function(ng,cy){
            $scope.event.name = 'cy:node:mouseup';
            $scope.$apply();
        });
        $scope.$on('cy:node:drag', function(ng,cy){
            $scope.event.name = 'cy:node:drag';
            $scope.$apply();
        })
    }
})();
(function(){
    'use strict';

    angular
        .module('app')
        .controller('gettingStartedCtrl', gettingStartedCtrl);
    gettingStartedCtrl.$inject = ['$scope', 'cytoData'];
    function gettingStartedCtrl($scope, cytoData){
        $scope.switch = function(text){
            if(text === 'HTML'){
                $scope.codeView.html = true;
                $scope.codeView.javascript = false;
            }else{
                $scope.codeView.html = false;
                $scope.codeView.javascript = true;
            }
        };
        $scope.codeView = {
            html:true,
            javascript:false
        };
        $scope.defaults = {
            zoomingEnabled: false,
            userPanningEnabled: false
        };
        $scope.elements = [
            { group:'nodes',data: { id: 'ngCyto', name: 'ngCytoscape', href: 'http://cytoscape.org' } },
            { group:'nodes',data: { id: 'cyto', name: 'Cytoscape.js', href: 'http://js.cytoscape.org' } },
            { group:'nodes',data: { id: 'ng', name: 'Angular.js', href: 'http://js.cytoscape.org' } },
            { group:'edges',data: { id: 'ngToNgCyto', source:'ngCyto', target:'ng' }},
            { group:'edges',data: { id: 'cytoToNgCyto', source:'ngCyto', target:'cyto' }}
        ];
    }
})();
(function(){
    'use strict';

    angular
        .module('app')
        .controller('layoutsCtrl', layoutsCtrl);
    layoutsCtrl.$inject = ['$scope','cytoData'];
    function layoutsCtrl($scope,cytoData){
        $scope.layout = {name:'grid'};
        $scope.elements = {
            n1:{data:{}},
            n2:{data:{}},
            n3:{data:{}},
            n4:{data:{}},
            n5:{data:{}},
            e1:{
                data:{
                    source: 'n1',
                    target: 'n3'
                }
            },
            e2:{
                data:{
                    source: 'n2',
                    target: 'n4'
                }
            },
            e3:{
                data:{
                    source: 'n4',
                    target: 'n5'
                }
            },
            e4:{
                data:{
                    source: 'n4',
                    target: 'n3'
                }
            },
        }
    }
})();
(function(){
    'use strict';

    angular
        .module('app')
        .controller('stylesCtrl', stylesCtrl);
    stylesCtrl.$inject = ['$scope'];
    function stylesCtrl($scope){

        $scope.layout = {name:'grid'};
        $scope.styles = [
            {
                selector: 'node',
                style:{
                   height: 'data(weight)',
                   width: 'data(weight)',
                   'background-color': 'mapData(weight, 0, 100, blue, red)'
                }
            }
        ];
        $scope.elements = {
            n1:{data:{
                weight: 30
            }}
         }
    }
})();