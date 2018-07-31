

import css from './css/index.css';
// import './css/black.less';
import './css/pink.scss';
import test from './module1.js';


$('#title').html('HELLO WEBPACK 9')
const fn = ()=>{
	console.log(1234)
}

// test();


var json = require('../config.json');
$('#json').html(json);
console.log("~~~",json)