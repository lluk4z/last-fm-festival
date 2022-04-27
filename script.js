/* Create a cache object */
var cache = new LastFMCache();

/* Create a LastFM object */
var lastfm = new LastFM({
  apiKey    : 'd7c59fed8a9cd92667e301214659e340',
  apiSecret : 'bc81d84c3a42dbd08ef0669a381d06b1',
  cache     : cache
});

/* Load some artist info. */
lastfm.artist.getInfo({artist: 'The xx'}, {success: function(data){
  /* Use data. */
  //console.log(data)
}, error: function(code, message){
  /* Show error message. */
}});

const corpo_cartaz = document.querySelector('#example-img')

const espec = document.querySelector('.espec')

var val_period = "overall"
const btn_s_01 = document.querySelector("#s_01")
btn_s_01.addEventListener("click", function (e) {
  espec.innerHTML = `<h3>Semana</h3>`
  val_period = "7day"
  console.log(val_period)
})
const btn_m_01 = document.querySelector("#m_01")
btn_m_01.addEventListener("click", function (e) {
  espec.innerHTML = `<h3>1 Mês</h3>`
  val_period = "1month"
  console.log(val_period)
})
const btn_m_03 = document.querySelector("#m_03")
btn_m_03.addEventListener("click", function (e) {
  espec.innerHTML = `<h3>3 Meses</h3>`
  val_period = "3month"
  console.log(val_period)
})
const btn_m_06 = document.querySelector("#m_06")
btn_m_06.addEventListener("click", function (e) {
  espec.innerHTML = `<h3>6 Meses</h3>`
  val_period = "6month"
  console.log(val_period)
})
const btn_a_01 = document.querySelector("#a_01")
btn_a_01.addEventListener("click", function (e) {
  espec.innerHTML = `<h3>1 Ano</h3>`
  val_period = "12month"
  console.log(val_period)
})


const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const chartContainer = document.querySelector('#chart-container')

const headLine = document.querySelector('#head-line')

const apiURL_01 = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=`
const apiURL_02 = `&api_key=d7c59fed8a9cd92667e301214659e340&format=json`

cnt = 0


const insertArtistsIntoPage = artistsInfo => {
  console.log(artistsInfo)
  chartContainer.innerHTML = artistsInfo['topartists']['artist'].reduce((accumulator, arts) => {
    accumulator += `<li class="val_${cnt}">${arts.name}</li>`
    cnt += 1
    return accumulator
  }, '')
  //console.log(listArtist)
}

const fetchArtists = async term => {
  const response = await fetch(`${apiURL_01}${term}&period=${val_period}${apiURL_02}`)
  const data = await response.json()

  insertArtistsIntoPage(data)

  /*
  fetch(`${apiURL_01}${term}${apiURL_02}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  */
  
  await html2canvas(document.querySelector("#example-img")).then(canvas => {
      document.body.appendChild(canvas)
      corpo_cartaz.style.display = 'none'
  });
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const searchTerm = searchInput.value.trim()

  if (!searchTerm) {
    chartContainer.innerHTML = `<li class="warning-message">termo inválido</li>`
    return
  }

  fetchArtists(searchTerm)
})


/*
document.getElementById("dl-png").onclick = function() {
  const screenshotTarget = document.getElementById('example-img')

  html2canvas(screenshotTarget).then((canvas) => {
    const base64image = canvas.toDataURL("image/png")
    var anchor = document.createElement('a')
    anchor.setAttribute("href", base64image)
    anchor.setAttribute("donwload", "my-img.png")
    anchor.click()
    anchor.remove()
  })
}
*/