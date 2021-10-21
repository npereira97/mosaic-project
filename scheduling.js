const generate_schedule = (orders,bakers) => {
	const orders_copy = [...Object.values(orders)]
	orders_copy.sort((a,b) => a.duration < b.duration? 1 : -1);

	const ids = orders_copy.map(order => order.id);

	const is_assigned = {}
	orders_copy.forEach(order => is_assigned[order.id] = false);

	const schedule = {}
	bakers.forEach(baker => schedule[baker] = {capacity:8, queue:[]});

	for(baker of bakers){
		if(baker.capacity === 0){
			continue;
		}

		for(id of ids){
			const {duration} = orders[id];
			if (baker.capacity < duration){

			}
		}
	}
}

export default generate_schedule;