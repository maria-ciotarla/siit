$(document).ready( () => {
    var idToBeUpdate=""; //store the id which you want to update
    //(blocks) e ce returneaza ajax de la ruta /blocks
     //in lista cu id blocks definita in index.html luam array ul de obiecte stocat in variabila blocks, cu .map separam fiecare block si adaugam in lista prin codul html fiecare block
const getLink = (block) => {
    const {id}= block;
    return `<li id="${id}"><a href="#">${id}</a><button id="delete">Delete</button><button id="update">Update</button></li>`;
    //<li id="Fixed">Fixed</li>
}

$.ajax('/blocks' , {
    success: (blocks_returned) => { 
        const blockelements=blocks_returned.map(getLink);
        $('#listblocks').append(blockelements); 
    }
});

//Delete li
$('#listblocks').on('click','#delete', (event)=>{
    event.preventDefault();
     const id = $(event.currentTarget).parent().attr('id');
     console.log(id);
     $.ajax({
        type: 'DELETE',
        url: `/blocks/${id}`
    }).done(()=>{
        var li = $(`#${id}`);
        li.remove();
    }
    );

});
//update block
$('#listblocks').on('click','#update', (event)=>{
    event.preventDefault();
     const id = $(event.currentTarget).parent().attr('id');
     $('#legend').empty();
     $('#legend')[0].innerHTML="Block to be update";
     $('#updateinput').attr('value','Update this block');
     $.ajax(`/blocks/${id}`, {
        success: (block) => { 
            const {description}= block;
            $('#id').attr('value',id);
            $('#description').attr('value',description);
            idToBeUpdate=(id);
            console.log('stop');
        } })
        
    
})
//Show description when you click on id
$('#listblocks').on('click','a', (event)=>{
     event.preventDefault();
     const id = $(event.currentTarget).parent().attr('id');
    
     $.ajax(`/blocks/${id}`, {
        success: (block) => { 
            const {description}= block;
            $('#block-description').css('color','black').text(description); 
        },
    error: () => {
        $('#block-description').css('color','red').text('No block found'); 
    }
    });
 })

//post method
$('form').on('submit', (event) => {
    event.preventDefault();
    var form=$(this);
    if($('#updateinput').attr('value')=="Update this block"){
        var id=$('#id').val();
        var description=$('#description').val();
        $.ajax({
            type: 'PUT',
            url: `/blocks/${idToBeUpdate}?id="${id}"&description="${description}"`,
            data: {
            }
        })
        
        console.log(idToBeUpdate);
        location.reload();
    }

    else {   
     $.ajax({
        type: 'POST',
        url: '/blocks',
        data: {
            id: $('#id').val(),
            description:$('#description').val()
        }
        
    }).done((block)=>{
        $('#listblocks').append(getLink(block)); 
        form.trigger('reset');})
}})

});
