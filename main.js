
//------------------------------------- MAIN OBJECT -------------------------------------------

var student = {
    totalSum : 0,
    averageNumber : 0,
    studentList: [],
    studentContainer: document.getElementsByClassName('StudentsList')[0],
    writeHtml: function() {
        this.studentContainer.innerHTML = '';

        for(let i = 0; i < student.studentList.length; i++) {
            this.studentContainer.innerHTML += `<tr><td class="row");">${student.studentList[i].name}</td>
            <td style="background-color:${student.studentList[i]['score']['monday']['color']}" class="row numberRow"onclick="alertChange(this,\'${student.studentList[i].name}\',\'monday\',\'${student.studentList[i]['score']['monday']['color']}\');">${(student.studentList[i]['score']['monday']['score'] ? student.studentList[i]['score']['monday']['score']  : '')}</td>
            <td style="background-color:${student.studentList[i]['score']['wednesday']['color']}" class="row numberRow"onclick="alertChange(this,\'${student.studentList[i].name}\',\'wednesday\',\'${student.studentList[i]['score']['wednesday']['color']}\');">${(student.studentList[i]['score']['wednesday']['score']  ? student.studentList[i]['score']['wednesday']['score']  : '')}</td>
            <td style="background-color:${student.studentList[i]['score']['friday']['color']}" class="row numberRow"onclick="alertChange(this,\'${student.studentList[i].name}\',\'friday\',\'${student.studentList[i]['score']['friday']['color']}\');">${(student.studentList[i]['score']['friday']['score']  ? student.studentList[i]['score']['friday']['score']  : '')}</td>
            <td style="background-color:${student.studentList[i]['score']['sunday']['color']}" class="row numberRow"onclick="alertChange(this,\'${student.studentList[i].name}\',\'sunday\',\'${student.studentList[i]['score']['sunday']['color']}\');">${(student.studentList[i]['score']['sunday']['score']  ? student.studentList[i]['score']['sunday']['score']  : '')}</td>
            <td class="row numberRow"onclick="deleteThis(this,\'${student.studentList[i]['name']}\')">წაშლა</td></tr>`
            
        }
    }
}

//------------------------------------- DAY/ROW/COLOR SAVER -------------------------------------------

var averageScore = document.getElementById('averageScore');

var alertChange = function(io,name,dayofDay,colored) {
    var score = prompt('გთხოვთ შეცვალოთ ქულა');
    if(isNaN(score)) {
        alert('please enter a valid number');
    } else if(score >= 5) {
        io.innerHTML = 5;
        colored = 'green'
        io.style.backgroundColor = colored;
    } else if(score <= 0) {
        io.innerHTML = 0;
        colored = 'red';
        io.style.backgroundColor = colored;
    } else {
        io.innerHTML = score;
        colored = '#b8b601'
        io.style.backgroundColor = colored;
    }

    for(var i = 0 ; i < student.studentList.length; i++) {

        if(student.studentList[i]['name'] === name) {
            student.studentList[i]['score'][dayofDay]['score'] = score;
            student.studentList[i]['score'][dayofDay]['color'] = colored;
        }

    }
    
    averageScoreCounter()
}

//------------------------------------- AVERAGE SCORE COUNTER -------------------------------------------

var averageScoreCounter = function() {
    student.totalSum = 0;
    student.averageNumber = 0;
    for(var index = 0; index < student.studentList.length; index++) {
        for(var ii = 0; ii < Object.keys(student.studentList[index].score).length; ii++) {
            if(student.studentList[index]['score'][Object.keys(student.studentList[index].score)[ii]].score !== '') {
                student.totalSum += Number(student.studentList[index]['score'][Object.keys(student.studentList[index].score)[ii]].score);
                student.averageNumber += 1;

            }
        }
    }
    averageScore.innerHTML = (student.totalSum / student.averageNumber).toFixed(2)
}


//------------------------------------- Delete Single Student -------------------------------------------

var deleteThis = function(deleteRow, name ) { 
    var row = deleteRow.parentNode;
    row.parentNode.removeChild(row);
    
    for(var i = 0; i < student.studentList.length; i++) {
        if(student.studentList[i]['name'] == name) {
            student.studentList.splice(i, 1);
        }
    }
    studentCount.innerHTML = student.studentList.length;
    averageScoreCounter()
    if(averageScore.innerHTML == 'NaN') {
        averageScore.innerHTML = 0;
    }
}

//------------------------------------- ADD STUDENT -------------------------------------------

var addStudent = document.getElementsByClassName('buttonAdd')[0];

var functionAdd = function() {
    var addNew = prompt('დაამატეთ სტუდენტი');
    if (addNew !== null && isNaN(addNew)) { 
        let newStudent = {
            'name' : addNew,
            'score' : {
                'monday' : {'score': '', 'color': ''},
                'wednesday' : {'score': '', 'color': ''},
                'friday' : {'score': '', 'color': ''},
                'sunday' : {'score': '', 'color': ''}
            },
        }
        student.studentList.push(newStudent);
        student.writeHtml()
    } else {
        alert('გთხოვთ სწორად შეიყვანოთ სტუდენტის მონაცემები !')
    }
    studentCount.innerHTML = student.studentList.length
}

addStudent.addEventListener('click', functionAdd);

//------------------------------------- STUDENT REMOVE ALL -------------------------------------------

var removeStudent = document.getElementsByClassName('buttonRemove')[0];

var functionRemove = function() {

    for(let i = student.studentList.length; i > 0; i--) {
        student.studentContainer.innerHTML = '';
    }
    student.studentList = [];
    student.totalSum = 0;
    student.averageNumber = 0;
    averageScore.innerHTML = 0;
    studentCount.innerHTML = student.studentList.length

}

removeStudent.addEventListener('click', functionRemove)


