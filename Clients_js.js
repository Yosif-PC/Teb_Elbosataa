
db.ref("Clients_LD").on("value", (snapshot)=>{
    const data = snapshot.val();

    ClientsList=data||[]
    renderTable();})



///////////////////////////////////////////////////

const table = document.getElementById("ClientsTable");
const tbody = table.querySelector("tbody");

// رسم الجدول
function renderTable() {
  tbody.innerHTML = ClientsList.map((item) => `
    <tr>
      <td>${item[0]}</td>
      <td>${item[1]}</td>
      <td>${item[2]}</td>
      <td class="deleteBtn" onclick="deleteRow(this)">X</td>
    </tr>
  `).join('');
}




  function addToClientsTable(){
    
    let C1 =document.getElementById("C1").value;
    let C2 =document.getElementById("C2").value;
    let C3 =document.getElementById("C3").value;
    if (C1 === "" || C2 === "") {
    showAlert("من فضلك املأ جميع الحقول");
    return;
    }

    if (!/^(010|011|012|015)[0-9]{8}$/.test(C3)) {
    showAlert("تأكد من صحة رقم الهاتف");
    return;
}

    ClientsList.push([C1,C2,C3])

    let tbody = document.querySelector("#ClientsTable tbody");
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${C1}</td>
      <td>${C2}</td>
      <td>${C3}</td>
      <td class="deleteBtn" onclick="deleteRow(this)">X</td>
    `;
    tbody.appendChild(row);
    
  }

   function deleteRow(el) {

      let row = el.parentNode;
      let index = Array.from(row.parentNode.children).indexOf(row);
      ClientsList.splice(index, 1); // حذف الصف من المصفوفة
      row.remove();
      

    
  }

  function sendClientsData() {
    
    db.ref("Clients_LD").set(ClientsList);
    showAlert("تم الحفظ بنجاح");

  }
  






