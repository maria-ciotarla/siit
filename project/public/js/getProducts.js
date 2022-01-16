
$(document).ready(() => {

    var nr = 1, p = 1, row = '<div class = "row">';
    var updateProduct = "";

    const getLink = (product, products_length) => {
        //Collect the images and display in produse.html

        if (nr <= 3 && p < products_length) {
            const { name,description,price,url } = product;
            
            row += '<div class = "col-md-4">';
            row += `<div class="card">
                <img id="product" class="product" src = "${url}" >
                <div id="productName">${name}</div>
                <div id="productDescription">${description}</div>
                <div id="productPrice">${price}</div>
                <input type="number" step="1" value="1" min="1" max="1000">
                <button class="add"> Adaugă în coș</button>
                </div></div>`;
            nr++;
            p++;
            return 0;
        }
        else if (p == products_length) {
            const { name,description,price,url } = product;
            
            row += '<div class = "col-md-4">';
            row += `<div class="card">
                <img id="product" class="product" src = "${url}" >
                <div id="productName">${name}</div>
                <div id="productDescription">${description}</div>
                <div id="productPrice">${price}</div>
                <input type="number" step="1" value="1" min="1" max="1000">
                <button class="add"> Adaugă în coș</button>
                </div></div>`;
            row += '</div></div>';
            return row;
        }
        else {
            nr = 1;
            row += '</div>';
            var aux = row;
            row = '<div class = "row">';
            const { name,description,price,url } = product;
           
            row += '<div class = "col-md-4">';
            row += `<div class="card">
                <img id="product" class="product" src = "${url}" >
                <div id="productName">${name}</div>
                <div id="productDescription">${description}</div>
                <div id="productPrice">${price}</div>
                <input type="number" step="1" value="1" min="1" max="1000">
                <button class="add"> Adaugă în coș</button>
                </div></div>`;
            nr++;
            p++;
            return aux;
        }
    }

    const getLinkEdit = (product, products_length) => {

        const { name,description,price,url } = product;
       
        row = `<li id="${name}"> <div>Name: ${name}</div>
            <div>Description: ${description}</div>
            <div>URL: ${url}</div>
            <div>Price: ${price}
            <button id="delete" >Delete</button>
            <button id="update">Update</button></div>
            </li>`;
        return row;
    }

    //Request for produse.html
    $.ajax('/db', {
        success: (productsReturned) => {
            const rowReturned = productsReturned.map((product) => {
                var ret = getLink(product, productsReturned.length);
                if (ret != 0) {
                    $('#products').append(ret);
                }


            });

            //Add mouseover and mouse out for each image.
            var images = $("#products").find(".product");
            for (let i = 0; i < images.length; i++) {
                images[i].addEventListener("mouseover", function () {

                    this.style.height = "400px";
                    this.style.width = "350px";
                })
                images[i].addEventListener("mouseout", function () {

                    this.style.height = "300px";
                    this.style.width = "250px";
                })
            }
        }
    });
    //Request for admin.html
    $.ajax('/db', {
        success: (productsReturned) => {
            const row_returned = productsReturned.map((product) => {
                var ret = getLinkEdit(product, productsReturned.length);
                if (ret != 0) {
                    $('#adminList').append(ret);
                }
            });
        }
    });
    //delete
    $("#adminList").on("click", "#delete", (event) => {
        event.preventDefault();
        const id = $(event.currentTarget).closest("li").attr('id');  ////closest.id

        $.ajax({
            type: 'DELETE',
            url: `/delete/${id}`
        }).done(() => {
            var li = document.getElementById(`${id}`);
            li.remove();
            console.log(li);
        }
        );
    })

    //update form
    $('#adminList').on('click', '#update', (event) => {
        event.preventDefault();
        const id = $(event.currentTarget).parent().parent().attr('id');
        $('#feedback')[0].innerHTML = "";
        $.ajax('/db', {
            success: (productsReturned) => {
                let filteredProduct = productsReturned.filter(product => product.name == id);
                const {name,description,price,url}=filteredProduct[0];
                $('#name').val(name);
                updateProduct = name;
                $('#description').val(description);
                $('#url').val(url);
                $('#price').val(price);
                $("form #legend")[0].innerHTML = "Actualizeaza produsul";
                $("#insertUpdate").attr('value', 'Actualizeaza');
                window.scroll(top)
            }
        });

    })

    //post/insert or put/update according to submit value
    $('form').on('submit', (event) => {
        event.preventDefault();

        //update a product in db
        if ($('#insertUpdate').attr('value') == "Actualizeaza") {

            var name = $('#name').val();
            var description = $('#description').val();
            var url = $('#url').val();
            var price = $('#price').val();
            $.ajax({
                type: 'PUT',
                url: `/update/${updateProduct}?name="${name}"&description="${description}"&url="${url}"&price="${price}"`,
                data: {
                }
            }).done((result) => {
                $('#feedback')[0].innerHTML = "Produsul a fost actualizat";
                console.log(result);
                location.reload();

            });

        }
        //insert new product in db
        else {
            var form = $(this);
            $('#feedback')[0].innerHTML = "";
            var name = $('#name').val();
            var description = $('#description').val();
            var url = $('#url').val();
            var price = $('#price').val();

            $.ajax({
                type: 'POST',
                url: "/insert",
                data: {
                    name: $('#name').val(),
                    description: $('#description').val(),
                    url: $('#url').val(),
                    price: $('#price').val()
                }

            }).done((product) => {

                $('#adminList').append(getLinkEdit(product));
                form.trigger('reset');
                $('#feedback')[0].innerHTML = "Produsul a fost adăugat";
            })

        }

    })
})

