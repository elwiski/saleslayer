import React from "react";
import Spinner from "../../components/spinner/spinner";
import dataMock from "../../assets/mock/mockData";
import HomePageContent from './homepageContent';

class HomePage extends React.Component{
    tempLanguagesObject = new Object();
    tempLanguagesBoolean = new Object();
    templanguagesToShowOnChart = [];
    constructor(props){
        super(props);
        
        this.state = {
            loading: true,
            languages: [],
            total: [],
            token: "395406fed312f819ada040dc7b7e477a7936e5b8",   //personal usage
            languagesObject: [],
            languagesToShowOnChart:[],
            languagesToShowOnSelect:[],
            languagesBoolean:[]
        };
    }

    componentDidMount(){   //used to get all repositories
        const {token} = this.state;  
       
        fetch("https://api.github.com/repositories",{
            headers: {
              authorization: `token ${token}`
            }
          })
            .then(res => res.json())
            .then(result => {
                result.message 
                    ?
                        this.setState({
                            total: dataMock,
                        }, () => {
                            this.getAllLanguages();
                        })
                    :
                        this.setState({
                            total: result,
                        }, () => {
                            this.getAllLanguages();
                        });

            })
            .then(() =>{
                
            })
            .catch(error => {
                this.setState(() => ({loading: false}));
                throw error;
            })

            
    }

     orderedLanguagesObject = (incomingObject) => {   //first ordenation
            if(Object.keys(this.tempLanguagesObject).length === 0 && Object.keys(incomingObject).length != 0){
                this.tempLanguagesObject=incomingObject;
            }else{
                for(var prop in incomingObject){
                    if(this.tempLanguagesObject.hasOwnProperty(prop)){
                        this.tempLanguagesObject[prop] +=incomingObject[prop];
                    }else{
                        this.tempLanguagesObject[`${prop}`] = incomingObject[prop];
                    }
                }
            }
    }

    getAllLanguages = () => {   //used to get all languages
        const {total, token} = this.state;
        Promise.all(total.map(url =>
            fetch(url.languages_url,{
                        headers: {
                          authorization: `token ${token}`
                        }
                      })
            .then(resp => resp.text())
            .then((data) => {
                let dataParsed = JSON.parse(data);
                this.orderedLanguagesObject(dataParsed);
            })
            .catch(error => {
                throw error;
            })
        )).then(() =>{
            this.fillChartOptions(true);
        }).then(() =>{
            this.setState(() => ({
                loading: false
            }))
        })
    }


    fillChartOptions = (firstTime) => {   //very big madness (locurón)
        const { languagesBoolean} = this.state;
        var valuesToSaveOnLocalStorage = [];
        this.setState(() => ({languagesObject: this.tempLanguagesObject}));
        this.templanguagesToShowOnChart = [];
        this.tempLanguagesBoolean = languagesBoolean;
        var ownIndex = 0;
        for(var prop in this.tempLanguagesObject){
            
            if(firstTime){ 
                    this.tempLanguagesBoolean[`${prop}`] = true;
                    if(localStorage.getItem('deletedLanguagesIndex')){
                        var lastSessionDeletedLanguagesIndex = localStorage.getItem('deletedLanguagesIndex');
                        var res = lastSessionDeletedLanguagesIndex.split(",");
                        for(var i=0; i < res.length; i++){             
                            if(ownIndex == res[i]){
                                this.tempLanguagesBoolean[prop] = false;
                            }
                        }                        
                    }
            }
            if(this.tempLanguagesBoolean[prop] == true){
                var tempArray = {};
                tempArray.label = prop;
                tempArray.y = this.tempLanguagesObject[`${prop}`];
                this.templanguagesToShowOnChart.push(tempArray);
            }else if(this.tempLanguagesBoolean[prop] == false){
                var index = this.templanguagesToShowOnChart.indexOf(prop);
                valuesToSaveOnLocalStorage.push(String(ownIndex));
                this.templanguagesToShowOnChart.splice(index, 1);
            }
            ownIndex++;
        }   
        if (typeof window !== 'undefined') {
            var deletedLanguagesIndex = []
            deletedLanguagesIndex[0]= valuesToSaveOnLocalStorage;
            localStorage.setItem('deletedLanguagesIndex', deletedLanguagesIndex);

        }
        this.setState(() => ({languagesBoolean: this.tempLanguagesBoolean, languagesToShowOnChart: this.templanguagesToShowOnChart}));
    }

     onHandleChange = (e) => {
        this.tempLanguagesBoolean[e.target.value] = !this.tempLanguagesBoolean[e.target.value];
        this.fillChartOptions(false);
    };

    render() {
        const {loading, languagesBoolean, languagesToShowOnChart} = this.state;

        const options1 = { //chart
            data: [{				
                    type: "column",
                    dataPoints: languagesToShowOnChart
            }]
        }
        const options2 = {   //chart2
            animationEnabled: true,
            text: "Main languages",
			exportEnabled: true,
            theme: "dark2",
            
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}",		
				startAngle: -90,
				dataPoints: languagesToShowOnChart
			}]
		}

        return (
            <>
                {loading ?
                    ( <Spinner/>)
                :
                    (<HomePageContent
                        chartOptions1 ={options1} 
                        chartOptions2 ={options2} 
                        languagesObject = {languagesBoolean}
                        onHandleChange = {e => this.onHandleChange(e)}
                    />)
                }

            </>
        )
    }
}
export default HomePage;