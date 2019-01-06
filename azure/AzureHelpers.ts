/*
    Utilities to map Azure 
*/

import * as _ from "lodash";

export class AzureHelpers {
    static mapMetadataToRegularObject(metaObject: any) {
        let keys = _.keys(metaObject);
        let regularObject: any = {};

        _.chain(keys)
            .filter((key) => key[0] !== '.')
            .forEach((key) => {
                regularObject[key] = metaObject[key]["_"];
            })
            .value();

        return regularObject;
    }
}