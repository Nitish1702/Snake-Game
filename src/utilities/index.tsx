import React from "react"

export const clearBoard = (context: CanvasRenderingContext2D | null) => {
    if (context) {
        context.clearRect(0,0,600,1000)
    }
}
export interface IObjectBody{
    x: number,
    y:number
}
export const drawObject = (
    context: CanvasRenderingContext2D | null,
    objectBodies: IObjectBody[],
    fillColor: string,
    strokeFill='#146356'
)=>{
    if (context) {
        objectBodies.forEach((objectBody: IObjectBody) => {
            context.fillStyle = fillColor
            context.strokeStyle = strokeFill
            context.fillRect(objectBody.x, objectBody.y, 20, 20)
            context.strokeRect(objectBody.x, objectBody.y, 20, 20)
            
        })
    }
}
export function getRandomPosition(height:number, width:number) {
    return {x:Math.floor(Math.random() * width ) + 20,y:Math.floor(Math.random() * height ) + 20};
  }