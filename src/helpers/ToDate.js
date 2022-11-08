export const toDate = (date) =>{
    let res = new Date(date)
    console.log('dad'+res);
    return res.toLocaleDateString()+" "+res.toLocaleTimeString()
}