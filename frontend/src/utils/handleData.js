export default function salesFormat  (saleId, array)  {

    if(saleId !== "") {
        let products = [];
       const result = array.reduce((order, sale) => {
            products.push({productId: sale.productId, quantity: sale.quantity})
            order = [
                { date: sale.date, products }
            ]
            return order;
        }, [])
        return result;
    } else {
    const result = [];
    const map = new Map();
    
    for (const item of array) {
      if (!map.has(item.saleId)) {
        map.set(item.saleId, { saleId: item.saleId, date: item.date, products: [] });
        result.push(map.get(item.saleId));
      }
      map.get(item.saleId).products.push({ productId: item.productId, quantity: item.quantity });
    }
   
    return result    
    }

}

