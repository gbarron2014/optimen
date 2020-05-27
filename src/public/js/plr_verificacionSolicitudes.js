function gettear(numTrabajador){
    $.ajax({
        url: `/planner/verificacion/getCallen/${numTrabajador}`,
        success: function (data) {
            let content = $('#calendar');
            $('#alerta').hide();
            console.log(data);

            $(content).fullCalendar('removeEventSources');
            //Inicia el calendario
            $(content).fullCalendar('addEventSource',data);
            $(content).show();
        }
    });
    
}

$(document).ready(function(){
    $('#calendar').hide();
    $('#tablaTripulantes').DataTable({
        language:{
            url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        paging: false, 
        scrollY:350,
        ordering:false
    });

    $('#calendar').fullCalendar({
        locale: 'es',
        eventClick: function (event){
            console.log(event);
            var estado = swal({
                title: 'Validar solicitud',
                text: 'Selecciona la opción deseada',
                icon: "warning",
                closeOnClickOutside: false,
                buttons: {
                    aprobado: {
                        text: "Aprobar",
                        value: "aprobada"
                    },
                    rechazar: {
                        text: "Rechazar",
                        value: "rechazada"
                    },
                    cancel: {
                        text:"Cancelar",
                        value: true,
                        visible: true,
                        className: "red-bg",
                        closeModal: true
                    }
                }
            })
                .then((value)=>{
                    if(value==true){
                        swal.close();
                    }else{
                        idSoli = event.id;
                        datos = {idSoli,estado};
                        $.ajax({
                            type: "POST",
                            url: `/planner/verificacion/updateGantt/${value}/${idSoli}`,
                            data: datos,
                            dataType: "JSON"
                        });
                        swal("Actualizado","Estado de solicitud actualizado satisfactoriamente","success");
                        location.reload();
                    }
                });
        }
    });
});