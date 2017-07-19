(function(angular){
	'use strict'
	angular
		.module('todoApp.service',[])
		.service('TodoSrv',['$window',function($window){
			// var todoList = [
			// 	{id:1,name:'喵喵',isCompleted:false},
			// 	{id:2,name:'汪汪',isCompleted:true},
			// 	{id:3,name:'嘎嘎',isCompleted:false},
			// 	{id:4,name:'吱吱',isCompleted:true},
			// ];

			var localStorage = $window.localStorage;
			var todoList = JSON.parse(localStorage.getItem('todo'))||[];
			//保存数据
			this.save = function(){
				localStorage.setItem('todo',JSON.stringify(todoList));
			};
			var that = this;
			//获取数据的方法
			this.getData=function(){
				return todoList;
			}
		//	添加任务
			this.add = function(taskName){
				var id,
					length = todoList.length;
				if(length === 0){
					id = 1;
				}else{
					id = todoList[todoList.length-1].id + 1 ;
				}
				todoList.push({id:id,name:taskName,isCompleted:false});
				that.save();
			};
		//	删除数据
			this.del = function(id){
				for(var i=0;i<todoList.length;i++){
					if(todoList[i].id === id){
						todoList.splice(i,1);
						break;
					}
				}
				that.save();
			};
		//	全选
			this.checkAll = function(isCheckedAll){
				//根据全选按钮的选中的状态,来控制所有的任务项的选中状态
				for(var i=0;i<todoList.length;i++){
					todoList[i].isCompleted = isCheckedAll;
				}
			};
		//	清除已经完成的任务
			this.delCompleted = function(){
				var temArr=[];
				for(var i=0;i<todoList.length;i++){
					if(!todoList[i].isCompleted){
						temArr.push(todoList[i]);
					}
				}
				//	清空数组
				todoList.length=0;
				[].push.apply(todoList,temArr);
				that.save();
			};
		//	清除按钮的显示和隐藏
			this.isShow=function(){
				var ret = false;
				for(var i=0;i<todoList.length;i++){
					if(todoList[i].isCompleted){
						ret = true;
						break;
					}
				}
				return ret;
			};
		//	显示未完成的任务数
			this.getCount = function(){
				var count = 0;
				for(var i=0;i<todoList.length;i++){
					if(!todoList[i].isCompleted){
						count++;
					}
				}
				return count;
			};
		}]);
})(angular)
