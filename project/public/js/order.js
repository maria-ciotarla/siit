$(document).ready(() => {
    const list = [];
    $("#products").on("click", ".add", (event) => {
        event.preventDefault();

        const card = $(event.currentTarget).parent().children();

        const item = {}
        item.name = card[1].innerText,
            item.price = parseInt(card[3].innerText),
            item.amount = parseInt(card[4].value),
            item.total = item.price * item.amount + " lei"
        list.push(item)
    
        localStorage.setItem("orderList", JSON.stringify(list))
        //localStorage.setItem("orderList", "textttt")
        $("#badge")[0].innerText=list.length;
        console.log("text")
    })
    $('#notification').on("click", () => {
        location.href = "order.html";

    })

})
