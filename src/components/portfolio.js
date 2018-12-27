//-------- Rendering portfolio list --------//
import React, {Component} from 'react';
import {connect} from 'react-redux';
import OptionsPort from './options_port';
import StockTable from './stock_table';
import DeletePort from "./delete_port";
import {bindActionCreators} from "redux";
import {currencyChange,updateStocksValue,getExchangeRate} from "../controllers/controller";

class PortfolioList extends Component{

	atStartUpdateStocksValues(){
        this.props.getExchangeRate();
        this.props.reducers.portfolios.map(portfolio=>{
            portfolio.stocks.map(stock=>{
                this.props.updateStocksValue(portfolio.id,stock.id_stock,stock.name);
            })
        });
    }
    UpdateStocksValuesAtSetInterval(){
        setInterval(()=> this.props.getExchangeRate(), 120000);
        setInterval(()=>{this.props.reducers.portfolios.map(portfolio=>{
            portfolio.stocks.map(stock=>{
                this.props.updateStocksValue(portfolio.id,stock.id_stock,stock.name);
                })
            });
        },120000)
    }

    changeCurrency(id,state_currency){
        if(state_currency=="EUR")
         this.props.currencyChange(id,"USD");
        if(state_currency=="USD")
		 this.props.currencyChange(id,"EUR");
    }
	
    render(){
        return(
            <div className="portfolios">
			<div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                {this.props.reducers.portfolios.map(portfolio=>{

                    const reducer = (total, stock) => total + portfolio.rate*stock.value*stock.quantity;
                    const TotalValue = (portfolio.stocks.reduce(reducer,0)).toFixed(2);
                    return(
						
                        <div className="portfolio table-responsive" key={portfolio.id}>
                            <label className="h5">{portfolio.name} :</label>
							<label className="h6">Total value > {TotalValue}{portfolio.currency=="EUR" ? "€":"$"}</label>
                            
								<label className="td1" >
	
									<button name={portfolio.id} className="btn btn-success" onClick={()=>this.changeCurrency(portfolio.id,portfolio.currency)} >Change Currency</button>
									
								</label>

                            <label className="faclose"><DeletePort clicked_id={portfolio.id}/></label>

                            <div>

                                <StockTable listStocks={portfolio.stocks} rate={portfolio.rate} portfolio={portfolio.name} currency={portfolio.currency=="EUR" ? "€":"$"}/>                               
                                <OptionsPort clicked_id={portfolio.id} portfolio={portfolio.name} listStocks={portfolio.stocks} nr_stocks={portfolio.Number_stocks}/>
                            </div>
                        </div>
                    );
                })}
			</div>
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {reducers:state.reducer};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateStocksValue,getExchangeRate,currencyChange},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PortfolioList);