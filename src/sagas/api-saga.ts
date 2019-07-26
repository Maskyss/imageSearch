import {call, delay, put, select, takeLatest} from "redux-saga/effects"
import axios from 'axios'
import {ACTION_API_ERRORED,
        ACTION_DATA_LOADED,
        ACTION_INPUT_BROWSE,
        IActionInputBrowse} from '../actions/actionsInput'
import {BING, GOOGLE}from '../actions/actionsSearch'
import {ItemModel} from '../interfaces'
import {NEW_PAGE, OLD_PAGE} from "../actions/actionPagination";

export const getSearcher = (state:any) => state.searcher;
export const getPage = (state:any) => state.page;

export default function* watchInputGB() {
    yield takeLatest(ACTION_INPUT_BROWSE, handleInput);
    yield takeLatest(NEW_PAGE, handleInput);
    yield takeLatest(OLD_PAGE, handleInput);
}

function* handleInput(action: IActionInputBrowse) {
    let searcher = yield select(getSearcher);
    let page = yield select(getPage);

    console.log(searcher)

    const { inputValue } = action

    try {

        yield delay(500);
        if (searcher===BING) {
            const dataFromApi: any[] =  yield call(fetchReposBing, inputValue);
            const mappedItems = fetchedDataBing(dataFromApi);
            yield put({ type: ACTION_DATA_LOADED, data: mappedItems })
        }
        if (searcher===GOOGLE) {
            const dataFromApi: any[] =  yield call(fetchReposGoogle, inputValue,page);
            const mappedItems = fetchedDataGoogle(dataFromApi);
            yield put({ type: ACTION_DATA_LOADED, data: mappedItems })
        }
    } catch (error) {
        if (searcher===GOOGLE && inputValue) {
            console.log('lost')
        }
        yield put({ type: ACTION_API_ERRORED, errorData: error })
    }
}

function fetchReposGoogle(query: string,page:number) {
    const apiUrlForRepos: string = 'https://www.googleapis.com/customsearch/v1?'
    const key ='key=AIzaSyAKuv89Ib8tx17CvJs1RNrd6MlQMjlw5qs&'
    const cx ='cx=008303230603769150821:w9ruejvix4y&q='
    const additional:string ='&alt=json&searchType=image'

    const start:string = '&start='
    if(page===1){
        console.log(apiUrlForRepos+key+cx+query+additional+start)
        return axios.get(`${apiUrlForRepos}${key}${cx}${query}${additional}`)}
    else {
        console.log(apiUrlForRepos+key+cx+query+additional+start+(page*10-10+1))
        return axios.get(`${apiUrlForRepos}${key}${cx}${query}${additional}${start}${page*10-10+1}`)}
}

function fetchedDataGoogle(dataToMap: any): ItemModel[] {
    const items: any[] = dataToMap.data.items

    return items.map((item) => ({
            id: item.id,
            url: item.link,
            name: item.title,

        }))
}

function fetchReposBing(query: string) {
    const ImageSearchAPIClient = require('azure-cognitiveservices-imagesearch');
    const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
    const serviceKey = "35f556c20e1940c281988a0890cd791a";

    const credentials = new CognitiveServicesCredentials(serviceKey);
    const imageSearchApiClient = new ImageSearchAPIClient(credentials);
    return imageSearchApiClient.imagesOperations.search(query)


}

function fetchedDataBing(dataToMap: any): ItemModel[] {
    return dataToMap['value'].map((item: { id: any; contentUrl: any; name: any; }) => ({
        id: item.id,
        url: item.contentUrl,
        name: item.name
    }))
}