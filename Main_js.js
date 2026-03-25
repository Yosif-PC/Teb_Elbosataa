
db.ref("Last_Invoice_Number").on("value", (snapshot)=>{
  const data = snapshot.val();
  document.getElementById("H1").textContent = "إجمالي الطلبات : " + Number(data)||0;
});

db.ref("Orders_LD").on("value", (snapshot)=>{
  const data = snapshot.val();
  document.getElementById("H2").textContent = "طلبات جديدة : " + Object.keys(data).length||0;
});

db.ref("Accept_Order_LD").on("value", (snapshot)=>{
  const data = snapshot.val();
  document.getElementById("H3").textContent = "في إنتظار العميل : " + Object.keys(data||0).length||0;
});

db.ref("Cook_Order_LD").on("value", (snapshot)=>{
  const data = snapshot.val();
  document.getElementById("H4").textContent = "في إنتظار التحضير : " + Object.keys(data||0).length||0;
});

db.ref("Delivary_Order_LD").on("value", (snapshot)=>{
  const data = snapshot.val();
  document.getElementById("H5").textContent = "في إنتظار التوصيل : " + Object.keys(data||0).length||0;
});

db.ref("Archive_Order_LD").on("value", (snapshot)=>{
  const data = snapshot.val();
  document.getElementById("H6").textContent = "الأرشيف : " + Object.keys(data||0).length||0;
});

db.ref("Clients_LD").on("value", (snapshot)=>{
  const data = snapshot.val();
  document.getElementById("H7").textContent = "عدد العملاء : " + Object.keys(data||0).length||0;
});

db.ref("Products_LD").on("value", (snapshot)=>{
  const data = snapshot.val();
  document.getElementById("H8").textContent = "عدد الأصناف : " + Object.keys(data||0).length||0;
});
