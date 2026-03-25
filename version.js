const VERSION = 2; // رقم تلقائي لكل تحديث
  
  // ملفات CSS اللي عايز تحدثها
  const cssFilesToUpdate = ["style.css"];
  
  // ملفات JS اللي عايز تحدثها
  const jsFilesToUpdate = ["Home_js.js", "New_Order_js.js", "Accept_Orders_js.js", "Pended_Orders_js.js", "Cook_Orders_js.js", "Delivary_Orders_js.js", "Archive_Orders_js.js", "Clients_js.js", "Products_js.js" ];
  
  window.addEventListener("DOMContentLoaded", () => {
  
    // تحديث CSS
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      const href = link.getAttribute("href").split('?')[0];
      if (cssFilesToUpdate.includes(href)) {
        link.setAttribute("href", href + "?v=" + VERSION);
      }
    });
  
    // تحديث JS
    document.querySelectorAll('script[data-js-version]').forEach(script => {
      const src = script.getAttribute("src").split('?')[0];
      if (jsFilesToUpdate.includes(src)) {
        script.setAttribute("src", src + "?v=" + VERSION);
      }
    });
  
  });