    //llama a la funcion iniciarJuego luego de cargarse el html
window.addEventListener('load',iniciarJuego)


const botonMascotaJugador = document.getElementById('boton-mascota');
const botonReiniciar = document.getElementById ('boton-reiniciar');
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const h3MascotaJugador = document.getElementById('mascota-jugador');
const imagenMascotaSeleccionada = document.createElement('img');
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanMascotaRival = document.getElementById('mascota-rival');
const imagenMascotaSeleccionadaRival = document.createElement('img');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasRival = document.getElementById('vidas-rival');
const seccionMensajeJugador = document.getElementById('mensajes-jugador');
const seccionMensajeRival = document.getElementById('mensajes-rival');
const resultado = document.getElementById('resultado');
const seccionMensaje = document.getElementById('mensaje-final');
const TarjetasPersonajes = document.getElementById('personajes')
const seleccionarAtaque = document.getElementById('botones-combate')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokeponColicionado;
let cantidadDeAtaques =[];
let mokeponSeleccionado = '';
let mokeponesEnemigo = [];
let jugadorId = null;
let enemigoId = null;
let mascotasEnemigos = [];
let mokepones = [];
let mokeponesEnemigos = [];
let ataqueJugador;
let ataqueEnemigo;
let opcionDeMokepones;
let seleccionRival
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let ataquesMokepon;
let botonFuego;
let botonTierra;
let botonAgua;
let botones = []
let concatenacionDeAtaques = []
let mascotaRival;
let ataqueMokeponEnemigo = [];
let resultadoCombate ='';
let vidasJugador = 3;
let vidasRival = 3;
let lienzo = mapa.getContext('2d')
let intervalo;
let mapaBackground = new Image()
mapaBackground.src = './imagenes/mokemap.png'

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id=null , x=305, y=130){
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.x = x;
        this.y = y;
        this.ancho = 40;
        this.alto = 40;
        this.imagenSelect = new Image();
        this.imagenSelect.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    };
    pintarMokepon(){
        lienzo.drawImage(
            this.imagenSelect,
            this.x,
            this.y,
            this.ancho,
            this.alto
        );
    }
};


let hipodoge = new Mokepon ('Hipodoge','imagenes/mokepon_hipodoge_attack.webp', 3, './imagenes/hipodoge.webp');
let capipepo = new Mokepon ('Capipepo','imagenes/mokepon_capipepo_attack.jpg', 3, './imagenes/capipepo.webp');
let ratigueya = new Mokepon ('Ratigueya','imagenes/mokepon_ratigueya_attack.jpg', 3, './imagenes/ratigueya.webp');

let hipodogeEnemigo = new Mokepon ('Hipodoge','imagenes/mokepon_hipodoge_attack.webp', 3, './imagenes/hipodoge.webp');
let capipepoEnemigo = new Mokepon ('Capipepo','imagenes/mokepon_capipepo_attack.jpg', 3, './imagenes/capipepo.webp');
let ratigueyaEnemigo = new Mokepon ('Ratigueya','imagenes/mokepon_ratigueya_attack.jpg', 3, './imagenes/ratigueya.webp');

const Ataques_Hipodoge = [
    {nombre: '💧',id:"boton-agua"},
    {nombre: '💧',id:"boton-agua"},
    {nombre: '💧',id:"boton-agua"},
    {nombre: '🌱',id:"boton-tierra"},
    {nombre: '🔥',id:"boton-fuego"}
]
const Ataques_Capipepo =[
    {nombre: '🌱',id:"boton-tierra"},
    {nombre: '🌱',id:"boton-tierra"},
    {nombre: '🌱',id:"boton-tierra"},
    {nombre: '💧',id:"boton-agua"},
    {nombre: '🔥',id:"boton-fuego"}
]
const Ataques_Ratigueya = [
    {nombre: '🔥',id:"boton-fuego"},
    {nombre: '🔥',id:"boton-fuego"},
    {nombre: '🔥',id:"boton-fuego"},
    {nombre: '🌱',id:"boton-tierra"},
    {nombre: '💧',id:"boton-agua"}
]

hipodoge.ataques.push(...Ataques_Hipodoge);
hipodogeEnemigo.ataques.push(...Ataques_Hipodoge);

capipepo.ataques.push(...Ataques_Capipepo);
capipepoEnemigo.ataques.push(...Ataques_Capipepo);


ratigueya.ataques.push(...Ataques_Ratigueya);
ratigueyaEnemigo.ataques.push(...Ataques_Ratigueya);


mokepones.push(hipodoge,capipepo,ratigueya);
mokeponesEnemigo.push(hipodogeEnemigo,capipepoEnemigo,ratigueyaEnemigo)



function iniciarJuego() {
    
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}" class="cartaDeMokepones">
        <label for="${mokepon.nombre}" class="tarjeta-personaje">
            <img class="imagen-personajes" src="${mokepon.foto}" alt="imagen de ${mokepon.nombre}"> 
            <p>${mokepon.nombre}</p>
        </label>`
        TarjetasPersonajes.innerHTML += opcionDeMokepones;
    });

    botonMascotaJugador.style.display = 'none';

    for (let i = 0; i < document.getElementsByClassName('cartaDeMokepones').length; i++) {
        document.getElementsByClassName('cartaDeMokepones')[i].addEventListener('click',mostrarSelect)
    };
    botonMascotaJugador.addEventListener('click',seleccionarMascotaJugador);

    sectionVerMapa.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'
    botonReiniciar.addEventListener ('click', reiniciarJuego);
    botonReiniciar.style.display = 'none';

};

    //hace aparecer boton para seleccionar
function mostrarSelect() {
    for (let i = 0; i < document.getElementsByClassName('cartaDeMokepones').length; i++) {
        if (document.getElementsByClassName('cartaDeMokepones')[i].checked){
            mokeponSeleccionado = mokepones[i]
        }
    }
    botonMascotaJugador.style.display = 'inline';
}


    //seleccionar mascota
function seleccionarMascotaJugador() {

    sectionVerMapa.style.display = 'flex'
    iniciarMapa()

   h3MascotaJugador.innerHTML = mokeponSeleccionado.nombre;
        imagenMascotaSeleccionada.src= mokeponSeleccionado.foto;
        document.getElementById('imagen-mascota').appendChild(imagenMascotaSeleccionada);
        mascotaJugador = mokeponSeleccionado.nombre;
        vidasJugador = mokeponSeleccionado.vida
        spanVidasJugador.innerHTML = vidasJugador;

    extraerAtaques(mascotaJugador)
    seleccionarMascotaRival();
    sectionSeleccionarMascota.style.display = 'none';
};


function pintarCanvas(){
    mokeponSeleccionado.x += mokeponSeleccionado.velocidadX
    mokeponSeleccionado.y += mokeponSeleccionado.velocidadY

    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground, 
        0, 
        0, 
        mapa.width, 
        mapa.height
    );
        // Colocar color blanco en fondo de canvas
    mokeponSeleccionado.pintarMokepon()
    mokeponesEnemigos.forEach((mokepon)=>{
        mokepon.pintarMokepon()
        revisarColicion(mokepon)
    })
    seleccionRival.x = 170
    seleccionRival.y = 150
    seleccionRival.pintarMokepon()
   if (mokeponSeleccionado.velocidadX !== 0 || mokeponSeleccionado.velocidadY !== 0){
        revisarColicion(seleccionRival)
    }
};

function iniciarMapa(){
    mapa.width = 450
    mapa.height = 350
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keyup', detenerMovimiento)
    window.addEventListener('keydown',function(e){
        switch (e.key) {
            case 'ArrowUp':
                moverArriba()
                break;
            case 'ArrowRight':
                moverDerecha()
                break;
            case 'ArrowDown':
                moverAbajo()
                break;
            case 'ArrowLeft':
                moverIzquierda()
                break;  
            default:
                break;
        };
    });

};

function moverArriba(){
    mokeponSeleccionado.velocidadY = -5
};
function moverIzquierda(){
    mokeponSeleccionado.velocidadX = -5
};
function moverAbajo(){
    mokeponSeleccionado.velocidadY = 5
};
function moverDerecha(){
    mokeponSeleccionado.velocidadX = 5
};

function detenerMovimiento(){
    mokeponSeleccionado.velocidadX = 0;
    mokeponSeleccionado.velocidadY = 0;
};

function extraerAtaques(element){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
         if (element === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
         };
    };
    MostrarAtaques(ataques)
};


function MostrarAtaques(ataques){
    for ( let ataque of ataques) {
    ataquesMokepon = `<button class="botones-ataque">${ataque.nombre}</button>`
    seleccionarAtaque.innerHTML += ataquesMokepon
    cantidadDeAtaques.push(ataque.nombre)
    };
    botonFuego = document.getElementById('boton-fuego') ;
    botonTierra = document.getElementById('boton-tierra');
    botonAgua = document.getElementById('boton-agua');

    botones = document.querySelectorAll('.botones-ataque')
    secuenciaAtaque()
};

function secuenciaAtaque(){
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            if (e.target.firstChild.textContent === '🔥'){
                concatenacionDeAtaques.push('🔥')
                boton.disabled = true;
                boton.style.borderColor = "transparent";
                boton.style.backgroundColor = "#839AA8";
            } else if (e.target.firstChild.textContent === '💧'){
                concatenacionDeAtaques.push('💧')
                boton.disabled = true;
                boton.style.borderColor = "transparent";
                boton.style.backgroundColor = "#839AA8";
            } else {
                concatenacionDeAtaques.push('🌱')
                boton.disabled = true;
                boton.style.borderColor = "transparent";
                boton.style.backgroundColor = "#839AA8";
            }

            ataqueAleatorioEnemigo(ataqueMokeponEnemigo);
            if(concatenacionDeAtaques.length == cantidadDeAtaques.length){
                 combate()
            };
        });       
    });
};

    //selecciona un numero aleatorio entre min y max (inclusive)
function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};

    //proceso de seleccion aleatoria del rival
function seleccionarMascotaRival() {
    mascotaRival = aleatorio(0 ,(mokeponesEnemigo.length-1));
    seleccionRival = mokeponesEnemigo[mascotaRival];
    //spanMascotaRival.innerHTML = mokeponColicionado.nombre
    imagenMascotaSeleccionadaRival.src= seleccionRival.foto;
    document.getElementById('imagen-mascota-rival').appendChild(imagenMascotaSeleccionadaRival);
    ataqueMokeponEnemigo = seleccionRival.ataques
    vidasRival = seleccionRival.vida
    spanVidasRival.innerHTML = vidasRival;


};
let newAtakEnemiArray =[];
function ataqueAleatorioEnemigo(ataques){
    mesclarArray(ataques)
    newAtakEnemiArray = ataques
};

function mesclarArray(element){
    element.sort(function() { return Math.random() - 0.5 });
};
let impresionCombate =[];
   //****** / //logica de combate// / ******//
function combate(){
    
    for (let i = 0; i < concatenacionDeAtaques.length; i++) {
        if (vidasJugador >0 && vidasRival >0 &&concatenacionDeAtaques[i] === '🔥' && ataqueMokeponEnemigo[i].nombre === '🌱' ||vidasJugador >0 && vidasRival >0 && concatenacionDeAtaques[i] === '💧' && ataqueMokeponEnemigo[i].nombre === '🔥' || vidasJugador >0 && vidasRival >0 &&concatenacionDeAtaques[i] === '🌱' && ataqueMokeponEnemigo[i].nombre == '💧'){
            resultadoCombate = 'GANASTE';
            impresionCombate.push('GANASTE');
            vidasRival--;
            console.log('ganastes', vidasRival);  
            spanVidasRival.innerHTML = vidasRival;
        } else if(vidasJugador >0 && vidasRival >0 &&concatenacionDeAtaques[i] === ataqueMokeponEnemigo[i].nombre) {
            resultadoCombate = 'EMPATASTE';
            impresionCombate.push('EMPATASTE');
            console.log('empate');  
        }
        else if(vidasJugador >0 && vidasRival >0 && ataqueMokeponEnemigo[i].nombre === '🔥' && concatenacionDeAtaques[i]=== '🌱' ||vidasJugador >0 && vidasRival >0 && ataqueMokeponEnemigo[i].nombre === '💧' &&concatenacionDeAtaques[i] === '🔥' || vidasJugador >0 && vidasRival >0 && ataqueMokeponEnemigo[i].nombre === '🌱' && concatenacionDeAtaques[i]== '💧'){
            resultadoCombate = 'PERTDISTE';
            impresionCombate.push('PERTDISTE');
            vidasJugador--;
            spanVidasJugador.innerHTML = vidasJugador;  
            console.log('perdistes', vidasJugador);   
        }
    };
    console.log(ataqueMokeponEnemigo);
    console.log(concatenacionDeAtaques);
    crearMensaje();
    resultadoFinal();

};

function resultadoFinal () {
    if (vidasJugador <= 0) {
        crearMensajeFinal('Tu mascota se a quedado sin vidas');
        finalCombate()
    } else if (vidasRival <= 0) {
        crearMensajeFinal('La mascota del reival se a quedado sin vidas');
        finalCombate()
    } else if(vidasJugador != 0 && vidasRival != 0){
        crearMensajeFinal('ambas mascotas siguen en pie');
        botones.forEach(boton => {
            boton.disabled = false;
            boton.style.borderColor = "#F5F0BB";
            boton.style.backgroundColor = "#90C8AC";
            concatenacionDeAtaques = []
            ataqueEnemigo = []

        });
    };
};


    //mensaje texto para los ataques y final del juego
function crearMensaje(){
    resultado.innerHTML = `<p></p>`
for (let i = 0; i < impresionCombate.length; i++) {
    // seccionMensajeJugador.innerHTML += `<p>${concatenacionDeAtaques[i]}</p>` ;
    // seccionMensajeRival.innerHTML += `<p>${newAtakEnemiArray[i].nombre}</p>`;
    resultado.innerHTML +=`<p class='pResult'>${concatenacionDeAtaques[i]} ${impresionCombate[i]} ${newAtakEnemiArray[i].nombre}</p>`;
}

impresionCombate = [];
};

function crearMensajeFinal(contenido){
    seccionMensaje.innerHTML = contenido;
    seccionMensaje.style.display = 'block';
};

function finalCombate(){
    botonReiniciar.style.display = 'block';
}

    //boton reiniciar
function reiniciarJuego() {
    location.reload();
};

function revisarColicion(datosEnemigo){
// console.log(datosEnemigo)

const arribaEnemigo = datosEnemigo.y
const abajoEnemigo = datosEnemigo.y + datosEnemigo.alto
const derechaEnemigo = datosEnemigo.x + datosEnemigo.ancho
const izquierdaEnemigo = datosEnemigo.x

const arribaMascota = mokeponSeleccionado.y
const abajoMascota = mokeponSeleccionado.y + mokeponSeleccionado.alto
const derechaMascota = mokeponSeleccionado.x + mokeponSeleccionado.ancho
const izquierdaMascota = mokeponSeleccionado.x

    if (abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
        return;
    } else {
        clearInterval(intervalo)
        detenerMovimiento()
        sectionVerMapa.style.display = 'none'
        sectionSeleccionarAtaque.style.display = 'flex';

        console.log('!!!LO TOCOO!!!')
        enemigoId = datosEnemigo.id
        // console.log(datosEnemigo.id);
        mokeponColicionado = datosEnemigo
        seleccionarMascotaRival()
    }
};

