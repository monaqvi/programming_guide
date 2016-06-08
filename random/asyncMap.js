'use strict';

var should = require('should');

// THIS WORKS
// forEach passes in the state of i each time
var asyncMap = function(tasks, callback){
  var numTasks = tasks.length, tasksDone = 0, results = [];
  tasks.forEach(function(task, i, arr) {
    task(function(input) {
      results[i] = input;
      tasksDone++;
      if (tasksDone === numTasks) {
        callback(results);
      }
    })
  })
};

// THIS DOESN'T WORK
// i === numTasks++ when results[i] is assigned for all tasks
var asyncMap = function(tasks, callback){
  var tasksDone = 0, results = [];
  for (var i = 0, numTasks = tasks.length; i < numTasks; i++) {
    tasks[i](function(input) {
      results[i] = input;
      tasksDone++;
      if (tasksDone === numTasks) {
        callback(results);
      }
    })
  }
};

// THIS WORKS
// i === numTasks++ when results[i] is assigned but each assignment has i passed into its own local scope, which is the correct index value
var asyncMap = function(tasks, callback){
  var tasksDone = 0, results = [];

  for(var i = 0, numTasks = tasks.length; i < numTasks; i++){
    (function (i) {
      tasks[i](function (val) {
        results[i] = val;
        tasksDone++;
        if(tasksDone === tasks.length){
          callback(results);
        }
      });
    })(i);
  }
};

describe('asyncMap', function() {
  
  it('should handle more than two async functions in the correct order', function(done){
    function wait2For2(callback){
      setTimeout(function(){
        callback(2);
      }, 200);
    }

    function wait5For4(callback){
      setTimeout(function(){
        callback(4);
      }, 500);
    }

    function wait1For3(callback){
      setTimeout(function(){
        callback(3);
      }, 100);
    }

    function wait3For1(callback){
      setTimeout(function(){
        callback(1);
      }, 300);
    }

    function wait1For5(callback){
      setTimeout(function(){
        callback(5);
      }, 100);
    }

    asyncMap([wait3For1, wait2For2, wait1For3, wait5For4, wait1For5], function(results){
      results.should.eql([1,2,3,4,5]);
      done();
    });

  });

});
