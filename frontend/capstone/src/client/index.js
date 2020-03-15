import { processInput } from './js/app';
import { handleForm } from './js/formHandler';
import { getGeonamesData, getDarkskyData, getPixabayData } from './js/remoteApi';
import './media/globe-1920x1280.jpg';
import '../client/styles/main.scss';

handleForm();

export {
    processInput,
    getGeonamesData,
    getDarkskyData,
    getPixabayData
};