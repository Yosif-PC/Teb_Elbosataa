
function selectClient(val) {
    document.getElementById("Cl").value = val;
    const index = ClientsList.findIndex(row => row[0] === val);
    document.getElementById("Cl_Phone").value = (index >= 0) ? ClientsList[index][1] || "" : "";
    document.getElementById("Cl_Address").value = (index >= 0) ? ClientsList[index][2] || "" : "";

    closePopup("popup_CL");
}

function selectProduct(val) {
    document.getElementById("D1").value = val;
    const index = ProductList.findIndex(row => row[0] === val);
    document.getElementById("D3").value = (index >= 0) ? ProductList[index][1] || 0 : 0;
    closePopup("popup_D1");

    

    
}

function attachButtons(listContainer, type) {
    const buttons = listContainer.querySelectorAll(".item-btn");
    buttons.forEach(btn => {
        btn.onclick = null;
        btn.addEventListener("click", function () {
            const val = this.innerText.trim();
            if (type === 'CL') selectClient(val);
            else if (type === 'Pr') selectProduct(val);
        });
    });
}


db.ref("Clients_LD").on("value", (snapshot)=>{
    const data = snapshot.val();
    ClientsList=data||[]
    const list_CL = document.getElementById("list_CL");
    list_CL.innerHTML = ClientsList.map(p => `<button class="item-btn">${p[0]}</button>`).join('');
    attachButtons(list_CL, 'CL');
    document.getElementById("loader").style.display = "none";
    })


document.getElementById("Cl").addEventListener("click", () => {
document.getElementById("popup_CL").style.display = 'flex';});



db.ref("Products_LD").on("value", (snapshot)=>{
    const data = snapshot.val();
    ProductList=data||[]
    const list_Pr = document.getElementById("list_D1");
    list_Pr.innerHTML = ProductList.map(p => `<button class="item-btn">${p[0]}</button>`).join('');
    attachButtons(list_Pr, 'Pr');
    })

document.getElementById("D1").addEventListener("click", () => {
    document.getElementById("popup_D1").style.display = 'flex';
});



// === إغلاق Popup عند الضغط خارج المحتوى ===
document.querySelectorAll(".popup").forEach(p => {
    p.addEventListener("click", e => {
        if (e.target === p) closePopup(p.id);
    });
});
function closePopup(id) {
    const p = document.getElementById(id);
    p.style.display = "none";
    p.hidden = true;}


// === فلترة البحث داخل كل Popup ===
function filterList(popupId, text) {
    const p = document.getElementById(popupId);
    if (!p) return;
    const items = p.querySelectorAll(".item-btn");
    const noElem = p.querySelector(".no-results");
    const q = text.trim().toLowerCase();
    let shown = 0;

    items.forEach(btn => {
        const itemText = btn.innerText.trim().toLowerCase();
        if (q === "" || itemText.includes(q)) {
            btn.style.display = "block";
            shown++;
        } else btn.style.display = "none";
    });

    if (noElem) noElem.style.display = (shown === 0) ? "block" : "none";

}





let Order_Data = [];
let summ = 0;


// === إضافة صف إلى الجدول ===
function addToTable() {
    const D1 = document.getElementById("D1").value;
    const D2 = Number(document.getElementById("D2").value);
    const D3 = Number(document.getElementById("D3").value);
    if (!D1 || !D2 || !D3){ showAlert('تأكد من مدخلاتك')
         return};

    Order_Data.push([D1, D2, D3, D2 * D3]);
    updateTable();
}

// === تحديث الجدول ===
function updateTable() {
    const tbody = document.querySelector("#resultsTable tbody");
    tbody.innerHTML = "";
    summ = Order_Data.reduce((sum, row) => sum + Number(row[3]), 0);
    Order_Data.forEach((row, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td>
                        <td class="deleteBtn" onclick="deleteRow(${i})">X</td>`;
        tbody.appendChild(tr);
    });
    updateSummary();
}

// === حذف صف ===
function deleteRow(i) {
    
    Order_Data.splice(i, 1);
    updateTable();
}

// === تحديث ملخص الطلب ===
function updateSummary() {
    const D5 = Number(document.getElementById("D5").value || 0);
    const D6 = Number(document.getElementById("D6").value || 0);
    const tbody2 = document.querySelector("#resultsTable2 tbody");
    tbody2.innerHTML = `<tr><td>${summ}</td><td>${D5}</td><td>${D6}</td><td>${summ + D5 - D6}</td></tr>`;
}

// === تحديث ملخص الطلب عند تغيير التوصيل أو الخصم تلقائياً ===
document.getElementById("D5").addEventListener("input", updateSummary);
document.getElementById("D6").addEventListener("input", updateSummary);



db.ref("Orders_LD").on("value", (snapshot)=>{
  const data = snapshot.val();

  The_Order=data||[]
});

db.ref("Last_Invoice_Number").on("value", (snapshot)=>{
  const data = snapshot.val();

  invoiceNumber=Number(data+1)||1
});




function sendData() {

    if (document.getElementById("Cl").value==""){
        showAlert('يجب اختيار عميل')
         return};

    if (Order_Data.length==0 ){
        showAlert('أضف صنف واحد على الأقل')
         return};
    

    const D5 = Number(document.getElementById("D5").value || 0);
    const D6 = Number(document.getElementById("D6").value || 0);
    const totalRequired = summ + D5 - D6;

    const today = new Date();
    
    


    //const The_Order = JSON.parse(localStorage.getItem("Orders_LD"))||[];
    //const invoiceNumber = Number(localStorage.getItem("Last_Invoice_Number"))+1 || 1;
    document.getElementById("invoice").textContent = "فاتورة رقم : " + invoiceNumber;

    The_Order.push(
    [
        invoiceNumber,
        today.toLocaleDateString(),
        document.getElementById("Cl").value,
        document.getElementById("Cl_Phone").value,
        document.getElementById("Cl_Address").value,
        summ,
        D5,
        D6,
        totalRequired,
        Order_Data]);

    //localStorage.setItem("Last_Invoice_Number", invoiceNumber);
    db.ref("Last_Invoice_Number").set(invoiceNumber);
    //localStorage.setItem("Orders_LD", JSON.stringify(The_Order));
    db.ref("Orders_LD").set(The_Order);
    showAlert('تم الحفظ بنجاح ✅')




}


