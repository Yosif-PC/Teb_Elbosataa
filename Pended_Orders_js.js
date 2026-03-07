
let invoicesData = [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("popup_invoices").style.display = "flex";
});


db.ref("Accept_Order_LD").on("value", (snapshot)=>{
    const data = snapshot.val();
    document.getElementById("loader").style.display = "none";
    invoicesData=data||[]
    renderInvoiceList(invoicesData);})






// عرض قائمة الفواتير
function renderInvoiceList(list) {
  const container = document.getElementById("list_invoices");
  container.innerHTML = "";

  list.forEach(row => {
    const invoice = row[0];
    const client  = row[2];

    const btn = document.createElement("button");
    btn.className = "item-btn";
    btn.textContent = `${invoice} - ${client}`;

    btn.onclick = () => selectInvoice(invoice);

    container.appendChild(btn);
  });

  // إظهار رسالة لا توجد نتائج إذا القائمة فارغة
  document.getElementById("no_invoices").style.display = list.length === 0 ? "block" : "none";
}

// فلترة البحث داخل Popup
function filterInvoiceList(text) {
  const q = text.trim().toLowerCase();
  const filtered = invoicesData.filter(row => {
    const invoice = String(row[0]);
    const client  = String(row[2]);
    return invoice.includes(q) || client.toLowerCase().includes(q);
  });

  renderInvoiceList(filtered);
}
// اختيار فاتورة
function selectInvoice(invoiceNumber) {
  const row = invoicesData.find(r => r[0] == invoiceNumber);
  if (!row) return;

  fillInvoice(row);
  closePopup();
  return row;
}
// ملء الجداول
function fillInvoice(row) {
  document.getElementById("invoiceInfo").innerHTML = `
    <tr>
      <td>${row[0]}</td>
      <td>${row[2]}</td>
    </tr>
  `;

  document.getElementById("clientInfo").innerHTML = `
    <tr>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
    </tr>
  `;

  const itemsBody = document.getElementById("itemsTable");
  itemsBody.innerHTML = "";
  const items = row[9];

itemsBody.innerHTML = "";

items.forEach(item => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item[0]}</td>  <!-- الصنف -->
    <td>${item[1]}</td>  <!-- الكمية -->
    <td>${item[2]}</td>  <!-- السعر -->
    <td>${item[3]}</td>  <!-- الاجمالي -->
  `;

  itemsBody.appendChild(tr);
});


  document.getElementById("summaryTable").innerHTML = `
    <tr>
      <td>${row[5]}</td>
      <td>${row[6]}</td>
      <td>${row[7]}</td>
      <td>${row[8]} جنيه</td>
    </tr>
  `;
}

db.ref("Cook_Order_LD").on("value", (snapshot)=>{
    const data = snapshot.val();

    Cook_Order=data||[]})


db.ref("Accept_Order_LD").on("value", (snapshot)=>{
    const data = snapshot.val();

    Accept_Order_LD=data||[]})

db.ref("Orders_LD").on("value", (snapshot)=>{
    const data = snapshot.val();

    Orders_LD=data||[]})



function Accepted() {
    
    // 1️⃣ جلب بيانات الطلبات المقبولة
//const Cook_Order = JSON.parse(localStorage.getItem("Cook_Order_LD")) || [];

// 2️⃣ تحديد رقم الفاتورة من الجدول
const invoiceNumber = document.querySelector("#invoiceInfo tr").cells[0].innerText;

// 3️⃣ جلب الصف المطلوب من Orders_LD
//let Accept_Order_LD = JSON.parse(localStorage.getItem("Accept_Order_LD")) || [];
const rowToRemove = Accept_Order_LD.find(r => r[0] == invoiceNumber); // استخدم == بدل ===

// 4️⃣ أضف للطلبات المقبولة
if(rowToRemove){
    Cook_Order.push(rowToRemove);
    //localStorage.setItem("Cook_Order_LD", JSON.stringify(Cook_Order));
    db.ref("Cook_Order_LD").set(Cook_Order);
    // 5️⃣ حذف الصف من Orders_LD
    Accept_Order_LD = Accept_Order_LD.filter(row => 
        row.map(String).join(",") !== rowToRemove.map(String).join(",")
    );
    //localStorage.setItem("Accept_Order_LD", JSON.stringify(Accept_Order_LD));
    db.ref("Accept_Order_LD").set(Accept_Order_LD);
    showAlert('تم تأكيد الطلب  ✅')
    setTimeout(() => {
    document.getElementById("popup_invoices").style.display = "flex";
  }, 2000);
}else{
    showAlert('الطلب غير موجود ❌')
}

}


function Rejected() {
    
// 2️⃣ تحديد رقم الفاتورة من الجدول
const invoiceNumber = document.querySelector("#invoiceInfo tr").cells[0].innerText;

// 3️⃣ جلب الصف المطلوب من Orders_LD
//let Accept_Order_LD = JSON.parse(localStorage.getItem("Accept_Order_LD")) || [];
const rowToRemove = Accept_Order_LD.find(r => r[0] == invoiceNumber); // استخدم == بدل ===

// 4️⃣ أضف للطلبات المقبولة
if(rowToRemove){
    // 5️⃣ حذف الصف من Orders_LD
    Accept_Order_LD = Accept_Order_LD.filter(row => 
        row.map(String).join(",") !== rowToRemove.map(String).join(",")
    );
    //localStorage.setItem("Accept_Order_LD", JSON.stringify(Accept_Order_LD));

    db.ref("Accept_Order_LD").set(Accept_Order_LD);
    showAlert('تم حذف الطلب بنجاح ✅')  
  setTimeout(() => {
    document.getElementById("popup_invoices").style.display = "flex";
  }, 2000);
}else{
    showAlert('الطلب غير موجود ❌')
}

}


function BackInvoice() {
    
// 2️⃣ تحديد رقم الفاتورة من الجدول
const invoiceNumber = document.querySelector("#invoiceInfo tr").cells[0].innerText;

// 3️⃣ جلب الصف المطلوب من Orders_LD
//let Accept_Order_LD = JSON.parse(localStorage.getItem("Accept_Order_LD")) || [];

const rowToRemove = Accept_Order_LD.find(r => r[0] == invoiceNumber); // استخدم == بدل ===

// 4️⃣ أضف للطلبات المقبولة
if(rowToRemove){
    // 5️⃣ حذف الصف من Orders_LD
    Accept_Order_LD = Accept_Order_LD.filter(row => 
        row.map(String).join(",") !== rowToRemove.map(String).join(",")
    );
    //localStorage.setItem("Accept_Order_LD", JSON.stringify(Accept_Order_LD));
    db.ref("Accept_Order_LD").set(Accept_Order_LD);
    //let Orders_LD = JSON.parse(localStorage.getItem("Orders_LD")) || [];
    Orders_LD.push(rowToRemove)
    //localStorage.setItem("Orders_LD", JSON.stringify(Orders_LD));
    db.ref("Orders_LD").set(Orders_LD);

    showAlert('تم إرجاع الطلب  ✅')
    setTimeout(() => {
    document.getElementById("popup_invoices").style.display = "flex";
  }, 2000);
}else{
    showAlert('الطلب غير موجود ❌')
}

}











function Open_Whatsapp() {
  window.open(`https://wa.me/2${document.querySelector("#clientInfo tr").cells[1].innerText}`, "_blank");
}









// إغلاق Popup
function closePopup() {
  document.getElementById("popup_invoices").style.display = "none";
}


function Print(){

html2canvas(document.getElementById("Print_Area")).then(function(canvas){

    const link = document.createElement("a");
    link.download = `${document.querySelector("#invoiceInfo tr").cells[0].innerText}-${document.querySelector("#invoiceInfo tr").cells[1].innerText}.png`;
    link.href = canvas.toDataURL();
    link.click();

});

}