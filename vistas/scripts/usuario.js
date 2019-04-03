var tabla;

$(document).ready(function () {

    callAllUser();
  
});


callAllUser = function () {

    var response = null;
    $.ajax({
        type: "POST",
        url: '../ajax/usuario.php?op=listar',
        async: false,
        success: function (result) {
            response = JSON.parse(result).data;
        }
    });

     //console.log("res-> \n");
     //console.log(response);

    tabla=$('#user_data').DataTable({
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sSearchPlaceholder": "Buscar...",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        "order": [[0, "desc"]],
        data: response,
        "columns": [
            { "data": "idusuario" },
            { "data": "nombre" },
            { "data": "tipo_documento" },
            { "data": "direccion" },
            { "data": "telefono" },
            { "data": "email" },
            { "data": "cargo" },
            { "data": "login" },
            {data: null, render: function (data, type, row) {
                return  data.condicion === '1' ? '<i class="fas fa-user-check" style="font-size:18px;color:green" title="Activo"></i>' : '<i class="fas fa-user-shield" style="font-size:18px;color:red" title="inactivo"></i>';
                }, className: "center"
            }, 
            {data: null, render: function (data, type, row) {
                return  '<i class="fa fa-pencil-square-o fa-4 pointer" aria-hidden="true" style="font-size:18px;color:blue" onclick=\"activarInativar(' + data.idusuario + ')\" title="Modificar Usuario"></i>&nbsp; | &nbsp;\n\
                        <i class="fas fa-trash-alt" style="font-size:18px;color:red" onclick=\"activarInativar(' + data.idusuario + ')\" title="Eliminar Usuario"></i>';
                }, className: "center"
            }                       
        ]
    });
    
};

activarInativar = function (idusuario){
    alert(idusuario);
    //tabla.ajax.reload();
    //location.reload();
}

bloquearModal = function (){
        $("#userModal").modal({backdrop: "static", keyboard: false})
        $("#userModal").modal("show");  
}

registrarUsuario = function (){


    alert(1);

    return false;




    var ruta = $('#ruta').val();

    // var formData = new FormData($("#registroUsuario")[0]);

    // var response = null;
    // $.ajax({
    //     type: "POST",
    //     url: '../ajax/usuario.php?op=listar',
    //     async: false,
    //     success: function (result) {
    //         response = JSON.parse(result).data;
    //     }
    // });

    var datos = $('#registroUsuario').serialize();

    // console.log(datos);
    // return false;

    // var tipo_documento=$('#tipo_documento').val();
    // var num_documento=$('#num_documento').val();
    // var nombre=$('#nombre').val();
    // var direccion=$('#direccion').val();
    // var telefono=$('#telefono').val();
    // var telefono=$('#telefono').val();
    // var email=$('#email').val();
    // var cargo=$('#cargo').val();
    // var login=$('#login').val();
    // var clave=$('#clave').val();
    // var condicion=$('#condicion').val();

    var url = "../ajax/usuario.php?op=insert";
    $.ajax({                        
        type: "POST",                 
        url: url,
        data: datos,                    
        // data: {
        //     tipo_documento: tipo_documento, 
        //     num_documento: num_documento,
        //     nombre: nombre,
        //     direccion: direccion,
        //     telefono: telefono,
        //     telefono: telefono,
        //     email: email,
        //     cargo: cargo,
        //     login: login,
        //     clave: clave,
        //     condicion: condicion
        // },
        success: function(data)            
        {
          //$('#resp').html(data);           
        }
      });
    
    
    
    
    //return true;



    //window.location.href = ruta; 


    // var dataString = $('#registroUsuario').serialize();
    // console.log(dataString);
    // alert(1);
}