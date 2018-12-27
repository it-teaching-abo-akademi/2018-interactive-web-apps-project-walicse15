//-------- Main controller for api calls handling and data passing --------//
import httpRequest from 'axios';
const api_key="UFHBPL57WW04HFSC";
const stock_url="https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=1min&apikey="+api_key;
const exchange_url="https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey="+api_key;

export function getError(error) {
    return {
        type: "fFailure",
        error: error
    };
}

export function cPort(portfolio){
    return{
        type:"creatPort",
        portfolio:portfolio
    }
}

export function addStock(portf_id,name,quantity) {
   return function action(dispatch) {
       const url= `${stock_url}&symbol=${name.toUpperCase()}`;
       const request=httpRequest.get(url);
       return request.then(
              response=> dispatch(addStockToDatabase(response,portf_id,quantity)),
              err=> getError(err)
       );
   }
}

export function addStockToDatabase(stock,id,quantity) {
    return{
        type:"addStock",
        payload:stock,
        id:id,
        quantity:quantity
    }
}

export function deletePortfolio(id) {
    return{
        type:"deletePort",
        id:id
    }
}

export function deleteStocks(stocks,id_port) {
    return{
        type:"deleteStock",
        stocks:stocks,
        id_port:id_port
    }
}

export function currencyChange(id_port,currency) {
    if(currency=="EUR") {
        return{
            type:"cCurrency",
            id_port:id_port,
        }
    }
    else{
        return{
            type:"cUsd",
            id_port:id_port
        }
    }
}

export function getExchangeRate() {
     return function action(dispatch) {
           const request=httpRequest.get(exchange_url);
           return request.then(
               response=> dispatch(savetoDatabaseExchangeRate(response)),
               err=> getError(err)
           );
       };
}

export function savetoDatabaseExchangeRate(exchange) {
    return{
        type:"fESuccess",
        payload:exchange,
    }
}

export function updateStocksValue(id_port,id_stock,stock_name) {
    return function action(dispatch) {
        const url= `${stock_url}&symbol=${stock_name}`;
        const request=httpRequest.get(url);
        return request.then(
            response=> dispatch(saveToDBStocksUpdates(response,id_port,id_stock)),
            err=> getError(err)
        );
    }
}

export function saveToDBStocksUpdates(stock,id_port,id_stock) {
    return{
        type:"fCSuccess",
        payload:stock,
        id_port:id_port,
        id_stock:id_stock
    }
}