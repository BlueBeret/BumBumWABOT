const instareel = require('insta-reel')
import axios from 'axios'
import {load} from 'cheerio'


async function getvideo(url: string) {
    const html = await axios.get(url);
    // console.log(html)
    const $ = load(html.data);
    // const videoString = $("meta[property='og:video']").attr("content");
    const videoString = $(".x5yr21d.x1uhb9sk.xh8yej3")

    return videoString;
    
}
  
getvideo('https://www.instagram.com/reel/Cm6Z-ENBD7P/?igshid=NDk5N2NlZjQ=').then(
    (data) => {
        console.log(data)
    }
)