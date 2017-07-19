//沙箱模式
(function(angular){
//	严格模式
	'use strict';
	angular
		.module('todoApp',[])
		.controller('TodoController',['$scope','$location',TodoController]);
	function TodoController($scope,$location){
		var vm = $scope;
	// 1 展示任务列表

		var todoList = [
			{id:1,name:'喵喵',isCompleted:false},
			{id:2,name:'汪汪',isCompleted:true},
			{id:3,name:'嘎嘎',isCompleted:false},
			{id:4,name:'吱吱',isCompleted:true},
		];
		vm.todoList = todoList;

	//	2 添加任务
	   vm.taskName = '';
	   vm.add = function(){
	   	if(vm.taskName.trim() === ''){
	   		return;
		}
		var id,
	   	     length = todoList.length;
	    if(length === 0){
	    	id = 1;
		}else{
	    	id = todoList[todoList.length-1].id + 1 ;
		}
	   	todoList.push({id:id,name:vm.taskName,isCompleted:false});
	   	vm.taskName = '';
	   };
	//   3 删除一条任务
       vm.del = function(id){
       	for(var i=0;i<todoList.length;i++){
       		if(todoList[i].id === id){
       			todoList.splice(i,1);
       			break;
			}
		}
	   };
     // 4 修改任务
		vm.editingId = -1;
		vm.edit=function(id){
			vm.editingId = id;
		};
		vm.editSave = function(){
			vm.editingId = -1;
		};
	//	5 切换任务选中状态(单个或批量)
	//	单个选中:通过双向数据绑定来实现的(ng-model)
		vm.isCheckedAll = false;
		vm.checkAll = function(){
			//根据全选按钮的选中的状态,来控制所有的任务项的选中状态
			for(var i=0;i<todoList.length;i++){
				todoList[i].isCompleted = vm.isCheckedAll;
			}
		};
	//	6 清除已经完成的任务
        vm.delCompleted = function(){
        	var temArr=[];
        	for(var i=0;i<todoList.length;i++){
        		if(!todoList[i].isCompleted){
        			temArr.push(todoList[i]);
				}
			}
		//	清空数组
			todoList.length=0;
			[].push.apply(todoList,temArr);
		};
		vm.isShow=function(){
        	var ret = false;
        	for(var i=0;i<todoList.length;i++){
        		if(todoList[i].isCompleted){
        			ret = true;
        			break;
				}
			}
			return ret;
		};
	//	7 显示未完成的任务数
		vm.getCount = function(){
			var count = 0;
			for(var i=0;i<todoList.length;i++){
				if(!todoList[i].isCompleted){
					count++;
				}
			}
			return count;
		};
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

})(angular);
