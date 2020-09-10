import * as React from "react";
import Header from "../../components/header/header"
import CanvasJSReact from '../../assets/canvasJS/canvasjs.react';
import CheckBoxComponent from '../../components/checkBoxComponent/checkBoxComponent';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const HomePageContent = ({chartOptions1, chartOptions2, languagesObject, onHandleChange}) => {
    return (
         <div>
            <Header/>
            <CheckBoxComponent  languagesObject = {languagesObject} onHandleChange  = {onHandleChange}/>
            <CanvasJSChart options = {chartOptions2}/>
            <CanvasJSChart options = {chartOptions1}/>
        </div>
    );
};
export default HomePageContent;
