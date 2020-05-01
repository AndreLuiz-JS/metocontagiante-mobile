import axios from 'axios';

const anchorfm = axios.create({
    baseURL: 'https://anchor.fm/s/18187050/podcast/rss'
});

export default anchorfm;