

$(document).ready(() => {

    var nr = 1, p = 1, row = '<div class = "row">';
    var updateProduct = "";

    const getLink = (product, products_length) => {
        //Collect the images and display in produse.html

        if (nr <= 3 && p < products_length) {
            const { name } = product;
            const { description } = product;
            const { price } = product;
            const { url } = product;
            row += '<div class = "col-md-4">';
            row += `<img id="product" class="product" src = "${url}" ><div id="productName">${name}</div><div id="productDescription">${description}</div><div id="productPrice">${price}</div></div>`;
            nr++;
            p++;
            return 0;
        }
        else if (p == products_length) {
            const { name } = product;
            const { description } = product;
            const { price } = product;
            const { url } = product;
            row += '<div class = "col-md-4">';
            row += `<img id="product" class="product" src = "${url}" ><div id="productName">${name}</div><div id="productDescription">${description}</div><div id="productPrice">${price}</div></div>`;
            row += '</div></div>';
            return row;
        }
        else {
            nr = 1;
            row += '</div>';
            var aux = row;
            row = '<div class = "row">';
            const { name } = product;
            const { description } = product;
            const { price } = product;
            const { url } = product;
            row += '<div class = "col-md-4">';
            row += `<img id="product" class="product" src = "${url}" ><div id="productName">${name}</div><div id="productDescription">${description}</div><div id="productPrice">${price}</div></div>`;
            nr++;
            p++;
            return aux;
        }
    }

    const getLinkEdit = (product, products_length) => {

        const { name } = product;
        const { description } = product;
        const { price } = product;
        const { url } = product;
        row = `<li id="${name}"> <div>Name: ${name}</div><div>Description: ${description}</div><div>URL: ${url}</div><div>Price: ${price}
        <button id="delete" >Delete</button>
        <button id="update">Update</button></div></li>`;
        return row;
    }

    //Request for produse.html
    $.ajax('/db', {
        success: (products_returned) => {
            const row_returned = products_returned.map((product) => {
                var ret = getLink(product, products_returned.length);
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

                    this.style.height = "350px";
                    this.style.width = "300px";
                })
            }
        }
    });
    //Request for admin.html
    $.ajax('/db', {
        success: (products_returned) => {
            const row_returned = products_returned.map((product) => {
                var ret = getLinkEdit(product, products_returned.length);
                if (ret != 0) {
                    $('#adminList').append(ret);
                }
            });
        }
    });
    //delete
    $("#adminList").on("click", "#delete", (event) => {
        event.preventDefault();
        const id = $(event.currentTarget).parent().parent().attr('id');

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
        $('#feedback')[0].innerHTML="";    
        $.ajax('/db', {
            success: (products_returned) => {
                let filteredProduct = products_returned.filter(product => product.name == id);
                $('#name').val(filteredProduct[0].name);
                updateProduct = filteredProduct[0].name;
                $('#description').val(filteredProduct[0].description);
                $('#url').val(filteredProduct[0].url);
                $('#price').val(filteredProduct[0].price);
                $("form #legend")[0].innerHTML = "Actualizeaza produsul";
                $("#insertUpdate").attr('value', 'Actualizeaza');
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
            }).done((result)=>{
                $('#feedback')[0].innerHTML="Produsul a fost actualizat";
                console.log(result);
                location.reload();
               
            });
             
        }
        //insert new product in db
        else {
            var form = $(this);
            $('#feedback')[0].innerHTML="";    
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
                $('#feedback')[0].innerHTML="Produsul a fost adăugat";    
            })

        }

    })
})

