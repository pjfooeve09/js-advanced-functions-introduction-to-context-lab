const createEmployeeRecord = arr => {
    const [firstName, familyName, title, payPerHour] = arr;
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  };
  
  //"YYYY-MM-DD"
  
  //"2014-02-28 1400"
  
  const createTimeInObject = string => {
    const [date, hour] = [string.split(" ")[0], parseInt(string.split(" ")[1])];
    return { type: "TimeIn", date, hour };
  };
  const createTimeOutObject = string => {
    const [date, hour] = [string.split(" ")[0], parseInt(string.split(" ")[1])];
    return { type: "TimeOut", date, hour };
  };
  
  const createEmployees = arr => arr.map(e => createEmployeeRecord(e));
  
  const createTimeInEvent = (employee, dateTime) => {
    const timeObj = createTimeInObject(dateTime);
    employee.timeInEvents.push(timeObj);
    return employee;
  };
  const createTimeOutEvent = (employee, dateTime) => {
    const timeObj = createTimeOutObject(dateTime);
    employee.timeOutEvents.push(timeObj);
    return employee;
  };
  
  const hoursWorkedOnDate = (e, date) => {
    const myArr = [e.timeOutEvents, e.timeInEvents].map(arr =>
      arr.filter(event => event.date === date)
    );
    const hours = [myArr[0][0], myArr[1][0]].map(obj => obj.hour);
    return (hours[0] - hours[1]) / 100;
  };
  const reduceAdd = (a, b) => a + b;
  const wagesEarnedOnDate = (e, date) =>
    hoursWorkedOnDate(e, date) * e.payPerHour;
  
  const allWagesFor = employee => {
    const stupidJavaScript = employee.timeInEvents.map(event =>
      wagesEarnedOnDate(employee, event.date)
    );
    return stupidJavaScript.reduce(reduceAdd);
  };
  
  const calculatePayroll = employees =>
    employees.map(e => allWagesFor(e)).reduce(reduceAdd);
  
  const createEmployeeRecords = arr => arr.map(arr => createEmployeeRecord(arr));
  
  const findEmployeebyFirstName = (src, name) =>
    src.find(e => e.firstName === name);