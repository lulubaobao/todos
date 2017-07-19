(function(angular){
	'use strict'
	angular
		.module('todoApp.ctrl',[])
		.controller('TodoController',['$scope','$location','TodoSrv',TodoController]);
	function TodoController($scope,$location,TodoSrv){
		var vm = $scope;
		// 1 展示任务列表
		var todoList = TodoSrv.getData();
		vm.todoList = todoList;

		//	2 添加任务
		vm.taskName = '';
		vm.add = function(){
			if(vm.taskName.trim() === ''){
				return;
			}
            TodoSrv.add(vm.taskName);
			vm.taskName = '';
		};
		//   3 删除一条任务
		vm.del =TodoSrv.del;
		// 4 修改任务
		vm.editingId = -1;
		vm.edit=function(id){
			vm.editingId = id;
		};
		vm.editSave = function(){
			vm.editingId = -1;
			TodoSrv.save();
		};
		//	5 切换任务选中状态(单个或批量)
		//	单个选中:通过双向数据绑定来实现的(ng-model)
		vm.isCheckedAll = false;
		vm.checkAll = function(){
	          TodoSrv.checkAll(vm.isCheckedAll);
		};
		//	6 清除已经完成的任务
		vm.delCompleted = TodoSrv.delCompleted;

		vm.isShow=TodoSrv.isShow;
		//	7 显示未完成的任务数
		vm.getCount = TodoSrv.getCount;
		//	8 显示不同状态的任务以及当前任务的高亮显示
		vm.status = undefined;
		// vm.selectAll = function(){
		// 	vm.status = undefined;
		// };
		// vm.selectActive = function(){
		// 	vm.status = false;
		// };
		// vm.selectCompleted = function(){
		// 	vm.status = true;
		// };
		//	9 根据URL的变化显示相应的任务
		vm.location = $location;
		vm.$watch('location.url()',function(newVal,oldVal){
			console.log(newVal);
			switch(newVal){
				case '/active':
					vm.status = false;
					break;
				case '/completed':
					vm.status = true;
					break;
				default:
					vm.status = undefined;
					break;
			}
		});

	}
})(angular)
