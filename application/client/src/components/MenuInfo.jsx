import React, {useState, useEffect} from "react";
import img from "../images/profiles/Leslie_perfil.png"
import { Card as MenuCard, Image, Button, Icon } from 'semantic-ui-react';

export default function MenuInfo({props}){
    // console.log(props)
    // console.log(id, name, price, original_price, quantity)
    let {id,fk_menus_restaurant, name, price, original_price, quantity,img_path} = props;
    // For test
    // if(!(id&&name&&price&&original_price&&quantity)){
    //     id = 1
    //     name = "sample"
    //     price = 10.00
    //     original_price = 20.00
    //     quantity = 5
    //     img_path = "../images/profiles/Leslie_perfil.png"
    // }
    return (
        <div key={id} className="flex flex-row justify-between items-center border border-stone-900 border-1 text-lg font-bold p-3">
            <Image src={img} className="w-20 h-20"></Image>
            <MenuCard className="flex flex-col">
                <MenuCard.Header>{name}</MenuCard.Header>
                <MenuCard.Description>Original Price: ${original_price}</MenuCard.Description>
                <MenuCard.Description>Discounted Price: ${price}</MenuCard.Description>
                <MenuCard.Description>{quantity}</MenuCard.Description>
                <Button animated='vertical' className="w-20 h-20">
                    <Button.Content hidden>Shop</Button.Content>
                    <Button.Content visible>
                        shop
                        <Icon name='shop' />
                    </Button.Content>
                </Button>
            </MenuCard>
            {/* <img src={img}></img>
            <div>
                <div>{name}</div>
                <div>{price}</div>
                <div>{quantity}</div>
                <div>{original_price}</div>
            </div> */}
        </div>
    )
}