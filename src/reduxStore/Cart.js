
    const cart = []

    const CartReducer =(state = cart , action)=>{
        const product = action.payload 
        console.log('product::' ,product);  
        console.log('state::' ,state);
        switch (action.type){
            case 'ADDCART':{
                const exist = state.find((x) => x.uid === product.uid)
                console.log("exist " , exist)
                if(exist){
                    console.log('dadadadad');
                    return state.map((x)=> x.uid === product.uid ? {...x , qty:x.qty+1} : x)
                }else{
                    const product = action.payload
                    return [...state , {...product , qty:1}]
                }
            }
            case 'DELCART':{
                const exist = state.find((x)=>x.uid === product.uid)
                console.log('DELCART' ,exist);
                if(exist.qty === 1){    
                    // return state.filter((x)=>x.uid !== product.uid)
                }else{
                    // state.map( x => x.uid === product.uid ? {...state , qty:x.qty-1} : x)
                }
    
            }
            break
            default:
                return state
            
        }
    
    }
    export default CartReducer