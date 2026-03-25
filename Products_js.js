
db.ref("Products_LD").on("value", (snapshot)=>{
  const data = snapshot.val();

  ProductsList=data||[]
  document.getElementById("loader").style.display = "none";
  renderTable();
});


///////////////////////////////////////////////////


const table = document.getElementById("ProductsTable");
const tbody = table.querySelector("tbody");

// رسم الجدول
function renderTable() {
  tbody.innerHTML = ProductsList.map((item) => `
    <tr>
      <td>${item[0]}</td>
      <td>${item[1]}</td>
      <td class="deleteBtn" onclick="deleteRow(this)">X</td>
      <td class="deleteBtn" onclick="editRow(this)">✎</td>
    </tr>
  `).join('');
}



  function addToProductsTable(){

    let P1 =document.getElementById("P1").value;
    let P2 =document.getElementById("P2").value;
    if (P1 === "" || P2 === "") {
    showAlert("من فضلك املأ جميع الحقول");
    return;
    }

    if (isNaN(P2) || Number(P2) <= 0) {
    showAlert("تأكد من صحة سعر الصنف");
    return;
}

    ProductsList.push([P1,P2])

    let tbody = document.querySelector("#ProductsTable tbody");
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${P1}</td>
      <td>${P2}</td>
      <td class="deleteBtn" onclick="deleteRow(this)">X</td>
      <td class="deleteBtn" onclick="editRow(this)">✎</td>
    `;
    tbody.appendChild(row);
    showAlert('✅')
    
  }

   function deleteRow(el) {

  
        let row = el.parentNode;
        let index = Array.from(row.parentNode.children).indexOf(row);
        ProductsList.splice(index, 1); // حذف الصف من المصفوفة
        row.remove();

    
  }


   function editRow(el) {

  
        let row = el.parentNode;
        let index = Array.from(row.parentNode.children).indexOf(row);
        document.getElementById("P1").value = ProductsList[index][0];
        document.getElementById("P2").value = ProductsList[index][1];
        ProductsList.splice(index, 1); // حذف الصف من المصفوفة
        row.remove();
        window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    
  }









  function sendProductsData() {
    db.ref("Products_LD").set(ProductsList);
    showAlert('تم حفظ المنتجات بنجاح ✅')

  }