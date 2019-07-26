import {Action} from "redux";

export function selectSearcher(searcher: string): IActionGoogle | IActionBing {

    switch (searcher) {
        case GOOGLE:
            return { type: GOOGLE,searcher  }
        case BING:
            return { type: BING,searcher  }
        default:
            return {type: BING ,searcher  }
    }
}

export const GOOGLE = 'GOOGLE'
export const BING= 'BING'

export type GOOGLEType = typeof GOOGLE
export type BINGType= typeof BING

export interface IActionGoogle extends Action {
    type: GOOGLEType
    searcher:string
}
export interface IActionBing extends Action {
    type: BINGType
    searcher:string
}

export type SearchActions =  IActionBing | IActionGoogle