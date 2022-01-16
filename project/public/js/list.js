$(document).ready(() => {


    window.addEventListener('load', () => {
        // const params = (new URL(document.location)).searchParams
        const test = localStorage.getItem("orderList")
        const list = JSON.parse(test)


        if (list.length != 0) {
            let factura = 0;

            list.forEach(item => {
                const { name, price, amount, total } = item;
                const row = `<tr><td>${name}</td><td>${price} lei</td><td>${amount}</td></tr>`
                $("#order").append(row)
                factura += parseInt(total);

            })
            $("#factura")[0].innerText=factura+ " lei"
            $("#nrProduse")[0].innerText=list.length;
        }

        $("#confirma").on("click",()=>{
            alert("Comanda a fost plasată")
        })
    })
    


})