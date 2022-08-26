// Your code here

// createEmployeeRecord()
function createEmployeeRecord(empDetailsArray){
    // return Object with the employees details
    let empDetailsObj = {
        firstName: empDetailsArray[0],
        familyName: empDetailsArray[1],
        title: empDetailsArray[2],
        payPerHour: empDetailsArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return empDetailsObj;
};

// createEmployeeRecords
function createEmployeeRecords(arrayOfArrays){
    // Convert each array into employee records and push to the records
    const empRecords = arrayOfArrays.map( (array) => createEmployeeRecord(array));
    return empRecords;
}

// createTimeInEvent()
function createTimeInEvent(empDetailsObj, timeStamp){
    // Create a variable to store every employee's time in records
    let timeRecord = {
        type: "TimeIn",
        hour: parseInt(timeStamp.slice(11), 10),
        date: timeStamp.slice(0, 10)
    };
    // Add this record to the timeInEvents property of the employee's details
    empDetailsObj.timeInEvents.push(timeRecord);

    return empDetailsObj;
}

// createTimeOutEvent()
function createTimeOutEvent(empDetailsObj, timeStamp){
    // Create a variable to store every employee's time out records
    let timeRecord = {
        type: "TimeOut",
        hour: parseInt(timeStamp.slice(11), 10),
        date: timeStamp.slice(0, 10)
    };
    // Add this record to the timeOutEvents property of the employee's details
    empDetailsObj.timeOutEvents.push(timeRecord);

    return empDetailsObj;
}

// hoursWorkedOnDate()
function hoursWorkedOnDate(empDetailsObj, date){
    let timeIn ;
    let timeOut;

    // Capture timeIn record for the date of interest
    for (let record of empDetailsObj.timeInEvents){
        if (record.date === date){
            timeIn = record.hour/100; //Did this the hard way to make tests pass
        }
    }

    // Capture timeOut record for the date of interest
    for (let record of empDetailsObj.timeOutEvents){
        if (record.date === date){
            timeOut = record.hour/100; //Did this the hard way to make tests pass
        }
    }

    return timeOut - timeIn;

}

// wagesEarnedOnDate()
function wagesEarnedOnDate(empDetailsObj, date){
    // Get number of hours worked
    let hoursWorked = hoursWorkedOnDate(empDetailsObj, date);

    // Calculate amount employee should get
    let amountOwed = empDetailsObj.payPerHour * hoursWorked;

    return amountOwed;
}

// allWagesFor()
function allWagesFor(empDetailsObj){
    // Get all the available dates
    let dates = [];
    for (let record of empDetailsObj.timeInEvents){
        dates.push(record.date)
    }

    // Accumulate pay
    let totalWages = 0
    for (let date of dates){
        totalWages += wagesEarnedOnDate(empDetailsObj, date)
    }

    // Return the total wages
    return totalWages;
}

// calculatePayroll()
function calculatePayroll(empDetailsArray){
    // Loop over all the employees
    let totalEmployeeWages = 0;

    for (let employee of empDetailsArray){
        totalEmployeeWages += allWagesFor(employee);
    }

    // Return the total amount owed
    return totalEmployeeWages;
}