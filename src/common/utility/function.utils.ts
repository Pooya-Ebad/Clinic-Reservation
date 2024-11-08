export function isBoolean(value : any){
    return [true , "true", "True", false , "false", "False"].includes(value)
}
export function toBoolean(value : any){
    return [true , "true", "True"].includes(value) ? true :
        [false , "false", "False"].includes(value) ? false :
        value
}
export function toMG(value : number){
    return (value * 1024 * 1024)
}