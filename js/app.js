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

	}

})(angular);
