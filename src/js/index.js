import dotenv from 'dotenv';
import axios from 'axios';
import lodash from 'lodash';
import '../css/style.css';
import '../css/mobile.css';

dotenv.config({path: '../../.env'});
const _= lodash;

let cityN = document.querySelector('#cityName');
let form = document.querySelector('#textBoxContainer');
let dataContainer = document.querySelector('#dataContainer');
let tabContainer = document.querySelector('#tabContainer');
let footer = document.querySelector('footer'); 

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    document.body.classList.remove('extended');
    footer.classList.remove('fpos');
    dataContainer.innerHTML = null;
    tabContainer.innerHTML = null;

    let city = document.querySelector('#textBox').value;
    cityN.innerHTML = city;

    getData(city)
    .then(
        res => {
            let score = document.createElement('p');
            let sum = document.createElement('p');
            let cat = document.createElement('table');

            _.forEach(res.categories, (element) =>{
                tablify(element, cat);
            })

            sum.innerHTML = `<b>Summary:</b> ${_.get(res, 'summary')}`;

            score.innerHTML = `<b>${city} score:</b> ${_.get(res, 'teleport_city_score')}`;
            score.classList.add('score')
            dataContainer.append(sum, score);
            tabContainer.append(cat);
        }
    )
    .catch(
        err => alert(`${err.name}: ${err.message}`)
    )

    document.querySelector('#textBox').value = null;
})

async function getData(c){
    let url = `${process.env.MAINURL}/urban_areas/slug:${format(c)}/scores/ `;

    let response = await axios.get(url);

    return response.data;
}

function format(cityName){
    let name = cityName.toLowerCase();

    if(name.includes(' ')){
        name = _.join(_.split(name, ' '), '-');
    }
    
    return name
}

function tablify(el, tab){
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    let td = document.createElement('td');
                
    th.innerHTML = el.name;
    td.innerHTML = el.score_out_of_10;
    tr.setAttribute('style', `background-color: ${el.color}`);

    tr.append(th, td);
    tab.append(tr);
}