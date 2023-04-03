var randon = async () => {
    var ans = await fetch("/hey");
    ans = await ans.json();
    console.log(ans)
}

randon();

var table = document.querySelector('.table')
var func = async ()=>{
    var users = await fetch("/getUser")
    users = await users.json()
    users.map((item)=>{
        var tr = document.createElement('tr')

        let props = Object.keys(item)
        props.forEach((property)=>{
            if(property == "joining_date" || property== "expiry_date"){
                console.log("inside")
                var inputDate = new Date(item[property])
                const day = inputDate.getDate().toString().padStart(2, '0');
                const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
                const year = inputDate.getFullYear().toString().slice(2);
                const outputDate = `${day}/${month}/${year}`;
                date = outputDate
                var td = document.createElement('td')
                var h4 = document.createElement('h4')
                h4.innerText = date
                td.appendChild(h4);
                tr.appendChild(td);
            } else{
                var td = document.createElement('td')
                var h4 = document.createElement('h4')
                h4.innerText = item[property]
                td.appendChild(h4);
                tr.appendChild(td);
            }
        })
        table.appendChild(tr)
    })
}
if (table) func()


var dueTable = document.querySelector('.due')
var duePayment = async ()=>{
    var users = await fetch("/duePayment")
    users = await users.json()
    console.log(users)
    users.map((item)=>{
        var tr = document.createElement('tr')
        let props = Object.keys(item)
        props.forEach((property)=>{
            if(property == "joining_date" || property== "expiry_date"){
                console.log("inside")
                var inputDate = new Date(item[property])
                const day = inputDate.getDate().toString().padStart(2, '0');
                const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
                const year = inputDate.getFullYear().toString().slice(2);
                const outputDate = `${day}/${month}/${year}`;
                date = outputDate
                var td = document.createElement('td')
                var h4 = document.createElement('h4')
                h4.innerText = date
                td.appendChild(h4);
                tr.appendChild(td);
            } else{
                var td = document.createElement('td')
                var h4 = document.createElement('h4')
                h4.innerText = item[property]
                td.appendChild(h4);
                tr.appendChild(td);
            }
        })
        dueTable.appendChild(tr)
    })
}


if(dueTable) duePayment()



var allTable = document.querySelector('.alldata')
var alldata = async ()=>{
    var users = await fetch("/allUser")
    users = await users.json()
    console.log(users)
    users.map((item)=>{
        var tr = document.createElement('tr')
        let props = Object.keys(item)
        props.forEach((property)=>{
            if(property == "joining_date" || property== "expiry_date"){
                console.log("inside")
                var inputDate = new Date(item[property])
                const day = inputDate.getDate().toString().padStart(2, '0');
                const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
                const year = inputDate.getFullYear().toString().slice(2);
                const outputDate = `${day}/${month}/${year}`;
                date = outputDate
                var td = document.createElement('td')
                var h4 = document.createElement('h4')
                h4.innerText = date
                td.appendChild(h4);
                tr.appendChild(td);
            } else{
                var td = document.createElement('td')
                var h4 = document.createElement('h4')
                h4.innerText = item[property]
                td.appendChild(h4);
                tr.appendChild(td);
            }
        })
        allTable.appendChild(tr)
    })
}


if(allTable) alldata()

