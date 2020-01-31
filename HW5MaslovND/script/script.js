var toDoList = (function(){
    return{
    addTask:function(){
        var table = document.getElementById("table");
        var tr = document.createElement('tr');
        tr.setAttribute('id', 'tr'+table.rows.length)
        var tdTask = document.createElement('td');
        tdTask.setAttribute('class', 'tdTask');
        var tdDeadline = document.createElement('td');
        tdDeadline.setAttribute('class', 'tdDeadline');
        var tdDone = document.createElement('td');
        tdDone.setAttribute('class', 'tdDone');
        tdTask.innerHTML = document.getElementById("task").value;
        tdDeadline.innerHTML = "DeadLine: " + document.getElementById("addBox_Date").value;
        tr.setAttribute('date', document.getElementById("addBox_Date").value);
        tr.setAttribute('done', 0);
        tdDone.innerHTML = '<a href="#" onclick="toDoList.doneTask('+table.rows.length+')"><img src="./img/done.png" class = "butDone" id="btD'+table.rows.length+'"/></a><a href="#" onclick="toDoList.butNotDone('+table.rows.length+')"><i class="fas fa-times-circle butNotDone" id = "btC'+table.rows.length+'"></i></a><a href="#" onclick="toDoList.deleteTask('+table.rows.length+')"><img src="./img/delete.png" class = "butDelete"/></a>';
        tr.appendChild(tdTask);
        tr.appendChild(tdDeadline);
        tr.appendChild(tdDone);
        table.appendChild(tr); 
        var task = document.getElementById("task").value;
        var date = document.getElementById("addBox_Date").value
        var doneOrNot = 0; 
        localStorage.setItem('tr'+table.rows.length+'task', task);
        localStorage.setItem('tr'+table.rows.length+'date', date);
        localStorage.setItem('tr'+table.rows.length+'doneOrNot', doneOrNot);
    },
    doneTask:function (key){
        console.log();
        var tr = document.getElementById("tr"+key);
        tr.setAttribute('class', 'greenBG');
        tr.setAttribute('done', 1); 
        document.getElementById("btD"+key).style.visibility = 'hidden';
        document.getElementById("btC"+key).style.visibility = 'visible';
        doneOrNot=1;
        localStorage.setItem('tr'+(key+1)+'doneOrNot', doneOrNot);
    },
    deleteTask:function (key){
        console.log(key);
        var tr = document.getElementById("tr"+key);
        document.getElementById("table").removeChild(tr);
        localStorage.removeItem('tr'+(key+1)+'task');
        localStorage.removeItem('tr'+(key+1)+'date');
        localStorage.removeItem('tr'+(key+1)+'doneOrNot');

    },
    butNotDone:function (key){
        var tr = document.getElementById("tr"+key);
        tr.classList.remove("greenBG");
        tr.setAttribute('done', 0);
        document.getElementById("btD"+key).style.visibility = 'visible';
        document.getElementById("btC"+key).style.visibility = 'hidden';
        doneOrNot=0;
        localStorage.setItem('tr'+(key+1)+'doneOrNot', doneOrNot);
    }
    }  
}());
var fooOnload = (function(){
    return{
        getFromLS:function(task, date, doneOrNot){
        var table = document.getElementById("table");
        var tr = document.createElement('tr');
        tr.setAttribute('id', 'tr'+table.rows.length)
        var tdTask = document.createElement('td');
        tdTask.setAttribute('class', 'tdTask');
        var tdDeadline = document.createElement('td');
        tdDeadline.setAttribute('class', 'tdDeadline');
        var tdDone = document.createElement('td');
        tdDone.setAttribute('class', 'tdDone');
        tdTask.innerHTML = task;
        tdDeadline.innerHTML = "DeadLine: " + date;
        tr.setAttribute('date', date);
        tr.setAttribute('done', doneOrNot);
        tdDone.innerHTML = '<a href="#" onclick="toDoList.doneTask('+table.rows.length+')"><img src="./img/done.png" class = "butDone" id="btD'+table.rows.length+'"/></a><a href="#" onclick="toDoList.butNotDone('+table.rows.length+')"><i class="fas fa-times-circle butNotDone" id = "btC'+table.rows.length+'"></i></a><a href="#" onclick="toDoList.deleteTask('+table.rows.length+')"><img src="./img/delete.png" class = "butDelete"/></a>';
        tr.appendChild(tdTask);
        tr.appendChild(tdDeadline);
        tr.appendChild(tdDone);
        table.appendChild(tr);
        if(doneOrNot!=0){
            tr.setAttribute('class', 'greenBG');
            document.getElementById("btD"+(table.rows.length-1)).style.visibility = 'hidden';
            document.getElementById("btC"+(table.rows.length-1)).style.visibility = 'visible';
        }
        }
    }
}());
window.onload = function(){
    for(var i = 0; i<(localStorage.length/3); i++){
            var task = localStorage.getItem('tr'+(i+1)+'task');
            var date = localStorage.getItem('tr'+(i+1)+'date');
            var doneOrNot = localStorage.getItem('tr'+(i+1)+'doneOrNot');
       fooOnload.getFromLS(task, date, doneOrNot);
    }
}
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});
document.getElementById("addBox_Date").setAttribute('value', new Date().toDateInputValue());

var filter = (function(){
    var week =new Date();
    week.setDate(week.getDate()+7);
    var day =new Date();
    day.setDate(day.getDate()+1);
    var table = document.getElementById('table');
    return{
        filterToDoList: function(){
        var selected = document.getElementById("filter").options.selectedIndex;
        if(selected === 1){
            for(var i=0; i<table.children.length; i++){
                table.children[i].style.display = '';
                var date = new Date(table.children[i].getAttribute('date'));
                if(date<week){
                    table.children[i].style.display = 'none';
                }
            }
        }if(selected === 2){
            for(var i=0; i<table.children.length; i++){
                table.children[i].style.display = '';
                var date = new Date(table.children[i].getAttribute('date'));
                if(date>day&&date<week){
                    
                }else{
                    table.children[i].style.display = 'none';    
                }
            }
        }if(selected === 3){
            for(var i=0; i<table.children.length; i++){
                table.children[i].style.display = '';
                if(table.children[i].getAttribute('done') == 0){
                    table.children[i].style.display = 'none';    
                }
            }
        }if(selected === 4){
            for(var i=0; i<table.children.length; i++){
                table.children[i].style.display = '';
                if(table.children[i].getAttribute('done') != 0){
                    table.children[i].style.display = 'none';    
                }
            }
        }if(selected === 0){
            for(var i=0; i<table.children.length; i++){
                table.children[i].style.display = '';
            }
        }
    }  
    }   
}());


