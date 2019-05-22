$(document).ready(function () {

    cargarDatosTemas();
//    $("#respuestasModal").modal("show");
});

cargarDatosTemas = function () {
    var menu = $("#menuActivo").val();
    var submenu1 = $("#subMenuActivo").val();
    var materia = $("#materia").val();
    var periodo = $("#periodo").val();
    var perfil = $("#perfil").val();
    var ruta = $("#ruta").val();

    datos = {menu: menu, submenu: submenu1, materia: materia, periodo: periodo};

    $.ajax({
        type: "POST",
        url: ruta + 'ajax/respuestas.php?op=loadAll',
        dataType: "json",
        data: datos,
        success: function (data) {
            var array = data.data;

            if (array.length != 0) {
                Html = '<ul class="list-group">';
                $.each(array, function (key, registro) {
                    Html += '<li class="list-group-item text_center"><button type="button" class="btn btn-outline-secondary btn-block" data-toggle="modal" data-target="#respuestasModal" id="tbn_' + menu + '_' + submenu1 + '_' + registro.materias_id + '_' + registro.periodo_id + '" name="btn_' + menu + '_' + submenu1 + '_' + registro.materias_id + '_' + registro.periodo_id + '" onclick="modalParaRespuestas(' + registro.temas_id + ');" class="dropdown-item">' + registro.titulo_tema + '</button></li>';
//             Html += '<li class="list-group-item text_center"><a id="a_' + menu + '_' + submenu1 + '_' + registro.materias_id + '_' + registro.periodo_id + '" name="a_' + menu + '_' + submenu1 + '_' + registro.materias_id + '_' + registro.periodo_id + '" onclick="menuSubmenu(this); modalParaRespuestas('+registro.temas_id+');" class="dropdown-item">'+registro.titulo_tema+'</a></li>';
                    h5 = '(' + registro.materia + ' - ' + registro.periodo + ')';
                });
                Html += '</ul>';

                $("#listasTema").html(Html);
                $("#titleTema").html(h5);

            } else {
                alert('No existen datos registrados para la seleccion');
                location.reload();
                window.location.href = ruta;
            }


        },
        error: function (data) {
            alert('error *-*');
        }
    });
}

menuSubmenu = function (obj) {

    var Id = obj.id;
    var result = Id.split('_');
    menu = result[1];
    submenu = result[2];
    materia = result[3];
    periodo = result[4];
    menuActivo(menu, submenu, materia, periodo);

//    console.log(result);
//    alert('ddddddddddddX');


}

menuActivo = function (menu, submenu, materia, periodo) {
//    alert(materia);
    var datos = {menu: menu, submenu: submenu, materia: materia, periodo: periodo};
    var rutaLogin = $('#rutaHeader').val();

//    console.log(rutaLogin);
//    alert(222222);

    var url = rutaLogin + "ajax/login.php?op=menuActivo";
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: datos,
        success: function (result)
        {
//            alert(5);
//            return false;
        }
    });

    return false;
}

modalParaRespuestas = function (temas_id) {
    var ruta = $("#ruta").val();
    datos = {temas_id: temas_id};
    $.ajax({
        type: "POST",
        url: ruta + 'ajax/respuestas.php?op=loadTema',
        dataType: "json",
        data: datos,
        success: function (data) {
            var array = data.data;
//            console.log(array);

            $("#exampleModalLabel").html(array.titulo);
            $("#text_justify").html(array.descripcion);

            preguntas(temas_id);

        },
        error: function (data) {
            alert('error *-*');
        }
    });
}
preguntas = function (temas_id) {
    var ruta = $("#ruta").val();
    var array1 = null;
    datos = {temas_id: temas_id};

    $.ajax({
        type: "POST",
        url: ruta + 'ajax/respuestas.php?op=loadRespuestas',
        dataType: "json",
        data: datos,
        success: function (data1) {
            array1 = data1.data;
        },
        error: function (data1) {
            alert('error *-*1');
        }
    });

    $.ajax({
        type: "POST",
        url: ruta + 'ajax/respuestas.php?op=loadPreguntas',
        dataType: "json",
        data: datos,
        success: function (data) {
            var array = data.data;
            var Html = '';

            $.each(array, function (key, registro) {
//                console.log(registro);
                Html += '<div class="card w-100">\n\
                            <div class="card-body">\n\
                                <div class="form-group">\n\
                                    <label for="pregunta_' + registro.pregunta_id + '"><b>' + registro.pregunta + '</b></label>\n\
                                </div>\n\
                        ';
                Html += '<div class="card w-100">\n\
                                <div class="card-body">\n\
                                                        \n\
                                    <div class="row">\n\
                        ';

                $.each(array1, function (key, registro1) {
                    console.log(registro1);
                    if(registro.pregunta_id==registro1.pregunta_id){
                    Html += '\
                                        <div class="col-sm-6">\n\
                                            <div class="custom-control custom-radio custom-control-inline">\n\
                                                <input type="radio" id="radioRespuesta_' + registro.pregunta_id + '_'+registro1.pregunta_detalle_id+'" name="radioRespuesta_' + registro.pregunta_id + '" value="radioRespuesta_' + registro.pregunta_id + '_'+registro1.pregunta_detalle_id+'_'+registro1.respuesta+'" class="custom-control-input" required>\n\
                                                <label class="custom-control-label" for="radioRespuesta_' + registro.pregunta_id + '_'+registro1.pregunta_detalle_id+'">'+registro1.pregunta_detalle+'</label>\n\
                                            </div>\n\
                                        </div>\n\
                        ';
                    }
                });
                
                Html += '\
                                    </div>\n\
                                        \n\
                                </div>\n\
                         </div>\n\
                        ';
                Html += '   </div>\n\
                        </div>\n\
                        ';
                /*
                 <div class="col-sm-6">\n\
                 <div class="custom-control custom-radio custom-control-inline">\n\
                 <input type="radio" id="radioRespuesta_2" name="radioRespuesta" value="radioRespuesta_2" class="custom-control-input" required>\n\
                 <label class="custom-control-label" for="radioRespuesta_2">Respuestas 2</label>\n\
                 </div>\n\
                 </div>\n\
                 */

            });
//            console.log(array1);

            $("#preguntas").html(Html);
        },
        error: function (data) {
            alert('error *-*');
        }
    });




    /*
     
     */

}