function refreshPage() {
    document.getElementById("htmlInput").value = "";
    document.getElementById("output").innerText = "Console Output...";
}

function matchAll(body, regex, count) {
    let matches = [...body.matchAll(regex)].slice(0, count).map(m => m[1]);
    return matches.length === count ? matches.join('-') : null;
}

function getMatch([start, end = ''], elements, text) {
    const pattern =
      start +
      elements.reduce(
        (acc, elem) => acc + `${!acc ? '\\s*' : ''}<${elem}[^>]*>\\s*`,
        '',
      ) +
      '([^<]+)' +
      end;
    return text.match(new RegExp(pattern))?.[1]?.trim();
  }


function processOrder() {
    let body = document.getElementById("htmlInput").value;
    let type = document.getElementById("statusSelect").value;
    let orderNumber, orderDate, qty, totalprice, priceEach;
    

    switch (type) {
        case 'ordered':
            const regex = /^\d{3}-\d{7}-\d{7}$/;
           
            // First way
            const opart1 = body.match(/Order\s#<\/span>\s*<span[^>]*>[^<]*<span[^>]*>(\d+)<\/span>/)?.[1]?.trim();
            const opart2 = body.match(/Order\s#<\/span>\s*<span[^>]*>[^<]*<span[^>]*>\d+<\/span>-\s*<span[^>]*>(\d+)<\/span>/)?.[1]?.trim();
            const opart3 = body.match(/Order\s#<\/span>\s*<span[^>]*>[^<]*<span[^>]*>\d+<\/span>-\s*<span[^>]*>\d+<\/span>-\s*<span[^>]*>(\d+)<\/span>/)?.[1]?.trim();
            const oway1 = opart1 + '-' + opart2 + '-' + opart3;
            // Second way
            const matches = [...body.matchAll(/<span[^>]*>(\d+)<\/span>/g)];
            const oway2 = matches.map(match => match[1]).join('-');
            // Third way
            const oway3 = body.match(/Order\s#.*?<span[^>]*>\s*([\d-]+)\s*<\/span>/)?.[1]?.trim() || null;
            // Fourth way
            const oway4 = body.match(/Order #\s*<\/span>\s*<\/p>\s*<p[^>]*>\s*<span[^>]*>\s*(\d{3}-\d{7}-\d{7})<\/span>/)?.[1] || null;
            // Fifth way
            const oway5 = getMatch(['Order #'], ['', 'span'], body);
            // Sixth way
            const orderRegex5 = /Order #.*?(\d{3}-\d{7}-\d{7})/;
            const orderMatch5 = body.match(orderRegex5);
            const oway6 = orderMatch5 ? orderMatch5[1] : "Order not found";



            if (/^\d{3}-\d{7}-\d{7}$/.test(oway1)){
                orderNumber = oway1;
            } else if (/^\d{3}-\d{7}-\d{7}$/.test(oway2)){
                orderNumber = oway2;
            }
            else if (/^\d{3}-\d{7}-\d{7}$/.test(oway3)){
                orderNumber = oway3;
            }
            else if (/^\d{3}-\d{7}-\d{7}$/.test(oway4)){
                orderNumber = oway4;
            }
            else if (/^\d{3}-\d{7}-\d{7}$/.test(oway5)){    
                orderNumber = oway5;
            }
            else if (/^\d{3}-\d{7}-\d{7}$/.test(oway6)){
                orderNumber = oway6;
            }
            else {
                orderNumber = "Not found";
            }


            // quantity
            // way 1
            const oqty1 = +body.match(/Qty\s*:\s*(\d+)/)?.[1];
            // way 2
            const oqty2 = body.match(/Quantity:\s*(\d+)/);

            if (oqty1){
                qty = oqty1;
            }
            else if (oqty2){
                qty = +oqty2[1];
            }
            else {
                qty = "Not found";
            }
    
            
            // price
            // way 1
            const priceregex = /Total.*?(\$\d+\.\d{2})/;
            const oprice1 = body.match(priceregex);
            // way 2
           const totalPay = body.match(/Order Total:\s*<\/span>\s*<\/p>\s*<\/td>\s*<td[^>]>\s<p[^>]>\s<span[^>]>\s\$([\d,.]+)/)?.[1];
           const oprice2 = +totalPay?.replace(/,/g, '');
            //  way 3
           const oprice3 = parseFloat(body.match(/Order Total:\s*<\/span>\s*<\/p>\s*<\/td>\s*<td[^>]*>\s*<p[^>]*>\s*<span[^>]*>\s*\$([\d,.]+)/)?.[1]?.replace(/,/g, '')) || 0;

           if (oprice1){
                totalprice = oprice1[1];
              } else if (oprice2){ 
                totalprice = oprice2;
              }
              else if (oprice3){
                totalprice = oprice3;
              }
              else {
                totalprice = oprice3;
              }
           // price each
           
           if (typeof totalprice === 'string') {
               // Remove '$' if it exists and convert to number
               totalprice = parseFloat(totalprice.replace('$', ''));
            }
            
           priceEach = totalprice / qty;

           itemName = "will be added later";

           break;

    

            





        case 'shipped':
            const part1s = body.match(/Order\s#<\/span>\s*<span[^>]*>[^<]*<span[^>]*>(\d+)<\/span>/)?.[1]?.trim();
            const part2s = body.match(/Order\s#<\/span>\s*<span[^>]*>[^<]*<span[^>]*>\d+<\/span>-\s*<span[^>]*>(\d+)<\/span>/)?.[1]?.trim();
            const part3s = body.match(/Order\s#<\/span>\s*<span[^>]*>[^<]*<span[^>]*>\d+<\/span>-\s*<span[^>]*>\d+<\/span>-\s*<span[^>]*>(\d+)<\/span>/)?.[1]?.trim();
            orderNumber = part1s + '-' + part2s + '-' + part3s;
        
            if (/^\d{3}-\d{7}-\d{7}$/.test(orderNumber)){
                const part1s = body.match(/Order\s#<\/span>\s*<span[^>]*>[^<]*<span[^>]*>(\d+)<\/span>/)?.[1]?.trim();
                const part2s = body.match(/Order\s#<\/span>\s*<span[^>]*>[^<]*<span[^>]*>\d+<\/span>-\s*<span[^>]*>(\d+)<\/span>/)?.[1]?.trim();
                const part3s = body.match(/Order\s#<\/span>\s*<span[^>]*>[^<]*<span[^>]*>\d+<\/span>-\s*<span[^>]*>\d+<\/span>-\s*<span[^>]*>(\d+)<\/span>/)?.[1]?.trim();
                orderNumber = part1s + '-' + part2s + '-' + part3s;
            }
            else {
                const ordernumber2s = body.match(/Order\s#.*?<span[^>]*>\s*([\d-]+)\s*<\/span>/)?.[1]?.trim();
                orderNumber = ordernumber2s;
            }
            if (/^\d{3}-\d{7}-\d{7}$/.test(orderNumber)){
                const ordernumber2s = body.match(/Order\s#.*?<span[^>]*>\s*([\d-]+)\s*<\/span>/)?.[1]?.trim();
                orderNumber = ordernumber2s;
            }
            else {
            const ordernumber3s = getMatch(['Order #'], ['', 'span'], body);
            orderNumber = ordernumber3s;
            }
            if (/^\d{3}-\d{7}-\d{7}$/.test(orderNumber)){
                const ordernumber3s = getMatch(['Order #'], ['', 'span'], body);
                orderNumber = ordernumber3s;
            }
            else {
                orderNumber = "Not found";
            }
           
            break;
        case 'delivered':

                orderNumber = body.match(/Order #<\/span><\/div><\/td><\/tr><tr><td[^>]*><div[^>]*><span[^>]*>([\d-]+)/)?.[1] || 
                matchAll(body, /<span[^>]*>(\d+)<\/span>/g, 3);
            
            break;
    }

document.getElementById("output").innerText = `
Order Number: ${orderNumber || "Not found"}
item Name: ${itemName || "N/A"}
Quantity: ${qty || "N/A"}
Total Price: ${totalprice || "N/A"}
Price Each: ${priceEach || "N/A"}
`.trim();
}
