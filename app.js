document.querySelector('#generar-imagen').addEventListener('submit', cargarImagen);

document.querySelector('#Paginas').addEventListener('click', cargaImagenes);

let p = 1;

function cargaImagenes(e){
    e.preventDefault();
    
    document.getElementById("im").remove();
    p = document.getElementById("pag").value;
    
    //console.log(JSON.parse(p));
}

function cargarImagen(e){
    e.preventDefault();

    if(document.getElementById("im"))
        document.getElementById("im").remove();
    /*if(document.getElementById("pag"))
    {
        do{
            document.getElementById("pag").remove();
        }while (document.getElementById("Paginas").firstChild)
    }*/
        
    //document.getElementById("Galeria").removeChild('div');
    const cantidad = document.getElementById('numero').value;
    console.log(cantidad);
    
    let url = "";
    url += "https://picsum.photos/v2/list";
    let urlOrig = url;
    p = "1";

    let pages = 0;
    if(cantidad !== '')
    {
        pages = Math.floor(100/cantidad);//El numero de páginas
        console.log(pages);
        url += `?page=${p}&`;
        url += `limit=${cantidad}&`;
    }

    for(let i = 0; i < pages; i++)//Botones
    {
        let urlBoton = urlOrig;
        urlBoton += `?page=${i+1}&`;
        urlBoton += `limit=${cantidad}&`
        let boton = '';
        boton += `<li id="pag" class="b-pag" <a href="${urlBoton}"> `;
        boton += `${i+1}</a></li>`;
        document.getElementById("Paginas").innerHTML += boton;
    }

    //console.log(url);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function(){
        if(this.status === 200)
        {
            const imagenes = JSON.parse(this.responseText);
            //console.log(imagenes);

            let htmlImagen = '';
            imagenes.forEach(function(imagen){
                htmlImagen = '';
                htmlImagen = '<div id="im" class="b-1 col-m-4">';
                htmlImagen += `<img src="${imagen.download_url}" >`;
                htmlImagen += '</div>'
                //console.log(htmlImagen);
                document.getElementById("Galeria").innerHTML += htmlImagen;
                
            });
        }
    }

    xhr.send();
}