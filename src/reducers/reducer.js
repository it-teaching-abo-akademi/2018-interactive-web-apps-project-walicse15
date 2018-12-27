//-------- State and database operations --------//
import swal from 'sweetalert';

const INITIAL_STATE={Number_port:0,ID_port:0,rate_EUR:"",portfolios:[],ID_stock:0,error:""};

export default function(state=INITIAL_STATE,action){
    switch (action.type){
        case "creatPort": {
            console.log(state);
            return {...state,
                ID_port:state.ID_port+1,
                Number_port:state.Number_port+1,
                portfolios:[
                ...state.portfolios, {Number_stocks:0,currency:'USD',id:state.ID_port++,name:action.portfolio,stocks:[],rate:1}]};
        }
        case "fESuccess":{
			if(action.payload.data["Realtime Currency Exchange Rate"]){
				return{...state,rate_EUR:action.payload.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"],
					portfolios:state.portfolios.map(portfolio=>{
						if(portfolio.currency=="EUR"){
							return Object.assign({},portfolio,{
								rate:state.rate_EUR
							})
						}
						return portfolio;
					})
				}
			}
			else{	
				return{...state,rate_EUR:state.rate_EUR,
                portfolios:state.portfolios.map(portfolio=>{
                    if(portfolio.currency=="EUR"){
                        return Object.assign({},portfolio,{
                            rate:state.rate_EUR
                        })
                    }
                    return portfolio;
                })
				}
			}
        }
        case "fFailure":{
			swal("Error", action.error, "error");
            return state;
        }
        case "fCSuccess":{
            if(action.payload.data["Error Message"])
            {
                swal("Server Error", action.payload.data["Error Message"], "error");
                return state;
            }
            else {
                return {
                    ...state,
                    portfolios: state.portfolios.map(portfolio => {
                        if (portfolio.id == action.id_port) {
                            return Object.assign({}, portfolio, {
                                stocks: portfolio.stocks.map(stock => {
                                    if (stock.id_stock == action.id_stock) {
                                        if(action.payload.data["Time Series (1min)"]){
										return Object.assign({}, stock, {	
                                            value: action.payload.data["Time Series (1min)"][action.payload.data["Meta Data"]["3. Last Refreshed"]]["4. close"]
                                        })
										}
                                    }
                                    return stock;
                                })
                            })
                        }
                        return portfolio;
                    })
                }
            }
        }
        case "addStock":{
            if(action.payload.data["Error Message"])
            {
                swal("Server Error", "Wrong name of stock or server outage", "error");
                return state;
            }
            else
            {
                return{...state,
                    ID_stock:state.ID_stock+1,
                    portfolios: state.portfolios.map(function (portfolio) {
                            if(action.payload.data["Meta Data"]){
							if(portfolio.id == action.id){
                                return Object.assign({},portfolio,{
                                    Number_stocks:portfolio.Number_stocks+1,
                                    stocks:[...portfolio.stocks,
                                        {
                                            id_stock: state.ID_stock++,
                                            name: action.payload.data["Meta Data"]["2. Symbol"],
                                            value: action.payload.data["Time Series (1min)"][action.payload.data["Meta Data"]["3. Last Refreshed"]]["4. close"],
                                            quantity: action.quantity
                                        },
                                        ]
                                });
                            }
							}
							else{
								swal("Server Error", "Api limit reached", "error");
							}
                            return portfolio;
                        })
                };
            }
        }
        case "deletePort":{
            return {
                ...state,
                Number_port:state.Number_port-1,
                portfolios: state.portfolios.reduce(
                    function(state_update, portfolio) {
                    if (portfolio.id != action.id)
                        state_update.push(Object.assign({}, portfolio));
                    return state_update;
                },[])
            };
        }
        case "deleteStock":{
            return{
                ...state,
                portfolios: state.portfolios.map(portfolio=>{
                    if(portfolio.id==action.id_port){
                        return Object.assign({},portfolio,{
                            Number_stocks:portfolio.Number_stocks-(action.stocks.length),
                            stocks:portfolio.stocks.reduce(
                                function (state_update,stock) {
                                    if(!action.stocks.includes(stock.id_stock))
                                        state_update.push(Object.assign({},stock));
                                    return state_update;
                                },[])
                        })
                    }
                    return portfolio;
                })
            }
        }
        case "cCurrency":{
            return{
                ...state,
                portfolios:state.portfolios.map(portfolio=>{
                    if(portfolio.id==action.id_port){
                        return Object.assign({},portfolio,{
                            currency:"EUR",
                            rate:state.rate_EUR
                        })
                    }
                    return portfolio;
                })
            }
        }
        case "cUsd":{
            return{
                ...state,
                portfolios:state.portfolios.map(portfolio=>{
                    if(portfolio.id==action.id_port){
                        return Object.assign({},portfolio,{
                            currency:"USD",
                            rate:1
                        })
                    }
                    return portfolio;
                })
            }
        }     
        default:
            return state;
    }
}