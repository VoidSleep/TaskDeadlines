var tableSize = 1
var deadlineArr = []
function updateTable()
{
    let table =  document.getElementById("timeTable");
    const options = {
        year: 'numeric',
        month: '2-digit', // Options: 'numeric', '2-digit', 'short', 'long', 'narrow'
        day: '2-digit',
        timeZone: 'America/New_York' // Ensures the date components are correct for EST/EDT
    };
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        tableSize++;
        let tableIndex = tableSize-1;
        cell1.innerHTML = tableIndex.toString();
        cell2.innerHTML = value;
        let keyToDate = new Date(key);
        keyToDate.setHours(keyToDate.getHours() + 5)
        deadlineArr.push(keyToDate)
        cell4.innerHTML = keyToDate.toLocaleString('en-US',options);
    }

}
updateTable();
function updateTimer()
{
    let table =  document.getElementById("timeTable");
    // Get today's date and time
    var now = new Date().getTime();
 
    for(let i = 0; i < deadlineArr.length; i++)
    {
        // Find the distance between now and the count down date
        var distance = deadlineArr[i] - now;
    
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if(table.rows[i+1])
            table.rows[i+1].cells[2].innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

    }
}
function addRow(){
    let table =  document.getElementById("timeTable");
    let input = " ";
    let TaskName = prompt("Insert task title", input);
    let deadLine = prompt("Insert dead line date (YYYY-MM-DD)", input);
    let deadLineDate = new Date(deadLine);
    let notDate = false;
    if (isNaN(deadLineDate.getTime())) {
        alert(`Failed to parse. INVALID DATE`);
        notDate = true
    }   
    const options = {
        year: 'numeric',
        month: '2-digit', // Options: 'numeric', '2-digit', 'short', 'long', 'narrow'
        day: '2-digit',
        timeZone: 'America/New_York' // Ensures the date components are correct for EST/EDT
    };
    
    if(!notDate)
    {
        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        tableSize++;
        let tableIndex = tableSize-1;
        cell1.innerHTML = tableIndex.toString();
        cell2.innerHTML = TaskName;
        deadLineDate.setHours(deadLineDate.getHours() + 5)
        deadlineArr.push(deadLineDate)
        cell4.innerHTML = deadLineDate.toLocaleString('en-US',options);
        localStorage.setItem(deadLineDate.toLocaleString('en-US',options),TaskName);
    }
}
function removeRow() {
    let table =  document.getElementById("timeTable");
    let message = "Which row would you like to remove"
    let index = 1;
    tableSize--;
    let result = prompt(message, index);
    let num = Number(result);
    
    if(result){
        if (isNaN(result) == false)
            {
                
                if (num == 0)
                    alert("No removing the top");
                else
                    try{
                        table.deleteRow(num);
                        localStorage.removeItem(deadlineArr[num-1].toLocaleString('en-US',options));
                        removeItem(deadlineArr,deadlineArr[num-1]);
                        for (let i = num; i < tableSize; i++) {
                            table.rows[i].cells[0].innerHTML = i.toString();
                        }   
                    }
                    catch(error)
                    {
                        alert("No such index");
                    }
            }
        }
    }
setInterval(updateTimer, 1000);

function removeItem(array, itemToRemove) {
    const index = array.indexOf(itemToRemove);

    if (index !== -1) {
        array = array.splice(index, 1);
    }
	console.log("Updated Array: ", array);
}


