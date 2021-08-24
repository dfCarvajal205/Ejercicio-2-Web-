const fs = require('fs');
const http = require('http');
const axios = require('axios');

http.createServer( function (req, res)  {
    //var html = data.split("</tr>");
    if(req.url === "/api/proveedores") {
        //console.log('llega');
        obtenerProveedores( function (result) {
            //console.log(result);
            fs.readFile("Ejercicio2.html", "utf-8", (err, data) => {
                if(err){
                    return;
                }
                
                var proveedoresString = '';
                for (var i = 0; i < 29; i++){
                    proveedoresString += '<tr><td>' + result[i].idproveedor + '</td><td>'+ result[i].nombrecompania + '</td><td>' +  result[i].nombrecontacto + '</td></tr>';
                }
                
                data = data.replace('?', 'Proveedores');
                data = data.replace('*',proveedoresString);
                //console.log(data);
                //console.log(typeof(data));
                //console.log(proveedoresString);
                res.writeHead(200, { "Content-Type": "text/html"});
                res.write(data);
                res.end();    
            })
            })
        }
        else if(req.url === "/api/clientes"){
            obtenerClientes( function (result) {
                //console.log(result);
                fs.readFile("Ejercicio2.html", "utf-8", (err, data) => {
                    if(err){
                        return;
                    }
                    
                    //console.log(result);
                    var clientesString = '';
                    for (var i = 0; i < 91; i++){
                        clientesString += '<tr><td>' + result[i].idCliente + '</td><td>'+ result[i].NombreCompania + '</td><td>' +  result[i].NombreContacto + '</td></tr>';
                    }
                    
                    data = data.replace('?', 'Clientes');
                    data = data.replace('*',clientesString);
                    //console.log(data);
                    //console.log(typeof(data));
                    //console.log(proveedoresString);
                    res.writeHead(200, { "Content-Type": "text/html"});
                    res.write(data);
                    res.end();    
                })
                })
        }
        else {
            
        }
    }).listen(8081);


function obtenerProveedores(callback){
    axios.get("https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json")
    .then((response) => {
        return response["data"];
    }).then((result) => 
        callback(result));
}

function obtenerClientes(callback){
    axios.get("https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json")
    .then((response) => {
        return response["data"];
    }).then((result) => 
        callback(result)); 
}