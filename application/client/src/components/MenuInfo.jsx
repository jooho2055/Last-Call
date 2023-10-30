import React, {useState, useEffect} from "react";
import img from "../images/profiles/Leslie_perfil.png"
export default function MenuInfo(props){
    var {menuId, name, price, originalPrice, quantity,img_path} = props;
    // For test
    if(!(menuId&&name&&price&&originalPrice&&quantity)){
        menuId = 1
        name = "sample"
        price = 10.00
        originalPrice = 20.00
        quantity = 5
        img_path = "../images/profiles/Leslie_perfil.png"
    }
    return (
        <div key={menuId}>
            <img src={img}></img>
            <div>
                <div>{name}</div>
                <div>{price}</div>
                <div>{quantity}</div>
                <div>{originalPrice}</div>
            </div>
        </div>
    )
}